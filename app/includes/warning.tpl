<div class="alert alert-warning alert-dismissible fade show" ng-hide="erc20Alert" role="alert" ng-controller="erc20AlertCtrl">
    <div class="container-alert">
        <i class="fa fa-exclamation-triangle"></i> 
        Warning! Read the steps provided <a href="https://www.fusion.org/fsn-token" class="alert-link" target="_blank">here</a> before swapping ERC-20 tokens to MainNet!
    </div>
    <button type="button" class="close" ng-click="erc20Alert = true" aria-label="Close">
        <span aria-hidden="true">&times;</span>
    </button>
</div>