// script.js - Handles adding, displaying, and deleting fruit price notes

// Utility: load notes from localStorage
function loadNotes() {
  const stored = localStorage.getItem('fruitNotes');
  return stored ? JSON.parse(stored) : [];
}

function saveNotes(notes) {
  localStorage.setItem('fruitNotes', JSON.stringify(notes));
}

function createCard(note, index) {
  const card = document.createElement('div');
  card.className = 'note-card';

  const title = document.createElement('h2');
  title.textContent = note.name;
  card.appendChild(title);

  const price = document.createElement('p');
  price.textContent = `Giá: ${new Intl.NumberFormat('vi-VN').format(note.price)} VND`;
  card.appendChild(price);

  const delBtn = document.createElement('button');
  delBtn.className = 'delete-btn';
  delBtn.title = 'Xóa';
  delBtn.innerHTML = '&times;';
  delBtn.onclick = () => deleteNote(index);
  card.appendChild(delBtn);

  return card;
}

function renderNotes() {
  const notesList = document.getElementById('notesList');
  notesList.innerHTML = '';
  const notes = loadNotes();
  notes.forEach((note, i) => {
    notesList.appendChild(createCard(note, i));
  });
}

function addNote() {
  const nameInput = document.getElementById('fruitName');
  const priceInput = document.getElementById('fruitPrice');
  const name = nameInput.value.trim();
  const price = parseInt(priceInput.value, 10);
  if (!name || isNaN(price) || price < 0) {
    alert('Vui lòng nhập tên trái cây và giá hợp lệ');
    return;
  }
  const notes = loadNotes();
  notes.push({ name, price });
  saveNotes(notes);
  nameInput.value = '';
  priceInput.value = '';
  renderNotes();
}

function deleteNote(idx) {
  const notes = loadNotes();
  notes.splice(idx, 1);
  saveNotes(notes);
  renderNotes();
}

// Attach event listeners after DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('addBtn').addEventListener('click', addNote);
  renderNotes();
});
