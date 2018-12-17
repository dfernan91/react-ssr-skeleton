export default ({markup, helmet}) => {
    return `<!DOCTYPE html>
            <html ${helmet.htmlAttributes.toString()}>
                <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>   
                    ${helmet.title.toString()}
                    ${helmet.meta.toString()}
                    ${helmet.link.toString()}
                    
                    <link rel="stylesheet" href="/dist/styles.css?v=1"/>
                </head>
                <body>
                    <div id="root">${markup}</div>
                    <script  src="/dist/client.js" async></script>
                </body>
            </html>`;
};