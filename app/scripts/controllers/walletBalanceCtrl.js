'use strict';
var walletBalanceCtrl = function ($scope, $sce, walletService, $rootScope) {
    $scope.init = function () {
        if (!$scope.tx || !$scope.wallet) {
            return
        }
        $scope.getShortAddressNotation();
        $scope.getBalance();
    };
    $scope.mayRunState = false;
    $scope.provider;
    $scope.ajaxReq = ajaxReq;
    $scope.addressNotation = {'value': '', 'state': ''};
    $scope.ajaxReq = ajaxReq;
    $scope.requestedSAN = false;
    $scope.viewDetailsModal = new Modal(document.getElementById('viewDetailsModal'));
    walletService.wallet = null;
    walletService.password = '';
    $scope.tokensLoaded = false;
    $scope.showAllTokens = false;
    $scope.inputPassword = '';
    $scope.showPkState = false;
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

    $scope.showPk = function (set) {
        if (set === 'show') {
            if ($scope.inputPassword === walletService.password) {
                $scope.$eval(function () {
                    $scope.showPkState = true;
                })
            } else {
                $scope.$eval(function () {
                    $scope.showPkState = false;
                })
            }
        }
        if (set === 'hide') {
            $scope.$eval(function () {
                $scope.inputPassword = '';
                $scope.showPkState = false;
            })
        }
    }

    $scope.viewDetailsModalClose = function () {
        $scope.inputPassword = '';
        $scope.showPk('hide');
        $scope.viewDetailsModal.close();

    };


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
        if (!$scope.tx || !$scope.wallet) {
            return
        }
        $scope.getBalance();
        $scope.getShortAddressNotation();
    }, 15000);

    $scope.toHexString = function (byteArray) {
        var s = '0x';
        byteArray.forEach(function (byte) {
            s += ('0' + (byte & 0xFF).toString(16)).slice(-2);
        });
        return s;
    }

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
            let accountData = uiFuncs.getTxData($scope);
            let walletAddress = accountData.from;

            if ($scope.wallet.hwType === 'ledger') {
                // debugger
                // var app = new ledgerEth($scope.wallet.getHWTransport());
                //
                // // app.getAddress($scope.wallet.path, function () {
                // // }, true, false);
                //
                // await web3.fsntx.buildGenNotationTx(
                //     {
                //         from: walletAddress
                //     }
                // ).then((tx) => {
                //     let txToSign = ethUtil.rlp.encode(tx);
                //     console.log(tx);
                //     console.log(txToSign);
                //     app.signTransaction($scope.wallet.path, txToSign.toString('hex'), function () {
                //     })
                //
                // })

                let data = '';
                await web3.fsntx.buildGenNotationTx(
                    {from: walletAddress}
                ).then((tx) => {
                    tx.from = walletAddress;
                    tx.chainId = 1;
                    data = tx;
                    console.log('gen here')
                    console.log(tx);
                })

                let txSigned = '';

                let ledgerConfig = {
                    privKey: $scope.wallet.privKey ? $scope.wallet.getPrivateKeyString() : "",
                    path: $scope.wallet.getPath(),
                    hwType: $scope.wallet.getHWType(),
                    hwTransport: $scope.wallet.getHWTransport()
                }

                let rawTx = data;

                console.log(rawTx);
                var eTx = new ethUtil.Tx(rawTx);
                console.log(eTx);
                if (ledgerConfig.hwType == "ledger") {
                    var app = new ledgerEth(ledgerConfig.hwTransport);
                    var EIP155Supported = false;
                    var localCallback = async function (result, error) {
                        if (typeof error != "undefined") {
                            if (callback !== undefined) callback({
                                isError: true,
                                error: error
                            });
                            return;
                        }
                        var splitVersion = result['version'].split('.');
                        if (parseInt(splitVersion[0]) > 1) {
                            EIP155Supported = true;
                        } else if (parseInt(splitVersion[1]) > 0) {
                            EIP155Supported = true;
                        } else if (parseInt(splitVersion[2]) > 2) {
                            EIP155Supported = true;
                        }

                        var oldTx = Object.assign(rawTx, {});
                        await uiFuncs.signTxLedger(app, eTx, rawTx, ledgerConfig, !EIP155Supported, function (res) {
                            oldTx.r = res.r;
                            oldTx.s = res.s;
                            oldTx.v = res.v;
                            console.log(oldTx);
                            console.log(res);
                            return web3.fsntx.sendRawTransaction(oldTx).then(function(txHash){
                                console.log(txHash);
                                return txHash;
                            })
                        });
                    }
                    await app.getAppConfiguration(localCallback);
                    console.log(eTx)
                    console.log(rawTx)
                    console.log(ledgerConfig)
                }
            } else {

                if (!$scope.account) {
                    $scope.account = web3.eth.accounts.privateKeyToAccount($scope.toHexString($scope.wallet.getPrivateKey()));
                }

                await web3.fsntx.buildGenNotationTx({
                    from: walletAddress
                }).then((tx) => {
                    console.log(tx);
                    return web3.fsn.signAndTransmit(tx, $scope.account.signTransaction).then(txHash => {
                        $scope.requestedSAN = true;
                        $scope.$apply(function () {
                            $scope.addressNotation.value = 'USAN Requested';
                            $scope.addressNotation.value = 'USAN Requested';
                        });
                    })
                });
                await $scope.getShortAddressNotation();
            }
        }
    }
};

module.exports = walletBalanceCtrl;