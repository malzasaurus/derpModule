 window.onload = function() {
     // Get the modal
     var modal = document.getElementById('myModal');

     // Get the button that opens the modal
     var btn = document.getElementById("myBtn");

     // Get the <span> element that closes the modal
     var span = document.getElementsByClassName("close")[0];

     // When the user clicks the button, open the modal
     btn.onclick = function() {
         showModal(); //taking screenshot
         //Setting values on form to be sent to server
         setInputValue('cookieEnabled', window.navigator.cookieEnabled);
         setInputValue('doNotTrack', window.navigator.doNotTrack);
         setInputValue('appVersion', window.navigator.appVersion);
         setInputValue('platform', window.navigator.platform);
         setInputValue('hostName', window.location.hostname);
         setInputValue('pathName', window.location.pathname);
         setInputValue('href', window.location.href)
         setInputValue('protocol', window.location.protocol);
         setInputValue('browser', get_browser().name);
         setInputValue('browserVer', get_browser().version);
         // modal.style.display = "block";
     };
     // When the user clicks on <span> (x), close the modal
     span.onclick = function() {
         modal.style.display = "none";
     };
     // When the user clicks anywhere outside of the modal, close it
     window.onclick = function(event) {
         if (event.target == modal) {
             modal.style.display = "none";
         }
     };

     // function to get browser name and version
     function get_browser() {
         var ua = navigator.userAgent,
             tem, M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
         if (/trident/i.test(M[1])) {
             tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
             return {
                 name: 'IE',
                 version: (tem[1] || '')
             };
         }
         if (M[1] === 'Chrome') {
             tem = ua.match(/\bOPR\/(\d+)/);
             if (tem !== null) {
                 return {
                     name: 'Opera',
                     version: tem[1]
                 };
             }
         }
         M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
         if ((tem = ua.match(/version\/(\d+)/i)) !== null) {
             M.splice(1, 1, tem[1]);
         }
         return {
             name: M[0],
             version: M[1]
         };
     }

     //function to dynamically set form values
     function setInputValue(formId, val) {
         document.getElementById(formId).setAttribute('value', val);
     }



 };

 function showModal() {
     var modal = document.getElementById('myModal');
     var btn = document.getElementById("myBtn");
     $(document.body).html2canvas({
         onrendered: function(canvas) {
             //Set hidden field's value to image data (base-64 string)
             $('#img_val').val(canvas.toDataURL("image/png"));
             var extra_canvas = document.createElement("canvas");
             extra_canvas.setAttribute('width', 500);
             extra_canvas.setAttribute('height', 250);
             var ctx = extra_canvas.getContext('2d');
             ctx.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, 500, 250);
             $(ctx.canvas).insertBefore("#bug_form")
             setTimeout(displayOnFunction, 2000);
         }
     });

     function displayOnFunction() {
         modal.style.display = 'block';
         btn.style.display = 'none';
     }
 }
