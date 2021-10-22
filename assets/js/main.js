window.addEventListener("load", function () {
	let hamburger = this.document.querySelector("#hamburger");
	hamburger.addEventListener("click", openMenu);

	lsCollected = this.localStorage.getItem("collected");

	lsBackers = this.localStorage.getItem("backers");
	isLoaded = false;

	// Disable scroll on the top when a tag is clicked
	let aTag = this.document.querySelectorAll("a");
	aTag.forEach((a) => a.addEventListener("click", preventScrollOnClick));

	// Change color of bookmark
	let bookmark = this.document.querySelector("#bookmark");
	let lsBookmark = this.localStorage.getItem("bookmark");

	if (lsBookmark === "clicked") {
		bookmark.classList.add("bookmark-toggle");
		bookmark.childNodes[3].innerHTML = "Bookmarked";
	} else {
		bookmark.classList.remove("bookmark-toggle");
	}

	bookmark.addEventListener("click", addBookmark);

	updateProgessBar();

	// Modals
	let openModal = this.document.querySelectorAll(".open--modal");
	let closeModal = this.document.querySelector("#close--modal");

	rememberId = null;

	closeModal.addEventListener("click", toggleModal);
	openModal.forEach((om) => {
		om.addEventListener("click", toggleModal);
	});

	//Card header left
	let cardHeaderLeft = document.querySelectorAll(".card__header-left");
	let radioPledge = document.querySelectorAll(".pledge");
	radioPledge.forEach((rp) => {
		rp.addEventListener("click", function () {
			showPledgeDiv(rp.id);
		});
	});
	cardHeaderLeft.forEach((chl, i) => {
		chl.addEventListener("click", function () {
			showPledgeDiv(this.classList[3]);
		});
	});

	//Btn submit pledge
	let btnSubmit = document.querySelectorAll(".btn--submit");

	modal1 = document.querySelector(".modal1");
	modal2 = document.querySelector(".modal2");
	btnSubmit.forEach((btn) => {
		btn.addEventListener("click", sendPledge);
	});
	let gotItBtn = document.querySelector("#got-it");
	gotItBtn.addEventListener("click", toggleModal);

	//TEST
	amountReward1 = this.localStorage.getItem("bambooStand");
	amountReward2 = this.localStorage.getItem("blackEdition");

	rewardLeft = document.querySelectorAll(".amount-left");
	amountReward1 === null ? true : (rewardLeft[0].innerHTML = rewardLeft[2].innerHTML = this.localStorage.getItem("bambooStand"));
	amountReward2 === null ? true : (rewardLeft[1].innerHTML = rewardLeft[3].innerHTML = this.localStorage.getItem("blackEdition"));
});

function preventScrollOnClick(e) {
	return e.preventDefault();
}
function addBookmark() {
	let result = this.classList.toggle("bookmark-toggle");
	if (result) {
		lsBookmark = localStorage.setItem("bookmark", "clicked");
		this.classList.add("bookmark-toggle");
		this.childNodes[3].innerHTML = "Bookmarked";
	} else {
		lsBookmark = localStorage.setItem("bookmark", "notClicked");
		this.classList.remove("bookmark-toggle");
		this.childNodes[3].innerHTML = "Bookmark";
	}
}
function toggleModal() {
	let result = document.querySelector("#modal__container").classList.toggle("d--none");

	modal1.classList.remove("d--none");
	modal2.classList.add("d--none");
	if (result) {
		document.querySelector("#modal__container").classList.add("d--none");
	} else {
		document.querySelector("#modal__container").classList.remove("d--none");
		showPledgeDiv(this.classList[3]);
	}
}
function showPledgeDiv(e) {
	let idRadio = document.querySelector(`#${e}`); // e = radio id
	result = idRadio.parentElement.parentElement.parentElement.lastElementChild.classList.toggle("d--none"); // Dohvatam div u kom se nalazi input polje za pledge

	if (idRadio !== undefined || (idRadio !== null && result)) {
		rememberId !== null ? rememberId.classList.add("d--none") : false;
		idRadio.checked = true;
		rememberId = idRadio.parentElement.parentElement.parentElement.lastElementChild;
		idRadio.parentElement.parentElement.parentElement.lastElementChild.classList.remove("d--none");
	}
}
function sendPledge() {
	let donatedValue = Number(this.parentElement.firstElementChild.value); //Dollar amount

	modal1.classList.add("d--none");
	modal2.classList.remove("d--none");
	updateProgessBar(donatedValue);

	if (this.id === "pledge__bamboo") {
		addedAmount1 = Number(rewardLeft[0].innerHTML);

		rewardLeft[0].innerHTML = addedAmount1 - 1;
		rewardLeft[2].innerHTML = addedAmount1 - 1;
		amountReward1 = localStorage.setItem("bambooStand", rewardLeft[0].innerHTML);
	} else if (this.id === "pledge__black") {
		addedAmount1 = Number(rewardLeft[1].innerHTML);

		rewardLeft[1].innerHTML = addedAmount1 - 1;
		rewardLeft[3].innerHTML = addedAmount1 - 1;
		amountReward2 = localStorage.setItem("blackEdition", rewardLeft[1].innerHTML);
	}
}
function updateProgessBar(donated = 0) {
	// Progress bar
	let collected = document.querySelector("#collected"); // Money collected
	let collectedFloat = parseFloat(collected.innerHTML.substring(1).replace(/,/, ""));

	lsCollected === null ? (collectedFloat = collectedFloat + donated) : (collectedFloat = Number(lsCollected) + donated);

	collected.innerHTML = `$${collectedFloat.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`; // Numbers which are greater than 999 split with comma

	let goal = document.querySelector("#goal");
	let goalFloat = parseFloat(goal.innerHTML.substr(1).replace(/,/, ""));

	let percentage = (collectedFloat * 100) / goalFloat; // With this formula update progress bar.
	let progress = document.querySelector("#progress");

	collectedFloat >= goalFloat ? alert("We collected money!") : false;
	progress.style.width = `${percentage}%`;

	localStorage.setItem("collected", collectedFloat);
	saveToLocalStorage();
}
function saveToLocalStorage() {
	backers = document.querySelector("#backers");
	lsBackers === null ? (backersNumber = Number(backers.innerHTML.replace(/,/, ""))) : (backersNumber = Number(lsBackers.replace(/,/, "")));

	if (isLoaded) {
		backers.innerHTML = (backersNumber + 1).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); // New number of followers
		lsBackers = backers.innerHTML;
		localStorage.setItem("backers", lsBackers);
	} else {
		backers.innerHTML = backersNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}
	isLoaded = true;
}
function openMenu() {
	let menu = document.querySelector("#menu");
	let menuUl = document.querySelector(".menu__ul");
	let result = menu.classList.toggle("d--none");

	if (!result) {
		document.body.classList.add("overflow--hidden");
		this.src = "assets/images/icon-close-menu.svg";
		setTimeout(() => (menuUl.style.transform = "translateY(55%)"), 100);
	} else {
		menu.classList.remove("d--none");
		document.body.classList.remove("overflow--hidden");
		this.src = "assets/images/icon-hamburger.svg";
		menuUl.style.transform = "translateY(-103%)";
		setTimeout(() => menu.classList.add("d--none"), 400);
	}
}
