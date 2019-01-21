$(document).ready(function () {
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    var canvas_id = $("#canvas");
    var first_move;

    var color;
    var mousedown = false;
    var click = 0;
    var posStart = [];
    var posEnd = [];
    var pen;
    var lline;
    var square;
    var rec_full;
    var circle;
    var circle_full;
    var eraser;
    var erase = false;
    var weight;
    var filling;

    // WEIGHT

    $("#weight").click(function()
    {
         weight = $("#weight").val();
         return;
        if($("#weight").val() == 1)
        {
            weight = 1;
        }
        if($("#weight").val() == 5)
        {
            weight = 5;
        }
        if($("#weight").val() == 10)
        {
            weight = 10;
        }
        if($("#weight").val() == 15)
        {
            weight = 15;
        }
        if($("#weight").val() == 20)
        {
            weight = 20;
        }
        if($("#weight").val() == 25)
        {
            weight = 25;
        }
        if($("#weight").val() == 30)
        {
            weight = 30;
        }
    });

    // COLOR

    $("#color").on("change", function()
    {
        color = $("#color").val();
    });

    // PEN

    $("#pen").click(function(){
        pen = true;
        lline = false;
        square = false;
        rect_full = false;
        circle = false;
        circle_full = false;
        eraser = false;
        filling = false;

        canvas_id.mousedown(function(event){
            mousedown = true;
            erase = false;
            context.beginPath();
            context.moveTo(event.offsetX,event.offsetY);
        });

        canvas_id.mousemove(function(event){
            if(mousedown == true && pen == true)
            {
                context.strokeStyle = color;
                context.lineWidth = weight;
                context.lineCap = "round";
                context.globalCompositeOperation = "source-over";
                context.lineTo(event.offsetX,event.offsetY);
                context.stroke();
            }
        });

        canvas_id.mouseup(function(){
            mousedown = false;
            context.closePath();
        });
    });

    // REMPLISSAGE

    $("#filling").click(function(){
        pen = false;
        lline = false;
        square = false;
        rect_full = false;
        circle = false;
        circle_full = false;
        eraser = false;
        filling = true;

        canvas_id.click(function(){
            if(filling == true)
            {
                canvas_id.css("backgroundColor", color);
            }
        });
    });

    // TRAIT

    $("#line").click(function(){
        lline = true;
        pen = false;
        square = false;
        rect_full = false;
        circle = false;
        circle_full = false;
        eraser = false;
        erase = false;
        filling = false;

        canvas_id.mousedown(function(event){
            mousedown = true;
            erase = false;

            if(mousedown == true && lline == true)
            {
                var x = event.offsetX;
                var y = event.offsetY;
                if(click == 0){
                    posStart[0] = x;
                    posStart[1] = y;
                }
                else if(click == 1){
                    posEnd[0] = x;
                    posEnd[1] = y;
                    line();
                    return;
                }
                click++;
            }
        });

        canvas_id.mouseup(function(){
            mousedown = false;
        });

        function line(){
            context.beginPath();
            context.strokeStyle = color;
            context.lineWidth = weight;
            context.lineCap = "round";
            context.globalCompositeOperation = "source-over";
            context.moveTo(posStart[0],posStart[1]);
            context.lineTo(posEnd[0],posEnd[1]);
            context.stroke();
            context.closePath();
            click = 0;
        };
    })

    // RECTANGLE

    $("#square").click(function(){
        lline = false;
        pen = false;
        square = true;
        rect_full = false;
        circle_full = false;
        circle = false;
        eraser = false;
        erase = false;
        filling = false;

        canvas_id.mousedown(function(event){
            mousedown = true;
            if(mousedown == true && square == true)
            {
                var x = event.offsetX;
                var y = event.offsetY;
                if(click == 0){
                    posStart[0] = x;
                    posStart[1] = y;
                }
                else if(click == 1){
                    posEnd[0] = x;
                    posEnd[1] = y;
                    rectangle(event);
                    return;
                }
                click++;
            }
        });


        canvas_id.mouseup(function(){
            mousedown = false;
        });

        function rectangle(){
            context.strokeStyle = color;
            context.lineWidth = weight;
            context.globalCompositeOperation = "source-over";
            var rect = context.rect(posStart[0],posStart[1],posEnd[0] - posStart[0],posEnd[1] - posStart[1]);
            context.stroke();
            click = 0;
        };
    });

    // RECTANGLE FULL

    $("#square_full").click(function(){
        lline = false;
        pen = false;
        square = false;
        rect_full = true;
        circle = false;
        circle_full = false;
        eraser = false;
        erase = false;
        filling = false;

        canvas_id.mousedown(function(event){
            mousedown = true;
            if(mousedown == true && rect_full == true)
            {
                var x = event.offsetX;
                var y = event.offsetY;
                if(click == 0){
                    posStart[0] = x;
                    posStart[1] = y;
                }
                else if(click == 1){
                    posEnd[0] = x;
                    posEnd[1] = y;
                    rectanglefull(event);
                    return;
                }
                click++;
            }
        });


        canvas_id.mouseup(function(){
            mousedown = false;
        });

        function rectanglefull(){
            context.fillStyle = color;
            context.lineWidth = weight;
            context.globalCompositeOperation = "source-over";
            var rect = context.fillRect(posStart[0],posStart[1],posEnd[0] - posStart[0],posEnd[1] - posStart[1]);
            click = 0;
        };
    });

    // CIRCLE

    $("#circle").click(function(){
        lline = false;
        pen = false;
        square = false;
        rect_full = false;
        circle = true;
        circle_full = false;
        eraser = false;
        filling = false;

        canvas_id.mousedown(function(event){
            mousedown = true;
            if(mousedown == true && circle == true)
            {
                var x = event.offsetX;
                var y = event.offsetY;
                if(click == 0){
                    posStart[0] = x;
                    posStart[1] = y;
                }
                else if(click == 1){
                    posEnd[0] = x;
                    posEnd[1] = y;
                    circ();
                    return;
                }
                click++;
            }
        });

        canvas_id.mouseup(function(){
            mousedown = false;
        });

        function circ(){
            context.beginPath();
            context.strokeStyle = color;
            context.lineWidth = weight;
            context.globalCompositeOperation = "source-over";
            var ab = Math.sqrt(Math.pow((posEnd[0] - posStart[0]),2)+ Math.pow((posEnd[1]-posStart[1]),2));
            context.arc(posStart[0], posStart[1],ab,0, 2* Math.PI);
            context.stroke();
            click = 0;
        }
    });

    // CIRCLE FULL

    $("#circle_full").click(function(){
        lline = false;
        pen = false;
        square = false;
        rect_full = false;
        circle = false;
        circle_full = true;
        eraser = false;
        filling = false;

        canvas_id.mousedown(function(event){
            mousedown = true;
            if(mousedown == true && circle_full == true)
            {
                var x = event.offsetX;
                var y = event.offsetY;
                if(click == 0){
                    posStart[0] = x;
                    posStart[1] = y;
                }
                else if(click == 1){
                    posEnd[0] = x;
                    posEnd[1] = y;
                    circ();
                    return;
                }
                click++;
            }
        });

        canvas_id.mouseup(function(){
            mousedown = false;
        });

        function circ(){
            context.beginPath();
            context.fillStyle = color;
            context.strokeStyle = "red";
            context.lineWidth = weight;
            context.globalCompositeOperation = "source-over";
            var ab = Math.sqrt(Math.pow((posEnd[0] - posStart[0]),2)+ Math.pow((posEnd[1]-posStart[1]),2));
            context.arc(posStart[0], posStart[1],ab,0, 2* Math.PI);
            context.fill();
            context.stroke();
            click = 0;
        }
    });

    // ERASE

    $("#eraser").click(function(){
        lline = false;
        pen = false;
        square = false;
        rect_full = false;
        circle = false;
        circle_full = false;
        eraser = true;
        filling = false;

        $("#canvas").mousedown(function(event){
            mousedown = true;
            erase = true;
            context.beginPath();
            context.moveTo(event.offsetX,event.offsetY);
        });

        canvas_id.mousemove(function(event){
            if(mousedown == true && eraser == true)
            {
                if (erase == true) {
                    context.strokeStyle = color;
                    context.lineWidth = weight;
                    context.lineCap = "round";
                    context.globalCompositeOperation = "destination-out";
                    context.lineTo(event.offsetX,event.offsetY);
                    context.stroke();
                }
            }
        });

        $("#canvas").mouseup(function(){
            mousedown = false;
            context.closePath();
        });
    });

    $("#btn-save").click(function()
    {
        var paint = canvas_id.val();
    });
});