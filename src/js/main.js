import debounce from 'lodash.debounce';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { searchImages } from './api.js';
import { displayError, displayInfo } from './izitoast.js';

const IMAGES_PER_PAGE = 30;
let lightBox;

function bindFormEvents() {
  const form = document.getElementById('search-form');

  if (!form) {
    return;
  }

  form.addEventListener('submit', async event => {
    event.preventDefault();

    const searchQueryElement = [...form.elements].find(
      element => element.name === 'searchQuery'
    );

    if (!searchQueryElement) {
      return;
    }

    const searchQuery = searchQueryElement.value;
    await loadImages(searchQuery, 1, true);
  });
}

function storeFormData({ query, page, total }) {
  localStorage.setItem('query', query);
  localStorage.setItem('page', page);
  localStorage.setItem('total', total);
}

function getFormData() {
  const query = localStorage.getItem('query');
  const page = +localStorage.getItem('page');
  const total = +localStorage.getItem('total');

  return {
    query,
    page,
    total,
  };
}

function bindScrollEvents() {
  window.addEventListener(
    'scroll',
    debounce(async () => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;

      if (scrollTop + clientHeight >= scrollHeight && hasMoreImages()) {
        const { query, page } = getFormData();

        await loadImages(query, page + 1);
      }
    }, 400),
    {
      passive: true,
    }
  );
}

async function loadImages(query, page, replaceCards = false) {
  if (!query?.trim()) {
    clearGallery();
    displayError('Query should not be empty.');
    return;
  }

  try {
    displayLoader();

    const images = await searchImages(query, page, IMAGES_PER_PAGE);

    storeFormData({ query, page, total: images.total });
    renderCards(images.hits, replaceCards);

    if (replaceCards) {
      if (!images.total) {
        displayError(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else {
        displayInfo(`Hooray! We found ${images.total} images.`);
      }
    }

    if (!hasMoreImages() && images.total) {
      displayError(
        "We're sorry, but you've reached the end of search results."
      );
    }
  } catch (e) {
    clearGallery();
    displayError('Sorry, error occurred. Please try again.');
  } finally {
    displayLoader(false);
  }
}

function clearGallery() {
  renderCards([], true);
}

function hasMoreImages() {
  const { page, total } = getFormData();

  return total > page * IMAGES_PER_PAGE;
}

function bindEvents() {
  bindFormEvents();
  bindScrollEvents();
  lightBox = createSimpleLightBox();
}

function createCard(item) {
  const {
    webformatURL,
    largeImageURL,
    tags,
    likes,
    views,
    comments,
    downloads,
  } = item;
  return `
  <div class="photo-card">
    <div class="image-container">
      <a href="${largeImageURL}">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" />
      </a>
    </div>
    <div class="info">
        <p class="info-item">
          <b>Likes</b>
          <span>${likes}</span>
        </p>
        <p class="info-item">
          <b>Views</b>
          <span>${views}</span>
        </p>
        <p class="info-item">
            <b>Comments</b>
            <span>${comments}</span>
        </p>
        <p class="info-item">
            <b>Downloads</b>
            <span>${downloads}</span>
        </p>
    </div>
   </div>
  `;
}

function renderCards(items, replace = true) {
  const galleryElement = document.querySelector('.gallery');

  if (!galleryElement) {
    return;
  }

  const cardsHtml = items.map(item => createCard(item)).join('');

  if (replace) {
    galleryElement.innerHTML = cardsHtml;
  } else {
    galleryElement.insertAdjacentHTML('beforeend', cardsHtml);
  }

  lightBox?.refresh();
}

function displayLoader(visible = true) {
  const loader = document.querySelector('.loader');

  if (!loader) {
    return;
  }

  if (visible) {
    loader.classList.remove('hidden');
  } else {
    loader.classList.add('hidden');
  }
}

function createSimpleLightBox() {
  return new SimpleLightbox('.gallery a', {
    captionDelay: 250,
    captionsData: 'alt',
  });
}

bindEvents();
