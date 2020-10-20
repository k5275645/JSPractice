(function() {

    function _isEmpty() {
        if ( value == "" || value == null || value == undefined || ( value != null && typeof value == "object" && !Object.keys(value).length ) ) { 
            return true; 
        }
        return false;
    }

    // default configuration
    var _default = {
        width : 500,
        height : 500
    };

    /**
     * A constructor of calculator
     * @param {Object} property meta data to generate a calculator 
     */
    function Calculator(obj) {
        var config = _isEmpty(obj) ? _default : obj;

        if (!this instanceof Calculator) {
            return new Calculator(config);
        }


    }

    // expose Calculator to global scope
    window.Calculator = Calculator;
})(window);