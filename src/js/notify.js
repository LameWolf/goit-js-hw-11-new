import Notiflix from 'notiflix';

const onFetchError = () => {
  Notiflix.Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.',
  );
};

const onFetchEnd = () => {
  Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
};

export { onFetchError, onFetchEnd };
