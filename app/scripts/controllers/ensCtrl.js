'use strict';

var ensCtrl = function ($scope, $sce, walletService, $rootScope) {

    $scope.init = function () {
        if (!$scope.wallet) {
            return;
        }
        $scope.getAllAssets();
        $scope.getShortAddressNotation();
        $scope.allSwaps();
        $scope.getBalance();
        $scope.setWalletAddress();
    };

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

    $scope.transactionType = 'none';

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

    if ($scope.mayRun) {
        setInterval($scope.init(), 6000);
        console.log('triggered');
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


    $scope.takeAmountSwap = '';
    $scope.showSwapMarket = true;
    $scope.showOpenMakes = false;
    $scope.receiveTokens = '';
    $scope.walletAddress = '';
    $scope.assetToSendConfirm = '';
    $scope.assetToReceiveConfirm = '';
    $scope.makeSendAmount = '';
    $scope.makeReceiveAmount = '';
    $scope.makeTarges = '';
    $scope.web3WalletBalance = 'Loading...'
    $scope.selectedSendAsset = 'Select asset'
    $scope.addressNotation = '';
    $scope.makeMinumumSwap = 1;
    $scope.ajaxReq = ajaxReq;
    $scope.unitReadable = ajaxReq.type;
    walletService.wallet = null;
    walletService.password = '';
    $scope.recallAssetModal = new Modal(document.getElementById('recallAsset'));
    $scope.takeSwapModal = new Modal(document.getElementById('takeSwap'));
    $scope.makeSwapModal = new Modal(document.getElementById('makeSwap'));
    $scope.makeSwapConfirmModal = new Modal(document.getElementById('makeSwapConfirm'));
    $scope.makeSwapConfirmEndModal = new Modal(document.getElementById('makeSwapEndConfirm'));
    $scope.recallSwapSuccess = new Modal(document.getElementById('recallSwapSuccess'));
    $scope.swapInformationModal = new Modal(document.getElementById('swapInformationModal'));


    $scope.receiveDropDown = false;
    $scope.selectedReceiveAsset = 'Select asset';
    $scope.selectedReceiveContract = '-'
    $scope.selectedSendAsset = 'Select asset';
    $scope.selectedSendContract = '-';


    $scope.$watch('assetList', function () {
        if (typeof $scope.assetList === 'undefined' || $scope.assetList == []) {
            return;
        } else {
            $scope.$eval(function () {
                $scope.selectedReceiveAsset = `${$scope.assetList[0].name} (${$scope.assetList[0].symbol})`;
                $scope.selectedReceiveContract = $scope.assetList[0].contractaddress;
                $scope.assetToReceive = $scope.assetList[0].contractaddress;
            })
        }
    })

    $scope.$watch('assetListOwned', function () {
        debugger
        if (typeof $scope.assetListOwned === 'undefined' || $scope.assetListOwned.length == 0) {
            return;
        } else {
            $scope.$eval(function () {
                $scope.selectedSendAsset = `${$scope.assetListOwned[0].name} (${$scope.assetListOwned[0].symbol})`;
                $scope.selectedSendContract = $scope.assetListOwned[0].contractaddress;
                $scope.assetToSend = $scope.assetListOwned[0].contractaddress;
                $scope.getAssetBalance();
            })
        }
    })

    $scope.privateAccess = false;

    $scope.swapRecallSuccess = false;

    $scope.swapInfo = {};

    var applyScope = function () {
        if (!$scope.$$phase) $scope.$apply();
    }


    $scope.swapInformationModalOpen = async function (swap_id) {
        console.log(swap_id);
        let data = {};

        try {
            await web3.fsn.allSwaps().then(function (res) {
                data = res[swap_id];
            })
        } catch (err){
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
            fromStartTime = data["FromStartTime"];
        }
        if (data["FromEndTime"] == 18446744073709552000) {
            fromEndTime = 'Forever';
        } else {
            fromEndTime = data["FromEndTime"];
        }

        if (data["ToStartTime"] == 0) {
            toStartTime = 'Now';
        } else {
            toStartTime = data["ToStartTime"];
        }
        if (data["ToEndTime"] == 18446744073709552000) {
            toEndTime = 'Forever';
        } else {
            toEndTime = data["ToEndTime"];
        }

        let targes;

        data["Targes"].length >= 0 ? targes = 'Public' : targes = 'Private';

        let fromAsset = {};
        let toAsset = {};

        try {
            await web3.fsn.getAsset(data["FromAssetID"]).then(function (res) {
                fromAsset = res;
            });
        } catch (err){
            console.log(err);
        }

        try {
            await web3.fsn.getAsset(data["ToAssetID"]).then(function (res) {
                toAsset = res;
            });
        } catch (err){
            console.log(err);
        }

        let minFromAmount;
        let minToAmount;

        minFromAmount = data["MinFromAmount"] / $scope.countDecimals(fromAsset["Decimals"]);
        minToAmount = data["MinToAmount"] / $scope.countDecimals(toAsset["Decimals"]);


        $scope.$eval(function () {
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

        console.log($scope.swapInfo);

        $scope.swapInformationModal.open();
    }


    $scope.toHexString = function (byteArray) {
        var s = '0x';
        byteArray.forEach(function (byte) {
            s += ('0' + (byte & 0xFF).toString(16)).slice(-2);
        });
        return s;
    }

    $scope.setReceiveAsset = function (id) {
        $scope.$eval(function () {
            $scope.selectedReceiveAsset = `${$scope.assetList[id].name} (${$scope.assetList[id].symbol})`;
            $scope.selectedReceiveContract = $scope.assetList[id].contractaddress;
            $scope.assetToReceive = $scope.assetList[id].contractaddress;
            $scope.receiveDropDown = false;
        })
    }

    $scope.setSendAsset = function (id) {
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

    $scope.setWalletAddress = function () {
        if (walletService.password !== '') {
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
        }); } catch (err){
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
        if (walletService.password !== '') {
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
                } catch (err){
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

        console.log($scope.swapsList[id]);

        let fromAsset = [];

        try {
        await web3.fsn.getBalance($scope.swapsList[id].fromAssetId, walletAddress).then(function (res) {
            balance = res;
        }); } catch (err){
            console.log(err);
        }

        balance = balance / $scope.countDecimals(fromAsset["Decimals"]);

        $scope.$eval(function () {
            $scope.takeDataFront.swapId = $scope.swapsList[id];
            $scope.takeDataFront.fromAssetSymbol = $scope.swapsList[id].fromAssetSymbol;
            $scope.takeDataFront.fromAssetId = $scope.swapsList[id].fromAssetId;
            $scope.takeDataFront.fromAssetMin = $scope.swapsList[id].minswap;
            $scope.takeDataFront.toAssetSymbol = $scope.swapsList[id].toAssetSymbol;
            $scope.takeDataFront.toAssetMin = $scope.swapsList[id].toAssetId;
            $scope.takeDataFront.fromAssetBalance = $scope.swapsList[id].minswap;
            $scope.takeDataFront.swapRate = $scope.swapsList[id].swaprate;
            $scope.takeDataFront.maxAmount = $scope.swapsList[id].swaprate;
        })

        $scope.takeSwapModal.open();
    }

    $scope.setReceive = function () {
        $scope.receiveTokens = $scope.takeAmountSwap / $scope.takeDataFront.swapRate;
    }

    $scope.takeSwap = async function (asset_id, swap_id, amount) {
        console.log(asset_id);
        console.log(swap_id);
        let password = walletService.password;
        let accountData = uiFuncs.getTxData($scope);
        let walletAddress = accountData.from;
        let toAsset = [];

        try {
            await web3.fsn.getAsset(asset_id).then(function (res) {
                toAsset = res;
            });
        } catch (err){
            console.log(err);
        }

        let take = amount * $scope.countDecimals(toAsset["Decimals"]);
        console.log(`This is Size -> ${take}`);

        let data = {
            from: walletAddress,
            SwapID: swap_id,
            Size: take.toString()
        };

        if (!$scope.account && ($scope.wallet.hwType !== "ledger")) {
            $scope.account = web3.eth.accounts.privateKeyToAccount($scope.toHexString($scope.wallet.getPrivateKey()));
        }

        try {
            await web3.fsntx.buildTakeSwapTx(data).then(function (tx) {
                tx.from = from;
                data = tx;
                if ($scope.wallet.hwType == "ledger") {
                    return;
                }
                return web3.fsn.signAndTransmit(tx, $scope.account.signTransaction).then(txHash => {
                    console.log(txHash);
                })
            })
        } catch (err) {
            console.log(err);
        }
    }

    $scope.switchAsset = function () {
        let sendAsset = $scope.assetToSend;
        let receiveAsset = $scope.assetToReceive;

        let canSwitch = false;
        let assetListOwnedId;
        let assetListId;

        for (let a = 0; a < $scope.assetListOwned.length; a++){
            if($scope.assetListOwned[a].contractaddress == receiveAsset){
                assetListOwnedId = $scope.assetListOwned[a].id;
                canSwitch = true;
                return;
            } else {
                canSwitch = false;
            }
        }

        for (let a = 0; a < $scope.assetList.length; a++){
            if($scope.assetList[a].contractaddress == sendAsset){
                assetListId = $scope.assetList[a].id;
                canSwitch = true;
                return;
            } else {
                canSwitch = false;
            }
        }

        if(canSwitch){
            $scope.setSendAsset(assetListOwnedId);
            $scope.setReceiveAsset(assetListId);
        }

    }

    $scope.makeModal = async function (send, receive) {
        $scope.makeSwapModal.open();
    }

    $scope.makeSwapConfirmation = async function (end) {
        let sendAsset = [];
        let receiveAsset = [];

        console.log('Make Swap Confirmation');

        try {
            await web3.fsn.getAsset($scope.assetToSend).then(function (res) {
                sendAsset = res;
            });
        } catch (err){
            console.log(err);
        }

        try {
            await web3.fsn.getAsset($scope.assetToReceive).then(function (res) {
                receiveAsset = res;
            });
        } catch (err){
            console.log(err);
        }

        $scope.$eval(function () {
            $scope.assetToSendConfirm = sendAsset["Symbol"];
            $scope.assetToReceiveConfirm = receiveAsset["Symbol"];
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


    $scope.makeSwap = async function () {
        let password = walletService.password;
        let accountData = uiFuncs.getTxData($scope);
        let walletAddress = accountData.from;

        let fromAsset = [];
        let toAsset = [];


        try {
        await web3.fsn.getAsset($scope.assetToSend).then(function (res) {
            fromAsset = res;
        }); } catch (err) {
            console.log(err);
        }


        try {
        await web3.fsn.getAsset($scope.assetToReceive).then(function (res) {
            toAsset = res;
        }); } catch (err){
            console.log(err);
        }

        let targes = '';

        $scope.makeTarges !== '' ? targes = [$scope.makeTarges] : targes = [];

        let minToAmountHex = web3.utils.numberToHex($scope.makeReceiveAmount * $scope.countDecimals(toAsset["Decimals"]));
        let minFromAmountHex = web3.utils.numberToHex($scope.makeSendAmount * $scope.countDecimals(fromAsset["Decimals"]));

        let data = {
            from: walletAddress,
            FromAssetID: $scope.assetToSend,
            ToAssetID: $scope.assetToReceive,
            MinToAmount: minToAmountHex,
            MinFromAmount: minFromAmountHex,
            SwapSize: parseInt($scope.makeMinumumSwap),
            Targes: targes
        };

        if ($scope.transactionType == 'scheduled') {
            let fromStartTime = getHexDate(convertDate($scope.fromStartTime));
            let fromEndTime = getHexDate(convertDate($scope.fromEndTime));

            data = {
                from: walletAddress,
                FromAssetID: $scope.assetToSend,
                ToAssetID: $scope.assetToReceive,
                MinToAmount: minToAmountHex,
                MinFromAmount: minFromAmountHex,
                SwapSize: parseInt($scope.makeMinumumSwap),
                Targes: targes,
                FromStartTime: fromStartTime,
                FromEndTime: fromEndTime
            };
        }

        console.log(data);

        if (!$scope.account && ($scope.wallet.hwType !== "ledger")) {
            $scope.account = web3.eth.accounts.privateKeyToAccount($scope.toHexString($scope.wallet.getPrivateKey()));
        }

        try {
            await web3.fsntx.buildMakeSwapTx(data).then(function (tx) {
                console.log(tx);
                tx.from = walletAddress;
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
            console.log(err);
        }
    }

    $scope.recallModal = function (swap_id) {
        $scope.swapRecallSuccess = false;
        $scope.recallAssetModal.open();
        $scope.recallAssetId = swap_id;

    }

    $scope.recallSwap = async function (swap_id) {
        if (walletService.password !== '') {
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
                console.log(err);
            }
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

        try {
            await web3.fsn.getBalance(asset, walletAddress).then(function (res) {
                assetBalance = res;
            });
        } catch (err){
            console.log(err);
        }

        let balance = parseInt(assetBalance) / $scope.countDecimals(decimals);

        $scope.$eval(function () {
            $scope.selectedAssetBalance = balance;
        });
    }


    $scope.allSwaps = async function () {
        let swapList = [];
        let swapListFront = [];
        $scope.openMakeSwaps = 0;

        if (walletService.password !== '') {
            let accountData = uiFuncs.getTxData($scope);
            let walletAddress = accountData.from;
            console.log(walletAddress);

            try {
            await web3.fsn.allSwaps().then(function (res) {
                swapList = res;
            }); } catch (err){
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
                }); } catch (err){
                    console.log(err);
                }

                let fromAsset = [];
                let toAsset = [];

                try {
                    await web3.fsn.getAsset(swapList[asset]["FromAssetID"]).then(function (res) {
                        fromAsset = res;
                    });
                } catch(err){

                }

                try {
                await web3.fsn.getAsset(swapList[asset]["ToAssetID"]).then(function (res) {
                    toAsset = res;
                }); } catch(err){

                }

                owner === walletAddress ? owned = true : owned = false;

                let fromAmount = (swapList[asset].MinFromAmount / $scope.countDecimals(fromAsset.Decimals));

                console.log(swapList[asset].MinFromAmount);
                console.log(`$scope.countDecimals(${fromAsset.Decimals})`);
                console.log($scope.countDecimals(fromAsset.Decimals));
                console.log(`The answer is ${fromAmount}`);


                let toAmount = swapList[asset].MinToAmount / $scope.countDecimals(toAsset.Decimals);
                let swapRate = fromAmount / toAmount;
                let time = new Date(parseInt(swapList[asset]["Time"]) * 1000);

                let tMonth = time.getMonth();
                let tDay = time.getDate();
                let tYear = time.getFullYear();

                time = $scope.months[tMonth] + ' ' + tDay + ', ' + tYear;

                let minimumswap = fromAmount / parseInt(swapList[asset]["SwapSize"]);
                let targes = '';

                console.log(swapList[asset]["Targes"]);

                swapList[asset]["Targes"].length > 0 ? targes = 'Private' : targes = 'Public';

                console.log(swapList[asset]["Targes"]);

                let ownerAddr = '';

                try {
                await web3.fsn.getNotation(swapList[asset]["Owner"]).then(function (res) {
                    ownerAddr = res;
                }) } catch (err){
                    console.log(err);
                }

                if (ownerAddr == 0) {
                    ownerAddr = 'Owner has no USAN';
                }

                if (owned == true) {
                    $scope.openMakeSwaps++;
                }

                let data = {
                    "id": swapListFront.length,
                    "swap_id": swapList[asset]["ID"],
                    "fromAssetId": swapList[asset]["FromAssetID"],
                    "fromAssetSymbol": fromAsset["Symbol"],
                    "fromAmount": fromAmount,
                    "toAssetId": swapList[asset]["ToAssetID"],
                    "toAmount": toAmount,
                    "toAssetSymbol": toAsset["Symbol"],
                    "swaprate": swapRate,
                    "minswap": minimumswap,
                    "time": time.toLocaleString(),
                    "targes": targes,
                    "owner": ownerAddr,
                    "owned": owned
                }
                await swapListFront.push(data);
            }
        }
        $scope.$eval(function () {
            $scope.swapsList = swapListFront;
            $scope.swapsList = swapListFront;
        });
        console.log($scope.swapsList);
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
