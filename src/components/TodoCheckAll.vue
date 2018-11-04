<template>
    <div>
        <div>
            <!-- the checkbox will be checked when nothing is remaining -->
            <label for="">
                <input type="checkbox" :checked="!anyRemaining" 
                @change="allChecked"
                >
                Check All
            </label>
        </div>
    </div>
</template>

<script>
    export default {

        // props: {
        //     anyRemaining: {
        //         type: Boolean,
        //         required: true
        //     }
        // },
        //the prop above is replaced with computed propety, since we are getting our data from the store
        computed: {
            anyRemaining(){
                return this.$store.getters.anyRemaining
            }
        },
        methods: {
            allChecked(){
                // eventBus.$emit('checkAllChanged', this.anyRemaining)
                // this.$store.state.todos.forEach(todo => todo.completed = event.target.checked);
                //using mutation
                // this.$store.commit('checkAll', event.target.checked);
                //using actions
                this.$store.dispatch('checkAll', event.target.checked);

            }
        }
    }
</script>
