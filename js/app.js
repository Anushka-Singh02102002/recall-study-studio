
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
})

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

function loadStudyCard() {
    const routeParts = getCurrentRoute().split("/");
    const deckId = routeParts[2];

    const deckCards = flashcards.filter(
        (card) => card.deckId === deckId
    );

    if (deckCards.length === 0) {
        studyQuestion.textContent = "No flashcards available.";
        studyAnswer.textContent = "Add some flashcards to start studying.";
        return;
    }

    studyQuestion.textContent = deckCards[0].front;
    studyAnswer.textContent = deckCards[0].back;
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
    // Space: Flip the flashcard
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
}


knowAnswerButton.addEventListener("click", updateStudyProgress);
reviewAnswerButton.addEventListener("click", updateStudyProgress);
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








