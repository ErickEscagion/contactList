sap.ui.define([
  "com/myorg/contactList/controller/BaseController",
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
], function(Controller, Core, HorizontalLayout, VerticalLayout, Dialog, DialogType, Button, ButtonType, Label, MessageToast, Text, TextArea) {
  "use strict";

  return Controller.extend("com.myorg.contactList.controller.TestView", {

    onClickMainViewButton: function(oEvent){
      var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
      oRouter.navTo("MainView");
    },



    onClickAddContactButton: function () {
			if (!this.oSubmitDialog) {
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
								var varName = oEvent.getParameter("value");
								this.oSubmitDialog.getBeginButton().setEnabled(varName.length > 2);
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
								var varTelephone = oEvent.getParameter("value");
								this.oSubmitDialog.getBeginButton().setEnabled(varTelephone.length > 7);
							}.bind(this)
            }),

					],
					beginButton: new Button({
						type: ButtonType.Emphasized,
						text: "Salvar",
						enabled: false,
						press: function () {
              var varName = Core.byId("submissionName").getValue();
              var varTelephone = Core.byId("submissionName").getValue();

              const newContact = {
                "Name": varName,
                "Telephone": varTelephone
              }
              
              //this.getModel().getProperty("ContactsCollection").push(newContact);

              MessageToast.show("Contato Salvo!!");
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
		}



  });
});
