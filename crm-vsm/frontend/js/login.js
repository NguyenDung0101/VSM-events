document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("loginForm");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    try {
      const res = await fetch("https://backend-vsm-events.onrender.com/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Đăng nhập thất bại");
        return;
      }

      // Lưu token vào localStorage hoặc sessionStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      alert("Đăng nhập thành công!");
      // Chuyển hướng sau khi đăng nhập
      window.location.href = "./index.html";
    } catch (err) {
      alert("Lỗi kết nối tới máy chủ");
      console.error(err);
    }
  });
});
