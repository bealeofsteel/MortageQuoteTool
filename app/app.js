'use strict';

angular.module('mortgageQuotesApp', [
  'ngRoute',
]).
config(['$routeProvider', function($routeProvider) {

  $routeProvider
    .when('/', {
        templateUrl: 'mortgage-quotes/mortgage-quotes.html',
        controller: 'MortgageQuotesCtrl',
        controllerAs: 'quotesCtrl'
    });

  $routeProvider.otherwise({redirectTo: '/'});
}]);
