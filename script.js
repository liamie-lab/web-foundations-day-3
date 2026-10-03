let notes = [
    { id: 1, text: "Buy milk and bread", category: "personal" },
    { id: 2, text: "Finish the Day 3 assignment", category: "study" },
    { id: 3, text: "Email the project report", category: "work" },
    { id: 4, text: "Revise JavaScript arrays", category: "study" },
    { id: 5, text: "Call mum", category: "personal" }
];

// 1. Search notes
function searchNotes(word) {
    return notes.filter(note =>
        note.text.toLowerCase().includes(word.toLowerCase())
    );
}

// 2. Find the longest note
function longestNote() {
    if (notes.length === 0) {
        return null;
    }

    let longest = notes[0];

    for (let note of notes) {
        if (note.text.length > longest.text.length) {
            longest = note;
        }
    }

    return longest;
}

// 3. Count notes by category
function countByCategory() {
    let counts = {};

    for (let note of notes) {
        if (counts[note.category]) {
            counts[note.category]++;
        } else {
            counts[note.category] = 1;
        }
    }

    return counts;
}

// 4. Get summary
function getSummary() {
    let counts = countByCategory();
    let total = notes.length;

    let parts = Object.entries(counts).map(([category, count]) => {
        return `${count} ${category}`;
    });

    return `${total} ${total === 1 ? "note" : "notes"}: ${parts.join(", ")}.`;
}

// 5. Check for duplicates
function isDuplicate(text) {
    let cleanedText = text.trim().toLowerCase();

    return notes.some(note =>
        note.text.trim().toLowerCase() === cleanedText
    );
}

// 6. Add a new note
function addNote(text, category) {
    let cleanedText = text.trim();

    if (cleanedText.length < 1 || cleanedText.length > 200) {
        console.log("Note must be between 1 and 200 characters.");
        return false;
    }

    if (isDuplicate(cleanedText)) {
        console.log("Note already exists.");
        return false;
    }

    if (!["personal", "work", "study"].includes(category)) {
        console.log("Category must be personal, work, or study.");
        return false;
    }

    let newNote = {
        id: notes.length + 1,
        text: cleanedText,
        category: category
    };

    notes.push(newNote);

    return true;
}


// TESTS

console.log("Search:", searchNotes("javascript"));
// Expected: [{ id: 4, text: "Revise JavaScript arrays", category: "study" }]

console.log("Search with no results:", searchNotes("football"));
// Expected: []

console.log("Longest note:", longestNote());
// Expected: the note with the most characters

console.log("Longest note with notes:", longestNote());
// Expected: a note object

console.log("Category counts:", countByCategory());
// Expected: { personal: 2, study: 2, work: 1 }

console.log("Summary:", getSummary());
// Expected: 5 notes: 2 personal, 2 study, 1 work.

console.log("Duplicate check:", isDuplicate("  CALL MUM  "));
// Expected: true

console.log("Non-duplicate check:", isDuplicate("Go to the library"));
// Expected: false

console.log("Add valid note:", addNote("Buy a notebook", "personal"));
// Expected: true

console.log("Add duplicate:", addNote("  BUY MILK AND BREAD  ", "personal"));
// Expected: false

console.log("Add invalid category:", addNote("Learn Python", "coding"));
// Expected: false

console.log("Add empty note:", addNote("", "study"));
// Expected: false
