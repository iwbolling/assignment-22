export const MegsListingModel = Backbone.Model.extend({
  initialize: function(){},
  urlRoot: "/api/item",
  idAttribute: "_id"
});

export const MegsListingCollection = Backbone.Collection.extend({
  initialize: function(){},
  pasrse: function(){},
  model: MegsListingModel,
  url: "/api/item"
})
