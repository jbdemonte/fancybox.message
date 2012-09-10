/**
 * Fancybox.message - jQuery plugin to Fancybox (fancybox.net)
 * Version: 1.0 (2012-09-09)
 * Requires: Fancybox 1.3.4+
 *
 * Copyright 2012, Jean-Baptiste Demonte (jbdemonte@gmail.com)
 * Dual licensed under the MIT and GPL Version 3 licenses.
**/

;(function($, undefined) {
  var ns = "fancybox_message"
  
  if (!$.fancybox){
    alert("fancybox must be loaded first");
  }
  
  // create a dom object 
  function $e(suffix, cl){
    return $(document.createElement(cl||"div")).addClass(ns+suffix);
  }
  
  // create the content of the fancybox 
  function newBox(data){
    var $box = $e(""), 
      $panel = data.buttons !== false ? $e("_content_panel") : false;
    
    if ($panel){
      if (data.buttons && $.isArray(data.buttons)){
        $.each(data.buttons, function(i, b){
          $panel.append(b);
        });
      } else {
        $panel.append(data.buttons || "");
      }
    }
    if (data.title !== false){
      $box.append($e("_title").html(data.title || ""));
    }
    $box.append(
      $e("_content")
        .append($e("_content_body").html(data.content || ""))
        .append($panel)
    );
    return $box;
  }
  
  // diplay a fancybox message
  $.fancybox.message = function(user, opts){
    if (!user){
      return;
    }
    if (!opts){
      opts = {};
    }
    if (typeof user === "string"){
      user = {content:user};
    }
    if (user.classes && opts.classes){
      user.classes = opts.classes + " " + user.classes;
    }
    if (user.options && opts.options){
      user.options = $.extend(true, opts.options, user.options);
    }
    $.extend(opts, user);
    
    var managed = false, $box, buttons = opts.buttons !== false ? [] : false;
    
    // create buttons in dom and add into the array buttons
    if (opts.buttons){
      $.each(opts.buttons, function(button, label){
        if (!label){
          return;
        }
        var uc = button.charAt(0).toUpperCase() + button.slice(1),
          $b = typeof label === "object" ? $(label) : $e("_button_" + button, "button").html(label === true ? uc : label);
        buttons.push(
          $b.click(function(){
            managed = true;
            if (opts.close === undefined || opts.close){
              $.fancybox.close();
            }
            if (typeof opts["on"+uc] === "function"){
              opts["on"+uc]();
            }
          })
        );
      });
    }
    
    // create the dom content of the fancybox
    $box = newBox({
      title: opts.title,
      content: opts.content,
      buttons: buttons
     });
    
    if (opts.classes){
      $box.addClass(opts.classes);
    }
    
    var onClosed = opts.onClosed, // save current onClosed
      options = $.extend({content:$box, padding: 0}, opts.options);
    
    // overwrite current onClosed to manage previous callback
    options.onClosed = function(){ 
      if (!managed && typeof opts.onCancel === "function"){
        opts.onCancel();
      } else if (typeof onClosed === "function"){
        onClose();
      }
    }
    $.fancybox(options);
  }
  
  $.fancybox.message.error = function(opts){
    $.fancybox.message(opts, {
      classes: "error",
      title: "Error",
      buttons: {ok:true},
      options:{modal:true}
    });
  }
  
  $.fancybox.message.info = function(opts){
    $.fancybox.message(opts, {
      classes: "info",
      title: "Information",
      buttons: {ok:true},
      options:{modal:true}
    });
  }
  
  $.fancybox.message.alert = function(opts){
    $.fancybox.message(opts, {
      classes: "alert",
      title: "Alert",
      buttons: {ok:true},
      options:{modal:true}
    });
  }
  
  $.fancybox.message.confirm = function(opts){    
    $.fancybox.message(opts, {
      classes: "confirm",
      title: "Confirmation",
      buttons:{no:true, yes:true},
      options:{modal:true}
    });
  }

})(jQuery);