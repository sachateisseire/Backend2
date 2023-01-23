import * as http from 'http';

const port = 8080

const server = http.createServer((request,response) =>{
    response.end("¡Mi primer hola mundo desde backend!")
})

server.listen(port,()=>{
    console.log(`Listening port at ${port}`)
})

