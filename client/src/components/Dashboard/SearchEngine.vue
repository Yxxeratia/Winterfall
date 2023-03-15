<template>
    <div class="search-container">
        <button @click="searchbyUID">Search</button>
        <input id="player-uid" type="text" placeholder="UID of player...">
    </div>

</template>


<script lang="ts">
    export default {
        data() {
            return {
                searchedUID: '',
            }
        },
        methods: {
            searchbyUID() {
                this.searchedUID = (<HTMLInputElement>document.getElementById('player-uid')).value;
                this.$router.push({name: 'Dashboard', params: {userid: this.searchedUID}});
                let input = <HTMLInputElement> document.getElementById('player-uid');
                input.value = "";
            }
        },
    }
</script>


<style scoped>
.search-container {
    margin-top: 8rem;
    display: flex;
    gap: 10px;
    flex-direction: row-reverse;
}

#player-uid {
    text-align: left
}
</style>