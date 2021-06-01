const axios = require("axios").default;

const registroMinisterio = (
  url = "http://localhost:3000/api/singup",
  datos
) => {
  const registrado = new Promise((resolve, reject) => {
    axios
      .post(url, datos)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
  return registrado;
};

const iniciarSesionMinisterio = (
  url = "http://localhost:3000/api/login",
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
  url = "http://localhost:3000/api/token",
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
  url = "http://localhost:3000/api/reports",
  reporte,
  token
) => {
  let config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  const respuesta = new Promise((resolve, reject) => {
    axios
      .post(url, reporte, config)
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
  url = "http://localhost:3000/api/secretaria",
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
  registroMinisterio,
  iniciarSesionMinisterio,
  sendReportesAlMinisterio,
  getTokenDeMinisterio,
  consultarEstadoASecretaria,
};
