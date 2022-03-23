//helper functons

const qs = (selector) => document.querySelector(selector);
// const incomeSum = () =>
//   incomes.reduce((acc, { income }) => acc + income.value, 0);
// const expenseSum = () =>
//   expenses.reduce((acc, { expense }) => acc + expense.value, 0);
//DOM elements
const addIncomeDOM = qs("#add-income");
const incomesDOM = qs("#incomes");
const sumOfIncomesDOM = qs("#sum-of-incomes");

// DOM EXPENSES
const addExpenseDOM = qs("#add-expense");
const expensesDOM = qs("#expenses");
const sumOfExpensesDOM = qs("#sum-of-expenses");

// DOM BUDGET
const globalBudgetDOM = qs("#global-budget");

//MODEL
let incomes = [{ id: uuid.v4(), name: "test1", amount: 0, isEdited: !false }];
let expenses = [{ id: uuid.v4(), name: "test2", amount: 0, isEdited: !false }];

//UPDATE

const addNewIncome = (oldIncomes, newIncome) => {
  const newIncome = [...oldIncomes, newIncome];
  incomes = newIncome;
  renderApp();
};

const toggleIsEditedIncome = (oldIncomes, incomeId) => {
  return oldIncomes.map((income) => {
    return income.id === incomeId
      ? { ...income, isEdited: !income.isEdited }
      : income;
  });
};
const deleteIncome = (oldIncomes, deleteIdIncome) => {
  return oldIncomes.filter(({ id }) => id !== deleteIdIncome);
};

const setIncomeNameAndAmount = (oldIncomes, incomeId, newName, newAmount) => {
  return oldIncomes.map((income) => {
    return income.id === incomeId
      ? { ...income, name: newName, amount: newAmount }
      : income;
  });
};

// UPDATE EXPENSE
const addNewExpense = (oldExpenses, newExpense) => {
  return [...oldExpenses, newExpense];
};

const toggleIsEditedExpense = (oldExpenses, expenseId) => {
  return oldExpenses.map((expense) => {
    return expense.id === expenseId
      ? { ...expense, isEdited: !expense.isEdited }
      : expense;
  });
};

const deleteExpense = (oldExpenses, deleteIdExpense) => {
  return oldExpenses.filter(({ id }) => id !== deleteIdExpense);
};

const setExpenseNameAndAmount = (
  oldExpenses,
  expenseId,
  newName,
  newAmount
) => {
  return oldExpenses.map((expense) => {
    return expense.id === expenseId
      ? { ...expense, name: newName, amount: newAmount }
      : expense;
  });
};

//VIEW
const renderIncomes = () => {
  incomesDOM.innerHTML = "";
  incomes.forEach((income) => {
    const incomeDOM = document.createElement("li");

    if (income.isEdited) {
      const editFormDOM = document.createElement("form");
      const editFormNameInputDOM = document.createElement("input");
      editFormNameInputDOM.setAttribute("name", "name");
      editFormNameInputDOM.setAttribute("value", income.name);

      const editFormAmountInputDOM = document.createElement("input");
      editFormAmountInputDOM.setAttribute("name", "amount");
      editFormAmountInputDOM.setAttribute("value", income.amount);

      const confirmIncomeBtnDOM = document.createElement("button");
      confirmIncomeBtnDOM.textContent = "Zatwierdź";
      confirmIncomeBtnDOM.setAttribute("style", "width:70px");

      editFormDOM.append(editFormNameInputDOM);
      editFormDOM.append(editFormAmountInputDOM);
      editFormDOM.appendChild(confirmIncomeBtnDOM);
      incomeDOM.append(editFormDOM);

      editFormDOM.addEventListener("submit", (e) => {
        e.preventDefault();

        const { name } = e.currentTarget.elements;
        const newName = name.value;
        const { amount } = e.currentTarget.elements;
        const newAmount = Number(amount.value);

        incomes = setIncomeNameAndAmount(
          incomes,
          income.id,
          newName,
          newAmount
        );
        incomes = toggleIsEditedIncome(incomes, income.id);
        renderIncomes();
      });
    } else {
      incomeDOM.textContent = `${income.name}    ${income.amount}  zł`;

      const editIncomeBtnDOM = document.createElement("button");
      editIncomeBtnDOM.textContent = "Edytuj";
      editIncomeBtnDOM.setAttribute("style", "width:50px");
      editIncomeBtnDOM.addEventListener("click", () => {
        incomes = toggleIsEditedIncome(incomes, income.id);
        renderIncomes();
      });
      const deleteIncomeBtnDOM = document.createElement("button");
      deleteIncomeBtnDOM.textContent = "Usuń";
      deleteIncomeBtnDOM.setAttribute("style", "width:50px");
      deleteIncomeBtnDOM.addEventListener("click", (e) => {
        incomes = deleteIncome(incomes, income.id);
        renderIncomes();
      });
      incomeDOM.appendChild(editIncomeBtnDOM);
      incomeDOM.appendChild(deleteIncomeBtnDOM);
    }
    incomesDOM.appendChild(incomeDOM);

    const incomeSum = incomes.reduce((acc, income) => acc + income.amount, 0);
    sumOfIncomesDOM.innerHTML = `Suma przychodów: ${incomeSum} zł`;

    addIncomeDOM.reset();
  });
};

//View Expenses

const renderExpenses = () => {
  expensesDOM.innerHTML = "";
  expenses.forEach((expense) => {
    const expenseDOM = document.createElement("li");

    if (expense.isEdited) {
      const editFormDOM = document.createElement("form");
      const editFormNameInputDOM = document.createElement("input");
      editFormNameInputDOM.setAttribute("name", "name");
      editFormNameInputDOM.setAttribute("value", expense.name);

      const editFormAmountInputDOM = document.createElement("input");
      editFormAmountInputDOM.setAttribute("name", "amount");
      editFormAmountInputDOM.setAttribute("value", expense.amount);

      const confirmExpenseBtnDOM = document.createElement("button");
      confirmExpenseBtnDOM.textContent = "Zatwierdź";
      confirmExpenseBtnDOM.setAttribute("style", "width:70px");

      editFormDOM.append(editFormNameInputDOM);
      editFormDOM.append(editFormAmountInputDOM);
      editFormDOM.appendChild(confirmExpenseBtnDOM);
      expenseDOM.append(editFormDOM);

      editFormDOM.addEventListener("submit", (e) => {
        e.preventDefault();

        const { name } = e.currentTarget.elements;
        const newName = name.value;
        const { amount } = e.currentTarget.elements;
        const newAmount = Number(amount.value);

        expenses = setIncomeNameAndAmount(
          expenses,
          expense.id,
          newName,
          newAmount
        );
        expenses = toggleIsEditedExpense(expenses, expense.id);
        renderExpenses();
      });
    } else {
      expenseDOM.textContent = `${expense.name}    ${expense.amount}  `;

      const editExpenseBtnDOM = document.createElement("button");
      editExpenseBtnDOM.textContent = "Edytuj";
      editExpenseBtnDOM.setAttribute("style", "width:50px");
      editExpenseBtnDOM.addEventListener("click", () => {
        expenses = toggleIsEditedExpense(expenses, expense.id);
        renderExpenses();
      });
      const deleteExpenseBtnDOM = document.createElement("button");
      deleteExpenseBtnDOM.textContent = "Usuń";
      deleteExpenseBtnDOM.setAttribute("style", "width:50px");
      deleteExpenseBtnDOM.addEventListener("click", (e) => {
        expenses = deleteExpense(expenses, expense.id);
        renderExpenses();
      });
      expenseDOM.appendChild(editExpenseBtnDOM);
      expenseDOM.appendChild(deleteExpenseBtnDOM);
    }
    expensesDOM.appendChild(expenseDOM);

    const expenseSum = expenses.reduce(
      (acc, expense) => acc + expense.amount,
      0
    );
    sumOfExpensesDOM.innerHTML = `Suma wydatków: ${expenseSum} zł`;

    addExpenseDOM.reset();
  });
};

// // VIEW Komunkat;
// let balance = ;
// let msg;
// if (incomes > 0){
// msg = 'b';
// } else if (incomes=0) {
//   msg = 'a';
// } else (incomes<0) {
//   msg ='c';
// // };
// const balance ;
// const msg = () => {
//   if ( = 0) {
//     msg = "Bilans wynosi 0";
//   } else if ( < 0) {
//     msg = "Bilans jest ujemny";
//   } else if ( > 0) {
//     return "Możesz jeszcze wydać XXX zł";
//   }
// };
// globalBudgetDOM.innerHTML = `<h3> ${msg} </h3>`;

//EVENTS
addIncomeDOM.addEventListener("submit", (e) => {
  e.preventDefault();
  const { name } = e.currentTarget.elements;
  const { amount } = e.currentTarget.elements;

  const newIncome = {
    id: uuid.v4(),
    name: name.value,
    amount: Number(amount.value),
    isEdited: false,
  };

  incomes = addNewIncome(incomes, newIncome);
  renderIncomes();
});

//ncomes = deleteIncome(incomes, income.id);
renderIncomes();

// EVENTS EXPENSES
addExpenseDOM.addEventListener("submit", (e) => {
  e.preventDefault();
  const { name } = e.currentTarget.elements;
  const { amount } = e.currentTarget.elements;

  const newExpense = {
    id: uuid.v4(),
    name: name.value,
    amount: Number(amount.value),
    isEdited: false,
  };

  expenses = addNewExpense(expenses, newExpense);
  renderExpenses();
});

renderExpenses();
