import { Document, Model, model, Schema } from "mongoose";
import autoIncrement from "mongoose-sequence";

const despesasSchema: Schema = new Schema({
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

despesasSchema.plugin(autoIncrement, { inc_field: "id" });

const Despesas: Model<Document> = model("Despesas", despesasSchema);
export default Despesas;
