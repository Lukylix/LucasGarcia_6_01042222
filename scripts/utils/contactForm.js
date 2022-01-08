const contactButton = document.querySelector(".contact_button");
contactButton.addEventListener("click", displayModal);

const contactModal = document.getElementById("contact_modal");
contactModal.addEventListener("click", closeModal);

const closeContact = document.getElementById("close_contact");
closeContact.addEventListener("click", closeModal);

function displayModal() {
	const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
}

function closeModal() {
	const modal = document.getElementById("contact_modal");
	modal.style.display = "none";
}
