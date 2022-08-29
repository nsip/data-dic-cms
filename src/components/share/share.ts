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
    rmOtherStdLast() {
        const m = Math.max(
            this.otherStd_std.length,
            this.otherStd_link.length,
            this.otherStd_path.length,
            this.otherStd_definition.length,
            this.otherStd_commentary.length,
        )
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

    // 
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
        const m = Math.max(
            this.legalDef_name.length,
            this.legalDef_citation.length,
            this.legalDef_link.length,
            this.legalDef_definition.length,
            this.legalDef_commentary.length,
            this.legalDef_datestamp.length,
        )
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

    // 
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
        const m = Math.max(
            this.collection_name.length,
            this.collection_description.length,
            this.collection_standard.length,
            this.collection_elements.length,
            this.collection_defmod.length,
        )
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

    //
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

/////////////////////////////////////////////

class entity {
    Name = "";
    Definition = "";
    SIF: sif = new sif()
    OtherStds: otherStd[] = [new otherStd()]
    LegalDefs: legalDef[] = [new legalDef()]
    Cols: col[] = [new col()]
    Meta: meta = new meta()

    // Name
    SetName(name: string) {
        this.Name = name
    }

    // Definition
    SetDefinition(definition: string) {
        this.Definition = definition
    }

    // SIF
    SetSIF(xpathstr: string, definition: string, commentary: string, datestamp: string) {
        this.SIF.XPath = validStrArray(xpathstr, this.SIF.XPath)
        this.SIF.Definition = validString(definition, this.SIF.Definition)
        this.SIF.Commentary = validString(commentary, this.SIF.Commentary)
        this.SIF.Datestamp = validString(datestamp, this.SIF.Datestamp)
    }

    // Other Standards
    AddOtherStd() {
        this.OtherStds.push(new otherStd())
    }
    RmOtherStdLast() {
        this.OtherStds.splice(-1)
    }
    SetOtherStd(idx: number, std: string, linkstr: string, pathstr: string, definition: string, commentary: string) {
        const os = this.OtherStds[idx]
        os.Standard = validString(std, os.Standard)
        os.Links = validStrArray(linkstr, os.Links)
        os.Paths = validStrArray(pathstr, os.Paths)
        os.Definition = validString(definition, os.Definition)
        os.Commentary = validString(commentary, os.Commentary)
    }

    // Legal Definitions
    AddLegalDef() {
        this.LegalDefs.push(new legalDef())
    }
    RmLegalDefLast() {
        this.LegalDefs.splice(-1)
    }
    SetLegalDef(idx: number, legislationName: string, citation: string, linkstr: string, definition: string, commentary: string, datestamp: string) {
        const ld = this.LegalDefs[idx]
        ld.LegislationName = validString(legislationName, ld.LegislationName)
        ld.Citation = validString(citation, ld.Citation)
        ld.Links = validStrArray(linkstr, ld.Links)
        ld.Definition = validString(definition, ld.Definition)
        ld.Commentary = validString(commentary, ld.Commentary)
        ld.Datestamp = validString(datestamp, ld.Datestamp)
    }

    // Collections
    AddCol() {
        this.Cols.push(new col())
    }
    RmColLast() {
        this.Cols.splice(-1)
    }
    SetCol(idx: number, name: string, description: string, standard: string, elementstr: string, defmod: string) {
        const c = this.Cols[idx]
        c.Name = validString(name, c.Name)
        c.Description = validString(description, c.Description)
        c.Standard = validString(standard, c.Standard)
        c.Elements = validStrArray(elementstr, c.Elements)
        c.DefMod = validString(defmod, c.DefMod)
    }

    // Meta
    SetMeta(id: string, type: string, attrstr: string, superclass: string, crossref: string) {
        this.Meta.Id = validString(id, this.Meta.Id)
        this.Meta.Type = validString(type, this.Meta.Type)
        this.Meta.Attr = validStrArray(attrstr, this.Meta.Attr)
        this.Meta.SuperClass = validString(superclass, this.Meta.SuperClass)
        this.Meta.Crossref = validStrArray(crossref, this.Meta.Crossref)
    }

    ////

    GenJSON() {
        return JSON.stringify(this, null, 2)
    }
}

class sif {
    XPath: string[] = []
    Definition = ""
    Commentary = ""
    Datestamp = ""
}

class otherStd {
    Standard = ""
    Links: string[] = []
    Paths: string[] = []
    Definition = ""
    Commentary = ""
}

class legalDef {
    LegislationName = ""
    Citation = ""
    Links: string[] = []
    Definition = ""
    Commentary = ""
    Datestamp = ""
}

class col {
    Name = ""
    Description = ""
    Standard = ""
    Elements: string[] = []
    DefMod = ""
}

class meta {
    Id = ""
    Type = ""
    Attr: string[] = []
    SuperClass = ""
    Crossref: string[] = []
}

const gEntity = new entity()

export const jsonEntity = reactive(gEntity)

/////////////////////////////////////////////

const pad2 = (n: number) => { return n < 10 ? '0' + n : n }
export const timestamp = () => {
    const date = new Date()
    return date.getFullYear().toString() + "-" + pad2(date.getMonth() + 1) + "-" + pad2(date.getDate()) + " " + pad2(date.getHours()) + ":" + pad2(date.getMinutes()) + ":" + pad2(date.getSeconds())
}

const validString = (val: string, defaultVal: string) => {
    if (val.trim().length > 0) {
        return val
    }
    return defaultVal
}

const validStrArray = (val: string, defaultArray: string[]) => {
    if (val.trim().length > 0) {
        return val.split("\n")
    }
    return defaultArray
}