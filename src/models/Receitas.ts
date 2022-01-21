import mongoose, { Document, Model, model, Schema } from "mongoose";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const autoIncrement = require("mongoose-sequence")(mongoose);

const receitasSchema: Schema = new Schema({
  id: {
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

receitasSchema.plugin(autoIncrement, { inc_field: "id" });

const Receitas: Model<Document> = model("Receitas", receitasSchema, "receitas");
export default Receitas;
