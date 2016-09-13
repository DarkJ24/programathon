var utils = require('../services/UtilesServices');

exports.getProduct = function(req, res) {
    res.setHead({ "Content-Type": "text/json" } );
    res.status(200).send( JSON.stringify( req.params.id ) );
};