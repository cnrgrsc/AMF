const config = {
    enable: 0,
    max: 0,
    ig_like: false,
    ig_follow: false,
    tiktok_like: false,
    tiktok_follow: false,
    fb_post_like: false,
    fb_like: false,
    twitter_follow: false,
    twitter_like: false,
    yt_sub: false,
    yt_like: false,
    sc_follow: false,
    sc_like: false,
    reddit_follow: false,
    reddit_like: false
};

$(document).ready(function () {
    $("btn#start").click(function () {

        const txt = $(this).text();

        if (txt === "Start") {

            config.max = $('#max-click').val();
            config.ig_like = $("#instagram-like").is(":checked");
            config.ig_follow = $("#instagram-follow").is(":checked");
            config.tiktok_like = $("#tiktok-like").is(":checked");
            config.tiktok_follow = $("#tiktok-follow").is(":checked");
            config.fb_post_like = $("#facebook-post-like").is(":checked");
            config.fb_like = $("#facebook-like").is(":checked");
            config.twitter_follow = $("#twitter-follow").is(":checked");
            config.twitter_like = $("#twitter-like").is(":checked");
            config.yt_sub = $("#youtube-sub").is(":checked");
            config.yt_like = $("#youtube-like").is(":checked");
            config.sc_follow = $("#sc-follow").is(":checked");
            config.sc_like = $("#sc-like").is(":checked");
            config.reddit_follow = $("#reddit-follow").is(":checked");
            config.reddit_like = $("#reddit-like").is(":checked");

            if (
                (!config.ig_like) && (!config.ig_follow)
                && (!config.tiktok_like) && (!config.tiktok_follow)
                && (!config.fb_like) && (!config.fb_post_like)
                && (!config.twitter_follow) && (!config.twitter_like)
                && (!config.yt_sub) && (!config.yt_like)
                && (!config.sc_follow) && (!config.sc_like)
                && (!config.reddit_follow) && (!config.reddit_like)
            ) {
                return;
            }

            config.enable = 1;
            $(this).text("Stop");
            $(this).removeClass("btn-success");
            $(this).addClass("btn-danger");

            chrome.storage.sync.set({
                max: config.max,
                ig_like: config.ig_like, ig_follow: config.ig_follow,
                tiktok_like: config.tiktok_like, tiktok_follow: config.tiktok_follow,
                fb_post_like: config.fb_post_like, fb_like: config.fb_like,
                twitter_follow: config.twitter_follow, twitter_like: config.twitter_like,
                yt_sub: config.yt_sub, yt_like: config.yt_like,
                sc_follow: config.sc_follow, sc_like: config.sc_like,
                reddit_follow: config.reddit_follow, reddit_like: config.reddit_like
            });

        } else {
            $(this).text("Start");
            $(this).removeClass("btn-danger");
            $(this).addClass("btn-success");
            config.enable = 0;
        }

        set_status();
    });

    get_status();
    //setInterval(get_status,1000);
});

function set_status() {

    EnableControls(config.enable ? true : false);
    chrome.runtime.sendMessage({
        action: "set",
        enable: config.enable,
        max: config.max,
        ig_like: config.ig_like,
        ig_follow: config.ig_follow,
        tiktok_like: config.tiktok_like,
        tiktok_follow: config.tiktok_follow,
        fb_post_like: config.fb_post_like,
        fb_like: config.fb_like,
        twitter_follow: config.twitter_follow,
        twitter_like: config.twitter_like,
        yt_sub: config.yt_sub,
        yt_like: config.yt_like,
        sc_follow: config.sc_follow,
        sc_like: config.sc_like,
        reddit_follow: config.reddit_follow,
        reddit_like: config.reddit_like

    }, function (response) {
    });

}

function get_status() {
    const $b = $("btn#start");

    chrome.runtime.sendMessage({action: "get"}, function (response) {

        config.enable = response.enable;
        config.max = response.max;
        config.ig_like = response.ig_like;
        config.ig_follow = response.ig_follow;
        config.tiktok_like = response.tiktok_like;
        config.tiktok_follow = response.tiktok_follow;
        config.fb_post_like = response.fb_post_like;
        config.fb_like = response.fb_like;
        config.twitter_follow = response.twitter_follow;
        config.twitter_like = response.twitter_like;
        config.yt_sub = response.yt_sub;
        config.yt_like = response.yt_like;
        config.sc_follow = response.sc_follow;
        config.sc_like = response.sc_like;
        config.reddit_follow = response.reddit_follow;
        config.reddit_like = response.reddit_like;

        if (config.enable === 0) {
            $b.text("Start");
            $b.removeClass("btn-danger");
            $b.addClass("btn-success");
        } else {
            $b.text("Stop");
            $b.removeClass("btn-success");
            $b.addClass("btn-danger");
        }

        $('#max-click').val(config.max);

        $('#instagram-like').prop("checked", config.ig_like);
        $('#instagram-follow').prop("checked", config.ig_follow);
        $('#tiktok-like').prop("checked", config.tiktok_like);
        $('#tiktok-follow').prop("checked", config.tiktok_follow);
        $('#facebook-post-like').prop("checked", config.fb_post_like);
        $('#facebook-like').prop("checked", config.fb_like);
        $('#twitter-follow').prop("checked", config.twitter_follow);
        $('#twitter-like').prop("checked", config.twitter_like);
        $('#youtube-sub').prop("checked", config.yt_sub);
        $('#youtube-like').prop("checked", config.yt_like);
        $('#sc-follow').prop("checked", config.sc_follow);
        $('#sc-like').prop("checked", config.sc_like);
        $('#reddit-follow').prop("checked", config.reddit_follow);
        $('#reddit-like').prop("checked", config.reddit_like);

        EnableControls(!!config.enable);
    });
}


chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {

        if (request.action === "count") {
            $("btn#count").text(request.value);
            if (request.enable !== 1) {
                const $b = $("btn#start");
                $b.removeClass("btn-danger");
                $b.addClass("btn-success");
                $b.text("Start");
            }
            return;
        }
    });

function EnableControls(val) {
    $('#max-click').prop("disabled", val);
    $('#instagram-like').prop("disabled", val);
    $('#instagram-follow').prop("disabled", val);
    $('#tiktok-like').prop("disabled", val);
    $('#tiktok-follow').prop("disabled", val);
    $('#facebook-post-like').prop("disabled", val);
    $('#facebook-like').prop("disabled", val);
    $('#twitter-follow').prop("disabled", val);
    $('#twitter-like').prop("disabled", val);
    $('#youtube-sub').prop("disabled", val);
    $('#youtube-like').prop("disabled", val);
    $('#sc-follow').prop("disabled", val);
    $('#sc-like').prop("disabled", val);
    $('#reddit-follow').prop("disabled", val);
    $('#reddit-like').prop("disabled", val);
}