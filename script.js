const listings = [
  {
    id: 'car-1',
    title: 'Toyota Hilux Adventure',
    price: 185000,
    year: 2019,
    mileage: '45,000 km',
    location: 'Paramaribo',
    description:
      'Double cab, 4x4, fully serviced with maintenance records. Ideal for Suriname terrain.',
    image:
      'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'car-2',
    title: 'Hyundai Creta Urban',
    price: 142000,
    year: 2021,
    mileage: '18,500 km',
    location: 'Commewijne',
    description:
      'Compact SUV with advanced safety features and infotainment upgrades. Single owner.',
    image:
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'car-3',
    title: 'Kia Sportage Signature',
    price: 198000,
    year: 2022,
    mileage: '12,000 km',
    location: 'Nickerie',
    description:
      'Premium package with panoramic roof, ventilated seats, and wireless CarPlay.',
    image:
      'https://images.unsplash.com/photo-1549924231-f129b911e442?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'car-4',
    title: 'Honda Fit Hybrid',
    price: 98000,
    year: 2018,
    mileage: '55,000 km',
    location: 'Wanica',
    description:
      'Fuel-efficient hatchback with hybrid technology and city-friendly size.',
    image:
      'https://images.unsplash.com/photo-1617813489114-11364f0d107d?auto=format&fit=crop&w=900&q=80',
  },
];

const carGrid = document.getElementById('carGrid');
const priceFilter = document.getElementById('priceFilter');
const priceValue = document.getElementById('priceValue');
const sellForm = document.getElementById('sellForm');
const messageForm = document.getElementById('messageForm');
const vehicleSelect = document.getElementById('vehicleSelect');
const toast = document.getElementById('toast');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

function renderListings(maxPrice = Number.MAX_SAFE_INTEGER) {
  const filtered = listings.filter((listing) => listing.price <= maxPrice);
  carGrid.innerHTML = '';

  filtered.forEach((listing) => {
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      <img src="${listing.image}" alt="${listing.title}" loading="lazy" />
      <div class="card-body">
        <div class="card-header">
          <h3>${listing.title}</h3>
          <span class="badge">Verified seller</span>
        </div>
        <p>${listing.description}</p>
        <div class="card-meta">
          <span>${listing.year}</span>
          <span>${listing.mileage}</span>
          <span>${listing.location}</span>
        </div>
        <div class="card-footer">
          <strong>SRD ${listing.price.toLocaleString()}</strong>
          <button data-message="${listing.id}">Message seller</button>
        </div>
      </div>
    `;
    carGrid.appendChild(card);
  });

  if (filtered.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'card';
    empty.innerHTML = `
      <div class="card-body">
        <h3>No cars match your filter… yet!</h3>
        <p>Adjust the price range or come back soon for newly verified listings.</p>
      </div>
    `;
    carGrid.appendChild(empty);
  }

  updateVehicleOptions(filtered);
}

function updatePriceLabel(value) {
  if (priceValue) {
    priceValue.textContent = Number(value).toLocaleString();
  }
}

function updateVehicleOptions(listingsToShow) {
  vehicleSelect.innerHTML = '<option value="" disabled selected>Select a vehicle</option>';
  listingsToShow.forEach((listing) => {
    const option = document.createElement('option');
    option.value = listing.id;
    option.textContent = `${listing.title} — SRD ${listing.price.toLocaleString()}`;
    vehicleSelect.appendChild(option);
  });
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

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('show');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('show');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

priceFilter?.addEventListener('input', (event) => {
  const max = Number(event.target.value);
  updatePriceLabel(max);
  renderListings(max);
});

carGrid?.addEventListener('click', (event) => {
  const button = event.target.closest('button[data-message]');
  if (button) {
    const id = button.dataset.message;
    vehicleSelect.value = id;
    scrollToSection('#contact');
    showToast('Message the seller and we will deliver your note securely.');
  }
});

sellForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(sellForm);

  const newListing = {
    id: `car-${Date.now()}`,
    title: formData.get('model'),
    price: Number(formData.get('price')),
    year: Number(formData.get('year')),
    mileage: 'New listing',
    location: 'Pending approval',
    description: formData.get('description'),
    image:
      'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=900&q=80',
  };

  listings.unshift(newListing);

  let maxForRender = Number.MAX_SAFE_INTEGER;

  if (priceFilter) {
    const currentSliderMax = Number(priceFilter.max || 0);
    const currentSliderValue = Number(priceFilter.value || 0);
    const shouldExpandValue = currentSliderValue >= currentSliderMax;

    if (newListing.price > currentSliderMax) {
      priceFilter.max = String(newListing.price);
      if (shouldExpandValue) {
        priceFilter.value = String(newListing.price);
      }
    }

    maxForRender = Number(priceFilter.value || priceFilter.max || Number.MAX_SAFE_INTEGER);
    updatePriceLabel(maxForRender);
  }

  renderListings(maxForRender);
  sellForm.reset();
  showToast("Thanks! CarSpot's verification team will review your ID shortly.");
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

  showToast(`Message sent to ${listing.title} seller. Expect a reply soon, ${buyerName}!`);
  messageForm.reset();
});

function init() {
  const now = new Date();
  document.getElementById('year').textContent = now.getFullYear();

  if (priceFilter) {
    const highestPrice = listings.reduce(
      (maxPrice, listing) => Math.max(maxPrice, listing.price),
      0,
    );

    priceFilter.max = String(highestPrice);

    if (Number(priceFilter.value || 0) > highestPrice) {
      priceFilter.value = priceFilter.max;
    }

    const initialMax = Number(priceFilter.value || priceFilter.max || highestPrice);
    updatePriceLabel(initialMax);
    renderListings(initialMax);
    return;
  }

  renderListings();
}

init();
