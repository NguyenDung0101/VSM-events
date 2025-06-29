
# 📘 CRM-VSM - Hệ thống quản lý nội dung Viet Nam Student Marathon

> Tài liệu mô tả kiến trúc, công nghệ, phân quyền người dùng, và các trang chức năng chính của hệ thống CRM-VSM.

---

## 📁 1. Kiến trúc tổng quan

Dự án được tổ chức theo kiến trúc **monorepo** với 2 phần chính:

```
crm-vsm/
├── backend/    # Xử lý logic máy chủ và API
└── frontend/   # Giao diện người dùng
```

---

## 🧠 2. Cấu trúc thư mục `backend`

```
backend/
├── controllers/           # Xử lý nghiệp vụ
│   ├── authController.js  # Đăng ký, đăng nhập
│   └── postController.js  # Tạo, sửa, xóa, đọc bài viết
│
├── Middleware/            # Các hàm xử lý trung gian
│   ├── auth.js            # Xác thực người dùng qua JWT
│   └── upload.js          # Xử lý upload file bằng multer
│
├── models/                # Mongoose schemas
│   ├── Post.js
│   └── User.js
│
├── routes/                # Định nghĩa API routes
│   ├── authRoutes.js
│   ├── post.routes.js     # Có thể trùng với postRoutes.js, cần hợp nhất
│   └── postRoutes.js
│
├── uploads/               # Thư mục chứa file upload (ảnh bài viết)
│
├── .env                   # Biến môi trường
├── app.js                 # Cấu hình ứng dụng Express
├── package.json           # Metadata, dependencies, scripts
└── package-lock.json
```

---

## 🌐 3. Ngôn ngữ & Thư viện sử dụng

### Backend:
- **Ngôn ngữ**: JavaScript (Node.js)
- **Thư viện chính**:
  - `express`: Web framework
  - `mongoose`: Kết nối MongoDB
  - `bcryptjs`: Hash mật khẩu
  - `jsonwebtoken`: Tạo và xác thực JWT
  - `multer`: Upload file
  - `dotenv`: Quản lý biến môi trường
  - `cors`: Cho phép frontend kết nối backend qua cổng khác

---

## 🔐 4. Phân quyền người dùng

### 👑 Admin:
- Tạo, sửa, xóa người dùng
- Quản lý toàn bộ bài viết
- Truy cập thống kê, quản trị

### 👤 User:
- Chỉ được tạo/sửa bài viết do chính mình viết

---

## 🧩 5. Các trang chức năng chính (Frontend dự kiến)

| Trang               | Chức năng chính                                                                 |
|---------------------|----------------------------------------------------------------------------------|
| **Đăng nhập**        | Đăng nhập hệ thống bằng tài khoản được cấp                                       |
| **Dashboard**        | Thống kê, danh sách bài viết                                                    |
| **Tạo bài viết**     | Soạn thảo và đăng bài mới                                                       |
| **Chỉnh sửa bài viết**| Cập nhật nội dung bài đã viết (nếu là tác giả hoặc admin)                       |
| **Quản lý người dùng**| (Chỉ admin) Xem, thêm, sửa, xóa người dùng                                     |
| **Thống kê**         | (Chỉ admin) Biểu đồ tổng quan: số bài viết, người dùng, bài theo danh mục, v.v.|

---

## 🛠️ 6. Lộ trình triển khai backend

### ✅ 1. **Models**
- `User`: name, email, password, role
- `Post`: title, content, author, createdAt, updatedAt...

### ✅ 2. **Controllers**
- `authController.js`: đăng ký, đăng nhập, xác thực
- `postController.js`: CRUD bài viết, lọc theo user/admin

### ✅ 3. **Routes**
- `authRoutes.js`: `/api/auth/register`, `/api/auth/login`
- `postRoutes.js`: `/api/posts`, `/api/posts/:id`, `/api/posts/user/:userId`

### ✅ 4. **App.js**
- Kết nối MongoDB
- Cấu hình middleware
- Kết nối routes

### ✅ 5. **Frontend API Integration**
- Gửi và nhận dữ liệu qua `fetch` hoặc `axios`
- Lưu token JWT trong localStorage
- Gọi API với token cho các route cần xác thực

---

## 📌 Ghi chú đặc biệt
- Có sự trùng lặp giữa `post.routes.js` và `postRoutes.js` → cần thống nhất lại chỉ giữ 1 file.
- Nếu có sử dụng upload ảnh, đảm bảo thư mục `uploads/` có quyền ghi.

---

## 👥 Đóng góp
Mọi ý tưởng đóng góp xin gửi qua email: **vsm.org.vn@gmail.com**

---

## 🏁 Bản quyền
© 2025 Viet Nam Student Marathon. All rights reserved.
