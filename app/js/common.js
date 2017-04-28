$(document).ready(function(){
	modalOffsetTop = $('.modal-box').offset().top;
	offerOffsetTop = $('.offer-box').offset().top;
	modal = $('#modal');
	page = $('html, body');

	$('a[href^="#"]').click(function() {
		var fixedHeadeHeight = $('.header-box').height();
	    page.animate({
	        scrollTop: jQuery($.attr(this, 'href')).offset().top - fixedHeadeHeight/2.25
	    }, 1000);
	    return false;
	});

// $(document).ready(function(){
// 	var changeAlert =function(){
// 		$('.alert-message').text('Пожалуйста, выберите правильный город')
// 	}();
// })

var sticky = function(){
	var headerBox = $('.header-box')
	var navPos, winPos, navHeight;

	$('<div class="clone-nav-menu"></div>').insertBefore(headerBox)

	function refreshVar() {
	    navPos = headerBox.offset().top;
	    navHeight = headerBox.outerHeight(true);
	    headerHeight = headerBox.height();
	}

	refreshVar();
	$(window).resize(refreshVar);

	$(window).scroll(function() {
	    winPos = $(window).scrollTop();
	    $('.clone-nav-menu').css('height',headerBox.height())
	    // if (winPos > navPos && $(window).width() > 767) {
	    if (winPos > navPos) {
	        headerBox.addClass('fixed');
	        $('.clone-nav-menu').show();
	    } else {
	        headerBox.removeClass('fixed');
	        $('.clone-nav-menu').hide();

	    }
	});
	if ($(window).width() < 767) {
		$('.header-box').addClass('fixed')
	}

}();

$('#gallery-list').unitegallery();

$('.choisen-box').owlCarousel({
	autoPlay: true
})

$('.feedbk-box').owlCarousel({
	items: 4,
	itemsDesktopSmall: [1500, 3],
	itemsTablet: [980, 2],
	itemsMobile: [650, 1],
	margin: 20,
	lazyLoad: true,
	slideSpeed: 2500,
	rewindSpeed: 3000,
	paginationSpeed: 2000,
	autoPlay: 5000,
	stopOnHover: true,
	pagination: true,
	navigation: false
})



// $('#gallery-list2').unitegallery();

// $('.gallery-carousel').owlCarousel({
// 	items: 1,
// 	navigation: true
// })

// $('#gallery-list').owlCarousel();

// $('.choisen-box, .feedbk-box').owlCarousel()

// $('.feedbk-carousel-box .owl-item').wrapAll('<div class="carousel-sub-center" />')

	$('<div class="shadow"></div>').prependTo($('main'));

	// $('<div class="offer-box"><div class="offer-inner clearfix"></div></div>').prependTo($('body'));

	function showModal() {
		$('.shadow').fadeIn(100)
		// $('main').addClass('blur')

		$('body').addClass('none-overflow')
	};

	function hideModal() {
		$('.shadow').fadeOut(100)
		$('main').removeClass('blur')
		$('.offer-box').removeClass('show')

		$('.header-inner').removeClass('open')
		// $('.btn-mobile').click()

		$('body').removeClass('none-overflow')
	}

	$('.close-modal').click(function(){
		modal.fadeOut(200)
		hideModal()
	})

	$("input[type='tel']").mask("+38 (099) 999-99-99");

	$('.btn-mobile').click(function(){
		$('.header-inner').toggleClass('open')
		$('#main-menu').slideToggle('fast',function(){})

		if ($('.header-inner').hasClass('open')) {
			// $('.shadow').fadeOut(100)
			showModal()
		} else {
			// $('.shadow').fadeIn(100)
			hideModal()
			
		}
	})


	$('#basket').click(function(){
		showModal()
		// $('html, body').animate({ scrollTop: 0 }, 'fast');
		$('.offer-box').addClass('show')
		
		// <p class="h2-lim">вы не выбрали ни одного товара</p>

	   $('.minus').click(function () {
	        var $input = $(this).parent().find('input');
	        var count = parseInt($input.val()) - 1;
	        count = count < 1 ? 1 : count;
	        $input.val(count);
	        $input.change();
	        return false;
	    });
	    $('.plus').click(function () {
	        var $input = $(this).parent().find('input');
	        $input.val(parseInt($input.val()) + 1);
	        $input.change();
	        return false;
	    });

	});


$('.btn-recipe').click(function(){
	var formRecipe = $("#form-download-recipe");
	if(formRecipe[0].checkValidity()) {
			$.post('/Post_Contact.php', formRecipe.serializeArray(), function(data) {
			});
		formRecipe.children('input').val("");
		$('.download-recipe')[0].click();
		return false;
	}

})

$('.btn-pre-order, .btn-callback').click(function(){
	var thisValue = $(this).val();
	var btnArray = modal.find($('.btn-array')).val(thisValue).text(thisValue);
	showModal();
	modal.find('.modal-name').text(thisValue);

	if ($(this).hasClass('btn-pre-order')) {
		modal.removeClass('callback').addClass('pre-order').show();
		console.log(btnArray.val());
	} else if ($(this).hasClass('btn-callback')) {
		modal.removeClass('pre-order').addClass('callback').show();
		console.log(btnArray.val());
	}
})



	$('.shadow').click(function(){
		hideModal()
		modal.fadeOut(300)
	})

	$('.btn-buy-item').click(function(){
		if ($(this).hasClass('added') === false) {

			var offerImg = $(this).parent('.item-total').siblings('.item-box').find('img').attr('src');
			console.log(offerImg)
			var offerName = $(this).val(); 
			var offerPrice = $(this).siblings('.price').text();

			console.log($(this).attr('class'))

			$('<div class="offer-item clearfix">'+

				'<div class="offer-img"><img src="'+offerImg+'"></div>'+
				// '<div class="offer-img2">'+'<img />'.attr('src',offerImg).wrap('.offer-img')+'</div>'+

				'<div class="offer-name">'+offerName+'</div><div class="offer-quan"><div class="number"><span class="minus">-</span><input type="text" value="1"/><span class="plus">+</span></div></div><div class="offer-price">'+offerPrice+'</div></div>').prependTo($('.offer-inner'))
			// console.log(offerImg)
			// console.log(offerName)
			// console.log(offerPrice)
		}
		$(this).addClass('added').text('в корзине')
		var countNum = $('.btn-buy-item.added').length;
		$('.counter').fadeIn(100).text(countNum);

	})

// showModal()
})

$(window).on('load resize',function(){
	var winW = $(this).width(),
		winH = $(this).height(),
		headeHeight = $('.header-box').height(),
		headeHeightt = $('.header-box').offset().top,
		need = offerOffsetTop - headeHeightt + headeHeight,
		modalHeight = $('.modal-box').height(),
		modalOffsetTop = $('.modal-box').offset().top;

// var findOffset = function() {
// 	var modalOffsetTop = $('.modal-box').offset().top,
// 		offerOffsetTop = $('.offer-box').offset().top;
// 		console.log(modalOffsetTop)
// }()

// console.log(winH)
// console.log(headeHeight)
// console.log(modalHeight)
// console.log(modalOffsetTop)


	if(winW>767) {
		$('#main-menu').removeAttr('style').show()
		$('.header-inner').removeClass('open')
	} else {
		$('#main-menu li a').click(function(){
			$('.header-inner').removeClass('open')
			$('#main-menu').slideToggle('fast',function(){})
			$('.shadow').fadeOut(100)
			hideModal()
		})

		$('.btn-callback').click(function(){
			console.log(winH)
			console.log(offerOffsetTop)
			console.log(headeHeightt)
			console.log(need)
		})


		$('.shadow').click(function(){

			// if ($('.header-inner').hasClass('open') == true) {
			// 	$('#main-menu').slideToggle('fast',function(){})
			// }

			$('.header-inner.open').removeClass('open')
			$('.header-inner').find($('#main-menu')).slideToggle('fast',function(){})

			// console.log($('.header-inner').hasClass('open'))
			// $('#main-menu').slideToggle('fast',function(){})
			// $('.header-inner').removeClass('open')
		})
	}
	// if (winW<=767) {

	// 	$('#main-menu li a').click(function(){
	// 		$('#main-menu').slideToggle('fast',function(){})
	// 		hideModal()
	// 	})
	// }
	
	// $('#main-menu').css('top',headeHeight)

	// if (headeHeightt < offerOffsetTop) {
	// 	$('.modal-box').css('margin-top',need)
	// 	$('.offer-box').css('margin-top',need)
	// } else {
	// 	$('.modal-box').css('margin-top','0')
	// 	$('.offer-box').css('margin-top','0')
	// }
})


/*
ymaps.ready(init); // карта соберется после загрузки скрипта и элементов
var myMap; // заглобалим переменную карты чтобы можно было ею вертеть из любого места
function init () { // функция - собиралка карты и фигни
   myMap = new ymaps.Map("map", { // создаем и присваиваем глобальной переменной карту и суем её в див с id="map"
        center: [55.76, 37.64], // ну тут центр
        behaviors: ['default', 'scrollZoom'], // скроллинг колесом
        zoom: 10 // тут масштаб
   });
   myMap.controls // добавим всяких кнопок, в скобках их позиции в блоке
        .add('zoomControl', { left: 5, top: 5 }) //Масштаб
        .add('typeSelector') //Список типов карты
        .add('mapTools', { left: 35, top: 5 }) // Стандартный набор кнопок
        .add('searchControl'); // Строка с поиском
    }
    
myPlacemark0 = new ymaps.Placemark([55.752577,37.632134], { // Создаем метку с такими координатами и суем в переменную
        balloonContent: 'Заголовок метки 1Немного инфы о том, о сем. Лорем ипсум чото там.' // сдесь содержимое балуна в формате html, все стили в css
	}, {
	iconImageHref: 'img/icon1.png', // картинка иконки
	iconImageSize: [64, 64], // размер иконки
	iconImageOffset: [-32, -64], // позиция иконки
	balloonContentSize: [270, 99], // размер нашего кастомного балуна в пикселях
	balloonLayout: "default#imageWithContent", // указываем что содержимое балуна кастомная херь
	balloonImageHref: 'img/ballon1.png', // Картинка заднего фона балуна
	balloonImageOffset: [-65, -89], // смещание балуна, надо подогнать под стрелочку
	balloonImageSize: [260, 89], // размер картинки-бэкграунда балуна
	balloonShadow: false
});
 Добавляем метки на карту 
myMap.geoObjects
	.add(myPlacemark0);*/