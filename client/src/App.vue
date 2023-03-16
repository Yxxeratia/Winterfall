<script lang="ts">
import 'vue-router';
import Store from './store';

declare module 'vue-router' {
  interface RouteMeta {
    transition: string,
  }
}

import MusicPlayer from '@/components/MusicPlayer.vue';

export default {
  components: {MusicPlayer},
  methods: {
    changeBGColor(bgColor: string, fontColor: string) {
      document.documentElement.style.setProperty('--bg-color', bgColor);
      this.changeFontColor(fontColor);
                
      Store.commit('setBGColor', bgColor); //state

      //change border color of radio inputs and font checkmark
      if (bgColor === '#181818') {
        document.documentElement.style.setProperty('--radio-border-color', '#ddd');
        document.documentElement.style.setProperty('--font-checkmark-color', 'snow');
      }
      else if (bgColor === '#fffff') {
        document.documentElement.style.setProperty('--radio-border-color', '#181818');
        document.documentElement.style.setProperty('--font-checkmark-color', '#181818');
      }

      //save to localStorage
      localStorage.setItem('bg', bgColor);
    },
    changeFontColor(color: string) {
      document.documentElement.style.setProperty('--font-color', color);
    }
  },
  async mounted() {
    //default 
    if (!localStorage.getItem('bg') || localStorage.getItem('bg') === '#181818') {
      this.changeBGColor('#181818', 'rgba(235, 235, 235, 0.64)');
    }
    else if (localStorage.getItem('bg') === '#fffff') {
      this.changeBGColor('#fffff', '#2c3e50');
    }
  }
}
</script>

<template>
  <MusicPlayer/>
  <div id="app">  
    <router-view v-slot="{Component, route}">
      <Transition :name = "route.meta.transition" :key="route.name" appear>
        <!--root element-->
        <div>
          <component :is="Component"></component>
        </div>
      </Transition>
    </router-view>
  </div>
</template>

<style>

.fade-enter-active, .fade-leave-active, .fadeback-enter-active, .fadeback-leave-active {
  transition: all 0.9s ease;
  visibility: visible;
  opacity: 1;
}

.fadeback-leave-active, .fade-leave-active {
  position: absolute;
}

.fade-enter-from, .fade-leave-to, .fadeback-enter-from, .fadeback-leave-to {
  visibility: hidden;
  opacity: 0;
}
.fade-enter-from, .fadeback-leave-to {
  transform: translate(100px, 0);
}
.fade-leave-to, .fadeback-enter-from {
  transform: translate(-100px, 0);
}

</style>
