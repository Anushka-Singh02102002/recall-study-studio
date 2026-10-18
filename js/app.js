
import { decks } from "./store.js";
import { getCurrentRoute } from "./router.js";

console.log(getCurrentRoute());

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

const flashcardForm = document.querySelector("#flashcard-form");
const frontInput = document.querySelector("#flashcard-question");
const backInput = document.querySelector("#flashcard-answer");
const hintInput = document.querySelector("#flashcard-hint");
const tagsInput = document.querySelector("#flashcard-tags");
const fileInput = document.querySelector("#flashcard-file");
const flashcardList = document.querySelector("#flashcard-list");
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

    const currentRoute = getCurrentRoute();
    const routeParts = currentRoute.split("/");
    const currentDeckId = routeParts[2];

    const currentDeckCards = flashcards.filter(
        (card) => card.deckId === currentDeckId
    );

    currentDeckCards.forEach(displayFlashcard);
}
window.addEventListener("deckroutechange", function () {
    renderCurrentDeckCards();
});

renderCurrentDeckCards();


flashcardForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const question = frontInput.value.trim();
    const answer = backInput.value.trim();
    let imageData = "";

const selectedFile = fileInput.files[0];

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






