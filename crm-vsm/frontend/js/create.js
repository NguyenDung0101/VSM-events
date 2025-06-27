const form = document.getElementById('post-form');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  try {
    const res = await fetch('http://localhost:5000/api/posts', {
      method: 'POST',
      body: formData
    });

    const data = await res.json();
    alert('Tạo bài viết thành công!');
    window.location.href = 'index.html';
  } catch (err) {
    console.error('Lỗi:', err);
    alert('Không thể tạo bài viết');
  }
});
