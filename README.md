# Hệ Thống Quản Lý Khóa Học & Giảng Viên (MERN Stack)

Dự án được triển khai dựa trên yêu cầu chi tiết của bạn, bao gồm các công nghệ:
- **Backend:** Node.js, Express.js, MongoDB, JWT Auth.
- **Frontend:** React.js (Vite), TailwindCSS, React Router v6, Axios, React-Toastify.

## Thông tin mặc định
- **Tài khoản Admin mặc định:** (Tự động tạo khi chạy server)
  - `username`: admin
  - `password`: admin123

## Hướng dẫn chạy dự án

### 1. Backend
Mở Terminal, di chuyển vào thư mục `backend`:
```bash
cd backend
npm install
npm run dev
```
*(Server chạy tại cổng 5000)*

### 2. Frontend
Mở Terminal thứ 2, di chuyển vào thư mục `frontend`:
```bash
cd frontend
npm install
npm run dev
```
*(Truy cập ứng dụng tại http://localhost:5173)*

## Cấu trúc thư mục chính
- `backend/models/*.js`: Cấu trúc Database (Instructor, Course).
- `backend/routes/*.js`: Routing tách biệt Public / Private / Auth.
- `backend/controllers/*.js`: Logic xử lý của các APIs.
- `backend/middlewares/auth.js`: Middleware bảo vệ route.
- `frontend/src/layouts/*`: Layout chung (Public, Admin).
- `frontend/src/pages/*`: Các trang tương ứng với yêu cầu.
- `frontend/src/components/ProtectedRoute.jsx`: Component bảo vệ Route Admin.

Mọi yêu cầu về logic ẩn hiện Data, Soft delete, bảo mật trường thông tin đều được xử lý đúng theo đề bài.
