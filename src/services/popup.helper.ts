import { InputBoxOptions, window } from 'vscode';

export class PopupHelper {

    askValue(prompt: string, placeHolder?: string, value?: string, password = false){
        const option: InputBoxOptions = {
            prompt,
            placeHolder,
            password,
            value
        };
        return window.showInputBox(option);
    }


    dealWithError(error:Error){
        if(error.name === 'RequestError'){
            return this.showError('An error occured during the request'+error.message);
        }

        return this.showError(error.message);
    }

    showError(message: string){
        return window.showErrorMessage(message);
    }

}