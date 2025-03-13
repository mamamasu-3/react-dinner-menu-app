// Reactライブラリをインポートします
import React, { useState } from 'react';

/**
 * 新規メニュー登録フォームコンポーネント
 * @param {function} onCreate - 親コンポーネントが持つメニュー作成関数
 */
function NewMenuForm({ onCreate }) {
  // 入力中のメニュー (nameのみ) を管理するステートを用意します
  const [inputName, setInputName] = useState('');

  // フォーム送信時に呼ばれる関数です
  const handleSubmit = (e) => {
    // デフォルトのページ遷移を防ぎます
    e.preventDefault();
    // 名前が未入力の場合、アラート表示して終了します
    if (!inputName.trim()) {
      alert('メニュー名を入力してください');
      return;
    }
    // 親コンポーネントのonCreateを呼び出し、新規メニューを作成します
    onCreate({ name: inputName });
    // 入力欄をクリアします
    setInputName('');
  };

  // 画面に表示する部分です
  return (
    <div style={{ marginTop: 20 }}>
      <h2>新規メニュー登録</h2>
      <form onSubmit={handleSubmit}>
        {/* メニュー名の入力欄 */}
        <input
          type="text"
          placeholder="メニュー名"
          value={inputName}
          onChange={(e) => setInputName(e.target.value)}
        />
        <button type="submit">登録</button>
      </form>
    </div>
  );
}

// コンポーネントをエクスポートします
export default NewMenuForm;
