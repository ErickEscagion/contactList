sap.ui.define([
  "com/myorg/contactList/controller/BaseController",
  "sap/m/MessageBox",
  "sap/base/Log",
  "sap/ui/model/json/JSONModel",
  "sap/ui/thirdparty/jquery",
], function(Controller, MessageBox, Log, JSONModel, jQuery) {
  "use strict";

  return Controller.extend("com.myorg.contactList.controller.MainView", {

    onInit: function() {
      var oJSONModel = this.initSampleDataModel();
			this.getView().setModel(oJSONModel);
    },

    initSampleDataModel : function() {
		var oModel = new JSONModel({
		    "ContactsCollection":[
		        {
		            "Name": "erick",
		            "Telephone": "(15)99818-1242"
		        },
		        {
		            "Name": "Bob",
		            "Telephone": "(19)97858-1112"
		        }
		    ]
		});
		return oModel;
	},
  
    onClickAddContactButton: function(oEvent){
    	MessageBox.success('clicou no botão novo contato');
    },

    onClickChangeContactButton: function(oEvent){
    	MessageBox.success('clicou no botão alterar contato');
    },

    onClickDeleteContactButton: function(oEvent){
    	MessageBox.success('clicou no botão excluir contato');
    },

  });
});