const book_Name = document.querySelector("#bName");
const issued_To = document.querySelector("#issTo");
const iss_Btn = document.querySelector("issBtn");
let myTable = document.querySelector(".table");
const form = document.querySelector(".formInpt");

let id1 = 0;
let issueArray = [];
let temp = [];

form.addEventListener("submit", submitForm);
function submitForm(event) {
  event.preventDefault();
  const userObj = {
    id: 0,
    book_name: "",
    issued_to: "",
    issued_time: "",
    status: "",
  };

  userObj.id = id1 + 1;
  userObj.book_name = book_Name.value;
  userObj.issued_to = issued_To.value;
  userObj.issued_time = `${getdate()} at ${gettime()}`;
  userObj.status = "Not Returned";

  issueArray[id1] = userObj;
  temp[0] = userObj;
  id1++;
  printToTable();
}

function printToTable() {
  temp.forEach((emp) => {
    let row = document.createElement("tr");
    Object.values(emp).forEach((text) => {
      let cell = document.createElement("td");
      let textNode = document.createTextNode(text);
      cell.appendChild(textNode);
      row.appendChild(cell);
      if (text == "Not Returned") {
        cell.style.color = "#FF2828";
        cell.innerHTML =
          '<div class="lastCell"><div class="text">Not Returned</div><div class="icon"><button type="button" onclick="statusEdit()" id="checked"><span class="material-symbols-outlined"> edit </span></button></div></div>';
      }
    });
    myTable.appendChild(row);
  });
}

function statusEdit() {
  const c = prompt(
    "Enter the ID Number of the book of which you want to change status Note: Please refer first column!"
  );
  issueArray[c - 1].status = "Returned";

  let hor = 0;
  for (let row of myTable.rows) {
    let ver = 0;
    for (let cell of row.cells) {
      let val = cell.innerText;
      if (hor == c && ver == 4) {
        cell.innerHTML =
          '<div class="lastCell"><div class="text" style="color:#9FFF24">Returned</div><div class="icon"><button type="button" onclick="statusEdit()" id="checked"><span class="material-symbols-outlined"> edit </span></button></div></div>';
      }
      ver++;
    }
    hor++;
  }
}

function getdate() {
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  const formattedToday = dd + "/" + mm + "/" + yyyy;
  return formattedToday;
}

function gettime() {
  const time = new Date();
  const hr = time.getHours();
  const min =
    time.getMinutes() < 10 ? `0${time.getMinutes()}` : `${time.getMinutes()}`;
  const amorpm = hr > 12 ? "PM" : "AM";
  const format12 = hr > 12 ? hr - 12 : hr;
  const addZer = format12 < 10 ? `0${format12}` : format12;
  const timeStr = `${addZer}:${min} ${amorpm}`;
  return timeStr;
}
