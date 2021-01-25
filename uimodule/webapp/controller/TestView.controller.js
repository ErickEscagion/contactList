//com.myorg.contactList.controller.TestView

sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"jquery.sap.global",
	"sap/ui/core/Fragment",
	"sap/ui/model/json/JSONModel"

], function(Controller,jQuery,Fragment,JSONModel) {
	"use strict";

	var PageController = Controller.extend("com.myorg.contactList.controller.TestView", {
		onInit: function (oEvent) {
	

			var oModel = this.getOwnerComponent().getModel("oModelContacts"); // esta certo?
			this.getView().setModel(oModel);
			this.getView().bindElement("/ContactsCollection/0");
			
			this._showFormFragment("Display");

		},

		_formFragments: {},

		_getFormFragment: function (sFragmentName) {
			var oFormFragment = this._formFragments[sFragmentName];

			if (oFormFragment) {
				return oFormFragment;
			}

			oFormFragment = sap.ui.xmlfragment(this.getView().getId(), "TestView" + sFragmentName); //TestView ??

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