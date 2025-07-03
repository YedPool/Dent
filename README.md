# Dent - Code Indentation Extension

VS Code/Cursor extension for indenting and outdenting selected code by 1-4 tab levels.

## Features

- Indent/outdent selected code by 1, 2, 3, or 4 tab levels
- Right-click context menu integration
- Command palette support
- Respects editor tab/space settings
- Preserves existing formatting

## Usage

### Context Menu
1. Select code
2. Right-click → choose indentation level:
   - Indent Selection 1-4 Tabs
   - Outdent Selection 1-4 Tabs

### Command Palette
1. Select code
2. `Ctrl+Shift+P` → type "Dent" → choose command

## Installation
### From VSIX
1. `Ctrl+Shift+P` → "Extensions: Install from VSIX"
2. Select downloaded `.vsix` file

### Development
```bash
git clone [repo]
cd dent
npm install
F5 # Run in development mode
```

## Commands

- `dent.indent1-4`: Indent Selection 1-4 Tabs
- `dent.outdent1-4`: Outdent Selection 1-4 Tabs

## Configuration

Uses your editor settings:
- Tab size (File → Preferences → Settings → "tab size")
- Spaces vs tabs (Editor: Insert Spaces)

## Keyboard Shortcuts

Set custom shortcuts in File → Preferences → Keyboard Shortcuts:
- Search "Dent"
- Assign key combinations

## Requirements

- VS Code 1.60.0+
- Cursor (all versions)

## License

MIT