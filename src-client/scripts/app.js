// IMPORTS - LIBRARIES
import $ from "jquery";
import Backbone from "backbone";

// IMPORTS - MODELS & COLLECTIONS
import {MegsListingModel,MegsListingCollection} from "./_models.js";

// IMPORTS - VIEWS
import {AllListingsView,AddItemFormView} from "./_views.js";

// VARIABLES - HTML DOM ELEMENTS
let divWholePage = document.querySelector("#app-container");

// ROUTER
const AppRouter = Backbone.Router.extend({
  initialize: function(){
    console.log("Routing initialized.".toUpperCase());
    Backbone.history.start();
  },
  routes: {
    "": "showAllListings",
    "new": "showNewItemForm",
    "item/:id": "showSingleItem"
  },

  showAllListings: function(){
    let listingsCollInstance = new MegsListingCollection();
    listingsCollInstance.fetch().then(function(){
      let listingsViewInstance = new AllListingsView();
      listingsViewInstance.render(listingsCollInstance.models);
    })
  },

  showNewItemForm: function(){
    let formViewInstance = new AddItemFormView();
    formViewInstance.render();
  }
})

let app = new AppRouter();
