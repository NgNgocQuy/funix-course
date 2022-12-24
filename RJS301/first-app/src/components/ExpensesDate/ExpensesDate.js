import "./ExpensesDate.css";

const ExpensesDate = (props) => {
  return (
    <div className="expense-date">
      <div className="expense-date__yea">
        {props.date.getFullYear().toString()}
      </div>
      <div className="expense-date__month">
        {props.date.toLocaleString("default", { month: "long" }).toString()}
      </div>
      <div className="expense-date__day">{props.date.getDay().toString()}</div>
    </div>
  );
};

export default ExpensesDate;
