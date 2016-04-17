/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       16 Apr 2016     Branko Pedisic   ardento.com.au
 *
 */
var custCtlr = custCtlr || {};

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your script deployment. 
 * @appliedtorecord recordType
 * 
 * @param {String} type Operation types: create, edit, delete, xedit,
 *                      approve, cancel, reject (SO, ER, Time Bill, PO & RMA only)
 *                      pack, ship (IF only)
 *                      dropship, specialorder, orderitems (PO only) 
 *                      paybills (vendor payments)
 * @returns {Void}
 */
custCtlr.sendEmail = function (type){
  
	if (type != 'create')
		return;
	
	var custRecord = nlapiGetNewRecord();
	
	var context = nlapiGetContext();
	
	var employeeRec = nlapiLoadRecord('Employee', context.getUser());
	
	var recipient = 'manager@test.com.au';
	var subject = 'New customer alert!';
	var body = '<b>New NewSuite customer</b>'
		+ '<br/><b>Customer name:</b>'
		+ '<br/>' + custRecord.getFieldValue('entityid')
		+ '<br/><br/><b>Created by:</b>'
		+ '<br/>' + employeeRec.getFieldValue('firstname');
	
	nlapiSendEmail(context.getUser(), recipient, subject, body);
};
