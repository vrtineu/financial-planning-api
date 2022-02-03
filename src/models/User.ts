import { Model, model, Schema } from "mongoose";

export interface User {
  email: string;
  password: string;
}

const schema: Schema = new Schema<User>({
  email: {
    type: String,
    required: [true, "Email é obrigatório"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Senha é obrigatória"],
  },
});

const Users: Model<User> = model("Users", schema, "users");
export default Users;
