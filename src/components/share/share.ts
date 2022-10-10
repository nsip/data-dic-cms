import { ref } from 'vue';
import { fetchBodyForm, fetchBodyJsonStr, fetchBodyObject, fetchNoBody, mEmpty } from './fetch'

export const loginUser = ref('')
export const loginAuth = ref('')
export const itemName = ref('')
export const itemKind = ref('')

// fill loginUser
export const getUname = async (auth: string) => {
    const rt = (await fetchNoBody("api/user/auth/uname", "GET", mEmpty, auth)) as any[]
    if (rt[1] != 200) {
        alert(rt[0])
        return false
    }
    loginUser.value = rt[0]
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