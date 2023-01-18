"use strict";

const feelingForm = document.getElementById("feeling-form");

if (!feelingForm) {
    console.error("Unable to get ID feeling-form");
} else {
    feelingForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const checked = document.querySelector("input:checked");

        if (!checked) {
            alert("Please select an option!");
            return;
        }

        const value = checked.value;

        switch (value) {
            case "Great":
                alert("Glad you are feeling so awesome! I would love to hear why. :) ");
                break;
            case "Good":
                alert("Glad you are feeling good! Feel free to share with me why.");
                break;
            case "Bad":
                alert("Sorry to hear you are feeling bad. If you need someone to talk to, please reach out to me.");
                break;
        }
    });
}
