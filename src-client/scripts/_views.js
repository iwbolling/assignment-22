// IMPORTS - LIBRARIES
import $ from "jquery";
import Backbone from "backbone";

// IMPORTS - MODELS
import {MegsListingModel,MegsListingCollection} from "./_models.js";

// VIEWS
export const AllListingsView = Backbone.View.extend({
  el: ".route-container",

  _allListingsTemplate: function(listOModels){
    let listingsThumbnails = listOModels.map(function(item){
      return `<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3">
                <div class="item-pane thumbnail">
                  <img src="${item.get("imgLink")}">
                  <div class="caption">
                    <h2>${item.get("item")}</h2>
                    <p>Category: ${item.get("category")}</p>
                    <h3>Price: $${item.get("price")}</h3>
                  </div>
                </div>
              </div>`;
    }).join("");
    return `<div class="container">
              <div class="row">
                ${listingsThumbnails}
              </div>
            </div>`
  },
  render: function(listOModels){
    this.el.innerHTML = this._allListingsTemplate(listOModels);
  }
});

export const AddItemFormView = Backbone.View.extend({
  el: ".route-container",
  events: {"submit #list-item": "handleFormSubmission"},
  handleFormSubmission: function(evt){
    evt.preventDefault();
    console.log("Form submitted!");
    let formEl = evt.target;
    let dataToSave = {
      item: formEl.item.value,
      category: formEl.category.value.toLowerCase(),
      price: parseInt(formEl.price.value),
      forSale: formEl.forSale.value,
      imgLink: formEl.imgLink.value,
      description: formEl.description.value
    };
    let newItemModel = new MegsListingModel();
    newItemModel.set(dataToSave);
    let viewInstance = this;
    newItemModel.save().then(function(){
      window.location.hash = "";
    })
  },
  _itemFormTemplate: function(){
    return `<h2>List an Item</h2>
            <form class="" id="list-item">
              <div class="field_item">
                <label>Listing Name</label>
                <input type="text" name="item" placeholder="what are you trying to list?"/>
              </div>
              <div class="field_category">
                <label>Listing Category</label>
                <input type="text" name="category" placeholder="what section best fits this item?"/>
              </div>
              <div class="field_price">
                <label>Price</label>
                <input type="text" name="price" placeholder="how much do you want to sell this for?"/>
              </div>
              <div class="field_forsale">
                <label>For Sale</label>
                <input type="checkbox" name="forSale" placeholder="" value="true"/>
              </div>
              <div class="field_image">
                <label>Image Link</label>
                <input type="text" name="imgLink" placeholder="please provide a link to an image of the item"/>
              </div>
              <div class="field_description">
                <label>Description</label>
                <input type="text" name="description" placeholder="what best describes the item?"/>
              </div>
              <hr/>
              <button class="btn btn-success" type="submit">Submit!</button>
            </form>`
  },
  render: function(){
    this.el.innerHTML = this._itemFormTemplate();
  }
});

export const SingleItemView = Backbone.View.extend({
  el: ".route-container",

  _singleListingTemplate: function(givenModel){
    return `<h2>Listing View</h2>
            <div class="columns-container">
              <div class="image-column">
                <img src="${givenModel.get("imgLink")}">
              </div>
              <div class="info-column">
                <table class="listing-table">
                  <tr>
                    <td>Item</td>
                    <td>${givenModel.get("item")}</td>
                  </tr>
                  <tr>
                    <td>Category</td>
                    <td>${givenModel.get("category")}</td>
                  </tr>
                  <tr>
                    <td>Price</td>
                    <td>${givenModel.get("price")}</td>
                  </tr>
                  <tr>
                    <td>For Sale?</td>
                    <td>${givenModel.get("forSale")}</td>
                  </tr>
                </table>
              </div>
            </div>
            <h4>Description</h4>
            <p>${givenModel.get("description")}</p>`
  },

  render: function(givenModel){
    this.el.innerHTML = this._singleListingTemplate(givenModel);
  }
})
