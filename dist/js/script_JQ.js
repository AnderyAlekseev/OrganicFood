
$(document).ready(function () {
    // загружаем отзыв по умолчанию
    getRewiew();

    // скрыть/показать мобильное меню
    $('#header_hamburger').click(function () {
        $atr = $(this).attr('show');
        if ($atr) {
            $(this).attr('show', null);  //если атрибут есть, значит закрыть меню и убрать атрибут
            $('#header__menu').fadeOut(500);
        } else {
            $(this).attr('show', 'open'); // атрибута нет, значит добавим атрибут и откроем меню
            $('#header__menu').fadeIn(500);
        }
    });

    //   закрыть все модальные окна
    $('.modal_close').click(function () {
        $('.overlay, .modal, .modal_thanks').fadeOut(500);
    });

    //   открыть модальное окно регистрации
    $('#register').click(function () {
        $('.overlay, .modal').fadeIn(500);
    });

    // показать - скрыть кнопку "Вверх" при прокручивании экрана
    $(window).scroll(function () {
        if ($(this).scrollTop() > 1600) {
            $('.page_up').fadeIn();
        } else {
            $('.page_up').fadeOut();
        }
    });



    // отравка форм
    $('form').submit(function (e) {
        e.preventDefault();
        let validForm = $(this).validate(
            {
                rules: {
                    name: {
                        required: true,
                        minlength: 2
                    },
                    phone: "required",
                    email: {
                        required: true,
                        email: true
                    }
                },
                messages: {
                    name: {
                        required: " Нам нужно Ваше имя!  ",
                        minlength: jQuery.validator.format("В имени должно быть не менее {0} символов!")
                    },
                    email: {
                        required: "Обязательно адрес электронной почты",
                        email: "Адрес электронной почты в формате name@domain.com"
                    },
                    phone: {
                        required: "Телефон в международном формате"
                    }
                }
            });
        if (validForm) {
            $.ajax({
                type: "POST",
                url: "php/mailer/smart.php",
                data: $(this).serialize(),
                // success: 
            }).done(function () {
                $(this).find('input').val('');
                $(this).fadeOut();
                $('#thanks').fadeIn();
                $('form').trigger('reset');
            })
        }
    });


    // плавный скролл  при нажатии на page_up
    $('.page_up').on("click", function () {

        $('html, body').animate(
            { scrollTop: "0px" },
            {
                duration: 1000,
                easing: "linear"
            }
        );
        // return false;
    });

    // перелистывание отзывов
    $('#prev').on("click", function () {
        $(this).addClass("round_button_active").siblings().removeClass('round_button_active')
        getRewiew('prev');
    });

    $('#next').on("click", function () {
        $(this).addClass("round_button_active").siblings().removeClass('round_button_active')
        getRewiew('next');
    });
});




function getRewiew(dir) {
    let Data = { direction: dir };// направление пролистывания
    $.ajax({
        url: 'php/rewiews.php',
        type: "GET",
        data: Data,
        async: true,
        success: function (data) {
            console.log('data',data);
            let responce = JSON.parse(data);
            $('#customer_text').text(responce.text);
            $('#cutomer_name').text(responce.name + ' ' + responce.surname);
            $('#customer_photo').attr('src', responce.photo);
            let rt = responce.raiting;
            $(".rewiews_footer_raiting_stars_item").show(); // открыть все звезды
            let sib_hide = $(".rewiews_footer_raiting_stars_item").eq(rt - 1).nextAll().hide();   // скрыть звезды после оценки пользователя
        }
    });
}