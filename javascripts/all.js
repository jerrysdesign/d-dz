//主選單
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

// var OBC = function(a, b){
//   "use strict";
//   return a.defuscate = {
//     defaults: {
//       find: /\b([A-Z0-9._%\-]+)\([^)]+\)((?:[A-Z0-9\-]+\.)+[A-Z]{2,6})\b/gi,
//       replace: "$1@$2"
//     },
//     init: function(a){
//       var c, d, e, f, g;
//       for (c = 0; c < a.length; c++) d = b(a[c]), g = !1, d.is("a[href]") && (g = !0, e = this.defuscateHref(d.attr("href")), this.updateHref(d, e)), f = this.defuscateHtml(d.html(), g), this.updateHtml(d, f);
//       return a
//     },
//     defuscateHref: function(a){
//       return a.replace(this.defaults.find, this.defaults.replace)
//     },
//     defuscateHtml: function(a, b){
//       var c, d = this.defaults.find,
//         e = this.defaults.replace;
//       return c = b ? a.replace(d, e) : a.replace(d, '<a href="mailto:' + e + '">' + e + "</a>")
//     },
//     updateHref: function(a, b){
//       return a.attr("href", b), a
//     },
//     updateHtml: function(a, b){
//       return a.html(b), a
//     }
//   }, b(function(){
//     a.defuscate.init(b(".email"))
//   }), a
// }(OBC || {}, jQuery);
// ! function(){
//   "use strict";
//   if (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i)){
//     var a = document.querySelectorAll('meta[name="viewport"]')[0];
//     a && (a.content = "width=device-width, minimum-scale=1.0, maximum-scale=1.0", document.body.addEventListener("gesturestart", function(){
//       a.content = "width=device-width, minimum-scale=0.25, maximum-scale=1.6"
//     }, !1))
//   }
// }();