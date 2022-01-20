const selectButton = document.querySelector("#select-button");
const select = document.querySelector("#dropdown");
const options = document.querySelectorAll(".option");
const selectLabel = document.querySelector("#select-label");
const labelsSelect = document.querySelectorAll(".dropdown label");
const lastLabelSelect = document.querySelector(".dropdown label:last-child");

lastLabelSelect.addEventListener("keydown", (e) => {
	if (e.key === "Tab") {
		hide();
	}
});

document.addEventListener("click", (e) => {
	hide();
});

labelsSelect.forEach((label) => {
	label.addEventListener("keydown", (e) => {
		if (e.key === "Enter") {
			e.target.id = e.target.htmlFor;
			const radioButton = document.querySelector(`input[id="${e.target.htmlFor}"]`);
			radioButton.checked = true;
			radioButton.dispatchEvent(new Event("change"));
			setSelectTitle(e);
		}
	});
});

selectButton.addEventListener("click", (e) => {
	e.stopPropagation();
	show();
});

function show() {
	select.classList.remove("hidden");
	selectButton.classList.add("active");
}

function hide() {
	select.classList.add("hidden");
	selectButton.classList.remove("active");
}

options.forEach((option) => {
	option.addEventListener("change", (e) => {
		setSelectTitle(e);
		changeMediaOrder(e.target.value);
	});
});

function setSelectTitle(e) {
	const labelElement = document.querySelector(`label[for="${e.target.id}"]`).innerText;
	selectLabel.innerText = labelElement;
	hide();
}
