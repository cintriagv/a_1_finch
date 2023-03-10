/**
* This is a description
* @namespace diopsi.de
* @method ~~~~~~~~~
* @param {String} some string
* @param {Object} some object
* @return {bool} some bool
*/

window.onload = dimension_update;
window.onresize = dimension_update;

let params = (new URL(document.location)).searchParams;
let code = params.get('code');

function array_elements_menu() { return ["begin","new","user_login_action"]; }
function array_class() { return ["animate-draw","animate-erase","visible","hidden","fade-display", "fade-hide"]; }
function object_api_smallco() { return {URL:"http://localhost:3000"};}
function object_sizes() { return {
    wide:{detail:"passed_in_sizer",menu:"15%",exit:"3%"},
    tall:{detail:"passed_in_sizer",menu:"20%",exit:"10%"}
};
}

async function accept_code () {
    
    console.log("OBJECT CODE BELOW BEING SENT TO SERVER")
    console.log(code)
    await api_smallco('default','POST','accept_code',code);
    console.log("CODE BELOW SENT TO SERVER")
}

async function begin_auth () {
    var redirect = await api_smallco('default','POST','begin')
    redirect = redirect.redirect
    console.log("BEGIN_AUTH_FUNCTION")
    console.log(redirect)
    window.location.replace(redirect)
}

function close_server () {
    var redirect = api_smallco('default','POST','session_END').resolve
    window.close()
    console.log(redirect)
}

async function api_smallco (URL, method, resource, data) {
    
    var URL = object_api_smallco().URL
    console.log("api_smallco: "+method+" "+URL+"/"+resource)
    
    var return_data = await fetch(URL+"/"+resource,{
        method:method,
        headers:{'Content-Type':'text/plain'},
        body:data
    })
    .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error, status = ${response.status}`);
        }
        return response.json();
      })
      .then((my_json) => {
        var my_json = my_json;
        return my_json
      })
      .catch((error) => {
        const p = document.createElement("p");
        p.appendChild(document.createTextNode(`Error: ${error.message}`));
      });

      return return_data
    

};


function sizer (item) {
    var w = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
    var h = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
    
    var sizes = object_sizes()

    if (h > w) {
        sizes.tall.detail= w*95/100;
        shape = "tall";
    }
    else {
        sizes.wide.detail= h*2/3;
        shape = "wide";
    }

    item_size = sizes[shape][item]
    
    return item_size
};

function dimension_update () {
    var list_menu = array_elements_menu()
    var length_menu = list_menu.length
    var main_menu_width = sizer("menu")

    for (let i = 0; i < length_menu; i++) {   
        document.getElementById(list_menu[i]).style.width = main_menu_width;  
    }

    console.log("DIMENSION UPDATE RAN")

};

function apply_class (item, action) {
    var list_class = array_class()

    if (action == "draw") {
        document.getElementById(item).classList.remove(list_class[1]);
        document.getElementById(item).classList.add(list_class[0]);
    }

    else if (action == "erase") {
        document.getElementById(item).classList.remove(list_class[0]);
        document.getElementById(item).classList.add(list_class[1]);
    }
    
    else if (action == "fadeIn") {
        document.getElementById(item).classList.remove(list_class[5]);
        document.getElementById(item).classList.add(list_class[4]);
        document.getElementById(item).classList.add(list_class[2]);
    }

    else if (action == "fadeOut") {
        document.getElementById(item).classList.remove(list_class[4]);
        document.getElementById(item).classList.add(list_class[5]);
        document.getElementById(item).classList.remove(list_class[2]);
    }
};

function display_detail (subject) {

    var list_menu = array_elements_menu()
    var list_escape = array_elements_escape()
    var list_accent = array_elements_accent_detail()
    var length_menu = list_menu.length
    var length_escape = list_escape.length
    var length_accent = list_accent.length

    localStorage.setItem("detail_displayed", subject);

    document.getElementById(subject).style.zIndex = "1";
    apply_class (subject,"fadeIn")

    for (let i = 0; i < length_accent; i++) { 
        apply_class (list_accent[i],"draw")
    }
    
    for (let i = 0; i < length_escape; i++) { 
        apply_class (list_escape[i],"draw")
        document.getElementById(list_escape[i]).style.zIndex = "1";         
    }

    for (let i = 0; i < length_menu; i++) { 
        apply_class (list_menu[i],"erase")
        document.getElementById(list_menu[i]).style.zIndex = "-1";
    }
};

function display_main () {
    var list_menu = array_elements_menu()
    var list_escape = array_elements_escape()
    var list_accent = array_elements_accent_detail()
    var length_menu = list_menu.length
    var length_escape = list_escape.length
    var length_accent = list_accent.length

    var detail_displayed = localStorage.getItem("detail_displayed");

    apply_class (detail_displayed,"fadeOut")

    console.log(detail_displayed)

    for (let i = 0; i < length_accent; i++) { 
        apply_class (list_accent[i],"erase")
    }

    for (let i = 0; i < length_escape; i++) { 
        apply_class (list_escape[i],"erase")
        document.getElementById(list_escape[i]).style.zIndex = "-1";  
    }

    for (let i = 0; i < length_menu; i++) { 
        apply_class (list_menu[i],"draw")
        document.getElementById(list_menu[i]).style.zIndex = "1";  
    }

    document.getElementById(detail_displayed).style.zIndex = "-2";   
};


