[![Build Status](https://travis-ci.org/krom-xr/js_useful_things.png?branch=master)](https://travis-ci.org/krom-xr/js_useful_things)

# Javasctipt useful things
================

## installation
useful things for javascript

    bower install js_useful_things

in index.html

    <script scr"path_to_bower_components/useful_things/src/useful_things.js">

## using

### ut.getUrlParam(url, param)
get value of url parameter from url address
if parameter dont exist, returns undefined
if paramater exist but without value, returns ""

    ut.getUrlParam('http://google.com?search=something&foo=bar', 'foo'); //returns 'foo'
    ut.getUrlParam('http://google.com?search=something&foo, 'foo'); //returns ""
    ut.getUrlParam('http://google.com?search=something', 'foo'); //returns undefined

### ut.getUrlParams(url)
returns object where keys associate with get parameters in url

    ur.getUrlParams('http://google.com?search=something&foo=bar');
    /* returns
        {
            search: 'something',
            foo: 'bar'
        }
    */

### ut.updateUrlParams(url, params)
returns url with updated get parameters
params - object where keys - is name of parameter and values if value of parameter

    ut.updateUrlParams("http://example.com?search=something", {search: 'other', foo: 'bar'});
    //returns "http://example.com?search=other&foo=bar"

### ut.removeElFromArray(element, array)
remove element from array

### ut.elementInDomContainer(element, container)
return true if element in dom container

### ut.createCssClass(classname, rules)
creates the css class

    var classname = ut.createCssClass('classname', {
        width: '100px',
        height: '100px'
    });

    var div = document.createateElement('div');
    div.className = classname;
    //when div will be append to body, its width and height will be 100px

### ut.removeExtraSpaces(element)
remove element and extra spaces near with him

    <span>foo_</span>
    <div id="remove_extra_space"></div>
    <span>bar></span>

    ut.removeExtraSpaces(document.getElementById("remove_extra_space"));

    //In a browser, you will see: foo_bar

### ut.removeAllExtraSpaces(elements_list)

    ut.removeAllExtraSpaces($(".remove_extra_space"));
    
