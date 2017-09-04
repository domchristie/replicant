/**
 * @license
 * Copyright (c) 2014 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */
"undefined"==typeof WeakMap&&!function(){var t=Object.defineProperty,e=Date.now()%1e9,n=function(){this.name="__st"+(1e9*Math.random()>>>0)+(e++ +"__")};n.prototype={set:function(e,n){var r=e[this.name];return r&&r[0]===e?r[1]=n:t(e,this.name,{value:[e,n],writable:!0}),this},get:function(t){var e;return(e=t[this.name])&&e[0]===t?e[1]:void 0},"delete":function(t){var e=t[this.name];return e&&e[0]===t?(e[0]=e[1]=void 0,!0):!1},has:function(t){var e=t[this.name];return e?e[0]===t:!1}},window.WeakMap=n}(),function(t){function e(t){y.push(t),b||(b=!0,m(r))}function n(t){return window.ShadowDOMPolyfill&&window.ShadowDOMPolyfill.wrapIfNeeded(t)||t}function r(){b=!1;var t=y;y=[],t.sort(function(t,e){return t.uid_-e.uid_});var e=!1;t.forEach(function(t){var n=t.takeRecords();o(t),n.length&&(t.callback_(n,t),e=!0)}),e&&r()}function o(t){t.nodes_.forEach(function(e){var n=v.get(e);n&&n.forEach(function(e){e.observer===t&&e.removeTransientObservers()})})}function i(t,e){for(var n=t;n;n=n.parentNode){var r=v.get(n);if(r)for(var o=0;o<r.length;o++){var i=r[o],a=i.options;if(n===t||a.subtree){var u=e(a);u&&i.enqueue(u)}}}}function a(t){this.callback_=t,this.nodes_=[],this.records_=[],this.uid_=++E}function u(t,e){this.type=t,this.target=e,this.addedNodes=[],this.removedNodes=[],this.previousSibling=null,this.nextSibling=null,this.attributeName=null,this.attributeNamespace=null,this.oldValue=null}function s(t){var e=new u(t.type,t.target);return e.addedNodes=t.addedNodes.slice(),e.removedNodes=t.removedNodes.slice(),e.previousSibling=t.previousSibling,e.nextSibling=t.nextSibling,e.attributeName=t.attributeName,e.attributeNamespace=t.attributeNamespace,e.oldValue=t.oldValue,e}function c(t,e){return _=new u(t,e)}function d(t){return N?N:(N=s(_),N.oldValue=t,N)}function l(){_=N=void 0}function f(t){return t===N||t===_}function p(t,e){return t===e?t:N&&f(t)?N:null}function h(t,e,n){this.observer=t,this.target=e,this.options=n,this.transientObservedNodes=[]}var m,v=new WeakMap;if(/Trident|Edge/.test(navigator.userAgent))m=setTimeout;else if(window.setImmediate)m=window.setImmediate;else{var w=[],g=String(Math.random());window.addEventListener("message",function(t){if(t.data===g){var e=w;w=[],e.forEach(function(t){t()})}}),m=function(t){w.push(t),window.postMessage(g,"*")}}var b=!1,y=[],E=0;a.prototype={observe:function(t,e){if(t=n(t),!e.childList&&!e.attributes&&!e.characterData||e.attributeOldValue&&!e.attributes||e.attributeFilter&&e.attributeFilter.length&&!e.attributes||e.characterDataOldValue&&!e.characterData)throw new SyntaxError;var r=v.get(t);r||v.set(t,r=[]);for(var o,i=0;i<r.length;i++)if(r[i].observer===this){o=r[i],o.removeListeners(),o.options=e;break}o||(o=new h(this,t,e),r.push(o),this.nodes_.push(t)),o.addListeners()},disconnect:function(){this.nodes_.forEach(function(t){for(var e=v.get(t),n=0;n<e.length;n++){var r=e[n];if(r.observer===this){r.removeListeners(),e.splice(n,1);break}}},this),this.records_=[]},takeRecords:function(){var t=this.records_;return this.records_=[],t}};var _,N;h.prototype={enqueue:function(t){var n=this.observer.records_,r=n.length;if(n.length>0){var o=n[r-1],i=p(o,t);if(i)return void(n[r-1]=i)}else e(this.observer);n[r]=t},addListeners:function(){this.addListeners_(this.target)},addListeners_:function(t){var e=this.options;e.attributes&&t.addEventListener("DOMAttrModified",this,!0),e.characterData&&t.addEventListener("DOMCharacterDataModified",this,!0),e.childList&&t.addEventListener("DOMNodeInserted",this,!0),(e.childList||e.subtree)&&t.addEventListener("DOMNodeRemoved",this,!0)},removeListeners:function(){this.removeListeners_(this.target)},removeListeners_:function(t){var e=this.options;e.attributes&&t.removeEventListener("DOMAttrModified",this,!0),e.characterData&&t.removeEventListener("DOMCharacterDataModified",this,!0),e.childList&&t.removeEventListener("DOMNodeInserted",this,!0),(e.childList||e.subtree)&&t.removeEventListener("DOMNodeRemoved",this,!0)},addTransientObserver:function(t){if(t!==this.target){this.addListeners_(t),this.transientObservedNodes.push(t);var e=v.get(t);e||v.set(t,e=[]),e.push(this)}},removeTransientObservers:function(){var t=this.transientObservedNodes;this.transientObservedNodes=[],t.forEach(function(t){this.removeListeners_(t);for(var e=v.get(t),n=0;n<e.length;n++)if(e[n]===this){e.splice(n,1);break}},this)},handleEvent:function(t){switch(t.stopImmediatePropagation(),t.type){case"DOMAttrModified":var e=t.attrName,n=t.relatedNode.namespaceURI,r=t.target,o=new c("attributes",r);o.attributeName=e,o.attributeNamespace=n;var a=t.attrChange===MutationEvent.ADDITION?null:t.prevValue;i(r,function(t){return!t.attributes||t.attributeFilter&&t.attributeFilter.length&&-1===t.attributeFilter.indexOf(e)&&-1===t.attributeFilter.indexOf(n)?void 0:t.attributeOldValue?d(a):o});break;case"DOMCharacterDataModified":var r=t.target,o=c("characterData",r),a=t.prevValue;i(r,function(t){return t.characterData?t.characterDataOldValue?d(a):o:void 0});break;case"DOMNodeRemoved":this.addTransientObserver(t.target);case"DOMNodeInserted":var u,s,f=t.target;"DOMNodeInserted"===t.type?(u=[f],s=[]):(u=[],s=[f]);var p=f.previousSibling,h=f.nextSibling,o=c("childList",t.target.parentNode);o.addedNodes=u,o.removedNodes=s,o.previousSibling=p,o.nextSibling=h,i(t.relatedNode,function(t){return t.childList?o:void 0})}l()}},t.JsMutationObserver=a,t.MutationObserver||(t.MutationObserver=a)}(self),window.CustomElements=window.CustomElements||{flags:{}},function(t){var e=t.flags,n=[],r=function(t){n.push(t)},o=function(){n.forEach(function(e){e(t)})};t.addModule=r,t.initializeModules=o,t.hasNative=Boolean(document.registerElement),t.isIE=/Trident/.test(navigator.userAgent),t.useNative=!e.register&&t.hasNative&&!window.ShadowDOMPolyfill&&(!window.HTMLImports||window.HTMLImports.useNative)}(window.CustomElements),window.CustomElements.addModule(function(t){function e(t,e){n(t,function(t){return e(t)?!0:void r(t,e)}),r(t,e)}function n(t,e,r){var o=t.firstElementChild;if(!o)for(o=t.firstChild;o&&o.nodeType!==Node.ELEMENT_NODE;)o=o.nextSibling;for(;o;)e(o,r)!==!0&&n(o,e,r),o=o.nextElementSibling;return null}function r(t,n){for(var r=t.shadowRoot;r;)e(r,n),r=r.olderShadowRoot}function o(t,e){i(t,e,[])}function i(t,e,n){if(t=window.wrap(t),!(n.indexOf(t)>=0)){n.push(t);for(var r,o=t.querySelectorAll("link[rel="+a+"]"),u=0,s=o.length;s>u&&(r=o[u]);u++)r["import"]&&i(r["import"],e,n);e(t)}}var a=window.HTMLImports?window.HTMLImports.IMPORT_LINK_TYPE:"none";t.forDocumentTree=o,t.forSubtree=e}),window.CustomElements.addModule(function(t){function e(t,e){return n(t,e)||r(t,e)}function n(e,n){return t.upgrade(e,n)?!0:void(n&&a(e))}function r(t,e){b(t,function(t){return n(t,e)?!0:void 0})}function o(t){N.push(t),_||(_=!0,setTimeout(i))}function i(){_=!1;for(var t,e=N,n=0,r=e.length;r>n&&(t=e[n]);n++)t();N=[]}function a(t){E?o(function(){u(t)}):u(t)}function u(t){t.__upgraded__&&!t.__attached&&(t.__attached=!0,t.attachedCallback&&t.attachedCallback())}function s(t){c(t),b(t,function(t){c(t)})}function c(t){E?o(function(){d(t)}):d(t)}function d(t){t.__upgraded__&&t.__attached&&(t.__attached=!1,t.detachedCallback&&t.detachedCallback())}function l(t){for(var e=t,n=window.wrap(document);e;){if(e==n)return!0;e=e.parentNode||e.nodeType===Node.DOCUMENT_FRAGMENT_NODE&&e.host}}function f(t){if(t.shadowRoot&&!t.shadowRoot.__watched){g.dom&&console.log("watching shadow-root for: ",t.localName);for(var e=t.shadowRoot;e;)m(e),e=e.olderShadowRoot}}function p(t,n){if(g.dom){var r=n[0];if(r&&"childList"===r.type&&r.addedNodes&&r.addedNodes){for(var o=r.addedNodes[0];o&&o!==document&&!o.host;)o=o.parentNode;var i=o&&(o.URL||o._URL||o.host&&o.host.localName)||"";i=i.split("/?").shift().split("/").pop()}console.group("mutations (%d) [%s]",n.length,i||"")}var a=l(t);n.forEach(function(t){"childList"===t.type&&(L(t.addedNodes,function(t){t.localName&&e(t,a)}),L(t.removedNodes,function(t){t.localName&&s(t)}))}),g.dom&&console.groupEnd()}function h(t){for(t=window.wrap(t),t||(t=window.wrap(document));t.parentNode;)t=t.parentNode;var e=t.__observer;e&&(p(t,e.takeRecords()),i())}function m(t){if(!t.__observer){var e=new MutationObserver(p.bind(this,t));e.observe(t,{childList:!0,subtree:!0}),t.__observer=e}}function v(t){t=window.wrap(t),g.dom&&console.group("upgradeDocument: ",t.baseURI.split("/").pop());var n=t===window.wrap(document);e(t,n),m(t),g.dom&&console.groupEnd()}function w(t){y(t,v)}var g=t.flags,b=t.forSubtree,y=t.forDocumentTree,E=!window.MutationObserver||window.MutationObserver===window.JsMutationObserver;t.hasPolyfillMutations=E;var _=!1,N=[],L=Array.prototype.forEach.call.bind(Array.prototype.forEach),O=Element.prototype.createShadowRoot;O&&(Element.prototype.createShadowRoot=function(){var t=O.call(this);return window.CustomElements.watchShadow(this),t}),t.watchShadow=f,t.upgradeDocumentTree=w,t.upgradeDocument=v,t.upgradeSubtree=r,t.upgradeAll=e,t.attached=a,t.takeRecords=h}),window.CustomElements.addModule(function(t){function e(e,r){if(!e.__upgraded__&&e.nodeType===Node.ELEMENT_NODE){var o=e.getAttribute("is"),i=t.getRegisteredDefinition(e.localName)||t.getRegisteredDefinition(o);if(i&&(o&&i.tag==e.localName||!o&&!i["extends"]))return n(e,i,r)}}function n(e,n,o){return a.upgrade&&console.group("upgrade:",e.localName),n.is&&e.setAttribute("is",n.is),r(e,n),e.__upgraded__=!0,i(e),o&&t.attached(e),t.upgradeSubtree(e,o),a.upgrade&&console.groupEnd(),e}function r(t,e){Object.__proto__?t.__proto__=e.prototype:(o(t,e.prototype,e["native"]),t.__proto__=e.prototype)}function o(t,e,n){for(var r={},o=e;o!==n&&o!==HTMLElement.prototype;){for(var i,a=Object.getOwnPropertyNames(o),u=0;i=a[u];u++)r[i]||(Object.defineProperty(t,i,Object.getOwnPropertyDescriptor(o,i)),r[i]=1);o=Object.getPrototypeOf(o)}}function i(t){t.createdCallback&&t.createdCallback()}var a=t.flags;t.upgrade=e,t.upgradeWithDefinition=n,t.implementPrototype=r}),window.CustomElements.addModule(function(t){function e(e,r){var s=r||{};if(!e)throw new Error("document.registerElement: first argument `name` must not be empty");if(e.indexOf("-")<0)throw new Error("document.registerElement: first argument ('name') must contain a dash ('-'). Argument provided was '"+String(e)+"'.");if(o(e))throw new Error("Failed to execute 'registerElement' on 'Document': Registration failed for type '"+String(e)+"'. The type name is invalid.");if(c(e))throw new Error("DuplicateDefinitionError: a type with name '"+String(e)+"' is already registered");return s.prototype||(s.prototype=Object.create(HTMLElement.prototype)),s.__name=e.toLowerCase(),s.lifecycle=s.lifecycle||{},s.ancestry=i(s["extends"]),a(s),u(s),n(s.prototype),d(s.__name,s),s.ctor=l(s),s.ctor.prototype=s.prototype,s.prototype.constructor=s.ctor,t.ready&&w(document),s.ctor}function n(t){if(!t.setAttribute._polyfilled){var e=t.setAttribute;t.setAttribute=function(t,n){r.call(this,t,n,e)};var n=t.removeAttribute;t.removeAttribute=function(t){r.call(this,t,null,n)},t.setAttribute._polyfilled=!0}}function r(t,e,n){t=t.toLowerCase();var r=this.getAttribute(t);n.apply(this,arguments);var o=this.getAttribute(t);this.attributeChangedCallback&&o!==r&&this.attributeChangedCallback(t,r,o)}function o(t){for(var e=0;e<_.length;e++)if(t===_[e])return!0}function i(t){var e=c(t);return e?i(e["extends"]).concat([e]):[]}function a(t){for(var e,n=t["extends"],r=0;e=t.ancestry[r];r++)n=e.is&&e.tag;t.tag=n||t.__name,n&&(t.is=t.__name)}function u(t){if(!Object.__proto__){var e=HTMLElement.prototype;if(t.is){var n=document.createElement(t.tag);e=Object.getPrototypeOf(n)}for(var r,o=t.prototype,i=!1;o;)o==e&&(i=!0),r=Object.getPrototypeOf(o),r&&(o.__proto__=r),o=r;i||console.warn(t.tag+" prototype not found in prototype chain for "+t.is),t["native"]=e}}function s(t){return b(O(t.tag),t)}function c(t){return t?N[t.toLowerCase()]:void 0}function d(t,e){N[t]=e}function l(t){return function(){return s(t)}}function f(t,e,n){return t===L?p(e,n):M(t,e)}function p(t,e){t&&(t=t.toLowerCase()),e&&(e=e.toLowerCase());var n=c(e||t);if(n){if(t==n.tag&&e==n.is)return new n.ctor;if(!e&&!n.is)return new n.ctor}var r;return e?(r=p(t),r.setAttribute("is",e),r):(r=O(t),t.indexOf("-")>=0&&y(r,HTMLElement),r)}function h(t,e){var n=t[e];t[e]=function(){var t=n.apply(this,arguments);return g(t),t}}var m,v=t.isIE,w=t.upgradeDocumentTree,g=t.upgradeAll,b=t.upgradeWithDefinition,y=t.implementPrototype,E=t.useNative,_=["annotation-xml","color-profile","font-face","font-face-src","font-face-uri","font-face-format","font-face-name","missing-glyph"],N={},L="http://www.w3.org/1999/xhtml",O=document.createElement.bind(document),M=document.createElementNS.bind(document);m=Object.__proto__||E?function(t,e){return t instanceof e}:function(t,e){if(t instanceof e)return!0;for(var n=t;n;){if(n===e.prototype)return!0;n=n.__proto__}return!1},h(Node.prototype,"cloneNode"),h(document,"importNode"),v&&!function(){var t=document.importNode;document.importNode=function(){var e=t.apply(document,arguments);if(e.nodeType==e.DOCUMENT_FRAGMENT_NODE){var n=document.createDocumentFragment();return n.appendChild(e),n}return e}}(),document.registerElement=e,document.createElement=p,document.createElementNS=f,t.registry=N,t["instanceof"]=m,t.reservedTagList=_,t.getRegisteredDefinition=c,document.register=document.registerElement}),function(t){function e(){a(window.wrap(document)),window.CustomElements.ready=!0;var t=window.requestAnimationFrame||function(t){setTimeout(t,16)};t(function(){setTimeout(function(){window.CustomElements.readyTime=Date.now(),window.HTMLImports&&(window.CustomElements.elapsed=window.CustomElements.readyTime-window.HTMLImports.readyTime),document.dispatchEvent(new CustomEvent("WebComponentsReady",{bubbles:!0}))})})}var n=t.useNative,r=t.initializeModules,o=t.isIE;if(n){var i=function(){};t.watchShadow=i,t.upgrade=i,t.upgradeAll=i,t.upgradeDocumentTree=i,t.upgradeSubtree=i,t.takeRecords=i,t["instanceof"]=function(t,e){return t instanceof e}}else r();var a=t.upgradeDocumentTree,u=t.upgradeDocument;if(window.wrap||(window.ShadowDOMPolyfill?(window.wrap=window.ShadowDOMPolyfill.wrapIfNeeded,window.unwrap=window.ShadowDOMPolyfill.unwrapIfNeeded):window.wrap=window.unwrap=function(t){return t}),window.HTMLImports&&(window.HTMLImports.__importsParsingHook=function(t){t["import"]&&u(wrap(t["import"]))}),(!window.CustomEvent||o&&"function"!=typeof window.CustomEvent)&&(window.CustomEvent=function(t,e){e=e||{};var n=document.createEvent("CustomEvent");return n.initCustomEvent(t,Boolean(e.bubbles),Boolean(e.cancelable),e.detail),n.preventDefault=function(){Object.defineProperty(this,"defaultPrevented",{get:function(){return!0}})},n},window.CustomEvent.prototype=window.Event.prototype),"complete"===document.readyState||t.flags.eager)e();else if("interactive"!==document.readyState||window.attachEvent||window.HTMLImports&&!window.HTMLImports.ready){var s=window.HTMLImports&&!window.HTMLImports.ready?"HTMLImportsLoaded":"DOMContentLoaded";window.addEventListener(s,e)}else e()}(window.CustomElements),function(){}.call(this),function(){this.Replicant={}}.call(this),function(){Replicant.extendObject=function(t,e){var n,r;for(n in e)r=e[n],t[n]=r;return t}}.call(this),function(){var t,e;Replicant.registerElement=function(t,n){var r,o,i,a,u,s;return null==n&&(n={}),t=t.toLowerCase(),a=Replicant.extendObject({},n),o=null!=(s=a.defaultCSS)?s:"%t { display: block }",delete a.defaultCSS,e(o,t),i=Object.getPrototypeOf(document.createElement("div")),i.__super__=i,u=Object.create(i,a),r=document.registerElement(t,{prototype:u}),Object.defineProperty(u,"constructor",{value:r}),r},e=function(e,n){var r;return r=t(n),r.textContent=e.replace(/%t/g,n)},t=function(t){var e;return e=document.createElement("style"),e.setAttribute("type","text/css"),e.setAttribute("data-tag-name",t.toLowerCase()),document.head.insertBefore(e,document.head.firstChild),e}}.call(this),function(){Replicant.instrumentMethod=function(t,e,n){var r;return r=t[e],t[e]=function(){var t;return t=r.apply(this,arguments),n(),t}}}.call(this),function(){Replicant.triggerEvent=function(t,e,n){var r;return null==n&&(n={}),r=t.ownerDocument.createEvent("Events"),r.initEvent(e,!0,!0),Replicant.extendObject(r,n),t.dispatchEvent(r),r}}.call(this),function(){var t,e,n=function(t,e){return function(){return t.apply(e,arguments)}};t=Replicant.instrumentMethod,e=Replicant.triggerEvent,Replicant.FrameController=function(){function r(t){this.element=t,this.afterPopState=n(this.afterPopState,this),this.afterReplaceState=n(this.afterReplaceState,this),this.afterPushState=n(this.afterPushState,this),this.iframeElementLoaded=n(this.iframeElementLoaded,this)}var o;return r.prototype.elementAttached=function(){return this.attachIframeElement()},r.prototype.getIframeElement=function(){var t;return null!=this.iframeElement?this.iframeElement:this.iframeElement=(t=document.createElement("iframe"),t.addEventListener("load",this.iframeElementLoaded,!0),t.src="about:blank",t)},r.prototype.isLoading=function(){return!this.loaded},r.prototype.initialize=function(){return this.initialized?void 0:(this.triggerEvent("replicant-initialize"),this.initialized=!0)},r.prototype.completeLoad=function(){return this.triggerEvent("replicant-load")},r.prototype.completeNavigationWithAction=function(t){return this.triggerEvent("replicant-navigate",{action:t})},r.prototype.attachIframeElement=function(){return this.element.insertBefore(this.getIframeElement(),this.element.firstChild)},r.prototype.iframeElementLoaded=function(){return o(function(t){return function(){return t.instrumentHistoryMethods(),t.registerEventListeners(),t.initialize()?void 0:(t.completeNavigationWithAction("load"),t.completeLoad())}}(this))},r.prototype.instrumentHistoryMethods=function(){var e;return e=this.element.window.history.constructor.prototype,t(e,"pushState",this.afterPushState),t(e,"replaceState",this.afterReplaceState)},r.prototype.registerEventListeners=function(t){var e;return e=this.element.window.window,e.addEventListener("popstate",this.afterPopState,!0)},r.prototype.afterPushState=function(){return this.completeNavigationWithAction("push")},r.prototype.afterReplaceState=function(){return this.completeNavigationWithAction("replace")},r.prototype.afterPopState=function(){return this.completeNavigationWithAction("pop")},r.prototype.triggerEvent=function(t,n){return e(this.element,t,n)},o=function(t){return setTimeout(t,1)},r}()}.call(this),function(){Replicant.Session=function(){function t(t){this.element=t,this.navigating=!1}var e,n;return t.prototype.evaluate=function(t,n){return e(function(e){return function(){var r;return r=e.element.evaluate(t),"function"==typeof n?n(r):void 0}}(this))},t.prototype.goToLocation=function(t,e){return this.navigate(e,function(e){return function(){return e.element.location=t}}(this))},t.prototype.goBack=function(t){return this.navigate(t,function(t){return function(){return t.element.goBack()}}(this))},t.prototype.goForward=function(t){return this.navigate(t,function(t){return function(){return t.element.goForward()}}(this))},t.prototype.clickSelector=function(t,e){return this.navigate(e,function(e){return function(){return e.clickElement(e.querySelector(t))}}(this))},t.prototype.wait=function(t){return e(t)},t.prototype.waitForEvent=function(t,e){return n(this.element.window,t,e)},t.prototype.waitForNavigation=function(t){return this.navigate(t,function(){return!0})},t.prototype.navigate=function(t,r){if(this.navigating)throw new Error("Already navigating");return this.navigating=!0,n(this.element,"replicant-navigate",function(n){return function(r){return n.navigating=!1,e(function(){return"function"==typeof t?t({action:r.action,location:n.element.location}):void 0})}}(this)),e(r)},t.prototype.querySelector=function(t){var e;return function(){var n;if(null!=(e=null!=(n=this.element.document)?n.querySelector(t):void 0))return e;throw new Error("No element matching selector `"+t+"'")}.call(this)},t.prototype.clickElement=function(t){var e;return e=Replicant.triggerEvent(t,"click"),!e.defaultPrevented&&t.hasAttribute("href")?this.element.location=t.getAttribute("href"):void 0},n=function(t,e,n){var r;return t.addEventListener(e,r=function(o){return t.removeEventListener(e,r),"function"==typeof n?n(o):void 0})},e=function(t){return t?setTimeout(t,1):void 0},t}()}.call(this),function(){Replicant.Location=function(){function t(t){this.element=document.createElement("a"),this.element.href=null!=t?t.toString():void 0}var e,n,r,o;for(t.prototype.valueOf=function(){return this.href},t.prototype.toString=function(){return this.href},o=["href","protocol","host","hostname","port","pathname","search","hash","username","password"],t.createProperty=function(t){return Object.defineProperty(this.prototype,t,{get:function(){return this.element[t]},set:function(e){return this.element[t]=e}})},e=0,n=o.length;n>e;e++)r=o[e],t.createProperty(r);return t}()}.call(this),function(){Replicant.registerElement("replicant-frame",{defaultCSS:"%t {\n  position: relative;\n  display: block;\n  width: 320px;\n  height: 240px;\n  border: 1px solid windowframe;\n}\n\n%t > iframe {\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  margin: 0;\n  padding: 0;\n  border: none;\n}",createdCallback:{value:function(){return this.controller=new Replicant.FrameController(this)}},attachedCallback:{value:function(){return this.controller.elementAttached()}},iframeElement:{get:function(){return this.controller.getIframeElement()}},window:{get:function(){var t;return null!=(t=this.iframeElement)?t.contentWindow:void 0}},document:{get:function(){var t;return null!=(t=this.window)?t.document:void 0}},location:{get:function(){var t;return new Replicant.Location(null!=(t=this.window)?t.location:void 0)},set:function(t){var e;return t=t.toString(),"#"===t.charAt(0)&&(e=this.location,e.hash=t,t=e.toString()),this.iframeElement.src=t}},title:{get:function(){var t;return null!=(t=this.document)?t.title:void 0}},evaluate:{value:function(t){var e;return null!=(e=this.window)?e.eval(t):void 0}},goBack:{value:function(){var t;return null!=(t=this.window)?t.history.back():void 0}},goForward:{value:function(){var t;return null!=(t=this.window)?t.history.forward():void 0}},createSession:{value:function(){return new Replicant.Session(this)}}})}.call(this),function(){}.call(this);