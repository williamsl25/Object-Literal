var arrayPos=0;
var methods={
  init:function(){
    methods.initStyling();
    methods.initEvents();
  },
  initStyling:function(){
    methods.renderAllProducts(products);
    //standardizes images
    var bar=$("img").css("width");
    $("img").css("height",bar);
  },
  initEvents:function(){
    //trigger new product creation
    $("#submitButton").on("click", methods.createProduct);
    //trigger product deletion
    //delegated because new product delete buttons need to work even if product was created after page load
    $("section").on("click", ".deleteButton", methods.deleteProduct);
    //loads selected product's info into aside form and switches add button for update button
    $("section").on("click", ".updateButton", methods.updateProduct);
    //update button overrides selected position in data array
    $("#altSubmitButton").on("click", methods.overrideProduct);
  },
  createProduct:function(event){
    event.preventDefault();
    var newProduct={
      name:$("aside input[name=\"name\"]").val(),
      description:$("aside textarea[name=\"description\"]").val(),
      price:$("aside input[name=\"price\"]").val(),
      image:$("aside input[name=\"image\"]").val()
    };
    products.push(newProduct);
    methods.renderProduct(newProduct,products.indexOf(newProduct));

    //empties form after submission
    $("aside input").val("");
    $("aside textarea").val("");
  },
  updateProduct:function(event){
    event.preventDefault();
    $("#darkScreen").removeClass("invis");
    arrayPos=products.length-$(this).closest("article").index()-1;
    $("aside input[name=\"name\"]").val(products[arrayPos].name);
    $("aside textarea[name=\"description\"]").val(products[arrayPos].description);
    $("aside input[name=\"price\"]").val(products[arrayPos].price);
    $("aside input[name=\"image\"]").val(products[arrayPos].image);
    $("#submitButton").addClass("invis");
    $("#altSubmitButton").removeClass("invis");
  },
  overrideProduct:function(event){
    event.preventDefault();
    //grab contents of form
    var updatedProduct={
      name:$("aside input[name=\"name\"]").val(),
      description:$("aside textarea[name=\"description\"]").val(),
      price:$("aside input[name=\"price\"]").val(),
      image:$("aside input[name=\"image\"]").val()
    };
    //override current array object with form contents
    console.log(arrayPos +"this line");
    products[arrayPos]=updatedProduct;
    //remove current articles
    $("article").remove();
    //get rid of binding to avoid multiple bindings on second init
    $("#submitButton").off("click", methods.createProduct);
    $("section").off("click", ".deleteButton", methods.deleteProduct);
    $("section").off("click", ".updateButton", methods.updateProduct);
    $("#altSubmitButton").off("click", methods.overrideProduct);
    //reinitalize the articles (including update)
    methods.init();

    //empties form after submission
    $("aside input").val("");
    $("aside textarea").val("");

    //resets form button and left side overlay
    $("#submitButton").removeClass("invis");
    $("#altSubmitButton").addClass("invis");
    $("#darkScreen").addClass("invis");
  },
  deleteProduct:function(){
    //delete from array
    var productIndex=$(this).closest("article").data("index");
    products.splice(productIndex,1);
    //deleting from DOM
    $(this).closest("article").remove();
  },
  renderProduct:function(myObject,myObjectIndex,myObjectArray){
    //adding index to object from array
    myObject.idx=myObjectIndex;
    //assigning template.js to variable to be used later (to feed stuff to template)
    var compiled=_.template(templates.productListing);
    //add completed template to DOM
    $("section").prepend(compiled(myObject));
  },
  renderAllProducts:function(myArray){
    //keys in each object at each level of the array are defining variables in template
    _.each(myArray,methods.renderProduct);
  }
};

$(document).ready(function(){
  methods.init();
});
