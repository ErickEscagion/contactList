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
			var oModel = new JSONModel();

			jQuery.ajax(sap.ui.require.toUrl("com.myorg.contactList\contacts.json"), {
				dataType: "json",
				success: function(oData) {
          Log.success("conected");
        },
				error: function() {
					Log.error("failed to load json");
				}
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
