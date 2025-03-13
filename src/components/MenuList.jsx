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
    <div style={{ marginTop: 20 }}>
      <h2>メニュー一覧</h2>
      <ul>
        {menus.map((menu) => (
          <li key={menu.id} style={{ marginBottom: 10 }}>
            {/* メニュー名といいね数を表示します */}
            <strong>{menu.name}</strong> [いいね: {menu.likes}]
            {/* いいねボタン */}
            <button style={{ marginLeft: 5 }} onClick={() => onLike(menu.id)}>
              いいね
            </button>
            {/* 編集ボタン */}
            <button style={{ marginLeft: 5 }} onClick={() => onEdit(menu)}>
              編集
            </button>
            {/* 削除ボタン */}
            <button style={{ marginLeft: 5 }} onClick={() => onDelete(menu.id)}>
              削除
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

// コンポーネントをエクスポートします
export default MenuList;
