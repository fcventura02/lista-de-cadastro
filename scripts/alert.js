const message = document.createElement("p");
const content = document.createElement("div");
const button = document.createElement("button");

export function alert(text, type="error"){
	message.innerText = text;
	content.appendChild(message);
	content.setAttribute("id", "alert");
	content.classList.remove(...content.classList);
	content.classList.add(type);
	button.addEventListener("click", ()=>{
		content.remove()
	})
	content.appendChild(button);
	window.setTimeout(() => content.remove(), 8000);
	return content;
}