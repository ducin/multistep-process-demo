import { Modal } from './modal';

$(document).ready(function(){
    const $startProcessBtn = document.getElementById('startProcess');
    const $result = document.getElementById('result');
    
    // document.body.appendChild($(modalTpl()));
    const displayResult = result => $result.innerHTML = JSON.stringify(result, null, 2);

    $startProcessBtn.addEventListener('click', function(){
        var modal = new Modal({
            id: 'myModal',
            title: 'Modal title'
        });
        modal.execute()
        .then(function(value){
            displayResult({
                value,
                time: new Date()
            });
        }).catch(function(reason){
            displayResult({
                reason,
                time: new Date()
            });
        });
    });
});
