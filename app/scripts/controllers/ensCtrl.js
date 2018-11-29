'use strict';

var ensCtrl = function ($scope, $sce, walletService, $rootScope) {
        $scope.init = function () {

        };
        $scope.tx = {};
        $scope.ajaxReq = ajaxReq;
        $scope.unitReadable = ajaxReq.type;
        walletService.wallet = null;
        walletService.password = '';

        var applyScope = function () {
            if (!$scope.$$phase) $scope.$apply();
        }

        var defaultInit = function () {
            globalFuncs.urlGet('sendMode') == null ? $scope.setSendMode('ether') : $scope.setSendMode(globalFuncs.urlGet('sendMode'));
            $scope.gasLimitChanged = globalFuncs.urlGet('gaslimit') != null ? true : false;
            $scope.showAdvance = globalFuncs.urlGet('gaslimit') != null || globalFuncs.urlGet('gas') != null || globalFuncs.urlGet('data') != null;
            if (globalFuncs.urlGet('data') || globalFuncs.urlGet('value') || globalFuncs.urlGet('to') || globalFuncs.urlGet('gaslimit') || globalFuncs.urlGet('sendMode') || globalFuncs.urlGet('gas') || globalFuncs.urlGet('tokensymbol')) $scope.hasQueryString = true // if there is a query string, show an warning at top of page
            $scope.init();

        }
        $scope.$watch(function () {
            if (walletService.wallet == null) return null;
            return walletService.wallet.getAddressString();
        }, function () {
            if (walletService.wallet == null) return;
            $scope.wallet = walletService.wallet;
            $scope.wd = true;
            $scope.wallet.setBalance(applyScope);
            if ($scope.parentTxConfig) {
                var setTxObj = function () {
                    $scope.addressDrtv.ensAddressField = $scope.parentTxConfig.to;
                    $scope.tx.value = $scope.parentTxConfig.value;
                    $scope.tx.sendMode = $scope.parentTxConfig.sendMode ? $scope.parentTxConfig.sendMode : 'ether';
                    $scope.tx.tokensymbol = $scope.parentTxConfig.tokensymbol ? $scope.parentTxConfig.tokensymbol : '';
                    $scope.tx.gasPrice = $scope.parentTxConfig.gasPrice ? $scope.parentTxConfig.gasPrice : null;
                    $scope.tx.nonce = $scope.parentTxConfig.nonce ? $scope.parentTxConfig.nonce : null;
                    $scope.tx.data = $scope.parentTxConfig.data ? $scope.parentTxConfig.data : $scope.tx.data;
                    $scope.tx.readOnly = $scope.addressDrtv.readOnly = $scope.parentTxConfig.readOnly ? $scope.parentTxConfig.readOnly : false;
                    if ($scope.parentTxConfig.gasLimit) {
                        $scope.tx.gasLimit = $scope.parentTxConfig.gasLimit;
                        $scope.gasLimitChanged = true;
                    }
                }
                $scope.$watch('parentTxConfig', function () {
                    setTxObj();
                }, true);
            }
            $scope.setTokenSendMode();
            defaultInit();
        });

        $scope.$watch('ajaxReq.key', function () {
            if ($scope.wallet) {
                $scope.setSendMode('ether');
                $scope.wallet.setBalance(applyScope);
                $scope.wallet.setTokens();
            }
        });

        $scope.countDecimals = function (decimals) {
            let returnDecimals = '1';
            for (let i = 0; i < decimals; i++) {
                returnDecimals += '0';
            }
            return parseInt(returnDecimals);
        }


        $scope.getAllAssets = async function () {
            if (walletService.password !== '') {
                let accountData = uiFuncs.getTxData($scope);
                let walletAddress = accountData.from;
                let assetList = {};
                let assetListOwned = [];
                let assetList2 = [];

                console.log(walletAddress);

                await web3.fsn.allAssets().then(function (res) {
                    assetList = res;
                });

                for (let asset in assetList) {
                    let id = assetList[asset]["ID"];
                    let owner = assetList[asset]["Owner"];
                    let owned = false;
                    let assetBalance = '';

                    await web3.fsn.getBalance(id, walletAddress).then(function (res) {
                        assetBalance = res;
                    });

                    let divider = $scope.countDecimals(assetList[asset]["Decimals"]);

                    let data = {
                        "name": assetList[asset]["Name"],
                        "symbol": assetList[asset]["Symbol"],
                        "decimals": assetList[asset]["Decimals"],
                        "total": assetList[asset]["Total"] / divider,
                        "contractaddress": id,
                        "balance": assetBalance / divider,
                        "owner": owned
                    }
                    await assetList2.push(data);

                    if (assetBalance > 0.000000000000001) {
                        let divider = $scope.countDecimals(assetList[asset]["Decimals"]);
                        let data = {
                            "name": assetList[asset]["Name"],
                            "symbol": assetList[asset]["Symbol"],
                            "decimals": assetList[asset]["Decimals"],
                            "total": assetList[asset]["Total"] / divider,
                            "contractaddress": id,
                            "balance": assetBalance / divider,
                            "owner": owned
                        }
                        await assetListOwned.push(data);
                    }

                }
                $scope.$apply(function () {
                    $scope.assetList = assetList2;
                    $scope.assetList = assetList2;
                    $scope.assetListOwned = assetListOwned;
                    $scope.assetListOwned = assetListOwned;
                });
            }
        }

        $scope.takeSwap = async function () {
            let password = walletService.password;
            let accountData = uiFuncs.getTxData($scope);
            let from = accountData.from;
        }

        $scope.makeSwap = async function () {
            await web3.fsn.makeSwap.then(function (res) {

            })
        }

        $scope.recallSwap = async function (swap_id) {
            await web3.fsn.recallSwap(swap_id).then(function (res) {

            })
        }

        $scope.getAssetBalance = async function () {
            let asset = $scope.assetToSend;
            let accountData = uiFuncs.getTxData($scope);
            let walletAddress = accountData.from;
            let assetBalance = '';
            let decimals = '';
            await web3.fsn.getAsset(asset).then(function (res) {
                decimals = res["Decimals"];
            });

            await web3.fsn.getBalance(asset, walletAddress).then(function (res) {
                assetBalance = res;
            });

            let balance = parseInt(assetBalance) / $scope.countDecimals(decimals);

            $scope.$apply(function () {
                $scope.selectedAssetBalance = balance;
            });
        }


        $scope.allSwaps = async function () {

            $scope.getAllAssets();
            let swapList = [];
            let swapListFront = []

            if (walletService.password !== '') {
                let accountData = uiFuncs.getTxData($scope);
                let walletAddress = accountData.from;
                console.log(walletAddress);

                await web3.fsn.allSwaps().then(function (res) {
                    swapList = res;
                });

                for (let asset in swapList) {
                    let id = swapList[asset]["ID"];
                    let owner = swapList[asset]["Owner"];
                    let owned = false;
                    let assetBalance = '';

                    await web3.fsn.getBalance(id, walletAddress).then(function (res) {
                        assetBalance = res;
                    });

                    let fromAsset = [];
                    let toAsset = [];

                    await web3.fsn.getAsset(swapList[asset]["FromAssetID"]).then(function (res) {
                        fromAsset = res;
                    });

                    await web3.fsn.getAsset(swapList[asset]["ToAssetID"]).then(function (res) {
                        toAsset = res;
                    });

                    owner === walletAddress ? owned = true : owned = false;

                    let swapRate = parseInt(swapList[asset]["MinToAmount"]) / parseInt(swapList[asset]["MinFromAmount"]);
                    let targes = '';

                    swapList[asset]["Targes"] === [] ? targes == 'public' : targes == 'private';

                    let data = {
                        "id": swapList[asset]["ID"],
                        "fromAssetId": swapList[asset]["FromAssetID"],
                        "fromAssetSymbol": fromAsset["Symbol"],
                        "fromAmount": swapList[asset]["MinFromAmount"],
                        "toAssetId": swapList[asset]["ToAssetID"],
                        "toAmount": swapList[asset]["MinToAmount"],
                        "toAssetSymbol": fromAsset["Symbol"],
                        "swaprate": swapRate,
                        "targes": targes,
                        "owner": swapList[asset]["Owner"],
                        "owned": owned
                    }
                    await swapListFront.push(data);
                }
            }
            $scope.$apply(function () {
                console.log(swapListFront)
                $scope.swapsList = swapListFront;
            });
        }

    }
;
module.exports = ensCtrl;
