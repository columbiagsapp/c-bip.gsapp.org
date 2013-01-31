<?php
?>


<div id="about-page">
  <div id="about-left-sidebar">
    <div class="about-sidebar about-heading">The Columbia Building Intelligence Project (C-BIP) is harchicta cus audae ped quisquiae comnihit ad qui re liqui nihit hil earum ea et eosam ut elit, as verferum la doluptatur? Qui niandi ut rem facientium ipsa plabo.</div>
    <div class="about-sidebar about-long-description">The Columbia Building Intelligence Project (C-BIP) is a project designed to explore new forms of technology-enabled collaboration within and between the various sectors of the architecture, engineering, and construction industry. The project grows out of an interest in using emerging technologies and the increasing trends toward more integrated forms of practice to address the chronic adversarial atmosphere that has inhibited the progress of our industry for many years. In addition, C-BIP works with the premise that we cannot change the future of our industry without transforming the education of our future leaders, which begins with a renewed engagement between academia and industry.
    </div>
    <div class="about-sidebar about-heading">Think Tanks</div>
    <div class="about-sidebar about-long-description">C-BIP is comprised of local and international Think Tanks along with Integrated Design Studios (IDS) and research seminars at the Graduate School of , Planning and Preservation at Columbia University. The Think Tanks occur in the fall, spring and summer and bring together leading industry experts including architects, engineers, builders, owners, fabricators, research scientists, software developers and educators in an open dialogue about current projects, working processes and research that form the cutting edge of industry practices. Each year, one of the Think Tanks is in New York and is more directly related to the work of the IDS allowing an exchange of ideas between students, faculty and the Think Tank participants. Acknowledging that one cannot talk about the dynamics of the AEC industry without acknowledging the deep impact that global exchange is having on everything from working methods to material supply chains, the other two Think Tanks take place in major regional centers around the world to better understand how the discussion shifts in different cultural and economic contexts. The Think Tanks uncover key questions and issues that establish a broad foundation to position and evolve the IDS and other support classes each year.</div>
    <div class="about-sidebar about-heading">Collaboration</div>
    <div class="about-sidebar about-long-description">The Integrated Design Studio is the heart of the Columbia Building Intelligence Project. Based on the objective of developing a new studio model that responds to the increasing complexity of contemporary design problems, the studio breaks with the traditional model of architectural education in which 12 students are guided by a single studio teacher for a single semester. Instead, through the new organizational structure developed for The Columbia Building Intelligence Project, three studios work together in a highly collaborative manner that encourages the sharing of information, the open exchange of ideas and a deep understanding of the need for collective teamwork. The students produce design work that is shared and combined through structured parametric modeling that allows the individual work of each student to contribute to a collective solution. The Integrated Design Studio’s approach of distributed and coordinated design is partly modeled on new forms of digital coordination and concurrent design practices pioneered by large companies like Boeing but also on less hierarchical working protocols like open source product development.The IDS takes place in the fourth semester of the Master of Architecture Program, when students are moving from their core studios to their advanced studios, bringing enough background to make informed contributions and having enough time to integrate their new findings into future work at the GSAPP with the goal of establishing a new studio model for the future of architectural education.</div>
    <div class="about-sidebar about-heading">Elements</div>    
    <div class="about-sidebar about-long-description">Nihiliquam quo temped quas es volum asima venda vel ipsaestent estiunto minus, sus nis expellut poris sit perupta tiorum eium eatur? Qui re velis voluptiis non con natem. Incipic itatibus imenimu scient qui veliquidunt voloremAgnim re nusdae nimil expliqu issequam aceptate si sum fugiam, si dolorem elit labo. Bustia dolorro rporio occaborum volorro vitempossus.</div>
    <div class="about-sidebar about-heading">Building Strategies</div>    
    <div class="about-sidebar about-long-description">Nihiliquam quo temped quas es volum asima venda vel ipsaestent estiunto minus, sus nis expellut poris sit perupta tiorum eium eatur? Qui re velis voluptiis non con natem. Incipic itatibus imenimu scient qui veliquidunt voloremAgnim re nusdae nimil expliqu issequam aceptate si sum fugiam, si dolorem elit labo. Bustia dolorro rporio occaborum volorro vitempossus.</div>
  </div>
  <div id="about-right-view">
    <?php
      print '<div id="about-people-view"><div class="about-view-heading">PEOPLE</div>' .
            views_embed_view('about', "page") . '</div>';
     
      print '<div id="about-affiliates-view"><div class="about-view-heading">AFFILIATES</div>' . views_embed_view('affiliates_view', "page") . 
            '</div>';
     
      print '<div id="about-alumni-view"><div class="about-view-heading">ALUMNUS</div>' . views_embed_view('alumni_view', "page_1") . '</div>';


      //$people_view = views_get_view('People');
      //$affiliates_view = views_get_view('Affiliates_view');
      //$alumni_view = views_get_view('Alumni_view');

      //print views_build_view('embed', $people_view);
    ?>
  </div>
</div>


