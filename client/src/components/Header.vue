<template>
    <div class="header-container">
      <div class="title-container" @click="titleClick">
        <img src="./icon/header_icon.png" alt="header-icon" height="45" width="45">
        <div class="title-wrapper">
          <h1 class="title">WINTERFALL</h1>
        </div>
      </div>

      <div v-if="!uid" class="discord-auth">
        <font-awesome-icon icon="fa-brands fa-discord" style="font-size: 1.5rem ;" id="discord-icon"/>
        <!--re-direct to auth/discord-->
        <a href="https://discord.com/api/oauth2/authorize?client_id=1040183436587048992&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2Fauth%2Fdiscord&response_type=token&scope=identify" id="discord-login">
          <span style="text-decoration: underline;">Login with Discord</span>
        </a>
      </div>
      
      <div v-else class="user-wrapper" @mouseover="showUserPopup">
        <span class="name">{{ name }}</span>
        <img :src="avatar" alt="avatar">  
        <div v-if="popupVisible" class="user-popup" @click.stop="showUserPopup">
          <div class="dashboard-wrapper">
            <font-awesome-icon icon="fa fa-gauge-high" class="user-icon"/>
            <span><router-link :to="{name: 'Dashboard', params: {userid: uid}}">Dashboard</router-link></span>
            <font-awesome-icon icon="fa fa-angle-right" class="user-angle-right"/>
          </div>
          <div class="settings-wrapper">
            <font-awesome-icon icon="fa fa-cog" class="user-icon"/>
            <span><router-link to="/settings">Settings</router-link></span>
            <font-awesome-icon icon="fa fa-angle-right" class="user-angle-right"/>
          </div>  
          <div class="logout-wrapper">
            <font-awesome-icon icon="fa fa-sign-out" class="user-icon"/>
            <span @click="logout"><router-link to="/">Logout</router-link></span>
            <font-awesome-icon icon="fa fa-angle-right" class="user-angle-right"/>
          </div>
        </div>
      </div>
      
      <h3 class="subtitle">A world where snows never seem to cease</h3>
    </div>
</template>

<script lang="ts">
import Store from '@/store';

  export default {
    data() {
      return {
        popupVisible: false,
      }
    },
    methods: {
      showUserPopup() {
        this.popupVisible = true;
      },

      hideUserPopup() {
        this.popupVisible = false;
      },

      logout() {
        localStorage.removeItem('uid');
        localStorage.removeItem('name');
        localStorage.removeItem('avatar');
        this.returnToHome();
      },

      titleClick() {
        this.returnToHome();
      },

      returnToHome() {
        if (this.$router.currentRoute.value.name === 'Home') {
          this.$router.go(0);
        }
        else {
          this.$router.push('/');
        }
      },
    },
    computed: {
      uid() {
        return localStorage.getItem('uid');
      },
      name() {
        return localStorage.getItem('name');
      },
      avatar() {
        const avatar: string = localStorage.getItem('avatar')!;
        return avatar;
      },
    },
    watch: {
      //watch for bgColor change and update
      '$store.state.bgColor': () => {
        //dark
        if (Store.state.bgColor === '#181818') {
          document.documentElement.style.setProperty('--header-border-color', 'snow');
          document.documentElement.style.setProperty('--header-font-color', 'rgba(235, 235, 235, 0.64)');
          document.documentElement.style.setProperty('--user-popup-color', 'rgba(235, 235, 235, 0.64)');
        }
        //light
        else if (Store.state.bgColor === '#fffff') {
          document.documentElement.style.setProperty('--header-border-color', 'black');
          document.documentElement.style.setProperty('--header-font-color', 'rgba(25, 216, 216, 0.64)');
          document.documentElement.style.setProperty('--user-popup-color', '#2c3e50');
        }
      }
    },
    //call function on click
    mounted() {
      document.addEventListener("click", this.hideUserPopup);
      //dark
      if (Store.state.bgColor === '#181818') {
        document.documentElement.style.setProperty('--header-border-color', 'snow');
        document.documentElement.style.setProperty('--header-font-color', 'rgba(235, 235, 235, 0.64)');
        document.documentElement.style.setProperty('--user-popup-color', 'rgba(235, 235, 235, 0.64)');
      }
      //light
      else if (Store.state.bgColor === '#fffff') {
        document.documentElement.style.setProperty('--header-border-color', 'black');
        document.documentElement.style.setProperty('--header-font-color', 'rgba(25, 216, 216, 0.64)');
        document.documentElement.style.setProperty('--user-popup-color', '#2c3e50');
      }
    },
    beforeUnmount() {
      document.removeEventListener("click", this.hideUserPopup);
    }
  }
</script>

<style lang="scss">

:root {
  --header-border-color: snow;
  --header-font-color: rgba(235, 235, 235, 0.64);
  --user-popup-color: rgba(235, 235, 235, 0.64);
}

.header-container {
  border: 3px groove;
  border-radius: 8px;
  background: radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%);
  border-color: var(--header-border-color);
}

.title-container {
  display: flex;
  margin-left: 3.5rem;
  top: 1rem;
  width: 25%;
  cursor: pointer;
}

img[alt*="header-icon"] {
  top: 12px;
}

.title-wrapper {
  margin-left: 8px;
}

.title {
  font-weight: 500;
  font-size: 2.6rem;
  color: rgb(163, 206, 232);
}

.subtitle {
  font-size: 1.2rem;
  margin-bottom: 1rem;
  margin-top: 1rem;
  margin-left: 2rem;
  color: var(--header-font-color);
}

.discord-auth {
  position: absolute;
  height: 50%;
  bottom: 10px;
  right: 40px;
  border-style: ridge;
  border-color: azure;
  border-radius: 2px;
  background-color: rgb(85,57,204);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

#discord-icon {
  position: sticky;
  margin-left: 5px;
}

#discord-login {
  position: sticky;
  color: black;
  font-weight: bolder;
  font-size: 1rem;
  margin-right: 5px;
}

.user-wrapper {
  position: absolute;
  width: 17%; 
  height: 50%;
  bottom: -8px;
  right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-direction: row-reverse;
}

.name {
  font-size: 1rem;
  color: var(--header-font-color);
}


img[alt*="avatar"] {
  border-radius: 50%;
  width: 40px;
  height: 40px;
}

.user-popup {
  position: absolute;
  border: 3px double snow;
  top: 58px;
  border-radius: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  flex-direction: row-reverse;
  border-color: var(--header-border-color);
  color: var(--user-popup-color);
}

.user-popup > * {
  margin-right: 20px;
  width: 100%;
}

.user-popup > * > span {
  right: -20px;
}

.user-popup > * > .user-icon {
  left: 10px;
}

.user-popup > * > .user-angle-right {
  position: absolute; 
  right: -10px; 
  bottom: 4px;
}
 
@media (min-width: 1024px) {
  .game-title h1,
  .game-title h3 {
    text-align: left;
  }
}
</style>