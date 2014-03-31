$(function() {
  
  $.fn.imagesLoaded     = function( callback ) {
  var $images = this.find('img'),
    len   = $images.length,
    _this   = this,
    blank   = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';

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
          _addImageWrapper();
          
          // show first image
          _showImage( $items.eq( current ) );
            
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
            _showImage($item);
            // change current
            current = $item.index();
          }
        });
        
        // set elastislide's current to current
        $esCarousel.elastislide( 'setCurrent', current );
        
      },

      _addImageWrapper= function() {
        
        // adds the structure for the large image and the navigation buttons (if total items > 1)
        // also initializes the navigation events
        
        $('#img-wrapper-tmpl').tmpl( {itemsCount : itemsCount} ).appendTo( $itemContainer );
        
        if( itemsCount > 1 ) {
          // addNavigation
          var
            $navPrev      = $itemContainer.find('a.rg-image-nav-prev'),
            $navNext      = $itemContainer.find('a.rg-image-nav-next'),
            $imgWrapper   = $itemContainer.find('div.rg-image');
            
          $navPrev.on('click.itemContainer', function( event ) {
            _navigate( 'left' );
            return false;
          }); 
          
          $navNext.on('click.itemContainer', function( event ) {
            _navigate( 'right' );
            return false;
          });
        
          // add touchwipe events on the large image wrapper
          $imgWrapper.touchwipe({
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
        
        _showImage( $items.eq( current ) );
        
      },
      _showImage    = function( $item ) {
        
        // shows the large image that is associated to the $item
        
        var $loader = $itemContainer.find('div.rg-loading').show();
        
        $items.removeClass('selected');
        $item.addClass('selected');
           
        var $thumb      = $item.find('img'),
            largesrc    = $thumb.data('large');
        var $story_text = $item.find('div.story_text_0');

        $('<img/>').load( function() {
          
          $itemContainer.find('div.rg-image').empty().append('<img src="' + largesrc + '"/>');
          //$itemContainer.find('div.story_text').show().append($story_text);
          
          $itemContainer.find('div.rg-text').show().children('div.story_text').empty().append($story_text);

          $loader.hide();
          
          if( mode === 'carousel' ) {
            $esCarousel.elastislide( 'reload' );
            $esCarousel.elastislide( 'setCurrent', current );
          }
          
          anim  = false;
          
        }).attr( 'src', largesrc );
        
      },
      addAllItems    = function( $new ) {
      
        $esCarousel.find('ul').append($new);
        $items    = $items.add( $($new) );
        itemsCount  = $items.length; 
        $esCarousel.elastislide( 'add', $new );
      
      };
    
    return { 
      init    : init,
      addAllItems  : addAllItems
    };
  
  })();

  AllItems.init();
  
  /*
  Example to add more items to the items:
  
  var $new  = $('<li><a href="#"><img src="images/thumbs/1.jpg" data-large="images/1.jpg" alt="image01" data-description="From off a hill whose concave womb reworded" /></a></li>');
  AllItems.addAllItems( $new );
  */
});



