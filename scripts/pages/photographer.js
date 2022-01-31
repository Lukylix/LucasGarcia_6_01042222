let photographersData;

async function getPhotographer() {
	if (!photographersData) {
		const urlParams = new URLSearchParams(window.location.search);
		const id = urlParams.get("id");
		let photographersJson = await fetch("../../data/photographers.json");
		photographersData = await photographersJson.json();
		photographersData.photographer = photographersData.photographers.filter((photographer) => photographer.id == id)[0];
		delete photographersData.photographers;
		photographersData.media = photographersData.media.filter((media) => media.photographerId == id);
		photographersData.media.sort((a, b) => b.likes - a.likes);
	}
	return photographersData;
}

async function displayHeader(photographer) {
	const photographerHeader = document.querySelector(".photograph-header");

	const headerModel = headerFactory(photographer);
	const profilDescriptionDom = headerModel.getProfilDescriptionDOM();
	const profilPictureDom = headerModel.getProfilPictureDOM();
	photographerHeader.prepend(profilDescriptionDom);
	photographerHeader.appendChild(profilPictureDom);
}

async function displayInfoBar(photographer, media) {
	const main = document.querySelector("#main");
	const infoBar = document.querySelector(".info_bar");
	if (infoBar) infoBar.remove();

	const infoBarModel = infoBarFactory(photographer, media);
	const infoBarDom = infoBarModel.getInfoBarDOM();
	main.appendChild(infoBarDom);
}

async function displayMedia(photographer, media) {
	const mediaSection = document.querySelector("#media-section");
	mediaSection.innerHTML = "";
	const { name } = photographer;
	media.forEach((media, index) => {
		const mediaModel = mediaFactory(media, name, index);
		const mediaCardDom = mediaModel.getMediaCardDOM();
		mediaSection.appendChild(mediaCardDom);
	});
}

async function changeMediaOrder(orderBy, photographer, media) {
	if (!(photographer && media)) {
		const data = await getPhotographer();
		photographer = data.photographer;
		media = data.media;
	}
	if (orderBy === "Date") media.sort((a, b) => new Date(b.date) - new Date(a.date));
	if (orderBy === "Titre") media.sort((a, b) => a.title.localeCompare(b.title));
	if (orderBy === "Popularité") media.sort((a, b) => b.likes - a.likes);
	displayMedia(photographer, media);
}

async function displayContactName(photographer) {
	const modalTitle = document.querySelector("#contact_modal header h2");
	const contactName = document.createElement("text");
	const br = document.createElement("br");
	contactName.textContent = photographer.name;
	modalTitle.appendChild(br);
	modalTitle.appendChild(contactName);
}

async function incrementLikes(mediaId) {
	let orderBy = "";
	const customSelectInputs = document.querySelectorAll(".custom-select input[type=radio]");
	for (const input of customSelectInputs) {
		if (input.checked) {
			orderBy = input.value;
			break;
		}
	}

	let orderHasChange = false;
	for (const key in photographersData.media) {
		if (photographersData.media[key].id === mediaId) {
			photographersData.media[key].likes++;
			if (
				orderBy == "Popularité" &&
				key > 0 &&
				photographersData.media[key].likes > photographersData.media[key - 1].likes
			) {
				orderHasChange = true;
			} else {
				const likeButtonDom = document.querySelectorAll("#media-section figure figcaption button")[key];
				likeButtonDom.textContent = photographersData.media[key].likes + " ";
				const heart = document.createElement("i");
				heart.className = "fas fa-heart";
				likeButtonDom.appendChild(heart);
			}
			break;
		}
	}

	const { photographer, media } = await getPhotographer();
	displayInfoBar(photographer, media);
	if (orderHasChange) changeMediaOrder(orderBy, photographer, media);
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
