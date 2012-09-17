fancybox.message
================

[Online demo](http://jb.demonte.fr/jquery/fancybox.message/)

This extension of jQuery [fancybox](http://www.fancybox.net/) append the classics modals popups (confirm, alert, info, error) and the possibility to define your own with every button you want, not only these included.

Example of use :

        $.fancybox.message.info("this is an info box !");

Example with custom bouton (name are dynamic xyz => onXyz)
        
        $.fancybox.message.confirm({
          content:"this is a custom confirm box !",
          buttons:{yes: "Yes, please", no: "No, thanks you", cancel: "I'm not sure...", maybe: "Maybe :)", whatYouWant:$("<button>").html("test")},
          classes: "long_name",
          onYes: function(){
            $("#console").append("<p>onYes</p>");
          },
          onNo: function(){
            $("#console").append("<p>onYes</p>");
          },
          onCancel: function(){
            $("#console").append("<p>onCancel</p>");
          },
          onMaybe: function(){
            $("#console").append("<p>onMaybe</p>");
          },
          onWhatYouWant: function(){
            $("#console").append("<p>onWhatYouWant</p>");
          }
        });