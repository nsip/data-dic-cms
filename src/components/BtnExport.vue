<template>
    <div class="container">
        <div class="center">
            <button class="btn" @click="saveJSON()">{{ btnName }}</button>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import FileSaver from 'file-saver';
import { jsonHTML, jsonTEXT } from './share/json'

// npm install file-saver --save
// npm install @types/file-saver --save-dev

export default defineComponent({
    name: 'EntryExport',
    setup() {
        const btnName = "export to dictionary"
        const saveJSON = () => {

            var blobHTML = new Blob([jsonHTML.GenJSON(true)], { type: "text/plain;charset=utf-8" });
            FileSaver.saveAs(blobHTML, "dd_html_" + jsonTEXT.Entity + ".json");

            var blobTEXT = new Blob([jsonTEXT.GenJSON(false)], { type: "text/plain;charset=utf-8" });
            FileSaver.saveAs(blobTEXT, "dd_txt_" + jsonTEXT.Entity + ".json");
        }
        return {
            btnName,
            saveJSON          
        }
    }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
    height: 80px;
    position: relative;
    /* border: 1px solid lightgray; */
}

.center {
    margin: 0;
    position: absolute;
    top: 40%;
    right: 0%;
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
}

.btn {
    background-color: #058f05;
    /* Green */
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
}
</style>
