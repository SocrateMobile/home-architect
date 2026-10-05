const Z=globalThis,ot=Z.ShadowRoot&&(Z.ShadyCSS===void 0||Z.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,at=Symbol(),ft=new WeakMap;let Ct=class{constructor(t,i,s){if(this._$cssResult$=!0,s!==at)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=i}get styleSheet(){let t=this.o;const i=this.t;if(ot&&t===void 0){const s=i!==void 0&&i.length===1;s&&(t=ft.get(i)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&ft.set(i,t))}return t}toString(){return this.cssText}};const Rt=e=>new Ct(typeof e=="string"?e:e+"",void 0,at),Ot=(e,...t)=>{const i=e.length===1?e[0]:t.reduce((s,r,n)=>s+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+e[n+1],e[0]);return new Ct(i,e,at)},zt=(e,t)=>{if(ot)e.adoptedStyleSheets=t.map(i=>i instanceof CSSStyleSheet?i:i.styleSheet);else for(const i of t){const s=document.createElement("style"),r=Z.litNonce;r!==void 0&&s.setAttribute("nonce",r),s.textContent=i.cssText,e.appendChild(s)}},yt=ot?e=>e:e=>e instanceof CSSStyleSheet?(t=>{let i="";for(const s of t.cssRules)i+=s.cssText;return Rt(i)})(e):e;const{is:qt,defineProperty:Ut,getOwnPropertyDescriptor:Bt,getOwnPropertyNames:Yt,getOwnPropertySymbols:Ht,getPrototypeOf:Xt}=Object,tt=globalThis,mt=tt.trustedTypes,Nt=mt?mt.emptyScript:"",Lt=tt.reactiveElementPolyfillSupport,B=(e,t)=>e,Q={toAttribute(e,t){switch(t){case Boolean:e=e?Nt:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=e!==null;break;case Number:i=e===null?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch{i=null}}return i}},lt=(e,t)=>!qt(e,t),xt={attribute:!0,type:String,converter:Q,reflect:!1,useDefault:!1,hasChanged:lt};Symbol.metadata??=Symbol("metadata"),tt.litPropertyMetadata??=new WeakMap;let O=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,i=xt){if(i.state&&(i.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((i=Object.create(i)).wrapped=!0),this.elementProperties.set(t,i),!i.noAccessor){const s=Symbol(),r=this.getPropertyDescriptor(t,s,i);r!==void 0&&Ut(this.prototype,t,r)}}static getPropertyDescriptor(t,i,s){const{get:r,set:n}=Bt(this.prototype,t)??{get(){return this[i]},set(o){this[i]=o}};return{get:r,set(o){const l=r?.call(this);n?.call(this,o),this.requestUpdate(t,l,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??xt}static _$Ei(){if(this.hasOwnProperty(B("elementProperties")))return;const t=Xt(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(B("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(B("properties"))){const i=this.properties,s=[...Yt(i),...Ht(i)];for(const r of s)this.createProperty(r,i[r])}const t=this[Symbol.metadata];if(t!==null){const i=litPropertyMetadata.get(t);if(i!==void 0)for(const[s,r]of i)this.elementProperties.set(s,r)}this._$Eh=new Map;for(const[i,s]of this.elementProperties){const r=this._$Eu(i,s);r!==void 0&&this._$Eh.set(r,i)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const i=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const r of s)i.unshift(yt(r))}else t!==void 0&&i.push(yt(t));return i}static _$Eu(t,i){const s=i.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,i=this.constructor.elementProperties;for(const s of i.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return zt(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,i,s){this._$AK(t,s)}_$ET(t,i){const s=this.constructor.elementProperties.get(t),r=this.constructor._$Eu(t,s);if(r!==void 0&&s.reflect===!0){const n=(s.converter?.toAttribute!==void 0?s.converter:Q).toAttribute(i,s.type);this._$Em=t,n==null?this.removeAttribute(r):this.setAttribute(r,n),this._$Em=null}}_$AK(t,i){const s=this.constructor,r=s._$Eh.get(t);if(r!==void 0&&this._$Em!==r){const n=s.getPropertyOptions(r),o=typeof n.converter=="function"?{fromAttribute:n.converter}:n.converter?.fromAttribute!==void 0?n.converter:Q;this._$Em=r;const l=o.fromAttribute(i,n.type);this[r]=l??this._$Ej?.get(r)??l,this._$Em=null}}requestUpdate(t,i,s,r=!1,n){if(t!==void 0){const o=this.constructor;if(r===!1&&(n=this[t]),s??=o.getPropertyOptions(t),!((s.hasChanged??lt)(n,i)||s.useDefault&&s.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,s))))return;this.C(t,i,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,i,{useDefault:s,reflect:r,wrapped:n},o){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??i??this[t]),n!==!0||o!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(i=void 0),this._$AL.set(t,i)),r===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(i){Promise.reject(i)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[r,n]of this._$Ep)this[r]=n;this._$Ep=void 0}const s=this.constructor.elementProperties;if(s.size>0)for(const[r,n]of s){const{wrapped:o}=n,l=this[r];o!==!0||this._$AL.has(r)||l===void 0||this.C(r,void 0,n,l)}}let t=!1;const i=this._$AL;try{t=this.shouldUpdate(i),t?(this.willUpdate(i),this._$EO?.forEach(s=>s.hostUpdate?.()),this.update(i)):this._$EM()}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(i)}willUpdate(t){}_$AE(t){this._$EO?.forEach(i=>i.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(i=>this._$ET(i,this[i])),this._$EM()}updated(t){}firstUpdated(t){}};O.elementStyles=[],O.shadowRootOptions={mode:"open"},O[B("elementProperties")]=new Map,O[B("finalized")]=new Map,Lt?.({ReactiveElement:O}),(tt.reactiveElementVersions??=[]).push("2.1.2");const dt=globalThis,$t=e=>e,J=dt.trustedTypes,bt=J?J.createPolicy("lit-html",{createHTML:e=>e}):void 0,_t="$lit$",F=`lit$${Math.random().toFixed(9).slice(2)}$`,Pt="?"+F,Gt=`<${Pt}>`,R=document,H=()=>R.createComment(""),X=e=>e===null||typeof e!="object"&&typeof e!="function",ct=Array.isArray,Kt=e=>ct(e)||typeof e?.[Symbol.iterator]=="function",nt=`[ 	
\f\r]`,U=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,wt=/-->/g,vt=/>/g,D=RegExp(`>|${nt}(?:([^\\s"'>=/]+)(${nt}*=${nt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),St=/'/g,kt=/"/g,Et=/^(?:script|style|textarea|title)$/i,Tt=e=>(t,...i)=>({_$litType$:e,strings:t,values:i}),K=Tt(1),f=Tt(2),z=Symbol.for("lit-noChange"),M=Symbol.for("lit-nothing"),Mt=new WeakMap,j=R.createTreeWalker(R,129);function At(e,t){if(!ct(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return bt!==void 0?bt.createHTML(t):t}const Vt=(e,t)=>{const i=e.length-1,s=[];let r,n=t===2?"<svg>":t===3?"<math>":"",o=U;for(let l=0;l<i;l++){const d=e[l];let p,a,u=-1,c=0;for(;c<d.length&&(o.lastIndex=c,a=o.exec(d),a!==null);)c=o.lastIndex,o===U?a[1]==="!--"?o=wt:a[1]!==void 0?o=vt:a[2]!==void 0?(Et.test(a[2])&&(r=RegExp("</"+a[2],"g")),o=D):a[3]!==void 0&&(o=D):o===D?a[0]===">"?(o=r??U,u=-1):a[1]===void 0?u=-2:(u=o.lastIndex-a[2].length,p=a[1],o=a[3]===void 0?D:a[3]==='"'?kt:St):o===kt||o===St?o=D:o===wt||o===vt?o=U:(o=D,r=void 0);const h=o===D&&e[l+1].startsWith("/>")?" ":"";n+=o===U?d+Gt:u>=0?(s.push(p),d.slice(0,u)+_t+d.slice(u)+F+h):d+F+(u===-2?l:h)}return[At(e,n+(e[i]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]};class N{constructor({strings:t,_$litType$:i},s){let r;this.parts=[];let n=0,o=0;const l=t.length-1,d=this.parts,[p,a]=Vt(t,i);if(this.el=N.createElement(p,s),j.currentNode=this.el.content,i===2||i===3){const u=this.el.content.firstChild;u.replaceWith(...u.childNodes)}for(;(r=j.nextNode())!==null&&d.length<l;){if(r.nodeType===1){if(r.hasAttributes())for(const u of r.getAttributeNames())if(u.endsWith(_t)){const c=a[o++],h=r.getAttribute(u).split(F),y=/([.?@])?(.*)/.exec(c);d.push({type:1,index:n,name:y[2],strings:h,ctor:y[1]==="."?Qt:y[1]==="?"?Jt:y[1]==="@"?te:et}),r.removeAttribute(u)}else u.startsWith(F)&&(d.push({type:6,index:n}),r.removeAttribute(u));if(Et.test(r.tagName)){const u=r.textContent.split(F),c=u.length-1;if(c>0){r.textContent=J?J.emptyScript:"";for(let h=0;h<c;h++)r.append(u[h],H()),j.nextNode(),d.push({type:2,index:++n});r.append(u[c],H())}}}else if(r.nodeType===8)if(r.data===Pt)d.push({type:2,index:n});else{let u=-1;for(;(u=r.data.indexOf(F,u+1))!==-1;)d.push({type:7,index:n}),u+=F.length-1}n++}}static createElement(t,i){const s=R.createElement("template");return s.innerHTML=t,s}}function q(e,t,i=e,s){if(t===z)return t;let r=s!==void 0?i._$Co?.[s]:i._$Cl;const n=X(t)?void 0:t._$litDirective$;return r?.constructor!==n&&(r?._$AO?.(!1),n===void 0?r=void 0:(r=new n(e),r._$AT(e,i,s)),s!==void 0?(i._$Co??=[])[s]=r:i._$Cl=r),r!==void 0&&(t=q(e,r._$AS(e,t.values),r,s)),t}class Zt{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:i},parts:s}=this._$AD,r=(t?.creationScope??R).importNode(i,!0);j.currentNode=r;let n=j.nextNode(),o=0,l=0,d=s[0];for(;d!==void 0;){if(o===d.index){let p;d.type===2?p=new L(n,n.nextSibling,this,t):d.type===1?p=new d.ctor(n,d.name,d.strings,this,t):d.type===6&&(p=new ee(n,this,t)),this._$AV.push(p),d=s[++l]}o!==d?.index&&(n=j.nextNode(),o++)}return j.currentNode=R,r}p(t){let i=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++}}class L{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,i,s,r){this.type=2,this._$AH=M,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return i!==void 0&&t?.nodeType===11&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=q(this,t,i),X(t)?t===M||t==null||t===""?(this._$AH!==M&&this._$AR(),this._$AH=M):t!==this._$AH&&t!==z&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Kt(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==M&&X(this._$AH)?this._$AA.nextSibling.data=t:this.T(R.createTextNode(t)),this._$AH=t}$(t){const{values:i,_$litType$:s}=t,r=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=N.createElement(At(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===r)this._$AH.p(i);else{const n=new Zt(r,this),o=n.u(this.options);n.p(i),this.T(o),this._$AH=n}}_$AC(t){let i=Mt.get(t.strings);return i===void 0&&Mt.set(t.strings,i=new N(t)),i}k(t){ct(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,r=0;for(const n of t)r===i.length?i.push(s=new L(this.O(H()),this.O(H()),this,this.options)):s=i[r],s._$AI(n),r++;r<i.length&&(this._$AR(s&&s._$AB.nextSibling,r),i.length=r)}_$AR(t=this._$AA.nextSibling,i){for(this._$AP?.(!1,!0,i);t!==this._$AB;){const s=$t(t).nextSibling;$t(t).remove(),t=s}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}}class et{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,i,s,r,n){this.type=1,this._$AH=M,this._$AN=void 0,this.element=t,this.name=i,this._$AM=r,this.options=n,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=M}_$AI(t,i=this,s,r){const n=this.strings;let o=!1;if(n===void 0)t=q(this,t,i,0),o=!X(t)||t!==this._$AH&&t!==z,o&&(this._$AH=t);else{const l=t;let d,p;for(t=n[0],d=0;d<n.length-1;d++)p=q(this,l[s+d],i,d),p===z&&(p=this._$AH[d]),o||=!X(p)||p!==this._$AH[d],p===M?t=M:t!==M&&(t+=(p??"")+n[d+1]),this._$AH[d]=p}o&&!r&&this.j(t)}j(t){t===M?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class Qt extends et{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===M?void 0:t}}class Jt extends et{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==M)}}class te extends et{constructor(t,i,s,r,n){super(t,i,s,r,n),this.type=5}_$AI(t,i=this){if((t=q(this,t,i,0)??M)===z)return;const s=this._$AH,r=t===M&&s!==M||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,n=t!==M&&(s===M||r);r&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class ee{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){q(this,t)}}const ie=dt.litHtmlPolyfillSupport;ie?.(N,L),(dt.litHtmlVersions??=[]).push("3.3.3");const se=(e,t,i)=>{const s=i?.renderBefore??t;let r=s._$litPart$;if(r===void 0){const n=i?.renderBefore??null;s._$litPart$=r=new L(t.insertBefore(H(),n),n,void 0,i??{})}return r._$AI(e),r};const ht=globalThis;class Y extends O{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const i=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=se(i,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return z}}Y._$litElement$=!0,Y.finalized=!0,ht.litElementHydrateSupport?.({LitElement:Y});const re=ht.litElementPolyfillSupport;re?.({LitElement:Y});(ht.litElementVersions??=[]).push("4.2.2");const ne=e=>(t,i)=>{i!==void 0?i.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)};const oe={attribute:!0,type:String,converter:Q,reflect:!1,hasChanged:lt},ae=(e=oe,t,i)=>{const{kind:s,metadata:r}=i;let n=globalThis.litPropertyMetadata.get(r);if(n===void 0&&globalThis.litPropertyMetadata.set(r,n=new Map),s==="setter"&&((e=Object.create(e)).wrapped=!0),n.set(i.name,e),s==="accessor"){const{name:o}=i;return{set(l){const d=t.get.call(this);t.set.call(this,l),this.requestUpdate(o,d,e,!0,l)},init(l){return l!==void 0&&this.C(o,void 0,e,l),l}}}if(s==="setter"){const{name:o}=i;return function(l){const d=this[o];t.call(this,l),this.requestUpdate(o,d,e,!0,l)}}throw Error("Unsupported decorator location: "+s)};function I(e){return(t,i)=>typeof i=="object"?ae(e,t,i):((s,r,n)=>{const o=r.hasOwnProperty(n);return r.constructor.createProperty(n,s),o?Object.getOwnPropertyDescriptor(r,n):void 0})(e,t,i)}function S(e){return I({...e,state:!0,attribute:!1})}const le=Ot`
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
`;class b{static snapPoint(t,i,s=[],r,n=.25){let o={...t};if(i.snapToElements&&s.length>0){let u=n,c=null;for(const h of s)for(const y of[h.start,h.end]){const m=this.distance(t,y);m<u&&(u=m,c=y)}if(c)return{point:{x:c.x,y:c.y},snappedTo:"vertex"}}let l,d;if(i.snapToElements&&s.length>0)for(const c of s)for(const h of[c.start,c.end])r&&Math.abs(h.x-r.x)<.01&&Math.abs(h.y-r.y)<.01||(l===void 0&&Math.abs(o.x-h.x)<.18&&(o.x=h.x,l=h.x),d===void 0&&Math.abs(o.y-h.y)<.18&&(o.y=h.y,d=h.y));let p=!1,a;if(i.snapToAngles&&r&&l===void 0&&d===void 0){const u=t.x-r.x,c=t.y-r.y,h=Math.sqrt(u*u+c*c);if(h>.05){let m=Math.atan2(c,u)*180/Math.PI;m<0&&(m+=360);const g=45,w=Math.round(m/g)*g;if(Math.abs(m-w)<=6){const P=w*Math.PI/180;o={x:r.x+h*Math.cos(P),y:r.y+h*Math.sin(P)},p=!0,a=w}}}if(i.snapToGrid&&!p&&l===void 0&&d===void 0){const u=i.size||.5;return o={x:Math.round(o.x/u)*u,y:Math.round(o.y/u)*u},{point:o,snappedTo:"grid"}}else{if(l!==void 0||d!==void 0)return{point:o,snappedTo:"smart_guide",smartGuideX:l,smartGuideY:d};if(p)return{point:o,snappedTo:"angle",guideAngle:a}}return{point:t,snappedTo:"none"}}static snapPointToWall(t,i,s=.6){let r=null,n=s;for(const o of i){const l=o.end.x-o.start.x,d=o.end.y-o.start.y,p=Math.sqrt(l*l+d*d);if(p===0)continue;const a=Math.max(0,Math.min(1,((t.x-o.start.x)*l+(t.y-o.start.y)*d)/(p*p))),u=o.start.x+a*l,c=o.start.y+a*d,h=Math.sqrt((t.x-u)**2+(t.y-c)**2);h<n&&(n=h,r={wall:o,projectionPoint:{x:u,y:c},offset:a*p,distance:h,angleRad:Math.atan2(d,l)})}return r}static distance(t,i){const s=t.x-i.x,r=t.y-i.y;return Math.sqrt(s*s+r*r)}static roundMeters(t,i=2){const s=Math.pow(10,i);return Math.round(t*s)/s}}class A{static isPointInPolygon(t,i){if(!i||i.length<3)return!1;let s=!1;for(let r=0,n=i.length-1;r<i.length;n=r++){const o=i[r].x,l=i[r].y,d=i[n].x,p=i[n].y;l>t.y!=p>t.y&&t.x<(d-o)*(t.y-l)/(p-l)+o&&(s=!s)}return s}static findRoomContainingPoint(t,i){for(const s of i)if(this.isPointInPolygon(t,s.polygon))return s;return null}static calculateCentroid(t){if(!t||t.length===0)return{x:0,y:0};let i=0,s=0;for(const r of t)i+=r.x,s+=r.y;return{x:i/t.length,y:s/t.length}}static computeArea(t){if(!t||t.length<3)return 0;let i=0;for(let s=0;s<t.length;s++){const r=(s+1)%t.length;i+=t[s].x*t[r].y,i-=t[r].x*t[s].y}return Math.round(Math.abs(i/2)*100)/100}}const de=[{type:"sofa_3p",name:"Canapé 3 places",category:"seating",width:2.2,length:.95,icon:"🛋️",renderSvg:(e,t,i)=>{const s=Math.max(8,e*.1),r=Math.max(10,t*.26),n=(e-s*2)/3;return f`
        <g class="furniture-symbol" stroke="${i?"#38bdf8":"#94a3b8"}" stroke-width="1.6" fill="${i?"rgba(56, 189, 248, 0.25)":"rgba(30, 41, 59, 0.85)"}">
          <!-- Contour principal -->
          <rect x="${-e/2}" y="${-t/2}" width="${e}" height="${t}" rx="6" />
          <!-- Dossier arrière -->
          <rect x="${-e/2+s}" y="${-t/2}" width="${e-s*2}" height="${r}" rx="3" fill="rgba(51, 65, 85, 0.9)" />
          <!-- Accoudoirs gauche & droit -->
          <rect x="${-e/2}" y="${-t/2}" width="${s}" height="${t}" rx="4" fill="rgba(51, 65, 85, 0.9)" />
          <rect x="${e/2-s}" y="${-t/2}" width="${s}" height="${t}" rx="4" fill="rgba(51, 65, 85, 0.9)" />
          <!-- 3 Coussins d'assise -->
          <rect x="${-e/2+s+2}" y="${-t/2+r+2}" width="${n-4}" height="${t-r-4}" rx="4" />
          <rect x="${-e/2+s+n+2}" y="${-t/2+r+2}" width="${n-4}" height="${t-r-4}" rx="4" />
          <rect x="${-e/2+s+n*2+2}" y="${-t/2+r+2}" width="${n-4}" height="${t-r-4}" rx="4" />
        </g>
      `}},{type:"sofa_2p",name:"Canapé 2 places",category:"seating",width:1.6,length:.9,icon:"🛋️",renderSvg:(e,t,i)=>{const s=Math.max(8,e*.12),r=Math.max(10,t*.26),n=(e-s*2)/2;return f`
        <g class="furniture-symbol" stroke="${i?"#38bdf8":"#94a3b8"}" stroke-width="1.6" fill="${i?"rgba(56, 189, 248, 0.25)":"rgba(30, 41, 59, 0.85)"}">
          <rect x="${-e/2}" y="${-t/2}" width="${e}" height="${t}" rx="6" />
          <rect x="${-e/2+s}" y="${-t/2}" width="${e-s*2}" height="${r}" rx="3" fill="rgba(51, 65, 85, 0.9)" />
          <rect x="${-e/2}" y="${-t/2}" width="${s}" height="${t}" rx="4" fill="rgba(51, 65, 85, 0.9)" />
          <rect x="${e/2-s}" y="${-t/2}" width="${s}" height="${t}" rx="4" fill="rgba(51, 65, 85, 0.9)" />
          <rect x="${-e/2+s+2}" y="${-t/2+r+2}" width="${n-4}" height="${t-r-4}" rx="4" />
          <rect x="${-e/2+s+n+2}" y="${-t/2+r+2}" width="${n-4}" height="${t-r-4}" rx="4" />
        </g>
      `}},{type:"divan",name:"Divan / Méridienne (Tête Gauche)",category:"seating",width:1.8,length:.85,icon:"🛋️",renderSvg:(e,t,i)=>{const s=Math.max(12,e*.22),r=Math.max(10,t*.24);return f`
        <g class="furniture-symbol" stroke="${i?"#38bdf8":"#94a3b8"}" stroke-width="1.6" fill="${i?"rgba(56, 189, 248, 0.25)":"rgba(30, 41, 59, 0.85)"}">
          <!-- Matelas / assise longue -->
          <rect x="${-e/2}" y="${-t/2}" width="${e}" height="${t}" rx="8" />
          <!-- Dossier asymétrique (méridienne / divan) -->
          <rect x="${-e/2}" y="${-t/2}" width="${e*.65}" height="${r}" rx="4" fill="rgba(51, 65, 85, 0.9)" />
          <!-- Tête de divan / repose-tête surélevé gauche -->
          <rect x="${-e/2}" y="${-t/2}" width="${s}" height="${t}" rx="6" fill="rgba(51, 65, 85, 0.9)" />
          <!-- Coussin capitonné -->
          <rect x="${-e/2+s+3}" y="${-t/2+r+3}" width="${e-s-6}" height="${t-r-6}" rx="5" />
          <!-- Lignes décoratives capitonnage -->
          <line x1="${-e/2+s+(e-s)*.33}" y1="${-t/2+r+4}" x2="${-e/2+s+(e-s)*.33}" y2="${t/2-4}" stroke-dasharray="3,3" opacity="0.5" />
          <line x1="${-e/2+s+(e-s)*.66}" y1="${-t/2+r+4}" x2="${-e/2+s+(e-s)*.66}" y2="${t/2-4}" stroke-dasharray="3,3" opacity="0.5" />
        </g>
      `}},{type:"divan_right",name:"Divan / Méridienne (Tête Droite)",category:"seating",width:1.8,length:.85,icon:"🛋️",renderSvg:(e,t,i)=>{const s=Math.max(12,e*.22),r=Math.max(10,t*.24);return f`
        <g class="furniture-symbol" stroke="${i?"#38bdf8":"#94a3b8"}" stroke-width="1.6" fill="${i?"rgba(56, 189, 248, 0.25)":"rgba(30, 41, 59, 0.85)"}">
          <!-- Matelas / assise longue -->
          <rect x="${-e/2}" y="${-t/2}" width="${e}" height="${t}" rx="8" />
          <!-- Dossier asymétrique (méridienne côté droit) -->
          <rect x="${e/2-e*.65}" y="${-t/2}" width="${e*.65}" height="${r}" rx="4" fill="rgba(51, 65, 85, 0.9)" />
          <!-- Tête de divan / repose-tête surélevé droit -->
          <rect x="${e/2-s}" y="${-t/2}" width="${s}" height="${t}" rx="6" fill="rgba(51, 65, 85, 0.9)" />
          <!-- Coussin capitonné -->
          <rect x="${-e/2+3}" y="${-t/2+r+3}" width="${e-s-6}" height="${t-r-6}" rx="5" />
          <!-- Lignes décoratives capitonnage -->
          <line x1="${-e/2+(e-s)*.33}" y1="${-t/2+r+4}" x2="${-e/2+(e-s)*.33}" y2="${t/2-4}" stroke-dasharray="3,3" opacity="0.5" />
          <line x1="${-e/2+(e-s)*.66}" y1="${-t/2+r+4}" x2="${-e/2+(e-s)*.66}" y2="${t/2-4}" stroke-dasharray="3,3" opacity="0.5" />
        </g>
      `}},{type:"armchair",name:"Fauteuil club",category:"seating",width:.85,length:.85,icon:"🪑",renderSvg:(e,t,i)=>{const s=Math.max(6,e*.18),r=Math.max(8,t*.28);return f`
        <g class="furniture-symbol" stroke="${i?"#38bdf8":"#94a3b8"}" stroke-width="1.5" fill="${i?"rgba(56, 189, 248, 0.25)":"rgba(30, 41, 59, 0.85)"}">
          <rect x="${-e/2}" y="${-t/2}" width="${e}" height="${t}" rx="6" />
          <rect x="${-e/2+s}" y="${-t/2}" width="${e-s*2}" height="${r}" rx="3" fill="rgba(51, 65, 85, 0.9)" />
          <rect x="${-e/2}" y="${-t/2}" width="${s}" height="${t}" rx="4" fill="rgba(51, 65, 85, 0.9)" />
          <rect x="${e/2-s}" y="${-t/2}" width="${s}" height="${t}" rx="4" fill="rgba(51, 65, 85, 0.9)" />
          <rect x="${-e/2+s+2}" y="${-t/2+r+2}" width="${e-s*2-4}" height="${t-r-4}" rx="4" />
        </g>
      `}},{type:"coffee_table",name:"Table basse",category:"seating",width:1.1,length:.6,icon:"☕",renderSvg:(e,t,i)=>f`
        <g class="furniture-symbol" stroke="${i?"#38bdf8":"#94a3b8"}" stroke-width="1.5" fill="${i?"rgba(56, 189, 248, 0.25)":"rgba(30, 41, 59, 0.85)"}">
          <rect x="${-e/2}" y="${-t/2}" width="${e}" height="${t}" rx="8" />
          <line x1="${-e/2+8}" y1="${-t/2+8}" x2="${e/2-8}" y2="${t/2-8}" stroke-dasharray="3,3" opacity="0.4" />
          <line x1="${e/2-8}" y1="${-t/2+8}" x2="${-e/2+8}" y2="${t/2-8}" stroke-dasharray="3,3" opacity="0.4" />
        </g>
      `},{type:"bed_double",name:"Lit double (Queen)",category:"bed",width:1.6,length:2,icon:"🛏️",renderSvg:(e,t,i)=>{const s=(e-16)/2,r=t*.22,n=-t/2+r+8;return f`
        <g class="furniture-symbol" stroke="${i?"#38bdf8":"#94a3b8"}" stroke-width="1.6" fill="${i?"rgba(56, 189, 248, 0.25)":"rgba(30, 41, 59, 0.85)"}">
          <!-- Cadre du lit -->
          <rect x="${-e/2}" y="${-t/2}" width="${e}" height="${t}" rx="6" />
          <!-- Tête de lit -->
          <line x1="${-e/2}" y1="${-t/2+4}" x2="${e/2}" y2="${-t/2+4}" stroke-width="3" stroke="${i?"#38bdf8":"#cbd5e1"}" />
          <!-- 2 Oreillers -->
          <rect x="${-e/2+6}" y="${-t/2+8}" width="${s}" height="${r}" rx="4" fill="rgba(241, 245, 249, 0.2)" />
          <rect x="${e/2-s-6}" y="${-t/2+8}" width="${s}" height="${r}" rx="4" fill="rgba(241, 245, 249, 0.2)" />
          <!-- Revers de couette -->
          <path d="M ${-e/2+4} ${n} Q 0 ${n+8} ${e/2-4} ${n}" fill="none" stroke-width="1.8" />
        </g>
      `}},{type:"bed_single",name:"Lit simple",category:"bed",width:.9,length:1.9,icon:"🛏️",renderSvg:(e,t,i)=>{const s=e-16,r=t*.22,n=-t/2+r+8;return f`
        <g class="furniture-symbol" stroke="${i?"#38bdf8":"#94a3b8"}" stroke-width="1.5" fill="${i?"rgba(56, 189, 248, 0.25)":"rgba(30, 41, 59, 0.85)"}">
          <rect x="${-e/2}" y="${-t/2}" width="${e}" height="${t}" rx="6" />
          <line x1="${-e/2}" y1="${-t/2+3}" x2="${e/2}" y2="${-t/2+3}" stroke-width="2.5" stroke="${i?"#38bdf8":"#cbd5e1"}" />
          <rect x="${-e/2+8}" y="${-t/2+8}" width="${s}" height="${r}" rx="4" fill="rgba(241, 245, 249, 0.2)" />
          <path d="M ${-e/2+4} ${n} Q 0 ${n+6} ${e/2-4} ${n}" fill="none" stroke-width="1.8" />
        </g>
      `}},{type:"nightstand",name:"Table de chevet",category:"bed",width:.45,length:.4,icon:"🕰️",renderSvg:(e,t,i)=>f`
        <g class="furniture-symbol" stroke="${i?"#38bdf8":"#94a3b8"}" stroke-width="1.4" fill="${i?"rgba(56, 189, 248, 0.25)":"rgba(30, 41, 59, 0.85)"}">
          <rect x="${-e/2}" y="${-t/2}" width="${e}" height="${t}" rx="4" />
          <line x1="${-e/2+4}" y1="${0}" x2="${e/2-4}" y2="${0}" stroke-width="1.2" />
          <circle cx="0" cy="${-t/4}" r="2" fill="${i?"#38bdf8":"#94a3b8"}" />
          <circle cx="0" cy="${t/4}" r="2" fill="${i?"#38bdf8":"#94a3b8"}" />
        </g>
      `},{type:"wardrobe",name:"Armoire dressing",category:"storage",width:1.8,length:.6,icon:"🚪",renderSvg:(e,t,i)=>{const s=e/3;return f`
        <g class="furniture-symbol" stroke="${i?"#38bdf8":"#94a3b8"}" stroke-width="1.5" fill="${i?"rgba(56, 189, 248, 0.25)":"rgba(30, 41, 59, 0.85)"}">
          <rect x="${-e/2}" y="${-t/2}" width="${e}" height="${t}" rx="3" />
          <line x1="${-e/2+s}" y1="${-t/2}" x2="${-e/2+s}" y2="${t/2}" />
          <line x1="${-e/2+s*2}" y1="${-t/2}" x2="${-e/2+s*2}" y2="${t/2}" />
          <!-- Tringle à vêtements symbolique -->
          <line x1="${-e/2+6}" y1="0" x2="${e/2-6}" y2="0" stroke-dasharray="4,3" stroke-width="1.2" opacity="0.6" />
        </g>
      `}},{type:"dining_table_6",name:"Table repas (6 chaises)",category:"table",width:1.6,length:.9,icon:"🍽️",renderSvg:(e,t,i)=>{const s=e*.24,r=7;return f`
        <g class="furniture-symbol" stroke="${i?"#38bdf8":"#94a3b8"}" stroke-width="1.5" fill="${i?"rgba(56, 189, 248, 0.25)":"rgba(30, 41, 59, 0.85)"}">
          <!-- Plateau principal -->
          <rect x="${-e/2}" y="${-t/2}" width="${e}" height="${t}" rx="5" />
          <!-- 3 Chaises du haut -->
          <rect x="${-e/2+6}" y="${-t/2-r}" width="${s}" height="${r}" rx="2" />
          <rect x="${-s/2}" y="${-t/2-r}" width="${s}" height="${r}" rx="2" />
          <rect x="${e/2-s-6}" y="${-t/2-r}" width="${s}" height="${r}" rx="2" />
          <!-- 3 Chaises du bas -->
          <rect x="${-e/2+6}" y="${t/2}" width="${s}" height="${r}" rx="2" />
          <rect x="${-s/2}" y="${t/2}" width="${s}" height="${r}" rx="2" />
          <rect x="${e/2-s-6}" y="${t/2}" width="${s}" height="${r}" rx="2" />
        </g>
      `}},{type:"desk",name:"Bureau avec fauteuil",category:"table",width:1.4,length:.7,icon:"💻",renderSvg:(e,t,i)=>f`
        <g class="furniture-symbol" stroke="${i?"#38bdf8":"#94a3b8"}" stroke-width="1.5" fill="${i?"rgba(56, 189, 248, 0.25)":"rgba(30, 41, 59, 0.85)"}">
          <!-- Plateau de bureau -->
          <rect x="${-e/2}" y="${-t/2}" width="${e}" height="${t}" rx="4" />
          <!-- Écran d'ordinateur symbolique -->
          <rect x="-14" y="${-t/2+6}" width="28" height="4" rx="1" fill="${i?"#38bdf8":"#cbd5e1"}" />
          <!-- Évidement chaise -->
          <path d="M -16 ${t/2} A 16 16 0 0 1 16 ${t/2}" fill="none" stroke-dasharray="3,3" />
        </g>
      `},{type:"chair_starck",name:"Chaise Starck (Ghost)",category:"table",width:.54,length:.55,icon:"🪑",renderSvg:(e,t,i)=>{const s=Math.min(e,t)*.38,r=Math.min(e,t)*.32;return f`
        <g class="furniture-symbol" stroke="${i?"#38bdf8":"#94a3b8"}" stroke-width="1.5" fill="${i?"rgba(56, 189, 248, 0.25)":"rgba(30, 41, 59, 0.85)"}">
          <!-- Assise carrée aux coins adoucis -->
          <rect x="${-e/2+2}" y="${-t/2+6}" width="${e-4}" height="${t-10}" rx="6" />
          <!-- Dossier médaillon emblématique de type Starck / Louis Ghost -->
          <ellipse cx="0" cy="${-t/2+6}" rx="${r}" ry="${t*.16}" fill="rgba(56, 189, 248, 0.15)" stroke-width="1.6" />
          <!-- Accoudoirs fluides galbés -->
          <path d="M ${-e/2+4} ${-t/2+10} Q ${-e/2+1} 0 ${-e/2+6} ${t/2-6}" fill="none" stroke-width="1.4" opacity="0.8" />
          <path d="M ${e/2-4} ${-t/2+10} Q ${e/2-1} 0 ${e/2-6} ${t/2-6}" fill="none" stroke-width="1.4" opacity="0.8" />
          <!-- Galbe assise transparente -->
          <circle cx="0" cy="${t*.08}" r="${s*.55}" fill="none" stroke-dasharray="2,2" opacity="0.4" />
        </g>
      `}},{type:"console",name:"Console murale",category:"table",width:1.2,length:.35,icon:"🗄️",renderSvg:(e,t,i)=>{const s=(e-8)/2;return f`
        <g class="furniture-symbol" stroke="${i?"#38bdf8":"#94a3b8"}" stroke-width="1.5" fill="${i?"rgba(56, 189, 248, 0.25)":"rgba(30, 41, 59, 0.85)"}">
          <!-- Plateau fin élancé -->
          <rect x="${-e/2}" y="${-t/2}" width="${e}" height="${t}" rx="3" />
          <!-- 2 Tiroirs ou compartiments de rangement -->
          <rect x="${-e/2+3}" y="${-t/2+3}" width="${s}" height="${t-6}" rx="2" fill="rgba(51, 65, 85, 0.9)" />
          <rect x="${1}" y="${-t/2+3}" width="${s}" height="${t-6}" rx="2" fill="rgba(51, 65, 85, 0.9)" />
          <!-- Poignées discrètes en laiton -->
          <circle cx="${-e/4}" cy="0" r="1.8" fill="${i?"#38bdf8":"#f59e0b"}" />
          <circle cx="${e/4}" cy="0" r="1.8" fill="${i?"#38bdf8":"#f59e0b"}" />
        </g>
      `}},{type:"toilet",name:"WC / Toilettes",category:"bathroom",width:.45,length:.65,icon:"🚽",renderSvg:(e,t,i)=>{const s=t*.28;return f`
        <g class="furniture-symbol" stroke="${i?"#38bdf8":"#94a3b8"}" stroke-width="1.5" fill="${i?"rgba(56, 189, 248, 0.25)":"rgba(30, 41, 59, 0.85)"}">
          <!-- Réservoir d'eau -->
          <rect x="${-e/2}" y="${-t/2}" width="${e}" height="${s}" rx="3" fill="rgba(51, 65, 85, 0.9)" />
          <!-- Cuvette de WC -->
          <path d="M ${-e/2+2} ${-t/2+s} 
                   L ${e/2-2} ${-t/2+s} 
                   L ${e/2-2} ${t/2-e/2} 
                   A ${e/2-2} ${e/2-2} 0 0 1 ${-e/2+2} ${t/2-e/2} 
                   Z" />
        </g>
      `}},{type:"shower",name:"Douche italienne",category:"bathroom",width:.9,length:.9,icon:"🚿",renderSvg:(e,t,i)=>f`
        <g class="furniture-symbol" stroke="${i?"#38bdf8":"#94a3b8"}" stroke-width="1.5" fill="${i?"rgba(56, 189, 248, 0.25)":"rgba(30, 41, 59, 0.85)"}">
          <!-- Bac carré -->
          <rect x="${-e/2}" y="${-t/2}" width="${e}" height="${t}" rx="2" />
          <!-- Diagonales d'écoulement -->
          <line x1="${-e/2}" y1="${-t/2}" x2="0" y2="0" stroke-width="1" stroke-dasharray="2,2" opacity="0.6" />
          <line x1="${e/2}" y1="${-t/2}" x2="0" y2="0" stroke-width="1" stroke-dasharray="2,2" opacity="0.6" />
          <line x1="${-e/2}" y1="${t/2}" x2="0" y2="0" stroke-width="1" stroke-dasharray="2,2" opacity="0.6" />
          <line x1="${e/2}" y1="${t/2}" x2="0" y2="0" stroke-width="1" stroke-dasharray="2,2" opacity="0.6" />
          <!-- Bonde centrale -->
          <circle cx="0" cy="0" r="4" fill="${i?"#38bdf8":"#0284c7"}" />
        </g>
      `},{type:"bathtub",name:"Baignoire droite",category:"bathroom",width:1.7,length:.75,icon:"🛁",renderSvg:(e,t,i)=>f`
        <g class="furniture-symbol" stroke="${i?"#38bdf8":"#94a3b8"}" stroke-width="1.6" fill="${i?"rgba(56, 189, 248, 0.25)":"rgba(30, 41, 59, 0.85)"}">
          <!-- Contour extérieur -->
          <rect x="${-e/2}" y="${-t/2}" width="${e}" height="${t}" rx="5" />
          <!-- Cuve arrondie intérieure -->
          <rect x="${-e/2+6}" y="${-t/2+6}" width="${e-12}" height="${t-12}" rx="${(t-12)/2}" fill="rgba(2, 132, 199, 0.2)" />
          <!-- Bonde -->
          <circle cx="${-e/2+18}" cy="0" r="3" fill="${i?"#38bdf8":"#94a3b8"}" />
        </g>
      `},{type:"sink_vanity",name:"Meuble vasque",category:"bathroom",width:.9,length:.5,icon:"🧼",renderSvg:(e,t,i)=>{const s=e*.65,r=t*.65;return f`
        <g class="furniture-symbol" stroke="${i?"#38bdf8":"#94a3b8"}" stroke-width="1.5" fill="${i?"rgba(56, 189, 248, 0.25)":"rgba(30, 41, 59, 0.85)"}">
          <rect x="${-e/2}" y="${-t/2}" width="${e}" height="${t}" rx="3" />
          <!-- Vasque ovale -->
          <ellipse cx="0" cy="0" rx="${s/2}" ry="${r/2}" fill="rgba(2, 132, 199, 0.25)" />
          <!-- Robinet -->
          <circle cx="0" cy="${-r/2+2}" r="2" fill="${i?"#38bdf8":"#94a3b8"}" />
        </g>
      `}},{type:"kitchen_sink",name:"Évier cuisine double",category:"kitchen",width:1,length:.6,icon:"🚰",renderSvg:(e,t,i)=>{const s=(e-18)/2,r=t-16;return f`
        <g class="furniture-symbol" stroke="${i?"#38bdf8":"#94a3b8"}" stroke-width="1.5" fill="${i?"rgba(56, 189, 248, 0.25)":"rgba(30, 41, 59, 0.85)"}">
          <rect x="${-e/2}" y="${-t/2}" width="${e}" height="${t}" rx="3" />
          <!-- 2 Bacs -->
          <rect x="${-e/2+6}" y="${-t/2+8}" width="${s}" height="${r}" rx="4" fill="rgba(2, 132, 199, 0.25)" />
          <rect x="${6}" y="${-t/2+8}" width="${s}" height="${r}" rx="4" fill="rgba(2, 132, 199, 0.25)" />
          <!-- Mitigeur -->
          <circle cx="0" cy="${-t/2+5}" r="2.5" fill="${i?"#38bdf8":"#f59e0b"}" />
        </g>
      `}},{type:"cooktop",name:"Plaque de cuisson",category:"kitchen",width:.6,length:.6,icon:"🍳",renderSvg:(e,t,i)=>{const s=Math.min(e,t)*.18,r=Math.min(e,t)*.13;return f`
        <g class="furniture-symbol" stroke="${i?"#38bdf8":"#94a3b8"}" stroke-width="1.5" fill="${i?"rgba(56, 189, 248, 0.25)":"rgba(30, 41, 59, 0.85)"}">
          <rect x="${-e/2}" y="${-t/2}" width="${e}" height="${t}" rx="4" />
          <!-- 4 Feux / Foyers induction -->
          <circle cx="${-e/4}" cy="${-t/4}" r="${s}" fill="rgba(239, 68, 68, 0.2)" />
          <circle cx="${e/4}" cy="${-t/4}" r="${r}" fill="rgba(239, 68, 68, 0.2)" />
          <circle cx="${-e/4}" cy="${t/4}" r="${r}" fill="rgba(239, 68, 68, 0.2)" />
          <circle cx="${e/4}" cy="${t/4}" r="${s}" fill="rgba(239, 68, 68, 0.2)" />
        </g>
      `}},{type:"fridge",name:"Réfrigérateur",category:"kitchen",width:.65,length:.65,icon:"🧊",renderSvg:(e,t,i)=>f`
        <g class="furniture-symbol" stroke="${i?"#38bdf8":"#94a3b8"}" stroke-width="1.5" fill="${i?"rgba(56, 189, 248, 0.25)":"rgba(30, 41, 59, 0.85)"}">
          <rect x="${-e/2}" y="${-t/2}" width="${e}" height="${t}" rx="3" />
          <line x1="${-e/2}" y1="${-t/2+6}" x2="${e/2}" y2="${-t/2+6}" stroke-width="2" />
          <line x1="${-e/2+8}" y1="${-t/2+3}" x2="${-e/2+20}" y2="${-t/2+3}" stroke-width="2" stroke="${"#38bdf8"}" />
          <!-- Symbole Froid Flocon -->
          <text x="0" y="3" text-anchor="middle" font-size="12" fill="${"#38bdf8"}" stroke="none">❄</text>
        </g>
      `}];function It(e){return de.find(t=>t.type===e)}class ce{static calculateBoundingBox(t,i){const s=t.pixelsPerMeter||50,r=[];for(const g of t.walls)r.push(g.start,g.end);for(const g of t.rooms)g.polygon&&g.polygon.length>0&&r.push(...g.polygon);for(const g of t.bindings)g.position&&r.push(g.position);if(t.furniture){for(const g of t.furniture)if(g.position){const w=(g.width||1)/2,_=(g.length||1)/2;r.push({x:g.position.x-w,y:g.position.y-_},{x:g.position.x+w,y:g.position.y+_})}}if(t.background&&t.background.imageUrl&&t.background.visible){const g=t.background,w=g.offset||{x:0,y:0},_=g.scale||1,P=(g.widthPx||1200)*_/s,W=(g.heightPx||900)*_/s;r.push({x:w.x,y:w.y},{x:w.x+P,y:w.y+W})}if(r.length===0)return{minX:-1,minY:-1,width:12,height:8,ppm:s};let n=Math.min(...r.map(g=>g.x)),o=Math.max(...r.map(g=>g.x)),l=Math.min(...r.map(g=>g.y)),d=Math.max(...r.map(g=>g.y));const p=o-n||5,a=d-l||5,u=i!==void 0?i:Math.max(.6,Math.max(p,a)*.05),c=n-u,h=l-u,y=o-n+u*2,m=d-l+u*2;return{minX:c,minY:h,width:y,height:m,ppm:s}}static worldToPercentage(t,i){const s=(t.x-i.minX)/i.width*100,r=(t.y-i.minY)/i.height*100;return{left:Math.round(s*10)/10,top:Math.round(r*10)/10}}static exportToSvg(t,i){const s={includeRooms:!0,includeWalls:!0,includeOpenings:!0,includeFurniture:!0,includeRoomLabels:!0,includeEntityMarkers:!1,includeBackground:!0,backgroundColor:"#0f172a",...i},r=this.calculateBoundingBox(t,s.paddingMeters),n=r.ppm,o=(r.minX*n).toFixed(1),l=(r.minY*n).toFixed(1),d=Math.max(100,Math.round(r.width*n)),p=Math.max(100,Math.round(r.height*n));let a="";if(s.backgroundColor&&s.backgroundColor!=="transparent"&&(a+=`  <rect x="${o}" y="${l}" width="${d}" height="${p}" fill="${s.backgroundColor}" />
`),s.includeBackground!==!1&&t.background?.imageUrl&&t.background.visible){const c=t.background,h=(c.offset?.x||0)*n,y=(c.offset?.y||0)*n,m=c.scale||1,g=(c.widthPx||1200)*m,w=(c.heightPx||900)*m;a+=`  <!-- Image de fond du plan d'origine -->
`,a+=`  <image href="${c.imageUrl}" x="${h.toFixed(1)}" y="${y.toFixed(1)}" width="${g.toFixed(1)}" height="${w.toFixed(1)}" opacity="${c.opacity||.6}" />
`}if(s.includeRooms&&t.rooms.length>0){a+=`  <!-- Pièces -->
  <g id="rooms">
`;for(const c of t.rooms){if(!c.polygon||c.polygon.length<3)continue;const h=c.polygon.map(m=>`${(m.x*n).toFixed(1)},${(m.y*n).toFixed(1)}`).join(" "),y=c.color||"rgba(56, 189, 248, 0.12)";a+=`    <polygon points="${h}" fill="${y}" stroke="rgba(56, 189, 248, 0.4)" stroke-width="1.5" />
`}a+=`  </g>
`}if(s.includeWalls&&t.walls.length>0){a+=`  <!-- Murs -->
  <g id="walls">
`;for(const c of t.walls){const y=this.computeWallPolygon(c.start,c.end,c.thickness).map(m=>`${(m.x*n).toFixed(1)},${(m.y*n).toFixed(1)}`).join(" ");a+=`    <polygon points="${y}" fill="#334155" stroke="#64748b" stroke-width="1" />
`}a+=`  </g>
`}if(s.includeOpenings&&t.openings.length>0){a+=`  <!-- Portes & Fenêtres -->
  <g id="openings">
`;for(const c of t.openings){const h=t.walls.find(k=>k.id===c.wallId);if(!h)continue;const y=h.end.x-h.start.x,m=h.end.y-h.start.y,g=Math.sqrt(y*y+m*m);if(g===0)continue;const _=(Math.atan2(m,y)*180/Math.PI).toFixed(1),P=(h.start.x+c.offset/g*y)*n,W=(h.start.y+c.offset/g*m)*n,C=c.width*n,v=h.thickness*n;if(a+=`    <g transform="translate(${P.toFixed(1)}, ${W.toFixed(1)}) rotate(${_})">
`,a+=`      <rect x="${(-C/2).toFixed(1)}" y="${(-v/2-1).toFixed(1)}" width="${C.toFixed(1)}" height="${(v+2).toFixed(1)}" fill="${s.backgroundColor||"#0f172a"}" />
`,c.type==="door"){const k=C/2,E=c.flipSide?-1:1,T=c.flipDirection?k:-k,G=c.flipDirection?-1:1;a+=`      <rect x="${-k}" y="${-v/2}" width="4" height="${v}" fill="#94a3b8" />
`,a+=`      <rect x="${k-4}" y="${-v/2}" width="4" height="${v}" fill="#94a3b8" />
`,a+=`      <line x1="${T}" y1="0" x2="${T}" y2="${E*C}" stroke="#38bdf8" stroke-width="2" stroke-linecap="round" />
`,a+=`      <path d="M ${T+G*C} 0 A ${C} ${C} 0 0 ${E>0?c.flipDirection?0:1:c.flipDirection?1:0} ${T} ${E*C}" fill="rgba(56, 189, 248, 0.08)" stroke="#38bdf8" stroke-width="1.2" stroke-dasharray="3, 3" />
`}else if(c.type==="french_window"){const k=C/2;a+=`      <rect x="${(-k).toFixed(1)}" y="${(-v/2).toFixed(1)}" width="${C.toFixed(1)}" height="${v.toFixed(1)}" fill="none" stroke="#94a3b8" stroke-width="2" />
`,a+=`      <rect x="${(-k).toFixed(1)}" y="${(-v/4).toFixed(1)}" width="${k.toFixed(1)}" height="3" fill="#38bdf8" />
`,a+=`      <rect x="0" y="${(v/4).toFixed(1)}" width="${k.toFixed(1)}" height="3" fill="#38bdf8" />
`}else{const k=C/2,E=c.sashCount===2||c.width>=1.25;a+=`      <rect x="${(-k).toFixed(1)}" y="${(-v/2).toFixed(1)}" width="${C.toFixed(1)}" height="${v.toFixed(1)}" fill="none" stroke="#94a3b8" stroke-width="2" />
`,a+=`      <line x1="${(-k).toFixed(1)}" y1="0" x2="${k.toFixed(1)}" y2="0" stroke="#38bdf8" stroke-width="1.5" />
`,E&&(a+=`      <line x1="0" y1="${(-v/2).toFixed(1)}" x2="0" y2="${(v/2).toFixed(1)}" stroke="#38bdf8" stroke-width="2" />
`)}a+=`    </g>
`}a+=`  </g>
`}if(s.includeRoomLabels&&t.rooms.length>0){a+=`  <!-- Étiquettes de Pièces -->
  <g id="room-labels">
`;for(const c of t.rooms){if(!c.polygon||c.polygon.length<3)continue;const h=A.calculateCentroid(c.polygon),y=(h.x*n).toFixed(1),m=(h.y*n).toFixed(1);a+=`    <g transform="translate(${y}, ${m})">
`,a+=`      <text y="-6" fill="#f8fafc" font-size="13" font-weight="700" text-anchor="middle">${this.escapeXml(c.name)}</text>
`,a+=`      <text y="12" fill="#38bdf8" font-size="11" font-weight="600" text-anchor="middle" font-family="monospace">${c.areaM2.toFixed(1)} m²</text>
`,a+=`    </g>
`}a+=`  </g>
`}if(s.includeFurniture!==!1&&t.furniture&&t.furniture.length>0){a+=`  <!-- Meubles et Équipements -->
  <g id="furniture-layer">
`;for(const c of t.furniture){const h=(c.position.x*n).toFixed(1),y=(c.position.y*n).toFixed(1),m=((c.width||1)*n).toFixed(1),g=((c.length||1)*n).toFixed(1),w=c.rotation||0,_=c.color||"#38bdf8",P=((c.width||1)*n/2).toFixed(1),W=((c.length||1)*n/2).toFixed(1);a+=`    <g transform="translate(${h}, ${y}) rotate(${w})">
`,a+=`      <rect x="-${P}" y="-${W}" width="${m}" height="${g}" rx="4" fill="rgba(30, 41, 59, 0.75)" stroke="${_}" stroke-width="1.5" />
`,c.icon&&(a+=`      <text x="0" y="4" font-size="12" text-anchor="middle" fill="#f8fafc">${this.escapeXml(c.icon)}</text>
`),a+=`    </g>
`}a+=`  </g>
`}if(s.includeEntityMarkers&&t.bindings.length>0){a+=`  <!-- Emplacements des Entités -->
  <g id="entity-markers">
`;for(const c of t.bindings){const h=(c.position.x*n).toFixed(1),y=(c.position.y*n).toFixed(1),m=c.icon||"⚡",g=c.customName||c.entityId.split(".")[1];a+=`    <g transform="translate(${h}, ${y})">
`,a+=`      <circle cx="0" cy="0" r="16" fill="rgba(30, 41, 59, 0.85)" stroke="#38bdf8" stroke-width="1.5" />
`,a+=`      <text x="0" y="5" font-size="12" text-anchor="middle">${this.escapeXml(m)}</text>
`,a+=`      <text x="0" y="26" fill="#f1f5f9" font-size="10" font-weight="600" text-anchor="middle">${this.escapeXml(g)}</text>
`,a+=`    </g>
`}a+=`  </g>
`}return`<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="${o} ${l} ${d} ${p}" width="${d}" height="${p}" style="background-color: ${s.backgroundColor||"#0f172a"}; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 100%; height: auto;">
${a}</svg>`}static computeWallPolygon(t,i,s){const r=i.x-t.x,n=i.y-t.y,o=Math.sqrt(r*r+n*n);if(o===0)return[t,t,i,i];const l=s/2,d=-n/o*l,p=r/o*l;return[{x:t.x+d,y:t.y+p},{x:i.x+d,y:i.y+p},{x:i.x-d,y:i.y-p},{x:t.x-d,y:t.y-p}]}static escapeXml(t){return t.replace(/[<>&'"]/g,i=>{switch(i){case"<":return"&lt;";case">":return"&gt;";case"&":return"&amp;";case"'":return"&apos;";case'"':return"&quot;";default:return i}})}}var he=Object.defineProperty,ue=Object.getOwnPropertyDescriptor,$=(e,t,i,s)=>{for(var r=s>1?void 0:s?ue(t,i):t,n=e.length-1,o;n>=0;n--)(o=e[n])&&(r=(s?o(t,i,r):o(r))||r);return s&&r&&he(t,i,r),r};let x=class extends Y{constructor(){super(...arguments),this.project={id:"default",name:"Plan sans titre",created_at:new Date().toISOString(),updated_at:new Date().toISOString(),pixelsPerMeter:50,grid:{size:.5,subdivisions:2,snapToGrid:!0,snapToAngles:!0,snapToElements:!0},walls:[],openings:[],rooms:[],bindings:[]},this.activeTool="wall",this.currentWallThickness=.2,this.currentOpeningWidth=.9,this.is3DMode=!1,this.selectedElements={wallIds:[],openingIds:[],roomIds:[],bindingIds:[],furnitureIds:[]},this.isDashboardMode=!1,this.ghostProject=null,this.showDimensions=!0,this.showThermalHeatmap=!1,this.isMarqueeSelecting=!1,this.marqueeStart=null,this.marqueeCurrent=null,this.viewport={x:300,y:300,zoom:1},this.isPanning=!1,this.panStart={x:0,y:0},this.drawingWallStart=null,this.previewPoint=null,this.snapInfo={snappedTo:"none"},this.cursorCoords={x:0,y:0},this.draggingFurnitureId=null,this.dragFurnitureMoved=!1,this.dragFurnitureStartPos={x:0,y:0},this.dragFurnitureItemStartPos={x:0,y:0},this.rotatingFurnitureId=null,this.rotateFurnitureMoved=!1,this.rotateFurnitureStartAngle=0,this.rotateFurnitureInitialAngle=0,this.draggingWallId=null,this.dragWallMoved=!1,this.dragWallStartPointer={x:0,y:0},this.dragWallInitialStart={x:0,y:0},this.dragWallInitialEnd={x:0,y:0},this.wallSnap=null,this.openingFlipSide=!1,this.openingFlipDirection=!1,this.windowSashCount=1,this.calibrateStart=null,this.calibrateCurrent=null,this.rescaleStart=null,this.rescaleCurrent=null,this._boundKeyDown=null,this.draggingBindingId=null,this.dragBindingMoved=!1,this.dragBindingStartPos={x:0,y:0},this.viewRotation=0,this.orbitPitch=55,this.orbitYaw=-35,this.isOrbiting=!1,this.orbitStart={x:0,y:0},this.orbitStartPitch=55,this.orbitStartYaw=-35,this._canvasResizeObserver=null}setCameraPreset(e,t){this.orbitPitch=e,this.orbitYaw=t,this.requestUpdate()}screenToWorld(e,t){const i=this.getBoundingClientRect();let s=e-i.left,r=t-i.top;if(!this.is3DMode&&this.viewRotation!==0){const o=(i.width||800)/2,l=(i.height||600)/2,d=s-o,p=r-l,a=-this.viewRotation*Math.PI/180;s=o+(d*Math.cos(a)-p*Math.sin(a)),r=l+(d*Math.sin(a)+p*Math.cos(a))}const n=this.project.pixelsPerMeter*this.viewport.zoom;return{x:(s-this.viewport.x)/n,y:(r-this.viewport.y)/n}}worldToScreen(e){const t=this.project.pixelsPerMeter*this.viewport.zoom;let i=e.x*t+this.viewport.x,s=e.y*t+this.viewport.y;if(!this.is3DMode&&this.viewRotation!==0){const r=this.getBoundingClientRect(),n=(r.width||800)/2,o=(r.height||600)/2,l=i-n,d=s-o,p=this.viewRotation*Math.PI/180;i=n+(l*Math.cos(p)-d*Math.sin(p)),s=o+(l*Math.sin(p)+d*Math.cos(p))}return{x:i,y:s}}handleWheel(e){e.preventDefault();const t=this.getBoundingClientRect(),i=e.clientX-t.left,s=e.clientY-t.top,r=e.deltaY<0?1.12:.89,n=Math.min(Math.max(this.viewport.zoom*r,.15),8),o=i-(i-this.viewport.x)*(n/this.viewport.zoom),l=s-(s-this.viewport.y)*(n/this.viewport.zoom);this.viewport={x:o,y:l,zoom:n}}handlePointerDown(e){if(this.is3DMode){if(e.button===1||e.button===0&&e.shiftKey){this.isPanning=!0,this.panStart={x:e.clientX-this.viewport.x,y:e.clientY-this.viewport.y},e.target.setPointerCapture?.(e.pointerId);return}if(e.button===2||e.button===0&&e.altKey){this.isOrbiting=!0,this.orbitStart={x:e.clientX,y:e.clientY},this.orbitStartPitch=this.orbitPitch,this.orbitStartYaw=this.orbitYaw,e.target.setPointerCapture?.(e.pointerId);return}if(e.button===0&&!e.target?.closest?.(".wall-element, .wall-element-3d, .room-group, .entity-pin, .opening-element, .furniture-group")){this.selectedElements={wallIds:[],openingIds:[],roomIds:[],bindingIds:[],furnitureIds:[]},this.dispatchSelectionChanged(),this.isOrbiting=!0,this.orbitStart={x:e.clientX,y:e.clientY},this.orbitStartPitch=this.orbitPitch,this.orbitStartYaw=this.orbitYaw,e.target.setPointerCapture?.(e.pointerId);return}return}if(e.button===1){this.isPanning=!0,this.panStart={x:e.clientX-this.viewport.x,y:e.clientY-this.viewport.y},e.target.setPointerCapture?.(e.pointerId);return}if(e.button!==0)return;const t=e.target,i=!!t?.closest?.(".wall-element, .wall-element-3d, .room-group, .entity-pin, .opening-element, .furniture-group, .dimension-badge, .wall-dim-badge, .hud-btn");if(t?.closest?.(".entity-pin, .furniture-group"))return;if(this.activeTool==="select"){if(i)return;if(e.shiftKey){const r=this.screenToWorld(e.clientX,e.clientY);this.isMarqueeSelecting=!0,this.marqueeStart=r,this.marqueeCurrent=r,e.target.setPointerCapture?.(e.pointerId);return}this.selectedElements={wallIds:[],openingIds:[],roomIds:[],bindingIds:[],furnitureIds:[]},this.dispatchSelectionChanged(),this.isPanning=!0,this.panStart={x:e.clientX-this.viewport.x,y:e.clientY-this.viewport.y},e.target.setPointerCapture?.(e.pointerId);return}if(e.shiftKey){this.isPanning=!0,this.panStart={x:e.clientX-this.viewport.x,y:e.clientY-this.viewport.y},e.target.setPointerCapture?.(e.pointerId);return}const s=this.screenToWorld(e.clientX,e.clientY);if(this.activeTool==="wall"){const r=b.snapPoint(s,this.project.grid,this.project.walls,this.drawingWallStart||void 0);if(!this.drawingWallStart)this.drawingWallStart=r.point;else{const n=this.drawingWallStart,o=r.point;if(b.distance(n,o)>=.15){const d={id:`wall_${Date.now()}_${Math.random().toString(36).substr(2,4)}`,start:{...n},end:{...o},thickness:this.currentWallThickness,type:"standard"};this.project={...this.project,walls:[...this.project.walls,d]},this.dispatchProjectChanged(),this.drawingWallStart=o}}}else if(this.activeTool==="door"||this.activeTool==="window"||this.activeTool==="french_window"){if(this.wallSnap){const r=this.activeTool==="window"?"window":this.activeTool==="french_window"?"french_window":"door",n=r==="door"?.9:r==="french_window"?2:this.windowSashCount===2?1.4:.9,o={id:`op_${Date.now()}_${Math.random().toString(36).substr(2,4)}`,wallId:this.wallSnap.wall.id,type:r,offset:b.roundMeters(this.wallSnap.offset),width:this.currentOpeningWidth||n,flipSide:this.openingFlipSide,flipDirection:this.openingFlipDirection,sashCount:r==="window"?this.windowSashCount||1:r==="french_window"?2:1};this.project={...this.project,openings:[...this.project.openings,o]},this.dispatchProjectChanged()}}else if(this.activeTool==="calibrate"){const r=this.getBoundingClientRect(),n={x:e.clientX-r.left,y:e.clientY-r.top};if(!this.calibrateStart)this.calibrateStart=n,this.calibrateCurrent=n;else{const o=n.x-this.calibrateStart.x,l=n.y-this.calibrateStart.y,d=Math.sqrt(o*o+l*l);if(d>=10){const p=d/this.viewport.zoom;this.dispatchEvent(new CustomEvent("request-calibration",{detail:{pixelDistance:p,defaultMeters:b.roundMeters(p/this.project.pixelsPerMeter)},bubbles:!0,composed:!0})),this.calibrateStart=null,this.calibrateCurrent=null}}}else if(this.activeTool==="rescale"){const r=this.screenToWorld(e.clientX,e.clientY);let n=b.snapPoint(r,this.project.grid,this.project.walls,this.rescaleStart||void 0);if(n.snappedTo==="none"&&this.project.walls.length>0){const o=b.snapPointToWall(r,this.project.walls,.6);o&&(n={point:o.projectionPoint,snappedTo:"vertex"})}if(!this.rescaleStart)this.rescaleStart=n.point,this.rescaleCurrent=n.point;else{const o=this.rescaleStart,l=n.point,d=b.distance(o,l);d>=.05&&(this.dispatchEvent(new CustomEvent("request-rescale",{detail:{measuredMeters:b.roundMeters(d)},bubbles:!0,composed:!0})),this.rescaleStart=null,this.rescaleCurrent=null,this.previewPoint=null)}}}handlePointerMove(e){if(this.rotatingFurnitureId){this.rotateFurnitureMoved=!0;const i=(this.project.furniture||[]).find(s=>s.id===this.rotatingFurnitureId);if(i){const s=this.worldToScreen(i.position),n=Math.atan2(e.clientY-s.y,e.clientX-s.x)*(180/Math.PI)-this.rotateFurnitureStartAngle;let o=Math.round(this.rotateFurnitureInitialAngle+n);o=(o%360+360)%360;const l=(this.project.furniture||[]).map(d=>d.id===this.rotatingFurnitureId?{...d,rotation:o}:d);this.project={...this.project,furniture:l},this.requestUpdate()}return}if(this.isOrbiting){const i=e.clientX-this.orbitStart.x,s=e.clientY-this.orbitStart.y;this.orbitYaw=(this.orbitStartYaw+i*.55)%360,this.orbitPitch=Math.max(15,Math.min(85,this.orbitStartPitch-s*.38)),this.requestUpdate();return}if(this.draggingFurnitureId){if(Math.hypot(e.clientX-this.dragFurnitureStartPos.x,e.clientY-this.dragFurnitureStartPos.y)>3){this.dragFurnitureMoved=!0;const s=this.project.pixelsPerMeter*this.viewport.zoom,r=(e.clientX-this.dragFurnitureStartPos.x)/s,n=(e.clientY-this.dragFurnitureStartPos.y)/s;let o=this.dragFurnitureItemStartPos.x+r,l=this.dragFurnitureItemStartPos.y+n;if(this.project.grid.snapToGrid&&e.altKey){const u=this.project.grid.size||.5;o=Math.round(o/u)*u,l=Math.round(l/u)*u}const d={x:Math.round(o*1e3)/1e3,y:Math.round(l*1e3)/1e3},p=A.findRoomContainingPoint(d,this.project.rooms),a=(this.project.furniture||[]).map(u=>u.id===this.draggingFurnitureId?{...u,position:d,roomId:p?.id}:u);this.project={...this.project,furniture:a},this.requestUpdate()}return}if(this.draggingWallId){if(Math.hypot(e.clientX-this.dragWallStartPointer.x,e.clientY-this.dragWallStartPointer.y)>3){this.dragWallMoved=!0;const s=this.project.pixelsPerMeter*this.viewport.zoom;let r=(e.clientX-this.dragWallStartPointer.x)/s,n=(e.clientY-this.dragWallStartPointer.y)/s;if(this.project.grid.snapToGrid){const l=this.project.grid.size||.5;r=Math.round(r/l)*l,n=Math.round(n/l)*l}const o=this.project.walls.map(l=>l.id===this.draggingWallId?{...l,start:{x:b.roundMeters(this.dragWallInitialStart.x+r),y:b.roundMeters(this.dragWallInitialStart.y+n)},end:{x:b.roundMeters(this.dragWallInitialEnd.x+r),y:b.roundMeters(this.dragWallInitialEnd.y+n)}}:l);this.project={...this.project,walls:o},this.requestUpdate()}return}if(this.draggingBindingId){if(Math.hypot(e.clientX-this.dragBindingStartPos.x,e.clientY-this.dragBindingStartPos.y)>3){this.dragBindingMoved=!0;const s=this.screenToWorld(e.clientX,e.clientY),r=A.findRoomContainingPoint(s,this.project.rooms),n=this.project.bindings.map(o=>o.id===this.draggingBindingId?{...o,position:{x:b.roundMeters(s.x),y:b.roundMeters(s.y)},roomId:r?.id}:o);this.project={...this.project,bindings:n},this.requestUpdate()}return}if(this.isMarqueeSelecting&&this.marqueeStart){this.marqueeCurrent=this.screenToWorld(e.clientX,e.clientY),this.requestUpdate();return}if(this.isPanning){this.viewport={...this.viewport,x:e.clientX-this.panStart.x,y:e.clientY-this.panStart.y};return}const t=this.screenToWorld(e.clientX,e.clientY);if(this.cursorCoords={x:b.roundMeters(t.x),y:b.roundMeters(t.y)},this.activeTool==="wall"){const i=b.snapPoint(t,this.project.grid,this.project.walls,this.drawingWallStart||void 0);this.previewPoint=i.point,this.snapInfo={snappedTo:i.snappedTo,guideAngle:i.guideAngle,smartGuideX:i.smartGuideX,smartGuideY:i.smartGuideY},this.wallSnap=null}else if(this.activeTool==="door"||this.activeTool==="window"||this.activeTool==="french_window")this.wallSnap=b.snapPointToWall(t,this.project.walls,.8),this.previewPoint=null;else if(this.activeTool==="calibrate"&&this.calibrateStart){const i=this.getBoundingClientRect();this.calibrateCurrent={x:e.clientX-i.left,y:e.clientY-i.top}}else if(this.activeTool==="rescale"){let i=b.snapPoint(t,this.project.grid,this.project.walls,this.rescaleStart||void 0);if(i.snappedTo==="none"&&this.project.walls.length>0){const s=b.snapPointToWall(t,this.project.walls,.6);s&&(i={point:s.projectionPoint,snappedTo:"vertex"})}this.previewPoint=i.point,this.snapInfo={snappedTo:i.snappedTo,guideAngle:i.guideAngle,smartGuideX:i.smartGuideX,smartGuideY:i.smartGuideY},this.wallSnap=null,this.rescaleStart&&(this.rescaleCurrent=i.point)}else this.previewPoint=null,this.wallSnap=null}handlePointerUp(e){if(this.rotatingFurnitureId){const t=this.rotateFurnitureMoved;this.rotatingFurnitureId=null,this.rotateFurnitureMoved=!1;try{e.target.releasePointerCapture?.(e.pointerId)}catch{}if(t){this.dispatchProjectChanged();return}}if(this.draggingFurnitureId){const t=this.dragFurnitureMoved;this.draggingFurnitureId=null,this.dragFurnitureMoved=!1;try{e.target.releasePointerCapture?.(e.pointerId)}catch{}if(t){this.dispatchProjectChanged();return}}if(this.draggingWallId){const t=this.dragWallMoved;this.draggingWallId=null,this.dragWallMoved=!1;try{e.target.releasePointerCapture?.(e.pointerId)}catch{}if(t){this.dispatchProjectChanged();return}}if(this.draggingBindingId){const t=this.dragBindingMoved;this.draggingBindingId=null;const i=this.shadowRoot?.querySelector(".canvas-container");try{i?.releasePointerCapture?.(e.pointerId)}catch{}try{e.target?.releasePointerCapture?.(e.pointerId)}catch{}if(t){setTimeout(()=>{this.dragBindingMoved=!1},150),this.dispatchProjectChanged();return}else this.dragBindingMoved=!1}if(this.isOrbiting){this.isOrbiting=!1,e.target.releasePointerCapture?.(e.pointerId);return}if(this.isMarqueeSelecting&&this.marqueeStart&&this.marqueeCurrent){const t=Math.min(this.marqueeStart.x,this.marqueeCurrent.x),i=Math.max(this.marqueeStart.x,this.marqueeCurrent.x),s=Math.min(this.marqueeStart.y,this.marqueeCurrent.y),r=Math.max(this.marqueeStart.y,this.marqueeCurrent.y);if(i-t>.05||r-s>.05){const n=this.project.walls.filter(a=>{const u=(a.start.x+a.end.x)/2,c=(a.start.y+a.end.y)/2;return u>=t&&u<=i&&c>=s&&c<=r}).map(a=>a.id),o=this.project.openings.filter(a=>{const u=this.project.walls.find(w=>w.id===a.wallId);if(!u)return!1;const c=u.end.x-u.start.x,h=u.end.y-u.start.y,y=Math.sqrt(c*c+h*h);if(y===0)return!1;const m=u.start.x+a.offset/y*c,g=u.start.y+a.offset/y*h;return m>=t&&m<=i&&g>=s&&g<=r}).map(a=>a.id),l=this.project.rooms.filter(a=>{if(!a.polygon||a.polygon.length<3)return!1;const u=A.calculateCentroid(a.polygon);return u.x>=t&&u.x<=i&&u.y>=s&&u.y<=r}).map(a=>a.id),d=this.project.bindings.filter(a=>a.position.x>=t&&a.position.x<=i&&a.position.y>=s&&a.position.y<=r).map(a=>a.id),p=(this.project.furniture||[]).filter(a=>a.position.x>=t&&a.position.x<=i&&a.position.y>=s&&a.position.y<=r).map(a=>a.id);this.selectedElements={wallIds:Array.from(new Set([...this.selectedElements.wallIds,...n])),openingIds:Array.from(new Set([...this.selectedElements.openingIds,...o])),roomIds:Array.from(new Set([...this.selectedElements.roomIds,...l])),bindingIds:Array.from(new Set([...this.selectedElements.bindingIds,...d])),furnitureIds:Array.from(new Set([...this.selectedElements.furnitureIds||[],...p]))},this.dispatchSelectionChanged()}this.isMarqueeSelecting=!1,this.marqueeStart=null,this.marqueeCurrent=null,e.target.releasePointerCapture?.(e.pointerId);return}this.isPanning&&(this.isPanning=!1,e.target.releasePointerCapture?.(e.pointerId))}handleDragOver(e){e.preventDefault(),e.dataTransfer&&(e.dataTransfer.dropEffect="copy")}handleDrop(e){if(e.preventDefault(),e.dataTransfer?.files&&e.dataTransfer.files.length>0){const i=e.dataTransfer.files[0];if(i.type.startsWith("image/")||i.name.toLowerCase().endsWith(".svg")){const s=new FileReader;s.onload=r=>{const n=r.target?.result;this.dispatchEvent(new CustomEvent("background-image-loaded",{detail:{dataUrl:n},bubbles:!0,composed:!0}))},s.readAsDataURL(i);return}}const t=e.dataTransfer?.getData("application/json");if(t)try{const i=JSON.parse(t);if(i.kind==="furniture"){const a=It(i.furnitureType);if(a){const u=this.screenToWorld(e.clientX,e.clientY),c=A.findRoomContainingPoint(u,this.project.rooms),h={id:`furn_${Date.now()}_${Math.random().toString(36).substr(2,4)}`,type:a.type,name:a.name,category:a.category,position:{x:b.roundMeters(u.x),y:b.roundMeters(u.y)},width:a.width,length:a.length,rotation:0,color:a.defaultColor,icon:a.icon,roomId:c?.id};this.project={...this.project,furniture:[...this.project.furniture||[],h]},this.selectedElements={wallIds:[],openingIds:[],roomIds:[],bindingIds:[],furnitureIds:[h.id]},this.dispatchSelectionChanged(),this.dispatchProjectChanged();return}}const{entityId:s,domain:r,name:n,icon:o}=i,l=this.screenToWorld(e.clientX,e.clientY),d=A.findRoomContainingPoint(l,this.project.rooms),p={id:`bind_${Date.now()}_${Math.random().toString(36).substr(2,4)}`,entityId:s,position:{x:b.roundMeters(l.x),y:b.roundMeters(l.y)},roomId:d?.id,icon:o,customName:n,tapAction:"toggle"};this.project={...this.project,bindings:[...this.project.bindings,p]},this.dispatchProjectChanged()}catch(i){console.error("Erreur lors de la liaison entité/meuble:",i)}}dispatchSelectionChanged(){this.dispatchEvent(new CustomEvent("selection-changed",{detail:{selectedElements:this.selectedElements},bubbles:!0,composed:!0})),this.requestUpdate()}handleWallPointerDown(e,t){if(this.isDashboardMode||t.button!==0||this.activeTool!=="select")return;t.stopPropagation(),this.draggingWallId=e.id,this.dragWallMoved=!1,this.dragWallStartPointer={x:t.clientX,y:t.clientY},this.dragWallInitialStart={...e.start},this.dragWallInitialEnd={...e.end};const i=t.shiftKey||t.ctrlKey||t.metaKey,s=this.selectedElements.wallIds.includes(e.id);if(i){const r=s?this.selectedElements.wallIds.filter(n=>n!==e.id):[...this.selectedElements.wallIds,e.id];this.selectedElements={...this.selectedElements,wallIds:r}}else s||(this.selectedElements={wallIds:[e.id],openingIds:[],roomIds:[],bindingIds:[],furnitureIds:[]});this.dispatchSelectionChanged(),t.currentTarget?.setPointerCapture?.(t.pointerId)}handleWallClick(e,t){if(this.activeTool!=="select"||this.dragWallMoved)return;e.stopPropagation();const i=e.shiftKey||e.ctrlKey||e.metaKey,s=this.selectedElements.wallIds.includes(t.id);if(i){const r=s?this.selectedElements.wallIds.filter(n=>n!==t.id):[...this.selectedElements.wallIds,t.id];this.selectedElements={...this.selectedElements,wallIds:r}}else this.selectedElements={wallIds:[t.id],openingIds:[],roomIds:[],bindingIds:[],furnitureIds:[]};this.dispatchSelectionChanged()}handleOpeningClick(e,t){if(this.activeTool!=="select")return;e.stopPropagation();const i=e.shiftKey||e.ctrlKey||e.metaKey,s=this.selectedElements.openingIds.includes(t.id);if(i){const r=s?this.selectedElements.openingIds.filter(n=>n!==t.id):[...this.selectedElements.openingIds,t.id];this.selectedElements={...this.selectedElements,openingIds:r}}else this.selectedElements={wallIds:[],openingIds:[t.id],roomIds:[],bindingIds:[],furnitureIds:[]};this.dispatchSelectionChanged()}handleFurnitureRotatePointerDown(e,t){if(this.isDashboardMode||t.button!==0)return;t.stopPropagation(),this.rotatingFurnitureId=e.id,this.rotateFurnitureMoved=!1;const i=this.worldToScreen(e.position);this.rotateFurnitureStartAngle=Math.atan2(t.clientY-i.y,t.clientX-i.x)*(180/Math.PI),this.rotateFurnitureInitialAngle=e.rotation||0,this.selectedElements.furnitureIds?.includes(e.id)||(this.selectedElements={wallIds:[],openingIds:[],roomIds:[],bindingIds:[],furnitureIds:[e.id]},this.dispatchSelectionChanged());try{t.currentTarget?.setPointerCapture?.(t.pointerId)}catch{}}handleFurniturePointerDown(e,t){if(this.isDashboardMode||t.button!==0||this.activeTool!=="select")return;t.stopPropagation(),this.draggingFurnitureId=e.id,this.dragFurnitureMoved=!1,this.dragFurnitureStartPos={x:t.clientX,y:t.clientY},this.dragFurnitureItemStartPos={...e.position};const i=t.shiftKey||t.ctrlKey||t.metaKey,s=this.selectedElements.furnitureIds?.includes(e.id)||!1;if(i){const r=s?(this.selectedElements.furnitureIds||[]).filter(n=>n!==e.id):[...this.selectedElements.furnitureIds||[],e.id];this.selectedElements={...this.selectedElements,furnitureIds:r}}else s||(this.selectedElements={wallIds:[],openingIds:[],roomIds:[],bindingIds:[],furnitureIds:[e.id]});this.dispatchSelectionChanged(),t.currentTarget?.setPointerCapture?.(t.pointerId)}handleFurnitureClick(e,t){if(this.activeTool!=="select"||this.dragFurnitureMoved)return;e.stopPropagation();const i=e.shiftKey||e.ctrlKey||e.metaKey,s=this.selectedElements.furnitureIds?.includes(t.id)||!1;if(i){const r=s?(this.selectedElements.furnitureIds||[]).filter(n=>n!==t.id):[...this.selectedElements.furnitureIds||[],t.id];this.selectedElements={...this.selectedElements,furnitureIds:r}}else this.selectedElements={wallIds:[],openingIds:[],roomIds:[],bindingIds:[],furnitureIds:[t.id]};this.dispatchSelectionChanged()}renderMarqueeBox(){if(!this.isMarqueeSelecting||!this.marqueeStart||!this.marqueeCurrent)return null;const e=this.worldToScreen(this.marqueeStart),t=this.worldToScreen(this.marqueeCurrent),i=Math.min(e.x,t.x),s=Math.min(e.y,t.y),r=Math.abs(e.x-t.x),n=Math.abs(e.y-t.y);return f`
      <rect 
        class="marquee-selection-box"
        x="${i}" 
        y="${s}" 
        width="${r}" 
        height="${n}" 
      />
    `}handleEntityPointerDown(e,t){if(this.isDashboardMode||t.button!==0)return;t.stopPropagation(),this.draggingBindingId=e.id,this.dragBindingMoved=!1,this.dragBindingStartPos={x:t.clientX,y:t.clientY};const i=t,s=i.shiftKey||i.ctrlKey||i.metaKey,r=this.selectedElements.bindingIds.includes(e.id);if(s){const o=r?this.selectedElements.bindingIds.filter(l=>l!==e.id):[...this.selectedElements.bindingIds,e.id];this.selectedElements={...this.selectedElements,bindingIds:o}}else this.selectedElements={wallIds:[],openingIds:[],roomIds:[],bindingIds:[e.id],furnitureIds:[]};this.dispatchSelectionChanged();const n=this.shadowRoot?.querySelector(".canvas-container");try{n?.setPointerCapture?.(t.pointerId)}catch{}}executeEntityTapAction(e){const t=(e.entityId||"").split(".")[0],i=["light","switch","input_boolean","fan"],s=["lock","alarm_control_panel","camera","climate","media_player","sensor","binary_sensor","device_tracker"];if(e.tapAction==="more-info"||s.includes(t)){this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:e.entityId},bubbles:!0,composed:!0}));return}this.hass&&this.hass.callService&&(i.includes(t)?this.hass.callService(t,"toggle",{entity_id:e.entityId}).catch(()=>{this.hass.callService("homeassistant","toggle",{entity_id:e.entityId})}):t==="cover"?this.hass.callService("cover","toggle",{entity_id:e.entityId}).catch(()=>{this.hass.callService("homeassistant","toggle",{entity_id:e.entityId})}):t==="scene"?this.hass.callService("scene","turn_on",{entity_id:e.entityId}):t==="script"?this.hass.callService("script","turn_on",{entity_id:e.entityId}):t==="button"||t==="input_button"?this.hass.callService("button","press",{entity_id:e.entityId}):this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:e.entityId},bubbles:!0,composed:!0})))}handleEntityClick(e,t){if(t.stopPropagation(),!this.dragBindingMoved){if(this.isDashboardMode){this.executeEntityTapAction(e);return}if(this.activeTool==="select"){const i=t,s=i.shiftKey||i.ctrlKey||i.metaKey,r=this.selectedElements.bindingIds.includes(e.id);if(s){const n=r?this.selectedElements.bindingIds.filter(o=>o!==e.id):[...this.selectedElements.bindingIds,e.id];this.selectedElements={...this.selectedElements,bindingIds:n}}else this.selectedElements={wallIds:[],openingIds:[],roomIds:[],bindingIds:[e.id]};this.dispatchSelectionChanged();return}this.executeEntityTapAction(e)}}handleEntityDblClick(e,t){t.stopPropagation(),this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:e.entityId},bubbles:!0,composed:!0}))}rotateSelectedFurniture(){if(!this.selectedElements.furnitureIds||this.selectedElements.furnitureIds.length===0)return;const e=this.selectedElements.furnitureIds,t=(this.project.furniture||[]).map(i=>e.includes(i.id)?{...i,rotation:((i.rotation||0)+90)%360}:i);this.project={...this.project,furniture:t},this.dispatchProjectChanged(),this.requestUpdate()}handleKeyDown(e){e.key==="Escape"?(this.drawingWallStart=null,this.previewPoint=null,this.calibrateStart=null,this.calibrateCurrent=null,this.rescaleStart=null,this.rescaleCurrent=null,this.wallSnap=null,this.selectedElements={wallIds:[],openingIds:[],roomIds:[],bindingIds:[],furnitureIds:[]},this.dispatchSelectionChanged(),this.requestUpdate()):e.key===" "||e.key==="Spacebar"?this.wallSnap&&(e.preventDefault(),this.openingFlipSide=!this.openingFlipSide,this.requestUpdate()):e.key.toLowerCase()==="f"?this.wallSnap&&(this.openingFlipDirection=!this.openingFlipDirection,this.requestUpdate()):e.key.toLowerCase()==="r"&&this.selectedElements.furnitureIds&&this.selectedElements.furnitureIds.length>0&&(e.preventDefault(),this.rotateSelectedFurniture())}connectedCallback(){super.connectedCallback(),this._boundKeyDown=this.handleKeyDown.bind(this),window.addEventListener("keydown",this._boundKeyDown),typeof ResizeObserver<"u"&&(this._canvasResizeObserver=new ResizeObserver(()=>{this.requestUpdate()}),this._canvasResizeObserver.observe(this))}disconnectedCallback(){super.disconnectedCallback(),this._boundKeyDown&&window.removeEventListener("keydown",this._boundKeyDown),this._canvasResizeObserver&&(this._canvasResizeObserver.disconnect(),this._canvasResizeObserver=null)}firstUpdated(){setTimeout(()=>{this.project&&(this.project.walls?.length>0||this.project.rooms?.length>0)&&this.fitToScreen()},150)}updated(e){if(super.updated(e),e.has("project")){const t=e.get("project");t&&this.project&&t.id!==this.project.id&&setTimeout(()=>this.fitToScreen(),80)}}dispatchProjectChanged(){this.dispatchEvent(new CustomEvent("project-changed",{detail:{project:this.project},bubbles:!0,composed:!0}))}computeWallPolygon(e,t,i){const s=t.x-e.x,r=t.y-e.y,n=Math.sqrt(s*s+r*r);if(n===0)return[e,e,t,t];const o=i/2,l=-r/n*o,d=s/n*o;return[{x:e.x+l,y:e.y+d},{x:t.x+l,y:t.y+d},{x:t.x-l,y:t.y-d},{x:e.x-l,y:e.y-d}]}renderBackgroundLayer(){const e=this.project.background;if(!e||!e.imageUrl||!e.visible)return null;const t=this.worldToScreen(e.offset||{x:0,y:0}),i=e.scale||1;return f`
      <g 
        class="background-image-layer" 
        transform="translate(${t.x}, ${t.y}) scale(${this.viewport.zoom*i})"
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
    `}pointToSegmentDistance(e,t,i){const s=i.x-t.x,r=i.y-t.y,n=s*s+r*r;if(n===0)return b.distance(e,t);let o=((e.x-t.x)*s+(e.y-t.y)*r)/n;o=Math.max(0,Math.min(1,o));const l={x:t.x+o*s,y:t.y+o*r};return b.distance(e,l)}getWallHeight(e){const t=this.project.defaultCeilingHeight||2.5,i={x:(e.start.x+e.end.x)/2,y:(e.start.y+e.end.y)/2},s=(this.project.rooms||[]).filter(r=>{if(!r.polygon||r.polygon.length<3)return!1;if(A.isPointInPolygon(i,r.polygon))return!0;for(let n=0;n<r.polygon.length;n++){const o=r.polygon[n],l=r.polygon[(n+1)%r.polygon.length];if(this.pointToSegmentDistance(i,o,l)<=e.thickness/2+.35)return!0}return!1});if(s.length>0){const r=s.map(n=>n.height||t);return Math.max(...r,e.height||0)}return e.height||t}handleRoomClick(e,t){if(!(this.drawingWallStart||this.calibrateStart||this.rescaleStart)){if(e.stopPropagation(),this.activeTool==="select"){const i=e.shiftKey||e.ctrlKey||e.metaKey,s=this.selectedElements.roomIds.includes(t.id);if(i){const r=s?this.selectedElements.roomIds.filter(n=>n!==t.id):[...this.selectedElements.roomIds,t.id];this.selectedElements={...this.selectedElements,roomIds:r}}else this.selectedElements={wallIds:[],openingIds:[],roomIds:[t.id],bindingIds:[]};this.dispatchSelectionChanged();return}this.dispatchEvent(new CustomEvent("room-selected",{detail:{room:t},bubbles:!0,composed:!0}))}}handleRoomDblClick(e,t){e.stopPropagation(),this.dispatchEvent(new CustomEvent("room-selected",{detail:{room:t},bubbles:!0,composed:!0}))}renderRooms(){return this.project.rooms.map(e=>{if(!e.polygon||e.polygon.length<3)return null;const t=e.polygon.map(h=>this.worldToScreen(h)),i=t.map(h=>`${h.x},${h.y}`).join(" "),s=this.project.bindings.filter(h=>h.roomId===e.id&&h.entityId.startsWith("light.")).map(h=>this.hass?.states?.[h.entityId]).filter(h=>h&&h.state==="on"),r=s.length>0;let n=null;if(r){const h=s[0],y=h.attributes?.rgb_color||[255,240,180],g=.12+(h.attributes?.brightness!==void 0?h.attributes.brightness:255)/255*.22;n=`rgba(${y[0]}, ${y[1]}, ${y[2]}, ${g.toFixed(2)})`}let o=null;const l=this.project.bindings.find(h=>h.roomId===e.id&&(h.entityId.startsWith("climate.")||h.entityId.startsWith("sensor.")&&(h.entityId.toLowerCase().includes("temp")||h.customName?.toLowerCase().includes("temp"))));if(l){const h=this.hass?.states?.[l.entityId];if(h)if(l.entityId.startsWith("climate.")){const y=h.attributes?.current_temperature??h.state;isNaN(parseFloat(y))||(o=parseFloat(y))}else isNaN(parseFloat(h.state))||(o=parseFloat(h.state))}let d=e.color||"rgba(56, 189, 248, 0.12)";this.showThermalHeatmap&&o!==null?o<18?d="rgba(59, 130, 246, 0.38)":o<20?d="rgba(14, 165, 233, 0.32)":o<22?d="rgba(16, 185, 129, 0.30)":o<24?d="rgba(245, 158, 11, 0.34)":d="rgba(239, 68, 68, 0.40)":n&&(d=n);const p=A.calculateCentroid(t),a=e.height||this.project.defaultCeilingHeight||2.5,u=(e.areaM2*a).toFixed(1),c=this.selectedElements?.roomIds?.includes(e.id);return f`
        <g 
          class="room-group ${c?"selected":""}" 
          data-room-id="${e.id}" 
          @click=${h=>this.handleRoomClick(h,e)}
          @dblclick=${h=>this.handleRoomDblClick(h,e)}
        >
          <polygon 
            points="${i}" 
            class="room-polygon ${r?"illuminated":""}"
            style="fill: ${d}; cursor: pointer; transition: fill 0.3s ease;"
          />
          ${this.is3DMode?f`
            <g class="room-3d-badge-group" transform="translate(${p.x}, ${p.y})">
              <rect 
                x="-62" 
                y="-30" 
                width="124" 
                height="60" 
                rx="10" 
                ry="10" 
                fill="rgba(15, 23, 42, 0.84)" 
                stroke="${c?"#38bdf8":"rgba(56, 189, 248, 0.4)"}" 
                stroke-width="${c?2:1}"
                filter="drop-shadow(0 6px 14px rgba(0, 0, 0, 0.6))"
              />
              <text class="room-label-name" y="-12" style="font-size: 12px; font-weight: 700; fill: #f8fafc; text-anchor: middle;">
                ${e.name}
              </text>
              <text class="room-label-area" y="6" style="font-size: 11px; font-weight: 700; fill: #38bdf8; text-anchor: middle; font-family: ui-monospace, SFMono-Regular, monospace;">
                ${e.areaM2.toFixed(1)} m²
              </text>
              <text class="room-label-height" y="21" style="font-size: 9.5px; font-weight: 600; fill: #a5f3fc; text-anchor: middle; font-family: ui-monospace, SFMono-Regular, monospace;">
                H: ${a.toFixed(2)}m · ${u} m³
              </text>
            </g>
          `:f`
            <g class="room-label-group" transform="translate(${p.x}, ${p.y})">
              <text class="room-label-name" y="${o!==null?-10:-6}">${e.name}</text>
              <text class="room-label-area" y="${o!==null?6:12}">${e.areaM2.toFixed(1)} m²</text>
              ${o!==null?f`
                <text class="room-label-temp" y="21" style="font-size: 9.5px; font-weight: 700; fill: #facc15; text-anchor: middle; font-family: ui-monospace, SFMono-Regular, monospace;">
                  🌡️ ${o.toFixed(1)}°C
                </text>
              `:null}
            </g>
          `}
        </g>
      `})}renderGrid(){if(this.is3DMode)return f`
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
      `;const e=this.project.pixelsPerMeter*this.viewport.zoom,i=(this.project.grid.size||.5)*e;if(i<12)return null;const s=i*2;return f`
      <defs>
        <pattern id="grid-sub" width="${i}" height="${i}" patternUnits="userSpaceOnUse"
          patternTransform="translate(${this.viewport.x%i}, ${this.viewport.y%i})">
          <line x1="0" y1="0" x2="${i}" y2="0" stroke="rgba(255,255,255,0.06)" stroke-width="0.5" />
          <line x1="0" y1="0" x2="0" y2="${i}" stroke="rgba(255,255,255,0.06)" stroke-width="0.5" />
        </pattern>
        <pattern id="grid-major" width="${s}" height="${s}" patternUnits="userSpaceOnUse"
          patternTransform="translate(${this.viewport.x%s}, ${this.viewport.y%s})">
          <line x1="0" y1="0" x2="${s}" y2="0" stroke="rgba(255,255,255,0.14)" stroke-width="1" />
          <line x1="0" y1="0" x2="0" y2="${s}" stroke="rgba(255,255,255,0.14)" stroke-width="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid-sub)" />
      <rect width="100%" height="100%" fill="url(#grid-major)" />
    `}renderWalls(){const e=this.project.pixelsPerMeter*this.viewport.zoom;return this.project.walls.map(t=>{const i=this.selectedElements?.wallIds?.includes(t.id),s=this.getWallHeight(t),r=this.is3DMode?s*e*.55:0,o=this.computeWallPolygon(t.start,t.end,t.thickness).map(w=>this.worldToScreen(w)),l=this.worldToScreen(t.start),d=this.worldToScreen(t.end),p=o.map(w=>`${w.x},${w.y}`).join(" "),a=b.distance(t.start,t.end),u={x:(l.x+d.x)/2,y:(l.y+d.y)/2};if(this.is3DMode){const w=o.map(v=>({x:v.x,y:v.y-r})),_=w.map(v=>`${v.x},${v.y}`).join(" "),P=[0,1,2,3].map(v=>{const k=(v+1)%4,E=o[v],T=o[k],G=w[k],ut=w[v],it=T.x-E.x,st=T.y-E.y,pt=Math.sqrt(it*it+st*st)||1,Ft=-st/pt,Wt=it/pt,gt=Math.max(-1,Math.min(1,Ft*-.7+Wt*-.7)),rt=Math.round(i?42+gt*14:34+gt*16),Dt=i?`hsl(192, 85%, ${rt}%)`:`hsl(215, 22%, ${rt}%)`,jt=i?"#38bdf8":`hsl(215, 22%, ${rt+6}%)`;return{pts:`${E.x},${E.y} ${T.x},${T.y} ${G.x},${G.y} ${ut.x},${ut.y}`,fill:Dt,stroke:jt}}),W=i?"#06b6d4":"#f1f5f9",C=i?"#22d3ee":"#94a3b8";return f`
          <g 
            class="wall-element-3d ${i?"selected":""}" 
            data-wall-id="${t.id}"
            @click=${v=>this.handleWallClick(v,t)}
            style="cursor: pointer;"
          >
            <!-- 4 parois verticales solides -->
            ${P.map(v=>f`
              <polygon points="${v.pts}" style="fill: ${v.fill}; stroke: ${v.stroke}; stroke-width: 0.8; stroke-linejoin: round;" />
            `)}
            <!-- Chapeau supérieur du mur -->
            <polygon points="${_}" style="fill: ${W}; stroke: ${C}; stroke-width: 1.2; stroke-linejoin: round;" />
          </g>
        `}const c=d.x-l.x,h=d.y-l.y,y=Math.hypot(c,h)||1,m=-h/y,g=c/y;return f`
        <g 
          class="wall-element ${i?"selected":""}" 
          data-wall-id="${t.id}"
          @pointerdown=${w=>this.handleWallPointerDown(t,w)}
          @click=${w=>this.handleWallClick(w,t)}
        >
          <polygon points="${p}" class="wall-rect" />
          <line x1="${l.x}" y1="${l.y}" x2="${d.x}" y2="${d.y}" class="wall-centerline" />
          
          ${this.showDimensions&&a>=.4?f`
            <g class="wall-dim-badge" transform="translate(${u.x+m*14}, ${u.y+g*14})">
              <rect x="-24" y="-9" width="48" height="18" />
              <text>${b.roundMeters(a).toFixed(2)} m</text>
            </g>
          `:null}
        </g>
      `})}renderOpenings(){return this.project.openings.map(e=>{const t=this.selectedElements?.openingIds?.includes(e.id),i=this.project.walls.find(y=>y.id===e.wallId);if(!i)return null;const s=i.end.x-i.start.x,r=i.end.y-i.start.y,n=Math.sqrt(s*s+r*r);if(n===0)return null;const l=Math.atan2(r,s)*180/Math.PI,d=i.start.x+e.offset/n*s,p=i.start.y+e.offset/n*r,a=this.worldToScreen({x:d,y:p}),u=this.project.pixelsPerMeter*this.viewport.zoom,c=e.width*u,h=i.thickness*u;return f`
        <g 
          class="opening-element ${t?"selected":""}" 
          transform="translate(${a.x}, ${a.y}) rotate(${l})"
          style="cursor: pointer;"
          @click=${y=>this.handleOpeningClick(y,e)}
        >
          <rect 
            x="${-c/2}" 
            y="${-h/2-1}" 
            width="${c}" 
            height="${h+2}" 
            class="wall-cutout"
          />

          ${e.type==="door"?this.renderDoorSymbol(c,h,e.flipSide,e.flipDirection):null}
          ${e.type==="window"?this.renderWindowSymbol(c,h,e.sashCount||(e.width>=1.25?2:1)):null}
          ${e.type==="french_window"?this.renderFrenchWindowSymbol(c,h):null}
        </g>
      `})}renderDoorSymbol(e,t,i,s){const r=e/2,n=i?-1:1,o=s?r:-r,l=s?-1:1;return f`
      <g>
        <rect x="${-r}" y="${-t/2}" width="4" height="${t}" fill="#94a3b8" />
        <rect x="${r-4}" y="${-t/2}" width="4" height="${t}" fill="#94a3b8" />
        <line 
          x1="${o}" 
          y1="0" 
          x2="${o}" 
          y2="${n*e}" 
          class="opening-door-leaf" 
        />
        <path 
          d="M ${o+l*e} 0 A ${e} ${e} 0 0 ${n>0?s?0:1:s?1:0} ${o} ${n*e}" 
          class="opening-door-arc" 
        />
      </g>
    `}renderWindowSymbol(e,t,i=1){const s=e/2;return i===2?f`
        <g>
          <rect x="${-s}" y="${-t/2}" width="${e}" height="${t}" fill="none" class="opening-window-frame" />
          <line x1="${-s}" y1="0" x2="${s}" y2="0" class="opening-window-glass" />
          <line x1="0" y1="${-t/2}" x2="0" y2="${t/2}" stroke="#38bdf8" stroke-width="2.5" />
          <line x1="${-s+4}" y1="${-t/4}" x2="-3" y2="${-t/4}" stroke="rgba(56, 189, 248, 0.45)" stroke-width="1.2" />
          <line x1="3" y1="${t/4}" x2="${s-4}" y2="${t/4}" stroke="rgba(56, 189, 248, 0.45)" stroke-width="1.2" />
        </g>
      `:f`
      <g>
        <rect x="${-s}" y="${-t/2}" width="${e}" height="${t}" fill="none" class="opening-window-frame" />
        <line x1="${-s}" y1="0" x2="${s}" y2="0" class="opening-window-glass" />
        <line x1="${-s+4}" y1="${-t/4}" x2="${s-4}" y2="${-t/4}" stroke="rgba(56, 189, 248, 0.4)" stroke-width="1" />
        <line x1="${-s+4}" y1="${t/4}" x2="${s-4}" y2="${t/4}" stroke="rgba(56, 189, 248, 0.4)" stroke-width="1" />
      </g>
    `}renderFrenchWindowSymbol(e,t){const i=e/2;return f`
      <g>
        <rect x="${-i}" y="${-t/2}" width="${e}" height="${t}" fill="none" class="opening-window-frame" />
        <rect x="${-i}" y="${-t/4}" width="${i}" height="3" fill="#38bdf8" />
        <rect x="0" y="${t/4}" width="${i}" height="3" fill="#38bdf8" />
      </g>
    `}getEntityDisplayState(e){const t=this.hass?.states?.[e.entityId];if(!t)return{text:"Inactif",statusClass:"off"};const i=t.state;if(i==="unavailable")return{text:"Indisponible",statusClass:"off"};if(i==="unknown")return{text:"Inconnu",statusClass:"off"};const s=e.entityId.split(".")[0],r=t.attributes||{},n=r.device_class||"";if(s==="light"){if(i==="on"){const o=r.brightness?Math.round(r.brightness/255*100):null;return{text:o!==null?`Allumé (${o}%)`:"Allumé",statusClass:"on"}}return{text:"Éteint",statusClass:"off"}}if(s==="switch")return i==="on"?{text:"Actif",statusClass:"on"}:{text:"Éteint",statusClass:"off"};if(s==="binary_sensor"){const o=n==="motion"||n==="occupancy"||n==="presence"||e.entityId.includes("presence")||e.entityId.includes("occupancy")||e.entityId.includes("radar")||e.entityId.includes("motion"),l=n==="door"||n==="window"||n==="garage_door"||n==="opening",d=n==="moisture",p=n==="smoke";return i==="on"||i==="detected"?o?{text:"Mouvement",statusClass:"alert"}:l?{text:"Ouvert",statusClass:"alert"}:d?{text:"Fuite !",statusClass:"alert"}:p?{text:"Fumée !",statusClass:"alert"}:{text:"Détecté",statusClass:"alert"}:o?{text:"Au repos",statusClass:"info"}:l?{text:"Fermé",statusClass:"info"}:d?{text:"Sec",statusClass:"info"}:p?{text:"Normal",statusClass:"info"}:{text:"Inactif",statusClass:"off"}}if(s==="climate"){const o=r.current_temperature,l=r.temperature;return o!==void 0&&l!==void 0?{text:`${o}°C (${l}°)`,statusClass:"info"}:o!==void 0?{text:`${o}°C`,statusClass:"info"}:{text:i,statusClass:"info"}}if(s==="sensor"){const o=r.unit_of_measurement||"";return{text:`${i}${o?" "+o:""}`,statusClass:"info"}}if(s==="cover"){const o=r.current_position;return o!==void 0?{text:`${o}%`,statusClass:o>0?"on":"off"}:i==="open"?{text:"Ouvert",statusClass:"on"}:{text:"Fermé",statusClass:"off"}}return s==="media_player"?i==="playing"?{text:"Lecture",statusClass:"on"}:i==="paused"?{text:"Pause",statusClass:"info"}:{text:"Arrêt",statusClass:"off"}:s==="fan"?i==="on"?{text:"En marche",statusClass:"on"}:{text:"Arrêté",statusClass:"off"}:s==="lock"?i==="locked"?{text:"Verrouillé",statusClass:"info"}:{text:"Déverrouillé",statusClass:"alert"}:{text:i==="on"?"Actif":i==="off"?"Inactif":i,statusClass:i==="on"?"on":"off"}}renderEntityBindings(){return this.project.bindings.map(e=>{const t=this.worldToScreen(e.position),i=this.hass?.states?.[e.entityId],s=i?.state||"off",r=e.entityId.startsWith("light.")&&s==="on",n=e.entityId.startsWith("binary_sensor.")&&(s==="on"||s==="detected"),o=e.entityId.startsWith("sensor.")||e.entityId.startsWith("climate."),l=e.entityId.startsWith("fan."),d=l&&s==="on",p=e.entityId.startsWith("media_player."),a=p&&s==="playing",u=e.entityId.startsWith("cover."),c=i?.attributes?.current_position,h=i?.attributes?.unit_of_measurement||(o?"°":""),y=this.selectedElements?.bindingIds?.includes(e.id),m=this.getEntityDisplayState(e);return f`
        <g 
          class="entity-pin ${y?"selected":""} ${r?"active-light":""} ${n?"active-radar":""}"
          transform="translate(${t.x}, ${t.y})"
          @pointerdown=${g=>this.handleEntityPointerDown(e,g)}
          @click=${g=>this.handleEntityClick(e,g)}
          @dblclick=${g=>this.handleEntityDblClick(e,g)}
          title="${e.customName||e.entityId} : ${m.text} (Clic pour basculer)"
        >
          <!-- Onde radar animée si mouvement détecté -->
          ${n?f`<circle cx="0" cy="0" r="16" class="radar-pulse-ring" />`:null}

          <!-- Ondes sonores pour lecteur multimédia actif -->
          ${a?f`<circle cx="0" cy="0" r="16" class="soundwave-pulse" />`:null}

          <!-- Pastille de fond -->
          <circle cx="0" cy="0" r="16" class="entity-pin-bg" />

          <!-- Pictogramme avec micro-animation (rotation ventilateur) -->
          <text x="0" y="0" class="entity-pin-icon ${d?"fan-spin":""}">
            ${e.icon||(l?"💨":u?"🪟":p?"📺":"⚡")}
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
          ${o&&s!=="unknown"?f`
            <g class="entity-pin-value-badge" transform="translate(14, -14)">
              <rect x="-14" y="-8" width="28" height="16" />
              <text>${s}${h}</text>
            </g>
          `:null}

          <!-- Badge Position Volet roulant -->
          ${u&&c!==void 0?f`
            <g class="entity-pin-value-badge" transform="translate(14, -14)">
              <rect x="-14" y="-8" width="28" height="16" />
              <text>${c}%</text>
            </g>
          `:null}
        </g>
      `})}renderOpeningPreview(){if(!this.wallSnap)return null;const e=this.project.pixelsPerMeter*this.viewport.zoom,t=(this.currentOpeningWidth||.9)*e,i=this.wallSnap.wall.thickness*e,s=this.worldToScreen(this.wallSnap.projectionPoint),r=this.wallSnap.angleRad*180/Math.PI;return f`
      <g 
        class="opening-preview" 
        transform="translate(${s.x}, ${s.y}) rotate(${r})"
      >
        <rect x="${-t/2}" y="${-i/2}" width="${t}" height="${i}" fill="rgba(56, 189, 248, 0.3)" stroke="#38bdf8" stroke-dasharray="4, 2" />
        ${this.activeTool==="door"?this.renderDoorSymbol(t,i,this.openingFlipSide,this.openingFlipDirection):null}
        ${this.activeTool==="window"?this.renderWindowSymbol(t,i):null}
        ${this.activeTool==="french_window"?this.renderFrenchWindowSymbol(t,i):null}
      </g>
    `}renderPreviewWall(){if(!this.drawingWallStart||!this.previewPoint)return null;const t=this.computeWallPolygon(this.drawingWallStart,this.previewPoint,this.currentWallThickness).map(l=>this.worldToScreen(l)),i=this.worldToScreen(this.drawingWallStart),s=this.worldToScreen(this.previewPoint),r=t.map(l=>`${l.x},${l.y}`).join(" "),n=b.distance(this.drawingWallStart,this.previewPoint),o={x:(i.x+s.x)/2,y:(i.y+s.y)/2};return f`
      <g class="preview-wall-group">
        <polygon points="${r}" class="preview-wall-rect" />
        <line x1="${i.x}" y1="${i.y}" x2="${s.x}" y2="${s.y}" class="preview-wall-line" />

        ${this.snapInfo.guideAngle!==void 0?f`
          <line x1="${i.x}" y1="${i.y}" x2="${s.x}" y2="${s.y}" class="angle-guide-line" />
        `:null}

        <g class="dimension-badge" transform="translate(${o.x}, ${o.y-16})">
          <rect x="-30" y="-11" width="60" height="22" />
          <text>${b.roundMeters(n).toFixed(2)} m</text>
        </g>
      </g>
    `}renderCalibrationLine(){if(!this.calibrateStart||!this.calibrateCurrent)return null;const e=this.calibrateStart,t=this.calibrateCurrent,i=t.x-e.x,s=t.y-e.y,r=Math.sqrt(i*i+s*s),n={x:(e.x+t.x)/2,y:(e.y+t.y)/2};return f`
      <g class="calibration-preview-group">
        <line x1="${e.x}" y1="${e.y}" x2="${t.x}" y2="${t.y}" class="calibration-line" />
        <circle cx="${e.x}" cy="${e.y}" r="6" class="calibration-endpoint" />
        <circle cx="${t.x}" cy="${t.y}" r="6" class="calibration-endpoint" />

        <g class="dimension-badge" transform="translate(${n.x}, ${n.y-18})">
          <rect x="-35" y="-11" width="70" height="22" style="stroke: #f59e0b;" />
          <text style="fill: #f59e0b;">${Math.round(r)} px</text>
        </g>
      </g>
    `}renderRescaleLine(){if(!this.rescaleStart||!this.rescaleCurrent)return null;const e=this.worldToScreen(this.rescaleStart),t=this.worldToScreen(this.rescaleCurrent),i=b.distance(this.rescaleStart,this.rescaleCurrent),s={x:(e.x+t.x)/2,y:(e.y+t.y)/2};return f`
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

        <g class="dimension-badge" transform="translate(${s.x}, ${s.y-18})">
          <rect x="-48" y="-13" width="96" height="26" rx="6" fill="#0f172a" stroke="#38bdf8" stroke-width="1.8" />
          <text fill="#38bdf8" font-size="12px" font-weight="800" text-anchor="middle" dy="5">
            📐 ${b.roundMeters(i).toFixed(2)} m
          </text>
        </g>
      </g>
    `}renderGhostLayer(){if(!this.ghostProject||!this.ghostProject.walls||this.ghostProject.walls.length===0)return null;const e=this.project.pixelsPerMeter*this.viewport.zoom;return f`
      <g class="ghost-layer" opacity="0.45" pointer-events="none">
        ${this.ghostProject.walls.map(t=>{const i=this.worldToScreen(t.start),s=this.worldToScreen(t.end),r=(t.thickness||.2)*e;return f`
            <line 
              x1="${i.x}" y1="${i.y}" 
              x2="${s.x}" y2="${s.y}" 
              class="ghost-wall" 
              stroke-width="${r}" 
            />
          `})}
      </g>
    `}renderSmartGuides(){return this.snapInfo.smartGuideX===void 0&&this.snapInfo.smartGuideY===void 0?null:f`
      <g class="smart-guides-group" pointer-events="none">
        ${this.snapInfo.smartGuideX!==void 0?f`
          <line 
            x1="${this.worldToScreen({x:this.snapInfo.smartGuideX,y:0}).x}" 
            y1="-2000" 
            x2="${this.worldToScreen({x:this.snapInfo.smartGuideX,y:0}).x}" 
            y2="6000" 
            class="smart-guide-line" 
          />
        `:null}
        ${this.snapInfo.smartGuideY!==void 0?f`
          <line 
            x1="-2000" 
            y1="${this.worldToScreen({x:0,y:this.snapInfo.smartGuideY}).y}" 
            x2="6000" 
            y2="${this.worldToScreen({x:0,y:this.snapInfo.smartGuideY}).y}" 
            class="smart-guide-line" 
          />
        `:null}
      </g>
    `}renderFurniture(){const e=this.project.pixelsPerMeter*this.viewport.zoom;return(this.project.furniture||[]).map(t=>{const i=It(t.type),s=this.selectedElements.furnitureIds?.includes(t.id)||!1,r=this.worldToScreen(t.position),n=t.width||i?.width||1,o=t.length||i?.length||1,l=n*e,d=o*e,p=t.rotation||0;return f`
        <g
          class="furniture-group ${s?"selected":""}"
          data-furniture-id="${t.id}"
          transform="translate(${r.x}, ${r.y}) rotate(${p})"
          @pointerdown=${a=>this.handleFurniturePointerDown(t,a)}
          @click=${a=>this.handleFurnitureClick(a,t)}
          title="${t.name} (${n.toFixed(2)} × ${o.toFixed(2)} m) - Touche R pour pivoter"
        >
          ${i?i.renderSvg(l,d,s):f`
            <rect x="${-l/2}" y="${-d/2}" width="${l}" height="${d}" fill="rgba(30, 41, 59, 0.85)" stroke="${s?"#38bdf8":"#94a3b8"}" stroke-width="1.5" rx="4" />
            <text x="0" y="4" text-anchor="middle" font-size="12" fill="#cbd5e1">${t.icon||"📦"}</text>
          `}
          ${s?f`
            <!-- Ligne de rappel vers la poignée -->
            <line x1="0" y1="${-d/2}" x2="0" y2="${-d/2-18}" stroke="#38bdf8" stroke-width="1.5" stroke-dasharray="3,2" />
            <!-- Poignée interactive de rotation degré par degré -->
            <g
              class="furniture-rotate-handle"
              @pointerdown=${a=>this.handleFurnitureRotatePointerDown(t,a)}
              style="cursor: grab;"
            >
              <!-- Zone cliquable invisible élargie -->
              <circle cx="0" cy="${-d/2-18}" r="12" fill="transparent" />
              <!-- Petit rond bleu clair visible avec contour blanc -->
              <circle cx="0" cy="${-d/2-18}" r="6.5" fill="#38bdf8" stroke="#ffffff" stroke-width="2" />
              <!-- Indicateur d'angle en direct quand le meuble est sélectionné -->
              <text 
                x="0" 
                y="${-d/2-28}" 
                text-anchor="middle" 
                font-size="10" 
                font-weight="700" 
                fill="#38bdf8"
                style="user-select: none; pointer-events: none; text-shadow: 0 1px 4px rgba(0,0,0,0.8);"
              >
                ${Math.round(p)}°
              </text>
            </g>
          `:null}
        </g>
      `})}renderSnapIndicator(){if(!this.previewPoint||this.snapInfo.snappedTo==="none")return null;const e=this.worldToScreen(this.previewPoint),t=this.snapInfo.snappedTo==="vertex";return f`
      <g transform="translate(${e.x}, ${e.y})">
        <circle r="${t?7:5}" class="snap-indicator" />
        ${t?f`<circle r="2" fill="#38bdf8" />`:null}
      </g>
    `}zoomIn(){this.viewport={...this.viewport,zoom:Math.min(this.viewport.zoom*1.25,8)}}zoomOut(){this.viewport={...this.viewport,zoom:Math.max(this.viewport.zoom/1.25,.15)}}rotateQuarterTurn(){this.is3DMode?this.orbitYaw=(this.orbitYaw-90)%360:(this.viewRotation=(this.viewRotation+270)%360,this.fitToScreen()),this.requestUpdate()}fitToScreen(e=60){const t=this.getBoundingClientRect(),i=t.width||this.clientWidth||800,s=t.height||this.clientHeight||600;if(!(this.project.walls&&this.project.walls.length>0||this.project.rooms&&this.project.rooms.length>0||this.project.furniture&&this.project.furniture.length>0||this.project.background?.imageUrl&&this.project.background.visible)){this.viewport={x:i/2,y:s/2,zoom:1},this.requestUpdate();return}const n=ce.calculateBoundingBox(this.project,.6),o=n.ppm,l=!this.is3DMode&&(this.viewRotation===90||this.viewRotation===270),d=n.width*o,p=n.height*o,a=l?p:d,u=l?d:p,c=(n.minX+n.width/2)*o,h=(n.minY+n.height/2)*o,y=Math.max(100,i-e*2),m=Math.max(100,s-e*2);let g=Math.min(y/Math.max(a,100),m/Math.max(u,100));g=Math.min(Math.max(g,.2),2.5),this.viewport={x:i/2-c*g,y:s/2-h*g,zoom:g},this.requestUpdate()}resetView(){this.fitToScreen()}toggle3DMode(){this.is3DMode=!this.is3DMode,this.dispatchEvent(new CustomEvent("toggle-3d",{detail:{is3DMode:this.is3DMode},bubbles:!0,composed:!0}))}getHelpMessage(){return this.isDashboardMode?null:this.is3DMode?"Vue 3D Interactive : Glisser (clic gauche/droit) pour pivoter 360°, Molette pour zoomer, Shift+glisser pour déplacer.":this.activeTool==="select"?"Mode Sélection : Cliquez sur un élément pour le sélectionner (Shift pour multi-sélection, Shift+glisser pour cadre). Suppr pour effacer.":this.activeTool==="wall"?this.drawingWallStart?"Cliquez pour terminer le mur. Échap pour annuler.":"Cliquez pour démarrer un mur.":this.activeTool==="door"?"Survolez un mur. Espace = inverser intérieur/extérieur. F = gauche/droite.":this.activeTool==="window"||this.activeTool==="french_window"?"Survolez un mur pour insérer la fenêtre.":this.activeTool==="calibrate"?this.calibrateStart?"Cliquez sur la 2ème extrémité du mur mesuré.":"Tracez un segment sur un mur pour étalonner l'échelle.":this.activeTool==="rescale"?this.rescaleStart?"Tracez la ligne jusqu'au 2ème point (autre extrémité du mur ou point de référence).":"Mettre à l'échelle : Sélectionnez un mur ou cliquez sur le 1er point de mesure.":null}render(){const e=this.getHelpMessage();return K`
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
          style="${this.is3DMode?`transform: rotateX(${this.orbitPitch}deg) rotateZ(${this.orbitYaw}deg); transition: ${this.isOrbiting?"none":"transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)"};`:this.viewRotation!==0?`transform: rotate(${this.viewRotation}deg); transform-origin: center center; transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);`:""}"
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

        ${!this.isDashboardMode&&e?K`<div class="help-hud">${e}</div>`:null}

        ${this.isDashboardMode?null:K`
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

          ${this.is3DMode?K`
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
    `}};x.styles=le;$([I({type:Object})],x.prototype,"hass",2);$([I({type:Object})],x.prototype,"project",2);$([I({type:String})],x.prototype,"activeTool",2);$([I({type:Number})],x.prototype,"currentWallThickness",2);$([I({type:Number})],x.prototype,"currentOpeningWidth",2);$([I({type:Boolean})],x.prototype,"is3DMode",2);$([I({type:Object})],x.prototype,"selectedElements",2);$([I({type:Boolean})],x.prototype,"isDashboardMode",2);$([I({type:Object})],x.prototype,"ghostProject",2);$([I({type:Boolean})],x.prototype,"showDimensions",2);$([I({type:Boolean})],x.prototype,"showThermalHeatmap",2);$([S()],x.prototype,"isMarqueeSelecting",2);$([S()],x.prototype,"marqueeStart",2);$([S()],x.prototype,"marqueeCurrent",2);$([S()],x.prototype,"viewport",2);$([S()],x.prototype,"isPanning",2);$([S()],x.prototype,"drawingWallStart",2);$([S()],x.prototype,"previewPoint",2);$([S()],x.prototype,"snapInfo",2);$([S()],x.prototype,"cursorCoords",2);$([S()],x.prototype,"draggingFurnitureId",2);$([S()],x.prototype,"rotatingFurnitureId",2);$([S()],x.prototype,"draggingWallId",2);$([S()],x.prototype,"wallSnap",2);$([I({type:Boolean})],x.prototype,"openingFlipSide",2);$([I({type:Boolean})],x.prototype,"openingFlipDirection",2);$([I({type:Number})],x.prototype,"windowSashCount",2);$([S()],x.prototype,"calibrateStart",2);$([S()],x.prototype,"calibrateCurrent",2);$([S()],x.prototype,"rescaleStart",2);$([S()],x.prototype,"rescaleCurrent",2);$([S()],x.prototype,"draggingBindingId",2);$([S()],x.prototype,"viewRotation",2);$([S()],x.prototype,"orbitPitch",2);$([S()],x.prototype,"orbitYaw",2);$([S()],x.prototype,"isOrbiting",2);x=$([ne("home-architect-canvas")],x);const V="1.0.25",pe="legacy";function ge(){return window.__homeArchitectBundles??={}}function me(e){const t=ge();e==="panel"&&!t.card&&customElements.get("home-architect-card")&&(t.card=pe),t[e]=V,console.info(`%c 📐 HOME ARCHITECT %c v${V} · ${e==="card"?"carte":"studio"} `,"background: #0284c7; color: #fff; font-weight: bold; border-radius: 4px 0 0 4px; padding: 2px 6px;","background: #1e293b; color: #38bdf8; font-weight: bold; border-radius: 0 4px 4px 0; padding: 2px 6px;");const i=Object.entries(t).filter(([,s])=>s!==V);i.length>0&&console.warn(`[home-architect] Versions différentes chargées dans la page (${e} v${V}, `+i.map(([s,r])=>`${s} ${r}`).join(", ")+") : rechargez la page pour utiliser la nouvelle version.")}export{de as F,A as P,b as S,V,Y as a,K as b,me as c,ce as d,Ot as i,I as n,S as r,ne as t};
