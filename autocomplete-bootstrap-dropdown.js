/**
* Descrição: Pesquisa do tipo autocomplete, em bootstrap dropdown
* Data: 14/06/2016
* Autor: Sabrina Procopio (bina.procopio@gmail.com)
*
* Exemplo:
*
*  $('#id_ul').autocompleteBootstrapDropdown({
*        btn: '#id_btn',
*        style: {
*            width: '100px',
*            marginLeft: '5px',
*            textTransform: 'uppercase'
*        },
*        maxlength: 2,
*        ignore: 'nome_da_classe' //Nome da classe que adicionada ao elemento 'li', o mesmo será ignorado no search
*    });
*
* Valores default:
*    margin-left: '5px'
*    maxlength: '10' 
*    textTransform: 'capitalize'
**/
(function ($) {
    //Sobrescreve o método Contains para case insensitive
    jQuery.expr[':'].iContains = function (a, i, m) {
        return jQuery(a).text().toUpperCase()
      .indexOf(m[3].toUpperCase()) >= 0;
    };

    jQuery.fn.extend({
        autocompleteBootstrapDropdown: function (options) {
            var ul = this.selector;
            var defaults = {
                btn: "#" + $(ul).parent().find('button').attr('id'),
                style: {
                    marginLeft: '5px',
                    width: '',
                    textTransform: 'capitalize'
                },
                maxlength: 10,
                ignore: 'ignore_text_search'
            };
            options = $.extend(defaults, options);

            var li_autocomplete = $('<li/>');

            var id_input = "iSearch_";
            id_input = id_input.concat(ul.replace("#", ""));

            var input_search = $('<input/>', {
                'type': 'text',
                'maxlength': options.maxlength,
                'id': id_input
            });

            input_search.css({
                'margin-left': options.style.marginLeft,
                'width': options.style.width,
                'text-transform': options.textTransform
            });

            $(input_search).keyup(function () {
                $(ul + " li").hide();
                var search_field = $(input_search).val().toUpperCase();
                $(ul + " li:iContains('" + search_field + "'):not(." + options.ignore + ")").show();

                if (search_field.length == 0) {
                    $(ul + " li").show();
                }

                $(ul + "li:first").show();
            });

            $(ul).prepend(input_search.appendTo(li_autocomplete));

            $(options.btn).click(function () {
                $(input_search).val("");
                $(ul + " li").show();
                $(ul).show();
                $(input_search).focus();
            });

            $(document).click(function () {
                $(ul).hide();
            });
        }
    });
})(jQuery);
