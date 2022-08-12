$(function () {
  $('[data-toggle="tooltip"]').tooltip();
  $('body').on('mouseenter mouseleave', 'nav .dropdown', function (e) {
    var dropdown = $(e.target).closest('.dropdown');
    var menu = $('.dropdown-menu', dropdown);
    dropdown.addClass('show');
    menu.addClass('show');
    setTimeout(function () {
      dropdown[dropdown.is(':hover') ? 'addClass' : 'removeClass']('show');
      menu[dropdown.is(':hover') ? 'addClass' : 'removeClass']('show');
    }, 50);
  });
  $(document).on('click', '#group_units_nav .basic_block_list a', function () {
    debugger;
    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function () {

        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    }  // End if
  })

  $(document).on('click', '.slide_arrow', function () {
        let $this=$(this);
        let list = $(this).siblings('.slide_vertical_block').find('ul');
        let item=$(list).children('li').get(1);
        let margin=parseInt($(item).css('margin-right'));
        let currentLeft = -parseInt($(list).css('left'));
        let maxWidth = $(list).width();
        let singleWidth = $(this).siblings('.slide_vertical_block').width();
        let currentWidth = currentLeft + singleWidth;
        let childrenWidth = 0;
 
        if ($(this).hasClass('slide_arrow_right')) {
            $(list).find('li').each(function () {
                childrenWidth += $(this).outerWidth() + margin;
                if (childrenWidth > currentWidth) {
                    childrenWidth -= $(this).outerWidth() + margin;
                    $this.css('right', '0');
                    $this.siblings('.slide_arrow_left').css('left', '0px');
                    $(list).css('left', -childrenWidth);
                    return false;
                }
            });
            if(childrenWidth+singleWidth>=maxWidth){
                $this.css('right', -$(this).width());
            }
        }
        else if ($(this).hasClass('slide_arrow_left')) {
        
            $(list).find('li').each(function () {
          
                childrenWidth += $(this).outerWidth() + margin;
                if (childrenWidth < currentWidth) {
                    childrenWidth -= $(this).outerWidth() + margin;
                    $this.siblings('.slide_arrow_right').css('right', '0px');
                    $this.css('left', '0');
                    $(list).css('left', -childrenWidth);
                    return false;
                }
            });
            if(childrenWidth+singleWidth<=maxWidth){
                $this.css('left', -$(this).width());
            }
        }
       
        // if(childrenWidth<=0){
        //     debugger;
        //     let value=-$(this).width();
        //     $this.siblings('.slide_arrow_left').css('left',-$(this).width());
        // }
  })
  $(document).on('click', '.unit_grade1_header', function () {
    let parent = $(this).closest('.unit_grade1');
   setTimeout(function () {
        $("html, body").animate({ scrollTop: $(parent).offset().top }, 300, function () {
            window.location.hash = $(parent).attr('id');
        });
    }, 300);
    })
  $(window).on('load', function () {
    setInterval(function () {
      let slide = $('.slide_vertical_area');
      if (slide != undefined) {
        $(slide.closest('div.slide_vertical').css('height', $(slide).height()));
        let wSlide = 0;
        let list = $(this).siblings('.slide_vertical_block').find('ul');
        let item = $(list).children('li').get(1);
        let margin = parseInt($(item).css('margin-right'));
        $(".slide_vertical_area li").each(function () {
          wSlide += $(this).outerWidth() + margin;
        });
        $(".slide_vertical_area").css('width', wSlide);
      }
    }, 500);
        
    if(window.location.hash!==""){
        let unit_header=$(window.location.hash).find('.unit_grade1_header');
        if(unit_header!=undefined)
        $(unit_header).trigger('click');
    }  
    });
    $(document).on("click", ".video-control-btn", function () {
		$("#my-video_html5_api").get(0).play();
		$("#my-video_html5_api").get(0).pause();
    $("#my-video_html5_api").get(0).currentTime = $(this).find('.video_word').attr("attime");
		$("#my-video_html5_api").get(0).play();
	})

    function playSound(url) {
        url = "/" + url;
        var a = new Audio(url + '.mp3');
        a.onended = function () {
            $(".word_card").css({ "box-shadow": "0 0 0 1px rgba(0,0,0,0.2)" });
        };
        a.play();
    }
    $(document).on("click", ".word_card .meaning", function () {
        var _URL=$(this).siblings(".record").find("span.span-audio-btn").attr("media-url");
        $(this).closest('.word_card').css({ "box-shadow": "0 0 0 6px rgba(255, 0, 0, .7)" });
		playSound(_URL);
    })
  
  $(document).on('click', ".span-audio-btn", function () {
    var url = $(this).attr("media-url");

    if (!url.includes("https://")) {
      url = "/" + url;
    }
    if (!url.includes(".mp3")) {
      url = url + ".mp3";
    }
    var a = new Audio(url);
    a.play();
  });
  $(document).on('click', ".uba_audioButton", function () {
    var url = $(this).attr("media-url");
    if (!url.includes("https://")) {
      url = "/" + url;
    }
    if (!url.includes(".mp3")) {
      url = url + ".mp3";
    }
    var a = new Audio(url);
    a.play();
  });
})

