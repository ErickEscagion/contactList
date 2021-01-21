sap.ui.define([
  "com/myorg/contactList/controller/BaseController",
  "sap/m/MessageBox",
  "sap/base/Log",
  "sap/ui/model/json/JSONModel",

], function(Controller, MessageBox, Log, JSONModel) {
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
            },
            {
              "Name": "Paula",
              "Telephone": "(13)93333-1112"
            }
		    ]
		});
		return oModel;
	},
  
    onClickAddContactButton: function(oEvent){
      var oDialog = new sap.ui.commons.Dialog({

        modal : true,
        
        height : "90%",
        
        width : "90%",
        
        // buttons : [ oBtnBack, oBtnNext, oBtnCancel ],
        
        content : [ oView ]
        
        });
        
        oDialog.open();
        
    },

    onClickChangeContactButton: function(oEvent){
    	MessageBox.success('clicou no botão alterar contato');
    },

    onClickDeleteContactButton: function(oEvent){
    	MessageBox.success('clicou no botão excluir contato');
    },

    onClickViewTestButton: function(oEvent){
      var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
      oRouter.navTo("TestView");
    }

  });
});