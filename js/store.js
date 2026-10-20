// Default decks are initialized below.
const decks = [
    {
        id: "javascript",
        name: "JavaScript",
        description: "Learn JavaScript concepts and fundamentals."
    },
    {
        id: "python",
        name: "Python",
        description: "Practice Python programming concepts."
    },
    {
        id: "algorithms",
        name: "Algorithms",
        description: "Revise algorithms and problem-solving."
    }
];

const DECKS_STORAGE_KEY = "recall-decks";

export function saveDecks() {
    try {
        localStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decks));
        return true;
    } catch (error) {
        console.error("Could not save decks:", error);
        return false;
    }
}

export function loadDecks() {
    try {
        const savedDecks = localStorage.getItem(DECKS_STORAGE_KEY);

        if (savedDecks) {
            const parsedDecks = JSON.parse(savedDecks);

            if (Array.isArray(parsedDecks)) {
                return parsedDecks;
            }
        }
    } catch (error) {
        console.error("Could not load decks:", error);
    }

    return null;
}
const savedDecks = loadDecks();

if (savedDecks !== null) {
    decks.splice(0, decks.length, ...savedDecks);
}


export { decks };