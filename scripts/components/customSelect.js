/* global changeMediaOrder */
const selectButton = document.querySelector("#select-button");
const select = document.querySelector("#dropdown");
const options = document.querySelectorAll(".option");
const selectLabel = document.querySelector("#select-label");
const labelsSelect = document.querySelectorAll(".dropdown label");
const lastLabelSelect = document.querySelector(".dropdown label:last-child");

// Accesibility : hide the select when focus is lost using keybord
lastLabelSelect.addEventListener("keydown", (e) => {
	if (e.key === "Tab") hide();
});
// Accesibility : hide the select when focus is lost using mouse
document.addEventListener("click", () => hide());

labelsSelect.forEach((label) => {
	label.addEventListener("keydown", (e) => {
		if (e.key === "Enter") {
			// Select the coresponding radio button
			const radioButton = document.querySelector(`input[id="${e.target.htmlFor}"]`);
			radioButton.checked = true;
			radioButton.dispatchEvent(new Event("change"));
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

function setSelectTitle(e) {
	const labelText = document.querySelector(`label[for="${e.target.id}"]`).innerText;
	selectLabel.innerText = labelText;
	hide();
}

options.forEach((option) => {
	option.addEventListener("change", (e) => {
		const input = e.target;
		// Prevent double-firing of change event
		if (input.checked) {
			setSelectTitle(e);
			changeMediaOrder(e.target.value);
		}
	});
});
