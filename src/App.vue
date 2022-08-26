<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/> -->
  <MainTitle />

  <div id="container">

    <div id="left">
      <EntryName />
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
      <PreviewVisual/>
    </div>

    <div id="right">
      <PreviewJSON/>
    </div>

  </div>

  <EntryExport />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MainTitle from './components/Title.vue';
import EntryExport from './components/BtnExport.vue';
import EntryName from './components/Entry_1_Name.vue';
import EntryDef from './components/Entry_2_Def.vue';
import EntrySIF from './components/Entry_3_SIF.vue';
import EntryOtherStd from './components/Entry_4_OtherStd.vue';
import EntryLegalDef from './components/Entry_5_LegalDef.vue';
import EntryCol from './components/Entry_6_Col.vue';
import EntryMeta from './components/Entry_7_Meta.vue';
import PreviewVisual from './components/PreviewVisual.vue'
import PreviewJSON from './components/PreviewJSON.vue'

export default defineComponent({
  name: 'App',
  components: {
    MainTitle,
    EntryName,
    EntryDef,
    EntrySIF,
    EntryOtherStd,
    EntryLegalDef,
    EntryCol,
    EntryExport,
    EntryMeta,
    PreviewVisual,
    PreviewJSON
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
  width: 33%;
  margin-right: 1%;
  overflow: scroll;
  /*   display: flex;
    flex-direction: column; */
}

#middle {
  width: 33%;  
  background-color: rgb(240, 240, 240);
  overflow: scroll;
  /* display: flex;
  flex-direction: column; */
}

#right {
  width: 33%;
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
  font-size: medium;
  color: rgb(60, 60, 60);
  margin-left: 1%;
  margin-bottom: 10px;
  display: inline-block; /* set span */
}

.hint1 {
  font-weight: bold;
  font-size: small;
  font-style: italic;
  color: rgb(120, 120, 120);
  position: absolute;
  left: 120px;
  margin-bottom: 10px;
  display: inline-block; /* set span */
}

.hint2 {
  font-weight: bold;
  font-size: small;
  font-style: italic;
  color: rgb(120, 120, 120);
  margin-left: 4%;
  margin-bottom: 10px;
  display: inline-block; /* set span */
}

.more-editor {
  font-size: medium;
  color: red;
  float: right;
  margin-right: 5px;
  margin-bottom: 5px;
}

.less-editor {
  font-size: medium;
  color: green;
  float: right;
  margin-right: 5px;
  margin-bottom: 5px;
}

.hide-editor {
  font-size: medium;
  float: right;
  margin-bottom: 5px;
  width: 30px;
}
</style>
