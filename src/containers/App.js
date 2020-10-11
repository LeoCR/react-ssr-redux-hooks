import React from 'react';
import { Route ,Switch } from 'react-router-dom';
var Router;
if (typeof document !== "undefined") {
  Router = require("react-router-dom").BrowserRouter;
} 
else {
  Router = require("react-router-dom").StaticRouter;
} 
const App=()=>{
    return(
        <React.Fragment> 
            <Router>
                <Switch>
                    <Route path='/' exact render={()=>
                        <h2>React App</h2>
                    }/>
                </Switch>  
            </Router> 
        </React.Fragment>
    )
}
export default App;