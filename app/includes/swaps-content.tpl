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
    <div class="col-md-12 p-0 swap-border">
        <nav class="nav-container bg-white">
            <div class="nav-scroll">
                <ul class="nav-inner">
                    <li class="nav-item Swaps pl-3 pr-2 mb-1px"
                        ng-class="{active: showSwapMarket==true && showOpenTakes==false}">
                        <a class="ng-scope"
                           ng-click="showSwapMarket = true ; showOpenMakes = false; showOpenTakes = false">Swap
                            Market</a>
                    </li>
                    <li class="nav-item Swaps mb-1px"
                        ng-class="{active: showSwapMarket==false  && showOpenTakes==false}">
                        <a class="ng-scope"
                           ng-click="showSwapMarket = false ; showOpenMakes = true; showOpenTakes = false">Open Makes
                            ({{openMakeSwaps}})
                            <span></span></a>
                    </li>
                    <li class="nav-item Swaps pr-2 mb-1px"
                        ng-class="{active: showOpenTakes==true  && showSwapMarket==false}">
                        <a class="ng-scope"
                           ng-click="showSwapMarket = false ; showOpenMakes = false; showOpenTakes = true">Open Takes
                            ({{openTakeSwapsTotal}})
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
    <div class="col-md-12 p-2 swap-border" ng-show="showSwapMarket === true">
        <div class="col-md-3 text-left mr-0">
            <span class="small-gray-text">Send Assets</span>
            <br>
            <div class="col-md-12 col-xs-12 p-1 mt-1 asset-dropdown border-gray-dropdown"
                 ng-click="sendDropDown = !sendDropDown">
                <div class="float-left w-75">
                    <a>
                        <div class="col-md-2 p-0" ng-if="selectedSendHasImage">
                            <img    ng-if="selectedSendHasImage"
                                    ng-src="images/verifiedassets/{{selectedSendImage}}"/>
                        </div>
                        <div class="col">
                            {{selectedSendAsset}} <span
                                    class="color-Active official-fusion-badge"
                                    ng-show="selectedSendContract === '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'"><i
                                        class="fa fa-check-circle"></i> FSN Official</span>
                            <span class="small-gray-text max-char">{{selectedSendContract}}</span>
                        </div>
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
                <div class="col-md-12 col-xs-12 p-1 mt-1 asset-dropdown"
                     ng-repeat="asset in assetListOwned | filter:searchSendAsset track by $index">
                    <a ng-click="setSendAsset(asset.id)">

                        <div class="col-md-2 p-0" ng-if="asset.hasImage">
                            <img ng-if="asset.hasImage"
                                 ng-src="images/verifiedassets/{{asset.image}}"/>
                            <span   ng-if="!asset.hasImage"
                                    class="btn btn-white btn-circle w32 asset-round">{{asset.symbol}}</span>
                        </div>
                        <div class="col">
                                <span class="fusion-text-14">
                        {{asset.name}} ({{asset.symbol}}) <span class="color-Active official-fusion-badge"
                                                                ng-show="asset.verified"><i
                                                class="fa fa-check-circle"></i> Verified</span>
                        <br>
                        <span class="small-gray-text max-char">{{asset.contractaddress}}</span>
                        </span>
                        </div>

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
            <div class="col-md-12 col-xs-12 p-1 mt-1 asset-dropdown border-gray-dropdown"
                 ng-click="receiveDropDown = !receiveDropDown">
                <div class="float-left w-75">
                    <a>
                        <div class="col-md-2 p-0" ng-if="selectedReceiveHasImage">
                            <img    ng-if="selectedReceiveHasImage"
                                    ng-src="images/verifiedassets/{{selectedReceiveImage}}"/>
                        </div>
                    <div class="col">
                        {{selectedReceiveAsset}} <span
                                class="color-Active official-fusion-badge"
                                ng-show="selectedReceiveContract === '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'"><i
                                    class="fa fa-check-circle"></i> Verified</span>
                        <span class="small-gray-text max-char">{{selectedReceiveContract}}</span>
                    </div>
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
                <div class="col-md-12 col-xs-12 p-1 mt-1 asset-dropdown"
                     ng-repeat="asset in assetList | filter:searchReceiveAsset track by $index">
                    <a ng-click="setReceiveAsset(asset.id)">
                        <div class="col-md-2 p-0" ng-if="asset.hasImage">
                            <img ng-if="asset.hasImage"
                                 ng-src="images/verifiedassets/{{asset.image}}"/>
                            <span   ng-if="!asset.hasImage"
                                    class="btn btn-white btn-circle w32 asset-round">{{asset.symbol}}</span>
                        </div>
                        <div class="col">
                                <span class="fusion-text-14">
                        {{asset.name}} ({{asset.symbol}}) <span class="color-Active official-fusion-badge"
                                                                ng-show="asset.contractaddress === '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'"><i
                                                class="fa fa-check-circle"></i> FSN Official</span>
                        <br>
                        <span class="small-gray-text max-char">{{asset.contractaddress}}</span>
                        </span>
                        </div>
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
                <span class="text-fusion ng-binding"><strong
                            class="font-size-16">{{selectedAssetBalance}}</strong> <span
                            class="font-size-12">{{selectedAssetSymbol}}</span></span>
            </div>
        </div>
        <div class="col-md-2 text-left">
            <span class="small-gray-text"> </span>
            <br>
            <button class="btn btn-sm btn-primary" ng-click="makeModal()">Make Swap</button>
        </div>
    </div>
    <div class="col-md-12 pl-0 pr-0">
        <div class="panel panel-default" ng-show="showOpenTakes === true">
            <div class="panel-body">
                <div class="text-center" ng-show="openTakeSwaps == 0 && !showLoader"><span
                            class="small-gray-text">No Take Swaps</span></div>
                <div class="col-md-12 text-center p-5" ng-show="showLoader">
                    <i class="fa fa-circle-o-notch fa-spin fa-fw"></i>
                    <br>
                    <span class="small-gray-text">Loading Swaps...</span>
                </div>
                <table class="table" ng-show="openTakeSwaps != 0 && !showLoader">
                    <thead>
                    <tr class="small-gray-table">
                        <th class="text-left" scope="col"></th>
                        <th class="text-left" scope="col">Time Initiated</th>
                        <th class="text-right" scope="col">Send</th>
                        <th class="text-right" scope="col">Receive</th>
                        <th class="text-right" scope="col">Swap Rate</th>
                        <th class="text-right" scope="col">Fill Size</th>
                        <th class="text-right" scope="col" class="float-right">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr ng-repeat="asset in openTakeSwaps track by $index">
                        <td class="text-left">
                            <span class="gray-bg-2 font-size-12 p-1 targes-border">
                              <i class="fa fa-globe" aria-hidden="true" ng-hide="asset.targes=='Private'"></i>
                              <i class="fa fa-lock" aria-hidden="true" ng-hide="asset.targes=='Public'"></i>
                                {{asset.targes}}
                            </span>
                        </td>
                        <td class="text-left">{{asset.time}} <br> <span class="small-gray-text">{{asset.timeHours}}</td>
                        <td class="text-right"><strong>{{asset.toAmountCut}}</strong> <span
                                    class="font-size-12">{{asset.toAssetSymbol}}</span>
                            <span
                                    class="color-Active official-fusion-badge"
                                    ng-show="asset.toAssetId === '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'"><i
                                        class="fa fa-check-circle"></i></span>
                            <br>
                            <span class="small-gray-text"
                                  ng-hide="asset.ToStartTime == 0 && asset.ToEndTime == 18446744073709552000">
                                <img class="mr-2" src="images/sendtl.svg" width="12px">{{asset.ToStartTimeString}}
                                - {{asset.ToEndTimeString}}
                            </span>
                        </td>
                        <td class="text-right"><strong>{{asset.fromAmountCut}}</strong>
                            <span>{{asset.fromAssetSymbol}}</span>
                            <span
                                    class="color-Active official-fusion-badge"
                                    ng-show="asset.fromAssetId === '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'"><i
                                        class="fa fa-check-circle"></i></span>
                            <br>
                            <span class="small-gray-text"
                                  ng-hide="asset.FromStartTime == 0 && asset.FromEndTime == 18446744073709552000">
                                <img class="mr-2" src="images/sendtl.svg" width="12px">{{asset.FromStartTimeString}}
                                - {{asset.FromEndTimeString}}
                            </span>
                        </td>
                        <td class="text-right"><strong>{{asset.swapratetaker.toFixed(4)}}</strong> <span
                                    class="font-size-12">{{asset.toAssetSymbol}}</span></td>
                        <td class="text-right"><strong>{{asset.minswaptaker.toFixed(4)}}</strong> <span
                                    class="font-size-12">{{asset.toAssetSymbol}}</span></td>
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
        <div class="panel panel-default" ng-show="showSwapMarket === false && showOpenTakes === false">
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
                        <th class="text-left" scope="col" ng-click="sortOpenMakes('time')">Time Initiated
                            <img src="images/Static.svg" ng-show="sortOpenMakes !== 'time'"/>
                            <img src="images/Ascend.svg" ng-show="sortOpenMakes == 'time' && reverseMake == false"/>
                            <img src="images/Descend.svg" ng-show="sortOpenMakes == 'time' && reverseMake == true"/>
                        </th>
                        <th class="text-right" scope="col" ng-click="sortOpenMakes('fromAmountCut')">Send
                            <img src="images/Static.svg" ng-show="sortOpenMakes !== 'fromAmountCut'"/>
                            <img src="images/Ascend.svg"
                                 ng-show="sortOpenMakes == 'fromAmountCut' && reverseMake == false"/>
                            <img src="images/Descend.svg"
                                 ng-show="sortOpenMakes == 'fromAmountCut' && reverseMake == true"/>
                        </th>
                        <th class="text-right" scope="col" ng-click="sortOpenMakes('toAmountCut')">Receive
                            <img src="images/Static.svg" ng-show="sortOpenMakes !== 'toAmountCut'"/>
                            <img src="images/Ascend.svg"
                                 ng-show="sortOpenMakes == 'toAmountCut' && reverseMake == false"/>
                            <img src="images/Descend.svg"
                                 ng-show="sortOpenMakes == 'toAmountCut' && reverseMake == true"/>
                        </th>
                        <th class="text-right" scope="col" ng-click="sortOpenMakes('swaprate')">Swap Rate
                            <img src="images/Static.svg" ng-show="sortOpenMakes !== 'swaprate'"/>
                            <img src="images/Ascend.svg" ng-show="sortOpenMakes == 'swaprate' && reverseMake == false"/>
                            <img src="images/Descend.svg" ng-show="sortOpenMakes == 'swaprate' && reverseMake == true"/>
                        </th>
                        <th class="text-right" scope="col" ng-click="sortOpenMakes('minswap')">Fill Size
                            <img src="images/Static.svg" ng-show="sortOpenMakes !== 'minswap'"/>
                            <img src="images/Ascend.svg" ng-show="sortOpenMakes == 'minswap' && reverseMake == false"/>
                            <img src="images/Descend.svg" ng-show="sortOpenMakes == 'minswap' && reverseMake == true"/>
                        </th>
                        <th class="text-right" scope="col" class="float-right">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr ng-repeat="asset in swapsList | orderBy:sortKeyMake:reverseMake | filter: { owned: 'true' } track by $index">
                        <td class="text-left">
                            <span class="gray-bg-2 font-size-12 p-1 targes-border">
                              <i class="fa fa-globe" aria-hidden="true" ng-hide="asset.targes=='Private'"></i>
                              <i class="fa fa-lock" aria-hidden="true" ng-hide="asset.targes=='Public'"></i>
                                {{asset.targes}}
                            </span>
                        </td>
                        <td class="text-left">{{asset.time}} <br> <span
                                    class="small-gray-text">{{asset.timeHours}}</span></td>
                        <td class="text-right"><strong>{{asset.fromAmountCut}}</strong> {{asset.fromAssetSymbol}} <span
                                    class="color-Active official-fusion-badge"
                                    ng-show="asset.fromAssetId === '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'"><i
                                        class="fa fa-check-circle"></i></span>
                            <br>
                            <span class="small-gray-text"
                                  ng-hide="asset.FromStartTime == 0 && asset.FromEndTime == 18446744073709552000">
                                <img class="mr-2" src="images/sendtl.svg" width="12px">{{asset.FromStartTimeString}}
                                - {{asset.FromEndTimeString}}
                            </span>
                        </td>
                        <td class="text-right"><strong>{{asset.toAmountCut}}</strong> {{asset.toAssetSymbol}}
                            <span
                                    class="color-Active official-fusion-badge"
                                    ng-show="asset.toAssetId === '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'"><i
                                        class="fa fa-check-circle"></i></span>
                            <br>
                            <span class="small-gray-text"
                                  ng-hide="asset.ToStartTime == 0 && asset.ToEndTime == 18446744073709552000">
                                <img class="mr-2" src="images/sendtl.svg" width="12px">{{asset.ToStartTimeString}}
                                - {{asset.ToEndTimeString}}
                            </span>
                        </td>
                        <td class="text-right">
                            <strong>{{asset.swapratetaker.toFixed(4)}}</strong> {{asset.fromAssetSymbol}}
                        </td>
                        <td class="text-right">
                            <strong>{{asset.minswaptaker.toFixed(4)}}</strong> {{asset.fromAssetSymbol}}
                        </td>
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
        <div class="panel panel-default" ng-show="showSwapMarket === true && showOpenTakes === false">
            <div class="panel-body">
                <tr class="col-md-12 p-0">
                    <div class="float-left">
                        <div class="col-md-12">
                            <div class="row">
                                <div class="col-md-12">
                                    <form class="form-inline">
                                        <div class="form-group">
                                            <input type="text" ng-model="searchSwapMarket" class="form-control m-0"
                                                   placeholder="Search Assets, Amounts">
                                        </div>
                                    </form>
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
                        <th class="text-left" scope="col">

                        </th>
                        <th class="text-left" scope="col" ng-click="sortSwapMarket('time')">
                            Time Initiated

                            <img src="images/Static.svg" ng-show="sortKey !== 'time'"/>
                            <img src="images/Ascend.svg" ng-show="sortKey == 'time' && reverse == false"/>
                            <img src="images/Descend.svg" ng-show="sortKey == 'time' && reverse == true"/>
                        </th>
                        <th class="text-right" scope="col" ng-click="sortSwapMarket('fromAmountCut')">
                            Send
                            <img src="images/Static.svg" ng-show="sortKey !== 'fromAmountCut'"/>
                            <img src="images/Ascend.svg" ng-show="sortKey == 'fromAmountCut' && reverse == false"/>
                            <img src="images/Descend.svg" ng-show="sortKey == 'fromAmountCut' && reverse == true"/>
                        </th>
                        <th class="text-right" scope="col" ng-click="sortSwapMarket('toAmountCut')">
                            Receive
                            <img src="images/Static.svg" ng-show="sortKey !== 'toAmountCut'"/>
                            <img src="images/Ascend.svg" ng-show="sortKey == 'toAmountCut' && reverse == false"/>
                            <img src="images/Descend.svg" ng-show="sortKey == 'toAmountCut' && reverse == true"/>
                        </th>
                        <th class="text-right" scope="col" ng-click="sortSwapMarket('swaprate')">
                            Swap Rate
                            <img src="images/Static.svg" ng-show="sortKey !== 'swaprate'"/>
                            <img src="images/Ascend.svg" ng-show="sortKey == 'swaprate' && reverse == false"/>
                            <img src="images/Descend.svg" ng-show="sortKey == 'swaprate' && reverse == true"/>
                        </th>
                        <th class="text-right" scope="col" ng-click="sortSwapMarket('minswap')">
                            Fill Size
                            <img src="images/Static.svg" ng-show="sortKey !== 'minswap'"/>
                            <img src="images/Ascend.svg" ng-show="sortKey == 'minswap' && reverse == false"/>
                            <img src="images/Descend.svg" ng-show="sortKey == 'minswap' && reverse == true"/>
                        </th>
                        <th class="text-right" scope="col" class="float-right">
                            Actions
                        </th>
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
                        <td class="text-left">{{asset.time}} <br> <span class="small-gray-text">{{asset.timeHours}}</td>
                        <td class="text-right"><strong>{{asset.toAmountCut}}</strong> <span
                                    class="font-size-12">{{asset.toAssetSymbol}}</span>
                            <span
                                    class="color-Active official-fusion-badge"
                                    ng-show="asset.toAssetId === '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'"><i
                                        class="fa fa-check-circle"></i></span>
                            <br>
                            <span class="small-gray-text"
                                  ng-hide="asset.ToStartTime == 0 && asset.ToEndTime == 18446744073709552000">
                                <img class="mr-2" src="images/sendtl.svg" width="12px">{{asset.ToStartTimeString}}
                                - {{asset.ToEndTimeString}}
                            </span>
                        </td>
                        <td class="text-right"><strong>{{asset.fromAmountCut}}</strong>
                            <span>{{asset.fromAssetSymbol}}</span>
                            <span
                                    class="color-Active official-fusion-badge"
                                    ng-show="asset.fromAssetId === '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'"><i
                                        class="fa fa-check-circle"></i></span>
                            <br>
                            <span class="small-gray-text"
                                  ng-hide="asset.FromStartTime == 0 && asset.FromEndTime == 18446744073709552000">
                                <img class="mr-2" src="images/sendtl.svg" width="12px">{{asset.FromStartTimeString}}
                                - {{asset.FromEndTimeString}}
                            </span>
                        </td>
                        <td class="text-right"><strong>{{asset.swapratetaker.toFixed(4)}}</strong> <span
                                    class="font-size-12">{{asset.toAssetSymbol}}</span></td>
                        <td class="text-right"><strong>{{asset.minswaptaker.toFixed(4)}}</strong> <span
                                    class="font-size-12">{{asset.toAssetSymbol}}</span></td>
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

                    <div class="col-md-12 p-0">
                        <span class="small-gray-text">
                           Send Asset
                        </span>
                        <br>
                        <div class="col-md-6 p-1 takeswapdrop">
                            <span>
                            {{takeDataFront.fromAssetName}} ({{takeDataFront.fromAssetSymbol}})
                                <span class="small-gray-text max-char">{{takeDataFront.fromAssetId}}</span>
                            </span>
                        </div>
                    </div>
                    <div class="col-md-12 p-0"
                         ng-hide="takeDataFront.swapId.ToStartTime == 0 && takeDataFront.swapId.ToEndTime == 18446744073709552000">
                        <div class="col-md-6 pt-1 pb-1 pl-1 tl-takeswap">
                            <span>
                                <img class="mr-2" src="images/sendtl.svg"
                                     width="12px">{{takeDataFront.swapId.ToStartTimeString}}
                                - {{takeDataFront.swapId.ToEndTimeString}}
                            </span>
                        </div>
                    </div>

                    <div class="col-md-12 p-0">
                        <span class="small-gray-text">
                           Receive Asset
                        </span>
                        <br>
                        <div class="col-md-6 p-1 takeswapdrop">
                            <span>
                                {{takeDataFront.toAssetName}} ({{takeDataFront.toAssetSymbol}})
                                <span class="small-gray-text max-char">{{takeDataFront.toAssetId}}</span>
                            </span>
                        </div>
                    </div>
                    <div class="col-md-12 p-0"
                         ng-hide="takeDataFront.swapId.FromStartTime == 0 && takeDataFront.swapId.FromEndTime == 18446744073709552000">
                        <div class="col-md-6 pt-1 pb-1 pl-1 tl-takeswap">
                            <span>
                                <img class="mr-2" src="images/sendtl.svg"
                                     width="12px">{{takeDataFront.swapId.FromStartTimeString}}
                                - {{takeDataFront.swapId.FromEndTimeString}}
                            </span>
                        </div>
                    </div>

                    <div class="col-md-3 p-0">
                        <span class="small-gray-text">
                           Swap Rate
                        </span>
                        <br>
                        <div class="col-md-4 mt-2 mb-2 p-0">
                            <div class="gray-bg p-2 display-inline fusion-text-14">
                                {{takeDataFront.swapRate}} {{takeDataFront.fromAssetSymbol}} :
                                1 {{takeDataFront.toAssetSymbol}}
                            </div>
                        </div>
                    </div>
                    <div class="col-md-9 p-0">
                        <span class="small-gray-text">
                           Fill Size
                        </span>
                        <br>
                        <div class="col-md-4 mt-2 mb-2 p-0">
                            <div class="gray-bg p-2 display-inline fusion-text-14">
                                {{takeDataFront.fromAssetMin}} {{takeDataFront.fromAssetSymbol}}
                            </div>
                        </div>
                    </div>

                    <br>
                    <h3 class="h3-blue pt-2 inline">Take Amount</h3>

                    <div class="col-md-12 p-0">
                        <span class="small-gray-text">
                           Fill Quantity
                        </span>
                        <br>
                        <div class="col-md-4 p-1">
                            <div class="input-group mb-3">
                                <input type="number" class="form-control m-0 mt-1"
                                       ng-model="takeAmountSwap"
                                       min="1"
                                       max="{{takeDataFront.swapSize}}"
                                       ng-change="setReceive()" placeholder="Fills">
                                <div class="input-group-append">
                                    <span class="input-group-text small-gray-text">
                                        of {{takeDataFront.swapSize}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 mt-2" ng-show="takeDataFront.fromAssetBalance < sendTokens">
                            <span class="balanceinsufficiant p-1">You don’t have enough {{takeDataFront.fromAssetSymbol}}</span>
                        </div>
                    </div>

                    <div class="col-md-12 p-0 mb-3">
                        <div class="col-md-4 p-0">
                            <div class="float-left"><span class="small-gray-text">
                           Total Receive
                        </span></div>
                            <div class="float-right">
                                <span class="small-gray-text">
                           Total Send
                        </span>
                            </div>
                            <br>
                            <div class="col-md-12 mt-2 mb-2 p-0 text-center">
                                <div class="gray-bg p-2 fusion-text-14">
                                    <div class="float-left"><strong
                                                class="font-size-16">{{sendTokens}}</strong> {{takeDataFront.fromAssetSymbol}}
                                    </div>
                                    :
                                    <div class="float-right">
                                        <strong class="font-size-16">{{receiveTokens}}</strong> {{takeDataFront.toAssetSymbol}}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div class="row">
                        <div class="col-md-6 p-0 pr-2">
                            <button class="btn btn-white w-100" ng-click="takeSwapModal.close()">Cancel</button>
                        </div>
                        <div class="col-md-6 p-0 pl-2">
                            <button class="btn btn-primary w-100"
                                    ng-click="takeSwapConfirm.open()"
                                    ng-disabled="sendTokens > takeDataFront.fromAssetBalance || takeDataFront.fromAssetBalance <= 0">
                                Review Take Swap
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
                    <div class="row m-0">
                        <div class="col-md-6 text-left p-0">
                            <span class="small-gray-text">Send Assets</span>
                            <br>
                            <div class="col-md-12 col-xs-12 p-1 mt-1 asset-dropdown border-gray-dropdown"
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
                                <div class="col-md-12 col-xs-12 p-1 mt-1  asset-dropdown"
                                     ng-repeat="asset in assetListOwned | filter:searchSendAsset track by $index">
                                    <a ng-click="setSendAsset(asset.id)">
                                        <div class="col-md-2 p-0" ng-if="asset.hasImage">
                                            <img ng-if="asset.hasImage"
                                                 ng-src="images/verifiedassets/{{asset.image}}"/>
                                            <span   ng-if="!asset.hasImage"
                                                    class="btn btn-white btn-circle w32 asset-round">{{asset.symbol}}</span>
                                        </div>
                                        <div class="col">
                                <span class="fusion-text-14">
                        {{asset.name}} ({{asset.symbol}}) <span class="color-Active official-fusion-badge"
                                                                ng-show="asset.contractaddress === '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'"><i
                                                class="fa fa-check-circle"></i> FSN Official</span>
                        <br>
                        <span class="small-gray-text max-char">{{asset.contractaddress}}</span>
                        </span>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 pl-2">
                            <span class="small-gray-text" style="color:white;">_<br></span>
                            <button class="btn btn-sm btn-primary button-timelock p-2 mt-2"
                                    ng-click="showTimeLockSend = !showTimeLockSend"
                                    ng-hide="showTimeLockSend"
                            >Set
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
                                <div class="col-md-5 p-0 pb-2">
                                    <button class="btn btn-sm btn-white w-100"
                                            ng-click="sendTimeLock ='daterange'"
                                            ng-class="{'time-active' : sendTimeLock == 'daterange'}"
                                    >
                                        Now to Date
                                    </button>
                                </div>
                                <div class="col-md-1 p-0 pb-2">
                                    <button class="btn btn-sm btn-white"
                                            ng-click="showTimeLockSend = !showTimeLockSend"
                                    >
                                        X
                                    </button>
                                </div>
                            </div>
                            <div ng-show="sendTimeLock == 'scheduled' || sendTimeLock == 'daterange' && showTimeLockSend">
                                <div class="col-md-12 p-0" ng-show="showTimeLockSend">
                                        <span class="small-gray-text">
                                    From
                                        </span>
                                    <br>
                                    <input class="form-control"
                                           type="date"
                                           min="{{todayDate}}"
                                           onkeydown="return false"
                                           ng-model="fromStartTime"
                                           ng-hide="sendTimeLock == 'daterange'"
                                    >
                                    <span class="b-form small-gray-text text-fusion fusion-text-14 p-1"
                                          ng-show="sendTimeLock == 'daterange'">Now</span>
                                </div>
                                <div class="col-md-12 p-0" ng-show="showTimeLockSend">
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
                                               min="{{todayDate}}"
                                               onkeydown="return false"
                                               ng-model="fromEndTime">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row m-0">
                        <div class="col-md-6 p-0 text-left">
                            <span class="small-gray-text">Receive Asset</span>
                            <br>
                            <div class="col-md-12 col-xs-12 p-1 mt-1 asset-dropdown border-gray-dropdown"
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
                                <div class="col-md-12 col-xs-12 p-1 mt-1 asset-dropdown"
                                     ng-repeat="asset in assetList | filter:searchReceiveAsset track by $index">
                                    <a ng-click="setReceiveAsset(asset.id)">
                                        <div class="col-md-2 p-0" ng-if="asset.hasImage">
                                            <img ng-if="asset.hasImage"
                                                 ng-src="images/verifiedassets/{{asset.image}}"/>
                                            <span   ng-if="!asset.hasImage"
                                                    class="btn btn-white btn-circle w32 asset-round">{{asset.symbol}}</span>
                                        </div>
                                        <div class="col">
                                <span class="fusion-text-14">
                        {{asset.name}} ({{asset.symbol}}) <span class="color-Active official-fusion-badge"
                                                                ng-show="asset.contractaddress === '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'"><i
                                                class="fa fa-check-circle"></i> FSN Official</span>
                        <br>
                        <span class="small-gray-text max-char">{{asset.contractaddress}}</span>
                        </span>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 pl-2">
                            <span class="small-gray-text" style="color:white;">_<br></span>
                            <button class="btn btn-sm btn-primary button-timelock p-2 mt-2"
                                    ng-click="showTimeLockReceive = !showTimeLockReceive"
                                    ng-hide="showTimeLockReceive"
                            >Set Time-lock
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
                                <div class="col-md-5 p-0 pb-2">
                                    <button class="btn btn-sm btn-white w-100"
                                            ng-click="receiveTimeLock ='daterange'"
                                            ng-class="{'time-active' : receiveTimeLock == 'daterange'}"
                                    >
                                        Now to Date
                                    </button>
                                </div>
                                <div class="col-md-1 p-0 pb-2">
                                    <button class="btn btn-sm btn-white"
                                            ng-click="showTimeLockReceive = !showTimeLockReceive"
                                    >
                                        X
                                    </button>
                                </div>
                            </div>
                            <div ng-show="receiveTimeLock == 'scheduled' || receiveTimeLock == 'daterange'  && showTimeLockReceive">
                                <div class="col-md-12 p-0" ng-show="showTimeLockReceive">
                                        <span class="small-gray-text">
                                    From
                            </span>
                                    <br>
                                    <input class="form-control"
                                           type="date"
                                           min="{{todayDate}}"
                                           onkeydown="return false"
                                           ng-model="ToStartTime"
                                           ng-hide="receiveTimeLock == 'daterange'"
                                    >
                                    <span class="b-form small-gray-text text-fusion fusion-text-14 p-1"
                                          ng-show="receiveTimeLock == 'daterange'">Now</span>
                                </div>
                                <div class="col-md-12 p-0" ng-show="showTimeLockReceive">
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
                                               min="{{todayDate}}"
                                               onkeydown="return false"
                                               ng-model="ToEndTime">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="invalid-feedback" ng-show="selectedReceiveAsset == selectedSendAsset">
                        Send and Receive can't be the same asset.
                    </div>
                    <div class="col-md-12 p-0">
                        <h3 class="h3-blue">Swap Rate</h3>
                        <div class="col-md-6 p-0">
                            <div class="row">
                                <div class="col-md-5 pl-3">
                                    <input type="text" class="form-control m-0 mt-1" ng-model="makeSendSwapRate"
                                           placeholder="Amount"
                                           ng-change="setSendAmountMakeSwap()"
                                    > <span
                                            class="small-gray-text">{{selectedSendAsset}}</span>
                                </div>
                                <div class="col-md-1 pt-2">
                                    <h3 class="h3-blue p-0 m-0 text-center">:</h3>
                                </div>
                                <div class="col-md-5 pr-3">
                                    <div class="gray-bg p-2 fusion-text-14">1 <span
                                                class="fusion-text-12">{{selectedReceiveAssetSymbol}}</span>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-12 p-0">
                        <h3 class="h3-blue">Swap Totals</h3>
                        <div class="sendAssetBalanceAvailable display-web-inline-block"
                             ng-show="selectedAssetBalance >= 0">
                            <strong class="font-size-16 text-fusion">{{selectedAssetBalance}}</strong><span
                                    class="small-gray-text"> available.</span>
                        </div>
                    </div>

                    <div class="col-md-12 p-0 pt-2">
                        <div class="col-md-6 p-0">
                            <div class="row">
                                <div class="col-md-5">
                                    <span class="small-gray-text">Send Amount</span>
                                    <input type="text" class="form-control m-0 mt-1" ng-model="makeSendAmount"
                                           placeholder="Amount"
                                           ng-change="setReceiveAmountMakeSwap(); setSwapRate()"
                                    >
                                </div>
                                <div class="col-md-1 pt-2">
                                    <span class="text-white">-</span>
                                    <h3 class="h3-blue p-0 m-0 text-center">:</h3>
                                </div>
                                <div class="col-md-5">
                                    <span class="small-gray-text">Receive Amount</span>
                                    <input type="text" class="form-control m-0 mt-1" ng-model="makeReceiveAmount"
                                           placeholder="Amount"
                                           ng-change="setSwapRate()"
                                    >
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-6 p-0">
                        <h3 class="h3-blue">Swap Minimums</h3>
                        <span class="small-gray-text">Number of Fills</span>
                        <input type="text" class="form-control m-0 mt-1 pb-2" ng-model="makeMinumumSwap"
                               ng-change="setMinimumMakes()"
                               placeholder="Amount">
                    </div>
                    <div class="col-md-12 p-0">
                        <div class="col-md-5 p-0">
                            <div class="float-left"><span class="small-gray-text">
                           Minimum Send
                        </span></div>
                            <div class="float-right">
                                <span class="small-gray-text">
                           Minimum Receive
                        </span>
                            </div>
                            <br>
                            <div class="col-md-12 mt-2 mb-2 p-0 text-center">
                                <div class="gray-bg p-2 fusion-text-14">
                                    <div class="float-left"><strong
                                                class="font-size-16">{{minimumMakeSend}}</strong> {{selectedSendAssetSymbol}}
                                    </div>
                                    :
                                    <div class="float-right">
                                        <strong class="font-size-16">{{minimumReceiveSend}}</strong> {{selectedReceiveAssetSymbol}}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-12 p-0">
                        <h3 class="h3-blue">Access</h3>
                        <span class="small-gray-text">Available to</span>
                        <br>
                        <input type="radio" class="ml-0" ng-model="privateAccess" ng-value="false" checked>
                        <span class="small-gray-text pr-3">Public</span>
                        <input type="radio" class="ml-0" ng-model="privateAccess" ng-value="true">
                        <span class="small-gray-text">Wallet Addresses</span>
                    </div>
                    <div class="col-md-12 p-0" ng-show="privateAccess == true">
                        <span class="small-gray-text">Seperate addresses with commas.</span>
                        <input type="text" class="form-control m-0 mt-1"
                               ng-model="makeTarges"
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
                                    ng-disabled="makeSendAmount == '' || makeReceiveAmount == '' || makeMinumumSwap == '' || selectedReceiveAsset == selectedSendAsset; "
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
                                <span class="fusion-text-18">{{makeSendAmount}}</span> <span
                                        class="fusion-text-14">{{assetToSendConfirm}}</span>
                                <br>
                                <span class="small-gray-text" ng-show="showTimeLockSend">
                                <img class="mr-2" src="images/sendtl.svg" width="12px">
                                    <span ng-show="sendTimeLock == 'daterange'">Now - {{fromEndTimeString}}</span>
                                    <span ng-show="sendTimeLock == 'scheduled'">{{fromStartTimeString}}
                                        - ∞ Forever</span>
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
                                <span class="fusion-text-18">{{makeReceiveAmount}}</span> <span
                                        class="fusion-text-14">{{assetToReceiveConfirm}}</span>
                                <br>
                                <span class="small-gray-text" ng-show="showTimeLockReceive">
                                <img class="mr-2" src="images/sendtl.svg" width="12px">
                                    <span ng-show="receiveTimeLock == 'scheduled'">{{toStartTimeString}}
                                        - ∞ Forever</span>
                                    <span ng-show="receiveTimeLock == 'daterange'">Now - {{toEndTimeString}}</span>
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
                                <span class="fusion-text-18">{{makeSendAmount}}</span> <span
                                        class="fusion-text-14">{{assetToSendConfirm}}</span>
                                : <span class="fusion-text-18">{{makeReceiveAmount}}</span> <span
                                        class="fusion-text-14">{{assetToReceiveConfirm}}</span>

                            </div>
                        </div>
                    </div>
                    <div class="row p-2 pt-3 pb-3 gray-border-bottom">
                        <div class="col-md-6 small-gray-text">
                            Number of Fills
                        </div>
                        <div class="col-md-6">
                            <div class="float-right">
                                <span class="fusion-text-18">{{makeMinumumSwap}}</span> <span
                                        class="fusion-text-14">{{assetToSendConfirm}}</span>
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
                        <div class="col-md-6">
                            <button class="btn btn-white w-100" ng-click="makeSwapModal.open()">Back</button>
                        </div>
                        <div class="col-md-6">
                            <button class="btn btn-primary w-100" ng-click="makeSwap()"
                                    ng-disabled="swapRecallSuccess">Make Swap
                            </button>
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

                    <div class="row p-2 pt-3 pb-3 info-bg mt-1">
                        <div class="col-md-6 small-gray-text">
                            You will be sending
                        </div>
                        <div class="col-md-6">
                            <div class="float-right text-right">
                                <span class="fusion-text-18">{{makeSendAmount}}</span> <span
                                        class="fusion-text-14">{{assetToSendConfirm}}</span>
                                <br>
                                <span class="small-gray-text" ng-show="showTimeLockSend">
                                <img class="mr-2" src="images/sendtl.svg" width="12px">
                                    <span ng-show="sendTimeLock == 'daterange'">Now - {{fromEndTimeString}}</span>
                                    <span ng-show="sendTimeLock == 'scheduled'">{{fromStartTimeString}}
                                        - ∞ Forever</span>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="row p-2 pt-3 pb-3 info-bg mt-1">
                        <div class="col-md-6 small-gray-text">
                            You will be receiving
                        </div>
                        <div class="col-md-6">
                            <div class="float-right text-right">
                                <span class="fusion-text-18">{{makeReceiveAmount}}</span> <span
                                        class="fusion-text-14">{{assetToReceiveConfirm}}</span>
                                <br>
                                <span class="small-gray-text" ng-show="showTimeLockReceive">
                                <img class="mr-2" src="images/sendtl.svg" width="12px"><span
                                            ng-show="receiveTimeLock == 'scheduled'">{{toStartTimeString}}
                                        - ∞ Forever</span>
                                    <span ng-show="receiveTimeLock == 'daterange'">Now - {{toEndTimeString}}</span>
                                </span>
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
                                <p>Make Swap Successful! This swap is now available in the swap market. You can track
                                    it’s progress or recall the swap in the “Open Makes” tab. </p>
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
                                  <span class="gray-text" ng-click="takeSwapConfirm.close()">                    <i
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
                                <span class="fusion-text-18">{{sendTokens}}</span>
                                <span class="fusion-text-14">{{takeDataFront.fromAssetSymbol}}</span>
                                <br>
                                <span class="small-gray-text" ng-show="showTimeLockSend">
                                <img class="mr-2" src="images/sendtl.svg" width="12px">{{fromStartTimeString}}
                                    - {{fromEndTimeString}}
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
                                <span class="fusion-text-18">{{receiveTokens}}</span> <span
                                        class="fusion-text-14">{{takeDataFront.toAssetSymbol}}</span>
                                <br>
                                <span class="small-gray-text" ng-show="showTimeLockReceive">
                                <img class="mr-2" src="images/sendtl.svg" width="12px">{{toStartTimeString}}
                                    - {{toEndTimeString}}
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
                        <div class="col-md-6">
                            <button class="btn btn-white w-100" ng-click="takeSwapConfirm.close()">
                                Back
                            </button>
                        </div>
                        <div class="col-md-6">
                            <button class="btn btn-primary w-100"
                                    ng-click="takeSwap(takeDataFront.fromAssetId, takeDataFront.swapId , takeAmountSwap)">
                                Take Swap
                            </button>
                        </div>
                    </div>
                </article>
            </section>
        </section>
    </article>
    <article class="modal fade" id="errorModal" tabindex="-1">
        <section class="modal-dialog">
            <section class="modal-content">
                <article class="block">
                    <div class="col-md-12 p-0">
                        <div class="float-right">
                                  <span class="gray-text"
                                        ng-click="errorModal.close();">                    <i
                                              class="fa fa-times"
                                              aria-hidden="true"></i>
</span>
                        </div>
                    </div>

                    <div class="col-md-12 text-center p-2">
                        <img src="images/exclamation-circle.svg" class="text-center" height="80px" width="80px"
                             color="red"
                             alt="">
                    </div>

                    <h3 class="text-center">Oops</h3>
                    <p class="text-center">
                        Something went wrong, please retry..
                    </p>
                </article>

            </section>
        </section>
    </article>
    <article class="modal fade" id="takeSwapEndConfirm" tabindex="-1">
        <section class="modal-dialog send-asset-dialog">
            <section class="modal-content">
                <article class="block" ng-hide="wallet.type=='addressOnly'">
                    <div class="col-md-12 p-0">
                        <div class="float-right">
                                  <span class="gray-text" ng-click="takeSwapEndConfirm.close()">                    <i
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
                                <span class="fusion-text-18">{{sendTokens}}</span> {{takeDataFront.fromAssetSymbol}}
                            </div>
                        </div>
                    </div>
                    <div class="row p-2 gray-bg gray-bg-2 m-0 mt-2">
                        <div class="col-md-6 small-gray-text">
                            Receiving
                        </div>
                        <div class="col-md-6">
                            <div class="float-right">
                                <span class="fusion-text-18">{{receiveTokens}}</span> {{takeDataFront.toAssetSymbol}}
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
                                <p>Take Swap Successful! The funds should be available in your wallet within the next 15
                                    seconds.</p>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12 text-center">
                            <button class="btn btn-white" ng-click="takeSwapEndConfirm.close()">
                                Back to Swap Market
                            </button>
                        </div>
                    </div>
                </article>
            </section>
        </section>
    </article>

</article>