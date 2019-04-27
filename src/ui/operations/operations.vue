<template>
    <modal>
        <div class="operations-container">
            <div class="operations">
                <div v-for="(op, index) in operations" :key="index" class="operation" @click="select(op)" :class="{selected: selected.title === op.title}">
                    <br>
                    <h3>{{op.title}}</h3>
                    <p v-html="getDescription(op)"></p>
                    
                    <div v-if="op.control === 'range'" class="io-range">
                        <span>{{op.min}}{{op.units}}</span>
                        <!--<input type="range" :min="op.min" :max="op.max" v-model="op.value">-->
                        <vue-slider :tooltip="'none'" :dotStyle="{width: '18px', height: '18px', marginTop: '-2px'}" :min="op.min" :max="op.max" v-model="op.value" v-on:change="selected = op"/>
                        <span>{{op.max}}{{op.units}}</span>
                    </div>
                    <br>
                    <hr v-if="index < operations.length - 1">
                    <div v-else><br><br><br></div>
                </div>
            </div>
            <div class="options"> 
                <button @click="close(true)" v-show="selected" class="accent big">apply {{selected.title}}</button>
                <button @click="close(false)">close</button>
            </div>
        </div>
    </modal>
</template>
<script src="./operations.ts" lang="ts"></script>
<style src="./operations.scss" lang="scss" scoped></style>
