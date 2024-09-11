import vscode = require('vscode');
import path = require('path');

export class CommandCodeLensProvider implements vscode.CodeLensProvider {
    onDidChangeCodeLenses?: vscode.Event<void>;

    provideCodeLenses(document: vscode.TextDocument, token: vscode.CancellationToken): vscode.ProviderResult<vscode.CodeLens[]> {
        var codeLenses = [];
        const lines = document.getText().split('\n');
        const directory = path.dirname(document.fileName);

	    const changeDirectoryConfig = vscode.workspace.getConfiguration().get('markdown-command-runner.change-directory');

        var inCommand = false;
        var currentCommand = '';
        var commandStartLine = 0;
        for (var i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            if (inCommand) {
                if (line === '```') {
                    const cdCmd = changeDirectoryConfig == "true" ? `cd ${directory};` : '' 
                    const cmd: vscode.Command = {
                        title: 'Run command in terminal',
                        command: 'markdown.run.command',
                        arguments: [{ command: `${cdCmd} ${currentCommand}` }]
                    };
                    codeLenses.push(
                        new vscode.CodeLens(new vscode.Range(new vscode.Position(commandStartLine, 0), new vscode.Position(commandStartLine + 1, 0)), cmd)
                    );
                    inCommand = false;
                    currentCommand = '';
                    continue;
                }

                currentCommand += line + '\n';
                continue;
            }

            if (line.startsWith('```') || line.startsWith('```sh') || line.startsWith('```bash')) {
                inCommand = true;
                commandStartLine = i;
                continue;
            }
        }
        return codeLenses;
    }

    resolveCodeLens?(codeLens: vscode.CodeLens, token: vscode.CancellationToken): vscode.ProviderResult<vscode.CodeLens> {
        return null;
    }


}