const code_person = document.getElementById("code-person");
const names = document.getElementById("names");
const days = document.getElementById("days");
const wage = document.getElementById("wage");
const benefit = document.getElementById("benefit");
const month = document.getElementById("month");
const list_person = document.getElementById("list-person");
const message_box = document.getElementById("message");

// month.addEventListener("click", (e) => {
//   console.log(e.target);
// });

class Person {
  constructor(code_person, names, days, wage, benefit, month) {
    this.code_person = code_person;
    this.names = names;
    this.days = days;
    this.wage = wage;
    this.benefit = benefit;
    this.month = month;
  }
}

class Mymethod {
  add_row(newperson) {
    const row = document.createElement("tr");
    row.classList.add("row-list");
    row.innerHTML = `<td>${newperson.code_person.value}</td>
    <td >${newperson.names.value}</td>
    <td >${newperson.month.value}</td>
    <td class="d">${newperson.days.value}</td>
    <td class="mo">${newperson.wage.value}</td>
    <td  class="ma">${newperson.benefit.value}</td>`;
    const day = newperson.days.value;
    const wage = newperson.wage.value;
    const benefit = newperson.benefit.value;
    const sum = day * wage + Number(benefit);
    row.innerHTML += `<td>${sum}</td>`;
    const insurance = (sum * 7) / 100;
    row.innerHTML += `<td>${insurance}</td>`;
    const tax = (sum * 18) / 100;
    row.innerHTML += `<td>${tax}</td>`;
    const sum_insur_tax = insurance + tax;
    row.innerHTML += `<td>${sum_insur_tax}</td>`;
    const total = sum - (insurance + tax);
    row.innerHTML += `<td>${total}</td>`;
    row.innerHTML += `<td ><a href="#" class="delete" >x</a></td>`;
    list_person.appendChild(row);
  }

  emptyFeilds() {
    code_person.value = "";
    names.value = "";
    days.value = "";
    wage.value = "";
    benefit.value = "";
  }

  show_message(message, className) {
    const div = document.createElement("div");
    div.classList.add("alert", className);
    const text = document.createTextNode(message);
    div.appendChild(text);
    message_box.appendChild(div);
    setTimeout(() => {
      document.querySelector(".alert").remove();
    }, 2500);
  }

  delete_row(e) {
    console.log(e.target);
    if (e.className === "delete") {
      e.parentElement.parentElement.remove();
    }
  }
}

document.querySelector("#forms").addEventListener("submit", (e) => {
  const newperson = new Person(code_person, names, days, wage, benefit, month);
  const mymethod = new Mymethod();
  // console.log(newperson.month);
  if (
    !code_person.value ||
    !days.value ||
    !names.value ||
    !wage.value ||
    !benefit.value ||
    !month
  ) {
    mymethod.show_message("مقادیر را باید وارد کنید", "error");
  } else {
    mymethod.add_row(newperson);
    mymethod.show_message("اطلاعات با موفقیت ثبت شد", "succes");
  }
  mymethod.emptyFeilds();
  e.preventDefault();
});

list_person.addEventListener("click", (e) => {
  const mymethod = new Mymethod();
  mymethod.delete_row(e.target);
  mymethod.show_message("سطر انتخاب شده پاک شد", "succes");
});
