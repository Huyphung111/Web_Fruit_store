# Triển khai web

## Hiện tại

Web chạy tĩnh và lưu dữ liệu bằng `localStorage`. Có thể upload thư mục này lên
Netlify, Vercel hoặc GitHub Pages.

## Khi kết nối Supabase

1. Sao chép `config/app-config.example.js` thành `config/app-config.js`.
2. Điền URL và anon key của Supabase.
3. Chỉ bật quyền đọc công khai cho bảng giá. Không đưa `service_role key` vào code.
4. Chuyển `data-service.js` từ `localStorage` sang gọi Supabase.

## Ghi chú dữ liệu

`localStorage` là dữ liệu riêng theo từng trình duyệt. Nếu nhân viên cần xem cùng
một bảng giá, dữ liệu phải được đọc từ Supabase hoặc một nguồn online dùng chung.
