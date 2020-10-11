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

const app = express();
const PORT=process.env.PORT||49840;
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
})
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