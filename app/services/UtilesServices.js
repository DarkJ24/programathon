var rp = require('request-promise'),
	config = require('../../config/config');

module.exports = {

	randomFunction: function(req, res, parameter, callback){
		//service Logic
		return rp(parameter)
		.then(function (data) {
		    callback (req, res, data, true);
		}).catch(function (err) {
		    callback (req, res, err, false);
		});
	}
};

function commaSeparateNumber(val){
    while (/(\d+)(\d{3})/.test(val.toString())){
      val = val.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2');
    }
    return val;
}