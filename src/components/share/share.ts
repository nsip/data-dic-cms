import { reactive } from 'vue';
import { validStrHTMLArray, validStrTEXTArray } from './util'

class shared {

    // Entity
    entity = "";
    setEntity(val: string) {
        this.entity = val
    }

    // OtherNames
    otherNames: string[] = [];
    setOtherName(TYPE: string, val: string) {
        switch (TYPE) {
            case "html":
                this.otherNames = validStrHTMLArray(val, this.otherNames)
                break
            default:
                this.otherNames = validStrTEXTArray(val, this.otherNames)
        }
    }
    cntOtherNames() {
        return this.otherNames.length // return (ons.match(/\n/g) || []).length        
    }

    // Definition
    definition = "";
    setDefinition(val: string) {
        this.definition = val;
    }

    // SIF
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

    // OtherStandards
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
    rmOtherStdLast() {
        const m = this.cntOtherStd()
        if (this.otherStd_std.length == m) {
            this.otherStd_std.splice(-1)
        }
        if (this.otherStd_link.length == m) {
            this.otherStd_link.splice(-1)
        }
        if (this.otherStd_path.length == m) {
            this.otherStd_path.splice(-1)
        }
        if (this.otherStd_definition.length == m) {
            this.otherStd_definition.splice(-1)
        }
        if (this.otherStd_commentary.length == m) {
            this.otherStd_commentary.splice(-1)
        }
    }
    cntOtherStd() {
        return Math.max(
            this.otherStd_std.length,
            this.otherStd_link.length,
            this.otherStd_path.length,
            this.otherStd_definition.length,
            this.otherStd_commentary.length,
        )
    }

    // LegalDefinitions
    legalDef_name: string[] = [];
    setLegalDefName(val: string, idx: number) {
        this.legalDef_name[idx] = val;
    }
    legalDef_citation: string[] = [];
    setLegalDefCitation(val: string, idx: number) {
        this.legalDef_citation[idx] = val;
    }
    legalDef_link: string[] = [];
    setLegalDefLink(val: string, idx: number) {
        this.legalDef_link[idx] = val;
    }
    legalDef_definition: string[] = [];
    setLegalDefinition(val: string, idx: number) {
        this.legalDef_definition[idx] = val;
    }
    legalDef_commentary: string[] = [];
    setLegalDefCommentary(val: string, idx: number) {
        this.legalDef_commentary[idx] = val;
    }
    legalDef_datestamp: string[] = [];
    setLegalDefDateStamp(val: string, idx: number) {
        this.legalDef_datestamp[idx] = val;
    }
    rmLegalDefLast() {
        const m = this.cntLegalDef()
        if (this.legalDef_name.length == m) {
            this.legalDef_name.splice(-1)
        }
        if (this.legalDef_citation.length == m) {
            this.legalDef_citation.splice(-1)
        }
        if (this.legalDef_link.length == m) {
            this.legalDef_link.splice(-1)
        }
        if (this.legalDef_definition.length == m) {
            this.legalDef_definition.splice(-1)
        }
        if (this.legalDef_commentary.length == m) {
            this.legalDef_commentary.splice(-1)
        }
        if (this.legalDef_datestamp.length == m) {
            this.legalDef_datestamp.splice(-1)
        }
    }
    cntLegalDef() {
        return Math.max(
            this.legalDef_name.length,
            this.legalDef_citation.length,
            this.legalDef_link.length,
            this.legalDef_definition.length,
            this.legalDef_commentary.length,
            this.legalDef_datestamp.length,
        )
    }

    // Collections
    collection_name: string[] = []
    setColName(val: string, idx: number) {
        this.collection_name[idx] = val
    }
    collection_description: string[] = []
    setColDescription(val: string, idx: number) {
        this.collection_description[idx] = val
    }
    collection_standard: string[] = []
    setColStandard(val: string, idx: number) {
        this.collection_standard[idx] = val
    }
    collection_elements: string[] = []
    setColElements(val: string, idx: number) {
        this.collection_elements[idx] = val
    }
    collection_defmod: string[] = []
    setColDefmod(val: string, idx: number) {
        this.collection_defmod[idx] = val
    }
    rmColLast() {
        const m = this.cntCol()
        if (this.collection_name.length == m) {
            this.collection_name.splice(-1)
        }
        if (this.collection_description.length == m) {
            this.collection_description.splice(-1)
        }
        if (this.collection_standard.length == m) {
            this.collection_standard.splice(-1)
        }
        if (this.collection_elements.length == m) {
            this.collection_elements.splice(-1)
        }
        if (this.collection_defmod.length == m) {
            this.collection_defmod.splice(-1)
        }
    }
    cntCol() {
        return Math.max(
            this.collection_name.length,
            this.collection_description.length,
            this.collection_standard.length,
            this.collection_elements.length,
            this.collection_defmod.length,
        )
    }

    // Metadata
    meta_id = ""
    setMetaId(val: string) {
        this.meta_id = val
    }
    meta_type = ""
    setMetaType(val: string) {
        this.meta_type = val
    }
    meta_attr = ""
    setMetaAttr(val: string) {
        this.meta_attr = val
    }
    meta_superclass = ""
    setMetaSuperclass(val: string) {
        this.meta_superclass = val
    }
    meta_refentities = ""
    setMetaRefentities(val: string) {
        this.meta_refentities = val
    }
}

const gSharedTEXT = new shared()
const gSharedHTML = new shared()

export const sharedTEXT = reactive(gSharedTEXT)
export const sharedHTML = reactive(gSharedHTML)
