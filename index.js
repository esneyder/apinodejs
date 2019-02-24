const express = require('express')
const bodyParser = require('body-parser')
const logger = require('./utils/logger')
const productosRouter = require('./api/recursos/productos/productos.route')
 
logger.info('Hola Soy winston')
logger.debug('Hola Soy debug')
logger.warn('Hola Soy una advertencia')
logger.error('Hola Soy un error')
const app = express()

app.use(bodyParser.json())
app.use('/productos', productosRouter)

app.get('/', (req, res) => {
    res.send('Api para vender')
})

app.listen(3000, () => {
    console.log('Escuchando el puesto 3000')
})