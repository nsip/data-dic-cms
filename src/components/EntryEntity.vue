<template>
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
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
// import { loginAuth, loginUser, getUname } from './components/share/share'
import EntryName from './Entry_1_Name.vue';
import EntryOtherNames from './Entry_2_OtherName.vue';
import EntryDef from './Entry_3_Def.vue';
import EntrySIF from './Entry_4_SIF.vue';
import EntryOtherStd from './Entry_5_OtherStd.vue';
import EntryLegalDef from './Entry_6_LegalDef.vue';
import EntryCol from './Entry_7_Col.vue';
import EntryMeta from './Entry_8_Meta.vue';

export default defineComponent({
    name: 'EntryEntity',
    components: {
        EntryName,
        EntryOtherNames,
        EntryDef,
        EntrySIF,
        EntryOtherStd,
        EntryLegalDef,
        EntryCol,
        EntryMeta,
    },
    setup() {
        return {
        }
    }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>