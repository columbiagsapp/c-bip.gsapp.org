<?php

// PEOPLE LISTING
$node = node_load($row->nid, null, True);

$full_name = strtoupper($node->title);

if (array_key_exists('und', $node->field_portrait_image)) {
  $image_uri = $node->field_portrait_image['und'][0]['uri'];
  $image_tag = '<img src="' . image_style_url('person-affiliate-148x148', $image_uri) . '" />';
} else {
  // default
  $image_tag = '<img src="/sites/all/themes/framework/images/pdefault.jpg" width="148" height="148" alt="no image" />';
}

$link = $node->field_affiliate_site_link['und'][0]['url'];
$link_s = $link;
if (strpos($link, 'http:') !== FALSE) {
  $link_s = substr($link, 7);
}

// build the output
print '<div class="about-image">' . $image_tag . '</div>';
print '<div class="about-title">' . $full_name . '</div>';
print '<div class="about-affiliate-url"><a href="' . $link . '" target="_blank">' . $link_s . '</a></div>';







?>