import { userFormTpl, getUserFormData } from './form';

const modalTpl = ({id, title}) => `
<div id="${id}" class="modal fade" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close action-close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="myModalLabel">${title}</h4>
      </div>
      <div class="modal-body">
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default action-close">Close</button>
        <button type="button" class="btn btn-primary action-save">Save changes</button>
      </div>
    </div>
  </div>
</div>`;

const DELAY = 750;
const getData = () => {
  return new Promise((res, rej) => {
    setTimeout( () => resolve({ firstName: "John" }), DELAY);
  })
}

export function Modal({id, title}) {
  const
    $el = $(modalTpl({id, title})),
    $find = selector => $el.find(selector),
    clearBody = () => $find('.modal-body').html(''),
    validate = () => true;  

  function close() {
    $el.modal('hide');
    clearBody();
    // remove modal
    // $el.remove();
    // $('.modal-backdrop').remove();
  }

  var $form = $(userFormTpl());
  $find('.modal-body').html($form);

  const open = () => {
    return new Promise((resolve, reject) => {
      $el.modal();
      $find('.modal-header .action-close').unbind('click').on('click', () =>{
        reject('closed');
        close();
      });
      $find('.modal-footer .action-close').unbind('click').on('click', () => {
        reject('closed');
        close();
      });
      $find('.modal-footer .action-save').unbind('click').on('click', () => {
        if (validate()) {
          resolve(getUserFormData($find));
          close();
        }
      });
    });
  };

  // const execute = async () => {
  //   var data = await getData();
  //   return open();
  // }

  return { execute: open }
}
