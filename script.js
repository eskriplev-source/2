const formStatuses = document.querySelectorAll('.form-status');

const updateStatus = (form, message) => {
  const status = form.parentElement.querySelector('.form-status');
  if (status) {
    status.textContent = message;
  }
};

const scrollToContacts = () => {
  const contacts = document.querySelector('#contacts');
  if (contacts) {
    contacts.scrollIntoView({ behavior: 'smooth' });
  }
};

const contactForm = document.querySelector('.contact-form');
const productInput = contactForm?.querySelector('input[name="product"]');

const priceButtons = document.querySelectorAll('.price-request');
priceButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const product = button.dataset.product;
    if (productInput) {
      productInput.value = product;
    }
  });
});

const quickForm = document.querySelector('.quick-form');
if (quickForm) {
  quickForm.addEventListener('submit', (event) => {
    event.preventDefault();
    updateStatus(quickForm, 'Заявка на подбор принята. Переходим к форме контакта.');
    scrollToContacts();
  });
}

const accountForm = document.querySelector('.account-form');
if (accountForm) {
  accountForm.addEventListener('submit', (event) => {
    event.preventDefault();
    updateStatus(accountForm, 'Аккаунт создан. Мы отправили подтверждение на email.');
  });
}

if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    updateStatus(contactForm, 'Спасибо! Мы свяжемся с вами в ближайшее время.');
    contactForm.reset();
  });
}

formStatuses.forEach((status) => {
  status.textContent = '';
});
