<section class="pre-footer">
    <div class="container">
        <p class="m-0">
            FUSION Foundation does not hold your keys for you. We cannot access accounts, recover keys, reset passwords,
            nor reverse transactions.
        </p>
    </div>
</section>
<footer class="footer border-gray-top p-3" role="content" aria-label="footer" ng-controller='footerCtrl'>
    <article class="block__wrap" style="max-width: 1780px; margin: auto;">
        <div class="container">
            <section class="col-md-12 text-left p-2 mb-3">
                <img src="images/fsn-logo.svg" width="115px">
            </section>
            <div class="row container-fluid">
                <div class="col-md-3 mb-2">
                    <span class="small-gray-text mb-2">About</span>
                    <p class="pt-2">MFW is a free client-side interface for creating and using Fusion PSN wallets. This enables users to test a suite of innovate functions developed by the FUSION Foundation.

                    </p>
                </div>
                <div class="col-md-3 col-xs-6">
                    <span class="small-gray-text mb-2">Related Tools</span>
                    <ul class="list-unstyled pt-2">
                        <li><a href="">Auto Buy Stake</a></li>
                        <li><a href="">Block Explorer</a></li>
                    </ul>
                </div>
                <div class="col-md-3 col-xs-6">
                    <span class="small-gray-text mb-2">Technology</span>
                    <ul class="list-unstyled pt-2">
                        <li><a href="https://www.fusion.org/technology">Overview</a></li>
                        <li><a href="https://www.fusion.org/dcrm">DCRM Demo</a></li>
                        <li><a href="https://www.fusion.org/technology">Resources</a></li>
                        <li><a href="https://www.fusion.org/vision">Videos</a></li>
                    </ul>
                </div>
                <div class="col-md-3 col-xs-12">
                    <span class="small-gray-text mb-2">Social</span>
                    <div class="pt-2">
                        <a class="p-1" href="https://github.com/FUSIONFoundation"><i class="fa fa-2x fa-github"
                                                                                    aria-hidden="true"></i></a>
                        <a class="p-1" href="https://twitter.com/FUSIONProtocol"><i class="fa fa-2x fa-twitter"
                                                                                    aria-hidden="true"></i></a>
                        <a class="p-1" href="https://t.me/FUSIONFoundation"><i class="fa fa-2x fa-telegram"
                                                                               aria-hidden="true"></i></a>
                        <a class="p-1" href="https://medium.com/@fusionprotocol"><i class="fa fa-2x fa-medium"
                                                                                    aria-hidden="true"></i></a>
                        <a class="p-1" href="https://fusion.org"><i class="fa fa-2x fa-globe"
                                                                    aria-hidden="true"></i></a>
                    </div>
                </div>
            </div>
        </div>

    </article>
    </div>


</footer>

@@if (site === 'mew' ) { @@include( './footer-disclaimer-modal.tpl',   { "site": "mew" } ) }
@@if (site === 'cx'  ) { @@include( './footer-disclaimer-modal.tpl',   { "site": "cx"  } ) }

@@if (site === 'mew' ) { @@include( './onboardingModal.tpl',   { "site": "mew" } ) }
@@if (site === 'cx'  ) { @@include( './onboardingModal.tpl',   { "site": "cx"  } ) }


</main>
</body>
</html>
