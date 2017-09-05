import 'skatejs-web-components';
import { define, vdom,h,prop } from 'skatejs';
import * as skate from 'skatejs';

import tabbarstyles from '../sass/mui/tabbar.scss';
import appbarstyles from '../sass/mui/appbar.scss';
import buttonstyles from '../sass/mui/button.scss';
import containerstyles from '../sass/mui/containers.scss';
import dividerstyles from '../sass/mui/dividers.scss';
import dropdownstyles from '../sass/mui/dropdown.scss';
import fieldstyles from '../sass/mui/field.scss';
import checkboxradiostyles from '../sass/mui/checkboxandradio.scss';
import selectstyles from '../sass/mui/select.scss';

import * as muitabs from '../js/tabs.js';
import * as muidropdown from '../js/dropdown.js';
import * as ripple from '../js/ripple.js';
import * as muiselect from '../js/select.js';

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
	
	let lis = this.options.map((option,i)=><li><a href="#" data-order={i}>{option}</a></li>);
	let ul=<ul class={classn}>{lis}</ul>;
	return [<style>{dropdownstyles}</style>,<div class="mui-dropdown"><slot></slot>{ul}</div>];
	
    }

    renderedCallback(){
	
	setTimeout(()=>{
	    let button=this.shadowRoot.host.firstElementChild;
	    muidropdown.initialize(button);
	    let ul=this.shadowRoot.querySelector("ul");
	    ul.addEventListener("mousedown",(ev)=>{
		this.active=parseInt(ev.target.dataset.order);
		let evv = new Event("selection",{bubbles:true, composed:true});
		evv.selected=this.active;
		ul.dispatchEvent(evv);
	    });
	    
	},0);
    }


}

customElements.define('mui-dropdown', MuiDropdown);

export class MuiTextField extends skate.Component{

    static get props(){
	return {
	    placeholder:prop.string({attribute:true}),
	    fixed:prop.boolean({attribute:true}),
	    label:prop.string({attribute:true}),
	    textarea:prop.boolean({attribute:true}),
	    errorMessage:prop.string({attribute:true}),
	    value:prop.string({attribute:true})
	};
    }

    renderCallback(){
	var fieldClass="mui-textfield";
	if (this.label && !this.fixed && !this.value) fieldClass+=" mui-textfield--float-label";
	var field=this.textarea?<textarea>{this.value}</textarea>:<input type="text" value={this.value}></input>;
	
	if (this.label){
	    return [<style>{fieldstyles}</style>,
		    <div class={fieldClass}>
		{field}
		    <label>{this.label}</label><div class="mui-error">{this.errorMessage}</div></div>];
		
	}
	return [<style>{fieldstyles}</style>,
		<div class={fieldClass}>{field}<div class="mui-error">{this.errorMessage}</div></div>];
    }

    renderedCallback(){
	let inputField = this.shadowRoot.querySelector("input");
	if (!inputField) inputField=this.shadowRoot.querySelector("textarea");
	inputField.addEventListener("change",(ev)=>this.value=ev.target.value);
	inputField.setCustomValidity(this.errorMessage);
    }
}

customElements.define('mui-textfield',MuiTextField);

export class MuiCheckBox extends skate.Component{

    static get props(){
	return {
	    name:prop.string({attribute:true}),
	    disabled:prop.boolean({attribute:true}),
	    value:prop.string({attribute:true}),
	    label:prop.string({attribute:true}),
	    checked:prop.boolean({attribute:true})
	};
    }

    renderCallback(){
	let props={value:this.value,name:this.name};
	if (this.checked)props.checked=true;
	if (this.disabled)props.disabled=true;
	let field=<input type="checkbox" {...props}></input>;
	return [<style>{checkboxradiostyles}</style>,<div class="mui-checkbox"><label>{field}{this.label}</label></div>];
    }

    renderedCallback(){
	var inputEl = this.shadowRoot.querySelector("input");
	inputEl.addEventListener("change",(ev)=>this.checked=ev.target.checked);
    }
    
}

customElements.define('mui-checkbox',MuiCheckBox);


export class MuiRadioGroup extends skate.Component{

    static get props(){
	return{
	    options:prop.array({attribute:true}),
	    name:prop.string({attribute:true}),
	    value:prop.string({attribute:true})
	};
    }

    renderCallback(){
	if (!this.name){
	    this.name="radio-group-1";
	}
	//this is local in shadow dom, so it is ok to hardcode the value
	let lis = this.options.map((option,i)=>{
	    let attrs = {name:this.name, type:"radio",value:option.value};
	    if (option.disabled)attrs.disabled=true;
	    if (option.value == this.value) attrs.checked=true;
	    return <div class="mui-radio"><label><input {...attrs}/></label>{option.label}</div>;
	});
	return [<style>{checkboxradiostyles}</style>,<div id="radiogroup">{lis}</div>];
    }
    
    renderedCallback(){
	var el = this.shadowRoot.querySelector("#radiogroup");
	el.addEventListener("change",(ev)=>this.value=ev.target.value);
    }
}

customElements.define('mui-radiogroup', MuiRadioGroup);


export class MuiSelect extends skate.Component{

    static get props(){
	return {
	    value:prop.string({attribute:true}),
	    label:prop.string({attribte:true}),
	    options:prop.array({attribute:true})
	};
    }

    renderCallback(){
	let lis = this.options.map((option)=>{
	    if (option.optgroup){
		let innerOptions=option.optgroupoptions.map((o)=>{
		    let attrs={};
		    if (o == this.value)attrs.selected=true;
		    return <option {...attrs}>{o}</option>;
		});
		return <optgroup label={option.optgrouplabel}>{innerOptions}</optgroup>;
	    }else{
		let attrs={};
		if (option == this.value)attrs.selected=true;
		return <option {...attrs}>{option}</option>;
	    }
	});
	return [<style>{selectstyles}</style>,<div class="mui-select"><select>{lis}</select><label>{this.label}</label></div>];
    }

    renderedCallback(){
	var el=this.shadowRoot.querySelector(".mui-select");
	el.addEventListener("change",(ev)=>this.value=ev.target.value);
	muiselect.initialize(this.shadowRoot.querySelector("select"));
    }
}

customElements.define('mui-select',MuiSelect);
