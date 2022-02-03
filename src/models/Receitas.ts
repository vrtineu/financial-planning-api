import mongoose, { Model, model, Schema } from "mongoose";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const autoIncrement = require("mongoose-sequence")(mongoose);

export interface Receita {
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
    required: [true, "Descrição é obrigatória"],
  },
  valor: {
    type: Number,
    min: [0, "Valor não pode ser negativo"],
    required: [true, "Valor é obrigatório"],
  },
  data: {
    type: Date,
    required: [true, "Data é obrigatória"],
  },
});

schema.plugin(autoIncrement, { inc_field: "idReceita" });

const Receitas: Model<Receita> = model("Receitas", schema, "receitas");
export default Receitas;
