<!-- Content -->

<div class="col-sm-3">
    <wallet-balance-drtv></wallet-balance-drtv>
</div>

<div class="col-sm-9">
    <!-- FUSION Assets -->
    <div class="row">
        <div class="col-md-6">
            <h3>Assets</h3>
        </div>
        <div class="col-md-6">
            <div class="float-right">
                <a class="btn btn-sm btn-secondary"
                   data-toggle="modal"
                   data-target="#createAsset"
                   ng-click="createAssetModal()"
                >
                    + Create Asset
                </a>
                <a class="btn btn-sm btn-primary"
                   data-toggle="modal"
                   data-target="#sendAsset"
                   ng-click="sendAssetModalOpen()"
                >
                    Send Assets
                </a></div>
        </div>
    </div>
    <article class="block" ng-hide="wallet.type=='addressOnly'">
        <div class="col-md-12 p-0">
            <nav class="nav-container">
                <div class="nav-scroll">
                    <ul class="nav-inner">
                        <li class="nav-item Swaps" ng-class="{active: showAllAssets==true}">
                            <a class="ng-scope" ng-click="showAllAssets = true ; showTimeLockedAssets = false">
                                All Assets <span ng-model="assetListOwns">({{assetListOwns.length}})</span></a>
                        </li>
                        <li class="nav-item Swaps" ng-class="{active: showTimeLockedAssets==true}">
                            <a class="ng-scope" ng-click="showAllAssets = false ; showTimeLockedAssets = true">
                                Timelocked Assets <span ng-model="timeLockList">({{timeLockList.length}})</span></a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
        <section class="row form-group" ng-show="showAllAssets === true">
            <div class="col-sm-12 clearfix">
                <p class="p-2">The “All Assets” tab gives you an overview of assets in your fusion wallet Assets can be
                    created, sent, timelocked or swapped.</p>
            </div>
            <div class="col-sm-12 clearfix" ng-hide="assetListOwns != ''">
                <h4 class="text-fusion">Loading assets...</h4>
            </div>

            <div class="col-sm-12 clearfix" data-ng-init="getAllFsnAssets()">
                <div class="table-responsive">
                    <table class="table">
                        <thead>
                        <tr class="small-gray-text text-left">
                            <th scope="col">Asset Name</th>
                            <th scope="col">Asset Info</th>
                            <th scope="col">Available</th>
                            <th scope="col">Total Quantity</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr ng-repeat="asset in assetListOwns track by $index">
                            <td>{{asset.name}} ({{asset.symbol}}) <br> <span
                                        class="small-gray-text">ID: {{asset.contractaddress}}</span>
                            </td>
                            <td><span class="badge badge-secondary">{{asset.owner}}</span></td>
                            <td>{{asset.balance}} <br> <span class="small-gray-text"></span></td>
                            <td>{{asset.total}}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
        <section class="row form-group" ng-show="showTimeLockedAssets === true">
            <div class="col-sm-12 clearfix">
                <p class="p-2">The Timelocked Assets tab gives you more details on timelocks, their length, and their
                    type.</p>
            </div>


            <div class="col-sm-12 clearfix text-center" ng-hide="timeLockList != ''">
                <h4 class="small-gray-text">No timelocked assets</h4>
            </div>

            <div class="col-sm-12 clearfix" ng-show="timeLockList != ''" data-ng-init="getTimeLockAssets()">
                <div class="table-responsive">
                    <table class="table">
                        <thead>
                        <tr class="small-gray-text text-left">
                            <th scope="col">Asset Name</th>
                            <th class="col">Timelock Type</th>
                            <th scope="col">Timelock Period</th>
                            <th scope="col">Quantity</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr ng-repeat="asset in timeLockList track by $index">
                            <td> {{asset.name}} <br>
                                <span class="small-gray-text"> ID: {{asset.asset}}  </span></td>
                            <td><span class="badge badge-secondary">Time Locked</span></td>
                            <td>
                        <span class="small-gray-text">
                                From
                            </span> {{asset.startTime}} <br>
                                <span class="small-gray-text">
                                Until
                            </span> {{asset.endTime}}</td>
                            <td>{{asset.value}}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    </article>

    <!-- ERC20 Assets -->
    <h3>Legacy (ERC20) Tokens</h3>

    <article class="block" ng-hide="wallet.type=='addressOnly'">
        <section class="row form-group">
            <div class="col-sm-12 clearfix">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus a lectus odio. Pellentesque sed
                    nisl et leo congue rutrum. Sed eget odio ac est facilisis mollis. Curabitur pretium elementum
                    luctus.</p>
            </div>
            <div class="col-sm-12 clearfix">
                Assets will be loading here
            </div>
        </section>
    </article>
</div>

<div class="col-sm-9">
    <!-- If unlocked with address only -->
    <article class="block" ng-show="wallet.type=='addressOnly'">
        <div class="row form-group">
            <h4 translate="SEND_ViewOnly">
                You cannot send with only your address. You must use one of the other options to unlock your wallet in
                order to send.
            </h4>
            <h5 translate="X_HelpfulLinks">
                Helpful Links &amp; FAQs
            </h5>
            <ul>
                <li class="u__protip">
                    <a href="https://kb.myetherwallet.com/getting-started/accessing-your-new-eth-wallet.html"
                       target="_blank"
                       rel="noopener noreferrer"
                       translate="X_HelpfulLinks_1">
                        How to Access your Wallet
                    </a>
                </li>
                <li class="u__protip">
                    <a href="https://kb.myetherwallet.com/private-keys-passwords/lost-eth-private-key.html"
                       target="_blank"
                       rel="noopener noreferrer"
                       translate="X_HelpfulLinks_2">
                        I lost my private key
                    </a>
                </li>
                <li class="u__protip">
                    <a href="https://kb.myetherwallet.com/private-keys-passwords/accessing-different-address-same-private-key-ether.html"
                       target="_blank"
                       rel="noopener noreferrer"
                       translate="X_HelpfulLinks_3">
                        My private key opens a different address
                    </a>
                </li>
                <li class="u__protip">
                    <a href="https://kb.myetherwallet.com/migration/"
                       target="_blank"
                       rel="noopener noreferrer"
                       translate="X_HelpfulLinks_4">
                        Migrating to/from MyEtherWallet
                    </a>
                </li>
            </ul>
        </div>
    </article>


    <article class="modal fade" id="txModal" tabindex="-1">
        <section class="modal-dialog">
            <section class="modal-content">
                <article class="block" ng-hide="wallet.type=='addressOnly'">
                    <!-- If unlocked with PK -->
                    <article class="block" ng-hide="wallet.type=='addressOnly'">

                        <h3>Create Transaction</h3>
                        <!-- To Address -->
                        <div class="row form-group">
                            <address-field placeholder="0xDECAF9CD2367cdbb726E904cD6397eDFcAe6068D"
                                           var-name="tx.to"></address-field>
                        </div>


                        <!-- Amount to Send -->
                        <section class="row form-group">

                            <div class="col-sm-11">
                                <label translate="SEND_amount">
                                    Amount to Send:
                                </label>
                            </div>

                            <div class="col-sm-11">

                                <div class="input-group">

                                    <input type="text"
                                           class="form-control"
                                           placeholder="{{ 'SEND_amount_short' | translate }}"
                                           ng-model="tx.value"
                                           ng-disabled="tx.readOnly || checkTxReadOnly"
                                           ng-class="Validator.isPositiveNumber(tx.value) ? 'is-valid' : 'is-invalid'"/>

                                    <div class="input-group-btn">

                                        <a style="min-width: 170px"
                                           class="btn btn-default dropdown-toggle"
                                           class="dropdown-toggle"
                                           ng-click="dropdownAmount = !dropdownAmount"
                                           ng-class="dropdownEnabled ? '' : 'disabled'">
                                            <strong>
                                                {{unitReadable}}
                                                <i class="caret"></i>
                                            </strong>
                                        </a>

                                        <!-- Amount to Send - Dropdown -->
                                        <ul class="dropdown-menu dropdown-menu-right"
                                            ng-show="dropdownAmount && !tx.readOnly">
                                            <li>
                                                <a ng-class="{true:'active'}[tx.sendMode=='ether']"
                                                   ng-click="setSendMode('ether')">
                                                    {{ajaxReq.type}}
                                                </a>
                                            </li>
                                            <li ng-repeat="token in wallet.tokenObjs track by $index"
                                                ng-show="token.balance!=0 &&
                           token.balance!='loading' &&
                           token.balance!='Click to Load' &&
                           token.balance.trim()!='Not a valid ERC-20 token' ||
                           token.type!=='default'">
                                                <a ng-class="{true:'active'}[unitReadable == token.getSymbol()]"
                                                   ng-click="setSendMode('token', $index, token.getSymbol())">
                                                    {{token.getSymbol()}}
                                                </a>
                                            </li>
                                        </ul>

                                    </div>

                                </div>

                            </div>

                            <!-- Amount to Send - Load Token Balances
                            <a class="col-sm-1 send__load-tokens"
                               title="Load Token Balances"
                               ng-click="wallet.setTokens(); globalService.tokensLoaded=true"
                               ng-hide="globalService.tokensLoaded">
                                <img src="images/icon-load-tokens.svg" width="16" height="16" />
                                <p translate="SEND_LoadTokens">
                                  Load Tokens
                                </p>
                            </a>
                            -->

                            <!-- Amount to Send - Transfer Entire Balance -->
                            <p class="col-xs-12" ng-hide="tx.readOnly">
                                <a ng-click="transferAllBalance()">
          <span class="strong" translate="SEND_TransferTotal">
            Send Entire Balance
          </span>
                                </a>
                            </p>

                        </section>


                        <!-- Gas Limit -->
                        <section class="row form-group">
                            <div class="col-sm-11 clearfix">
                                <a class="account-help-icon"
                                   href="https://kb.myetherwallet.com/gas/what-is-gas-ethereum.html"
                                   target="_blank"
                                   rel="noopener noreferrer">
                                    <img src="images/icon-help.svg" class="help-icon"/>
                                    <p class="account-help-text" translate="GAS_LIMIT_Desc"></p>
                                </a>
                                <label translate="TRANS_gas">
                                    Gas Limit:
                                </label>
                                <input type="text"
                                       class="form-control"
                                       placeholder="21000"
                                       ng-model="tx.gasLimit"
                                       ng-change="gasLimitChanged=true"
                                       ng-disabled="tx.readOnly || checkTxReadOnly"
                                       ng-class="Validator.isPositiveNumber(tx.gasLimit) ? 'is-valid' : 'is-invalid'"/>
                            </div>
                        </section>

                        <!-- Advanced Option Panel -->
                        <a ng-click="showAdvance=true"
                           ng-show='globalService.currentTab==globalService.tabs.sendTransaction.id || tx.data != ""'>
                            <p class="strong" translate="TRANS_advanced">
                                + Advanced: Add Data
                            </p>
                        </a>


                        <div ng-show="showAdvance || checkTxPage">

                            <!-- Data -->
                            <section class="row form-group">
                                <div class="col-sm-11 clearfix" ng-show="tx.sendMode=='ether'">
          <span class="account-help-icon">
            <img src="images/icon-help.svg" class="help-icon"/>
            <p class="account-help-text" translate="OFFLINE_Step2_Label_6b">
              This is optional.
            </p>
          </span>

                                    <label translate="TRANS_data"> Data: </label>

                                    <input type="text"
                                           class="form-control"
                                           placeholder="0x6d79657468657277616c6c65742e636f6d20697320746865206265737421"
                                           ng-model="tx.data"
                                           ng-disabled="tx.readOnly || checkTxReadOnly"
                                           ng-class="Validator.isValidHex(tx.data) ? 'is-valid' : 'is-invalid'"/>

                                </div>
                            </section>


                            <!-- Nonce -->
                            <section class="row form-group" ng-show="checkTxPage">
                                <div class="col-sm-11 clearfix">

                                    <a class="account-help-icon"
                                       href="https://kb.myetherwallet.com/transactions/what-is-nonce.html"
                                       target="_blank"
                                       rel="noopener noreferrer">
                                        <img src="images/icon-help.svg" class="help-icon"/>
                                        <p class="account-help-text" translate="NONCE_Desc"></p>
                                    </a>

                                    <label translate="OFFLINE_Step2_Label_5">
                                        Nonce
                                    </label>
                                    <input type="text"
                                           class="form-control"
                                           placeholder="2"
                                           ng-model="tx.nonce"
                                           ng-disabled="checkTxReadOnly"
                                           ng-class="Validator.isPositiveNumber(tx.nonce) ? 'is-valid' : 'is-invalid'"/>

                                </div>
                            </section>


                            <!-- Gas Price -->
                            <section class="row form-group" ng-show="checkTxPage">
                                <div class="col-sm-11 clearfix">
                                    <a class="account-help-icon"
                                       href="https://kb.myetherwallet.com/gas/what-is-gas-ethereum.html"
                                       target="_blank"
                                       rel="noopener noreferrer">
                                        <img src="images/icon-help.svg" class="help-icon"/>
                                        <p class="account-help-text" translate="GAS_PRICE_Desc"></p>
                                    </a>

                                    <label translate="OFFLINE_Step2_Label_3">
                                        Gas Price:
                                    </label>
                                    <input type="text"
                                           class="form-control"
                                           placeholder="50"
                                           ng-model="tx.gasPrice"
                                           ng-disabled="checkTxReadOnly"
                                           ng-class="Validator.isPositiveNumber(tx.gasPrice) ? 'is-valid' : 'is-invalid'"/>

                                </div>
                            </section>

                        </div>
                        <!-- / Advanced Option Panel -->


                        <div class="clearfix form-group">
                            <div class="well" ng-show="wallet!=null && customGasMsg!=''">
                                <p>
          <span translate="SEND_CustomAddrMsg">
            A message regarding
          </span>
                                    {{tx.to}}
                                    <br/>
                                    <strong>
                                        {{customGasMsg}}
                                    </strong>
                                </p>
                            </div>
                        </div>


                        <div class="row form-group">
                            <div class="col-xs-12 clearfix">
                                <a class="btn btn-info btn-block"
                                   ng-click="generateTx()"
                                   translate="SEND_generate">
                                    Generate Transaction
                                </a>
                            </div>
                        </div>

                        <div class="row form-group" ng-show="rootScopeShowRawTx">

                            <div class="col-sm-6">
                                <label translate="SEND_raw">
                                    Raw Transaction
                                </label>
                                <textarea class="form-control" rows="4" readonly>{{rawTx}}</textarea>
                            </div>

                            <div class="col-sm-6">
                                <label translate="SEND_signed">
                                    Signed Transaction
                                </label>
                                <textarea class="form-control" rows="4" readonly>{{signedTx}}</textarea>
                            </div>

                        </div>

                        <div class="clearfix form-group" ng-show="rootScopeShowRawTx">
                            <a class="btn btn-primary btn-block col-sm-11"
                               data-toggle="modal"
                               data-target="#sendTransaction"
                               translate="SEND_trans"
                               ng-click="parseSignedTx( signedTx )">
                                Send Transaction
                            </a>
                        </div>


                    </article>
                </article>
            </section>
        </section>
    </article>

</div>
<article class="modal fade" id="sendAsset" tabindex="-1">
    <section class="modal-dialog send-asset-dialog">
        <section class="modal-content">
            <article class="block" ng-hide="wallet.type=='addressOnly'">
                <div class="col-md-12 p-0">
                    <div class="float-right">
                                  <span class="gray-text" ng-click="sendAssetModalOpen.close();">                    <i
                                              class="fa fa-times"
                                              aria-hidden="true"></i>
</span>
                    </div>
                </div>

                <h3>Send Asset</h3>

                <label>
                    Select Send Type:
                </label>
                <div class="row">
                    <div class="col-md-6">
                        <div class="col-md-1 mt-3">
                            <input type="radio" class="form-check-input" ng-model="transactionType"
                                   value="standard" checked>
                        </div>
                        <div class="col-md-10">
                            <h4 class="text-fusion">Standard Send</h4>
                            Standard sending an asset will give the recipient full and permanent access to
                            the asset.
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="col-md-1 mt-3">
                            <input type="radio" class="form-check-input" ng-model="transactionType"
                                   value="timed">
                        </div>
                        <div class="col-md-10">
                            <h4 class="text-fusion">Timed Send</h4>
                            Time Sending an asset will give the recipient the asset for a time period you
                            determine.
                        </div>
                    </div>
                </div>
                <div ng-show="transactionType == 'standard' || transactionType == 'timed'">
                    <section class="row form-group">
                        <div class="col-sm-12 clearfix">
                        </div>
                        <div class="col-sm-12 clearfix">
                            <label>
                                To Address:
                            </label>
                            <input type="text"
                                   class="form-control"
                                   ng-model="sendAsset.toAddress"
                                   placeholder=""/>
                        </div>
                        <div class="col-sm-12 clearfix">
                            <label>
                                Select Asset:
                            </label>
                            <select class="form-control" ng-model="assetToSend" ng-change="getAssetBalance()">
                                <option ng-repeat="asset in assetListOwns" value="{{asset.contractaddress}}">
                                    {{asset.symbol}}
                                    - {{asset.contractaddress}}
                                </option>
                            </select>
                            <div class="sendAssetBalanceAvailable" ng-hide="selectedAssetBalance == ''">
                                <span class="text-fusion">{{selectedAssetBalance}}</span> <span class="small-gray-text">available to send.</span>
                            </div>

                            <label>
                                Amount To Send:
                            </label>
                            <input type="text"
                                   class="form-control"
                                   ng-model="sendAsset.amountToSend"
                                   placeholder=""/>
                            <a class="small-gray-text" ng-click="setMaxBalance()" ng-hide="selectedAssetBalance == ''">Send
                                Max</a>
                        </div>
                        <div ng-hide="transactionType =='standard'">
                            <div class="col-md-6">
                                <label>
                                    From
                                </label>
                                <br>
                                <input class="form-control" type="date" ng-model="sendAsset.fromTime">
                            </div>
                            <div class="col-md-6">
                                <label>
                                    Till
                                </label>
                                <br>
                                <input class="form-control" type="date" ng-model="sendAsset.tillTime">
                            </div>
                        </div>
                        <div class="col-sm-12 clearfix">
                            <div class="col-lg-12 col-sm-12 col-xs-12 alert alert-success" ng-show="successMessagebool">
                                Congratulations! Your transaction was emitted and is now pending!

                                <strong>{{successHash}}</strong>
                            </div>
                        </div>
                    </section>
                    <div class="row form-group">
                        <div class="col-xs-12 clearfix">
                            <a class="btn btn-info btn-block"
                               ng-click="sendAsset()">
                                Send Asset
                            </a>
                        </div>
                    </div>
                </div>
            </article>

        </section>
    </section>
</article>

<article class="modal fade" id="createAsset" tabindex="-1">
    <section class="modal-dialog">
        <section class="modal-content">
            <article class="block" ng-hide="wallet.type=='addressOnly'">
                <div class="col-md-12 p-0">
                    <div class="float-right">
                                  <span class="gray-text" ng-click="createAssetModal.close();">                    <i
                                              class="fa fa-times"
                                              aria-hidden="true"></i>
</span>
                    </div>
                </div>
                <h3 class="h3-title">Create Asset</h3>
                <p>Here is a short descriptor about any restrictions or any supplemental information We can figure out
                    what this will say together. </p>
                <section class="row form-group">
                    <div class="col-sm-12 clearfix">
                        <label>
                            Asset Name:
                        </label>
                        <input type="text"
                               class="form-control"
                               ng-model="assetCreate.assetName"
                               placeholder=""/>
                    </div>
                    <div class="col-sm-6">
                        <label>
                            Asset Symbol:
                        </label>
                        <input type="text"
                               class="form-control"
                               ng-model="assetCreate.assetSymbol"
                               placeholder=""/>
                    </div>
                    <div class="col-sm-6">
                        <label>
                            Decimals:
                        </label>
                        <input type="text"
                               class="form-control"
                               ng-model="assetCreate.decimals"
                               placeholder=""/>
                    </div>
                    <div class="col-sm-12 clearfix">
                        <label>
                            Total Supply:
                        </label>
                        <input type="text"
                               class="form-control"
                               ng-model="assetCreate.totalSupply"
                               placeholder=""/>
                    </div>
                </section>

                <div class="row form-group">
                    <div class="col-xs-12 clearfix">
                        <a class="btn btn-info btn-block"
                           ng-click="createAsset()">
                            Generate Asset
                        </a>
                    </div>
                </div>
                <div class="col-lg-12 col-sm-12 col-xs-12 alert alert-success" ng-show="assetCreate.assetHash != ''">
                    Congratulations! {{assetCreate.assetName}} was created and is now pending! <br>
                    ID: <strong>{{assetCreate.assetHash}}</strong>
                </div>

                <div class="col-lg-12 col-sm-12 col-xs-12 alert alert-danger" ng-show="assetCreate.errorMessage != ''">
                    <strong>Error!</strong> {{assetCreate.errorMessage}} <br>
                    Please, review and try again!
                </div>
            </article>

        </section>
    </section>
</article>


<div class="col-sm-9">

    <!-- Generate Asset -->

</div>
<!-- / Content -->


<!-- / Sidebar -->
