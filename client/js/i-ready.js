/**
 * This file is an abfuscated version of src/assets/js/i-ready.original.js.
 * Use https://obfuscator.io/ to obfuscate it
 * Any changes to the above file, should be obfuscated with the above utility and pasted below this comment
 * @type {string[]}
 * @private
 */
var arrDomain = location.hostname.split(".");
if(arrDomain.length > 2)
  arrDomain.shift();
document.domain = arrDomain.join(".");

function logout()
{
  //set timeout to ensure this can be called from child frame without breaking relative URL
  setTimeout(logout_, 0);
}

function logout_()
{
  // if impersonating a user with capublisher, just close the window without destroying the capublisher session
  try {
    if (window.opener && window.opener.exitSU)
      window.opener.exitSU();
    else
      window.location = '/logout';
  }
  catch(err) {
    window.location = '/logout';
  }
}

function doBrowserCheck(path)
{
	$.ajax({
	   type: "POST",
	   url: path,
	   contentType : "application/json",
	   dataType : "json",
	   success: function(data, textStatus) { handleBrowserCheck(data)  },
	   error: function(XMLHttpRequest, errorString, exceptionThrown) { logToConsole("Error doing browser check " + errorString + " " + exceptionThrown); },
	   complete: function(XMLHttpRequest, textStatus) { console.log("complete")}  
	});
}

function handleBrowserCheck(result) {
	if(result.browserNotSupported) {
		$("#browser-not-supported-container").show();
		$("#browser-not-supported-content").show();
	}
	
	if(result.browserAllowedNotFullySupported) {
		$("#browser-unknown-container").show();
		$("#browser-unknown-content").show();
	}
}

function getCookie(name)
{
	var i,x,y,arrCookies=document.cookie.split(";");
	for (i=arrCookies.length-1;i>=0;i--)
	{
		x=arrCookies[i].substr(0,arrCookies[i].indexOf("="));
		y=arrCookies[i].substr(arrCookies[i].indexOf("=")+1);
		x=x.replace(/^\s+|\s+$/g, '');
		
		if (x==name)
		{
			return unescape(y);
		}
	}
}

function setCookie(name,value,exdays)
{
	var exdate = new Date();
	exdate.setDate(exdate.getDate() + exdays);
	value = escape(value) + ((exdays === null || exdays === undefined) ? "" : "; expires=" + exdate.toUTCString()) + "; path=/";
	document.cookie=name + "=" + value;
}

function logToConsole(msg)
{
    if(typeof console != "undefined" && console.log)
    {
        console.log(msg);
    }
}
        
function addProtocol(url)
{
    if(url.substr(0, 2) == "//")
    {
        url = window.location.protocol.replace(':','') + ":" + url;
    }
    return url;
}

function doReload()
{
            //refresh the page
            window.location.reload();
}

function goHome()
{
	window.onbeforeunload = null;
	window.location = '/';
}

// Create a cookie with a timestamp in it
// Check the timestamp in the cookie periodically. 
// If the timestamp has changed, it means some other browser has open
// and this one should shut down. 
function checkIReadyIds()
{
	var anotherWindowActive = false;
	if(landingPage && !allowMultipleLandingPages)
	{
		if(created === null)
		{
			created = new Date().getTime();
			setCookie("iready_landing_page_id", created);
		}
		else if(getCookie("iready_landing_page_id") != created)
		{
			anotherWindowActive = true;
		}
	}
	if(loginCheckEnabled && getCookie("iready_login_id") != loginId)
	{
		anotherWindowActive = true;
	}
	if(anotherWindowActive)
	{
		goHome();
	}
}

function setAllowMultipleLandingPages(value)
{
	if (allowMultipleLandingPages && !value)
	{
		created = null;
	}
	allowMultipleLandingPages = value;
}

var loginCheckEnabled = true;
var allowMultipleLandingPages = false;
var loginId = getCookie("iready_login_id");
var landingPage = false;
var created = null;
if(!document.webkitHidden)
{
	setInterval("checkIReadyIds()", 150);
}
