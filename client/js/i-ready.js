/**
 * This file is an OBFUSCATED version of src/assets/js/i-ready.original.js.
 * Use https://obfuscator.io/ to obfuscate it
 * Any changes to the above file, should be obfuscated with the above utility and pasted below this comment
 * @type {string[]}
 * @private
 * iready fucking learn how tf to spell idiot
 */
'use strict';

var arrDomain = location.hostname.split(".");
if (arrDomain.length > 2) {
  arrDomain.shift();
}
document.domain = arrDomain.join(".");
function logout() {
  setTimeout(logout_, 0);
}
function logout_() {
  try {
    if (window.opener && window.opener.exitSU) {
      window.opener.exitSU();
    } else {
      window.location = "/logout";
    }
  } catch (_0x5009ab) {
    window.location = "/logout";
  }
}
function doBrowserCheck(tileUrl) {
  return fetch(tileUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    }
  }).then(function (rawResp) {
    return rawResp.json();
  }).then(function (primaryTxHex) {
    handleBrowserCheck(primaryTxHex);
    return primaryTxHex;
  }).catch(function (context) {
    logToConsole("Error doing browser check");
    logToConsole(context);
  }).finally(function (canCreateDiscussions) {
    console.log("complete");
    return canCreateDiscussions;
  });
}
function handleBrowserCheck(primaryTxHex) {
  if (primaryTxHex.browserNotSupported) {
    document.getElementById("browser-not-supported-container").style.display = "block";
    document.getElementById("browser-not-supported-content").style.display = "block";
  }
  if (primaryTxHex.browserAllowedNotFullySupported) {
    document.getElementById("browser-unknown-container").style.display = "block";
    document.getElementById("browser-unknown-content").style.display = "block";
  }
}
function getCookie(name) {
  var a;
  var html;
  var str_out;
  var wallSimulations = document.cookie.split(";");
  a = wallSimulations.length - 1;
  for (; a >= 0; a--) {
    html = wallSimulations[a].substr(0, wallSimulations[a].indexOf("="));
    str_out = wallSimulations[a].substr(wallSimulations[a].indexOf("=") + 1);
    html = html.replace(/^\s+|\s+$/g, "");
    if (html == name) {
      return unescape(str_out);
    }
  }
}
function setCookie(name, value, expire) {
  var exdate = new Date();
  exdate.setDate(exdate.getDate() + expire);
  value = escape(value) + (expire === null || expire === undefined ? "" : "; expires=" + exdate.toUTCString()) + "; path=/";
  document.cookie = name + "=" + value;
}
function logToConsole(context) {
  if (typeof console != "undefined" && console.log) {
    console.log(context);
  }
}
function addProtocol(url) {
  if (url.substr(0, 2) == "//") {
    url = window.location.protocol.replace(":", "") + ":" + url;
  }
  return url;
}
function doReload() {
  window.location.reload();
}
function goHome() {
  if (window.location.pathname === "/") {
    loginId = getCookie("iready_login_id");
  } else {
    window.onunload = null;
    window.onbeforeunload = null;
    window.location = "/";
  }
}
function checkIReadyIds() {
  var _0x28db07 = false;
  if (false && !allowMultipleLandingPages) {
    if (created === null) {
      created = new Date().getTime();
      setCookie("iready_landing_page_id", created);
    } else if (getCookie("iready_landing_page_id") != created) {
      _0x28db07 = true;
    }
  }
  if (true && getCookie("iready_login_id") != loginId) {
    _0x28db07 = true;
  }
  if (_0x28db07) {
    goHome();
  }
}
function setAllowMultipleLandingPages(canCreateDiscussions) {
  if (allowMultipleLandingPages && !canCreateDiscussions) {
    created = null;
  }
  allowMultipleLandingPages = canCreateDiscussions;
}
function addCheckIreadyIds() {
  if (!document.webkitHidden) {
    setInterval("checkIReadyIds()", 400);
  } else {
    setTimeout("addCheckIreadyIds()", 150);
  }
}
var loginCheckEnabled = true;
var allowMultipleLandingPages = false;
var loginId = getCookie("iready_login_id");
var landingPage = false;
var created = null;
addCheckIreadyIds();
