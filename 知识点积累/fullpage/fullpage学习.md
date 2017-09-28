 
 
	$(document).ready(function() {
        $(‘#fullpage‘).fullpage({
            //配置项介绍

            //sectionsColor为每个section设置background-color属性
            sectionsColor:[‘green‘,‘orange‘,‘gray‘,‘red‘,‘yellow‘],
            //controlArrows定义是否通过箭头来控制slide,默认true
            controlArrows:false,
            //verticalCentered定义每一页的内容是否垂直居中，默认true
            verticalCentered:false,
            //resize字体是否随窗口缩放而缩放，默认false
            resize:true,
            //scrollingSpeed设置滚动速度，单位毫秒，默认700
            scrollingSpeed:1000,
            //anchors定义锚链接，默认为[],定义锚链接时，值不要和页面中的任何ID或name相同，且不需要加#
            anchors:[‘page1‘,‘page2‘,‘page3‘,‘page4‘,‘page5‘],
            //lockAnchors是否锁定锚链接，默认为false,设为true后链接地址不会改变
            // lockAnchors:true,
            //easing定义页面section滚动的动画方式，默认为easeInOutCubic,若修改此项需引入jquery.easing插件
            //css3是否使用CSS3 transforms来实现滚动效果，默认为true。若浏览器不支持CSS3，则会用Jquery来实现
            //css3:false,
            //loopTop滚动到最顶部后是否连续滚动到底部，默认为false
            //loopBottom滚动到最低部后是否连续滚动到顶部，默认为false
            //loopHorizontal横向slide幻灯片是否循环滚动，默认为true
            //autoScrolling是否使用插件的滚动方式，默认为true,若为false则会出现浏览器自带滚动条    
            //scrollBar是否包含滚动条，默认为false,若为true浏览器自带滚动条出现
            //paddingTop/paddingBottom设置每一个section顶部和底部的padding,默认为0
            //fixedElements固定元素，默认为null,需要配置一个jquery选择器，在页面滚动时，fixElements设置的元素不滚动
            fixedElements:"#header",
            //keyboardScrolling是否可以使用键盘方向键导航，默认为true
            //touchSensitivity在移动设备中滑动页面的敏感性，默认为5最高100，越大越难滑动
            //continousVertical是否循环滚动，默认为false,注意这个属性和loopTop loopBottom不兼容，不能同时设置
            //animateAnchor锚链接是否可以控制滚动动画，默认为true,若为false则锚链接定位失效
            //recordHistory是否记录历史，默认为true,通过浏览器的前进后退来导航。若设置autoScrolling:false,那么这个属性将被关闭
            //menu绑定菜单，设定的相关属性与anchors的值对应后，菜单可以控制滚动条，默认为false。可设置为菜单的jquery选择器
            //menu:"#fullpageMenu",
            //navigation是否显示导航，默认为false
            navigation:true,
            //navigationPosition导航小圆点的位置
            navigationPosition:"right",
            //navigationTooltips导航小圆点的提示，注意按顺序设置
            navigationTooltips:[‘page1‘,‘page2‘,‘page3‘,‘page4‘,‘page5‘],
            //showActiveTooltip是否显示当前页面的tooltip信息，默认为false
            //slidesNavigation 是否显示横向幻灯片的导航，默认为false
            slidesNavigation:true,
            //slidesNavPosition横向导航的位置，默认为bottom，可以设置为top或bottom
            slidesNavPositon:"top",
            //scrollOverflow内容超过满屏后是否显示滚动条，默认为false,如果为true则会显示滚动条，若需滚动查看内容还需要jquery.slimscroll插件的配合
            //sectionSelector:section选择器。默认为.section
            //slideSelector:slide选择器，默认为.slide

            //方法介绍
            //$.fn.fullpage.***()
            //moveSectionUp()向上滚动一页
            //moveSectionDown()向下滚动一页
            //moveTo(section,slide)section从1开始，slide从0开始
            //silentMoveTo(section,slide)和moveTo一样，但是没有滚动效果
            //moveSlideRight()幻灯片向右滚动
            //moveSlideLeft()幻灯片向左滚动
            //setAutoScrolling(boolean):动态设置autoScrolling
            //setLockAnchors(boolean):动态设置lockAnchors
            //setRecordHistory(boolean):动态设置recordHistory
            //setScrollingSpeed(milliseconds):动态设置scrollingSpeed
            //destory(type)销毁fullpage,type可以不写或者使用all
            //reBuild()重新更新页面和尺寸，用于ajax请求改变页面结构后重建效果
            //lazyLoading
        });
    });