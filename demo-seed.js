'use strict';
/* デモ用サンプルデータ（このファイルは demo.html からのみ読み込まれます） */
function seedDemo(){
  const T = todayStr();
  const D = n => addDays(T, n);
  const NB = nextBusinessDay(T);
  let seq = 0;
  const mk = o => Object.assign({
    id: 'demo' + (++seq),
    due: null, priority: '', status: 'todo', doneDate: null,
    assignee: '杉信', requester: '杉信', parentId: null, memo: '',
    createdAt: nowIso(), updatedAt: nowIso(), deleted: false
  }, o);

  const list = [];
  // ===== 案件1: 新型機能門柱 =====
  const p1 = mk({ title: '新型機能門柱', memo: '2026年秋 発売予定' });
  list.push(p1);
  const c11 = mk({ title: 'カタログ入稿', parentId: p1.id, startDate: D(-7), due: D(14), status: 'doing', assignee: '杉信', priority: 1 });
  const c12 = mk({ title: 'DR・図面一式', parentId: p1.id, startDate: D(-3), due: D(7), assignee: '中河', priority: 0, memo: '本体・梱包・製造指示書' });
  const c13 = mk({ title: '金型見積回答の確認', parentId: p1.id, due: D(-2), assignee: '大森', memo: '回答期限超過。至急確認' });
  const c14 = mk({ title: '社内レビュー会の準備', parentId: p1.id, startDate: D(-1), due: T, status: 'doing', assignee: '杉信' });
  const c15 = mk({ title: '量産試作の手配', parentId: p1.id, startDate: D(21), due: D(30), assignee: '井上' });
  list.push(c11, c12, c13, c14, c15);
  // カタログ入稿のチェックリスト
  list.push(
    mk({ title: '撮影依頼', parentId: c11.id, assignee: '椿', status: 'done', doneDate: D(-3) }),
    mk({ title: '商品説明文の作成', parentId: c11.id, assignee: '杉信' }),
    mk({ title: '価格表の提出', parentId: c11.id, assignee: '大森' })
  );
  // DRのチェックリスト
  list.push(
    mk({ title: '本体図面', parentId: c12.id, assignee: '中河', status: 'done', doneDate: D(-1) }),
    mk({ title: '梱包図面', parentId: c12.id, assignee: '中河', status: 'doing' }),
    mk({ title: '製造指示書', parentId: c12.id, assignee: '大森' })
  );

  // ===== 案件2: 樹脂グレーチング開発 =====
  const p2 = mk({ title: '樹脂グレーチング開発', assignee: '椿' });
  list.push(p2);
  const c21 = mk({ title: '工場見学の段取り', parentId: p2.id, due: NB, status: 'doing', assignee: '大森' });
  const c22 = mk({ title: 'カタログ掲載準備', parentId: p2.id, startDate: D(7), due: D(21), assignee: '椿' });
  const c23 = mk({ title: '強度試験レポート', parentId: p2.id, startDate: D(-8), due: D(-1), assignee: '井上', status: 'done', doneDate: D(-1) });
  list.push(c21, c22, c23);
  list.push(
    mk({ title: 'ロイヤリティ条件の交渉', parentId: c22.id, assignee: '杉信' }),
    mk({ title: 'カタログ校正', parentId: c22.id, assignee: '椿' })
  );

  // ===== 案件3: オンリーワン価格改定 =====
  const p3 = mk({ title: 'オンリーワン価格改定', assignee: '中河' });
  list.push(p3);
  list.push(
    mk({ title: '価格改定書ドラフト', parentId: p3.id, startDate: T, due: D(5), status: 'doing', assignee: '中河', priority: 2 }),
    mk({ title: '得意先向け案内文', parentId: p3.id, startDate: D(5), due: D(12), assignee: '杉信' }),
    mk({ title: '旧価格在庫の確認', parentId: p3.id, due: D(-1), assignee: '井上', memo: '倉庫の棚卸しと合わせて' })
  );

  // ===== 個別タスク =====
  list.push(
    mk({ title: '出張の宿手配', due: D(3), assignee: '杉信', memo: '2名分' }),
    mk({ title: '経費精算の提出', due: T, assignee: '大森' }),
    mk({ title: 'プロジェクター修理の手配', assignee: '井上' }),
    mk({ title: '月次売上まとめ', assignee: '中河', status: 'done', doneDate: T })
  );

  tasks = list;
  saveLocal();
}
function resetDemo(){
  if(!confirm('デモデータを初期状態に戻しますか？')) return;
  ['ttdemo_tasks','ttdemo_cfg','ttdemo_settings','ttdemo_me','ttdemo_seen','ttdemo_members','ttdemo_collapsed','ttdemo_board'].forEach(k => localStorage.removeItem(k));
  tasks = [];
  me = '';
  currentBoard = '__single';
  memberFilter = '';
  members = { list: DEFAULT_MEMBERS.slice(), updatedAt: null };
  seedDemo();
  render();
  showToast('🔄 デモデータをリセットしました');
}
// 初回アクセス時に自動シード
if(tasks.filter(t => !t.deleted).length === 0){
  seedDemo();
  currentBoard = tasks[0].id; // 最初の案件ボードを開く
  render();
}
