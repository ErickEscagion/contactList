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
  "sap/m/TextArea",
  "sap/m/MessageBox",

], function (Controller, Log, JSONModel, Core, Dialog, DialogType, Button, ButtonType, Label, MessageToast, Text, TextArea, MessageBox) {
  "use strict";

  return Controller.extend("com.myorg.contactList.controller.MainView", {

    onInit: function () {
      const oRouter = sap.ui.core.UIComponent.getRouterFor(this);
      oRouter.attachRouteMatched(this.updateLocalModel, this);

      var oJSONModel = this.initSampleDataModel();
      this.getView().setModel(oJSONModel);
    },

    updateLocalModel: function(oEvent){
      const globalModel = this.getOwnerComponent().getModel("global");

      if(!globalModel){ 
        var oJSONModel = this.initSampleDataModel();
        this.getView().setModel(oJSONModel);
      }else{
        this.getView().setModel(globalModel);
      }
    },

    initSampleDataModel: function () {
      var oModel = new JSONModel({
        "ContactsCollection": [
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

      sap.ui.getCore().setModel(oModel,"oModelContacts");

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
              MessageToast.show("Contato Salvo!!\nnome:" + varName + "\ntel:" + varTelephone);
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
      } else {
        Core.byId('submissionNameAdd').setValue('');
        Core.byId('submissionTelephoneAdd').setValue('');
      }
      this.oSubmitDialog.open();
    },

    onClickChangeContactButton: function (oEvent) {
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
              width: "100%"
            }),
            new Label({
              text: "Telefone",
              labelFor: "submissionTelephoneChange"
            }),
            new TextArea("submissionTelephoneChange", {
              width: "100%"
            })
          ],
          beginButton: new Button({
            type: ButtonType.Emphasized,
            text: "Salvar",
            enabled: true,
            press: function () {
              indices = this.getView().byId('Table').getSelectedIndices()
              let newModel = new JSONModel();
              let oldModel = this.getView().getModel().oData.ContactsCollection;
              //define o atributo ContactsCollection como sendo um array, pra poder fazer push depois
              newModel.oData.ContactsCollection = [];
              for (let i = 0; i < oldModel.length; i++) {
                //verifica se a linha atual é a que precisa excluir
                if (!indices.includes(i)) {
                  newModel.oData.ContactsCollection.push(oldModel[i]);
                }
                else {
                  let newContact = {
                    "Name": Core.byId('submissionNameChange').getValue(),
                    "Telephone": Core.byId('submissionTelephoneChange').getValue()
                  };
                  newModel.oData.ContactsCollection.push(newContact);
                }
              }
              this.getView().setModel(newModel);
              this.getView().byId('Table').setSelectedIndex()
              MessageToast.show("Contato Alterado!!");
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

      let indices = this.getView().byId('Table').getSelectedIndices()
      if (indices.length > 1) {
        MessageBox.alert("SELECIONE APENAS UMA LINHA!!!");
        return;
      }
      else if (indices.length === 0) {
        MessageBox.alert("SELECIONE UMA LINHA!!!");
        return;
      }
      let model = this.getView().getModel().oData.ContactsCollection;
      let linhaSelecionada = model[indices[0]]
      Core.byId('submissionNameChange').setValue(linhaSelecionada.Name);
      Core.byId('submissionTelephoneChange').setValue(linhaSelecionada.Telephone);
      this.OChangeDialog.open();
    },

    onClickDeleteButton: function (oEvent) {
      const selectedRows = this.getView().byId('Table').getSelectedIndices();
      if (selectedRows.length === 0) {
        MessageBox.alert("SELECIONE UMA LINHA!!!");
        return;
      }
      if (!this.confirmDeletion) {
        this.confirmDeletion = new Dialog({
          type: DialogType.Message,
          title: "Excluir o contato?",
          content: new Text({ text: "Essa ação e irreversivel!!" }),
          beginButton: new Button({
            type: ButtonType.Emphasized,
            text: "Confirmar",
            press: function () {
              let newModel = new JSONModel();
              let oldModel = this.getView().getModel().oData.ContactsCollection;
              //define o atributo ContactsCollection como sendo um array, pra poder fazer push depois
              newModel.oData.ContactsCollection = [];
              let indiceAExcluir = this.getView().byId('Table').getSelectedIndices();
              for (let i = 0; i < oldModel.length; i++) {
                //verifica se a linha atual é a que precisa excluir
                if (!indiceAExcluir.includes(i) || !indiceAExcluir.length) {
                  let newContact = {
                    "Name": oldModel[i].Name,
                    "Telephone": oldModel[i].Telephone
                  };
                  newModel.oData.ContactsCollection.push(newContact);
                }
              }
              this.getView().setModel(newModel);
              this.getView().byId('Table').setSelectedIndex()
              MessageToast.show("Contato(s) Excluido(s)");
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

      if (selectedRows.length > 1) {
        MessageBox.alert("CUIDADO MAIS DE 1 CONTATO SELECIONADO!!!");
      }
    },

    onClickChangeButton: function(oEvent){
      //get selected row from table (if any)
      const selectedRows = this.getView().byId('Table').getSelectedIndices();
      if (selectedRows.length > 1) {
        MessageBox.alert("SELECIONE APENAS UMA LINHA!!!");
        return;
      }
      else if (selectedRows.length === 0) {
        MessageBox.alert("SELECIONE UMA LINHA!!!");
        return;
      }
      else{
        //get local model
        const globalModel = this.getView().getModel();
        //set new property with the list of selected rows
        globalModel.setProperty("/selected",selectedRows);
        //set model globally
        this.getOwnerComponent().setModel(globalModel,"global");
        this.navTo("TestView")
      }
    },

    onClickAddButton: function(oEvent){
      //get selected row from table (if any)
      const selectedRows = this.getView().byId('Table').getSelectedIndices();
      if (selectedRows.length > 0) {
        MessageBox.alert("NÃO SELECIONE NENHUMA LINHA!!");
        return;
      }
      else{
        //get local model
        const globalModel = this.getView().getModel();
        //set new property with the list of selected rows
        globalModel.setProperty("/selected",selectedRows);
        //set model globally
        this.getOwnerComponent().setModel(globalModel,"global");
        this.navTo("TestView")
      }
    },

  });
});