// ============================================================
// Chatwork ルーム設計テンプレート
// smb-structure-mapping の10組織パターンをベースに構成
// ============================================================

const ICON_OPTIONS = [
  { id: 'group',     emoji: '👥', label: 'グループ' },
  { id: 'check',     emoji: '✅', label: 'チェック' },
  { id: 'document',  emoji: '📄', label: 'ドキュメント' },
  { id: 'meeting',   emoji: '🤝', label: 'ミーティング' },
  { id: 'event',     emoji: '📅', label: 'イベント' },
  { id: 'project',   emoji: '📊', label: 'プロジェクト' },
  { id: 'business',  emoji: '💼', label: 'ビジネス' },
  { id: 'study',     emoji: '📚', label: '勉強' },
  { id: 'security',  emoji: '🔒', label: 'セキュリティ' },
  { id: 'star',      emoji: '⭐', label: 'スター' },
  { id: 'idea',      emoji: '💡', label: 'アイデア' },
  { id: 'heart',     emoji: '❤️', label: 'ハート' },
  { id: 'magicwand', emoji: '🪄', label: 'マジック' },
  { id: 'beer',      emoji: '🍺', label: 'ビール' },
  { id: 'music',     emoji: '🎵', label: 'ミュージック' },
  { id: 'sports',    emoji: '⚽', label: 'スポーツ' },
  { id: 'travel',    emoji: '✈️', label: 'トラベル' },
];

// 規模別スケーリング: どのカテゴリを含めるか
const SIZE_SCALE = {
  'micro':  { label: '1-10名',   maxRooms: 8,  includeDeptRooms: false, includeProject: false, includeCross: false },
  'small':  { label: '11-30名',  maxRooms: 15, includeDeptRooms: true,  includeProject: true,  includeCross: false },
  'medium': { label: '31-100名', maxRooms: 25, includeDeptRooms: true,  includeProject: true,  includeCross: true },
  'large':  { label: '100名以上', maxRooms: 35, includeDeptRooms: true,  includeProject: true,  includeCross: true },
};

// ============================================================
// 業種テンプレート定義
// ============================================================

const INDUSTRY_TEMPLATES = {

  // -------------------------------------------------------
  // 1. 営業主体型（IT/SaaS、広告代理店、保険代理店等）
  // -------------------------------------------------------
  sales_centric: {
    label: '営業主体型',
    subtitle: 'IT/SaaS・広告代理店・人材紹介・保険代理店など',
    description: '営業活動が中心。案件管理・進捗共有・顧客対応がキーポイント。',
    suggestedDepts: ['営業部', '開発部', 'CS部', 'マーケティング部', '管理部'],
    useCases: ['案件進捗共有', '顧客対応', 'チーム連携', '日報・週報'],
    categories: [
      {
        name: '全社',
        rooms: [
          { name: '【全社】連絡・お知らせ', icon: 'business', description: '全社員への連絡事項・お知らせ', archetype: 'company_announce' },
          { name: '【全社】雑談・つぶやき', icon: 'beer', description: '業務外のカジュアルなコミュニケーション', archetype: 'casual' },
          { name: '【全社】日報', icon: 'check', description: '全社員の日報投稿', archetype: 'daily_report' },
        ]
      },
      {
        name: '経営・管理',
        rooms: [
          { name: '【経営】役員連絡', icon: 'security', description: '経営層の意思決定・共有', archetype: 'management' },
          { name: '【管理】総務・経理', icon: 'document', description: '経費精算・契約管理・総務連絡', archetype: 'admin_general' },
        ]
      },
      {
        name: '部門別',
        dynamic: true,
        roomTemplates: [
          { nameTemplate: '【{dept}】', icon: 'group', description: '{dept}の業務連絡・情報共有', archetype: 'department' },
        ]
      },
      {
        name: '案件・プロジェクト',
        requiresProject: true,
        rooms: [
          { name: '【案件】A社 導入プロジェクト', icon: 'project', description: '個別案件の進捗管理', archetype: 'project_deal' },
          { name: '【案件】B社 リニューアル提案', icon: 'project', description: '提案中案件の情報共有', archetype: 'project_deal' },
          { name: '【PJ】新サービス企画', icon: 'idea', description: '社内プロジェクト', archetype: 'project_internal' },
        ]
      },
      {
        name: '横断・ナレッジ',
        requiresCross: true,
        rooms: [
          { name: '【共有】受注・成功事例', icon: 'star', description: '成功事例・ナレッジ共有', archetype: 'knowledge' },
          { name: '【共有】競合情報', icon: 'study', description: '競合に関する情報収集・共有', archetype: 'knowledge' },
        ]
      },
    ]
  },

  // -------------------------------------------------------
  // 2. 医療・福祉管理型
  // -------------------------------------------------------
  medical_welfare: {
    label: '医療・福祉管理型',
    subtitle: 'クリニック・介護施設・歯科医院・動物病院など',
    description: '専門職がマネジメントも兼務。記録→請求の月末集中が課題。',
    suggestedDepts: ['診療部', '看護部', '介護部', '事務部', 'リハビリ部'],
    useCases: ['申し送り', 'シフト管理', '患者/利用者情報', '感染対策'],
    categories: [
      {
        name: '全体',
        rooms: [
          { name: '【全体】連絡・お知らせ', icon: 'business', description: '施設全体への連絡', archetype: 'company_announce' },
          { name: '【全体】雑談', icon: 'beer', description: 'スタッフ間のコミュニケーション', archetype: 'casual' },
          { name: '【全体】シフト連絡', icon: 'event', description: 'シフト変更・欠勤連絡', archetype: 'shift' },
        ]
      },
      {
        name: '管理',
        rooms: [
          { name: '【管理】経営・運営会議', icon: 'security', description: '経営判断・運営方針', archetype: 'management' },
          { name: '【管理】事務・請求', icon: 'document', description: 'レセプト・請求・経理', archetype: 'admin_billing' },
        ]
      },
      {
        name: '部門別',
        dynamic: true,
        roomTemplates: [
          { nameTemplate: '【{dept}】', icon: 'group', description: '{dept}の業務連絡', archetype: 'department' },
          { nameTemplate: '【{dept}】申し送り', icon: 'check', description: '{dept}の申し送り・引き継ぎ', archetype: 'handover' },
        ]
      },
      {
        name: '専門',
        requiresProject: true,
        rooms: [
          { name: '【医療安全】インシデント報告', icon: 'security', description: 'インシデント・アクシデント報告', archetype: 'incident' },
          { name: '【感染対策】委員会', icon: 'heart', description: '感染対策の情報共有', archetype: 'committee' },
          { name: '【研修】勉強会・カンファレンス', icon: 'study', description: '院内研修・症例検討', archetype: 'study_session' },
        ]
      },
    ]
  },

  // -------------------------------------------------------
  // 3. 店舗・拠点型（美容室、飲食店、ホテル等）
  // -------------------------------------------------------
  store_based: {
    label: '店舗・拠点型',
    subtitle: '美容室・飲食店・ホテル・小売チェーンなど',
    description: '店舗単位の運営。閉店後に事務作業が集中、シフト間の引き継ぎが課題。',
    suggestedDepts: ['本部', '店舗A', '店舗B', '店舗C'],
    useCases: ['店舗間連絡', 'シフト管理', '売上報告', 'クレーム対応'],
    categories: [
      {
        name: '全社',
        rooms: [
          { name: '【全社】連絡・お知らせ', icon: 'business', description: '全店舗への連絡', archetype: 'company_announce' },
          { name: '【全社】雑談', icon: 'beer', description: 'スタッフ間交流', archetype: 'casual' },
          { name: '【本部】経営・戦略', icon: 'security', description: '経営層・本部の意思決定', archetype: 'management' },
        ]
      },
      {
        name: '店舗別',
        dynamic: true,
        roomTemplates: [
          { nameTemplate: '【{dept}】', icon: 'group', description: '{dept}の業務連絡・日報', archetype: 'store_ops' },
        ]
      },
      {
        name: '業務別',
        rooms: [
          { name: '【業務】シフト管理', icon: 'event', description: 'シフト調整・欠勤連絡', archetype: 'shift' },
          { name: '【業務】売上報告', icon: 'check', description: '日次・週次の売上共有', archetype: 'sales_report' },
          { name: '【業務】在庫・発注', icon: 'document', description: '在庫管理・発注連絡', archetype: 'inventory' },
        ]
      },
      {
        name: '改善・ナレッジ',
        requiresProject: true,
        rooms: [
          { name: '【改善】クレーム・CS対応', icon: 'star', description: '顧客対応・クレーム共有', archetype: 'customer_issue' },
          { name: '【共有】好事例・ナレッジ', icon: 'idea', description: 'うまくいった取り組みの共有', archetype: 'knowledge' },
        ]
      },
    ]
  },

  // -------------------------------------------------------
  // 4. コンサルティング・サービス型
  // -------------------------------------------------------
  consulting: {
    label: 'コンサルティング・サービス型',
    subtitle: '経営コンサル・研修会社・語学スクール・広告制作など',
    description: 'シニア人材の知見がボトルネック。顧客別の案件管理が重要。',
    suggestedDepts: ['コンサルティング部', '営業部', 'オペレーション部', '管理部'],
    useCases: ['顧客対応', 'ナレッジ共有', 'プロジェクト管理', '提案書作成'],
    categories: [
      {
        name: '全社',
        rooms: [
          { name: '【全社】連絡', icon: 'business', description: '全社連絡', archetype: 'company_announce' },
          { name: '【全社】雑談', icon: 'beer', description: 'フリートーク', archetype: 'casual' },
        ]
      },
      {
        name: '経営・管理',
        rooms: [
          { name: '【経営】幹部会議', icon: 'security', description: '経営方針・重要案件', archetype: 'management' },
          { name: '【管理】総務・経理', icon: 'document', description: '請求・経費・事務', archetype: 'admin_general' },
        ]
      },
      {
        name: '部門別',
        dynamic: true,
        roomTemplates: [
          { nameTemplate: '【{dept}】', icon: 'group', description: '{dept}の連絡・情報共有', archetype: 'department' },
        ]
      },
      {
        name: '顧客・案件',
        requiresProject: true,
        rooms: [
          { name: '【顧客】X社コンサルPJ', icon: 'project', description: '顧客別プロジェクト進捗管理', archetype: 'client_project' },
          { name: '【顧客】Y社 業務改善支援', icon: 'project', description: '顧客別プロジェクト', archetype: 'client_project' },
        ]
      },
      {
        name: 'ナレッジ',
        requiresCross: true,
        rooms: [
          { name: '【共有】ナレッジベース', icon: 'study', description: '事例・ノウハウの蓄積', archetype: 'knowledge' },
          { name: '【共有】業界動向', icon: 'idea', description: '業界ニュース・トレンド共有', archetype: 'knowledge' },
        ]
      },
    ]
  },

  // -------------------------------------------------------
  // 5. 士業型（税理士・弁護士・社労士等）
  // -------------------------------------------------------
  professional: {
    label: '士業型',
    subtitle: '税理士・弁護士・社労士・司法書士事務所など',
    description: 'シニア資格者への集中。顧問先対応と法定期限管理が最重要。',
    suggestedDepts: ['資格者チーム', '事務スタッフ', '営業・顧問先開拓'],
    useCases: ['顧問先対応', '期日管理', '書類管理', '法改正情報'],
    categories: [
      {
        name: '事務所全体',
        rooms: [
          { name: '【事務所】連絡', icon: 'business', description: '全体連絡・お知らせ', archetype: 'company_announce' },
          { name: '【事務所】雑談', icon: 'beer', description: 'スタッフ間コミュニケーション', archetype: 'casual' },
        ]
      },
      {
        name: '管理',
        rooms: [
          { name: '【管理】経営会議', icon: 'security', description: '所長・パートナーの意思決定', archetype: 'management' },
          { name: '【管理】総務・経理', icon: 'document', description: '事務所の経理・総務', archetype: 'admin_general' },
          { name: '【管理】期日・スケジュール', icon: 'event', description: '申告期限・届出期限の管理', archetype: 'deadline_mgmt' },
        ]
      },
      {
        name: 'チーム別',
        dynamic: true,
        roomTemplates: [
          { nameTemplate: '【{dept}】', icon: 'group', description: '{dept}の業務連絡', archetype: 'department' },
        ]
      },
      {
        name: '顧問先対応',
        requiresProject: true,
        rooms: [
          { name: '【顧問先】A社', icon: 'project', description: '顧問先別の対応・資料管理', archetype: 'client_project' },
          { name: '【顧問先】B社', icon: 'project', description: '顧問先別の対応', archetype: 'client_project' },
          { name: '【顧問先】C社', icon: 'project', description: '顧問先別の対応', archetype: 'client_project' },
        ]
      },
      {
        name: '情報共有',
        requiresCross: true,
        rooms: [
          { name: '【共有】法改正・通達情報', icon: 'study', description: '法改正・新制度の情報共有', archetype: 'legal_update' },
          { name: '【共有】事例・判例', icon: 'idea', description: '実務事例・判例の共有', archetype: 'knowledge' },
        ]
      },
    ]
  },

  // -------------------------------------------------------
  // 6. クリエイティブ型（デザイン事務所、映像制作等）
  // -------------------------------------------------------
  creative: {
    label: 'クリエイティブ型',
    subtitle: 'デザイン事務所・映像制作・印刷・Web制作など',
    description: '修正の繰り返し・ファイル管理・外部パートナー連携が課題。',
    suggestedDepts: ['ディレクション', 'デザイン', 'エンジニア', '営業・PM'],
    useCases: ['案件管理', '修正指示', 'ファイル共有', '外部連携'],
    categories: [
      {
        name: '全社',
        rooms: [
          { name: '【全社】連絡', icon: 'business', description: '全体連絡', archetype: 'company_announce' },
          { name: '【全社】雑談・インスピレーション', icon: 'idea', description: '雑談・参考事例シェア', archetype: 'casual' },
        ]
      },
      {
        name: '管理',
        rooms: [
          { name: '【管理】経営', icon: 'security', description: '経営・売上管理', archetype: 'management' },
          { name: '【管理】総務・経理', icon: 'document', description: '経理・契約管理', archetype: 'admin_general' },
        ]
      },
      {
        name: 'チーム別',
        dynamic: true,
        roomTemplates: [
          { nameTemplate: '【{dept}】', icon: 'group', description: '{dept}の連絡', archetype: 'department' },
        ]
      },
      {
        name: '案件別',
        requiresProject: true,
        rooms: [
          { name: '【案件】X社 LP制作', icon: 'project', description: '案件別の進捗・修正管理', archetype: 'creative_project' },
          { name: '【案件】Y社 動画制作', icon: 'project', description: '案件別の制作進行', archetype: 'creative_project' },
          { name: '【案件】Z社 ブランディング', icon: 'project', description: '案件別の制作進行', archetype: 'creative_project' },
        ]
      },
      {
        name: '外部連携',
        requiresCross: true,
        rooms: [
          { name: '【外部】フリーランス連絡', icon: 'meeting', description: '外部パートナーとの連携', archetype: 'external_partner' },
        ]
      },
    ]
  },

  // -------------------------------------------------------
  // 7. 建設・工事管理型
  // -------------------------------------------------------
  construction: {
    label: '建設・工事管理型',
    subtitle: '工務店・専門工事・設備工事・リフォームなど',
    description: '現場と事務所の情報断絶。複数現場の並行管理と協力業者連携が課題。',
    suggestedDepts: ['工事部', '営業部', '設計部', '総務・経理'],
    useCases: ['現場報告', '安全管理', '協力業者連絡', '写真共有'],
    categories: [
      {
        name: '全社',
        rooms: [
          { name: '【全社】連絡', icon: 'business', description: '全社連絡', archetype: 'company_announce' },
          { name: '【全社】雑談', icon: 'beer', description: '社員交流', archetype: 'casual' },
          { name: '【全社】安全衛生', icon: 'security', description: '安全注意喚起・ヒヤリハット', archetype: 'safety' },
        ]
      },
      {
        name: '管理',
        rooms: [
          { name: '【管理】経営会議', icon: 'security', description: '経営判断', archetype: 'management' },
          { name: '【管理】総務・経理', icon: 'document', description: '事務・経理', archetype: 'admin_general' },
        ]
      },
      {
        name: '部門別',
        dynamic: true,
        roomTemplates: [
          { nameTemplate: '【{dept}】', icon: 'group', description: '{dept}の連絡', archetype: 'department' },
        ]
      },
      {
        name: '現場別',
        requiresProject: true,
        rooms: [
          { name: '【現場】○○邸 新築工事', icon: 'project', description: '現場別の日報・写真・進捗', archetype: 'construction_site' },
          { name: '【現場】△△ビル 改修工事', icon: 'project', description: '現場別の管理', archetype: 'construction_site' },
        ]
      },
      {
        name: '協力業者',
        requiresCross: true,
        rooms: [
          { name: '【外部】協力業者連絡', icon: 'meeting', description: '下請け・協力業者との連携', archetype: 'external_partner' },
        ]
      },
    ]
  },

  // -------------------------------------------------------
  // 8. 施設管理型（学習塾、保育園、廃棄物処理等）
  // -------------------------------------------------------
  facility: {
    label: '施設管理型',
    subtitle: '学習塾・保育園・フィットネスクラブ・廃棄物処理など',
    description: '管理者が全業務を抱える。複数拠点の可視化と保護者/利用者対応が課題。',
    suggestedDepts: ['本部', '施設A', '施設B', '施設C'],
    useCases: ['施設間連絡', '保護者/利用者対応', 'スタッフ管理', 'イベント運営'],
    categories: [
      {
        name: '全体',
        rooms: [
          { name: '【全体】連絡・お知らせ', icon: 'business', description: '全施設への連絡', archetype: 'company_announce' },
          { name: '【全体】雑談', icon: 'beer', description: 'スタッフ交流', archetype: 'casual' },
        ]
      },
      {
        name: '管理',
        rooms: [
          { name: '【管理】経営・運営会議', icon: 'security', description: '経営方針・運営改善', archetype: 'management' },
          { name: '【管理】総務・経理', icon: 'document', description: '事務処理', archetype: 'admin_general' },
          { name: '【管理】シフト・勤怠', icon: 'event', description: 'シフト調整', archetype: 'shift' },
        ]
      },
      {
        name: '施設別',
        dynamic: true,
        roomTemplates: [
          { nameTemplate: '【{dept}】', icon: 'group', description: '{dept}の運営連絡', archetype: 'store_ops' },
        ]
      },
      {
        name: '業務別',
        requiresProject: true,
        rooms: [
          { name: '【業務】イベント・行事', icon: 'event', description: 'イベント企画・運営', archetype: 'event_planning' },
          { name: '【業務】研修・スキルアップ', icon: 'study', description: 'スタッフ研修', archetype: 'study_session' },
          { name: '【業務】クレーム・改善', icon: 'star', description: '利用者対応・改善活動', archetype: 'customer_issue' },
        ]
      },
    ]
  },

  // -------------------------------------------------------
  // 9. 製造+販売分業型
  // -------------------------------------------------------
  manufacturing_sales: {
    label: '製造+販売分業型',
    subtitle: '食品メーカー・化粧品・スポーツ用品・消費財など',
    description: '営業→製造の一方通行で需要予測が困難。部門間の情報サイロが課題。',
    suggestedDepts: ['営業部', '製造部', '品質管理部', '物流部', '管理部'],
    useCases: ['受注・生産連携', '品質管理', '在庫管理', '部門間連携'],
    categories: [
      {
        name: '全社',
        rooms: [
          { name: '【全社】連絡', icon: 'business', description: '全社連絡', archetype: 'company_announce' },
          { name: '【全社】雑談', icon: 'beer', description: '社員交流', archetype: 'casual' },
        ]
      },
      {
        name: '経営',
        rooms: [
          { name: '【経営】役員会議', icon: 'security', description: '経営方針', archetype: 'management' },
          { name: '【管理】総務・経理', icon: 'document', description: '事務・経理', archetype: 'admin_general' },
        ]
      },
      {
        name: '部門別',
        dynamic: true,
        roomTemplates: [
          { nameTemplate: '【{dept}】', icon: 'group', description: '{dept}の業務連絡', archetype: 'department' },
        ]
      },
      {
        name: '横断連携',
        requiresProject: true,
        rooms: [
          { name: '【連携】受注→生産 連絡', icon: 'project', description: '受注情報→生産計画の連携', archetype: 'cross_function' },
          { name: '【連携】品質・クレーム対応', icon: 'check', description: '品質問題・クレーム対応', archetype: 'quality' },
          { name: '【連携】在庫・物流', icon: 'document', description: '在庫状況・出荷調整', archetype: 'inventory' },
        ]
      },
      {
        name: '改善',
        requiresCross: true,
        rooms: [
          { name: '【改善】生産性向上PJ', icon: 'idea', description: '業務改善プロジェクト', archetype: 'project_internal' },
          { name: '【共有】安全衛生', icon: 'security', description: '工場の安全管理', archetype: 'safety' },
        ]
      },
    ]
  },

  // -------------------------------------------------------
  // 10. 工場長一極集中型（小規模製造・修理業等）
  // -------------------------------------------------------
  factory_owner: {
    label: '工場長・社長一極集中型',
    subtitle: '町工場・自動車整備・菓子製造・惣菜製造など',
    description: '社長/工場長が全てを担う。事務1-2名で全管理業務。BPaaS親和性が最も高い。',
    suggestedDepts: ['製造', '事務', '営業（社長兼務）'],
    useCases: ['受注管理', '製造指示', '事務連絡', '顧客対応'],
    categories: [
      {
        name: '全体',
        rooms: [
          { name: '連絡・お知らせ', icon: 'business', description: '全体連絡', archetype: 'company_announce' },
          { name: '雑談', icon: 'beer', description: '社員間コミュニケーション', archetype: 'casual' },
        ]
      },
      {
        name: '業務',
        rooms: [
          { name: '受注・顧客対応', icon: 'star', description: '受注管理・顧客やり取り', archetype: 'order_mgmt' },
          { name: '製造・作業指示', icon: 'check', description: '製造計画・作業指示', archetype: 'production' },
          { name: '事務・経理', icon: 'document', description: '請求・経理・事務処理', archetype: 'admin_general' },
          { name: '仕入・在庫', icon: 'document', description: '原材料発注・在庫管理', archetype: 'inventory' },
        ]
      },
      {
        name: '外部',
        requiresProject: true,
        rooms: [
          { name: '【取引先】主要顧客A', icon: 'project', description: '主要取引先との連絡', archetype: 'client_project' },
          { name: '【外部】仕入先連絡', icon: 'meeting', description: '仕入先・業者との連絡', archetype: 'external_partner' },
        ]
      },
    ]
  },

  // -------------------------------------------------------
  // 不動産（追加：主要業界）
  // -------------------------------------------------------
  real_estate: {
    label: '不動産',
    subtitle: '不動産仲介・管理会社・デベロッパーなど',
    description: '物件情報の鮮度とスピードが命。オーナー対応・内見調整が日常業務。',
    suggestedDepts: ['売買仲介', '賃貸仲介', '管理部門', '事務・経理'],
    useCases: ['物件情報共有', '内見報告', 'オーナー対応', '契約管理'],
    categories: [
      {
        name: '全社',
        rooms: [
          { name: '【全社】連絡', icon: 'business', description: '全社連絡', archetype: 'company_announce' },
          { name: '【全社】雑談', icon: 'beer', description: '社員交流', archetype: 'casual' },
        ]
      },
      {
        name: '管理',
        rooms: [
          { name: '【経営】幹部会議', icon: 'security', description: '経営方針', archetype: 'management' },
          { name: '【管理】総務・経理', icon: 'document', description: '事務処理', archetype: 'admin_general' },
        ]
      },
      {
        name: '部門別',
        dynamic: true,
        roomTemplates: [
          { nameTemplate: '【{dept}】', icon: 'group', description: '{dept}の連絡', archetype: 'department' },
        ]
      },
      {
        name: '業務別',
        requiresProject: true,
        rooms: [
          { name: '【業務】物件情報共有', icon: 'star', description: '新着物件・価格変更の共有', archetype: 'property_info' },
          { name: '【業務】内見報告', icon: 'check', description: '内見結果・顧客反応の共有', archetype: 'viewing_report' },
          { name: '【業務】契約・決済', icon: 'document', description: '契約手続き・決済調整', archetype: 'contract_mgmt' },
          { name: '【業務】オーナー対応', icon: 'meeting', description: 'オーナーからの問い合わせ対応', archetype: 'owner_support' },
        ]
      },
    ]
  },

  // -------------------------------------------------------
  // 人材派遣（追加：主要業界）
  // -------------------------------------------------------
  staffing: {
    label: '人材派遣・紹介',
    subtitle: '人材派遣・人材紹介・求人広告代理店など',
    description: '求職者と企業のマッチング。両面対応のスピードと情報共有が鍵。',
    suggestedDepts: ['RA（企業担当）', 'CA（求職者担当）', 'コーディネーター', '管理部'],
    useCases: ['求人管理', '求職者対応', 'マッチング', '契約管理'],
    categories: [
      {
        name: '全社',
        rooms: [
          { name: '【全社】連絡', icon: 'business', description: '全社連絡', archetype: 'company_announce' },
          { name: '【全社】雑談', icon: 'beer', description: '社員交流', archetype: 'casual' },
          { name: '【全社】成約報告', icon: 'star', description: '成約・決定の共有', archetype: 'wins' },
        ]
      },
      {
        name: '管理',
        rooms: [
          { name: '【経営】幹部会議', icon: 'security', description: '経営方針', archetype: 'management' },
          { name: '【管理】総務・経理', icon: 'document', description: '事務・経理', archetype: 'admin_general' },
        ]
      },
      {
        name: '部門別',
        dynamic: true,
        roomTemplates: [
          { nameTemplate: '【{dept}】', icon: 'group', description: '{dept}の業務連絡', archetype: 'department' },
        ]
      },
      {
        name: '業務別',
        requiresProject: true,
        rooms: [
          { name: '【業務】求人案件共有', icon: 'project', description: '新規求人・条件変更の共有', archetype: 'job_posting' },
          { name: '【業務】マッチング相談', icon: 'meeting', description: 'RA×CA間のマッチング議論', archetype: 'matching' },
          { name: '【業務】スタッフフォロー', icon: 'heart', description: '派遣スタッフのフォローアップ', archetype: 'staff_follow' },
        ]
      },
    ]
  },
};

// ============================================================
// ルーム生成ロジック
// ============================================================

function generateRooms(hearing) {
  const template = INDUSTRY_TEMPLATES[hearing.industry];
  if (!template) return [];

  const sizeConfig = SIZE_SCALE[hearing.companySize];
  const rooms = [];
  let order = 0;

  for (const category of template.categories) {
    // 規模に応じてカテゴリをスキップ
    if (category.requiresProject && !sizeConfig.includeProject) continue;
    if (category.requiresCross && !sizeConfig.includeCross) continue;

    if (category.dynamic && category.roomTemplates) {
      if (!sizeConfig.includeDeptRooms) continue;
      // 部署ごとにルームを生成
      for (const dept of hearing.departments) {
        for (const tmpl of category.roomTemplates) {
          rooms.push({
            id: `room_${order++}`,
            name: tmpl.nameTemplate.replace('{dept}', dept),
            icon: tmpl.icon,
            description: tmpl.description.replace('{dept}', dept),
            category: category.name,
            archetype: tmpl.archetype,
          });
        }
      }
    } else if (category.rooms) {
      for (const room of category.rooms) {
        rooms.push({
          id: `room_${order++}`,
          name: room.name,
          icon: room.icon,
          description: room.description,
          category: category.name,
          archetype: room.archetype,
        });
      }
    }
  }

  return rooms;
}
