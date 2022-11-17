import { reactive } from "vue";
import {
    cvtHtml2Plain,
    cvtArrayHtml2Plain,
    validStr,
    validStrHTMLArr,
    validStrTEXTArr,
} from "./util";

export class CollectionType {
    Collection = "";
    Definition = "";
    Url: string[] = [];
    Metadata: metaType = new metaType();
    Entities: string[] = [];

    //
    // Name ---------------------------------------------------------
    //

    SetName(name: string) {
        this.Collection = validStr(name, this.Collection);
    }

    AssignName(TYPE: string, name: string) {
        switch (TYPE) {
            case "html":
                this.Collection = name;
                break;
            default:
                this.Collection = cvtHtml2Plain(name);
        }
    }

    //
    // Definition ---------------------------------------------------
    //

    SetDefinition(definition: string) {
        this.Definition = validStr(definition, this.Definition);
    }

    AssignDefinition(TYPE: string, definition: string) {
        switch (TYPE) {
            case "html":
                this.Definition = definition;
                break;
            default:
                this.Definition = cvtHtml2Plain(definition);
        }
    }

    //
    // Url ---------------------------------------------------
    //

    SetUrl(urlStr: string) {
        this.Url = validStrTEXTArr(urlStr, this.Url);
    }

    CntUrl() {
        return this.Url.length;
    }

    AssignUrls(TYPE: string, urls: string[]) {
        switch (TYPE) {
            case "html":
                this.Url = urls != null ? urls : EmptyStrArr;
                break;
            default:
                this.Url = urls != null ? cvtArrayHtml2Plain(urls) : EmptyStrArr;
        }
    }

    //
    // Meta Data ---------------------------------------------------
    //

    SetMeta(id: string, type: string) {
        this.Metadata.Identifier = validStr(id, this.Metadata.Identifier);
        this.Metadata.Type = validStr(type, this.Metadata.Type);
    }

    AssignMeta(TYPE: string, meta: metaType) {
        switch (TYPE) {
            case "html":
                this.Metadata = meta != null ? meta : new metaType();
                break;
            default:
                this.Metadata = meta != null ? this.PlainMeta(meta) : new metaType();
        }
    }

    PlainMeta(meta: metaType) {
        const m = new metaType();
        m.Identifier = cvtHtml2Plain(meta.Identifier);
        m.Type = cvtHtml2Plain(meta.Type);
        return m;
    }

    //
    // Entities ---------------------------------------------------
    //

    SetEntities(entitiesStr: string) {
        this.Entities = validStrTEXTArr(entitiesStr, this.Entities);
    }

    CntEntities() {
        return this.Entities.length;
    }

    AssignEntities(TYPE: string, entities: string[]) {
        switch (TYPE) {
            case "html":
                this.Entities = entities != null ? entities : EmptyStrArr;
                break;
            default:
                this.Entities =
                    entities != null ? cvtArrayHtml2Plain(entities) : EmptyStrArr;
        }
    }
}

class metaType {
    Identifier = "";
    Type = "";
}

const EmptyStrArr: string[] = [];

export const jsonCollectionHTML = reactive(new CollectionType());
export const jsonCollectionTEXT = reactive(new CollectionType());
