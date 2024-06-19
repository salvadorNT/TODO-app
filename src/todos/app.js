import html from "./app.html?raw";
import todoStore, { Filter } from "../store/todo.store";
import { renderPending, renderTodos } from "./use-cases";


const ElementIDs = {
    TodosList: '.todo-list',
    NewTodoInput: '#new-todo-input',
    ClearCompleted: '.clear-completed',
    TodoFilters: '.filtro',
    PendingCount: '#pending-count',
}

/**
 * 
 * @param {String} elementId 
 */
export const App = (elementId) => {


    const displayTodos = () => {
        const todos = todoStore.getTodos(todoStore.getCurrentFilter());
        renderTodos(ElementIDs.TodosList, todos);
        renderPending(ElementIDs.PendingCount);

    }


    (() => {
        todoStore.initStore();
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append(app);
        displayTodos();
    })();

    // References
    const newDescriptionInput = document.querySelector(ElementIDs.NewTodoInput);
    const todoListUL = document.querySelector(ElementIDs.TodosList);
    const clearCompletedButton = document.querySelector(ElementIDs.ClearCompleted);
    const filtersUL = document.querySelectorAll(ElementIDs.TodoFilters);

    // Listener
    newDescriptionInput.addEventListener('keyup', (event) => {
        if (event.keyCode !== 13) return;
        if (event.target.value.trim().length === 0) return;

        todoStore.addTodo(event.target.value);
        displayTodos();
        newDescriptionInput.value = '';
    });

    todoListUL.addEventListener('click', (ev) => {
        const element = ev.target.closest('[data-id]');
        let todoId = element.getAttribute('data-id');
        if (ev.target.tagName !== 'BUTTON') {
            todoStore.toggleTodo(todoId);
            displayTodos();
        }
        else {
            todoStore.deleteTodo(todoId);
            displayTodos();
        }
    });

    clearCompletedButton.addEventListener('click', () => {
        todoStore.deleteCompleted();
        displayTodos();
    });

    filtersUL.forEach(element => {

        element.addEventListener('click', (element) => {
            filtersUL.forEach(el => el.classList.remove('selected'));
            
            element.target.classList.add('selected');
            switch (element.target.text) {
                case 'Todos':
                    todoStore.setSelectedFilter(Filter.All);
                    todoStore.getTodos(Filter.All);
                    break;
                case 'Pendientes':
                    todoStore.setSelectedFilter(Filter.Pending);
                    todoStore.getTodos(Filter.Pending);
                    break;
                case 'Completados':
                    todoStore.setSelectedFilter(Filter.Completed);
                    todoStore.getTodos(Filter.Completed);
                    break;
                default:
                    break;
            }
            displayTodos();
        });
    });


}