import { Machine } from '../models/machine';
import { ContextHelper } from '../services/context.helper';
import { PopupHelper } from '../services/popup.helper';
import { WsHelper } from './../services/ws.helper';
import { action } from './login.procedure';

const popupHelper = new PopupHelper();
let contextHelper: ContextHelper;
let ws: WsHelper;

export async function initMachine(machine: Machine) {
    ws =  WsHelper.get();
    const appDefResponse: AppDefinitionResponse = await ws.get('https://captain.' + machine.host + '/api/v2/user/apps/appDefinitions', machine.token, machine.name)
        .catch(async (error) => {
            await action(machine);
        });
    return appDefResponse.data;
    // contextHelper = ContextHelper.getInstance();
    // const machines = contextHelper.getObjectsFromArrayKey(ContextHelper.MACHINE_KEY_ARRAY) as Machine[];
    // machines.forEach(m => getAppsFromMachine(m));
}