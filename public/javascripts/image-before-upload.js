$(document).ready(function(){
   $("#img-disp").hide();
   $('.progress').hide();
   $('.custom-file-input').click(function () {
    $('.progress').show();
   })
  });
function readURL(input) {
    
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function(e) {
        $('#img-disp').attr('src', e.target.result);
        $("#img-disp").show();
        $('.progress').hide();
      }
      
      reader.readAsDataURL(input.files[0]); // convert to base64 string
    }
  }
  
  $("#img-in").change(function() {
    readURL(this);
  });