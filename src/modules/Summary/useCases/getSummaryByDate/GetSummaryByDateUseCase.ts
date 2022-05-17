import { AppError } from 'errors/AppError';
import { Expenses } from 'modules/Expense/model/Expenses';
import { Incomes } from 'modules/Income/model/Incomes';

class GetSummaryByDateUseCase {
  public async execute(year: number, month: number) {
    const filterDate = {
      date: {
        $gte: new Date(`${year}-${month}-01`),
        $lte: new Date(`${year}-${month}-31`),
      },
    };

    const totalExpenses = await Expenses.aggregate([
      { $match: filterDate },
      { $group: { _id: null, total: { $sum: '$value' } } },
    ]);

    const totalIncomes = await Incomes.aggregate([
      { $match: filterDate },
      { $group: { _id: null, total: { $sum: '$value' } } },
    ]);

    const valuesOfExpensesByCategory = await Expenses.find(filterDate)
      .select('value category -_id')
      .then((data) => {
        return data.reduce((acc, cur) => {
          const { category, value } = cur;

          if (!acc[category]) {
            acc[category] = value;
          } else {
            acc[category] += value;
          }

          return acc;
        }, {} as { [key: string]: number });
      });

    if (!totalIncomes.length || !totalExpenses.length) {
      if (!totalIncomes.length && !totalExpenses.length)
        throw new AppError('Nenhuma despesa ou receita encontrada', 404);

      if (!totalIncomes.length)
        return {
          totalExpenses: totalExpenses[0].total,
          totalIncomes: 0,
          valuesOfExpensesByCategory,
        };

      if (!totalExpenses.length)
        return {
          totalExpenses: 0,
          totalIncomes: totalIncomes[0].total,
          valuesOfExpensesByCategory,
        };
    }

    return {
      totalExpenses: totalExpenses[0].total,
      totalIncomes: totalIncomes[0].total,
      valuesOfExpensesByCategory,
    };
  }
}

export { GetSummaryByDateUseCase };
