function infoBarFactory(photographer, media) {
	const { price } = photographer;
	const likes = media.reduce((acc, media) => acc + media.likes, 0);

	function getInfoBarDOM() {
		const infoBar = document.createElement("div");
		infoBar.className = "info_bar";
		const priceElem = document.createElement("p");
		priceElem.textContent = `${price}€ / jour`;
		const likesElem = document.createElement("p");
		likesElem.textContent = likes + " ";
		likesElem.className = "likes";
		const heart = document.createElement("i");
		heart.className = "fas fa-heart";
		likesElem.appendChild(heart);
		infoBar.appendChild(likesElem);
		infoBar.appendChild(priceElem);
		return infoBar;
	}

	return { getInfoBarDOM };
}
