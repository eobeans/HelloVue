<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
ol,ul,li { list-style:none;}
img{ 
     border:none;
     vertical-align:baseline;
}
a, a:link, a:visited{
     color:#000;
     text-decoration:none;
}
a:hover{ 
    color:#000; 
    text-decoration:underline;
}

</style>

