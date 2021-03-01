const fs = require('fs')
const http = require('http')
const url = require('url')

const replaceTemplate = require('./modules/replaceTemplate')

/////////////////////////////////////////////////////////////
// FILES

// Blocking
const textIn = fs.readFileSync('./txt/input.txt', 'utf-8')
console.log(textIn)
const textOut = `Hahahahhaa ${Date.now()}`
fs.writeFileSync('./txt/output.txt', textOut)
console.log('File has been written! Yeeey!')

// Non-Blocking, async
fs.readFile('./txt/start.txt', 'utf-8', (error, data0) => {
    fs.readFile(`./txt/${data0}.txt`, 'utf-8', (error, data1) => {
        console.log(data1)
        fs.readFile('./txt/append.txt', 'utf-8', (error, data2) => {
            console.log(data2)

            fs.writeFile('./txt/final.txt', `${data1}\n${data2}`, 'utf-8', err => {
                console.log('Your file your file')
            })
        })
    })
})


console.log('Hahahahhaa I win even though I am further ahead!!')

// ////////////////////////////////////////////////////
// Server
const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8')
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8')
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8')

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8')
const dataObj = JSON.parse(data)

const server = http.createServer((req, res) => {

    const { query, pathname } = url.parse(req.url, true)

    // OVERVIEW PAGE
    if (pathname === '/overview' || pathname === '/') {
       res.writeHead(200, {'Content-type': 'text/html'})

        const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('')
        const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml)
       res.end(output)

        // PRODUCT PAGE
    } else if (pathname === '/product') {
       res.writeHead(200, {'Content-type': 'text/html'})
       const product = dataObj[query.id]
       const output = replaceTemplate(tempProduct, product)
       res.end(output)
        // API
    } else if (pathname === '/api') {
       res.writeHead(200, {'Content-type': 'application/json'})
       res.end(data)
    //    NOT FOUND
    } else {
        res.writeHead(404, {
            'Content-type': 'text/html',
            'muhahaha': 'Crazy fun'
        })
        res.end('<h1>Page not found</h1>')
    }
    // res.end('Death from the server')
})

server.listen(8000, '127.0.0.1', () => {
    console.log('I hear you')
})