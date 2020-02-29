class Test {
    constructor() {}
    colorRandom = () => {
      return `rgb(${Math.floor(Math.random() * 256)},${Math.floor(
        Math.random() * 256
      )},${Math.floor(Math.random() * 256)})`;
    };
    testMethod = parent => {
      const div = document.createElement("div");
      div.classList.add("test");
      parent.appendChild(div);
      div.style.background = this.colorRandom();
    };
  }
  
  export default Test;