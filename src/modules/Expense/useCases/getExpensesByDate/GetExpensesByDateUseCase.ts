import { Expenses } from '../../model/Expenses';

class GetExpensesByDateUseCase {
  public async execute(year: number, month: number) {
    const filter = {
      date: {
        $gte: new Date(`${year}-${month}-01`),
        $lte: new Date(`${year}-${month}-31`),
      },
    };

    const expenses = await Expenses.find(filter).select('-__v -_id -expenseId');

    if (!expenses || !expenses.length)
      throw new Error('Nenhuma despesa encontrada');

    return expenses;
  }
}

export { GetExpensesByDateUseCase };
