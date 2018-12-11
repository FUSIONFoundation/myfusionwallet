<main class="tab-pane block--container active container-small"
      ng-if="globalService.currentTab==globalService.tabs.generateWallet.id"
      ng-controller='walletGenCtrl'
      role="main"
      ng-cloak>

    <article class="block__wrap gen__1" ng-show="!wallet && !showGetAddress">
        <section class="block__main gen__1--inner">
            <br/>
            <div class="col-md-12">
                <h4 translate="NAV_GenerateWallet" aria-live="polite" class="text-fusion">
                    Create New Wallet
                </h4>
                <h5 translate="GEN_Label_1" class="text-fusion">
                    Enter password
                </h5>
            </div>
            <div class="input-group">
                <input name="password"
                       class="form-control"
                       type="{{showPass && 'password' || 'text'}}"
                       placeholder="{{'GEN_Placeholder_1' | translate }}"
                       ng-model="password"
                       ng-class="isStrongPass() ? 'is-valid' : 'is-invalid'"
                       aria-label="{{'GEN_Label_1' | translate}}"
                />
            </div>
            <div class="input-group text-center">
                <button tabindex="0"
                        role="button"
                        class="btn btn-xs btn-primary"
                        ng-click="genNewWallet()"
                        translate="NAV_GenerateWallet">
                    Generate Wallet
                </button>
            </div>
            <p>This password encrypts your private key. This does not act as a seed to generate your keys. You will need
                this password + your private key to unlock your wallet.</p>
        </section>
    </article>


    <article role="main" class="block__wrap gen__2" ng-show="wallet && !showPaperWallet"> <!-- -->

        <section class="block__main gen__2--inner">
            <br/>
            <h1 translate="GEN_Label_2">
                Save your Keystore File (UTC / JSON)
            </h1>

            <a tabindex="0" role="button"
               class="btn btn-white"
               href="{{blobEnc}}"
               download="{{encFileName}}"
               aria-label="{{'x_Download'|translate}} {{'x_Keystore'|translate}}"
               aria-describedby="x_KeystoreDesc"
               ng-click="downloaded()"
               rel="noopener noreferrer">
        <span translate="x_Download">
          DOWNLOAD
        </span>
                <span translate="x_Keystore2">
          Keystore File (UTC / JSON)
        </span>
            </a>

            <div class="warn">
                <p class="GEN_Warning_1">
                    **Do not lose it!** It cannot be recovered if you lose it.
                </p>
                <p class="GEN_Warning_2">
                    **Do not share it!** Your funds will be stolen if you use this file on a malicious/phishing site.
                </p>
                <p class="GEN_Warning_3">
                    **Make a backup!** Secure it like the millions of dollars it may one day be worth.
                </p>
            </div>

            <p>
                <button tabindex="0"
                   role="button"
                   class="btn btn-primary"
                   ng-class="fileDownloaded ? '' : 'disabled' "
                   ng-click="continueToPaper()">
            <span translate="GET_ConfButton">
              I understand. Continue.
            </span>
                </button>
            </p>

        </section>
    </article>


    <article role="main" class="block__wrap gen__3" ng-show="showPaperWallet">

        <section class="block__main gen__3--inner">

            <br/>

            <h1 translate="GEN_Label_5"> Save your Private Key</h1>
            <textarea aria-label="{{'x_PrivKey'|translate}}"
                      aria-describedby="{{'x_PrivKeyDesc'|translate}}"
                      class="form-control"
                      readonly="readonly"
                      rows="3"
                      style="max-width: 50rem;margin: auto;"
            >{{wallet.getPrivateKeyString()}}</textarea>
            <br/>

            <a tabindex="0"
               aria-label="{{'x_Print'|translate}}"
               aria-describedby="x_PrintDesc"
               role="button"
               class="btn btn-primary"
               ng-click="printQRCode()"
               translate="x_Print">
                PRINT
            </a>

            <div class="warn">
                <p>
                    **Do not lose it!** It cannot be recovered if you lose it.
                </p>
                <p>
                    **Do not share it!** Your funds will be stolen if you use this file on a malicious/phishing site.
                </p>
                <p>
                    **Make a backup!** Secure it like the millions of dollars it may one day be worth.
                </p>
            </div>

            <br/>

            <a class="btn btn-default btn-sm" ng-click="getAddress()">
                <span translate="GEN_Label_3"> Save your Address </span> →
            </a>

        </section>

    </article>

    <article class="text-left" ng-show="showGetAddress">
        <div class="clearfix collapse-container">

            <div ng-click="wd = !wd">
                <a class="collapse-button"><span ng-show="wd">+</span><span ng-show="!wd">-</span></a>
                <h1 traslate="GEN_Unlock">Unlock your wallet to see your address</h1>
                <p translate="x_AddessDesc"></p>
            </div>

            <div ng-show="!wd">
                @@if (site === 'mew' ) {
                <wallet-decrypt-drtv></wallet-decrypt-drtv>
                }
                @@if (site === 'cx' ) {
                <cx-wallet-decrypt-drtv></cx-wallet-decrypt-drtv>
                }
            </div>
        </div>

        <div class="row" ng-show="wallet!=null" ng-controller='viewWalletCtrl'>
            @@if (site === 'cx' ) { @@include( './viewWalletInfo-content.tpl', { "site": "cx" } ) }
            @@if (site === 'mew') { @@include( './viewWalletInfo-content.tpl', { "site": "mew" } ) }
        </div>

    </article>
</main>
