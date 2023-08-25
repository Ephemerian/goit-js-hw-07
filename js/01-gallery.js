import { galleryItems } from "./gallery-items.js";

const listGalleryEl = document.querySelector(".gallery");
listGalleryEl.addEventListener("click", onClickAtPicture);

setGalleryToListHTML(`beforeend`, createGalleryMarkup(galleryItems));

let keydownHandler = null;

function onClickAtPicture(e) {
  e.preventDefault();
  if (e.target.nodeName !== "IMG") {
    return;
  }
  showBigImg(e.target);
}

function showBigImg(target) {
  const instance = basicLightbox.create(
    `<img src="${target.dataset.source}" width="800" height="600">`
  );
  instance.show();

  keydownHandler = (evt) => {
    if (evt.code === "Escape") {
      instance.close();
      removeKeydownListener();
    }
  };

  listGalleryEl.addEventListener("keydown", keydownHandler);
}

function removeKeydownListener() {
  if (keydownHandler) {
    listGalleryEl.removeEventListener("keydown", keydownHandler);
    keydownHandler = null;
  }
}

function createGalleryMarkup(galleryItems) {
  return galleryItems
    .map(
      ({ description, preview, original }) =>
        `<li class="gallery__item">
        <a class="gallery__link" href="large-image.jpg">
          <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
          />
        </a>
      </li>`
    )
    .join("");
}

function setGalleryToListHTML(place, gallery) {
  listGalleryEl.insertAdjacentHTML(place, gallery);
}
