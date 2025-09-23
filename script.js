const listings = [
  {
    id: 'car-1',
    title: 'Toyota Yaris RS Touring',
    tier: 'Elite verified',
    price: 3950,
    year: 2008,
    mileage: '148,000 km',
    location: 'Paramaribo',
    description:
      'Sport-tuned RS trim with CarSpot concierge inspection, rally aero kit, and full maintenance dossier.',
    perks: ['One-owner history', 'Full concierge photo set', 'Includes performance spares'],
    image:
      'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'car-2',
    title: 'Nissan X-Trail Platinum AWD',
    tier: 'Concierge certified',
    price: 43800,
    year: 2021,
    mileage: '22,500 km',
    location: 'Commewijne',
    description:
      'Executive AWD spec with panoramic roof, adaptive cruise, and 360° camera suite. Dealer serviced.',
    perks: ['Panoramic sunroof', 'Factory warranty active', 'CarSpot concierge delivery'],
    image:
      'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'car-3',
    title: 'BMW 320i M Sport Shadow',
    tier: 'Elite verified',
    price: 52900,
    year: 2020,
    mileage: '31,400 km',
    location: 'Paramaribo',
    description:
      'Shadow Edition sedan with M Sport styling, digital cockpit, and full CarSpot ceramic protection.',
    perks: ['Adaptive LED headlights', 'Ceramic exterior protection', 'Two years concierge service'],
    image:
      'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'car-4',
    title: 'Suzuki Jimny Heritage',
    tier: 'Concierge certified',
    price: 28750,
    year: 2019,
    mileage: '18,900 km',
    location: 'Nickerie',
    description:
      'Iconic 4x4 in heritage green. Concierge-detailed with safari accessories and navigation upgrade.',
    perks: ['Safari rack & ladder', 'CarPlay navigation upgrade', 'Includes two-year maintenance plan'],
    image:
      'https://images.unsplash.com/photo-1542282088-fe8426682b8f?auto=format&fit=crop&w=1200&q=80',
  },
];

const navbar = document.querySelector('.navbar');
const navToggle = document.querySelector('.menu-toggle');
const carGrid = document.getElementById('carGrid');
const priceFilter = document.getElementById('priceFilter');
const priceValue = document.getElementById('priceValue');
const sellForm = document.getElementById('sellForm');
const messageForm = document.getElementById('messageForm');
const vehicleSelect = document.getElementById('vehicleSelect');
const toast = document.getElementById('toast');

if (navbar && navToggle) {
  const closeNav = (shouldFocus = false) => {
    navbar.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    if (shouldFocus) {
      navToggle.focus();
    }
  };

  navToggle.addEventListener('click', () => {
    const isOpen = navbar.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  const navInteractive = navbar.querySelectorAll('.nav-links a, .nav-group .cta');
  navInteractive.forEach((element) => {
    element.addEventListener('click', () => {
      if (navbar.classList.contains('is-open')) {
        closeNav();
      }
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && navbar.classList.contains('is-open')) {
      closeNav(true);
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 900 && navbar.classList.contains('is-open')) {
      closeNav();
    }
  });
}

function renderListings(maxPrice = Number.MAX_SAFE_INTEGER) {
  const filtered = listings.filter((listing) => listing.price <= maxPrice);
  carGrid.innerHTML = '';

  filtered.forEach((listing) => {
    const card = document.createElement('article');
    card.className = 'card';
    const perks = listing.perks
      ?.map((perk) => `<li><span>+</span>${perk}</li>`)
      .join('') || '';

    card.innerHTML = `
      <div class="card-media">
        <img src="${listing.image}" alt="${listing.title}" loading="lazy" />
      </div>
      <div class="card-body">
        <div class="card-header">
          <span class="badge">${listing.tier}</span>
          <h3>${listing.title}</h3>
        </div>
        <p>${listing.description}</p>
        <ul class="card-perks">${perks}</ul>
        <div class="card-meta">
          <span>${listing.year}</span>
          <span>${listing.mileage}</span>
          <span>${listing.location}</span>
        </div>
        <div class="card-footer">
          <strong>${formatCurrency(listing.price)}</strong>
          <button type="button" data-message="${listing.id}">Message seller</button>
        </div>
      </div>
    `;
    carGrid.appendChild(card);
  });

  if (filtered.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'card card-empty';
    empty.innerHTML = `
      <div class="card-body">
        <h3>No cars match your filter… yet!</h3>
        <p>Adjust the price range or check back as new concierge listings go live.</p>
      </div>
    `;
    carGrid.appendChild(empty);
  }

  updateVehicleOptions(filtered);
}

function updateVehicleOptions(listingsToShow) {
  vehicleSelect.innerHTML = '<option value="" disabled selected>Select a vehicle</option>';
  listingsToShow.forEach((listing) => {
    const option = document.createElement('option');
    option.value = listing.id;
    option.textContent = `${listing.title} — ${formatCurrency(listing.price)}`;
    vehicleSelect.appendChild(option);
  });
}

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

function formatCurrency(value) {
  return currencyFormatter.format(value);
}

function updatePriceDisplay() {
  if (!priceFilter || !priceValue) return;
  priceValue.textContent = formatCurrency(Number(priceFilter.value));
}

function showToast(message, type = 'success') {
  toast.textContent = message;
  toast.className = `toast show ${type}`;
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

function scrollToSection(selector) {
  const target = document.querySelector(selector);
  if (target) {
    target.scrollIntoView({ behavior: 'smooth' });
  }
}

document.querySelectorAll('[data-scroll]').forEach((trigger) => {
  trigger.addEventListener('click', () => scrollToSection(trigger.dataset.scroll));
});

priceFilter?.addEventListener('input', (event) => {
  const max = Number(event.target.value);
  updatePriceDisplay();
  renderListings(max);
});

carGrid?.addEventListener('click', (event) => {
  const button = event.target.closest('button[data-message]');
  if (button) {
    const id = button.dataset.message;
    vehicleSelect.value = id;
    scrollToSection('#contact');
    showToast('Ready to connect — your message will be relayed via concierge.');
  }
});

sellForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(sellForm);

  const newListing = {
    id: `car-${Date.now()}`,
    title: formData.get('model'),
    tier: 'Pending verification',
    price: Number(formData.get('price')),
    year: Number(formData.get('year')),
    mileage: 'New listing',
    location: 'Awaiting concierge review',
    description: formData.get('description'),
    perks: ['Verification in progress', 'Concierge onboarding scheduled'],
    image:
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80',
  };

  listings.unshift(newListing);

  if (priceFilter) {
    const sliderStep = Number(priceFilter.step) || 1000;
    const currentMax = Number(priceFilter.max);
    if (newListing.price > currentMax) {
      const adjustedMax = Math.ceil(newListing.price / sliderStep) * sliderStep;
      priceFilter.max = adjustedMax;
      priceFilter.value = adjustedMax;
    } else {
      const desiredValue = Math.max(Number(priceFilter.value), newListing.price);
      priceFilter.value = Math.ceil(desiredValue / sliderStep) * sliderStep;
    }
    updatePriceDisplay();
    renderListings(Number(priceFilter.value));
  } else {
    renderListings();
  }
  sellForm.reset();
  showToast('Thanks! Our concierge team will review your documents shortly.');
});

messageForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(messageForm);
  const buyerName = formData.get('buyerName');
  const vehicleId = formData.get('vehicle');
  const listing = listings.find((item) => item.id === vehicleId);

  if (!listing) {
    showToast('Please select a vehicle to message the seller.', 'error');
    return;
  }

  showToast(`Message sent to the ${listing.title} concierge. Expect a reply soon, ${buyerName}!`);
  messageForm.reset();
});

function init() {
  const now = new Date();
  document.getElementById('year').textContent = now.getFullYear();
  if (priceFilter) {
    const sliderStep = Number(priceFilter.step) || 1000;
    const highestPrice = listings.reduce(
      (max, listing) => Math.max(max, listing.price),
      0
    );
    const adjustedMax = Math.ceil(highestPrice / sliderStep) * sliderStep;
    if (adjustedMax > Number(priceFilter.max)) {
      priceFilter.max = adjustedMax;
    }
    priceFilter.value = priceFilter.max;
    updatePriceDisplay();
    renderListings(Number(priceFilter.value));
  } else {
    renderListings();
  }
}

init();
