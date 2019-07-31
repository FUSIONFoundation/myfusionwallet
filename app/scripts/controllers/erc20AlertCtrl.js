'use strict';
var erc20AlertCtrl = function($scope) {
    // if the localStorage variable is not there, create it
    if (localStorage.getItem("cookieName") === null ) {
        let alertData = {"shown": true};
        localStorage.setItem("cookieName",JSON.stringify(alertData));
    } else {
        if (localStorage.getItem("cookieName") === true){
            //set the erc20Alert to the value of the localStorage variable (true)
            $scope.erc20Alert = true;
        } else {
            $scope.erc20Alert = false;
        }
    }
}
module.exports = erc20AlertCtrl;