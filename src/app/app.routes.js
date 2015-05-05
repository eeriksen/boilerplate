/**
 * APP - ROUTES
 */

angular.module('app').config(function ($stateProvider) {

    $stateProvider

    /*****************************************************
     Route:
     START
     */
        .state("start", {
            url:                        '/',
            templateUrl:                'start.tpl.html'
        });

});