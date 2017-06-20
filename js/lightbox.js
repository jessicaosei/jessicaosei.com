'use strict';

var body = document.body;
var screenshots = document.querySelectorAll('.project-image');
var lightbox = document.querySelector('.lightbox');
var lightboxCloseButton = lightbox.querySelector('.lightbox-icon-close');
var lightboxImageContainer = lightbox.querySelector('.lightbox-image-container');

function openLightbox(e) {
	setLightboxImage(e.target.dataset.path).then(function(result) {
		body.classList.add('lightbox-active');
		lightbox.classList.add('lightbox-open');
	});
}

function closeLightbox(e) {
	var lightboxImage = lightbox.querySelector('img');

	body.classList.remove('lightbox-active');
	lightbox.classList.remove('lightbox-open');

	lightboxImageContainer.removeChild(lightboxImage);
}

function setLightboxImage(src) {
	return new Promise(function(resolve, reject) {
		var img = document.createElement('img');
		
		img.onload = function() {
			resolve(src);
		};

		img.onerror = function() {
			reject(Error('Image failed to load'));
		}

		img.src = src;

		img.classList.add('lightbox-image');

		lightboxImageContainer.appendChild(img);
	});
}

// Set up event listeners
screenshots.forEach(function(screenshot) {
	screenshot.addEventListener('click', openLightbox);
});

lightboxCloseButton.addEventListener('click', closeLightbox);








