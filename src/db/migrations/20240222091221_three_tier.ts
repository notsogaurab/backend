import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
}

exports.up = function(knex: Knex) {
    return knex.schema.createTable('todo_table', (table) => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.boolean('is_done').notNullable().defaultTo(false);
    });   
};

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('todo_table');
}