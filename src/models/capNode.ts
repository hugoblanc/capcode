import { TreeItem, TreeItemCollapsibleState, Command } from "vscode";
import * as path from 'path';
import { Machine } from './machine';

export class CapNode<T> extends TreeItem {


    type: string;
    label: string;
    iconPath: string;
    contextValue: string;
    metaData: T;

    constructor(
        type: string,
        label: string,
        collapsibleState: TreeItemCollapsibleState,
        metaData:T
    ) {
        super(label, collapsibleState);
        this.label = label;
        this.type = type;
        this.iconPath = path.join(__filename, '..', '..', '..', 'resources', 'lock.png');
        this.contextValue = type;
        this.metaData = metaData;
    }

}