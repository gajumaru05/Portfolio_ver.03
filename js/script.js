$(function () {

    window.onscroll = function () {
        //フッターの上部まで来たら注文ボタンを消す
        const footer = $("footer").innerHeight(); // footerの高さを取得
        const point = window.pageYOffset; // 現在のスクロール地点
        const docHeight = $(document).height(); // ドキュメントの高さ
        const dispHeight = $(window).height(); // 表示領域の高さ
        if (point > docHeight - dispHeight - footer) {
            // スクロール地点>ドキュメントの高さ-表示領域-footerの高さ
            $(".menu_btn").addClass("is-hidden");
            //footerより下にスクロールしたらis-hiddenを追加
        } else {
            $(".menu_btn").removeClass("is-hidden");
            //footerより上にスクロールしたらis-hiddenを削除
        }
    };

    //スクロールにより要素に近づいたら下から出現　▶︎ 検討案：上の構文と似ている構造の為、リファクタリング予定？
    $(window).scroll(function () {
        const scrollAnimationElm = document.querySelectorAll('.scroll_up');
        const scrollAnimationFunc = function () {
            for (let i = 0; i < scrollAnimationElm.length; i++) {
                const triggerMargin = 80; // scroll_upを指定したクラスの120px前に来たら出現
                if (window.innerHeight > scrollAnimationElm[i].getBoundingClientRect().top + triggerMargin) {
                    scrollAnimationElm[i].classList.add('on');
                }
            }
        }
        //イベント
        window.addEventListener('load', scrollAnimationFunc);
        window.addEventListener('scroll', scrollAnimationFunc);
    });

    //ナビゲーションが押されたらゆっくりスクロールする
    $('[href*="#"]').click(function () {
        //全てのページ内リンクに適用させたい場合はa[href*="#"]のみでもOK
        if (window.matchMedia("(min-width: 769px)").matches) {
            /* ウィンドウサイズ769以上の処理 */
            const headerHight = 0; //ヘッダーの高さを指定(ヘッダー非追従)
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
            }, 800); //取得した位置にスクロール。800の数値が大きくなるほどゆっくりスクロール
            return false;
        }
    });

    //768px以下の時に、メニュー内のリンク & リンク外 を押すと閉じる
    $(".header_menu").on("click", function (event) {
        $("#menu_box").prop("checked", false);
    });
    $(".header_menu li a").on("click", function (event) {
        $("#menu_box").prop("checked", false);
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
        autoplay: true, // 自動的に動き出す(初期値はfalse)
        fade: true, // スライドからフェードインに変更
        speed: 2000, // 切り替わる速度
        infinite: true, // ループさせる(初期値はtrue)
        slidesToShow: 1, // 画面に1枚ずつ見せる
        slidesToScroll: 1, // 1回で1枚の写真を見せる
        pauseOnHover: false, // ホバー時に一時停止しない
        arrows: false, // 矢印を非表示
        dots: true, // 下部ドットナビゲーションの表示
    });
});