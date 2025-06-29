document.addEventListener("DOMContentLoaded", () => {
  feather.replace();

  const token = localStorage.getItem("token");
  if (!token) {
    alert("Bạn chưa đăng nhập.");
    window.location.href = "login.html";
    return;
  }

  const postId = new URLSearchParams(window.location.search).get("id");
  if (!postId) {
    document.getElementById("loading").style.display = "none";
    document.getElementById("errorState").style.display = "block";
    return;
  }

  const form = document.getElementById("editPostForm");
  const loading = document.getElementById("loading");
  const errorState = document.getElementById("errorState");

  const titleEl = document.getElementById("title");
  const shortDescEl = document.getElementById("shortDescription");
  const contentEl = document.getElementById("content");
  const isPublishedEl = document.getElementById("isPublished");
  const publishedAtEl = document.getElementById("publishedAt");
  const thumbnailEl = document.getElementById("thumbnail");
  const thumbnailImg = document.getElementById("thumbnailImg");
  const categoryEl = document.getElementById("category");
  const tagsEl = document.getElementById("tags");
  const authorName = document.getElementById("authorName");
  const createdAt = document.getElementById("createdAt");
  const updatedAt = document.getElementById("updatedAt");

  const deleteBtn = document.getElementById("deleteBtn");

  // Load bài viết
  async function loadPost() {
    try {
      const res = await fetch(`https://backend-vsm-events.onrender.com/api/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Không tìm thấy bài viết");

      const data = await res.json();

      // Hiển thị dữ liệu lên form
      titleEl.value = data.title;
      shortDescEl.value = data.shortDescription;
      contentEl.value = data.content;
      isPublishedEl.checked = data.isPublished;
      publishedAtEl.value = new Date(data.publishedAt).toISOString().slice(0, 16);
      thumbnailEl.value = data.thumbnail;
      thumbnailImg.src = data.thumbnail;
      categoryEl.value = data.category;
      tagsEl.value = data.tags.join(", ");
      authorName.innerText = data.author;
      createdAt.innerText = new Date(data.createdAt).toLocaleString();
      updatedAt.innerText = new Date(data.updatedAt).toLocaleString();

      form.style.display = "block";
    } catch (err) {
      errorState.style.display = "block";
    } finally {
      loading.style.display = "none";
    }
  }

  loadPost();

  // Cập nhật bài viết
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const updatedData = {
      title: titleEl.value,
      shortDescription: shortDescEl.value,
      content: contentEl.value,
      isPublished: isPublishedEl.checked,
      publishedAt: publishedAtEl.value || new Date().toISOString(),
      thumbnail: thumbnailEl.value,
      category: categoryEl.value,
      tags: tagsEl.value.split(",").map((tag) => tag.trim()),
    };

    try {
      const res = await fetch(`https://backend-vsm-events.onrender.com/api/posts/${postId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });

      const result = await res.json();

      if (!res.ok) {
        alert(result.error || "Lỗi khi cập nhật bài viết.");
        return;
      }

      alert("Cập nhật thành công!");
      window.location.href = "index.html";
    } catch (err) {
      alert("Lỗi máy chủ!");
      console.error(err);
    }
  });

  // Xóa bài viết
  deleteBtn.addEventListener("click", async () => {
    if (!confirm("Bạn có chắc muốn xóa bài viết này không?")) return;

    try {
      const res = await fetch(`https://backend-vsm-events.onrender.com/api/posts/${postId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const result = await res.json();
        alert(result.error || "Không thể xóa bài viết.");
        return;
      }

      alert("Bài viết đã bị xóa.");
      window.location.href = "index.html";
    } catch (err) {
      alert("Lỗi máy chủ khi xóa bài viết.");
      console.error(err);
    }
  });

  // Preview thumbnail khi thay đổi URL ảnh
  thumbnailEl.addEventListener("input", () => {
    thumbnailImg.src = thumbnailEl.value.trim() || "/placeholder.svg?height=200&width=300";
  });

  // Logout
  document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.clear();
    window.location.href = "login.html";
  });
});
