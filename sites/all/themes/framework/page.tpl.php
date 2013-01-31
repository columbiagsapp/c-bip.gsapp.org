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

    <?php if ($site_name || $site_slogan): ?>
      <hgroup id="site-name-slogan">
        <?php if ($site_name): ?>
          <h1 id="site-name">
            <a href="<?php print $front_page; ?>" title="<?php print t('Home'); ?>"><span><?php print $site_name; ?></span></a>
          </h1>
        <?php endif; ?>
        <?php if ($site_slogan): ?>
          <h2 id="site-slogan"><?php print $site_slogan; ?></h2>
        <?php endif; ?>
      </hgroup>
    <?php endif; ?>

    <?php print render($page['header']); ?>

    <?php if ($main_menu || $secondary_menu || !empty($page['navigation'])): ?>
      <nav id="navigation" role="navigation" >
        <?php if (!empty($page['navigation'])): ?> <!--if block in navigation region, override $main_menu and $secondary_menu-->
          <?php print render($page['navigation']); ?>
        <?php endif; ?>
        <?php if (empty($page['navigation'])): ?>
		  <?php print theme('links__system_main_menu', array(
            'links' => $main_menu,
            'attributes' => array(
              'id' => 'main-menu',
              'class' => array('links', 'clearfix'),
            ),
            'heading' => array(
              'text' => t('Main menu'),
              'level' => 'h2',
              'class' => array('element-invisible'),
            ),
          )); ?>
		  <?php print theme('links__system_secondary_menu', array(
            'links' => $secondary_menu,
            'attributes' => array(
              'id' => 'secondary-menu',
              'class' => array('links', 'clearfix'),
            ),
            'heading' => array(
              'text' => t('Secondary menu'),
              'level' => 'h2',
              'class' => array('element-invisible'),
            ),
          )); ?>
        <?php endif; ?>

        <div id="hidden-secondary-nav-items">

          <div id="hidden-lib-of-work-subitems">
            <div id="lib-work-elements"><a href="/elements">ELEMENTS</a></div>
            <div id="lib-work-strategies"><a href="/building-strategies">BUILDING STRATEGIES</a></div>
            <div id="lib-work-tag-sort">SORT BY TAG
              <div id="element-and-stategy-tags">
              <?php 
                //get terms
                $vid = taxonomy_vocabulary_machine_name_load("tags")->vid;
                $terms = taxonomy_get_tree($vid);
                $terms_to_display = array();
                $terms_to_display[] = array('All'); // TODO not sure if this should be a page reload? maybe to the tax term page?
                foreach($terms as $term_object) {
                  $terms_to_display[] = array($term_object->name);
                }
                
                $uri = $_SERVER['REQUEST_URI'];
                $strategies = false;

                if (strpos($uri, '/building-strategies') !== FALSE) {
                  $strategies = true;
                }
                $element_tag_ul = '<ul id="terms_for_elements">';

                foreach($terms_to_display as $term_item) {
                  if ($strategies == true) {
                    $element_tag_ul .= '<li><a href="/building-strategies/tag/' . strtolower($term_item[0]) . '">' . $term_item[0] . '</a></li>';
                  } else {
                    $element_tag_ul .= '<li><a href="/elements/tag/' . strtolower($term_item[0]) . '">' . $term_item[0] . '</a></li>';
                  }
                }
                $element_tag_ul .= '</ul>';
                print $element_tag_ul;



                

              ?>
              </div>
            </div>
          </div>


        </div>


      </nav> <!-- /#navigation -->
    <?php endif; ?>
    
  </header> <!-- /#header -->

  <section id="main" role="main" class="clearfix">
    <?php print $messages; ?>
    <a id="main-content"></a>
    <?php if ($page['highlighted']): ?><div id="highlighted"><?php print render($page['highlighted']); ?></div><?php endif; ?>
    <?php print render($title_prefix); ?>
    <?php if ($title): ?><h1 class="title" id="page-title"><?php print $title; ?></h1><?php endif; ?>
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
