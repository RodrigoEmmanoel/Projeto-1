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
    await promisify(worksheet.addColumns)({
        engenhariadesoftware : 25
    })

    // await promisify(worksheet.values.update(('engenhariadesoftware', '25')))


}

accessSheet()
