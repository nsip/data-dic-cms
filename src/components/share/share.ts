import { reactive } from 'vue';

class shared {

    entity = "";
    setEntity(val: string) {
        this.entity = val
    }

    // 

    definition = "";
    setDefinition(val: string) {
        this.definition = val;
    }

    // 

    sif_xpaths = "";
    setSIFXPaths(val: string) {
        this.sif_xpaths = val
    }
    sif_definition = "";
    setSIFDefinition(val: string) {
        this.sif_definition = val
    }
    sif_commentary = "";
    setSIFCommentary(val: string) {
        this.sif_commentary = val
    }
    sif_datestamp = "";
    setSIFDatestamp(val: string) {
        this.sif_datestamp = val
    }

    // 

    otherStd_std: string[] = [];
    setOtherStd(val: string, i: number) {
        this.otherStd_std[i] = val;
    }
    otherStd_link: string[] = [];
    setOtherStdLink(val: string, i: number) {
        this.otherStd_link[i] = val;
    }
    otherStd_path: string[] = [];
    setOtherStdPath(val: string, i: number) {
        this.otherStd_path[i] = val;
    }
    otherStd_definition: string[] = [];
    setOtherStdDefinition(val: string, i: number) {
        this.otherStd_definition[i] = val;
    }
    otherStd_commentary: string[] = [];
    setOtherStdCommentary(val: string, i: number) {
        this.otherStd_commentary[i] = val;
    }

    // 

    legalDef: string[] = [];
    setLegalDef(val: string, idx: number) {
        this.legalDef[idx] = val;
    }

    // 

    collections: string[] = [];
    setCollection(val: string, idx: number) {
        this.collections[idx] = val;
    }

    // 

    meta = "";
    setMeta(val: string) {
        this.meta = val;
    }
}

const gSharedTEXT = new shared()
const gSharedHTML = new shared()

export const sharedTEXT = reactive(gSharedTEXT)
export const sharedHTML = reactive(gSharedHTML)


export const jsonTemplate = reactive({

})

const pad2 = (n: number) => { return n < 10 ? '0' + n : n }
export const timestamp = () => {
    const date = new Date()
    return date.getFullYear().toString() + "-" + pad2(date.getMonth() + 1) + "-" + pad2(date.getDate()) + " " + pad2(date.getHours()) + ":" + pad2(date.getMinutes()) + ":" + pad2(date.getSeconds())
}