<article class="block container p-0 border-0 no-shadow" ng-hide="wallet.type=='addressOnly'">
    <div class="row swap-market-new">
        <div class="col-md-12 p-0">
            <nav class="nav-container border-0">
                <div class="nav-scroll">
                    <ul class="nav-inner">
                        <li class="nav-item Swaps pl-3 pr-2 mb-1px nav-item-new"
                            ng-class="{active: showSwapMarket==true && showOpenTakes==false}">
                            <a class="ng-scope"
                               ng-click="showSwapMarket = true ; showOpenMakes = false; showOpenTakes = false">Swap
                                Market</a>
                        </li>
                        <li class="nav-item Swaps mb-1px nav-item-new"
                            ng-class="{active: showSwapMarket==false  && showOpenTakes==false}">
                            <a class="ng-scope"
                               ng-click="showSwapMarket = false ; showOpenMakes = true; showOpenTakes = false">My Open
                                Swaps
                                ({{openMakeSwaps}})
                                <span></span></a>
                        </li>
                        <li class="nav-item Swaps pr-2 mb-1px nav-item-new"
                            ng-class="{active: showOpenTakes==true  && showSwapMarket==false}">
                            <a class="ng-scope"
                               ng-click="showSwapMarket = false ; showOpenMakes = false; showOpenTakes = true">Private
                                Swap
                                ({{openTakeSwapsTotal}})
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
        <div class="col-md-12 p-2 bg-body make-swap-section" ng-show="showSwapMarket === true">
            <div class="col-md-3 text-left mr-0">
                <span class="small-gray-text">YOU SEND</span>
                <br>
                <div class="col-md-12 col-xs-12 p-1 mt-1 asset-dropdown mn-55 border-gray-dropdown bg-white"
                     tw-click-outside="closesendDropDown()" ignore-if="!sendDropDown"
                     ng-click="sendDropDown = !sendDropDown && closeAllOtherDropDowns('sendDropDown')">
                    <div class="float-left w-75">
                        <a>
                            <div class="col-md-2 m-1 p-0" ng-show="selectedSendAsset !== 'All Assets'">
                                <img ng-if="selectedSendHasImage"
                                     ng-src="images/verifiedassets/{{selectedSendImage}}"/>
                                <span ng-if="!selectedSendHasImage"
                                      class="btn btn-white btn-circle w32 asset-round mt-0">{{selectedSendAssetSymbol}}</span>
                            </div>
                            <div class="col" click-out="!sendDropDown">
                                {{selectedSendAsset}}
                                <span
                                        class="color-Active official-fusion-badge-new "
                                        ng-show="selectedSendVerified && selectedSendAsset !== 'All Assets'">
                                        <img src="./images/verified.svg" height="14px" width="14px"/>
                                </span>
                                <span class="small-gray-text max-char inline swap-market-address">{{formatAddress(selectedSendContract)}}</span>
                            </div>
                        </a>
                    </div>
                    <div class="float-right text-right">
                        <img src="images/caret-down.svg" class="Group-6">
                    </div>
                </div>
                <div class="dropdown-menu dropdown-menu fusion-text-14 p-2 higher-min-width" ng-show="sendDropDown"
                     tw-click-outside="closeSendDropDown()" ignore-if="!sendDropDown">
                    <form class="form-inline">
                        <div class="form-group m-0">
                            <input type="text" class="form-control"
                                   id="searchSendAsset"
                                   ng-model="searchSendAsset"
                                   placeholder="Search by Symbol, Name, or ID">
                        </div>
                    </form>
                    <div class="col-md-12 col-xs-12 p-2 mt-1 asset-dropdown allassets"
                         ng-click="setMakeUSAN()">
                        <span class="badge badge-success badge-info">
                            USAN <strong>{{usanAddress}}</strong>
                        </span>
                    </div>
                    <div class="col-md-12 col-xs-12 p-2 mt-1 asset-dropdown allassets" ng-click="setAllAssetsInSend()">
                        <a>
                            All Assets
                        </a>
                    </div>
                    <div class="col-md-12 col-xs-12 p-1 mt-1 asset-dropdown bg-white"
                         ng-repeat="asset in assetList | filter:searchSendAsset | orderBy:'-verified' track by $index">
                        <a ng-click="setSendAllAssets(asset.id)">
                            <div class="col-md-2 p-0">
                                <img ng-if="asset.hasImage"
                                     ng-src="images/verifiedassets/{{asset.image}}"/>
                                <span ng-if="!asset.hasImage"
                                      class="btn btn-white btn-circle w32 asset-round mt-0">{{asset.symbol}}</span>
                            </div>
                            <div class="col">
                                <span class="fusion-text-14">
                        {{asset.name.substr(0,20)}} ({{asset.symbol}}) <span class="color-Active official-fusion-badge"
                                                                             ng-show="asset.verified">                                    <img
                                                src="./images/verified.svg" height="14px" width="14px"/></span>
</span>
                                <br>
                                <span class="small-gray-text max-char inline swap-market-address">{{formatAddress(asset.contractaddress)}}</span>
                                </span>
                            </div>

                        </a>
                    </div>
                </div>
            </div>
            <div class="col-md-1 text-center">
                <div>
                    <img src="./images/Switcher.svg"
                         class="mb-2 mt-3"
                         ng-click="switchAsset()"
                    />
                </div>
            </div>
            <div class="col-md-3 text-left">
                <span class="small-gray-text">YOU RECEIVE</span>
                <br>
                <div class="col-md-12 col-xs-12 p-1 mt-1 asset-dropdown mn-55 border-gray-dropdown bg-white"
                     tw-click-outside="closereceiveDropDown()" ignore-if="!receiveDropDown"
                     ng-click="receiveDropDown = !receiveDropDown">
                    <div class="float-left w-75">
                        <a>
                            <div class="col-md-2 m-1 p-0" ng-show="selectedReceiveAsset !== 'All Assets'">
                                <img ng-if="selectedReceiveHasImage"
                                     ng-src="images/verifiedassets/{{selectedReceiveImage}}"/>
                                <span ng-if="!selectedReceiveHasImage && selectedReceiveAsset !== 'All Assets'"
                                      class="btn btn-white btn-circle w32 asset-round mt-0">{{selectedReceiveAssetSymbol}}</span>

                            </div>
                            <div class="col">
                                {{selectedReceiveAsset}} <span
                                        class="color-Active official-fusion-badge-new"
                                        ng-show="selectedReceiveVerified && selectedReceiveAsset !== 'All Assets'">                                    <img
                                            src="./images/verified.svg" height="14px" width="14px"/></span>
                                </span>
                                <span class="small-gray-text max-char inline swap-market-address">{{formatAddress(selectedReceiveContract)}}</span>
                            </div>
                        </a>
                    </div>
                    <div class="float-right text-right">
                        <img src="images/caret-down.svg" class="Group-6">
                    </div>
                </div>
                <div class="dropdown-menu dropdown-menu fusion-text-14 p-2 higher-min-width" ng-show="receiveDropDown"
                     tw-click-outside="closeReceiveDropDown()" ignore-if="!receiveDropDown">
                    <form class="form-inline">
                        <div class="form-group m-0">
                            <input type="text" class="form-control"
                                   id="searchReceiveAsset"
                                   ng-model="searchReceiveAsset"
                                   placeholder="Search by Symbol, Name, or ID">
                        </div>
                    </form>
                    <div class="col-md-12 col-xs-12 p-2 mt-1 asset-dropdown allassets"
                         ng-click="setReceiveUSAN()">
                        All Short Account Numbers</strong>
                    </div>
                    <div class="col-md-12 col-xs-12 p-2 mt-1 asset-dropdown allassets"
                         ng-click="setAllAssetsInReceive()">
                        <a>
                            All Assets
                        </a>
                    </div>
                    <div class="col-md-12 col-xs-12 p-2 mt-1 asset-dropdown"
                         ng-repeat="asset in assetList | filter:{'contractaddress':'0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'} | orderBy:'-verified' track by $index">
                        <a ng-click="setReceiveAsset(asset.id)">
                            <div class="col-md-2 p-0">
                                <img ng-if="asset.hasImage"
                                     ng-src="images/verifiedassets/{{asset.image}}"/>
                                <span ng-if="!asset.hasImage"
                                      class="btn btn-white btn-circle w32 asset-round mt-0">{{asset.symbol}}</span>
                            </div>
                            <div class="col">
                                <span class="fusion-text-14">
                        {{asset.name.substr(0,20)}} ({{asset.symbol}}) <span class="color-Active official-fusion-badge"
                                                                             ng-show="asset.verified">                                    <img
                                                src="./images/verified.svg" height="14px" width="14px"/></span>
</span>
                                <br>
                                <span class="small-gray-text max-char inline swap-market-address">{{formatAddress(asset.contractaddress)}}</span>
                                </span>
                            </div>
                        </a>
                    </div>
                    <div class="col-md-12 col-xs-12 p-2 mt-1 asset-dropdown"
                         ng-repeat="asset in assetList | filter:searchReceiveAsset | filter:{'contractaddress':'!0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'} | orderBy:'-verified' track by $index">
                        <a ng-click="setReceiveAsset(asset.id)">
                            <div class="col-md-2 p-0">
                                <img ng-if="asset.hasImage"
                                     ng-src="images/verifiedassets/{{asset.image}}"/>
                                <span ng-if="!asset.hasImage"
                                      class="btn btn-white btn-circle w32 asset-round mt-0">{{asset.symbol}}</span>
                            </div>
                            <div class="col">
                                <span class="fusion-text-14">
                        {{asset.name.substr(0,20)}} ({{asset.symbol}}) <span class="color-Active official-fusion-badge"
                                                                             ng-show="asset.verified">                                    <img
                                                src="./images/verified.svg" height="14px" width="14px"/></span>
</span>
                                <br>
                                <span class="small-gray-text max-char inline swap-market-address">{{formatAddress(asset.contractaddress)}}</span>
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
                <br>
                <span class="small-gray-text" style="font-size:10px;" ng-hide="!sendHasTimeLockBalance">
                                <img class="mr-2" src="images/sendtl.svg" width="10px"> Has Time-Lock Balance
            </span>
            </div>
            <div class="col-md-2 text-right">
                <span class="small-gray-text"> </span>
                <br>
                <button class="btn btn-primary make-swap-btn" ng-click="makeModal()"
                        ng-class="{'disabled' : web3WalletBalance <= 0.00021}"
                        ng-disabled="web3WalletBalance <= 0.00021">Make Swap
                </button>
            </div>
        </div>
        <div class="col-md-12 pl-0 pr-0">
            <div class="panel panel-default mx-auto" ng-show="showOpenTakes === true">
                <div class="panel-body inline w-100">
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
                            <th class="text-left" scope="col">Price</th>
                            <th class="text-right" scope="col">You Send</th>
                            <th class="text-right" scope="col">You Receive</th>
                            <th class="text-right" scope="col">Minimum Fill</th>
                            <th class="text-right" scope="col" class="float-right">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr ng-repeat="asset in openTakeSwaps track by $index">
                            <td class="text-left" ng-click="swapInformationModalOpen(asset.swap_id)">
                                <strong>{{asset.swapratetaker.toFixed(4)}}</strong> {{asset.toAssetSymbol}} :
                                <strong>1</strong> : {{asset.fromAssetSymbol}}
                            </td>
                            <td class="text-right" ng-click="swapInformationModalOpen(asset.swap_id)">
                                <strong>{{asset.toAmountCut}}</strong> <span
                                        class="font-size-12">{{asset.toAssetSymbol}}</span>
                                <span
                                        class="color-Active official-fusion-badge"
                                        ng-show="asset.toVerified">                                    <img
                                            src="./images/verified.svg" height="14px" width="14px"/></span>
                                </span>
                                <br>
                                <span class="small-gray-text"
                                      ng-hide="asset.ToStartTime == 0 && asset.ToEndTime == 18446744073709552000">
                                <img class="mr-2" src="images/sendtl.svg" width="12px">{{asset.ToStartTimeString}}
                                    - {{asset.ToEndTimeString}}
                            </span>
                            </td>
                            <td class="text-right" ng-click="swapInformationModalOpen(asset.swap_id)">
                                <strong>{{asset.fromAmountCut}}</strong>
                                <span>{{asset.fromAssetSymbol}}</span>
                                <span
                                        class="color-Active official-fusion-badge"
                                        ng-show="asset.fromVerified">                                    <img
                                            src="./images/verified.svg" height="14px" width="14px"/></span>
                                </span>
                                <br>
                                <span class="small-gray-text"
                                      ng-hide="asset.FromStartTime == 0 && asset.FromEndTime == 18446744073709552000">
                                <img class="mr-2" src="images/sendtl.svg" width="12px">{{asset.FromStartTimeString}}
                                    - {{asset.FromEndTimeString}}
                            </span>
                            </td>
                            <td class="text-right" ng-click="swapInformationModalOpen(asset.swap_id)">
                                <strong>{{asset.minswaptaker.toFixed(4)}}</strong> <span
                                        class="font-size-12">{{asset.toAssetSymbol}}</span></td>
                            <td class="float-right text-right">
                                <div ng-hide="asset.owned == false">
                                    <button class="btn btn-sm btn-white m-0" ng-click="recallModal(asset.swap_id)">
                                        Recall
                                        Swap
                                    </button>
                                </div>
                                <div ng-hide="asset.owned == true">
                                    <button class="btn btn-sm btn-white m-0"
                                            ng-click="takeModalPrivateSwaps(asset.id)"
                                            ng-disabled="hasEnoughBalance(asset.toAssetId,asset.minswaptaker) && !hasTimeLockBalance(asset.toAssetId)"
                                    >Take Swap
                                    </button>
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="panel panel-default mx-auto" ng-show="showSwapMarket === false && showOpenTakes === false">
                <div class="panel-body inline w-100">
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
                            <th class="text-left" scope="col">Price</th>
                            <th class="text-right" scope="col" ng-click="sortOpenMakes('fromAmountCut')">You Send
                                <img src="images/Static.svg" ng-show="sortOpenMakes !== 'fromAmountCut'"/>
                                <img src="images/Ascend.svg"
                                     ng-show="sortOpenMakes == 'fromAmountCut' && reverseMake == false"/>
                                <img src="images/Descend.svg"
                                     ng-show="sortOpenMakes == 'fromAmountCut' && reverseMake == true"/>
                            </th>
                            <th class="text-right" scope="col" ng-click="sortOpenMakes('toAmountCut')">You Receive
                                <img src="images/Static.svg" ng-show="sortOpenMakes !== 'toAmountCut'"/>
                                <img src="images/Ascend.svg"
                                     ng-show="sortOpenMakes == 'toAmountCut' && reverseMake == false"/>
                                <img src="images/Descend.svg"
                                     ng-show="sortOpenMakes == 'toAmountCut' && reverseMake == true"/>
                            </th>
                            <th class="text-right" scope="col" ng-click="sortOpenMakes('minswap')">Minimum Fill
                                <img src="images/Static.svg" ng-show="sortOpenMakes !== 'minswap'"/>
                                <img src="images/Ascend.svg"
                                     ng-show="sortOpenMakes == 'minswap' && reverseMake == false"/>
                                <img src="images/Descend.svg"
                                     ng-show="sortOpenMakes == 'minswap' && reverseMake == true"/>
                            </th>
                            <th class="text-right" scope="col" class="float-right">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr ng-repeat="asset in openMakes | orderBy:sortKeyMake:reverseMake | filter: { owned: true } track by $index"
                        >
                            <td class="text-left" ng-click="swapInformationModalOpen(asset.swap_id)">
                                <strong>{{asset.swaprate.toFixed(4)}}</strong> {{asset.fromAssetSymbol}} :
                                <strong>1</strong> {{asset.toAssetSymbol}}
                            </td>
                            <td class="text-right" ng-click="swapInformationModalOpen(asset.swap_id)">
                                <strong>{{asset.fromAmountCut}}</strong> {{asset.fromAssetSymbol}} <span
                                        class="color-Active official-fusion-badge"
                                        ng-show="asset.fromVerified">                                    <img
                                            src="./images/verified.svg" height="14px" width="14px"/></span>
                                </span>
                                <br>
                                <span class="small-gray-text"
                                      ng-hide="asset.FromStartTime == 0 && asset.FromEndTime == 18446744073709552000">
                                <img class="mr-2" src="images/sendtl.svg" width="12px">{{asset.FromStartTimeString}}
                                    - {{asset.FromEndTimeString}}
                            </span>
                            </td>
                            <td class="text-right" ng-click="swapInformationModalOpen(asset.swap_id)">
                                <strong>{{asset.toAmountCut}}</strong> {{asset.toAssetSymbol}}
                                <span
                                        class="color-Active official-fusion-badge"
                                        ng-show="asset.toVerified">                                    <img
                                            src="./images/verified.svg" height="14px" width="14px"/></span>
                                </span>
                                <br>
                                <span class="small-gray-text"
                                      ng-hide="asset.ToStartTime == 0 && asset.ToEndTime == 18446744073709552000">
                                <img class="mr-2" src="images/sendtl.svg" width="12px">{{asset.ToStartTimeString}}
                                    - {{asset.ToEndTimeString}}
                            </span>
                            </td>
                            <td class="text-right" ng-click="swapInformationModalOpen(asset.swap_id)">
                                <strong>{{asset.minswapopenmake.toFixed(4)}}</strong> {{asset.fromAssetSymbol}}
                            </td>
                            <td class="float-right text-right">
                                <div ng-hide="asset.owned == false">
                                    <button class="btn btn-sm btn-white m-0" ng-click="recallModal(asset.swap_id)">
                                        Recall
                                        Swap
                                    </button>
                                </div>
                                <div ng-hide="asset.owned == true">
                                    <button class="btn btn-sm btn-white m-0"
                                            ng-click="takeModal(asset.id)"
                                            ng-disabled="hasEnoughBalance(asset.toAssetId,asset.minswaptaker,asset.ToStartTime,asset.ToEndTime) && !hasTimeLockBalance(asset.toAssetId)"
                                    >Take Swap
                                    </button>
                                </div>

                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="panel panel-default mx-auto" ng-show="showSwapMarket === true && showOpenTakes === false">
                <div class="panel-body inline w-100">
                    <div class="col-md-12 p-0">
                        <div class="float-left">
                            <div class="col-md-12">
                                <div class="row">
                                    <div class="col-md-12 pl-2">
                                        <form class="form-inline">
                                            <div class="form-group">
                                                <input type="text" ng-model="searchSwapMarket"
                                                       class="form-control m-0 search-swap-input"
                                                       placeholder="Search">
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
                    </div>
                    <div class="col-md-12 text-center p-5" ng-show="allSwapsRunning">
                        <i class="fa fa-circle-o-notch fa-spin fa-fw"></i>
                        <span class="small-gray-text">Loading...</span>
                    </div>
                    <div class="col-md-12 text-center p-5" ng-show="swapsList.length === 0 && !allSwapsRunning">
                        <span>No swaps for this trading pair</span>
                    </div>
                    <table class="table" ng-show="swapsList.length > 0 && !allSwapsRunning">
                        <thead>
                        <tr class="small-gray-table">
                            <th class="text-left" scope="col" ng-click="sortSwapMarket('swaprate')">
                                PRICE PER ETH
                                <img src="images/Static.svg" ng-show="sortKey !== 'swaprate'"/>
                                <img src="images/Ascend.svg" ng-show="sortKey == 'swaprate' && reverse == false"/>
                                <img src="images/Descend.svg" ng-show="sortKey == 'swaprate' && reverse == true"/>
                            </th>
                            <th class="text-right" scope="col" ng-click="sortSwapMarket('fromAmountCut')">
                                YOU SEND
                                <img src="images/Static.svg" ng-show="sortKey !== 'fromAmountCut'"/>
                                <img src="images/Ascend.svg" ng-show="sortKey == 'fromAmountCut' && reverse == false"/>
                                <img src="images/Descend.svg" ng-show="sortKey == 'fromAmountCut' && reverse == true"/>
                            </th>
                            <th class="text-right" scope="col" ng-click="sortSwapMarket('toAmountCut')">
                                YOU RECEIVE
                                <img src="images/Static.svg" ng-show="sortKey !== 'toAmountCut'"/>
                                <img src="images/Ascend.svg" ng-show="sortKey == 'toAmountCut' && reverse == false"/>
                                <img src="images/Descend.svg" ng-show="sortKey == 'toAmountCut' && reverse == true"/>
                            </th>
                            <th class="text-right" scope="col" ng-click="sortSwapMarket('minswap')">
                                Minimum Fill
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
                        <tr ng-repeat="asset in swapsList | orderBy:'convertTimePosixToNumber'">
                            <td class="text-left"
                                ng-click="swapInformationModalOpen(asset.swap_id)">
                                <strong class="price">{{asset.swapratetaker.toFixed(4)}}</strong> <span
                                        class="font-size-12">{{asset.toAssetSymbol.substr(0,4)}}</span> : <strong
                                        class="price">1</strong> <span
                                        class="font-size-12">{{asset.fromAssetSymbol.substr(0,4)}}</span></td>
                            <td class="text-right"
                                ng-click="swapInformationModalOpen(asset.swap_id)"
                            ><strong class="price">{{asset.toAmountCut}}</strong> <span
                                        class="asset-label">{{asset.toAssetSymbol}}</span>
                                <span class="color-Active official-fusion-badge"
                                      ng-show="asset.toVerified">                                    <img
                                            src="./images/verified.svg" height="14px" width="14px"/></span>
                                </span>
                                <br>
                                <span class="small-gray-text"
                                      ng-hide="asset.ToStartTime == 0 && asset.ToEndTime == 18446744073709552000">
                                <img class="mr-2" src="images/sendtl.svg" width="12px">{{asset.ToStartTimeString}}
                                    - {{asset.ToEndTimeString}}
                            </span>
                            </td>
                            <td class="text-right"
                                ng-click="swapInformationModalOpen(asset.swap_id)">
                                <strong class="price">{{asset.fromAmountCut}}</strong>
                                <span class="asset-label">{{asset.fromAssetSymbol}}</span>
                                <span class="color-Active official-fusion-badge"
                                      ng-show="asset.fromVerified">                                    <img
                                            src="./images/verified.svg" height="14px" width="14px"/></span>
                                </span>
                                <br>
                                <span class="small-gray-text"
                                      ng-hide="asset.FromStartTime == 0 && asset.FromEndTime == 18446744073709552000">
                                <img class="mr-2" src="images/sendtl.svg" width="12px">{{asset.FromStartTimeString}}
                                    - {{asset.FromEndTimeString}}
                            </span>
                            </td>
                            <td class="text-right"
                                ng-click="swapInformationModalOpen(asset.swap_id)">
                                <strong class="price">{{asset.minswaptaker.toFixed(4)}}</strong> <span
                                        class="font-size-12">{{asset.toAssetSymbol}}</span></td>
                            <td class="float-right text-right">
                                <div ng-hide="asset.owned == false">
                                    <button class="btn btn-sm btn-white m-0" ng-click="recallModal(asset.swap_id)">
                                        Recall
                                        Swap
                                    </button>
                                </div>
                                <div ng-hide="asset.owned == true">
                                    <button class="btn btn-sm btn-white m-0"
                                            ng-click="takeModal(asset.id)"
                                            ng-disabled="takeAvailable(asset.toAssetId,asset.minswaptaker,asset.ToStartTime,asset.ToEndTime)"
                                    >Take Swap
                                    </button>
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    <article class="modal fade" id="recallAsset" tabindex="-1">
        <section class="modal-dialog send-asset-dialog">
            <section class="modal-content no-shadow">
                <article class="block no-shadow" ng-hide="wallet.type=='addressOnly'">
                    <div class="col-md-12 p-0">
                        <div class="float-right">
                                  <span class="gray-text" ng-click="recallAssetModal.close();">                    <i
                                              class="fa fa-times"
                                              aria-hidden="true"></i>
</span>
                        </div>
                    </div>
                    <h3 class="make-swap">Recall Swap</h3>

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
    <article class="modal fade modal-new" id="takeSwap" tabindex="-1">
        <section class="modal-dialog send-asset-dialog reset-modal">
            <section class="modal-content no-shadow">
                <article class="block no-shadow reset-modal" ng-hide="wallet.type=='addressOnly'">
                    <img class="close-btn" src="images/t.svg" width="20px" height="20px" ng-click="takeSwapModal.close()">

                    <div class="limit-width">
                        <h3 class="h3-blue title">Take Swap</h3>
                        <div class="title-warning" ng-show="!takeDataFront.toVerified">
                            <img class="icon" src="./images/unverified.svg" height="16px" width="14px"/>
                            <div class="description">Caution: this swap contains a suspicious asset(s).</div>
                        </div>
                        <div class="fills-section">
                            <div class="fills-available">
                                <img class="icon" src="./images/fills.svg" height="24px" width="24px"/>
                                <div class="description">BLANK Fills Available</div>
                            </div>
                            <div class="filler"></div>
                            <div class="amount-details">
                                <input type="number" class="form-control m-0 mt-1 amount"
                                        ng-model="takeAmountSwap"
                                        min="1"
                                        max="{{takeDataFront.size}}"
                                        ng-change="setReceive()" placeholder="Fills">
                                <span class="max-fills" >Max Fills {{takeDataFront.size}}</span>
                            </div>
                        </div>

                        <div class="row summary take-swap-summary">
                            <div class="col-md-6 summary-col">
                                <div class="summary-header">
                                    <img class="icon" src="images/you-send-new.svg" class="pr-2">
                                    <span>You Send</span>
                                </div>
                                <div class="summary-content">
                                    <div class="summary-cell">
                                        <div class="logo">
                                            <img ng-if="takeDataFront.swapId.toHasImage==true"
                                                 ng-src="images/verifiedassets/{{takeDataFront.swapId.toVerifiedImage}}" height="32px" width="32px"/>
                                            <span ng-if="!takeDataFront.swapId.toHasImage" class="btn btn-white btn-circle w32 asset-round mt-0">{{takeDataFront.swapId.toAssetSymbol}}</span>
                                        </div>
                                        <div class="details-wrapper">
                                            <div class="details">
                                                <span class="qty">{{sendTokens}}</span>
                                                <div class="curr-sym">
                                                    <span class="currency">{{takeDataFront.fromAssetSymbol}}</span>
                                                    <img class="symbol" ng-if="takeDataFront.fromVerified" src="./images/verified.svg" height="14px" width="14px"/>
                                                    <img class="symbol" ng-if="!takeDataFront.fromVerified" src="./images/unverified.svg" height="16px" width="14px"/>
                                                </div>
                                            </div>
                                            <div class="date-range">
                                                <span class="small-gray-text" ng-hide="takeDataFront.swapId.ToStartTime == 0 && takeDataFront.swapId.ToEndTime == 18446744073709552000">
                                                    <img class="mr-2 icon" src="images/send-timelock-icon.svg" width="12px">
                                                    <span class="range">{{takeDataFront.swapId.ToStartTimeString}} - {{takeDataFront.swapId.ToEndTimeString}}</span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6 summary-col divider-left">
                                <div class="summary-header">
                                    <img class="icon" src="images/you-receive-new.svg" class="pr-2">
                                    <span>You Receive</span>
                                </div>
                                <div class="summary-content" ng-show="takeDataFront.toAssetId !== '0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe'">
                                    <div class="summary-cell">
                                        <div class="logo">
                                            <img ng-if="selectedReceiveHasImage==true"
                                                ng-src="images/verifiedassets/{{selectedReceiveImage}}" height="32px" width="32px"/>
                                            <span ng-if="!selectedReceiveHasImage" class="btn btn-white btn-circle w32 asset-round mt-0">{{takeDataFront.toAssetSymbol}}</span>
                                        </div>
                                        <div class="details-wrapper">
                                            <div class="details">
                                                <span class="qty">{{receiveTokens}}</span>
                                                <div class="curr-sym">
                                                    <span class="currency">{{takeDataFront.toAssetSymbol}}</span>
                                                    <img class="symbol" ng-if="takeDataFront.toVerified" src="./images/verified.svg" height="14px" width="14px"/>
                                                    <img class="symbol" ng-if="!takeDataFront.toVerified" src="./images/unverified.svg" height="16px" width="14px"/>
                                                </div>
                                            </div>
                                            <div class="date-range">
                                                <span class="small-gray-text"
                                                      ng-hide="takeDataFront.swapId.FromStartTime == 0 && takeDataFront.swapId.FromEndTime == 18446744073709552000">
                                                    <img class="mr-2" src="images/sendtl.svg" width="12px">
                                                    <span>{{takeDataFront.swapId.FromStartTimeString}} - {{takeDataFront.swapId.FromEndTimeString}}</span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="summary-content" ng-show="takeDataFront.toAssetId == '0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe'">
                                    <div class="summary-cell">
                                        <div class="usan"><div class="name"><span class="address">{{takeDataFront.toAssetSymbol}}</span></div></div>
                                    </div>
                                    <div class="summary-cell">
                                        <div class="usan-warning">Once this swap is taken, your USAN will no longer be associated with your address.</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="price-section">
                            <div class="price-row">
                                <div class="price">
                                    <img class="icon" src="./images/price.svg" height="24px" width="24px"/>
                                    PRICE
                                </div>
                                <div class="price-filler"></div>
                                <div class="price-value">{{takeDataFront.swapRate}}
                                    <span class="currency">{{takeDataFront.fromAssetSymbol}}</span> : {{1}}
                                    <span class="currency">{{takeDataFront.toAssetSymbol}}</span>
                                </div>
                            </div>
                            <div class="price-row">
                                <div class="price">
                                    <img class="icon" src="./images/fee.svg" height="24px" width="24px"/>
                                    TRANSACTION FEE
                                </div>
                                <div class="price-filler"></div>
                                <div class="price-value">{{'~.BLANK'}}
                                    <span class="currency">{{'FSN'}}</span>
                                </div>
                            </div>
                        </div>
                        <hr class="last-hr">
                        <div class="row actions-row">
                            <div class="btn-grp">
                                <button class="btn btn-white main-btn-secondary" ng-click="takeSwapModal.close()">Cancel</button>
                                <button class="btn btn-primary main-btn-primary" 
                                    ng-click="takeSwapConfirm.open()"
                                    ng-disabled="takeDataFront.fromAssetBalance <= 0 && !hasTimeLockBalance(takeDataFront.fromAssetId)">Review Swap
                                </button>
                            </div>
                        </div>
                    </div>
                </article>
            </section>
        </section>
    </article>
    <article class="modal fade" id="suspiciousAssetModal" tabindex="-1">
        <section class="modal-dialog send-asset-dialog">
            <section class="modal-content no-shadow">
                <article class="block no-shadow">
                    <div class="col-md-12 p-0">
                        <div class="float-right">
                                  <span class="gray-text"
                                        ng-click="suspiciousAssetModal.close();">                    <i
                                              class="fa fa-times"
                                              aria-hidden="true"></i>
</span>
                        </div>
                    </div>
                    <h3 class="make-swap mb-3"><img src="./images/unverified.svg" width="21px" height="24px"
                                                    class="mb-2 mr-2"> Swap Contains
                        Suspicious Asset(s)</h3>

                    <div class="col-md-12 p-0">
                        <div class="warning-bg p-3 inline w-100">
                            <h4 class="pt-0 mt-0">Caution</h4>
                            <p>The following asset is flagged as suspicous due to similarities in naming to a verified
                                asset. This asset was likely created in a scheme to gain verified assets through
                                deceptive practices.</p>
                            <div class="col-md-6 col-xs-6 p-1 mt-1 asset-dropdown mn-55 border-gray-dropdown bg-white">
                                <div class="float-left w-100">
                                    <a>
                                        <div class="col-md-2 m-1 p-0">
                                            <span ng-if="!takeDataFront.toVerified"
                                                  class="btn btn-white btn-circle w32 asset-round mt-0">{{takeDataFront.toAssetSymbol}}</span>
                                        </div>
                                        <div class="col mt-1">
                                            {{takeDataFront.toAssetName}} ({{takeDataFront.toAssetSymbol}}) <span
                                                    class="color-Active official-fusion-badge"><img
                                                        src="./images/unverified.svg" height="14px"
                                                        width="14px"/></span>
                                            <span class="small-gray-text max-char inline">{{takeDataFront.toAssetId}}</span>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-12 mt-4 mb-3">
                        <hr>
                    </div>
                    <div class="row">
                        <div class="col-md-7 float-right">
                            <div class="col-md-6 p-0 pr-2">
                                <button class="btn btn-white w-100" ng-click="suspiciousAssetModal.close()">Back
                                </button>
                            </div>
                            <div class="col-md-6 p-0 pl-2">
                                <button class="btn btn-yellow w-100"
                                        ng-click="takeSwapModal.open(takeId, true)">
                                    Continue
                                </button>
                            </div>
                        </div>
                    </div>
                </article>
            </section>
        </section>
    </article>


    <article class="modal fade bg-white modal-new" id="makeSwap" tabindex="-1">
        <section class="modal-dialog send-asset-dialog reset-modal">
            <section class="modal-content no-shadow">
                <article class="block no-shadow reset-modal" ng-hide="wallet.type=='addressOnly'">
                    <img class="close-btn" src="images/t.svg" width="20px" height="20px" ng-click="makeSwapModal.close()">

                    <div class="limit-width">
                        <h3 class="title title-make-swap">Make Swap</h3>
                        <div class="title-warning" ng-show="!selectedReceiveVerified">
                            <img class="icon" src="./images/unverified.svg" height="16px" width="14px"/>
                            <div class="description">Caution: this swap contains a suspicious asset(s).</div>
                        </div>
                        <div class="action-section">
                            <div class="action-header">
                                <img src="images/you-send-new.svg" width="24px" height="24px">
                                <div class="action-title">You Send</div>
                            </div>
                            <hr class="action-hr">

                            <div class="action-usan">
                                <div class="au-selected" 
                                    ng-click="sendDropDown2 = !sendDropDown2  && closeAllOtherDropDowns('sendDropDown2')"
                                    click-out="!sendDropDown2">
                                        <div class="au-selected-text">
                                            <span class="name">USAN</span>
                                            <span class="address">{{'666333'}}</span>
                                        </div>
                                </div>
                            </div>
                            <div class="action-body">
                                <div class="body-details">
                                    <div class="action-amount-available">
                                        <input type="text" class="form-control m-0 mt-1 action-amount" 
                                            ng-model="makeSendAmount"
                                            id="makeSendAmount"
                                            placeholder="Amount"
                                            ng-change="setReceiveAmountMakeSwap(); setSwapRate();checkMakeSwapConditions();"
                                        >
                                        <div class="available"
                                            ng-show="selectedAssetBalance >= 0">
                                            <a class="small-blue"
                                            ng-click="makeSendAmount = selectedAssetBalance">{{selectedAssetBalance}}
                                                Available</a>
                                        </div>
                                    </div>
                                    <div class="action-amount-currency">
                                        <a class="btn btn-secondary custom-dropdown mt-1 action-selected"
                                            ng-click="sendDropDown2 = !sendDropDown2  && closeAllOtherDropDowns('sendDropDown2')">
                                            <div class="col" click-out="!sendDropDown2">
                                                <img ng-if="selectedSendHasImage"
                                                    ng-src="images/verifiedassets/{{selectedSendImage}}"/>
                                                <span ng-if="!selectedSendHasImage"
                                                    class="btn btn-white btn-circle w32 asset-round mt-0">{{selectedSendAssetSymbol}}</span>
                                                <span class="curr-symbol">{{selectedSendAssetSymbol}}</span>
                                                <img class="verifier" ng-if="selectedSendVerified"
                                                    src="./images/verified.svg" height="14px" width="14px"/>
                                            </div>
                                        </a>
                                        
                                    </div>

                                    <div class="action-time-lock">
                                <span class="small-gray-text" ng-show="showExistingTimeLocks">Existing Time-Lock <br></span>
                                <button class="btn btn-sm btn-primary button-timelock p-2 mt-2 time-lock-btn"
                                        ng-click="showTimeLockSend = !showTimeLockSend"
                                        ng-hide="showTimeLockSend; showExistingTimeLocks"
                                >Set Time-lock
                                </button>
                                <button class="btn btn-sm btn-primary button-timelock p-2 mt-2 time-lock-btn"
                                        ng-hide="showTimeLockSend || showExistingTimeLocks || !myActiveTimeLocks[selectedSendContract].length > 0"
                                        ng-click="showExistingTimeLocks = !showExistingTimeLocks">
                                    Existing Time-Lock
                                </button>
                                <div ng-show="showExistingTimeLocks">
                                    <div class="col-md-11 col-xs-11 p-1 mt-1 asset-dropdown border-gray-dropdown"
                                        ng-click="timeLockDropDown = !timeLockDropDown">
                                        <a>
                                            <span class="fusion-text-14"><strong>{{selectedTimeLockAmount}} </strong></span><span
                                                    class="font-size-12"
                                                    ng-hide="selectedTimeLockAmount == 'Select time-lock'">{{selectedSendAssetSymbol}}</span>
                                            <span class="small-gray-text display-block"><img class="mr-2"
                                                                                            src="images/sendtl.svg"
                                                                                            width="12px"
                                                                                            ng-hide="selectedTimeLockAmount == 'Select time-lock'">
                                                {{selectedTimeLockTimespan}}</span>
                                        </a>
                                    </div>
                                    <div class="dropdown-menu dropdown-menu fusion-text-14 p-2 higher-min-width"
                                        ng-show="timeLockDropDown">
                                        <div class="col-md-12 col-xs-12 p-1 mt-1  asset-dropdown"
                                            ng-repeat="asset in myActiveTimeLocks[selectedSendContract]">
                                            <a ng-click="setExistingTimeLock(asset.asset_id,asset.id)">
                                                <div class="col">
                                                    <span class="fusion-text-14"><strong>{{asset.amount}}</strong></span><span
                                                            class="font-size-12"> {{selectedSendAssetSymbol}}</span>
                                                    <br>
                                                    <span class="small-gray-text">
                                                        <img class="mr-2" src="images/sendtl.svg" width="12px">
                                                        {{asset.startTimeString}} - {{asset.endTimeString}}
                                                    </span>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                    <div class="col-md-1 p-0 pb-2">
                                        <button class="btn btn-sm btn-white"
                                                ng-click="showExistingTimeLocks = !showExistingTimeLocks; closeExistingTimeLock()">
                                            X
                                        </button>
                                    </div>
                                </div>
                                <div ng-show="showTimeLockSend && !showExistingTimeLocks">
                                    <div class="col-md-5 p-0 pb-2">
                                        <button class="btn btn-sm btn-white w-100"
                                                ng-click="sendTimeLock ='daterange'"
                                                ng-class="{'time-active' : sendTimeLock == 'daterange'}"
                                        >
                                            Date to Date
                                        </button>
                                    </div>
                                    <div class="col-md-6 p-0 pb-2">
                                        <button class="btn btn-sm btn-white w-100"
                                                ng-click="sendTimeLock ='scheduled'"
                                                ng-class="{'time-active' : sendTimeLock == 'scheduled'}"
                                        >
                                            Date to Forever
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
                                            type="text"
                                            timepicker-neutral-timezone
                                            min="{{todayDate}}"
                                            is-open="popup.opened3"
                                            datepicker-options="dateOptions"
                                            uib-datepicker-popup="MM/dd/yyyy"
                                            alt-input-formats="altInputFormats"
                                            onkeydown="return false"
                                            ng-model="fromStartTime"
                                            ng-click="popup.opened3 = true"
                                            show-button-bar="false"
                                            placeholder="mm/dd/yyyy"
                                        >
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
                                                type="text"
                                                timepicker-neutral-timezone
                                                min="{{todayDate}}"
                                                is-open="popup.opened4"
                                                datepicker-options="dateOptions"
                                                uib-datepicker-popup="MM/dd/yyyy"
                                                alt-input-formats="altInputFormats"
                                                onkeydown="return false"
                                                ng-model="fromEndTime"
                                                ng-click="popup.opened4 = true"
                                                show-button-bar="false"
                                                placeholder="mm/dd/yyyy"
                                            >
                                        </div>
                                    </div>
                                </div>
                            </div>

                                </div>
                            </div>
                            
                            <div class="dropdown-menu dropdown-menu fusion-text-14 p-2 higher-min-width action-dropdown ad-send ad-send-usan"
                                            ng-show="sendDropDown2"
                                            tw-click-outside="closeSendDropDown2()" ignore-if="!sendDropDown2"
                                        >
                                            <form class="form-inline">
                                                <div class="form-group m-0">
                                                    <span class="small-gray-text">Search</span>
                                                    <input type="text" class="form-control"
                                                        id="searchSendAsset2"
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
                                                        <span ng-if="!asset.hasImage"
                                                            class="btn btn-white btn-circle w32 asset-round mt-0">{{asset.symbol}}</span>
                                                    </div>
                                                    <div class="col">
                                                        <span class="fusion-text-14">
                                                            {{asset.name}} ({{asset.symbol}})
                                                            <span class="color-Active official-fusion-badge" ng-show="asset.verified">                                    <img
                                                                src="./images/verified.svg" height="14px" width="14px"/></span>
                                                        </span>
                                                        <br>
                                                        <span class="small-gray-text max-char inline">{{asset.contractaddress}}</span>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                        </div>

                        <div class="action-section">
                            <div class="action-header">
                                <img src="images/you-receive-new.svg" width="24px" height="24px">
                                <div class="action-title">You Receive</div>
                            </div>
                            <hr class="action-hr">
                            <div class="action-body">
                                <div class="body-details">
                                    <div class="action-amount-available">
                                        <input type="text" class="form-control m-0 mt-1 action-amount" ng-model="makeReceiveAmount"
                                            placeholder="Amount"
                                            ng-change="setSwapRate();checkMakeSwapConditions();"
                                        >
                                    </div>                                    
                                    <div class="action-amount-currency">
                                        <a class="btn btn-secondary custom-dropdown mt-1 action-selected"
                                            ng-click="receiveDropDown2 = !receiveDropDown2 && closeAllOtherDropDowns('receiveDropDown2')">
                                            <div class="col" click-out="!receiveDropDown">
                                                <img ng-if="selectedReceiveHasImage"
                                                    ng-src="images/verifiedassets/{{selectedReceiveImage}}"/>
                                                <span ng-if="!selectedReceiveHasImage"
                                                    class="btn btn-white btn-circle w32 asset-round mt-0">{{selectedReceiveAssetSymbol}}</span>
                                                <span class="curr-symbol">{{selectedReceiveAssetSymbol}}</span>
                                                <img class="verifier" ng-if="selectedReceiveVerified" src="./images/verified.svg" height="14px"
                                                    width="14px"/>
                                                <img class="verifier" ng-if="!selectedReceiveVerified" src="./images/unverified.svg"
                                                    height="16px" width="14px"/>
                                            </div>
                                        </a>
                                        <div class="dropdown-menu dropdown-menu fusion-text-14 p-2 higher-min-width action-dropdown"
                                        ng-show="receiveDropDown2"
                                        tw-click-outside="closeReceiveDropDown2()" ignore-if="!receiveDropDown2">
                                        <form class="form-inline">
                                            <div class="form-group m-0">
                                                <span class="small-gray-text">Search</span>
                                                <input type="text" class="form-control"
                                                    id="searchReceiveAsset2"
                                                    ng-model="searchReceiveAsset"
                                                    placeholder="Search by Symbol, Name, or ID">
                                            </div>
                                        </form>
                                        <div class="col-md-12 col-xs-12 p-1 mt-1 asset-dropdown"
                                            ng-repeat="asset in assetList | filter:searchReceiveAsset">
                                            <a ng-click="setReceiveAsset(asset.id)">
                                                <div class="col-md-2 p-0" ng-if="asset.hasImage">
                                                    <img ng-if="asset.hasImage"
                                                        ng-src="images/verifiedassets/{{asset.image}}"/>
                                                    <span ng-if="!asset.hasImage"
                                                        class="btn btn-white btn-circle w32 asset-round mt-0">{{asset.symbol}}</span>
                                                </div>
                                                <div class="col">
                                        <span class="fusion-text-14">
                                {{asset.name}} ({{asset.symbol}})
                                            <span class="color-Active official-fusion-badge"
                                                ng-show="asset.verified">                                    <img
                                                        src="./images/verified.svg" height="14px" width="14px"/></span>
                                            </i></span>
                                                    <br>
                                                    <span class="small-gray-text max-char inline">{{asset.contractaddress}}</span>
                                                    </span>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                    </div>

                                    <div class="action-time-lock">
                                <button class="btn btn-sm btn-primary button-timelock p-2 mt-2 time-lock-btn"
                                        ng-click="showTimeLockReceive = !showTimeLockReceive"
                                        ng-hide="showTimeLockReceive"
                                >Set Time-lock
                                </button>
                                <div ng-show="showTimeLockReceive">
                                    <div class="col-md-5 p-0 pb-2">
                                        <button class="btn btn-sm btn-white w-100"
                                                ng-click="receiveTimeLock ='daterange'"
                                                ng-class="{'time-active' : receiveTimeLock == 'daterange'}"
                                        >
                                            Date to Date
                                        </button>
                                    </div>
                                    <div class="col-md-6 p-0 pb-2">
                                        <button class="btn btn-sm btn-white w-100"
                                                ng-click="receiveTimeLock ='scheduled'"
                                                ng-class="{'time-active' : receiveTimeLock == 'scheduled'}"
                                        >
                                            Date to Forever
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
                                            type="text"
                                            min="{{todayDate}}"
                                            is-open="popup.opened5"
                                            onkeydown="return false"
                                            ng-model="ToStartTime"
                                            timepicker-neutral-timezone
                                            datepicker-options="dateOptions"
                                            uib-datepicker-popup="MM/dd/yyyy"
                                            alt-input-formats="altInputFormats"
                                            ng-click="popup.opened5 = true"
                                            show-button-bar="false"
                                            placeholder="mm/dd/yyyy"
                                        >
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
                                                type="text"
                                                is-open="popup.opened6"
                                                min="{{todayDate}}"
                                                timepicker-neutral-timezone
                                                onkeydown="return false"
                                                ng-model="ToEndTime"
                                                datepicker-options="dateOptions"
                                                uib-datepicker-popup="MM/dd/yyyy"
                                                alt-input-formats="altInputFormats"
                                                ng-click="popup.opened6 = true"
                                                show-button-bar="false"
                                                placeholder="mm/dd/yyyy"
                                            >
                                        </div>
                                    </div>
                                </div>
                            </div>


                                </div>
                            </div>
                        </div>

                        <div class="number-fills-section">

                            <div class="fills-header">
                                <img src="./images/fills.svg" width="24px" height="24px"> 
                                <div class="fills-header-title">Number of Fills</div>
                            </div>
                            <hr class="fills-hr">
                            <div class="fills-body">
                                <input type="text" class="form-control m-0 mt-1 pb-2 fills-amount" ng-model="makeMinumumSwap"
                                    numbers-only
                                    ng-change="setMinimumMakes();checkMakeSwapConditions();"
                                    placeholder="Amount">
                                <p class="fills-amount-desc">Number of fills determines the minimum amount someone can take in your swap. 1 fill would
                                mean only the full swap can be taken. </p>
                            </div> 
                            <div class="fills-minimum">
                                <div>
                                    <div class="fills-minimum-title">Minimum Send</div>
                                    <div class="fills-minimum-curr">
                                        <img ng-if="" src="./images/send-timelock-icon.svg" height="12px" width="12px"/>
                                        <span class="amt">{{minimumMakeSend}}</span>
                                        <span class="currency">{{selectedSendAssetSymbol}}</span>
                                    </div>
                                </div>
                                <div class="fills-minimum-divider">:</div>
                                <div>
                                    <div class="fills-minimum-title">Minimum Receive</div>
                                    <div class="fills-minimum-curr">
                                        <img class="" ng-if="" src="./images/send-timelock-icon.svg" height="12px" width="12px"/>
                                        <span class="amt">{{minimumReceiveSend}}</span>
                                        <span class="currency">{{selectedReceiveAssetSymbol}}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="private-send-section">
                                <div class="ps-header">
                                    <div class="ps-title">
                                        <img src="./images/private.svg" width="24px" height="24px"> 
                                        <div class="ps-title-text">Send this swap privately</div>
                                    </div>
                                    <div class="toggle">
                                        <label class="switch">
                                            <input type="checkbox" ng-model="privateAccess" ng-value="!privateAccess">
                                            <span class="slider round"></span>
                                        </label>
                                    </div>
                                </div>
                                <div class="address-desc" ng-show="privateAccess == true">Add Short Account Numbers or Public Addresses. Separate addresses by commas.</div>
                                <input ng-show="privateAccess == true"
                                    type="text" class="form-control m-0 mt-1 ps-address"
                                    ng-model="makeTarges"
                                    placeholder="Addresses">
                            </div>
                        </div>

                        <hr class="last-hr">
                        <div class="row actions-row">
                            <div class="btn-grp">
                                <button class="btn btn-white main-btn-secondary" ng-click="makeSwapModal.close()">Cancel</button>
                                <button class="btn btn-primary main-btn-primary"
                                    ng-click="makeSwapConfirmation('notend')"
                                    ng-disabled="makeSwapReviewDisabled">Review Swap
                                </button>
                            </div>
                        </div>
                    </div>
                </article>
            </section>
        </section>
    </article>

    <article class="modal fade modal-new" id="makeSwapConfirm" tabindex="-1">
        <section class="modal-dialog send-asset-dialog reset-modal">
            <section class="modal-content no-shadow">
                <article class="block no-shadow reset-modal" ng-hide="wallet.type=='addressOnly'">
                    <img class="close-btn" src="images/t.svg" width="20px" height="20px" ng-click="makeSwapConfirmModal.close()">
                    <div class="limit-width">
                        <h3 class="h3-blue title">Review Make Swap</h3>
                        <p class="description">Please review the following details carefully before making your swap.</p>
                        <div class="row summary">
                            <div class="col-md-6 summary-col divider-right">
                                <div class="summary-header">
                                    <img class="icon" src="images/you-send-new.svg" class="pr-2">
                                    <span>You Send</span>
                                </div>
                                <div class="summary-content" ng-show="selectedSendContract !== '0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe'">
                                    <div class="summary-cell">
                                        <div class="logo">
                                            <img ng-if="selectedSendHasImage==true"
                                                ng-src="images/verifiedassets/{{selectedSendImage}}" height="32px" width="32px"/>
                                            <span ng-if="!selectedSendHasImage" class="btn btn-white btn-circle w32 asset-round mt-0">{{selectedSendAssetSymbol}}</span>
                                        </div>
                                        <div class="details-wrapper">
                                            <div class="details">
                                                <span class="qty">{{makeSendAmount}}</span>
                                                <div class="curr-sym">
                                                    <span class="currency">{{selectedSendAssetSymbol}}</span>
                                                    <img class="symbol" ng-if="selectedSendVerified" src="./images/verified.svg" height="14px" width="14px"/>
                                                    <img class="symbol" ng-if="!selectedSendVerified" src="./images/unverified.svg" height="16px" width="14px"/>
                                                </div>
                                            </div>
                                            <div class="date-range">
                                                <span class="small-gray-text">
                                                    <img class="mr-2 icon" src="images/send-timelock-icon.svg" width="12px">
                                                    <span class="range">{{'Now'}} - {{'June 29, 2019 (15 days)'}}</span>
                                                </span>
                                                <span class="small-gray-text" ng-show="showTimeLockSend">
                                                    <img class="mr-2" src="images/send-timelock-icon.svg" width="12px">
                                                    <span>{{'Today'}} - {{'Tomorrow'}}</span>
                                                    <span ng-show="sendTimeLock == 'scheduled'">{{fromStartTimeString}}
                                                        - ∞ Forever</span>
                                                    <span ng-show="receiveTimeLock == 'daterange'">{{fromStartTimeString}}
                                                        - {{fromEndTimeString}}</span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="summary-content" ng-show="selectedSendContract == '0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe'">
                                    <div class="summary-cell">
                                        <div class="usan"><div class="name">USAN <span class="address">{{usanAddress}}</span></div></div>
                                    </div>
                                    <div class="summary-cell">
                                        <div class="usan-warning">Once this swap is taken, your USAN will no longer be associated with your address.</div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="summary-header">
                                    <img class="icon" src="images/you-receive-new.svg" class="pr-2">
                                    <span>You Receive</span>
                                </div>
                                <div class="summary-content">
                                    <div class="summary-cell">
                                        <div class="logo">
                                            <img ng-if="selectedReceiveHasImage==true"
                                                ng-src="images/verifiedassets/{{selectedReceiveImage}}" height="32px" width="32px"/>
                                            <span ng-if="!selectedReceiveHasImage" class="btn btn-white btn-circle w32 asset-round mt-0">{{selectedReceiveAssetSymbol}}</span>
                                        </div>
                                        <div class="details-wrapper">
                                            <div class="details">
                                                <span class="qty">{{makeReceiveAmount}}</span>
                                                <div class="curr-sym">
                                                    <span class="currency">{{selectedReceiveAssetSymbol}}</span>
                                                    <img class="symbol" ng-if="selectedReceiveVerified" src="./images/verified.svg" height="14px" width="14px"/>
                                                    <img class="symbol" ng-if="!selectedReceiveVerified" src="./images/unverified.svg" height="16px" width="14px"/>
                                                </div>
                                            </div>
                                            <div class="date-range">
                                                <span class="small-gray-text" ng-show="showTimeLockReceive">
                                                    <img class="mr-2" src="images/send-timelock-icon.svg" width="12px">
                                                    <span ng-show="receiveTimeLock == 'scheduled'">{{toStartTimeString}}
                                                        - ∞ Forever</span>
                                                    <span ng-show="receiveTimeLock == 'daterange'">{{toStartTimeString}}
                                                        - {{toEndTimeString}}</span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="price-section">
                            <div class="price-row">
                                <div class="price">
                                    <img class="icon" src="./images/price.svg" height="24px" width="24px"/>
                                    PRICE
                                </div>
                                <div class="price-filler"></div>
                                <div class="price-value">{{makeSendAmount}}
                                    <span class="currency">{{assetToSendConfirm}}</span> : {{makeReceiveAmount}}
                                    <span class="currency">{{selectedReceiveAssetSymbol}}</span>
                                </div>
                            </div>
                            <div class="price-row">
                                <div class="price">
                                    <img class="icon" src="./images/fills.svg" height="24px" width="24px"/>
                                    NUMBER OF FILLS
                                </div>
                                <div class="price-filler"></div>
                                <div class="price-value">{{makeMinumumSwap}}</div>
                            </div>
                            <div class="price-row" ng-show="privateAccess">
                                <div class="price">
                                    <img class="icon" src="./images/private.svg" height="24px" width="24px"/>
                                    PRIVATELY SENDING TO
                                </div>
                                <div class="price-filler"></div>
                                <div class="address">
                                    {{makeTarges}}
                                </div>
                            </div>
                            <div class="price-row">
                                <div class="price">
                                    <img class="icon" src="./images/fee.svg" height="24px" width="24px"/>
                                    TRANSACTION FEE
                                </div>
                                <div class="price-filler"></div>
                                <div class="price-value">{{'~.00000991'}} <span class="currency">{{'FSN'}}</span></div>
                            </div>
                        </div>

                        <hr class="last-hr">
                        <div class="row actions-row">
                            <div class="btn-grp">
                                <button class="btn btn-white main-btn-secondary" ng-click="makeSwapModal.open()">Back</button>
                                <button class="btn btn-primary main-btn-primary" ng-click="makeSwap()"
                                        ng-disabled="swapRecallSuccess">Make Swap
                                </button>
                            </div>
                        </div>
                    </div>
                </article>
            </section>
        </section>
    </article>

    <article class="modal fade" id="makeSwapEndConfirm" tabindex="-1">
        <section class="modal-dialog send-asset-dialog">
            <section class="modal-content no-shadow">
                <article class="block no-shadow" ng-hide="wallet.type=='addressOnly'">
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
                                    <span ng-show="sendTimeLock == 'daterange'">{{fromStartTimeString}}
                                        - {{fromEndTimeString}}</span>
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
                                    <span ng-show="receiveTimeLock == 'daterange'">{{toStartTimeString}}
                                        - {{toEndTimeString}}</span>
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
            <section class="modal-content no-shadow">
                <article class="block no-shadow" ng-hide="wallet.type=='addressOnly'">
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
            <section class="modal-content no-shadow">
                <article class="block no-shadow" ng-hide="wallet.type=='addressOnly'">
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
                            Maker Sends
                        </div>
                        <div class="col-md-6 p-0">
                            <div class="float-right">
                                    <span class="fusion-text-14">
                                        <span class="fusion-text-18">{{swapInfo.MinToAmount}}</span>
                                        {{swapInfo.ToAssetName}} ({{swapInfo.ToAssetSymbol}}) <span
                                                class="color-Active official-fusion-badge"
                                                ng-show="swapInfo.toVerified">                                    <img
                                                    src="./images/verified.svg" height="14px" width="14px"/></span>
</span>
                                <br>
                                <span class="small-gray-text">{{swapInfo.ToAssetID}}</span>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="row p-2 pt-3 pb-3 gray-border-bottom">
                        <div class="col-md-6 small-gray-text p-0">
                            Maker Sends From
                        </div>
                        <div class="col-md-6 p-0">
                            <div class="float-right">
                                    <span class="fusion-text-14">{{swapInfo.ToStartTime}} <i
                                                class="fa fa-long-arrow-right" aria-hidden="true"></i>
                                        {{swapInfo.ToEndTime}} </span>
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
                            Remaining Fills
                        </div>
                        <div class="col-md-6 p-0">
                            <div class="float-right">
                                <span class="fusion-text-14">{{swapInfo.size}} of {{swapInfo.SwapSize}}</span>
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
                                                ng-show="swapInfo.fromVerified">                                    <img
                                                    src="./images/verified.svg" height="14px" width="14px"/></span>
</span>
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
                                    <span class="fusion-text-14">{{swapInfo.FromStartTime}} <i
                                                class="fa fa-long-arrow-right" aria-hidden="true"></i>
                                        {{swapInfo.FromEndTime}} </span>
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
    <article class="modal fade modal-new" id="takeSwapConfirm" tabindex="-1">
        <section class="modal-dialog send-asset-dialog reset-modal">
            <section class="modal-content no-shadow">
                <article class="block no-shadow reset-modal" ng-hide="wallet.type=='addressOnly'">
                    <img class="close-btn" src="images/t.svg" width="20px" height="20px" ng-click="takeSwapConfirm.close()">
                    <div class="limit-width">
                        <h3 class="h3-blue title">Review Take Swap</h3>
                        <p class="description">Please review the following details carefully before taking the swap.</p>
                        <div class="title-warning" ng-show="!takeDataFront.toVerified">
                            <img class="icon" src="./images/unverified.svg" height="16px" width="14px"/>
                            <div class="description">Caution: this swap contains a suspicious asset(s).</div>
                        </div>
                        <div class="row summary">
                            <div class="col-md-6 summary-col">
                                <div class="summary-header">
                                    <img class="icon" src="images/you-send-new.svg" class="pr-2">
                                    <span>You Send</span>
                                </div>
                                <div class="summary-content">
                                    <div class="summary-cell">
                                        <div class="logo">
                                            <img ng-if="takeDataFront.swapId.toHasImage==true"
                                                ng-src="images/verifiedassets/{{takeDataFront.swapId.toVerifiedImage}}" height="32px" width="32px"/>
                                            <span ng-if="!takeDataFront.swapId.toHasImage" class="btn btn-white btn-circle w32 asset-round mt-0">{{takeDataFront.swapId.toAssetSymbol}}</span>
                                        </div>
                                        <div class="details-wrapper">
                                            <div class="details">
                                                <span class="qty">{{sendTokens}}</span>
                                                <div class="curr-sym">
                                                    <span class="currency">{{takeDataFront.fromAssetSymbol}}</span>
                                                    <img class="symbol" ng-if="takeDataFront.fromVerified" src="./images/verified.svg" height="14px" width="14px"/>
                                                    <img class="symbol" ng-if="!takeDataFront.fromVerified" src="./images/unverified.svg" height="16px" width="14px"/>
                                                </div>
                                            </div>
                                            <div class="date-range">
                                                <span class="small-gray-text" ng-hide="takeDataFront.swapId.ToStartTime == 0 && takeDataFront.swapId.ToEndTime == 18446744073709552000">
                                                    <img class="mr-2 icon" src="images/send-timelock-icon.svg" width="12px">
                                                    <span class="range">{{takeDataFront.swapId.ToStartTimeString}} - {{takeDataFront.swapId.ToEndTimeString}}</span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6 summary-col divider-left">
                                <div class="summary-header">
                                    <img class="icon" src="images/you-receive-new.svg" class="pr-2">
                                    <span>You Receive</span>
                                </div>
                                <div class="summary-content" ng-show="takeDataFront.toAssetId !== '0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe'">
                                    <div class="summary-cell">
                                        <div class="logo">
                                            <img ng-if="selectedReceiveHasImage==true"
                                                 ng-src="images/verifiedassets/{{selectedReceiveImage}}" height="32px" width="32px"/>
                                            <span ng-if="!selectedReceiveHasImage" class="btn btn-white btn-circle w32 asset-round mt-0">{{takeDataFront.toAssetSymbol}}</span>
                                        </div>
                                        <div class="details-wrapper">
                                            <div class="details">
                                                <span class="qty">{{receiveTokens}}</span>
                                                <div class="curr-sym">
                                                    <span class="currency">{{takeDataFront.toAssetSymbol}}</span>
                                                    <img class="symbol" ng-if="takeDataFront.toVerified" src="./images/verified.svg" height="14px" width="14px"/>
                                                    <img class="symbol" ng-if="!takeDataFront.toVerified" src="./images/unverified.svg" height="16px" width="14px"/>
                                                </div>
                                            </div>
                                            <div class="date-range">
                                                <span class="small-gray-text"
                                                    ng-hide="takeDataFront.swapId.FromStartTime == 0 && takeDataFront.swapId.FromEndTime == 18446744073709552000">
                                                    <img class="mr-2" src="images/sendtl.svg" width="12px">
                                                    <span>{{takeDataFront.swapId.FromStartTimeString}} - {{takeDataFront.swapId.FromEndTimeString}}</span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="summary-content" ng-show="takeDataFront.toAssetId == '0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe'">
                                    <div class="summary-cell">
                                        <div class="usan"><div class="name"><span class="address">{{takeDataFront.toAssetSymbol}}</span></div></div>
                                    </div>
                                    <div class="summary-cell">
                                        <div class="usan-warning">Once this swap is taken, your USAN will no longer be associated with your address.</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="price-section">
                            <div class="price-row">
                                <div class="price">
                                    <img class="icon" src="./images/price.svg" height="24px" width="24px"/>
                                    PRICE
                                </div>
                                <div class="price-filler"></div>
                                <div class="price-value">{{takeDataFront.swapRate}}
                                    <span class="currency">{{takeDataFront.fromAssetSymbol}}</span> : {{1}}
                                    <span class="currency">{{takeDataFront.toAssetSymbol}}</span>
                                </div>
                            </div>
                            <div class="price-row">
                                <div class="price">
                                    <img class="icon" src="./images/fee.svg" height="24px" width="24px"/>
                                    TRANSACTION FEE
                                </div>
                                <div class="price-filler"></div>
                                <div class="price-value">{{'~.BLANK'}}
                                    <span class="currency">{{'FSN'}}</span>
                                </div>
                            </div>
                        </div>
                        <hr class="last-hr">
                        <div class="row actions-row">
                            <div class="btn-grp">
                                <button class="btn btn-white main-btn-secondary" ng-click="takeSwapConfirm.close()">Back</button>
                                <button class="btn btn-primary main-btn-primary"
                                    ng-click="takeSwap(takeDataFront.fromAssetId, takeDataFront.swapId , takeAmountSwap)"
                                    ng-disabled="swapRecallSuccess">Take Swap
                                </button>
                            </div>
                        </div>
                    </div>
                </article>
            </section>
        </section>
    </article>
    <article class="modal fade" id="errorModal" tabindex="-1">
        <section class="modal-dialog">
            <section class="modal-content no-shadow">
                <article class="block no-shadow">
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
            <section class="modal-content no-shadow">
                <article class="block no-shadow" ng-hide="wallet.type=='addressOnly'">
                    <div class="col-md-12 p-0">
                        <div class="float-right">
                                  <span class="gray-text" ng-click="takeSwapEndConfirm.close()">                    <i
                                              class="fa fa-times"
                                              aria-hidden="true"></i>
</span>
                        </div>
                    </div>
                    <h3 class="h3-blue text-center">Success</h3>

                    <div class="row p-2 info-bg pt-3 pb-3 info-bg mt-1">
                        <div class="col-md-6 small-gray-text">
                            Sent
                        </div>
                        <div class="col-md-6">
                            <div class="float-right text-right">
                                <span class="fusion-text-18">{{sendTokens}}</span>
                                <span class="fusion-text-14">{{takeDataFront.fromAssetSymbol}}</span>
                                <br>

                                <span class="small-gray-text"
                                      ng-hide="takeDataFront.swapId.ToStartTime == 0 && takeDataFront.swapId.ToEndTime == 18446744073709552000">
                                <img class="mr-2" src="images/sendtl.svg"
                                     width="12px">{{takeDataFront.swapId.ToStartTimeString}}
                                    - {{takeDataFront.swapId.ToEndTimeString}}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="row p-2 info-bg pt-3 pb-3 info-bg mt-1">
                        <div class="col-md-6 small-gray-text">
                            Receiving
                        </div>
                        <div class="col-md-6">
                            <div class="float-right text-right">
                                <span class="fusion-text-18">{{receiveTokens}}</span> <span
                                        class="fusion-text-14">{{takeDataFront.toAssetSymbol}}</span>
                                <br>
                                <span class="small-gray-text"
                                      ng-hide="takeDataFront.swapId.FromStartTime == 0 && takeDataFront.swapId.FromEndTime == 18446744073709552000">
                                <img class="mr-2" src="images/sendtl.svg"
                                     width="12px">{{takeDataFront.swapId.FromStartTimeString}}
                                    - {{takeDataFront.swapId.FromEndTimeString}}
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
