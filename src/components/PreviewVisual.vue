<template>
    <div v-html="combineContent()"></div>
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
        const nonEmptyHtml = (label: string, text: string, html: string) => {
            if (text.trim().length == 0) {
                return ""
            }
            return "<h3>" + label + "</h3>" + html
        }
        const nonEmptyArrayHtml = (label: string, text: string[], html: string[]) => {
            let ret = ""
            for (let i = 0; i < text.length; i++) {
                if (text[i].trim().length != 0) {
                    ret += html[i]
                }
            }
            if (ret.length == 0) {
                return ""
            }
            return "<h3>" + label + "</h3>" + ret
        }
        const combineContent = () => {
            let ret = nonEmptyHtml("Name:", sharedTEXT.entity, sharedHTML.entity) +
                nonEmptyHtml("Definition:", sharedTEXT.definition, sharedHTML.definition) +
                nonEmptyHtml("SIF:", sharedTEXT.sif, sharedHTML.sif) +
                nonEmptyArrayHtml("Other Standards:", sharedTEXT.otherStd, sharedHTML.otherStd) +
                nonEmptyArrayHtml("Legal Definitions:", sharedTEXT.legalDef, sharedHTML.legalDef) +
                nonEmptyArrayHtml("Collections:", sharedTEXT.collections, sharedHTML.collections) +
                nonEmptyHtml("Meta:", sharedTEXT.meta, sharedHTML.meta)
            return ret
        }
        return {
            combineContent
        }
    }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
