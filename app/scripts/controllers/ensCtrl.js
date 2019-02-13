'use strict';

var ensCtrl = function ($scope, $sce, walletService, $rootScope) {
    let nu = localStorage.getItem('nodeUrl')
    let data = nu ? JSON.parse(nu) : {}
    let _CHAINID = 1;

    if (data.chainid !== "") {
        _CHAINID = data.chainid;
    } else {
        _CHAINID = 1;
    }

    $scope.init = function () {
        if (!$scope.wallet) {
            return;
        }
        $scope.getAllAssets();
        $scope.getShortAddressNotation();
        $scope.allSwaps().then(function () {
            $scope.sortSwapMarket("timePosix");
            $scope.sortOpenMakes("timePosix");
        });
        $scope.getBalance();
        $scope.setWalletAddress();
        $scope.getAllAssetsList().then(function () {
            $scope.takeGetAllBalances($scope.allAssetsAddresses, 0);
        });
    };

    setInterval(function () {
        if ($scope.wallet == null) {
            return;
        }
        $scope.getAllAssets();
        $scope.getShortAddressNotation();
        $scope.allSwaps();
        $scope.getBalance();
        $scope.setWalletAddress();
        $scope.getAllAssetsList();

    }, 7500);

    setInterval(function () {
        if ($scope.wallet == null) {
            return;
        }
        $scope.takeGetAllBalances($scope.allAssetsAddresses, 0);

    }, 25000)


    $scope.mayRun = false;

    $scope.$watch('wallet', function () {
        $scope.init();
        $scope.mayRun = true;
    })


    $scope.months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    $scope.todayDate = formatDate();

    function formatDate() {
        let d = new Date(),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-');
    }


    $scope.currentPage = 0;
    $scope.pageSize = 10;
    $scope.endPage = 0;
    $scope.shownRows = 0;

    $scope.sendTimeLock = 'none';
    $scope.showTimeLockSend = false;
    $scope.showTimeLockReceive = false;

    $scope.checkDate = function () {
        if ($scope.transactionType == 'scheduled') {
            return
        } else {
            let today = new Date();
            if ($scope.fromEndTime < today) {
                $scope.$eval(function () {
                    $scope.fromEndTime = today;
                })
            }
            if ($scope.fromEndTime < $scope.fromStartTime) {
                $scope.$eval(function () {
                    $scope.fromStartTime = today;
                })
            }
        }
    }


    // Sets the last page for pagination
    $scope.$watch('swapsList', function () {
        if (typeof $scope.swapsList === 'undefined') {
            return;
        } else {
            $scope.$eval(function () {
                $scope.endPage = Math.ceil($scope.swapsList.length / $scope.pageSize);
            })
        }
    })

    $scope.$watch('swapsList', function () {
        if (typeof $scope.swapsList === 'undefined') {
            return;
        }
        if ($scope.currentPage == 0) {
            $scope.$eval(function () {
                $scope.shownRows = $scope.currentPage + 1 * $scope.pageSize;
            })
        }
        let shownRows = 0;
        if (($scope.currentPage + 1) * $scope.pageSize > $scope.swapsList.length) {
            shownRows = $scope.swapsList.length;
        } else {
            shownRows = ($scope.currentPage + 1) * $scope.pageSize;
        }
        $scope.$eval(function () {
            $scope.shownRows = shownRows;
        })
    })

    $scope.nextPage = function () {
        if ($scope.currentPage !== $scope.endPage - 1) {
            $scope.$eval(function () {
                $scope.currentPage = $scope.currentPage + 1
                $scope.searchSwapMarket = '';
            })
        }
        if (($scope.currentPage + 1) * $scope.pageSize > $scope.swapsList.length) {
            $scope.$eval(function () {
                $scope.shownRows = $scope.swapsList.length;
                $scope.searchSwapMarket = '';
            })
        } else {
            $scope.$eval(function () {
                $scope.shownRows = ($scope.currentPage + 1) * $scope.pageSize;
                $scope.searchSwapMarket = '';
            })
        }
    }

    $scope.firstPage = function () {
        $scope.$eval(function () {
            $scope.currentPage = 0
            $scope.searchSwapMarket = '';
        })
        if (($scope.currentPage + 1) * $scope.pageSize > $scope.swapsList.length) {
            $scope.$eval(function () {
                $scope.shownRows = $scope.swapsList.length;
                $scope.searchSwapMarket = '';
            })
        } else {
            $scope.$eval(function () {
                $scope.shownRows = ($scope.currentPage + 1) * $scope.pageSize;
                $scope.searchSwapMarket = '';
            })
        }
    }
    $scope.lastPage = function () {
        $scope.$eval(function () {
            $scope.currentPage = $scope.endPage - 1;
            $scope.searchSwapMarket = '';
        })
        if (($scope.currentPage + 1) * $scope.pageSize > $scope.swapsList.length) {
            $scope.$eval(function () {
                $scope.shownRows = $scope.swapsList.length;
                $scope.searchSwapMarket = '';
            })
        } else {
            $scope.$eval(function () {
                $scope.shownRows = ($scope.currentPage + 1) * $scope.pageSize;
                $scope.searchSwapMarket = '';
            })
        }
    }


    $scope.previousPage = function () {
        if ($scope.currentPage !== 0) {
            $scope.$eval(function () {
                $scope.currentPage = $scope.currentPage - 1
                $scope.searchSwapMarket = '';
            })
        }
        if (($scope.currentPage + 1) * $scope.pageSize > $scope.swapsList.length) {
            $scope.$eval(function () {
                $scope.shownRows = $scope.swapsList.length;
                $scope.searchSwapMarket = '';
            })
        } else {
            $scope.$eval(function () {
                $scope.shownRows = ($scope.currentPage + 1) * $scope.pageSize;
                $scope.searchSwapMarket = '';
            })
        }
    }

    let BN = web3.utils.BN;

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
    $scope.sortSwapMarket = function (keyname) {
        $scope.sortKey = keyname;   //set the sortKey to the param passed
        $scope.reverse = !$scope.reverse; //if true make it false and vice versa
    }
    $scope.sortOpenMakes = function (keyname) {
        $scope.sortKeyMake = keyname;   //set the sortKey to the param passed
        $scope.reverseMake = !$scope.reverseMake; //if true make it false and vice versa
    }

    $scope.makeBigNumber = function (amount, decimals) {
        try {
            let pieces = amount.split(".")
            let d = parseInt(decimals)
            if (pieces.length === 1) {
                amount = parseInt(amount)
                if (isNaN(amount) || amount < 0) {
                    // error message
                    return
                }
                amount = new BN(amount + "0".repeat(parseInt(decimals)));
            } else if (pieces.length > 2) {
                console.log('error');
                $scope.errorModal.open();
                // error message
                return
            } else if (pieces[1].length >= d) {
                console.log('error');
                return // error
            } else {
                let dec = parseInt(pieces[1])
                let reg = new RegExp('^\\d+$'); // numbers only
                if (isNaN(pieces[1]) || dec < 0 || !reg.test(pieces[1])) {
                    console.log('error');
                    $scope.errorModal.open();
                    return
                    // return error
                }
                dec = pieces[1]
                let declen = d - dec.toString().length
                amount = parseInt(pieces[0])
                if (isNaN(amount) || amount < 0) {
                    console.log('error');
                    $scope.errorModal.open();
                    // error message
                    return
                }
                amount = new BN(amount + dec + "0".repeat(parseInt(declen)));
            }
            return amount;
        } catch (err) {
            $scope.errorModal.open();
        }
    }

    $scope.sortByString = 'Default';
    $scope.takeAmountSwap = '';
    $scope.showOpenTakes = false;
    $scope.showSwapMarket = true;
    $scope.showOpenMakes = false;
    $scope.receiveTokens = '';
    $scope.walletAddress = '';
    $scope.assetToSendConfirm = '';
    $scope.assetToReceiveConfirm = '';
    $scope.makeSendAmount = '';
    $scope.openMakeSwaps = 0;
    $scope.openTakeSwapsTotal = 0;
    $scope.makeReceiveAmount = '';
    $scope.makeTarges = '';
    $scope.web3WalletBalance = 'Loading...'
    $scope.selectedSendAsset = 'Select asset'
    $scope.addressNotation = '';
    $scope.makeMinumumSwap = 1;
    $scope.receiveTimeLock = 'none';
    $scope.ajaxReq = ajaxReq;
    $scope.unitReadable = ajaxReq.type;
    $scope.recallAssetModal = new Modal(document.getElementById('recallAsset'));
    $scope.takeSwapModal = new Modal(document.getElementById('takeSwap'));
    $scope.makeSwapModal = new Modal(document.getElementById('makeSwap'));
    $scope.makeSwapConfirmModal = new Modal(document.getElementById('makeSwapConfirm'));
    $scope.makeSwapConfirmEndModal = new Modal(document.getElementById('makeSwapEndConfirm'));
    $scope.recallSwapSuccess = new Modal(document.getElementById('recallSwapSuccess'));
    $scope.swapInformationModal = new Modal(document.getElementById('swapInformationModal'));
    $scope.takeSwapConfirm = new Modal(document.getElementById('takeSwapConfirm'));
    $scope.errorModal = new Modal(document.getElementById('errorModal'));
    $scope.takeSwapEndConfirm = new Modal(document.getElementById('takeSwapEndConfirm'));
    $scope.showLoader = true;


    $scope.receiveDropDown = false;
    $scope.selectedReceiveAsset = 'Select asset';
    $scope.selectedReceiveContract = '-'
    $scope.selectedSendAsset = 'Select asset';
    $scope.selectedSendContract = '-';

    $scope.initializeSendandReceive = true;

    $scope.$watch('assetList', function () {
        if (typeof $scope.assetList === 'undefined' || $scope.assetList == []) {
            return;
        } else {
            if ($scope.initializeSendandReceive) {
                $scope.$eval(function () {
                    $scope.selectedReceiveAsset = `${$scope.assetList[0].name} (${$scope.assetList[0].symbol})`;
                    $scope.selectedReceiveContract = $scope.assetList[0].contractaddress;
                    $scope.assetToReceive = $scope.assetList[0].contractaddress;
                })
            }
        }
    })

    $scope.$watch('assetListOwned', function () {
        if (typeof $scope.assetListOwned === 'undefined' || $scope.assetListOwned.length == 0) {
            return;
        } else {
            if ($scope.initializeSendandReceive) {
                $scope.$eval(function () {
                    $scope.selectedSendAsset = `${$scope.assetListOwned[0].name} (${$scope.assetListOwned[0].symbol})`;
                    $scope.selectedSendContract = $scope.assetListOwned[0].contractaddress;
                    $scope.assetToSend = $scope.assetListOwned[0].contractaddress;
                    $scope.getAssetBalance();
                })
                $scope.initializeSendandReceive = false;
            }
        }
    })

    $scope.privateAccess = false;

    $scope.swapRecallSuccess = false;

    $scope.swapInfo = {};

    $scope.swapInformationModalOpen = async function (swap_id) {
        let data = {};

        try {
            await web3.fsn.allSwaps().then(function (res) {
                data = res[swap_id];
            })
        } catch (err) {
            $scope.errorModal.open();
            console.log(err);
        }


        let time = new Date(parseInt(data["Time"]) * 1000);

        let tMonth = time.getMonth();
        let tDay = time.getDate();
        let tYear = time.getFullYear();

        time = $scope.months[tMonth] + ' ' + tDay + ', ' + tYear;

        let fromStartTime = '';
        let fromEndTime = '';
        let toStartTime = '';
        let toEndTime = '';

        if (data["FromStartTime"] == 0) {
            fromStartTime = 'Now';
        } else {
            fromStartTime = $scope.returnDateString(data["FromStartTime"]);
        }
        if (data["FromEndTime"] == 18446744073709552000) {
            fromEndTime = 'Forever';
        } else {
            fromEndTime = $scope.returnDateString(data["FromEndTime"]);
        }

        if (data["ToStartTime"] == 0) {
            toStartTime = 'Now';
        } else {
            toStartTime = $scope.returnDateString(data["ToStartTime"]);
        }
        if (data["ToEndTime"] == 18446744073709552000) {
            toEndTime = 'Forever';
        } else {
            toEndTime = $scope.returnDateString(data["ToEndTime"]);
        }

        let targes = [];

        data["Targes"].length <= 0 ? targes = 'Public' : targes = 'Private';

        let fromAsset = {};
        let toAsset = {};

        try {
            await web3.fsn.getAsset(data["FromAssetID"]).then(function (res) {
                fromAsset = res;
            });
        } catch (err) {
            console.log(err);
        }

        try {
            await web3.fsn.getAsset(data["ToAssetID"]).then(function (res) {
                toAsset = res;
            });
        } catch (err) {
            console.log(err);
        }

        let minFromAmount;
        let minToAmount;

        minFromAmount = data["MinFromAmount"] / $scope.countDecimals(fromAsset["Decimals"]);
        minToAmount = data["MinToAmount"] / $scope.countDecimals(toAsset["Decimals"]);

        $scope.$apply(function () {
            $scope.swapInfo = {
                FromAssetName: fromAsset["Name"],
                FromAssetSymbol: fromAsset["Symbol"],
                FromAssetID: data["FromAssetID"],
                FromEndTime: fromEndTime,
                FromStartTime: fromStartTime,
                ID: data["ID"],
                MinFromAmount: minFromAmount,
                MinToAmount: minToAmount,
                Owner: data["Owner"],
                SwapSize: data["SwapSize"],
                Targes: targes,
                Time: time,
                ToAssetName: toAsset["Name"],
                ToAssetSymbol: toAsset["Symbol"],
                ToAssetID: data["ToAssetID"],
                ToEndTime: toEndTime,
                ToStartTime: toStartTime
            };
        })

        $scope.swapInformationModal.open();
    }


    $scope.toHexString = function (byteArray) {
        var s = '0x';
        byteArray.forEach(function (byte) {
            s += ('0' + (byte & 0xFF).toString(16)).slice(-2);
        });
        return s;
    }

    $scope.setReceiveAsset = async function (id) {
        $scope.$eval(function () {
            $scope.selectedReceiveAsset = `${$scope.assetList[id].name} (${$scope.assetList[id].symbol})`;
            $scope.selectedReceiveContract = $scope.assetList[id].contractaddress;
            $scope.assetToReceive = $scope.assetList[id].contractaddress;
            $scope.receiveDropDown = false;
        })
    }

    $scope.setSendAsset = async function (id) {
        $scope.$eval(function () {
            $scope.selectedSendAsset = `${$scope.assetListOwned[id].name} (${$scope.assetListOwned[id].symbol})`;
            $scope.selectedSendContract = $scope.assetListOwned[id].contractaddress;
            $scope.assetToSend = $scope.assetListOwned[id].contractaddress;
            $scope.getAssetBalance();
            $scope.sendDropDown = false;
        })
    }


    $scope.copyToClipboard = function (text) {
        let clipboardAvailable;
        if (clipboardAvailable === undefined) {
            clipboardAvailable =
                typeof document.queryCommandSupported === 'function' &&
                document.queryCommandSupported('copy');
        }
        let success = false;
        const body = document.body;

        if (body) {
            // add the text to a hidden node
            const node = document.createElement('span');
            node.textContent = text;
            node.style.opacity = '0';
            node.style.position = 'absolute';
            node.style.whiteSpace = 'pre-wrap';
            body.appendChild(node);

            // select the text
            const selection = window.getSelection();
            selection.removeAllRanges();
            const range = document.createRange();
            range.selectNodeContents(node);
            selection.addRange(range);

            // attempt to copy
            try {
                document.execCommand('copy');
                success = true;
            } catch (e) {
            }

            // remove selection and node
            selection.removeAllRanges();
            body.removeChild(node);
        }

        return success;
    }

    $scope.$watch(function () {
        if (walletService.wallet == null) return null;
        return walletService.wallet.getAddressString();
    }, function () {
        if (walletService.wallet == null) return;
        $scope.wallet = walletService.wallet;
        $scope.wd = true;
    });

    $scope.countDecimals = function (decimals) {
        let returnDecimals = '1';
        for (let i = 0; i < decimals; i++) {
            returnDecimals += '0';
        }
        return parseInt(returnDecimals);
    }

    $scope.setWalletAddress = function () {
        if (walletService.wallet !== null) {
            let accountData = uiFuncs.getTxData($scope);
            let walletAddress = accountData.from;
            $scope.walletAddress = walletAddress;
        }
    }

    $scope.getShortAddressNotation = async function () {
        let accountData = uiFuncs.getTxData($scope);
        let walletAddress = accountData.from;
        let notation = '';

        try {
            await web3.fsn.getNotation(walletAddress).then(function (res) {
                notation = res;
            });
        } catch (err) {
            console.log(err);
        }

        if (notation === 0) {
            $scope.addressNotation = 'Not available';
        } else {
            $scope.$eval(function () {
                $scope.addressNotation = notation;
                $scope.addressNotation = notation;
            });
        }
        return notation;
    }


    $scope.getAllAssets = async function () {
        if (walletService.wallet !== null) {
            let accountData = uiFuncs.getTxData($scope);
            let walletAddress = accountData.from;
            let assetList = {};
            let assetListOwned = [];
            let assetList2 = [];

            await web3.fsn.allAssets().then(function (res) {
                assetList = res;
            });

            for (let asset in assetList) {
                let id = assetList[asset]["ID"];
                let owner = assetList[asset]["Owner"];
                let owned = false;
                let assetBalance = '';

                try {
                    await web3.fsn.getBalance(id, walletAddress).then(function (res) {
                        assetBalance = res;
                    });
                } catch (err) {
                    console.log(err);
                }

                let divider = $scope.countDecimals(assetList[asset]["Decimals"]);

                let data = {
                    "id": assetList2.length,
                    "name": assetList[asset]["Name"],
                    "symbol": assetList[asset]["Symbol"],
                    "decimals": assetList[asset]["Decimals"],
                    "total": assetList[asset]["Total"] / divider,
                    "contractaddress": id,
                    "balance": assetBalance / divider,
                    "owner": owned
                }
                await assetList2.push(data);

                if (assetBalance > 0.000000000000000001) {
                    let divider = $scope.countDecimals(assetList[asset]["Decimals"]);
                    let data = {
                        "id": assetListOwned.length,
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
            $scope.$eval(function () {
                $scope.assetList = assetList2;
                $scope.assetListOwned = assetListOwned;
            });
        }
    }

    $scope.setMaxTakeSwap = function () {
        let amount = '';
        if ($scope.takeDataFront.fromAssetBalance >= $scope.takeDataFront.maxAmount) {
            amount = $scope.takeDataFront.maxAmount;
        } else {
            $scope.makeTarges;
            amount = $scope.takeDataFront.fromAssetBalance;
        }
        $scope.takeAmountSwap = amount;

        $scope.setReceive();
    }

    $scope.takeModal = async function (id) {
        let accountData = uiFuncs.getTxData($scope);
        let walletAddress = accountData.from;
        let balance = '';
        let decimals = 0;
        let toName = '';
        let fromName = '';

        let fromAsset = [];

        try {
            await web3.fsn.getBalance($scope.swapsList[id].toAssetId, walletAddress).then(function (res) {
                balance = res;
            });
            await web3.fsn.getAsset($scope.swapsList[id].toAssetId).then(function (res) {
                decimals = res["Decimals"];
            })
            await web3.fsn.getAsset($scope.swapsList[id].toAssetId).then(function (res) {
                toName = res["Name"];
            })
            await web3.fsn.getAsset($scope.swapsList[id].fromAssetId).then(function (res) {
                fromName = res["Name"];
            })
        } catch (err) {
            console.log(err);
        }

        balance = balance / $scope.countDecimals(decimals);

        console.log($scope.swapsList[id]);

        await $scope.$apply(function () {
            $scope.takeDataFront.swapId = $scope.swapsList[id];
            $scope.takeDataFront.fromAssetName = toName;
            $scope.takeDataFront.fromAmountCut = $scope.swapsList[id].fromAmountCut;
            $scope.takeDataFront.toAmountCut = $scope.swapsList[id].toAmountCut;
            $scope.takeDataFront.fromAssetSymbol = $scope.swapsList[id].toAssetSymbol;
            $scope.takeDataFront.fromAssetId = $scope.swapsList[id].toAssetId;
            $scope.takeDataFront.swapSize = $scope.swapsList[id].maxswaps;
            $scope.takeDataFront.toAssetName = fromName;
            $scope.takeDataFront.toAssetMin = $scope.swapsList[id].minswap / $scope.swapsList[id].swapratetaker;
            $scope.takeDataFront.toAssetSymbol = $scope.swapsList[id].fromAssetSymbol;
            $scope.takeDataFront.toAssetId = $scope.swapsList[id].fromAssetId;
            $scope.takeDataFront.fromAssetMin = $scope.swapsList[id].minswaptaker;
            $scope.takeDataFront.fromAssetBalance = balance;
            $scope.takeDataFront.swapRate = $scope.swapsList[id].swapratetaker;
            $scope.takeDataFront.maxAmount = $scope.swapsList[id].toAmount;
            $scope.takeDataFront.fromAmount = $scope.swapsList[id].fromAmount;
            $scope.takeDataFront.toAmount = $scope.swapsList[id].toAmount;
            $scope.takeAmountSwap = 1;
        })

        await $scope.setReceive(1).then(function(){
            $scope.takeSwapModal.open();
        });
        console.log($scope.takeDataFront);
    }

    $scope.setReceive = async function (amount) {
        if ($scope.takeAmountSwap == "" || $scope.takeAmountSwap == 0) {
            return;
        }
        let perc1 = $scope.takeAmountSwap;

        if (amount >= 0) {
            perc1 = 1;
        }

        let perc2 = $scope.takeDataFront.swapSize;
        let perc3 = perc1 / perc2;

        await $scope.$eval(function(){
            $scope.receiveTokens = $scope.takeDataFront.fromAmountCut * perc3;
            $scope.sendTokens = $scope.takeDataFront.toAmountCut * perc3;
        })
    }

    $scope.calculateSwapSize = function (amount, swap_size, maxamount) {
        let percentage = amount / maxamount
        let calculatedSwapSize = swap_size * percentage;
        return calculatedSwapSize;
    }

    $scope.takeSwap = async function (asset_id, swap_id, amount) {
        let password = walletService.password;
        let accountData = uiFuncs.getTxData($scope);
        let walletAddress = accountData.from;
        let toAsset = [];

        try {
            await web3.fsn.getAsset(asset_id).then(function (res) {
                toAsset = res;
            });
        } catch (err) {
            console.log(err);
        }

        let data = {
            from: walletAddress,
            SwapID: swap_id.swap_id,
            Size: $scope.takeAmountSwap
        };

        console.log(data);

        if (!$scope.account && ($scope.wallet.hwType !== "ledger")) {
            $scope.account = web3.eth.accounts.privateKeyToAccount($scope.toHexString($scope.wallet.getPrivateKey()));
        }

        try {
            await web3.fsntx.buildTakeSwapTx(data).then(function (tx) {
                tx.from = walletAddress;
                tx.chainId = _CHAINID;
                data = tx;
                if ($scope.wallet.hwType == "ledger") {
                    return;
                }
                web3.fsn.signAndTransmit(tx, $scope.account.signTransaction).then(txHash => {
                    console.log(txHash);
                })

                return $scope.takeSwapEndConfirm.open();
            })
        } catch (err) {
            $scope.errorModal.open();
            console.log(err);
        }
        if ($scope.wallet.hwType == "ledger") {
            let ledgerConfig = {
                privKey: $scope.wallet.privKey ? $scope.wallet.getPrivateKeyString() : "",
                path: $scope.wallet.getPath(),
                hwType: $scope.wallet.getHWType(),
                hwTransport: $scope.wallet.getHWTransport()
            }
            let rawTx = data;
            var eTx = new ethUtil.Tx(rawTx);
            if (ledgerConfig.hwType == "ledger") {
                var app = new ledgerEth(ledgerConfig.hwTransport);
                var EIP155Supported = true;
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
                    let input = oldTx.input;
                    return uiFuncs.signed(app, rawTx, ledgerConfig, true, function (res) {
                        oldTx.r = res.r;
                        oldTx.s = res.s;
                        oldTx.v = res.v;
                        oldTx.input = input;
                        oldTx.chainId = "0x1";
                        delete oldTx.isError;
                        delete oldTx.rawTx;
                        delete oldTx.signedTx;
                        web3.fsntx.sendRawTransaction(oldTx).then(function (txHash) {
                            $scope.takeSwapEndConfirm.open();
                        })
                    })
                }
                $scope.notifier.info('Please, confirm transaction on Ledger.');
                await app.getAppConfiguration(localCallback);
            }
        }

    }

    $scope.switchAsset = async function () {
        let sendAsset = $scope.assetToSend;
        let receiveAsset = $scope.assetToReceive;
        let canSwitch = false;
        let assetListOwnedId = "";
        let assetListId = "";

        for (let a = 0; a < $scope.assetListOwned.length; a++) {
            if ($scope.assetListOwned[a].contractaddress == receiveAsset) {
                assetListOwnedId = $scope.assetListOwned[a].id;
                canSwitch = true;
            }
        }

        if ($scope.assetListOwned[assetListOwnedId].contractaddress !== receiveAsset) {
            canSwitch = false;
        }

        for (let a = 0; a < $scope.assetList.length; a++) {
            if ($scope.assetList[a].contractaddress == sendAsset) {
                assetListId = $scope.assetList[a].id;
                canSwitch = true;
            }
        }
        if ($scope.assetList[assetListId].contractaddress !== sendAsset) {
            canSwitch = false;
        }

        if (canSwitch) {
            $scope.setSendAsset(assetListOwnedId);
            $scope.setReceiveAsset(assetListId);
        }

    }

    $scope.makeModal = async function (send, receive) {
        $scope.$eval(function () {
            $scope.makeSendAmount = '';
            $scope.makeReceiveAmount = '';
            $scope.makeMinumumSwap = '';
            $scope.privateAccess = false;
            $scope.makeTarges = '';
            $scope.showTimeLockSend = false;
            $scope.showTimeLockReceive = false;
            $scope.ToStartTime = '';
            $scope.ToEndTime = '';
            $scope.fromStartTime = '';
            $scope.fromEndTime = '';
        })
        $scope.makeSwapModal.open();
    }

    $scope.makeSwapConfirmation = async function (end) {

        let sendAssetSymbol = '';
        let receiveAssetSymbol = '';
        for (let asset in $scope.assetList) {
            if ($scope.assetToSend == $scope.assetList[asset].contractaddress) {
                sendAssetSymbol = $scope.assetList[asset].symbol;
            }
            if ($scope.assetToReceive == $scope.assetList[asset].contractaddress) {
                receiveAssetSymbol = $scope.assetList[asset].symbol;
            }
        }

        $scope.$eval(function () {
            $scope.assetToSendConfirm = sendAssetSymbol;
            $scope.assetToReceiveConfirm = receiveAssetSymbol;
            $scope.fromStartTimeString = $scope.returnDateString(new Date($scope.fromStartTime).getTime() / 1000.0);
            $scope.fromEndTimeString = $scope.returnDateString(new Date($scope.fromEndTime).getTime() / 1000.0);
            $scope.toStartTimeString = $scope.returnDateString(new Date($scope.ToStartTime).getTime() / 1000.0);
            $scope.toEndTimeString = $scope.returnDateString(new Date($scope.ToEndTime).getTime() / 1000.0);
        });

        if (end === 'end') {
            $scope.makeSwapConfirmEndModal.open()
        } else if (end === 'notend') {
            $scope.makeSwapConfirmModal.open()
        }
    }

    function convertDate(inputFormat) {
        function pad(s) {
            return (s < 10) ? '0' + s : s;
        }

        var d = new Date(inputFormat);
        return [d.getFullYear(), pad(d.getMonth() + 1), pad(d.getDate())].join('-');
    }

    function getHexDate(d) {
        return "0x" + (new Date(d).getTime() / 1000).toString(16);
    }

    let targesArray = [];

    $scope.allAssetsAddresses = [];
    $scope.myAssets = [];
    $scope.allBalance = {};

    $scope.getAllAssetsList = async function () {
        $scope.allAssetsAddresses = [];
        let accountData = uiFuncs.getTxData($scope);
        let walletAddress = accountData.from;
        await web3.fsn.allAssets().then(function (res) {
            for (let contractaddress in res) {
                $scope.allAssetsAddresses.push(contractaddress);
            }
        })
        await web3.fsn.getAllBalances(walletAddress).then(function (res) {
            for (let contractaddress in res) {
                $scope.myAssets.push(contractaddress);
            }
        })
    }

    $scope.takeGetAllBalances = async function (allAssetsList, index) {
        let accountData = uiFuncs.getTxData($scope);
        let walletAddress = accountData.from;
        let decimals = 0;
        let assetBalance = 0;
        if (index == $scope.allAssetsAddresses.length) {
            return;
        }
        if ($scope.myAssets.includes($scope.allAssetsAddresses[index])) {
            await web3.fsn.getBalance($scope.allAssetsAddresses[index], walletAddress).then(function (res) {
                assetBalance = res;
            });
            await web3.fsn.getAsset($scope.allAssetsAddresses[index]).then(function (res) {
                decimals = res["Decimals"];
            })
            let balance = assetBalance / $scope.countDecimals(decimals);
            $scope.allBalance[$scope.allAssetsAddresses[index]] = balance;
        } else {
            $scope.allBalance[$scope.allAssetsAddresses[index]] = 0;
        }
        return $scope.takeGetAllBalances(allAssetsList, index + 1)
    }

    $scope.makeSwap = async function () {
        targesArray = [];
        let password = walletService.password;
        let accountData = uiFuncs.getTxData($scope);
        let walletAddress = accountData.from;

        let fromAsset = [];
        let toAsset = [];


        try {
            await web3.fsn.getAsset($scope.assetToSend).then(function (res) {
                fromAsset = res;
            });
        } catch (err) {
            $scope.errorModal.open();
            console.log(err);
        }


        try {
            await web3.fsn.getAsset($scope.assetToReceive).then(function (res) {
                toAsset = res;
            });
        } catch (err) {
            $scope.errorModal.open();
            console.log(err);
        }

        if ($scope.makeTarges !== '') {
            let targesArr = $scope.makeTarges.split(',');
            await $scope.processAllTarges(targesArr, 0);

            console.log(targesArray);
        } else {
            targesArray = [];
        }

        let makeReceiveAmount = ($scope.makeReceiveAmount / parseInt($scope.makeMinumumSwap));
        let makeSendAmount = ($scope.makeSendAmount / parseInt($scope.makeMinumumSwap));

        let makeReceiveFixed = +makeReceiveAmount.toFixed(parseInt(toAsset["Decimals"]));
        let makeSendFixed = +makeSendAmount.toFixed(parseInt(fromAsset["Decimals"]));

        let makeReceiveAmountString = makeReceiveFixed.toString()
        let makeSendAmountString = makeSendFixed.toString()

        let minToAmount = $scope.makeBigNumber(makeReceiveAmountString, toAsset["Decimals"]);
        let minFromAmount = $scope.makeBigNumber(makeSendAmountString, fromAsset["Decimals"]);

        let minToAmountHex = "0x" + minToAmount.toString(16);
        let minFromAmountHex = "0x" + minFromAmount.toString(16);

        if ($scope.makeMinumumSwap == "" || $scope.makeMinumumSwap <= 0) {
            $scope.makeMinumumSwap = 1;
        }

        let data = {
            from: walletAddress,
            FromAssetID: $scope.assetToSend,
            ToAssetID: $scope.assetToReceive,
            MinToAmount: minToAmountHex,
            MinFromAmount: minFromAmountHex,
            SwapSize: parseInt($scope.makeMinumumSwap),
            Targes: targesArray
        };

        // Send part
        if ($scope.showTimeLockSend == true) {
            if ($scope.sendTimeLock == 'scheduled') {
                let fromStartTime = getHexDate(convertDate($scope.fromStartTime));
                let fromEndTime = web3.fsn.consts.TimeForeverStr;

                data.FromStartTime = fromStartTime;
                data.FromEndTime = fromEndTime;
            }
            if ($scope.sendTimeLock == 'daterange') {
                let fromStartTime = getHexDate(convertDate($scope.todayDate));
                let fromEndTime = getHexDate(convertDate($scope.fromEndTime));

                data.FromStartTime = fromStartTime;
                data.FromEndTime = fromEndTime;
            }
        }

        // Receive part
        if ($scope.showTimeLockReceive == true) {
            if ($scope.receiveTimeLock == 'scheduled') {
                let toStartTime = getHexDate(convertDate($scope.ToStartTime));
                let toEndTime = web3.fsn.consts.TimeForeverStr;

                data.ToStartTime = toStartTime;
                data.ToEndTime = toEndTime;
            }

            if ($scope.receiveTimeLock == 'daterange') {
                let toStartTime = getHexDate(convertDate($scope.todayDate));
                let toEndTime = getHexDate(convertDate($scope.ToEndTime));

                data.ToStartTime = toStartTime;
                data.ToEndTime = toEndTime;
            }
        }

        if (!$scope.account && ($scope.wallet.hwType !== "ledger")) {
            $scope.account = web3.eth.accounts.privateKeyToAccount($scope.toHexString($scope.wallet.getPrivateKey()));
        }

        console.log(data);

        try {
            await web3.fsntx.buildMakeSwapTx(data).then(function (tx) {
                console.log(tx);
                tx.from = walletAddress;
                tx.chainId = _CHAINID;
                data = tx;
                if ($scope.wallet.hwType == "ledger") {
                    return;
                }
                return web3.fsn.signAndTransmit(tx, $scope.account.signTransaction).then(txHash => {
                    console.log(txHash);
                    $scope.makeSwapConfirmation('end');
                })
            })
        } catch (err) {
            $scope.errorModal.open();
            console.log(err);
        }
        if ($scope.wallet.hwType == "ledger") {
            let ledgerConfig = {
                privKey: $scope.wallet.privKey ? $scope.wallet.getPrivateKeyString() : "",
                path: $scope.wallet.getPath(),
                hwType: $scope.wallet.getHWType(),
                hwTransport: $scope.wallet.getHWTransport()
            }
            let rawTx = data;
            var eTx = new ethUtil.Tx(rawTx);
            if (ledgerConfig.hwType == "ledger") {
                var app = new ledgerEth(ledgerConfig.hwTransport);
                var EIP155Supported = true;
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
                    let input = oldTx.input;
                    return uiFuncs.signed(app, rawTx, ledgerConfig, true, function (res) {
                        oldTx.r = res.r;
                        oldTx.s = res.s;
                        oldTx.v = res.v;
                        oldTx.input = input;
                        oldTx.chainId = "0x1";
                        delete oldTx.isError;
                        delete oldTx.rawTx;
                        delete oldTx.signedTx;
                        web3.fsntx.sendRawTransaction(oldTx).then(function (txHash) {
                            $scope.makeSwapConfirmation('end');
                        })
                    })
                }
                $scope.notifier.info('Please, confirm transaction on Ledger.');
                await app.getAppConfiguration(localCallback);
            }
        }
    }

    $scope.recallModal = function (swap_id) {
        $scope.swapRecallSuccess = false;
        $scope.recallAssetModal.open();
        $scope.recallAssetId = swap_id;

    }

    $scope.recallSwap = async function (swap_id) {
        if (walletService.wallet !== null) {
            let password = walletService.password;
            let accountData = uiFuncs.getTxData($scope);
            let walletAddress = accountData.from;

            let data = {
                from: walletAddress,
                SwapID: swap_id
            };

            if (!$scope.account && ($scope.wallet.hwType !== "ledger")) {
                $scope.account = web3.eth.accounts.privateKeyToAccount($scope.toHexString($scope.wallet.getPrivateKey()));
            }

            try {
                await web3.fsntx.buildRecallSwapTx(data).then(function (tx) {
                    tx.from = walletAddress;
                    tx.chainId = _CHAINID;
                    data = tx;
                    if ($scope.wallet.hwType == "ledger") {
                        return;
                    }
                    return web3.fsn.signAndTransmit(tx, $scope.account.signTransaction).then(txHash => {
                        console.log(txHash);
                        $scope.recallSwapSuccess.open()
                    })
                })
            } catch (err) {
                $scope.errorModal.open();
                console.log(err);
            }
            if ($scope.wallet.hwType == "ledger") {
                let ledgerConfig = {
                    privKey: $scope.wallet.privKey ? $scope.wallet.getPrivateKeyString() : "",
                    path: $scope.wallet.getPath(),
                    hwType: $scope.wallet.getHWType(),
                    hwTransport: $scope.wallet.getHWTransport()
                }
                let rawTx = data;
                var eTx = new ethUtil.Tx(rawTx);
                if (ledgerConfig.hwType == "ledger") {
                    var app = new ledgerEth(ledgerConfig.hwTransport);
                    var EIP155Supported = true;
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
                        let input = oldTx.input;
                        return uiFuncs.signed(app, rawTx, ledgerConfig, true, function (res) {
                            oldTx.r = res.r;
                            oldTx.s = res.s;
                            oldTx.v = res.v;
                            oldTx.input = input;
                            oldTx.chainId = "0x1";
                            delete oldTx.isError;
                            delete oldTx.rawTx;
                            delete oldTx.signedTx;
                            web3.fsntx.sendRawTransaction(oldTx).then(function (txHash) {
                                $scope.recallSwapSuccess.open()
                            })
                        })
                    }
                    $scope.notifier.info('Please, confirm transaction on Ledger.');
                    await app.getAppConfiguration(localCallback);
                }
            }
        }
    }

    $scope.processAllTarges = async function (targes, index) {
        if (index == targes.length) {
            return true
        }
        let target = targes[index];
        if (target.length < 42) {
            await web3.fsn.getAddressByNotation(parseInt(target)).then(function (res) {
                if (res) {
                    targesArray.push(res);
                }
                return $scope.processAllTarges(targes, index + 1)
            });
        } else {
            targesArray.push(target);
            return $scope.processAllTarges(targes, index + 1)
        }
    }


    $scope.getAssetBalance = async function () {
        let asset = $scope.assetToSend;
        let accountData = uiFuncs.getTxData($scope);
        let walletAddress = accountData.from;
        let assetBalance = '';
        let decimals = '';
        let assetSymbol = ''
        await web3.fsn.getAsset(asset).then(function (res) {
            decimals = res["Decimals"];
            assetSymbol = res["Symbol"]
        });

        try {
            await web3.fsn.getBalance(asset, walletAddress).then(function (res) {
                assetBalance = res;
            });
        } catch (err) {
            console.log(err);
        }

        let balance = parseInt(assetBalance) / $scope.countDecimals(decimals);

        $scope.$eval(function () {
            $scope.selectedAssetBalance = balance;
            $scope.selectedAssetSymbol = assetSymbol;
        });
    }

    $scope.returnDateString = function (posixtime) {
        if (posixtime == 18446744073709552000) {
            return 'Forever';
        }
        if (posixtime == 0) {
            return 'Now';
        }
        let time = new Date(parseInt(posixtime) * 1000);

        let tMonth = time.getMonth();
        let tDay = time.getDate();
        let tYear = time.getFullYear();

        return $scope.months[tMonth] + ' ' + tDay + ', ' + tYear;
    }


    $scope.allSwaps = async function () {
        let swapList = [];
        let swapListFront = [];
        let openTakesList = [];
        let openMakeSwaps = 0;
        $scope.openTakeSwapsTotal = 0;

        if (walletService.wallet !== null) {
            let accountData = uiFuncs.getTxData($scope);
            let walletAddress = accountData.from;

            try {
                await web3.fsn.allSwaps().then(function (res) {
                    swapList = res;
                });
            } catch (err) {
                console.log(err);
            }

            for (let asset in swapList) {
                let id = swapList[asset]["ID"];
                let owner = swapList[asset]["Owner"];
                let owned = false;
                let assetBalance = '';

                try {
                    await web3.fsn.getBalance(id, walletAddress).then(function (res) {
                        assetBalance = res;
                    });
                } catch (err) {
                    console.log(err);
                }

                let fromAsset = [];
                let toAsset = [];

                try {
                    await web3.fsn.getAsset(swapList[asset]["FromAssetID"]).then(function (res) {
                        fromAsset = res;
                    });
                } catch (err) {

                }

                try {
                    await web3.fsn.getAsset(swapList[asset]["ToAssetID"]).then(function (res) {
                        toAsset = res;
                    });
                } catch (err) {

                }

                owner === walletAddress ? owned = true : owned = false;

                let fromAmount = (swapList[asset].MinFromAmount / $scope.countDecimals(fromAsset.Decimals));

                let toAmount = swapList[asset].MinToAmount / $scope.countDecimals(toAsset.Decimals);
                let swapRate = fromAmount / toAmount;
                let time = new Date(parseInt(swapList[asset]["Time"]) * 1000);

                let tMonth = time.getMonth();
                let tDay = time.getDate();
                let tYear = time.getFullYear();

                let hours = time.getHours();
                let minutes = time.getMinutes();

                if (time.getMinutes() < 10) {
                    minutes = "0" + time.getMinutes();
                }
                // Global

                time = $scope.months[tMonth] + ' ' + tDay + ', ' + tYear;
                let timeHours = hours + ':' + minutes;

                // Maker parts
                let minimumswap = fromAmount / parseInt(swapList[asset]["SwapSize"]);

                // Taker specific parts
                let swapratetaker = toAmount / fromAmount;
                let minimumswaptaker = fromAmount * swapratetaker;

                // Targes section

                let targes = '';

                swapList[asset]["Targes"].length > 0 ? targes = 'Private' : targes = 'Public';

                let ownerAddr = '';

                try {
                    await web3.fsn.getNotation(swapList[asset]["Owner"]).then(function (res) {
                        ownerAddr = res;
                    })
                } catch (err) {
                    console.log(err);
                }

                if (ownerAddr == 0) {
                    ownerAddr = 'Owner has no USAN';
                }

                if (owned == true) {
                    openMakeSwaps++;
                }

                // Time Lock Section
                // Send TL

                if (swapList[asset]["FromEndTime"]) {

                }

                // Receive TL

                let toAmountF = toAmount * parseInt(swapList[asset]["SwapSize"]);
                let fromAmountF = fromAmount * parseInt(swapList[asset]["SwapSize"])

                let data = {
                    "id": swapListFront.length,
                    "swap_id": swapList[asset]["ID"],
                    "fromAssetId": swapList[asset]["FromAssetID"],
                    "fromAssetSymbol": fromAsset["Symbol"],
                    "fromAmount": toAmountF,
                    "fromAmountCut": +fromAmountF.toFixed(8),
                    "toAssetId": swapList[asset]["ToAssetID"],
                    "toAmount": toAmountF,
                    "toAmountCut": +toAmountF.toFixed(8),
                    "toAssetSymbol": toAsset["Symbol"],
                    "swaprate": swapRate,
                    "maxswaps": swapList[asset]["SwapSize"],
                    "swapratetaker": swapratetaker,
                    "minswap": minimumswap,
                    "minswaptaker": minimumswaptaker,
                    "time": time.toLocaleString(),
                    "timePosix": swapList[asset]["Time"],
                    "timeHours": timeHours,
                    "targes": targes,
                    "owner": ownerAddr,
                    "owned": owned,
                    "FromEndTime": swapList[asset]["FromEndTime"],
                    "FromStartTime": swapList[asset]["FromStartTime"],
                    "FromEndTimeString": $scope.returnDateString(swapList[asset]["FromEndTime"]),
                    "FromStartTimeString": $scope.returnDateString(swapList[asset]["FromStartTime"]),
                    "ToEndTime": swapList[asset]["ToEndTime"],
                    "ToStartTime": swapList[asset]["ToStartTime"],
                    "ToEndTimeString": $scope.returnDateString(swapList[asset]["ToEndTime"]),
                    "ToStartTimeString": $scope.returnDateString(swapList[asset]["ToStartTime"])

                }
                if (swapList[asset]["Targes"].includes(walletAddress) || swapList[asset]["Targes"].length <= 0 || walletAddress == swapList[asset]["Owner"]) {
                    await swapListFront.push(data);
                }
                if (swapList[asset]["Targes"].includes(walletAddress)) {
                    await openTakesList.push(data);
                    $scope.openTakeSwapsTotal++;
                }
            }
        }

        $scope.$apply(function () {
            $scope.swapsList = swapListFront;
            $scope.swapsList = swapListFront;
            $scope.openMakeSwaps = openMakeSwaps;
            $scope.openTakeSwaps = openTakesList;
            $scope.openTakeSwapsTotal = $scope.openTakeSwapsTotal;
            $scope.showLoader = false;
        });
    }

    $scope.getBalance = async function () {
        if ($scope.mayRunState = true) {
            let accountData = uiFuncs.getTxData($scope);
            let walletAddress = accountData.from;
            let balance = await web3.fsn.getBalance("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff", walletAddress);

            balance = balance / $scope.countDecimals(18);
            $scope.$eval(function () {
                $scope.web3WalletBalance = balance;
                $scope.web3WalletBalance = balance;
            });
        }
    }
};
module.exports = ensCtrl;
