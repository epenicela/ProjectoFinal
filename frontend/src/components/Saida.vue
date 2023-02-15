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
              <th class="text-left">NOME DA VACINA</th>
              <th class="text-left">CONTABILISTICO</th>
              <th class="text-left">SAIDA</th>
              <th class="text-left">DISPONIVEL</th>
              <th class="text-left">DATA SAIDA</th>
              <th class="text-left">ESTADO</th>
              <th class="text-left">ACÇÕES</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item of items" :key="item.id">
              <td>{{ item.nome_vac }}</td>
              <td>{{ item.contabilistico }}</td>
              <td>{{ item.quantidade_saida }}</td>
              <td>{{ item.disponivel }}</td>
              <td>{{ item.data_saida.substring(0, 10) }}</td>
              <!--td>{{ item.nr_dose }}</td-->
              <!--td><v-chip :color="getColor(item.raw.calories)"></v-chip></td-->
              <td><v-icon color="yellow">{{ getStaus(item.STATUSVAC) }}</v-icon></td>
              <td>
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
                      <v-text-field v-on:keyup="onEnter" label="Vacina *" v-model="detailEdit.vacina_saida"
                        :rules="rules" hint="examplo: 000002" required></v-text-field>
                    </v-col>

                    <v-col cols="6">
                      <v-text-field label="Vacina" v-model="selectVac"  hint="examplo: coronavac" readonly></v-text-field>
                    </v-col>

                    

                    <v-col cols="6">
                      <v-text-field label="Quantidade em estoque" v-model="detailEdit.contabilistico"  hint="examplo: 5" readonly></v-text-field>
                    </v-col>

                    <!--v-col cols="12">
                      <v-select :items="vacinas" v-model="detailEdit.vacina_saida" label="Vacina *"></v-select>
                    </v-col-->
                    <v-col cols="12">
                      <v-text-field label="Data de saida *" v-model="detailEdit.data_saida" v-mask="'####/##/##'"
                        :rules="rules" hint="examplo: 2023-10-10" required></v-text-field>
                    </v-col>

                    <v-col cols="12">
                      <v-text-field label="Quantidade de saida *" v-model="detailEdit.quantidade_saida"
                        :rules="rules" hint="examplo: 5" required></v-text-field>
                    </v-col>

                    <!--v-col cols="12" sm="12">
                      <v-autocomplete :items="['Ativo', 'Inativo']" v-model="detailEdit.STATUS" label="Estado" multiple></v-autocomplete>
                    </v-col-->

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
import saida from '../services/saida'
import vacina from '../services/vacina'
export default {

  data() {
    return {
      search: '',
      formName: 'Saida',
      items: [],
      dialogDetail: false,
      vacinas: [],
      detailEdit: {
        id: '',
        data_saida: new Date().toJSON().slice(0, 10),
        quantidade_saida: '0',
        vacina_saida: '',
        contabilistico: '',
      },
      rules: [
        value => {
          if (value) return true
          return 'Campo obrigatório.'
        },
      ],
      errors: [],
      color: '',
      selectVac: '',
    }
  },
  mounted() {
    this.listar();
    this.listarVacinas();
  },
  methods: {

    abrirForm() {
      this.detailEdit.id = null;
      this.detailEdit.data_saida = new Date().toJSON().slice(0, 10);
      this.detailEdit.vacina_saida = null;
      this.selectVac = '';
      this.dialogDetail = true;
    },
    listar() {
      saida.listar().then(response => {
        this.items = response.data
        //console.log(response.data)
      })
    },
    listarVacinas() {
      this.selectVac = '';
      this.detailEdit.contabilistico = '';
      vacina.listar().then(resposta => {
        this.vacinas = resposta.data
        //console.log(this.vacinas)
      })
    }, salvar() {
      //alert(this.detailEdit.nome_vac)
      this.detailEdit.vacina_saida = '' + parseInt(this.detailEdit.vacina_saida);
      if (!this.detailEdit.id) {
          this.dialogDetail = false;
        saida.salvar(this.detailEdit).then(response => {
          this.detailEdit = {};
          this.listar();
          alert('Salvo com sucesso')
        }).catch(e => {
          this.errors = e.response.data;
          //console.log(this.errors);
        })
      } else {
        saida.editar(this.detailEdit).then(response => {
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
    editar(saida) {
      saida.validade = saida.validade.substring(0, 10)
      this.detailEdit = saida;
      this.dialogDetail = true;
    },
    apagar(saidaObject) {
      if (confirm('Deseja mesmo excluir?')) {
        this.detailEdit = saidaObject;
        saida.apagar(this.detailEdit).then(response => {
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
    }, onEnter: function () {
      this.selectVac = '';
      this.detailEdit.contabilistico = '';
      this.listarVacinas();
      for (const property in this.vacinas) {
        //console.log(this.vacinas[property].id + " = " + this.vacinas[property].nome_vac);
        if (parseInt(this.vacinas[property].id) == parseInt(this.detailEdit.vacina_saida)) {
          this.selectVac = this.vacinas[property].nome_vac;
          this.detailEdit.contabilistico = this.vacinas[property].quantidade;
        }
      }
    },

  }, computed: {
    filteredPost() {
      //return this.detailEdit.filter()
    }
  }
}

</script>
