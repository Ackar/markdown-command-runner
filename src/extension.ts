import * as vscode from 'vscode';
import { CommandCodeLensProvider } from './commandCodeLensProvider';

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(
		vscode.commands.registerCommand('markdown.run.command', (args) => {
			const term = vscode.window.activeTerminal || vscode.window.createTerminal();
			if (term) {
				term.show();
				term.sendText(args.command);
			}
		})
	);

	context.subscriptions.push(
		vscode.languages.registerCodeLensProvider({ language: 'markdown', scheme: 'file' },
			new CommandCodeLensProvider())
	);
}

export function deactivate() { }
