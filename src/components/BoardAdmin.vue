<template>
  <div class="p-3">
    <div class="x-card  x-card--full-width">
      <div class="x-card__body">

        <div class='tableauPlaceholder' id='viz1665482849035' style='position: relative'>
          <noscript><a href='#'>
            <img alt='Dashboard 2 ' src='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;tr&#47;trus&#47;Dashboard2&#47;1_rss.png' style='border: none' /></a>
          </noscript>
          <object class='tableauViz'  style='display:none;'>
            <param name='host_url' value='https%3A%2F%2Fpublic.tableau.com%2F' />
            <param name='embed_code_version' value='3' />
            <param name='site_root' value='' />
            <param name='name' value='trus&#47;Dashboard2' />
            <param name='tabs' value='no' />
            <param name='toolbar' value='yes' />
            <param name='static_image' value='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;tr&#47;trus&#47;Dashboard2&#47;1.png' />
            <param name='animate_transition' value='yes' />
            <param name='display_static_image' value='yes' />
            <param name='display_spinner' value='yes' />
            <param name='display_overlay' value='yes' />
            <param name='display_count' value='yes' />
            <param name='language' value='en-US' />
          </object>
        </div>
      </div><!-- /.card__body -->
    </div><!-- /.card -->
  </div>
</template>

<script>
/* eslint-disable*/
import UserService from "../services/user.service";
import EventBus from "../common/EventBus";

export default {
  name: "Admin",
  mounted() {
    var divElement = document.getElementById('viz1665482849035');
    var vizElement = divElement.getElementsByTagName('object')[0];
    if ( divElement.offsetWidth > 800 ) { vizElement.style.width='1200px';vizElement.style.height='4867px';}
    else if ( divElement.offsetWidth > 500 ) { vizElement.style.width='1200px';vizElement.style.height='4867px';}
    else { vizElement.style.width='100%';vizElement.style.height='4077px';}
    var scriptElement = document.createElement('script');
    scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';
    vizElement.parentNode.insertBefore(scriptElement, vizElement);
  }
};

</script>
