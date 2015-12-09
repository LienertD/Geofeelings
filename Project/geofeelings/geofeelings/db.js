(function (database){
	var mongodb = require("mongodb");
	var mongourl = 'mongodb://lienert:123456@ds053874.mongolab.com:53874/geofeelingz';
	var thedb = null;

	database.getDB = function(next){
		if(!thedb)
		{
			//verbinden met db
			mongodb.MongoClient.connect(mongoUrl, function(err, db)
			{
				if(err){
					next(err, null);
				}
				else
				{
					thedb = {
						db:db
					};

					next(null, thedb);
				}
			});
		}
		else
		{
			next(null, thedb);
		}
	}
});
