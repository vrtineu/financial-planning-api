import { Document, Model, model, Schema } from "mongoose";
import autoIncrement from "mongoose-sequence";

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

const Receitas: Model<Document> = model("Receitas", receitasSchema);
export default Receitas;
