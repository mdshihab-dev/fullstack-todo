import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as todoApi from './todoApi'

export const createTodo = createAsyncThunk('todo/createTodo', async (data, thunkAPI) => {
    try {
        let res = await todoApi.createTodo(data)
        return res.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error?.response?.data)
    }
})
export const  getTodos = createAsyncThunk('auth/getTodos', async(_, thunkAPI)=>{
    try {
        let res = await todoApi.getTodos()
        return res.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error?.response?.data)
    }
})
export const  updateTodo = createAsyncThunk('auth/updateTodo', async({id, data}, thunkAPI)=>{
    try {
        let res = await todoApi.updateTodo(id, data)
        return res.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error?.response?.data)
    }
})
export const  deleteTodo = createAsyncThunk('auth/deleteTodo', async(id, thunkAPI)=>{
    try {
        let res = await todoApi.deleteTodo(id)
        return res.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error?.response?.data)
    }
})

export const todoSlice = createSlice({
  name: 'todo',
  initialState:{
    todos: [],
    loading: false,
    message: null,
    error: null
  },
  reducers: {},
  extraReducers: (builder)=>{
    builder.addCase(createTodo.pending, (state,action)=>{
        state.loading = true
    })
    .addCase(createTodo.fulfilled ,(state, action)=>{
        state.loading = false
        state.message = action.payload.message
    })
    .addCase(createTodo.rejected ,(state, action)=>{
        state.loading = false
        state.error = action.payload.error
    })
    .addCase(getTodos.fulfilled ,(state, action)=>{
        state.todos = action.payload.todos
    })
    .addCase(updateTodo.fulfilled ,(state, action)=>{
        state.message = action.payload.message
    })
    .addCase(deleteTodo.fulfilled ,(state, action)=>{
        state.message = action.payload.message
    })
 
}
})


export default todoSlice.reducer