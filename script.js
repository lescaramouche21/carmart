const listings = [
  {
    id: 'listing-1',
    type: 'car-sale',
    typeLabel: 'Car Sale',
    title: 'Toyota Vitz 2018',
    price: 9200,
    year: 2018,
    mileage: '62,000 km',
    location: 'Paramaribo',
    description: 'Well-maintained compact car with cold A/C and clean interior.',
    image:
      'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'listing-2',
    type: 'car-rent',
    typeLabel: 'Car Rental',
    title: 'Hyundai Creta (Daily Rental)',
    price: 70,
    year: 2021,
    mileage: 'On request',
    location: 'Wanica',
    description: 'Comfort SUV available daily/weekly with insurance options.',
    image:
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'listing-3',
    type: 'house-rent',
    typeLabel: 'House Rental',
    title: '2BR Apartment Near City Center',
    price: 850,
    year: 2023,
    mileage: 'N/A',
    location: 'Paramaribo',
    description: 'Modern apartment with parking, fiber internet, and balcony.',
    image:
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=900&q=80',
  },
];

const carGrid = document.getElementById('carGrid');
const priceFilter = document.getElementById('priceFilter');
const priceValue = document.getElementById('priceValue');
const sellForm = document.getElementById('sellForm');
const messageForm = document.getElementById('messageForm');
const vehicleSelect = document.getElementById('vehicleSelect');
const toast = document.getElementById('toast');

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
          <span class="badge">${listing.typeLabel}</span>
        </div>
        <p>${listing.description}</p>
        <div class="card-meta">
          <span>${listing.year || 'N/A'}</span>
          <span>${listing.mileage}</span>
          <span>${listing.location}</span>
        </div>
        <div class="card-footer">
          <strong>$${listing.price.toLocaleString()}</strong>
          <button data-message="${listing.id}">Message lister</button>
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
        <h3>No listings match your filter yet.</h3>
        <p>Adjust price or check back soon for new Classe X posts.</p>
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
  vehicleSelect.innerHTML = '<option value="" disabled selected>Select a listing</option>';
  listingsToShow.forEach((listing) => {
    const option = document.createElement('option');
    option.value = listing.id;
    option.textContent = `${listing.typeLabel}: ${listing.title} — $${listing.price.toLocaleString()}`;
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
    showToast('Send your message and the lister will be notified.');
  }
});

sellForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(sellForm);
  const listingType = formData.get('listingType');

  const typeLabels = {
    'car-sale': 'Car Sale',
    'car-rent': 'Car Rental',
    'house-rent': 'House Rental',
  };

  const newListing = {
    id: `listing-${Date.now()}`,
    type: listingType,
    typeLabel: typeLabels[listingType] || 'Listing',
    title: formData.get('model'),
    price: Number(formData.get('price')),
    year: Number(formData.get('year')) || null,
    mileage: listingType === 'house-rent' ? 'N/A' : 'New listing',
    location: formData.get('location') || 'Pending review',
    description: formData.get('description'),
    image:
      listingType === 'house-rent'
        ? 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=900&q=80'
        : 'https://images.unsplash.com/photo-1549924231-f129b911e442?auto=format&fit=crop&w=900&q=80',
  };

  listings.unshift(newListing);

  if (priceFilter && newListing.price > Number(priceFilter.max || 0)) {
    priceFilter.max = String(newListing.price);
    priceFilter.value = String(newListing.price);
  }

  const maxForRender = Number(priceFilter?.value || Number.MAX_SAFE_INTEGER);
  updatePriceLabel(maxForRender);
  renderListings(maxForRender);
  sellForm.reset();
  showToast('Listing published on Classe X successfully!');
});

messageForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(messageForm);
  const buyerName = formData.get('buyerName');
  const listingId = formData.get('vehicle');
  const listing = listings.find((item) => item.id === listingId);

  if (!listing) {
    showToast('Please select a listing before sending your inquiry.', 'error');
    return;
  }

  showToast(`Message sent for ${listing.title}. Thanks, ${buyerName}!`);
  messageForm.reset();
});

function init() {
  document.getElementById('year').textContent = new Date().getFullYear();

  if (priceFilter) {
    const highestPrice = listings.reduce(
      (maxPrice, listing) => Math.max(maxPrice, listing.price),
      0,
    );

    priceFilter.max = String(highestPrice);
    priceFilter.value = String(highestPrice);

    const initialMax = Number(priceFilter.value || highestPrice);
    updatePriceLabel(initialMax);
    renderListings(initialMax);
    return;
  }

  renderListings();
}

init();
