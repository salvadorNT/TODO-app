import { Todo } from "../todos/models/todo.model";

export const Filter = {
    All: 'all',
    Completed: 'Completed',
    Pending: 'Pending'
}
const state = {
    todos: [],
    filter: Filter.All,
}

const initStore = () => {
    loadStore();
    console.log('Init store 🥑');
}

const loadStore = () => {
    if (!localStorage.getItem('state')) console.log('no hay nada guardado');;

    const { todos = [], filter = Filter.All } = JSON.parse(localStorage.getItem('state')) || '';
    state.todos = todos;
    state.filter = filter;
}

const saveStateToLocalStorage = () => {
    localStorage.setItem('state', JSON.stringify(state));
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
    saveStateToLocalStorage();
}

/**
 * 
 * @param {String} todoId 
 */
const toggleTodo = (todoId) => {
    state.todos = state.todos.map(todo => {
        if (todo.id === todoId) {
            todo.done = !todo.done;
        }
        return todo
    });
    saveStateToLocalStorage();
}

/**
 * 
 * @param {String} todoId 
 */
const deleteTodo = (todoId) => {
    state.todos = state.todos.filter(todo => todo.id !== todoId);
    saveStateToLocalStorage();
}

const deleteCompleted = () => {
    state.todos = state.todos.filter(todo => !todo.done);
    saveStateToLocalStorage();
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
    saveStateToLocalStorage();
}

const getCurrentFilter = () => {
    return state.filter;
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