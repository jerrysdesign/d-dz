$(document).ready(function(){

  //主選單
  $(document).ready(function(){
  
    $('.main_navigation > li').bind('mouseover', openSubMenu);
    $('.main_navigation > li').bind('mouseleave', closeSubMenu);

    function openSubMenu() {
      $(this).addClass('active');
      $(this).find('> ul').stop(true, true).slideDown(250);
    }

    function closeSubMenu() {
      $(this).removeClass('active');
      $(this).find('> ul').stop(true, true).slideUp(150);
    }
  });

  //側欄
  $(document).ready(function(){
    $('body').addClass('js');
    var $menu = $('#menu'),
        $menulink = $('.menu-link'),
        $menuTrigger = $('.has-subnav > a');

    $menulink.click(function(e){
      e.preventDefault();
      $menulink.toggleClass('active');
      $menu.toggleClass('active');
    });

    $menuTrigger.click(function(e){
      e.preventDefault();
      var $this = $(this);
      $this.toggleClass('active').next('ul').toggleClass('active');
    });

  });

  // Page Innovation Stories tab
  $(document).ready(function(){

    $('[class^="tab-"]').hide();
    $('[class^="tab-"]:first-child').show();
    $('.tab:first-child').addClass('active');
    
    $(".tab").click(function() {
      var thisId = $(this).attr('id');
      var thatId =$(this).siblings().attr('id')
      $('[class^="tab-"]').hide();
      $('.'+thisId).show();
      $('.tab').removeClass('active');
      $(this).addClass('active');  
    });
    
    //Scroll fixed
    var posy = $("#tabMenu").offset().top;
    $(window).scroll(function(){

      if( $(window).scrollTop() > (posy+210)){
        $("#tabMenu").addClass('active');
      }
      else {
        $("#tabMenu").removeClass('active');
      }
    });

  });
  


  // Index slider
  $(document).ready(function() {

    var mainSlider = document.getElementById('mainSlider');
    var  proSlider = document.getElementById('proSlider');
    var    bullets = document.getElementById('position').getElementsByTagName('li');
    // var   pbullets = document.getElementById('positionpro').getElementsByTagName('li');

    window.slider1 = Swipe(mainSlider, {
      startSlide: 0,
      speed: 400,
      auto: 3000,
      continuous: true,
      disableScroll: true,
      stopPropagation: true,
      //callback: function(index, elem) {},
      callback: function(pos) {
        var i = bullets.length;
        while (i--) {
          bullets[i].className = '';
        }
        bullets[pos].className = 'on';
      },
      transitionEnd: function(index, elem) {
      }
    });
    setInterval(function() {
      window.slider1.next();
    }, 3000);

  });

});