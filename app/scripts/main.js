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
let verifiedList = require("./verifiedList.js");
window.verifiedList = verifiedList;
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
var erc20AlertCtrl = require("./controllers/erc20AlertCtrl");
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
let localCacheOfAssets = {};
const iplocate = require("node-iplocate");

window.versionNumber = '3.10.00';
window.currentNet = '';

window.locationCookie = 'locationCookie';
let location = JSON.parse(localStorage.getItem(window.locationCookie));
let lastKnownIp = JSON.parse(localStorage.getItem(window.lastKnownIp));
if (!location) {
    let k = {
        continent: '',
        country_code: ''
    };
    localStorage.setItem(window.locationCookie, JSON.stringify(k));
    location = k;
}
window.getLastKnownIp = async function () {
    await ajaxReq.http.get('https://ipinfo.io/json').then(function (response) {
        if (lastKnownIp === null || response.data.ip !== lastKnownIp.ip) {
            let ipData = {
                ip: response.data.ip
            };
            lastKnownIp = ipData;
            localStorage.setItem(window.lastKnownIp, JSON.stringify(ipData));
        }
    });
};

window.getLocation = async function () {
    await window.getLastKnownIp();
    if (lastKnownIp) {
        try {
            await iplocate(lastKnownIp.ip).then(function (results) {
                let data = {
                    continent: results.continent,
                    country_code: results.country_code
                };
                location = data;
                localStorage.setItem(window.locationCookie, JSON.stringify(data));
            });
        } catch ( err ){
            console.log(err + ', will use US as location.')
            let data = {
                continent: 'North America',
                country_code: 'US'
            };
            location = data;
            localStorage.setItem(window.locationCookie, JSON.stringify(data));
        }
    }
}

window.getApiServer = function () {
    if (window.currentNet === 'mainnet') {
        if (location.continent === 'Asia' && location.country_code === 'CN') {
            return 'https://asiaapi.fusionnetwork.io';
        } else {
            return 'https://mainnetapi.fusionnetwork.io';
        }
    } else if (window.currentNet === 'testnet') {
        if (location.continent === 'Asia' && location.country_code === 'CN') {
            return 'https://testnetasiaapi.fusionnetwork.io';
        } else {
            return 'https://testnetapi.fusionnetwork.io'
        }
    }
};

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
    if (_DEBUG === true) {
        console.log(`%c ${new Date().getHours()}:${new Date().getMinutes()} - ${message} `, 'background: #222; color: #bada55; padding:10px;');
    }
};
let lastGetAllAssetTime = undefined;
let lastAllGetAssets = undefined;
let inGetAllAsets = false;

let arrayOfResolvesForGetAllAssets = []
let arrayOfRejectsForGetAllAssets = []

function clearOutAssetPromises(retData, error) {
    let ar = arrayOfResolvesForGetAllAssets
    let arj = arrayOfRejectsForGetAllAssets

    arrayOfResolvesForGetAllAssets = []
    arrayOfRejectsForGetAllAssets = []

    for (let x = 0; x < ar.length; x++) {
        if (error) {
            arj[x](error)
        } else {
            ar[x](retData)
        }
    }
}

window.__fsnGetAllAssets = async function (array) {
    if (inGetAllAsets) {
        //console.log( "Oh chute we entered  get all assets again")
        return new Promise((resolve, reject) => {
            arrayOfResolvesForGetAllAssets.push(resolve)
            arrayOfRejectsForGetAllAssets.push(reject)
        })
    }
    inGetAllAsets = true
    if (!lastGetAllAssetTime || (lastGetAllAssetTime + 7500) < (new Date()).getTime()) {
        let totalAssets = 0;
        await ajaxReq.http.get(`${window.getApiServer()}/fsnprice`).then(function (r) {
            let globalInfo = r.data;
            totalAssets = globalInfo.totalAssets;
            if (localCacheOfAssets.length == totalAssets) {
                inGetAllAsets = false
                clearOutAssetPromises(null, null)
                return;
            }
            for (let i = 0; i < Math.ceil(totalAssets / 100); i++) {
                ajaxReq.http.get(`${window.getApiServer()}/assets/all?page=${i}&size=100`).then(function (r) {
                    let assets = r.data;
                    for (let asset in assets) {
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
                Total: 81920000000000000000000000,
            }
            localCacheOfAssets['0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe'] = {
                AssetID: "0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe",
                CanChange: false,
                Decimals: 0,
                Description: "",
                ID: "0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe",
                Name: "USAN",
                Symbol: "",
                Total: 0,
            }
            inGetAllAsets = false
            clearOutAssetPromises(localCacheOfAssets, null)
            return localCacheOfAssets;
        });
    }
    if (!lastGetAllAssetTime || (lastGetAllAssetTime + 7500) < (new Date()).getTime()) {
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
                                Total: 81920000000000000000000000,
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
                inGetAllAsets = false
                clearOutAssetPromises(localCacheOfAssets, null)
                return localCacheOfAssets
            } catch (err) {
                inGetAllAsets = false
                console.log("__fsnGetAllAssets Failed throwing this error => ", err);
                clearOutAssetPromises(null, err)
                throw err
            }
        }
    }
    inGetAllAsets = false
    clearOutAssetPromises(localCacheOfAssets, null)
    return localCacheOfAssets
}

let wallets = {}
let returnTime

function clearOutBalancesPromises(wallet, error, returnFullData) {
    let ar = wallet.arrayOfResolvesForBalances
    let arj = wallet.arrayOfRejectsForBalances
    let rt = wallet.returnTimeLock

    wallet.arrayOfRejectsForBalances = []
    wallet.arrayOfResolvesForBalances = []
    wallet.returnTimeLock = []

    for (let x = 0; x < ar.length; x++) {
        if (error) {
            arj[x](error)
        } else {
            if (returnFullData) {
                ar[x](wallet.data)
            } else {
                ar[x](rt[x] ? wallet.data.timeLockBalances : wallet.data.balances)
            }
        }
    }
}


window.__fsnGetAllBalances = async function (walletaddress, returnTimeLock = false, returnFullData = false) {
    if (!walletaddress) {
        return {}
    }
    let wallet = wallets[walletaddress];
    if (!wallet) {
        wallet = {
            data: null,
            inHere: false,
            arrayOfResolvesForBalances: [],
            arrayOfRejectsForBalances: [],
            returnTimeLock: []
        }
        wallets[walletaddress] = wallet
    }
    if (wallet.inHere) {
        wallet.inHere = true
        return new Promise((resolve, reject) => {
            wallet.arrayOfRejectsForBalances.push(reject)
            wallet.arrayOfResolvesForBalances.push(resolve)
            wallet.returnTimeLock.push(returnTimeLock)
        })
    }
    wallet.inHere = true
    if (!wallet.data ||
        !wallet.lastGetAllBalancesTime ||
        (wallet.lastGetAllBalancesTime + 7500) < (new Date()).getTime()) {
        try {
            let data
            await ajaxReq.http.get(`${window.getApiServer()}/search/${walletaddress}`).then(function (r) {
                data = JSON.parse(r.data.address[0].balanceInfo);
            });
            // cache the notation while we here
            wallet.lastGetAllBalancesTime = (new Date()).getTime()
            wallet.data = data
            wallet.inHere = false
            clearOutBalancesPromises(wallet, null, returnFullData)
            if (returnFullData) {
                return data
            }
            return returnTimeLock ? data.timeLockBalances : data.balances
        } catch (err) {
            wallet.inHere = false
            clearOutBalancesPromises(wallet, null, err)
            console.log("__fsnGetAllBalances Failed throwing this error => ", err);
            throw err
        }
    }
    wallet.inHere = false
    if (returnFullData) {
        return wallet.data
    }
    return returnTimeLock ? wallet.data.timeLockBalances : wallet.data.balances
}


window.__fsnGetAllTimeLockBalances = async function (walletaddress) {
    return window.__fsnGetAllBalances(walletaddress, true)
}

let lastGetAllVerifiedAssetsTime = undefined
let lastGetAllVerifiedAssets = {};

window.__fsnGetAllVerifiedAssets = async function () {
    // verify changes very very slowly as only
    // the asset gateway can only verifiy an asset
    // so this will rarely change
    // asking someone to do this every 2 minutes or on wallet refresh is fine
    //
    if (!lastGetAllVerifiedAssets || !lastGetAllVerifiedAssetsTime || (lastGetAllVerifiedAssetsTime + (2 * 60) * 1000) < (new Date()).getTime()) {
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
    } else if (nodeUrl == "wss://testnetpublicgateway1.fusionnetwork.io:10001") {
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
    "ui.bootstrap",
    "tw.directives.clickOutside"
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
app.config([
    "$provide",
    function ($provide) {
        $provide.decorator('$locale', function ($delegate) {
            var value = $delegate.DATETIME_FORMATS;

            value.SHORTDAY = [
                "SU",
                "M",
                "TU",
                "W",
                "TH",
                "F",
                "S"
            ];

            return $delegate;
        });
    }
]);
app.factory("globalService", [
    "$http",
    "$httpParamSerializerJQLike",
    globalService
]);
app.factory("walletService", walletService);
app.directive("blockieAddress", blockiesDrtv);
app.directive('clickOut', ['$window', '$parse', function ($window, $parse) {
    return {
        restrict: 'A',
        link: function ($scope, element, attrs) {
            var clickOutHandler = $parse(attrs.clickOut);
            // console.log(clickOutHandler);
            angular.element($window).on('click', function (event) {
                // let a = element[0].getAttribute('click-out');
                // // console.log(a);
                // if (element[0].contains(event.target)) {
                //     console.log('Inside..');
                // } else if (!element[0].contains(event.target)) {
                //     console.log('Outside..');
                //     $scope.$applyAsync($scope.outSideClickHandler(element[0].getAttribute('click-out')));
                // }
                // clickOutHandler($scope, {$event: event});
                // // console.log(event);
            });
        }
    };
}]);
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

app.directive('focus', function () {
    return {
        restrict: 'A',
        link: function ($scope, selem, attrs) {
            selem.bind('keydown', function (e) {
                var code = e.keyCode || e.which;
                if (code === 32) {
                    e.preventDefault();
                    if($scope.twelveIsSelected === true){
                        $scope.onMnemonicChange();
                    } else {
                        $scope.onSecondMnemonicChange();
                    }
                    var pageElems = document.querySelectorAll('input, select, textarea'),
                        elem = e.srcElement || e.target,
                        focusNext = false,
                        len = pageElems.length;
                    for (var i = 0; i < len; i++) {
                        var pe = pageElems[i];
                        if (focusNext) {
                            if (pe.style.display !== 'none') {
                                pe.focus();
                                break;
                            }
                        } else if (pe === elem) {
                            focusNext = true;
                        }
                    }
                }
            });
        }
    }
})
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
    "globalService",
    sendTxCtrl
]);
app.controller("erc20AlertCtrl", ["$scope", erc20AlertCtrl]);
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
