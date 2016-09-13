var Config = {
	'environment' : 'development',
	'route' : 'http://localhost:3000/',
	'appName' : 'Programathon',
	'databaseInfo': {
		'username': 'darkj24',
		'password': 'jqs2464',
		'database': 'programathon',
		'host': '127.0.0.1',
		'port': '3306',
		'dialect': 'mysql'
	}
};

console.log("Running Environment: " + Config.environment);

module.exports = Config;