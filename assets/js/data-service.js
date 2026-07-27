import { SUPABASE_CONFIG } from '../../config/app-config.js';

const STORAGE_KEY = 'fruitNotes';
const TABLE_NAME = 'fruits';

const supabaseUrl = String(SUPABASE_CONFIG.url || '').replace(/\/+$/, '');
const publicKey = String(
  SUPABASE_CONFIG.publishableKey || SUPABASE_CONFIG.anonKey || ''
).trim();

export const isSharedDataEnabled = Boolean(supabaseUrl && publicKey);
export const syncIntervalMs = Math.max(
  2000,
  Number(SUPABASE_CONFIG.syncIntervalMs) || 3000
);

function createLocalId() {
  if (globalThis.crypto?.randomUUID) return crypto.randomUUID();
  return `local-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function normalizeFruit(fruit) {
  return {
    id: fruit.id || createLocalId(),
    name: String(fruit.name || '').trim(),
    price: Number(fruit.price) || 0,
    unit: String(fruit.unit || 'kg'),
    created_at: fruit.created_at || new Date().toISOString(),
    updated_at: fruit.updated_at || fruit.created_at || new Date().toISOString()
  };
}

function loadLocalFruits() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    const fruits = Array.isArray(parsed) ? parsed.map(normalizeFruit) : [];
    saveLocalFruits(fruits);
    return fruits;
  } catch {
    return [];
  }
}

function saveLocalFruits(fruits) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(fruits));
}

async function supabaseRequest(query = '', options = {}) {
  const response = await fetch(
    `${supabaseUrl}/rest/v1/${TABLE_NAME}${query}`,
    {
      ...options,
      headers: {
        apikey: publicKey,
        Accept: 'application/json',
        ...(options.body ? { 'Content-Type': 'application/json' } : {}),
        ...(options.headers || {})
      }
    }
  );

  if (!response.ok) {
    let message = `Supabase trả về lỗi ${response.status}`;
    try {
      const error = await response.json();
      message = error.message || error.hint || message;
    } catch {
      // Giữ thông báo HTTP mặc định nếu response không phải JSON.
    }
    throw new Error(message);
  }

  if (response.status === 204) return null;
  const text = await response.text();
  return text ? JSON.parse(text) : null;
}

export async function fetchFruits() {
  if (!isSharedDataEnabled) return loadLocalFruits();

  const rows = await supabaseRequest(
    '?select=id,name,price,unit,created_at,updated_at&order=created_at.desc'
  );
  return (rows || []).map(normalizeFruit);
}

export async function createFruit(fruit) {
  const payload = {
    name: fruit.name,
    price: Number(fruit.price),
    unit: fruit.unit || 'kg'
  };

  if (!isSharedDataEnabled) {
    const fruits = loadLocalFruits();
    const created = normalizeFruit(payload);
    fruits.unshift(created);
    saveLocalFruits(fruits);
    return created;
  }

  const rows = await supabaseRequest('', {
    method: 'POST',
    headers: { Prefer: 'return=representation' },
    body: JSON.stringify(payload)
  });
  return normalizeFruit(rows[0]);
}

export async function updateFruit(id, fruit) {
  const payload = {
    name: fruit.name,
    price: Number(fruit.price),
    unit: fruit.unit || 'kg'
  };

  if (!isSharedDataEnabled) {
    const fruits = loadLocalFruits();
    const index = fruits.findIndex((item) => item.id === id);
    if (index === -1) throw new Error('Không tìm thấy trái cây cần sửa.');
    fruits[index] = normalizeFruit({
      ...fruits[index],
      ...payload,
      updated_at: new Date().toISOString()
    });
    saveLocalFruits(fruits);
    return fruits[index];
  }

  const rows = await supabaseRequest(`?id=eq.${encodeURIComponent(id)}`, {
    method: 'PATCH',
    headers: { Prefer: 'return=representation' },
    body: JSON.stringify(payload)
  });
  if (!rows?.length) throw new Error('Không tìm thấy trái cây cần sửa.');
  return normalizeFruit(rows[0]);
}

export async function deleteFruit(id) {
  if (!isSharedDataEnabled) {
    const fruits = loadLocalFruits().filter((item) => item.id !== id);
    saveLocalFruits(fruits);
    return;
  }

  await supabaseRequest(`?id=eq.${encodeURIComponent(id)}`, {
    method: 'DELETE'
  });
}

