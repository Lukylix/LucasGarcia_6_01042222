const prev = document.getElementById("prev");
const next = document.getElementById("next");

prev.addEventListener("click", function () {
	/* Find the current card */
	const currCard = document.querySelector(".card.view");
	/* Set the prevCard based on its availability */
	const prevCard = currCard.previousElementSibling
		? currCard.previousElementSibling
		: document.querySelector(".card-container").lastElementChild;
	currCard.classList.remove("view");
	prevCard.classList.add("view");
});

next.addEventListener("click", function () {
	/* Find the current card */
	const currCard = document.querySelector(".card.view");
	/* Set the nextCard based on its availability */
	const nextCard = currCard.nextElementSibling
		? currCard.nextElementSibling
		: document.querySelector(".card-container").firstElementChild;
	currCard.classList.remove("view");
	nextCard.classList.add("view");
});

async function onpenCarouselAt(index) {
	const currCard = document.querySelector(".card.view");
	const nextCard = document.querySelector(".card-container").children[index];
	currCard.classList.remove("view");
	nextCard.classList.add("view");
	displayCarouselModal();
}

function displayCarouselModal() {
	const modal = document.getElementById("carousel_modal");
	modal.style.display = "block";
}

function closeCarouselModal() {
	const modal = document.getElementById("carousel_modal");
	modal.style.display = "none";
}
