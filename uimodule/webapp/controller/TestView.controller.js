sap.ui.define([
  "com/myorg/contactList/controller/BaseController",
  "sap/m/MessageBox",
  "sap/base/Log",

], function(Controller, MessageBox, Log) {
  "use strict";

  return Controller.extend("com.myorg.contactList.controller.TestView", {

    onClickAddContactButton: function(oEvent){
    	MessageBox.success('clicou no botão add contato');
    },

    onClickViewTestButton: function(oEvent){
      var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
      oRouter.navTo("MainView");
    }

  });
});
