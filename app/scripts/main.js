"use strict";
require("babel-polyfill");
require("./localStoragePolyfill");
var IS_CX = false;
if (typeof chrome != "undefined")
    IS_CX = chrome.windows === undefined ? false : true;
var angular = require("angular");
var angularTranslate = require("angular-translate");
var angularTranslateErrorLog = require("angular-translate-handler-log");
var angularSanitize = require("angular-sanitize");
var angularAnimate = require("angular-animate");
var bip39 = require("bip39");
var HDKey = require("hdkey");
var xssFilters = require("xss-filters");
window.xssFilters = xssFilters;
window.hd = {bip39: bip39, HDKey: HDKey};
var BigNumber = require("bignumber.js");
window.BigNumber = BigNumber;
var marked = require("./staticJS/customMarked");
window.marked = marked;
var ethUtil = require("ethereumjs-util");
ethUtil.crypto = require("crypto");
ethUtil.Tx = require("ethereumjs-tx");
ethUtil.scrypt = require("scryptsy");
ethUtil.uuid = require("uuid");
ethUtil.solidityCoder = require("./solidity/coder");
ethUtil.solidityUtils = require("./solidity/utils");
ethUtil.WAValidator = require("wallet-address-validator");
window.ethUtil = ethUtil;
var format = require("string-format");
window.format = format;
var browser = require("detect-browser");
window.browser = browser;
var Wallet = require("./myetherwallet");
window.Wallet = Wallet;
var Web3Wallet = require("./web3Wallet");
window.Web3Wallet = Web3Wallet;
var Token = require("./tokenlib");
window.Token = Token;
var globalFuncs = require("./globalFuncs");
window.globalFuncs = globalFuncs;
var uiFuncs = require("./uiFuncs");
window.uiFuncs = uiFuncs;
var etherUnits = require("./etherUnits");
window.etherUnits = etherUnits;
var ajaxReq = require("./ajaxReq");
window.ajaxReq = ajaxReq;
ajaxReq.type = 'ETH';
var nodes = require("./nodes");
window.nodes = nodes;
var ethFuncs = require("./ethFuncs");
window.ethFuncs = ethFuncs;
var Validator = require("./validator");
window.Validator = Validator;
var bity = require("./bity");
window.bity = bity;
var kyber = require("./kyber");
window.kyber = kyber;
var ens = require("./ens");
window.ens = ens;
var domainsale = require("./domainsale");
window.domainsale = domainsale;
var translate = require("./translations/translate.js");
if (IS_CX) {
    var cxFuncs = require("./cxFuncs");
    var punycode = require("punycode");
    var similarity = require("similarity");
    var levenshtein = require("levenshtein");
    var uniMap = require("unicode/category/Ll");
    var homoglyphs = require("./homoglyphs.json");
    window.cxHelpers = {};
    window.cxFuncs = cxFuncs;
    window.cxHelpers["punycode"] = punycode;
    window.cxHelpers["uniMap"] = uniMap;
    window.cxHelpers["homoglyphs"] = homoglyphs;
    window.cxHelpers["similarity"] = similarity;
    window.cxHelpers["levenshtein"] = levenshtein;
} else {
    var MewConnectEth = require("./staticJS/mewConnectEth");
    var MewConnect = require("@myetherwallet/mewconnect-web-client").Initiator;
    var ledger3 = require("./staticJS/ledger3");
    var ledgerEth = require("./staticJS/ledger-eth");
    var trezorConnect = require("trezor-connect").default;
    var digitalBitboxUsb = require("./staticJS/digitalBitboxUsb");
    var digitalBitboxEth = require("./staticJS/digitalBitboxEth");
    var secalotUsb = require("./staticJS/secalotUsb");
    var secalotEth = require("./staticJS/secalotEth");
    window.Ledger3 = ledger3;
    window.ledgerEth = ledgerEth;
    window.TrezorConnect = trezorConnect;
    window.DigitalBitboxUsb = digitalBitboxUsb;
    window.DigitalBitboxEth = digitalBitboxEth;
    window.SecalotUsb = secalotUsb;
    window.SecalotEth = secalotEth;
    window.MewConnectEth = MewConnectEth;
    window.MewConnect = MewConnect;
}
var CustomGasMessages = require("./customGas.js");
window.CustomGasMessages = CustomGasMessages;
var darkListConst = require("./constants/darkListConst");
var tabsCtrl = require("./controllers/tabsCtrl");
var viewCtrl = require("./controllers/viewCtrl");
var walletGenCtrl = require("./controllers/walletGenCtrl");
var onboardingCtrl = require("./controllers/onboardingCtrl");
var bulkGenCtrl = require("./controllers/bulkGenCtrl");
var decryptWalletCtrl = require("./controllers/decryptWalletCtrl");
window.decryptWallet = decryptWalletCtrl;
var viewWalletCtrl = require("./controllers/viewWalletCtrl");
var txStatusCtrl = require("./controllers/txStatusCtrl");
var sendTxCtrl = require("./controllers/sendTxCtrl");
var swapCtrl = require("./controllers/swapCtrl");
var signMsgCtrl = require("./controllers/signMsgCtrl");
var contractsCtrl = require("./controllers/contractsCtrl");
var ensCtrl = require("./controllers/ensCtrl");
var domainsaleCtrl = require("./controllers/domainsaleCtrl");
var footerCtrl = require("./controllers/footerCtrl");
var offlineTxCtrl = require("./controllers/offlineTxCtrl");
var walletBalanceCtrl = require("./controllers/walletBalanceCtrl");
window.walletBalanceCtrl = walletBalanceCtrl;
var helpersCtrl = require("./controllers/helpersCtrl");
var globalService = require("./services/globalService");
var walletService = require("./services/walletService");
var blockiesDrtv = require("./directives/blockiesDrtv");
var addressFieldDrtv = require("./directives/addressFieldDrtv");
var QRCodeDrtv = require("./directives/QRCodeDrtv");
var walletDecryptDrtv = require("./directives/walletDecryptDrtv");
var cxWalletDecryptDrtv = require("./directives/cxWalletDecryptDrtv");
var fileReaderDrtv = require("./directives/fileReaderDrtv");
var balanceDrtv = require("./directives/balanceDrtv");
if (IS_CX) {
    var addWalletCtrl = require("./controllers/CX/addWalletCtrl");
    var cxDecryptWalletCtrl = require("./controllers/CX/cxDecryptWalletCtrl");
    var myWalletsCtrl = require("./controllers/CX/myWalletsCtrl");
    var mainPopCtrl = require("./controllers/CX/mainPopCtrl");
    var quickSendCtrl = require("./controllers/CX/quickSendCtrl");
}
let Decimal = require('decimal.js');
window.Decimal = Decimal;
var Web3 = require("web3");
var web3FusionExtend = require('web3-fusion-extend');
window.web3FusionExtend = web3FusionExtend;
var provider;
var web3;
let localCacheOfAssets = {}

window.currentNet = '';
window.getApiServer = function () {
        return 'https://api.fusionnetwork.io'
}

window.__fsnDeleteAssetFromCache = async function (assetId) {
    delete localCacheOfAssets[assetId]
}

window.__fsnGetAsset = async function (assetId) {
    if (localCacheOfAssets[assetId]) {
        return localCacheOfAssets[assetId]
    }
    try {
        let array = [assetId]
        return await window.__fsnGetAllAssets(array).then(function (res) {
            window.__fsnGetAsset(assetId);
        });
    } catch (err) {
        console.log("fsnGetAsset Failed throwing this error => ", err);
        throw err
    }
};

let notation = {};

window.__getNotation = async function (walletAddress) {
    if (notation[walletAddress]) {
        return notation[walletAddress]
    }
    try {
        return await web3.fsn.getNotation(walletAddress).then(function (res) {
            notation[walletAddress] = res
            return notation[walletAddress];
        });
    } catch (err) {
        return 0;
        console.log("fsnGetAsset Failed throwing this error => ", err);
        throw err
    }
};

let _DEBUG = true;

window.log = function (message) {
    if(_DEBUG === true){
        console.log(`%c ${new Date().getHours()}:${new Date().getMinutes()} - ${message} `, 'background: #222; color: #bada55; padding:10px;');
    }
};
let lastGetAllAssetTime = undefined;
let lastAllGetAssets = undefined;

window.__fsnGetAllAssets = async function (array) {
    if (!lastGetAllAssetTime || (lastGetAllAssetTime + 7000) < (new Date()).getTime()) {
        let totalAssets = 0;
            await ajaxReq.http.get(`${window.getApiServer()}/fsnprice`).then(function (r) {
                let globalInfo = r.data;
                totalAssets = globalInfo.totalAssets;
                if(localCacheOfAssets.length == totalAssets){
                    return;
                }
                for(let i = 0; i < Math.ceil(totalAssets/100); i++){
                    ajaxReq.http.get(`${window.getApiServer()}/assets/all?page=${i}&size=100`).then(function (r) {
                        let assets = r.data;
                        for(let asset in assets){
                            let assetData = JSON.parse(r.data[asset].data);
                            localCacheOfAssets[assetData.AssetID] = assetData;
                            localCacheOfAssets[assetData.AssetID].ID = assetData.AssetID;
                            localCacheOfAssets[assetData.AssetID].Owner = r.data[asset].fromAddress;

                        }
                    });
                }
                localCacheOfAssets['0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'] = {
                    AssetID: "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
                    CanChange: false,
                    Decimals: 18,
                    Description: "",
                    ID: "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
                    Name: "FUSION",
                    Symbol: "FSN",
                    Total: 10000000000,
                }
                return localCacheOfAssets;
            });
    }
    if (!lastGetAllAssetTime || (lastGetAllAssetTime + 7000) < (new Date()).getTime()) {
        if (array) {
            try {
                for (let asset in array) {
                    if (!localCacheOfAssets[array[asset]]) {
                        window.log(`Looking up : ${array[asset]}`);
                        await ajaxReq.http.get(`${window.getApiServer()}/assets/${array[asset]}`).then(function (r) {
                            localCacheOfAssets['0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'] = {
                                AssetID: "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
                                CanChange: false,
                                Decimals: 18,
                                Description: "",
                                ID: "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
                                Name: "FUSION",
                                Symbol: "FSN",
                                Total: 10000000000,
                            }
                            let data = JSON.parse(r.data[0].data);
                            data.ID = data.AssetID;
                            localCacheOfAssets[array[asset]] = data;
                        })
                    } else {
                        // console.log(`Asset ${array[asset]} already in cache`)
                    }
                }
                lastGetAllAssetTime = (new Date()).getTime()
                return localCacheOfAssets
            } catch (err) {
                console.log("__fsnGetAllAssets Failed throwing this error => ", err);
                throw err
            }
        }
    }
    return localCacheOfAssets
}

let lastGetAllBalancesTime = undefined
let lastGetAllBalances = {};

window.__fsnGetAllBalances = async function (walletaddress) {
    if (!lastGetAllBalancesTime || (lastGetAllBalancesTime + 7000) < (new Date()).getTime()) {
        try {
            let allBalances = {};
            await ajaxReq.http.get(`${window.getApiServer()}/search/${walletaddress}`).then(function (r) {
                let data = JSON.parse(r.data.address[0].balanceInfo);
                allBalances = data.balances;
            });
            lastGetAllBalancesTime = (new Date()).getTime()
            lastGetAllBalances[walletaddress] = allBalances
            return allBalances
        } catch (err) {
            return {};
            console.log("__fsnGetAllBalances Failed throwing this error => ", err);
            throw err
        }
    }
    return lastGetAllBalances[walletaddress]
}

let lastGetAllTimeLockBalancesTime = undefined
let lastGetAllTimeLockBalances = {};

window.__fsnGetAllTimeLockBalances = async function (walletaddress) {
    if (!lastGetAllTimeLockBalances || !lastGetAllTimeLockBalancesTime || (lastGetAllTimeLockBalancesTime + 7000) < (new Date()).getTime()) {
        try {
            let allBalances = {}
            await ajaxReq.http.get(`${window.getApiServer()}/search/${walletaddress}`).then(function (r) {
                let data = JSON.parse(r.data.address[0].balanceInfo);
                allBalances = data.timeLockBalances;
            });
            lastGetAllTimeLockBalancesTime = (new Date()).getTime();
            lastGetAllTimeLockBalances[walletaddress] = allBalances
            return allBalances
        } catch (err) {
            return {};
            console.log("__fsnGetAllTimeLockBalances Failed throwing this error => ", err);
            throw err
        }
    }
    return lastGetAllTimeLockBalances[walletaddress]
}

let lastGetAllVerifiedAssetsTime = undefined
let lastGetAllVerifiedAssets = {};

window.__fsnGetAllVerifiedAssets = async function () {
    if (!lastGetAllVerifiedAssets || !lastGetAllVerifiedAssetsTime || (lastGetAllVerifiedAssetsTime + 7000) < (new Date()).getTime()) {
        try {
            let r = await ajaxReq.http.get(`${window.getApiServer()}/assets/verified`)
            let allVerifiedAssets = r.data;
            let keys = Object.keys(allVerifiedAssets)
            for (let k of keys) {
                lastGetAllVerifiedAssets[k] = allVerifiedAssets[k]
            }
            lastGetAllVerifiedAssetsTime = (new Date()).getTime()
            lastGetAllVerifiedAssets = allVerifiedAssets
            return allVerifiedAssets
        } catch (err) {
            return {};
            console.log("__fsnGetAllVerifiedAssets Failed throwing this error => ", err);
            throw err
        }
    }
    window.verifiedAssetsImages = lastGetAllVerifiedAssets;
    return lastGetAllVerifiedAssets
}

let cookieName = "gatewayURL1337";
let defaultGateway = "wss://mainnetpublicgateway1.fusionnetwork.io:10001";
let defaultChainId = 32659;
window.cookieName = cookieName;
window.defaultGateway = defaultGateway;
window.defaultChainId = defaultChainId;
var nodeUrl = localStorage.getItem(window.cookieName)
let data = nodeUrl ? JSON.parse(nodeUrl) : null

// Initialize cookie if there is non
if (data === null) {
    let data = {
        "url": window.defaultGateway,
        "chainid": window.defaultChainId
    }
    localStorage.setItem(window.cookieName, JSON.stringify(data));
}


function keepWeb3Alive() {
    let nu = localStorage.getItem(window.cookieName)
    let data = nu ? JSON.parse(nu) : {}
    // if the url is empty set standard gateway
    if (data.url == "") {
        nodeUrl = window.defaultGateway;
    } else {
        nodeUrl = data.url;
    }

    // Initialize Testnet/Mainnet
    if (nodeUrl == "wss://mainnetpublicgateway1.fusionnetwork.io:10001") {
        window.currentNet = 'mainnet'
    } else if (nodeUrl == "wss://gatewaypsn2w.fusionnetwork.io:10001") {
        window.currentNet = 'testnet'
    } else {
        window.currentNet = 'custom'
    }
//     provider = new Web3.providers.WebsocketProvider("ws://localhost:9001");
    try {
        provider = new Web3.providers.WebsocketProvider(nodeUrl);
    } catch (err) {
        alert(`Could not connect to node. Reverting back to default gateway.`);
        let data = {
            "url": window.defaultGateway
        }
        localStorage.setItem(window.cookieName, JSON.stringify(data));
        provider = new Web3.providers.WebsocketProvider(data.url);
    }

    provider.on("connect", function () {
        window.web3._isConnected = true;
    });
    provider.on("error", function (err) {
        provider.disconnect();
    });
    provider.on("end", function (err) {
        web3._isConnected = false;
        // console.log("web3 connection error ", err);
        // console.log("will try to reconnect");
        setTimeout(() => {
            keepWeb3Alive();
        }, 2);
    });
    web3 = new Web3(provider);
    web3 = window.web3FusionExtend.extend(web3);
    window.web3 = web3;
}

keepWeb3Alive();

var app = angular.module("mewApp", [
    "pascalprecht.translate",
    "ngSanitize",
    "ngAnimate",
]);

app.filter('startFrom', function () {
    return function (input, start) {
        if (typeof input === 'undefined') {
            return;
        } else {
            start = +start; //parse to int
            return input.slice(start);
        }
    }
});

app.config([
    "$compileProvider",
    function ($compileProvider) {
        $compileProvider.aHrefSanitizationWhitelist(
            /^\s*(|blob|https?|mailto|chrome-extension):/
        );
        $compileProvider.imgSrcSanitizationWhitelist(
            /^\s*(https?|local|data|file|chrome-extension):/
        );
    }
]);
app.config([
    "$translateProvider",
    function ($translateProvider) {
        $translateProvider.useMissingTranslationHandlerLog();
        new translate($translateProvider);
    }
]);
app.config([
    "$animateProvider",
    function ($animateProvider) {
        $animateProvider.classNameFilter(/^no-animate$/);
    }
]);
app.factory("globalService", [
    "$http",
    "$httpParamSerializerJQLike",
    globalService
]);
app.factory("walletService", walletService);
app.directive("blockieAddress", blockiesDrtv);
app.directive("addressField", ["$compile", "darkList", addressFieldDrtv]);
app.directive("qrCode", QRCodeDrtv);
app.directive("onReadFile", fileReaderDrtv);
app.directive("walletBalanceDrtv", balanceDrtv);
app.directive("walletDecryptDrtv", walletDecryptDrtv);
app.directive("cxWalletDecryptDrtv", cxWalletDecryptDrtv);
app.directive('numbersOnly', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, ngModelCtrl) {
            function fromUser(text) {
                if (text) {
                    let transformedInput = text.replace(/[^0-9]/g, '');

                    if (transformedInput !== text) {
                        ngModelCtrl.$setViewValue(transformedInput);
                        ngModelCtrl.$render();
                    }
                    return transformedInput;
                }
                return undefined;
            }

            ngModelCtrl.$parsers.push(fromUser);
        }
    };
});
app.directive('timepickerNeutralTimezone', function () {
    return {
        restrict: 'A',
        priority: 1,
        require: 'ngModel',
        link: function (scope, element, attrs, ctrl) {
            ctrl.$formatters.push(function (value) {
                if (typeof value === "undefined") {
                } else {
                    var date = new Date(Date.parse(value));
                    date = new Date(date.getTime() + (60000 * date.getTimezoneOffset()));
                    return date;
                }
            });

            ctrl.$parsers.push(function (value) {
                var date = new Date(value.getTime() - (60000 * value.getTimezoneOffset()));
                return date;
            });
        }
    };
});
app.constant("darkList", darkListConst);
app.controller("tabsCtrl", [
    "$scope",
    "globalService",
    "$translate",
    "$sce",
    tabsCtrl
]);
app.controller("viewCtrl", ["$scope", "globalService", "$sce", viewCtrl]);
app.controller("walletGenCtrl", ["$scope", walletGenCtrl]);
app.controller("bulkGenCtrl", ["$scope", bulkGenCtrl]);
app.controller("onboardingCtrl", ["$scope", onboardingCtrl]);
app.controller("decryptWalletCtrl", [
    "$scope",
    "$sce",
    "walletService",
    decryptWalletCtrl
]);
app.controller("viewWalletCtrl", ["$scope", "walletService", viewWalletCtrl]);
app.controller("txStatusCtrl", ["$scope", txStatusCtrl]);
app.controller("sendTxCtrl", [
    "$scope",
    "$sce",
    "walletService",
    "$rootScope",
    sendTxCtrl
]);
app.controller("swapCtrl", ["$scope", "$sce", "walletService", swapCtrl]);
app.controller("signMsgCtrl", ["$scope", "$sce", "walletService", signMsgCtrl]);
app.controller("contractsCtrl", [
    "$scope",
    "$sce",
    "walletService",
    contractsCtrl
]);
app.controller("ensCtrl", ["$scope", "$sce", "walletService", ensCtrl]);
app.controller("domainsaleCtrl", [
    "$scope",
    "$sce",
    "walletService",
    domainsaleCtrl
]);
app.controller("footerCtrl", ["$scope", "globalService", footerCtrl]);
app.controller("offlineTxCtrl", [
    "$scope",
    "$sce",
    "walletService",
    offlineTxCtrl
]);
app.controller("walletBalanceCtrl", [
    "$scope",
    "$sce",
    "walletService",
    "$rootScope",
    walletBalanceCtrl
]);

app.controller("helpersCtrl", ["$scope", helpersCtrl]);
if (IS_CX) {
    app.controller("addWalletCtrl", ["$scope", "$sce", addWalletCtrl]);
    app.controller("myWalletsCtrl", [
        "$scope",
        "$sce",
        "$timeout",
        "walletService",
        myWalletsCtrl
    ]);
    app.controller("mainPopCtrl", ["$scope", "$sce", mainPopCtrl]);
    app.controller("quickSendCtrl", [
        "$scope",
        "$sce",
        "darkList",
        quickSendCtrl
    ]);
    app.controller("cxDecryptWalletCtrl", [
        "$scope",
        "$sce",
        "walletService",
        cxDecryptWalletCtrl
    ]);
}
