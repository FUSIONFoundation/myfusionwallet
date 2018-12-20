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
                   ng-click="createAssetInit()"
                >
                    <i class="fa fa-plus"></i> Create Asset
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
            <nav class="nav-container" style="background-color: white!important;">
                <div class="nav-scroll">
                    <ul class="nav-inner">
                        <li class="nav-item Swaps" ng-class="{active: showAllAssets==true}">
                            <a class="ng-scope" ng-click="showAllAssets = true ; showTimeLockedAssets = false">
                                All Assets <span ng-model="assetListOwns">({{assetListOwns.length}})</span></a>
                        </li>
                        <li class="nav-item Swaps" ng-class="{active: showTimeLockedAssets==true}">
                            <a class="ng-scope" ng-click="showAllAssets = false ; showTimeLockedAssets = true">
                                Time-locked Assets <span ng-model="timeLockList">({{timeLockList.length}})</span></a>
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

            <div class="col-sm-12 clearfix text-center" ng-show="showNoAssets">
                <h4 class="small-gray-text">No available assets</h4>
            </div>

            <div class="col-sm-12 clearfix text-center" ng-show="assetListLoading">
                <h4 class="text-center">
                    <i class="fa fa-spinner" aria-hidden="true"></i>
                </h4>
                <h4 class="small-gray-text text-center">Loading assets</h4>

            </div>


            <div class="col-sm-12 clearfix" data-ng-init="getAllFsnAssets()">
                <div class="table-responsive" ng-show="assetListOwns != ''">
                    <table class="table">
                        <thead>
                        <tr class="small-gray-text text-left">
                            <th scope="col">Asset Name</th>
                            <th scope="col">Asset Info</th>
                            <th scope="col" class="text-right">Available</th>
                            <th scope="col" class="text-right">Total Quantity</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr ng-repeat="asset in assetListOwns track by $index">
                            <td>{{asset.name}} ({{asset.symbol}}) <span class="color-Active official-fusion-badge"
                                                                        ng-show="asset.contractaddress === '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'"><i
                                            class="fa fa-check-circle"></i> FSN Official</span> <br>
                                <div class="max-char">
                                    <span class="small-gray-text" data-toggle="tooltip" data-placement="top"
                                          title="{{asset.contractaddress}}">ID: {{asset.contractaddress}}</span>
                                </div>
                            </td>
                            <td><span class="badge badge-secondary">{{asset.owner}}</span></td>
                            <td class="text-right">{{asset.balance}} <br> <span class="small-gray-text"></span></td>
                            <td class="text-right">{{asset.total}}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
        <section class="row form-group" ng-show="showTimeLockedAssets === true">
            <div class="col-sm-12 clearfix">
                <p class="p-2">The Time-locked Assets tab gives you more details on timelocks, their length, and their
                    type.</p>
            </div>


            <div class="col-sm-12 clearfix text-center gray-bg p-2" ng-hide="timeLockList != ''">
                <h4 class="small-gray-text">No time-locked assets</h4>
            </div>

            <div class="col-sm-12 clearfix" ng-show="timeLockList != ''" data-ng-init="getTimeLockAssets()">
                <div class="table-responsive">
                    <table class="table">
                        <thead>
                        <tr class="small-gray-text text-left">
                            <th scope="col">Status</th>
                            <th scope="col">Asset Name</th>
                            <th scope="col">Time-lock Period</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr ng-repeat="asset in timeLockList track by $index">
                            <td class="color-{{asset.status}}">● {{asset.status}}</td>
                            <td> {{asset.name}} ({{asset.symbol}}) <span class="color-Active official-fusion-badge"
                                                                         ng-show="asset.asset === '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'"><i
                                            class="fa fa-check-circle"></i> FSN Official</span>
                                <br>
                                <div class="max-char"><span class="small-gray-text" data-toggle="tooltip"
                                                            data-placement="top"
                                                            title="{{asset.asset}}">ID: {{asset.asset}}</span></div>
                            </td>
                            <td><span class="small-gray-text">From</span> {{asset.startTime}} <br><span
                                        class="small-gray-text">Until </span> {{asset.endTime}}</td>
                            <td>{{asset.value}}</td>
                            <td class="text-right">
                                <button class="btn-sm btn-white action-button p-0" ng-show="asset.status === 'Available'"><img
                                            src="images/group-5.svg" class="Group-6 m-0"></button>
                                <button class="btn-sm btn-white action-button p-0" ng-hide="asset.status === 'Expired'">Send</button>
                                <button class="btn-sm btn-white action-button p-0" ng-show="asset.status === 'Expired'">Remove</button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
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
                                  <span class="gray-text" ng-click="sendAssetModal.close();">                    <i
                                              class="fa fa-times"
                                              aria-hidden="true"></i>
</span>
                    </div>
                </div>

                <h3>Send Asset</h3>

                <label>
                    Select Send Type:
                </label>
                <div class="row col-md-12 mb-2">
                    <div class="col-md-6" ng-class="{'select-active': transactionType == 'standard'}">
                        <div class="col-md-1 mt-3 p-2">
                            <input type="radio" class="form-check-input" ng-model="transactionType"
                                   value="standard" checked>
                        </div>
                        <div class="col-md-10 p-2">
                            <h4 class="text-fusion">Send Asset</h4>
                            <p class="small-gray-text">Sending an asset will give the recipient full and permanent
                                access of the asset.</p>
                        </div>
                    </div>
                    <div class="col-md-6" ng-class="{'select-active': transactionType == 'timed'}">
                        <div class="col-md-1 mt-3 p-2">
                            <input type="radio" class="form-check-input" ng-model="transactionType"
                                   value="timed">
                        </div>
                        <div class="col-md-10 p-2">
                            <h4 class="text-fusion">Time-Lock Asset</h4>
                            <p class="small-gray-text">Time-locking an asset will give the recipient the asset for a
                                time period you specify.</p>
                        </div>
                    </div>
                </div>
                <div ng-show="transactionType == 'standard' || transactionType == 'timed'">
                    <section class="row form-group">
                        <div class="col-sm-12 clearfix">
                        </div>
                        <div class="col-sm-12 clearfix">
                            <span class="small-gray-text">
                                To Address:
                            </span>
                            <input type="text"
                                   class="form-control"
                                   ng-model="sendAsset.toAddress"
                                   placeholder="Enter a fusion address"/>
                        </div>
                        <div class="col-sm-12 clearfix">
                            <span class="small-gray-text">
                                Select Asset:
                            </span>
                            <select class="form-control" ng-model="assetToSend" ng-change="getAssetBalance()"
                                    placeholder="lol">
                                <option ng-repeat="asset in assetListOwns" value="{{asset.contractaddress}}">
                                    {{asset.symbol}}
                                    - {{asset.contractaddress}}
                                </option>
                            </select>
                            <div class="sendAssetBalanceAvailable" ng-hide="selectedAssetBalance == ''">
                                <span class="text-fusion">{{selectedAssetBalance}}</span> <span class="small-gray-text">available to send.</span>
                            </div>

                            <span class="small-gray-text">
                                Amount To Send:
                            </span>
                            <input type="number"
                                   class="form-control"
                                   min="0"
                                   ng-model="sendAsset.amountToSend"
                                   ng-class="{'is-invalid' : sendAsset.amountToSend > selectedAssetBalance}"
                                   placeholder="Enter an amount"/>
                            <div class="invalid-feedback" ng-show="sendAsset.amountToSend > selectedAssetBalance">
                                You don't have enough funds
                            </div>
                            <a class="small-gray-text" ng-click="setMaxBalance()" ng-hide="selectedAssetBalance == ''">Send
                                Max</a>
                        </div>
                        <div ng-hide="transactionType =='standard'">
                            <div class="col-md-6">
                            <span class="small-gray-text">
                                    From
                                </span>
                                <br>
                                <input class="form-control" type="date" min="{{todayDate}}"
                                       ng-model="sendAsset.fromTime">
                            </div>
                            <div class="col-md-6">
                            <span class="small-gray-text">
                                    Until
                                </span>
                                <br>
                                <input class="form-control" type="date" min="{{todayDate}}"
                                       ng-model="sendAsset.tillTime">
                            </div>
                        </div>
                    </section>
                </div>
                <div class="row form-group">
                    <div class="col-xs-6 clearfix">
                        <button class="btn btn-white btn-block"
                                ng-click="sendAssetModal.close()">
                            Cancel
                        </button>
                    </div>
                    <div class="col-xs-6 clearfix">
                        <button class="btn btn-primary btn-block"
                                ng-click="sendAssetModalConfirm(assetToSend)"
                                ng-disabled="sendAsset.amountToSend > selectedAssetBalance"
                                ng-show="transactionType == 'standard' || transactionType == 'timed'">
                            Next
                        </button>
                    </div>
                </div>
            </article>

        </section>
    </section>
</article>
<article class="modal fade" id="sendAssetConfirm" tabindex="-1">
    <section class="modal-dialog send-asset-dialog">
        <section class="modal-content">
            <article class="block" ng-hide="wallet.type=='addressOnly'">
                <div class="col-md-12 p-0">
                    <div class="float-right">
                                  <span class="gray-text" ng-click="sendAssetConfirm.close(); sendAsset.close()">                    <i
                                              class="fa fa-times"
                                              aria-hidden="true"></i>
</span>
                    </div>
                </div>

                <h3>Review Your Transaction Details</h3>
                <p>
                    Please carefully read the details of your transaction below before sending the transaction.
                </p>

                <div class="col-md-12" ng-show="transactionType == 'standard' || transactionType == 'timed'">
                    <section class="row form-group">
                        <div class="border-gray-bottom pb-2 pt-2">
                            <div class="float-left">
                                <span class="small-gray-text">
                                    Your Address:
                                </span>
                            </div>
                            <div class="float-right">
                                <span class="fusion-text-14">{{wallet.getChecksumAddressString()}}</span>
                            </div>
                            <br>
                        </div>
                        <div class="border-gray-bottom pb-2 pt-2">
                            <div class="float-left">
                                <span class="small-gray-text">
                                Recepient Address:
                                </span>
                            </div>
                            <div class="float-right">
                                <span class="fusion-text-14">{{sendAsset.toAddress}}</span>
                            </div>
                            <br>
                        </div>
                        <div class="border-gray-bottom pb-2 pt-2" ng-show="transactionType == 'standard'">
                            <div class="float-left">
                                <span class="small-gray-text">
                                Send Type:
                                </span>
                            </div>
                            <div class="float-right">
                                <span class="fusion-text-14">Standard Send</span>
                            </div>
                            <br>
                        </div>

                        <div class="border-gray-bottom pb-2 pt-2" ng-show="transactionType == 'timed'">
                            <div class="float-left">
                                <span class="small-gray-text">
                                Send Type:
                                </span>
                            </div>
                            <div class="float-right">
                                <span class="fusion-text-14">Timed Send</span>
                            </div>
                            <br>
                        </div>
                        <div class="border-gray-bottom pb-2 pt-2 inline w-100">
                            <div class="float-left">
                                <span class="small-gray-text">
                                Asset:
                                </span>
                            </div>
                            <div class="float-right">
                                <span class="fusion-text-14">{{sendAsset.assetName}} ({{sendAsset.assetSymbol}})
                                    </span>
                                <br>
                                <span class="small-gray-text">{{sendAsset.assetHash}}</span>
                            </div>
                            <br>
                        </div>
                        <div class="border-gray-bottom pb-2 pt-2 w-100 inline">
                            <div class="float-left">
                                <span class="small-gray-text">
                                Amount:
                                </span>
                            </div>
                            <div class="float-right">
                                <span class="fusion-text-14">
                                    <span class="mono wallet-balance">  {{sendAsset.amountToSend}} </span>
                                    {{sendAsset.assetSymbol}}
                                </span>
                            </div>
                            <br>
                        </div>
                        <div class="border-gray-bottom pb-2 pt-2 w-100 inline">
                            <div class="float-left">
                                <span class="small-gray-text">
                                Gas Price:
                                </span>
                            </div>
                            <div class="float-right">
                                <span class="fusion-text-14">
                                    <span class="mono wallet-balance">0.000021</span>
                                    FSN
                                </span>
                            </div>
                            <br>
                        </div>


                        <div ng-hide="transactionType =='standard'">
                            <div class="float-right border-gray-bottom pb-2 pt-2 w-50">
                                <span class="small-gray-text">
                                    From
                                </span>
                                <br>
                                <span class="fusion-text-14">{{sendAsset.fromTimeString}}</span>
                            </div>
                            <div class="float-right border-gray-bottom pb-2 pt-2 w-50">
                                <span class="small-gray-text">
                                    Until
                                </span>
                                <br>
                                <span class="fusion-text-14">{{sendAsset.tillTimeString}}</span>
                            </div>
                        </div>

                        <div class="row form-group">
                            <div class="col-xs-6 clearfix">
                                <button class="btn btn-white btn-block"
                                        ng-click="sendAssetModal.open()">
                                    Edit Transaction
                                </button>
                            </div>
                            <div class="col-xs-6 clearfix">
                                <button class="btn btn-primary btn-block"
                                        ng-click="sendAsset()">
                                    Send Asset
                                </button>
                            </div>
                        </div>
                    </section>
                </div>
            </article>

        </section>
    </section>
</article>
<article class="modal fade" id="sendAssetFinal" tabindex="-1">
    <section class="modal-dialog send-asset-dialog">
        <section class="modal-content">
            <article class="block" ng-hide="wallet.type=='addressOnly'">
                <div class="col-md-12 p-0">
                    <div class="float-right">
                                  <span class="gray-text"
                                        ng-click="sendAssetFinal.close(); sendAssetConfirm.close(); sendAsset.close()">                    <i
                                              class="fa fa-times"
                                              aria-hidden="true"></i>
</span>
                    </div>
                </div>

                <div class="col-md-12 text-center p-2">
                    <img src="images/check-circle.svg" class="text-center" height="80px" width="80px" alt="">
                </div>

                <h3 class="text-center">Asset Sent!</h3>
                <p class="text-center">
                    The transaction will be reflected in your account within the next 15 seconds.</p>

                <div class="col-md-12">
                    <section class="row form-group">
                        <div class="border-gray-bottom pb-2 pt-2">
                            <div class="float-left">
                                <span class="small-gray-text">
                                Transaction ID
                                </span>
                            </div>
                            <div class="float-right max-char">
   <span class="fusion-text-14" data-toggle="tooltip" data-placement="top"
         title="{{successHash}}">{{successHash}}
                            </div>
                            <br>
                        </div>

                        <div class="border-gray-bottom pb-2 pt-2">
                            <div class="float-left">
                                <span class="small-gray-text">
                                    Type:
                                </span>
                            </div>
                            <div class="float-right">
                                <span class="fusion-text-14">{{sendAsset.assetName}}</span>
                            </div>
                            <br>
                        </div>
                        <div class="border-gray-bottom pb-2 pt-2">
                            <div class="float-left">
                                <span class="small-gray-text">
                                    Your Address:
                                </span>
                            </div>
                            <div class="float-right">
                                <span class="fusion-text-14">{{wallet.getChecksumAddressString()}}</span>
                            </div>
                            <br>
                        </div>
                        <div class="border-gray-bottom pb-2 pt-2">
                            <div class="float-left">
                                <span class="small-gray-text">
                                Recepient Address:
                                </span>
                            </div>
                            <div class="float-right">
                                <span class="fusion-text-14">{{sendAsset.toAddress}}</span>
                            </div>
                            <br>
                        </div>
                        <div class="border-gray-bottom pb-2 pt-2 inline w-100">
                            <div class="float-left">
                                <span class="small-gray-text">
                                Asset:
                                </span>
                            </div>
                            <div class="float-right">
                                <span class="fusion-text-14">{{sendAsset.assetName}} ({{sendAsset.assetSymbol}})
                                    </span>
                                <br>
                                <span class="small-gray-text">{{sendAsset.assetHash}}</span>
                            </div>
                            <br>
                        </div>
                        <div class="border-gray-bottom pb-2 pt-2 w-100 inline">
                            <div class="float-left">
                                <span class="small-gray-text">
                                Amount:
                                </span>
                            </div>
                            <div class="float-right">
                                <span class="fusion-text-14">
                                    <span class="mono wallet-balance">  {{sendAsset.amountToSend}} </span>
                                    {{sendAsset.assetSymbol}}
                                </span>
                            </div>
                            <br>
                        </div>
                        <div class="border-gray-bottom pb-2 pt-2 w-100 inline">
                            <div class="float-left">
                                <span class="small-gray-text">
                                Gas Price:
                                </span>
                            </div>
                            <div class="float-right">
                                <span class="fusion-text-14">
                                    <span class="mono wallet-balance">0.000021</span>
                                    FSN
                                </span>
                            </div>
                            <br>
                        </div>
                        <div ng-hide="transactionType =='standard'">
                            <div class="float-left border-gray-bottom pb-2 pt-2 w-50">
                                <span class="small-gray-text">
                                    From
                                </span>
                                <br>
                                <span class="fusion-text-14">{{sendAsset.fromTimeString}}</span>
                            </div>
                            <div class="float-right border-gray-bottom pb-2 pt-2 w-50">
                                <span class="small-gray-text">
                                    Until
                                </span>
                                <br>
                                <span class="fusion-text-14">{{sendAsset.tillTimeString}}</span>
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-xs-12 clearfix">
                                <button class="btn btn-white btn-block"
                                        ng-click="sendAssetFinal.close(); sendAssetConfirm.close(); sendAsset.close()">
                                    Close
                                </button>
                            </div>
                        </div>
                    </section>
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
                        <span class="small-gray-text">
                            Asset Name:
                        </span>
                        <input type="text"
                               class="form-control"
                               ng-model="assetCreate.assetName"
                               maxlength="35"
                               placeholder="Enter an Asset Name"/>
                        <span class="small-gray-text text-right w-100 float-right">{{assetCreate.assetName.length}}
                            /35</span>

                    </div>
                    <div class="col-sm-6">
                        <span class="small-gray-text">
                            Asset Symbol:
                        </span>
                        <input type="text"
                               class="form-control"
                               maxlength="4"
                               ng-model="assetCreate.assetSymbol"
                               placeholder="ABCDE"/>
                        <span class="small-gray-text text-right w-100 float-right">{{assetCreate.assetSymbol.length}}
                            /4</span>
                    </div>
                    <div class="col-sm-6">
                                               <span class="small-gray-text">

                            Decimals:
                        </span>
                        <input type="number"
                               min="0"
                               max="15"
                               class="form-control"
                               ng-model="assetCreate.decimals"
                               placeholder="Up to 15 Decimal Points"/>
                        <span class="small-gray-text text-right w-100 float-right">{{assetCreate.decimals}}/15</span>

                    </div>
                    <div class="col-sm-12 clearfix">
                        <span class="small-gray-text">
                            Total Supply:
                        </span>
                        <input type="number"
                               min="0"
                               class="form-control"
                               ng-model="assetCreate.totalSupply"
                               placeholder="Enter the amount of this assets you want to create"/>
                    </div>
                </section>

                <div class="row form-group">
                    <div class="col-xs-6 clearfix">
                        <a class="btn btn-white btn-block"
                           ng-click="createAssetModal.close()">
                            Cancel
                        </a>
                    </div>
                    <div class="col-xs-6 clearfix">
                        <button class="btn btn-primary btn-block"
                                ng-class="{'disabled' : assetCreate.totalSupply <= 0}"
                                ng-click="createAsset()">
                            Generate Asset
                        </button>
                    </div>
                </div>

                <div class="col-lg-12 col-sm-12 col-xs-12 alert alert-danger" ng-show="assetCreate.errorMessage != ''">
                    <strong>Error!</strong> {{assetCreate.errorMessage}} <br>
                    Please, review and try again!
                </div>
            </article>

        </section>
    </section>
</article>
<article class="modal fade" id="createAssetFinal" tabindex="-1">
    <section class="modal-dialog send-asset-dialog">
        <section class="modal-content">
            <article class="block" ng-hide="wallet.type=='addressOnly'">
                <div class="col-md-12 p-0">
                    <div class="float-right">
                                  <span class="gray-text" ng-click="createAssetFinal.close(); createAsset.close()">                    <i
                                              class="fa fa-times"
                                              aria-hidden="true"></i>
</span>
                    </div>
                </div>

                <div class="col-md-12 text-center p-2">
                    <img src="images/check-circle.svg" class="text-center" height="80px" width="80px" alt="">
                </div>

                <h3 class="text-center">Asset Created!</h3>
                <p class="text-center">
                    The asset will show up in your wallet within the next 15 seconds
                </p>

                <div class="col-md-12">
                    <section class="row form-group">
                        <div class="border-gray-bottom pb-2 pt-2">
                            <div class="float-left">
                                <span class="small-gray-text">
                                    Transaction ID
                                </span>
                            </div>
                            <div class="float-right max-char">
                                   <span class="fusion-text-14" data-toggle="tooltip" data-placement="top"
                                         title="{{assetCreate.assetHash}}">{{assetCreate.assetHash}}
                                </span>
                            </div>
                            <br>
                        </div>

                        <div class="border-gray-bottom pb-2 pt-2">
                            <div class="float-left">
                                <span class="small-gray-text">
                                    Asset Name
                                </span>
                            </div>
                            <div class="float-right">
                                <span class="fusion-text-14">{{assetCreate.assetName}}</span>
                            </div>
                            <br>
                        </div>

                        <div class="border-gray-bottom pb-2 pt-2">
                            <div class="float-left">
                                <span class="small-gray-text">
                                    Asset Symbol
                                </span>
                            </div>
                            <div class="float-right">
                                <span class="fusion-text-14">{{assetCreate.assetSymbol}}</span>
                            </div>
                            <br>
                        </div>

                        <div class="border-gray-bottom pb-2 pt-2">
                            <div class="float-left">
                                <span class="small-gray-text">
                                    Decimal Points
                                </span>
                            </div>
                            <div class="float-right">
                                <span class="fusion-text-14">{{assetCreate.decimals}}</span>
                            </div>
                            <br>
                        </div>

                        <div class="border-gray-bottom pb-2 pt-2">
                            <div class="float-left">
                                <span class="small-gray-text">
                                    Total Supply
                                </span>
                            </div>
                            <div class="float-right">
                                <span class="fusion-text-14">{{assetCreate.totalSupply}}</span>
                            </div>
                            <br>
                        </div>

                        <div class="row form-group">
                            <div class="col-xs-12 clearfix">
                                <button class="btn btn-white btn-block"
                                        ng-click="createAssetFinal.close(); createAsset.close()">
                                    Close
                                </button>
                            </div>
                        </div>
                    </section>
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
