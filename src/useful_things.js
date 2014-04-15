/**
 * Сюда складываем всякие кастомные (скопипастнутые) полезняшки
 * + описания к ним и ссылки или авторство
 */

/* заменить символ в позиции */
String.prototype.replaceAt = function(index, character) {
    character = character + "";
    return this.substr(0, index) + character + this.substr(index+character.length);
};

/* позволяет делать всякие такие штуки - "Hello {variable}".supplant({variable: "World !"})*/
String.prototype.supplant = function (o) {
    return this.replace(/\{([^{}]*)\}/g,
        function (a, b) {
            var r = o[b];
            return typeof r === 'string' || typeof r === 'number' ? r : a;
        }
    );
};

var ut = {};

/**
 * @brief Склоняет существительное по трем возможным формам
 * в зависимости от указанного числа.
 *
 * @param singular - единственное число; пример: 1 голос, 21 голос
 * @param paucal - паукальное число (обычно совпадает с единственным числом в родительном падеже);
 * @param plural - множественное число; пример: 11 голосов, 26 голосов, 113 голосов
 * пример: 2 голоса, 41 голос, 5 голосов
 *
 * @see http://ru.wikipedia.org/wiki/Паукальное_число
 *
 * @author av1984,
 * @ported by rmxrc
 */
ut.word_form = function (num, singular, paucal, plural, num_show) {
	var temp = num % 100,
        word_form = plural;
	if (((temp % 10) === 1) && (temp !== 11)) {
        word_form = singular;
    } else if ((temp > 10) && (temp < 20)) {
        word_form = plural;
    } else if (((temp % 10) >= 2) && ((temp % 10) <= 4)) {
        word_form = paucal;
    }
	if (num_show) { return num + '&nbsp;' + word_form; }
    return word_form;
};

/* Добавляем текст в текущую позицию textarea. Найдено в интернете
 * modified version of http://www.webmasterworld.com/forum91/4686.htm
 * myField accepts an object reference, myValue accepts the text string to add
 */
ut.insertAtCursor = function (myField, myValue) {
    //IE support
    if (document.selection) {
        myField.focus();

        //in effect we are creating a text range with zero
        //length at the cursor location and replacing it
        //with myValue
        var sel = document.selection.createRange();
        sel.text = myValue;

    //Mozilla/Firefox/Netscape 7+ support
    } else if (myField.selectionStart || myField.selectionStart === '0') {

        myField.focus();
        //Here we get the start and end points of the
        //selection. Then we create substrings up to the
        //start of the selection and from the end point
        //of the selection to the end of the field value.
        //Then we concatenate the first substring, myValue,
        //and the second substring to get the new value.
        var startPos = myField.selectionStart;
        var endPos = myField.selectionEnd;
        myField.value = myField.value.substring(0, startPos) + myValue + myField.value.substring(endPos, myField.value.length);
        myField.setSelectionRange(endPos + myValue.length, endPos + myValue.length);
    } else {
        myField.value += myValue;
    }
};

/* Итерирует объект, и возвращает первое соответсвие заданному шаблону.
 * author - rmnxrc
 * использование:
       var item = ut.detect([1, 2, 3, 4, 5], function(value){
           return value > 3;
       });
       //item = 4
 */
ut._detect = function (iter_object, fn) {
    var result = false;

    for (var i = 0; i < iter_object.length; i++) {
        var value = iter_object[i];

        if (fn(value)) {
            result = value;
            break;
        }
    }

    return result;
};

/*
 * возвращает значение гет параметра из урл адреса.
 * url - строка урл
 * param - строка с именем параметра
 * если параметр не существует возвращает undefined,
 * если существуте но без значения - возвращает '' (напр. http://localhost?param&test=3, т.е получается что param = '')
 * ut.getUrlParam("http://yandex.ru?foo=bar&other=other", foo); // вернет bar
 * */
ut.getUrlParam = function (url, param) {
    var params = url.split('#')[0].split('?')[1];
    if (!params) { return; }
    params = params.split("&");
    var result = ut._detect(params, function (val) { return val.split('=')[0] === param; });
    if (!result) { return; }
    return result.split('=')[1] || '';
};

/* возвращает объект где ключи соответствуют гет параметрам в строке url */
ut.getUrlParams = function(url) {
    var params = url.split('?')[1];
    if (params === undefined || !params.trim()) { return; }

    var result = {},
        splitted_params = params.split("&");

    for (var i = 0; i < splitted_params.length; i++) {
        var splitted = splitted_params[i];
        splitted = splitted.split('=');
        result[splitted[0]] = splitted[1] ? decodeURIComponent(splitted[1]) : "";
    }
    return result;
};

/*
 * обновляет гет параметры урл адреса,
 * url - строка урл
 * params - объект с названиями и значениями параметров ({param1: 'param1', param2: 'param2'})
 * */
ut.updateUrlParams = function (url, params) {
    var temp  = url.split('#');
    var temp2 = temp.shift();
    var hash = temp.join('#'); // вдруг там такой хэш с несколькими знаками #
    temp = temp2.split('?');
    var address = temp[0];
    var parametrs = temp[1] ? temp[1].split('&') : '';

    var updatedParams = [];
    for (var i = 0; i < parametrs.length; i++) {
        var val = parametrs[i];

        var param = val.split('=')[0];
        if (params[param] !== undefined) {
            val = param + "=" + params[param];
            delete params[param];
        }
        updatedParams.push(val);
    }

    if (Object.keys(params).length) {
        for (var k in params) {
            if (params.hasOwnProperty(k)) {
                updatedParams.push(k + '=' + params[k]);
            }
        }
    }
    updatedParams = updatedParams.length ? '?' + updatedParams.join('&') : '';
    hash = hash ? '#' + hash : '';
    return address + updatedParams + hash;
};

/* удаляет элемент из массива */
ut.removeElFromArray = function (el, arr) {
    var index = arr.indexOf(el);
    if (index === -1) { return arr; }

    arr.splice(index, 1);
    return arr;
};

/* пытается преобразовать данные в json,
 * если получает объект то возвращается объект,
 * иначе false */
ut.tryToJsonParse = function(data) {
    if (typeof data === "object") { return data; }
    try { return JSON.parse(data); } catch (e) {}
    return false;
};

/*if no container defined, document will be used */
ut.isElementInDomContainer = function(element, container) {
    if (!container) { container = document; }
    while (element) {
        element = element.parentNode;
        if (element === container) { return true; }
    }
    return false;
};

/* создает новый класс с css правилами. Который можно впоследствии применить к элементу */
ut.createCssClass = function(classname, rules) {
    var style = document.createElement('style');

    var arr = [];
    for (var rulename in rules) {
        if (rules.hasOwnProperty(rulename)) {
            arr.push(rulename + ":" + rules[rulename]);
        }
    }

    arr = arr.join("; ");

    style.innerHTML = "." + classname + "{" + arr + "}";
    style.type = 'text/css';

    var head = document.getElementsByTagName('head')[0];
    head.appendChild(style);
    return classname;
};

/* Ждем до дех пор пока expression_callback не вернет true
 * Использовать только тогда когда точно известно что expression_callback вернет true, иначе - бесконечный цикл */
ut.waitUntil = function (expression_callback, callback) {
    if (expression_callback()) { return callback(); }
    setTimeout(function() {
        ut.waitUntil(expression_callback, callback);
    }, 100);
};

/* Удаляет все пробелы и переносы строк: до элемена, после элемента. А так же сам этот элемент
 * Пример:
 * <span>foo_</span>
 * <div id="remove_extra_space"></div>
 * <span>bar></span>
 * 
 * ut.removeExtraSpaces(document.getElementById("remove_extra_space"));
 *
 * При рендере увидим так: foo_bar
 * */
ut.removeExtraSpaces = function(el) {
    var next = el.nextSibling;
    var prev = el.previousSibling;
    var pnode = el.parentNode;
    if (next.nodeType === 3) { pnode.removeChild(next);  }
    if (prev.nodeType === 3) { pnode.removeChild(prev);  }
    pnode.removeChild(el);
};
ut.removeAllExtraSpaces = function(el_list) {
    for (var i = 0; i < el_list.length; i++) {
        ut.removeExtraSpaces(el_list[i]);
    }
};

/* this is for angular js */
ut.getUrlFromNgPattern = function(url, params) {
    var url_splitted = url.split("/"), params_rest = {};

    for (var key in params) {
        if (params.hasOwnProperty(key)) {
            var value = params[key];
            var url_splitted_index = url_splitted.indexOf(':' + key);

            if (url_splitted_index !== -1) {
                url_splitted.splice(url_splitted_index, 1, value);
            } else {
                params_rest[key] = value;
            }
        }
    }
    return ut.updateUrlParams(url_splitted.join("/"), params_rest);
};

ut.cookie = {
    get: function(key) {
        var value;
        var splitted_cookie = document.cookie.split(";");
        for (var i = 0; i < splitted_cookie.length; i++) {
            var keyval = splitted_cookie[i].trim();
            
            if (keyval.split('=')[0] === key) {
                value = keyval.split('=')[1];
                break;
            }
        }
        return value;
    }
};
