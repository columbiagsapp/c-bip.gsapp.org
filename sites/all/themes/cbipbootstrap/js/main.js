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

        console.log(relativeUrl);

        // Start Fade Out
        // Animating to opacity to 0 still keeps the element's height intact
        // Which prevents that annoying pop bang issue when loading in new content
        $content.animate({opacity:0},config.PAGE_TRANSITION_TIME);

        //check if work in progress tumblr feed or regular page transition
        if(relativeUrl == 'work/progress'){
        

          myJsonpCallback = function(data)
          {
            console.dir(data);
              var posts = data.response.posts;

              var fullHTML = [];
              fullHTML.push('<div id="posts">');

              for(var i = 0; i < posts.length; i++){
                var d = new Date(posts[i].date);
                var month = d.getMonth() + 1;
                month = ''+ month;
                if(month.length == 1){
                  month = '0' + month;
                }
                var day = '' + d.getDate();
                if(day.length == 1){
                  day = '0' + day;
                }
                var year = '' + d.getFullYear();




                var html = [];
                html.push('<div class="post-wrapper">');
                  //render the date
                  html.push('<h3 class="date">');
                    html.push('<a href="' + posts[i].post_url + '" target="_self">');
                      html.push(month+'/'+day+'/'+year);
                    html.push('</a>');
                  html.push('</h3>');


                switch(posts[i].type){
                  case 'photo':
                    console.log('photo');
                    html.push('<div class="post photo">');

                      for(var j = 0; j < posts[i].photos.length; j++){
                        html.push('<img src="'+ posts[i].photos[j].alt_sizes[1].url + '" width="'+posts[i].photos[j].alt_sizes[1].width+'" height="' + posts[i].photos[j].alt_sizes[1].height+'">');
                      }

                      if(posts[i].caption != ''){
                        html.push('<div class="caption">'+posts[i].caption+'</div>')
                      }

                    html.push('</div>');
                    break;
                  case 'text':
                    console.log('text');
                    html.push('<div class="post text">');
                      if(posts[i].title != null && posts[i].title != ''){
                        html.push('<h3>'+ posts[i].title +'</h3>');
                      }
                      html.push(posts[i].body);
                    html.push('</div>');
                    break;
                  case 'video':
                    console.log('video');
                    html.push('<div class="post video">');

                      html.push(posts[i].player[2].embed_code);

                      if(posts[i].caption != ''){
                        html.push('<div class="caption">'+posts[i].caption+'</div>')
                      }

                    html.push('</div>');
                    break;
                }

                if(posts[i].tags.length > 0){
                  html.push('<div class="tags">');
                  for(var t = 0; t < posts[i].tags.length; t++){
                    if(t != (posts[i].tags.length-1)){
                      html.push('<span class="tag">'+ posts[i].tags[t] + ' &middot; </span>');
                    }else{
                      html.push('<span class="tag">'+ posts[i].tags[t] + '</span>');
                    }
                  }
                  html.push('</div>');
                }

                html.push('</div>');

                var htmlString = html.join('');
                fullHTML.push(htmlString);
                
              }//end main for

              var html = [];
              html.push('<div class="post-wrapper continue-reading">');
                html.push('<h3><a href="http://cbip2013.tumblr.com/">CONTINUE READING THE BLOG</a></h3>');
              html.push('</div>');

              fullHTML.push( html.join('') );

              fullHTML.push('</div>');// /#posts
              var fullHTMLstring = fullHTML.join('');
              console.log(fullHTMLstring);
              $('#main').html( fullHTMLstring ).css('opacity', '1');

              $('body').removeClass('front');
              init();
          }

          $.ajax({
              type: "GET",
              url : "http://api.tumblr.com/v2/blog/cbip2013.tumblr.com/posts",
              dataType: "jsonp",
              data: {
                  api_key : "hWkC4wLaBW4c9ifzdFahAN7rLNMsEUH0l1uuAca6SVhhxufgwA",
                  jsonp : "myJsonpCallback"
              }
          });
        }else{
        
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
        }//end else not tumblr

      }); // end onStateChange

    }); // end onDomLoad

  })(window); // end closure

});