var templates={
  productListing:[
    "<article data-index=\"<%= idx %>\">",
    "<h1><%= name %></h1>",
    "<img src=\"<%= image %>\"/>",
    "<button class=\"buyProduct\">Buy now! $<%= price %></button>",
    "<p><button class=\"updateButton\">Update</button></p>",
    "<p><button class=\"deleteButton\">Delete</button></p>",
    "<p><%= description %></p>",
    "</article>"
  ].join("")
};
