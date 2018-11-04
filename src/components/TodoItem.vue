<template>
        <div class="todo-item">
            <!-- Add the completed class if the todo is completed -->
        <input type="checkbox" v-model="completed" @change="doneEdit">
        <div 
            v-if="!editing"  
            class="todo-item-label"
            :class="{ completed : completed }"
            @dblclick="editTodo"
            >
                {{ title }}
        </div> 
            <input v-else  
            class="todo-item-edit" v-model="title"
                type="text"
                @blur="doneEdit"
                @keyup.enter="doneEdit"
                @keyup.esc="cancelEdit"
                v-focus>
        <!-- we need the index of the todo to remove  -->
        <div>
            <button @click="pluralize">Plural</button>
            <span class="remove-item" @click="removeTodo(todo.id)">
                &times;
            </span>
        </div>
    </div>
</template>

<script>
    export default {
        // props: ['todo'],
        props: {
            todo: {
                type: Object,
                required: true,
            },
            // index: {
            //     type: Number,
            //     required: true
            // },
            checkAll: {
                type: Boolean,
                required: true
            }
        },
         directives: {
            focus: {
                inserted: function(el){
                    el.focus()
                }
            }
        },

        data(){
            return {
                'id' : this.todo.id,
                'title': this.todo.title,
                'completed': this.todo.completed,
                'editing': this.todo.editing,
                'beforeEditCache': '',
            }
        },

        watch: {
            checkAll(){
            //     if(this.checkAll){
            //         this.completed = true
            //     }else{
            //         this.completed = this.todo.completed
            //     }
            // }

            this.completed = this.checkAll ? true : this.todo.completed
            }
        },

        created(){
            eventBus.$on('pluralize', this.handlePluralize)
        },
        beforeDestroy(){
            eventBus.$off('pluralize', this.handlePluralize)
        },

        methods: {
            //since we dont have access to the todos array, in the child component, we emit an event to the parent 
            removeTodo(id){
                //this custom event needs the "index" data
                // this.$emit('removedTodo', index)
                // eventBus.$emit('removedTodo', id)

                // const index = this.$store.state.todos.findIndex(item => item.id == id);
                // this.$store.state.todos.splice(index, 1) //we dont need the eventBus anymore

                // this.$store.commit('deleteTodo', id);
                this.$store.dispatch('deleteTodo', id);


            },

            editTodo(){
                // alert('hello');data
                this.beforeEditCache = this.title
                this.editing = true;
                // alert("hello")
            },
            doneEdit(){
                //if the user just erase everything, return back what was there before he started
                if(this.title.trim() == ''){
                this.title = this.beforeEditCache
            }
                this.editing = false;
                // this.$emit('finishedEdit', { //using prop_event_method
                // eventBus.$emit('finishedEdit', {   //using eventBus method
                //     'id': this.id,   
                //     'title': this.title,
                //     'editing': this.editing,
                //     'completed': this.completed
                // })

                // const index = this.$store.state.todos.findIndex(item => item.id == this.id); //using Vuex method
                // this.$store.state.todos.splice(index, 1, {
                //     'id': this.id,   
                //     'title': this.title,
                //     'editing': this.editing,
                //     'completed': this.completed
                // });

                // this.$store.commit('updateTodo', {
                this.$store.dispatch('updateTodo', {
                    'id': this.id,   
                    'title': this.title,
                    'editing': this.editing,
                    'completed': this.completed
                });
            },
            
            cancelEdit(){
                this.title = this.beforeEditCache
                this.editing = false
            },

            pluralize(){
                eventBus.$emit('pluralize')
            },
            handlePluralize(){
                this.title = this.title + 's'
                //to make the children in the TodoList also reflect this change we will emit the finishedEdit event below
                //  eventBus.$emit('finishedEdit', {
                //     'id': this.id,
                //     'title': this.title,
                //     'editing': this.editing,
                //     'completed': this.completed
                // })
                const index = this.$store.state.todos.findIndex(item => item.id == this.id); //using Vuex method
                this.$store.state.todos.splice(index, 1, {
                    'id': this.id,   
                    'title': this.title,
                    'editing': this.editing,
                    'completed': this.completed
                });
            }
        }

    }
</script>

