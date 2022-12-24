import Card from "./UI/Card";

import ExpenseItem from "./expensesItem/ExpenseItem";

import "./Expenses.css";

const Expenses = () => {
  const expenses = [
    {
      id: "e1",
      title: "toilet Paper",
      amout: 94.12,
      date: new Date(2022, 6, 18),
    },
    {
      id: "e2",
      title: " Paper",
      amout: 173.12,
      date: new Date(2021, 4, 18),
    },
    {
      id: "e3",
      title: "New TV",
      amout: 800.12,
      date: new Date(2020, 1, 8),
    },
    {
      id: "e4",
      title: "Car figure",
      amout: 400.12,
      date: new Date(2022, 12, 20),
    },
  ];
  return (
    <Card className="expenses">
      <ExpenseItem
        id={expenses[0].id}
        items={expenses[0].title}
        amout={expenses[0].amout}
        date={expenses[0].date}
      />
      <ExpenseItem
        id={expenses[1].id}
        items={expenses[1].title}
        amout={expenses[1].amout}
        date={expenses[1].date}
      />
      <ExpenseItem
        id={expenses[2].id}
        items={expenses[2].title}
        amout={expenses[2].amout}
        date={expenses[2].date}
      />
      <ExpenseItem
        id={expenses[3].id}
        items={expenses[3].title}
        amout={expenses[3].amout}
        date={expenses[3].date}
      />
    </Card>
  );
};

export default Expenses;
