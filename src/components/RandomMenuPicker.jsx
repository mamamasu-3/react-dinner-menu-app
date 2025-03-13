import React, { useState, useEffect } from 'react';

/**
 * ランダムにメニューを1つピックアップして表示するコンポーネント
 * @param {Array} menus - 登録済みメニューの配列
 */
function RandomMenuPicker({ menus }) {
  const [randomMenu, setRandomMenu] = useState(null);

  // menusが更新されるたびにランダム抽選
  useEffect(() => {
    pickRandomMenu();
  }, [menus]);

  // ランダムに1件選ぶ関数
  const pickRandomMenu = () => {
    if (!menus || menus.length === 0) {
      setRandomMenu(null);
      return;
    }
    const randomIndex = Math.floor(Math.random() * menus.length);
    setRandomMenu(menus[randomIndex]);
  };

  return (
    <div className="mb-8 p-4 bg-white shadow rounded">
      <h2 className="text-xl font-semibold text-gray-700 mb-3">今日の夕飯は…？</h2>
      {randomMenu ? (
        <p>
          <strong>{randomMenu.name}</strong>
        </p>
      ) : (
        <p>メニューが登録されていません。</p>
      )}
      <button
        onClick={pickRandomMenu}
        className="mt-4 bg-indigo-500 text-white font-bold py-2 px-4 rounded hover:bg-indigo-600"
      >
        別の夕飯を提案する
      </button>
    </div>
  );
}

export default RandomMenuPicker;
