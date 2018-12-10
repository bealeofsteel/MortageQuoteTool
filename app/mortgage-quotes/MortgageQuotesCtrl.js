'use strict';
angular.module('mortgageQuotesApp')
        .controller('MortgageQuotesCtrl', ['$http', 'UNSUBMITTED', 'LOADING', 'NO_DATA', 'LOADED', function ($http, UNSUBMITTED, LOADING, NO_DATA, LOADED) {

                this.loanAmount = 300000; // set default

                this.quotes = [];

                this.state = UNSUBMITTED;

                var _this = this;

                this.loadQuotes = function() {
                    _this.state = LOADING;

                    _this.quotes = [];

                    $http.get('http://morty.mockable.io/quotes?loan_amount=' + _this.loanAmount).then(function(response) {

                        _this.state = response.data.length > 0 ? LOADED : NO_DATA;

                        angular.forEach(response.data, function(item) {
                            // flatten data for table
                            item.lenderName = item.lender.name;
                            _this.quotes.push(item);
                        });
                    });
                };

                this.columns = [
                    {
                        displayName: 'Lender',
                        fieldName: 'lenderName',
                        filterOptions: ['Apple Bank', 'Banana Bank']
                    },
                    {
                        displayName: 'Interest Rate',
                        fieldName: 'interest_rate'
                    },
                    {
                        displayName: 'Loan Term',
                        fieldName: 'loan_term',
                        filterOptions: [15, 30]
                    },
                    {
                        displayName: 'Monthly Payment',
                        fieldName: 'monthly_payment'
                    },
                    {
                        displayName: 'Rate Type',
                        fieldName: 'rate_type',
                        filterOptions: ['adjustable', 'fixed']
                    }
                ];

                this.sortType = this.columns[0].fieldName; // set default sort field
                this.sortReverse = false; // set default sort direction

                this.filters = {};

                this.setFilter = function(fieldName, option, checked) {
                    if(checked) {
                        if(!_this.filters[fieldName]) {
                            _this.filters[fieldName] = [];
                        }

                        _this.filters[fieldName].push(option);
                    } else {
                        _this.filters[fieldName].splice(_this.filters[fieldName].indexOf(option), 1);
                        if(_this.filters[fieldName].length === 0) {
                            delete _this.filters[fieldName];
                        }
                    }
                };

                this.matchesFilters = function(quote) {
                    for (var fieldName in _this.filters) {
                        if (_this.filters.hasOwnProperty(fieldName)) {
                            var options = _this.filters[fieldName];

                            var foundMatch = false;

                            for(var i = 0; i < options.length; i++) {
                                if(options[i] == quote[fieldName]) {
                                    foundMatch = true;
                                    break;
                                }
                            }

                            if(!foundMatch) {
                                return false;
                            }
                        }
                    }

                    return true;
                };
            }])

            .constant('UNSUBMITTED', 'Enter a loan amount to see quotes')
            .constant('LOADING', 'Loading...')
            .constant('NO_DATA', 'No quotes were found for that loan amount')
            .constant('LOADED', '');
