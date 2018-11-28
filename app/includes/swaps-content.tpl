<article class="block p-0" ng-hide="wallet.type=='addressOnly'">
    <button class="btn btn-primary" ng-click="allSwaps()">I want to be clicked</button>
    <div class="col-md-12 p-2 swap-border">
        Swap Market / My Swaps
    </div>
    <div class="col-md-12 p-2 swap-border">
        <div class="col-md-3 text-left mr-0">
            <span class="small-gray-text">Send Assets</span>
            <div class="form-group">
                <select class="form-control" ng-model="assetToSend" ng-change="getAllAssets()">
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
            <select class="form-control" ng-model="assetToReceive" ng-change="getAllAssets()">
                <option ng-repeat="asset in assetList" value="{{asset.contractaddress}}">
                    {{asset.symbol}}
                    - {{asset.contractaddress}}
                </option>
            </select>
        </div>
    </div>
    <div class="col-md-3 pl-0 pr-0 ml-0">
        <div class="panel panel-default p-0 m-0">
            <div class="panel-heading">Make Swap</div>
            <div class="panel-body">
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
    <div class="col-md-9 pl-0 pr-0">
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
                    <tbody>
                    <tr ng-repeat="asset in swapsList track by $index">
                        <td>{{asset.id}}</td>
                        <td>{{asset.fromAssetId}}</td>
                        <td>{{asset.fromAmount}}</td>
                        <td>{{asset.toAssetId}}</td>
                        <td>{{asset.toAmount}}</td>
                        <td>{{asset.owner}}</td>
                        <td>{{asset.owned}}</td>
                    </tr>
                    </tbody>
                </table>            </div>
        </div>
    </div>
</article>