import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
      filter: 'all',
      todos: [
          {
          'id': 1,
          'title' : 'Finish vue screencast',
          'completed': false,
          'editing': false
          },
          {
          'id': 2,
          'title' : 'Take all',
          'completed': false,
          'editing': false

          }
      ]
    },
//if one getter is clling another one, we pass in  "getters" as second parameter 
    getters: {
        remaining(state){
            return state.todos.filter(todo => !todo.completed).length;
        },
        anyRemaining(state, getters){
            return getters.remaining != 0
        },
        todoFiltered(state){
            if(state.filter == 'all'){
                return state.todos
            }else if(state.filter == 'active'){
                //active are todos not completed
                return state.todos.filter(todo => !todo.completed)
            }else if(state.filter == 'completed'){
                return state.todos.filter(todo => todo.completed)
            }
            return state.todos;
        },
        showComp(state){
            return state.todos.filter(todo => todo.completed).length > 0
        }
    },
    mutations: {
        //this will receive the payload defined in the 
        addedNew(state, todo){
            // state.todos.push(todo)
            state.todos.push({
                id: todo.id,
                title: todo.title,
                completed: false,
                editing: false
            })
        },
        
        updateFilter(state, filter){
            state.filter = filter
        },
        checkAll(state, checked){
            state.todos.forEach(todo => todo.completed = checked);
        },
        deleteTodo(state, id){
            const index = state.todos.findIndex(item => item.id == id);
            state.todos.splice(index, 1) //we dont need the eventBus anymore
        },
        updateTodo(state, todo){
            const index = state.todos.findIndex(item => item.id == todo.id);
            state.todos.splice(index, 1, {
                'id': todo.id,   
                'title': todo.title,
                'editing': todo.editing,
                'completed': todo.completed
            });
        },
        clearCompleted(state){
            state.todos = state.todos.filter(todo => !todo.completed)
        },
    },

    //When we are making an ajax request, we call our mutations through actions
    //ie we are doing async code
    actions: {
        //this will receive the payload defined in the 
        addedNew(context, todo){
            //now lets simulate an ajax request using setTimeout
            setTimeout(() => {
               context.commit('addedNew', todo)
            }, 1000)
        },
        
        updateFilter(context, filter){
            setTimeout(() => {
                context.commit('updateFilter', filter)
            }, 1000)

        },
        checkAll(context, checked){
            setTimeout(() => {
                context.commit('checkAll', checked)
            }, 1000)

        },
        deleteTodo(context, id){
            setTimeout(() => {
                context.commit('deleteTodo', id)
            }, 1000)

        },
        updateTodo(context, todo){
            setTimeout(() => {
                context.commit('updateTodo', todo)
            }, 1000)

        },
        // clearCompleted(context){
        //     context.commit('clearCompleted')
        // }
        //here we are using destructuring
        clearCompleted({commit}){
            setTimeout(() => {
                commit('clearCompleted')
            }, 1000)

        }
    }
})