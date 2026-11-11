# ShopMini

Ứng dụng cửa hàng mini bằng React + TypeScript (Vite), dùng Context API và Redux Toolkit.

## Cách chạy
npm install
npm run dev

Tài khoản đăng nhập: tên bất kỳ, mật khẩu `123456`.

## Dữ liệu để ở đâu và vì sao

| Dữ liệu | Nơi lưu | Lý do |
|---|---|---|
| Từ khóa tìm kiếm (ô tìm kiếm trang chủ) | useState | Chỉ dùng trong một trang, không cần chia sẻ |
| Form đăng nhập (username, password, thông báo lỗi) | useState | Chỉ liên quan đến một form, là state cục bộ |
| Cờ "đã đặt hàng" ở trang thanh toán | useState | Chỉ ảnh hưởng giao diện của trang đó |
| Theme sáng/tối | Context (ThemeContext) | Nhiều component cần dùng, ít thay đổi, logic đơn giản |
| Người dùng đăng nhập (user, login, logout) | Context (AuthContext) | Header, trang đăng nhập và ProtectedRoute cùng cần, ít thay đổi |
| Danh sách sản phẩm, trạng thái loading/succeeded/failed | Redux (productsSlice) | Nhiều trang dùng chung, có tác vụ bất đồng bộ nên dùng createAsyncThunk, tránh gọi API lặp lại |
| Giỏ hàng (thêm, xóa, cập nhật số lượng) | Redux (cartSlice) | Nhiều trang và Header cùng đọc/ghi, thay đổi thường xuyên, cần selector tính tổng số lượng và tổng tiền |