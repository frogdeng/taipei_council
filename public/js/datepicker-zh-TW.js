/* Chinese initialisation for the jQuery UI date picker plugin. */
/* Written by Ressol (ressol@gmail.com). */
( function( factory ) {
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define( [ "../widgets/datepicker" ], factory );
	} else {

		// Browser globals
		factory( jQuery.datepicker );
	}
}( function( datepicker ) {

datepicker.regional[ "zh-TW" ] = {
	closeText: "����",
	prevText: "&#x3C;�W�Ӥ�",
	nextText: "�U�Ӥ�&#x3E;",
	currentText: "����",
	monthNames: [ "�@��","�G��","�T��","�|��","����","����",
	"�C��","�K��","�E��","�Q��","�Q�@��","�Q�G��" ],
	monthNamesShort: [ "�@��","�G��","�T��","�|��","����","����",
	"�C��","�K��","�E��","�Q��","�Q�@��","�Q�G��" ],
	dayNames: [ "�P����","�P���@","�P���G","�P���T","�P���|","�P����","�P����" ],
	dayNamesShort: [ "�g��","�g�@","�g�G","�g�T","�g�|","�g��","�g��" ],
	dayNamesMin: [ "��","�@","�G","�T","�|","��","��" ],
	weekHeader: "�g",
	dateFormat: "yy/mm/dd",
	firstDay: 1,
	isRTL: false,
	showMonthAfterYear: true,
	yearSuffix: "�~" };
datepicker.setDefaults( datepicker.regional[ "zh-TW" ] );

return datepicker.regional[ "zh-TW" ];

} ) );