const createNode = (ele) => document.createElement(ele); 

const appendChild = (parent, ele) => parent.appendChild(ele);

const removeChild = (parent, ele) => parent.removeChild(ele);

const eleSelector = (ele) => document.querySelector(ele);

const eleSelectorAll = (ele) => document.querySelectorAll(ele);

const getImage = (imgUrl, className, clickHander) => {
    let img = createNode('img');
    img.src = imgUrl;
    if(imgUrl) img.alt = imgUrl;
    if(clickHander) img.onclick = clickHander;
    if(className) img.classList.add(className);
    return img;
}

const getInput = (type, placeholder, value, className, inputName) => {
    let input = createNode('input');
    input.setAttribute('type', type);
    input.setAttribute('placeholder', placeholder);
    input.setAttribute('value', value);
    input.setAttribute('name', inputName);
    input.classList.add(className);
    return input;
}

const getAnchorTag = (onclick, innerText) => {
    let a = createNode('a');
    a.href='return false';
    a.onclick = onclick;
    a.innerText = innerText;
    return a; 
}

const getCurrencyName = (currency) => currency[0].name;

const sortData = (key, order = 'asc') => (next, current) => {
    if(!current.hasOwnProperty(key) || !next.hasOwnProperty(key)) return 0;

    let comparisonVal;

    if(key === 'currencies') {
        comparisonVal = getCurrencyName(next[key]).localeCompare(getCurrencyName(current[key]),'en');
    } else {
        comparisonVal = next[key].localeCompare(current[key],'en');
    }

    return order === 'desc' ? comparisonVal * -1 : comparisonVal;
}

const debounce = (fn, delay) => {
    let timeout;
    return (...args) => {
        if(timeout) clearTimeout(timeout);
        timeout = setTimeout(() => fn(...args), delay);
    }
}