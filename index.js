const axios = require("axios").default;

const iniciarSesionMinisterio = (
  url = "http://localhost:3000/login",
  usuario,
  contra
) => {
  const autenticado = new Promise((resolve, reject) => {
    axios
      .post(url, {}, { auth: { username: usuario, password: contra } })
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        // console.log(error);
        reject(`${error}`);
      });
  });

  return autenticado;
};

const getTokenDeMinisterio = (
  url = "http://localhost:3000/token",
  usuario,
  contra
) => {
  const token = new Promise((resolve, reject) => {
    axios
      .get(url, { auth: { username: usuario, password: contra } })
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
  return token;
};

const sendReportesAlMinisterio = (
  url = "http://localhost:3000/ministerio",
  reporte
) => {
  const respuesta = new Promise((resolve, reject) => {
    axios
      .post(url, reporte)
      .then(response => {
        resolve(response.data);
        // handle success
      })
      .catch(error => {
        // handle error
        reject(error);
      });
  });
  return respuesta;
};

const consultarEstadoASecretaria = (
  url = "http://localhost:3000/secretaria",
  token
) => {
  let config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  const estado = new Promise((resolve, reject) => {
    axios
      .get(url, config)
      .then(response => {
        // handle success
        console.log(response.data);
        resolve(response.data.incumpliendo);
      })
      .catch(error => {
        // handle error
        console.log(error);
        reject(`Error: ${error}`);
      });
  });
  return estado;
};

// sendReportesAlMinisterio({ nombre: "nombre" });

module.exports = {
  iniciarSesionMinisterio,
  sendReportesAlMinisterio,
  getTokenDeMinisterio,
  consultarEstadoASecretaria,
};
