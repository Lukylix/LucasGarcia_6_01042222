async function getPhotographer() {
	let photographers = await fetch("../../data/photographers.json");
	photographers = await photographers.json();
	const urlParams = new URLSearchParams(window.location.search);
	const id = urlParams.get("id");

	photographers.photographer = photographers.photographers.filter((photographer) => photographer.id == id)[0];
	delete photographers.photographers;
	photographers.media = photographers.media.filter((media) => media.photographerId == id);
	photographers.media = photographers.media.map((media) => {
		if (likesToIncrement[media.id]) media.likes += likesToIncrement[media.id];
		return media;
	});
	photographers.media = photographers.media.sort((a, b) => b.likes - a.likes);
	return photographers;
}

async function displayHeader(photographer) {
	const photographerHeader = document.querySelector(".photograph-header");

	const headerModel = headerFactory(photographer);
	const profilDescriptionDom = headerModel.getProfilDescriptionDom();
	const profilPictureDom = headerModel.getProfilPictureDOM();
	photographerHeader.prepend(profilDescriptionDom);
	photographerHeader.appendChild(profilPictureDom);
}

async function displayInfoBar(data) {
	const main = document.querySelector("#main");
	const infoBar = document.querySelector(".info_bar");
	if (infoBar) infoBar.remove();

	const infoBarModel = infoBarFactory(data);
	const infoBarDom = infoBarModel.getInfoBarDom();
	main.appendChild(infoBarDom);
}

async function displayMedia(photographer, media) {
	const mediaSection = document.querySelector("#media-section");
	mediaSection.innerHTML = "";
	const { name } = photographer;
	media.forEach((media, index) => {
		const mediaModel = mediaFactory(media, name, index);
		const mediaCardDom = mediaModel.getMediaCardDom();
		mediaSection.appendChild(mediaCardDom);
	});
}

async function displayMediaCarousel(photographer, media) {
	const cardContainer = document.querySelector(".carousel .card-container");
	cardContainer.innerHTML = "";
	const { name } = photographer;
	media.forEach((media, index) => {
		const mediaModel = mediaFactory(media, name, index);
		const mediaCarouselCardDOM = mediaModel.getMediaCarouselCardDOM();
		cardContainer.appendChild(mediaCarouselCardDOM);
	});
}

async function changeMediaOrder(orderBy) {
	let { photographer, media } = await getPhotographer();
	if (orderBy === "Date") media = media.sort((a, b) => new Date(b.date) - new Date(a.date));
	if (orderBy === "Titre") media = media.sort((a, b) => a.title.localeCompare(b.title));
	displayMedia(photographer, media);
	displayMediaCarousel(photographer, media);
}

async function displayContactName(photographer) {
	const modalTitle = document.querySelector("#contact_modal header h2");
	const contactName = document.createElement("text");
	contactName.textContent = " " + photographer.name;
	modalTitle.appendChild(contactName);
}

const likesToIncrement = {};

async function incrementLikes(mediaId) {
	if (!likesToIncrement[mediaId]) likesToIncrement[mediaId] = 0;
	likesToIncrement[mediaId] += 1;

	// Get order by
	let orderBy = "";
	const customSelectInputs = document.querySelectorAll(".custom_select input");
	for (const input of customSelectInputs) {
		if (input.checked) {
			orderBy = input.id;
			break;
		}
	}

	const data = await getPhotographer();
	const { photographer, media } = data;
	displayInfoBar(data);
	changeMediaOrder(orderBy);
}

async function init() {
	// Récupère les datas des photographes
	const data = await getPhotographer();
	const { photographer, media } = data;
	displayHeader(photographer);
	displayInfoBar(data);
	displayMedia(photographer, media);
	displayMediaCarousel(photographer, media);
	displayContactName(photographer);
}

init();
