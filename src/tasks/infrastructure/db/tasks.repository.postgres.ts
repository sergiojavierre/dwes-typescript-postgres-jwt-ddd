import User from "../../../users/domain/User";
import Task from "../../domain/Task";
import executeQuery from "../../../context/db/postgres.connector";
import TasksRepository from "../../domain/tasks.repository";

/*
¡¡¡LA COLUMNA USER LLEVA COMILLAS POR SER UNA PALABRA RESERVADA Y DISTINGUIRLA DE LA COLUMNA!!!
*/
export default class TasksRepositoryPostgres implements TasksRepository {
  async create(task: Task): Promise<Task> {
    try {
      if (task.user) {
        const result = await executeQuery(
          `insert into tasks (task, "user") values ('${task.task}','${task.user.name}') RETURNING id`
        );
        task.id = result[0].id;
      }
    } catch (error) {
      console.error(error);
    }
    return task;
  }

  async findByUser(user: User): Promise<Task[]> {
    const tasks: Task[] = [];
    const sql = `select id, task from tasks where "user" = '${user.name}'`;
    const tasksFromDB: any[] = await executeQuery(sql);
    for (const item of tasksFromDB) {
      const task: Task = {
        id: item.id,
        task: item.task,
      };
      tasks.push(task);
    }
    return tasks;
  }
}
