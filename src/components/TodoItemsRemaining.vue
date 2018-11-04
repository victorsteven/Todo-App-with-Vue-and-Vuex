<template>
    <dir>
        <div>{{ remaining }} items left</div>

    </dir>
</template>

<script>
    export default {
        computed: {
            remaining(){
                return this.$store.getters.remaining;
            }
        }
    }
</script>

