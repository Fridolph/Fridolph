var arrInputValues = new Array();
$("input[name='table[]']").each(function () {
    arrInputValues.push( $(this).val() );
});