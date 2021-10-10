export default {
  tel(val) {
    return val
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{1})/, "$1")
      .replace(/(\d{1})(\d{4})(\d{4})/, "$1 $2-$3");
  },
  cep(val) {
    return val.replace(/\D/g, "").replace(/(\d{5})(\d{2})/, "$1-$2");
  },
  email(val) {
    const reg = /\S+@\S+\.\S+/;
    if (reg.test(val) && val.value !== "") {
      document.getElementById("email").parentNode.classList.add("input-valid");
      document
        .getElementById("email")
        .parentNode.classList.remove("input-invalid");
    } else {
      document
        .getElementById("email")
        .parentNode.classList.add("input-invalid");
      document
        .getElementById("email")
        .parentNode.classList.remove("input-valid");
    }
    return val;
  },
};
