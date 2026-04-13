import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionPosition: 'bottom',
});
export function createGallery(images) {
  const html = images
    .map(
      item => `
    <li class="gallery-item">
      <a href="${item.largeImageURL}">
        <img src="${item.webformatURL}" alt="${item.tags}" />
      </a>
      <p> likes: ${item.likes}</p>
      <p> views: ${item.views}</p>
      <p> comments: ${item.comments}</p>
      <p> downloads: ${item.downloads}</p>
    </li>
  `
    )
    .join('');
  gallery.innerHTML = html;
  lightbox.refresh();
}

export function clearGallery() {
  gallery.innerHTML = '';
}

export function showLoader() {
  if (loader) {
    loader.classList.remove('is-hidden');
  }
}

export function hideLoader() {
  if (loader) {
    loader.classList.add('is-hidden');
  }
}
