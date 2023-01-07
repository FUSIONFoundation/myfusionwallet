<!DOCTYPE html>
<html lang="en" ng-app="mewApp">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>My FUSION Wallet</title>
    <meta property="og:title" content="MyFusionWallet.com: The FUSION Wallet">
    <meta property="og:site_name" content="MyFusionWallet.com: The FUSION Wallet">
    <meta name="twitter:title" content="MyFusionWallet.com: The FUSION Wallet">
    <meta name="apple-mobile-web-app-title" content="MyFusionWallet.com: The FUSION Wallet">
    <link href="https://www.myetherwallet.com" rel="canonical">
    <meta content="https://www.myetherwallet.com" property="og:url">
    <meta content="https://www.myetherwallet.com" name="twitter:url">
    <link rel="stylesheet" href="css/etherwallet-master.min.css">
    <script type="text/javascript" src="js/etherwallet-static.min.js"></script>
    <script type="text/javascript" src="js/etherwallet-master.js"></script>
    <script type="text/javascript" src="js/jquery-1.12.3.min.js"></script>
    <script type="text/javascript" src="js/ui-bootstrap.js"></script>
    <script type="text/javascript" src="js/angular-click-outside.js"></script>
    <meta name="description"
          content="MFW is a free client-side interface for creating and using Fusion wallets. This enables users to test a suite of innovate functions developed by the FUSION Foundation.">
    <meta property="og:description"
          content="MFW is a free client-side interface for creating and using Fusion wallets. This enables users to test a suite of innovate functions developed by the FUSION Foundation.">
    <meta name="twitter:description"
          content="MFW is a free client-side interface for creating and using Fusion wallets. This enables users to test a suite of innovate functions developed by the FUSION Foundation.">
    <meta name="robots" content="index,follow">
    <meta name="googlebot" content="index,follow">
    <meta name="google-site-verification" content="IpChQ00NYUQuNs_7Xs6xlnSdzalOlTUYbBsr8f7OpvM"/>
    <link href="images/fav/apple-touch-icon.png" rel="apple-touch-icon" sizes="180x180">
    <link href="images/fav/favicon-32x32.png" rel="icon" type="image/png" sizes="32x32">
    <link href="images/fav/favicon-16x16.png" rel="icon" type="image/png" sizes="16x16">
    <link href="images/fav/manifest.json" rel="manifest">
    <link href="images/fav/safari-pinned-tab.svg" rel="mask-icon" color="#2f99b0">
    <link href="images/fav/favicon.ico" rel="shortcut icon">
    <meta name="apple-mobile-web-app-title" content="MyFusionWallet">
    <meta name="application-name" content="MyFusionWallet">
    <meta name="msapplication-config" content="images/fav/browserconfig.xml">
    <meta name="theme-color" content="#1d6986">
    <meta name="apple-mobile-web-app-status-bar-style" content="#1d6986">
    <meta property="og:url" content="https://www.myfusionwallet.com"/>
    <meta property="og:title" content="MyFusionWallet.com"/>
    <meta property="og:type" content="website">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css"/>

    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-112428858-2"></script>
    <script>
        window.dataLayer = window.dataLayer || [];

        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'UA-112428858-2');
    </script>

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
    @@include( '../includes/warning.tpl', {"site": "mew" } )
    <header class="bg-white border-gray-bottom {{curNode.name}} {{curNode.service}} {{curNode.service}} nav-index-{{gService.currentTab}}"
            aria-label="header">
        <div class="header-container p-0">
            @@if (site === 'mew' ) { @@include( './header-node-modal.tpl', { "site": "mew" } ) }
            @@if (site === 'cx' ) { @@include( './header-node-modal.tpl', { "site": "cx" } ) }
            <section class="bg-white header-branding">
                <section class="container p-0">
                    @@if (site === 'mew' ) {
                    <div class="align-self-center">
                        <a class="brand" href="/" aria-label="Go to homepage">
                            <img src="images/fsn-logo.svg" alt="MyFusionWallet"/>
                        </a>
                    </div>
                    <div class="align-self-center p-1">
                        <span class="hidden-xs text-fusion fusion-header-text"></span>
                    </div>
                    <span class="dropdown dropdown-node">
                        <a tabindex="0"
                           aria-haspopup="true"
                           class="dropdown-toggle btn btn-white mr-2 border-0"
                           ng-click="dropdownMenu = !dropdownMenu">
                                <img src="images/app-grid.svg"
                                    class="Group-2-Copy-4 Group-6">
                                <span>Wallet</span>
                        </a>
                        <div class="dropdown-menu fusion-text-14 p-2 higher-min-width" ng-hide="!dropdownMenu"
                             tw-click-outside="closeDropDownMenu()" ignore-if="!dropdownMenu">
                              <div class="col-md-12 col-xs-12 p-2">
                             <span class="small-gray-text">Apps</span>
                            </div>
                            <a href="https://www.myfusionwallet.com" target="_blank"
                               class="col-md-12 col-xs-12 p-2 app-select-active">
                                    <span class="fusion-text-14">
                                  <img src="images/group-5.svg"
                                       class="Group-6">
                                      Wallet
                                    </span>
                            </a>
                            <a href="https://assetgateway.fusionnetwork.io" target="_blank"
                               class="col-md-12 col-xs-12 p-2 app-select-active">
                                    <span class="fusion-text-14">
                                    <img src="images/group-6.svg"
                                         class="Group-6">
                                      Asset Gateway
                                    </span>
                            </a>
                               <a href="https://blocks.fusionnetwork.io/#!/" target="_blank"
                                  class="col-md-12 col-xs-12 p-2 app-select-active">

                                    <span class="fusion-text-14">
                                    <img src="images/group-8.svg"
                                         class="Group-6">
                                      Block Explorer
                                    </span>
                            </a>
                               <a href="http://node.fusionnetwork.io" target="_blank"
                                  class="col-md-12 col-xs-12 p-2 app-select-active">

                                    <span class="fusion-text-14">
                                    <img src="images/monitor.svg"
                                         class="Group-6">
                                      Network Monitor
                                    </span>
                            </a>
                        </div>
                    </span>

                    <div class="header-links">

                         @@if (site === 'mew' ) {
                        <div class="header-link"
                            ng-show="!walletAvailable"
                            ng-class="{active: 0==gService.currentTab}"
                            ng-click="tabClick(0)">
                            <a tabindex="0" class="title">
                                <img src="images/tab-icon-wallet-active.svg" ng-show="0==gService.currentTab" width="24" height="24" class="icon">
                                <img src="images/tab-icon-wallet-inactive.svg" ng-show="0!=gService.currentTab" width="24" height="24" class="icon">
                                Create Wallet
                            </a>
                        </div>
                        <div class="header-link" \
                            ng-class="{active: 3==gService.currentTab}"
                            ng-click="tabClick(3)">
                            <a tabindex="0" class="title">
                                <img src="images/tab-icon-wallet-active.svg" ng-show="3==gService.currentTab" width="24" height="24" class="icon">
                                <img src="images/tab-icon-wallet-inactive.svg" ng-show="3!=gService.currentTab" width="24" height="24" class="icon">
                                Wallet Dashboard
                            </a>
                        </div>
                        <div class="header-link" \
                            ng-class="{active: 7==gService.currentTab}"
                            >
                            <a tabindex="0" class="title" style="cursor: not-allowed;">
                                <img src="images/tab-icon-swap-active.svg" ng-show="7==gService.currentTab" width="24" height="24" class="icon">
                                <img src="images/tab-icon-swap-inactive.svg" ng-show="7!=gService.currentTab" width="24" height="24" class="icon">
                                Quantum Swaps
                            </a>
                        </div>
                        }
                        @@if (site === 'cx' ) {
                        <div ng-repeat="tab in tabNames track by $index" \
                            class="nav-item {{tab.name}} header-link" \
                            ng-class="{active: $index==gService.currentTab}"
                            ng-show="tab.cx"
                            ng-click="tabClick($index)">
                            <a tabindex="0" aria-label="nav item: {{tab.name | translate}}"
                               translate="{{tab.name}}" class="title"></a>
                        </div>
                        }
                    </div>
                    <div class="hidden-xs">
                        <span class="badge badge-secondary text-fusion ml-4">{{versionNumber}}</span>
                        <span class="badge badge-secondary text-fusion mr-1"><i class="fa fa-cube"></i> {{latestBlock}}</span>
                    </div>

                    <!-- Warning: The separators you see on the frontend are in styles/etherwallet-custom.less. If you add / change a node, you have to adjust these. Ping tayvano if you're not a CSS wizard -->
                    <div class="tagline">
                        <a class="dropdown-toggle btn btn-gray m-3 hidden-xs"
                           href="https://t.me/FsnDevCommunity"
                           target="_blank">Feedback</a>
                        <div class="dropdown dropdown-node">
                            <a tabindex="0"
                               aria-haspopup="true"
                               class="dropdown-toggle  btn btn-white text-16"
                               style="margin-top:3px"
                               ng-click="dropdownCustom = !dropdownCustom">
                                {{nodeName}}
                                <img src="images/caret-down-2.svg"
                                    class="Group-2-Copy-4 Group-6 dropdown-caret">
                            </a>
                            <div class="dropdown-menu fusion-text-14 p-2 higher-min-width" ng-show="dropdownCustom" tw-click-outside="closedropdownCustom()" ignore-if="!dropdownCustom">
                                <button class="btn btn-sm btn-white w-100"
                                        ng-click="netSwitch('mainnet'); window.location.reload();">Mainnet
                                </button>
                                <button class="btn btn-sm btn-white w-100"
                                        ng-click="netSwitch('testnet'); window.location.reload();">Testnet</button>
                                <span class="small-gray-text">Node URL:</span>
                                <input type="text" class="form-control" ng-model="inputUrl" placeholder="URL">
                                <span class="small-gray-text">Chain ID:</span>
                                <input type="text" class="form-control" ng-model="chainId" placeholder="ID / 1">
                                <button class="btn btn-sm btn-white w-100"
                                        ng-click="setNodeUrl(); window.location.reload();">Save
                                </button>
                            </div>
                        </div>
                        <span class="dropdown dropdown-node" ng-cloak>
                            <a tabindex="0"
                                aria-haspopup="true"
                                aria-label="change node. current node {{curNode.name}} node by {{curNode.service}}"
                                class="dropdown-toggle btn btn-gray hidden"
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

        </div>
        <article class="clearfix header-container p-0">
            <nav role="navigation" aria-label="main navigation" class="nav-container overflowing bg-white">
                <a aria-hidden="true" ng-show="showLeftArrow" class="nav-arrow-left" ng-click="scrollLeft(100);"
                   ng-mouseover="scrollHoverIn(true,2);" ng-mouseleave="scrollHoverOut()">&#171;</a>
                <div class="nav-scroll">
                    <ul class="nav-inner">
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
</header>

