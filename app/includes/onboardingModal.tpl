<article class="modal fade" id="onboardingModal" tabindex="-1" ng-controller='onboardingCtrl'>
  <div class="modal-dialog p-0">
    <div class="modal-content">
      <div class="modal-body ">
        <div class="on-boarding-close">
          <img class="editor-icons" src="images/icon-x.svg" title="Close" ng-click="onboardModal.close()"/>
        </div>

        <article class="onboarding__modal" ng-show="showOnboardSlide==1">
          <h3 class="onboarding__title">
            <span>
              Welcome to MyFUSIONWallet
            </span>
            <br />
            <small>
              We want to make you aware to keep your funds safe.
            </small>
          </h3>
          <section class="row row--flex">
      <div class="col-xs-12 text-center">We can't refund any lost funds..</div>
          </section>
          <div class="col-xs-12 text-center">
            <button class="btn btn-white" ng-click="onboardModal.close()">I understand</button>
          </div>
        </article>

      </div>
    </div>
  </div>
</article>
