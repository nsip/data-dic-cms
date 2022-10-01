import { ref } from 'vue';
import { fetchBodyForm, fetchBodyJsonStr, fetchBodyObject, fetchNoBody, mEmpty } from './fetch'

export const loginOK = ref(false)
export const loginUser = ref('')
export const loginAuth = ref('')

export const postLogin = async (uname: string, pwd: string) => {

    const mForm = new Map<string, any>([
        ["uname", uname],
        ["pwd", pwd],
    ])
    const rt = await fetchBodyForm(`/api/user/sign-in`, "POST", mEmpty, mForm, '') as any[]
    if (rt[1] != 200) {
        alert(rt[0])
        return false
    }
    loginAuth.value = rt[0].auth
    return true
}

export const postRegister = async (uname: string, email: string, pwd: string) => {

    const mForm = new Map<string, any>([
        ["uname", uname],
        ["email", email],
        ["pwd", pwd],
    ])
    const rt = await fetchBodyForm(`/api/user/sign-up`, "POST", mEmpty, mForm, '') as any[]
    if (rt[1] != 200) {
        alert(rt[0])
        return false
    }
    return true
}

export const postDataToDic = async (data: string) => {

    const rt = (await fetchBodyJsonStr("api/dictionary/auth/upsert", "POST", mEmpty, data, loginAuth.value)) as any[]
    if (rt[1] != 200) {
        alert(rt[0])
        return false
    }
    return true
}