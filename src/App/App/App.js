import React, {Component} from 'react';

import "./_style/vendor/bootstrap/_bootstrap.scss";
//Styles
import "./_style/app/_app.scss";
import {Route, Switch} from "react-router-dom";
import {routeList} from "../../tools/route";

class App extends Component {
    render() {
        return (
            <Switch>
                {
                    routeList.map((route,index) => <Route key={index} {...route}/>)
                }
            </Switch>
    );
    }
}

export default App;


