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
    <div style={{ marginBottom: 30 }}>
      <h2>今日の夕飯は…？</h2>
      {randomMenu ? (
        <p>
          <strong>{randomMenu.name}</strong> - {randomMenu.description}
        </p>
      ) : (
        <p>メニューが登録されていません。</p>
      )}
      <button onClick={pickRandomMenu}>別の夕飯を提案する</button>
    </div>
  );
}

export default RandomMenuPicker;
