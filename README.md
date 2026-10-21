# Recall — My Study Decks

Spaced-Repetition Study Studio

Recall is a study app I built to make revision easier. It uses flashcards and spaced repetition to help users practise topics regularly and remember what they learn. Users can organize their study material, review questions, and keep track of their progress in one place.

## 1. My Variant

For this project, I built Recall — My Study Decks, a flashcard app where users can organize their subjects and revise them at their own pace.

The app comes with three default decks:

- JavaScript
- Python
- Algorithms

Users can also create their own decks, add flashcards, practise questions, and check how much they have studied.

## 2. Features

Here are some of the main things users can do with Recall:

- Create, edit, search, sort, and delete study decks.
- Add flashcards with questions, answers, hints, and tags.
- Search and filter flashcards when looking for a specific topic.
- Start study sessions and practise answering questions.
- Mark an answer as known or choose to review it again.
- Schedule the next review based on the study result.
- Undo the last study action.
- Set a daily study goal and track study streaks.
- Check study statistics, review activity, and accuracy trends.
- Import and export flashcard data.
- Change the accent color and set a study reminder.
- Save study data in the browser using LocalStorage.
- Test the sync feature through a mock server.
- Use keyboard shortcuts during study sessions.

## 3. Technologies Used


 HTML5 :To build the page structure and forms 
 CSS3  : To style the app and make the layout responsive 
 JavaScript : To handle the app's features and user interactions 
 JavaScript ES Modules : To keep the code organized into separate files 
 LocalStorage : To save decks, flashcards, and study data 
 Git and GitHub : To track changes and manage the project 

## 4. Setup Instructions
 What You Need

- A modern web browser
- Git
- Visual Studio Code
- The Live Server extension, or another local HTTP server

### How to Run the Project
You can run Recall on your computer without installing VS Code. You just need a web browser and Python.

Option 1: Using VS Code

1.Download or clone the project from GitHub.

2.Open the project folder in VS Code.

3.Install the Live Server extension.

4.Right-click index.html and select Open with Live Server.

5.The app will open in your default browser.

Option 2: Without VS Code

1.Download the project from GitHub using Code → Download ZIP.

2.xtract the downloaded ZIP file.

3.Open Command Prompt or Terminal.

4.Navigate to the extracted project folder:

cd path/to/Recall

S5.tart a local server:

python -m http.server 8000

If python doesn't work, try python3 -m http.server 8000.

6.Open your browser and visit:

http://localhost:8000

Select index.html if needed to open the app.

To stop the server, press Ctrl + C in the terminal.



## 5. Architecture Diagram

The basic idea behind the app is simple: the user interacts with the page, JavaScript handles the action, and LocalStorage keeps the data saved.
                  USER
                   |
                 HTML and CSS
    |        |          |          |          |        |
Deck        Flashcard   Study     Statistics   Import   Mock 
management   management  scheduler  progress     export   sync
     |               |     |        |           |         |
                        LOCAL STORAGE
                            |
                    Saved study data
                            |
                            Updated interface


### How the App Works

- HTML and CSS: These make up the page layout and its appearance.
- app.js: Handles user actions and connects the different features.
- Deck Management: Manages the study decks, including creating, editing, searching, and deleting them.
- Flashcard Management:Handles flashcards and their study interactions.
- Study Scheduler: Calculates when a card should be reviewed again.
- Statistics and Progress:Shows study activity and progress over time.
- LocalStorage:Keeps the saved data in the browser, even after a page refresh.
- Mock Server Sync:Simulates syncing data without using a real backend.

## 6. Design Decisions
I kept decks, flashcards, settings, and statistics in separate sections so users can find what they need without too much searching.

I added a scheduler that changes the next review date depending on whether the user knows an answer or needs to practise it again. The aim is to make revision more organized.

I used LocalStorage so users don't lose their saved decks and flashcards when they refresh the page. It also means the app can work without a database for now.

I separated different responsibilities into JavaScript modules, such as routing, storage, and scheduling. This makes it easier to find the relevant code when I need to fix something or add a feature.

I used semantic HTML, labelled form fields, a skip-to-main-content link, live status messages, and keyboard shortcuts to make the app easier to use.

I used `performance.now()` to measure how long flashcard rendering takes with a large test dataset. This helped me check performance using actual measurements.

I added form validation and JavaScript checks to reduce invalid input. User-provided text should be added using safe DOM methods such as `textContent`, and imported files should be checked before their data is used.

I tested the scheduling logic and some edge cases using a unit test suite. The scheduler tests currently pass all 15 tests.



Building this project helped me understand how different frontend features work together in a complete application.

## Live Demo

The project is deployed using GitHub Pages. You can open and try the app using the link below.

Live App:Recall — My Study Decks:
   https://anushka-singh02102002.github.io/recall-study-studio/