const express = require('express')
const _ = require('underscore')
const uuidv4 = require('uuid/v4')
const validarProducto = require('./productos.validate')
const productos = require('../../../database').productos
const productosRouter = express.Router() 

//route
productosRouter.get('/',(req,res)=>{
    res.json(productos)
})
productosRouter.post('/',validarProducto,(req,res)=>{
    let nuevoProducto = req.body
    
    nuevoProducto.id = uuidv4()
    productos.push(nuevoProducto)
    res.status(201).json(nuevoProducto)
}) 

productosRouter.get('/:id',(req,res)=>{
    for(let producto of productos){
        if(producto.id == req.params.id){
            res.json(producto)
            return
        }
    }
    res.status(404).send(`El producto con id[${req.params.id}] no existe`)
})
productosRouter.put('/:id',validarProducto,(req,res)=>{
    let id = req.params.id
    let reemplazoParaProducto = req.body
 
    let indice = _.findIndex(productos,producto => producto.id == id)

    if(indice !=-1){
        reemplazoParaProducto.id = id
        productos[indice]=reemplazoParaProducto
        res.status(200).json(reemplazoParaProducto)
    }else {
        res.status(404).send(`El producto con id[${id}] no existe`)
    }
})
productosRouter.delete('/:id',(req,res)=>{
    let indiceABorrar = _.findIndex(productos,producto => producto.id == req.params.id)
    if(indiceABorrar ==-1){
        res.status(404).send(`El producto con id[${req.params.id}] no existe para borrar`)
        return
    }else {
        let borrado = productos.splice(indiceABorrar,1)
        res.json(borrado)
    }
})
 
module.exports = productosRouter