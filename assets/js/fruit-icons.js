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
  passionfruit: { sheet: 'extra', column: 2, row: 2, grid: 3, label: 'Chanh dây' },
  'banana-su': { sheet: 'detail', column: 0, row: 0, columns: 4, rows: 3, label: 'Chuối sứ' },
  'banana-cau': { sheet: 'detail', column: 1, row: 0, columns: 4, rows: 3, label: 'Chuối cau' },
  'banana-green': { sheet: 'detail', column: 2, row: 0, columns: 4, rows: 3, label: 'Chuối già xanh' },
  'dragon-fruit-red': { sheet: 'detail', column: 3, row: 0, columns: 4, rows: 3, label: 'Thanh long ruột đỏ' },
  'dragon-fruit-white': { sheet: 'detail', column: 0, row: 1, columns: 4, rows: 3, label: 'Thanh long ruột trắng' },
  pear: { sheet: 'detail', column: 1, row: 1, columns: 4, rows: 3, label: 'Lê' },
  sapodilla: { sheet: 'detail', column: 2, row: 1, columns: 4, rows: 3, label: 'Sapo' },
  cantaloupe: { sheet: 'detail', column: 3, row: 1, columns: 4, rows: 3, label: 'Dưa lưới' },
  'custard-apple': { sheet: 'detail', column: 0, row: 2, columns: 4, rows: 3, label: 'Mãng cầu ta' },
  'seedless-watermelon': { sheet: 'detail', column: 1, row: 2, columns: 4, rows: 3, label: 'Dưa hấu không hạt' },
  pomegranate: { sheet: 'detail', column: 2, row: 2, columns: 4, rows: 3, label: 'Lựu' },
  rambutan: { sheet: 'detail', column: 3, row: 2, columns: 4, rows: 3, label: 'Chôm chôm' }
};

// Quy tắc cụ thể phải đứng trước quy tắc chung.
const RULES = [
  { icon: 'jackfruit-box', keywords: ['hộp mít', 'hop mit', 'mít tách múi', 'mit tach mui', 'mít đóng hộp', 'jackfruit box'] },
  { icon: 'banana-su', keywords: ['chuối sứ', 'chuoi su', 'chuối xiêm', 'chuoi xiem', 'pisang awak'] },
  { icon: 'banana-cau', keywords: ['chuối cau', 'chuoi cau'] },
  { icon: 'banana-green', keywords: ['chuối già', 'chuoi gia'] },
  { icon: 'dragon-fruit-red', keywords: ['thanh long ruột đỏ', 'thanh long ruot do', 'thanh long ruột hồng', 'thanh long ruot hong', 'red dragon fruit'] },
  { icon: 'dragon-fruit-white', keywords: ['thanh long ruột trắng', 'thanh long ruot trang', 'white dragon fruit'] },
  { icon: 'seedless-watermelon', keywords: ['dưa hấu không hạt', 'dua hau khong hat', 'seedless watermelon'] },
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
  { icon: 'rambutan', keywords: ['chôm chôm', 'chom chom', 'rambutan'] },
  { icon: 'longan', keywords: ['nhãn', 'nhan', 'longan', 'vải', 'vai thieu', 'lychee'] },
  { icon: 'cherry', keywords: ['cherry', 'anh đào', 'anh dao'] },
  { icon: 'peach', keywords: ['đào', 'dao tien', 'dao vang', 'peach'] },
  { icon: 'plum', keywords: ['mận', 'man hau', 'man an phuoc', 'plum'] },
  { icon: 'cantaloupe', keywords: ['dưa lưới', 'dua luoi', 'dưa gang', 'dua gang', 'cantaloupe', 'melon'] },
  { icon: 'custard-apple', keywords: ['mãng cầu ta', 'mang cau ta', 'mãng cầu dai', 'mang cau dai', 'mãng cầu', 'mang cau', 'quả na', 'qua na', 'na dai', 'sugar apple', 'custard apple'] },
  { icon: 'pomegranate', keywords: ['lựu', 'luu do', 'pomegranate'] },
  { icon: 'sapodilla', keywords: ['sapo', 'sa pô', 'sa po', 'hồng xiêm', 'hong xiem', 'sapodilla'] },
  { icon: 'pear', keywords: ['lê', 'le han quoc', 'pear'] },
  { icon: 'pomelo', keywords: ['bưởi', 'buoi', 'bòng', 'bong', 'pomelo', 'grapefruit'] },
  { icon: 'kiwi', keywords: ['kiwi'] },
  { icon: 'avocado', keywords: ['bơ', 'bo sap', 'bo hass', 'avocado'] },
  { icon: 'strawberry', keywords: ['dâu tây', 'dau tay', 'strawberry', 'việt quất', 'viet quat', 'blueberry', 'raspberry'] },
  { icon: 'grape', keywords: ['nho', 'grape'] },
  { icon: 'mango', keywords: ['xoài', 'xoai', 'mango'] },
  { icon: 'banana', keywords: ['chuối', 'chuoi', 'banana'] },
  { icon: 'orange', keywords: ['cam', 'quýt', 'quyt', 'orange', 'mandarin', 'chanh vàng', 'chanh vang', 'lemon', 'lime'] },
  { icon: 'apple', keywords: ['táo', 'tao', 'apple'] }
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
  const columns = icon.columns || icon.grid;
  const rows = icon.rows || icon.grid;
  return {
    ...icon,
    key,
    x: `${columns === 1 ? 0 : (icon.column * 100) / (columns - 1)}%`,
    y: `${rows === 1 ? 0 : (icon.row * 100) / (rows - 1)}%`,
    sizeX: `${columns * 100}%`,
    sizeY: `${rows * 100}%`
  };
}
