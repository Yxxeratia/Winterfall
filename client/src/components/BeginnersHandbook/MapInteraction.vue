<template>
  <div class="heading">4. The Map System</div>
        <div class="map-access">
            <strong>4.1. Using the map</strong> 
            <p>
                To access the world map, use <em><strong>/map</strong></em>. An introduction page will be displayed along with a select
                menu below it, with which players can choose what continent they wish to view.
            </p>
        </div>
        <br>
        <div class="location-switch">
           <strong>4.2. Changing locations</strong>
            <ol>
                What about leaving for another location from your current one? There are 3 options:
                <li><em><strong>/change continent + [continent_name].</strong></em></li>
                <li><em><strong>/change area + [area_name]</strong></em> allows traveling to another area within your current continent.</li> 
                <li><em><strong>/change subarea + [subarea_name]</strong></em> allows traveling to another subarea within your current area.</li>
            </ol>
        </div>
</template>

<script setup lang="ts">
</script>


<style scoped>
.heading {
    margin-top: 5rem;
    font-size: 1.6rem;
    margin-bottom: 1.2rem;
    margin-left: 1rem;
}

.map-access, .location-switch {
    font-size: 1rem;
    text-indent: 1.2rem;
    margin-left: 1rem;
}

li {
    margin-left: 1.2rem;
    text-indent: 5px;
}

p {
    margin: 0 1rem;
}
</style>