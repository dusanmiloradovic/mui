import 'skatejs-web-components';
import { define, vdom,h,prop } from 'skatejs';
import * as skate from 'skatejs';

import tabbarstyles from '../sass/mui/tabbar.scss';
import appbarstyles from '../sass/mui/appbar.scss';
import buttonstyles from '../sass/mui/button.scss';
import containerstyles from '../sass/mui/containers.scss';
import dividerstyles from '../sass/mui/dividers.scss';
import dropdownstyles from '../sass/mui/dropdown.scss';

import * as muitabs from '../js/tabs.js';
import * as muidropdown from '../js/dropdown.js';
import * as ripple from '../js/ripple.js';

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

    renderedCallback(){
	ripple.initialize(this.shadowRoot.querySelector(".mui-btn"));
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

export class MuiDivider extends skate.Component{

    static get props(){
	return{
	    top:prop.boolean({attribute:true}),
	    bottom:prop.boolean({attribute:true}),
	    left:prop.boolean({attribute:true}),
	    right:prop.boolean({attribute:true})
	};
    }

    renderCallback(){
	let dividerClass="mui-divider";
	if (this.top) dividerClass="mui--divider-top";
	if (this.bottom) dividerClass="mui--divider-bottom";
	if (this.left) dividerClass="mui--divider-left";
	if (this.right) dividerClass="mui--divider-right";
	return[<style>{dividerstyles}</style>,<div class={dividerClass}><slot/></div>];
    }

}

customElements.define('mui-divider',MuiDivider);

export class MuiDropdown extends skate.Component{

    static get props(){
	return {
	    options:prop.array({attribute:true}),
	    active:prop.number({attribute:true}),
	    right:prop.boolean({attribute:true})
	};
    }

    renderCallback(){
	let classn = this.right?"mui-dropdown__menu mui-dropdown__menu--right":"mui-dropdown__menu";
	let lis = this.options.map((option,i)=><li><a href="#">{option}</a></li>);
	let ul=<ul class={classn}>{lis}</ul>;
	return [<style>{dropdownstyles}</style>,<div class="mui-dropdown"><slot></slot>{ul}</div>];
	
    }

    renderedCallback(){
	setTimeout(()=>{
	var button=this.shadowRoot.host.firstElementChild;
	    muidropdown.initialize(button);
	},0);
    }


}

customElements.define('mui-dropdown', MuiDropdown);
