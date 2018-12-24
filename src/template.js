const serialize = require('serialize-javascript');

export default ({markup, helmet, storeState, shcema}) => {
    return `<!DOCTYPE html>
            <html ${helmet.htmlAttributes.toString()}>
                <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>   
                    ${helmet.title.toString()}
                    ${helmet.meta.toString()}
                    ${helmet.link.toString()}
                    
                    <link rel="stylesheet" href="/dist/styles.css"/>
                </head>
                <body ${helmet.bodyAttributes.toString()}>
                    <div id="root">${markup}</div>
                    <script>
                        window.____storeState_____ = ${serialize(storeState)};
                        console.log("template" , ${serialize(storeState)});
                    </script>  
                    <script  src="/dist/client.js" async></script>
                     ${
                        (typeof schema !== 'undefined') ?
                            `<script type="aplication/ld+json">
                                $ { JSON.stringify(schema) }
                             </script>` : ''
                     }
                </body>
            </html>`;
        };