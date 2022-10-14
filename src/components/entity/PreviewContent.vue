<template>
    <div v-html="wholeContent()"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { jsonEntityTEXT, jsonEntityHTML } from '../share/EntityType';

export default defineComponent({
    name: 'PreviewContent',
    // props: {
    //     msg: String,
    // },
    setup() {

        const nonEmptyHtml = (label4: string, text: string, html: string) => {

            // if (label4 == ">> xpath:") {
            //     console.log("text:", text)
            //     console.log("html:", html)
            // }

            if (text == undefined || text.trim().length == 0) {
                return ""
            }

            html = html.replaceAll("<p><br></p>", "")
            html = html.replaceAll(/<h\d><br><\/h\d>/g, "")

            if (label4 == undefined || label4.length == 0) {
                return html
            }
            return "<h4 style='margin-left:10px; font-style:italic'>" + label4 + "</h4>" + html
        }

        /////////////////////////////////////////////////

        const previewEntity = () => {
            return "<h3 style='font-size:medium; font-style:italic; background-color: lightgray'>>>> Entity</h3>" +
                nonEmptyHtml("", jsonEntityTEXT.Entity, jsonEntityHTML.Entity)
        }

        const previewOtherNames = () => {
            const head = "<h3 style='font-size:medium; font-style:italic; background-color: lightgray'>>>> Other Names</h3>"
            const n = jsonEntityTEXT.CntOtherName()
            const eles: string[] = []
            for (let i = 0; i < n; i++) {
                const ele = nonEmptyHtml("", jsonEntityTEXT.OtherNames[i], jsonEntityHTML.OtherNames[i])
                eles.push(ele)
            }
            const body = eles.join("")
            if (body.length > 0) {
                return head + body
            }
            return head
        }

        const previewDefinition = () => {
            return "<h3 style='font-size:medium; font-style:italic; background-color: lightgray'>>>> Definition</h3>" +
                nonEmptyHtml("", jsonEntityTEXT.Definition, jsonEntityHTML.Definition)
        }

        const previewSIF = () => {
            const head = "<h3 style='font-size:medium; font-style:italic; background-color: lightgray'>>>> SIF</h3>"
            const n = jsonEntityTEXT.CntSIF()
            let eles: string[] = []
            for (let i = 0; i < n; i++) {
                const jt = jsonEntityTEXT.SIF[i]
                const jh = jsonEntityHTML.SIF[i]
                eles[i] = ""
                eles[i] += nonEmptyHtml(">> xpath:", jt.XPath.join(""), jh.XPath.join(""))
                eles[i] += nonEmptyHtml(">> definition:", jt.Definition, jh.Definition)
                eles[i] += nonEmptyHtml(">> commentary:", jt.Commentary, jh.Commentary)
                eles[i] += nonEmptyHtml(">> datestamp:", jt.Datestamp, jh.Datestamp)
            }
            const body = eles.join("<hr style='border-top: 1px dashed;'>")
            if (body.length > 0) {
                return head + body
            }
            return head
        }

        const previewOtherStandards = () => {
            const head = "<h3 style='font-size:medium; font-style:italic; background-color: lightgray'>>>> Other Standards</h3>"
            const n = jsonEntityTEXT.CntOtherStd()
            let eles: string[] = []
            for (let i = 0; i < n; i++) {
                const jt = jsonEntityTEXT.OtherStandards[i]
                const jh = jsonEntityHTML.OtherStandards[i]
                eles[i] = ""
                eles[i] += nonEmptyHtml(">> standard:", jt.Standard, jh.Standard)
                eles[i] += nonEmptyHtml(">> link:", jt.Link.join(""), jh.Link.join(""))
                eles[i] += nonEmptyHtml(">> path:", jt.Path.join(""), jh.Path.join(""))
                eles[i] += nonEmptyHtml(">> definition:", jt.Definition, jh.Definition)
                eles[i] += nonEmptyHtml(">> commentary:", jt.Commentary, jh.Commentary)
            }
            const body = eles.join("<hr style='border-top: 1px dashed;'>")
            if (body.length > 0) {
                return head + body
            }
            return head
        }

        const previewLegalDefinition = () => {
            const head = "<h3 style='font-size:medium; font-style:italic; background-color: lightgray'>>>> Legal Definitions</h3>"
            const n = jsonEntityTEXT.CntLegalDef()
            let eles: string[] = []
            for (let i = 0; i < n; i++) {
                const jt = jsonEntityTEXT.LegalDefinitions[i]
                const jh = jsonEntityHTML.LegalDefinitions[i]
                eles[i] = ""
                eles[i] += nonEmptyHtml(">> legislationName:", jt.LegislationName, jh.LegislationName)
                eles[i] += nonEmptyHtml(">> citation:", jt.Citation, jh.Citation)
                eles[i] += nonEmptyHtml(">> link:", jt.Link, jh.Link)
                eles[i] += nonEmptyHtml(">> definition:", jt.Definition, jh.Definition)
                eles[i] += nonEmptyHtml(">> commentary:", jt.Commentary, jh.Commentary)
                eles[i] += nonEmptyHtml(">> datestamp:", jt.Datestamp, jh.Datestamp)
            }
            const body = eles.join("<hr style='border-top: 1px dashed;'>")
            if (body.length > 0) {
                return head + body
            }
            return head
        }

        const previewCollections = () => {
            const head = "<h3 style='font-size:medium; font-style:italic; background-color: lightgray'>>>> Collections</h3>"
            const n = jsonEntityTEXT.CntCol()
            let eles: string[] = []
            for (let i = 0; i < n; i++) {
                const jt = jsonEntityTEXT.Collections[i]
                const jh = jsonEntityHTML.Collections[i]
                eles[i] = ""
                eles[i] += nonEmptyHtml(">> name:", jt.Name, jh.Name)
                eles[i] += nonEmptyHtml(">> description:", jt.Description, jh.Description)
                eles[i] += nonEmptyHtml(">> standard:", jt.Standard, jh.Standard)
                eles[i] += nonEmptyHtml(">> elements:", jt.Elements.join(""), jh.Elements.join(""))
                eles[i] += nonEmptyHtml(">> definition modification:", jt.DefinitionModification, jh.DefinitionModification)
            }
            const body = eles.join("<hr style='border-top: 1px dashed;'>")
            if (body.length > 0) {
                return head + body
            }
            return head
        }

        const previewMetadata = () => {
            const jt = jsonEntityTEXT.Metadata
            const jh = jsonEntityHTML.Metadata
            return "<h3 style='font-size:medium; font-style:italic; background-color: lightgray'>>>> Meta Data</h3>" +
                nonEmptyHtml(">> identifier:", jt.Identifier, jh.Identifier) +
                nonEmptyHtml(">> type:", jt.Type, jh.Type) +
                nonEmptyHtml(">> expected attributes:", jt.ExpectedAttributes.join(""), jh.ExpectedAttributes.join("")) +
                nonEmptyHtml(">> superclass:", jt.Superclass.join(""), jh.Superclass.join("")) +
                nonEmptyHtml(">> cross ref entities:", jt.CrossrefEntities.join(""), jh.CrossrefEntities.join(""))
        }

        //////////

        const wholeContent = () => {
            return previewEntity() +
                previewOtherNames() +
                previewDefinition() +
                previewSIF() +
                previewOtherStandards() +
                previewLegalDefinition() +
                previewCollections() +
                previewMetadata()
        }

        return {
            wholeContent
        }
    }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
