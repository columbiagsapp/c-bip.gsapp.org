<?php

// PEOPLE LISTING
$node = node_load($row->nid, null, True);

$full_name = strtoupper($node->field_first_name['und'][0]['value'] . ' ' . $node->title);

if (array_key_exists('und', $node->field_portrait_image)) {
  $image_uri = $node->field_portrait_image['und'][0]['uri'];
  $image_tag = '<img src="' . image_style_url('person-affiliate-148x148', $image_uri) . '" />';
} else {
  // default
  $image_tag = '<img src="/sites/all/themes/framework/images/pdefault.jpg" width="148" height="148" alt="no image" />';
}

$description = $node->field_person_description['und'][0]['value'];

$types_string = array();
$types = $node->field_person_type['und'];
foreach($types as $inner_array) {
  foreach($inner_array as $taxonomy_id) {
    $term = taxonomy_term_load($taxonomy_id);
    $types_list[] = $term->name;
  }
}

// build the output
print '<div class="person-types">' . implode(', ', $types_list) . '</div>';
print '<div class="about-image">' . $image_tag . '</div>';
print '<div class="about-title">' . $full_name . '</div>';
print '<div class="about-description">' . $description . '</div>';



?>