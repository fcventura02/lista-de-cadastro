//Open Card register
document.getElementById("newRegister").addEventListener("click", () => {
	document.getElementById("containerCadastro").classList.toggle("not-active");
	document.getElementById("containerCadastro").classList.toggle("active");
});

//Close card register
document.getElementById("closeRegister").addEventListener("click", () => {
  document.getElementById("containerCadastro").classList.toggle("not-active");
	document.getElementById("containerCadastro").classList.toggle("active");

});