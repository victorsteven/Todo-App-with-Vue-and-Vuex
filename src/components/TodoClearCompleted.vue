<template>
    <div>
        <button v-if="showComp" @click="clearComp">Clear completed</button>

    </div>

</template>

<script>
    export default {

        name: 'todo-clear-completed',

        // props: {
        //     showComp: {
        //         type: Boolean,
        //         required: true
        //     }
        // },
        computed: {
            showComp(){
                return this.$store.getters.showComp
            }
        },

        
        methods: {
            clearComp(){
                // eventBus.$emit('ClearComponent')
                //leave the ones that are now completed
                // this.$store.state.todos = this.$store.state.todos.filter(todo => !todo.completed)
                //using mutators
                // this.$store.commit('clearCompleted')
                this.$store.dispatch('clearCompleted')

            }
        }
    }
</script>