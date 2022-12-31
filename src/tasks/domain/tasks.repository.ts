import User from "../../users/domain/User";
import Task from "./Task";

export default interface TasksRepository {
  create(task: Task): Promise<Task>;
  findByUser(user: User): Promise<Task[]>;
}
