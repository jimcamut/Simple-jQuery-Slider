(function($) {

    $.fn.camutSlider = function() {

        $(".slider").each(function (i, el) {

            // Variables
            var slider = $(el), // this is the element
                numSlides = slider.find("li").length, // number of slides
                width = slider.outerWidth(),
                height = slider.find("li:eq(0)").outerHeight(), // Not needed, but here for future use
                count = 0; // Generic counter so we can keep track of slides

            // Setup:
            var settings = {
                arrows: true,
                dots: true,
                auto: true, // Make the slides cycle on their own
                interval: 6000, // the time between slides
                speed: 1 // number of seconds that the slider transitions should be
            };

            // Override the default settings if the data attributes are set
            for (var key in settings) {
                if (slider.data(key) !== undefined) {
                    settings[key] = slider.data(key);
                }
            }


            function placeSlider(width, speed) {
                if (speed === undefined) {speed = settings.speed;}

                slider.find(".slides").css({
                    "-webkit-transform": "translate3d(" + (-count * width) + "px, 0px, 0px)",
                    "-webkit-transition":  speed + "s ease",
                    "-moz-transform": "translate3d(" + (-count * width) + "px, 0px, 0px)",
                    "-moz-transition":   speed + "s ease",
                    "-ms-transform": "translate3d(" + (-count * width) + "px, 0px, 0px)",
                    "-ms-transition":  speed + "s ease",
                    "-o-transform": "translate3d(" + (-count * width) + "px, 0px, 0px)",
                    "-o-transition":   speed + "s ease",
                    "transform": "translate3d(" + (-count * width) + "px, 0px, 0px)",
                    "transition":   speed + "s ease"
                });
            }

            function placeSlides(width, speed) {
                if (speed === undefined) {speed = settings.speed;}
                slider.find("li").each(function (j, elj) {
                    $(this).css({
                        "left": j * width,
                        "-webkit-transition":  speed + "s ease",
                        "-moz-transition":   speed + "s ease",
                        "-ms-transition":  speed + "s ease",
                        "-o-transition":   speed + "s ease",
                        "transition":   speed + "s ease"
                    });
                });
            }
            placeSlides(width);


            $(window).bind("resize load", function() {
                width = slider.outerWidth();
                placeSlides(width, 0);
                placeSlider(width, 0);
            });

            // Make the first slider have an active class
            slider.find("li:eq(0)").addClass("active");

            // Add the dot selectors
            if (settings.dots && numSlides > 1) {
                var counter = $("<ol class='dots'></ol>"),
                    dot = $("<li></li>");
                slider.append(counter);
                for (var k = 0; k < numSlides; k++) {
                    counter.append(dot.clone());
                }
                var cWidth = counter.outerWidth();
                counter.css("margin-left", (-cWidth / 2) + "px");
                counter.find("li:eq(0)").addClass("active");
            }

            // Add the arrows
            if (settings.arrows && numSlides > 1) {
                var arrows = $("<a href='#' class='arrow prev'></a><a href='#' class='arrow next'></a>");
                slider.append(arrows);
            }

            // Auto slide settingsuration
            var slideAuto = {
                totalSeconds: 0,
                start: function () {
                    var self = this;
                    this.interval = setInterval(function () {
                        count++;
                        if (count === numSlides) {
                            count = 0;
                        }
                        slideEm(count, width);
                    }, settings.interval);
                },
                pause: function () {
                    clearInterval(this.interval);
                    delete this.interval;
                },
                resume: function () {
                    if (!this.interval) this.start();
                }
            };
            slideAuto.start();


            // Click function for the arrows
            slider.find(".arrow").click(function (e) {
                e.preventDefault();
                slideAuto.pause();

                var arrow = $(this),
                    prev = arrow.hasClass("prev"),
                    next = arrow.hasClass("next");
                if (prev) {
                    count--;
                } else {
                    count++;
                }

                if (count === numSlides) {
                    count = 0;
                } else if (count < 0) {
                    count = numSlides - 1;
                }

                slideEm(count, width);
                setTimeout(function () {
                    slideAuto.resume();
                }, 1000);
            });

            // Click function for the dots
            slider.find(".dots li").click(function () {
                slideAuto.pause();
                var index = $(this).index();
                count = index;

                if (count === numSlides) {
                    count = 0;
                } else if (count < 0) {
                    count = numSlides - 1;
                }

                slideEm(count, width);
                setTimeout(function () {
                    slideAuto.resume();
                }, 1000);
            });



            // Bind mouse hover to pause and resume slider
            slider.bind("mouseover", function(){
                slideAuto.pause();
            });
            slider.bind("mouseleave", function(){
                slideAuto.resume();
            });


            // This is the function that makes the sliders slide
            function slideEm(count, width) {
                placeSlider(width);
                // Handling active classes of dots and slides
                slider.find(".slides li").removeClass("active");
                setTimeout(function () {
                    slider.find(".slides li:eq(" + count + ")").addClass("active");
                }, settings.speed * 1000); // Waits until the animation occurs to add the active class
                slider.find("ol.dots li").removeClass("active");
                slider.find("ol.dots li:eq(" + count + ")").addClass("active");
            }
        });
    }
    // The End!
}(jQuery));