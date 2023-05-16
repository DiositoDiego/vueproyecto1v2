<template>
  <div class="container">
    <div>
      <h1>ID de la computadora: {{ $route.params.id }}</h1>
    </div>
    <div v-if="computer" class="info-container">
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
    <div v-else>
      <div>
        <label>Cargando...</label>
      </div>
    </div>
    <div class="div">
      <div class="div">
        <div class="btn-container">
          <button v-on:click="goBack()">Atras</button>
          <button v-on:click="updateComputer(computer)">Guardar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { ComputerController } from "../computer.controller";
import { Computer } from "../../entities/computer";
import { UpdateComputerDto } from "../dto/update-computer";

export default Vue.extend({
  name: "ComputerEdit",
  data() {
    return {
      computer: {} as Computer,
    };
  },
  methods: {
    async findComputerById(id: string) {
      const controller = new ComputerController();
      const response = await controller.findComputerById(id);
      this.computer = response.entity!;
    },
    goBack() {
      window.history.back();
    },
    async updateComputer(computer: Computer) {
      const controller = new ComputerController();
      await controller.updateComputer(computer);
      this.goBack()
    },
  },
  mounted() {
    this.findComputerById(this.$route.params.id);
  },
});
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
