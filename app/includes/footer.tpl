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
            <section class="col-md-12 text-center p-2">
                <img src="images/fusion-logo.jpg" width="115px">
            </section>
            <div class="row container-fluid">
                <div class="col-md-3 text-center">
                    <span class="small-gray-text">About</span>

                </div>
                <div class="col-md-3 text-center">
                    <span class="small-gray-text">Related Tools</span>
                </div>
                <div class="col-md-3 text-center">
                    <span class="small-gray-text">News</span>
                </div>
                <div class="col-md-3 text-center">
                    <span class="small-gray-text">Company</span>
                </div>
            </div>
            <section class="col-md-12 text-center mb-3">
                FUSION Foundation
            </section>
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
