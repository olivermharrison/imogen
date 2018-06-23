<template>
<div id="app">
    <div class="io">
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

    <div class="actions">
        <div><button @click="applyOperation('undo')">undo</button></div>
        <div><button @click="showOperations = !showOperations">add operation</button></div>
        <div><button @click="applyOperation('reset')">reset</button></div>
    </div>

    <div v-show="showOperations">
        OPERATIONS
    </div>
</div>
</template>
<script src="./app.ts" lang="ts"></script>
<style src="./app.scss" lang="scss"></style>
