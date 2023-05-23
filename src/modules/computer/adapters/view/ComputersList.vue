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
    <div class="table-container" v-if="computers.length > 0">
      <table class="table" id="tabla">
        <thead>
          <tr>
            <td class="col1">ID</td>
            <td>Número de serie</td>
            <td>Modelo</td>
            <td>ID usuario</td>
            <td>Acciones</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="computer in computers" :key="computer._id">
            <td class="col1">
              {{ computer._id }}
            </td>
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
                :to="{ name: 'computer', params: { id: computer._id } }"
                >Editar</router-link
              >
              <button
                v-on:click="deleteComputer(computer._id)"
                class="btn-eliminar"
              >
                Eliminar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      <p>cargando...</p>
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
import XLSX from "xlsx";
import { DeleteComputerDto } from "../dto/delete-computer";
import ExcelJS from "exceljs";

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

    async deleteComputer(_id: string) {
      const controller = new ComputerController();
      await controller.deleteComputer({ _id } as DeleteComputerDto);
      window.location.reload();
    },

    async exportarExcel() {
      if (this.computers.length > 0) {
        const wb = new ExcelJS.Workbook();
        const ws = wb.addWorksheet("Computadoras");
        ws.autoFilter = {
          from: "A1",
          to: "C1",
        };
        ws.columns = [
          { header: "Numero de serie", key: "numSerie" },
          { header: "Modelo", key: "modelo" },
          { header: "ID usuario", key: "iduser" },
        ];
        const rows = [...this.data.slice(1)];
        ws.addRows(rows);

        ws.eachRow((row) => {
          row.eachCell((cell) => {
            cell.fill = {
              type: "pattern",
              pattern: "solid",
              fgColor: { argb: "A3B2CF" },
            };
          });
        });

        ws.getRow(1).eachCell((cell) => {
          cell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "FFC6C6C6" },
          };
        });

        const buffer = await wb.xlsx.writeBuffer();
        const fileName = "Computadoras.xlsx";
        const url = window.URL.createObjectURL(
          new Blob([buffer], { type: "application/octet-stream" })
        );
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();
        link.remove();
        ////////////////////////////////////////////////

        /* const worksheet = XLSX.utils.aoa_to_sheet(this.data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Libro1");

        XLSX.writeFile(workbook, "computadoras.xlsx"); */
      } else {
        alert("No hay datos para exportar");
      }
    },

    createArray() {
      if (this.computers.length > 0) {
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
      }
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
  border-collapse: collapse;
  background-color: #a3b2cf;
  font-weight: bold;
}
.col1 {
  width: 10%;
  text-align: left;
  font-style: italic;
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
