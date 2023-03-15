<script setup lang="ts">
import Header from '@/components/Header.vue';
import Story from '../components/BeginnersHandbook/Story.vue';
import MapInteraction from '@/components/BeginnersHandbook/MapInteraction.vue';
import SetOff from '../components/BeginnersHandbook/SetOff.vue';
import Gacha from '../components/BeginnersHandbook/Gacha.vue';
import Combat from '../components/BeginnersHandbook/Combat.vue'
</script>

<template>
    <header>
      <Header/>
      <div class="snow-wrapper">
          <div v-for="i in 50" :key="i" class="snowflake">❄</div>
      </div>
    </header>
    <main>
        <Story/>
        <SetOff/>
        <Gacha/>
        <MapInteraction/>
        <Combat/>
    </main>
</template>

<style lang="scss" scoped>
.snowflake {
  position: absolute;
  overflow: hidden;
}

@keyframes fall {
  0% {
    top: 0vh;
  }
  100% {
    top: 300vh;
  }
}

@keyframes shake {
  0% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(100px);
  }
  100% {
    transform: translateX(0);
  }
}

$total: 50;
@for $i from 1 through $total {
  .snowflake:nth-child(#{$i}) {
    --size: #{calc(random(10)/2)+5}px;
    --hori-start: #{random(10)-10}vw;
    --hori-end: #{random(30)-10}vw;
    left: #{random(90)}vw;
    filter: drop-shadow(0 0 5px snow);
    animation-name: fall, shake;
    animation-duration:  #{5 + random(5)}s, 3s; 
    animation-delay: -#{random(10)}s, -#{random(5)}s;  
    animation-timing-function: linear, ease-in-out;
    animation-iteration-count: infinite, infinite;
  }  
}
</style>