import { TreeItem, TreeItemCollapsibleState, Command } from "vscode";
import * as path from 'path';
import { Machine } from './machine';

export class CapNode extends TreeItem {


    type: string;
    label: string;
    iconPath: string;
    contextValue: string;
    metaData: AppDefinition | Machine;

    constructor(
        type: string,
        label: string,
        collapsibleState: TreeItemCollapsibleState,
        metaData:  AppDefinition | Machine
    ) {
        super(label, collapsibleState);
        this.label = label;
        this.type = type;
        // this.description = description;
        this.iconPath = path.join(__filename, '..', '..', '..', 'resources', 'lock.png');
        this.contextValue = type;


        this.metaData = metaData;
    }

}