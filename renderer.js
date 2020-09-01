// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

const Dexie = require('dexie')
const fs = require('fs-extra')
const path = require('path')
const { v4: uuid }  = require('uuid')

const DB_NAME = 'haha'
const DB_VERSION = 1

class Database extends Dexie {
    testData

    constructor() {
        super(DB_NAME)
        this.setupSchema()
    }

    setupSchema() {
        this.version(DB_VERSION).stores({
            testData: 'id, xx_id, xxxx_id, user, remark, level, deleted_at, created_at, xxxxxasdasd'
        })
        this.testData = this.table('testData')
    }
}

const db = new Database()

fs.readJSON(path.join(__dirname, './data.json')).then(async res => {
    for (let i = 0; i < 30; i ++) {
        res = res.map(item => ({ ...item, id: uuid() }))

        const t = Date.now()
        await db.testData.clear()
        await db.testData.bulkPut(res)
        await db.testData.toArray()
        console.log(`${i} exec cost: `, Date.now() - t)
        document.getElementById('done').innerText = String(i)
    }
})


// const item = {"xx_id":1906,"xxxx_id":349,"remark":"","level":1,"created_at":1589771067000,"deleted_at":null,"xxxxxasdasd":43,"user":{"id":349,"nickname":"hhasd sad asfhaf","avatar":"asfaf dhfhsd fhsdglsf gsgj","gender":2,"sign":"😷🌞‌😷🌞‌😷🌞‌😷🌞‌😷🌞‌😷🌞‌😷🌞‌😷🌞‌","account":"","phone":"***********","asdfsdfsdfsd_id":247,"identity_type":0,"type":0,"created_at":1568140565000,"updated_at":1598240245000,"deleted_at":null,"xxxxxxxxxx":{"xxxxxxxxxxx_id":247,"sxxxxxxxxxxxx_name":"asfafsdafasd","sadasdfasdf_name":"asfasdfasdfaf","group_name":"小程序团队","asdasdasd_id":1571,"asdsadasdas_id":9729,"position_name":"asfsdafsdfsdf"},"organizational":null,"medal":[],"member":{"id":18457,"remark":"","level":1,"asdasdas":43,"created_at":1589771067000,"deleted_at":null},"asdasd_remark":"","asdasd_is_follow":false,"sdfsdfsdf_cate_id":0,"asdasdasd_created_at":1572331081000}}
// const items = new Array(3000).fill(item)
// fs.writeJSON(path.join(__dirname, './data.json'), items)