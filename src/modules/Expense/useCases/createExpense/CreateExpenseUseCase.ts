import { AppError } from '@errors/AppError';
import { ICreateExpenseDTO } from '@modules/Expense/dtos/ICreateExpenseDTO';
import { Expenses } from '@modules/Expense/model/Expenses';
import { isFromSameMonth } from '@utils/isFromSameMonth';

class CreateExpenseUseCase {
  public async execute({
    category,
    date,
    description,
    value,
    id,
  }: ICreateExpenseDTO) {
    const expense = new Expenses({
      description,
      value,
      date,
      category,
    });

    const expenseAlreadyExists = await isFromSameMonth(
      { date, description, id },
      Expenses
    );

    if (expenseAlreadyExists)
      throw new AppError('Já existe uma despesa registrada para este mês.');

    await expense.save();

    return expense;
  }
}

export { CreateExpenseUseCase };
