/* ============================================
   BOOKING FORM VALIDATION & HANDLING
   ============================================ */

function handleFormSubmit(event) {
  event.preventDefault();
  
  // Get form elements
  const form = document.getElementById('bookingForm');
  const fullName = document.getElementById('fullName');
  const childName = document.getElementById('childName');
  const ageGroup = document.getElementById('ageGroup');
  const phone = document.getElementById('phone');
  const email = document.getElementById('email');
  const date = document.getElementById('date');
  const successMessage = document.getElementById('successMessage');
  
  // Reset error states
  document.querySelectorAll('.form-group').forEach(group => {
    group.classList.remove('error');
  });
  
  // Validate all fields
  let isValid = true;
  
  // Validate Full Name
  if (!fullName.value.trim()) {
    fullName.parentElement.classList.add('error');
    isValid = false;
  }
  
  // Validate Child's Name
  if (!childName.value.trim()) {
    childName.parentElement.classList.add('error');
    isValid = false;
  }
  
  // Validate Age Group
  if (!ageGroup.value) {
    ageGroup.parentElement.classList.add('error');
    isValid = false;
  }
  
  // Validate Phone
  const phoneRegex = /^[0-9\s\-\+\(\)]{10,}$/;
  if (!phone.value.trim() || !phoneRegex.test(phone.value)) {
    phone.parentElement.classList.add('error');
    isValid = false;
  }
  
  // Validate Email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.value.trim() || !emailRegex.test(email.value)) {
    email.parentElement.classList.add('error');
    isValid = false;
  }
  
  // Validate Date
  if (!date.value) {
    date.parentElement.classList.add('error');
    isValid = false;
  } else {
    // Check if date is a Saturday
    const selectedDate = new Date(date.value);
    if (selectedDate.getDay() !== 6) {
      date.parentElement.classList.add('error');
      const errorMsg = date.parentElement.querySelector('.error-message');
      errorMsg.textContent = 'Please select a Saturday';
      isValid = false;
    }
  }
  
  // If valid, show success message
  if (isValid) {
    // Hide form
    form.style.display = 'none';
    
    // Show success message
    successMessage.classList.add('show');
    
    // Optional: Log form data (in production, send to backend)
    console.log({
      fullName: fullName.value,
      childName: childName.value,
      ageGroup: ageGroup.value,
      phone: phone.value,
      email: email.value,
      date: date.value,
      message: document.getElementById('message').value
    });
    
    // Reset form after 3 seconds
    setTimeout(() => {
      form.reset();
      form.style.display = 'flex';
      successMessage.classList.remove('show');
      document.querySelectorAll('.form-group').forEach(group => {
        group.classList.remove('error');
      });
    }, 3000);
  }
}

// Highlight only Saturdays in date picker
document.addEventListener('DOMContentLoaded', () => {
  const dateInput = document.getElementById('date');
  
  if (dateInput) {
    dateInput.addEventListener('input', (e) => {
      const selectedDate = new Date(e.target.value);
      if (selectedDate.getDay() !== 6) {
        // Not a Saturday, but we'll allow it and validate on submit
      }
    });
  }
});
