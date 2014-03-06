/*global describe, expect, beforeEach, it, ut, waitsFor*/

describe('ut.getUrlParam', function() {
    it('один или несколько параметров', function() {
        var url = "http://yandex.ru?foo=bar";
        var foo = ut.getUrlParam(url, 'foo');
        expect(foo).toBe('bar');

        url = "http://yandex.ru?foo=bar&param2=thisisparam2";
        var param2 = ut.getUrlParam(url, 'param2');
        expect(param2).toBe('thisisparam2');
    });
    it('несуществующий параметр или нет параметров в урл. Вернет undefined', function() {
        var url = "http://yandex.ru?foo=bar&param2=thisisparam2";
        var another_param = ut.getUrlParam(url, 'another_param');
        expect(another_param).toBe(undefined);

        url = "http://yandex.ru";
        another_param = ut.getUrlParam(url, 'another_param');
        expect(another_param).toBe(undefined);
    });
    it('параметр повторяется несолько раз. Берется всегда первый', function() {
        var url = "http://yandex.ru?foo=bar1&foo=bar2";
        var foo = ut.getUrlParam(url, 'foo');
        expect(foo).toBe('bar1');
    });
    it('плюс хэш', function() {
        var url = "http://yandex.ru?foo=bar1&foo=bar2#helloiamhash";
        var foo = ut.getUrlParam(url, 'foo');
        expect(foo).toBe('bar1');

        url = "http://yandex.ru?foo=bar1&foo=bar2#?foo1=bar2";
        var foo1 = ut.getUrlParam(url, 'foo1');
        expect(foo1).toBe(undefined);
    });
    it('?foo=', function() {
        expect(ut.getUrlParam("http://yandex.ru?foo=", 'foo')).toBe('');
    });
    it('?foo=bar', function() {
        expect(ut.getUrlParam("?foo=bar", 'foo')).toBe('bar');
    });
});

describe('ut.getUrlParams', function() {
    it('набор параметров', function() {
        var url = "http://yandex.ru?foo=foo&bar=bar";
        var params = ut.getUrlParams(url);
        expect(params.foo === 'foo' && params.bar === 'bar').toBe(true);
    });
    it('empty params', function() {
        var params = ut.getUrlParams("http://yandex.ru");
        expect(params).toBe(undefined);
    });
});

describe('ut.updateUrlParams', function() {
    it('ut.updateUrlParams', function() {
        var url = "http://yandex.ru?foo=foo&bar=bar";
        var new_url = ut.updateUrlParams(url, {foo: 'foo1', bar: 'bar1'});
        expect(new_url).toBe("http://yandex.ru?foo=foo1&bar=bar1");
    });
    it('new values', function() {
        var url = "http://yandex.ru?foo=foo&bar=bar";
        var new_url = ut.updateUrlParams(url, {new_val: 'new_val'});
        expect(new_url).toBe("http://yandex.ru?foo=foo&bar=bar&new_val=new_val");
    });
    it('hash', function() {
        var url = "http://yandex.ru?foo=foo&bar=bar#hash";
        var new_url = ut.updateUrlParams(url, {new_val: 'new_val'});
        expect(new_url).toBe("http://yandex.ru?foo=foo&bar=bar&new_val=new_val#hash");
    });
    it('empty', function() {
        var url = "http://yandex.ru";
        var new_url = ut.updateUrlParams(url, {});
        expect(new_url).toBe("http://yandex.ru");
    });
});

describe('ut.removeExtraSpaces', function() {
    it('removeExtraSpaces', function() {
        var $el = $("<div><span>foo_</span>\n     <span class='remove_extra'></span>       \n<span>bar</span></div>");
        var remove_extra = $el.find('.remove_extra')[0];
        ut.removeExtraSpaces(remove_extra);
        expect($el.text()).toBe('foo_bar');
    });
    it('removeExtraSpaces with no extra spaces', function() {
        var $el = $("<div><span>foo_</span><span class='remove_extra'></span><span>bar</span></div>");
        var remove_extra = $el.find('.remove_extra')[0];
        ut.removeExtraSpaces(remove_extra);
        expect($el.text()).toBe('foo_bar');
    });
});

describe('ut.removeAllExtraSpaces', function() {
    var $el = $(
        "<div>" +
            "<span>foo_</span>\n     <span class='remove_extra'></span>       \n<span>bar</span>" +
            " <span>foo_</span>\n     <span class='remove_extra'></span>       \n<span>bar</span>" +
        "</div>");
    var $remove_extra = $el.find('.remove_extra');
    ut.removeAllExtraSpaces($remove_extra);
    expect($el.text()).toBe('foo_bar foo_bar');
});

describe('ut.removeElFromArray', function() {
    it('remove', function() {
        var arr = ut.removeElFromArray(2, [1,2,3,4,5]);
        expect(arr.length).toBe(4);
        expect(arr[1]).toBe(3);
    });
    it('remove', function() {
        var arr = ut.removeElFromArray(8, [1,2,3,4,5]);
        expect(arr.length).toBe(5);
    });

});

describe('ut.tryToJsonParse', function() {
    it('пробуем со строкой', function() {
        var json = ut.tryToJsonParse('{"foo":"foo", "bar": "bar"}');
        expect(json.foo).toBe('foo');
        expect(json.bar).toBe('bar');
    });
    it('пробуем с объектом', function() {
        var json = {foo: 'foo', bar: 'bar'};
        var parsed = ut.tryToJsonParse(json);
        expect(json).toBe(parsed);
    });
    it('невалидный json', function() {
        var json = ut.tryToJsonParse('{"foo":"foo", , "bar": "bar"}');
        expect(json).toBe(false);
    });
});

describe('ut.isElementInDomContainer', function() {
    it('Проверяем есть ли элемент. Потом удаляем его, и снова проверяем', function() {
        var container = [
            "<div>",
                "<div id='el'>",
                    "inner text",
                "</div>",
            "</div>"].join('');
        container = $(container).get(0);

        var $el = $(container).find('#el');
        var el = $el.get(0);
        var is_in_dom = ut.isElementInDomContainer(el, container);
        expect(is_in_dom).toBe(true);

        $el.remove();
        is_in_dom = ut.isElementInDomContainer(el, container);
        expect(is_in_dom).toBe(false);

        ut.isElementInDomContainer(el);
    });
});

describe('ut.waitUntil', function() {
    it('waitUntil', function() {
        var waiter;
        ut.waitUntil(function() { return true; }, function() { waiter = true; });
        expect(waiter).toBe(true);

    });

    it('waitUntil', function() {
        var waiter;
        var t = false;
        ut.waitUntil(function() {
            setTimeout(function() { t = true; }, 200);
            return t;
        }, function() {
            waiter = true;
        });
        
        waitsFor(function() {
            return waiter;
        }, 1000);
    });
});

describe('ut.createCssClass', function() {
    it('создаем новое css правило и пробуем применить его к элементу', function() {
        var classname = ut.createCssClass('classname', {
            width: '200px',
            'height': '100px'
        });

        expect(classname).toBe('classname');

        var $div = $("<div></div>");
        $("body").append($div);
        $div.addClass(classname);
        expect($div.width()).toBe(200);
        expect($div.height()).toBe(100);
    });
});

describe('ut.getUrlFromNgPattern', function() {
    it('простой способ', function() {
        var url = ut.getUrlFromNgPattern("http://yandex.ru/foo/bar/:id", {id: 'test_id', param1: 'param1', param2: 'param2'});
        expect(url).toBe("http://yandex.ru/foo/bar/test_id?param1=param1&param2=param2");
    });
});

describe('String', function() {
    it('replaceAt', function() {
        var repl = "xyz";
        repl = repl.replaceAt(2, "x");
        expect(repl).toBe("xyx");

        repl = repl.replaceAt(1, "zzz");
        expect(repl).toBe("xzzz");
    });
    it('supplant', function() {
        expect("Hello {variable}".supplant({variable: 'World!'})).toBe("Hello World!");
        expect("Hello {variable}".supplant({variable: 1})).toBe("Hello 1");
        expect("Hello {variable}".supplant({variable: {foo: 'bar'}})).toBe("Hello {variable}");
    });
});

describe('Word form', function() {
    it('word_form', function() {
        expect(ut.word_form(51, 'голоc', 'голоса', 'голосов')).toBe('голоc');
        expect(ut.word_form(222, 'голоc', 'голоса', 'голосов')).toBe('голоса');
        expect(ut.word_form(515, 'голоc', 'голоса', 'голосов', true)).toBe('515&nbsp;голосов');
    });
    it('word_form with zero', function() {
        expect(ut.word_form(0, 'голоc', 'голоса', 'голосов')).toBe('голосов');
    });
});

describe('ut.cookie.get', function() {
    it('ut.cookie.get', function() {
        document.cookie = "foo=bar;test=test";
        expect(ut.cookie.get('foo')).toBe('bar');
        expect(ut.cookie.get('bar')).toBe(undefined);
    });
});
