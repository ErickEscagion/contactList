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
			
			this._showFormFragment("Display");

		},

		_formFragments: {},

		_getFormFragment: function (sFragmentName) {
			var oFormFragment = this._formFragments[sFragmentName];

			if (oFormFragment) {
				return oFormFragment;
			}

			oFormFragment = sap.ui.xmlfragment(this.getView().getId(), "com.myorg.contactList.view.TestView" + sFragmentName); //essa linha??

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