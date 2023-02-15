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
              <th class="text-left">NOME DO PACIENTE</th>
              <th class="text-left">NOME DA VACINA</th>
              <th class="text-left">DATA DA DOSE</th>
              <th class="text-left">DOSES PREVISTAS</th>
              <th class="text-left">PROXIMA DOSE</th>
              <th class="text-left">ACÇÕES</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item of items" :key="item.id">
              <td>{{ item.nome }}</td>
              <td>{{ item.nome_vac }}</td>
              <td>{{ item.DATA_1.substring(0, 10) }}</td>
              <td>{{ item.nr_dose }}</td>
              <td>{{ item.DATA_2.substring(0, 10) }}</td>
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
          <!--template v-slot:activator="{ props }">
            <v-btn color="primary" v-bind="props">
              Open Dialog
            </v-btn>
          </template-->
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
                      <v-text-field v-on:keyup="onEnterPciente" label="Codigo paciente *"
                        v-model="detailEdit.paciente_id" :rules="rules" hint="examplo: 000002" required></v-text-field>
                    </v-col>

                    <v-col cols="12">
                      <v-text-field label="Paciente (este campo é preenchido automaticamente)" v-model="selectPac"
                        hint="examplo: Elton de Assis Penicela" readonly></v-text-field>
                    </v-col>


                    <v-col cols="12">
                      <v-text-field v-on:keyup="onEnterVacina" label="Codigo vacina *" v-model="detailEdit.vacina_id"
                        :rules="rules" hint="examplo: 000002" required></v-text-field>
                    </v-col>

                    <v-col cols="12">
                      <v-text-field label="Vacina (este campo é preenchido automaticamente)" v-model="selectVac"
                        hint="examplo: coronavac" readonly></v-text-field>
                    </v-col>



                    <v-col cols="6" style="display: none;">
                      <v-text-field label="Quantidade em estoque" v-model="this.detailEdit.x_line" hint="examplo: 5"
                        readonly></v-text-field>
                    </v-col>

                    <!--v-col cols="12">
                      <v-select :items="vacinas" v-model="detailEdit.vacina_saida" label="Vacina *"></v-select>
                    </v-col-->
                    <v-col cols="12">
                      <v-text-field label="Data desta vacina *" v-model="detailEdit.DATA_1" v-mask="'####-##-##'"
                        :rules="rules" hint="examplo: 2023-10-10" required></v-text-field>
                    </v-col>

                    <v-col cols="12">
                      <v-text-field label="Data prevista para proxima vacina *" v-model="detailEdit.DATA_2"
                        v-mask="'####-##-##'" :rules="rules" hint="examplo: 2023-10-10" required></v-text-field>
                    </v-col>

                  </v-row>
                </v-container>
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
            </v-form>
          </v-card>
        </v-dialog>
      </v-row>
    </template>



  </v-row>
</template>

<script>
import atendimento from '../services/atendimento'
import vacina from '../services/vacina'
import paciente from '../services/paciente'
export default {

  data() {
    return {
      search: '',
      formName: 'Atendimento',
      items: [],
      dialogDetail: false,
      vacinas: [],
      pacientes: [],
      detailEdit: {
        id: '',
        DATA_1: new Date().toJSON().slice(0, 10),
        DATA_2: new Date().toJSON().slice(0, 10),
        paciente_id: '',
        vacina_id: '',
        x_line: '',
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
      intervalo: '0',
      selectPac: '',
      contabilistico: '',
    }
  },
  mounted() {
    this.listar();
    this.listarVacinas();
    this.listarPacientes();
  },
  methods: {

    abrirForm() {
      this.detailEdit.id = null;
      this.detailEdit.DATA_1 = new Date().toJSON().slice(0, 10);
      this.detailEdit.DATA_2 = new Date().toJSON().slice(0, 10);
      this.selectVac = '';
      this.intervalo = '0';
      this.selectPac = '';
      this.contabilistico = '';
      this.dialogDetail = true;
    },
    listar() {
      atendimento.listar().then(response => {
        this.items = response.data
      })
    },
    listarVacinas() {
      this.selectVac = '';
      this.intervalo = '0';
      this.contabilistico = '';
      this.detailEdit.x_line = this.contabilistico;
      vacina.listar().then(resposta => {
        this.vacinas = resposta.data;
      })
    },
    listarPacientes() {
      this.selectPac = '';
      paciente.listar().then(resposta => {
        this.pacientes = resposta.data;
      })
    }, completar(num) {
      var numberWithZeroes = String(num);
      var counter = numberWithZeroes.length;
      while (counter < 6) {
        numberWithZeroes = "0" + numberWithZeroes;
        counter++;
      }
      return numberWithZeroes;
    }, salvar() {
      //alert(this.detailEdit.nome_vac)
      this.detailEdit.paciente_id = '' + parseInt(this.detailEdit.paciente_id);
      this.detailEdit.vacina_id = '' + parseInt(this.detailEdit.vacina_id);
      if (!this.detailEdit.id) {
        this.dialogDetail = false;
        atendimento.salvar(this.detailEdit).then(response => {
          this.detailEdit = {};
          this.listar();
          alert('Salvo com sucesso')
        }).catch(e => {
          this.errors = e.response.data;
          //console.log(this.errors);
        })
      } else {
        atendimento.editar(this.detailEdit).then(response => {
          this.dialogDetail = false;
          this.detailEdit = {};
          this.listar();
          alert('Editado com sucesso')
        }).catch(e => {
          this.errors = e.response.data;
          console.log(this.errors);
        })
      }
    }, editar(atendimento) {
      //saida.validade = saida.validade.substring(0, 10)
      this.detailEdit = atendimento;
      this.dialogDetail = true;
    },
    apagar(atendimentoObject) {
      console.log(atendimentoObject);
      if (confirm('Deseja mesmo excluir?')) {
        this.detailEdit = atendimentoObject;
        atendimento.apagar(this.detailEdit).then(response => {
          this.listar();
          this.detailEdit = {};
          alert('Removido com sucesso')
        }).catch(e => {
          this.errors = e.response.data;
          console.log(this.errors);
        })
      }
    }, onEnterVacina() {
      this.selectVac = '';
      this.intervalo = '0';
      this.contabilistico = '';
      this.listarVacinas();
      for (const property in this.vacinas) {
        if (parseInt(this.vacinas[property].id) == parseInt(this.detailEdit.vacina_id)) {
          this.selectVac = this.vacinas[property].nome_vac;
          this.intervalo = this.vacinas[property].intervalo;
          this.contabilistico = this.vacinas[property].quantidade;
          this.detailEdit.x_line = this.contabilistico;
        }
      }
    }, onEnterPciente() {
      this.selectPac = '';
      this.listarPacientes();
      for (const property in this.pacientes) {
        if (parseInt(this.pacientes[property].id) == parseInt(this.detailEdit.paciente_id)) {
          this.selectPac = this.pacientes[property].nome;
          //console.log(this.pacientes[property]);
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
