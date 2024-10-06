/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('tarefas', function (table) {
        table.increments('id').primary();
        table.string('descricao').notNullable();
        table.boolean('completa').defaultTo(false);
        table.integer('usuario_id')
            .unsigned()
            .references('id')
            .inTable('usuarios')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
        table.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('tarefas');
};
