<main class="tab-pane active"
      ng-if="globalService.currentTab==globalService.tabs.ens.id"
      ng-controller='ensCtrl'
      ng-init="init()"
      ng-cloak >

  <!-- Header : todo turn into warning notification-->
  <div class="alert alert-info" ng-show="hasQueryString">
    <p translate="WARN_Send_Link">
      You arrived via a link that has the address, amount, gas or data fields filled in for you. You can change any information before sending. Unlock your wallet to get started.
    </p>
  </div>


  <!-- Unlock Wallet -->
  <article class="collapse-container">
    <div ng-click="wd = !wd">
      <a class="collapse-button"><span ng-show="wd">+</span><span ng-show="!wd">-</span></a>
      <h1>
        Swaps
      </h1>
    </div>
    <div ng-show="!wd">
      @@if (site === 'cx' )  {  <cx-wallet-decrypt-drtv></cx-wallet-decrypt-drtv>   }
      @@if (site === 'mew' ) {  <wallet-decrypt-drtv></wallet-decrypt-drtv>         }
    </div>
  </article>


  <!-- Send Tx Content -->
  <article class="row" ng-show="wallet!=null">
    @@if (site === 'mew' ) { @@include( './swaps-content.tpl', { "site": "mew" } ) }
    @@if (site === 'cx'  ) { @@include( './swaps-content.tpl', { "site": "cx"  } ) }

  </article>


</main>
