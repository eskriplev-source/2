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

const catalogTabs = document.querySelectorAll('.catalog-tab');
const catalogPages = document.querySelectorAll('.catalog-page');
const catalogPrev = document.querySelector('.catalog-prev');
const catalogNext = document.querySelector('.catalog-next');
const catalogProgress = document.querySelector('.catalog-progress');

const catalogOrder = Array.from(catalogTabs).map((tab) => tab.dataset.page);

const setCatalogPage = (page) => {
  const pageIndex = catalogOrder.indexOf(page);
  if (pageIndex === -1) {
    return;
  }

  catalogTabs.forEach((tab) => {
    const isActive = tab.dataset.page === page;
    tab.classList.toggle('is-active', isActive);
    tab.setAttribute('aria-selected', String(isActive));
  });

  catalogPages.forEach((panel) => {
    const isActive = panel.dataset.page === page;
    panel.classList.toggle('is-active', isActive);
  });

  if (catalogProgress) {
    catalogProgress.textContent = `Страница ${pageIndex + 1} из ${catalogOrder.length}`;
  }

  if (catalogPrev) {
    catalogPrev.disabled = pageIndex === 0;
  }

  if (catalogNext) {
    catalogNext.disabled = pageIndex === catalogOrder.length - 1;
  }
};

catalogTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    setCatalogPage(tab.dataset.page);
  });
});

if (catalogPrev) {
  catalogPrev.addEventListener('click', () => {
    const currentIndex = catalogOrder.findIndex((page) =>
      document.querySelector(`.catalog-page[data-page="${page}"]`)?.classList.contains('is-active')
    );
    const targetIndex = Math.max(currentIndex - 1, 0);
    setCatalogPage(catalogOrder[targetIndex]);
  });
}

if (catalogNext) {
  catalogNext.addEventListener('click', () => {
    const currentIndex = catalogOrder.findIndex((page) =>
      document.querySelector(`.catalog-page[data-page="${page}"]`)?.classList.contains('is-active')
    );
    const targetIndex = Math.min(currentIndex + 1, catalogOrder.length - 1);
    setCatalogPage(catalogOrder[targetIndex]);
  });
}

if (catalogOrder.length) {
  setCatalogPage(catalogOrder[0]);
}

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
