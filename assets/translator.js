/**
 * Runtime Translation Layer for PoE2 Temple Planner
 * Translates English strings to Chinese after page render
 * Handles dynamic content including tooltips and modals
 */

(function() {
  'use strict';

  // Translation mappings loaded from JSON files
  let TRANSLATIONS = {};
  let translationPattern = null;

  /**
   * Load JSON translation file
   */
  async function loadTranslationFile(path) {
    try {
      const response = await fetch(path);
      if (!response.ok) {
        console.warn(`Failed to load translation file: ${path} (${response.status} ${response.statusText})`);
        return {};
      }
      return await response.json();
    } catch (error) {
      console.error(`Error loading translation file ${path}:`, error);
      return {};
    }
  }

  /**
   * Load all translation files and merge them
   */
  async function loadTranslations() {
    const translationFiles = [
      '/assets/translations/temple-rooms.json',
      '/assets/translations/medallions.json',
      '/assets/translations/ui-terms.json',
      '/assets/translations/modifiers.json'
    ];

    const translations = await Promise.all(
      translationFiles.map(file => loadTranslationFile(file))
    );

    // Merge all translation objects
    TRANSLATIONS = Object.assign({}, ...translations);

    // Create a regex pattern for efficient matching
    // IMPORTANT: Case-sensitive matching is REQUIRED (no 'i' flag)
    // Translations must match exact case to prevent incorrect translations
    translationPattern = new RegExp(
      Object.keys(TRANSLATIONS)
        .sort((a, b) => b.length - a.length) // Sort by length (longest first) to match longer strings first
        .map(key => key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')) // Escape special regex characters
        .join('|'),
      'g' // Case-sensitive (no 'i' flag) - DO NOT ADD 'i' flag here
    );
    
    // Validate that the pattern is case-sensitive
    if (translationPattern.flags.includes('i')) {
      console.error('PoE2 Temple Translator: ERROR - Translation pattern must be case-sensitive!');
      throw new Error('Translation pattern must not have the case-insensitive flag');
    }

    console.log('PoE2 Temple Translator: Loaded', Object.keys(TRANSLATIONS).length, 'translations (case-sensitive matching)');
  }

  /**
   * Translate text content using case-sensitive matching
   * Note: All translations strictly follow case-sensitive matching rules
   */
  function translateText(text) {
    if (!text || typeof text !== 'string' || !translationPattern) return text;
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
  async function init() {
    // Load translations first
    await loadTranslations();

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
