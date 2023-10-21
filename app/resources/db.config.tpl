module.exports = {
  HOST: {{ secret "mysql-host" }},
  USER: {{ secret "mysql-username" }},
  PASSWORD: {{ secret "mysql-password" }},
  DB: {{ secret "mysql-url" }},
  PORT: {{ secret "mysql-port" }}
};