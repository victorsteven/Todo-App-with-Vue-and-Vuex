<template>
    <div>
        <!-- the active class has a green color. when we click on a button the active class goes to that button -->
        <button
            :class="{active: filter == 'all'}"
            @click="changeFilter('all')"
        >
            All
        </button>
        <button
            :class="{active: filter == 'active'}"
            @click="changeFilter('active')"
        >
            Active
        </button>
        <!-- remember we have defined a completed class above -->
        <button
            :class="{active: filter =='completed'}"
           @click="changeFilter('completed')"
        >
            Completed
        </button>
    </div>
</template>

<script>
    export default {
        // data(){
        //     return {
        //         'filter': 'all',
        //     }
        // },
        //using Vuex now, we use computed property
        computed: {
            filter(){
                return this.$store.state.filter;
            }
        },
        methods: {
            // updating the filter
            changeFilter(filter){
                //with eventBus
                // this.filter = filter 
                // eventBus.$emit("FilterChanged", filter)
                //with Vuex without mutation
                // this.$store.state.filter = filter
                //with mutation
                // this.$store.commit('updateFilter', filter);
                this.$store.dispatch('updateFilter', filter);

            }
        }

    }
</script>
