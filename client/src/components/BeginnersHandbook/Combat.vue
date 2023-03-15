<template>
    <div class="heading">5. Combat</div>
    <div class="party">
        <strong>5.1. Party</strong>
        <p>There is only one party for every player and it can have at most 3 members.</p>
        <ol>
            Below are a few interactions that can be made with your party:
            <li><em><strong>/party add + [character_name] + [position]</strong></em> adds the desired character from roster to the specified position in party.</li>
            <li><em><strong>/party remove + [position]</strong></em> removes the character from the specified position.</li>
            <li><em><strong>/party clear</strong></em> clears the entire party.</li>
        </ol>
    </div>
    <br>
    <div class="combat-initiation">
        <strong>5.2. Initiate combat</strong>
        <ol>
            Pre-requisites:
            <li>At least 1 member in party.</li>
            <li>Currently in area/subarea with enemies.</li>
        </ol>
        <br>
        <p>
            By doing <em><strong>/battle</strong></em>, you will be prompted to the battlefield where lots of enemies await.
        </p>
        </div>
    <br>
    <div class="combat-mechanics">
        <strong>5.3. Combat mechanics</strong>
        <p>
            Winterfall is a turn-based game, meaning you and your enemies will take turn attacking each other with you, the player 
            being the first to attack on every turn. 
        </p>
        <br>
        <p>
            Upon entering a battle, current statuses of both sides are displayed on an embed. Below it are interactive buttons
            for attacks and skills of the current member on the battlefield and a select menu for switching between party members. 
            Do note that a turn is only considered finished when the on-field character is done perfoming their action and not when 
            switching. Consequently, the enemy will only retaliate when an action by the on-field character is performed. 
        </p>
        <br>
        <p>
            Skills are divided into 2 categories: <b>passive</b> and <b>active</b> and have cooldowns whereas basic attacks have none.
            This applies to characters and enemies alike. Skills on cooldown will have their options greyed out as an indicator.
        </p>
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

.party, .combat-initiation, .combat-mechanics {
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