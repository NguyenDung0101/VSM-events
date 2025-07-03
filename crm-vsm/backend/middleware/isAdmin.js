// middleware/isAdmin.js
module.exports = (req, res, next) => {
  const userRole = req.user?.role; // giả sử bạn đã giải mã token ở bước trước
  if (userRole !== 'admin') {
    return res.status(403).json({ message: 'Chỉ admin mới được thực hiện thao tác này' });
  }
  next();
};
