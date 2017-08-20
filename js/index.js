/**
 * Created by mamamiyear on 2017/7/15.
 */

$(document).ready(function () {

    prepare_global_settings();
    $(".tag-btn").click(function () {
        tag_click_function(this);
    });
});
prepare_global_settings = function () {
    colors_map = {
        "$icon-color": "rgb(127, 127, 127)",
        "$icon-color-selected": "rgb(62, 200, 170)"
    };

    tag_selected_list = new Set();


};

tag_click_function = function (that) {

    // 改变颜色
    toggle_tag_btn_color(that);

    // 过滤文章
    flush_tag_selected_article();

};

/**
 * 更改tag标签颜色
 */
toggle_tag_btn_color = function (btn) {
    var color_for_tag_btn = $(btn).css("background-color");
    if (color_for_tag_btn === colors_map["$icon-color"]) {
        $(btn).css("background-color", colors_map["$icon-color-selected"]);
        tag_selected_list.add($(btn).text());
    } else if (color_for_tag_btn === colors_map["$icon-color-selected"]) {
        $(btn).css("background-color", colors_map["$icon-color"]);
        tag_selected_list.delete($(btn).text());
    } else {
        console.error("tag button not have this state.");
    }
};

/**
 * 刷新选中标签的文章列表
 */
flush_tag_selected_article = function () {

    var articles = $(".post-list li");
    if (tag_selected_list.size === 0) {
        articles.css('display', 'block');
        return;
    }
    articles.css('display', 'none');
    tag_selected_list.forEach(function (item, index, input) {
        //匿名函数参数第三项为原数组
        // console.info("tag item:" + item.toString());
        articles.each(function () {
            // console.info("this li class:" + this.getAttribute("class"));
            // if ($(this).hasClass(item.toString())){
            var a = item.toString();
            if ($(this).hasClass(a)) {
                // console.info(this.getAttribute("class"));
                $(this).css('display', 'block');
            }
        });
    });


};