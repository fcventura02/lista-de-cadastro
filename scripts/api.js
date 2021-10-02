export const getCep = async (cep) => {
  return await fetch(`https://viacep.com.br/ws/${cep}/json/`).then(
    (res) => res.json()
  );
};