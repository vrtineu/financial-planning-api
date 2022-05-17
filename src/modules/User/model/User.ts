import { Model, model, Schema } from 'mongoose';

export interface IUser {
  email: string;
  password: string;
  name: string;
  lastname: string;
  role: string;
}

const schema: Schema = new Schema<IUser>({
  email: {
    type: String,
    required: [true, 'Email é obrigatório'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Senha é obrigatória'],
  },
  name: {
    type: String,
    required: [true, 'Nome é obrigatório'],
  },
  lastname: {
    type: String,
    required: [true, 'Sobrenome é obrigatório'],
  },
  role: {
    type: String,
    required: [true, 'Role é obrigatório'],
  },
});

const Users: Model<IUser> = model('Users', schema, 'users');
export default Users;
