'use strict';

var nav = (function Nav() {
	var body = document.body;
	var bodyOverlay = document.querySelector('.body-overlay');
	var nav = document.querySelector('.nav');
	var navIcons = document.querySelectorAll('.nav-icon');
	var navDropdowns = document.querySelectorAll('.nav-dropdown');
	var navDropdownContainers = document.querySelectorAll('.nav-dropdown-container');

	// Initializes dropdowns to their collapsed state
	function init() {
		navDropdownContainers.forEach(function(container) {
			var button = container.querySelector('.nav-dropdown');
			container.style.height = getCollapsedHeight(button) + 'px';
		});
	}

	function handleNavIconClick(e) {
		body.classList.toggle('body-overlay-active');
		bodyOverlay.classList.toggle('body-overlay-active');
		nav.classList.toggle('nav-open');
	}

	function handleDropdownClick(e) {
		var dropdownButton = e.target;
		var dropdownMenu = e.target.parentElement.nextElementSibling;
		var dropdownContainer = e.target.parentElement.parentElement;

		dropdownContainer.classList.toggle('nav-dropdown-open');

		if(dropdownContainer.classList.contains('nav-dropdown-open')) {
			expandDropdown(dropdownButton, dropdownMenu, dropdownContainer);
		} else {
			collapseDropdown(dropdownButton, dropdownContainer);
		}
	}

	function getCollapsedHeight(button) {
		return parseInt(window.getComputedStyle(button).height, 10);
	}

	function getExpandedHeight(button, menu) {
		var collapsedHeight = getCollapsedHeight(button);

		var expandedHeight = parseInt(window.getComputedStyle(menu).height, 10);

		var totalHeight = collapsedHeight + expandedHeight;

		return totalHeight;
	}

	function collapseDropdown(button, container) {
		container.style.height = getCollapsedHeight(button) + 'px';
	}

	function expandDropdown(button, menu, container) {
		container.style.height = getExpandedHeight(button, menu) + 'px';
	}

	function onWindowResize() {
		navDropdownContainers.forEach(function(container) {
			var button = container.querySelector('.nav-dropdown');
			var menu = container.querySelector('.nav-submenu');

			if(container.classList.contains('nav-dropdown-open')) {
				container.style.height = getExpandedHeight(button, menu) + 'px';
			} else {
				container.style.height = getCollapsedHeight(button) + 'px';
			}
		});
	}

	// Set up event listeners
	navIcons.forEach(function(icon) {
		icon.addEventListener('click', handleNavIconClick);
	});

	navDropdowns.forEach(function(dropdown) {
		dropdown.addEventListener('click', handleDropdownClick);
	});

	bodyOverlay.addEventListener('click', handleNavIconClick);

	window.addEventListener('resize', onWindowResize);

	return {
		init: init
	}
}());

nav.init();




