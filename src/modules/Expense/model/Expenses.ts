import mongoose, { Model, model, Schema } from 'mongoose';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const autoIncrement = require('mongoose-sequence')(mongoose);

export interface IExpense {
  expenseId: number;
  category: string;
  description: string;
  value: number;
  date: Date;
}

const schema: Schema = new Schema<IExpense>({
  expenseId: {
    type: Number,
    unique: true,
  },
  category: {
    type: String,
    enum: [
      'Alimentação',
      'Saúde',
      'Moradia',
      'Transporte',
      'Educação',
      'Lazer',
      'Imprevistos',
      'Outros',
    ],
    default: 'Outros',
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

schema.plugin(autoIncrement, { inc_field: 'expenseId' });

export const Expenses: Model<IExpense> = model('Expenses', schema, 'expenses');
