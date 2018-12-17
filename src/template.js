export default ({markup, helmet}) => {
    return `<!DOCTYPE html>
            <html ${helmet.htmlAttributes.toString()}>
                <head>
                    ${helmet.title.toString()}
                    ${helmet.meta.toString()}
                    ${helmet.link.toString()}
                </head>
                <body>
                    <div id="root">${markup}</div>
                    <script  src="/dist/client.js" async></script>
                </body>
            </html>`;
};