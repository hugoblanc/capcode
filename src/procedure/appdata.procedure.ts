import { CaptainService } from '../services/captain.service';
import { CapNode } from '../models/capNode';
import { Machine } from '../models/machine';

export async function appData(app: AppDefinition, machine: Machine) {
    const service = CaptainService.getInstance();

    const appDefResponse: AppDefinitionResponse = await service.getAppDatas(app,machine);
    return appDefResponse.data;
}