import 'skatejs-web-components';
import { define, vdom,h,prop } from 'skatejs';
import * as skate from 'skatejs';

import tabbarstyles from '../sass/mui/tabbar.scss';

import * as muitabs from '../js/tabs.js';

export class TabBar extends skate.Component{
    
    static get props(){
	return {
	    tabs:prop.array({attribute:true}),
	    active:prop.number({attribute:true}),
	    justified:prop.boolean({attribute:true})
	};
    }
    
    renderCallback() {
	if (!this.active){
	    this.active=0;
	}

	let lis=this.tabs.map((tab,i)=>{
	    let paneid = (typeof(tab) == "string")?"pane-"+i:tab.paneid;
	    let label = (typeof(tab) == "string")?tab:tab.label;
	    let inner = <a data-mui-toggle="tab" data-mui-controls={paneid}>{label}</a>;
	    
	    let act= (i==this.active)?<li class="mui--is-active">{inner}</li>:<li>{inner}</li>;
	    return act;
	});

	var ulClasses=this.justified?"mui-tabs__bar mui-tabs__bar--justified":"mui-tabs__bar";
	return [<style>{tabbarstyles}</style>,
		<ul class={ulClasses}>{lis}</ul>];
    }

    renderedCallback(){
	muitabs.initListeners(this.shadowRoot);
	let tabsEl=this.shadowRoot.querySelector("ul");
	tabsEl.addEventListener("mui.tabs.showstart",(ev)=>{
//	    console.log(ev);
	    let evv=new Event("paneChange",{bubbles: true, composed: true});
	    evv.prevPaneId=ev.relatedPaneId;
	    evv.currPaneId=ev.paneId;
	    tabsEl.dispatchEvent(evv);
	});
    }
}

customElements.define('tab-bar',TabBar);
