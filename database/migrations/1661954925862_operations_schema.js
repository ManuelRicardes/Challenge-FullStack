'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OperationsSchema extends Schema {
  up () {
    this.create('operations', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.string('concepto',80).notNullable()
      table.integer('monto').notNullable()
      table.date('fecha')
      table.string('tipo',80).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('operations')
  }
}

module.exports = OperationsSchema
