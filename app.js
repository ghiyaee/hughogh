const code_person = document.getElementById("code-person");
const names = document.getElementById("names");
const days = document.getElementById("days");
const mozd = document.getElementById("mozd");
const mazya = document.getElementById("mazya");
const list_person = document.getElementById("list-person");
const message_box = document.getElementById("message");

class Person {
  constructor(code_person, names, days, mozd, mazya) {
    this.code_person = code_person;
    this.names = names;
    this.days = days;
    this.mozd = mozd;
    this.mazya = mazya;
  }
}

class Mymethod {
  add_row(newperson) {
    const row = document.createElement("tr");
    row.classList.add("row-list");
    row.innerHTML = `<td>${newperson.code_person.value}</td>
    <td >${newperson.names.value}</td>
    <td class="d">${newperson.days.value}</td>
    <td class="mo">${newperson.mozd.value}</td>
    <td  class="ma">${newperson.mazya.value}</td>`;
    const day = newperson.days.value;
    const moz = newperson.mozd.value;
    const maz = newperson.mazya.value;
    const sum = day * moz + Number(maz);
    row.innerHTML += `<td>${sum}</td>`;
    const bei = (sum * 7) / 100;
    row.innerHTML += `<td>${bei}</td>`;
    const mali = (sum * 18) / 100;
    row.innerHTML += `<td>${mali}</td>`;
    const sum_ko = bei + mali;
    row.innerHTML += `<td>${sum_ko}</td>`;
    const total = sum - (bei + mali);
    row.innerHTML += `<td>${total}</td>`;
    row.innerHTML += `<td ><a href="#" class="delete" >x</a></td>`;
    list_person.appendChild(row);
  }

  emptyFeilds() {
    code_person.value = "";
    names.value = "";
    days.value = "";
    mozd.value = "";
    mazya.value = "";
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
  const newperson = new Person(code_person, names, days, mozd, mazya);
  const mymethod = new Mymethod();
  if (
    !code_person.value ||
    !days.value ||
    !names.value ||
    !mozd.value ||
    !mazya.value
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
