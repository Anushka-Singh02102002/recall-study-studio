export function getCurrentRoute() {
    return window.location.hash || "#/decks";
}
const pageSections = document.querySelectorAll(
    "#main-content > section[id]"
);
function renderRoute() {
    const currentRoute = getCurrentRoute();

const routeParts = currentRoute.split("/");
const deckId = routeParts[2];
const deckNames = {
    javascript: "JavaScript",
    python: "Python",
    algorithms: "Algorithms"
};
const isValidDeck = Object.hasOwn(deckNames, deckId);
const deckTitle = document.querySelector("#deck-detail h2");

if (deckTitle && currentRoute.startsWith("#/deck/")) {
    deckTitle.textContent = isValidDeck
        ? deckNames[deckId]
        : "Deck Not Found";
}
if (currentRoute.startsWith("#/deck/") && !isValidDeck) {
    window.location.hash = "#/404";
}

    pageSections.forEach(function (section) {
        section.hidden = true;
    });
    const routeMap = {
    "#/decks": "decks",
    "#/stats": "stats",
    "#/settings": "settings",
    "#/deck": "deck-detail",
    "#/study": "study-session",
    "#/404": "not-found"
};
let routeToShow = currentRoute;

if (currentRoute.startsWith("#/deck/")) {
    routeToShow = "#/deck";
} else if (currentRoute.startsWith("#/study/")) {
    routeToShow = "#/study";
}

const sectionId = routeMap[routeToShow] || "not-found";
const activeSection = document.getElementById(sectionId);
console.log("Active section:", activeSection?.id);
console.log(
    "Import/Export section:",
    document.getElementById("import-export")
);

console.log(
    "Settings section:",
    document.getElementById("settings")
);
console.log("Route:", currentRoute, "Section:", sectionId, "Found:", activeSection);

if (activeSection) {
    activeSection.hidden = false;
}
if (currentRoute.startsWith("#/deck/")) {
    document.getElementById("deck-detail").hidden = false;
}

}
window.addEventListener("hashchange", function () {
    renderRoute();
    window.dispatchEvent(new CustomEvent("deckroutechange"));
});

renderRoute();