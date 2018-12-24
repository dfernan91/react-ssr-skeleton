import React from 'react';
import {renderToString} from 'react-dom/server';
import {StaticRouter , matchPath} from 'react-router-dom';
import {Helmet} from 'react-helmet';
import Template from './template';
import App from './App/App/App';
import createStore, {defaultState} from "./store";
import {routeList} from "./tools/route";
import {isExist} from "./tools/helper";
import {Provider} from "react-redux";


export default function serverRender(){
    return(req,res) =>{

        // global server properties
        global.serverReq = req;
        global.storeState = {...defaultState}; // copy of defaultState

        let status = 200;

        const reqUrl = req.url.split('?')[0];

        const currentRoute = routeList.find(route => matchPath(reqUrl, route));


        const initialData = isExist(currentRoute.component) ?
            currentRoute.component.fetchData && currentRoute.component.fetchData()
            :
            true;



        if(currentRoute.status)
            status = currentRoute.status;

        Promise.resolve(initialData)
            .then(() => {
               try {
                   const store = createStore(global.storeState);

                   const context = {};


                   const jsx = (
                       <Provider store={store}>
                            <StaticRouter location={req.url} context={context}>
                                <App/>
                            </StaticRouter>
                       </Provider>
                   );

                   const markup = renderToString(jsx);

                   if(context.url) {
                       res.redirect(301 , context.url);
                   }else {
                       let nowState = store.getState();
                       for(var key in defaultState) {
                           if(!defaultState.hasOwnProperty(key)) continue;
                           const
                               lastValue = JSON.stringify(nowState[key]),
                               nowValue = JSON.stringify(defaultState[key]);

                           if(lastValue === nowValue)
                               delete nowState[key];
                       }
                       const template = Template({
                           markup : markup,
                           helmet : Helmet.renderStatic(),
                           storeState : nowState,
                           schema: global._schema
                       });
                       res.status(status).send(template);
                   }
               }catch(error) {
                   console.log(error);
               }
            });
    };
}

