import "./ExpenseItem.css";
import ExpensesDate from "../ExpensesDate/ExpensesDate";

import Card from "../UI/Card";

const ExpenseItem = (props) => {
  return (
    <Card className="expense-item">
      <ExpensesDate date={props.date} />
      <h2 className="expense-item__description">{props.items}</h2>
      <div className="expense-item__price">${props.amout}</div>
    </Card>
  );
};

export default ExpenseItem;
