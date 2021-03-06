const Joi = require('joi')
const blueprintProducto = Joi.object().keys({
    titulo:Joi.string().max(100).required(),
    precio:Joi.number().positive().precision(2).required(),
    moneda:Joi.string().length(3).uppercase()
})
module.exports = validarProducto =(req,res,next) => {

    let resultado = Joi.validate(req.body,blueprintProducto,{abortEarly:false,convert:false})
    
    if(resultado.error === null){
        next() 
    }else { 
        let erroresValidacion = resultado.error.details.reduce((acululador,error) => {
            return acululador + `[${error.message}]`
        },"")
 
        res.status(400).send(erroresValidacion)
    }
}
 