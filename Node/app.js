import express from "express"

const app = express()

app.use(express.static('public'))

app.listen(8080, ()=>{
    console.log("Server Started");
})

app.get('/', (req, res)=>{
    res.render('./public/index.html')
})