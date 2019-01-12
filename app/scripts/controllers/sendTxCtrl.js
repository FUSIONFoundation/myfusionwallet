'use strict';

var sendTxCtrl = function ($scope, $sce, walletService, $rootScope) {

        $scope.$watch('wallet', function () {
            $scope.getAllFsnAssets();
            $scope.getTimeLockAssets();
        })

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
        $scope.sendBackToAssetsModal = new Modal(document.getElementById('sendBackToAssetsModal'));
        $scope.errorModal = new Modal(document.getElementById('errorModal'));
        $scope.successModal = new Modal(document.getElementById('successModal'));
        $scope.hiddenTimeLockStates = JSON.parse(localStorage.getItem('hiddenTimeLocks'));
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


        walletService.wallet = null;
        walletService.password = '';
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

        $scope.setTokenSendMode = function () {
            if ($scope.tx.sendMode == 'token' && !$scope.tx.tokensymbol) {
                $scope.tx.tokensymbol = $scope.wallet.tokenObjs[0].symbol;
                $scope.wallet.tokenObjs[0].type = "custom";
                $scope.setSendMode($scope.tx.sendMode, 0, $scope.tx.tokensymbol);
            } else if ($scope.tx.tokensymbol) {
                for (var i = 0; i < $scope.wallet.tokenObjs.length; i++) {
                    if ($scope.wallet.tokenObjs[i].symbol.toLowerCase().indexOf($scope.tx.tokensymbol.toLowerCase()) !== -1) {
                        $scope.wallet.tokenObjs[i].type = "custom";
                        $scope.setSendMode('token', i, $scope.wallet.tokenObjs[i].symbol);
                        break;
                    } else $scope.tokenTx.id = -1;
                }
            }
            if ($scope.tx.sendMode != 'token') $scope.tokenTx.id = -1;
        }

        var applyScope = function () {
            if (!$scope.$$phase) $scope.$apply();
        }

        var defaultInit = function () {
            globalFuncs.urlGet('sendMode') == null ? $scope.setSendMode('ether') : $scope.setSendMode(globalFuncs.urlGet('sendMode'));
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

            $scope.wallet.setBalance(applyScope);
            $scope.wallet.setTokens();
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

        $scope.copyToClipboard = function (text){
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
                } catch (e) {}

                // remove selection and node
                selection.removeAllRanges();
                body.removeChild(node);
            }

            return success;
        }

        $scope.$watch('ajaxReq.key', function () {
            if ($scope.wallet) {
                $scope.setSendMode('ether');
                $scope.wallet.setBalance(applyScope);
                $scope.wallet.setTokens();
            }
        });

        $scope.$watch('tokenTx', function () {
            if ($scope.wallet && $scope.wallet.tokenObjs !== undefined && $scope.wallet.tokenObjs[$scope.tokenTx.id] !== undefined && $scope.Validator.isValidAddress($scope.tokenTx.to) && $scope.Validator.isPositiveNumber($scope.tokenTx.value)) {
                if ($scope.estimateTimer) clearTimeout($scope.estimateTimer);
                $scope.estimateTimer = setTimeout(function () {
                    $scope.estimateGasLimit();
                }, 500);
            }
        }, true);

        $scope.$watch('tx', function (newValue, oldValue) {
            $rootScope.rootScopeShowRawTx = false;
            if (oldValue.sendMode && oldValue.sendMode != newValue.sendMode && newValue.sendMode == 'ether') {
                $scope.tx.data = globalFuncs.urlGet('data') == null ? "" : globalFuncs.urlGet('data');
                $scope.tx.gasLimit = globalFuncs.defaultTxGasLimit;
            }
            if (newValue.gasLimit == oldValue.gasLimit && $scope.wallet && $scope.Validator.isValidAddress($scope.tx.to) && $scope.Validator.isPositiveNumber($scope.tx.value) && $scope.Validator.isValidHex($scope.tx.data) && $scope.tx.sendMode != 'token') {
                if ($scope.estimateTimer) clearTimeout($scope.estimateTimer);
                $scope.estimateTimer = setTimeout(function () {
                    $scope.estimateGasLimit();
                }, 500);
            }
            if ($scope.tx.sendMode == 'token') {
                $scope.tokenTx.to = $scope.tx.to;
                $scope.tokenTx.value = $scope.tx.value;
            }
            if (newValue.to !== oldValue.to) {
                for (var i in $scope.customGas) {
                    if ($scope.tx.to.toLowerCase() == $scope.customGas[i].to.toLowerCase()) {
                        $scope.customGasMsg = $scope.customGas[i].msg != '' ? $scope.customGas[i].msg : ''
                        return;
                    }
                }
                $scope.customGasMsg = ''
            }
        }, true);

        $scope.estimateGasLimit = function () {
            $scope.customGasMsg = ''
            if ($scope.gasLimitChanged) return;
            for (var i in $scope.customGas) {
                if ($scope.tx.to.toLowerCase() == $scope.customGas[i].to.toLowerCase()) {
                    $scope.showAdvance = $scope.tx.data != '' || $scope.customGas[i].data != '' ? true : false;
                    $scope.tx.gasLimit = $scope.customGas[i].gasLimit;
                    if ($scope.customGas[i].data != '') $scope.tx.data = $scope.customGas[i].data;
                    $scope.customGasMsg = $scope.customGas[i].msg != '' ? $scope.customGas[i].msg : ''
                    return;
                }
            }
            if (globalFuncs.lightMode) {
                $scope.tx.gasLimit = globalFuncs.defaultTokenGasLimit;
                return;
            }
            var estObj = {
                to: $scope.tx.to,
                from: $scope.wallet.getAddressString(),
                value: ethFuncs.sanitizeHex(ethFuncs.decimalToHex(etherUnits.toWei($scope.tx.value, $scope.tx.unit)))
            }
            if ($scope.tx.data != "") estObj.data = ethFuncs.sanitizeHex($scope.tx.data);
            if ($scope.tx.sendMode == 'token') {
                estObj.to = $scope.wallet.tokenObjs[$scope.tokenTx.id].getContractAddress();
                estObj.data = $scope.wallet.tokenObjs[$scope.tokenTx.id].getData($scope.tokenTx.to, $scope.tokenTx.value).data;
                estObj.value = '0x00';
            }
            ethFuncs.estimateGas(estObj, function (data) {

                if (!data.error) {
                    if (data.data == '-1') {
                        console.log("sendTxCtrl:190 ERROR");
                        $scope.notifier.danger(globalFuncs.errorMsgs[21]);
                    }
                    $scope.tx.gasLimit = data.data;
                } else $scope.notifier.danger(data.msg);
            });
        }

        var isEnough = function (valA, valB) {
            return new BigNumber(valA).lte(new BigNumber(valB));
        }

        $scope.hasEnoughBalance = function () {
            if ($scope.wallet.balance == 'loading') return false;
            return isEnough($scope.tx.value, $scope.wallet.balance);
        }

        $scope.generateTx = function () {
            if (!$scope.Validator.isValidAddress($scope.tx.to)) {
                $scope.notifier.danger(globalFuncs.errorMsgs[5]);
                return;
            }
            var txData = uiFuncs.getTxData($scope);
            txData.gasPrice = $scope.tx.gasPrice ? '0x' + new BigNumber($scope.tx.gasPrice).toString(16) : null;
            txData.nonce = $scope.tx.nonce ? '0x' + new BigNumber($scope.tx.nonce).toString(16) : null;

            // set to true for offline tab and txstatus tab
            // on sendtx tab, it pulls gas price from the gasprice slider & nonce
            // if its true the whole txData object is set - don't try to change it
            // if false, replace gas price and nonce. gas price from slider. nonce from server.
            if (txData.gasPrice && txData.nonce) txData.isOffline = true;

            if ($scope.tx.sendMode == 'token') {
                // if the amount of tokens you are trying to send > tokens you have, throw error
                if (!isEnough($scope.tx.value, $scope.wallet.tokenObjs[$scope.tokenTx.id].balance)) {
                    $scope.notifier.danger(globalFuncs.errorMsgs[0]);
                    return;
                }
                txData.to = $scope.wallet.tokenObjs[$scope.tokenTx.id].getContractAddress();
                txData.data = $scope.wallet.tokenObjs[$scope.tokenTx.id].getData($scope.tokenTx.to, $scope.tokenTx.value).data;
                txData.value = '0x00';
            }
            uiFuncs.generateTx(txData, function (rawTx) {
                if (!rawTx.isError) {
                    $scope.rawTx = rawTx.rawTx;
                    $scope.signedTx = rawTx.signedTx;
                    $rootScope.rootScopeShowRawTx = true;
                } else {
                    $rootScope.rootScopeShowRawTx = false;
                    $scope.notifier.danger(rawTx.error);
                }
                if (!$scope.$$phase) $scope.$apply();
            });
        }

        $scope.countDecimals = function (decimals) {
            let returnDecimals = '1';
            for (let i = 0; i < decimals; i++) {
                returnDecimals += '0';
            }
            return parseInt(returnDecimals);
        }

        $scope.sendAssetModalConfirm = function (asset) {
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

            $scope.$eval(function () {
                $scope.sendAsset.fromTimeString = startTime;
                $scope.sendAsset.tillTimeString = endTime;
            })

            return web3.fsn.getAsset(asset).then(function (res) {
                $scope.$eval(function () {
                    $scope.sendAsset.assetName = res["Name"];
                    $scope.sendAsset.assetSymbol = res["Symbol"];
                    $scope.sendAsset.assetHash = asset;
                });
                $scope.sendAssetConfirm.open();
            });
        }

        $scope.checkDate = function () {
            if ($scope.transactionType == 'scheduled') {
                return
            } else {
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
        }


        $scope.sendAssetModalOpen = async function (id, timelockonly) {
            let asset = $scope.assetToSend;
            let accountData = uiFuncs.getTxData($scope);
            let walletAddress = accountData.from;
            let assetBalance = '';
            let decimals = '';

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
            return [d.getFullYear(), pad(d.getMonth() + 1), pad(d.getDate())].join('-');
        }

        function getHexDate(d) {
            return "0x" + (new Date(d).getTime() / 1000).toString(16);
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
                    return new BN(gs);
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
                    data = tx;
                    if ($scope.wallet.hwType == "ledger" || $scope.wallet.hwType == "trezor") {
                        return;
                    }
                    return web3.fsn.signAndTransmit(tx, $scope.account.signTransaction).then(txHash => {
                        $scope.successModal.open();
                    })
                });
            } catch (err) {
                $scope.errorModal.open();
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
                                $scope.successModal.open();
                            })
                        })
                    }
                    $scope.notifier.info('Please, confirm transaction on Ledger.');
                    await app.getAppConfiguration(localCallback);
                }
            }
            if ($scope.wallet.hwType == "trezor"){

            }
        }

        $scope.makeBigNumber = function (amount, decimals) {
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

            let amount = $scope.sendAsset.amountToSend.toString();

            amount = $scope.makeBigNumber(amount, decimals);

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
                    console.log(err);
                    $scope.errorModal.open();
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
                if (!$scope.account && ($scope.wallet.hwType !== "ledger")) {
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
                        data = tx;
                        tx.from = from;
                        if ($scope.wallet.hwType == "ledger") {
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
                    $scope.errorModal.open();
                }
            }

            if ($scope.transactionType == "scheduled") {

                let fromTime = getHexDate(convertDate($scope.sendAsset.fromTime));
                let tillTime = web3.fsn.consts.TimeForeverStr;

                if (!$scope.account && ($scope.wallet.hwType !== "ledger")) {
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
                        data = tx;
                        if ($scope.wallet.hwType == "ledger") {
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
                    $scope.errorModal.open();
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

                if ($scope.wallet.hwType == "trezor"){

                }
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
                amount = new BN(amount + "0".repeat(parseInt(decimals)));
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
                amount = new BN(amount + dec + "0".repeat(parseInt(declen)));
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
                $scope.errorModal.open();
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

            if ($scope.wallet.hwType == "trezor"){
                
            }

        }

        $scope.createAssetInit = function () {
            $scope.$eval(function () {
                $scope.assetCreate.assetName = '';
                $scope.assetCreate.assetSymbol = '';
                $scope.assetCreate.decimals = '';
                $scope.assetCreate.totalSupply = '';
                $scope.assetCreate.errorMessage = '';
            })
            $scope.createAssetModal.open();
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

            if (assetSymbol == '' || assetName == '' || decimals == '' || totalSupply == '') {
                $scope.assetCreate.errorMessage = 'One or more required fields are missing.';
                return null;
            }
            if (decimals > 15) {
                $scope.assetCreate.errorMessage = 'Decimals must be below 16.';
                return null;
            }
            if (assetSymbol.length > 4) {
                $scope.assetCreate.errorMessage = 'Asset Symbols maximum characters is 4.';
                return null;
            }

            if (totalSupply < 1 || totalSupply == undefined) {
                $scope.assetCreate.errorMessage = 'Please, fill in whole numbers for the total supply.';
                return null;
            }

            if (!$scope.account && ($scope.wallet.hwType !== "ledger")) {
                $scope.account = web3.eth.accounts.privateKeyToAccount($scope.toHexString($scope.wallet.getPrivateKey()));
            }

            let data = {};

            try {
                await web3.fsntx.buildGenAssetTx({
                    from: walletAddress,
                    name: assetName,
                    symbol: assetSymbol,
                    decimals: decimals,
                    total: totalSupply * power
                }).then((tx) => {
                    data = tx;
                    if ($scope.wallet.hwType == "ledger") {
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
            }

            catch (err) {
                $scope.errorModal.open();
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
                                txH = txHash;
                                console.log('txh here');
                                console.log(`${txH}`);
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
        }
        setInterval(function () {
            if (!$scope.tx || !$scope.wallet) {
                return
            }
            $scope.getAllFsnAssets();
            $scope.getTimeLockAssets();
        }, 7500);


        $scope.getTimeLockAssets = async function () {
            $scope.$eval(function () {
                $scope.hiddenTimeLockStates = JSON.parse(localStorage.getItem('hiddenTimeLocks'));
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

                for (let i = 0; i < timeLockList[asset]["Items"].length; i++) {
                    let startTimePosix = timeLockList[asset]["Items"][i]["StartTime"];
                    let endTimePosix = timeLockList[asset]["Items"][i]["EndTime"];
                    let startTime = timeLockList[asset]["Items"][i]["StartTime"] * 1000;
                    let endTime = timeLockList[asset]["Items"][i]["EndTime"] * 1000;
                    let currentDate = Math.floor(new Date().getTime() / 1000.0);

                    // Calculate the status of the Time Lock

                    // if the start and endtime are now and forever
                    if (startTimePosix === 0 && endTimePosix === 18446744073709552000) {
                        status = 'Available';
                        // if the start and end date in range of the current date
                    } else if (startTimePosix >= currentDate && endTimePosix >= currentDate) {
                        status = 'Active';
                    } else if (startTimePosix <= currentDate && endTimePosix >= currentDate) {
                        status = 'Active';
                    } else if (startTimePosix <= currentDate && endTimePosix <= currentDate) {
                        status = 'Expired'
                    }


                    // Set strings for dates
                    if (startTimePosix === 0) {
                        startTime = 'Now'
                    } else {
                        let a = new Date(timeLockList[asset]["Items"][i]["StartTime"] * 1000);

                        var month = a.getUTCMonth();
                        var day = a.getUTCDate();
                        var year = a.getUTCFullYear();

                        startTime = $scope.months[month] + ' ' + day + ', ' + year;

                    }
                    if (endTimePosix === 18446744073709552000) {
                        endTime = '∞ Forever';
                    } else {

                        let a = new Date(timeLockList[asset]["Items"][i]["EndTime"] * 1000);

                        var month = a.getUTCMonth();
                        var day = a.getUTCDate();
                        var year = a.getUTCFullYear();

                        endTime = $scope.months[month] + ' ' + day + ', ' + year;
                    }

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
                    "value": availableList[asset]["value"]
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
                    "value": activeList[asset]["value"]
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
            let accountData = uiFuncs.getTxData($scope);
            let walletAddress = accountData.from;
            let assetList = {};
            let assetList2 = [];
            let assetList3 = [];


            await web3.fsn.allAssets().then(function (res) {
                assetList = res;
            });

            let x = -1;

            for (let asset in assetList) {
                let id = assetList[asset]["ID"];
                let owner = assetList[asset]["Owner"];
                let owned = false;
                let assetBalance = '';

                await web3.fsn.getBalance(id, walletAddress).then(function (res) {
                    assetBalance = res;
                });

                owner === walletAddress ? owned = 'Created' : owned = '';

                if (assetBalance > 0.000000000001) {
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
                    "owner": assetList2[asset]["owner"]
                }
                await assetList3.push(data);
            }


            $scope.$apply(function () {
                $scope.assetListOwns = assetList3;
                $scope.assetListOwns = assetList3;
                $scope.assetListLoading = false;
            });

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
                    }
                    else {
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

    }
;
module.exports = sendTxCtrl;