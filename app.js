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

// =========================================
// MULTILINGUAL i18n SYSTEM & TRANSLATIONS
// =========================================
let currentLanguage = 'en';

const translations = {
  hi: {
    "nav_about": "हमारे बारे में",
    "nav_services": "सेवाएं",
    "nav_doctors": "हमारे चिकित्सक",
    "nav_articles": "स्वास्थ्य लेख",
    "nav_faq": "पूछे जाने वाले प्रश्न",
    "nav_appointments": "🔑 मेरे अपॉइंटमेंट",
    "nav_book": "अपॉइंटमेंट बुक करें",
    "acc_contrast": "🌓 उच्च कंट्रास्ट",
    "acc_font_plus": "A+",
    "acc_font_minus": "A-",
    "hero_badge": "✦ क्षेत्र के 12,000+ रोगियों द्वारा विश्वसनीय",
    "hero_title": "जहां <em>विशेषज्ञ देखभाल</em><br>सहानुभूति से मिलती है",
    "hero_sub": "बोर्ड-प्रमाणित चिकित्सकों द्वारा व्यक्तिगत, साक्ष्य-आधारित उपचार। आपकी स्वास्थ्य यात्रा एक बातचीत से शुरू होती है।",
    "hero_book_btn": "अपॉइंटमेंट बुक करें →",
    "hero_meet_docs": "हमारे डॉक्टरों से मिलें",
    "hero_stat_1": "उत्कृष्टता के वर्ष",
    "hero_stat_2": "सेवा प्राप्त रोगी",
    "hero_stat_3": "संतुष्टि दर",
    "hero_stat_4": "आपातकालीन सहायता",
    "quick_title": "त्वरित अपॉइंटमेंट",
    "quick_sub": "2 मिनट से कम समय में परामर्श बुक करें",
    "label_name": "पूरा नाम *",
    "label_phone": "फ़ोन नंबर *",
    "label_date": "तारीख *",
    "label_service": "आवश्यक सेवा *",
    "label_time": "पसंदीदा समय",
    "btn_confirm_req": "बुकिंग अनुरोध की पुष्टि करें",
    "secure_data": "आपका व्यक्तिगत डेटा सुरक्षित और HIPAA-अनुपालक है",
    "trust_1_strong": "NABH मान्यता प्राप्त",
    "trust_1_span": "राष्ट्रीय गुणवत्ता मानक",
    "trust_2_strong": "बोर्ड-प्रमाणित चिकित्सक",
    "trust_2_span": "हर विशेषज्ञ की जांच की जाती है",
    "trust_3_strong": "सुरक्षित और गोपनीय",
    "trust_3_span": "HIPAA-अनुपालक डेटा अभ्यास",
    "trust_4_strong": "बीमा स्वीकृत",
    "trust_4_span": "प्रमुख योजनाएं और कैशलेस उपचार",
    "about_badge": "मेडिस्फीयर के बारे में",
    "about_title": "2006 से स्वास्थ्य सेवा उत्कृष्टता की विरासत",
    "about_p1": "मेडिस्फीयर क्लिनिक की स्थापना एक अनूठे दृष्टिकोण के साथ की गई थी: विश्व स्तरीय चिकित्सा देखभाल को सुलभ, गर्म और गहराई से मानवीय बनाना। एक सिंगल परामर्श कक्ष से एक बहु-विशेषज्ञता केंद्र तक, हमारी यात्रा एक समय में एक रोगी के विश्वास से प्रेरित रही है।",
    "about_p2": "विशेषज्ञों की हमारी टीम सहयोगात्मक रूप से काम करती है ताकि यह सुनिश्चित किया जाए कि प्रत्येक रोगी को समग्र, व्यक्तिगत देखभाल मिले — पहले निदान से लेकर पूर्ण सुधार तक।",
    "about_l1": "अंतरराष्ट्रीय स्तर पर प्रशिक्षित और राष्ट्रीय स्तर पर प्रमाणित विशेषज्ञ",
    "about_l2": "अत्याधुनिक नैदानिक और इमेजिंग तकनीक",
    "about_l3": "निरंतर देखभाल के लिए निर्बाध इलेक्ट्रॉनिक स्वास्थ्य रिकॉर्ड",
    "about_l4": "बहुभाषी कर्मचारी यह सुनिश्चित करते हैं कि कोई भी रोगी बिना समझ के न रहे",
    "about_l5": "प्रत्येक उपचार यात्रा के लिए समर्पित रोगी अधिवक्ता",
    "about_btn": "मुलाकात निर्धारित करें →",
    "services_badge": "हमारी विशेषताएं",
    "services_title": "एक ही छत के नीचे व्यापक देखभाल",
    "services_sub": "निवारक जांच से लेकर विशेषज्ञ हस्तक्षेप तक, हम आपके स्वास्थ्य के हर आयाम को कवर करते हैं।",
    "serv-cardio_title": "कार्डियोलॉजी",
    "serv-cardio_desc": "हृदय रोगों का विशेषज्ञ निदान और प्रबंधन — नियमित ईसीजी से लेकर उन्नत हृदय मूल्यांकन और जीवन शैली परामर्श तक।",
    "serv-ortho_title": "अस्थिरोग विज्ञान",
    "serv-ortho_desc": " joints, रीढ़ और हड्डियों की देखभाल फेलोशिप-प्रशिक्षित सर्जनों द्वारा। सर्जिकल और गैर-सर्जिकल दोनों उपचार मार्ग।",
    "serv-neuro_title": "न्यूरोलॉजी",
    "serv-neuro_desc": "माइग्रेन, मिर्गी, स्ट्रोक की रोकथाम और स्मृति विकारों सहित तंत्रिका संबंधी स्थितियों के लिए विशेष निदान और देखभाल।",
    "serv-paed_title": "बाल चिकित्सा",
    "serv-paed_desc": "नवजात शिशुओं से लेकर किशोरावस्था तक समर्पित बाल स्वास्थ्य सेवा। टीकाकरण कार्यक्रम, विकास निगरानी और पोषण मार्गदर्शन।",
    "serv-genmed_title": "सामान्य चिकित्सा",
    "serv-genmed_desc": "किसी भी स्वास्थ्य चिंता के लिए आपका पहला संपर्क बिंदु। संपूर्ण परामर्श, पुरानी बीमारी प्रबंधन और निवारक देखभाल योजना।",
    "serv-diag_title": "डायग्नोस्टिक्स",
    "serv-diag_desc": "रैपिड-रिज़ल्ट पैथोलॉजी, डिजिटल एक्स-रे, अल्ट्रासाउंड और एमआरआई रेफरल साझेदारी के साथ पूर्ण सेवा इन-हाउस प्रयोगशाला।",
    "doctors_badge": "हमारे विशेषज्ञ",
    "doctors_title": "आपकी देखभाल के पीछे के विशेषज्ञों से मिलें",
    "doctors_sub": "हमारे प्रत्येक चिकित्सक के पास दशकों का अनुभव, अंतर्राष्ट्रीय प्रशिक्षण और रोगी-प्रथम दर्शन है।",
    "doc-ritu_desc": "एम्स नई दिल्ली और जॉन्स हॉपकिन्स में प्रशिक्षित। इंटरवेंशनल कार्डियोलॉजी, निवारक देखभाल और हार्ट फेल्योर प्रबंधन के विशेषज्ञ।",
    "doc-arjun_desc": "न्यूनतम आक्रामक संयुक्त प्रतिस्थापन, खेल चोटों और रीढ़ की हड्डी की सर्जरी में विशेषज्ञता। सेंट थॉमस अस्पताल, लंदन में प्रशिक्षित।",
    "doc-priya_desc": "बाल विकास, टीकाकरण कार्यक्रमों और बाल पोषण में एक गर्म और भरोसेमंद विशेषज्ञ। सभी उम्र के रोगियों द्वारा प्रिय।",
    "rev-1_quote": "डॉ. शर्मा ने एक ऐसी हृदय समस्या की पहचान की जिसे दो अन्य क्लीनिक पूरी तरह से चूक गए थे। देखभाल, अनुवर्ती कार्रवाई, पूरी टीम — बिल्कुल असाधारण। मुझे यहाँ एक दूसरे परिवार जैसा महसूस होता है।",
    "rev-2_quote": "अपने 4 साल के बच्चे को डॉक्टर के पास लाना एक दुःस्वप्न हुआ करता था। डॉ. प्रिया के पास बच्चों के साथ ऐसा उपहार है — मेरी बेटी वास्तव में मिलने के लिए कहती है! हमारे लिए पूरा अनुभव बदल गया है।",
    "rev-3_quote": "डॉ. कपूर ने मेरे घुटने के प्रतिस्थापन की सर्जरी की और मैं अपनी अपेक्षा से आधे समय में वापस चलने लगा। फिजियोथेरेपी अनुवर्ती निर्बाध थी। वास्तव में विश्व स्तरीय देखभाल।",
    "art-1_title": "उच्च रक्तचाप को समझना: मूक खतरा",
    "art-1_desc": "उच्च रक्तचाप में अक्सर कोई लक्षण नहीं दिखाई देते हैं, फिर भी यह प्रमुख हृदय जोखिम पैदा करता है। सक्रिय स्क्रीनिंग, आहार समायोजन और आदतों के बारे में जानें।",
    "art-2_title": "सक्रिय विकास के लिए बच्चों के लिए 5 आवश्यक पोषक तत्व",
    "art-2_desc": "यह सुनिश्चित करना कि आपके बच्चे को प्रमुख विटामिन और खनिज मिलें, शारीरिक और मानसिक विकास के लिए बुनियादी है। उन मुख्य पोषक तत्वों के बारे में पढ़ें जिन्हें हर माता-पिता को ट्रैक करना चाहिए।",
    "art-3_title": "जोड़ों की चोटों से सुरक्षित रूप से उबरना",
    "art-3_desc": "जोड़ों के खिंचाव और खेल की चोटों के लिए संरचित, रोगी की वसूली की आवश्यकता होती है। आर.आई.सी.ई प्रोटोकॉल का अन्वेषण करें और कैसे चिकित्सा मार्गदर्शन पुरानी पुनरावृत्ति को रोकता है।",
    "faq_badge": "पूछे जाने वाले प्रश्न",
    "faq_title": "आपके प्रश्न, उत्तर दिए गए",
    "faq_sub": "अपनी पहली यात्रा से पहले और बाद में जानने के लिए सब कुछ।",
    "cta_badge": "पहला कदम उठाएं",
    "cta_title": "आपका स्वास्थ्य इंतजार नहीं कर सकता।<br><em style='font-style: italic;'>आपको भी नहीं करना चाहिए।</em>",
    "cta_sub": "उन हजारों रोगियों में शामिल हों जो अपनी सबसे मूल्यवान संपत्ति — अपने स्वास्थ्य के साथ मेडिस्फीयर पर भरोसा करते हैं।",
    "cta_book": "अपॉइंटमेंट बुक करें",
    "cta_call": "📞 कॉल करें +91 11 4567 0000",
    "footer_desc": "2006 से दयालु, विश्व स्तरीय स्वास्थ्य सेवा प्रदान करना। मान्यता प्राप्त, विश्वसनीय, और हमेशा आपके लिए यहाँ।",
    "footer_col_1": "त्वरित लिंक्स",
    "footer_col_2": "विशेषताएं",
    "footer_col_3": "संपर्क और घंटे",
    "footer_copyright": "© 2025 मेडिस्फीयर क्लिनिक। सभी अधिकार सुरक्षित। इस वेबसाइट की सामग्री केवल सूचनात्मक उद्देश्यों के लिए है और चिकित्सा सलाह का गठन नहीं करती है।",
    "portal_title": "पेशेंट हब पोर्टल",
    "portal_sub": "अपने अपॉइंटमेंट प्रबंधित करें, पुनर्निर्धारण का अनुरोध करें, या बुकिंग रद्द करें।",
    "portal_login_msg": "अपनी पहचान सत्यापित करने के लिए कृपया अपने मेडिकल बुकिंग से जुड़े पूरे नाम और फोन नंबर दर्ज करें।",
    "portal_label_name": "रोगी का पूरा नाम *",
    "portal_label_phone": "पंजीकृत फ़ोन नंबर *",
    "portal_btn_login": "सत्यापित करें और पोर्टल में प्रवेश करें",
    "portal_btn_cancel": "रद्द करें",
    "portal_welcome": "नमस्ते, रोगी",
    "portal_signout": "साइन आउट",
    "portal_sec_title": "आपके निर्धारित परामर्श",
    "portal_no_apts": "आपकी फ़ाइल से जुड़ा कोई अपॉइंटमेंट नहीं है।",
    "admin_welcome": "स्टाफ पोर्टल लॉगिन",
    "admin_sub": "अपॉइंटमेंट और CMS सामग्री प्रबंधित करने के लिए अपने व्यवस्थापक क्रेडेंशियल के साथ लॉग इन करें।"
  }
};

function switchLanguage(lang) {
  currentLanguage = lang;
  localStorage.setItem('medisphere_language', lang);

  // Apply static text replacements using data-i18n attributes
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = translations[lang][key];
      } else {
        el.innerHTML = translations[lang][key];
      }
    } else {
      const defaultVal = el.getAttribute('data-i18n-en') || el.innerHTML;
      el.innerHTML = defaultVal;
    }
  });

  // Re-render dynamic sections with new locale
  renderServices();
  renderDoctors();
  renderReviews();
  renderArticles();
  updateClinicInfo();

  // Active select option update
  const langToggleBtn = document.getElementById('lang-toggle');
  if (langToggleBtn) {
    langToggleBtn.textContent = lang === 'en' ? 'हिन्दी' : 'English';
  }
}

function toggleLanguage() {
  const nextLang = currentLanguage === 'en' ? 'hi' : 'en';
  switchLanguage(nextLang);
  showToastNotification(nextLang === 'hi' ? '🌐 भाषा बदली गई: हिन्दी' : '🌐 Language Switched: English');
}

// =========================================
// WCAG ACCESSIBILITY TOOLBAR UTILITIES
// =========================================
let fontScale = 1.0;

function toggleHighContrast() {
  const active = document.body.classList.toggle('high-contrast-mode');
  localStorage.setItem('medisphere_high_contrast', active ? 'true' : 'false');
  showToastNotification(active ? "🌓 High Contrast Mode Activated" : "🌓 High Contrast Mode Deactivated");
}

function changeFontSize(step) {
  fontScale = Math.min(1.4, Math.max(0.8, fontScale + step));
  document.documentElement.style.fontSize = `${fontScale * 16}px`;
  localStorage.setItem('medisphere_font_scale', fontScale);
  showToastNotification(`🔍 Font Size Adjusted: ${Math.round(fontScale * 100)}%`);
}

// --- DATA PERSISTENCE METHODS (WITH XOR-BASE64 OBFUSCATION) ---
const OBFUSCATION_KEY = 'medisphere_secure_key_2026';

function encryptState(dataStr) {
  let xor = '';
  for (let i = 0; i < dataStr.length; i++) {
    xor += String.fromCharCode(dataStr.charCodeAt(i) ^ OBFUSCATION_KEY.charCodeAt(i % OBFUSCATION_KEY.length));
  }
  return btoa(unescape(encodeURIComponent(xor)));
}

function decryptState(encodedStr) {
  const xor = decodeURIComponent(escape(atob(encodedStr)));
  let out = '';
  for (let i = 0; i < xor.length; i++) {
    out += String.fromCharCode(xor.charCodeAt(i) ^ OBFUSCATION_KEY.charCodeAt(i % OBFUSCATION_KEY.length));
  }
  return out;
}

function loadState() {
  const saved = localStorage.getItem('medisphere_state');
  if (saved) {
    try {
      const decrypted = decryptState(saved);
      state = JSON.parse(decrypted);
    } catch (e) {
      console.warn("Could not parse saved state or integrity failed, using default seed data", e);
    }
  } else {
    saveState();
  }
}

function saveState() {
  const serialized = JSON.stringify(state);
  const encrypted = encryptState(serialized);
  localStorage.setItem('medisphere_state', encrypted);
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

// --- RENDER DYNAMIC COMPONENT SECTIONS (WITH TRANSLATION LOOKUPS) ---
function renderServices() {
  const grid = document.getElementById('services-grid');
  if (!grid) return;
  grid.innerHTML = '';
  
  state.services.forEach((s, idx) => {
    const card = document.createElement('div');
    card.className = `service-card fade-in fade-in-delay-${idx % 3}`;
    card.onclick = () => openBookingModalFromService(s.title);
    
    const title = currentLanguage === 'hi' ? (translations.hi[s.id + '_title'] || s.title) : s.title;
    const desc = currentLanguage === 'hi' ? (translations.hi[s.id + '_desc'] || s.desc) : s.desc;
    const btnText = currentLanguage === 'hi' ? "अभी बुक करें →" : "Book Now →";

    card.innerHTML = `
      <div class="service-icon">${s.icon}</div>
      <h3>${title}</h3>
      <p>${desc}</p>
      <span class="service-link">${btnText}</span>
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
    let statusLabel = currentLanguage === 'hi' ? 'उपलब्ध' : 'Available';
    if (doc.status === 'leave') {
      statusClass = 'leave';
      statusLabel = currentLanguage === 'hi' ? 'छुट्टी पर' : 'On Leave';
    } else if (doc.status === 'on-call') {
      statusClass = 'on-call';
      statusLabel = currentLanguage === 'hi' ? 'ऑन-कॉल' : 'On-Call';
    }

    const specialty = currentLanguage === 'hi' ? (translations.hi[doc.id + '_specialty'] || doc.specialty) : doc.specialty;
    const desc = currentLanguage === 'hi' ? (translations.hi[doc.id + '_desc'] || doc.desc) : doc.desc;
    
    // Localized labels
    const docSpecLabel = currentLanguage === 'hi' ? `${specialty} विशेषज्ञ · ${doc.exp} वर्षों का अनुभव` : `${doc.specialty} Specialist · ${doc.exp} Years Experience`;
    const docStatsPat = currentLanguage === 'hi' ? 'मरीज' : 'Patients';
    const docStatsRat = currentLanguage === 'hi' ? 'रेटिंग' : 'Rating';
    const docStatsSch = currentLanguage === 'hi' ? 'अनुसूची' : 'Schedule';

    card.innerHTML = `
      <div class="doctor-img">
        <div class="doctor-avatar">${initials}</div>
        <span class="doctor-specialty-badge">${specialty}</span>
        <div class="doctor-availability ${statusClass}">
          <span class="dot-indicator"></span>${statusLabel}
        </div>
      </div>
      <div class="doctor-info">
        <h3>${doc.name}, ${doc.qual}</h3>
        <div class="doctor-qual">${docSpecLabel}</div>
        <p>${desc}</p>
        <div class="doctor-stats">
          <div class="doctor-stat"><strong>${doc.patients.toLocaleString()}+</strong>${docStatsPat}</div>
          <div class="doctor-stat"><strong>${doc.rating.toFixed(1)}/5</strong>${docStatsRat}</div>
          <div class="doctor-stat"><strong>${doc.days}</strong>${docStatsSch}</div>
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
    
    const quote = currentLanguage === 'hi' ? (translations.hi[rev.id + '_quote'] || rev.quote) : rev.quote;
    const meta = currentLanguage === 'hi' ? (translations.hi[rev.id + '_meta'] || rev.meta) : rev.meta;

    card.innerHTML = `
      <div class="stars">${starString}</div>
      <blockquote>"${quote}"</blockquote>
      <div class="testimonial-author">
        <div class="author-avatar">${initials}</div>
        <div>
          <div class="author-name">${rev.name}</div>
          <div class="author-meta">${meta}</div>
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
    
    const title = currentLanguage === 'hi' ? (translations.hi[art.id + '_title'] || art.title) : art.title;
    const desc = currentLanguage === 'hi' ? (translations.hi[art.id + '_desc'] || art.desc) : art.desc;
    const readMoreLabel = currentLanguage === 'hi' ? "पूरा लेख पढ़ें →" : "Read full article →";
    
    card.innerHTML = `
      <div class="article-cover" style="background-image: url('${bgUrl}');">
        <span class="article-category">${art.category}</span>
      </div>
      <div class="article-content">
        <div class="article-meta">
          <span>📅 ${art.date}</span>
          <span>⏱️ ${art.readTime}</span>
        </div>
        <h3>${title}</h3>
        <p>${desc}</p>
        <span class="article-readmore">${readMoreLabel}</span>
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

  // Dispatch live notification simulated SMS
  showToastNotification(`💬 SMS Sent: Hello ${apt.name}, your booking request for ${apt.service} is received! Verification Code is 8192.`);

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

  // Dispatch simulated live notifications
  showToastNotification(`💬 SMS Sent: Hi ${apt.name}, appointment request received! Check progress in your Patient Portal.`);

  // Trigger Admin Dashboard view update if loaded
  if (window.adminEngine && typeof window.adminEngine.updateDashboardData === 'function') {
    window.adminEngine.updateDashboardData();
  }
}

// =========================================
// PATIENT PORTAL SYSTEM (PHASE 1 UPGRADE)
// =========================================
let activePatientName = null;
let activePatientPhone = null;

function openPatientPortal() {
  const backdrop = document.getElementById('patientPortalModal');
  if (!backdrop) return;

  const loginBox = document.getElementById('patient-login-box');
  const dashboardBox = document.getElementById('patient-dashboard');

  backdrop.classList.add('open');
  document.body.style.overflow = 'hidden';

  if (activePatientName && activePatientPhone) {
    loginBox.style.display = 'none';
    dashboardBox.style.display = 'block';
    renderPatientPortalAppointments();
  } else {
    loginBox.style.display = 'block';
    dashboardBox.style.display = 'none';
    document.getElementById('p_name').value = '';
    document.getElementById('p_phone').value = '';
    clearValidationErrors('patient-login-box');
  }
}

function closePatientPortal() {
  const backdrop = document.getElementById('patientPortalModal');
  if (backdrop) backdrop.classList.remove('open');
  document.body.style.overflow = '';
}

function authenticatePatient() {
  const nameInp = document.getElementById('p_name');
  const phoneInp = document.getElementById('p_phone');
  
  let isValid = true;
  isValid = validateField(nameInp, requiredValidator, "Full name is required to verify.") && isValid;
  isValid = validateField(phoneInp, phoneValidator, "Valid phone number is required.") && isValid;

  if (!isValid) return;

  const cleanName = nameInp.value.trim().toLowerCase();
  const cleanPhone = phoneInp.value.trim();

  // Search if any booking matches
  const match = state.appointments.find(a => 
    a.name.toLowerCase() === cleanName && 
    (a.phone.replace(/[\s\-]/g, '').includes(cleanPhone.replace(/[\s\-]/g, '')) || 
     cleanPhone.replace(/[\s\-]/g, '').includes(a.phone.replace(/[\s\-]/g, '')))
  );

  if (match) {
    // Verified successfully! Log in
    activePatientName = match.name;
    activePatientPhone = match.phone;
    
    document.getElementById('patient-login-box').style.display = 'none';
    document.getElementById('patient-dashboard').style.display = 'block';
    
    renderPatientPortalAppointments();
    showToastNotification(`🔓 Access Approved: Welcome back, ${match.name}!`);
  } else {
    // Generate dummy verification state for demo purposes if they want to enter but let's notify them
    alert("No active appointments found under this Name and Phone combination. Please verify spelling.");
  }
}

function logoutPatient() {
  activePatientName = null;
  activePatientPhone = null;
  
  document.getElementById('patient-dashboard').style.display = 'none';
  document.getElementById('patient-login-box').style.display = 'block';
  
  document.getElementById('p_name').value = '';
  document.getElementById('p_phone').value = '';
  
  showToastNotification(`🔒 Logged out from patient session.`);
}

function renderPatientPortalAppointments() {
  const container = document.getElementById('patient-apts-timeline');
  const welcomeText = document.getElementById('patient-welcome-msg');
  if (!container || !welcomeText) return;

  welcomeText.textContent = `Hello, ${activePatientName}`;
  container.innerHTML = '';

  const cleanName = activePatientName.toLowerCase();
  const list = state.appointments.filter(a => a.name.toLowerCase() === cleanName);

  // Sort by date newest first
  list.sort((a,b) => new Date(b.date) - new Date(a.date));

  if (list.length === 0) {
    container.innerHTML = `<div style="text-align: center; color: var(--slate); padding: 40px;">No appointments associated with your file.</div>`;
    return;
  }

  list.forEach(apt => {
    const card = document.createElement('div');
    card.className = 'patient-timeline-card';
    
    const dateFormatted = new Date(apt.date).toLocaleDateString('en-US', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' });
    
    // Check if reschedule/cancel buttons should show
    const isUpdatable = apt.status === 'pending' || apt.status === 'confirmed';
    let actionsMarkup = '';
    
    if (isUpdatable) {
      actionsMarkup = `
        <div class="patient-card-actions">
          <button class="btn-portal-action reschedule" onclick="showReschedulePanel('${apt.id}')">Reschedule</button>
          <button class="btn-portal-action cancel" onclick="cancelAppointmentFromPortal('${apt.id}')">Cancel Appointment</button>
        </div>
        
        <!-- Hidden Reschedule Editor Subpanel -->
        <div class="reschedule-subpanel" id="resch-${apt.id}">
          <div class="form-row">
            <div class="form-group" style="margin-bottom:0;">
              <label>Select Date</label>
              <input type="date" id="resch-date-${apt.id}" min="${new Date().toISOString().split('T')[0]}" value="${apt.date}">
            </div>
            <div class="form-group" style="margin-bottom:0;">
              <label>Select Time</label>
              <select id="resch-time-${apt.id}">
                <option ${apt.time.includes('Morning') ? 'selected' : ''}>Morning (8:00 – 12:00)</option>
                <option ${apt.time.includes('Afternoon') ? 'selected' : ''}>Afternoon (12:00 – 16:00)</option>
                <option ${apt.time.includes('Evening') ? 'selected' : ''}>Evening (16:00 – 19:00)</option>
              </select>
            </div>
          </div>
          <div style="display:flex; gap:8px; margin-top:12px;">
            <button class="btn-portal-action confirm" onclick="confirmRescheduleFromPortal('${apt.id}')">Save Changes</button>
            <button class="btn-portal-action" style="background:#f1f5f9; color:var(--text-mid);" onclick="hideReschedulePanel('${apt.id}')">Cancel</button>
          </div>
        </div>
      `;
    }

    card.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:12px; flex-wrap:wrap; gap:8px;">
        <div>
          <span class="status-badge ${apt.status}">${apt.status}</span>
          <h4 style="font-size:1.15rem; color:var(--navy); margin-top:6px;">${apt.service}</h4>
        </div>
        <div style="text-align:right;">
          <strong style="color:var(--navy); font-size:0.95rem;">📅 ${dateFormatted}</strong>
          <div style="font-size:0.8rem; color:var(--slate); margin-top:2px;">🕒 ${apt.time}</div>
        </div>
      </div>
      <p style="font-size:0.85rem; color:var(--text-mid); margin-bottom:12px; border-left:3px solid var(--teal-pale); padding-left:12px;">
        <strong>Doctor:</strong> ${apt.doctor}<br>
        <strong>Reason:</strong> ${apt.concern || 'General consultation.'}
      </p>
      ${actionsMarkup}
    `;
    container.appendChild(card);
  });
}

function cancelAppointmentFromPortal(aptId) {
  if (!confirm("Are you sure you want to cancel this appointment consultation?")) return;

  const apt = state.appointments.find(a => a.id === aptId);
  if (!apt) return;

  apt.status = 'cancelled';
  saveState();
  renderPatientPortalAppointments();

  // Send simulated SMS alert
  showToastNotification(`💬 SMS Sent: Hello ${apt.name}, your appointment with ${apt.doctor} is successfully Cancelled. - MediSphere.`);

  // Sync admin dashboard views
  if (window.adminEngine && typeof window.adminEngine.updateDashboardData === 'function') {
    window.adminEngine.updateDashboardData();
  }
}

function showReschedulePanel(aptId) {
  const panel = document.getElementById(`resch-${aptId}`);
  if (panel) panel.classList.add('open');
}

function hideReschedulePanel(aptId) {
  const panel = document.getElementById(`resch-${aptId}`);
  if (panel) panel.classList.remove('open');
}

function confirmRescheduleFromPortal(aptId) {
  const apt = state.appointments.find(a => a.id === aptId);
  if (!apt) return;

  const dateInp = document.getElementById(`resch-date-${aptId}`);
  const timeSel = document.getElementById(`resch-time-${aptId}`);

  if (!dateInp || !timeSel) return;

  const newDate = dateInp.value;
  const newTime = timeSel.value;

  // Validation
  if (!dateValidator(newDate)) {
    alert("Please select a valid future date.");
    return;
  }

  apt.date = newDate;
  apt.time = newTime;
  apt.status = 'pending'; // Reset status to pending for staff review
  saveState();
  
  renderPatientPortalAppointments();
  showToastNotification(`💬 SMS Sent: Reschedule request received! Your appointment is requested for ${newDate} (${newTime}).`);

  // Sync admin dashboard views
  if (window.adminEngine && typeof window.adminEngine.updateDashboardData === 'function') {
    window.adminEngine.updateDashboardData();
  }
}

// =========================================
// FLOATING SMS/EMAIL NOTIFICATION SIMULATOR
// =========================================
function showToastNotification(message) {
  let container = document.getElementById('notificationContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'notificationContainer';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast-notification';
  toast.innerHTML = `
    <div style="font-weight:700; color:var(--navy); margin-bottom:4px; font-size:0.8rem; display:flex; align-items:center; gap:6px;">
      <span>📱</span> MOBILE SMS CONFIRMATION
    </div>
    <div style="font-size:0.82rem; color:var(--text-dark); line-height:1.4;">${message}</div>
  `;

  container.appendChild(toast);

  // Trigger sound simulation or active vibration triggers in premium frameworks if needed
  
  // Set timeout to dismiss
  setTimeout(() => {
    toast.style.animation = 'toastOut 0.4s cubic-bezier(0.4, 0, 1, 1) forwards';
    setTimeout(() => {
      toast.remove();
    }, 450);
  }, 6000);
}

// --- BOOTSTRAP INIT SYSTEM ---
document.addEventListener('DOMContentLoaded', () => {
  loadState();
  renderTheme(state.theme);

  // Restore accessibility and language settings
  const savedLang = localStorage.getItem('medisphere_language') || 'en';
  switchLanguage(savedLang);

  const highContrast = localStorage.getItem('medisphere_high_contrast') === 'true';
  if (highContrast) {
    document.body.classList.add('high-contrast-mode');
  }

  const savedScale = localStorage.getItem('medisphere_font_scale');
  if (savedScale) {
    fontScale = parseFloat(savedScale);
    document.documentElement.style.fontSize = `${fontScale * 16}px`;
  }

  renderServices();
  renderDoctors();
  renderReviews();
  renderArticles();
  updateClinicInfo();

  // Register service worker for PWA
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
      .then(reg => console.log('Service Worker registered successfully with scope:', reg.scope))
      .catch(err => console.error('Service Worker registration failed:', err));
  }

  window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 40);
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  
  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

  const mService = document.getElementById('m_service');
  if (mService) {
    mService.addEventListener('change', () => {
      updateDoctorSelectOptions('m_service', 'm_doctor');
    });
  }

  const todayStr = new Date().toISOString().split('T')[0];
  document.querySelectorAll('input[type="date"]').forEach(el => {
    el.min = todayStr;
  });
});

function toggleMenu() {
  const nav = document.getElementById('navbar');
  if (nav) nav.classList.toggle('menu-open');
}

function toggleFaq(item) {
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
}

// Window Exports
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

// Patient Portal Exports
window.openPatientPortal = openPatientPortal;
window.closePatientPortal = closePatientPortal;
window.authenticatePatient = authenticatePatient;
window.logoutPatient = logoutPatient;
window.cancelAppointmentFromPortal = cancelAppointmentFromPortal;
window.showReschedulePanel = showReschedulePanel;
window.hideReschedulePanel = hideReschedulePanel;
window.confirmRescheduleFromPortal = confirmRescheduleFromPortal;
window.showToastNotification = showToastNotification;

// Language & Accessibility Exports
window.switchLanguage = switchLanguage;
window.toggleLanguage = toggleLanguage;
window.toggleHighContrast = toggleHighContrast;
window.changeFontSize = changeFontSize;
