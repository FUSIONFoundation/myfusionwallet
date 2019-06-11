<footer class="footer p-3 mt-4" role="content" aria-label="footer" ng-controller='footerCtrl'>
    <article class="block__wrap" style="max-width: 1780px; margin: auto;">
        <div class="container pt-3 mx-auto">
            <div class="row">
                <div class="col-md-3 mb-2">

                        <img src="images/fsn-logo.svg" width="115px">
                    <p class="pt-2">Fusion Wallet is a free client-side interface for creating and using wallets. The Fusion wallet allows for asset creation/ management and uninhibited interoperability.
                    </p>
                </div>
                <div class="col-md-3 col-xs-6">
                    <span class="small-gray-text mb-2">FUSION Tools</span>
                    <ul class="list-unstyled pt-2">
                        <li><a href="https://node.fusionnetwork.io" target="_blank">Node Monitor</a></li>
                        <li><a href="https://tickets.fusionnetwork.io" target="_blank">Autobuy Ticket</a></li>
                        <li><a href="https://blocks.fusionnetwork.io" target="_blank">Block Explorer</a></li>
                        <li><a href="https://api.fusionnetwork.io" target="_blank">API Gateway</a></li>
                    </ul>
                </div>

                <div class="col-md-3 col-xs-6">
                    <span class="small-gray-text mb-2">More</span>
                    <ul class="list-unstyled pt-2">
                        <li><a href="https://www.fusion.org/technology" target="_blank">Fusion Network</a></li>
                        <li><a href="https://www.fusion.org/dcrm" target="_blank">FSN Token</a></li>
                        <li><a href="https://www.fusion.org/technology" target="_blank">About Us</a></li>
                    </ul>
                </div>
                <div class="col-md-3 col-xs-12">
                    <span class="small-gray-text mb-2">Support</span>
                    <ul class="list-unstyled pt-2">
                        <li><a href="https://www.fusion.org/technology" target="_blank">Contact</a></li>
                        <li><a href="https://www.fusion.org/dcrm" target="_blank">FAQ</a></li>
                        <li><a href="https://www.fusion.org/technology" target="_blank">Submit an Issue</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </article>
    </div>
</footer>
<footer class="footer ice-blue-bg p-4">
    <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-12">
            <ul class="list-unstyled list-inline social text-center">
                <a class="p-1" href="https://github.com/FUSIONFoundation" target="_blank"><i class="fa fa-2x fa-github"
                                                                                             aria-hidden="true"></i></a>
                <a class="p-1" href="https://twitter.com/FUSIONProtocol" target="_blank"><i class="fa fa-2x fa-twitter"
                                                                                            aria-hidden="true"></i></a>
                <a class="p-1" href="https://t.me/FUSIONFoundation" target="_blank"><i class="fa fa-2x fa-telegram"
                                                                                       aria-hidden="true"></i></a>
                <a class="p-1" href="https://medium.com/@fusionprotocol" target="_blank"><i class="fa fa-2x fa-medium"
                                                                                            aria-hidden="true"></i></a>
                <a class="p-1" href="https://fusion.org" target="_blank"><i class="fa fa-2x fa-globe"
                                                                            aria-hidden="true"></i></a>
            </ul>
        </div>
        </hr>
    </div>
    <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-12 mt-2 mt-sm-2 text-center text-white">
            <p>©2016 - 2019 Fusion Foundation Ltd, All Rights Reserved</p>
        </div>
        </hr>
    </div>
</footer>


@@if (site === 'mew' ) { @@include( './footer-disclaimer-modal.tpl',   { "site": "mew" } ) }
@@if (site === 'cx'  ) { @@include( './footer-disclaimer-modal.tpl',   { "site": "cx"  } ) }

@@if (site === 'mew' ) { @@include( './onboardingModal.tpl',   { "site": "mew" } ) }
@@if (site === 'cx'  ) { @@include( './onboardingModal.tpl',   { "site": "cx"  } ) }


</main>
</body>
</html>
