const resource = {
  prodPoint: "https://vuejs-resource-tutorial.firebaseio.com/data/.json",
  devPoint: "http://localhost:8081/books"
};

const model = (function() {
  return {
    titulo: {
      type: "text",
      required: true
    },
    ISBN: {
      type: "number",
      required: true
    },
    autor: {
      type: "text",
      required: true
    },
    editora: {
      type: "text",
      required: true
    },
    ano: {
      type: "number",
      required: true
    },
    idioma: {
      type: "text"
    },
    peso: {
      type: "number"
    },

    comprimento: {
      type: "number"
    },
    largura: {
      type: "number"
    },
    altura: {
      type: "number"
    },
    hide: ["type", "idioma", "peso", "comprimento", "largura", "altura"]
  };
})();

module.exports = { model, resource };
