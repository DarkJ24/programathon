var http = require('http');
	express = require('express'),
	routes = require('./config/routes'),
	path = require('path'),
	favicon = require('serve-favicon'),
	logger = require('morgan'),
	methodOverride = require('method-override'),
	session = require('express-session'),
	bodyParser = require('body-parser'),
	multer = require('multer'),
	errorHandler = require('errorhandler'),
	pug = require('pug'),
	passport = require('./config/passport'),
	models = require('./app/models'),
	config = require('./config/config');

SALT_WORK_FACTOR = 12;


var app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, './app/views'));

//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(methodOverride());
app.use(
	session({ 
		resave: true,
		saveUninitialized: true,
		secret: '1234567890QWERTY' 
	})
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

//app.use(multer()); For file uploads
app.use(express.static(path.join(__dirname, './public')));

//Development Error Handler
if (config.environment === 'development') {
  app.use(errorHandler());
}

//Routes Loader
var routes = require('./config/routes');
app.use(routes);

//Page Port
app.set('port', process.env.PORT || 3000);

//Connect Sequelize & Start Sever
models.sequelize.sync().then(function () {
	var server = http.createServer(app);
	server.listen(app.get('port'), function(){
		console.log('Express server listening on port ' + app.get('port'));
	});
});