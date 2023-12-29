$(document).ready(function () { 
    $(document).mousemove(function (e) { 
        $('#XY').html("X Axis : " + e.pageX + " | Y Axis " + e.pageY); 
    }); 
});