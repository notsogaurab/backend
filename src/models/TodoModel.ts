import knex from "../db/knex";
import TodoInterface from "../domain/Todo";

class TodoModel {
  public static table = "todo_table";

  public static async getAllTodos() {
    const users = await knex(this.table).select();
    return users;
  }

  public static async getTodoById(id: number) {
    const user = await knex(this.table).where({ id }).first();
    return user;
  }

  public static async createTodo(Todo: TodoInterface) {
    console.log(Todo);
    const [insertedValue] = await knex(this.table).insert(Todo).returning("*");
    console.log("hello", insertedValue);
    return insertedValue;
  }

  public static async editTodo(id: number, todo: Partial<TodoInterface>) {
    const [updatedValue] = await knex(this.table)
      .where( {id} )
      .update( todo )
      .returning("*");
    return updatedValue;
  }

  public static async deleteTodo(id: number) {
    const deletedValue = await knex(this.table)
      .where({ id })
      .del()
      .returning("*");
    return deletedValue;
  }
}

export default TodoModel;
