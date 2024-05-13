import { Todo } from "../todos/models/todo.model";

const Filter = {
    All: 'all',
    Completed: 'Completed',
    Pending: 'Pending'
}
const state = {
    todos: [
        new Todo('Piedra del alma'),
        new Todo('Piedra del tiempo'),
        new Todo('Piedra del infinito')
    ],
    filter: Filter.All,
}

const initStore = () => {
    console.log(state);
    console.log('Init store 🥑');
}

const loadStore = () => {
    throw new Error('Not implemented');
}

const getTodos = (filter = Filter.All) => {
    switch (filter) {
        case Filter.All:
            return state.todos;
        case Filter.Completed:
            return state.todos.filter(todo => todo.done);
        case Filter.Pending:
            return state.todos.filter(todo => !todo.done);
        default:
            throw new Error(`Option ${filter} is not valid.`);
    }
}

/**
 * 
 * @param {String} description 
 */
const addTodo = (description) => {
    if (!description) throw new Error('description is required');
    state.todos.push(new Todo(description));
}

/**
 * 
 * @param {String} todoId 
 */
const toggleTodo = (todoId) => {
    state.todos = state.todos.map( todo => {
        if (todo.id === todoId) {
            todo.done = !todo.done;
        }
        return todo
    });
}

/**
 * 
 * @param {String} todoId 
 */
const deleteTodo = (todoId) => {
    state.todos = state.todos.filter(todo => todo.id !== todoId);
}

const deleteCompleted = () => {
    state.todos = state.todos.filter(todo => !todo.done);
}

/**
 * 
 * @param {Filter} newFilter 
 */
const setSelectedFilter = (newFilter = Filter.All) => {
    if (!Object.values(Filter).includes(newFilter)) {
        throw new Error(`Option ${newFilter} is not valid.`);
    }
    state.filter = newFilter;
}

const getCurrentFilter = () => {
    throw new Error('Not implemented');
}

export default {
    addTodo,
    deleteCompleted,
    deleteTodo,
    getCurrentFilter,
    initStore,
    loadStore,
    setSelectedFilter,
    toggleTodo,
    getTodos,
}