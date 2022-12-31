import User from "../../users/domain/User";

export default interface Task {
  id?: Number;
  task: String;
  user?: User;
}
