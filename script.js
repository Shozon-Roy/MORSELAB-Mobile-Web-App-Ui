   // --- Splash slider logic ---
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dots-bar .dot');
    let currentSlide = 0;
    let slideInterval = null;
    function showSlide(idx) {
      slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === idx);
      });
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === idx);
      });
      currentSlide = idx;
    }
    function nextSlide() {
      let nextIdx = (currentSlide + 1) % slides.length;
      showSlide(nextIdx);
    }
    function startAutoSlide() {
      slideInterval = setInterval(nextSlide, 3000);
    }
    function stopAutoSlide() {
      if (slideInterval) clearInterval(slideInterval);
    }
    // Dot click (optional, for manual selection)
    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        stopAutoSlide();
        showSlide(i);
        startAutoSlide();
      });
    });
    // Start auto
    startAutoSlide();

    // --- Sliding logic for splash screen start button ---
    const slider = document.getElementById('slider');
    const btn = document.getElementById('slideBtn');
    const splash = document.getElementById('splashScreen');
    const home = document.getElementById('homePage');
    let sliding = false, startX = 0, btnLeft = 0;
    const minLeft = 0;
    function getMaxLeft() {
      return slider.offsetWidth - btn.offsetWidth;
    }
    function setBtnLeft(px) {
      btn.style.left = px + "px";
    }
    function showHomePage() {
      splash.classList.add('fade-out');
      setTimeout(() => {
        home.classList.add('active');
      }, 550);
      stopAutoSlide();
    }
    // Touch events for mobile
    btn.addEventListener('touchstart', (e) => {
      sliding = true;
      startX = e.touches[0].clientX;
      btnLeft = parseInt(btn.style.left) || 0;
    });
    btn.addEventListener('touchmove', (e) => {
      if (!sliding) return;
      let dx = e.touches[0].clientX - startX;
      let newLeft = Math.min(Math.max(minLeft, btnLeft + dx), getMaxLeft());
      setBtnLeft(newLeft);
    }, {passive:false});
    btn.addEventListener('touchend', () => {
      if (!sliding) return;
      if (parseInt(btn.style.left) >= getMaxLeft() * 0.85) {
        setBtnLeft(getMaxLeft());
        setTimeout(showHomePage, 250);
      } else {
        setBtnLeft(minLeft);
      }
      sliding = false;
    });
    // Mouse drag (for desktop dev)
    btn.addEventListener('mousedown', (e) => {
      sliding = true;
      startX = e.clientX;
      btnLeft = parseInt(btn.style.left) || 0;
      document.body.style.userSelect = 'none';
    });
    window.addEventListener('mousemove', (e) => {
      if (!sliding) return;
      let dx = e.clientX - startX;
      let newLeft = Math.min(Math.max(minLeft, btnLeft + dx), getMaxLeft());
      setBtnLeft(newLeft);
    });
    window.addEventListener('mouseup', () => {
      if (!sliding) return;
      if (parseInt(btn.style.left) >= getMaxLeft() * 0.85) {
        setBtnLeft(getMaxLeft());
        setTimeout(showHomePage, 250);
      } else {
        setBtnLeft(minLeft);
      }
      sliding = false;
      document.body.style.userSelect = '';
    });
    slider.addEventListener('touchmove', (e) => {
      if (sliding) e.preventDefault();
    }, {passive: false});
    window.addEventListener('resize', () => {
      setBtnLeft(0);
    });
