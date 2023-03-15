<template>
    <h4>Configure your app's appearance, such as background, font size and font color.</h4>

    <div class="background">
        <h2 class="bg-heading">Background</h2>
        <div class="background-options">
            <div class="bg-option-dark">
                <input type="radio" id="dark-bg-check" name="bg-check" @change="changeBGColor('#181818', 'rgba(235, 235, 235, 0.64)')">
                <label for="dark-bg-checkbox" class="dark">Dark</label>
            </div>

            <div class="bg-option-light">
                <input type="radio" id="light-bg-check" name="bg-check" @change="changeBGColor('#fffff', '#2c3e50')">
                <label for="light-bg-checkbox" class="light">Light</label>
            </div>    
        </div>
    </div>

    <div class="font-size">
        <h2 class="font-size-heading">Font Size</h2>
        <div class="scale-container">
            <div class="scale-wrapper">
                <input type="radio" v-for="i in 5" :key="i"  name="threshhold" class="thresholds">
            </div>
        </div>
    </div>

    <div class="color">
        <h2 class="color-heading">Color</h2>
        <div class="color-options">
            <div class="color-option gray">
                <input type="radio" id="gray-font-check" name="font-check" class="font-check">
                <label for="gray-font-check"></label>
            </div>
            <div class="color-option yellow">
                <input type="radio" id="yellow-font-check" name="font-check" class="font-check">
                <label for="yellow-font-check"></label>
            </div>
            <div class="color-option red">
                <input type="radio" id="red-font-check" name="font-check" class="font-check">
                <label for="red-font-check"></label>
            </div>
            <div class="color-option pink">
                <input type="radio" id="pink-font-check" name="font-check" class="font-check">
                <label for="pink-font-check"></label>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Store from '@/store';

    export default {
        emits: ['bgColorChanged'],
        methods: {
            changeBGColor(bgColor: string, fontColor: string) {
                document.documentElement.style.setProperty('--bg-color', bgColor);
                this.changeFontColor(fontColor);
                
                this.$emit('bgColorChanged', bgColor);
                Store.commit('setBGColor', bgColor); //state

                //change border color of radio inputs and font checkmark
                if (bgColor === '#181818') {
                    document.documentElement.style.setProperty('--radio-border-color', '#ddd');
                    document.documentElement.style.setProperty('--font-checkmark-color', 'snow');
                }
                else if (bgColor === '#fffff') {
                    document.documentElement.style.setProperty('--radio-border-color', '#181818');
                    document.documentElement.style.setProperty('--font-checkmark-color', '#181818');
                }

                //save to localStorage
                localStorage.setItem('bg', bgColor);
            },
            changeFontColor(color: string) {
                document.documentElement.style.setProperty('--font-color', color);
            }
        },
        mounted() {
            let bgCheck;
            //default 
            if (!localStorage.getItem('bg') || localStorage.getItem('bg') === '#181818') {
                bgCheck = <HTMLInputElement> document.getElementById('dark-bg-check');
                bgCheck.checked = true;
            }
            else if (localStorage.getItem('bg') === '#fffff') {
                bgCheck = <HTMLInputElement> document.getElementById('light-bg-check');
                bgCheck.checked = true;
            }
        }
    }
</script>

<style lang="scss">

:root {
    --bg-color: #181818;
    --font-color:  rgba(235, 235, 235, 0.64);
    --radio-border-color: #ddd;
    --font-checkmark-color: snow;
}

body {
    background-color: var(--bg-color);
    color: var(--font-color);
}

.bg-heading, .font-size-heading, .color-heading {
    margin-top: 3.5rem;
}

.background-options {
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    gap: 30px;
}

.background-options > div {
    display: flex;
    gap: 20px;
    width: 40%;
    justify-content: left;
    align-items: center;
}

input[name="bg-check"] {
    width: 25px;
    height: 25px; 
    border: 1px solid;
    border-color: var(--radio-border-color);
    border-radius: 50%;
    appearance: none;
    outline: none;
    cursor: pointer;
}

input[name="bg-check"]:checked {
    appearance: auto;
}


.light, .dark {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    height: 50px;
    width: 100px;
}

.light {
    background-color: #ffffff;
    border: 2px solid #181818;
    color: #181818;
}

.dark {
    background-color: #181818;
    border: 2px solid #ffffff;
    color: #ffffff;
}

.scale-container {
    height: 50px;
    display: flex;
    align-items: center;
}

.scale-wrapper {
    width: 100%;
    height: 15%;
    background-color: gray;
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

$total-thresholds: 5;
@for $i from 1 through $total-thresholds {
    .thresholds:nth-child(#{$i}) {
        background-color: snow;
        border-radius: 50%;
        width: 15px + $i - 3px;
        height: 15px + $i - 3px;
    }
}

.color-options {
    margin-top: 1rem;
    display: flex;
    gap: 30px;
}

.color-option {
    width: 50px;
    height: 50px;
    border-radius: 50%;
}

.gray {
    background-color: rgba(235, 235, 235, 0.64);
}

.yellow {
    background-color: rgba(247, 247, 19, 0.896);
}

.red {
    background-color: rgba(248, 32, 32, 0.83);
}

.pink {
    background-color: rgba(250, 43, 191, 0.945);
}

.font-check {
    display: none;
}

.font-check + label {
    display: inline-block;
    cursor: pointer;
}

.font-check + label::before {
    content: "";
    display: inline-block;
    position: relative;
    width: 50px;
    height: 50px;
    border: 1px solid;
    border-color: var(--radio-border-color);
    border-radius: 50%;
}

.font-check:checked + label::before {
    content: "✔";
    font-size: 28px;
    color: var(--font-checkmark-color);
    text-align: center;
}

</style>