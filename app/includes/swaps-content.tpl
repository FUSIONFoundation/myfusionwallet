<div class="block-transparent p-0">
    <div class="col float-left pl-0">
        <div class="gray-bg p-1 display-inline">
            <span class="small-gray-text">Public Address </span><span
                    class="small-gray-text text-fusion fusion-text-14 copy"
                    ng-click="copyToClipboard(walletAddress)">{{walletAddress}}</span>
        </div>
    </div>
    <div class="col float-left">
        <div class="gray-bg p-1 display-inline">
            <span class="small-gray-text">Short Address </span><span
                    class="small-gray-text text-fusion fusion-text-14 copy"
                    ng-click="copyToClipboard(addressNotation)">{{addressNotation}}</span>
        </div>
    </div>
    <div class="col float-left">
        <div class="gray-bg p-1 display-inline">
            <span class="small-gray-text">FSN Balance </span><span
                    class="small-gray-text text-fusion fusion-text-14 copy"
                    ng-click="copyToClipboard(web3WalletBalance)">{{web3WalletBalance}}</span>
        </div>
    </div>
</div>
<article class="block p-0" ng-hide="wallet.type=='addressOnly'">
    <div class="col-md-12 p-2 swap-border">
        <nav class="nav-container bg-white">
            <div class="nav-scroll">
                <ul class="nav-inner">
                    <li class="nav-item Swaps" ng-class="{active: showSwapMarket==true}">
                        <a class="ng-scope" ng-click="showSwapMarket = true ; showOpenMakes = false">Swap Market</a>
                    </li>
                    <li class="nav-item Swaps" ng-class="{active: showSwapMarket==false}">
                        <a class="ng-scope" ng-click="showSwapMarket = false ; showOpenMakes = true">Open Makes
                            ({{openMakeSwaps}})
                            <span></span></a>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
    <div class="col-md-12 p-2 swap-border" ng-show="showSwapMarket === true">
        <div class="col-md-3 text-left mr-0">
            <span class="small-gray-text">Send Assets</span>
            <br>
            <div class="col-md-12 col-xs-12 p-2 asset-dropdown border-gray-dropdown"
                 ng-click="sendDropDown = !sendDropDown">
                <div class="float-left w-75">
                    <a>
                        {{selectedSendAsset}} <span class="color-Active official-fusion-badge"
                                                    ng-show="selectedSendContract === '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'"><i
                                    class="fa fa-check-circle"></i> FSN Official</span>
                        <span class="small-gray-text max-char">{{selectedSendContract}}</span>

                    </a>
                </div>
                <div class="float-right text-right">
                    <img src="images/caret-down.svg" class="Group-6">
                </div>
            </div>
            <div class="dropdown-menu dropdown-menu fusion-text-14 p-2 higher-min-width" ng-show="sendDropDown">
                <form class="form-inline">
                    <div class="form-group m-0">
                        <input type="text" class="form-control"
                               ng-model="searchSendAsset"
                               placeholder="Search by Symbol, Name, or ID">
                    </div>
                </form>
                <div class="col-md-12 col-xs-12 p-2 asset-dropdown"
                     ng-repeat="asset in assetListOwned | filter:searchSendAsset track by $index">
                    <a ng-click="setSendAsset(asset.id)">
                        <span class="fusion-text-14">
                        {{asset.name}} ({{asset.symbol}}) <span class="color-Active official-fusion-badge"
                                                                ng-show="asset.contractaddress === '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'"><i
                                        class="fa fa-check-circle"></i> FSN Official</span>
                        <br>
                        <span class="small-gray-text max-char">{{asset.contractaddress}}</span>
                        </span>
                    </a>
                </div>
            </div>
        </div>
        <div class="col-md-1 text-center">
            <span class="small-gray-text"> </span>
            <br>
            <div>
                <button class="btn btn-sm btn-secondary btn-circle" ng-click="switchAsset()"><i class="fa fa-exchange"
                                                                                                aria-hidden="true"></i>
                </button>
            </div>
        </div>
        <div class="col-md-3 text-left">
            <span class="small-gray-text">Receive Asset</span>
            <br>
            <div class="col-md-12 col-xs-12 p-2 asset-dropdown border-gray-dropdown"
                 ng-click="receiveDropDown = !receiveDropDown">
                <div class="float-left w-75">
                    <a>
                        {{selectedReceiveAsset}} <span
                                class="color-Active official-fusion-badge"
                                ng-show="selectedReceiveContract === '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'"><i
                                    class="fa fa-check-circle"></i> FSN Official</span>
                        <span class="small-gray-text max-char">{{selectedReceiveContract}}</span>
                    </a>
                </div>
                <div class="float-right text-right">
                    <img src="images/caret-down.svg" class="Group-6">
                </div>
            </div>
            <div class="dropdown-menu dropdown-menu fusion-text-14 p-2 higher-min-width" ng-show="receiveDropDown">
                <form class="form-inline">
                    <div class="form-group m-0">
                        <input type="text" class="form-control"
                               ng-model="searchReceiveAsset"
                               placeholder="Search by Symbol, Name, or ID">
                    </div>
                </form>
                <div class="col-md-12 col-xs-12 p-2 asset-dropdown"
                     ng-repeat="asset in assetList | filter:searchReceiveAsset track by $index">
                    <a ng-click="setReceiveAsset(asset.id)">
                        <span class="fusion-text-14">
                        {{asset.name}} ({{asset.symbol}}) <span
                                    class="color-Active official-fusion-badge"
                                    ng-show="asset.contractaddress === '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'"><i
                                        class="fa fa-check-circle"></i> FSN Official</span>
                        <br>
                        <span class="small-gray-text max-char">{{asset.contractaddress}}</span>
                        </span>
                    </a>
                </div>
            </div>
        </div>
        <div class="col-md-3 text-left">
            <span class="small-gray-text">Asset Balance</span>
            <br>
            <div class="sendAssetBalanceAvailable w-50" ng-hide="selectedAssetBalance >= 0">
                <span class="small-gray-text ng-binding">Select asset first</span>
            </div>
            <div class="sendAssetBalanceAvailable display-web-inline-block" ng-show="selectedAssetBalance >= 0">
                <span class="text-fusion ng-binding"><strong class="font-size-16">{{selectedAssetBalance}}</strong> <span class="font-size-12">{{selectedAssetSymbol}}</span></span>
            </div>
        </div>
        <div class="col-md-2 text-left">
            <span class="small-gray-text"> </span>
            <br>
            <button class="btn btn-sm btn-primary" ng-click="makeModal()">Make Swap</button>
        </div>
    </div>
    <div class="col-md-12 pl-0 pr-0">
        <div class="panel panel-default" ng-show="showSwapMarket === false">
            <div class="panel-body">
                <div class="text-center" ng-show="openMakeSwaps == 0 && !showLoader"><span
                            class="small-gray-text">No Open Swaps</span></div>
                <div class="col-md-12 text-center p-5" ng-show="showLoader">
                    <i class="fa fa-circle-o-notch fa-spin fa-fw"></i>
                    <br>
                    <span class="small-gray-text">Loading Swaps...</span>
                </div>
                <table class="table" ng-show="openMakeSwaps != 0 && !showLoader">
                    <thead>
                    <tr class="small-gray-table">
                        <th class="text-left" scope="col"></th>
                        <th class="text-left" scope="col">Time Initiated</th>
                        <th class="text-right" scope="col">Send</th>
                        <th class="text-right" scope="col">Receive</th>
                        <th class="text-right" scope="col">Swap Rate</th>
                        <th class="text-right" scope="col">Minimum Swap</th>
                        <th class="text-right" scope="col" class="float-right">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr ng-repeat="asset in swapsList | filter: { owned: 'true' } track by $index">
                        <td class="text-left">
                            <span class="gray-bg-2 font-size-12 p-1 targes-border">
                              <i class="fa fa-globe" aria-hidden="true" ng-hide="asset.targes=='Private'"></i>
                              <i class="fa fa-lock" aria-hidden="true" ng-hide="asset.targes=='Public'"></i>
                                {{asset.targes}}
                            </span>
                        </td>
                        <td class="text-left">{{asset.time}}</td>
                        <td class="text-right"><strong>{{asset.fromAmount}}</strong> {{asset.fromAssetSymbol}} <span
                                    class="color-Active official-fusion-badge"
                                    ng-show="asset.fromAssetId === '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'"><i
                                        class="fa fa-check-circle"></i> FSN Official</span>
                            <br>
                            <span class="small-gray-text" ng-hide="asset.FromStartTime == 0 && asset.FromEndTime == 18446744073709552000">
                                <img class="mr-2" src="images/sendtl.svg" width="12px">{{asset.FromStartTimeString}} - {{asset.FromEndTimeString}}
                            </span>
                        </td>
                        <td class="text-right" ><strong>{{asset.toAmount}}</strong> {{asset.toAssetSymbol}}
                            <span
                                    class="color-Active official-fusion-badge"
                                    ng-show="asset.toAssetId === '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'"><i
                                        class="fa fa-check-circle"></i> FSN Official</span>
                            <br>
                            <span class="small-gray-text" ng-hide="asset.ToStartTime == 0 && asset.ToEndTime == 18446744073709552000">
                                <img class="mr-2" src="images/sendtl.svg" width="12px">{{asset.ToStartTimeString}} - {{asset.ToEndTimeString}}
                            </span>
                        </td>
                        <td class="text-right" ><strong>{{asset.swaprate}}</strong> {{asset.fromAssetSymbol}}</td>
                        <td class="text-right" ><strong>{{asset.minswap}}</strong> {{asset.fromAssetSymbol}}</td>
                        <td class="float-right text-right">
                            <div ng-hide="asset.owned == false">
                                <button class="btn btn-sm btn-white m-0" ng-click="recallModal(asset.swap_id)">Recall
                                    Swap
                                </button>
                                <button class="btn btn-sm btn-white m-0"
                                        ng-click="swapInformationModalOpen(asset.swap_id)"><i class="fa fa-info"
                                                                                              aria-hidden="true"></i>
                                </button>
                            </div>
                            <div ng-hide="asset.owned == true">
                                <button class="btn btn-sm btn-white m-0"
                                        ng-click="takeModal(asset.id)"
                                        ng-disabled="allBalance[asset.id] < asset.minswap"
                                >Take Swap
                                </button>
                                <button class="btn btn-sm btn-white m-0"
                                        ng-click="swapInformationModalOpen(asset.swap_id)"><i class="fa fa-info"
                                                                                              aria-hidden="true"></i>
                                </button>
                            </div>

                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="panel panel-default" ng-show="showSwapMarket === true">
            <div class="panel-body">
                <tr class="col-md-12 p-0">
                    <div class="col-md-12 p-0">
                        <div class="float-left">
                            <div class="col-md-12">
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="btn btn-sm btn-white col-md-12 col-xs-12 p-1 asset-dropdown border-gray-dropdown higher-min-width"
                                             ng-click="sortByDropdown = !sortByDropdown">
                                            <div class="float-left w-75">
                                                <span>Sort By: {{sortByString}}</span>
                                            </div>
                                            <div class="float-right text-right">
                                                <img src="images/caret-down.svg" class="Group-6">
                                            </div>
                                        </div>
                                        <div class="dropdown-menu dropdown-menu fusion-text-14 p-2 higher-min-width form-control-static"
                                             ng-show="sortByDropdown">
                                            <div class="col-md-12 col-xs-12 p-2 asset-dropdown"
                                                 ng-click="sortSwapMarket('time'); sortByDropdown = !sortByDropdown; sortByString = 'Closest time initiated'">
                                                Closest time initiated
                                            </div>
                                            <div class="col-md-12 col-xs-12 p-2 asset-dropdown"
                                                 ng-click="sortSwapMarket('fromAmount'); sortByDropdown = !sortByDropdown; sortByString = 'Highest Send Amount'">
                                                Highest Send Amount
                                            </div>
                                            <div class="col-md-12 col-xs-12 p-2 asset-dropdown"
                                                 ng-click="sortSwapMarket('toAmount'); sortByDropdown = !sortByDropdown; sortByString = 'Highest Receive Amount'">
                                                Highest Receive Amount
                                            </div>
                                            <div class="col-md-12 col-xs-12 p-2 asset-dropdown"
                                                 ng-click="sortSwapMarket('swaprate'); sortByDropdown = !sortByDropdown; sortByString = 'Best Swap Rate'">
                                                Best Swap Rate
                                            </div>
                                            <div class="col-md-12 col-xs-12 p-2 asset-dropdown"
                                                 ng-click="sortSwapMarket('minswap'); sortByDropdown = !sortByDropdown; sortByString = 'Highest Min Swap'">
                                                Highest Min Swap
                                            </div>
                                            <div class="col-md-12 col-xs-12 p-2 asset-dropdown"
                                                 ng-click="sortSwapMarket('owner'); sortByDropdown = !sortByDropdown; sortByString = 'Swap Owner'">
                                                Swap Owner
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <form class="form-inline">
                                            <div class="form-group">
                                                <input type="text" ng-model="searchSwapMarket" class="form-control m-0"
                                                       placeholder="Search">
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="float-right">
                        <div class="col-md-12">
                            <form class="form-group form-inline">
                                    <span class="small-gray-text text-fusion pr-2"><strong>Rows</strong> {{shownRows}}
                                        of {{swapsList.length}}</span>
                                <span class="small-gray-text">
                                        {{currentPage+1}} of {{endPage}}</span>
                                <span class="small-gray-text m-1"
                                      ng-click="firstPage()"><i class="fa fa-angle-double-left"
                                                                aria-hidden="true"></i>
                                </span>
                                <span class="small-gray-text pl-1 pr-1 m-1"
                                      ng-click="previousPage()"><i class="fa fa-angle-left" aria-hidden="true"></i>
                                </span>
                                <span class="small-gray-text pl-1 pr-1 m-1"
                                      ng-click="nextPage()"><i class="fa fa-angle-right" aria-hidden="true"></i>
                                </span>
                                <span class="small-gray-text m-1"
                                      ng-click="lastPage()"><i class="fa fa-angle-double-right"
                                                               aria-hidden="true"></i>
                                </span>
                            </form>
                        </div>
                    </div>
                </tr>
                <div class="col-md-12 text-center p-5" ng-show="showLoader">
                    <i class="fa fa-circle-o-notch fa-spin fa-fw"></i>
                    <br>
                    <span class="small-gray-text">Loading Swaps...</span>
                </div>
                <table class="table" ng-show="!showLoader">
                    <thead>
                    <tr class="small-gray-table">
                        <th class="text-left" scope="col"></th>
                        <th class="text-left" scope="col" ng-click="sortSwapMarket('time')">Time Initiated</th>
                        <th class="text-right" scope="col" ng-click="sortSwapMarket('fromAmount')">Send</th>
                        <th class="text-right" scope="col" ng-click="sortSwapMarket('toAmount')">Receive</th>
                        <th class="text-right" scope="col" ng-click="sortSwapMarket('swaprate')">Swap Rate</th>
                        <th class="text-right" scope="col" ng-click="sortSwapMarket('minswap')">Minimum Swap</th>
                        <th class="text-right" scope="col" class="float-right">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr ng-repeat="asset in swapsList | orderBy:sortKey:reverse |filter:searchSwapMarket | startFrom:currentPage*pageSize | limitTo:pageSize track by $index">
                        <td class="text-left">
                            <span class="gray-bg-2 font-size-12 p-1 targes-border">
                              <i class="fa fa-globe" aria-hidden="true" ng-hide="asset.targes=='Private'"></i>
                              <i class="fa fa-lock" aria-hidden="true" ng-hide="asset.targes=='Public'"></i>
                                {{asset.targes}}
                            </span>
                            </td>
                        <td class="text-left">{{asset.time}}</td>
                        <td class="text-right"><strong>{{asset.toAmount}}</strong> <span class="font-size-12">{{asset.toAssetSymbol}}</span>
                            <span
                                    class="color-Active official-fusion-badge"
                                    ng-show="asset.toAssetId === '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'"><i
                                        class="fa fa-check-circle"></i> FSN Official</span>
                            <br>
                            <span class="small-gray-text" ng-hide="asset.ToStartTime == 0 && asset.ToEndTime == 18446744073709552000">
                                <img class="mr-2" src="images/sendtl.svg" width="12px">{{asset.ToStartTimeString}} - {{asset.ToEndTimeString}}
                            </span>
                        </td>
                        <td class="text-right"><strong>{{asset.fromAmount}}</strong> <span>{{asset.fromAssetSymbol}}</span>
                            <span
                                    class="color-Active official-fusion-badge"
                                    ng-show="asset.fromAssetId === '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'"><i
                                        class="fa fa-check-circle"></i> FSN Official</span>
                            <br>
                            <span class="small-gray-text" ng-hide="asset.FromStartTime == 0 && asset.FromEndTime == 18446744073709552000">
                                <img class="mr-2" src="images/sendtl.svg" width="12px">{{asset.FromStartTimeString}} - {{asset.FromEndTimeString}}
                            </span>
                        </td>
                        <td class="text-right"><strong>{{asset.swapratetaker}}</strong> <span class="font-size-12">{{asset.toAssetSymbol}}</span></td>
                        <td class="text-right"><strong>{{asset.minswaptaker}}</strong> <span class="font-size-12">{{asset.toAssetSymbol}}</span></td>
                        <td class="float-right text-right">
                            <div ng-hide="asset.owned == false">
                                <button class="btn btn-sm btn-white m-0" ng-click="recallModal(asset.swap_id)">
                                    Recall
                                    Swap
                                </button>
                                <button class="btn btn-sm btn-white m-0"
                                        ng-click="swapInformationModalOpen(asset.swap_id)"><i class="fa fa-info"
                                                                                              aria-hidden="true"></i>
                                </button>
                            </div>
                            <div ng-hide="asset.owned == true">
                                <button class="btn btn-sm btn-white m-0"
                                        ng-click="takeModal(asset.id)"
                                        ng-disabled="allBalance[asset.toAssetId] < asset.minswaptaker"
                                >Take Swap
                                </button>
                                <button class="btn btn-sm btn-white m-0"
                                        ng-click="swapInformationModalOpen(asset.swap_id)"><i class="fa fa-info"
                                                                                              aria-hidden="true"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <article class="modal fade" id="recallAsset" tabindex="-1">
        <section class="modal-dialog send-asset-dialog">
            <section class="modal-content">
                <article class="block" ng-hide="wallet.type=='addressOnly'">
                    <div class="col-md-12 p-0">
                        <div class="float-right">
                                  <span class="gray-text" ng-click="recallAssetModal.close();">                    <i
                                              class="fa fa-times"
                                              aria-hidden="true"></i>
</span>
                        </div>
                    </div>
                    <h3 class="h3-blue">Recall Swap</h3>

                    <div class="col-sm-12 clearfix error-red pt-2 pb-2 text-white text-center mb-3"
                         ng-show="web3WalletBalance <= 0">
                        <i class="fa fa-exclamation-triangle" aria-hidden="true"></i> <span
                                class="font-size-12 text-white">You are unable to take this swap. You do not have enough funds.</span>
                    </div>

                    <p>Are you sure you want to remove this swap? If recalled, this swap will be pulled from the
                        swap
                        market with the next block.</p>

                    <div class="row">
                        <div class="col-lg-offset-6 float-right">
                            <button class="btn btn-sm btn-secondary" ng-click="recallAssetModal.close()">Keep Swap
                            </button>
                            <button class="btn btn-sm btn-primary btn-red" ng-click="recallSwap(recallAssetId)">
                                Recall
                                Swap
                            </button>
                        </div>
                    </div>
                </article>
            </section>
        </section>
    </article>
    <article class="modal fade" id="takeSwap" tabindex="-1">
        <section class="modal-dialog send-asset-dialog">
            <section class="modal-content">
                <article class="block" ng-hide="wallet.type=='addressOnly'">
                    <div class="col-md-12 p-0">
                        <div class="float-right">
                                  <span class="gray-text" ng-click="takeSwapModal.close();">                    <i
                                              class="fa fa-times"
                                              aria-hidden="true"></i>
</span>
                        </div>
                    </div>
                    <h3 class="h3-blue">Take Swap</h3>

                    <div class="row gray-bg-jumbo p-2 mb-2 mt-2">
                        <div class="col-md-6 small-gray-text">
                            Funds Available
                        </div>
                        <div class="col-md-6">
                            <div class="float-right">
                                <span class="fusion-text-18">{{takeDataFront.fromAssetBalance}}</span>
                                <span class="fusion-text-12">{{takeDataFront.fromAssetSymbol}}</span>
                            </div>
                        </div>
                    </div>

                    <div class="row gray-bg-jumbo p-2 mb-2 mt-2">
                        <div class="col-md-4 small-gray-text">
                            You will be sending
                        </div>
                        <div class="col-md-8">
                            <div class="float-right">
                                <span class="mr-1"><span
                                            class="small-gray-text">Min Amount</span>
                                    <span class="fusion-text-18">{{takeDataFront.fromAssetMin}}</span>
                                    <span class="fusion-text-12">{{takeDataFront.fromAssetSymbol}}</span>
                                </span>
                                <span class="ml-1"><span
                                            class="small-gray-text">Max Amount</span>
                                                <span class="fusion-text-18">{{takeDataFront.maxAmount}}</span>
                                        <span class="fusion-text-12">{{takeDataFront.fromAssetSymbol}}</span>
                                        </span>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="float-right">
                                <input type="number" class="form-control m-0 mt-1" ng-model="takeAmountSwap"
                                       max="{{takeDataFront.maxAmount}}"
                                       ng-change="setReceive()" placeholder="Amount">
                                <a class="small-gray-text float-right text-lightblue mt-1"
                                   ng-click="setMaxTakeSwap()">Max Amount</a>
                            </div>
                        </div>
                    </div>

                    <div class="row gray-bg-jumbo p-2 mb-2 mt-2">
                        <div class="col-md-6 small-gray-text">
                            You will be receiving
                        </div>
                        <div class="col-md-6">
                            <div class="float-right">
                                <span class="fusion-text-18"><strong>{{receiveTokens}}</strong></span>
                                <span class="fusion-text-12">{{takeDataFront.toAssetSymbol}}</span>
                            </div>
                        </div>
                    </div>

                    <div class="row gray-bg-jumbo p-2 mb-2 mt-2">
                        <div class="col-md-6 small-gray-text">
                            Swap Rate
                        </div>
                        <div class="col-md-6">
                            <div class="float-right">
                                <span class="fusion-text-18"><strong>{{takeDataFront.swapRate}}</strong></span>
                                <span class="fusion-text-12">{{takeDataFront.fromAssetSymbol}}</span> :
                                <span class="fusion-text-18"><strong>1</strong></span>
                                <span class="fusion-text-12">{{takeDataFront.toAssetSymbol}}</span>

                            </div>
                        </div>
                    </div>

                    <div class="col-sm-12 clearfix error-red pt-2 pb-2 text-white text-center mb-3"
                         ng-show="takeAmountSwap > takeDataFront.fromAssetBalance || takeDataFront.maxAmount > takeDataFront.fromAssetBalance || web3WalletBalance <= 0">
                        <i class="fa fa-exclamation-triangle" aria-hidden="true"></i> <span
                                class="font-size-12 text-white">You are unable to take this swap. You do not have enough funds.</span>
                    </div>

                    <div class="row">
                        <div class="col-md-6 p-0 pr-2">
                            <button class="btn btn-white w-100" ng-click="takeSwapModal.close()">Cancel</button>
                        </div>
                        <div class="col-md-6 p-0 pl-2">
                            <button class="btn btn-primary w-100"
                                    ng-click="takeSwapConfirm.open()"
                                    ng-disabled="takeAmountSwap > takeDataFront.fromAssetBalance || takeDataFront.fromAssetBalance <= 0">Take Swap
                            </button>
                        </div>
                    </div>
                </article>
            </section>
        </section>
    </article>
    <article class="modal fade" id="makeSwap" tabindex="-1">
        <section class="modal-dialog send-asset-dialog">
            <section class="modal-content">
                <article class="block" ng-hide="wallet.type=='addressOnly'">
                    <div class="col-md-12 p-0">
                        <div class="float-right">
                                  <span class="gray-text" ng-click="makeSwapModal.close();">                    <i
                                              class="fa fa-times"
                                              aria-hidden="true"></i>
</span>
                        </div>
                    </div>
                    <h3 class="h3-blue">Make Swap</h3>
                    <div class="col-md-12 text-left p-0">
                        <span class="small-gray-text">Send Assets</span>
                        <br>
                        <div class="col-md-12 col-xs-12 p-2 asset-dropdown border-gray-dropdown"
                             ng-click="sendDropDown = !sendDropDown">
                            <a>
                                {{selectedSendAsset}}
                                <span class="small-gray-text max-char">{{selectedSendContract}}</span>
                            </a>
                        </div>
                        <div class="dropdown-menu dropdown-menu fusion-text-14 p-2 higher-min-width"
                             ng-show="sendDropDown">
                            <form class="form-inline">
                                <div class="form-group m-0">
                                    <span class="small-gray-text">Search</span>
                                    <input type="text" class="form-control"
                                           ng-model="searchSendAsset"
                                           placeholder="Search by Symbol, Name, or ID">
                                </div>
                            </form>
                            <div class="col-md-12 col-xs-12 p-2 asset-dropdown"
                                 ng-repeat="asset in assetListOwned | filter:searchSendAsset track by $index">
                                <a ng-click="setSendAsset(asset.id)">
                        <span class="fusion-text-14">
                        {{asset.name}} ({{asset.symbol}})
                        <br>
                        <span class="small-gray-text max-char">{{asset.contractaddress}}</span>
                        </span>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-12 p-0 text-left">
                        <span class="small-gray-text">Receive Asset</span>
                        <br>
                        <div class="col-md-12 col-xs-12 p-2 asset-dropdown border-gray-dropdown"
                             ng-click="receiveDropDown = !receiveDropDown">
                            <a>
                                {{selectedReceiveAsset}}
                                <span class="small-gray-text max-char">{{selectedReceiveContract}}</span>
                            </a>
                        </div>
                        <div class="dropdown-menu dropdown-menu fusion-text-14 p-2 higher-min-width"
                             ng-show="receiveDropDown">
                            <form class="form-inline">
                                <div class="form-group m-0">
                                    <span class="small-gray-text">Search</span>
                                    <input type="text" class="form-control"
                                           ng-model="searchReceiveAsset"
                                           placeholder="Search by Symbol, Name, or ID">
                                </div>
                            </form>
                            <div class="col-md-12 col-xs-12 p-2 asset-dropdown"
                                 ng-repeat="asset in assetList | filter:searchReceiveAsset track by $index">
                                <a ng-click="setReceiveAsset(asset.id)">
                        <span class="fusion-text-14">
                        {{asset.name}} ({{asset.symbol}})
                        <br>
                        <span class="small-gray-text max-char">{{asset.contractaddress}}</span>
                        </span>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-12 p-0">
                        <h3 class="h3-blue">Enter Swap Details</h3>
                        <div class="sendAssetBalanceAvailable w-50" ng-show="selectedAssetBalance >= 0">
                            <span class="text-fusion ng-binding">{{selectedAssetBalance}}</span><span
                                    class="small-gray-text"> available.</span>
                        </div>
                    </div>

                    <div class="row m-0">
                        <div class="col-md-6 p-0">
                            <span class="small-gray-text">Send Amount</span>
                            <input type="text" class="form-control m-0 mt-1" ng-model="makeSendAmount"
                                   placeholder="Amount">
                        </div>
                        <div class="col-md-6 pl-2">
                            <span class="small-gray-text" style="color:white;">_<br></span>
                            <button class="btn btn-sm btn-primary m-0 mt-1" ng-click="showTimeLockSend = !showTimeLockSend">Set
                                Time-lock
                            </button>
                            <div ng-show="showTimeLockSend">
                                <div class="col-md-6 p-0 pb-2">
                                    <button class="btn btn-sm btn-white w-100"
                                            ng-click="sendTimeLock ='scheduled'"
                                            ng-class="{'time-active' : sendTimeLock == 'scheduled'}"
                                    >
                                        Date to Forever
                                    </button>
                                </div>
                                <div class="col-md-6 p-0 pb-2">
                                    <button class="btn btn-sm btn-white w-100"
                                            ng-click="sendTimeLock ='daterange'"
                                            ng-class="{'time-active' : sendTimeLock == 'daterange'}"
                                    >
                                        Now to Date
                                    </button>
                                </div>
                            </div>
                            <div ng-show="sendTimeLock == 'scheduled' || sendTimeLock == 'daterange'">
                                <div class="col-md-12 p-0">
                                        <span class="small-gray-text">
                                    From
                            </span>
                                    <br>
                                    <input class="form-control"
                                           type="date"
                                           ng-change="checkDate()"
                                           min="{{todayDate}}"
                                           onkeydown="return false"
                                           ng-model="fromStartTime">
                                </div>
                                <div class="col-md-12 p-0">
                                    <span class="small-gray-text" ng-show="sendTimeLock == 'scheduled'">Until</span>
                                    <div class="col-md-12 p-0" ng-show="sendTimeLock == 'scheduled'">
                                        <span class="b-form small-gray-text text-fusion fusion-text-14 p-1">∞ Forever</span>
                                    </div>
                                    <div class="col-md-12 p-0" ng-hide="sendTimeLock == 'scheduled'">
                                            <span class="small-gray-text">
                                                 Until
                                            </span>
                                        <input class="form-control"
                                               type="date"
                                               ng-change="checkDate()"
                                               min="{{todayDate}}"
                                               onkeydown="return false"
                                               ng-model="fromEndTime">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row m-0">
                        <div class="col-md-6 p-0">
                            <span class="small-gray-text">Receive Amount</span>
                            <input type="text" class="form-control m-0 mt-1" ng-model="makeReceiveAmount"
                                   placeholder="Amount">
                        </div>
                        <div class="col-md-6 pl-2">
                            <span class="small-gray-text" style="color:white;">_<br></span>
                            <button class="btn btn-sm btn-primary m-0 mt-1" ng-click="showTimeLockReceive = !showTimeLockReceive">Set
                                Time-lock
                            </button>
                            <div ng-show="showTimeLockReceive">
                                <div class="col-md-6 p-0 pb-2">
                                    <button class="btn btn-sm btn-white w-100"
                                            ng-click="receiveTimeLock ='scheduled'"
                                            ng-class="{'time-active' : receiveTimeLock == 'scheduled'}"
                                    >
                                        Date to Forever
                                    </button>
                                </div>
                                <div class="col-md-6 p-0 pb-2">
                                    <button class="btn btn-sm btn-white w-100"
                                            ng-click="receiveTimeLock ='daterange'"
                                            ng-class="{'time-active' : receiveTimeLock == 'daterange'}"
                                    >
                                        Now to Date
                                    </button>
                                </div>
                            </div>
                            <div ng-show="receiveTimeLock == 'scheduled' || receiveTimeLock == 'daterange'">
                                <div class="col-md-12 p-0">
                                        <span class="small-gray-text">
                                    From
                            </span>
                                    <br>
                                    <input class="form-control"
                                           type="date"
                                           ng-change="checkDate()"
                                           min="{{todayDate}}"
                                           onkeydown="return false"
                                           ng-model="ToStartTime">
                                </div>
                                <div class="col-md-12 p-0">
                                    <span class="small-gray-text" ng-show="receiveTimeLock == 'scheduled'">Until</span>
                                    <div class="col-md-12 p-0" ng-show="receiveTimeLock == 'scheduled'">
                                        <span class="b-form small-gray-text text-fusion fusion-text-14 p-1">∞ Forever</span>
                                    </div>
                                    <div class="col-md-12 p-0" ng-hide="receiveTimeLock == 'scheduled'">
                                            <span class="small-gray-text">
                                                 Until
                                            </span>
                                        <input class="form-control"
                                               type="date"
                                               ng-change="checkDate()"
                                               min="{{todayDate}}"
                                               onkeydown="return false"
                                               ng-model="ToEndTime">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-12 p-0">
                        <span class="small-gray-text">Maximum Number of Swaps</span>
                        <input type="text" class="form-control m-0 mt-1 pb-2" ng-model="makeMinumumSwap"
                               placeholder="Amount">
                    </div>
                    <div class="col-md-12 p-0">
                        <h3 class="h3-blue">Swap Rate</h3>
                        <div class="col-md-6 p-0">
                            <div class="row">
                                <div class="col-md-5 pl-3">
                                    <input type="text" class="form-control m-0 mt-1" ng-model="makeSendAmount"
                                           placeholder="Amount"> <span
                                            class="small-gray-text">{{selectedSendAsset}}</span>
                                </div>
                                <div class="col-md-1 pt-2">
                                    <h3 class="h3-blue p-0 m-0 text-center">:</h3>
                                </div>
                                <div class="col-md-5 pr-3">
                                    <input type="text" class="form-control m-0 mt-1" ng-model="makeReceiveAmount"
                                           placeholder="Amount"><span
                                            class="small-gray-text">{{selectedReceiveAsset}}</span>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div class="col-md-12 p-0">
                        <h3 class="h3-blue">Set Access</h3>
                        <span class="small-gray-text">Available to</span>
                        <br>
                        <input type="radio" class="ml-0" ng-model="privateAccess" ng-value="false" checked>
                        <span class="small-gray-text pr-3">Public</span>
                        <input type="radio" class="ml-0" ng-model="privateAccess" ng-value="true">
                        <span class="small-gray-text">Wallet Addresses</span>
                    </div>
                    <div class="col-md-12 p-0" ng-show="privateAccess == true">
                        <span class="small-gray-text">Seperate addresses with commas.</span>
                        <input type="text" class="form-control m-0 mt-1" ng-model="makeTarges"
                               placeholder="Addresses">
                    </div>


                    <div class="row pt-2">
                        <div class="col-md-6 col-xs-12">
                            <button class="btn btn-secondary w-100" ng-click="makeSwapModal.close()">Cancel
                            </button>
                        </div>
                        <div class="col-md-6 col-xs-12">
                            <button class="btn btn-primary w-100"
                                    ng-click="makeSwapConfirmation('notend')"
                                    ng-disabled="makeSendAmount == ''; makeReceiveAmount == ''; makeMinumumSwap == ''; "
                            >Review
                                Make
                                Swap
                            </button>
                        </div>
                    </div>
                    <div class="col-sm-12 clearfix">
                    </div>
                </article>
            </section>
        </section>
    </article>
    <article class="modal fade" id="makeSwapConfirm" tabindex="-1">
        <section class="modal-dialog send-asset-dialog">
            <section class="modal-content">
                <article class="block" ng-hide="wallet.type=='addressOnly'">
                    <div class="col-md-12 p-0">
                        <div class="float-right">
                                  <span class="gray-text" ng-click="makeSwapModal.open()">                    <i
                                              class="fa fa-times"
                                              aria-hidden="true"></i>
</span>
                        </div>
                    </div>
                    <h3 class="h3-blue">Review Make Swap</h3>

                    <p>Please review the following details carefully before making your swap.</p>

                    <div class="row p-2 info-bg pt-3 pb-3 info-bg mt-1">
                        <div class="col-md-6 small-gray-text">
                            You will be sending
                        </div>
                        <div class="col-md-6">
                            <div class="float-right text-right">
                                <span class="fusion-text-18">{{makeSendAmount}}</span> <span class="fusion-text-14">{{assetToSendConfirm}}</span>
                                <br>
                                <span class="small-gray-text" ng-show="showTimeLockSend">
                                <img class="mr-2" src="images/sendtl.svg" width="12px">{{fromStartTimeString}} - {{fromEndTimeString}}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="row p-2 info-bg pt-3 pb-3 info-bg mt-1">
                        <div class="col-md-6 small-gray-text">
                            You will be receiving
                        </div>
                        <div class="col-md-6">
                            <div class="float-right text-right">
                                <span class="fusion-text-18">{{makeReceiveAmount}}</span> <span class="fusion-text-14">{{assetToReceiveConfirm}}</span>
                                <br>
                                <span class="small-gray-text" ng-show="showTimeLockReceive">
                                <img class="mr-2" src="images/sendtl.svg" width="12px">{{toStartTimeString}} - {{toEndTimeString}}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="row p-2 pt-3 pb-3 gray-border-bottom">
                        <div class="col-md-6 small-gray-text">
                            Swap Rate
                        </div>
                        <div class="col-md-6">
                            <div class="float-right">
                                <span class="fusion-text-18">{{makeSendAmount}}</span> <span class="fusion-text-14">{{assetToSendConfirm}}</span>
                                : <span class="fusion-text-18">{{makeReceiveAmount}}</span> <span class="fusion-text-14">{{assetToReceiveConfirm}}</span>

                            </div>
                        </div>
                    </div>
                    <div class="row p-2 pt-3 pb-3 gray-border-bottom">
                        <div class="col-md-6 small-gray-text">
                            Minimum Swap Amount
                        </div>
                        <div class="col-md-6">
                            <div class="float-right">
                                <span class="fusion-text-18">{{makeMinumumSwap}}</span> <span class="fusion-text-14">{{assetToSendConfirm}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="row p-2 pt-3 pb-3 gray-border-bottom" ng-show="makeTarges != ''">
                        <div class="col-md-6 small-gray-text">
                            Available To
                        </div>
                        <div class="col-md-6">
                            <div class="float-right">
                                {{makeTarges}}
                            </div>
                        </div>
                    </div>


                    <div class="row">
                        <div class="col-lg-offset-6 float-right">
                            <button class="btn btn-sm btn-primary" ng-click="makeSwap()"
                                    ng-disabled="swapRecallSuccess">Confirm
                            </button>
                            <button class="btn btn-sm btn-secondary" ng-click="makeSwapModal.open()">Cancel</button>
                        </div>
                    </div>
                </article>
            </section>
        </section>
    </article>
    <article class="modal fade" id="makeSwapEndConfirm" tabindex="-1">
        <section class="modal-dialog send-asset-dialog">
            <section class="modal-content">
                <article class="block" ng-hide="wallet.type=='addressOnly'">
                    <div class="col-md-12 p-0">
                        <div class="float-right">
                                  <span class="gray-text" ng-click="makeSwapConfirmEndModal.close()">                    <i
                                              class="fa fa-times"
                                              aria-hidden="true"></i>
</span>
                        </div>
                    </div>
                    <h3 class="h3-blue text-center">Success</h3>

                    <div class="row p-2 gray-bg gray-bg-2 m-0">
                        <div class="col-md-6 small-gray-text">
                            Sent
                        </div>
                        <div class="col-md-6">
                            <div class="float-right">
                                <span class="fusion-text-18">{{makeSendAmount}}</span> {{assetToSendConfirm}}
                            </div>
                        </div>
                    </div>
                    <div class="row p-2 gray-bg gray-bg-2 m-0 mt-2">
                        <div class="col-md-6 small-gray-text">
                            Receiving
                        </div>
                        <div class="col-md-6">
                            <div class="float-right">
                                <span class="fusion-text-18">{{makeReceiveAmount}}</span> {{assetToReceiveConfirm}}
                            </div>
                        </div>
                    </div>
                    <div class="row p-2">
                        <div class="col-md-12">
                            <div class="text-center m-3">
                                    <img src="images/check-circle.svg" width="120px" style="color:#7ed321;">
                            </div>
                        </div>
                    </div>
                    <div class="row p-2">
                        <div class="col-md-12">
                            <div class="text-center">
                                <p>Make Swap Successful! This swap is now available in the swap market. You can track it’s progress or recall the swap in the “Open Makes” tab. </p>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12 text-center">
                            <button class="btn btn-white" ng-click="makeSwapConfirmEndModal.close()">
                                Back to Swap Market
                            </button>
                        </div>
                    </div>
                </article>
            </section>
        </section>
    </article>
    <article class="modal fade" id="recallSwapSuccess" tabindex="-1">
        <section class="modal-dialog send-asset-dialog">
            <section class="modal-content">
                <article class="block" ng-hide="wallet.type=='addressOnly'">
                    <div class="col-md-12 text-center">
                        <h3 class="h3-blue">Success!</h3>
                        <div class="pt-2 pb-2">
                            <img src="images/check-circle.svg" width="120px" height="120px">
                        </div>
                        <p>
                            Swap Successful! Assets are now available in your wallet.</p>
                        <button class="btn btn-white pt-2" ng-click="recallSwapSuccess.close()">Back to Swap Market
                        </button>
                    </div>
                </article>
            </section>
        </section>
    </article>
    <article class="modal fade" id="swapInformationModal" tabindex="-1">
        <section class="modal-dialog send-asset-dialog">
            <section class="modal-content">
                <article class="block" ng-hide="wallet.type=='addressOnly'">
                    <div class="col-md-12 p-0">
                        <div class="float-right">
                                  <span class="gray-text" ng-click="swapInformationModal.close()">                    <i
                                              class="fa fa-times"
                                              aria-hidden="true"></i>
</span>
                        </div>
                    </div>
                    <div class="row p-2">
                        <div class="col-md-12 p-0">
                            <h3 class="h3-blue m-0">Swap Details</h3>
                        </div>
                    </div>

                    <div class="row p-2 pt-3 pb-3 gray-border-bottom">
                        <div class="col-md-6 small-gray-text p-0">
                            Swap ID
                        </div>
                        <div class="col-md-6 p-0">
                            <div class="float-right">
                                <span class="fusion-text-14">{{swapInfo.ID}}</span>
                            </div>
                        </div>
                    </div>

                    <div class="row p-2 pt-3 pb-3 gray-border-bottom">
                        <div class="col-md-6 small-gray-text p-0">
                            Time Initiated
                        </div>
                        <div class="col-md-6 p-0">
                            <div class="float-right">
                                <span class="fusion-text-14">{{swapInfo.Time}}</span>
                            </div>
                        </div>
                    </div>

                    <div class="row p-2 pt-3 pb-3 info-bg mt-1">
                        <div class="col-md-6 small-gray-text p-0">
                            Taker Sends
                        </div>
                        <div class="col-md-6 p-0">
                            <div class="float-right">
                                    <span class="fusion-text-14">

                                        <span class="fusion-text-18">{{swapInfo.MinFromAmount}}</span>
                                        {{swapInfo.FromAssetName}} ({{swapInfo.FromAssetSymbol}}) <span
                                                class="color-Active official-fusion-badge"
                                                ng-show="swapInfo.FromAssetID === '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'"><i
                                                    class="fa fa-check-circle"></i> FSN Official</span>
                                        <br>
                                        <span class="small-gray-text">{{swapInfo.FromAssetID}}</span>
                                    </span>
                            </div>
                        </div>
                    </div>
                    <div class="row p-2 pt-3 pb-3 gray-border-bottom">
                        <div class="col-md-6 small-gray-text p-0">
                            Taker Sends From
                        </div>
                        <div class="col-md-6 p-0">
                            <div class="float-right">
                                    <span class="fusion-text-14">{{swapInfo.FromStartTime}} <i
                                                class="fa fa-long-arrow-right" aria-hidden="true"></i>
                                        {{swapInfo.FromEndTime}} </span>
                            </div>
                        </div>
                    </div>

                    <div class="row p-2 pt-3 pb-3 gray-border-bottom">
                        <div class="col-md-6 small-gray-text p-0">
                            Swap initiated by
                        </div>
                        <div class="col-md-6 p-0">
                            <div class="float-right">
                                <span class="fusion-text-14">{{swapInfo.Owner}}</span>
                            </div>
                        </div>
                    </div>

                    <div class="row p-2 pt-3 pb-3 gray-border-bottom">
                        <div class="col-md-6 small-gray-text p-0">
                            Max Swaps
                        </div>
                        <div class="col-md-6 p-0">
                            <div class="float-right">
                                <span class="fusion-text-14">{{swapInfo.SwapSize}}</span>
                            </div>
                        </div>
                    </div>

                    <div class="row p-2 pt-3 pb-3 info-bg mt-1">
                        <div class="col-md-6 small-gray-text p-0">
                            Taker will be receiving
                        </div>
                        <div class="col-md-6 p-0">
                            <div class="float-right">
                                    <span class="fusion-text-14">
                                        <span class="fusion-text-18">{{swapInfo.MinToAmount}}</span>
                                        {{swapInfo.ToAssetName}} ({{swapInfo.ToAssetSymbol}}) <span
                                                class="color-Active official-fusion-badge"
                                                ng-show="swapInfo.ToAssetID === '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'"><i
                                                    class="fa fa-check-circle"></i> FSN Official</span>
                                        <br>
                                        <span class="small-gray-text">{{swapInfo.ToAssetID}}</span>
                                    </span>
                            </div>
                        </div>
                    </div>
                    <div class="row p-2 pt-3 pb-3 gray-border-bottom">
                        <div class="col-md-6 small-gray-text p-0">
                            Taker Receives From
                        </div>
                        <div class="col-md-6 p-0">
                            <div class="float-right">
                                    <span class="fusion-text-14">{{swapInfo.ToStartTime}} <i
                                                class="fa fa-long-arrow-right" aria-hidden="true"></i>
                                        {{swapInfo.ToEndTime}} </span>
                            </div>
                        </div>
                    </div>

                    <div class="row p-2">
                        <div class="col-md-6 small-gray-text p-0">
                            Availability
                        </div>
                        <div class="col-md-6 p-0">
                            <div class="float-right">
                                <i class="fa fa-globe" aria-hidden="true" ng-hide="swapInfo.Targes=='Private'"></i>
                                <i class="fa fa-lock" aria-hidden="true" ng-hide="swapInfo.Targes=='Public'"></i>
                                <span class="fusion-text-14">{{swapInfo.Targes}}</span>
                            </div>
                        </div>
                    </div>

                    <div class="row mt-2 text-center">
                        <div class="col-md-12">
                            <button class="btn btn-white" ng-click="swapInformationModal.close()">
                                Close
                            </button>
                        </div>
                    </div>
                </article>
            </section>
        </section>
    </article>
    <article class="modal fade" id="takeSwapConfirm" tabindex="-1">
        <section class="modal-dialog send-asset-dialog">
            <section class="modal-content">
                <article class="block" ng-hide="wallet.type=='addressOnly'">
                    <div class="col-md-12 p-0">
                        <div class="float-right">
                                  <span class="gray-text" ng-click="makeSwapModal.open()">                    <i
                                              class="fa fa-times"
                                              aria-hidden="true"></i>
</span>
                        </div>
                    </div>
                    <h3 class="h3-blue">Review Take Swap</h3>

                    <p>Please review the following details carefully before taking the swap.</p>

                    <div class="row p-2 info-bg pt-3 pb-3 info-bg mt-1">
                        <div class="col-md-6 small-gray-text">
                            You will be sending
                        </div>
                        <div class="col-md-6">
                            <div class="float-right text-right">
                                <span class="fusion-text-18">{{takeAmountSwap}}</span>
                                <span class="fusion-text-14">{{takeDataFront.fromAssetSymbol}}</span>
                                <br>
                                <span class="small-gray-text" ng-show="showTimeLockSend">
                                <img class="mr-2" src="images/sendtl.svg" width="12px">{{fromStartTimeString}} - {{fromEndTimeString}}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="row p-2 info-bg pt-3 pb-3 info-bg mt-1">
                        <div class="col-md-6 small-gray-text">
                            You will be receiving
                        </div>
                        <div class="col-md-6">
                            <div class="float-right text-right">
                                <span class="fusion-text-18">{{receiveTokens}}</span> <span class="fusion-text-14">{{takeDataFront.toAssetSymbol}}</span>
                                <br>
                                <span class="small-gray-text" ng-show="showTimeLockReceive">
                                <img class="mr-2" src="images/sendtl.svg" width="12px">{{toStartTimeString}} - {{toEndTimeString}}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="row p-2 pt-3 pb-3 gray-border-bottom">
                        <div class="col-md-6 small-gray-text">
                            Swap Rate
                        </div>
                        <div class="col-md-6">
                            <div class="float-right">
                                <span class="fusion-text-18"><strong>{{takeDataFront.swapRate}}</strong></span>
                                <span class="fusion-text-12">{{takeDataFront.fromAssetSymbol}}</span> :
                                <span class="fusion-text-18"><strong>1</strong></span>
                                <span class="fusion-text-12">{{takeDataFront.toAssetSymbol}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-offset-6 float-right">
                            <button class="btn btn-sm btn-primary"
                                    ng-click="takeSwap(takeDataFront.fromAssetId, takeDataFront.swapId , takeAmountSwap)">
                                Confirm
                            </button>
                            <button class="btn btn-sm btn-secondary" ng-click="takeSwapConfirm.close()">Cancel</button>
                        </div>
                    </div>
                </article>
            </section>
        </section>
    </article>

</article>