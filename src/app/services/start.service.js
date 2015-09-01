/**
 * Service
 */

angular.module('app').factory('startService', function ($rootScope, $http, $q, Start) {
    var startService = {

        _pool: {},

        _retrieveInstance: function (instanceId, instanceData) {
            var instance = this._pool[instanceId];

            if (instance) {
                instance.setData(instanceData);
            } else {
                instance = new Start(instanceData);
                this._pool[instanceId] = instance;
            }

            return instance;
        },

        _find: function (projectId) {
            return this._pool[projectId];
        },

        _destroy: function (projectId){
            delete this._pool[projectId];
        },

        _load: function (projectId, deferred) {
            var scope = this;
            $http.get($rootScope.apiUrl + '/rest/projects/' + projectId)
                .success(function (projectData) {
                    var project = scope._retrieveInstance(projectData._id, projectData);
                    deferred.resolve(project);
                }).error(function (data, status, headers, config) {
                    deferred.reject(status);
                });

        },



        get: function (startId) {

            var deferred = $q.defer();
            var project = this._find(startId);

            if (project) {
                deferred.resolve(project);
            } else {
                this._load(projectId, deferred);
            }
            return deferred.promise;
        }

    };
    return startService;
});