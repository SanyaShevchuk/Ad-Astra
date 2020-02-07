let submit_btn = $('#submit_btn');
let insert = $('#insert-elem');

function validate(){
  let login = $('input[type=text]').val();
  let password = $('input[type=password]').val();

  if(login === 'newsfeed' && password === 'newsfeed'){
    $('#form').hide();
    $('#admin-menu').show();

    var link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('type', 'text/css');
    link.setAttribute('href', '/stylesheets/admin/admin-menu.css');
    document.getElementsByTagName('head')[0].appendChild(link);
  } else{
    alert("Wrong password or login!");
  }
}

insert.change(function (){
  $('.insert button[type="submit"]').show();
  let article = insert.val();

  $('#insert-id').show();
  $('#insert-description').show();

 if(article === 'experts'){

    $('#insert-name').show();

    $('#insert-title').hide();
    $('#insert-text').hide();
    $('#insert-author').hide();
    $('#insert-topic').hide();
    $('#insert-subtopic').hide();
    $('#insert-date').hide();
    $('#insert-photoresource').hide();
    $('#insert-region').hide();
    $('#insert-expert').hide();
    $('#insert-image').hide();

  } else {
     $('#insert-title').show();
     $('#insert-text').show();
     $('#insert-author').show();
     $('#insert-subtopic').show();
     $('#insert-date').show();
     $('#insert-photoresource').show();
     $('#insert-image').show();
     $('#insert-name').hide();

     if(article === 'spec-project-article' || article === 'spec-project-topic'){
       $('#insert-expert').hide();
       $('#insert-region').hide();
       $('#insert-topic').hide();

     } else {
         $('#insert-region').show();
         $('#insert-topic').show();

         if(article === 'usual-article'){
            $('#insert-expert').hide();
         } else if(article === 'expert-article'){
            $('#insert-expert').show();
         }
     }
  }
});

$('#get-elem').change(function(){
  $('.get .input').show();
});

$('.get #id').on('input', function(){
  $('.get button[type="submit"]').show();
})

$('#update-elem').change(function(){
  $('.update .input').show();
  $('.update .input+label').show();

  let itemType = $('#update-elem').val();
  $('#update-id').show();
  $('#update-description').show();
  if(itemType ==='experts'){
    $('#update-name').show();

    $('#update-image').hide();
    $('#update-title').hide();
    $('#update-author').hide();
    $('#update-text').hide();
    $('#update-date').hide();
    $('#update-photoresource').hide();
    $('#update-subtopic').hide();
    $('#update-topic').hide();
    $('#update-region').hide();
    $('#update-expert').hide();
  } else {
      $('#update-title').show();
      $('#update-image').show();
      $('#update-author').show();
      $('#update-text').show();
      $('#update-date').show();
      $('#update-photoresource').show();
      $('#update-subtopic').show();

      $('#update-name').hide();
        if (itemType ==='usual-article') {
          $('#update-topic').show();
          $('#update-region').show();
          $('#update-expert').hide();
          } else if(itemType ==='expert-article'){
            $('#update-topic').show();
            $('#update-region').show();
            $('#update-expert').show();
          }else {
            $('#update-topic').hide();
            $('#update-region').hide();
            $('#update-expert').hide();
          }
  }
});

$('.update input:checkbox').change(function(){
      if ($(this).is(':checked')) {
        $(this).parent().append("<input type='text' name="+$(this).attr('id')+" />");
      } else{
        $(this).parent().children().last().remove();
      }
    });

$('#updateId').on('input', function(){
  $('.update button[type="submit"]').show();
})

$('#delete-elem').change(function(){
  $('.delete .input').show();
});

$('.delete #id').on('input', function(){
  $('.delete button[type="submit"]').show();
})

submit_btn.click(validate);