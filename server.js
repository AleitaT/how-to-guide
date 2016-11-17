var express = require('express'); 
var app = express(); 
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var request = require('request'); 

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
 

var bodyParser = require('body-parser');  
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('port', 58866);
app.use(express.static('public'));

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


app.get('/', function(req, res, next){    
  var localityInput = processData(req);   
  request("https://api.brewerydb.com/v2/locations?key=4daf32489a8f98a5db97e45f569d8261&locationType=Cidery&region=Oregon&region=oregon&locality=" + localityInput.qParams[0].value, 
  function (error, response, body) {       
    if (!error && response.statusCode === 200) {        	
    console.log(body);        	
    res.send(body);      	
  }     
});  
});	

app.use(function (req, res, next) {   
        // required to send requests to site from another site    
        res.setHeader('Access-Control-Allow-Origin', '//flip3.engr.oregonstate.edu:58866');  
        res.setHeader('Access-Control-Allow-Methods', 'GET');   
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');   
        res.setHeader('Access-Control-Allow-Credentials', false);  
        next(); });	

function myFunction() {
    document.getElementById("form").submit();
}



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
        console.log('Express started on port' + app.get('port') + '; press Ctrl-C to terminate.'); });	





app.get('/results',function(req,res){
  var qParams = [];
  for (var p in req.query){
    qParams.push({'name':p,'value':req.query[p]})
  }
  var context = {};
  context.dataList = qParams;
  res.render('results', context);
});





