var normal = document.getElementById("nav-menu");
var reverse = document.getElementById("nav-menu-left");

var icon = normal !== null ? normal : reverse;

// Toggle the "menu-open" % "menu-opn-left" classes
function toggle() {
	var navRight = document.getElementById("nav");
	var navLeft = document.getElementById("nav-left");
	var nav = navRight !== null ? navRight : navLeft;

	var button = document.getElementById("menu");
	var site = document.getElementById("wrap");

	if (nav.className == "menu-open" || nav.className == "menu-open-left") {
		nav.className = "";
		button.className = "";
		site.className = "";
	} else if (reverse !== null) {
		nav.className += "menu-open-left";
		button.className += "btn-close";
		site.className += "fixed";
	} else {
		nav.className += "menu-open";
		button.className += "btn-close";
		site.className += "fixed";
	}
}

// Ensures backward compatibility with IE old versions
function menuClick() {
	if (document.addEventListener && icon !== null) {
		icon.addEventListener('click', toggle);
	} else if (document.attachEvent && icon !== null) {
		icon.attachEvent('onclick', toggle);
	} else {
		return;
	}
}

function setCookie(cname, cvalue, exdays) {
	var d = new Date();
	d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
	var expires = "expires=" + d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}

let saved_theme = getCookie("theme");
let light = true;
if (!saved_theme || saved_theme === "" || saved_theme === "light") {
	light = true;
} else {
	light = false;
}
light = !light;
toggleTheme();

function toggleTheme() {
	light = !light;
	if (!light) {
		document.getElementById("body").setAttribute("class", `thm-dark`);
	} else {
		document.getElementById("body").setAttribute("class", `thm-light`);

	}
	console.log(getCookie("theme"));
	setCookie("theme", light ? "light" : "dark", 365);

}