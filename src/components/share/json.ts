import { reactive } from 'vue';
import { validStr, validStrHTMLArr, validStrTEXTArr } from './util'

class entity {
    Entity = "";
    OtherNames: string[] = []
    Definition = "";
    SIF: sif[] = [new sif()]
    OtherStandards: otherStd[] = [new otherStd()]
    LegalDefinitions: legalDef[] = [new legalDef()]
    Collections: col[] = [new col()]
    Metadata: meta = new meta()

    // Name ---------------------------------------------------------

    SetName(name: string) {
        this.Entity = validStr(name, this.Entity)
    }

    // Other Names --------------------------------------------------

    SetOtherName(TYPE: string, nameStr: string) {
        switch (TYPE) {
            case "html":
                this.OtherNames = validStrHTMLArr(nameStr, this.OtherNames)
                break
            default:
                this.OtherNames = validStrTEXTArr(nameStr, this.OtherNames)
        }
    }
    CntOtherName() {
        return this.OtherNames.length
    }

    // Definition ---------------------------------------------------

    SetDefinition(definition: string) {
        this.Definition = validStr(definition, this.Definition)
    }

    // SIF ----------------------------------------------------------

    AddSIF() {
        this.SIF.push(new sif())
    }
    RmSIFLast() {
        this.SIF.splice(-1)
    }
    SetSIF(TYPE: string, i: number, xpathStr: string, definition: string, commentary: string, datestamp: string) {
        const ele = this.SIF[i]
        ele.Definition = validStr(definition, ele.Definition)
        ele.Commentary = validStr(commentary, ele.Commentary)
        ele.Datestamp = validStr(datestamp, ele.Datestamp)
        switch (TYPE) {
            case "html":
                ele.XPath = validStrHTMLArr(xpathStr, ele.XPath)
                break
            default:
                ele.XPath = validStrTEXTArr(xpathStr, ele.XPath)
        }
    }
    CntSIF() {
        return this.SIF.length
    }
    IsSIFEmpty(i: number) {
        const ele = this.SIF[i]
        if (ele == undefined) {
            return true
        }
        return ele.XPath.length == 0 &&
            ele.Definition.trim().length == 0 &&
            ele.Commentary.trim().length == 0 &&
            ele.Datestamp.trim().length == 0
    }
    IsLastSIFEmpty() {
        const n = this.CntSIF()
        return this.IsSIFEmpty(n - 1)
    }

    // Other Standards ----------------------------------------------

    AddOtherStd() {
        this.OtherStandards.push(new otherStd())
    }
    RmOtherStdLast() {
        this.OtherStandards.splice(-1)
    }
    SetOtherStd(TYPE: string, i: number, std: string, linkStr: string, pathStr: string, definition: string, commentary: string) {
        const ele = this.OtherStandards[i]
        ele.Standard = validStr(std, ele.Standard)
        ele.Definition = validStr(definition, ele.Definition)
        ele.Commentary = validStr(commentary, ele.Commentary)
        switch (TYPE) {
            case "html":
                ele.Link = validStrHTMLArr(linkStr, ele.Link)
                ele.Path = validStrHTMLArr(pathStr, ele.Path)
                break
            default:
                ele.Link = validStrTEXTArr(linkStr, ele.Link)
                ele.Path = validStrTEXTArr(pathStr, ele.Path)
        }
    }
    CntOtherStd() {
        return this.OtherStandards.length
    }
    IsOtherStdEmpty(i: number) {
        const ele = this.OtherStandards[i]
        if (ele == undefined) {
            return true
        }
        return ele.Standard.trim().length == 0 &&
            ele.Definition.trim().length == 0 &&
            ele.Commentary.trim().length == 0 &&
            ele.Link.length == 0 &&
            ele.Path.length == 0
    }
    IsLastOtherStdEmpty() {
        const n = this.CntOtherStd()
        return this.IsOtherStdEmpty(n - 1)
    }

    // Legal Definitions --------------------------------------------

    AddLegalDef() {
        this.LegalDefinitions.push(new legalDef())
    }
    RmLegalDefLast() {
        this.LegalDefinitions.splice(-1)
    }
    SetLegalDef(i: number, legislationName: string, citation: string, linkStr: string, definition: string, commentary: string, datestamp: string) {
        const ele = this.LegalDefinitions[i]
        ele.LegislationName = validStr(legislationName, ele.LegislationName)
        ele.Citation = validStr(citation, ele.Citation)
        ele.Definition = validStr(definition, ele.Definition)
        ele.Link = validStr(linkStr, ele.Link)
        ele.Commentary = validStr(commentary, ele.Commentary)
        ele.Datestamp = validStr(datestamp, ele.Datestamp)
    }
    CntLegalDef() {
        return this.LegalDefinitions.length
    }
    IsLegalDefEmpty(i: number) {
        const ele = this.LegalDefinitions[i]
        if (ele == undefined) {
            return true
        }
        return ele.LegislationName.trim().length == 0 &&
            ele.Definition.trim().length == 0 &&
            ele.Commentary.trim().length == 0 &&
            ele.Citation.trim().length == 0 &&
            ele.Datestamp.trim().length == 0 &&
            ele.Link.length == 0
    }
    IsLastLegalDefEmpty() {
        const n = this.CntLegalDef()
        return this.IsLegalDefEmpty(n - 1)
    }

    // Collections --------------------------------------------------

    AddCol() {
        this.Collections.push(new col())
    }
    RmColLast() {
        this.Collections.splice(-1)
    }
    SetCol(TYPE: string, i: number, name: string, description: string, standard: string, elementStr: string, defmod: string) {
        const ele = this.Collections[i]
        ele.Name = validStr(name, ele.Name)
        ele.Description = validStr(description, ele.Description)
        ele.Standard = validStr(standard, ele.Standard)
        ele.DefinitionModification = validStr(defmod, ele.DefinitionModification)
        switch (TYPE) {
            case "html":
                ele.Elements = validStrHTMLArr(elementStr, ele.Elements)
                break
            default:
                ele.Elements = validStrTEXTArr(elementStr, ele.Elements)
        }
    }
    CntCol() {
        return this.Collections.length
    }
    IsColEmpty(i: number) {
        const ele = this.Collections[i]
        if (ele == undefined) {
            return true
        }
        return ele.Standard.trim().length == 0 &&
            ele.Name.trim().length == 0 &&
            ele.Description.trim().length == 0 &&
            ele.DefinitionModification.trim().length == 0 &&
            ele.Elements.length == 0
    }
    IsLastColEmpty() {
        const n = this.CntCol()
        return this.IsColEmpty(n - 1)
    }

    // Meta Data ----------------------------------------------------

    SetMeta(TYPE: string, id: string, type: string, attrStr: string, superclass: string, crossref: string) {
        this.Metadata.Identifier = validStr(id, this.Metadata.Identifier)
        this.Metadata.Type = validStr(type, this.Metadata.Type)
        switch (TYPE) {
            case "html":
                this.Metadata.Superclass = validStrHTMLArr(superclass, this.Metadata.Superclass)
                this.Metadata.ExpectedAttributes = validStrHTMLArr(attrStr, this.Metadata.ExpectedAttributes)
                this.Metadata.CrossrefEntities = validStrHTMLArr(crossref, this.Metadata.CrossrefEntities)
                break
            default:
                this.Metadata.Superclass = validStrTEXTArr(superclass, this.Metadata.Superclass)
                this.Metadata.ExpectedAttributes = validStrTEXTArr(attrStr, this.Metadata.ExpectedAttributes)
                this.Metadata.CrossrefEntities = validStrTEXTArr(crossref, this.Metadata.CrossrefEntities)
        }
    }

    ////

    GenJSON(htmlValue: boolean) {
        let json = JSON.stringify(this, null, 2)
        if (htmlValue) {
            json = json.replaceAll("<p><br></p>", "")
            json = json.replaceAll(/<p>\s*<\/p>/g, "")
            json = json.replaceAll(/<h\d><br><\/h\d>/g, "")
            json = json.replaceAll(/<h\d>\s*<\/h\d>/g, "")
        } else {
            json = json.replaceAll(/"\s*\\n"/g, "\"\"")
        }
        json = json.replaceAll(/\[\s*""\s*\]/g, "[]")
        return json
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
    Link: string[] = []
    Path: string[] = []
    Definition = ""
    Commentary = ""
}

class legalDef {
    LegislationName = ""
    Citation = ""
    Link = ""
    Definition = ""
    Commentary = ""
    Datestamp = ""
}

class col {
    Name = ""
    Description = ""
    Standard = ""
    Elements: string[] = []
    DefinitionModification = ""
}

class meta {
    Identifier = ""
    Type = ""
    ExpectedAttributes: string[] = []
    Superclass: string[] = []
    CrossrefEntities: string[] = []
}

export const jsonHTML = reactive(new entity())
export const jsonTEXT = reactive(new entity())