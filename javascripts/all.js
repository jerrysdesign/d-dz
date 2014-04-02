//主選單
$(document).ready(function(){

  $('.main_navigation > li').bind('mouseover', openSubMenu);
  $('.main_navigation > li').bind('mouseleave', closeSubMenu);

  function openSubMenu() {
    $(this).addClass('active');
    $(this).find('> ul').stop(true, true).slideDown(200);
  }

  function closeSubMenu() {
    $(this).removeClass('active');
    $(this).find('> ul').stop(true, true).delay(100).slideUp(250);
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

//側欄選單
$(document).ready(function(){
  
  $('.collapse > li').click(function(){
    var $this = $(this);
    $('.collapse > li').removeClass('').find('ul').hide(); //先把全部的收起來
    $this.addClass('active').find("ul").slideDown(300); //目前被按到的這個打開來
  });

});

// Index slider
var mainSlider = document.getElementById('mainSlider');
var    bullets = document.getElementById('position').getElementsByTagName('li');

window.slider1 = Swipe(mainSlider, {
  startSlide: 0,
  speed: 800,
  auto: 5500,
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
}, 5500);

