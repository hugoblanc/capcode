import { AxiosResponse } from 'axios';
import { TreeDataProvider, TreeItem, ExtensionContext, TreeItemCollapsibleState } from "vscode";
import { CapNode } from "./capNode";
import { CaproverCliService } from '../services/caprovercli.service';
import * as vscode from 'vscode';

export class CapNodeProvider implements TreeDataProvider<any> {

	capcliService: CaproverCliService;
	context: vscode.ExtensionContext;
	constructor(context: vscode.ExtensionContext) {
		this.capcliService = CaproverCliService.getInstance();
		this.context = context;
	}

	public async getChildren(task?: CapNode): Promise<CapNode[]> {
		let childrens: CapNode[] = [];
		if (task === undefined) {
			childrens = await this.getServer();
		} else {
			childrens = await this.getServerChildren(task);
		}
		return childrens;
	}


	private async getServer() {
		const servers: CapNode[] = [];
		const result = await this.capcliService.ls();
		for (let s of result) {
			const srvDescription = s.split(' at ');
			servers.push(new CapNode(
				'server',
				srvDescription[0],
				TreeItemCollapsibleState.Collapsed)
			);
		}
		return servers;
	}

	private async getServerChildren(server: CapNode) {
		const apps: CapNode[] = [];
		let password = this.context.globalState.get(server.label, '');
		if (password === '') {
			const value = await vscode.window.showInputBox();
			if(value === undefined){
				vscode.window.showErrorMessage('Your password is necessary to access captain\'s informations');
				return [];
			}
		}
		password = 'okorkk';
		const appDefs = await this.capcliService.getApps(server.label, password) as AppDefinitionData;
		
		for (let a of appDefs.appDefinitions) {
			apps.push(new CapNode('app', a.appName, TreeItemCollapsibleState.None, a.nodeId));
		}
		this.context.globalState.update(server.label, password);
		return apps;
	}


	getTreeItem(task: CapNode): CapNode {
		return task;
	}
}