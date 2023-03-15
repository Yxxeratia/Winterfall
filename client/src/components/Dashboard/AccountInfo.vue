<template>
    <Transition name="fade" :key="$route.params.userid" appear>
        <h1><b>{{ user.name }}'s</b> Account Overview</h1>
    </Transition>
    <Transition name="fadeback" :key="$route.params.userid" appear>
    <div class="account">   
        <div class="currency-container">
            <div class="currency-wrapper" v-for="currency in inventory.currencies" :key="currency.id">
                <img :src="currency.image" width="20" height="20">  
                <span>{{ currency.amount }}</span>
            </div>
        </div>

        <h2>Account Statistics</h2>
        <div class="checkin-notice">
            <p v-if="!user.checkedIn && user.id === mainUserId">
                Heads up! You have yet to check for attendance today. Huge blunder! You're missing out on your daily rewards. Luckily, 
                you can do that right here on the web 
                &#8594 <button @click="checkIn(mainUserId)" style="cursor: pointer;">Daily Reward Generator!</button> &#8592  
            </p>
            <p v-else-if="user.checkedIn && user.id === mainUserId">
                You have already checked in for the day ({{ user.lastCheckIn }}). You can check in again in {{ untilNextcheckIn }}.
            </p>
        </div>
        <div class="stat-container">
            <div class="stat-wrapper">
                <div class="activity-container">
                    <h3>Player Activities</h3>
                    <div class="activity-wrapper">
                        <span>Days active</span>
                        <br>
                        <span>{{ user.daysActive }}</span>
                        <br>
                        <span>Checked in</span>
                        <br>
                        <span v-if="user.checkedIn">Yes</span>
                        <span v-else>No</span>
                    </div>
                </div>
                <div class="record-container">
                    <h3>Battle Records</h3>
                    <div class="record-wrapper">
                        <span>Wins</span>
                        <br>
                        <span>{{ user.battlesWon }}</span>
                        <br>
                        <span>Losses</span>
                        <br>
                        <span>{{ user.battlesLost }}</span>
                        <br>
                        <span>Win rate</span>
                        <br>
                        <span>{{ user.winRate }}%</span>
                    </div>
                </div>
                <div class="kill-container">
                    <h3>Enemies Slain</h3>
                    <div class="kill-wrapper">
                        <span> Mobs</span>
                        <br>
                        <span>{{ user.mobsSlain }}</span>
                        <br>
                        <span> Elites</span>
                        <br>
                        <span>{{ user.elitesSlain }}</span>
                        <br>
                        <span> Bosses</span>
                        <br>
                        <span>{{ user.bossesSlain }}</span> 
                    </div>
                </div>
            </div>
        </div>

        <h2>Characters Owned</h2>
        <div class="characters">
            <div class="gallery-container">
                <div class="gallery-wrapper">
                <div v-for="character in characters" :key="character.id" class="gallery-illu-wrapper">
                    <img :src="character?.illu" @click="setId(character)" :class="(currentCharacterId === character.id) ? 'active' : 'inactive'">
                </div>  
                </div>
            </div>
            <div class="character-container">
                <div class="character-wrapper">
                    <div class="attributes">
                        <span>Name: {{ currentCharacter?.name }}</span>
                        <br>
                        <span>Lvl: {{ currentCharacter?.lvl }}</span>
                        <br>
                        <span>Exp: {{ currentCharacter?.exp }}/{{ currentCharacter?.expCap }}</span>
                        <br>
                        <span>HP: {{ Math.round(currentCharacter?.hp) }}</span>
                        <br>
                        <span>ATK: {{ Math.round(currentCharacter?.atk) }}</span>
                        <br>
                        <span>DEF: {{ Math.round(currentCharacter?.def) }}</span>
                        <br>
                        <span>CRIT: {{ currentCharacter?.crit*100 }}%</span>
                        <br>
                    </div>
                    <div class="illu-wrapper">
                        <img :src="currentCharacter?.illu">
                    </div>
                </div>
            </div> 
        </div>
    </div>
    </Transition>
</template>

<script lang="ts">
import GetUserProfile from '@/services/GetUserProfile';
import GetInventory from '@/services/GetInventory';
import GetRoster from '@/services/GetRoster';
import CheckIn from '@/services/CheckIn';

    interface User {
        id: string,
        name: string, 
        daysActive: number,
        checkedIn: boolean,
        lastCheckIn: Date,
        timeUntilNextCheckIn: number,
        mobsSlain: number,
        elitesSlain: number,
        bossesSlain: number,
        battlesWon: number,
        battlesLost: number,
        winRate: number,
    }

    interface Skill {
        id: number,
        name: string,
        lvl: number,
        skillType: string,
    };

    interface ActiveSkill extends Skill {
        multiplier: number,
        cooldown: number,
        damageType: string,

    };
    interface Character {
        id: number,
        illu: string,
        name: string,
        lvl: number,
        ascLvl: number,
        hp: number,
        atk: number,
        def: number,
        crit: number,
        exp: number,
        expCap: number,
        activeSkills: ActiveSkill[],
        passiveSkills: Skill[],
    };

    interface Item {
        id: number,
        name: string, 
        category: string, 
        amount: number,
        image: string,
    }

    interface Currency {
        id: number, 
        name: string, 
        amount: number,
        image: string,
    }

    interface Inventory {
        items: Item[],
        currencies: Currency[],
    }

    interface Reward {
        id: number, 
        name: string, 
        amount: number, 
        type: string
    }
    export default {
        emits: ["checkinClicked"], //events emitted by this component
        data() {
            return {
                user: {} as User,
                mainUserId: window.localStorage.uid, //user that is logged in
                characters: [] as Character[],
                inventory: {} as Inventory,
                rewards: [] as Reward[],
                currentCharacterId: 0, 
                nextCheckIn: '',
            }
        },
        methods: {
            setId(character: Character) {
                this.currentCharacterId = character?.id;
            },
            async loadInfo(uid: string | string[]) {
                const userTemp = await GetUserProfile.execute(<string> uid)
                this.user = userTemp;
                    
                //user not found in db
                if (!this.user.id) {
                   this.$router.push({name: 'Not Found'});
                   return;
                }
                const charactersTemp = await GetRoster.execute(<string> uid);
                this.characters = charactersTemp;
                this.currentCharacterId = this.characters[0].id;

                const inventoryTemp = await GetInventory.execute(<string> uid);
                this.inventory= inventoryTemp;
            },
            async checkIn(uid: string | string[]) {
                const rewardsTemp =  await CheckIn.execute(<string> uid);
                if (rewardsTemp != undefined) {
                    this.rewards = rewardsTemp;
                    this.$emit('checkinClicked', this.rewards); //pass to Dashboard
                }
            },
            epochToStandard(epochTime: number) {
                //convert from ms to hours minutes seconds format
                let seconds = Math.floor(epochTime/1000);
                let minutes = Math.floor(seconds/60);
                //seconds remaining
                seconds = seconds - minutes*60;
                let hours =  Math.floor(minutes/60);
                //minutes remaining
                minutes = minutes - hours*60;

                this.nextCheckIn = `${hours}h ${minutes}m ${seconds}s`;
            },
        },
        computed: {
            currentCharacter() {
                return this.characters.find(character => character.id === this.currentCharacterId)!;
            },
            untilNextcheckIn() {
                if (this.user.timeUntilNextCheckIn > 0) {
                    setTimeout(() => {
                        this.epochToStandard(this.user.timeUntilNextCheckIn);
                        this.user.timeUntilNextCheckIn -= 1000;
                    }, 1000)
                    return this.nextCheckIn;
                }
            }
        },
        async mounted() {
            await this.loadInfo(this.$route.params.userid);
        },
        created() {
            this.$watch(
                () => this.$route.params,
                async () => {
                    await this.loadInfo(this.$route.params.userid);
                },
                {deep: true}
            )
        },
    }
</script>

<style lang="scss" scoped>
h1, h2 {
    margin-top: 5rem;
    margin-bottom: 2rem; 
}

h1 {
    border-bottom: 3px solid ;
    animation: h1-load 1s ease;
}

@keyframes h1-load {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(0);
    }
}

h3 {
    margin-top: 1rem;
    margin-bottom: 1rem;
}

.fade-enter-active, .fade-leave-active, .fadeback-enter-active, .fadeback-leave-active {
    transition: all 0.9s ease;
    visibility: visible;
}

.fadeback-leave-active, .fade-leave-active {
    position: absolute;
}

.fade-enter-from, .fade-leave-to, .fadeback-enter-from, .fadeback-leave-to {
    visibility: hidden;
}
.fade-enter-from, .fadeback-leave-to {
    transform: translate(100%, 0);
}
.fade-leave-to, .fadeback-enter-from {
    transform: translate(-100%, 0);
}

.account {
    animation: account-load 1.5s ease;
}

@keyframes account-load {
    0% {
      transform: translateX(100%);
    }
    100% {
      transform: translateX(0);
    }
}

.currency-container {
    display: flex;
    flex-direction: row-reverse;
    gap: 2rem;
    top: 1.6rem;
    right: 2rem;
    font-size: 1rem;
}

.currency-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 5px;
}

.checkin-notice {
    text-indent: 1.2rem;
    font-size: 1.2rem;
}

.stat-container {
    display: flex;
    justify-content: center;
}

.stat-wrapper {
    display: flex;
    gap: 10rem;
    font-size: 1.2rem;
    align-items: center;
}

.stat-wrapper > * > div {
    border: 5px solid #FFD700;
    border-radius: 10px;
    text-align: center;    
}

.activity-container {
    height: 70%;
}


.gallery-container {
    display: flex;
    justify-content: center;
}

.gallery-wrapper {
    display: flex;
    border: 5px dashed salmon;
}

.gallery-illu-wrapper {
    width: 71px;
    height: 100px;
}

.gallery-illu-wrapper img {
    width: inherit;
    height: inherit;
    object-fit: cover;
}

.active {
    border: solid rgb(126, 183, 214) 5px;
}

.character-container {
    margin-top: 3rem;
    position: relative;
}

.character-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10rem;
}

.attributes {
    display: flex;
    flex-direction: column;
}


.illu-wrapper img {
    width: 318px;
    height: 450px;
    object-fit: cover;
    border: solid rgb(18, 136, 227);
    border-radius: 10px;
}

</style>