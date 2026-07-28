import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { getFruitIcon, getFruitIconKey } from '../assets/js/fruit-icons.js';

export const CASES_BY_ICON = {
  apple: ['Táo Fuji Mỹ', 'Táo Envy New Zealand', 'Apple Gala'],
  orange: ['Cam Sành Vĩnh Long', 'Quýt Đường', 'Orange Navel', 'Chanh Vàng Mỹ', 'Mandarin Úc'],
  banana: ['Chuối Laba Đà Lạt', 'Chuối Tiêu Hồng', 'Banana Cavendish', 'Chuối Ngự'],
  'banana-su': ['Chuối Sứ', 'Chuoi Su Chín', 'Chuối Xiêm', 'Pisang Awak'],
  'banana-cau': ['Chuối Cau', 'Chuoi Cau Miền Tây'],
  'banana-green': ['Chuối Già Xanh', 'Chuoi Gia Nam Mỹ'],
  mango: ['Xoài Cát Hòa Lộc', 'Xoài Tượng', 'Mango Keo', 'Xoai Uc', 'Xoài Thái'],
  grape: ['Nho Mẫu Đơn', 'Nho Đen Không Hạt', 'Grape Red Globe', 'Nho Xanh', 'Grape Shine Muscat'],
  watermelon: ['Dưa Hấu Vàng', 'Watermelon Sugar Baby', 'Dua Hau Long An', 'Dưa Hấu Mini'],
  'seedless-watermelon': ['Dưa Hấu Không Hạt', 'Dua Hau Khong Hat Long An', 'Seedless Watermelon'],
  strawberry: ['Dâu Tây Đà Lạt', 'Strawberry Hàn Quốc', 'Việt Quất Nhập Khẩu', 'Blueberry Mỹ', 'Raspberry Đỏ'],
  avocado: ['Bơ Sáp Đắk Lắk', 'Bơ 034', 'Bo Hass', 'Avocado Úc', 'Bơ Booth'],
  durian: ['Sầu Riêng Ri6', 'Sầu Riêng Monthong', 'Sau Rieng Musang King', 'Durian Thái', 'Sầu Riêng Khổ Qua'],
  coconut: ['Dừa Xiêm Bến Tre', 'Dừa Sáp Cầu Kè', 'Dua Xiem Xanh', 'Coconut Non', 'Dừa Dứa'],
  'dragon-fruit': ['Thanh Long Vàng', 'Dragon Fruit Pink', 'Dragonfruit Bình Thuận'],
  'dragon-fruit-red': ['Thanh Long Ruột Đỏ', 'Thanh Long Ruột Hồng', 'Red Dragon Fruit'],
  'dragon-fruit-white': ['Thanh Long Ruột Trắng', 'White Dragon Fruit'],
  pineapple: ['Thơm Mật Đắk Nông', 'Dứa Queen', 'Khóm Cầu Đúc', 'Pineapple MD2', 'Thom Mat'],
  kiwi: ['Kiwi Xanh', 'Kiwi Vàng', 'Kiwi Đỏ', 'Kiwi New Zealand', 'Kiwi Gold'],
  cherry: ['Cherry Đỏ Mỹ', 'Cherry Vàng Rainier', 'Anh Đào Úc', 'Cherry Chile', 'Anh Dao Nhật'],
  pomelo: ['Bưởi Da Xanh', 'Bưởi Năm Roi', 'Buoi Dien', 'Pomelo Thái', 'Grapefruit Hồng'],
  mangosteen: ['Măng Cụt Bến Tre', 'Măng Cụt Lái Thiêu', 'Mang Cut Thai', 'Mangosteen Indonesia', 'Măng Cụt Tím'],
  'guava-pink': ['Ổi Ruột Đỏ', 'Ổi Ruột Hồng', 'Oi Ruot Do', 'Pink Guava', 'Red Guava Tiền Giang'],
  'guava-white': ['Ổi Ruột Trắng', 'Ổi Trắng', 'Oi Ruot Trang', 'White Guava', 'Ổi Nữ Hoàng'],
  longan: ['Nhãn Lồng Hưng Yên', 'Nhãn Xuồng Cơm Vàng', 'Longan Thái', 'Vải Thiều Bắc Giang'],
  rambutan: ['Chôm Chôm Java', 'Chom Chom Nhãn', 'Rambutan Thái'],
  peach: ['Đào Tiên Sa Pa', 'Đào Vàng', 'Dao Tien', 'Peach Hàn Quốc', 'Dao Vang Nhat'],
  jackfruit: ['Mít Thái', 'Mít Tố Nữ', 'Mit Ruot Do', 'Jackfruit Nghệ', 'Mít Không Hạt'],
  'jackfruit-box': ['Hộp Mít 500g', 'Mít Tách Múi', 'Hop Mit Thai', 'Mít Đóng Hộp', 'Jackfruit Box 1kg'],
  papaya: ['Đu Đủ Ruột Đỏ', 'Đu Đủ Thái', 'Du Du Dai Loan', 'Papaya Solo', 'Đu Đủ Chín Cây'],
  plum: ['Mận An Phước', 'Mận Hậu Sơn La', 'Man Hau', 'Plum Đỏ', 'Man An Phuoc'],
  passionfruit: ['Chanh Dây Đà Lạt', 'Chanh Leo', 'Chanh Day Tim', 'Passion Fruit Vàng', 'Passionfruit Úc'],
  pear: ['Lê Hàn Quốc', 'Pear Nâu', 'Lê Nam Phi'],
  sapodilla: ['Sapo Tiền Giang', 'Hồng Xiêm', 'Sapodilla Thái'],
  cantaloupe: ['Dưa Lưới Ruột Cam', 'Dua Luoi Nhật', 'Cantaloupe Úc'],
  'custard-apple': ['Mãng Cầu Ta', 'Mãng Cầu Dai', 'Quả Na', 'Sugar Apple'],
  pomegranate: ['Lựu Đỏ', 'Luu Do Ấn Độ', 'Pomegranate Peru']
};

let checked = 0;

for (const [expectedIcon, fruitNames] of Object.entries(CASES_BY_ICON)) {
  for (const fruitName of fruitNames) {
    assert.equal(
      getFruitIconKey(fruitName),
      expectedIcon,
      `${fruitName} phải dùng icon ${expectedIcon}`
    );
    checked += 1;
  }
}

assert.ok(checked > 100, 'Bộ kiểm thử phải có hơn 100 tên trái cây.');

assert.deepEqual(
  {
    sheet: getFruitIcon('Chuối già xanh').sheet,
    x: getFruitIcon('Chuối già xanh').x,
    y: getFruitIcon('Chuối già xanh').y,
    sizeX: getFruitIcon('Chuối già xanh').sizeX,
    sizeY: getFruitIcon('Chuối già xanh').sizeY
  },
  {
    sheet: 'detail',
    x: `${(2 * 100) / 3}%`,
    y: '0%',
    sizeX: '400%',
    sizeY: '300%'
  },
  'Sprite chi tiết 4x3 phải dùng đúng kích thước và tọa độ.'
);

assert.deepEqual(
  {
    key: getFruitIcon('Dưa hấu không hạt').key,
    sheet: getFruitIcon('Dưa hấu không hạt').sheet,
    x: getFruitIcon('Dưa hấu không hạt').x,
    y: getFruitIcon('Dưa hấu không hạt').y
  },
  {
    key: 'seedless-watermelon',
    sheet: 'detail',
    x: `${100 / 3}%`,
    y: '100%'
  },
  'Dưa hấu không hạt phải dùng ô không hạt riêng.'
);

const styles = readFileSync(new URL('../assets/css/styles.css', import.meta.url), 'utf8');
const fruitNameStyles = styles.match(/\.fruit-name\s*\{[^}]+\}/)?.[0] || '';
assert.match(fruitNameStyles, /white-space:\s*normal/, 'Tên dài phải được phép xuống dòng.');
assert.doesNotMatch(fruitNameStyles, /text-overflow:\s*ellipsis/, 'Tên dài không được hiện dấu ba chấm.');

console.log(`Fruit icon mapping: PASS (${checked} trường hợp)`);
