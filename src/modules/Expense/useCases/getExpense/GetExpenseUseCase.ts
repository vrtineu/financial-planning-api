import { Expenses } from '../../model/Expenses';

class GetExpenseUseCase {
  public async execute(id: number) {
    const expense = await Expenses.findOne({ expenseId: id }).select(
      '-__v -_id -idDespesa'
    );

    if (!expense) throw new Error('Expense not found');

    return expense;
  }
}

export { GetExpenseUseCase };
