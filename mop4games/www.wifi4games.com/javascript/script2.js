$(document).ready(function() {
    var script_folder = '';
    var pc_id = $('.container[data-pcid]').attr('data-pcid');

    //auto text diraction //
    function isUnicode(str) {
        var letters = [];
        for (var i = 0; i <= str.length; i++) {
            letters[i] = str.substring((i - 1), i);
            if (letters[i].charCodeAt() > 255) {
                return true;
            }
        }
        return false;
    }
    var dir = $('input[type=text]');
    dir.keyup(function(e) {
        if (isUnicode(dir.val())) {
            $(this).css('direction', 'rtl');
        } else {
            $(this).css('direction', 'ltr');
        }
    });

    //mobile menu
    $('#menu_btn').click(function() {
        $('#menu').slideToggle(300);
    });
    // the modal
    $('.the_modal>div:last-child').css({
        'top': '100px'
    });
    $('*[data-modal]').click(function() {
        var modal_name = $(this).data('modal');
        $(modal_name).fadeIn(300);
        $('.the_modal>div:last-child').animate({
            'top': '0'
        });
        $('body').css({
            'overflow-y': 'hidden'
        });
    })
    $('.close').click(function() {
        $('.the_modal').fadeOut(300);
        $('.the_modal>div:last-child').animate({
            'top': '200px'
        });
        $('body').css({
            'overflow-y': 'scroll'
        });
    })
    $('.the_modal>div:first-child').click(function() {
        $('.the_modal').fadeOut(300);
        $('.the_modal>div:last-child').animate({
            'top': '200px'
        });
        $('body').css({
            'overflow-y': 'scroll'
        });
    })

    // index slider //
    $('.bxslider').bxSlider({
        mode: 'fade',
        pager: false,
        auto: true,
        autoHover: true,
        pause: 8000,
        captions: true
    });

    //pc_games sliders
    $('.slider-for').slick({
        fade: true,
        rtl: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        prevArrow: '.sliders .prev',
        nextArrow: '.sliders .next',
        infinite: true,
        asNavFor: '.slider-nav'
    });
    $('.slider-nav').slick({
        rtl: true,
        draggable: false,
        centerMode: true,
        arrows: false,
        slidesToShow: 6,
        asNavFor: '.slider-for',
        focusOnSelect: true,
        infinite: true
    });

    jQuery.fn.extend({
        stars: function(num) {
            $(this).html(function() {
                var full = '';
                var empty = '';

                for (i = 0; i < num; i++) {
                    full = full + "&#xe9d9;";
                }
                for (i = 0; i < 5 - num; i++) {
                    empty = empty + "&#xe9d7;";
                }

                if (num <= 5 && num >= 1) {
                    return full + empty;
                }
            });
        }
    })

    // print stsars for ratying //
    $('*[data-stars]').html(function() {
        var num = Math.round($(this).data('stars'));
        var full = '';
        var empty = '';

        for (i = 0; i < num; i++) {
            full = full + "&#xe9d9;";
        }
        for (i = 0; i < 5 - num; i++) {
            empty = empty + "&#xe9d7;";
        }

        if (num <= 5 && num >= 0) {
            return full + empty;
        }
    });

    // checkbox style //
    $('input[type=checkbox]').each(function() {
        var this_check = $(this);
        var id = '';
        var old_id = this_check.attr('id');
        if (old_id) {
            id = this_check.attr('id');
        } else {

            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

            for (var i = 0; i < 6; i++)
                id += possible.charAt(Math.floor(Math.random() * possible.length));

        }
        $(this).attr('hidden', '')
            .attr('id', id)
            .wrap('<div class="checkbox_style_squared"></div>')
            .after('<label for="' + id + '"></label>');

        $('label[for=' + id + ']').mouseover(function() {
            $('label[for=' + id + ']').addClass('check_hovering');
        }).mouseout(function() {
            $('label[for=' + id + ']').removeClass('check_hovering');
        });
    });


    // auto size for all textarea //
    autosize(document.querySelectorAll('textarea'));

    // make title like facebook //
    $('*[title]').tipsy({
        gravity: $.fn.tipsy.autoNS,
        fade: true
    });


    // login, register and validation //
    jQuery.fn.extend({
        validateInput: function(data_json, thisform) {
            var $this = $(this);
            var input_value = $.trim($($this).val());
            data_json = jQuery.extend({}, data_json);
            data_json.inputValue = input_value;
            delete data_json.input;
            $.ajax({
                type: 'POST',
                url: script_folder + '/ajax/check_input.php',
                data: data_json,
                dataType: 'json',
                beforeSend: function() {
                    $this.removeClass('shake');
                    thisform.find('.warning').hide();
                },
                success: function(result) {
                    if (!result.passed == true) {
                        $($this).attr('data-validate', 0).addClass('shake').prev().html('&#xf02d;').removeClass('input_result-true').addClass('input_result-false').attr('title', result.cuse).show();
                        return true;
                    } else {
                        $($this).attr('data-validate', 1).prev().html('&#xea10;').removeClass('input_result-false').addClass('input_result-true').attr('title', ' ').show();
                    }
                },
                complete: function() {
                    var x = 1;
                    thisform.find('input[data-validate]').each(function() {
                        if ($(this).attr('data-validate') == 0) {
                            x = 0;
                        }
                    });
                    if (x == 1) {
                        thisform.find('input[type=submit]').removeAttr('disabled');
                    }

                }
            });
            return false;
        },
        validateFrom: function(getValidations, sendto, msg) {
            var validations = {
                'category': getValidations
            };
            var thisform = $(this);
            $.each(validations.category, function(i, v) {
                thisform.find(validations.category[i].input).change(function() {
                    $(this).validateInput(v, thisform);
                })
            })
            $(this).submit(function() {
                var x = 1;
                thisform.find('input[data-validate]').each(function() {
                    if ($(this).attr('data-validate') == 0) {
                        x = 0;
                    }
                });
                if (x == 0) {
                    $.each(validations.category, function(i, v) {
                        thisform.find(v.input).validateInput(v, thisform);
                    })
                } else {
                    var data_array = thisform.serializeArray();
                    var before_json = {};
                    $.each(data_array, function(i, v) {
                        before_json[v['name']] = v['value'];
                    });
                    $.ajax({
                        type: 'POST',
                        url: sendto,
                        data: before_json,
                        dataType: 'json',
                        beforeSend: function() {
                            thisform.find('input').attr('disabled', '');
                            thisform.find('.warning').hide();
                        },
                        success: function(result) {
                            if (!result.passed == false) {
                                location.reload();
                            } else {
                                thisform.find('.warning').show().html(msg);
                                thisform.find('input').removeAttr('disabled');
                            }
                        },
                        error: function() {
                            alert('حصل خطأ ما أثناء الإتصال, يرجى التأكد من الوصول إلى الإنترنت و المحاولة ملاة أخرى.');
                            thisform.removeAttr('disabled');
                        },
                        complete: function() {
                            thisform.find('input');
                        }
                    });
                }
                return false;
            });

        }
    })

    ///////////////////////////////////////////////
    var new_cover;
    var new_pic;
    var old_pic = $('img[data-for=new_profile_pic]').attr('src');
    var old_cover = $('div[data-for=new_cover]').attr('style');

    $('#new_profile_pic, #new_cover').on('change', function() {
        if ($(this).val() != '') {

            var fd = new FormData();
            fd.append('file', this.files[0]);
            var id = $(this).attr('id');
            var this_img = $('*[data-for=' + id + ']');
            var this_label = $('label[for=' + id + ']');
            var this_label_val = this_label.html();
            $.ajax({
                url: script_folder + '/ajax/new_user_photo.php?f=' + id,
                type: 'POST',
                dataType: 'json',
                data: fd,
                contentType: false,
                processData: false,
                beforeSend: function() {
                    if (id == 'new_cover') {
                        this_label.addClass('uploading').html('<div style="height: 13px;width: 13px;border-width: 2px;" class="spinner"></div> جاري الرفع ...');
                    } else {
                        $('.profile_header .user_photo label').addClass('uploading').find('.icon').html('<div class="spinner"></div>');
                    }
                },
                success: function(results) {
                    if (results.result == true) {
                        $('#profile_media_saving').find('button').show();
                        $('.user_contact').hide();
                        if (id == 'new_cover') {
                            this_img.attr('style', 'background-image:linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 0%,rgba(0, 0, 0, 0.37) 100%), url(' + results.tmp_file_demo + '),linear-gradient(to bottom, rgba(255, 255, 255, 1) 0%,rgba(0, 0, 0, 0.1) 100%);');
                            new_cover = results.tmp_file;
                        } else {
                            this_img.attr('src', results.tmp_file_demo);
                            new_pic = results.tmp_file;
                        }
                    } else {
                        alert(results.cause);
                    }
                },
                complete: function() {
                    if (id == 'new_cover') {
                        this_label.removeClass('uploading').html(this_label_val);
                    } else {
                        $('.profile_header .user_photo label').removeClass('uploading').find('.icon').html(this_label_val);
                    }
                }
            })

        }
    });
    $('#profile_media_saving #cancel_changes').on('click', function() {
        if (new_pic || new_cover) {
            $('#profile_media_saving').find('button').hide();
            $('.user_contact').show();
            $('img[data-for=new_profile_pic]').attr('src', old_pic);
            $('div[data-for=new_cover]').attr('style', old_cover);

        }
    })
    $('#profile_media_saving #save_changes').on('click', function() {
        if (new_pic || new_cover) {
            $.ajax({
                url: script_folder + '/ajax/save_user_photo.php',
                type: 'POST',
                dataType: 'json',
                data: {
                    'new_pic': new_pic,
                    'new_cover': new_cover
                },
                beforeSend: function() {
                    $('#profile_media_saving').find('button').hide();
                    $('#profile_media_saving').find('.result').removeClass('red green').addClass('saving').html('<div class="spinner"></div> جاري الحفظ ...').fadeIn(500);
                },
                success: function(results) {
                    if (results.result == true) {
                        $('#profile_media_saving').find('.result').removeClass('red saving').addClass('green').text('تم الحفظ').delay(1000).fadeOut(2000, function() {
                            $('.user_contact').show();
                        });
                        if (new_pic) {
                            $('#user_li img').attr('src', script_folder + '/img/members_photo/32/' + new_pic + '.jpg');
                        }
                    } else {
                        $('#profile_media_saving').find('.result').removeClass('green saving').addClass('green').text('لم يتم الحفظ, حاول مرة اخرى').delay(1000).fadeOut(2000, function() {
                            $('.user_contact').show();
                        });
                        $('img[data-for=new_profile_pic]').attr('src', old_pic);
                        $('div[data-for=new_cover]').attr('style', old_cover);
                        old_pic = $('img[data-for=new_profile_pic]').attr('src');
                        old_cover = $('div[data-for=new_cover]').attr('style');
                    }
                },
                complete: function() {
                    $('#profile_media_saving').find('button').removeAttr('disabled');
                },
                error: function() {
                    alert('حدث خطأ ما ولم يتم الحفظ, يرجى التأكد من الإتصال بالإنترنت و المحاولة مرة أخرى');
                }
            })
        }
    })




    /////// profile_settings
    $('form[name=profile_settings] input, form[name=profile_settings] select').change(function() {
        $(this).removeClass('warning').next('div.warning').text('');
    });
    $('form[name=profile_settings]').on('submit', function() {
        var message = $('#mean_result');
        var this_btn = $(this).find('button');
        var inputs = $(this).find('input, select');
        var new_username = $(this).find('input[name=new_username]').val();
        var new_email = $(this).find('input[name=new_email]').val();
        var new_year = $(this).find('input[name=new_year]').val();
        var new_month = $(this).find('select[name=new_month]').val();
        var new_day = $(this).find('select[name=new_day]').val();
        var new_country = $(this).find('select[name=new_country]').val();
        var new_phonenumber = $(this).find('input[name=new_phonenumber]').val();
        var data_json = {
            "new_username": new_username,
            "new_email": new_email,
            "new_year": new_year,
            "new_month": new_month,
            "new_day": new_day,
            "new_country": new_country,
            "new_phonenumber": new_phonenumber
        };
        $.ajax({
            type: 'POST',
            url: script_folder + '/ajax/submit_settings.php',
            data: data_json,
            dataType: 'json',
            beforeSend: function() {
                message.fadeOut();
                this_btn.attr('disabled', '').html('<div style="height: 13px;width: 13px;border-width: 2px;" class="spinner"></div>');
                $('input.warning, select.warning').removeClass('warning').next('.warning').text('');
            },
            success: function(result) {
                if (result.passed == true) {
                    message.text('تم حفظ التغييرات بنجاح').removeClass('red green').addClass('green').fadeIn();
                } else {
                    message.html('لقد إرتكبت بعض الأخطاء!<br>يرجى اصلاح الأخطاء و الحفظ مرة أخرى').removeClass('red green').addClass('red').fadeIn();
                    delete(result.passed);
                    for (var key in result) {
                        if (key == 'new_bithday') {
                            var the_element = $('select[name=new_day], select[name=new_month], input[name=new_year]');
                        } else {
                            var the_element = $('*[name=' + key + ']');
                        }
                        the_element.addClass('warning').next('div.warning').text(result[key]);
                    }

                }
            },
            error: function() {
                alert('لم يتم حفظ التغييرات, يرجى التأكد من الإتصال بالإنترنت و المحاولة مورة أخرى.');
            },
            complete: function() {
                $('html, body').animate({
                    scrollTop: $("#mean_result").offset().top - 150
                }, 1000);

                this_btn.text('تحديث البيانات').removeAttr('disabled');
            }
        });
        return false;
    });



    // add pc comment add_pc_comment
    $('form[name=add_pc_comment]').on('submit', function() {
        var textarea_comment = $(this).find('textarea[name=comment]');
        var comment = $.trim(textarea_comment.val());
        var warning = $(this).find('.warning');
        var this_btn = $(this).find('button');
        warning.removeClass('red').fadeOut().text('');
        if (comment && comment.length < 1000 && comment.length > 0) {
            $.ajax({
                type: 'POST',
                url: script_folder + '/ajax/add_pc_comment.php',
                data: {
                    'c': comment,
                    'i': pc_id
                },
                dataType: 'json',
                beforeSend: function() {
                    this_btn.attr('disabled', 'disabled');
                },
                success: function(result) {
                    console.log(result);
                    if (result.passed == true) {
                        $('form[name=add_pc_comment]').after(result.comment);
                        $('.box_of_comments').first().hide().slideDown();
                        $('html, body').animate({
                            scrollTop: $('.box_of_comments').first().offset().top - 150
                        }, 1000);
                        textarea_comment.val(null);
                        $('.comment_box.no_comments').remove();
                    } else {
                        warning.text(result.caues).addClass('red').fadeIn();
                    }
                },
                error: function() {
                    warning.text('يرجى التأكد من الأتصال و المحاولة مرة أخرى').addClass('red').fadeIn();
                },
                complete: function() {
                    this_btn.removeAttr('disabled');
                }
            });
        } else {
            if (comment.length < 1) {
                warning.text('يرجى كتابة تعليق');
            } else if (comment.length >= 1000) {
                warning.text('تمهل! لا يمكن للتعليق ان يكون أكبر من 1000 حرف!');
            }
            warning.addClass('red').fadeIn();
        }
        return false;
    });

    // remove pc comment
    $('#all_comments_pc').on('click', '.remove_comment', function() {
        if (confirm('هل أنت متأكد من أنك تريد حذف التعليق?')) {
            var this_box = $(this).parent();
            var comment_id = this_box.attr('data-id');
            $.ajax({
                type: 'POST',
                url: script_folder + '/ajax/remove_pc_comment.php',
                data: {
                    'c': comment_id,
                    'i': pc_id
                },
                dataType: 'json',
                success: function(result) {
                    if (result.passed == true) {
                        this_box.slideUp(500, function() {
                            $(this).remove()
                            if ($('.box_of_comments').length == 0) {
                                $('form[name=add_pc_comment]').after('<div class="comment_box no_comments">ليس هنالك أية تعليقات</div>');
                            }
                        });
                    } else {
                        alert('حصل خطأ ما و لم يتم الحذف, جرب تحديث الصفحة و المحاولة مرة اخرى');
                    }
                },
                error: function() {
                    alert('حصل خطأ ما و لم يتم الحذف, جرب تحديث الصفحة و المحاولة مرة اخرى');
                }
            });
        }
        return false;
    });


    // raty
    $('.starRating input').on('change', function() {
        var raty_val = $(this).val();
        $.ajax({
            type: 'POST',
            url: script_folder + '/ajax/raty.php',
            data: {
                'r': raty_val,
                'i': pc_id
            },
            dataType: 'json',
            success: function(result) {
                if (result.passed == false) {
                    alert(result.caues);
                } else { //.text('شكراً لك, وصلنا تقييمك')
                    $('.starRating').parent().children().fadeOut(1000, function() {
                        $('.starRating').parent().text('شكراً لك, وصلنا تقييمك')
                    });
                }
            },
            error: function() {
                alert('خطأ في الإتصال');
            }
        });
    });



    function max_length(str, leng) {
        if (str.length > leng) {
            return str.substring(0, leng) + '...';
        } else {
            return str;
        }
    }
    var timer;
    var last_search_val;
    $('form[name=computer_search_block]').find('input[type=text]').on('keyup', function() {
        if (timer) {
            clearTimeout(timer);
        }
        var search_val = $(this).val();
        if (last_search_val != search_val) {
            last_search_val = search_val;
            timer = setTimeout(function() {
                if (search_val.length > 0) {
                    var xhr = $.ajax({
                        type: 'POST',
                        url: script_folder + '/ajax/search.php',
                        data: {
                            's': search_val
                        },
                        dataType: 'json',
                        beforeSend: function() {
                            $('#search_results>*').slideUp(500, function() {
                                $('#search_results').slideDown();
                                $('form[name=computer_search_block]>input[type=text], form[name=computer_search_block]>button').addClass('remove_bottom_border');
                            });
                        },
                        success: function(result) {
                            $('#search_results').empty();
                            if (result == null) {
                                $('#search_results').html('<div style="padding:30px;text-align:center;color:#777;">لا نتائج</div>');
                            } else {
                                for (var i = result.length - 1; i >= 0; i--) {
                                    $('#search_results').append('<a style="display: none" href="' + result[i].url + '">' + result[i].title + '</a>');
                                    $('#search_results>*').slideDown().removeAttr('style');
                                };
                            }
                        },
                        error: function() {

                        },
                        complete: function() {

                        }
                    });
                } else {
                    $('#search_results>*').slideUp(500, function() {
                        $(this).remove();
                    })
                }
            }, 100);
        }
    });
    $('form[name=computer_search_block]').on('submit', function() {
        var search_val = $(this).find('input[type=text]').val();
        if (search_val) {
            window.location = "/search/" + search_val;
        }
        return false;
    });

    var favorite_one_click = true;
    $('.share_item.favorite').on('click', function() {
        var fav = $(this);
        if (favorite_one_click == true) {
            favorite_one_click = false;
            $.ajax({
                type: 'POST',
                url: script_folder + '/ajax/favorites.php',
                data: {
                    'i': pc_id
                },
                dataType: 'json',
                beforeSend: function() {
                    favorite_one_click = false;
                    fav.addClass('process');
                },
                success: function(result) {
                    if (result.result === true) {
                        if (result.add == true) {
                            fav.html('<span class="icon">&#xe9db;</span>حذف من الألعاب المفضلة</a></div>');
                            fav.addClass('active');
                        } else {
                            fav.html('<span class="icon">&#xe9da;</span>اضافة للألعاب المفضلة</a></div>');
                            fav.removeClass('active');
                        }
                    } else {
                        alert(result.cause);
                    }
                },
                error: function() {
                    alert(result.cause);
                },
                complete: function() {
                    favorite_one_click = true;
                    fav.removeClass('process');
                }
            });
        }
    });

    $('.favorites_list .remove').on('click', function() {
        var fav = $(this);
        var pc_id = fav.data('id');
        $.ajax({
            type: 'POST',
            url: script_folder + '/ajax/favorites_remove.php',
            data: {
                'i': pc_id
            },
            dataType: 'json',
            beforeSend: function() {

            },
            success: function(result) {
                if (result.result === true) {
                    if ($('.favorites_list .remove').length > 1) {
                        fav.parent().css({
                            'transform': 'translate(-100%)'
                        }).delay(400);
                        fav.parent().promise().done(function() {
                            fav.parent().remove();
                        });
                    } else {
                        fav.parent().html('<span style="color:#888;">قائمة الألعاب المفضلة فارغة</span>');
                    }
                } else {
                    alert(result.cause);
                }
            },
            error: function() {
                alert(result.cause);
            },
            complete: function() {
                favorite_one_click = true;
                fav.removeClass('process');
            }
        });
    });

    $('.share_item.QR').on('click', function() {
        var png = $(this).data('png');
        if (png) {
            $(this).removeAttr('data-png').addClass('active').html('<img width="80%" src="' + png + '" />');
        }
        $(this).data('png', 0);
        return false;
    });

    // $('#all_comments_pc').on('click', '.add_pc_comments_replay', function(){
    // 	$(this).after('<textarea class="replay_on_pc_comment" placeholder="اكتب ردك هنا"></textarea>');
    // 	$(this).remove();
    // 	$('.replay_on_pc_comment').focus();
    // 	return false;
    // });
    var send_repaly = true;
    $('body').hover(function() {
        $(".replay_on_pc_comment").keypress(function(e) {
            if (e.keyCode == 13 && !e.shiftKey && send_repaly == true) {
                var this_text = $(this);
                var this_comment = this_text.parent();
                var comment_id = this_comment.attr('data-id');
                var replay = this_text.val();
                $.ajax({
                    type: 'POST',
                    url: script_folder + '/ajax/add_pc_comment.php',
                    data: {
                        'i': pc_id,
                        'r': comment_id,
                        'c': replay
                    },
                    dataType: 'json',
                    beforeSend: function() {
                        this_text.attr('disabled', 'disabled');
                        send_repaly = false;
                    },
                    success: function(result) {
                        if (result.passed === true) {
                            this_text.before(result.comment);
                            this_comment.find('.box_of_comments').last().hide().slideDown();
                            this_text.val(null);
                        } else {
                            alert(result.cause);
                        }
                    },
                    error: function() {
                        alert('حصل خطأ ما, يرجى تحديث الصفحة و المحاولة مرة أخرى');
                    },
                    complete: function() {
                        this_text.removeAttr('disabled');
                        send_repaly = true;
                    }
                });

            }
        });

    });



    $('#noti_list').bind('mousewheel DOMMouseScroll', function(e) {
        var scrollTo = null;

        if (e.type == 'mousewheel') {
            scrollTo = (e.originalEvent.wheelDelta * -1);
        } else if (e.type == 'DOMMouseScroll') {
            scrollTo = 40 * e.originalEvent.detail;
        }

        if (scrollTo) {
            e.preventDefault();
            $(this).scrollTop(scrollTo + $(this).scrollTop());
        }
    });

    var next_page_noti;
    var first_time_noti = true;
    $('#noti_menu>.icon').click(function() {
        var noti_menu_icon = $(this);
        noti_menu_icon.parent().addClass('opend');
        if (first_time_noti == true) {
            $.ajax({
                url: script_folder + '/ajax/get_notis.php',
                dataType: 'json',
                beforeSend: function() {
                    $('#noti_list').show();
                    $('#noti_list').html('<div class="remove_me"><div class="spinner"></div></div>');
                },
                success: function(result) {
                    noti_menu_icon.html('&#xe802;').parent().removeClass('new_noti');
                    if (result.notis) {
                        $('#noti_list').html(result.notis);
                        next_page_noti = result.next_page
                    } else {
                        $('#noti_list').html('<div style="padding: 20px;text-align: center">ليس لديك أية إشعارات في الوقت الحالي</div>');
                    }
                },
                error: function() {
                    alert('حصل خطأ ما, يرجى تحديث الصفحة و المحاولة مرة أخرى');
                },
                complete: function() {
                    first_time_noti = false;
                }
            });
        } else {
            $('#noti_list').toggle();
        };
    });
    $(document).click(function(e) {
        var target = e.target;
        if (!$(target).is('#noti_menu') && !$(target).parents().is('#noti_menu')) {
            $('#noti_list').hide().parent().removeClass('opend');
        }
    });
    var turn_on_noti_list = true;
    var finished_noti_list = false;
    $('#noti_list').scroll(function() {
        var this_list = $(this);
        if (this_list[0].scrollHeight - this_list.scrollTop() < this_list.outerHeight() && turn_on_noti_list == true && next_page_noti && finished_noti_list == false) {
            $.ajax({
                url: script_folder + '/ajax/get_notis.php',
                data: {
                    'n': next_page_noti
                },
                type: 'POST',
                dataType: 'json',
                beforeSend: function() {
                    turn_on_noti_list = false;
                    $('#noti_list').append('<div class="remove_me"><div class="spinner"></div></div>');
                },
                success: function(result) {
                    if (result.notis) {
                        $('#noti_list').append(result.notis);
                        next_page_noti = result.next_page;
                    } else {
                        $('#noti_list').append('<div style="padding: 15px;text-align: center">هذا كان كل شيئ, لا مزيد من الإشعارات</div>');
                        finished_noti_list = true;
                    }
                },
                error: function() {
                    alert('حصل خطأ ما, يرجى تحديث الصفحة و المحاولة مرة أخرى');
                },
                complete: function() {
                    turn_on_noti_list = true;
                    $('#noti_list').find('.remove_me').remove();
                }
            });

        }
    });

    if (window.location.hash.charAt(1) == 'c') {

        var hash_id = window.location.hash.substring(2);

        $.ajax({
            url: '/ajax/get_comment.php',
            type: 'GET',
            data: {
                'id': hash_id
            },
            success: function(content) {
                $('.comments_list_container').prepend('<div class="selected_comment">' + content.content + '</div>');
                $('html, body').animate({
                    scrollTop: $('.comments_list_container .selected_comment').offset().top - 58
                }, 600);
            },
            error: function(jqXHR, exception) {
                console.log("AJAX ERROR: " + jqXHR.responseText);
            }
        });



        $.ajax({
            type: 'POST',
            url: script_folder + '/ajax/remove_active_noti.php',
            data: {
                'c': window.location.hash.substr(1)
            },
            dataType: 'json'
        });
    }

    // var before_scroll = $(window).scrollTop();
    // var before_stop = $(window).scrollTop();
    // var scroll_up = false;
    // $(window).scroll(function(){
    // 	var scroll_now = $(window).scrollTop();
    // 	if( scroll_now > before_stop){
    // 		if(scroll_up == true && scroll_now-before_scroll < 55){
    // 			before_scroll = $(window).scrollTop();
    // 		}
    // 		scroll_up = false;
    // 		if(scroll_now-before_scroll > 0 ){
    // 			$('#navbar').css('top','-'+(scroll_now-before_scroll)+'px');
    // 		}
    // 	}else{
    // 		if(scroll_up == false && scroll_now-before_scroll > 55){
    // 			before_scroll = $(window).scrollTop();
    // 		}
    // 		scroll_up = true;
    // 		if(scroll_now-before_scroll < 0){
    // 			$('#navbar').css('top','-'+(55+(scroll_now-before_scroll))+'px');
    // 		}
    // 	}
    // 	before_stop = $(window).scrollTop();
    // });

    // if( window.canRunAds === undefined ){
    // 	$('#anti_adblock_container').show();
    // 	$('body').attr('style', 'overflow:hidden');
    // }

});