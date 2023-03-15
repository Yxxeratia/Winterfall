<template>
    <!--<button @click="reDirectToHome">Redirect to Home</button>-->
</template>

<script lang="ts">
    export default {
        data() {
            return {
                name: '',
                avatar: '',
            }
        },
        async mounted() {
            const fragment = new URLSearchParams(window.location.hash.slice(1));
                const accessToken = fragment.get('access_token');
                const tokenType = fragment.get('token_type');

                if (!accessToken) {
                    window.location.href = '/';
                }

                const results = await fetch('https://discord.com/api/users/@me', {
                    headers: {
                        authorization: `${tokenType} ${accessToken}`,
                    }
                });

                const response = await results.json();
                //user's info
                let user = {username: null, discriminator: null, avatar: null, id: null};
                user = response;

                window.localStorage.setItem('uid', user.id!);
                window.localStorage.setItem('name', `${user.username}#${user.discriminator}`);
                window.localStorage.setItem('avatar', `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}`);

                //allows keeping of name and avatar in localStorage
                this.$router.push('/');
        }
}
    
</script>

<style scoped>

</style>