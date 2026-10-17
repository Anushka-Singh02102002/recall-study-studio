import { decks } from "./store.js";
import { getCurrentRoute } from "./router.js";
console.log(getCurrentRoute());

const pageTitle = document.querySelector("h1");
console.log(pageTitle);

const mainContent = document.querySelector("main");
console.log(mainContent);

const navigation = document.querySelector("nav")
console.log("navigation");


const flashcardForm = document.querySelector("#flashcard-form");
const frontInput = document.querySelector("#flashcard-question");
const backInput = document.querySelector("#flashcard-answer");

flashcardForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const question = frontInput.value.trim();
    const answer = backInput.value.trim();

   const newCard = {
    front: question,
    back: answer
};

console.log(newCard);
});






