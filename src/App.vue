<template>
    <!-- <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/> -->

  <p>{{loginAuth}}</p>

    <SignPage v-if="!loginOK" />

    <div v-if="loginOK">
        <MainTitle />
        <div id="container">
            <div id="left">
                <EntryName />
                <br>
                <EntryOtherNames />
                <br>
                <EntryDef />
                <br>
                <EntrySIF />
                <br>
                <EntryOtherStd />
                <br>
                <EntryLegalDef />
                <br>
                <EntryCol />
                <br>
                <EntryMeta />
            </div>
            <div id="middle">
                <PreviewContent />
            </div>
            <div id="right">
                <GenJSON />
            </div>
        </div>
        <EntryExport />
    </div>

</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { loginOK, loginAuth } from './components/share/share'
import SignPage from './components/SignPage.vue';
import MainTitle from './components/Title.vue';
import EntryName from './components/Entry_1_Name.vue';
import EntryOtherNames from './components/Entry_2_OtherName.vue';
import EntryDef from './components/Entry_3_Def.vue';
import EntrySIF from './components/Entry_4_SIF.vue';
import EntryOtherStd from './components/Entry_5_OtherStd.vue';
import EntryLegalDef from './components/Entry_6_LegalDef.vue';
import EntryCol from './components/Entry_7_Col.vue';
import EntryMeta from './components/Entry_8_Meta.vue';
import PreviewContent from './components/Preview.vue'
import GenJSON from './components/GenJSON.vue'
import EntryExport from './components/BtnExport.vue';
import { ping } from './components/share/ping'

export default defineComponent({
    name: 'App',
    components: {
        SignPage,
        MainTitle,
        EntryName,
        EntryOtherNames,
        EntryDef,
        EntrySIF,
        EntryOtherStd,
        EntryLegalDef,
        EntryCol,
        EntryMeta,
        PreviewContent,
        GenJSON,
        EntryExport
    },
    setup() {
        
        // ref: https://www.samanthaming.com/tidbits/86-window-location-cheatsheet/
        loginAuth.value = window.location.href

        onMounted(async () => {
            const ok = await ping()
            if (!ok) {
                alert('back-end api service is not available')
            }
        })

        return {
            loginOK,
            loginAuth            
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
    width: 40%;
    margin-right: 1%;
    overflow: scroll;
    /*   display: flex;
    flex-direction: column; */
}

#middle {
    width: 30%;
    background-color: rgb(240, 240, 240);
    overflow: scroll;
    /* display: flex;
  flex-direction: column; */
}

#right {
    width: 30%;
    margin-left: 1%;
    background-color: rgb(220, 220, 220);
    overflow: scroll;
    /*overflow-y: scroll;
  background-color: rgb(220, 220, 220); */
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

.subline {
    color: rgb(227, 240, 245);
}
</style>
