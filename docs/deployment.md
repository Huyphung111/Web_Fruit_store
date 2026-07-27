# Triển khai web với dữ liệu dùng chung

## 1. Tạo database Supabase

1. Tạo một project tại Supabase.
2. Mở **SQL Editor**.
3. Dán và chạy toàn bộ nội dung file `supabase/schema.sql`.

File SQL tạo bảng `fruits` và các policy cho phép khách chưa đăng nhập đọc, thêm,
sửa và xóa bảng giá.

## 2. Kết nối frontend

Mở `config/app-config.js` và điền:

```js
export const SUPABASE_CONFIG = {
  url: 'https://PROJECT_REF.supabase.co',
  publishableKey: 'sb_publishable_...',
  syncIntervalMs: 3000
};
```

- URL: Supabase Dashboard → **Integrations → Data API**.
- Publishable key: Supabase Dashboard → **Settings → API Keys**.
- Không dùng secret key hoặc `service_role` key trong frontend.

Nếu để trống cấu hình, web tự quay về `localStorage` để chạy thử trên một máy.

## 3. Đồng bộ giữa nhân viên

Web đọc dữ liệu từ bảng `fruits` và tự kiểm tra thay đổi mỗi 3 giây. Khi nhân viên
1 thêm, sửa hoặc xóa, nhân viên 2 sẽ thấy thay đổi sau tối đa khoảng 3 giây mà
không cần tải lại trang.

## 4. Cảnh báo quyền truy cập

Project hiện không có đăng nhập. Vì vậy, bất kỳ ai có link và publishable key đều
có thể gọi API thêm, sửa hoặc xóa dữ liệu theo các policy trong `schema.sql`.
Chỉ nên dùng mô hình này nếu link được chia sẻ trong phạm vi nội bộ và bảng giá
không phải dữ liệu nhạy cảm.

Khi cần bảo vệ thao tác chỉnh sửa, hãy bổ sung Supabase Auth và chỉ cấp quyền ghi
cho vai trò nhân viên.

## 5. Deploy Vercel

Sau khi điền cấu hình:

```powershell
git add .
git commit -m "Connect shared fruit data with Supabase"
git push origin main
```

Vercel sẽ tự deploy commit mới.
