<template>
<div id="app">
    <div class="io" :style="{ filter: (showOperations || showImageSelector) ? 'blur(5px)' : 'none' }">
        <div>
            <canvas id="inputCanvas" width="250" height="250  "></canvas>
        </div>
        <div>
            <h1>imogen</h1>
            <p>a colour distribution visualiser</p>
        </div>
        <div>
            <canvas id="outputCanvas" width="250" height="250  "></canvas>
        </div>
    </div>

    <div class="actions"  :style="{ filter: (showOperations || showImageSelector) ? 'blur(5px)' : 'none' }">
        <div><button @click="applyOperation({title: 'undo'})">undo</button></div>
        <div><button @click="showOperations = !showOperations" class="accent">add operation</button></div>
        <div><button @click="applyOperation({title: 'reset'})">reset</button></div>
    </div>



    <transition name="fade">
        <div v-show="showOperations">
            <operations v-on:close="closeModal" />
        </div>
    </transition>
    <transition name="fade">
        <div v-show="showImageSelector">
            <image-selector v-on:close="showImageSelector = false" v-on:selectedImage="setImage"/>
        </div>
    </transition>
</div>
</template>
<script src="./app.ts" lang="ts"></script>
<style src="./app.scss" lang="scss"></style>
