<template>
    <h4>Pick a language that fits you the best.</h4>
    <div class="languages">
        <h2 class="lang-heading">Select a language:</h2>
        <div class="language-options">
            <div class="lang-en">
                <input type="radio" id="lang-en-check" name="lang-check" @change="changeLanguage('en')">
                <label for="lang-en-check">English</label>
            </div>
            <div class="lang-de">
                <input type="radio" id="lang-de-check" name="lang-check" @change="changeLanguage('de')">
                <label for="lang-de-check">Deutsch</label>
            </div>
            <div class="lang-vi">
                <input type="radio" id="lang-vi-check" name="lang-check" @change="changeLanguage('vi')">
                <label for="lang-vi-check">Tiếng Việt</label>
            </div>
            <div class="lang-es">
                <input type="radio" id="lang-es-check" name="lang-check" @change="changeLanguage('es')">
                <label for="lang-es-check">Español</label>
            </div>
            <div class="lang-日本語">
                <input type="radio" id="lang-日本語-check" name="lang-check" @change="changeLanguage('日本語')">
                <label for="lang-日本語-check">日本語</label>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Store from '@/store';

    export default {
        methods: {
            changeLanguage(lang: string) {
                Store.commit('setLanguage', lang);
                //implement lang change here...


                //save to localStorage
                localStorage.setItem('lang', lang);
            }
        },
        mounted() {
            let langCheck;
            //default 
            if (!localStorage.getItem('lang') || localStorage.getItem('lang') === 'en') {
                langCheck = <HTMLInputElement> document.getElementById('lang-en-check');
                langCheck.checked = true;
            }
            else if (localStorage.getItem('lang') === 'de') {
                langCheck = <HTMLInputElement> document.getElementById('lang-de-check');
                langCheck.checked = true;
            }
            else if (localStorage.getItem('lang') === 'vi') {
                langCheck = <HTMLInputElement> document.getElementById('lang-vi-check');
                langCheck.checked = true;
            }
            else if (localStorage.getItem('lang') === 'es') {
                langCheck = <HTMLInputElement> document.getElementById('lang-es-check');
                langCheck.checked = true;
            }
            else if (localStorage.getItem('lang') === '日本語') {
                langCheck = <HTMLInputElement> document.getElementById('lang-日本語-check');
                langCheck.checked = true;
            }
        }
    }
</script>

<style scoped>

.lang-heading {
    margin-top: 3.5rem;
}

.language-options {
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    gap: 30px;
}

.language-options > div {
    display: flex;
    gap: 20px;
    width: 40%;
    justify-content: left;
    align-items: center;
}

input[name="lang-check"] {
    width: 25px;
    height: 25px; 
    border: 1px solid;
    border-color: var(--radio-border-color);
    border-radius: 50%;
    appearance: none;
    outline: none;
    cursor: pointer;
}

input[name="lang-check"]:checked {
    appearance: auto;
}

</style>