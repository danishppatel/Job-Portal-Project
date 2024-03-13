import {createSlice, nanoid} from'@reduxjs/toolkit'

let initialState = {
    todos:{id:1,userEmail:'',mode:''}
}
let todoSlicer = createSlice({
    name:'todo',
    initialState,
    reducers:{
        addTodo:(state,action)=>{
            let todo = {
                id : nanoid(),
                userEmail:action.payload.userEmail,
                mode:action.payload.mode
            }
           state.todos = todo;
        },
        removeTodo:(state,action)=>{
            state.todos.userEmail='',
            state.todos.mode=''
        }
    }
});

export const  {addTodo,removeTodo} = todoSlicer.actions;

export default todoSlicer.reducer;