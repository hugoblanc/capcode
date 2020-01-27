import * as vscode from 'vscode';
import { CapNode } from './models/capNode';
import { CapNodeProvider } from './models/capNodeProvider';
import { login } from './procedure/login.procedure';
import { ContextHelper } from './services/context.helper';
import { TemplateHelper } from './services/template.helper';
import { Machine } from './models/machine';




export async function activate(context: vscode.ExtensionContext) {
	const contextHelper = ContextHelper.getInstance(context);




	const disposable = [];
	disposable.push(vscode.commands.registerCommand('extension.setpass', async (context) => {
		console.log(context);
	}));



	disposable.push(vscode.commands.registerCommand('extension.login', async (context) => {
		await login();
		await initView();
	}));


	disposable.push(vscode.commands.registerCommand('extension.logout', async (context: CapNode<Machine>) => {
		await contextHelper.deleteObjectGlobally(ContextHelper.MACHINE_KEY_ARRAY, context.metaData.name);
		await initView();
	}));



	const templateHelper = TemplateHelper.getInstance();

	disposable.push(vscode.commands.registerCommand('extension.showDetails', (node: CapNode<AppDefinition>) => {
		// Create and show panel
		const panel = vscode.window.createWebviewPanel(
			'catCoding',
			'Cat Coding',
			vscode.ViewColumn.One,
			{}
		);
		// And set its HTML content
		panel.webview.html = templateHelper.getTemplateFromApp(node.metaData as AppDefinition);
	}));


	context.subscriptions.push(...disposable);


	await initView();
}



async function initView() {
	const capNodeProvider = new CapNodeProvider();
	vscode.window.createTreeView('server', { treeDataProvider: capNodeProvider });
}




// this method is called when your extension is deactivated
export function deactivate() { }
