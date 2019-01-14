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
                        <a class="ng-scope" ng-click="showSwapMarket = false ; showOpenMakes = true">Open Makes ({{openMakeSwaps}})
                            <span></span></a>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
    <div class="col-md-12 p-2 swap-border">
        <div class="col-md-3 text-left mr-0">
            <span class="small-gray-text">Send Assets</span>
            <br>
            <div class="col-md-12 col-xs-12 p-2 asset-dropdown border-gray-dropdown"
                 ng-click="sendDropDown = !sendDropDown">
                <a>
                    {{selectedSendAsset}}
                    <span class="small-gray-text max-char">{{selectedSendContract}}</span>
                </a>
            </div>
            <div class="dropdown-menu dropdown-menu fusion-text-14 p-2 higher-min-width" ng-show="sendDropDown">
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
            <div class="stripe-rotated">
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
                <a>
                    {{selectedReceiveAsset}}
                    <span class="small-gray-text max-char">{{selectedReceiveContract}}</span>
                </a>
            </div>
            <div class="dropdown-menu dropdown-menu fusion-text-14 p-2 higher-min-width" ng-show="receiveDropDown">
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
        <div class="col-md-3 text-left">
            <span class="small-gray-text">Asset Balance</span>
            <br>
            <div class="sendAssetBalanceAvailable w-50" ng-hide="selectedAssetBalance >= 0">
                <span class="small-gray-text ng-binding">Select asset first</span>
            </div>
            <div class="sendAssetBalanceAvailable w-50" ng-show="selectedAssetBalance >= 0">
                <span class="text-fusion ng-binding">{{selectedAssetBalance}}</span><span class="small-gray-text"> available to send.</span>
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
                <div class="text-center" ng-hide="openMakeSwaps != 0"><span
                            class="small-gray-text">No Open Swaps</span></div>
                <table class="table" ng-show="openMakeSwaps != 0">
                    <thead>
                    <tr class="small-gray-table">
                        <th scope="col"></th>
                        <th scope="col">Time Initiated</th>
                        <th scope="col">Send</th>
                        <th scope="col">Receive</th>
                        <th scope="col">Swap Rate</th>
                        <th scope="col">Minimum Swap</th>
                        <th scope="col">Owner (USAN)</th>
                        <th scope="col" class="float-right">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr ng-repeat="asset in swapsList | filter: { owned: 'true' } track by $index">
                        <td><i class="fa fa-globe" aria-hidden="true" ng-hide="asset.targes=='Private'"></i>
                            <i class="fa fa-lock" aria-hidden="true" ng-hide="asset.targes=='Public'"></i>
                            {{asset.targes}}</td>
                        <td>{{asset.time}}</td>
                        <td><strong>{{asset.fromAmount}}</strong> {{asset.fromAssetSymbol}}</td>
                        <td><strong>{{asset.toAmount}}</strong> {{asset.toAssetSymbol}}</td>
                        <td><strong>{{asset.swaprate}}</strong> {{asset.fromAssetSymbol}}</td>
                        <td><strong>{{asset.minswap}}</strong> {{asset.fromAssetSymbol}}</td>
                        <td>{{asset.owner}}</td>
                        <td class="float-right">
                            <div ng-hide="asset.owned == false">
                                <button class="btn btn-sm btn-white m-0" ng-click="recallModal(asset.swap_id)">Recall
                                    Swap
                                </button>
                                <button class="btn btn-sm btn-white m-0" ng-click="swapInformationModalOpen(asset.swap_id)"><i class="fa fa-info"
                                                                            aria-hidden="true"></i>
                                </button>
                            </div>
                            <div ng-hide="asset.owned == true">
                                <button class="btn btn-sm btn-white m-0" ng-click="takeModal(asset.id)">Take Swap
                                </button>
                                <button class="btn btn-sm btn-white m-0" ng-click="swapInformationModalOpen(asset.swap_id)"><i class="fa fa-info"
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
                <div class="col-md-12 p-0">
                    <div class="col-md-12 p-0">
                        <div class="float-left">
                            <div class="col-md-12">
                                <form class="form-inline">
                                    <div class="form-group">
                                        <input type="text" ng-model="searchSwapMarket" class="form-control m-0"
                                               placeholder="Search">
                                    </div>
                                </form>
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
                    <table class="table">
                        <thead>
                        <tr class="small-gray-table">
                            <th scope="col"></th>
                            <th scope="col" ng-click="sortSwapMarket('time')">Time Initiated</th>
                            <th scope="col" ng-click="sortSwapMarket('fromAmount')">Send</th>
                            <th scope="col" ng-click="sortSwapMarket('toAmount')">Receive</th>
                            <th scope="col" ng-click="sortSwapMarket('swaprate')">Swap Rate</th>
                            <th scope="col" ng-click="sortSwapMarket('minswap')">Minimum Swap</th>
                            <th scope="col" ng-click="sortSwapMarket('owner')">Owner (USAN)</th>
                            <th scope="col" class="float-right">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr ng-repeat="asset in swapsList | orderBy:sortKey:reverse |filter:searchSwapMarket | startFrom:currentPage*pageSize | limitTo:pageSize track by $index">
                            <td><i class="fa fa-globe" aria-hidden="true" ng-hide="asset.targes=='Private'"></i>
                                <i class="fa fa-lock" aria-hidden="true" ng-hide="asset.targes=='Public'"></i>
                                {{asset.targes}}</td>
                            <td>{{asset.time}}</td>
                            <td><strong>{{asset.fromAmount}}</strong> {{asset.fromAssetSymbol}}</td>
                            <td><strong>{{asset.toAmount}}</strong> {{asset.toAssetSymbol}}</td>
                            <td><strong>{{asset.swaprate}}</strong> {{asset.fromAssetSymbol}}</td>
                            <td><strong>{{asset.minswap}}</strong> {{asset.fromAssetSymbol}}</td>
                            <td>{{asset.owner}}</td>
                            <td class="float-right">
                                <div ng-hide="asset.owned == false">
                                    <button class="btn btn-sm btn-white m-0" ng-click="recallModal(asset.swap_id)">
                                        Recall
                                        Swap
                                    </button>
                                    <button class="btn btn-sm btn-white m-0" ng-click="swapInformationModalOpen(asset.swap_id)"><i class="fa fa-info"
                                                                                aria-hidden="true"></i>
                                    </button>
                                </div>
                                <div ng-hide="asset.owned == true">
                                    <button class="btn btn-sm btn-white m-0" ng-click="takeModal(asset.id)">Take Swap
                                    </button>
                                    <button class="btn btn-sm btn-white m-0" ng-click="swapInformationModalOpen(asset.swap_id)"><i class="fa fa-info"
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
                        <div class="col-sm-12 clearfix error-red pt-2 pb-2 text-white text-center mb-3"
                             ng-show="web3WalletBalance <= 0">
                            <i class="fa fa-exclamation-triangle" aria-hidden="true"></i> <span
                                    class="font-size-12 text-white">You are unable to take this swap. You do not have enough funds.</span>
                        </div>
                        <div class="row gray-bg-jumbo p-2 mb-2 mt-2">
                            <div class="col-md-6 small-gray-text">
                                Funds Available
                            </div>
                            <div class="col-md-6">
                                <div class="float-right">
                                    {{takeDataFront.fromAssetBalance}} {{takeDataFront.fromAssetSymbol}}
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
                                    <input type="text" class="form-control m-0 mt-1" ng-model="takeAmountSwap"
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
                                    {{takeDataFront.swapRate}}
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-6 p-0 pr-2">
                                <button class="btn btn-white w-100" ng-click="takeSwapModal.close()">Cancel</button>
                            </div>
                            <div class="col-md-6 p-0 pl-2">
                                <button class="btn btn-primary w-100"
                                        ng-click="takeSwap(takeDataFront.fromAssetId, takeDataFront.swapId , takeAmountSwap)"
                                        ng-disabled="takeDataFront.fromAssetBalance <= 0">Take Swap
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
                                <button class="btn btn-sm btn-primary m-0 mt-1" ng-click="showTimeLockSend = true">Set
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
                                <button class="btn btn-sm btn-primary m-0 mt-1">Set Time-lock</button>
                            </div>
                        </div>

                        <div class="col-md-12 p-0">
                            <span class="small-gray-text">Maximum Number of Swaps</span>
                            <input type="text" class="form-control m-0 mt-1 pb-2" ng-model="makeMinumumSwap"
                                   placeholder="Amount">
                        </div>
                        <div class="col-md-12 p-0">
                            <h3 class="h3-blue">Swap Rate</h3>
                            -----
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
                                <button class="btn btn-primary w-100" ng-click="makeSwapConfirmation('notend')">Review
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

                        <div class="row p-2">
                            <div class="col-md-6 small-gray-text">
                                You will be sending
                            </div>
                            <div class="col-md-6">
                                <div class="float-right">
                                    {{makeSendAmount}} {{assetToSendConfirm}}
                                </div>
                            </div>
                        </div>
                        <div class="row p-2">
                            <div class="col-md-6 small-gray-text">
                                You will be receiving
                            </div>
                            <div class="col-md-6">
                                <div class="float-right">
                                    {{makeReceiveAmount}} {{assetToReceiveConfirm}}
                                </div>
                            </div>
                        </div>
                        <div class="row p-2">
                            <div class="col-md-6 small-gray-text">
                                Swap Rate
                            </div>
                            <div class="col-md-6">
                                <div class="float-right">
                                    {{makeSendAmount}} : {{makeReceiveAmount}}
                                </div>
                            </div>
                        </div>
                        <div class="row p-2">
                            <div class="col-md-6 small-gray-text">
                                Minimum Swap Amount
                            </div>
                            <div class="col-md-6">
                                <div class="float-right">
                                    {{makeMinumumSwap}}
                                </div>
                            </div>
                        </div>
                        <div class="row p-2" ng-show="makeTarges != ''">
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
                        <h3>Success</h3>

                        <div class="row p-2">
                            <div class="col-md-6 small-gray-text">
                                Sent
                            </div>
                            <div class="col-md-6">
                                <div class="float-right">
                                    {{makeSendAmount}} {{assetToSendConfirm}}
                                </div>
                            </div>
                        </div>
                        <div class="row p-2">
                            <div class="col-md-6 small-gray-text">
                                Receiving
                            </div>
                            <div class="col-md-6">
                                <div class="float-right">
                                    {{makeReceiveAmount}} {{assetToReceiveConfirm}}
                                </div>
                            </div>
                        </div>
                        <div class="row p-2">
                            <div class="col-md-12">
                                <div class="text-center">
                                    <h1 class="text-green">
                                        <i class="fa fa-check-circle-o fa-4x" aria-hidden="true"></i>
                                    </h1>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-offset-6 float-right">
                                <button class="btn btn-sm btn-secondary" ng-click="makeSwapConfirmEndModal.close()">
                                    Close
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

                        <div class="row p-2">
                            <div class="col-md-6 small-gray-text p-0">
                                Swap ID
                            </div>
                            <div class="col-md-6 p-0">
                                <div class="float-right">
                                    <span class="fusion-text-14">{{swapInfo.ID}}</span>
                                </div>
                            </div>
                        </div>

                        <div class="row p-2">
                            <div class="col-md-6 small-gray-text p-0">
                                Time Initiated
                            </div>
                            <div class="col-md-6 p-0">
                                <div class="float-right">
                                    <span class="fusion-text-14">{{swapInfo.Time}}</span>
                                </div>
                            </div>
                        </div>

                        <div class="row p-2">
                            <div class="col-md-6 small-gray-text p-0">
                                You will be sending
                            </div>
                            <div class="col-md-6 p-0">
                                <div class="float-right">
                                    <span class="fusion-text-14">

                                        <span class="fusion-text-18">{{swapInfo.MinFromAmount}}</span>
                                        {{swapInfo.FromAssetName}} ({{swapInfo.FromAssetSymbol}}) <span class="color-Active official-fusion-badge"
                                                                                                        ng-show="swapInfo.FromAssetID === '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'"><i
                                                    class="fa fa-check-circle"></i> FSN Official</span>
                                        <br>
                                        <span class="small-gray-text">{{swapInfo.FromAssetID}}</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="row p-2">
                            <div class="col-md-6 small-gray-text p-0">
                                Sending Time
                            </div>
                            <div class="col-md-6 p-0">
                                <div class="float-right">
                                    <span class="fusion-text-14">{{swapInfo.FromStartTime}} <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
                                        {{swapInfo.FromEndTime}} </span>
                                </div>
                            </div>
                        </div>

                        <div class="row p-2">
                            <div class="col-md-6 small-gray-text p-0">
                                Swap Owner
                            </div>
                            <div class="col-md-6 p-0">
                                <div class="float-right">
                                    <span class="fusion-text-14">{{swapInfo.Owner}}</span>
                                </div>
                            </div>
                        </div>

                        <div class="row p-2">
                            <div class="col-md-6 small-gray-text p-0">
                                Maximum Number of Swaps
                            </div>
                            <div class="col-md-6 p-0">
                                <div class="float-right">
                                    <span class="fusion-text-14">{{swapInfo.SwapSize}}</span>
                                </div>
                            </div>
                        </div>

                        <div class="row p-2">
                            <div class="col-md-6 small-gray-text p-0">
                                You will be receiving
                            </div>
                            <div class="col-md-6 p-0">
                                <div class="float-right">
                                    <span class="fusion-text-14">
                                        <span class="fusion-text-18">{{swapInfo.MinToAmount}}</span>
                                        {{swapInfo.ToAssetName}} ({{swapInfo.ToAssetSymbol}}) <span class="color-Active official-fusion-badge"
                                                                                                    ng-show="swapInfo.ToAssetID === '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'"><i
                                                    class="fa fa-check-circle"></i> FSN Official</span>
                                        <br>
                                        <span class="small-gray-text">{{swapInfo.ToAssetID}}</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="row p-2">
                            <div class="col-md-6 small-gray-text p-0">
                                Receiving Time
                            </div>
                            <div class="col-md-6 p-0">
                                <div class="float-right">
                                    <span class="fusion-text-14">{{swapInfo.ToStartTime}} <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
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
                                    <span class="fusion-text-14">{{swapInfo.Targes}}</span>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-lg-offset-6 float-right">
                                <button class="btn btn-sm btn-secondary" ng-click="swapInformationModal.close()">
                                    Close
                                </button>
                            </div>
                        </div>
                    </article>
                </section>
            </section>
        </article>

</article>