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
            <div class="sendAssetBalanceAvailable w-50">
                <span class="text-fusion ng-binding">{{selectedAssetBalance}}</span><span class="small-gray-text"> available to send.</span>
            </div>
        </div>
        <div class="col-md-2 text-left">
            <button class="btn btn-sm btn-primary">Make Swap</button>
        </div>
    </div>
    <div class="col-md-12 pl-0 pr-0">
        <div class="panel panel-default">
            <div class="panel-heading">My Open Swaps</div>
            <div class="panel-body text-center">
                <span class="small-gray-text">No Open Swaps</span>
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
                        <td>Public</td>
                        <td>Today</td>
                        <td><strong>{{asset.fromAmount}}</strong> {{asset.fromAssetSymbol}}</td>
                        <td><strong>{{asset.toAmount}}</strong> {{asset.toAssetSymbol}}</td>
                        <td>{{asset.swaprate}}</td>
                        <td> Min Swap</td>
                        <td>
                            <div ng-hide="asset.owned == false">
                                <button class="btn btn-sm btn-primary" ng-click="recallSwap(asset.id)">Recall Swap</button>
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
    </div>
    <div class="col-md-12 pl-0 pr-0 ml-0">
        <div class="panel panel-default p-0 m-0">
            <div class="panel-heading">Make Swap</div>
            <div class="panel-body">
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1">@</span>
                    </div>
                    <input type="text" class="form-control" placeholder="Username" aria-label="Username"
                           aria-describedby="basic-addon1">
                </div>
                <form>
                    <div class="form-group d-flex">
                        <div class="col-md-6 pl-1 m-0">
                            <label class="small-gray-text">Swap Amount</label>
                            <input type="text" class="form-control" placeholder="Amount">
                        </div>
                        <div class="col-md-6 pr-1 m-0">
                            <label class="small-gray-text">Swap Amount</label>
                            <input type="text" class="form-control" placeholder="Amount">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="small-gray-text">Swap Amount</label>
                        <input type="text" class="form-control" placeholder="Amount">
                    </div>
                    <div class="form-group">
                        <label class="small-gray-text">Minimum Partial Swap</label>
                        <input type="text" class="form-control" placeholder="Amount">
                    </div>
                    <div class="form-check">
                        <div class="col-md-6">
                            <label class="form-check-label">
                                <input class="form-check-input" type="checkbox"> Public
                            </label>
                        </div>
                        <div class="col-md-6">
                            <label class="form-check-label">
                                <input class="form-check-input" type="checkbox"> Private
                            </label>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="small-gray-text">Wallet Address</label>
                        <input type="text" class="form-control" placeholder="XXXXX">
                    </div>
                    <div class="form-group">
                        <label class="small-gray-text">Expiration</label>
                        <select class="form-control" id="exampleFormControlSelect1">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </select>
                    </div>
                    <div class="text-center">
                        <button class="btn btn-primary">Make Swap</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</article>