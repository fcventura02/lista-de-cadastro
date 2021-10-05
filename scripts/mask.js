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
      email.classList.add("email-valid");
      email.classList.remove("email-invalid");
    } else {
      email.classList.add("email-invalid");
      email.classList.remove("email-valid");
    }
  },
};