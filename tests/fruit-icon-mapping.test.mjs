import assert from 'node:assert/strict';
import { getFruitIconKey } from '../assets/js/fruit-icons.js';

export const CASES_BY_ICON = {
  apple: ['Táo Fuji Mỹ', 'Táo Envy New Zealand', 'Apple Gala', 'Lê Hàn Quốc', 'Pear Nâu'],
  orange: ['Cam Sành Vĩnh Long', 'Quýt Đường', 'Orange Navel', 'Chanh Vàng Mỹ', 'Mandarin Úc'],
  banana: ['Chuối Laba Đà Lạt', 'Chuối Tiêu Hồng', 'Banana Cavendish', 'Chuoi Su', 'Chuối Ngự'],
  mango: ['Xoài Cát Hòa Lộc', 'Xoài Tượng', 'Mango Keo', 'Xoai Uc', 'Xoài Thái'],
  grape: ['Nho Mẫu Đơn', 'Nho Đen Không Hạt', 'Grape Red Globe', 'Nho Xanh', 'Grape Shine Muscat'],
  watermelon: ['Dưa Hấu Không Hạt', 'Dưa Hấu Vàng', 'Watermelon Sugar Baby', 'Dua Hau Long An', 'Dưa Hấu Mini'],
  strawberry: ['Dâu Tây Đà Lạt', 'Strawberry Hàn Quốc', 'Việt Quất Nhập Khẩu', 'Blueberry Mỹ', 'Raspberry Đỏ'],
  avocado: ['Bơ Sáp Đắk Lắk', 'Bơ 034', 'Bo Hass', 'Avocado Úc', 'Bơ Booth'],
  durian: ['Sầu Riêng Ri6', 'Sầu Riêng Monthong', 'Sau Rieng Musang King', 'Durian Thái', 'Sầu Riêng Khổ Qua'],
  coconut: ['Dừa Xiêm Bến Tre', 'Dừa Sáp Cầu Kè', 'Dua Xiem Xanh', 'Coconut Non', 'Dừa Dứa'],
  'dragon-fruit': ['Thanh Long Ruột Đỏ', 'Thanh Long Ruột Trắng', 'Thanh Long Vàng', 'Dragon Fruit Pink', 'Dragonfruit Bình Thuận'],
  pineapple: ['Thơm Mật Đắk Nông', 'Dứa Queen', 'Khóm Cầu Đúc', 'Pineapple MD2', 'Thom Mat'],
  kiwi: ['Kiwi Xanh', 'Kiwi Vàng', 'Kiwi Đỏ', 'Kiwi New Zealand', 'Kiwi Gold'],
  cherry: ['Cherry Đỏ Mỹ', 'Cherry Vàng Rainier', 'Anh Đào Úc', 'Cherry Chile', 'Anh Dao Nhật'],
  pomelo: ['Bưởi Da Xanh', 'Bưởi Năm Roi', 'Buoi Dien', 'Pomelo Thái', 'Grapefruit Hồng'],
  mangosteen: ['Măng Cụt Bến Tre', 'Măng Cụt Lái Thiêu', 'Mang Cut Thai', 'Mangosteen Indonesia', 'Măng Cụt Tím'],
  'guava-pink': ['Ổi Ruột Đỏ', 'Ổi Ruột Hồng', 'Oi Ruot Do', 'Pink Guava', 'Red Guava Tiền Giang'],
  'guava-white': ['Ổi Ruột Trắng', 'Ổi Trắng', 'Oi Ruot Trang', 'White Guava', 'Ổi Nữ Hoàng'],
  longan: ['Nhãn Lồng Hưng Yên', 'Nhãn Xuồng Cơm Vàng', 'Longan Thái', 'Vải Thiều Bắc Giang', 'Chôm Chôm Java'],
  peach: ['Đào Tiên Sa Pa', 'Đào Vàng', 'Dao Tien', 'Peach Hàn Quốc', 'Dao Vang Nhat'],
  jackfruit: ['Mít Thái', 'Mít Tố Nữ', 'Mit Ruot Do', 'Jackfruit Nghệ', 'Mít Không Hạt'],
  'jackfruit-box': ['Hộp Mít 500g', 'Mít Tách Múi', 'Hop Mit Thai', 'Mít Đóng Hộp', 'Jackfruit Box 1kg'],
  papaya: ['Đu Đủ Ruột Đỏ', 'Đu Đủ Thái', 'Du Du Dai Loan', 'Papaya Solo', 'Đu Đủ Chín Cây'],
  plum: ['Mận An Phước', 'Mận Hậu Sơn La', 'Man Hau', 'Plum Đỏ', 'Man An Phuoc'],
  passionfruit: ['Chanh Dây Đà Lạt', 'Chanh Leo', 'Chanh Day Tim', 'Passion Fruit Vàng', 'Passionfruit Úc']
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
console.log(`Fruit icon mapping: PASS (${checked} trường hợp)`);

