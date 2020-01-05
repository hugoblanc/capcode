import * as  request from 'request-promise';
export class WsHelper {



    private static TOKEN_HEADER = 'x-captain-auth';
    private static NAMESPACE = 'x-namespace';
    private static CAPTAIN = 'captain';


    public static instance: WsHelper;

    public static get() {
        if (!this.instance) {
            this.instance = new WsHelper();
        }
        return this.instance;
    }

    private constructor() {

    }



    public get(uri: string, token?: string) {
        const option: request.RequestPromiseOptions = {
            headers: this.createHeaders(token),
            json: true
        };
        return request.get(uri, option);
    }
    
    
    public post(uri: string, data: any, token?: string) {
        const option: request.RequestPromiseOptions = {
            headers: this.createHeaders(token),
            body: data,
            json: true
        };
        return request.post(uri, option);
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