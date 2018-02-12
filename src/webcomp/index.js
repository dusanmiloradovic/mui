//import 'skatejs-web-components';
import { define, vdom,h,prop } from 'skatejs';
import * as skate from 'skatejs';

import robotofont from 'roboto_fontface';

import tabbarstyles from '../sass/mui/tabbar.scss';
import appbarstyles from '../sass/mui/appbar.scss';
import buttonstyles from '../sass/mui/button.scss';
import containerstyles from '../sass/mui/containers.scss';
import dividerstyles from '../sass/mui/dividers.scss';
import dropdownstyles from '../sass/mui/dropdown.scss';
import fieldstyles from '../sass/mui/field.scss';
import checkboxradiostyles from '../sass/mui/checkboxandradio.scss';
import selectstyles from '../sass/mui/select.scss';
import overlaystyles from '../sass/mui/overlay.scss';
import panelstyles from '../sass/mui/panel.scss';
import textstyles from '../sass/mui/text.scss';


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
	if (!this.listenInitialized){
	    this.listenInitialized=true;

	    tabsEl.addEventListener("mui.tabs.showend",(ev)=>{
		
		for (var j=0;j<tabsEl.children.length;j++){
		    if (tabsEl.children[j].classList.contains("mui--is-active")){
			this.active=j;
			break;
		    }
		    
		}
			let evv=new Event("paneChange",{bubbles: true, composed: true});
		evv.prevPaneId=ev.relatedPaneId;
		evv.currPaneId=ev.paneId;
		evv.currTabIndex = 
		tabsEl.dispatchEvent(evv);

	    });
	}
    }

    static get is(){
	return 'tab-bar';
    }
}

export class AppBar extends skate.Component{
    renderCallback(){
	return [<style>{appbarstyles}</style>,<div class="mui-appbar"><slot/></div>];
    }

    static get is(){
	return 'app-bar';
    }
}

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

    static get is(){
	return 'mui-button';
    }
}

export class MuiContainer extends skate.Component{
    
    static get props(){
	return {
	    fluid:prop.boolean({attribute:true})
	};
    }

    renderCallback(){

	return [<style>{containerstyles}</style>,<div class={this.fluid?"mui-container-fluid":"mui-container"}><slot/></div>];
    }

    //There is no way to add the font-face to the shadow root(not implemented in webkit - https://bugs.chromium.org/p/chromium/issues/detail?id=336876), so we will attach it to the html head directly

    renderedCallback(){
	var stEl = document.createElement("style");
	stEl.innerHTML=robotofont+" body{font-family:'Roboto';}";
	document.head.append(stEl);
    }

    static get is(){
	return 'mui-container';
    }
    
}

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

    static get is(){
	return 'mui-divider';
    }
}

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
	    
	    if(!this.listenInitialized){
		this.listenInitialized=true;
		ul.addEventListener("mousedown",(ev)=>{
		    this.active=parseInt(ev.target.dataset.order);
		    let evv = new Event("selection",{bubbles:true, composed:true});
		    evv.selected=this.active;
		    ul.dispatchEvent(evv);
		});
	    }
	    
	},0);
    }

    static get is(){
	return 'mui-dropdown';
    }
}

export class MuiTextField extends skate.Component{

    static get props(){
	return {
	    placeholder:prop.string({attribute:true}),
	    fixed:prop.boolean({attribute:true}),
	    label:prop.string({attribute:true}),
	    textarea:prop.boolean({attribute:true}),
	    errorMessage:prop.string({attribute:true}),
	    disabled:prop.boolean({attribute:true}),
	    value:prop.string({attribute:true})
	};
    }

    renderCallback(){
	var fieldClass="mui-textfield";
	if (this.label && !this.fixed && !this.value) fieldClass+=" mui-textfield--float-label";
	let props = this.textarea?{}:{type:"text", value:this.value};
	if (this.disabled) props.disabled=true;
	var field=this.textarea?<textarea {...props}>{this.value}</textarea>:<input {...props}></input>;
	
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
	if (!this.listenInitialized){
	    this.listenInitialized=true;
	    inputField.addEventListener("change",(ev)=>{
		this.value=ev.target.value;
		let evv=new Event("change",{bubbles: true, composed: true});
		evv.value=this.value;
		this.shadowRoot.dispatchEvent(evv);
	    });
	}
	inputField.setCustomValidity(this.errorMessage);
    }

    static get is(){
	return 'mui-textfield';
    }
}

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
	if (!this.eventInitialized){
	    this.eventInitialized=true;
	    inputEl.addEventListener("change",(ev)=>{
		this.checked=ev.target.checked;
		let evv=new Event("change",{bubbles: true, composed: true});
		evv.checked=this.checked;
		this.shadowRoot.dispatchEvent(evv);
	    });
	}
    }

    static get is(){
	return 'mui-checkbox';
    }
}

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
	if (!this.listenerInitialized){
	    this.listenerInitialized=true;
	    el.addEventListener("change",(ev)=>{
		this.value=ev.target.value;
		let evv=new Event("change",{bubbles: true, composed: true});
		evv.value=this.value;
		this.shadowRoot.dispatchEvent(evv);
	    });
	}
    }

    static get is(){
	return 'mui-radiogroup';
    }
}

export class MuiSelect extends skate.Component{

    static get props(){
	return {
	    value:prop.string({attribute:true}),
	    label:prop.string({attribute:true}),
	    options:prop.array({attribute:true})
	};
    }

    renderCallback(){
	let lis = this.options.map((option)=>{
	    if (option.group){
		let innerOptions=option.groupoptions.map((o)=>{
		    let attrs={};
		    if (o == this.value)attrs.selected=true;
		    return <option {...attrs}>{o}</option>;
		});
		return <optgroup label={option.group}>{innerOptions}</optgroup>;
	    }else{
		let attrs={};
		if (option == this.value)attrs.selected=true;
		return <option {...attrs}>{option}</option>;
	    }
	});
	return [<style>{selectstyles}</style>,<div class="mui-select"><select>{lis}</select><label>{this.label}</label></div>];
    }

    renderedCallback(){
	var el=this.shadowRoot.querySelector("select");
	if (!this.listenerInitalized){
	    this.listenerInitalized=true;
	    el.addEventListener("change",(ev)=>{
		this.value=ev.target.value;
		let evv=new Event("change",{bubbles: true, composed: true});
		evv.value=this.value;
		this.shadowRoot.dispatchEvent(evv);
	    });
	}
	
	
	muiselect.initialize(el);
	
    }

    static get is(){
	return 'mui-select';
    }
}




export class MuiOverlay extends skate.Component{

    static get props(){
	return {
	    open:prop.boolean({attribute:true}),
	    animated:prop.boolean({attribute:true})
	};
    }

    renderCallback(){
	return [<style>{overlaystyles}</style>,<div id="mui-overlay"><slot/></div>];
    }

    attributeChangedCallback(name,oldValue,newValue){
	if (name == "open"){
	    if (newValue == "" && oldValue == null){
		document.body.style.overflow="hidden";
	    }else{
		document.body.style.overflow="";
	    }
	}
    }

    static get is(){
	return 'mui-overlay';
    }
}



export class MuiPanel extends skate.Component{

    renderCallback(){
	return [<style>{panelstyles}</style>,<div class="mui-panel"><slot/></div>];
    }

    static get is(){
	return 'mui-panel';
    }
}

export class MuiText extends skate.Component{

    static get props(){
	return{
	    textStyle:prop.string({attribute:true}),
	    textColor:prop.string({attribute:true})
	};
    }

    renderCallback(){
	let primClass="";
	if (this.textStyle) primClass="mui--text-"+this.textStyle;
	let secClass="";
	if (this.textColor) secClass="mui--text-"+this.textColor;
	let clz = primClass+" "+secClass;
	return [<style>{textstyles}</style>,<div class={clz}><slot/></div>];
    }

    static get is(){
	return 'mui-text';
    }
}

export class MuiRipple extends skate.Component{

    static get is(){
	return 'mui-ripple';
    }

    renderCallback(){
	return [<style>{buttonstyles}</style>,<div id="ripplecont"><slot/></div>];
    }

    renderedCallback(){
	ripple.initialize(this.shadowRoot.querySelector("#ripplecont"));
    }
}

export default function importAllComponents(){
    customElements.define(AppBar.is,AppBar);
    customElements.define(MuiContainer.is,MuiContainer);
    customElements.define(MuiButton.is,MuiButton);
    customElements.define(MuiDivider.is,MuiDivider);
    customElements.define(MuiDropdown.is, MuiDropdown);
    customElements.define(MuiTextField.is,MuiTextField);
    customElements.define(MuiCheckBox.is,MuiCheckBox);
    customElements.define(MuiRadioGroup.is, MuiRadioGroup);
    customElements.define(MuiSelect.is,MuiSelect);
    customElements.define(MuiOverlay.is,MuiOverlay);
    customElements.define(TabBar.is,TabBar);
    customElements.define(MuiPanel.is,MuiPanel);
    customElements.define(MuiText.is,MuiText);
    customElements.define(MuiRipple.is,MuiRipple);
}

window["importAllComponents"]=importAllComponents;
