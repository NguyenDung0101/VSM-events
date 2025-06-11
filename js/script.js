// VIDEO OF BANNER 3
const openBtn = document.getElementById('openVideo');
  const closeBtn = document.getElementById('closeVideo');
  const popup = document.getElementById('videoPopup');
  const iframe = document.getElementById('youtubeFrame');

  openBtn.onclick = () => {
    popup.classList.add('active');
    iframe.src += "&autoplay=1";
  };

  closeBtn.onclick = () => {
    popup.classList.remove('active');
    iframe.src = iframe.src.split('&')[0]; // Reset autoplay
  };


  const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const closeMenu = document.getElementById('closeMenu');
    const overlay = document.getElementById('overlay');

    menuToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
      overlay.classList.toggle('active');
    });

    closeMenu.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
      overlay.classList.remove('active');
    });

    overlay.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
      overlay.classList.remove('active');
    });

// banner 3
document.addEventListener('DOMContentLoaded', () => {
  const openVideo = document.getElementById('openVideo');
  const videoPopup = document.getElementById('videoPopup');
  const closeVideo = document.getElementById('closeVideo');

  openVideo.addEventListener('click', () => {
    videoPopup.classList.add('active');
  });

  closeVideo.addEventListener('click', () => {
    videoPopup.classList.remove('active');
    const iframe = videoPopup.querySelector('iframe');
    iframe.src = iframe.src; // Reset video khi đóng
  });

  // Đóng popup khi nhấp ra ngoài video
  videoPopup.addEventListener('click', (e) => {
    if (e.target === videoPopup) {
      videoPopup.classList.remove('active');
      const iframe = videoPopup.querySelector('iframe');
      iframe.src = iframe.src;
    }
  });
});