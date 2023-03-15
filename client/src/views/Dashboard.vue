<script lang="ts">
import Header from '@/components/Header.vue';
import SearchEngine from '@/components/Dashboard/SearchEngine.vue';
import AccountInfo from '@/components/Dashboard/AccountInfo.vue';

interface Reward {
    id: number, 
    name: string, 
    amount: number, 
    type: string
}

export default {
    data() {
        return {
            isBlurred: false,
            checkinPhase: 0, //1 means in progress (special div appears + everything else is blurred out), 0 otherwise
            rewards: [] as Reward[],
        }
    },
    components: {Header, SearchEngine, AccountInfo,},
    methods: {
        checkIn(rewardsFromChild: Reward[]) {
            this.checkinPhase = 1;
            this.rewards = rewardsFromChild;
            this.isBlurred = true;
            let elem = document.getElementById('checkin-confirmation');
            if (elem) {
                elem.scrollIntoView({behavior: 'smooth'});
            }
        },
        checkinDone() {
            this.$router.go(0); //refresh
            this.checkinPhase = 0;
            this.isBlurred = false;
        }
    }
}
</script>

<template>
    <header>
        <Header/>
    </header>
    <!--v-if="checkinPhase === 1"-->
     <div v-if="checkinPhase === 1" class="checkin-confirmation-container">
        <div id="checkin-confirmation" class="checkin-confirmation-wrapper">
            <h3>Success! Here are today's rewards</h3>
            <span v-for="reward in rewards" :key="reward.id">{{ reward.name }} <i>x{{ reward.amount }}</i></span>
            <br>
            <br>
            <span @click="checkinDone()" class="exit-checkin">Return to Dashboard</span>
        </div>
    </div>
    <main :class="isBlurred ? 'blurred' : 'not-blurred'">
        <SearchEngine/>
        <AccountInfo @checkinClicked= "checkIn" />
    </main>

</template>

<style lang="scss" scoped>
.checkin-confirmation-container {
    height: 400px;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
}

.checkin-confirmation-wrapper {
    width: 50%;
    height: 50%;
    border: 5px ridge;
    border-radius: 5px;
    background-color: #76c4ae;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.4);;
}

.exit-checkin {
    cursor: pointer;
}

.exit-checkin:hover {
    background-color: gray;
}

.blurred {
    filter: blur(5px);
}
</style>
