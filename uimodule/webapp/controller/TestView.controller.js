//com.myorg.contactList.controller.TestView

sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"jquery.sap.global",
	"sap/ui/core/Fragment",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageBox",
], function(Controller,jQuery,Fragment,JSONModel,MessageBox) {
	"use strict";
	
	var PageController = Controller.extend("com.myorg.contactList.controller.TestView", {
		onInit: function (oEvent) {
			
			
			//nenhuma das 3 tentativas apresentou o resultado desejado
			
			//let oModel = this.getView().getModel("oModelContacts");
			//let oModel = this.getOwnerComponent().getModel("oModelContacts");
			//let oModel = sap.ui.getCore().getModel("oModelContacts");
			
			//this.getView().setModel(oModel);
			//this.getView().bindElement("/ContactsCollection/0");
			
			//get model
			const globalModel = this.getOwnerComponent().getModel("global");
			//set the model locally
			this.getView().setModel(globalModel);
			this._showFormFragment("Display");
			
		},
		
		_formFragments: {},
		
		_getFormFragment: function (sFragmentName) {
			var oFormFragment = this._formFragments[sFragmentName];
			
			if (oFormFragment) {
				return oFormFragment;
			}
			
			//get selected table row
			const localModel = this.getView().getModel();
			const selectedRows = localModel.getProperty("/selected");
			//get contact list
			const contactList = localModel.getProperty("/ContactsCollection");
			//set new property to be used in the fragment
			const selectedRowData = () => {
				if (selectedRows.length) {
					//there is at least one row selected
					//let's use just the first one
					return contactList[selectedRows[0]];
				} else {
					//there's no row selected - return placeholders
					return {
						"Name": "Informe o nome",
						"Telephone": "Informe o telefone"
					}
				}
			}
			//set selected row data in localModel
			localModel.setProperty("/selectedRowData",selectedRowData());
			
			oFormFragment = sap.ui.xmlfragment(this.getView().getId(), "com.myorg.contactList.view." + sFragmentName); 
			
			var myFragment = (this._formFragments[sFragmentName] = oFormFragment);
			return myFragment;
		},
		
		_showFormFragment : function (sFragmentName) {
			var oPage = this.getView().byId("page");
			
			oPage.removeAllContent();
			oPage.insertContent(this._getFormFragment(sFragmentName));
		}
		
	});
	
	return PageController;
});