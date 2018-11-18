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
            <a class="btn btn-sm btn-primary"
               data-toggle="modal"
               data-target="#createAsset"
               ng-click="createAssetModal()"
            >
                + Create Asset
            </a>
            <a class="btn btn-sm btn-primary"
               data-toggle="modal"
               data-target="#txModal"
               ng-click="txModalOpen()"
            >
                Send Assets
            </a>        </div>
    </div>
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

<div class="col-sm-9" ng-click="getAllFsnAssets()">
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
            <address-field placeholder="0xDECAF9CD2367cdbb726E904cD6397eDFcAe6068D" var-name="tx.to"></address-field>
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

<article class="modal fade" id="createAsset" tabindex="-1">
    <section class="modal-dialog">
        <section class="modal-content">
            <article class="block" ng-hide="wallet.type=='addressOnly'">

                <h3>Generate Asset</h3>
                <section class="row form-group">
                    <div class="col-sm-12 clearfix">
                        <label>
                            Asset Symbol:
                        </label>
                        <input type="text"
                               class="form-control"
                               ng-model="assetCreate.assetSymbol"
                               placeholder=""/>
                    </div>
                    <div class="col-sm-12 clearfix">
                        <label>
                            Asset Name:
                        </label>
                        <input type="text"
                               class="form-control"
                               ng-model="assetCreate.assetName"
                               placeholder=""/>
                    </div>
                    <div class="col-sm-12 clearfix">
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

            </article>

        </section>
    </section>
</article>


<div class="col-sm-9">

    <!-- Generate Asset -->

</div>
<!-- / Content -->


<!-- / Sidebar -->
