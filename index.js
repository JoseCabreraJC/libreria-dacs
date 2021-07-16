const axios = require("axios").default;

const registroMinisterio = (
  url = "http://localhost:3000/api/signup",
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
  email,
  password
) => {
  let body = { email, password };
  const autenticado = new Promise((resolve, reject) => {
    axios
      .post(url, body)
      .then(response => {
        resolve(response.headers['token']);
      })
      .catch(error => {
        console.log(error);
        reject(`${error}`);
      });
  });
  return autenticado;
};

const sendReportesAlMinisterio = (
  url = "http://localhost:3000/api/reports",
  reporte,
  token
) => {
  let config = {
    headers: {
      token: token
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
        console.log(error.response.data);
        reject(error.response.data);
      });
  });
  return respuesta;
};

const getReportesMinisterio = (
  url = "http://localhost:3000/api/reports",
  token
) => {
  let config = {
    headers: {
      token: token,
    },
  };

  const respuesta = new Promise((resolve, reject) => {
    axios
      .get(url, config)
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
}

const consultarEstadoASecretaria = (
  url = "http://localhost:3000/api/secretaria",
  token
) => {
  let config = {
    headers: {
      Authorization: token,
    },
  };
  const estado = new Promise((resolve, reject) => {
    axios
      .get(url, config)
      .then(response => {
        // handle success
        resolve(response.data);
      })
      .catch(error => {
        // handle error
        console.log(error);
        reject(`Error: ${error}`);
      });
  });
  return estado;
};

module.exports = {
  registroMinisterio,
  iniciarSesionMinisterio,
  getReportesMinisterio,
  sendReportesAlMinisterio,
  consultarEstadoASecretaria,
};