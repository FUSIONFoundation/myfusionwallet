'use strict';

var sendTxCtrl = function ($scope, $sce, walletService, $rootScope) {

    web3.eth.subscribe('newBlockHeaders', function () {
        $scope.getAllFsnAssets();
        $scope.getTimeLockAssets();
    });

    let nu = localStorage.getItem(window.cookieName)
    let cookieData = nu ? JSON.parse(nu) : {}
    let _CHAINID = window.defaultChainId;

    if (cookieData.chainid !== "") {
        _CHAINID = cookieData.chainid;
    }

    $scope.showAllAssets = true;
    $scope.showTimeLockedAssets = false;
    $scope.assetCreate = {'assetHash': '', 'errorMessage': ''};
    $scope.assetListOwns = [];
    $scope.assetListLoading = true;
    $scope.showNoAssets = false;
    $scope.selectedAssetBalance = '';
    $scope.todayDate = formatDate();
    $scope.tx = {};
    $scope.signedTx = '';
    $scope.ajaxReq = ajaxReq;
    $scope.unitReadable = ajaxReq.type;
    $scope.timeLockToAssetId = '';
    $scope.sendTxModal = new Modal(document.getElementById('sendTransaction'));
    $scope.sendAssetModal = new Modal(document.getElementById('sendAsset'));
    $scope.sendAssetConfirm = new Modal(document.getElementById('sendAssetConfirm'));
    $scope.sendAssetFinal = new Modal(document.getElementById('sendAssetFinal'));
    $scope.createAssetModal = new Modal(document.getElementById('createAsset'));
    $scope.createAssetFinal = new Modal(document.getElementById('createAssetFinal'));
    $scope.createAssetAttributes = new Modal(document.getElementById('createAssetAttributes'));
    $scope.createAssetReview = new Modal(document.getElementById('createAssetReview'));
    $scope.sendBackToAssetsModal = new Modal(document.getElementById('sendBackToAssetsModal'));
    $scope.changeSupplyReview = new Modal(document.getElementById('changeSupplyReview'));
    $scope.changeSupplySuccess = new Modal(document.getElementById('changeSupplySuccess'));
    $scope.manageAsset = new Modal(document.getElementById('manageAsset'));
    $scope.changeSupply = new Modal(document.getElementById('changeSupply'));
    $scope.errorModal = new Modal(document.getElementById('errorModal'));
    $scope.successModal = new Modal(document.getElementById('successModal'));
    $scope.totalAttributes = [0];
    $scope.attributename = [];
    $scope.attributevalue = [];
    $scope.allAttributes = {};

    $scope.currentPage = 0;
    $scope.pageSize = 10;
    $scope.endPage = 0;
    $scope.shownRows = 0;
    $scope.nextPage = function () {
        if ($scope.currentPage !== $scope.endPage - 1) {
            $scope.$eval(function () {
                $scope.currentPage = $scope.currentPage + 1
                $scope.searchTimeLock = '';
            })
        }
        if (($scope.currentPage + 1) * $scope.pageSize > $scope.timeLockList.length) {
            $scope.$eval(function () {
                $scope.shownRows = $scope.timeLockList.length;
                $scope.searchTimeLock = '';
            })
        } else {
            $scope.$eval(function () {
                $scope.shownRows = ($scope.currentPage + 1) * $scope.pageSize;
                $scope.searchTimeLock = '';
            })
        }
    }
    $scope.firstPage = function () {
        $scope.$eval(function () {
            $scope.currentPage = 0
            $scope.searchTimeLock = '';
        })
        if (($scope.currentPage + 1) * $scope.pageSize > $scope.timeLockList.length) {
            $scope.$eval(function () {
                $scope.shownRows = $scope.timeLockList.length;
                $scope.searchTimeLock = '';
            })
        } else {
            $scope.$eval(function () {
                $scope.shownRows = ($scope.currentPage + 1) * $scope.pageSize;
                $scope.searchTimeLock = '';
            })
        }
    }
    $scope.lastPage = function () {
        $scope.$eval(function () {
            $scope.currentPage = $scope.endPage - 1;
            $scope.searchTimeLock = '';
        })
        if (($scope.currentPage + 1) * $scope.pageSize > $scope.timeLockList.length) {
            $scope.$eval(function () {
                $scope.shownRows = $scope.timeLockList.length;
                $scope.searchTimeLock = '';
            })
        } else {
            $scope.$eval(function () {
                $scope.shownRows = ($scope.currentPage + 1) * $scope.pageSize;
                $scope.searchTimeLock = '';
            })
        }
    }

    $scope.previousPage = function () {
        if ($scope.currentPage !== 0) {
            $scope.$eval(function () {
                $scope.currentPage = $scope.currentPage - 1
                $scope.searchTimeLock = '';
            })
        }
        if (($scope.currentPage + 1) * $scope.pageSize > $scope.timeLockList.length) {
            $scope.$eval(function () {
                $scope.shownRows = $scope.timeLockList.length;
                $scope.searchTimeLock = '';
            })
        } else {
            $scope.$eval(function () {
                $scope.shownRows = ($scope.currentPage + 1) * $scope.pageSize;
                $scope.searchTimeLock = '';
            })
        }
    }

    $scope.$watch('timeLockList', function () {
        if (typeof $scope.timeLockList === 'undefined') {
            return;
        } else {
            $scope.$eval(function () {
                $scope.endPage = Math.ceil($scope.timeLockList.length / $scope.pageSize);
            })
        }
    })

    $scope.$watch('timeLockList', function () {
        if (typeof $scope.timeLockList === 'undefined') {
            return;
        }
        if ($scope.currentPage == 0) {
            $scope.$eval(function () {
                $scope.shownRows = $scope.currentPage + 1 * $scope.pageSize;
            })
        }
        let shownRows = 0;
        if (($scope.currentPage + 1) * $scope.pageSize > $scope.timeLockList.length) {
            shownRows = $scope.timeLockList.length;
        } else {
            shownRows = ($scope.currentPage + 1) * $scope.pageSize;
        }
        $scope.$eval(function () {
            $scope.shownRows = shownRows;
        })
    })

    $scope.wallet = walletService.wallet;

    $scope.addAttribute = function () {
        let max = $scope.totalAttributes.reduce(function (a, b) {
            return Math.max(a, b);
        });

        $scope.totalAttributes.push(max + 1);
        $scope.checkAllAttributesLength()
        return;
    }

    $scope.removeAttribute = function () {
        if ($scope.totalAttributes.length == 1) return;
        let max = $scope.totalAttributes.reduce(function (a, b) {
            return Math.max(a, b);
        });
        let filtered = $scope.totalAttributes.filter(item => item !== max);
        $scope.totalAttributes = filtered;
        console.log($scope.totalAttributes)
        $scope.checkAllAttributesLength();
        return;
    }

    $scope.returnAttributesJSON = function () {
        $scope.allAttributes = {};
        for (let u in $scope.attributename) {
            if ($scope.attributename[u] == "") {
                return
            }
            ;
            $scope.allAttributes[$scope.attributename[u].toString()] = $scope.attributevalue[u].toString();
        }
        return $scope.allAttributes;
    }

    $scope.lastId = 0;
    $scope.verifiedAssetsImages = {};


    $scope.hiddenTimeLockStates = localStorage.getItem('hiddenTimeLocks') ? JSON.parse(localStorage.getItem('hiddenTimeLocks')) : [];
    $scope.months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    let timeLockListSave = [];
    let BN = web3.utils.BN;


    function formatDate() {
        let d = new Date(),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-');
    }


    $scope.showAdvance = $rootScope.rootScopeShowRawTx = false;
    $scope.dropdownEnabled = true;
    $scope.Validator = Validator;
    $scope.gasLimitChanged = false;
    $scope.tx.readOnly = globalFuncs.urlGet('readOnly') == null ? false : true;
    var currentTab = $scope.globalService.currentTab;
    var tabs = $scope.globalService.tabs;
    $scope.tokenTx = {
        to: '',
        value: 0,
        id: -1
    };
    $scope.customGasMsg = '';

    $scope.customGas = CustomGasMessages;

    $scope.tx = {
        // if there is no gasLimit or gas key in the URI, use the default value. Otherwise use value of gas or gasLimit. gasLimit wins over gas if both present
        gasLimit: globalFuncs.urlGet('gaslimit') != null || globalFuncs.urlGet('gas') != null ? globalFuncs.urlGet('gaslimit') != null ? globalFuncs.urlGet('gaslimit') : globalFuncs.urlGet('gas') : globalFuncs.defaultTxGasLimit,
        data: globalFuncs.urlGet('data') == null ? "" : globalFuncs.urlGet('data'),
        to: globalFuncs.urlGet('to') == null ? "" : globalFuncs.urlGet('to'),
        unit: "ether",
        value: globalFuncs.urlGet('value') == null ? "" : globalFuncs.urlGet('value'),
        nonce: null,
        gasPrice: globalFuncs.urlGet('gasprice') == null ? null : globalFuncs.urlGet('gasprice'),
        donate: false,
        tokensymbol: globalFuncs.urlGet('tokensymbol') == null ? false : globalFuncs.urlGet('tokensymbol'),
    }

    $scope.checkDecimalsValue = function () {
        if ($scope.assetCreate.decimals == '') {
            return;
        }
        let reg = new RegExp('^\\d+$');
        if (!reg.test($scope.assetCreate.decimals)) {
            $scope.$eval(function () {
                $scope.assetCreate.decimals = ''
            });
            return;
        }

        if (parseInt($scope.assetCreate.decimals) > 15) {
            $scope.$eval(function () {
                $scope.assetCreate.decimals = 15
            });
            return;
        }
        if (parseInt($scope.assetCreate.decimals) < 1) {
            $scope.$eval(function () {
                $scope.assetCreate.decimals = 0
            });
            return;
        }
    }

    $scope.checkAllAttributesLength = function () {
        $scope.returnAttributesJSON();
        if ($scope.allAttributes == {}) {
            return;
        }

        // Get how many fields there are since each attribute field consumes 7 chars
        let maxChars = 1024;
        let reservedChars = $scope.totalAttributes.length * 7;
        $scope.usableChars = maxChars - reservedChars;

        let a = JSON.stringify($scope.allAttributes);
        $scope.usedChars = a.length;
        let percentage = $scope.usedChars / $scope.usableChars;
        if (percentage > 0.75 && percentage < 1) {
            $scope.$eval(function () {
                $scope.showMaxCharacters = true
            })
        } else {
            $scope.$eval(function () {
                $scope.showMaxCharacters = false
            })
        }
        ;
    }

    $scope.verifyWalletAddress = async function () {
        $scope.$eval(function () {
            $scope.validWalletAddress = false;
            $scope.walletAddressError = false;
            $scope.checkingUSAN = false;
        })

        let address = $scope.sendAsset.toAddress;

        if (address == "" || address.length == 1) {
            $scope.$eval(function () {
                $scope.validWalletAddress = false;
                $scope.walletAddressError = false;
                $scope.checkingUSAN = false;
            })
            return;
        }

        if (address.length == 42 && address.slice(0, 2) == "0x") {
            if (web3.utils.isAddress(address)) {
                $scope.$eval(function () {
                    $scope.validWalletAddress = true;
                    $scope.walletAddressError = false;
                })
                return;
            } else {
                $scope.$eval(function () {
                    $scope.walletAddressError = true;
                    $scope.validWalletAddress = false;
                })
                return;
            }
        }

        if (address.length < 42 && address.match(/^[0-9]+$/) != null) {
            $scope.$eval(function () {
                $scope.walletAddressError = false;
                $scope.checkingUSAN = true;
            })
            try {
                let addr = '';
                await web3.fsn.getAddressByNotation(parseInt(address)).then(function (res) {
                    addr = res;
                })
                if (web3.utils.isAddress(addr)) {
                    $scope.$eval(function () {
                        $scope.walletAddressError = false;
                        $scope.validWalletAddress = true;
                        $scope.checkingUSAN = false;
                    })
                    return;
                }
                return;
            } catch (err) {
                $scope.$eval(function () {
                    $scope.walletAddressError = true;
                    $scope.validWalletAddress = false;
                    $scope.checkingUSAN = false;
                })
                return;
            }
        }

        $scope.$eval(function () {
            $scope.walletAddressError = true;
            $scope.validWalletAddress = false;
            $scope.checkingUSAN = false;
        })
    }

    $scope.manageAssetOpen = async function (id) {
        $scope.lastId = id;
        $scope.showAttributes = false;

        let description = $scope.assetListOwns[id].description;

        let urlconditions = ["http://", "https://", "ws://"];

        let hasUrlCondition = urlconditions.some(el => $scope.assetListOwns[id].description.toString().includes(el));

        if (Validator.isJSON(description)) {
            description = $scope.assetListOwns[id].description;
        }
        if (!Validator.isJSON(description) && hasUrlCondition) {
            description = {
                "URL": $scope.assetListOwns[id].description.toString()
            }
        }

        if (Object.keys(description).length === 0) {
            $scope.$eval(function () {
                $scope.showNoAvailableAttributes = true;
            })
        } else {
            $scope.$eval(function () {
                $scope.showNoAvailableAttributes = false;
            })
        }

        $scope.$eval(function () {
            $scope.manageAssetInfo = {
                "name": $scope.assetListOwns[id].name,
                "symbol": $scope.assetListOwns[id].symbol,
                "decimals": $scope.assetListOwns[id].decimals,
                "total": $scope.assetListOwns[id].total,
                "contractaddress": $scope.assetListOwns[id].contractaddress,
                "canChange": $scope.assetListOwns[id].canChange,
                "owner": $scope.assetListOwns[id].owner,
                "balance": $scope.assetListOwns[id].balance,
                "issuer": $scope.assetListOwns[id].issuer,
                "image": $scope.assetListOwns[id].image,
                "hasImage": $scope.assetListOwns[id].hasImage,
                "verified": $scope.assetListOwns[id].verified,
                "description": description,
            };
        })
        $scope.manageAsset.open();
    }

    $scope.getVerifiedAssets = async function () {
        try {
            await ajaxReq.http.get('https://api.fusionnetwork.io/assets/verified').then(function (r) {
                $scope.verifiedAssetsImages = r.data;
            })
        } catch (err) {
            return;
        }
    }

    $scope.changeSupplyOpen = async function (id) {
        if (id === undefined || id == "") {
            id = $scope.lastId
        } else {
            $scope.lastId = id;
        }

        $scope.$eval(function () {
            $scope.newTotalSupply = $scope.assetListOwns[id].total;
            $scope.transacData = '';
        })

        let distributed = $scope.assetListOwns[$scope.lastId].total - $scope.assetListOwns[$scope.lastId].balance;

        $scope.changeSupplyInfo = {
            "name": $scope.assetListOwns[$scope.lastId].name,
            "symbol": $scope.assetListOwns[$scope.lastId].symbol,
            "decimals": $scope.assetListOwns[$scope.lastId].decimals,
            "total": $scope.assetListOwns[$scope.lastId].total,
            "contractaddress": $scope.assetListOwns[$scope.lastId].contractaddress,
            "canChange": $scope.assetListOwns[$scope.lastId].canChange,
            "owner": $scope.assetListOwns[$scope.lastId].owner,
            "balance": $scope.assetListOwns[$scope.lastId].balance,
            "issuer": $scope.assetListOwns[$scope.lastId].issuer,
            "image": $scope.assetListOwns[$scope.lastId].image,
            "hasImage": $scope.assetListOwns[$scope.lastId].hasImage,
            "distributed": distributed,
            "txhash": ""
        };

        $scope.changeSupply.open();
    }

    $scope.changeSupplyReviewOpen = function () {
        let totalBN = new BigNumber($scope.assetListOwns[$scope.lastId].total);
        let newtsBN = new BigNumber($scope.newTotalSupply.toString());

        if (newtsBN > totalBN) {
            $scope.incDecr = '+'
            $scope.changeSupplyState = 'increment';
        } else {
            $scope.incDecr = '';
            $scope.changeSupplyState = 'decrement';
        }
        ;
        let diffBN = newtsBN.sub(totalBN);

        $scope.$eval(function () {
            $scope.totalSupplyDiff = $scope.incDecr + diffBN.toString();
        })

        $scope.changeSupplyReview.open();
    }

    $scope.changeSupplyTx = async function () {
        let data = {};
        let asset = $scope.assetListOwns[$scope.lastId];

        let accountData = uiFuncs.getTxData($scope);
        let walletAddress = accountData.from;

        if (!$scope.account && ($scope.wallet.hwType !== "ledger") && ($scope.wallet.hwType !== "trezor")) {
            $scope.account = web3.eth.accounts.privateKeyToAccount($scope.toHexString($scope.wallet.getPrivateKey()));
        }


        if ($scope.changeSupplyState == 'increment') {
            // Get New Total Supply, create BN and create Hexadecimal
            let newTotalSupplyBN = new BigNumber($scope.newTotalSupply);
            let currentTotalBN = new BigNumber($scope.assetListOwns[$scope.lastId].total);
            let bal = newTotalSupplyBN.minus(currentTotalBN);
            let newtotalSupplyString = bal.toString();
            let newtotalSupplyBN = $scope.makeBigNumber(newtotalSupplyString, asset.decimals);
            let newtotalSupplyBNHex = "0x" + newtotalSupplyBN.toString(16);

            data = {
                "asset": asset.contractaddress,
                "from": walletAddress,
                "to": walletAddress,
                "value": newtotalSupplyBNHex,
                "transacData": $scope.transacData
            }
            try {
                await web3.fsntx.buildIncAssetTx(data).then((tx) => {
                    tx.chainId = _CHAINID;
                    data = tx;
                    if ($scope.wallet.hwType == "ledger" || $scope.wallet.hwType == "trezor") {
                        return;
                    } else {
                        return web3.fsn.signAndTransmit(tx, $scope.account.signTransaction).then(txHash => {
                            console.log(txHash);
                            $scope.$apply(function () {
                                $scope.changeSupplyInfo.txhash = txHash;
                            })
                            $scope.changeSupplySuccess.open();
                        })
                    }
                });
            } catch (err) {
                console.log("buildIncAssetTx", err);
                $scope.errorModal.open();
                $scope.$eval(function () {
                    $scope.errorMessage = err.message;
                })
            }
        }
        if ($scope.changeSupplyState == 'decrement') {
            // Get New Total Supply, create BN and create Hexadecimal
            let bal = $scope.assetListOwns[$scope.lastId].total - $scope.newTotalSupply;
            let newtotalSupplyString = bal.toString();
            let newtotalSupplyBN = $scope.makeBigNumber(newtotalSupplyString, asset.decimals);
            let newtotalSupplyBNHex = "0x" + newtotalSupplyBN.toString(16);

            data = {
                "asset": asset.contractaddress,
                "from": walletAddress,
                "to": walletAddress,
                "value": newtotalSupplyBNHex,
                "transacData": $scope.transacData
            }
            try {
                await web3.fsntx.buildDecAssetTx(data).then((tx) => {
                    tx.chainId = _CHAINID;
                    data = tx;
                    if ($scope.wallet.hwType == "ledger" || $scope.wallet.hwType == "trezor") {
                        return;
                    } else {
                        return web3.fsn.signAndTransmit(tx, $scope.account.signTransaction).then(txHash => {
                            console.log(txHash)
                            $scope.$apply(function () {
                                $scope.changeSupplyInfo.txhash = txHash;
                            })
                            $scope.changeSupplySuccess.open();
                        })
                    }
                });
            } catch (err) {
                console.log("buildDecAssetTx", err);
                $scope.errorModal.open();
                $scope.$eval(function () {
                    $scope.errorMessage = err.message;
                })
            }
        }
        if ($scope.wallet.hwType == "ledger") {
            let ledgerConfig = {
                privKey: $scope.wallet.privKey ? $scope.wallet.getPrivateKeyString() : "",
                path: $scope.wallet.getPath(),
                hwType: $scope.wallet.getHWType(),
                hwTransport: $scope.wallet.getHWTransport()
            }
            let rawTx = data;
            console.log(rawTx);
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
                            console.log(txHash);
                            $scope.$apply(function () {
                                $scope.changeSupplyInfo.txhash = txHash;
                            })
                            $scope.changeSupplySuccess.open();
                        })
                    })
                }
                $scope.notifier.info('Please, confirm transaction on Ledger.');
                await app.getAppConfiguration(localCallback);
            }

            if ($scope.wallet.hwType == "trezor") {
            }
        }

    }


    $scope.setSendMode = function (sendMode, tokenId = '', tokensymbol = '') {
        $scope.tx.sendMode = sendMode;
        $scope.unitReadable = '';
        if (globalFuncs.urlGet('tokensymbol') != null) {
            $scope.unitReadable = $scope.tx.tokensymbol;
            $scope.tx.sendMode = 'token';
        } else if (sendMode == 'ether') {
            $scope.unitReadable = ajaxReq.type;
        } else {
            $scope.unitReadable = tokensymbol;
            $scope.tokenTx.id = tokenId;
        }
        $scope.dropdownAmount = false;
    }


    var applyScope = function () {
        if (!$scope.$$phase) $scope.$apply();
    }

    var defaultInit = function () {
        $scope.gasLimitChanged = globalFuncs.urlGet('gaslimit') != null ? true : false;
        $scope.showAdvance = globalFuncs.urlGet('gaslimit') != null || globalFuncs.urlGet('gas') != null || globalFuncs.urlGet('data') != null;
        if (globalFuncs.urlGet('data') || globalFuncs.urlGet('value') || globalFuncs.urlGet('to') || globalFuncs.urlGet('gaslimit') || globalFuncs.urlGet('sendMode') || globalFuncs.urlGet('gas') || globalFuncs.urlGet('tokensymbol')) $scope.hasQueryString = true // if there is a query string, show an warning at top of page
    }
    $scope.$watch(function () {
        if (walletService.wallet == null) return null;
        return walletService.wallet.getAddressString();
    }, function () {
        if (walletService.wallet == null) return;
        $scope.wallet = walletService.wallet;
        $scope.wd = true;

        // $scope.setTokenSendMode();
        defaultInit();
    });

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


    var isEnough = function (valA, valB) {
        return new BigNumber(valA).lte(new BigNumber(valB));
    }

    $scope.hasEnoughBalance = function () {
        if ($scope.wallet.balance == 'loading') return false;
        return isEnough($scope.tx.value, $scope.wallet.balance);
    }

    $scope.countDecimals = function (decimals) {
        let returnDecimals = '1';
        for (let i = 0; i < decimals; i++) {
            returnDecimals += '0';
        }
        return parseInt(returnDecimals);
    }

    $scope.sendAssetModalConfirm = async function (asset) {
        let fromTimeString = new Date($scope.sendAsset.fromTime);
        let tillTimeString = new Date($scope.sendAsset.tillTime);

        var fMonth = fromTimeString.getMonth();
        var fDay = fromTimeString.getDate();
        var fYear = fromTimeString.getFullYear();
        var tMonth = tillTimeString.getMonth();
        var tDay = tillTimeString.getDate();
        var tYear = tillTimeString.getFullYear();

        let startTime = $scope.months[fMonth] + ' ' + fDay + ', ' + fYear;
        let endTime = $scope.months[tMonth] + ' ' + tDay + ', ' + tYear;

        await web3.fsn.getAsset(asset).then(function (res) {
            $scope.$eval(function () {
                $scope.sendAsset.assetName = res["Name"];
                $scope.sendAsset.assetSymbol = res["Symbol"];
                $scope.sendAsset.assetHash = asset;
                $scope.sendAsset.fromTimeString = startTime;
                $scope.sendAsset.tillTimeString = endTime;
            });
            if (res) {
                $scope.sendAssetConfirm.open();
            }
        });
    }

    $scope.checkDate = function () {
        let today = new Date();
        if ($scope.sendAsset.tillTime < today) {
            $scope.$eval(function () {
                $scope.sendAsset.tillTime = today;
            })
        }
        if ($scope.sendAsset.tillTime < $scope.sendAsset.fromTime) {
            $scope.$eval(function () {
                $scope.sendAsset.fromTime = today;
            })
        }
    }


    $scope.checkDateWithForever = function () {
        let today = new Date();
        if ($scope.sendAsset.tillTime < today) {
            $scope.$eval(function () {
                $scope.sendAsset.tillTime = today;
            })
        }
        if ($scope.transactionType !== "scheduled") {
            if ($scope.sendAsset.tillTime < $scope.sendAsset.fromTime) {
                $scope.$eval(function () {
                    $scope.sendAsset.fromTime = today;
                })
            }
        }
    }

    $scope.checkTotalSupply = function () {
        if (typeof $scope.assetCreate.totalSupply === "undefined") {
            return;
        }
        if (parseInt($scope.assetCreate.totalSupply) < 100000000000000000) {
            return;
        }
        let a = new BN($scope.assetCreate.totalSupply.toString());
        if (a.toString() > "100000000000000000") {
            $scope.$eval(function () {
                $scope.assetCreate.totalSupply = 99999999999999999;
            })
        }
    }

    $scope.sendAssetModalOpen = async function (id, timelockonly) {
        $scope.$eval(function(){$scope.sendAssetDisabled = false});
        let asset = $scope.assetToSend;
        let accountData = uiFuncs.getTxData($scope);
        let walletAddress = accountData.from;
        let assetBalance = '';
        let decimals = '';

        $scope.$eval(function () {
            $scope.walletAddressError = false;
            $scope.validWalletAddress = false;
            $scope.checkingUSAN = false;
        })

        if (!id && !timelockonly) {
            $scope.$eval(function () {
                $scope.sendAsset.fromTime = '';
                $scope.sendAsset.tillTime = '';
            })
        }

        if (asset !== undefined) {
            await web3.fsn.getAsset(asset).then(function (res) {
                decimals = res["Decimals"];
            });

            await web3.fsn.getBalance(asset, walletAddress).then(function (res) {
                assetBalance = res;
            });

            let balance = parseInt(assetBalance) / $scope.countDecimals(decimals);

            $scope.$eval(function () {
                $scope.selectedAssetBalance = balance;
            });
        }

        $scope.$eval(function () {
            $scope.showStaticTimeLockAsset = false;
        })
        if (id >= 0 && timelockonly == true) {
            let assetData = $scope.timeLockList[id];
            $scope.$eval(function () {
                $scope.assetToSend = assetData.asset;
                $scope.assetName = assetData.name;
                $scope.timeLockStartTime = assetData.startTime;
                $scope.timeLockEndTime = assetData.endTime;
                $scope.timeLockStartTimePosix = assetData.posixStartTime;
                $scope.timeLockEndTimePosix = assetData.posixEndTime;
                $scope.selectedAssetBalance = assetData.value;
                $scope.showStaticAsset = true;
            })
        } else {
            $scope.$eval(function () {
                $scope.showStaticTimeLockAsset = false;
                $scope.showStaticAsset = false;
            })
        }
        if (id >= 0 && timelockonly == false) {

            let assetData = $scope.assetListOwns[id];
            $scope.$eval(function () {
                $scope.showStaticTimeLockAsset = false;
                $scope.assetToSend = assetData.contractaddress;
                $scope.assetName = assetData.name;
                $scope.showStaticAsset = true;
                $scope.getAssetBalance();
            })
        } else {
            $scope.$eval(function () {
                $scope.showStaticAsset = false;
            })
        }

        $scope.sendAssetModal.open();
        $scope.$applyAsync(function () {
            if (timelockonly == true) {
                $scope.showStaticAsset = true;
                $scope.showStaticTimeLockAsset = true;

            } else {
                $scope.showStaticTimeLockAsset = false;
            }
            $scope.sendAsset.toAddress = '';
            $scope.sendAsset.amountToSend = '';
            $scope.transactionType = 'none';
            $scope.successMessagebool = false;
        });
    }

    function convertDate(inputFormat) {
        function pad(s) {
            return (s < 10) ? '0' + s : s;
        }

        var d = new Date(inputFormat);
        return [d.getUTCFullYear(), pad(d.getUTCMonth() + 1), pad(d.getUTCDate())].join('-');
    }

    function getHexDate(d) {
        return "0x" + (new Date(d).getTime() / 1000).toString(16);
    }

    $scope.createAssetHasError = false;
    $scope.createAssetErrorHandler = function () {
        // Asset name
        if ($scope.assetCreate.assetName === '' || $scope.assetCreate.assetName.length > 35) {
            $scope.createAssetHasError = true;
            return;
        }
        // Asset Symbol
        if ($scope.assetCreate.assetSymbol === '' || $scope.assetCreate.assetSymbol.length > 4) {
            $scope.createAssetHasError = true;
            return;
        }
        // Asset Decimals
        if ($scope.assetCreate.decimals > 15) {
            $scope.createAssetHasError = true;
            return;
        }
        // Total Supply
        if ($scope.assetCreate.totalSupply === '' || $scope.assetCreate.totalSupply <= 0) {
            $scope.createAssetHasError = true;
            return;
        }
        $scope.createAssetHasError = false;
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


        let balance = new BN(assetBalance) / $scope.countDecimals(decimals);

        $scope.$apply(function () {
            $scope.selectedAssetBalance = balance;
        });
    }

    $scope.formatWei = function (val) {
        if (typeof val === 'object') {
            val = val.toString()
        }
        let len = val.length;
        if (len < 18) {
            val = "0".repeat(18 - len) + val
            len = 18
        }
        if (len === 18) {
            val = "." + val
        } else {
            val = $scope.insert(val, val.length - 18, ".")
        }

        val = $scope.removeZeros(val, true, true, true)

        if (val.charAt(0) === '.') {
            return "0" + val;
        }
        if (val.length === 0) {
            return 0
        }
        return val;
    }

    $scope.removeZeros = function (val, trailing = true, leading = false, decimal = true) {
        var regEx1 = /^[0]+/;
        var regEx2 = /[0]+$/;
        var regEx3 = /[.]$/;

        var before = "";
        var after = "";

        before = val;

        if (leading) {
            after = before.replace(regEx1, ""); // Remove leading 0's
        } else {
            after = before;
        }
        if (trailing) {
            if (after.indexOf(".") > -1) {
                after = after.replace(regEx2, ""); // Remove trailing 0's
            }
        }
        if (decimal) {
            after = after.replace(regEx3, ""); // Remove trailing decimal
        }
        return after;
    }

    $scope.insert = function (str, index, value) {
        return str.substr(0, index) + value + str.substr(index);
    }

    $scope.setMaxBalance = async function () {
        if ($scope.assetToSend == '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff') {
            let a = $scope.selectedAssetBalance.toString();

            let amount = $scope.makeBigNumber(a, 18);

            let gasPrice = await web3.eth.getGasPrice().then(function (res) {
                let gs = (res * 3).toString();
                return new BigNumber(gs);
            })

            console.log(amount.toString());
            console.log(gasPrice.toString());

            amount = amount.sub(gasPrice);

            console.log($scope.formatWei(amount.toString()));

            $scope.sendAsset.amountToSend = $scope.formatWei(amount.toString());
        } else {
            $scope.sendAsset.amountToSend = $scope.selectedAssetBalance;
        }
    }


    $scope.toHexString = function (byteArray) {
        var s = '0x';
        byteArray.forEach(function (byte) {
            s += ('0' + (byte & 0xFF).toString(16)).slice(-2);
        });
        return s;
    }

    $scope.sendBackToAssets = async function (id) {
        let tlData = $scope.timeLockList[id];

        $scope.sendAsset.assetName = tlData.name;
        $scope.sendAsset.assetSymbol = tlData.symbol;
        $scope.assetToSend = tlData.asset;
        $scope.selectedAssetBalance = tlData.value;
        $scope.timeLockToAssetId = tlData.id;

        $scope.$eval(function () {
            $scope.timeLockToAssetId = tlData.id;
        })

        $scope.sendBackToAssetsModal.open();
    }

    $scope.sendBackToAssetsFunction = async function (id) {
        let accountData = uiFuncs.getTxData($scope);
        id = $scope.timeLockToAssetId;
        let tlData = $scope.timeLockList[id];

        let from = accountData.from;

        if (!$scope.account && ($scope.wallet.hwType !== "ledger") && ($scope.wallet.hwType !== "trezor")) {
            $scope.account = web3.eth.accounts.privateKeyToAccount($scope.toHexString($scope.wallet.getPrivateKey()));
        }

        let startTime = web3.utils.numberToHex(tlData.posixStartTime);
        let endTime = web3.utils.numberToHex(tlData.posixEndTime);

        // JavaScript / Go incompatibility -1 error
        if (tlData.posixEndTime === 18446744073709552000) {
            endTime = web3.fsn.consts.TimeForeverStr;
        }

        let data = {};

        try {
            await web3.fsntx.buildTimeLockToAssetTx({
                asset: tlData.asset,
                from: from,
                to: from,
                start: startTime,
                end: endTime,
                value: tlData.rawValue
            }).then((tx) => {
                tx.from = from;
                tx.chainId = _CHAINID;
                data = tx;
                if ($scope.wallet.hwType == "ledger" || $scope.wallet.hwType == "trezor") {
                    return;
                }
                return web3.fsn.signAndTransmit(tx, $scope.account.signTransaction).then(txHash => {
                    $scope.successModal.open();
                })
            });
        } catch (err) {
            console.log("buildTimeLockToAssetTx", err);
            $scope.errorModal.open();
            $scope.$eval(function () {
                $scope.errorMessage = err.message;
            })
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
                            $scope.successModal.open();
                        })
                    })
                }
                $scope.notifier.info('Please, confirm transaction on Ledger.');
                await app.getAppConfiguration(localCallback);
            }
        }
        if ($scope.wallet.hwType == "trezor") {

        }
    }

    $scope.onlyLettersAndNumbersAssetName = function () {
        let reg = new RegExp('^[a-zA-Z0-9_. \'-]*$');
        if (!reg.test($scope.assetCreate.assetName)) {
            $scope.$eval(function () {
                $scope.assetCreate.assetName = $scope.assetCreate.assetName.replace(/[^a-z0-9 ,.?!]/ig, '');
            })
            return;
        } else {
            return;
        }
    }

    $scope.onlyLettersAndNumbersAssetSymbol = function () {
        let reg = new RegExp('^[a-zA-Z0-9_. \'-]*$');
        if (!reg.test($scope.assetCreate.assetSymbol)) {
            $scope.$eval(function () {
                $scope.assetCreate.assetSymbol = $scope.assetCreate.assetSymbol.replace(/[^a-z0-9 ,.?!]/ig, '');
            })
            return;
        } else {
            return;
        }
    }

    $scope.makeBigNumber = function (amount, decimals) {
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
                return
            }
            amount = new BN(amount + "0".repeat(parseInt(decimals)));
        } else if (pieces.length > 2) {
            console.log('error');
            // error message
            return
        } else if (pieces[1].length > d) {
            console.log('error');
            return // error
        } else {
            let dec = parseInt(pieces[1])
            let reg = new RegExp('^\\d+$'); // numbers only
            if (isNaN(pieces[1]) || dec < 0 || !reg.test(pieces[1])) {
                console.log('error');
                return
                // return error
            }
            dec = pieces[1]
            let declen = d - dec.toString().length
            amount = parseInt(pieces[0])
            if (isNaN(amount) || amount < 0) {
                console.log('error');
                // error message
                return
            }
            amount = new BN(amount + dec + "0".repeat(parseInt(declen)));
        }
        return amount;
    }

    $scope.sendAsset = async function () {
        $scope.successMessagebool = true;
        let accountData = uiFuncs.getTxData($scope);
        let from = accountData.from;
        let to = $scope.sendAsset.toAddress;
        let decimals = '';
        let asset = $scope.assetToSend;
        let hash = '';
        let data = {};

        if (to.length < 42) {
            await web3.fsn.getAddressByNotation(parseInt(to)).then(function (address) {
                to = address;
            });
        }

        await web3.fsn.getAsset(asset).then(function (res) {
            decimals = parseInt(res["Decimals"]);
        });

        let amount = new BigNumber($scope.sendAsset.amountToSend);
        let amountBNString = amount.toString();

        amount = $scope.makeBigNumber(amountBNString, decimals);


        if ($scope.transactionType == "none") {

            if (!$scope.account && ($scope.wallet.hwType !== "ledger") && ($scope.wallet.hwType !== "trezor")) {
                $scope.account = web3.eth.accounts.privateKeyToAccount($scope.toHexString($scope.wallet.getPrivateKey()));
            }

            try {
                await web3.fsntx.buildSendAssetTx({
                    from: from,
                    to: to,
                    value: amount.toString(),
                    asset: asset
                }).then((tx) => {
                    console.log(tx);
                    tx.from = from;
                    tx.chainId = _CHAINID;
                    data = tx;
                    if ($scope.wallet.hwType == "ledger" || $scope.wallet.hwType == "trezor") {
                        return;
                    }
                    return web3.fsn.signAndTransmit(tx, $scope.account.signTransaction).then(txHash => {
                        hash = txHash;
                        $scope.sendAssetFinal.open();
                        $scope.$eval(function () {
                            $scope.successHash = hash;
                            $scope.successHash = hash;
                        });
                    })
                });
            } catch (err) {
                console.log("buildSendAssetTx", err);
                $scope.errorModal.open();
                $scope.$eval(function () {
                    $scope.errorMessage = err.message;
                })
            }

            $scope.$apply(function () {
                $scope.successHash = hash;
            });
        }
        if ($scope.transactionType == "daterange") {

            if ($scope.sendAsset.fromTime == '') {
                $scope.sendAsset.fromTime = new Date();
            }

            let fromTime = getHexDate(convertDate($scope.sendAsset.fromTime));
            let tillTime = getHexDate(convertDate($scope.sendAsset.tillTime));
            if (!$scope.account && ($scope.wallet.hwType !== "ledger") && ($scope.wallet.hwType !== "trezor")) {
                $scope.account = web3.eth.accounts.privateKeyToAccount($scope.toHexString($scope.wallet.getPrivateKey()));
            }

            try {
                await web3.fsntx.buildAssetToTimeLockTx({
                    asset: asset,
                    from: from,
                    to: to,
                    start: fromTime,
                    end: tillTime,
                    value: amount
                }).then((tx) => {
                    tx.from = from;
                    tx.chainId = _CHAINID;
                    data = tx;
                    if ($scope.wallet.hwType == "ledger" || $scope.wallet.hwType == "trezor") {
                        return;
                    }
                    return web3.fsn.signAndTransmit(tx, $scope.account.signTransaction).then(txHash => {
                        $scope.sendAssetFinal.open();
                        $scope.$eval(function () {
                            $scope.successHash = txHash;
                            $scope.successHash = txHash;
                        });
                    })
                });
            } catch (err) {
                console.log("buildAssetToTimeLockTx", err);
                $scope.errorModal.open();
                $scope.$eval(function () {
                    $scope.errorMessage = err.message;
                })
            }
        }

        if ($scope.transactionType == "scheduled") {

            let fromTime = getHexDate(convertDate($scope.sendAsset.fromTime));
            let tillTime = web3.fsn.consts.TimeForeverStr;

            if (!$scope.account && ($scope.wallet.hwType !== "ledger") && ($scope.wallet.hwType !== "trezpr")) {
                $scope.account = web3.eth.accounts.privateKeyToAccount($scope.toHexString($scope.wallet.getPrivateKey()));
            }

            try {
                await web3.fsntx.buildAssetToTimeLockTx({
                    asset: asset,
                    from: from,
                    to: to,
                    start: fromTime,
                    end: tillTime,
                    value: amount
                }).then((tx) => {
                    tx.from = from;
                    tx.chainId = _CHAINID;
                    data = tx;
                    if ($scope.wallet.hwType == "ledger" || $scope.wallet.hwType == "trezor") {
                        return;
                    }
                    return web3.fsn.signAndTransmit(tx, $scope.account.signTransaction).then(txHash => {
                        $scope.sendAssetFinal.open();
                        $scope.$eval(function () {
                            $scope.successHash = txHash;
                            $scope.successHash = txHash;
                        });
                    })
                });
            } catch (err) {
                console.log("buildAssetToTimeLockTx", err);
                $scope.errorModal.open();
                $scope.$eval(function () {
                    $scope.errorMessage = err.message;
                })
            }
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
                            $scope.sendAssetFinal.open();
                            $scope.$eval(function () {
                                $scope.successHash = txHash;
                                $scope.successHash = txHash;
                            });
                        })
                    })
                }
                $scope.notifier.info('Please, confirm transaction on Ledger.');
                await app.getAppConfiguration(localCallback);
            }
        }

        if ($scope.wallet.hwType == "trezor") {
            debugger
            let rawTx = data;
            var oldTx = Object.assign(rawTx, {});
            let input = oldTx.input;
            rawTx.chainId = parseInt(_CHAINID);
            rawTx.gasLimit = "0x2EE0";
            let gasPrice = web3.utils.toWei(new web3.utils.BN(2), "gwei");
            rawTx.gasPrice = "0x" + gasPrice.toString(16);
            rawTx.gas = "0x15F90";
            delete rawTx.r;
            delete rawTx.s;
            delete rawTx.v;
            delete rawTx.gas;
            console.log(rawTx);

            return TrezorConnect.ethereumSignTransaction({
                path: $scope.wallet.getPath(),
                transaction: rawTx
            }).then(function (result) {
                debugger
                var rv = parseInt(result.payload.v, 16);
                var cv = parseInt(_CHAINID) * 2 + 35;
                if (rv !== cv && (rv & cv) !== rv) {
                    cv += 1; // add signature v bit.
                }
                let v = cv.toString(16);
                rawTx.r = result.payload.r;
                rawTx.s = result.payload.s;
                // rawTx.v = "0x" + v;
                rawTx.v = result.payload.v;
                rawTx.gas = "0x15F90";

                console.log(rawTx);
                window.web3.fsntx.sendRawTransaction(rawTx, function (err, txHash) {
                    console.log(txHash);
                    console.log(err);
                })
            });
        }
    }

    $scope.hideExpired = function (id) {
        let itemsArray = localStorage.getItem('hiddenTimeLocks') ? JSON.parse(localStorage.getItem('hiddenTimeLocks')) : "[]";
        if (itemsArray == "[]") {
            // let items = [];
            // let u = 0;
            // for (let id in $scope.timeLockList) {
            //     let data = {
            //         "id": u,
            //         "hidden": 0
            //     }
            //     items.push(data);
            //     u++
            // }
            let empty = [];
            localStorage.setItem('hiddenTimeLocks', JSON.stringify(empty));
        }

        let data = JSON.parse(localStorage.getItem('hiddenTimeLocks'));

        // data[id].hidden = 1;

        $scope.$eval(function () {
            $scope.hiddenTimeLockStates = data;
            $scope.hiddenTimeLockStates = data;
        })

        localStorage.setItem('hiddenTimeLocks', JSON.stringify(data));
    }

    $scope.timeLockToTimeLock = async function () {
        $scope.successMessagebool = true;
        let accountData = uiFuncs.getTxData($scope);
        let from = accountData.from;
        let to = $scope.sendAsset.toAddress;
        let decimals = '';
        let asset = $scope.assetToSend;
        let hash = '';

        let fromTime = web3.utils.numberToHex($scope.timeLockStartTimePosix);
        let tillTime = web3.utils.numberToHex($scope.timeLockEndTimePosix);

        // JavaScript / Go incompatibility -1 error
        if ($scope.timeLockEndTimePosix === 18446744073709552000) {
            tillTime = web3.fsn.consts.TimeForeverStr;
        }

        if (to.length < 42) {
            web3.fsn.getAddressByNotation(parseInt(to)).then(function (address) {
                to = address;
            });
        }

        await web3.fsn.getAsset(asset).then(function (res) {
            decimals = parseInt(res["Decimals"]);
        });

        let amount = $scope.sendAsset.amountToSend.toString();

        let pieces = amount.split(".")
        let d = parseInt(decimals)
        if (pieces.length === 1) {
            amount = parseInt(amount)
            if (isNaN(amount) || amount < 0) {
                // error message
                return
            }
            amount = new BigNumber(amount + "0".repeat(parseInt(decimals)));
        } else if (pieces.length > 2) {
            // error message
            return
        } else if (pieces[1].length >= d) {
            return // error
        } else {
            let dec = parseInt(pieces[1])
            let reg = new RegExp('^\\d+$'); // numbers only
            if (isNaN(pieces[1]) || dec < 0 || !reg.test(pieces[1])) {
                // return error
            }
            dec = pieces[1]
            let declen = d - dec.toString().length
            amount = parseInt(pieces[0])
            if (isNaN(amount) || amount < 0) {
                // error message
                return
            }
            amount = new BigNumber(amount + dec + "0".repeat(parseInt(declen)));
        }

        let data = {};

        if (!$scope.account && ($scope.wallet.hwType !== "ledger") && ($scope.wallet.hwType !== "trezor")) {
            $scope.account = web3.eth.accounts.privateKeyToAccount($scope.toHexString($scope.wallet.getPrivateKey()));
        }

        try {
            await web3.fsntx.buildTimeLockToTimeLockTx({
                asset: asset,
                from: from,
                to: to,
                start: fromTime,
                end: tillTime,
                value: amount
            }).then((tx) => {
                tx.from = from;
                tx.chainId = _CHAINID;
                data = tx;
                if ($scope.wallet.hwType == "ledger" || $scope.wallet.hwType == "trezor") {
                    return;
                }
                return web3.fsn.signAndTransmit(tx, $scope.account.signTransaction).then(txHash => {
                    $scope.$eval(function () {
                        $scope.sendAssetFinal.open();
                        $scope.successHash = txHash;
                        $scope.successHash = txHash;
                    });
                })
            });
        } catch (err) {
            console.log("buildTimeLockToTimeLockTx", err);
            $scope.errorModal.open();
            $scope.$eval(function () {
                $scope.errorMessage = err.message;
            })
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
                            $scope.$eval(function () {
                                $scope.sendAssetFinal.open();
                                $scope.successHash = txHash;
                                $scope.successHash = txHash;
                            });
                        })
                    })
                }
                $scope.notifier.info('Please, confirm transaction on Ledger.');
                await app.getAppConfiguration(localCallback);
            }
        }

        if ($scope.wallet.hwType == "trezor") {

        }

    }

    $scope.getBalance = async function () {
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

    $scope.createAssetInit = async function () {
        let a = $scope.totalAttributes.length;

        $scope.$eval(function () {
            $scope.totalAttributes = [0];
            $scope.allAttributes = {};
            $scope.showMaxCharacters = false;
        })
        for (let b = 0; b < 35; b++) {
            $scope.$eval(function () {
                $scope.attributename[b] = '';
                $scope.attributevalue[b] = '';
            })
        }
        $scope.$eval(function () {
            $scope.assetCreate.canChange = false;
            $scope.assetCreate.assetName = '';
            $scope.assetCreate.assetSymbol = '';
            $scope.assetCreate.decimals = '';
            $scope.assetCreate.totalSupply = '';
            $scope.assetCreate.errorMessage = '';
            $scope.usedChars = 0;
        })
        $scope.createAssetModal.open();
    }

    $scope.createAssetReviewOpen = function () {
        if (Object.keys($scope.allAttributes).length == 0) {
            $scope.showAttributesTab = false;
        } else {
            $scope.showAttributesTab = true
        }
        ;
        $scope.createAssetReview.open();
    }

    $scope.createAsset = async function () {
        $scope.$eval(function () {
            $scope.assetCreate.errorMessage = '';
        })
        let accountData = uiFuncs.getTxData($scope);
        let walletAddress = accountData.from;
        let assetSymbol = '';
        if (!$scope.assetCreate.assetSymbol) {
            assetSymbol = '';
        } else {
            assetSymbol = $scope.assetCreate.assetSymbol.toUpperCase();
        }
        let assetName = $scope.assetCreate.assetName;
        let decimals = parseInt($scope.assetCreate.decimals);
        let totalSupply = $scope.assetCreate.totalSupply;
        let power = $scope.countDecimals(decimals);

        if (!$scope.account && ($scope.wallet.hwType !== "ledger") && ($scope.wallet.hwType !== "trezor")) {
            $scope.account = web3.eth.accounts.privateKeyToAccount($scope.toHexString($scope.wallet.getPrivateKey()));
        }

        let totalSupplyString = totalSupply.toString()

        let totalSupplyBN = $scope.makeBigNumber(totalSupplyString, decimals);
        let totalSupplyBNHex = "0x" + totalSupplyBN.toString(16);

        await $scope.returnAttributesJSON();

        let data = {
            from: walletAddress,
            name: assetName,
            symbol: assetSymbol,
            decimals: decimals,
            total: totalSupplyBNHex,
            description: JSON.stringify($scope.allAttributes),
            canChange: $scope.assetCreate.canChange,
        };

        try {
            await web3.fsntx.buildGenAssetTx(data).then((tx) => {
                tx.chainId = _CHAINID;
                let gasPrice = web3.utils.toWei(new web3.utils.BN(100), "gwei");
                tx.gasPrice = gasPrice.toString()
                data = tx;
                console.log(tx);
                if ($scope.wallet.hwType == "ledger" || $scope.wallet.hwType == "trezor") {
                    return;
                } else {
                    return web3.fsn.signAndTransmit(tx, $scope.account.signTransaction).then(txHash => {
                        $scope.$eval(function () {
                            $scope.assetCreate.errorMessage = '';
                            $scope.assetCreate.assetHash = txHash;
                        });
                        $scope.createAssetFinal.open();
                    })
                }
            });
        } catch (err) {
            console.log("buildGenAssetTx", err);
            $scope.errorModal.open();
            $scope.$eval(function () {
                $scope.errorMessage = err.message;
            })
        }

        if ($scope.wallet.hwType == "ledger") {
            let ledgerConfig = {
                privKey: $scope.wallet.privKey ? $scope.wallet.getPrivateKeyString() : "",
                path: $scope.wallet.getPath(),
                hwType: $scope.wallet.getHWType(),
                hwTransport: $scope.wallet.getHWTransport()
            }
            let rawTx = data;
            let txH = '';
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
                            txH = txHash;
                            $scope.$eval(function () {
                                $scope.assetCreate.errorMessage = '';
                                $scope.assetCreate.assetHash = txH;
                            });
                            $scope.createAssetFinal.open();
                        })
                    })
                }
                $scope.notifier.info('Please, confirm transaction on Ledger.');
                await app.getAppConfiguration(localCallback);
            }
        }

        if ($scope.wallet.hwType == "trezor") {

        }

    }
    $scope.getVerifiedAssets();
    $scope.$watch('wallet', function () {
        if (!$scope.tx || !$scope.wallet) {
            return
        }
        $scope.getVerifiedAssets();
        $scope.getAllFsnAssets();
        $scope.getTimeLockAssets();
        $scope.countdownTimer();
        $scope.getBalance();
    })
    setInterval(function () {
        if (!$scope.tx || !$scope.wallet) {
            return
        }
        $scope.getVerifiedAssets();
        $scope.getAllFsnAssets();
        $scope.getTimeLockAssets();
        $scope.countdownTimer();
        $scope.getBalance();
    }, 7000);

    $scope.countdownTimer = function () {
        let timeleft = 7;
        let timerInterval = setInterval(function () {
            timeleft -= 1;
            if (timeleft <= 0)
                clearInterval(timerInterval);
            $scope.$apply(function () {
                $scope.refreshTimer = timeleft;
            })
        }, 1000);
    }

    $scope.getTimeLockStatus = function (startTime, endTime, startTimePosix, endTimePosix) {
        let currentDate = Math.floor(new Date().getTime() / 1000.0);
        // if the start and endtime are now and forever
        if (startTimePosix <= currentDate && endTimePosix === 18446744073709552000) {
            return status = 'Available';
            // if the start and end date in range of the current date
        }

        if (startTimePosix >= currentDate && endTimePosix >= currentDate) {
            return status = 'Active';
        }

        if (startTime == 'Now' && endTimePosix >= currentDate) {
            return status = 'Active';
        }

        if (startTimePosix <= currentDate && endTimePosix >= currentDate) {
            return status = 'Active';
        }

        // if (startTimePosix <= currentDate && endTimePosix <= currentDate) {
        //     return status = 'Available';
        // }
        if (startTimePosix <= currentDate && endTimePosix <= currentDate) {
            return status = 'Expired';
        }
    }


    $scope.getTimeLockAssets = async function () {
        $scope.$eval(function () {
            $scope.hiddenTimeLockStates = localStorage.getItem('hiddenTimeLocks') ? JSON.parse(localStorage.getItem('hiddenTimeLocks')) : [];
        })

        if (!$scope.tx || !$scope.wallet) {
            return
        }
        let accountData = uiFuncs.getTxData($scope);
        let walletAddress = accountData.from;
        let timeLockList = {};
        let timeLockListSave = [];
        let activeList = [];
        let availableList = [];


        await web3.fsn.getAllTimeLockBalances(walletAddress).then(function (res) {
            timeLockList = res;
        });

        let x = 0;
        for (let asset in timeLockList) {
            let assetId = Object.keys(timeLockList);
            let assetName = '';
            let assetSymbol = '';
            let assetDecimals = '';
            let divider = '';
            let status = '';

            await web3.fsn.getAsset(assetId[x]).then(function (res) {
                assetName = res["Name"];
                assetSymbol = res["Symbol"];
                assetDecimals = res["Decimals"];
                divider = $scope.countDecimals(res["Decimals"]);
            });

            let verifiedImage = '';
            let hasImage = false;
            let verifiedAsset = false;

            for (let a in $scope.verifiedAssetsImages) {
                if ($scope.verifiedAssetsImages[a].assetID == assetId[x]) {
                    // Set matched image name
                    verifiedImage = $scope.verifiedAssetsImages[a].image;
                    hasImage = true;
                    verifiedAsset = true;
                }
            }

            // Set FSN icon for PSN as well
            if (assetId[x] == '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff') {
                verifiedImage = 'EFSN_LIGHT.svg';
                hasImage = true;
                verifiedAsset = true;
            }

            for (let i = 0; i < timeLockList[asset]["Items"].length; i++) {
                let startTimePosix = timeLockList[asset]["Items"][i]["StartTime"];
                let endTimePosix = timeLockList[asset]["Items"][i]["EndTime"];
                let startTime = timeLockList[asset]["Items"][i]["StartTime"] * 1000;
                let endTime = timeLockList[asset]["Items"][i]["EndTime"] * 1000;

                // Set strings for dates
                if (startTimePosix === 0) {
                    startTime = 'Now'
                } else {
                    let a = new Date(timeLockList[asset]["Items"][i]["StartTime"] * 1000 + 1000);
                    var month = a.getUTCMonth();
                    var day = a.getUTCDate();
                    var year = a.getUTCFullYear();

                    startTime = $scope.months[month] + ' ' + day + ', ' + year;

                }
                if (endTimePosix === 18446744073709552000) {
                    endTime = '∞ Forever';
                } else {

                    let a = new Date(timeLockList[asset]["Items"][i]["EndTime"] * 1000 + 1000);

                    var month = a.getUTCMonth();
                    var day = a.getUTCDate();
                    var year = a.getUTCFullYear();

                    endTime = $scope.months[month] + ' ' + day + ', ' + year;
                }

                // Calculate the status of the Time Lock
                status = $scope.getTimeLockStatus(startTime, endTime, startTimePosix, endTimePosix);

                let data = {
                    "id": timeLockListSave.length,
                    "status": status,
                    "name": assetName,
                    "asset": assetId[x],
                    "symbol": assetSymbol,
                    "decimals": assetDecimals,
                    "startTime": startTime,
                    "endTime": endTime,
                    "posixStartTime": startTimePosix,
                    "posixEndTime": endTimePosix,
                    "rawValue": timeLockList[asset]["Items"][i]["Value"],
                    "value": parseInt(timeLockList[asset]["Items"][i]["Value"]) / divider,
                    "image": verifiedImage,
                    "hasImage": hasImage,
                    "verified": verifiedAsset
                }

                if (status == 'Active') {
                    await activeList.push(data);

                }
                if (status == 'Available') {
                    await availableList.push(data);
                }
            }
            x++;

        }
        availableList.sort(function (a, b) {
            a = a.name;
            b = b.name;
            return a < b ? -1 : a > b ? 1 : 0;
        });
        activeList.sort(function (a, b) {
            a = a.name;
            b = b.name;
            return a < b ? -1 : a > b ? 1 : 0;
        });

        let u = -1;
        for (let asset in availableList) {
            u++
            let data = {
                "id": u,
                "status": availableList[asset]["status"],
                "name": availableList[asset]["name"],
                "asset": availableList[asset]["asset"],
                "symbol": availableList[asset]["symbol"],
                "decimals": availableList[asset]["decimals"],
                "startTime": availableList[asset]["startTime"],
                "endTime": availableList[asset]["endTime"],
                "posixStartTime": availableList[asset]["posixStartTime"],
                "posixEndTime": availableList[asset]["posixEndTime"],
                "rawValue": availableList[asset]["rawValue"],
                "value": availableList[asset]["value"],
                "image": availableList[asset]["image"],
                "hasImage": availableList[asset]["hasImage"],
                "verified": availableList[asset]["verified"]

            }
            await timeLockListSave.push(data);
        }

        for (let asset in activeList) {
            u++
            let data = {
                "id": u,
                "status": activeList[asset]["status"],
                "name": activeList[asset]["name"],
                "asset": activeList[asset]["asset"],
                "symbol": activeList[asset]["symbol"],
                "decimals": activeList[asset]["decimals"],
                "startTime": activeList[asset]["startTime"],
                "endTime": activeList[asset]["endTime"],
                "posixStartTime": activeList[asset]["posixStartTime"],
                "posixEndTime": activeList[asset]["posixEndTime"],
                "rawValue": activeList[asset]["rawValue"],
                "value": activeList[asset]["value"],
                "image": activeList[asset]["image"],
                "hasImage": activeList[asset]["hasImage"],
                "verified": activeList[asset]["verified"]

            }
            await timeLockListSave.push(data);
        }

        $scope.$eval(function () {
            $scope.timeLockList = timeLockListSave;
        });
    }


    $scope.getAllFsnAssets = async function () {
        if (!$scope.tx || !$scope.wallet) {
            return
        }
        $scope.$eval(function () {
            $scope.showNoAssets = true;
        })
        let accountData = uiFuncs.getTxData($scope);
        let walletAddress = accountData.from;
        let assetList = {};
        let assetList2 = [];
        let assetList3 = [];
        let verifiedAsset = false;


        await web3.fsn.allAssets().then(function (res) {
            assetList = res;
        });

        let balances = {};

        await web3.fsn.getAllBalances(walletAddress).then(function (res) {
            balances = res;
        })
        let ownedAssets = Object.keys(balances);

        let myAssets = [];
        for (let i in ownedAssets) {
            let asset = ownedAssets[i];
            myAssets.push(assetList[asset]);
        }
        assetList = myAssets;

        let x = -1;

        for (let asset in assetList) {
            let id = assetList[asset]["ID"];
            let owner = assetList[asset]["Owner"];
            let owned = false;
            let assetBalance = '';
            let verifiedImage = '';
            let hasImage = false;
            let verifiedAsset = false;

            for (let a in $scope.verifiedAssetsImages) {
                if ($scope.verifiedAssetsImages[a].assetID == id) {
                    // Set matched image name
                    verifiedImage = $scope.verifiedAssetsImages[a].image;
                    hasImage = true;
                    verifiedAsset = true;
                }
            }

            // Set FSN icon for PSN as well
            if (id == '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff') {
                verifiedImage = 'EFSN_LIGHT.svg';
                hasImage = true;
                verifiedAsset = true;
            }

            assetBalance = balances[id];

            owner === walletAddress ? owned = 'Created' : owned = '';


            let description = {};
            try {
                description = JSON.parse(assetList[asset]["Description"]);
            } catch (err) {
                description = assetList[asset]["Description"];
            }

            if (assetBalance > 0.000000000001) {
                let divider = $scope.countDecimals(assetList[asset]["Decimals"]);
                let data = {
                    "name": assetList[asset]["Name"],
                    "symbol": assetList[asset]["Symbol"],
                    "decimals": assetList[asset]["Decimals"],
                    "total": assetList[asset]["Total"] / divider,
                    "contractaddress": id,
                    "balance": assetBalance / divider,
                    "owner": owned,
                    "issuer": owner,
                    "canChange": assetList[asset]["CanChange"],
                    "image": verifiedImage,
                    "hasImage": hasImage,
                    "description": description,
                    "verified": verifiedAsset
                }

                if (id === "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff") {
                    await assetList3.push(data);
                } else {
                    await assetList2.push(data);
                }
            }
        }

        assetList2.sort(function (a, b) {
            a = a.name;
            b = b.name;
            return a < b ? -1 : a > b ? 1 : 0;
        });

        for (let asset in assetList2) {
            let data = {
                "name": assetList2[asset]["name"],
                "symbol": assetList2[asset]["symbol"],
                "decimals": assetList2[asset]["decimals"],
                "total": assetList2[asset]["total"],
                "contractaddress": assetList2[asset]["contractaddress"],
                "balance": assetList2[asset]["balance"],
                "owner": assetList2[asset]["owner"],
                "issuer": assetList2[asset]["issuer"],
                "canChange": assetList2[asset]["canChange"],
                "image": assetList2[asset]["image"],
                "hasImage": assetList2[asset]["hasImage"],
                "description": assetList2[asset]["description"],
                "verified": assetList2[asset]["verified"]

            }
            await assetList3.push(data);
        }

        $scope.$apply(function () {
            $scope.assetListOwns = assetList3;
            $scope.assetListOwns = assetList3;
            $scope.assetListLoading = false;
        });

        if ($scope.assetListOwns.length == 0) {
            $scope.$eval(function () {
                $scope.showNoAssets = true;
            })
        }
    }

    $scope.getAllErcTokens = function () {
        let accountData = uiFuncs.getTxData($scope);
        let walletAddress = accountData.from;
        let tokenList = [
            {
                "address": "0x4E84E9e5fb0A972628Cf4568c403167EF1D40431",
                "symbol": "$FFC",
                "decimal": 18,
                "type": "default"
            },
            {
                "address": "0xa024e8057eec474a9b2356833707dd0579e26ef3",
                "symbol": "$FYX",
                "decimal": 18,
                "type": "default"
            }
        ];

        var tknAddress = (walletAddress).substring(2);

        tokenList.forEach(function (token) {
            var contractData = ('0x70a08231000000000000000000000000' + tknAddress);
            web3.eth.call({
                to: token.address,
                data: contractData
            }, function (err, result) {
                if (result) {
                    var tokens = web3.utils.toBN(result).toString();
                    console.log('You own: ' + web3.utils.fromWei(tokens, 'ether') + ' of ' + token.symbol);
                } else {
                    console.log(err);
                }
            });
        });
    }


    $scope.sendTx = function () {
        $scope.sendTxModal.close();
        uiFuncs.sendTx($scope.signedTx, function (resp) {
            if (!resp.isError) {
                var checkTxLink = "https://www.myetherwallet.com?txHash=" + resp.data + "#check-tx-status";
                var txHashLink = $scope.ajaxReq.blockExplorerTX.replace("[[txHash]]", resp.data);
                var emailBody = 'I%20was%20trying%20to..............%0A%0A%0A%0ABut%20I%27m%20confused%20because...............%0A%0A%0A%0A%0A%0ATo%20Address%3A%20https%3A%2F%2Fetherscan.io%2Faddress%2F' + $scope.tx.to + '%0AFrom%20Address%3A%20https%3A%2F%2Fetherscan.io%2Faddress%2F' + $scope.wallet.getAddressString() + '%0ATX%20Hash%3A%20https%3A%2F%2Fetherscan.io%2Ftx%2F' + resp.data + '%0AAmount%3A%20' + $scope.tx.value + '%20' + $scope.unitReadable + '%0ANode%3A%20' + $scope.ajaxReq.type + '%0AToken%20To%20Addr%3A%20' + $scope.tokenTx.to + '%0AToken%20Amount%3A%20' + $scope.tokenTx.value + '%20' + $scope.unitReadable + '%0AData%3A%20' + $scope.tx.data + '%0AGas%20Limit%3A%20' + $scope.tx.gasLimit + '%0AGas%20Price%3A%20' + $scope.tx.gasPrice;
                var verifyTxBtn = $scope.ajaxReq.type != nodes.nodeTypes.Custom ? '<a class="btn btn-xs btn-info" href="' + txHashLink + '" class="strong" target="_blank" rel="noopener noreferrer">Verify Transaction</a>' : '';
                var checkTxBtn = '<a class="btn btn-xs btn-info" href="' + checkTxLink + '" target="_blank" rel="noopener noreferrer"> Check TX Status </a>';
                var emailBtn = '<a class="btn btn-xs btn-info " href="mailto:support@myetherwallet.com?Subject=Issue%20regarding%20my%20TX%20&Body=' + emailBody + '" target="_blank" rel="noopener noreferrer">Confused? Email Us.</a>';
                var completeMsg = '<p>' + globalFuncs.successMsgs[2] + '<strong>' + resp.data + '</strong></p><p>' + verifyTxBtn + ' ' + checkTxBtn + '</p>';
                $scope.notifier.success(completeMsg, 0);
                $scope.wallet.setBalance(applyScope);
                if ($scope.tx.sendMode == 'token') $scope.wallet.tokenObjs[$scope.tokenTx.id].setBalance();
            } else {
                $scope.notifier.danger(resp.error);
            }
        });
    }


    $scope.transferAllBalance = function () {
        if ($scope.tx.sendMode != 'token') {
            uiFuncs.transferAllBalance($scope.wallet.getAddressString(), $scope.tx.gasLimit, function (resp) {
                if (!resp.isError) {
                    $scope.tx.unit = resp.unit;
                    $scope.tx.value = resp.value;
                } else {
                    $rootScope.rootScopeShowRawTx = false;
                    $scope.notifier.danger(resp.error);
                }
            });
        } else {
            $scope.tx.value = $scope.wallet.tokenObjs[$scope.tokenTx.id].getBalance();
        }
    }

    $scope.parseSignedTx = function (signedTx) {
        var txData = {}
        var isJSON = false;
        $scope.parsedSignedTx = {}
        if (Validator.isJSON(signedTx)) {
            txData = new ethUtil.Tx(JSON.parse(signedTx));
            isJSON = true;
        } else {
            if (signedTx.slice(0, 2) == "0x") signedTx = signedTx.slice(2, signedTx.length)
            txData = new ethUtil.Tx(signedTx)
        }
        $scope.parsedSignedTx.gasPrice = {}
        $scope.parsedSignedTx.txFee = {}
        $scope.parsedSignedTx.balance = $scope.wallet.getBalance()
        $scope.parsedSignedTx.from = isJSON ? $scope.wallet.getChecksumAddressString() : ethFuncs.sanitizeHex(ethUtil.toChecksumAddress(txData.from.toString('hex')))
        $scope.parsedSignedTx.to = ethFuncs.sanitizeHex(ethUtil.toChecksumAddress(txData.to.toString('hex')))
        $scope.parsedSignedTx.value = (txData.value == '0x' || txData.value == '' || txData.value == null) ? '0' : etherUnits.toEther(new BigNumber(ethFuncs.sanitizeHex(txData.value.toString('hex'))).toString(), 'wei')
        $scope.parsedSignedTx.gasLimit = new BigNumber(ethFuncs.sanitizeHex(txData.gasLimit.toString('hex'))).toString()
        $scope.parsedSignedTx.gasPrice.wei = new BigNumber(ethFuncs.sanitizeHex(txData.gasPrice.toString('hex'))).toString()
        $scope.parsedSignedTx.gasPrice.gwei = new BigNumber(ethFuncs.sanitizeHex(txData.gasPrice.toString('hex'))).div(etherUnits.getValueOfUnit('gwei')).toString()
        $scope.parsedSignedTx.gasPrice.eth = etherUnits.toEther(new BigNumber(ethFuncs.sanitizeHex(txData.gasPrice.toString('hex'))).toString(), 'wei')
        $scope.parsedSignedTx.txFee.wei = new BigNumber(parseInt($scope.parsedSignedTx.gasLimit)).times(new BigNumber(parseInt($scope.parsedSignedTx.gasPrice.wei)))
        $scope.parsedSignedTx.txFee.gwei = new BigNumber($scope.parsedSignedTx.txFee.wei).div(etherUnits.getValueOfUnit('gwei')).toString()
        $scope.parsedSignedTx.txFee.eth = etherUnits.toEther(parseInt($scope.parsedSignedTx.txFee.wei), 'wei').toString()
        $scope.parsedSignedTx.nonce = (txData.nonce == '0x' || txData.nonce == '' || txData.nonce == null) ? '0' : new BigNumber(ethFuncs.sanitizeHex(txData.nonce.toString('hex'))).toString()
        $scope.parsedSignedTx.data = (txData.data == '0x' || txData.data == '' || txData.data == null) ? '(none)' : ethFuncs.sanitizeHex(txData.data.toString('hex'))
    }

    $scope.reOpenDecryptWalletMEWconnect = function () {
        if ($scope.globalService.currentTab === 3) {
            $scope.wd = false
        }
    }

    globalFuncs.MEWconnectStatus.registerDecryptOpeners($scope.reOpenDecryptWalletMEWconnect.bind(this))

};
module.exports = sendTxCtrl;
