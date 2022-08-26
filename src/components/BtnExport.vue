<template>
    <div class="container">
        <div class="center">
            <button class="btn" @click="genJSON()">{{ btnName }}</button>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { sharedHTML } from './share/share';
import FileSaver from 'file-saver';

// npm install file-saver --save
// npm install @types/file-saver --save-dev

export default defineComponent({
    name: 'EntryExport',
    setup() {
        const btnName = "export to dictionary"
        const genJSON = () => {

            let output = {
                Entity: sharedHTML.entity,
                Definition: sharedHTML.definition,
            }

            let jsonstr = JSON.stringify(output)
            var blob = new Blob([jsonstr], { type: "text/plain;charset=utf-8" });
            FileSaver.saveAs(blob, output.Entity + "_can.json");

            alert(jsonstr)
        }
        return {
            btnName,            
            sharedHTML,
            genJSON
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
