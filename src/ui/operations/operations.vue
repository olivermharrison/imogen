<template>
<div class="operations">
        <div class="filter"></div>
    <div class="content">
        <h2>Image Operations</h2>
        <br>

        <div v-for="(op, index) in operations" :key="index" class="operation" @click="select(op.title)" :class="{selected: selected === op.title}">
            <h3>{{op.title}}</h3>
            <p>{{op.description}}</p>
        </div>


        <button @click="close(false)">close</button>
        <button @click="close(true)" v-show="selected" class="accent">apply</button>
    </div>
</div>
</template>
<script src="./operations.ts" lang="ts"></script>
<style src="./operations.scss" lang="scss" scoped></style>
