export interface ICreateExpenseDTO {
  description: string;
  value: number;
  date: Date;
  category: string;
  userId: string;
}
