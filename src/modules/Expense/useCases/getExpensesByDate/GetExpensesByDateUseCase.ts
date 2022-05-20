import { AppError } from '@errors/AppError';
import { Expenses, IExpense } from '@modules/Expense/model/Expenses';

interface IRequest {
  year: number;
  month: number;
  userId: string;
}

class GetExpensesByDateUseCase {
  public async execute({ month, userId, year }: IRequest): Promise<IExpense[]> {
    const filter = {
      date: {
        $gte: new Date(`${year}-${month}-01`),
        $lte: new Date(`${year}-${month}-31`),
      },
      userId,
    };

    const expenses = await Expenses.find(filter).select('-__v -_id -expenseId');

    if (!expenses || !expenses.length)
      throw new AppError('Nenhuma despesa encontrada', 404);

    return expenses;
  }
}

export { GetExpensesByDateUseCase };
