import * as  request from 'request-promise';
import { action } from '../procedure/login.procedure';
import { ContextHelper } from './context.helper';
export class WsHelper {



    private static TOKEN_HEADER = 'x-captain-auth';
    private static NAMESPACE = 'x-namespace';
    private static CAPTAIN = 'captain';


    public static instance: WsHelper;
    private contextHelper: ContextHelper;

    public static getInstance() {
        if (!this.instance) {
            this.instance = new WsHelper();
        }
        return this.instance;
    }

    private constructor() {
        this.contextHelper = ContextHelper.getInstance();
    }



    public async get(uri: string, token?: string, name?: string) {
        const option: request.RequestPromiseOptions = {
            headers: this.createHeaders(token),
            json: true
        };
        const response = await request.get(uri, option);
        if (response.status === 1106 && name) {
            await this.regenToken(name);
            return request.get(uri, option);
        }
        console.log();
        return response;
    }


    public post(uri: string, data: any, token?: string) {
        const option: request.RequestPromiseOptions = {
            headers: this.createHeaders(token),
            body: data,
            json: true
        };
        return request.post(uri, option);
    }



    private async regenToken(name: string) {
        const machine = this.contextHelper.getJson(name);
        await action(machine);
    }




    // getAuthToken(password: string) {
    //     const http = this.http
    //     ApiManager.lastKnownPassword = password
    //     let authTokenFetched = ''

    //     const self = this
    //     return Promise.resolve() //
    //         .then(http.fetch(http.POST, '/login', { password }))
    //         .then(function(data) {
    //             authTokenFetched = data.token
    //             self.setAuthToken(authTokenFetched)
    //             return authTokenFetched
    //         })
    //         .then(self.authTokenSaver)
    //         .then(function() {
    //             return authTokenFetched
    //         })
    // }

    private createHeaders(token?: string) {
        let headers: any = {};
        if (token) { headers[WsHelper.TOKEN_HEADER] = token; }
        headers[WsHelper.NAMESPACE] = WsHelper.CAPTAIN;

        // check user/appData or apiManager.uploadAppData before changing this signature.
        return headers;
    }



}