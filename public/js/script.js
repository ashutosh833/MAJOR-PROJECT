
// Example starter JavaScript for disabling form submissions if there are invalid fields
(function() {
  'use strict';
  window.addEventListener('load', function() {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function(form) {
      form.addEventListener('submit', function(event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });
  }, false);
})();

const stars = document.querySelectorAll(".star");

stars.forEach(star => {
  star.addEventListener("click", () => {
    let value = star.getAttribute("data-value");

    stars.forEach(s => {
      s.classList.remove("active");
      if (s.getAttribute("data-value") <= value) {
        s.classList.add("active");
      }
    });
  });
});


// taxes logic start
let showTaxes=document.getElementById("flexSwitchCheckDefault");
   let taxRate=document.getElementsByClassName("taxRate");
   showTaxes.addEventListener("click",()=>{
       console.log(taxRate)
       for(tax of taxRate){
           if(tax.style.display=="inline"){
               tax.style.display="none"
           }else{
               tax.style.display="inline"
           }
       }
   })
// taxes logic end

//remove flash code start

//remove flash code end
document.querySelectorAll(".dropdown-item").forEach(item => {
  item.addEventListener("click", function () {
    document.querySelector(".custom-btn").textContent = this.textContent;
  });
});

//collapse searchbar
let collapsebtn=document.querySelector(".navbar-toggler")
let searchBox=document.querySelector(".searchBox")
collapsebtn.addEventListener("click",()=>{
  console.log("hello world")
  // let style=searchBox.style.display
  if(searchBox.style.display=="none"){
      searchBox.style.display="block"
  }else{
  searchBox.style.display="none"
  }
})




