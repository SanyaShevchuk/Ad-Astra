let submit_btn = $('#submit_btn');
let selectTypeOfElem = $('#insert-type-of-elem');

function validate(){
  let login = $('input[type=text]').val();
  let password = $('input[type=password]').val();

  if(login === 'adastra' && password === 'adastra'){
    $('#form').hide();
    $('#admin-menu').show();

    var link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('type', 'text/css');
    link.setAttribute('href', '/stylesheets/admin/admin-menu.css');
    document.getElementsByTagName('head')[0].appendChild(link);
  }
}

function chooseTypeOfElement(){
  let artilce = selectTypeOfElem.val();
  if(artilce === 'usual-article'){
    $('#input-id').show();
    $('#input-title').show();
    $('#input-description').show();
    $('#input-text').show();
    $('#input-author').show();
    $('#input-topic').show();
    $('#input-subtopic').show();
    $('#input-date').show();
    $('#input-photoresource').show();
    $('#input-region').show();

    $('#input-name').hide();
    $('#input-specproject').hide();

  } else if(artilce === 'spec-project-article'){
    $('#input-id').show();
    $('#input-title').show();
    $('#input-description').show();
    $('#input-text').show();
    $('#input-author').show();
    $('#input-subtopic').show();
    $('#input-date').show();
    $('#input-specproject').show();
    $('#input-photoresource').show();

    $('#input-name').hide();
  } else if(artilce === 'expert-information'){
    $('#input-description').show();
    $('#input-id').show();
    $('#input-name').show();

    $('#input-specproject').hide();
    $('#input-title').hide();
    $('#input-text').hide();
    $('#input-author').hide();
    $('#input-topic').hide();
    $('#input-subtopic').hide();
    $('#input-date').hide();
    $('#input-photoresource').hide();
    $('#input-region').hide();
  } else if(artilce === 'spec-project-topic'){
    $('#input-id').show();
    $('#input-description').show();
    $('#input-title').show();
    $('#input-author').show();
    $('#input-specproject').show();
    $('#input-subtopic').show();
    $('#input-date').show();
    $('#input-photoresource').show();

    $('#input-region').hide();
    $('#input-topic').hide();
    $('#input-name').hide();
    $('#input-text').hide();
  }
}

$('#get-elem').change(function(){
  if($('#get-elem').val()==='usual-article')
    $('#getDataA').attr('href', '/article?id=');
  else if($('#get-elem').val()==='spec-project-article')
    $('#getDataA').attr('href', '/project?id=');

  $('#getId').show();
})

$('#getId').on('change',function(e) {
  $('#getDataA').attr('href', $('#getDataA').attr('href')+$('#getId').val());
});

$('#getId').on('input',function(e) {
  $('#getDataA').show();
})


selectTypeOfElem.change(chooseTypeOfElement);
submit_btn.click(validate);