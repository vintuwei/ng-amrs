(function () {
    'use strict';

    angular
        .module('app.authentication')
        .factory('AuthorizationInterceptor', AuthorizationInterceptor);

    AuthorizationInterceptor.$inject = ['$log', '$rootScope','$q'];
    function AuthorizationInterceptor($log, $rootScope, $q) {
        var interceptor = {
            responseError: responseError
        };

        return interceptor;

        function responseError(config) {

            if (config.status === 403) {
                console.error('Authorization Error!', config.config.url);

                var message = 'You require certain privileges to'+
                ' access this feature without errors. Please contact IT support';

                $rootScope.$broadcast('Unauthorized', message);
            }

            return $q.reject(config);
        }
    }
})();
