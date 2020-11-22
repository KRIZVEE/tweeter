$(document).ready(function() {
  $('#tweet-text').on('input', function(e){
    // console.log(e.target.value); alternative way to select element based on event
    let valTextarea = this.value;
    if(e.target.value.length > 140){
      // $('[name="counter"]').css("color",'red').css("font-size","90px")
      $('[name="counter"]').css("color",'red').css("font-size","30px")
    }
    $('[name="counter"]').text(140-e.target.value.length) 
    
  })  
});

/*
  blur only works if i moved form textarea to any other place in window
   $('#tweet-text').on('blur', function(e){
     console.log(e);
     console.log(this);
   })*/
  /*
  this will not capture first event, don't know why
  $('#tweet-text').on('keydown', function(e){
    console.log(e.target.value);
    console.log(this);
  })*/
 /*
  this will capture first key twice, don't know why
  $('#tweet-text').on('keyup', function(e){
    console.log(e.target.value);
    console.log(this);
  })
  */
  /*
  this will not capture first event, don't know why
  $('#tweet-text').on('keypress', function(e){
    console.log(e.target.value);
    console.log(this);
  })
  */
 /*
   $('#tweet-text').on('change', function(e){
    console.log(e.target.value);
    console.log(this);
  })*/