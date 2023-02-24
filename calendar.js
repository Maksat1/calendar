let calendar = document.querySelector('#calendar');
let body = calendar.querySelector('.body');
let info = calendar.querySelector('.info');
let prev = calendar.querySelector('.prev');
let next = calendar.querySelector('.next');

let date  = new Date();
let year  = date.getFullYear();
let month = date.getMonth();

let months = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'];

function range(count) { //создает массив от 1 до count
    let arr = [];

    for (let i = 1; i <= count; i++) {
        arr.push(i);
    }
    return arr;
}

function getLastDay(year, month) { //возвращает номер последнего дня месяца
    let day = new Date(year, month + 1, 0);
    return day.getDate();
}

function getFirstWeekDay(year, month) { //вычисляет день недели
    let firstDay = new Date(year, month, 1);
    let dayOfWeek = firstDay.getDay();
    if (dayOfWeek === 0) {
        dayOfWeek = 6;
    } else {
        dayOfWeek--;
    }
    return dayOfWeek;
}

function getLastWeekDay(year, month) { //вычисляет день недели
    let lastDay = new Date(year, month + 1, 0);
    let dayOfWeek = lastDay.getDay();
    if (dayOfWeek === 0) {
        dayOfWeek = 6;
    } else {
        dayOfWeek--;
    }
    return dayOfWeek;
}

function normalize(arr, left, right) { //добавляет пустые элементы в начало и конец
    for (let i = 0; i < left; i++) {
        arr.unshift('');
    }
    for (let j = 0; j < right; j++) {
        arr.push('')
    }
     return arr;
}

function chunk(arr, n) { //разбивает массив на двухмерный массив
    let part = [];
    for (let i = 0; i < arr.length; i += n) {
        let chunk = arr.slice(i, i + n);
        part.push(chunk);
    }
    return part;
}

function createTable(parent, arr) {
    for (let subArr of arr) {
        let tr = document.createElement('tr');
        for (let i = 0; i < subArr.length; i++) {
            let td = document.createElement('td');
            td.textContent = subArr[i];
            tr.appendChild(td);
        }
        parent.appendChild(tr)
    }
}

function draw(body, year, month) {
    let arr = range(getLastDay(year, month));
    let firstWeekDay = getFirstWeekDay(year, month);
    let lastWeekDay = getLastWeekDay(year, month);
    let nums = chunk(normalize(arr, firstWeekDay, 6 - lastWeekDay), 7);
    createTable(body, nums);
}

draw(body, year, month+4);
info.textContent = months[month] + ' ' + year;

function getNextYear(year, month) {
    if (month == 11) {
        return ++year;
    } else {
        return year;
    }
}

function getNextMonth(month) {
    if (month == 11) {
        return month = 0;
    } else {
        return ++month;
    }
}

function getPrevYear(year, month) {
    if (month == 0) {
        return --year;
    } else {
        return year;
    }
}

function getPrevMonth(month) {
    if (month == 0) {
        return month = 11;
    } else {
        // console.log(--month)
        return --month;
    }
}

next.addEventListener('click', function() {
    body.innerHTML = '';
    year = getNextYear(year, month);
    month = getNextMonth(month);
    draw(body, year, month);
    info.textContent = months[month] + ' ' + year;
})

prev.addEventListener('click', function() {
    body.innerHTML = '';
    year = getPrevYear(year, month);
    month = getPrevMonth(month);
    draw(body, year, month);
    info.textContent = months[month] + ' ' + year;
});