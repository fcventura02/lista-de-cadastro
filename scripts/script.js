import { getCep } from "./api.js";
import mask from "./mask.js";
import { alert } from "./alert.js";
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
const countRegister = document.getElementById("count-register");
const form = document.getElementById("form");

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
  let fields = form.querySelectorAll("input");
  for (let interator of fields) {
    interator.value = "";
    interator.parentNode.classList.remove("input-valid");
  }
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

const renderLines = (peoples = getPeople()) => {
  countRegister.innerText = peoples.length;
  document
    .getElementById("table-list")
    .getElementsByTagName("tbody")[0].innerHTML = "";
  for (const iterator of peoples) {
    addLineTable({ ...iterator });
  }
};

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
    renderLines();
  });
  btnRemove.setAttribute("data-title", "Remover registro");
  btnUpdate.addEventListener("click", () => {
    const id = newRow.getAttribute("id");
    const people = getPeopleById(id);
    addValueEntryForUpdate(people);
    submitUpdate.setAttribute("key", `update-${id}`);
    document.getElementById("containerCadastro").classList.toggle("not-active");
    document.getElementById("containerCadastro").classList.toggle("active");
    submitUpdate.style.display = "block";
    submit.style.display = "none";
    document.getElementById("containerCadastro").scrollIntoView();
  });
  btnUpdate.setAttribute("data-title", "Atualizar registro");
  btnRemove.innerHTML = `<img src="./img/delete.svg" alt="" width="30px"/>`;
  btnUpdate.innerHTML = `<img src="./img/refresh.svg" alt="" width="30px"/>`;
  const options = newRow.insertCell();
  options.append(btnRemove, btnUpdate);
};

cepInput.addEventListener("focusout", (e) =>
  insertResultGetCepInput(e.target.value)
);
cepInput.addEventListener("keypress", ({ key }) => {
  if (key === "Enter") {
    cepInput.blur();
  }
});

const validForm = (element) => {
  let isvalid = false;
  let fields = form.querySelectorAll("input");
  for (let input of fields) {
    if (!input.validity.valid) {
      input.parentNode.classList.add("input-invalid");
      input.parentNode.classList.remove("input-valid");
      isvalid = false;
      break;
    } else {
      input.parentNode.classList.add("input-valid");
      input.parentNode.classList.remove("input-invalid");
      isvalid = true;
    }
  }
  isvalid
    ? element.removeAttribute("disabled")
    : element.setAttribute("disabled", "disabled");
};

submit.addEventListener("pointerover", () => {
  validForm(submit);
});
submitUpdate.addEventListener("pointerover", () => {
  validForm(submitUpdate);
});

submit.addEventListener("click", (e) => {
  e.preventDefault();
  try {
    const { people, length } = addPeople(
      name.value,
      lastname.value,
      tel.value,
      email.value,
      cepInput.value,
      street.value,
      neighborhood.value,
      city.value,
      state.value
    );
    countRegister.innerText = length;
    addLineTable(people);
    clearInputs();
    document.getElementById("containerCadastro").classList.toggle("not-active");
    document.getElementById("containerCadastro").classList.toggle("active");
    document
      .getElementsByTagName("body")[0]
      .appendChild(alert("Adicionado com sucesso.", "succes"));
  } catch (error) {
    document.getElementsByTagName("body")[0].appendChild(alert(error.message));
  }
});

submitUpdate.addEventListener("click", (e) => {
  e.preventDefault();
  try {
    const id = submitUpdate.getAttribute("key").replace("update-", "");
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
    );
    document.getElementById("containerCadastro").classList.toggle("not-active");
    document.getElementById("containerCadastro").classList.toggle("active");
    submitUpdate.style.display = "none";
    submit.style.display = "block";
    renderLines();
    document
      .getElementsByTagName("body")[0]
      .appendChild(alert("Atualizado com sucesso.", "succes"));
  } catch (error) {
    document.getElementsByTagName("body")[0].appendChild(alert(error.message));
  }
});

renderLines();

const validInput = (e) => {
  if (!e.target.validity.valid) return console.log("invalid");
  return console.log("valid");
};

let fields = form.querySelectorAll("input");
for (let interator of fields) {
  interator.addEventListener("input", () => {
    if (!interator.validity.valid) {
      interator.parentNode.classList.add("input-invalid");
      interator.parentNode.classList.remove("input-valid");
    } else {
      if (interator.id === "email") {
        interator.value = mask[interator.id]
          ? mask[interator.id](interator.value)
          : interator.value;
      } else {
        interator.value = mask[interator.id]
          ? mask[interator.id](interator.value)
          : interator.value;
        interator.parentNode.classList.add("input-valid");
        interator.parentNode.classList.remove("input-invalid");
      }
    }
  });
}
