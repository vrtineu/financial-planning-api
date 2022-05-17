import { AppError } from 'errors/AppError';

import { Expenses } from '../../model/Expenses';

class DeleteExpenseUseCase {
  public async execute(id: number) {
    const expense = await Expenses.findOneAndDelete({ expenseId: id });

    if (!expense) throw new AppError('Expense not found', 404);

    return {
      message: 'Expense deleted',
    };
  }
}

export { DeleteExpenseUseCase };
