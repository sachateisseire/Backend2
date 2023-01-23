import express from "express";

const app = express()
const port = 8000

app.get('/', (req, res)=>{
    res.send('hi al get')
})

app.get('/saludo', (req,res) => {
    res.json({message: 'Hola coders!'})
})


app.listen(port, ()=>{
    console.log(`Server running at port ${port}`)
})