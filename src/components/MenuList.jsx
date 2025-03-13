// Reactライブラリをインポートします
import React from 'react';

/**
 * メニュー一覧表示コンポーネント
 * @param {Array} menus - メニューの配列 (id, name, likes)
 * @param {function} onEdit - 編集ボタン押下時に、選択したメニューを親に渡す
 * @param {function} onDelete - 削除ボタン押下時に呼ぶ関数
 * @param {function} onLike - いいねボタン押下時に呼ぶ関数
 */
function MenuList({ menus, onEdit, onDelete, onLike }) {
  // 画面表示を行う部分です
  return (
    <div className="mt-5 p-4 bg-white shadow rounded">
      <h2 className="text-xl font-semibold text-gray-700 mb-3">メニュー一覧</h2>
      <ul className="divide-y divide-gray-200">
        {menus.map((menu) => (
          <li key={menu.id} className="py-2 flex items-center justify-between">
            {/* メニュー名といいね数を表示します */}
            <span>
              <strong>{menu.name}</strong> [いいね: {menu.likes}]
            </span>
            <div>
              {/* いいねボタン */}
              <button
                className="ml-2 bg-blue-500 text-white rounded px-3 py-1 hover:bg-blue-600"
                onClick={() => onLike(menu.id)}
              >
                いいね
              </button>
              {/* 編集ボタン */}
              <button
                className="ml-2 bg-yellow-500 text-white rounded px-3 py-1 hover:bg-yellow-600"
                onClick={() => onEdit(menu)}
              >
                編集
              </button>
              {/* 削除ボタン */}
              <button
                className="ml-2 bg-red-500 text-white rounded px-3 py-1 hover:bg-red-600"
                onClick={() => onDelete(menu.id)}
              >
                削除
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

// コンポーネントをエクスポートします
export default MenuList;
