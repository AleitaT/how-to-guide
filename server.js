


var express = require('express'); 
var app = express(); 
var cors = require('cors');
//var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var request = require('request'); 
//must define path in order to open static files upon launch 
var path = require('path');
//app.engine('handlebars', handlebars.engine);
//app.set('view engine', 'handlebars');
var bodyParser = require('body-parser');  

/* used app.use below instead.
app.use(function (req, res, next) {   
        // required to send requests to site from another site    
        res.setHeader('Access-Control-Allow-Origin', 'http://web.engr.oregonstate.edu/~traina/');  
        res.setHeader('Access-Control-Allow-Methods', 'GET');   
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');   
        res.setHeader('Access-Control-Allow-Credentials', false);  
        next(); 
});*/

//moved this up after receiving cors errors (http://enable-cors.org/server_expressjs.html)
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});	

//for parsing json data 
/* removed - seemed extraneous 
app.use(bodyParser.urlencoded({ extended: false }));
*/
app.use(bodyParser.json());

//name your port brah -- is it because this port isn't set in my app?  
app.set('port', 58866);

// for accessing static pages 
app.use(express.static('public'));
/*app.use(express.static(path.join(__dirname,'public')));
*/
// for launching html when program launches 
/*
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});
*/
function myFunction() {
    document.getElementById("form").submit();

}

function processData(req) {    
          var context = {};    
          context.method = req.method;   
          context.qParams = [];    
          for(var p in req.query) {      
            context.qParams.push({	'name': p, 'value': req.query[p]       
	    	});
     }        
    return context; 

}

app.get('/', cors(), function(req, res, next){    
  var localityInput = processData(req);   
  request("https://api.brewerydb.com/v2/locations?key=4daf32489a8f98a5db97e45f569d8261&locationType=Cidery&region=Oregon&locality=", + localityInput.qParams[0].value, 
  function (error, response, body) {       
    if (!error && response.statusCode === 200) {        	
    console.log(body);        	
    res.send(body);      	
  }     
});  
});	




app.use(function(req,res){
  //console.error(error.stack);
  res.type('text/plain');
  res.status(404);
  res.send('404 - Not Found');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.send('500 - Server Error');
});


app.listen(app.get('port'), function(){   
        console.log('Express started on port' + app.get('port') + '; press Ctrl-C to terminate.'); 
});	





/*app.get('/results',function(req,res){
  var qParams = [];
  for (var p in req.query){
    qParams.push({'name':p,'value':req.query[p]})
  }
  var context = {};
  context.dataList = qParams;
  res.render('results', context);
});

*/
