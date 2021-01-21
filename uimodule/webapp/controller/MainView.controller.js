sap.ui.define([
  "com/myorg/contactList/controller/BaseController",
  "sap/base/Log",
  "sap/ui/model/json/JSONModel",
  "sap/ui/core/Core",
	"sap/m/Dialog",
	"sap/m/DialogType",
	"sap/m/Button",
	"sap/m/ButtonType",
	"sap/m/Label",
	"sap/m/MessageToast",
	"sap/m/Text",
	"sap/m/TextArea"

], function(Controller, Log, JSONModel, Core, Dialog, DialogType, Button, ButtonType, Label, MessageToast, Text, TextArea) {
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
      this.oSubmitDialog = new Dialog({
        type: DialogType.Message,
        title: "Novo Contato",
        content: [
          new Label({
            text: "Nome",
            labelFor: "submissionNameAdd"
          }),
          new TextArea("submissionNameAdd", {
            width: "100%",
            placeholder: "Adicione o nome (obrigatorio)",
          }),
          
          new Label({
            text: "Telefone",
            labelFor: "submissionTelephoneAdd"
          }),
          new TextArea("submissionTelephoneAdd", {
            width: "100%",
            placeholder: "Adicione o Telefone (obrigatorio)",
          })
        ],
        beginButton: new Button({
          type: ButtonType.Emphasized,
          text: "Salvar",
          enabled: true,
          press: function () {
            let varName = Core.byId("submissionNameAdd").getValue();
            let varTelephone = Core.byId("submissionTelephoneAdd").getValue();
            
            let newContact = {
              "Name": varName,
              "Telephone": varTelephone
            };

          let oModel = this.getView().getModel();
          
          oModel.oData.ContactsCollection.push(newContact);
          
          let newModel = new JSONModel(oModel.oData);

          this.getView().setModel(newModel);

          
            MessageToast.show("Contato Salvo!!\nnome:" +varName+ "\ntel:"+ varTelephone);

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
      if (!this.OChangeDialog) {
        this.OChangeDialog = new Dialog({
          type: DialogType.Message,
          title: "Alterar Contato",
          content: [
            new Label({
              text: "Nome",
              labelFor: "submissionNameChange"
            }),
            new TextArea("submissionNameChange", {
              width: "100%",
              placeholder: "carregar o nome",
            }),
            new Label({
              text: "Telefone",
              labelFor: "submissionTelephoneChange"
            }),
            new TextArea("submissionTelephoneChange", {
              width: "100%",
              placeholder: "carregar o telefone"
            })
          ],
          beginButton: new Button({
            type: ButtonType.Emphasized,
            text: "Salvar",
            enabled: true,
            press: function () {
              const varName = Core.byId("submissionNameChange").getValue();
              const varTelephone = Core.byId("submissionTelephoneChange").getValue();
    
            /**logica para alterar o contato
             * 
             * 
             */

            MessageToast.show("Contato Alterado!!\nnome:" +varName+ "\ntel:"+ varTelephone);
  
              this.OChangeDialog.close();
            }.bind(this)
          }),
          endButton: new Button({
            text: "Cancelar",
            press: function () {
              this.OChangeDialog.close();
            }.bind(this)
          })
        });
      }
  
      this.OChangeDialog.open();
    },

    onClickDeleteContactButton: function(oEvent){
      if (!this.confirmDeletion) {
				this.confirmDeletion = new Dialog({
					type: DialogType.Message,
					title: "Excluir o contato?",
					content: new Text({ text: "Essa ação e irreversivel!!" }),
					beginButton: new Button({
						type: ButtonType.Emphasized,
						text: "Confirmar",
						press: function () {
            let key = this.getView().getModel().oData.ContactsCollection;

            //aria-rowindex
debugger
  /**   
            let oModel = this.getView().getModel()
            
            oModel.oData.ContactsCollection.destroy();

            let newModel = new JSONModel(oModel.oData);

            this.getView().setModel(newModel);
*/

							MessageToast.show("Contato Excluido "+key);
							this.confirmDeletion.close();
						}.bind(this)
					}),
					endButton: new Button({
						text: "Cancelar",
						press: function () {
							this.confirmDeletion.close();
						}.bind(this)
					})
				});
			}

			this.confirmDeletion.open();
		},

    onClickViewTestButton: function(oEvent){
      var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
      oRouter.navTo("TestView");
    }

  });
});