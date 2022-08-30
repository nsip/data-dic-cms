<template>
    <div v-html="wholeContent()"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { sharedHTML, sharedTEXT } from './share/share'

export default defineComponent({
    name: 'PreviewVisual',
    // props: {
    //     msg: String,
    // },
    setup() {

        const nonEmptyHtml = (label4: string, text: string, html: string) => {
            
            // if (label4 == "-- xpath:") {
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

        const entityPreviewHTML = () => {
            return "<h3 style='font-size:medium; font-style:italic; background-color: lightgray'>--- Entity ---</h3>" +
                nonEmptyHtml("", sharedTEXT.entity, sharedHTML.entity)
        }

        const otherNamesPreviewHTML = () => {
            const head = "<h3 style='font-size:medium; font-style:italic; background-color: lightgray'>--- Other Names ---</h3>"
            const n = sharedTEXT.cntOtherNames()            
            const eles: string[] = []
            for (let i = 0; i < n; i++) {
                const ele = nonEmptyHtml("", sharedTEXT.otherNames[i], sharedHTML.otherNames[i])
                eles.push(ele)
            }            
            const body = eles.join("")
            if (body.length > 0) {
                return head + body
            }
            return head
        }

        const definitionPreviewHTML = () => {
            return "<h3 style='font-size:medium; font-style:italic; background-color: lightgray'>--- Definition ---</h3>" +
                nonEmptyHtml("", sharedTEXT.definition, sharedHTML.definition)
        }

        const sifPreviewHTML = () => {
            return "<h3 style='font-size:medium; font-style:italic; background-color: lightgray'>--- SIF ---</h3>" +
                nonEmptyHtml("-- xpath:", sharedTEXT.sif_xpaths, sharedHTML.sif_xpaths) +
                nonEmptyHtml("-- definition:", sharedTEXT.sif_definition, sharedHTML.sif_definition) +
                nonEmptyHtml("-- commentary:", sharedTEXT.sif_commentary, sharedHTML.sif_commentary) +
                nonEmptyHtml("-- datestamp:", sharedTEXT.sif_datestamp, sharedHTML.sif_datestamp)
        }

        const otherStandardsPreviewHTML = () => {
            const head = "<h3 style='font-size:medium; font-style:italic; background-color: lightgray'>--- Other Standards ---</h3>"
            const n = sharedTEXT.cntOtherStd()
            let eles: string[] = []
            for (let i = 0; i < n; i++) {
                eles[i] = ""
                eles[i] += nonEmptyHtml("-- standard:", sharedTEXT.otherStd_std[i], sharedHTML.otherStd_std[i])
                eles[i] += nonEmptyHtml("-- link:", sharedTEXT.otherStd_link[i], sharedHTML.otherStd_link[i])
                eles[i] += nonEmptyHtml("-- path:", sharedTEXT.otherStd_path[i], sharedHTML.otherStd_path[i])
                eles[i] += nonEmptyHtml("-- definition:", sharedTEXT.otherStd_definition[i], sharedHTML.otherStd_definition[i])
                eles[i] += nonEmptyHtml("-- commentary:", sharedTEXT.otherStd_commentary[i], sharedHTML.otherStd_commentary[i])
            }
            const body = eles.join("<hr style='border-top: 1px dashed;'>")
            if (body.length > 0) {
                return head + body
            }
            return head
        }

        const legalDefinitionPreviewHTML = () => {
            const head = "<h3 style='font-size:medium; font-style:italic; background-color: lightgray'>--- Legal Definitions ---</h3>"
            const n = sharedTEXT.cntLegalDef()
            let eles: string[] = []
            for (let i = 0; i < n; i++) {
                eles[i] = ""
                eles[i] += nonEmptyHtml("-- legislationName:", sharedTEXT.legalDef_name[i], sharedHTML.legalDef_name[i])
                eles[i] += nonEmptyHtml("-- citation:", sharedTEXT.legalDef_citation[i], sharedHTML.legalDef_citation[i])
                eles[i] += nonEmptyHtml("-- link:", sharedTEXT.legalDef_link[i], sharedHTML.legalDef_link[i])
                eles[i] += nonEmptyHtml("-- definition:", sharedTEXT.legalDef_definition[i], sharedHTML.legalDef_definition[i])
                eles[i] += nonEmptyHtml("-- commentary:", sharedTEXT.legalDef_commentary[i], sharedHTML.legalDef_commentary[i])
                eles[i] += nonEmptyHtml("-- datestamp:", sharedTEXT.legalDef_datestamp[i], sharedHTML.legalDef_datestamp[i])
            }
            const body = eles.join("<hr style='border-top: 1px dashed;'>")
            if (body.length > 0) {
                return head + body
            }
            return head
        }

        const collectionsPreviewHTML = () => {
            const head = "<h3 style='font-size:medium; font-style:italic; background-color: lightgray'>--- Collections ---</h3>"
            const n = sharedTEXT.cntCol()
            let eles: string[] = []
            for (let i = 0; i < n; i++) {
                eles[i] = ""
                eles[i] += nonEmptyHtml("-- name:", sharedTEXT.collection_name[i], sharedHTML.collection_name[i])
                eles[i] += nonEmptyHtml("-- description:", sharedTEXT.collection_description[i], sharedHTML.collection_description[i])
                eles[i] += nonEmptyHtml("-- standard:", sharedTEXT.collection_standard[i], sharedHTML.collection_standard[i])
                eles[i] += nonEmptyHtml("-- elements:", sharedTEXT.collection_elements[i], sharedHTML.collection_elements[i])
                eles[i] += nonEmptyHtml("-- definition modification:", sharedTEXT.collection_defmod[i], sharedHTML.collection_defmod[i])
            }
            const body = eles.join("<hr style='border-top: 1px dashed;'>")
            if (body.length > 0) {
                return head + body
            }
            return head
        }

        const metaPreviewHTML = () => {
            return "<h3 style='font-size:medium; font-style:italic; background-color: lightgray'>--- Meta Data ---</h3>" +
                nonEmptyHtml("-- identifier:", sharedTEXT.meta_id, sharedHTML.meta_id) +
                nonEmptyHtml("-- type:", sharedTEXT.meta_type, sharedHTML.meta_type) +
                nonEmptyHtml("-- expected attributes:", sharedTEXT.meta_attr, sharedHTML.meta_attr) +
                nonEmptyHtml("-- superclass:", sharedTEXT.meta_superclass, sharedHTML.meta_superclass) +
                nonEmptyHtml("-- cross ref entities:", sharedTEXT.meta_refentities, sharedHTML.meta_refentities)
        }

        //////////

        const wholeContent = () => {
            return entityPreviewHTML() +
                otherNamesPreviewHTML() +
                definitionPreviewHTML() +
                sifPreviewHTML() +
                otherStandardsPreviewHTML() +
                legalDefinitionPreviewHTML() +
                collectionsPreviewHTML() +
                metaPreviewHTML()
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
