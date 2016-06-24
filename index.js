window.onload = function(){
    // Get the modal
    var modal = document.getElementById('myModal');

    // Get the button that opens the modal
    var btn = document.getElementById("myBtn");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks the button, open the modal
    btn.onclick = function() {
        showModal(); //taking screenshot
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
    //function to dynamically set form values
    function setInputValue(formId, val) {
            document.getElementById(formId).setAttribute('value', val);
    }
    //Setting values on form to be sent to server
    setInputValue('cookieEnabled', window.navigator.cookieEnabled);
    setInputValue('doNotTrack', window.navigator.doNotTrack);
    setInputValue('appVersion', window.navigator.appVersion);
    setInputValue('platform', window.navigator.platform);
    setInputValue('hostname', window.location.hostname);
    setInputValue('pathname', window.location.pathname);
    setInputValue('protocol', window.location.protocol);

};
    function showModal() {
        $(document.body).html2canvas({
            onrendered: function (canvas) {
                //Set hidden field's value to image data (base-64 string)
                $('#img_val').val(canvas);
                console.log(canvas.toDataURL());
                // canvas.width = 700
                // canvas.height = 700
                console.log(canvas);
                var extra_canvas = document.createElement("canvas");
                extra_canvas.setAttribute('width',150);
                extra_canvas.setAttribute('height',200);
                var ctx = extra_canvas.getContext('2d');
                ctx.drawImage(canvas,0,0,canvas.width, canvas.height,0,0,150,200);
                // var dataURL = extra_canvas.toDataURL();
                // var img = $(document.createElement('img'));
                // img.attr('src', dataURL);
                console.log(ctx);
                //$(document.body).prepend(img);
                modal.appendChild(ctx.canvas);
                setTimeout(myFunction, 3000);
                //Submit the form manually
                //document.getElementById("myForm").submit();
            }
        });
        function myFunction(){
            modal.style.display = 'block';
            btn.style.display = 'none';
        }    
    }
////
