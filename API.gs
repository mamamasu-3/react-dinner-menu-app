/**
 * getSheet
 * アクティブなスプレッドシートから、シート名「メニュー」を取得して返却します。
 * @return {GoogleAppsScript.Spreadsheet.Sheet} シートオブジェクト
 */
function getSheet() {
  // アクティブなスプレッドシートを取得
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  // シート名「メニュー」を取得
  const sheet = ss.getSheetByName('メニュー');
  // シートオブジェクトを返す
  return sheet;
}

/**
 * doGet
 * GETリクエストを受け取ったときに実行されます。
 * actionパラメータにより、メニュー一覧の取得 (list) を行います。
 * @param {Object} e - イベントパラメータ (リクエスト情報)
 * @return {ContentService.TextOutput} JSON形式のレスポンス
 */
function doGet(e) {
  // actionパラメータを取得
  const action = e.parameter.action;

  // actionが 'list' のときはメニュー一覧を返却
  if (action === 'list') {
    return listMenus();
  }

  // 無効なactionの場合はエラーを返す
  return ContentService
    .createTextOutput(JSON.stringify({ error: 'Invalid action' }))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * doPost
 * POSTリクエストを受け取ったときに実行されます。
 * actionパラメータに応じて、メニューの create / update / delete / like を行います。
 * @param {Object} e - イベントパラメータ (リクエスト情報、本文など)
 * @return {ContentService.TextOutput} JSON形式のレスポンス
 */
function doPost(e) {
  // actionパラメータを取得
  const action = e.parameter.action;

  // POSTされたJSONをパースしてdataオブジェクトを生成
  const data = JSON.parse(e.postData.contents);

  // actionに応じて各種操作を分岐
  switch (action) {
    case 'create':
      return createMenu(data);
    case 'update':
      return updateMenu(data);
    case 'delete':
      return deleteMenu(data);
    case 'like':
      return likeMenu(data);
    default:
      return ContentService
        .createTextOutput(JSON.stringify({ error: 'Invalid action' }))
        .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * listMenus
 * スプレッドシートにあるメニュー一覧を取得し、JSON形式で返します。
 * @return {ContentService.TextOutput} JSON形式のメニュー一覧
 */
function listMenus() {
  // シートを取得
  const sheet = getSheet();
  // シート全体のデータを2次元配列で取得
  const values = sheet.getDataRange().getValues();

  // 1行目はヘッダーのため、2行目以降のデータを処理
  const menus = [];
  for (let i = 1; i < values.length; i++) {
    const row = values[i];
    menus.push({
      id: row[0],
      name: row[1],
      description: row[2],
      likes: row[3]
    });
  }

  // JSON文字列としてレスポンス
  return ContentService
    .createTextOutput(JSON.stringify(menus))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * createMenu
 * 新しいメニューをスプレッドシートに追記し、結果を返します。
 * @param {Object} data - { name: string, description: string } を含むメニュー情報
 * @return {ContentService.TextOutput} JSON形式の登録結果
 */
function createMenu(data) {
  // シートを取得
  const sheet = getSheet();
  // 全データを取得
  const values = sheet.getDataRange().getValues();

  // 新たに割り当てるIDを決定 (既存IDの最大値 + 1)
  let newId = 1;
  if (values.length > 1) {
    const ids = values.slice(1).map(row => Number(row[0]));
    newId = Math.max(...ids) + 1;
  }

  // 新規行を末尾に追加 (ID, name, description, likes=0)
  sheet.appendRow([newId, data.name, data.description, 0]);

  // 結果を返す
  return ContentService
    .createTextOutput(JSON.stringify({ result: 'success', id: newId }))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * updateMenu
 * 指定されたIDのメニュー情報を更新します。
 * @param {Object} data - { id: number, name: string, description: string } を含むメニュー情報
 * @return {ContentService.TextOutput} JSON形式の更新結果
 */
function updateMenu(data) {
  // シートを取得
  const sheet = getSheet();
  // 全データを取得
  const values = sheet.getDataRange().getValues();

  // IDに一致する行を探して更新
  for (let i = 1; i < values.length; i++) {
    if (String(values[i][0]) === String(data.id)) {
      // 名前
      sheet.getRange(i + 1, 2).setValue(data.name);
      // 説明
      sheet.getRange(i + 1, 3).setValue(data.description);

      // 成功レスポンス
      return ContentService
        .createTextOutput(JSON.stringify({ result: 'success' }))
        .setMimeType(ContentService.MimeType.JSON);
    }
  }

  // 見つからない場合
  return ContentService
    .createTextOutput(JSON.stringify({ error: 'Menu not found' }))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * deleteMenu
 * 指定されたIDのメニューを削除します。
 * @param {Object} data - { id: number } を含むメニュー情報
 * @return {ContentService.TextOutput} JSON形式の削除結果
 */
function deleteMenu(data) {
  // シートを取得
  const sheet = getSheet();
  // 全データを取得
  const values = sheet.getDataRange().getValues();

  // IDに一致する行を探して削除
  for (let i = 1; i < values.length; i++) {
    if (String(values[i][0]) === String(data.id)) {
      // 行削除
      sheet.deleteRow(i + 1);
      return ContentService
        .createTextOutput(JSON.stringify({ result: 'success' }))
        .setMimeType(ContentService.MimeType.JSON);
    }
  }

  // 見つからない場合
  return ContentService
    .createTextOutput(JSON.stringify({ error: 'Menu not found' }))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * likeMenu
 * 指定されたIDのメニューのいいね数を1つ増やします。
 * @param {Object} data - { id: number } を含むメニュー情報
 * @return {ContentService.TextOutput} JSON形式の処理結果（いいね数）
 */
function likeMenu(data) {
  // シートを取得
  const sheet = getSheet();
  // 全データを取得
  const values = sheet.getDataRange().getValues();

  // IDに一致する行を探していいね数を+1
  for (let i = 1; i < values.length; i++) {
    if (String(values[i][0]) === String(data.id)) {
      // 現在のいいね数
      const currentLikes = Number(values[i][3]);
      // +1 した値をセット
      sheet.getRange(i + 1, 4).setValue(currentLikes + 1);
      // 結果を返す
      return ContentService
        .createTextOutput(JSON.stringify({ result: 'success', likes: currentLikes + 1 }))
        .setMimeType(ContentService.MimeType.JSON);
    }
  }

  // 見つからない場合
  return ContentService
    .createTextOutput(JSON.stringify({ error: 'Menu not found' }))
    .setMimeType(ContentService.MimeType.JSON);
}
