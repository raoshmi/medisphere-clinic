// Central Application State Manager
let state = {
  theme: 'navy',
  settings: {
    name: 'MediSphere Clinic',
    phone: '+91 11 4567 0000',
    emergencyPhone: '+91 11 4567 9999',
    address: '12, Medicity Complex, Sector 38, Gurugram – 122001',
    hoursWeek: 'Mon–Sat: 8:00 AM – 7:00 PM',
    hoursSun: 'Sun: 9:00 AM – 1:00 PM',
    email: 'appointments@medisphere.com'
  },
  services: [
    { id: 'serv-cardio', title: 'Cardiology', icon: '❤️', desc: 'Expert diagnosis and management of heart conditions — from routine ECGs to advanced cardiac assessments and lifestyle counselling.' },
    { id: 'serv-ortho', title: 'Orthopaedics', icon: '🦴', desc: 'Joint, spine, and bone care delivered by fellowship-trained surgeons. Covering both surgical and non-surgical treatment pathways.' },
    { id: 'serv-neuro', title: 'Neurology', icon: '🧠', desc: 'Specialised diagnosis and care for neurological conditions including migraines, epilepsy, stroke prevention, and memory disorders.' },
    { id: 'serv-paed', title: 'Paediatrics', icon: '👶', desc: 'Dedicated child healthcare from newborns through adolescence. Vaccination programmes, growth monitoring, and nutritional guidance.' },
    { id: 'serv-genmed', title: 'General Medicine', icon: '🩺', desc: 'Your first point of contact for any health concern. Thorough consultations, chronic disease management, and preventive care planning.' },
    { id: 'serv-diag', title: 'Diagnostics & Imaging', icon: '🔬', desc: 'Full-service in-house laboratory with rapid-result pathology, digital X-ray, ultrasound, and MRI referral partnerships.' }
  ],
  doctors: [
    { id: 'doc-ritu', name: 'Dr. Ritu Sharma', specialty: 'Cardiology', qual: 'MD, DM', exp: 18, desc: 'Fellowship trained at AIIMS New Delhi and Johns Hopkins. Specialist in interventional cardiology, preventive care, and heart failure management.', patients: 4200, rating: 4.9, days: 'Mon–Sat', status: 'available' },
    { id: 'doc-arjun', name: 'Dr. Arjun Kapoor', specialty: 'Orthopaedics', qual: 'MS, MCh', exp: 14, desc: 'Specialises in minimally invasive joint replacement, sports injuries, and spine surgery. Trained at St. Thomas\' Hospital, London.', patients: 2800, rating: 4.8, days: 'Tue–Sat', status: 'available' },
    { id: 'doc-priya', name: 'Dr. Priya Mehta', specialty: 'Paediatrics', qual: 'MBBS, DCH', exp: 11, desc: 'A warm and trusted specialist in child development, vaccination programmes, and paediatric nutrition. Beloved by patients of all ages.', patients: 5100, rating: 5.0, days: 'Mon–Fri', status: 'on-call' }
  ],
  appointments: [
    { id: 'apt-1', name: 'Rajesh Kumar', phone: '+91 98765 43210', email: 'rajesh@example.com', date: '2026-05-25', time: 'Morning (8:00 – 12:00)', service: 'Cardiology', doctor: 'Dr. Ritu Sharma', concern: 'Follow-up on blood pressure monitoring.', status: 'confirmed', createdAt: '2026-05-23T10:00:00.000Z' },
    { id: 'apt-2', name: 'Amit Sharma', phone: '+91 99999 88888', email: 'amit@example.com', date: '2026-05-26', time: 'Afternoon (12:00 – 16:00)', service: 'Orthopaedics', doctor: 'Dr. Arjun Kapoor', concern: 'Knee stiffness post jogging.', status: 'pending', createdAt: '2026-05-23T12:30:00.000Z' }
  ],
  reviews: [
    { id: 'rev-1', name: 'Vikram Malhotra', meta: 'Cardiac Patient · Delhi', rating: 5, quote: 'Dr. Sharma identified a heart issue that two other clinics had missed entirely. The care, the follow-up, the whole team — absolutely exceptional. I feel like I have a second family here.', status: 'approved' },
    { id: 'rev-2', name: 'Sneha Gupta', meta: 'Parent · Gurgaon', rating: 5, quote: 'Bringing my 4-year-old to the doctor used to be a nightmare. Dr. Priya has such a gift with children — my daughter actually asks to visit! The whole experience has changed for us.', status: 'approved' },
    { id: 'rev-3', name: 'Ramesh Nair', meta: 'Orthopaedic Patient · Noida', rating: 5, quote: 'Dr. Kapoor did my knee replacement surgery and I was back to walking in half the time I expected. The physiotherapy follow-up was seamless. Truly world-class care.', status: 'approved' }
  ],
  articles: [
    { id: 'art-1', title: 'Understanding Hypertension: The Silent Threat', category: 'Cardiology', date: 'May 18, 2026', readTime: '5 min read', desc: 'Hypertension often displays no symptoms, yet poses major cardiac risks. Learn about active screening, diet adjustments, and lifestyle habits that protect your heart.', content: '<p>Hypertension, commonly referred to as high blood pressure, affects millions globally and is often termed "the silent killer" because it rarely exhibits noticeable symptoms until serious damage has occurred.</p><h2>What Causes Hypertension?</h2><p>For most adults, there is no single identifiable cause of high blood pressure. This type of high blood pressure, called primary or essential hypertension, tends to develop gradually over many years. It is heavily influenced by genetic predispositions, aging, and daily lifestyle factors.</p><h2>The Risks of Untreated High Blood Pressure</h2><p>Persistent high blood pressure damages blood vessels and organs over time. Key risks include:</p><ul><li><strong>Heart Attacks & Stroke:</strong> Narrowed, hardened arteries cannot supply critical organs smoothly.</li><li><strong>Heart Failure:</strong> The heart muscle must work harder to pump blood, causing it to stiffen or weaken.</li><li><strong>Kidney Disease:</strong> Weakened blood vessels in the kidneys impair their filtering capacity.</li></ul><h2>Actionable Prevention and Care</h2><p>Fortunately, managing hypertension is highly achievable through lifestyle improvements:</p><ol><li><strong>Reduce Sodium Intake:</strong> Limit daily salt intake to under 1,500mg.</li><li><strong>DASH Diet:</strong> Incorporate lean proteins, whole grains, and heavy amounts of potassium-rich fruits and vegetables.</li><li><strong>Cardio Exercise:</strong> Commit to 150 minutes of moderate aerobic activities weekly.</li><li><strong>Manage Stress:</strong> Practice deep breathing, yoga, or mindful meditation daily.</li></ol>' },
    { id: 'art-2', title: '5 Essential Paediatric Nutrients for Active Growth', category: 'Paediatrics', date: 'May 12, 2026', readTime: '4 min read', desc: 'Ensuring your child receives key vitamins and minerals is foundational for physical and mental development. Read about the core nutrients every parent should track.', content: '<p>A child\'s body undergoes rapid transformation and cognitive development. Supplying appropriate micronutrients through a balanced diet laying down robust bones, robust immunity, and active brain development.</p><h2>1. Calcium: Building Dense Bones</h2><p>Calcium is the block-builder for teeth and skeletal strength. During childhood, bones grow and store calcium actively.</p><p><strong>Best Sources:</strong> Milk, cheese, fortified plant milks, yogurt, and broccoli.</p><h2>2. Iron: Fueling Oxygen Delivery</h2><p>Iron helps red blood cells deliver oxygen throughout the body. Iron deficiency is a common nutritional concern among young toddlers and picky eaters.</p><p><strong>Best Sources:</strong> Spinach, beans, red meats, lentils, and fortified grains.</p><h2>3. Vitamin D: The Calcium Companion</h2><p>Vitamin D is essential for calcium absorption in the gut. Without sufficient Vitamin D, calcium cannot do its job.</p><p><strong>Best Sources:</strong> Sunlight exposure, egg yolks, fortified cereals, and fatty fish.</p><h2>4. Omega-3 Fatty Acids: Brain and Eye Health</h2><p>DHA, a type of Omega-3, is a critical building block for cellular growth in the brain and visual tracking.</p><p><strong>Best Sources:</strong> Walnuts, flaxseeds, salmon, and chia seeds.</p><h2>5. Zinc: Boosting Immune Shield</h2><p>Zinc plays a critical role in cellular division, tissue repair, and boosting child immunity against standard seasonal infections.</p><p><strong>Best Sources:</strong> Chickpeas, seeds, poultry, and oats.</p>' },
    { id: 'art-3', title: 'Recovering Safely from Joint Injuries', category: 'Orthopaedics', date: 'May 05, 2026', readTime: '6 min read', desc: 'Joint strains and sports injuries require structured, patient recovery. Explore the R.I.C.E protocol and how medical guidance prevents chronic recurrence.', content: '<p>Joint injuries—whether a sudden ankle sprain or knee ligament strain—can disrupt your active lifestyle. How you manage the initial 48 hours is critical to prevent chronic weakness or recurring issues.</p><h2>The Core R.I.C.E. Protocol</h2><p>For immediate self-care following a minor joint injury, follow these standard steps:</p><ul><li><strong>Rest:</strong> Avoid putting weight or strain on the affected joint immediately.</li><li><strong>Ice:</strong> Apply cold packs wrapped in a thin towel for 15-20 minutes every 3 hours to reduce acute swelling.</li><li><strong>Compression:</strong> Wrap the joint with a supportive elastic bandage snugly (but not tightly enough to restrict blood circulation).</li><li><strong>Elevation:</strong> Keep the injured joint raised above heart level whenever resting to drain pooling fluids.</li></ul><h2>When to Seek Specialist Help</h2><p>Do not rely solely on self-care if you experience any of the following warning signs:</p><ol><li>Complete inability to bear weight or walk.</li><li>Visible joint deformity or severe asymmetry.</li><li>Intense numbness, tingling, or coldness in the digits.</li><li>Severe swelling and bruising that worsens after 24 hours.</li></ol><h2>Physiotherapy: The Bridge to Strength</h2><p>Once initial swelling subsides, structured rehabilitation is vital. Specialist physiotherapists will design exercises to restore full range of motion, strengthen stabilizing muscle groups, and re-train joint proprioception to avoid future injuries.</p>' }
  ]
};

// --- DATA PERSISTENCE METHODS ---
function loadState() {
  const saved = localStorage.getItem('medisphere_state');
  if (saved) {
    try {
      state = JSON.parse(saved);
    } catch (e) {
      console.warn("Could not parse saved state, using default seed data", e);
    }
  } else {
    saveState();
  }
}

function saveState() {
  localStorage.setItem('medisphere_state', JSON.stringify(state));
}

// --- Dynamic Form Filter options ---
function updateDoctorSelectOptions(serviceSelectorId, doctorSelectorId) {
  const serviceSelect = document.getElementById(serviceSelectorId);
  const doctorSelect = document.getElementById(doctorSelectorId);
  if (!serviceSelect || !doctorSelect) return;

  const selectedService = serviceSelect.value;
  
  // Clear existing options, keep the first default one
  doctorSelect.innerHTML = '<option value="">No preference</option>';
  
  if (!selectedService) {
    // Populate all doctors
    state.doctors.forEach(doc => {
      const opt = document.createElement('option');
      opt.value = doc.name;
      opt.textContent = `${doc.name} (${doc.specialty})`;
      doctorSelect.appendChild(opt);
    });
  } else {
    // Filter doctors by selected service specialty
    // A service option value might contain "Cardiology Check-up" or similar, check for partial matches
    const serviceNameClean = selectedService.toLowerCase();
    
    state.doctors.forEach(doc => {
      const docSpecialtyClean = doc.specialty.toLowerCase();
      // Check if doctor specialty is matching the service
      if (serviceNameClean.includes(docSpecialtyClean) || docSpecialtyClean.includes(serviceNameClean)) {
        const opt = document.createElement('option');
        opt.value = doc.name;
        opt.textContent = `${doc.name} (Specialist)`;
        doctorSelect.appendChild(opt);
      }
    });

    // Add other doctors at the bottom under a divider just in case
    let addedDivider = false;
    state.doctors.forEach(doc => {
      const docSpecialtyClean = doc.specialty.toLowerCase();
      if (!serviceNameClean.includes(docSpecialtyClean) && !docSpecialtyClean.includes(serviceNameClean)) {
        if (!addedDivider) {
          const optDiv = document.createElement('option');
          optDiv.disabled = true;
          optDiv.textContent = "--- Other Specialists ---";
          doctorSelect.appendChild(optDiv);
          addedDivider = true;
        }
        const opt = document.createElement('option');
        opt.value = doc.name;
        opt.textContent = `${doc.name} (${doc.specialty})`;
        doctorSelect.appendChild(opt);
      }
    });
  }
}

// --- RENDER DYNAMIC COMPONENT SECTIONS ---
function renderServices() {
  const grid = document.getElementById('services-grid');
  if (!grid) return;
  grid.innerHTML = '';
  
  state.services.forEach((s, idx) => {
    const card = document.createElement('div');
    card.className = `service-card fade-in fade-in-delay-${idx % 3}`;
    card.onclick = () => openBookingModalFromService(s.title);
    card.innerHTML = `
      <div class="service-icon">${s.icon}</div>
      <h3>${s.title}</h3>
      <p>${s.desc}</p>
      <span class="service-link">Book Now →</span>
    `;
    grid.appendChild(card);
  });
}

function renderDoctors() {
  const grid = document.getElementById('doctors-grid');
  if (!grid) return;
  grid.innerHTML = '';
  
  state.doctors.forEach((doc, idx) => {
    const initials = doc.name.split(' ').map(n => n[0]).filter((_, i, a) => i === 0 || i === a.length - 1).join('').toUpperCase();
    const card = document.createElement('div');
    card.className = `doctor-card fade-in fade-in-delay-${idx % 3}`;
    
    // Status text mapping
    let statusClass = 'available';
    let statusLabel = 'Available';
    if (doc.status === 'leave') {
      statusClass = 'leave';
      statusLabel = 'On Leave';
    } else if (doc.status === 'on-call') {
      statusClass = 'on-call';
      statusLabel = 'On-Call';
    }

    card.innerHTML = `
      <div class="doctor-img">
        <div class="doctor-avatar">${initials}</div>
        <span class="doctor-specialty-badge">${doc.specialty}</span>
        <div class="doctor-availability ${statusClass}">
          <span class="dot-indicator"></span>${statusLabel}
        </div>
      </div>
      <div class="doctor-info">
        <h3>${doc.name}, ${doc.qual}</h3>
        <div class="doctor-qual">${doc.specialty} Specialist · ${doc.exp} Years Experience</div>
        <p>${doc.desc}</p>
        <div class="doctor-stats">
          <div class="doctor-stat"><strong>${doc.patients.toLocaleString()}+</strong>Patients</div>
          <div class="doctor-stat"><strong>${doc.rating.toFixed(1)}/5</strong>Rating</div>
          <div class="doctor-stat"><strong>${doc.days}</strong>Schedule</div>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

function renderReviews() {
  const grid = document.getElementById('testimonials-grid');
  if (!grid) return;
  grid.innerHTML = '';
  
  // Filter for approved reviews
  const approvedReviews = state.reviews.filter(r => r.status === 'approved');
  
  approvedReviews.forEach((rev, idx) => {
    const initials = rev.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
    const card = document.createElement('div');
    card.className = `testimonial-card fade-in fade-in-delay-${idx % 3}`;
    
    const starString = '★'.repeat(rev.rating) + '☆'.repeat(5 - rev.rating);
    
    card.innerHTML = `
      <div class="stars">${starString}</div>
      <blockquote>"${rev.quote}"</blockquote>
      <div class="testimonial-author">
        <div class="author-avatar">${initials}</div>
        <div>
          <div class="author-name">${rev.name}</div>
          <div class="author-meta">${rev.meta}</div>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

function renderArticles() {
  const grid = document.getElementById('articles-grid');
  if (!grid) return;
  grid.innerHTML = '';
  
  state.articles.forEach((art, idx) => {
    const card = document.createElement('div');
    card.className = `article-card fade-in fade-in-delay-${idx % 3}`;
    card.onclick = () => showArticleReader(art.id);
    
    // Choose a standard fallback medical background illustration based on category
    let bgUrl = 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=600&q=80'; // general medical
    if (art.category.toLowerCase().includes('cardio')) {
      bgUrl = 'https://images.unsplash.com/photo-1530026405186-ed1ea0ac7a63?auto=format&fit=crop&w=600&q=80';
    } else if (art.category.toLowerCase().includes('paed')) {
      bgUrl = 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=600&q=80';
    } else if (art.category.toLowerCase().includes('ortho')) {
      bgUrl = 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=600&q=80';
    }
    
    card.innerHTML = `
      <div class="article-cover" style="background-image: url('${bgUrl}');">
        <span class="article-category">${art.category}</span>
      </div>
      <div class="article-content">
        <div class="article-meta">
          <span>📅 ${art.date}</span>
          <span>⏱️ ${art.readTime}</span>
        </div>
        <h3>${art.title}</h3>
        <p>${art.desc}</p>
        <span class="article-readmore">Read full article →</span>
      </div>
    `;
    grid.appendChild(card);
  });
}

function updateClinicInfo() {
  // Update footer and contact sections with dynamic state settings
  const clinicAddress = document.getElementById('clinic-address');
  if (clinicAddress) {
    clinicAddress.innerHTML = `
      <strong>📍 Address</strong><br>
      ${state.settings.address.replace(', ', ',<br>')}<br><br>
      <strong>📞 Phone</strong><br>
      ${state.settings.phone}<br><br>
      <strong>🕐 Hours</strong><br>
      ${state.settings.hoursWeek}<br>
      ${state.settings.hoursSun}<br>
      Emergency: 24/7
    `;
  }
}

// --- ARTICLE READER MODAL LOGIC ---
function showArticleReader(articleId) {
  const article = state.articles.find(a => a.id === articleId);
  if (!article) return;

  let bgUrl = 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80';
  if (article.category.toLowerCase().includes('cardio')) {
    bgUrl = 'https://images.unsplash.com/photo-1530026405186-ed1ea0ac7a63?auto=format&fit=crop&w=1200&q=80';
  } else if (article.category.toLowerCase().includes('paed')) {
    bgUrl = 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=1200&q=80';
  } else if (article.category.toLowerCase().includes('ortho')) {
    bgUrl = 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=1200&q=80';
  }

  document.getElementById('reader-hero').style.backgroundImage = `url('${bgUrl}')`;
  document.getElementById('reader-category').textContent = article.category;
  document.getElementById('reader-title').textContent = article.title;
  document.getElementById('reader-meta').innerHTML = `<span>📅 Published on ${article.date}</span> | <span>⏱️ ${article.readTime}</span>`;
  document.getElementById('reader-body').innerHTML = article.content;

  document.getElementById('articleReaderModal').classList.add('open');
  document.body.style.overflow = 'hidden'; // stop background scroll
}

function closeArticleReader() {
  document.getElementById('articleReaderModal').classList.remove('open');
  document.body.style.overflow = '';
}

// --- MULTI-THEME PRESET LOADER ---
function renderTheme(themeName) {
  // Save to state
  state.theme = themeName;
  saveState();

  // Reset classes on body
  document.body.className = '';
  
  if (themeName !== 'navy') {
    document.body.classList.add(`theme-${themeName}`);
  }

  // Update theme selectors
  const selectors = document.querySelectorAll('.theme-select');
  selectors.forEach(sel => {
    sel.value = themeName;
  });
}

// --- BOOKING MODALS LOGIC ---
function openBookingModal() {
  // Populate service selector
  const serviceSelect = document.getElementById('m_service');
  if (serviceSelect) {
    serviceSelect.innerHTML = '<option value="">Select a service...</option>';
    state.services.forEach(s => {
      const opt = document.createElement('option');
      opt.value = s.title;
      opt.textContent = s.title;
      serviceSelect.appendChild(opt);
    });
  }

  updateDoctorSelectOptions('m_service', 'm_doctor');

  // Open modal
  document.getElementById('bookingModal').classList.add('open');
  document.getElementById('bookingForm').style.display = 'block';
  document.getElementById('successState').style.display = 'none';
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('bookingModal').classList.remove('open');
  document.body.style.overflow = '';
  clearValidationErrors('bookingForm');
}

function handleBackdropClick(event) {
  if (event.target === document.getElementById('bookingModal')) {
    closeModal();
  }
}

function openBookingModalFromService(serviceName) {
  openBookingModal();
  const serviceSelect = document.getElementById('m_service');
  if (serviceSelect) {
    serviceSelect.value = serviceName;
    updateDoctorSelectOptions('m_service', 'm_doctor');
  }
}

// --- FORM VALIDATION UTILITIES ---
function validateField(inputElement, validationFn, errorMsgText) {
  const formGroup = inputElement.closest('.form-group');
  if (!formGroup) return true;

  const value = inputElement.value.trim();
  const isValid = validationFn(value);

  let errorElement = formGroup.querySelector('.error-msg');
  if (!errorElement) {
    errorElement = document.createElement('span');
    errorElement.className = 'error-msg';
    formGroup.appendChild(errorElement);
  }

  if (!isValid) {
    formGroup.classList.add('invalid');
    errorElement.textContent = errorMsgText;
    return false;
  } else {
    formGroup.classList.remove('invalid');
    errorElement.textContent = '';
    return true;
  }
}

function clearValidationErrors(formId) {
  const form = document.getElementById(formId);
  if (!form) return;
  form.querySelectorAll('.form-group').forEach(grp => {
    grp.classList.remove('invalid');
    const msg = grp.querySelector('.error-msg');
    if (msg) msg.textContent = '';
  });
}

// Validation predicates
const requiredValidator = val => val.length > 0;
const phoneValidator = val => /^\+?[0-9\s\-]{10,16}$/.test(val);
const dateValidator = val => {
  if (!val) return false;
  const selectedDate = new Date(val);
  selectedDate.setHours(0,0,0,0);
  const today = new Date();
  today.setHours(0,0,0,0);
  return selectedDate >= today;
};

// --- BOOKING FORM SUBMISSION ENGINE ---
function handleHeroBooking() {
  // Hero section form elements
  const card = document.querySelector('.booking-card');
  const nameInp = card.querySelector('input[type="text"]');
  const phoneInp = card.querySelector('input[type="tel"]');
  const dateInp = card.querySelector('input[type="date"]');
  const serviceSel = card.querySelector('select');
  
  // Custom Time preferences from second select in card
  const timeSel = card.querySelectorAll('select')[1]; 

  // Validate hero fields
  let isValid = true;
  isValid = validateField(nameInp, requiredValidator, "Full name is required.") && isValid;
  isValid = validateField(phoneInp, phoneValidator, "Valid 10-14 digit phone is required.") && isValid;
  isValid = validateField(dateInp, dateValidator, "Please choose today or a future date.") && isValid;
  isValid = validateField(serviceSel, requiredValidator, "Please select a medical service.") && isValid;

  if (!isValid) return;

  // Form is valid! Generate and save appointment
  const apt = {
    id: `apt-${Date.now()}`,
    name: nameInp.value.trim(),
    phone: phoneInp.value.trim(),
    email: '',
    date: dateInp.value,
    time: timeSel ? timeSel.value : 'Morning (8:00 – 12:00)',
    service: serviceSel.value,
    doctor: 'No preference',
    concern: 'Booked via Hero Quick Consultation Form.',
    status: 'pending',
    createdAt: new Date().toISOString()
  };

  // Assign doctor based on service if available
  const matchDoc = state.doctors.find(d => d.specialty.toLowerCase() === apt.service.toLowerCase().replace(' check-up', ''));
  if (matchDoc) {
    apt.doctor = matchDoc.name;
  }

  // Push to local database
  state.appointments.push(apt);
  saveState();

  // Reset fields
  nameInp.value = '';
  phoneInp.value = '';
  dateInp.value = '';
  serviceSel.value = '';

  // Open booking modal to show success state directly
  openBookingModal();
  document.getElementById('bookingForm').style.display = 'none';
  document.getElementById('successState').style.display = 'block';

  // Trigger Admin Dashboard view update if opened
  if (window.adminEngine && typeof window.adminEngine.updateDashboardData === 'function') {
    window.adminEngine.updateDashboardData();
  }
}

function submitBooking() {
  const nameInp = document.getElementById('m_name');
  const phoneInp = document.getElementById('m_phone');
  const emailInp = document.getElementById('m_email');
  const dateInp = document.getElementById('m_date');
  const timeSel = document.getElementById('m_time');
  const serviceSel = document.getElementById('m_service');
  const doctorSel = document.getElementById('m_doctor');
  
  // Custom text area in bookingModal
  const concernText = document.querySelector('#bookingModal textarea');

  let isValid = true;
  isValid = validateField(nameInp, requiredValidator, "Full name is required.") && isValid;
  isValid = validateField(phoneInp, phoneValidator, "Valid 10-14 digit phone is required.") && isValid;
  isValid = validateField(dateInp, dateValidator, "Please select a valid date (today or future).") && isValid;
  isValid = validateField(serviceSel, requiredValidator, "Please choose a medical service.") && isValid;

  if (!isValid) return;

  const apt = {
    id: `apt-${Date.now()}`,
    name: nameInp.value.trim(),
    phone: phoneInp.value.trim(),
    email: emailInp.value.trim(),
    date: dateInp.value,
    time: timeSel.value,
    service: serviceSel.value,
    doctor: doctorSel.value || 'No preference',
    concern: concernText ? concernText.value.trim() : '',
    status: 'pending',
    createdAt: new Date().toISOString()
  };

  // Push to local database
  state.appointments.push(apt);
  saveState();

  // Reset modal values
  nameInp.value = '';
  phoneInp.value = '';
  emailInp.value = '';
  dateInp.value = '';
  timeSel.selectedIndex = 0;
  serviceSel.selectedIndex = 0;
  doctorSel.innerHTML = '<option value="">No preference</option>';
  if (concernText) concernText.value = '';

  // Show Success Layout
  document.getElementById('bookingForm').style.display = 'none';
  document.getElementById('successState').style.display = 'block';

  // Trigger Admin Dashboard view update if loaded
  if (window.adminEngine && typeof window.adminEngine.updateDashboardData === 'function') {
    window.adminEngine.updateDashboardData();
  }
}

// --- BOOTSTRAP INIT SYSTEM ---
document.addEventListener('DOMContentLoaded', () => {
  // Load State
  loadState();

  // Active theme setting
  renderTheme(state.theme);

  // Load Content
  renderServices();
  renderDoctors();
  renderReviews();
  renderArticles();
  updateClinicInfo();

  // Sticky Navigation scroll observer
  window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 40);
  });

  // Dynamic animations observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  
  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

  // Service options filters triggers
  const mService = document.getElementById('m_service');
  if (mService) {
    mService.addEventListener('change', () => {
      updateDoctorSelectOptions('m_service', 'm_doctor');
    });
  }

  // Pre-load default values for booking dates (today)
  const todayStr = new Date().toISOString().split('T')[0];
  document.querySelectorAll('input[type="date"]').forEach(el => {
    el.min = todayStr;
  });
});

// Mobile menu toggle
function toggleMenu() {
  const nav = document.getElementById('navbar');
  if (nav) nav.classList.toggle('menu-open');
}

// Accordion FAQ toggle
function toggleFaq(item) {
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
}

// Export modules to global context so structural HTML triggers work
window.openModal = openBookingModal;
window.closeModal = closeModal;
window.handleBackdropClick = handleBackdropClick;
window.submitBooking = submitBooking;
window.handleHeroBooking = handleHeroBooking;
window.toggleMenu = toggleMenu;
window.toggleFaq = toggleFaq;
window.renderTheme = renderTheme;
window.closeArticleReader = closeArticleReader;
window.appState = state;
window.saveAppState = saveState;
window.renderServices = renderServices;
window.renderDoctors = renderDoctors;
window.renderReviews = renderReviews;
window.renderArticles = renderArticles;
window.updateClinicInfo = updateClinicInfo;
