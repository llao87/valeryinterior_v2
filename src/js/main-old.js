jQuery(function () {
    // карусель партнеров
    const partnersCarousel = new Swiper(".js-partners", {
        loop: true,
        slidesPerView: 1,
        autoplay: {
            delay: 1500,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
            },
            991: {
                slidesPerView: 3,
            },
            1180: {
                slidesPerView: 4,
            },
            1340: {
                slidesPerView: 5,
            },
        },

        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });

    // прокрутка страницы
    jQuery(".nav-link").on("click", function (e) {
        e.preventDefault();
        let href = jQuery(this).attr("href");

        console.log(document.location.pathname);

        if (document.location.pathname == "/") {
            if (href == "/") {
                href = "#promo";
            }

            if (href.includes("#")) {
                jQuery(this)
                    .parents(".container")
                    .find(".active")
                    .removeClass("active");

                jQuery("html, body").animate(
                    {
                        scrollTop: jQuery(href).stop().offset().top,
                    },
                    {
                        duration: 900,
                        easing: "linear",
                    }
                );
            } else {
                document.location.href = href;
            }
        } else {
            href = href.includes("#") ? "/" + href : href;
            document.location.href = href;
        }
    });

    // аккордеон дополнительных услугах
    jQuery(".js-services-list").accordion({
        active: false,
        collapsible: true,
        heightStyle: "content",
        beforeActivate: function (event, ui) {
            jQuery(".js-services-list .js-open-close").removeClass("active");
            jQuery(ui.newHeader, ui.oldHeader)
                .find(".js-open-close")
                .toggleClass("active");
        },
    });

    // аккордеон FAQ
    jQuery("#questions").accordion({
        active: false,
        collapsible: true,
        heightStyle: "content",
        beforeActivate: function (event, ui) {
            jQuery("#questions .js-open-close").removeClass("active");
            jQuery(ui.newHeader, ui.oldHeader)
                .find(".js-open-close")
                .toggleClass("active");
        },
    });

    // вызов формы
    jQuery(".js-callback-open").on("click", function () {
        let formTitle = jQuery(this).data("title"),
            formSubtitle = jQuery(this).data("subtitle");

        jQuery(".overlay .callback-form .form-title").text(formTitle);
        jQuery(".overlay .callback-form .form-subtitle").text(formSubtitle);

        jQuery(".overlay")
            .css({ display: "block" })
            .animate({ opacity: 1 }, 600, function () {
                jQuery("html").toggleClass("fixed");
            });
    });

    // Закрытие формы
    jQuery(document).on("click", ".js-close", function () {
        jQuery(".overlay").animate({ opacity: 0 }, 600, function () {
            jQuery(this).hide();
            jQuery("html").toggleClass("fixed");
            jQuery(".success").hide();
        });
    });

    // настройки lightbox
    lightbox.option({
        alwaysShowNavOnTouchDevices: true,
    });

    jQuery(".js-callback-form").on({
        submit: function (e) {
            e.preventDefault();

            let postData = [],
                errors = 0;

            postData = {
                title: jQuery(this).find(".form-title").text(),
                subtitle: jQuery(this).find(".form-subtitle").text(),
                email: jQuery('input[name="email"]').val(),
                name: jQuery('input[name="name"]').val(),
                phone: jQuery('input[name="phone"]').val(),
            };

            if (!postData["email"]) {
                errors++;
                jQuery('input[name="email"]')
                    .addClass("error")
                    .prev(".error")
                    .text("Не заполнено поле E-mail");
            } else {
                jQuery('input[name="email"]')
                    .removeClass("error")
                    .prev(".error")
                    .text("");
            }

            if (!postData["name"]) {
                errors++;
                jQuery('input[name="name"]')
                    .addClass("error")
                    .prev(".error")
                    .text("Не заполнено поле Имя");
            } else {
                jQuery('input[name="name"]')
                    .removeClass("error")
                    .prev(".error")
                    .text("");
            }

            if (!postData["phone"]) {
                errors++;
                jQuery('input[name="phone"]')
                    .addClass("error")
                    .prev(".error")
                    .text("Не заполнено поле Телефон");
            } else {
                jQuery('input[name="phone"]')
                    .removeClass("error")
                    .prev(".error")
                    .text("");
            }

            if (errors == 0) {
                jQuery
                    .ajax({
                        url: "/scripts/send.php",
                        method: "POST",
                        data: postData,
                    })
                    .done(function (data) {
                        console.log(data);
                        yaCounter90720166.reachGoal('valeri');
                        // ym(90720166, "reachGoal", "valeri");
                        jQuery(".js-callback-form .success").show();
                    });
            }
        },
    });

    jQuery(".js-burger").on("click", function () {
        jQuery(this).find(".burger-inner").toggleClass("active");
        jQuery(this).next(".main-nav").toggleClass("active");

        console.log("burger click");
    });
});
