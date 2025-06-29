document.addEventListener("DOMContentLoaded", () => {
  feather.replace();

  const token = localStorage.getItem("token");
  if (!token) {
    alert("Bạn cần đăng nhập để tạo bài viết");
    window.location.href = "login.html";
    return;
  }

  const createForm = document.getElementById("createPostForm");
  const saveDraftBtn = document.getElementById("saveDraftBtn");
  const thumbnailInput = document.getElementById("thumbnail");
  const thumbnailImg = document.getElementById("thumbnailImg");

  // Live preview thumbnail
  thumbnailInput.addEventListener("input", () => {
    const url = thumbnailInput.value.trim();
    thumbnailImg.src = url || "/placeholder.svg?height=200&width=300";
  });

  // Nếu bấm Lưu nháp → không xuất bản
  let isDraft = false;
  saveDraftBtn.addEventListener("click", () => {
    isDraft = true;
    createForm.requestSubmit(); // Gửi form bằng JS
  });

  createForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Lấy dữ liệu
    const title = document.getElementById("title").value.trim();
    const shortDescription = document.getElementById("shortDescription").value.trim();
    const content = document.getElementById("content").value.trim();
    const thumbnail = thumbnailInput.value.trim();
    const tags = document.getElementById("tags").value.trim();
    const category = document.getElementById("category").value.trim();
    const isPublished = isDraft ? false : document.getElementById("isPublished").checked;
    const publishedAtInput = document.getElementById("publishedAt").value;

    if (!title || !content) {
      alert("Vui lòng nhập đầy đủ tiêu đề và nội dung.");
      return;
    }

    const postData = {
      title,
      shortDescription,
      content,
      thumbnail,
      tags,
      category,
      isPublished,
      publishedAt: publishedAtInput || new Date().toISOString()
    };

    try {
      const res = await fetch("https://backend-vsm-events.onrender.com/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(postData)
      });

      const result = await res.json();

      if (!res.ok) {
        alert(result.error || "Lỗi khi tạo bài viết.");
        return;
      }

      alert("Bài viết đã được tạo thành công!");
      window.location.href = "index.html";
    } catch (err) {
      alert("Lỗi kết nối đến máy chủ.");
      console.error(err);
    }
  });

  // Nút logout
  document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.clear();
    window.location.href = "login.html";
  });
});
