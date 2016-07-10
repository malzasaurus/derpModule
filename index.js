 window.onload = function() {
    //start capturing logs
    var logOfConsole = [];

    var _log = window.console.log,
        _warn = window.console.warn,
        _error = window.console.error;

    console.log = function() {
        var obj = {method: 'log', arguments: arguments};
        var string = JSON.stringify(obj);
        logOfConsole.push(string);
        return _log.apply(console, arguments);
    };

    console.warn = function() {
        var obj = {method: 'warn', arguments: arguments};
        var string = JSON.stringify(obj);
        logOfConsole.push(string);
        return _warn.apply(console, arguments);
    };

    console.error = function() {
        var obj = {method: 'error', arguments: arguments};
        var string = JSON.stringify(obj);
        logOfConsole.push(string);
        return _error.apply(console, arguments);
    };
     // Get the modal
     var modal = document.getElementById('myModal');

     // Get the button that opens the modal
     var btn = document.getElementById("myBtn");
     btn.style.display = 'inline';
     var createBtn = document.getElementById("create");
     var loader = document.getElementById('loading');

     // Get the <span> element that closes the modal
     var span = document.getElementsByClassName("close")[0];

          // When the user clicks the pencil button
     createBtn.onclick = function(){
        var body = document.getElementsByTagName('body')[0];
        var first_canvas = document.createElement('canvas');
        body.appendChild(first_canvas);        
        first_canvas.id = 'paint';
        var bodyStyle = getComputedStyle(body);
        first_canvas.width = window.screen.availWidth;
        first_canvas.height = window.screen.availHeight;
        var firstctx = first_canvas.getContext('2d');
        firstctx.lineWidth = 3;
        firstctx.lineJoin = 'round';
        firstctx.lineCap = 'round';
        window.EventEmitter = function () {
            this.subscribers = {};
        };

        window.whiteboard = new window.EventEmitter();
        (function () {            
            var currentMousePosition = {
                x: 0,
                y: 0
            };

            var lastMousePosition = {
                x: 0,
                y: 0
            };
            var drawing = false;

            first_canvas.addEventListener('mousedown', function (e) {
                drawing = true;
                currentMousePosition.x = e.pageX - this.offsetLeft;
                currentMousePosition.y = e.pageY - this.offsetTop;
            });

            first_canvas.addEventListener('mouseup', function () {
                drawing = false;
            });

            first_canvas.addEventListener('mousemove', function (e) {
                if (!drawing) return;
                lastMousePosition.x = currentMousePosition.x;
                lastMousePosition.y = currentMousePosition.y;
                currentMousePosition.x = e.pageX - this.offsetLeft;
                currentMousePosition.y = e.pageY - this.offsetTop;
                whiteboard.draw(lastMousePosition, currentMousePosition, 'black');
            });

            whiteboard.draw = function (start, end, strokeColor) {
                // Draw the line between the start and end positions that is colored with the given color.
                firstctx.beginPath();
                firstctx.strokeStyle ='black';
                firstctx.moveTo(start.x, start.y);
                firstctx.lineTo(end.x, end.y);
                firstctx.closePath();
                firstctx.stroke();
            };
        }());
     };

     // When the user clicks the button, open the modal
     btn.onclick = function() {
        loader.style.display = 'block'; //turning the loader on
        showModal(); //taking screenshot
        //Setting values on form to be sent to server
        setInputValue('cookieEnabled', window.navigator.cookieEnabled);
        setInputValue('doNotTrack', window.navigator.doNotTrack);
        setInputValue('appVersion', window.navigator.appVersion);
        setInputValue('platform', window.navigator.platform);
        setInputValue('hostName', window.location.hostname);
        setInputValue('pathName', window.location.pathname);
        setInputValue('href', window.location.href);
        setInputValue('protocol', window.location.protocol);
        setInputValue('browser', get_browser().name);
        setInputValue('browserVer', get_browser().version);
        setInputValue('logs', logOfConsole.join(","));
     };
     // When the user clicks on <span> (x), close the modal
     span.onclick = function() {
        $(ctx.canvas).remove();  //remove the screenshot if the modal is dismissed so we do not have multiple screenshots
        modal.style.display = "none"; //hide the modal
        btn.style.display = 'inline'; //unhide the button
        createBtn.style.display = 'inline'; //unhide the button
     };
     // When the user clicks anywhere outside of the modal, close it
     window.onclick = function(event) {
         if (event.target == modal) {
            $(ctx.canvas).remove(); //remove the screenshot if the modal is dismissed so we do not have multiple screenshots
            modal.style.display = "none"; //hide the modal
            btn.style.display = 'inline'; //unhide the button
            createBtn.style.display = 'inline'; //unhide the button
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
var ctx; //defining the canvas element so we can use it outside of the showModal function

 function showModal() {
     var modal = document.getElementById('myModal');
     var btn = document.getElementById("myBtn");
     var createBtn = document.getElementById("create");
     $(document.body).html2canvas({
         onrendered: function(canvas) {
             //Set hidden field's value to image data (base-64 string)
             $('#img_val').val(canvas.toDataURL("image/png"));
             var extra_canvas = document.createElement("canvas");
             extra_canvas.setAttribute('width', 500);
             extra_canvas.setAttribute('height', 400);
             ctx = extra_canvas.getContext('2d');
             ctx.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, 500, 400);
             $(ctx.canvas).insertBefore("#bug_form");
             setTimeout(displayOnFunction, 2000);
         }
     });

     function displayOnFunction() {
        var loader = document.getElementById('loading');
        modal.style.display = 'block';
        btn.style.display = 'none'; //hiding the bug button 
        createBtn.style.display = 'none'; //hiding the draw button
        loader.style.display = 'none';  //turning the loader off
     }
 }
