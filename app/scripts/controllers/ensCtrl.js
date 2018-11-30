'use strict';

var ensCtrl = function ($scope, $sce, walletService, $rootScope) {
        $scope.init = function () {

        };
        $scope.tx = {};
        $scope.takeDataFront = {
            'fromAssetSymbol': '',
            'toAssetSymbol': '',
            'fromAssetBalance': '',
            'swapRate': '',
            'toAssetMin': '',
            'fromAssetMin': '',
            'maxAmount': '',
            'swapId': '',
            'fromAssetId': ''
        };
        $scope.takeAmountSwap = '';
        $scope.receiveTokens = '';
        $scope.ajaxReq = ajaxReq;
        $scope.unitReadable = ajaxReq.type;
        walletService.wallet = null;
        walletService.password = '';
        $scope.recallAssetModal = new Modal(document.getElementById('recallAsset'));
        $scope.takeSwapModal = new Modal(document.getElementById('takeSwap'));
        $scope.swapRecallSuccess = false;


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

        $scope.setMaxTakeSwap = function () {
            let amount = '';
            if ($scope.takeDataFront.fromAssetBalance >= $scope.takeDataFront.maxAmount) {
                amount = $scope.takeDataFront.maxAmount;
            } else {
                amount = $scope.takeDataFront.fromAssetBalance;
            }
            $scope.takeAmountSwap = amount;

            $scope.setReceive();
        }

        $scope.takeModal = async function (swap_id) {
            let accountData = uiFuncs.getTxData($scope);
            let walletAddress = accountData.from;
            let swapList = [];
            let balance = '';

            await web3.fsn.allSwaps().then(function (res) {
                swapList = res;
            })

            let fromAsset = [];
            let toAsset = [];

            await web3.fsn.getAsset(swapList[swap_id]["FromAssetID"]).then(function (res) {
                fromAsset = res;
            });

            await web3.fsn.getBalance(swapList[swap_id]["FromAssetID"], walletAddress).then(function (res) {
                balance = res;
            });

            await web3.fsn.getAsset(swapList[swap_id]["ToAssetID"]).then(function (res) {
                toAsset = res;
            });

            let swapRate = parseInt(swapList[swap_id]["MinToAmount"]) / parseInt(swapList[swap_id]["MinFromAmount"]);

            balance = balance / $scope.countDecimals(fromAsset["Decimals"]);
            let maximumsize = parseInt(swapList[swap_id]["SwapSize"]) * parseInt(swapList[swap_id]["MinFromAmount"] / $scope.countDecimals(fromAsset["Decimals"]));

            $scope.$apply(function () {
                $scope.takeDataFront.swapId = swapList[swap_id]["ID"];
                $scope.takeDataFront.fromAssetSymbol = fromAsset["Symbol"];
                $scope.takeDataFront.fromAssetId = fromAsset["ID"];
                $scope.takeDataFront.fromAssetMin = swapList[swap_id]["MinFromAmount"] / $scope.countDecimals(toAsset["Decimals"]);
                $scope.takeDataFront.toAssetSymbol = toAsset["Symbol"];
                $scope.takeDataFront.toAssetMin = swapList[swap_id]["MinToAmount"] / $scope.countDecimals(toAsset["Decimals"]);
                $scope.takeDataFront.fromAssetBalance = balance;
                $scope.takeDataFront.swapRate = swapRate;
                $scope.takeDataFront.maxAmount = maximumsize;

            })

            $scope.takeSwapModal.open();
        }

        $scope.setReceive = function () {
            $scope.receiveTokens = $scope.takeAmountSwap * $scope.takeDataFront.swapRate;
        }

        $scope.takeSwap = async function (asset_id, swap_id, amount) {
            console.log(asset_id);
            console.log(swap_id);
            let password = walletService.password;
            let accountData = uiFuncs.getTxData($scope);
            let walletAddress = accountData.from;
            let toAsset = [];

            await web3.fsn.getAsset(asset_id).then(function (res) {
                toAsset = res;
            });

            let take = amount * $scope.countDecimals(toAsset["Decimals"]);
            console.log(`This is Size -> ${take}`);

            await web3.fsn.takeSwap({from: walletAddress, SwapID: swap_id, Size: parseInt(take)}, password).then(function (res) {
                console.log(res);
            })
        }

        $scope.makeSwap = async function () {
            await web3.fsn.makeSwap.then(function (res) {

            })
        }

        $scope.recallModal = function (swap_id) {
            $scope.swapRecallSuccess = false;
            $scope.recallAssetModal.open();
            $scope.recallAssetId = swap_id;

        }

        $scope.recallSwap = async function (swap_id) {
            if (walletService.password !== '') {
                console.log(swap_id);
                let password = walletService.password;
                let accountData = uiFuncs.getTxData($scope);
                let walletAddress = accountData.from;
                await web3.fsn.recallSwap({from: walletAddress, SwapID: swap_id}, password).then(function (res) {

                })

                $scope.$apply(function () {
                    $scope.swapRecallSuccess = true;
                });
            }
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
            $scope.mySwaps();
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
                    let time = new Date(parseInt(swapList[asset]["Time"]) * 1000);
                    let minimumswap = parseInt(swapList[asset]["SwapSize"]) / parseInt(swapList[asset]["MinFromAmount"]);
                    let targes = '';

                    swapList[asset]["Targes"] === [] ? targes == 'public' : targes == 'private';


                    let data = {
                        "id": swapList[asset]["ID"],
                        "fromAssetId": swapList[asset]["FromAssetID"],
                        "fromAssetSymbol": fromAsset["Symbol"],
                        "fromAmount": swapList[asset]["MinFromAmount"] / $scope.countDecimals(fromAsset["Decimals"]),
                        "toAssetId": swapList[asset]["ToAssetID"],
                        "toAmount": swapList[asset]["MinToAmount"] / $scope.countDecimals(toAsset["Decimals"]),
                        "toAssetSymbol": toAsset["Symbol"],
                        "swaprate": swapRate,
                        "minswap": minimumswap,
                        "time": time.toLocaleString(),
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


        $scope.mySwaps = async function () {
            let mySwapList = [];
            let mySwapListFront = []

            if (walletService.password !== '') {
                let accountData = uiFuncs.getTxData($scope);
                let walletAddress = accountData.from;
                console.log(walletAddress);

                await web3.fsn.allSwapsByAddress(walletAddress).then(function (res) {
                    mySwapList = res;
                });

                for (let asset in mySwapList) {
                    let id = mySwapList[asset]["ID"];
                    let owner = mySwapList[asset]["Owner"];
                    let owned = false;
                    let assetBalance = '';

                    await web3.fsn.getBalance(id, walletAddress).then(function (res) {
                        assetBalance = res;
                    });

                    let fromAsset = [];
                    let toAsset = [];

                    await web3.fsn.getAsset(mySwapList[asset]["FromAssetID"]).then(function (res) {
                        fromAsset = res;
                    });

                    await web3.fsn.getAsset(mySwapList[asset]["ToAssetID"]).then(function (res) {
                        toAsset = res;
                    });

                    owner === walletAddress ? owned = true : owned = false;

                    let swapRate = parseInt(mySwapList[asset]["MinToAmount"]) / parseInt(mySwapList[asset]["MinFromAmount"]);
                    let time = new Date(parseInt(mySwapList[asset]["Time"]) * 1000);
                    let minimumswap = parseInt(mySwapList[asset]["SwapSize"]) / parseInt(mySwapList[asset]["MinFromAmount"]);
                    let targes = '';

                    mySwapList[asset]["Targes"] === [] ? targes == 'public' : targes == 'private';


                    let data = {
                        "id": mySwapList[asset]["ID"],
                        "fromAssetId": mySwapList[asset]["FromAssetID"],
                        "fromAssetSymbol": fromAsset["Symbol"],
                        "fromAmount": mySwapList[asset]["MinFromAmount"],
                        "toAssetId": mySwapList[asset]["ToAssetID"],
                        "toAmount": mySwapList[asset]["MinToAmount"],
                        "toAssetSymbol": toAsset["Symbol"],
                        "minswap": minimumswap,
                        "swaprate": swapRate,
                        "time": time.toLocaleString(),
                        "targes": targes,
                        "owner": mySwapList[asset]["Owner"],
                        "owned": owned
                    }
                    await mySwapListFront.push(data);
                }
            }
            $scope.$apply(function () {
                console.log(mySwapListFront)
                $scope.mySwapList = mySwapListFront;
            });
        }


    }
;
module.exports = ensCtrl;
