<template>
<div id="app">
    <div class="io" :style="{ filter: (showOperations) ? 'blur(5px)' : 'none' }">
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

    <div class="actions"  :style="{ filter: (showOperations) ? 'blur(5px)' : 'none' }">
        <div><button @click="applyOperation('undo')">undo</button></div>
        <div><button @click="showOperations = !showOperations" class="accent">add operation</button></div>
        <div><button @click="applyOperation('reset')">reset</button></div>
    </div>



    <div v-if="showOperations">
        <operations v-on:close="closeModal" />
    </div>
</div>
</template>
<script src="./app.ts" lang="ts"></script>
<style src="./app.scss" lang="scss"></style>
