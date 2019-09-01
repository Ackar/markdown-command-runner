import vscode = require('vscode');

export class CommandCodeLensProvider implements vscode.CodeLensProvider {
    onDidChangeCodeLenses?: vscode.Event<void>;

    provideCodeLenses(document: vscode.TextDocument, token: vscode.CancellationToken): vscode.ProviderResult<vscode.CodeLens[]> {
        var codeLenses = [];
        const lines = document.getText().split('\n');

        var inCommand = false;
        var currentCommand = '';
        var commandStartLine = 0;
        for (var i = 0; i < lines.length; i++) {
            const line = lines[i];
            if (line.startsWith('```sh') || line.startsWith('```bash')) {
                inCommand = true;
                commandStartLine = i;
                continue;
            }

            if (inCommand) {
                if (line === '```') {
                    const cmd: vscode.Command = {
                        title: 'Run command',
                        command: 'markdown.run.command',
                        arguments: [{ command: currentCommand }]
                    };
                    codeLenses.push(
                        new vscode.CodeLens(new vscode.Range(new vscode.Position(commandStartLine, 0), new vscode.Position(commandStartLine + 1, 0)), cmd)
                    );
                    inCommand = false;
                    currentCommand = '';
                    continue;
                }

                currentCommand += line + '\n';
            }
        }
        return codeLenses;
    }

    resolveCodeLens?(codeLens: vscode.CodeLens, token: vscode.CancellationToken): vscode.ProviderResult<vscode.CodeLens> {
        return null;
    }


}