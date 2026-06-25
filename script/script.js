$(function () {

    AOS.init({ duration: 700, once: true, offset: 60, easing: "ease-out-cubic" });

    /* HEADER */
    $(window).on("scroll.header", function () {
        if ($(this).scrollTop() > 40) { $("#site-header").addClass("scrolled"); }
        else { $("#site-header").removeClass("scrolled"); }
    });

    /* NAV (데스크톱: hover 드롭다운) */
    var navTimer;
    var mq = window.matchMedia("(max-width: 768px)");

    $(".navi > li").on("mouseenter", function () {
        if (mq.matches) return;            // 모바일에서는 hover 무시
        clearTimeout(navTimer);
        $(".navi > li").not(this).find(".submenu").stop(true,true).slideUp(150);
        $(this).find(".submenu").stop(true,true).slideDown(220);
    });
    $(".navi").on("mouseleave", function () {
        if (mq.matches) return;
        navTimer = setTimeout(function () {
            $(".submenu").stop(true,true).slideUp(180);
        }, 60);
    });

    /* MOBILE NAV (햄버거 토글 + 서브메뉴 아코디언) */
    function closeMobileMenu() {
        $(".nav-toggle").removeClass("open").attr("aria-expanded", "false");
        $(".menu, .menu_bg").removeClass("open");
        $(".navi > li").removeClass("open");
    }
    $(".nav-toggle").on("click", function () {
        var open = $(this).toggleClass("open").hasClass("open");
        $(this).attr("aria-expanded", open ? "true" : "false");
        $(".menu, .menu_bg").toggleClass("open", open);
    });
    $(".menu_bg").on("click", closeMobileMenu);

    /* 모바일: 1depth 탭하면 서브메뉴 아코디언 토글 */
    $(".navi > li > a").on("click", function (e) {
        if (!mq.matches) return;
        var $li = $(this).parent();
        if ($li.find(".submenu").length) {
            e.preventDefault();
            $(".navi > li").not($li).removeClass("open");
            $li.toggleClass("open");
        }
    });
    /* 서브메뉴 링크 클릭 시 메뉴 닫기 */
    $(".submenu a").on("click", function () {
        if (mq.matches) closeMobileMenu();
    });
    /* 데스크톱으로 전환 시 모바일 상태 초기화 */
    mq.addEventListener("change", function (e) {
        if (!e.matches) closeMobileMenu();
    });

    /* CAROUSEL (Swiper) */
    var heroSwiper = new Swiper(".heroSwiper", {
        loop: true,
        speed: 1000,
        effect: "fade",
        fadeEffect: { crossFade: true },
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
            waitForTransition: false
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true
        },
        navigation: {
            nextEl: ".slide-next",
            prevEl: ".slide-prev"
        }
    });

    /* STATS COUNT-UP */
    var counted = false;
    function doCountUp() {
        if (counted) return;
        var $s = $(".stats");
        if (!$s.length) return;
        if ($(window).scrollTop() + $(window).height() > $s.offset().top + 60) {
            counted = true;
            $(".stat-num").each(function () {
                var $el = $(this);
                var target = parseInt($el.data("target"), 10);
                var dur = 1800; var start = null;
                (function tick(ts) {
                    if (!start) start = ts;
                    var p = Math.min((ts - start) / dur, 1);
                    var v = 1 - Math.pow(1 - p, 3);
                    $el.text(Math.round(v * target).toLocaleString("ko-KR"));
                    if (p < 1) requestAnimationFrame(tick);
                })(performance.now());
            });
        }
    }
    $(window).on("scroll.countup", doCountUp);
    doCountUp();

    /* MODAL */
    function openModal()  { $(".modal").addClass("active"); }
    function closeModal() { $(".modal").removeClass("active"); }
    $(".notice li:first-child a").on("click", function (e) { e.preventDefault(); openModal(); });
    $(".btn, .modal-x").on("click", closeModal);
    $(".modal").on("click", function (e) { if ($(e.target).hasClass("modal")) closeModal(); });
    $(document).on("keydown", function (e) { if (e.key === "Escape") closeModal(); });
    /* 자동 팝업 제거 - 클릭 시에만 열림 */

});
