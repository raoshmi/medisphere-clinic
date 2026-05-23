// Administrative Dashboard & CMS Module
const adminEngine = {
  activeTab: 'overview',
  editingItemId: null, // Track currently edited item ID
  editingType: null, // 'service', 'doctor', 'article'

  init() {
    this.addEventHandlers();
  },

  addEventHandlers() {
    // Tab switching event handlers
    const menuItems = document.querySelectorAll('.admin-menu-item');
    menuItems.forEach(item => {
      item.addEventListener('click', () => {
        const tab = item.getAttribute('data-tab');
        this.switchTab(tab);
      });
    });

    // Form Submissions
    const cmsForm = document.getElementById('cmsForm');
    if (cmsForm) {
      cmsForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleCmsSubmit();
      });
    }

    // Search and filters for appointments
    const aptSearch = document.getElementById('apt-search');
    const aptFilter = document.getElementById('apt-filter');
    if (aptSearch) aptSearch.addEventListener('input', () => this.renderAppointmentsTable());
    if (aptFilter) aptFilter.addEventListener('change', () => this.renderAppointmentsTable());
  },

  switchTab(tabName) {
    this.activeTab = tabName;
    
    // Manage sidebar state
    document.querySelectorAll('.admin-menu-item').forEach(item => {
      item.classList.toggle('active', item.getAttribute('data-tab') === tabName);
    });

    // Manage content views
    document.querySelectorAll('.admin-tab-content').forEach(view => {
      view.classList.toggle('active', view.id === `tab-${tabName}`);
    });

    // Execute tab-specific rendering engines
    if (tabName === 'overview') this.renderOverview();
    else if (tabName === 'appointments') this.renderAppointmentsTable();
    else if (tabName === 'services') this.renderServicesTable();
    else if (tabName === 'doctors') this.renderDoctorsTable();
    else if (tabName === 'reviews') this.renderReviewsTable();
    else if (tabName === 'articles') this.renderArticlesTable();
    else if (tabName === 'settings') this.renderSettingsForm();
  },

  chartInstances: {},

  // --- 1. OVERVIEW / ANALYTICS PANEL ---
  renderOverview() {
    // KPI Data Calculations
    const totalApts = window.appState.appointments.length;
    const pendingApts = window.appState.appointments.filter(a => a.status === 'pending').length;
    const activeDocs = window.appState.doctors.length;
    const pendingReviews = window.appState.reviews.filter(r => r.status === 'pending').length;

    // Estimate Revenue (General Consult = ₹800, Specialist = ₹1500)
    let estimatedRevenue = 0;
    window.appState.appointments.forEach(apt => {
      if (apt.status === 'confirmed' || apt.status === 'completed') {
        if (apt.service.toLowerCase().includes('general')) {
          estimatedRevenue += 800;
        } else {
          estimatedRevenue += 1500;
        }
      }
    });

    // Render KPI Cards
    const aptsKpi = document.getElementById('kpi-apts');
    const revKpi = document.getElementById('kpi-revenue');
    const docsKpi = document.getElementById('kpi-docs');
    const revsKpi = document.getElementById('kpi-reviews');

    if (aptsKpi) aptsKpi.textContent = totalApts;
    if (revKpi) revKpi.textContent = `₹${estimatedRevenue.toLocaleString()}`;
    if (docsKpi) docsKpi.textContent = activeDocs;
    if (revsKpi) revsKpi.textContent = pendingReviews;

    // Render dynamic analytics charts
    this.renderChartJSCharts();
  },

  renderChartJSCharts() {
    // 1. Chart bookings trend (Last 7 days)
    const canvasTrend = document.getElementById('chart-bookings-trend');
    const ctxTrend = canvasTrend ? canvasTrend.getContext('2d') : null;
    
    // 2. Specialty distribution
    const canvasSpecialties = document.getElementById('chart-specialties-pie');
    const ctxSpecialties = canvasSpecialties ? canvasSpecialties.getContext('2d') : null;
    
    // 3. OPD Peak hours horizontal bar
    const canvasPeakHours = document.getElementById('chart-peak-hours');
    const ctxPeakHours = canvasPeakHours ? canvasPeakHours.getContext('2d') : null;

    if (!ctxTrend || !ctxSpecialties || !ctxPeakHours) {
      console.warn("Chart canvases not found in DOM");
      return;
    }

    // Destroy existing instances to avoid canvas reuse warning
    if (this.chartInstances.trend) this.chartInstances.trend.destroy();
    if (this.chartInstances.specialties) this.chartInstances.specialties.destroy();
    if (this.chartInstances.peakHours) this.chartInstances.peakHours.destroy();

    // Data for last 7 days
    const trendLabels = [];
    const trendData = [];
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(today.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const count = window.appState.appointments.filter(a => a.date === dateStr).length;
      const dayLabel = d.toLocaleDateString('en-US', { day: '2-digit', month: 'short' });
      trendLabels.push(dayLabel);
      trendData.push(count);
    }

    // Specialty counts
    const specialtiesMap = {};
    window.appState.appointments.forEach(a => {
      specialtiesMap[a.service] = (specialtiesMap[a.service] || 0) + 1;
    });
    // Ensure all registered specialties exist in counts
    window.appState.services.forEach(s => {
      if (!specialtiesMap[s.title]) specialtiesMap[s.title] = 0;
    });

    const specialtiesLabels = Object.keys(specialtiesMap);
    const specialtiesData = Object.values(specialtiesMap);

    // OPD Peak hours calculations: count appointments per slot
    const slotsMap = {
      'Morning (8:00 – 12:00)': 0,
      'Afternoon (12:00 – 16:00)': 0,
      'Evening (16:00 – 19:00)': 0
    };
    window.appState.appointments.forEach(a => {
      for (const slotKey in slotsMap) {
        if (a.time.includes(slotKey.split(' ')[0])) {
          slotsMap[slotKey]++;
          break;
        }
      }
    });

    const slotsLabels = Object.keys(slotsMap);
    const slotsData = Object.values(slotsMap);

    // Style helper (fetch colors from root stylesheet if possible, or fallbacks)
    const isDark = document.body.classList.contains('theme-dark');
    const labelColor = isDark ? '#CCCCCC' : '#475569';
    const gridColor = isDark ? '#333333' : '#E2E8F0';

    // Create Booking Trend Chart
    this.chartInstances.trend = new Chart(ctxTrend, {
      type: 'bar',
      data: {
        labels: trendLabels,
        datasets: [{
          label: 'Bookings',
          data: trendData,
          backgroundColor: 'rgba(29, 158, 117, 0.75)',
          borderColor: '#1D9E75',
          borderWidth: 2,
          borderRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: labelColor }
          },
          y: {
            grid: { color: gridColor },
            ticks: { color: labelColor, stepSize: 1 }
          }
        }
      }
    });

    // Create Specialties Doughnut Chart
    this.chartInstances.specialties = new Chart(ctxSpecialties, {
      type: 'doughnut',
      data: {
        labels: specialtiesLabels,
        datasets: [{
          data: specialtiesData,
          backgroundColor: [
            '#0B1F3A',
            '#1D9E75',
            '#D4A853',
            '#8A2D74',
            '#D46A53',
            '#64748B'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'right',
            labels: { color: labelColor, boxWidth: 12 }
          }
        }
      }
    });

    // Create OPD Peak Hours Load Horizontal Bar Chart
    this.chartInstances.peakHours = new Chart(ctxPeakHours, {
      type: 'bar',
      data: {
        labels: slotsLabels,
        datasets: [{
          label: 'Consultation Load',
          data: slotsData,
          backgroundColor: 'rgba(212, 168, 83, 0.8)',
          borderColor: '#D4A853',
          borderWidth: 2,
          borderRadius: 6
        }]
      },
      options: {
        indexAxis: 'y', // Makes it horizontal
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          x: {
            grid: { color: gridColor },
            ticks: { color: labelColor, stepSize: 1 }
          },
          y: {
            grid: { display: false },
            ticks: { color: labelColor }
          }
        }
      }
    });
  },

  // --- 2. APPOINTMENTS MANAGEMENT CMS PANEL ---
  renderAppointmentsTable() {
    const tbody = document.getElementById('apts-table-body');
    if (!tbody) return;
    tbody.innerHTML = '';

    const searchQuery = (document.getElementById('apt-search')?.value || '').toLowerCase().trim();
    const filterStatus = document.getElementById('apt-filter')?.value || 'all';

    let list = [...window.appState.appointments];

    // Apply Filter
    if (filterStatus !== 'all') {
      list = list.filter(a => a.status === filterStatus);
    }

    // Apply Search
    if (searchQuery) {
      list = list.filter(a => 
        a.name.toLowerCase().includes(searchQuery) ||
        a.phone.includes(searchQuery) ||
        a.service.toLowerCase().includes(searchQuery) ||
        a.doctor.toLowerCase().includes(searchQuery)
      );
    }

    // Sort by date (descending/newest first)
    list.sort((a,b) => new Date(b.date) - new Date(a.date));

    if (list.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; color: var(--slate); padding: 32px;">No appointments found.</td></tr>`;
      return;
    }

    list.forEach(apt => {
      const tr = document.createElement('tr');
      
      const dateFormatted = new Date(apt.date).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });
      
      // Build control action buttons based on status
      let actionButtons = '';
      if (apt.status === 'pending') {
        actionButtons += `
          <button class="btn-table-action confirm" onclick="adminEngine.updateAptStatus('${apt.id}', 'confirmed')">Confirm</button>
          <button class="btn-table-action cancel" onclick="adminEngine.updateAptStatus('${apt.id}', 'cancelled')">Cancel</button>
        `;
      } else if (apt.status === 'confirmed') {
        actionButtons += `
          <button class="btn-table-action" style="border-color: #3b82f6; background: rgba(59,130,246,0.1); color: #2563eb;" onclick="adminEngine.updateAptStatus('${apt.id}', 'completed')">Complete</button>
          <button class="btn-table-action cancel" onclick="adminEngine.updateAptStatus('${apt.id}', 'cancelled')">Cancel</button>
        `;
      }
      
      // Reschedule action & delete
      actionButtons += `
        <button class="btn-table-action" onclick="adminEngine.promptReschedule('${apt.id}')">Reschedule</button>
        <button class="btn-table-action delete" onclick="adminEngine.deleteApt('${apt.id}')">✕</button>
      `;

      tr.innerHTML = `
        <td style="font-weight: 600; color: var(--navy);">${apt.name}</td>
        <td>
          <div style="font-size: 0.85rem; font-weight: 500;">${apt.phone}</div>
          <div style="font-size: 0.75rem; color: var(--slate);">${apt.email || 'No email'}</div>
        </td>
        <td><strong>${dateFormatted}</strong><br><span style="font-size:0.75rem; color: var(--slate);">${apt.time}</span></td>
        <td style="font-size: 0.85rem; font-weight: 500;">${apt.service}</td>
        <td style="font-size: 0.85rem;">${apt.doctor}</td>
        <td><span class="status-badge ${apt.status}">${apt.status}</span></td>
        <td><div style="display: flex; flex-wrap: wrap; gap: 4px;">${actionButtons}</div></td>
      `;
      tbody.appendChild(tr);
    });
  },

  updateAptStatus(aptId, newStatus) {
    const apt = window.appState.appointments.find(a => a.id === aptId);
    if (!apt) return;
    apt.status = newStatus;
    window.saveAppState();
    this.renderAppointmentsTable();

    // Trigger floating SMS toast alert simulation
    if (typeof window.showToastNotification === 'function') {
      window.showToastNotification(`💬 SMS Sent: Hi ${apt.name}, your appointment on ${apt.date} (${apt.time}) is now ${newStatus.toUpperCase()}.`);
    }
  },

  promptReschedule(aptId) {
    const apt = window.appState.appointments.find(a => a.id === aptId);
    if (!apt) return;
    
    const newDate = prompt("Enter new preferred date (YYYY-MM-DD):", apt.date);
    if (!newDate) return;
    
    // Validate date format
    if (!/^\d{4}-\d{2}-\d{2}$/.test(newDate)) {
      alert("Invalid format. Please use YYYY-MM-DD.");
      return;
    }

    apt.date = newDate;
    apt.status = 'confirmed'; // Auto confirm on admin reschedule
    window.saveAppState();
    this.renderAppointmentsTable();

    // Trigger simulated SMS alert
    if (typeof window.showToastNotification === 'function') {
      window.showToastNotification(`💬 SMS Sent: Hi ${apt.name}, your appointment has been Rescheduled to ${newDate} (${apt.time}).`);
    }
  },

  deleteApt(aptId) {
    if (!confirm("Are you sure you want to delete this appointment booking?")) return;
    window.appState.appointments = window.appState.appointments.filter(a => a.id !== aptId);
    window.saveAppState();
    this.renderAppointmentsTable();
  },

  // --- 3. SERVICES CMS PANEL ---
  renderServicesTable() {
    const tbody = document.getElementById('services-table-body');
    if (!tbody) return;
    tbody.innerHTML = '';

    window.appState.services.forEach(s => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td style="font-size: 1.5rem; text-align: center; width: 60px;">${s.icon}</td>
        <td style="font-weight: 600; color: var(--navy);">${s.title}</td>
        <td style="font-size: 0.82rem; max-width: 320px; line-height: 1.5;">${s.desc}</td>
        <td>
          <button class="btn-table-action edit" onclick="adminEngine.openEditCmsPanel('service', '${s.id}')">Edit</button>
          <button class="btn-table-action delete" onclick="adminEngine.deleteCmsItem('service', '${s.id}')">Delete</button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  },

  // --- 4. DOCTORS CMS PANEL ---
  renderDoctorsTable() {
    const tbody = document.getElementById('doctors-table-body');
    if (!tbody) return;
    tbody.innerHTML = '';

    window.appState.doctors.forEach(doc => {
      const initials = doc.name.split(' ').map(n => n[0]).filter((_, i, a) => i === 0 || i === a.length - 1).join('').toUpperCase();
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><div class="author-avatar" style="width:36px; height:36px;">${initials}</div></td>
        <td style="font-weight: 600; color: var(--navy);">${doc.name}, ${doc.qual}</td>
        <td style="font-weight: 500;">${doc.specialty}</td>
        <td>${doc.exp} Years</td>
        <td><span class="status-badge ${doc.status}">${doc.status}</span></td>
        <td>
          <button class="btn-table-action edit" onclick="adminEngine.openEditCmsPanel('doctor', '${doc.id}')">Edit</button>
          <button class="btn-table-action delete" onclick="adminEngine.deleteCmsItem('doctor', '${doc.id}')">Delete</button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  },

  // --- 5. REVIEWS CMS PANEL ---
  renderReviewsTable() {
    const tbody = document.getElementById('reviews-table-body');
    if (!tbody) return;
    tbody.innerHTML = '';

    window.appState.reviews.forEach(rev => {
      const tr = document.createElement('tr');
      const starString = '★'.repeat(rev.rating) + '☆'.repeat(5 - rev.rating);
      
      let actionBtn = '';
      if (rev.status === 'pending') {
        actionBtn = `
          <button class="btn-table-action confirm" onclick="adminEngine.updateReviewStatus('${rev.id}', 'approved')">Approve</button>
          <button class="btn-table-action cancel" onclick="adminEngine.updateReviewStatus('${rev.id}', 'rejected')">Reject</button>
        `;
      } else if (rev.status === 'approved') {
        actionBtn = `<button class="btn-table-action cancel" onclick="adminEngine.updateReviewStatus('${rev.id}', 'rejected')">Hide / Reject</button>`;
      } else {
        actionBtn = `<button class="btn-table-action confirm" onclick="adminEngine.updateReviewStatus('${rev.id}', 'approved')">Approve / Show</button>`;
      }

      tr.innerHTML = `
        <td style="font-weight: 600; color: var(--navy);">${rev.name}</td>
        <td style="font-size:0.8rem; color:var(--slate);">${rev.meta}</td>
        <td style="color:var(--gold); font-size:0.85rem;">${starString}</td>
        <td style="font-size: 0.82rem; font-style: italic; max-width: 280px;">"${rev.quote}"</td>
        <td><span class="status-badge ${rev.status}">${rev.status}</span></td>
        <td>
          <div style="display:flex; gap:4px;">
            ${actionBtn}
            <button class="btn-table-action delete" onclick="adminEngine.deleteReview('${rev.id}')">✕</button>
          </div>
        </td>
      `;
      tbody.appendChild(tr);
    });
  },

  updateReviewStatus(revId, newStatus) {
    const rev = window.appState.reviews.find(r => r.id === revId);
    if (!rev) return;
    rev.status = newStatus;
    window.saveAppState();
    this.renderReviewsTable();
    window.renderReviews(); // live update homepage
  },

  deleteReview(revId) {
    if (!confirm("Are you sure you want to delete this patient review?")) return;
    window.appState.reviews = window.appState.reviews.filter(r => r.id !== revId);
    window.saveAppState();
    this.renderReviewsTable();
    window.renderReviews();
  },

  openAddReviewPrompt() {
    const name = prompt("Enter patient name:");
    if (!name) return;
    const meta = prompt("Enter patient tagline (e.g. Pediatric Patient · Noida):");
    const quote = prompt("Enter patient review description:");
    if (!quote) return;
    const rating = parseInt(prompt("Enter star rating (1 to 5):", "5")) || 5;

    const rev = {
      id: `rev-${Date.now()}`,
      name: name,
      meta: meta || 'Verified Patient',
      rating: Math.min(5, Math.max(1, rating)),
      quote: quote,
      status: 'approved' // auto approve direct adds
    };

    window.appState.reviews.push(rev);
    window.saveAppState();
    this.renderReviewsTable();
    window.renderReviews();
  },

  // --- 6. BLOG CMS PANEL ---
  renderArticlesTable() {
    const tbody = document.getElementById('articles-table-body');
    if (!tbody) return;
    tbody.innerHTML = '';

    window.appState.articles.forEach(art => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td style="font-weight: 600; color: var(--navy);">${art.title}</td>
        <td><span class="status-badge confirmed" style="background:var(--teal-pale); color:var(--teal);">${art.category}</span></td>
        <td style="font-size:0.8rem;">${art.date}</td>
        <td style="font-size:0.8rem;">${art.readTime}</td>
        <td>
          <button class="btn-table-action edit" onclick="adminEngine.openEditCmsPanel('article', '${art.id}')">Edit</button>
          <button class="btn-table-action delete" onclick="adminEngine.deleteCmsItem('article', '${art.id}')">Delete</button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  },

  // --- 7. CLINIC SETTINGS FORM PANEL ---
  renderSettingsForm() {
    const sName = document.getElementById('set-name');
    const sPhone = document.getElementById('set-phone');
    const sEPhone = document.getElementById('set-ephone');
    const sAddress = document.getElementById('set-address');
    const sEmail = document.getElementById('set-email');
    const sHoursW = document.getElementById('set-hoursw');
    const sHoursS = document.getElementById('set-hourss');

    if (sName) sName.value = window.appState.settings.name;
    if (sPhone) sPhone.value = window.appState.settings.phone;
    if (sEPhone) sEPhone.value = window.appState.settings.emergencyPhone;
    if (sAddress) sAddress.value = window.appState.settings.address;
    if (sEmail) sEmail.value = window.appState.settings.email;
    if (sHoursW) sHoursW.value = window.appState.settings.hoursWeek;
    if (sHoursS) sHoursS.value = window.appState.settings.hoursSun;
  },

  saveSettings(e) {
    if (e) e.preventDefault();
    
    window.appState.settings.name = document.getElementById('set-name').value;
    window.appState.settings.phone = document.getElementById('set-phone').value;
    window.appState.settings.emergencyPhone = document.getElementById('set-ephone').value;
    window.appState.settings.address = document.getElementById('set-address').value;
    window.appState.settings.email = document.getElementById('set-email').value;
    window.appState.settings.hoursWeek = document.getElementById('set-hoursw').value;
    window.appState.settings.hoursSun = document.getElementById('set-hourss').value;

    window.saveAppState();
    window.updateClinicInfo();
    alert("Clinic system settings updated successfully!");
  },

  // --- GLOBAL CRUD SIDE PANEL ENGINE ---
  openAddCmsPanel(type) {
    this.editingItemId = null;
    this.editingType = type;
    
    const panelTitle = document.getElementById('panel-title');
    const formBox = document.getElementById('panel-form-fields');
    
    panelTitle.textContent = `Add New ${type.charAt(0).toUpperCase() + type.slice(1)}`;
    formBox.innerHTML = this.getFormFieldsMarkup(type);

    document.getElementById('cmsPanelBackdrop').classList.add('open');
  },

  openEditCmsPanel(type, itemId) {
    this.editingItemId = itemId;
    this.editingType = type;
    
    const panelTitle = document.getElementById('panel-title');
    const formBox = document.getElementById('panel-form-fields');
    
    panelTitle.textContent = `Edit ${type.charAt(0).toUpperCase() + type.slice(1)}`;
    
    // Retrieve Item
    let item = null;
    if (type === 'service') item = window.appState.services.find(s => s.id === itemId);
    else if (type === 'doctor') item = window.appState.doctors.find(d => d.id === itemId);
    else if (type === 'article') item = window.appState.articles.find(a => a.id === itemId);

    if (!item) return;

    // Build form and inject values
    formBox.innerHTML = this.getFormFieldsMarkup(type);
    this.fillFormFields(type, item);

    document.getElementById('cmsPanelBackdrop').classList.add('open');
  },

  closeCmsPanel() {
    document.getElementById('cmsPanelBackdrop').classList.remove('open');
    this.editingItemId = null;
    this.editingType = null;
  },

  getFormFieldsMarkup(type) {
    if (type === 'service') {
      return `
        <div class="form-group">
          <label>Service Title *</label>
          <input type="text" id="f_title" required placeholder="E.g. Ophthalmology">
        </div>
        <div class="form-group">
          <label>Icon Emoji *</label>
          <input type="text" id="f_icon" required placeholder="E.g. 👁️" maxlength="4">
        </div>
        <div class="form-group">
          <label>Description *</label>
          <textarea id="f_desc" rows="4" required placeholder="Describe core aspects of the medical service..."></textarea>
        </div>
      `;
    } else if (type === 'doctor') {
      return `
        <div class="form-group">
          <label>Physician Full Name *</label>
          <input type="text" id="f_name" required placeholder="E.g. Dr. John Doe">
        </div>
        <div class="form-group">
          <label>Specialty *</label>
          <select id="f_specialty" required>
            <option value="Cardiology">Cardiology</option>
            <option value="Orthopaedics">Orthopaedics</option>
            <option value="Neurology">Neurology</option>
            <option value="Paediatrics">Paediatrics</option>
            <option value="General Medicine">General Medicine</option>
            <option value="Diagnostics">Diagnostics & Imaging</option>
          </select>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>Qualifications *</label>
            <input type="text" id="f_qual" required placeholder="E.g. MD, DM">
          </div>
          <div class="form-group">
            <label>Experience (Years) *</label>
            <input type="number" id="f_exp" required min="1" max="60" placeholder="15">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>Schedule Days *</label>
            <input type="text" id="f_days" required placeholder="E.g. Mon–Sat">
          </div>
          <div class="form-group">
            <label>Availability Status *</label>
            <select id="f_status" required>
              <option value="available">Available</option>
              <option value="on-call">On-Call</option>
              <option value="leave">On Leave</option>
            </select>
          </div>
        </div>
        <div class="form-group">
          <label>Biography Summary *</label>
          <textarea id="f_desc" rows="3" required placeholder="Brief clinical background or specialties..."></textarea>
        </div>
      `;
    } else if (type === 'article') {
      return `
        <div class="form-group">
          <label>Article Title *</label>
          <input type="text" id="f_title" required placeholder="How to Maintain Bone Density As You Age">
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>Category *</label>
            <select id="f_category" required>
              <option value="Cardiology">Cardiology</option>
              <option value="Orthopaedics">Orthopaedics</option>
              <option value="Paediatrics">Paediatrics</option>
              <option value="General Wellness">General Wellness</option>
            </select>
          </div>
          <div class="form-group">
            <label>Read Time *</label>
            <input type="text" id="f_readtime" required placeholder="5 min read">
          </div>
        </div>
        <div class="form-group">
          <label>Summary Tagline *</label>
          <input type="text" id="f_desc" required placeholder="A brief one-sentence teaser summary...">
        </div>
        <div class="form-group">
          <label>Rich Content markup (HTML supported) *</label>
          <textarea id="f_content" rows="10" required placeholder="<p>Body copy here...</p><h2>Subheading</h2><p>Additional copy...</p>"></textarea>
        </div>
      `;
    }
    return '';
  },

  fillFormFields(type, item) {
    if (type === 'service') {
      document.getElementById('f_title').value = item.title;
      document.getElementById('f_icon').value = item.icon;
      document.getElementById('f_desc').value = item.desc;
    } else if (type === 'doctor') {
      document.getElementById('f_name').value = item.name;
      document.getElementById('f_specialty').value = item.specialty;
      document.getElementById('f_qual').value = item.qual;
      document.getElementById('f_exp').value = item.exp;
      document.getElementById('f_days').value = item.days;
      document.getElementById('f_status').value = item.status;
      document.getElementById('f_desc').value = item.desc;
    } else if (type === 'article') {
      document.getElementById('f_title').value = item.title;
      document.getElementById('f_category').value = item.category;
      document.getElementById('f_readtime').value = item.readTime;
      document.getElementById('f_desc').value = item.desc;
      document.getElementById('f_content').value = item.content;
    }
  },

  handleCmsSubmit() {
    const type = this.editingType;
    const isEdit = this.editingItemId !== null;

    if (type === 'service') {
      const title = document.getElementById('f_title').value.trim();
      const icon = document.getElementById('f_icon').value.trim();
      const desc = document.getElementById('f_desc').value.trim();

      if (isEdit) {
        const item = window.appState.services.find(s => s.id === this.editingItemId);
        if (item) {
          item.title = title;
          item.icon = icon;
          item.desc = desc;
        }
      } else {
        const item = { id: `serv-${Date.now()}`, title, icon, desc };
        window.appState.services.push(item);
      }
      window.renderServices(); // update homepage
      this.renderServicesTable();
    } 
    else if (type === 'doctor') {
      const name = document.getElementById('f_name').value.trim();
      const specialty = document.getElementById('f_specialty').value;
      const qual = document.getElementById('f_qual').value.trim();
      const exp = parseInt(document.getElementById('f_exp').value) || 5;
      const days = document.getElementById('f_days').value.trim();
      const status = document.getElementById('f_status').value;
      const desc = document.getElementById('f_desc').value.trim();

      if (isEdit) {
        const item = window.appState.doctors.find(d => d.id === this.editingItemId);
        if (item) {
          item.name = name;
          item.specialty = specialty;
          item.qual = qual;
          item.exp = exp;
          item.days = days;
          item.status = status;
          item.desc = desc;
        }
      } else {
        const item = {
          id: `doc-${Date.now()}`,
          name, specialty, qual, exp, days, status, desc,
          patients: 0, rating: 5.0
        };
        window.appState.doctors.push(item);
      }
      window.renderDoctors(); // update homepage
      this.renderDoctorsTable();
    } 
    else if (type === 'article') {
      const title = document.getElementById('f_title').value.trim();
      const category = document.getElementById('f_category').value;
      const readTime = document.getElementById('f_readtime').value.trim();
      const desc = document.getElementById('f_desc').value.trim();
      const content = document.getElementById('f_content').value.trim();

      const dateStr = new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });

      if (isEdit) {
        const item = window.appState.articles.find(a => a.id === this.editingItemId);
        if (item) {
          item.title = title;
          item.category = category;
          item.readTime = readTime;
          item.desc = desc;
          item.content = content;
        }
      } else {
        const item = {
          id: `art-${Date.now()}`,
          title, category, readTime, desc, content,
          date: dateStr
        };
        window.appState.articles.push(item);
      }
      window.renderArticles(); // update homepage
      this.renderArticlesTable();
    }

    // Save and close
    window.saveAppState();
    this.closeCmsPanel();
  },

  deleteCmsItem(type, itemId) {
    if (!confirm(`Are you sure you want to delete this ${type} item?`)) return;

    if (type === 'service') {
      window.appState.services = window.appState.services.filter(s => s.id !== itemId);
      window.renderServices();
      this.renderServicesTable();
    } else if (type === 'doctor') {
      window.appState.doctors = window.appState.doctors.filter(d => d.id !== itemId);
      window.renderDoctors();
      this.renderDoctorsTable();
    } else if (type === 'article') {
      window.appState.articles = window.appState.articles.filter(a => a.id !== itemId);
      window.renderArticles();
      this.renderArticlesTable();
    }

    window.saveAppState();
  },

  // Update whole dashboard variables (triggered by front-end bookings)
  updateDashboardData() {
    if (this.activeTab === 'overview') this.renderOverview();
    else if (this.activeTab === 'appointments') this.renderAppointmentsTable();
  }
};

// Pure ES6 Cryptographic SHA-256 Engine
function sha256(ascii) {
  function rightRotate(value, amount) {
    return (value >>> amount) | (value << (32 - amount));
  }
  
  var mathPow = Math.pow;
  var maxWord = mathPow(2, 32);
  var lengthProperty = 'length';
  var i, j;

  var result = '';
  var words = [];
  var asciiLength = ascii[lengthProperty] * 8;
  
  var hash = sha256.h = sha256.h || [];
  var k = sha256.k = sha256.k || [];
  var primeCounter = k[lengthProperty];

  var isComposite = {};
  for (var candidate = 2; primeCounter < 64; candidate++) {
    if (!isComposite[candidate]) {
      for (i = 0; i < 313; i += candidate) {
        isComposite[i] = candidate;
      }
      hash[primeCounter] = (mathPow(candidate, .5) * maxWord) | 0;
      k[primeCounter++] = (mathPow(candidate, 1 / 3) * maxWord) | 0;
    }
  }
  
  ascii += '\x80';
  while (ascii[lengthProperty] % 64 - 56) ascii += '\x00';
  for (i = 0; i < ascii[lengthProperty]; i++) {
    j = ascii.charCodeAt(i);
    if (j >> 8) return;
    words[i >> 2] |= j << (24 - (i % 4) * 8);
  }
  words[words[lengthProperty]] = ((asciiLength / maxWord) | 0);
  words[words[lengthProperty]] = (asciiLength);
  
  for (j = 0; j < words[lengthProperty];) {
    var w = words.slice(j, j += 16);
    var oldHash = hash.slice(0);
    
    for (i = 0; i < 64; i++) {
      var wItem = w[i];
      if (i >= 16) {
        var s0 = rightRotate(w[i - 15], 7) ^ rightRotate(w[i - 15], 18) ^ (w[i - 15] >>> 3);
        var s1 = rightRotate(w[i - 2], 17) ^ rightRotate(w[i - 2], 19) ^ (w[i - 2] >>> 10);
        wItem = w[i] = (w[i - 16] + s0 + w[i - 7] + s1) | 0;
      }
      
      var temp1 = (hash[7] + (rightRotate(hash[4], 6) ^ rightRotate(hash[4], 11) ^ rightRotate(hash[4], 25)) + // S1
        ((hash[4] & hash[5]) ^ (~hash[4] & hash[6])) + // ch
        k[i] + wItem) | 0;
      var temp2 = ((rightRotate(hash[0], 2) ^ rightRotate(hash[0], 13) ^ rightRotate(hash[0], 22)) + // S0
        ((hash[0] & hash[1]) ^ (hash[0] & hash[2]) ^ (hash[1] & hash[2]))) | 0; // maj
      
      hash = [(temp1 + temp2) | 0].concat(hash);
      hash[4] = (hash[4] + temp1) | 0;
      hash.pop();
    }
    
    for (i = 0; i < 8; i++) {
      hash[i] = (hash[i] + oldHash[i]) | 0;
    }
  }
  
  for (i = 0; i < 8; i++) {
    for (j = 3; j + 1; j--) {
      var b = (hash[i] >> (j * 8)) & 255;
      result += (b < 16 ? '0' : '') + b.toString(16);
    }
  }
  return result;
}

// --- SECURE AUTHENTICATION SYSTEM (CRYPTOGRAPHICALLY HASHED GATES) ---
function openAdminPortal() {
  // Clear modal backdrop and mobile menus first
  const backdrop = document.getElementById('bookingModal');
  if (backdrop) backdrop.classList.remove('open');
  const nav = document.getElementById('navbar');
  if (nav) nav.classList.remove('menu-open');
  
  // Show Admin Login
  document.getElementById('adminLoginBackdrop').classList.add('open');
  document.getElementById('a_username').value = '';
  document.getElementById('a_password').value = '';
}

function closeAdminLogin() {
  document.getElementById('adminLoginBackdrop').classList.remove('open');
}

function authenticateAdmin() {
  const user = document.getElementById('a_username').value.trim();
  const pass = document.getElementById('a_password').value;

  // c7ad44cbad762a5da0a452f9e854fdc1e0e7a52a38015f23e328029001e7cd3e is the SHA-256 hash of admin123
  if (user === 'admin' && sha256(pass) === 'c7ad44cbad762a5da0a452f9e854fdc1e0e7a52a38015f23e328029001e7cd3e') {
    // Authenticated! Close login card
    closeAdminLogin();
    
    // Open administrative panel overlays
    const panel = document.getElementById('adminOverlay');
    panel.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Init admin modules
    adminEngine.init();
    adminEngine.switchTab('overview');
  } else {
    alert("Unauthorized login credentials. Please use default admin accounts.");
  }
}

function logoutAdmin() {
  const panel = document.getElementById('adminOverlay');
  panel.classList.remove('active');
  document.body.style.overflow = '';
}

// Export admin portal functions to structural HTML triggers
window.openAdminPortal = openAdminPortal;
window.closeAdminLogin = closeAdminLogin;
window.authenticateAdmin = authenticateAdmin;
window.logoutAdmin = logoutAdmin;
window.adminEngine = adminEngine;
