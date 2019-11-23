import { TreeItem, TreeItemCollapsibleState, Command } from "vscode";

export class CapNode extends TreeItem {


    type: string;
    label: string;

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
    }

}