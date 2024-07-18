$(function () {

    //ナビゲーションが押されたらゆっくりスクロールする
    $('[href*="#"]').click(function () {
        //全てのページ内リンクに適用させたい場合はa[href*="#"]のみでもOK
        if (window.matchMedia("(min-width: 769px)").matches) {
            /* ウィンドウサイズ769以上の処理 */
            const headerHight = 60; //ヘッダーの高さを指定(ヘッダー追従のため)
            const elmHash = $(this).attr("href"); //ページ内リンクのHTMLタグhrefから、リンクされているエリアidの値を取得
            const pos = $(elmHash).offset().top - headerHight; //idの上部の距離(ヘッダーの高さを差し引き)を取得
            $("body,html").animate({
                scrollTop: pos
            }, 500); //取得した位置にスクロール。500の数値が大きくなるほどゆっくりスクロール
            return false;
        } else if (window.matchMedia("(max-width:768px)").matches) {
            /* ウィンドウサイズ768以下の処理*/
            const headerHight = 0; //ヘッダーの高さを指定(ヘッダー非追従のため)
            const elmHash = $(this).attr("href"); //ページ内リンクのHTMLタグhrefから、リンクされているエリアidの値を取得
            const pos = $(elmHash).offset().top - headerHight; //idの上部の距離(ヘッダーの高さを差し引き)を取得
            $("body,html").animate({
                scrollTop: pos
            }, 500); //取得した位置にスクロール。500の数値が大きくなるほどゆっくりスクロール
            return false;
        }
    });

    //Slider Slick
    const $slider = $("#js-slider");
    // 左右の透過の2周目ががたつく対応
    $slider.on("beforeChange", (event, slick, currentSlide, nextSlide) => {
        $slider.find(".slick-slide").each((index, el) => {
            const $this = $(el),
                slickindex = $this.attr("data-slick-index");
            if (nextSlide == slick.slideCount - 1 && currentSlide == 0) {
                // 現在のスライドが最初のスライドでそこから最後のスライドに戻る場合
                if (slickindex == "-1") {
                    // 最後のスライドに対してクラスを付与
                    $this.addClass("is-active-next");
                } else {
                    // それ以外は削除
                    $this.removeClass("is-active-next");
                }
            } else if (nextSlide == 0) {
                // 次のスライドが最初のスライドの場合
                if (slickindex == slick.slideCount) {
                    // 最初のスライドに対してクラスを付与
                    $this.addClass("is-active-next");
                } else {
                    // それ以外は削除
                    $this.removeClass("is-active-next");
                }
            } else {
                // それ以外は削除
                $this.removeClass("is-active-next");
            }
        });
    });

    $slider.slick({
        autoplay: true, //自動的に動き出すか。初期値はfalse。
        speed: 800, //スライドが切り替わる速度。
        // adaptiveHeight: true, 画像の高さを自動補正
        // variableWidth: true, //画像の幅を自動補正
        infinite: true, //スライドをループさせるかどうか。初期値はtrue。
        slidesToShow: 3, //スライドを画面に3枚見せる
        slidesToScroll: 1, //1回のスクロールで3枚の写真を移動して見せる
        pauseOnHover: false, //ホバーしたときにスライドを一時停止しない
        centerMode: true,
        centerPadding: "0px", // 左右のスライドのpadding
        dots: true, //下部ドットナビゲーションの表示
        prevArrow: '<img src="./img/item/left.svg" alt="" class="prev_icon">',
        nextArrow: '<img src="./img/item/right.svg" alt="" class="next_icon">',
        responsive: [{
                breakpoint: 1099, //モニターの横幅が1099px以下の見せ方
                settings: {
                    centerMode: false, // 両サイドに前後のスライド表示
                    slidesToShow: 2, //スライドを画面に2枚見せる
                    slidesToScroll: 2, //1回のスクロールで2枚の写真を移動して見せる
                },
            },
            {
                breakpoint: 768, //モニターの横幅が768px以下の見せ方
                settings: {
                    centerMode: false, // 両サイドに前後のスライド表示
                    slidesToShow: 1, //スライドを画面に1枚見せる
                    slidesToScroll: 1, //1回のスクロールで1枚の写真を移動して見せる
                },
            },
        ],
    });

    // アコーディオン
    $('.accordion_item .accordion_surface').click(function () {
        // アコーディオンの上部をクリックした時に、内部の要素を表示・非表示
        if (window.matchMedia("(min-width: 900px)").matches) {
            // 900px以上の時に、横向きに伸縮
            $(this).next().animate({
                width: 'toggle'
            });
            $(this).toggleClass("open");
            // アコーディオンの上部を押したら内部を隠す
            // $('.accordion_item .accordion_inner .text_box').toggleClass("open");
            // アコーディオンの上部を押したら内部の要素を表示
            $('.accordion_item .accordion_surface').not($(this)).next().animate({
                width: 'hide'
            });
            $('.accordion_item .accordion_surface').not($(this)).removeClass("open");
            $('.accordion_item .accordion_surface.stay').not($(this)).addClass("open");
            return false;
        } else if (window.matchMedia("(max-width:899px)").matches) {
            // 899px以下の時に、縦向きに伸縮
            $(this).next().animate({
                height: 'toggle'
            });
            $(this).toggleClass("open");
            // もう一度、アコーディオンの上部を押したら内部を隠す
            $('.accordion_item .accordion_surface').not($(this)).next().animate({
                height: 'hide'
            });
            $('.accordion_item .accordion_surface').not($(this)).removeClass("open");
            $('.accordion_item .accordion_surface.stay').not($(this)).addClass("open");
            return false;
        }
    });

    /* モーダルウィンドウを表示させる */
    $('.js_modal_open').each(function () {
        $(this).on('click', function () {
            const target = $(this).data('target');
            const modal = document.getElementById(target);
            $(modal).fadeIn();
            return false;
        });
    });
    $('.js_modal_close').on('click', function () {
        $('.js-modal').fadeOut();
        return false;
    });

});