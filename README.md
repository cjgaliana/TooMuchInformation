# README
## Too Much Information extension for Visual Studio Code
This extension helps you to quicky add a vscode settings.json file to your folder with the "files.exclude" tag in it.
In case the settings.json file already exists, just adds the "files.exlude" option in case it doesn't exist. 


### How to compile it
1. Clone the repo in you machine
2. Run `npm install`
3. Open the folder in VS Code
4. Press F5 to debug the extension

### How to use the extension
1. Press F1 and write "Too Much Information"
2. After that, a new "settings.json" file will appearr in the explorer, in the ./vscode folder
3. Add your custom rules to exclude files. For example:

`{
	"files.exclude": {
		"**/*.js" : true,
		"**/*.js.map" : true,
		"**/node_modules" : true
	}
}`

### For more information
* [Extending Visual Studio Code](https://code.visualstudio.com/docs/extensions/overview)

** Enjoy!**
