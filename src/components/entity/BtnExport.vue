<template>
    <a class="float" @click="saveJSON()">
        <font-awesome-icon icon="check" class="floating" />
    </a>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { jsonEntityHTML, jsonEntityTEXT } from '../share/EntityType'
import { postDataToDic } from '../share/share'
// import FileSaver from 'file-saver';

// npm install file-saver --save
// npm install @types/file-saver --save-dev

// npm install --save @fortawesome/fontawesome-svg-core 
// npm install --save @fortawesome/free-solid-svg-icons 
// npm install --save @fortawesome/vue-fontawesome@prerelease

export default defineComponent({
    name: 'EntryExport',
    setup() {
        const btnName = "export to dictionary"

        // const ckeditor = document.createElement('script');
        // ckeditor.setAttribute('src', "https://use.fontawesome.com/536e0c9b50.js");
        // document.head.appendChild(ckeditor);

        const saveJSON = async () => {

            // const htmlValData = jsonEntityHTML.GenJSON(true)
            // const textValData = jsonEntityTEXT.GenJSON(false)

            // var blobHTML = new Blob([htmlValData], { type: "text/plain;charset=utf-8" });
            // FileSaver.saveAs(blobHTML, "dd_html_" + jsonEntityTEXT.Entity + ".json");

            // var blobTEXT = new Blob([textValData], { type: "text/plain;charset=utf-8" });
            // FileSaver.saveAs(blobTEXT, "dd_txt_" + jsonEntityTEXT.Entity + ".json");

            //////////////////////////////////////////////////

            const textValData = jsonEntityTEXT.GenJSON(false)
            const okText = await postDataToDic(textValData)
            if (!okText) {                
                return
            }

            const htmlValData = jsonEntityHTML.GenJSON(true)
            const okHtml = await postDataToDic(htmlValData)
            if (!okHtml) {
                return
            }

            alert(`[${jsonEntityTEXT.Entity}] has been uploaded, please refresh main page`)
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
.float {
    position: fixed;
    width: 60px;
    height: 60px;
    bottom: 40px;
    right: 40px;
    background-color: #BBB;
    color: #FFF;
    border-radius: 50px;
    text-align: center;
    box-shadow: 2px 2px 3px #999;
}

.float:hover {
    background-color: rgb(15, 169, 246);
    cursor: pointer;
}

.floating {
    margin-top: 22px;
    color: white;
}
</style>
