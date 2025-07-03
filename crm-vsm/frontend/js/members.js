document.addEventListener('DOMContentLoaded', () => {
  const addMemberBtn = document.getElementById('addMemberBtn');
  const memberModal = document.getElementById('memberModal');
  const modalTitle = document.getElementById('modalTitle');
  const memberForm = document.getElementById('memberForm');

  addMemberBtn.addEventListener('click', () => {
    modalTitle.textContent = 'Thêm thành viên mới';
    memberForm.reset();
    document.getElementById('memberId').value = '';
    memberModal.classList.add('show'); // ✅ Hiện modal bằng class
  });

  document.getElementById('modalClose').addEventListener('click', () => {
    memberModal.classList.remove('show'); // ✅ Ẩn modal
  });

  document.getElementById('cancelBtn').addEventListener('click', () => {
    memberModal.classList.remove('show');
  });

  window.addEventListener('click', (e) => {
    if (e.target === memberModal) {
      memberModal.classList.remove('show');
    }
  });

  feather.replace(); // icon
});



document.addEventListener('DOMContentLoaded', fetchMembers);

async function fetchMembers() {
  const token = localStorage.getItem('token'); // Bạn cần lưu token khi đăng nhập
  const loading = document.getElementById('loading');
  const tbody = document.getElementById('membersTableBody');

  loading.style.display = 'block';
  try {
    const res = await fetch('http://localhost:3000/api/auth/users', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error('Lỗi khi tải dữ liệu');

    const users = await res.json();

    tbody.innerHTML = ''; // Xóa dữ liệu cũ

    if (users.length === 0) {
      document.getElementById('emptyState').style.display = 'block';
    } else {
      document.getElementById('emptyState').style.display = 'none';
      users.forEach(user => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${user.name}</td>
          <td>${user.email}</td>
          <td>${user.role}</td>
          <td>${user.status || 'active'}</td>
          <td>${new Date(user.createdAt).toLocaleDateString()}</td>
          <td>
            <button class="btn btn-sm btn-warning" onclick="editMember('${user._id}')">Sửa</button>
            <button class="btn btn-sm btn-danger" onclick="deleteMember('${user._id}')">Xóa</button>
          </td>
        `;
        tbody.appendChild(tr);
      });
    }
  } catch (err) {
    alert('Không thể tải danh sách thành viên');
    console.error(err);
  } finally {
    loading.style.display = 'none';
  }
}


const memberModal = document.getElementById('memberModal');
const modalTitle = document.getElementById('modalTitle');
const memberForm = document.getElementById('memberForm');
const saveBtn = document.getElementById('saveBtn');
const cancelBtn = document.getElementById('cancelBtn');
const modalClose = document.getElementById('modalClose');

document.getElementById('addMemberBtn').addEventListener('click', () => {
  modalTitle.textContent = 'Thêm thành viên mới';
  memberForm.reset();
  document.getElementById('memberId').value = '';
  memberModal.style.display = 'flex';
});

cancelBtn.addEventListener('click', () => {
  memberModal.style.display = 'none';
});

modalClose.addEventListener('click', () => {
  memberModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
  if (e.target === memberModal) {
    memberModal.style.display = 'none';
  }
});

memberForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const token = localStorage.getItem('token');
  const id = document.getElementById('memberId').value;
  const name = document.getElementById('memberName').value;
  let email = document.getElementById('memberEmail').value;
  const password = document.getElementById('memberPassword').value;
  const role = document.getElementById('memberRole').value;
  const status = document.getElementById('memberStatus').value;

  // Nếu bạn muốn auto thêm @vsm.org.vn nếu chưa có
  if (!email.includes('@')) {
    email += '@vsm.org.vn';
  }

  const payload = { name, email, password, role, status };

  const url = id
    ? `http://localhost:3000/api/auth/users/${id}`
    : 'http://localhost:3000/api/auth/create-user';

  const method = id ? 'PUT' : 'POST';

  try {
    const res = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    const result = await res.json();
    if (!res.ok) throw new Error(result.message || 'Lỗi khi lưu dữ liệu');

    alert(id ? 'Cập nhật thành viên thành công!' : 'Tạo thành viên thành công!');
    memberModal.style.display = 'none';
    fetchMembers();
  } catch (err) {
    alert('Thất bại: ' + err.message);
    console.error(err);
  }
});


async function editMember(id) {
  const token = localStorage.getItem('token');
  try {
    const res = await fetch('http://localhost:3000/api/auth/users', {
      headers: { Authorization: `Bearer ${token}` },
    });

    const users = await res.json();
    const user = users.find(u => u._id === id);

    if (!user) return alert('Không tìm thấy người dùng');

    // Gán vào form
    modalTitle.textContent = 'Chỉnh sửa thành viên';
    document.getElementById('memberId').value = user._id;
    document.getElementById('memberName').value = user.name;
    document.getElementById('memberEmail').value = user.email;
    document.getElementById('memberPassword').value = ''; // Không hiện mật khẩu
    document.getElementById('memberRole').value = user.role;
    document.getElementById('memberStatus').value = user.status || 'active';

    memberModal.style.display = 'flex';
  } catch (err) {
    alert('Lỗi khi tải dữ liệu thành viên');
    console.error(err);
  }
}

async function deleteMember(id) {
  if (!confirm('Bạn có chắc chắn muốn xóa thành viên này?')) return;

  const token = localStorage.getItem('token');
  try {
    const res = await fetch(`http://localhost:3000/api/auth/users/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) throw new Error('Xóa thất bại');

    alert('Xóa thành viên thành công');
    fetchMembers();
  } catch (err) {
    console.error(err);
    alert('Lỗi khi xóa thành viên');
  }
}
