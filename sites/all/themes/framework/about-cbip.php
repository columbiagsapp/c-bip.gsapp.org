<?php
?>


<div id="about-page">
  <div id="about-left-sidebar">
    <div class="about-sidebar about-heading">
      The Columbia Building Intelligence Project<br>(C BIP) is a research program designed to explore new forms of technology-enabled collaborative design workflows within architectural education.
    </div>
    <div class="about-sidebar about-long-description">
      The project grew out of an interest in using emerging technologies and the increasing trends toward more integrated forms of practice to address the chronic adversarial structure that has inhibited the progress of the AEC industry for many years. In response to this, C BIP works with the premise that we cannot change the future of industry without transforming the education of future leaders, which begins with a renewed engagement between academia and industry.
    </div>
    <div class="about-sidebar about-heading">Integrated Design Studio</div>
    <div class="about-sidebar about-long-description">
      C BIP is comprised of integrated design studios supported by local and international think tanks along with and research seminars at the Graduate School of Architecture, Planning and Preservation at Columbia University. The C BIP Studio is the heart of The Columbia Building Intelligence Project. Based on the objective of developing a new studio model that responds to the increasing complexity of contemporary design problems, the studio breaks with the traditional model within architectural education in which 12 students are guided by a single studio instructor for a single semester. Instead three studio instructors, together with a team of outside industry experts, work with 30 students in a highly collaborative manner that encourages the sharing of information, the open exchange of ideas and a deep understanding of the need for collective teamwork. The students produce design work that is shared and combined through structured parametric modeling allowing the individual work of each student to contribute to collective solutions. The C BIP Studio’s approach of distributed and coordinated design is partly modeled on new forms of digital coordination and concurrent design practices pioneered by large companies like Boeing but also on less hierarchical working protocols like open source product development. The Studio takes place in the fourth semester of the Master of Architecture Program, when students are moving from their core studios to their advanced studios, bringing enough background to make informed contributions and having enough time to integrate their new findings into future work at the GSAPP with the goal of establishing a new studio model for the future of architectural education.
    </div>
    <div class="about-sidebar about-heading">Think Tanks</div>
    <div class="about-sidebar about-long-description">
      The Think Tanks bring together leading industry experts including architects, engineers, builders, owners, fabricators, research scientists, software developers and educators in an open dialogue about current projects, working processes and research that form the cutting edge of industry practices. Acknowledging that one can not talk about the future of the AEC industry without acknowledging the deep impact that global exchange is having on everything from team structures to material supply chains, the Think Tanks take place in major regional centers around the world to better understand how the discussion shifts in different cultural and economic contexts. In addition to New York, the Think Tanks have convened in London, Tokyo, Stuttgart and Toronto. The proceedings of the Think Tanks uncover key questions and issues that established a broad foundation to position and evolve the C BIP Studio.
    </div>
  </div>
  <div id="about-right-view">
    <?php
      print '<div id="about-people-view"><div class="about-view-heading">PEOPLE</div>' .
            views_embed_view('about', "page") . '</div>';
     
      print '<div id="about-affiliates-view"><div class="about-view-heading">AFFILIATES</div>' .    views_embed_view('affiliates_view', "page_1") . '</div>';
     
      print '<div id="about-alumni-view"><div class="about-view-heading">ALUMNUS</div>' . views_embed_view('alumni_view', "page_1") . '</div>';


      //$people_view = views_get_view('People');
      //$affiliates_view = views_get_view('Affiliates_view');
      //$alumni_view = views_get_view('Alumni_view');

      //print views_build_view('embed', $people_view);
    ?>
  </div>
</div>


