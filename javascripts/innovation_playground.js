$(function() {
  
  $.fn.imagesLoaded     = function( callback ) {
  var $images = this.find('img'),
    len       = $images.length,
    _this     = this,
    blank     = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';

  function triggerCallback() {
    callback.call( _this, $images );
  }

  function imgLoaded() {
    if ( --len <= 0 && this.src !== blank ){
      setTimeout( triggerCallback );
      $images.off( 'load error', imgLoaded );
    }
  }

  if ( !len ) {
    triggerCallback();
  }

  $images.on( 'load error',  imgLoaded ).each( function() {
    // cached images don't fire load sometimes, so we reset src.
    if (this.complete || this.complete === undefined){
      var src = this.src;
      // webkit hack
      // data uri bypasses webkit log warning
      this.src = blank;
      this.src = src;
    }
  });

  return this;
  };

  // item  container
  var $itemContainer = $('#rg-items'),
  // carousel container
  $esCarousel        = $itemContainer.find('div.es-carousel-wrapper'),
  // the carousel items
  $items             = $esCarousel.find('ul > li'),
  // total number of items
  itemsCount         = $items.length;
  
  AllItems       = (function() {
      // index of the current item
    var current     = 0,
      // mode : carousel || fullview
      mode      = 'carousel',
      // control if one image is being loaded
      anim      = false,
      init      = function() {
        
        // (not necessary) preloading the images here...
        $items.add('<img src="images/ajax-loader.gif"/><img src="images/black.png"/>').imagesLoaded( function() {
          
          // add large image wrapper
          _addItemWrapper();
          
          // show first image
          _showItem( $items.eq( current ) );
            
        });
        
        // initialize the carousel
        if( mode === 'carousel' )
          _initCarousel();
        
      },
      _initCarousel = function() {
        
        // we are using the elastislide plugin:
        // http://tympanus.net/codrops/2011/09/12/elastislide-responsive-carousel/
        $esCarousel.show().elastislide({
          imageW  : 276,
          onClick : function( $item ) {
            if( anim ) return false;
            anim  = true;
            // on click show image
            _showItem($item);
            // change current
            current = $item.index();
          }
        });
        
        // set elastislide's current to current
        $esCarousel.elastislide( 'setCurrent', current );
        
      },

      _addItemWrapper= function() {
        
        // adds the structure for the large image and the navigation buttons (if total items > 1)
        // also initializes the navigation events
        
        $('#img-wrapper-tmpl').tmpl( {itemsCount : itemsCount} ).appendTo( $itemContainer );
        
        if( itemsCount > 1 ) {
          // addNavigation
          var
            $navPrev      = $itemContainer.find('a.rg-image-nav-prev'),
            $navNext      = $itemContainer.find('a.rg-image-nav-next'),
            //$imgWrapper   = $itemContainer.find('div.rg-image'),
            $rgContainer  = $itemContainer.find('div.rg-container');
            
          $navPrev.on('click.itemContainer', function( event ) {
            _navigate( 'left' );
            return false;
          });
          
          $navNext.on('click.itemContainer', function( event ) {
            _navigate( 'right' );
            return false;
          });
        
          // add touchwipe events on the large image wrapper
          $rgContainer.touchwipe({
            wipeLeft      : function() {
              _navigate( 'right' );
            },
            wipeRight     : function() {
              _navigate( 'left' );
            },
            preventDefaultEvents: false
          });
        
          $(document).on('keyup.itemContainer', function( event ) {
            if (event.keyCode == 39)
              _navigate( 'right' );
            else if (event.keyCode == 37)
              _navigate( 'left' );
          });
          
        }
        
      },
      _navigate   = function( dir ) {
        
        // navigate through the large images
        
        if( anim ) return false;
        anim  = true;
        
        if( dir === 'right' ) {
          if( current + 1 >= itemsCount )
            current = 0;
          else
            ++current;
        }
        else if( dir === 'left' ) {
          if( current - 1 < 0 )
            current = itemsCount - 1;
          else
            --current;
        }
        
        _showItem( $items.eq( current ) );
        
      },
      _showItem    = function( $item ) {
        
        // shows the large image that is associated to the $item
        
        var $loader = $itemContainer.find('div.rg-loading').show();
        
        // $items.removeClass('selected');
        // $item.addClass('selected');
        
        // IMG
        var $thumb      = $item.find('img'),
            largesrc    = $thumb.data('large');
        // TEXT
        var $story_text = $item.find('div.story_text');
        var $thumbparent= $thumb.parent('a');

        //$thumbparent.css('background-color','yellow');

        $('<img>').load( function() {
          $itemContainer.find('div.rg-image').children('div.story_img').html('<img src="' + largesrc + '"/>');
          $itemContainer.find('div.rg-text').html($story_text);
          //幹幹幹
          $thumbparent.append($story_text.clone());
          //幹妳媽的死bug終於解出來了
          $loader.hide();
          if( mode === 'carousel' ) {
            $esCarousel.elastislide( 'reload' );
            $esCarousel.elastislide( 'setCurrent', current );
          }
          anim  = false;
        }).attr( 'src', largesrc );
        // $story_text.appendTo($thumb);

      },
      addAllItems    = function( $new ) {
      
        // $esCarousel.find('ul').append($new);
        // $items      = $items.add( $($new) );
        // itemsCount  = $items.length;
        // $esCarousel.elastislide( 'add', $new );
      
      };
    
    return {
      init    : init,
      addAllItems  : addAllItems
    };
  
  })();

  AllItems.init();
  
  /*
  more items to the items:
  */
  // var $new  = $('<li><a href="#"><img src="images/thumbs/1.jpg" data-large="images/1.jpg" alt="image01" data-description="From off a hill whose concave womb reworded" /></a></li>');
  // AllItems.addAllItems( $new );
  
});
