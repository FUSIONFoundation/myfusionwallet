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
ajaxReq.type='ETH';
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

var Web3 = require("web3");
var web3FusionExtend = require('web3-fusion-extend');
window.web3FusionExtend = web3FusionExtend;
var provider;
var web3;
let cookieName = "nodeUrl";
let defaultGateway = "wss://gatewayw.fusionnetwork.io:10001";
let defaultChainId = 88661;
window.cookieName = cookieName;
window.defaultGateway = defaultGateway;
window.defaultChainId = defaultChainId;
var nodeUrl = localStorage.getItem(window.cookieName)
let data = nodeUrl ? JSON.parse(nodeUrl) : null

// Initialize cookie if there is non
if (data === null){
    let data = {
        "url": window.defaultGateway,
        "chainid" : window.defaultChainId
    }
    localStorage.setItem(window.cookieName, JSON.stringify(data));
}


function keepWeb3Alive(){
    let nu = localStorage.getItem(window.cookieName)
    let data = nu ? JSON.parse(nu) : {}
    // if the url is empty set standard gateway
    if (data.url == ""){
        nodeUrl = window.defaultGateway;
    } else {
        nodeUrl = data.url;
    }

//     provider = new Web3.providers.WebsocketProvider("ws://localhost:9001");
    try {
        provider = new Web3.providers.WebsocketProvider(nodeUrl);
    } catch (err){
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
    "ngAnimate"
]);

app.filter('startFrom', function() {
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
