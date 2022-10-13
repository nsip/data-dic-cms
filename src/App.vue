<template>
    <div v-if="disp">
        <MainTitle />
        <div id="container">
            <div id="left">
                <EntryEntity />
            </div>
            <div id="middle">
                <PreviewContent />
            </div>
            <div id="right">
                <PreviewJSON />
            </div>
        </div>
        <EntryExport />
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { loginAuth, loginUser, getUname, itemName, itemKind, getItemContent } from './components/share/share'
import MainTitle from './components/Title.vue';
import EntryEntity from './components/EntryEntity.vue'
import PreviewContent from './components/PreviewContent.vue'
import PreviewJSON from './components/PreviewJSON.vue'
import EntryExport from './components/BtnExport.vue';

export default defineComponent({
    name: 'App',
    components: {
        MainTitle,
        EntryEntity,
        PreviewContent,
        PreviewJSON,
        EntryExport
    },
    setup() {

        let disp = ref(false)

        // ref: https://www.samanthaming.com/tidbits/86-window-location-cheatsheet/

        const pName = window.location.href.indexOf('name=')
        const pKind = window.location.href.indexOf('kind=')
        const pAuth = window.location.href.indexOf('auth=')

        const name = decodeURI(window.location.href.substring(pName + 5, pKind - 1))
        const kind = decodeURI(window.location.href.substring(pKind + 5, pAuth - 1))
        const auth = decodeURI(window.location.href.substring(pAuth + 5))

        loginAuth.value = 'Bearer ' + auth

        // alert(name)
        // alert(kind)

        onMounted(async () => {
            if (loginAuth.value.length < 32) {

                alert('invalid auth info')
                disp.value = false

            } else {

                // fill loginUser, already 'ping' back-end api
                getUname()

                await new Promise(f => setTimeout(f, 200));

                if (loginUser.value.length > 0) {
                    disp.value = true

                    // edit mode
                    if (name.length > 0 && kind.length > 0) {
                        itemName.value = name
                        itemKind.value = kind

                        const entity = await getItemContent(name, kind, 'existing');
                        if (entity != null) {
                            alert(entity.Entity)
                        }

                    } else { // create mode

                        alert('creating mode')

                    }
                }
            }
        })

        return {
            loginUser,
            disp
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
    scrollbar-width: none;
    /*   display: flex;
    flex-direction: column; */
}

#left::-webkit-scrollbar {
    display: none;
}

#middle {
    width: 30%;
    background-color: rgb(240, 240, 240);
    overflow: scroll;
    scrollbar-width: none;
    /* display: flex;
  flex-direction: column; */
}

#middle::-webkit-scrollbar {
    display: none;
}

#right {
    width: 30%;
    margin-left: 1%;
    background-color: rgb(220, 220, 220);
    overflow: scroll;
    scrollbar-width: none;
    /*overflow-y: scroll;
  background-color: rgb(220, 220, 220); */
}

#right::-webkit-scrollbar {
    display: none;
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
