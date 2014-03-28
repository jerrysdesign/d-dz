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

//Page Innovation Stories tab
$(document).ready(function(){

  $('[class^="story-"]').hide();
  $('[class^="story-"]:first-child').show();
  $('.story:first-child').addClass('active');
  //var tabMenuH = $("#tabMenu").innerHeight();
  //var WsH = $(window).scrollTop() + $(window).innerHeight()-tabMenuH;
  var tabMenuY = $("#tabMenu").position().top;

  // .innerHeight()

  $(".story").click(function() {
    var thisId = $(this).attr('id');
    var thatId =$(this).siblings().attr('id');
    $('[class^="story-"]').hide();
    $('.'+thisId).show();
    $('.story').removeClass('active');
    $(this).addClass('active');
    //$(window).scrollTo(tabMenuY-tabMenuH);
  });
  
  //Scroll fixed
  var nav_pos = $('#tabMenu').position().top;
  $(window).scroll(function() {
    // Detect if content is being scroll offscreen.
    if ( (document.documentElement.scrollTop || document.body.scrollTop) >= nav_pos-5) {
      $('body').addClass('smartposition');
    } else {
      $('body').removeClass('smartposition');
    }
  });
  $(window).scroll(); // Trigger onload

  // $(window).scroll(function(){

  //   if( $(window).scrollTop() > (tabMenuY)){
  //     $("#tabMenu").addClass('active');
  //   }
  //   else {
  //     $("#tabMenu").removeClass('active');
  //   }
  // });

  // scroll tragger class
  
  $(document).ready(function(){

    var htmlHeight = jQuery(document).height();

    var p11cot = $("#p1-1").position().top;
    var p12cot = $("#p1-2").position().top;
    var p13cot = $("#p1-3").position().top;

    var p21aot = $("#p2-1").position().top;
    var p22aot = $("#p2-2").position().top;
    var p23aot = $("#p2-3").position().top;
    
    $(window).scroll(function(){

      if ($(".story-1").css("display") == 'block' ){

        if ($(window).scrollTop() > (p11cot-200)){
          $("#p1-1").addClass("move");
        }
        else {
          $("#p1-1").removeClass("move");
        }

        if ($(window).scrollTop() > (p12cot-200)){
          $("#p1-2").addClass("move");
        }
        else {
          $("#p1-2").removeClass("move");
        }

        if ($(window).scrollTop() > (p13cot-200)){
          $("#p1-3").addClass("move");
        }
        else {
          $("#p1-3").removeClass("move");
        }
      }

      if ($(".story-2").css("display") == 'block' ){
        
        if ($(window).scrollTop() > (p21aot-200)){
          $("#p2-1").addClass("move");
        }
        else {
          $("#p2-1").removeClass("move");
        }

        if ($(window).scrollTop() > (p22aot-200)){
          $("#p2-2").addClass("move");
        }
        else {
          $("#p2-2").removeClass("move");
        }

        if ($(window).scrollTop() > (p23aot-200)){
          $("#p2-3").addClass("move");
        }
        else {
          $("#p2-3").removeClass("move");
        }
      }

    });

  });


});

// Index slider
var mainSlider = document.getElementById('mainSlider');
var    bullets = document.getElementById('position').getElementsByTagName('li');

window.slider1 = Swipe(mainSlider, {
  startSlide: 0,
  speed: 600,
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

