// Scroll reveal animation
function reveal() {
    var reveals = document.querySelectorAll(".reveal");

    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 100;

        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        }
    }
}

window.addEventListener("scroll", reveal);
reveal(); // Trigger on load

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(8, 8, 8, 0.95)';
        navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)';
    } else {
        navbar.style.background = 'rgba(8, 8, 8, 0.8)';
        navbar.style.boxShadow = 'none';
    }
});

// Modal Logic
function openModal(roomType) {
    const m = document.getElementById('bookingModal');
    if(m) {
        m.style.display = 'block';
        if (roomType) {
            const select = document.getElementById('b_room');
            if (select) {
                select.value = roomType;
            }
        }
    }
}

function closeModal() {
    const m = document.getElementById('bookingModal');
    if(m) m.style.display = 'none';
}

window.addEventListener('click', function(event) {
    // Close booking modal
    const m = document.getElementById('bookingModal');
    if (m && event.target == m) {
        m.style.display = 'none';
    }
    // Close lightbox
    const l = document.getElementById('lightboxModal');
    if (l && event.target == l) {
        closeLightbox();
    }
    
    // Close mobile menu if clicked outside
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    if (mobileMenuBtn && navLinks && navLinks.classList.contains('active')) {
        if (!navLinks.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
            mobileMenuBtn.classList.remove('active');
            navLinks.classList.remove('active');
        }
    }
});

// =========================================================================
// ADVANCED UI/UX FEATURES
// =========================================================================

// 2. Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    });
}

// Close mobile menu on link click
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if(mobileMenuBtn) {
            mobileMenuBtn.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
});

// 3. Carousel Logic
const carouselPositions = {};

function moveCarousel(carouselId, direction) {
    const carousel = document.getElementById(carouselId);
    if (!carousel) return;
    
    if (carouselPositions[carouselId] === undefined) {
        carouselPositions[carouselId] = 0;
    }
    
    const images = carousel.querySelectorAll('img');
    const totalImages = images.length;
    
    carouselPositions[carouselId] += direction;
    
    if (carouselPositions[carouselId] >= totalImages) {
        carouselPositions[carouselId] = 0; // loop back to first
    } else if (carouselPositions[carouselId] < 0) {
        carouselPositions[carouselId] = totalImages - 1; // loop to last
    }
    
    const offset = -(carouselPositions[carouselId] * 100);
    carousel.style.transform = `translateX(${offset}%)`;
}

// 4. Flatpickr Initialization
document.addEventListener('DOMContentLoaded', function() {
    if (typeof flatpickr !== 'undefined') {
        let checkoutPicker = flatpickr("#b_checkout", {
            dateFormat: "Y-m-d",
            minDate: "today"
        });

        flatpickr("#b_checkin", {
            enableTime: true,
            dateFormat: "Y-m-d H:i",
            minDate: "today",
            onChange: function(selectedDates, dateStr, instance) {
                if (selectedDates.length > 0 && checkoutPicker) {
                    // Automatically set the minimum checkout date to the selected check-in date
                    checkoutPicker.set('minDate', selectedDates[0]);
                }
            }
        });
    }

    // 5. Vanilla Tilt Initialization
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll(".room-card"), {
            max: 5,
            speed: 400,
            glare: true,
            "max-glare": 0.15,
            scale: 1.02
        });
        
        VanillaTilt.init(document.querySelectorAll(".gallery-item"), {
            max: 8,
            speed: 300,
            glare: true,
            "max-glare": 0.2
        });
    }
});

// 6. Scroll Progress Bar
window.addEventListener('scroll', () => {
    const scrollProgress = document.getElementById('scroll-progress');
    if (scrollProgress) {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        scrollProgress.style.width = scrolled + "%";
    }
});

// 7. Testimonial Slider Logic
function scrollTestimonials(direction) {
    const track = document.getElementById('testimonialTrack');
    if (!track) return;
    
    const card = track.querySelector('.testimonial-card');
    if (!card) return;
    
    // Calculate the width of one card plus its gap
    const cardWidth = card.offsetWidth + 30; // 30px is the gap defined in CSS
    
    track.scrollBy({
        left: direction * cardWidth,
        behavior: 'smooth'
    });
}

// 8. Booking Form Submission Handlers
function sendToWhatsApp() {
    const name = document.getElementById('b_name').value;
    const phone = document.getElementById('b_phone').value;
    const room = document.getElementById('b_room').value;
    const checkin = document.getElementById('b_checkin').value;
    const checkout = document.getElementById('b_checkout').value;
    const guests = document.getElementById('b_guests').value;

    if (!name || !phone || !checkin || !checkout) {
        alert("Please fill in all required fields (Name, Phone, Dates).");
        return;
    }

    const message = `Hello Hotel Victory International,\n\nI would like to book a stay:\n\n*Name:* ${name}\n*Phone:* ${phone}\n*Room Type:* ${room}\n*Check-in:* ${checkin}\n*Check-out:* ${checkout}\n*Guests:* ${guests}\n\nPlease confirm availability.`;
    
    // Phone number from footer
    const hotelPhone = "918075005504";
    const encodedMessage = encodeURIComponent(message);
    
    window.open(`https://wa.me/${hotelPhone}?text=${encodedMessage}`, '_blank');
    closeModal();
}

function sendToEmail() {
    const name = document.getElementById('b_name').value;
    const phone = document.getElementById('b_phone').value;
    const room = document.getElementById('b_room').value;
    const checkin = document.getElementById('b_checkin').value;
    const checkout = document.getElementById('b_checkout').value;
    const guests = document.getElementById('b_guests').value;

    if (!name || !phone || !checkin || !checkout) {
        alert("Please fill in all required fields (Name, Phone, Dates).");
        return;
    }

    const subject = `Booking Inquiry: ${name} - ${checkin}`;
    const body = `Hello Hotel Victory International,\n\nI would like to book a stay:\n\nName: ${name}\nPhone: ${phone}\nRoom Type: ${room}\nCheck-in: ${checkin}\nCheck-out: ${checkout}\nGuests: ${guests}\n\nPlease confirm availability.`;
    
    window.location.href = `mailto:info@hotelvictory.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    closeModal();
}

// 9. Lightbox Logic
let currentLightboxIndex = 0;
let galleryImages = [];

document.addEventListener('DOMContentLoaded', function() {
    galleryImages = Array.from(document.querySelectorAll('.gallery-item img'));
    
    // Attach click events
    galleryImages.forEach((img, index) => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', () => openLightbox(index));
    });
});

function openLightbox(index) {
    const lightbox = document.getElementById('lightboxModal');
    if (!lightbox) return;
    
    currentLightboxIndex = index;
    updateLightboxImage();
    lightbox.style.display = 'block';
    document.body.style.overflow = 'hidden'; // prevent scrolling
}

function closeLightbox() {
    const lightbox = document.getElementById('lightboxModal');
    if (lightbox) lightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function changeLightboxImage(direction) {
    currentLightboxIndex += direction;
    
    if (currentLightboxIndex >= galleryImages.length) {
        currentLightboxIndex = 0;
    } else if (currentLightboxIndex < 0) {
        currentLightboxIndex = galleryImages.length - 1;
    }
    
    updateLightboxImage();
}

function updateLightboxImage() {
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    
    if (lightboxImg && galleryImages[currentLightboxIndex]) {
        lightboxImg.src = galleryImages[currentLightboxIndex].src;
        lightboxCaption.innerHTML = galleryImages[currentLightboxIndex].alt;
    }
}

// Close lightbox on escape key or navigate with arrows
document.addEventListener('keydown', (e) => {
    const lightbox = document.getElementById('lightboxModal');
    if (lightbox && lightbox.style.display === 'block') {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') changeLightboxImage(1);
        if (e.key === 'ArrowLeft') changeLightboxImage(-1);
    }
});
