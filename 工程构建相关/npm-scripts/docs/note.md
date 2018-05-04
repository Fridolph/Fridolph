npm init 的默认配置

    npm config set init.author.email "249121486@qq.com"
    npm config set init.author.name "fridolph"
    npm config set init.author.url "http://github.com/fridolph"
    npm config set init.license "MIT"
    npm config set init.version "0.1.0"


---

集成单元测试

```json
{
  "name": "hello-npm-script",
  "version": "0.1.0",
  "main": "index.js",
  "scripts": {
    "lint:js": "eslint *.js",
    "lint:css": "stylelint *.less",
    "lint:json": "jsonlint --quiet *.json",
    "lint:markdown": "markdownlint --config .markdownlint.json *.md",
    "test": "mocha tests/"
  },
  "devDependencies": {
    "chai": "^4.1.2",
    "eslint": "^4.11.0",
    "jsonlint": "^1.6.2",
    "markdownlint-cli": "^0.5.0",
    "mocha": "^4.0.1",
    "stylelint": "^8.2.0",
    "stylelint-config-standard": "^17.0.0"
  }
}
```

---

常用 VSCode 配置 ctrl + ,

```json
{
  "workbench.iconTheme": "vscode-icons",
  "workbench.colorTheme": "One Monokai",
  "editor.wordWrap": "on",
  "editor.wordWrapColumn": 120,
  "terminal.integrated.shell.windows": "C:\\WINDOWS\\System32\\WindowsPowerShell\\v1.0\\powershell.exe",
  "editor.tabSize": 2,
  "vetur.format.defaultFormatter.html": "js-beautify-html",
  "eslint.autoFixOnSave": true,
  "files.autoSave": "afterDelay",
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "html",
    {
      "language": "vue",
      "autoFix": true
    }
  ],
  "eslint.options": {
    "plugins": [
      "html"
    ]
  },
  "extensions.autoUpdate": true,
  "prettier.singleQuote": true,
  "prettier.semi": true,
  "prettier.eslintIntegration": true,
  "files.eol": "\n",
  "explorer.confirmDragAndDrop": false,
  "files.autoSaveDelay": 5000,
  "fileheader.tpl": "/*\r\n * @Author: {author} \r\n * @Date: {createTime} \r\n * @Last Modified by: {lastModifiedBy} \r\n * @Last Modified time: {updateTime} \r\n */\r\n",
  "fileheader.Author": "fridolph",
  "fileheader.LastModifiedBy": "fridolph",
  "editor.fontSize": 14,
  "editor.lineHeight": 22,
  "editor.lineNumbers": "on",
  "editor.quickSuggestions": {
    "other": true,
    "comments": true,
    "strings": true
  },
  "files.trimFinalNewlines": true,
  "files.trimTrailingWhitespace": true,
  "files.insertFinalNewline": true,
  "gitlens.advanced.messages": {
    "suppressCommitHasNoPreviousCommitWarning": true,
    "suppressCommitNotFoundWarning": true,
    "suppressFileNotUnderSourceControlWarning": true,
    "suppressGitVersionWarning": true,
    "suppressLineUncommittedWarning": true,
    "suppressNoRepositoryWarning": true,
    "suppressResultsExplorerNotice": true
  },
}
```
