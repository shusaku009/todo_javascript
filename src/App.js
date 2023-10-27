import { render } from "./view/html-util.js";
import { TodoListView } from "./view/TodoListView.js";
import { TodoItemModel } from "./model/TodoItemModel.js";
import { TodoListModel } from "./model/TodoListModel.js";

export class App {
  #todoListView = new TodoListView();
  // 1. TodoListModelの初期化
  #todoListModel = new TodoListModel();

  /**
   * Todoを追加するときに呼ばれるリスナー関数
   * @param {string} title
   */
  handleAdd(title) {
    this.#todoListModel.addTodo(new TodoItemModel({ title, completed: false }));
  }

  /**
   * Todoの状態を更新した時に呼ばれるリスナー関数
   * @param {{ id:number, completed: boolean }}
   */
  handleUpdate({ id, completed }) {
    this.#todoListModel.updateTodo({ id, completed });
  }

  /**
   * Todoを削除したときに呼ばれるリスナー関数
   * @param {{ id: number }}
   */
  handleDelete({ id }) {
    this.#todoListModel.deleteTodo({ id });
  }

  mount() {
    const formElement = document.querySelector("#js-form");
    const inputElement = document.querySelector("#js-form-input");
    const todoItemCountElement = document.querySelector("#js-todo-count");
    const containerElement = document.querySelector("#js-todo-list");
    //2. TodoListModelの状態が更新されたら表示を更新する
    this.#todoListModel.onChange(() => {
      const todoItems = this.#todoListModel.getTodoItems();
      // todoItemsに対応するTotoListViewを作成する
      const todoListElement = this.#todoListView.createElement(todoItems, {
        // Todoアイテムを更新イベントを発生したときに呼ばれるリスナー関数
        onUpdateTodo: ({ id, completed }) => {
          this.#todoListModel.updateTodo({ id, completed });
        },
        // Todoアイテムが削除イベントを発生した時に呼ばれるリスナー関数
        onDeleteTodo: ({ id }) => {
          this.#todoListModel.deleteTodo({ id });
        }
      });
      render(todoListElement, containerElement);
      todoItemCountElement.textContent = `Todoアイテム数: ${this.#todoListModel.getTotalCount()}`;
    });
    // 3. フォームを送信したら、新しいTodoItemModelを追加する
    formElement.addEventListener("submit", (event) => {
      event.preventDefault();
      // 新しいTodoItemをTodoListへ追加する
      this.handleAdd(inputElement.value);
      inputElement.value = "";
    });
  }
}