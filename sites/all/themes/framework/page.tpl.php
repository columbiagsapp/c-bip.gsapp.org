<div id="container" class="clearfix">
  <div id="skip-link">
    <a href="#main-content" class="element-invisible element-focusable"><?php print t('Skip to main content'); ?></a>
    <?php if ($main_menu): ?>
      <a href="#navigation" class="element-invisible element-focusable"><?php print t('Skip to navigation'); ?></a>
    <?php endif; ?>
  </div>

  <header id="header" role="banner" class="clearfix">
	
    <div id="c-bip-logo">
      <a href="/"><img src="/sites/all/themes/framework/images/cbiplogo.gif" width="289" height="74" alt="C-BIP: Columbia Building Intelligence Project" /></a>
    </div>

    <div id="oldcastle-logo">
      <a target="_blank" href="http://www.oldcastle.com/index.php"><img src="/sites/all/themes/framework/images/oldcastle.png" width="251" height="21" alt="Oldcastle Building Envelope" /></a>
    </div>

    <div id="carousel">
      content
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
    <?php if ($page['highlighted']): ?><div id="highlighted"><?php print render($page['highlighted']); ?></div><?php endif; ?>
    <?php print render($title_prefix); ?>



  <?php 
  if (array_key_exists("nodes", $page['content']['system_main'])) {
    $nodes = $page['content']['system_main']['nodes'];
    if (array_key_exists(56, $nodes)) {
        #pass
      } else {
          if ($title) {
            print '<h1 class="title" id="page-title">' . $title . '</h1>';
          }
      }  
  }
  ?>
    <?php print render($title_suffix); ?>
    <?php if (!empty($tabs['#primary'])): ?><div class="tabs-wrapper clearfix"><?php print render($tabs); ?></div><?php endif; ?>
    <?php print render($page['help']); ?>
    <?php if ($action_links): ?><ul class="action-links"><?php print render($action_links); ?></ul><?php endif; ?>
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
