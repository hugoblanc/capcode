import { Machine } from '../models/machine';
import { CaptainService } from '../services/captain.service';

export async function initMachine(machine: Machine) {
    const service = CaptainService.getInstance();
    const appDefResponse: AppDefinitionResponse = await service.getAppsDefinitions(machine);
    return appDefResponse.data;
    // contextHelper = ContextHelper.getInstance();
    // const machines = contextHelper.getObjectsFromArrayKey(ContextHelper.MACHINE_KEY_ARRAY) as Machine[];
    // machines.forEach(m => getAppsFromMachine(m));

}