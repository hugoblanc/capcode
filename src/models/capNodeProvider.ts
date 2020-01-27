import * as vscode from 'vscode';
import { TreeDataProvider, TreeItemCollapsibleState } from "vscode";
import { initMachine } from '../procedure/initmachine.procedure';
import { ContextHelper } from '../services/context.helper';
import { CapNode } from "./capNode";
import { Machine } from './machine';

export class CapNodeProvider implements TreeDataProvider<any> {
	
	contextHelper: ContextHelper;

	constructor() {

		this.contextHelper = ContextHelper.getInstance();
	}

	public async getChildren(task?: CapNode<Machine>): Promise<CapNode<AppDefinition | Machine>[]> {
		let childrens = [];
		if (task === undefined) {
			childrens = await this.getMachine();
		} else {
			childrens = await this.getServerChildren(task);
		}
		return childrens;
	}


	private async getMachine() {

		const machines = this.contextHelper.getObjectsFromArrayKey(ContextHelper.MACHINE_KEY_ARRAY) as Machine[];

		const mNodes: CapNode<Machine>[] = [];
		for (let m of machines) {
			mNodes.push(new CapNode('server', m.name, TreeItemCollapsibleState.Collapsed, m));
		}

		return mNodes;
	}

	private async getServerChildren(mNode: CapNode<Machine>) {


		const appsDefData = await initMachine(mNode.metaData as Machine);

		if(!appsDefData){
			throw new Error("Unable to get machine's app definitions");
		}

		const apps: CapNode<AppDefinition>[] = [];
	

		for (let a of appsDefData.appDefinitions) {
			apps.push(new CapNode('app', a.appName, TreeItemCollapsibleState.None, a));
		}


		return apps;
	}


	getTreeItem(task: CapNode<AppDefinition | Machine>): CapNode<AppDefinition | Machine> {
		return task;
	}
}