import mongoose, { Document, Model, model, Schema } from "mongoose";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const autoIncrement = require("mongoose-sequence")(mongoose);

const despesasSchema: Schema = new Schema({
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

despesasSchema.plugin(autoIncrement, { inc_field: "idDespesa" });

const Despesas: Model<Document> = model("Despesas", despesasSchema, "despesas");
export default Despesas;
