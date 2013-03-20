<?php

// STRATEGIES BY TAG

$node = node_load($row->nid, null, True);

print '<div class="element">';


print '<div class="element-inner">';

$image_uri = $node->field_element_image['und'][0]['uri'];
$style = 'element_200x124';
print '<img src="' . image_style_url($style, $image_uri) . '" />';


print '<div class="views-field-title">' . $node->title . '</div>';
//description
print '<div class="views-field-field-element-description">' . 
      $node->field_element_description['und'][0]['value'] . 
      '</div>';


// get names from array of taxonomy ids
$student_array = $node->field_student_names['und'];
$student_names = array();
foreach($student_array as $inner_array) {
  foreach($inner_array as $taxonomy_id) {
    $term = taxonomy_term_load($taxonomy_id);
    $student_names[] = $term->name;
  }
}
print '<div class="student-names-year">';
  $first = true;
  foreach($student_names as $name) {
    if ($first == true) {
      print "&mdash; $name";
      $first = false;
    } else {
      print ", $name";
    }
  }
  $year = $node->field_year['und'][0]['value'];
  print ", $year";
print '</div>';


print '<div class="views-field-field-element-tags">';
//tags
$tags_a = $node->field_element_tags['und'];
$taxonomy_terms = array();
foreach($tags_a as $inner_array) {
  foreach($inner_array as $taxonomy_id) {
    $term = taxonomy_term_load($taxonomy_id);
    $taxonomy_terms[] = array($term->name); //TODO also add link to term page like http://c-bip.gsapp.org/tags/facade
  }
}

$first = true;

foreach($taxonomy_terms as $name) {

  if ($first == true) {
    print '<a href="#">' . $name[0] . '</a>';
    $first = false;
  } else {
    print ' &middot; ' . '<a href="#">' . $name[0] . '</a>';
  }
}
print '</div>';

print '</div>';


print '</div>'; // close element










?>