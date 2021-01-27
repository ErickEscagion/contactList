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
						"Name": "",
						"Telephone": ""
					}
				}
			}
			//set selected row data in localModel
			localModel.setProperty("/selectedRowData",selectedRowData());
			
			oFormFragment = sap.ui.xmlfragment(this.getView().getId(), "com.myorg.contactList.view." + sFragmentName, this); 
			
			var myFragment = (this._formFragments[sFragmentName] = oFormFragment);
			return myFragment;
		},
		
		_showFormFragment : function (sFragmentName) {
			var oPage = this.getView().byId("page");
			
			oPage.removeAllContent();
			oPage.insertContent(this._getFormFragment(sFragmentName));
		},
		
		onClickViewMainButton: function (oEvent) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("MainView");
		},
		
		onPopupOk: function (oEvent) {
			const oModel = this.getView().getModel();
			const selectedRows = oModel.getProperty('/selected');
			const tableData = oModel.getProperty('/ContactsCollection');
			if(selectedRows.length){

				tableData[selectedRows[0]].Name = this.getView().byId('Name').getValue();
				tableData[selectedRows[0]].Telephone = this.getView().byId('Telephone').getValue();
			}else{
				tableData.push({
					"Name": this.getView().byId('Name').getValue(),
					"Telephone": this.getView().byId('Telephone').getValue()
				})
			}
			this.getOwnerComponent().setModel(oModel,"global");
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("MainView");
		},
	});
	return PageController;
});