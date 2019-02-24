const express = require('express')
const bodyParser = require('body-parser')

const productosRouter = require('./api/recursos/productos/productos.route')
const app = express()

app.use(bodyParser.json())
app.use('/productos',productosRouter)

app.get('/',(req,res) =>{
    res.send('Api para vender')
})

app.listen(3000,()=>{
    console.log('Escuchando el puesto 3000')
})