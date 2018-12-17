export default ({markup, helmet}) => {
    return `<!DOCTYPE html>
            <html ${helmet.htmlAttributes.toString()}>
                <head>
                    ${helmet.title.toString()}
                    ${helmet.meta.toString()}
                    ${helmet.link.toString()}
                </head>
            </html>`
}