<template>
    <div class="heading">3. The Gacha System</div>
    <div class="gacha-access">
        <strong>3.1. Accessing the system</strong>
        <p>
            (Assuming you have already created an account) Upon using the command <em> <strong>/gacha pull</strong> </em>, a gacha page 
            will pop up where you can then use <b>Tanzanites</b> and <b>Ammolites</b> to roll for characters.
        </p>
    </div>
    <br>
    <div class="gacha-procedure">
        <strong> 3.2. Procedure </strong>
        <ul>
            Players can choose between 2 banners:
            <li><a href="#banners">Standard</a> is permanently available and uses Tanzanites.</li>
            <li><a href="#banners">Event</a> uses Ammolites and is only available for a limited period, after which another will take the current's place.</li>
        </ul>
        <br>
        <p>
            Players can then select whether to single roll (x1) or multi roll (x10). Newly obtained characters are added to roster 
            and can be checked using the command <em><strong>/roster</strong></em>. Any duplicate of a character will be converted 
            into either an ascension level for that character if they have yet to reach max ascension or <b>Mileage</b> otherwise. 
        </p>
    </div>

</template>

<script setup lang="ts">
</script>

<style scoped>
* :not(strong, em, a, b){
    margin: 0 0.5rem ;
}

.heading {
    font-size: 1.6rem;
    margin-top: 5rem;
    margin-bottom: 1.2rem;
    margin-left: 1rem;
}

.gacha-access, .gacha-procedure {
    font-size: 1rem;
    text-indent: 1.2rem;
    margin-left: 1rem;
}

p {
    margin: 0 1rem;
}

li {
    margin-left: 1.2rem;
    text-indent: 0;
}
</style>