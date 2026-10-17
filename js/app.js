
import { decks } from "./store.js";
import { getCurrentRoute } from "./router.js";

console.log(getCurrentRoute());

const flashcards = JSON.parse(
    localStorage.getItem("recall-flashcards") || "[]"
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
const flashcardList = document.querySelector("#flashcard-list");


function displayFlashcard(card) {
    const cardElement = document.createElement("article");
    cardElement.className = "flashcard-item";

    const questionElement = document.createElement("h4");
    questionElement.textContent = card.front;

    const answerElement = document.createElement("p");
    answerElement.textContent = card.back;

    cardElement.append(questionElement, answerElement);
    flashcardList.append(cardElement);
}


flashcards.forEach(displayFlashcard);


flashcardForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const question = frontInput.value.trim();
    const answer = backInput.value.trim();

  
    if (!question || !answer) {
        const flashcardMessage = document.querySelector("#flashcard-message");
        flashcardMessage.textContent = "Please enter both a question and an answer.";
        return;
    }


    const newCard = {
        front: question,
        back: answer
    };

   
    flashcards.push(newCard);

    localStorage.setItem(
        "recall-flashcards",
        JSON.stringify(flashcards)
    );

    
    displayFlashcard(newCard);

    
    const cardCount = document.querySelector("#count-javascript");
    cardCount.textContent = flashcardList.children.length;

    
    const flashcardMessage = document.querySelector("#flashcard-message");
    flashcardMessage.textContent = "Flashcard added successfully!";

    
    flashcardForm.reset();
});






