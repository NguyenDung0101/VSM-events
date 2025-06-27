const API_URL = 'http://localhost:5000/api/posts';
const BASE_IMAGE_URL = 'http://localhost:5000'; // luôn đúng

const postList = document.getElementById('post-list');

async function fetchPosts() {
  try {
    const res = await fetch(API_URL);
    const posts = await res.json();

    postList.innerHTML = '';

    posts.forEach(post => {
      let imgSrc = './assets/no-image.png';

      if (post.thumbnail) {
        // Nếu thumbnail là /uploads/abc.png → thêm BASE_IMAGE_URL
        if (post.thumbnail.startsWith('/')) {
          imgSrc = `${BASE_IMAGE_URL}${post.thumbnail}`;
        }
        // Nếu là filename (ví dụ: abc.png) → tự nối lại
        else {
          imgSrc = `${BASE_IMAGE_URL}/uploads/${post.thumbnail}`;
        }
      }

      const postElement = document.createElement('div');
      postElement.classList.add('post');

      postElement.innerHTML = `
        <h2>${post.title}</h2>
        <img src="${imgSrc}" alt="Thumbnail" style="max-width: 300px; border: 1px solid #ccc;" onerror="this.src='./assets/no-image.png'" />
        <p><strong>Mô tả:</strong> ${post.shortDescription}</p>
        <p><strong>Ngày đăng:</strong> ${new Date(post.createdAt).toLocaleString()}</p>
        <div class="actions">
          <button onclick="viewPost('${post._id}')">👁 Xem</button>
          <button onclick="editPost('${post._id}')">✏️ Sửa</button>
          <button onclick="deletePost('${post._id}')">🗑 Xoá</button>
        </div>
      `;

      postList.appendChild(postElement);
    });
  } catch (err) {
    console.error('❌ Lỗi khi tải bài viết:', err);
  }
}
