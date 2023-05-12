<template>
    <div>
        <div>
        <h1>Computers</h1>
    </div>
    <div class="table-container">
        <table class="table">
            <thead>
                <tr>
                    <td>
                        Número de serie
                    </td>
                    <td>
                        Modelo
                    </td>
                    <td>
                        ID usuario
                    </td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <router-link to="/computers/2">Computer 2</router-link>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'ComputersList',
});
</script>

<style>
.table-container {
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
}
.table{
    border: 1px solid #c6c6c6;
}
.table thead tr td {
    font-weight: bold;
    background-color: #c6c6c6;
}
</style>