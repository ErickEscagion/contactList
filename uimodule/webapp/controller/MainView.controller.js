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
      
      const refreshView = () => {
        const globalModel = this.getOwnerComponent().getModel("global");
        
        if(!globalModel){ 
          var oJSONModel = this.initSampleDataModel();
          //this.getView().setModel(oJSONModel);
          this.getOwnerComponent().setModel(oJSONModel,"global");
        }else{
          //this.getView().setModel(globalModel);
          this.getOwnerComponent().setModel(globalModel,"global");
        }
        this.getOwnerComponent().getModel("global").refresh(true);
      };

      var oView = this.getView();
      oView.addEventDelegate({
           onAfterShow: refreshView
      }, oView);      
      refreshView();
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
              let oldModel = this.getOwnerComponent().getModel("global").oData.ContactsCollection;
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
              this.getOwnerComponent().setModel(newModel,"global");
              this.getView().byId('Table').setSelectedIndex();
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
        const globalModel = this.getOwnerComponent().getModel("global");
        globalModel.setProperty("/selected",selectedRows);
        this.getOwnerComponent().setModel(globalModel,"global");
        this.navTo("TestView")
      }
    },
    
    onClickAddButton: function(oEvent){
      const selectedRows = this.getView().byId('Table').getSelectedIndices();
      if (selectedRows.length > 0) {
        MessageBox.alert("NÃO SELECIONE NENHUMA LINHA!!");
        return;
      }
      else{
        const globalModel = this.getOwnerComponent().getModel("global");
        globalModel.setProperty("/selected",selectedRows);
        this.getOwnerComponent().setModel(globalModel,"global");
        this.navTo("TestView")
      }
    },
    
  });
});