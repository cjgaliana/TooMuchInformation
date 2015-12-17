import * as vscode from 'vscode';

var fs = require('fs');
var path = require('path');


export class TMI {

	private vscodeFolder = ".vscode";
	private vscodeSettingsFile = "settings.json";
	private excludeTag = "files.exclude";

    public Run() {
		let fullPath = path.join(this.vscodeFolder, this.vscodeSettingsFile);
		console.log('Checking if file ' + fullPath + ' exists');

		if (this.fileExists(fullPath)) {
			console.log('File exists: ' + fullPath);
			this.ensureExcludeSettingExists(fullPath);
		}
		else {
			console.log('File doesnt exist: ' + fullPath);
			this.createSettingsFile(fullPath);
		}
    }

	private createSettingsFile(filePath: string) {
		this.ensureVscodeDirectoryExists();
		
		// The file does not exist. So create it
		let emptyJson = JSON.parse("{}");
		console.log("Empty json: " + JSON.stringify(emptyJson));
		let data = this.createExcludeSetting(emptyJson);
		this.saveFile(data, filePath);
	}

	private ensureVscodeDirectoryExists() {
		try {
			let stat = fs.statSync(this.vscodeFolder);
			if (!stat.isDirectory()) {
				let result = fs.mkdirSync(this.vscodeFolder);
				console.log("Creating vscode folder");
			}
			else {
				console.log("vscode folder exists");
			}
		}
		catch (e) {
			try {
				let result = fs.mkdirSync(this.vscodeFolder);
				console.log("Creating vscode folder");
			}
			catch (err)
			{ 
				console.log("Exception creating folder\n" + JSON.stringify(err)); 
			}
		}
	}


	private fileExists(filePath: string): boolean {
		try {
			let stat = fs.statSync(filePath);

			if (stat.isFile()) {
				return true;
			}

			return false;
		}
		catch (e) {
			// console.log("Exception checking if file exists" + JSON.stringify(e));
			return false;
		}
	}

	private ensureExcludeSettingExists(filePath: string) {
		let content = this.readFileContent(filePath);
		let json = JSON.parse(content);

		if (json[this.excludeTag] != undefined) {
			this.showNotification('You folder already contains the exclude settings for vscode');
		}
		else {
			console.log(this.excludeTag + ' does not exist');
			json[this.excludeTag] = "";
			json = this.createExcludeSetting(json);
			this.saveFile(json, filePath);
		}
	}

	private readFileContent(filePath: string): string {
		let fileContent = fs.readFileSync(filePath, 'utf8');
		return fileContent;
	}

	private createExcludeSetting(json: JSON): JSON {
		json[this.excludeTag] =
			{
				"**/node_modules": false
				// Add more rules here
			};
		return json;
	}

	private saveFile(json: JSON, filePath: string) {
		this.ensureFileExists(filePath);
		fs.writeFile(filePath, JSON.stringify(json), this.onFileUpdated);
	}

	private ensureFileExists(filePath: string) {
		fs.writeFile(filePath, "", function(err) {
			if (err) {
				console.log(err);
			}
		});
	}

	private onFileUpdated(err) {
		if (err) {
			// this.showNotification('Error updating the file');
			vscode.window.showInformationMessage('Error updating the file');
			console.log(err);
		}
		else {
			// this.showNotification('Your settings.json file has been updated');
			vscode.window.showInformationMessage('Your settings.json file has been updated');
		}
	}

	private showNotification(message: string) {
		// Display a message box to the user
		vscode.window.showInformationMessage(message);
	}
}
