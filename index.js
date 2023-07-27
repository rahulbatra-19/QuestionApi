const express = require('express');
	const app = express();
	const port = 8000;
    const db = require('./config/mongoose');




    app.use(express.urlencoded({ extended: true }));
	app.listen(port, function(err){
    		if(err)
    		{
        		console.log('Error is running the server',  err);
    		}
    			console.log('yup! my express server is running on port', port);
	});