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
                   ng-class="{'disabled' : web3WalletBalance <= 0}"
                >
                    <i class="fa fa-plus"></i> Create Asset
                </a>
                <a class="btn btn-sm btn-primary"
                   ng-class="{'disabled' : web3WalletBalance <= 0}"
                   ng-click="sendAssetModalOpen(); transactionType = 'none';"
                >
                    Send/Time-lock Assets
                </a></div>
        </div>
    </div>
    <article class="block">
        <section class="row form-group">
            <div class="col-sm-12 clearfix">
                <p class="p-2">The Assets section provides an overview of all the digital assets that are currently in
                    your Fusion PSN wallet.</p>
                <div class="float-right">
                    <span class="small-gray-text">
                        <i class="fa fa-cube"></i> <strong>{{latestBlock}}</strong>
                    </span>
                </div>
            </div>

            <div class="col-sm-12 clearfix text-center gray-bg p-2"
                 ng-show="showNoAssets && !assetListLoading && assetListOwns == ''">
                <h4 class="small-gray-text">No available assets</h4>
            </div>

            <div class="col-sm-12 clearfix text-center" ng-show="assetListLoading">
                <h4 class="text-center">
                    <i class="fa fa-circle-o-notch fa-spin fa-fw" aria-hidden="true"></i>
                </h4>
                <h4 class="small-gray-text text-center">Loading assets</h4>

            </div>


            <div class="col-sm-12 clearfix" data-ng-init="getAllFsnAssets()">
                <div class="table-responsive" ng-show="assetListOwns != ''">
                    <table class="table">
                        <thead>
                        <tr class="small-gray-text text-left">
                            <th scope="col"></th>
                            <th scope="col">Asset Name</th>
                            <th scope="col">Asset Info</th>
                            <th scope="col" class="text-right">Available</th>
                            <th scope="col" class="text-right">Actions</th>
                        </tr>
                        </thead>
                        <tbody>

                        <tr ng-repeat="asset in assetListOwns track by $index">
                            <td ng-click="manageAssetOpen(f)">
                                <img ng-if="asset.hasImage"
                                     ng-src="images/verifiedassets/{{asset.image}}"/>
                                <span ng-if="!asset.hasImage"
                                      class="btn btn-white btn-circle w32 asset-round mt-1">{{asset.symbol | limitTo : 4 }}</span>
                            </td>
                            <td ng-click="manageAssetOpen(f)"
                            >{{asset.name}} ({{asset.symbol}}) <span class="color-Active official-fusion-badge"
                                                                     ng-show="asset.verified"><i
                                            class="fa fa-check-circle"></i> Verified</span> <br>
                                <div class="max-char">
                                    <span class="small-gray-text" data-toggle="tooltip" data-placement="top"
                                          title="{{asset.contractaddress}}">ID: {{asset.contractaddress}}</span>
                                </div>
                            </td>
                            <td ng-click="manageAssetOpen(f)"
                            ><span class="badge badge-secondary m-1">Fusion Asset</span>
                                <br>
                                <span class="created m-1" ng-hide="asset.owner == ''">{{asset.owner}}</span>

                            </td>
                            <td class="text-right" ng-click="manageAssetOpen(f)">
                                {{asset.balance}} <br> <span class="small-gray-text"></span></td>
                            <td class="text-right">
                                <span ng-init="f = $index" style="display:none;"></span>
                                <button class="btn-sm btn-white action-button p-0 w32"
                                        ng-show="asset.owner == 'Created' && asset.canChange == true"
                                        ng-click="changeSupplyOpen(f)"
                                >
                                    <img src="images/ChangeSupply.svg" class="Group-6 m-0 mb-1">
                                </button>
                                <button class="btn-sm btn-white action-button p-0"
                                        ng-click="sendAssetModalOpen(f, false)">Send
                                </button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    </article>

    <div class="row">
        <div class="col-md-12">
            <h3>Time-Locked Assets</h3>
        </div>
    </div>
    <article class="block" ng-hide="wallet.type=='addressOnly'">
        <section class="row form-group">
            <div class="col-sm-12 clearfix">
                <p class="p-2">The Time-lock Assets section provides all relevant information about the time-locked
                    digital assets in your wallet.</p>
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
                            <th scope="col"></th>
                            <th scope="col">Asset Name</th>
                            <th scope="col">Time-lock Period</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr ng-repeat="asset in timeLockList track by $index"
                            ng-hide="asset.status === 'Expired'">
                            <td class="color-{{asset.status}}">● {{asset.status}}</td>
                            <td>
                                <img ng-if="asset.hasImage"
                                     ng-src="images/verifiedassets/{{asset.image}}"/>
                                <span ng-if="!asset.hasImage"
                                      class="btn btn-white btn-circle w32 asset-round mt-1">{{asset.symbol | limitTo : 4 }}</span>
                            </td>
                            <td> {{asset.name}} ({{asset.symbol}}) <span class="color-Active official-fusion-badge"
                                                                         ng-show="asset.verified"><i
                                            class="fa fa-check-circle"></i> Verified</span>
                                <br>
                                <div class="max-char"><span class="small-gray-text" data-toggle="tooltip"
                                                            data-placement="top"
                                                            title="{{asset.asset}}">ID: {{asset.asset}}</span></div>
                            </td>
                            <td><span class="small-gray-text">From</span> {{asset.startTime}} <br><span
                                        class="small-gray-text">Until </span> {{asset.endTime}}</td>
                            <td>{{asset.value}}</td>
                            <td class="text-right">
                                <button class="btn-sm btn-white action-button p-0"
                                        ng-show="asset.status === 'Available'"
                                        data-toggle="tooltip"
                                        data-placement="top"
                                        title="Send back to Assets"
                                        ng-click="sendBackToAssets(asset.id)">
                                    <img src="images/group-5.svg" class="Group-6 m-0">
                                </button>
                                <button class="btn-sm btn-white action-button p-0" ng-hide="asset.status === 'Expired'"
                                        ng-click="sendAssetModalOpen(asset.id, true)"
                                >
                                    Send
                                </button>
                                <button class="btn-sm btn-white action-button p-0"
                                        ng-show="asset.status === 'Expired'"
                                        ng-click="hideExpired(asset.id)">
                                    Remove
                                </button>
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
    <section class="modal-dialog">
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

                <h3 class="h3-blue" ng-hide="showStaticTimeLockAsset === true">Send Asset</h3>
                <h3 class="h3-blue" ng-show="showStaticTimeLockAsset === true">Send Time-lock</h3>

                <div>
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
                                   ng-change="verifyWalletAddress(); verifyWalletAddress();"
                                   placeholder="Enter a fusion address"/>
                            <div class="invalid-feedback" ng-show="walletAddressError">
                                Please, enter a valid wallet address.
                            </div>
                            <div class="neutral-feedback" ng-show="checkingUSAN">
                                Checking Short Account Number, please wait..
                            </div>
                            <div class="valid-feedback" ng-show="validWalletAddress">
                                Wallet address is valid.
                            </div>
                        </div>

                        <div class="col-sm-12 mb-2" ng-show="showStaticAsset === true">
                            <div class="sendAssetBalanceAvailable">
                                <span class="text-fusion">{{assetName}}</span>
                                <div class="break-word">
                                    <span class="small-gray-text">{{assetToSend}}</span>
                                </div>
                            </div>
                        </div>

                        <div class="col-sm-12 clearfix">
                            <span class="small-gray-text" ng-hide="showStaticAsset === true">
                                Select Asset:
                            </span>
                            <select class="form-control" ng-model="assetToSend" ng-change="getAssetBalance()"
                                    ng-hide="showStaticAsset === true">
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
                            <input type="text"
                                   class="form-control"
                                   min="0"
                                   ng-model="sendAsset.amountToSend"
                                   ng-class="{'is-invalid' : sendAsset.amountToSend > selectedAssetBalance}"
                                   placeholder="Enter an amount"/>
                            <div class="invalid-feedback" ng-show="sendAsset.amountToSend > selectedAssetBalance;">
                                You don't have enough funds
                            </div>
                            <div class="invalid-feedback" ng-show="sendAsset.amountToSend < 0;">
                                You can't enter an invalid amount
                            </div>
                            <a class="small-gray-text" ng-click="setMaxBalance()" style="display:none;"
                               ng-hide="selectedAssetBalance == ''">Send
                                Max</a>
                        </div>
                        <div class="col-md-12" ng-show="showStaticTimeLockAsset">
                            <div class="col-md-6 p-0">
                                <span class="small-gray-text">
                                        From
                                </span>
                                <br>
                                {{timeLockStartTime}}

                            </div>
                            <div class="col-md-6 p-0">
                                <span class="small-gray-text">
                                        Until
                                    </span>
                                <br>
                                {{timeLockEndTime}}

                            </div>
                        </div>
                        <div class="col-md-12" ng-hide="showStaticTimeLockAsset">
                            <span class="small-gray-text">
                                    Time-Lock
                                </span>
                            <br>
                            <div class="col-md-4 p-0 pb-2">
                                <button class="btn btn-sm btn-white w-100"
                                        ng-click="transactionType ='none'"
                                        ng-class="{'time-active' : transactionType == 'none'}"
                                >None
                                </button>
                            </div>
                            <div class="col-md-4 p-0 pb-2">
                                <button class="btn btn-sm btn-white w-100"
                                        ng-click="transactionType ='scheduled'"
                                        ng-class="{'time-active' : transactionType == 'scheduled'}"
                                >
                                    Date to Forever
                                </button>
                            </div>
                            <div class="col-md-4 p-0 pb-2">
                                <button class="btn btn-sm btn-white w-100"
                                        ng-click="transactionType ='daterange'"
                                        ng-class="{'time-active' : transactionType == 'daterange'}"
                                >
                                    Now to Date
                                </button>
                            </div>
                        </div>
                        <div ng-hide="transactionType =='none'">
                            <div class="col-md-6">
                            <span class="small-gray-text" ng-hide="transactionType == 'scheduled'">
                                    From
                            </span>
                                <span class="small-gray-text" ng-show="transactionType == 'scheduled'">
                                    From
                            </span>
                                <br>
                                <input class="form-control"
                                       type="date"
                                       ng-change="checkDateWithForever()"
                                       min="{{todayDate}}"
                                       timepicker-neutral-timezone
                                       onkeydown="return false"
                                       ng-model="sendAsset.fromTime"
                                       ng-show="transactionType == 'scheduled'"
                                >
                                <span class="b-form small-gray-text text-fusion fusion-text-14 p-1"
                                      ng-show="transactionType == 'daterange'">Now</span>

                            </div>
                            <span class="small-gray-text" ng-show="transactionType == 'scheduled'">
                                    Until
                            </span>
                            <br>
                            <div class="col-md-6 p-0" ng-show="transactionType == 'scheduled'">
                                <span class="b-form small-gray-text text-fusion fusion-text-14 p-1">∞ Forever</span>
                            </div>
                            <div class="col-md-6" ng-hide="transactionType == 'scheduled'">
                            <span class="small-gray-text">
                                    Until
                                </span>
                                <br>
                                <input class="form-control"
                                       type="date"
                                       timepicker-neutral-timezone
                                       ng-change="checkDate()"
                                       min="{{todayDate}}"
                                       onkeydown="return false"
                                       ng-model="sendAsset.tillTime">
                            </div>
                        </div>
                    </section>
                </div>
                <span class="small-gray-text" ng-show="web3WalletBalance < 0.00002">Insufficient funds to create transaction.</span>
                <div class="row form-group">
                    <div class="col-xs-6 clearfix">
                        <button class="btn btn-white btn-block"
                                ng-click="sendAssetModal.close()">
                            Cancel
                        </button>
                    </div>
                    <div class="col-xs-6 clearfix" ng-hide="web3WalletBalance < 0.00002">
                        <button class="btn btn-primary btn-block"
                                ng-click="sendAssetModalConfirm(assetToSend)"
                                ng-hide="showStaticTimeLockAsset"
                                ng-disabled="sendAsset.amountToSend > selectedAssetBalance || sendAsset.amountToSend == '' || sendAsset.toAddress == '' || sendAsset.amountToSend < 0 || walletAddressError">
                            Next
                        </button>
                        <button class="btn btn-primary btn-block"
                                ng-click="sendAssetModalConfirm(assetToSend)"
                                ng-show="showStaticTimeLockAsset"
                                ng-disabled="sendAsset.amountToSend > selectedAssetBalance || sendAsset.amountToSend == '' || sendAsset.toAddress == '' || walletAddressError">
                            Next
                        </button>
                    </div>
                </div>
            </article>

        </section>
    </section>
</article>

<article class="modal fade" id="sendBackToAssetsModal" tabindex="-1">
    <section class="modal-dialog">
        <section class="modal-content">
            <article class="block" ng-hide="wallet.type=='addressOnly'">
                <div class="col-md-12 p-0">
                    <div class="float-right">
                                  <span class="gray-text" ng-click="sendBackToAssetsModal.close();">                    <i
                                              class="fa fa-times"
                                              aria-hidden="true"></i>
</span>
                    </div>
                </div>

                <h3>Send Time-Lock to Asset</h3>

                <p class="small-gray-text">Send your time-lock back to <ax></ax>ssets.</p>
                <section class="row form-group">
                    <div class="col-sm-8">
                            <span class="small-gray-text">
                                Asset:
                            </span>
                        <div class="gray-bg p-1">
                            <span class="mono wallet-balance">{{sendAsset.assetName}} ({{sendAsset.assetSymbol}})</span>
                            <br>
                            <span class="small-gray-text text-fusion fusion-text-14">{{assetToSend}}</span>
                        </div>
                        <span class="small-gray-text">Estimated Gas Price: 0.00002 FSN</span>
                    </div>
                    <div class="col-sm-4">
                          <span class="small-gray-text">
                                Amount:
                            </span>
                        <div class="gray-bg p-1">
                            <span class="mono wallet-balance">{{selectedAssetBalance}}</span> <span
                                    class="small-gray-text text-fusion fusion-text-14">{{sendAsset.assetSymbol}}</span>
                        </div>
                    </div>
                </section>
                <div class="row form-group">
                    <div class="col-xs-6 clearfix">
                        <button class="btn btn-white btn-block"
                                ng-click="sendBackToAssetsModal.close()">
                            Cancel
                        </button>
                    </div>
                    <div class="col-xs-6 clearfix">
                        <button class="btn btn-primary btn-block"
                                ng-click="sendBackToAssetsFunction()">
                            Send to Assets
                        </button>
                    </div>
                </div>
            </article>

        </section>
    </section>
</article>
<article class="modal fade" id="sendAssetConfirm" tabindex="-1">
    <section class="modal-dialog">
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

                <div class="col-md-12">
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
                                    <span class="mono wallet-balance">0.00002</span>
                                    FSN
                                </span>
                            </div>
                            <br>
                        </div>


                        <div ng-hide="transactionType =='none'">
                            <div class="float-left border-gray-bottom pb-2 pt-2 w-50"
                                 ng-class="{'w-100' : transactionType == 'scheduled'}">
                                <span class="small-gray-text" ng-hide="transactionType =='scheduled'">
                                    From
                                </span>
                                <span class="small-gray-text" ng-show="transactionType =='scheduled'">
                                    From
                                </span>
                                <br>
                                <span class="fusion-text-14"
                                      ng-hide="transactionType == 'daterange'">{{sendAsset.fromTimeString}}</span>
                                <span class="fusion-text-14" ng-show="transactionType == 'daterange'">Now</span>
                            </div>
                            <div class="float-right border-gray-bottom pb-2 pt-2 w-50"
                                 ng-hide="transactionType == 'scheduled'">
                                <span class="small-gray-text">
                                    Until
                                </span>
                                <br>
                                <span class="fusion-text-14"
                                      ng-hide="transactionType == 'scheduled'">{{sendAsset.tillTimeString}}</span>
                                <span class="fusion-text-14" ng-show="transactionType == 'scheduled'">∞ Forever</span>

                            </div>
                        </div>

                        <div class="col-md-12 p-0" ng-show="showStaticTimeLockAsset">
                            <div class="col-md-6 p-0">
                                <span class="small-gray-text">
                                        From
                                </span>
                                <br>
                                {{timeLockStartTime}}
                            </div>
                            <div class="col-md-6 p-0">
                                <span class="small-gray-text">
                                        Until
                                    </span>
                                <br>
                                {{timeLockEndTime}}
                            </div>
                        </div>

                        <div class="row form-group">
                            <div class="col-xs-6 clearfix">
                                <button class="btn btn-white btn-block"
                                        ng-click="sendAssetModal.open()">
                                    Edit Transaction
                                </button>
                            </div>
                            <div class="col-xs-6 clearfix" ng-hide="showStaticTimeLockAsset">
                                <button class="btn btn-primary btn-block"
                                        ng-click="sendAsset()">
                                    Send Asset
                                </button>
                            </div>
                            <div class="col-xs-6 clearfix" ng-show="showStaticTimeLockAsset">
                                <button class="btn btn-primary btn-block"
                                        ng-click="timeLockToTimeLock()">
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
<article class="modal fade" id="successModal" tabindex="-1">
    <section class="modal-dialog">
        <section class="modal-content">
            <article class="block" ng-hide="wallet.type=='addressOnly'">
                <div class="col-md-12 p-0">
                    <div class="float-right">
                                  <span class="gray-text"
                                        ng-click="successModal.close();">                    <i
                                              class="fa fa-times"
                                              aria-hidden="true"></i>
</span>
                    </div>
                </div>

                <div class="col-md-12 text-center p-2">
                    <img src="images/check-circle.svg" class="text-center" height="80px" width="80px" alt="">
                </div>

                <h3 class="text-center">Success!</h3>
                <p class="text-center">
                    Your transaction was emitted and will show up shortly..
                </p>
            </article>

        </section>
    </section>
</article>
<article class="modal fade" id="errorModal" tabindex="-1">
    <section class="modal-dialog">
        <section class="modal-content">
            <article class="block" ng-hide="wallet.type=='addressOnly'">
                <div class="col-md-12 p-0">
                    <div class="float-right">
                                  <span class="gray-text"
                                        ng-click="errorModal.close();">                    <i
                                              class="fa fa-times"
                                              aria-hidden="true"></i>
</span>
                    </div>
                </div>

                <h3 class="text-center">Oops!</h3>
                <div class="col-md-12 text-center p-2">
                    <img src="images/combined-shape.svg" class="text-center" height="32px" width="32px" color="red"
                         alt="">
                </div>
                <p class="text-center">
                    Looks like we ran into an issue…
                    <br>
                </p>
                <div class="col-md-12 w-100 mb-3 mt-3 text-center">
                      <span class="alert alert-red p-3 inline">
                    <span class="small-gray-text">{{errorMessage}}</span>
                </span>
                </div>
                <div class="col-md-12 text-center">
                    <button class="btn btn-white w-100" ng-click="errorModal.close()">Cancel</button>
                </div>
            </article>

        </section>
    </section>
</article>
<article class="modal fade" id="sendAssetFinal" tabindex="-1">
    <section class="modal-dialog">
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
         title="{{successHash}}"><a href="https://blocks.fusionnetwork.io/Transactions/{{successHash}}"
                                    target="_blank">{{successHash}}</a>
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
                        <div ng-hide="transactionType =='none'">
                            <div class="float-left border-gray-bottom pb-2 pt-2 w-50">
                                <span class="small-gray-text" ng-hide="transactionType =='scheduled'">
                                    From
                                </span>
                                <span class="small-gray-text" ng-show="transactionType =='scheduled'">
                                    Send On
                                </span>
                                <br>
                                <span class="fusion-text-14">{{sendAsset.fromTimeString}}</span>
                            </div>
                            <div class="float-right border-gray-bottom pb-2 pt-2 w-50"
                                 ng-hide="transactionType =='scheduled'">
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
<article class="modal fade" id="manageAsset" tabindex="-1">
    <section class="modal-dialog">
        <section class="modal-content">
            <article class="block" ng-hide="wallet.type=='addressOnly'">
                <div class="col-md-12 p-0">
                    <div class="float-right">
                                  <span class="gray-text" ng-click="manageAsset.close();">                    <i
                                              class="fa fa-times"
                                              aria-hidden="true"></i>
</span>
                    </div>
                </div>
                <h3 class="h3-blue mb-3">Asset Info</h3>

                <div class="col-md-12 p-3 blue-bg">
                    <div class="row">
                        <div class="col-md-6">
                            <img ng-if="manageAssetInfo.hasImage"
                                 class="round-bg-white mr-2"
                                 ng-src="images/verifiedassets/{{manageAssetInfo.image}}"/>

                            {{manageAssetInfo.name}} ({{manageAssetInfo.symbol}})

                        </div>
                        <div class="col-md-6 text-right">
                            <span class="badge badge-white"
                                  ng-show="manageAssetInfo.owner == 'Created'">{{manageAssetInfo.owner}}</span>
                        </div>
                    </div>
                    <br>
                    <span style="font-size:11px;">{{manageAssetInfo.contractaddress}}</span>
                </div>
                <nav class="nav-container inline">
                    <div class="nav-scroll">
                        <div class="nav-inner bg-white">
                            <li class="nav-item bg-white p-2" ng-class="{'active-blue': !showAttributes}"
                                ng-click="showAttributes = false">
                                Overview
                            </li>
                            <li class="nav-item bg-white p-2" ng-class="{'active-blue': showAttributes}"
                                ng-click="showAttributes = true">
                                Attributes
                            </li>
                        </div>
                    </div>
                </nav>
                <div class="col-md-12" ng-show="!showAttributes">
                    <section class="row form-group">
                        <div class="border-gray-bottom pb-3 pt-2 flow-root">
                            <div class="float-left">
                                <span class="small-gray-text">
                                    Total Supply
                                </span>
                            </div>
                            <div class="float-right text-right">
                                   <span class="fusion-text-14">
                                       {{manageAssetInfo.total}}
                                   </span>
                                <br>
                                <span class="small-gray-text"
                                      ng-show="manageAssetInfo.canChange == true && manageAssetInfo.owner == ''">
                                    Changeable
                                </span>
                                <span class="small-gray-text"
                                      ng-show="manageAssetInfo.canChange == false && manageAssetInfo.owner == ''">
                                    Fixed Supply
                                </span>
                                <a class="small-gray-text" style="color:#2a65b0"
                                   ng-click="changeSupplyOpen()"
                                   ng-show="manageAssetInfo.canChange == true && manageAssetInfo.owner == 'Created'">
                                    Change Supply
                                </a>
                            </div>
                            <br>
                        </div>
                        <div class="border-gray-bottom pb-3 pt-2">
                            <div class="float-left">
                                <span class="small-gray-text">
                                    Available Supply
                                </span>
                            </div>
                            <div class="float-right text-right">
                                   <span class="fusion-text-14" data-toggle="tooltip" data-placement="top"
                                         title="gagaga">
                                        {{manageAssetInfo.balance}}
                                   </span>
                            </div>
                            <br>
                        </div>
                        <div class="border-gray-bottom pb-3 pt-2">
                            <div class="float-left">
                                <span class="small-gray-text">
                                    Decimal Points
                                </span>
                            </div>
                            <div class="float-right text-right">
                                   <span class="fusion-text-14" data-toggle="tooltip" data-placement="top"
                                         title="gagaga">
                                                                              {{manageAssetInfo.decimals}}
                                   </span>
                            </div>
                            <br>
                        </div>
                        <div class="border-gray-bottom pb-3 pt-2">
                            <div class="float-left">
                                <span class="small-gray-text">
                                    Issuer
                                </span>
                            </div>
                            <div class="float-right text-right">
                                   <span class="fusion-text-14" data-toggle="tooltip" data-placement="top"
                                         title="gagaga">
                                         {{manageAssetInfo.issuer}}
                                   </span>
                            </div>
                            <br>
                        </div>
                    </section>
                </div>
                <div class="col-md-12" ng-show="showAttributes">
                    <section class="row form-group">
                        <div class="border-gray-bottom pb-3 pt-2 flow-root"
                             ng-repeat="(key,value) in manageAssetInfo.description">
                            <div class="float-left">
                                <span class="small-gray-text">
                                    {{key}}
                                </span>
                            </div>
                            <div class="float-right text-right">
                                   <span class="fusion-text-14" data-toggle="tooltip" data-placement="top"
                                         title="gagaga">
                                       {{value}}
                                   </span>
                            </div>
                            <br>
                        </div>
                        <div class="col-md-12" ng-show="showNoAvailableAttributes">
                            <div class="warn alert-yellow text-center p-4 inline w-100 mt-2 gray-bg">
                                <span class="small-gray-text">This asset doesn’t have any attributes.</span>
                            </div>
                        </div>
                    </section>
                </div>

                <div class="row form-group">
                    <div class="col-md-12 col-xs-12 clearfix text-center">
                        <button class="btn btn-white w-50"
                                ng-click="manageAsset.close()">
                            Cancel
                        </button>
                    </div>
                </div>
            </article>

        </section>
    </section>
</article>
<article class="modal fade" id="changeSupply" tabindex="-1">
    <section class="modal-dialog">
        <section class="modal-content">
            <article class="block">
                <div class="col-md-12 p-0">
                    <div class="float-right">
                                  <span class="gray-text" ng-click="changeSupply.close();">                    <i
                                              class="fa fa-times"
                                              aria-hidden="true"></i>
</span>
                    </div>
                </div>
                <h3 class="h3-blue mb-3">Change Supply</h3>

                <div class="col-md-12 p-3 blue-bg">
                    <div class="row">
                        <div class="col-md-6">
                            <img ng-if="changeSupplyInfo.hasImage"
                                 class="round-bg-white mr-2"
                                 ng-src="images/verifiedassets/{{changeSupplyInfo.image}}"/>
                            {{changeSupplyInfo.name}} ({{changeSupplyInfo.symbol}})

                        </div>
                        <div class="col-md-6 text-right">
                            <span class="badge badge-white"
                                  ng-show="manageAssetInfo.owner == 'Created'">{{changeSupplyInfo.owner}}</span>
                        </div>
                    </div>
                    <br>
                    <span style="font-size:11px;">{{changeSupplyInfo.contractaddress}}</span>
                </div>

                <div class="col-md-12">
                    <section class="row form-group">
                        <div class="border-gray-bottom pb-3 pt-2 flow-root">
                            <div class="float-left">
                                <span class="small-gray-text">
                                    Current Total Supply
                                </span>
                            </div>
                            <div class="float-right text-right">
                                   <span class="fusion-text-14">
                                       {{changeSupplyInfo.total}}
                                   </span>
                            </div>
                            <br>
                        </div>
                        <div class="pb-3 pt-2">
                            <div class="float-left">
                                <span class="small-gray-text">
                                    Distributed Supply
                                </span>
                            </div>
                            <div class="float-right text-right">
                                   <span class="fusion-text-14">
                                        {{changeSupplyInfo.distributed}}
                                   </span>
                            </div>
                            <br>
                        </div>
                        <div class="border-gray-bottom pb-3 pt-2">
                            <span class="small-gray-text">
                                New Total Supply
                            </span>
                            <input type="number"
                                   class="form-control"
                                   ng-class="{'is-invalid' : newTotalSupply <= changeSupplyInfo.distributed}"
                                   ng-model="newTotalSupply"
                                   min="0"
                            />
                            <div class="invalid-feedback" ng-show="newTotalSupply <= changeSupplyInfo.distributed">
                                Supply cannot be less than amount distributed.
                            </div>

                            <br>
                            <span class="small-gray-text">
                                Note (Optional)
                            </span>
                            <textarea class="form-control" rows="3" placeholder="Enter a note..."
                                      ng-model="transacData" maxlength="255"
                            ></textarea>
                            <span class="small-gray-text">{{transacData.length}}/255</span>
                            <br>
                        </div>
                    </section>
                </div>

                <div class="row form-group">
                    <div class="col-md-6 col-xs-12 clearfix">
                        <a class="btn btn-white btn-block"
                           ng-click="changeSupply.close()">
                            Cancel
                        </a>
                    </div>
                    <div class="col-md-6 col-xs-12 clearfix">
                        <a class="btn btn-primary btn-block"
                           ng-click="changeSupplyReviewOpen()"
                           ng-class="{'disabled' : transacData.length > 255 || newTotalSupply == 0 || newTotalSupply <= changeSupplyInfo.distributed}"
                           ng-disabled="transacData.length > 255 || newTotalSupply == 0 || newTotalSupply <= changeSupplyInfo.distributed"
                        >
                            Review
                        </a>
                    </div>
                </div>
            </article>
        </section>
    </section>
</article>
<article class="modal fade" id="changeSupplyReview" tabindex="-1">
    <section class="modal-dialog">
        <section class="modal-content">
            <article class="block">
                <div class="col-md-12 p-0">
                    <div class="float-right">
                                  <span class="gray-text" ng-click="changeSupplyReview.close();">                    <i
                                              class="fa fa-times"
                                              aria-hidden="true"></i>
</span>
                    </div>
                </div>
                <h3 class="h3-blue mb-3">Review Changes</h3>

                <div class="col-md-12 p-3 blue-bg">
                    <div class="row">
                        <div class="col-md-6">
                            <img ng-if="changeSupplyInfo.hasImage"
                                 class="round-bg-white mr-2"
                                 ng-src="images/verifiedassets/{{changeSupplyInfo.image}}"/>
                            {{changeSupplyInfo.name}} ({{changeSupplyInfo.symbol}})

                        </div>
                        <div class="col-md-6 text-right">
                            <span class="badge badge-white"
                                  ng-show="manageAssetInfo.owner == 'Created'">{{changeSupplyInfo.owner}}</span>
                        </div>
                    </div>
                    <br>
                    <span style="font-size:11px;">{{changeSupplyInfo.contractaddress}}</span>
                </div>

                <div class="col-md-12">
                    <section class="row form-group">
                        <div class="border-gray-bottom pb-3 pt-2">
                            <div class="float-left">
                                <span class="small-gray-text">
                                   Change in Supply
                                </span>
                            </div>
                            <div class="float-right text-right">
                                       <span ng-class="{'incAsset' : changeSupplyState == 'increment', 'decAsset' : changeSupplyState == 'decrement'}"
                                       >{{totalSupplyDiff}} {{changeSupplyInfo.symbol}}</span>
                            </div>
                            <br>
                        </div>
                    </section>
                </div>

                <div class="col-md-12">
                    <section class="row form-group">
                        <div class="border-gray-bottom pb-3 pt-2">
                            <div class="float-left">
                                <span class="small-gray-text">
                                    New Total Supply
                                </span>
                            </div>
                            <div class="float-right text-right">
                                   <span class="fusion-text-14">
                                       {{newTotalSupply}} {{changeSupplyInfo.symbol}}
                                   </span>
                            </div>
                            <br>
                        </div>
                        <div class="border-gray-bottom pb-3 pt-2" ng-show="transacData !== ''">
                            <div class="float-left">
                                      <span class="small-gray-text">
                                Note
                            </span>
                            </div>
                            <div class="float-right">
                                <span class="small-gray-text">{{transacData}}</span>
                            </div>
                            <br>
                        </div>
                        <div class="pb-3 pt-2">
                            <div class="float-left">
                                <span class="small-gray-text">
                                    Gas Price
                                </span>
                            </div>
                            <div class="float-right text-right">
                                   <span class="fusion-text-14">
~0.00002 FSN
                                   </span>
                            </div>
                            <br>
                        </div>
                    </section>
                </div>

                <div class="row form-group">
                    <div class="col-md-6 col-xs-12 clearfix">
                        <a class="btn btn-white btn-block"
                           ng-click="changeSupplyReview.close()">
                            Cancel
                        </a>
                    </div>
                    <div class="col-md-6 col-xs-12 clearfix">
                        <a class="btn btn-primary btn-block"
                           ng-click="changeSupplyTx()">
                            Change Supply
                        </a>
                    </div>
                </div>
            </article>

        </section>
    </section>
</article>

<article class="modal fade" id="changeSupplySuccess" tabindex="-1">
    <section class="modal-dialog">
        <section class="modal-content">
            <article class="block">
                <div class="col-md-12 p-0">
                    <div class="float-right">
                                  <span class="gray-text" ng-click="changeSupplySuccess.close()">                    <i
                                              class="fa fa-times"
                                              aria-hidden="true"></i>
</span>
                    </div>
                </div>

                <div class="col-md-12 text-center p-2">
                    <img src="images/check-circle.svg" class="text-center" height="80px" width="80px" alt="">
                </div>

                <h3 class="h3-blue text-center">Supply Changed</h3>
                <p class="text-center">
                    This transaction will be reflected in your account within the next 15 seconds.
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
                                <a href="https://blocks.fusionnetwork.io/Transactions/{{changeSupplyInfo.txhash}}"
                                   target="_blank">
                                   <span class="fusion-text-14" data-toggle="tooltip" data-placement="top"
                                         title="{{changeSupplyInfo.txhash}}">
                                       {{changeSupplyInfo.txhash}}
                                   </span>
                                </a>
                            </div>
                            <br>
                        </div>

                        <div class="border-gray-bottom pb-2 pt-2 flow-root">
                            <div class="float-left">
                                <span class="small-gray-text">
                                    Asset
                                </span>
                            </div>
                            <div class="float-right text-right">
                                <span class="fusion-text-14">{{changeSupplyInfo.name}} ({{changeSupplyInfo.symbol}}
                                    )</span>
                                <br>
                                <span class="small-gray-text max-char text-right inline-block" data-toggle="tooltip"
                                      data-placement="top"
                                      title="{{changeSupplyInfo.contractaddress}}">{{changeSupplyInfo.contractaddress}}</span>
                            </div>
                            <br>
                        </div>

                        <div class="col-md-12">
                            <section class="row form-group">
                                <div class="border-gray-bottom pb-3 pt-2">
                                    <div class="float-left">
                                <span class="small-gray-text">
                                   Change in Supply
                                </span>
                                    </div>
                                    <div class="float-right text-right">
                                       <span ng-class="{'incAsset' : changeSupplyState == 'increment', 'decAsset' : changeSupplyState == 'decrement'}"
                                       >{{totalSupplyDiff}} {{changeSupplyInfo.symbol}}</span>
                                    </div>
                                    <br>
                                </div>
                            </section>
                        </div>

                        <div class="col-md-12">
                            <section class="row form-group">
                                <div class="border-gray-bottom pb-3 pt-2">
                                    <div class="float-left">
                                <span class="small-gray-text">
                                    New Total Supply
                                </span>
                                    </div>
                                    <div class="float-right text-right">
                                   <span class="fusion-text-14">
                                       {{newTotalSupply}} {{changeSupplyInfo.symbol}}
                                   </span>
                                    </div>
                                    <br>
                                </div>
                            </section>
                        </div>

                        <div class="col-md-12">
                            <section class="row form-group">
                                <div class="border-gray-bottom pb-3 pt-2" ng-show="transacData !== ''">
                                    <div class="float-left">
                                      <span class="small-gray-text">
                                Note
                            </span>
                                    </div>
                                    <div class="float-right">
                                        <span class="small-gray-text">{{transacData}}</span>
                                    </div>
                                    <br>
                                </div>
                            </section>
                        </div>

                        <div class="row form-group">
                            <div class="col-xs-12 clearfix">
                                <button class="btn btn-white btn-block"
                                        ng-click="changeSupplySuccess.close();">
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
                <h3 class="h3-title text-center">Create Asset</h3>

                <div class="row pt-2 pb-2">
                    <div class="col-md-12 text-center">
                        <img src="images/createasset1.svg"/>
                    </div>
                </div>
                <section class="row form-group">
                    <div class="col-sm-12 clearfix">
                        <span class="small-gray-text">
                            Asset Name
                        </span>
                        <input type="text"
                               class="form-control"
                               ng-model="assetCreate.assetName"
                               ng-change="onlyLettersAndNumbersAssetName(); createAssetErrorHandler()"
                               maxlength="35"
                               placeholder="Enter an Asset Name"/>
                        <span class="small-gray-text text-right w-100 float-right">{{assetCreate.assetName.length}}
                            /35</span>

                    </div>
                    <div class="col-sm-6">
                        <span class="small-gray-text">
                            Asset Symbol
                        </span>
                        <input type="text"
                               class="form-control"
                               maxlength="4"
                               ng-model="assetCreate.assetSymbol"
                               ng-change="onlyLettersAndNumbersAssetSymbol(); createAssetErrorHandler()"
                               placeholder="4 Characters or less"/>
                        <span class="small-gray-text text-right w-100 float-right">{{assetCreate.assetSymbol.length}}
                            /4</span>
                    </div>
                    <div class="col-sm-6">
                           <span class="small-gray-text">

                            Decimals
                        </span>
                        <input type="number"
                               min="0"
                               class="form-control"
                               ng-model="assetCreate.decimals"
                               ng-change="checkDecimalsValue(); createAssetErrorHandler()"
                               placeholder="Up to 15 Decimal Points"/>

                    </div>
                    <div class="col-md-12">
                            <span class="small-gray-text">
                                    Supply Type
                             </span>
                        <br>
                        <div class="col-md-6 p-0 pb-2">
                            <button class="btn btn-sm btn-white w-100" ng-click="assetCreate.canChange = false"
                                    ng-class="{'time-active' : assetCreate.canChange == false}">
                                Fixed
                            </button>
                        </div>
                        <div class="col-md-6 p-0 pb-2">
                            <button class="btn btn-sm btn-white w-100" ng-click="assetCreate.canChange = true"
                                    ng-class="{'time-active' : assetCreate.canChange == true}">
                                Changeable
                            </button>
                        </div>
                    </div>
                    <div class="col-sm-12 clearfix">
                        <span class="small-gray-text">
                            Total Supply
                        </span>
                        <input type="text"
                               min="0"
                               step="1"
                               class="form-control"
                               numbers-only
                               ng-change="checkTotalSupply(); createAssetErrorHandler()"
                               ng-model="assetCreate.totalSupply"
                               placeholder="Must be a whole number"/>
                    </div>
                </section>

                <div class="row form-group">
                    <div class="col-md-6 col-xs-12 clearfix">
                        <a class="btn btn-white btn-block"
                           ng-click="createAssetModal.close()">
                            Cancel
                        </a>
                    </div>
                    <div class="col-md-6 col-xs-12 clearfix">
                        <button ng-click="createAssetAttributes.open()"
                                ng-class="{'disabled' : createAssetHasError}"
                                ng-disabled="createAssetHasError"
                                class="btn btn-primary btn-block">
                            Next
                        </button>
                    </div>
                </div>
            </article>

        </section>
    </section>
</article>
<article class="modal fade" id="createAssetAttributes" tabindex="-1">
    <section class="modal-dialog">
        <section class="modal-content">
            <article class="block" ng-hide="wallet.type=='addressOnly'">
                <div class="col-md-12 p-0">
                    <div class="float-right">
                                  <span class="gray-text" ng-click="createAssetAttributes.close();">                    <i
                                              class="fa fa-times"
                                              aria-hidden="true"></i>
</span>
                    </div>
                </div>
                <h3 class="h3-title text-center">Create Asset</h3>

                <div class="row pt-2 pb-2">
                    <div class="col-md-12 text-center">
                        <img src="images/createasset2.svg"/>
                    </div>
                </div>
                <div class="col-md-12 p-0">
                    <div class="warn alert-blue text-left p-2 inline w-100 mt-2 mb-2">
                        Add attributes to your asset. These attributes can be edited at after the asset is created.
                        (Optional)
                    </div>
                </div>
                <section class="row form-group">
                    <div>
                        <div class="col-sm-6 clearfix">
                        <span class="small-gray-text">
                            Attribute
                        </span>
                        </div>
                        <div class="col-sm-6">
                        <span class="small-gray-text">
                            Attribute Field
                        </span>
                        </div>
                    </div>
                </section>
                <section class="row form-group">
                    <div ng-repeat="attribute in totalAttributes track by $index"
                    >
                        <div class="col-sm-6 clearfix">
                            <input type="text"
                                   class="form-control"
                                   ng-model="attributename[attribute]"
                                   ng-change="checkAllAttributesLength()"
                                   placeholder="Enter an attribute"/>

                        </div>
                        <div class="col-sm-6">
                            <input type="text"
                                   class="form-control"
                                   ng-model="attributevalue[attribute]"
                                   ng-change="checkAllAttributesLength()"
                                   placeholder="Enter an attribute value"/>
                        </div>
                    </div>
                    <div class="text-left col-md-12">
                        <div class="float-left">
                            <a class="valid-feedback"
                               ng-click="addAttribute()"
                            >+ Add Attribute</a>
                        </div>
                        <div class="float-right">
                            <a class="invalid-feedback"
                               ng-click="removeAttribute()"
                            >- Remove Last Attribute</a>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="warn alert-yellow text-left p-2 inline w-100 mt-2"
                             ng-show="showMaxCharacters">
                            <i class="fa fa-exclamation-triangle" aria-hidden="true"></i>
                            {{usedChars}}/{{usableChars}} total characters used
                        </div>
                        <div class="warn alert-red-error text-left p-2 inline w-100 mt-2"
                             ng-show="usedChars >= usableChars && !showMaxCharacters">
                            <i class="fa fa-exclamation-triangle" aria-hidden="true"></i>
                            {{usedChars}}/{{usableChars}} total characters used
                        </div>
                    </div>
                </section>

                <div class="row form-group">
                    <div class="col-md-6 col-xs-12 clearfix">
                        <a class="btn btn-white btn-block"
                           ng-click="createAssetModal.open();">
                            Back
                        </a>
                    </div>
                    <div class="col-md-6 col-xs-12 clearfix">
                        <button class="btn btn-primary btn-block"
                                ng-disabled="assetCreate.totalSupply <= 0"
                                ng-class="{'disabled' : assetCreate.totalSupply <= 0}"
                                ng-click="returnAttributesJSON();createAssetReviewOpen()">
                            Review
                        </button>
                    </div>
                </div>
            </article>

        </section>
    </section>
</article>
<article class="modal fade" id="createAssetReview" tabindex="-1">
    <section class="modal-dialog">
        <section class="modal-content">
            <article class="block" ng-hide="wallet.type=='addressOnly'">
                <div class="col-md-12 p-0">
                    <div class="float-right">
                                  <span class="gray-text" ng-click="createAssetReview.close();">                    <i
                                              class="fa fa-times"
                                              aria-hidden="true"></i>
</span>
                    </div>
                </div>

                <h3 class="h3-title text-center">Create Asset</h3>

                <div class="row pt-2 pb-2">
                    <div class="col-md-12 text-center">
                        <img src="images/createasset3.svg"/>
                    </div>
                </div>

                <div class="col-md-12">
                    <section class="row form-group">
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

                        <div class="pb-2 pt-2" ng-show="showAttributesTab">
                            <div class="float-left">
                                <span class="small-gray-text">
                                    Attributes
                                </span>
                            </div>
                            <div class="float-right">
                                <span class="fusion-text-14">{{totalAttributes.length}}</span>
                                <a class="link-blue text-right"
                                   ng-hide="showAttributes"
                                   ng-click="showAttributes = !showAttributes">Show <img src="images/Down.svg"></a>
                                <a class="link-blue text-right"
                                   ng-show="showAttributes"
                                   ng-click="showAttributes = !showAttributes">Hide <img src="images/Up.svg"></a>
                            </div>
                            <br>
                            <div class="col-md-12 p-0">
                                <div ng-show="showAttributes" class="gray-bg-new p-2">
                                    <div ng-repeat="(key, value) in allAttributes">
                                        <div class="col-md-12">
                                            <div class="row">
                                                <div class="col-md-6 text-left p-0 text-gray">{{key}}</div>
                                                <div class="col-md-6 text-right p-0 fusion-text-14">{{value}}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row form-group">
                            <div class="col-md-6 col-xs-12 clearfix">
                                <a class="btn btn-white btn-block"
                                   ng-click="createAssetReview.close(); createAssetAttributes.open();">
                                    Back
                                </a>
                            </div>
                            <div class="col-md-6 col-xs-12 clearfix">
                                <button class="btn btn-primary btn-block"
                                        ng-disabled="assetCreate.totalSupply <= 0"
                                        ng-class="{'disabled' : assetCreate.totalSupply <= 0}"
                                        ng-click="createAsset()">
                                    Create Asset
                                </button>
                            </div>
                        </div>

                    </section>
                </div>
            </article>

        </section>
    </section>
</article>
<article class="modal fade" id="createAssetFinal" tabindex="-1">
    <section class="modal-dialog">
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
                                <a href="https://blocks.fusionnetwork.io/Transactions/{{assetCreate.assetHash}}"
                                   target="_blank">
                                   <span class="fusion-text-14" data-toggle="tooltip" data-placement="top"
                                         title="{{assetCreate.assetHash}}">
                                       {{assetCreate.assetHash}}
                                   </span>
                                </a>
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

                        <div class="pb-2 pt-2" ng-show="showAttributesTab">
                            <div class="float-left">
                                <span class="small-gray-text">
                                    Attributes
                                </span>
                            </div>
                            <div class="float-right">
                                <span class="fusion-text-14">{{totalAttributes.length}}</span>
                                <a class="link-blue text-right"
                                   ng-hide="showAttributes"
                                   ng-click="showAttributes = !showAttributes">Show <img src="images/Down.svg"></a>
                                <a class="link-blue text-right"
                                   ng-show="showAttributes"
                                   ng-click="showAttributes = !showAttributes">Hide <img src="images/Up.svg"></a>
                            </div>
                            <br>
                            <div class="col-md-12 p-0">
                                <div ng-show="showAttributes" class="gray-bg-new p-2">
                                    <div ng-repeat="(key, value) in allAttributes">
                                        <div class="col-md-12">
                                            <div class="row">
                                                <div class="col-md-6 text-left p-0 text-gray">{{key}}</div>
                                                <div class="col-md-6 text-right p-0 fusion-text-14">{{value}}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
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
