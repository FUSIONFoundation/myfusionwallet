'use strict';

var ensCtrl = function ($scope, $sce, walletService, $rootScope) {
        $scope.init = function () {

        };
        $scope.tx = {};
        $scope.ajaxReq = ajaxReq;
        $scope.unitReadable = ajaxReq.type;
        walletService.wallet = null;
        walletService.password = '';

        var applyScope = function () {
            if (!$scope.$$phase) $scope.$apply();
        }

        var defaultInit = function () {
            globalFuncs.urlGet('sendMode') == null ? $scope.setSendMode('ether') : $scope.setSendMode(globalFuncs.urlGet('sendMode'));
            $scope.gasLimitChanged = globalFuncs.urlGet('gaslimit') != null ? true : false;
            $scope.showAdvance = globalFuncs.urlGet('gaslimit') != null || globalFuncs.urlGet('gas') != null || globalFuncs.urlGet('data') != null;
            if (globalFuncs.urlGet('data') || globalFuncs.urlGet('value') || globalFuncs.urlGet('to') || globalFuncs.urlGet('gaslimit') || globalFuncs.urlGet('sendMode') || globalFuncs.urlGet('gas') || globalFuncs.urlGet('tokensymbol')) $scope.hasQueryString = true // if there is a query string, show an warning at top of page
            $scope.init();

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

        $scope.$watch('ajaxReq.key', function () {
            if ($scope.wallet) {
                $scope.setSendMode('ether');
                $scope.wallet.setBalance(applyScope);
                $scope.wallet.setTokens();
            }
        });

        $scope.takeSwap = async function (){
            let password = walletService.password;
            let accountData = uiFuncs.getTxData($scope);
            let from = accountData.from;

            console.log(password);
            console.log(from);
        }
    }
;
module.exports = ensCtrl;
