import { Machine } from '../models/machine';
import { CaptainService } from '../services/captain.service';
import { ContextHelper } from '../services/context.helper';
import { PopupHelper } from '../services/popup.helper';

const popupHelper = new PopupHelper();
export async function login() {
	const params = await askParams();
	await action(params);
}


async function askParams() {
	const host = await popupHelper.askValue(
		'Please enter the root domaine',
		'ex: root.domaine.com'
	);

	const password = await popupHelper.askValue(
		'Now, enter the server password',
		'ex: captain42',
		undefined,
		true
	);


	const domaineArray = host?.split('.');
	let defaultName;
	if (domaineArray && domaineArray?.length > 1) {
		defaultName = domaineArray[domaineArray.length - 2];
	}
	const name = await popupHelper.askValue(
		'Finally, enter the machine name',
		'ex: mycaptain',
		defaultName
	);

	if (!(host && password && name)) {
		await popupHelper.showError("Some values are missing, I can't log you like that !");
		throw new Error('invalide values');
	}

	return { host, password, name };

}


export async function action({ host, password, name }: any) {
	const service = CaptainService.getInstance();
	const contextHelper = ContextHelper.getInstance();
	
	try {
		const result = await service.login(host, password);
		const token = result?.data?.token;
		if (token) {
			const loggedMachine = new Machine(name, host, password, token);
			// Save machine
			await contextHelper.setJson(loggedMachine.name, loggedMachine);
			// Add machine to list of known machine
			await contextHelper.push(ContextHelper.MACHINE_KEY_ARRAY, loggedMachine.name);
		} else {
			await popupHelper.showError("Unable to connect " + result?.description);
		}
	} catch (error) {
		popupHelper.dealWithError(error);
	}
}