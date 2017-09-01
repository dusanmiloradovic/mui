import { define, vdom,h,prop } from 'skatejs';
import * as skate from 'skatejs';

import tabbarstyles from '../src/sass/tabbar.scss';

import * as muitabs from '../js/tabs.js';

class TabBar extends skate.Component{
    renderCallback() {
	return [<style>{tabbarstyles}</style>,
		<ul class="mui-tabs__bar">
		<li class="mui--is-active"><a data-mui-toggle="tab" data-mui-controls="pane-default-1">Tab-1</a></li>
		<li><a data-mui-toggle="tab" data-mui-controls="pane-default-2">Tab-2</a></li>
		<li><a data-mui-toggle="tab" data-mui-controls="pane-default-3">Tab-3</a></li>
		</ul>];
	//	       ];

//	return 		<ul class="mui-tabs__bar">
//		<li class="mui--is-active"><a data-mui-toggle="tab" data-mui-controls="pane-default-1">Tab-1</a></li>
//		<li><a data-mui-toggle="tab" data-mui-controls="pane-default-2">Tab-2</a></li>
//		<li><a data-mui-toggle="tab" data-mui-controls="pane-default-3">Tab-3</a></li>
//	    </ul>;
    }
    renderedCallback(){
	muitabs.initListeners(this.shadowRoot);
    }
}

customElements.define('tab-bar',TabBar);
