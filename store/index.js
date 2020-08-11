export const state = () => ({
  clients: [
    {
      email: "admin@mail.ru",
      password: "123456",
      id: "1",
      data: {
        name: "Admin",
        photo:
          "https://ru.hellomagazine.com/thumb/755x550_0/images/2020/april/veronika/eminem-zahod.jpg"
      }
    }
  ]
});

export const getters = {
  CLIENTS: state => {
    return state.clients;
  },
  PERSONE: state => {
    return state.persone;
  }
};

export const mutations = {
  SET_PERSONE: (state, payload) => {
    state.clients.forEach((element, i) => {
      if (element.id == payload.id) {
        state.clients[i].email = payload.email;
        state.clients[i].data.name = payload.name;
        state.clients[i].data.photo = payload.photo;
      }
    });
  }
};
