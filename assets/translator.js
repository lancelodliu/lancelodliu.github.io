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
    'Path': '通路',
    'Guardhouse': '护卫间',
    'Barracks': '军营',
    'Hall of War': '战争大厅',
    "Commander's Chamber": '指挥官密室',
    "Commander's Hall": '指挥官大厅',
    "Commander's Headquarters": '指挥官总部',
    'Depot': '仓库',
    'Arsenal': '军库',
    'Gallery': '画廊',
    'Bronzeworks': '青铜工坊',
    'Chamber of Iron': '铸铁大厅',
    'Golden Forge': '黄金熔炉',
    'Dynamo': '动力核心',
    'Shrine of Empowerment': '赋能圣所',
    'Solar Nexus': '烈日核心',
    "Spymaster's Study": '密探书房',
    'Hall of Shadows': '暗影大厅',
    'Omnipresent Panopticon': '全视监察所',
    "Viper's Loyals": '毒蛇亲卫',
    'Elite Legion': '精英军团',
    'Prosthetic Research': '义体研究所',
    'Synthflesh Sanctum': '血肉合成禁域',
    'Crucible of Transcendence': '超然熔炉',
    "Surgeon's Ward": '外科病房',
    "Surgeon's Theatre": '外科手术室',
    "Surgeon's Symphony": '外科协奏厅',
    'Steelflesh Quarters': '钢肤营区',
    'Collective Legion': '集体军团',
    'Chamber of Souls': '灵魂熔炉',
    'Core Machinarium': '核心机械殿',
    'Grand Phylactory': '宏伟命匣',
    "Thaumaturge's Laboratory": '奇术实验室',
    "Thaumaturge's Cuttery": '奇术切割坊',
    "Thaumaturge's Cathedral": '奇术大圣堂',
    'Workshop': '工坊',
    'Automaton Lab': '自动机实验室',
    'Stone Legion': '石像军团',
    'Crimson Hall': '猩红大厅',
    'Catalyst of Corruption': '腐化演变室',
    'Locus of Corruption': '腐化蝗群',
    'Sealed Vault': '封印宝库',
    'Altar of Sacrifice': '牺牲祭坛',
    'Hall of Offerings': '祭品大厅',
    'Apex of Oblation': '祭奠之巅',
    "Architect's Chamber": '筑师殿堂',
    'Foyer': '门厅',
    "Kishara's Vault": '琪莎拉的宝库',
    'Vault of Reverence': '敬畏宝库',
    "Jiquani's Vault": '佳华尼的宝库',
    'Tablet Research Vault': '石板研究宝库',
    'Ancient Reliquary Vault': '古藏宝库',
    'Royal Access Chamber': '皇家谒见厅',
    'Extraction Chamber': '萃取厅',
    'Sacrifice Room': '献祭间',
    "Atziri's Chamber": '阿兹里的殿堂',

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
    'Atziri Temple': '阿兹里神庙'
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
