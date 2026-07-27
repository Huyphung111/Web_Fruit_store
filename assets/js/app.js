// app.js - Giao diện bảng giá trái cây
import { loadNotes as loadStoredNotes, saveNotes as saveStoredNotes } from './data-service.js';

// In-memory cache to prevent repeated localStorage & JSON parsing lag
let cachedNotes = null;
const currencyFormatter = new Intl.NumberFormat('vi-VN');

// Fast Utility: get fruit emoji by name
function getFruitEmoji(name) {
  const lowercase = name.toLowerCase();
  if (lowercase.includes('nhãn') || lowercase.includes('longan')) return '🌰';
  if (lowercase.includes('vải') || lowercase.includes('lychee') || lowercase.includes('chôm chôm') || lowercase.includes('rambutan')) return '🔴';
  if (lowercase.includes('táo') || lowercase.includes('apple')) return '🍎';
  if (lowercase.includes('chuối') || lowercase.includes('banana')) return '🍌';
  if (lowercase.includes('cam') || lowercase.includes('quýt') || lowercase.includes('orange')) return '🍊';
  if (lowercase.includes('dưa hấu') || lowercase.includes('watermelon')) return '🍉';
  if (lowercase.includes('xoài') || lowercase.includes('mango')) return '🥭';
  if (lowercase.includes('nho') || lowercase.includes('grape')) return '🍇';
  if (lowercase.includes('dâu') || lowercase.includes('strawberry')) return '🍓';
  if (lowercase.includes('bơ') || lowercase.includes('avocado')) return '🥑';
  if (lowercase.includes('sầu riêng') || lowercase.includes('durian') || lowercase.includes('mít')) return '🍈';
  if (lowercase.includes('dưa lưới') || lowercase.includes('melon')) return '🍈';
  if (lowercase.includes('dứa') || lowercase.includes('thơm') || lowercase.includes('khóm') || lowercase.includes('pineapple')) return '🍍';
  if (lowercase.includes('đào') || lowercase.includes('mận') || lowercase.includes('peach') || lowercase.includes('plum')) return '🍑';
  if (lowercase.includes('lê') || lowercase.includes('pear')) return '🍐';
  if (lowercase.includes('kiwi')) return '🥝';
  if (lowercase.includes('dừa') || lowercase.includes('coconut')) return '🥥';
  if (lowercase.includes('anh đào') || lowercase.includes('cherry')) return '🍒';
  if (lowercase.includes('việt quất') || lowercase.includes('măng cụt') || lowercase.includes('blueberry')) return '🫐';
  if (lowercase.includes('thanh long') || lowercase.includes('dragon')) return '🐲';
  if (lowercase.includes('chanh') || lowercase.includes('lemon') || lowercase.includes('lime')) return '🍋';
  if (lowercase.includes('đu đủ') || lowercase.includes('papaya')) return '🥭';
  if (lowercase.includes('bưởi') || lowercase.includes('pomelo') || lowercase.includes('ổi') || lowercase.includes('mãng cầu')) return '🍏';
  if (lowercase.includes('cà chua') || lowercase.includes('tomato')) return '🍅';
  if (lowercase.includes('bắp') || lowercase.includes('ngô') || lowercase.includes('corn')) return '🌽';
  return '🍎';
}

function loadNotes() {
  if (cachedNotes !== null) return cachedNotes;
  cachedNotes = loadStoredNotes();
  return cachedNotes;
}

function saveNotes(notes) {
  cachedNotes = notes;
  saveStoredNotes(notes);
}

function updateStats(notes) {
  const totalCountEl = document.getElementById('statTotalCount');
  const avgPriceEl = document.getElementById('statAvgPrice');
  const maxPriceEl = document.getElementById('statMaxPrice');

  if (!totalCountEl || !avgPriceEl || !maxPriceEl) return;

  if (!notes || notes.length === 0) {
    totalCountEl.textContent = '0';
    avgPriceEl.textContent = '0 VNĐ';
    maxPriceEl.textContent = '0 VNĐ';
    return;
  }

  const total = notes.length;
  const sum = notes.reduce((acc, item) => acc + (Number(item.price) || 0), 0);
  const avg = Math.round(sum / total);
  const max = Math.max(...notes.map(item => Number(item.price) || 0));

  totalCountEl.textContent = `${total} loại`;
  avgPriceEl.textContent = `${currencyFormatter.format(avg)} VNĐ`;
  maxPriceEl.textContent = `${currencyFormatter.format(max)} VNĐ`;
}

function createFruitCard(note, index) {
  const card = document.createElement('div');
  card.className = 'fruit-card';

  const emoji = getFruitEmoji(note.name);
  const unit = note.unit || 'kg';
  const priceFormatted = currencyFormatter.format(note.price);

  card.innerHTML = `
    <div class="card-top">
      <div class="fruit-emoji-avatar">${emoji}</div>
      <div class="fruit-info">
        <h3 class="fruit-name" title="${escapeHtml(note.name)}">${escapeHtml(note.name)}</h3>
        <span class="unit-badge">ĐVT: ${escapeHtml(unit)}</span>
      </div>
    </div>
    <div class="card-bottom">
      <div>
        <span class="price-tag">${priceFormatted}</span>
        <span class="price-currency">VNĐ / ${escapeHtml(unit)}</span>
      </div>
      <div class="card-actions">
        <button class="edit-btn" onclick="editNote(${index})" title="Chỉnh sửa trái cây này">✎</button>
        <button class="delete-btn" onclick="deleteNote(${index})" title="Xóa trái cây này">✕</button>
      </div>
    </div>
  `;

  return card;
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

let isRenderingScheduled = false;

function renderNotes() {
  const notesList = document.getElementById('notesList');
  const searchInput = document.getElementById('searchInput');
  const sortSelect = document.getElementById('sortSelect');

  if (!notesList) return;

  const keyword = searchInput ? searchInput.value.toLowerCase().trim() : '';
  const sortMode = sortSelect ? sortSelect.value : 'price-asc';

  const notes = loadNotes();
  updateStats(notes);

  let filteredNotes = notes.map((note, originalIndex) => ({ ...note, originalIndex }))
                           .filter(note => note.name.toLowerCase().includes(keyword));

  // Fast Sort
  if (sortMode === 'price-asc') {
    filteredNotes.sort((a, b) => Number(a.price) - Number(b.price));
  } else if (sortMode === 'price-desc') {
    filteredNotes.sort((a, b) => Number(b.price) - Number(a.price));
  } else if (sortMode === 'name-asc') {
    filteredNotes.sort((a, b) => a.name.localeCompare(b.name, 'vi'));
  }

  // Batch DOM manipulation using DocumentFragment (0 reflow lag)
  notesList.innerHTML = '';

  if (filteredNotes.length === 0) {
    notesList.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">🧺</div>
        <p>${keyword ? 'Không tìm thấy trái cây nào phù hợp từ khóa' : 'Chưa có trái cây nào trong danh sách'}</p>
      </div>
    `;
    return;
  }

  const fragment = document.createDocumentFragment();
  filteredNotes.forEach((note) => {
    fragment.appendChild(createFruitCard(note, note.originalIndex));
  });
  notesList.appendChild(fragment);
}

function scheduleRender() {
  if (isRenderingScheduled) return;
  isRenderingScheduled = true;
  requestAnimationFrame(() => {
    renderNotes();
    isRenderingScheduled = false;
  });
}

let editingIndex = null;

function openModal() {
  editingIndex = null;
  document.getElementById('modalTitle').textContent = '➕ Thêm Trái Cây Mới';
  document.getElementById('addBtn').textContent = 'Thêm Vào Lưới';
  const modal = document.getElementById('addModal');
  if (modal) {
    modal.classList.add('active');
    const fruitName = document.getElementById('fruitName');
    if (fruitName) fruitName.focus();
  }
}

function closeModal() {
  const modal = document.getElementById('addModal');
  if (modal) {
    modal.classList.remove('active');
    const form = document.getElementById('addForm');
    if (form) form.reset();
    editingIndex = null;
  }
}

function editNote(idx) {
  const notes = loadNotes();
  const note = notes[idx];
  if (!note) return;

  editingIndex = idx;
  document.getElementById('modalTitle').textContent = '✎ Chỉnh Sửa Trái Cây';
  document.getElementById('addBtn').textContent = 'Lưu Thay Đổi';
  document.getElementById('fruitName').value = note.name;
  document.getElementById('fruitPrice').value = note.price;
  document.getElementById('fruitUnit').value = note.unit || 'kg';
  document.getElementById('addModal').classList.add('active');
  document.getElementById('fruitName').focus();
}

function addNote() {
  const nameInput = document.getElementById('fruitName');
  const priceInput = document.getElementById('fruitPrice');
  const unitSelect = document.getElementById('fruitUnit');

  const name = nameInput.value.trim();
  const price = parseInt(priceInput.value, 10);
  const unit = unitSelect ? unitSelect.value : 'kg';

  if (!name || isNaN(price) || price < 0) {
    alert('Vui lòng nhập tên trái cây và giá hợp lệ!');
    return;
  }

  const notes = loadNotes();
  if (editingIndex === null) {
    notes.unshift({ name, price, unit });
  } else if (notes[editingIndex]) {
    notes[editingIndex] = { ...notes[editingIndex], name, price, unit };
  }
  saveNotes(notes);

  renderNotes();
  closeModal();
}

function deleteNote(idx) {
  const notes = loadNotes();
  if (idx >= 0 && idx < notes.length) {
    notes.splice(idx, 1);
    saveNotes(notes);
    renderNotes();
  }
}

// Giữ tương thích với nút xóa đang dùng inline onclick trong card.
window.deleteNote = deleteNote;
window.editNote = editNote;

document.addEventListener('DOMContentLoaded', () => {
  const addForm = document.getElementById('addForm');
  if (addForm) {
    addForm.addEventListener('submit', (e) => {
      e.preventDefault();
      addNote();
    });
  }

  const openModalBtn = document.getElementById('openModalBtn');
  if (openModalBtn) {
    openModalBtn.addEventListener('click', openModal);
  }

  const closeModalBtn = document.getElementById('closeModalBtn');
  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
  }

  const cancelModalBtn = document.getElementById('cancelModalBtn');
  if (cancelModalBtn) {
    cancelModalBtn.addEventListener('click', closeModal);
  }

  const addModal = document.getElementById('addModal');
  if (addModal) {
    addModal.addEventListener('click', (e) => {
      if (e.target === addModal) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', scheduleRender);
  }

  const sortSelect = document.getElementById('sortSelect');
  if (sortSelect) {
    sortSelect.addEventListener('change', renderNotes);
  }

  renderNotes();
});
