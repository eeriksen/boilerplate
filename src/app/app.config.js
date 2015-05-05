/**
 * APP - CONFIGURATION
 */
angular.module('app').config(function($locationProvider, $httpProvider, $translateProvider, $urlMatcherFactoryProvider, ngClipProvider){

    //Use regular clean paths in route
    $locationProvider.html5Mode({
        enabled: true,
        hashPrefix: '!',
        requireBase: true
    });

    // Allow trailing slashes on URLs
    $urlMatcherFactoryProvider.strictMode(false);

    // Translation config
    $translateProvider.useStaticFilesLoader({
        prefix: '/app/language/lang-',
        suffix: '.json'
    });
    $translateProvider.preferredLanguage('en');

});



/**
 * APP - RUN
 */
angular.module('app').run(function($state, $rootScope) {


    /**
     * ROUTE CHANGE: START
     * Triggered when a route change is initiated
     */
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){

    });



    /**
     * ROUTE CHANGE: SUCCESS
     * Triggered when route has been successfully changed
     */
    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {

    });



    /**
     * ROUTE CHANGE: NOT FOUND
     * Triggered when a state with given name is not found
     */
    $rootScope.$on('$stateNotFound', function(){

    });


    /**
     * ROUTE CHANGE: ERROR
     * Triggered when there is an error changing route
     */
    $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error){

    });


});
