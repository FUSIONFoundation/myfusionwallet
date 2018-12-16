'use strict';
var walletBalanceCtrl = function ($scope, $sce, walletService, $rootScope) {
        $scope.init = function () {
            if ( !$scope.tx || !$scope.wallet ) {
                return
            }
            $scope.getShortAddressNotation();
            $scope.getBalance();
        };
        $scope.mayRunState = false;
        $scope.addressNotation = {'value': '', 'state': ''};
        $scope.ajaxReq = ajaxReq;
        $scope.requestedSAN = false;
        $scope.viewDetailsModal = new Modal(document.getElementById('viewDetailsModal'));
        walletService.wallet = null;
        walletService.password = '';
        $scope.tokensLoaded = false;
        $scope.showAllTokens = false;
        $scope.localToken = {
            contractAdd: "",
            symbol: "",
            decimals: "",
            type: "custom",
        };

        $scope.slide = 1;

        $scope.customTokenField = false;

        $scope.saveTokenToLocal = function () {
            globalFuncs.saveTokenToLocal($scope.localToken, function (data) {
                if (!data.error) {
                    $scope.addressDrtv.ensAddressField = "";
                    $scope.localToken = {
                        contractAdd: "",
                        symbol: "",
                        decimals: "",
                        type: "custom"
                    };
                    $scope.wallet.setTokens();
                    $scope.validateLocalToken = $sce.trustAsHtml('');
                    $scope.customTokenField = false;
                } else {
                    $scope.notifier.danger(data.msg);
                }
            });
        }


        $scope.setAndVerifyBalance = function (token) {
            if (token.balance == 'Click to Load') {
                token.balance = 'loading';

                token.setBalance(function () {
                    var autoTokens = globalFuncs.localStorage.getItem('autoLoadTokens')
                    $scope.autoLoadTokens = autoTokens ? JSON.parse(autoTokens) : [];

                    console.log(token.balance)
                    console.log(token.contractAddress)

                    if (parseInt(token.balance) > 0) {
                        $scope.autoLoadTokens.push(token.contractAddress);
                        globalFuncs.localStorage.setItem('autoLoadTokens', JSON.stringify($scope.autoLoadTokens));
                        console.log(token)
                    }
                });
            }
        }


        $scope.$watch('wallet', function () {
            if ($scope.wallet === null) {
                $scope.mayRunState = false;
            } else {
                $scope.mayRunState = true;
                $scope.init();
            }
        });

        // $scope.reverseLookup = function() {
        // var _ens = new ens();
        // _ens.getName($scope.wallet.getAddressString().substring(2) + '.addr.reverse', function(data) {
        // if (data.error) uiFuncs.notifier.danger(data.msg);
        // else if (data.data == '0x') {
        // $scope.showens = false;
        // } else {
        // $scope.ensAddress = data.data;
        // $scope.showens = true;
        // }
        // });
        // }
        //

        $scope.removeTokenFromLocal = function (tokensymbol) {
            globalFuncs.removeTokenFromLocal(tokensymbol, $scope.wallet.tokenObjs);
            $rootScope.rootScopeShowRawTx = false;
        }

        $scope.showDisplayOnTrezor = function () {
            return ($scope.wallet != null && $scope.wallet.hwType === 'trezor');
        }

        $scope.displayOnTrezor = function () {
            TrezorConnect.ethereumGetAddress({
                path: $scope.wallet.path,
                showOnTrezor: true
            });
        }

        $scope.showDisplayOnLedger = function () {
            return ($scope.wallet != null && $scope.wallet.hwType === 'ledger');
        }

        $scope.displayOnLedger = function () {
            var app = new ledgerEth($scope.wallet.getHWTransport());
            app.getAddress($scope.wallet.path, function () {
            }, true, false);
        }

        $scope.countDecimals = function (decimals) {
            let returnDecimals = '1';
            for (let i = 0; i < decimals; i++) {
                returnDecimals += '0';
            }
            return parseInt(returnDecimals);
        }

        setInterval(function () {
            if ( !$scope.tx || !$scope.wallet ) {
                return
            }
            $scope.getBalance();
            $scope.getShortAddressNotation();
        }, 15000);

        $scope.getBalance = async function () {
            if ($scope.mayRunState = true) {
                let accountData = uiFuncs.getTxData($scope);
                let walletAddress = accountData.from;
                let balance = '';

                await web3.fsn.getBalance("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff", walletAddress).then(function (res) {
                    balance = res;
                });

                balance = balance / $scope.countDecimals(18);
                $scope.$apply(function () {
                    $scope.web3WalletBalance = balance;
                    $scope.web3WalletBalance = balance;
                });
            }
        }


        $scope.getShortAddressNotation = async function () {
            if ($scope.mayRunState = true) {
                let accountData = uiFuncs.getTxData($scope);
                let walletAddress = accountData.from;
                let notation = '';

                await web3.fsn.getNotation(walletAddress).then(function (res) {
                    notation = res;
                });


                if ($scope.requestedSAN == false) {
                    $scope.addressNotation.value = 'It looks like you don’t have a Short Account Number (SAN) yet. Fusion’s SAN is an 8 character version of your wallet address that’s as easy to remember as your phone number. Click the button below to generate one.';
                }

                if ($scope.requestedSAN == true) {
                    $scope.addressNotation.value = 'USAN Requested';
                }

                if (notation === 0) {
                    $scope.addressNotation.state = false;
                } else {
                    $scope.addressNotation.state = true;
                    $scope.$apply(function () {
                        $scope.addressNotation.value = notation;
                        $scope.addressNotation.value = notation;
                    });
                }

                return notation;
            }
        }


        $scope.setShortAddressNotation = async function () {
            if ($scope.mayRunState = true) {
                let password = walletService.password;
                let accountData = uiFuncs.getTxData($scope);
                let walletAddress = accountData.from;
                await web3.fsn.genNotation({from: walletAddress}, password).then(function (res) {
                    console.log(res);
                    $scope.addressNotation.value = res;
                })

                if (!$scope.account) {
                    $scope.account = web3.eth.accounts.privateKeyToAccount($scope.wallet.getPrivateKey());
                }
                await web3.fsntx.buildGenNotationTx({
                    from: walletAddress
                }).then((tx) => {
                    let input = tx.input;
                    let rawTx = Object.assign(tx, {});
                    let signedMessage = '';

                    return $scope.account.signTransaction(tx).then(function (res) {
                        signedMessage = res;
                        let {r, s, v} = signedMessage;
                        rawTx.r = r;
                        rawTx.s = s;
                        rawTx.v = v;
                        rawTx.input = input;
                        return web3.fsntx.sendRawTransaction(rawTx).then(txHash => {
                            $scope.requestedSAN = true;
                            $scope.$apply(function () {
                                $scope.addressNotation.value = 'USAN Requested';
                                $scope.addressNotation.value = 'USAN Requested';
                            });
                        })
                    });
                })
                await $scope.getShortAddressNotation();
            }
        }

    }
;

module.exports = walletBalanceCtrl;
