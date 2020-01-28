import { Machine } from '../models/machine';
import { WsHelper } from './ws.helper';
import { CapNode } from '../models/capNode';




export class CaptainService {

    private static instance: CaptainService;
    private wsHelper: WsHelper;

    static getInstance() {
        if (!CaptainService.instance) {
            CaptainService.instance = new CaptainService();
        }
        return CaptainService.instance;
    }

    private constructor() {
        this.wsHelper = WsHelper.getInstance();
    }

    login(host: string, password: string) {
        return this.wsHelper.post('https://captain.' + host + '/api/v2/login', { password });
    }

    getAppsDefinitions(machine: Machine) {
        return this.wsHelper.get('https://captain.' + machine.host + '/api/v2/user/apps/appDefinitions', machine.token, machine.name);
    }

    getAppDatas(app: AppDefinition, machine: Machine) {
        return this.wsHelper.get('https://captain.' + machine.host + '/api/v2/user/apps/appData' + app.appName, machine.token, machine.name);
    }


}