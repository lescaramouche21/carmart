const modules = [
  {
    id: 'fase-1',
    title: 'Fase 1 · Basis theorie Suriname',
    focus: 'theorie',
    duration: '1 week',
    points: [
      'Surinaamse verkeersborden & voorrangsregels',
      'Aanmelden bij het Centraal Bureau voor Rijbewijzen',
      'Quizzen met lokale verkeerscases',
    ],
  },
  {
    id: 'fase-2',
    title: 'Fase 2 · Voertuigbeheersing',
    focus: 'praktijk',
    duration: '2 weken',
    points: [
      'Starten, sturen & bijzondere verrichtingen links van de weg',
      'Camerabeelden vanuit bestuurdersperspectief in Paramaribo',
      'Checklist voor jouw volgende praktijkrit over de Ringweg',
    ],
  },
  {
    id: 'fase-3',
    title: 'Fase 3 · Verkeerstechniek',
    focus: 'praktijk',
    duration: '2 weken',
    points: [
      'Inhalen, ritsen en bruggen zoals de Wijdenboschbrug',
      'Anticiperen in druk stadsverkeer rond het Onafhankelijkheidsplein',
      'Reflectieopdrachten na elke rit door Paramaribo-Zuid',
    ],
  },
  {
    id: 'fase-4',
    title: 'Fase 4 · Examencoaching',
    focus: 'examen',
    duration: '1 week',
    points: [
      'Stap-voor-stap examenplanning bij het CBR-SU',
      'Voorbeelden van examenvragen & valkuilen op Surinaamse kruisingen',
      'Mentale voorbereiding en ontspanningstechnieken voor examenroutes',
    ],
  },
  {
    id: 'bonus',
    title: 'Bonus · Zelfstandig oefenen',
    focus: 'praktijk',
    duration: 'Doorlopend',
    points: [
      'Downloadbare routes door Paramaribo en Wanica',
      'Dagboek voor vorderingen in de lesauto',
      'Extra tips voor rijden in tropische regen en avondspits',
    ],
  },
  {
    id: 'community',
    title: 'Community sessies',
    focus: 'theorie',
    duration: 'Iedere vrijdag',
    points: [
      'Live Q&A met instructeur van Rijschool Climax',
      'Bespreek lastige verkeerssituaties op de Oost-Westverbinding',
      'Netwerk met andere leerlingen in Suriname',
    ],
  },
];

const videos = [
  {
    id: 'vid-1',
    title: 'Kijken, observeren & spiegelen in Paramaribo',
    type: 'praktijk',
    length: '12:48',
    isLive: true,
    image:
      'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=900&q=80',
    url: 'https://www.youtube.com/watch?v=rJq7cV1JbUY',
    summary: 'Leer hoe je actief scant en veilig van rijstrook wisselt rond het Onafhankelijkheidsplein.',
  },
  {
    id: 'vid-2',
    title: 'Snelwegen en bruggen zonder stress',
    type: 'praktijk',
    length: '09:36',
    image:
      'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=900&q=80',
    url: 'https://www.youtube.com/watch?v=Q3D1fLwWf0c',
    summary: 'In- en uitvoegen, kijktechniek en snelheid kiezen op de Jules Wijdenboschbrug en Ringweg.',
  },
  {
    id: 'vid-3',
    title: 'Theorie essentials: Surinaamse voorrang',
    type: 'theorie',
    length: '14:22',
    image:
      'https://images.unsplash.com/photo-1533237264985-ee5053c4e159?auto=format&fit=crop&w=900&q=80',
    url: 'https://www.youtube.com/watch?v=9h0vG96h0aY',
    summary: 'Alle voorrangssituaties stap voor stap uitgelegd volgens het Surinaamse verkeersreglement.',
  },
  {
    id: 'vid-4',
    title: 'Praktijkexamen walkthrough Paramaribo',
    type: 'examen',
    length: '18:05',
    image:
      'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?auto=format&fit=crop&w=900&q=80',
    url: 'https://www.youtube.com/watch?v=6zBgMbdcQwM',
    summary: 'Volg een volledige examenrit met commentaar van instructeur en examinator van het CBR-SU.',
  },
  {
    id: 'vid-5',
    title: 'Parkeren tussen twee auto\'s bij Hermitage Mall',
    type: 'praktijk',
    length: '07:51',
    image:
      'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=900&q=80',
    url: 'https://www.youtube.com/watch?v=gYQ0B47Lbyw',
    summary: 'Stapsgewijze uitleg met bovenaanzicht en stuurbewegingen op drukke parkeerplaatsen.',
  },
  {
    id: 'vid-6',
    title: 'Examentraining theorie Suriname',
    type: 'examen',
    length: '11:30',
    image:
      'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=900&q=80',
    url: 'https://www.youtube.com/watch?v=Nza5gT8QkqY',
    summary: 'Maak een mini-proefexamen en kijk mee met de uitleg van elke vraag volgens Surinaamse richtlijnen.',
  },
];

const moduleGrid = document.getElementById('moduleGrid');
const videoGrid = document.getElementById('videoGrid');
const filterButtons = document.querySelectorAll('.filter');
const contactForm = document.getElementById('contactForm');
const toast = document.getElementById('toast');
const submitButton = contactForm?.querySelector('button[type="submit"]');
const liveStatus = document.getElementById('liveStatus');

function createModuleCard(module) {
  const article = document.createElement('article');
  article.className = 'module-card';
  article.innerHTML = `
    <header>
      <h3>${module.title}</h3>
      <span class="chip">${module.duration}</span>
    </header>
    <ul>
      ${module.points.map((point) => `<li>${point}</li>`).join('')}
    </ul>
    <footer>
      <span class="tag ${module.focus}">${module.focus}</span>
    </footer>
  `;
  return article;
}

function renderModules() {
  if (!moduleGrid) return;
  modules.forEach((module) => moduleGrid.appendChild(createModuleCard(module)));
}

function createVideoCard(video, isFeatured = false) {
  const article = document.createElement('article');
  article.className = `video-card${isFeatured ? ' featured' : ''}`;
  article.innerHTML = `
    <div class="video-thumb">
      <img src="${video.image}" alt="${video.title}" loading="lazy" />
      ${
        video.isLive
          ? '<span class="live-pill" aria-label="Live les">Live les</span>'
          : ''
      }
      <span class="badge">${video.length}</span>
    </div>
    <div class="video-body">
      <h3>${video.title}</h3>
      <p>${video.summary}</p>
      <div class="video-meta">
        <span class="tag ${video.type}">${video.type}</span>
        <a class="secondary" href="${video.url}" target="_blank" rel="noopener">Bekijk les</a>
      </div>
    </div>
  `;
  return article;
}

function renderVideos(filter = 'alle') {
  if (!videoGrid) return;
  videoGrid.innerHTML = '';

  updateLiveStatus();

  const filteredVideos =
    filter === 'alle' ? videos : videos.filter((video) => video.type === filter);

  const liveVideo = filteredVideos.find((video) => video.isLive);

  if (liveVideo) {
    videoGrid.appendChild(createVideoCard(liveVideo, true));
  }

  filteredVideos.forEach((video) => {
    if (liveVideo && video.id === liveVideo.id) return;
    videoGrid.appendChild(createVideoCard(video));
  });

  if (filteredVideos.length === 0) {
    videoGrid.innerHTML = `
      <div class="video-empty">
        <h3>Geen lessen in deze categorie (nog) beschikbaar.</h3>
        <p>Laat je e-mailadres achter zodat we je een update sturen zodra er nieuwe content is.</p>
      </div>
    `;
  }
}

function updateLiveStatus() {
  if (!liveStatus) return;
  const hasLive = videos.some((video) => video.isLive);
  liveStatus.textContent = hasLive
    ? 'Live les nu bezig'
    : 'Momenteel geen live lessen';
  liveStatus.className = `live-status ${hasLive ? 'active' : 'inactive'}`;
}

function updateFilterState(activeFilter) {
  filterButtons.forEach((button) => {
    const isActive = button.dataset.filter === activeFilter;
    button.classList.toggle('active', isActive);
    button.setAttribute('aria-selected', String(isActive));
  });
}

function handleFilterClick(event) {
  const button = event.currentTarget;
  const filter = button.dataset.filter;
  updateFilterState(filter);
  renderVideos(filter);
}

function showToast(message, type = 'success') {
  if (!toast) return;
  toast.textContent = message;
  toast.className = `toast ${type} show`;
  setTimeout(() => toast?.classList.remove('show'), 3500);
}

function scrollToSection(selector) {
  const target = document.querySelector(selector);
  if (target) {
    target.scrollIntoView({ behavior: 'smooth' });
  }
}

function initSmoothScroll() {
  document.querySelectorAll('[data-scroll]').forEach((trigger) => {
    trigger.addEventListener('click', () => scrollToSection(trigger.dataset.scroll));
  });

  document.querySelectorAll('.nav-links a').forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      scrollToSection(link.getAttribute('href'));
    });
  });
}

function initFilters() {
  filterButtons.forEach((button) => button.addEventListener('click', handleFilterClick));
}

async function submitContactForm(event) {
  if (!contactForm) return;
  event.preventDefault();

  const formData = new FormData(contactForm);
  const payload = {
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    selectedPackage: formData.get('package'),
    message: formData.get('message'),
  };

  const originalButtonText = submitButton?.textContent;
  submitButton?.setAttribute('disabled', 'true');
  submitButton?.classList.add('loading');
  if (submitButton) {
    submitButton.textContent = 'Versturen...';
  }

  try {
    const response = await fetch('/.netlify/functions/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const result = await response.json().catch(() => ({}));

    if (!response.ok) {
      const message =
        result?.message ||
        'Versturen mislukt. Controleer je invoer of probeer het later opnieuw.';
      showToast(message, 'error');
      return;
    }

    const successMessage =
      result?.message ||
      `Bedankt ${payload.name}! We sturen je binnen 24 uur een persoonlijke planning.`;
    showToast(successMessage, 'success');
    contactForm.reset();
  } catch (error) {
    console.error('Contactformulier verzenden mislukt', error);
    showToast(
      'Kon geen verbinding maken met de server. Probeer het later opnieuw of bel ons direct.',
      'error',
    );
  } finally {
    submitButton?.removeAttribute('disabled');
    submitButton?.classList.remove('loading');
    if (submitButton && originalButtonText) {
      submitButton.textContent = originalButtonText;
    }
  }
}

function initContactForm() {
  contactForm?.addEventListener('submit', submitContactForm);
}

function initFaq() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item) => {
    const button = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    button?.addEventListener('click', () => {
      const isExpanded = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', String(!isExpanded));
      answer?.classList.toggle('open', !isExpanded);
    });
  });
}

function setCurrentYear() {
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = String(new Date().getFullYear());
  }
}

function init() {
  renderModules();
  renderVideos();
  initSmoothScroll();
  initFilters();
  initContactForm();
  initFaq();
  setCurrentYear();
}

init();
