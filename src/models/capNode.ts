import { TreeItem, TreeItemCollapsibleState, Command } from "vscode";
import * as path from 'path';

export class CapNode extends TreeItem {


    type: string;
    label: string;
    iconPath: string;
    contextValue: string;

    constructor(
        type: string,
        label: string,
        collapsibleState: TreeItemCollapsibleState,
        description?: string,
        command?: Command
    ) {
        super(label, collapsibleState);
        this.label = label;
        this.type = type;
        this.command = command;
        this.description = description;
        this.iconPath = path.join(__filename, '..', '..', '..', 'resources', 'lock.png');
        this.contextValue = type;
    }

}