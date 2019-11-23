import * as vscode from 'vscode';
import cp = require('child_process');
import util = require('util');


export class CaproverCliService {

    private static instance: CaproverCliService;
    private exec = util.promisify(cp.exec);

    static getInstance() {

        if (this.instance === undefined) {
            this.instance = new CaproverCliService();
        }
        return this.instance;
    }

    private constructor() { }


    public async getApps(name: string, password: string) {
        return await this.apiCall("/user/apps/appDefinitions", name, password);
    }


    public async ls() {
        return await this.runCommand('caprover ls').then((response) => {
            let servers: string[] = [];
            if (response !== undefined) {
                const srvLibelle = response.stdout.split(">>");
                servers = srvLibelle.slice(1);
            }
            return servers;
        });
    }


    private async apiCall(url: string, server: string,password: string, data?: any, methode = 'GET') {
        const command = `caprover api -t "${url}" -m  "${methode}" -n "${server}" -d "{}" -p ${password}`;

        return await this.runCommand(command)
            .then((response) => {
                let data = {};
                if (response !== undefined) {
                    const startDataIndex = response.stdout.indexOf('{');
                    const strData = response.stdout.slice(startDataIndex);
                    data = JSON.parse(strData);
                }
                return data;
            });
    }


    private async runCommand(command: string): Promise<{ stdout: string; stderr: string } | undefined> {
        try {
            return await this.exec(command);
        } catch (error) {
            console.log(error);
            vscode.window.showErrorMessage('Be sure to have installed caprover locally and to be in git repository');
        }
    }
}


