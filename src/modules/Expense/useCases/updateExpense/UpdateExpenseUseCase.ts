import { AppError } from '@errors/AppError';
import { IUpdateExpenseDTO } from '@modules/Expense/dtos/IUpdateExpenseDTO';
import { Expenses } from '@modules/Expense/model/Expenses';
import { isFromSameMonth } from '@utils/isFromSameMonth';

class UpdateExpenseUseCase {
  public async execute({
    id,
    date,
    description,
    value,
    category,
    userId,
  }: IUpdateExpenseDTO) {
    const idExists = await Expenses.findOne({ expenseId: id, userId });
    if (!idExists) throw new AppError('Expense not found', 404);

    const expense = await isFromSameMonth({ date, description, id }, Expenses);
    if (expense) throw new AppError('Despesa já registrada para este mês.');

    await Expenses.findOneAndUpdate(
      { expenseId: id, userId },
      { description, value, date, category }
    );

    return {
      message: 'Expense updated',
    };
  }
}

export { UpdateExpenseUseCase };
