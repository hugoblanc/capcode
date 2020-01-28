import { TreeItem, TreeItemCollapsibleState, Command } from "vscode";
import * as path from 'path';
import { Machine } from './machine';

export class CapNode<T> extends TreeItem {

    // iconPath: string;
    contextValue: string;


    constructor(
        public type: string,
        public label: string,
        public collapsibleState: TreeItemCollapsibleState,
        public metaData:T,
        public parent?: CapNode<Machine>
    ) {
        super(label, collapsibleState);
        // this.iconPath = path.join(__filename, '..', '..', '..', 'resources', 'lock.png');
        this.contextValue = type;
    }

}