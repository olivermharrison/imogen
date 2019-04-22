<template>
<div class="operation-modal">
        <div class="filter"></div>
    <div class="content">
        <div>
            <h2>Image Operations</h2>
        </div>
        <div class="operations">
            <div v-for="(op, index) in operations" :key="index" class="operation" @click="select(op)" :class="{selected: selected.title === op.title}">
                <h3>{{op.title}}</h3>
                <p v-html="getDescription(op)"></p>
                
                <div v-if="op.control === 'range'" class="io-range">
                    <span>{{op.min}}{{op.units}}</span>
                    <input type="range" :min="op.min" :max="op.max" v-model="op.value">
                    <span>{{op.max}}{{op.units}}</span>
                </div>
            </div>
        </div>
        <div>
            <button @click="close(false)">close</button>
            <button @click="close(true)" v-show="selected" class="accent">apply</button>
        </div>
        
    </div>
</div>
</template>
<script src="./operations.ts" lang="ts"></script>
<style src="./operations.scss" lang="scss" scoped></style>
