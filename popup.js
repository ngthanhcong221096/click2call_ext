// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

function click(e) {
  chrome.tabs.executeScript(null,
      {code:"alert('" + e.target.id + "')"});
  window.close();
}

// document.addEventListener('DOMContentLoaded', function () {
//   var divs = document.querySelectorAll('div');
//   for (var i = 0; i < divs.length; i++) {
//     divs[i].addEventListener('click', click);
//   }
// });
// function btn_clicked(tgtUrl) {
//     if(tgtUrl == "signin") {
//         var manager_url = "signin.html";
//         chrome.tabs.query(
//         {
//             currentWindow: true,
//             active : true
//         }, function(openselection) {
//               chrome.browserAction.setPopup({
//                   popup: manager_url
//            });
//         });
//     } else if(tgtUrl = "signup") {
//         var manager_url = "signup.html";
//         chrome.tabs.query(
//         {
//             currentWindow: true,
//             active : true
//         }, function(openselection) {
//               chrome.browserAction.setPopup({
//                   popup: manager_url
//            });
//         });
//     }
// }

document.addEventListener("DOMContentLoaded", function() {
  document.querySelector('#signin').addEventListener('click', click('signin'));
  document.querySelector('#signup').addEventListener('click', click('signup'));
});
