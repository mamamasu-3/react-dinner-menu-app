// Reactライブラリをインポートします
import React, { useState } from 'react';

/**
 * メニュー編集フォームコンポーネント
 * @param {Object} editMenu - 編集対象のメニュー (id, name, likes)
 * @param {function} setEditMenu - 親のステートを変更して、編集フォームを閉じるため
 * @param {function} onUpdate - 親コンポーネントの "updateMenu" 関数
 */
function EditMenuForm({ editMenu, setEditMenu, onUpdate }) {
  // 編集フォーム用の入力ステートを用意します
  const [editName, setEditName] = useState(editMenu.name);

  // フォーム送信時の処理です
  const handleSubmit = (e) => {
    // デフォルト動作 (リロード) を防ぎます
    e.preventDefault();
    // メニュー名が未入力の場合はアラートを表示します
    if (!editName.trim()) {
      alert('メニュー名が未入力です');
      return;
    }
    // 親コンポーネントの更新関数を呼び出します
    onUpdate({ id: editMenu.id, name: editName });
  };

  // キャンセルボタン押下時の処理です
  const handleCancel = () => {
    // 親ステートを null にしてフォームを閉じます
    setEditMenu(null);
  };

  // 画面に表示する部分です
  return (
    <div className="mt-5 p-4 bg-white shadow rounded">
      <h2 className="text-xl font-semibold text-gray-700 mb-3">メニュー編集</h2>
      <form onSubmit={handleSubmit}>
        {/* メニュー名の入力欄 */}
        <input
          type="text"
          value={editName}
          onChange={(e) => setEditName(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring focus:border-green-300"
        />
        <button type="submit" className="mt-2 bg-green-500 text-white rounded px-4 py-2 hover:bg-green-600">
          更新
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="mt-2 ml-2 bg-red-500 text-white rounded px-4 py-2 hover:bg-red-600"
        >
          キャンセル
        </button>
      </form>
    </div>
  );
}

// コンポーネントをエクスポートします
export default EditMenuForm;
