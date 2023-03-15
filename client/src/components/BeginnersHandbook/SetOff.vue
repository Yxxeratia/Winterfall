<template>
    <div class="heading">2. Setting Off</div>
    <div class="account-creation">
        <strong>2.1. Account Creation</strong>
        <p>
            To commence on your adventure, use the command <em> <strong>/account create</strong> </em>. You will be given a starting character (specify later)
            as well as some currencies: <b>Tanzanites</b>, <b>Ammolites</b> for <a href="#gacha">Gacha</a> and <b>Gold</b>.
        </p>
    </div>
    <br>
    <div class="account-deletion">
        <strong>2.2. Account Deletion</strong>
        <p>
            Re-rolling in this game is supported via account deletion. If you feel discontent with your current account, you can 
            delete it by perfoming the command <em> <strong>/account delete</strong> </em> and re-create a fresh one. 
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

.account-creation, .account-deletion {
    font-size: 1rem;
    text-indent: 1.2rem;
    margin-left: 1rem;
}
p {
    margin: 0 1rem;
}
</style>