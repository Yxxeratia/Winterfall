<template>
    <h1 class="heading">Ongoing Banners</h1>
    <div v-if="currentBannerId === 1" class="banner1-animation">
        <div v-for="i in 15" :key="i" class="meteor"></div>
    </div>
    <div v-if="currentBannerId === 3" class="banner3-animation">
         <div class="rain front">
            <div v-for="i in 50" :key="i" class="front-drop"></div>
        </div>
            <div class="rain back">
            <div v-for="i in 50" :key="i" class="back-drop"></div>
        </div>
        <div class="flash"></div>
    </div>
    <div class="banner-container">
        <div v-for="banner in banners" :key="banner.id" @click="setId(banner)" class="banner-wrapper">
            <div class="name-wrapper">
                <p>{{ banner.name }}</p>
            </div>
            <img :src="banner.image" width="300" height="150"  :class="(currentBannerId === banner.id) ? 'active' : 'inactive'">
        </div>
    </div>
    <div class="banner-info-container">
        <div class="banner-info-wrapper">
            <table v-if="currentBannerId !=9999 " style="border-collapse: separate; border-spacing: 1rem;">
                <tr>
                    <th>Character</th>
                    <th>Lvl</th>
                    <th>HP</th>
                    <th>ATK</th>
                    <th>DEF</th>
                    <th>CRIT</th>
                </tr>
                <tr v-for="character in currentBanner?.characters">
                    <td>{{ character.name }}</td>
                    <td>{{ character.baseLvl }}</td>
                    <td>{{ Math.round(character.hp) }}</td>
                    <td>{{ Math.round(character.atk) }}</td>
                    <td>{{ Math.round(character.def) }}</td>
                    <td>{{ character.crit*100 }}%</td>
                </tr>
            </table>
        </div>
    </div>

</template>

<script lang="ts">  
import GetBanners from '../../services/GetBanners';
    interface Skill {
        id: number,
        name: string,
        baseLvl: number,
        skillType: string,
    }

    interface ActiveSkill extends Skill {
        baseMultiplier: number,
        cooldown: number,
        damageType: string,

    }

    interface Character {
        id: number,
        name: string,
        baseLvl: number,
        baseAscLvl: number,
        hp: number,
        atk: number,
        def: number,
        crit: number,
        activeSkills: ActiveSkill[],
        passiveSkills: Skill[],
    }

    interface Banner {
        id: number,
        name: string,
        characters: Character[],
        charactersRate: number,
        duration: string,
        endDate: string,
        image: string,

    }
    export default {
        name: 'ongoingBanners',
        data() {
            return {
                banners: [] as Banner[],
                currentBannerId: 9999,
            }
        },
        
        methods: {
            setId(banner: Banner) {
                this.currentBannerId = banner.id;
            }
        },
        computed: {
            currentBanner() {
                return this.banners.find(banner => banner.id === this.currentBannerId);
            }
        },
        async mounted() {
            let bannersTemp = await GetBanners.execute();
            this.banners = bannersTemp;
        },
    }
</script>


<style lang="scss" scoped>
@use "sass:math";
.heading {
    margin-top: 5rem;
    margin-bottom: 1.2rem;
    margin-left: 1rem;

    /*background: linear-gradient(
        to right,
        #b92b27,
        #1565C0,
        #0a2565,
        #1565C0,
        #b92b27
    );
    background-size: 200%;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: background-pan 3s linear infinite;*/

}
/*
@keyframes background-pan {
  from {
    background-position: 0% center;
  }
  to {
    background-position: -200% center;
  }
}*/

.meteor {
    z-index: 2;
}

$total-meteors: 15;
@for $i from 1 through $total-meteors {
    $v: random(100) + 9; //left
    $h: random(250) + 50; //top
    $d: calc(random(70)/10) + 3; //seconds 
    .meteor:nth-child(#{$i}) {
        position: absolute;
        top: $h + px;
        left: $v*1%;
        width: 300px;
        height: 1px;
        background: white;
        transform: rotate(-45deg);
        animation: shower $d+s linear infinite;
        animation-delay: -#{random(10)}s;
        &:before {
            content: "";
            position: absolute;
            width: 4px;
            height: 5px;
            border-radius: 50%;
            margin-top: -2px;
            background: rgba(#fff,.7);
            box-shadow: 0 0 15px 3px #fff;
        }
    }
}

@keyframes shower {
    0% {
        opacity: 1;
        margin-top: -280px;
        margin-right: -50px;
    }
    12% {
        opacity: 0;
    }
    15% {
        margin-top: 300px;
        margin-left: -600px;
        opacity: 0;
    }
    100% {
        opacity: 0;
    }
}

.rain {
  position: absolute;
  z-index: 2;
}

.rain.back {
  z-index: 1;
  bottom: 60px;
  opacity: 0.5;
}

$total-rain-drops: 50; 
$drop-start: 3vh;
$drop-end: 60vh;
@for $i from 1 through $total-rain-drops {
  .front-drop:nth-child(#{$i}) {
    position: absolute;
    width: 1px;
    height: 60px;
    left: #{random(90)}vw;
    animation: drop #{random(5)*0.4}s linear infinite;
    animation-delay: -#{random(5)}s;
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.25));
  }  
  .back-drop:nth-child(#{$i}) {
    position: absolute;
    width: 1px;
    height: 60px;
    left: #{random(90)}vw;
    animation: drop #{random(4)*0.5}s linear infinite;
    animation-delay: -#{random(5)}s;
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.25));
  }
}

@keyframes drop {
  0% {
    margin-top: -280px;
    transform: translateY($drop-start);
  }
  0%, 65% {
    opacity: 1;
  }
  75%, 100% {
    transform: translateY($drop-end);
    opacity: 0;
  }
}
/*
.flash {
    top: -280px;
	width: 100%;
	height: 90vh;
	overflow: hidden;
	position: absolute;
    z-index: -1;
	animation: lightning-flash 5s ease-out infinite;
    animation-delay: 2s;
    filter: brightness(3);
}

@keyframes lightning-flash { 
    0%, 95% {
        opacity: 0;
        background-color: transparent;
    }
	96% { 
        opacity: 0.6;
        background-color: #fff; 
    }
    98% { 
        opacity: 0.2;
        background-color: transparent; 
    }
    99% { 
        opacity: 0.9;
        background-color: #fff; 
    } 
    100% {
        opacity: 0;
        background-color: #fff; 
    }
}*/

.banner-container {
    display: flex;
    justify-content: space-evenly;
}

.banner-wrapper {
    cursor: pointer;
}

.active {
    border: 5px solid rgb(218, 196, 196);
}

.name-wrapper {
    display: flex;
    justify-content: center;
}
.name-wrapper p {
    font-size: 1.2rem;
    margin-bottom: 1rem;
}

.banner-info-container {
    display: flex;
    justify-content: center;
}

.banner-info-wrapper {
    padding: 3rem;
}

</style>