function photographerFactory(data) {
	console.log(data);
	const { id, name, portrait, city, country, tagline, price } = data;

	const picture = `assets/photographers/${portrait}`;

	function getUserCardDOM() {
		const article = document.createElement("article");
		const img = document.createElement("img");
		img.setAttribute("src", picture);
		const h2 = document.createElement("h2");
		h2.textContent = name;
		const link = document.createElement("a");
		link.setAttribute("href", `photographer.html?id=${id}`);
		const p = document.createElement("p");
		const location = document.createElement("span");
		location.textContent = `${city}, ${country}`;
		location.className = "location";
		const taglineElem = document.createTextNode(tagline);
		const priceElem = document.createElement("span");
		priceElem.textContent = `${price}€/jour`;
		priceElem.className = "price";
		p.appendChild(location);
		p.appendChild(document.createElement("br"));
		p.appendChild(taglineElem);
		p.appendChild(document.createElement("br"));
		p.appendChild(priceElem);
		link.appendChild(img);
		link.appendChild(h2);
		article.appendChild(link);
		article.appendChild(p);
		return article;
	}
	return { name, picture, getUserCardDOM };
}
