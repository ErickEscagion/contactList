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
  
  onClickAddContactButton: function () {
    if (!this.oSubmitDialog) {
      var varName;
      var varTelephone;

      this.oSubmitDialog = new Dialog({
        type: DialogType.Message,
        title: "Novo Contato",
        content: [
          new Label({
            text: "Nome",
            labelFor: "submissionName"
          }),
          new TextArea("submissionName", {
            width: "100%",
            placeholder: "Adicione o nome (obrigatorio)",
            liveChange: function (oEvent) {
              varName = oEvent.getParameter("value");
            }.bind(this)
          }),
          new Label({
            text: "Telefone",
            labelFor: "submissionTelephone"
          }),
          new TextArea("submissionTelephone", {
            width: "100%",
            placeholder: "Adicione o Telefone (obrigatorio)",
            liveChange: function (oEvent) {
              varTelephone = oEvent.getParameter("value");
            }.bind(this)
          }),

        ],
        beginButton: new Button({
          type: ButtonType.Emphasized,
          text: "Salvar",
          enabled: true,
          press: function () {

            const newContact = {
              "Name": varName,
              "Telephone": varTelephone
            }
            
            //this.getModel().getProperty("ContactsCollection").push(newContact);

            MessageToast.show("Contato Salvo!!" +varName + varTelephone);
            this.oSubmitDialog.close();
          }.bind(this)
        }),
        endButton: new Button({
          text: "Cancelar",
          press: function () {
            this.oSubmitDialog.close();
          }.bind(this)
        })
      });
    }

    this.oSubmitDialog.open();
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