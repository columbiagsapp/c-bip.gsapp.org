requirejs.config({
  baseUrl: '/sites/all/themes/cbipbootstrap/js'
});

require([
  'config',
  'init',
  'jquery.history',
  'jquery.scrollto.min'
],

function(config, init, History) {

  init();

  // Ajaxify
  // v1.0.1 - 30 September, 2012
  // https://github.com/browserstate/ajaxify
  (function(window,undefined){
    
    // Prepare our Variables
    var
      History = window.History,
      $ = window.jQuery,
      document = window.document;

    // Check to see if History.js is enabled for our Browser
    if ( !History.enabled ) {
      return false;
    }

    // Wait for Document
    $(function(){
      // Prepare Variables
      var
        /* Application Specific Variables */
        contentSelector = '#main',
        $content = $(contentSelector).filter(':first'),
        contentNode = $content.get(0),
        $menu = $('#navigation .menu').filter(':first'),
        activeClass = 'active',
        activeSelector = '.active',
        menuChildrenSelector = '> li a',
        completedEventName = 'statechangecomplete',
        /* Application Generic Variables */
        $window = $(window),
        $body = $(document.body),
        rootUrl = History.getRootUrl(),
        scrollOptions = {
          duration: 800,
          easing:'swing'
        };


      
      // Ensure Content
      if ( $content.length === 0 ) {
        $content = $body;
      }
      
      // Internal Helper
      $.expr[':'].internal = function(obj, index, meta, stack){
        // Prepare
        var
          $this = $(obj),
          url = $this.attr('href')||'',
          isInternalLink;
        
        // Check link
        isInternalLink = url.substring(0,rootUrl.length) === rootUrl || url.indexOf(':') === -1;
        
        // Ignore or Keep
        return isInternalLink;
      };
      
      // HTML Helper
      var documentHtml = function(html){
        // Prepare
        var result = String(html)
          .replace(/<\!DOCTYPE[^>]*>/i, '')
          .replace(/<(html|head|body|title|meta|script)([\s\>])/gi,'<div class="document-$1"$2')
          .replace(/<\/(html|head|body|title|meta|script)\>/gi,'</div>')
        ;
        
        // Return
        return result;
      };
      
      // Ajaxify Helper
      $.fn.ajaxify = function(){
        // Prepare
        var $this = $(this);
        
        // Ajaxify
        $this.find('a:internal:not(.no-ajaxy)').click(function(event){

          // Update the active menu item only if main menu is clicked
          if($(this).closest('#block-system-main-menu').length > 0){
            var $menuChildren = $menu.find(menuChildrenSelector);
            $menuChildren.filter(activeSelector).removeClass(activeClass);
            $(this).addClass('active');

            var href = $(this).attr('href');
            if(href == '/about'){
              $('#block-block-2 a').removeClass(active);
              $('#secondary-nav-people a').addClass(active);
            }
            $('a[href="'+href+'"]').addClass('active');

          }else if($(this).closest('#block-block-1').length > 0 || $(this).closest('#block-block-2').length > 0){
            //secondary menu
            $('#block-block-1 .active, #block-block-2 .active').removeClass('active');
            $(this).addClass('active');
            console.log('********');
          }

          

          if($('body').hasClass('front')){
            $('#carousel').slideToggle(config.PAGE_TRANSITION_TIME, function(){
              $('#oldcastle-logo').hide().remove();
              $('#gsapp-logo').hide().remove();
              $(this).remove();
            });
          }

          // Prepare
          var
            $this = $(this),
            url = $this.attr('href'),
            title = $this.attr('title')||null;
          
          // Continue as normal for cmd clicks etc
          if ( event.which == 2 || event.metaKey ) { return true; }
          
          // Ajaxify this link
          History.pushState(null,title,url);
          event.preventDefault();
          return false;
        });
        
        // Chain
        return $this;
      };
      
      // Ajaxify our Internal Links
      $body.ajaxify();
      
      // Hook into State Changes
      $window.bind('statechange',function(){
        // Prepare Variables
        var
          State = History.getState(),
          url = State.url,
          relativeUrl = url.replace(rootUrl,'');

        // Set Loading
        $body.addClass('loading');

        // Start Fade Out
        // Animating to opacity to 0 still keeps the element's height intact
        // Which prevents that annoying pop bang issue when loading in new content
        $content.animate({opacity:0},config.PAGE_TRANSITION_TIME);
        
        // Ajax Request the Traditional Page
        $.ajax({
          url: url,
          success: function(data, textStatus, jqXHR){
            // Prepare
            var
              $data = $(documentHtml(data)),
              $dataBody = $data.find('.document-body:first'),
              $dataContent = $dataBody.find(contentSelector).filter(':first'),
              $menuChildren, contentHtml, $scripts;
            
            // Fetch the scripts
            $scripts = $dataContent.find('.document-script');
            if ( $scripts.length ) {
              $scripts.detach();
            }

            // Fetch the content
            contentHtml = $dataContent.html()||$data.html();
            if ( !contentHtml ) {
              document.location.href = url;
              return false;
            }


            // Update the content
            $content.stop(true,true);
            $content.html(contentHtml).ajaxify().css('opacity',100).show(); /* you could fade in here if you'd like */

            // Update the title
            document.title = $data.find('.document-title:first').text();
            try {
              document.getElementsByTagName('title')[0].innerHTML = document.title.replace('<','&lt;').replace('>','&gt;').replace(' & ',' &amp; ');
            }
            catch ( Exception ) { }
            
            // Add the scripts
            $scripts.each(function(){
              var $script = $(this), scriptText = $script.text(), scriptNode = document.createElement('script');
              scriptNode.appendChild(document.createTextNode(scriptText));
              contentNode.appendChild(scriptNode);
            });

            // Complete the change
            if ( $body.ScrollTo||false ) { $body.ScrollTo(scrollOptions); } /* http://balupton.com/projects/jquery-scrollto */
            $body.removeClass('loading');
            $window.trigger(completedEventName);
    
            // Inform Google Analytics of the change
            if ( typeof window._gaq !== 'undefined' ) {
              window._gaq.push(['_trackPageview', relativeUrl]);
            }

            // Inform ReInvigorate of a state change
            if ( typeof window.reinvigorate !== 'undefined' && typeof window.reinvigorate.ajax_track !== 'undefined' ) {
              reinvigorate.ajax_track(url);
              // ^ we use the full url here as that is what reinvigorate supports
            }

            $('body').removeClass('front');
            init();
          },
          error: function(jqXHR, textStatus, errorThrown){
            document.location.href = url;
            return false;
          }
        }); // end ajax

      }); // end onStateChange

    }); // end onDomLoad

  })(window); // end closure

});