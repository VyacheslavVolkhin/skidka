$(document).ready(function(){
    //content toggle action
    $('input[data-content]').each(function () {
        if ($(this).is(':checked')) {
            let selectContent = $(this).attr('data-content');
            $('.frm-content[data-content="' + selectContent + '"]').addClass('active');
        }
    })
    $('input[data-content]').on('click', function () {
        $('.frm-content.active').removeClass('active');
        $('input[data-content]').each(function () {
            if ($(this).is(':checked')) {
                let selectContent = $(this).attr('data-content');
                $('.frm-content[data-content="' + selectContent + '"]').addClass('active');
            }
        })
    })

    //btn tgl
    $('.js-btn-tgl').on('click', function () {
        $(this).toggleClass('active');
        return false;
    })
    
    
    //filter
    $('.js-filter-more').on('click', function() {
        $(this).parents('.filter-section-wrap').toggleClass('view-all');
        return false;
    })
    
    
    //gallery slider
    if (!!$('.photos-slider-box').offset()) {
        let pSlider = $('.photos-slider-box .slider-wrap .slider').slick({
            dots: false,
            slidesToShow: 1,
            infinite: true,
            prevArrow: false,
            nextArrow: false,
        });
        let pSliderPreview = $('.photos-slider-box .slider-preview-wrap .slider').slick({
            dots: false,
            slidesToShow: 4,
            vertical: true,
            infinite: true,
            prevArrow: '<span class="btn-action-ico ico-arrow ico-arrow-down"></span>',
            nextArrow: '<span class="btn-action-ico ico-arrow ico-arrow-up"></span>',
        });
        //pSlider.slick('refresh');
        //pSliderPreview.slick('refresh');
        $('.photos-slider-box .slider-wrap .slider').on('afterChange', function (event, slick, currentSlide, nextSlide) {
            $('.photos-slider-box .slider-preview-wrap .sl-wrap.active').removeClass('active');
            $('.photos-slider-box .slider-preview-wrap .elm-photo[data-slide="' + currentSlide + '"]').parent().addClass('active');
        });
        $('.photos-slider-box .slider-preview-wrap .slider .elm-photo').click(function () {
            let newSlide = $(this).attr('data-slide');
            $('.photos-slider-box .slider-preview-wrap .sl-wrap.active').removeClass('active');
            $(this).parent().addClass('active');
            $('.photos-slider-box .slider-wrap .slider').slick('slickGoTo', newSlide);
            return false;
        })
    }
    
});


