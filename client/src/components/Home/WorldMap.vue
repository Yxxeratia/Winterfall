<template>
    <h1 class="heading">World Map</h1>
    <div class="image-container">
        <transition-group :name="back ? 'slideback' : 'slide'">
            <div v-for="i in [currentIndex]" :key="i" class="image-wrapper">
                <img :src="currentContinent" />
            </div>
        </transition-group>
        <button @click="prev" class="prev">
            <i class="arrow left"></i>
        </button>
        <button @click="next" class="next">
            <i class="arrow right"></i>
        </button>
    </div>
</template>

<script lang="ts">
    export default {
        name: 'Switch',
        data() {
            return {
                continents: [
                    "https://cdn.discordapp.com/attachments/379262555836776449/1053369312062230593/Sprummer.jpg", 
                    "https://cdn.discordapp.com/attachments/379262555836776449/1052661889819234314/Wrunkalis.jpg",
                ],
                currentIndex: 0,
                back: false,
            }
        },

        methods: {
            prev() {
                this.back = true;
                if (this.currentIndex === 0) {
                    this.currentIndex = this.continents.length-1;
                }
                else {
                    this.currentIndex--;
                }
            },
            next() {
                this.back = false;
                if (this.currentIndex === this.continents.length-1) {
                    this.currentIndex = 0;
                }
                else {
                    this.currentIndex++;
                }
            }
        },

        computed: {
            currentContinent() {
                return this.continents[this.currentIndex];
            }
        }
    }
</script>

<style scoped>
.heading {
    margin-top: 5rem;
    margin-bottom: 1.2rem;
    margin-left: 1rem;
}

.image-container {
    position: relative;
}

.image-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
}

.image-wrapper img {
    width: 80%;
    height: 90%;
}
.prev, .next {
    position: absolute;
    background-color: #555;
    top: 50%;
    font-size: 15px;
    height: 40px;
    width: 50px;
    border: none;
    cursor: pointer;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.prev {
    left: 0;
    transform: translateX(90%);
}
.next {
    right: 0;
    transform: translateX(-90%);
}

.arrow {
  border: solid whitesmoke;
  border-width: 0 4px 4px 0;
  display: inline-block;
  padding: 3px;
}

.left {
    transform: rotate(135deg);
    -webkit-transform: rotate(135deg);
}

.right{
    transform: rotate(-45deg);
    -webkit-transform: rotate(-45deg);
}

.prev:hover, .next:hover {
    background-color: black;
}

.slide-enter-active, .slide-leave-active, .slideback-enter-active, .slideback-leave-active {
  transition: all 0.9s ease;
  visibility: visible;
  opacity: 1;
}

.slideback-leave-active, .slide-leave-active {
    position: absolute;
}

.slide-enter, .slide-leave-to, .slideback-enter, .slideback-leave-to {
  visibility: hidden;
  opacity: 0;
}
.slide-enter, .slideback-leave-to {
    transform: translate(100%, 0);
}
.slide-leave-to, .slideback-enter {
    transform: translate(-100%, 0);
}
</style>



