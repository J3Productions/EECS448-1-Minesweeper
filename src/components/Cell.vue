<template>
    <div class="cell">
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Cell extends Vue {
    private bomb = false;
    private flag = false;

    public setBomb(state: boolean) {
        this.bomb = state;
    }

    public setFlag(state: boolean) {
        this.flag = state;
    }

    public getBomb(): boolean {
        return this.bomb;
    }

    public getFlag(): boolean {
        return this.flag;
    }
}

</script>
<style scoped>
    .cell {
        width: 30px;
        height: 30px;
        background-color: green;
        border: 1px solid black;
        display: inline-block;
    }
</style>