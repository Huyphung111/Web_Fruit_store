const ICONS = {
  apple: { sheet: 'main', column: 0, row: 0, grid: 4, label: 'Táo' },
  orange: { sheet: 'main', column: 1, row: 0, grid: 4, label: 'Cam và họ citrus' },
  banana: { sheet: 'main', column: 2, row: 0, grid: 4, label: 'Chuối' },
  mango: { sheet: 'main', column: 3, row: 0, grid: 4, label: 'Xoài' },
  grape: { sheet: 'main', column: 0, row: 1, grid: 4, label: 'Nho' },
  watermelon: { sheet: 'main', column: 1, row: 1, grid: 4, label: 'Dưa hấu' },
  strawberry: { sheet: 'main', column: 2, row: 1, grid: 4, label: 'Dâu tây' },
  avocado: { sheet: 'main', column: 3, row: 1, grid: 4, label: 'Bơ' },
  durian: { sheet: 'main', column: 0, row: 2, grid: 4, label: 'Sầu riêng' },
  coconut: { sheet: 'main', column: 1, row: 2, grid: 4, label: 'Dừa' },
  'dragon-fruit': { sheet: 'main', column: 2, row: 2, grid: 4, label: 'Thanh long' },
  pineapple: { sheet: 'main', column: 3, row: 2, grid: 4, label: 'Thơm' },
  kiwi: { sheet: 'main', column: 0, row: 3, grid: 4, label: 'Kiwi' },
  cherry: { sheet: 'main', column: 1, row: 3, grid: 4, label: 'Cherry' },
  pomelo: { sheet: 'main', column: 2, row: 3, grid: 4, label: 'Bưởi' },
  mangosteen: { sheet: 'main', column: 3, row: 3, grid: 4, label: 'Măng cụt' },
  'guava-pink': { sheet: 'extra', column: 0, row: 0, grid: 3, label: 'Ổi ruột đỏ' },
  'guava-white': { sheet: 'extra', column: 1, row: 0, grid: 3, label: 'Ổi ruột trắng' },
  longan: { sheet: 'extra', column: 2, row: 0, grid: 3, label: 'Nhãn' },
  peach: { sheet: 'extra', column: 0, row: 1, grid: 3, label: 'Đào' },
  jackfruit: { sheet: 'extra', column: 1, row: 1, grid: 3, label: 'Mít' },
  'jackfruit-box': { sheet: 'extra', column: 2, row: 1, grid: 3, label: 'Hộp mít' },
  papaya: { sheet: 'extra', column: 0, row: 2, grid: 3, label: 'Đu đủ' },
  plum: { sheet: 'extra', column: 1, row: 2, grid: 3, label: 'Mận' },
  passionfruit: { sheet: 'extra', column: 2, row: 2, grid: 3, label: 'Chanh dây' }
};

// Quy tắc cụ thể phải đứng trước quy tắc chung.
const RULES = [
  { icon: 'jackfruit-box', keywords: ['hộp mít', 'hop mit', 'mít tách múi', 'mit tach mui', 'mít đóng hộp', 'jackfruit box'] },
  { icon: 'guava-pink', keywords: ['ổi ruột đỏ', 'oi ruot do', 'ổi ruột hồng', 'oi ruot hong', 'ổi hồng', 'pink guava', 'red guava'] },
  { icon: 'guava-white', keywords: ['ổi ruột trắng', 'oi ruot trang', 'ổi trắng', 'oi trang', 'white guava', 'ổi', 'guava'] },
  { icon: 'passionfruit', keywords: ['chanh dây', 'chanh day', 'chanh leo', 'passion fruit', 'passionfruit'] },
  { icon: 'dragon-fruit', keywords: ['thanh long', 'dragon fruit', 'dragonfruit'] },
  { icon: 'watermelon', keywords: ['dưa hấu', 'dua hau', 'watermelon'] },
  { icon: 'durian', keywords: ['sầu riêng', 'sau rieng', 'durian'] },
  { icon: 'mangosteen', keywords: ['măng cụt', 'mang cut', 'mangosteen'] },
  { icon: 'coconut', keywords: ['dừa', 'dừa xiêm', 'dua xiem', 'dừa sáp', 'dua sap', 'coconut'] },
  { icon: 'pineapple', keywords: ['dứa', 'thơm', 'thom', 'khóm', 'khom', 'pineapple'] },
  { icon: 'jackfruit', keywords: ['mít', 'mit', 'jackfruit'] },
  { icon: 'papaya', keywords: ['đu đủ', 'du du', 'papaya'] },
  { icon: 'longan', keywords: ['nhãn', 'nhan', 'longan', 'vải', 'vai thieu', 'lychee', 'chôm chôm', 'chom chom', 'rambutan'] },
  { icon: 'cherry', keywords: ['cherry', 'anh đào', 'anh dao'] },
  { icon: 'peach', keywords: ['đào', 'dao tien', 'dao vang', 'peach'] },
  { icon: 'plum', keywords: ['mận', 'man hau', 'man an phuoc', 'plum'] },
  { icon: 'pomelo', keywords: ['bưởi', 'buoi', 'pomelo', 'grapefruit'] },
  { icon: 'kiwi', keywords: ['kiwi'] },
  { icon: 'avocado', keywords: ['bơ', 'bo sap', 'bo hass', 'avocado'] },
  { icon: 'strawberry', keywords: ['dâu tây', 'dau tay', 'strawberry', 'việt quất', 'viet quat', 'blueberry', 'raspberry'] },
  { icon: 'grape', keywords: ['nho', 'grape'] },
  { icon: 'mango', keywords: ['xoài', 'xoai', 'mango'] },
  { icon: 'banana', keywords: ['chuối', 'chuoi', 'banana'] },
  { icon: 'orange', keywords: ['cam', 'quýt', 'quyt', 'orange', 'mandarin', 'chanh vàng', 'chanh vang', 'lemon', 'lime'] },
  { icon: 'apple', keywords: ['táo', 'tao', 'apple', 'lê', 'le han quoc', 'pear'] }
];

function cleanPhrase(value) {
  return String(value)
    .toLocaleLowerCase('vi')
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .trim()
    .replace(/\s+/g, ' ');
}

function foldVietnamese(value) {
  return cleanPhrase(value)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd');
}

function containsPhrase(text, phrase) {
  return ` ${text} `.includes(` ${phrase} `);
}

function matchesKeyword(originalName, foldedName, keyword) {
  const originalKeyword = cleanPhrase(keyword);
  const keywordHasDiacritics = originalKeyword !== foldVietnamese(originalKeyword);
  return keywordHasDiacritics
    ? containsPhrase(originalName, originalKeyword)
    : containsPhrase(foldedName, originalKeyword);
}

export function getFruitIconKey(name) {
  const originalName = cleanPhrase(name);
  const foldedName = foldVietnamese(name);
  const rule = RULES.find(({ keywords }) =>
    keywords.some((keyword) => matchesKeyword(originalName, foldedName, keyword))
  );
  return rule?.icon || 'apple';
}

export function getFruitIcon(name) {
  const key = getFruitIconKey(name);
  const icon = ICONS[key];
  const divisor = icon.grid - 1;
  return {
    ...icon,
    key,
    x: `${(icon.column * 100) / divisor}%`,
    y: `${(icon.row * 100) / divisor}%`,
    size: `${icon.grid * 100}%`
  };
}
