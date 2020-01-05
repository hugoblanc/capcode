import { Machine } from '../models/machine';
import { ContextHelper } from '../services/context.helper';
import { PopupHelper } from '../services/popup.helper';
import { WsHelper } from './../services/ws.helper';
import { action } from './login.procedure';

const popupHelper = new PopupHelper();
let contextHelper: ContextHelper;
const ws = WsHelper.get();

export async function initMachine(machine?: Machine) {
    contextHelper = ContextHelper.getInstance();
    if (!machine) {
        const machines = contextHelper.getObjectsFromArrayKey(ContextHelper.MACHINE_KEY_ARRAY) as Machine[];
        machines.forEach(m => getAppsFromMachine(m));
    } else {
        return getAppsFromMachine(machine);
    }
}

async function getAppsFromMachine(machine: Machine) {
    const appDefResponse: AppDefinitionResponse = await ws.get('https://captain.' + machine.host + '/api/v2/user/apps/appDefinitions', machine.token)
        .catch(async (error) => {
            await action(machine);
        });
    return appDefResponse.data;
    
}