import html from "./app.html?raw";
import todoStore from "../store/todo.store";
import { renderTodos } from "./use-cases";


const ElementIDs = {
    TodosList: '.todo-list',
    NewTodoInput: '#new-todo-input',
}

/**
 * 
 * @param {String} elementId 
 */
export const App = (elementId) => {


    const displayTodos = () => {
        const todos = todoStore.getTodos(todoStore.getCurrentFilter());
        renderTodos(ElementIDs.TodosList, todos);

    }


    (() => {
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append(app);
        displayTodos();
    })();

    // References
    const newDescriptionInput = document.querySelector(ElementIDs.NewTodoInput);
    const todoListUL = document.querySelector(ElementIDs.TodosList);

    // Listener
    newDescriptionInput.addEventListener('keyup', (event) => {
        if (event.code!=='Enter' ) return;
        if (event.target.value.trim().length === 0) return;

        todoStore.addTodo(event.target.value);
        displayTodos();
        newDescriptionInput.value='';
    });

    todoListUL.addEventListener('click', (ev) => {
        const element = ev.target.closest('[data-id]');
        let todoId = element.getAttribute('data-id');
        if(ev.target.tagName !== 'BUTTON'){
            todoStore.toggleTodo(todoId);
            displayTodos();
        }
    })

}