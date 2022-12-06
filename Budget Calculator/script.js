let totalAmount = document.getElementById("total-amount");
let userAmount = document.getElementById("user-amount");
let userfood = document.getElementById("user-food");
let userloan= document.getElementById("user-loan");
let userins= document.getElementById("user-ins");
let usercloth= document.getElementById("user-cloth");
let usertrans= document.getElementById("user-tran");
let usersav= document.getElementById("user-sav");
let userent= document.getElementById("user-ent");
const checkAmountButton = document.getElementById("check-amount");
const totalAmountButton = document.getElementById("total-amount-button");
const productTitle = document.getElementById("product-title");
const errorMessage = document.getElementById("budget-error");
const productTitleError = document.getElementById("product-title-error");
const productCostError = document.getElementById("product-cost-error");
const amount = document.getElementById("amount");
const expenditureValue = document.getElementById("expenditure-value");
const balanceValue = document.getElementById("balance-amount");
const annualbalanceValue = document.getElementById("annualbalance-amount");
const list = document.getElementById("list");
let tempAmount = 0;


totalAmountButton.addEventListener("click", () => {
  tempAmount = totalAmount.value;

  if (tempAmount === "" || tempAmount < 0) {
    errorMessage.classList.remove("hide");
  } else {
    errorMessage.classList.add("hide");
  
    amount.innerHTML = tempAmount;
   
    balanceValue.innerText = tempAmount - expenditureValue.innerText;
 
    totalAmount.value = "";

    annualbalanceValue.innerText  = tempAmount*12 - expenditureValue.innerText;
  }
});


const disableButtons = (bool) => {
  let editButtons = document.getElementsByClassName("edit");
  Array.from(editButtons).forEach((element) => {
    element.disabled = bool;
  });
};


const modifyElement = (element, edit = false) => {
  let parentDiv = element.parentElement;
  let currentBalance = balanceValue.innerText;
  let currentExpense = expenditureValue.innerText;
  let parentAmount = parentDiv.querySelector(".amount").innerText;
  let parentfood = parentDiv.querySelector(".amount").innerText;
  let parentloan = parentDiv.querySelector(".amount").innerText;
  let parentins = parentDiv.querySelector(".amount").innerText;
  let parentcloth = parentDiv.querySelector(".amount").innerText;
  let parenttrans = parentDiv.querySelector(".amount").innerText;
  let parentsav = parentDiv.querySelector(".amount").innerText;
  let parentent = parentDiv.querySelector(".amount").innerText;
  if (edit) {

    userAmount.value = parentAmount;
    userfood.value = parentfood;
    userloan.value = parentloan;
    userins.value=parentins;
    usercloth.value=parentcloth;
    usertrans.value = parenttrans;
    usersav.value=parentsav;
    userent.value=parentent;
    disableButtons(true);
  }
  balanceValue.innerText = parseInt(currentBalance) + parseInt(parentAmount)+ parseInt(parentfood)+ parseInt(parentloan)+ parseInt(parentins)+parseInt(parentcloth)+ parseInt(parenttrans)+ parseInt(parentsav)+parseInt(parentent);
  expenditureValue.innerText =
    parseInt(currentExpense) - parseInt(parentAmount)- parseInt(parentfood)-parseInt(parentloan)- parseInt(parentins) -parseInt(parentcloth)-parseInt(parenttrans)- parseInt(parentsav)-parseInt(parentent);;
  parentDiv.remove();
};


const listCreator = (expenseName, expenseValue) => {
  let sublistContent = document.createElement("div");
  sublistContent.classList.add("sublist-content", "flex-space");
  list.appendChild(sublistContent);
  sublistContent.innerHTML = `<p class="product">${expenseName}</p><p class="amount">${expenseValue}</p>`;
  let editButton = document.createElement("button");
  editButton.classList.add("fa-solid", "fa-pen-to-square", "edit");
  editButton.style.fontSize = "1.2em";
  editButton.addEventListener("click", () => {
    modifyElement(editButton, true);
  });
  let deleteButton = document.createElement("button");
  deleteButton.classList.add("fa-solid", "fa-trash-can", "delete");
  deleteButton.style.fontSize = "1.2em";
  deleteButton.addEventListener("click", () => {
    modifyElement(deleteButton);
  });
  sublistContent.appendChild(editButton);
  sublistContent.appendChild(deleteButton);
  document.getElementById("list").appendChild(sublistContent);
};


checkAmountButton.addEventListener("click", () => {
 
  if (!userAmount.value  ) {
  
    return false;
  }

  disableButtons(false);

  let expenditure = parseInt(userAmount.value)+ parseInt(userfood.value)+ parseInt(userloan.value)+parseInt(userins.value)+parseInt(usercloth.value)+parseInt(usertrans.value)+ parseInt(usersav.value)+parseInt(userent.value);;

  let sum = parseInt(expenditureValue.innerText) + expenditure;
  expenditureValue.innerText = sum;
 
  const totalBalance = tempAmount - sum;
  balanceValue.innerText = totalBalance;

  listCreator(userAmount.value);
 
 
  userAmount.value = "";
});
