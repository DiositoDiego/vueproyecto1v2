<template>
  <div>
    <div>
      <h1>Computers</h1>
    </div>
    <div>
      <router-link :to="{ name: 'ComputerCreate' }"
        >Crear computadora</router-link
      >
    </div>
    <div class="table-container">
      <table class="table" id="tabla">
        <thead>
          <tr>
            <td>Número de serie</td>
            <td>Modelo</td>
            <td>ID usuario</td>
            <td>Acciones</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="computer in computers" :key="computer.id">
            <td>
              {{ computer.numSerie }}
            </td>
            <td>
              {{ computer.modelo }}
            </td>
            <td>
              {{ computer.iduser }}
            </td>
            <td>
              <router-link
                :to="{ name: 'computer', params: { id: computer.id } }"
                >Editar</router-link
              >
              <button
                v-on:click="deleteComputer(computer.id)"
                class="btn-eliminar"
              >
                Eliminar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div style="margin-top: 10px">
      <button v-on:click="exportarExcel()">Generar Excel</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { ComputerController } from "../computer.controller";
import { Computer } from "../../entities/computer";
import { ResponseApi } from "@/kernel/types";
import XLSX from "xlsx";
import { DeleteComputerDto } from "../dto/delete-computer";

export default Vue.extend({
  name: "ComputersList",
  data() {
    return {
      computers: [] as Computer[],
      data: [[]],
    };
  },
  methods: {
    async findAllComputers() {
      const controller = new ComputerController();
      const response = await controller.findAllComputers();
      this.computers = response.entities!;
    },
    async deleteComputer(id: string) {
      const controller = new ComputerController();
      await controller.deleteComputer({ id } as DeleteComputerDto);
      window.location.reload();
    },
    async exportarExcel() {
      const worksheet = XLSX.utils.aoa_to_sheet(this.data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Libro1");
      const excelBuffer = XLSX.write(workbook, {
        type: "buffer",
        bookType: "xlsx",
      });
      const blob = new Blob([excelBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "copmutadoras.xlsx";
      link.click();

      URL.revokeObjectURL(url);
    },
    createArray() {
      const titles = ["Numero de serie", "Modelo", "ID usuario"];
      const data = new Array(this.computers.length + 1);
      data[0] = new Array(titles.length);
      data[0] = [...titles];
      let j = 0;
      for (let i = 0; i < this.computers.length; i++) {
        data[i + 1] = new Array(titles.length);
        data[i + 1][j] = this.computers[i].numSerie;
        j++;
        data[i + 1][j] = this.computers[i].modelo;
        j++;
        data[i + 1][j] = this.computers[i].iduser;
        j = 0;
      }
      this.data = data;
    },
  },
  mounted() {
    this.findAllComputers().then(() => this.createArray());
  },
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
.table {
  border: 1px solid #c6c6c6;
}
.table thead tr td {
  font-weight: bold;
  background-color: #c6c6c6;
}
.btn-eliminar {
  padding: 5px;
  border-radius: 5px;
  margin-left: 5px;
  cursor: pointer;
}
</style>
