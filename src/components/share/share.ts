import { ref } from 'vue';
import { fetchBodyForm, fetchBodyJsonStr, fetchBodyObject, fetchNoBody, mEmpty } from './fetch'

export const loginOK = ref(false)
export const loginUser = ref('')
let loginAuth = ''

export const postLogin = async (uname: string, pwd: string) => {

    const mForm = new Map<string, any>([
        ["uname", uname],
        ["pwd", pwd],
    ])
    const rt = await fetchBodyForm(`/api/sign/in`, "POST", mEmpty, mForm, loginAuth) as any[]
    if (rt[1] != 200) {
        alert(rt[0])
        return false
    }
    loginAuth = rt[0].auth
    return true
}

export const postRegister = async (email: string, pwd: string) => {

    const mForm = new Map<string, any>([
        ["uname", email.split("@")[0]],
        ["email", email],
        ["pwd", pwd],
    ])
    const rt = await fetchBodyForm(`/api/sign/new`, "POST", mEmpty, mForm, loginAuth) as any[]
    if (rt[1] != 200) {
        alert(rt[0])
        return false
    }
    return true
}

export const postDataToDic = async (data: string) => {

    const rt = (await fetchBodyJsonStr("api/dictionary/auth/upsert", "POST", mEmpty, data, loginAuth)) as any[]
    if (rt[1] != 200) {
        alert(rt[0])
        return false
    }
    return true
}