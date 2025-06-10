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

