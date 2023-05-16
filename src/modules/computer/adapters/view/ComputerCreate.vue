<template>
  <div class="container">
    <div>
      <h1>Creacion de computadora</h1>
    </div>
    <div class="info-container">
      <div>
        <div class="row">
          <label class="label">Numero de serie: </label>
          <input class="input" type="text" v-model="computer.numSerie" maxlength="10" />
        </div>
      </div>
      <div>
        <div class="row left">
          <label class="label">Modelo: </label>
          <input class="input" type="text" v-model="computer.modelo" maxlength="50"/>
        </div>
      </div>
      <div>
        <div class="row">
          <label class="label">ID del usuario: </label>
          <input class="input" type="text" v-model="computer.iduser" maxlength="10"/>
        </div>
      </div>
    </div>
    <div class="div">
      <div class="div">
        <div class="btn-container">
          <button v-on:click="goBack()">Atras</button>
          <button v-on:click="saveComputer(computer)">Guardar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";  
import { Computer } from "../../entities/computer";
import { SaveComputerDto } from "../dto/save-computer";
import { ComputerController } from "../computer.controller";

export default Vue.extend({
    name: "ComputerCreate",
    data() {
        return {
            computer: {} as SaveComputerDto,
        };
    },
    methods: {
        async saveComputer(computer: SaveComputerDto) {
            const controller = new ComputerController();
            const response = await controller.saveComputer(computer);
            this.computer = response.entity!;
            alert(response.message);
            this.goBack();
        },
        goBack() {
            this.$router.go(-1);
        },
    },
    mounted() {
        this.computer.numSerie = "";
        this.computer.modelo = "";
        this.computer.iduser = "";
    }
})
</script>

<style>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
}

.info-container {
  display: inline-table;
  justify-content: center;
  width: 50%;
}

.label {
  font-weight: bold;
  width: 25%;
  margin-bottom: 10px;
  display: flex;
  justify-content: left;
}

.input {
  width: 80%;
  margin-bottom: 10px;
}

.row {
  display: flex;
  justify-content: flex-start;
  align-items: left;
  width: 100%;
}

.btn-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 50%;
}

.div{
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>