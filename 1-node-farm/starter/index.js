const fs = require('fs')
const http = require('http')
const url = require('url')

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
const server = http.createServer((req, res) => {
    console.log(req.url)

    const pathName = req.url

    if (pathName === '/overview' || pathName === '/') {
        res.end('This is the overview')
    } else if (pathName === '/product') {
        res.end('Hahaha')
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