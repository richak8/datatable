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
    const tableRowData = records.slice(offset, offset+limit);
    paginator(tableRowData);
    replaceBodyContent(tableRowData, tbody);
}

const paginatorDataHandler = (offset) => {
    const tableRowData = records.slice(offset, offset+limit);
    replaceBodyContent(tableRowData, tbody);
}

const onPrev = () => {
    offset -= limit;
    if(offset === 0) {
        prevBtn.classList.add('disable');
    } else {
        prevBtn.classList.remove('disable');
    }
    paginatorDataHandler(offset);
}

const onNext = () => {
    offset += limit;
    if(offset === total - 5) {
        nextBtn.classList.add('disable');
    } else {
        nextBtn.classList.remove('disable');
    }
    if(offset > 0) {
        prevBtn.classList.remove('disable');
    }
    paginatorDataHandler(offset);
}

eleSelector('.prev').addEventListener('click', onPrev);
eleSelector('.next').addEventListener('click', onNext);
selectLimit.addEventListener('change', limitChange);