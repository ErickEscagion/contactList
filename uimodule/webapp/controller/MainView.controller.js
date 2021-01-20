sap.ui.define([
  "com/myorg/contactList/controller/BaseController",
  "sap/m/MessageBox",
  "sap/base/Log",
  "sap/ui/model/json/JSONModel",
  "sap/ui/thirdparty/jquery",
], function(Controller, MessageBox, Log, JSONModel, jQuery, oDialog1) {
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
      var oDialog1 = new sap.ui.commons.Dialog("Dialog", {
        modal: true,
        closed: function(oControlEvent){
          sap.ui.getCore().getElementById('Dialog').destroy();
        }
      });
      oDialog1.setTitle("Adicionar Contatos");
      var oLayout = new sap.ui.commons.layout.MatrixLayout({
        columns: 2,
        width: "100%"
        });               
             var oLabel=new sap.ui.commons.Label({text: "Nome"});
             var oTF= new sap.ui.commons.TextField("empName",{width: '200px'});
             oLayout.createRow(oLabel, oTF);
     
             var oLabel=new sap.ui.commons.Label({text: "Telefone"});
             var oTF=new sap.ui.commons.TextField("empTelephone",{width: '200px'});
             oLayout.createRow(oLabel, oTF);

            oDialog1.addContent(oLayout);
            oDialog1.addButton(new sap.ui.commons.Button({text: "Salvar", press:function(){

            var name    = sap.ui.getCore().getControl("empName").getValue(); 
            var telephone     = sap.ui.getCore().getControl("empTelephone").getValue(); 
            console.log(name);
            console.log(telephone);

            const newContact = {
              "Name": name,
              "Telephone": telephone
            }
            this.getModel().getProperty("ContactsCollection").push(newContact);
            alert("SALVO COM SUCESSO");
            
            oDialog1.close();}}));
            oDialog1.open();
    },

    onClickChangeContactButton: function(oEvent){
    	MessageBox.success('clicou no botão alterar contato');
    },

    onClickDeleteContactButton: function(oEvent){
    	MessageBox.success('clicou no botão excluir contato');
    }

  });
});