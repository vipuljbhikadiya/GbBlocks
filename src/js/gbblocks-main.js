import Splide from '@splidejs/splide';

document.addEventListener('DOMContentLoaded', function () {
	/**
	 * Header Toggle
	 */

	let slideUp = (target, duration = 500) => {
		target.style.transitionProperty = 'height, margin, padding';
		target.style.transitionDuration = duration + 'ms';
		target.style.boxSizing = 'border-box';
		target.style.height = target.offsetHeight + 'px';
		target.offsetHeight;
		target.style.overflow = 'hidden';
		target.style.height = 0;
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;
		window.setTimeout(() => {
			target.style.display = 'none';
			target.style.removeProperty('height');
			target.style.removeProperty('padding-top');
			target.style.removeProperty('padding-bottom');
			target.style.removeProperty('margin-top');
			target.style.removeProperty('margin-bottom');
			target.style.removeProperty('overflow');
			target.style.removeProperty('transition-duration');
			target.style.removeProperty('transition-property');
			//alert("!");
		}, duration);
	};

	let slideDown = (target, duration = 500) => {
		target.style.removeProperty('display');
		let display = window.getComputedStyle(target).display;

		if (display === 'none') display = 'block';

		target.style.display = display;
		let height = target.offsetHeight;
		target.style.overflow = 'hidden';
		target.style.height = 0;
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;
		target.offsetHeight;
		target.style.boxSizing = 'border-box';
		target.style.transitionProperty = 'height, margin, padding';
		target.style.transitionDuration = duration + 'ms';
		target.style.height = height + 'px';
		target.style.removeProperty('padding-top');
		target.style.removeProperty('padding-bottom');
		target.style.removeProperty('margin-top');
		target.style.removeProperty('margin-bottom');
		window.setTimeout(() => {
			target.style.removeProperty('height');
			target.style.removeProperty('overflow');
			target.style.removeProperty('transition-duration');
			target.style.removeProperty('transition-property');
		}, duration);
	};

	let slideToggle = (target, duration = 500) => {
		if (window.getComputedStyle(target).display === 'none') {
			return slideDown(target, duration);
		} else {
			return slideUp(target, duration);
		}
	};

	window.addEventListener('resize', reportWindowSize);

	reportWindowSize();

	function reportWindowSize() {
		var screen_width = screen.width;
		if (screen_width <= 1140) {
			if (document.querySelector('#menu--btn') != null) {
				var menu_btn = document.getElementById('menu--btn');
				var menu = document.querySelector('.header--nav');
				var site_nav = document.querySelector('.site--nav');
				let header__container =
					document.querySelector('.header--container');
				let left_position = window
					.getComputedStyle(header__container, null)
					.getPropertyValue('padding-left');

				site_nav.style =
					'width:' + screen_width + 'px;left:-' + left_position + ';';

				let speedAnimation = 400;
				const sub_menu_trigger = document.querySelectorAll(
					'.menu-item-has-children'
				);
				menu_btn.addEventListener('click', (event) => {
					menu.classList.toggle('is--active');
					menu_btn.classList.toggle('is--active');

					if (!document.querySelectorAll('.is--active').length) {
						sub_menu_trigger.forEach((sub_menu) => {
							var parent_ele = sub_menu.closest('li');
							var target =
								parent_ele.getElementsByClassName('sub-menu');
							slideUp(target[0], speedAnimation);
						});
						document.body.style.overflowY = '';
					} else {
						document.body.style.overflowY = 'hidden';
					}
				});

				sub_menu_trigger.forEach((sub_menu) => {
					sub_menu.addEventListener(
						'click',
						function handleClick(event) {
							if (
								document.querySelectorAll(
									'.is--active-sub-menu'
								).length > 0
							)
								var justclosed = true;

							var parent_ele = sub_menu.closest('li');
							var target =
								parent_ele.getElementsByClassName('sub-menu');

							if (!justclosed) {
								event.preventDefault();
								parent_ele.classList.add('is--active-sub-menu');
								slideDown(target[0], speedAnimation);
							} else {
								parent_ele.classList.remove(
									'is--active-sub-menu'
								);
								slideUp(target[0], speedAnimation);
							}
						}
					);
				});
			}
		} else {
			document.querySelector('.site--nav').style = '';
		}
	}
	function fadeOutEffect(target) {
		var fadeEffect = setInterval(function () {
			if (!target.style.opacity) {
				target.style.opacity = 1;
			}
			if (target.style.opacity > 0) {
				target.style.opacity -= 0.1;
			} else {
				clearInterval(fadeEffect);
			}
		}, 200);
	}
	if (document.querySelector('.lang--selected-menu')) {
		document
			.querySelector('.lang--menu-name')
			.addEventListener('click', function () {
				this.classList.toggle('is-open');
				this.nextElementSibling.classList.toggle('is--active-lang');
			});
		document.querySelectorAll('.lang-item').forEach(function (ln, i) {
			if (ln.classList.length >= 2) {
				var langCodeClass = ln.classList[2];

				if (langCodeClass.split('-').length == 3) {
					var childHtml = langCodeClass.split('-')[2];

					ln.querySelector('a').innerHTML =
						ln.querySelector('a').innerHTML +
						"<span class='country-code'>" +
						childHtml +
						'</span>';
				}
			}
		});
		if (document.querySelector('.lang-item.current-lang')) {
			document.querySelector('.current--lang-code').innerHTML =
				document.querySelector('.current-lang .country-code').innerHTML;
		}
	}
	// header toggle ends

	// Icon JS
	function customResizeIcons() {
		var elements = document.getElementsByClassName('icon__visual');
		if (elements.length < 0) {
			return;
		}
		var _len = elements.length;
		for (var _i = 0; _i < _len; _i++) {
			var el = elements[_i];
			var elWidth = el.offsetWidth;
			var iconSize = elWidth * 0.9;
			var iconSizeRounded = Math.round(iconSize / 2) * 2;
			el.style.fontSize = iconSizeRounded + 'px';
		}
	}
	customResizeIcons();
	window.addEventListener('resize', customResizeIcons);

	// Video Lightbox
	if (document.querySelector('.video--wrap') != null) {
		let link = document.querySelector('.video--link');

		link.addEventListener('click', function () {
			var parent_ele = this.closest('div');
			var target = parent_ele.nextElementSibling;
			var iframe = document.getElementById(this.dataset.id).src;
			document.getElementById(this.dataset.id).src =
				iframe + '&autoplay=1';
			target.classList.add('opened');
		});

		let button = document.querySelector('.lightbox-close');
		button.addEventListener('click', function () {
			var btn_parent_ele = this.closest('div.video--lightbox-wrap');
			var iframId = btn_parent_ele.getElementsByTagName('iframe')[0].id;
			var iframe = document.getElementById(iframId).src;
			var cleaned = iframe.replace('&autoplay=1', '');

			document.getElementById(iframId).src = cleaned;
			btn_parent_ele.classList.remove('opened');
		});
	}

	if (document.querySelector('.youtube__preview') != null) {
		let links = document.querySelectorAll('.youtube__preview');
		links.forEach(function (link) {
			link.addEventListener('click', function (e) {
				e.preventDefault();
				var youtubeId = this.dataset.youtubeid;
				if (document.querySelector('.youtube__lightbox') != null) {
					var parent = document.querySelector('.youtube__lightbox');
					var iframe = parent.querySelector('.youtube__iframe');
					if (
						iframe.src.indexOf('/' + youtubeId + '/?showinfo=0') < 0
					) {
						iframe.src =
							'https://www.youtube.com/embed/' +
							youtubeId +
							'/?showinfo=0';
					}
				}
			});
		});
	}

	// circle Preview tabs
	if (document.querySelector('.circle--preview') != null) {
		document
			.querySelectorAll('.circle--preview')
			.forEach(function (parentEle) {
				let tabs_wrap = parentEle.querySelectorAll(
					'.circle--preview-tabs'
				);

				parentEle
					.querySelector('.circle--preview-tabs .nav--link')
					.classList.add('nav--link-active');
				parentEle
					.querySelector('.tab-content .tab-pane')
					.classList.add('active');
				tabs_wrap.forEach(function (tab_wrap) {
					var tab_links = tab_wrap.querySelectorAll('.nav-item');
					tab_links.forEach(function (tab_link) {
						tab_link
							.querySelector('.nav--link')
							.addEventListener('click', function (e) {
								e.preventDefault();
								tab_link
									.closest('.circle--preview')
									.querySelectorAll('.tab-pane')
									.forEach(function (content) {
										content.classList.remove('active');
									});
								tabs_wrap.forEach(function (tabs) {
									tabs.querySelectorAll('.nav-item').forEach(
										function (link) {
											if (
												link
													.querySelector('.nav--link')
													.classList.contains(
														'nav--link-active'
													) == true &&
												link.querySelector(
													'.nav--link'
												) != this
											) {
												link.querySelector(
													'.nav--link'
												).classList.remove(
													'nav--link-active'
												);
											}
										}
									);
								});

								this.classList.add('nav--link-active');
								var content_wrap = this.closest(
									'.circle--preview'
								).querySelector('.circle--preview-content');
								content_wrap
									.querySelector(this.getAttribute('href'))
									.classList.add('active');
							});
					});
				});
			});
	}

	// accordion
	if (document.querySelector('.accordion') != null) {
		let accordionItem = document.querySelectorAll('.accordion__item');

		accordionItem.forEach((acc_item, index) => {
			if (index == 0) {
				acc_item.querySelector('.list-link').classList.add('collapsed');
				acc_item
					.querySelector('.accordion-collapse')
					.classList.add('show');
			}

			let accordionButton = acc_item.querySelector('.list-link');
			accordionButton.addEventListener('click', function (e) {
				let accordionBody = this.nextElementSibling;

				accordionItem.forEach((item, index) => {
					if (
						item
							.querySelector('.list-link')
							.classList.contains('collapsed') == true &&
						item.querySelector('.list-link') != this
					) {
						item.querySelector('.list-link').classList.remove(
							'collapsed'
						);
						item.querySelector(
							'.accordion-collapse'
						).classList.remove('show');

						slideUp(item.querySelector('.accordion-collapse'), 400);
					}
				});
				this.classList.toggle('collapsed');
				document
					.querySelector('.accordion-collapse')
					.classList.toggle('show');
				slideToggle(accordionBody, 400);
			});
		});
	}

	// News Listing
	if (document.querySelector('.news__listings')) {
		document
			.querySelectorAll('.news__listings')
			.forEach(function (newsList) {
				newsList.addEventListener(
					'click',
					function (e) {
						e = e || window.event;
						var target = e.target;
						let paged = '';
						let taxonomy = document.querySelector(
							'input[name="news_taxonomy"]'
						).value;
						if (target.tagName == 'svg') {
							if (
								target.parentElement.classList[0] ==
								'news-navigation'
							) {
								paged = target.parentElement.dataset.paged;
								getNewsList(paged, taxonomy);
							}
						} else {
							if (e.target.classList[0] == 'news-navigation') {
								e.preventDefault();
								paged = target.dataset.paged;
								getNewsList(paged, taxonomy);
							}
						}
						return false;
					},
					false
				);
			});
	}

	// customer List
	if (document.querySelector('.customers__lists')) {
		document
			.querySelectorAll('.customers__lists')
			.forEach(function (customerList) {
				customerList.addEventListener(
					'click',
					function (e) {
						e = e || window.event;
						var target = e.target;
						let paged = '';
						let taxonomy = document.querySelector(
							'input[name="customers_taxonomy"]'
						).value;

						if (target.tagName == 'svg') {
							if (
								target.parentElement.classList[0] ==
								'customers-navigation'
							) {
								paged = target.parentElement.dataset.paged;
								getCustomersList(paged, taxonomy);
							}
						} else {
							if (
								e.target.classList[0] == 'customers-navigation'
							) {
								e.preventDefault();
								paged = target.dataset.paged;
								getCustomersList(paged, taxonomy);
							} else if (
								e.target.classList[0] == 'customer__title'
							) {
								target.parentElement.classList.add('active');
								slideDown(target.parentElement, 1000);
								customResizeIcons();
							} else if (
								e.target.classList[0] == 'customer__details'
							) {
								target.classList.add('active');
								slideDown(target, 1000);
								customResizeIcons();
							} else if (
								e.target.classList[0] == 'customer__close'
							) {
								target
									.closest('.customer__details')
									.classList.remove('active');
								slideUp(target.parentElement, 1000);
								setTimeout(() => {
									target.parentElement.style = '';
								}, 1000);
							}
						}
						return false;
					},
					false
				);
			});
	}

	// scroll to next section
	if (document.querySelector('.scroll-to__next')) {
		document
			.querySelector('.scroll-to__next')
			.addEventListener('click', function () {
				let parentElement = this.parentElement;
				let scrollTarget = parentElement?.nextElementSibling;
				if (scrollTarget != undefined) {
					scroll({
						top: scrollTarget.offsetTop,
						behavior: 'smooth',
					});
				}
			});
	}

	// time trap
	if (document.querySelector('input[name="time"]')) {
		document.querySelector('input[name="time"]').value = Math.floor(
			new Date().getTime() / 1000
		);
	}

	if (document.querySelector('input[name="subscription_time"]')) {
		document.querySelector('input[name="subscription_time"]').value =
			Math.floor(new Date().getTime() / 1000);
	}

	if (document.querySelector('.hide-robot')) {
		document.querySelectorAll('.hide-robot').forEach(function (robotField) {
			robotField.style.display = 'none';
		});
	}

	// form validation
	if (document.querySelector('.gbblocks--form')) {
		var forms = document.querySelectorAll('.gbblocks--form');
		Array.prototype.slice.call(forms).forEach(function (form) {
			form.querySelector('input[type="submit"]').addEventListener(
				'click',
				function (event) {
					event.preventDefault();
					var errors = form.querySelectorAll('.error-msg');
					let formValidation = true;
					const inputs = form.querySelectorAll('[required]');
					
					inputs.forEach(function (input) {
						let formControl = input.nextElementSibling;
						formControl.classList.remove('show');
						let elementType = input.getAttribute('type');

						let elementlabel = input
							.closest('.col')
							.querySelector('label')
							.getAttribute('for');
						let elementValue = input.value.trim();
						let elementName = input.getAttribute('name');
					
						switch (elementType) {
							case 'text':
								if (elementValue === '') {
									formControl.classList.add('show');
									formControl.innerHTML =
										elementlabel + ' is required feild.';
									formValidation = false;
								}
								break;
							case 'email':
								if (elementValue === '') {
									formControl.classList.add('show');
									formControl.innerHTML =
										elementlabel + ' is required feild.';
									formValidation = false;
								} else if (!isEmail(elementValue)) {
									formControl.classList.add('show');
									formControl.innerHTML =
										elementlabel + ' address is not valid.';
									formValidation = false;
								}
								break;
							case 'checkbox':
								let isChecked = document.querySelector(
									'[name="' + elementName + '"]:checked'
								);
								if (!isChecked) {
									input
										.closest('.acceptance')
										.nextElementSibling.classList.add(
											'show'
										);
									input.closest(
										'.acceptance'
									).nextElementSibling.innerHTML =
										elementlabel + ' is required feild.';
									formValidation = false;
								}
								break;
						}
					});
					if (formValidation == true) {
						errors.forEach((err) => {
							if (err.classList.contains('show') == true)
								err.classList.remove('show');
						});
						form.querySelector(
							'input[type="submit"]'
						).disabled = true;
						const params = new URLSearchParams();
						params.append('action', 'sendEmail');
						params.append(
							'clientid',
							form.querySelector('input[name="clientId"]').value
						);
						params.append(
							'time',
							form.querySelector('input[name="time"]').value
						);
						params.append(
							'con_name',
							form.querySelector('input[name="con_name"]').value
						);
						params.append(
							'firstname',
							form.querySelector('input[name="firstname"]').value
						);
						params.append(
							'lastname',
							form.querySelector('input[name="lastname"]').value
						);
						params.append(
							'company',
							form.querySelector('input[name="company"]').value
						);
						params.append(
							'email',
							form.querySelector('input[name="email"]').value
						);
						params.append(
							'message',
							form.querySelector('textarea[name="message"]').value
						);
						sendEmail(gb_ajax.ajaxurl, params, form);
					}
				},
				false
			);
		});
	}

	// form validation functions
	function formvalidation(form) {
		// get all input which required validation
		let formValidation = true;
		const inputs = form.querySelectorAll('[required]');

		inputs.forEach(function (input) {
			let formControl = input.closest('.form--control');
			formControl.classList.remove('error');
			let elementType = input.getAttribute('type');
			let elementlabel = input?.dataset?.label;
			let elementValue = input.value.trim();
			let elementName = input.getAttribute('name');
			switch (elementType) {
				case 'email':
					if (elementValue === '') {
						setErrorFor(
							formControl,
							elementlabel + ' is required feild.'
						);
						formValidation = false;
					} else if (!isEmail(elementValue)) {
						setErrorFor(
							formControl,
							elementlabel + ' address is not valid.'
						);
						formValidation = false;
					}
					break;
				case 'checkbox':
					let isChecked = document.querySelector(
						'[name="' + elementName + '"]:checked'
					);
					if (!isChecked) {
						setErrorFor(
							formControl,
							elementlabel + ' is required feild.'
						);
						formValidation = false;
					}
					break;
			}
		});

		return formValidation;
	}

	function setErrorFor(formControl, message) {
		let errorElement = formControl.querySelector('.validation--feedback');
		errorElement.innerText = message;
	
		formControl.classList.add('error');
	}

	function isEmail(email) {
		const re =
			/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(String(email).toLowerCase());
	}

	let newsletterFormSubmit = document.querySelector('.newsletter--btn');
	let formFeedback = document.querySelector('.form--feedback');
	let newsletterForm = document.getElementById('newsletter__form');
	let submissionError = document.querySelector('.submission--error');

	if (newsletterForm != undefined) {
		let formHeight = newsletterForm.offsetHeight;
		formFeedback.style.minHeight = formHeight + 'px';
	}

	// Common Ajax callback for all async process
	async function ajaxcallback(url, params) {
		let response;

		await fetch(url, {
			method: 'POST',
			credentials: 'same-origin',
			headers: {
				'Cache-Control': 'no-cache',
			},
			body: params,
		})
			.then((responseData) => {
				if (responseData.status == 200) {
					response = responseData.json();
				}
			})
			.catch((error) => {});

		return response;
	}

	async function formSubmitAjaxHandler(form, submitButton) {
		// get the ajax action
		const action = form.getAttribute('id');
		// preapare ajax parameter

		let params = new FormData(form);

		params.append('action', action);
		// made submit disabled when user hit for call
		submitButton.disabled = true;

		// fire ajax call back function to get asynchronously data from server
		let response = await ajaxcallback(gb_ajax.ajaxurl, params);

		// process response if success
		if (response) {
			if (response?.data?.status == true) {
				form.remove();
				formFeedback.classList.remove('d-none');
			} else {
				submissionError.textContent = response?.data?.msg;
				if (submissionError.classList.contains('d-none')) {
					submissionError.classList.remove('d-none');
				}
			}
		}
		submitButton.disabled = false;
		submitButton.classList.remove('button--loading');
	}

	if (newsletterFormSubmit != undefined) {
		newsletterFormSubmit.addEventListener('click', function (e) {
			e.preventDefault();
			let form = e?.target?.form;

			let submitButton = e?.target;
			submissionError.classList.add('d-none');
			const isFormValid = formvalidation(form);
			if (!isFormValid) return false;
			submitButton.classList.add('button--loading');
			formSubmitAjaxHandler(form, submitButton);
		});
	}

	async function sendEmail(url, body, form) {
		const response = await fetch(url, {
			method: 'POST',
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'Cache-Control': 'no-cache',
			},
			body: body,
		});

		var data = await response.json();

		if (response.status == 200) {
			form.querySelector('input[type="submit"]').disabled = false;
			if (false == data.status) {
				form.querySelector('.response').classList.add('show');
				form.querySelector('.response-message').classList.remove(
					'success'
				);
				form.querySelector('.response-message').classList.add('error');
				form.querySelector('.response-message').innerHTML =
					data.message;
				form.reset();
			} else {
				form.querySelector('.response').classList.add('show');
				form.querySelector('.response-message').classList.remove(
					'error'
				);
				form.querySelector('.response-message').classList.add(
					'success'
				);
				form.querySelector('.response-message').innerHTML =
					data.message;
				form.reset();
				setTimeout(function () {
					form.querySelector('.response').classList.remove('show');
					form.querySelector('.response-message').innerHTML = '';
				}, 2000);
			}
		}
	}

	function getNewsList(paged, taxonomy) {
		const params = new URLSearchParams();
		params.append('action', 'getNewsList');
		params.append('paged', paged);
		params.append('taxonomy', taxonomy);

		getNewsPosts(gb_ajax.ajaxurl, params);
	}
	async function getNewsPosts(url, body) {
		const response = await fetch(url, {
			method: 'POST',
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'Cache-Control': 'no-cache',
			},
			body: body,
		});

		var data = await response.json();

		if (response.status == 200) {
			if (data.html != '') {
				document.querySelector('.news__listings').innerHTML = data.html;
				document
					.querySelector('.news__listings')
					.scrollIntoView({ behavior: 'smooth' });
			}
		}
	}

	function getCustomersList(paged, taxonomy) {
		const params = new URLSearchParams();
		params.append('action', 'getCustomersList');
		params.append('paged', paged);
		params.append('taxonomy', taxonomy);

		getCustomersPosts(gb_ajax.ajaxurl, params);
	}
	async function getCustomersPosts(url, body) {
		const response = await fetch(url, {
			method: 'POST',
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'Cache-Control': 'no-cache',
			},
			body: body,
		});

		var data = await response.json();

		if (response.status == 200) {
			if (data.html != '') {
				document.querySelector('.customers__listings').innerHTML =
					data.html;
				document
					.querySelector('.customers__listings')
					.scrollIntoView({ behavior: 'smooth' });
			}
		}
	}

	// News slider
	if (document.querySelector('.news__slider')) {
		var selector = document.getElementsByClassName('news__slider');

		for (var i = 0; i < selector.length; i++) {
			const slide_ele = selector[i];
			const mainNews = new Splide(slide_ele, {
				type: 'loop',
				arrows: true,
				easing: 'linear',
				width: 'calc(1600px + ((100vw - 1600px) / 2))',
				perPage: 3,
				perMove: 1,
				gap: '20px',
				pagination: false,
				padding: { right: '10rem' },
				breakpoints: {
					1919: {
						width: '1340px',
					},
					1401: {
						perPage: 2,
						width: 'calc(940px + ((100vw - 940px) / 2))',
					},
					1024: {
						perPage: 2,
						padding: { right: '0' },
						width: 'calc(740px + ((100vw - 740px) / 2))',
					},
					768: {
						perPage: 1,
						padding: { right: '11.2rem' },
						width: 'calc(649px + ((100vw - 649px) / 2))',
					},
					767: {
						perPage: 1,
						padding: { right: '3.75rem' },
						width: 'calc(440px + ((100vw - 440px) / 2))',
					},
					479: {
						perPage: 1,
						width: 'calc(300px + ((100vw - 300px) / 2))',
					},
					390: {
						padding: 0,
					},
				},
			});
			mainNews.mount();
		}
	}

	// Testimonial slider
	if (document.querySelector('.testimonial_slider')) {
		var sliderselector =
			document.getElementsByClassName('testimonial_slider');

		for (var i = 0; i < sliderselector.length; i++) {
			const slide_ele = sliderselector[i];
			const testimonialSlider = new Splide(slide_ele, {
				type: 'loop',
				perPage: 1,
				perMove: 1,
				pauseOnHover: false,
				arrows: true,
				easing: 'linear',
				width: '1920px',
				fixedWidth: '811.5px',
				gap: '13.5px',
				pagination: false,
				breakpoints: {
					1920: {
						width: '1366px',
					},
					1919: {
						width: '1340px',
					},
					1401: {
						width: '940px',
					},
					1024: {
						width: '649px',
						fixedWidth: '512px',
					},
					767: {
						width: '440px',
						fixedWidth: '320px',
					},
					479: {
						width: '300px',
						fixedWidth: '300px',
					},
				},
			});
			testimonialSlider.mount();
		}
	}

	// Timeline slider
	if (document.querySelector('.timelines')) {
		var timeline_ele = document.getElementsByClassName('timelines');

		for (var i = 0; i < timeline_ele.length; i++) {
			var selector = timeline_ele[i].querySelector('.timeline_slider');
			var nav = timeline_ele[i].querySelector('.timeline__nav');
			var main = new Splide(selector, {
				type: 'fade',
				pauseOnHover: false,
				width: '644.69px',
				fixedWidth: '644.69px',
				pagination: false,
				arrows: false,
				cover: true,
				breakpoints: {
					1024: {
						width: '440px',
						fixedWidth: '440px',
					},
					767: {
						width: '300px',
						fixedWidth: '300px',
					},
				},
			});
			var thumbnails = new Splide(nav, {
				rewind: true,
				width: '1340px',
				fixedWidth: 'auto',
				isNavigation: true,
				gap: 46,
				pagination: false,
				cover: true,
				focus: 'center',
				trimSpace: false,
				breakpoints: {
					1401: {
						width: '940px',
					},
					1024: {
						width: '440px',
					},
					767: {
						width: '300px',
					},
				},
			});
			main.sync(thumbnails);
			let splideDoc = thumbnails?.root;
			thumbnails.on('move', function (newIndex, prevIndex, destIndex) {
				if (splideDoc != undefined) {
					let prevEle = splideDoc.querySelector(
						'.timeline__nav [data-index="' + prevIndex + '"]'
					);
					let targetEle = splideDoc.querySelector(
						'.timeline__nav [data-index="' + destIndex + '"]'
					);
					prevEle.classList.remove('animation-start');
					targetEle.classList.add('animation-start');
				}
			});
			main.mount();
			thumbnails.mount();
			if (splideDoc != undefined) {
				let activeEle = splideDoc.querySelector(
					'.timeline__nav [data-index="0"]'
				);
				if (activeEle != undefined) {
					activeEle.classList.add('animation-start');
				}
			}
		}
	}

	// Tab slider
	if (document.querySelector('.tabs')) {
		var timeline_ele = document.getElementsByClassName('tabs');

		for (var i = 0; i < timeline_ele.length; i++) {
			var selector = timeline_ele[i].querySelector('.tab_slider');
			var nav = timeline_ele[i].querySelector('.tab__nav');

			var main = new Splide(selector, {
				type: 'fade',
				pauseOnHover: false,
				pagination: false,
				arrows: false,
				cover: true,
				drag: false,
			});
			var thumbnails = new Splide(nav, {
				rewind: true,
				fixedWidth: 480,
				isNavigation: true,
				gap: 0,
				focus: 'center',
				pagination: false,
				arrows: false,
				cover: true,
				padding: { left: 'calc((100vw - 1600px) / 2)' },
				breakpoints: {
					1919: {
						padding: { left: 'calc((100vw - 1340px) / 2)' },
					},
					1400: {
						padding: { left: 'calc((100vw - 940px) / 2)' },
					},
					1024: {
						padding: { left: 'calc((100vw - 740px) / 2)' },
						fixedWidth: 384,
					},
					768: {
						padding: { left: 'calc((100vw - 640px) / 2)' },
					},
					480: {
						padding: { left: 'calc((100vw - 400px) / 2)' },
						fixedWidth: 280,
					},
					419: {
						padding: { left: 'calc((100vw - 300px) / 2)' },
					},
				},
			});

			main.sync(thumbnails);

			main.mount();
			thumbnails.mount();
		}
	}

	if (document.querySelector('.location__slider')) {
		var location__sliders =
			document.getElementsByClassName('location__slider');

		for (var i = 0; i < location__sliders.length; i++) {
			const slider_ele = location__sliders[i];

			const splideSlider = new Splide(slider_ele, {
				pagination: false,
				type: 'fade',
				rewind: true,
			});

			splideSlider.mount();

			const slider_doc = slider_ele.parentElement.parentElement;
			const markers = slider_doc.querySelectorAll('.marker');

			splideSlider.on('move', function (newIndex, prevIndex, destIndex) {
				removeActivemarker(markers);
				const marker = slider_doc.querySelector(
					"[data-id='marker--" + destIndex + "']"
				);
				marker.classList.add('active');
			});

			function removeActivemarker(markers) {
				markers.forEach((marker) => {
					marker.classList.remove('active');
				});
			}

			markers.forEach((marker) => {
				marker.addEventListener('click', function handleClick(event) {
					removeActivemarker(markers);
					marker.classList.add('active');
					var marker_index = marker.getAttribute('data-index');
					splideSlider.go(parseInt(marker_index));
				});
			});
		}
	}

	// video play

	const videoSlider = document.querySelector('.video--slider');

	const video = document.querySelector('.video--slider video');

	if (video != undefined) {
		let maxTime;

		var navItmes = document.querySelectorAll(
			'.video--slider__nav .video--slider__nav-item'
		);

		let videoProgeessbar = document.querySelector(
			'.video--slider__progress'
		);

		let videoProgeessbarMobile = document.querySelector(
			'.vs--mobile__progress span'
		);

		let frameID;
		let videoTimeonLoad;

		const registerVideo = (bound, video) => {
			bound = document.querySelector(bound);
			video = document.querySelector(video);

			const scrollVideo = (timestamp) => {
				if (video.duration) {
					const distanceFromTop =
						window.scrollY + bound.getBoundingClientRect().top;
					const rawPercentScrolled =
						(window.scrollY - distanceFromTop) /
						(bound.scrollHeight - window.innerHeight);
					const percentScrolled = Math.min(
						Math.max(rawPercentScrolled, 0),
						1
					);

					video.currentTime = video.duration * percentScrolled;

					var playtimestamp = video.currentTime.toFixed();

					progressBar(percentScrolled, video.duration, playtimestamp);

					navClassFunction(playtimestamp);
				}

				frameID = requestAnimationFrame(scrollVideo);
			};

			frameID = requestAnimationFrame(scrollVideo);
		};

		if (navItmes != undefined) {
			const navlastItem = navItmes[navItmes.length - 1];
			maxTime = navlastItem?.dataset?.timestamp;
		}

		function progressBar(percentScrolled, duration, playtimestamp) {
			let activePoint = document.querySelector(
				'.video--slider__nav-item.is-active'
			);

			percentScrolled = percentScrolled * 100;

			if (activePoint == undefined) {
				activePoint = document.querySelector(
					'.video--slider__nav-item'
				);
			}

			if (activePoint != undefined) {
				let previousElement = activePoint.previousSibling;

				let previousElementTimestamp;

				if (previousElement == null) {
					previousElementTimestamp = 0;
				} else {
					previousElementTimestamp =
						previousElement?.dataset.timestamp;
				}

				let travelDistanceValue = 100;

				let activeElementTimestamp = activePoint?.dataset.timestamp;

				let targetSecond =
					activeElementTimestamp - previousElementTimestamp;

				let targetIndex = activePoint?.dataset.index;

				targetSecond = targetSecond * 100;
				percentScrolled = percentScrolled * 100;

				travelDistanceValue = travelDistanceValue * targetIndex;

				let count = Math.min(
					(travelDistanceValue / targetSecond) * percentScrolled,
					travelDistanceValue
				);

				videoProgeessbar.style.top = 50 + count + 'px';

				videoProgeessbarMobile.style.left = 80 + count + 'px';
			}
		}

		registerVideo('.video--slider', '.video--slider video');

		video.addEventListener(
			'loadedmetadata',
			function () {
				let NavlastItem = document.querySelector(
					'.video--slider__nav-item[data-index="5"]'
				);

				NavlastItem.dataset.end = video.duration;
				//video slider
				if (document.querySelector('.video--slider')) {
					var lists = document.querySelectorAll(
						'.video--slider__nav .video--slider__nav-item'
					);
					lists.forEach(function (list, index) {
						list.addEventListener('click', function () {
							lists.forEach(function (allList, i) {
								allList.classList.remove('is-active');
							});
							this.classList.add('is-active');
							const videoJumpTime = parseInt(
								this.dataset.timestamp
							);
						});
					});
				}
			},
			false
		);

		var oldScrollY = window.scrollY;

		function navClassFunction(playtimestamp) {
			// let activeItem = document.querySelector('.video--slider__nav-item.is-active');

			// if(activeItem != undefined && activeItem != null) {

			// 	activeItem.classList.remove('is-active');

			// }
			// let vsNavitemNext = document.querySelector('.video--slider__nav-item[data-timestamp="'+playtimestamp+'"]');

			// if(vsNavitemNext != undefined && vsNavitemNext != null) {

			// 		vsNavitemNext.classList.add('is-active');

			// }

			let direction = 'down';

			if (oldScrollY > window.scrollY) {
				direction = 'up';
			} else {
				direction = 'down';
			}

			oldScrollY = window.scrollY;

			let vsNavitemNext = document.querySelector(
				'.video--slider__nav-item[data-timestamp="' +
					playtimestamp +
					'"]'
			);
			let vsNavitemPrev = document.querySelector(
				'.video--slider__nav-item[data-end="' + playtimestamp + '"]'
			);

			if (direction == 'up') {
				vsNavitemPrev = document.querySelector(
					'.video--slider__nav-item[data-timestamp="' +
						playtimestamp +
						'"]'
				);
				vsNavitemNext = document.querySelector(
					'.video--slider__nav-item[data-end="' + playtimestamp + '"]'
				);
			}

			if (vsNavitemNext != undefined && vsNavitemNext != null) {
				vsNavitemNext.classList.add('is-active');
			}

			if (vsNavitemPrev != undefined && vsNavitemNext != null) {
				vsNavitemPrev.classList.remove('is-active');
			}
		}
	}
});
