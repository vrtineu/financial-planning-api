import mongoose, { Model, model, Schema } from "mongoose";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const autoIncrement = require("mongoose-sequence")(mongoose);

export interface Despesa {
  idDespesa: number;
  categoria: string;
  descricao: string;
  valor: number;
  data: Date;
}

const schema: Schema = new Schema<Despesa>({
  idDespesa: {
    type: Number,
    unique: true,
  },
  categoria: {
    type: String,
    enum: ["Alimentação", "Saúde", "Moradia", "Transporte", "Educação", "Lazer", "Imprevistos", "Outros"],
    default: "Outros",
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

schema.plugin(autoIncrement, { inc_field: "idDespesa" });

const Despesas: Model<Despesa> = model("Despesas", schema, "despesas");
export default Despesas;
