import { Machine } from '../models/machine';
import { CaptainService } from '../services/captain.service';

export async function getAppDatas(app: AppDefinition, machine: Machine) {
    const service = CaptainService.getInstance();

    const appDefResponse: AppDataResponse = await service.getAppDatas(app,machine);
    console.log(appDefResponse.data);
    return appDefResponse.data;
}