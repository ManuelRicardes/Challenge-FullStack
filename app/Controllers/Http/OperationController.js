'use strict'
const Operation = require('../../Models/Operation')

class OperationController {
    async index({auth}){
        const user = await auth.getUser()
      return await user.operations().fetch()
       
}

    async create({auth,request}){
        const user = await auth.getUser()
        const {concepto, monto, fecha, tipo } = request.all()
        console.log(monto)
        const operation = new Operation()
        operation.fill({ 
            concepto,
            monto,
            fecha,
            tipo})

        await user.operations().save(operation)
        
        return operation
    }
}
module.exports = OperationController
