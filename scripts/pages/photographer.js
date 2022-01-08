let photographersData;

async function getPhotographer() {
	if (!photographersData) {
		const urlParams = new URLSearchParams(window.location.search);
		const id = urlParams.get("id");
		console.log("Fetch json");
		let photographersJson = await fetch("../../data/photographers.json");
		photographersData = await photographersJson.json();
		photographersData.photographer = photographersData.photographers.filter((photographer) => photographer.id == id)[0];
		delete photographersData.photographers;
		photographersData.media = photographersData.media.filter((media) => media.photographerId == id);
	}

	photographersData.media.sort((a, b) => b.likes - a.likes);
	return photographersData;
}

async function displayHeader(photographer) {
	const photographerHeader = document.querySelector(".photograph-header");

	const headerModel = headerFactory(photographer);
	const profilDescriptionDom = headerModel.getProfilDescriptionDom();
	const profilPictureDom = headerModel.getProfilPictureDOM();
	photographerHeader.prepend(profilDescriptionDom);
	photographerHeader.appendChild(profilPictureDom);
}

async function displayInfoBar(photographer, media) {
	const main = document.querySelector("#main");
	const infoBar = document.querySelector(".info_bar");
	if (infoBar) infoBar.remove();

	const infoBarModel = infoBarFactory(photographer, media);
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

async function changeMediaOrder(orderBy, photographer, media) {
	if (!(photographer && media)) {
		data = await getPhotographer();
		photographer = data.photographer;
		media = data.media;
	}
	if (orderBy === "Date") media.sort((a, b) => new Date(b.date) - new Date(a.date));
	if (orderBy === "Titre") media.sort((a, b) => a.title.localeCompare(b.title));
	displayMedia(photographer, media);
}

async function displayContactName(photographer) {
	const modalTitle = document.querySelector("#contact_modal header h2");
	const contactName = document.createElement("text");
	contactName.textContent = " " + photographer.name;
	modalTitle.appendChild(contactName);
}

async function incrementLikes(mediaId) {
	for (key in photographersData.media) {
		if (photographersData.media[key].id === mediaId) {
			photographersData.media[key].likes++;
			break;
		}
	}

	let orderBy = "";
	const customSelectInputs = document.querySelectorAll(".custom_select input");
	for (const input of customSelectInputs) {
		if (input.checked) {
			orderBy = input.id;
			break;
		}
	}

	const { photographer, media } = await getPhotographer();
	displayInfoBar(photographer, media);
	changeMediaOrder(orderBy, photographer, media);
}

async function init() {
	const modals = document.querySelectorAll("dialog");
	modals.forEach((modal) => {
		modal.addEventListener("click", (e) => e.stopPropagation());
	});
	const { photographer, media } = await getPhotographer();
	displayHeader(photographer);
	displayInfoBar(photographer, media);
	displayMedia(photographer, media);
	displayContactName(photographer);
}

init();
