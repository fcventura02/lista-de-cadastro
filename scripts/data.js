export function addPeople(
  name,
  lastname,
  tel,
  email,
  cep,
  street,
  neighborhood,
  city,
  state
) {
  // Pega a lista já cadastrada, se não houver vira um array vazio
  const lista_pessoas = JSON.parse(
    localStorage.getItem("lista-pessoas") || "[]"
  );
  const id = JSON.parse(localStorage.getItem("id") || 1);
  // Adiciona pessoa ao cadastro
  lista_pessoas.push({
    id,
    name,
    lastname,
    tel,
    email,
    cep,
    street,
    neighborhood,
    city,
    state,
  });

  // Salva a lista alterada
  localStorage.setItem("lista-pessoas", JSON.stringify(lista_pessoas));
  localStorage.setItem("id", JSON.stringify(id + 1));
  return lista_pessoas[lista_pessoas.length - 1];
}

export function getPeople() {
  const peoples = JSON.parse(localStorage.getItem("lista-pessoas") || "[]");
  return peoples;
}

export function removePeople(idPeople) {
  const peoples = JSON.parse(localStorage.getItem("lista-pessoas") || "[]");
  const index = peoples.findIndex(({ id }) => id === idPeople);
  peoples.splice(index, 1);
  localStorage.setItem("lista-pessoas", JSON.stringify(peoples));
}

export function getPeopleById(idPeople) {
  const peoples = JSON.parse(localStorage.getItem("lista-pessoas") || "[]");
  const index = peoples.findIndex(({ id }) => id === parseInt(idPeople));
  return peoples[index];
}

export function updatePeople(
  idPeople,
  name,
  lastname,
  tel,
  email,
  cep,
  city,
  street,
  neighborhood,
  state
) {
  const peoples = JSON.parse(localStorage.getItem("lista-pessoas") || "[]");
  const index = peoples.findIndex(({ id }) => id === parseInt(idPeople));
  (peoples[index].name = name),
    (peoples[index].lastname = lastname),
    (peoples[index].tel = tel),
    (peoples[index].email = email),
    (peoples[index].cep = cep),
    (peoples[index].city = city),
    (peoples[index].street = street),
    (peoples[index].neighborhood = neighborhood),
    (peoples[index].state = state);
  localStorage.setItem("lista-pessoas", JSON.stringify(peoples));
}
