import mongoose, { Model, model, Schema } from "mongoose";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const autoIncrement = require("mongoose-sequence")(mongoose);

interface Receita {
  idReceita: number;
  descricao: string;
  valor: number;
  data: Date;
}

const schema: Schema = new Schema<Receita>({
  idReceita: {
    type: Number,
    unique: true,
  },
  descricao: {
    type: String,
    required: true,
  },
  valor: {
    type: Number,
    required: true,
  },
  data: {
    type: Date,
    required: true,
  },
});

schema.plugin(autoIncrement, { inc_field: "idReceita" });

const Receitas: Model<Receita> = model("Receitas", schema, "receitas");
export default Receitas;
