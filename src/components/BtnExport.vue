<template>
    <div class="container">
        <div class="center">
            <a @click="saveJSON()" class="float">
                <i class="fa fa-check floating"></i>
            </a>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { jsonHTML, jsonTEXT } from './share/Entity'
import { fetchBodyForm, fetchBodyJsonStr, fetchBodyObject, emptyM } from './share/fetch'
// import FileSaver from 'file-saver';

// npm install file-saver --save
// npm install @types/file-saver --save-dev

export default defineComponent({
    name: 'EntryExport',
    setup() {
        const btnName = "export to dictionary"

        const ckeditor = document.createElement('script');
        ckeditor.setAttribute('src', "https://use.fontawesome.com/536e0c9b50.js");
        document.head.appendChild(ckeditor);

        const saveJSON = async () => {

            // const htmlValData = jsonHTML.GenJSON(true)
            // const textValData = jsonTEXT.GenJSON(false)

            // var blobHTML = new Blob([htmlValData], { type: "text/plain;charset=utf-8" });
            // FileSaver.saveAs(blobHTML, "dd_html_" + jsonTEXT.Entity + ".json");

            // var blobTEXT = new Blob([textValData], { type: "text/plain;charset=utf-8" });
            // FileSaver.saveAs(blobTEXT, "dd_txt_" + jsonTEXT.Entity + ".json");

            //////////////////////////////////////////////////

            const textValData = jsonTEXT.GenJSON(false)
            const rtText = (await fetchBodyJsonStr("api/dictionary/upsert", "POST", emptyM, textValData)) as any[]
            if (rtText[1] != 200) {
                alert(rtText[0])
                return
            }

            const htmlValData = jsonHTML.GenJSON(true)
            const rtHtml = (await fetchBodyJsonStr("api/dictionary/upsert", "POST", emptyM, htmlValData)) as any[]
            if (rtHtml[1] != 200) {
                alert(rtHtml[0])
                return
            }

            alert(`[${jsonTEXT.Entity}] has been uploaded, please refresh main page`)
        }
        return {
            btnName,
            ckeditor,
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

.float{
	position:fixed;
	width:60px;
	height:60px;
	bottom:50px;
	right:20px;
	background-color:#BBB;
	color:#FFF;
	border-radius:50px;
	text-align:center;
	box-shadow: 2px 2px 3px #999;
}

.float:hover {
    background-color:#0C9;
    cursor: pointer;
}

.floating{
	margin-top:16px;
    font-size:32px;
    color:white;
}
</style>
