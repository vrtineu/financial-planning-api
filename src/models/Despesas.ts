import mongoose, { Model, model, Schema } from "mongoose";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const autoIncrement = require("mongoose-sequence")(mongoose);

interface Despesa {
  idDespesa: number;
  descricao: string;
  valor: number;
  data: Date;
}

const schema: Schema = new Schema<Despesa>({
  idDespesa: {
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

schema.plugin(autoIncrement, { inc_field: "idDespesa" });

const Despesas: Model<Despesa> = model("Despesas", schema, "despesas");
export default Despesas;
