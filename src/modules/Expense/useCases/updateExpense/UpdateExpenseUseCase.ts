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
  }: IUpdateExpenseDTO) {
    const idExists = await Expenses.findOne({ expenseId: id });
    if (!idExists) throw new AppError('Expense not found', 404);

    const despesa = await isFromSameMonth({ date, description, id }, Expenses);
    if (despesa) throw new AppError('Expense already exists', 400);

    await Expenses.findOneAndUpdate(
      { expenseId: id },
      { description, value, date, category }
    );

    return {
      message: 'Expense updated',
    };
  }
}

export { UpdateExpenseUseCase };
