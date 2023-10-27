import { element } from "./html-util.js";

export class TodoItemView{
  /**
   * `todoItem`に対応するTodoアイテムのHTML要素を作成した返す
   * @param {TodoItemModel} todoItem
   * @param {function(id:number, completed: boolean)} onUpdateTodo チェックボックスの更新イベントリスナー
   * @param {function({id:number})} onDeleteTodo 削除ボタンのイベントリスナー
   * @returns {Element}
   */
  createElement(todoItem, { onUpdateTodo, onDeleteTodo }) {
    const todoItemElement = todoItem.completed
    ? element`<li><input type="checkbox" class="checkbox" checked>
                          <s>${item.title}</s>
                          <button class="delete">x</button>
                        </li>`
    : element`<li><input type="checkbox" class="checkbox">
                          ${item.title}
                          <button class="delete">x</button>
                        </li>`;
    const inputCheckboxElement = todoItemElement.querySelector(".checkbox");
    inputCheckboxElement.addEventListener("change", () => {
      //指定したTodoアイテムの完了状態を反転させる
      onUpdateTodo({
        id: item.id,
        completed: !item.completed
      });
    });
    // 削除ボタン(x)がクリックされたときにTodoListModelからアイテムを削除する
    const deleteButtonElement = todoItemElement.querySelector(".delete");
    deleteButtonElement.addEventListener("click", () => {
        onDeleteTodo({
            id: item.id
        });
    });
    // 作成したTodoアイテムのHTML要素を返す
    return todoItemElement;
  }
}