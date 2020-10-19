const express =require('express'),
bodyParser =require('body-parser'),
path =require('path'),
fs =require('fs'),
http =require('http'),
compression =require('compression'),
jwt =require('jsonwebtoken'),
app = express(), 
PORT=process.env.PORT||49840,
models = require(path.resolve(__dirname+"/app/config/config.js"));
const {SECRET_KEY} =require("./app/constants/constants")

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression()); 
app.use((req, res, next)=> {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.set('view engine', '.html');

app.get(['/app.js','/user/profile/app.js'],function(req,res){
    res.sendFile(path.resolve(__dirname+'/build/app.js'))
}); 
const verifyToken=(req,res,next)=>{
    const bearerHeader=req.headers['authorization'];

    if(typeof bearerHeader!==undefined){
      let bearerToken=bearerHeader.split(" ")[1];
      req.token=bearerToken;
      next();
    }
    else{
      res.sendStatus(403);
    }
}
app.get('/api/secure',verifyToken,(req,res)=>{
  jwt.verify(req.token,SECRET_KEY,(error,authData)=>{
      if(error){
        res.sendStatus(403);
      }
      else{
        res.json({
          authData,
          message:"Secured endpoint"
        })
      }
  })
  
})
require(path.resolve(__dirname+'/app/route/auth.route.js'))(app,path);

models.sequelize.sync().then(function() {
  console.log('http://localhost:'+PORT+' works')
}).catch(function(err) {
  console.log(err, "Something went wrong with the Database Update!")
});
/**
 * @see https://github.com/expressjs/csurf
 */
http.createServer(app, (req, res) => {
    res.set({
      'Access-Control-Allow-Credentials': true,
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'X-Content-Type-Options':'nosniff',
      'Vary':'Origin, Accept-Encoding',
      'Pragma':'no-cache',
      'Expires':-1
    })
    res.writeHead(200); 
    console.log('http://localhost:'+PORT+' !');
}).listen(PORT);