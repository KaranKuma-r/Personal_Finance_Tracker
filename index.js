// <-------Toogel Theme ------->

const toggle = document.getElementById('darkToggle');

toggle.addEventListener('change', () => {
  if (toggle.checked) {
    document.body.style.backgroundColor = '#121212';
    document.body.style.color = 'white';
  } else {
    document.body.style.backgroundColor = 'white';
    document.body.style.color = 'black';
  }
});



// <------- From  ----->
let editIndex = null;
const from = document.getElementById('transcation');
const displayItems = document.getElementById('transactionItems')
const total = document.getElementById('totalBalance')
const income = document.getElementById('incomeAmount')
const expense = document.getElementById('expenseAmount')
const totalBalance = document.getElementById("totalBalance");
const incomeAmount = document.getElementById("incomeAmount");
const expenseAmount = document.getElementById("expenseAmount");

let transactionList = JSON.parse(localStorage.getItem('transaction')) || [];

function saveToLocalStorage() {
  localStorage.setItem('transaction', JSON.stringify(transactionList))
}

from.addEventListener('submit', (e) => {
  e.preventDefault();

  const title = document.getElementById('title').value;
  const amount = document.getElementById('amount').value;
  const type = document.getElementById('type').value;
  const date = document.getElementById('date').value;

  const newTransaction = {
    title,
    amount,
    type,
    date
  };

  if (editIndex !== null) {
    transactionList[editIndex] = newTransaction;
    editIndex = null;
  } else {
    transactionList.push(newTransaction);
  }
  saveToLocalStorage();
  renderSummary();
  renderTransactions();
  from.reset()
})

function renderSummary() {

  let income = 0;
  let expense = 0;

  transactionList.forEach(element => {
    const amount = parseFloat(element.amount);

    if (element.type === 'income') {
      income += amount
    } else {
      expense += amount;
    }
  });

  totalBalance.textContent = `₹${income - expense}`
  incomeAmount.textContent = `₹${income}`;
  expenseAmount.textContent = `₹${expense}`;
}

function renderTransactions() {
  displayItems.innerHTML = "";

  if(transactionList.length ===0){
    displayItems.innerHTML = `<p style="text-align:center; color: gray;">No transactions found.</p>`;
    return;
  }
  transactionList.forEach((ele, index) => {
    const li = document.createElement('li')
    const bordercolour = ele.type ==='income' ? "#5db761": "#c52603f2"

    li.className = "transaction-items"
    li.style.borderLeft=`5px solid ${bordercolour}`
    li.innerHTML = `
        <div class="content">
          <span>${ele.title}</span>
          <span>₹ ${ele.amount}</span>
          <span>${ele.type}</span>
          <span>${ele.date}</span>
          <button class="edit-btn" onclick="editTransaction(${index})">Edit</button>
          <button class="delete-btn" onclick="deleteTransaction(${index})">Delete</button>
        </div> 
    `
    displayItems.appendChild(li);
  })
}

// <--------------Edit --------->

function editTransaction(index) {
  const edit = transactionList[index];


  document.getElementById('title').value = edit.title;
  document.getElementById('amount').value = edit.amount;
  document.getElementById('type').value = edit.type;
  document.getElementById('date').value = edit.date;

  editIndex = index
}

// <--------- Delete ------->
function deleteTransaction(index) {
  transactionList.splice(index, 1)
  saveToLocalStorage();
  renderSummary();
  renderTransactions();
}



renderSummary();
renderTransactions();