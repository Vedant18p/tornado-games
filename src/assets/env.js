(function (window) {
  window.setEnv = window.setEnv || function (env) {
    window.__env = Object.assign(window.__env || {}, env);
  };
  window.setEnv({
  "APP_NAME": "Tornado Games",
  "API_BASE_URL": "http://localhost:3000/api",
  "SOCKET_URL": "ws://localhost:3000",
  "PRODUCTION": false
});
})(this);
