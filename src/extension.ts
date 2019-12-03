// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { CapNodeProvider } from './models/capNodeProvider';
import { TemplateHelper } from './services/template.helper';
import { CapNode } from './models/capNode';




export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "capcode" is now active!');

	const capNodeProvider = new CapNodeProvider(context);
	vscode.window.createTreeView('server', { treeDataProvider: capNodeProvider });

	let disposable = vscode.commands.registerCommand('extension.setpass', async (context) => {

		console.log(context);

		// const value = await vscode.window.showInputBox();
	});



	const templateHelper = TemplateHelper.getInstance();

	vscode.commands.registerCommand('extension.showDetails', (node: CapNode) => {
		// Create and show panel
		const panel = vscode.window.createWebviewPanel(
			'catCoding',
			'Cat Coding',
			vscode.ViewColumn.One,
			{}
		);

		// And set its HTML content
		panel.webview.html = templateHelper.getTemplateFromApp(node.metaData as AppDefinition);
	});




	context.subscriptions.push(disposable);
}



// this method is called when your extension is deactivated
export function deactivate() { }
