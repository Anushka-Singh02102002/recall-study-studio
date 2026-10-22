# Security Notes — Recall: My Study Decks

## 1. Overview

Recall is a flashcard-based study application that allows users to create, edit, study, import, and export flashcards.

These notes explain the security measures used in the application and the improvements that can be made to keep user data and the application safer.

## 2. Safe DOM Rendering

- Flashcard questions and answers are displayed using the `textContent` property.
- `textContent` displays user-provided content as plain text instead of interpreting it as HTML.
- DOM elements are created using methods such as `document.createElement()`.
- User-provided content should not be inserted using `innerHTML` or `insertAdjacentHTML`.

These practices help reduce the risk of Cross-Site Scripting (XSS) attacks caused by untrusted content.

## 3. Import File Validation

Recall supports importing flashcards from JSON and CSV files.

The import process performs basic checks, including:

- Checking whether a file has been selected.
- Checking whether the file format is supported.
- Checking whether the imported data has the expected structure.
- Ensuring that flashcards have non-empty questions (`front`) and answers (`back`).

Invalid files or data that do not meet these checks should be rejected with a clear error message.

Further validation should be added for imported field lengths, deck IDs, file sizes, and other unexpected values.

## 4. Safe Error Handling

- Import status and error messages are displayed as text.
- Raw file content and error messages should not be inserted into the page as HTML.
- Users receive feedback when an import fails, helping them understand that the data could not be imported.

## 5. Local Data Storage

Recall uses browser local storage to retain application data and settings.

Since local storage can be accessed by JavaScript running on the same origin:

- Passwords, secret API keys, and other sensitive credentials should not be stored in local storage.
- Stored and imported data should be validated before being used.
- Users should be aware that clearing browser storage may remove their locally saved study data.

## 6. Conclusion

Recall already uses safe DOM text rendering for flashcard content and performs basic validation when importing JSON and CSV files. Additional validation and testing are needed to improve protection against malformed or oversized files and invalid imported data.

These notes document the current safeguards and identify areas for further improvement.