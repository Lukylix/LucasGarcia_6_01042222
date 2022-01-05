function headerFactory(data) {
	const { name, portrait, city, country, tagline } = data;

	const picture = `assets/photographers/${portrait}`;

	function getProfilPictureDOM() {
		const img = document.createElement("img");
		img.setAttribute("src", picture);
		return img;
	}
	function getProfilDescriptionDom() {
		const div = document.createElement("div");
		div.className = "description";
		const h2 = document.createElement("h1");
		h2.textContent = name;
		const p = document.createElement("p");
		const location = document.createElement("span");
		location.textContent = `${city}, ${country}`;
		location.className = "location";
		const taglineElem = document.createTextNode(tagline);
		p.appendChild(location);
		p.appendChild(document.createElement("br"));
		p.appendChild(taglineElem);
		div.appendChild(h2);
		div.appendChild(p);
		return div;
	}

	return { name, picture, getProfilPictureDOM, getProfilDescriptionDom };
}
