import React from 'react';
import ReactDOMServer from 'react-dom/server';
import {StaticRouter} from 'react-router-dom';
import {Helmet} from 'react-helmet';
import Template from './template';
import App from './App/App/App';


export default function serverRender({clientStats,serverStats}){
    return(req,res,next) =>{
        const context = {};

        //default status code
        let status = 200;


        const markup = ReactDOMServer.renderToString(
          <StaticRouter location={req.url} context={context}>
              <App/>
          </StaticRouter>
        );


        const template = Template({
            markup : markup,
            helmet : Helmet.renderStatic(),
        });
        res.status(status).send(template);
    };
}

