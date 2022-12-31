import express, { Request, Response } from "express";
const router = express.Router();

//usescases
import TasksUseCases from "../../application/tasks.usecases";
//repository
import TasksRepository from "../../domain/tasks.repository";
import TasksRepositoryPostgres from "../db/tasks.repository.postgres";
//domain
import Task from "../../domain/Task";
import User from "../../../users/domain/User";
import Message from "../../../context/responses/Message";
import { isAuth } from "../../../context/security/auth";
//implementation
const tasksRepository: TasksRepository = new TasksRepositoryPostgres();
const tasksUseCases: TasksUseCases = new TasksUseCases(tasksRepository);

router.post("/create", isAuth, async (req: Request, res: Response) => {
  try {
    const user: User = req.body.auth;
    const task: Task = {
      task: req.body.task,
      user,
    };
    const result: Task | Message = await tasksUseCases.create(task);
    res.json(result);
  } catch (error) {
    const message: Message = {
      text: String(error),
    };
    res.status(500).send(message);
  }
});

router.get("/", isAuth, async (req: Request, res: Response) => {
  try {
    const user: User = req.body.auth;
    const tasks: Task[] = await tasksUseCases.findByUser(user);
    res.send(tasks);
  } catch (error) {
    const message: Message = {
      text: String(error),
    };
    res.status(500).send(message);
  }
});

export { router as routerTasks };
