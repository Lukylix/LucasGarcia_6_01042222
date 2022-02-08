/* global photographersData, mediaFactory */
const carouselModal = document.getElementById("carousel_modal");
carouselModal.addEventListener("click", closeCarouselModal);

const closeCarousel = document.getElementById("close");
closeCarousel.addEventListener("click", closeCarouselModal);

const prev = document.getElementById("prev");
const next = document.getElementById("next");

let currentCarouselIndex = 0;
prev.addEventListener("click", () => {
	if (currentCarouselIndex > 0) {
		openCarouselAt(currentCarouselIndex - 1);
	} else {
		openCarouselAt(photographersData.media.length - 1);
	}
});

next.addEventListener("click", () => {
	if (currentCarouselIndex < photographersData.media.length - 1) {
		openCarouselAt(currentCarouselIndex + 1);
	} else {
		openCarouselAt(0);
	}
});

async function openCarouselAt(index) {
	currentCarouselIndex = index;
	const { name } = photographersData.photographer;
	const media = photographersData.media[index];
	const cardContainer = document.querySelector(".card-container");
	cardContainer.innerHTML = "";
	const mediaModel = mediaFactory(media, name, index);
	const mediaCarouselCardDOM = mediaModel.getMediaCarouselCardDOM();
	cardContainer.appendChild(mediaCarouselCardDOM);
	displayCarouselModal();
	closeCarousel.focus();
}

function displayCarouselModal() {
	const modal = document.getElementById("carousel_modal");
	modal.style.display = "block";
}

function closeCarouselModal() {
	const modal = document.getElementById("carousel_modal");
	modal.style.display = "none";
}

document.querySelector("body").addEventListener("keydown", (e) => {
	if (e.key === "ArrowLeft") prev.click();
	if (e.key === "ArrowRight") next.click();
	if (e.key === "Escape") closeCarouselModal();
});
