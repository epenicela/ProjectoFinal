<template>
  <v-container>
    <v-row class="text-left">
      <v-col class="mb-4">
        <v-subheader class="py-0 d-flex justify-space-between rounded-lg">
          <v-btn color="blue" small icon @click="abrirForm();">
            <v-icon color="white">mdi-plus</v-icon>
            <v-tooltip activator="parent" location="end">Adicionar {{ formName }}</v-tooltip>
          </v-btn>
          <!--v-btn color="success">
                Add
            </v-btn-->
          <v-flex class="mt-4 mb-4 button-add" color="grey">
            <!--vacina /-->
            <!--v-btn color="grey" small @click="abrirForm();"><v-icon>mdi-pencil-plus</v-icon>ADICIONAR</v-btn-->
          </v-flex>
        </v-subheader>

        <v-col></v-col>
        <v-spacer></v-spacer>
        <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>

        <v-table density="compact">
          <thead>
            <tr>
              <th class="text-left">CODIGO</th>
              <th class="text-left">NOME DA VACINA</th>
              <th class="text-left">QUANTIDADE</th>
              <th class="text-left">VALIDADE</th>
              <th class="text-left">nr_dose</th>
              <th class="text-left">ESTADO</th>
              <th class="text-left">ACÇÕES</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item of items" :key="item.id">
              <td>{{ completar(item.id) }}</td>
              <td>{{ item.nome_vac }}</td>
              <td>{{ item.quantidade }}</td>
              <td>{{ item.validade.substring(0, 10) }}</td>
              <td>{{ item.nr_dose }}</td>
              <!--td><v-chip :color="getColor(item.raw.calories)"></v-chip></td-->
              <td><v-icon color="yellow">{{ getStaus(item.STATUSVAC) }}</v-icon></td>
              <td>
                <v-btn color="success" small icon @click="editar(item);"><v-icon>mdi-pencil</v-icon><v-tooltip
                    activator="parent" location="end">Editar {{ formName }}</v-tooltip></v-btn>
                <v-btn color="error" small icon @click="apagar(item);"><v-icon>mdi-trash-can-outline</v-icon><v-tooltip
                    activator="parent" location="end">Apagar {{ formName }}</v-tooltip></v-btn>
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-col>
    </v-row>
  </v-container>
  <v-row justify="center">
    <ul>
      <li></li>
    </ul>
    <template>
      <v-row justify="center">
        <v-dialog v-model="dialogDetail" persistent width="1024">
          <template v-slot:activator="{ props }">
            <v-btn color="primary" v-bind="props">
              Open Dialog
            </v-btn>
          </template>
          <v-card>
            <v-col cols="12">
              <v-card-title>
                <span class="text-h5">{{ formName }}</span>
              </v-card-title>
            </v-col>
            <v-form @submit.prevent="salvar">
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field label="Nome *" v-model="detailEdit.nome_vac" :rules="rules"
                        hint="examplo: Coronavac" required></v-text-field>
                    </v-col>

                    <v-col cols="12">
                      <v-text-field label="Data de validade *" v-model="detailEdit.validade" v-mask="'####/##/##'"
                        :rules="rules" hint="examplo: 2023-10-10" required></v-text-field>
                    </v-col>

                    <v-col cols="12">
                      <v-text-field label="Quantidade " v-model="detailEdit.quantidade" :rules="rules"
                        hint="Não preencha esse campo" required readonly></v-text-field>
                    </v-col>

                    <v-col cols="12">
                      <v-text-field v-on:keyup="onEnterDose" label="Numero de doses *" v-model="detailEdit.nr_dose"
                        :rules="rules" hint="examplo: 5" required></v-text-field>
                    </v-col>

                    <v-col cols="12">
                      <v-text-field label="Intervalo da dose (Valor Numerico)" v-model="detailEdit.intervalo"
                        :rules="rules" hint="examplo: 30 (dias para proxima dose)" required></v-text-field>
                    </v-col>

                    <!--v-col cols="12" sm="12">
                      <v-autocomplete :items="['Ativo', 'Inativo']" v-model="detailEdit.STATUS" label="Estado" multiple></v-autocomplete>
                    </v-col-->

                    <v-col cols="12">
                      <v-select :items="['Ativo', 'Inativo']" v-model="detailEdit.STATUSVAC"
                        label="Estado *"></v-select>
                    </v-col>
                  </v-row>
                </v-container>
                <v-col cols="12">
                  <small>*indica campo obrigatório</small>
                </v-col>
              </v-card-text>
              <v-col>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="red-darken-1" variant="text" @click="dialogDetail = false">
                    FECHAR
                  </v-btn>
                  <v-btn color="green-darken-1" type="submit" variant="text">
                    SALVAR
                  </v-btn>
                </v-card-actions>
              </v-col>
              <v-col cols="12">
                <small></small>
              </v-col>
            </v-form>
          </v-card>
        </v-dialog>
      </v-row>
    </template>



  </v-row>
</template>

<script>
import vacina from '../services/vacina'
export default {

  data() {
    return {
      search: '',
      formName: 'Vacina',
      items: [],
      dialogDetail: false,
      detailEdit: {
        id: '',
        nome_vac: '',
        validade: new Date().toJSON().slice(0, 10),
        nr_dose: '',
        intervalo: '0',
        quantidade: '0',
        STATUSVAC: 'ativo',
      },
      rules: [
        value => {
          if (value) return true
          return 'Campo obrigatório.'
        },
      ],
      errors: [],
      color: ''
    }
  },
  mounted() {
    this.listar();
  },
  methods: {

    abrirForm() {
      this.detailEdit.id = null;
      this.dialogDetail = true;
    },
    listar() {
      vacina.listar().then(response => {
        this.items = response.data
        //console.log(response.data)
      })
    }, salvar() {
      //alert(this.detailEdit.nome_vac)
      if (!this.detailEdit.id) {
        vacina.salvar(this.detailEdit).then(response => {
          this.dialogDetail = false;
          this.detailEdit = {};
          this.listar();
          alert('Salvo com sucesso')
        }).catch(e => {
          this.errors = e.response.data;
          //console.log(this.errors);
        })
      } else {
        vacina.editar(this.detailEdit).then(response => {
          this.dialogDetail = false;
          this.detailEdit = {};
          this.listar();
          alert('Editado com sucesso')
        }).catch(e => {
          this.errors = e.response.data;
          console.log(this.errors);
        })
      }
    },
    editar(vacina) {
      vacina.validade = vacina.validade.substring(0, 10)
      this.detailEdit = vacina;
      this.dialogDetail = true;
    },
    apagar(vacinaObject) {
      if (confirm('Deseja mesmo excluir?')) {
        this.detailEdit = vacinaObject;
        vacina.apagar(this.detailEdit).then(response => {
          this.listar();
          this.detailEdit = {};
          alert('Removido com sucesso')
        }).catch(e => {
          this.errors = e.response.data;
          console.log(this.errors);
        })
      }
    }, getStaus(STATUSVAC) {
      if (STATUSVAC == 'ativo') {
        return 'mdi-check-circle-outline';
      }
      return 'mdi-close-circle';
    }, getColor(calories) {
      if (calories > 400) return 'red'
      else if (calories > 200) return 'orange'
      else return 'green'
    }, completar(num) {
      var numberWithZeroes = String(num);
      var counter = numberWithZeroes.length;
      while (counter < 6) {
        numberWithZeroes = "0" + numberWithZeroes;
        counter++;
      }
      return numberWithZeroes;
    }, onEnterDose() {

      if (parseInt(this.detailEdit.nr_dose) <= 1) {
        this.detailEdit.intervalo = '0';
        console.log("Ola");
      }

    },
  }, computed: {
    filteredPost() {
      //return this.detailEdit.filter()
    }
  }
}

</script>
