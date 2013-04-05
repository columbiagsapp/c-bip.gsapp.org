<div id="container" class="clearfix">
  <div id="skip-link">
    <a href="#main-content" class="element-invisible element-focusable"><?php print t('Skip to main content'); ?></a>
    <?php if ($main_menu): ?>
      <a href="#navigation" class="element-invisible element-focusable"><?php print t('Skip to navigation'); ?></a>
    <?php endif; ?>
  </div>

  <header id="header" role="banner" class="clearfix">
	
    <div id="c-bip-logo">
      <a class="no-ajaxy" href="/"><img src="/sites/all/themes/cbipbootstrap/images/cbiplogo.gif" width="289" height="74" alt="C-BIP: Columbia Building Intelligence Project" /></a>
    </div>

    <div id="oldcastle-logo">
      <a target="_blank" href="http://www.oldcastle.com/index.php"><img src="/sites/all/themes/cbipbootstrap/images/oldcastle.png" width="363" height="31" alt="Oldcastle Building Envelope" /></a>
    </div>

    <div id="jcarousel" class="jcarousel">
      <div id="carousel-list">
        <div id="carousel-image-1" class="carousel-item" style="background-color:#000;" crop="false" time="40000" label="">
          <img class="carousel-image" src="/sites/all/themes/cbipbootstrap/images/intro4.png" alt="C-BIP: Columbia Building Intelligence Project" />
        </div>

        <div id="carousel-image-2" class="carousel-item" style="background-color:#fff;" crop="false" time="5000" label="Building Element">
        </div>

        <div id="carousel-image-3" class="carousel-item" style="background-color:#bfbfbf;" crop="false" time="5000" label="Building Element"> 
        </div>

        <div id="carousel-image-4" class="carousel-item" crop="true" time="5000" label="Building Strategy"> 
        </div>

        <div id="carousel-image-5" class="carousel-item" crop="true" time="5000" label="Collaboration">
        </div>

        <div id="carousel-image-6" class="carousel-item" crop="true" time="5000" label="Building Strategy">
        </div>

        <div id="carousel-image-7" class="carousel-item" style="background-color:#ccc;" crop="false" time="5000" label="Building Element">
        </div>
      </div>
      <div id="carousel-prev"></div>
      <div id="carousel-next"></div>
    </div>

    <div id="carousel-label"></div>

    <div id="gsapp-logo">
      <a target="_blank" href="http://arch.columbia.edu"><img src="/sites/all/themes/cbipbootstrap/images/gsapp-logo.png" width="70" height="14" alt="Columbia University GSAPP" /></a>
    </div>

    <?php if (!empty($page['navigation'])){ ?>
      <nav id="navigation" role="navigation" >
          <?php print render($page['navigation']); ?>
      </nav> <!-- /#navigation -->
    <?php } ?>
    
  </header> <!-- /#header -->

  <section id="main" role="main" class="clearfix">
    <?php print $messages; ?>
    <a id="main-content"></a>
    <?php print render($page['content']); ?>
  </section> <!-- /#main -->
  
  <?php if ($page['sidebar_first']): ?>
    <aside id="sidebar-first" role="complementary" class="sidebar clearfix">
      <?php print render($page['sidebar_first']); ?>
    </aside>  <!-- /#sidebar-first -->
  <?php endif; ?>

  <?php if ($page['sidebar_second']): ?>
    <aside id="sidebar-second" role="complementary" class="sidebar clearfix">
      <?php print render($page['sidebar_second']); ?>
    </aside>  <!-- /#sidebar-second -->
  <?php endif; ?>

  <footer id="footer" role="contentinfo" class="clearfix">
    <?php print render($page['footer']) ?>
  </footer> <!-- /#footer -->

</div> <!-- /#container -->
