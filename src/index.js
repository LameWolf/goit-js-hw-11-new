import './sass/main.scss';
import galleryTpl from './templates/gallery-template';
import { onFetchError } from './js/notify';
import ImagesApiService from './js/api-service';
import LoadMoreBtn from './js/load-more-btn';
import { getRefs } from './js/getRefs';

const refs = getRefs();

const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

const imagesApiService = new ImagesApiService();

// || ========== onSearch ========== ||

const onSearch = evt => {
  evt.preventDefault();

  imagesApiService.query = evt.currentTarget.elements.searchQuery.value;

  if (imagesApiService.query.trim() === '') {
    return onFetchError();
  }

  loadMoreBtn.show();
  imagesApiService.resetPage();
  clearImagesContainer();
  fetchHits();
};

// || ========== fetchHits ========== ||

const fetchHits = () => {
  loadMoreBtn.disable();
  imagesApiService.fetchHits().then(hits => {
    appendImagesMarkup(hits);
    loadMoreBtn.enable();
  });
};

// || ========== appendImagesMarkup ========== ||

const appendImagesMarkup = images => {
  refs.gallery.insertAdjacentHTML('beforeend', galleryTpl(images));
};

// || ========== clearImagesContainer ========== ||

const clearImagesContainer = () => {
  refs.gallery.innerHTML = '';
};

// || ========== Event Listeners ========== ||

refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', fetchHits);
