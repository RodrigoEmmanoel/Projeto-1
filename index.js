const GoogleSpreadsheet = require('google-spreadsheet')
const credentials = require('./credentials.json')
const { promisify } = require('util')
const { google } = require('googleapis');
const sheets = google.sheets('v4');
const docId = '1UE02mlsQwatTyblHat_b956Ky9KlKIVacO9NcHCy8NM'
const fs = require('fs');
const readline = require('readline');

const accessSheet = async () => {
    const doc = new GoogleSpreadsheet(docId)
    await promisify(doc.useServiceAccountAuth)(credentials)
    const info = await promisify(doc.getInfo)()
    const worksheet = info.worksheets[0]

    // getting data
    const rows = await promisify(worksheet.getRows)({})

    /*
    // iterating over the data
    rows.forEach(row => {
        console.log(row.engenhariadesoftware)
    })
    */

    // rows.forEach(row => {
    //         await promisify(worksheet.addColumn)({ _ckd7g = 10 })    
    // })
    // await promisify(worksheet.addColumns)({
    //     engenhariadesoftware : 25
    // })

    // await promisify(worksheet.values.update(('engenhariadesoftware', '25')))

    async function main() {
        const authClient = await authorize();
        const request = {
            // The ID of the spreadsheet to update.
            spreadsheetId: 'engenharia-de-software-teste',  // TODO: Update placeholder value.

            // The A1 notation of the values to update.
            range: 'engenhariadesoftware',  // TODO: Update placeholder value.

            // How the input data should be interpreted.
            engenhariadesoftware: '25',  // TODO: Update placeholder value.

            resource: {
                // TODO: Add desired properties to the request body. All existing properties
                engenhariadesoftware: '25',
                _cokwr: 'Aluno',
                _cpzh4: 'Faltas',
                _cre1l: 'P1',
                _chk2m: 'P2',
                _ciyn3: 'P3',
                _ckd7g: 'Situação',

                // will be replaced.
            },

            auth: authClient,
        };
        try {
            const response = (await sheets.spreadsheets.values.update(request)).data;
            // TODO: Change code below to process the `response` object:
            console.log(JSON.stringify(response, null, 2));
        } catch (err) {
            console.error(err);
        }
    }

    main()
    //// authorization
    async function authorize() {
        // TODO: Change placeholder below to generate authentication credentials. See
        // https://developers.google.com/sheets/quickstart/nodejs#step_3_set_up_the_sample
        //
        // Authorize using one of the following scopes:
        //   'https://www.googleapis.com/auth/drive'
        //   'https://www.googleapis.com/auth/drive.file'
        //   'https://www.googleapis.com/auth/drive.readonly'
        //   'https://www.googleapis.com/auth/spreadsheets'
        //   'https://www.googleapis.com/auth/spreadsheets.readonly'
        const { client_secret, client_id, redirect_uris } = credentials;
        const oAuth2Client = new google.auth.OAuth2(
            client_id, client_secret, redirect_uris);

        // Check if we have previously stored a token.
        fs.readFile('./credentials.json', (err, token) => {
            if (err) return getNewToken(oAuth2Client, callback);
            oAuth2Client.setCredentials(JSON.parse(token));
            callback(oAuth2Client);
        });

        let authClient = oAuth2Client;

        if (authClient == null) {
            throw Error('authentication failed');
        }

        return authClient;
    }
    // end authorization
}

accessSheet()
