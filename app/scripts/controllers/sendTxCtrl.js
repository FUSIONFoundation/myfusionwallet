'use strict';

var sendTxCtrl = function ($scope, $sce, walletService, $rootScope) {

    $scope.$watch('wallet', function () {
        $scope.getAllFsnAssets();
        $scope.getTimeLockAssets();
    })

    let nu = localStorage.getItem('nodeUrl')
    let data = nu ? JSON.parse(nu) : {}
    let _CHAINID = 1;

    if (data.chainid !== "") {
        _CHAINID = data.chainid;
    } else {
        _CHAINID = 1;
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
    $scope.sendBackToAssetsModal = new Modal(document.getElementById('sendBackToAssetsModal'));
    $scope.changeSupplyReview = new Modal(document.getElementById('changeSupplyReview'));
    $scope.changeSupplySuccess = new Modal(document.getElementById('changeSupplySuccess'));
    $scope.manageAsset = new Modal(document.getElementById('manageAsset'));
    $scope.changeSupply = new Modal(document.getElementById('changeSupply'));
    $scope.errorModal = new Modal(document.getElementById('errorModal'));
    $scope.successModal = new Modal(document.getElementById('successModal'));
    $scope.lastId = 0;


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

    $scope.verifyWalletAddress = async function () {
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
                await web3.fsn.getAddressByNotation(parseInt(address)).then(function (res) {
                    console.log(res);
                })
                $scope.$eval(function () {
                    $scope.walletAddressError = false;
                    $scope.validWalletAddress = true;
                    $scope.checkingUSAN = false;
                })
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
        })
    }

    $scope.manageAssetOpen = async function (id) {
        $scope.lastId = id;

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
        };
        console.log($scope.manageAssetInfo);
        $scope.manageAsset.open();
    }


    $scope.changeSupplyOpen = async function (id) {

        if (id) {
            $scope.lastId = id
        }
        ;

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
            "distributed": distributed,
            "txhash" : ""
        };

        $scope.changeSupply.open();
    }

    $scope.changeSupplyReviewOpen = function () {
        let total = $scope.assetListOwns[$scope.lastId].total;
        let newts = $scope.newTotalSupply;

        if (newts > total) {
            $scope.incDecr = '+'
            $scope.changeSupplyState = 'increment';
        } else {
            $scope.incDecr = '';
            $scope.changeSupplyState = 'decrement';
        };
        let diff = newts - total;

        $scope.$eval(function () {
            $scope.totalSupplyDiff = $scope.incDecr + diff;
        })

        $scope.changeSupplyReview.open();
    }

    $scope.changeSupplyTx = async function(){
        let asset = $scope.assetListOwns[$scope.lastId];

        let accountData = uiFuncs.getTxData($scope);
        let walletAddress = accountData.from;

        if (!$scope.account && ($scope.wallet.hwType !== "ledger") && ($scope.wallet.hwType !== "trezor")) {
            $scope.account = web3.eth.accounts.privateKeyToAccount($scope.toHexString($scope.wallet.getPrivateKey()));
        }


        if($scope.changeSupplyState == 'increment'){
            // Get New Total Supply, create BN and create Hexadecimal
            let bal = $scope.newTotalSupply - $scope.assetListOwns[$scope.lastId].total;
            let newtotalSupplyString = bal.toString();
            let newtotalSupplyBN = $scope.makeBigNumber(newtotalSupplyString, asset.decimals);
            let newtotalSupplyBNHex = "0x" + newtotalSupplyBN.toString(16);

            let data = {
                "asset" : asset.contractaddress,
                "from" : walletAddress,
                "to" : walletAddress,
                "value" : newtotalSupplyBNHex
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
                            $scope.$eval(function(){
                                $scope.changeSupplyInfo.txhash = txHash;
                            })
                            $scope.changeSupplySuccess.open();
                        })
                    }
                });
            } catch (err) {
                console.log(err);
                $scope.errorModal.open();
            }
        }
        if($scope.changeSupplyState == 'decrement'){
            // Get New Total Supply, create BN and create Hexadecimal
            let bal = $scope.assetListOwns[$scope.lastId].total - $scope.newTotalSupply;
            let newtotalSupplyString = bal.toString();
            let newtotalSupplyBN = $scope.makeBigNumber(newtotalSupplyString, asset.decimals);
            let newtotalSupplyBNHex = "0x" + newtotalSupplyBN.toString(16);

            let data = {
                "asset" : asset.contractaddress,
                "from" : walletAddress,
                "to" : walletAddress,
                "value" : newtotalSupplyBNHex
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
                            $scope.$eval(function(){
                                $scope.changeSupplyInfo.txhash = txHash;
                            })
                            $scope.changeSupplySuccess.open();
                        })
                    }
                });
            } catch (err) {
                console.log(err);
                $scope.errorModal.open();
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
        let today = new Date();
        debugger
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
        if ($scope.wallet.hwType == "trezor") {

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
                $scope.errorModal.open();
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

            if ($scope.wallet.hwType == "trezor") {

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

        if ($scope.wallet.hwType == "trezor") {

        }

    }

    $scope.createAssetInit = function () {
        $scope.$eval(function () {
            $scope.assetCreate.canChange = false;
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


        if (!$scope.account && ($scope.wallet.hwType !== "ledger") && ($scope.wallet.hwType !== "trezor")) {
            $scope.account = web3.eth.accounts.privateKeyToAccount($scope.toHexString($scope.wallet.getPrivateKey()));
        }

        let totalSupplyString = totalSupply.toString()

        let totalSupplyBN = $scope.makeBigNumber(totalSupplyString, decimals);
        let totalSupplyBNHex = "0x" + totalSupplyBN.toString(16);

        let data = {
            from: walletAddress,
            name: assetName,
            symbol: assetSymbol,
            decimals: decimals,
            total: totalSupplyBNHex,
            canChange: $scope.assetCreate.canChange
        };

        try {
            await web3.fsntx.buildGenAssetTx(data).then((tx) => {
                tx.chainId = _CHAINID;
                data = tx;
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

        if ($scope.wallet.hwType == "trezor") {

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
                    "owner": owned,
                    "issuer": owner,
                    "canChange": assetList[asset]["CanChange"]
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
                "canChange": assetList2[asset]["canChange"]
            }
            await assetList3.push(data);
        }


        $scope.$apply(function () {
            $scope.assetListOwns = assetList3;
            $scope.assetListOwns = assetList3;
            $scope.assetListLoading = false;
        });

        console.log($scope.assetListOwns)

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

};
module.exports = sendTxCtrl;