let offset = 0,
    selectLimit = eleSelector('#selectLimit');
    limit = 5,
    disablePrev = false,
    disableNext = false,
    prevBtn = eleSelector('.prev'),
    nextBtn = eleSelector('.next');
  
const paginator = (result) => {  
    return result.slice(offset, limit);
}

const limitChange = () => {
    limit = Number(selectLimit.value);
    const rowData = records.slice(offset, offset+limit);
    replaceBodyContent(rowData, tbody);
    tableRowData = rowData;
}

const paginatorDataHandler = (offset) => {
    const tableRowData = records.slice(offset, offset+limit);
    replaceBodyContent(tableRowData, tbody);
}

const onPrev = () => {
    offset -= limit;
    if(offset === 0) {
        prevBtn.classList.add('disable');
    } else if(total - limit > offset) {
        nextBtn.classList.remove('disable');
    } else {
        prevBtn.classList.remove('disable');
    }
    paginatorDataHandler(offset);
}

const onNext = () => {
    offset += limit;
    if(offset === total - limit) {
        nextBtn.classList.add('disable');
    } else if(offset > 0) {
        prevBtn.classList.remove('disable');
    } else {
        nextBtn.classList.remove('disable');
    }
    paginatorDataHandler(offset);
}

eleSelector('.prev').addEventListener('click', onPrev);
eleSelector('.next').addEventListener('click', onNext);
selectLimit.addEventListener('change', limitChange);