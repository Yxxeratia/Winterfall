<script lang="ts">
import Header from '@/components/Header.vue';
import Accessibility from '@/components/AppSettings/Accessibility.vue'
import Display from '@/components/AppSettings/Display.vue';
import Languages from '@/components/AppSettings/Languages.vue';


export default {
    components: {Header, Accessibility, Display, Languages},
    data() {
        return {
            navId: 1,
        }
    },
    methods: {
        setNavId(id: number) {
            this.navId = id;
        },
        updatePage(bgColorFromChild: string) {
            //dark
            if (bgColorFromChild === '#181818') {
                document.documentElement.style.setProperty('--nav-bg-color', 'rgba(255, 250, 250, 0.2)');
            }
            //light
            else if (bgColorFromChild === '#fffff') {
                document.documentElement.style.setProperty('--nav-bg-color', 'rgba(128, 128, 128, 0.6)');
            }
        }
    },
    mounted() {
        //default 
        if (!localStorage.getItem('bg') || localStorage.getItem('bg') === '#181818') {
            document.documentElement.style.setProperty('--nav-bg-color', 'rgba(255, 250, 250, 0.2)');
        }
        else if (localStorage.getItem('bg') === '#fffff') {
            document.documentElement.style.setProperty('--nav-bg-color', 'rgba(128, 128, 128, 0.6)');
        }
    }
}
</script>


<template>
    <header>
        <Header/>
    </header>
    <div class="body-wrapper">
        <section class="nav-bar">
            <div class="nav-bar-wrapper">
                <div @click="setNavId(1)" class="accessibility-nav" :class="navId === 1 ? 'active' : 'inactive'">
                    <span>Accessibility</span>
                </div>
                <div @click="setNavId(2)" class="display-nav" :class="navId === 2 ? 'active' : 'inactive'">
                    <span>Display</span>
                </div>
                <div @click="setNavId(3)" class="languages-nav" :class="navId === 3 ? 'active' : 'inactive'">
                    <span>Languages</span>
                </div>
            </div>
        </section>

        <section class="content">
            <div v-if="navId === 1" class="accessibility-main">
                <Accessibility/>
            </div>
            <div v-if="navId === 2" class="display-main">
                <Display @bg-color-changed="updatePage"/>
            </div>
            <div v-if="navId === 3" class="languages-main">
                <Languages/>
            </div>
        </section>
    </div>
</template>

<style lang="scss">

:root {
    --nav-bg-color: rgba(255, 250, 250, 0.2);
}

.body-wrapper {
    margin-top: 8rem;
    display: flex;
    gap: 5rem;
}

.nav-bar {
    width: 25%;
    height: 700px;
    display: flex;
    border-right: 2px solid gray;
    justify-content: center;
    align-items:start
}

.nav-bar-wrapper {
    width: 60%;
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

.nav-bar-wrapper > div {
    cursor: pointer;
}


.nav-bar-wrapper > div:hover {
    background-color: var(--nav-bg-color);
}

.active {
    background-color: var(--nav-bg-color);
}

.nav-bar-wrapper > div > span{
    font-size: 20px;
}

.content > * {
    left: 3rem;
}
</style>