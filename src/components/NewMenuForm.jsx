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
    <div className="mt-5 p-4 bg-white shadow rounded">
      <h2 className="text-xl font-semibold text-gray-700 mb-3">新規メニュー登録</h2>
      <form onSubmit={handleSubmit}>
        {/* メニュー名の入力欄 */}
        <input
          type="text"
          placeholder="メニュー名"
          value={inputName}
          onChange={(e) => setInputName(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring focus:border-blue-300"
        />
        <button type="submit" className="mt-2 bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600">
          登録
        </button>
      </form>
    </div>
  );
}

// コンポーネントをエクスポートします
export default NewMenuForm;
