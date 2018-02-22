import { props, withComponent } from 'skatejs';
import withPreact from '@skatejs/renderer-preact';
import { h } from 'preact';

import robotofont from 'roboto-fontface';

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

const Component = withComponent(withPreact());

export class TabBar extends Component{
    
    static get props(){
	return {
	    tabs:props.array,
	    active:props.number,
	    justified:props.boolean
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
	return <div><style>{tabbarstyles}</style>,
		<ul class={ulClasses}>{lis}</ul></div>;
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

export class AppBar extends Component{
    renderCallback(){
	return <div><style>{appbarstyles}</style>,<div class="mui-appbar"><slot/></div></div>;
    }

    static get is(){
	return 'app-bar';
    }
}

export class MuiButton extends Component{

    static get props(){
	return {
	    primary:props.boolean,
	    danger:props.boolean,
	    accent:props.boolean,
	    disabled:props.boolean,
	    flat:props.boolean,
	    raised:props.boolean,
	    fab:props.boolean,
	    small:props.boolean,
	    large:props.boolean
	};
    }

    renderCallback(){
	var btnclasses="mui-btn"+((this.primary)?" mui-btn--primary":"")+(this.danger? " mui-btn--danger":"")+(this.accent?" mui-btn--accent":"")+(this.flat?" mui-btn--flat":"")+(this.raised?" mui-btn--raised":"")+(this.fab?" mui-btn--fab":"")+(this.small?" mui-btn--small":"")+(this.large?" mui-btn--large":"");

	var btn = this.disabled?<button class={btnclasses} disabled><slot/></button>:<button class={btnclasses}><slot/></button>;
	return <div><style>{buttonstyles}</style>, this.disabled?<button class={btnclasses} disabled><slot/></button>:<button class={btnclasses}><slot/></button></div>;
    }

    renderedCallback(){
	ripple.initialize(this.shadowRoot.querySelector(".mui-btn"));
    }

    static get is(){
	return 'mui-button';
    }
}

export class MuiContainer extends Component{
    
    static get props(){
	return {
	    fluid:props.boolean
	};
    }

    renderCallback(){

	return <div><style>{containerstyles}</style>,<div class={this.fluid?"mui-container-fluid":"mui-container"}><slot/></div></div>;
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

export class MuiDivider extends Component{

    static get props(){
	return{
	    top:props.boolean,
	    bottom:props.boolean,
	    left:props.boolean,
	    right:props.boolean
	};
    }

    renderCallback(){
	let dividerClass="mui-divider";
	if (this.top) dividerClass="mui--divider-top";
	if (this.bottom) dividerClass="mui--divider-bottom";
	if (this.left) dividerClass="mui--divider-left";
	if (this.right) dividerClass="mui--divider-right";
	return <div><style>{dividerstyles}</style>,<div class={dividerClass}><slot/></div></div>;
    }

    static get is(){
	return 'mui-divider';
    }
}

export class MuiDropdown extends Component{

    static get props(){
	return {
	    options:props.array,
	    active:props.number,
	    right:props.boolean
	};
    }

    renderCallback(){
	let classn = this.right?"mui-dropdown__menu mui-dropdown__menu--right":"mui-dropdown__menu";
	
	let lis = this.options.map((option,i)=><li><a href="#" data-order={i}>{option}</a></li>);
	let ul=<ul class={classn}>{lis}</ul>;
	return <div><style>{dropdownstyles}</style>,<div class="mui-dropdown"><slot></slot>{ul}</div></div>;
	
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

export class MuiTextField extends Component{

    static get props(){
	return {
	    placeholder:props.string,
	    fixed:props.boolean,
	    label:props.string,
	    textarea:props.boolean,
	    errorMessage:props.string,
	    disabled:props.boolean,
	    value:props.string
	};
    }

    renderCallback(){
	var fieldClass="mui-textfield";
	if (this.label && !this.fixed && !this.value) fieldClass+=" mui-textfield--float-label";
	let props = this.textarea?{}:{type:"text", value:this.value};
	if (this.disabled) props.disabled=true;
	var field=this.textarea?<textarea {...props}>{this.value}</textarea>:<input {...props}></input>;
	
	if (this.label){
	    return <div><style>{fieldstyles}</style>,
		    <div class={fieldClass}>
		{field}
		    <label>{this.label}</label><div class="mui-error">{this.errorMessage}</div></div></div>;
		
	}
	return <div><style>{fieldstyles}</style>,
		<div class={fieldClass}>{field}<div class="mui-error">{this.errorMessage}</div></div></div>;
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

export class MuiCheckBox extends Component{

    static get props(){
	return {
	    name:props.string,
	    disabled:props.boolean,
	    value:props.string,
	    label:props.string,
	    checked:props.boolean
	};
    }

    renderCallback(){
	let props={value:this.value,name:this.name};
	if (this.checked)props.checked=true;
	if (this.disabled)props.disabled=true;
	let field=<input type="checkbox" {...props}></input>;
	return <div><style>{checkboxradiostyles}</style>,<div class="mui-checkbox"><label>{field}{this.label}</label></div></div>;
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

export class MuiRadioGroup extends Component{

    static get props(){
	return{
	    options:props.array,
	    name:props.string,
	    value:props.string
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
	return <div><style>{checkboxradiostyles}</style>,<div id="radiogroup">{lis}</div></div>;
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

export class MuiSelect extends Component{

    static get props(){
	return {
	    value:props.string,
	    label:props.string,
	    options:props.array
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
	return <div><style>{selectstyles}</style>,<div class="mui-select"><select>{lis}</select><label>{this.label}</label></div></div>;
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




export class MuiOverlay extends Component{

    static get props(){
	return {
	    open:props.boolean,
	    animated:props.boolean
	};
    }

    renderCallback(){
	return <div><style>{overlaystyles}</style>,<div id="mui-overlay"><slot/></div></div>;
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



export class MuiPanel extends Component{

    renderCallback(){
	return <div><style>{panelstyles}</style>,<div class="mui-panel"><slot/></div></div>;
    }

    static get is(){
	return 'mui-panel';
    }
}

export class MuiText extends Component{

    static get props(){
	return{
	    textStyle:props.string,
	    textColor:props.string
	};
    }

    renderCallback(){
	let primClass="";
	if (this.textStyle) primClass="mui--text-"+this.textStyle;
	let secClass="";
	if (this.textColor) secClass="mui--text-"+this.textColor;
	let clz = primClass+" "+secClass;
	return <div><style>{textstyles}</style>,<div class={clz}><slot/></div></div>;
    }

    static get is(){
	return 'mui-text';
    }
}

export class MuiRipple extends Component{

    static get is(){
	return 'mui-ripple';
    }

    renderCallback(){
	return <div><style>{buttonstyles}</style>,<div id="ripplecont"><slot/></div></div>;
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
