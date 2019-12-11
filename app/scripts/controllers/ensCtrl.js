"use strict";

var ensCtrl = function ($scope, $sce, walletService, $timeout, $rootScope) {
    let nu = localStorage.getItem(window.cookieName);
    let data = nu ? JSON.parse(nu) : {};
    let _CHAINID = window.defaultChainId;

    $scope.suspiciousAsset = async (id) => {
        id = await $scope.getIdForSwap(id);
        let assets = $scope.swapsList[id].toAssetsArray;
        for (let i in assets) {
            if (assets[i].toVerified === true) {
                return true;
            }
        }
        return false;
    };

    $scope.closesendDropDown = function () {
        $scope.$applyAsync(function () {
            $scope.sendDropDown = false;
        })
    }
    $scope.closereceiveDropDown = function () {
        $scope.$applyAsync(function () {
            $scope.receiveDropDown = false;
        })
    }

    if (data.chainid !== "") {
        _CHAINID = data.chainid;
    }
    window.__fsnGetAllAssets();

    let sendDropDown = false;
    let sendDropDown2 = false;
    let receiveDropDown = false;
    let receiveDropDown2 = false;

    $scope.closeSendDropDown = function () {
        $scope.$applyAsync(function () {
            $scope.sendDropDown = false;
        })
    }
    $scope.closeSendDropDown2 = function (asset) {
        $scope.$applyAsync(function () {
            if (asset) {
                $scope.multiMakeSwapSendAssetArray.forEach((row) => {
                    row.sendDropDown2 = false
                });
                $scope.sendDropDown2 = false;
            } else {
                $scope.sendDropDown2 = false;
            }
        })
    }
    $scope.closeSendTimeLockDropDown = function () {
        $scope.$applyAsync(function () {
            $scope.showTimeLockSend = false;
        })
    }
    $scope.closeReceiveTimeLockDropDown = function () {
        $scope.$applyAsync(function () {
            $scope.showTimeLockReceive = false;
        })
    }
    $scope.closeReceiveDropDown = function () {
        $scope.$applyAsync(function () {
            $scope.receiveDropDown = false;
        })
    }
    $scope.closeReceiveDropDown2 = function (asset) {
        $scope.$applyAsync(function () {
            if (asset) {
                $scope.multiMakeSwapReceiveAssetArray.forEach((row) => {
                    row.receiveDropDown2 = false
                });
                $scope.receiveDropDown2 = false;
            } else {
                $scope.receiveDropDown2 = false;
            }
        })
    }

    $scope.$watch('sendDropDown', function () {
        if ($scope.sendDropDown) {
            let a = document.getElementById('searchSendAsset');
            a.focus();
            setTimeout(function () {
                a.focus();
            }, 100);
        }
    });
    $scope.$watch('sendDropDown2', function () {
        if ($scope.sendDropDown2) {
            let a = document.getElementById('searchSendAsset2');
            a.focus();
            setTimeout(function () {
                a.focus();
            }, 100);
        }
    });
    $scope.$watch('receiveDropDown', function () {
        if ($scope.receiveDropDown) {
            let a = document.getElementById('searchReceiveAsset');
            a.focus();
            setTimeout(function () {
                a.focus();
            }, 100);
        }
    });
    $scope.$watch('receiveDropDown2', function () {
        if ($scope.receiveDropDown2) {
            let a = document.getElementById('searchReceiveAsset2');
            a.focus();
            setTimeout(function () {
                a.focus();
            }, 100);
        }
    });

    $scope.init = async function () {
        if (!$scope.wallet) {
            return;
        }
        $scope.getShortAddressNotation();
        await $scope.getTimeLockBalances().then(function () {
            $scope.getAllAssets().then(function () {
                $scope.setSendAndReceiveInit();
            });
        });
        // await $scope.allSwaps(0);
        await $scope.takeGetAllBalances();
        await $scope.sortSwapMarket("timePosix");
        await $scope.sortOpenMakes("timePosix");
        await $scope.getBalance();
        await $scope.setWalletAddress();
        await $scope.takeGetAllBalances();
        await $scope.openMakesList();
        await $scope.takeSwapList();
        await $scope.getUSAN();
    };

    setInterval(async function () {
        if ($scope.wallet == null) {
            return;
        }
        if (!$scope.wallet) {
            return;
        }
        $scope.getShortAddressNotation();
        await $scope.getTimeLockBalances();
        await $scope.getAllAssets();
        await $scope.takeGetAllBalances();
        await $scope.sortSwapMarket("timePosix");
        await $scope.sortOpenMakes("timePosix");
        await $scope.getBalance();
        await $scope.setWalletAddress();
        await $scope.takeGetAllBalances();
        await $scope.openMakesList();
        await $scope.allSwaps($scope.cachedAllSwapsPage,true);
        await $scope.takeSwapList();
        await $scope.getUSAN();
    }, 12000);

    $scope.mayRun = false;

    $scope.$watch("wallet", async function () {
        await $scope.init();
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

    $scope.usanAvailable = false;
    $scope.usanAddress = 0;
    $scope.getUSAN = async () => {
        let accountData = uiFuncs.getTxData($scope);
        let walletAddress = accountData.from;
        let usan = await web3.fsn.getNotation(walletAddress);
        if (usan === 0) {
            if ($scope.usanAvailable) {
                $scope.$applyAsync(function () {
                    $scope.usanAvailable = false;
                });
            }
        } else {
            if (!$scope.usanAvailable) {
                $scope.$applyAsync(function () {
                    $scope.usanAvailable = true;
                    $scope.usanAddress = usan;
                });
            }
        }
    }
    $scope.setMakeUSAN = async (asset,address) => {
        console.log(asset);
        if (address === $scope.DEFAULT_USAN) {
            $scope.$applyAsync(function () {
                asset.selectedSendAsset = `USAN ${$scope.usanAddress}`;
                asset.selectedSendAssetSymbol = `${$scope.usanAddress}`;
                asset.selectedSendContract = '0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe';
                asset.selectedSendImage = false;
                asset.selectedSendHasImage = false;
                asset.assetToSend = '0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe';
                asset.selectedSendVerified = false;
                asset.sendHasTimeLockBalance = false;
                asset.sendDropDown = false;
                asset.sendDropDown2 = false;
                $scope.makeUSAN = true;
            });
            $scope.sendChanged = 1;
            await $scope.checkMakeSwapConditions();
            await $scope.allSwaps(0);
        } else {
            $scope.$applyAsync(function () {
                $scope.selectedSendAsset = `USAN ${$scope.usanAddress}`;
                $scope.selectedSendAssetSymbol = `${$scope.usanAddress}`;
                $scope.selectedSendContract = '0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe';
                $scope.selectedSendImage = false;
                $scope.selectedSendHasImage = false;
                $scope.assetToSend = '0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe';
                $scope.selectedSendVerified = false;
                $scope.sendHasTimeLockBalance = false;
                $scope.sendDropDown = false;
                $scope.sendDropDown2 = false;
            });
            $scope.sendChanged = 1;
            $scope.$applyAsync(function () {
                $scope.makeUSAN = true;
            })
            await $scope.checkMakeSwapConditions();
            await $scope.allSwaps(0);
        }
    }

    $scope.setReceiveUSAN = async () => {
        $scope.$eval(function () {
            $scope.selectedReceiveAsset = `USAN`;
            $scope.selectedReceiveAssetSymbol = `USAN`;
            $scope.selectedReceiveContract = '0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe';
            $scope.selectedReceiveImage = false;
            $scope.selectedReceiveHasImage = false;
            $scope.assetToReceive = '0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe';
            $scope.selectedReceiveVerified = false;
            $scope.sendHasTimeLockBalance = false;
            $scope.receiveDropDown = false;
            $scope.receiveDropDown2 = false;
        });
        await $scope.allSwaps(0);
    }

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

    $scope.makeSwapReviewDisabled = true;
    $scope.usanAlreadySwapped = false;
    $scope.checkMakeSwapConditions = async (asset) => {
        if (asset) {
            let z = true;
            if (!asset.selectedSendContract == $scope.DEFAULT_USAN) {
                if (asset.makeSendAmount == '' || asset.makeReceiveAmount == '' || asset.makeMinumumSwap == '') {
                    z = true;
                } else {
                    let a = new window.BigNumber(asset.makeSendAmount.toString());
                    let b = new window.BigNumber(asset.selectedAssetBalance.toString());
                    if (b.gte(a)) {
                        z = false;
                    } else {
                        z = true;
                    }
                }
            } else {
                if (asset.makeReceiveAmount == '') {
                    z = true;
                } else {
                    z = false;
                }
            }

            let usanSwap = false;

            if (asset.selectedSendContract == $scope.DEFAULT_USAN && $scope.usanAlreadyInSwap) {
                z = true
                usanSwap = true;
            } else {
                z = false;
                usanSwap = false;
            }

            $scope.$applyAsync(function () {
                $scope.makeSwapReviewDisabled = z;
                $scope.usanAlreadySwapped = usanSwap;
            })
        } else {
            let z = true;
            if (!$scope.selectedSendContract == $scope.DEFAULT_USAN) {
                if ($scope.makeSendAmount == '' || $scope.makeReceiveAmount == '' || $scope.makeMinumumSwap == '') {
                    z = true;
                } else {
                    let a = new window.BigNumber($scope.makeSendAmount.toString());
                    let b = new window.BigNumber($scope.selectedAssetBalance.toString());
                    if (b.gte(a)) {
                        z = false;
                    } else {
                        z = true;
                    }
                }
            } else {
                if ($scope.makeReceiveAmount == '') {
                    z = true;
                } else {
                    z = false;
                }
            }

            let usanSwap = false;

            if ($scope.selectedSendContract == $scope.DEFAULT_USAN && $scope.usanAlreadyInSwap) {
                z = true
                usanSwap = true;
            } else {
                z = false;
                usanSwap = false;
            }

            $scope.$applyAsync(function () {
                $scope.makeSwapReviewDisabled = z;
                $scope.usanAlreadySwapped = usanSwap;
            })
        }
    }

    function formatDate() {
        let d = new Date(),
            month = "" + (d.getUTCMonth() + 1),
            day = "" + d.getUTCDate(),
            year = d.getUTCFullYear();

        if (month.length < 2) month = "0" + month;
        if (day.length < 2) day = "0" + day;

        return [year, month, day].join("-");
    }

    $scope.dateOptions = {
        minDate: new Date(),
        showWeeks: false,
        formatMonth: "MMM",
        yearColumns: 3
    };
    $scope.currentPage = 0;
    $scope.currentPageInput = 1;
    $scope.pageSize = 10;
    $scope.endPage = 0;
    $scope.shownRows = 0;

    $scope.sendTimeLock = "none";
    $scope.showTimeLockSend = false;
    $scope.showTimeLockReceive = false;

    $scope.selectedTimeLockTimespan = "-";
    $scope.selectedTimeLockAmount = "Select time-lock";

    $scope.removeSendTimeLock = function (asset) {
        if (asset) {
            $scope.$eval(function () {
                asset.selectedTimeLockTimespan = "-";
                asset.selectedTimeLockAmount = "Select time-lock";
                asset.todayData = "";
                asset.fromStartTime = "";
                asset.fromEndTime = "";
                asset.fromStartTimeString = "";
                asset.fromEndTimeString = "";
                asset.hasTimeLockSet = false;
                asset.sendTimeLockSet = false;
                asset.sendExistingTimeLockSet = false;
                asset.showExistingTimeLocksSendDropdown = false;
            });
            $scope.getAssetBalance();
            $scope.closeSendTimelockDropdowns(asset);
        } else {
            $scope.$eval(function () {
                $scope.selectedTimeLockTimespan = "-";
                $scope.selectedTimeLockAmount = "Select time-lock";
                $scope.todayData = "";
                $scope.fromEndTime = "";
                $scope.hasTimeLockSet = false;
                $scope.sendTimeLockSet = false;
            });
            $scope.getAssetBalance();
        }
    };

    $scope.removeReceiveTimeLock = function (asset) {
        if (asset) {
            $scope.$eval(function () {
                asset.selectedTimeLockTimespan = "-";
                asset.selectedTimeLockAmount = "Select time-lock";
                asset.todayData = "";
                asset.toStartTime = "";
                asset.toEndTime = "";
                asset.toStartTimeString = "";
                asset.toEndTimeString = "";
                asset.hasTimeLockSet = false;
                asset.receiveTimeLockSet = false;
                asset.receiveExistingTimeLockSet = false;
            });
            $scope.getAssetBalance();
            $scope.closeReceiveTimelockDropdowns(asset);
        } else {
            $scope.$eval(function () {
                $scope.selectedTimeLockTimespan = "-";
                $scope.selectedTimeLockAmount = "Select time-lock";
                $scope.todayData = "";
                $scope.fromEndTime = "";
                $scope.hasTimeLockSet = false;
                $scope.receiveTimeLockSet = false;
            });
            $scope.getAssetBalance();
        }
    };

    $scope.closeExistingTimeLock = function () {
        $scope.$eval(function () {
            $scope.selectedTimeLockTimespan = "-";
            $scope.selectedTimeLockAmount = "Select time-lock";
            $scope.todayData = "";
            $scope.fromEndTime = "";
            $scope.hasTimeLockSet = false;
        });
        $scope.getAssetBalance();
    };

    $scope.getDayAfter = function (date) {
        let temp = new Date(date);
        return new Date(temp.setDate(temp.getDate() + 1));
    }

    $scope.converTimelocksToDateStrings = function (asset) {
        $scope.$eval(function () {
            if (asset.fromStartTime) {
                asset.fromStartTimeString = $scope.returnDateString(
                    new Date(asset.fromStartTime).getTime() / 1000.0 + 1000
                );
            }
            if (asset.fromEndTime) {
                asset.fromEndTimeString = $scope.returnDateString(
                    new Date(asset.fromEndTime).getTime() / 1000.0 + 1000
                );
            }
            if (asset.toStartTime) {
                asset.toStartTimeString = $scope.returnDateString(
                    new Date(asset.toStartTime).getTime() / 1000.0 + 1000
                );
            }
            if (asset.toEndTime) {
                asset.toEndTimeString = $scope.returnDateString(
                    new Date(asset.toEndTime).getTime() / 1000.0 + 1000
                );
            }
        });
    }

    $scope.checkSendDate = function (source, asset) {

        if (asset) {

            // window.log("checkSendDate source: " + source);
            if (asset.transactionType == "scheduled") {
                $scope.converTimelocksToDateStrings(asset);
                return;
            } else {
                let today = new Date();
                // window.log("fromStartTime: " + asset.fromStartTime);
                // window.log("fromEndTime: " + asset.fromEndTime);
                if (!asset.fromEndTime || !asset.fromStartTime) {
                    $scope.converTimelocksToDateStrings(asset);
                    return;
                }
                if (asset.fromStartTime >= today
                    && asset.fromEndTime >= today
                    && asset.fromStartTime <= asset.fromEndTime) {
                    // window.log("dates ok");
                    $scope.converTimelocksToDateStrings(asset);
                    return;
                }
                if (source === "fromStartTime") {
                    // window.log("fromStartTime changed");
                    if (asset.fromStartTime < today) {
                        $scope.$eval(function () {
                            asset.fromStartTime = today;
                            // window.log("fromStartTime changed to today");
                        });
                        if (today > asset.fromEndTime) {
                            // change fromEndTime to: tomorrow
                            $scope.$eval(function () {
                                let dayAfter = $scope.getDayAfter(today);
                                asset.fromEndTime = dayAfter;
                                // window.log("fromEndTime changed to " + dayAfter);
                            });
                        }
                    } else {
                        if (asset.fromStartTime > asset.fromEndTime) {
                            $scope.$eval(function () {
                                let dayAfter = $scope.getDayAfter(asset.fromStartTime);
                                asset.fromEndTime = dayAfter;
                                // window.log("fromEndTime changed to " + dayAfter);
                            })
                        }
                    }
                    $scope.converTimelocksToDateStrings(asset);
                } else if (source === "fromEndTime") {
                    // window.log("fromEndTime changed");
                    if (asset.fromEndTime < today) {
                        $scope.$eval(function () {
                            asset.fromEndTime = today;
                            asset.fromStartTime = today;
                            // window.log("dates changed to today");
                        });
                    } else {
                        if (asset.fromEndTime < asset.fromStartTime) {
                            // change fromStartTime to: today
                            $scope.$eval(function () {
                                asset.fromStartTime = today;
                                // window.log("fromStartTime changed to today");
                            });
                        }
                    }
                    $scope.converTimelocksToDateStrings(asset);
                } else {
                    if (asset.fromEndTime < today) {
                        $scope.$eval(function () {
                            asset.fromEndTime = today;
                        });
                    }
                    if (asset.fromEndTime < asset.fromStartTime) {
                        $scope.$eval(function () {
                            asset.fromStartTime = today;
                        });
                    }
                }
            }

        } else {
            // window.log("checkSendDate source: " + source);
            if ($scope.transactionType == "scheduled") {
                $scope.converTimelocksToDateStrings(asset);
                return;
            } else {
                let today = new Date();
                // window.log("fromStartTime: " + $scope.fromStartTime);
                // window.log("fromEndTime: " + $scope.fromEndTime);
                if (!$scope.fromEndTime || !$scope.fromStartTime) {
                    $scope.converTimelocksToDateStrings(asset);
                    return;
                }
                if ($scope.fromStartTime >= today
                    && $scope.fromEndTime >= today
                    && $scope.fromStartTime <= $scope.fromEndTime) {
                    // window.log("dates ok");
                    $scope.converTimelocksToDateStrings(asset);
                    return;
                }
                if (source === "fromStartTime") {
                    // window.log("fromStartTime changed");
                    if ($scope.fromStartTime < today) {
                        $scope.$eval(function () {
                            $scope.fromStartTime = today;
                            // window.log("fromStartTime changed to today");
                        });
                        if (today > $scope.fromEndTime) {
                            // change fromEndTime to: tomorrow
                            let dayAfter = $scope.getDayAfter(today);
                            $scope.$eval(function () {
                                $scope.fromEndTime = dayAfter;
                                // window.log("fromEndTime changed to " + dayAfter);
                            });
                        }
                    } else {
                        if ($scope.fromStartTime > $scope.fromEndTime) {
                            $scope.$eval(function () {
                                let dayAfter = $scope.getDayAfter($scope.fromStartTime);
                                $scope.fromEndTime = dayAfter;
                                // window.log("fromEndTime changed to " + dayAfter);
                            })
                        }
                    }
                    $scope.converTimelocksToDateStrings(asset);
                } else if (source === "fromEndTime") {
                    // window.log("fromEndTime changed");
                    if ($scope.fromEndTime < today) {
                        $scope.$eval(function () {
                            $scope.fromEndTime = today;
                            $scope.fromStartTime = today;
                            // window.log("dates changed to today");
                        });
                    } else {
                        if ($scope.fromEndTime < $scope.fromStartTime) {
                            // change fromStartTime to: today
                            $scope.$eval(function () {
                                $scope.fromStartTime = today;
                                // window.log("fromStartTime changed to today");
                            });
                        }
                    }
                    $scope.converTimelocksToDateStrings(asset);
                } else {
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

            }
        }
    };

    $scope.checkReceiveDate = function (source, asset) {
        if (asset) {
            // window.log("checkReceiveDate source: " + source);
            if (asset.transactionType == "scheduled") {
                $scope.converTimelocksToDateStrings(asset);
                return;
            } else {
                let today = new Date();
                // window.log("toStartTime: " + asset.toStartTime);
                // window.log("toEndTime: " + asset.toEndTime);
                if (!asset.toEndTime || !asset.toStartTime) {
                    $scope.converTimelocksToDateStrings(asset);
                    return;
                }
                if (asset.toStartTime >= today
                    && asset.toEndTime >= today
                    && asset.toStartTime <= asset.toEndTime) {
                    // window.log("dates ok");
                    $scope.converTimelocksToDateStrings(asset);
                    return;
                }
                if (source === "toStartTime") {
                    // window.log("toStartTime changed");
                    if (asset.toStartTime < today) {
                        $scope.$eval(function () {
                            asset.toStartTime = today;
                            // window.log("toStartTime changed to today");
                        });
                        if (today > asset.toEndTime) {
                            // change toEndTime to: tomorrow
                            let dayAfter = $scope.getDayAfter(today);
                            $scope.$eval(function () {
                                asset.toEndTime = dayAfter;
                                // window.log("toEndTime changed to " + dayAfter);
                            });
                        }
                    } else {
                        if (asset.toStartTime > asset.toEndTime) {
                            $scope.$eval(function () {
                                let dayAfter = $scope.getDayAfter(asset.toStartTime);
                                asset.toEndTime = dayAfter;
                                // window.log("toEndTime changed to " + dayAfter);
                            })
                        }
                    }
                    $scope.converTimelocksToDateStrings(asset);
                } else if (source === "toEndTime") {
                    // window.log("toEndTime changed");
                    if (asset.toEndTime < today) {
                        $scope.$eval(function () {
                            asset.toEndTime = today;
                            asset.toStartTime = today;
                            // window.log("dates changed to today");
                        });
                    } else {
                        if (asset.toEndTime < asset.toStartTime) {
                            // change toStartTime to: today
                            $scope.$eval(function () {
                                asset.toStartTime = today;
                                // window.log("toStartTime changed to today");
                            });
                        }
                    }
                    $scope.converTimelocksToDateStrings(asset);
                } else {
                    if (asset.toEndTime < today) {
                        $scope.$eval(function () {
                            asset.toEndTime = today;
                        });
                    }
                    if (asset.toEndTime < asset.toStartTime) {
                        $scope.$eval(function () {
                            asset.toStartTime = today;
                        });
                    }
                }

            }

        } else {
            // window.log("checkReceiveDate source: " + source);
            if ($scope.transactionType == "scheduled") {
                $scope.converTimelocksToDateStrings(asset);
                return;
            } else {
                let today = new Date();
                // window.log("toStartTime: " + $scope.toStartTime);
                // window.log("toEndTime: " + $scope.toEndTime);
                if (!$scope.toEndTime || !$scope.toStartTime) {
                    $scope.converTimelocksToDateStrings(asset);
                    return;
                }
                if ($scope.toStartTime >= today
                    && $scope.toEndTime >= today
                    && $scope.toStartTime <= $scope.toEndTime) {
                    // window.log("dates ok");
                    $scope.converTimelocksToDateStrings(asset);
                    return;
                }
                if (source === "toStartTime") {
                    // window.log("toStartTime changed");
                    if ($scope.toStartTime < today) {
                        $scope.$eval(function () {
                            $scope.toStartTime = today;
                            // window.log("toStartTime changed to today");
                        });
                        if (today > $scope.toEndTime) {
                            // change toEndTime to: tomorrow
                            let dayAfter = $scope.getDayAfter(today);
                            $scope.$eval(function () {
                                $scope.toEndTime = dayAfter;
                                // window.log("toEndTime changed to " + dayAfter);
                            });
                        }
                    } else {
                        if ($scope.toStartTime > $scope.toEndTime) {
                            $scope.$eval(function () {
                                let dayAfter = $scope.getDayAfter($scope.toStartTime);
                                $scope.toEndTime = dayAfter;
                                // window.log("toEndTime changed to " + dayAfter);
                            })
                        }
                    }
                    $scope.converTimelocksToDateStrings(asset);
                } else if (source === "toEndTime") {
                    // window.log("toEndTime changed");
                    if ($scope.toEndTime < today) {
                        $scope.$eval(function () {
                            $scope.toEndTime = today;
                            $scope.toStartTime = today;
                            // window.log("dates changed to today");
                        });
                    } else {
                        if ($scope.toEndTime < $scope.toStartTime) {
                            // change toStartTime to: today
                            $scope.$eval(function () {
                                $scope.toStartTime = today;
                                // window.log("toStartTime changed to today");
                            });
                        }
                    }
                    $scope.converTimelocksToDateStrings(asset);
                } else {
                    if ($scope.toEndTime < today) {
                        $scope.$eval(function () {
                            $scope.toEndTime = today;
                        });
                    }
                    if ($scope.toEndTime < $scope.toStartTime) {
                        $scope.$eval(function () {
                            $scope.toStartTime = today;
                        });
                    }
                }

            }
        }
    };

    $scope.handleSendTimeLockDateToDate = function (asset) {
        asset.sendTimeLock = 'daterange';
        if (asset.fromStartTime && !asset.fromEndTime) {
            $scope.$eval(function () {
                asset.fromEndTime = $scope.getDayAfter(asset.fromStartTime);
                asset.fromEndTimeString = $scope.returnDateString(
                    new Date(asset.fromEndTime).getTime() / 1000.0 + 1000
                );
            });
        }
    }

    $scope.handleReceiveTimeLockDateToDate = function (asset) {
        asset.receiveTimeLock = 'daterange';
        if (asset.toStartTime && !asset.toEndTime) {
            $scope.$eval(function () {
                asset.toEndTime = $scope.getDayAfter(asset.toStartTime);
                asset.toEndTimeString = $scope.returnDateString(
                    new Date(asset.toEndTime).getTime() / 1000.0 + 1000
                );
            });
        }
    }

    $scope.setSendTimeLock = function (asset) {
        if (asset) {
            window.log("setSendTimeLock called");
            $scope.$eval(function () {
                asset.showTimeLockSend = false;
                asset.sendTimeLockSet = true;
                asset.sendExistingTimeLockSet = false;
            });
            $scope.converTimelocksToDateStrings(asset);
            $scope.closeSendTimelockDropdowns(asset);

        } else {
            window.log("setSendTimeLock called");
            $scope.$eval(function () {
                $scope.fromStartTimeString = $scope.returnDateString(
                    new Date($scope.fromStartTime).getTime() / 1000.0 + 1000
                );
                $scope.fromEndTimeString = $scope.returnDateString(
                    new Date($scope.fromEndTime).getTime() / 1000.0 + 1000
                );
                $scope.showTimeLockSend = false;
                $scope.sendTimeLockSet = true;
                // $scope.toStartTimeString = $scope.returnDateString(
                //     new Date($scope.ToStartTime).getTime() / 1000.0 + 1000
                // );
                // $scope.toEndTimeString = $scope.returnDateString(
                //     new Date($scope.ToEndTime).getTime() / 1000.0 + 1000
                // );
                // $scope.selectedTimeLockTimespan =
            });
        }
    }

    $scope.setReceiveTimeLock = function (asset) {
        if (asset) {
            window.log("setReceiveTimeLock called");
            $scope.$eval(function () {
                asset.showTimeLockReceive = false;
                asset.receiveTimeLockSet = true;
                asset.receiveExistingTimeLockSet = false;
            });
            $scope.converTimelocksToDateStrings(asset);
            $scope.closeReceiveTimelockDropdowns(asset);

        } else {
            window.log("setReceiveTimeLock called");
            $scope.$eval(function () {
                $scope.ToStartTimeString = $scope.returnDateString(
                    new Date($scope.ToStartTime).getTime() / 1000.0 + 1000
                );
                $scope.ToEndTimeString = $scope.returnDateString(
                    new Date($scope.ToEndTime).getTime() / 1000.0 + 1000
                );
                $scope.showTimeLockReceive = false;
                $scope.receiveTimeLockSet = true;
                // $scope.toStartTimeString = $scope.returnDateString(
                //     new Date($scope.ToStartTime).getTime() / 1000.0 + 1000
                // );
                // $scope.toEndTimeString = $scope.returnDateString(
                //     new Date($scope.ToEndTime).getTime() / 1000.0 + 1000
                // );
                // $scope.selectedTimeLockTimespan =
            });
        }
    }

    $scope.cancelSetSendTimeLock = function (asset) {
        $scope.$eval(function () {
            asset.sendTimeLock = asset.sendTimeLockReset;
            asset.fromStartTime = asset.fromStartTimeReset;
            asset.fromEndTime = asset.fromEndTimeReset;
            asset.showTimeLockSend = false;
        });
        $scope.converTimelocksToDateStrings(asset);
    }

    $scope.cancelSetReceiveTimeLock = function (asset) {
        $scope.$eval(function () {
            asset.receiveTimeLock = asset.receiveTimeLockReset;
            asset.toStartTime = asset.toStartTimeReset;
            asset.toEndTime = asset.toEndTimeReset;
            asset.showTimeLockReceive = false;
        });
        $scope.converTimelocksToDateStrings(asset);
    }

    $scope.getSendTimeLockLeftAdjust = function (asset) {
        if (asset && document.getElementById('sendBlueSection_' + asset.id)) {
            return document.getElementById('sendBlueSection_' + asset.id).clientWidth + 6;
        }
        return 0;
    };

    $scope.getReceiveTimeLockLeftAdjust = function (asset) {
        if (asset && document.getElementById('receiveBlueSection_' + asset.id)) {
            return document.getElementById('receiveBlueSection_' + asset.id).clientWidth + 6;
        }
        return 0;
    };

    $scope.closeSendTimelockDropdowns = async function (asset) {
        if (asset) {
            $scope.$eval(function () {
                asset.showTimeLockSend = false;
                asset.showSimpleTimelockSendDropdown = false;
                asset.showMenuTimelockSendDropdown = false;
                asset.showNewTimelockSendDropdown = false;
                asset.showExistingTimeLocksSendDropdown = false;
            });
        }
    };

    $scope.closeReceiveTimelockDropdowns = async function (asset) {
        if (asset) {
            $scope.$eval(function () {
                asset.showTimeLockReceive = false;
                asset.showSimpleTimelockReceiveDropdown = false;
                asset.showMenuTimelockReceiveDropdown = false;
                asset.showNewTimelockReceiveDropdown = false;
                asset.showExistingTimeLocksReceiveDropdown = false;
            });
        }
    };

    $scope.toggleSendTimelock = async function (asset) {
        if (asset.sendTimeLockSet) {
            console.log("time-lock set!");
            if (!asset.sendExistingTimeLockSet) {
                console.log("regular time-lock set!");
                if ($scope.myActiveTimeLocks[asset.selectedSendContract]
                    && $scope.myActiveTimeLocks[asset.selectedSendContract].length > 0) {
                    // time-locks are available
                    $scope.$eval(function () {
                        asset.showTimeLockSend = !asset.showTimeLockSend;
                        asset.showSimpleTimelockSendDropdown = true;
                        asset.sendTimeLockReset = asset.sendTimeLock;
                        asset.fromStartTimeReset = asset.fromStartTime;
                        asset.fromEndTimeReset = asset.fromEndTime;
                        asset.sendExistingTimeLocksAvailable = true;
                    });
                } else {
                    $scope.$eval(function () {
                        asset.showTimeLockSend = !asset.showTimeLockSend;
                        asset.showSimpleTimelockSendDropdown = true;
                        asset.sendTimeLockReset = asset.sendTimeLock;
                        asset.fromStartTimeReset = asset.fromStartTime;
                        asset.fromEndTimeReset = asset.fromEndTime;
                        asset.sendExistingTimeLocksAvailable = false;
                    });
                }
            } else {
                // open time-locks menu
                console.log("existing time-lock set!");
                $scope.$eval(function () {
                    asset.showTimeLockSend = !asset.showTimeLockSend;
                    asset.showSimpleTimelockSendDropdown = false;
                    asset.showMenuTimelockSendDropdown = false;
                    asset.showNewTimelockSendDropdown = false;
                    asset.showExistingTimeLocksSendDropdown = true;
                });
            }
        } else {
            console.log("time-lock NOT set!");
            if (!asset.showTimeLockSend) {
                // open dropdown
                if (asset.selectedSendContract !== $scope.DEFAULT_USAN
                    && asset.selectedSendAsset !== 'All Assets'
                    && asset.selectedSendAsset !== 'Select asset') {

                    if ($scope.myActiveTimeLocks[asset.selectedSendContract]
                        && $scope.myActiveTimeLocks[asset.selectedSendContract].length > 0) {
                        console.log("existing time-locks found! menu shown");
                        $scope.$eval(function () {
                            asset.showTimeLockSend = true;
                            asset.showMenuTimelockSendDropdown = true;
                            asset.showNewTimelockDropdown = false;
                            asset.showExistingTimeLocksSendDropdown = false;
                            asset.showSimpleTimelockSendDropdown = false;
                        });

                    } else {
                        console.log("basic menu shown");
                        $scope.$eval(function () {
                            asset.showTimeLockSend = true;
                            asset.sendTimeLock = 'daterange';
                            asset.showSimpleTimelockSendDropdown = true;
                        });
                    }
                }
            } else {
                // close dropdown
                $scope.closeSendTimelockDropdowns(asset);
            }
        }
    };

    $scope.toggleReceiveTimelock = async function (asset) {
        if (asset.receiveTimeLockSet) {
            $scope.$eval(function () {
                asset.showTimeLockReceive = !asset.showTimeLockReceive;
                asset.showSimpleTimelockReceiveDropdown = true;
                asset.receiveTimeLockReset = asset.receiveTimeLock;
                asset.fromStartTimeReset = asset.fromStartTime;
                asset.fromEndTimeReset = asset.fromEndTime;
            });
        } else {
            console.log("time-lock NOT set!");
            if (!asset.showTimeLockReceive) {
                // open dropdown
                console.log("basic menu shown");
                $scope.$eval(function () {
                    asset.showTimeLockReceive = true;
                    asset.receiveTimeLock = 'daterange';
                    asset.showSimpleTimelockReceiveDropdown = true;
                });
            } else {
                // close dropdown
                $scope.closeReceiveTimelockDropdowns(asset);
            }
        }
    };

    $scope.$watch('currentPageInput', function (newValue, oldValue) {
        if (!isNaN(newValue) && newValue > 0 && newValue !== oldValue) {
            // window.log("goToPage: "+newValue);
            $scope.goToPage(newValue);
        }
    });

    $scope.goToPage = function (pageInput) {
        if (pageInput === $scope.currentPage + 1 || pageInput > $scope.endPage + 1) {
            return;
        }
        $scope.$eval(function () {
            $scope.currentPage = pageInput - 1;
            $scope.searchSwapMarket = "";
        });
        $scope.allSwaps($scope.currentPage);
    };

    $scope.nextPage = function () {
        if ($scope.currentPage === $scope.endPage) {
            return;
        }
        $scope.$eval(function () {
            $scope.currentPage = $scope.currentPage + 1;
            $scope.searchSwapMarket = "";
        });
        $scope.allSwaps($scope.currentPage);
    };

    $scope.firstPage = function () {
        $scope.$eval(function () {
            $scope.currentPage = 0;
            $scope.searchSwapMarket = "";
        });
        $scope.allSwaps(0);
    };

    $scope.lastPage = function () {
        $scope.$eval(function () {
            $scope.currentPage = $scope.endPage;
            $scope.searchSwapMarket = "";
        });
        $scope.allSwaps($scope.endPage);
    };

    $scope.previousPage = function () {
        if ($scope.currentPage == 0) {
            return;
        }
        $scope.$eval(function () {
            $scope.currentPage = $scope.currentPage - 1;
            $scope.searchSwapMarket = "";
        });
        $scope.allSwaps($scope.currentPage);
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

    // multi-swap-related
    $scope.MAX_ASSETS_TO_DISPLAY = 3;
    $scope.MAX_SEND_ASSETS = 200;
    $scope.MAX_RECEIVE_ASSETS = 200;
    $scope.multiMakeSwapSendAssetArray = [];
    $scope.multiMakeSwapSendAssetIdTracker = 0;
    $scope.multiMakeSwapReceiveAssetArray = [];
    $scope.multiMakeSwapReceiveAssetIdTracker = 0;
    $scope.multiTakeSwapSendAssetArray = [];
    $scope.multiTakeSwapReceiveAssetArray = [];

    $scope.FUSION_CONTRACT_ADDRESS = "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff";
    $scope.DEFAULT_USAN = '0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe';
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
    $scope.suspiciousAssetModal = new Modal(document.getElementById("suspiciousAssetModal"));
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


    let timeout;
    $scope.walletTimeOut = function () {
        timeout = setTimeout(function () {
            window.location.reload();
        }, 6000000);
    }
    $scope.walletTimeOut();

    addEventListener('click', function (e) {
        clearTimeout(timeout);
        $scope.walletTimeOut();
    })


    $scope.setAllAssetsInReceive = async function () {
        $scope.$eval(function () {
            $scope.selectedReceiveAsset = `All Assets`;
            $scope.selectedReceiveContract = "\n";
            $scope.assetToReceive = $scope.assetList[0].contractaddress;
            $scope.selectedReceiveImage = '';
            $scope.selectedReceiveHasImage = false;
            $scope.selectedReceiveVerified = false;
        });
        await $scope.allSwaps();
    }

    $scope.setAllSANsInReceive = function () {
        $scope.$eval(function () {
            $scope.selectedReceiveAsset = `All Short Account Numbers`;
            $scope.selectedReceiveContract = "\n";
            $scope.assetToReceive = $scope.assetList[0].contractaddress;
            $scope.selectedReceiveImage = '';
            $scope.selectedReceiveHasImage = false;
            $scope.selectedReceiveVerified = false;
        });
        $scope.allSwaps();
    }

    $scope.setAllAssetsInSend = async function () {
        $scope.$eval(function () {
            $scope.selectedSendAsset = `All Assets`;
            $scope.selectedSendContract = "\n";
            $scope.assetToSend = $scope.assetList[0].contractaddress;
            $scope.selectedSendImage = '';
            $scope.selectedSendHasImage = false;
            $scope.selectedSendVerified = false;
        });
        await $scope.allSwaps();
    }


    $scope.setSendAndReceiveInit = async function () {
        await $scope.setAllAssetsInSend();
        await $scope.setAllAssetsInReceive();
        $scope.getAssetBalance();
    };

    $scope.privateAccess = false;

    $scope.swapRecallSuccess = false;

    $scope.swapInfo = {};

    // format address if length >= 20 (e.g. 0xffffff...ffffffff)
    $scope.formatAddress = function (address) {
        if (!address || address.length < 20)
            return address;
        return address.substring(0, 8) + "..." + address.substring(address.length - 8, address.length);
    };

    // format name if length > 20
    $scope.formatName = function (name, max) {
        if (!max) max = 16;
        if (!name || name.length <= max)
            return name;
        return name.substring(0, (max - 3)) + "...";
    };

    // format symbol if length > 4
    $scope.formatSymbol = function (symbol) {
        if (!symbol || symbol.length <= 4)
            return symbol;
        return symbol.substring(0, 3) + "...";
    };

    // extract address from asset symbol, e.g. "1234"  from "USAN 1234"
    $scope.extractAddressFromAssetSymbol = function (assetSymbol) {
        if (!assetSymbol || assetSymbol.length < 4)
            return assetSymbol;
        return assetSymbol.substring(5, assetSymbol.length);
    };

    // extract name only from asset (name + asset symbol)
    // e.g. "Thiendia11"  from "Thiendia11 (TD11)"
    $scope.extractNameOnlyFromAssetNameSymbol = function (nameSymbol, symbol) {
        let allowance = 3; // 2 parenthesis + space
        if (!nameSymbol || !symbol || nameSymbol.length <= (symbol.length + allowance))
            return nameSymbol;
        return nameSymbol.substring(0, ((nameSymbol.length - (symbol.length + allowance))));
    };

    $scope.swapInformationModalOpen = async function (swap_id,make) {
        let data = {};
        let owner = '';
        let size = 0;
        let id;

        let toAssetsArray;
        let fromAssetsArray;

        if(make){
            id = await $scope.getIdForMakeSwap(swap_id);
            toAssetsArray = $scope.openMakes[id].toAssetsArray;
            fromAssetsArray = $scope.openMakes[id].fromAssetsArray;
            swap_id = $scope.openMakes[id].swap_id;
        } else {
            id = await $scope.getIdForSwap(swap_id);
            toAssetsArray = $scope.swapsList[id].toAssetsArray;
            fromAssetsArray = $scope.swapsList[id].fromAssetsArray;
            swap_id = $scope.swapsList[id].swap_id;
        }

        await ajaxReq.http.get(`${window.getApiServer()}/swaps2/${swap_id}`).then(function (r) {
            console.log(r.data)
            size = r.data[0].size;
            data = JSON.parse(r.data[0].data);
            owner = r.data[0].fromAddress;
        });

        let time = new Date(parseInt(data["Time"]) * 1000);

        let tMonth = time.getMonth();
        let tDay = time.getDate();
        let tYear = time.getFullYear();

        time = $scope.months[tMonth] + " " + tDay + ", " + tYear;

        let targes = [];

        data["Targes"].length <= 0 ? (targes = "Public") : (targes = "Private");


        let leftOver = parseInt(size) / parseInt(data["SwapSize"]);
        let leftOverBN = new window.BigNumber(leftOver.toString());

        $scope.$apply(function () {
            $scope.swapInfo = {
                FromAssetName: "",
                FromAssetSymbol: "",
                FromAssetID: "",
                FromEndTime: "",
                FromStartTime: "",
                ID: data["SwapID"],
                MinFromAmount: "",
                MinToAmount: "",
                Owner: owner,
                SwapSize: parseInt(data["SwapSize"]),
                Targes: targes,
                Time: time,
                size: parseInt(size),
                ToAssets: toAssetsArray,
                FromAssets: fromAssetsArray,
                ToAssetName: "",
                ToAssetSymbol: "",
                ToAssetID: "",
                ToEndTime: "",
                ToStartTime: "",
                toVerifiedImage: "",
                toHasImage: "",
                toVerified: "",
                fromVerifiedImage: "",
                fromHasImage: "",
                fromVerified: ""
            };
        });

        $scope.swapInformationModal.open();
    };

    $scope.countDownFunc = function () {
        let counter = 5;
        const intv = setInterval(function () {
            $scope.$apply(function () {
                $scope.countDown = counter;
            })
            counter--
            if (counter === 0) return clearInterval(intv);
        }, 1000);
        if (counter === 0) return clearInterval(intv);
    }
    $scope.getTransactionStatus = async function (txid) {
        let tx;
        await ajaxReq.http.get(`${window.getApiServer()}/transactions/${txid}`).then(function (r) {
            tx = r.data[0];
            if (tx === undefined) {
                $scope.countDownFunc();
                console.log('Transaction not found, will retry in 5s..');
                setTimeout(function () {
                    console.log('Last check: ' + new Date);
                    $scope.getTransactionStatus(txid)
                }, 5000);
                return;
            } else if (tx) {
                uiFuncs.notifier.info('Transaction was successfully processed', 5000);
                $scope.$applyAsync(function () {
                    $scope.transactionStatus = 'Success'
                })
            }
        });
    }

    $scope.setExistingTimeLock = function (asset_id, id, multiAsset) {
        console.log("setExistingTimeLock called!")
        if (multiAsset) {
            $scope.$eval(function () {
                multiAsset.selectedAssetBalance =
                    $scope.myActiveTimeLocks[asset_id][id].amount;
                multiAsset.selectedTimeLockAmount =
                    $scope.myActiveTimeLocks[asset_id][id].amount;
                multiAsset.selectedTimeLockTimespan = `${
                    $scope.myActiveTimeLocks[asset_id][id].startTimeString
                    } - ${$scope.myActiveTimeLocks[asset_id][id].endTimeString}`;
                multiAsset.todayDate = $scope.myActiveTimeLocks[asset_id][id].startTime;
                multiAsset.fromEndTime = $scope.myActiveTimeLocks[asset_id][id].endTime;
                multiAsset.hasTimeLockSet = true;
                multiAsset.sendTimeLockSet = true;
                multiAsset.sendExistingTimeLockSet = true;
                multiAsset.timeLockDropDown = false;
                $scope.closeSendTimelockDropdowns(multiAsset);
            });
        } else {
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
        }
    };

    $scope.setSwapRate = function (asset) {
        if (asset) {

            if (asset.makeReceiveAmount <= 0) {
                return;
            }
            window.Decimal.set({precision: 18, rounding: 4});

            let makeSendAmountBN = new Decimal(
                $scope.convertToString(asset.makeSendAmount)
            );
            let makeReceiveAmountBN = new Decimal(
                $scope.convertToString(asset.makeReceiveAmount)
            );

            let swapRateFinal = makeSendAmountBN.div(makeReceiveAmountBN);

            asset.makeSendSwapRate = swapRateFinal.toString();

        } else {

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

        }
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

    $scope.setReceiveAmountMakeSwap = function (asset) {
        if (asset) {
            if (asset.makeSendAmount <= 0 || asset.makeSendSwapRate <= 0 || asset.makeMinumumSwap == '' || asset.makeMinumumSwap <= 0) {
                return;
            }
            window.Decimal.set({precision: 18, rounding: 4});
            let one = new Decimal($scope.convertToString(1));
            let makeSendSwapRateBN = new Decimal(
                $scope.convertToString(asset.makeSendSwapRate)
            );
            let makeSendAmountBN = new Decimal(
                $scope.convertToString(asset.makeSendAmount)
            );

            let calc = one.div(makeSendSwapRateBN);

            let receiveAmountFinal = makeSendAmountBN.mul(calc);

            asset.makeReceiveAmount = receiveAmountFinal.toString();
        } else {
            if ($scope.makeSendAmount <= 0 || $scope.makeSendSwapRate <= 0 || $scope.makeMinumumSwap == '' || $scope.makeMinumumSwap <= 0) {
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
        }
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
            $scope.makeMinumumSwap == ""
        ) {
            return;
        }

        let makeMinBN = new window.BigNumber(
            $scope.convertToString($scope.makeMinumumSwap)
        );

        for (let i in $scope.multiMakeSwapSendAssetArray){

            let makeSendBN = new window.BigNumber(
                $scope.convertToString($scope.multiMakeSwapSendAssetArray[i].makeSendAmount)
            );
            let makeSendFinal = makeSendBN.div(makeMinBN);
            $scope.$applyAsync(function() {
                $scope.multiMakeSwapSendAssetArray[i].minimumMakeSend = makeSendFinal.toString();
            });
        }

        for (let i in $scope.multiMakeSwapReceiveAssetArray){

            let makeReceiveBN = new window.BigNumber(
                $scope.convertToString($scope.multiMakeSwapReceiveAssetArray[i].makeReceiveAmount)
            );

            let makeReceiveFinal = makeReceiveBN.div(makeMinBN);

            $scope.$applyAsync(function(){
                $scope.multiMakeSwapReceiveAssetArray[i].minimumReceiveSend = makeReceiveFinal.toString();
            })

        }
    };

    $scope.setReceiveAsset = async function (id, asset) {
        $scope.$eval(function () {
            if (asset) {
                asset.selectedReceiveAsset = `${$scope.assetList[id].name} (${
                    $scope.assetList[id].symbol
                    })`;
                asset.selectedReceiveAssetSymbol = `${$scope.assetList[id].symbol}`;
                asset.selectedReceiveImage = `${$scope.assetList[id].image}`;
                asset.selectedReceiveHasImage = $scope.assetList[id].hasImage;
                asset.selectedReceiveContract = $scope.assetList[id].contractaddress;
                asset.selectedReceiveVerified = $scope.assetList[id].verified;
                asset.assetToReceive = $scope.assetList[id].contractaddress;
                asset.receiveDropDown = false;
                asset.receiveDropDown2 = false;
            } else {
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
            }
        });
        $scope.receiveChanged = 1;
        await $scope.allSwaps(0);
    };

    $scope.setSendAsset = async function (id, asset) {
        if (asset) {
            $scope.$eval(function () {
                asset.selectedSendAsset = `${$scope.assetListOwned[id].name} (${
                    $scope.assetListOwned[id].symbol
                    })`;
                asset.selectedSendAssetSymbol = `${$scope.assetListOwned[id].symbol}`;
                asset.selectedSendContract = $scope.assetListOwned[id].contractaddress;
                asset.selectedSendImage = `${$scope.assetListOwned[id].image}`;
                asset.selectedSendHasImage = $scope.assetListOwned[id].hasImage;
                asset.assetToSend = $scope.assetListOwned[id].contractaddress;
                asset.selectedSendVerified = $scope.assetListOwned[id].verified;
                asset.sendHasTimeLockBalance = $scope.assetListOwned[id].timelockBalance;
                asset.sendDropDown = false;
                asset.sendDropDown2 = false;
                asset.showTimeLockSend = false;
            });
            $scope.closeSendTimelockDropdowns(asset);
            $scope.getAssetBalance(asset);
            $scope.sendChanged = 1;
            await $scope.allSwaps(0);
        } else {
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
            await $scope.allSwaps(0);
        }
    };


    $scope.setSendAllAssets = async function (id) {
        $scope.$eval(function () {
            $scope.selectedSendAsset = `${$scope.assetList[id].name} (${
                $scope.assetList[id].symbol
                })`;
            $scope.selectedSendAssetSymbol = `${$scope.assetList[id].symbol}`;
            $scope.selectedSendContract = $scope.assetList[id].contractaddress;
            $scope.selectedSendImage = `${$scope.assetList[id].image}`;
            $scope.selectedSendHasImage = $scope.assetList[id].hasImage;
            $scope.assetToSend = $scope.assetList[id].contractaddress;
            $scope.selectedSendVerified = $scope.assetList[id].verified;
            $scope.sendHasTimeLockBalance = $scope.assetList[id].timelockBalance;
            $scope.sendDropDown = false;
            $scope.sendDropDown2 = false;
        });
        $scope.getAssetBalance();
        $scope.sendChanged = 1;
        await $scope.allSwaps(0);
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
            // console.log($scope.myActiveTimeLocks);
            $scope.$eval(function () {
                $scope.myTimeLockedAssets = Object.keys(res);
            });
        });
    };

    $scope.hasTimeLockBalance = function (asset_id) {
        return $scope.myTimeLockedAssets.includes(asset_id);
    };

    function compressArray(original) {

        var compressed = [];
        // make a copy of the input array
        var copy = original.slice(0);

        // first loop goes over every element
        for (var i = 0; i < original.length; i++) {

            var myCount = 0;
            // loop over every element in the copy and see if it's the same
            for (var w = 0; w < copy.length; w++) {
                if (original[i] == copy[w]) {
                    // increase amount of times duplicate is found
                    myCount++;
                    // sets item to undefined
                    delete copy[w];
                }
            }

            if (myCount > 0) {
                var a = new Object();
                a.value = original[i];
                a.count = myCount;
                compressed.push(a);
            }
        }

        return compressed;
    };
    $scope.takeAvailable = (id) => {
        $scope.getIdForSwap(id).then(function (r) {
            id = r;
        });
        let d = $scope.swapsList[id];
        let leftOver = parseInt(d.size) / parseInt(d.maxswaps);
        let leftOverBN = new window.BigNumber(leftOver.toString());
        let toAssets = $scope.swapsList[id].toAssetsArray;

        let b = [];
        for (let i in toAssets) {
            b.push(toAssets[i].toAssetId);
        }

        let allSame = false;
        let compress = compressArray(b);
        let totalAmount = new window.BigNumber("0");
        if (compress[0].count == toAssets.length) {
            allSame = true;
            for (let asset in toAssets) {
                let b = new window.BigNumber(toAssets[asset].toAmount);
                totalAmount = totalAmount.plus(b);
            }
        }


        for (let asset in toAssets) {
            let toAmount;
            if (!allSame) {
                toAmount = new window.BigNumber(toAssets[asset].toAmount);
            } else {
                toAmount = new window.BigNumber(totalAmount);
            }
            let needMinimumBalance = toAmount.mul(leftOverBN);
            let asset_id = toAssets[asset].toAssetId;

            if ($scope.allBalance[asset_id] == undefined) {
                return true;
            }

            let balance = new window.BigNumber($scope.allBalance[asset_id]);

            if (balance.gte(needMinimumBalance)) {
                return false;
            } else {
                return true;
            }
        }

        // } else if (ToStartTime == 0 && ToEndTime == 18446744073709552000) {
        //     if ($scope.allBalance[asset_id] >= minswaptaker) {
        //         // console.log(asset_id, minswaptaker, ToStartTime, ToEndTime);
        //         return false;
        //     } else {
        //         return true;
        //     }
        // } else if (ToStartTime != 0 && ToEndTime != 18446744073709552000 || ToStartTime == 0 && ToEndTime != 18446744073709552000 || ToStartTime != 0 && ToEndTime == 18446744073709552000) {
        //     if ($scope.myTimeLockedAssets.includes(asset_id) == true) {
        //         return false;
        //     } else {
        //         return true;
        //     }
        // }
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

            let x = -1;
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

                if (assetList[asset]["Name"].length >= 19) {
                    let a = assetList[asset]["Name"].substr(0, 19);
                    assetList[asset]["Name"] = a;
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
                    verified: verifiedAsset,
                    pinned: id === $scope.FUSION_CONTRACT_ADDRESS ? true : '',
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

            if (balances) {
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
            }

            for (let asset in assetList) {
                let id = assetList[asset]["ID"];
                id = assetList[asset]["ID"];
                let owner = assetList[asset]["Owner"];
                let owned = false;
                let assetBalance = "";

                let verifiedImage = "";
                let hasImage = false;
                let verifiedAsset = false;

                if (balances) {
                    assetBalance = balances[id];
                }

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
                    id: x,
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
                    pinned: id === $scope.FUSION_CONTRACT_ADDRESS ? true : '',
                };
                await assetList2.push(data);
                x++;
                if (assetBalance > 0.000000000000000001 && balances) {
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
                        timelockBalance: false,
                        pinned: id === $scope.FUSION_CONTRACT_ADDRESS ? true : '',
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
                        timelockBalance: true,
                        pinned: id === $scope.FUSION_CONTRACT_ADDRESS ? true : '',
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

    $scope.takeModalPrivateSwaps = async function (id) {
        let accountData = uiFuncs.getTxData($scope);
        let walletAddress = accountData.from;
        let balance = "";
        let decimals = 0;
        let toName = "";
        let fromName = "";

        let fromAsset = [];

        try {
            await web3.fsn
                .getBalance($scope.openTakeSwaps[id].toAssetId, walletAddress)
                .then(function (res) {
                    balance = res;
                });
            await window
                .__fsnGetAsset($scope.openTakeSwaps[id].toAssetId)
                .then(function (res) {
                    decimals = res["Decimals"];
                });
            await window
                .__fsnGetAsset($scope.openTakeSwaps[id].toAssetId)
                .then(function (res) {
                    toName = res["Name"];
                });
            await window
                .__fsnGetAsset($scope.openTakeSwaps[id].fromAssetId)
                .then(function (res) {
                    fromName = res["Name"];
                });
        } catch (err) {
            console.log(err);
        }

        let balanceBN = new window.BigNumber(balance.toString());
        let div = new window.BigNumber($scope.countDecimals(decimals));
        balance = balanceBN.div(div);

        await $scope.$apply(function () {
            $scope.takeDataFront.swapId = $scope.openTakeSwaps[id];
            $scope.takeDataFront.fromAssetName = toName;
            $scope.takeDataFront.fromAmountCut = $scope.openTakeSwaps[id].fromAmountCut;
            $scope.takeDataFront.toAmountCut = $scope.openTakeSwaps[id].toAmountCut;
            $scope.takeDataFront.fromAssetSymbol = $scope.openTakeSwaps[id].toAssetSymbol;
            $scope.takeDataFront.fromAssetId = $scope.openTakeSwaps[id].toAssetId;
            $scope.takeDataFront.swapSize = $scope.openTakeSwaps[id].maxswaps;
            $scope.takeDataFront.toAssetName = fromName;
            $scope.takeDataFront.toAssetMin =
                $scope.openTakeSwaps[id].minswap / $scope.openTakeSwaps[id].swapratetaker;
            $scope.takeDataFront.toAssetSymbol = $scope.openTakeSwaps[id].fromAssetSymbol;
            $scope.takeDataFront.toAssetId = $scope.openTakeSwaps[id].fromAssetId;
            $scope.takeDataFront.fromAssetMin = $scope.openTakeSwaps[id].minswaptaker;
            $scope.takeDataFront.fromAssetBalance = balance.toString();
            $scope.takeDataFront.swapRate = $scope.openTakeSwaps[id].swapratetaker;
            $scope.takeDataFront.maxAmount = $scope.openTakeSwaps[id].toAmount;
            $scope.takeDataFront.fromAmount = $scope.openTakeSwaps[id].fromAmount;
            $scope.takeDataFront.toAmount = $scope.openTakeSwaps[id].toAmount;
            $scope.takeDataFront.fromVerified = $scope.openTakeSwaps[id].toVerified;
            $scope.takeDataFront.toVerified = $scope.openTakeSwaps[id].fromVerified;
            $scope.takeDataFront.size = $scope.openTakeSwaps[id].size;
            $scope.takeDataFront.maxTake = maxTake;
            $scope.takeAmountSwap = 1;
        });
        await $scope.setReceive(1).then(function () {
            $scope.takeSwapModal.open();
        });
    };

    $scope.setSendAllAssets = async function (id) {
        $scope.$eval(function () {
            $scope.selectedSendAsset = `${$scope.assetList[id].name} (${
                $scope.assetList[id].symbol
                })`;
            $scope.selectedSendAssetSymbol = `${$scope.assetList[id].symbol}`;
            $scope.selectedSendContract = $scope.assetList[id].contractaddress;
            $scope.selectedSendImage = `${$scope.assetList[id].image}`;
            $scope.selectedSendHasImage = $scope.assetList[id].hasImage;
            $scope.assetToSend = $scope.assetList[id].contractaddress;
            $scope.selectedSendVerified = $scope.assetList[id].verified;
            $scope.sendHasTimeLockBalance = $scope.assetList[id].timelockBalance;
            $scope.sendDropDown = false;
            $scope.sendDropDown2 = false;
        });
        $scope.getAssetBalance();
        $scope.sendChanged = 1;
        await $scope.allSwaps(0);
    };

    $scope.getIdForSwap = async (id) => {
        let d = 0;
        for (let i in $scope.swapsList) {
            if ($scope.swapsList[i].id === id) {
                d = i;
            }
        }

        return d;
    }

    $scope.getIdForMakeSwap = async (id) => {
        let d = 0;
        for (let i in $scope.openMakes) {
            if ($scope.openMakes[i].id === id) {
                d = i;
            }
        }

        return d;
    }

    $scope.getSuspiciousMessage = async () => {
        for ( let i in $scope.multiTakeSwapReceiveAssetArray){
            console.log($scope.multiTakeSwapReceiveAssetArray[i]);
            if($scope.multiTakeSwapReceiveAssetArray[i].fromVerified === false) {
                return true;
            } else {
                return false;
            }
        }
    }
    $scope.takeId = 0;

    $scope.takeModal = async function (id, pass) {
        id = await $scope.getIdForSwap(id);
        let accountData = uiFuncs.getTxData($scope);
        let walletAddress = accountData.from;
        let balance = "";
        let decimals = 0;
        let toName = "";
        let fromName = "";

        let fromAsset = [];

        await $scope.$applyAsync(function () {
            $scope.multiTakeSwapSendAssetArray = $scope.swapsList[id].toAssetsArray;
            $scope.multiTakeSwapReceiveAssetArray = $scope.swapsList[id].fromAssetsArray;
        });

        let suspicious = await $scope.getSuspiciousMessage();
        console.log(`Suspicious is ${suspicious}`)

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

        if ($scope.swapsList[id].fromAssetId == $scope.DEFAULT_USAN) {
            pass = true;
        }

        let balanceBN = new window.BigNumber(balance.toString());
        let div = new window.BigNumber($scope.countDecimals(decimals));
        balance = balanceBN.div(div);

        let maximumAmount = $scope.swapsList[id].toAmount;
        let maximumSize = $scope.swapsList[id].size;

        console.log(balance.toString(), maximumAmount, maximumSize);

        let maxTake = 0;

        if (balance.toString() > maximumAmount) {
            maxTake = maximumSize;
        } else {

        }

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
            $scope.takeDataFront.fromAssetBalance = balance.toString();
            $scope.takeDataFront.swapRate = $scope.swapsList[id].swapratetaker;
            $scope.takeDataFront.maxAmount = $scope.swapsList[id].toAmount;
            $scope.takeDataFront.fromAmount = $scope.swapsList[id].fromAmount;
            $scope.takeDataFront.toAmount = $scope.swapsList[id].toAmount;
            $scope.takeDataFront.fromVerified = $scope.swapsList[id].toVerified;
            $scope.takeDataFront.toVerified = suspicious;
            $scope.takeDataFront.size = $scope.swapsList[id].size;
            $scope.takeDataFront.maxTake = maxTake;
            $scope.takeAmountSwap = 1;
            $scope.takeId = id;
            $scope.takeTxid = "";
            $scope.transactionStatus = "Pending";
        });

        await $scope.setReceive(1).then(function () {
            if (!pass) {
                if (!$scope.suspiciousAsset(id)) {
                    $scope.suspiciousAssetModal.open();
                } else {
                    $scope.takeSwapModal.open();
                }
            } else {
                $scope.takeSwapModal.open();
            }
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
            $scope.convertToString($scope.takeDataFront.size)
        );
        let perc3 = perc1.div($scope.convertToString(perc2));


        for (let i in $scope.multiTakeSwapSendAssetArray) {
            let fromAmountBN = new window.Decimal(
                $scope.convertToString($scope.multiTakeSwapSendAssetArray[i].toAmount)
            );
            let fromFinal = fromAmountBN.times($scope.convertToString(perc3));

            let toAmountBN = new window.Decimal(
                $scope.convertToString($scope.takeDataFront.toAmount)
            );
            let toFinal = toAmountBN.times($scope.convertToString(perc3));

            await $scope.$applyAsync(function () {
                $scope.multiTakeSwapSendAssetArray[i].sendTokens = fromFinal.toPrecision(5);
            });
        }
        for (let i in $scope.multiTakeSwapReceiveAssetArray) {
            let toAmountBN = new window.Decimal(
                $scope.convertToString($scope.multiTakeSwapReceiveAssetArray[i].fromAmount)
            );
            let toFinal = toAmountBN.times($scope.convertToString(perc3));

            await $scope.$applyAsync(function () {
                $scope.multiTakeSwapReceiveAssetArray[i].receiveTokens = toFinal.toPrecision(5);
            });
        }

        for (let i in $scope.multiTakeSwapSendAssetArray) {
            let fromAmountBN = new window.Decimal(
                $scope.convertToString($scope.multiTakeSwapSendAssetArray[i].toAmount)
            );

            let k = i;
            if($scope.multiTakeSwapReceiveAssetArray[i].fromAmount == undefined){
                k = i -1;
            }
            let toAmountBN = new window.Decimal(
                $scope.convertToString($scope.multiTakeSwapReceiveAssetArray[k].fromAmount)
            );
            let swapRate = fromAmountBN.div($scope.convertToString(toAmountBN));

            await $scope.$applyAsync(function () {
                $scope.multiTakeSwapSendAssetArray[i].swaprate = swapRate;
            });
        }
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

        let isMultiSwap = false;

        if (swap_id.fromAssetsArray.length > 1 || swap_id.toAssetsArray.length > 1) {
            isMultiSwap = true;
        }

        if (!isMultiSwap) {
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
                            $scope.takeTxid = txHash;
                            $scope.getTransactionStatus(txHash);
                            window.log(`TXID : ${txHash}`);
                        });

                    return $scope.takeSwapEndConfirm.open();
                });
            } catch (err) {
                $scope.errorModal.open();
                console.log(err);
            }
        } else if (isMultiSwap) {
            try {
                await web3.fsntx.buildTakeMultiSwapTx(data).then(function (tx) {
                    tx.from = walletAddress;
                    tx.chainId = _CHAINID;
                    data = tx;
                    if ($scope.wallet.hwType == "ledger") {
                        return;
                    }
                    web3.fsn
                        .signAndTransmit(tx, $scope.account.signTransaction)
                        .then(txHash => {
                            $scope.takeTxid = txHash;
                            $scope.getTransactionStatus(txHash);
                            window.log(`TXID : ${txHash}`);
                        });

                    return $scope.takeSwapEndConfirm.open();
                });
            } catch (err) {
                $scope.errorModal.open();
                console.log(err);
            }
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
            $scope.setSendAllAssets(assetListOwnedId);
            $scope.setReceiveAsset(assetListId);
        }
    };

    $scope.getLastRow = function (rows) {
        if (rows.length)
            return rows[rows.length - 1];
        return null;
    }

    $scope.makeModal = async function (send, receive) {

        $scope.multiMakeSwapSendAssetIdTracker = 0;
        $scope.multiMakeSwapReceiveAssetIdTracker = 0;
        let sendData = {
            id: $scope.multiMakeSwapSendAssetIdTracker,
            makeSendAmount: 0,
            makeMinumumSwap: 0,
            privateAccess: false,
            makeTarges: "",
            showTimeLockSend: false,
            showExistingTimeLocks: false,
            showTimeLockReceive: false,
            ToStartTime: "",
            ToEndTime: "",
            fromStartTime: "",
            fromEndTime: "",
            selectedSendContract: $scope.selectedSendContract,
            selectedAssetBalance: $scope.selectedAssetBalance,
            sendDropDown2: $scope.sendDropDown2,
            selectedSendAsset: $scope.selectedSendAsset,
            selectedSendHasImage: $scope.selectedSendHasImage,
            selectedSendImage: $scope.selectedSendImage,
            selectedSendAssetSymbol: $scope.selectedSendAssetSymbol,
            selectedSendVerified: $scope.selectedSendVerified,
            searchSendAsset: $scope.searchSendAsset,
        };
        let receiveData = {
            id: $scope.multiMakeSwapReceiveAssetIdTracker,
            makeReceiveAmount: 0,
            makeMinumumSwap: 0,
            privateAccess: false,
            makeTarges: "",
            showTimeLockSend: false,
            showExistingTimeLocks: false,
            showTimeLockReceive: false,
            ToStartTime: "",
            ToEndTime: "",
            fromStartTime: "",
            fromEndTime: "",
            receiveDropDown2: $scope.receiveDropDown2,
            selectedReceiveAsset: $scope.selectedReceiveAsset,
            selectedReceiveHasImage: $scope.selectedReceiveHasImage,
            selectedReceiveImage: $scope.selectedReceiveImage,
            selectedReceiveAssetSymbol: $scope.selectedReceiveAssetSymbol,
            selectedReceiveVerified: $scope.selectedReceiveVerified,
            searchReceiveAsset: $scope.searchReceiveAsset,
        };

        $scope.$eval(function () {

            $scope.multiMakeSwapSendAssetArray.push(sendData);
            $scope.multiMakeSwapReceiveAssetArray.push(receiveData);
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
            $scope.makeTxid = "";
            $scope.transactionStatus = "Pending";
        });
        $scope.makeSwapModal.open();
        await $scope.checkMakeSwapConditions();
        let a = document.getElementById('makeSendAmount_0');
        // a.focus();
        setTimeout(function () {
            a.focus();
        }, 200);
    };

    $scope.closeMakeSwapModal = async function () {
        $scope.$eval(function () {
            $scope.multiMakeSwapSendAssetArray = [];
            $scope.multiMakeSwapSendAssetIdTracker = 0;
            $scope.multiMakeSwapReceiveAssetArray = [];
            $scope.multiMakeSwapReceiveAssetIdTracker = 0;
        });
        $scope.makeSwapModal.close();
    }

    $scope.closeMakeSwapConfirmModal = async function () {
        $scope.$eval(function () {
            $scope.multiMakeSwapSendAssetArray = [];
            $scope.multiMakeSwapSendAssetIdTracker = 0;
            $scope.multiMakeSwapReceiveAssetArray = [];
            $scope.multiMakeSwapReceiveAssetIdTracker = 0;
        });
        $scope.makeSwapConfirmModal.close();
    }

    $scope.closeMakeSwapConfirmModal = async function () {
        $scope.$eval(function () {
            $scope.multiMakeSwapSendAssetArray = [];
            $scope.multiMakeSwapSendAssetIdTracker = 0;
            $scope.multiMakeSwapReceiveAssetArray = [];
            $scope.multiMakeSwapReceiveAssetIdTracker = 0;
        });
        $scope.makeSwapConfirmModal.close();
    }

    $scope.closeMakeSwapConfirmEndModal = async function () {
        $scope.$eval(function () {
            $scope.multiMakeSwapSendAssetArray = [];
            $scope.multiMakeSwapSendAssetIdTracker = 0;
            $scope.multiMakeSwapReceiveAssetArray = [];
            $scope.multiMakeSwapReceiveAssetIdTracker = 0;
        });
        $scope.makeSwapConfirmEndModal.close();
    }

    // TO DO:
    // handle when USAN has been selected in previous rows (?)
    // add focus on last row (?)
    $scope.addMakeSwapSendAssetRow = async function () {
        $scope.$eval(function () {
            $scope.multiMakeSwapSendAssetIdTracker = $scope.multiMakeSwapSendAssetIdTracker + 1;
            let data = angular.copy($scope.getLastRow($scope.multiMakeSwapSendAssetArray));
            // console.log("last row; ", data);
            data.id = $scope.multiMakeSwapSendAssetIdTracker;
            data.sendDropDown2 = false;
            data.searchSendAsset = "";
            $scope.removeSendTimeLock(data);
            // console.log("data.id: "+$scope.multiMakeSwapSendAssetIdTracker);
            // console.log("last row after id update: ", data);
            $scope.multiMakeSwapSendAssetArray.push(data);
            // console.log("array after push2: ", $scope.multiMakeSwapSendAssetArray);
        });
    }

    $scope.addMakeSwapReceiveAssetRow = async function () {
        $scope.$eval(function () {
            $scope.multiMakeSwapReceiveAssetIdTracker = $scope.multiMakeSwapReceiveAssetIdTracker + 1;
            let data = angular.copy($scope.getLastRow($scope.multiMakeSwapReceiveAssetArray));
            // console.log("last row; ", data);
            data.id = $scope.multiMakeSwapReceiveAssetIdTracker;
            data.receiveDropDown2 = false;
            data.searchReceiveAsset = "";
            $scope.removeReceiveTimeLock(data);
            // console.log("data.id: "+$scope.multiMakeSwapReceiveAssetIdTracker);
            // console.log("last row after id update: ", data);
            $scope.multiMakeSwapReceiveAssetArray.push(data);
            // console.log("array after push2: ", $scope.multiMakeSwapReceiveAssetArray);
        });
    }

    $scope.removeMakeSwapSendAssetRow = async function (sendAssetRow) {
        var index = $scope.multiMakeSwapSendAssetArray.indexOf(sendAssetRow);
        $scope.multiMakeSwapSendAssetArray.splice(index, 1);
    }

    $scope.removeMakeSwapReceiveAssetRow = async function (receiveAssetRow) {
        var index = $scope.multiMakeSwapReceiveAssetArray.indexOf(receiveAssetRow);
        $scope.multiMakeSwapReceiveAssetArray.splice(index, 1);
    }

    $scope.makeSwapConfirmation = async function (end, asset) {

        if ($scope.makeTarges !== "") {
            $scope.makeTarges = $scope.makeTarges.replace(" ", "");
            let targesArr = $scope.makeTarges.split(",");
            await $scope.processAllTarges(targesArr, 0);
        } else {
            $scope.targesArray = [];
        }

        $scope.$eval(function () {

            $scope.multiMakeSwapSendAssetArray.forEach((row) => {

                let sendAssetSymbol = "";
                for (let asset in $scope.assetList) {
                    if (row.assetToSend == $scope.assetList[asset].contractaddress) {
                        sendAssetSymbol = $scope.assetList[asset].symbol;
                    }
                }
                // row.makeSendAmountConfirm = $scope.makeReceiveAmount === 1 ?
                //     $scope.makeSendAmount : $scope.makeReceiveAmount !== 0 ?
                //     $scope.makeSendAmount / $scope.makeReceiveAmount : $scope.makeSendAmount;
                row.makeSendAmountConfirm = row.makeSendAmount;
                $scope.makeMinumumSwapConfirm = $scope.selectedSendContract === $scope.DEFAULT_USAN ?
                    1 : $scope.makeMinumumSwap;
                row.makeMinumumSwapConfirm = row.makeMinumumSwap;
                row.assetToSendConfirm = sendAssetSymbol;
                row.fromStartTimeString = $scope.returnDateString(
                    new Date(row.fromStartTime).getTime() / 1000.0 + 1000
                );
                row.fromEndTimeString = $scope.returnDateString(
                    new Date(row.fromEndTime).getTime() / 1000.0 + 1000
                );

            });

            $scope.multiMakeSwapReceiveAssetArray.forEach((row) => {

                let receiveAssetSymbol = "";
                for (let asset in $scope.assetList) {
                    if (row.assetToReceive == $scope.assetList[asset].contractaddress) {
                        receiveAssetSymbol = $scope.assetList[asset].symbol;
                    }
                }
                // row.makeReceiveAmountConfirm = $scope.selectedSendContract !== $scope.DEFAULT_USAN ?
                //     1 : row.makeReceiveAmount;
                row.makeReceiveAmountConfirm = row.makeReceiveAmount;
                // $scope.makeMinumumSwapConfirm = $scope.selectedSendContract === $scope.DEFAULT_USAN ?
                //     1: $scope.makeMinumumSwap;
                row.makeMinumumSwapConfirm = row.makeMinumumSwap;
                row.assetToReceiveConfirm = receiveAssetSymbol;
                row.toStartTimeString = $scope.returnDateString(
                    new Date(row.toStartTime).getTime() / 1000.0 + 1000
                );
                row.toEndTimeString = $scope.returnDateString(
                    new Date(row.toEndTime).getTime() / 1000.0 + 1000
                );

            });

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

    $scope.targesArray = [];

    $scope.allBalance = [];

    $scope.hasEnoughBalance = function (
        asset_id,
        minswaptaker,
        startTime,
        endTime
    ) {
        if ($scope.allBalance[asset_id] > minswaptaker) {
            return true;
        } else {
            return $scope.hasTimeLockBalance(asset_id);
        }
    };

    $scope.createMinAmountHex = async (amount, assetId, makeminumumswap) => {
        if (!makeminumumswap || makeminumumswap <= 0) {
            makeminumumswap = 1;
        }
        makeminumumswap = new BigNumber(
            $scope.convertToString(makeminumumswap)
        );

        let asset = [];
        try {
            await window.__fsnGetAsset(assetId).then(function (res) {
                asset = res;
            });
        } catch (err) {
            $scope.errorModal.open();
            console.log(err);
        }
        //Send Part
        BigNumber.config({DECIMAL_PLACES: parseInt(asset["Decimals"]) > 0 ? parseInt(asset["Decimals"]) - 1 : 0});
        let makeSendAmountBN = new BigNumber(
            $scope.convertToString(amount)
        );
        let makeSendAmountDiv = makeSendAmountBN.div(makeminumumswap);
        let makeSendString = makeSendAmountDiv.toString();
        let makeSendFinal = $scope.makeBigNumber(
            makeSendString,
            parseInt(asset["Decimals"])
        );

        if(assetId === '0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe'){
            return "0x1";
        }

        return "0x" + makeSendFinal.toString(16);
    }

    $scope.takeGetAllBalances = async function () {
        try {
            let accountData = uiFuncs.getTxData($scope);
            let walletAddress = accountData.from;
            let decimals = 0;
            let assetBalance = 0;

            let allAssets = {};
            await window.__fsnGetAllAssets().then(function (r) {
                allAssets = r;
            })
            let allBalances = {};
            await window.__fsnGetAllBalances(walletAddress).then(function (r) {
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

    $scope.checkMakeSwapTimeLocks = async (array) => {
        if (!array.FromStartTime || array.FromStartTime === "0xNaN") {
            delete array.FromStartTime;
        }
        if (!array.FromEndTime || array.FromEndTime === "0xNaN") {
            delete array.FromEndTime;
        }
        if (!array.ToStartTime || array.ToStartTime === "0xNaN") {
            delete array.ToStartTime;
        }
        if (!array.ToEndTime || array.ToEndTime === "0xNaN") {
            delete array.ToEndTime;
        }
        return array;
    }

    $scope.makeSwap = async function () {
        $scope.targesArray = [];
        let password = walletService.password;
        let accountData = uiFuncs.getTxData($scope);
        let walletAddress = accountData.from;

        if ($scope.makeTarges !== "") {
            $scope.makeTarges = $scope.makeTarges.replace(" ", "");
            let targesArr = $scope.makeTarges.split(",");
            await $scope.processAllTarges(targesArr, 0);
        } else {
            $scope.targesArray = [];
        }

        // let data = {
        //     from: walletAddress,
        //     FromAssetID: $scope.assetToSend,
        //     ToAssetID: $scope.assetToReceive,
        //     MinToAmount: minToAmountHex,
        //     MinFromAmount: minFromAmountHex,
        //     SwapSize: parseInt($scope.makeMinumumSwap),
        //     Targes: $scope.targesArray
        // };


        if (!$scope.account && $scope.wallet.hwType !== "ledger") {
            $scope.account = web3.eth.accounts.privateKeyToAccount(
                $scope.toHexString($scope.wallet.getPrivateKey())
            );
        }

        if (data.ToAssetID === $scope.DEFAULT_USAN) {
            data.MinToAmount = "0x" + "1".toString(16);
            data.SwapSize = parseInt(1);
        }
        if (data.FromAssetID === $scope.DEFAULT_USAN) {
            data.MinFromAmount = "0x" + "1".toString(16);
            data.SwapSize = parseInt(1);
        }

        if ($scope.multiMakeSwapSendAssetArray.length !== 1 || $scope.multiMakeSwapReceiveAssetArray.length !== 1) {
            console.log(`Multi swap`)
            let s = $scope.multiMakeSwapSendAssetArray;
            let r = $scope.multiMakeSwapReceiveAssetArray;

            let FromAssetID = [];
            let MinFromAmount = [];
            let FromStartTime = [];
            let FromEndTime = []
            let ToAssetID = [];
            let MinToAmount = [];
            let ToStartTime = [];
            let ToEndTime = [];

            // Send
            for (let x in s) {
                FromAssetID.push(s[x].assetToSend);
                if (!s[x].fromStartTime) {
                    s[x].fromStartTime = 0;
                }
                if (!s[x].fromEndTime || s[x].fromEndTime == "") {
                    s[x].fromEndTime = web3.fsn.consts.TimeForeverStr;
                    FromEndTime.push(s[x].fromEndTime);
                } else {
                    FromEndTime.push(getHexDate(convertDate(s[x].fromEndTime)));
                }
                FromStartTime.push(getHexDate(convertDate(s[x].fromStartTime)));
                MinFromAmount.push(await $scope.createMinAmountHex(s[x].makeSendAmount, s[x].assetToSend, $scope.makeMinumumSwap));
            }

            // Receive
            for (let x in r) {
                if (!r[x].toStartTime) {
                    r[x].toStartTime = 0;
                }
                if (!r[x].toEndTime || r[x].toEndTime == "") {
                    r[x].toEndTime = web3.fsn.consts.TimeForeverStr;
                    ToEndTime.push(r[x].toEndTime);
                } else {
                    ToEndTime.push(getHexDate(convertDate(r[x].toEndTime)));
                }
                ToAssetID.push(r[x].assetToReceive);
                ToStartTime.push(getHexDate(convertDate(r[x].toStartTime)));
                MinToAmount.push(await $scope.createMinAmountHex(r[x].makeReceiveAmount, r[x].assetToReceive, $scope.makeMinumumSwap));
            }

            let txData = {
                from: walletAddress,
                FromAssetID: FromAssetID,
                ToAssetID: ToAssetID,
                MinFromAmount: MinFromAmount,
                MinToAmount: MinToAmount,
                ToStartTime: ToStartTime,
                ToEndTime: ToEndTime,
                FromStartTime: FromStartTime,
                FromEndTime: FromEndTime,
                Targes: $scope.targesArray,
                SwapSize: parseInt($scope.makeMinumumSwap),
            }

            data = txData;

            try {
                await web3.fsntx.buildMakeMultiSwapTx(data).then(function (tx) {
                    tx.from = walletAddress;
                    tx.chainId = _CHAINID;
                    data = tx;
                    if ($scope.wallet.hwType == "ledger") {
                        return;
                    }
                    return web3.fsn
                        .signAndTransmit(tx, $scope.account.signTransaction)
                        .then(txHash => {
                            $scope.makeTxid = txHash;
                            $scope.getTransactionStatus(txHash);
                            window.log(`TXID: ${txHash}`);
                            $scope.makeSwapConfirmation("end");
                        });
                });
            } catch (err) {
                $scope.errorModal.open();
                console.log(err);
            }

            console.log(txData);
        } else {
            console.log(`Not multi swap.`);
            let s = $scope.multiMakeSwapSendAssetArray[0];
            let r = $scope.multiMakeSwapReceiveAssetArray[0];

            let txData = {
                FromAssetID: s.assetToSend,
                MinFromAmount: await $scope.createMinAmountHex(s.makeSendAmount, s.assetToSend, $scope.makeMinumumSwap),
                FromStartTime: getHexDate(convertDate(s.fromStartTime)),
                FromEndTime: getHexDate(convertDate(s.fromEndTime)),
                ToAssetID: r.assetToReceive,
                MinToAmount: await $scope.createMinAmountHex(r.makeReceiveAmount, r.assetToReceive, $scope.makeMinumumSwap),
                ToStartTime: getHexDate(convertDate(r.toStartTime)),
                ToEndTime: getHexDate(convertDate(r.toEndTime)),
                Targes: $scope.targesArray,
                SwapSize: parseInt($scope.makeMinumumSwap),
                from: walletAddress,
            }
            data = await $scope.checkMakeSwapTimeLocks(txData);

            if(s.assetToSend === $scope.DEFAULT_USAN){
                data.SwapSize = 1;
            }
            console.log(data);

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
                            $scope.makeTxid = txHash;
                            $scope.getTransactionStatus(txHash);
                            window.log(`TXID: ${txHash}`);
                            $scope.makeSwapConfirmation("end");
                        });
                });
            } catch (err) {
                $scope.errorModal.open();
                console.log(err);
            }
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
        $scope.$applyAsync(function () {
            $scope.recallTxid = "";
            $scope.transactionStatus = "Pending";
            $scope.recallAssetId = swap_id;
        })
    };

    $scope.recallSwap = async function (swap_id) {
        $scope.recallTxid = undefined;
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

            let url = `${window.getApiServer()}/swaps2/${data.SwapID}`
            let d;
            await ajaxReq.http.get(url).then(function (r) {
                d = r.data[0];
            });

            if (!d) {
                return;
            }

            let swapDetails = JSON.parse(d.data);
            let isMultiSwap = false;
            if (Array.isArray(swapDetails.FromAssetID) || Array.isArray(swapDetails.ToAssetID)) {
                isMultiSwap = true;
            }

            if (isMultiSwap) {
                try {
                    await web3.fsntx.buildRecallMultiSwapTx(data).then(function (tx) {
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
                                $scope.$applyAsync(function () {
                                    $scope.recallTxid = txHash;
                                    $scope.getTransactionStatus(txHash);
                                })
                                $scope.recallSwapSuccess.open();
                            });
                    });
                } catch (err) {
                    $scope.errorModal.open();
                    console.log(err);
                }
            } else {
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
                                $scope.$applyAsync(function () {
                                    $scope.recallTxid = txHash;
                                    $scope.getTransactionStatus(txHash);
                                })
                                $scope.recallSwapSuccess.open();
                            });
                    });
                } catch (err) {
                    $scope.errorModal.open();
                    console.log(err);
                }
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
                                $scope.recallTxid = txHash;
                                $scope.getTransactionStatus(txHash);
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
                    $scope.targesArray.push(res);
                }
                return $scope.processAllTarges(targes, index + 1);
            });
        } else {
            $scope.targesArray.push(target);
            return $scope.processAllTarges(targes, index + 1);
        }
    };

    $scope.getAssetBalance = async function (multiAsset) {
        if (multiAsset) {
            let asset = multiAsset.assetToSend;
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

            let decimalsBN = new window.BigNumber($scope.countDecimals(decimals).toString())
            let balanceBN = new window.BigNumber(assetBalance.toString());

            let balance = balanceBN.div(decimalsBN).toString();

            $scope.$apply(function () {
                multiAsset.selectedAssetBalance = balance;
                multiAsset.selectedAssetSymbol = assetSymbol;
            });
        } else {
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

            let decimalsBN = new window.BigNumber($scope.countDecimals(decimals).toString())
            let balanceBN = new window.BigNumber(assetBalance.toString());

            let balance = balanceBN.div(decimalsBN).toString();

            $scope.$apply(function () {
                $scope.selectedAssetBalance = balance;
                $scope.selectedAssetSymbol = assetSymbol;
            });
        }
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

    $scope.usanAlreadyInSwap = false;
    let openMakesListRunning = false;
    $scope.openMakesList = async function () {
        $scope.usanAlreadyInSwap = false;
        let usanAlreadyInSwap = false;
        let swapList = [];
        let openMakeListFront = [];

        if (openMakesListRunning) {
            window.log("Open Makes List already running!");
            return;
        }

        openMakesListRunning = true;

        if (walletService.wallet !== null) {
            let accountData = uiFuncs.getTxData($scope);
            let walletAddress = accountData.from;

            try {
                let swaps = {};
                await ajaxReq.http.get(`${window.getApiServer()}/swaps2/all?address=${walletAddress}&page=0&size=100`).then(function (r) {
                    swaps = r.data;
                });
                for (let swap in swaps) {
                    if (swaps[swap].data) {
                        let data = JSON.parse(swaps[swap].data);
                        if (data["SwapID"] !== undefined) {
                            swapList[data["SwapID"]] = data;
                            swapList[data["SwapID"]].size = swaps[swap].size;
                        }
                    }
                }
            } catch (err) {
                // console.log(err);
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

                // from
                if (!Array.isArray(swapList[asset]["FromAssetID"])) {
                    let a = [];
                    a.push(swapList[asset]["FromAssetID"]);
                    swapList[asset]["FromAssetID"] = a;
                }
                if (!Array.isArray(swapList[asset]["FromEndTime"])) {
                    let a = [];
                    a.push(swapList[asset]["FromEndTime"]);
                    swapList[asset]["FromEndTime"] = a;
                }
                if (!Array.isArray(swapList[asset]["FromStartTime"])) {
                    let a = [];
                    a.push(swapList[asset]["FromStartTime"]);
                    swapList[asset]["FromStartTime"] = a;
                }
                if (!Array.isArray(swapList[asset]["MinFromAmount"])) {
                    let a = [];
                    a.push(swapList[asset]["MinFromAmount"]);
                    swapList[asset]["MinFromAmount"] = a;
                }

                // to

                if (!Array.isArray(swapList[asset]["ToAssetID"])) {
                    let a = [];
                    a.push(swapList[asset]["ToAssetID"]);
                    swapList[asset]["ToAssetID"] = a;
                }
                if (!Array.isArray(swapList[asset]["ToEndTime"])) {
                    let a = [];
                    a.push(swapList[asset]["ToEndTime"]);
                    swapList[asset]["ToEndTime"] = a;
                }
                if (!Array.isArray(swapList[asset]["ToStartTime"])) {
                    let a = [];
                    a.push(swapList[asset]["ToStartTime"]);
                    swapList[asset]["ToStartTime"] = a;
                }
                if (!Array.isArray(swapList[asset]["MinToAmount"])) {
                    let a = [];
                    a.push(swapList[asset]["MinToAmount"]);
                    swapList[asset]["MinToAmount"] = a;
                }

                let id = swapList[asset]["ID"];
                let assetBalance = "";

                let fromAsset = allAssets[swapList[asset]["FromAssetID"][0]];
                let toAsset = allAssets[swapList[asset]["ToAssetID"][0]];
                let fromVerifiedImage = "";
                let fromHasImage = false;
                let fromVerified = false;

                if (fromAsset.AssetID == $scope.DEFAULT_USAN) {
                    usanAlreadyInSwap = true;
                    let swap = {};
                    await web3.fsn.getSwap(swapList[asset]["SwapID"]).then(function (r) {
                        swap = r;
                    });
                    let USAN = swap["Notation"];
                    fromAsset.Symbol = `USAN ${USAN}`;
                    fromAsset.Name = USAN;
                }

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
                        fromVerifiedImage = "EFSN_LIGHT.svg";
                        fromHasImage = true;
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
                        toVerifiedImage = "EFSN_LIGHT.svg";
                        toHasImage = true;
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

                let leftOver = parseInt(swapList[asset]["size"]) / parseInt(swapList[asset]["SwapSize"]);
                let leftOverBN = new window.BigNumber(leftOver.toString());

                // fromAmount
                let minFromAmountBN = new window.BigNumber(swapList[asset]["MinFromAmount"][0].toString());
                let fromAmountDec = $scope.countDecimals(fromAsset["Decimals"]);
                let minFromAmountDecimalsBN = new window.BigNumber(fromAmountDec.toString());
                let minFromAmountFormattedBN = minFromAmountBN.div(minFromAmountDecimalsBN);
                let minFromSwapSizeBN = new window.BigNumber(swapList[asset]["SwapSize"]);
                let minFromMaxAmountBN = minFromAmountFormattedBN.times(minFromSwapSizeBN);
                let minFromAmountFinal = leftOverBN.times(minFromMaxAmountBN);

                // toAmount
                let minToAmountBN = new window.BigNumber(swapList[asset]["MinToAmount"][0].toString());
                let toAmountDec = $scope.countDecimals(toAsset["Decimals"]);
                let minToAmountDecimalsBN = new window.BigNumber(toAmountDec.toString());
                let minToAmountFormattedBN = minToAmountBN.div(minToAmountDecimalsBN);
                let minToSwapSizeBN = new window.BigNumber(swapList[asset]["SwapSize"]);
                let minToMaxAmountBN = minToAmountFormattedBN.times(minToSwapSizeBN);
                let minToAmountFinal = leftOverBN.times(minToMaxAmountBN);

                let toAmountF = minToAmountFinal.toString();
                let fromAmountF = minFromAmountFinal.toString();

                let minimumswapopenmake =
                    fromAmountF / parseInt(swapList[asset]["SwapSize"]);

                let data = {
                    id: openMakeListFront.length,
                    swap_id: swapList[asset]["SwapID"],
                    fromAssetId: swapList[asset]["FromAssetID"][0],
                    fromAssetSymbol: fromAsset["Symbol"],
                    fromAmount: fromAmountF,
                    fromAmountCut: +minFromAmountFinal.toFixed(8),
                    toAssetId: swapList[asset]["ToAssetID"][0],
                    toAmount: toAmountF,
                    toAmountCut: +minToAmountFinal.toFixed(8),
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
                    FromEndTime: swapList[asset]["FromEndTime"][0],
                    FromStartTime: swapList[asset]["FromStartTime"][0],
                    FromEndTimeString: $scope.returnDateString(
                        swapList[asset]["FromEndTime"][0],
                        "End"
                    ),
                    FromStartTimeString: $scope.returnDateString(
                        swapList[asset]["FromStartTime"][0],
                        "Start"
                    ),
                    ToEndTime: swapList[asset]["ToEndTime"][0],
                    ToStartTime: swapList[asset]["ToStartTime"][0],
                    ToEndTimeString: $scope.returnDateString(
                        swapList[asset]["ToEndTime"][0],
                        "End"
                    ),
                    ToStartTimeString: $scope.returnDateString(
                        swapList[asset]["ToStartTime"][0],
                        "Start"
                    ),
                    fromVerifiedImage: fromVerifiedImage,
                    fromHasImage: fromHasImage,
                    fromVerified: fromVerified,
                    toVerifiedImage: toVerifiedImage,
                    toHasImage: toHasImage,
                    toVerified: toVerified,

                    // multi-swap related
                    expand: false,
                    fromAssetsArray: await $scope.returnFromSwapsDatastructure(swapList[asset]),
                    toAssetsArray: await $scope.returnToSwapsDatastructure(swapList[asset]),
                };

                // console.log(data);

                await openMakeListFront.push(data);

            }
        }

        $scope.$applyAsync(function () {
            $scope.usanAlreadyInSwap = usanAlreadyInSwap;
            $scope.openMakes = openMakeListFront;
            $scope.openMakeSwaps = $scope.openMakes.length;
        });
       // console.log($scope.openMakes);
        await $scope.checkMakeSwapConditions();
        window.log("Finished retrieving all Open Swaps");
        openMakesListRunning = false;
    };

    // $scope.$watch('selectedSendContract', function () {
    //     $scope.allSwaps(0);
    //     $scope.allSwapsPage = 0;
    // })
    // $scope.$watch('selectedReceiveContract', function () {
    //     $scope.allSwaps(0);
    //     $scope.allSwapsPage = 0;
    // });


    $scope.closeAllOtherDropDowns = async function (input, asset) {
        if (input === 'sendDropDown') {
            $scope.$eval(function () {
                $scope.sendDropDown2 = false;
                $scope.receiveDropDown = false;
                $scope.receiveDropDown2 = false;
            });
            return;
        }
        if (input === 'sendDropDown2') {
            $scope.$eval(function () {
                if (asset) {
                    $scope.multiMakeSwapSendAssetArray.forEach((row) => {
                        if (row.id !== asset.id) {
                            row.sendDropDown = false;
                            row.sendDropDown2 = false;
                            row.receiveDropDown = false;
                            row.receiveDropDown2 = false;
                        } else {
                            row.sendDropDown = false;
                            row.receiveDropDown = false;
                            row.receiveDropDown2 = false;
                        }
                    });
                } else {
                    $scope.sendDropDown = false;
                    $scope.receiveDropDown = false;
                    $scope.receiveDropDown2 = false;
                }
            });
            return;
        }
        if (input === 'receiveDropDown') {
            $scope.$eval(function () {
                $scope.sendDropDown = false;
                $scope.sendDropDown2 = false;
                $scope.receiveDropDown2 = false;
            });
            return;
        }
        if (input === 'receiveDropDown2') {
            $scope.$eval(function () {
                if (asset) {
                    $scope.multiMakeSwapSendAssetArray.forEach((row) => {
                        if (row.id !== asset.id) {
                            row.sendDropDown = false;
                            row.sendDropDown2 = false;
                            row.receiveDropDown = false;
                            row.receiveDropDown2 = false;
                        } else {
                            row.sendDropDown = false;
                            row.sendDropDown2 = false;
                            row.receiveDropDown = false;
                        }
                    });
                } else {
                    $scope.sendDropDown = false;
                    $scope.sendDropDown2 = false;
                    $scope.receiveDropDown = false;
                }
            });
            return;
        }
    };
    $scope.$watchGroup(['sendDropDown', 'sendDropDown2', 'receiveDropDown', 'receiveDropDown2'], function () {
        $scope.$eval(function () {
            $scope.searchSendAsset = '';
            $scope.searchReceiveAsset = '';
        });
    });


    let lastKnownTotalSwapsInQuery = 0;
    $scope.setPagination = async (currentPage, totalSwapsInQuery) => {
        if (totalSwapsInQuery !== undefined) {
            lastKnownTotalSwapsInQuery = totalSwapsInQuery;
        }
        if (totalSwapsInQuery == undefined) {
            totalSwapsInQuery = lastKnownTotalSwapsInQuery;
        }

        let endPage = Math.ceil(totalSwapsInQuery / 10) - 1;
        // Calculate shown rows
        let shownRows;
        if (currentPage === 0) {
            if (totalSwapsInQuery > 10) {
                shownRows = 10;
            } else {
                shownRows = totalSwapsInQuery;

            }
        } else {
            shownRows = (currentPage + 1) * 10;
            if (currentPage == endPage) {
                if (shownRows > totalSwapsInQuery) {
                    shownRows = totalSwapsInQuery;
                }
            }
        }

        $scope.$applyAsync(function () {
            if (totalSwapsInQuery) {
                $scope.totalRowsSwapsQuery = totalSwapsInQuery
                $scope.endPage = endPage;
            }
            ;
            $scope.shownRows = shownRows;
            $scope.currentPageInput = currentPage + 1;
        })
    }

    let swapList = {};
    $scope.allSwapsRunning = false;
    let allAssets = {};

    $scope.returnFromSwapsDatastructure = async (x) => {
        if (!x) return;
        try {
            await window.__fsnGetAllAssets().then(function (res) {
                allAssets = res;
            });
        } catch (err) {
            console.log(err);
        }

        let s = [];
        let amountOfAssets = 0;
        let leftOver = parseInt(x["size"]) / parseInt(x["SwapSize"]);
        let leftOverBN = new window.BigNumber(leftOver.toString());
        //   From Part
        if (Array.isArray(x.FromAssetID)) {
            amountOfAssets = x.FromAssetID.length;
            for (let i = 0; i < amountOfAssets; i++) {
                let fromVerifiedImage = "";
                let fromHasImage = false;
                let fromVerified = false;
                let data = {};
                // console.log(i);

                for (let a in window.verifiedAssetsImages) {
                    if (
                        window.verifiedAssetsImages[a].assetID ==
                        x.FromAssetID[i]
                    ) {
                        // Set matched image name
                        fromVerifiedImage = window.verifiedAssetsImages[a].image;
                        fromHasImage = true;
                        fromVerified = true;
                    } else if (
                        x.FromAssetID[i] ==
                        "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
                    ) {
                        // Set matched image name
                        fromVerifiedImage = "EFSN_LIGHT.svg";
                        fromHasImage = true;
                        fromVerified = true;
                    }
                }
                data.fromAssetId = x.FromAssetID[i];
                data.fromAssetSymbol = allAssets[x.FromAssetID[i]]["Symbol"];
                let formattedAmount = await $scope.returnFormattedAmount(x.MinFromAmount[i], allAssets[x.FromAssetID[i]]["Decimals"], x["SwapSize"], leftOverBN);
                data.fromAmount = formattedAmount.toString();
                data.fromAmountCut = +formattedAmount.toFixed(8);
                data.FromStartTime = x.FromStartTime[i];
                data.FromEndTime = x.FromEndTime[i];
                data.FromStartTimeString = $scope.returnDateString(
                    x.FromStartTime[i],
                    "Start"
                );
                data.FromEndTimeString = $scope.returnDateString(
                    x.FromEndTime[i],
                    "End"
                );
                data.fromVerifiedImage = fromVerifiedImage;
                data.fromHasImage = fromHasImage;
                data.fromVerified = fromVerified,
                    s.push(data);
            }
        }
        // console.log(s);
        return s;
    }
    $scope.returnToSwapsDatastructure = async (x) => {
        if (!x) return;
        try {
            await window.__fsnGetAllAssets().then(function (res) {
                allAssets = res;
            });
        } catch (err) {
            console.log(err);
        }

        let s = [];
        let amountOfAssets = 0;
        let leftOver = parseInt(x["size"]) / parseInt(x["SwapSize"]);
        let leftOverBN = new window.BigNumber(leftOver.toString());
        //   From Part
        if (Array.isArray(x.ToAssetID)) {
            amountOfAssets = x.ToAssetID.length;
            for (let i = 0; i < amountOfAssets; i++) {
                let toVerifiedImage = "";
                let toHasImage = false;
                let toVerified = false;
                let data = {};
                // console.log(i);

                for (let a in window.verifiedAssetsImages) {
                    if (
                        window.verifiedAssetsImages[a].assetID ==
                        x.ToAssetID[i]
                    ) {
                        // Set matched image name
                        toVerifiedImage = window.verifiedAssetsImages[a].image;
                        toHasImage = true;
                        toVerified = true;
                    } else if (
                        x.ToAssetID[i] ==
                        "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
                    ) {
                        // Set matched image name
                        toVerifiedImage = "EFSN_LIGHT.svg";
                        toHasImage = true;
                        toVerified = true;
                    }
                }
                data.toAssetId = x.ToAssetID[i];
                data.toAssetSymbol = allAssets[x.ToAssetID[i]]["Symbol"];
                let formattedAmount = await $scope.returnFormattedAmount(x.MinToAmount[i], allAssets[x.ToAssetID[i]]["Decimals"], x["SwapSize"], leftOverBN);
                data.toAmount = formattedAmount.toString();
                data.toAmountCut = +formattedAmount.toFixed(8);
                data.ToStartTime = x.ToStartTime[i];
                data.ToEndTime = x.ToEndTime[i];
                data.ToStartTimeString = $scope.returnDateString(
                    x.ToStartTime[i],
                    "Start"
                );
                data.ToEndTimeString = $scope.returnDateString(
                    x.ToEndTime[i],
                    "End"
                );
                data.toVerifiedImage = toVerifiedImage;
                data.toHasImage = toHasImage;
                data.toVerified = toVerified,
                    s.push(data);
            }
        }
        // console.log(s);
        return s;
    }

    $scope.returnFormattedAmount = async (minamount, decimals, swapsize, leftoverbn) => {
        // console.log(minamount, decimals, swapsize, leftoverbn);
        let minFromAmountBN = new window.BigNumber(minamount.toString());
        let fromAmountDec = $scope.countDecimals(decimals);
        let minFromAmountDecimalsBN = new window.BigNumber(fromAmountDec.toString());
        let minFromAmountFormattedBN = minFromAmountBN.div(minFromAmountDecimalsBN);
        let minFromSwapSizeBN = new window.BigNumber(swapsize);
        let minFromMaxAmountBN = minFromAmountFormattedBN.times(minFromSwapSizeBN);
        let minFromAmountFinal = leftoverbn.times(minFromMaxAmountBN);
        return minFromAmountFinal;
    }

    $scope.cachedAllSwapsPage = undefined;
    $scope.$watch('currentPage',function(){
        $scope.cachedAllSwapsPage = $scope.currentPage;
    })

    $scope.cachedAllSwapsPageRunning = false;

    $scope.allSwaps = async function (page, cache) {
        if (!page) page = 0;
        if (walletService.wallet !== null) {
            if ($scope.allSwapsRunning) {
                window.log(`allSwaps already running!`);
                return;
            }
            // $scope.swapsList = [];
            let swapList = [];
            let swapListFront = [];

            $scope.allSwapsRunning = true;

            if(cache){
                $scope.cachedAllSwapsPageRunning = true
            }
            let accountData = uiFuncs.getTxData($scope);
            let walletAddress = accountData.from;
            let totalSwapsInQuery;
            let size = 10;

            let url = `${window.getApiServer()}/swaps2/all?page=${page}&size=${size}&sort=desc&toAsset=${$scope.selectedSendContract}&fromAsset=${$scope.selectedReceiveContract}`

            if ($scope.selectedReceiveAsset == 'All Short Account Numbers') {
                // TO DO: customize query to limit to SANs only
                url = `${window.getApiServer()}/swaps2/all?page=${page}&size=${size}&sort=desc&toAsset=${$scope.selectedSendContract}`
            } else if ($scope.selectedReceiveAsset == 'All Assets') {
                url = `${window.getApiServer()}/swaps2/all?page=${page}&size=${size}&sort=desc&toAsset=${$scope.selectedSendContract}`
            }

            if ($scope.selectedSendAsset == 'All Assets' && $scope.selectedReceiveAsset == 'All Assets') {
                url = `${window.getApiServer()}/swaps2/all?page=${page}&size=${size}&sort=desc`
            }
            if ($scope.selectedSendContract == '-' && $scope.selectedReceiveContract == '-') {
                url = `${window.getApiServer()}/swaps2/all?page=${page}&size=${size}&sort=desc`
            }

            try {
                await ajaxReq.http.get(url).then(function (r) {
                    if (r.data[size]) {
                        if (r.data[size][0] !== undefined) {
                            totalSwapsInQuery = (r.data[size][0]["COUNT(*)"])
                        }
                        delete r.data[size];
                        if (page === 0) {
                            $scope.setPagination(page, totalSwapsInQuery);
                        } else {
                            $scope.setPagination(page);
                        }
                    }
                    for (let swap in r.data) {
                        if (r.data[swap].data) {
                            let data = JSON.parse(r.data[swap].data);
                            let fromAddress = r.data[swap]["fromAddress"];
                            swapList[data.SwapID] = data;
                            swapList[data.SwapID].Owner = fromAddress;
                            swapList[data.SwapID].size = r.data[swap].size;
                        }
                    }
                });
            } catch (err) {
                // console.log(err);
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
                // from
                if (!Array.isArray(swapList[asset]["FromAssetID"])) {
                    let a = [];
                    a.push(swapList[asset]["FromAssetID"]);
                    swapList[asset]["FromAssetID"] = a;
                }
                if (!Array.isArray(swapList[asset]["FromEndTime"])) {
                    let a = [];
                    a.push(swapList[asset]["FromEndTime"]);
                    swapList[asset]["FromEndTime"] = a;
                }
                if (!Array.isArray(swapList[asset]["FromStartTime"])) {
                    let a = [];
                    a.push(swapList[asset]["FromStartTime"]);
                    swapList[asset]["FromStartTime"] = a;
                }
                if (!Array.isArray(swapList[asset]["MinFromAmount"])) {
                    let a = [];
                    a.push(swapList[asset]["MinFromAmount"]);
                    swapList[asset]["MinFromAmount"] = a;
                }

                // to

                if (!Array.isArray(swapList[asset]["ToAssetID"])) {
                    let a = [];
                    a.push(swapList[asset]["ToAssetID"]);
                    swapList[asset]["ToAssetID"] = a;
                }
                if (!Array.isArray(swapList[asset]["ToEndTime"])) {
                    let a = [];
                    a.push(swapList[asset]["ToEndTime"]);
                    swapList[asset]["ToEndTime"] = a;
                }
                if (!Array.isArray(swapList[asset]["ToStartTime"])) {
                    let a = [];
                    a.push(swapList[asset]["ToStartTime"]);
                    swapList[asset]["ToStartTime"] = a;
                }
                if (!Array.isArray(swapList[asset]["MinToAmount"])) {
                    let a = [];
                    a.push(swapList[asset]["MinToAmount"]);
                    swapList[asset]["MinToAmount"] = a;
                }


                // console.log(swapList[asset]);
                let id = swapList[asset]["ID"];
                let owner = swapList[asset]["Owner"];
                let owned = false;
                let assetBalance = "";
                let fromVerifiedImage = "";
                let fromHasImage = false;
                let fromVerified = false;

                let fromAsset = allAssets[swapList[asset]["FromAssetID"][0]];
                let toAsset = allAssets[swapList[asset]["ToAssetID"][0]];

                if (fromAsset && toAsset) {
                    if (fromAsset.AssetID == $scope.DEFAULT_USAN) {
                        let swap = {};
                        await web3.fsn.getSwap(swapList[asset]["SwapID"]).then(function (r) {
                            swap = r;
                        });
                        let USAN = swap["Notation"];
                        fromAsset.Symbol = `USAN ${USAN}`;
                        fromAsset.Name = USAN;
                    }

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
                            fromVerifiedImage = "EFSN_LIGHT.svg";
                            fromHasImage = true;
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
                            toVerifiedImage = "EFSN_LIGHT.svg";
                            toHasImage = true;
                            toVerified = true;
                        }
                    }

                    owner === walletAddress ? (owned = true) : (owned = false);

                    let fromAmount =
                        swapList[asset].MinFromAmount[0] /
                        $scope.countDecimals(fromAsset.Decimals);

                    let toAmount =
                        swapList[asset].MinToAmount[0] / $scope.countDecimals(toAsset.Decimals);
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

                    let leftOver = parseInt(swapList[asset]["size"]) / parseInt(swapList[asset]["SwapSize"]);
                    let leftOverBN = new window.BigNumber(leftOver.toString());

                    // fromAmount
                    let minFromAmountBN = new window.BigNumber(swapList[asset]["MinFromAmount"][0].toString());
                    let fromAmountDec = $scope.countDecimals(fromAsset["Decimals"]);
                    let minFromAmountDecimalsBN = new window.BigNumber(fromAmountDec.toString());
                    let minFromAmountFormattedBN = minFromAmountBN.div(minFromAmountDecimalsBN);
                    let minFromSwapSizeBN = new window.BigNumber(swapList[asset]["SwapSize"]);
                    let minFromMaxAmountBN = minFromAmountFormattedBN.times(minFromSwapSizeBN);
                    let minFromAmountFinal = leftOverBN.times(minFromMaxAmountBN);

                    // toAmount
                    let minToAmountBN = new window.BigNumber(swapList[asset]["MinToAmount"][0].toString());
                    let toAmountDec = $scope.countDecimals(toAsset["Decimals"]);
                    let minToAmountDecimalsBN = new window.BigNumber(toAmountDec.toString());
                    let minToAmountFormattedBN = minToAmountBN.div(minToAmountDecimalsBN);
                    let minToSwapSizeBN = new window.BigNumber(swapList[asset]["SwapSize"]);
                    let minToMaxAmountBN = minToAmountFormattedBN.times(minToSwapSizeBN);
                    let minToAmountFinal = leftOverBN.times(minToMaxAmountBN);

                    let toAmountF = minToAmountFinal.toString();
                    let fromAmountF = minFromAmountFinal.toString();

                    let minimumswapopenmake =
                        fromAmountF / parseInt(swapList[asset]["SwapSize"]);

                    let data = {
                        id: swapListFront.length,
                        swap_id: swapList[asset]["SwapID"],
                        fromAssetId: swapList[asset]["FromAssetID"][0],
                        fromAssetSymbol: fromAsset["Symbol"],
                        fromAmount: fromAmountF,
                        fromAmountCut: +minFromAmountFinal.toFixed(8),
                        toAssetId: swapList[asset]["ToAssetID"][0],
                        toAmount: toAmountF,
                        toAmountCut: +minToAmountFinal.toFixed(8),
                        toAssetSymbol: toAsset["Symbol"],
                        swaprate: swapRate,
                        maxswaps: swapList[asset]["SwapSize"],
                        swapratetaker: swapratetaker,
                        minswap: minimumswap,
                        size: swapList[asset]["size"],
                        minswaptaker: minimumswaptaker,
                        minswapopenmake: minimumswapopenmake,
                        time: time.toLocaleString(),
                        timePosix: swapList[asset]["Time"],
                        timePosixValue: swapList[asset]["Time"] ? parseInt(swapList[asset]["Time"]) : "",
                        timeHours: timeHours,
                        targes: targes,
                        owner: swapList[asset]["Owner"],
                        owned: owned,
                        FromEndTime: swapList[asset]["FromEndTime"][0],
                        FromStartTime: swapList[asset]["FromStartTime"][0],
                        FromEndTimeString: $scope.returnDateString(
                            swapList[asset]["FromEndTime"][0],
                            "End"
                        ),
                        FromStartTimeString: $scope.returnDateString(
                            swapList[asset]["FromStartTime"][0],
                            "Start"
                        ),
                        ToEndTime: swapList[asset]["ToEndTime"][0],
                        ToStartTime: swapList[asset]["ToStartTime"][0],
                        ToEndTimeString: $scope.returnDateString(
                            swapList[asset]["ToEndTime"][0],
                            "End"
                        ),
                        ToStartTimeString: $scope.returnDateString(
                            swapList[asset]["ToStartTime"][0],
                            "Start"
                        ),
                        fromVerifiedImage: fromVerifiedImage,
                        fromHasImage: fromHasImage,
                        fromVerified: fromVerified,
                        toVerifiedImage: toVerifiedImage,
                        toHasImage: toHasImage,
                        toVerified: toVerified,

                        // multi-swap related
                        expand: false,
                        fromAssetsArray: await $scope.returnFromSwapsDatastructure(swapList[asset]),
                        toAssetsArray: await $scope.returnToSwapsDatastructure(swapList[asset]),
                    };
                    // console.log(data);
                    if (swapList[asset]["Targes"].length > 0) {
                        if (swapList[asset]["Targes"].includes(walletAddress)) {
                            await swapListFront.push(data)
                        }
                    } else if (swapList[asset]["Targes"].length === 0) {
                        await swapListFront.push(data);
                    }
                }
            }

            swapListFront = swapListFront.sort(function (a, b) {
                return b.timePosixValue - a.timePosixValue
            });

            await $scope.$applyAsync(function () {
                // console.log(swapListFront);
                $scope.swapsList = swapListFront;
                // sort according to timePosixValue
                $scope.showLoader = false;
            });

            console.log($scope.swapsList);
            $scope.allSwapsRunning = false;
            $scope.cachedAllSwapsPageRunning = false;
            window.log("Finished retrieving all Swaps");
        }
    };

    let takeSwapListRunning = false;
    $scope.takeSwapList = async function () {
        window.log("Starting retrieval of Private Swaps");
        if (takeSwapListRunning) {
            window.log("Private Swaps already running");
            return;
        }
        let swapList = {};
        takeSwapListRunning = true;

        $scope.openTakeSwapsTotal = 0;
        let openTakesList = [];
        if (walletService.wallet !== null) {
            let accountData = uiFuncs.getTxData($scope);
            let walletAddress = accountData.from;

            try {
                await ajaxReq.http.get(`${window.getApiServer()}/swaps2/all?target=${walletAddress}&page0&size=100`).then(function (r) {
                    console.log(r);
                    for (let swap in r.data) {
                        if (r.data[swap].data) {
                            let data = JSON.parse(r.data[swap].data);
                            swapList[data.SwapID] = data;
                            swapList[data.SwapID].size = r.data[swap].size;
                        }
                    }
                });
            } catch (err) {
                // console.log(err);
            }

            let allAssets = {};
            try {
                await window.__fsnGetAllAssets().then(function (res) {
                    allAssets = res;
                });
            } catch (err) {
                console.log(err);
            }
            let i = 0;

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

                if (fromAsset.AssetID == $scope.DEFAULT_USAN) {
                    let swap = {};
                    await web3.fsn.getSwap(swapList[asset]["SwapID"]).then(function (r) {
                        swap = r;
                    });
                    let USAN = swap["Notation"];
                    fromAsset.Symbol = `USAN ${USAN}`;
                    fromAsset.Name = USAN;
                }


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
                        fromVerifiedImage = "EFSN_LIGHT.svg";
                        fromHasImage = true;
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
                        toVerifiedImage = "EFSN_LIGHT.svg";
                        toHasImage = true;
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

                let leftOver = parseInt(swapList[asset]["size"]) / parseInt(swapList[asset]["SwapSize"]);
                let leftOverBN = new window.BigNumber(leftOver.toString());

                // fromAmount
                let minFromAmountBN = new window.BigNumber(swapList[asset]["MinFromAmount"].toString());
                let fromAmountDec = $scope.countDecimals(fromAsset["Decimals"]);
                let minFromAmountDecimalsBN = new window.BigNumber(fromAmountDec.toString());
                let minFromAmountFormattedBN = minFromAmountBN.div(minFromAmountDecimalsBN);
                let minFromSwapSizeBN = new window.BigNumber(swapList[asset]["SwapSize"]);
                let minFromMaxAmountBN = minFromAmountFormattedBN.times(minFromSwapSizeBN);
                let minFromAmountFinal = leftOverBN.times(minFromMaxAmountBN);

                // toAmount
                let minToAmountBN = new window.BigNumber(swapList[asset]["MinToAmount"].toString());
                let toAmountDec = $scope.countDecimals(toAsset["Decimals"]);
                let minToAmountDecimalsBN = new window.BigNumber(toAmountDec.toString());
                let minToAmountFormattedBN = minToAmountBN.div(minToAmountDecimalsBN);
                let minToSwapSizeBN = new window.BigNumber(swapList[asset]["SwapSize"]);
                let minToMaxAmountBN = minToAmountFormattedBN.times(minToSwapSizeBN);
                let minToAmountFinal = leftOverBN.times(minToMaxAmountBN);

                let toAmountF = minToAmountFinal.toString();
                let fromAmountF = minFromAmountFinal.toString();

                let minimumswapopenmake =
                    fromAmountF / parseInt(swapList[asset]["SwapSize"]);

                let data = {
                    id: i,
                    swap_id: swapList[asset]["SwapID"],
                    fromAssetId: swapList[asset]["FromAssetID"],
                    fromAssetSymbol: fromAsset["Symbol"],
                    fromAmount: fromAmountF,
                    fromAmountCut: +minFromAmountFinal.toFixed(8),
                    toAssetId: swapList[asset]["ToAssetID"],
                    toAmount: toAmountF,
                    toAmountCut: +minToAmountFinal.toFixed(8),
                    toAssetSymbol: toAsset["Symbol"],
                    swaprate: swapRate,
                    maxswaps: swapList[asset]["SwapSize"],
                    swapratetaker: swapratetaker,
                    minswap: minimumswap,
                    minswaptaker: minimumswaptaker,
                    minswapopenmake: minimumswapopenmake,
                    time: time.toLocaleString(),
                    size: swapList[asset]["size"],
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
                    toVerified: toVerified,

                    // multi-swap related
                    expand: false,
                    fromAssetsArray: [],
                    toAssetsArray: [],
                };

                if (swapList[asset]["Targes"].includes(walletAddress)) {
                    await openTakesList.push(data);
                    i++;
                    $scope.openTakeSwapsTotal++;
                }
            }
        }

        $scope.$eval(function () {
            $scope.openTakeSwaps = openTakesList;
            $scope.openTakeSwapsTotal = $scope.openTakeSwapsTotal;
        })
        takeSwapListRunning = false;
    }


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

    $scope.convertTimePosixToNumber = function (asset) {
        return parseInt(asset.timePosix);
    };
};
module.exports = ensCtrl;
