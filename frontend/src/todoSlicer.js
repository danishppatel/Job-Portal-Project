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
                userEmail:action.payload.userEmail
            }
           state.todos = todo;
        },
        removeTodo:(state,action)=>{
            state.todos = state.todos.filter((x)=>{
              return ( x.id !== action.payload);
            })
        }
    }
});

export const  {addTodo,removeTodo} = todoSlicer.actions;

export default todoSlicer.reducer;