import * as vscode from 'vscode';

export class ContextHelper {

    public static instance: ContextHelper;
    public static MACHINE_KEY_ARRAY = 'MACHINE_KEY_ARRAY';

    public static getInstance(context?: vscode.ExtensionContext) {
        if (!this.instance && context) {
            this.instance = new ContextHelper(context);
        }
        return this.instance;
    }

    private constructor(private context: vscode.ExtensionContext) {
    }

    public async deleteObjectGlobally(arrayKey: string, objectKey: string){
        let array = this.getJson(arrayKey, '[]') as string[];
        array = array.filter((key) => key !== objectKey);
        await this.setJson(arrayKey, array);
        await this.set(objectKey, null);
    }

    public getObjectsFromArrayKey(arrayKey: string){
        const array = this.getJson(arrayKey, '[]') as string[];
        return array.map((key)=>this.getJson(key,undefined));        
    }

    public async push(arrayKey: string, newValue: string){
        const array = this.getJson(arrayKey, '[]') as string[];
        if(array.indexOf(newValue)===-1){
            array.push(newValue);
            await this.setJson(arrayKey, array);
        }
    }

    public getJson(key: string, defaultValue?: string | any) {
        return JSON.parse(this.get(key, defaultValue));
    }

    public setJson(key: string, object:any){
        return this.set(key, JSON.stringify(object));
    }

    public get(key: string, defaultValue: string | any = '') {
        return this.context.globalState.get(key, defaultValue);

    }

    public set(key: string, value: any) {
        return this.context.globalState.update(key, value);
    }

}