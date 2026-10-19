
import { decks } from "./store.js";
import { getCurrentRoute } from "./router.js";
import { starterFlashcards } from "./data.js";

console.log(getCurrentRoute());
const savedCards = JSON.parse(
    localStorage.getItem("recall-flashcards") || "[]"
);

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

localStorage.setItem(
    "recall-flashcards",
    JSON.stringify(savedCards)
);

const flashcards = JSON.parse(
    localStorage.getItem("recall-flashcards") || "[]"
);

flashcards.forEach((card) => {
    if (!card.deckId) {
        card.deckId = "javascript";
    }
});

localStorage.setItem(
    "recall-flashcards",
    JSON.stringify(flashcards)
);

const pageTitle = document.querySelector("h1");
console.log(pageTitle);

const mainContent = document.querySelector("main");
console.log(mainContent);

const navigation = document.querySelector("nav");
console.log(navigation);
const deckList = document.querySelector(".deck-list");
const deckSortInput = document.querySelector("#deck-sort");
const deckSearchInput = document.querySelector("#deck-search");
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
deleteButton.textContent = "Delete";
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

    localStorage.setItem(
        "recall-flashcards",
        JSON.stringify(flashcards)
    );

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

    localStorage.setItem(
        "recall-flashcards",
        JSON.stringify(flashcards)
    );

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
const totalStudyCards = flashcards.filter(
    (card) =>
        card.deckId === getCurrentRoute().split("/")[2]
).length;


let previousStudyState = null;
function saveFlashcards() {
    localStorage.setItem(
        "recall-flashcards",
        JSON.stringify(flashcards)
    );
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

const todayReviews = flashcards.reduce((total, card) => {
    return total + (card.scheduling?.dailyReviews?.[today] || 0);
}, 0);

const todayProgress = document.querySelector("#stats-today-progress");

if (todayProgress) {
    todayProgress.textContent = `${todayReviews} cards reviewed today`;
    todayProgress.setAttribute(
        "aria-label",
        `Today's study progress: ${todayReviews} cards reviewed`
    );
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

});    

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
    sessionProgressText.textContent =
        `${reviewedCards} out of ${totalStudyCards} cards reviewed`;

    undoActionButton.disabled = false;

    if (reviewedCards >= totalStudyCards) {
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







