<article class="modal fade" id="onboardingModal" tabindex="-1" ng-controller='onboardingCtrl'>
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-body">
                <div class="on-boarding-close">
                    <img class="editor-icons" src="images/icon-x.svg" title="Close" ng-click="onboardModal.close()"/>
                </div>
                <article class="onboarding__modal" ng-show="showOnboardSlide==1">
                    <h3 class="onboarding__title">
            <span>
              Welcome to My Fusion Wallet (MFW)
            </span>
                        <br/>
                    </h3>
                    <p>
                        MyFusionWallet (MFW) is a powerful, open-source wallet that enables user to interact with
                        FUSION’s innovative features seamlessly and securely.
                    </p>

                    <div class="alert-yellow col-md-12">
                        <p class="intro-p">
                        <i class="fa fa-warning"></i> MFW is only an interface to access your wallet. Double check all
                        transactions and never share your private keys. We cannot retreive funds lost on the platform.
                        If you are new to blockchain and wallets, please click here to learn more about keeping your
                        assets safe and secure.
                        </p>
                    </div>
                    <br>
                    <p class="float-left fusion-text-14 intro-p">Learn more about MFW’s revolutionary new features:</p>

                    <div class="text-center">
                        <div class="col-md-6 p-2 funcs-bg">
                            <img src="images/plus-circle.svg"
                                 class="plus-circle">
                            <span>Asset Creation</span>
                        </div>
                        <div class="col-md-6 p-2 funcs-bg">
                            <img src="images/lock.svg"
                                 class="plus-circle">
                            <span>Asset Lock-In</span>
                        </div>
                        <div class="col-md-6 p-2 funcs-bg">
                            <img src="images/ticket-alt.svg"
                                 class="plus-circle">
                            <span>Auto Buy Staking</span>
                        </div>
                        <div class="col-md-6 p-2 funcs-bg">
                            <img src="images/address-card.svg"
                                 class="plus-circle">
                            <span>Short Account #</span>
                        </div>
                        <div class="col-md-6 p-2 funcs-bg">
                            <img src="images/clock.svg"
                                 class="plus-circle">
                            <span>Time Lock</span>
                        </div>
                        <div class="col-md-6 p-2 funcs-bg">
                            <img src="images/exchange-alt.svg"
                                 class="plus-circle">
                            <span>Quantum Swap</span>
                        </div>
                    </div>
                    <div class="onboarding__buttons text-center">
                        <a ng-click="setOnboardStatus(2)" class="btn btn-primary w-100 mt-2">
              <span>
                Learn about Asset Creation
              </span>
                        </a>
                    </div>
                </article>
                <article class="onboarding__modal" ng-show="showOnboardSlide==2">
                    <h3 class="onboarding__title">
            <span>
              Asset Creation
            </span>
                        <br/>
                    </h3>

                    <div class="col-md-12 text-center">
                        <img src="images/asset-creation.svg" alt="">
                    </div>

                    <p class="float-left fusion-text-14 intro-p col-md-12">
                        MyFusionWallet supports the seamless creation of new digital assets without the need for any programming. These assets can be stored, exchanged, time-locked or swapped on the FUSION Payable Stage Network.
                    </p>

                    <div class="col-md-12">
                        <a ng-click="setOnboardStatus(3)" class="btn btn-primary w-100">
              <span>
                Learn about Asset Locking
              </span>
                        </a>
                    </div>
                </article>
                <article class="onboarding__modal" ng-show="showOnboardSlide==3">
                    <h3 class="onboarding__title">
            <span>
              Asset Lock-in
            </span>
                        <br/>
                    </h3>

                    <div class="col-md-12 text-center">
                        <img src="images/lock-in.svg" alt="">
                    </div>

                    <p class="float-left fusion-text-14 intro-p col-md-12">FUSION’s Lock-in function enables assets from various blockchains to enter the FUSION ecosystem and access the complete functionality of the FUSION Protocol. </p>

                    <div class="col-md-12">
                        <a ng-click="setOnboardStatus(4)" class="btn btn-primary w-100">
              <span>
                Learn about Auto Buy Staking
              </span>
                        </a>
                    </div>
                </article>
                <article class="onboarding__modal" ng-show="showOnboardSlide==4">
                    <h3 class="onboarding__title">
            <span>
              Auto Buy Staking
            </span>
                        <br/>
                    </h3>

                    <div class="col-md-12 text-center">
                        <img src="images/ticket.svg" alt="">
                    </div>

                    <p class="float-left fusion-text-14 intro-p col-md-12">
                        The auto-buy staking WebApp makes participating in Proof of Stake easier than ever. By using Auto-buy, a user can just set-it and forget-it and seamlessly earn block rewards.
                    </p>

                    <div class="col-md-12">
                        <a ng-click="setOnboardStatus(5)" class="btn btn-primary w-100">
              <span>
                Learn about Short Account Number
              </span>
                        </a>
                    </div>
                </article>
                <article class="onboarding__modal" ng-show="showOnboardSlide==5">
                    <h3 class="onboarding__title">
            <span>
              Short Account Number
            </span>
                        <br/>
                    </h3>

                    <div class="col-md-12 text-center">
                        <img src="images/san.svg" alt="">
                    </div>

                    <p class="float-left fusion-text-14 intro-p col-md-12">
                        Generate a short account address which will make sending and receiving transactions easier, interacting with other users simpler, reduce errors and increase the speed of blockchain adoption.                    </p>

                    <div class="col-md-12">
                        <a ng-click="setOnboardStatus(6)" class="btn btn-primary w-100">
              <span>
Learn about Time Lock
              </span>
                        </a>
                    </div>
                </article>
                <article class="onboarding__modal" ng-show="showOnboardSlide==6">
                    <h3 class="onboarding__title">
            <span>
              Time Lock
            </span>
                        <br/>
                    </h3>

                    <div class="col-md-12 text-center">
                        <img src="images/time-lock.svg" alt="">
                    </div>

                    <p class="float-left fusion-text-14 intro-p col-md-12">
                        MFW supports sending assets for a specified period of time with Time-Lock. When sending an asset, you can choose timelock to “lend” or “loan” that asset out temporarily.
                    <div class="col-md-12">
                        <a ng-click="setOnboardStatus(7)" class="btn btn-primary w-100">
              <span>
Learn about Quantum Swap
              </span>
                        </a>
                    </div>
                </article>
                <article class="onboarding__modal" ng-show="showOnboardSlide==7">
                    <h3 class="onboarding__title">
            <span>
              Quantum Swap
            </span>
                        <br/>
                    </h3>

                    <div class="col-md-12 text-center">
                        <img src="images/time-lock.svg" alt="">
                    </div>

                    <p class="float-left fusion-text-14 intro-p col-md-12">
                        MFW supports sending assets for a specified period of time with Time-Lock. When sending an asset, you can choose timelock to “lend” or “loan” that asset out temporarily.
                    <div class="col-md-12">
                        <a ng-click="onboardModal.close()" class="btn btn-primary w-100">
              <span>
Get Started!
              </span>
                        </a>
                    </div>
                </article>


                <article class="onboarding__modal" ng-show="showOnboardSlide==99">
                    <h3 class="onboarding__title" translate="ONBOARD_blockchain_title">
                        Wait, WTF is a Blockchain?
                    </h3>
                    <section class="row row--flex">
                        <div class="col-xs-12 col-sm-8 onboarding__content">
                            <ul>
                                <li translate="ONBOARD_blockchain_content__1">
                                    The blockchain is like a huge, global, decentralized spreadsheet.
                                </li>
                                <li translate="ONBOARD_blockchain_content__2">
                                    It keeps track of who sent how many coins to whom, and what the balance of every
                                    account is.
                                </li>
                                <li translate="ONBOARD_blockchain_content__3">
                                    It is stored and maintained by thousands of people (miners) across the globe who
                                    have special computers.
                                </li>
                                <li translate="ONBOARD_blockchain_content__4">
                                    It is made up of all the individual transactions sent from MyEtherWallet, MetaMask,
                                    Exodus, Mist, Geth, Parity, and everywhere else.
                                </li>
                                <li translate="ONBOARD_blockchain_content__5">
                                    When you see your balance on MyEtherWallet.com or view your transactions on
                                    [etherscan.io](https://etherscan.io), you are seeing data on the blockchain, not in
                                    our personal systems.
                                </li>
                                <li translate="ONBOARD_blockchain_content__6">
                                    Again: <strong>we are not a bank</strong>.
                                </li>
                            </ul>
                        </div>
                        <div class="col-xs-12 col-sm-4 onboarding__image">
                            <img src="./images/onboarding_icon-04.svg" width="100%" height="auto"/>
                        </div>
                    </section>
                    <div class="onboarding__buttons">
                        <a ng-click="setOnboardStatus(3)" class="btn btn-default">
              <span translate="ONBOARD_interface_title__alt">
                MEW is an Interface
              </span>
                        </a>
                        <a ng-click="setOnboardStatus(5)" class="btn btn-primary">
              <span translate="ONBOARD_why_title__alt">
                But...why does this matter?
              </span>
                        </a>
                    </div>
                </article>
                <article class="onboarding__modal" ng-show="showOnboardSlide==999">
                    <h3 class="onboarding__title" translate="ONBOARD_why_title">
                        Why are you making me read all this?
                    </h3>
                    <section class="row row--flex">
                        <div class="col-xs-12 col-sm-4 onboarding__image">
                            <img src="./images/onboarding_icon-05.svg" width="100%" height="auto"/>
                        </div>
                        <div class="col-xs-12 col-sm-8 onboarding__content">
                            <h5 translate="ONBOARD_why_content__1">
                                Because we need you to understand that we **cannot**...
                            </h5>
                            <ul>
                                <li class="text-danger" translate="ONBOARD_why_content__2">
                                    Access your account or send your funds for you.
                                </li>
                                <li class="text-danger" translate="ONBOARD_why_content__3">
                                    Recover or change your private key.
                                </li>
                                <li class="text-danger" translate="ONBOARD_why_content__4">
                                    Recover or reset your password.
                                </li>
                                <li class="text-danger" translate="ONBOARD_why_content__5">
                                    Reverse, cancel, or refund transactions.
                                </li>
                                <li class="text-danger" translate="ONBOARD_why_content__6">
                                    Freeze accounts.
                                </li>
                            </ul>
                            <h5 translate="ONBOARD_why_content__7">
                                **You** and **only you** are responsible for your security.
                            </h5>
                            <ul>
                                <li translate="ONBOARD_why_content__8">
                                    Be diligent to keep your private key and password safe. Your private key is
                                    sometimes called your mnemonic phrase, keystore file, UTC file, JSON file, wallet
                                    file.
                                </li>
                                <li translate="ONBOARD_why_content__9">
                                    If lose your private key or password, no one can recover it.
                                </li>
                                <li translate="ONBOARD_why_content__10">
                                    If you enter your private key on a phishing website, you will have **all your funds
                                    taken**.
                                </li>
                            </ul>
                        </div>
                    </section>
                    <div class="onboarding__buttons">
                        <a ng-click="setOnboardStatus(4)" class="btn btn-default">
              <span translate="ONBOARD_blockchain_title__alt">
                WTF is a Blockchain?
              </span>
                        </a>
                        <a ng-click="setOnboardStatus(6)" class="btn btn-primary">
              <span translate="ONBOARD_point_title__alt">
                What's the Point of MEW then?
              </span>
                        </a>
                    </div>
                </article>
                <article class="onboarding__modal" ng-show="showOnboardSlide==9999">
                    <h3 class="onboarding__title" translate="ONBOARD_whymew_title">
                        If MyEtherWallet can't do those things, what's the point?
                    </h3>
                    <section class="row row--flex">
                        <div class="col-xs-12 col-sm-4 onboarding__image">
                            <img src="./images/onboarding_icon-06.svg" width="100%" height="auto"/>
                        </div>
                        <div class="col-xs-12 col-sm-8 onboarding__content">
                            <ul>
                                <li translate="ONBOARD_whymew_content__1">
                                    Because that is the point of decentralization and the blockchain.
                                </li>
                                <li translate="ONBOARD_whymew_content__2">
                                    You don't have to rely on your bank, government, or anyone else when you want to
                                    move your funds.
                                </li>
                                <li translate="ONBOARD_whymew_content__3">
                                    You don't have to rely on the security of an exchange or bank to keep your funds
                                    safe.
                                </li>
                                <li translate="ONBOARD_whymew_content__4">
                                    If you don't find these things valuable, ask yourself why you think the blockchain
                                    and cryptocurrencies are valuable. 😉
                                </li>
                                <li translate="ONBOARD_whymew_content__5">
                                    If you don't like the sound of this, consider using
                                    [Coinbase](https://www.coinbase.com/) or
                                    [Blockchain.info](https://blockchain.info/wallet/#/signup). They have more familiar
                                    accounts with usernames &amp; passwords.
                                </li>
                                <li translate="ONBOARD_whymew_content__6">
                                    If you are scared but want to use MEW, [get a hardware
                                    wallet](https://kb.myetherwallet.com/hardware-wallets/hardware-wallet-recommendations.html)!
                                    These keep your keys secure.
                                </li>
                            </ul>
                        </div>
                    </section>
                    <div class="onboarding__buttons">
                        <a ng-click="setOnboardStatus(5)" class="btn btn-default">
              <span translate="ONBOARD_why_title__alt">
                But...why?
              </span>
                        </a>
                        <a ng-click="setOnboardStatus(7)" class="btn btn-primary">
              <span translate="ONBOARD_secure_title">
                How To Protect Yourself &amp; Your Funds
              </span>
                        </a>
                    </div>
                </article>
                <article class="onboarding__modal" ng-show="showOnboardSlide==99999">
                    <h3 class="onboarding__title" translate="ONBOARD_secure_1_title">
                        How To Protect Yourself from Phishers
                    </h3>
                    <p translate="ONBOARD_secure_1_content__1">
                        Phishers send you a message with a link to a website that looks just like MyEtherWallet,
                        EtherDelta, Paypal, or your bank, but is not the real website. They steal your information and
                        then steal your money.
                    </p>
                    <section class="row row--flex">
                        <div class="col-xs-12 col-sm-8 onboarding__content">
                            <ul>
                                <li translate="ONBOARD_secure_1_content__2">
                                    Install
                                    [EAL](https://chrome.google.com/webstore/detail/etheraddresslookup/pdknmigbbbhmllnmgdfalmedcmcefdfn)
                                    or
                                    [MetaMask](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn)
                                    or [Cryptonite by
                                    Metacert](https://chrome.google.com/webstore/detail/cryptonite-by-metacert/keghdcpemohlojlglbiegihkljkgnige)
                                    or the [MyEtherWallet Chrome
                                    Extension](https://chrome.google.com/webstore/detail/myetherwallet-cx/nlbmnnijcnlegkjjpcfjclmcfggfefdm)
                                    to block malicious websites.
                                </li>
                                <li translate="ONBOARD_secure_1_content__3">
                                    Always check the URL: `https://www.myetherwallet.com`.
                                </li>
                                <li translate="ONBOARD_secure_1_content__4">
                                    Always make sure the URL bar has `MYETHERWALLET Inc` in green.
                                </li>
                                <li translate="ONBOARD_secure_1_content__5">
                                    Do not trust messages or links sent to you randomly via email, Slack, Reddit,
                                    Twitter, etc.
                                </li>
                                <li translate="ONBOARD_secure_1_content__6">
                                    Always navigate directly to a site before you enter information. Do not enter
                                    information after clicking a link from a message or email.
                                </li>
                                <li translate="ONBOARD_secure_1_content__7">
                                    [Install an
                                    AdBlocker](https://chrome.google.com/webstore/detail/ublock-origin/cjpalhdlnbpafiamejdnhcphjbkeiagm?hl=en)
                                    and do not click ads on your search engine (e.g. Google).
                                </li>
                            </ul>
                        </div>
                        <div class="col-xs-12 col-sm-4 onboarding__image">
                            <img src="./images/onboarding_icon-07.svg" width="100%" height="auto"/>
                        </div>
                    </section>
                    <div class="onboarding__buttons">
                        <a ng-click="setOnboardStatus(6)" class="btn btn-default">
              <span translate="ONBOARD_point_title__alt_2">
                What's the point?
              </span>
                        </a>
                        <a ng-click="setOnboardStatus(8)" class="btn btn-primary">
              <span translate="ONBOARD_secure_2_title">
                How To Protect Yourself from Scams
              </span>
                        </a>
                    </div>
                </article>
                <article class="onboarding__modal" ng-show="showOnboardSlide==8">
                    <h3 class="onboarding__title" translate="ONBOARD_secure_2_title">
                        How To Protect Yourself from Scams
                    </h3>
                    <p class="text-center" translate="ONBOARD_secure_2_content__1">
                        People will try to get you to give them money in return for nothing.
                    </p>
                    <br/>
                    <section class="row row--flex">
                        <div class="col-xs-12 col-sm-8 onboarding__content">
                            <ul>
                                <li translate="ONBOARD_secure_2_content__2">
                                    If it is too good to be true, it probably is.
                                </li>
                                <li translate="ONBOARD_secure_2_content__3">
                                    Research before sending money to someone or some project. Look for information on a
                                    variety of websites and forums. Be wary.
                                </li>
                                <li translate="ONBOARD_secure_2_content__4">
                                    Ask questions when you don't understand something or it doesn't seem right.
                                </li>
                                <li translate="ONBOARD_secure_2_content__5">
                                    Don't let fear, FUD, or FOMO win over common sense. If something is very urgent, ask
                                    yourself 'why?'. It may be to create FOMO or prevent you from doing research.
                                </li>
                            </ul>
                        </div>
                        <div class="col-xs-12 col-sm-4 onboarding__image">
                            <img src="./images/onboarding_icon-08.svg" width="100%" height="auto"/>
                        </div>
                    </section>
                    <div class="onboarding__buttons">
                        <a ng-click="setOnboardStatus(7)" class="btn btn-default">
              <span translate="ONBOARD_secure_3_title__alt">
                Phuck Phishers
              </span>
                        </a>
                        <a ng-click="setOnboardStatus(9)" class="btn btn-primary">
              <span translate="ONBOARD_secure_3_title">
                How To Protect Yourself from Loss
              </span>
                        </a>
                    </div>
                </article>
                <article class="onboarding__modal" ng-show="showOnboardSlide==9">
                    <h3 class="onboarding__title" translate="ONBOARD_secure_3_title">
                        How To Protect Yourself from Loss
                    </h3>
                    <p class="text-center" translate="ONBOARD_secure_3_content__1">
                        If you lose your private key or password, it is gone forever. Don't lose it.
                    </p>
                    <section class="row row--flex">
                        <div class="col-xs-12 col-sm-7">
                            <ul>
                                <li translate="ONBOARD_secure_3_content__2">
                                    Make a backup of your private key and password. Do NOT just store it on your
                                    computer. Print it out on a piece of paper or save it to a USB drive.
                                </li>
                                <li translate="ONBOARD_secure_3_content__3">
                                    Store this paper or USB drive in a different physical location. A backup is not
                                    useful if it is destroyed by a fire or flood along with your laptop.
                                </li>
                                <li translate="ONBOARD_secure_3_content__4">
                                    Do not store your private key in Dropbox, Google Drive, or other cloud storage. If
                                    that account is compromised, your funds will be stolen.
                                </li>
                                <li translate="ONBOARD_secure_3_content__5">
                                    If you have more than 1-week's worth of pay worth of cryptocurrency, get a hardware
                                    wallet. No excuses. It's worth it. I promise.
                                </li>
                                @@if (site === 'cx' ) {
                                <li translate="CX_Warning_1">
                                    Make sure you have **external backups**. Chrome Extensions are not 100% reliable.
                                    Many things could happen that would cause loss, including uninstalling the
                                    extension. This is an easy way to access your wallets, **not** a way to back them
                                    up.
                                </li>
                                }
                            </ul>
                        </div>
                        <div class="col-xs-12 col-sm-4 onboarding__image">
                            <img src="./images/onboarding_icon-09.svg" width="100%" height="auto"/>
                        </div>
                    </section>
                    <h5 class="text-center" translate="ONBOARD_secure_3_content__6">
                        [Even more Security
                        Tips!](https://kb.myetherwallet.com/getting-started/protecting-yourself-and-your-funds.html)
                    </h5>
                    <div class="onboarding__buttons">
                        <a ng-click="setOnboardStatus(8)" class="btn btn-default">
              <span translate="ONBOARD_secure_2_title__alt_2">
                Screw Scams
              </span>
                        </a>
                        <a ng-click="setOnboardStatus(10)" class="btn btn-primary">
              <span translate="ONBOARD_final_title__alt">
                One more click &amp; you're done! 🤘
              </span>
                        </a>
                    </div>
                </article>
                <article class="onboarding__modal" ng-show="showOnboardSlide==10">
                    <h3 class="onboarding__title" translate="ONBOARD_final_title">
                        Alright, I'm done lecturing you!
                    </h3>
                    <p class="text-center" translate="ONBOARD_final_subtitle">
                        Sorry for being like this. Onwards!
                    </p>
                    <br/>
                    <section class="row row--flex">
                        <div class="col-xs-12 col-sm-4 col-xs-12 col-sm-offset-1">
                            <img src="./images/onboarding_icon-10.svg" width="100%" height="auto"/>
                        </div>
                        <div class="col-xs-12 col-sm-7">
                            <ul>
                                <li>
                                    <a href="https://kb.myetherwallet.com/hardware-wallets/hardware-wallet-recommendations.html"
                                       target="_blank" rel="noopener noreferrer" class="strong"
                                       translate="ONBOARD_final_content__2">
                                        Get a hardware wallet
                                    </a>
                                </li>
                                <li>
                                    <a href="https://kb.myetherwallet.com/migration/moving-from-private-key-to-metamask.html"
                                       target="_blank" rel="noopener noreferrer" class="strong"
                                       translate="ONBOARD_final_content__3">
                                        How to Set up MEW + MetaMask
                                    </a>
                                </li>
                                <li>
                                    <a href="https://kb.myetherwallet.com/offline/running-myetherwallet-locally.html"
                                       target="_blank" rel="noopener noreferrer" class="strong"
                                       translate="ONBOARD_final_content__4">
                                        How to Run MEW Offline / Locally
                                    </a>
                                </li>
                                <li>
                                    <a href="https://kb.myetherwallet.com/migration/moving-from-private-key-to-ledger-hardware-wallet.html"
                                       target="_blank" rel="noopener noreferrer" class="strong"
                                       translate="ONBOARD_final_content__5">
                                        How to Send via Ledger hardware wallet
                                    </a>
                                </li>
                                <li>
                                    <a href="https://kb.myetherwallet.com/hardware-wallets/trezor-sending-to-trezor-device.html"
                                       target="_blank" rel="noopener noreferrer" class="strong"
                                       translate="ONBOARD_final_content__6">
                                        How to Send via TREZOR hardware wallet
                                    </a>
                                </li>
                                <li>
                                    <a href="https://kb.myetherwallet.com/migration/moving-from-private-key-to-metamask.html"
                                       target="_blank" rel="noopener noreferrer" class="strong"
                                       translate="ONBOARD_final_content__7">
                                        How to Send via MetaMask
                                    </a>
                                </li>
                                <li>
                                    <a href="https://kb.myetherwallet.com/"
                                       target="_blank" rel="noopener noreferrer" class="strong"
                                       translate="ONBOARD_final_content__8">
                                        Learn More or Contact Us
                                    </a>
                                </li>
                                <li>
                                    <a ng-click="onboardModal.close();globalService.currentTab=globalService.tabs.sendTransaction.id"
                                       class="strong">
                     <span translate="ONBOARD_final_content__9">
                       OMG, please just let me send FFS.
                     </span>
                                    </a>
                                </li>
                            </ul>

                            <div class="onboarding__buttons">
                                <a ng-click="onboardModal.close()" class="btn btn-primary col-sm-5 col-sm-offset-7">
                  <span>
                    Done &nbsp;
                  </span>
                                </a>
                            </div>
                        </div>
                    </section>
                </article>
            </div>
        </div>
    </div>
</article>