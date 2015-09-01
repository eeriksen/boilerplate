/**
 * Model
 */

angular.module('app').factory("Start", function() {
    function Start(data){

        this.id = null;

        if(data){
            this.setData(data);
        }
    }

    Start.prototype = {

        /**
         * Constructor
         * @param itemData
         */
        setData: function(data){

            var self = this;
            self.id = data._id;

        }
    };

    return Start;
});