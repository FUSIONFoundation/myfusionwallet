<article class="block p-0" ng-hide="wallet.type=='addressOnly'">
    <button class="btn btn-primary" ng-click="allSwaps()">I want to be clicked</button>
    <div class="col-md-12 p-2 swap-border">
        Swap Market / My Swaps
    </div>
    <div class="col-md-12 p-2 swap-border">
        <div class="col-md-3 text-left mr-0">
            <span class="small-gray-text">Send Assets</span>
            <div class="form-group">
                <select class="form-control" ng-model="assetToSend" ng-change="getAssetBalance()">
                    <option ng-repeat="asset in assetListOwned" value="{{asset.contractaddress}}">
                        {{asset.symbol}}
                        - {{asset.contractaddress}}
                    </option>
                </select>
            </div>
        </div>
        <div class="col-md-1 text-center justify-content-center">
            <i class="fa fa-exchange" aria-hidden="true"></i>
        </div>
        <div class="col-md-3 text-left">
            <span class="small-gray-text">Receive Asset</span>
            <select class="form-control" ng-model="assetToReceive">
                <option ng-repeat="asset in assetList" value="{{asset.contractaddress}}">
                    {{asset.symbol}}
                    - {{asset.contractaddress}}
                </option>
            </select>
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
        <div class="panel panel-default">
            <div class="panel-heading">My Open Swaps</div>
            <div class="panel-body text-center">
                <div class="text-center" ng-hide="mySwapList.length != 0"><span class="small-gray-text">No Open Swaps</span></div>
                <table class="table" ng-show="mySwapList.length != 0">
                    <thead>
                    <tr class="small-gray-text">
                        <th scope="col"></th>
                        <th scope="col">Time Initiated</th>
                        <th scope="col">Send</th>
                        <th scope="col">Receive</th>
                        <th scope="col">Swap Rate</th>
                        <th scope="col">Minimum Swap</th>
                        <th scope="col">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr class="text-center" ng-repeat="asset in mySwapList track by $index">
                        <td><i class="fa fa-globe" aria-hidden="true"></i> Public</td>
                        <td>{{asset.time}}</td>
                        <td><strong>{{asset.fromAmount}}</strong> {{asset.fromAssetSymbol}}</td>
                        <td><strong>{{asset.toAmount}}</strong> {{asset.toAssetSymbol}}</td>
                        <td>{{asset.swaprate}}</td>
                        <td> {{asset.minswap}}</td>
                        <td>
                            <div ng-hide="asset.owned == false">
                                <button class="btn btn-sm btn-primary" ng-click="recallModal(asset.id)">Recall Swap
                                </button>
                            </div>
                            <div ng-hide="asset.owned == true">
                                <button class="btn btn-sm btn-primary" ng-click="takeSwap(asset.id)">Take Swap</button>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="panel panel-default">
            <div class="panel-heading">Swap Market</div>
            <div class="panel-body">
                <table class="table">
                    <thead>
                    <tr class="small-gray-text">
                        <th scope="col"></th>
                        <th scope="col">Time Initiated</th>
                        <th scope="col">Send</th>
                        <th scope="col">Receive</th>
                        <th scope="col">Swap Rate</th>
                        <th scope="col">Minimum Swap</th>
                        <th scope="col">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr class="text-center" ng-repeat="asset in swapsList track by $index">
                        <td><i class="fa fa-globe" aria-hidden="true"></i> Public</td>
                        <td>{{asset.time}}</td>
                        <td><strong>{{asset.fromAmount}}</strong> {{asset.fromAssetSymbol}}</td>
                        <td><strong>{{asset.toAmount}}</strong> {{asset.toAssetSymbol}}</td>
                        <td>{{asset.swaprate}}</td>
                        <td> {{asset.minswap}}</td>
                        <td>
                            <div ng-hide="asset.owned == false">
                                <button class="btn btn-sm btn-primary" ng-click="recallModal(asset.id)">Recall Swap
                                </button>
                            </div>
                            <div ng-hide="asset.owned == true">
                                <button class="btn btn-sm btn-primary" ng-click="takeModal(asset.id)">Take Swap</button>
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
                    <h3>Recall Asset Confirmation</h3>

                    <p>Are you sure you want to recall this swap? It will be removed from the swap market the next
                        block.</p>

                    <div class="row">
                        <div class="col-lg-offset-6 float-right">
                            <button class="btn btn-sm btn-primary" ng-click="recallSwap(recallAssetId)"
                                    ng-disabled="swapRecallSuccess">Confirm
                            </button>
                            <button class="btn btn-sm btn-secondary" ng-click="recallAssetModal.close()">Cancel</button>
                        </div>
                    </div>
                    <div class="col-sm-12 clearfix">
                        <div class="col-lg-12 col-sm-12 col-xs-12 alert alert-success" ng-show="swapRecallSuccess">
                            Success! Your swap was recalled and will be confirmed next block!

                            <strong>{{successHash}}</strong>
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
                    <h3>Take Swap</h3>
                    <div class="row">
                        <div class="col-md-6 small-gray-text">
                            Funds Available
                        </div>
                        <div class="col-md-6">
                            <div class="float-right">
                                {{takeDataFront.fromAssetBalance}} {{takeDataFront.fromAssetSymbol}}
                            </div>
                        </div>
                    </div>
                    <hr>
                    <div class="row">
                        <div class="col-md-6 small-gray-text">
                            Send
                        </div>
                        <div class="col-md-6">
                            <div class="float-right">
                                <span class="mr-1"><span class="small-gray-text">Min Amount</span> {{takeDataFront.fromAssetMin}} {{takeDataFront.fromAssetSymbol}}</span>
                                <span class="ml-1"><span class="small-gray-text">Max Amount</span> {{takeDataFront.maxAmount}}  {{takeDataFront.fromAssetSymbol}}</span>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="float-right">
                                <input type="text" class="form-control m-0 mt-1" ng-model="takeAmountSwap" ng-change="setReceive()" placeholder="Amount">
                                <a class="small-gray-text" ng-click="setMaxTakeSwap()">Max Amount</a>
                            </div>
                        </div>
                    </div>
                    <hr>
                    <div class="row">
                        <div class="col-md-6 small-gray-text">
                            Receive
                        </div>
                        <div class="col-md-6">
                            <div class="float-right">
                                {{receiveTokens}} {{takeDataFront.toAssetSymbol}}
                            </div>
                        </div>
                    </div>
                    <hr>
                    <div class="row">
                        <div class="col-md-6 small-gray-text">
                            Swap Rate
                        </div>
                        <div class="col-md-6">
                            <div class="float-right">
                                {{takeDataFront.swapRate}}
                            </div>
                        </div>
                    </div>
                    <hr>
                    <div class="row">
                        <div class="col-lg-offset-6 float-right">
                            <button class="btn btn-secondary" ng-click="takeSwapModal.close()">Cancel</button>
                            <button class="btn btn-primary" ng-click="takeSwap(takeDataFront.fromAssetId, takeDataFront.swapId , takeAmountSwap)"
                                    ng-disabled="takeDataFront.fromAssetBalance <= 0">Take Swap
                            </button>
                        </div>
                    </div>
                    <div class="col-sm-12 clearfix">
                        <div class="col-lg-12 col-sm-12 col-xs-12 text-center"
                             ng-show="takeDataFront.fromAssetBalance <= 0">
                            <hr>
                            <i class="fa fa-exclamation" aria-hidden="true"></i> <span class="small-gray-text">You are unable to take this swap. You do not have enough funds.</span>
                        </div>
                    </div>
                    <div class="col-sm-12 clearfix">
                        <div class="col-lg-12 col-sm-12 col-xs-12 alert alert-success" ng-show="swapRecallSuccess">
                            Success! Your swap was recalled and will be confirmed next block!

                            <strong>{{successHash}}</strong>
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
                    <h3>Make Swap</h3>
                    <div class="col-md-12 text-left p-0">
                        <span class="small-gray-text">Send Asset</span>
                        <div class="form-group">
                            <select class="form-control" ng-model="assetToSend" ng-change="getAssetBalance()">
                                <option ng-repeat="asset in assetListOwned" value="{{asset.contractaddress}}">
                                    {{asset.symbol}}
                                    - {{asset.contractaddress}}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-12 p-0 text-left">
                        <span class="small-gray-text">Receive Asset</span>
                        <select class="form-control" ng-model="assetToReceive">
                            <option ng-repeat="asset in assetList" value="{{asset.contractaddress}}">
                                {{asset.symbol}}
                                - {{asset.contractaddress}}
                            </option>
                        </select>
                    </div>
                    <h3>Enter a Swap Rate</h3>

                    <h3>Enter Swap Details</h3>

                    <div class="col-md-12 p-0">
                        <div class="sendAssetBalanceAvailable w-50" ng-show="selectedAssetBalance >= 0">
                            <span class="text-fusion ng-binding">{{selectedAssetBalance}}</span><span class="small-gray-text"> available.</span>
                        </div>
                    </div>

                    <div class="col-md-12 p-0">
                        <span class="small-gray-text">Send Amount</span>
                        <input type="text" class="form-control m-0 mt-1" ng-model="makeSendAmount" placeholder="Amount">
                    </div>
                    <div class="col-md-12 p-0">
                        <span class="small-gray-text">Receive Amount</span>
                        <input type="text" class="form-control m-0 mt-1" ng-model="makeReceiveAmount" placeholder="Amount">
                    </div>

                    <div class="col-md-12 p-0">
                        <span class="small-gray-text">Minimum Swap Amount</span>
                        <input type="text" class="form-control m-0 mt-1" ng-model="makeMinumumSwap" placeholder="Amount">
                    </div>
                    <h3>Set Access</h3>
                    <div class="col-md-12 p-0">
                        <span class="small-gray-text">Seperate addresses with commas.</span>
                        <input type="text" class="form-control m-0 mt-1" ng-model="makePrivateAddresses" placeholder="Amount">
                    </div>



                    <div class="row">
                        <div class="col-lg-offset-6 float-right">
                            <button class="btn btn-sm btn-secondary" ng-click="makeSwapModal.close()">Cancel
                            </button>
                            <button class="btn btn-sm btn-primary" ng-click="makeSwap()">Review Make Swap</button>
                        </div>
                    </div>
                    <div class="col-sm-12 clearfix">
                        <div class="col-lg-12 col-sm-12 col-xs-12 alert alert-success" ng-show="swapRecallSuccess">
                            Success! Your swap was recalled and will be confirmed next block!

                            <strong>{{successHash}}</strong>
                        </div>
                    </div>
                </article>
            </section>
        </section>
    </article>

</article>