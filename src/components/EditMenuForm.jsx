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
    <div style={{ marginTop: 20 }}>
      <h2>メニュー編集</h2>
      <form onSubmit={handleSubmit}>
        {/* メニュー名の入力欄 */}
        <input
          type="text"
          value={editName}
          onChange={(e) => setEditName(e.target.value)}
        />
        <button type="submit">更新</button>
        <button type="button" onClick={handleCancel}>
          キャンセル
        </button>
      </form>
    </div>
  );
}

// コンポーネントをエクスポートします
export default EditMenuForm;
