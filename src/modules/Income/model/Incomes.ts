import mongoose, { Model, model, Schema } from 'mongoose';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const autoIncrement = require('mongoose-sequence')(mongoose);

export interface IIncome {
  incomeId: number;
  description: string;
  value: number;
  date: Date;
}

const schema: Schema = new Schema<IIncome>({
  incomeId: {
    type: Number,
    unique: true,
  },
  description: {
    type: String,
    required: [true, 'Descrição é obrigatória'],
  },
  value: {
    type: Number,
    min: [0, 'Valor não pode ser negativo'],
    required: [true, 'Valor é obrigatório'],
  },
  date: {
    type: Date,
    required: [true, 'Data é obrigatória'],
  },
});

schema.plugin(autoIncrement, { inc_field: 'incomeId' });

export const Incomes: Model<IIncome> = model('Incomes', schema, 'incomes');
