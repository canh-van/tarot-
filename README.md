# Cảm nhận chiều sâu trái tim bạn

Website Tarot tĩnh dùng HTML5 + CSS3 + JavaScript thuần, phù hợp triển khai GitHub Pages.

## Chạy trên máy
Không cần Node.js. Chỉ cần mở `index.html` bằng trình duyệt.

## Đưa lên GitHub Pages
1. Tạo một repository mới trên GitHub.
2. Upload toàn bộ thư mục và giữ nguyên cấu trúc.
3. Vào **Settings → Pages**.
4. Ở **Build and deployment**, chọn **Deploy from a branch**.
5. Chọn branch `main`, thư mục `/ (root)`.
6. Save và chờ GitHub Pages triển khai.

## Quan trọng
- Các đường dẫn đều là đường dẫn tương đối để hoạt động trong repository.
- Giá dịch vụ trong `js/data.js` chỉ là placeholder, chưa phải giá chính thức.
- Form liên hệ hiện không có backend và không giả vờ lưu dữ liệu. Hãy thay bằng email hoặc dịch vụ form thật trước khi sử dụng.
- Không đặt API key, mật khẩu hoặc dữ liệu riêng tư trong repository công khai.
- Dữ liệu Tarot hiện dùng 22 lá Major Arcana và ý nghĩa tiếng Việt do dự án biên soạn.
- Ảnh Tarot thật có thể được thêm vào `assets/images/` sau này; phiên bản này dùng artwork CSS để nhẹ và dễ triển khai.

## Thêm bài viết
Mở `data/articles.json` và thêm một object theo mẫu có sẵn. Không cần sửa giao diện.

## Tùy chỉnh
- Màu sắc: `css/style.css`
- Nội dung Tarot và dịch vụ: `js/data.js`
- Logic xào/rút/lật: `js/tarot.js`
- Menu và JS chung: `js/main.js`
