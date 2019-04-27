<template>
    <modal v-on:close="close()">
        <div class="image-selector">
            <div class="sample-image-container">
                <div v-for="(image, index) in sampleImages" :key="index" @click="selectImage(image)">
                    <img :src="getPathToImage(image)" />
                </div>
            </div>
            <div class="upload">
                <label for="fileUploadId" id="fileUploadLabel" class="accent big">upload image</label>
                <input id="fileUploadId" ref="fileUpload" type="file" accept="image/*" @change="uploadImage()"/>
                <button @click="close(false)">close</button>
            </div>
        </div>
    </modal>
</template>
<script src="./image-selector.ts" lang="ts"></script>
<style src="./image-selector.scss" lang="scss" scoped></style>
