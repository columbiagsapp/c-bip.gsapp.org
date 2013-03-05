<?php 

  //$pdfUrl = field_get_items('node', $node, 'field_strategy_file', $langcode = NULL);
  $resourceUrl = $node->field_resource_url['und'][0]['url'];//file_create_url($node->field_resource_url['und'][0] );

?>

<?php

  print '<div class="resource" href="' . $resourceUrl .'">';

    print '<div class="resource-inner">';

      print '<div class="views-field-title">' . $node->title . '</div>';
      //description
      print '<div class="resource-description">' . 
            $node->field_resource_description['und'][0]['value'] . 
            '</div>';


      /*
      print '<div class="resource-tags">' . 
            $node->field_resource_type['und'][0]['value'] . 
            '</div>';'
      */


    print '</div>';//close resource-inner


  print '</div>'; //close resource


?>