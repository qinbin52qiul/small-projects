// 获取元素
var getElem = function (selector) {
  return document.querySelector(selector);
}
// 获取所有兄弟元素
var getAllElem = function (selector) {
  return document.querySelectorAll(selector);
}
// 为元素添加样式
var addCls = function (element, cls) {
  element.classList.add(cls);
}
// 为元素删除样式
var delCls = function (element, cls) {
  element.classList.remove(cls);
}
// 检查元素是否存在某个类
var chkCls = function (element, cls) {
  return element.classList.contains(cls);
}
// 设置样式
var setStyleLeft = function(element, displace) {
  element.style.left = displace + 'px';
}

// 第一步：初始化样式 init
var screenAnimateElements = {
  '.screen-1': [
    '.screen-1__heading',
    '.screen-1__phone',
    '.screen-1__shadow',
  ],
  '.screen-2': [
    '.screen-2__heading',
    '.screen-2__subheading',
    '.screen-2__phone',
    '.screen-2__point',
    '.screen-2__point_i_1',
    '.screen-2__point_i_2',
    '.screen-2__point_i_3',
  ],
  '.screen-3': [
    '.screen-3__heading',
    '.screen-3__subheading',
    '.screen-3__phone',
    '.screen-3__features',
  ],
  '.screen-4': [
    '.screen-4__heading',
    '.screen-4__subheading',
    '.screen-4__type__item_i_1',
    '.screen-4__type__item_i_2',
    '.screen-4__type__item_i_3',
    '.screen-4__type__item_i_4',
  ],
  '.screen-5': [
    '.screen-5__heading',
    '.screen-5__subheading',
    '.screen-5__bg',
  ],
};

// 设置屏内元素为初始状态
var setScreenAnimateInit = function (screenCls) {
  var animateElements = screenAnimateElements[screenCls]; // 需要设置动画的元素

  for (var i = 0; i < animateElements.length; i++) {
    var element = document.querySelector(animateElements[i]);
    var cls = animateElements[i].substr(1) + '_animate_init';
    addCls(element, cls);
  }
}

// 设置屏播放屏内元素动画
var playScreenAnimateDone = function (screenCls) {
  var animateElements = screenAnimateElements[screenCls]; // 需要设置动画的元素

  for (var i = 0; i < animateElements.length; i++) {
    var element = document.querySelector(animateElements[i]);
    var baseCls = element.getAttribute('class');
    element.setAttribute('class', baseCls.replace('_animate_init', '_animate_done'));
  }
}

window.onload = function () {
  for (var k in screenAnimateElements) {
    if(k === '.screen-1') {
      continue;
    }
    setScreenAnimateInit(k);
  }
}

setTimeout(function() {
  playScreenAnimateDone('.screen-1')
}, 200);

// 第二步：滚动到哪里，就播放到哪里
var navItems = getAllElem('.header__nav-item');
var outlineItems = getAllElem('.outline__item');

var switchNavItemsActive = function (ids) {
  for (var i = 0; i < navItems.length; i++) {
    delCls(navItems[i], 'header__nav-item_status_active');
  }
  addCls(navItems[ids], 'header__nav-item_status_active');

  for (var i = 0; i < outlineItems.length; i++) {
    delCls(outlineItems[i], 'outline__item_status_active');
  }
  addCls(outlineItems[ids], 'outline__item_status_active');
}

switchNavItemsActive(0);
window.onscroll = function () {

  var top = document.body.scrollTop || document.documentElement.scrollTop;

  if (top > 80) {
    addCls(getElem('.header'), 'header_status_black');
    // setTimeout(() => {
    //   addCls(getElem('.header'), 'header_status_black');
    // }, 100);
    addCls(getElem('.outline'), 'outline_status_in');
  } else {
    delCls(getElem('.header'), 'header_status_black');
    delCls(getElem('.outline'), 'outline_status_in');

    switchNavItemsActive(0);
  }
  if (top > 800 * 0) {
    playScreenAnimateDone('.screen-1');
    setStyleLeft(navTip, 0 * 70);
  }
  if (top > 800 * 1 - 100) {
    playScreenAnimateDone('.screen-2');
    switchNavItemsActive(1);
    setStyleLeft(navTip, 1 * 70);
  }
  if (top > 800 * 2 - 100) {
    playScreenAnimateDone('.screen-3');
    switchNavItemsActive(2);
    setStyleLeft(navTip, 2 * 70);
  }
  if (top > 800 * 3 - 100) {
    playScreenAnimateDone('.screen-4');
    switchNavItemsActive(3);
    setStyleLeft(navTip, 3 * 70);
  }
  if (top > 800 * 4 - 100) {
    playScreenAnimateDone('.screen-5');
    switchNavItemsActive(4);
    setStyleLeft(navTip, 4 * 70);
  }
}

// 第三步：导航条和大纲的双向定位
var setNavJump = function (i, lib) {
  var item = lib[i];
  item.onclick = function () {
    setStyleLeft(navTip, i * 70);
    document.documentElement.scrollTop = i * 800;
  }
}

for (var i = 0; i < navItems.length; i++) {
  setNavJump(i, navItems);
}
for (var i = 0; i < outlineItems.length; i++) {
  setNavJump(i, outlineItems);
}

// 第四步：滑动门特效
var navTip = getElem('.header__nav-tip');
var setTip = function (idx, lib) {
  lib[idx].onmouseover = function () {
    setStyleLeft(navTip, idx * 70);
  }

  var activeIdx = 0;

  lib[idx].onmouseout = function () {
    for (var i = 0; i < lib.length; i++) {
      console.log(lib[i].classList.contains('header__nav-item_status_active'));
      if (chkCls(lib[i], 'header__nav-item_status_active')) {
        activeIdx = i;
        break;
      }
    }
    setStyleLeft(navTip, activeIdx * 70);
  }
}

for (var i = 0; i < navItems.length; i++) {
  setTip(i, navItems);
}
