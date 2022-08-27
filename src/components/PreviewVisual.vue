<template>
    <div v-html="otherStandardsContent()"></div>
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
            if (text.trim().length == 0) {
                return ""
            }
            return "<h4 style='margin-left:10px;'>" + label4 + "</h4>" + html
        }

        const nonEmptyArrayHtml = (text: string[], html: string[]) => {

            let ret = ""
            for (let i = 0; i < text.length; i++) {
                if (text[i].trim().length != 0) {
                    ret += html[i]
                }
            }
            if (ret.length == 0) {
                return ""
            }
            return ret
        }

        const entityContent = () => {
            return "<h3 style='font-size:medium; font-style:italic; text-decoration: underline'>Name</h3>" +
                nonEmptyHtml("", sharedTEXT.entity, sharedHTML.entity)
        }

        const definitionContent = () => {
            return "<h3 style='font-size:medium; font-style:italic; text-decoration: underline'>Definition</h3>" +
                nonEmptyHtml("", sharedTEXT.definition, sharedHTML.definition)
        }

        const sifContent = () => {
            return "<h3 style='font-size:medium; font-style:italic; text-decoration: underline'>SIF</h3>" +
                nonEmptyHtml("xpath:", sharedTEXT.sif_xpaths, sharedHTML.sif_xpaths) +
                nonEmptyHtml("definition:", sharedTEXT.sif_definition, sharedHTML.sif_definition) +
                nonEmptyHtml("commentary:", sharedTEXT.sif_commentary, sharedHTML.sif_commentary) +
                nonEmptyHtml("datestamp:", sharedTEXT.sif_datestamp, sharedHTML.sif_datestamp)
        }

        const otherStandardsContent = () => {
            return "<h3 style='font-size:medium; font-style:italic; text-decoration: underline'>Other Standards</h3>" +
                nonEmptyArrayHtml(sharedTEXT.otherStd_std, sharedHTML.otherStd_std) +
                nonEmptyArrayHtml(sharedTEXT.otherStd_link, sharedHTML.otherStd_link) +
                nonEmptyArrayHtml(sharedTEXT.otherStd_path, sharedHTML.otherStd_path) +
                nonEmptyArrayHtml(sharedTEXT.otherStd_definition, sharedHTML.otherStd_definition) +
                nonEmptyArrayHtml(sharedTEXT.otherStd_commentary, sharedHTML.otherStd_commentary)
        }

        const legalDefinitionContent = () => {
            return "<h3 style='font-size:medium; font-style:italic; text-decoration: underline'>Legal Definitions</h3>" +
                nonEmptyArrayHtml(sharedTEXT.legalDef, sharedHTML.legalDef)
        }

        const collectionsContent = () => {
            return "<h3 style='font-size:medium; font-style:italic; text-decoration: underline'>Collections</h3>" +
                nonEmptyArrayHtml(sharedTEXT.collections, sharedHTML.collections)
        }

        const metaContent = () => {
            return "<h3 style='font-size:medium; font-style:italic; text-decoration: underline'>Meta</h3>" +
                nonEmptyHtml("", sharedTEXT.meta, sharedHTML.meta)
        }

        const combineContent = () => {
            return entityContent() + definitionContent() + sifContent() + otherStandardsContent() + legalDefinitionContent() + collectionsContent() + metaContent()
        }

        return {
            entityContent,
            definitionContent,
            sifContent,
            otherStandardsContent,
            legalDefinitionContent,
            collectionsContent,
            metaContent,
            // all
            combineContent
        }
    }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
