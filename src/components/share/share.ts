import { reactive } from 'vue';

export const sharedTEXT = reactive({

    entity: "",
    setEntity(val: string) {
        this.entity = val;
    },

    definition: "",
    setDefinition(val: string) {
        this.definition = val;
    },

    sif: "",
    setSIF(val: string) {
        this.sif = val;
    },

    otherStd: [""],
    setOtherStd(val: string, idx: number) {
        this.otherStd[idx] = val;
    },    

    legalDef: [""],
    setLegalDef(val: string, idx: number) {
        this.legalDef[idx] = val;
    },

    collections: [""],
    setCollection(val: string, idx: number) {
        this.collections[idx] = val;
    },

    meta: "",
    setMeta(val: string) {
        this.meta = val;
    },

})

export const sharedHTML = reactive({

    entity: "",
    setEntity(val: string) {
        this.entity = val;
    },

    definition: "",
    setDefinition(val: string) {
        this.definition = val;
    },

    sif: "",
    setSIF(val: string) {
        this.sif = val;
    },

    otherStd: [""],
    setOtherStd(val: string, idx: number) {
        this.otherStd[idx] = val;
    },

    legalDef: [""],
    setLegalDef(val: string, idx: number) {
        this.legalDef[idx] = val;
    },

    collections: [""],
    setCollection(val: string, idx: number) {
        this.collections[idx] = val;
    },

    meta: "",
    setMeta(val: string) {
        this.meta = val;
    },

})

export const jsonTemplate = reactive({
    
})

const pad2 = (n: number) => { return n < 10 ? '0' + n : n }
export const timestamp = () => {
    const date = new Date()
    return date.getFullYear().toString() + "-" + pad2(date.getMonth() + 1) + "-" + pad2(date.getDate()) + " " + pad2(date.getHours()) + ":" + pad2(date.getMinutes()) + ":" + pad2(date.getSeconds())
}