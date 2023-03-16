<script lang="ts">
import Header from '@/components/Header.vue';
import OngoingBanners from '../components/Home/OngoingBanners.vue';
import WorldMap from '@/components/Home/WorldMap.vue';

export default {
  components: {Header, OngoingBanners, WorldMap},
}
</script>

<template>
  <header>
    <Header/>
  </header>
  <div class="nav-to-handbook">
    <div class="handbook-nav-heading">
      <img src="../assets/general/point.png" alt="point">
      <h2>New to Winterfall?</h2> 
    </div>
    <p>
      Do not fret, the <router-link :to="{name: `Beginner's Handbook`}" class="router-to-handbook">Beginner's Handbook</router-link> is 
      here for only one reason: To help inexperienced adventures like you become fast accustomed to their new environment. 
    </p>
  </div>
  <main>
    <OngoingBanners/>
    <WorldMap/>
  </main>
</template>

<style scoped>

main, .nav-to-handbook {
  margin-top: 5rem;
}

.handbook-nav-heading {
  display: flex;
  justify-content: left;
  align-items: center;
  gap: 10px;
}

img[alt*="point"] {
  width: 30px;
  height: 30px;
  background-color: rgb(124, 124, 198);
}

.router-to-handbook {
  background: linear-gradient(
        to right,
        #02ccff,
        #93E7FB,
        #C0F6FB,
        #93E7FB,
        #02ccff
    );
    background-size: 200%;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: background-pan 3s linear infinite;
}

@keyframes background-pan {
  from {
    background-position: 0% center;
  }
  to {
    background-position: -200% center;
  }
}


/*@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}*/
</style>
