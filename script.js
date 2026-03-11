// CONFIGURATION: Replace these with your actual EmailJS credentials
const PUBLIC_KEY = "vXJp01jn8xRKcV0YE"; // From EmailJS Account > Public Key
const SERVICE_ID = "service_knk0plc"; // From EmailJS Email Services > Service ID
const TEMPLATE_ID = "template_ocsujaq"; // From EmailJS Email Templates > Template ID

(function() {
    emailjs.init(PUBLIC_KEY); 
})();

const contactForm = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');
const formStatus = document.getElementById('form-status');

contactForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Basic UI feedback
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    formStatus.classList.add('hidden');

    // Collect form data
    const templateParams = {
        name: document.getElementById('user_name').value,
        email: document.getElementById('user_email').value,
        message: document.getElementById('message').value
    };

    // Send via EmailJS
    emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams)
        .then(function() {
            formStatus.textContent = "Message sent successfully! I'll be in touch soon.";
            formStatus.classList.remove('hidden', 'text-red-500');
            formStatus.classList.add('text-green-500');
            contactForm.reset();
        }, function(error) {
            console.error('EmailJS Error:', error);
            formStatus.textContent = "Oops! Something went wrong. Please try again or email me directly.";
            formStatus.classList.remove('hidden', 'text-green-500');
            formStatus.classList.add('text-red-500');
        })
        .finally(() => {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
        });
});

// Simple Reveal Animation
const observerOptions = { threshold: 0.1 };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    section.classList.add('transition-all', 'duration-1000', 'opacity-0', 'translate-y-10');
    observer.observe(section);
});