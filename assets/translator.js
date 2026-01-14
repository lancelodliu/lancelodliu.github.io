/**
 * Runtime Translation Layer for PoE2 Temple Planner
 * Translates English strings to Chinese after page render
 * Handles dynamic content including tooltips and modals
 */

(function() {
  'use strict';

  // Translation mappings from markdown files
const TRANSLATIONS = {
  // Temple Rooms (神庙房间中英对照表)
  "Path": "通路",
  "Garrison": "驻军地",
  "Commander": "指挥官",
  "Armoury": "装备库",
  "Smithy": "铁匠铺",
  "Generator": "发电机",
  "Spymaster": "密探",
  "Synthflesh Lab": "合成血肉实验室",
  "Flesh Surgeon": "血肉医师",
  "Alchemy Lab": "炼金实验室",
  "Thaumaturge": "奇术师",,
  "Thaumaturge's": "奇术师",
  "Golem Works": "魔像工坊",
  "Corruption Chamber": "腐化之室",
  "Treasure Vault": "藏宝库",
  "Sacrificial Chamber": "献祭室",
  "Architect's Chamber": "建筑师之室",
  "Entrance": "门厅",
  "Currency Vault": "通货宝库",
  "Lineage Gems Vault": "传承宝石宝库",
  "Augments Vault": "增幅器宝库",
  "Tablets Vault": "石板宝库",
  "Uniques Vault": "传奇宝库",
  "Royal Access Chamber": "皇家谒见厅",
  "Extraction Chamber": "萃取厅",
  "Atziri's Chamber": "阿兹里的殿堂",

    // Medallions (徽章中英对照列表)
    "Juatalotli's Medallion": '华塔洛蒂的纹章',
  "Hayoxi's Medallion": '海幽夏的纹章',
  "Quipolatl's Medallion": '奎波拉特尔的纹章',
  "Uromoti's Medallion": '武罗摩提的纹章',
  "Xopec's Medallion": '肖佩克的纹章',
  "Azcapa's Medallion": '阿兹卡帕的纹章',
  "Estazunti's Medallion": '埃斯塔祖提的纹章',
  "Puhuarte's Medallion": '普华特的纹章',
  "Zantipi's Medallion": '赞提佩的纹章',

  // Common UI terms that might appear
  'Medallion': '纹章',
  'Room': '房间',
  'Tier': '等阶',
  'Monster': '怪物',
  'Loot': '战利品',
  'Other': '其他',
  'Items': '物品',
  'Active Bonuses': '激活加成',
  'Effect Modifiers': '效果调整',
  'Detailed': '详细',
  'Place Room': '放置房间',
  'Select Room': '选择房间',
  'No effects': '无效果',
  'Can connect to': '可以连接到',
  'Upgrades': '升级',
  'Upgraded by': '被升级',
  'Increases effects of': '增强效果',
  'Contributing': '贡献',
  'Next tier needs': '下一等阶需要',
  'Manual tier': '手动等阶',
  'Merge chains': '合并链条',
  'Creates loop': '创建循环',
  'Destabilization start': '不稳定开始',
  'How to Use': '使用方法',
  'Visual Indicators': '视觉指示器',
  'Chains': '链条',
  'Total': '总计',
  'Rooms': '房间',
  'Room Cards': '房间卡片',
  'Deal': '发牌',
  'Destabilize': '不稳定化',
  'Accept': '接受',
  'Reject': '拒绝',
  'Planning': '规划',
  'Destabilization': '不稳定化',
  'Temple Presets': '神庙预设',
  'Changelog': '更新日志',
  'Feedback': '反馈',
  'PoE2 Tools': '流放之路2工具',
  'Atziri Temple': '阿兹里神庙',

  // Suffix and Prefix
  "10% increased number of Monster Packs": "怪物群数量提高 10%",
  "15% increased number of Monster Packs": "怪物群数量提高 15%",
  "Normal Monsters have 15% increased Effectiveness": "普通怪物的强度提高 15%",
  "20% increased number of Monster Packs": "怪物群数量提高 20%",
  "Normal Monsters have 30% increased Effectiveness": "普通怪物的强度提高 30%",
  "Rare Monsters have 15% increased Effectiveness": "稀有怪物的怪物强度提高 15%",
  "Rare Monsters have 30% increased Effectiveness": "稀有怪物的怪物强度提高 30%",
  "Rare Monsters have 60% increased Effectiveness": "稀有怪物的怪物强度提高 60%",
  "Humanoid Monsters have 15% increased Effectiveness": "人形怪物的强度提高 15%",
  "Humanoid Monsters have 30% increased Effectiveness": "人形怪物的强度提高 30%",
  "Humanoid Monsters have 60% increased Effectiveness": "人形怪物的强度提高 60%",
  "Chests have 15% more Item Rarity": "宝箱中的物品稀有度总增 15%",
  "Chests have 30% more Item Rarity": "宝箱中的物品稀有度总增 30%",
  "Chests have 60% more Item Rarity": "宝箱中的物品稀有度总增 60%",
  "Construct Monsters have 15% increased Effectiveness": "构建体怪物的强度提高 15%",
  "Construct Monsters have 30% increased Effectiveness": "构建体怪物的强度提高 30%",
  "Construct Monsters have 60% increased Effectiveness": "构建体怪物的强度提高 60%",
  "8% increased effect of Temple Mods from Garrisons, Commanders, Armouries, Smithies, and Legion Barracks": "来自驻军地、指挥官、装备库、铁匠铺和军团兵营的神殿词缀效果提高 8%",
  "15% increased effect of Temple Mods from Garrisons, Commanders, Armouries, Smithies, and Legion Barracks": "来自驻军地、指挥官、装备库、铁匠铺和军团兵营的神殿词缀效果提高 15%",
  "30% increased effect of Temple Mods from Garrisons, Commanders, Armouries, Smithies, and Legion Barracks": "来自驻军地、指挥官、装备库、铁匠铺和军团兵营的神殿词缀效果提高 30%",
  "30% increased number of Rare Monsters": "稀有怪物的数量提高 30%",
  "60% increased number of Rare Monsters": "稀有怪物的数量提高 60%",
  "Monsters grant 10% increased Experience": "怪物的经验值提高 10%",
  "Monsters grant 20% increased Experience": "怪物的经验值提高 20%",
  "Monsters grant 40% increased Experience": "怪物的经验值提高 40%",
  "Unique Monsters have 10% increased Effectiveness": "传奇怪物的怪物强度提高 10%",
  "Unique Monsters have 20% increased Effectiveness": "传奇怪物的怪物强度提高 20%",
  "Unique Monsters have 40% increased Effectiveness": "传奇怪物的怪物强度提高 40%",
  "30% increased number of Magic Monsters": "魔法怪物数量提高 30%",
  "60% increased number of Magic Monsters": "魔法怪物数量提高 60%",
  "15% increased Rarity of Items Dropped by Monsters": "怪物掉落的物品稀有度提高 15%",
  "30% increased Rarity of Items Dropped by Monsters": "怪物掉落的物品稀有度提高 30%",
  "60% increased Rarity of Items Dropped by Monsters": "怪物掉落的物品稀有度提高 60%",
  "50% increased Gold found in this Area": "在此区域中可找到的金币数量提高 50%",
  "8% increased effect of Temple Mods from Corruption Chambers, Treasure Vaults, and Sacrificial Chambers": "来自腐化室、宝库和献祭室的神殿词缀效果提高 8%",
  "15% increased effect of Temple Mods from Corruption Chambers, Treasure Vaults, and Sacrificial Chambers": "来自腐化室、宝库和献祭室的神殿词缀效果提高 15%",
  "30% increased effect of Temple Mods from Corruption Chambers, Treasure Vaults, and Sacrificial Chambers": "来自腐化室、宝库和献祭室的神殿词缀效果提高 30%",
  "8% increased effect of Temple Mods from Generators, Synthflesh Labs, Flesh Surgeons, Transcendent Barracks, and Alchemy Labs": "来自发电机、合成血肉实验室、血肉手术师、升华守卫兵营和炼金实验室的神殿词缀效果提高 8%",
  "15% increased effect of Temple Mods from Generators, Synthflesh Labs, Flesh Surgeons, Transcendent Barracks, and Alchemy Labs": "来自发电机、合成血肉实验室、血肉手术师、升华守卫兵营和炼金实验室的神殿词缀效果提高 15%",
  "30% increased effect of Temple Mods from Generators, Synthflesh Labs, Flesh Surgeons, Transcendent Barracks, and Alchemy Labs": "来自发电机、合成血肉实验室、血肉手术师、升华守卫兵营和炼金实验室的神殿词缀效果提高 30%",
  "Rare Monsters have a 15% chance to have an additional Modifier": "稀有怪物有 15% 的几率额外具有一个词缀",
  "Rare Monsters have a 30% chance to have an additional Modifier": "稀有怪物有 30% 的几率额外具有一个词缀",
  "Rare Monsters have a 60% chance to have an additional Modifier": "稀有怪物有 60% 的几率额外具有一个词缀",
  "25% increased Rarity of Items Dropped by Monsters": "怪物掉落的物品稀有度提高 25%",
  "15% increased amount of Rare Chests": "稀有宝箱数量提高 15%",
  "30% increased amount of Rare Chests": "稀有宝箱数量提高 30%",
  "60% increased amount of Rare Chests": "稀有宝箱数量提高 60%",
  "Provides power to nearby rooms, increasing in range every tier": "为邻近房间提供能量，作用距离随房间等阶提升",
};

  // Create a regex pattern for efficient matching
  const translationPattern = new RegExp(
    Object.keys(TRANSLATIONS)
      .sort((a, b) => b.length - a.length) // Sort by length (longest first) to match longer strings first
      .map(key => key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')) // Escape special regex characters
      .join('|'),
    'g'
  );

  /**
   * Translate text content
   */
  function translateText(text) {
    if (!text || typeof text !== 'string') return text;
    return text.replace(translationPattern, match => TRANSLATIONS[match] || match);
  }

  /**
   * Translate a single text node
   */
  function translateTextNode(node) {
    if (node.nodeType === Node.TEXT_NODE && node.nodeValue.trim()) {
      const originalText = node.nodeValue;
      const translatedText = translateText(originalText);
      if (originalText !== translatedText) {
        node.nodeValue = translatedText;
      }
    }
  }

  /**
   * Translate all text nodes in an element
   */
  function translateElement(element) {
    if (!element) return;

    // Skip script and style tags
    if (element.tagName === 'SCRIPT' || element.tagName === 'STYLE') return;

    // Translate element's own text nodes
    const walker = document.createTreeWalker(
      element,
      NodeFilter.SHOW_TEXT,
      null,
      false
    );

    let node;
    while (node = walker.nextNode()) {
      translateTextNode(node);
    }

    // Translate common attributes
    ['title', 'placeholder', 'alt', 'aria-label'].forEach(attr => {
      if (element.hasAttribute(attr)) {
        const originalValue = element.getAttribute(attr);
        const translatedValue = translateText(originalValue);
        if (originalValue !== translatedValue) {
          element.setAttribute(attr, translatedValue);
        }
      }
    });
  }

  /**
   * Translate the entire document
   */
  function translateDocument() {
    translateElement(document.body);
  }

  /**
   * Set up mutation observer to handle dynamic content
   */
  function setupObserver() {
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        // Handle added nodes
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            translateElement(node);
          } else if (node.nodeType === Node.TEXT_NODE) {
            translateTextNode(node);
          }
        });

        // Handle attribute changes
        if (mutation.type === 'attributes' && mutation.target.nodeType === Node.ELEMENT_NODE) {
          const element = mutation.target;
          const attrName = mutation.attributeName;
          if (['title', 'placeholder', 'alt', 'aria-label'].includes(attrName)) {
            const originalValue = element.getAttribute(attrName);
            if (originalValue) {
              const translatedValue = translateText(originalValue);
              if (originalValue !== translatedValue) {
                element.setAttribute(attrName, translatedValue);
              }
            }
          }
        }

        // Handle character data changes (text content)
        if (mutation.type === 'characterData') {
          translateTextNode(mutation.target);
        }
      });
    });

    // Observe the entire document for changes
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['title', 'placeholder', 'alt', 'aria-label'],
      characterData: true,
      characterDataOldValue: false
    });

    return observer;
  }

  /**
   * Initialize the translator
   */
  function init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        translateDocument();
        setupObserver();
      });
    } else {
      // DOM is already ready
      translateDocument();
      setupObserver();
    }

    // Also translate after a short delay to catch any late-rendering content
    setTimeout(() => {
      translateDocument();
    }, 500);

    setTimeout(() => {
      translateDocument();
    }, 1500);
  }

  // Start the translator
  init();

  console.log('PoE2 Temple Translator initialized - 中文翻译已启用');
})();
