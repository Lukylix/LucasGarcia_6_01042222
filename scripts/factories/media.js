function mediaFactory(media, name, index) {
	const { title, image, likes, video } = media;

	const directory = name.split(" ")[0];
	const picture = `assets/medias/${directory}/${image}`;
	const videoSrc = `assets/medias/${directory}/${video}`;

	function getMediaCardDom() {
		const mediaCard = document.createElement("figure");

		const link = document.createElement("a");
		link.href = `javascript:void(0)`;
		link.setAttribute("onclick", `onpenCarouselAt(${index})`);

		let mediaImg;
		if (!!image) {
			mediaImg = document.createElement("img");
			mediaImg.setAttribute("src", picture);
		}

		let mediaVideo;
		if (!!video) {
			mediaVideo = document.createElement("video");
			mediaVideo.setAttribute("src", videoSrc);
			// mediaVideo.setAttribute("controls", "");
		}

		const mediaCaption = document.createElement("figcaption");
		const mediaTitle = document.createElement("p");
		mediaTitle.textContent = title;
		const mediaLikes = document.createElement("p");
		mediaLikes.textContent = likes + " ";
		const heart = document.createElement("i");
		heart.className = "fas fa-heart";
		mediaLikes.appendChild(heart);

		if (!!image) link.appendChild(mediaImg);
		if (!!video) link.appendChild(mediaVideo);
		mediaCard.appendChild(link);
		mediaCard.appendChild(mediaCaption);
		mediaCaption.appendChild(mediaTitle);
		mediaCaption.appendChild(mediaLikes);
		return mediaCard;
	}
	function getMediaCarouselCardDOM() {
		const mediaCard = document.createElement("figure");
		mediaCard.className = index == 0 ? "card view" : "card";
		const mediaCaption = document.createElement("figcaption");
		const mediaTitle = document.createElement("p");
		mediaTitle.textContent = title;
		let img;
		if (!!image) {
			img = document.createElement("img");
			img.setAttribute("src", picture);
		}
		let mediaVideo;
		if (!!video) {
			mediaVideo = document.createElement("video");
			mediaVideo.setAttribute("src", videoSrc);
			mediaVideo.setAttribute("controls", "");
		}
		mediaCaption.appendChild(mediaTitle);
		if (!!image) mediaCard.appendChild(img);
		if (!!video) mediaCard.appendChild(mediaVideo);
		mediaCard.appendChild(mediaCaption);
		return mediaCard;
	}

	return { getMediaCardDom, getMediaCarouselCardDOM };
}
