// Reactライブラリをインポートします
import React, { useState, useEffect } from 'react';
// 分割したコンポーネントを読み込みます
import NewMenuForm from './components/NewMenuForm';
import EditMenuForm from './components/EditMenuForm';
import MenuList from './components/MenuList';
import RandomMenuPicker from './components/RandomMenuPicker';

// Appコンポーネントを定義します
function App() {
  // メニュー一覧を管理するステートを定義します (初期値は空配列)
  const [menus, setMenus] = useState([]);
  // 編集対象のメニューを管理するステートを定義します (初期値はnull)
  const [editMenu, setEditMenu] = useState(null);

  // Google Apps Script のウェブアプリURLを設定してください
  const API_URL = 'https://script.google.com/macros/s/AKfycbxaHIYnNK4mCjfmhiwhAxfpHuOYrDYZOpWEiMktlDbD5qDGeJTvtc7lnjnqw6CV6s31/exec';

  // コンポーネントの初回マウント時にメニューを取得します
  useEffect(() => {
    fetchMenus();
  }, []);

  // メニュー一覧を取得する非同期関数です
  const fetchMenus = async () => {
    try {
      // GETリクエストで ?action=list を呼び出します
      const response = await fetch(`${API_URL}?action=list`);
      // レスポンスをJSONとしてパースします
      const data = await response.json();
      // 取得したメニュー配列をステートに反映します
      setMenus(data);
    } catch (error) {
      console.error('メニュー一覧の取得に失敗:', error);
    }
  };

  // 新規メニューを登録する関数です
  const createMenu = async (newMenu) => {
    try {
      // ?action=create にPOSTします (JSON形式)
      await fetch(`${API_URL}?action=create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: JSON.stringify(newMenu),
      });
      // 登録後にメニュー一覧を再読み込みします
      fetchMenus();
    } catch (error) {
      console.error('メニューの登録に失敗:', error);
    }
  };

  // メニューを更新する関数です
  const updateMenu = async (updatedMenu) => {
    try {
      // ?action=update にPOSTします (JSON形式)
      await fetch(`${API_URL}?action=update`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: JSON.stringify(updatedMenu),
      });
      // 編集モードを解除します
      setEditMenu(null);
      // 一覧を再読み込みします
      fetchMenus();
    } catch (error) {
      console.error('メニューの更新に失敗:', error);
    }
  };

  // メニューを削除する関数です
  const deleteMenu = async (id) => {
    try {
      // ?action=delete にPOSTします (JSON形式)
      await fetch(`${API_URL}?action=delete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: JSON.stringify({ id }),
      });
      // 一覧を再読み込みします
      fetchMenus();
    } catch (error) {
      console.error('メニューの削除に失敗:', error);
    }
  };

  // いいねを増やす関数です
  const likeMenu = async (id) => {
    try {
      // ?action=like にPOSTします (JSON形式)
      await fetch(`${API_URL}?action=like`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: JSON.stringify({ id }),
      });
      // 一覧を再読み込みします
      fetchMenus();
    } catch (error) {
      console.error('いいねに失敗:', error);
    }
  };

  // 画面表示を行う部分です
  return (
    <div className="p-5 bg-gray-50 min-h-screen">
      {/* タイトル */}
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        メニュー管理アプリ
      </h1>

      {/* ランダムメニュー表示コンポーネント */}
      <RandomMenuPicker menus={menus} />

      {/* 新規登録フォームコンポーネント */}
      <NewMenuForm onCreate={createMenu} />

      {/* メニュー一覧表示コンポーネント */}
      <MenuList
        menus={menus}
        onEdit={setEditMenu}   // 編集対象を設定する
        onDelete={deleteMenu}  // 削除処理
        onLike={likeMenu}      // いいね処理
      />

      {/* 編集フォーム (editMenu が選択されている場合のみ表示) */}
      {editMenu && (
        <EditMenuForm
          editMenu={editMenu}
          setEditMenu={setEditMenu}
          onUpdate={updateMenu}
        />
      )}
    </div>
  );
}

// 他のファイルで使えるようにエクスポートします
export default App;
