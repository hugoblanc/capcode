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


	// const storaga  = StorageHelper.get(context);
	// const list = new List({} as CommanderStatic);
	// const machines = list.result();
	// const setup = new ServerSetup({} as CommanderStatic);
	// // setup.build();
	// setup.action({} as IParams);
		// if(machines.length === 0){
	//}


	// const log = await login();
	const result = await initMachine();

	console.log(result);
	





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
