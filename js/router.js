export function getCurrentRoute() {
    return window.location.hash || "#/decks";
}
const pageSections = document.querySelectorAll(
    "#main-content > section"
);
function renderRoute() {
    const currentRoute = getCurrentRoute();

    pageSections.forEach(function (section) {
        section.hidden = true;
    });
    const routeMap = {
    "#/decks": "decks",
    "#/stats": "stats",
    "#/settings": "settings",
    "#/404": "not-found"
};

const sectionId = routeMap[currentRoute] || "not-found";
const activeSection = document.getElementById(sectionId);

if (activeSection) {
    activeSection.hidden = false;
}
if (currentRoute.startsWith("#/deck/")) {
    document.getElementById("deck-detail").hidden = false;
}

if (currentRoute.startsWith("#/study/")) {
    document.getElementById("deck-detail").hidden = false;
    document.getElementById("study-session").hidden = false;
}
}
window.addEventListener("hashchange", renderRoute);

renderRoute();