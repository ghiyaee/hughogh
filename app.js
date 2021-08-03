const code_person = document.getElementById("code-person");
const names = document.getElementById("names");
const days = document.getElementById("days");
const wage = document.getElementById("wage");
const benefit = document.getElementById("benefit");
const month = document.getElementById("month");
const list_person = document.getElementById("list-person");
const message_box = document.getElementById("message");
const color_night = document.querySelector(".btn-night");
const color_sun = document.querySelector(".btn-sun");
const bckgrund = document.querySelector("body");
const title = document.querySelector(".title-up");
const row = document.getElementById("btn-save");
const row_sum = document.getElementsByClassName("total");

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
    row.innerHTML = `<td>${newperson.code_person}</td>
    <td >${newperson.names}</td>
    <td >${newperson.month}</td>
    <td class="d">${newperson.days}</td>
    <td class="mo">${newperson.wage}</td>
    <td  class="ma">${newperson.benefit}</td>`;
    const day = newperson.days;
    const wage = newperson.wage;
    const benefit = newperson.benefit;
    const sum_d_w = day * wage + Number(benefit);
    row.innerHTML += `<td>${sum_d_w}</td>`;
    const insurance = (sum_d_w * 7) / 100;
    row.innerHTML += `<td>${insurance}</td>`;
    const tax = (sum_d_w * 18) / 100;
    row.innerHTML += `<td>${tax}</td>`;
    const sum_insur_tax = insurance + tax;
    row.innerHTML += `<td>${sum_insur_tax}</td>`;
    const total = sum_d_w - (insurance + tax);
    row.innerHTML += `<td>${total}</td>`;
    row.innerHTML += `<td ><a href="#" class="delete" >x</a></td>`;
    list_person.appendChild(row);

    let s = document.getElementById("sum");
    const b = document.getElementById("bi");
    const m = document.getElementById("ma");
    const k = document.getElementById("ku");
    const t = document.getElementById("total");
    s.innerText = +s.innerText + sum_d_w;
    b.innerHTML = Number(b.innerText) + insurance;
    m.innerHTML = Number(m.innerText) + tax;
    k.innerHTML = Number(k.innerText) + sum_insur_tax;
    t.innerHTML = Number(t.innerText) + total;
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
    }, 3000);
  }

  delete_row(e) {
    // console.log(e.target);
    if (e.className === "delete") {
      e.parentElement.parentElement.remove();
    }
  }
  chang_night() {
    bckgrund.style.backgroundColor = `rgb(20,18,17)`;
    document.querySelector("h1").style.color = "white";
    title.style.backgroundColor = ` rgb(20,18,17)`;
    document.querySelectorAll("label").forEach((list) => {
      list.style.color = `rgb(180,180,180)`;
    });
    document.querySelector("table").style.backgroundColor = `rgb(36,34,40)`;
    document.querySelector("table").style.color = `rgb(142,113,144)`;
    list_person.style.backgroundColor = `rgb(150,180,180)`;
    row.style.color = `rgb(180,180,180)`;
    document.querySelectorAll("input").forEach((list) => {
      list.style.backgroundColor = `rgb(180,180,180)`;
    });
    document.getElementById("btn-save").style.color = `rgb(180,62,41)`;
    document.querySelector("select").style.backgroundColor = `rgb(180,180,180)`;
    // row_sum.style.backgroundColor = `rgb(150,180,180)`;
    document.querySelectorAll("span").forEach((list) => {
      list.style.color = `rgb(142,113,255)`;
    });
  }
  chang_sun() {
    bckgrund.style.backgroundColor = `rgb(66,177,90)`;
    document.querySelector("h1").style.color = "black";
    title.style.backgroundColor = "aquamarine";
    document.querySelectorAll("label").forEach((list) => {
      list.style.color = `rgb(0,0,0)`;
    });
    document.querySelector("table").style.backgroundColor = "lightseagreen";
    document.querySelector("table").style.color = `rgb(20,18,17)`;
    document.querySelector("tbody").style.color = `rgb(180,180,180)`;
    row.style.color = `rgb(255,255,250)`;
    document.querySelectorAll("input").forEach((list) => {
      list.style.backgroundColor = "white";
    });
    document.getElementById(
      "btn-save"
    ).style.backgroundColor = `rgb(180,62,41)`;
    document.querySelector("select").style.backgroundColor = `rgb(255,255,255)`;
    document.querySelectorAll("span").forEach((list) => {
      list.style.color = `rgb(0,0,0)`;
    });
  }
}
// /* start local storge
class Store {
  static get_persons() {
    let persons;
    if (!localStorage.getItem("persons")) {
      persons = [];
    } else {
      persons = JSON.parse(localStorage.getItem("persons"));
    }
    return persons;
  }
  static show_persons() {
    const persons = Store.get_persons();
    persons.forEach((newperson) => {
      const mymethod = new Mymethod();
      mymethod.add_row(newperson);
    });
  }
  static add_persons(newperson) {
    const persons = Store.get_persons();
    persons.push(newperson);
    localStorage.setItem("persons", JSON.stringify(persons));
  }
  static delete_persons(e) {
    const person = Store.get_persons();
    if (e.className === "delete") {
      person.splice(e, 1);
    }

    localStorage.setItem("persons", JSON.stringify(person));
  }
}
// end local storge

document.addEventListener("DOMContentLoaded", Store.show_persons);
document.querySelector("#forms").addEventListener("submit", (e) => {
  const code_person = document.getElementById("code-person").value;
  const names = document.getElementById("names").value;
  const days = document.getElementById("days").value;
  const wage = document.getElementById("wage").value;
  const benefit = document.getElementById("benefit").value;
  const month = document.getElementById("month").value;
  const newperson = new Person(code_person, names, days, wage, benefit, month);
  const mymethod = new Mymethod();

  if (!code_person || !days || !names || !wage || !benefit || !month) {
    mymethod.show_message("مقادیر را باید وارد کنید", "error");
  } else {
    mymethod.add_row(newperson);
    Store.add_persons(newperson);
    mymethod.show_message("اطلاعات با موفقیت ثبت شد", "succes");
  }
  mymethod.emptyFeilds();
  e.preventDefault();
});

list_person.addEventListener("click", (e) => {
  const mymethod = new Mymethod();
  mymethod.delete_row(e.target);
  Store.delete_persons(e.target);
  mymethod.show_message("سطر انتخاب شده پاک شد", "succes");
  location.reload();
});

color_night.addEventListener("click", () => {
  const mymethod = new Mymethod();
  mymethod.chang_night();
});

color_sun.addEventListener("click", () => {
  const mymethod = new Mymethod();
  mymethod.chang_sun();
});
