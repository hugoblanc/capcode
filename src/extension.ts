// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { CapNode } from './models/capNode';
import { CapNodeProvider } from './models/capNodeProvider';
import { login } from './procedure/login.procedure';
import { ContextHelper } from './services/context.helper';
import { TemplateHelper } from './services/template.helper';
import { initMachine } from './procedure/initmachine.procedure';




export async function activate(context: vscode.ExtensionContext) {
	const contextHelper = ContextHelper.getInstance(context);


	await initView();

	let disposable = vscode.commands.registerCommand('extension.setpass', async (context) => {
		console.log(context);
	});



	vscode.commands.registerCommand('extension.login', async (context) => {
		await login();
		await initView();
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



async function initView() {
	await initMachine();
	const capNodeProvider = new CapNodeProvider();
	vscode.window.createTreeView('server', { treeDataProvider: capNodeProvider });
}




// this method is called when your extension is deactivated
export function deactivate() { }
