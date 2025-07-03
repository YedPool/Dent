"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
function activate(context) {
    console.log('Indent Selection extension is now active');
    /* MODIFICATION START: Completely refactored to support multiple indentation levels */
    // Shared function to get editor and selection
    function getEditorAndSelection() {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            return undefined;
        }
        const selection = editor.selection;
        if (selection.isEmpty) {
            return undefined;
        }
        return {
            editor,
            startLine: selection.start.line,
            endLine: selection.end.line
        };
    }
    // Function to create indent commands
    function createIndentCommand(level) {
        return vscode.commands.registerCommand(`indent-selection.indentBlock${level}`, async () => {
            const editorInfo = getEditorAndSelection();
            if (!editorInfo) {
                return;
            }
            const { editor, startLine, endLine } = editorInfo;
            // Create a edit operation
            const edit = new vscode.WorkspaceEdit();
            // Loop through all lines in the selection and indent them
            for (let i = startLine; i <= endLine; i++) {
                const line = editor.document.lineAt(i);
                const indentationSize = editor.options.tabSize;
                let indentText = '';
                // Create indentation based on level and editor settings
                if (editor.options.insertSpaces) {
                    indentText = ' '.repeat(indentationSize * level);
                }
                else {
                    indentText = '\t'.repeat(level);
                }
                edit.insert(editor.document.uri, line.range.start, indentText);
            }
            // Apply the edit
            await vscode.workspace.applyEdit(edit);
        });
    }
    // Function to create outdent commands
    function createOutdentCommand(level) {
        return vscode.commands.registerCommand(`indent-selection.outdentBlock${level}`, async () => {
            const editorInfo = getEditorAndSelection();
            if (!editorInfo) {
                return;
            }
            const { editor, startLine, endLine } = editorInfo;
            // Create a edit operation
            const edit = new vscode.WorkspaceEdit();
            const indentationSize = editor.options.tabSize;
            const useSpaces = editor.options.insertSpaces;
            // Loop through all lines in the selection and outdent them
            for (let i = startLine; i <= endLine; i++) {
                const line = editor.document.lineAt(i);
                const lineText = line.text;
                if (lineText.length === 0) {
                    continue;
                }
                if (useSpaces) {
                    // If using spaces, check how many spaces we can remove
                    let spacesToRemove = 0;
                    const maxSpacesToRemove = indentationSize * level;
                    for (let j = 0; j < maxSpacesToRemove && j < lineText.length; j++) {
                        if (lineText[j] === ' ') {
                            spacesToRemove++;
                        }
                        else {
                            break;
                        }
                    }
                    if (spacesToRemove > 0) {
                        edit.delete(editor.document.uri, new vscode.Range(new vscode.Position(i, 0), new vscode.Position(i, spacesToRemove)));
                    }
                }
                else {
                    // If using tabs, check how many tabs we can remove
                    let tabsToRemove = 0;
                    for (let j = 0; j < level && j < lineText.length; j++) {
                        if (lineText[j] === '\t') {
                            tabsToRemove++;
                        }
                        else {
                            break;
                        }
                    }
                    if (tabsToRemove > 0) {
                        edit.delete(editor.document.uri, new vscode.Range(new vscode.Position(i, 0), new vscode.Position(i, tabsToRemove)));
                    }
                }
            }
            // Apply the edit
            await vscode.workspace.applyEdit(edit);
        });
    }
    // Register commands for different indentation levels
    const disposables = [];
    // Register indent commands
    for (let i = 1; i <= 4; i++) {
        disposables.push(createIndentCommand(i));
    }
    // Register outdent commands
    for (let i = 1; i <= 4; i++) {
        disposables.push(createOutdentCommand(i));
    }
    context.subscriptions.push(...disposables);
    /* MODIFICATION END */
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map