# Translation Files

This directory contains JSON translation files for the PoE2 Temple Planner.

## Important: Case-Sensitive Matching

**All translations strictly follow case-sensitive matching rules.**

- "Path" and "path" are treated as different strings
- Only exact case matches will be translated
- This is intentional to prevent incorrect translations
- The regex pattern is validated at runtime to ensure no case-insensitive flag is present

## File Structure

- **temple-rooms.json** - Temple room names (26 entries)
  - Contains translations for all temple room types
  - Examples: Path, Garrison, Commander, Treasure Vault, etc.

- **medallions.json** - Medallion names (10 entries)
  - Contains translations for all medallion types
  - Examples: Juatalotli's Medallion, Hayoxi's Medallion, etc.

- **ui-terms.json** - UI terms and common strings (39 entries)
  - Contains translations for UI elements, buttons, labels
  - Examples: Monster, Active Bonuses, How to Use, etc.

- **modifiers.json** - Monster/chest/effect modifiers (48 entries)
  - Contains translations for game modifiers and effects
  - Examples: "10% increased number of Monster Packs", "Rare Monsters have 15% increased Effectiveness", etc.

## Adding New Translations

To add new translations:

1. Choose the appropriate JSON file based on the category
2. Add the English string as the key and Chinese translation as the value
3. **IMPORTANT**: Ensure the English key matches the exact case used in the application
4. Ensure proper JSON formatting (use commas between entries, no trailing comma on last entry)
5. Test by loading the page and checking the console for the total number of loaded translations

**Case-Sensitivity Note**: Translation keys are case-sensitive. "Path", "path", and "PATH" would be treated as three different translation keys.

## JSON Format

```json
{
  "English String": "中文翻译",
  "Another String": "另一个翻译"
}
```

## Total Translations

Currently: **123 translations** across all files

To get the exact count, run:
```bash
jq 'length' assets/translations/*.json | awk '{sum+=$1} END {print sum}'
```

## How It Works

The `translator.js` file loads all these JSON files at runtime using `fetch()`, merges them into a single translation object, and applies translations to the page content using a MutationObserver to handle dynamic content.
