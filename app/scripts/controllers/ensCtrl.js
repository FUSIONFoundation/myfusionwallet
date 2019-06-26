"use strict";

var ensCtrl = function ($scope, $sce, walletService, $rootScope) {
    let nu = localStorage.getItem(window.cookieName);
    let data = nu ? JSON.parse(nu) : {};
    let _CHAINID = window.defaultChainId;

    if (data.chainid !== "") {
        _CHAINID = data.chainid;
    }

    window.__fsnGetAllAssets();

    $scope.init = async function () {
        if (!$scope.wallet) {
            return;
        }
        $scope.getShortAddressNotation();
        $scope.getTimeLockBalances().then(function () {
            $scope.getAllAssets().then(function () {
                $scope.setSendAndReceiveInit();
            });
        });
        $scope.allSwaps();
        $scope.takeGetAllBalances();
        $scope.sortSwapMarket("timePosix");
        $scope.sortOpenMakes("timePosix");
        $scope.getBalance();
        $scope.setWalletAddress();
        $scope.takeGetAllBalances();
        $scope.openMakesList();
    };

    setInterval(function () {
        if ($scope.wallet == null) {
            return;
        }
        $scope.getAllAssets();
        $scope.getTimeLockBalances();
        $scope.takeGetAllBalances();
        $scope.getShortAddressNotation();
        $scope.getBalance();
        $scope.setWalletAddress();
        $scope.takeGetAllBalances();
        $scope.getVerifiedAssets();
        $scope.openMakesList();
    }, 7000);

    $scope.mayRun = false;

    $scope.$watch("wallet", function () {
        $scope.init();
        $scope.mayRun = true;
    });

    $scope.months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
    ];
    window.verifiedAssetsImages = {};
    $scope.todayDate = formatDate();

    $scope.getVerifiedAssets = async function () {
        window.verifiedAssetsImages = await window.__fsnGetAllVerifiedAssets();
    };

    $scope.getVerifiedAssets();

    $scope.convertToString = function (input) {
        if (input === "") {
            return;
        }
        if (input == null) {
            return;
        }
        if (typeof input === "undefined") {
            return;
        }
        return input.toString();
    };

    function formatDate() {
        let d = new Date(),
            month = "" + (d.getMonth() + 1),
            day = "" + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = "0" + month;
        if (day.length < 2) day = "0" + day;

        return [year, month, day].join("-");
    }

    $scope.currentPage = 0;
    $scope.pageSize = 10;
    $scope.endPage = 0;
    $scope.shownRows = 0;

    $scope.sendTimeLock = "none";
    $scope.showTimeLockSend = false;
    $scope.showTimeLockReceive = false;

    $scope.selectedTimeLockTimespan = "-";
    $scope.selectedTimeLockAmount = "Select time-lock";

    $scope.closeExistingTimeLock = function () {
        $scope.$eval(function () {
            $scope.selectedTimeLockTimespan = "-";
            $scope.selectedTimeLockAmount = "Select time-lock";
            $scope.todayData = "";
            $scope.fromEndTime = "";
            $scope.hasTimeLockSet = false;
        });
    };

    $scope.checkDate = function () {
        if ($scope.transactionType == "scheduled") {
            return;
        } else {
            let today = new Date();
            if ($scope.fromEndTime < today) {
                $scope.$eval(function () {
                    $scope.fromEndTime = today;
                });
            }
            if ($scope.fromEndTime < $scope.fromStartTime) {
                $scope.$eval(function () {
                    $scope.fromStartTime = today;
                });
            }
        }
    };

    // Sets the last page for pagination
    $scope.$watch("swapsList", function () {
        if (typeof $scope.swapsList === "undefined") {
            return;
        } else {
            $scope.$eval(function () {
                $scope.endPage = Math.ceil($scope.swapsList.length / $scope.pageSize);
            });
        }
    });

    $scope.$watch("swapsList", function () {
        if (typeof $scope.swapsList === "undefined") {
            return;
        }
        if ($scope.currentPage == 0) {
            $scope.$eval(function () {
                $scope.shownRows = $scope.currentPage + 1 * $scope.pageSize;
            });
        }
        let shownRows = 0;
        if (($scope.currentPage + 1) * $scope.pageSize > $scope.swapsList.length) {
            shownRows = $scope.swapsList.length;
        } else {
            shownRows = ($scope.currentPage + 1) * $scope.pageSize;
        }
        $scope.$eval(function () {
            $scope.shownRows = shownRows;
        });
    });

    $scope.nextPage = function () {
        if ($scope.currentPage !== $scope.endPage - 1) {
            $scope.$eval(function () {
                $scope.currentPage = $scope.currentPage + 1;
                $scope.searchSwapMarket = "";
            });
        }
        if (($scope.currentPage + 1) * $scope.pageSize > $scope.swapsList.length) {
            $scope.$eval(function () {
                $scope.shownRows = $scope.swapsList.length;
                $scope.searchSwapMarket = "";
            });
        } else {
            $scope.$eval(function () {
                $scope.shownRows = ($scope.currentPage + 1) * $scope.pageSize;
                $scope.searchSwapMarket = "";
            });
        }
    };

    $scope.firstPage = function () {
        $scope.$eval(function () {
            $scope.currentPage = 0;
            $scope.searchSwapMarket = "";
        });
        if (($scope.currentPage + 1) * $scope.pageSize > $scope.swapsList.length) {
            $scope.$eval(function () {
                $scope.shownRows = $scope.swapsList.length;
                $scope.searchSwapMarket = "";
            });
        } else {
            $scope.$eval(function () {
                $scope.shownRows = ($scope.currentPage + 1) * $scope.pageSize;
                $scope.searchSwapMarket = "";
            });
        }
    };
    $scope.lastPage = function () {
        $scope.$eval(function () {
            $scope.currentPage = $scope.endPage - 1;
            $scope.searchSwapMarket = "";
        });
        if (($scope.currentPage + 1) * $scope.pageSize > $scope.swapsList.length) {
            $scope.$eval(function () {
                $scope.shownRows = $scope.swapsList.length;
                $scope.searchSwapMarket = "";
            });
        } else {
            $scope.$eval(function () {
                $scope.shownRows = ($scope.currentPage + 1) * $scope.pageSize;
                $scope.searchSwapMarket = "";
            });
        }
    };

    $scope.previousPage = function () {
        if ($scope.currentPage !== 0) {
            $scope.$eval(function () {
                $scope.currentPage = $scope.currentPage - 1;
                $scope.searchSwapMarket = "";
            });
        }
        if (($scope.currentPage + 1) * $scope.pageSize > $scope.swapsList.length) {
            $scope.$eval(function () {
                $scope.shownRows = $scope.swapsList.length;
                $scope.searchSwapMarket = "";
            });
        } else {
            $scope.$eval(function () {
                $scope.shownRows = ($scope.currentPage + 1) * $scope.pageSize;
                $scope.searchSwapMarket = "";
            });
        }
    };

    let BN = web3.utils.BN;

    $scope.tx = {};
    $scope.takeDataFront = {
        fromAssetSymbol: "",
        toAssetSymbol: "",
        fromAssetBalance: "",
        swapRate: "",
        toAssetMin: "",
        fromAssetMin: "",
        maxAmount: "",
        swapId: "",
        fromAssetId: ""
    };
    $scope.sortKey = "timePosix";
    $scope.sortSwapMarket = function (keyname) {
        $scope.sortKey = keyname; //set the sortKey to the param passed
        $scope.reverse = !$scope.reverse; //if true make it false and vice versa
    };
    $scope.sortOpenMakes = function (keyname) {
        $scope.sortKeyMake = keyname; //set the sortKey to the param passed
        $scope.reverseMake = !$scope.reverseMake; //if true make it false and vice versa
    };

    $scope.wholeNumberOfFills = function () {
        $scope.$eval(function () {
            $scope.makeMinumumSwap = $scope.makeMinumumSwap.toFixed(0);
        });
    };

    $scope.makeBigNumber = function (amount, decimals) {
        try {
            // Allow .0
            if (amount.substr(0, 1) == ".") {
                let a = "0" + amount;
                amount = a;
            }
            let pieces = amount.split(".");
            let d = parseInt(decimals);
            if (pieces.length === 1) {
                amount = parseInt(amount);
                if (isNaN(amount) || amount < 0) {
                    // error message
                    return;
                }
                amount = new BN(amount + "0".repeat(parseInt(decimals)));
            } else if (pieces.length > 2) {
                console.log("error");
                $scope.errorModal.open();
                // error message
                return;
            } else if (pieces[1].length >= d) {
                console.log("error");
                $scope.errorModal.open();
                return; // error
            } else {
                let dec = parseInt(pieces[1]);
                let reg = new RegExp("^\\d+$"); // numbers only
                if (isNaN(pieces[1]) || dec < 0 || !reg.test(pieces[1])) {
                    console.log("error");
                    $scope.errorModal.open();
                    return;
                    // return error
                }
                dec = pieces[1];
                let declen = d - dec.toString().length;
                amount = parseInt(pieces[0]);
                if (isNaN(amount) || amount < 0) {
                    console.log("error");
                    $scope.errorModal.open();
                    // error message
                    return;
                }
                amount = new BN(amount + dec + "0".repeat(parseInt(declen)));
            }
            return amount;
        } catch (err) {
            $scope.errorModal.open();
        }
    };

    $scope.sortByString = "Default";
    $scope.takeAmountSwap = "";
    $scope.showOpenTakes = false;
    $scope.showSwapMarket = true;
    $scope.showOpenMakes = false;
    $scope.receiveTokens = "";
    $scope.walletAddress = "";
    $scope.assetToSendConfirm = "";
    $scope.assetToReceiveConfirm = "";
    $scope.makeSendAmount = "";
    $scope.openMakeSwaps = 0;
    $scope.openTakeSwapsTotal = 0;
    $scope.makeReceiveAmount = "";
    $scope.makeTarges = "";
    $scope.web3WalletBalance = "Loading...";
    $scope.selectedSendAsset = "Select asset";
    $scope.addressNotation = "";
    $scope.makeMinumumSwap = 1;
    $scope.receiveTimeLock = "none";
    $scope.ajaxReq = ajaxReq;
    $scope.unitReadable = ajaxReq.type;
    $scope.recallAssetModal = new Modal(document.getElementById("recallAsset"));
    $scope.takeSwapModal = new Modal(document.getElementById("takeSwap"));
    $scope.makeSwapModal = new Modal(document.getElementById("makeSwap"));
    $scope.makeSwapConfirmModal = new Modal(
        document.getElementById("makeSwapConfirm")
    );
    $scope.makeSwapConfirmEndModal = new Modal(
        document.getElementById("makeSwapEndConfirm")
    );
    $scope.recallSwapSuccess = new Modal(
        document.getElementById("recallSwapSuccess")
    );
    $scope.swapInformationModal = new Modal(
        document.getElementById("swapInformationModal")
    );
    $scope.takeSwapConfirm = new Modal(
        document.getElementById("takeSwapConfirm")
    );
    $scope.errorModal = new Modal(document.getElementById("errorModal"));
    $scope.takeSwapEndConfirm = new Modal(
        document.getElementById("takeSwapEndConfirm")
    );
    $scope.showLoader = true;

    $scope.receiveDropDown = false;
    $scope.selectedReceiveAsset = "Select asset";
    $scope.selectedReceiveContract = "-";
    $scope.selectedSendAsset = "Select asset";
    $scope.selectedSendContract = "-";

    $scope.initializeSendandReceive = true;

    $scope.receiveChanged = 0;
    $scope.sendChanged = 0;

    $scope.setSendAndReceiveInit = function () {
        $scope.selectedReceiveAsset = `${$scope.assetList[0].name} (${
            $scope.assetList[0].symbol
            })`;
        $scope.selectedReceiveContract = $scope.assetList[0].contractaddress;
        $scope.assetToReceive = $scope.assetList[0].contractaddress;
        $scope.selectedReceiveImage = `${$scope.assetList[0].image}`;
        $scope.selectedReceiveHasImage = $scope.assetList[0].hasImage;
        $scope.selectedReceiveVerified = $scope.assetList[0].verified;
        // Receive part
        $scope.selectedSendAsset = `${$scope.assetListOwned[0].name} (${
            $scope.assetListOwned[0].symbol
            })`;
        $scope.selectedSendAssetSymbol = `${$scope.assetListOwned[0].symbol}`;
        $scope.selectedReceiveAssetSymbol = `${$scope.assetList[0].symbol}`;
        $scope.selectedSendContract = $scope.assetListOwned[0].contractaddress;
        $scope.selectedSendImage = `${$scope.assetListOwned[0].image}`;
        $scope.selectedSendHasImage = $scope.assetListOwned[0].hasImage;
        $scope.selectedSendVerified = $scope.assetListOwned[0].verified;
        $scope.assetToSend = $scope.assetListOwned[0].contractaddress;
        $scope.getAssetBalance();
    };

    $scope.privateAccess = false;

    $scope.swapRecallSuccess = false;

    $scope.swapInfo = {};

    $scope.swapInformationModalOpen = async function (swap_id) {
        let data = {};
        let owner = ''

        await ajaxReq.http.get(`${window.getApiServer()}/swaps/${swap_id}`).then(function (r) {
            data = JSON.parse(r.data[0].data);
            owner = r.data[0].fromAddress;
        });

        let time = new Date(parseInt(data["Time"]) * 1000);

        let tMonth = time.getMonth();
        let tDay = time.getDate();
        let tYear = time.getFullYear();

        time = $scope.months[tMonth] + " " + tDay + ", " + tYear;

        let fromStartTime = "";
        let fromEndTime = "";
        let toStartTime = "";
        let toEndTime = "";

        if (data["FromStartTime"] == 0) {
            fromStartTime = "Now";
        } else {
            fromStartTime = $scope.returnDateString(data["FromStartTime"]);
        }
        if (data["FromEndTime"] == 18446744073709552000) {
            fromEndTime = "Forever";
        } else {
            fromEndTime = $scope.returnDateString(data["FromEndTime"]);
        }

        if (data["ToStartTime"] == 0) {
            toStartTime = "Now";
        } else {
            toStartTime = $scope.returnDateString(data["ToStartTime"]);
        }
        if (data["ToEndTime"] == 18446744073709552000) {
            toEndTime = "Forever";
        } else {
            toEndTime = $scope.returnDateString(data["ToEndTime"]);
        }

        let targes = [];

        data["Targes"].length <= 0 ? (targes = "Public") : (targes = "Private");

        let fromAsset = {};
        let toAsset = {};

        try {
            await window.__fsnGetAsset(data["FromAssetID"]).then(function (res) {
                fromAsset = res;
            });
        } catch (err) {
            console.log(err);
        }

        try {
            await window.__fsnGetAsset(data["ToAssetID"]).then(function (res) {
                toAsset = res;
            });
        } catch (err) {
            console.log(err);
        }

        let minFromAmount;
        let minToAmount;

        minFromAmount =
            data["MinFromAmount"] / $scope.countDecimals(fromAsset["Decimals"]);
        minToAmount =
            data["MinToAmount"] / $scope.countDecimals(toAsset["Decimals"]);

        let fromVerifiedImage = "";
        let fromHasImage = false;
        let fromVerified = false;

        for (let a in window.verifiedAssetsImages) {
            if (window.verifiedAssetsImages[a].assetID == data["FromAssetID"]) {
                // Set matched image name
                fromVerifiedImage = window.verifiedAssetsImages[a].image;
                fromHasImage = true;
                fromVerified = true;
            } else if (
                data["FromAssetID"] ==
                "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
            ) {
                // Set matched image name
                fromVerifiedImage = "";
                fromHasImage = false;
                fromVerified = true;
            }
        }

        let toVerifiedImage = "";
        let toHasImage = false;
        let toVerified = false;

        for (let a in window.verifiedAssetsImages) {
            if (window.verifiedAssetsImages[a].assetID == data["ToAssetID"]) {
                // Set matched image name
                toVerifiedImage = window.verifiedAssetsImages[a].image;
                toHasImage = true;
                toVerified = true;
            } else if (
                data["ToAssetID"] ==
                "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
            ) {
                // Set matched image name
                toVerifiedImage = "";
                toHasImage = false;
                toVerified = true;
            }
        }

        $scope.$apply(function () {
            $scope.swapInfo = {
                FromAssetName: fromAsset["Name"],
                FromAssetSymbol: fromAsset["Symbol"],
                FromAssetID: data["FromAssetID"],
                FromEndTime: fromEndTime,
                FromStartTime: fromStartTime,
                ID: data["SwapID"],
                MinFromAmount: minFromAmount,
                MinToAmount: minToAmount,
                Owner: owner,
                SwapSize: data["SwapSize"],
                Targes: targes,
                Time: time,
                ToAssetName: toAsset["Name"],
                ToAssetSymbol: toAsset["Symbol"],
                ToAssetID: data["ToAssetID"],
                ToEndTime: toEndTime,
                ToStartTime: toStartTime,
                toVerifiedImage: toVerifiedImage,
                toHasImage: toHasImage,
                toVerified: toVerified,
                fromVerifiedImage: fromVerifiedImage,
                fromHasImage: fromHasImage,
                fromVerified: fromVerified
            };
        });

        $scope.swapInformationModal.open();
    };

    $scope.setExistingTimeLock = function (asset_id, id) {
        $scope.$eval(function () {
            $scope.selectedAssetBalance =
                $scope.myActiveTimeLocks[asset_id][id].amount;
            $scope.selectedTimeLockAmount =
                $scope.myActiveTimeLocks[asset_id][id].amount;
            $scope.selectedTimeLockTimespan = `${
                $scope.myActiveTimeLocks[asset_id][id].startTimeString
                } - ${$scope.myActiveTimeLocks[asset_id][id].endTimeString}`;
            $scope.todayDate = $scope.myActiveTimeLocks[asset_id][id].startTime;
            $scope.fromEndTime = $scope.myActiveTimeLocks[asset_id][id].endTime;
            $scope.hasTimeLockSet = true;
            $scope.timeLockDropDown = false;
        });
    };

    $scope.setSwapRate = function () {
        if ($scope.makeReceiveAmount <= 0) {
            return;
        }
        window.Decimal.set({precision: 18, rounding: 4});

        let makeSendAmountBN = new Decimal(
            $scope.convertToString($scope.makeSendAmount)
        );
        let makeReceiveAmountBN = new Decimal(
            $scope.convertToString($scope.makeReceiveAmount)
        );

        let swapRateFinal = makeSendAmountBN.div(makeReceiveAmountBN);

        $scope.makeSendSwapRate = swapRateFinal.toString();
    };

    $scope.setSendAmountMakeSwap = function () {
        if ($scope.makeReceiveAmount <= 0 || $scope.makeSendSwapRate <= 0) {
            return;
        }
        let makeSendSwapRateBN = new BigNumber(
            $scope.convertToString($scope.makeSendSwapRate)
        );
        let makeReceiveAmountBN = new BigNumber(
            $scope.convertToString($scope.makeReceiveAmount)
        );

        let sendAmountFinal = makeSendSwapRateBN.mul(makeReceiveAmountBN);

        $scope.makeSendAmount = sendAmountFinal.toString();
    };

    $scope.setReceiveAmountMakeSwap = function () {
        if ($scope.makeSendAmount <= 0 || $scope.makeSendSwapRate <= 0) {
            return;
        }
        window.Decimal.set({precision: 18, rounding: 4});
        let one = new Decimal($scope.convertToString(1));
        let makeSendSwapRateBN = new Decimal(
            $scope.convertToString($scope.makeSendSwapRate)
        );
        let makeSendAmountBN = new Decimal(
            $scope.convertToString($scope.makeSendAmount)
        );

        let calc = one.div(makeSendSwapRateBN);

        let receiveAmountFinal = makeSendAmountBN.mul(calc);

        $scope.makeReceiveAmount = receiveAmountFinal.toString();
    };

    $scope.toHexString = function (byteArray) {
        var s = "0x";
        byteArray.forEach(function (byte) {
            s += ("0" + (byte & 0xff).toString(16)).slice(-2);
        });
        return s;
    };

    $scope.setMinimumMakes = function () {
        if (
            $scope.makeMinumumSwap <= 0 ||
            $scope.makeMinumumSwap == "" ||
            $scope.makeSendAmount <= 0 ||
            $scope.makeReceiveAmount <= 0
        ) {
            return;
        }

        let makeMinBN = new window.BigNumber(
            $scope.convertToString($scope.makeMinumumSwap)
        );

        //Send an receive
        let makeSendBN = new window.BigNumber(
            $scope.convertToString($scope.makeSendAmount)
        );
        let makeReceiveBN = new window.BigNumber(
            $scope.convertToString($scope.makeReceiveAmount)
        );

        let makeSendFinal = makeSendBN.div(makeMinBN);
        let makeReceiveFinal = makeReceiveBN.div(makeMinBN);

        $scope.minimumMakeSend = makeSendFinal.toString();
        $scope.minimumReceiveSend = makeReceiveFinal.toString();
    };

    $scope.setReceiveAsset = async function (id) {
        $scope.$eval(function () {
            $scope.selectedReceiveAsset = `${$scope.assetList[id].name} (${
                $scope.assetList[id].symbol
                })`;
            $scope.selectedReceiveAssetSymbol = `${$scope.assetList[id].symbol}`;
            $scope.selectedReceiveImage = `${$scope.assetList[id].image}`;
            $scope.selectedReceiveHasImage = $scope.assetList[id].hasImage;
            $scope.selectedReceiveContract = $scope.assetList[id].contractaddress;
            $scope.selectedReceiveVerified = $scope.assetList[id].verified;
            $scope.assetToReceive = $scope.assetList[id].contractaddress;
            $scope.receiveDropDown = false;
            $scope.receiveDropDown2 = false;
        });
        $scope.receiveChanged = 1;
    };

    $scope.setSendAsset = async function (id) {
        $scope.$eval(function () {
            $scope.selectedSendAsset = `${$scope.assetListOwned[id].name} (${
                $scope.assetListOwned[id].symbol
                })`;
            $scope.selectedSendAssetSymbol = `${$scope.assetListOwned[id].symbol}`;
            $scope.selectedSendContract = $scope.assetListOwned[id].contractaddress;
            $scope.selectedSendImage = `${$scope.assetListOwned[id].image}`;
            $scope.selectedSendHasImage = $scope.assetListOwned[id].hasImage;
            $scope.assetToSend = $scope.assetListOwned[id].contractaddress;
            $scope.selectedSendVerified = $scope.assetListOwned[id].verified;
            $scope.sendHasTimeLockBalance = $scope.assetListOwned[id].timelockBalance;
            $scope.sendDropDown = false;
            $scope.sendDropDown2 = false;
        });
        $scope.getAssetBalance();
        $scope.sendChanged = 1;
    };

    $scope.copyToClipboard = function (text) {
        let clipboardAvailable;
        if (clipboardAvailable === undefined) {
            clipboardAvailable =
                typeof document.queryCommandSupported === "function" &&
                document.queryCommandSupported("copy");
        }
        let success = false;
        const body = document.body;

        if (body) {
            // add the text to a hidden node
            const node = document.createElement("span");
            node.textContent = text;
            node.style.opacity = "0";
            node.style.position = "absolute";
            node.style.whiteSpace = "pre-wrap";
            body.appendChild(node);

            // select the text
            const selection = window.getSelection();
            selection.removeAllRanges();
            const range = document.createRange();
            range.selectNodeContents(node);
            selection.addRange(range);

            // attempt to copy
            try {
                document.execCommand("copy");
                success = true;
            } catch (e) {
            }

            // remove selection and node
            selection.removeAllRanges();
            body.removeChild(node);
        }

        return success;
    };

    $scope.$watch(
        function () {
            if (walletService.wallet == null) return null;
            return walletService.wallet.getAddressString();
        },
        function () {
            if (walletService.wallet == null) return;
            $scope.wallet = walletService.wallet;
            $scope.wd = true;
        }
    );

    $scope.countDecimals = function (decimals) {
        let returnDecimals = "1";
        for (let i = 0; i < decimals; i++) {
            returnDecimals += "0";
        }
        return parseInt(returnDecimals);
    };

    $scope.setWalletAddress = function () {
        if (walletService.wallet !== null) {
            let accountData = uiFuncs.getTxData($scope);
            let walletAddress = accountData.from;
            $scope.walletAddress = walletAddress;
        }
    };

    $scope.myTimeLockedAssets = [];
    $scope.myActiveTimeLocks = [];
    $scope.getTimeLockBalances = async function () {
        let accountData = uiFuncs.getTxData($scope);
        let walletAddress = accountData.from;
        let allAssets = await window.__fsnGetAllAssets();
        await window.__fsnGetAllTimeLockBalances(walletAddress).then(function (res) {
            $scope.myActiveTimeLocks = [];
            for (let asset in res) {
                let timelocks = res[asset].Items;
                $scope.myActiveTimeLocks[asset] = [];
                let x = 0;
                for (let timelock in timelocks) {
                    let amount = new window.BigNumber(timelocks[timelock].Value);
                    let decimals = allAssets[asset].Decimals;
                    let divider = $scope.countDecimals(parseInt(decimals));
                    let amountFinal = amount.div(divider.toString());
                    let data = {
                        id: x,
                        asset_id: asset,
                        amount: amountFinal.toString(),
                        startTime: timelocks[timelock].StartTime,
                        endTime: timelocks[timelock].EndTime,
                        startTimeString: $scope.returnDateString(
                            timelocks[timelock].StartTime,
                            "Start"
                        ),
                        endTimeString: $scope.returnDateString(
                            timelocks[timelock].EndTime,
                            "End"
                        )
                    };
                    x++;
                    $scope.myActiveTimeLocks[asset].push(data);
                }
            }
            $scope.$eval(function () {
                $scope.myTimeLockedAssets = Object.keys(res);
            });
        });
    };

    $scope.hasTimeLockBalance = function (asset_id) {
        return $scope.myTimeLockedAssets.includes(asset_id);
    };
    $scope.takeAvailable = function (asset_id, minswaptaker, ToStartTime, ToEndTime) {
        if (ToStartTime == 0 && ToEndTime == 18446744073709552000) {
            if ($scope.allBalance[asset_id] > minswaptaker) {
                // console.log(asset_id, minswaptaker, ToStartTime, ToEndTime);
                return false;
            } else {
                return true;
            }
        }
        if (ToStartTime != 0 && ToEndTime != 18446744073709552000 || ToStartTime == 0 && ToEndTime != 18446744073709552000 || ToStartTime != 0 && ToEndTime == 18446744073709552000) {
            if ($scope.myTimeLockedAssets.includes(asset_id) == true) {
                return false;
            } else {
                return true;
            }
        }
    }


    $scope.getShortAddressNotation = async function () {
        let accountData = uiFuncs.getTxData($scope);
        let walletAddress = accountData.from;
        let notation = "";

        try {
            await window.__getNotation(walletAddress).then(function (res) {
                notation = res;
            });
        } catch (err) {
            console.log(err);
        }

        if (notation === 0) {
            $scope.addressNotation = "Not available";
        } else {
            $scope.$eval(function () {
                $scope.addressNotation = notation;
                $scope.addressNotation = notation;
            });
        }
        return notation;
    };

    $scope.getAllAssets = async function () {
        if (walletService.wallet !== null) {
            let accountData = uiFuncs.getTxData($scope);
            let walletAddress = accountData.from;
            let assetListOwned = [];
            let assetList2 = [];
            let assetList = await window.__fsnGetAllAssets();

            let x = 0;
            for (let asset in assetList) {
                let id = assetList[asset]["ID"];
                let owned = false;
                let assetBalance = "";

                let verifiedImage = "";
                let hasImage = false;
                let verifiedAsset = false;

                for (let a in window.verifiedAssetsImages) {
                    if (id == window.verifiedAssetsImages[a].assetID) {
                        // Set matched image name
                        verifiedImage = window.verifiedAssetsImages[a].image;
                        hasImage = true;
                        verifiedAsset = true;
                    }
                }

                let didFSN = false;
                // Set FSN icon for PSN as well
                if (
                    id ==
                    "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
                ) {
                    verifiedImage = "EFSN_LIGHT.svg";
                    hasImage = true;
                    verifiedAsset = true;
                    didFSN = true;
                }

                let data = {
                    id: x,
                    name: assetList[asset]["Name"],
                    symbol: assetList[asset]["Symbol"],
                    decimals: assetList[asset]["Decimals"],
                    contractaddress: id,
                    owner: owned,
                    image: verifiedImage,
                    hasImage: hasImage,
                    verified: verifiedAsset
                };
                if (!didFSN) {
                    await assetList2.push(data);
                }
                x++;
            }

            let balances = {};

            await window.__fsnGetAllBalances(walletAddress).then(function (res) {
                balances = res;
            });

            let a = Object.keys(balances),
                b = Object.keys($scope.myActiveTimeLocks);
            let c = a.concat(b);
            let ownedAssets = c.filter(function (item, pos) {
                return c.indexOf(item) == pos;
            });

            let myAssets = [];
            for (let i in ownedAssets) {
                let asset = ownedAssets[i];
                myAssets.push(assetList[asset]);
            }

            assetList = myAssets;


            for (let asset in assetList) {
                let id = assetList[asset]["ID"];
                id = assetList[asset]["ID"];
                let owner = assetList[asset]["Owner"];
                let owned = false;
                let assetBalance = "";

                let verifiedImage = "";
                let hasImage = false;
                let verifiedAsset = false;

                assetBalance = balances[id];

                for (let a in window.verifiedAssetsImages) {
                    if (id == window.verifiedAssetsImages[a].assetID) {
                        // Set matched image name
                        verifiedImage = window.verifiedAssetsImages[a].image;
                        hasImage = true;
                        verifiedAsset = true;
                    }
                }

                // Set FSN icon for PSN as well
                if (
                    id ==
                    "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
                ) {
                    verifiedImage = "EFSN_LIGHT.svg";
                    hasImage = true;
                    verifiedAsset = true;
                }

                let divider = $scope.countDecimals(assetList[asset]["Decimals"]);
                let data = {
                    id: assetList2.length,
                    name: assetList[asset]["Name"],
                    symbol: assetList[asset]["Symbol"],
                    decimals: assetList[asset]["Decimals"],
                    total: assetList[asset]["Total"] / divider,
                    contractaddress: id,
                    balance: assetBalance / divider,
                    owner: owned,
                    image: verifiedImage,
                    hasImage: hasImage,
                    verified: verifiedAsset
                };
                await assetList2.push(data);
                if (assetBalance > 0.000000000000000001) {
                    let divider = $scope.countDecimals(assetList[asset]["Decimals"]);
                    let data = {
                        id: assetListOwned.length,
                        name: assetList[asset]["Name"],
                        symbol: assetList[asset]["Symbol"],
                        decimals: assetList[asset]["Decimals"],
                        total: assetList[asset]["Total"] / divider,
                        contractaddress: id,
                        balance: assetBalance / divider,
                        owner: owned,
                        image: verifiedImage,
                        hasImage: hasImage,
                        verified: verifiedAsset,
                        timelockBalance: false
                    };
                    await assetListOwned.push(data);
                } else if (Object.keys($scope.myActiveTimeLocks).includes(id)) {
                    let divider = $scope.countDecimals(assetList[asset]["Decimals"]);
                    let data = {
                        id: assetListOwned.length,
                        name: assetList[asset]["Name"],
                        symbol: assetList[asset]["Symbol"],
                        decimals: assetList[asset]["Decimals"],
                        total: assetList[asset]["Total"] / divider,
                        contractaddress: id,
                        balance: 0,
                        owner: owned,
                        image: verifiedImage,
                        hasImage: hasImage,
                        verified: verifiedAsset,
                        timelockBalance: true
                    };
                    await assetListOwned.push(data);
                }
            }

            $scope.$eval(function () {
                $scope.assetList = assetList2;
                $scope.assetListOwned = assetListOwned;
            });
        }
    };

    $scope.setMaxTakeSwap = function () {
        let amount = "";
        if (
            $scope.takeDataFront.fromAssetBalance >= $scope.takeDataFront.maxAmount
        ) {
            amount = $scope.takeDataFront.maxAmount;
        } else {
            $scope.makeTarges;
            amount = $scope.takeDataFront.fromAssetBalance;
        }
        $scope.takeAmountSwap = amount;

        $scope.setReceive();
    };

    $scope.takeModal = async function (id) {
        let accountData = uiFuncs.getTxData($scope);
        let walletAddress = accountData.from;
        let balance = "";
        let decimals = 0;
        let toName = "";
        let fromName = "";

        let fromAsset = [];

        try {
            await web3.fsn
                .getBalance($scope.swapsList[id].toAssetId, walletAddress)
                .then(function (res) {
                    balance = res;
                });
            await window
                .__fsnGetAsset($scope.swapsList[id].toAssetId)
                .then(function (res) {
                    decimals = res["Decimals"];
                });
            await window
                .__fsnGetAsset($scope.swapsList[id].toAssetId)
                .then(function (res) {
                    toName = res["Name"];
                });
            await window
                .__fsnGetAsset($scope.swapsList[id].fromAssetId)
                .then(function (res) {
                    fromName = res["Name"];
                });
        } catch (err) {
            console.log(err);
        }

        balance = balance / $scope.countDecimals(decimals);

        await $scope.$apply(function () {
            $scope.takeDataFront.swapId = $scope.swapsList[id];
            $scope.takeDataFront.fromAssetName = toName;
            $scope.takeDataFront.fromAmountCut = $scope.swapsList[id].fromAmountCut;
            $scope.takeDataFront.toAmountCut = $scope.swapsList[id].toAmountCut;
            $scope.takeDataFront.fromAssetSymbol = $scope.swapsList[id].toAssetSymbol;
            $scope.takeDataFront.fromAssetId = $scope.swapsList[id].toAssetId;
            $scope.takeDataFront.swapSize = $scope.swapsList[id].maxswaps;
            $scope.takeDataFront.toAssetName = fromName;
            $scope.takeDataFront.toAssetMin =
                $scope.swapsList[id].minswap / $scope.swapsList[id].swapratetaker;
            $scope.takeDataFront.toAssetSymbol = $scope.swapsList[id].fromAssetSymbol;
            $scope.takeDataFront.toAssetId = $scope.swapsList[id].fromAssetId;
            $scope.takeDataFront.fromAssetMin = $scope.swapsList[id].minswaptaker;
            $scope.takeDataFront.fromAssetBalance = balance;
            $scope.takeDataFront.swapRate = $scope.swapsList[id].swapratetaker;
            $scope.takeDataFront.maxAmount = $scope.swapsList[id].toAmount;
            $scope.takeDataFront.fromAmount = $scope.swapsList[id].fromAmount;
            $scope.takeDataFront.toAmount = $scope.swapsList[id].toAmount;
            $scope.takeDataFront.fromVerified = $scope.swapsList[id].toVerified;
            $scope.takeDataFront.toVerified = $scope.swapsList[id].fromVerified;
            $scope.takeAmountSwap = 1;
        });

        await $scope.setReceive(1).then(function () {
            $scope.takeSwapModal.open();
        });
    };

    $scope.setReceive = async function (amount) {
        if ($scope.takeAmountSwap == "" || $scope.takeAmountSwap == 0) {
            $scope.$eval(function () {
                $scope.takeAmountSwap = 1;
            });
        }

        window.Decimal.set({precision: 18, rounding: 4});

        let perc1 = new window.Decimal(
            $scope.convertToString($scope.takeAmountSwap)
        );

        if (amount >= 0) {
            perc1 = new window.Decimal($scope.convertToString(1));
        }

        let perc2 = new window.Decimal(
            $scope.convertToString($scope.takeDataFront.swapSize)
        );
        let perc3 = perc1.div($scope.convertToString(perc2));

        let perc4 = perc1.dividedBy(perc2.toString());

        let fromAmountBN = new window.Decimal(
            $scope.convertToString($scope.takeDataFront.fromAmount)
        );
        let fromFinal = fromAmountBN.times($scope.convertToString(perc3));

        let toAmountBN = new window.Decimal(
            $scope.convertToString($scope.takeDataFront.toAmount)
        );
        let toFinal = toAmountBN.times($scope.convertToString(perc3));

        await $scope.$eval(function () {
            $scope.receiveTokens = fromFinal.toPrecision(5);
            $scope.sendTokens = toFinal.toPrecision(5);
        });
    };

    $scope.calculateSwapSize = function (amount, swap_size, maxamount) {
        let percentage = amount / maxamount;
        let calculatedSwapSize = swap_size * percentage;
        return calculatedSwapSize;
    };

    $scope.takeSwap = async function (asset_id, swap_id, amount) {
        let password = walletService.password;
        let accountData = uiFuncs.getTxData($scope);
        let walletAddress = accountData.from;
        let toAsset = [];

        try {
            await window.__fsnGetAsset(asset_id).then(function (res) {
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

        if (!$scope.account && $scope.wallet.hwType !== "ledger") {
            $scope.account = web3.eth.accounts.privateKeyToAccount(
                $scope.toHexString($scope.wallet.getPrivateKey())
            );
        }

        try {
            await web3.fsntx.buildTakeSwapTx(data).then(function (tx) {
                tx.from = walletAddress;
                tx.chainId = _CHAINID;
                data = tx;
                if ($scope.wallet.hwType == "ledger") {
                    return;
                }
                web3.fsn
                    .signAndTransmit(tx, $scope.account.signTransaction)
                    .then(txHash => {
                        console.log(txHash);
                    });

                return $scope.takeSwapEndConfirm.open();
            });
        } catch (err) {
            $scope.errorModal.open();
            console.log(err);
        }
        if ($scope.wallet.hwType == "ledger") {
            let ledgerConfig = {
                privKey: $scope.wallet.privKey
                    ? $scope.wallet.getPrivateKeyString()
                    : "",
                path: $scope.wallet.getPath(),
                hwType: $scope.wallet.getHWType(),
                hwTransport: $scope.wallet.getHWTransport()
            };
            let rawTx = data;
            var eTx = new ethUtil.Tx(rawTx);
            if (ledgerConfig.hwType == "ledger") {
                var app = new ledgerEth(ledgerConfig.hwTransport);
                var EIP155Supported = true;
                var localCallback = async function (result, error) {
                    if (typeof error != "undefined") {
                        if (callback !== undefined)
                            callback({
                                isError: true,
                                error: error
                            });
                        return;
                    }
                    var splitVersion = result["version"].split(".");
                    if (parseInt(splitVersion[0]) > 1) {
                        EIP155Supported = true;
                    } else if (parseInt(splitVersion[1]) > 0) {
                        EIP155Supported = true;
                    } else if (parseInt(splitVersion[2]) > 2) {
                        EIP155Supported = true;
                    }
                    var oldTx = Object.assign(rawTx, {});
                    let input = oldTx.input;
                    rawTx.chainId = _CHAINID;
                    return uiFuncs.signed(app, rawTx, ledgerConfig, false, function (res) {
                        oldTx.r = res.r;
                        oldTx.s = res.s;
                        oldTx.v = res.v;
                        oldTx.input = input;
                        delete oldTx.isError;
                        delete oldTx.rawTx;
                        delete oldTx.signedTx;
                        web3.fsntx.sendRawTransaction(oldTx).then(function (txHash) {
                            $scope.takeSwapEndConfirm.open();
                        });
                    });
                };
                $scope.notifier.info("Please, confirm transaction on Ledger.");
                await app.getAppConfiguration(localCallback);
            }
        }
    };

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

        try {
            if (
                $scope.assetListOwned[assetListOwnedId].contractaddress !== receiveAsset
            ) {
                canSwitch = false;
            }
        } catch (err) {
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
    };

    $scope.makeModal = async function (send, receive) {
        $scope.$eval(function () {
            $scope.makeSendAmount = 0;
            $scope.makeReceiveAmount = 0;
            $scope.makeMinumumSwap = 0;
            $scope.privateAccess = false;
            $scope.makeTarges = "";
            $scope.showTimeLockSend = false;
            $scope.showExistingTimeLocks = false;
            $scope.showTimeLockReceive = false;
            $scope.ToStartTime = "";
            $scope.ToEndTime = "";
            $scope.fromStartTime = "";
            $scope.fromEndTime = "";
        });
        $scope.makeSwapModal.open();
    };

    $scope.makeSwapConfirmation = async function (end) {
        let sendAssetSymbol = "";
        let receiveAssetSymbol = "";
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
            $scope.fromStartTimeString = $scope.returnDateString(
                new Date($scope.fromStartTime).getTime() / 1000.0 + 1000
            );
            $scope.fromEndTimeString = $scope.returnDateString(
                new Date($scope.fromEndTime).getTime() / 1000.0 + 1000
            );
            $scope.toStartTimeString = $scope.returnDateString(
                new Date($scope.ToStartTime).getTime() / 1000.0 + 1000
            );
            $scope.toEndTimeString = $scope.returnDateString(
                new Date($scope.ToEndTime).getTime() / 1000.0 + 1000
            );
        });

        if (end === "end") {
            $scope.makeSwapConfirmEndModal.open();
        } else if (end === "notend") {
            $scope.makeSwapConfirmModal.open();
        }
    };

    function convertDate(inputFormat) {
        function pad(s) {
            return s < 10 ? "0" + s : s;
        }

        var d = new Date(inputFormat);
        return [
            d.getUTCFullYear(),
            pad(d.getUTCMonth() + 1),
            pad(d.getUTCDate())
        ].join("-");
    }

    function getHexDate(d) {
        return "0x" + (new Date(d).getTime() / 1000).toString(16);
    }

    let targesArray = [];

    $scope.allBalance = [];

    $scope.hasEnoughBalance = function (
        asset_id,
        minswaptaker,
        startTime,
        endTime
    ) {
        if (startTime == 0 && endTime == 18446744073709552000) {
            if ($scope.allBalance[asset_id] > minswaptaker) {
                return true;
            } else {
                return true;
            }
        } else {
            return $scope.hasTimeLockBalance(asset_id);
        }
    };

    $scope.takeGetAllBalances = async function () {
        try {
            let accountData = uiFuncs.getTxData($scope);
            let walletAddress = accountData.from;
            let decimals = 0;
            let assetBalance = 0;

            let allAssets = {};
            await window.__fsnGetAllAssets().then(function(r){
                allAssets = r;
            })
            let allBalances = {};
            await window.__fsnGetAllBalances(walletAddress).then(function(r){
                allBalances = r;
            });

            let myBalances = [];
            for (let asset in allBalances) {
                decimals = allAssets[asset].Decimals;
                let amount = new Decimal(allBalances[asset]);
                let amountFinal = amount.div($scope.countDecimals(decimals).toString());
                myBalances[asset] = amountFinal.toString();
            }

            $scope.$eval(function () {
                $scope.allBalance = myBalances;
            });
        } catch (err) {
            console.log(err);
        }
    };

    $scope.makeSwap = async function () {
        targesArray = [];
        let password = walletService.password;
        let accountData = uiFuncs.getTxData($scope);
        let walletAddress = accountData.from;

        let fromAsset = [];
        let toAsset = [];

        try {
            await window.__fsnGetAsset($scope.assetToSend).then(function (res) {
                fromAsset = res;
            });
        } catch (err) {
            $scope.errorModal.open();
            console.log(err);
        }

        try {
            await window.__fsnGetAsset($scope.assetToReceive).then(function (res) {
                toAsset = res;
            });
        } catch (err) {
            $scope.errorModal.open();
            console.log(err);
        }

        if ($scope.makeTarges !== "") {
            $scope.makeTarges = $scope.makeTarges.replace(" ", "");
            let targesArr = $scope.makeTarges.split(",");
            await $scope.processAllTarges(targesArr, 0);

            console.log(targesArray);
        } else {
            targesArray = [];
        }

        if ($scope.makeMinumumSwap == "" || $scope.makeMinumumSwap <= 0) {
            $scope.makeMinumumSwap = 1;
        }

        //Global
        let makeMinimumSwapBN = new BigNumber(
            $scope.convertToString($scope.makeMinumumSwap)
        );

        //Receive Part
        BigNumber.config({DECIMAL_PLACES: parseInt(toAsset["Decimals"] - 1)});
        let makeReceiveAmountBN = new BigNumber(
            $scope.convertToString($scope.makeReceiveAmount)
        );
        let makeReceiveAmountDiv = makeReceiveAmountBN.div(makeMinimumSwapBN);
        let makeReceiveString = makeReceiveAmountDiv.toString();
        let makeReceiveFinal = $scope.makeBigNumber(
            makeReceiveString,
            parseInt(toAsset["Decimals"])
        );

        //Send Part
        BigNumber.config({DECIMAL_PLACES: parseInt(fromAsset["Decimals"] - 1)});
        let makeSendAmountBN = new BigNumber(
            $scope.convertToString($scope.makeSendAmount)
        );
        let makeSendAmountDiv = makeSendAmountBN.div(makeMinimumSwapBN);
        let makeSendString = makeSendAmountDiv.toString();
        let makeSendFinal = $scope.makeBigNumber(
            makeSendString,
            parseInt(fromAsset["Decimals"])
        );

        //Convert to Hex

        let minToAmountHex = "0x" + makeReceiveFinal.toString(16);
        let minFromAmountHex = "0x" + makeSendFinal.toString(16);

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
            if ($scope.sendTimeLock == "scheduled") {
                let fromStartTime = getHexDate(convertDate($scope.fromStartTime));
                let fromEndTime = web3.fsn.consts.TimeForeverStr;

                data.FromStartTime = fromStartTime;
                data.FromEndTime = fromEndTime;
            }
            if ($scope.sendTimeLock == "daterange") {
                let fromStartTime = getHexDate(convertDate($scope.todayDate));
                let fromEndTime = getHexDate(convertDate($scope.fromEndTime));

                data.FromStartTime = fromStartTime;
                data.FromEndTime = fromEndTime;
            }
        }

        if ($scope.hasTimeLockSet) {
            let fromStartTime = "0x" + ($scope.todayDate + 1).toString(16);
            let fromEndTime = "";
            if ($scope.fromEndTime == 18446744073709552000) {
                fromEndTime = web3.fsn.consts.TimeForeverStr;
            } else {
                fromEndTime = "0x" + ($scope.fromEndTime - 1).toString(16);
            }
            data.FromStartTime = fromStartTime;
            data.FromEndTime = fromEndTime;
        }

        // Receive part
        if ($scope.showTimeLockReceive == true) {
            if ($scope.receiveTimeLock == "scheduled") {
                let toStartTime = getHexDate(convertDate($scope.ToStartTime));
                let toEndTime = web3.fsn.consts.TimeForeverStr;

                data.ToStartTime = toStartTime;
                data.ToEndTime = toEndTime;
            }

            if ($scope.receiveTimeLock == "daterange") {
                let toStartTime = getHexDate(convertDate($scope.todayDate));
                let toEndTime = getHexDate(convertDate($scope.ToEndTime));

                data.ToStartTime = "0x0";
                data.ToEndTime = toEndTime;
            }
        }

        if (!$scope.account && $scope.wallet.hwType !== "ledger") {
            $scope.account = web3.eth.accounts.privateKeyToAccount(
                $scope.toHexString($scope.wallet.getPrivateKey())
            );
        }

        try {
            await web3.fsntx.buildMakeSwapTx(data).then(function (tx) {
                tx.from = walletAddress;
                tx.chainId = _CHAINID;
                data = tx;
                if ($scope.wallet.hwType == "ledger") {
                    return;
                }
                return web3.fsn
                    .signAndTransmit(tx, $scope.account.signTransaction)
                    .then(txHash => {
                        console.log(txHash);
                        $scope.makeSwapConfirmation("end");
                    });
            });
        } catch (err) {
            $scope.errorModal.open();
            console.log(err);
        }
        if ($scope.wallet.hwType == "ledger") {
            let ledgerConfig = {
                privKey: $scope.wallet.privKey
                    ? $scope.wallet.getPrivateKeyString()
                    : "",
                path: $scope.wallet.getPath(),
                hwType: $scope.wallet.getHWType(),
                hwTransport: $scope.wallet.getHWTransport()
            };
            let rawTx = data;
            var eTx = new ethUtil.Tx(rawTx);
            if (ledgerConfig.hwType == "ledger") {
                var app = new ledgerEth(ledgerConfig.hwTransport);
                var EIP155Supported = true;
                var localCallback = async function (result, error) {
                    if (typeof error != "undefined") {
                        if (callback !== undefined)
                            callback({
                                isError: true,
                                error: error
                            });
                        return;
                    }
                    var splitVersion = result["version"].split(".");
                    if (parseInt(splitVersion[0]) > 1) {
                        EIP155Supported = true;
                    } else if (parseInt(splitVersion[1]) > 0) {
                        EIP155Supported = true;
                    } else if (parseInt(splitVersion[2]) > 2) {
                        EIP155Supported = true;
                    }
                    var oldTx = Object.assign(rawTx, {});
                    let input = oldTx.input;
                    rawTx.chainId = _CHAINID;
                    return uiFuncs.signed(app, rawTx, ledgerConfig, false, function (res) {
                        oldTx.r = res.r;
                        oldTx.s = res.s;
                        oldTx.v = res.v;
                        oldTx.input = input;
                        delete oldTx.isError;
                        delete oldTx.rawTx;
                        delete oldTx.signedTx;
                        web3.fsntx.sendRawTransaction(oldTx).then(function (txHash) {
                            $scope.makeSwapConfirmation("end");
                        });
                    });
                };
                $scope.notifier.info("Please, confirm transaction on Ledger.");
                await app.getAppConfiguration(localCallback);
            }
        }
    };

    $scope.recallModal = function (swap_id) {
        $scope.swapRecallSuccess = false;
        $scope.recallAssetModal.open();
        $scope.recallAssetId = swap_id;
    };

    $scope.recallSwap = async function (swap_id) {
        if (walletService.wallet !== null) {
            let password = walletService.password;
            let accountData = uiFuncs.getTxData($scope);
            let walletAddress = accountData.from;

            let data = {
                from: walletAddress,
                SwapID: swap_id
            };

            if (!$scope.account && $scope.wallet.hwType !== "ledger") {
                $scope.account = web3.eth.accounts.privateKeyToAccount(
                    $scope.toHexString($scope.wallet.getPrivateKey())
                );
            }

            try {
                await web3.fsntx.buildRecallSwapTx(data).then(function (tx) {
                    tx.from = walletAddress;
                    tx.chainId = _CHAINID;
                    data = tx;
                    if ($scope.wallet.hwType == "ledger") {
                        return;
                    }
                    return web3.fsn
                        .signAndTransmit(tx, $scope.account.signTransaction)
                        .then(txHash => {
                            console.log(txHash);
                            $scope.recallSwapSuccess.open();
                        });
                });
            } catch (err) {
                $scope.errorModal.open();
                console.log(err);
            }
            if ($scope.wallet.hwType == "ledger") {
                let ledgerConfig = {
                    privKey: $scope.wallet.privKey
                        ? $scope.wallet.getPrivateKeyString()
                        : "",
                    path: $scope.wallet.getPath(),
                    hwType: $scope.wallet.getHWType(),
                    hwTransport: $scope.wallet.getHWTransport()
                };
                let rawTx = data;
                var eTx = new ethUtil.Tx(rawTx);
                if (ledgerConfig.hwType == "ledger") {
                    var app = new ledgerEth(ledgerConfig.hwTransport);
                    var EIP155Supported = true;
                    var localCallback = async function (result, error) {
                        if (typeof error != "undefined") {
                            if (callback !== undefined)
                                callback({
                                    isError: true,
                                    error: error
                                });
                            return;
                        }
                        var splitVersion = result["version"].split(".");
                        if (parseInt(splitVersion[0]) > 1) {
                            EIP155Supported = true;
                        } else if (parseInt(splitVersion[1]) > 0) {
                            EIP155Supported = true;
                        } else if (parseInt(splitVersion[2]) > 2) {
                            EIP155Supported = true;
                        }
                        var oldTx = Object.assign(rawTx, {});
                        let input = oldTx.input;
                        rawTx.chainId = _CHAINID;
                        return uiFuncs.signed(app, rawTx, ledgerConfig, false, function (
                            res
                        ) {
                            oldTx.r = res.r;
                            oldTx.s = res.s;
                            oldTx.v = res.v;
                            oldTx.input = input;
                            delete oldTx.isError;
                            delete oldTx.rawTx;
                            delete oldTx.signedTx;
                            web3.fsntx.sendRawTransaction(oldTx).then(function (txHash) {
                                $scope.recallSwapSuccess.open();
                            });
                        });
                    };
                    $scope.notifier.info("Please, confirm transaction on Ledger.");
                    await app.getAppConfiguration(localCallback);
                }
            }
        }
    };

    $scope.processAllTarges = async function (targes, index) {
        if (index == targes.length) {
            return true;
        }
        let target = targes[index];
        if (target.length < 42) {
            await web3.fsn.getAddressByNotation(parseInt(target)).then(function (res) {
                if (res) {
                    targesArray.push(res);
                }
                return $scope.processAllTarges(targes, index + 1);
            });
        } else {
            targesArray.push(target);
            return $scope.processAllTarges(targes, index + 1);
        }
    };

    $scope.getAssetBalance = async function () {
        let asset = $scope.assetToSend;
        let accountData = uiFuncs.getTxData($scope);
        let walletAddress = accountData.from;
        let assetBalance = "";
        let decimals = "";
        let assetSymbol = "";
        await window.__fsnGetAsset(asset).then(function (res) {
            decimals = res["Decimals"];
            assetSymbol = res["Symbol"];
        });

        try {
            await web3.fsn.getBalance(asset, walletAddress).then(function (res) {
                assetBalance = res;
            });
        } catch (err) {
            console.log(err);
        }

        let balance = parseInt(assetBalance) / $scope.countDecimals(decimals);

        $scope.$apply(function () {
            $scope.selectedAssetBalance = balance;
            $scope.selectedAssetSymbol = assetSymbol;
        });
    };

    $scope.returnDateString = function (posixtime, position) {
        let time = new Date(parseInt(posixtime) * 1000);
        if (posixtime == 18446744073709552000 && position == "End") {
            return "Forever";
        }
        if (position == "Start") {
            if (posixtime == 0) {
                return "Now";
            }
            // if(posixtime < time && position == 'Start'){return 'Now';}
        }
        let tMonth = time.getUTCMonth();
        let tDay = time.getUTCDate();
        let tYear = time.getUTCFullYear();

        return $scope.months[tMonth] + " " + tDay + ", " + tYear;
    };
    $scope.openMakesList = async function () {
        let swapList = {};
        let openMakeListFront = [];
        $scope.openTakeSwapsTotal = 0;

        if (walletService.wallet !== null) {
            let accountData = uiFuncs.getTxData($scope);
            let walletAddress = accountData.from;

            try {
                await ajaxReq.http.get(`${window.getApiServer()}/search/${walletAddress}`).then(function (r) {
                    let swaps = JSON.parse(r.data.address[0].balanceInfo).swaps;
                    console.log(r.data.address[0]);
                    for (let swap in swaps) {
                        swapList[swaps[swap].ID] = swaps[swap] ;
                        swapList[swaps[swap].ID].SwapID = swaps[swap].ID ;
                    }
                });
            } catch (err) {
                console.log(err);
            }

            let allAssets = {};
            try {
                await window.__fsnGetAllAssets().then(function (res) {
                    allAssets = res;
                });
            } catch (err) {
                console.log(err);
            }

            for (let asset in swapList) {
                let id = swapList[asset]["ID"];
                let assetBalance = "";

                let fromAsset = allAssets[swapList[asset]["FromAssetID"]];
                let toAsset = allAssets[swapList[asset]["ToAssetID"]];
                let fromVerifiedImage = "";
                let fromHasImage = false;
                let fromVerified = false;

                for (let a in window.verifiedAssetsImages) {
                    if (
                        window.verifiedAssetsImages[a].assetID ==
                        swapList[asset]["FromAssetID"]
                    ) {
                        // Set matched image name
                        fromVerifiedImage = window.verifiedAssetsImages[a].image;
                        fromHasImage = true;
                        fromVerified = true;
                    } else if (
                        swapList[asset]["FromAssetID"] ==
                        "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
                    ) {
                        // Set matched image name
                        fromVerifiedImage = "";
                        fromHasImage = false;
                        fromVerified = true;
                    }
                }

                let toVerifiedImage = "";
                let toHasImage = false;
                let toVerified = false;

                for (let a in window.verifiedAssetsImages) {
                    if (
                        window.verifiedAssetsImages[a].assetID ==
                        swapList[asset]["ToAssetID"]
                    ) {
                        // Set matched image name
                        toVerifiedImage = window.verifiedAssetsImages[a].image;
                        toHasImage = true;
                        toVerified = true;
                    } else if (
                        swapList[asset]["ToAssetID"] ==
                        "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
                    ) {
                        // Set matched image name
                        toVerifiedImage = "";
                        toHasImage = false;
                        toVerified = true;
                    }
                }

                let fromAmount =
                    swapList[asset].MinFromAmount /
                    $scope.countDecimals(fromAsset.Decimals);

                let toAmount =
                    swapList[asset].MinToAmount / $scope.countDecimals(toAsset.Decimals);
                let swapRate = fromAmount / toAmount;
                let time = new Date(parseInt(swapList[asset]["Time"]) * 1000);

                let tMonth = time.getUTCMonth();
                let tDay = time.getUTCDate();
                let tYear = time.getUTCFullYear();

                let hours = time.getUTCHours();
                let minutes = time.getUTCMinutes();

                if (time.getUTCMinutes() < 10) {
                    minutes = "0" + time.getUTCMinutes();
                }
                // Global
                time = $scope.months[tMonth] + " " + tDay + ", " + tYear;
                let timeHours = hours + ":" + minutes;

                // Maker parts
                let minimumswap = fromAmount / parseInt(swapList[asset]["SwapSize"]);

                // Taker specific parts
                let swapratetaker = toAmount / fromAmount;
                let minimumswaptaker = fromAmount * swapratetaker;

                // Targes section

                let targes = "";

                swapList[asset]["Targes"].length > 0
                    ? (targes = "Private")
                    : (targes = "Public");

                // Receive TL

                let toAmountF = toAmount * parseInt(swapList[asset]["SwapSize"]);
                let fromAmountF = fromAmount * parseInt(swapList[asset]["SwapSize"]);

                let minimumswapopenmake =
                    fromAmountF / parseInt(swapList[asset]["SwapSize"]);

                let data = {
                    id: openMakeListFront.length,
                    swap_id: swapList[asset]["SwapID"],
                    fromAssetId: swapList[asset]["FromAssetID"],
                    fromAssetSymbol: fromAsset["Symbol"],
                    fromAmount: fromAmountF,
                    fromAmountCut: +fromAmountF.toFixed(8),
                    toAssetId: swapList[asset]["ToAssetID"],
                    toAmount: toAmountF,
                    toAmountCut: +toAmountF.toFixed(8),
                    toAssetSymbol: toAsset["Symbol"],
                    swaprate: swapRate,
                    maxswaps: swapList[asset]["SwapSize"],
                    swapratetaker: swapratetaker,
                    minswap: minimumswap,
                    minswaptaker: minimumswaptaker,
                    minswapopenmake: minimumswapopenmake,
                    time: time.toLocaleString(),
                    timePosix: swapList[asset]["Time"],
                    timeHours: timeHours,
                    targes: targes,
                    owner: swapList[asset]["Owner"],
                    owned: true,
                    FromEndTime: swapList[asset]["FromEndTime"],
                    FromStartTime: swapList[asset]["FromStartTime"],
                    FromEndTimeString: $scope.returnDateString(
                        swapList[asset]["FromEndTime"],
                        "End"
                    ),
                    FromStartTimeString: $scope.returnDateString(
                        swapList[asset]["FromStartTime"],
                        "Start"
                    ),
                    ToEndTime: swapList[asset]["ToEndTime"],
                    ToStartTime: swapList[asset]["ToStartTime"],
                    ToEndTimeString: $scope.returnDateString(
                        swapList[asset]["ToEndTime"],
                        "End"
                    ),
                    ToStartTimeString: $scope.returnDateString(
                        swapList[asset]["ToStartTime"],
                        "Start"
                    ),
                    fromVerifiedImage: fromVerifiedImage,
                    fromHasImage: fromHasImage,
                    fromVerified: fromVerified,
                    toVerifiedImage: toVerifiedImage,
                    toHasImage: toHasImage,
                    toVerified: toVerified
                };

                await openMakeListFront.push(data);

            }
        }

        $scope.$eval(function () {
        $scope.openMakes = openMakeListFront;
        $scope.openMakeSwaps = $scope.openMakes.length;
        });
        console.log("Finished retrieving all Open Swaps");
    };

    $scope.$watch('selectedSendContract',function(){
        $scope.allSwaps();
    })
    $scope.$watch('selectedReceiveContract',function(){
        $scope.allSwaps();
    })


    let swapList = {};
    $scope.allSwaps = async function (page) {
        if (!page) page = 0;
        let swapListFront = [];
        let openTakesList = [];
        $scope.openTakeSwapsTotal = 0;

        if (walletService.wallet !== null) {
            let accountData = uiFuncs.getTxData($scope);
            let walletAddress = accountData.from;

            try {
                await ajaxReq.http.get(`${window.getApiServer()}/swaps/all?page=${page}&size=100&sort=asc&toAsset=${$scope.selectedReceiveContract}&fromAsset=${$scope.selectedSendContract}`).then(function (r) {
                    for (let swap in r.data) {
                        let data = JSON.parse(r.data[swap].data);
                        swapList[data.SwapID] = data;
                    }
                });
            } catch (err) {
                console.log(err);
            }

            let allAssets = {};
            try {
                await window.__fsnGetAllAssets().then(function (res) {
                    allAssets = res;
                });
            } catch (err) {
                console.log(err);
            }

            console.log(swapList);

            for (let asset in swapList) {
                let id = swapList[asset]["ID"];
                let owner = swapList[asset]["Owner"];
                let owned = false;
                let assetBalance = "";

                let fromAsset = allAssets[swapList[asset]["FromAssetID"]];
                let toAsset = allAssets[swapList[asset]["ToAssetID"]];
                let fromVerifiedImage = "";
                let fromHasImage = false;
                let fromVerified = false;

                for (let a in window.verifiedAssetsImages) {
                    if (
                        window.verifiedAssetsImages[a].assetID ==
                        swapList[asset]["FromAssetID"]
                    ) {
                        // Set matched image name
                        fromVerifiedImage = window.verifiedAssetsImages[a].image;
                        fromHasImage = true;
                        fromVerified = true;
                    } else if (
                        swapList[asset]["FromAssetID"] ==
                        "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
                    ) {
                        // Set matched image name
                        fromVerifiedImage = "";
                        fromHasImage = false;
                        fromVerified = true;
                    }
                }

                let toVerifiedImage = "";
                let toHasImage = false;
                let toVerified = false;

                for (let a in window.verifiedAssetsImages) {
                    if (
                        window.verifiedAssetsImages[a].assetID ==
                        swapList[asset]["ToAssetID"]
                    ) {
                        // Set matched image name
                        toVerifiedImage = window.verifiedAssetsImages[a].image;
                        toHasImage = true;
                        toVerified = true;
                    } else if (
                        swapList[asset]["ToAssetID"] ==
                        "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
                    ) {
                        // Set matched image name
                        toVerifiedImage = "";
                        toHasImage = false;
                        toVerified = true;
                    }
                }

                owner === walletAddress ? (owned = true) : (owned = false);

                let fromAmount =
                    swapList[asset].MinFromAmount /
                    $scope.countDecimals(fromAsset.Decimals);

                let toAmount =
                    swapList[asset].MinToAmount / $scope.countDecimals(toAsset.Decimals);
                let swapRate = fromAmount / toAmount;
                let time = new Date(parseInt(swapList[asset]["Time"]) * 1000);

                let tMonth = time.getUTCMonth();
                let tDay = time.getUTCDate();
                let tYear = time.getUTCFullYear();

                let hours = time.getUTCHours();
                let minutes = time.getUTCMinutes();

                if (time.getUTCMinutes() < 10) {
                    minutes = "0" + time.getUTCMinutes();
                }
                // Global
                time = $scope.months[tMonth] + " " + tDay + ", " + tYear;
                let timeHours = hours + ":" + minutes;

                // Maker parts
                let minimumswap = fromAmount / parseInt(swapList[asset]["SwapSize"]);

                // Taker specific parts
                let swapratetaker = toAmount / fromAmount;
                let minimumswaptaker = fromAmount * swapratetaker;

                // Targes section

                let targes = "";

                swapList[asset]["Targes"].length > 0
                    ? (targes = "Private")
                    : (targes = "Public");

                // Receive TL

                let toAmountF = toAmount * parseInt(swapList[asset]["SwapSize"]);
                let fromAmountF = fromAmount * parseInt(swapList[asset]["SwapSize"]);

                let minimumswapopenmake =
                    fromAmountF / parseInt(swapList[asset]["SwapSize"]);

                let data = {
                    id: swapListFront.length,
                    swap_id: swapList[asset]["SwapID"],
                    fromAssetId: swapList[asset]["FromAssetID"],
                    fromAssetSymbol: fromAsset["Symbol"],
                    fromAmount: fromAmountF,
                    fromAmountCut: +fromAmountF.toFixed(8),
                    toAssetId: swapList[asset]["ToAssetID"],
                    toAmount: toAmountF,
                    toAmountCut: +toAmountF.toFixed(8),
                    toAssetSymbol: toAsset["Symbol"],
                    swaprate: swapRate,
                    maxswaps: swapList[asset]["SwapSize"],
                    swapratetaker: swapratetaker,
                    minswap: minimumswap,
                    minswaptaker: minimumswaptaker,
                    minswapopenmake: minimumswapopenmake,
                    time: time.toLocaleString(),
                    timePosix: swapList[asset]["Time"],
                    timeHours: timeHours,
                    targes: targes,
                    owner: swapList[asset]["Owner"],
                    owned: owned,
                    FromEndTime: swapList[asset]["FromEndTime"],
                    FromStartTime: swapList[asset]["FromStartTime"],
                    FromEndTimeString: $scope.returnDateString(
                        swapList[asset]["FromEndTime"],
                        "End"
                    ),
                    FromStartTimeString: $scope.returnDateString(
                        swapList[asset]["FromStartTime"],
                        "Start"
                    ),
                    ToEndTime: swapList[asset]["ToEndTime"],
                    ToStartTime: swapList[asset]["ToStartTime"],
                    ToEndTimeString: $scope.returnDateString(
                        swapList[asset]["ToEndTime"],
                        "End"
                    ),
                    ToStartTimeString: $scope.returnDateString(
                        swapList[asset]["ToStartTime"],
                        "Start"
                    ),
                    fromVerifiedImage: fromVerifiedImage,
                    fromHasImage: fromHasImage,
                    fromVerified: fromVerified,
                    toVerifiedImage: toVerifiedImage,
                    toHasImage: toHasImage,
                    toVerified: toVerified
                };
                if (
                    swapList[asset]["Targes"].includes(walletAddress) ||
                    swapList[asset]["Targes"].length <= 0 ||
                    walletAddress == swapList[asset]["Owner"]
                ) {
                    await swapListFront.push(data);
                }
                if (swapList[asset]["Targes"].includes(walletAddress)) {
                    await openTakesList.push(data);
                    $scope.openTakeSwapsTotal++;
                }
            }
        }

        $scope.$eval(function () {
            $scope.swapsList = swapListFront;
            $scope.openTakeSwaps = openTakesList;
            $scope.openTakeSwapsTotal = $scope.openTakeSwapsTotal;
            $scope.showLoader = false;
        });
        console.log("Finished retrieving all Swaps");
    };

    $scope.getBalance = async function () {
        if (($scope.mayRunState = true)) {
            let accountData = uiFuncs.getTxData($scope);
            let walletAddress = accountData.from;
            let balance = await web3.fsn.getBalance(
                "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
                walletAddress
            );

            balance = balance / $scope.countDecimals(18);
            $scope.$eval(function () {
                $scope.web3WalletBalance = balance;
                $scope.web3WalletBalance = balance;
            });
        }
    };
};
module.exports = ensCtrl;
