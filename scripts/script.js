import { getCep } from "./api.js";
import {
  addPeople,
  removePeople,
  getPeople,
  updatePeople,
  getPeopleById,
} from "./data.js";
const name = document.getElementById("name");
const lastname = document.getElementById("lastname");
const tel = document.getElementById("tel");
const email = document.getElementById("email");
const cepInput = document.getElementById("cep");
const city = document.getElementById("city");
const street = document.getElementById("street");
const neighborhood = document.getElementById("neighborhood");
const state = document.getElementById("state");
const submit = document.getElementById("submit");
const submitUpdate = document.getElementById("submit-update");


const insertResultGetCepInput = async (value) => {
  try {
    const { bairro, localidade, logradouro, uf } = await getCep(value);
    city.value = localidade;
    street.value = logradouro;
    neighborhood.value = bairro;
    state.value = uf;
  } catch (error) {
    console.log(error);
  }
};

const clearInputs = () => {
  name.value = "";
  lastname.value = "";
  tel.value = "";
  email.value = "";
  cepInput.value = "";
  city.value = "";
  street.value = "";
  neighborhood.value = "";
  state.value = "";
};

const addValueEntryForUpdate = (arr) => {
  name.value = arr.name;
  lastname.value = arr.lastname;
  tel.value = arr.tel;
  email.value = arr.email;
  cepInput.value = arr.cep;
  city.value = arr.city;
  street.value = arr.street;
  neighborhood.value = arr.neighborhood;
  state.value = arr.state;
};

cepInput.addEventListener("focusout", (e) =>
  insertResultGetCepInput(e.target.value)
);
cepInput.addEventListener("keypress", ({ key }) => {
  if (key === "Enter") {
    cepInput.blur();
  }
});

const addLineTable = (props) => {
  //Seleciona o body  da tabela
  const tbody = document
    .getElementById("table-list")
    .getElementsByTagName("tbody")[0];
  //Nova linha
  const newRow = tbody.insertRow();
  newRow.setAttribute("id", props.id);
  //Insere ordenado
  newRow.insertCell().innerText = props.name;
  newRow.insertCell().innerText = props.lastname;
  newRow.insertCell().innerText = props.tel;
  newRow.insertCell().innerText = props.email;
  newRow.insertCell().innerText = props.cep;
  newRow.insertCell().innerText = props.street;
  newRow.insertCell().innerText = props.neighborhood;
  newRow.insertCell().innerText = props.city;
  newRow.insertCell().innerText = props.state;

  const btnRemove = document.createElement("button");
  const btnUpdate = document.createElement("button");
  btnRemove.addEventListener("click", () => {
    removePeople(newRow.getAttribute("id"));
  });
  btnRemove.setAttribute("data-title", "Remover registro")
  btnUpdate.addEventListener("click", () => {
    const id = newRow.getAttribute("id");
    const people = getPeopleById(id);
    addValueEntryForUpdate(people);
    submitUpdate.setAttribute("key", `update-${id}`);
  });
  btnUpdate.setAttribute("data-title", "Atualizar registro")
  btnRemove.innerHTML = `<img src="./img/delete.svg" alt="" width="30px"/>`;
  btnUpdate.innerHTML = `<img src="./img/refresh.svg" alt="" width="30px"/>`;
  const options = newRow.insertCell();
  options.append(btnRemove, btnUpdate);
};

submit.addEventListener("click", (e) => {
  e.preventDefault();
  addLineTable(
    addPeople(
      name.value,
      lastname.value,
      tel.value,
      email.value,
      cepInput.value,
      street.value,
      neighborhood.value,
      city.value,
      state.value
    )
  );
  clearInputs();
});

submitUpdate.addEventListener("click", (e)=>{
  e.preventDefault();
  const id = submitUpdate.getAttribute("key").replace("update-", "")
  updatePeople(
    id,
    name.value,
    lastname.value,
    tel.value,
    email.value,
    cepInput.value,
    street.value,
    neighborhood.value,
    city.value,
    state.value
  )
})

const renderLines = () => {
  const peoples = getPeople();
  const worker = new Worker("data.js");
  worker.onmessage = (e) => {
    console.log(e);
  };
  for (const iterator of peoples) {
    addLineTable({ ...iterator });
  }
};

renderLines();
