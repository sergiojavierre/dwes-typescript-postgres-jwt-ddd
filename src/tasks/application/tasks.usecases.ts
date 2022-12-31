import Message from "../../context/responses/Message";

import User from "../../users/domain/User";
import Task from "../domain/Task";
import TasksRepository from "../domain/tasks.repository";

export default class TasksUseCases {
  tasksRepository: TasksRepository;

  constructor(tasksRepository: TasksRepository) {
    this.tasksRepository = tasksRepository;
  }

  async create(task: Task): Promise<Task | Message> {
    const taskDB: Task = await this.tasksRepository.create(task);
    if (taskDB.id) {
      return task;
    } else {
      const message: Message = {
        text: "No se ha creado la tarea",
      };
      return message;
    }
  }

  async findByUser(user: User): Promise<Task[]> {
    return await this.tasksRepository.findByUser(user);
  }
}
