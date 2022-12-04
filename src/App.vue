<template>
    <div v-if="disp">
        <MainTitle />
        <div id="container">
            <div id="left">
                <EntryEnt v-if="kind    ==    'entity'" />
                <EntryCol v-if="kind    ==    'collection'" />
            </div>
            <div id="right">
                <Preview :Kind="kind" />
            </div>
        </div>
        <BtnExport />
        <BtnExit />
    </div>
</template>

<script setup lang="ts">

import { onMounted, ref } from "vue";
import { Mode, loginAuth, loginToken, loginUser, getUname, itemName, itemKind, getItemContent } from "@/share/share";
import { EntType, jsonEntHTML, jsonEntTEXT } from "@/share/EntType";
import { ColType, jsonColHTML, jsonColTEXT } from "@/share/ColType";
import MainTitle from "@/components/shared/PageTitle.vue";
import Preview from "@/components/shared/PreviewArea.vue";
import BtnExport from "@/components/shared/BtnExport.vue";
import BtnExit from "@/components/shared/BtnExit.vue";
import EntryEnt from "@/components/entity/EntryEnt.vue";
import EntryCol from "@/components/collection/EntryCol.vue";

let disp = ref(false);

// ref: https://www.samanthaming.com/tidbits/86-window-location-cheatsheet/

const pName = window.location.href.indexOf("name=");
const pKind = window.location.href.indexOf("kind=");
const pAuth = window.location.href.indexOf("auth=");

// alert(`${pName} : ${pKind} : ${pAuth}`)

const name = pName >= 0 ? decodeURI(window.location.href.substring(pName + 5, pKind - 1)) : "";
const kind = pKind >= 0 ? decodeURI(window.location.href.substring(pKind + 5, pAuth - 1)) : "";
const auth = pAuth >= 0 ? decodeURI(window.location.href.substring(pAuth + 5)) : "";

loginToken.value = auth;
loginAuth.value = "Bearer " + auth;

itemName.value = name;
itemKind.value = kind;

onMounted(async () => {

    if (loginToken.value.length < 32) {

        alert("invalid auth info");
        disp.value = false;

    } else {

        // fill loginUser, already 'ping' back-end api

        getUname(); // in this, need to read 'loginAuth.value'

        await new Promise((f) => setTimeout(f, 500));

        if (loginUser.value.length > 0) {
            disp.value = true;

            if (name.length > 0 && kind.length > 0) {
                // *** edit mode ***

                Mode.value = "edit";

                // console.log("edit mode");
                // console.log(`${name} : ${kind}`)

                switch (kind) {
                    case "entity":
                        {
                            const entity = (await getItemContent(name, kind, "existing")) as EntType;
                            const eh = jsonEntHTML
                            const et = jsonEntTEXT

                            eh.AssignName("html", entity.Entity);
                            eh.AssignOtherNames("html", entity.OtherNames);
                            eh.AssignDefinition("html", entity.Definition);
                            eh.AssignSIF("html", entity.SIF);
                            eh.AssignOtherStd("html", entity.OtherStandards);
                            eh.AssignLegalDef("html", entity.LegalDefinitions);
                            eh.AssignCol("html", entity.Collections);
                            eh.AssignMeta("html", entity.Metadata);

                            et.AssignName("text", entity.Entity);
                            et.AssignOtherNames("text", entity.OtherNames);
                            et.AssignDefinition("text", entity.Definition);
                            et.AssignSIF("text", entity.SIF);
                            et.AssignOtherStd("text", entity.OtherStandards);
                            et.AssignLegalDef("text", entity.LegalDefinitions);
                            et.AssignCol("text", entity.Collections);
                            et.AssignMeta("text", entity.Metadata);
                        }
                        break;

                    case "collection":
                        {
                            const collection = (await getItemContent(name, kind, "existing")) as ColType;
                            const ch = jsonColHTML
                            const ct = jsonColTEXT

                            ch.AssignName("html", collection.Entity);
                            ch.AssignDefinition("html", collection.Definition);
                            ch.AssignUrls("html", collection.URL);
                            ch.AssignMeta("html", collection.Metadata);
                            ch.AssignEntities("html", collection.Entities);

                            ct.AssignName("text", collection.Entity);
                            ct.AssignDefinition("text", collection.Definition);
                            ct.AssignUrls("text", collection.URL);
                            ct.AssignMeta("text", collection.Metadata);
                            ct.AssignEntities("text", collection.Entities);
                        }
                        break;

                    default:
                }

            } else {
                // *** create mode ***

                Mode.value = "new";

                // console.log("new mode");
            }
        }
    }
});

</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: left;
    color: #2c3e50;
    margin-top: 10px;
}

/* layout */

#container {
    height: 100%;
    width: 100%;
    display: flex;
    /* margin-top: -10px; */
}

#left {
    width: 50%;
    margin-right: 0.4%;
    overflow: scroll;
    scrollbar-width: none;
    /*   display: flex;
  flex-direction: column; */
}

#left::-webkit-scrollbar {
    display: none;
}

#right {
    width: 50%;
    margin-left: 0.4%;
    background-color: rgb(220, 220, 220);
    overflow: scroll;
    scrollbar-width: none;
    /*overflow-y: scroll;
background-color: rgb(220, 220, 220); */
}

#right::-webkit-scrollbar {
    display: none;
}

/*  */

.line1 {
    width: 100%;
    text-align: left;
    margin-left: 0;
    margin-top: 10px;
    color: #2c3e50;
}

.line2 {
    width: 90%;
    text-align: left;
    margin-right: 0;
    margin-top: 20px;
    /* border-top: 1px dotted black;
border-bottom: 1px dotted black; */
}

/* components shared */

.com {
    border: 1px solid;
    padding: 10px;
    box-shadow: 5px 5px 5px 5px lightgray;
    /* x 偏移量 | y 偏移量 | 阴影模糊半径 | 阴影扩散半径 | 阴影颜色 */
}

.label {
    font-weight: bold;
    font-size: 16px;
    font-style: italic;
    color: rgb(90, 90, 90);
    margin-left: 1%;
    margin-bottom: 10px;
    display: inline-block;
    /* set span */
}

.hint1 {
    font-weight: normal;
    font-size: 13px;
    font-style: italic;
    color: rgb(120, 120, 120);
    position: absolute;
    left: 140px;
    margin-top: 3px;
    display: inline-block;
    /* set span */
    cursor: pointer;
}

.hint2 {
    font-weight: normal;
    font-size: 13px;
    font-style: italic;
    color: rgb(120, 120, 120);
    margin-left: 2%;
    margin-bottom: 10px;
    display: inline-block;
    /* set span */
    cursor: pointer;
}

.more-editor {
    font-size: medium;
    color: red;
    background-color: white;
    float: right;
    margin-right: 1px;
    margin-bottom: 5px;
    width: 22px;
    border: none;
}

.less-editor {
    font-size: medium;
    color: green;
    background-color: white;
    float: right;
    margin-right: 1px;
    margin-bottom: 5px;
    width: 22px;
    border: none;
}

.hide-editor {
    font-size: medium;
    float: right;
    color: blue;
    background-color: white;
    margin-bottom: 5px;
    width: 22px;
    border: none;
}
</style>
