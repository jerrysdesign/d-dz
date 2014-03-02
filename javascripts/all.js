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

//Page Innovation Stories tab
$(document).ready(function(){

  $('[class^="story-"]').hide();
  $('[class^="story-"]:first-child').show();
  $('.story:first-child').addClass('active');
  
  $(".story").click(function() {
    var thisId = $(this).attr('id');
    var thatId =$(this).siblings().attr('id')
    $('[class^="story-"]').hide();
    $('.'+thisId).show();
    $('.story').removeClass('active');
    $(this).addClass('active');  
  });
  
  //Scroll fixed
  var storyMenuY = $("#tabMenu").offset().top;
  $(window).scroll(function(){

    if( $(window).scrollTop() > (storyMenuY)){
      $("#tabMenu").addClass('active');
    }
    else {
      $("#tabMenu").removeClass('active');
    }
  });

});

// Index slider

var mainSlider = document.getElementById('mainSlider');
var    bullets = document.getElementById('position').getElementsByTagName('li');

window.slider1 = Swipe(mainSlider, {
  startSlide: 0,
  speed: 400,
  auto: 3000,
  continuous: true,
  disableScroll: true,
  stopPropagation: true,
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

