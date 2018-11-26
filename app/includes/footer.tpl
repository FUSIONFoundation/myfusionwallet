<section class="pre-footer">
    <div class="container">
        <p>
            FUSION Foundation does not hold your keys for you. We cannot access accounts, recover keys, reset passwords,
            nor reverse transactions.
        </p>
    </div>
</section>
<footer class="footer border-gray-top p-3" role="content" aria-label="footer" ng-controller='footerCtrl'>
    <article class="block__wrap" style="max-width: 1780px; margin: auto;">
        <div class="container">
            <section class="col-md-12 text-left p-2 mb-3">
                <img src="images/fusion-logo.jpg" width="115px">
            </section>
            <div class="row container-fluid">
                <div class="col-md-3">
                    <span class="small-gray-text mb-2">About</span>
                    <p class="pt-2">Fusion Wallet is a free client-side interface for creating and using wallets. The
                        Fusion wallet allows for asset creation/ management and uninhibited interoperability.

                    </p>
                </div>
                <div class="col-md-3">
                    <span class="small-gray-text mb-2">Related Tools</span>
                    <ul class="list-unstyled pt-2">
                        <li><a href="">Auto Buy Stake</a></li>
                        <li><a href="">Block Explorer</a></li>
                    </ul>
                </div>
                <div class="col-md-3">
                    <span class="small-gray-text mb-2">Technology</span>
                    <ul class="list-unstyled pt-2">
                        <li><a href="">Overview</a></li>
                        <li><a href="">DCRM Demo</a></li>
                        <li><a href="">Resources</a></li>
                        <li><a href="">Videos</a></li>
                    </ul>
                </div>
                <div class="col-md-3">
                    <span class="small-gray-text mb-2">Social</span>
                    <ul class="list-unstyled pt-2">
                        <li><a href="">Twitter</a></li>
                        <li><a href="">Telegram</a></li>
                        <li><a href="">Medium</a></li>
                        <li><a href="">Website</a></li>
                    </ul>
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
