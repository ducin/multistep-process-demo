$(document).ready(function(){
    var $result = $(result);
    function display(){
        var args = Array.prototype.slice.call(arguments);
        $result.html(args.join('<br/>'));
    }
    window.formTpl = Handlebars.compile($("#example-form").html());

    $('button').on('click', function(){
        var modal = new Modal("#myModal");
        modal.open()
        .then(function(data){
            display('success', data, new Date());
        }).catch(function(data){
            display('fail', data, new Date());
        });
    });
});

function Modal(selector){
    var self = this,
        $el = $(selector);

    this.$ = function(selector){
        return $el.find(selector);
    };

    this.open = function(){
        return new Promise((resolve, reject) => {
            function close(){
                $el.modal('hide');
                self.$('.modal-body').html("");
            }
            $el.modal();
            setTimeout(function(){
                var $form = $(window.formTpl());
                self.$('.modal-body').append($form);
                $form.show('slow');
            }, 800);
            this.$('.modal-header .action-close').unbind("click").on('click', function(){
                close();
                setTimeout(function(){
                    reject('closed');
                }, 0);
            });
            this.$('.modal-footer .action-close').unbind("click").on('click', function(){
                close();
                setTimeout(function(){
                    reject('closed');
                }, 0);
            });
            this.$('.modal-footer .action-save').unbind("click").on('click', function(event){
                var value = JSON.stringify({
                    first: self.$('#firstNameInput').val(),
                    last: self.$('#lastNameInput').val()
                });
                close();
                setTimeout(function(){
                    resolve(value);
                }, 0);
            });
        });
    };
}
