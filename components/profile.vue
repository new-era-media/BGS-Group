<template>
  <div>
    <v-snackbar v-model="snackbar">
      {{ text }}
      <template v-slot:action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">Закрыть</v-btn>
      </template>
    </v-snackbar>
    <v-card style="width:90%">
      <v-card-title class="light-blue lighten-5 darken-1">
        <span class="headline white--text">Персональные данные</span>

        <v-spacer></v-spacer>

        <v-btn dark icon @click="edit = true">
          <v-icon>{{'mdi-pencil'}}</v-icon>
        </v-btn>
      </v-card-title>

      <v-list v-if="!edit" :key="edit">
        <v-list-item>
          <v-list-item-action>
            <v-icon>mdi-account</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-img
              class="avatar"
              :src="info.photo"
              aspect-ratio="0.3"
              max-width="100"
              height="100"
            ></v-img>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-action>
            <v-icon>mdi-email</v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>{{persone.email}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider inset></v-divider>

        <v-list-item>
          <v-list-item-action>
            <v-icon>mdi-account</v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>{{info.name}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-list v-else :key="edit">
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-list-item>
            <v-text-field
              v-model="info.email"
              :rules="emailRules"
              filled
              label="E-mail"
              prepend-icon="mdi-email"
            ></v-text-field>
          </v-list-item>

          <v-list-item>
            <v-text-field
              :rules="emailName"
              v-model="info.name"
              filled
              label="Имя"
              prepend-icon="mdi-account"
            ></v-text-field>
          </v-list-item>

          <v-list-item>
            <v-text-field
              v-model="info.photo"
              :rules="emailPhoto"
              filled
              label="Адрес фотографии"
              prepend-icon="mdi-camera"
            ></v-text-field>
          </v-list-item>

          <div class="mx-12 my-2">
            <v-btn @click="editData" small color="primary">Primary</v-btn>
          </div>
        </v-form>
      </v-list>
    </v-card>
  </div>
</template>
<script>
export default {
  data: () => ({
    valid: true,
    persone: "",
    info: { name: "" },
    edit: false,
    snackbar: false,
    text: "",
    emailName: [(v) => !!v || "Имя"],
    emailPhoto: [(v) => !!v || "Добавьте фото"],
    emailRules: [
      (v) => /.+@.+\..+/.test(v) || "Нужно ввести корректный e-mail",
    ],
  }),
  mounted() {
    this.text = "Добро поджаловать в Ваш профиль";
    this.snackbar = true;
    let client = this.$store.getters.CLIENTS;
    this.persone = client.find((x) => x.id === this.$route.params.id);
    this.info = Object.assign(
      { email: this.persone.email },
      { name: this.persone.data.name },
      { photo: this.persone.data.photo },
      { id: this.persone.id }
    );
  },

  methods: {
    //Добавил картинку через URL , при необходимости можно переделать на добавление через File API, но самый адекватный способ конечно же сделать обработчкик на стороне бэка и добавлять файл через form-data
    editData() {
      if (this.$refs.form.validate()) {
        console.log(this.info)
        this.$store.commit("SET_CLIENTS", this.info);
        this.text = "Данные обнавлены";
        this.snackbar = true;
        this.edit = false;
      } else {
        this.text = "Проверьте правильность ввода данных";
        this.snackbar = true;
      }
    },
  },
};
</script>
<style scoped>
.v-image {
  border-radius: 50% !important;
  overflow: hidden !important;
}
</style>
