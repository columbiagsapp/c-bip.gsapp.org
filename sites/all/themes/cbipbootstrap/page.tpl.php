<div id="container" class="clearfix">
  <div id="skip-link">
    <a href="#main-content" class="element-invisible element-focusable"><?php print t('Skip to main content'); ?></a>
    <?php if ($main_menu): ?>
      <a href="#navigation" class="element-invisible element-focusable"><?php print t('Skip to navigation'); ?></a>
    <?php endif; ?>
  </div>

  <header id="header" role="banner" class="clearfix">
	
    <div id="c-bip-logo">
      <a class="no-ajaxy" href="/"><img src="/sites/all/themes/framework/images/cbiplogo.gif" width="289" height="74" alt="C-BIP: Columbia Building Intelligence Project" /></a>
    </div>

    <div id="oldcastle-logo">
      <a target="_blank" href="http://www.oldcastle.com/index.php"><img src="/sites/all/themes/framework/images/oldcastle.png" width="251" height="21" alt="Oldcastle Building Envelope" /></a>
    </div>

    <div id="carousel">
      <div id="carousel-image-container">
        <img id="carousel-image-1" class="carousel-image" src="/sites/all/themes/framework/images/intro1.gif?<?php print rand(10000,99999); ?>" alt="C-BIP: Columbia Building Intelligence Project" />
        <img id="carousel-image-2" class="carousel-image" src="/sites/all/themes/framework/images/intro2.gif" alt="C-BIP: Columbia Building Intelligence Project" />
        <img id="carousel-image-3" class="carousel-image" src="/sites/all/themes/framework/images/intro3.gif" alt="C-BIP: Columbia Building Intelligence Project" />
        <img id="carousel-image-4" class="carousel-image" src="/sites/all/themes/framework/images/intro4.gif" alt="C-BIP: Columbia Building Intelligence Project" />
      </div>
      <div id="carousel-prev"></div>
      <div id="carousel-next"></div>
    </div>

    <div id="gsapp-logo">
      <a target="_blank" href="http://arch.columbia.edu"><img src="/sites/all/themes/framework/images/gsapp-logo.png" width="70" height="14" alt="Columbia University GSAPP" /></a>
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
