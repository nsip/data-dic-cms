import { reactive } from 'vue';

export class CollectionType {
    Entity = "";
}

export const jsonCollectionHTML = reactive(new CollectionType())
export const jsonCollectionTEXT = reactive(new CollectionType())