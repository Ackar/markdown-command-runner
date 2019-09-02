# markdown-command-runner

`markdown-command-runner` is a lightweight VS Code extension to run commands in READMEs in one-click.
It adds a CodeLens action to run shell snippets in any markdown files.

### How does it work?
`markdown-command-runner` detects `` ```sh `` and `` ```bash `` snippets in markdown files an adds
a `Run command` action at the top.

When clicked the associated snippet is run the current active terminal or a new one if it is busy.
