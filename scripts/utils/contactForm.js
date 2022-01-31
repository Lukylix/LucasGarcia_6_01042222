const contactButton = document.querySelector(".contact_button");
contactButton.addEventListener("click", displayModal);

const contactModal = document.getElementById("contact_modal");
contactModal.addEventListener("click", closeModal);

const closeContact = document.getElementById("close_contact");
closeContact.addEventListener("click", closeModal);
closeContact.addEventListener("keydown", (e) => {
	if (e.key === "Enter") closeModal();
});

const contactSend = document.getElementById("contact_send");
contactSend.addEventListener("click", sendMessage);

function displayModal() {
	const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
	setTimeout(() => {
		closeContact.focus();
	}, 0);
}

function closeModal() {
	const modal = document.getElementById("contact_modal");
	modal.style.display = "none";
	setTimeout(() => {
		contactButton.focus();
	}, 0);
}

function sendMessage(event) {
	event.preventDefault();
	const inputs = document.querySelectorAll("#contact_modal input, #contact_modal textarea");
	let formData = {};
	for (const input of inputs) {
		formData[input.name] = input.value;
		input.value = "";
	}
	console.log(formData);
	closeModal();
}
