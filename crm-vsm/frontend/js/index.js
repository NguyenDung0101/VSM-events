document.addEventListener("DOMContentLoaded", async () => {
  feather.replace(); // icon

  const token = localStorage.getItem("token");
  if (!token) {
    alert("Bạn cần đăng nhập trước");
    window.location.href = "login.html";
    return;
  }

  const loading = document.getElementById("loading");
  const emptyState = document.getElementById("emptyState");
  const postsContainer = document.getElementById("postsContainer");

  loading.style.display = "block";

  try {
    const res = await fetch("https://backend-vsm-events.onrender.com/api/posts", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const posts = await res.json();
    loading.style.display = "none";

    if (!Array.isArray(posts) || posts.length === 0) {
      emptyState.style.display = "block";
      return;
    }

    renderStats(posts);
    renderPosts(posts);
  } catch (err) {
    loading.style.display = "none";
    alert("Lỗi khi tải bài viết");
    console.error(err);
  }

  // Xử lý nút logout
  document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.clear();
    window.location.href = "login.html";
  });
});

function renderStats(posts) {
  const total = posts.length;
  const published = posts.filter(p => p.isPublished).length;
  const draft = posts.filter(p => !p.isPublished).length;
  const today = posts.filter(p => {
    const publishedAt = new Date(p.publishedAt);
    const now = new Date();
    return (
      publishedAt.getDate() === now.getDate() &&
      publishedAt.getMonth() === now.getMonth() &&
      publishedAt.getFullYear() === now.getFullYear()
    );
  }).length;

  document.querySelector('[data-stat="total"]').textContent = total;
  document.querySelector('[data-stat="published"]').textContent = published;
  document.querySelector('[data-stat="draft"]').textContent = draft;
  document.querySelector('[data-stat="today"]').textContent = today;
}

function renderPosts(posts) {
  const container = document.getElementById("postsContainer");
  container.innerHTML = "";

  posts.forEach(post => {
    const postEl = document.createElement("div");
    postEl.className = "post-card";
    postEl.innerHTML = `
      <div class="post-thumbnail">
        <img src="${post.thumbnail}" alt="${post.title}" />
      </div>
      <div class="post-content">
        <h3>${post.title}</h3>
        <p class="short-description">${post.shortDescription}</p>
        <div class="post-meta">
          <span>Tác giả: ${post.author}</span>
          <span>Danh mục: ${post.category}</span>
          <span>Thời gian: ${new Date(post.publishedAt).toLocaleString("vi-VN")}</span>
        </div>
        <div class="post-actions">
          <a href="edit.html?id=${post._id}" class="btn btn-sm">Chỉnh sửa</a>
          <button class="btn btn-sm btn-danger" onclick="deletePost('${post._id}')">Xóa</button>
        </div>
      </div>
    `;
    container.appendChild(postEl);
  });
}

async function deletePost(id) {
  const confirmDelete = confirm("Bạn có chắc muốn xóa bài viết này?");
  if (!confirmDelete) return;

  try {
    const token = localStorage.getItem("token");
    const res = await fetch(`https://backend-vsm-events.onrender.com/api/posts/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    alert(data.message || "Đã xóa bài viết");
    location.reload();
  } catch (err) {
    alert("Lỗi khi xóa bài viết");
    console.error(err);
  }
}
