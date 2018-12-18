<!DOCTYPE html>
<html lang="en" ng-app="mewApp">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>My FUSION Wallet</title>
    <meta property="og:title" content="MyEtherWallet.com: Your Key to Ethereum">
    <meta property="og:site_name" content="MyEtherWallet.com: Your Key to Ethereum">
    <meta name="twitter:title" content="MyEtherWallet.com: Your Key to Ethereum">
    <meta name="apple-mobile-web-app-title" content="MyEtherWallet.com: Your Key to Ethereum">
    <link href="https://www.myetherwallet.com" rel="canonical">
    <meta content="https://www.myetherwallet.com" property="og:url">
    <meta content="https://www.myetherwallet.com" name="twitter:url">
    <link rel="stylesheet" href="css/etherwallet-master.min.css">
    <script type="text/javascript" src="js/etherwallet-static.min.js"></script>
    <script type="text/javascript" src="js/etherwallet-master.js"></script>
    <meta name="description"
          content="MyEtherWallet (MEW) is a free, open-source, client-side interface for generating Ethereum wallets & more. Interact with the Ethereum blockchain easily & securely.">
    <meta property="og:description"
          content="Free, open-source, client-side Ethereum wallet. Enabling you to interact with the blockchain easily & securely.">
    <meta name="twitter:description"
          content="Free, open-source, client-side Ethereum wallet. Enabling you to interact with the blockchain easily & securely.">
    <meta name="robots" content="index,follow">
    <meta name="googlebot" content="index,follow">
    <meta name="google-site-verification" content="IpChQ00NYUQuNs_7Xs6xlnSdzalOlTUYbBsr8f7OpvM"/>
    <link href="images/fav/apple-touch-icon.png" rel="apple-touch-icon" sizes="180x180">
    <link href="images/fav/favicon-32x32.png" rel="icon" type="image/png" sizes="32x32">
    <link href="images/fav/favicon-16x16.png" rel="icon" type="image/png" sizes="16x16">
    <link href="images/fav/manifest.json" rel="manifest">
    <link href="images/fav/safari-pinned-tab.svg" rel="mask-icon" color="#2f99b0">
    <link href="images/fav/favicon.ico" rel="shortcut icon">
    <meta name="apple-mobile-web-app-title" content="MyEtherWallet &middot; Your Key to Ethereum">
    <meta name="application-name" content="MyEtherWallet">
    <meta name="msapplication-config" content="images/fav/browserconfig.xml">
    <meta name="theme-color" content="#1d6986">
    <meta name="apple-mobile-web-app-status-bar-style" content="#1d6986">
    <meta property="og:url" content="https://www.myetherwallet.com"/>
    <meta property="og:title" content="MyEtherWallet.com  &middot; Your Key to Ethereum"/>
    <meta property="og:type" content="website">
    <meta property="og:image" content="/images/myetherwallet-logo-banner.png"/>
    <meta property="og:image" content="/images/myetherwallet-logo.png"/>
    <meta property="og:image" content="/images/myetherwallet-logo-square.png"/>
    <meta property="og:image" content="/images/myetherwallet-banner-fun.jpg"/>
    <meta name="twitter:image" content="/images/myetherwallet-logo-twitter.png">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:site" content="@MyEtherWallet">
    <meta name="twitter:creator" content="@MyEtherWallet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css"/>

    <script type="application/ld+json">
{
"@context": "http://schema.org",
"@type" : "Organization",
"name" : "MyEtherWallet",
"legalName" : "MyEtherWallet Inc",
"url" : "https://www.myetherwallet.com/",
"contactPoint" : [{
  "@type" : "ContactPoint",
  "email" : "support@myetherwallet.com",
  "url"   : "https://myetherwallet.com",
  "contactType" : "customer service"
}],
"logo" : "https://www.myetherwallet.com/images/myetherwallet-logo.png",
"description": "MyEtherWallet.com is a free, open-source, client-side interface for generating Ethereum wallets &amp; more. Interact with the Ethereum blockchain easily &amp; securely.",
"sameAs" : [
  "https://www.myetherwallet.com/",
  "https://chrome.google.com/webstore/detail/myetherwallet-cx/nlbmnnijcnlegkjjpcfjclmcfggfefdm",
  "https://www.facebook.com/MyEtherWallet/",
  "https://twitter.com/myetherwallet",
  "https://medium.com/@myetherwallet",
  "https://kb.myetherwallet.com/",
  "https://github.com/kvhnuke/etherwallet",
  "https://github.com/MyEtherWallet",
  "https://kvhnuke.github.io/etherwallet/","https://myetherwallet.slack.com/"
]
}



    </script>
</head>
<body>
<header ng-controller='tabsCtrl'>
    <header class="bg-white border-gray-bottom {{curNode.name}} {{curNode.service}} {{curNode.service}} nav-index-{{gService.currentTab}}"
            aria-label="header">
        <div class="header-container p-0">
            <section class="bg-white header-branding border-gray-bottom ">
                <section class="container">
                    @@if (site === 'mew' ) {
                    <div class="align-self-center">
                        <a class="brand" href="/" aria-label="Go to homepage">
                            <img src="images/fsn-logo.svg" height="80px" width="125px" alt="MyFusionWallet"/>
                        </a>
                    </div>
                    <div class="align-self-center p-2">
                        <span class="hidden-xs text-fusion fusion-header-text">|</span>
                    </div>
                    <span class="dropdown dropdown-node">
                        <a tabindex="0"
                           aria-haspopup="true"
                           class="dropdown-toggle  btn btn-white text-16"
                           ng-click="dropdownMenu = !dropdownMenu">
                                       <img src="images/group-2-copy-4.svg"
                                            class="Group-2-Copy-4 Group-6">
 My Wallet
                        </a>
                        <div class="dropdown-menu fusion-text-14 p-2 higher-min-width" ng-show="dropdownMenu">
                              <div class="col-md-12 p-2">
                             <span class="small-gray-text">Apps</span>
                            </div>
                            <a href="" target="_blank" class="col-md-12 p-2 app-select-active">
                                    <span class="fusion-text-14">
                                  <img src="images/group-5.svg"
                                       class="Group-6">
                                      My Wallet
                                    </span>
                            </a>
                            <a href="" target="_blank" class="col-md-12 p-2 app-select-active">
                                    <span class="fusion-text-14">
                                    <img src="images/group-6.svg"
                                         class="Group-6">
                                      Asset Locking
                                    </span>
                            </a>
                               <a href="" target="_blank" class="col-md-12 p-2 app-select-active">
                                    <span class="fusion-text-14">
                                    <img src="images/group-7.svg"
                                         class="Group-6">
                                      Autobuy Stake
                                    </span>
                            </a>
                               <a href="http://blocks.fusionnetwork.io/" target="_blank"
                                  class="col-md-12 p-2 app-select-active">

                                    <span class="fusion-text-14">
                                    <img src="images/group-8.svg"
                                         class="Group-6">
                                      Block Explorer
                                    </span>
                            </a>
                               <a href="http://node.fusionnetwork.io" target="_blank"
                                  class="col-md-12 p-2 app-select-active">

                                    <span class="fusion-text-14">
                                    <img src="images/monitor.svg"
                                         class="Group-6">
                                      Network Monitor
                                    </span>
                            </a>
                               <a href="" target="_blank"
                                  class="col-md-12 p-2 app-select-active">
                                    <span class="fusion-text-14">
                                    <img src="images/group-9.svg"
                                         class="Group-6">
                                      Swap Exchange
                                    </span>
                            </a>
                        </div>
                    </span>
                    <div class="align-self-center">
                        <span class="badge badge-secondary text-fusion ml-4">1.00.00</span>
                    </div>

                    <!-- Warning: The separators you see on the frontend are in styles/etherwallet-custom.less. If you add / change a node, you have to adjust these. Ping tayvano if you're not a CSS wizard -->
                    <div class="tagline hidden-xs">
                        <a class="dropdown-toggle btn btn-gray m-3"
                           href="https://forms.office.com/Pages/ResponsePage.aspx?id=EW3s-wk4CEOiM1Aj1P3e9ATvewrXjsFAmw64pIT0-PhUMjhVNFRCMVZLU0ZFTFU2MTZGWUdENjkyRy4u"
                           target="_blank">Feedback</a>
                        <span class="dropdown dropdown-node" ng-cloak>
      <a tabindex="0"
         aria-haspopup="true"
         aria-label="change node. current node {{curNode.name}} node by {{curNode.service}}"
         class="dropdown-toggle btn btn-gray"
         ng-click="dropdownNode = !dropdownNode">
           <span translate="X_Network">Network:</span>
          {{curNode.name}}
          <small>({{curNode.service}})</small>
           <i class="caret"></i>
      </a>
      <ul class="dropdown-menu" ng-show="dropdownNode">
        <li ng-repeat="(key, value) in nodeList">
          <a ng-class="{true:'active'}[curNode == key]" ng-click="changeNode(key)">
            {{value.name}}
              <small> ({{value.service}}) </small>
            <img ng-show="value.service=='Custom'" src="images/icon-remove.svg" class="node-remove"
                 title="Remove Custom Node" ng-click="removeNodeFromLocal(value.name)"/>
          </a>
        </li>
        <li>
          <a ng-click="customNodeModal.open(); dropdownNode = !dropdownNode;" translate="X_Network_Custom">
            Add Custom Network / Node
          </a>
        </li>
      </ul>
    </span>

                    </div>
                    }
                </section>
            </section>

            @@if (site === 'mew' ) { @@include( './header-node-modal.tpl', { "site": "mew" } ) }
            @@if (site === 'cx' ) { @@include( './header-node-modal.tpl', { "site": "cx" } ) }
        </div>
    </header>
    <article class="clearfix container-small">
        <nav role="navigation" aria-label="main navigation" class="nav-container overflowing">
            <a aria-hidden="true" ng-show="showLeftArrow" class="nav-arrow-left" ng-click="scrollLeft(100);"
               ng-mouseover="scrollHoverIn(true,2);" ng-mouseleave="scrollHoverOut()">&#171;</a>
            <div class="nav-scroll">
                <ul class="nav-inner">
                    @@if (site === 'mew' ) {
                    <li ng-repeat="tab in tabNames track by $index" \
                        class="nav-item {{tab.name}}" \
                        ng-class="{active: $index==gService.currentTab}"
                        ng-show="tab.mew"
                        ng-click="tabClick($index)">
                        <a tabindex="0" aria-label="nav item: {{tab.name | translate}}" translate="{{tab.name}}"></a>
                    </li>
                    }
                    @@if (site === 'cx' ) {
                    <li ng-repeat="tab in tabNames track by $index" \
                        class="nav-item {{tab.name}}" \
                        ng-class="{active: $index==gService.currentTab}"
                        ng-show="tab.cx"
                        ng-click="tabClick($index)">
                        <a tabindex="0" aria-label="nav item: {{tab.name | translate}}" translate="{{tab.name}}"></a>
                    </li>
                    }
                    <li class="nav-item" ng-show="MEWconnectActive" ng-cloak>
                        <div style="margin-left: 20px;">
                            <div ng-show="MEWconnectState == 0" style="border-bottom: solid 2px #929292">
                                <h4><img src="images/MEWconnectLogo.svg" width="120" height="26"> Not Connected</h4>
                            </div>
                            <div ng-show="MEWconnectState == 1" style="border-bottom: solid 2px #1995be">
                                <h4><img src="images/MEWconnectLogo.svg" width="120" height="26"
                                         style="margin-right: 10px">Preparing Connection</h4>
                            </div>
                            <div ng-show="MEWconnectState == 2" style="border-bottom: solid 2px #23aeb2">
                                <h4><img src="images/MEWconnectLogo.svg" width="120" height="26"> Connected</h4>
                            </div>
                            <div ng-show="MEWconnectState == 3" style="border-bottom: solid 2px #febe1a">
                                <h4><img src="images/MEWconnectLogo.svg" width="120" height="26"> Timed Out</h4>
                            </div>
                            <div ng-show="MEWconnectState == 4" style="border-bottom: solid 2px #e74d41">
                                <h4><img src="images/MEWconnectLogo.svg" width="120" height="26"> Disconnected</h4>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <a aria-hidden="true"
               ng-show="showRightArrow"
               class="nav-arrow-right"
               ng-click="scrollRight(100);"
               ng-mouseover="scrollHoverIn(false,2);"
               ng-mouseleave="scrollHoverOut()">&#187;</a>
        </nav>
    </article>
</header>

