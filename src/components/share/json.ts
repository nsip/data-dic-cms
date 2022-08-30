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
        this.Entity = name
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

    // Definition
    SetDefinition(definition: string) {
        this.Definition = definition
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
    SetOtherStd(TYPE: string, idx: number, std: string, linkStr: string, pathStr: string, definition: string, commentary: string) {
        const os = this.OtherStandards[idx]

        if (os == undefined) {
            alert(this.OtherStandards.length)
        }

        os.Standard = validString(std, os.Standard)
        os.Definition = validString(definition, os.Definition)
        os.Commentary = validString(commentary, os.Commentary)
        switch (TYPE) {
            case "html":
                os.Link = validStrHTMLArray(linkStr, os.Link)
                os.Path = validStrHTMLArray(pathStr, os.Path)
                break
            default:
                os.Link = validStrTEXTArray(linkStr, os.Link)
                os.Path = validStrTEXTArray(pathStr, os.Path)
        }
    }

    // Legal Definitions
    AddLegalDef() {
        this.LegalDefinitions.push(new legalDef())
    }
    RmLegalDefLast() {
        this.LegalDefinitions.splice(-1)
    }
    SetLegalDef(TYPE: string, idx: number, legislationName: string, citation: string, linkStr: string, definition: string, commentary: string, datestamp: string) {
        const ld = this.LegalDefinitions[idx]
        ld.LegislationName = validString(legislationName, ld.LegislationName)
        ld.Citation = validString(citation, ld.Citation)
        ld.Definition = validString(definition, ld.Definition)
        ld.Commentary = validString(commentary, ld.Commentary)
        ld.Datestamp = validString(datestamp, ld.Datestamp)
        switch (TYPE) {
            case "html":
                ld.Link = validStrHTMLArray(linkStr, ld.Link)
                break
            default:
                ld.Link = validStrTEXTArray(linkStr, ld.Link)
        }
    }

    // Collections
    AddCol() {
        this.Collections.push(new col())
    }
    RmColLast() {
        this.Collections.splice(-1)
    }
    SetCol(TYPE: string, idx: number, name: string, description: string, standard: string, elementStr: string, defmod: string) {
        const c = this.Collections[idx]
        c.Name = validString(name, c.Name)
        c.Description = validString(description, c.Description)
        c.Standard = validString(standard, c.Standard)
        c.DefinitionModification = validString(defmod, c.DefinitionModification)
        switch (TYPE) {
            case "html":
                c.Elements = validStrHTMLArray(elementStr, c.Elements)
                break
            default:
                c.Elements = validStrTEXTArray(elementStr, c.Elements)
        }
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

    GenJSON(htmlType: boolean) {
        let json = JSON.stringify(this, null, 2)
        if (htmlType) {
            json = json.replaceAll("<p><br></p>", "")
            json = json.replaceAll(/<h\d><br><\/h\d>/g, "")
        } else {
            json = json.replaceAll("\"\\n\"", "\"\"")
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

const gEntityHTML = new entity()
const gEntityTEXT = new entity()

export const jsonHTML = reactive(gEntityHTML)
export const jsonTEXT = reactive(gEntityTEXT)