function sort(s) {
    if ('' != s) {
        $("#orderByField").val(s);
        var sortDirection = $("#sortDirection").val();
        if ('' == sortDirection) {
            sortDirection = 'desc';
        } else if ('desc' == sortDirection) {
            sortDirection = 'asc';
        } else if ('asc' == sortDirection) {
            sortDirection = 'desc';
        }
        $("#sortDirection").val(sortDirection);
    } else {
        $("#orderByField").val('');
        $("#sortDirection").val('');
    }
//	submit();
    urlMatch(form,formAction);
}