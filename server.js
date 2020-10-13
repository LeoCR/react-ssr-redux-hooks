import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import fs from 'fs';
import App from './src/containers/App';
/* import {Provider} from "react-redux";
import store from "./src/store"; */ 
import http from 'http';
import { StaticRouter } from "react-router";
import compression from 'compression'; 
import jwt from 'jsonwebtoken';
import {SECRET_KEY} from "./app/constants/constants";
const app = express();
const PORT=process.env.PORT||49840;
const models = require(path.resolve(__dirname+"/app/config/config.js"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression()); 
app.set('view engine', '.html');
app.get(['/','/api'],function (req, res) {
    var context = {};
    const MainApp = ReactDOMServer.renderToStaticMarkup(
        <StaticRouter location={req.url} context={context}>
          {/* <Provider store={store}>
            <App /> 
          </Provider> */}
          <App /> 
        </StaticRouter>
    );
    const indexFile = path.resolve(__dirname+'/build/index.html');
    fs.readFile(indexFile, 'utf8', (err, data) => {
        if (err) {
          console.error('Something went wrong:', err);
          return res.status(500).send('Oops, better luck next time!');
        }
        var tempData=data;
        tempData.replace('<div id="app-container"></div> ', `<div id="app-container">${MainApp}</div>`)
        //const markup   = appendUniversalPortals(tempData);
        return res.send(tempData).status(200);
    });
});
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