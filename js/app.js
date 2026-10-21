
import { getCurrentRoute } from "./router.js";
import { starterFlashcards } from "./data.js";
import { syncWithServer } from "./mockServer.js";
import { loadFlashcards, saveFlashcards as saveFlashcardsToStorage } from "./storage.js";
import { decks, saveDecks, loadDecks } from "./store.js";
import { getNextReviewDate } from "./scheduler.js";


console.log(getCurrentRoute());
const savedCards = loadFlashcards();

starterFlashcards.forEach((starterCard) => {
    const alreadyExists = savedCards.some(
        (card) =>
            card.deckId === starterCard.deckId &&
            card.front === starterCard.front
    );

    if (!alreadyExists) {
        savedCards.push({
            id: crypto.randomUUID(),
            status: "new",
            image: "",
            createdAt: new Date().toISOString(),
            scheduling: {
                box: 1,
                nextReview: null,
                reviews: 0
            },
            ...starterCard
        });
    }
});

saveFlashcardsToStorage(savedCards);

savedCards.forEach((card) => {
    if (!card.deckId) {
        card.deckId = "javascript";
    }
});

saveFlashcardsToStorage(savedCards);

const flashcards = savedCards;

saveFlashcards();

const pageTitle = document.querySelector("h1");
console.log(pageTitle);

const mainContent = document.querySelector("main");
console.log(mainContent);

const navigation = document.querySelector("nav");
console.log(navigation);
const deckList = document.querySelector(".deck-list");

const defaultEditButtons = document.querySelectorAll(".edit-deck");
const defaultDeleteButtons = document.querySelectorAll(".delete-deck");

defaultEditButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const article = button.closest("article");
        const heading = article.querySelector("h3");
        const oldName = heading.textContent;

        const updatedName = prompt("Enter the new deck name:", oldName);

        if (updatedName === null) {
            return;
        }

        const trimmedName = updatedName.trim();

        if (trimmedName.length < 2) {
            alert("Deck name must contain at least 2 characters.");
            return;
        }

        const deck = decks.find(
            (item) => item.name.toLowerCase() === oldName.toLowerCase()
        );

        if (!deck) {
            alert("Deck not found.");
            return;
        }

        const duplicateDeck = decks.some(
            (item) =>
                item.id !== deck.id &&
                item.name.toLowerCase() === trimmedName.toLowerCase()
        );

        if (duplicateDeck) {
            alert("A deck with this name already exists.");
            return;
        }

        const oldId = deck.id;
        const newId = trimmedName.toLowerCase().replace(/\s+/g, "-");

        deck.name = trimmedName;
        deck.id = newId;

        const description = article.querySelector("p");
        const openLink = article.querySelector("a");

        heading.textContent = trimmedName;
        openLink.href = `#/deck/${newId}`;

        article.querySelectorAll("span").forEach((span) => {
            if (span.id === `count-${oldId}`) {
                span.id = `count-${newId}`;
            }

            if (span.id === `due-${oldId}`) {
                span.id = `due-${newId}`;
            }
        });

        flashcards.forEach((card) => {
            if (card.deckId === oldId) {
                card.deckId = newId;
            }
        });

        saveDecks();
        saveFlashcards();

        deckSearchInput.dispatchEvent(new Event("input"));
        deckSortInput.dispatchEvent(new Event("change"));
    });
});

defaultDeleteButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const article = button.closest("article");
        const heading = article.querySelector("h3");
        const deckName = heading.textContent;

        const deck = decks.find(
            (item) => item.name.toLowerCase() === deckName.toLowerCase()
        );

        if (!deck) {
            alert("Deck not found.");
            return;
        }

        const confirmDelete = confirm(
            `Are you sure you want to delete "${deckName}"?`
        );

        if (!confirmDelete) {
            return;
        }

        const deckId = deck.id;

        
        const deckIndex = decks.findIndex(
            (item) => item.id === deckId
        );

        if (deckIndex !== -1) {
            decks.splice(deckIndex, 1);
        }

        
        for (let i = flashcards.length - 1; i >= 0; i--) {
            if (flashcards[i].deckId === deckId) {
                flashcards.splice(i, 1);
            }
        }

        saveDecks();
        saveFlashcards();

        article.remove();

        deckSearchInput.dispatchEvent(new Event("input"));
    });
});



console.log("Available decks:", decks);
const createDeckForm = document.querySelector("#create-deck-form");
createDeckForm?.addEventListener("submit", (event) => {
    event.preventDefault();

    const deckNameInput = document.querySelector("#deck-name");
    const deckDescriptionInput = document.querySelector("#deck-description");

    const deckName = deckNameInput.value.trim();
    const deckDescription = deckDescriptionInput.value.trim();

    if (!deckName) {
        deckNameInput.focus();
        return;
    }

    const deckId = deckName.toLowerCase().replace(/\s+/g, "-");

    if (decks.some((deck) => deck.id === deckId)) {
        alert("A deck with this name already exists.");
        return;
    }

    const newDeck = {
        id: deckId,
        name: deckName,
        description: deckDescription || "No description added yet."
    };

    decks.push(newDeck);
    saveDecks();

    const article = document.createElement("article");

    const heading = document.createElement("h3");
    heading.textContent = newDeck.name;

    const description = document.createElement("p");
    description.textContent = newDeck.description;

    const flashcardsCount = document.createElement("p");
flashcardsCount.id = `count-${newDeck.id}`;
flashcardsCount.textContent = "Flashcards: 0";

const dueCount = document.createElement("p");
dueCount.id = `due-${newDeck.id}`;
dueCount.textContent = "Due for review: 0";

    const openLink = document.createElement("a");
    openLink.href = `#/deck/${newDeck.id}`;
    openLink.textContent = "Open Deck";
    const editButton = document.createElement("button");
    editButton.type = "button";
    editButton.textContent = "Edit Deck";
    editButton.addEventListener("click", () => {
    const updatedName = prompt("Enter the new deck name:", newDeck.name);

    if (updatedName === null) return;

    const trimmedName = updatedName.trim();

    if (trimmedName.length < 2) {
        alert("Deck name must be at least 2 characters.");
        return;
    }

    const duplicateDeck = decks.some(
        (deck) =>
            deck.id !== newDeck.id &&
            deck.name.toLowerCase() === trimmedName.toLowerCase()
    );

    if (duplicateDeck) {
        alert("A deck with this name already exists.");
        return;
    }

    newDeck.name = trimmedName;
    saveDecks();
    heading.textContent = trimmedName;

    newDeck.id = trimmedName.toLowerCase().replace(/\s+/g, "-");
    openLink.href = `#/deck/${newDeck.id}`;

    deckSearchInput.dispatchEvent(new Event("input"));
    deckSortInput.dispatchEvent(new Event("change"));
});

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.textContent = "Delete Deck";
    deleteButton.addEventListener("click", () => {
    const confirmDelete = confirm(
        `Are you sure you want to delete "${newDeck.name}"?`
    );

    if (!confirmDelete) return;

    article.remove();

    const deckIndex = decks.findIndex(
        (deck) => deck.id === newDeck.id
    );

    if (deckIndex !== -1) {
        decks.splice(deckIndex, 1);
    }
    saveDecks();
          
    deckSearchInput.dispatchEvent(new Event("input"));
});

    article.append(
        heading,
        description,
        flashcardsCount,
        dueCount,
        openLink,
        editButton,
        deleteButton
    );

    deckList.append(article);

    createDeckForm.reset();

    deckSearchInput.dispatchEvent(new Event("input"));
    deckSortInput.dispatchEvent(new Event("change"));
});
const deckSortInput = document.querySelector("#deck-sort");
const deckSearchInput = document.querySelector("#deck-search");
deckSearchInput?.addEventListener("input", () => {
    const searchText = deckSearchInput.value.toLowerCase().trim();
    const deckCards = deckList.querySelectorAll("article");
    let visibleDecks = 0;

    deckCards.forEach((card) => {
        const deckName = card.querySelector("h3")?.textContent
            .toLowerCase() || "";

        const matches = deckName.includes(searchText);

        card.hidden = !matches;

        if (matches) {
            visibleDecks++;
        }
    });

    const noDecksMessage = document.querySelector("#no-decks-message");

    if (noDecksMessage) {
        noDecksMessage.hidden = visibleDecks > 0;
    }
});
deckSortInput.addEventListener("change", function () {
    const deckCards = Array.from(deckList.querySelectorAll("article"));

    deckCards.sort(function (a, b) {
        const nameA = a.querySelector("h3").textContent.trim();
        const nameB = b.querySelector("h3").textContent.trim();

        if (deckSortInput.value === "az") {
            return nameA.localeCompare(nameB);
        }

        if (deckSortInput.value === "za") {
            return nameB.localeCompare(nameA);
        }

        return 0;
    });

    deckCards.forEach(function (card) {
        deckList.append(card);
    });
});

function updateDueCount(deckId) {
    const cards = JSON.parse(
        localStorage.getItem("recall-flashcards") || "[]"
    );

    const today = new Date().toISOString().slice(0, 10);

    const dueCards = cards.filter(function (card) {
        return (
            card.deckId === deckId &&
            card.scheduling &&
            card.scheduling.nextReview &&
            card.scheduling.nextReview <= today
        );
    });

    const dueCount = document.querySelector(`#due-${deckId}`);

    if (dueCount) {
        dueCount.textContent = dueCards.length;
    }
}
updateDueCount("javascript");
updateDueCount("python");
updateDueCount("algorithms");

const flashcardForm = document.querySelector("#flashcard-form");
const frontInput = document.querySelector("#flashcard-question");
const backInput = document.querySelector("#flashcard-answer");
const hintInput = document.querySelector("#flashcard-hint");
const tagsInput = document.querySelector("#flashcard-tags");
const fileInput = document.querySelector("#flashcard-file");
const flashcardList = document.querySelector("#flashcard-list");
const searchInput = document.querySelector("#flashcard-search");
const tagFilterInput = document.querySelector("#flashcard-tag-filter");
const statusFilterInput = document.querySelector("#flashcard-status-filter");
let editingCardId = null;
const currentRoute = getCurrentRoute();
const routeParts = currentRoute.split("/");
const currentDeckId = routeParts[2] || "javascript";
console.log("Current deck:", currentDeckId);

function readImageFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = function () {
            resolve(reader.result);
        };

        reader.onerror = function () {
            reject(new Error("Could not read the image."));
        };

        reader.readAsDataURL(file);
    });
}


function displayFlashcard(card) {
    const cardElement = document.createElement("article");
    cardElement.className = "flashcard-item";

    const questionElement = document.createElement("h4");
    questionElement.textContent = card.front;

    const answerElement = document.createElement("p");
    answerElement.textContent = card.back;
    if (card.image) {
    const imageElement = document.createElement("img");

    imageElement.src = card.image;
    imageElement.alt = "Image attached to this flashcard";
    imageElement.className = "flashcard-image";

    cardElement.append(imageElement);
}
     
    const deleteButton = document.createElement("button");
deleteButton.type = "button";
deleteButton.textContent = "Delete Deck";
deleteButton.className = "flashcard-delete";
const editButton = document.createElement("button");
editButton.type = "button";
editButton.textContent = "Edit";
editButton.className = "flashcard-edit";
editButton.addEventListener("click", function () {
    
    editingCardId = card.id;

    frontInput.value = card.front;
    backInput.value = card.back;
    hintInput.value = card.hint || "";
    tagsInput.value = (card.tags || []).join(", ");


    frontInput.focus();
});
deleteButton.addEventListener("click", function () {
    const cardIndex = flashcards.findIndex(
        (item) => item.id === card.id
    );

    if (cardIndex === -1) {
        return;
    }

    flashcards.splice(cardIndex, 1);
    saveFlashcards();

    renderCurrentDeckCards();
    updateDueCount("javascript");
    updateDueCount("python");
    updateDueCount("algorithms");

    const currentDeckId = getCurrentRoute().split("/")[2];
const cardCount = document.querySelector(`#count-${currentDeckId}`);

if (cardCount) {
    cardCount.textContent = flashcards.filter(
        (item) => item.deckId === currentDeckId
    ).length;
}
});
    cardElement.append(
    questionElement,
    answerElement,
    editButton,
    deleteButton
);
    flashcardList.append(cardElement);
}

function renderCurrentDeckCards() {
    flashcardList.replaceChildren();

   const searchTerm = searchInput.value.trim().toLowerCase();
   const selectedTag = tagFilterInput.value.trim().toLowerCase();
   const selectedStatus = statusFilterInput.value;
const today = new Date().toISOString().slice(0, 10);

const currentDeckCards = flashcards.filter((card) => {
    const belongsToCurrentDeck = card.deckId === currentDeckId;

  const matchesSearch =
    card.front.toLowerCase().includes(searchTerm) ||
    card.back.toLowerCase().includes(searchTerm) ||
    (card.tags || []).some(tag =>
        tag.toLowerCase().includes(searchTerm)
    );

const matchesTag =
    !selectedTag ||
    (card.tags || []).some(tag =>
        tag.toLowerCase().includes(selectedTag)
    );

const cardStatus = card.status || "new";

const isDue =
    card.scheduling &&
    card.scheduling.nextReview &&
    card.scheduling.nextReview <= today;

const matchesStatus =
    selectedStatus === "all" ||
    (selectedStatus === "new" && cardStatus === "new") ||
    (selectedStatus === "learning" && cardStatus === "learning") ||
    (selectedStatus === "due" && isDue) ||
    (selectedStatus === "leech" && cardStatus === "leech");
    
return (
    belongsToCurrentDeck &&
    matchesSearch &&
    matchesTag &&
    matchesStatus
);

});

currentDeckCards.forEach(displayFlashcard);
}
window.addEventListener("deckroutechange", function () {
    renderCurrentDeckCards();
});


renderCurrentDeckCards();
let searchTimeout;

searchInput.addEventListener("input", function () {
    clearTimeout(searchTimeout);

    searchTimeout = setTimeout(function () {
        renderCurrentDeckCards();
    }, 300);
});
tagFilterInput.addEventListener("input", function () {
    renderCurrentDeckCards();
});
statusFilterInput.addEventListener("change", function () {
    renderCurrentDeckCards();
});



flashcardForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const question = frontInput.value.trim();
    const answer = backInput.value.trim();
    let imageData = "";

const selectedFile = fileInput.files[0];
if (selectedFile && !selectedFile.type.startsWith("image/")) {
    document.querySelector("#flashcard-message").textContent =
        "Please select an image file.";
    return;
}
if (selectedFile && selectedFile.size > 2 * 1024 * 1024) {
    document.querySelector("#flashcard-message").textContent =
        "Image size must be 2 MB or less.";
    return;
}

if (selectedFile) {
    try {
        imageData = await readImageFile(selectedFile);
    } catch (error) {
        document.querySelector("#flashcard-message").textContent =
            "Could not read the selected image.";
        return;
    }
}
    const currentDeckId = getCurrentRoute().split("/")[2] || "javascript";

  
    if (!question || !answer) {
        const flashcardMessage = document.querySelector("#flashcard-message");
        flashcardMessage.textContent = "Please enter both a question and an answer.";
        return;
    }

    if (editingCardId) {
    const cardIndex = flashcards.findIndex(
        (card) => card.id === editingCardId
    );

    if (cardIndex !== -1) {
    flashcards[cardIndex] = {
        ...flashcards[cardIndex],
        front: question,
        back: answer,
        hint: hintInput.value.trim(),
        tags: tagsInput.value
            .split(",")
            .map(tag => tag.trim())
            .filter(tag => tag !== "")
    };
}

    editingCardId = null;
} else {
    const newCard = {
    id: crypto.randomUUID(),
    deckId: getCurrentRoute().split("/")[2] || "javascript",
    status: "new",
    front: question,
    back: answer,
    image: imageData,
    hint: hintInput.value.trim(),
    tags: tagsInput.value
        .split(",")
        .map(tag => tag.trim())
        .filter(tag => tag !== ""),
    createdAt: new Date().toISOString(),
    scheduling: {
        box: 1,
        nextReview: null,
        reviews: 0
    }
};

    flashcards.push(newCard);
}
     saveFlashcards();

    renderCurrentDeckCards();

    
   const cardCount = document.querySelector(`#count-${currentDeckId}`);

if (cardCount) {
    cardCount.textContent = flashcardList.children.length;
}

    
    const flashcardMessage = document.querySelector("#flashcard-message");
    flashcardMessage.textContent = "Flashcard added successfully!";

    
    flashcardForm.reset();
});
const studyFlashcard = document.querySelector("#study-flashcard");
const studyQuestion = document.querySelector("#study-question");
const studyAnswer = document.querySelector("#study-answer");
let currentStudyCard = null;
function loadStudyCard() {
    const routeParts = getCurrentRoute().split("/");
    const deckId = routeParts[2];

     const today = new Date().toISOString().slice(0, 10);
    const deckCards = flashcards.filter(
        (card) => card.deckId === deckId
    );

    if (deckCards.length === 0) {
        studyQuestion.textContent = "No flashcards available.";
        studyAnswer.textContent = "Add some flashcards to start studying.";
        return;
    }

    currentStudyCard = deckCards[0];

currentStudyCard = deckCards[0];
studyQuestion.textContent = currentStudyCard.front;
studyAnswer.textContent = currentStudyCard.back;
}

loadStudyCard();


let currentStudyIndex = 0;

function showNextStudyCard() {
    const deckId = getCurrentRoute().split("/")[2];

    const deckCards = flashcards.filter(
    (card) => card.deckId === deckId
);

    if (deckCards.length === 0) {
        return;
    }

    currentStudyIndex++;

    if (currentStudyIndex >= deckCards.length) {
        currentStudyIndex = 0;
    }
    currentStudyCard = deckCards[currentStudyIndex];

    studyQuestion.textContent =
        deckCards[currentStudyIndex].front;

    studyAnswer.textContent =
        deckCards[currentStudyIndex].back;

    studyFlashcard.classList.remove("is-flipped");
}


studyFlashcard.addEventListener("click", function () {
    studyFlashcard.classList.toggle("is-flipped");
});
document.addEventListener("keydown", function (event) {

    if (event.code === "Space") {
        event.preventDefault();
        studyFlashcard.classList.toggle("is-flipped");
    }

    
    if (
        event.target.matches("input, textarea, select") ||
        event.target.isContentEditable
    ) {
        return;
    }

    if (event.key === "1" && !knowAnswerButton.disabled) {
        knowAnswerButton.click();
    }

    if (event.key === "2" && !reviewAnswerButton.disabled) {
        reviewAnswerButton.click();
    }

    if (event.key.toLowerCase() === "z" &&!undoActionButton.disabled)
{
    undoActionButton.click();
}
});

const startStudyButton = document.querySelector("#start-study");
const studySession = document.querySelector("#study-session");

startStudyButton.addEventListener("click", function () {
    const currentRoute = getCurrentRoute();
    const routeParts = currentRoute.split("/");
    const deckId = routeParts[2] || "javascript";

    reviewedCards = 0;
    currentStudyIndex = 0;

    knowAnswerButton.disabled = false;
    reviewAnswerButton.disabled = false;

    const totalStudyCards = getTotalStudyCards();

sessionProgress.max = totalStudyCards;
sessionProgress.value = 0;

sessionProgressText.textContent =
    `0 out of ${totalStudyCards} cards reviewed`;
   
    studyTimer.textContent = "00:00";

    loadStudyCard();
    startStudyTimer();

    window.location.hash = `#/study/${deckId}`;
});


const knowAnswerButton = document.querySelector("#know-answer");
const undoActionButton = document.querySelector("#undo-action");
const reviewAnswerButton = document.querySelector("#review-answer");
const sessionProgress = document.querySelector("#session-progress");
const sessionProgressText = document.querySelector("#session-progress-text");

let reviewedCards = 0;
function getTotalStudyCards() {
    const currentDeckId = getCurrentRoute().split("/")[2];

    return flashcards.filter(
        (card) => card.deckId === currentDeckId
    ).length;
}


let previousStudyState = null;
function saveFlashcards() {
 const saved = saveFlashcardsToStorage(flashcards);

    if (!saved) {
        console.error("Flashcards could not be saved.");
    }
}
   
    function updateStatsDashboard() {
    const totalFlashcards = flashcards.length;
    const today = new Date().toISOString().slice(0, 10);
    const reviewedDates = new Set();

flashcards.forEach((card) => {
    const dailyReviews = card.scheduling?.dailyReviews || {};

    Object.entries(dailyReviews).forEach(([date, count]) => {
        if (count > 0) {
            reviewedDates.add(date);
        }
    });
});
let currentStreak = 0;

const checkDate = new Date();
checkDate.setHours(0, 0, 0, 0);

while (true) {
    const dateString = [
        checkDate.getFullYear(),
        String(checkDate.getMonth() + 1).padStart(2, "0"),
        String(checkDate.getDate()).padStart(2, "0")
    ].join("-");

    if (!reviewedDates.has(dateString)) {
        break;
    }

    currentStreak++;
    checkDate.setDate(checkDate.getDate() - 1);
}

if (currentStreak === 0) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const yesterdayString = [
        yesterday.getFullYear(),
        String(yesterday.getMonth() + 1).padStart(2, "0"),
        String(yesterday.getDate()).padStart(2, "0")
    ].join("-");

    if (reviewedDates.has(yesterdayString)) {
        checkDate.setTime(yesterday.getTime());

        while (true) {
            const dateString = [
                checkDate.getFullYear(),
                String(checkDate.getMonth() + 1).padStart(2, "0"),
                String(checkDate.getDate()).padStart(2, "0")
            ].join("-");

            if (!reviewedDates.has(dateString)) {
                break;
            }

            currentStreak++;
            checkDate.setDate(checkDate.getDate() - 1);
        }
    }
}

document.querySelector("#stats-current-streak").textContent =
    `${currentStreak} ${currentStreak === 1 ? "day" : "days"}`;


const todayReviews = flashcards.filter((card) => {
    return (card.scheduling?.dailyReviews?.[today] || 0) > 0;
}).length;

console.log("Today's date key:", today);

console.log(
    "Today's review counts:",
    flashcards
        .map(card => card.scheduling?.dailyReviews?.[today] || 0)
        .filter(count => count > 0)
);

const currentStreakDisplay = document.querySelector("#current-streak");

if (currentStreakDisplay) {
    currentStreakDisplay.textContent = currentStreak;
}


const dailyGoalInput = document.querySelector("#daily-goal");
const goalStatusDisplay = document.querySelector("#goal-status");
const dailyGoal = Number(dailyGoalInput?.value || 10);

const studyProgress = document.querySelector("#study-progress");
const studyProgressText = document.querySelector("#study-progress-text");

const todayProgress = Math.min(todayReviews, dailyGoal);
console.log("Today's reviews:", todayReviews);


if (studyProgress) {
    studyProgress.max = dailyGoal;
    studyProgress.value = todayProgress;
}

if (studyProgressText) {
    studyProgressText.textContent =
        `${todayProgress} out of ${dailyGoal} cards reviewed`;
}


    const totalReviews = flashcards.reduce((total, card) => {
        return total + (card.scheduling?.reviews || 0);
    }, 0);

    const masteredCards = flashcards.filter(card => {
        return card.scheduling?.box === 5;
    }).length;

    const correctReviews = flashcards.reduce((total, card) => {
        return total + (card.scheduling?.correctReviews || 0);
    }, 0);

    const incorrectReviews = flashcards.reduce((total, card) => {
        return total + (card.scheduling?.incorrectReviews || 0);
    }, 0);

    const totalRatedReviews = correctReviews + incorrectReviews;

    const accuracy = totalRatedReviews > 0
        ? Math.round((correctReviews / totalRatedReviews) * 100)
        : 0;
    const dailyProgress = {};
    const heatmap = document.querySelector("#stats-heatmap");

if (heatmap) {
    heatmap.replaceChildren();

    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - 364);

    const reviewCounts = {};

    flashcards.forEach((card) => {
        const dailyReviews = card.scheduling?.dailyReviews || {};

        Object.entries(dailyReviews).forEach(([date, count]) => {
            reviewCounts[date] = (reviewCounts[date] || 0) + count;
        });
        
    });

    for (let i = 0; i < 365; i++) {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + i);

        const dateString = [
            date.getFullYear(),
            String(date.getMonth() + 1).padStart(2, "0"),
            String(date.getDate()).padStart(2, "0")
        ].join("-");

        const count = reviewCounts[dateString] || 0;
        const day = document.createElement("div");

        day.classList.add("stats-heatmap__day");

        if (count >= 1 && count <= 2) {
            day.classList.add("stats-heatmap__day--low");
        } else if (count >= 3 && count <= 5) {
            day.classList.add("stats-heatmap__day--medium");
        } else if (count >= 6) {
            day.classList.add("stats-heatmap__day--high");
        }

        day.title = `${dateString}: ${count} reviews`;
        day.setAttribute("aria-hidden", "true");

        heatmap.appendChild(day);
    }
}

flashcards.forEach((card) => {
    const dailyReviews = card.scheduling?.dailyReviews || {};

    Object.entries(dailyReviews).forEach(([date, count]) => {
        if (!dailyProgress[date]) {
            dailyProgress[date] = {
                reviews: 0,
                correct: 0,
                incorrect: 0
            };
        }

        dailyProgress[date].reviews += count;
        const dailyResults = card.scheduling?.dailyResults || {};
const resultsForDate = dailyResults[date];

if (resultsForDate) {
    dailyProgress[date].correct += resultsForDate.correct || 0;
    dailyProgress[date].incorrect += resultsForDate.incorrect || 0;
}
    });
    
    

});   
const dailyProgressBody = document.querySelector(
    "#stats-daily-progress-body"
);

if (dailyProgressBody) {
    dailyProgressBody.replaceChildren();

    const sortedDates = Object.keys(dailyProgress).sort().reverse();

    if (sortedDates.length === 0) {
        const row = document.createElement("tr");
        const cell = document.createElement("td");

        cell.colSpan = 3;
        cell.textContent = "No study activity recorded yet.";

        row.appendChild(cell);
        dailyProgressBody.appendChild(row);
    } else {
        sortedDates.forEach((date) => {
            const row = document.createElement("tr");

            const dateCell = document.createElement("td");
            dateCell.textContent = date;

            const reviewsCell = document.createElement("td");
            reviewsCell.textContent = dailyProgress[date].reviews;

            const accuracyCell = document.createElement("td");
           const dailyCorrect = dailyProgress[date].correct;
const dailyIncorrect = dailyProgress[date].incorrect;
const totalDailyRated = dailyCorrect + dailyIncorrect;

const dailyAccuracy = totalDailyRated > 0
    ? Math.round((dailyCorrect / totalDailyRated) * 100)
    : 0;

accuracyCell.textContent = `${dailyAccuracy}%`;

            row.append(dateCell, reviewsCell, accuracyCell);
            dailyProgressBody.appendChild(row);
        });
    }
}

const reviewsChart = document.querySelector("#stats-reviews-chart");

if (reviewsChart) {
    reviewsChart.replaceChildren();

    const dates = Object.keys(dailyProgress).sort().slice(-7);

    if (dates.length === 0) {
        const message = document.createElement("p");
        message.textContent = "No review activity yet.";
        message.setAttribute("role", "status");
        reviewsChart.appendChild(message);
    } else {
        const maxReviews = Math.max(
            ...dates.map((date) => dailyProgress[date].reviews),
            1
        );

        dates.forEach((date) => {
            const count = dailyProgress[date].reviews;
            const bar = document.createElement("div");

            bar.classList.add("stats-reviews-chart__bar");
            bar.style.height = `${Math.max((count / maxReviews) * 160, 4)}px`;
            bar.title = `${date}: ${count} reviews`;
            
            const dateLabel = document.createElement("span");
dateLabel.textContent = `${date.slice(5)} (${count})`;
dateLabel.classList.add("stats-reviews-chart__date");

const barGroup = document.createElement("div");
barGroup.classList.add("stats-reviews-chart__item");
barGroup.append(bar, dateLabel);
reviewsChart.appendChild(barGroup);
bar.setAttribute("role", "img");
bar.setAttribute("aria-label", `${date}: ${count} reviews`);
        });
    }
}

const accuracyChart = document.querySelector("#stats-accuracy-chart");

           

if (accuracyChart) {
    accuracyChart.replaceChildren();

    const dates = Object.keys(dailyProgress)
        .filter((date) => {
            const day = dailyProgress[date];
            return day.correct + day.incorrect > 0;
        })
        .sort()
        .slice(-7);

    if (dates.length === 0) {
        const message = document.createElement("p");
        message.textContent = "No accuracy history yet.";
        message.setAttribute("role", "status");
        accuracyChart.appendChild(message);
    } else {
        const svgNS = "http://www.w3.org/2000/svg";
        const width = 600;
        const height = 180;
        const padding = 30;

        const svg = document.createElementNS(svgNS, "svg");
        svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
        svg.setAttribute("class", "stats-accuracy-chart__line");
        svg.setAttribute("width", "100%");
        svg.setAttribute("height", "160");
        svg.setAttribute("role", "img");
        svg.setAttribute(
            "aria-label",
            "Accuracy trend for the last seven study days"
        );

        const points = dates.map((date, index) => {
            const day = dailyProgress[date];
            const total = day.correct + day.incorrect;
            const accuracy = Math.round((day.correct / total) * 100);

            const x = dates.length === 1
                ? width / 2
                : padding + index * (width - padding * 2) / (dates.length - 1);

            const y = height - padding -
                (accuracy / 100) * (height - padding * 2);

            return { date, accuracy, x, y };
        });

       const line = document.createElementNS(svgNS, "polyline");

line.setAttribute(
    "points",
    points.map((point) => `${point.x},${point.y}`).join(" ")
);

line.setAttribute("fill", "none");
line.setAttribute("stroke", "#2a269b");
line.setAttribute("stroke-width", "3");
line.setAttribute("stroke-linecap", "round");
line.setAttribute("stroke-linejoin", "round");

svg.appendChild(line);
if (points.length === 1) {
    const point = points[0];
    const singlePointLine = document.createElementNS(svgNS, "line");

    singlePointLine.setAttribute("x1", padding);
    singlePointLine.setAttribute("y1", point.y);
    singlePointLine.setAttribute("x2", width - padding);
    singlePointLine.setAttribute("y2", point.y);
    singlePointLine.setAttribute("stroke", "#26399b");
    singlePointLine.setAttribute("stroke-width", "3");
    singlePointLine.setAttribute("stroke-linecap", "round");

    svg.appendChild(singlePointLine);
}

        points.forEach((point) => {
            const circle = document.createElementNS(svgNS, "circle");
            circle.setAttribute("cx", point.x);
            circle.setAttribute("cy", point.y);
            circle.setAttribute("r", "5");
            circle.setAttribute("fill", "currentColor");

            const title = document.createElementNS(svgNS, "title");
            title.textContent = `${point.date}: ${point.accuracy}% accuracy`;
            circle.appendChild(title);
            svg.appendChild(circle);
        });

        accuracyChart.appendChild(svg);

        const labels = document.createElement("div");
        labels.classList.add("stats-accuracy-chart__labels");

        points.forEach((point) => {
            const label = document.createElement("span");
            label.textContent =
                `${point.date.slice(5)} · ${point.accuracy}%`;
            labels.appendChild(label);
        });

        accuracyChart.appendChild(labels);
    }
}


    document.querySelector("#stats-total-flashcards").textContent = totalFlashcards;
    document.querySelector("#stats-cards-reviewed").textContent = totalReviews;
    document.querySelector("#stats-cards-mastered").textContent = masteredCards;
    document.querySelector("#stats-accuracy-text").textContent =
        `Current accuracy: ${accuracy}%`;
    document.querySelector("#study-accuracy").value = accuracy;
}

function scheduleNextReview(card, knowsAnswer) {
    if (!card.scheduling) {
        card.scheduling = {
            box: 1,
            nextReview: null,
            reviews: 0
        };
    }

    card.scheduling.reviews++;
    const today = new Date().toISOString().slice(0, 10);

if (!card.scheduling.dailyReviews) {
    card.scheduling.dailyReviews = {};
}

card.scheduling.dailyReviews[today] =
    (card.scheduling.dailyReviews[today] || 0) + 1;
    if (card.scheduling.correctReviews === undefined) {
    card.scheduling.correctReviews = 0;
}

if (card.scheduling.incorrectReviews === undefined) {
    card.scheduling.incorrectReviews = 0;
}

if (knowsAnswer) {
    card.scheduling.correctReviews++;
} else {
    card.scheduling.incorrectReviews++;
}
const reviewDate = new Date().toISOString().slice(0, 10);
if (!card.scheduling.dailyResults) {
    card.scheduling.dailyResults = {};
}
if (!card.scheduling.dailyResults[reviewDate]) {
    card.scheduling.dailyResults[reviewDate] = {
        correct: 0,
        incorrect: 0
    };
}

if (knowsAnswer) {
    card.scheduling.dailyResults[reviewDate].correct++;
} else {
    card.scheduling.dailyResults[reviewDate].incorrect++;
}

    if (knowsAnswer) {
        card.scheduling.box = Math.min(
            card.scheduling.box + 1,
            5
        );
    } else {
        card.scheduling.box = 1;
    }
const leitnerIntervals = [1, 2, 4, 8, 16];

const daysToWait = leitnerIntervals[
    card.scheduling.box - 1
];

    const nextReview = new Date();
    nextReview.setDate(
        nextReview.getDate() + daysToWait
    );

    card.scheduling.nextReview =
        nextReview.toISOString().split("T")[0];

    saveFlashcards();
}

function updateStudyProgress() {
    
    previousStudyState = {
        reviewedCards: reviewedCards,
        studyIndex: currentStudyIndex,
        question: studyQuestion.textContent,
        answer: studyAnswer.textContent,
        isFlipped: studyFlashcard.classList.contains("is-flipped")
    };

    reviewedCards++;

    sessionProgress.value = reviewedCards;
   const totalStudyCards = getTotalStudyCards();
sessionProgress.max = totalStudyCards;

sessionProgressText.textContent =
    `${reviewedCards} out of ${totalStudyCards} cards reviewed`;

    undoActionButton.disabled = false;

   if (reviewedCards >= getTotalStudyCards()) {
        knowAnswerButton.disabled = true;
        reviewAnswerButton.disabled = true;
        sessionProgressText.textContent = "Study session completed!";
    } else {
        showNextStudyCard();
    }
    updateStatsDashboard();
}
knowAnswerButton.addEventListener("click", function () {
    if (currentStudyCard) {
        currentStudyCard.status = "learning";
        scheduleNextReview(currentStudyCard, true);
    }

    updateStudyProgress();
});

reviewAnswerButton.addEventListener("click", function () {
    if (currentStudyCard) {
        currentStudyCard.status = "new";
        scheduleNextReview(currentStudyCard, false);
    }

    updateStudyProgress();
});


function undoLastStudyAction() {
    if (previousStudyState === null) {
        return;
    }

    reviewedCards = previousStudyState.reviewedCards;
    currentStudyIndex = previousStudyState.studyIndex;

    studyQuestion.textContent = previousStudyState.question;
    studyAnswer.textContent = previousStudyState.answer;

    studyFlashcard.classList.toggle(
        "is-flipped",
        previousStudyState.isFlipped
    );

    sessionProgress.value = reviewedCards;
    sessionProgressText.textContent =
        `${reviewedCards} out of ${totalStudyCards} cards reviewed`;

    knowAnswerButton.disabled = false;
    reviewAnswerButton.disabled = false;
    undoActionButton.disabled = true;

    previousStudyState = null;
}

undoActionButton.addEventListener("click", undoLastStudyAction);


const studyTimer = document.querySelector(".study-session__timer time");

let studyStartTime = null;
let studyTimerInterval = null;

function startStudyTimer() {
    if (studyTimerInterval !== null) {
        clearInterval(studyTimerInterval);
    }

    studyStartTime = Date.now();

    studyTimerInterval = setInterval(function () {
        const elapsedSeconds = Math.floor(
            (Date.now() - studyStartTime) / 1000
        );

        const minutes = String(
            Math.floor(elapsedSeconds / 60)
        ).padStart(2, "0");

        const seconds = String(
            elapsedSeconds % 60
        ).padStart(2, "0");

        studyTimer.textContent = `${minutes}:${seconds}`;
    }, 1000);
}
updateStatsDashboard();

function downloadFile(content, filename, type) {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();

    URL.revokeObjectURL(url);
}

document.querySelector("#export-json")?.addEventListener("click", () => {
    downloadFile(
        JSON.stringify(flashcards, null, 2),
        "recall-flashcards.json",
        "application/json"
    );
});

function escapeCSV(value) {
    const text = String(value ?? "");
    return `"${text.replace(/"/g, '""')}"`;
}

document.querySelector("#export-csv")?.addEventListener("click", () => {
    const columns = ["front", "back", "deckId"];

    const rows = [
        columns.join(","),
        ...flashcards.map(card =>
            columns.map(column => escapeCSV(card[column])).join(",")
        )
    ];

    downloadFile(
        rows.join("\r\n"),
        "recall-flashcards.csv",
        "text/csv;charset=utf-8;"
    );
});

function parseCSV(text) {
    const rows = [];
    let row = [];
    let field = "";
    let insideQuotes = false;

    for (let i = 0; i < text.length; i++) {
        const char = text[i];

        if (char === '"' && insideQuotes && text[i + 1] === '"') {
            field += '"';
            i++;
        } else if (char === '"') {
            insideQuotes = !insideQuotes;
        } else if (char === "," && !insideQuotes) {
            row.push(field);
            field = "";
        } else if ((char === "\n" || char === "\r") && !insideQuotes) {
            if (char === "\r" && text[i + 1] === "\n") i++;

            row.push(field);
            rows.push(row);
            row = [];
            field = "";
        } else {
            field += char;
        }
    }

    if (insideQuotes) {
        throw new Error("CSV contains an unclosed quoted field.");
    }

    if (field.length > 0 || row.length > 0) {
        row.push(field);
        rows.push(row);
    }

    if (rows.length === 0) return [];

    const headers = rows.shift().map(header => header.trim());

    return rows
        .filter(values => values.some(value => value.trim() !== ""))
        .map(values =>
            Object.fromEntries(
                headers.map((header, index) => [
                    header,
                    values[index] ?? ""
                ])
            )
        );
}
document.querySelector("#import-form")?.addEventListener("submit", async (event) => {
    event.preventDefault();

    const fileInput = document.querySelector("#import-file");
    const status = document.querySelector("#import-export-status");
    const file = fileInput.files[0];

    if (!file) {
        status.textContent = "Please select a file.";
        return;
    }

    try {
        const text = await file.text();
        let importedCards;

        if (file.name.toLowerCase().endsWith(".json")) {
            const parsed = JSON.parse(text);

            // Supports both a plain array and versioned JSON.
            importedCards = Array.isArray(parsed) ? parsed : parsed.data;
        } else if (file.name.toLowerCase().endsWith(".csv")) {
            importedCards = parseCSV(text);

            if (importedCards.length > 0) {
                importedCards = importedCards.map((card) => ({
                    ...card,
                    scheduling: {
                        box: 1,
                        nextReview: null,
                        reviews: 0
                    },
                    reviews: 0,
                    correctReviews: 0,
                    incorrectReviews: 0
                }));
            }
        } else {
            throw new Error("Choose a JSON or CSV file.");
        }

        if (!Array.isArray(importedCards)) {
            throw new Error("Invalid file format.");
        }

        const validCards = importedCards.filter(
            card =>
                card &&
                typeof card.front === "string" &&
                typeof card.back === "string" &&
                card.front.trim() &&
                card.back.trim()
        );

        if (validCards.length === 0) {
            throw new Error("No valid flashcards found in the file.");
        }

        const existingIds = new Set(flashcards.map(card => card.id));

        const newCards = validCards.map(card => ({
            ...card,
            id: existingIds.has(card.id) || !card.id
                ? crypto.randomUUID()
                : card.id,
            deckId: card.deckId || "javascript"
        }));

        flashcards.push(...newCards);
        saveFlashcards();
        renderCurrentDeckCards();
        updateStatsDashboard();

        status.textContent = `Imported ${newCards.length} flashcards successfully.`;
        fileInput.value = "";
    } catch (error) {
        status.textContent = `Import failed: ${error.message}`;
    }
});
let syncController = null;

const syncButton = document.querySelector("#sync-button");
const cancelSyncButton = document.querySelector("#cancel-sync-button");
const retrySyncButton = document.querySelector("#retry-sync-button");
const syncStatus = document.querySelector("#sync-status");

async function runSync() {
    if (syncController) return;

    syncController = new AbortController();
    const currentController = syncController;

    syncButton.disabled = true;
    cancelSyncButton.disabled = false;
    retrySyncButton.hidden = true;
    syncStatus.textContent = "Syncing... Please wait.";

    try {
        const result = await syncWithServer(flashcards, {
            signal: currentController.signal
        });

        syncStatus.textContent =
            `${result.message} ${result.syncedCount} flashcards synced.`;

    } catch (error) {
        if (error.name === "AbortError") {
            syncStatus.textContent = "Sync cancelled.";
        } else {
            syncStatus.textContent = `Sync failed: ${error.message}`;
            retrySyncButton.hidden = false;
        }
    } finally {
        if (syncController === currentController) {
            syncController = null;
        }

        syncButton.disabled = false;
        cancelSyncButton.disabled = true;
    }
}

syncButton.addEventListener("click", runSync);
retrySyncButton.addEventListener("click", runSync);

cancelSyncButton.addEventListener("click", () => {
    syncController?.abort();
});

const dailyGoalSlider = document.querySelector("#daily-goal");
const dailyGoalValue = document.querySelector("#daily-goal-value");

if (dailyGoalSlider) {
    const savedDailyGoal = localStorage.getItem("daily-goal");

    if (savedDailyGoal) {
        dailyGoalSlider.value = savedDailyGoal;
    }

    if (dailyGoalValue) {
        dailyGoalValue.textContent = dailyGoalSlider.value;
    }

    dailyGoalSlider.addEventListener("input", () => {
        const selectedGoal = dailyGoalSlider.value;

        if (dailyGoalValue) {
            dailyGoalValue.textContent = selectedGoal;
        }

        localStorage.setItem("daily-goal", selectedGoal);
        updateStatsDashboard();
    });
}


const helpButton = document.querySelector("#open-help");
const helpDialog = document.querySelector("#help-dialog");

helpButton.addEventListener("click", function () {
    helpDialog.showModal();
});

const accentColorInput = document.querySelector("#accent-color");

if (accentColorInput) {
    const savedAccentColor = localStorage.getItem("accent-color");

    if (savedAccentColor) {
        accentColorInput.value = savedAccentColor;

        document.documentElement.style.setProperty(
            "--primary-color",
            savedAccentColor
        );
    }

    accentColorInput.addEventListener("input", function () {
        const selectedColor = accentColorInput.value;

        document.documentElement.style.setProperty(
            "--primary-color",
            selectedColor
        );

        localStorage.setItem("accent-color", selectedColor);
    });
}


const studyReminderInput = document.querySelector("#study-reminder");

if (studyReminderInput) {
    console.log("Reminder input found:", studyReminderInput);
    const savedReminderTime = localStorage.getItem("study-reminder");

    if (savedReminderTime !== null) {
        studyReminderInput.value = savedReminderTime;
    }

    studyReminderInput.addEventListener("input", function () {
        localStorage.setItem(
            "study-reminder",
            studyReminderInput.value
        );
    });
}

window.runCardRenderBenchmark = function () {
    const testCards = Array.from({ length: 5000 }, (_, index) => ({
        id: `performance-test-${index + 1}`,
        deckId: currentDeckId,
        front: `Test Question ${index + 1}`,
        back: `Test Answer ${index + 1}`,
        tags: [],
        status: "new"
    }));

    const originalLength = flashcards.length;
    const oldSearch = searchInput.value;
    const oldTag = tagFilterInput.value;
    const oldStatus = statusFilterInput.value;

    flashcards.push(...testCards);

    searchInput.value = "";
    tagFilterInput.value = "";
    statusFilterInput.value = "all";

    const startTime = performance.now();

    renderCurrentDeckCards();

    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            const endTime = performance.now();
            const elapsedTime = endTime - startTime;

            console.log(
                `AFTER: 5000 test cards rendered in ${elapsedTime.toFixed(2)} ms`
            );

            
            flashcards.splice(originalLength);


            searchInput.value = oldSearch;
            tagFilterInput.value = oldTag;
            statusFilterInput.value = oldStatus;

            
            renderCurrentDeckCards();
        });
    });
};