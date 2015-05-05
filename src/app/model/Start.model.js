/**
 * Model
 */

angular.module('app').factory("Start", function() {
    function Start(startData){

        this.id = null;

        if(startData){
            this.setData(startData);
        }
    }

    Start.prototype = {

        /**
         * Constructor
         * @param itemData
         */
        setData: function(startData){

            var self = this;
            self.id = startData._id;

        }
    };

    return Start;
});