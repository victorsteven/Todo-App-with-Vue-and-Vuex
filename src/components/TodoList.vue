<template>
  <div>
      <input type="text" name="" class="todo-input" placeholder="what needs to be done" id="" v-model="newTodo" @keyup.enter = "addTodo">
        <!-- we get the index of the current todo in the array -->
        <transition-group name="fade" enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">
            <!-- the second guy passed in a prop is the one being iterated over -->
            <!-- without eventBus -->
            <!-- <todo-item 
                :todo="todo" 
                :index="index" 
                :checkAll="!anyRemaining"
                v-for="(todo, index) in todoFiltered" 
                :key="todo.id"
                @removedTodo="removeTodo" 
                @finishedEdit="finishedEdit"
            > -->
            <!-- with eventBus -->
            <todo-item 
                :todo="todo" 
                :checkAll="!anyRemaining"
                v-for="todo in todoFiltered" 
                :key="todo.id"
            >
            </todo-item>
        </transition-group>

        <div class="extra-container">
            <todo-check-all></todo-check-all>
            <todo-items-remaining></todo-items-remaining>
        </div>
        <div class="extra-container">
            <todo-filter></todo-filter>

            <div>
                <transition name="fade">
                    <!-- with eventBus -->
                    <!-- <todo-clear-completed :showComp ="showComp"></todo-clear-completed> -->
                    <!-- with Vuex -->
                    <todo-clear-completed></todo-clear-completed>

                </transition>
            </div>
        </div>
  </div>
</template>

<script>

import TodoItem from './TodoItem';
import TodoItemsRemaining from './TodoItemsRemaining';
import TodoCheckAll from './TodoCheckAll';
import TodoFilter from './TodoFilter';
import TodoClearCompleted from './TodoClearCompleted';




export default {
  name: 'todo-list',

  components: {
      TodoItem,
    TodoItemsRemaining, 
    TodoCheckAll, 
    TodoFilter, 
    TodoClearCompleted
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      newTodo: '',
      idForTodo: 3,
      //the two data below are global, so we move them to our store.js, because we are now using vuex
    //   filter: 'all',
    //   todos: [
    //       {
    //       'id': 1,
    //       'title' : 'Finish vue screencast',
    //       'completed': false,
    //       'editing': false
    //       },
    //       {
    //       'id': 2,
    //       'title' : 'Take all',
    //       'completed': false,
    //       'editing': false

    //       }
    //   ]
    }
  },
 
//Computed properties go to the store as "getters"
//unlike computed properties, getters take a parameter called "state"
  computed: {
      //THESE ARE MOVED TO 'GETTERS' IN OUR STORE
      //get our todos, filter them down to the ones that are not completed and calculate them
    //   remaining(){
    //     //   return this.$store.state.todos.filter(todo => !todo.completed).length;
    //     return this.$store.getters.remaining;
    //   },
      anyRemaining(){
        //   return this.remaining != 0
        return this.$store.getters.anyRemaining;
      },
      todoFiltered(){
        //   if(this.$store.state.filter == 'all'){
        //       return this.$store.state.todos
        //   }else if(this.$store.state.filter == 'active'){
        //       //active are todos not completed
        //       return this.$store.state.todos.filter(todo => !todo.completed)
        //   }else if(this.$store.state.filter == 'completed'){
        //       return this.$store.state.todos.filter(todo => todo.completed)
        //   }
        //   return this.$store.state.todos;
        return this.$store.getters.todoFiltered;
      },
    //   showComp(){
    //     //   return this.$store.state.todos.filter(todo => todo.completed).length > 0
    //     return this.$store.getters.showComp;
    //   }
  },

  created(){
    //   eventBus.$on('removedTodo', id => this.removeTodo(id));

    //   eventBus.$on('finishedEdit', data => this.finishedEdit(data));

    //   eventBus.$on('checkAllChanged', ch => this.checkAllTodos(ch));

    //   eventBus.$on('FilterChanged', filter => this.$store.state.filter = filter);

    //   eventBus.$on('ClearComponent', () => this.clearComp());

    },
    beforeDestroy(){
        // eventBus.$on('removedTodo');

        // eventBus.$off('finishedEdit');

        // eventBus.$off('checkAllChanged');

        // eventBus.$off('FilterChanged');

        // eventBus.$off('ClearComponent');
    },

  methods: {
      addTodo(){
      if(this.newTodo.trim().length == 0){
          return;
      }

        //we are pushing to the "todos" array directly, which is a bad practice. 
        //instead we will use mutators to modify the todos array:
        // this.$store.state.todos.push({
        //     id: this.idForTodo,
        //     title: this.newTodo,
        //     completed: false
        // });

        //using mutator
        // this.$store.commit('addedNew', {
        this.$store.dispatch('addedNew', {
            id: this.idForTodo,
            title: this.newTodo,
            // completed: false
        })
        this.newTodo = ''
        this.idForTodo++
      },
      
    //   removeTodo(id){
    //       //remove just one item and dont replace it with something else
    //     //lets first save the id inside and index const 
    //     const index = this.$store.state.todos.findIndex(item => item.id == id);
    //       this.$store.state.todos.splice(index, 1)
    //   },
      
    //   checkAllTodos(){
    //     //dont set "completed to true", this is because, if checked it cant be reversed, use the approach below
    //     this.$store.state.todos.forEach(todo => todo.completed = event.target.checked);
    //   },

    //we set all the items not completed in our todo
    //   clearComp(){
    //       this.$store.state.todos = this.$store.state.todos.filter(todo => !todo.completed)
    //   },

      //the "data" is gotten from our TodoItem component which have the index and the todo
      //we will pass the data original index and replace the todo content(one item) with data.todo gotten from our TodoItem component

      //This is now handled by Vuex
    //   finishedEdit(data){
    //       //old with bug
    //     //   this.$store.state.todos.splice(data.index, 1, data.todo);

    //     //lets first save the id inside and index const 
    //     const index = this.$store.state.todos.findIndex(item => item.id == data.id);
    //     this.$store.state.todos.splice(index, 1, data);
    //   }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

@import url("https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.0/animate.min.css");

    .todo-input {
        width: 100%;
        padding: 10px 18px;
        font-size: 18px;
        margin-bottom: 16px;

        &:focus{
            outline: 0;
        }
    }
    .todo-item{
        margin-bottom: 12px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        animation-duration: 0.3s;
    }
    .remove-item{
        cursor: pointer;
        margin-left: 14px;
        &:hover {
            color: black;
        }
    }

    .todo-item-edit{
        font-size: 24px;
        color: #2c3e50;
        margin-left: 12px;
        width: 100%;
        border: 1px solid #ccc;
        font-family: "Avenir", Helvetica, Arial, sans-serif;

        &:focus {
            outline: none;
        }
       
    }
     .completed{
        text-decoration: line-through;
        color: gray;
    }

    .extra-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 16px;
        border-top: 1px solid lightgray;
        padding-top: 14px;
        margin-bottom: 14px;
    }
    button{
        font-size: 14px;
        background-color: white;
        appearance: none;
    
        &:hover{
            background: lightgreen;
        }
        &:focus{
            outline: none;
        }
    }
    .active{
        background: lightgreen;
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }

    .fade-enter, .fade-leave-to {
        opacity: 0;

    }
</style>
