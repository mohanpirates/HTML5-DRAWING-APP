$(function(){
   //changing the radius of circle
    $('#slider').slider({
        
        min:3,
        max:30,
        slide: function(event,ui){
            
            $('#circle').height(ui.value);
            $('#circle').width(ui.value);
            
            context.lineWidth = ui.value;
            
           
        }
    });
    
    //painting or erasing mode
    
      var paint = false;
    
    var paint_erase = "paint";
    
    //onload show saved image
    
    if(localStorage.getItem('imageCanvas')!=null){
        
        var img = new Image();
        
        img.onload = function(){
          
            context.drawImage(img, 0, 0);
            
        };
        
        img.src = localStorage.getItem('imageCanvas');
        
       
        
    }
       
      //get the canvas and context
    
    var canvas = document.getElementById('paint');
    
    var context = canvas.getContext('2d');
    
      context.lineWidth = 3;
    
      context.lineCap = "round";
    
      context.lineJoin = "join";
    
    //get the canvas container
    
    var container = $('.artboard');
    
     //mouse position
    
      var mouse = {
          x:0,y:0
          
      };
    
       //get mouse parameters
    
     container.mousedown(function(e){
    
         paint = true;
                  
         context.beginPath();
                  
         mouse.x = e.pageX - this.offsetLeft;
         
         mouse.y = e.pageY - this.offsetTop;
         
         
         context.moveTo(mouse.x,mouse.y);
         
     });
    
    
    
    //draw when mouse move
    
    container.mousemove(function(e){
                 mouse.x = e.pageX - this.offsetLeft;
         
         mouse.y = e.pageY - this.offsetTop;
        
        if(paint == true){
            
            
            if(paint_erase == "paint"){
                
               
                
                context.strokeStyle = $('#color').val();
               
               }else{
                   
                   context.strokeStyle = "white";
               
               }
            
            
            context.lineTo(mouse.x,mouse.y);
            context.stroke();
        }
           
        
        
    });
    
    //on mouse up
    
    container.mouseup(function(){
        
        paint = false;
        
    });
    
     container.mouseleave(function(){
        
        paint = false;
        
    });
    
    //erase button
    
  $('#erase').click(function(){
      
     if(paint_erase == "paint"){
        
         paint_erase = "erase";
                  
        }else{
        
            paint_erase = "paint";
            
        }
      
       $(this).toggleClass('erasemode');
      
  });
    
    //reset button
    
    $('#reset').click(function(){
        
        context.clearRect(0,0,canvas.width,canvas.height);
        
        paint_erase = "paint";
        
        $("#erase").removeClass("erasemode");
        
    });
    
    //save button
    
    $('#save').click(function(){
        
         if(typeof(localStorage)!=null){
    localStorage.setItem("imageCanvas",canvas.toDataURL());
            
             
            }else{
            
                window.alert('your browser does not support localstorage');
                
            }
        
    });
    
    
    
    //change the color input
    
    $('#color').change(function(){
        
        $('#circle').css("background-color",$(this).val());
        
    });
    
});
