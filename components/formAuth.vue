<template>
  <v-card class="mx-auto" max-width="344" outlined>
    <v-snackbar v-model="snackbar">
      {{ text }}
      <template v-slot:action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">Закрыть</v-btn>
      </template>
    </v-snackbar>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-list-item three-line>
        <v-list-item-content>
          <div class="overline mb-4">Авторизация</div>
          <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
          <v-text-field
            v-model="password"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="passwordRules"
            :type="show1 ? 'text' : 'password'"
            label="Пароль"
            @click:append="show1 = !show1"
          ></v-text-field>
        </v-list-item-content>
      </v-list-item>

      <v-card-actions>
        <v-btn @click="auth">Войти</v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>
<script>
export default {
  data: () => ({
    valid: true,
    show1: false,
    show2: true,
    show3: false,
    show4: false,
    snackbar: false,
    text: "",
    password: "Password",
    email: "",
    emailRules: [
      (v) => !!v || "Введите e-mail",
      (v) => /.+@.+\..+/.test(v) || "Нужно ввести корректный e-mail",
    ],
    password: "",
    passwordRules: [
      (v) => !!v || "Введите пароль",
      (v) => (v && v.length >= 6) || "Пароль не должен быть короче 6 символов",
    ],
  }),
  methods: {
    auth() {
      console.log(this.$refs.form.validate());
      if (this.$refs.form.validate()) {
        let clients = this.$store.getters.CLIENTS;
        let persone = clients.find((x) => x.email === this.email);
        if (persone && persone.password === this.password) {
          this.$router.push(`/user/${persone.id}`);
        } else {
          this.text = "Введены неверные данные";
          this.snackbar = true;
        }
      } else {
        this.text = "Проверьте правильность ввода данных";
        this.snackbar = true;
      }
    },
  },
};
</script>