import TodoInterface from "../domain/Todo"; 
import TodoModel from "../models/TodoModel";

export const getAllTodos = async (): Promise<{ todos: TodoInterface[]; message: string }> => {
  try {
    const todos = await TodoModel.getAllTodos();
    return {
      todos,
      message: 'ToDos fetched successfully'
    };
  } catch (error) {
    throw new Error('Failed to fetch todos');
  }
};

export const createTodo = async (newtodo: TodoInterface): Promise<{ todo: TodoModel[]; message: string }> => {
console.log(newtodo);
  try {
      const todo = await TodoModel.createTodo(newtodo);
      console.log(todo);
      return { todo, message: 'Todo created successfully' };
  }
  catch (error) {
      throw error;
  }

}
export const getTodoById = async (id: number): Promise<{ todo: TodoInterface | null; message: string }> => {
  try {
    const todo = await TodoModel.getTodoById(id);
    if (todo) {
      return {
        todo,
        message: 'Todo found'
      };
    } else {
      return {
        todo: null,
        message: 'Todo not found'
      };
    }
  } catch (error) {
    throw new Error('Failed to fetch todo by ID');
  }
};

export const editTodo = async (id: number, todo: Partial<TodoInterface>): Promise<string> => {
  try {
    await TodoModel.editTodo(id, todo);
    return 'Todo edited successfully';
  } catch (error) {
    console.error('Error editing todo:', error);
    throw new Error('Failed to edit todo');
  }
};


export const deleteTodo = async (id: number): Promise<string> => {
  try {
    await TodoModel.deleteTodo(id);
    return 'Todo deleted successfully';
  } catch (error) {
    throw new Error('Failed to delete todo');
  }
};