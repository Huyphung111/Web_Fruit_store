const STORAGE_KEY = 'fruitNotes';

export function loadNotes(defaultNotes = []) {
  const stored = localStorage.getItem(STORAGE_KEY);

  if (stored === null) {
    saveNotes(defaultNotes);
    return defaultNotes;
  }

  try {
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    saveNotes(defaultNotes);
    return defaultNotes;
  }
}

export function saveNotes(notes) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

export function clearNotes() {
  localStorage.removeItem(STORAGE_KEY);
}

