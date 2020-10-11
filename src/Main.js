import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App'
var AppContainer = document.getElementById("app-container");
 
    //If it isn't "undefined" and it isn't "null", then it exists.
if(typeof(AppContainer) != 'undefined' && AppContainer != null){
    ReactDOM.hydrate(
        <App/>
    , AppContainer
);
} else{
    console.log('AppContainer does not exist!');
}
