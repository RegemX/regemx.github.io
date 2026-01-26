const track = document.getElementById('track');
const dots = document.querySelectorAll('.dot');
// Capture original slides before cloning
const originalSlides = Array.from(document.querySelectorAll('.slide'));
const slideCount = originalSlides.length;

// 1. CLONE FIRST AND LAST SLIDES
const firstClone = originalSlides[0].cloneNode(true);
const lastClone = originalSlides[slideCount - 1].cloneNode(true);

track.appendChild(firstClone);
track.insertBefore(lastClone, track.firstElementChild);

// 2. SETUP TRACK
// New structure: [LastClone, Real1, Real2, Real3, Real4, FirstClone]
// Indices:      0          1      2      3      4      5
let currentIndex = 1; // Start at Real1 (Home)

track.style.width = `${(slideCount + 2) * 100}%`;
track.style.transform = `translateX(-100vw)`; // Show Real Home

// Force initial layout
track.offsetHeight;

let isTransitioning = false;

function updateDots(physicalIndex) {
    // Map physical index to logical index (0-3)
    let logicalIndex = 0;
    if (physicalIndex === 0) logicalIndex = slideCount - 1; // Clone of Last -> Logic Last
    else if (physicalIndex === slideCount + 1) logicalIndex = 0; // Clone of First -> Logic First
    else logicalIndex = physicalIndex - 1;

    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === logicalIndex);
    });
}

function moveTrack(index, animate = true) {
    if (animate) {
        track.style.transition = 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)';
    } else {
        track.style.transition = 'none';
    }
    track.style.transform = `translateX(-${index * 100}vw)`;
    currentIndex = index;
}

// Check for Infinite Jump
track.addEventListener('transitionend', () => {
    isTransitioning = false;
    // If at FirstClone (End), jump to Real First
    if (currentIndex === slideCount + 1) {
        moveTrack(1, false);
    }
    // If at LastClone (Start), jump to Real Last
    else if (currentIndex === 0) {
        moveTrack(slideCount, false);
    }
});

// GLOBAL API
window.goToSlide = (logicalIndex) => {
    if (isTransitioning) return;
    moveTrack(logicalIndex + 1);
    updateDots(logicalIndex + 1);
};

// SCROLL HANDLING
let isScrolling = false;
window.addEventListener('wheel', (e) => {
    if (isScrolling) return;
    isScrolling = true;
    setTimeout(() => { isScrolling = false; }, 800);

    if (e.deltaY > 0) {
        // NEXT
        if (currentIndex >= slideCount + 1) return;
        const nextIndex = currentIndex + 1;
        moveTrack(nextIndex);
        updateDots(nextIndex);
    } else {
        // PREV
        if (currentIndex <= 0) return;
        const prevIndex = currentIndex - 1;
        moveTrack(prevIndex);
        updateDots(prevIndex);
    }
});
// SWIPE SUPPORT
let touchStartX = 0;
let touchEndX = 0;

window.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

window.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, { passive: true });

function handleSwipe() {
    const threshold = 50;
    if (touchEndX < touchStartX - threshold) {
        // Swipe Left -> Next Slide
        if (currentIndex >= slideCount + 1) return;
        const nextIndex = currentIndex + 1;
        moveTrack(nextIndex);
        updateDots(nextIndex);
    }
    if (touchEndX > touchStartX + threshold) {
        // Swipe Right -> Prev Slide
        if (currentIndex <= 0) return;
        const prevIndex = currentIndex - 1;
        moveTrack(prevIndex);
        updateDots(prevIndex);
    }
}

// LIGHTBOX
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.close-btn');

// Need to attach listeners to Cloned slides too if they have images?
// The gallery is logical slide 2. Clones are Home and Team. No gallery clone implies no issue.
// BUT if we clone gallery in future, we need to bind event listeners to clones.
// Currently only Original slides have listeners attached below? 
// Actually querySelectorAll finds current DOM.
// But clones are added above. 
// We should re-query.

function setupLightbox() {
    document.querySelectorAll('.gallery-grid img').forEach(img => {
        img.style.cursor = 'zoom-in';
        img.addEventListener('click', () => {
            lightbox.style.display = 'flex';
            lightboxImg.src = img.src;
        });
    });
}
setupLightbox(); // Run once

closeBtn.addEventListener('click', () => { lightbox.style.display = 'none'; });
lightbox.addEventListener('click', (e) => { if (e.target !== lightboxImg) lightbox.style.display = 'none'; });
