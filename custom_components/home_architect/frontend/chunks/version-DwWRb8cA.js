const Ut=globalThis,ce=Ut.ShadowRoot&&(Ut.ShadyCSS===void 0||Ut.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,de=Symbol(),$e=new WeakMap;let on=class{constructor(t,n,i){if(this._$cssResult$=!0,i!==de)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=n}get styleSheet(){let t=this.o;const n=this.t;if(ce&&t===void 0){const i=n!==void 0&&n.length===1;i&&(t=$e.get(n)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&$e.set(n,t))}return t}toString(){return this.cssText}};const qn=e=>new on(typeof e=="string"?e:e+"",void 0,de),Hn=(e,...t)=>{const n=e.length===1?e[0]:t.reduce((i,s,r)=>i+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+e[r+1],e[0]);return new on(n,e,de)},Gn=(e,t)=>{if(ce)e.adoptedStyleSheets=t.map(n=>n instanceof CSSStyleSheet?n:n.styleSheet);else for(const n of t){const i=document.createElement("style"),s=Ut.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=n.cssText,e.appendChild(i)}},ve=ce?e=>e:e=>e instanceof CSSStyleSheet?(t=>{let n="";for(const i of t.cssRules)n+=i.cssText;return qn(n)})(e):e;const{is:Kn,defineProperty:Vn,getOwnPropertyDescriptor:Zn,getOwnPropertyNames:Jn,getOwnPropertySymbols:Qn,getPrototypeOf:ti}=Object,Gt=globalThis,Me=Gt.trustedTypes,ei=Me?Me.emptyScript:"",ni=Gt.reactiveElementPolyfillSupport,Et=(e,t)=>e,Xt={toAttribute(e,t){switch(t){case Boolean:e=e?ei:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let n=e;switch(t){case Boolean:n=e!==null;break;case Number:n=e===null?null:Number(e);break;case Object:case Array:try{n=JSON.parse(e)}catch{n=null}}return n}},he=(e,t)=>!Kn(e,t),_e={attribute:!0,type:String,converter:Xt,reflect:!1,useDefault:!1,hasChanged:he};Symbol.metadata??=Symbol("metadata"),Gt.litPropertyMetadata??=new WeakMap;let ht=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,n=_e){if(n.state&&(n.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((n=Object.create(n)).wrapped=!0),this.elementProperties.set(t,n),!n.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,n);s!==void 0&&Vn(this.prototype,t,s)}}static getPropertyDescriptor(t,n,i){const{get:s,set:r}=Zn(this.prototype,t)??{get(){return this[n]},set(o){this[n]=o}};return{get:s,set(o){const a=s?.call(this);r?.call(this,o),this.requestUpdate(t,a,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??_e}static _$Ei(){if(this.hasOwnProperty(Et("elementProperties")))return;const t=ti(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(Et("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(Et("properties"))){const n=this.properties,i=[...Jn(n),...Qn(n)];for(const s of i)this.createProperty(s,n[s])}const t=this[Symbol.metadata];if(t!==null){const n=litPropertyMetadata.get(t);if(n!==void 0)for(const[i,s]of n)this.elementProperties.set(i,s)}this._$Eh=new Map;for(const[n,i]of this.elementProperties){const s=this._$Eu(n,i);s!==void 0&&this._$Eh.set(s,n)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const n=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const s of i)n.unshift(ve(s))}else t!==void 0&&n.push(ve(t));return n}static _$Eu(t,n){const i=n.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,n=this.constructor.elementProperties;for(const i of n.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Gn(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,n,i){this._$AK(t,i)}_$ET(t,n){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(s!==void 0&&i.reflect===!0){const r=(i.converter?.toAttribute!==void 0?i.converter:Xt).toAttribute(n,i.type);this._$Em=t,r==null?this.removeAttribute(s):this.setAttribute(s,r),this._$Em=null}}_$AK(t,n){const i=this.constructor,s=i._$Eh.get(t);if(s!==void 0&&this._$Em!==s){const r=i.getPropertyOptions(s),o=typeof r.converter=="function"?{fromAttribute:r.converter}:r.converter?.fromAttribute!==void 0?r.converter:Xt;this._$Em=s;const a=o.fromAttribute(n,r.type);this[s]=a??this._$Ej?.get(s)??a,this._$Em=null}}requestUpdate(t,n,i,s=!1,r){if(t!==void 0){const o=this.constructor;if(s===!1&&(r=this[t]),i??=o.getPropertyOptions(t),!((i.hasChanged??he)(r,n)||i.useDefault&&i.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,i))))return;this.C(t,n,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,n,{useDefault:i,reflect:s,wrapped:r},o){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??n??this[t]),r!==!0||o!==void 0)||(this._$AL.has(t)||(this.hasUpdated||i||(n=void 0),this._$AL.set(t,n)),s===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(n){Promise.reject(n)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[s,r]of this._$Ep)this[s]=r;this._$Ep=void 0}const i=this.constructor.elementProperties;if(i.size>0)for(const[s,r]of i){const{wrapped:o}=r,a=this[s];o!==!0||this._$AL.has(s)||a===void 0||this.C(s,void 0,r,a)}}let t=!1;const n=this._$AL;try{t=this.shouldUpdate(n),t?(this.willUpdate(n),this._$EO?.forEach(i=>i.hostUpdate?.()),this.update(n)):this._$EM()}catch(i){throw t=!1,this._$EM(),i}t&&this._$AE(n)}willUpdate(t){}_$AE(t){this._$EO?.forEach(n=>n.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(n=>this._$ET(n,this[n])),this._$EM()}updated(t){}firstUpdated(t){}};ht.elementStyles=[],ht.shadowRootOptions={mode:"open"},ht[Et("elementProperties")]=new Map,ht[Et("finalized")]=new Map,ni?.({ReactiveElement:ht}),(Gt.reactiveElementVersions??=[]).push("2.1.2");const ue=globalThis,Se=e=>e,Bt=ue.trustedTypes,Ie=Bt?Bt.createPolicy("lit-html",{createHTML:e=>e}):void 0,an="$lit$",J=`lit$${Math.random().toFixed(9).slice(2)}$`,ln="?"+J,ii=`<${ln}>`,lt=document,Pt=()=>lt.createComment(""),Tt=e=>e===null||typeof e!="object"&&typeof e!="function",pe=Array.isArray,si=e=>pe(e)||typeof e?.[Symbol.iterator]=="function",ee=`[ 	
\f\r]`,Mt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ee=/-->/g,ke=/>/g,rt=RegExp(`>|${ee}(?:([^\\s"'>=/]+)(${ee}*=${ee}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ae=/'/g,Pe=/"/g,cn=/^(?:script|style|textarea|title)$/i,dn=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),Dt=dn(1),M=dn(2),ft=Symbol.for("lit-noChange"),F=Symbol.for("lit-nothing"),Te=new WeakMap,at=lt.createTreeWalker(lt,129);function hn(e,t){if(!pe(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return Ie!==void 0?Ie.createHTML(t):t}const ri=(e,t)=>{const n=e.length-1,i=[];let s,r=t===2?"<svg>":t===3?"<math>":"",o=Mt;for(let a=0;a<n;a++){const l=e[a];let d,c,h=-1,f=0;for(;f<l.length&&(o.lastIndex=f,c=o.exec(l),c!==null);)f=o.lastIndex,o===Mt?c[1]==="!--"?o=Ee:c[1]!==void 0?o=ke:c[2]!==void 0?(cn.test(c[2])&&(s=RegExp("</"+c[2],"g")),o=rt):c[3]!==void 0&&(o=rt):o===rt?c[0]===">"?(o=s??Mt,h=-1):c[1]===void 0?h=-2:(h=o.lastIndex-c[2].length,d=c[1],o=c[3]===void 0?rt:c[3]==='"'?Pe:Ae):o===Pe||o===Ae?o=rt:o===Ee||o===ke?o=Mt:(o=rt,s=void 0);const u=o===rt&&e[a+1].startsWith("/>")?" ":"";r+=o===Mt?l+ii:h>=0?(i.push(d),l.slice(0,h)+an+l.slice(h)+J+u):l+J+(h===-2?a:u)}return[hn(e,r+(e[n]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),i]};class Ct{constructor({strings:t,_$litType$:n},i){let s;this.parts=[];let r=0,o=0;const a=t.length-1,l=this.parts,[d,c]=ri(t,n);if(this.el=Ct.createElement(d,i),at.currentNode=this.el.content,n===2||n===3){const h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(s=at.nextNode())!==null&&l.length<a;){if(s.nodeType===1){if(s.hasAttributes())for(const h of s.getAttributeNames())if(h.endsWith(an)){const f=c[o++],u=s.getAttribute(h).split(J),p=/([.?@])?(.*)/.exec(f);l.push({type:1,index:r,name:p[2],strings:u,ctor:p[1]==="."?ai:p[1]==="?"?li:p[1]==="@"?ci:Kt}),s.removeAttribute(h)}else h.startsWith(J)&&(l.push({type:6,index:r}),s.removeAttribute(h));if(cn.test(s.tagName)){const h=s.textContent.split(J),f=h.length-1;if(f>0){s.textContent=Bt?Bt.emptyScript:"";for(let u=0;u<f;u++)s.append(h[u],Pt()),at.nextNode(),l.push({type:2,index:++r});s.append(h[f],Pt())}}}else if(s.nodeType===8)if(s.data===ln)l.push({type:2,index:r});else{let h=-1;for(;(h=s.data.indexOf(J,h+1))!==-1;)l.push({type:7,index:r}),h+=J.length-1}r++}}static createElement(t,n){const i=lt.createElement("template");return i.innerHTML=t,i}}function gt(e,t,n=e,i){if(t===ft)return t;let s=i!==void 0?n._$Co?.[i]:n._$Cl;const r=Tt(t)?void 0:t._$litDirective$;return s?.constructor!==r&&(s?._$AO?.(!1),r===void 0?s=void 0:(s=new r(e),s._$AT(e,n,i)),i!==void 0?(n._$Co??=[])[i]=s:n._$Cl=s),s!==void 0&&(t=gt(e,s._$AS(e,t.values),s,i)),t}class oi{constructor(t,n){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=n}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:n},parts:i}=this._$AD,s=(t?.creationScope??lt).importNode(n,!0);at.currentNode=s;let r=at.nextNode(),o=0,a=0,l=i[0];for(;l!==void 0;){if(o===l.index){let d;l.type===2?d=new wt(r,r.nextSibling,this,t):l.type===1?d=new l.ctor(r,l.name,l.strings,this,t):l.type===6&&(d=new di(r,this,t)),this._$AV.push(d),l=i[++a]}o!==l?.index&&(r=at.nextNode(),o++)}return at.currentNode=lt,s}p(t){let n=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,n),n+=i.strings.length-2):i._$AI(t[n])),n++}}class wt{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,n,i,s){this.type=2,this._$AH=F,this._$AN=void 0,this._$AA=t,this._$AB=n,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const n=this._$AM;return n!==void 0&&t?.nodeType===11&&(t=n.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,n=this){t=gt(this,t,n),Tt(t)?t===F||t==null||t===""?(this._$AH!==F&&this._$AR(),this._$AH=F):t!==this._$AH&&t!==ft&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):si(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==F&&Tt(this._$AH)?this._$AA.nextSibling.data=t:this.T(lt.createTextNode(t)),this._$AH=t}$(t){const{values:n,_$litType$:i}=t,s=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=Ct.createElement(hn(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(n);else{const r=new oi(s,this),o=r.u(this.options);r.p(n),this.T(o),this._$AH=r}}_$AC(t){let n=Te.get(t.strings);return n===void 0&&Te.set(t.strings,n=new Ct(t)),n}k(t){pe(this._$AH)||(this._$AH=[],this._$AR());const n=this._$AH;let i,s=0;for(const r of t)s===n.length?n.push(i=new wt(this.O(Pt()),this.O(Pt()),this,this.options)):i=n[s],i._$AI(r),s++;s<n.length&&(this._$AR(i&&i._$AB.nextSibling,s),n.length=s)}_$AR(t=this._$AA.nextSibling,n){for(this._$AP?.(!1,!0,n);t!==this._$AB;){const i=Se(t).nextSibling;Se(t).remove(),t=i}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}}class Kt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,n,i,s,r){this.type=1,this._$AH=F,this._$AN=void 0,this.element=t,this.name=n,this._$AM=s,this.options=r,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=F}_$AI(t,n=this,i,s){const r=this.strings;let o=!1;if(r===void 0)t=gt(this,t,n,0),o=!Tt(t)||t!==this._$AH&&t!==ft,o&&(this._$AH=t);else{const a=t;let l,d;for(t=r[0],l=0;l<r.length-1;l++)d=gt(this,a[i+l],n,l),d===ft&&(d=this._$AH[l]),o||=!Tt(d)||d!==this._$AH[l],d===F?t=F:t!==F&&(t+=(d??"")+r[l+1]),this._$AH[l]=d}o&&!s&&this.j(t)}j(t){t===F?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class ai extends Kt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===F?void 0:t}}class li extends Kt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==F)}}class ci extends Kt{constructor(t,n,i,s,r){super(t,n,i,s,r),this.type=5}_$AI(t,n=this){if((t=gt(this,t,n,0)??F)===ft)return;const i=this._$AH,s=t===F&&i!==F||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,r=t!==F&&(i===F||s);s&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class di{constructor(t,n,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=n,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){gt(this,t)}}const dr={I:wt},hi=ue.litHtmlPolyfillSupport;hi?.(Ct,wt),(ue.litHtmlVersions??=[]).push("3.3.3");const ui=(e,t,n)=>{const i=n?.renderBefore??t;let s=i._$litPart$;if(s===void 0){const r=n?.renderBefore??null;i._$litPart$=s=new wt(t.insertBefore(Pt(),r),r,void 0,n??{})}return s._$AI(e),s};const fe=globalThis;class kt extends ht{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const n=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=ui(n,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return ft}}kt._$litElement$=!0,kt.finalized=!0,fe.litElementHydrateSupport?.({LitElement:kt});const pi=fe.litElementPolyfillSupport;pi?.({LitElement:kt});(fe.litElementVersions??=[]).push("4.2.2");const fi=e=>(t,n)=>{n!==void 0?n.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)};const gi={attribute:!0,type:String,converter:Xt,reflect:!1,hasChanged:he},mi=(e=gi,t,n)=>{const{kind:i,metadata:s}=n;let r=globalThis.litPropertyMetadata.get(s);if(r===void 0&&globalThis.litPropertyMetadata.set(s,r=new Map),i==="setter"&&((e=Object.create(e)).wrapped=!0),r.set(n.name,e),i==="accessor"){const{name:o}=n;return{set(a){const l=t.get.call(this);t.set.call(this,a),this.requestUpdate(o,l,e,!0,a)},init(a){return a!==void 0&&this.C(o,void 0,e,a),a}}}if(i==="setter"){const{name:o}=n;return function(a){const l=this[o];t.call(this,a),this.requestUpdate(o,l,e,!0,a)}}throw Error("Unsupported decorator location: "+i)};function U(e){return(t,n)=>typeof n=="object"?mi(e,t,n):((i,s,r)=>{const o=s.hasOwnProperty(r);return s.constructor.createProperty(r,i),o?Object.getOwnPropertyDescriptor(s,r):void 0})(e,t,n)}function C(e){return U({...e,state:!0,attribute:!1})}const yi=Hn`
  :host {
    display: block;
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    user-select: none;
    touch-action: none;
    background-color: var(--primary-background-color, #0f172a);
    font-family: var(--ha-font-family, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif);
  }

  .canvas-container {
    width: 100%;
    height: 100%;
    position: relative;
    cursor: crosshair;
    perspective: 1200px;
    transition: perspective 0.4s ease;
  }

  .canvas-container.panning {
    cursor: grab;
  }

  .canvas-container.is-panning {
    cursor: grabbing;
  }

  .canvas-container.is-orbiting {
    cursor: grab;
  }

  .canvas-container.is-orbiting:active {
    cursor: grabbing;
  }

  .canvas-container.dashboard-mode {
    cursor: default;
  }

  /* Mode 3D Isométrique */
  .viewport-3d-wrapper {
    width: 100%;
    height: 100%;
    transform-origin: center center;
    transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .viewport-3d-wrapper.mode-3d {
    transform: rotateX(55deg) rotateZ(-35deg);
    filter: drop-shadow(0 40px 50px rgba(0, 0, 0, 0.75));
  }

  svg.main-viewport {
    width: 100%;
    height: 100%;
    display: block;
    shape-rendering: geometricPrecision;
  }

  /* Grid styles */
  .grid-pattern line {
    stroke: rgba(255, 255, 255, 0.07);
    stroke-width: 0.5;
  }

  .grid-pattern-major line {
    stroke: rgba(255, 255, 255, 0.16);
    stroke-width: 1;
  }

  /* Background Image Layer */
  .background-image-layer {
    pointer-events: none;
    transition: opacity 0.2s ease;
  }

  /* Room Floor Polygons */
  .room-polygon {
    stroke: rgba(56, 189, 248, 0.4);
    stroke-width: 1.5;
    transition: fill 0.3s ease, stroke 0.3s ease;
    cursor: pointer;
  }

  .room-polygon.illuminated {
    fill: rgba(250, 204, 21, 0.24) !important;
    stroke: rgba(250, 204, 21, 0.7) !important;
    filter: drop-shadow(0 0 15px rgba(250, 204, 21, 0.4));
  }

  .room-polygon:hover {
    stroke: #38bdf8;
    filter: drop-shadow(0 0 8px rgba(56, 189, 248, 0.3));
  }

  .room-label-group {
    pointer-events: none;
  }

  .room-label-name {
    fill: #f8fafc;
    font-size: 13px;
    font-weight: 700;
    text-anchor: middle;
    filter: drop-shadow(0 1px 3px rgba(0,0,0,0.8));
  }

  .room-label-area {
    fill: #38bdf8;
    font-size: 11px;
    font-weight: 600;
    text-anchor: middle;
    font-family: ui-monospace, SFMono-Regular, monospace;
    filter: drop-shadow(0 1px 3px rgba(0,0,0,0.8));
  }

  .room-label-height {
    fill: #a5f3fc;
    font-size: 10px;
    font-weight: 700;
    text-anchor: middle;
    font-family: ui-monospace, SFMono-Regular, monospace;
    filter: drop-shadow(0 1px 3px rgba(0,0,0,0.9));
  }

  /* Walls 2D */
  .wall-rect {
    fill: #334155;
    stroke: #64748b;
    stroke-width: 1;
    transition: fill 0.15s ease, stroke 0.15s ease;
  }

  .wall-rect:hover {
    fill: #475569;
    stroke: #38bdf8;
    cursor: pointer;
  }

  .wall-centerline {
    stroke: #94a3b8;
    stroke-width: 1;
    stroke-dasharray: 4, 4;
    opacity: 0.5;
  }

  /* Walls 3D Extrusion */
  .wall-3d-top {
    fill: #64748b;
    stroke: #94a3b8;
    stroke-width: 1;
  }

  .wall-3d-side-shaded {
    fill: #1e293b;
    stroke: #334155;
    stroke-width: 1;
  }

  .wall-3d-side-light {
    fill: #475569;
    stroke: #64748b;
    stroke-width: 1;
  }

  /* Wall cut-out mask for openings */
  .wall-cutout {
    fill: #0f172a;
    stroke: none;
  }

  /* Doors & Windows */
  .opening-door-leaf {
    stroke: #38bdf8;
    stroke-width: 2;
    stroke-linecap: round;
  }

  .opening-door-arc {
    fill: rgba(56, 189, 248, 0.08);
    stroke: #38bdf8;
    stroke-width: 1.2;
    stroke-dasharray: 3, 3;
  }

  .opening-window-frame {
    stroke: #94a3b8;
    stroke-width: 2.5;
  }

  .opening-window-glass {
    stroke: #38bdf8;
    stroke-width: 1.5;
  }

  .opening-preview {
    opacity: 0.85;
    filter: drop-shadow(0 0 6px #38bdf8);
    pointer-events: none;
  }

  /* Preview Wall */
  .preview-wall-rect {
    fill: rgba(56, 189, 248, 0.35);
    stroke: #38bdf8;
    stroke-width: 2;
    stroke-dasharray: 6, 4;
  }

  .preview-wall-line {
    stroke: #38bdf8;
    stroke-width: 2;
  }

  /* Calibration segment */
  .calibration-line {
    stroke: #f59e0b;
    stroke-width: 2.5;
    stroke-dasharray: 5, 4;
    filter: drop-shadow(0 0 8px rgba(245, 158, 11, 0.6));
  }

  .calibration-endpoint {
    fill: #f59e0b;
    stroke: #ffffff;
    stroke-width: 1.5;
  }

  /* Snapping & Guides */
  .snap-indicator {
    fill: none;
    stroke: #38bdf8;
    stroke-width: 2;
    filter: drop-shadow(0 0 6px #38bdf8);
    animation: pulseSnap 1.5s infinite alternate ease-in-out;
  }

  @keyframes pulseSnap {
    0% { transform: scale(0.85); opacity: 0.7; }
    100% { transform: scale(1.15); opacity: 1; }
  }

  .angle-guide-line {
    stroke: #06b6d4;
    stroke-width: 1.5;
    stroke-dasharray: 4, 4;
    opacity: 0.8;
  }

  /* Smart Guides orthogonaux */
  .smart-guide-line {
    stroke: #d946ef;
    stroke-width: 1.5;
    stroke-dasharray: 4, 3;
    opacity: 0.85;
    pointer-events: none;
    filter: drop-shadow(0 0 4px rgba(217, 70, 239, 0.6));
  }

  /* Cotation dynamique automatique des murs */
  .wall-dim-badge {
    pointer-events: none;
    user-select: none;
  }

  .wall-dim-badge rect {
    fill: rgba(15, 23, 42, 0.82);
    stroke: rgba(148, 163, 184, 0.35);
    stroke-width: 0.8;
    rx: 3;
  }

  .wall-dim-badge text {
    fill: #cbd5e1;
    font-size: 9.5px;
    font-weight: 700;
    text-anchor: middle;
    dominant-baseline: central;
    font-family: ui-monospace, SFMono-Regular, monospace;
  }

  /* Meubles & Sanitaires architecturaux */
  .furniture-group {
    cursor: grab;
    transition: filter 0.15s ease;
  }

  .furniture-group:active {
    cursor: grabbing;
  }

  .furniture-group:hover .furniture-symbol {
    stroke: #38bdf8;
    filter: drop-shadow(0 0 8px rgba(56, 189, 248, 0.5));
  }

  .furniture-group.selected .furniture-symbol {
    stroke: #06b6d4 !important;
    stroke-width: 2.2 !important;
    filter: drop-shadow(0 0 12px rgba(6, 182, 212, 0.8)) !important;
  }

  .furniture-rotate-handle {
    cursor: grab;
    transition: transform 0.15s ease, filter 0.15s ease;
  }

  .furniture-rotate-handle:hover circle {
    fill: #06b6d4 !important;
    stroke: #ffffff !important;
    filter: drop-shadow(0 0 8px #06b6d4);
  }

  .furniture-rotate-handle:active {
    cursor: grabbing;
  }

  .furniture-resize-handle {
    cursor: nwse-resize;
    transition: transform 0.15s ease, filter 0.15s ease;
  }

  .furniture-resize-handle:hover rect {
    fill: #06b6d4 !important;
    stroke: #ffffff !important;
    filter: drop-shadow(0 0 8px #06b6d4);
  }

  .furniture-resize-handle:active {
    cursor: nwse-resize;
  }

  /* Calque fantôme niveau inférieur (Onion Skinning) */
  .ghost-wall {
    stroke: rgba(148, 163, 184, 0.42);
    stroke-width: 2;
    stroke-dasharray: 5, 4;
    fill: none;
    pointer-events: none;
  }

  /* Animations Micro-domotique */
  .fan-spin {
    animation: spinFan 1.2s infinite linear;
    transform-origin: center;
    transform-box: fill-box;
  }

  @keyframes spinFan {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  .soundwave-pulse {
    fill: none;
    stroke: #a855f7;
    stroke-width: 1.8;
    animation: soundWave 1.4s infinite ease-out;
  }

  @keyframes soundWave {
    0% { r: 14px; opacity: 0.9; stroke: #38bdf8; }
    100% { r: 34px; opacity: 0; stroke: #a855f7; }
  }

  /* Dimension badges */
  .dimension-badge {
    pointer-events: none;
  }

  .dimension-badge rect {
    fill: rgba(15, 23, 42, 0.85);
    stroke: rgba(56, 189, 248, 0.6);
    stroke-width: 1;
    rx: 4;
    ry: 4;
  }

  .dimension-badge text {
    fill: #f8fafc;
    font-size: 11px;
    font-weight: 600;
    text-anchor: middle;
    dominant-baseline: central;
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  }

  /* ======================================= */
  /* ÉLÉMENTS SÉLECTIONNÉS & MULTI-SÉLECTION */
  /* ======================================= */

  .wall-element.selected .wall-rect {
    stroke: #06b6d4 !important;
    stroke-width: 2.5px !important;
    fill: rgba(6, 182, 212, 0.45) !important;
    filter: drop-shadow(0 0 10px rgba(6, 182, 212, 0.8));
  }

  .wall-element.selected .wall-centerline {
    stroke: #22d3ee !important;
    stroke-width: 2px !important;
    stroke-dasharray: none;
  }

  .wall-element-3d.selected .wall-3d-top {
    stroke: #06b6d4 !important;
    stroke-width: 2px !important;
    fill: #0e7490 !important;
    filter: drop-shadow(0 0 12px rgba(6, 182, 212, 0.9));
  }

  .wall-element-3d.selected .wall-3d-side-shaded,
  .wall-element-3d.selected .wall-3d-side-light {
    stroke: #06b6d4 !important;
    stroke-width: 1.5px !important;
    filter: drop-shadow(0 0 8px rgba(6, 182, 212, 0.6));
  }

  .opening-element.selected .opening-door-leaf,
  .opening-element.selected .opening-window-frame,
  .opening-element.selected .opening-window-glass {
    stroke: #06b6d4 !important;
    stroke-width: 3px !important;
    filter: drop-shadow(0 0 10px rgba(6, 182, 212, 0.9));
  }

  .opening-element.selected .wall-cutout {
    stroke: #06b6d4 !important;
    stroke-width: 2px !important;
  }

  .room-group.selected .room-polygon {
    stroke: #06b6d4 !important;
    stroke-width: 3px !important;
    stroke-dasharray: 6, 4;
    filter: drop-shadow(0 0 14px rgba(6, 182, 212, 0.7));
  }

  .entity-pin.selected .entity-pin-bg {
    stroke: #06b6d4 !important;
    stroke-width: 3px !important;
    filter: drop-shadow(0 0 14px rgba(6, 182, 212, 0.9));
  }

  .marquee-selection-box {
    fill: rgba(6, 182, 212, 0.15);
    stroke: #06b6d4;
    stroke-width: 1.5;
    stroke-dasharray: 4, 3;
    pointer-events: none;
  }

  /* ======================================= */
  /* ENTITY PINS & LIVE HOME ASSISTANT STATES */
  /* ======================================= */

  .entity-pin {
    cursor: grab;
  }

  .entity-pin:active {
    cursor: grabbing;
  }

  .entity-pin:hover .entity-pin-bg {
    stroke: #38bdf8;
    filter: drop-shadow(0 0 12px rgba(56, 189, 248, 0.8));
    r: 18px;
  }

  .entity-pin-bg {
    fill: rgba(30, 41, 59, 0.9);
    stroke: rgba(255, 255, 255, 0.2);
    stroke-width: 2;
    filter: drop-shadow(0 4px 8px rgba(0,0,0,0.5));
    transition: r 0.18s ease, stroke 0.18s ease, filter 0.18s ease;
  }

  .entity-pin.active-light .entity-pin-bg {
    fill: #0284c7;
    stroke: #facc15;
    filter: drop-shadow(0 0 16px rgba(250, 204, 21, 0.8));
  }

  .entity-pin.active-radar .entity-pin-bg {
    stroke: #ef4444;
    filter: drop-shadow(0 0 14px rgba(239, 68, 68, 0.7));
  }

  .radar-pulse-ring {
    fill: none;
    stroke: #ef4444;
    stroke-width: 2;
    animation: radarPulse 1.8s infinite ease-out;
  }

  @keyframes radarPulse {
    0% { r: 12px; opacity: 1; }
    100% { r: 38px; opacity: 0; }
  }

  .entity-pin-icon {
    font-size: 15px;
    text-anchor: middle;
    dominant-baseline: central;
    user-select: none;
  }

  .entity-pin-label {
    fill: #ffffff;
    font-size: 10px;
    font-weight: 700;
    text-anchor: middle;
    filter: drop-shadow(0 1px 3px rgba(0,0,0,0.9));
    pointer-events: none;
  }

  .entity-pin-state {
    font-size: 8.5px;
    font-weight: 600;
    text-anchor: middle;
    filter: drop-shadow(0 1px 3px rgba(0, 0, 0, 0.95));
    pointer-events: none;
    letter-spacing: 0.2px;
  }

  .entity-pin-state.state-on {
    fill: #34d399; /* Émeraude vif */
  }

  .entity-pin-state.state-off {
    fill: #94a3b8; /* Gris discret */
  }

  .entity-pin-state.state-alert {
    fill: #f87171; /* Rouge alerte */
  }

  .entity-pin-state.state-info {
    fill: #38bdf8; /* Bleu cyan */
  }

  .entity-pin-value-badge rect {
    fill: rgba(15, 23, 42, 0.9);
    stroke: #38bdf8;
    stroke-width: 1;
    rx: 4;
  }

  .entity-pin-value-badge text {
    fill: #38bdf8;
    font-size: 9px;
    font-weight: 700;
    text-anchor: middle;
    dominant-baseline: central;
    font-family: ui-monospace, SFMono-Regular, monospace;
  }

  /* Floating Overlay HUD */
  .canvas-hud {
    position: absolute;
    bottom: 20px;
    right: 20px;
    display: flex;
    gap: 8px;
    background: rgba(30, 41, 59, 0.85);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 12px;
    padding: 6px 10px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
    z-index: 50;
  }

  .hud-btn {
    background: rgba(51, 65, 85, 0.7);
    color: #f1f5f9;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    width: 34px;
    height: 34px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
    transition: all 0.2s ease;
  }

  .hud-btn:hover {
    background: #0284c7;
    border-color: #38bdf8;
    transform: translateY(-1px);
  }

  .hud-btn.active {
    background: #0284c7;
    border-color: #38bdf8;
    color: #ffffff;
  }

  .hud-zoom-label {
    display: flex;
    align-items: center;
    padding: 0 8px;
    font-size: 12px;
    font-weight: 600;
    color: #94a3b8;
    min-width: 48px;
    justify-content: center;
    font-family: ui-monospace, SFMono-Regular, monospace;
  }

  .hud-preset-group {
    display: flex;
    align-items: center;
    gap: 4px;
    padding-left: 6px;
    border-left: 1px solid rgba(255, 255, 255, 0.15);
  }

  .hud-preset-btn {
    background: rgba(15, 23, 42, 0.6);
    color: #cbd5e1;
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 6px;
    padding: 4px 7px;
    font-size: 11px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.15s ease;
  }

  .hud-preset-btn:hover {
    background: #0284c7;
    border-color: #38bdf8;
    color: #ffffff;
  }

  .hud-angle-badge {
    font-size: 10px;
    color: #38bdf8;
    font-family: ui-monospace, SFMono-Regular, monospace;
    padding: 0 4px;
    white-space: nowrap;
  }

  /* Walls 3D Realistic Shading */
  .wall-3d-top {
    fill: #f1f5f9;
    stroke: #94a3b8;
    stroke-width: 1.2;
    transition: fill 0.15s ease;
  }

  .wall-element-3d:hover .wall-3d-top {
    fill: #38bdf8;
    stroke: #0284c7;
  }

  .wall-element-3d.selected .wall-3d-top {
    fill: #06b6d4;
    stroke: #22d3ee;
    filter: drop-shadow(0 0 10px rgba(6, 182, 212, 0.6));
  }

  .wall-3d-side {
    stroke-width: 0.8;
    stroke-linejoin: round;
  }

  .coords-hud {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(15, 23, 42, 0.92);
    backdrop-filter: blur(14px);
    border: 1px solid rgba(56, 189, 248, 0.35);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5), 0 0 12px rgba(56, 189, 248, 0.2);
    border-radius: 10px;
    padding: 6px 16px;
    font-size: 11.5px;
    font-weight: 600;
    color: #cbd5e1;
    font-family: ui-monospace, SFMono-Regular, monospace;
    z-index: 50;
    pointer-events: none;
    white-space: nowrap;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: bottom 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .coords-hud.selection-active {
    bottom: 90px;
  }

  .help-hud {
    position: absolute;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(30, 41, 59, 0.9);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(56, 189, 248, 0.3);
    border-radius: 20px;
    padding: 6px 16px;
    font-size: 12px;
    font-weight: 500;
    color: #e2e8f0;
    z-index: 50;
    pointer-events: none;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  }
`,ne={vertex:12,guide:8,wall:10},Ce={vertex:.25,guide:.18,wall:.25},xi=45,bi=6,Yt=3,Fe=.3,wi=.05,$i=.02;function At(e,t){const n=Math.pow(10,t),i=Math.round(e*n)/n;return i===0?0:i}function Lt(e,t=Yt){return{x:At(e.x,t),y:At(e.y,t)}}function Re(e,t){return Math.abs(e.x-t.x)<.001&&Math.abs(e.y-t.y)<.001}function De(e,t){const n=(e.x-t.origin.x)*t.dir.x+(e.y-t.origin.y)*t.dir.y;return{x:t.origin.x+n*t.dir.x,y:t.origin.y+n*t.dir.y}}function vi(e,t){const n=e.dir.x*t.dir.y-e.dir.y*t.dir.x;if(Math.abs(n)<1e-9)return null;const i=t.origin.x-e.origin.x,s=t.origin.y-e.origin.y,r=(i*t.dir.y-s*t.dir.x)/n,o={x:e.origin.x+r*e.dir.x,y:e.origin.y+r*e.dir.y};for(const a of[e,t])if(a.kind==="angle"&&(o.x-a.origin.x)*a.dir.x+(o.y-a.origin.y)*a.dir.y<0)return null;return o}class A{static snapPoint(t,n,i=[],s,r={}){const o=typeof r=="number"?{}:r,a=this.resolveTolerances(r),l=new Set(o.excludeWallIds??[]),d=i.filter(w=>!l.has(w.id)),c=[...s?[s]:[],...o.excludePoints??[]],h=w=>c.some($=>Re($,w)),f=n.size>0?n.size:.5,u=[];if(n.snapToElements&&d.length>0){let w=null,$=a.vertex;for(const W of d)for(const L of[W.start,W.end]){if(h(L))continue;const K=this.distance(t,L);K<$&&($=K,w=L)}if(w)return{point:{x:w.x,y:w.y},snappedTo:"vertex",constraints:["vertex"]};const y=this.findWallLine(t,d,a,s);if(y){const W=y.wall,L={x:(W.start.x+W.end.x)/2,y:(W.start.y+W.end.y)/2};if(this.distance(De(t,y),L)<=a.vertex&&!h(L))return{point:Lt(L),snappedTo:"midpoint",constraints:["midpoint"],wallId:W.id};u.push(y)}let v,k,D=a.guide,Y=a.guide;for(const W of d)for(const L of[W.start,W.end]){if(h(L))continue;const K=Math.abs(t.x-L.x),vt=Math.abs(t.y-L.y);K<D&&!(s&&Math.abs(L.x-s.x)<.001)&&(D=K,v=L.x),vt<Y&&!(s&&Math.abs(L.y-s.y)<.001)&&(Y=vt,k=L.y)}const B=[];v!==void 0&&B.push({kind:"smart_guide",axis:"x",value:v,origin:{x:v,y:0},dir:{x:0,y:1},offset:D}),k!==void 0&&B.push({kind:"smart_guide",axis:"y",value:k,origin:{x:0,y:k},dir:{x:1,y:0},offset:Y}),B.sort((W,L)=>W.offset-L.offset),u.push(...B)}if(n.snapToAngles&&s){const w=this.findAngleLine(t,s,o);w&&u.push(w)}if(u.length===0)return n.snapToGrid?{point:Lt({x:this.quantize(t.x,f),y:this.quantize(t.y,f)}),snappedTo:"grid",constraints:["grid"]}:{point:{...t},snappedTo:"none",constraints:[]};const p=u[0];let m,g=null;for(const w of u.slice(1)){const $=vi(p,w);if(!(!$||s&&Re($,s))&&this.distance($,t)<=2*(p.offset+w.offset)+1e-9){m=w,g=$;break}}const x=[p.kind];m?x.push(m.kind):(g=De(t,p),n.snapToGrid&&(g=this.quantizeAlongLine(g,p,f),x.push("grid")));const b={point:Lt(g),snappedTo:p.kind,constraints:x};for(const w of m?[p,m]:[p])w.kind==="angle"&&(b.guideAngle=w.angle),w.kind==="wall"&&(b.wallId=w.wall?.id),w.kind==="smart_guide"&&(w.axis==="x"?b.smartGuideX=w.value:b.smartGuideY=w.value);return b}static snapPointToWall(t,n,i=.6,s={}){let r=null,o=1/0;for(const a of n){const l=a.end.x-a.start.x,d=a.end.y-a.start.y,c=Math.sqrt(l*l+d*d);if(c===0)continue;const h=Math.max(0,Math.min(1,((t.x-a.start.x)*l+(t.y-a.start.y)*d)/(c*c))),f=a.start.x+h*l,u=a.start.y+h*d,p=Math.sqrt((t.x-f)**2+(t.y-u)**2),m=s.measureFromFace?i+(a.thickness||0)/2:i;p<=m&&p<o&&(o=p,r={wall:a,projectionPoint:{x:f,y:u},offset:h*c,distance:p,angleRad:Math.atan2(d,l)})}return r}static fitOpening(t,n,i,s={}){const r=this.wallLength(t),o=s.endMargin??wi,a=(s.walls??[]).filter(y=>y.id!==t.id),l=y=>a.reduce((v,k)=>this.distanceToSegment(y,k.start,k.end)<=$i?Math.max(v,(k.thickness||0)/2):v,0),d=Math.min(r,l(t.start)+o),c=Math.max(d,r-l(t.end)-o),h=c-d,f=Number.isFinite(i)&&i>0?i:Fe,u=Number.isFinite(n)?n:r/2,p=h+1e-9>=Fe,m=Math.min(f,Math.max(0,h)),g=m/2,x=p?Math.min(c-g,Math.max(d+g,u)):(d+c)/2,b=(s.openings??[]).filter(y=>y.wallId===t.id&&y.id!==s.ignoreOpeningId).filter(y=>Math.abs(y.offset-x)<(y.width+m)/2-.001).map(y=>y.id),w=At(x,Yt),$=At(m,Yt);return{offset:w,width:$,fits:p,adjusted:Math.abs(w-u)>.001||Math.abs($-f)>.001,overlaps:b,usableStart:d,usableEnd:c}}static metersFromPixels(t,n){return t/Math.max(n,1e-6)}static quantize(t,n){return n>0?At(Math.round(t/n)*n,6):t}static roundPoint(t,n=Yt){return Lt(t,n)}static wallLength(t){return this.distance(t.start,t.end)}static distance(t,n){const i=t.x-n.x,s=t.y-n.y;return Math.sqrt(i*i+s*s)}static roundMeters(t,n=2){const i=Math.pow(10,n);return Math.round(t*i)/i}static resolveTolerances(t){if(typeof t=="number")return{...Ce,vertex:t};const n=t.screenPixelsPerMeter;return n!==void 0&&Number.isFinite(n)&&n>0?{vertex:this.metersFromPixels(t.vertexTolerancePx??ne.vertex,n),guide:this.metersFromPixels(t.guideTolerancePx??ne.guide,n),wall:this.metersFromPixels(t.wallTolerancePx??ne.wall,n)}:{...Ce}}static findWallLine(t,n,i,s){let r=null,o=1/0;for(const a of n){const l=a.end.x-a.start.x,d=a.end.y-a.start.y,c=Math.hypot(l,d);if(c<1e-9||s&&this.distanceToSegment(s,a.start,a.end)<.001)continue;const h=l/c,f=d/c,u=(t.x-a.start.x)*h+(t.y-a.start.y)*f;if(u<=0||u>=c)continue;const p=Math.abs((t.x-a.start.x)*f-(t.y-a.start.y)*h),m=Math.max(0,p-(a.thickness||0)/2);m>i.wall||(m<o||m===o&&r&&p<r.offset)&&(o=m,r={kind:"wall",origin:a.start,dir:{x:h,y:f},offset:p,wall:a})}return r}static findAngleLine(t,n,i){const s=t.x-n.x,r=t.y-n.y;if(Math.hypot(s,r)<1e-6)return null;const a=i.angleStepDeg&&i.angleStepDeg>0?i.angleStepDeg:xi,l=i.angleToleranceDeg??bi;let d=Math.atan2(r,s)*180/Math.PI;d<0&&(d+=360);const c=Math.round(d/a)*a;if(Math.abs(d-c)>l)return null;const h=c*Math.PI/180,f={x:Math.cos(h),y:Math.sin(h)};Math.abs(f.x)<1e-12&&(f.x=0),Math.abs(f.y)<1e-12&&(f.y=0);const u=Math.abs(s*f.y-r*f.x);return{kind:"angle",angle:(c%360+360)%360,origin:n,dir:f,offset:u}}static quantizeAlongLine(t,n,i){if(n.kind==="smart_guide")return n.axis==="x"?{x:t.x,y:this.quantize(t.y,i)}:{x:this.quantize(t.x,i),y:t.y};if(n.kind==="angle"){const o=(t.x-n.origin.x)*n.dir.x+(t.y-n.origin.y)*n.dir.y,a=this.quantize(o,i),l=a>0?a:o;return{x:n.origin.x+l*n.dir.x,y:n.origin.y+l*n.dir.y}}const s=n.wall;let r;return Math.abs(n.dir.y)<1e-9?r=(this.quantize(t.x,i)-s.start.x)/n.dir.x:Math.abs(n.dir.x)<1e-9?r=(this.quantize(t.y,i)-s.start.y)/n.dir.y:r=this.quantize((t.x-s.start.x)*n.dir.x+(t.y-s.start.y)*n.dir.y,i),r=Math.max(0,Math.min(this.wallLength(s),r)),{x:s.start.x+r*n.dir.x,y:s.start.y+r*n.dir.y}}static distanceToSegment(t,n,i){const s=i.x-n.x,r=i.y-n.y,o=s*s+r*r;if(o===0)return this.distance(t,n);const a=Math.max(0,Math.min(1,((t.x-n.x)*s+(t.y-n.y)*r)/o));return this.distance(t,{x:n.x+a*s,y:n.y+a*r})}}const Le=1e-4,ie=.02,Oe=.01,Mi=.5,_i=5e3,Ot=new Map,Si=512;class Ii{constructor(){this.items=[]}get length(){return this.items.length}push(t){const n=this.items;n.push(t);let i=n.length-1;for(;i>0;){const s=i-1>>1;if(n[s].max>=n[i].max)break;[n[s],n[i]]=[n[i],n[s]],i=s}}pop(){const t=this.items,n=t[0],i=t.pop();if(t.length>0&&i){t[0]=i;let s=0;for(;;){const r=2*s+1,o=r+1;let a=s;if(r<t.length&&t[r].max>t[a].max&&(a=r),o<t.length&&t[o].max>t[a].max&&(a=o),a===s)break;[t[a],t[s]]=[t[s],t[a]],s=a}}return n}}function V(e,t,n,i){return e*i-t*n}function je(e,t,n){const i=n.x-t.x,s=n.y-t.y,r=i*i+s*s;if(r===0)return Math.hypot(e.x-t.x,e.y-t.y);const o=Math.max(0,Math.min(1,((e.x-t.x)*i+(e.y-t.y)*s)/r));return Math.hypot(e.x-(t.x+o*i),e.y-(t.y+o*s))}function We(e){const t=[];for(const n of e){const i=t[t.length-1];(!i||Math.hypot(n.x-i.x,n.y-i.y)>1e-9)&&t.push(n)}for(;t.length>1&&Math.hypot(t[0].x-t[t.length-1].x,t[0].y-t[t.length-1].y)<=1e-9;)t.pop();return t}function Ei(e,t,n,i){const s=t.x-e.x,r=t.y-e.y,o=i.x-n.x,a=i.y-n.y,l=V(s,r,o,a),d=n.x-e.x,c=n.y-e.y;if(Math.abs(l)<1e-12){if(Math.abs(V(d,c,s,r))>1e-9)return null;const p=s*s+r*r;if(p===0)return null;const m=(d*s+c*r)/p,g=m+(o*s+a*r)/p,x=Math.max(0,Math.min(m,g)),b=Math.min(1,Math.max(m,g));return x>b+1e-9?null:{x:e.x+x*s,y:e.y+x*r}}const f=V(d,c,o,a)/l,u=V(d,c,s,r)/l;return f<-1e-9||f>1+1e-9||u<-1e-9||u>1+1e-9?null:{x:e.x+f*s,y:e.y+f*r}}function ki(e){return Math.round(e*100)/100}class H{static isPointInPolygon(t,n){if(!n||n.length<3)return!1;let i=!1;for(let s=0,r=n.length-1;s<n.length;r=s++){const o=n[s].x,a=n[s].y,l=n[r].x,d=n[r].y;a>t.y!=d>t.y&&t.x<(l-o)*(t.y-a)/(d-a)+o&&(i=!i)}return i}static isPointOnBoundary(t,n,i=Le){if(!n||n.length<2)return!1;for(let s=0;s<n.length;s++)if(je(t,n[s],n[(s+1)%n.length])<=i)return!0;return!1}static containsPoint(t,n,i=Le){return!n||n.length<3?!1:this.isPointOnBoundary(t,n,i)||this.isPointInPolygon(t,n)}static findRoomContainingPoint(t,n){let i=null,s=1/0;for(const r of n){if(!this.containsPoint(t,r.polygon))continue;const o=Math.abs(this.signedArea(r.polygon));o<s-1e-9&&(i=r,s=o)}return i}static signedArea(t){if(!t||t.length<3)return 0;let n=0;for(let i=0;i<t.length;i++){const s=t[i],r=t[(i+1)%t.length];n+=s.x*r.y-r.x*s.y}return n/2}static calculateCentroid(t){if(!t||t.length===0)return{x:0,y:0};let n=0,i=0;for(const c of t)n+=c.x,i+=c.y;const s={x:n/t.length,y:i/t.length};if(t.length<3)return s;const r=t[0].x,o=t[0].y;let a=0,l=0,d=0;for(let c=0;c<t.length;c++){const h=t[c].x-r,f=t[c].y-o,u=t[(c+1)%t.length],p=u.x-r,m=u.y-o,g=h*m-p*f;a+=g,l+=(h+p)*g,d+=(f+m)*g}return Math.abs(a)<1e-12?s:{x:r+l/(3*a),y:o+d/(3*a)}}static distanceToBoundary(t,n){if(!n||n.length===0)return 1/0;if(n.length===1)return Math.hypot(t.x-n[0].x,t.y-n[0].y);let i=1/0;for(let s=0;s<n.length;s++)i=Math.min(i,je(t,n[s],n[(s+1)%n.length]));return i}static poleOfInaccessibility(t,n=Oe){return this.searchInteriorPoint(t,n,0)}static searchInteriorPoint(t,n,i){const s=We(t||[]);if(s.length<3)return{point:this.calculateCentroid(s),distance:0};let r=1/0,o=1/0,a=-1/0,l=-1/0;for(const $ of s)r=Math.min(r,$.x),o=Math.min(o,$.y),a=Math.max(a,$.x),l=Math.max(l,$.y);const d=a-r,c=l-o,h=Math.min(d,c);if(h<=0)return{point:this.calculateCentroid(s),distance:0};const f=Math.max(n,h*1e-6),u=this.calculateCentroid(s),p=($,y,v)=>{const k={x:$,y},D=this.distanceToBoundary(k,s),Y=this.isPointInPolygon(k,s)?D:-D,B=Y-i*Math.hypot($-u.x,y-u.y);return{x:$,y,h:v,d:Y,score:B,max:B+v*Math.SQRT2*(1+i)}},m=new Ii,g=h/2;for(let $=r;$<a;$+=h)for(let y=o;y<l;y+=h)m.push(p($+g,y+g,g));let x=p(u.x,u.y,0);const b=p(r+d/2,o+c/2,0);b.score>x.score&&(x=b);let w=0;for(;m.length>0&&w<_i;){const $=m.pop();if(w++,$.score>x.score&&(x=$),$.max-x.score<=f)continue;const y=$.h/2;m.push(p($.x-y,$.y-y,y)),m.push(p($.x+y,$.y-y,y)),m.push(p($.x-y,$.y+y,y)),m.push(p($.x+y,$.y+y,y))}return{point:{x:x.x,y:x.y},distance:Math.max(0,x.d)}}static labelPoint(t){if(!t||t.length<3)return this.calculateCentroid(t);const n=t.map(l=>`${l.x},${l.y}`).join(";"),i=Ot.get(n);if(i)return{...i};const s=this.calculateCentroid(t),r=this.poleOfInaccessibility(t),a=(this.isPointInPolygon(s,t)?this.distanceToBoundary(s,t):-1)>=r.distance*.5?s:this.searchInteriorPoint(t,Oe,Mi).point;return Ot.size>=Si&&Ot.clear(),Ot.set(n,a),{...a}}static computeArea(t){return ki(Math.abs(this.signedArea(t)))}static findSelfIntersections(t){const n=We(t||[]),i=n.length,s=[];if(i<3)return s;for(let r=0;r<i;r++){const o=n[r],a=n[(r+1)%i];for(let l=r+1;l<i;l++){const d=n[l],c=n[(l+1)%i];if(l===r+1||r===0&&l===i-1){const u=l===r+1?a:o,p=l===r+1?{x:o.x-u.x,y:o.y-u.y}:{x:a.x-u.x,y:a.y-u.y},m=l===r+1?{x:c.x-u.x,y:c.y-u.y}:{x:d.x-u.x,y:d.y-u.y},g=Math.hypot(p.x,p.y),x=Math.hypot(m.x,m.y);g>0&&x>0&&Math.abs(V(p.x,p.y,m.x,m.y))/(g*x)<1e-9&&p.x*m.x+p.y*m.y>0&&s.push({edgeA:r,edgeB:l,point:{...u}});continue}const f=Ei(o,a,d,c);f&&s.push({edgeA:r,edgeB:l,point:f})}}return s}static isSelfIntersecting(t){return this.findSelfIntersections(t).length>0}static offsetPolygon(t,n){if(!t||t.length<3)return null;const i=[],s=[],r=t.length;for(let p=0;p<r;p++){const m=t[p],g=t[(p+1)%r];if(Math.hypot(g.x-m.x,g.y-m.y)<=1e-9)continue;const x=Array.isArray(n)?n[p]:n;if(!Number.isFinite(x))return null;i.push(m),s.push(x)}const o=i.length;if(o<3)return null;const a=this.signedArea(i);if(Math.abs(a)<1e-12)return null;const l=a>0?1:-1,d=i.map((p,m)=>{const g=i[(m+1)%o],x=Math.hypot(g.x-p.x,g.y-p.y),b=(g.x-p.x)/x,w=(g.y-p.y)/x,$=-w*l,y=b*l;return{px:p.x+$*s[m],py:p.y+y*s[m],ux:b,uy:w,nx:$,ny:y}}),c=[];for(let p=0;p<o;p++){const m=d[(p-1+o)%o],g=d[p],x=V(m.ux,m.uy,g.ux,g.uy);if(Math.abs(x)<1e-9){const w=i[p],$=s[(p-1+o)%o],y=[{x:w.x+m.nx*$,y:w.y+m.ny*$}];Math.abs($-s[p])>1e-9&&y.push({x:w.x+g.nx*s[p],y:w.y+g.ny*s[p]}),c.push(y);continue}const b=V(g.px-m.px,g.py-m.py,g.ux,g.uy)/x;c.push([{x:m.px+b*m.ux,y:m.py+b*m.uy}])}for(let p=0;p<o;p++){const m=c[p][c[p].length-1],g=c[(p+1)%o][0];if((g.x-m.x)*d[p].ux+(g.y-m.y)*d[p].uy<-1e-9)return null}const h=c.flat(),f=this.signedArea(h),u=s.every(p=>p>=0);return Math.sign(f)!==l||Math.abs(f)<1e-9||u&&Math.abs(f)>Math.abs(a)+1e-9||this.isSelfIntersecting(h)?null:h}static computeInteriorArea(t,n){const i=this.computeArea(t),s={areaM2:i,axisAreaM2:i,matchedEdges:0};if(!t||t.length<3||!n||n.length===0)return s;const r=t.length,o=[];let a=0;for(let d=0;d<r;d++){const c=t[d],h=t[(d+1)%r],f=Math.hypot(h.x-c.x,h.y-c.y);let u=0,p=0;if(f>1e-9)for(const g of n){const x=g.end.x-g.start.x,b=g.end.y-g.start.y,w=Math.hypot(x,b);if(w<1e-9)continue;const $=x/w,y=b/w,v=Math.abs(V($,y,c.x-g.start.x,c.y-g.start.y)),k=Math.abs(V($,y,h.x-g.start.x,h.y-g.start.y));if(v>ie||k>ie)continue;const D=$*(c.x-g.start.x)+y*(c.y-g.start.y),Y=$*(h.x-g.start.x)+y*(h.y-g.start.y),B=Math.min(Math.max(D,Y),w)-Math.max(Math.min(D,Y),0);B<=ie||(u+=B,p=Math.max(p,(g.thickness||0)/2))}const m=u>=f*.5&&p>0;m&&a++,o.push(m?p:0)}if(a===0)return s;const l=this.offsetPolygon(t,o);return l?{areaM2:this.computeArea(l),axisAreaM2:i,matchedEdges:a}:s}}const ze=12,hr={seating:"Salon",bed:"Chambre",table:"Tables",storage:"Rangements",bathroom:"Bains",kitchen:"Cuisine",other:"Autres"},Ai=["seating","bed","table","storage","bathroom","kitchen","other"],Pi=1.5,Ne="#94a3b8",ct="#38bdf8",Ti="rgba(30, 41, 59, 0.85)",Ci="rgba(56, 189, 248, 0.25)",Fi="rgba(51, 65, 85, 0.9)";function tt(e,t,n){return Math.min(Math.max(e,t),Math.max(t,n))}function T(e,t,n,i,s,r=0,o={}){const a=Math.max(0,n),l=Math.max(0,i);return{kind:"rect",x:e,y:t,w:a,h:l,r:tt(r,0,Math.min(a,l)/2),paint:s,...o}}function N(e,t,n,i,s,r={}){return{kind:"ellipse",cx:e,cy:t,rx:Math.max(0,n),ry:Math.max(0,i),paint:s,...r}}function z(e,t,n,i,s,r={}){return{kind:"line",x1:e,y1:t,x2:n,y2:i,paint:s,...r}}function St(e,t,n={}){return{kind:"path",d:e,paint:t,...n}}function O(e,t,n=.08){return T(-e/2,-t/2,e,t,"body",Math.min(e,t)*n)}function Ri(e){return e.map(t=>{switch(t.kind){case"rect":return{...t,x:-(t.x+t.w)};case"ellipse":return{...t,cx:-t.cx};case"line":return{...t,x1:-t.x1,x2:-t.x2};case"path":return{...t,d:t.d.map(n=>{switch(n[0]){case"M":case"L":return[n[0],-n[1],n[2]];case"Q":return["Q",-n[1],n[2],-n[3],n[4]];case"A":return["A",n[1],n[2],n[3],n[4]===1?0:1,-n[5],n[6]];default:return n}})}}})}function Ue(e,t,n,i){const s=tt(e*i,.1,e*.25),r=tt(t*.26,.12,t*.45),o=Math.min(.04,e*.02,t*.04),a=e-s*2,l=a/n,d=[O(e,t),T(-e/2+s,-t/2,a,r,"accent",r*.2),T(-e/2,-t/2,s,t,"accent",s*.3),T(e/2-s,-t/2,s,t,"accent",s*.3)];for(let c=0;c<n;c++){const h=l-o;d.push(T(-e/2+s+c*l+o/2,-t/2+r+o/2,h,t-r-o,"body",Math.min(h,t)*.1))}return d}function Ye(e,t){const n=tt(e*.22,.15,e*.4),i=tt(t*.24,.1,t*.45),s=Math.min(.05,e*.03,t*.05),r=e-n,o=-t/2+i+s,a=Math.max(o,t/2-s);return[O(e,t,.1),T(-e/2,-t/2,e*.65,i,"accent",i*.25),T(-e/2,-t/2,n,t,"accent",n*.2),T(-e/2+n+s,-t/2+i+s,r-s*2,t-i-s*2,"body",Math.min(r,t)*.08),z(-e/2+n+r/3,o,-e/2+n+r/3,a,"outline",{dash:"3,3",opacity:.5}),z(-e/2+n+r*2/3,o,-e/2+n+r*2/3,a,"outline",{dash:"3,3",opacity:.5})]}function Xe(e,t,n){const i=Math.min(e*.05,t*.04,.08),s=Math.min(t*.03,.05),r=t*.18,o=(e-i*(n+1))/n,a=-t/2+s+i,l=Math.min(t/2,a+r+i),d=[O(e,t,.06),z(-e/2,-t/2+s,e/2,-t/2+s,"highlight",{strokeWidth:2.5})];for(let c=0;c<n;c++)d.push(T(-e/2+i+c*(o+i),a,o,r,"soft",Math.min(o,r)*.2));return d.push(St([["M",-e/2+i/2,l],["Q",0,l+t*.04,e/2-i/2,l]],"outline",{strokeWidth:1.8})),d}const Di=[{type:"sofa_3p",name:"Canapé 3 places",category:"seating",width:2.2,length:.95,icon:"🛋️",strokeWidth:1.6,shapes:(e,t)=>Ue(e,t,3,.1)},{type:"sofa_2p",name:"Canapé 2 places",category:"seating",width:1.6,length:.9,icon:"🛋️",strokeWidth:1.6,shapes:(e,t)=>Ue(e,t,2,.12)},{type:"divan",name:"Divan / Méridienne (Tête Gauche)",category:"seating",width:1.8,length:.85,icon:"🛋️",strokeWidth:1.6,shapes:(e,t)=>Ye(e,t)},{type:"divan_right",name:"Divan / Méridienne (Tête Droite)",category:"seating",width:1.8,length:.85,icon:"🛋️",strokeWidth:1.6,shapes:(e,t)=>Ri(Ye(e,t))},{type:"armchair",name:"Fauteuil club",category:"seating",width:.85,length:.85,icon:"🪑",shapes:(e,t)=>{const n=tt(e*.18,.08,e*.3),i=tt(t*.28,.1,t*.45),s=Math.min(.04,e*.04,t*.04);return[O(e,t),T(-e/2+n,-t/2,e-n*2,i,"accent",i*.2),T(-e/2,-t/2,n,t,"accent",n*.3),T(e/2-n,-t/2,n,t,"accent",n*.3),T(-e/2+n+s/2,-t/2+i+s/2,e-n*2-s,t-i-s,"body",Math.min(e,t)*.06)]}},{type:"coffee_table",name:"Table basse",category:"seating",width:1.1,length:.6,icon:"☕",shapes:(e,t)=>{const n=Math.min(e,t)*.12;return[O(e,t,.12),z(-e/2+n,-t/2+n,e/2-n,t/2-n,"outline",{dash:"3,3",opacity:.4}),z(e/2-n,-t/2+n,-e/2+n,t/2-n,"outline",{dash:"3,3",opacity:.4})]}},{type:"bed_double",name:"Lit double (Queen)",category:"bed",width:1.6,length:2,icon:"🛏️",strokeWidth:1.6,shapes:(e,t)=>Xe(e,t,2)},{type:"bed_single",name:"Lit simple",category:"bed",width:.9,length:1.9,icon:"🛏️",shapes:(e,t)=>Xe(e,t,1)},{type:"nightstand",name:"Table de chevet",category:"bed",width:.45,length:.4,icon:"🕰️",strokeWidth:1.4,shapes:(e,t)=>{const n=Math.min(e,t)*.1,i=Math.min(e,t)*.05;return[O(e,t),z(-e/2+n,0,e/2-n,0,"outline",{strokeWidth:1.2}),N(0,-t/4,i,i,"knob"),N(0,t/4,i,i,"knob")]}},{type:"wardrobe",name:"Armoire dressing",category:"storage",width:1.8,length:.6,icon:"🚪",shapes:(e,t)=>{const n=Math.min(e,t)*.1;return[O(e,t,.05),z(-e/2+e/3,-t/2,-e/2+e/3,t/2,"outline"),z(-e/2+e*2/3,-t/2,-e/2+e*2/3,t/2,"outline"),z(-e/2+n,0,e/2-n,0,"outline",{dash:"4,3",strokeWidth:1.2,opacity:.6})]}},{type:"dining_table_6",name:"Table repas (6 chaises)",category:"table",width:1.6,length:.9,icon:"🍽️",shapes:(e,t)=>{const n=e*.24,i=Math.min(.18,t*.25),s=e*.04,r=[-e/2+s,-n/2,e/2-n-s],o=Math.min(n,i)*.2;return[O(e,t,.06),...r.map(a=>T(a,-t/2-i,n,i,"body",o)),...r.map(a=>T(a,t/2,n,i,"body",o))]}},{type:"desk",name:"Bureau avec fauteuil",category:"table",width:1.4,length:.7,icon:"💻",shapes:(e,t)=>{const n=Math.min(e*.4,.6),i=Math.min(t*.06,.05),s=Math.min(e*.2,t*.45);return[O(e,t,.05),T(-n/2,-t/2+t*.08,n,i,"highlight",i*.25),St([["M",-s,t/2],["A",s,s,0,1,s,t/2]],"outline",{dash:"3,3"})]}},{type:"chair_starck",name:"Chaise médaillon transparente",legacyNames:["Chaise Starck (Ghost)"],category:"table",width:.54,length:.55,icon:"🪑",shapes:(e,t)=>{const n=Math.min(e,t),i=e*.04,s=-t/2+t*.11;return[T(-e/2+i,s,e-i*2,t-t*.18,"body",n*.11),N(0,s,n*.32,t*.16,"glass",{strokeWidth:1.6}),St([["M",-e/2+i*2,-t/2+t*.18],["Q",-e/2+i*.5,0,-e/2+i*3,t/2-t*.11]],"outline",{strokeWidth:1.4,opacity:.8}),St([["M",e/2-i*2,-t/2+t*.18],["Q",e/2-i*.5,0,e/2-i*3,t/2-t*.11]],"outline",{strokeWidth:1.4,opacity:.8}),N(0,t*.08,n*.21,n*.21,"outline",{dash:"2,2",opacity:.4})]}},{type:"console",name:"Console murale",category:"table",width:1.2,length:.35,icon:"🗄️",shapes:(e,t)=>{const n=Math.min(e,t)*.08,i=(e-n*3)/2,s=Math.min(e,t)*.05;return[O(e,t,.08),T(-e/2+n,-t/2+n,i,t-n*2,"accent",n*.6),T(n/2,-t/2+n,i,t-n*2,"accent",n*.6),N(-e/4,0,s,s,"brass"),N(e/4,0,s,s,"brass")]}},{type:"toilet",name:"WC / Toilettes",category:"bathroom",width:.45,length:.65,icon:"🚽",shapes:(e,t)=>{const n=t*.28,i=e*.04,s=Math.max(0,e/2-i),r=-t/2+n,o=Math.max(r,t/2-s);return[T(-e/2,-t/2,e,n,"accent",Math.min(e,n)*.15),St([["M",-e/2+i,r],["L",e/2-i,r],["L",e/2-i,o],["A",s,s,0,1,-e/2+i,o],["Z"]],"body")]}},{type:"shower",name:"Douche italienne",category:"bathroom",width:.9,length:.9,icon:"🚿",shapes:(e,t)=>{const n=Math.min(e,t)*.045,i={strokeWidth:1,dash:"2,2",opacity:.6};return[O(e,t,.03),z(-e/2,-t/2,0,0,"outline",i),z(e/2,-t/2,0,0,"outline",i),z(-e/2,t/2,0,0,"outline",i),z(e/2,t/2,0,0,"outline",i),N(0,0,n,n,"drain")]}},{type:"bathtub",name:"Baignoire droite",category:"bathroom",width:1.7,length:.75,icon:"🛁",strokeWidth:1.6,shapes:(e,t)=>{const n=Math.min(e,t)*.08,i=Math.min(e,t)*.035;return[O(e,t,.07),T(-e/2+n,-t/2+n,e-n*2,t-n*2,"water",(t-n*2)/2),N(-e/2+n+Math.min(e,t)*.15,0,i,i,"knob")]}},{type:"sink_vanity",name:"Meuble vasque",category:"bathroom",width:.9,length:.5,icon:"🧼",shapes:(e,t)=>{const n=t*.65/2,i=Math.min(e,t)*.04;return[O(e,t,.06),N(0,0,e*.65/2,n,"water"),N(0,-n+i*1.2,i,i,"knob")]}},{type:"kitchen_sink",name:"Évier cuisine double",category:"kitchen",width:1,length:.6,icon:"🚰",shapes:(e,t)=>{const n=Math.min(e,t)*.08,i=(e-n*3)/2,s=t-n*2.6;return[O(e,t,.05),T(-e/2+n,-t/2+n*1.6,i,s,"water",Math.min(i,s)*.12),T(n/2,-t/2+n*1.6,i,s,"water",Math.min(i,s)*.12),N(0,-t/2+n*.8,n*.4,n*.4,"brass")]}},{type:"cooktop",name:"Plaque de cuisson",category:"kitchen",width:.6,length:.6,icon:"🍳",shapes:(e,t)=>{const n=Math.min(e,t)*.18,i=Math.min(e,t)*.13;return[O(e,t,.07),N(-e/4,-t/4,n,n,"heat"),N(e/4,-t/4,i,i,"heat"),N(-e/4,t/4,i,i,"heat"),N(e/4,t/4,n,n,"heat")]}},{type:"fridge",name:"Réfrigérateur",category:"kitchen",width:.65,length:.65,icon:"🧊",shapes:(e,t)=>{const n=Math.min(e,t)*.18,i=[90,30,150].map(s=>{const r=n*Math.cos(s*Math.PI/180),o=n*Math.sin(s*Math.PI/180);return z(-r,t*.06-o,r,t*.06+o,"frost",{strokeWidth:1.4})});return[O(e,t,.05),z(-e/2,-t/2+t*.09,e/2,-t/2+t*.09,"outline",{strokeWidth:2}),z(-e/2+e*.12,-t/2+t*.045,-e/2+e*.3,-t/2+t*.045,"frost",{strokeWidth:2}),...i]}}],un=Di.map(e=>({...e,renderSvg:(t,n,i)=>Ni(e,t,n,i)})),ur=Ai.filter(e=>un.some(t=>t.category===e));function pt(e){return un.find(t=>t.type===e)}function pn(e,t,n){const i=t?ct:Ne;switch(e){case"body":return{fill:n,stroke:i};case"accent":return{fill:Fi,stroke:i};case"soft":return{fill:"rgba(241, 245, 249, 0.2)",stroke:i};case"water":return{fill:"rgba(2, 132, 199, 0.25)",stroke:i};case"heat":return{fill:"rgba(239, 68, 68, 0.2)",stroke:i};case"glass":return{fill:"rgba(56, 189, 248, 0.15)",stroke:i};case"outline":return{fill:"none",stroke:i};case"highlight":return t?{fill:ct,stroke:ct}:{fill:"#cbd5e1",stroke:"#cbd5e1"};case"frost":return{fill:"none",stroke:"#38bdf8"};case"knob":return{fill:t?ct:Ne,stroke:null};case"brass":return{fill:t?ct:"#f59e0b",stroke:null};case"drain":return{fill:t?ct:"#0284c7",stroke:null}}}function oe(e){return typeof e=="number"&&Number.isFinite(e)&&e>0?e:void 0}function fn(e,t){return{w:oe(e.width)??t?.width??1,l:oe(e.length)??t?.length??1}}function gn(e,t,n,i,s,r,o){const a=s?Ci:r||e?.defaultColor||Ti,d={shapes:e!==void 0&&Math.min(t,n)*i>=ze?e.shapes(t,n):[O(t,n,.06)],strokeWidth:e?.strokeWidth??Pi,bodyFill:a,selected:s};return!e&&o&&Math.min(t,n)*i>=ze&&(d.icon={text:o,size:tt(Math.min(t,n)*i*.5,8,16)}),d}function Li(e,t){const n=pt(e.type),{w:i,l:s}=fn(e,n),r=oe(t.pixelsPerMeter)??1;return{sym:gn(n,i,s,r,t.selected===!0,e.color,e.icon),k:r}}function _(e){const t=Math.round(e*100)/100;return t===0?0:t}function mn(e,t){return e.map(n=>{switch(n[0]){case"M":case"L":return`${n[0]} ${_(n[1]*t)} ${_(n[2]*t)}`;case"Q":return`Q ${_(n[1]*t)} ${_(n[2]*t)} ${_(n[3]*t)} ${_(n[4]*t)}`;case"A":return`A ${_(n[1]*t)} ${_(n[2]*t)} 0 ${n[3]} ${n[4]} ${_(n[5]*t)} ${_(n[6]*t)}`;default:return"Z"}}).join(" ")}function Oi(e,t){switch(e.kind){case"rect":return[["x",_(e.x*t)],["y",_(e.y*t)],["width",_(e.w*t)],["height",_(e.h*t)],["rx",_((e.r??0)*t)]];case"ellipse":return[["cx",_(e.cx*t)],["cy",_(e.cy*t)],["rx",_(e.rx*t)],["ry",_(e.ry*t)]];case"line":return[["x1",_(e.x1*t)],["y1",_(e.y1*t)],["x2",_(e.x2*t)],["y2",_(e.y2*t)]];case"path":return[["d",mn(e.d,t)]]}}function ji(e,t){const n=pn(e.paint,t.selected,t.bodyFill),i=[["fill",n.fill],["stroke",n.stroke??"none"]];return n.stroke&&i.push(["stroke-width",e.strokeWidth??t.strokeWidth]),n.stroke&&e.dash&&i.push(["stroke-dasharray",e.dash]),e.opacity!==void 0&&i.push(["opacity",e.opacity]),i}function Wi(e,t,n){const i=pn(e.paint,n.selected,n.bodyFill),s=i.stroke??"none",r=i.stroke?e.strokeWidth??n.strokeWidth:F,o=i.stroke&&e.dash?e.dash:F,a=e.opacity??F;switch(e.kind){case"rect":return M`<rect x=${_(e.x*t)} y=${_(e.y*t)} width=${_(e.w*t)} height=${_(e.h*t)} rx=${_((e.r??0)*t)}
        fill=${i.fill} stroke=${s} stroke-width=${r} stroke-dasharray=${o} opacity=${a} />`;case"ellipse":return M`<ellipse cx=${_(e.cx*t)} cy=${_(e.cy*t)} rx=${_(e.rx*t)} ry=${_(e.ry*t)}
        fill=${i.fill} stroke=${s} stroke-width=${r} stroke-dasharray=${o} opacity=${a} />`;case"line":return M`<line x1=${_(e.x1*t)} y1=${_(e.y1*t)} x2=${_(e.x2*t)} y2=${_(e.y2*t)}
        fill=${i.fill} stroke=${s} stroke-width=${r} stroke-dasharray=${o} opacity=${a} />`;case"path":return M`<path d=${mn(e.d,t)}
        fill=${i.fill} stroke=${s} stroke-width=${r} stroke-dasharray=${o} opacity=${a} />`}}function zi(e,t){return M`
    <g class="furniture-symbol">
      ${e.shapes.map(n=>Wi(n,t,e))}
      ${e.icon?M`<text x="0" y=${_(e.icon.size*.35)} text-anchor="middle" font-size=${_(e.icon.size)} fill="#cbd5e1" stroke="none">${e.icon.text}</text>`:F}
    </g>
  `}function Ni(e,t,n,i){const s=t>0?t/e.width:1;return zi(gn(e,Math.max(0,t)/s,Math.max(0,n)/s,s,i),s)}function Be(e){return e.replace(/[<>&'"]/g,t=>({"<":"&lt;",">":"&gt;","&":"&amp;","'":"&apos;",'"':"&quot;"})[t])}function Ui(e,t){const{sym:n,k:i}=Li(e,t),s=o=>o.map(([a,l])=>`${a}="${Be(String(l))}"`).join(" "),r=n.shapes.map(o=>`<${o.kind} ${s([...Oi(o,i),...ji(o,n)])} />`);return n.icon&&r.push(`<text x="0" y="${_(n.icon.size*.35)}" text-anchor="middle" font-size="${_(n.icon.size)}" fill="#cbd5e1" stroke="none">${Be(n.icon.text)}</text>`),`<g class="furniture-symbol">${r.join("")}</g>`}function Yi(e,t,n){let i=-t/2,s=-n/2,r=t/2,o=n/2;const a=(l,d)=>{i=Math.min(i,l),s=Math.min(s,d),r=Math.max(r,l),o=Math.max(o,d)};for(const l of e)switch(l.kind){case"rect":a(l.x,l.y),a(l.x+l.w,l.y+l.h);break;case"ellipse":a(l.cx-l.rx,l.cy-l.ry),a(l.cx+l.rx,l.cy+l.ry);break;case"line":a(l.x1,l.y1),a(l.x2,l.y2);break;case"path":for(const d of l.d)d[0]==="M"||d[0]==="L"?a(d[1],d[2]):d[0]==="Q"?(a(d[1],d[2]),a(d[3],d[4])):d[0]==="A"&&a(d[5],d[6]);break}return{minX:i,minY:s,maxX:r,maxY:o}}function Xi(e){const t=pt(e.type),{w:n,l:i}=fn(e,t),s=Yi(t?t.shapes(n,i):[],n,i),r=(e.rotation??0)%360*Math.PI/180,o=Math.cos(r),a=Math.sin(r);let l=1/0,d=1/0,c=-1/0,h=-1/0;for(const[f,u]of[[s.minX,s.minY],[s.maxX,s.minY],[s.maxX,s.maxY],[s.minX,s.maxY]]){const p=e.position.x+f*o-u*a,m=e.position.y+f*a+u*o;l=Math.min(l,p),d=Math.min(d,m),c=Math.max(c,p),h=Math.max(h,m)}return{minX:l,minY:d,maxX:c,maxY:h}}const ae=2,Bi=["standard","partition","loadbearing","exterior"],qi=["door","double_door","sliding_door","window","french_window"],Hi=["toggle","more-info","navigate","none"],Gi=["seating","bed","table","kitchen","bathroom","storage","other"],ge=Object.freeze([{id:"sous-sol",label:"Sous-Sol",fullLabel:"Sous-Sol",order:0,icon:"🏠",floor:-1},{id:"rdc",label:"RDC",fullLabel:"Rez-de-Chaussée",order:1,icon:"🏠",floor:0},{id:"etage1",label:"1er Étage",fullLabel:"1er Étage",order:2,icon:"🏠",floor:1},{id:"etage2",label:"2ème Étage",fullLabel:"2ème Étage",order:3,icon:"🏠",floor:2},{id:"etage3",label:"3ème Étage",fullLabel:"3ème Étage",order:4,icon:"🏠",floor:3},{id:"jardin",label:"Jardin",fullLabel:"Jardin",order:5,icon:"🌳",floor:null}].map(e=>Object.freeze(e))),pr="rdc",yn="autre",Ki=Object.freeze({id:yn,label:"Autre",fullLabel:"Autre",order:ge.length,icon:"📁",floor:null});function Vt(e){return e?ge.find(t=>t.id===e):void 0}function Vi(e){return Vt(e)!==void 0}function fr(e){const t=Vt(e);return t?t.label:!e||e===yn?Ki.label:e}function gr(e){const t=Vt(e);if(!t||t.floor===null)return null;const n=ge.find(i=>i.floor===t.floor-1);return n?n.id:null}const jt=2*1024*1024,Wt=3.5*1024*1024,qe=256*1024,$t=/^[a-zA-Z0-9_-]{1,64}$/,Zt=/^[A-Za-z0-9_-]{1,64}-[A-Za-z0-9]{6,64}\.[A-Za-z0-9]{2,5}$/,He="abcdefghijklmnopqrstuvwxyz0123456789",xn=/^[a-z0-9_]+\.[a-z0-9_]+$/i,Zi=/^(?:https?:\/\/|\/)[^\s\x00-\x1f\x7f]*$/i,Ji=2048,Qi=/^data:image\//i,ts=/^image\/[a-z0-9.+-]+$/i,es=/^(?:\/(?!\/)|#)[^\s\x00-\x1f\x7f\\]*$/,ns=/^[#a-zA-Z0-9(),.%\s+-]{1,64}$/,is=/url\s*\(|expression|image-set/i,ss=/^[a-z0-9_-]{1,32}:[a-z0-9_-]{1,64}$/i,rs=64,bn=200,wn=64,$n=50,vn=5,Mn=2e3,os=.2,as=.02,ls=1.5,_n=.5,cs=.05,ds=2,hs=.9,us=.4,Jt=50,le=100;function q(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function mt(e){return Array.isArray(e)?e:[]}function X(e){if(typeof e=="number")return Number.isFinite(e)?e:void 0;if(typeof e=="string"&&e.trim()!==""){const t=Number(e);return Number.isFinite(t)?t:void 0}}function et(e,t,n){return Math.min(n,Math.max(t,e))}function Z(e,t){const n=X(e);return n===void 0?t:n}function yt(e,t){const n=X(e);return n!==void 0&&n>0?Math.min(n,t):void 0}function ps(e){return typeof e=="number"&&Number.isInteger(e)&&e>=0?e:void 0}function j(e){if(typeof e!="string")return;const t=e.trim();return t===""?void 0:t}function qt(e,t){const n=j(e);return n===void 0?void 0:n.length>t?n.slice(0,t).trim():n}function Sn(e){const t=j(e);return t&&ns.test(t)&&!is.test(t)?t:void 0}function me(e){const t=j(e);return t&&t.length<=rs?t:void 0}function In(e){return typeof e=="string"?e.trim()===""?"":e:typeof e=="number"&&Number.isFinite(e)?String(e):""}function xt(e){if(!q(e))return null;const t=X(e.x),n=X(e.y);return t===void 0||n===void 0?null:{x:t,y:n}}function Qt(e,t){return typeof e=="string"&&t.includes(e)?e:void 0}function fs(e){const t=(e%360+360)%360;return t===0?0:t}function Rt(e,t,n){let i=In(e);for(;i===""||n.has(i);)i=gs(t);return n.add(i),i}function En(e){const t=typeof crypto<"u"&&typeof crypto.getRandomValues=="function";let n="";for(;n.length<e;){const i=new Uint8Array(e*2);if(t)crypto.getRandomValues(i);else for(let s=0;s<i.length;s++)i[s]=Math.floor(Math.random()*256);for(const s of i)if(!(s>=252)&&(n+=He[s%He.length],n.length===e))break}return n}function kn(){return`plan_${En(8)}`}function gs(e){return`${e}_${En(10)}`}function ms(){return{size:_n,subdivisions:2,snapToGrid:!0,snapToAngles:!0,snapToElements:!0}}function An(e){return e&&Vi(e)?e:void 0}function Pn(e){return Vt(e)?.fullLabel??"Nouveau plan"}function ys(e={}){const t=new Date().toISOString(),n=qt(e.category,wn);return{id:kn(),name:qt(e.name,bn)??Pn(n),category:n,schema_version:ae,created_at:t,updated_at:t,pixelsPerMeter:et(Z(e.pixelsPerMeter,$n),vn,Mn),grid:ms(),walls:[],openings:[],rooms:[],bindings:[],furniture:[]}}function xs(e){const t=q(e)?e:{},n=X(t.subdivisions);return{size:et(Z(t.size,_n),cs,ds),subdivisions:n===void 0?2:et(Math.round(n),1,20),snapToGrid:typeof t.snapToGrid=="boolean"?t.snapToGrid:!0,snapToAngles:typeof t.snapToAngles=="boolean"?t.snapToAngles:!0,snapToElements:typeof t.snapToElements=="boolean"?t.snapToElements:!0}}function bs(e){return typeof e!="string"?"":Qi.test(e)||e.length<=Ji&&Zi.test(e)?e:""}function ws(e){if(!q(e))return;const t=bs(e.imageUrl),n=typeof e.assetId=="string"&&Zt.test(e.assetId)?e.assetId:void 0;if(!t&&!n)return;const i=X(e.scale),s={imageUrl:t,opacity:et(Z(e.opacity,us),0,1),visible:e.visible!==!1,offset:xt(e.offset)??{x:0,y:0},scale:i!==void 0&&i>0?i:1,rotation:Z(e.rotation,0)};n&&(s.assetId=n),typeof e.mimeType=="string"&&ts.test(e.mimeType)&&(s.mimeType=e.mimeType);const r=yt(e.widthPx,Number.MAX_SAFE_INTEGER),o=yt(e.heightPx,Number.MAX_SAFE_INTEGER);return r!==void 0&&(s.widthPx=r),o!==void 0&&(s.heightPx=o),s}function $s(e){const t=new Set,n=[];for(const i of mt(e)){if(!q(i))continue;const s=xt(i.start),r=xt(i.end);if(!s||!r||Math.hypot(r.x-s.x,r.y-s.y)<1e-6)continue;const o={id:Rt(i.id,"wall",t),start:s,end:r,thickness:et(Z(i.thickness,os),as,ls),type:Qt(i.type,Bi)??"standard"},a=yt(i.height,Jt);a!==void 0&&(o.height=a),n.push(o)}return n}function vs(e,t){const n=new Map(t.map(r=>[r.id,Math.hypot(r.end.x-r.start.x,r.end.y-r.start.y)])),i=new Set,s=[];for(const r of mt(e)){if(!q(r))continue;const o=In(r.wallId),a=n.get(o);if(a===void 0)continue;const l={id:Rt(r.id,"op",i),wallId:o,type:Qt(r.type,qi)??"door",offset:et(Z(r.offset,a/2),0,a),width:et(Z(r.width,hs),.05,le),flipSide:r.flipSide===!0,flipDirection:r.flipDirection===!0},d=yt(r.height,Jt);d!==void 0&&(l.height=d),(r.sashCount===1||r.sashCount===2)&&(l.sashCount=r.sashCount);const c=j(r.entityId);c&&xn.test(c)&&(l.entityId=c),s.push(l)}return s}function Ms(e){const t=new Set,n=[];for(const i of mt(e)){if(!q(i))continue;const s=mt(i.polygon).map(xt).filter(h=>h!==null);if(s.length<3)continue;const r=X(i.areaM2),o={id:Rt(i.id,"room",t),name:typeof i.name=="string"?i.name:"Pièce",polygon:s,areaM2:r!==void 0&&r>=0?r:H.computeArea(s)},a=j(i.area_id),l=Sn(i.color),d=me(i.icon),c=yt(i.height,Jt);a&&(o.area_id=a),l&&(o.color=l),d&&(o.icon=d),c!==void 0&&(o.height=c),n.push(o)}return n}function _s(e,t){const n=new Set,i=[];for(const s of mt(e)){if(!q(s))continue;const r=j(s.entityId);if(!r||!xn.test(r))continue;const o=xt(s.position);if(!o)continue;const a={id:Rt(s.id,"bind",n),entityId:r,position:o},l=j(s.roomId),d=me(s.icon),c=j(s.mdiIcon),h=c&&ss.test(c)?c:void 0,f=j(s.customName),u=j(s.navigationPath),p=u&&es.test(u)?u:void 0,m=b=>{const w=Qt(b,Hi);return w==="navigate"&&!p?void 0:w},g=m(s.tapAction),x=m(s.holdAction);l&&(a.roomId=l),d&&(a.icon=d),h&&(a.mdiIcon=h),f&&(a.customName=f),g&&!(t&&g==="toggle")&&(a.tapAction=g),x&&(a.holdAction=x),p&&(a.navigationPath=p),i.push(a)}return i}function Ss(e){const t=new Set,n=[];for(const i of mt(e)){if(!q(i))continue;const s=j(i.type),r=xt(i.position);if(!s||!r)continue;const o=pt(s),a=X(i.width),l=X(i.length),d={id:Rt(i.id,"furn",t),type:s,name:typeof i.name=="string"?i.name:o?.name??s,category:Qt(i.category,Gi)??o?.category??"other",position:r,width:a!==void 0&&a>0?Math.min(a,le):o?.width??1,length:l!==void 0&&l>0?Math.min(l,le):o?.length??1,rotation:fs(Z(i.rotation,0))},c=j(i.roomId),h=Sn(i.color),f=me(i.icon);c&&(d.roomId=c),h&&(d.color=h),f&&(d.icon=f),n.push(d)}return n}function Is(e){if(!q(e))return;const t=X(e.minX),n=X(e.minY),i=X(e.maxX),s=X(e.maxY);if(!(t===void 0||n===void 0||i===void 0||s===void 0)&&!(i<=t||s<=n))return{minX:t,minY:n,maxX:i,maxY:s}}function ye(e){if(!q(e))return;const{url:t,path:n,hash:i,published_at:s}=e;if(typeof t!="string"||typeof n!="string"||typeof i!="string"||typeof s!="string"||!t.startsWith("/")||t.startsWith("//")||!n.startsWith("/")||n.startsWith("//"))return;const r={url:t,path:n,hash:i,published_at:s,include_background:e.include_background===!0};return typeof e.legacy_path=="string"&&e.legacy_path.startsWith("/local/")&&(r.legacy_path=e.legacy_path),r}function Es(e){const t=q(e)?e:{},n=new Date().toISOString(),i=typeof t.id=="string"&&$t.test(t.id)?t.id:kn(),s=qt(t.category,wn)??An(i),r=X(t.schema_version),o=r===void 0||r<ae,a=$s(t.walls),l={id:i,name:qt(t.name,bn)??Pn(s),category:s,schema_version:ae,created_at:j(t.created_at)??n,updated_at:j(t.updated_at)??j(t.created_at)??n,pixelsPerMeter:et(Z(t.pixelsPerMeter,$n),vn,Mn),grid:xs(t.grid),walls:a,openings:vs(t.openings,a),rooms:Ms(t.rooms),bindings:_s(t.bindings,o),furniture:Ss(t.furniture)};s===void 0&&delete l.category;const d=ps(t.revision);d!==void 0&&(l.revision=d);const c=yt(t.defaultCeilingHeight,Jt);c!==void 0&&(l.defaultCeilingHeight=c);const h=ws(t.background);h&&(l.background=h),typeof t.showDimensions=="boolean"&&(l.showDimensions=t.showDimensions),typeof t.showThermalHeatmap=="boolean"&&(l.showThermalHeatmap=t.showThermalHeatmap),typeof t.showGhostLevel=="boolean"&&(l.showGhostLevel=t.showGhostLevel);const f=j(t.ghostLevelId);f&&(l.ghostLevelId=f);const u=Is(t.exportFrame);u&&(l.exportFrame=u);const p=ye(t.publish);return p&&(l.publish=p),l}function xe(e){try{return Es(e)}catch(t){return console.warn("[home-architect] Projet illisible, remplacé par un plan vide :",t),ys()}}function ks(e){const t={};for(const[n,i]of Object.entries(e))n==="publish"||n.startsWith("_")||(t[n]=i);return t}function As(e){const t=JSON.stringify(e);return t===void 0?0:new TextEncoder().encode(t).length}function mr(e){if(typeof structuredClone=="function")try{return structuredClone(e)}catch{}return JSON.parse(JSON.stringify(e))}function Ps(e){const t=typeof e=="string"?e.indexOf("."):-1;return t>0?e.slice(0,t):""}const Ts=new Set(["light","switch","fan","input_boolean","automation","scene","script","button","input_button"]);function yr(e){return Ts.has(Ps(e))?"toggle":"more-info"}function Tn(e,t){const n=e?.[t]?.attributes?.friendly_name;return typeof n=="string"&&n.trim()!==""?n:void 0}function Cs(e,t){return j(e.customName)??Tn(t,e.entityId)??e.entityId}function xr(e,t){if(!Array.isArray(e?.bindings))return e;let n=!1;const i=e.bindings.map(s=>{if(s.customName===void 0||!(s.customName===s.entityId||t!==void 0&&s.customName===Tn(t,s.entityId)))return s;n=!0;const{customName:o,...a}=s;return a});return n?{...e,bindings:i}:e}const zt="#0f172a",Fs=50,Ge=2,Rs={minX:-1,minY:-1,maxX:11,maxY:7},Ke=50,Ve=.001,Ds=4,E={roomStroke:.03,wallOutline:.02,cutoutOverlap:.03,jamb:.08,doorLeaf:.04,doorArc:.024,doorDash:.06,windowFrame:.05,windowGlass:.03,windowSash:.02,windowMullion:.05,slidingPanel:.06,labelName:.26,labelArea:.22,labelGap:.12,labelHalo:.05,markerRadius:.32,markerStroke:.03,markerIcon:.26,markerLabel:.2},P={roomFill:"rgba(56, 189, 248, 0.12)",roomStroke:"rgba(56, 189, 248, 0.4)",wallFill:"#334155",wallStroke:"#64748b",jamb:"#94a3b8",frame:"#94a3b8",accent:"#38bdf8",accentFaint:"rgba(56, 189, 248, 0.45)",doorSwing:"rgba(56, 189, 248, 0.08)",labelName:"#f8fafc",markerFill:"rgba(30, 41, 59, 0.85)",markerLabel:"#f1f5f9"},Ls="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",Os="ui-monospace, SFMono-Regular, Menlo, monospace",js=/^(?:#[0-9a-f]{3,8}|(?:rgb|rgba|hsl|hsla)\([0-9\s.,%+-]{1,60}\)|[a-z]{3,24})$/i,Ws=/^data:image\/(?:png|jpe?g|webp|gif|svg\+xml)(?:;[a-z0-9=._+-]+)*;base64,[a-z0-9+/=\s]+$/i,zs=/[\uD800-\uDBFF][\uDC00-\uDFFF]|[\x00-\x08\x0B\x0C\x0E-\x1F\uD800-\uDFFF\uFFFE\uFFFF]/g;function Cn(e){return e.replace(zs,t=>t.length===2?t:"")}function dt(e){return Cn(String(e)).replace(/[<>&'"]/g,t=>{switch(t){case"<":return"&lt;";case">":return"&gt;";case"&":return"&amp;";case"'":return"&apos;";default:return"&quot;"}})}function ot(e){if(!Number.isFinite(e))return"0";const t=Math.round(e*100)/100;return String(t===0?0:t)}function Ze(e,t){const n=typeof e=="string"?e.trim():"";return n&&js.test(n)?n:t}function se(e,t){return e.x*t.y-e.y*t.x}function Ht(e,t,n){return{x:e.x+t.x*n,y:e.y+t.y*n}}function Je(e,t,n){const i={x:-t.dir.y,y:t.dir.x},s={x:n.dir.y,y:-n.dir.x},r=se(t.dir,n.dir);if(Math.abs(r)<1e-6)return null;const o=Ht(e,i,t.half),a=Ht(e,s,n.half),l={x:a.x-o.x,y:a.y-o.y},d=se(l,n.dir)/r,c=se(l,t.dir)/r;if(d>=t.length||c>=n.length)return null;const h={x:o.x+t.dir.x*d,y:o.y+t.dir.y*d};return Math.hypot(h.x-e.x,h.y-e.y)<=Ds*Math.max(t.half,n.half)?h:null}function _t(e,t,n){return Ht(e,{x:-t.dir.y*n,y:t.dir.x*n},t.half)}function Qe(e){const t=[],n=o=>{let a=t.find(l=>Math.hypot(l.point.x-o.x,l.point.y-o.y)<=Ve);return a||(a={point:o,ends:[]},t.push(a)),a},i=new Map;for(const o of e){const a=o.end.x-o.start.x,l=o.end.y-o.start.y,d=Math.hypot(a,l);if(!(d>Ve)||!Number.isFinite(d))continue;const c=Math.max(0,Number.isFinite(o.thickness)?o.thickness:0)/2,h={x:a/d,y:l/d},f={x:-h.x,y:-h.y},u={dir:h,half:c,length:d,angle:Math.atan2(h.y,h.x)},p={dir:f,half:c,length:d,angle:Math.atan2(f.y,f.x)},m=n(o.start),g=n(o.end);m.ends.push(u),g.ends.push(p),i.set(o.id,{start:u,end:p,startJoint:m.point,endJoint:g.point})}const s=new Map;for(const o of t){const a=[...o.ends].sort((d,c)=>d.angle-c.angle),l=a.length;a.forEach((d,c)=>{if(l<2){s.set(d,{left:_t(o.point,d,1),right:_t(o.point,d,-1),joined:!1});return}const h=a[(c+1)%l],f=a[(c-1+l)%l],u=Je(o.point,d,h),p={left:u??_t(o.point,d,1),right:Je(o.point,f,d)??_t(o.point,d,-1),joined:!0};u||(p.bevel=_t(o.point,h,-1)),s.set(d,p)})}const r=new Map;for(const[o,a]of i){const l=s.get(a.start),d=s.get(a.end),c=[l.left,d.right];d.joined&&c.push(a.endJoint),d.bevel&&c.push(d.bevel),c.push(d.left,l.right),l.joined&&c.push(a.startJoint),l.bevel&&c.push(l.bevel),Ns(c)<0&&c.reverse(),r.set(o,c)}return r}function Ns(e){let t=0;for(let n=0;n<e.length;n++){const i=e[n],s=e[(n+1)%e.length];t+=i.x*s.y-s.x*i.y}return t/2}function tn(e){return!!e&&[e.minX,e.minY,e.maxX,e.maxY].every(Number.isFinite)&&e.maxX>e.minX&&e.maxY>e.minY}function en(e,t,n){if(t-e>=n)return[e,t];const s=(e+t)/2;return[s-n/2,s+n/2]}function nn(e,t){const n=t.end.x-t.start.x,i=t.end.y-t.start.y,s=Math.hypot(n,i);if(!(s>0))return null;const r={x:n/s,y:i/s};return{center:{x:t.start.x+r.x*e.offset,y:t.start.y+r.y*e.offset},dir:r,normal:{x:-r.y,y:r.x},angleDeg:Math.atan2(i,n)*180/Math.PI}}function Us(e){return e==="door"||e==="double_door"}class Ys{static computeContentFrame(t,n){const i=this.contentBounds(t);if(!i)return{...Rs};const s=Math.max(i.maxX-i.minX,i.maxY-i.minY),r=n!==void 0&&Number.isFinite(n)&&n>=0?n:Math.max(.6,s*.05),[o,a]=en(i.minX-r,i.maxX+r,Ge),[l,d]=en(i.minY-r,i.maxY+r,Ge);return{minX:o,minY:l,maxX:a,maxY:d}}static contentBounds(t){const n=this.collectContentPoints(t);if(n.length===0)return null;let i=1/0,s=1/0,r=-1/0,o=-1/0;for(const a of n)a.x<i&&(i=a.x),a.x>r&&(r=a.x),a.y<s&&(s=a.y),a.y>o&&(o=a.y);return{minX:i,minY:s,maxX:r,maxY:o}}static resolveExportFrame(t,n,i){return tn(n)?{...n}:tn(t.exportFrame)?{...t.exportFrame}:this.computeContentFrame(t,i)}static frameContains(t,n){return n.minX>=t.minX-.001&&n.minY>=t.minY-.001&&n.maxX<=t.maxX+.001&&n.maxY<=t.maxY+.001}static calculateBoundingBox(t,n){const i=this.computeContentFrame(t,n);return{minX:i.minX,minY:i.minY,width:i.maxX-i.minX,height:i.maxY-i.minY,ppm:this.unitsPerMeter(t)}}static worldToPercentage(t,n){const i=(t.x-n.minX)/(n.maxX-n.minX)*100,s=(t.y-n.minY)/(n.maxY-n.minY)*100;return{left:Number.isFinite(i)?Math.round(i*100)/100:0,top:Number.isFinite(s)?Math.round(s*100)/100:0}}static unitsPerMeter(t){const n=t.pixelsPerMeter;return Number.isFinite(n)&&n>0?n:Fs}static embeddableDataUrl(t){return typeof t=="string"&&Ws.test(t)?t:null}static exportToSvg(t,n){const i={includeRooms:!0,includeWalls:!0,includeOpenings:!0,includeFurniture:!0,includeRoomLabels:!0,includeEntityMarkers:!1,includeBackground:!0,backgroundColor:zt,...n},s=this.unitsPerMeter(t),r=y=>ot(y*s),o=this.resolveExportFrame(t,i.frame,i.paddingMeters),a=r(o.minX),l=r(o.minY),d=r(o.maxX-o.minX),c=r(o.maxY-o.minY),h=Ze(i.backgroundColor,zt),f=h==="transparent"?zt:h,u=t.walls||[],p=t.rooms||[],m=t.openings||[],g=t.furniture||[],x=t.bindings||[];let b="";h!=="transparent"&&(b+=`  <rect id="background" x="${a}" y="${l}" width="${d}" height="${c}" fill="${h}" />
`);const w=t.background,$=i.includeBackground!==!1&&w?.visible?this.embeddableDataUrl(i.backgroundDataUrl)??this.embeddableDataUrl(w.imageUrl):null;if(w&&$){const y=Number.isFinite(w.scale)&&w.scale>0?w.scale:1,v=w.offset||{x:0,y:0},k=Number.isFinite(w.opacity)?Math.min(1,Math.max(0,w.opacity)):.6;b+=`  <image id="background-image" href="${dt($)}" x="${r(v.x)}" y="${r(v.y)}" width="${ot((w.widthPx||1200)*y)}" height="${ot((w.heightPx||900)*y)}" opacity="${ot(k)}" />
`}if(i.includeRooms&&p.length>0){b+=`  <g id="rooms" stroke="${P.roomStroke}" stroke-width="${r(E.roomStroke)}">
`;for(const y of p){if(!y.polygon||y.polygon.length<3)continue;const v=y.polygon.map(k=>`${r(k.x)},${r(k.y)}`).join(" ");b+=`    <polygon points="${v}" fill="${Ze(y.color,P.roomFill)}" />
`}b+=`  </g>
`}if(i.includeFurniture!==!1&&g.length>0){const y=String(Math.round(s/Ke*1e4)/1e4);b+=`  <g id="furniture">
`;for(const v of g){if(!v.position)continue;const k=Number.isFinite(v.rotation)?v.rotation:0,D=Cn(Ui(v,{pixelsPerMeter:Ke}));b+=`    <g transform="translate(${r(v.position.x)}, ${r(v.position.y)}) rotate(${ot(k)}) scale(${y})">${D}</g>
`}b+=`  </g>
`}if(i.includeWalls&&u.length>0){const v=[...Qe(u).values()].map(k=>`M${k.map(D=>`${r(D.x)} ${r(D.y)}`).join(" L")} Z`).join(" ");v&&(b+=`  <g id="walls">
`,b+=`    <path d="${v}" fill="${P.wallStroke}" stroke="${P.wallStroke}" stroke-width="${r(E.wallOutline*2)}" stroke-linejoin="round" />
`,b+=`    <path d="${v}" fill="${P.wallFill}" />
`,b+=`  </g>
`)}if(i.includeOpenings&&m.length>0){b+=`  <g id="openings">
`;for(const y of m){const v=u.find(D=>D.id===y.wallId);if(!v)continue;const k=nn(y,v);k&&(b+=`    <g transform="translate(${r(k.center.x)}, ${r(k.center.y)}) rotate(${ot(k.angleDeg)})">
`,b+=this.renderOpening(y,v,s,f),b+=`    </g>
`)}b+=`  </g>
`}if(i.includeRoomLabels&&p.length>0){b+=`  <g id="room-labels" text-anchor="middle" stroke="${zt}" stroke-width="${r(E.labelHalo)}" stroke-linejoin="round" paint-order="stroke">
`;for(const y of p){if(!y.polygon||y.polygon.length<3)continue;const v=H.labelPoint(y.polygon),k=Number.isFinite(y.areaM2)?y.areaM2:H.computeArea(y.polygon);b+=`    <g transform="translate(${r(v.x)}, ${r(v.y)})">
`,b+=`      <text y="${r(-.12/2)}" fill="${P.labelName}" font-size="${r(E.labelName)}" font-weight="700">${dt(y.name||"")}</text>
`,b+=`      <text y="${r(E.labelGap/2+E.labelArea)}" fill="${P.accent}" font-size="${r(E.labelArea)}" font-weight="600" font-family="${Os}">${k.toFixed(1)} m²</text>
`,b+=`    </g>
`}b+=`  </g>
`}if(i.includeEntityMarkers&&x.length>0){b+=`  <g id="entity-markers" text-anchor="middle">
`;for(const y of x){if(!y.position)continue;const v=Cs(y,i.states);b+=`    <g transform="translate(${r(y.position.x)}, ${r(y.position.y)})">
`,b+=`      <circle r="${r(E.markerRadius)}" fill="${P.markerFill}" stroke="${P.accent}" stroke-width="${r(E.markerStroke)}" />
`,b+=`      <text y="${r(E.markerIcon*.35)}" font-size="${r(E.markerIcon)}">${dt(y.icon||"⚡")}</text>
`,b+=`      <text y="${r(E.markerRadius+E.markerLabel*1.1)}" fill="${P.markerLabel}" font-size="${r(E.markerLabel)}" font-weight="600">${dt(v)}</text>
`,b+=`    </g>
`}b+=`  </g>
`}return`<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="${a} ${l} ${d} ${c}" width="${d}" height="${c}" font-family="${dt(Ls)}">
  <title>${dt(t.name||"Home Architect")}</title>
${b}</svg>`}static renderOpening(t,n,i,s){const r=g=>ot(g*i),o=t.width,a=o/2,l=n.thickness,d=l/2,c="      ";let h=`${c}<rect x="${r(-a)}" y="${r(-d-E.cutoutOverlap)}" width="${r(o)}" height="${r(l+E.cutoutOverlap*2)}" fill="${s}" />
`;const f=`${c}<rect x="${r(-a)}" y="${r(-d)}" width="${r(o)}" height="${r(l)}" fill="none" stroke="${P.frame}" stroke-width="${r(E.windowFrame)}" />
`,u=()=>{const g=Math.min(E.jamb,o/4);return`${c}<rect x="${r(-a)}" y="${r(-d)}" width="${r(g)}" height="${r(l)}" fill="${P.jamb}" />
${c}<rect x="${r(a-g)}" y="${r(-d)}" width="${r(g)}" height="${r(l)}" fill="${P.jamb}" />
`},p=t.flipSide?-1:1,m=(g,x,b)=>{const w=x*p>0?1:0;return`${c}<line x1="${r(g)}" y1="0" x2="${r(g)}" y2="${r(p*b)}" stroke="${P.accent}" stroke-width="${r(E.doorLeaf)}" stroke-linecap="round" />
${c}<path d="M ${r(g+x*b)} 0 A ${r(b)} ${r(b)} 0 0 ${w} ${r(g)} ${r(p*b)}" fill="${P.doorSwing}" stroke="${P.accent}" stroke-width="${r(E.doorArc)}" stroke-dasharray="${r(E.doorDash)} ${r(E.doorDash)}" />
`};switch(t.type){case"door":{const g=t.flipDirection?a:-a;h+=u()+m(g,t.flipDirection?-1:1,o);break}case"double_door":h+=u()+m(-a,1,a)+m(a,-1,a);break;case"sliding_door":{const g=o*.55;h+=f+`${c}<rect x="${r(-a)}" y="${r(-l/4-E.slidingPanel/2)}" width="${r(g)}" height="${r(E.slidingPanel)}" fill="${P.accent}" />
${c}<rect x="${r(a-g)}" y="${r(l/4-E.slidingPanel/2)}" width="${r(g)}" height="${r(E.slidingPanel)}" fill="${P.accent}" />
`;break}case"french_window":h+=f+`${c}<rect x="${r(-a)}" y="${r(-l/4)}" width="${r(a)}" height="${r(E.slidingPanel)}" fill="${P.accent}" />
${c}<rect x="0" y="${r(l/4)}" width="${r(a)}" height="${r(E.slidingPanel)}" fill="${P.accent}" />
`;break;default:{const g=t.sashCount||(o>=1.25?2:1),x=Math.min(E.jamb,o/4);h+=f+`${c}<line x1="${r(-a)}" y1="0" x2="${r(a)}" y2="0" stroke="${P.accent}" stroke-width="${r(E.windowGlass)}" />
`,g===2?h+=`${c}<line x1="0" y1="${r(-d)}" x2="0" y2="${r(d)}" stroke="${P.accent}" stroke-width="${r(E.windowMullion)}" />
${c}<line x1="${r(-a+x)}" y1="${r(-l/4)}" x2="${r(-x/2)}" y2="${r(-l/4)}" stroke="${P.accentFaint}" stroke-width="${r(E.windowSash)}" />
${c}<line x1="${r(x/2)}" y1="${r(l/4)}" x2="${r(a-x)}" y2="${r(l/4)}" stroke="${P.accentFaint}" stroke-width="${r(E.windowSash)}" />
`:h+=`${c}<line x1="${r(-a+x)}" y1="${r(-l/4)}" x2="${r(a-x)}" y2="${r(-l/4)}" stroke="${P.accentFaint}" stroke-width="${r(E.windowSash)}" />
${c}<line x1="${r(-a+x)}" y1="${r(l/4)}" x2="${r(a-x)}" y2="${r(l/4)}" stroke="${P.accentFaint}" stroke-width="${r(E.windowSash)}" />
`;break}}return h}static collectContentPoints(t){const n=[],i=t.walls||[];for(const r of Qe(i).values())n.push(...r);for(const r of t.rooms||[])r.polygon&&r.polygon.length>0&&n.push(...r.polygon);for(const r of t.bindings||[])r.position&&n.push(r.position);for(const r of t.furniture||[]){if(!r.position)continue;const o=Xi(r);n.push({x:o.minX,y:o.minY},{x:o.maxX,y:o.maxY})}for(const r of t.openings||[]){if(!Us(r.type))continue;const o=i.find(c=>c.id===r.wallId),a=o?nn(r,o):null;if(!a)continue;const l=r.flipSide?-1:1,d=r.width/2;for(const c of[-d,d]){const h={x:a.center.x+a.dir.x*c,y:a.center.y+a.dir.y*c},f=r.type==="door"?r.width:d;n.push(h,Ht(h,a.normal,l*f))}}const s=t.background;if(s&&s.visible&&(s.imageUrl||s.assetId)){const r=this.unitsPerMeter(t),o=s.offset||{x:0,y:0},a=Number.isFinite(s.scale)&&s.scale>0?s.scale:1;n.push({x:o.x,y:o.y},{x:o.x+(s.widthPx||1200)*a/r,y:o.y+(s.heightPx||900)*a/r})}return n.filter(r=>Number.isFinite(r.x)&&Number.isFinite(r.y))}}var Xs=Object.defineProperty,Bs=Object.getOwnPropertyDescriptor,I=(e,t,n,i)=>{for(var s=i>1?void 0:i?Bs(t,n):t,r=e.length-1,o;r>=0;r--)(o=e[r])&&(s=(i?o(t,n,s):o(s))||s);return i&&s&&Xs(t,n,s),s};let S=class extends kt{constructor(){super(...arguments),this.project={id:"default",name:"Plan sans titre",created_at:new Date().toISOString(),updated_at:new Date().toISOString(),pixelsPerMeter:50,grid:{size:.5,subdivisions:2,snapToGrid:!0,snapToAngles:!0,snapToElements:!0},walls:[],openings:[],rooms:[],bindings:[]},this.activeTool="wall",this.currentWallThickness=.2,this.currentOpeningWidth=.9,this.is3DMode=!1,this.selectedElements={wallIds:[],openingIds:[],roomIds:[],bindingIds:[],furnitureIds:[]},this.isDashboardMode=!1,this.ghostProject=null,this.showDimensions=!0,this.showThermalHeatmap=!1,this.isMarqueeSelecting=!1,this.marqueeStart=null,this.marqueeCurrent=null,this.viewport={x:300,y:300,zoom:1},this.isPanning=!1,this.panStart={x:0,y:0},this.panStartPointer={x:0,y:0},this.panStartViewport={x:0,y:0},this.drawingWallStart=null,this.previewPoint=null,this.snapInfo={snappedTo:"none"},this.cursorCoords={x:0,y:0},this.draggingFurnitureId=null,this.dragFurnitureMoved=!1,this.dragFurnitureStartPos={x:0,y:0},this.dragFurnitureItemStartPos={x:0,y:0},this.rotatingFurnitureId=null,this.rotateFurnitureMoved=!1,this.rotateFurnitureStartAngle=0,this.rotateFurnitureInitialAngle=0,this.resizingFurnitureId=null,this.resizeFurnitureMoved=!1,this.resizeFurnitureStartPointer={x:0,y:0},this.resizeFurnitureInitialWidth=1,this.resizeFurnitureInitialLength=1,this.draggingWallId=null,this.dragWallMoved=!1,this.dragWallStartPointer={x:0,y:0},this.dragWallInitialStart={x:0,y:0},this.dragWallInitialEnd={x:0,y:0},this.wallSnap=null,this.openingFlipSide=!1,this.openingFlipDirection=!1,this.windowSashCount=1,this.calibrateStart=null,this.calibrateCurrent=null,this.rescaleStart=null,this.rescaleCurrent=null,this._boundKeyDown=null,this.draggingBindingId=null,this.dragBindingMoved=!1,this.dragBindingStartPos={x:0,y:0},this.viewRotation=0,this.orbitPitch=55,this.orbitYaw=-35,this.isOrbiting=!1,this.orbitStart={x:0,y:0},this.orbitStartPitch=55,this.orbitStartYaw=-35,this._canvasResizeObserver=null}setCameraPreset(e,t){this.orbitPitch=e,this.orbitYaw=t,this.requestUpdate()}screenToWorld(e,t){const n=this.getBoundingClientRect();let i=e-n.left,s=t-n.top;if(!this.is3DMode&&this.viewRotation!==0){const o=(n.width||800)/2,a=(n.height||600)/2,l=i-o,d=s-a,c=-this.viewRotation*Math.PI/180;i=o+(l*Math.cos(c)-d*Math.sin(c)),s=a+(l*Math.sin(c)+d*Math.cos(c))}const r=this.project.pixelsPerMeter*this.viewport.zoom;return{x:(i-this.viewport.x)/r,y:(s-this.viewport.y)/r}}worldToScreen(e){const t=this.project.pixelsPerMeter*this.viewport.zoom;return{x:e.x*t+this.viewport.x,y:e.y*t+this.viewport.y}}handleWheel(e){e.preventDefault();const t=this.getBoundingClientRect(),n=e.clientX-t.left,i=e.clientY-t.top;let s=n,r=i;if(!this.is3DMode&&this.viewRotation!==0){const c=(t.width||800)/2,h=(t.height||600)/2,f=n-c,u=i-h,p=-this.viewRotation*Math.PI/180;s=c+(f*Math.cos(p)-u*Math.sin(p)),r=h+(f*Math.sin(p)+u*Math.cos(p))}const o=e.deltaY<0?1.12:.89,a=Math.min(Math.max(this.viewport.zoom*o,.15),8),l=s-(s-this.viewport.x)*(a/this.viewport.zoom),d=r-(r-this.viewport.y)*(a/this.viewport.zoom);this.viewport={x:l,y:d,zoom:a}}handlePointerDown(e){if(this.is3DMode){if(e.button===1||e.button===0&&e.shiftKey){this.isPanning=!0,this.panStart={x:e.clientX-this.viewport.x,y:e.clientY-this.viewport.y},this.panStartPointer={x:e.clientX,y:e.clientY},this.panStartViewport={x:this.viewport.x,y:this.viewport.y},e.target.setPointerCapture?.(e.pointerId);return}if(e.button===2||e.button===0&&e.altKey){this.isOrbiting=!0,this.orbitStart={x:e.clientX,y:e.clientY},this.orbitStartPitch=this.orbitPitch,this.orbitStartYaw=this.orbitYaw,e.target.setPointerCapture?.(e.pointerId);return}if(e.button===0&&!e.target?.closest?.(".wall-element, .wall-element-3d, .room-group, .entity-pin, .opening-element, .furniture-group")){this.selectedElements={wallIds:[],openingIds:[],roomIds:[],bindingIds:[],furnitureIds:[]},this.dispatchSelectionChanged(),this.isOrbiting=!0,this.orbitStart={x:e.clientX,y:e.clientY},this.orbitStartPitch=this.orbitPitch,this.orbitStartYaw=this.orbitYaw,e.target.setPointerCapture?.(e.pointerId);return}return}if(e.button===1){this.isPanning=!0,this.panStart={x:e.clientX-this.viewport.x,y:e.clientY-this.viewport.y},this.panStartPointer={x:e.clientX,y:e.clientY},this.panStartViewport={x:this.viewport.x,y:this.viewport.y},e.target.setPointerCapture?.(e.pointerId);return}if(e.button!==0)return;const t=e.target;if(t?.closest?.(".canvas-hud, .coords-hud, .help-hud, button"))return;const n=!!t?.closest?.(".wall-element, .wall-element-3d, .room-group, .entity-pin, .opening-element, .furniture-group, .dimension-badge, .wall-dim-badge");if(t?.closest?.(".entity-pin, .furniture-group"))return;if(this.activeTool==="select"){if(n)return;if(e.shiftKey){const s=this.screenToWorld(e.clientX,e.clientY);this.isMarqueeSelecting=!0,this.marqueeStart=s,this.marqueeCurrent=s,e.target.setPointerCapture?.(e.pointerId);return}this.selectedElements={wallIds:[],openingIds:[],roomIds:[],bindingIds:[],furnitureIds:[]},this.dispatchSelectionChanged(),this.isPanning=!0,this.panStart={x:e.clientX-this.viewport.x,y:e.clientY-this.viewport.y},this.panStartPointer={x:e.clientX,y:e.clientY},this.panStartViewport={x:this.viewport.x,y:this.viewport.y},e.target.setPointerCapture?.(e.pointerId);return}if(e.shiftKey){this.isPanning=!0,this.panStart={x:e.clientX-this.viewport.x,y:e.clientY-this.viewport.y},this.panStartPointer={x:e.clientX,y:e.clientY},this.panStartViewport={x:this.viewport.x,y:this.viewport.y},e.target.setPointerCapture?.(e.pointerId);return}const i=this.screenToWorld(e.clientX,e.clientY);if(this.activeTool==="wall"){const s=A.snapPoint(i,this.project.grid,this.project.walls,this.drawingWallStart||void 0);if(!this.drawingWallStart)this.drawingWallStart=s.point;else{const r=this.drawingWallStart,o=s.point;if(A.distance(r,o)>=.15){const l={id:`wall_${Date.now()}_${Math.random().toString(36).substr(2,4)}`,start:{...r},end:{...o},thickness:this.currentWallThickness,type:"standard"};this.project={...this.project,walls:[...this.project.walls,l]},this.dispatchProjectChanged(),this.drawingWallStart=o}}}else if(this.activeTool==="door"||this.activeTool==="window"||this.activeTool==="french_window"){if(this.wallSnap){const s=this.activeTool==="window"?"window":this.activeTool==="french_window"?"french_window":"door",r=s==="door"?.9:s==="french_window"?2:this.windowSashCount===2?1.4:.9,o={id:`op_${Date.now()}_${Math.random().toString(36).substr(2,4)}`,wallId:this.wallSnap.wall.id,type:s,offset:A.roundMeters(this.wallSnap.offset),width:this.currentOpeningWidth||r,flipSide:this.openingFlipSide,flipDirection:this.openingFlipDirection,sashCount:s==="window"?this.windowSashCount||1:s==="french_window"?2:1};this.project={...this.project,openings:[...this.project.openings,o]},this.dispatchProjectChanged()}}else if(this.activeTool==="calibrate"){const s=this.getBoundingClientRect(),r={x:e.clientX-s.left,y:e.clientY-s.top};if(!this.calibrateStart)this.calibrateStart=r,this.calibrateCurrent=r;else{const o=r.x-this.calibrateStart.x,a=r.y-this.calibrateStart.y,l=Math.sqrt(o*o+a*a);if(l>=10){const d=l/this.viewport.zoom;this.dispatchEvent(new CustomEvent("request-calibration",{detail:{pixelDistance:d,defaultMeters:A.roundMeters(d/this.project.pixelsPerMeter)},bubbles:!0,composed:!0})),this.calibrateStart=null,this.calibrateCurrent=null}}}else if(this.activeTool==="rescale"){const s=this.screenToWorld(e.clientX,e.clientY);let r=A.snapPoint(s,this.project.grid,this.project.walls,this.rescaleStart||void 0);if(r.snappedTo==="none"&&this.project.walls.length>0){const o=A.snapPointToWall(s,this.project.walls,.6);o&&(r={point:o.projectionPoint,snappedTo:"vertex"})}if(!this.rescaleStart)this.rescaleStart=r.point,this.rescaleCurrent=r.point;else{const o=this.rescaleStart,a=r.point,l=A.distance(o,a);l>=.05&&(this.dispatchEvent(new CustomEvent("request-rescale",{detail:{measuredMeters:A.roundMeters(l)},bubbles:!0,composed:!0})),this.rescaleStart=null,this.rescaleCurrent=null,this.previewPoint=null)}}}handlePointerMove(e){if(this.resizingFurnitureId){this.resizeFurnitureMoved=!0;const n=(this.project.furniture||[]).find(i=>i.id===this.resizingFurnitureId);if(n){const i=this.screenToWorld(e.clientX,e.clientY),s=this.screenToWorld(this.resizeFurnitureStartPointer.x,this.resizeFurnitureStartPointer.y),r=i.x-s.x,o=i.y-s.y,a=(n.rotation||0)*Math.PI/180,l=Math.cos(a),d=Math.sin(a),c=r*l+o*d,h=-r*d+o*l;let f=Math.max(.2,this.resizeFurnitureInitialWidth+c),u=Math.max(.2,this.resizeFurnitureInitialLength+h);if(e.shiftKey&&this.resizeFurnitureInitialWidth>0&&this.resizeFurnitureInitialLength>0){const m=this.resizeFurnitureInitialLength/this.resizeFurnitureInitialWidth,g=Math.max(f/this.resizeFurnitureInitialWidth,u/this.resizeFurnitureInitialLength);f=Math.max(.2,this.resizeFurnitureInitialWidth*g),u=Math.max(.2,f*m)}f=Math.round(f*1e3)/1e3,u=Math.round(u*1e3)/1e3;const p=(this.project.furniture||[]).map(m=>m.id===this.resizingFurnitureId?{...m,width:f,length:u}:m);this.project={...this.project,furniture:p},this.requestUpdate()}return}if(this.rotatingFurnitureId){this.rotateFurnitureMoved=!0;const n=(this.project.furniture||[]).find(i=>i.id===this.rotatingFurnitureId);if(n){const i=this.screenToWorld(e.clientX,e.clientY),r=Math.atan2(i.y-n.position.y,i.x-n.position.x)*(180/Math.PI)-this.rotateFurnitureStartAngle;let o=Math.round(this.rotateFurnitureInitialAngle+r);o=(o%360+360)%360;const a=(this.project.furniture||[]).map(l=>l.id===this.rotatingFurnitureId?{...l,rotation:o}:l);this.project={...this.project,furniture:a},this.requestUpdate()}return}if(this.isOrbiting){const n=e.clientX-this.orbitStart.x,i=e.clientY-this.orbitStart.y;this.orbitYaw=(this.orbitStartYaw+n*.55)%360,this.orbitPitch=Math.max(15,Math.min(85,this.orbitStartPitch-i*.38)),this.requestUpdate();return}if(this.draggingFurnitureId){if(Math.hypot(e.clientX-this.dragFurnitureStartPos.x,e.clientY-this.dragFurnitureStartPos.y)>3){this.dragFurnitureMoved=!0;const i=this.screenToWorld(e.clientX,e.clientY),s=this.screenToWorld(this.dragFurnitureStartPos.x,this.dragFurnitureStartPos.y),r=i.x-s.x,o=i.y-s.y;let a=this.dragFurnitureItemStartPos.x+r,l=this.dragFurnitureItemStartPos.y+o;if(this.project.grid.snapToGrid&&e.altKey){const f=this.project.grid.size||.5;a=Math.round(a/f)*f,l=Math.round(l/f)*f}const d={x:Math.round(a*1e3)/1e3,y:Math.round(l*1e3)/1e3},c=H.findRoomContainingPoint(d,this.project.rooms),h=(this.project.furniture||[]).map(f=>f.id===this.draggingFurnitureId?{...f,position:d,roomId:c?.id}:f);this.project={...this.project,furniture:h},this.requestUpdate()}return}if(this.draggingWallId){if(Math.hypot(e.clientX-this.dragWallStartPointer.x,e.clientY-this.dragWallStartPointer.y)>3){this.dragWallMoved=!0;const i=this.screenToWorld(e.clientX,e.clientY),s=this.screenToWorld(this.dragWallStartPointer.x,this.dragWallStartPointer.y);let r=i.x-s.x,o=i.y-s.y;if(this.project.grid.snapToGrid){const l=this.project.grid.size||.5;r=Math.round(r/l)*l,o=Math.round(o/l)*l}const a=this.project.walls.map(l=>l.id===this.draggingWallId?{...l,start:{x:A.roundMeters(this.dragWallInitialStart.x+r),y:A.roundMeters(this.dragWallInitialStart.y+o)},end:{x:A.roundMeters(this.dragWallInitialEnd.x+r),y:A.roundMeters(this.dragWallInitialEnd.y+o)}}:l);this.project={...this.project,walls:a},this.requestUpdate()}return}if(this.draggingBindingId){if(Math.hypot(e.clientX-this.dragBindingStartPos.x,e.clientY-this.dragBindingStartPos.y)>3){this.dragBindingMoved=!0;const i=this.screenToWorld(e.clientX,e.clientY),s=H.findRoomContainingPoint(i,this.project.rooms),r=this.project.bindings.map(o=>o.id===this.draggingBindingId?{...o,position:{x:A.roundMeters(i.x),y:A.roundMeters(i.y)},roomId:s?.id}:o);this.project={...this.project,bindings:r},this.requestUpdate()}return}if(this.isMarqueeSelecting&&this.marqueeStart){this.marqueeCurrent=this.screenToWorld(e.clientX,e.clientY),this.requestUpdate();return}if(this.isPanning){let n=e.clientX-this.panStartPointer.x,i=e.clientY-this.panStartPointer.y;if(!this.is3DMode&&this.viewRotation!==0){const s=-this.viewRotation*Math.PI/180,r=n*Math.cos(s)-i*Math.sin(s),o=n*Math.sin(s)+i*Math.cos(s);n=r,i=o}this.viewport={...this.viewport,x:this.panStartViewport.x+n,y:this.panStartViewport.y+i};return}const t=this.screenToWorld(e.clientX,e.clientY);if(this.cursorCoords={x:A.roundMeters(t.x),y:A.roundMeters(t.y)},this.activeTool==="wall"){const n=A.snapPoint(t,this.project.grid,this.project.walls,this.drawingWallStart||void 0);this.previewPoint=n.point,this.snapInfo={snappedTo:n.snappedTo,guideAngle:n.guideAngle,smartGuideX:n.smartGuideX,smartGuideY:n.smartGuideY},this.wallSnap=null}else if(this.activeTool==="door"||this.activeTool==="window"||this.activeTool==="french_window")this.wallSnap=A.snapPointToWall(t,this.project.walls,.8),this.previewPoint=null;else if(this.activeTool==="calibrate"&&this.calibrateStart){const n=this.getBoundingClientRect();this.calibrateCurrent={x:e.clientX-n.left,y:e.clientY-n.top}}else if(this.activeTool==="rescale"){let n=A.snapPoint(t,this.project.grid,this.project.walls,this.rescaleStart||void 0);if(n.snappedTo==="none"&&this.project.walls.length>0){const i=A.snapPointToWall(t,this.project.walls,.6);i&&(n={point:i.projectionPoint,snappedTo:"vertex"})}this.previewPoint=n.point,this.snapInfo={snappedTo:n.snappedTo,guideAngle:n.guideAngle,smartGuideX:n.smartGuideX,smartGuideY:n.smartGuideY},this.wallSnap=null,this.rescaleStart&&(this.rescaleCurrent=n.point)}else this.previewPoint=null,this.wallSnap=null}handlePointerUp(e){if(this.resizingFurnitureId){const t=this.resizeFurnitureMoved;this.resizingFurnitureId=null,this.resizeFurnitureMoved=!1;try{e.target.releasePointerCapture?.(e.pointerId)}catch{}if(t){this.dispatchProjectChanged();return}}if(this.rotatingFurnitureId){const t=this.rotateFurnitureMoved;this.rotatingFurnitureId=null,this.rotateFurnitureMoved=!1;try{e.target.releasePointerCapture?.(e.pointerId)}catch{}if(t){this.dispatchProjectChanged();return}}if(this.draggingFurnitureId){const t=this.dragFurnitureMoved;this.draggingFurnitureId=null,this.dragFurnitureMoved=!1;try{e.target.releasePointerCapture?.(e.pointerId)}catch{}if(t){this.dispatchProjectChanged();return}}if(this.draggingWallId){const t=this.dragWallMoved;this.draggingWallId=null,this.dragWallMoved=!1;try{e.target.releasePointerCapture?.(e.pointerId)}catch{}if(t){this.dispatchProjectChanged();return}}if(this.draggingBindingId){const t=this.dragBindingMoved;this.draggingBindingId=null;const n=this.shadowRoot?.querySelector(".canvas-container");try{n?.releasePointerCapture?.(e.pointerId)}catch{}try{e.target?.releasePointerCapture?.(e.pointerId)}catch{}if(t){setTimeout(()=>{this.dragBindingMoved=!1},150),this.dispatchProjectChanged();return}else this.dragBindingMoved=!1}if(this.isOrbiting){this.isOrbiting=!1,e.target.releasePointerCapture?.(e.pointerId);return}if(this.isMarqueeSelecting&&this.marqueeStart&&this.marqueeCurrent){const t=Math.min(this.marqueeStart.x,this.marqueeCurrent.x),n=Math.max(this.marqueeStart.x,this.marqueeCurrent.x),i=Math.min(this.marqueeStart.y,this.marqueeCurrent.y),s=Math.max(this.marqueeStart.y,this.marqueeCurrent.y);if(n-t>.05||s-i>.05){const r=this.project.walls.filter(c=>{const h=(c.start.x+c.end.x)/2,f=(c.start.y+c.end.y)/2;return h>=t&&h<=n&&f>=i&&f<=s}).map(c=>c.id),o=this.project.openings.filter(c=>{const h=this.project.walls.find(x=>x.id===c.wallId);if(!h)return!1;const f=h.end.x-h.start.x,u=h.end.y-h.start.y,p=Math.sqrt(f*f+u*u);if(p===0)return!1;const m=h.start.x+c.offset/p*f,g=h.start.y+c.offset/p*u;return m>=t&&m<=n&&g>=i&&g<=s}).map(c=>c.id),a=this.project.rooms.filter(c=>{if(!c.polygon||c.polygon.length<3)return!1;const h=H.calculateCentroid(c.polygon);return h.x>=t&&h.x<=n&&h.y>=i&&h.y<=s}).map(c=>c.id),l=this.project.bindings.filter(c=>c.position.x>=t&&c.position.x<=n&&c.position.y>=i&&c.position.y<=s).map(c=>c.id),d=(this.project.furniture||[]).filter(c=>c.position.x>=t&&c.position.x<=n&&c.position.y>=i&&c.position.y<=s).map(c=>c.id);this.selectedElements={wallIds:Array.from(new Set([...this.selectedElements.wallIds,...r])),openingIds:Array.from(new Set([...this.selectedElements.openingIds,...o])),roomIds:Array.from(new Set([...this.selectedElements.roomIds,...a])),bindingIds:Array.from(new Set([...this.selectedElements.bindingIds,...l])),furnitureIds:Array.from(new Set([...this.selectedElements.furnitureIds||[],...d]))},this.dispatchSelectionChanged()}this.isMarqueeSelecting=!1,this.marqueeStart=null,this.marqueeCurrent=null,e.target.releasePointerCapture?.(e.pointerId);return}this.isPanning&&(this.isPanning=!1,e.target.releasePointerCapture?.(e.pointerId))}handleDragOver(e){e.preventDefault(),e.dataTransfer&&(e.dataTransfer.dropEffect="copy")}handleDrop(e){if(e.preventDefault(),e.dataTransfer?.files&&e.dataTransfer.files.length>0){const n=e.dataTransfer.files[0];if(n.type.startsWith("image/")||n.name.toLowerCase().endsWith(".svg")){const i=new FileReader;i.onload=s=>{const r=s.target?.result;this.dispatchEvent(new CustomEvent("background-image-loaded",{detail:{dataUrl:r},bubbles:!0,composed:!0}))},i.readAsDataURL(n);return}}const t=e.dataTransfer?.getData("application/json");if(t)try{const n=JSON.parse(t);if(n.kind==="furniture"){const c=pt(n.furnitureType);if(c){const h=this.screenToWorld(e.clientX,e.clientY),f=H.findRoomContainingPoint(h,this.project.rooms),u={id:`furn_${Date.now()}_${Math.random().toString(36).substr(2,4)}`,type:c.type,name:c.name,category:c.category,position:{x:A.roundMeters(h.x),y:A.roundMeters(h.y)},width:c.width,length:c.length,rotation:0,color:c.defaultColor,icon:c.icon,roomId:f?.id};this.project={...this.project,furniture:[...this.project.furniture||[],u]},this.selectedElements={wallIds:[],openingIds:[],roomIds:[],bindingIds:[],furnitureIds:[u.id]},this.dispatchSelectionChanged(),this.dispatchProjectChanged();return}}const{entityId:i,domain:s,name:r,icon:o}=n,a=this.screenToWorld(e.clientX,e.clientY),l=H.findRoomContainingPoint(a,this.project.rooms),d={id:`bind_${Date.now()}_${Math.random().toString(36).substr(2,4)}`,entityId:i,position:{x:A.roundMeters(a.x),y:A.roundMeters(a.y)},roomId:l?.id,icon:o,customName:r,tapAction:"toggle"};this.project={...this.project,bindings:[...this.project.bindings,d]},this.dispatchProjectChanged()}catch(n){console.error("Erreur lors de la liaison entité/meuble:",n)}}dispatchSelectionChanged(){this.dispatchEvent(new CustomEvent("selection-changed",{detail:{selectedElements:this.selectedElements},bubbles:!0,composed:!0})),this.requestUpdate()}handleWallPointerDown(e,t){if(this.isDashboardMode||t.button!==0||this.activeTool!=="select")return;t.stopPropagation(),this.draggingWallId=e.id,this.dragWallMoved=!1,this.dragWallStartPointer={x:t.clientX,y:t.clientY},this.dragWallInitialStart={...e.start},this.dragWallInitialEnd={...e.end};const n=t.shiftKey||t.ctrlKey||t.metaKey,i=this.selectedElements.wallIds.includes(e.id);if(n){const s=i?this.selectedElements.wallIds.filter(r=>r!==e.id):[...this.selectedElements.wallIds,e.id];this.selectedElements={...this.selectedElements,wallIds:s}}else i||(this.selectedElements={wallIds:[e.id],openingIds:[],roomIds:[],bindingIds:[],furnitureIds:[]});this.dispatchSelectionChanged(),t.currentTarget?.setPointerCapture?.(t.pointerId)}handleWallClick(e,t){if(this.activeTool!=="select"||this.dragWallMoved)return;e.stopPropagation();const n=e.shiftKey||e.ctrlKey||e.metaKey,i=this.selectedElements.wallIds.includes(t.id);if(n){const s=i?this.selectedElements.wallIds.filter(r=>r!==t.id):[...this.selectedElements.wallIds,t.id];this.selectedElements={...this.selectedElements,wallIds:s}}else this.selectedElements={wallIds:[t.id],openingIds:[],roomIds:[],bindingIds:[],furnitureIds:[]};this.dispatchSelectionChanged()}handleOpeningClick(e,t){if(this.activeTool!=="select")return;e.stopPropagation();const n=e.shiftKey||e.ctrlKey||e.metaKey,i=this.selectedElements.openingIds.includes(t.id);if(n){const s=i?this.selectedElements.openingIds.filter(r=>r!==t.id):[...this.selectedElements.openingIds,t.id];this.selectedElements={...this.selectedElements,openingIds:s}}else this.selectedElements={wallIds:[],openingIds:[t.id],roomIds:[],bindingIds:[],furnitureIds:[]};this.dispatchSelectionChanged()}handleFurnitureRotatePointerDown(e,t){if(this.isDashboardMode||t.button!==0)return;t.stopPropagation(),this.rotatingFurnitureId=e.id,this.rotateFurnitureMoved=!1;const n=this.screenToWorld(t.clientX,t.clientY);this.rotateFurnitureStartAngle=Math.atan2(n.y-e.position.y,n.x-e.position.x)*(180/Math.PI),this.rotateFurnitureInitialAngle=e.rotation||0,this.selectedElements.furnitureIds?.includes(e.id)||(this.selectedElements={wallIds:[],openingIds:[],roomIds:[],bindingIds:[],furnitureIds:[e.id]},this.dispatchSelectionChanged());try{t.currentTarget?.setPointerCapture?.(t.pointerId)}catch{}}handleFurnitureResizePointerDown(e,t){if(this.isDashboardMode||t.button!==0)return;t.stopPropagation(),this.resizingFurnitureId=e.id,this.resizeFurnitureMoved=!1,this.resizeFurnitureStartPointer={x:t.clientX,y:t.clientY};const n=pt(e.type);this.resizeFurnitureInitialWidth=e.width||n?.width||1,this.resizeFurnitureInitialLength=e.length||n?.length||1,this.selectedElements.furnitureIds?.includes(e.id)||(this.selectedElements={wallIds:[],openingIds:[],roomIds:[],bindingIds:[],furnitureIds:[e.id]},this.dispatchSelectionChanged());try{t.currentTarget?.setPointerCapture?.(t.pointerId)}catch{}}handleFurniturePointerDown(e,t){if(this.isDashboardMode||t.button!==0||this.activeTool!=="select")return;t.stopPropagation(),this.draggingFurnitureId=e.id,this.dragFurnitureMoved=!1,this.dragFurnitureStartPos={x:t.clientX,y:t.clientY},this.dragFurnitureItemStartPos={...e.position};const n=t.shiftKey||t.ctrlKey||t.metaKey,i=this.selectedElements.furnitureIds?.includes(e.id)||!1;if(n){const s=i?(this.selectedElements.furnitureIds||[]).filter(r=>r!==e.id):[...this.selectedElements.furnitureIds||[],e.id];this.selectedElements={...this.selectedElements,furnitureIds:s}}else i||(this.selectedElements={wallIds:[],openingIds:[],roomIds:[],bindingIds:[],furnitureIds:[e.id]});this.dispatchSelectionChanged(),t.currentTarget?.setPointerCapture?.(t.pointerId)}handleFurnitureClick(e,t){if(this.activeTool!=="select"||this.dragFurnitureMoved)return;e.stopPropagation();const n=e.shiftKey||e.ctrlKey||e.metaKey,i=this.selectedElements.furnitureIds?.includes(t.id)||!1;if(n){const s=i?(this.selectedElements.furnitureIds||[]).filter(r=>r!==t.id):[...this.selectedElements.furnitureIds||[],t.id];this.selectedElements={...this.selectedElements,furnitureIds:s}}else this.selectedElements={wallIds:[],openingIds:[],roomIds:[],bindingIds:[],furnitureIds:[t.id]};this.dispatchSelectionChanged()}renderMarqueeBox(){if(!this.isMarqueeSelecting||!this.marqueeStart||!this.marqueeCurrent)return null;const e=this.worldToScreen(this.marqueeStart),t=this.worldToScreen(this.marqueeCurrent),n=Math.min(e.x,t.x),i=Math.min(e.y,t.y),s=Math.abs(e.x-t.x),r=Math.abs(e.y-t.y);return M`
      <rect 
        class="marquee-selection-box"
        x="${n}" 
        y="${i}" 
        width="${s}" 
        height="${r}" 
      />
    `}handleEntityPointerDown(e,t){if(this.isDashboardMode||t.button!==0)return;t.stopPropagation(),this.draggingBindingId=e.id,this.dragBindingMoved=!1,this.dragBindingStartPos={x:t.clientX,y:t.clientY};const n=t,i=n.shiftKey||n.ctrlKey||n.metaKey,s=this.selectedElements.bindingIds.includes(e.id);if(i){const o=s?this.selectedElements.bindingIds.filter(a=>a!==e.id):[...this.selectedElements.bindingIds,e.id];this.selectedElements={...this.selectedElements,bindingIds:o}}else this.selectedElements={wallIds:[],openingIds:[],roomIds:[],bindingIds:[e.id],furnitureIds:[]};this.dispatchSelectionChanged();const r=this.shadowRoot?.querySelector(".canvas-container");try{r?.setPointerCapture?.(t.pointerId)}catch{}}executeEntityTapAction(e){const t=(e.entityId||"").split(".")[0],n=["light","switch","input_boolean","fan"],i=["lock","alarm_control_panel","camera","climate","media_player","sensor","binary_sensor","device_tracker"];if(e.tapAction==="more-info"||i.includes(t)){this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:e.entityId},bubbles:!0,composed:!0}));return}this.hass&&this.hass.callService&&(n.includes(t)?this.hass.callService(t,"toggle",{entity_id:e.entityId}).catch(()=>{this.hass.callService("homeassistant","toggle",{entity_id:e.entityId})}):t==="cover"?this.hass.callService("cover","toggle",{entity_id:e.entityId}).catch(()=>{this.hass.callService("homeassistant","toggle",{entity_id:e.entityId})}):t==="scene"?this.hass.callService("scene","turn_on",{entity_id:e.entityId}):t==="script"?this.hass.callService("script","turn_on",{entity_id:e.entityId}):t==="button"||t==="input_button"?this.hass.callService("button","press",{entity_id:e.entityId}):this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:e.entityId},bubbles:!0,composed:!0})))}handleEntityClick(e,t){if(t.stopPropagation(),!this.dragBindingMoved){if(this.isDashboardMode){this.executeEntityTapAction(e);return}if(this.activeTool==="select"){const n=t,i=n.shiftKey||n.ctrlKey||n.metaKey,s=this.selectedElements.bindingIds.includes(e.id);if(i){const r=s?this.selectedElements.bindingIds.filter(o=>o!==e.id):[...this.selectedElements.bindingIds,e.id];this.selectedElements={...this.selectedElements,bindingIds:r}}else this.selectedElements={wallIds:[],openingIds:[],roomIds:[],bindingIds:[e.id]};this.dispatchSelectionChanged();return}this.executeEntityTapAction(e)}}handleEntityDblClick(e,t){t.stopPropagation(),this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:e.entityId},bubbles:!0,composed:!0}))}rotateSelectedFurniture(){if(!this.selectedElements.furnitureIds||this.selectedElements.furnitureIds.length===0)return;const e=this.selectedElements.furnitureIds,t=(this.project.furniture||[]).map(n=>e.includes(n.id)?{...n,rotation:((n.rotation||0)+90)%360}:n);this.project={...this.project,furniture:t},this.dispatchProjectChanged(),this.requestUpdate()}handleKeyDown(e){e.key==="Escape"?(this.drawingWallStart=null,this.previewPoint=null,this.calibrateStart=null,this.calibrateCurrent=null,this.rescaleStart=null,this.rescaleCurrent=null,this.wallSnap=null,this.selectedElements={wallIds:[],openingIds:[],roomIds:[],bindingIds:[],furnitureIds:[]},this.dispatchSelectionChanged(),this.requestUpdate()):e.key===" "||e.key==="Spacebar"?this.wallSnap&&(e.preventDefault(),this.openingFlipSide=!this.openingFlipSide,this.requestUpdate()):e.key.toLowerCase()==="f"?this.wallSnap&&(this.openingFlipDirection=!this.openingFlipDirection,this.requestUpdate()):e.key.toLowerCase()==="r"&&this.selectedElements.furnitureIds&&this.selectedElements.furnitureIds.length>0&&(e.preventDefault(),this.rotateSelectedFurniture())}connectedCallback(){super.connectedCallback(),this._boundKeyDown=this.handleKeyDown.bind(this),window.addEventListener("keydown",this._boundKeyDown),typeof ResizeObserver<"u"&&(this._canvasResizeObserver=new ResizeObserver(()=>{this.requestUpdate()}),this._canvasResizeObserver.observe(this))}disconnectedCallback(){super.disconnectedCallback(),this._boundKeyDown&&window.removeEventListener("keydown",this._boundKeyDown),this._canvasResizeObserver&&(this._canvasResizeObserver.disconnect(),this._canvasResizeObserver=null)}firstUpdated(){setTimeout(()=>{this.project&&(this.project.walls?.length>0||this.project.rooms?.length>0)&&this.fitToScreen()},150)}updated(e){if(super.updated(e),e.has("project")){const t=e.get("project");t&&this.project&&t.id!==this.project.id&&setTimeout(()=>this.fitToScreen(),80)}}dispatchProjectChanged(){this.dispatchEvent(new CustomEvent("project-changed",{detail:{project:this.project},bubbles:!0,composed:!0}))}computeWallPolygon(e,t,n){const i=t.x-e.x,s=t.y-e.y,r=Math.sqrt(i*i+s*s);if(r===0)return[e,e,t,t];const o=n/2,a=-s/r*o,l=i/r*o;return[{x:e.x+a,y:e.y+l},{x:t.x+a,y:t.y+l},{x:t.x-a,y:t.y-l},{x:e.x-a,y:e.y-l}]}renderBackgroundLayer(){const e=this.project.background;if(!e||!e.imageUrl||!e.visible)return null;const t=this.worldToScreen(e.offset||{x:0,y:0}),n=e.scale||1;return M`
      <g 
        class="background-image-layer" 
        transform="translate(${t.x}, ${t.y}) scale(${this.viewport.zoom*n})"
        style="opacity: ${e.opacity};"
      >
        <image 
          href="${e.imageUrl}" 
          x="0" 
          y="0" 
          width="${e.widthPx||1200}" 
          height="${e.heightPx||900}" 
        />
      </g>
    `}pointToSegmentDistance(e,t,n){const i=n.x-t.x,s=n.y-t.y,r=i*i+s*s;if(r===0)return A.distance(e,t);let o=((e.x-t.x)*i+(e.y-t.y)*s)/r;o=Math.max(0,Math.min(1,o));const a={x:t.x+o*i,y:t.y+o*s};return A.distance(e,a)}getWallHeight(e){const t=this.project.defaultCeilingHeight||2.5,n={x:(e.start.x+e.end.x)/2,y:(e.start.y+e.end.y)/2},i=(this.project.rooms||[]).filter(s=>{if(!s.polygon||s.polygon.length<3)return!1;if(H.isPointInPolygon(n,s.polygon))return!0;for(let r=0;r<s.polygon.length;r++){const o=s.polygon[r],a=s.polygon[(r+1)%s.polygon.length];if(this.pointToSegmentDistance(n,o,a)<=e.thickness/2+.35)return!0}return!1});if(i.length>0){const s=i.map(r=>r.height||t);return Math.max(...s,e.height||0)}return e.height||t}handleRoomClick(e,t){if(!(this.drawingWallStart||this.calibrateStart||this.rescaleStart)){if(e.stopPropagation(),this.activeTool==="select"){const n=e.shiftKey||e.ctrlKey||e.metaKey,i=this.selectedElements.roomIds.includes(t.id);if(n){const s=i?this.selectedElements.roomIds.filter(r=>r!==t.id):[...this.selectedElements.roomIds,t.id];this.selectedElements={...this.selectedElements,roomIds:s}}else this.selectedElements={wallIds:[],openingIds:[],roomIds:[t.id],bindingIds:[]};this.dispatchSelectionChanged();return}this.dispatchEvent(new CustomEvent("room-selected",{detail:{room:t},bubbles:!0,composed:!0}))}}handleRoomDblClick(e,t){e.stopPropagation(),this.dispatchEvent(new CustomEvent("room-selected",{detail:{room:t},bubbles:!0,composed:!0}))}renderRooms(){return this.project.rooms.map(e=>{if(!e.polygon||e.polygon.length<3)return null;const t=e.polygon.map(u=>this.worldToScreen(u)),n=t.map(u=>`${u.x},${u.y}`).join(" "),i=this.project.bindings.filter(u=>u.roomId===e.id&&u.entityId.startsWith("light.")).map(u=>this.hass?.states?.[u.entityId]).filter(u=>u&&u.state==="on"),s=i.length>0;let r=null;if(s){const u=i[0],p=u.attributes?.rgb_color||[255,240,180],g=.12+(u.attributes?.brightness!==void 0?u.attributes.brightness:255)/255*.22;r=`rgba(${p[0]}, ${p[1]}, ${p[2]}, ${g.toFixed(2)})`}let o=null;const a=this.project.bindings.find(u=>u.roomId===e.id&&(u.entityId.startsWith("climate.")||u.entityId.startsWith("sensor.")&&(u.entityId.toLowerCase().includes("temp")||u.customName?.toLowerCase().includes("temp"))));if(a){const u=this.hass?.states?.[a.entityId];if(u)if(a.entityId.startsWith("climate.")){const p=u.attributes?.current_temperature??u.state;isNaN(parseFloat(p))||(o=parseFloat(p))}else isNaN(parseFloat(u.state))||(o=parseFloat(u.state))}let l=e.color||"rgba(56, 189, 248, 0.12)";this.showThermalHeatmap&&o!==null?o<18?l="rgba(59, 130, 246, 0.38)":o<20?l="rgba(14, 165, 233, 0.32)":o<22?l="rgba(16, 185, 129, 0.30)":o<24?l="rgba(245, 158, 11, 0.34)":l="rgba(239, 68, 68, 0.40)":r&&(l=r);const d=H.calculateCentroid(t),c=e.height||this.project.defaultCeilingHeight||2.5,h=(e.areaM2*c).toFixed(1),f=this.selectedElements?.roomIds?.includes(e.id);return M`
        <g 
          class="room-group ${f?"selected":""}" 
          data-room-id="${e.id}" 
          @click=${u=>this.handleRoomClick(u,e)}
          @dblclick=${u=>this.handleRoomDblClick(u,e)}
        >
          <polygon 
            points="${n}" 
            class="room-polygon ${s?"illuminated":""}"
            style="fill: ${l}; cursor: pointer; transition: fill 0.3s ease;"
          />
          ${this.is3DMode?M`
            <g class="room-3d-badge-group" transform="translate(${d.x}, ${d.y})">
              <rect 
                x="-62" 
                y="-30" 
                width="124" 
                height="60" 
                rx="10" 
                ry="10" 
                fill="rgba(15, 23, 42, 0.84)" 
                stroke="${f?"#38bdf8":"rgba(56, 189, 248, 0.4)"}" 
                stroke-width="${f?2:1}"
                filter="drop-shadow(0 6px 14px rgba(0, 0, 0, 0.6))"
              />
              <text class="room-label-name" y="-12" style="font-size: 12px; font-weight: 700; fill: #f8fafc; text-anchor: middle;">
                ${e.name}
              </text>
              <text class="room-label-area" y="6" style="font-size: 11px; font-weight: 700; fill: #38bdf8; text-anchor: middle; font-family: ui-monospace, SFMono-Regular, monospace;">
                ${e.areaM2.toFixed(1)} m²
              </text>
              <text class="room-label-height" y="21" style="font-size: 9.5px; font-weight: 600; fill: #a5f3fc; text-anchor: middle; font-family: ui-monospace, SFMono-Regular, monospace;">
                H: ${c.toFixed(2)}m · ${h} m³
              </text>
            </g>
          `:M`
            <g class="room-label-group" transform="translate(${d.x}, ${d.y})">
              <text class="room-label-name" y="${o!==null?-10:-6}">${e.name}</text>
              <text class="room-label-area" y="${o!==null?6:12}">${e.areaM2.toFixed(1)} m²</text>
              ${o!==null?M`
                <text class="room-label-temp" y="21" style="font-size: 9.5px; font-weight: 700; fill: #facc15; text-anchor: middle; font-family: ui-monospace, SFMono-Regular, monospace;">
                  🌡️ ${o.toFixed(1)}°C
                </text>
              `:null}
            </g>
          `}
        </g>
      `})}renderGrid(){if(this.is3DMode)return M`
        <defs>
          <radialGradient id="ground-shadow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="rgba(0, 0, 0, 0.45)" />
            <stop offset="65%" stop-color="rgba(0, 0, 0, 0.15)" />
            <stop offset="100%" stop-color="rgba(0, 0, 0, 0)" />
          </radialGradient>
          <pattern id="grid-dots-3d" width="40" height="40" patternUnits="userSpaceOnUse"
            patternTransform="translate(${this.viewport.x%40}, ${this.viewport.y%40})">
            <circle cx="20" cy="20" r="1.2" fill="rgba(255, 255, 255, 0.08)" />
          </pattern>
        </defs>
        <!-- Grille de repère architectural au sol -->
        <rect x="-4000" y="-4000" width="8000" height="8000" fill="url(#grid-dots-3d)" />
        <!-- Ombre portée architecturale sous le bâtiment -->
        <ellipse cx="${this.viewport.x+300}" cy="${this.viewport.y+200}" rx="900" ry="550" fill="url(#ground-shadow)" />
      `;const e=this.project.pixelsPerMeter*this.viewport.zoom,n=(this.project.grid.size||.5)*e;if(n<12)return null;const i=n*2;return M`
      <defs>
        <pattern id="grid-sub" width="${n}" height="${n}" patternUnits="userSpaceOnUse"
          patternTransform="translate(${this.viewport.x%n}, ${this.viewport.y%n})">
          <line x1="0" y1="0" x2="${n}" y2="0" stroke="rgba(255,255,255,0.06)" stroke-width="0.5" />
          <line x1="0" y1="0" x2="0" y2="${n}" stroke="rgba(255,255,255,0.06)" stroke-width="0.5" />
        </pattern>
        <pattern id="grid-major" width="${i}" height="${i}" patternUnits="userSpaceOnUse"
          patternTransform="translate(${this.viewport.x%i}, ${this.viewport.y%i})">
          <line x1="0" y1="0" x2="${i}" y2="0" stroke="rgba(255,255,255,0.14)" stroke-width="1" />
          <line x1="0" y1="0" x2="0" y2="${i}" stroke="rgba(255,255,255,0.14)" stroke-width="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid-sub)" />
      <rect width="100%" height="100%" fill="url(#grid-major)" />
    `}renderWalls(){const e=this.project.pixelsPerMeter*this.viewport.zoom;return this.project.walls.map(t=>{const n=this.selectedElements?.wallIds?.includes(t.id),i=this.getWallHeight(t),s=this.is3DMode?i*e*.55:0,o=this.computeWallPolygon(t.start,t.end,t.thickness).map(x=>this.worldToScreen(x)),a=this.worldToScreen(t.start),l=this.worldToScreen(t.end),d=o.map(x=>`${x.x},${x.y}`).join(" "),c=A.distance(t.start,t.end),h={x:(a.x+l.x)/2,y:(a.y+l.y)/2};if(this.is3DMode){const x=o.map(v=>({x:v.x,y:v.y-s})),b=x.map(v=>`${v.x},${v.y}`).join(" "),w=[0,1,2,3].map(v=>{const k=(v+1)%4,D=o[v],Y=o[k],B=x[k],W=x[v],L=Y.x-D.x,K=Y.y-D.y,vt=Math.sqrt(L*L+K*K)||1,Un=-K/vt,Yn=L/vt,we=Math.max(-1,Math.min(1,Un*-.7+Yn*-.7)),te=Math.round(n?42+we*14:34+we*16),Xn=n?`hsl(192, 85%, ${te}%)`:`hsl(215, 22%, ${te}%)`,Bn=n?"#38bdf8":`hsl(215, 22%, ${te+6}%)`;return{pts:`${D.x},${D.y} ${Y.x},${Y.y} ${B.x},${B.y} ${W.x},${W.y}`,fill:Xn,stroke:Bn}}),$=n?"#06b6d4":"#f1f5f9",y=n?"#22d3ee":"#94a3b8";return M`
          <g 
            class="wall-element-3d ${n?"selected":""}" 
            data-wall-id="${t.id}"
            @click=${v=>this.handleWallClick(v,t)}
            style="cursor: pointer;"
          >
            <!-- 4 parois verticales solides -->
            ${w.map(v=>M`
              <polygon points="${v.pts}" style="fill: ${v.fill}; stroke: ${v.stroke}; stroke-width: 0.8; stroke-linejoin: round;" />
            `)}
            <!-- Chapeau supérieur du mur -->
            <polygon points="${b}" style="fill: ${$}; stroke: ${y}; stroke-width: 1.2; stroke-linejoin: round;" />
          </g>
        `}const f=l.x-a.x,u=l.y-a.y,p=Math.hypot(f,u)||1,m=-u/p,g=f/p;return M`
        <g 
          class="wall-element ${n?"selected":""}" 
          data-wall-id="${t.id}"
          @pointerdown=${x=>this.handleWallPointerDown(t,x)}
          @click=${x=>this.handleWallClick(x,t)}
        >
          <polygon points="${d}" class="wall-rect" />
          <line x1="${a.x}" y1="${a.y}" x2="${l.x}" y2="${l.y}" class="wall-centerline" />
          
          ${this.showDimensions&&c>=.4?M`
            <g class="wall-dim-badge" transform="translate(${h.x+m*14}, ${h.y+g*14})">
              <rect x="-24" y="-9" width="48" height="18" />
              <text>${A.roundMeters(c).toFixed(2)} m</text>
            </g>
          `:null}
        </g>
      `})}renderOpenings(){return this.project.openings.map(e=>{const t=this.selectedElements?.openingIds?.includes(e.id),n=this.project.walls.find(p=>p.id===e.wallId);if(!n)return null;const i=n.end.x-n.start.x,s=n.end.y-n.start.y,r=Math.sqrt(i*i+s*s);if(r===0)return null;const a=Math.atan2(s,i)*180/Math.PI,l=n.start.x+e.offset/r*i,d=n.start.y+e.offset/r*s,c=this.worldToScreen({x:l,y:d}),h=this.project.pixelsPerMeter*this.viewport.zoom,f=e.width*h,u=n.thickness*h;return M`
        <g 
          class="opening-element ${t?"selected":""}" 
          transform="translate(${c.x}, ${c.y}) rotate(${a})"
          style="cursor: pointer;"
          @click=${p=>this.handleOpeningClick(p,e)}
        >
          <rect 
            x="${-f/2}" 
            y="${-u/2-1}" 
            width="${f}" 
            height="${u+2}" 
            class="wall-cutout"
          />

          ${e.type==="door"?this.renderDoorSymbol(f,u,e.flipSide,e.flipDirection):null}
          ${e.type==="window"?this.renderWindowSymbol(f,u,e.sashCount||(e.width>=1.25?2:1)):null}
          ${e.type==="french_window"?this.renderFrenchWindowSymbol(f,u):null}
        </g>
      `})}renderDoorSymbol(e,t,n,i){const s=e/2,r=n?-1:1,o=i?s:-s,a=i?-1:1;return M`
      <g>
        <rect x="${-s}" y="${-t/2}" width="4" height="${t}" fill="#94a3b8" />
        <rect x="${s-4}" y="${-t/2}" width="4" height="${t}" fill="#94a3b8" />
        <line 
          x1="${o}" 
          y1="0" 
          x2="${o}" 
          y2="${r*e}" 
          class="opening-door-leaf" 
        />
        <path 
          d="M ${o+a*e} 0 A ${e} ${e} 0 0 ${r>0?i?0:1:i?1:0} ${o} ${r*e}" 
          class="opening-door-arc" 
        />
      </g>
    `}renderWindowSymbol(e,t,n=1){const i=e/2;return n===2?M`
        <g>
          <rect x="${-i}" y="${-t/2}" width="${e}" height="${t}" fill="none" class="opening-window-frame" />
          <line x1="${-i}" y1="0" x2="${i}" y2="0" class="opening-window-glass" />
          <line x1="0" y1="${-t/2}" x2="0" y2="${t/2}" stroke="#38bdf8" stroke-width="2.5" />
          <line x1="${-i+4}" y1="${-t/4}" x2="-3" y2="${-t/4}" stroke="rgba(56, 189, 248, 0.45)" stroke-width="1.2" />
          <line x1="3" y1="${t/4}" x2="${i-4}" y2="${t/4}" stroke="rgba(56, 189, 248, 0.45)" stroke-width="1.2" />
        </g>
      `:M`
      <g>
        <rect x="${-i}" y="${-t/2}" width="${e}" height="${t}" fill="none" class="opening-window-frame" />
        <line x1="${-i}" y1="0" x2="${i}" y2="0" class="opening-window-glass" />
        <line x1="${-i+4}" y1="${-t/4}" x2="${i-4}" y2="${-t/4}" stroke="rgba(56, 189, 248, 0.4)" stroke-width="1" />
        <line x1="${-i+4}" y1="${t/4}" x2="${i-4}" y2="${t/4}" stroke="rgba(56, 189, 248, 0.4)" stroke-width="1" />
      </g>
    `}renderFrenchWindowSymbol(e,t){const n=e/2;return M`
      <g>
        <rect x="${-n}" y="${-t/2}" width="${e}" height="${t}" fill="none" class="opening-window-frame" />
        <rect x="${-n}" y="${-t/4}" width="${n}" height="3" fill="#38bdf8" />
        <rect x="0" y="${t/4}" width="${n}" height="3" fill="#38bdf8" />
      </g>
    `}getEntityDisplayState(e){const t=this.hass?.states?.[e.entityId];if(!t)return{text:"Inactif",statusClass:"off"};const n=t.state;if(n==="unavailable")return{text:"Indisponible",statusClass:"off"};if(n==="unknown")return{text:"Inconnu",statusClass:"off"};const i=e.entityId.split(".")[0],s=t.attributes||{},r=s.device_class||"";if(i==="light"){if(n==="on"){const o=s.brightness?Math.round(s.brightness/255*100):null;return{text:o!==null?`Allumé (${o}%)`:"Allumé",statusClass:"on"}}return{text:"Éteint",statusClass:"off"}}if(i==="switch")return n==="on"?{text:"Actif",statusClass:"on"}:{text:"Éteint",statusClass:"off"};if(i==="binary_sensor"){const o=r==="motion"||r==="occupancy"||r==="presence"||e.entityId.includes("presence")||e.entityId.includes("occupancy")||e.entityId.includes("radar")||e.entityId.includes("motion"),a=r==="door"||r==="window"||r==="garage_door"||r==="opening",l=r==="moisture",d=r==="smoke";return n==="on"||n==="detected"?o?{text:"Mouvement",statusClass:"alert"}:a?{text:"Ouvert",statusClass:"alert"}:l?{text:"Fuite !",statusClass:"alert"}:d?{text:"Fumée !",statusClass:"alert"}:{text:"Détecté",statusClass:"alert"}:o?{text:"Au repos",statusClass:"info"}:a?{text:"Fermé",statusClass:"info"}:l?{text:"Sec",statusClass:"info"}:d?{text:"Normal",statusClass:"info"}:{text:"Inactif",statusClass:"off"}}if(i==="climate"){const o=s.current_temperature,a=s.temperature;return o!==void 0&&a!==void 0?{text:`${o}°C (${a}°)`,statusClass:"info"}:o!==void 0?{text:`${o}°C`,statusClass:"info"}:{text:n,statusClass:"info"}}if(i==="sensor"){const o=s.unit_of_measurement||"";return{text:`${n}${o?" "+o:""}`,statusClass:"info"}}if(i==="cover"){const o=s.current_position;return o!==void 0?{text:`${o}%`,statusClass:o>0?"on":"off"}:n==="open"?{text:"Ouvert",statusClass:"on"}:{text:"Fermé",statusClass:"off"}}return i==="media_player"?n==="playing"?{text:"Lecture",statusClass:"on"}:n==="paused"?{text:"Pause",statusClass:"info"}:{text:"Arrêt",statusClass:"off"}:i==="fan"?n==="on"?{text:"En marche",statusClass:"on"}:{text:"Arrêté",statusClass:"off"}:i==="lock"?n==="locked"?{text:"Verrouillé",statusClass:"info"}:{text:"Déverrouillé",statusClass:"alert"}:{text:n==="on"?"Actif":n==="off"?"Inactif":n,statusClass:n==="on"?"on":"off"}}renderEntityBindings(){return this.project.bindings.map(e=>{const t=this.worldToScreen(e.position),n=this.hass?.states?.[e.entityId],i=n?.state||"off",s=e.entityId.startsWith("light.")&&i==="on",r=e.entityId.startsWith("binary_sensor.")&&(i==="on"||i==="detected"),o=e.entityId.startsWith("sensor.")||e.entityId.startsWith("climate."),a=e.entityId.startsWith("fan."),l=a&&i==="on",d=e.entityId.startsWith("media_player."),c=d&&i==="playing",h=e.entityId.startsWith("cover."),f=n?.attributes?.current_position,u=n?.attributes?.unit_of_measurement||(o?"°":""),p=this.selectedElements?.bindingIds?.includes(e.id),m=this.getEntityDisplayState(e);return M`
        <g 
          class="entity-pin ${p?"selected":""} ${s?"active-light":""} ${r?"active-radar":""}"
          transform="translate(${t.x}, ${t.y})"
          @pointerdown=${g=>this.handleEntityPointerDown(e,g)}
          @click=${g=>this.handleEntityClick(e,g)}
          @dblclick=${g=>this.handleEntityDblClick(e,g)}
          title="${e.customName||e.entityId} : ${m.text} (Clic pour basculer)"
        >
          <!-- Onde radar animée si mouvement détecté -->
          ${r?M`<circle cx="0" cy="0" r="16" class="radar-pulse-ring" />`:null}

          <!-- Ondes sonores pour lecteur multimédia actif -->
          ${c?M`<circle cx="0" cy="0" r="16" class="soundwave-pulse" />`:null}

          <!-- Pastille de fond -->
          <circle cx="0" cy="0" r="16" class="entity-pin-bg" />

          <!-- Pictogramme avec micro-animation (rotation ventilateur) -->
          <text x="0" y="0" class="entity-pin-icon ${l?"fan-spin":""}">
            ${e.icon||(a?"💨":h?"🪟":d?"📺":"⚡")}
          </text>

          <!-- Étiquette Nom -->
          <text x="0" y="27" class="entity-pin-label">
            ${e.customName||e.entityId.split(".")[1]}
          </text>

          <!-- Étiquette État en direct -->
          <text x="0" y="38" class="entity-pin-state state-${m.statusClass}">
            ${m.text}
          </text>

          <!-- Badge Valeur (Thermostat / Capteur de température) -->
          ${o&&i!=="unknown"?M`
            <g class="entity-pin-value-badge" transform="translate(14, -14)">
              <rect x="-14" y="-8" width="28" height="16" />
              <text>${i}${u}</text>
            </g>
          `:null}

          <!-- Badge Position Volet roulant -->
          ${h&&f!==void 0?M`
            <g class="entity-pin-value-badge" transform="translate(14, -14)">
              <rect x="-14" y="-8" width="28" height="16" />
              <text>${f}%</text>
            </g>
          `:null}
        </g>
      `})}renderOpeningPreview(){if(!this.wallSnap)return null;const e=this.project.pixelsPerMeter*this.viewport.zoom,t=(this.currentOpeningWidth||.9)*e,n=this.wallSnap.wall.thickness*e,i=this.worldToScreen(this.wallSnap.projectionPoint),s=this.wallSnap.angleRad*180/Math.PI;return M`
      <g 
        class="opening-preview" 
        transform="translate(${i.x}, ${i.y}) rotate(${s})"
      >
        <rect x="${-t/2}" y="${-n/2}" width="${t}" height="${n}" fill="rgba(56, 189, 248, 0.3)" stroke="#38bdf8" stroke-dasharray="4, 2" />
        ${this.activeTool==="door"?this.renderDoorSymbol(t,n,this.openingFlipSide,this.openingFlipDirection):null}
        ${this.activeTool==="window"?this.renderWindowSymbol(t,n):null}
        ${this.activeTool==="french_window"?this.renderFrenchWindowSymbol(t,n):null}
      </g>
    `}renderPreviewWall(){if(!this.drawingWallStart||!this.previewPoint)return null;const t=this.computeWallPolygon(this.drawingWallStart,this.previewPoint,this.currentWallThickness).map(a=>this.worldToScreen(a)),n=this.worldToScreen(this.drawingWallStart),i=this.worldToScreen(this.previewPoint),s=t.map(a=>`${a.x},${a.y}`).join(" "),r=A.distance(this.drawingWallStart,this.previewPoint),o={x:(n.x+i.x)/2,y:(n.y+i.y)/2};return M`
      <g class="preview-wall-group">
        <polygon points="${s}" class="preview-wall-rect" />
        <line x1="${n.x}" y1="${n.y}" x2="${i.x}" y2="${i.y}" class="preview-wall-line" />

        ${this.snapInfo.guideAngle!==void 0?M`
          <line x1="${n.x}" y1="${n.y}" x2="${i.x}" y2="${i.y}" class="angle-guide-line" />
        `:null}

        <g class="dimension-badge" transform="translate(${o.x}, ${o.y-16})">
          <rect x="-30" y="-11" width="60" height="22" />
          <text>${A.roundMeters(r).toFixed(2)} m</text>
        </g>
      </g>
    `}renderCalibrationLine(){if(!this.calibrateStart||!this.calibrateCurrent)return null;const e=this.calibrateStart,t=this.calibrateCurrent,n=t.x-e.x,i=t.y-e.y,s=Math.sqrt(n*n+i*i),r={x:(e.x+t.x)/2,y:(e.y+t.y)/2};return M`
      <g class="calibration-preview-group">
        <line x1="${e.x}" y1="${e.y}" x2="${t.x}" y2="${t.y}" class="calibration-line" />
        <circle cx="${e.x}" cy="${e.y}" r="6" class="calibration-endpoint" />
        <circle cx="${t.x}" cy="${t.y}" r="6" class="calibration-endpoint" />

        <g class="dimension-badge" transform="translate(${r.x}, ${r.y-18})">
          <rect x="-35" y="-11" width="70" height="22" style="stroke: #f59e0b;" />
          <text style="fill: #f59e0b;">${Math.round(s)} px</text>
        </g>
      </g>
    `}renderRescaleLine(){if(!this.rescaleStart||!this.rescaleCurrent)return null;const e=this.worldToScreen(this.rescaleStart),t=this.worldToScreen(this.rescaleCurrent),n=A.distance(this.rescaleStart,this.rescaleCurrent),i={x:(e.x+t.x)/2,y:(e.y+t.y)/2};return M`
      <g class="rescale-preview-group">
        <line 
          x1="${e.x}" y1="${e.y}" 
          x2="${t.x}" y2="${t.y}" 
          stroke="#38bdf8" 
          stroke-width="3" 
          stroke-dasharray="6, 4" 
        />
        <circle cx="${e.x}" cy="${e.y}" r="6" fill="#38bdf8" stroke="#ffffff" stroke-width="2" />
        <circle cx="${t.x}" cy="${t.y}" r="6" fill="#0284c7" stroke="#38bdf8" stroke-width="2" />

        <g class="dimension-badge" transform="translate(${i.x}, ${i.y-18})">
          <rect x="-48" y="-13" width="96" height="26" rx="6" fill="#0f172a" stroke="#38bdf8" stroke-width="1.8" />
          <text fill="#38bdf8" font-size="12px" font-weight="800" text-anchor="middle" dy="5">
            📐 ${A.roundMeters(n).toFixed(2)} m
          </text>
        </g>
      </g>
    `}renderGhostLayer(){if(!this.ghostProject||!this.ghostProject.walls||this.ghostProject.walls.length===0)return null;const e=this.project.pixelsPerMeter*this.viewport.zoom;return M`
      <g class="ghost-layer" opacity="0.45" pointer-events="none">
        ${this.ghostProject.walls.map(t=>{const n=this.worldToScreen(t.start),i=this.worldToScreen(t.end),s=(t.thickness||.2)*e;return M`
            <line 
              x1="${n.x}" y1="${n.y}" 
              x2="${i.x}" y2="${i.y}" 
              class="ghost-wall" 
              stroke-width="${s}" 
            />
          `})}
      </g>
    `}renderSmartGuides(){return this.snapInfo.smartGuideX===void 0&&this.snapInfo.smartGuideY===void 0?null:M`
      <g class="smart-guides-group" pointer-events="none">
        ${this.snapInfo.smartGuideX!==void 0?M`
          <line 
            x1="${this.worldToScreen({x:this.snapInfo.smartGuideX,y:0}).x}" 
            y1="-2000" 
            x2="${this.worldToScreen({x:this.snapInfo.smartGuideX,y:0}).x}" 
            y2="6000" 
            class="smart-guide-line" 
          />
        `:null}
        ${this.snapInfo.smartGuideY!==void 0?M`
          <line 
            x1="-2000" 
            y1="${this.worldToScreen({x:0,y:this.snapInfo.smartGuideY}).y}" 
            x2="6000" 
            y2="${this.worldToScreen({x:0,y:this.snapInfo.smartGuideY}).y}" 
            class="smart-guide-line" 
          />
        `:null}
      </g>
    `}renderFurniture(){const e=this.project.pixelsPerMeter*this.viewport.zoom;return(this.project.furniture||[]).map(t=>{const n=pt(t.type),i=this.selectedElements.furnitureIds?.includes(t.id)||!1,s=this.worldToScreen(t.position),r=t.width||n?.width||1,o=t.length||n?.length||1,a=r*e,l=o*e,d=t.rotation||0;return M`
        <g
          class="furniture-group ${i?"selected":""}"
          data-furniture-id="${t.id}"
          transform="translate(${s.x}, ${s.y}) rotate(${d})"
          @pointerdown=${c=>this.handleFurniturePointerDown(t,c)}
          @click=${c=>this.handleFurnitureClick(c,t)}
          title="${t.name} (${r.toFixed(2)} × ${o.toFixed(2)} m) - Touche R pour pivoter"
        >
          ${n?n.renderSvg(a,l,i):M`
            <rect x="${-a/2}" y="${-l/2}" width="${a}" height="${l}" fill="rgba(30, 41, 59, 0.85)" stroke="${i?"#38bdf8":"#94a3b8"}" stroke-width="1.5" rx="4" />
            <text x="0" y="4" text-anchor="middle" font-size="12" fill="#cbd5e1">${t.icon||"📦"}</text>
          `}
          ${i?M`
            <!-- Ligne de rappel vers la poignée de rotation -->
            <line x1="0" y1="${-l/2}" x2="0" y2="${-l/2-18}" stroke="#38bdf8" stroke-width="1.5" stroke-dasharray="3,2" />
            <!-- Poignée interactive de rotation degré par degré -->
            <g
              class="furniture-rotate-handle"
              @pointerdown=${c=>this.handleFurnitureRotatePointerDown(t,c)}
              style="cursor: grab;"
            >
              <!-- Zone cliquable invisible élargie -->
              <circle cx="0" cy="${-l/2-18}" r="12" fill="transparent" />
              <!-- Petit rond bleu clair visible avec contour blanc -->
              <circle cx="0" cy="${-l/2-18}" r="6.5" fill="#38bdf8" stroke="#ffffff" stroke-width="2" />
              <!-- Indicateur d'angle en direct quand le meuble est sélectionné -->
              <text 
                x="0" 
                y="${-l/2-28}" 
                text-anchor="middle" 
                font-size="10" 
                font-weight="700" 
                fill="#38bdf8"
                style="user-select: none; pointer-events: none; text-shadow: 0 1px 4px rgba(0,0,0,0.8);"
              >
                ${Math.round(d)}°
              </text>
            </g>

            <!-- Poignée interactive d'étirement / redimensionnement en bas à droite -->
            <g
              class="furniture-resize-handle"
              @pointerdown=${c=>this.handleFurnitureResizePointerDown(t,c)}
              style="cursor: nwse-resize;"
            >
              <!-- Zone cliquable invisible élargie -->
              <rect x="${a/2-6}" y="${l/2-6}" width="20" height="20" fill="transparent" />
              <!-- Poignée carrée moderne aux coins légèrement arrondis avec bordure blanche -->
              <rect 
                x="${a/2-2}" 
                y="${l/2-2}" 
                width="11" 
                height="11" 
                rx="2.5" 
                fill="#38bdf8" 
                stroke="#ffffff" 
                stroke-width="1.8" 
              />
              <!-- 2 stries diagonales symbolisant le grip de redimensionnement -->
              <line x1="${a/2+2}" y1="${l/2+7}" x2="${a/2+7}" y2="${l/2+2}" stroke="#0f172a" stroke-width="1.2" stroke-linecap="round" />
              <line x1="${a/2+5}" y1="${l/2+7}" x2="${a/2+7}" y2="${l/2+5}" stroke="#0f172a" stroke-width="1.2" stroke-linecap="round" />

              <!-- Badge des dimensions actuelles en bas à droite -->
              <g transform="translate(${a/2+14}, ${l/2+16})" style="user-select: none; pointer-events: none;">
                <rect x="-2" y="-9" width="${(r.toFixed(2)+"×"+o.toFixed(2)+"m").length*6.5+8}" height="14" rx="3" fill="rgba(15, 23, 42, 0.85)" stroke="rgba(56, 189, 248, 0.4)" stroke-width="0.8" />
                <text 
                  x="2" 
                  y="1.5" 
                  font-size="9" 
                  font-weight="700" 
                  font-family="ui-monospace, SFMono-Regular, monospace"
                  fill="#38bdf8"
                >
                  ${r.toFixed(2)}×${o.toFixed(2)}m
                </text>
              </g>
            </g>
          `:null}
        </g>
      `})}renderSnapIndicator(){if(!this.previewPoint||this.snapInfo.snappedTo==="none")return null;const e=this.worldToScreen(this.previewPoint),t=this.snapInfo.snappedTo==="vertex";return M`
      <g transform="translate(${e.x}, ${e.y})">
        <circle r="${t?7:5}" class="snap-indicator" />
        ${t?M`<circle r="2" fill="#38bdf8" />`:null}
      </g>
    `}zoomIn(){this.viewport={...this.viewport,zoom:Math.min(this.viewport.zoom*1.25,8)}}zoomOut(){this.viewport={...this.viewport,zoom:Math.max(this.viewport.zoom/1.25,.15)}}rotateQuarterTurn(){this.is3DMode?this.orbitYaw=(this.orbitYaw-90)%360:(this.viewRotation-=90,this.fitToScreen()),this.requestUpdate()}fitToScreen(e=60){const t=this.getBoundingClientRect(),n=t.width||this.clientWidth||800,i=t.height||this.clientHeight||600;if(!(this.project.walls&&this.project.walls.length>0||this.project.rooms&&this.project.rooms.length>0||this.project.furniture&&this.project.furniture.length>0||this.project.background?.imageUrl&&this.project.background.visible)){this.viewport={x:n/2,y:i/2,zoom:1},this.requestUpdate();return}const r=Ys.calculateBoundingBox(this.project,.6),o=r.ppm,a=(this.viewRotation%360+360)%360,l=!this.is3DMode&&(a===90||a===270),d=r.width*o,c=r.height*o,h=l?c:d,f=l?d:c,u=(r.minX+r.width/2)*o,p=(r.minY+r.height/2)*o,m=Math.max(100,n-e*2),g=Math.max(100,i-e*2);let x=Math.min(m/Math.max(h,100),g/Math.max(f,100));x=Math.min(Math.max(x,.2),2.5),this.viewport={x:n/2-u*x,y:i/2-p*x,zoom:x},this.requestUpdate()}resetView(){this.viewRotation=0,this.fitToScreen()}toggle3DMode(){this.is3DMode=!this.is3DMode,this.dispatchEvent(new CustomEvent("toggle-3d",{detail:{is3DMode:this.is3DMode},bubbles:!0,composed:!0}))}getHelpMessage(){return this.isDashboardMode?null:this.is3DMode?"Vue 3D Interactive : Glisser (clic gauche/droit) pour pivoter 360°, Molette pour zoomer, Shift+glisser pour déplacer.":this.activeTool==="select"?"Mode Sélection : Cliquez sur un élément pour le sélectionner (Shift pour multi-sélection, Shift+glisser pour cadre). Suppr pour effacer.":this.activeTool==="wall"?this.drawingWallStart?"Cliquez pour terminer le mur. Échap pour annuler.":"Cliquez pour démarrer un mur.":this.activeTool==="door"?"Survolez un mur. Espace = inverser intérieur/extérieur. F = gauche/droite.":this.activeTool==="window"||this.activeTool==="french_window"?"Survolez un mur pour insérer la fenêtre.":this.activeTool==="calibrate"?this.calibrateStart?"Cliquez sur la 2ème extrémité du mur mesuré.":"Tracez un segment sur un mur pour étalonner l'échelle.":this.activeTool==="rescale"?this.rescaleStart?"Tracez la ligne jusqu'au 2ème point (autre extrémité du mur ou point de référence).":"Mettre à l'échelle : Sélectionnez un mur ou cliquez sur le 1er point de mesure.":null}render(){const e=this.getHelpMessage();return Dt`
      <div 
        class="canvas-container ${this.isPanning?"is-panning":""} ${this.isOrbiting?"is-orbiting":""} ${this.isDashboardMode?"dashboard-mode":""}"
        @wheel=${this.handleWheel}
        @pointerdown=${this.handlePointerDown}
        @pointermove=${this.handlePointerMove}
        @pointerup=${this.handlePointerUp}
        @contextmenu=${t=>{this.is3DMode&&t.preventDefault()}}
        @dragover=${this.handleDragOver}
        @drop=${this.handleDrop}
      >
        <div 
          class="viewport-3d-wrapper ${this.is3DMode?"mode-3d":""}"
          style="${this.is3DMode?`transform: rotateX(${this.orbitPitch}deg) rotateZ(${this.orbitYaw}deg); transition: ${this.isOrbiting?"none":"transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)"};`:`transform: rotate(${this.viewRotation}deg); transform-origin: center center; transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);`}"
        >
          <svg class="main-viewport">
            ${this.renderBackgroundLayer()}
            ${this.renderGhostLayer()}
            ${this.renderGrid()}
            ${this.renderRooms()}
            ${this.renderFurniture()}
            ${this.renderWalls()}
            ${this.renderOpenings()}
            ${this.renderOpeningPreview()}
            ${this.renderPreviewWall()}
            ${this.renderCalibrationLine()}
            ${this.renderRescaleLine()}
            ${this.renderSmartGuides()}
            ${this.renderSnapIndicator()}
            ${this.renderEntityBindings()}
            ${this.renderMarqueeBox()}
          </svg>
        </div>

        ${!this.isDashboardMode&&e?Dt`<div class="help-hud">${e}</div>`:null}

        ${this.isDashboardMode?null:Dt`
          <div class="coords-hud ${this.selectedElements.wallIds.length+this.selectedElements.openingIds.length+this.selectedElements.roomIds.length+this.selectedElements.bindingIds.length+(this.selectedElements.furnitureIds?.length||0)>0?"selection-active":""}">
            <span style="color: #38bdf8;">X:</span>
            <span>${this.cursorCoords.x.toFixed(2)} m</span>
            <span style="opacity: 0.35;">|</span>
            <span style="color: #38bdf8;">Y:</span>
            <span>${this.cursorCoords.y.toFixed(2)} m</span>
            <span style="opacity: 0.35;">|</span>
            <span style="color: #94a3b8;">Outil:</span>
            <span style="color: #f1f5f9; font-weight: 700;">${this.activeTool.toUpperCase()}</span>
          </div>
        `}

        <!-- HUD Contrôles Zoom & 3D -->
        <div class="canvas-hud">
          <button 
            class="hud-btn ${this.is3DMode?"active":""}" 
            @click=${this.toggle3DMode} 
            title="Basculer Vue 2D / 3D Isométrique"
          >
            ${this.is3DMode?"🧊":"📐"}
          </button>

          ${this.is3DMode?Dt`
            <div class="hud-preset-group">
              <span class="hud-angle-badge">${Math.round(this.orbitYaw)}° / ${Math.round(this.orbitPitch)}°</span>
              <button class="hud-preset-btn" @click=${()=>this.setCameraPreset(55,-35)} title="Vue Sud-Ouest (Défaut)">SO</button>
              <button class="hud-preset-btn" @click=${()=>this.setCameraPreset(55,35)} title="Vue Sud-Est">SE</button>
              <button class="hud-preset-btn" @click=${()=>this.setCameraPreset(55,125)} title="Vue Nord-Est">NE</button>
              <button class="hud-preset-btn" @click=${()=>this.setCameraPreset(55,-125)} title="Vue Nord-Ouest">NO</button>
              <button class="hud-preset-btn" @click=${()=>this.setCameraPreset(75,0)} title="Vue Plongeante">Top</button>
            </div>
          `:null}

          <!-- Rotation du plan d'un quart de tour à gauche (90°) -->
          <button 
            class="hud-btn" 
            @click=${this.rotateQuarterTurn} 
            title="Pivoter le plan d'un quart de tour à gauche (↺ 90°)"
          >
            ↺
          </button>

          <!-- Zoom automatique et centrage sur l'écran -->
          <button 
            class="hud-btn" 
            @click=${()=>this.fitToScreen(40)} 
            title="Ajuster automatiquement à la page (Zoom auto & centrage)"
          >
            ⛶
          </button>

          <button class="hud-btn" @click=${this.zoomOut} title="Zoom Arrière">−</button>
          <div class="hud-zoom-label">${Math.round(this.viewport.zoom*100)}%</div>
          <button class="hud-btn" @click=${this.zoomIn} title="Zoom Avant">+</button>
          <button class="hud-btn" @click=${this.resetView} title="Recentrer">⌖</button>
        </div>
      </div>
    `}};S.styles=yi;I([U({type:Object})],S.prototype,"hass",2);I([U({type:Object})],S.prototype,"project",2);I([U({type:String})],S.prototype,"activeTool",2);I([U({type:Number})],S.prototype,"currentWallThickness",2);I([U({type:Number})],S.prototype,"currentOpeningWidth",2);I([U({type:Boolean})],S.prototype,"is3DMode",2);I([U({type:Object})],S.prototype,"selectedElements",2);I([U({type:Boolean})],S.prototype,"isDashboardMode",2);I([U({type:Object})],S.prototype,"ghostProject",2);I([U({type:Boolean})],S.prototype,"showDimensions",2);I([U({type:Boolean})],S.prototype,"showThermalHeatmap",2);I([C()],S.prototype,"isMarqueeSelecting",2);I([C()],S.prototype,"marqueeStart",2);I([C()],S.prototype,"marqueeCurrent",2);I([C()],S.prototype,"viewport",2);I([C()],S.prototype,"isPanning",2);I([C()],S.prototype,"drawingWallStart",2);I([C()],S.prototype,"previewPoint",2);I([C()],S.prototype,"snapInfo",2);I([C()],S.prototype,"cursorCoords",2);I([C()],S.prototype,"draggingFurnitureId",2);I([C()],S.prototype,"rotatingFurnitureId",2);I([C()],S.prototype,"resizingFurnitureId",2);I([C()],S.prototype,"draggingWallId",2);I([C()],S.prototype,"wallSnap",2);I([U({type:Boolean})],S.prototype,"openingFlipSide",2);I([U({type:Boolean})],S.prototype,"openingFlipDirection",2);I([U({type:Number})],S.prototype,"windowSashCount",2);I([C()],S.prototype,"calibrateStart",2);I([C()],S.prototype,"calibrateCurrent",2);I([C()],S.prototype,"rescaleStart",2);I([C()],S.prototype,"rescaleCurrent",2);I([C()],S.prototype,"draggingBindingId",2);I([C()],S.prototype,"viewRotation",2);I([C()],S.prototype,"orbitPitch",2);I([C()],S.prototype,"orbitYaw",2);I([C()],S.prototype,"isOrbiting",2);S=I([fi("home-architect-canvas")],S);function br(e,t){if(typeof customElements>"u")return;const n=customElements.get(e);if(n){n!==t&&console.warn(`[home-architect] ${e} déjà défini (ancienne version en cache ?)`);return}try{customElements.define(e,t)}catch(i){console.error(`[home-architect] Impossible de définir <${e}> :`,i)}}const qs=2500,Nt=12*1024*1024,Hs=new Set(["image/png","image/jpeg","image/webp","image/gif"]),Gs=2*1024*1024,Ks=.85,Vs=6e4;function Zs(e){return new Promise((t,n)=>{const i=URL.createObjectURL(e),s=new Image;s.onload=()=>{t({source:s,width:s.naturalWidth,height:s.naturalHeight,release:()=>URL.revokeObjectURL(i)})},s.onerror=()=>{URL.revokeObjectURL(i),n(new Error("Image illisible ou format non pris en charge."))},s.src=i})}async function Fn(e){if(typeof createImageBitmap=="function"&&e.type!=="image/svg+xml")try{const t=await createImageBitmap(e);return{source:t,width:t.width,height:t.height,release:()=>t.close()}}catch{}return Zs(e)}function re(e,t,n){return new Promise(i=>{try{e.toBlob(s=>i(s),t,n)}catch{i(null)}})}function Js(e,t,n){const i=e.getImageData(0,0,t,n).data;for(let s=3;s<i.length;s+=4)if(i[s]<255)return!0;return!1}async function wr(e,t={}){if(e.type==="image/svg+xml")throw new Error("Les images SVG ne sont pas compressées : elles sont téléversées telles quelles.");const n=t.maxSide&&t.maxSide>0?t.maxSide:qs,i=t.quality&&t.quality>0&&t.quality<=1?t.quality:Ks,s=await Fn(e),r=document.createElement("canvas");try{if(!s.width||!s.height)throw new Error("Image vide ou dimensions inconnues.");const o=Math.min(1,n/Math.max(s.width,s.height)),a=Math.max(1,Math.round(s.width*o)),l=Math.max(1,Math.round(s.height*o)),d=o<1;r.width=a,r.height=l;const c=r.getContext("2d");if(!c)throw new Error("Canvas 2D indisponible dans ce navigateur.");c.imageSmoothingEnabled=!0,c.imageSmoothingQuality="high",c.drawImage(s.source,0,0,a,l);const h=e.type!=="image/jpeg"&&Js(c,a,l);let f=null;if(h){const u=await re(r,"image/png");u&&u.size<Gs&&(f=u)}if(!f){const u=await re(r,"image/webp",i);u&&u.type==="image/webp"&&(f=u)}if(f||(h&&(c.globalCompositeOperation="destination-over",c.fillStyle="#ffffff",c.fillRect(0,0,a,l),c.globalCompositeOperation="source-over"),f=await re(r,"image/jpeg",i)),!f)throw new Error("Impossible d'encoder l'image.");return!d&&f.size>=e.size&&Hs.has(e.type)?{blob:e,width:s.width,height:s.height,mimeType:e.type}:{blob:f,width:a,height:l,mimeType:f.type}}finally{s.release(),r.width=0,r.height=0}}async function $r(e){const t=await Fn(e);try{return{width:t.width,height:t.height}}finally{t.release()}}function vr(e){return new Promise((t,n)=>{const i=new FileReader;i.onload=()=>{typeof i.result=="string"?t(i.result):n(new Error("Lecture du fichier impossible."))},i.onerror=()=>n(i.error??new Error("Lecture du fichier impossible.")),i.readAsDataURL(e)})}function Mr(e){const t=/^data:([^,]*),/i.exec(e);if(!t)throw new Error("Data-URL invalide.");const n=t[1],i=e.slice(t[0].length),s=/;base64$/i.test(n),r=(n.split(";")[0]||"application/octet-stream").toLowerCase();if(!s)return new Blob([decodeURIComponent(i)],{type:r});const o=atob(i.replace(/\s+/g,"")),a=new Uint8Array(o.length);for(let l=0;l<o.length;l++)a[l]=o.charCodeAt(l);return new Blob([a],{type:r})}function _r(e,t){const n=URL.createObjectURL(e),i=document.createElement("a");i.href=n,i.download=t,i.rel="noopener",i.style.display="none",document.body.appendChild(i),i.click(),i.remove(),setTimeout(()=>URL.revokeObjectURL(n),Vs)}class R extends Error{constructor(t,n){super(n),this.name="HaApiError",this.code=t}}class Qs extends R{constructor(t,n){super("conflict",t),this.name="ConflictError",this.serverRevision=n}}class Rn extends R{constructor(t){super("unauthorized",t),this.name="PermissionDeniedError"}}class bt extends R{constructor(t,n,i){super("payload_too_large",t),this.name="PayloadTooLargeError",this.bytes=n,this.limit=i}}const tr=3,Dn="home_architect_",er=new Set(["home_architect_toolbar_pos"]);function G(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Q(e){return typeof e=="string"&&e!==""?e:void 0}function Ft(e){return typeof e=="number"&&Number.isInteger(e)&&e>=0?e:void 0}function nt(e){return`${(e/(1024*1024)).toFixed(1)} Mo`}function Ln(e,t){if(e instanceof R)return e;const n=G(e)?G(e.error)?e.error:e:null,i=n?.code;let s;typeof i=="string"&&i!==""?s=i:i===tr?s="connection_lost":typeof i=="number"?s=`error_${i}`:s="unknown_error";const r=typeof n?.message=="string"&&n.message!==""?n.message:e instanceof Error?e.message:String(e);switch(s){case"conflict":{const o=/conflict:(\d+)/.exec(r),a=o?Number(o[1]):void 0;return new Qs(a===void 0?"Le plan a été modifié ailleurs depuis son ouverture.":`Le plan a été modifié ailleurs depuis son ouverture (révision serveur ${a}).`,a)}case"unauthorized":return new Rn("Action réservée aux administrateurs Home Assistant.");case"payload_too_large":{const o=/payload_too_large:(\d+):(\d+)/.exec(r),a=o?Number(o[1]):t?.bytes??0,l=o?Number(o[2]):t?.limit??0;return new bt(l>0?`Données trop volumineuses pour le serveur (${nt(a)}, maximum ${nt(l)}).`:"Données trop volumineuses pour le serveur.",a,l)}default:return new R(s,r)}}async function it(e,t,n){if(!e||typeof e.callWS!="function")throw new R("not_connected","Connexion à Home Assistant indisponible.");try{return await e.callWS(t)}catch(i){throw Ln(i,n)}}function st(e){if(typeof e!="string"||!$t.test(e))throw new R("invalid_project_id",`Identifiant de projet invalide : ${String(e)}`)}function nr(e){if(typeof e!="string"||!Zt.test(e))throw new R("invalid_asset_id",`Identifiant d'image invalide : ${String(e)}`)}async function On(e,t,n){if(!e||typeof e.fetchWithAuth!="function")throw new R("not_connected","Connexion à Home Assistant indisponible.");try{return await e.fetchWithAuth(t,n)}catch(i){throw new R("network_error",i instanceof Error?i.message:String(i))}}function jn(e,t){switch(e){case 401:case 403:return new Rn("Action réservée aux administrateurs Home Assistant.");case 404:return new R("not_found","Ressource introuvable sur le serveur.");case 413:return new bt("Fichier trop volumineux pour le serveur.",t?.bytes??0,t?.limit??0);case 415:return new R("unsupported_media_type","Format d'image non pris en charge.");case 400:return new R("invalid_image","Image invalide ou corrompue.");case 503:return new R("not_ready","Home Architect n'est pas encore chargé sur le serveur.");default:return new R("http_error",`Erreur HTTP ${e}.`)}}function ir(e){if(!G(e)||typeof e.id!="string"||!$t.test(e.id))return null;const t=G(e.counts)?e.counts:{},n=i=>Ft(i)??0;return{id:e.id,name:typeof e.name=="string"&&e.name!==""?e.name:e.id,category:Q(e.category)??An(e.id),created_at:Q(e.created_at),updated_at:Q(e.updated_at),revision:Ft(e.revision)??0,has_background:e.has_background===!0,publish:ye(e.publish)??null,counts:{walls:n(t.walls),rooms:n(t.rooms),bindings:n(t.bindings),furniture:n(t.furniture)}}}function sr(e){return{id:e.id,name:e.name,category:e.category,created_at:e.created_at,updated_at:e.updated_at,revision:e.revision??0,has_background:!!(e.background&&(e.background.assetId||e.background.imageUrl)),publish:e.publish??null,counts:{walls:e.walls.length,rooms:e.rooms.length,bindings:e.bindings.length,furniture:(e.furniture??[]).length}}}async function Wn(e){const t=await it(e,{type:"home_architect/get_projects"});return(Array.isArray(t?.projects)?t.projects:[]).filter(n=>G(n)&&typeof n.id=="string"&&$t.test(n.id)).map(xe)}function Sr(e){return e?.user?.is_admin===!0}async function Ir(e){try{const t=await it(e,{type:"home_architect/list_projects"});return(Array.isArray(t?.projects)?t.projects:[]).map(ir).filter(n=>n!==null)}catch(t){if(t instanceof R&&t.code==="unknown_command")return(await Wn(e)).map(sr);throw t}}async function Er(e,t){st(t);try{const n=await it(e,{type:"home_architect/get_project",project_id:t});return G(n?.project)?xe(n.project):null}catch(n){if(n instanceof R&&n.code==="not_found")return null;if(n instanceof R&&n.code==="unknown_command")return(await Wn(e)).find(i=>i.id===t)??null;throw n}}async function kr(e,t,n={}){st(t.id);const i=ks(t),s=i.background?.imageUrl;if(typeof s=="string"&&s.startsWith("data:")&&s.length>qe)throw new bt("L'image de fond doit être téléversée sur le serveur avant la sauvegarde.",s.length,qe);const r=As(i);if(r>jt)throw new bt(`Plan trop volumineux (${nt(r)}, maximum ${nt(jt)}).`,r,jt);const o={type:"home_architect/save_project",project:i};n.expectedRevision!==void 0&&(o.expected_revision=n.expectedRevision),n.force&&(o.force=!0);const a=await it(e,o,{bytes:r,limit:jt}),l={id:typeof a?.id=="string"?a.id:t.id,revision:Ft(a?.revision)??0,updated_at:typeof a?.updated_at=="string"?a.updated_at:new Date().toISOString()};return typeof a?.asset_id=="string"&&Zt.test(a.asset_id)&&(l.assetId=a.asset_id),l}async function Ar(e,t){st(t);try{await it(e,{type:"home_architect/delete_project",project_id:t})}catch(n){if(n instanceof R&&n.code==="not_found")return;throw n}}async function Pr(e,t,n){st(t);const i={bytes:n.size,limit:Nt};if(n.size>Nt)throw new bt(`Image trop volumineuse (${nt(n.size)}, maximum ${nt(Nt)}).`,n.size,Nt);const s=await On(e,`/api/home_architect/background/${encodeURIComponent(t)}`,{method:"POST",body:n,headers:{"Content-Type":n.type||"application/octet-stream"}});if(!s.ok)throw jn(s.status,i);let r;try{r=await s.json()}catch{r=null}if(!G(r)||typeof r.asset_id!="string"||!Zt.test(r.asset_id))throw new R("invalid_response","Réponse inattendue du serveur après le téléversement.");return{assetId:r.asset_id,mimeType:typeof r.mime_type=="string"?r.mime_type:n.type,size:Ft(r.size)??n.size}}function rr(e){const t=/^([A-Za-z0-9_-]{1,64})-[A-Za-z0-9]{6,64}\.[A-Za-z0-9]{2,5}$/.exec(e);return t&&$t.test(t[1])?t[1]:null}async function or(e,t,n){st(t),nr(n);const i=rr(n)??t,s=await On(e,`/api/home_architect/background/${encodeURIComponent(i)}/${encodeURIComponent(n)}`);if(!s.ok)throw jn(s.status);return s.blob()}const ut=new Map;function Tr(e,t,n){const i=ut.get(n);if(i)return i.refs+=1,i.promise;const s=or(e,t,n).then(o=>URL.createObjectURL(o)),r={promise:s,refs:1};return ut.set(n,r),s.catch(()=>{ut.get(n)===r&&ut.delete(n)}),s}function Cr(e){const t=ut.get(e);t&&(t.refs-=1,!(t.refs>0)&&(ut.delete(e),t.promise.then(n=>URL.revokeObjectURL(n),()=>{})))}async function Fr(e,t,n,i){st(t);const s=new TextEncoder().encode(n).length;if(s>Wt)throw new bt(`SVG trop volumineux (${nt(s)}, maximum ${nt(Wt)}).`,s,Wt);const r=await it(e,{type:"home_architect/publish_svg",project_id:t,svg_content:n,include_background:i.includeBackground===!0},{bytes:s,limit:Wt}),o=ye(r);if(!o)throw new R("invalid_response","Réponse inattendue du serveur après la publication.");return o}async function Rr(e,t){st(t),await it(e,{type:"home_architect/unpublish",project_id:t})}async function Dr(e,t={}){const n={type:"home_architect/check_updates"};t.force&&(n.force=!0);const i=await it(e,n),s=G(i)?i:{},r=Q(s.release_url);return{installed_version:Q(s.installed_version)??"",latest_version:Q(s.latest_version)??null,update_available:s.update_available===!0,skipped_version:Q(s.skipped_version)??null,release_url:r&&/^https?:\/\//i.test(r)?r:null,release_notes:typeof s.release_notes=="string"?s.release_notes:"",update_entity_id:Q(s.update_entity_id)??null}}async function Lr(e,t,n){st(t);const i=e?.connection?.subscribeMessage;if(typeof i!="function")throw new R("not_connected","Connexion à Home Assistant indisponible.");const s=a=>{if(!G(a)||a.project_id!==void 0&&a.project_id!==t)return;const l={project_id:t,revision:Ft(a.revision)??0};a.deleted===!0&&(l.deleted=!0),n(l)};let r;try{r=await i.call(e.connection,s,{type:"home_architect/subscribe_project",project_id:t})}catch(a){throw Ln(a)}let o=!0;return()=>{if(o){o=!1;try{const a=typeof r=="function"?r():void 0;a&&typeof a.catch=="function"&&a.catch(()=>{})}catch{}}}}function zn(){try{return typeof localStorage>"u"?null:localStorage}catch{return null}}function Nn(e){return e.startsWith(Dn)&&!er.has(e)}function Or(){const e=zn();if(!e)return[];const t=[];try{const n=[];for(let i=0;i<e.length;i++){const s=e.key(i);s&&Nn(s)&&n.push(s)}for(const i of n){let s;try{const a=e.getItem(i);if(!a)continue;s=JSON.parse(a)}catch{continue}if(!G(s)||!(Array.isArray(s.walls)||Array.isArray(s.rooms)||Array.isArray(s.bindings)))continue;const r=i.slice(Dn.length),o=typeof s.id=="string"&&$t.test(s.id)?s:{...s,id:r};t.push({key:i,project:xe(o)})}}catch{}return t}function jr(e){if(typeof e!="string"||!Nn(e))return;const t=zn();if(t)try{t.removeItem(e)}catch{}}const It="1.0.28",sn="legacy",ar={card:"home-architect-card",panel:"home-architect-panel"};function be(){const e=window.__homeArchitectBundles;return typeof e=="object"&&e!==null?e:window.__homeArchitectBundles={}}function rn(e){return e.trim().replace(/^v/i,"")}function Wr(e){const t=be(),n=e==="card"?"panel":"card";t[n]===void 0&&customElements.get(ar[n])&&(t[n]=sn,t[e]??=sn),t[e]??=It,console.info(`%c 📐 HOME ARCHITECT %c v${It} · ${e==="card"?"carte":"studio"} `,"background: #0284c7; color: #fff; font-weight: bold; border-radius: 4px 0 0 4px; padding: 2px 6px;","background: #1e293b; color: #38bdf8; font-weight: bold; border-radius: 0 4px 4px 0; padding: 2px 6px;");const i=Object.entries(t).filter(([,s])=>s!==It);i.length>0&&console.warn(`[home-architect] Versions différentes chargées dans la page (${e} v${It} évalué, actifs : `+i.map(([s,r])=>`${s} ${r}`).join(", ")+") : rechargez la page pour utiliser la nouvelle version.")}function zr(){return{...be()}}function Nr(e){if(typeof e!="string"||e.trim()==="")return!1;const t=rn(e),n=Object.values(be()).filter(i=>typeof i=="string");return[It,...n].some(i=>rn(i)!==t)}export{ys as $,F as A,bt as B,vr as C,pr as D,ft as E,un as F,zt as G,R as H,Fr as I,Rr as J,_r as K,ks as L,Wt as M,xe as N,An as O,$t as P,ge as Q,Ki as R,Ys as S,Vi as T,yn as U,Ar as V,fr as W,Vt as X,wr as Y,Pr as Z,It as _,Hn as a,ye as a0,Or as a1,jr as a2,kn as a3,mr as a4,kr as a5,Qs as a6,Rn as a7,$r as a8,Dr as a9,Nr as aa,zr as ab,A as ac,gr as ad,Dt as b,xr as c,C as d,br as e,Tr as f,Er as g,Wr as h,kt as i,dr as j,Ps as k,Ir as l,ur as m,U as n,hr as o,H as p,fi as q,Cr as r,Lr as s,Ln as t,gs as u,yr as v,M as w,Sr as x,or as y,Mr as z};
