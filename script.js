// ==================================================================================
// Hamburger Menu
// ==================================================================================

const hamburgerMenu = document.querySelector(".hamburger-menu");
const hamburgerMenuLines = document.querySelector(".hamburger-menu-lines");
const lines = document.querySelectorAll(".line");

hamburgerMenuLines.addEventListener("click", function() {
    // Toggle "active" class
    hamburgerMenu.classList.toggle("active");

    // Toggle "active" class for hamburger lines
    lines.forEach((line) => {
        line.classList.toggle("active-line");
    });
});

// ==================================================================================
// Shorten Link
// ==================================================================================

const btnInput = document.querySelector(".btn-input");
const longURL = document.getElementById("url-input");

function isValidHttpUrl(string) {
    // Initialize new variable
    let newUrl;

    // Validation check
    try {
        newUrl = new URL(string);
        return newUrl.protocol === 'http:' || newUrl.protocol === 'https:';
    } catch (error) {
        return false;  
    }
}

async function shortURL() {
    // Declaring 'input' value inside the function (not in global scope!!!)
    let longURLTxt = document.getElementById("url-input").value;

    // Print out the value (for debugging purposes)
    console.log(longURLTxt);

    try {
        // Calling confirmation URL function
        if (!isValidHttpUrl(longURLTxt)) {
            console.error("Invalid URL provided.");
            return;
        }

        // Fetch API
        const response = await fetch('https://cleanuri.com/api/v1/shorten', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Access-Control-Allow-Origin': '*',
            },
            body: `url=${encodeURIComponent(longURLTxt)}`
        });

        // Check if response is successful
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Convert to .JSON
        const data = await response.json();
        console.log(data, "result_url");
    } catch(error) {
        console.error(error);
    }
}

btnInput.addEventListener("click", () => shortURL());

window.addEventListener("submit", function(event) {
    event.preventDefault();
});

/**
 * Cijela funkcija se poziva bez obzira na Event Listener "Click"!
 * Moja pretpostavka: funkcija 'fetch' se instantno poziva.
 * Pokusat sa:
 * 1. Request & Response (spominje se na instrukcijama na stranici)
 * 
 * !!!RIJESENO!!!
 * 
 * Sada: maknit 'submit' sa botuna i zamijenit ga s obicnim 'button' type!!! (mozda :/)
 * Update: HTML sadrzi 'submit', JS 'click'!!!
 * 
 */

