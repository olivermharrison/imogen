<template>
<div id="app">
    <h1>i m o g e n</h1>
    <div class="io" :style="{ filter: (showOperations || showImageSelector) ? 'blur(5px)' : 'none' }">
        <div>
            <span style="text-align: left">input</span>
            <canvas id="inputCanvas" width="250" height="250  "></canvas>
        </div>
        <div class="io-center">
            <button class="btn-select-desktop" @click="showImageSelector = true">select image</button> 
        </div>
        <div>
            <span style="text-align: right">output</span>
            <canvas id="outputCanvas" width="250" height="250  "></canvas>
        </div>
    </div>

    <button class="btn-select-mobile" @click="showImageSelector = true" >select image</button>

    <div class="actions"  :style="{ filter: (showOperations || showImageSelector) ? 'blur(5px)' : 'none' }">
        <div>
            <button v-if="graph.updates.length > 1" @click="applyOperation({title: 'undo'})">undo</button>
        </div>
        <div><button @click="showOperations = !showOperations" class="accent big">add operation</button></div>
        <div>
            <button v-if="graph.updates.length > 1" @click="applyOperation({title: 'reset'})">reset</button>
        </div>
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
