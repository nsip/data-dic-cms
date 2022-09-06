const ip = "http://127.0.0.1:1323/"

export const emptyM = new Map<string, any>()

export const fetchBodyForm = async (path: string, method: string, mQuery: Map<string, any>, mForm: Map<string, any>) => {

    let url = ip + path.replace(/^\/+/, "")
    let payload: any

    if (mQuery.size > 0) {
        const qryParams = new URLSearchParams()
        mQuery.forEach((v, k) => { qryParams.append(k, v) })
        url += "?" + qryParams
    }

    if (mForm.size > 0) {
        const formData = new FormData()
        mForm.forEach((v, k) => { formData.append(k, v) });
        payload = formData
    }

    const resp = await fetch(url, {
        method: method,
        // headers: {
        //     'Accept': 'application/json',
        //     'Content-Type': 'multipart/form-data'
        // },
        body: payload
    });

    return await resp.text()
}

// const mForm = new Map<string, any>()
// mForm.set("database", "myDb")
// mForm.set("collection", "myCol")
// let rt = await fetchBodyForm("api/entity/db", "PUT", emptyM, mForm)
// console.log(rt)

export const fetchBodyJsonStr = async (path: string, method: string, mQuery: Map<string, any>, payload: string) => {
    let url = ip + path.replace(/^\/+/, "")

    if (mQuery.size > 0) {
        const qryParams = new URLSearchParams()
        mQuery.forEach((v, k) => { qryParams.append(k, v) })
        url += "?" + qryParams
    }

    const resp = await fetch(url, {
        method: method,
        // headers: {
        //     'Accept': 'application/json',
        //     'Content-Type': 'application/json'
        // },
        body: payload
    });

    return await resp.text()
}

export const fetchBodyObject = async (path: string, method: string, mQuery: Map<string, any>, body: any) => {
    let url = ip + path.replace(/^\/+/, "")
    let payload: any

    if (mQuery.size > 0) {
        const qryParams = new URLSearchParams()
        mQuery.forEach((v, k) => { qryParams.append(k, v) })
        url += "?" + qryParams
    }

    if (body != undefined && body != null) {
        const jsonBody = JSON.stringify(body)
        if (jsonBody.length > 0) {
            payload = jsonBody
        }
    }

    const resp = await fetch(url, {
        method: method,
        // headers: {
        //     'Accept': 'application/json',
        //     'Content-Type': 'application/json'
        // },
        body: payload
    });

    return await resp.text()
}