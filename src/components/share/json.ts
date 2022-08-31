import { reactive } from 'vue';
import { validString, validStrHTMLArray, validStrTEXTArray } from './util'

class entity {
    Entity = "";
    OtherNames: string[] = []
    Definition = "";
    SIF: sif = new sif()
    OtherStandards: otherStd[] = [new otherStd()]
    LegalDefinitions: legalDef[] = [new legalDef()]
    Collections: col[] = [new col()]
    Metadata: meta = new meta()

    // Name
    SetName(name: string) {
        this.Entity = validString(name, this.Entity)
    }

    // Other Names
    SetOtherName(TYPE: string, nameStr: string) {
        switch (TYPE) {
            case "html":
                this.OtherNames = validStrHTMLArray(nameStr, this.OtherNames)
                break
            default:
                this.OtherNames = validStrTEXTArray(nameStr, this.OtherNames)                
        }
    }
    CntOtherName() {
        return this.OtherNames.length
    }

    // Definition
    SetDefinition(definition: string) {
        this.Definition = validString(definition, this.Definition)
    }

    // SIF
    SetSIF(TYPE: string, xpathStr: string, definition: string, commentary: string, datestamp: string) {
        switch (TYPE) {
            case "html":
                this.SIF.XPath = validStrHTMLArray(xpathStr, this.SIF.XPath)
                break
            default:
                this.SIF.XPath = validStrTEXTArray(xpathStr, this.SIF.XPath)
        }
        this.SIF.Definition = validString(definition, this.SIF.Definition)
        this.SIF.Commentary = validString(commentary, this.SIF.Commentary)
        this.SIF.Datestamp = validString(datestamp, this.SIF.Datestamp)
    }

    // Other Standards
    AddOtherStd() {
        this.OtherStandards.push(new otherStd())
    }
    RmOtherStdLast() {
        this.OtherStandards.splice(-1)
    }
    SetOtherStd(TYPE: string, i: number, std: string, linkStr: string, pathStr: string, definition: string, commentary: string) {
        const ele = this.OtherStandards[i]

        ele.Standard = validString(std, ele.Standard)
        ele.Definition = validString(definition, ele.Definition)
        ele.Commentary = validString(commentary, ele.Commentary)
        switch (TYPE) {
            case "html":
                ele.Link = validStrHTMLArray(linkStr, ele.Link)
                ele.Path = validStrHTMLArray(pathStr, ele.Path)
                break
            default:
                ele.Link = validStrTEXTArray(linkStr, ele.Link)
                ele.Path = validStrTEXTArray(pathStr, ele.Path)
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
        return this.IsOtherStdEmpty(n-1)
    }

    // Legal Definitions
    AddLegalDef() {
        this.LegalDefinitions.push(new legalDef())
    }
    RmLegalDefLast() {
        this.LegalDefinitions.splice(-1)
    }
    SetLegalDef(TYPE: string, i: number, legislationName: string, citation: string, linkStr: string, definition: string, commentary: string, datestamp: string) {
        const ele = this.LegalDefinitions[i]

        ele.LegislationName = validString(legislationName, ele.LegislationName)
        ele.Citation = validString(citation, ele.Citation)
        ele.Definition = validString(definition, ele.Definition)
        ele.Commentary = validString(commentary, ele.Commentary)
        ele.Datestamp = validString(datestamp, ele.Datestamp)
        switch (TYPE) {
            case "html":
                ele.Link = validStrHTMLArray(linkStr, ele.Link)
                break
            default:
                ele.Link = validStrTEXTArray(linkStr, ele.Link)
        }
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
        return this.IsLegalDefEmpty(n-1)
    }

    // Collections
    AddCol() {
        this.Collections.push(new col())
    }
    RmColLast() {
        this.Collections.splice(-1)
    }
    SetCol(TYPE: string, i: number, name: string, description: string, standard: string, elementStr: string, defmod: string) {
        const ele = this.Collections[i]

        ele.Name = validString(name, ele.Name)
        ele.Description = validString(description, ele.Description)
        ele.Standard = validString(standard, ele.Standard)
        ele.DefinitionModification = validString(defmod, ele.DefinitionModification)
        switch (TYPE) {
            case "html":
                ele.Elements = validStrHTMLArray(elementStr, ele.Elements)
                break
            default:
                ele.Elements = validStrTEXTArray(elementStr, ele.Elements)
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
        return this.IsColEmpty(n-1)
    }

    // Meta Data
    SetMeta(TYPE: string, id: string, type: string, attrStr: string, superclass: string, crossref: string) {
        this.Metadata.Identifier = validString(id, this.Metadata.Identifier)
        this.Metadata.Type = validString(type, this.Metadata.Type)
        this.Metadata.Superclass = validString(superclass, this.Metadata.Superclass)
        switch (TYPE) {
            case "html":
                this.Metadata.ExpectedAttributes = validStrHTMLArray(attrStr, this.Metadata.ExpectedAttributes)
                this.Metadata.CrossrefEntities = validStrHTMLArray(crossref, this.Metadata.CrossrefEntities)
                break
            default:
                this.Metadata.ExpectedAttributes = validStrTEXTArray(attrStr, this.Metadata.ExpectedAttributes)
                this.Metadata.CrossrefEntities = validStrTEXTArray(crossref, this.Metadata.CrossrefEntities)
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
    Link: string[] = []
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
    Superclass = ""
    CrossrefEntities: string[] = []
}

export const jsonHTML = reactive(new entity())
export const jsonTEXT = reactive(new entity())