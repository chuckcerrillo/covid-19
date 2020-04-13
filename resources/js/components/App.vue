<template>
    <div class="flex flex-col flex-1 h-screen overflow-y-hidden">
        <Nav v-on:showAbout="showAbout" />
        <About
            v-show="about"
            v-on:showAbout="showAbout"
            class="fixed top-0 right-0 bottom-0 left-0 z-20"
        />
        <router-view></router-view>
    </div>
</template>

<script>
    import Nav from './Nav';
    import About from "../views/About";
    export default {
        name: "App",
        data()
        {
            return {
                about: false,
            }
        },
        components: {
            Nav,
            About
        },
        methods: {
            showAbout()
            {
                this.about = !this.about;
            }
        }
    }
</script>

<style scoped>

</style>
