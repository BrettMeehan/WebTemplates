/*
* Create a filter table in an html document in the following manner:
* <table id="savedFilesFilter" class="table table-hover">
*     <thead>
*         <tr><th></th><th>FileID</th><th>File&nbsp;Type</th><th>Decimation</th><th>Quality</th><th>Date Downloaded</th></tr>
*     </thead>
*     <tbody>
*         <tr>
*             <td>Filter by:</td>
*             <td><input type ="text" onkeyup="addFilter('#savedFilesFilter', this, 1)"/></td>
*             <td><input type ="text" onkeyup="addFilter('#savedFilesFilter', this, 2)"/></td>
*             <td><input type ="text" onkeyup="addFilter('#savedFilesFilter', this, 3)"/></td>
*             <td><input type ="text" onkeyup="addFilter('#savedFilesFilter', this, 4)"/></td>
*             <td><input type ="text" onkeyup="addFilter('#savedFilesFilter', this, 5)"/></td>
*         </tr>
*     </tbody>
* </table>
*/

// filters the specified table rows based on saved filter criteria
function filter(filterID){
    var tableIDsToFilter = [];
    if(filterID === '#queueFilter'){
        tableIDsToFilter.push('#queueProgress');
        tableIDsToFilter.push('#pausedTasks');
        tableIDsToFilter.push('#loggedTasks');
    }else if(filterID === '#savedFilesFilter')
        tableIDsToFilter.push('#savedFiles');
    
    var concatTableIDs = '';
    for(var i = 0; i < tableIDsToFilter.length; ++i){
        concatTableIDs += tableIDsToFilter[i] + '>tbody>tr';
        if(i !== tableIDsToFilter.length - 1)
            concatTableIDs += ', ';
    }
    
    var filters = $(filterID).data('filters');
    if(filters == null)
        return false;
    $(concatTableIDs).each(function() {
        var matchesAll = true;
        for(var i = 0; i < filters.length; ++i){
            if(filters[i] != null){
                var re = new RegExp(filters[i],'i');//case insensitive match with beginning of entry
                if ($('td', this).eq(i).text().search(re) === -1){
                    matchesAll = false;
                    break;
                }
            }
        }
        if(matchesAll)
            $(this).show();
        else
            $(this).hide();
    });
}

// creates and stores a new filter, typically from the text of a table cell
function addFilter(filterID, element, index){
    var value = $(element).val();
    var filters = $(filterID).data('filters');
    if(filters == null)
        filters = [];
    filters[index] = value;
    $(filterID).data('filters', filters);
    filter(filterID);
}
