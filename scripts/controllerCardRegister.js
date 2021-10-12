//Open Card register
document.getElementById("newRegister").addEventListener("click", () => {
	document.getElementsByTagName("body")[0].style.overflow = "hidden"
	document.getElementById("containerCadastro").classList.toggle("not-active");
	document.getElementById("containerCadastro").classList.toggle("active");
	document.getElementById("submit-update").style.display = "none";
  document.getElementById("submit").style.display = "block";
});

//Close card register
document.getElementById("closeRegister").addEventListener("click", () => {
	document.getElementsByTagName("body")[0].style.overflow = "auto"
	document.getElementById("containerCadastro").classList.toggle("not-active");
	document.getElementById("containerCadastro").classList.toggle("active");

});