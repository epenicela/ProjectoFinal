<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer">
      <!--  -->
      <v-sheet color="grey-lighten-4" class="pa-4">
        <v-avatar class="mb-4" color="grey-darken-1" size="64"></v-avatar>

        <div>eltonpenicela@gmail.com</div>
      </v-sheet>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item v-for="[icon, text, link] in links" :key="icon" link router: :to="link">
          <template v-slot:prepend>
            <v-icon>{{ icon }}</v-icon>
          </template>
          <v-list-item-title>{{ text }}</v-list-item-title>
        </v-list-item>
        <!--v-list-item-title>
          <v-list-item-action>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-action>
          <v-list-tile-content>
            <v-list-tile-title>
              <router-link :to="{name: 'home'}">Dashboard</router-link>
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-item-title-->
      </v-list>
    </v-navigation-drawer>

    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>VACIN</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <!-- CENTER-->
      <v-container class="py-8 px-6" fluid>
        <v-row>
          <v-col cols="12">
            <v-card>
              <router-view />
            </v-card>
          </v-col>
        </v-row>
      </v-container>
      <!--/CENTER-->
    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    cards: ['Today', 'Yesterday'],
    drawer: null,
    links: [
      ['mdi-view-dashboard', 'Dashboard', '/'],
      ['mdi-account', 'Paciente', '/paciente'],
      ['mdi-needle', 'Vacina', '/vacina'],
      ['mdi-import', 'Entrada', '/entrada'],
      ['mdi-export', 'Saida', '/saida'],
      ['mdi-alert-octagon', 'Atendimento', '/atendimento'],
    ],
  }),
}
</script>