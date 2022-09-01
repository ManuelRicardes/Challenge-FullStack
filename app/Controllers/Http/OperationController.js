'use strict'
const Operation = require('../../Models/Operation')

//const AutorizacionService = require('../../Services/AutorizacionService')

class OperationController {
    async index({auth}){
        const user = await auth.getUser()
      return await user.operations().fetch()
       
}

    async create({auth,request}){
        const user = await auth.getUser()
        const {concepto, monto, fecha, tipo } = request.all()
        
        const operation = new Operation()
        operation.fill({ 
            concepto,
            monto,
            fecha,
            tipo})

        await user.operations().save(operation)
        
        return operation
    }

    async destroy ({ auth, params }){
       // const user = await auth.getUser()
        const { id } = params
        
        const operation = await Operation.find(id);
       
       
        await operation.delete()
        return operation
    }

    async update({auth,params, request}){
         const user = await auth.getUser()
        const {id} = params
        const operation = await Operation.find(id)
        
        const {concepto, monto, fecha} = request.all()
        //AutorizacionService.verificarPermiso(operation, user)
        await operation.merge({
            concepto,
            monto,
            fecha,
        })
        await Operation.save()
        return operation
    }
}
module.exports = OperationController
