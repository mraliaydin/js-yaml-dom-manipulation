//Modal - Variables
let modalCloseBtn = document.getElementById("modal-close");
let modalBrandInput = document.getElementById("modal-brand-input");
let modalProductInput = document.getElementById("modal-product-input");
let modalPriceInput = document.getElementById("modal-price-input");
let modalSaveBtn = document.getElementById("modal-save");

//Clear Modal
const clearModal = () => {
  modalBrandInput.value = "";
  modalProductInput.value = "";
  modalPriceInput.value = "";
};

//Eventlistener For Close Modal
modalCloseBtn.addEventListener("click", () => {
  clearModal();
});

//Eventlistener For Save Modal
modalSaveBtn.addEventListener("click", () => {
  let tableBody = document.getElementById("table-body");

  let tr = document.createElement("tr");
  let tdBrand = document.createElement("td");
  tdBrand.innerHTML = modalBrandInput.value;

  let tdProduct = document.createElement("td");
  tdProduct.innerHTML = modalProductInput.value;

  let tdPrice = document.createElement("td");
  tdPrice.innerHTML = modalPriceInput.value;

  let tdRemove = document.createElement("td");
  let i = document.createElement("i");
  i.classList.add("fa");
  i.classList.add("fa-trash");
  i.classList.add("delete");

  tdRemove.appendChild(i);

  tr.append(tdBrand, tdProduct, tdPrice, tdRemove);
  tableBody.appendChild(tr);

  deleteButtonsFunction();

  clearModal();
});

//Delete a Product
const deleteButtonsFunction = () => {
  let deleteButtons = document.querySelectorAll(".delete");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      console.log("e");
      //console.log(e.target);
      //console.log(e.target.parentElement);
      //console.log(e.target.parentElement.parentElement);
      e.target.parentElement.parentElement.remove();
      //this.parentElement.parentElement.remove();
    });
  });
};

deleteButtonsFunction();

//Table - Variables
