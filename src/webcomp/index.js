import 'skatejs-web-components';
import { define, vdom,h,prop } from 'skatejs';
import * as skate from 'skatejs';

import tabbarstyles from '../sass/mui/tabbar.scss';
import appbarstyles from '../sass/mui/appbar.scss';
import buttonstyles from '../sass/mui/button.scss';
import containerstyles from '../sass/mui/containers.scss';

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

export class AppBar extends skate.Component{
    renderCallback(){
	return [<style>{appbarstyles}</style>,<div class="mui-appbar"><slot/></div>];
    }
}

customElements.define('app-bar',AppBar);

export class MuiButton extends skate.Component{

    static get props(){
	return {
	    primary:prop.boolean({attribute:true}),
	    danger:prop.boolean({attribute:true}),
	    accent:prop.boolean({attribute:true}),
	    disabled:prop.boolean({attribute:true}),
	    flat:prop.boolean({attribute:true}),
	    raised:prop.boolean({attribute:true}),
	    fab:prop.boolean({attribute:true}),
	    small:prop.boolean({attribute:true}),
	    large:prop.boolean({attribute:true})
	};
    }

    renderCallback(){
	var btnclasses="mui-btn"+((this.primary)?" mui-btn--primary":"")+(this.danger? " mui-btn--danger":"")+(this.accent?" mui-btn--accent":"")+(this.flat?" mui-btn--flat":"")+(this.raised?" mui-btn--raised":"")+(this.fab?" mui-btn--fab":"")+(this.small?" mui-btn--small":"")+(this.large?" mui-btn--large":"");

	var btn = this.disabled?<button class={btnclasses} disabled><slot/></button>:<button class={btnclasses}><slot/></button>;
	return [<style>{buttonstyles}</style>, this.disabled?<button class={btnclasses} disabled><slot/></button>:<button class={btnclasses}><slot/></button>];
    }
}

customElements.define('mui-button',MuiButton);


export class MuiContainer extends skate.Component{
    
    static get props(){
	return {
	    fluid:prop.boolean({attribute:true})
	};
    }

    renderCallback(){
	return [<style>{containerstyles}</style>,<div class={this.fluid?"mui-container-fluid":"mui-container"}><slot/></div>];
    }
}

customElements.define('mui-container',MuiContainer);
