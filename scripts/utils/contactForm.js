const contactButton = document.querySelector(".contact_button");
contactButton.addEventListener("click", displayModal);

const contactModal = document.getElementById("contact_modal");
contactModal.addEventListener("click", closeModal);

const closeContact = document.getElementById("close_contact");
closeContact.addEventListener("click", closeModal);
// Accessibility : close on enter key pressed
closeContact.addEventListener("keydown", (e) => {
	if (e.key === "Enter") closeModal();
});

const contactSend = document.getElementById("contact_send");
contactSend.addEventListener("click", sendMessage);

function displayModal() {
	const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
	// Add to the callback queue, to be executed after the current call stack is cleared (After the modal is displayed)
	setTimeout(() => {
		// Accessibility : focus on the close button
		closeContact.focus();
	}, 0);
}

function closeModal() {
	const modal = document.getElementById("contact_modal");
	modal.style.display = "none";
	// Add to the callback queue, to be executed after the current call stack is cleared (Prevent closeContact event to also trigger onpenModal)
	setTimeout(() => {
		// Accessibility : focus back on the contact button
		contactButton.focus();
	}, 0);
}

function sendMessage(event) {
	event.preventDefault();
	const inputs = document.querySelectorAll("#contact_modal input, #contact_modal textarea");
	let formData = {};
	// Populate the formData object with the form data
	for (const input of inputs) {
		formData[input.name] = input.value;
		input.value = "";
	}
	console.log(formData);
	closeModal();
}
