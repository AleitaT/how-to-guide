var express = require('express'); 
var app = express(); 
var request = require('request'); 
var bodyParser = require('body-parser');  
app.use(bodyParser.json());
console.log('hello');
app.set('port', 3000);

app.get('/', function(req, res, next){    
    console.log(req);
    res.setHeader('Access-Control-Allow-Origin', 'http://35.161.194.111');  
    res.setHeader('Access-Control-Allow-Methods', 'GET');   
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');   
    res.setHeader('Access-Control-Allow-Credentials', false);  
  var localityInput = getAndDoStuff(req);   
  request("https://api.brewerydb.com/v2/locations?key=4daf32489a8f98a5db97e45f569d8261&locationType=Cidery&region=Oregon&locality=" + localityInput.qParams[0].value, 
  function (error, response, body) {       
    if (!error && response.statusCode === 200) {        	
    console.log(body);   
    console.log(response);        	
    res.send(body);      	
  }     
});  
});	

function getAndDoStuff(req) {    
          var context = {};    
          context.method = req.method;   
          context.qParams = [];    
          for(var p in req.query) {      
            context.qParams.push({	'name': p, 'value': req.query[p]       
	    	});
     }        
    return context; 
}

app.listen(app.get('port'), function(){   
        console.log('Express started on port ' + app.get('port') + '; press Ctrl-C to terminate.'); 
});	

app.use(express.static('public'));
