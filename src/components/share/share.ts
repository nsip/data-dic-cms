import { ref } from 'vue';
import { fetchBodyForm, fetchBodyJsonStr, fetchBodyObject, fetchNoBody, mEmpty } from './fetch'
import { EntityType } from './Entity';
import { CollectionType } from './Collection';

export const loginUser = ref('')
export const loginAuth = ref('')
export const itemName = ref('')
export const itemKind = ref('')

// fill loginUser
export const getUname = async () => {
    const rt = await fetchNoBody("api/user/auth/uname", "GET", mEmpty, loginAuth.value) as any[]
    if (rt[1] != 200) {
        alert(rt[0])
        return false
    }
    loginUser.value = rt[0]
    return true
}

export const postDataToDic = async (data: string) => {
    const rt = await fetchBodyJsonStr("api/dictionary/auth/upsert", "POST", mEmpty, data, loginAuth.value) as any[]
    if (rt[1] != 200) {
        alert(rt[0])
        return false
    }
    return true
}

export const getItemContent = async (name: string, kind: string, dbcol: string) => {
    const mParam = new Map<string, any>([
        ["name", name],
        ["dbcol", dbcol],
    ])
    const rt = await fetchNoBody("api/dictionary/pub/one", "GET", mParam, loginAuth.value) as any[]
    if (rt[1] != 200) {
        alert(rt[0])
        return null
    }
    switch (kind) {
        case 'entity':
            return rt[0] as EntityType
        case 'collection':
            return rt[0] as CollectionType
        default:
            return null
    }
}