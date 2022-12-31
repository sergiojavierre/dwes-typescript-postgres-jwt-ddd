import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT;
app.use(express.json());
const allowedOrigins = ["*"];
const options: cors.CorsOptions = {
  origin: allowedOrigins,
};
app.use(cors(options));

//routers
import { routerUsers } from "./users/infrastructure/rest/users.router";
import { routerTasks } from "./tasks/infrastructure/rest/tasks.router";
app.use("/users/", routerUsers);
app.use("/tasks/", routerTasks);

app.listen(process.env.PORT, () => {
  console.log(`Application started on port ${port}`);
});
