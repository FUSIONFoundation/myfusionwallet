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
        <div class="col-md-12">
            <div class="make-swap-section-new" ng-show="showSwapMarket === true">
                <div class="action-grp">

                    <div class="action-item">
                        <div class="action-title">YOU SEND</div>
                        <div class="mss-action-selected-wrapper">
                            <a class="btn btn-secondary custom-dropdown mt-1 mss-action-selected"
                               tw-click-outside="closesendDropDown()" ignore-if="!sendDropDown"
                               ng-click="sendDropDown = !sendDropDown && closeAllOtherDropDowns('sendDropDown')">
                                <div class="ad-all-assets-selected"
                                     ng-show="selectedSendContract !== DEFAULT_USAN && selectedSendAsset == 'Select asset'"
                                >Select asset
                                </div>
                                <div class="ad-all-assets-selected"
                                     ng-show="selectedSendContract !== DEFAULT_USAN && selectedSendAsset == 'All Assets'"
                                >All Assets
                                </div>
                                <div class="usan-selected"
                                     ng-show="selectedSendContract == DEFAULT_USAN">
                                    <span class="name">USAN</span>
                                    <span class="address">{{usanAddress}}</span>
                                </div>

                                <div class="mss-asset-selected" click-out="!sendDropDown"
                                     ng-show="selectedSendContract !== DEFAULT_USAN && selectedSendAsset !== 'All Assets' && selectedSendAsset !== 'Select asset'">
                                    <img class="icon" ng-if="selectedSendHasImage"
                                         ng-src="images/verifiedassets/{{selectedSendImage}}"/>
                                    <span ng-if="!selectedSendHasImage"
                                          class="btn btn-white btn-circle w32 asset-round mt-0 icon">{{selectedSendAssetSymbol}}</span>
                                    <div class="details-address">
                                        <div class="details">
                                            <div class="name">{{formatName(extractNameOnlyFromAssetNameSymbol(selectedSendAsset, selectedSendAssetSymbol))}}</div>
                                            <div class="symbol">{{formatSymbol(selectedSendAssetSymbol)}}</div>
                                            <img class="verifier" ng-if="selectedSendVerified"
                                                 src="./images/verified.svg" height="14px" width="14px"/>
                                            <img class="verifier" ng-if="!selectedSendVerified"
                                                 src="./images/unverified.svg" height="14px" width="14px"/>
                                        </div>
                                        <div class="address">{{formatAddress(selectedSendContract)}}</div>
                                    </div>

                                </div>

                            </a>
                            <div class="mss-action-dropdown"
                                 ng-show="sendDropDown"
                                 tw-click-outside="closeSendDropDown()" ignore-if="!sendDropDown"
                            >
                                <div class="ad-input-wrapper">
                                    <input type="text" class="form-control ad-input"
                                           id="searchSendAsset"
                                           ng-model="searchSendAsset"
                                           placeholder="Search Assets, Symbols, and IDs">
                                    <img class="ad-input-icon" src="./images/s.svg" height="14px"
                                         width="14px"/>
                                </div>
                                <div class="ad-options-wrapper">
                                    <div class="ad-all-assets" ng-click="setAllAssetsInSend()">All Assets</div>
                                    <div class="ad-usan" ng-show="!!usanAddress  && !usanAlreadyInSwap"
                                         ng-click="setMakeUSAN()">
                                        <div class="ad-usan-content">
                                            <div class="usan-selected">
                                                <span class="name">USAN</span>
                                                <span class="address">{{usanAddress}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="ad-search-grp">
                                        <div class="grp-title"
                                             ng-show="verifiedSendAssetList && verifiedSendAssetList.length > 0">
                                            VERIFIED ASSETS
                                        </div>
                                        <div ng-repeat="asset in assetList | filter:searchSendAsset | filter: {verified:'true', 'contractaddress': '!'+DEFAULT_USAN} | unique:'contractaddress' | orderBy:['pinned', 'name','symbol']
                                            as verifiedSendAssetList track by $index">
                                            <a class="search-item-link" ng-click="setSendAllAssets(asset.id)">
                                                <div class="search-item">
                                                    <img class="icon" ng-if="asset.hasImage"
                                                         ng-src="images/verifiedassets/{{asset.image}}"/>
                                                    <span ng-if="!asset.hasImage"
                                                          class="btn btn-white btn-circle w32 asset-round mt-0 icon-custom">{{asset.symbol}}</span>
                                                    <div class="details-wrapper">
                                                        <div class="details">
                                                            <div class="name">{{asset.name}}</div>
                                                            <div class="currency">{{asset.symbol}}</div>
                                                            <span class="color-Active verifier"
                                                                  ng-show="asset.verified">                                    <img
                                                                        src="./images/verified.svg"
                                                                        height="14px" width="14px"/></span>
                                                            <span class="color-Active verifier"
                                                                  ng-show="!asset.verified">                                    <img
                                                                        src="./images/unverified.svg"
                                                                        height="14px" width="14px"/></span>
                                                        </div>
                                                        <div class="address">{{formatAddress(asset.contractaddress)}}</div>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                    <div class="ad-search-grp">
                                        <div class="grp-title"
                                             ng-show="unverifiedSendAssetList && unverifiedSendAssetList.length > 0">
                                            UNVERIFIED ASSETS
                                        </div>
                                        <div ng-repeat="asset in assetList | filter:searchSendAsset | filter: {verified:'!true', 'contractaddress': '!'+DEFAULT_USAN} | unique:'contractaddress' | orderBy:['name','symbol']
                                            as unverifiedSendAssetList track by $index">
                                            <a class="search-item-link" ng-click="setSendAllAssets(asset.id)">
                                                <div class="search-item">
                                                    <img class="icon" ng-if="asset.hasImage"
                                                         ng-src="images/verifiedassets/{{asset.image}}"/>
                                                    <span ng-if="!asset.hasImage"
                                                          class="btn btn-white btn-circle w32 asset-round mt-0 icon-custom">{{asset.symbol}}</span>
                                                    <div class="details-wrapper">
                                                        <div class="details">
                                                            <div class="name">{{asset.name}}</div>
                                                            <div class="currency">{{asset.symbol}}</div>
                                                            <span class="color-Active verifier"
                                                                  ng-show="asset.verified">                                    <img
                                                                        src="./images/verified.svg"
                                                                        height="14px" width="14px"/></span>
                                                            <span class="color-Active verifier"
                                                                  ng-show="!asset.verified">                                    <img
                                                                        src="./images/unverified.svg"
                                                                        height="14px" width="14px"/></span>
                                                        </div>
                                                        <div class="address">{{formatAddress(asset.contractaddress)}}</div>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div width="24px" height="32px"></div>
                    <div class="action-item action-item-right">
                        <div class="action-title">YOU RECEIVE</div>
                        <div class="mss-action-selected-wrapper">
                            <a class="btn btn-secondary custom-dropdown mt-1 mss-action-selected"
                               tw-click-outside="closereceiveDropDown()" ignore-if="!receiveDropDown"
                               ng-click="receiveDropDown = !receiveDropDown">
                                <div class="ad-all-assets-selected" ng-show="selectedReceiveAsset == 'Select asset'">
                                    Select asset
                                </div>
                                <div class="ad-all-assets-selected" ng-show="selectedReceiveAsset == 'All Assets'">All
                                    Assets
                                </div>
                                <div class="ad-all-assets-selected"
                                     ng-show="selectedReceiveContract == DEFAULT_USAN"
                                >All Short Account Numbers
                                </div>
                                <div class="mss-asset-selected" click-out="!receiveDropDown"
                                     ng-show="selectedReceiveContract !== DEFAULT_USAN && selectedReceiveAsset !== 'All Assets' && selectedReceiveAsset !== 'Select asset'">
                                    <img class="icon" ng-if="selectedReceiveHasImage"
                                         ng-src="images/verifiedassets/{{selectedReceiveImage}}"/>
                                    <span ng-if="!selectedReceiveHasImage"
                                          class="btn btn-white btn-circle w32 asset-round mt-0 icon">{{selectedReceiveAssetSymbol}}</span>
                                    <div class="details-address">
                                        <div class="details">
                                            <div class="name">{{formatName(extractNameOnlyFromAssetNameSymbol(selectedReceiveAsset, selectedReceiveAssetSymbol))}}</div>
                                            <div class="symbol">{{formatSymbol(selectedReceiveAssetSymbol)}}</div>
                                            <img class="verifier" ng-if="selectedReceiveVerified"
                                                 src="./images/verified.svg" height="14px" width="14px"/>
                                            <img class="verifier" ng-if="!selectedReceiveVerified"
                                                 src="./images/unverified.svg" height="14px" width="14px"/>
                                        </div>
                                        <div class="address">{{formatAddress(selectedReceiveContract)}}</div>
                                    </div>

                                </div>

                            </a>
                            <div class="mss-action-dropdown"
                                 ng-show="receiveDropDown"
                                 tw-click-outside="closeReceiveDropDown()" ignore-if="!receiveDropDown"
                            >
                                <div class="ad-input-wrapper">
                                    <input type="text" class="form-control ad-input"
                                           id="searchReceiveAsset"
                                           ng-model="searchReceiveAsset"
                                           placeholder="Search Assets, Symbols, and IDs">
                                    <img class="ad-input-icon" src="./images/s.svg" height="14px"
                                         width="14px"/>
                                </div>
                                <div class="ad-options-wrapper">
                                    <div class="ad-all-assets" ng-click="setAllAssetsInReceive()">All Assets</div>
                                    <div class="ad-all-assets" ng-click="setReceiveUSAN()">All Short Account Numbers
                                    </div>
                                    <div class="ad-search-grp">
                                        <div class="grp-title"
                                             ng-show="verifiedReceiveAssetList && verifiedReceiveAssetList.length > 0">
                                            VERIFIED ASSETS
                                        </div>
                                        <div ng-repeat="asset in assetList | filter:searchReceiveAsset | filter: {verified:'true', 'contractaddress': '!'+DEFAULT_USAN} | unique:'contractaddress' | orderBy:['pinned','name','symbol']
                                            | orderBy:name as verifiedReceiveAssetList track by $index">
                                            <a class="search-item-link" ng-click="setReceiveAsset(asset.id)">
                                                <div class="search-item">
                                                    <img class="icon" ng-if="asset.hasImage"
                                                         ng-src="images/verifiedassets/{{asset.image}}"/>
                                                    <span ng-if="!asset.hasImage"
                                                          class="btn btn-white btn-circle w32 asset-round mt-0 icon-custom">{{asset.symbol}}</span>
                                                    <div class="details-wrapper">
                                                        <div class="details">
                                                            <div class="name">{{asset.name}}</div>
                                                            <div class="currency">{{asset.symbol}}</div>
                                                            <span class="color-Active verifier"
                                                                  ng-show="asset.verified">                                    <img
                                                                        src="./images/verified.svg"
                                                                        height="14px" width="14px"/></span>
                                                            <span class="color-Active verifier"
                                                                  ng-show="!asset.verified">                                    <img
                                                                        src="./images/unverified.svg"
                                                                        height="14px" width="14px"/></span>
                                                        </div>
                                                        <div class="address">{{formatAddress(asset.contractaddress)}}</div>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                    <div class="ad-search-grp">
                                        <div class="grp-title"
                                             ng-show="unverifiedReceiveAssetList && unverifiedReceiveAssetList.length > 0">
                                            UNVERIFIED ASSETS
                                        </div>
                                        <div ng-repeat="asset in assetList | filter:searchReceiveAsset | filter: {verified:'!true', 'contractaddress': '!'+DEFAULT_USAN} | unique:'contractaddress' | orderBy:['name','symbol']
                                            as unverifiedReceiveAssetList track by $index">
                                            <a class="search-item-link" ng-click="setReceiveAsset(asset.id)">
                                                <div class="search-item">
                                                    <img class="icon" ng-if="asset.hasImage"
                                                         ng-src="images/verifiedassets/{{asset.image}}"/>
                                                    <span ng-if="!asset.hasImage"
                                                          class="btn btn-white btn-circle w32 asset-round mt-0 icon-custom">{{asset.symbol}}</span>
                                                    <div class="details-wrapper">
                                                        <div class="details">
                                                            <div class="name">{{asset.name}}</div>
                                                            <div class="currency">{{asset.symbol}}</div>
                                                            <span class="color-Active verifier"
                                                                  ng-show="asset.verified">                                    <img
                                                                        src="./images/verified.svg"
                                                                        height="14px" width="14px"/></span>
                                                            <span class="color-Active verifier"
                                                                  ng-show="!asset.verified">                                    <img
                                                                        src="./images/unverified.svg"
                                                                        height="14px" width="14px"/></span>
                                                        </div>
                                                        <div class="address">{{formatAddress(asset.contractaddress)}}</div>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="asset-balance">
                        <div class="ab-title">ASSET BALANCE</div>
                        <div class="ab-select"
                             ng-show="selectedSendAsset === 'All Assets' || selectedSendAsset === 'Select asset' || !selectedSendAsset">
                            Select asset first
                        </div>
                        <div class="ab-details"
                             ng-show="selectedSendAsset && selectedSendAsset !== 'All Assets' && selectedSendAsset !== 'Select asset' && selectedAssetBalance >= 0 ">
                            <div class="asset"
                                 ng-hide="selectedSendContract == DEFAULT_USAN">{{selectedAssetBalance}}</div>
                            <div class="currency"
                                 ng-hide="selectedSendContract == DEFAULT_USAN">{{selectedAssetSymbol}}</div>
                            <div class="currency"
                                 ng-show="selectedSendContract == DEFAULT_USAN">{{'USAN ' + usanAddress}}</div>
                        </div>
                        <span class="small-gray-text" style="font-size:10px;" ng-hide="!sendHasTimeLockBalance">
                            <img class="time-lock" src="images/sendtl.svg" width="10px"> Has Time-Lock Balance
                        </span>
                    </div>
                </div>
                <button class="btn btn-primary ms-btn" ng-click="makeModal()"
                        ng-class="{'disabled' : web3WalletBalance <= 0.00021}"
                        ng-disabled="web3WalletBalance <= 0.00021">Make Swap
                </button>
            </div>
        </div>
        <div class="col-md-12 pl-0 pr-0">
            <div class="panel panel-default mx-auto" ng-show="showOpenTakes === true">
                <div class="panel-body inline w-100 panel-body-new">
                    <div class="text-center" ng-show="openTakeSwaps == 0 && !showLoader"><span
                                class="small-gray-text">No Take Swaps</span></div>
                    <div class="col-md-12 text-center p-5" ng-show="showLoader">
                        <i class="fa fa-circle-o-notch fa-spin fa-fw"></i>
                        <br>
                        <span class="small-gray-text">Loading Swaps...</span>
                    </div>
                    <table class="table table-new" ng-show="openTakeSwaps != 0 && !showLoader">
                        <thead>
                        <tr class="small-gray-table">
                            <th class="text-left header-left-edge" scope="col">Price</th>
                            <th class="text-right" scope="col">You Send</th>
                            <th class="text-right" scope="col">You Receive</th>
                            <th class="text-right" scope="col">Minimum Fill</th>
                            <th class="text-right header-right-edge" scope="col" class="float-right">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr ng-repeat="asset in openTakeSwaps track by $index">
                            <td class="text-left cell-reset" ng-click="swapInformationModalOpen($index)">
                                <img class="marker" ng-show="asset.owned" src="./images/semi-circle.svg" height="16px"
                                     width="8px"/>
                                <div class="row-layout">
                                    <div class="asset"
                                         ng-hide="asset.toAssetId == DEFAULT_USAN">{{asset.swapratetaker.toFixed(4)}}</div>
                                    <div class="currency"
                                         ng-hide="asset.toAssetId == DEFAULT_USAN">{{asset.toAssetSymbol}}</div>
                                    <div class="colon"
                                         ng-hide="asset.fromAssetId == DEFAULT_USAN || asset.toAssetId == DEFAULT_USAN">
                                        :
                                    </div>
                                    <div class="asset" ng-hide="asset.fromAssetId == DEFAULT_USAN">1</div>
                                    <div class="currency"
                                         ng-hide="asset.fromAssetId == DEFAULT_USAN">{{asset.fromAssetSymbol}}</div>
                                </div>
                            </td>
                            <td class="text-right cell-reset" ng-click="swapInformationModalOpen($index)"
                                ng-class="{'usan-cell-reset' : asset.toAssetId == DEFAULT_USAN}">
                                <div class="row-item" ng-repeat="toAsset in asset.toAssetsArray track by $index">
                                    <div class="column-layout" ng-show="toAsset.toAssetId !== DEFAULT_USAN">
                                        <div class="row-layout">
                                            <div class="asset">{{toAsset.toAmountCut}}</div>
                                            <div class="currency">{{toAsset.toAssetSymbol}}</div>
                                            <img class="color-Active verifier" ng-show="toAsset.toVerified"
                                                 src="./images/verified.svg" height="14px" width="14px"/>
                                            <img class="color-Active verifier" ng-show="!toAsset.toVerified"
                                                 src="./images/unverified.svg" height="14px" width="14px"/>
                                        </div>
                                        <div class="row-layout time-range"
                                             ng-hide="toAsset.ToStartTime == 0 && toAsset.ToEndTime == 18446744073709552000">
                                            <img class="icon" src="images/sendtl.svg" width="12px">
                                            <div class="range">{{toAsset.ToStartTimeString}}
                                                - {{toAsset.ToEndTimeString}}</div>
                                        </div>
                                    </div>
                                    <div class="column-layout" ng-show="asset.toAssetId == DEFAULT_USAN">
                                        <div class="row-layout usan">
                                            <div class="name">USAN <span
                                                        class="address">{{extractAddressFromAssetSymbol(toAsset.toAssetSymbol)}}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row-item"
                                     ng-show="asset.toAssetsArray.length > MAX_ASSETS_TO_DISPLAY && asset.expand !== true"
                                     ng-click="asset.expand = true">
                                    <div class="expand-link">+{{asset.toAssetsArray.length - MAX_ASSETS_TO_DISPLAY}}more
                                        asset{{ (asset.toAssetsArray.length - MAX_ASSETS_TO_DISPLAY > 1 ? "s" : "")}}
                                    </div>
                                </div>
                            </td>
                            <td class="text-right cell-reset" ng-click="swapInformationModalOpen($index)"
                                ng-class="{'usan-cell-reset' : asset.fromAssetId == DEFAULT_USAN}">
                                <div class="row-item" ng-repeat="fromAsset in asset.fromAssetsArray track by $index">
                                    <div class="column-layout" ng-show="fromAsset.fromAssetId !== DEFAULT_USAN">
                                        <div class="row-layout">
                                            <div class="asset">{{fromAsset.fromAmountCut}}</div>
                                            <div class="currency">{{fromAsset.fromAssetSymbol}}</div>
                                            <img class="color-Active verifier" ng-show="fromAsset.fromVerified"
                                                 src="./images/verified.svg" height="14px" width="14px"/>
                                            <img class="color-Active verifier" ng-show="!fromAsset.fromVerified"
                                                 src="./images/unverified.svg" height="14px" width="14px"/>
                                        </div>
                                        <div class="row-layout time-range"
                                             ng-hide="fromAsset.FromStartTime == 0 && fromAsset.FromEndTime == 18446744073709552000">
                                            <img class="icon" src="images/sendtl.svg" width="12px">
                                            <div class="range">{{fromAsset.FromStartTimeString}}
                                                - {{fromAsset.FromEndTimeString}}</div>
                                        </div>
                                    </div>
                                    <div class="column-layout" ng-show="fromAsset.fromAssetId == DEFAULT_USAN">
                                        <div class="row-layout usan">
                                            <div class="name">USAN <span
                                                        class="address">{{extractAddressFromAssetSymbol(fromAsset.fromAssetSymbol)}}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row-item"
                                     ng-show="asset.fromAssetsArray.length > MAX_ASSETS_TO_DISPLAY && asset.expand !== true"
                                     ng-click="asset.expand = true">
                                    <div class="expand-link">+{{asset.fromAssetsArray.length - MAX_ASSETS_TO_DISPLAY}}
                                        more
                                        asset{(asset.fromAssetsArray.length - MAX_ASSETS_TO_DISPLAY > 1 ? "s" : "")}}
                                    </div>
                                </div>
                            </td>
                            <td class="text-right cell-reset" ng-click="swapInformationModalOpen($index)">
                                <div class="column-layout">
                                    <div class="row-layout">
                                        <div class="asset">{{asset.minswaptaker.toFixed(4)}}</div>
                                        <div class="currency">{{asset.toAssetSymbol}}</div>
                                    </div>
                                </div>
                            <td class="text-right btn-cell-reset">
                                <div class="column-layout">
                                    <div ng-hide="asset.owned == false">
                                        <button class="btn btn-sm btn-white m-0 swap-btn"
                                                ng-click="recallModal(asset.swap_id)">
                                            Recall
                                            Swap
                                        </button>
                                    </div>
                                    <div ng-hide="asset.owned == true">
                                        <button class="btn btn-sm btn-white m-0 swap-btn"
                                                ng-click="takeModalPrivateSwaps(asset.id)"
                                                ng-disabled="hasEnoughBalance(asset.toAssetId,asset.minswaptaker) && !hasTimeLockBalance(asset.toAssetId)"
                                        >Take Swap
                                        </button>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="panel panel-default mx-auto" ng-show="showSwapMarket === false && showOpenTakes === false">
                <div class="panel-body inline w-100 panel-body-new">
                    <div class="text-center" ng-show="openMakeSwaps == 0 && !showLoader"><span
                                class="small-gray-text">No Open Swaps</span></div>
                    <div class="col-md-12 text-center p-5" ng-show="showLoader">
                        <i class="fa fa-circle-o-notch fa-spin fa-fw"></i>
                        <br>
                        <span class="small-gray-text">Loading Swaps...</span>
                    </div>
                    <table class="table table-new" ng-show="openMakeSwaps != 0 && !showLoader">
                        <thead>
                        <tr class="small-gray-table">
                            <th class="text-left header-left-edge" scope="col">Price</th>
                            <th class="text-right" scope="col">You Send</th>
                            <th class="text-right" scope="col">You Receive</th>
                            <th class="text-right" scope="col">Minimum Fill</th>
                            <th class="text-right header-right-edge" scope="col" class="float-right">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr ng-repeat="asset in openMakes | orderBy:'-timePosix'| filter: { owned: true } track by $index">
                            <td class="text-left cell-reset" ng-click="swapInformationModalOpen(asset.id,true)">
                                <div class="row-layout">
                                    <div class="asset"
                                         ng-hide="asset.fromAssetId == DEFAULT_USAN">{{asset.swaprate.toFixed(4)}}</div>
                                    <div class="currency"
                                         ng-hide="asset.fromAssetId == DEFAULT_USAN">{{asset.fromAssetSymbol}}</div>
                                    <div class="colon"
                                         ng-hide="asset.fromAssetId == DEFAULT_USAN || asset.toAssetId == DEFAULT_USAN">
                                        :
                                    </div>
                                    <div class="asset">1</div>
                                    <div class="currency">{{asset.toAssetSymbol}}</div>
                                </div>
                            </td>
                            <td class="text-right cell-reset" ng-click="swapInformationModalOpen(asset.id,true)"
                                ng-class="{'usan-cell-reset' : asset.fromAssetId == DEFAULT_USAN}">
                                <div class="row-item" ng-repeat="fromAsset in asset.fromAssetsArray track by $index">
                                    <div class="column-layout" ng-show="fromAsset.fromAssetId !== DEFAULT_USAN">
                                        <div class="row-layout">
                                            <div class="asset">{{fromAsset.fromAmountCut}}</div>
                                            <div class="currency">{{fromAsset.fromAssetSymbol}}</div>
                                            <img class="color-Active verifier" ng-show="fromAsset.fromVerified"
                                                 src="./images/verified.svg" height="14px" width="14px"/>
                                            <img class="color-Active verifier" ng-show="!fromAsset.fromVerified"
                                                 src="./images/unverified.svg" height="14px" width="14px"/>
                                        </div>
                                        <div class="row-layout time-range"
                                             ng-hide="fromAsset.FromStartTime == 0 && fromAsset.FromEndTime == 18446744073709552000">
                                            <img class="icon" src="images/sendtl.svg" width="12px">
                                            <div class="range">{{fromAsset.FromStartTimeString}}
                                                - {{fromAsset.FromEndTimeString}}</div>
                                        </div>
                                    </div>
                                    <div class="column-layout" ng-show="fromAsset.fromAssetId == DEFAULT_USAN">
                                        <div class="row-layout usan">
                                            <div class="name">USAN <span
                                                        class="address">{{extractAddressFromAssetSymbol(fromAsset.fromAssetSymbol)}}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row-item"
                                     ng-show="asset.fromAssetsArray.length > MAX_ASSETS_TO_DISPLAY && asset.expand !== true"
                                     ng-click="asset.expand = true">
                                    <div class="expand-link">+{{asset.fromAssetsArray.length - MAX_ASSETS_TO_DISPLAY}}
                                        more
                                        asset{{ (asset.fromAssetsArray.length - MAX_ASSETS_TO_DISPLAY > 1) ? "s" : ""}}
                                    </div>
                                </div>
                            </td>
                            <td class="text-right cell-reset" ng-click="swapInformationModalOpen(asset.id,true)">
                                <div class="row-item" ng-repeat="toAsset in asset.toAssetsArray track by $index">
                                    <div class="column-layout">
                                        <div class="row-layout">
                                            <div class="asset">{{toAsset.toAmountCut}}</div>
                                            <div class="currency">{{toAsset.toAssetSymbol}}</div>
                                            <img class="color-Active verifier" ng-show="toAsset.toVerified"
                                                 src="./images/verified.svg" height="14px" width="14px"/>
                                            <img class="color-Active verifier" ng-show="!toAsset.toVerified"
                                                 src="./images/unverified.svg" height="14px" width="14px"/>
                                        </div>
                                        <div class="row-layout time-range"
                                             ng-hide="toAsset.ToStartTime == 0 && toAsset.ToEndTime == 18446744073709552000">
                                            <img class="icon" src="images/sendtl.svg" width="12px">
                                            <div class="range">{{toAsset.ToStartTimeString}}
                                                - {{toAsset.ToEndTimeString}}</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row-item"
                                     ng-show="asset.toAssetsArray.length > MAX_ASSETS_TO_DISPLAY && asset.expand !== true"
                                     ng-click="asset.expand = true">
                                    <div class="expand-link">+{{asset.toAssetsArray.length - MAX_ASSETS_TO_DISPLAY}}more
                                        asset{{ (asset.toAssetsArray.length - MAX_ASSETS_TO_DISPLAY > 1 ? "s" : "")}}
                                    </div>
                                </div>
                            </td>
                            <td class="text-right cell-reset" ng-click="swapInformationModalOpen(asset.id,true)">
                                <div class="column-layout">
                                    <div class="row-layout">
                                        <div class="asset">{{asset.minswapopenmake.toFixed(4)}}</div>
                                        <div class="currency">{{asset.fromAssetSymbol}}</div>
                                    </div>
                                </div>
                            </td>
                            <td class="text-right btn-cell-reset">
                                <div class="column-layout">
                                    <div ng-hide="asset.owned == false">
                                        <button class="btn btn-sm btn-white m-0 swap-btn"
                                                ng-click="recallModal(asset.swap_id)">
                                            Recall
                                            Swap
                                        </button>
                                    </div>
                                    <div ng-hide="asset.owned == true">
                                        <button class="btn btn-sm btn-white m-0 swap-btn"
                                                ng-click="takeModal(asset.id)"
                                                ng-disabled="hasEnoughBalance(asset.toAssetId,asset.minswaptaker,asset.ToStartTime,asset.ToEndTime) && !hasTimeLockBalance(asset.toAssetId)"
                                        >Take Swap
                                        </button>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="panel panel-default mx-auto" ng-show="showSwapMarket === true && showOpenTakes === false">
                <div class="panel-body inline w-100 panel-body-new">
                    <div class="col-md-12 p-0 page-controls">
                        <div class="search-input-wrapper">
                            <input type="text" class="form-control ad-input"
                                   ng-model="searchSwapMarket"
                                   autocomplete="false"
                                   placeholder="Search">
                            <img class="ad-input-icon" src="./images/s.svg" height="14px"
                                 width="14px"/>
                        </div>
                        <div class="page-form" ng-hide="endPage === 0">
                            <div class="all-rows">Rows {{shownRows}} of {{totalRowsSwapsQuery}}</div>
                            <div class="partition">
                                <input type="text" class="form-control ad-input custom-input"
                                       ng-model="currentPageInput" autocomplete="false">
                                <div> of {{endPage+1}}</div>
                                <!-- <div> {{currentPage+1}} of {{endPage}}</div> -->
                            </div>
                            <div class="actions">
                                <button class="btn btn-sm btn-white p-0 m-0 wh-36 page-btn left-btn"
                                        ng-click="previousPage()">
                                    <span class="small-gray-text pl-1 pr-1 m-1">
                                        <i class="fa fa-angle-left fa-lg" aria-hidden="true"></i>
                                    </span>
                                </button>
                                <button class="btn btn-sm btn-white p-0 m-0 wh-36 page-btn right-btn"
                                        ng-click="nextPage()">
                                    <span class="small-gray-text pl-1 pr-1 m-1">
                                        <i class="fa fa-angle-right fa-lg" aria-hidden="true"></i>
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-12 text-center p-5" ng-show="allSwapsRunning && !cachedAllSwapsPageRunning">
                        <i class="fa fa-circle-o-notch fa-spin fa-fw"></i>
                        <span class="small-gray-text">Loading...</span>
                    </div>
                    <div class="col-md-12 text-center p-5" ng-show="swapsList.length === 0 && !allSwapsRunning">
                        <span>No swaps for this trading pair</span>
                    </div>
                    <table class="table table-new" ng-show="swapsList.length > 0">
                        <thead>
                        <tr class="small-gray-table">
                            <th class="text-left header-left-edge" scope="col">PRICE</th>
                            <th class="text-right" scope="col">YOU SEND</th>
                            <th class="text-right" scope="col">YOU RECEIVE</th>
                            <th class="text-right" scope="col">Minimum Fill</th>
                            <th class="text-right header-right-edge" scope="col" class="float-right">
                                Actions
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr ng-repeat="asset in swapsList | filter:searchSwapMarket | orderBy:'convertTimePosixToNumber'">
                            <td class="text-left cell-reset" ng-click="swapInformationModalOpen($index)">
                                <img class="marker" ng-show="asset.owned" src="./images/semi-circle.svg" height="16px"
                                     width="8px"/>
                                <div class="row-layout">
                                    <div class="asset"
                                         ng-hide="asset.toAssetId == DEFAULT_USAN">{{asset.swapratetaker.toFixed(4)}}</div>
                                    <div class="currency"
                                         ng-hide="asset.toAssetId == DEFAULT_USAN">{{asset.toAssetSymbol.substr(0,4)}}</div>
                                    <div class="colon"
                                         ng-hide="asset.fromAssetId == DEFAULT_USAN || asset.toAssetId == DEFAULT_USAN">
                                        :
                                    </div>
                                    <div class="asset" ng-hide="asset.fromAssetId == DEFAULT_USAN">1</div>
                                    <div class="currency"
                                         ng-hide="asset.fromAssetId == DEFAULT_USAN">{{asset.fromAssetSymbol.substr(0,4)}}</div>
                                </div>
                            </td>
                            <td class="text-right cell-reset" ng-click="swapInformationModalOpen($index)"
                                ng-class="{'usan-cell-reset' : asset.toAssetId == DEFAULT_USAN}">
                                <div ng-if="asset.owned">
                                    <div class="row-item"
                                         ng-repeat="fromAsset in asset.fromAssetsArray track by $index">
                                        <div class="column-layout"
                                             ng-show="fromAsset.fromAssetId !== DEFAULT_USAN && (fromAsset.expand ===true || $index < MAX_ASSETS_TO_DISPLAY)">
                                            <div class="row-layout">
                                                <div class="asset">{{fromAsset.fromAmountCut}}</div>
                                                <div class="currency">{{fromAsset.fromAssetSymbol}}</div>
                                                <img class="color-Active verifier" ng-show="fromAsset.fromVerified"
                                                     src="./images/verified.svg" height="14px" width="14px"/>
                                                <img class="color-Active verifier" ng-show="!fromAsset.fromVerified"
                                                     src="./images/unverified.svg" height="14px" width="14px"/>
                                            </div>
                                            <div class="row-layout time-range"
                                                 ng-hide="fromAsset.FromStartTime == 0 && fromAsset.FromEndTime == 18446744073709552000">
                                                <img class="icon" src="images/sendtl.svg" width="12px">
                                                <div class="range">{{fromAsset.FromStartTimeString}}
                                                    - {{fromAsset.FromEndTimeString}}</div>
                                            </div>
                                        </div>
                                        <div class="column-layout" ng-show="fromAsset.fromAssetId == DEFAULT_USAN">
                                            <div class="row-layout usan">
                                                <div class="name">USAN <span
                                                            class="address">{{extractAddressFromAssetSymbol(fromAsset.fromAssetSymbol)}}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row-item"
                                         ng-show="asset.fromAssetsArray.length > MAX_ASSETS_TO_DISPLAY && asset.expand !== true"
                                         ng-click="asset.expand = true">
                                        <div class="expand-link">
                                            +{{asset.fromAssetsArray.length - MAX_ASSETS_TO_DISPLAY}} more
                                            asset{{ (asset.fromAssetsArray.length - MAX_ASSETS_TO_DISPLAY > 1 ? "s" : "")}
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div ng-if="!asset.owned">
                                    <div class="row-item" ng-repeat="toAsset in asset.toAssetsArray track by $index">
                                        <div class="column-layout" ng-show="toAsset.toAssetId !== DEFAULT_USAN">
                                            <div class="row-layout">
                                                <div class="asset">{{toAsset.toAmountCut}}</div>
                                                <div class="currency">{{toAsset.toAssetSymbol}}</div>
                                                <img class="color-Active verifier" ng-show="toAsset.toVerified"
                                                     src="./images/verified.svg" height="14px" width="14px"/>
                                                <img class="color-Active verifier" ng-show="!toAsset.toVerified"
                                                     src="./images/unverified.svg" height="14px" width="14px"/>
                                            </div>
                                            <div class="row-layout time-range"
                                                 ng-hide="toAsset.ToStartTime == 0 && toAsset.ToEndTime == 18446744073709552000">
                                                <img class="icon" src="images/sendtl.svg" width="12px">
                                                <div class="range">{{toAsset.ToStartTimeString}}
                                                    - {{toAsset.ToEndTimeString}}</div>
                                            </div>
                                        </div>
                                        <div class="column-layout" ng-show="toAsset.toAssetId == DEFAULT_USAN">
                                            <div class="row-layout usan">
                                                <div class="name">USAN <span
                                                            class="address">{{extractAddressFromAssetSymbol(toAsset.toAssetSymbol)}}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row-item"
                                         ng-show="asset.toAssetsArray.length > MAX_ASSETS_TO_DISPLAY && asset.expand !== true"
                                         ng-click="asset.expand = true">
                                        <div class="expand-link">+{{asset.toAssetsArray.length - MAX_ASSETS_TO_DISPLAY}}
                                            more
                                            asset{{ (asset.toAssetsArray.length - MAX_ASSETS_TO_DISPLAY > 1 ? "s" : "")}
                                            }
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td class="text-right cell-reset" ng-click="swapInformationModalOpen($index)"
                                ng-class="{'usan-cell-reset' : asset.fromAssetId == DEFAULT_USAN}">
                                <div ng-if="asset.owned">
                                    <div class="row-item" ng-repeat="toAsset in asset.toAssetsArray track by $index">
                                        <div class="column-layout" ng-show="toAsset.toAssetId !== DEFAULT_USAN">
                                            <div class="row-layout">
                                                <div class="asset">{{toAsset.toAmountCut}}</div>
                                                <div class="currency">{{toAsset.toAssetSymbol}}</div>
                                                <img class="color-Active verifier" ng-show="toAsset.toVerified"
                                                     src="./images/verified.svg" height="14px" width="14px"/>
                                                <img class="color-Active verifier" ng-show="!toAsset.toVerified"
                                                     src="./images/unverified.svg" height="14px" width="14px"/>
                                            </div>
                                            <div class="row-layout time-range"
                                                 ng-hide="toAsset.ToStartTime == 0 && toAsset.ToEndTime == 18446744073709552000">
                                                <img class="icon" src="images/sendtl.svg" width="12px">
                                                <div class="range">{{toAsset.ToStartTimeString}}
                                                    - {{toAsset.ToEndTimeString}}</div>
                                            </div>
                                        </div>
                                        <div class="column-layout" ng-show="toAsset.toAssetId == DEFAULT_USAN">
                                            <div class="row-layout usan">
                                                <div class="name">USAN <span
                                                            class="address">{{extractAddressFromAssetSymbol(toAsset.toAssetSymbol)}}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row-item"
                                         ng-show="asset.toAssetsArray.length > MAX_ASSETS_TO_DISPLAY && asset.expand !== true"
                                         ng-click="asset.expand = true">
                                        <div class="expand-link">+{{asset.toAssetsArray.length - MAX_ASSETS_TO_DISPLAY}}
                                            more
                                            asset{{ (asset.toAssetsArray.length - MAX_ASSETS_TO_DISPLAY > 1 ? "s" : "")}
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div ng-if="!asset.owned">
                                    <div class="row-item"
                                         ng-repeat="fromAsset in asset.fromAssetsArray track by $index">
                                        <div class="column-layout" ng-show="fromAsset.fromAssetId !== DEFAULT_USAN">
                                            <div class="row-layout">
                                                <div class="asset">{{fromAsset.fromAmountCut}}</div>
                                                <div class="currency">{{fromAsset.fromAssetSymbol}}</div>
                                                <img class="color-Active verifier" ng-show="fromAsset.fromVerified"
                                                     src="./images/verified.svg" height="14px" width="14px"/>
                                                <img class="color-Active verifier" ng-show="!fromAsset.fromVerified"
                                                     src="./images/unverified.svg" height="14px" width="14px"/>
                                            </div>
                                            <div class="row-layout time-range"
                                                 ng-hide="fromAsset.FromStartTime == 0 && fromAsset.FromEndTime == 18446744073709552000">
                                                <img class="icon" src="images/sendtl.svg" width="12px">
                                                <div class="range">{{fromAsset.FromStartTimeString}}
                                                    - {{fromAsset.FromEndTimeString}}</div>
                                            </div>
                                        </div>
                                        <div class="column-layout" ng-show="fromAsset.fromAssetId == DEFAULT_USAN">
                                            <div class="row-layout usan">
                                                <div class="name">USAN <span
                                                            class="address">{{extractAddressFromAssetSymbol(fromAsset.fromAssetSymbol)}}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row-item"
                                         ng-show="asset.fromAssetsArray.length > MAX_ASSETS_TO_DISPLAY && asset.expand !== true"
                                         ng-click="asset.expand = true">
                                        <div class="expand-link">
                                            +{{asset.fromAssetsArray.length - MAX_ASSETS_TO_DISPLAY}} more
                                            asset{{ (asset.fromAssetsArray.length - MAX_ASSETS_TO_DISPLAY > 1 ? "s" : "")}
                                            }
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td class="text-right cell-reset" ng-click="swapInformationModalOpen($index)">
                                <div class="column-layout">
                                    <div class="row-layout">
                                        <div class="asset">{{asset.minswaptaker.toFixed(4)}}</div>
                                        <div class="currency">{{asset.toAssetSymbol}}</div>
                                    </div>
                                </div>
                </div>
                </td>
                <td class="text-right btn-cell-reset">
                    <div class="column-layout">
                        <div ng-hide="asset.owned == false">
                            <button class="btn btn-sm btn-white m-0 swap-btn" ng-click="recallModal(asset.swap_id)">
                                Recall
                                Swap
                            </button>
                        </div>
                        <div ng-hide="asset.owned == true">
                            <button class="btn btn-sm btn-white m-0 swap-btn"
                                    ng-click="takeModal(asset.id)"
                                    ng-disabled="takeAvailable(asset.id)"
                            >Take Swap
                            </button>
                        </div>
                    </div>
                </td>
                </tr>
                </tbody>
                </table>
            </div>
        </div>
    </div>
    </div>
    <article class="modal fade modal-new" id="recallAsset" tabindex="-1">
        <section class="modal-dialog send-asset-dialog reset-modal">
            <section class="modal-content no-shadow">
                <article class="block no-shadow reset-modal" ng-hide="wallet.type=='addressOnly'">
                    <img class="close-btn" src="images/t.svg" width="20px" height="20px"
                         ng-click="recallAssetModal.close()">
                    <div class="limit-width">
                        <h3 class="h3-blue title">Review Recall Swap</h3>
                        <p class="description">Are you sure you want to remove this swap? If recalled, this swap will be
                            pulled from the
                            swap
                            market with the next block.</p>
                        <div class="price-section">
                            <div class="price-row">
                                <div class="price">
                                    <img class="icon" src="./images/price.svg" height="24px" width="24px"/>
                                    SWAP ID
                                </div>
                                <div class="price-filler"></div>
                                <div class="price-value">
                                    {{formatAddress(recallAssetId)}}
                                </div>
                            </div>
                            <div class="price-row">
                                <div class="price">
                                    <img class="icon" src="./images/fee.svg" height="24px" width="24px"/>
                                    TRANSACTION FEE
                                </div>
                                <div class="price-filler"></div>
                                <div class="price-value">{{'~.0.000025'}}
                                    <span class="currency">{{'FSN'}}</span>
                                </div>
                            </div>
                        </div>
                        <hr class="last-hr">
                        <div class="row actions-row">
                            <div class="btn-grp">
                                <button class="btn btn-primary main-btn-primary"
                                        ng-click="recallSwap(recallAssetId)">Recall Swap
                                </button>
                            </div>
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
                    <img class="close-btn" src="images/t.svg" width="20px" height="20px"
                         ng-click="takeSwapModal.close()">

                    <div class="limit-width">
                        <h3 class="h3-blue title">Take Swap</h3>
                        <div class="title-warning" ng-show="!takeDataFront.toVerified">
                            <img class="icon" src="./images/unverified.svg" height="16px" width="14px"/>
                            <div class="description">Caution: this swap contains a suspicious asset(s).</div>
                        </div>
                        <div class="fills-section"
                             ng-show="takeDataFront.toAssetId !== DEFAULT_USAN">
                            <div class="fills-available">
                                <img class="icon" src="./images/fills.svg" height="24px" width="24px"/>
                                <div class="description">{{takeDataFront.size}} Fills Available</div>
                            </div>
                            <div class="filler"></div>
                            <div class="amount-details">
                                <input type="number" class="form-control m-0 mt-1 amount"
                                       ng-model="takeAmountSwap"
                                       min="1"
                                       max="{{takeDataFront.size}}"
                                       ng-change="setReceive()" placeholder="Fills">
                                <div class="max-fills" ng-click="takeAmountSwap = takeDataFront.size; setReceive(parseInt(takeDataFront.size))">Max
                                    Fills {{takeDataFront.size}}</div>
                            </div>
                        </div>

                        <div class="summary take-swap-summary">
                            <div class="summary-col">
                                <div class="summary-header">
                                    <img class="icon" src="images/you-send-new.svg" class="pr-2">
                                    <span>You Send</span>
                                </div>
                                <div class="summary-content">

                                    <!-- TAKE SWAP SEND MULTI ASSETS MARKER -->
                                    <div class="summary-cell"
                                         ng-repeat="multiSendAsset in multiTakeSwapSendAssetArray track by $index">
                                        <div class="logo">
                                            <img ng-if="multiSendAsset.toHasImage==true"
                                                 ng-src="images/verifiedassets/{{multiSendAsset.toVerifiedImage}}"
                                                 height="32px" width="32px"/>
                                            <span ng-if="!multiSendAsset.toHasImage"
                                                  class="btn btn-white btn-circle w32 asset-round mt-0">{{multiSendAsset.toAssetSymbol}}</span>
                                        </div>
                                        <div class="details-wrapper">
                                            <div class="details">
                                                <span class="qty">{{multiSendAsset.sendTokens}}</span>
                                                <div class="curr-sym">
                                                    <span class="currency">{{multiSendAsset.fromAssetSymbol}}</span>
                                                    <img class="symbol" ng-if="multiSendAsset.toVerified"
                                                         src="./images/verified.svg" height="14px" width="14px"/>
                                                    <img class="symbol" ng-if="!multiSendAsset.toVerified"
                                                         src="./images/unverified.svg" height="16px" width="14px"/>
                                                </div>
                                            </div>
                                            <div class="date-range">
                                                <span class="small-gray-text"
                                                      ng-hide="multiSendAsset.ToStartTime == 0
                                                      && multiSendAsset.ToEndTime == 18446744073709552000">
                                                    <img class="mr-2 icon" src="images/send-timelock-icon.svg"
                                                         width="12px">
                                                    <span class="range">{{multiSendAsset.ToStartTimeString}}
                                                        - {{multiSendAsset.ToEndTimeString}}</span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="summary-col divider-left">
                                <div class="summary-header">
                                    <img class="icon" src="images/you-receive-new.svg" class="pr-2">
                                    <span>You Receive</span>
                                </div>
                                <div class="summary-content">

                                    <!-- TAKE SWAP RECEIVE MULTI ASSETS MARKER -->
                                    <div ng-repeat="multiReceiveAsset in multiTakeSwapReceiveAssetArray track by $index">
                                        <div class="summary-cell"
                                             ng-show="multiReceiveAsset.toAssetId !== DEFAULT_USAN">
                                            <div class="logo">
                                                <img ng-if="multiReceiveAsset.fromHasImage==true"
                                                     ng-src="images/verifiedassets/{{multiReceiveAsset.fromVerifiedImage}}"
                                                     height="32px" width="32px"/>
                                                <span ng-if="!multiReceiveAsset.fromHasImage"
                                                      class="btn btn-white btn-circle w32 asset-round mt-0">{{multiReceiveAsset.fromAssetSymbol}}</span>
                                            </div>
                                            <div class="details-wrapper">
                                                <div class="details">
                                                    <span class="qty">{{multiReceiveAsset.receiveTokens}}</span>
                                                    <div class="curr-sym">
                                                        <span class="currency">{{multiReceiveAsset.toAssetSymbol}}</span>
                                                        <img class="color-Active verifier"
                                                             ng-show="multiReceiveAsset.fromVerified"
                                                             src="./images/verified.svg" height="14px" width="14px"/>
                                                        <img class="color-Active verifier"
                                                             ng-show="!multiReceiveAsset.fromVerified"
                                                             src="./images/unverified.svg" height="14px" width="14px"/>
                                                    </div>
                                                </div>
                                                <div class="date-range">
                                                    <span class="small-gray-text"
                                                          ng-hide="multiReceiveAsset.FromStartTime == 0
                                                        && multiReceiveAsset.FromEndTime == 18446744073709552000">
                                                        <img class="mr-2" src="images/sendtl.svg" width="12px">
                                                        <span>{{multiReceiveAsset.FromStartTimeString}}
                                                            - {{multiReceiveAsset.FromEndTimeString}}</span>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="summary-cell summary-cell-custom"
                                             ng-show="multiReceiveAsset.toAssetId == DEFAULT_USAN">
                                            <div class="usan">
                                                <div class="name">USAN <span
                                                            class="address">{{extractAddressFromAssetSymbol(multiReceiveAsset.toAssetSymbol)}}</span>
                                                </div>
                                            </div>
                                            <div class="usan-warning">Once this swap is taken, your USAN will no longer
                                                be
                                                associated with your address.
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

                                <!-- TAKE SWAP MULTI ASSETS PRICE MARKER -->
                                <div class="price-value">
                                    <div ng-repeat="multiSendAsset in multiTakeSwapSendAssetArray track by $index">
                                        <span class="amt">{{multiSendAsset.swaprate}}</span>
                                        <span class="currency">
                                            {{multiSendAsset.fromAssetSymbol + (($index != multiTakeSwapSendAssetArray.length-1) ? ', ' : '')}}</span>
                                    </div>
                                    <span class="price-divider">:</span>
                                    <div ng-repeat="multiReceiveAsset in multiTakeSwapReceiveAssetArray track by $index">
                                        <span class="amt"> {{1}} </span>
                                        <span class="currency">
                                            {{multiReceiveAsset.toAssetSymbol + (($index != multiTakeSwapReceiveAssetArray.length-1) ? ', ' : '')}}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="price-row">
                                <div class="price">
                                    <img class="icon" src="./images/fee.svg" height="24px" width="24px"/>
                                    TRANSACTION FEE
                                </div>
                                <div class="price-filler"></div>
                                <div class="price-value">{{'~.0.000025'}}
                                    <span class="currency">{{'FSN'}}</span>
                                </div>
                            </div>
                        </div>
                        <hr class="last-hr">
                        <div class="row actions-row">
                            <div class="btn-grp">
                                <button class="btn btn-white main-btn-secondary" ng-click="takeSwapModal.close()">
                                    Cancel
                                </button>
                                <button class="btn btn-primary main-btn-primary"
                                        ng-click="takeSwapConfirm.open()"
                                        ng-disabled="takeDataFront.fromAssetBalance <= 0 && !hasTimeLockBalance(takeDataFront.fromAssetId)">
                                    Review Swap
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
                                            <div>
                                                <div>
                                                    {{takeDataFront.toAssetName}} ({{takeDataFront.toAssetSymbol}})
                                                    <span class="color-Active official-fusion-badge">
                                                        <img src="./images/unverified.svg" height="14px" width="14px"/>
                                                    </span>
                                                </div>
                                                <div class="small-gray-text max-char inline">{{takeDataFront.toAssetId}}</div>
                                            </div>
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
                    <img class="close-btn" src="images/t.svg" width="20px" height="20px"
                         ng-click="closeMakeSwapModal()">

                    <div class="limit-width">
                        <h3 class="title title-make-swap">Make Swap</h3>
                        <div class="title-warning"
                             ng-show="selectedReceiveAsset && !selectedReceiveVerified && selectedReceiveAsset !== 'All Assets' && selectedReceiveAsset !== 'Select asset'">
                            <img class="icon" src="./images/unverified.svg" height="16px" width="14px"/>
                            <div class="description">Caution: this swap contains a suspicious asset(s).</div>
                        </div>
                        <div class="action-section">
                            <div class="action-header">
                                <img src="images/you-send-new.svg" width="24px" height="24px">
                                <div class="action-title">You Send</div>
                            </div>
                            <hr class="action-hr">
                            <div class="action-body">

                                <!-- MAKE SWAP SEND MULTI ASSETS MARKER -->

                                <div class="body-details"
                                     ng-repeat="multiSendAsset in multiMakeSwapSendAssetArray track by $index">
                                    <div class="action-amount-available"
                                         ng-show="multiSendAsset.selectedSendContract !== DEFAULT_USAN">
                                        <input type="text" class="form-control m-0 mt-1 action-amount"
                                               ng-model="multiSendAsset.makeSendAmount"
                                               id={{"makeSendAmount_"+multiSendAsset.id}}
                                               placeholder="Amount"
                                               ng-change="setReceiveAmountMakeSwap(multiSendAsset); setSwapRate(multiSendAsset);checkMakeSwapConditions(multiSendAsset);"
                                        >
                                        <div class="available" ng-show="multiSendAsset.selectedAssetBalance >= 0">
                                            <a class="small-blue"
                                               ng-click="multiSendAsset.makeSendAmount = multiSendAsset.selectedAssetBalance">
                                                {{multiSendAsset.selectedAssetBalance}} Available</a>
                                        </div>
                                        <div class="usan-error-message inline pt-3" ng-show="usanAlreadySwapped">You
                                            have already created a swap with this USAN.
                                        </div>
                                    </div>
                                    <div class="action-amount-currency">
                                        <div class="btn btn-secondary custom-dropdown mt-1 action-selected"
                                             ng-click="multiSendAsset.sendDropDown2 = !multiSendAsset.sendDropDown2  && closeAllOtherDropDowns('sendDropDown2', multiSendAsset)">
                                            <div>
                                                <div ng-show="multiSendAsset.selectedSendContract !== DEFAULT_USAN &&
                                                    (!multiSendAsset.selectedSendAsset || multiSendAsset.selectedSendAsset === 'All Assets'
                                                    || multiSendAsset.selectedSendAsset === 'Select asset')">Select
                                                    Asset
                                                </div>
                                                <div class="usan-selected"
                                                     ng-show="multiSendAsset.selectedSendContract == DEFAULT_USAN">
                                                    <span class="name">USAN</span>
                                                    <span class="address">{{usanAddress}}</span>
                                                </div>
                                                <div class="col" click-out="!multiSendAsset.sendDropDown2"
                                                     ng-show="multiSendAsset.selectedSendContract !== DEFAULT_USAN &&
                                                    (multiSendAsset.selectedSendAsset && multiSendAsset.selectedSendAsset !== 'All Assets'
                                                    && multiSendAsset.selectedSendAsset !== 'Select asset')">
                                                    <img ng-if="multiSendAsset.selectedSendHasImage"
                                                         ng-src="images/verifiedassets/{{multiSendAsset.selectedSendImage}}"/>
                                                    <span ng-if="!multiSendAsset.selectedSendHasImage"
                                                          class="btn btn-white btn-circle w32 asset-round mt-0">{{multiSendAsset.selectedSendAssetSymbol}}</span>
                                                    <div class="curr-symbol">{{multiSendAsset.selectedSendAssetSymbol}}</div>
                                                    <img class="verifier" ng-if="multiSendAsset.selectedSendVerified"
                                                         src="./images/verified.svg" height="14px" width="14px"/>
                                                    <img class="verifier" ng-if="!multiSendAsset.selectedSendVerified"
                                                         src="./images/unverified.svg" height="14px" width="14px"/>
                                                </div>
                                            </div>

                                            <!-- NEW SEND TIME-LOCK BUTTON MARKER -->
                                            <div class="as-time-lock" ng-show="multiSendAsset.sendTimeLockSet"
                                                 id={{"sendBlueSection_"+multiSendAsset.id}}>
                                                <div class="as-tl-value" ng-click="toggleSendTimelock(multiSendAsset)">
                                                    <img class="time-icon" src="images/sendtl.svg" width="12px">
                                                    <div class="time-range" ng-hide="multiSendAsset.hasTimeLockSet">
                                                        {{multiSendAsset.fromStartTimeString + " - "}}
                                                        <span ng-show="multiSendAsset.sendTimeLock == 'daterange' && multiSendAsset.fromEndTime">{{multiSendAsset.fromEndTimeString}}</span>
                                                        <span ng-show="multiSendAsset.sendTimeLock == 'scheduled'">∞ Forever</span>
                                                    </div>
                                                    <div class="time-range" ng-show="multiSendAsset.hasTimeLockSet">
                                                        {{multiSendAsset.selectedTimeLockTimespan}}
                                                    </div>
                                                </div>
                                                <div class="as-tl-action" ng-click="removeSendTimeLock(multiSendAsset)">
                                                    <img class="close-icon" src="images/t.svg" width="12px">
                                                </div>
                                            </div>

                                        </div>
                                        <div class="action-dropdown" ng-show="multiSendAsset.sendDropDown2"
                                             tw-click-outside="closeSendDropDown2(multiSendAsset)"
                                             ignore-if="!multiSendAsset.sendDropDown2">
                                            <div class="ad-input-wrapper">
                                                <input type="text" class="form-control ad-input"
                                                       id="{{'searchSendAsset2_'+multiSendAsset.id}}"
                                                       ng-model="multiSendAsset.searchSendAsset"
                                                       placeholder="Search Assets, Symbols, and IDs">
                                                <img class="ad-input-icon" src="./images/s.svg" height="14px"
                                                     width="14px"/>
                                            </div>
                                            <div class="ad-options-wrapper">
                                                <div class="ad-usan" ng-show="!!usanAddress"
                                                     ng-click="setMakeUSAN(multiSendAsset,DEFAULT_USAN)">
                                                    <div class="ad-usan-title">SHORT ACCOUNT NUMBER</div>
                                                    <div class="ad-usan-content">
                                                        <div class="usan-selected">
                                                            <span class="name">USAN</span>
                                                            <span class="address">{{usanAddress}}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="ad-search-grp">
                                                    <div class="grp-title"
                                                         ng-show="verifiedSendAssetListOwned && verifiedSendAssetListOwned.length > 0">
                                                        VERIFIED ASSETS
                                                    </div>
                                                    <div ng-repeat="asset in assetListOwned | filter:multiSendAsset.searchSendAsset | filter: {verified:'true', 'contractaddress': '!'+DEFAULT_USAN} | unique:'contractaddress' | orderBy:['pinned', 'name','symbol']
                                                        as verifiedSendAssetListOwned track by $index">
                                                        <a class="search-item-link"
                                                           ng-click="setSendAsset(asset.id, multiSendAsset);removeSendTimeLock(multiSendAsset);">
                                                            <div class="search-item">
                                                                <img class="icon" ng-if="asset.hasImage"
                                                                     ng-src="images/verifiedassets/{{asset.image}}"/>
                                                                <span ng-if="!asset.hasImage"
                                                                      class="btn btn-white btn-circle w32 asset-round mt-0 icon-custom">{{asset.symbol}}</span>
                                                                <div class="details-wrapper">
                                                                    <div class="details">
                                                                        <div class="name">{{asset.name}}</div>
                                                                        <div class="currency">({{asset.symbol}})</div>
                                                                        <span class="color-Active verifier"
                                                                              ng-show="asset.verified">
                                                                            <img src="./images/verified.svg"
                                                                                 height="14px" width="14px"/>
                                                                        </span>
                                                                        <span class="color-Active verifier"
                                                                              ng-show="!asset.verified">
                                                                            <img src="./images/unverified.svg"
                                                                                 height="14px" width="14px"/>
                                                                        </span>
                                                                    </div>
                                                                    <div class="address">{{formatAddress(asset.contractaddress)}}</div>
                                                                </div>
                                                            </div>
                                                        </a>
                                                    </div>
                                                </div>
                                                <div class="ad-search-grp">
                                                    <div class="grp-title"
                                                         ng-show="unverifiedSendAssetListOwned && unverifiedSendAssetListOwned.length > 0">
                                                        UNVERIFIED ASSETS
                                                    </div>
                                                    <div ng-repeat="asset in assetListOwned | filter:multiSendAsset.searchSendAsset | filter: {verified:'!true', 'contractaddress': '!'+DEFAULT_USAN} | unique:'contractaddress' | orderBy:['name','symbol']
                                                        as unverifiedSendAssetListOwned track by $index">
                                                        <a class="search-item-link"
                                                           ng-click="setSendAsset(asset.id, multiSendAsset);removeSendTimeLock(multiSendAsset);">
                                                            <div class="search-item">
                                                                <img class="icon" ng-if="asset.hasImage"
                                                                     ng-src="images/verifiedassets/{{asset.image}}"/>
                                                                <span ng-if="!asset.hasImage"
                                                                      class="btn btn-white btn-circle w32 asset-round mt-0 icon-custom">{{asset.symbol}}</span>
                                                                <div class="details-wrapper">
                                                                    <div class="details">
                                                                        <div class="name">{{asset.name}}</div>
                                                                        <div class="currency">({{asset.symbol}})</div>
                                                                        <span class="color-Active verifier"
                                                                              ng-show="asset.verified">                                    <img
                                                                                    src="./images/verified.svg"
                                                                                    height="14px" width="14px"/></span>
                                                                        <span class="color-Active verifier"
                                                                              ng-show="!asset.verified">                                    <img
                                                                                    src="./images/unverified.svg"
                                                                                    height="14px" width="14px"/></span>
                                                                    </div>
                                                                    <div class="address">{{formatAddress(asset.contractaddress)}}</div>
                                                                </div>
                                                            </div>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- SEND NEW TIME-LOCK MARKER -->

                                    <div class="action-time-lock"
                                         ng-show="multiSendAsset.selectedSendContract !== DEFAULT_USAN && multiSendAsset.selectedSendAsset !== 'All Assets'
                                        && multiSendAsset.selectedSendAsset !== 'Select asset'"
                                         tw-click-outside="closeSendTimeLockDropDown(multiSendAsset)"
                                         ignore-if="!multiSendAsset.showTimeLockSend">

                                        <div class="time-lock-btn" ng-click="toggleSendTimelock(multiSendAsset)"
                                             ng-hide="multiSendAsset.sendTimeLockSet">
                                            <div class="name">Time-lock</div>
                                            <img class="icon" src="images/caret-down-2.svg">
                                        </div>

                                        <div class="time-lock-dropdown"
                                             ng-show="multiSendAsset.showTimeLockSend && multiSendAsset.showMenuTimelockSendDropdown"
                                             style="{{ (multiSendAsset.sendExistingTimeLockSet || (multiSendAsset.sendTimeLockSet && multiSendAsset.sendExistingTimeLocksAvailable)) ?
                                             ('left: -'+ getSendTimeLockLeftAdjust(multiSendAsset) +'px !important') : ''}}">
                                            <div class="time-lock-menu"
                                                 ng-click="multiSendAsset.showMenuTimelockSendDropdown=false;multiSendAsset.showNewTimelockDropdown=true;multiSendAsset.sendTimeLock='daterange';">
                                                New Time-lock
                                            </div>
                                            <div class="time-lock-menu"
                                                 ng-click="multiSendAsset.showMenuTimelockSendDropdown=false;multiSendAsset.showExistingTimeLocksSendDropdown=true">
                                                Existing Time-lock
                                            </div>
                                        </div>

                                        <div class="time-lock-dropdown"
                                             ng-show="multiSendAsset.showTimeLockSend && (multiSendAsset.showSimpleTimelockSendDropdown || multiSendAsset.showNewTimelockDropdown)"
                                             style="{{ multiSendAsset.sendTimeLockSet ? ('left: -'+ getSendTimeLockLeftAdjust(multiSendAsset) +'px !important') : ''}}">
                                            <div class="time-lock-header"
                                                 ng-show="!multiSendAsset.showSimpleTimelockSendDropdown || multiSendAsset.sendExistingTimeLocksAvailable">
                                                <img class="back-btn" src="images/arrow-left.svg" width="24px"
                                                     height="24px"
                                                     ng-click="multiSendAsset.showNewTimelockDropdown=false;multiSendAsset.showSimpleTimelockSendDropdown=false;multiSendAsset.showMenuTimelockSendDropdown=true;">
                                                <div class="header-title">New Time-lock</div>
                                            </div>
                                            <div class="tab-selector">
                                                <div class="tab-option tab-option-left"
                                                     ng-click="handleSendTimeLockDateToDate(multiSendAsset)"
                                                     ng-class="{'tab-option-selected' : multiSendAsset.sendTimeLock == 'daterange'}">
                                                    Date to Date
                                                </div>
                                                <div class="tab-option tab-option-right"
                                                     ng-click="multiSendAsset.sendTimeLock ='scheduled'"
                                                     ng-class="{'tab-option-selected' : multiSendAsset.sendTimeLock == 'scheduled'}">
                                                    Date to Forever
                                                </div>
                                            </div>
                                            <div class="date-range">
                                                <div class="date-item" ng-show="multiSendAsset.showTimeLockSend">
                                                    <div class="marker">FROM</div>
                                                    <input class="form-control date-input"
                                                           type="text"
                                                           timepicker-neutral-timezone
                                                           min="{{todayDate}}"
                                                           is-open="popup.opened3"
                                                           datepicker-options="dateOptions"
                                                           uib-datepicker-popup="MM/dd/yyyy"
                                                           alt-input-formats="altInputFormats"
                                                           onkeydown="return false"
                                                           ng-change="checkSendDate('fromStartTime', multiSendAsset)"
                                                           ng-model="multiSendAsset.fromStartTime"
                                                           ng-click="popup.opened3 = true"
                                                           show-button-bar="false"
                                                           placeholder="mm/dd/yyyy"
                                                    >
                                                </div>
                                                <div class="date-item" ng-show="multiSendAsset.showTimeLockSend">
                                                    <div class="marker">UNTIL</div>
                                                    <input class="form-control date-input"
                                                           type="text"
                                                           timepicker-neutral-timezone
                                                           min="{{todayDate}}"
                                                           is-open="popup.opened4"
                                                           datepicker-options="dateOptions"
                                                           uib-datepicker-popup="MM/dd/yyyy"
                                                           alt-input-formats="altInputFormats"
                                                           onkeydown="return false"
                                                           ng-change="checkSendDate('fromEndTime', multiSendAsset)"
                                                           ng-model="multiSendAsset.fromEndTime"
                                                           ng-click="popup.opened4 = true"
                                                           show-button-bar="false"
                                                           placeholder="mm/dd/yyyy"
                                                           ng-hide="multiSendAsset.sendTimeLock == 'scheduled'"
                                                    >
                                                    <div class="b-form small-gray-text text-fusion fusion-text-14 p-1"
                                                         ng-show="multiSendAsset.sendTimeLock == 'scheduled'">∞ Forever
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="btn-grp">
                                                <button class="btn btn-white main-btn-secondary date-btn"
                                                        ng-click="cancelSetSendTimeLock(multiSendAsset)">
                                                    Cancel
                                                </button>
                                                <button class="btn btn-primary main-btn-primary date-btn"
                                                        ng-click="setSendTimeLock(multiSendAsset)"
                                                        ng-disabled="!multiSendAsset.fromStartTime || (multiSendAsset.sendTimeLock == 'daterange' && !multiSendAsset.fromEndTime)">
                                                    Set Time-lock
                                                </button>
                                            </div>
                                        </div>
                                        <div class="time-lock-dropdown"
                                             ng-show="multiSendAsset.showTimeLockSend && multiSendAsset.showExistingTimeLocksSendDropdown"
                                             style="{{ (multiSendAsset.sendExistingTimeLockSet || (multiSendAsset.sendTimeLockSet && multiSendAsset.sendExistingTimeLocksAvailable)) ?
                                             ('left: -'+ getSendTimeLockLeftAdjust(multiSendAsset) +'px !important') : ''}}">
                                            <div class="time-lock-header">
                                                <img class="back-btn" src="images/arrow-left.svg" width="24px"
                                                     height="24px"
                                                     ng-click="multiSendAsset.showExistingTimeLocksSendDropdown=false;multiSendAsset.showMenuTimelockSendDropdown=true;">
                                                <div class="header-title">
                                                    Existing {{multiSendAsset.selectedSendAssetSymbol}} Time-lock
                                                </div>
                                            </div>
                                            <div class="existing-time-locks">
                                                <div class="existing-tl-item"
                                                     ng-repeat="asset in myActiveTimeLocks[multiSendAsset.selectedSendContract]"
                                                     ng-click="setExistingTimeLock(asset.asset_id,asset.id,multiSendAsset); ">
                                                    <img class="icon" ng-if="asset.hasImage"
                                                         ng-src="images/verifiedassets/{{asset.image}}"/>
                                                    <span ng-if="!asset.hasImage"
                                                          class="btn btn-white btn-circle w32 asset-round mt-0 icon-custom">{{asset.symbol}}</span>
                                                    <div class="tl-item-details">
                                                        <div class="asset">
                                                            <div class="amt">{{asset.amount}}</div>
                                                            <div class="currency">{{multiSendAsset.selectedSendAssetSymbol}}</div>
                                                        </div>
                                                        <div class="time-range">
                                                            <img class="icon" src="images/sendtl.svg" width="12px"
                                                                 height="12px">
                                                            <div class="range">{{asset.startTimeString}}
                                                                - {{asset.endTimeString}}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="action-remove-asset"
                                         ng-hide="multiMakeSwapSendAssetArray.length <= 1"
                                         ng-click="removeMakeSwapSendAssetRow(multiSendAsset)">
                                        <img src="images/t.svg" width="16px" height="16px">
                                    </div>

                                </div>

                                <span class="usan-error-message inline pt-3" ng-show="usanAlreadySwapped">You have already created a swap with this USAN. </span>

                                <!-- MAKE SWAP ADD SEND ASSET MARKER -->

                                <div class="add-asset-btn"
                                     ng-click="addMakeSwapSendAssetRow()"
                                     ng-hide="multiMakeSwapSendAssetArray.length >= MAX_SEND_ASSETS || makeUSAN">
                                    <img class="icon" src="images/add-circle-icon.svg" width="14px" height="14px">
                                    <div class="btn-name">Add Asset</div>
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

                                <!-- MAKE SWAP RECEIVE MULTI ASSETS MARKER -->

                                <div class="body-details"
                                     ng-repeat="multiReceiveAsset in multiMakeSwapReceiveAssetArray track by $index">
                                    <div class="action-amount-available">
                                        <input type="text" class="form-control m-0 mt-1 action-amount"
                                               ng-model="multiReceiveAsset.makeReceiveAmount"
                                               id={{"makeReceiveAmount_"+multiReceiveAsset.id}}
                                               placeholder="Amount"
                                               ng-change="setSwapRate(multiReceiveAsset);checkMakeSwapConditions(multiReceiveAsset);"
                                        >
                                    </div>

                                    <div class="action-amount-currency">
                                        <div class="btn btn-secondary custom-dropdown mt-1 action-selected"
                                             ng-click="multiReceiveAsset.receiveDropDown2 = !multiReceiveAsset.receiveDropDown2 && closeAllOtherDropDowns('receiveDropDown2', multiReceiveAsset)">
                                            <div>
                                                <div ng-show="!multiReceiveAsset.selectedReceiveAsset || multiReceiveAsset.selectedReceiveAsset === 'All Assets' || multiReceiveAsset.selectedReceiveAsset === 'Select asset'">
                                                    Select Asset
                                                </div>
                                                <div class="col" click-out="!multiReceiveAsset.receiveDropDown"
                                                     ng-show="multiReceiveAsset.selectedReceiveAsset && multiReceiveAsset.selectedReceiveAsset !== 'All Assets' && multiReceiveAsset.selectedReceiveAsset !== 'Select asset'">
                                                    <img ng-if="multiReceiveAsset.selectedReceiveHasImage"
                                                         ng-src="images/verifiedassets/{{multiReceiveAsset.selectedReceiveImage}}"/>
                                                    <span ng-if="!multiReceiveAsset.selectedReceiveHasImage"
                                                          class="btn btn-white btn-circle w32 asset-round mt-0">{{multiReceiveAsset.selectedReceiveAssetSymbol}}</span>
                                                    <div class="curr-symbol">{{multiReceiveAsset.selectedReceiveAssetSymbol}}</div>
                                                    <img class="verifier"
                                                         ng-if="multiReceiveAsset.selectedReceiveVerified"
                                                         src="./images/verified.svg" height="14px" width="14px"/>
                                                    <img class="verifier"
                                                         ng-if="!multiReceiveAsset.selectedReceiveVerified"
                                                         src="./images/unverified.svg" height="16px" width="14px"/>
                                                </div>
                                            </div>

                                            <!-- NEW RECEIVE TIME-LOCK BUTTON MARKER -->
                                            <div class="as-time-lock" ng-show="multiReceiveAsset.receiveTimeLockSet"
                                                 id={{"receiveBlueSection_"+multiReceiveAsset.id}}>
                                                <div class="as-tl-value"
                                                     ng-click="toggleReceiveTimelock(multiReceiveAsset)">
                                                    <img class="time-icon" src="images/sendtl.svg" width="12px">
                                                    <div class="time-range">
                                                        {{multiReceiveAsset.toStartTimeString + " - "}}
                                                        <span ng-show="multiReceiveAsset.receiveTimeLock == 'daterange' && multiReceiveAsset.toEndTime">{{multiReceiveAsset.toEndTimeString}}</span>
                                                        <span ng-show="multiReceiveAsset.receiveTimeLock == 'scheduled'">∞ Forever</span>
                                                    </div>
                                                </div>
                                                <div class="as-tl-action"
                                                     ng-click="removeReceiveTimeLock(multiReceiveAsset)">
                                                    <img class="close-icon" src="images/t.svg" width="12px">
                                                </div>
                                            </div>
                                        </div>

                                        <div class="action-dropdown"
                                             ng-show="multiReceiveAsset.receiveDropDown2"
                                             tw-click-outside="closeReceiveDropDown2(multiReceiveAsset)"
                                             ignore-if="!multiReceiveAsset.receiveDropDown2"
                                        >
                                            <div class="ad-input-wrapper">
                                                <input type="text" class="form-control ad-input"
                                                       id="{{'searchReceiveAsset2_'+multiReceiveAsset.id}}"
                                                       ng-model="multiReceiveAsset.searchReceiveAsset"
                                                       placeholder="Search Assets, Symbols, and IDs">
                                                <img class="ad-input-icon" src="./images/s.svg" height="14px"
                                                     width="14px"/>
                                            </div>
                                            <div class="ad-options-wrapper">
                                                <div class="ad-search-grp">
                                                    <div class="grp-title"
                                                         ng-show="verifiedReceiveAssetListOwned && verifiedReceiveAssetListOwned.length > 0">
                                                        VERIFIED ASSETS
                                                    </div>
                                                    <div ng-repeat="asset in assetList | filter:multiReceiveAsset.searchReceiveAsset | filter: {verified:'true', 'contractaddress': '!'+DEFAULT_USAN} | unique:'contractaddress' | orderBy:['pinned','name','symbol']
                                                        as verifiedReceiveAssetListOwned">
                                                        <a class="search-item-link"
                                                           ng-click="setReceiveAsset(asset.id, multiReceiveAsset);removeReceiveTimeLock(multiReceiveAsset);">
                                                            <div class="search-item">
                                                                <img class="icon" ng-if="asset.hasImage"
                                                                     ng-src="images/verifiedassets/{{asset.image}}"/>
                                                                <span ng-if="!asset.hasImage"
                                                                      class="btn btn-white btn-circle w32 asset-round mt-0 icon-custom">{{asset.symbol}}</span>
                                                                <div class="details-wrapper">
                                                                    <div class="details">
                                                                        <div class="name">{{asset.name}}</div>
                                                                        <div class="currency">({{asset.symbol}})</div>
                                                                        <span class="color-Active verifier"
                                                                              ng-show="asset.verified">
                                                                            <img src="./images/verified.svg"
                                                                                 height="14px" width="14px"/></span>
                                                                        <span class="color-Active verifier"
                                                                              ng-show="!asset.verified">
                                                                            <img src="./images/unverified.svg"
                                                                                 height="14px" width="14px"/></span>
                                                                    </div>
                                                                    <div class="address">{{formatAddress(asset.contractaddress)}}</div>
                                                                </div>
                                                            </div>
                                                        </a>
                                                    </div>
                                                </div>
                                                <div class="ad-search-grp">
                                                    <div class="grp-title"
                                                         ng-show="unverifiedReceiveAssetListOwned && unverifiedReceiveAssetListOwned.length > 0">
                                                        UNVERIFIED ASSETS
                                                    </div>
                                                    <div ng-repeat="asset in assetList | filter:multiReceiveAsset.searchReceiveAsset | filter: {verified:'!true', 'contractaddress': '!'+DEFAULT_USAN} | unique:'contractaddress' | orderBy:['name','symbol']
                                                        as unverifiedReceiveAssetListOwned">
                                                        <a class="search-item-link"
                                                           ng-click="setReceiveAsset(asset.id, multiReceiveAsset);removeReceiveTimeLock(multiReceiveAsset);">
                                                            <div class="search-item">
                                                                <img class="icon" ng-if="asset.hasImage"
                                                                     ng-src="images/verifiedassets/{{asset.image}}"/>
                                                                <span ng-if="!asset.hasImage"
                                                                      class="btn btn-white btn-circle w32 asset-round mt-0 icon-custom">{{asset.symbol}}</span>
                                                                <div class="details-wrapper">
                                                                    <div class="details">
                                                                        <div class="name">{{asset.name}}</div>
                                                                        <div class="currency">({{asset.symbol}})</div>
                                                                        <span class="color-Active verifier"
                                                                              ng-show="asset.verified">                                    <img
                                                                                    src="./images/verified.svg"
                                                                                    height="14px" width="14px"/></span>
                                                                        <span class="color-Active verifier"
                                                                              ng-show="!asset.verified">                                    <img
                                                                                    src="./images/unverified.svg"
                                                                                    height="14px" width="14px"/></span>
                                                                    </div>
                                                                    <div class="address">{{formatAddress(asset.contractaddress)}}</div>
                                                                </div>
                                                            </div>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- RECEIVE NEW TIME-LOCK MARKER -->

                                    <div class="action-time-lock"
                                         ng-show="multiReceiveAsset.selectedReceiveContract !== DEFAULT_USAN && multiReceiveAsset.selectedReceiveAsset !== 'All Assets'
                                        && multiReceiveAsset.selectedReceiveAsset !== 'Select asset'"
                                         tw-click-outside="closeReceiveTimeLockDropDown(multiReceiveAsset)"
                                         ignore-if="!multiReceiveAsset.showTimeLockReceive">

                                        <div class="time-lock-btn" ng-click="toggleReceiveTimelock(multiReceiveAsset)"
                                             ng-hide="multiReceiveAsset.receiveTimeLockSet">
                                            <div class="name">Time-lock</div>
                                            <img class="icon" src="images/caret-down-2.svg">
                                        </div>

                                        <div class="time-lock-dropdown"
                                             ng-show="multiReceiveAsset.showTimeLockReceive && (multiReceiveAsset.showSimpleTimelockReceiveDropdown || multiReceiveAsset.showNewTimelockDropdown)"
                                             style="{{ multiReceiveAsset.receiveTimeLockSet ? ('left: -'+ getReceiveTimeLockLeftAdjust(multiReceiveAsset) +'px !important') : ''}}">
                                            <div class="tab-selector">
                                                <div class="tab-option tab-option-left"
                                                     ng-click="handleReceiveTimeLockDateToDate(multiReceiveAsset)"
                                                     ng-class="{'tab-option-selected' : multiReceiveAsset.receiveTimeLock == 'daterange'}">
                                                    Date to Date
                                                </div>
                                                <div class="tab-option tab-option-right"
                                                     ng-click="multiReceiveAsset.receiveTimeLock ='scheduled'"
                                                     ng-class="{'tab-option-selected' : multiReceiveAsset.receiveTimeLock == 'scheduled'}">
                                                    Date to Forever
                                                </div>
                                            </div>
                                            <div class="date-range">
                                                <div class="date-item" ng-show="multiReceiveAsset.showTimeLockReceive">
                                                    <div class="marker">FROM</div>
                                                    <input class="form-control date-input"
                                                           type="text"
                                                           timepicker-neutral-timezone
                                                           min="{{todayDate}}"
                                                           is-open="popup.opened5"
                                                           datepicker-options="dateOptions"
                                                           uib-datepicker-popup="MM/dd/yyyy"
                                                           alt-input-formats="altInputFormats"
                                                           onkeydown="return false"
                                                           ng-change="checkReceiveDate('toStartTime', multiReceiveAsset)"
                                                           ng-model="multiReceiveAsset.toStartTime"
                                                           ng-click="popup.opened5 = true"
                                                           show-button-bar="false"
                                                           placeholder="mm/dd/yyyy"
                                                    >
                                                </div>
                                                <div class="date-item" ng-show="multiReceiveAsset.showTimeLockReceive">
                                                    <div class="marker">UNTIL</div>
                                                    <input class="form-control date-input"
                                                           type="text"
                                                           timepicker-neutral-timezone
                                                           min="{{todayDate}}"
                                                           is-open="popup.opened6"
                                                           datepicker-options="dateOptions"
                                                           uib-datepicker-popup="MM/dd/yyyy"
                                                           alt-input-formats="altInputFormats"
                                                           onkeydown="return false"
                                                           ng-change="checkReceiveDate('toEndTime', multiReceiveAsset)"
                                                           ng-model="multiReceiveAsset.toEndTime"
                                                           ng-click="popup.opened6 = true"
                                                           show-button-bar="false"
                                                           placeholder="mm/dd/yyyy"
                                                           ng-hide="multiReceiveAsset.receiveTimeLock == 'scheduled'"
                                                    >
                                                    <div class="b-form small-gray-text text-fusion fusion-text-14 p-1"
                                                         ng-show="multiReceiveAsset.receiveTimeLock == 'scheduled'">∞
                                                        Forever
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="btn-grp">
                                                <button class="btn btn-white main-btn-secondary date-btn"
                                                        ng-click="cancelSetReceiveTimeLock(multiReceiveAsset)">
                                                    Cancel
                                                </button>
                                                <button class="btn btn-primary main-btn-primary date-btn"
                                                        ng-click="setReceiveTimeLock(multiReceiveAsset)"
                                                        ng-disabled="!multiReceiveAsset.toStartTime || (multiReceiveAsset.receiveTimeLock == 'daterange' && !multiReceiveAsset.toEndTime)">
                                                    Set Time-lock
                                                </button>
                                            </div>
                                        </div>
                                    </div>


                                    <div class="action-remove-asset"
                                         ng-hide="multiMakeSwapReceiveAssetArray.length <= 1"
                                         ng-click="removeMakeSwapReceiveAssetRow(multiReceiveAsset)">
                                        <img src="images/t.svg" width="16px" height="16px">
                                    </div>
                                </div>

                                <!-- MAKE SWAP ADD RECEIVE ASSET MARKER -->

                                <div class="add-asset-btn"
                                     ng-click="addMakeSwapReceiveAssetRow()"
                                     ng-hide="multiMakeSwapReceiveAssetArray.length >= MAX_RECEIVE_ASSETS || makeUSAN">
                                    <img class="icon" src="images/add-circle-icon.svg" width="14px" height="14px">
                                    <div class="btn-name">Add Asset</div>
                                </div>
                            </div>
                        </div>

                        <div class="number-fills-section"
                             ng-show="!makeUSAN">

                            <div class="fills-header">
                                <img src="./images/fills.svg" width="24px" height="24px">
                                <div class="fills-header-title">Number of Fills</div>
                            </div>
                            <hr class="fills-hr">
                            <div class="fills-body">
                                <input type="text" class="form-control m-0 mt-1 pb-2 fills-amount"
                                       ng-model="makeMinumumSwap"
                                       numbers-only
                                       ng-change="setMinimumMakes();checkMakeSwapConditions();"
                                       placeholder="Amount">
                                <p class="fills-amount-desc">Number of fills determines the minimum amount someone can
                                    take in your swap. 1 fill would
                                    mean only the full swap can be taken. </p>
                            </div>

                            <!-- MAKE SWAP MINIMUM FILLS MARKER -->

                            <div class="fills-minimum">
                                <div>
                                    <div class="fills-minimum-title">Minimum Send</div>
                                    <div class="fills-minimum-curr"
                                         ng-repeat="multiSendAsset in multiMakeSwapSendAssetArray track by $index">
                                        <img class="icon" ng-if="multiSendAsset.sendTimeLockSet"
                                             src="./images/send-timelock-icon.svg"
                                             height="12px" width="12px"/>
                                        <span class="amt">{{multiSendAsset.minimumMakeSend}}</span>
                                        <span class="currency">{{multiSendAsset.selectedSendAssetSymbol}}</span>
                                    </div>
                                </div>
                                <div class="fills-minimum-divider">:</div>
                                <div>
                                    <div class="fills-minimum-title">Minimum Receive</div>
                                    <div class="fills-minimum-curr"
                                         ng-repeat="multiReceiveAsset in multiMakeSwapReceiveAssetArray track by $index">
                                        <img class="icon" ng-if="multiReceiveAsset.receiveTimeLockSet"
                                             src="./images/send-timelock-icon.svg" height="12px" width="12px"/>
                                        <span class="amt">{{multiReceiveAsset.minimumReceiveSend}}</span>
                                        <span class="currency">{{multiReceiveAsset.selectedReceiveAssetSymbol}}</span>
                                    </div>
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
                            <div class="address-desc" ng-show="privateAccess == true">Add Short Account Numbers or
                                Public Addresses. Separate addresses by commas.
                            </div>
                            <input ng-show="privateAccess == true"
                                   type="text" class="form-control m-0 mt-1 ps-address"
                                   ng-model="makeTarges"
                                   placeholder="Addresses">
                        </div>
                        <hr class="last-hr">
                        <div class="row actions-row">
                            <div class="btn-grp">
                                <button class="btn btn-white main-btn-secondary" ng-click="closeMakeSwapModal()">
                                    Cancel
                                </button>
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
                    <img class="close-btn" src="images/t.svg" width="20px" height="20px"
                         ng-click="closeMakeSwapConfirmModal()">
                    <div class="limit-width">
                        <h3 class="h3-blue title">Review Make Swap</h3>
                        <p class="description">Please review the following details carefully before making your
                            swap.</p>
                        <div class="summary">
                            <div class="summary-col divider-right">
                                <div class="summary-header">
                                    <img class="icon" src="images/you-send-new.svg" class="pr-2">
                                    <span>You Send</span>
                                </div>
                                <div class="summary-content">

                                    <!-- REVIEW MAKE SWAP SEND MULTI ASSETS MARKER -->
                                    <div ng-repeat="multiSendAsset in multiMakeSwapSendAssetArray track by $index">
                                        <div class="summary-cell"
                                             ng-show="multiSendAsset.selectedSendContract !== DEFAULT_USAN">
                                            <div class="logo">
                                                <img ng-if="multiSendAsset.selectedSendHasImage==true"
                                                     ng-src="images/verifiedassets/{{multiSendAsset.selectedSendImage}}"
                                                     height="32px"
                                                     width="32px"/>
                                                <span ng-if="!multiSendAsset.selectedSendHasImage"
                                                      class="btn btn-white btn-circle w32 asset-round mt-0">{{multiSendAsset.selectedSendAssetSymbol}}</span>
                                            </div>
                                            <div class="details-wrapper">
                                                <div class="details">
                                                    <span class="qty">{{multiSendAsset.makeSendAmount}}</span>
                                                    <div class="curr-sym">
                                                        <span class="currency">{{multiSendAsset.selectedSendAssetSymbol}}</span>
                                                        <img class="symbol" ng-if="multiSendAsset.selectedSendVerified"
                                                             src="./images/verified.svg" height="14px" width="14px"/>
                                                        <img class="symbol" ng-if="!multiSendAsset.selectedSendVerified"
                                                             src="./images/unverified.svg" height="16px" width="14px"/>
                                                    </div>
                                                </div>
                                                <div class="date-range">
                                                    <span class="small-gray-text"
                                                          ng-show="multiSendAsset.sendTimeLockSet">
                                                        <img class="mr-2" src="images/send-timelock-icon.svg"
                                                             width="12px">
                                                        <span ng-show="multiSendAsset.sendTimeLock == 'scheduled' && !multiSendAsset.hasTimeLockSet">{{multiSendAsset.fromStartTimeString}}
                                                            - ∞ Forever</span>
                                                        <span ng-show="multiSendAsset.receiveTimeLock == 'daterange' && !multiSendAsset.hasTimeLockSet">{{multiSendAsset.fromStartTimeString}}
                                                            - {{multiSendAsset.fromEndTimeString}}</span>
                                                        <span ng-show="multiSendAsset.hasTimeLockSet">{{multiSendAsset.selectedTimeLockTimespan}}</span>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="summary-cell summary-cell-custom"
                                             ng-show="multiSendAsset.selectedSendContract === DEFAULT_USAN">
                                            <div class="usan">
                                                <div class="name">USAN <span class="address">{{usanAddress}}</span>
                                                </div>
                                            </div>
                                            <div class="usan-warning">Once this swap is taken, your USAN will no longer
                                                be
                                                associated with your address.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="summary-col">
                                <div class="summary-header">
                                    <img class="icon" src="images/you-receive-new.svg" class="pr-2">
                                    <span>You Receive</span>
                                </div>
                                <div class="summary-content">

                                    <!-- REVIEW MAKE SWAP SEND MULTI ASSETS MARKER -->
                                    <div class="summary-cell"
                                         ng-repeat="multiReceiveAsset in multiMakeSwapReceiveAssetArray track by $index">
                                        <div class="logo">
                                            <img ng-if="multiReceiveAsset.multiReceiveAssetselectedReceiveHasImage==true"
                                                 ng-src="images/verifiedassets/{{multiReceiveAsset.selectedReceiveImage}}"
                                                 height="32px"
                                                 width="32px"/>
                                            <span ng-if="!multiReceiveAsset.selectedReceiveHasImage"
                                                  class="btn btn-white btn-circle w32 asset-round mt-0">{{multiReceiveAsset.selectedReceiveAssetSymbol}}</span>
                                        </div>
                                        <div class="details-wrapper">
                                            <div class="details">
                                                <span class="qty">{{multiReceiveAsset.makeReceiveAmount}}</span>
                                                <div class="curr-sym">
                                                    <span class="currency">{{multiReceiveAsset.selectedReceiveAssetSymbol}}</span>
                                                    <img class="symbol"
                                                         ng-if="multiReceiveAsset.selectedReceiveVerified"
                                                         src="./images/verified.svg" height="14px" width="14px"/>
                                                    <img class="symbol"
                                                         ng-if="!multiReceiveAsset.selectedReceiveVerified"
                                                         src="./images/unverified.svg" height="16px" width="14px"/>
                                                </div>
                                            </div>
                                            <div class="date-range">
                                                <span class="small-gray-text"
                                                      ng-show="multiReceiveAsset.receiveTimeLockSet">
                                                    <img class="mr-2" src="images/send-timelock-icon.svg" width="12px">
                                                    <span ng-show="multiReceiveAsset.receiveTimeLock == 'scheduled'">{{multiReceiveAsset.toStartTimeString}}
                                                        - ∞ Forever</span>
                                                    <span ng-show="multiReceiveAsset.receiveTimeLock == 'daterange'">{{multiReceiveAsset.toStartTimeString}}
                                                        - {{multiReceiveAsset.toEndTimeString}}</span>
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

                                <!-- REVIEW MAKE SWAP MULTI ASSETS PRICE MARKER -->
                                <div class="price-value">
                                    <div ng-repeat="multiSendAsset in multiMakeSwapSendAssetArray track by $index">
                                        <span class="amt"
                                              ng-show="multiSendAsset.selectedSendContract !== DEFAULT_USAN">{{multiSendAsset.makeSendAmountConfirm}}</span>
                                        <span class="currency"
                                              ng-show="multiSendAsset.selectedSendContract !== DEFAULT_USAN">
                                            {{multiSendAsset.assetToSendConfirm + (($index != multiMakeSwapSendAssetArray.length-1) ? ', ' : '')}}</span>
                                    </div>
                                    <span class="price-divider">:</span>
                                    <div ng-repeat="multiReceiveAsset in multiMakeSwapReceiveAssetArray track by $index">
                                        <span class="amt"> {{multiReceiveAsset.makeReceiveAmountConfirm}} </span>
                                        <span class="currency">
                                            {{multiReceiveAsset.selectedReceiveAssetSymbol + (($index != multiMakeSwapReceiveAssetArray.length-1) ? ', ' : '')}}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="price-row" ng-show="!makeUSAN">
                                <div class="price">
                                    <img class="icon" src="./images/fills.svg" height="24px" width="24px"/>
                                    NUMBER OF FILLS
                                </div>
                                <div class="price-filler"></div>
                                <div class="price-value">{{makeMinumumSwapConfirm}}</div>
                            </div>
                            <div class="address-row" ng-show="privateAccess && targesArray.length > 0">
                                <div class="left-grp">
                                    <div class="price">
                                        <img class="icon" src="./images/private.svg" height="24px" width="24px"/>
                                        PRIVATELY SENDING TO
                                    </div>
                                </div>
                                <div class="price-filler"></div>
                                <div class="address">
                                    <div ng-repeat="pvtAdress in targesArray" class="address-item">{{pvtAdress}}</div>
                                </div>
                            </div>
                            <div class="price-row">
                                <div class="price">
                                    <img class="icon" src="./images/fee.svg" height="24px" width="24px"/>
                                    TRANSACTION FEE
                                </div>
                                <div class="price-filler"></div>
                                <div class="price-value">{{'~.0.000025'}}
                                    <span class="currency">{{'FSN'}}</span></div>
                            </div>
                        </div>

                        <hr class="last-hr">
                        <div class="row actions-row">
                            <div class="btn-grp">
                                <button class="btn btn-white main-btn-secondary" ng-click="makeSwapModal.open()">Back
                                </button>
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

    <article class="modal fade modal-new" id="makeSwapEndConfirm" tabindex="-1">
        <section class="modal-dialog send-asset-dialog reset-modal">
            <section class="modal-content no-shadow">
                <article class="block no-shadow reset-modal" ng-hide="wallet.type=='addressOnly'">
                    <img class="close-btn" src="images/t.svg" width="20px" height="20px"
                         ng-click="closeMakeSwapConfirmEndModal()">
                    <div class="limit-width">
                        <div class="ms-confirmed-title-wrapper">
                            <div class="spinner-grow text-primary icon" role="status"
                                 ng-show="transactionStatus !== 'Success'">
                                <span class="sr-only">Loading...</span>
                            </div>
                            <img class="icon" src="images/confirmed-transaction.svg"
                                 ng-show="transactionStatus == 'Success'" height="32px" width="32px">
                            <h3 class="h3-blue title">Make Swap <span
                                        ng-show="transactionStatus !== 'Success'">Pending</span> <span
                                        ng-show="transactionStatus == 'Success'">Confirmed</span></h3>
                        </div>
                        <p class="ms-confirmed-description" ng-show="transactionStatus !== 'Success'">Your swap has been
                            sent and should be confirmed within the next block. You may close this receipt at any time
                            or
                            click the Transaction ID below to view on the block explorer.</p>
                        <p class="ms-confirmed-description" ng-show="transactionStatus == 'Success'">Your swap is now
                            available on the swap market.</p>
                        <div class="summary">
                            <div class="summary-col divider-right">
                                <div class="summary-header">
                                    <img class="icon" src="images/you-send-new.svg" class="pr-2">
                                    <span>You Send</span>
                                </div>
                                <div class="summary-content">

                                    <!-- REVIEW MAKE SWAP SEND MULTI ASSETS MARKER -->
                                    <div ng-repeat="multiSendAsset in multiMakeSwapSendAssetArray track by $index">
                                        <div class="summary-cell"
                                             ng-show="multiSendAsset.selectedSendContract !== DEFAULT_USAN">
                                            <div class="logo">
                                                <img ng-if="multiSendAsset.selectedSendHasImage==true"
                                                     ng-src="images/verifiedassets/{{multiSendAsset.selectedSendImage}}"
                                                     height="32px"
                                                     width="32px"/>
                                                <span ng-if="!multiSendAsset.selectedSendHasImage"
                                                      class="btn btn-white btn-circle w32 asset-round mt-0">{{multiSendAsset.selectedSendAssetSymbol}}</span>
                                            </div>
                                            <div class="details-wrapper">
                                                <div class="details">
                                                    <span class="qty">{{multiSendAsset.makeSendAmount}}</span>
                                                    <div class="curr-sym">
                                                        <span class="currency">{{multiSendAsset.selectedSendAssetSymbol}}</span>
                                                        <img class="symbol" ng-if="multiSendAsset.selectedSendVerified"
                                                             src="./images/verified.svg" height="14px" width="14px"/>
                                                        <img class="symbol" ng-if="!multiSendAsset.selectedSendVerified"
                                                             src="./images/unverified.svg" height="16px" width="14px"/>
                                                    </div>
                                                </div>
                                                <div class="date-range">
                                                    <span class="small-gray-text"
                                                          ng-show="multiSendAsset.sendTimeLockSet">
                                                        <img class="mr-2" src="images/send-timelock-icon.svg"
                                                             width="12px">
                                                        <span ng-show="multiSendAsset.sendTimeLock == 'scheduled' && !multiSendAsset.hasTimeLockSet">{{multiSendAsset.fromStartTimeString}}
                                                            - ∞ Forever</span>
                                                        <span ng-show="multiSendAsset.receiveTimeLock == 'daterange' && !multiSendAsset.hasTimeLockSet">{{multiSendAsset.fromStartTimeString}}
                                                            - {{multiSendAsset.fromEndTimeString}}</span>
                                                        <span ng-show="multiSendAsset.hasTimeLockSet">{{multiSendAsset.selectedTimeLockTimespan}}</span>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="summary-cell summary-cell-custom"
                                             ng-show="multiSendAsset.selectedSendContract === DEFAULT_USAN">
                                            <div class="usan">
                                                <div class="name">USAN <span class="address">{{usanAddress}}</span>
                                                </div>
                                            </div>
                                            <div class="usan-warning">Once this swap is taken, your USAN will no longer
                                                be
                                                associated with your address.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="summary-col">
                                <div class="summary-header">
                                    <img class="icon" src="images/you-receive-new.svg" class="pr-2">
                                    <span>You Receive</span>
                                </div>
                                <div class="summary-content">

                                    <!-- REVIEW MAKE SWAP SEND MULTI ASSETS MARKER -->
                                    <div class="summary-cell"
                                         ng-repeat="multiReceiveAsset in multiMakeSwapReceiveAssetArray track by $index">
                                        <div class="logo">
                                            <img ng-if="multiReceiveAsset.multiReceiveAssetselectedReceiveHasImage==true"
                                                 ng-src="images/verifiedassets/{{multiReceiveAsset.selectedReceiveImage}}"
                                                 height="32px"
                                                 width="32px"/>
                                            <span ng-if="!multiReceiveAsset.selectedReceiveHasImage"
                                                  class="btn btn-white btn-circle w32 asset-round mt-0">{{multiReceiveAsset.selectedReceiveAssetSymbol}}</span>
                                        </div>
                                        <div class="details-wrapper">
                                            <div class="details">
                                                <span class="qty">{{multiReceiveAsset.makeReceiveAmount}}</span>
                                                <div class="curr-sym">
                                                    <span class="currency">{{multiReceiveAsset.selectedReceiveAssetSymbol}}</span>
                                                    <img class="symbol"
                                                         ng-if="multiReceiveAsset.selectedReceiveVerified"
                                                         src="./images/verified.svg" height="14px" width="14px"/>
                                                    <img class="symbol"
                                                         ng-if="!multiReceiveAsset.selectedReceiveVerified"
                                                         src="./images/unverified.svg" height="16px" width="14px"/>
                                                </div>
                                            </div>
                                            <div class="date-range">
                                                <span class="small-gray-text"
                                                      ng-show="multiReceiveAsset.receiveTimeLockSet">
                                                    <img class="mr-2" src="images/send-timelock-icon.svg" width="12px">
                                                    <span ng-show="multiReceiveAsset.receiveTimeLock == 'scheduled'">{{multiReceiveAsset.toStartTimeString}}
                                                        - ∞ Forever</span>
                                                    <span ng-show="multiReceiveAsset.receiveTimeLock == 'daterange'">{{multiReceiveAsset.toStartTimeString}}
                                                        - {{multiReceiveAsset.toEndTimeString}}</span>
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
                                    <img class="icon" src="./images/transaction-id.svg" height="24px" width="24px"/>
                                    TX ID
                                </div>
                                <div class="price-filler"></div>
                                <div class="price-value tx-value">
                                    <a class="address"
                                       href="https://blocks.fusionnetwork.io/#!/transaction/{{makeTxid}}"
                                       target="_blank">{{formatAddress(makeTxid)}}</a>
                                    <a href="https://blocks.fusionnetwork.io/#!/transaction/{{makeTxid}}"
                                       target="_blank"><img class="icon" src="./images/external-link.svg" height="24px"
                                                            width="24px"/></a>
                                </div>
                            </div>
                            <div class="price-row">
                                <div class="price">
                                    <img class="icon" src="./images/price.svg" height="24px" width="24px"/>
                                    PRICE
                                </div>
                                <div class="price-filler"></div>
                                <!-- PENDING MAKE SWAP SEND MULTI ASSETS PRICE MARKER -->
                                <div class="price-value">
                                    <div ng-repeat="multiSendAsset in multiMakeSwapSendAssetArray track by $index">
                                        <span class="amt"
                                              ng-show="multiSendAsset.selectedSendContract !== DEFAULT_USAN">{{multiSendAsset.makeSendAmountConfirm}}</span>
                                        <span class="currency"
                                              ng-show="multiSendAsset.selectedSendContract !== DEFAULT_USAN">
                                            {{multiSendAsset.assetToSendConfirm + (($index != multiMakeSwapSendAssetArray.length-1) ? ', ' : '')}}</span>
                                    </div>
                                    <span class="price-divider">:</span>
                                    <div ng-repeat="multiReceiveAsset in multiMakeSwapReceiveAssetArray track by $index">
                                        <span class="amt"> {{multiReceiveAsset.makeReceiveAmountConfirm}} </span>
                                        <span class="currency">
                                            {{multiReceiveAsset.selectedReceiveAssetSymbol + (($index != multiMakeSwapReceiveAssetArray.length-1) ? ', ' : '')}}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="price-row" ng-show="!makeUSAN">
                                <div class="price">
                                    <img class="icon" src="./images/fills.svg" height="24px" width="24px"/>
                                    NUMBER OF FILLS
                                </div>
                                <div class="price-filler"></div>
                                <div class="price-value">{{makeMinumumSwapConfirm}}</div>
                            </div>
                            <div class="address-row" ng-show="privateAccess && targesArray.length > 0">
                                <div class="left-grp">
                                    <div class="price">
                                        <img class="icon" src="./images/private.svg" height="24px" width="24px"/>
                                        PRIVATELY SENDING TO
                                    </div>
                                </div>
                                <div class="price-filler"></div>
                                <div class="address">
                                    <div ng-repeat="pvtAdress in targesArray" class="address-item">{{pvtAdress}}</div>
                                </div>
                            </div>
                            <div class="price-row">
                                <div class="price">
                                    <img class="icon" src="./images/fee.svg" height="24px" width="24px"/>
                                    TRANSACTION FEE
                                </div>
                                <div class="price-filler"></div>
                                <div class="price-value">{{'~.0.000025'}}
                                    <span class="currency">{{'FSN'}}</span></div>
                            </div>
                        </div>

                        <hr class="last-hr">
                        <div class="row actions-row">
                            <div class="btn-grp">
                                <button class="btn btn-white main-btn-secondary"
                                        ng-click="closeMakeSwapConfirmEndModal()">Close
                                </button>
                            </div>
                        </div>
                    </div>
                </article>
            </section>
        </section>
    </article>
    <article class="modal fade modal-new" id="recallSwapSuccess" tabindex="-1">
        <section class="modal-dialog send-asset-dialog reset-modal">
            <section class="modal-content no-shadow">
                <article class="block no-shadow reset-modal" ng-hide="wallet.type=='addressOnly'">
                    <img class="close-btn" src="images/t.svg" width="20px" height="20px"
                         ng-click="recallSwapSuccess.close()">
                    <div class="limit-width">
                        <div class="ms-confirmed-title-wrapper">
                            <div class="spinner-grow text-primary icon" role="status"
                                 ng-show="transactionStatus !== 'Success'">
                                <span class="sr-only">Loading...</span>
                            </div>
                            <img class="icon" src="images/confirmed-transaction.svg"
                                 ng-show="transactionStatus == 'Success'" height="32px" width="32px">
                            <h3 class="h3-blue title">Recall Swap <span
                                        ng-show="transactionStatus !== 'Success'">Pending</span> <span
                                        ng-show="transactionStatus == 'Success'">Confirmed</span></h3>
                        </div>
                        <p class="ms-confirmed-description" ng-show="transactionStatus !== 'Success'">Your swap has been
                            recalled and should be confirmed with the next block. You may close this receipt at any time
                            or
                            click the Transaction ID below to view on the block explorer.</p>
                        <p class="ms-confirmed-description" ng-show="transactionStatus == 'Success'">Your assets are now
                            available in your wallet.</p>
                        <div class="price-section">
                            <div class="price-row">
                                <div class="price">
                                    <img class="icon" src="./images/transaction-id.svg" height="24px" width="24px"/>
                                    TX ID
                                </div>
                                <div class="price-filler"></div>
                                <div class="price-value tx-value">
                                    <a class="address"
                                       href="https://blocks.fusionnetwork.io/#!/transaction/{{recallTxid}}"
                                       target="_blank">{{formatAddress(recallTxid)}}</a>
                                    <a href="https://blocks.fusionnetwork.io/#!/transaction/{{recallTxid}}"
                                       target="_blank"><img class="icon" src="./images/external-link.svg" height="24px"
                                                            width="24px"/></a>
                                </div>
                            </div>
                            <div class="price-row">
                                <div class="price">
                                    <img class="icon" src="./images/fee.svg" height="24px" width="24px"/>
                                    TRANSACTION FEE
                                </div>
                                <div class="price-filler"></div>
                                <div class="price-value">{{'~.0.000025'}}
                                    <span class="currency">{{'FSN'}}</span></div>
                            </div>
                        </div>

                        <hr class="last-hr">
                        <div class="row actions-row">
                            <div class="btn-grp">
                                <button class="btn btn-white main-btn-secondary"
                                        ng-click="recallSwapSuccess.close()">Close
                                </button>
                            </div>
                        </div>
                    </div>
                </article>
            </section>
        </section>
    </article>
    <article class="modal fade modal-new" id="swapInformationModal" tabindex="-1">
        <section class="modal-dialog send-asset-dialog reset-modal">
            <section class="modal-content no-shadow">
                <article class="block no-shadow reset-modal" ng-hide="wallet.type=='addressOnly'">
                    <img class="close-btn" src="images/t.svg" width="20px" height="20px"
                         ng-click="swapInformationModal.close()">

                    <div class="limit-width">
                        <div class="col-md-12 p-0">
                            <h3 class="title title-make-swap">Swap Details</h3>
                            <div class="summary take-swap-summary mb-5">
                                <div class="summary-col">
                                    <div class="summary-header">
                                        <img class="icon" src="images/you-send-new.svg" class="pr-2">
                                        <span>Maker Receives</span>
                                    </div>
                                    <div class="summary-content">

                                        <!-- PENDING TAKE SWAP SEND MULTI ASSETS MARKER -->
                                        <div class="summary-cell"
                                             ng-repeat="multiSendAsset in swapInfo.ToAssets track by $index">
                                            <div class="logo">
                                                <img ng-if="multiSendAsset.toHasImage==true"
                                                     ng-src="images/verifiedassets/{{multiSendAsset.toVerifiedImage}}"
                                                     height="32px" width="32px"/>
                                                <span ng-if="!multiSendAsset.toHasImage"
                                                      class="btn btn-white btn-circle w32 asset-round mt-0">{{multiSendAsset.toAssetSymbol}}</span>
                                            </div>
                                            <div class="details-wrapper">
                                                <div class="details">
                                                    <span class="qty">{{multiSendAsset.toAmountCut}}</span>
                                                    <div class="curr-sym">
                                                        <span class="currency">{{multiSendAsset.toAssetSymbol}}</span>
                                                        <img class="symbol" ng-if="multiSendAsset.toVerified"
                                                             src="./images/verified.svg" height="14px" width="14px"/>
                                                        <img class="symbol" ng-if="!multiSendAsset.toVerified"
                                                             src="./images/unverified.svg" height="16px" width="14px"/>
                                                    </div>
                                                </div>
                                                <div class="date-range">
                                                <span class="small-gray-text"
                                                      ng-hide="multiSendAsset.ToStartTime == 0
                                                      && multiSendAsset.ToEndTime == 18446744073709552000">
                                                    <img class="mr-2 icon" src="images/send-timelock-icon.svg"
                                                         width="12px">
                                                    <span class="range">{{multiSendAsset.ToStartTimeString}}
                                                        - {{multiSendAsset.ToEndTimeString}}</span>
                                                </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="summary-col divider-left">
                                    <div class="summary-header">
                                        <img class="icon" src="images/you-receive-new.svg" class="pr-2">
                                        <span>Taker Receives</span>
                                    </div>
                                    <div class="summary-content">

                                        <!-- PENDING TAKE SWAP RECEIVE MULTI ASSETS MARKER -->
                                        <div ng-repeat="multiReceiveAsset in swapInfo.FromAssets track by $index">
                                            <div class="summary-cell"
                                                 ng-show="multiReceiveAsset.toAssetId !== DEFAULT_USAN">
                                                <div class="logo">
                                                    <img ng-if="multiReceiveAsset.fromHasImage==true"
                                                         ng-src="images/verifiedassets/{{multiReceiveAsset.fromVerifiedImage}}"
                                                         height="32px" width="32px"/>
                                                    <span ng-if="!multiReceiveAsset.fromHasImage"
                                                          class="btn btn-white btn-circle w32 asset-round mt-0">{{multiReceiveAsset.fromAssetSymbol}}</span>
                                                </div>
                                                <div class="details-wrapper">
                                                    <div class="details">
                                                        <span class="qty">{{multiReceiveAsset.fromAmountCut}}</span>
                                                        <div class="curr-sym">
                                                            <span class="currency">{{multiReceiveAsset.fromAssetSymbol}}</span>
                                                            <img class="symbol" ng-if="multiReceiveAsset.fromVerified"
                                                                 src="./images/verified.svg" height="14px"
                                                                 width="14px"/>
                                                            <img class="symbol" ng-if="!multiReceiveAsset.fromVerified"
                                                                 src="./images/unverified.svg" height="16px"
                                                                 width="14px"/>
                                                        </div>
                                                    </div>
                                                    <div class="date-range">
                                                    <span class="small-gray-text"
                                                          ng-hide="multiReceiveAsset.FromStartTime == 0
                                                        && multiReceiveAsset.FromEndTime == 18446744073709552000">
                                                        <img class="mr-2" src="images/sendtl.svg" width="12px">
                                                        <span>{{multiReceiveAsset.FromStartTimeString}}
                                                            - {{multiReceiveAsset.FromEndTimeString}}</span>
                                                    </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="summary-cell summary-cell-custom"
                                                 ng-show="multiReceiveAsset.toAssetId == DEFAULT_USAN">
                                                <div class="usan">
                                                    <div class="name">USAN <span
                                                                class="address">{{extractAddressFromAssetSymbol(multiReceiveAsset.toAssetSymbol)}}</span>
                                                    </div>
                                                </div>
                                                <div class="usan-warning">Once this swap is taken, your USAN will no
                                                    longer be
                                                    associated with your address.
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="price-section">
                                <div class="price-row">
                                    <div class="price">
                                        SWAP ID
                                    </div>
                                    <div class="price-filler"></div>
                                    <span class="price-value copy"
                                          ng-click="copyToClipboard(swapInfo.ID)">
                                                                                {{formatAddress(swapInfo.ID)}}
                                        </span>
                                </div>
                                <div class="price-row">
                                    <div class="price">
                                        CREATED BY
                                    </div>
                                    <div class="price-filler"></div>
                                    <div class="price-value">
                                        <a class="blue-text"
                                           href="https://blocks.fusionnetwork.io/#!/address/{{swapInfo.Owner}}"
                                           target="_blank"
                                           rel="noopener noreferrer">
                                            {{swapInfo.Owner}} <img class="mb-1" src="images/New_Window.svg"/>
                                        </a>
                                    </div>
                                </div>
                                <div class="price-row">
                                    <div class="price">
                                        DATE CREATED
                                    </div>
                                    <div class="price-filler"></div>
                                    <div class="price-value">{{swapInfo.Time}}</div>
                                </div>
                                <div class="price-row">
                                    <div class="price">
                                        REMAINING FILLS
                                    </div>
                                    <div class="price-filler"></div>
                                    <div class="price-value">{{swapInfo.size}} of {{swapInfo.SwapSize}}</div>
                                </div>
                                <div class="price-row">
                                    <div class="price">
                                        AVAILABILITY
                                    </div>
                                    <div class="price-filler"></div>
                                    <div class="price-value"><i class="fa fa-globe" aria-hidden="true"
                                                                ng-hide="swapInfo.Targes=='Private'"></i>
                                        <i class="fa fa-lock" aria-hidden="true"
                                           ng-hide="swapInfo.Targes=='Public'"></i>
                                        <span class="ml-2">{{swapInfo.Targes}}</span></div>
                                </div>
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
                    <img class="close-btn" src="images/t.svg" width="20px" height="20px"
                         ng-click="takeSwapConfirm.close()">
                    <div class="limit-width">
                        <h3 class="h3-blue title">Review Take Swap</h3>
                        <p class="description">Please review the following details carefully before taking the swap.</p>
                        <div class="title-warning" ng-show="!takeDataFront.toVerified">
                            <img class="icon" src="./images/unverified.svg" height="16px" width="14px"/>
                            <div class="description">Caution: this swap contains a suspicious asset(s).</div>
                        </div>
                        <div class="summary take-swap-summary">
                            <div class="summary-col">
                                <div class="summary-header">
                                    <img class="icon" src="images/you-send-new.svg" class="pr-2">
                                    <span>You Send</span>
                                </div>
                                <div class="summary-content">

                                    <!-- CONFIRM TAKE SWAP SEND MULTI ASSETS MARKER -->
                                    <div class="summary-cell"
                                         ng-repeat="multiSendAsset in multiTakeSwapSendAssetArray track by $index">
                                        <div class="logo">
                                            <img ng-if="multiSendAsset.toHasImage==true"
                                                 ng-src="images/verifiedassets/{{multiSendAsset.toVerifiedImage}}"
                                                 height="32px" width="32px"/>
                                            <span ng-if="!multiSendAsset.toHasImage"
                                                  class="btn btn-white btn-circle w32 asset-round mt-0">{{multiSendAsset.toAssetSymbol}}</span>
                                        </div>
                                        <div class="details-wrapper">
                                            <div class="details">
                                                <span class="qty">{{multiSendAsset.sendTokens}}</span>
                                                <div class="curr-sym">
                                                    <span class="currency">{{multiSendAsset.fromAssetSymbol}}</span>
                                                    <img class="symbol" ng-if="multiSendAsset.toVerified"
                                                         src="./images/verified.svg" height="14px" width="14px"/>
                                                    <img class="symbol" ng-if="!multiSendAsset.toVerified"
                                                         src="./images/unverified.svg" height="16px" width="14px"/>
                                                </div>
                                            </div>
                                            <div class="date-range">
                                                <span class="small-gray-text"
                                                      ng-hide="multiSendAsset.ToStartTime == 0 && multiSendAsset.ToEndTime == 18446744073709552000">
                                                    <img class="mr-2 icon" src="images/send-timelock-icon.svg"
                                                         width="12px">
                                                    <span class="range">{{multiSendAsset.ToStartTimeString}}
                                                        - {{multiSendAsset.ToEndTimeString}}</span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="summary-col divider-left">
                                <div class="summary-header">
                                    <img class="icon" src="images/you-receive-new.svg" class="pr-2">
                                    <span>You Receive</span>
                                </div>
                                <div class="summary-content">

                                    <!-- CONFIRM TAKE SWAP RECEIVE MULTI ASSETS MARKER -->
                                    <div ng-repeat="multiReceiveAsset in multiTakeSwapReceiveAssetArray track by $index">
                                        <div class="summary-cell"
                                             ng-show="multiReceiveAsset.toAssetId !== DEFAULT_USAN">
                                            <div class="logo">
                                                <img ng-if="multiReceiveAsset.fromHasImage==true"
                                                     ng-src="images/verifiedassets/{{multiReceiveAsset.fromVerifiedImage}}"
                                                     height="32px" width="32px"/>
                                                <span ng-if="!multiReceiveAsset.fromHasImage"
                                                      class="btn btn-white btn-circle w32 asset-round mt-0">{{multiReceiveAsset.fromAssetSymbol}}</span>
                                            </div>
                                            <div class="details-wrapper">
                                                <div class="details">
                                                    <span class="qty">{{multiReceiveAsset.receiveTokens}}</span>
                                                    <div class="curr-sym">
                                                        <span class="currency">{{multiReceiveAsset.toAssetSymbol}}</span>
                                                        <img class="color-Active verifier"
                                                             ng-show="multiReceiveAsset.fromVerified"
                                                             src="./images/verified.svg" height="14px" width="14px"/>
                                                        <img class="color-Active verifier"
                                                             ng-show="!multiReceiveAsset.fromVerified"
                                                             src="./images/unverified.svg" height="14px" width="14px"/>
                                                    </div>
                                                </div>
                                                <div class="date-range">
                                                    <span class="small-gray-text"
                                                          ng-hide="multiReceiveAsset.FromStartTime == 0
                                                        && multiReceiveAsset.FromEndTime == 18446744073709552000">
                                                        <img class="mr-2" src="images/sendtl.svg" width="12px">
                                                        <span>{{multiReceiveAsset.FromStartTimeString}}
                                                            - {{multiReceiveAsset.FromEndTimeString}}</span>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="summary-cell summary-cell-custom"
                                             ng-show="multiReceiveAsset.toAssetId == DEFAULT_USAN">
                                            <div class="usan">
                                                <div class="name">USAN <span
                                                            class="address">{{extractAddressFromAssetSymbol(multiReceiveAsset.toAssetSymbol)}}</span>
                                                </div>
                                            </div>
                                            <div class="usan-warning">Once this swap is taken, your USAN will no longer
                                                be
                                                associated with your address.
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

                                <!-- CONFIRM TAKE SWAP MULTI ASSETS PRICE MARKER -->
                                <div class="price-value">
                                    <div ng-repeat="multiSendAsset in multiTakeSwapSendAssetArray track by $index">
                                        <span class="amt">{{multiSendAsset.swaprate}}</span>
                                        <span class="currency">
                                            {{multiSendAsset.fromAssetSymbol + (($index != multiTakeSwapSendAssetArray.length-1) ? ', ' : '')}}</span>
                                    </div>
                                    <span class="price-divider">:</span>
                                    <div ng-repeat="multiReceiveAsset in multiTakeSwapReceiveAssetArray track by $index">
                                        <span class="amt"> {{1}} </span>
                                        <span class="currency">
                                            {{multiReceiveAsset.toAssetSymbol + (($index != multiTakeSwapReceiveAssetArray.length-1) ? ', ' : '')}}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="price-row"
                                 ng-show="takeDataFront.toAssetId !== DEFAULT_USAN">
                                <div class="price">
                                    <img class="icon" src="./images/fills.svg" height="24px" width="24px"/>
                                    NUMBER OF FILLS
                                </div>
                                <div class="price-filler"></div>
                                <div class="price-value">{{takeAmountSwap}}</div>
                            </div>
                            <div class="price-row">
                                <div class="price">
                                    <img class="icon" src="./images/fee.svg" height="24px" width="24px"/>
                                    TRANSACTION FEE
                                </div>
                                <div class="price-filler"></div>
                                <div class="price-value">{{'~.0.000025'}}
                                    <span class="currency">{{'FSN'}}</span>
                                </div>
                            </div>
                        </div>
                        <hr class="last-hr">
                        <div class="row actions-row">
                            <div class="btn-grp">
                                <button class="btn btn-white main-btn-secondary" ng-click="takeSwapModal.open()">Back
                                </button>
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
    <article class="modal fade modal-new" id="takeSwapEndConfirm" tabindex="-1">
        <section class="modal-dialog send-asset-dialog reset-modal">
            <section class="modal-content no-shadow">
                <article class="block no-shadow reset-modal" ng-hide="wallet.type=='addressOnly'">
                    <img class="close-btn" src="images/t.svg" width="20px" height="20px"
                         ng-click="takeSwapEndConfirm.close()">

                    <div class="limit-width">
                        <div class="ms-confirmed-title-wrapper">
                            <img class="icon" src="images/confirmed-transaction.svg"
                                 ng-show="transactionStatus == 'Success'" height="32px" width="32px">
                            <div class="spinner-grow text-primary icon" role="status"
                                 ng-show="transactionStatus !== 'Success'">
                                <span class="sr-only">Loading...</span>
                            </div>
                            <h3 class="h3-blue title">Take Swap <span
                                        ng-show="transactionStatus !== 'Success'">Pending</span> <span
                                        ng-show="transactionStatus == 'Success'">Confirmed</span></h3>
                        </div>
                        <p class="ms-confirmed-description" ng-show="transactionStatus !== 'Success'">Your swap has been
                            sent and should be confirmed with the next block. You may close this receipt at any time or
                            click the Transaction ID below to view on the block explorer.</p>
                        <p class="ms-confirmed-description" ng-show="transactionStatus == 'Success'">Your asset is now
                            available.</p>
                        <div class="summary take-swap-summary">
                            <div class="summary-col">
                                <div class="summary-header">
                                    <img class="icon" src="images/you-send-new.svg" class="pr-2">
                                    <span>You Send</span>
                                </div>
                                <div class="summary-content">

                                    <!-- PENDING TAKE SWAP SEND MULTI ASSETS MARKER -->
                                    <div class="summary-cell"
                                         ng-repeat="multiSendAsset in multiTakeSwapSendAssetArray track by $index">
                                        <div class="logo">
                                            <img ng-if="multiSendAsset.toHasImage==true"
                                                 ng-src="images/verifiedassets/{{multiSendAsset.toVerifiedImage}}"
                                                 height="32px" width="32px"/>
                                            <span ng-if="!multiSendAsset.toHasImage"
                                                  class="btn btn-white btn-circle w32 asset-round mt-0">{{multiSendAsset.toAssetSymbol}}</span>
                                        </div>
                                        <div class="details-wrapper">
                                            <div class="details">
                                                <span class="qty">{{multiSendAsset.sendTokens}}</span>
                                                <div class="curr-sym">
                                                    <span class="currency">{{multiSendAsset.fromAssetSymbol}}</span>
                                                    <img class="symbol" ng-if="multiSendAsset.toVerified"
                                                         src="./images/verified.svg" height="14px" width="14px"/>
                                                    <img class="symbol" ng-if="!multiSendAsset.toVerified"
                                                         src="./images/unverified.svg" height="16px" width="14px"/>
                                                </div>
                                            </div>
                                            <div class="date-range">
                                                <span class="small-gray-text"
                                                      ng-hide="multiSendAsset.ToStartTime == 0
                                                      && multiSendAsset.ToEndTime == 18446744073709552000">
                                                    <img class="mr-2 icon" src="images/send-timelock-icon.svg"
                                                         width="12px">
                                                    <span class="range">{{multiSendAsset.ToStartTimeString}}
                                                        - {{multiSendAsset.ToEndTimeString}}</span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="summary-col divider-left">
                                <div class="summary-header">
                                    <img class="icon" src="images/you-receive-new.svg" class="pr-2">
                                    <span>You Receive</span>
                                </div>
                                <div class="summary-content">

                                    <!-- PENDING TAKE SWAP RECEIVE MULTI ASSETS MARKER -->
                                    <div ng-repeat="multiReceiveAsset in multiTakeSwapReceiveAssetArray track by $index">
                                        <div class="summary-cell"
                                             ng-show="multiReceiveAsset.toAssetId !== DEFAULT_USAN">
                                            <div class="logo">
                                                <img ng-if="multiReceiveAsset.fromHasImage==true"
                                                     ng-src="images/verifiedassets/{{multiReceiveAsset.fromVerifiedImage}}"
                                                     height="32px" width="32px"/>
                                                <span ng-if="!multiReceiveAsset.fromHasImage"
                                                      class="btn btn-white btn-circle w32 asset-round mt-0">{{multiReceiveAsset.fromAssetSymbol}}</span>
                                            </div>
                                            <div class="details-wrapper">
                                                <div class="details">
                                                    <span class="qty">{{multiReceiveAsset.receiveTokens}}</span>
                                                    <div class="curr-sym">
                                                        <span class="currency">{{multiReceiveAsset.toAssetSymbol}}</span>
                                                        <img class="symbol" ng-if="multiReceiveAsset.fromVerified"
                                                             src="./images/verified.svg" height="14px" width="14px"/>
                                                        <img class="symbol" ng-if="!multiReceiveAsset.fromVerified"
                                                             src="./images/unverified.svg" height="16px" width="14px"/>
                                                    </div>
                                                </div>
                                                <div class="date-range">
                                                    <span class="small-gray-text"
                                                          ng-hide="multiReceiveAsset.FromStartTime == 0
                                                        && multiReceiveAsset.FromEndTime == 18446744073709552000">
                                                        <img class="mr-2" src="images/sendtl.svg" width="12px">
                                                        <span>{{multiReceiveAsset.FromStartTimeString}}
                                                            - {{multiReceiveAsset.FromEndTimeString}}</span>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="summary-cell summary-cell-custom"
                                             ng-show="multiReceiveAsset.toAssetId == DEFAULT_USAN">
                                            <div class="usan">
                                                <div class="name">USAN <span
                                                            class="address">{{extractAddressFromAssetSymbol(multiReceiveAsset.toAssetSymbol)}}</span>
                                                </div>
                                            </div>
                                            <div class="usan-warning">Once this swap is taken, your USAN will no longer
                                                be
                                                associated with your address.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="price-section">
                            <div class="price-row">
                                <div class="price">
                                    <img class="icon" src="./images/transaction-id.svg" height="24px" width="24px"/>
                                    TX ID
                                </div>
                                <div class="price-filler"></div>
                                <div class="price-value tx-value">
                                    <a class="address"
                                       href="https://blocks.fusionnetwork.io/#!/transaction/{{takeTxid}}"
                                       target="_blank">{{formatAddress(takeTxid)}}</a>
                                    <a href="https://blocks.fusionnetwork.io/#!/transaction/{{takeTxid}}"
                                       target="_blank"><img class="icon" src="./images/external-link.svg" height="24px"
                                                            width="24px"/></a>
                                </div>
                            </div>
                            <div class="price-row">
                                <div class="price">
                                    <img class="icon" src="./images/price.svg" height="24px" width="24px"/>
                                    PRICE
                                </div>
                                <div class="price-filler"></div>

                                <!-- PENDING TAKE SWAP MULTI ASSETS PRICE MARKER -->
                                <div class="price-value">
                                    <div ng-repeat="multiSendAsset in multiTakeSwapSendAssetArray track by $index">
                                        <span class="amt">{{multiSendAsset.swapRate}}</span>
                                        <span class="currency">
                                            {{multiSendAsset.fromAssetSymbol + (($index != multiTakeSwapSendAssetArray.length-1) ? ', ' : '')}}</span>
                                    </div>
                                    <span class="price-divider">:</span>
                                    <div ng-repeat="multiReceiveAsset in multiTakeSwapReceiveAssetArray track by $index">
                                        <span class="amt"> {{1}} </span>
                                        <span class="currency">
                                            {{multiReceiveAsset.toAssetSymbol + (($index != multiTakeSwapReceiveAssetArray.length-1) ? ', ' : '')}}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="price-row"
                                 ng-show="takeDataFront.toAssetId !== DEFAULT_USAN">
                                <div class="price">
                                    <img class="icon" src="./images/fills.svg" height="24px" width="24px"/>
                                    NUMBER OF FILLS
                                </div>
                                <div class="price-filler"></div>
                                <div class="price-value">{{takeAmountSwap}}</div>
                            </div>
                            <div class="price-row">
                                <div class="price">
                                    <img class="icon" src="./images/fee.svg" height="24px" width="24px"/>
                                    TRANSACTION FEE
                                </div>
                                <div class="price-filler"></div>
                                <div class="price-value">{{'~.0.000025'}}
                                    <span class="currency">{{'FSN'}}</span>
                                </div>
                            </div>
                        </div>
                        <hr class="last-hr">
                        <div class="row actions-row">
                            <div class="btn-grp">
                                <button class="btn btn-white main-btn-secondary" ng-click="takeSwapEndConfirm.close()">
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </article>
            </section>
        </section>
    </article>

</article>
