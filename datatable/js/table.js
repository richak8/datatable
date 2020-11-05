// Global Variable Declaration

let sortableCols,
    filterableCols,
    isHeaderFixed,
    isPaginated,
    selectEntries = eleSelector('.selectEntries'),
    search = eleSelector('.searchWrapper'),
    pagination = eleSelector('.pagination'),
    tableRowData,
    table = createNode('table'),
    thead = createNode('thead'),
    tbody = createNode('tbody'),
    tableContainer = eleSelector('.tableContainer'),
    records,
    total,
    loader = eleSelector('.loader');

// loader     
const loaderHandler = () => {
    loader.classList.add('flex');
}    

const fetchData = async() => {
    try {     
        const url = 'https://restcountries.eu/rest/v2/all';
        const response = await fetch(url);
        const result =  await response.json(); // read response body as json
        createTable(result);
    } catch(error) {
        console.log(error);
    }
}

// table
const createTable = (result) => {
    // Entries selection is only enlabed in the case of paginator true    
    isPaginated &&  selectEntries.classList.add('flex');
    isPaginated &&  pagination.classList.add('flex');

    //isPaginated is false
    !isPaginated &&  selectEntries.classList.remove('flex');
    !isPaginated &&  pagination.classList.remove('flex');

    // when result length is greater than zero
    if(result.length > 0) {
        search.classList.add('display');
        loader.classList.remove('flex');
    } 

    // isPaginated is true, isPaginated is shown
    if(result.length > 0 && isPaginated) {
        paginationState(result);
        paginatedRowData = paginator(result);
    }

    // if isPaginated is false, it will display complete list
    tableRowData = isPaginated ? paginatedRowData : result;

    // table headers
    appendChild(table,thead);
    replaceHeaderContent(thead);

    // table body
    appendChild(table,tbody);
    replaceBodyContent(tableRowData, tbody);

    // appending tableContainer to table
    appendChild(tableContainer, table);
}

// table header
const getHeadersContent = (thead) => {
    tr = createNode('tr');
    tr.setAttribute('class', 'headRow')
    appendChild(thead,tr);
    headers.forEach(head => {
        th = createNode('th');
        appendChild(tr,th);
        th.innerText = `${head.title}`;

        //if isHeaderFixed is true, header is fixed.
        isHeaderFixed &&  th.classList.add('sticky');

       //if isHeaderFixed is false.
       !isHeaderFixed &&  th.classList.remove('sticky');

        // filterable columns
        if(filterableCols[[head.id]]) getFilterableColumns(th,head.id);
    
        //sortable columns
        if(sortableCols[[head.id]]) getSortableColumns(th, head.id);
    });
}

// table body 
const getBodyContent = (tableRowData, tbody) => {
    if(tableRowData.length > 0) {
        tableRowData.forEach(rowData => {
            tr = createNode('tr');
            tr.setAttribute('class', 'bodyRow')
            appendChild(tbody,tr);
            headers.forEach(head => {
                td = createNode('td');
                appendChild(tr,td);
                switch(head.id) {
                    case 'currencies': return (td.innerText =  rowData[head.id] ? getCurrencyName(rowData[head.id]) : '-');
                    case 'flag': return (rowData[head.id] ?  appendChild(td, getImage(rowData[head.id])) : '-');
                    default: return (td.innerText = rowData[head.id] || '-');
                }
            });
        });
    }
}

// replace body row 
const replaceBodyContent = (tableRowData, tbody) => {
    let bodyRowList = eleSelectorAll('.bodyRow');
    if (bodyRowList){
        for(let i = 0; i < bodyRowList.length; i++) {
            removeChild(tbody,bodyRowList[i]);
        }
    }
    getBodyContent(tableRowData,tbody);
}

// replace header row 
const replaceHeaderContent = (thead) => {
    let headRowList = eleSelectorAll('.headRow');
    if (headRowList){
        for(let i = 0; i < headRowList.length; i++) {
            removeChild(thead,headRowList[i]);
        }
    }
    getHeadersContent(thead);
}

// Set state for Paginator
const paginationState = (result) => {
    records = result,
    total = result && result.length
} 

// Column Filter implementation
const getFilterableColumns = (th, inputName) => {
    filterInput = getInput('type', 'All', '', 'colFilter', inputName);
    appendChild(th, filterInput);
    th.addEventListener('input', (e) => {
        handleFilter(e.target.name, e.target.value);
    })
}

const handleFilter = (name, value) => {
    const filteredData = tableRowData.filter(rowData => {
        if(name === 'currencies') {
            return getCurrencyName(rowData[name]).toLowerCase().includes(value.toLowerCase());
        } else {
            return rowData[name].toLowerCase().includes(value.toLowerCase());
        }
    });   
    replaceBodyContent(filteredData, tbody);
}

// Columns Sorting
const getSortableColumns = (th, key) => {
    appendChild(th,getImage(arrowImg, 'down', sortDataOnDownArrowClick(key)));
    appendChild(th,getImage(arrowImg, 'up', sortDataOnUpArrowClick(key)));
}

const sortDataOnDownArrowClick = (key) => () => {
    const sortedResult = tableRowData.sort(sortData(key, 'desc'));
    replaceBodyContent(sortedResult, tbody);
}

const sortDataOnUpArrowClick = (key) => () => {
    const sortedResult = tableRowData.sort(sortData(key));
    replaceBodyContent(sortedResult, tbody);
}

// table configration values
const tableConfigration = () => {
    const sortableColsTemp = {};
    const filterableColsTemp = {};
    const sortableColsList = document.form.sortableCol,
          filterableColsList = document.form.filterableCol,
          fixedHeader = document.form.fixedHeader,
          pagination = document.form.pagination;
         
    sortableColsList.forEach(colEle => {
        sortableColsTemp[colEle.value] = colEle.checked }
    );
    
    filterableColsList.forEach(colEle => {
        filterableColsTemp[colEle.value] = colEle.checked }
    ); 

    sortableCols = sortableColsTemp;
    filterableCols = filterableColsTemp;
    isHeaderFixed = fixedHeader.checked;
    isPaginated = pagination.checked;
}

// Search implementation
const searchData = (e) => {
    const val = e.target.value.toLowerCase();

    const filteredData = records.filter(row => {
        return row.name.toLowerCase().includes(val) ||
            row.capital.toLowerCase().includes(val) ||
            row.region.toLowerCase().includes(val) || 
            getCurrencyName(row.currencies).toLowerCase().includes(val) 
    });
    replaceBodyContent(filteredData, tbody);
}

eleSelector('#search').addEventListener('input', (e) => {
    searchData(e, 'search');
});

const buttonHander = () => {
    loaderHandler();
    tableConfigration();
    fetchData();
}

    
