

export class TemplateHelper {
    // singleton shit
    private static instance: TemplateHelper;
    static getInstance() {
        if (this.instance === undefined) {
            this.instance = new TemplateHelper();
        }
        return this.instance;
    }
    private constructor() { }


    private static BODY_CONTENT = 'BODY_CONTENT';

    private static SKELETON = `<!DOCTYPE html>
                                <html lang="en">
                                    <head>
                                        <meta charset="UTF-8">
                                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                        <title>Cat Coding</title>
                                    </head>
                                    <body>
                                    <div style="margin:5% 20%; padding:2%;box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);" >

                                        ${TemplateHelper.BODY_CONTENT}
                                        </div>
                                    </body>
                                </html>`;





    getTemplateFromApp(app: AppDefinition): string {
        let body = '';


        if (app.description) {
            body = this.titleDescriptionSection('Description', app.description);
        }

        body += this.boolSection(
            'Data persitence',
            app.hasPersistentData,
            'The application has data persitence activated ',
            `The application doesn't has data persitance activated`);

        body += this.boolSection(
            'Application exposed',
            app.notExposeAsWebApp,
            'The application is not exposed',
            `The application is exposed to internet`);

        if (app.envVars && app.envVars.length > 0) {
            body += this.titleDescriptionSection('Environnement variables');
            body += this.generateTable(app.envVars);
        }


        return this.injectBodyContent(body);


    }






    /**
     * Methode used to générate title / description section 
     * @param title's section
     * @param description's value (optional)
     */
    private titleDescriptionSection(title: string, description?: string): string {
        let result = `<h2> ${title} </h2>`;

        if (description !== undefined && description.length > 2) {
            result += `
            <p> ${description} </p>`;
        }

        return result;
    }


    /**
     * A methode used to create a bloc of code depending on boolean indicator
     * @param title's section
     * @param indicator boolean value to indicate something or the opposite
     * @param isTrue le sentence to display when indicator is true
     * @param isFalse the sentence to display when indicator is false
     */
    private boolSection(title: string, indicator: boolean, isTrue: string, isFalse: string): string {
        let result = `
        <h2>${title}</h2>
        <i> ${indicator ? isTrue : isFalse}</i>`;
        return result;
    }





    private generateTable(elements: any[]) {
        if (elements === undefined || !(elements.length > 0)) {
            return '';
        }

        let result = `
        <table style="width:50%">
        <tr>
        `;
        for (let key in elements[0]) {
            if (elements[0].hasOwnProperty(key)) {
                result += ` <th> <b> ${key} </b> </th>  `;
            }
        }

        result += ` </tr>`;



        for (let e of elements) {
            result += `<tr>`;
            for (let key in e) {
                if (e.hasOwnProperty(key)) {
                    result += ` <td>${e[key]} </td>  `;
                }
            }
            result += `</tr>`;
        }

        result += `</table>`;

        return result;

    }



    private injectBodyContent(content: string) {
        return TemplateHelper.SKELETON.replace(TemplateHelper.BODY_CONTENT, content);
    }


}


