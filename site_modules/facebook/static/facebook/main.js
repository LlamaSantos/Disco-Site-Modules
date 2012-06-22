$('.cards-container .card .bio').live({
    mouseenter: function (event) {
        var txt = $(event.currentTarget);
        txt.css({'background-color': '#E7EAED'});
    },
    mouseleave: function (event) {
        var txt = $(event.currentTarget);
        txt.css({'background-color': 'transparent'});
    },
    click: function (event) {
        var txt = $(event.currentTarget).hide();
        $('<img />').addClass('bio-save').attr('src', '/images/icon_disk.png').appendTo(txt.parent());
        $('<textarea />').addClass('bio-edit').val(txt.html()).appendTo(txt.parent()).focus();
    }
});

$('.cards-container .card .bio-save').live('click', function (event) {
    var img = $(event.currentTarget).hide();
    var textArea = img.parent().find('.bio-edit');
    var txt = img.parent().find('.bio').html(textArea.val());
    img.remove();
    textArea.remove();
    txt.show();

    // TO-DO: if we need to save data on server, put it here
});

disco = (function (connection) {
    function cardHelper(event) {
        return '<div></div>';
    }

    function handleDragStart(event, ui) {
        $('body').append($('<div class="overlay"></div>'));
        $('.boxes-container > .box').addClass('waiting-mode');
    }

    function handleDragDrag(event, ui) {
        // ...
    }

    function handleDragStop(event, ui) {
        $('.boxes-container > .box').removeClass('waiting-mode');
        $('body > .overlay').remove();
    }

    function handleDropEvent(event, ui) {
        handleDragStop(event, ui);

        var draggable = ui.draggable;
        var item = $('<div class="item" />').data('obj', draggable.attr('obj')).append('<div class="remove"></div>').append(draggable.attr('fullName'));
        draggable.remove();

        $(event.target).append(item);
    }

    var pub = {
        initFacebookCards: function (fbFriends) {
            $('#get-started').fadeOut(250, function () {
                $('.cards-container, .boxes-container').fadeIn(250);
            });

            if ($.browser.webkit) {
                $('body').addClass('webkit');
            }

            var cards = '';
            var draggableOptions = {
                containment: 'document',
                helper: 'original', //cardHelper
                revert: true,
                start: handleDragStart,
                drag: handleDragDrag,
                stop: handleDragStop
            };
            var droppableOptions = {
                accept: '.cards-container .card',
                hoverClass: 'active',
                drop: handleDropEvent
            };

            _.each(fbFriends, function (friend) {
                cards = cards + disco.tmpl.facebookCard.render(_.extend(friend, {
                    fullName: function () {
                        return this.first_name + ' ' + this.last_name;
                    },
                    dob: '01/01/1990',
                    jsonObj: function () {
                        return JSON.stringify(this);
                    }
                }));
            });

            $('.cards-container').html(cards);

            /* fix image align */
            var width = $('.cards-container .card .general-info .fb-image-container').width();
            $('.cards-container .card .general-info .fb-image-container .fb-image').load(function () {
                var marginLeft = ($(this).width() - width) / 2 * -1;
                $(this).css({ 'margin-left': marginLeft.toString() + 'px' });
            });

            /* make all cards draggable */
            $('.cards-container .card').draggable(draggableOptions);

            /* make all boxes droppable */
            $('.boxes-container .box').droppable(droppableOptions);

            /* add remove link event */
            $('.boxes-container .box .item .remove').live('click', function (event) {
                var item = $(event.currentTarget).parents('.item');
                if (item && item.length > 0) {
                    var jsonObj = item.data('obj');
                    jsonObj = jsonObj ? JSON.parse(jsonObj) : null;
                    item.fadeOut(250, function () {
                        if (jsonObj) {
                            $(disco.tmpl.facebookCard.render(_.extend(jsonObj, { jsonObj: function () {
                                return JSON.stringify(this);
                            } }))).css({ 'display': 'none' }).appendTo($('.cards-container')).fadeIn(250).draggable(draggableOptions);
                        }
                        item.remove();
                    });
                }
            });
        }
    };

    connection.facebook = _.extend(connection.facebook, pub);
    return connection;
})(disco || {});

if (disco && disco.bus) {
    disco.bus.on('facebook.initFacebookCards', disco.facebook.initFacebookCards);
}