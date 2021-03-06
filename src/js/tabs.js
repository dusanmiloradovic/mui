/**
 * MUI CSS/JS tabs module
 * @module tabs
 */

'use strict';


var jqLite = require('./lib/jqLite'),
    util = require('./lib/util'),
    animationHelpers = require('./lib/animationHelpers'),
    attrKey = 'data-mui-toggle',
    attrSelector = '[' + attrKey + '="tab"]',
    controlsAttrKey = 'data-mui-controls',
    activeClass = 'mui--is-active',
    showstartKey = 'mui.tabs.showstart',
    showendKey = 'mui.tabs.showend',
    hidestartKey = 'mui.tabs.hidestart',
    hideendKey = 'mui.tabs.hideend';


/**
 * Initialize the toggle element
 * @param {Element} toggleEl - The toggle element.
 */
function initialize(toggleEl,rootEl) {
  // check flag
  if (toggleEl._muiTabs === true) return;
  else toggleEl._muiTabs = true;

  // attach click handler

  jqLite.on(toggleEl, 'click', function(ev){clickHandler.call(this,ev,rootEl);});
}


/**
 * Handle clicks on the toggle element.
 * @param {Event} ev - The DOM event.
 */
function clickHandler(ev, rootEl) {
  // only left clicks
  if (ev.button !== 0) return;

  var toggleEl = this;

  // exit if toggle element is disabled
  if (toggleEl.getAttribute('disabled') !== null) return;

  activateTab(toggleEl, rootEl);
}


/**
 * Activate the tab controlled by the toggle element.
 * @param {Element} toggleEl - The toggle element.
 * @param {Element} rootEl - Either document or shadow root of the web component
 */
function activateTab(currToggleEl,rootEl) {
/*
 * Web Components will typically have panes enclosed in some other component, and within the shadow dom , unable to reach from other component.
 * All the pane elements should be optional in that case. The check will be done for the rootEl - if it is a document, the old conditions will apply
 * 
 */
  
  var currTabEl = currToggleEl.parentNode,
      currPaneId = currToggleEl.getAttribute(controlsAttrKey),
      currPaneEl = rootEl.getElementById(currPaneId),
      prevTabEl,
      prevPaneEl,
      prevPaneId,
      prevToggleEl,
      currData,
      prevData,
      ev1,
      ev2,
      cssSelector;

  // exit if already active
  if (jqLite.hasClass(currTabEl, activeClass)) return;

  // raise error if pane doesn't exist
  if (!currPaneEl && rootEl === document) util.raiseError('Tab pane "' + currPaneId + '" not found');

  // get previous pane
  if (currPaneEl) {
    prevPaneEl = getActiveSibling(currPaneEl);
    prevPaneId = prevPaneEl.id;
  }

  prevPaneId=rootEl.querySelector("."+activeClass).firstElementChild.dataset.muiControls;
  currPaneId=currToggleEl.dataset.muiControls;
  // get previous toggle and tab elements
  cssSelector = '[' + controlsAttrKey + '="' + prevPaneId + '"]';
  prevToggleEl = rootEl.querySelectorAll(cssSelector)[0];
  prevTabEl = prevToggleEl.parentNode;

  // define event data
  currData = {paneId: currPaneId, relatedPaneId: prevPaneId};
  prevData = {paneId: prevPaneId, relatedPaneId: currPaneId};

  // dispatch 'hidestart', 'showstart' events
  ev1 = util.dispatchEvent(prevToggleEl, hidestartKey, true, true, prevData);
  ev2 = util.dispatchEvent(currToggleEl, showstartKey, true, true, currData);


  // let events bubble
  setTimeout(function() {
    // exit if either event was canceled
    if (ev1.defaultPrevented || ev2.defaultPrevented) return;

    // de-activate previous
    if (prevTabEl) jqLite.removeClass(prevTabEl, activeClass);
    if (prevPaneEl) jqLite.removeClass(prevPaneEl, activeClass);

    // activate current
    if(currTabEl) jqLite.addClass(currTabEl, activeClass);
    if(currPaneEl) jqLite.addClass(currPaneEl, activeClass);

    // dispatch 'hideend', 'showend' events
    util.dispatchEvent(prevToggleEl, hideendKey, true, false, prevData);
    util.dispatchEvent(currToggleEl, showendKey, true, false, currData);
  }, 0);
}



/** 
 * Get previous active sibling.
 * @param {Element} el - The anchor element.
 */
function getActiveSibling(el) {
  var elList = el.parentNode.children,
      q = elList.length,
      activeEl = null,
      tmpEl;

  while (q-- && !activeEl) {
    tmpEl = elList[q];
    if (tmpEl !== el && jqLite.hasClass(tmpEl, activeClass)) activeEl = tmpEl
  }

  return activeEl;
}


/** Define module API */
module.exports = {
  /** Initialize module listeners */
  initListeners: function(rootEl) {

    // markup elements available when method is called
    var _rootEl = rootEl?rootEl:document,
        elList = _rootEl.querySelectorAll(attrSelector),
        i = elList.length;
        
    while (i--) {initialize(elList[i],_rootEl);}
    
    animationHelpers.onAnimationStart('mui-tab-inserted', function(ev) {
      initialize(ev.target,_rootEl);
    });
  },
  
  /** External API */
  api: {
    activate: function(paneId,rootEl) {
      var cssSelector = '[' + controlsAttrKey + '=' + paneId + ']',
          toggleEl = document.querySelectorAll(cssSelector);

      if (!toggleEl.length) {
        util.raiseError('Tab control for pane "' + paneId + '" not found');
      }

      activateTab(toggleEl[0], rootEl);
    }
  }
};
