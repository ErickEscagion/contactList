sap.ui.define([
	"com/myorg/contactList/controller/BaseController",
	"sap/m/MessageBox",
	"sap/base/Log",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/Core",
	"sap/ui/layout/HorizontalLayout",
	"sap/ui/layout/VerticalLayout",
	"sap/m/Dialog",
	"sap/m/DialogType",
	"sap/m/Button",
	"sap/m/ButtonType",
	"sap/m/Label",
	"sap/m/MessageToast",
	"sap/m/Text",
	"sap/m/TextArea"
  
  ], function(Controller, MessageBox, Log, JSONModel, Core, HorizontalLayout, VerticalLayout, Dialog, DialogType, Button, ButtonType, Label, MessageToast, Text, TextArea) {
	"use strict";

  return Controller.extend("com.myorg.contactList.controller.TestView", {


	
    onClickMainViewButton: function(oEvent){
		var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
		oRouter.navTo("MainView");
	  }

  });
});
