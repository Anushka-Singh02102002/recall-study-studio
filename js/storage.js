
const STORAGE_KEY = "recall-data";
const LEGACY_KEY = "recall-flashcards";
const CURRENT_VERSION = 1;

export function loadFlashcards() {
    try {
        const savedData = localStorage.getItem(STORAGE_KEY);

        if (savedData) {
            const parsedData = JSON.parse(savedData);

            if (
                parsedData.version === CURRENT_VERSION &&
                Array.isArray(parsedData.flashcards)
            ) {
                return parsedData.flashcards;
            }
        }

        // Support the older array format.
        const legacyData = localStorage.getItem(LEGACY_KEY);
        const oldFlashcards = legacyData ? JSON.parse(legacyData) : [];

        if (!Array.isArray(oldFlashcards)) {
            throw new Error("Saved flashcard data is invalid.");
        }

        saveFlashcards(oldFlashcards);
        return oldFlashcards;
    } catch (error) {
        console.error("Could not load flashcards:", error);
        return [];
    }
}

export function saveFlashcards(flashcards) {
    const data = {
        version: CURRENT_VERSION,
        flashcards: flashcards
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}
