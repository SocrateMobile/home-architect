const No=(function(){const t=typeof document<"u"&&document.createElement("link").relList;return t&&t.supports&&t.supports("modulepreload")?"modulepreload":"preload"})(),Fo=function(n,t){return new URL(n,t).href},Wn={},jo=function(t,e,r){let i=Promise.resolve();if(e&&e.length>0){let h=function(l){return Promise.all(l.map(u=>Promise.resolve(u).then(d=>({status:"fulfilled",value:d}),d=>({status:"rejected",reason:d}))))};const s=document.getElementsByTagName("link"),a=document.querySelector("meta[property=csp-nonce]"),c=a?.nonce||a?.getAttribute("nonce");i=h(e.map(l=>{if(l=Fo(l,r),l in Wn)return;Wn[l]=!0;const u=l.endsWith(".css"),d=u?'[rel="stylesheet"]':"";if(r)for(let f=s.length-1;f>=0;f--){const m=s[f];if(m.href===l&&(!u||m.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${l}"]${d}`))return;const p=document.createElement("link");if(p.rel=u?"stylesheet":No,u||(p.as="script"),p.crossOrigin="",p.href=l,c&&p.setAttribute("nonce",c),document.head.appendChild(p),u)return new Promise((f,m)=>{p.addEventListener("load",f),p.addEventListener("error",()=>m(new Error(`Unable to preload CSS for ${l}`)))})}))}function o(s){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=s,window.dispatchEvent(a),!a.defaultPrevented)throw s}return i.then(s=>{for(const a of s||[])a.status==="rejected"&&o(a.reason);return t().catch(o)})};const Ee=globalThis,mn=Ee.ShadowRoot&&(Ee.ShadyCSS===void 0||Ee.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,gn=Symbol(),Un=new WeakMap;let yi=class{constructor(t,e,r){if(this._$cssResult$=!0,r!==gn)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(mn&&t===void 0){const r=e!==void 0&&e.length===1;r&&(t=Un.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),r&&Un.set(e,t))}return t}toString(){return this.cssText}};const sn=n=>new yi(typeof n=="string"?n:n+"",void 0,gn),yn=(n,...t)=>{const e=n.length===1?n[0]:t.reduce((r,i,o)=>r+(s=>{if(s._$cssResult$===!0)return s.cssText;if(typeof s=="number")return s;throw Error("Value passed to 'css' function must be a 'css' function result: "+s+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+n[o+1],n[0]);return new yi(e,n,gn)},zo=(n,t)=>{if(mn)n.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const e of t){const r=document.createElement("style"),i=Ee.litNonce;i!==void 0&&r.setAttribute("nonce",i),r.textContent=e.cssText,n.appendChild(r)}},Hn=mn?n=>n:n=>n instanceof CSSStyleSheet?(t=>{let e="";for(const r of t.cssRules)e+=r.cssText;return sn(e)})(n):n;const{is:Wo,defineProperty:Uo,getOwnPropertyDescriptor:Ho,getOwnPropertyNames:Yo,getOwnPropertySymbols:Bo,getPrototypeOf:qo}=Object,Re=globalThis,Yn=Re.trustedTypes,Xo=Yn?Yn.emptyScript:"",Go=Re.reactiveElementPolyfillSupport,se=(n,t)=>n,Te={toAttribute(n,t){switch(t){case Boolean:n=n?Xo:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,t){let e=n;switch(t){case Boolean:e=n!==null;break;case Number:e=n===null?null:Number(n);break;case Object:case Array:try{e=JSON.parse(n)}catch{e=null}}return e}},xn=(n,t)=>!Wo(n,t),Bn={attribute:!0,type:String,converter:Te,reflect:!1,useDefault:!1,hasChanged:xn};Symbol.metadata??=Symbol("metadata"),Re.litPropertyMetadata??=new WeakMap;let Rt=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=Bn){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const r=Symbol(),i=this.getPropertyDescriptor(t,r,e);i!==void 0&&Uo(this.prototype,t,i)}}static getPropertyDescriptor(t,e,r){const{get:i,set:o}=Ho(this.prototype,t)??{get(){return this[e]},set(s){this[e]=s}};return{get:i,set(s){const a=i?.call(this);o?.call(this,s),this.requestUpdate(t,a,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??Bn}static _$Ei(){if(this.hasOwnProperty(se("elementProperties")))return;const t=qo(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(se("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(se("properties"))){const e=this.properties,r=[...Yo(e),...Bo(e)];for(const i of r)this.createProperty(i,e[i])}const t=this[Symbol.metadata];if(t!==null){const e=litPropertyMetadata.get(t);if(e!==void 0)for(const[r,i]of e)this.elementProperties.set(r,i)}this._$Eh=new Map;for(const[e,r]of this.elementProperties){const i=this._$Eu(e,r);i!==void 0&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const r=new Set(t.flat(1/0).reverse());for(const i of r)e.unshift(Hn(i))}else t!==void 0&&e.push(Hn(t));return e}static _$Eu(t,e){const r=e.attribute;return r===!1?void 0:typeof r=="string"?r:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const r of e.keys())this.hasOwnProperty(r)&&(t.set(r,this[r]),delete this[r]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return zo(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,r){this._$AK(t,r)}_$ET(t,e){const r=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,r);if(i!==void 0&&r.reflect===!0){const o=(r.converter?.toAttribute!==void 0?r.converter:Te).toAttribute(e,r.type);this._$Em=t,o==null?this.removeAttribute(i):this.setAttribute(i,o),this._$Em=null}}_$AK(t,e){const r=this.constructor,i=r._$Eh.get(t);if(i!==void 0&&this._$Em!==i){const o=r.getPropertyOptions(i),s=typeof o.converter=="function"?{fromAttribute:o.converter}:o.converter?.fromAttribute!==void 0?o.converter:Te;this._$Em=i;const a=s.fromAttribute(e,o.type);this[i]=a??this._$Ej?.get(i)??a,this._$Em=null}}requestUpdate(t,e,r,i=!1,o){if(t!==void 0){const s=this.constructor;if(i===!1&&(o=this[t]),r??=s.getPropertyOptions(t),!((r.hasChanged??xn)(o,e)||r.useDefault&&r.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(s._$Eu(t,r))))return;this.C(t,e,r)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:r,reflect:i,wrapped:o},s){r&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,s??e??this[t]),o!==!0||s!==void 0)||(this._$AL.has(t)||(this.hasUpdated||r||(e=void 0),this._$AL.set(t,e)),i===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[i,o]of this._$Ep)this[i]=o;this._$Ep=void 0}const r=this.constructor.elementProperties;if(r.size>0)for(const[i,o]of r){const{wrapped:s}=o,a=this[i];s!==!0||this._$AL.has(i)||a===void 0||this.C(i,void 0,o,a)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(r=>r.hostUpdate?.()),this.update(e)):this._$EM()}catch(r){throw t=!1,this._$EM(),r}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};Rt.elementStyles=[],Rt.shadowRootOptions={mode:"open"},Rt[se("elementProperties")]=new Map,Rt[se("finalized")]=new Map,Go?.({ReactiveElement:Rt}),(Re.reactiveElementVersions??=[]).push("2.1.2");const bn=globalThis,qn=n=>n,Ie=bn.trustedTypes,Xn=Ie?Ie.createPolicy("lit-html",{createHTML:n=>n}):void 0,xi="$lit$",xt=`lit$${Math.random().toFixed(9).slice(2)}$`,bi="?"+xt,Vo=`<${bi}>`,It=document,he=()=>It.createComment(""),ue=n=>n===null||typeof n!="object"&&typeof n!="function",vn=Array.isArray,Ko=n=>vn(n)||typeof n?.[Symbol.iterator]=="function",qe=`[ 	
\f\r]`,Zt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Gn=/-->/g,Vn=/>/g,kt=RegExp(`>|${qe}(?:([^\\s"'>=/]+)(${qe}*=${qe}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Kn=/'/g,Zn=/"/g,vi=/^(?:script|style|textarea|title)$/i,wi=n=>(t,...e)=>({_$litType$:n,strings:t,values:e}),Q=wi(1),w=wi(2),ot=Symbol.for("lit-noChange"),$=Symbol.for("lit-nothing"),Jn=new WeakMap,Pt=It.createTreeWalker(It,129);function $i(n,t){if(!vn(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return Xn!==void 0?Xn.createHTML(t):t}const Zo=(n,t)=>{const e=n.length-1,r=[];let i,o=t===2?"<svg>":t===3?"<math>":"",s=Zt;for(let a=0;a<e;a++){const c=n[a];let h,l,u=-1,d=0;for(;d<c.length&&(s.lastIndex=d,l=s.exec(c),l!==null);)d=s.lastIndex,s===Zt?l[1]==="!--"?s=Gn:l[1]!==void 0?s=Vn:l[2]!==void 0?(vi.test(l[2])&&(i=RegExp("</"+l[2],"g")),s=kt):l[3]!==void 0&&(s=kt):s===kt?l[0]===">"?(s=i??Zt,u=-1):l[1]===void 0?u=-2:(u=s.lastIndex-l[2].length,h=l[1],s=l[3]===void 0?kt:l[3]==='"'?Zn:Kn):s===Zn||s===Kn?s=kt:s===Gn||s===Vn?s=Zt:(s=kt,i=void 0);const p=s===kt&&n[a+1].startsWith("/>")?" ":"";o+=s===Zt?c+Vo:u>=0?(r.push(h),c.slice(0,u)+xi+c.slice(u)+xt+p):c+xt+(u===-2?a:p)}return[$i(n,o+(n[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),r]};class de{constructor({strings:t,_$litType$:e},r){let i;this.parts=[];let o=0,s=0;const a=t.length-1,c=this.parts,[h,l]=Zo(t,e);if(this.el=de.createElement(h,r),Pt.currentNode=this.el.content,e===2||e===3){const u=this.el.content.firstChild;u.replaceWith(...u.childNodes)}for(;(i=Pt.nextNode())!==null&&c.length<a;){if(i.nodeType===1){if(i.hasAttributes())for(const u of i.getAttributeNames())if(u.endsWith(xi)){const d=l[s++],p=i.getAttribute(u).split(xt),f=/([.?@])?(.*)/.exec(d);c.push({type:1,index:o,name:f[2],strings:p,ctor:f[1]==="."?Qo:f[1]==="?"?ts:f[1]==="@"?es:Le}),i.removeAttribute(u)}else u.startsWith(xt)&&(c.push({type:6,index:o}),i.removeAttribute(u));if(vi.test(i.tagName)){const u=i.textContent.split(xt),d=u.length-1;if(d>0){i.textContent=Ie?Ie.emptyScript:"";for(let p=0;p<d;p++)i.append(u[p],he()),Pt.nextNode(),c.push({type:2,index:++o});i.append(u[d],he())}}}else if(i.nodeType===8)if(i.data===bi)c.push({type:2,index:o});else{let u=-1;for(;(u=i.data.indexOf(xt,u+1))!==-1;)c.push({type:7,index:o}),u+=xt.length-1}o++}}static createElement(t,e){const r=It.createElement("template");return r.innerHTML=t,r}}function zt(n,t,e=n,r){if(t===ot)return t;let i=r!==void 0?e._$Co?.[r]:e._$Cl;const o=ue(t)?void 0:t._$litDirective$;return i?.constructor!==o&&(i?._$AO?.(!1),o===void 0?i=void 0:(i=new o(n),i._$AT(n,e,r)),r!==void 0?(e._$Co??=[])[r]=i:e._$Cl=i),i!==void 0&&(t=zt(n,i._$AS(n,t.values),i,r)),t}class Jo{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:r}=this._$AD,i=(t?.creationScope??It).importNode(e,!0);Pt.currentNode=i;let o=Pt.nextNode(),s=0,a=0,c=r[0];for(;c!==void 0;){if(s===c.index){let h;c.type===2?h=new qt(o,o.nextSibling,this,t):c.type===1?h=new c.ctor(o,c.name,c.strings,this,t):c.type===6&&(h=new ns(o,this,t)),this._$AV.push(h),c=r[++a]}s!==c?.index&&(o=Pt.nextNode(),s++)}return Pt.currentNode=It,i}p(t){let e=0;for(const r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(t,r,e),e+=r.strings.length-2):r._$AI(t[e])),e++}}class qt{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,r,i){this.type=2,this._$AH=$,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=r,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=zt(this,t,e),ue(t)?t===$||t==null||t===""?(this._$AH!==$&&this._$AR(),this._$AH=$):t!==this._$AH&&t!==ot&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Ko(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==$&&ue(this._$AH)?this._$AA.nextSibling.data=t:this.T(It.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:r}=t,i=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=de.createElement($i(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===i)this._$AH.p(e);else{const o=new Jo(i,this),s=o.u(this.options);o.p(e),this.T(s),this._$AH=o}}_$AC(t){let e=Jn.get(t.strings);return e===void 0&&Jn.set(t.strings,e=new de(t)),e}k(t){vn(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let r,i=0;for(const o of t)i===e.length?e.push(r=new qt(this.O(he()),this.O(he()),this,this.options)):r=e[i],r._$AI(o),i++;i<e.length&&(this._$AR(r&&r._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const r=qn(t).nextSibling;qn(t).remove(),t=r}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}}class Le{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,r,i,o){this.type=1,this._$AH=$,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=o,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=$}_$AI(t,e=this,r,i){const o=this.strings;let s=!1;if(o===void 0)t=zt(this,t,e,0),s=!ue(t)||t!==this._$AH&&t!==ot,s&&(this._$AH=t);else{const a=t;let c,h;for(t=o[0],c=0;c<o.length-1;c++)h=zt(this,a[r+c],e,c),h===ot&&(h=this._$AH[c]),s||=!ue(h)||h!==this._$AH[c],h===$?t=$:t!==$&&(t+=(h??"")+o[c+1]),this._$AH[c]=h}s&&!i&&this.j(t)}j(t){t===$?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class Qo extends Le{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===$?void 0:t}}class ts extends Le{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==$)}}class es extends Le{constructor(t,e,r,i,o){super(t,e,r,i,o),this.type=5}_$AI(t,e=this){if((t=zt(this,t,e,0)??$)===ot)return;const r=this._$AH,i=t===$&&r!==$||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,o=t!==$&&(r===$||i);i&&this.element.removeEventListener(this.name,this,r),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class ns{constructor(t,e,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){zt(this,t)}}const Lh={I:qt},rs=bn.litHtmlPolyfillSupport;rs?.(de,qt),(bn.litHtmlVersions??=[]).push("3.3.3");const is=(n,t,e)=>{const r=e?.renderBefore??t;let i=r._$litPart$;if(i===void 0){const o=e?.renderBefore??null;r._$litPart$=i=new qt(t.insertBefore(he(),o),o,void 0,e??{})}return i._$AI(n),i};const wn=globalThis;let ae=class extends Rt{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=is(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return ot}};ae._$litElement$=!0,ae.finalized=!0,wn.litElementHydrateSupport?.({LitElement:ae});const os=wn.litElementPolyfillSupport;os?.({LitElement:ae});(wn.litElementVersions??=[]).push("4.2.2");const ss={attribute:!0,type:String,converter:Te,reflect:!1,hasChanged:xn},as=(n=ss,t,e)=>{const{kind:r,metadata:i}=e;let o=globalThis.litPropertyMetadata.get(i);if(o===void 0&&globalThis.litPropertyMetadata.set(i,o=new Map),r==="setter"&&((n=Object.create(n)).wrapped=!0),o.set(e.name,n),r==="accessor"){const{name:s}=e;return{set(a){const c=t.get.call(this);t.set.call(this,a),this.requestUpdate(s,c,n,!0,a)},init(a){return a!==void 0&&this.C(s,void 0,n,a),a}}}if(r==="setter"){const{name:s}=e;return function(a){const c=this[s];t.call(this,a),this.requestUpdate(s,c,n,!0,a)}}throw Error("Unsupported decorator location: "+r)};function z(n){return(t,e)=>typeof e=="object"?as(n,t,e):((r,i,o)=>{const s=i.hasOwnProperty(o);return i.constructor.createProperty(o,r),s?Object.getOwnPropertyDescriptor(i,o):void 0})(n,t,e)}function j(n){return z({...n,state:!0,attribute:!1})}const _i={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4},$n=n=>(...t)=>({_$litDirective$:n,values:t});let _n=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,r){this._$Ct=t,this._$AM=e,this._$Ci=r}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};const Qn=$n(class extends _n{constructor(n){if(super(n),n.type!==_i.ATTRIBUTE||n.name!=="class"||n.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(n){return" "+Object.keys(n).filter(t=>n[t]).join(" ")+" "}update(n,[t]){if(this.st===void 0){this.st=new Set,n.strings!==void 0&&(this.nt=new Set(n.strings.join(" ").split(/\s/).filter(r=>r!=="")));for(const r in t)t[r]&&!this.nt?.has(r)&&this.st.add(r);return this.render(t)}const e=n.element.classList;for(const r of this.st)r in t||(e.remove(r),this.st.delete(r));for(const r in t){const i=!!t[r];i===this.st.has(r)||this.nt?.has(r)||(i?(e.add(r),this.st.add(r)):(e.remove(r),this.st.delete(r)))}return ot}});const cs={},ct=$n(class extends _n{constructor(){super(...arguments),this.ot=cs}render(n,t){return t()}update(n,[t,e]){if(Array.isArray(t)){if(Array.isArray(this.ot)&&this.ot.length===t.length&&t.every((r,i)=>r===this.ot[i]))return ot}else if(this.ot===t)return ot;return this.ot=Array.isArray(t)?Array.from(t):t,this.render(t,e)}});const Mi="important",ls=" !"+Mi,tr=$n(class extends _n{constructor(n){if(super(n),n.type!==_i.ATTRIBUTE||n.name!=="style"||n.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(n){return Object.keys(n).reduce((t,e)=>{const r=n[e];return r==null?t:t+`${e=e.includes("-")?e:e.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${r};`},"")}update(n,[t]){const{style:e}=n.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(t)),this.render(t);for(const r of this.ft)t[r]==null&&(this.ft.delete(r),r.includes("-")?e.removeProperty(r):e[r]=null);for(const r in t){const i=t[r];if(i!=null){this.ft.add(r);const o=typeof i=="string"&&i.endsWith(ls);r.includes("-")||o?e.setProperty(r,o?i.slice(0,-11):i,o?Mi:""):e[r]=i}}return ot}}),hs=yn`
  :host {
    /* Palette sombre (défaut) */
    --arch-bg-default: #0f172a;
    --arch-text-default: #f8fafc;
    --arch-text-muted-default: #94a3b8;
    --arch-bg: var(--ha-arch-bg, var(--arch-bg-default));
    --arch-text: var(--ha-arch-text, var(--arch-text-default));
    --arch-text-muted: var(--ha-arch-text-muted, var(--arch-text-muted-default));
    --arch-halo: var(--ha-arch-halo, rgba(15, 23, 42, 0.85));
    --arch-grid: var(--ha-arch-grid, rgba(255, 255, 255, 0.06));
    --arch-grid-major: var(--ha-arch-grid-major, rgba(255, 255, 255, 0.14));
    --arch-grid-dot: var(--ha-arch-grid-dot, rgba(255, 255, 255, 0.08));
    --arch-ground-shadow: var(--ha-arch-ground-shadow, rgba(0, 0, 0, 0.45));
    --arch-accent: var(--ha-arch-accent, #38bdf8);
    --arch-accent-strong: var(--ha-arch-accent-strong, #06b6d4);
    --arch-accent-soft: var(--ha-arch-accent-soft, rgba(56, 189, 248, 0.4));
    --arch-accent-faint: var(--ha-arch-accent-faint, rgba(56, 189, 248, 0.12));
    --arch-accent-text: var(--ha-arch-accent-text, #a5f3fc);
    --arch-selection-fill: var(--ha-arch-selection-fill, rgba(6, 182, 212, 0.45));
    --arch-selection-glow: var(--ha-arch-selection-glow, rgba(6, 182, 212, 0.8));
    --arch-selection-line: var(--ha-arch-selection-line, #22d3ee);
    --arch-marquee-fill: var(--ha-arch-marquee-fill, rgba(6, 182, 212, 0.15));
    --arch-invalid: var(--ha-arch-invalid, #ef4444);
    --arch-invalid-fill: var(--ha-arch-invalid-fill, rgba(239, 68, 68, 0.3));
    --arch-room-fill: var(--ha-arch-room-fill, rgba(56, 189, 248, 0.12));
    --arch-room-stroke: var(--ha-arch-room-stroke, rgba(56, 189, 248, 0.4));
    --arch-wall-fill: var(--ha-arch-wall-fill, #334155);
    --arch-wall-hover: var(--ha-arch-wall-hover, #475569);
    --arch-wall-stroke: var(--ha-arch-wall-stroke, #64748b);
    --arch-wall-centerline: var(--ha-arch-wall-centerline, #94a3b8);
    --arch-wall-cap: var(--ha-arch-wall-cap, #f1f5f9);
    --arch-wall-cap-stroke: var(--ha-arch-wall-cap-stroke, #94a3b8);
    --arch-frame: var(--ha-arch-frame, #94a3b8);
    --arch-door-3d: var(--ha-arch-door-3d, rgba(120, 83, 51, 0.92));
    --arch-glass-3d: var(--ha-arch-glass-3d, rgba(125, 211, 252, 0.55));
    --arch-surface: var(--ha-arch-surface, rgba(15, 23, 42, 0.85));
    --arch-surface-text: var(--ha-arch-surface-text, #f8fafc);
    --arch-surface-muted: var(--ha-arch-surface-muted, #cbd5e1);
    --arch-surface-border: var(--ha-arch-surface-border, rgba(148, 163, 184, 0.35));
    --arch-hud-bg: var(--ha-arch-hud-bg, rgba(30, 41, 59, 0.85));
    --arch-hud-border: var(--ha-arch-hud-border, rgba(255, 255, 255, 0.15));
    --arch-hud-btn: var(--ha-arch-hud-btn, rgba(51, 65, 85, 0.7));
    --arch-hud-btn-border: var(--ha-arch-hud-btn-border, rgba(255, 255, 255, 0.1));
    --arch-hud-text: var(--ha-arch-hud-text, #f1f5f9);
    --arch-hud-active: var(--ha-arch-hud-active, #0284c7);
    --arch-hud-active-text: var(--ha-arch-hud-active-text, #ffffff);
    --arch-pin-bg: var(--ha-arch-pin-bg, rgba(30, 41, 59, 0.9));
    --arch-pin-border: var(--ha-arch-pin-border, rgba(255, 255, 255, 0.2));
    --arch-pin-light-bg: var(--ha-arch-pin-light-bg, #0284c7);
    --arch-media: var(--ha-arch-media, #a855f7);
    --arch-on: var(--ha-arch-on, #34d399);
    --arch-off: var(--ha-arch-off, #94a3b8);
    --arch-alert: var(--ha-arch-alert, #f87171);
    --arch-alert-ring: var(--ha-arch-alert-ring, #ef4444);
    --arch-info: var(--ha-arch-info, #38bdf8);
    --arch-warning: var(--ha-arch-warning, #fbbf24);
    --arch-light: var(--ha-arch-light, #facc15);
    --arch-light-glow: var(--ha-arch-light-glow, rgba(250, 204, 21, 0.28));
    --arch-temperature: var(--ha-arch-temperature, #facc15);
    --arch-measure: var(--ha-arch-measure, #f59e0b);
    --arch-guide: var(--ha-arch-guide, #d946ef);
    --arch-ghost: var(--ha-arch-ghost, rgba(148, 163, 184, 0.42));
    --arch-hint-bg: var(--ha-arch-hint-bg, rgba(15, 23, 42, 0.92));
    --arch-hint-border: var(--ha-arch-hint-border, rgba(250, 204, 21, 0.5));
    --arch-hint-text: var(--ha-arch-hint-text, #fde68a);
    --arch-handle-border: var(--ha-arch-handle-border, #ffffff);
    /* Poignées des meubles (v1.0.22 / v1.0.26) : mêmes couleurs dans les deux palettes */
    --arch-handle: var(--ha-arch-handle, #38bdf8);
    --arch-handle-hover: var(--ha-arch-handle-hover, #06b6d4);
    --arch-handle-grip: var(--ha-arch-handle-grip, #0f172a);
    --arch-handle-badge-bg: var(--ha-arch-handle-badge-bg, rgba(15, 23, 42, 0.85));
    --arch-handle-badge-border: var(--ha-arch-handle-badge-border, rgba(56, 189, 248, 0.4));

    display: block;
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    /* Le HUD s'adapte à la largeur du canevas (requêtes de conteneur), pas à celle de la fenêtre */
    container: architect-canvas / inline-size;
    user-select: none;
    touch-action: none;
    background-color: var(--arch-bg);
    font-family: var(--ha-font-family-body, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif);
  }

  /* Palette claire (thème clair de Home Assistant, ou theme='light') */
  :host([scheme='light']) {
    --arch-bg-default: #f8fafc;
    --arch-text-default: #0f172a;
    --arch-text-muted-default: #475569;
    --arch-halo: var(--ha-arch-halo, rgba(255, 255, 255, 0.9));
    --arch-grid: var(--ha-arch-grid, rgba(15, 23, 42, 0.07));
    --arch-grid-major: var(--ha-arch-grid-major, rgba(15, 23, 42, 0.16));
    --arch-grid-dot: var(--ha-arch-grid-dot, rgba(15, 23, 42, 0.16));
    --arch-ground-shadow: var(--ha-arch-ground-shadow, rgba(15, 23, 42, 0.18));
    --arch-accent: var(--ha-arch-accent, #0284c7);
    --arch-accent-strong: var(--ha-arch-accent-strong, #0891b2);
    --arch-accent-soft: var(--ha-arch-accent-soft, rgba(2, 132, 199, 0.45));
    --arch-accent-faint: var(--ha-arch-accent-faint, rgba(2, 132, 199, 0.1));
    --arch-accent-text: var(--ha-arch-accent-text, #0e7490);
    --arch-selection-fill: var(--ha-arch-selection-fill, rgba(8, 145, 178, 0.35));
    --arch-selection-glow: var(--ha-arch-selection-glow, rgba(8, 145, 178, 0.55));
    --arch-selection-line: var(--ha-arch-selection-line, #0891b2);
    --arch-marquee-fill: var(--ha-arch-marquee-fill, rgba(8, 145, 178, 0.12));
    --arch-invalid: var(--ha-arch-invalid, #dc2626);
    --arch-invalid-fill: var(--ha-arch-invalid-fill, rgba(220, 38, 38, 0.22));
    --arch-room-fill: var(--ha-arch-room-fill, rgba(2, 132, 199, 0.08));
    --arch-room-stroke: var(--ha-arch-room-stroke, rgba(2, 132, 199, 0.45));
    --arch-wall-fill: var(--ha-arch-wall-fill, #64748b);
    --arch-wall-hover: var(--ha-arch-wall-hover, #475569);
    --arch-wall-stroke: var(--ha-arch-wall-stroke, #334155);
    --arch-wall-centerline: var(--ha-arch-wall-centerline, #e2e8f0);
    --arch-wall-cap: var(--ha-arch-wall-cap, #e2e8f0);
    --arch-wall-cap-stroke: var(--ha-arch-wall-cap-stroke, #64748b);
    --arch-frame: var(--ha-arch-frame, #475569);
    --arch-door-3d: var(--ha-arch-door-3d, rgba(146, 101, 63, 0.9));
    --arch-glass-3d: var(--ha-arch-glass-3d, rgba(56, 189, 248, 0.45));
    --arch-surface: var(--ha-arch-surface, rgba(255, 255, 255, 0.92));
    --arch-surface-text: var(--ha-arch-surface-text, #0f172a);
    --arch-surface-muted: var(--ha-arch-surface-muted, #334155);
    --arch-surface-border: var(--ha-arch-surface-border, rgba(71, 85, 105, 0.35));
    --arch-hud-bg: var(--ha-arch-hud-bg, rgba(255, 255, 255, 0.9));
    --arch-hud-border: var(--ha-arch-hud-border, rgba(15, 23, 42, 0.12));
    --arch-hud-btn: var(--ha-arch-hud-btn, rgba(241, 245, 249, 0.95));
    --arch-hud-btn-border: var(--ha-arch-hud-btn-border, rgba(15, 23, 42, 0.12));
    --arch-hud-text: var(--ha-arch-hud-text, #0f172a);
    --arch-pin-bg: var(--ha-arch-pin-bg, rgba(255, 255, 255, 0.95));
    --arch-pin-border: var(--ha-arch-pin-border, rgba(15, 23, 42, 0.25));
    --arch-media: var(--ha-arch-media, #9333ea);
    --arch-on: var(--ha-arch-on, #059669);
    --arch-off: var(--ha-arch-off, #64748b);
    --arch-alert: var(--ha-arch-alert, #dc2626);
    --arch-alert-ring: var(--ha-arch-alert-ring, #dc2626);
    --arch-info: var(--ha-arch-info, #0284c7);
    --arch-warning: var(--ha-arch-warning, #b45309);
    --arch-light: var(--ha-arch-light, #ca8a04);
    --arch-light-glow: var(--ha-arch-light-glow, rgba(250, 204, 21, 0.35));
    --arch-temperature: var(--ha-arch-temperature, #b45309);
    --arch-measure: var(--ha-arch-measure, #d97706);
    --arch-guide: var(--ha-arch-guide, #c026d3);
    --arch-ghost: var(--ha-arch-ghost, rgba(71, 85, 105, 0.45));
    --arch-hint-bg: var(--ha-arch-hint-bg, rgba(255, 255, 255, 0.95));
    --arch-hint-border: var(--ha-arch-hint-border, rgba(202, 138, 4, 0.6));
    --arch-hint-text: var(--ha-arch-hint-text, #92400e);
  }

  /* Thème 'auto' : fond et textes suivent le thème de Home Assistant */
  :host([follow-theme]) {
    --arch-bg: var(--ha-arch-bg, var(--primary-background-color, var(--arch-bg-default)));
    --arch-text: var(--ha-arch-text, var(--primary-text-color, var(--arch-text-default)));
    --arch-text-muted: var(--ha-arch-text-muted, var(--secondary-text-color, var(--arch-text-muted-default)));
  }

  /* Carte : un balayage vertical fait défiler le tableau de bord ; le plan se déplace et se zoome à deux doigts */
  :host([dashboard]) {
    touch-action: pan-y;
  }

  /* Focusable au clic (raccourcis clavier du canevas) : pas de contour */
  :host(:focus) {
    outline: none;
  }

  .canvas-container {
    width: 100%;
    height: 100%;
    position: relative;
    cursor: crosshair;
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

  .canvas-container.placing {
    cursor: copy;
  }

  /* Carte : seules les épingles sont interactives */
  .canvas-container.dashboard-mode .room-polygon,
  .canvas-container.dashboard-mode .wall-rect,
  .canvas-container.dashboard-mode .furniture-group,
  .canvas-container.dashboard-mode .opening-element {
    cursor: inherit;
  }

  .canvas-container.dashboard-mode .entity-pin {
    cursor: pointer;
  }

  /* 3D et lecture seule : sélection possible, aucun glisser */
  .canvas-container.mode-3d .furniture-group,
  .canvas-container.mode-3d .entity-pin,
  .canvas-container.read-only:not(.dashboard-mode) .furniture-group,
  .canvas-container.read-only:not(.dashboard-mode) .entity-pin {
    cursor: pointer;
  }

  /* Conteneur de la vue : aucune transformation (la rotation 2D est portée par le groupe SVG, la 3D est projetée en JS) */
  .viewport-3d-wrapper {
    width: 100%;
    height: 100%;
  }

  svg.main-viewport {
    width: 100%;
    height: 100%;
    display: block;
    shape-rendering: geometricPrecision;
  }

  /* Rotation de vue 2D (v1.0.29) : quart de tour animé ; origine (centre du canevas) posée par le canevas */
  .viewport-2d-rotator {
    transform-box: view-box;
    transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  }

  /* En 3D la caméra (projetée en JS) reprend l'orientation : le groupe quitte sa rotation sans transition */
  .viewport-3d-wrapper.mode-3d .viewport-2d-rotator {
    transition: none;
  }

  /* Grille 2D et sol 3D */
  .grid-line {
    stroke: var(--arch-grid);
    stroke-width: 0.5;
  }

  .grid-line-major {
    stroke: var(--arch-grid-major);
    stroke-width: 1;
  }

  .grid-dot {
    fill: var(--arch-grid-dot);
  }

  .ground-shadow-core {
    stop-color: var(--arch-ground-shadow);
    stop-opacity: 1;
  }

  .ground-shadow-mid {
    stop-color: var(--arch-ground-shadow);
    stop-opacity: 0.33;
  }

  .ground-shadow-edge {
    stop-color: var(--arch-ground-shadow);
    stop-opacity: 0;
  }

  /* Image de fond */
  .background-image-layer {
    pointer-events: none;
    transition: opacity 0.2s ease;
  }

  /* Sols des pièces : couleur de la pièce, teinte de la lumière ou heatmap via --room-fill */
  .room-polygon {
    fill: var(--room-fill, var(--arch-room-fill));
    stroke: var(--arch-room-stroke);
    stroke-width: 1.5;
    transition: fill 0.3s ease, stroke 0.3s ease;
    cursor: pointer;
  }

  /* Pièce éclairée : contour et halo seulement, la teinte calculée reste visible (constat F59) */
  .room-polygon.illuminated {
    stroke: var(--arch-light);
    stroke-opacity: 0.8;
  }

  .room-glow {
    fill: none;
    stroke: var(--arch-light-glow);
    stroke-width: 12;
    stroke-linejoin: round;
    pointer-events: none;
  }

  .room-polygon:hover {
    stroke: var(--arch-accent);
  }

  .room-label-group {
    pointer-events: none;
  }

  /* Textes posés sur le plan : contour de la couleur du fond plutôt qu'un filtre (pas de flou à chaque pan) */
  .room-label-name,
  .room-label-area,
  .room-label-temp,
  .entity-pin-label,
  .entity-pin-state {
    paint-order: stroke;
    stroke: var(--arch-halo);
    stroke-width: 3px;
    stroke-linejoin: round;
  }

  .room-label-name {
    fill: var(--arch-text);
    font-size: 13px;
    font-weight: 700;
    text-anchor: middle;
  }

  .room-label-area {
    fill: var(--arch-accent);
    font-size: 11px;
    font-weight: 600;
    text-anchor: middle;
    font-family: ui-monospace, SFMono-Regular, monospace;
  }

  .room-label-temp {
    fill: var(--arch-temperature);
    font-size: 9.5px;
    font-weight: 700;
    text-anchor: middle;
    font-family: ui-monospace, SFMono-Regular, monospace;
  }

  /* Étiquettes des pièces en 3D (toujours face à l'écran) */
  .room-3d-badge-group {
    cursor: pointer;
  }

  .room-badge-bg {
    fill: var(--arch-surface);
    stroke: var(--arch-accent-soft);
    stroke-width: 1;
  }

  .room-3d-badge-group.selected .room-badge-bg {
    stroke: var(--arch-accent);
    stroke-width: 2;
  }

  .room-3d-badge-group .room-label-name {
    fill: var(--arch-surface-text);
    font-size: 12px;
    stroke: none;
  }

  .room-3d-badge-group .room-label-area {
    font-size: 11px;
    font-weight: 700;
    stroke: none;
  }

  .room-label-height {
    fill: var(--arch-accent-text);
    font-size: 9.5px;
    font-weight: 600;
    text-anchor: middle;
    font-family: ui-monospace, SFMono-Regular, monospace;
  }

  /* Murs 2D : contours de tous les murs, puis remplissages qui masquent les arêtes des jonctions */
  .wall-outline {
    fill: var(--arch-wall-stroke);
    stroke: var(--arch-wall-stroke);
    stroke-width: 2;
    stroke-linejoin: round;
    pointer-events: none;
  }

  .wall-rect {
    fill: var(--arch-wall-fill);
    stroke: none;
    transition: fill 0.15s ease;
  }

  .wall-element:hover .wall-rect {
    fill: var(--arch-wall-hover);
    stroke: var(--arch-accent);
    stroke-width: 1;
    cursor: pointer;
  }

  .wall-centerline {
    stroke: var(--arch-wall-centerline);
    stroke-width: 1;
    stroke-dasharray: 4, 4;
    opacity: 0.5;
  }

  /* Murs 3D : faces (couleur calculée selon l'éclairage), chapeaux, portes et fenêtres reprojetées */
  .wall-face-3d {
    stroke-width: 0.8;
    stroke-linejoin: round;
  }

  .wall-cap-3d {
    fill: var(--arch-wall-cap);
    stroke: var(--arch-wall-cap-stroke);
    stroke-width: 1.2;
    stroke-linejoin: round;
  }

  .wall-cap-3d.selected {
    fill: var(--arch-accent-strong);
    stroke: var(--arch-accent);
    filter: drop-shadow(0 0 10px var(--arch-selection-glow));
  }

  .opening-3d {
    stroke: var(--arch-frame);
    stroke-width: 1;
    stroke-linejoin: round;
    fill: var(--arch-door-3d);
  }

  .opening-3d.window,
  .opening-3d.french_window,
  .opening-3d.sliding_door {
    fill: var(--arch-glass-3d);
  }

  .opening-3d.selected {
    stroke: var(--arch-accent-strong);
    stroke-width: 2;
  }

  /* Ouvertures (même géométrie que le plan publié) */
  .opening-cutout {
    fill: var(--arch-bg);
    stroke: none;
  }

  .opening-jamb {
    fill: var(--arch-frame);
  }

  .opening-frame {
    fill: none;
    stroke: var(--arch-frame);
    stroke-width: 2.5;
  }

  .opening-leaf {
    stroke: var(--arch-accent);
    stroke-width: 2;
    stroke-linecap: round;
  }

  .opening-swing {
    fill: var(--arch-accent-faint);
    stroke: var(--arch-accent);
    stroke-width: 1.2;
    stroke-dasharray: 3, 3;
  }

  .opening-glass {
    stroke: var(--arch-accent);
    stroke-width: 1.5;
  }

  .opening-sash {
    stroke: var(--arch-accent-soft);
    stroke-width: 1;
  }

  .opening-mullion {
    stroke: var(--arch-accent);
    stroke-width: 2.5;
  }

  .opening-panel {
    fill: var(--arch-accent);
  }

  .opening-preview {
    opacity: 0.85;
    filter: drop-shadow(0 0 6px var(--arch-accent));
    pointer-events: none;
  }

  .opening-preview-body {
    fill: var(--arch-accent-soft);
    stroke: var(--arch-accent);
  }

  /* Ouverture refusée : mur trop court ou chevauchement d'une ouverture existante */
  .opening-preview.invalid {
    filter: drop-shadow(0 0 6px var(--arch-invalid));
  }

  .opening-preview.invalid .opening-preview-body {
    fill: var(--arch-invalid-fill);
    stroke: var(--arch-invalid);
  }

  /* Pièce en cours de tracé (polygone ou rectangle) */
  .room-draft-fill {
    fill: var(--arch-accent-faint);
    stroke: none;
  }

  .room-draft-line {
    fill: none;
    stroke: var(--arch-accent);
    stroke-width: 2;
    stroke-dasharray: 6, 4;
  }

  .room-draft-closing {
    stroke: var(--arch-accent);
    stroke-width: 1.2;
    stroke-dasharray: 2, 4;
    opacity: 0.7;
  }

  .room-draft-vertex {
    fill: var(--arch-bg);
    stroke: var(--arch-accent);
    stroke-width: 2;
  }

  .room-draft-vertex.first {
    fill: var(--arch-accent);
    stroke: var(--arch-handle-border);
  }

  /* Poignées d'extrémité de mur et de sommet de pièce */
  .wall-endpoint-handle,
  .room-vertex-handle {
    cursor: move;
  }

  .selection-handles .handle-dot {
    fill: var(--arch-accent);
    stroke: var(--arch-handle-border);
    stroke-width: 2;
    transition: fill 0.15s ease;
  }

  .wall-endpoint-handle:hover .handle-dot,
  .room-vertex-handle:hover .handle-dot {
    fill: var(--arch-accent-strong);
    filter: drop-shadow(0 0 8px var(--arch-accent-strong));
  }

  /* Aperçu du mur en cours de tracé */
  .preview-wall-rect {
    fill: var(--arch-accent-soft);
    stroke: var(--arch-accent);
    stroke-width: 2;
    stroke-dasharray: 6, 4;
  }

  .preview-wall-line {
    stroke: var(--arch-accent);
    stroke-width: 2;
  }

  /* Segment d'étalonnage */
  .calibration-line {
    stroke: var(--arch-measure);
    stroke-width: 2.5;
    stroke-dasharray: 5, 4;
  }

  .calibration-endpoint {
    fill: var(--arch-measure);
    stroke: var(--arch-handle-border);
    stroke-width: 1.5;
  }

  /* Mise à l'échelle */
  .rescale-line {
    stroke: var(--arch-accent);
    stroke-width: 3;
    stroke-dasharray: 6, 4;
  }

  .rescale-start {
    fill: var(--arch-accent);
    stroke: var(--arch-handle-border);
    stroke-width: 2;
  }

  .rescale-end {
    fill: var(--arch-hud-active);
    stroke: var(--arch-accent);
    stroke-width: 2;
  }

  /* Accrochage et guides */
  .snap-indicator {
    fill: none;
    stroke: var(--arch-accent);
    stroke-width: 2;
    transform-box: fill-box;
    transform-origin: center;
    animation: pulseSnap 1.5s infinite alternate ease-in-out;
  }

  .snap-indicator-dot {
    fill: var(--arch-accent);
  }

  @keyframes pulseSnap {
    0% { transform: scale(0.85); opacity: 0.7; }
    100% { transform: scale(1.15); opacity: 1; }
  }

  .angle-guide-line {
    stroke: var(--arch-accent-strong);
    stroke-width: 1.5;
    stroke-dasharray: 4, 4;
    opacity: 0.8;
  }

  /* Guides d'alignement orthogonaux */
  .smart-guide-line {
    stroke: var(--arch-guide);
    stroke-width: 1.5;
    stroke-dasharray: 4, 3;
    opacity: 0.85;
    pointer-events: none;
  }

  /* Cotation automatique des murs */
  .wall-dim-badge {
    pointer-events: none;
    user-select: none;
  }

  .wall-dim-badge rect {
    fill: var(--arch-surface);
    stroke: var(--arch-surface-border);
    stroke-width: 0.8;
    rx: 3;
  }

  .wall-dim-badge text {
    fill: var(--arch-surface-muted);
    font-size: 9.5px;
    font-weight: 700;
    text-anchor: middle;
    dominant-baseline: central;
    font-family: ui-monospace, SFMono-Regular, monospace;
  }

  /* Meubles */
  .furniture-group {
    cursor: grab;
  }

  .furniture-group:active {
    cursor: grabbing;
  }

  .furniture-group.selected .furniture-symbol {
    filter: drop-shadow(0 0 12px var(--arch-selection-glow));
  }

  /* Poignées des meubles : taille constante à l'écran, au-dessus du plan */
  .handle-hit {
    fill: transparent;
  }

  .handle-guide {
    stroke: var(--arch-handle);
    stroke-width: 1.5;
    stroke-dasharray: 3, 2;
  }

  .handle-knob {
    fill: var(--arch-handle);
    stroke: var(--arch-handle-border);
  }

  .handle-grip {
    stroke: var(--arch-handle-grip);
    stroke-width: 1.2;
    stroke-linecap: round;
  }

  .handle-angle,
  .handle-size-text {
    fill: var(--arch-handle);
    font-weight: 700;
    user-select: none;
    pointer-events: none;
  }

  .handle-angle {
    font-size: 10px;
    text-anchor: middle;
    text-shadow: 0 1px 4px rgba(0, 0, 0, 0.8);
  }

  .handle-size-badge {
    user-select: none;
    pointer-events: none;
  }

  .handle-size-badge rect {
    fill: var(--arch-handle-badge-bg);
    stroke: var(--arch-handle-badge-border);
    stroke-width: 0.8;
  }

  .handle-size-text {
    font-size: 9px;
    font-family: ui-monospace, SFMono-Regular, monospace;
  }

  .furniture-rotate-handle {
    cursor: grab;
    transition: transform 0.15s ease, filter 0.15s ease;
  }

  .furniture-rotate-handle:hover circle {
    fill: var(--arch-handle-hover) !important;
    stroke: var(--arch-handle-border) !important;
    filter: drop-shadow(0 0 8px var(--arch-handle-hover));
  }

  .furniture-rotate-handle:active {
    cursor: grabbing;
  }

  .furniture-resize-handle {
    cursor: nwse-resize;
    transition: transform 0.15s ease, filter 0.15s ease;
  }

  .furniture-resize-handle:hover rect {
    fill: var(--arch-handle-hover) !important;
    stroke: var(--arch-handle-border) !important;
    filter: drop-shadow(0 0 8px var(--arch-handle-hover));
  }

  .furniture-resize-handle:active {
    cursor: nwse-resize;
  }

  /* Calque fantôme du niveau inférieur */
  .ghost-wall {
    stroke: var(--arch-ghost);
    stroke-width: 2;
    stroke-dasharray: 5, 4;
    fill: none;
    pointer-events: none;
  }

  /* Cotes des aperçus (tracé, étalonnage, mise à l'échelle) */
  .dimension-badge {
    pointer-events: none;
  }

  .dimension-badge rect {
    fill: var(--arch-surface);
    stroke: var(--arch-accent-soft);
    stroke-width: 1;
    rx: 4;
    ry: 4;
  }

  .dimension-badge text {
    fill: var(--arch-surface-text);
    font-size: 11px;
    font-weight: 600;
    text-anchor: middle;
    dominant-baseline: central;
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  }

  .dimension-badge.calibration rect {
    stroke: var(--arch-measure);
  }

  .dimension-badge.calibration text {
    fill: var(--arch-measure);
  }

  .dimension-badge.rescale rect {
    stroke: var(--arch-accent);
    stroke-width: 1.8;
    rx: 6;
    ry: 6;
  }

  .dimension-badge.rescale text {
    fill: var(--arch-accent);
    font-size: 12px;
    font-weight: 800;
  }

  /* ======================================= */
  /* ÉLÉMENTS SÉLECTIONNÉS & MULTI-SÉLECTION */
  /* (seuls éléments à filtre d'ombre permanent, constat F35) */
  /* ======================================= */

  .wall-element.selected .wall-rect {
    stroke: var(--arch-accent-strong);
    stroke-width: 2.5px;
    fill: var(--arch-selection-fill);
    filter: drop-shadow(0 0 10px var(--arch-selection-glow));
  }

  .wall-element.selected .wall-centerline {
    stroke: var(--arch-selection-line);
    stroke-width: 2px;
    stroke-dasharray: none;
  }

  .opening-element.selected .opening-leaf,
  .opening-element.selected .opening-frame,
  .opening-element.selected .opening-glass {
    stroke: var(--arch-accent-strong);
    stroke-width: 3px;
    filter: drop-shadow(0 0 10px var(--arch-selection-glow));
  }

  .opening-element.selected .opening-cutout {
    stroke: var(--arch-accent-strong);
    stroke-width: 2px;
  }

  .room-group.selected .room-polygon {
    stroke: var(--arch-accent-strong);
    stroke-width: 3px;
    stroke-dasharray: 6, 4;
    filter: drop-shadow(0 0 14px var(--arch-selection-glow));
  }

  .entity-pin.selected .entity-pin-bg {
    stroke: var(--arch-accent-strong);
    stroke-width: 3px;
    filter: drop-shadow(0 0 14px var(--arch-selection-glow));
  }

  .marquee-selection-box {
    fill: var(--arch-marquee-fill);
    stroke: var(--arch-accent-strong);
    stroke-width: 1.5;
    stroke-dasharray: 4, 3;
    pointer-events: none;
  }

  /* ======================================= */
  /* ÉPINGLES D'ENTITÉS ET ÉTATS EN DIRECT   */
  /* ======================================= */

  .entity-pin {
    cursor: grab;
    outline: none;
  }

  .entity-pin:active {
    cursor: grabbing;
  }

  .entity-pin:hover .entity-pin-bg {
    stroke: var(--arch-accent);
    r: 18px;
  }

  /* Focus clavier (constat F103) */
  .entity-pin:focus-visible .entity-pin-bg {
    stroke: var(--arch-accent);
    stroke-width: 3px;
    r: 18px;
  }

  .entity-pin-bg {
    fill: var(--arch-pin-bg);
    stroke: var(--arch-pin-border);
    stroke-width: 2;
    transition: r 0.18s ease, stroke 0.18s ease;
  }

  .entity-pin.active-light .entity-pin-bg {
    fill: var(--arch-pin-light-bg);
    stroke: var(--arch-light);
  }

  .pin-glow {
    fill: var(--arch-light-glow);
    pointer-events: none;
  }

  .entity-pin.active-radar .entity-pin-bg {
    stroke: var(--arch-alert-ring);
  }

  /* Entité introuvable dans Home Assistant (supprimée ou renommée, constat F132) */
  .entity-pin.orphan .entity-pin-bg {
    stroke: var(--arch-warning);
    stroke-dasharray: 4, 3;
  }

  /* Animations composées (transform et opacity uniquement, constat F133) */
  .radar-pulse-ring {
    fill: none;
    stroke: var(--arch-alert-ring);
    stroke-width: 2;
    vector-effect: non-scaling-stroke;
    transform-box: fill-box;
    transform-origin: center;
    animation: radarPulse 1.8s infinite ease-out;
    pointer-events: none;
  }

  @keyframes radarPulse {
    0% { transform: scale(0.75); opacity: 1; }
    100% { transform: scale(2.375); opacity: 0; }
  }

  /* Cône de détection radar sur le plan 2D */
  .radar-cone-sweep {
    fill: var(--arch-accent-faint, rgba(56, 189, 248, 0.12));
    stroke: var(--arch-accent, #38bdf8);
    stroke-width: 1.5;
    stroke-dasharray: 5, 4;
    opacity: 0.65;
  }

  /* Cibles radar suivies en temps réel */
  .radar-live-target {
    transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .radar-target-halo {
    fill: none;
    stroke-width: 2;
    animation: radarTargetPulse 1.8s infinite ease-out;
  }

  @keyframes radarTargetPulse {
    0% { transform: scale(0.6); opacity: 0.9; }
    100% { transform: scale(1.6); opacity: 0; }
  }

  .radar-target-dot {
    stroke: #ffffff;
    stroke-width: 2;
    filter: drop-shadow(0 2px 6px rgba(0, 0, 0, 0.45));
  }

  .radar-target-icon {
    font-size: 11px;
    text-anchor: middle;
    dominant-baseline: central;
    pointer-events: none;
  }

  .radar-target-pill rect {
    fill: var(--arch-surface, #1e293b);
    stroke: var(--arch-surface-border, rgba(255, 255, 255, 0.15));
    stroke-width: 1;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
  }

  .radar-target-pill text {
    fill: var(--arch-surface-text, #ffffff);
    font-size: 8.5px;
    font-weight: 700;
    text-anchor: middle;
    dominant-baseline: central;
    font-family: ui-monospace, SFMono-Regular, monospace;
  }

  .soundwave-pulse {
    fill: none;
    stroke: var(--arch-media);
    stroke-width: 1.8;
    vector-effect: non-scaling-stroke;
    transform-box: fill-box;
    transform-origin: center;
    animation: soundWave 1.4s infinite ease-out;
    pointer-events: none;
  }

  @keyframes soundWave {
    0% { transform: scale(0.875); opacity: 0.9; }
    100% { transform: scale(2.125); opacity: 0; }
  }

  .fan-spin {
    animation: spinFan 1.2s infinite linear;
    transform-origin: center;
    transform-box: fill-box;
  }

  @keyframes spinFan {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  @media (prefers-reduced-motion: reduce) {
    .radar-pulse-ring,
    .soundwave-pulse,
    .fan-spin,
    .snap-indicator {
      animation: none;
    }

    /* Quart de tour de la vue 2D appliqué sans animation */
    .viewport-2d-rotator {
      transition: none;
    }
  }

  :host([no-animations]) .radar-pulse-ring,
  :host([no-animations]) .soundwave-pulse,
  :host([no-animations]) .fan-spin,
  :host([no-animations]) .snap-indicator {
    animation: none;
  }

  /* Animations coupées (option de la carte) : quart de tour immédiat, comme la caméra 3D */
  :host([no-animations]) .viewport-2d-rotator {
    transition: none;
  }

  /* Hors écran : aucune image calculée pour les animations */
  :host([offscreen]) .radar-pulse-ring,
  :host([offscreen]) .soundwave-pulse,
  :host([offscreen]) .fan-spin,
  :host([offscreen]) .snap-indicator {
    animation-play-state: paused;
  }

  .entity-pin-icon {
    font-size: 15px;
    text-anchor: middle;
    dominant-baseline: central;
    user-select: none;
  }

  .entity-pin-label {
    fill: var(--arch-text);
    font-size: 10px;
    font-weight: 700;
    text-anchor: middle;
    pointer-events: none;
  }

  .entity-pin-state {
    font-size: 8.5px;
    font-weight: 600;
    text-anchor: middle;
    pointer-events: none;
    letter-spacing: 0.2px;
  }

  .entity-pin-state.state-on {
    fill: var(--arch-on);
  }

  .entity-pin-state.state-off {
    fill: var(--arch-off);
  }

  .entity-pin-state.state-alert {
    fill: var(--arch-alert);
  }

  .entity-pin-state.state-info {
    fill: var(--arch-info);
  }

  .entity-pin-state.state-missing {
    fill: var(--arch-warning);
  }

  .entity-pin-value-badge rect {
    fill: var(--arch-surface);
    stroke: var(--arch-accent);
    stroke-width: 1;
    rx: 4;
  }

  .entity-pin-value-badge text {
    fill: var(--arch-accent);
    font-size: 9px;
    font-weight: 700;
    text-anchor: middle;
    dominant-baseline: central;
    font-family: ui-monospace, SFMono-Regular, monospace;
  }

  /* ======================================= */
  /* HUD                                     */
  /* ======================================= */

  .canvas-hud {
    position: absolute;
    bottom: 20px;
    right: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    align-items: center;
    gap: 8px;
    box-sizing: border-box;
    max-width: calc(100% - 32px);
    background: var(--arch-hud-bg);
    backdrop-filter: blur(12px);
    border: 1px solid var(--arch-hud-border);
    border-radius: 12px;
    padding: 6px 10px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    z-index: 50;
    touch-action: none;
  }

  .hud-drag-handle {
    background: transparent;
    border: none;
    color: var(--arch-hud-text, var(--arch-ui-text-muted, #94a3b8));
    cursor: grab;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0 4px;
    height: 32px;
    border-radius: 6px;
    user-select: none;
    touch-action: none;
    font-size: 13px;
    line-height: 1;
    opacity: 0.65;
    transition: opacity 0.15s ease, background-color 0.15s ease, color 0.15s ease;
  }

  .hud-drag-handle:hover,
  .hud-drag-handle.dragging {
    opacity: 1;
    color: var(--arch-accent, #3b82f6);
    background: rgba(255, 255, 255, 0.08);
  }

  .hud-drag-handle.dragging {
    cursor: grabbing;
  }

  .hud-drag-handle:focus-visible {
    outline: 2px solid var(--arch-accent, #3b82f6);
    outline-offset: 1px;
    opacity: 1;
  }

  .grip-dots {
    letter-spacing: -1.5px;
    font-weight: bold;
    user-select: none;
  }

  .hud-btn {
    background: var(--arch-hud-btn);
    color: var(--arch-hud-text);
    border: 1px solid var(--arch-hud-btn-border);
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
    background: var(--arch-hud-active);
    border-color: var(--arch-accent);
    color: var(--arch-hud-active-text);
    transform: translateY(-1px);
  }

  .hud-btn.active {
    background: var(--arch-hud-active);
    border-color: var(--arch-accent);
    color: var(--arch-hud-active-text);
  }

  .hud-btn:focus-visible,
  .hud-preset-btn:focus-visible {
    outline: 2px solid var(--arch-accent);
    outline-offset: 2px;
  }

  .hud-zoom-label {
    display: flex;
    align-items: center;
    padding: 0 8px;
    font-size: 12px;
    font-weight: 600;
    color: var(--arch-text-muted);
    min-width: 48px;
    justify-content: center;
    font-family: ui-monospace, SFMono-Regular, monospace;
  }

  .hud-preset-group {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 4px;
    padding-left: 6px;
    border-left: 1px solid var(--arch-hud-border);
  }

  .hud-preset-btn {
    background: var(--arch-hud-btn);
    color: var(--arch-hud-text);
    border: 1px solid var(--arch-hud-btn-border);
    border-radius: 6px;
    padding: 4px 7px;
    font-size: 11px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.15s ease;
  }

  .hud-preset-btn:hover {
    background: var(--arch-hud-active);
    border-color: var(--arch-accent);
    color: var(--arch-hud-active-text);
  }

  .hud-angle-badge {
    font-size: 10px;
    color: var(--arch-accent);
    font-family: ui-monospace, SFMono-Regular, monospace;
    padding: 0 4px;
    white-space: nowrap;
  }

  .coords-hud {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    box-sizing: border-box;
    max-width: calc(100% - 32px);
    overflow: hidden;
    background: var(--arch-surface);
    backdrop-filter: blur(14px);
    border: 1px solid var(--arch-accent-soft);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.35);
    border-radius: 10px;
    padding: 6px 16px;
    font-size: 11.5px;
    font-weight: 600;
    color: var(--arch-surface-muted);
    font-family: ui-monospace, SFMono-Regular, monospace;
    z-index: 50;
    pointer-events: auto;
    touch-action: none;
    white-space: nowrap;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: bottom 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .coords-hud.selection-active {
    bottom: 90px;
  }

  /*
   * Largeur insuffisante pour placer les coordonnées (centrées) à côté du HUD (à droite) : elles passent
   * au-dessus du HUD au lieu de le chevaucher ; le HUD 3D, avec ses préréglages et la coupe des murs, est
   * plus large (≈ 690 px, constat F126).
   */
  @container architect-canvas (max-width: 1400px) {
    .coords-hud {
      bottom: 76px;
    }
  }

  @container architect-canvas (max-width: 1740px) {
    .canvas-container.mode-3d ~ .coords-hud {
      display: none;
    }
  }

  .coords-key {
    color: var(--arch-accent);
  }

  .coords-sep {
    opacity: 0.35;
  }

  .coords-tool-key {
    color: var(--arch-text-muted);
  }

  .coords-tool {
    color: var(--arch-surface-text);
    font-weight: 700;
  }

  /* Message bref (accrochage refusé, aide à la molette sur la carte, action impossible) */
  .canvas-hint {
    position: absolute;
    top: 64px;
    left: 50%;
    transform: translateX(-50%);
    max-width: calc(100% - 32px);
    box-sizing: border-box;
    background: var(--arch-hint-bg);
    border: 1px solid var(--arch-hint-border);
    border-radius: 10px;
    padding: 6px 14px;
    font-size: 12px;
    font-weight: 600;
    color: var(--arch-hint-text);
    text-align: center;
    z-index: 60;
    pointer-events: none;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  }

  .canvas-hint[hidden] {
    display: none;
  }

  .help-hud {
    position: absolute;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    width: max-content;
    max-width: calc(100% - 32px);
    box-sizing: border-box;
    display: flex;
    align-items: center;
    gap: 8px;
    background: var(--arch-hud-bg);
    backdrop-filter: blur(12px);
    border: 1px solid var(--arch-accent-soft);
    border-radius: 20px;
    padding: 4px 14px 4px 8px;
    font-size: 12px;
    font-weight: 500;
    color: var(--arch-hud-text);
    z-index: 50;
    pointer-events: auto;
    touch-action: none;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
  }

  /* Boussole / Rose des vents interactive (Nord géographique) */
  .compass-hud {
    position: absolute;
    top: 20px;
    right: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    background: var(--arch-hud-bg);
    backdrop-filter: blur(12px);
    border: 1px solid var(--arch-hud-border);
    border-radius: 24px;
    padding: 6px 8px;
    cursor: pointer;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
    z-index: 45;
    user-select: none;
    touch-action: none;
    transition: transform 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease;
  }

  .compass-hud:hover {
    transform: scale(1.05);
    border-color: var(--arch-primary);
    box-shadow: 0 6px 24px rgba(59, 130, 246, 0.3);
  }

  .compass-hud:active {
    transform: scale(0.96);
  }

  .compass-hud-dial {
    position: relative;
    width: 38px;
    height: 38px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .compass-hud-svg {
    width: 100%;
    height: 100%;
    transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .compass-hud-bg {
    fill: var(--arch-surface-card, rgba(30, 41, 59, 0.7));
    stroke: var(--arch-border, rgba(255, 255, 255, 0.1));
    stroke-width: 1.5;
  }

  .compass-hud-n-fixed {
    position: absolute;
    top: -2px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 8px;
    font-weight: 900;
    color: #ef4444;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
    pointer-events: none;
  }

  .compass-hud-badge {
    font-size: 10px;
    font-weight: 700;
    color: var(--arch-surface-text);
    font-family: var(--arch-font-mono, monospace);
    letter-spacing: -0.02em;
  }

  /* HUD compact : téléphone, carte étroite (constat F126) */
  :host([compact]) .compass-hud {
    top: 12px;
    right: 12px;
    padding: 4px 6px;
  }
  :host([compact]) .canvas-hud {
    bottom: 12px;
    right: 12px;
    gap: 6px;
    padding: 5px 8px;
    max-width: calc(100% - 24px);
  }

  :host([compact]) .hud-btn {
    width: 32px;
    height: 32px;
    font-size: 15px;
  }

  :host([compact]) .hud-zoom-label {
    min-width: 40px;
    padding: 0 4px;
    font-size: 11px;
  }

  :host([compact]) .hud-preset-group,
  :host([compact]) .coords-hud {
    display: none;
  }

  /* HUD 3D compact (bouton de coupe des murs en plus) : le pourcentage de zoom cède sa place, + et − restent */
  :host([compact]) .canvas-container.mode-3d ~ .canvas-hud .hud-zoom-label {
    display: none;
  }

  :host([compact]) .help-hud {
    top: 12px;
    max-width: calc(100% - 24px);
    padding: 5px 12px;
    font-size: 11px;
    border-radius: 14px;
  }

  :host([compact]) .canvas-hint {
    top: 52px;
    max-width: calc(100% - 24px);
  }

  /* Quand un toast du studio est affiché, masquer l'aide pour éviter toute superposition */
  :host([has-toast]) .help-hud,
  :host([has-toast]) .canvas-hint {
    display: none !important;
  }
`,Fh=[.01,.02,.05,.1,.25,.5,1],ce={vertex:12,guide:8,wall:10},er={vertex:.25,guide:.18,wall:.25},us=45,ds=6,Se=3,nr=.3,fs=.05,ps=.02,ms=.26;function le(n,t){const e=Math.pow(10,t),r=Math.round(n*e)/e;return r===0?0:r}function Jt(n,t=Se){return{x:le(n.x,t),y:le(n.y,t)}}function rr(n,t){return Math.abs(n.x-t.x)<.001&&Math.abs(n.y-t.y)<.001}function ir(n,t){const e=(n.x-t.origin.x)*t.dir.x+(n.y-t.origin.y)*t.dir.y;return{x:t.origin.x+e*t.dir.x,y:t.origin.y+e*t.dir.y}}function or(n,t){if(t.kind!=="wall"||!t.wall)return!0;const e=t.wall,r=(n.x-e.start.x)*t.dir.x+(n.y-e.start.y)*t.dir.y;return r>=-1e-9&&r<=Math.hypot(e.end.x-e.start.x,e.end.y-e.start.y)+1e-9}function gs(n,t){const e=n.dir.x*t.dir.y-n.dir.y*t.dir.x;if(Math.abs(e)<1e-9)return null;const r=t.origin.x-n.origin.x,i=t.origin.y-n.origin.y,o=(r*t.dir.y-i*t.dir.x)/e,s={x:n.origin.x+o*n.dir.x,y:n.origin.y+o*n.dir.y};for(const a of[n,t])if(a.kind==="angle"&&(s.x-a.origin.x)*a.dir.x+(s.y-a.origin.y)*a.dir.y<0)return null;return s}class I{static snapPoint(t,e,r=[],i,o={}){const s=typeof o=="number"?{}:o,a=this.resolveTolerances(o),c=new Set(s.excludeWallIds??[]),h=r.filter(b=>!c.has(b.id)),l=[...i?[i]:[],...s.excludePoints??[]],u=b=>l.some(k=>rr(k,b)),d=e.size>0?e.size:.5,p=[];if(e.snapToElements&&h.length>0){let b=null,k=a.vertex;for(const q of h)for(const L of[q.start,q.end]){if(u(L))continue;const J=this.distance(t,L);J<k&&(k=J,b=L)}if(b)return{point:{x:b.x,y:b.y},snappedTo:"vertex",constraints:["vertex"]};const _=this.findWallLine(t,h,a,i);if(_){const q=_.wall,L={x:(q.start.x+q.end.x)/2,y:(q.start.y+q.end.y)/2};if(this.distance(ir(t,_),L)<=a.vertex&&!u(L))return{point:Jt(L),snappedTo:"midpoint",constraints:["midpoint"],wallId:q.id};p.push(_)}let v,M,P=a.guide,W=a.guide;for(const q of h)for(const L of[q.start,q.end]){if(u(L))continue;const J=Math.abs(t.x-L.x),ye=Math.abs(t.y-L.y);J<P&&!(i&&Math.abs(L.x-i.x)<.001)&&(P=J,v=L.x),ye<W&&!(i&&Math.abs(L.y-i.y)<.001)&&(W=ye,M=L.y)}const X=[];v!==void 0&&X.push({kind:"smart_guide",axis:"x",value:v,origin:{x:v,y:0},dir:{x:0,y:1},offset:P}),M!==void 0&&X.push({kind:"smart_guide",axis:"y",value:M,origin:{x:0,y:M},dir:{x:1,y:0},offset:W}),X.sort((q,L)=>q.offset-L.offset),p.push(...X)}if(e.snapToAngles&&i){const b=this.findAngleLine(t,i,s);if(b){for(let k=p.length-1;k>=0;k--){const _=p[k];_.kind==="smart_guide"&&Math.abs(_.dir.x*b.dir.y-_.dir.y*b.dir.x)<1e-9&&p.splice(k,1)}p.push(b)}}if(p.length===0)return e.snapToGrid?{point:Jt({x:this.quantize(t.x,d),y:this.quantize(t.y,d)}),snappedTo:"grid",constraints:["grid"]}:{point:Jt(t),snappedTo:"none",constraints:[]};const f=p[0];let m,g=null;for(const b of p.slice(1)){const k=gs(f,b);if(!(!k||i&&rr(k,i))&&!(!or(k,f)||!or(k,b))&&this.distance(k,t)<=2*(f.offset+b.offset)+1e-9){m=b,g=k;break}}const x=[f.kind];m?x.push(m.kind):(g=ir(t,f),e.snapToGrid&&(g=this.quantizeAlongLine(g,f,d),x.push("grid")));const y={point:Jt(g),snappedTo:f.kind,constraints:x};for(const b of m?[f,m]:[f])b.kind==="angle"&&(y.guideAngle=b.angle),b.kind==="wall"&&(y.wallId=b.wall?.id),b.kind==="smart_guide"&&(b.axis==="x"?y.smartGuideX=b.value:y.smartGuideY=b.value);return y}static snapPointToWall(t,e,r=.6,i={}){let o=null,s=1/0;for(const a of e){const c=a.end.x-a.start.x,h=a.end.y-a.start.y,l=Math.sqrt(c*c+h*h);if(l===0)continue;const u=Math.max(0,Math.min(1,((t.x-a.start.x)*c+(t.y-a.start.y)*h)/(l*l))),d=a.start.x+u*c,p=a.start.y+u*h,f=Math.sqrt((t.x-d)**2+(t.y-p)**2),m=i.measureFromFace?r+(a.thickness||0)/2:r;f<=m&&f<s&&(s=f,o={wall:a,projectionPoint:{x:d,y:p},offset:u*l,distance:f,angleRad:Math.atan2(h,c)})}return o}static fitOpening(t,e,r,i={}){const o=this.wallLength(t),s=i.endMargin??fs,a=o>0?(t.end.x-t.start.x)/o:0,c=o>0?(t.end.y-t.start.y)/o:0,h=P=>{const W=this.wallLength(P);return W>0&&Math.abs(a*(P.end.y-P.start.y)-c*(P.end.x-P.start.x))/W>=ms},l=(i.walls??[]).filter(P=>P.id!==t.id&&h(P)),u=P=>l.reduce((W,X)=>this.distanceToSegment(P,X.start,X.end)<=ps?Math.max(W,(X.thickness||0)/2):W,0),d=Math.min(o,u(t.start)+s),p=Math.max(d,o-u(t.end)-s),f=p-d,m=Number.isFinite(r)&&r>0?r:nr,g=Number.isFinite(e)?e:o/2,x=f+1e-9>=nr,y=Math.min(m,Math.max(0,f)),b=y/2,k=x?Math.min(p-b,Math.max(d+b,g)):(d+p)/2,_=(i.openings??[]).filter(P=>P.wallId===t.id&&P.id!==i.ignoreOpeningId).filter(P=>Math.abs(P.offset-k)<(P.width+y)/2-.001).map(P=>P.id),v=le(k,Se),M=le(y,Se);return{offset:v,width:M,fits:x,adjusted:Math.abs(v-g)>.001||Math.abs(M-m)>.001,overlaps:_,usableStart:d,usableEnd:p}}static metersFromPixels(t,e){return t/Math.max(e,1e-6)}static quantize(t,e){return e>0?le(Math.round(t/e)*e,6):t}static roundPoint(t,e=Se){return Jt(t,e)}static wallLength(t){return this.distance(t.start,t.end)}static distance(t,e){const r=t.x-e.x,i=t.y-e.y;return Math.sqrt(r*r+i*i)}static roundMeters(t,e=2){const r=Math.pow(10,e);return Math.round(t*r)/r}static resolveTolerances(t){if(typeof t=="number")return{...er,vertex:t};const e=t.screenPixelsPerMeter;return e!==void 0&&Number.isFinite(e)&&e>0?{vertex:this.metersFromPixels(t.vertexTolerancePx??ce.vertex,e),guide:this.metersFromPixels(t.guideTolerancePx??ce.guide,e),wall:this.metersFromPixels(t.wallTolerancePx??ce.wall,e)}:{...er}}static findWallLine(t,e,r,i){let o=null,s=1/0;for(const a of e){const c=a.end.x-a.start.x,h=a.end.y-a.start.y,l=Math.hypot(c,h);if(l<1e-9||i&&this.distanceToSegment(i,a.start,a.end)<.001)continue;const u=c/l,d=h/l,p=(t.x-a.start.x)*u+(t.y-a.start.y)*d;if(p<=0||p>=l)continue;const f=Math.abs((t.x-a.start.x)*d-(t.y-a.start.y)*u),m=Math.max(0,f-(a.thickness||0)/2);m>r.wall||(m<s||m===s&&o&&f<o.offset)&&(s=m,o={kind:"wall",origin:a.start,dir:{x:u,y:d},offset:f,wall:a})}return o}static findAngleLine(t,e,r){const i=t.x-e.x,o=t.y-e.y;if(Math.hypot(i,o)<1e-6)return null;const a=r.angleStepDeg&&r.angleStepDeg>0?r.angleStepDeg:us,c=r.angleToleranceDeg??ds;let h=Math.atan2(o,i)*180/Math.PI;h<0&&(h+=360);const l=Math.round(h/a)*a;if(Math.abs(h-l)>c)return null;const u=l*Math.PI/180,d={x:Math.cos(u),y:Math.sin(u)};Math.abs(d.x)<1e-12&&(d.x=0),Math.abs(d.y)<1e-12&&(d.y=0);const p=Math.abs(i*d.y-o*d.x);return{kind:"angle",angle:(l%360+360)%360,origin:e,dir:d,offset:p}}static quantizeAlongLine(t,e,r){if(e.kind==="smart_guide")return e.axis==="x"?{x:t.x,y:this.quantize(t.y,r)}:{x:this.quantize(t.x,r),y:t.y};if(e.kind==="angle"){const s=(t.x-e.origin.x)*e.dir.x+(t.y-e.origin.y)*e.dir.y,a=this.quantize(s,r),c=a>0?a:s;return{x:e.origin.x+c*e.dir.x,y:e.origin.y+c*e.dir.y}}const i=e.wall;let o;return Math.abs(e.dir.y)<1e-9?o=(this.quantize(t.x,r)-i.start.x)/e.dir.x:Math.abs(e.dir.x)<1e-9?o=(this.quantize(t.y,r)-i.start.y)/e.dir.y:o=this.quantize((t.x-i.start.x)*e.dir.x+(t.y-i.start.y)*e.dir.y,r),o=Math.max(0,Math.min(this.wallLength(i),o)),{x:i.start.x+o*e.dir.x,y:i.start.y+o*e.dir.y}}static distanceToSegment(t,e,r){const i=r.x-e.x,o=r.y-e.y,s=i*i+o*o;if(s===0)return this.distance(t,e);const a=Math.max(0,Math.min(1,((t.x-e.x)*i+(t.y-e.y)*o)/s));return this.distance(t,{x:e.x+a*i,y:e.y+a*o})}}const sr=1e-4,Xe=.02,ar=.01,ys=.5,xs=5e3,bs=256,xe=new Map,vs=512;class ws{constructor(){this.items=[]}get length(){return this.items.length}push(t){const e=this.items;e.push(t);let r=e.length-1;for(;r>0;){const i=r-1>>1;if(e[i].max>=e[r].max)break;[e[i],e[r]]=[e[r],e[i]],r=i}}pop(){const t=this.items,e=t[0],r=t.pop();if(t.length>0&&r){t[0]=r;let i=0;for(;;){const o=2*i+1,s=o+1;let a=i;if(o<t.length&&t[o].max>t[a].max&&(a=o),s<t.length&&t[s].max>t[a].max&&(a=s),a===i)break;[t[a],t[i]]=[t[i],t[a]],i=a}}return e}}function ht(n,t,e,r){return n*r-t*e}function cr(n,t,e){const r=e.x-t.x,i=e.y-t.y,o=r*r+i*i;if(o===0)return Math.hypot(n.x-t.x,n.y-t.y);const s=Math.max(0,Math.min(1,((n.x-t.x)*r+(n.y-t.y)*i)/o));return Math.hypot(n.x-(t.x+s*r),n.y-(t.y+s*i))}function lr(n){const t=[];for(const e of n){const r=t[t.length-1];(!r||Math.hypot(e.x-r.x,e.y-r.y)>1e-9)&&t.push(e)}for(;t.length>1&&Math.hypot(t[0].x-t[t.length-1].x,t[0].y-t[t.length-1].y)<=1e-9;)t.pop();return t}function $s(n,t,e,r){const i=t.x-n.x,o=t.y-n.y,s=r.x-e.x,a=r.y-e.y,c=ht(i,o,s,a),h=e.x-n.x,l=e.y-n.y;if(Math.abs(c)<1e-12){if(Math.abs(ht(h,l,i,o))>1e-9)return null;const f=i*i+o*o;if(f===0)return null;const m=(h*i+l*o)/f,g=m+(s*i+a*o)/f,x=Math.max(0,Math.min(m,g)),y=Math.min(1,Math.max(m,g));return x>y+1e-9?null:{x:n.x+x*i,y:n.y+x*o}}const d=ht(h,l,s,a)/c,p=ht(h,l,i,o)/c;return d<-1e-9||d>1+1e-9||p<-1e-9||p>1+1e-9?null:{x:n.x+d*i,y:n.y+d*o}}function _s(n){return Math.round(n*100)/100}class G{static isPointInPolygon(t,e){if(!e||e.length<3)return!1;let r=!1;for(let i=0,o=e.length-1;i<e.length;o=i++){const s=e[i].x,a=e[i].y,c=e[o].x,h=e[o].y;a>t.y!=h>t.y&&t.x<(c-s)*(t.y-a)/(h-a)+s&&(r=!r)}return r}static isPointOnBoundary(t,e,r=sr){if(!e||e.length<2)return!1;for(let i=0;i<e.length;i++)if(cr(t,e[i],e[(i+1)%e.length])<=r)return!0;return!1}static containsPoint(t,e,r=sr){return!e||e.length<3?!1:this.isPointOnBoundary(t,e,r)||this.isPointInPolygon(t,e)}static findRoomContainingPoint(t,e){let r=null,i=1/0;for(const o of e){if(!this.containsPoint(t,o.polygon))continue;const s=Math.abs(this.signedArea(o.polygon));s<i-1e-9&&(r=o,i=s)}return r}static signedArea(t){if(!t||t.length<3)return 0;let e=0;for(let r=0;r<t.length;r++){const i=t[r],o=t[(r+1)%t.length];e+=i.x*o.y-o.x*i.y}return e/2}static calculateCentroid(t){if(!t||t.length===0)return{x:0,y:0};let e=0,r=0;for(const l of t)e+=l.x,r+=l.y;const i={x:e/t.length,y:r/t.length};if(t.length<3)return i;const o=t[0].x,s=t[0].y;let a=0,c=0,h=0;for(let l=0;l<t.length;l++){const u=t[l].x-o,d=t[l].y-s,p=t[(l+1)%t.length],f=p.x-o,m=p.y-s,g=u*m-f*d;a+=g,c+=(u+f)*g,h+=(d+m)*g}return Math.abs(a)<1e-12?i:{x:o+c/(3*a),y:s+h/(3*a)}}static distanceToBoundary(t,e){if(!e||e.length===0)return 1/0;if(e.length===1)return Math.hypot(t.x-e[0].x,t.y-e[0].y);let r=1/0;for(let i=0;i<e.length;i++)r=Math.min(r,cr(t,e[i],e[(i+1)%e.length]));return r}static poleOfInaccessibility(t,e=ar){return this.searchInteriorPoint(t,e,0)}static searchInteriorPoint(t,e,r){const i=lr(t||[]);if(i.length<3)return{point:this.calculateCentroid(i),distance:0};let o=1/0,s=1/0,a=-1/0,c=-1/0;for(const v of i)o=Math.min(o,v.x),s=Math.min(s,v.y),a=Math.max(a,v.x),c=Math.max(c,v.y);const h=a-o,l=c-s;if(!(h>0&&l>0)||Math.abs(this.signedArea(i))<1e-12)return{point:this.calculateCentroid(i),distance:0};const u=Math.max(Math.min(h,l),e,Math.max(h,l)/bs),d=Math.max(e,u*1e-6),p=this.calculateCentroid(i),f=(v,M,P)=>{const W={x:v,y:M},X=this.distanceToBoundary(W,i),q=this.isPointInPolygon(W,i)?X:-X,L=q-r*Math.hypot(v-p.x,M-p.y);return{x:v,y:M,h:P,d:q,score:L,max:L+P*Math.SQRT2*(1+r)}},m=new ws,g=u/2,x=Math.ceil(h/u),y=Math.ceil(l/u);for(let v=0;v<x;v++)for(let M=0;M<y;M++)m.push(f(o+v*u+g,s+M*u+g,g));let b=f(p.x,p.y,0);const k=f(o+h/2,s+l/2,0);k.score>b.score&&(b=k);let _=0;for(;m.length>0&&_<xs;){const v=m.pop();if(_++,v.score>b.score&&(b=v),v.max-b.score<=d)continue;const M=v.h/2;m.push(f(v.x-M,v.y-M,M)),m.push(f(v.x+M,v.y-M,M)),m.push(f(v.x-M,v.y+M,M)),m.push(f(v.x+M,v.y+M,M))}return{point:{x:b.x,y:b.y},distance:Math.max(0,b.d)}}static labelPoint(t){if(!t||t.length<3)return this.calculateCentroid(t);const e=t.map(c=>`${c.x},${c.y}`).join(";"),r=xe.get(e);if(r)return{...r};const i=this.calculateCentroid(t),o=this.poleOfInaccessibility(t);let a=(this.isPointInPolygon(i,t)?this.distanceToBoundary(i,t):-1)>=o.distance*.5?i:this.searchInteriorPoint(t,ar,ys).point;return!this.isPointInPolygon(a,t)&&this.isPointInPolygon(o.point,t)&&(a=o.point),xe.size>=vs&&xe.clear(),xe.set(e,a),{...a}}static computeArea(t){return _s(Math.abs(this.signedArea(t)))}static findSelfIntersections(t){const e=lr(t||[]),r=e.length,i=[];if(r<3)return i;for(let o=0;o<r;o++){const s=e[o],a=e[(o+1)%r];for(let c=o+1;c<r;c++){const h=e[c],l=e[(c+1)%r];if(c===o+1||o===0&&c===r-1){const p=c===o+1?a:s,f=c===o+1?{x:s.x-p.x,y:s.y-p.y}:{x:a.x-p.x,y:a.y-p.y},m=c===o+1?{x:l.x-p.x,y:l.y-p.y}:{x:h.x-p.x,y:h.y-p.y},g=Math.hypot(f.x,f.y),x=Math.hypot(m.x,m.y);g>0&&x>0&&Math.abs(ht(f.x,f.y,m.x,m.y))/(g*x)<1e-9&&f.x*m.x+f.y*m.y>0&&i.push({edgeA:o,edgeB:c,point:{...p}});continue}const d=$s(s,a,h,l);d&&i.push({edgeA:o,edgeB:c,point:d})}}return i}static isSelfIntersecting(t){return this.findSelfIntersections(t).length>0}static offsetPolygon(t,e){if(!t||t.length<3)return null;const r=[],i=[],o=t.length;for(let f=0;f<o;f++){const m=t[f],g=t[(f+1)%o];if(Math.hypot(g.x-m.x,g.y-m.y)<=1e-9)continue;const x=Array.isArray(e)?e[f]:e;if(!Number.isFinite(x))return null;r.push(m),i.push(x)}const s=r.length;if(s<3)return null;const a=this.signedArea(r);if(Math.abs(a)<1e-12)return null;const c=a>0?1:-1,h=r.map((f,m)=>{const g=r[(m+1)%s],x=Math.hypot(g.x-f.x,g.y-f.y),y=(g.x-f.x)/x,b=(g.y-f.y)/x,k=-b*c,_=y*c;return{px:f.x+k*i[m],py:f.y+_*i[m],ux:y,uy:b,nx:k,ny:_}}),l=[];for(let f=0;f<s;f++){const m=h[(f-1+s)%s],g=h[f],x=ht(m.ux,m.uy,g.ux,g.uy);if(Math.abs(x)<1e-9){const b=r[f],k=i[(f-1+s)%s],_=[{x:b.x+m.nx*k,y:b.y+m.ny*k}];Math.abs(k-i[f])>1e-9&&_.push({x:b.x+g.nx*i[f],y:b.y+g.ny*i[f]}),l.push(_);continue}const y=ht(g.px-m.px,g.py-m.py,g.ux,g.uy)/x;l.push([{x:m.px+y*m.ux,y:m.py+y*m.uy}])}for(let f=0;f<s;f++){const m=l[f][l[f].length-1],g=l[(f+1)%s][0];if((g.x-m.x)*h[f].ux+(g.y-m.y)*h[f].uy<-1e-9)return null}const u=l.flat(),d=this.signedArea(u),p=i.every(f=>f>=0);return Math.sign(d)!==c||Math.abs(d)<1e-9||p&&Math.abs(d)>Math.abs(a)+1e-9||this.isSelfIntersecting(u)?null:u}static computeInteriorArea(t,e){const r=this.computeArea(t),i={areaM2:r,axisAreaM2:r,matchedEdges:0};if(!t||t.length<3||!e||e.length===0)return i;const o=t.length,s=[];let a=0;for(let h=0;h<o;h++){const l=t[h],u=t[(h+1)%o],d=Math.hypot(u.x-l.x,u.y-l.y);let p=0,f=0;if(d>1e-9)for(const g of e){const x=g.end.x-g.start.x,y=g.end.y-g.start.y,b=Math.hypot(x,y);if(b<1e-9)continue;const k=x/b,_=y/b,v=Math.abs(ht(k,_,l.x-g.start.x,l.y-g.start.y)),M=Math.abs(ht(k,_,u.x-g.start.x,u.y-g.start.y));if(v>Xe||M>Xe)continue;const P=k*(l.x-g.start.x)+_*(l.y-g.start.y),W=k*(u.x-g.start.x)+_*(u.y-g.start.y),X=Math.min(Math.max(P,W),b)-Math.max(Math.min(P,W),0);X<=Xe||(p+=X,f=Math.max(f,(g.thickness||0)/2))}const m=p>=d*.5&&f>0;m&&a++,s.push(m?f:0)}if(a===0)return i;const c=this.offsetPolygon(t,s);return c?{areaM2:this.computeArea(c),axisAreaM2:r,matchedEdges:a}:i}}const an={fr:{},en:{}};let Wt="fr";const cn=new Set;function jh(n){const t=typeof n=="string"&&n.toLowerCase().startsWith("fr")?"fr":"en";if(t!==Wt){Wt=t;for(const e of[...cn])try{e(t)}catch(r){console.error("[home-architect] i18n listener failed",r)}}}function zh(){return Wt}function A(n,t){const e=Wt==="fr"?"en":"fr",r=an[Wt][n]??an[e][n]??n;return t?r.replace(/\{(\w+)\}/g,(i,o)=>Object.prototype.hasOwnProperty.call(t,o)?String(t[o]):i):r}function Oe(n,t){Object.assign(an[n],t)}function Ms(n){return cn.add(n),()=>cn.delete(n)}function ki(n,t){if(!Number.isFinite(n))return"—";try{return new Intl.NumberFormat(Wt==="fr"?"fr-FR":"en-US",t).format(n)}catch{return String(n)}}const ks="__i18nLanguage";class Wh{constructor(t){this.host=t,this.unsubscribe=null,t.addController(this)}hostConnected(){this.unsubscribe=Ms(t=>{const e=t==="fr"?"en":"fr";this.host.requestUpdate(ks,e)})}hostDisconnected(){this.unsubscribe?.(),this.unsubscribe=null}}const Ei={"geometry.close":"Fermer","geometry.cancel":"Annuler","geometry.meters":"mètres","geometry.value_m":"{value} m","geometry.value_m2":"{value} m²","geometry.value_m3":"{value} m³","geometry.room.title":"Propriétés de la pièce","geometry.room.default_name":"Pièce","geometry.room.name_label":"Nom de la pièce :","geometry.room.area_label":"Zone Home Assistant :","geometry.room.area_none":"Aucune zone liée","geometry.room.area_missing":"Zone introuvable ({id})","geometry.room.area_hint":"Associe la pièce du plan à une zone de Home Assistant.","geometry.room.height_label":"Hauteur sous plafond (Rendu 3D) :","geometry.room.height_inherit":"Hauteur par défaut du projet ({height} m)","geometry.room.height_invalid":"Hauteur invalide : saisissez une valeur entre {min} et {max} m.","geometry.room.height_presets":"Hauteurs courantes","geometry.room.height_preset":"{height} m ({name})","geometry.room.preset.basement":"Sous-sol","geometry.room.preset.attic":"Combles","geometry.room.preset.standard":"Standard","geometry.room.preset.high":"Élevé","geometry.room.preset.haussmann":"Haussmann","geometry.room.preset.cathedral":"Cathédrale","geometry.room.surface_interior":"Surface intérieure","geometry.room.surface_axis":"Surface à l'axe des murs","geometry.room.surface_axis_detail":"À l'axe des murs : {area} m²","geometry.room.surface_not_deducted":"Épaisseur des murs non déduite","geometry.room.volume":"Volume 3D calculé","geometry.room.color_label":"Couleur d'ambiance du sol :","geometry.room.color.sky":"Bleu ciel","geometry.room.color.violet":"Violet moderne","geometry.room.color.amber":"Ambre chaleureux","geometry.room.color.emerald":"Émeraude nature","geometry.room.color.indigo":"Indigo profond","geometry.room.color.rose":"Rose pastel","geometry.room.color.slate":"Gris ardoise","geometry.room.delete":"Supprimer","geometry.room.delete_confirm":'Voulez-vous supprimer la pièce "{name}" ?',"geometry.room.save":"Enregistrer","geometry.rescale.title":"Mettre à l'échelle le plan","geometry.rescale.subtitle":"Recalcule automatiquement toutes les dimensions et cotes","geometry.rescale.measured":"Cote mesurée actuelle","geometry.rescale.target":"Nouvelle cote cible","geometry.rescale.input_label":"Quelle est la taille réelle de ce segment en mètres ?","geometry.rescale.factor_label":"Facteur d'ajustement global :","geometry.rescale.factor_value":"× {ratio} ({percent})","geometry.rescale.error_measured":"La cote mesurée est invalide : refaites la mesure sur le plan.","geometry.rescale.error_number":"Saisissez un nombre (ex. {example}).","geometry.rescale.error_positive":"La longueur doit être strictement positive.","geometry.rescale.error_range":"Facteur ×{factor} hors limites (×{min} à ×{max}) : la longueur est-elle bien en mètres ?","geometry.rescale.unusual":"Facteur inhabituel (×{ratio}) : toutes les dimensions seront multipliées par ce facteur. Vérifiez l'unité saisie.","geometry.rescale.confirm_unusual":"Je confirme ce facteur","geometry.rescale.adjust_background":"Ajuster aussi le calque de fond (conserve la superposition avec le plan)","geometry.rescale.scale_elements":"Mettre aussi à l'échelle les épaisseurs de murs, ouvertures et meubles","geometry.rescale.background_layer":"Calque de fond","geometry.rescale.impact.walls":"{subject} : toutes les longueurs et cotes seront recalculées","geometry.rescale.impact.openings":"{subject} : positions et largeurs ajustées proportionnellement","geometry.rescale.impact.rooms":"{subject} : toutes les surfaces en m² seront actualisées","geometry.rescale.impact.furniture":"{subject} : positions et dimensions ajustées","geometry.rescale.impact.bindings.one":"{subject} : position ajustée","geometry.rescale.impact.bindings.other":"{subject} : positions ajustées","geometry.rescale.impact.background_synced":"{subject} : échelle synchronisée pour conserver la superposition","geometry.rescale.impact.background_unchanged":"{subject} : inchangé (il ne sera plus superposé au plan)","geometry.rescale.submit":"Recalculer toutes les cotes","geometry.count.walls.one":"{count} mur","geometry.count.walls.other":"{count} murs","geometry.count.openings.one":"{count} ouverture","geometry.count.openings.other":"{count} ouvertures","geometry.count.rooms.one":"{count} pièce","geometry.count.rooms.other":"{count} pièces","geometry.count.furniture.one":"{count} meuble","geometry.count.furniture.other":"{count} meubles","geometry.count.bindings.one":"{count} entité","geometry.count.bindings.other":"{count} entités","geometry.furniture_category.seating":"Salon","geometry.furniture_category.bed":"Chambre","geometry.furniture_category.table":"Tables","geometry.furniture_category.storage":"Rangements","geometry.furniture_category.bathroom":"Bains","geometry.furniture_category.kitchen":"Cuisine","geometry.furniture_category.other":"Autres","geometry.furniture.sofa_3p":"Canapé 3 places","geometry.furniture.sofa_2p":"Canapé 2 places","geometry.furniture.divan":"Divan / Méridienne (Tête Gauche)","geometry.furniture.divan_right":"Divan / Méridienne (Tête Droite)","geometry.furniture.armchair":"Fauteuil club","geometry.furniture.coffee_table":"Table basse","geometry.furniture.bed_double":"Lit double (Queen)","geometry.furniture.bed_single":"Lit simple","geometry.furniture.nightstand":"Table de chevet","geometry.furniture.wardrobe":"Armoire dressing","geometry.furniture.dining_table_6":"Table repas (6 chaises)","geometry.furniture.desk":"Bureau avec fauteuil","geometry.furniture.chair_starck":"Chaise médaillon transparente","geometry.furniture.console":"Console murale","geometry.furniture.toilet":"WC / Toilettes","geometry.furniture.shower":"Douche italienne","geometry.furniture.bathtub":"Baignoire droite","geometry.furniture.sink_vanity":"Meuble vasque","geometry.furniture.kitchen_sink":"Évier cuisine double","geometry.furniture.cooktop":"Plaque de cuisson","geometry.furniture.fridge":"Réfrigérateur","geometry.furniture.fridge_us":"Réfrigérateur américain","geometry.furniture.dishwasher":"Lave-vaisselle","geometry.furniture.washing_machine":"Lave-linge","geometry.furniture.double_vanity":"Meuble double vasque","geometry.furniture.towel_dryer":"Sèche-serviettes","geometry.furniture.mirror":"Miroir mural","geometry.furniture.wall_art":"Tableau / Poster"},Si={"geometry.close":"Close","geometry.cancel":"Cancel","geometry.meters":"meters","geometry.value_m":"{value} m","geometry.value_m2":"{value} m²","geometry.value_m3":"{value} m³","geometry.room.title":"Room properties","geometry.room.default_name":"Room","geometry.room.name_label":"Room name","geometry.room.area_label":"Home Assistant area","geometry.room.area_none":"No linked area","geometry.room.area_missing":"Area not found ({id})","geometry.room.area_hint":"Links this room of the plan to a Home Assistant area.","geometry.room.height_label":"Ceiling height (3D view)","geometry.room.height_inherit":"Project default height ({height} m)","geometry.room.height_invalid":"Invalid height: enter a value between {min} and {max} m.","geometry.room.height_presets":"Common heights","geometry.room.height_preset":"{height} m ({name})","geometry.room.preset.basement":"Basement","geometry.room.preset.attic":"Attic","geometry.room.preset.standard":"Standard","geometry.room.preset.high":"High","geometry.room.preset.haussmann":"Haussmann-style","geometry.room.preset.cathedral":"Cathedral","geometry.room.surface_interior":"Interior area","geometry.room.surface_axis":"Area to wall centerlines","geometry.room.surface_axis_detail":"To wall centerlines: {area} m²","geometry.room.surface_not_deducted":"Wall thickness not deducted","geometry.room.volume":"Calculated 3D volume","geometry.room.color_label":"Room fill color","geometry.room.color.sky":"Sky blue","geometry.room.color.violet":"Modern violet","geometry.room.color.amber":"Warm amber","geometry.room.color.emerald":"Natural emerald","geometry.room.color.indigo":"Deep indigo","geometry.room.color.rose":"Pastel pink","geometry.room.color.slate":"Slate gray","geometry.room.delete":"Delete","geometry.room.delete_confirm":'Delete the room "{name}"?',"geometry.room.save":"Save","geometry.rescale.title":"Rescale the plan","geometry.rescale.subtitle":"Automatically recalculates every dimension and measurement","geometry.rescale.measured":"Current measured length","geometry.rescale.target":"New target length","geometry.rescale.input_label":"What is the real length of this segment, in meters?","geometry.rescale.factor_label":"Overall scale factor","geometry.rescale.factor_value":"× {ratio} ({percent})","geometry.rescale.error_measured":"The measured length is invalid: measure it again on the plan.","geometry.rescale.error_number":"Enter a number (e.g. {example}).","geometry.rescale.error_positive":"The length must be greater than zero.","geometry.rescale.error_range":"Factor ×{factor} is out of range (×{min} to ×{max}): is the length really in meters?","geometry.rescale.unusual":"Unusual factor (×{ratio}): every dimension will be multiplied by this factor. Check the unit you entered.","geometry.rescale.confirm_unusual":"I confirm this factor","geometry.rescale.adjust_background":"Also adjust the background layer (keeps it lined up with the plan)","geometry.rescale.scale_elements":"Also scale wall thicknesses, opening widths and furniture dimensions","geometry.rescale.background_layer":"Background layer","geometry.rescale.impact.walls":"{subject}: every length and dimension will be recalculated","geometry.rescale.impact.openings":"{subject}: positions and widths adjusted proportionally","geometry.rescale.impact.rooms":"{subject}: every area in m² will be updated","geometry.rescale.impact.furniture":"{subject}: positions and sizes adjusted","geometry.rescale.impact.bindings.one":"{subject}: position adjusted","geometry.rescale.impact.bindings.other":"{subject}: positions adjusted","geometry.rescale.impact.background_synced":"{subject}: scale synchronized so it stays lined up","geometry.rescale.impact.background_unchanged":"{subject}: unchanged (it will no longer line up with the plan)","geometry.rescale.submit":"Recalculate all dimensions","geometry.count.walls.one":"{count} wall","geometry.count.walls.other":"{count} walls","geometry.count.openings.one":"{count} opening","geometry.count.openings.other":"{count} openings","geometry.count.rooms.one":"{count} room","geometry.count.rooms.other":"{count} rooms","geometry.count.furniture.one":"{count} furniture item","geometry.count.furniture.other":"{count} furniture items","geometry.count.bindings.one":"{count} entity","geometry.count.bindings.other":"{count} entities","geometry.furniture_category.seating":"Living room","geometry.furniture_category.bed":"Bedroom","geometry.furniture_category.table":"Tables","geometry.furniture_category.storage":"Storage","geometry.furniture_category.bathroom":"Bathroom","geometry.furniture_category.kitchen":"Kitchen","geometry.furniture_category.other":"Other","geometry.furniture.sofa_3p":"3-seat sofa","geometry.furniture.sofa_2p":"2-seat sofa","geometry.furniture.divan":"Daybed / chaise longue (head left)","geometry.furniture.divan_right":"Daybed / chaise longue (head right)","geometry.furniture.armchair":"Club armchair","geometry.furniture.coffee_table":"Coffee table","geometry.furniture.bed_double":"Double bed (queen)","geometry.furniture.bed_single":"Single bed","geometry.furniture.nightstand":"Nightstand","geometry.furniture.wardrobe":"Wardrobe","geometry.furniture.dining_table_6":"Dining table (6 chairs)","geometry.furniture.desk":"Desk with chair","geometry.furniture.chair_starck":"Clear medallion chair","geometry.furniture.console":"Wall console table","geometry.furniture.toilet":"Toilet","geometry.furniture.shower":"Walk-in shower","geometry.furniture.bathtub":"Rectangular bathtub","geometry.furniture.sink_vanity":"Bathroom vanity","geometry.furniture.kitchen_sink":"Double kitchen sink","geometry.furniture.cooktop":"Cooktop","geometry.furniture.fridge":"Refrigerator","geometry.furniture.fridge_us":"American refrigerator","geometry.furniture.dishwasher":"Dishwasher","geometry.furniture.washing_machine":"Washing machine","geometry.furniture.double_vanity":"Double vanity","geometry.furniture.towel_dryer":"Towel dryer","geometry.furniture.mirror":"Wall mirror","geometry.furniture.wall_art":"Wall poster / Artwork"},Es={fr:Ei,en:Si};Oe("fr",Ei);Oe("en",Si);function Ss(n){return Object.values(Es).map(t=>t[n]).filter(t=>typeof t=="string")}const ln=2,Ps=["standard","partition","loadbearing","exterior"],Ts=["paint","brick","stone","wood_cladding","concrete","plaster"],Is=["door","double_door","sliding_door","window","french_window"],Ds=["none","parquet_oak","parquet_herringbone","tiles_light","tiles_slate","terracotta","marble","concrete","carpet","grass","decking"],As=["toggle","more-info","navigate","none"],Pi=["seating","bed","table","kitchen","bathroom","storage","other"],Cs=["default","oak","walnut","fabric","leather","metal","glass","ceramic"],hr=12,Ti=["seating","bed","table","storage","bathroom","kitchen","other"],Uh=Object.freeze(Object.defineProperties({},Object.fromEntries([...new Set([...Ti,...Pi])].map(n=>[n,{enumerable:!0,get:()=>A(`geometry.furniture_category.${n}`)}])))),Rs=1.5,Ls="📦",Ii=[["stroke","#94a3b8","#475569"],["selected","#38bdf8","#0284c7"],["fill","rgba(30, 41, 59, 0.85)","rgba(226, 232, 240, 0.9)"],["selected-fill","rgba(56, 189, 248, 0.25)","rgba(2, 132, 199, 0.16)"],["accent","rgba(51, 65, 85, 0.9)","rgba(203, 213, 225, 0.95)"],["soft","rgba(241, 245, 249, 0.2)","rgba(255, 255, 255, 0.85)"],["water","rgba(2, 132, 199, 0.25)","rgba(2, 132, 199, 0.18)"],["heat","rgba(239, 68, 68, 0.2)","rgba(220, 38, 38, 0.16)"],["glass","rgba(56, 189, 248, 0.15)","rgba(2, 132, 199, 0.12)"],["highlight","#cbd5e1","#334155"],["frost","#38bdf8","#0284c7"],["brass","#f59e0b","#b45309"],["drain","#0284c7","#0369a1"]],fe=Object.fromEntries(Ii.map(([n,t])=>[n,{token:n,value:t}]));function ur(n){return Ii.map(([t,e,r])=>`--arch-furniture-${t}: var(--ha-arch-furniture-${t}, ${n==="dark"?e:r});`).join(`
`)}yn`
  :host {
    ${sn(ur("dark"))}
  }

  :host([scheme='light']) {
    ${sn(ur("light"))}
  }
`;const Os=/^[#a-zA-Z0-9(),.%\s+-]{1,64}$/,Ns=/url\s*\(|expression|image-set/i;function vt(n,t,e){return Math.min(Math.max(n,t),e)}function N(n,t,e,r,i,o=0,s={}){const a=Math.max(0,e),c=Math.max(0,r);return{kind:"rect",x:n,y:t,w:a,h:c,r:vt(o,0,Math.min(a,c)/2),paint:i,...s}}function U(n,t,e,r,i,o={}){return{kind:"ellipse",cx:n,cy:t,rx:Math.max(0,e),ry:Math.max(0,r),paint:i,...o}}function O(n,t,e,r,i,o={}){return{kind:"line",x1:n,y1:t,x2:e,y2:r,paint:i,...o}}function re(n,t,e={}){return{kind:"path",d:n,paint:t,...e}}function H(n,t,e=.08){return N(-n/2,-t/2,n,t,"body",Math.min(n,t)*e)}function Fs(n){return n.map(t=>{switch(t.kind){case"rect":return{...t,x:-(t.x+t.w)};case"ellipse":return{...t,cx:-t.cx};case"line":return{...t,x1:-t.x1,x2:-t.x2};case"path":return{...t,d:t.d.map(e=>{switch(e[0]){case"M":case"L":return[e[0],-e[1],e[2]];case"Q":return["Q",-e[1],e[2],-e[3],e[4]];case"A":return["A",e[1],e[2],e[3],e[4]===1?0:1,-e[5],e[6]];default:return e}})}}})}function dr(n,t,e,r){const i=vt(n*r,.1,n*.25),o=vt(t*.26,.12,t*.45),s=Math.min(.04,n*.02,t*.04),a=n-i*2,c=a/e,h=[H(n,t),N(-n/2+i,-t/2,a,o,"accent",o*.2),N(-n/2,-t/2,i,t,"accent",i*.3),N(n/2-i,-t/2,i,t,"accent",i*.3)];for(let l=0;l<e;l++){const u=c-s;h.push(N(-n/2+i+l*c+s/2,-t/2+o+s/2,u,t-o-s,"body",Math.min(u,t)*.1))}return h}function fr(n,t){const e=vt(n*.22,.15,n*.4),r=vt(t*.24,.1,t*.45),i=Math.min(.05,n*.03,t*.05),o=n-e,s=-t/2+r+i,a=Math.max(s,t/2-i);return[H(n,t,.1),N(-n/2,-t/2,n*.65,r,"accent",r*.25),N(-n/2,-t/2,e,t,"accent",e*.2),N(-n/2+e+i,-t/2+r+i,o-i*2,t-r-i*2,"body",Math.min(o,t)*.08),O(-n/2+e+o/3,s,-n/2+e+o/3,a,"outline",{dash:"3,3",opacity:.5}),O(-n/2+e+o*2/3,s,-n/2+e+o*2/3,a,"outline",{dash:"3,3",opacity:.5})]}function pr(n,t,e){const r=Math.min(n*.05,t*.04,.08),i=Math.min(t*.03,.05),o=t*.18,s=(n-r*(e+1))/e,a=-t/2+i+r,c=Math.min(t/2,a+o+r),h=[H(n,t,.06),O(-n/2,-t/2+i,n/2,-t/2+i,"highlight",{strokeWidth:2.5})];for(let l=0;l<e;l++)h.push(N(-n/2+r+l*(s+r),a,s,o,"soft",Math.min(s,o)*.2));return h.push(re([["M",-n/2+r/2,c],["Q",0,c+t*.04,n/2-r/2,c]],"outline",{strokeWidth:1.8})),h}const js=[{type:"sofa_3p",name:"Canapé 3 places",category:"seating",width:2.2,length:.95,icon:"🛋️",strokeWidth:1.6,shapes:(n,t)=>dr(n,t,3,.1)},{type:"sofa_2p",name:"Canapé 2 places",category:"seating",width:1.6,length:.9,icon:"🛋️",strokeWidth:1.6,shapes:(n,t)=>dr(n,t,2,.12)},{type:"divan",name:"Divan / Méridienne (Tête Gauche)",category:"seating",width:1.8,length:.85,icon:"🛋️",strokeWidth:1.6,shapes:(n,t)=>fr(n,t)},{type:"divan_right",name:"Divan / Méridienne (Tête Droite)",category:"seating",width:1.8,length:.85,icon:"🛋️",strokeWidth:1.6,shapes:(n,t)=>Fs(fr(n,t))},{type:"armchair",name:"Fauteuil club",category:"seating",width:.85,length:.85,icon:"🪑",shapes:(n,t)=>{const e=vt(n*.18,.08,n*.3),r=vt(t*.28,.1,t*.45),i=Math.min(.04,n*.04,t*.04);return[H(n,t),N(-n/2+e,-t/2,n-e*2,r,"accent",r*.2),N(-n/2,-t/2,e,t,"accent",e*.3),N(n/2-e,-t/2,e,t,"accent",e*.3),N(-n/2+e+i/2,-t/2+r+i/2,n-e*2-i,t-r-i,"body",Math.min(n,t)*.06)]}},{type:"coffee_table",name:"Table basse",category:"seating",width:1.1,length:.6,icon:"☕",shapes:(n,t)=>{const e=Math.min(n,t)*.12;return[H(n,t,.12),O(-n/2+e,-t/2+e,n/2-e,t/2-e,"outline",{dash:"3,3",opacity:.4}),O(n/2-e,-t/2+e,-n/2+e,t/2-e,"outline",{dash:"3,3",opacity:.4})]}},{type:"bed_double",name:"Lit double (Queen)",category:"bed",width:1.6,length:2,icon:"🛏️",strokeWidth:1.6,shapes:(n,t)=>pr(n,t,2)},{type:"bed_single",name:"Lit simple",category:"bed",width:.9,length:1.9,icon:"🛏️",shapes:(n,t)=>pr(n,t,1)},{type:"nightstand",name:"Table de chevet",category:"bed",width:.45,length:.4,icon:"🕰️",strokeWidth:1.4,shapes:(n,t)=>{const e=Math.min(n,t)*.1,r=Math.min(n,t)*.05;return[H(n,t),O(-n/2+e,0,n/2-e,0,"outline",{strokeWidth:1.2}),U(0,-t/4,r,r,"knob"),U(0,t/4,r,r,"knob")]}},{type:"wardrobe",name:"Armoire dressing",category:"storage",width:1.8,length:.6,icon:"🚪",shapes:(n,t)=>{const e=Math.min(n,t)*.1;return[H(n,t,.05),O(-n/2+n/3,-t/2,-n/2+n/3,t/2,"outline"),O(-n/2+n*2/3,-t/2,-n/2+n*2/3,t/2,"outline"),O(-n/2+e,0,n/2-e,0,"outline",{dash:"4,3",strokeWidth:1.2,opacity:.6})]}},{type:"dining_table_6",name:"Table repas (6 chaises)",category:"table",width:1.6,length:.9,icon:"🍽️",shapes:(n,t)=>{const e=n*.24,r=Math.min(.18,t*.25),i=n*.04,o=[-n/2+i,-e/2,n/2-e-i],s=Math.min(e,r)*.2;return[H(n,t,.06),...o.map(a=>N(a,-t/2-r,e,r,"body",s)),...o.map(a=>N(a,t/2,e,r,"body",s))]}},{type:"desk",name:"Bureau avec fauteuil",category:"table",width:1.4,length:.7,icon:"💻",shapes:(n,t)=>{const e=Math.min(n*.4,.6),r=Math.min(t*.06,.05),i=Math.min(n*.2,t*.45);return[H(n,t,.05),N(-e/2,-t/2+t*.08,e,r,"highlight",r*.25),re([["M",-i,t/2],["A",i,i,0,1,i,t/2]],"outline",{dash:"3,3"})]}},{type:"chair_starck",name:"Chaise médaillon transparente",legacyNames:["Chaise Starck (Ghost)"],category:"table",width:.54,length:.55,icon:"🪑",shapes:(n,t)=>{const e=Math.min(n,t),r=n*.04,i=-t/2+t*.11;return[N(-n/2+r,i,n-r*2,t-t*.18,"body",e*.11),U(0,i,e*.32,t*.16,"glass",{strokeWidth:1.6}),re([["M",-n/2+r*2,-t/2+t*.18],["Q",-n/2+r*.5,0,-n/2+r*3,t/2-t*.11]],"outline",{strokeWidth:1.4,opacity:.8}),re([["M",n/2-r*2,-t/2+t*.18],["Q",n/2-r*.5,0,n/2-r*3,t/2-t*.11]],"outline",{strokeWidth:1.4,opacity:.8}),U(0,t*.08,e*.21,e*.21,"outline",{dash:"2,2",opacity:.4})]}},{type:"console",name:"Console murale",category:"table",width:1.2,length:.35,icon:"🗄️",shapes:(n,t)=>{const e=Math.min(n,t)*.08,r=(n-e*3)/2,i=Math.min(n,t)*.05;return[H(n,t,.08),N(-n/2+e,-t/2+e,r,t-e*2,"accent",e*.6),N(e/2,-t/2+e,r,t-e*2,"accent",e*.6),U(-n/4,0,i,i,"brass"),U(n/4,0,i,i,"brass")]}},{type:"toilet",name:"WC / Toilettes",category:"bathroom",width:.45,length:.65,icon:"🚽",shapes:(n,t)=>{const e=t*.28,r=n*.04,i=Math.max(0,n/2-r),o=-t/2+e,s=Math.max(o,t/2-i);return[N(-n/2,-t/2,n,e,"accent",Math.min(n,e)*.15),re([["M",-n/2+r,o],["L",n/2-r,o],["L",n/2-r,s],["A",i,i,0,1,-n/2+r,s],["Z"]],"body")]}},{type:"shower",name:"Douche italienne",category:"bathroom",width:.9,length:.9,icon:"🚿",shapes:(n,t)=>{const e=Math.min(n,t)*.045,r={strokeWidth:1,dash:"2,2",opacity:.6};return[H(n,t,.03),O(-n/2,-t/2,0,0,"outline",r),O(n/2,-t/2,0,0,"outline",r),O(-n/2,t/2,0,0,"outline",r),O(n/2,t/2,0,0,"outline",r),U(0,0,e,e,"drain")]}},{type:"bathtub",name:"Baignoire droite",category:"bathroom",width:1.7,length:.75,icon:"🛁",strokeWidth:1.6,shapes:(n,t)=>{const e=Math.min(n,t)*.08,r=Math.min(n,t)*.035;return[H(n,t,.07),N(-n/2+e,-t/2+e,n-e*2,t-e*2,"water",(t-e*2)/2),U(-n/2+e+Math.min(n,t)*.15,0,r,r,"knob")]}},{type:"sink_vanity",name:"Meuble vasque",category:"bathroom",width:.9,length:.5,icon:"🧼",shapes:(n,t)=>{const e=t*.65/2,r=Math.min(n,t)*.04;return[H(n,t,.06),U(0,0,n*.65/2,e,"water"),U(0,-e+r*1.2,r,r,"knob")]}},{type:"double_vanity",name:"Meuble double vasque",category:"bathroom",width:1.4,length:.5,icon:"🫧",shapes:(n,t)=>{const e=n*.35,r=t*.65/2,i=Math.min(n,t)*.04,o=-n/4,s=n/4;return[H(n,t,.06),U(o,0,e/2,r,"water"),U(o,-r+i*1.2,i,i,"knob"),U(s,0,e/2,r,"water"),U(s,-r+i*1.2,i,i,"knob")]}},{type:"towel_dryer",name:"Sèche-serviettes",category:"bathroom",width:.55,length:.15,icon:"♨️",shapes:(n,t)=>{const r=t/5;return[H(n,t,.04),...Array.from({length:4},(i,o)=>{const s=-t/2+(o+1)*r;return O(-n/2+.04,s,n/2-.04,s,"heat",{strokeWidth:1.5})})]}},{type:"kitchen_sink",name:"Évier cuisine double",category:"kitchen",width:1,length:.6,icon:"🚰",shapes:(n,t)=>{const e=Math.min(n,t)*.08,r=(n-e*3)/2,i=t-e*2.6;return[H(n,t,.05),N(-n/2+e,-t/2+e*1.6,r,i,"water",Math.min(r,i)*.12),N(e/2,-t/2+e*1.6,r,i,"water",Math.min(r,i)*.12),U(0,-t/2+e*.8,e*.4,e*.4,"brass")]}},{type:"cooktop",name:"Plaque de cuisson",category:"kitchen",width:.6,length:.6,icon:"🍳",shapes:(n,t)=>{const e=Math.min(n,t)*.18,r=Math.min(n,t)*.13;return[H(n,t,.07),U(-n/4,-t/4,e,e,"heat"),U(n/4,-t/4,r,r,"heat"),U(-n/4,t/4,r,r,"heat"),U(n/4,t/4,e,e,"heat")]}},{type:"fridge",name:"Réfrigérateur",category:"kitchen",width:.65,length:.65,icon:"🧊",shapes:(n,t)=>{const e=Math.min(n,t)*.18,r=[90,30,150].map(i=>{const o=e*Math.cos(i*Math.PI/180),s=e*Math.sin(i*Math.PI/180);return O(-o,t*.06-s,o,t*.06+s,"frost",{strokeWidth:1.4})});return[H(n,t,.05),O(-n/2,-t/2+t*.09,n/2,-t/2+t*.09,"outline",{strokeWidth:2}),O(-n/2+n*.12,-t/2+t*.045,-n/2+n*.3,-t/2+t*.045,"frost",{strokeWidth:2}),...r]}},{type:"fridge_us",name:"Réfrigérateur américain",category:"kitchen",width:.95,length:.75,icon:"🧊",shapes:(n,t)=>[H(n,t,.05),O(0,-t/2,0,t/2,"outline",{strokeWidth:1.8}),O(-n/2,-t/2+t*.1,n/2,-t/2+t*.1,"outline",{strokeWidth:1.4}),O(-.04,-t/2+.02,-.04,-t/2+.08,"brass",{strokeWidth:2.2}),O(.04,-t/2+.02,.04,-t/2+.08,"brass",{strokeWidth:2.2})]},{type:"dishwasher",name:"Lave-vaisselle",category:"kitchen",width:.6,length:.6,icon:"🍽️",shapes:(n,t)=>{const e=Math.min(n,t)*.04;return[H(n,t,.05),O(-n/2,-t/2+t*.15,n/2,-t/2+t*.15,"outline",{strokeWidth:1.5}),U(-n/4,-t/2+t*.075,e,e,"knob"),O(-n*.1,-t/2+t*.075,n*.3,-t/2+t*.075,"outline",{strokeWidth:1.5}),N(-n/2+.06,-t/2+t*.22,n-.12,t*.65,"outline",.03,{strokeWidth:1,dash:"3,3",opacity:.6})]}},{type:"washing_machine",name:"Lave-linge",category:"kitchen",width:.6,length:.6,icon:"🧺",shapes:(n,t)=>{const e=Math.min(n,t)*.32,r=Math.min(n,t)*.035;return[H(n,t,.05),O(-n/2,-t/2+t*.15,n/2,-t/2+t*.15,"outline",{strokeWidth:1.5}),U(-n/4,-t/2+t*.075,r,r,"knob"),U(n/4,-t/2+t*.075,r*1.5,r*1.5,"knob"),U(0,t*.08,e,e,"glass",{strokeWidth:2}),U(0,t*.08,e*.5,e*.5,"water",{strokeWidth:1.2})]}},{type:"mirror",name:"Miroir mural",category:"other",width:.8,length:.12,icon:"🪞",shapes:(n,t)=>[H(n,t,.04),N(-n/2+.02,-t/2+.02,n-.04,t-.04,"glass",.02),O(-n/3,-t/4,-n/6,t/4,"highlight",{strokeWidth:1.2,opacity:.8})]},{type:"wall_art",name:"Tableau / Poster",category:"other",width:.9,length:.1,icon:"🖼️",shapes:(n,t)=>[H(n,t,.04),N(-n/2+.02,-t/2+.02,n-.04,t-.04,"accent",.01),O(-n/2+.04,0,n/2-.04,0,"highlight",{strokeWidth:1.2})]}],Di=js.map(n=>({...n,renderSvg:(t,e,r)=>Gs(n,t,e,r)})),Hh=Ti.filter(n=>Di.some(t=>t.category===n));function et(n){return Di.find(t=>t.type===n)}function zs(n){return et(n)?A(`geometry.furniture.${n}`):n}function Ai(n,t){return t===n.name||(n.legacyNames?.includes(t)??!1)||Ss(`geometry.furniture.${n.type}`).includes(t)}function Ws(n){const t=et(n.type);return t?!n.name||Ai(t,n.name)?zs(t.type):n.name:n.name||n.type}function Us(n){const t=et(n.type);return t?!n.name||Ai(t,n.name)?t.name:n.name:n.name||n.type}function Ci(n,t,e){const r=fe,i=t?r.selected:r.stroke;switch(n){case"body":return{fill:e,stroke:i};case"accent":return{fill:r.accent,stroke:i};case"soft":return{fill:r.soft,stroke:i};case"water":return{fill:r.water,stroke:i};case"heat":return{fill:r.heat,stroke:i};case"glass":return{fill:r.glass,stroke:i};case"outline":return{fill:null,stroke:i};case"highlight":return t?{fill:r.selected,stroke:r.selected}:{fill:r.highlight,stroke:r.highlight};case"frost":return{fill:null,stroke:r.frost};case"knob":return{fill:i,stroke:null};case"brass":return{fill:t?r.selected:r.brass,stroke:null};case"drain":return{fill:t?r.selected:r.drain,stroke:null}}}function hn(n){return n?n.value:"none"}function un(n){return n?n.token?`var(--arch-furniture-${n.token}, ${n.value})`:n.value:"none"}function mr(n){return n&&Os.test(n)&&!Ns.test(n)?n:void 0}function Hs(n,t,e){if(n)return fe["selected-fill"];const r=mr(t)??mr(e);return r?{value:r}:fe.fill}function dn(n){return typeof n=="number"&&Number.isFinite(n)&&n>0?n:void 0}function Ri(n,t){return{w:dn(n.width)??t?.width??1,l:dn(n.length)??t?.length??1}}function Li(n,t,e,r,i,o,s){const a=Hs(i,o,n?.defaultColor),h={shapes:n!==void 0&&Math.min(t,e)*r>=hr?n.shapes(t,e):[H(t,e,.06)],strokeWidth:n?.strokeWidth??Rs,bodyFill:a,selected:i};return!n&&Math.min(t,e)*r>=hr&&(h.icon={text:s||Ls,size:vt(Math.min(t,e)*r*.5,8,16)}),h}function Oi(n,t){const e=et(n.type),{w:r,l:i}=Ri(n,e),o=dn(t.pixelsPerMeter)??1;return{sym:Li(e,r,i,o,t.selected===!0,n.color,n.icon),k:o}}function T(n){const t=Math.round(n*100)/100;return t===0?0:t}function Ni(n,t){return n.map(e=>{switch(e[0]){case"M":case"L":return`${e[0]} ${T(e[1]*t)} ${T(e[2]*t)}`;case"Q":return`Q ${T(e[1]*t)} ${T(e[2]*t)} ${T(e[3]*t)} ${T(e[4]*t)}`;case"A":return`A ${T(e[1]*t)} ${T(e[2]*t)} 0 ${e[3]} ${e[4]} ${T(e[5]*t)} ${T(e[6]*t)}`;default:return"Z"}}).join(" ")}function Ys(n,t){switch(n.kind){case"rect":return[["x",T(n.x*t)],["y",T(n.y*t)],["width",T(n.w*t)],["height",T(n.h*t)],["rx",T((n.r??0)*t)]];case"ellipse":return[["cx",T(n.cx*t)],["cy",T(n.cy*t)],["rx",T(n.rx*t)],["ry",T(n.ry*t)]];case"line":return[["x1",T(n.x1*t)],["y1",T(n.y1*t)],["x2",T(n.x2*t)],["y2",T(n.y2*t)]];case"path":return[["d",Ni(n.d,t)]]}}function Bs(n,t){const e=Ci(n.paint,t.selected,t.bodyFill),r=[["fill",hn(e.fill)],["stroke",hn(e.stroke)]];return e.stroke&&r.push(["stroke-width",n.strokeWidth??t.strokeWidth]),e.stroke&&n.dash&&r.push(["stroke-dasharray",n.dash]),n.opacity!==void 0&&r.push(["opacity",n.opacity]),r}function qs(n,t,e){const r=Ci(n.paint,e.selected,e.bodyFill),i=`fill: ${un(r.fill)}; stroke: ${un(r.stroke)}`,o=r.stroke?n.strokeWidth??e.strokeWidth:$,s=r.stroke&&n.dash?n.dash:$,a=n.opacity??$;switch(n.kind){case"rect":return w`<rect x=${T(n.x*t)} y=${T(n.y*t)} width=${T(n.w*t)} height=${T(n.h*t)} rx=${T((n.r??0)*t)}
        style=${i} stroke-width=${o} stroke-dasharray=${s} opacity=${a} />`;case"ellipse":return w`<ellipse cx=${T(n.cx*t)} cy=${T(n.cy*t)} rx=${T(n.rx*t)} ry=${T(n.ry*t)}
        style=${i} stroke-width=${o} stroke-dasharray=${s} opacity=${a} />`;case"line":return w`<line x1=${T(n.x1*t)} y1=${T(n.y1*t)} x2=${T(n.x2*t)} y2=${T(n.y2*t)}
        style=${i} stroke-width=${o} stroke-dasharray=${s} opacity=${a} />`;case"path":return w`<path d=${Ni(n.d,t)}
        style=${i} stroke-width=${o} stroke-dasharray=${s} opacity=${a} />`}}function Xs(n,t){const{sym:e,k:r}=Oi(n,t);return Fi(e,r)}function Fi(n,t){return w`
    <g class="furniture-symbol">
      ${n.shapes.map(e=>qs(e,t,n))}
      ${n.icon?w`<text x="0" y=${T(n.icon.size*.35)} text-anchor="middle" font-size=${T(n.icon.size)}
        style=${`fill: ${un(fe.highlight)}; stroke: none`}>${n.icon.text}</text>`:$}
    </g>
  `}function Gs(n,t,e,r){const i=t>0?t/n.width:1;return Fi(Li(n,Math.max(0,t)/i,Math.max(0,e)/i,i,r),i)}function gr(n){return n.replace(/[<>&'"]/g,t=>({"<":"&lt;",">":"&gt;","&":"&amp;","'":"&apos;",'"':"&quot;"})[t])}function Vs(n,t){const{sym:e,k:r}=Oi(n,t),i=s=>s.map(([a,c])=>`${a}="${gr(String(c))}"`).join(" "),o=e.shapes.map(s=>`<${s.kind} ${i([...Ys(s,r),...Bs(s,e)])} />`);return e.icon&&o.push(`<text x="0" y="${T(e.icon.size*.35)}" text-anchor="middle" font-size="${T(e.icon.size)}" fill="${hn(fe.highlight)}" stroke="none">${gr(e.icon.text)}</text>`),`<g class="furniture-symbol">${o.join("")}</g>`}function Ks(n,t,e){let r=-t/2,i=-e/2,o=t/2,s=e/2;const a=(c,h)=>{r=Math.min(r,c),i=Math.min(i,h),o=Math.max(o,c),s=Math.max(s,h)};for(const c of n)switch(c.kind){case"rect":a(c.x,c.y),a(c.x+c.w,c.y+c.h);break;case"ellipse":a(c.cx-c.rx,c.cy-c.ry),a(c.cx+c.rx,c.cy+c.ry);break;case"line":a(c.x1,c.y1),a(c.x2,c.y2);break;case"path":for(const h of c.d)h[0]==="M"||h[0]==="L"?a(h[1],h[2]):h[0]==="Q"?(a(h[1],h[2]),a(h[3],h[4])):h[0]==="A"&&a(h[5],h[6]);break}return{minX:r,minY:i,maxX:o,maxY:s}}function Zs(n){const t=et(n.type),{w:e,l:r}=Ri(n,t),i=Ks(t?t.shapes(e,r):[],e,r),o=(n.rotation??0)%360*Math.PI/180,s=Math.cos(o),a=Math.sin(o);let c=1/0,h=1/0,l=-1/0,u=-1/0;for(const[d,p]of[[i.minX,i.minY],[i.maxX,i.minY],[i.maxX,i.maxY],[i.minX,i.maxY]]){const f=n.position.x+d*s-p*a,m=n.position.y+d*a+p*s;c=Math.min(c,f),h=Math.min(h,m),l=Math.max(l,f),u=Math.max(u,m)}return{minX:c,minY:h,maxX:l,maxY:u}}Oe("fr",{"ui.level.sous-sol":"Sous-Sol","ui.level.sous-sol.full":"Sous-Sol","ui.level.rdc":"RDC","ui.level.rdc.full":"Rez-de-Chaussée","ui.level.etage1":"1er Étage","ui.level.etage1.full":"1er Étage","ui.level.etage2":"2ème Étage","ui.level.etage2.full":"2ème Étage","ui.level.etage3":"3ème Étage","ui.level.etage3.full":"3ème Étage","ui.level.jardin":"Jardin","ui.level.jardin.full":"Jardin","ui.level.autre":"Autre","ui.level.autre.full":"Autre","ui.project.default_name":"Nouveau plan","ui.project.default_room_name":"Pièce","ui.api.size_mib":"{value} Mo","ui.api.conflict":"Le plan a été modifié ailleurs depuis son ouverture.","ui.api.conflict_revision":"Le plan a été modifié ailleurs depuis son ouverture (révision serveur {revision}).","ui.api.unauthorized":"Action réservée aux administrateurs Home Assistant.","ui.api.payload_too_large":"Données trop volumineuses pour le serveur.","ui.api.payload_too_large_size":"Données trop volumineuses pour le serveur ({size}, maximum {limit}).","ui.api.not_connected":"Connexion à Home Assistant indisponible.","ui.api.connection_lost":"La connexion à Home Assistant a été perdue.","ui.api.invalid_project_id":"Identifiant de projet invalide : {id}","ui.api.invalid_asset_id":"Identifiant d'image invalide : {id}","ui.api.not_found":"Ressource introuvable sur le serveur.","ui.api.project_not_found":"Plan introuvable sur le serveur (il a peut-être été supprimé).","ui.api.write_failed":"Le serveur n'a pas pu enregistrer les données.","ui.api.unknown_command":"Commande inconnue du serveur : redémarrez Home Assistant après la mise à jour de Home Architect.","ui.api.file_too_large":"Fichier trop volumineux pour le serveur.","ui.api.unsupported_media_type":"Format d'image non pris en charge.","ui.api.invalid_image":"Image invalide ou corrompue.","ui.api.not_ready":"Home Architect n'est pas encore chargé sur le serveur.","ui.api.http_error":"Erreur HTTP {status}.","ui.api.background_not_uploaded":"L'image de fond doit être téléversée sur le serveur avant la sauvegarde.","ui.api.project_too_large":"Plan trop volumineux ({size}, maximum {limit}).","ui.api.image_too_large":"Image trop volumineuse ({size}, maximum {limit}).","ui.api.svg_too_large":"SVG trop volumineux ({size}, maximum {limit}).","ui.api.invalid_upload_response":"Réponse inattendue du serveur après le téléversement.","ui.api.invalid_publish_response":"Réponse inattendue du serveur après la publication."});Oe("en",{"ui.level.sous-sol":"Basement","ui.level.sous-sol.full":"Basement","ui.level.rdc":"Ground floor","ui.level.rdc.full":"Ground floor","ui.level.etage1":"First floor","ui.level.etage1.full":"First floor","ui.level.etage2":"Second floor","ui.level.etage2.full":"Second floor","ui.level.etage3":"Third floor","ui.level.etage3.full":"Third floor","ui.level.jardin":"Garden","ui.level.jardin.full":"Garden","ui.level.autre":"Other","ui.level.autre.full":"Other","ui.project.default_name":"New plan","ui.project.default_room_name":"Room","ui.api.size_mib":"{value} MB","ui.api.conflict":"The plan has been changed elsewhere since it was opened.","ui.api.conflict_revision":"The plan has been changed elsewhere since it was opened (server revision {revision}).","ui.api.unauthorized":"Only Home Assistant administrators can do this.","ui.api.payload_too_large":"The data is too large for the server.","ui.api.payload_too_large_size":"The data is too large for the server ({size}, maximum {limit}).","ui.api.not_connected":"The connection to Home Assistant is unavailable.","ui.api.connection_lost":"The connection to Home Assistant was lost.","ui.api.invalid_project_id":"Invalid project identifier: {id}","ui.api.invalid_asset_id":"Invalid image identifier: {id}","ui.api.not_found":"Resource not found on the server.","ui.api.project_not_found":"Plan not found on the server (it may have been deleted).","ui.api.write_failed":"The server could not save the data.","ui.api.unknown_command":"Unknown server command: restart Home Assistant after updating Home Architect.","ui.api.file_too_large":"The file is too large for the server.","ui.api.unsupported_media_type":"Unsupported image format.","ui.api.invalid_image":"The image is invalid or corrupted.","ui.api.not_ready":"Home Architect is not loaded on the server yet.","ui.api.http_error":"HTTP error {status}.","ui.api.background_not_uploaded":"The background image must be uploaded to the server before saving.","ui.api.project_too_large":"The plan is too large ({size}, maximum {limit}).","ui.api.image_too_large":"The image is too large ({size}, maximum {limit}).","ui.api.svg_too_large":"The SVG is too large ({size}, maximum {limit}).","ui.api.invalid_upload_response":"Unexpected server response after the upload.","ui.api.invalid_publish_response":"Unexpected server response after publishing."});function Et(n,t,e,r){return Object.freeze({id:n,order:t,icon:e,floor:r,get label(){return A(`ui.level.${n}`)},get fullLabel(){return A(`ui.level.${n}.full`)}})}const Mn=Object.freeze([Et("sous-sol",0,"🏠",-1),Et("rdc",1,"🏠",0),Et("etage1",2,"🏠",1),Et("etage2",3,"🏠",2),Et("etage3",4,"🏠",3),Et("jardin",5,"🌳",null)]),Yh="rdc",ji="autre",Js=Et(ji,Mn.length,"📁",null);function Ne(n){return n?Mn.find(t=>t.id===n):void 0}function Qs(n){return Ne(n)!==void 0}function Bh(n){const t=Ne(n);return t?t.label:!n||n===ji?Js.label:n}function qh(n){const t=Ne(n);if(!t||t.floor===null)return null;const e=Mn.find(r=>r.floor===t.floor-1);return e?e.id:null}const be=2*1024*1024,ve=3.5*1024*1024,yr=256*1024,Xt=/^[a-zA-Z0-9_-]{1,64}$/,Fe=/^[A-Za-z0-9_-]{1,64}-[A-Za-z0-9]{6,64}\.[A-Za-z0-9]{2,5}$/,xr="abcdefghijklmnopqrstuvwxyz0123456789",tt=/^[a-z0-9_]+\.[a-z0-9_]+$/i,ta=/^(?:https?:\/\/|\/)[^\s\x00-\x1f\x7f]*$/i,ea=2048,na=/^data:image\//i,ra=/^image\/[a-z0-9.+-]+$/i,ia=/^(?:\/(?!\/)|#)[^\s\x00-\x1f\x7f\\]*$/,oa=/^[#a-zA-Z0-9(),.%\s+-]{1,64}$/,sa=/url\s*\(|expression|image-set/i,aa=/^[a-z0-9_-]{1,32}:[a-z0-9_-]{1,64}$/i,ca=64,zi=200,Wi=64,Ui=50,Hi=5,Yi=2e3,la=.2,ha=.02,ua=1.5,Bi=.5,da=.01,fa=2,pa=.9,ma=.4,je=50,fn=100;function V(n){return typeof n=="object"&&n!==null&&!Array.isArray(n)}function ft(n){return Array.isArray(n)?n:[]}function Y(n){if(typeof n=="number")return Number.isFinite(n)?n:void 0;if(typeof n=="string"&&n.trim()!==""){const t=Number(n);return Number.isFinite(t)?t:void 0}}function K(n,t,e){return Math.min(e,Math.max(t,n))}function Z(n,t){const e=Y(n);return e===void 0?t:e}function Ut(n,t){const e=Y(n);return e!==void 0&&e>0?Math.min(e,t):void 0}function ga(n){return typeof n=="number"&&Number.isInteger(n)&&n>=0?n:void 0}function F(n){if(typeof n!="string")return;const t=n.trim();return t===""?void 0:t}function Tt(n,t){const e=F(n);return e===void 0?void 0:e.length>t?e.slice(0,t).trim():e}function ze(n){const t=F(n);return t&&oa.test(t)&&!sa.test(t)?t:void 0}function kn(n){const t=F(n);return t&&t.length<=ca?t:void 0}function qi(n){return typeof n=="string"?n.trim()===""?"":n:typeof n=="number"&&Number.isFinite(n)?String(n):""}function it(n){if(!V(n))return null;const t=Y(n.x),e=Y(n.y);return t===void 0||e===void 0?null:{x:t,y:e}}function wt(n,t){return typeof n=="string"&&t.includes(n)?n:void 0}function Xi(n){const t=(n%360+360)%360;return t===0?0:t}function Gt(n,t,e){let r=qi(n);for(;r===""||e.has(r);)r=Ht(t);return e.add(r),r}function Gi(n){const t=typeof crypto<"u"&&typeof crypto.getRandomValues=="function";let e="";for(;e.length<n;){const r=new Uint8Array(n*2);if(t)crypto.getRandomValues(r);else for(let i=0;i<r.length;i++)r[i]=Math.floor(Math.random()*256);for(const i of r)if(!(i>=252)&&(e+=xr[i%xr.length],e.length===n))break}return e}function Vi(){return`plan_${Gi(8)}`}function Ht(n){return`${n}_${Gi(10)}`}function ya(){return{size:Bi,subdivisions:2,snapToGrid:!0,snapToAngles:!0,snapToElements:!0}}function Ki(n){return n&&Qs(n)?n:void 0}function Zi(n){return Ne(n)?.fullLabel??A("ui.project.default_name")}function xa(n={}){const t=new Date().toISOString(),e=Tt(n.category,Wi);return{id:Vi(),name:Tt(n.name,zi)??Zi(e),category:e,schema_version:ln,created_at:t,updated_at:t,pixelsPerMeter:K(Z(n.pixelsPerMeter,Ui),Hi,Yi),grid:ya(),walls:[],openings:[],rooms:[],bindings:[],furniture:[]}}function ba(n){const t=V(n)?n:{},e=Y(t.subdivisions);return{size:K(Z(t.size,Bi),da,fa),subdivisions:e===void 0?2:K(Math.round(e),1,20),snapToGrid:typeof t.snapToGrid=="boolean"?t.snapToGrid:!0,snapToAngles:typeof t.snapToAngles=="boolean"?t.snapToAngles:!0,snapToElements:typeof t.snapToElements=="boolean"?t.snapToElements:!0}}function va(n){return typeof n!="string"?"":na.test(n)||n.length<=ea&&ta.test(n)?n:""}function wa(n){if(!V(n))return;const t=va(n.imageUrl),e=typeof n.assetId=="string"&&Fe.test(n.assetId)?n.assetId:void 0;if(!t&&!e)return;const r=Y(n.scale),i={imageUrl:t,opacity:K(Z(n.opacity,ma),0,1),visible:n.visible!==!1,offset:it(n.offset)??{x:0,y:0},scale:r!==void 0&&r>0?r:1,rotation:Z(n.rotation,0)};e&&(i.assetId=e),typeof n.mimeType=="string"&&ra.test(n.mimeType)&&(i.mimeType=n.mimeType);const o=Ut(n.widthPx,Number.MAX_SAFE_INTEGER),s=Ut(n.heightPx,Number.MAX_SAFE_INTEGER);return o!==void 0&&(i.widthPx=o),s!==void 0&&(i.heightPx=s),i}function $a(n){const t=new Set,e=[];for(const r of ft(n)){if(!V(r))continue;const i=it(r.start),o=it(r.end);if(!i||!o||Math.hypot(o.x-i.x,o.y-i.y)<1e-6)continue;const s={id:Gt(r.id,"wall",t),start:i,end:o,thickness:K(Z(r.thickness,la),ha,ua),type:wt(r.type,Ps)??"standard"},a=Ut(r.height,je),c=wt(r.texture,Ts),h=ze(r.color);a!==void 0&&(s.height=a),c&&(s.texture=c),h&&(s.color=h),e.push(s)}return e}function _a(n,t){const e=new Map(t.map(o=>[o.id,Math.hypot(o.end.x-o.start.x,o.end.y-o.start.y)])),r=new Set,i=[];for(const o of ft(n)){if(!V(o))continue;const s=qi(o.wallId),a=e.get(s);if(a===void 0)continue;const c={id:Gt(o.id,"op",r),wallId:s,type:wt(o.type,Is)??"door",offset:K(Z(o.offset,a/2),0,a),width:K(Z(o.width,pa),.05,fn),flipSide:o.flipSide===!0,flipDirection:o.flipDirection===!0},h=Ut(o.height,je);h!==void 0&&(c.height=h),(o.sashCount===1||o.sashCount===2)&&(c.sashCount=o.sashCount);const l=F(o.entityId);l&&tt.test(l)&&(c.entityId=l),i.push(c)}return i}function Ma(n){const t=new Set,e=[];for(const r of ft(n)){if(!V(r))continue;const i=ft(r.polygon).map(it).filter(d=>d!==null);if(i.length<3)continue;const o=Y(r.areaM2),s={id:Gt(r.id,"room",t),name:typeof r.name=="string"?r.name:A("ui.project.default_room_name"),polygon:i,areaM2:o!==void 0&&o>=0?o:G.computeArea(i)},a=F(r.area_id),c=ze(r.color),h=wt(r.texture,Ds),l=kn(r.icon),u=Ut(r.height,je);a&&(s.area_id=a),c&&(s.color=c),h&&h!=="none"&&(s.texture=h),l&&(s.icon=l),u!==void 0&&(s.height=u),e.push(s)}return e}function ka(n){if(!V(n))return;const t=[];for(const u of ft(n.targets).slice(0,6)){if(!V(u))continue;const d=F(u.xEntityId),p=F(u.yEntityId);if(!d||!tt.test(d)||!p||!tt.test(p))continue;const f={xEntityId:d,yEntityId:p},m=Tt(u.label,64),g=F(u.distanceEntityId),x=F(u.resolutionEntityId),y=ze(u.color);m&&(f.label=m),g&&tt.test(g)&&(f.distanceEntityId=g),x&&tt.test(x)&&(f.resolutionEntityId=x),y&&(f.color=y),t.push(f)}const e=new Set,r=[];for(const u of ft(n.calibrationPoints).slice(0,32)){if(!V(u))continue;const d=it(u.radarMm),p=it(u.planMeters);if(!d||!p)continue;const f=Gt(u.id,"corner",e),m=Tt(u.label,64)??`Coin ${r.length+1}`;r.push({id:f,label:m,radarMm:d,planMeters:p})}let i;if(V(n.affineMatrix)){const u=Y(n.affineMatrix.a),d=Y(n.affineMatrix.b),p=Y(n.affineMatrix.tx),f=Y(n.affineMatrix.c),m=Y(n.affineMatrix.d),g=Y(n.affineMatrix.ty);u!==void 0&&d!==void 0&&p!==void 0&&f!==void 0&&m!==void 0&&g!==void 0&&(i={a:u,b:d,tx:p,c:f,d:m,ty:g})}const o=[];for(const u of ft(n.zones).slice(0,3)){if(!V(u))continue;const d=Y(u.index);if(d!==1&&d!==2&&d!==3)continue;const p=it(u.p1),f=it(u.p2);if(!p||!f)continue;const m={index:d,enabled:u.enabled!==!1,p1:p,p2:f},g=Tt(u.name,64),x=F(u.x1EntityId),y=F(u.y1EntityId),b=F(u.x2EntityId),k=F(u.y2EntityId);g&&(m.name=g),x&&tt.test(x)&&(m.x1EntityId=x),y&&tt.test(y)&&(m.y1EntityId=y),b&&tt.test(b)&&(m.x2EntityId=b),k&&tt.test(k)&&(m.y2EntityId=k),o.push(m)}const s={enabled:n.enabled!==!1,orientationDeg:Xi(Z(n.orientationDeg,180)),heightMeters:K(Z(n.heightMeters,1.2),.05,10),fovDeg:K(Z(n.fovDeg,120),10,360),maxRangeMeters:K(Z(n.maxRangeMeters,6),.5,30),showCone:n.showCone!==!1,targets:t,calibrationPoints:r},a=Y(n.tiltDeg);a!==void 0&&(s.tiltDeg=K(a,-85,85)),n.invertX===!0&&(s.invertX=!0),typeof n.smoothing=="boolean"&&(s.smoothing=n.smoothing);const c=wt(n.coordinateUnit,["mm","m","cm","auto"]);c&&(s.coordinateUnit=c);const h=F(n.thresholdEntityId);h&&tt.test(h)&&(s.thresholdEntityId=h);const l=Y(n.defaultThresholdMm);return l!==void 0&&l>0&&(s.defaultThresholdMm=K(l,10,5e3)),i&&(s.affineMatrix=i),o.length>0&&(s.zones=o),s}function Ea(n,t){const e=new Set,r=[];for(const i of ft(n)){if(!V(i))continue;const o=F(i.entityId);if(!o||!tt.test(o))continue;const s=it(i.position);if(!s)continue;const a={id:Gt(i.id,"bind",e),entityId:o,position:s},c=F(i.roomId),h=kn(i.icon),l=F(i.mdiIcon),u=l&&aa.test(l)?l:void 0,d=F(i.customName),p=F(i.navigationPath),f=p&&ia.test(p)?p:void 0,m=b=>{const k=wt(b,As);return k==="navigate"&&!f?void 0:k},g=m(i.tapAction),x=m(i.holdAction),y=ka(i.radarConfig);c&&(a.roomId=c),h&&(a.icon=h),u&&(a.mdiIcon=u),d&&(a.customName=d),g&&!(t&&g==="toggle")&&(a.tapAction=g),x&&(a.holdAction=x),f&&(a.navigationPath=f),y&&(a.radarConfig=y),r.push(a)}return r}function Sa(n){const t=new Set,e=[];for(const r of ft(n)){if(!V(r))continue;const i=F(r.type),o=it(r.position);if(!i||!o)continue;const s=et(i),a=Y(r.width),c=Y(r.length),h={id:Gt(r.id,"furn",t),type:i,name:typeof r.name=="string"?Us({type:i,name:r.name}):s?.name??i,category:wt(r.category,Pi)??s?.category??"other",position:o,width:a!==void 0&&a>0?Math.min(a,fn):s?.width??1,length:c!==void 0&&c>0?Math.min(c,fn):s?.length??1,rotation:Xi(Z(r.rotation,0))},l=F(r.roomId),u=ze(r.color),d=wt(r.material,Cs),p=kn(r.icon);l&&(h.roomId=l),u&&(h.color=u),d&&d!=="default"&&(h.material=d),p&&(h.icon=p),e.push(h)}return e}function Pa(n){if(!V(n))return;const t=Y(n.minX),e=Y(n.minY),r=Y(n.maxX),i=Y(n.maxY);if(!(t===void 0||e===void 0||r===void 0||i===void 0)&&!(r<=t||i<=e))return{minX:t,minY:e,maxX:r,maxY:i}}function En(n){if(!V(n))return;const{url:t,path:e,hash:r,published_at:i}=n;if(typeof t!="string"||typeof e!="string"||typeof r!="string"||typeof i!="string"||!t.startsWith("/")||t.startsWith("//")||!e.startsWith("/")||e.startsWith("//"))return;const o={url:t,path:e,hash:r,published_at:i,include_background:n.include_background===!0};return typeof n.legacy_path=="string"&&n.legacy_path.startsWith("/local/")&&(o.legacy_path=n.legacy_path),o}function Ta(n){const t=V(n)?n:{},e=new Date().toISOString(),r=typeof t.id=="string"&&Xt.test(t.id)?t.id:Vi(),i=Tt(t.category,Wi)??Ki(r),o=Y(t.schema_version),s=o===void 0||o<ln,a=$a(t.walls),c={id:r,name:Tt(t.name,zi)??Zi(i),category:i,schema_version:ln,created_at:F(t.created_at)??e,updated_at:F(t.updated_at)??F(t.created_at)??e,pixelsPerMeter:K(Z(t.pixelsPerMeter,Ui),Hi,Yi),grid:ba(t.grid),walls:a,openings:_a(t.openings,a),rooms:Ma(t.rooms),bindings:Ea(t.bindings,s),furniture:Sa(t.furniture)};i===void 0&&delete c.category;const h=ga(t.revision);h!==void 0&&(c.revision=h);const l=Ut(t.defaultCeilingHeight,je);l!==void 0&&(c.defaultCeilingHeight=l);const u=wa(t.background);u&&(c.background=u),typeof t.showDimensions=="boolean"&&(c.showDimensions=t.showDimensions),typeof t.showThermalHeatmap=="boolean"&&(c.showThermalHeatmap=t.showThermalHeatmap),typeof t.showGhostLevel=="boolean"&&(c.showGhostLevel=t.showGhostLevel);const d=F(t.ghostLevelId);d&&(c.ghostLevelId=d);const p=Y(t.northAngle);p!==void 0&&(c.northAngle=(p%360+360)%360),typeof t.showCompass=="boolean"&&(c.showCompass=t.showCompass);const f=Pa(t.exportFrame);f&&(c.exportFrame=f);const m=En(t.publish);return m&&(c.publish=m),c}function Sn(n){try{return Ta(n)}catch(t){return console.warn("[home-architect] Projet illisible, remplacé par un plan vide :",t),xa()}}function Ia(n){const t={};for(const[e,r]of Object.entries(n))e==="publish"||e.startsWith("_")||(t[e]=r);return t}function Da(n){const t=JSON.stringify(n);return t===void 0?0:new TextEncoder().encode(t).length}function Xh(n){if(typeof structuredClone=="function")try{return structuredClone(n)}catch{}return JSON.parse(JSON.stringify(n))}function Vt(n){const t=typeof n=="string"?n.indexOf("."):-1;return t>0?n.slice(0,t):""}const Aa=new Set(["light","switch","fan","input_boolean","automation","scene","script","button","input_button"]),Ca={light:{domain:"light",service:"toggle"},switch:{domain:"switch",service:"toggle"},fan:{domain:"fan",service:"toggle"},input_boolean:{domain:"input_boolean",service:"toggle"},automation:{domain:"automation",service:"toggle"},siren:{domain:"siren",service:"toggle"},cover:{domain:"cover",service:"toggle"},valve:{domain:"valve",service:"toggle"},humidifier:{domain:"humidifier",service:"toggle"},media_player:{domain:"media_player",service:"toggle"},climate:{domain:"climate",service:"toggle"},remote:{domain:"remote",service:"toggle"},group:{domain:"homeassistant",service:"toggle"},scene:{domain:"scene",service:"turn_on"},script:{domain:"script",service:"turn_on"},button:{domain:"button",service:"press"},input_button:{domain:"input_button",service:"press"}};function Ra(n){return Aa.has(Vt(n))?"toggle":"more-info"}function La(n){const t=Ca[Vt(n)];return t?{...t}:null}function Ji(n,t){const e=n?.[t]?.attributes?.friendly_name;return typeof e=="string"&&e.trim()!==""?e:void 0}function Qi(n,t){return F(n.customName)??Ji(t,n.entityId)??n.entityId}function Gh(n,t){if(!Array.isArray(n?.bindings))return n;let e=!1;const r=n.bindings.map(i=>{if(i.customName===void 0||!(i.customName===i.entityId||t!==void 0&&i.customName===Ji(t,i.entityId)))return i;e=!0;const{customName:s,...a}=i;return a});return e?{...n,bindings:r}:n}const Ge="#0f172a",Oa=50,br=2,Na={minX:-1,minY:-1,maxX:11,maxY:7},vr=50,wr=.001,Fa=4,D={roomStroke:.03,wallOutline:.02,cutoutOverlap:.03,jamb:.08,doorLeaf:.04,doorArc:.024,doorDash:.06,windowFrame:.05,windowGlass:.03,windowSash:.02,windowMullion:.05,slidingPanel:.06,labelName:.26,labelArea:.22,labelGap:.12,labelHalo:.05,markerRadius:.32,markerStroke:.03,markerIcon:.26,markerLabel:.2},C={roomFill:"rgba(56, 189, 248, 0.12)",roomStroke:"rgba(56, 189, 248, 0.4)",wallFill:"#334155",wallStroke:"#64748b",jamb:"#94a3b8",frame:"#94a3b8",accent:"#38bdf8",accentFaint:"rgba(56, 189, 248, 0.45)",doorSwing:"rgba(56, 189, 248, 0.08)",labelName:"#f8fafc",markerFill:"rgba(30, 41, 59, 0.85)",markerLabel:"#f1f5f9"},$r="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",ja="ui-monospace, SFMono-Regular, Menlo, monospace",za=/^(?:#[0-9a-f]{3,8}|(?:rgb|rgba|hsl|hsla)\([0-9\s.,%+-]{1,60}\)|[a-z]{3,24})$/i,Wa=/^data:image\/(?:png|jpe?g|webp|gif|svg\+xml)(?:;[a-z0-9=._+-]+)*;base64,[a-z0-9+/=\s]+$/i,Ua=/[\uD800-\uDBFF][\uDC00-\uDFFF]|[\x00-\x08\x0B\x0C\x0E-\x1F\uD800-\uDFFF\uFFFE\uFFFF]/g;function to(n){return n.replace(Ua,t=>t.length===2?t:"")}function mt(n){return to(String(n)).replace(/[<>&'"]/g,t=>{switch(t){case"<":return"&lt;";case">":return"&gt;";case"&":return"&amp;";case"'":return"&apos;";default:return"&quot;"}})}function B(n){if(!Number.isFinite(n))return"0";const t=Math.round(n*100)/100;return String(t===0?0:t)}function _r(n,t){const e=typeof n=="string"?n.trim():"";return e&&za.test(e)?e:t}function Ve(n,t){return n.x*t.y-n.y*t.x}function De(n,t,e){return{x:n.x+t.x*e,y:n.y+t.y*e}}function Mr(n,t,e){const r={x:-t.dir.y,y:t.dir.x},i={x:e.dir.y,y:-e.dir.x},o=Ve(t.dir,e.dir);if(Math.abs(o)<1e-6)return null;const s=De(n,r,t.half),a=De(n,i,e.half),c={x:a.x-s.x,y:a.y-s.y},h=Ve(c,e.dir)/o,l=Ve(c,t.dir)/o;if(h>=t.length||l>=e.length)return null;const u={x:s.x+t.dir.x*h,y:s.y+t.dir.y*h};return Math.hypot(u.x-n.x,u.y-n.y)<=Fa*Math.max(t.half,e.half)?u:null}function Qt(n,t,e){return De(n,{x:-t.dir.y*e,y:t.dir.x*e},t.half)}function Ae(n){const t=[],e=s=>{let a=t.find(c=>Math.hypot(c.point.x-s.x,c.point.y-s.y)<=wr);return a||(a={point:s,ends:[]},t.push(a)),a},r=new Map;for(const s of n){const a=s.end.x-s.start.x,c=s.end.y-s.start.y,h=Math.hypot(a,c);if(!(h>wr)||!Number.isFinite(h))continue;const l=Math.max(0,Number.isFinite(s.thickness)?s.thickness:0)/2,u={x:a/h,y:c/h},d={x:-u.x,y:-u.y},p={dir:u,half:l,length:h,angle:Math.atan2(u.y,u.x)},f={dir:d,half:l,length:h,angle:Math.atan2(d.y,d.x)},m=e(s.start),g=e(s.end);m.ends.push(p),g.ends.push(f),r.set(s.id,{start:p,end:f,startJoint:m.point,endJoint:g.point})}const i=new Map;for(const s of t){const a=[...s.ends].sort((h,l)=>h.angle-l.angle),c=a.length;a.forEach((h,l)=>{if(c<2){i.set(h,{left:Qt(s.point,h,1),right:Qt(s.point,h,-1),joined:!1});return}const u=a[(l+1)%c],d=a[(l-1+c)%c],p=Mr(s.point,h,u),f={left:p??Qt(s.point,h,1),right:Mr(s.point,d,h)??Qt(s.point,h,-1),joined:!0};p||(f.bevel=Qt(s.point,u,-1)),i.set(h,f)})}const o=new Map;for(const[s,a]of r){const c=i.get(a.start),h=i.get(a.end),l=[c.left,h.right];h.joined&&l.push(a.endJoint),h.bevel&&l.push(h.bevel),l.push(h.left,c.right),c.joined&&l.push(a.startJoint),c.bevel&&l.push(c.bevel),Ha(l)<0&&l.reverse(),o.set(s,l)}return o}function Ha(n){let t=0;for(let e=0;e<n.length;e++){const r=n[e],i=n[(e+1)%n.length];t+=r.x*i.y-i.x*r.y}return t/2}function kr(n){return!!n&&[n.minX,n.minY,n.maxX,n.maxY].every(Number.isFinite)&&n.maxX>n.minX&&n.maxY>n.minY}function Er(n,t,e){if(t-n>=e)return[n,t];const i=(n+t)/2;return[i-e/2,i+e/2]}function Sr(n,t){const e=t.end.x-t.start.x,r=t.end.y-t.start.y,i=Math.hypot(e,r);if(!(i>0))return null;const o={x:e/i,y:r/i};return{center:{x:t.start.x+o.x*n.offset,y:t.start.y+o.y*n.offset},dir:o,normal:{x:-o.y,y:o.x},angleDeg:Math.atan2(r,e)*180/Math.PI}}function Ya(n){return n==="door"||n==="double_door"}class Pr{static computeContentFrame(t,e){const r=this.contentBounds(t);if(!r)return{...Na};const i=Math.max(r.maxX-r.minX,r.maxY-r.minY),o=e!==void 0&&Number.isFinite(e)&&e>=0?e:Math.max(.6,i*.05),[s,a]=Er(r.minX-o,r.maxX+o,br),[c,h]=Er(r.minY-o,r.maxY+o,br);return{minX:s,minY:c,maxX:a,maxY:h}}static contentBounds(t){const e=this.collectContentPoints(t);if(e.length===0)return null;let r=1/0,i=1/0,o=-1/0,s=-1/0;for(const a of e)a.x<r&&(r=a.x),a.x>o&&(o=a.x),a.y<i&&(i=a.y),a.y>s&&(s=a.y);return{minX:r,minY:i,maxX:o,maxY:s}}static resolveExportFrame(t,e,r){return kr(e)?{...e}:kr(t.exportFrame)?{...t.exportFrame}:this.computeContentFrame(t,r)}static frameContains(t,e){return e.minX>=t.minX-.001&&e.minY>=t.minY-.001&&e.maxX<=t.maxX+.001&&e.maxY<=t.maxY+.001}static calculateBoundingBox(t,e){const r=this.computeContentFrame(t,e);return{minX:r.minX,minY:r.minY,width:r.maxX-r.minX,height:r.maxY-r.minY,ppm:this.unitsPerMeter(t)}}static worldToPercentage(t,e){const r=(t.x-e.minX)/(e.maxX-e.minX)*100,i=(t.y-e.minY)/(e.maxY-e.minY)*100;return{left:Number.isFinite(r)?Math.round(r*100)/100:0,top:Number.isFinite(i)?Math.round(i*100)/100:0}}static unitsPerMeter(t){const e=t.pixelsPerMeter;return Number.isFinite(e)&&e>0?e:Oa}static embeddableDataUrl(t){return typeof t=="string"&&Wa.test(t)?t:null}static exportToSvg(t,e){const r={includeRooms:!0,includeWalls:!0,includeOpenings:!0,includeFurniture:!0,includeRoomLabels:!0,includeEntityMarkers:!1,includeBackground:!0,backgroundColor:Ge,...e},i=this.unitsPerMeter(t),o=_=>B(_*i),s=this.resolveExportFrame(t,r.frame,r.paddingMeters),a=o(s.minX),c=o(s.minY),h=o(s.maxX-s.minX),l=o(s.maxY-s.minY),u=_r(r.backgroundColor,Ge),d=u==="transparent"?Ge:u,p=t.walls||[],f=t.rooms||[],m=t.openings||[],g=t.furniture||[],x=t.bindings||[];let y="";u!=="transparent"&&(y+=`  <rect id="background" x="${a}" y="${c}" width="${h}" height="${l}" fill="${u}" />
`);const b=t.background,k=r.includeBackground!==!1&&b?.visible?this.embeddableDataUrl(r.backgroundDataUrl)??this.embeddableDataUrl(b.imageUrl):null;if(b&&k){const _=Number.isFinite(b.scale)&&b.scale>0?b.scale:1,v=b.offset||{x:0,y:0},M=Number.isFinite(b.opacity)?Math.min(1,Math.max(0,b.opacity)):.6;y+=`  <image id="background-image" href="${mt(k)}" x="${o(v.x)}" y="${o(v.y)}" width="${B((b.widthPx||1200)*_)}" height="${B((b.heightPx||900)*_)}" opacity="${B(M)}" />
`}if(r.includeRooms&&f.length>0){y+=`  <g id="rooms" stroke="${C.roomStroke}" stroke-width="${o(D.roomStroke)}">
`;for(const _ of f){if(!_.polygon||_.polygon.length<3)continue;const v=_.polygon.map(M=>`${o(M.x)},${o(M.y)}`).join(" ");y+=`    <polygon points="${v}" fill="${_r(_.color,C.roomFill)}" />
`}y+=`  </g>
`}if(r.includeFurniture!==!1&&g.length>0){const _=String(Math.round(i/vr*1e4)/1e4);y+=`  <g id="furniture">
`;for(const v of g){if(!v.position)continue;const M=Number.isFinite(v.rotation)?v.rotation:0,P=to(Vs(v,{pixelsPerMeter:vr}));y+=`    <g transform="translate(${o(v.position.x)}, ${o(v.position.y)}) rotate(${B(M)}) scale(${_})">${P}</g>
`}y+=`  </g>
`}if(r.includeWalls&&p.length>0){const v=[...Ae(p).values()].map(M=>`M${M.map(P=>`${o(P.x)} ${o(P.y)}`).join(" L")} Z`).join(" ");v&&(y+=`  <g id="walls">
`,y+=`    <path d="${v}" fill="${C.wallStroke}" stroke="${C.wallStroke}" stroke-width="${o(D.wallOutline*2)}" stroke-linejoin="round" />
`,y+=`    <path d="${v}" fill="${C.wallFill}" />
`,y+=`  </g>
`)}if(r.includeOpenings&&m.length>0){y+=`  <g id="openings">
`;for(const _ of m){const v=p.find(P=>P.id===_.wallId);if(!v)continue;const M=Sr(_,v);M&&(y+=`    <g transform="translate(${o(M.center.x)}, ${o(M.center.y)}) rotate(${B(M.angleDeg)})">
`,y+=this.renderOpening(_,v,i,d),y+=`    </g>
`)}y+=`  </g>
`}if(r.includeRoomLabels&&f.length>0){y+=`  <g id="room-labels" text-anchor="middle" stroke="${d}" stroke-width="${o(D.labelHalo)}" stroke-linejoin="round" paint-order="stroke">
`;for(const _ of f){if(!_.polygon||_.polygon.length<3)continue;const v=G.labelPoint(_.polygon),M=Number.isFinite(_.areaM2)?_.areaM2:G.computeArea(_.polygon),P=`${ki(M,{minimumFractionDigits:1,maximumFractionDigits:1})} m²`;y+=`    <g transform="translate(${o(v.x)}, ${o(v.y)})">
`,y+=`      <text y="${o(-.12/2)}" fill="${C.labelName}" font-size="${o(D.labelName)}" font-weight="700">${mt(_.name||"")}</text>
`,y+=`      <text y="${o(D.labelGap/2+D.labelArea)}" fill="${C.accent}" font-size="${o(D.labelArea)}" font-weight="600" font-family="${ja}">${mt(P)}</text>
`,y+=`    </g>
`}y+=`  </g>
`}if(r.includeEntityMarkers&&x.length>0){y+=`  <g id="entity-markers" text-anchor="middle">
`;for(const _ of x){if(!_.position)continue;const v=Qi(_,r.states);y+=`    <g transform="translate(${o(_.position.x)}, ${o(_.position.y)})">
`,y+=`      <circle r="${o(D.markerRadius)}" fill="${C.markerFill}" stroke="${C.accent}" stroke-width="${o(D.markerStroke)}" />
`,y+=`      <text y="${o(D.markerIcon*.35)}" font-size="${o(D.markerIcon)}">${mt(_.icon||"⚡")}</text>
`,y+=`      <text y="${o(D.markerRadius+D.markerLabel*1.1)}" fill="${C.markerLabel}" font-size="${o(D.markerLabel)}" font-weight="600">${mt(v)}</text>
`,y+=`    </g>
`}y+=`  </g>
`}if(t.showCompass!==!1&&typeof t.northAngle=="number"){const _=(t.northAngle%360+360)%360,v=Math.max(16,(s.maxX-s.minX)*i*.035),M=v*1.4,P=s.maxX*i-M,W=s.minY*i+M;y+=`  <g id="compass-rose" transform="translate(${B(P)}, ${B(W)})" pointer-events="none">
`,y+=`    <circle r="${B(v)}" fill="${d}" stroke="${C.accent}" stroke-width="1.5" stroke-dasharray="3,3" opacity="0.85" />
`,y+=`    <circle r="${B(v*.88)}" fill="none" stroke="${C.frame}" stroke-width="0.75" opacity="0.5" />
`,y+=`    <g transform="rotate(${B(_)})">
`,y+=`      <polygon points="0,${B(-v*.82)} ${B(v*.22)},0 0,0" fill="#ef4444" />
`,y+=`      <polygon points="0,${B(-v*.82)} ${B(-v*.22)},0 0,0" fill="#b91c1c" />
`,y+=`      <polygon points="0,${B(v*.82)} ${B(v*.22)},0 0,0" fill="#94a3b8" />
`,y+=`      <polygon points="0,${B(v*.82)} ${B(-v*.22)},0 0,0" fill="#64748b" />
`,y+=`      <circle r="${B(v*.12)}" fill="#ffffff" stroke="${C.wallStroke}" stroke-width="1" />
`,y+=`      <text y="${B(-v*.88)}" text-anchor="middle" fill="#ef4444" font-size="${B(v*.42)}" font-weight="800" font-family="${mt($r)}">N</text>
`,y+=`    </g>
`,y+=`  </g>
`}return`<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="${a} ${c} ${h} ${l}" width="${h}" height="${l}" font-family="${mt($r)}">
  <title>${mt(t.name||"Home Architect")}</title>
${y}</svg>`}static renderOpening(t,e,r,i){const o=g=>B(g*r),s=t.width,a=s/2,c=e.thickness,h=c/2,l="      ";let u=`${l}<rect x="${o(-a)}" y="${o(-h-D.cutoutOverlap)}" width="${o(s)}" height="${o(c+D.cutoutOverlap*2)}" fill="${i}" />
`;const d=`${l}<rect x="${o(-a)}" y="${o(-h)}" width="${o(s)}" height="${o(c)}" fill="none" stroke="${C.frame}" stroke-width="${o(D.windowFrame)}" />
`,p=()=>{const g=Math.min(D.jamb,s/4);return`${l}<rect x="${o(-a)}" y="${o(-h)}" width="${o(g)}" height="${o(c)}" fill="${C.jamb}" />
${l}<rect x="${o(a-g)}" y="${o(-h)}" width="${o(g)}" height="${o(c)}" fill="${C.jamb}" />
`},f=t.flipSide?-1:1,m=(g,x,y)=>{const b=x*f>0?1:0;return`${l}<line x1="${o(g)}" y1="0" x2="${o(g)}" y2="${o(f*y)}" stroke="${C.accent}" stroke-width="${o(D.doorLeaf)}" stroke-linecap="round" />
${l}<path d="M ${o(g+x*y)} 0 A ${o(y)} ${o(y)} 0 0 ${b} ${o(g)} ${o(f*y)}" fill="${C.doorSwing}" stroke="${C.accent}" stroke-width="${o(D.doorArc)}" stroke-dasharray="${o(D.doorDash)} ${o(D.doorDash)}" />
`};switch(t.type){case"door":{const g=t.flipDirection?a:-a;u+=p()+m(g,t.flipDirection?-1:1,s);break}case"double_door":u+=p()+m(-a,1,a)+m(a,-1,a);break;case"sliding_door":{const g=s*.55;u+=d+`${l}<rect x="${o(-a)}" y="${o(-c/4-D.slidingPanel/2)}" width="${o(g)}" height="${o(D.slidingPanel)}" fill="${C.accent}" />
${l}<rect x="${o(a-g)}" y="${o(c/4-D.slidingPanel/2)}" width="${o(g)}" height="${o(D.slidingPanel)}" fill="${C.accent}" />
`;break}case"french_window":u+=d+`${l}<rect x="${o(-a)}" y="${o(-c/4)}" width="${o(a)}" height="${o(D.slidingPanel)}" fill="${C.accent}" />
${l}<rect x="0" y="${o(c/4)}" width="${o(a)}" height="${o(D.slidingPanel)}" fill="${C.accent}" />
`;break;default:{const g=t.sashCount||(s>=1.25?2:1),x=Math.min(D.jamb,s/4);u+=d+`${l}<line x1="${o(-a)}" y1="0" x2="${o(a)}" y2="0" stroke="${C.accent}" stroke-width="${o(D.windowGlass)}" />
`,g===2?u+=`${l}<line x1="0" y1="${o(-h)}" x2="0" y2="${o(h)}" stroke="${C.accent}" stroke-width="${o(D.windowMullion)}" />
${l}<line x1="${o(-a+x)}" y1="${o(-c/4)}" x2="${o(-x/2)}" y2="${o(-c/4)}" stroke="${C.accentFaint}" stroke-width="${o(D.windowSash)}" />
${l}<line x1="${o(x/2)}" y1="${o(c/4)}" x2="${o(a-x)}" y2="${o(c/4)}" stroke="${C.accentFaint}" stroke-width="${o(D.windowSash)}" />
`:u+=`${l}<line x1="${o(-a+x)}" y1="${o(-c/4)}" x2="${o(a-x)}" y2="${o(-c/4)}" stroke="${C.accentFaint}" stroke-width="${o(D.windowSash)}" />
${l}<line x1="${o(-a+x)}" y1="${o(c/4)}" x2="${o(a-x)}" y2="${o(c/4)}" stroke="${C.accentFaint}" stroke-width="${o(D.windowSash)}" />
`;break}}return u}static collectContentPoints(t){const e=[],r=t.walls||[];for(const o of Ae(r).values())e.push(...o);for(const o of t.rooms||[])o.polygon&&o.polygon.length>0&&e.push(...o.polygon);for(const o of t.bindings||[])o.position&&e.push(o.position);for(const o of t.furniture||[]){if(!o.position)continue;const s=Zs(o);e.push({x:s.minX,y:s.minY},{x:s.maxX,y:s.maxY})}for(const o of t.openings||[]){if(!Ya(o.type))continue;const s=r.find(l=>l.id===o.wallId),a=s?Sr(o,s):null;if(!a)continue;const c=o.flipSide?-1:1,h=o.width/2;for(const l of[-h,h]){const u={x:a.center.x+a.dir.x*l,y:a.center.y+a.dir.y*l},d=o.type==="door"?o.width:h;e.push(u,De(u,a.normal,c*d))}}const i=t.background;if(i&&i.visible&&(i.imageUrl||i.assetId)){const o=this.unitsPerMeter(t),s=i.offset||{x:0,y:0},a=Number.isFinite(i.scale)&&i.scale>0?i.scale:1;e.push({x:s.x,y:s.y},{x:s.x+(i.widthPx||1200)*a/o,y:s.y+(i.heightPx||900)*a/o})}return e.filter(o=>Number.isFinite(o.x)&&Number.isFinite(o.y))}}function Ba(n,t){if(typeof customElements>"u")return;const e=customElements.get(n);if(e){e!==t&&console.warn(`[home-architect] ${n} déjà défini (ancienne version en cache ?)`);return}try{customElements.define(n,t)}catch(r){console.error(`[home-architect] Impossible de définir <${n}> :`,r)}}const qa=new Set(["INPUT","TEXTAREA","SELECT"]),Xa=new Set(["ha-textfield","ha-textarea","ha-code-editor","ha-combo-box","ha-select","ha-search-input","ha-entity-picker","ha-icon-picker","mwc-textfield","mwc-textarea","mwc-select","md-filled-text-field","md-outlined-text-field","vaadin-combo-box-light"]),Ga=new Set(["textbox","searchbox","combobox","spinbutton"]);function Pn(n){return typeof n.composedPath=="function"?n.composedPath():[]}function Tr(n){const t=n;if(typeof t.tagName!="string")return!1;if(qa.has(t.tagName.toUpperCase())||Xa.has(t.tagName.toLowerCase())||t.isContentEditable)return!0;const e=typeof t.getAttribute=="function"?t.getAttribute("role"):null;return e!==null&&Ga.has(e.toLowerCase())}function Va(n){if(!n.isConnected)return!1;const t=n;return typeof t.checkVisibility=="function"?t.checkVisibility():n.getClientRects().length>0}function Ka(n){const t=Pn(n);return t.length>0?t[0]:n.target}function Za(n){const t=Pn(n);return t.length===0?n.target!==null&&Tr(n.target):t.some(Tr)}function Ja(n,t){return Pn(n).includes(t)}function Qa(n){return n.ctrlKey||n.metaKey||n.altKey}function Vh(n){return(n.ctrlKey||n.metaKey)&&!n.altKey}function tc(n,t){if(Za(n)||t.modalOpen&&!t.allowWhenModalOpen)return!1;if(Ja(n,t.host))return!0;const e=Ka(n),r=t.host.ownerDocument;return e!==null&&(e===r.body||e===r.documentElement)&&Va(t.host)}const ec=2500,we=12*1024*1024,nc=new Set(["image/png","image/jpeg","image/webp","image/gif"]),rc=2*1024*1024,ic=.85,oc=6e4;function sc(n){return new Promise((t,e)=>{const r=URL.createObjectURL(n),i=new Image;i.onload=()=>{t({source:i,width:i.naturalWidth,height:i.naturalHeight,release:()=>URL.revokeObjectURL(r)})},i.onerror=()=>{URL.revokeObjectURL(r),e(new Error("Image illisible ou format non pris en charge."))},i.src=r})}async function ac(n){if(typeof createImageBitmap=="function"&&n.type!=="image/svg+xml")try{const t=await createImageBitmap(n);return{source:t,width:t.width,height:t.height,release:()=>t.close()}}catch{}return sc(n)}function Ke(n,t,e){return new Promise(r=>{try{n.toBlob(i=>r(i),t,e)}catch{r(null)}})}function cc(n,t,e){const r=n.getImageData(0,0,t,e).data;for(let i=3;i<r.length;i+=4)if(r[i]<255)return!0;return!1}async function Kh(n,t={}){if(n.type==="image/svg+xml")throw new Error("Les images SVG ne sont pas compressées : elles sont téléversées telles quelles.");const e=t.maxSide&&t.maxSide>0?t.maxSide:ec,r=t.quality&&t.quality>0&&t.quality<=1?t.quality:ic,i=await ac(n),o=document.createElement("canvas");try{if(!i.width||!i.height)throw new Error("Image vide ou dimensions inconnues.");const s=Math.min(1,e/Math.max(i.width,i.height)),a=Math.max(1,Math.round(i.width*s)),c=Math.max(1,Math.round(i.height*s)),h=s<1;o.width=a,o.height=c;const l=o.getContext("2d");if(!l)throw new Error("Canvas 2D indisponible dans ce navigateur.");l.imageSmoothingEnabled=!0,l.imageSmoothingQuality="high",l.drawImage(i.source,0,0,a,c);const u=n.type!=="image/jpeg"&&cc(l,a,c);let d=null;if(u){const p=await Ke(o,"image/png");p&&p.size<rc&&(d=p)}if(!d){const p=await Ke(o,"image/webp",r);p&&p.type==="image/webp"&&(d=p)}if(d||(u&&(l.globalCompositeOperation="destination-over",l.fillStyle="#ffffff",l.fillRect(0,0,a,c),l.globalCompositeOperation="source-over"),d=await Ke(o,"image/jpeg",r)),!d)throw new Error("Impossible d'encoder l'image.");return!h&&d.size>=n.size&&nc.has(n.type)?{blob:n,width:i.width,height:i.height,mimeType:n.type}:{blob:d,width:a,height:c,mimeType:d.type}}finally{i.release(),o.width=0,o.height=0}}function lc(n){return new Promise((t,e)=>{const r=new FileReader;r.onload=()=>{typeof r.result=="string"?t(r.result):e(new Error("Lecture du fichier impossible."))},r.onerror=()=>e(r.error??new Error("Lecture du fichier impossible.")),r.readAsDataURL(n)})}function Zh(n){const t=/^data:([^,]*),/i.exec(n);if(!t)throw new Error("Data-URL invalide.");const e=t[1],r=n.slice(t[0].length),i=/;base64$/i.test(e),o=(e.split(";")[0]||"application/octet-stream").toLowerCase();if(!i)return new Blob([decodeURIComponent(r)],{type:o});const s=atob(r.replace(/\s+/g,"")),a=new Uint8Array(s.length);for(let c=0;c<s.length;c++)a[c]=s.charCodeAt(c);return new Blob([a],{type:o})}function Jh(n){return new Promise((t,e)=>{const r=new FileReader;r.onload=()=>{typeof r.result=="string"?t(r.result):e(new Error("Lecture du fichier impossible."))},r.onerror=()=>e(r.error??new Error("Lecture du fichier impossible.")),r.readAsText(n)})}function Qh(n,t){const e=URL.createObjectURL(n),r=document.createElement("a");r.href=e,r.download=t,r.rel="noopener",r.style.display="none",document.body.appendChild(r),r.click(),r.remove(),setTimeout(()=>URL.revokeObjectURL(e),oc)}const eo=50,hc=.15,uc=8,dc=.2,fc=2.5,pc=100,mc=16,gc=240,yc=25,xc=.0015,bc=.01;function We(n){const t=(n%360+360)%360;return t===0?0:t}function vc(n){const t=We(n);if(t===0)return[1,0];if(t===90)return[0,1];if(t===180)return[-1,0];if(t===270)return[0,-1];const e=t*Math.PI/180;return[Math.cos(e),Math.sin(e)]}function Ue(n,t){const[e,r]=vc(t);return{x:n.x*e-n.y*r,y:n.x*r+n.y*e}}function Ot(n){return{x:n.width/2,y:n.height/2}}function no(n){return n.pixelsPerMeter*n.viewport.zoom}function St(n,t,e){return{x:n-e.left,y:t-e.top}}function ro(n,t){return{x:n.x+t.left,y:n.y+t.top}}function io(n,t){if(We(t.rotationDeg)===0)return{x:n.x,y:n.y};const e=Ot(t.size),r=Ue({x:n.x-e.x,y:n.y-e.y},-t.rotationDeg);return{x:e.x+r.x,y:e.y+r.y}}function wc(n,t){if(We(t.rotationDeg)===0)return{x:n.x,y:n.y};const e=Ot(t.size),r=Ue({x:n.x-e.x,y:n.y-e.y},t.rotationDeg);return{x:e.x+r.x,y:e.y+r.y}}function oo(n,t){const e=no(t);return{x:(n.x-t.viewport.x)/e,y:(n.y-t.viewport.y)/e}}function so(n,t){const e=no(t);return{x:n.x*e+t.viewport.x,y:n.y*e+t.viewport.y}}function $c(n,t,e,r){return oo(io(St(n,t,e),r),r)}function _c(n,t,e){return ro(wc(so(n,e),e),t)}function Mc(n,t,e){const r=Ue(t,-e);return{x:n.x+r.x,y:n.y+r.y}}function Ir(n,t,e){const r=e/n.zoom;return{x:t.x-(t.x-n.x)*r,y:t.y-(t.y-n.y)*r,zoom:e}}function ge(n){return n>0&&Number.isFinite(n)?eo/n:1}function kc(n){const t=ge(n);return{min:hc*t,max:uc*t}}function pn(n,t){const{min:e,max:r}=kc(t),i=Number.isFinite(n)?n:ge(t);return Math.min(Math.max(i,e),r)}function Ec(n){return ge(n)}function Sc(n,t){return n/ge(t)}function Dr(n,t,e){return Number.isFinite(n)?t===1?n*mc:t===2?n*(e>0?e:800):n:0}function Pc(n,t){const e=t?yc:gc,r=Math.max(-e,Math.min(e,n));return Math.exp(-r*(t?bc:xc))}function Tc(n,t,e,r,i){const o=ge(t),s=We(r),a=s===90||s===270,c=n.width*t,h=n.height*t,l=a?h:c,u=a?c:h,d=(n.minX+n.width/2)*t,p=(n.minY+n.height/2)*t,f=Math.max(100,e.width-i*2),m=Math.max(100,e.height-i*2),g=pc/o;let x=Math.min(f/Math.max(l,g),m/Math.max(u,g));return x=Math.min(Math.max(x,dc*o),fc*o),{x:e.width/2-d*x,y:e.height/2-p*x,zoom:x}}function Ic(n){const t=(Math.round(n)%360+360)%360;return t>=338||t<23?"Nord":t<68?"Nord-Est":t<113?"Est":t<158?"Sud-Est":t<203?"Sud":t<248?"Sud-Ouest":t<293?"Ouest":"Nord-Ouest"}const Ar={mouse:3,pen:6,touch:10};function Dc(n){return Ar[n]??Ar.touch}function Pe(n,t,e){return Math.hypot(t.x-n.x,t.y-n.y)>Dc(e)}class Ac{constructor(){this.pointers=new Map}get size(){return this.pointers.size}set(t,e,r,i){this.pointers.set(t,{x:e,y:r,type:i})}move(t,e,r){const i=this.pointers.get(t);return i?(i.x=e,i.y=r,!0):!1}delete(t){this.pointers.delete(t)}clear(){this.pointers.clear()}pair(){if(this.pointers.size<2)return null;const[t,e]=[...this.pointers.entries()];return{ids:[t[0],e[0]],points:[{x:t[1].x,y:t[1].y},{x:e[1].x,y:e[1].y}],types:[t[1].type,e[1].type]}}get(t){const e=this.pointers.get(t);return e?{x:e.x,y:e.y}:null}}function Cr(n,t){return{x:(n.x+t.x)/2,y:(n.y+t.y)/2}}function te(n,t){return Math.hypot(n.x-t.x,n.y-t.y)}function Cc(n,t,e,r,i){const o=i*n.zoom,s={x:(t.x-n.x)/o,y:(t.y-n.y)/o},a=pn(n.zoom*(Number.isFinite(r)&&r>0?r:1),i),c=i*a;return{x:e.x-s.x*c,y:e.y-s.y*c,zoom:a}}const He={wall:"wallIds",opening:"openingIds",room:"roomIds",binding:"bindingIds",furniture:"furnitureIds"},Tn=["wallIds","openingIds","roomIds","bindingIds","furnitureIds"];function ut(){return{wallIds:[],openingIds:[],roomIds:[],bindingIds:[],furnitureIds:[]}}function st(n,t){return n[t]??[]}function Ze(n,t){return st(n,He[t.kind]).includes(t.id)}function gt(n){const t=ut();return t[He[n.kind]]=[n.id],t}function Je(n,t){const e=He[t.kind];return st(n,e).includes(t.id)?n:{...ut(),...n,[e]:[...st(n,e),t.id]}}function Qe(n,t){const e=He[t.kind];return st(n,e).includes(t.id)?{...ut(),...n,[e]:st(n,e).filter(r=>r!==t.id)}:n}function tn(n){return Tn.reduce((t,e)=>t+st(n,e).length,0)}function Rc(n,t){return Tn.every(e=>{const r=st(n,e),i=st(t,e);return r.length===i.length&&r.every((o,s)=>o===i[s])})}function Lc(n,t){const e={wallIds:new Set(t.walls.map(o=>o.id)),openingIds:new Set(t.openings.map(o=>o.id)),roomIds:new Set(t.rooms.map(o=>o.id)),bindingIds:new Set(t.bindings.map(o=>o.id)),furnitureIds:new Set((t.furniture??[]).map(o=>o.id))};let r=!1;const i=ut();for(const o of Tn){const s=st(n,o).filter(a=>e[o].has(a));s.length!==st(n,o).length&&(r=!0),i[o]=s}return r?i:n}const Oc=.01,Nc=.02,ao=.05,Fc=.1,Rr=.001,jc=/^[a-z0-9_]+\.[a-z0-9_]+$/;function At(n){return I.roundPoint(n)}function jt(n,t,e=1e-9){return Math.abs(n.x-t.x)<=e&&Math.abs(n.y-t.y)<=e}function pe(n){const t=n.rooms,e=o=>{let s=!1;const a=o.map(c=>{const h=G.findRoomContainingPoint(c.position,t)?.id;if(h===c.roomId)return c;s=!0;const l={...c};return h?l.roomId=h:delete l.roomId,l});return s?a:o},r=e(n.bindings),i=n.furniture?e(n.furniture):n.furniture;return r===n.bindings&&i===n.furniture?n:{...n,bindings:r,furniture:i}}function Lr(n){return n.wallIds.length+n.roomIds.length+n.furnitureIds.length+n.bindingIds.length===0}function zc(n,t){return!n.polygon||n.polygon.length<3?[]:t.filter(e=>{const r={x:(e.start.x+e.end.x)/2,y:(e.start.y+e.end.y)/2};return[e.start,e.end,r].every(i=>G.distanceToBoundary(i,n.polygon)<=Nc)}).map(e=>e.id)}function Or(n,t){const e=n.rooms.filter(c=>t.roomIds.includes(c.id)),r=new Set(e.map(c=>c.id)),i=new Set(t.wallIds.filter(c=>n.walls.some(h=>h.id===c)));for(const c of e)for(const h of zc(c,n.walls))i.add(h);const o=c=>c!==void 0&&r.has(c),s=new Set(t.furnitureIds??[]),a=new Set(t.bindingIds);return{wallIds:[...i],roomIds:[...r],furnitureIds:(n.furniture??[]).filter(c=>s.has(c.id)||o(c.roomId)).map(c=>c.id),bindingIds:n.bindings.filter(c=>a.has(c.id)||o(c.roomId)).map(c=>c.id)}}function co(n,t){return t.find(e=>Math.hypot(n.x-e.from.x,n.y-e.from.y)<=Oc)}function en(n,t){const e=co(n,t);if(!e)return null;const r=At({x:n.x+(e.to.x-e.from.x),y:n.y+(e.to.y-e.from.y)});return jt(r,n)?null:r}function Wc(n,t,e,r){let i=!1;const o=n.map(s=>{const a=t.get(s.wallId),c=e.get(s.wallId);if(!a||!c)return s;const h={x:c.start.x-a.start.x,y:c.start.y-a.start.y},l={x:c.end.x-a.end.x,y:c.end.y-a.end.y};if(jt(h,l))return s;const u=I.wallLength(a),d=I.wallLength(c),p=!jt(h,{x:0,y:0}),f=!jt(l,{x:0,y:0});let m=s.offset;p&&!f?m=d-(u-s.offset):p&&f&&(m=u>0?s.offset*d/u:d/2);const g=I.fitOpening(c,m,s.width,{walls:r}),x=g.fits?g.offset:Math.min(Math.max(m,0),d),y=g.fits?g.width:s.width;return Math.abs(x-s.offset)<1e-9&&Math.abs(y-s.width)<1e-9?s:(i=!0,{...s,offset:x,width:y})});return i?o:n}function lo(n,t,e){const r=new Map,i=new Map,o=n.walls.map(c=>{const h=en(c.start,t),l=en(c.end,t);if(!h&&!l)return c;const u={...c,start:h??c.start,end:l??c.end};return r.set(c.id,c),i.set(c.id,u),u});for(const c of i.values())if(I.wallLength(c)<ao)return null;let s=!1;const a=n.rooms.map(c=>{if(e&&e.roomIds.has(c.id))return e.delta.x===0&&e.delta.y===0?c:(s=!0,{...c,polygon:c.polygon.map(u=>At({x:u.x+e.delta.x,y:u.y+e.delta.y}))});let h=!1;const l=c.polygon.map(u=>{const d=en(u,t);return d?(h=!0,d):u});return h?(s=!0,{...c,polygon:l,areaM2:G.computeArea(l)}):c});return i.size===0&&!s?n:{...n,walls:i.size>0?o:n.walls,rooms:s?a:n.rooms,openings:i.size>0?Wc(n.openings,r,i,o):n.openings}}function Nr(n,t,e){if(e.x===0&&e.y===0)return n;const r=new Set(t.wallIds),i=[];for(const u of n.walls)if(r.has(u.id))for(const d of[u.start,u.end])co(d,i)||i.push({from:d,to:{x:d.x+e.x,y:d.y+e.y}});const o=lo(n,i,{roomIds:new Set(t.roomIds),delta:e});if(!o)return null;const s=u=>At({x:u.x+e.x,y:u.y+e.y}),a=new Set(t.furnitureIds),c=new Set(t.bindingIds),h=o.furniture&&a.size>0?o.furniture.map(u=>a.has(u.id)?{...u,position:s(u.position)}:u):o.furniture,l=c.size>0?o.bindings.map(u=>{if(!c.has(u.id))return u;const d=s(u.position);if(!u.radarConfig)return{...u,position:d};const p=u.radarConfig,f=p.calibrationPoints.map(x=>({...x,planMeters:s(x.planMeters)})),m=p.zones?.map(x=>({...x,p1:s(x.p1),p2:s(x.p2)})),g=p.affineMatrix?{...p.affineMatrix,tx:p.affineMatrix.tx+e.x,ty:p.affineMatrix.ty+e.y}:void 0;return{...u,position:d,radarConfig:{...p,calibrationPoints:f,...m?{zones:m}:{},...g?{affineMatrix:g}:{}}}}):o.bindings;return h===o.furniture&&l===o.bindings?pe(o):pe({...o,furniture:h,bindings:l})}function Uc(n,t,e,r){const i=n.walls.find(s=>s.id===t);if(!i)return null;const o=lo(n,[{from:i[e],to:r}]);return o?pe(o):null}function Hc(n,t,e,r){const i=n.rooms.find(a=>a.id===t);if(!i||e<0||e>=i.polygon.length)return null;const o=i.polygon.map((a,c)=>c===e?At(r):a);if(uo(o)!==null)return null;const s=n.rooms.map(a=>a.id===t?{...a,polygon:o,areaM2:G.computeArea(o)}:a);return pe({...n,rooms:s})}function Fr(n,t){const e=n.end.x-n.start.x,r=n.end.y-n.start.y,i=Math.hypot(e,r);return i===0?0:((t.x-n.start.x)*e+(t.y-n.start.y)*r)/i}function Yc(n,t,e){const r=n.openings.find(s=>s.id===t),i=r?n.walls.find(s=>s.id===r.wallId):void 0;if(!r||!i)return null;const o=I.fitOpening(i,e,r.width,{walls:n.walls,openings:n.openings,ignoreOpeningId:r.id});return!o.fits||o.overlaps.length>0?null:o.offset===r.offset&&o.width===r.width?n:{...n,openings:n.openings.map(s=>s.id===r.id?{...s,offset:o.offset,width:o.width}:s)}}function ho(n){const t=[];for(const e of n){const r=t[t.length-1];(!r||!jt(r,e,Rr))&&t.push({x:e.x,y:e.y})}for(;t.length>1&&jt(t[0],t[t.length-1],Rr);)t.pop();return t}function uo(n){const t=ho(n);return t.length<3?"too-few":G.isSelfIntersecting(t)?"self-intersecting":G.computeArea(t)<Fc?"too-small":null}function Bc(n){const t=new Set(n.map(r=>r.name));let e=n.length+1;for(;t.has(`Pièce ${e}`);)e++;return`Pièce ${e}`}function jr(n,t){const e=ho(n).map(At);return{id:Ht("room"),name:Bc(t),polygon:e,areaM2:G.computeArea(e)}}function zr(n,t){const e=Math.min(n.x,t.x),r=Math.max(n.x,t.x),i=Math.min(n.y,t.y),o=Math.max(n.y,t.y);return[{x:e,y:i},{x:r,y:i},{x:r,y:o},{x:e,y:o}]}function qc(n){return typeof n=="string"&&jc.test(n)}function Xc(n){if(!n||typeof n!="object"||Array.isArray(n))return null;const t=n;return t.kind==="furniture"?typeof t.furnitureType=="string"&&et(t.furnitureType)?{kind:"furniture",furnitureType:t.furnitureType}:null:t.kind==="entity"&&qc(t.entityId)?{kind:"entity",entityId:t.entityId,domain:Vt(t.entityId)}:null}function Gc(n,t,e){const r=At(t),i={id:Ht("bind"),entityId:n,position:r},o=G.findRoomContainingPoint(r,e);return o&&(i.roomId=o.id),i}function Vc(n,t,e){const r=et(n);if(!r)return null;const i=At(t),o={id:Ht("furn"),type:r.type,name:r.name,category:r.category,position:i,width:r.width,length:r.length,rotation:0,icon:r.icon};r.defaultColor&&(o.color=r.defaultColor);const s=G.findRoomContainingPoint(i,e);return s&&(o.roomId=s.id),o}function Kc(n){return{point:I.roundPoint(n),snappedTo:"none",constraints:[]}}function $e(n,t,e,r,i,o,s={}){return o?Kc(n):I.snapPoint(n,t,e,r,{...s,screenPixelsPerMeter:i})}function Wr(n,t,e,r){if(r)return{point:{...n},snappedTo:"none",constraints:[]};const i=I.metersFromPixels(ce.vertex,e);let o=null,s=i;for(const c of t)for(const h of[c.start,c.end]){const l=I.distance(n,h);l<=s&&(s=l,o=h)}if(o)return{point:{x:o.x,y:o.y},snappedTo:"vertex",constraints:["vertex"]};const a=fo(n,t,e);return a?{point:a.projectionPoint,snappedTo:"wall",constraints:["wall"],wallId:a.wall.id}:{point:{...n},snappedTo:"none",constraints:[]}}function fo(n,t,e){return I.snapPointToWall(n,t,I.metersFromPixels(ce.wall,e),{measureFromFace:!0})}function yt(n){let t=null,e;return(...r)=>(t!==null&&t.length===r.length&&t.every((i,o)=>Object.is(i,r[o]))||(e=n(...r),t=r),e)}const Ce=["#00bcd4","#ff9800","#e91e63"],po=320;function ee(n){if(!n||n.state==="unavailable"||n.state==="unknown")return null;const t=Number(n.state);return Number.isFinite(t)?t:null}function _e(n,t,e){const r=t??"auto";if(r==="mm")return n;if(r==="cm")return n*10;if(r==="m")return n*1e3;const i=typeof e?.attributes?.unit_of_measurement=="string"?e.attributes.unit_of_measurement.trim().toLowerCase():"";return i==="m"||i==="meters"||i==="mètres"?n*1e3:i==="cm"||i==="centimeters"?n*10:n}function mo(n,t,e){const r=e.invertX?-1:1,i=n.x/1e3*r;let o=n.y/1e3;if(e.tiltDeg&&Math.abs(e.tiltDeg)>.01){const u=e.tiltDeg*Math.PI/180;o=o*Math.cos(u)}const s=(e.orientationDeg??180)*Math.PI/180,a=Math.sin(s),c=Math.cos(s),h=i*c+o*a,l=-i*a+o*c;return{x:Math.round((t.x+h)*1e3)/1e3,y:Math.round((t.y-l)*1e3)/1e3}}function ie(n,t,e){const r=e.affineMatrix;return r&&Number.isFinite(r.a)&&Number.isFinite(r.b)&&Number.isFinite(r.tx)&&Number.isFinite(r.c)&&Number.isFinite(r.d)&&Number.isFinite(r.ty)?{x:Math.round((r.a*n.x+r.b*n.y+r.tx)*1e3)/1e3,y:Math.round((r.c*n.x+r.d*n.y+r.ty)*1e3)/1e3}:mo(n,t,e)}const Lt=new Map;function Zc(n,t,e=!0){if(!e)return Lt.set(n,t),t;const r=Lt.get(n);if(!r)return Lt.set(n,t),t;const i=Math.hypot(t.x-r.x,t.y-r.y);if(i>2.5)return Lt.set(n,t),t;const o=i<.12?.28:i<.35?.55:.85,s={x:Math.round((r.x+o*(t.x-r.x))*1e3)/1e3,y:Math.round((r.y+o*(t.y-r.y))*1e3)/1e3};return Lt.set(n,s),s}function Jc(n,t,e){const r=t.defaultThresholdMm??po,i=t.thresholdEntityId?ee(e?.[t.thresholdEntityId]):null,o=i!==null&&i>0?i:r;if(!n||!e)return{active:!1,radarMm:{x:0,y:0},distanceMm:0,resolutionMm:null,thresholdMm:o,kind:"human"};const s=e[n.xEntityId],a=e[n.yEntityId],c=ee(s),h=ee(a);if(c===null||h===null)return{active:!1,radarMm:{x:0,y:0},distanceMm:0,resolutionMm:null,thresholdMm:o,kind:"human"};const l=_e(c,t.coordinateUnit,s),u=_e(h,t.coordinateUnit,a);let d=Math.hypot(l,u);if(n.distanceEntityId){const y=e[n.distanceEntityId],b=ee(y);if(b===null||b<=0)return{active:!1,radarMm:{x:l,y:u},distanceMm:0,resolutionMm:null,thresholdMm:o,kind:"human"};d=_e(b,t.coordinateUnit,y)}const p=d>0&&!(Math.abs(l)<.001&&Math.abs(u)<.001),f=n.resolutionEntityId?e[n.resolutionEntityId]:void 0,m=ee(f),g=m!==null?_e(m,t.coordinateUnit,f):null,x=g!==null&&g>0&&g<o?"animal":"human";return{active:p,radarMm:{x:Math.round(l),y:Math.round(u)},distanceMm:Math.round(d),resolutionMm:g!==null?Math.round(g):null,thresholdMm:Math.round(o),kind:x}}function Qc(n,t,e={}){const r=n.radarConfig;if(!r||!r.enabled||!t||r.targets.length===0)return[];const i=e.applySmoothing===!0&&r.smoothing!==!1,o=[];return r.targets.forEach((s,a)=>{const c=`${n.id}:t${a}`,h=Jc(s,r,t);if(!h.active){Lt.delete(c);return}const l=ie(h.radarMm,n.position,r),u=Zc(c,l,i);o.push({index:a,label:s.label||`Cible ${a+1}`,kind:h.kind,icon:h.kind==="animal"?"🐱":"👤",color:s.color||Ce[a%Ce.length],radarMm:h.radarMm,distanceMm:h.distanceMm,resolutionMm:h.resolutionMm,thresholdMm:h.thresholdMm,planPosition:u})}),o}function tl(n,t=.45){const e=new Map,r=[];for(const i of n){const o=[];for(const s of i.targets){const a=r.find(c=>c.bindingId!==i.bindingId&&Math.hypot(c.target.planPosition.x-s.planPosition.x,c.target.planPosition.y-s.planPosition.y)<=t);a?a.target.planPosition={x:Math.round((a.target.planPosition.x+s.planPosition.x)/2*1e3)/1e3,y:Math.round((a.target.planPosition.y+s.planPosition.y)/2*1e3)/1e3}:(o.push(s),r.push({bindingId:i.bindingId,target:s}))}e.set(i.bindingId,o)}return e}function el(n,t,e,r,i){if(e<=0||i<=0)return"";const o=Math.min(359.9,Math.max(5,i)),s=o/2*Math.PI/180,a=(r-90)*Math.PI/180,c=a-s,h=a+s,l=n+e*Math.cos(c),u=t+e*Math.sin(c),d=n+e*Math.cos(h),p=t+e*Math.sin(h),f=o>180?1:0;return`M ${n} ${t} L ${l} ${u} A ${e} ${e} 0 ${f} 1 ${d} ${p} Z`}const nl=1.2,rl=120,il=6;function tu(){return{enabled:!0,orientationDeg:180,heightMeters:nl,tiltDeg:0,fovDeg:rl,maxRangeMeters:il,showCone:!0,invertX:!1,coordinateUnit:"auto",defaultThresholdMm:po,targets:[],calibrationPoints:[]}}function go(n){const t=n.indexOf("."),e=t>=0?n.slice(t+1):n;if(!e)return[];const r=["_presence_humaine_alongee","_presence_humaine_allongee","_presence_humaine_debout","_presence_humaine","_presence_chat_animal","_presence_animale","_presence_detectee","_presence","_occupancy","_motion","_moving_target","_still_target","_cible_1_x","_cible_1_y","_cible_1_distance","_cible_1_resolution","_target_1_x","_target_1_y","_target_1_distance","_target_1_resolution","_radar"],i=new Set;for(const o of r)if(e.endsWith(o)&&e.length>o.length){const s=e.slice(0,-o.length);i.add(s),s.endsWith("_radar")&&s.length>6?i.add(s.slice(0,-6)):i.add(`${s}_radar`)}return i.add(e),e.endsWith("_radar")||i.add(`${e}_radar`),[...i]}function yo(n,t){if(!t)return{targets:[]};const e=Object.keys(t);if(e.length===0)return{targets:[]};const r=new Set(e),i=go(n),o=u=>{for(const d of u)if(r.has(d))return d};for(const u of i){const d=[];for(let p=1;p<=3;p++){const f=o([`sensor.${u}_cible_${p}_x`,`sensor.${u}_radar_cible_${p}_x`,`sensor.${u}_target_${p}_x`,`sensor.${u}_target_${p}_x_coordinate`]),m=o([`sensor.${u}_cible_${p}_y`,`sensor.${u}_radar_cible_${p}_y`,`sensor.${u}_target_${p}_y`,`sensor.${u}_target_${p}_y_coordinate`]);if(f&&m){const g=o([`sensor.${u}_cible_${p}_distance`,`sensor.${u}_radar_cible_${p}_distance`,`sensor.${u}_target_${p}_distance`]),x=o([`sensor.${u}_cible_${p}_resolution`,`sensor.${u}_radar_cible_${p}_resolution`,`sensor.${u}_target_${p}_resolution`]);d.push({label:`Cible ${p}`,xEntityId:f,yEntityId:m,distanceEntityId:g,resolutionEntityId:x,color:Ce[(p-1)%Ce.length]})}}if(d.length>0){const p=o([`number.${u}_seuil_de_resolution_humain`,`number.${u}_radar_seuil_de_resolution_humain`,`number.${u}_seuil_humain_chat`,`number.${u}_human_threshold`,`input_number.${u}_seuil_de_resolution_humain`]);return{targets:d,thresholdEntityId:p}}}const s=n.indexOf("."),a=s>=0?n.slice(s+1):n,c=/^sensor\.(.+?)_(?:radar_)?(?:cible|target)_1_x$/;let h=null,l=0;for(const u of e){const d=c.exec(u);if(!d)continue;const p=d[1];let f=0;const m=Math.min(a.length,p.length);for(;f<m&&a[f]===p[f];)f++;f>=4&&f>l&&(l=f,h=p)}return h?yo(`binary_sensor.${h}_presence`,t):{targets:[]}}function eu(n,t){if(n.radarConfig)return!0;const e=n.entityId.toLowerCase();return!!(e.includes("radar")||e.includes("ld2450")||e.includes("mmwave")||e.includes("cible_")||t&&yo(n.entityId,t).targets.length>0)}function nu(n){if(n.length<2)return;if(n.length===2)return Ur(n[0],n[1]);let t=0,e=0,r=0,i=0,o=0;const s=n.length;let a=0,c=0,h=0,l=0,u=0,d=0;for(const m of n){const g=m.radarMm.x,x=m.radarMm.y,y=m.planMeters.x,b=m.planMeters.y;t+=g*g,e+=g*x,r+=g,i+=x*x,o+=x,a+=y*g,c+=y*x,h+=y,l+=b*g,u+=b*x,d+=b}const p=Hr([[t,e,r],[e,i,o],[r,o,s]],[a,c,h]),f=Hr([[t,e,r],[e,i,o],[r,o,s]],[l,u,d]);if(!p||!f){let m=0,g=1,x=-1;for(let y=0;y<n.length;y++)for(let b=y+1;b<n.length;b++){const k=Math.hypot(n[b].radarMm.x-n[y].radarMm.x,n[b].radarMm.y-n[y].radarMm.y);k>x&&(x=k,m=y,g=b)}return Ur(n[m],n[g])}return{a:p[0],b:p[1],tx:p[2],c:f[0],d:f[1],ty:f[2]}}function Ur(n,t){const e=t.radarMm.x-n.radarMm.x,r=t.radarMm.y-n.radarMm.y,i=e*e+r*r;if(i<1e-6)return;const o=t.planMeters.x-n.planMeters.x,s=t.planMeters.y-n.planMeters.y,a=(o*e+s*r)/i,c=(o*r-s*e)/i,h=n.planMeters.x-(a*n.radarMm.x+c*n.radarMm.y),l=n.planMeters.y-(-c*n.radarMm.x+a*n.radarMm.y);return{a,b:c,tx:h,c:-c,d:a,ty:l}}function Hr(n,t){const e=[[n[0][0],n[0][1],n[0][2],t[0]],[n[1][0],n[1][1],n[1][2],t[1]],[n[2][0],n[2][1],n[2][2],t[2]]];for(let i=0;i<3;i++){let o=i,s=Math.abs(e[i][i]);for(let a=i+1;a<3;a++){const c=Math.abs(e[a][i]);c>s&&(s=c,o=a)}if(s<1e-11)return null;if(o!==i){const a=e[i];e[i]=e[o],e[o]=a}for(let a=i+1;a<3;a++){const c=e[a][i]/e[i][i];for(let h=i;h<4;h++)e[a][h]-=c*e[i][h]}}const r=[0,0,0];for(let i=2;i>=0;i--){let o=e[i][3];for(let s=i+1;s<3;s++)o-=e[i][s]*r[s];if(r[i]=o/e[i][i],!Number.isFinite(r[i]))return null}return[r[0],r[1],r[2]]}function ru(n,t,e,r){const i=n.map(a=>({...a,geoMeters:mo(a.radarMm,t,e)}));if(!r||!r.polygon||r.polygon.length<3)return i.map(a=>({id:a.id,label:a.label,radarMm:{...a.radarMm},planMeters:{...a.geoMeters}}));const o=r.polygon,s=new Set;return i.map(a=>{let c=-1,h=1/0;for(let l=0;l<o.length;l++){if(s.has(l)&&s.size<o.length)continue;const u=Math.hypot(o[l].x-a.geoMeters.x,o[l].y-a.geoMeters.y);u<h&&(h=u,c=l)}return c>=0?(s.add(c),{id:a.id,label:a.label,radarMm:{...a.radarMm},planMeters:{x:Math.round(o[c].x*1e3)/1e3,y:Math.round(o[c].y*1e3)/1e3}}):{id:a.id,label:a.label,radarMm:{...a.radarMm},planMeters:{...a.geoMeters}}})}function Yr(n,t,e){const r=e.affineMatrix;if(r&&Number.isFinite(r.a)&&Number.isFinite(r.b)&&Number.isFinite(r.tx)&&Number.isFinite(r.c)&&Number.isFinite(r.d)&&Number.isFinite(r.ty)){const d=r.a*r.d-r.b*r.c;if(Math.abs(d)>1e-11){const p=n.x-r.tx,f=n.y-r.ty,m=(r.d*p-r.b*f)/d,g=(-r.c*p+r.a*f)/d;return{x:Math.round(m),y:Math.round(g)}}}const i=n.x-t.x,o=n.y-t.y,s=(e.orientationDeg??180)*Math.PI/180,a=Math.sin(s),c=Math.cos(s),h=i*c+o*a,l=i*a-o*c,u=e.invertX?-1:1;return{x:Math.round(u*h*1e3),y:Math.round(Math.max(0,l)*1e3)}}function iu(n,t,e,r){const i=go(n);if(i.length===0)return[];const o=t?Object.keys(t):[],s=(h,l)=>{for(const u of i){const d=[`number.${u}_zone_${h}_${l}`,`number.${u}_radar_zone_${h}_${l}`,`number.${u}_zone${h}_${l}`];for(const g of d)if(t&&g in t)return g;const p=u.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),f=new RegExp(`^number\\.${p}.*zone[_-]?${h}[_-]?${l}$`,"i"),m=o.find(g=>f.test(g));if(m)return m}return`number.${i[0]}_zone_${h}_${l}`},a=h=>{if(!h||h.state==="unavailable"||h.state==="unknown")return null;const l=Number(h.state);return Number.isFinite(l)?l:null},c=[];for(const h of[1,2,3]){const l=s(h,"x1"),u=s(h,"y1"),d=s(h,"x2"),p=s(h,"y2"),f=l?a(t?.[l]):null,m=u?a(t?.[u]):null,g=d?a(t?.[d]):null,x=p?a(t?.[p]):null,y=f!==null&&m!==null&&g!==null&&x!==null&&(Math.abs(f)>0||Math.abs(m)>0||Math.abs(g)>0||Math.abs(x)>0),b=ie(y?{x:f,y:m}:{x:-1e3+(h-1)*400,y:1e3},e,r),k=ie(y?{x:g,y:x}:{x:1e3+(h-1)*400,y:2500},e,r);c.push({index:h,name:`Zone ${h}`,enabled:y,p1:b,p2:k,x1EntityId:l,y1EntityId:u,x2EntityId:d,y2EntityId:p})}return c}function ou(n,t,e){const r=Yr(n.p1,t,e),i=Yr(n.p2,t,e);return{x1:Math.min(r.x,i.x),y1:Math.max(0,Math.min(r.y,i.y)),x2:Math.max(r.x,i.x),y2:Math.max(0,Math.max(r.y,i.y))}}function ol(n){if(!n)return[];const t=[];n.thresholdEntityId&&t.push(n.thresholdEntityId);for(const e of n.targets)e.xEntityId&&t.push(e.xEntityId),e.yEntityId&&t.push(e.yEntityId),e.distanceEntityId&&t.push(e.distanceEntityId),e.resolutionEntityId&&t.push(e.resolutionEntityId);if(n.zones)for(const e of n.zones)e.x1EntityId&&t.push(e.x1EntityId),e.y1EntityId&&t.push(e.y1EntityId),e.x2EntityId&&t.push(e.x2EntityId),e.y2EntityId&&t.push(e.y2EntityId);return t}const sl="Entité introuvable",al="…",cl="⚠️",Br="⚡",qr={light:"💡",switch:"🔌",input_boolean:"🔘",binary_sensor:"🚨",sensor:"📊",climate:"🌡️",water_heater:"♨️",humidifier:"💧",camera:"📷",media_player:"📺",remote:"🎛️",cover:"🪟",valve:"🚰",fan:"💨",lock:"🔒",alarm_control_panel:"🛡️",siren:"📢",scene:"🎬",script:"📜",automation:"🤖",button:"🔘",input_button:"🔘",person:"👤",device_tracker:"📍",vacuum:"🧹"},ll={"binary_sensor.motion":"🏃","binary_sensor.occupancy":"🏃","binary_sensor.presence":"🏃","binary_sensor.door":"🚪","binary_sensor.garage_door":"🚪","binary_sensor.window":"🪟","binary_sensor.smoke":"🔥","binary_sensor.gas":"🔥","binary_sensor.carbon_monoxide":"🔥","binary_sensor.moisture":"💧","sensor.temperature":"🌡️","sensor.humidity":"💧","sensor.power":"⚡","sensor.energy":"⚡","cover.garage":"🚪","cover.gate":"🚧","cover.door":"🚪"},hl={motion:{on:"Mouvement",off:"Au repos",alertWhen:"on"},occupancy:{on:"Occupé",off:"Libre",alertWhen:"on"},presence:{on:"Présent",off:"Absent",alertWhen:"on"},door:{on:"Ouvert",off:"Fermé",alertWhen:"on"},window:{on:"Ouvert",off:"Fermé",alertWhen:"on"},garage_door:{on:"Ouvert",off:"Fermé",alertWhen:"on"},opening:{on:"Ouvert",off:"Fermé",alertWhen:"on"},lock:{on:"Déverrouillé",off:"Verrouillé",alertWhen:"on"},smoke:{on:"Fumée !",off:"Normal",alertWhen:"on"},gas:{on:"Gaz !",off:"Normal",alertWhen:"on"},carbon_monoxide:{on:"CO !",off:"Normal",alertWhen:"on"},moisture:{on:"Fuite !",off:"Sec",alertWhen:"on"},safety:{on:"Danger",off:"Sûr",alertWhen:"on"},problem:{on:"Problème",off:"OK",alertWhen:"on"},tamper:{on:"Sabotage",off:"OK",alertWhen:"on"},heat:{on:"Chaud",off:"Normal",alertWhen:"on"},cold:{on:"Froid",off:"Normal",alertWhen:"on"},battery:{on:"Batterie faible",off:"Normale",alertWhen:"on"},sound:{on:"Son détecté",off:"Calme",alertWhen:"on"},vibration:{on:"Vibration",off:"Calme",alertWhen:"on"},connectivity:{on:"Connecté",off:"Déconnecté",alertWhen:"off",calm:"on"},power:{on:"Alimenté",off:"Coupé"},plug:{on:"Branché",off:"Débranché"},running:{on:"En marche",off:"Arrêté"},light:{on:"Lumière",off:"Sombre"},battery_charging:{on:"En charge",off:"Pas en charge"},moving:{on:"En mouvement",off:"Immobile"},update:{on:"Mise à jour",off:"À jour"}},ul={on:"Actif",off:"Inactif"},dl=new Set(["motion","occupancy","presence"]),fl={off:"Arrêt",heat:"Chauffage",cool:"Climatisation",heat_cool:"Auto",auto:"Auto",dry:"Déshumidification",fan_only:"Ventilation"},pl=new Set(["heating","cooling","drying","fan","preheating","defrosting"]),Xr=new Set(["scene","button","input_button"]),ml=new Set(["°C","°F"]);function Dt(n,t){return n.attributes?.[t]}function Yt(n,t){const e=Dt(n,t);return typeof e=="string"?e:""}function $t(n){if(typeof n=="number")return Number.isFinite(n)?n:null;if(typeof n=="string"&&n.trim()!==""){const t=Number(n);return Number.isFinite(t)?t:null}return null}const Gr=new Map;function gl(n){switch(n?.locale?.number_format){case"comma_decimal":return"en-US";case"decimal_comma":return"de";case"space_comma":return"fr";case"system":return;default:return n?.locale?.language||n?.language||void 0}}function In(n,t,e=1){const r=gl(t),i=t?.locale?.number_format!=="none",o=`${r??""}|${e}|${i}`;let s=Gr.get(o);if(!s){const a={maximumFractionDigits:e,useGrouping:i};try{s=new Intl.NumberFormat(r,a)}catch{s=new Intl.NumberFormat(void 0,a)}Gr.set(o,s)}return s.format(n)}function Vr(n,t){if(typeof t.formatEntityState!="function")return null;try{const e=t.formatEntityState(n);return typeof e=="string"&&e!==""?e:null}catch{return null}}function yl(n,t,e){return n.icon?n.icon:e?t==="lock"&&e.state!=="locked"?"🔓":ll[`${t}.${Yt(e,"device_class")}`]??qr[t]??Br:qr[t]??Br}function Kr(n){const t=n?.config?.unit_system?.temperature;return typeof t=="string"&&t!==""?t:"°C"}function Zr(n,t){return t==="°F"?(n-32)*5/9:t==="K"?n-273.15:n}function Dn(n,t){const e=t?.states?.[n];if(!e)return null;const r=Vt(n);if(r==="climate"){const a=$t(Dt(e,"current_temperature"));if(a===null)return null;const c=Kr(t);return{entityId:n,value:a,unit:c,celsius:Zr(a,c)}}if(r!=="sensor")return null;const i=Yt(e,"unit_of_measurement");if(Yt(e,"device_class")!=="temperature"&&!ml.has(i))return null;const o=$t(e.state);if(o===null)return null;const s=i||Kr(t);return{entityId:n,value:o,unit:s,celsius:Zr(o,s)}}function An(n,t){return`${In(n.value,t)} ${n.unit}`}function xl(n,t,e){for(const r of t){if(r.roomId!==n)continue;const i=Dn(r.entityId,e);if(i)return i}return null}function bl(n){return n<18?"rgba(59, 130, 246, 0.38)":n<20?"rgba(14, 165, 233, 0.32)":n<22?"rgba(16, 185, 129, 0.30)":n<24?"rgba(245, 158, 11, 0.34)":"rgba(239, 68, 68, 0.40)"}function vl(n,t,e){for(const r of t){if(r.roomId!==n||Vt(r.entityId)!=="light")continue;const i=e?.states?.[r.entityId];if(!i||i.state!=="on")continue;const o=Dt(i,"rgb_color"),[s,a,c]=Array.isArray(o)&&o.length>=3&&o.slice(0,3).every(u=>$t(u)!==null)?o.slice(0,3).map(u=>Math.min(255,Math.max(0,Math.round(Number(u))))):[255,240,180],h=$t(Dt(i,"brightness"))??255,l=.12+Math.min(255,Math.max(0,h))/255*.22;return`rgba(${s}, ${a}, ${c}, ${l.toFixed(2)})`}return null}function wl(n,t,e,r){const i=r?xl(n.id,t,e):null;if(i)return{fill:bl(i.celsius),illuminated:!1,temperature:i};const o=vl(n.id,t,e);return{fill:o,illuminated:o!==null,temperature:null}}function xo(n){const t=Yt(n,"device_class"),e=hl[t]??ul,r=n.state==="on",i=r?e.on:e.off;let o;return e.alertWhen?o=(r?"on":"off")===e.alertWhen?"alert":e.calm??"info":o=r?"on":"off",{text:i,status:o,radar:r&&dl.has(t)}}function $l(n,t){const e=$t(Dt(n,"current_position")),r=e!==null?`${In(e,t,0)} %`:null;switch(n.state){case"open":return{text:"Ouvert",status:"on",badge:r};case"closed":return{text:"Fermé",status:"off",badge:r};case"opening":return{text:"Ouverture…",status:"info",badge:r};case"closing":return{text:"Fermeture…",status:"info",badge:r};default:return{text:n.state,status:"info",badge:r}}}function _l(n){switch(n){case"locked":return{text:"Verrouillé",status:"info"};case"unlocked":return{text:"Déverrouillé",status:"alert"};case"jammed":return{text:"Bloqué",status:"alert"};case"open":return{text:"Ouvert",status:"alert"};case"opening":return{text:"Ouverture…",status:"info"};case"locking":return{text:"Verrouillage…",status:"info"};case"unlocking":return{text:"Déverrouillage…",status:"info"};default:return{text:n,status:"info"}}}function Ml(n){return n==="disarmed"?{text:"Désarmée",status:"off"}:n==="triggered"?{text:"Déclenchée !",status:"alert"}:n.startsWith("armed")?{text:"Armée",status:"info"}:n==="arming"?{text:"Activation…",status:"info"}:n==="pending"?{text:"En attente",status:"info"}:n==="disarming"?{text:"Désactivation…",status:"info"}:{text:n,status:"info"}}function kl(n){switch(n){case"playing":return{text:"Lecture",status:"on"};case"paused":return{text:"Pause",status:"info"};case"buffering":return{text:"Chargement…",status:"info"};case"on":return{text:"Allumé",status:"info"};case"idle":return{text:"Inactif",status:"info"};case"standby":return{text:"Veille",status:"off"};case"off":return{text:"Éteint",status:"off"};default:return{text:n,status:"info"}}}function El(n,t,e){const r=Yt(n,"hvac_action"),i=n.state==="off"?"off":pl.has(r)?"on":"info",o=Dn(t,e),s=fl[n.state]??n.state,a=o?An(o,e):null;return{text:a?`${s} · ${a}`:s,status:i,badge:a}}function Sl(n,t,e){const r=Yt(n,"unit_of_measurement"),i=$t(n.state),o=i!==null?`${In(i,e)}${r?` ${r}`:""}`:n.state,s=Dn(t,e);return{text:o,status:"info",badge:s?An(s,e):null}}function Pl(n,t,e,r){const i=t.state==="on";switch(n){case"light":{if(!i)return{text:"Éteint",status:"off"};const o=$t(Dt(t,"brightness"));return{text:o!==null?`Allumé (${Math.round(o/255*100)} %)`:"Allumé",status:"on"}}case"switch":case"input_boolean":case"automation":case"siren":case"humidifier":case"remote":return i?{text:"Allumé",status:"on"}:{text:"Éteint",status:"off"};case"fan":return i?{text:"En marche",status:"on"}:{text:"Arrêté",status:"off"};case"cover":case"valve":return $l(t,r);case"lock":return _l(t.state);case"alarm_control_panel":return Ml(t.state);case"media_player":return kl(t.state);case"climate":return El(t,e,r);case"sensor":return Sl(t,e,r);case"binary_sensor":return xo(t);case"person":case"device_tracker":return t.state==="home"?{text:"Présent",status:"on"}:t.state==="not_home"?{text:"Absent",status:"off"}:{text:t.state,status:"info"};case"script":return i?{text:"En cours",status:"on"}:{text:"Prêt",status:"info"};case"scene":case"button":case"input_button":return{text:"Prêt",status:"info"};case"vacuum":return t.state==="cleaning"?{text:"Nettoyage",status:"on"}:t.state==="docked"?{text:"À la base",status:"off"}:t.state==="error"?{text:"Erreur",status:"alert"}:{text:t.state,status:"info"};default:return i?{text:"Actif",status:"on"}:t.state==="off"?{text:"Inactif",status:"off"}:{text:t.state,status:"info"}}}function Tl(n,t){const e=Vt(n.entityId),r=t?.states?.[n.entityId],i={name:Qi(n,t?.states),stateText:al,status:"off",icon:yl(n,e,r),orphan:!1,unavailable:!1,radar:!1,lightOn:!1,fanOn:!1,playing:!1,badge:null};if(!t?.states)return i;if(!r)return{...i,stateText:sl,status:"missing",orphan:!0,icon:n.icon||cl};if(r.state==="unavailable"||r.state==="unknown"&&!Xr.has(e))return{...i,stateText:Vr(r,t)??(r.state==="unavailable"?"Indisponible":"Inconnu"),status:"off",unavailable:!0};const o=Pl(e,r,n.entityId,t);let s=(Xr.has(e)?null:Vr(r,t))??o.text;if(e==="light"&&r.state==="on"&&s!==o.text){const a=$t(Dt(r,"brightness"));a!==null&&(s=`${s} (${Math.round(a/255*100)} %)`)}else e==="climate"&&o.badge&&s!==o.text&&(s=`${s} · ${o.badge}`);return{...i,stateText:s,status:o.status,radar:e==="binary_sensor"&&xo(r).radar,lightOn:e==="light"&&r.state==="on",fanOn:e==="fan"&&r.state==="on",playing:e==="media_player"&&r.state==="playing",badge:o.badge??null}}function Il(n,t=[]){const e=n.flatMap(i=>ol(i.radarConfig)),r=[...n.map(i=>i.entityId),...e,...t.map(i=>i.entityId)];return[...new Set(r.filter(i=>typeof i=="string"))]}function Jr(n,t,e){if(!n||!t)return n!==t;if(n.language!==t.language||n.locale?.language!==t.locale?.language||n.locale?.number_format!==t.locale?.number_format||n.config?.unit_system?.temperature!==t.config?.unit_system?.temperature||n.themes?.darkMode!==t.themes?.darkMode||n.entities!==t.entities||n.formatEntityState!==t.formatEntityState)return!0;const r=n.states,i=t.states;return r===i?!1:!r||!i?!0:e.some(o=>r[o]!==i[o])}const Dl=500,Al=250,Cl=/^(?:\/(?!\/)|#)[^\s\x00-\x1f\x7f\\]*$/;function Rl(n){return typeof n=="string"&&Cl.test(n)}function Ll(n,t){return t==="double_tap"?"more-info":t==="hold"?n.holdAction??"more-info":n.tapAction??Ra(n.entityId)}function bo(n,t){const e=Ll(n,t),r={kind:"more-info",entityId:n.entityId};switch(e){case"none":return{kind:"none"};case"navigate":return Rl(n.navigationPath)?{kind:"navigate",path:n.navigationPath}:r;case"toggle":{const i=La(n.entityId);return i?{kind:"service",domain:i.domain,service:i.service,entityId:n.entityId}:r}default:return r}}function Ol(n){return n&&typeof n=="object"&&"message"in n&&typeof n.message=="string"?n.message:typeof n=="string"?n:""}function Qr(n,t,e){const r=bo(n,t);switch(r.kind){case"more-info":e.host.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:r.entityId},bubbles:!0,composed:!0}));break;case"service":{const i=e.hass?.callService;if(typeof i!="function"){e.onError("Home Assistant est indisponible.");break}const o=s=>{console.error(`[home-architect] ${r.domain}.${r.service} (${r.entityId}) a échoué :`,s);const a=Ol(s);e.onError(`Action impossible sur ${r.entityId}${a?` : ${a}`:"."}`)};try{Promise.resolve(i.call(e.hass,r.domain,r.service,{entity_id:r.entityId})).catch(o)}catch(s){o(s)}break}case"navigate":history.pushState(null,"",r.path),window.dispatchEvent(new CustomEvent("location-changed",{detail:{replace:!1}}));break}return r}class Nl{constructor(t,e=Dl,r=Al){this.handlers=t,this.holdMs=e,this.doubleTapMs=r,this.press=null,this.swallowClick=!1,this.pendingTap=null,this.lastImmediate=null}down(t,e,r,i){this.clearPress(),this.swallowClick=!1;const o={id:t,start:{x:e,y:r},pointerType:i,timer:null};o.timer=setTimeout(()=>{o.timer=null,this.swallowClick=!0,this.handlers.onHold(t)},this.holdMs),this.press=o}move(t,e){const r=this.press;!r||!Pe(r.start,{x:t,y:e},r.pointerType)||(this.clearPress(),this.swallowClick=!0)}up(){this.clearPress()}cancel(){this.clearPress(),this.clearPendingTap(),this.swallowClick=!1}click(t){if(this.swallowClick){this.swallowClick=!1;return}const e=this.pendingTap;if(e&&e.id===t){this.clearPendingTap(),this.handlers.onDoubleTap(t);return}e&&(this.clearPendingTap(),this.handlers.onTap(e.id));const r=Date.now();if(this.lastImmediate&&this.lastImmediate.id===t&&r-this.lastImmediate.at<=this.doubleTapMs){this.lastImmediate=null;return}if(this.handlers.waitsForDoubleTap(t)){const i=setTimeout(()=>{this.pendingTap=null,this.handlers.onTap(t)},this.doubleTapMs);this.pendingTap={id:t,timer:i},this.lastImmediate=null}else this.lastImmediate={id:t,at:r},this.handlers.onTap(t)}dispose(){this.clearPress(),this.clearPendingTap(),this.swallowClick=!1,this.lastImmediate=null}clearPress(){this.press?.timer&&clearTimeout(this.press.timer),this.press=null}clearPendingTap(){this.pendingTap&&clearTimeout(this.pendingTap.timer),this.pendingTap=null}}const ti=.08,Ct=.06,Fl=1.25;function jl(n){return n.sashCount?n.sashCount===2?2:1:n.width>=Fl?2:1}function zl(n,t,e){const r=Math.max(0,n.width),i=r/2,o=Math.max(0,t),s=o/2,a=[{kind:"rect",role:"cutout",x:-i,y:-s-e,w:r,h:o+e*2}],c={kind:"rect",role:"frame",x:-i,y:-s,w:r,h:o},h=()=>{const d=Math.min(ti,r/4);return[{kind:"rect",role:"jamb",x:-i,y:-s,w:d,h:o},{kind:"rect",role:"jamb",x:i-d,y:-s,w:d,h:o}]},l=n.flipSide?-1:1,u=(d,p,f)=>[{kind:"line",role:"leaf",x1:d,y1:0,x2:d,y2:l*f},{kind:"arc",role:"swing",x1:d+p*f,y1:0,x2:d,y2:l*f,r:f,sweep:p*l>0?1:0}];switch(n.type){case"door":{const d=n.flipDirection?i:-i;a.push(...h(),...u(d,n.flipDirection?-1:1,r));break}case"double_door":a.push(...h(),...u(-i,1,i),...u(i,-1,i));break;case"sliding_door":{const d=r*.55;a.push(c,{kind:"rect",role:"panel",x:-i,y:-o/4-Ct/2,w:d,h:Ct},{kind:"rect",role:"panel",x:i-d,y:o/4-Ct/2,w:d,h:Ct});break}case"french_window":a.push(c,{kind:"rect",role:"panel",x:-i,y:-o/4,w:i,h:Ct},{kind:"rect",role:"panel",x:0,y:o/4,w:i,h:Ct});break;default:{const d=Math.min(ti,r/4);a.push(c,{kind:"line",role:"glass",x1:-i,y1:0,x2:i,y2:0}),jl(n)===2?a.push({kind:"line",role:"mullion",x1:0,y1:-s,x2:0,y2:s},{kind:"line",role:"sash",x1:-i+d,y1:-o/4,x2:-d/2,y2:-o/4},{kind:"line",role:"sash",x1:d/2,y1:o/4,x2:i-d,y2:o/4}):a.push({kind:"line",role:"sash",x1:-i+d,y1:-o/4,x2:i-d,y2:-o/4},{kind:"line",role:"sash",x1:-i+d,y1:o/4,x2:i-d,y2:o/4});break}}return a}function Wl(n,t){const e=i=>Math.min(i,Math.max(0,t-.05)),r=typeof n.height=="number"&&n.height>0?n.height:void 0;switch(n.type){case"window":{const i=Math.min(.9,t*.4);return[i,e(i+(r??1.25))]}case"french_window":return[0,e(r??2.15)];default:return[0,e(r??2.04)]}}function Ul(n){const t=Math.max(16,Math.round(n*.6)),e=t/2,r=t/4;return w`
    <!-- Parquet Chêne -->
    <pattern id="arch-tex-floor-parquet_oak" width=${t} height=${t} patternUnits="userSpaceOnUse">
      <rect width=${t} height=${t} fill="#b68656" fill-opacity="0.32" />
      <line x1="0" y1=${r} x2=${t} y2=${r} stroke="#5c3a1e" stroke-opacity="0.35" stroke-width="1" />
      <line x1="0" y1=${e} x2=${t} y2=${e} stroke="#5c3a1e" stroke-opacity="0.35" stroke-width="1" />
      <line x1="0" y1=${r*3} x2=${t} y2=${r*3} stroke="#5c3a1e" stroke-opacity="0.35" stroke-width="1" />
      <line x1=${e} y1="0" x2=${e} y2=${r} stroke="#5c3a1e" stroke-opacity="0.3" stroke-width="1" />
      <line x1=${r} y1=${r} x2=${r} y2=${e} stroke="#5c3a1e" stroke-opacity="0.3" stroke-width="1" />
      <line x1=${r*3} y1=${e} x2=${r*3} y2=${r*3} stroke="#5c3a1e" stroke-opacity="0.3" stroke-width="1" />
    </pattern>

    <!-- Point de Hongrie -->
    <pattern id="arch-tex-floor-parquet_herringbone" width=${t} height=${t} patternUnits="userSpaceOnUse">
      <rect width=${t} height=${t} fill="#a47449" fill-opacity="0.32" />
      <path d=${`M 0 ${e} L ${e} 0 L ${t} ${e} M 0 ${t} L ${e} ${e} L ${t} ${t}`} fill="none" stroke="#5c3a1e" stroke-opacity="0.38" stroke-width="1.2" />
    </pattern>

    <!-- Carrelage Clair -->
    <pattern id="arch-tex-floor-tiles_light" width=${e} height=${e} patternUnits="userSpaceOnUse">
      <rect width=${e} height=${e} fill="#e2e8f0" fill-opacity="0.26" />
      <path d=${`M ${e} 0 L 0 0 0 ${e}`} fill="none" stroke="#94a3b8" stroke-opacity="0.45" stroke-width="1" />
    </pattern>

    <!-- Carrelage Ardoise -->
    <pattern id="arch-tex-floor-tiles_slate" width=${e} height=${e} patternUnits="userSpaceOnUse">
      <rect width=${e} height=${e} fill="#1e293b" fill-opacity="0.42" />
      <path d=${`M ${e} 0 L 0 0 0 ${e}`} fill="none" stroke="#64748b" stroke-opacity="0.45" stroke-width="1" />
    </pattern>

    <!-- Terre Cuite / Tomettes -->
    <pattern id="arch-tex-floor-terracotta" width=${e} height=${e} patternUnits="userSpaceOnUse">
      <rect width=${e} height=${e} fill="#c2593f" fill-opacity="0.34" />
      <path d=${`M ${e} 0 L 0 0 0 ${e}`} fill="none" stroke="#7c2d12" stroke-opacity="0.4" stroke-width="1.2" />
    </pattern>

    <!-- Marbre -->
    <pattern id="arch-tex-floor-marble" width=${t} height=${t} patternUnits="userSpaceOnUse">
      <rect width=${t} height=${t} fill="#f1f5f9" fill-opacity="0.28" />
      <path d=${`M 0 ${r} Q ${e} ${e} ${t} ${r} M ${r} ${t} Q ${e} ${r*2.5} ${t} ${r*3}`} fill="none" stroke="#94a3b8" stroke-opacity="0.38" stroke-width="1.2" />
    </pattern>

    <!-- Béton Ciré -->
    <pattern id="arch-tex-floor-concrete" width=${t} height=${t} patternUnits="userSpaceOnUse">
      <rect width=${t} height=${t} fill="#64748b" fill-opacity="0.28" />
      <circle cx=${r} cy=${r} r="1.2" fill="#334155" fill-opacity="0.3" />
      <circle cx=${r*3} cy=${e} r="1" fill="#cbd5e1" fill-opacity="0.25" />
    </pattern>

    <!-- Moquette -->
    <pattern id="arch-tex-floor-carpet" width="12" height="12" patternUnits="userSpaceOnUse">
      <rect width="12" height="12" fill="#64748b" fill-opacity="0.26" />
      <circle cx="3" cy="3" r="1" fill="#ffffff" fill-opacity="0.2" />
      <circle cx="9" cy="9" r="1" fill="#0f172a" fill-opacity="0.2" />
    </pattern>

    <!-- Pelouse / Jardin -->
    <pattern id="arch-tex-floor-grass" width="18" height="18" patternUnits="userSpaceOnUse">
      <rect width="18" height="18" fill="#22c55e" fill-opacity="0.28" />
      <path d="M 4 14 L 3 9 M 6 14 L 8 9 M 13 7 L 12 2 M 15 7 L 17 3" stroke="#15803d" stroke-opacity="0.5" stroke-width="1.2" stroke-linecap="round" />
    </pattern>

    <!-- Terrasse Bois -->
    <pattern id="arch-tex-floor-decking" width=${t} height="12" patternUnits="userSpaceOnUse">
      <rect width=${t} height="10" fill="#8c5832" fill-opacity="0.36" />
      <line x1="0" y1="11" x2=${t} y2="11" stroke="#3e2211" stroke-opacity="0.55" stroke-width="2" />
    </pattern>

    <!-- Parements Murs 2D -->
    <pattern id="arch-tex-wall-brick" width="16" height="8" patternUnits="userSpaceOnUse">
      <rect width="16" height="8" fill="#b4533c" fill-opacity="0.65" />
      <path d="M 0 4 L 16 4 M 8 0 L 8 4 M 0 4 L 0 8" stroke="#cbd5e1" stroke-opacity="0.6" stroke-width="1" />
    </pattern>
    <pattern id="arch-tex-wall-stone" width="18" height="10" patternUnits="userSpaceOnUse">
      <rect width="18" height="10" fill="#a8a29e" fill-opacity="0.6" />
      <path d="M 0 5 L 18 5 M 6 0 L 6 5 M 13 5 L 13 10" stroke="#57534e" stroke-opacity="0.65" stroke-width="1.2" />
    </pattern>
    <pattern id="arch-tex-wall-wood_cladding" width="10" height="10" patternUnits="userSpaceOnUse">
      <rect width="10" height="10" fill="#9c6b3f" fill-opacity="0.65" />
      <line x1="0" y1="0" x2="0" y2="10" stroke="#451a03" stroke-opacity="0.55" stroke-width="1.5" />
    </pattern>
    <pattern id="arch-tex-wall-concrete" width="14" height="14" patternUnits="userSpaceOnUse">
      <rect width="14" height="14" fill="#64748b" fill-opacity="0.55" />
      <circle cx="4" cy="4" r="1" fill="#1e293b" fill-opacity="0.45" />
    </pattern>
    <pattern id="arch-tex-wall-plaster" width="12" height="12" patternUnits="userSpaceOnUse">
      <rect width="12" height="12" fill="#f5ebe0" fill-opacity="0.55" />
      <circle cx="6" cy="6" r="1" fill="#a8a29e" fill-opacity="0.45" />
    </pattern>
  `}const Hl=.001;function ei(n){const t=n.yawDeg*Math.PI/180,e=n.pitchDeg*Math.PI/180;return{cosYaw:Math.cos(t),sinYaw:Math.sin(t),cosPitch:Math.max(Hl,Math.cos(e)),sinPitch:Math.sin(e)}}function vo(n,t,e){const r=n.x-e.x,i=n.y-e.y;return{x:r*t.cosYaw-i*t.sinYaw,y:r*t.sinYaw+i*t.cosYaw}}function lt(n,t,e,r){const i=vo(n,e,r);return{x:r.x+i.x,y:r.y+i.y*e.cosPitch-t*e.sinPitch}}function ni(n,t,e,r){return vo(n,e,r).y*e.sinPitch+t*e.cosPitch}function Yl(n,t){const e=n.cosYaw,r=n.sinYaw*n.cosPitch,i=-n.sinYaw,o=n.cosYaw*n.cosPitch;return[e,r,i,o,t.x-(e*t.x+i*t.y),t.y-(r*t.x+o*t.y)]}function wo(n,t){const e=n.x,r=n.y/t.cosPitch;return{x:e*t.cosYaw+r*t.sinYaw,y:-e*t.sinYaw+r*t.cosYaw}}function Bl(n,t,e){const r=wo({x:n.x-e.x,y:n.y-e.y},t);return{x:e.x+r.x,y:e.y+r.y}}function ql(n){return{x:n.sinYaw,y:n.cosYaw}}function Xl(n,t){let e=(t-n)%360;return e>180&&(e-=360),e<=-180&&(e+=360),e}const $o=2.5,Gl=.35,ri=.002,Vl=.02,Kl=.01,ii={x:-.55,y:.835};function Zl(n,t,e){const r=e&&e>0?e:$o,i=t.filter(s=>s.polygon&&s.polygon.length>=3),o=new Map;for(const s of n){const a={x:(s.start.x+s.end.x)/2,y:(s.start.y+s.end.y)/2},c=s.thickness/2+Gl,h=i.filter(l=>G.isPointInPolygon(a,l.polygon)||G.distanceToBoundary(a,l.polygon)<=c);o.set(s.id,h.length>0?Math.max(...h.map(l=>l.height||r),s.height||0):s.height||r)}return o}function oi(n,t,e){return Math.abs(n.x-t.x)<=e&&Math.abs(n.y-t.y)<=e}function Jl(n){let t=0;for(let e=0;e<n.length;e++){const r=n[e],i=n[(e+1)%n.length];t+=r.x*i.y-i.x*r.y}return t/2}function si(n,t,e){return(e.x-n.start.x)*t.x+(e.y-n.start.y)*t.y}function Ql(n){const{basis:t,center:e,toView:r,scale:i,heightScale:o}=n,s=ql(t),a=new Map;for(const l of n.openings){const u=a.get(l.wallId);u?u.push(l):a.set(l.wallId,[l])}const c=[],h=[];for(const l of n.walls){const u=n.polygons.get(l.id);if(!u||u.length<3)continue;const d=Math.hypot(l.end.x-l.start.x,l.end.y-l.start.y);if(!(d>0))continue;const p={x:(l.end.x-l.start.x)/d,y:(l.end.y-l.start.y)/d},f=n.heights.get(l.id)??$o,m=f*o*i,g=Jl(u)<0?[...u].reverse():u,x=g.map(r),y=x.map(v=>lt(v,0,t,e)),b=x.map(v=>lt(v,m,t,e)),k=a.get(l.id)??[];for(let v=0;v<g.length;v++){const M=(v+1)%g.length,P=g[v],W=g[M];if([P,W].some(Mt=>oi(Mt,l.start,ri)||oi(Mt,l.end,ri)))continue;const X=W.x-P.x,q=W.y-P.y,L=Math.hypot(X,q);if(L<1e-6)continue;const J={x:q/L,y:-X/L};if(J.x*s.x+J.y*s.y<=0)continue;const ye=J.x*t.cosYaw-J.y*t.sinYaw,Ao=J.x*t.sinYaw+J.y*t.cosYaw,Co=Math.max(-1,Math.min(1,ye*ii.x+Ao*ii.y)),Ro=r({x:(P.x+W.x)/2,y:(P.y+W.y)/2}),Rn=[];if(k.length>0&&Math.abs(X/L*p.y-q/L*p.x)<Vl){const Mt=si(l,p,P),Be=si(l,p,W),Ln=at=>{const Kt=(at-Mt)/(Be-Mt);return r({x:P.x+X*Kt,y:P.y+q*Kt})};for(const at of k){const Kt=Math.max(at.offset-at.width/2,Math.min(Mt,Be)),On=Math.min(at.offset+at.width/2,Math.max(Mt,Be));if(On-Kt<Kl)continue;const[Lo,Oo]=Wl(at,f),Nn=Ln(Kt),Fn=Ln(On),jn=Lo*o*i,zn=Oo*o*i;Rn.push({openingId:at.id,type:at.type,points:[lt(Nn,jn,t,e),lt(Fn,jn,t,e),lt(Fn,zn,t,e),lt(Nn,zn,t,e)]})}}c.push({kind:"face",wallId:l.id,points:[y[v],y[M],b[M],b[v]],depth:ni(Ro,m/2,t,e),shade:Co,panels:Rn})}const _=g.reduce((v,M)=>({x:v.x+M.x/g.length,y:v.y+M.y/g.length}),{x:0,y:0});h.push({kind:"cap",wallId:l.id,points:b,depth:ni(r(_),m,t,e)})}return c.sort((l,u)=>l.depth-u.depth),h.sort((l,u)=>l.depth-u.depth),[...c,...h]}const th="Vue 3D simplifiée : WebGL est indisponible sur cet appareil.",eh="Vue 3D simplifiée : le moteur 3D n'a pas pu être chargé.";let ne=null,_o=!1,Nt=null;function nh(){try{const n=document.createElement("canvas"),t=n.getContext("webgl2")??n.getContext("webgl");return t?(t.getExtension("WEBGL_lose_context")?.loseContext(),!0):!1}catch{return!1}}function rh(){return _o&&Nt===null}function ih(n){Nt=n}function oh(){return Nt!==null?Promise.reject(new Error(Nt)):ne||(nh()?(ne=jo(()=>import("./view3d-element-xF3LEPHm.js"),[],import.meta.url).then(()=>{_o=!0},n=>{throw console.warn("[home-architect] Chargement de la vue 3D impossible :",n),ne=null,new Error(eh)}),ne):(Nt=th,Promise.reject(new Error(Nt))))}function sh(n){try{const t=localStorage.getItem(n);if(!t)return null;const e=JSON.parse(t);if(typeof e=="object"&&e!==null&&"x"in e&&"y"in e&&typeof e.x=="number"&&typeof e.y=="number"&&Number.isFinite(e.x)&&Number.isFinite(e.y))return{x:e.x,y:e.y}}catch{}return null}function nn(n,t){try{t?localStorage.setItem(n,JSON.stringify(t)):localStorage.removeItem(n)}catch{}}class Me{constructor(t,e,r){this.isDragging=!1,this.hasMoved=!1,this.position=null,this.startPointer={x:0,y:0},this.startPos={x:0,y:0},this.capturedTarget=null,this.handlePointerDown=i=>{if(i.button!==0)return;const o=i.target;if(o){const u=o.closest("button, input, select, textarea, a, .hud-btn, .hud-opt-btn, .hud-preset-btn, .icon-picker-btn");if(u&&!u.classList.contains("hud-drag-handle"))return}const s=this.getTarget(),a=this.getContainer();if(!s||!a)return;i.preventDefault(),i.stopPropagation();const c=s.getBoundingClientRect(),h=a.getBoundingClientRect();this.startPos={x:c.left-h.left,y:c.top-h.top},this.startPointer={x:i.clientX,y:i.clientY},this.isDragging=!0,this.hasMoved=!1;const l=i.currentTarget||s;this.capturedTarget=l;try{l.setPointerCapture(i.pointerId)}catch{}},this.handlePointerMove=i=>{if(!this.isDragging)return;i.preventDefault(),i.stopPropagation();const o=this.getTarget(),s=this.getContainer();if(!o||!s)return;const a=i.clientX-this.startPointer.x,c=i.clientY-this.startPointer.y;Math.hypot(a,c)>4&&(this.hasMoved=!0);const h=s.getBoundingClientRect(),l=o.getBoundingClientRect(),u=this.startPos.x+a,d=this.startPos.y+c,p=this.margin,f=Math.max(p,h.width-l.width-this.margin),m=this.margin,g=Math.max(m,h.height-l.height-this.margin),x=Math.round(Math.min(f,Math.max(p,u))),y=Math.round(Math.min(g,Math.max(m,d)));this.position={x,y},o.style.setProperty("left",`${x}px`,"important"),o.style.setProperty("top",`${y}px`,"important"),o.style.setProperty("right","auto","important"),o.style.setProperty("bottom","auto","important"),o.style.setProperty("transform","none","important")},this.handlePointerUp=i=>{if(this.isDragging){if(this.isDragging=!1,this.capturedTarget){try{this.capturedTarget.releasePointerCapture(i.pointerId)}catch{}this.capturedTarget=null}this.position&&this.storageKey&&nn(this.storageKey,this.position),this.onPositionChanged&&this.onPositionChanged(this.position)}},this.reset=()=>{this.isDragging=!1,this.hasMoved=!1,this.position=null,this.storageKey&&nn(this.storageKey,null);const i=this.getTarget();i&&(i.style.removeProperty("left"),i.style.removeProperty("top"),i.style.removeProperty("right"),i.style.removeProperty("bottom"),i.style.removeProperty("transform")),this.onPositionChanged&&this.onPositionChanged(null)},this.handleKeyDown=i=>{if(i.key==="Home"){i.preventDefault(),i.stopPropagation(),this.reset();return}const o=i.shiftKey?40:10,a={ArrowLeft:{x:-o,y:0},ArrowRight:{x:o,y:0},ArrowUp:{x:0,y:-o},ArrowDown:{x:0,y:o}}[i.key];if(!a)return;i.preventDefault(),i.stopPropagation();const c=this.getTarget(),h=this.getContainer();if(!c||!h)return;const l=c.getBoundingClientRect(),u=h.getBoundingClientRect(),d=this.position?this.position.x:l.left-u.left,p=this.position?this.position.y:l.top-u.top,f=this.margin,m=Math.max(f,u.width-l.width-this.margin),g=this.margin,x=Math.max(g,u.height-l.height-this.margin),y=Math.round(Math.min(m,Math.max(f,d+a.x))),b=Math.round(Math.min(x,Math.max(g,p+a.y)));this.position={x:y,y:b},c.style.setProperty("left",`${y}px`,"important"),c.style.setProperty("top",`${b}px`,"important"),c.style.setProperty("right","auto","important"),c.style.setProperty("bottom","auto","important"),c.style.setProperty("transform","none","important"),this.storageKey&&nn(this.storageKey,this.position),this.onPositionChanged&&this.onPositionChanged(this.position)},this.applyStoredPosition=()=>{if(!this.position)return;const i=this.getTarget(),o=this.getContainer();if(!i||!o)return;const s=o.getBoundingClientRect();if(s.width===0||s.height===0)return;const a=i.getBoundingClientRect(),c=this.margin,h=Math.max(c,s.width-(a.width||120)-this.margin),l=this.margin,u=Math.max(l,s.height-(a.height||40)-this.margin),d=Math.round(Math.min(h,Math.max(c,this.position.x))),p=Math.round(Math.min(u,Math.max(l,this.position.y)));this.position={x:d,y:p},i.style.setProperty("left",`${d}px`,"important"),i.style.setProperty("top",`${p}px`,"important"),i.style.setProperty("right","auto","important"),i.style.setProperty("bottom","auto","important"),i.style.setProperty("transform","none","important")},this.getTarget=t,this.getContainer=e,this.storageKey=r?.storageKey??null,this.margin=r?.margin??8,this.onPositionChanged=r?.onPositionChanged,this.storageKey&&(this.position=sh(this.storageKey))}get currentPosition(){return this.position}get styleString(){return this.position?`left: ${this.position.x}px !important; top: ${this.position.y}px !important; right: auto !important; bottom: auto !important; transform: none !important;`:""}}function rn(n,t="Déplacer la barre"){return Q`
    <button
      type="button"
      class="hud-drag-handle ${n.isDragging?"dragging":""}"
      @pointerdown=${n.handlePointerDown}
      @pointermove=${n.handlePointerMove}
      @pointerup=${n.handlePointerUp}
      @pointercancel=${n.handlePointerUp}
      @dblclick=${n.reset}
      @keydown=${n.handleKeyDown}
      title="${t} (cliquer-glisser, double-clic pour réinitialiser)"
      aria-label="${t}"
    >
      <span class="grip-dots" aria-hidden="true">⋮⋮</span>
    </button>
  `}var ah=Object.defineProperty,S=(n,t,e,r)=>{for(var i=void 0,o=n.length-1,s;o>=0;o--)(s=n[o])&&(i=s(t,e,i)||i);return i&&ah(t,e,i),i};const ai=".canvas-hud, .coords-hud, .help-hud, .compass-hud, .hud-drag-handle, button",ch=".wall-element, .wall-face-3d, .wall-cap-3d, .opening-3d, .room-group, .room-3d-badge-group, .entity-pin, .opening-element, .furniture-group, .dimension-badge, .wall-dim-badge",lh=.55,hh=400,uh=600,dh=[{label:"SO",title:"Vue Sud-Ouest (défaut)",camera:{pitchDeg:45,yawDeg:-35}},{label:"SE",title:"Vue Sud-Est",camera:{pitchDeg:45,yawDeg:35}},{label:"NE",title:"Vue Nord-Est",camera:{pitchDeg:45,yawDeg:125}},{label:"NO",title:"Vue Nord-Ouest",camera:{pitchDeg:45,yawDeg:-125}},{label:"Top",title:"Vue de dessus",camera:{pitchDeg:0,yawDeg:0}},{label:"Face",title:"Vue de face (depuis le sud)",camera:{pitchDeg:75,yawDeg:0}}];function fh(){return typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion: reduce)").matches}function rt(n){return n.map(t=>`${t.x},${t.y}`).join(" ")}const ph=.15,ci=.2,mh=10,gh=.05,li=12,yh=6,xh=.01,ke=.2,bh=.01,vh=1800,wh="Ctrl (⌘ sur Mac) + molette pour zoomer",hi={"too-few":"Une pièce a besoin d'au moins 3 angles.","self-intersecting":"Contour invalide : deux côtés de la pièce se croisent.","too-small":"Pièce trop petite."},ui={snappedTo:"none"},di={kind:"none"},$h=[];function on(n,t,e){for(const r of n.composedPath()){if(r===t)return!1;if(r instanceof Element&&r.matches(e))return!0}return!1}function fi(n){const t=n.background;return n.walls.length>0||n.rooms.length>0||n.bindings.length>0||(n.furniture?.length??0)>0||!!(t&&t.visible&&(t.imageUrl||t.assetId))}var bt;const E=(bt=class extends ae{constructor(){super(),this.project={id:"default",name:"Plan sans titre",created_at:new Date().toISOString(),updated_at:new Date().toISOString(),pixelsPerMeter:50,grid:{size:.5,subdivisions:2,snapToGrid:!0,snapToAngles:!0,snapToElements:!0},walls:[],openings:[],rooms:[],bindings:[]},this.activeTool="wall",this.currentWallThickness=.2,this.currentOpeningWidth=.9,this.is3DMode=!1,this.selectedElements=ut(),this.isDashboardMode=!1,this.interactive=!0,this.readOnly=!1,this.modalOpen=!1,this.hasToast=!1,this.ghostProject=null,this.showDimensions=!0,this.showThermalHeatmap=!1,this.openingFlipSide=!1,this.openingFlipDirection=!1,this.windowSashCount=1,this.showControls=!0,this.animations=!0,this.theme="auto",this.shadows=!0,this.viewport={x:300,y:300,zoom:1},this.interaction=di,this.marqueeStart=null,this.marqueeCurrent=null,this.drawingWallStart=null,this.previewPoint=null,this.snapInfo=ui,this.cursorCoords={x:0,y:0},this.roomDraft=[],this.rectStart=null,this.rectCurrent=null,this.wallSnap=null,this.openingFit=null,this.calibrateStart=null,this.calibrateCurrent=null,this.rescaleStart=null,this.rescaleCurrent=null,this.viewRotation=0,this.orbitPitch=45,this.orbitYaw=-35,this.view3d="idle",this.view3dZoom=1,this.cutWalls=!1,this.walkthrough3D=!1,this.lightingMode3D="auto",this.nightMode3D=!1,this.canvasHudDrag=new Me(()=>this.renderRoot.querySelector(".canvas-hud"),()=>this.renderRoot.querySelector(".canvas-container")||this,{storageKey:"home_architect_canvas_hud_pos",onPositionChanged:()=>this.requestUpdate()}),this.coordsHudDrag=new Me(()=>this.renderRoot.querySelector(".coords-hud"),()=>this.renderRoot.querySelector(".canvas-container")||this,{storageKey:"home_architect_coords_hud_pos",onPositionChanged:()=>this.requestUpdate()}),this.helpHudDrag=new Me(()=>this.renderRoot.querySelector(".help-hud"),()=>this.renderRoot.querySelector(".canvas-container")||this,{storageKey:"home_architect_help_hud_pos",onPositionChanged:()=>this.requestUpdate()}),this.compassHudDrag=new Me(()=>this.renderRoot.querySelector(".compass-hud"),()=>this.renderRoot.querySelector(".canvas-container")||this,{storageKey:"home_architect_compass_hud_pos",onPositionChanged:()=>this.requestUpdate()}),this.view3dIntro=null,this.hint=null,this.hintTimer=null,this.pointers=new Ac,this.gestureOccurred=!1,this.canvasSize={width:0,height:0},this.resizeObserver=null,this.viewTouched=!1,this.pendingFitPadding=null,this.lastEmittedProject=null,this.localProject=null,this.selectionPruned=!1,this.keyboardBound=!1,this.entityRevision=0,this.colorScheme="dark",this.intersectionObserver=null,this.cameraAnimation=null,this.cameraTarget=null,this.onKeyDown=t=>this.handleKeyDown(t),this.pinGestures=new Nl({onTap:t=>this.runPinAction(t,"tap"),onDoubleTap:t=>this.runPinAction(t,"double_tap"),onHold:t=>this.runPinAction(t,"hold"),waitsForDoubleTap:t=>{const e=this.project.bindings.find(r=>r.id===t);return!!e&&bo(e,"tap").kind!=="more-info"}}),this.watchedEntityIds=yt((t,e)=>Il(t,e)),this.displayableBindings=yt(t=>t.filter(e=>typeof e.entityId=="string")),this.wallPolygons=yt(t=>Ae(t)),this.wallHeights=yt((t,e,r)=>Zl(t,e,r)),this.roomLooks=yt((t,e,r,i)=>new Map(t.map(o=>[o.id,wl(o,e,this.hass,r)]))),this.pinViews=yt((t,e)=>new Map(t.map(r=>[r.id,Tl(r,this.hass)]))),this.planBounds=yt(t=>Pr.contentBounds(t)),this.wallScene=yt((t,e,r,i,o,s,a,c,h,l)=>{const u=s*o.zoom;return Ql({walls:t,openings:e,polygons:this.wallPolygons(t),heights:this.wallHeights(t,r,i),toView:d=>({x:d.x*u+o.x,y:d.y*u+o.y}),scale:u,heightScale:lh,basis:ei({pitchDeg:a,yawDeg:c}),center:{x:h/2,y:l/2}})}),this.addEventListener("pointerdown",t=>this.handlePointerDownCapture(t),{capture:!0}),this.addEventListener("pointermove",t=>{this.pointers.move(t.pointerId,t.clientX,t.clientY),this.pinGestures.move(t.clientX,t.clientY)},{capture:!0}),this.addEventListener("pointerup",t=>{this.pointers.delete(t.pointerId),this.pinGestures.up()},{capture:!0}),this.addEventListener("pointercancel",t=>{this.pointers.delete(t.pointerId),this.pinGestures.cancel()},{capture:!0})}cycleLightingMode3D(){this.lightingMode3D==="auto"?(this.lightingMode3D="day",this.nightMode3D=!1,this.flashHint("Éclairage : Jour forcé ☀️")):this.lightingMode3D==="day"?(this.lightingMode3D="night",this.nightMode3D=!0,this.flashHint("Éclairage : Nuit forcée 🌙")):(this.lightingMode3D="auto",this.nightMode3D=!1,this.flashHint("Éclairage : Auto ⛅ (synchro sun.sun)"))}get lightingModeIcon(){switch(this.lightingMode3D){case"day":return"☀️";case"night":return"🌙";default:return"⛅"}}get lightingModeTitle(){switch(this.lightingMode3D){case"day":return"Éclairage : Jour forcé (soleil de midi) — Cliquer pour forcer la Nuit (🌙)";case"night":return"Éclairage : Nuit forcée (lampes allumées) — Cliquer pour mode Auto (⛅)";default:return"Éclairage : Automatique (synchro soleil sun.sun) — Cliquer pour forcer le Jour (☀️)"}}setCameraPreset(t,e){const r=this.view3dElement;r?r.setCamera({pitchDeg:t,yawDeg:e}):this.animateCamera({pitchDeg:t,yawDeg:e})}get webgl3D(){return this.is3DMode&&this.view3d==="ready"}get view3dElement(){return this.webgl3D?this.renderRoot.querySelector("home-architect-3d-view"):null}get canSelect(){return this.interactive&&!this.isDashboardMode}get canEdit(){return this.canSelect&&!this.readOnly}get canEdit2D(){return this.canEdit&&!this.is3DMode}get selectsElements(){return this.canSelect&&(this.activeTool==="select"||!this.canEdit)}get ppm(){const t=this.project.pixelsPerMeter;return Number.isFinite(t)&&t>0?t:eo}get screenPpm(){return this.ppm*this.viewport.zoom}measuredSize(){if(this.canvasSize.width>0&&this.canvasSize.height>0)return this.canvasSize;const t=this.getBoundingClientRect();return t.width>0&&t.height>0?{width:t.width,height:t.height}:null}sizeOrFallback(){return this.measuredSize()??{width:this.clientWidth||800,height:this.clientHeight||600}}get geometry(){return{viewport:this.viewport,pixelsPerMeter:this.ppm,rotationDeg:this.is3DMode?0:this.viewRotation,size:this.sizeOrFallback()}}get camera(){return ei({pitchDeg:this.orbitPitch,yawDeg:this.orbitYaw})}localToPlanView(t,e=this.geometry){return this.is3DMode?Bl(t,this.camera,Ot(e.size)):io(t,e)}clientToWorld(t,e){const r=this.getBoundingClientRect();if(!this.is3DMode)return $c(t,e,r,this.geometry);const i=this.geometry;return oo(this.localToPlanView(St(t,e,r),i),i)}screenToWorld(t,e){return this.clientToWorld(t,e)}worldToClient(t){const e=this.getBoundingClientRect();if(!this.is3DMode)return _c(t,e,this.geometry);const r=this.geometry;return ro(lt(so(t,r),0,this.camera,Ot(r.size)),e)}worldToScreen(t){const e=this.screenPpm;return{x:t.x*e+this.viewport.x,y:t.y*e+this.viewport.y}}clientToView(t,e){return this.localToPlanView(St(t,e,this.getBoundingClientRect()))}pannedViewport(t,e){if(!this.is3DMode)return Mc(t,e,this.viewRotation);const r=wo(e,this.camera);return{x:t.x+r.x,y:t.y+r.y}}handleWheel(t){if(this.webgl3D)return;const e=t.ctrlKey||t.metaKey;if(this.isDashboardMode&&!e){this.flashHint(wh);return}t.preventDefault();const r=this.sizeOrFallback(),i=Dr(t.deltaY,t.deltaMode,r.height),o=Dr(t.deltaX,t.deltaMode,r.width);if(this.viewTouched=!0,!e&&o!==0){const a=this.pannedViewport(this.viewport,{x:-o,y:-i});this.viewport={...this.viewport,x:a.x,y:a.y};return}const s=pn(this.viewport.zoom*Pc(i,e),this.ppm);s!==this.viewport.zoom&&(this.viewport=Ir(this.viewport,this.clientToView(t.clientX,t.clientY),s))}zoomBy(t){const e=this.view3dElement;if(e){e.zoomBy(t);return}const r=pn(this.viewport.zoom*t,this.ppm);this.viewport=Ir(this.viewport,Ot(this.sizeOrFallback()),r),this.viewTouched=!0}zoomIn(){this.zoomBy(1.25)}zoomOut(){this.zoomBy(1/1.25)}beginInteraction(t){this.interaction=t;try{t.captureEl?.setPointerCapture(t.pointerId)}catch{}}endInteraction(){const t=this.interaction;if(this.interaction=di,!(t.kind==="none"||t.kind==="gesture"||!t.captureEl))try{t.captureEl.hasPointerCapture(t.pointerId)&&t.captureEl.releasePointerCapture(t.pointerId)}catch{}}cancelInteraction(){const t=this.interaction;t.kind!=="none"&&("base"in t&&this.project!==t.base&&this.setLocalProject(t.base),t.kind==="marquee"?(this.marqueeStart=null,this.marqueeCurrent=null):t.kind==="rect-room"&&(this.rectStart=null,this.rectCurrent=null),"base"in t&&this.clearPreview(),this.endInteraction())}handlePointerDownCapture(t){if(!(this.webgl3D||on(t,this,ai))){if(t.isPrimary&&(this.pointers.clear(),this.gestureOccurred=!1),this.pointers.set(t.pointerId,t.clientX,t.clientY,t.pointerType),this.pointers.size>=2){(this.interaction.kind==="gesture"||this.startGesture())&&t.stopPropagation();return}this.pendingPlacement&&this.canEdit2D&&t.isPrimary&&t.button===0&&this.interaction.kind==="none"&&(t.stopPropagation(),this.beginInteraction({kind:"placement",pointerId:t.pointerId,captureEl:this.renderRoot.querySelector(".canvas-container"),startClient:{x:t.clientX,y:t.clientY},startViewport:{x:this.viewport.x,y:this.viewport.y},pointerType:t.pointerType}))}}startGesture(){const t=this.pointers.pair();if(!t||t.types.includes("mouse"))return!1;this.cancelInteraction(),this.pinGestures.cancel(),this.stopCameraAnimation();const e=this.getBoundingClientRect(),r=St(t.points[0].x,t.points[0].y,e),i=St(t.points[1].x,t.points[1].y,e);return this.interaction={kind:"gesture",ids:t.ids,startDistance:Math.max(te(r,i),1),startMidLocal:Cr(r,i),startViewport:{...this.viewport}},this.gestureOccurred=!0,!0}updateGesture(t){const e=this.pointers.get(t.ids[0]),r=this.pointers.get(t.ids[1]);if(!e||!r)return;const i=this.getBoundingClientRect(),o=St(e.x,e.y,i),s=St(r.x,r.y,i),a=Cr(o,s),c=te(o,s)/t.startDistance,h=this.geometry;this.viewport=Cc(t.startViewport,this.localToPlanView(t.startMidLocal,h),this.localToPlanView(a,h),c,this.ppm),this.viewTouched=!0}beginPan(t,e){this.beginInteraction({kind:"pan",pointerId:t.pointerId,captureEl:e,startClient:{x:t.clientX,y:t.clientY},startViewport:{x:this.viewport.x,y:this.viewport.y}})}beginOrbit(t,e){this.stopCameraAnimation(),this.beginInteraction({kind:"orbit",pointerId:t.pointerId,captureEl:e,startClient:{x:t.clientX,y:t.clientY},startPitch:this.orbitPitch,startYaw:this.orbitYaw})}updatePan(t,e){const r=this.pannedViewport(t.startViewport,{x:e.clientX-t.startClient.x,y:e.clientY-t.startClient.y});this.viewport={...this.viewport,x:r.x,y:r.y},this.viewTouched=!0}convertToPan(t,e){this.interaction={kind:"pan",pointerId:t.pointerId,captureEl:t.captureEl,startClient:t.startClient,startViewport:t.startViewport},this.updatePan(t,e)}convertToMarquee(t,e){this.interaction={kind:"marquee",pointerId:t.pointerId,captureEl:t.captureEl},this.marqueeStart=t.startWorld,this.marqueeCurrent=this.clientToWorld(e.clientX,e.clientY)}convertToOrbit(t,e){this.stopCameraAnimation(),this.interaction={kind:"orbit",pointerId:t.pointerId,captureEl:t.captureEl,startClient:t.startClient,startPitch:this.orbitPitch,startYaw:this.orbitYaw},this.updateOrbit(this.interaction,e)}updateOrbit(t,e){this.orbitYaw=(t.startYaw+(e.clientX-t.startClient.x)*.55)%360,this.orbitPitch=Math.max(15,Math.min(85,t.startPitch-(e.clientY-t.startClient.y)*.38))}handlePointerDown(t){if(this.webgl3D||on(t,this,ai)||this.interaction.kind!=="none"||!t.isPrimary)return;const e=t.currentTarget;if(this.is3DMode){t.button===1||t.button===0&&t.shiftKey?this.beginPan(t,e):t.button===2||t.button===0&&t.altKey?this.beginOrbit(t,e):t.button===0&&!on(t,this,ch)&&(this.canSelect&&this.setSelection(ut()),this.beginOrbit(t,e));return}if(t.button===1){this.beginPan(t,e);return}if(t.button===0){if(!this.canSelect){t.pointerType==="mouse"&&this.beginPan(t,e);return}if(this.activeTool==="select"||!this.canEdit){if(t.shiftKey){const r=this.clientToWorld(t.clientX,t.clientY);this.marqueeStart=r,this.marqueeCurrent=r,this.beginInteraction({kind:"marquee",pointerId:t.pointerId,captureEl:e});return}this.setSelection(ut()),this.beginPan(t,e);return}if(t.shiftKey){this.beginPan(t,e);return}if(this.activeTool==="rect_room"){this.beginRectRoom(t,e);return}this.beginInteraction({kind:"tool-tap",pointerId:t.pointerId,captureEl:e,startClient:{x:t.clientX,y:t.clientY},startViewport:{x:this.viewport.x,y:this.viewport.y},pointerType:t.pointerType}),this.updateHover(t)}}handlePointerMove(t){if(this.webgl3D)return;const e=this.interaction;if(e.kind==="gesture"){e.ids.includes(t.pointerId)&&this.updateGesture(e);return}if(e.kind==="none"){this.updateHover(t);return}if(e.pointerId===t.pointerId)switch(e.kind){case"pan":this.updatePan(e,t);return;case"orbit":this.updateOrbit(e,t);return;case"marquee":this.marqueeCurrent=this.clientToWorld(t.clientX,t.clientY);return;case"tool-tap":case"placement":Pe(e.startClient,{x:t.clientX,y:t.clientY},e.pointerType)?this.convertToPan(e,t):e.kind==="tool-tap"&&this.updateHover(t);return;case"rect-room":this.updateRectRoom(t);return;case"press":this.updatePress(e,t);return;case"furniture-rotate":this.updateFurnitureRotation(e,t);return;case"furniture-resize":this.updateFurnitureResize(e,t);return;case"wall-endpoint":this.updateWallEndpoint(e,t);return;case"room-vertex":this.updateRoomVertex(e,t);return}}handlePointerUp(t){const e=this.interaction;if(e.kind==="gesture"){e.ids.includes(t.pointerId)&&this.endInteraction();return}if(!(e.kind==="none"||e.pointerId!==t.pointerId)){switch(e.kind){case"marquee":this.finishMarquee();break;case"tool-tap":this.applyToolTap(t);break;case"placement":this.placePending(t);break;case"rect-room":this.finishRectRoom(e,t);break;case"press":this.finishPress(e);break;case"furniture-rotate":this.furnitureChanged(e.base,e.itemId,["rotation"])&&this.dispatchProjectChanged();break;case"furniture-resize":this.furnitureChanged(e.base,e.itemId,["width","length"])&&this.dispatchProjectChanged();break;case"wall-endpoint":case"room-vertex":this.clearPreview(),this.project!==e.base&&this.dispatchProjectChanged();break}this.endInteraction()}}handlePointerCancel(t){const e=this.interaction;e.kind!=="none"&&(e.kind==="gesture"?e.ids.includes(t.pointerId):e.pointerId===t.pointerId)&&this.cancelInteraction()}handleLostPointerCapture(t){const e=this.interaction;e.kind==="none"||e.kind==="gesture"||e.pointerId===t.pointerId&&e.captureEl===t.target&&this.cancelInteraction()}handlePointerLeave(){this.interaction.kind==="none"&&(this.clearPreview(),this.wallSnap=null,this.openingFit=null)}handleDoubleClick(t){this.canEdit2D&&(this.activeTool==="room"&&this.roomDraft.length>=3?(t.preventDefault(),this.closeRoomDraft()):this.activeTool==="wall"&&this.drawingWallStart&&(this.drawingWallStart=null,this.clearPreview()))}setPreview(t){this.previewPoint=t.point,this.snapInfo={snappedTo:t.snappedTo,guideAngle:t.guideAngle,smartGuideX:t.smartGuideX,smartGuideY:t.smartGuideY,wallId:t.wallId}}clearPreview(){this.previewPoint=null,this.snapInfo=ui}get effectiveGrid(){const t=this.project.grid;return!!(this.project.background&&this.project.background.visible!==!1)&&t.snapToGrid&&(t.size||.5)>.02?{...t,snapToGrid:!1}:t}snapDraw(t,e,r){return $e(t,this.effectiveGrid,this.project.walls,e,this.screenPpm,r)}snapRoomVertex(t,e){const r=this.roomDraft;return r.length>=3&&te(t,r[0])*this.screenPpm<=li?{point:{...r[0]},snappedTo:"vertex",constraints:["vertex"]}:this.snapDraw(t,r[r.length-1],e)}updateHover(t){if(this.isDashboardMode)return;const e=this.clientToWorld(t.clientX,t.clientY);if(this.cursorCoords={x:I.roundMeters(e.x),y:I.roundMeters(e.y)},this.paintCoords(),!this.canEdit2D){this.clearPreview();return}const r=t.altKey;switch(this.activeTool){case"wall":this.setPreview(this.snapDraw(e,this.drawingWallStart??void 0,r));break;case"room":this.setPreview(this.snapRoomVertex(e,r));break;case"rect_room":{const i=this.snapDraw(e,void 0,r);this.setPreview(i),this.rectStart&&(this.rectCurrent=i.point);break}case"door":case"window":case"french_window":this.clearPreview(),this.updateOpeningPreview(e);break;case"calibrate":this.clearPreview(),this.calibrateStart&&(this.calibrateCurrent=e);break;case"rescale":{const i=Wr(e,this.project.walls,this.screenPpm,r);this.setPreview(i),this.rescaleStart&&(this.rescaleCurrent=i.point);break}default:this.clearPreview();break}}currentOpeningType(){switch(this.activeTool){case"door":return"door";case"window":return"window";case"french_window":return"french_window";default:return null}}requestedOpeningWidth(t){const e=t==="door"?.9:t==="french_window"?2:this.windowSashCount===2?1.4:.9;return this.currentOpeningWidth||e}computeOpeningPlacement(t){const e=this.currentOpeningType();if(!e)return null;const r=fo(t,this.project.walls,this.screenPpm);if(!r)return null;const i=I.fitOpening(r.wall,r.offset,this.requestedOpeningWidth(e),{walls:this.project.walls,openings:this.project.openings});return{snap:r,fit:i}}updateOpeningPreview(t){const e=this.computeOpeningPlacement(t);this.wallSnap=e?.snap??null,this.openingFit=e?.fit??null}applyToolTap(t){if(!this.canEdit2D)return;const e=this.clientToWorld(t.clientX,t.clientY),r=t.altKey;switch(this.activeTool){case"wall":this.tapWall(e,r);break;case"room":this.tapRoomVertex(e,r);break;case"door":case"window":case"french_window":this.tapOpening(e);break;case"calibrate":this.tapCalibrate(e);break;case"rescale":this.tapRescale(e,r);break}}tapWall(t,e){const r=this.snapDraw(t,this.drawingWallStart??void 0,e).point;if(!this.drawingWallStart){this.drawingWallStart=r;return}const i=this.drawingWallStart;if(I.distance(i,r)<ph)return;const o={id:Ht("wall"),start:{...i},end:{...r},thickness:this.currentWallThickness,type:"standard"};this.commitProject({...this.project,walls:[...this.project.walls,o]}),this.drawingWallStart=r}tapRoomVertex(t,e){const r=this.roomDraft;if(r.length>=3&&te(t,r[0])*this.screenPpm<=li){this.closeRoomDraft();return}const i=this.snapRoomVertex(t,e).point,o=r[r.length-1];o&&te(i,o)*this.screenPpm<=yh||(this.roomDraft=[...r,i])}closeRoomDraft(){const t=uo(this.roomDraft);if(t){this.flashHint(hi[t]);return}const e=jr(this.roomDraft,this.project.rooms);this.roomDraft=[],this.clearPreview(),this.addRoom(e)}addRoom(t){this.commitProject(pe({...this.project,rooms:[...this.project.rooms,t]})),this.setSelection(gt({kind:"room",id:t.id})),this.emitRoomSelected(t)}emitRoomSelected(t){this.dispatchEvent(new CustomEvent("room-selected",{detail:{room:t},bubbles:!0,composed:!0}))}beginRectRoom(t,e){const r=this.snapDraw(this.clientToWorld(t.clientX,t.clientY),void 0,t.altKey).point;this.rectStart||(this.rectStart=r),this.rectCurrent=r,this.beginInteraction({kind:"rect-room",pointerId:t.pointerId,captureEl:e,startClient:{x:t.clientX,y:t.clientY},pointerType:t.pointerType})}updateRectRoom(t){const e=this.snapDraw(this.clientToWorld(t.clientX,t.clientY),void 0,t.altKey);this.setPreview(e),this.rectCurrent=e.point}finishRectRoom(t,e){const r=this.rectStart,i=this.rectCurrent;if(!r||!i)return;const o=Pe(t.startClient,{x:e.clientX,y:e.clientY},t.pointerType);if(Math.abs(i.x-r.x)>=ci&&Math.abs(i.y-r.y)>=ci){this.rectStart=null,this.rectCurrent=null,this.clearPreview(),this.addRoom(jr(zr(r,i),this.project.rooms));return}!o&&I.distance(r,i)<1e-9||(this.rectStart=null,this.rectCurrent=null,this.flashHint(hi["too-small"]))}tapOpening(t){const e=this.currentOpeningType(),r=this.computeOpeningPlacement(t);if(this.wallSnap=r?.snap??null,this.openingFit=r?.fit??null,!e||!r)return;const{snap:i,fit:o}=r;if(!o.fits){this.flashHint("Mur trop court pour cette ouverture.");return}if(o.overlaps.length>0){this.flashHint("Une ouverture occupe déjà cet emplacement.");return}const s={id:Ht("op"),wallId:i.wall.id,type:e,offset:o.offset,width:o.width,flipSide:this.openingFlipSide,flipDirection:this.openingFlipDirection,sashCount:this.sashCountFor(e)};this.commitProject({...this.project,openings:[...this.project.openings,s]}),this.updateOpeningPreview(t)}tapCalibrate(t){if(!this.calibrateStart){this.calibrateStart=t,this.calibrateCurrent=t;return}const e=I.distance(this.calibrateStart,t);e*this.screenPpm<mh||(this.dispatchEvent(new CustomEvent("request-calibration",{detail:{worldDistance:e,defaultMeters:I.roundMeters(e)},bubbles:!0,composed:!0})),this.calibrateStart=null,this.calibrateCurrent=null)}tapRescale(t,e){const r=Wr(t,this.project.walls,this.screenPpm,e).point;if(!this.rescaleStart){this.rescaleStart=r,this.rescaleCurrent=r;return}const i=I.distance(this.rescaleStart,r);i<gh||(this.dispatchEvent(new CustomEvent("request-rescale",{detail:{measuredMeters:i},bubbles:!0,composed:!0})),this.rescaleStart=null,this.rescaleCurrent=null,this.clearPreview())}resetToolState(){this.drawingWallStart=null,this.roomDraft=[],this.rectStart=null,this.rectCurrent=null,this.calibrateStart=null,this.calibrateCurrent=null,this.rescaleStart=null,this.rescaleCurrent=null,this.wallSnap=null,this.openingFit=null,this.clearPreview()}setSelection(t){Rc(t,this.selectedElements)||(this.selectedElements=t,this.dispatchSelectionChanged())}dispatchSelectionChanged(){this.dispatchEvent(new CustomEvent("selection-changed",{detail:{selectedElements:this.selectedElements},bubbles:!0,composed:!0}))}handleElementPointerDown(t,e){if(e.button!==0||!e.isPrimary||!this.selectsElements||this.interaction.kind!=="none")return;e.stopPropagation();const r=e.shiftKey||e.ctrlKey||e.metaKey,i=Ze(this.selectedElements,t);t.kind!=="room"&&!i&&this.setSelection(r?Je(this.selectedElements,t):gt(t));const o=this.clientToWorld(e.clientX,e.clientY);this.beginInteraction({kind:"press",ref:t,pointerId:e.pointerId,captureEl:e.currentTarget,startClient:{x:e.clientX,y:e.clientY},startWorld:o,startViewport:{x:this.viewport.x,y:this.viewport.y},pointerType:e.pointerType,modifier:r,wasSelected:i,mode:"pending",base:this.project,moveSet:null,anchor:o,snap:"free"})}updatePress(t,e){if(t.mode==="pending"){if(!Pe(t.startClient,{x:e.clientX,y:e.clientY},t.pointerType))return;if(this.is3DMode){this.convertToOrbit(t,e);return}if(t.ref.kind==="room"&&t.modifier){this.convertToMarquee(t,e);return}if(t.ref.kind==="room"&&!t.wasSelected||!this.canEdit2D){this.convertToPan(t,e);return}if(t.ref.kind==="opening")t.mode="slide";else{const r=Or(t.base,this.selectedElements);if(Lr(r)){t.mode="idle";return}t.moveSet=r,Object.assign(t,this.dragAnchor(t.ref,t.startWorld,t.base)),t.mode="move"}}t.mode==="move"?this.dragSelection(t,e):t.mode==="slide"&&this.dragOpening(t,e)}dragAnchor(t,e,r){const i=o=>o.reduce((s,a)=>I.distance(a,e)<I.distance(s,e)?a:s);switch(t.kind){case"wall":{const o=r.walls.find(s=>s.id===t.id);if(o)return{anchor:i([o.start,o.end]),snap:"structure"};break}case"room":{const o=r.rooms.find(s=>s.id===t.id);if(o&&o.polygon.length>0)return{anchor:i(o.polygon),snap:"structure"};break}case"furniture":{const o=(r.furniture||[]).find(s=>s.id===t.id);if(o)return{anchor:o.position,snap:"furniture"};break}case"binding":{const o=r.bindings.find(s=>s.id===t.id);if(o)return{anchor:o.position,snap:"free"};break}}return{anchor:e,snap:"free"}}dragSelection(t,e){const r=t.moveSet;if(!r)return;const i=this.clientToWorld(e.clientX,e.clientY),o={x:t.anchor.x+i.x-t.startWorld.x,y:t.anchor.y+i.y-t.startWorld.y};let s;if(t.snap==="structure"){const c=new Set(r.wallIds),h=$e(o,this.effectiveGrid,t.base.walls,void 0,this.screenPpm,e.altKey,{excludeWallIds:r.wallIds,excludePoints:t.base.walls.filter(l=>c.has(l.id)).flatMap(l=>[l.start,l.end])});this.setPreview(h),s=h.point}else if(t.snap==="furniture"&&this.effectiveGrid.snapToGrid&&e.altKey){const c=this.effectiveGrid.size||.5;s={x:I.quantize(o.x,c),y:I.quantize(o.y,c)}}else s=I.roundPoint(o);const a=Nr(t.base,r,{x:s.x-t.anchor.x,y:s.y-t.anchor.y});a&&this.setLocalProject(a)}dragOpening(t,e){const r=t.base.openings.find(h=>h.id===t.ref.id),i=r?t.base.walls.find(h=>h.id===r.wallId):void 0;if(!r||!i)return;const o=this.clientToWorld(e.clientX,e.clientY),s=r.offset+Fr(i,o)-Fr(i,t.startWorld),a=e.altKey?s:I.quantize(s,bh),c=Yc(t.base,r.id,a);c&&this.setLocalProject(c)}finishPress(t){if(t.mode!=="pending"){this.clearPreview(),this.project!==t.base&&this.dispatchProjectChanged();return}const e=this.selectedElements,r=t.ref;let i=e;r.kind==="room"?i=t.modifier?t.wasSelected?Qe(e,r):Je(e,r):gt(r):t.modifier?t.wasSelected&&(i=Qe(e,r)):(tn(e)>1||!Ze(e,r))&&(i=gt(r)),this.setSelection(i)}finishMarquee(){const t=this.marqueeStart,e=this.marqueeCurrent;if(this.marqueeStart=null,this.marqueeCurrent=null,!t||!e)return;const r=Math.min(t.x,e.x),i=Math.max(t.x,e.x),o=Math.min(t.y,e.y),s=Math.max(t.y,e.y);if(i-r<=.05&&s-o<=.05)return;const a=f=>f.x>=r&&f.x<=i&&f.y>=o&&f.y<=s,c=this.project.walls.filter(f=>a({x:(f.start.x+f.end.x)/2,y:(f.start.y+f.end.y)/2})).map(f=>f.id),h=this.project.openings.filter(f=>{const m=this.project.walls.find(b=>b.id===f.wallId);if(!m)return!1;const g=m.end.x-m.start.x,x=m.end.y-m.start.y,y=Math.sqrt(g*g+x*x);return y===0?!1:a({x:m.start.x+f.offset/y*g,y:m.start.y+f.offset/y*x})}).map(f=>f.id),l=this.project.rooms.filter(f=>f.polygon&&f.polygon.length>=3&&a(G.labelPoint(f.polygon))).map(f=>f.id),u=this.project.bindings.filter(f=>a(f.position)).map(f=>f.id),d=(this.project.furniture||[]).filter(f=>a(f.position)).map(f=>f.id),p=this.selectedElements;this.setSelection({wallIds:Array.from(new Set([...p.wallIds,...c])),openingIds:Array.from(new Set([...p.openingIds,...h])),roomIds:Array.from(new Set([...p.roomIds,...l])),bindingIds:Array.from(new Set([...p.bindingIds,...u])),furnitureIds:Array.from(new Set([...p.furnitureIds||[],...d]))})}selectFurniture(t){this.selectedElements.furnitureIds?.includes(t)||this.setSelection(gt({kind:"furniture",id:t}))}furnitureChanged(t,e,r){const i=(t.furniture||[]).find(s=>s.id===e),o=(this.project.furniture||[]).find(s=>s.id===e);return!!i&&!!o&&r.some(s=>i[s]!==o[s])}replaceFurniture(t,e,r){this.setLocalProject({...t,furniture:(t.furniture||[]).map(i=>i.id===e?{...i,...r}:i)})}handleFurnitureRotatePointerDown(t,e){if(!this.canEdit2D||e.button!==0||this.interaction.kind!=="none")return;e.stopPropagation();const r=this.clientToWorld(e.clientX,e.clientY),i=Math.atan2(r.y-t.position.y,r.x-t.position.x)*(180/Math.PI);this.selectFurniture(t.id),this.beginInteraction({kind:"furniture-rotate",pointerId:e.pointerId,captureEl:e.currentTarget,itemId:t.id,startAngle:i,initialAngle:t.rotation||0,base:this.project})}updateFurnitureRotation(t,e){const r=(t.base.furniture||[]).find(a=>a.id===t.itemId);if(!r)return;const i=this.clientToWorld(e.clientX,e.clientY),o=Math.atan2(i.y-r.position.y,i.x-r.position.x)*(180/Math.PI);let s=Math.round(t.initialAngle+o-t.startAngle);s=(s%360+360)%360,this.replaceFurniture(t.base,t.itemId,{rotation:s})}handleFurnitureResizePointerDown(t,e){if(!this.canEdit2D||e.button!==0||this.interaction.kind!=="none")return;e.stopPropagation();const r=et(t.type);this.selectFurniture(t.id),this.beginInteraction({kind:"furniture-resize",pointerId:e.pointerId,captureEl:e.currentTarget,itemId:t.id,startClient:{x:e.clientX,y:e.clientY},initialWidth:t.width||r?.width||1,initialLength:t.length||r?.length||1,base:this.project})}updateFurnitureResize(t,e){const r=(t.base.furniture||[]).find(m=>m.id===t.itemId);if(!r)return;const i=this.clientToWorld(e.clientX,e.clientY),o=this.clientToWorld(t.startClient.x,t.startClient.y),s=i.x-o.x,a=i.y-o.y,c=(r.rotation||0)*Math.PI/180,h=Math.cos(c),l=Math.sin(c),u=s*h+a*l,d=-s*l+a*h;let p=Math.max(ke,t.initialWidth+u),f=Math.max(ke,t.initialLength+d);if(e.shiftKey&&t.initialWidth>0&&t.initialLength>0){const m=t.initialLength/t.initialWidth,g=Math.max(p/t.initialWidth,f/t.initialLength);p=Math.max(ke,t.initialWidth*g),f=Math.max(ke,p*m)}this.replaceFurniture(t.base,t.itemId,{width:Math.round(p*1e3)/1e3,length:Math.round(f*1e3)/1e3})}handleWallEndpointPointerDown(t,e,r){!this.canEdit2D||r.button!==0||this.interaction.kind!=="none"||(r.stopPropagation(),this.beginInteraction({kind:"wall-endpoint",pointerId:r.pointerId,captureEl:r.currentTarget,wallId:t.id,which:e,base:this.project}))}updateWallEndpoint(t,e){const r=t.base.walls.find(a=>a.id===t.wallId);if(!r)return;const i=t.which==="start"?r.end:r.start,o=$e(this.clientToWorld(e.clientX,e.clientY),this.effectiveGrid,t.base.walls,i,this.screenPpm,e.altKey,{excludeWallIds:[r.id],excludePoints:[r[t.which]]});if(this.setPreview(o),I.distance(o.point,i)<ao)return;const s=Uc(t.base,r.id,t.which,o.point);s&&this.setLocalProject(s)}handleRoomVertexPointerDown(t,e,r){!this.canEdit2D||r.button!==0||this.interaction.kind!=="none"||(r.stopPropagation(),this.beginInteraction({kind:"room-vertex",pointerId:r.pointerId,captureEl:r.currentTarget,roomId:t.id,index:e,base:this.project}))}updateRoomVertex(t,e){const r=$e(this.clientToWorld(e.clientX,e.clientY),this.effectiveGrid,t.base.walls,void 0,this.screenPpm,e.altKey);this.setPreview(r);const i=Hc(t.base,t.roomId,t.index,r.point);i&&this.setLocalProject(i)}static carriesFiles(t){return Array.from(t.dataTransfer?.types??[]).includes("Files")}handleDragOver(t){if(!this.canEdit2D){if(!bt.carriesFiles(t))return;t.preventDefault(),t.dataTransfer&&(t.dataTransfer.dropEffect="none");return}t.preventDefault(),t.dataTransfer&&(t.dataTransfer.dropEffect="copy")}handleDrop(t){if(!this.canEdit2D){bt.carriesFiles(t)&&t.preventDefault();return}t.preventDefault();const e=t.dataTransfer?.files?.[0];if(e&&(e.type.startsWith("image/")||e.name.toLowerCase().endsWith(".svg"))){lc(e).then(o=>this.dispatchEvent(new CustomEvent("background-image-loaded",{detail:{dataUrl:o},bubbles:!0,composed:!0})),o=>{console.error("[home-architect] Lecture de l'image déposée impossible :",o),this.flashHint("Image illisible.")});return}const r=t.dataTransfer?.getData("application/json");if(!r)return;let i;try{i=Xc(JSON.parse(r))}catch{i=null}i&&this.placeDrawerItem(i,this.clientToWorld(t.clientX,t.clientY))&&this.focus({preventScroll:!0})}placePending(t){const e=this.pendingPlacement;!e||!this.canEdit2D||this.placeDrawerItem(e,this.clientToWorld(t.clientX,t.clientY))&&this.dispatchPlacementDone(!0)}dispatchPlacementDone(t){this.dispatchEvent(new CustomEvent("placement-done",{detail:{placed:t},bubbles:!0,composed:!0}))}placeDrawerItem(t,e){if(t.kind==="furniture"){const i=Vc(t.furnitureType,e,this.project.rooms);return i?(this.commitProject({...this.project,furniture:[...this.project.furniture||[],i]}),this.setSelection(gt({kind:"furniture",id:i.id})),!0):(this.flashHint("Meuble inconnu du catalogue."),!1)}if(this.hass?.states&&!this.hass.states[t.entityId])return this.flashHint(`Entité introuvable : ${t.entityId}`),!1;const r=Gc(t.entityId,e,this.project.rooms);return this.commitProject({...this.project,bindings:[...this.project.bindings,r]}),!0}runPinAction(t,e){const r=this.project.bindings.find(i=>i.id===t);!r||!this.isDashboardMode||Qr(r,e,{host:this,hass:this.hass,onError:i=>this.flashHint(i)})}openMoreInfo(t){this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:t},bubbles:!0,composed:!0}))}handlePinPointerDown(t,e){if(!this.isDashboardMode){this.handleElementPointerDown({kind:"binding",id:t.id},e);return}if(e.stopPropagation(),!(e.button!==0||!e.isPrimary||this.pointers.size>1)){try{e.currentTarget.setPointerCapture(e.pointerId)}catch{}this.pinGestures.down(t.id,e.clientX,e.clientY,e.pointerType)}}handlePinClick(t,e){this.isDashboardMode&&(e.stopPropagation(),!this.gestureOccurred&&this.pinGestures.click(t.id))}handlePinDblClick(t,e){this.isDashboardMode||!this.selectsElements||(e.stopPropagation(),this.openMoreInfo(t.entityId))}handlePinKeyDown(t,e){const r=e.key==="ContextMenu"||e.key==="Enter"&&e.shiftKey||e.key==="F10"&&e.shiftKey;!(!r&&(e.key==="Enter"||e.key===" "||e.key==="Spacebar"))&&!r||!this.isDashboardMode&&!this.canSelect||(e.preventDefault(),e.stopPropagation(),!e.repeat&&(this.isDashboardMode?Qr(t,r?"hold":"tap",{host:this,hass:this.hass,onError:o=>this.flashHint(o)}):r?this.openMoreInfo(t.entityId):this.setSelection(gt({kind:"binding",id:t.id}))))}handlePinContextMenu(t){this.isDashboardMode&&t.preventDefault()}handleRoomDblClick(t,e){this.canSelect&&(t.stopPropagation(),this.emitRoomSelected(e))}rotateSelectedFurniture(){const t=this.selectedElements.furnitureIds;if(!this.canEdit||!t||t.length===0)return;const e=(this.project.furniture||[]).map(r=>t.includes(r.id)?{...r,rotation:((r.rotation||0)+90)%360}:r);this.commitProject({...this.project,furniture:e})}nudgeSelection(t,e){const i={ArrowLeft:{x:-1,y:0},ArrowRight:{x:1,y:0},ArrowUp:{x:0,y:-1},ArrowDown:{x:0,y:1}}[t];if(!i)return!1;const o=Or(this.project,this.selectedElements);if(Lr(o))return!1;const s=e?this.project.grid.size>0?this.project.grid.size:.5:xh,a=Ue(i,-this.viewRotation),c=Nr(this.project,o,{x:a.x*s,y:a.y*s});return c&&c!==this.project&&this.commitProject(c),!0}handleKeyDown(t){if(this.isDashboardMode||!this.canSelect||t.defaultPrevented||!tc(t,{host:this,modalOpen:this.modalOpen}))return;const e=t.key;if(e==="Escape"){this.pendingPlacement&&this.dispatchPlacementDone(!1),this.cancelInteraction(),this.resetToolState(),this.setSelection(ut());return}if(!Qa(t))if(e==="Enter"&&this.activeTool==="room"&&this.roomDraft.length>=3&&this.canEdit2D)t.preventDefault(),this.closeRoomDraft();else if((e===" "||e==="Spacebar"||e.toLowerCase()==="f")&&this.wallSnap&&this.currentOpeningType()){if(t.preventDefault(),t.repeat)return;const r=e.toLowerCase()==="f"?this.openingFlipSide:!this.openingFlipSide,i=e.toLowerCase()==="f"?!this.openingFlipDirection:this.openingFlipDirection;this.dispatchEvent(new CustomEvent("opening-config-changed",{detail:{flipSide:r,flipDirection:i},bubbles:!0,composed:!0}))}else e.toLowerCase()==="r"?this.selectedElements.furnitureIds&&this.selectedElements.furnitureIds.length>0&&this.canEdit&&(t.preventDefault(),t.repeat||this.rotateSelectedFurniture()):e.startsWith("Arrow")&&this.canEdit2D&&this.interaction.kind==="none"&&this.nudgeSelection(e,t.shiftKey)&&t.preventDefault()}syncKeyboardSupport(){const t=this.isConnected&&!this.isDashboardMode;t&&!this.keyboardBound?(window.addEventListener("keydown",this.onKeyDown),this.keyboardBound=!0):!t&&this.keyboardBound&&(window.removeEventListener("keydown",this.onKeyDown),this.keyboardBound=!1),this.isDashboardMode?this.removeAttribute("tabindex"):this.hasAttribute("tabindex")||this.setAttribute("tabindex","-1")}flashHint(t){this.hint=t,this.hintTimer&&clearTimeout(this.hintTimer),this.hintTimer=setTimeout(()=>{this.hint=null,this.hintTimer=null},vh)}connectedCallback(){super.connectedCallback(),this.syncKeyboardSupport(),typeof ResizeObserver<"u"&&(this.resizeObserver=new ResizeObserver(t=>this.handleResize(t[t.length-1]?.contentRect)),this.resizeObserver.observe(this)),typeof IntersectionObserver<"u"&&(this.intersectionObserver=new IntersectionObserver(t=>{const e=t[t.length-1];e&&this.toggleAttribute("offscreen",!e.isIntersecting)}),this.intersectionObserver.observe(this))}disconnectedCallback(){super.disconnectedCallback(),this.syncKeyboardSupport(),this.resizeObserver?.disconnect(),this.resizeObserver=null,this.intersectionObserver?.disconnect(),this.intersectionObserver=null,this.hintTimer&&clearTimeout(this.hintTimer),this.hintTimer=null,this.hint=null,this.cancelInteraction(),this.pointers.clear(),this.pinGestures.dispose(),this.finishCameraAnimation()}shouldUpdate(t){return t.size===1&&t.has("hass")?Jr(t.get("hass"),this.hass,this.watchedEntities()):!0}handleResize(t){if(!t)return;const e=this.canvasSize,r=t.width!==e.width||t.height!==e.height;this.canvasSize={width:t.width,height:t.height},this.toggleAttribute("compact",t.width>0&&t.width<uh),r&&(t.width>0&&t.height>0&&(this.pendingFitPadding!==null||!this.viewTouched)?this.fitPlanView(this.pendingFitPadding??void 0):this.requestUpdate("canvasSize",e))}willUpdate(t){if(super.willUpdate(t),t.has("project")&&(this.project!==this.localProject&&this.handleExternalProjectDuringGesture(t.get("project")),this.handleProjectReplaced(t.get("project"))),t.has("hass")&&Jr(t.get("hass"),this.hass,this.watchedEntities())&&this.entityRevision++,(t.has("hass")||t.has("theme"))&&this.applyColorScheme(),t.has("animations")&&this.toggleAttribute("no-animations",!this.animations),t.has("is3DMode")&&t.get("is3DMode")!==void 0)if(this.is3DMode){const e={pitchDeg:this.orbitPitch,yawDeg:this.orbitYaw};this.orbitPitch=0,this.orbitYaw=this.viewRotation,this.animateCamera(e)}else this.finishCameraAnimation();if(t.has("is3DMode")&&this.is3DMode&&this.enterView3D(),t.has("activeTool")&&this.resetToolState(),(t.has("is3DMode")||t.has("interactive")||t.has("readOnly")||t.has("isDashboardMode"))&&!this.canEdit2D&&(this.interaction.kind!=="gesture"&&this.interaction.kind!=="pan"&&this.interaction.kind!=="orbit"&&this.cancelInteraction(),this.resetToolState()),t.has("project")||t.has("selectedElements")){const e=Lc(this.selectedElements,this.project);e!==this.selectedElements&&(this.selectedElements=e,this.selectionPruned=!0)}}updated(t){super.updated(t),this.selectionPruned&&(this.selectionPruned=!1,this.dispatchSelectionChanged()),t.has("isDashboardMode")&&this.syncKeyboardSupport(),this.paintCoords(),this.canvasHudDrag.applyStoredPosition(),this.coordsHudDrag.applyStoredPosition(),this.helpHudDrag.applyStoredPosition(),this.compassHudDrag.applyStoredPosition()}applyColorScheme(){const t=this.hass?.themes?.darkMode,e=this.theme!=="light"&&this.theme!=="dark"&&typeof t=="boolean";this.colorScheme=this.theme==="light"||e&&t===!1?"light":"dark",this.setAttribute("scheme",this.colorScheme),this.toggleAttribute("follow-theme",e)}paintCoords(){const t=this.renderRoot;if(!t?.querySelector)return;const e=t.querySelector(".coords-x"),r=t.querySelector(".coords-y");e&&(e.textContent=`${this.cursorCoords.x.toFixed(2)} m`),r&&(r.textContent=`${this.cursorCoords.y.toFixed(2)} m`)}animateCamera(t){if(this.stopCameraAnimation(),!this.animations||fh()||typeof requestAnimationFrame!="function"){this.orbitPitch=t.pitchDeg,this.orbitYaw=t.yawDeg;return}const e=this.orbitPitch,r=this.orbitYaw,i=Xl(r,t.yawDeg),o=performance.now(),s=a=>{const c=Math.min(1,(a-o)/hh),h=1-Math.pow(1-c,3);this.orbitPitch=e+(t.pitchDeg-e)*h,this.orbitYaw=c<1?r+i*h:t.yawDeg,c<1?this.cameraAnimation=requestAnimationFrame(s):(this.cameraAnimation=null,this.cameraTarget=null)};this.cameraTarget=t,this.cameraAnimation=requestAnimationFrame(s)}stopCameraAnimation(){this.cameraAnimation!==null&&cancelAnimationFrame(this.cameraAnimation),this.cameraAnimation=null,this.cameraTarget=null}finishCameraAnimation(){const t=this.cameraTarget;this.stopCameraAnimation(),t&&(this.orbitPitch=t.pitchDeg,this.orbitYaw=t.yawDeg)}enterView3D(){if(rh()){this.activateView3D();return}this.view3d!=="loading"&&(this.view3d="loading",oh().then(()=>{this.view3d==="loading"&&(this.is3DMode?this.activateView3D():this.view3d="idle")},t=>{this.view3d="fallback",t instanceof Error&&this.is3DMode&&this.flashHint(t.message)}))}activateView3D(){const t=this.cameraTarget??{pitchDeg:this.orbitPitch,yawDeg:this.orbitYaw},e=this.cameraAnimation!==null?{pitchDeg:this.orbitPitch,yawDeg:this.orbitYaw}:null;this.stopCameraAnimation(),this.orbitPitch=t.pitchDeg,this.orbitYaw=t.yawDeg,this.view3dIntro={from:e,to:t},this.view3d="ready"}handleView3DError(t){ih(t.detail.message),this.view3d="fallback",this.flashHint(t.detail.message)}handleView3DCamera(t){this.orbitPitch=t.detail.pitchDeg,this.orbitYaw=t.detail.yawDeg,this.view3dZoom=t.detail.zoom}handleView3DHover(t){this.cursorCoords={x:I.roundMeters(t.detail.point.x),y:I.roundMeters(t.detail.point.y)},this.paintCoords()}handleView3DHint(t){this.flashHint(t.detail.message)}handleView3DPick(t){const{ref:e,modifier:r,double:i}=t.detail;if(!e){this.canSelect&&!r&&this.setSelection(ut());return}if(!this.selectsElements)return;if(i){if(e.kind==="binding"){const s=this.project.bindings.find(a=>a.id===e.id);s&&this.openMoreInfo(s.entityId)}else if(e.kind==="room"&&this.activeTool==="select"){const s=this.project.rooms.find(a=>a.id===e.id);s&&this.emitRoomSelected(s)}return}const o=this.selectedElements;this.setSelection(r?Ze(o,e)?Qe(o,e):Je(o,e):gt(e))}handleProjectReplaced(t){const e=this.project;if(!t||t.id!==e.id){this.endInteraction(),this.resetToolState(),this.viewTouched=!1,this.fitPlanView();return}if(this.viewTouched||this.isOwnEdit(e))return;(e.walls!==t.walls||e.rooms!==t.rooms||e.bindings!==t.bindings||e.furniture!==t.furniture||e.background!==t.background)&&(e.revision!==t.revision||!fi(t))&&this.fitPlanView()}handleExternalProjectDuringGesture(t){const e=this.interaction;if("base"in e){if(t===e.base){e.base=this.project;return}this.clearPreview(),this.endInteraction()}}isOwnEdit(t){const e=this.lastEmittedProject;if(!e)return!1;const r=t.furniture===e.furniture||(t.furniture?.length??0)===0&&(e.furniture?.length??0)===0;return t.walls===e.walls&&t.rooms===e.rooms&&t.bindings===e.bindings&&t.openings===e.openings&&r}dispatchProjectChanged(){this.lastEmittedProject=this.project,this.dispatchEvent(new CustomEvent("project-changed",{detail:{project:this.project},bubbles:!0,composed:!0}))}commitProject(t){this.setLocalProject(t),this.dispatchProjectChanged()}setLocalProject(t){this.localProject=t,this.project=t}watchedEntities(){const t=this.watchedEntityIds(this.project.bindings,this.is3DMode?this.project.openings:$h);return this.is3DMode?[...t,"sun.sun"]:t}renderBackgroundLayer(){const t=this.project.background,e=this.backgroundSrc||t?.imageUrl;if(!t||!e||!t.visible)return $;const r=this.screenPpm,i=t.offset||{x:0,y:0},o=t.scale||1;return w`
      <g
        class="background-image-layer"
        transform="translate(${i.x*r}, ${i.y*r}) scale(${this.viewport.zoom*o})"
        opacity=${t.opacity}
      >
        <image href=${e} x="0" y="0" width=${t.widthPx||1200} height=${t.heightPx||900} />
      </g>
    `}renderGhostLayer(){const t=this.ghostProject;if(!t?.walls?.length)return $;const e=this.screenPpm;return w`
      <g class="ghost-layer" opacity="0.45" pointer-events="none">
        ${t.walls.map(r=>w`
          <line class="ghost-wall" x1=${r.start.x*e} y1=${r.start.y*e} x2=${r.end.x*e} y2=${r.end.y*e} />
        `)}
      </g>
    `}renderGrid(){if(this.is3DMode)return this.renderGround3D();const e=(this.project.grid.size>0?this.project.grid.size:.5)*this.screenPpm;if(e<12)return $;const r=e*2;return w`
      <defs>
        <pattern id="grid-sub" width=${e} height=${e} patternUnits="userSpaceOnUse"
          patternTransform="translate(${this.viewport.x%e}, ${this.viewport.y%e})">
          <line class="grid-line" x1="0" y1="0" x2=${e} y2="0" />
          <line class="grid-line" x1="0" y1="0" x2="0" y2=${e} />
        </pattern>
        <pattern id="grid-major" width=${r} height=${r} patternUnits="userSpaceOnUse"
          patternTransform="translate(${this.viewport.x%r}, ${this.viewport.y%r})">
          <line class="grid-line-major" x1="0" y1="0" x2=${r} y2="0" />
          <line class="grid-line-major" x1="0" y1="0" x2="0" y2=${r} />
        </pattern>
      </defs>
      <rect x="-10000" y="-10000" width="20000" height="20000" fill="url(#grid-sub)" />
      <rect x="-10000" y="-10000" width="20000" height="20000" fill="url(#grid-major)" />
    `}renderGround3D(){const{x:t,y:e}=this.viewport,r=this.screenPpm,i=this.planBounds(this.project),o=i?{cx:(i.minX+i.maxX)/2*r+t,cy:(i.minY+i.maxY)/2*r+e,rx:((i.maxX-i.minX)/2+1.5)*r,ry:((i.maxY-i.minY)/2+1.5)*r}:{cx:t+300,cy:e+200,rx:900,ry:550};return w`
      <defs>
        <radialGradient id="ground-shadow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" class="ground-shadow-core" />
          <stop offset="65%" class="ground-shadow-mid" />
          <stop offset="100%" class="ground-shadow-edge" />
        </radialGradient>
        <pattern id="grid-dots-3d" width="40" height="40" patternUnits="userSpaceOnUse"
          patternTransform="translate(${t%40}, ${e%40})">
          <circle class="grid-dot" cx="20" cy="20" r="1.2" />
        </pattern>
      </defs>
      <rect x="-10000" y="-10000" width="20000" height="20000" fill="url(#grid-dots-3d)" />
      <ellipse cx=${o.cx} cy=${o.cy} rx=${o.rx} ry=${o.ry} fill="url(#ground-shadow)" />
    `}renderRooms(t){const e=this.screenPpm,r=new Set(this.selectedElements.roomIds);return this.project.rooms.map(i=>{if(!i.polygon||i.polygon.length<3)return $;const o=rt(i.polygon.map(l=>({x:l.x*e,y:l.y*e}))),s=t.get(i.id),a=s?.fill??i.color,c=r.has(i.id),h=i.texture&&i.texture!=="none"?i.texture:null;return w`
        <g
          class="room-group ${c?"selected":""}"
          data-room-id=${i.id}
          @pointerdown=${l=>this.handleElementPointerDown({kind:"room",id:i.id},l)}
          @dblclick=${l=>this.handleRoomDblClick(l,i)}
        >
          ${s?.illuminated?w`<polygon class="room-glow" points=${o} />`:$}
          <polygon
            class="room-polygon ${s?.illuminated?"illuminated":""}"
            points=${o}
            style=${tr(a?{"--room-fill":a}:{})}
          />
          ${h?w`
            <polygon
              class="room-texture-overlay"
              points=${o}
              fill="url(#arch-tex-floor-${h})"
              pointer-events="none"
            />
          `:$}
        </g>
      `})}renderRoomLabels(t){const e=this.screenPpm;return this.project.rooms.map(r=>{if(!r.polygon||r.polygon.length<3)return $;const i=G.labelPoint(r.polygon),o=t.get(r.id)?.temperature??null;return w`
        <g class="room-label-group" transform="translate(${i.x*e}, ${i.y*e})">
          <text class="room-label-name" y=${o?-10:-6}>${r.name}</text>
          <text class="room-label-area" y=${o?6:12}>${r.areaM2.toFixed(1)} m²</text>
          ${o?w`<text class="room-label-temp" y="21">🌡️ ${An(o,this.hass)}</text>`:$}
        </g>
      `})}renderRoomBadges3D(t,e){const r=new Set(this.selectedElements.roomIds),i=this.project.defaultCeilingHeight||2.5;return this.project.rooms.map(o=>{if(!o.polygon||o.polygon.length<3)return $;const s=lt(this.worldToScreen(G.labelPoint(o.polygon)),0,t,e),a=o.height||i;return w`
        <g
          class="room-3d-badge-group ${r.has(o.id)?"selected":""}"
          transform="translate(${s.x}, ${s.y})"
          @pointerdown=${c=>this.handleElementPointerDown({kind:"room",id:o.id},c)}
          @dblclick=${c=>this.handleRoomDblClick(c,o)}
        >
          <rect class="room-badge-bg" x="-62" y="-30" width="124" height="60" rx="10" ry="10" />
          <text class="room-label-name" y="-12">${o.name}</text>
          <text class="room-label-area" y="6">${o.areaM2.toFixed(1)} m²</text>
          <text class="room-label-height" y="21">H: ${a.toFixed(2)}m · ${(o.areaM2*a).toFixed(1)} m³</text>
        </g>
      `})}renderFurniture(){const t=this.screenPpm,e=new Set(this.selectedElements.furnitureIds??[]),r=this.canEdit?" – Touche R pour pivoter":"";return(this.project.furniture||[]).map(i=>{const o=et(i.type),s=i.width||o?.width||1,a=i.length||o?.length||1,c=e.has(i.id);return w`
        <g
          class="furniture-group ${c?"selected":""}"
          data-furniture-id=${i.id}
          transform="translate(${i.position.x*t}, ${i.position.y*t}) rotate(${i.rotation||0})"
          @pointerdown=${h=>this.handleElementPointerDown({kind:"furniture",id:i.id},h)}
        >
          <title>${Ws(i)} (${s.toFixed(2)} × ${a.toFixed(2)} m)${r}</title>
          ${Xs(i,{pixelsPerMeter:t,selected:c})}
        </g>
      `})}renderWalls2D(){const t=this.screenPpm,e=this.wallPolygons(this.project.walls),r=new Set(this.selectedElements.wallIds),i=o=>rt(o.map(s=>({x:s.x*t,y:s.y*t})));return w`
      <g class="walls-outline">
        ${this.project.walls.map(o=>{const s=e.get(o.id);return s?w`<polygon class="wall-outline" points=${i(s)} />`:$})}
      </g>
      ${this.project.walls.map(o=>{const s=e.get(o.id),a={x:o.start.x*t,y:o.start.y*t},c={x:o.end.x*t,y:o.end.y*t},h=I.distance(o.start,o.end),l=Math.hypot(c.x-a.x,c.y-a.y)||1,u=-(c.y-a.y)/l,d=(c.x-a.x)/l,p={x:(a.x+c.x)/2,y:(a.y+c.y)/2},f=o.texture&&o.texture!=="paint"?o.texture:null;return w`
          <g
            class="wall-element ${r.has(o.id)?"selected":""}"
            data-wall-id=${o.id}
            @pointerdown=${m=>this.handleElementPointerDown({kind:"wall",id:o.id},m)}
          >
            ${s?w`<polygon class="wall-rect" points=${i(s)} />`:$}
            ${s&&f?w`<polygon class="wall-texture-overlay" points=${i(s)} fill="url(#arch-tex-wall-${f})" pointer-events="none" />`:$}
            <line class="wall-centerline" x1=${a.x} y1=${a.y} x2=${c.x} y2=${c.y} />
            ${this.showDimensions&&h>=.4?w`
              <g class="wall-dim-badge" transform="translate(${p.x+u*14}, ${p.y+d*14})">
                <rect x="-24" y="-9" width="48" height="18" />
                <text>${I.roundMeters(h).toFixed(2)} m</text>
              </g>
            `:$}
          </g>
        `})}
    `}faceColors(t,e){const r=this.colorScheme==="light";if(e)return{fill:`hsl(192, 85%, ${Math.round((r?52:42)+t*14)}%)`,stroke:r?"#0891b2":"#38bdf8"};const i=r?16:22,o=Math.round(r?70+t*12:34+t*16);return{fill:`hsl(215, ${i}%, ${o}%)`,stroke:`hsl(215, ${i}%, ${o+(r?-12:6)}%)`}}renderWalls3D(t){const e=this.project,r=this.wallScene(e.walls,e.openings,e.rooms,e.defaultCeilingHeight,this.viewport,this.ppm,this.orbitPitch,this.orbitYaw,t.width,t.height),i=new Set(this.selectedElements.wallIds),o=new Set(this.selectedElements.openingIds);return w`
      <g class="walls-3d">
        ${r.map(s=>{const a=i.has(s.wallId),c=l=>this.handleElementPointerDown({kind:"wall",id:s.wallId},l);if(s.kind==="cap")return w`<polygon class="wall-cap-3d ${a?"selected":""}" points=${rt(s.points)} @pointerdown=${c} />`;const h=this.faceColors(s.shade,a);return w`
            <polygon
              class="wall-face-3d ${a?"selected":""}"
              points=${rt(s.points)}
              fill=${h.fill}
              stroke=${h.stroke}
              @pointerdown=${c}
            />
            ${s.panels.map(l=>w`
              <polygon
                class="opening-3d ${l.type} ${o.has(l.openingId)?"selected":""}"
                points=${rt(l.points)}
                @pointerdown=${u=>this.handleElementPointerDown({kind:"opening",id:l.openingId},u)}
              />
            `)}
          `})}
      </g>
    `}sashCountFor(t){return t==="window"?this.windowSashCount||1:t==="french_window"?2:1}renderOpenings(){const t=this.screenPpm,e=new Map(this.project.walls.map(i=>[i.id,i])),r=new Set(this.selectedElements.openingIds);return this.project.openings.map(i=>{const o=e.get(i.wallId);if(!o)return $;const s=o.end.x-o.start.x,a=o.end.y-o.start.y,c=Math.hypot(s,a);if(c===0)return $;const h=(o.start.x+i.offset/c*s)*t,l=(o.start.y+i.offset/c*a)*t,u=Math.atan2(a,s)*180/Math.PI;return w`
        <g
          class="opening-element ${r.has(i.id)?"selected":""}"
          transform="translate(${h}, ${l}) rotate(${u})"
          @pointerdown=${d=>this.handleElementPointerDown({kind:"opening",id:i.id},d)}
        >
          ${this.renderOpeningSymbol(i,o.thickness,t,!0)}
        </g>
      `})}renderOpeningSymbol(t,e,r,i){return zl(t,e,1/r).filter(o=>i||o.role!=="cutout").map(o=>{switch(o.kind){case"rect":return w`<rect class="opening-${o.role}" x=${o.x*r} y=${o.y*r} width=${o.w*r} height=${o.h*r} />`;case"line":return w`<line class="opening-${o.role}" x1=${o.x1*r} y1=${o.y1*r} x2=${o.x2*r} y2=${o.y2*r} />`;case"arc":return w`<path class="opening-${o.role}" d="M ${o.x1*r} ${o.y1*r} A ${o.r*r} ${o.r*r} 0 0 ${o.sweep} ${o.x2*r} ${o.y2*r}" />`}})}renderPins2D(t){const e=this.screenPpm,r=this.displayableBindings(this.project.bindings),i=r.map(l=>{const u=l.radarConfig;if(!u||!u.enabled||!u.showCone)return $;const d=(u.maxRangeMeters||6)*e,p=el(l.position.x*e,l.position.y*e,d,u.orientationDeg,u.fovDeg);return p?w`
        <g class="radar-cone-group" pointer-events="none">
          <path class="radar-cone-sweep" d=${p} />
        </g>
      `:$}),o=r.map(l=>{const u=t.get(l.id);return u?this.renderPin(l,u,l.position.x*e,l.position.y*e):$}),s=r.map(l=>({bindingId:l.id,targets:Qc(l,this.hass?.states,{applySmoothing:!0})})),a=tl(s),h=Array.from(a.values()).flat().map(l=>{const u=l.planPosition.x*e,d=l.planPosition.y*e,p=l.kind==="human",f=`${l.icon} ${l.label}`,m=`${(l.distanceMm/1e3).toFixed(2)}m`;return w`
        <g class="radar-live-target ${p?"human":"animal"}" transform="translate(${u}, ${d})" pointer-events="none">
          <circle class="radar-target-halo" cx="0" cy="0" r="18" style="stroke: ${l.color};" />
          <circle class="radar-target-dot" cx="0" cy="0" r="10" style="fill: ${l.color};" />
          <text class="radar-target-icon" x="0" y="3.5">${l.icon}</text>
          <g class="radar-target-pill" transform="translate(0, -18)">
            <rect x="-30" y="-8" width="60" height="15" rx="4" />
            <text x="0" y="3.5">${f} · ${m}</text>
          </g>
        </g>
      `});return w`
      <g class="radar-cones-layer">${i}</g>
      <g class="pins-layer">${o}</g>
      <g class="radar-targets-layer">${h}</g>
    `}renderPins3D(t,e,r){return this.displayableBindings(this.project.bindings).map(i=>({binding:i,at:lt(this.worldToScreen(i.position),0,e,r)})).sort((i,o)=>i.at.y-o.at.y).map(({binding:i,at:o})=>{const s=t.get(i.id);return s?this.renderPin(i,s,o.x,o.y):$})}renderPin(t,e,r,i){const o=this.isDashboardMode||this.canSelect,s=`${e.name} : ${e.stateText}`,a={"entity-pin":!0,selected:this.selectedElements.bindingIds.includes(t.id),"active-light":e.lightOn,"active-radar":e.radar,orphan:e.orphan},c=e.badge?Math.max(28,e.badge.length*5.6+8):0;return w`
      <g
        class=${Qn(a)}
        transform="translate(${r}, ${i})"
        role=${o?"button":$}
        tabindex=${o?0:$}
        aria-label=${s}
        @pointerdown=${h=>this.handlePinPointerDown(t,h)}
        @click=${h=>this.handlePinClick(t,h)}
        @dblclick=${h=>this.handlePinDblClick(t,h)}
        @keydown=${h=>this.handlePinKeyDown(t,h)}
        @contextmenu=${h=>this.handlePinContextMenu(h)}
      >
        <title>${s}</title>
        ${e.lightOn?w`<circle class="pin-glow" cx="0" cy="0" r="22" />`:$}
        <!-- Anneau animé si mouvement ou présence détectés ; ondes pour un lecteur multimédia actif -->
        ${e.radar?w`<circle class="radar-pulse-ring" cx="0" cy="0" r="16" />`:$}
        ${e.playing?w`<circle class="soundwave-pulse" cx="0" cy="0" r="16" />`:$}
        <circle class="entity-pin-bg" cx="0" cy="0" r="16" />
        <text class="entity-pin-icon ${e.fanOn?"fan-spin":""}" x="0" y="0">${e.icon}</text>
        <text class="entity-pin-label" x="0" y="27">${e.name}</text>
        <text class="entity-pin-state state-${e.status}" x="0" y="38">${e.stateText}</text>
        ${e.badge&&!e.unavailable?w`
          <g class="entity-pin-value-badge" transform="translate(${14+(c-28)/2}, -14)">
            <rect x=${-c/2} y="-8" width=${c} height="16" />
            <text>${e.badge}</text>
          </g>
        `:$}
      </g>
    `}renderOpeningPreview(){const t=this.wallSnap,e=this.openingFit,r=this.currentOpeningType();if(!t||!e||!r||!this.canEdit2D)return $;const i=this.screenPpm,o=t.wall,s=I.wallLength(o)||1,a={x:o.start.x+(o.end.x-o.start.x)*e.offset/s,y:o.start.y+(o.end.y-o.start.y)*e.offset/s},c=this.worldToScreen(a),h=t.angleRad*180/Math.PI,l=!e.fits||e.overlaps.length>0,u=e.width*i,d=o.thickness*i,p={type:r,width:e.width,flipSide:this.openingFlipSide,flipDirection:this.openingFlipDirection,sashCount:this.sashCountFor(r)};return w`
      <g
        class="opening-preview ${l?"invalid":""}"
        transform="translate(${c.x}, ${c.y}) rotate(${h})"
      >
        <rect class="opening-preview-body" x=${-u/2} y=${-d/2} width=${u} height=${d} stroke-dasharray="4, 2" />
        ${this.renderOpeningSymbol(p,o.thickness,i,!1)}
      </g>
    `}renderPreviewWall(){if(!this.drawingWallStart||!this.previewPoint||this.activeTool!=="wall")return $;const t=this.drawingWallStart,e=this.previewPoint,r=Ae([{id:"preview",start:t,end:e,thickness:this.currentWallThickness,type:"standard"}]).get("preview"),i=this.worldToScreen(t),o=this.worldToScreen(e),s=I.distance(t,e),a={x:(i.x+o.x)/2,y:(i.y+o.y)/2};return w`
      <g class="preview-wall-group">
        ${r?w`<polygon points=${rt(r.map(c=>this.worldToScreen(c)))} class="preview-wall-rect" />`:$}
        <line x1=${i.x} y1=${i.y} x2=${o.x} y2=${o.y} class="preview-wall-line" />

        ${this.snapInfo.guideAngle!==void 0?w`
          <line x1=${i.x} y1=${i.y} x2=${o.x} y2=${o.y} class="angle-guide-line" />
        `:$}

        <g class="dimension-badge" transform="translate(${a.x}, ${a.y-16})">
          <rect x="-30" y="-11" width="60" height="22" />
          <text>${I.roundMeters(s).toFixed(2)} m</text>
        </g>
      </g>
    `}renderRoomDraft(){const t=this.roomDraft;if(this.activeTool!=="room"||t.length===0)return $;const e=t.map(c=>this.worldToScreen(c)),r=this.previewPoint?this.worldToScreen(this.previewPoint):null,i=[...e,...r?[r]:[]],o=e[0],s=t.length>=3,a=s?G.computeArea(this.previewPoint?[...t,this.previewPoint]:t):0;return w`
      <g class="room-draft-group" pointer-events="none">
        ${s?w`<polygon class="room-draft-fill" points=${rt(i)} />`:$}
        <polyline class="room-draft-line" points=${rt(i)} />
        ${r&&s?w`
          <line class="room-draft-closing" x1=${r.x} y1=${r.y} x2=${o.x} y2=${o.y} />
        `:$}
        ${e.map((c,h)=>w`<circle class="room-draft-vertex ${h===0?"first":""}" cx=${c.x} cy=${c.y} r=${h===0&&s?7:4.5} />`)}
        ${s?w`
          <g class="dimension-badge" transform="translate(${o.x}, ${o.y-20})">
            <rect x="-34" y="-11" width="68" height="22" />
            <text>${a.toFixed(2)} m²</text>
          </g>
        `:$}
      </g>
    `}renderRectRoomPreview(){if(this.activeTool!=="rect_room"||!this.rectStart||!this.rectCurrent)return $;const t=zr(this.rectStart,this.rectCurrent).map(o=>this.worldToScreen(o)),e=Math.abs(this.rectCurrent.x-this.rectStart.x),r=Math.abs(this.rectCurrent.y-this.rectStart.y),i={x:(t[0].x+t[2].x)/2,y:(t[0].y+t[2].y)/2};return w`
      <g class="room-draft-group" pointer-events="none">
        <polygon class="room-draft-fill" points=${rt(t)} />
        <polygon class="room-draft-line" points=${rt(t)} />
        ${e>0||r>0?w`
          <g class="dimension-badge" transform="translate(${i.x}, ${i.y})">
            <rect x="-48" y="-11" width="96" height="22" />
            <text>${e.toFixed(2)} × ${r.toFixed(2)} m</text>
          </g>
        `:$}
      </g>
    `}renderCalibrationLine(){if(!this.calibrateStart||!this.calibrateCurrent)return $;const t=this.worldToScreen(this.calibrateStart),e=this.worldToScreen(this.calibrateCurrent),r=I.distance(this.calibrateStart,this.calibrateCurrent),i={x:(t.x+e.x)/2,y:(t.y+e.y)/2};return w`
      <g class="calibration-preview-group">
        <line x1=${t.x} y1=${t.y} x2=${e.x} y2=${e.y} class="calibration-line" />
        <circle cx=${t.x} cy=${t.y} r="6" class="calibration-endpoint" />
        <circle cx=${e.x} cy=${e.y} r="6" class="calibration-endpoint" />

        <g class="dimension-badge calibration" transform="translate(${i.x}, ${i.y-18})">
          <rect x="-35" y="-11" width="70" height="22" />
          <text>${r.toFixed(2)} m</text>
        </g>
      </g>
    `}renderRescaleLine(){if(!this.rescaleStart||!this.rescaleCurrent)return $;const t=this.worldToScreen(this.rescaleStart),e=this.worldToScreen(this.rescaleCurrent),r=I.distance(this.rescaleStart,this.rescaleCurrent),i={x:(t.x+e.x)/2,y:(t.y+e.y)/2};return w`
      <g class="rescale-preview-group">
        <line class="rescale-line" x1=${t.x} y1=${t.y} x2=${e.x} y2=${e.y} />
        <circle class="rescale-start" cx=${t.x} cy=${t.y} r="6" />
        <circle class="rescale-end" cx=${e.x} cy=${e.y} r="6" />

        <g class="dimension-badge rescale" transform="translate(${i.x}, ${i.y-18})">
          <rect x="-48" y="-13" width="96" height="26" />
          <text>📐 ${r.toFixed(3)} m</text>
        </g>
      </g>
    `}renderSmartGuides(){const{smartGuideX:t,smartGuideY:e}=this.snapInfo;if(t===void 0&&e===void 0)return $;const r=t!==void 0?this.worldToScreen({x:t,y:0}).x:0,i=e!==void 0?this.worldToScreen({x:0,y:e}).y:0;return w`
      <g class="smart-guides-group" pointer-events="none">
        ${t!==void 0?w`<line x1=${r} y1="-10000" x2=${r} y2="10000" class="smart-guide-line" />`:$}
        ${e!==void 0?w`<line x1="-10000" y1=${i} x2="10000" y2=${i} class="smart-guide-line" />`:$}
      </g>
    `}renderFurnitureHandles(){if(!this.canEdit2D)return null;const t=this.screenPpm,e=new Set(this.selectedElements.furnitureIds??[]);return(this.project.furniture||[]).filter(r=>e.has(r.id)).map(r=>{const i=et(r.type),o=this.worldToScreen(r.position),s=r.width||i?.width||1,a=r.length||i?.length||1,c=s*t,h=a*t,l=r.rotation||0,u=`${s.toFixed(2)}×${a.toFixed(2)}m`;return w`
        <g class="furniture-handles" transform="translate(${o.x}, ${o.y}) rotate(${l})">
          <!-- Ligne de rappel vers la poignée de rotation -->
          <line class="handle-guide" x1="0" y1="${-h/2}" x2="0" y2="${-h/2-18}" />
          <!-- Poignée interactive de rotation degré par degré -->
          <g
            class="furniture-rotate-handle"
            @pointerdown=${d=>this.handleFurnitureRotatePointerDown(r,d)}
          >
            <!-- Zone cliquable invisible élargie -->
            <circle class="handle-hit" cx="0" cy="${-h/2-18}" r="12" />
            <!-- Petit rond bleu clair visible avec contour blanc -->
            <circle class="handle-knob" cx="0" cy="${-h/2-18}" r="6.5" stroke-width="2" />
            <!-- Indicateur d'angle en direct quand le meuble est sélectionné -->
            <text class="handle-angle" x="0" y="${-h/2-28}">${Math.round(l)}°</text>
          </g>

          <!-- Poignée interactive d'étirement / redimensionnement en bas à droite -->
          <g
            class="furniture-resize-handle"
            @pointerdown=${d=>this.handleFurnitureResizePointerDown(r,d)}
          >
            <!-- Zone cliquable invisible élargie -->
            <rect class="handle-hit" x="${c/2-6}" y="${h/2-6}" width="20" height="20" />
            <!-- Poignée carrée aux coins légèrement arrondis avec bordure blanche -->
            <rect class="handle-knob" x="${c/2-2}" y="${h/2-2}" width="11" height="11" rx="2.5" stroke-width="1.8" />
            <!-- 2 stries diagonales symbolisant le grip de redimensionnement -->
            <line class="handle-grip" x1="${c/2+2}" y1="${h/2+7}" x2="${c/2+7}" y2="${h/2+2}" />
            <line class="handle-grip" x1="${c/2+5}" y1="${h/2+7}" x2="${c/2+7}" y2="${h/2+5}" />

            <!-- Badge des dimensions actuelles en bas à droite -->
            <g class="handle-size-badge" transform="translate(${c/2+14}, ${h/2+16})">
              <rect x="-2" y="-9" width="${u.length*6.5+8}" height="14" rx="3" />
              <text class="handle-size-text" x="2" y="1.5">${u}</text>
            </g>
          </g>
        </g>
      `})}renderSelectionHandles(){if(!this.canEdit2D||this.activeTool!=="select")return null;const t=this.selectedElements;if(tn(t)!==1)return null;if(t.wallIds.length===1){const r=this.project.walls.find(i=>i.id===t.wallIds[0]);return r?w`
        <g class="selection-handles">
          ${["start","end"].map(i=>{const o=this.worldToScreen(r[i]);return w`
              <g class="wall-endpoint-handle" @pointerdown=${s=>this.handleWallEndpointPointerDown(r,i,s)}>
                <circle cx="${o.x}" cy="${o.y}" r="12" fill="transparent" />
                <circle class="handle-dot" cx="${o.x}" cy="${o.y}" r="6" />
              </g>
            `})}
        </g>
      `:null}if(t.roomIds.length===1){const r=this.project.rooms.find(i=>i.id===t.roomIds[0]);return r?w`
        <g class="selection-handles">
          ${r.polygon.map((i,o)=>{const s=this.worldToScreen(i);return w`
              <g class="room-vertex-handle" @pointerdown=${a=>this.handleRoomVertexPointerDown(r,o,a)}>
                <circle cx="${s.x}" cy="${s.y}" r="11" fill="transparent" />
                <rect class="handle-dot" x="${s.x-5}" y="${s.y-5}" width="10" height="10" rx="2" />
              </g>
            `})}
        </g>
      `:null}return null}renderSnapIndicator(){if(!this.previewPoint||this.snapInfo.snappedTo==="none")return null;const t=this.worldToScreen(this.previewPoint),e=this.snapInfo.snappedTo;if(e==="midpoint")return w`
        <g transform="translate(${t.x}, ${t.y})" pointer-events="none">
          <polygon points="0,-7 7,5 -7,5" class="snap-indicator" />
        </g>
      `;if(e==="wall")return w`
        <g transform="translate(${t.x}, ${t.y})" pointer-events="none">
          <rect x="-5.5" y="-5.5" width="11" height="11" class="snap-indicator" />
        </g>
      `;const r=e==="vertex";return w`
      <g transform="translate(${t.x}, ${t.y})" pointer-events="none">
        <circle r="${r?7:5}" class="snap-indicator" />
        ${r?w`<circle r="2" class="snap-indicator-dot" />`:null}
      </g>
    `}renderMarqueeBox(){if(!this.marqueeStart||!this.marqueeCurrent)return null;const t=this.worldToScreen(this.marqueeStart),e=this.worldToScreen(this.marqueeCurrent),r=Math.min(t.x,e.x),i=Math.min(t.y,e.y),o=Math.abs(t.x-e.x),s=Math.abs(t.y-e.y);return w`
      <rect
        class="marquee-selection-box"
        x="${r}"
        y="${i}"
        width="${o}"
        height="${s}"
      />
    `}rotateQuarterTurn(){const t=this.view3dElement;if(t)t.rotateQuarterTurn();else if(this.is3DMode){const e=this.cameraTarget??{pitchDeg:this.orbitPitch,yawDeg:this.orbitYaw};this.animateCamera({pitchDeg:e.pitchDeg,yawDeg:(e.yawDeg-90)%360})}else this.viewRotation-=90,this.fitPlanView()}fitToScreen(t=60){this.fitPlanView(t),this.view3dElement?.fitToView()}fitPlanView(t=60){const e=this.measuredSize();if(!e){this.pendingFitPadding=t;return}if(this.pendingFitPadding=null,this.viewTouched=!1,!fi(this.project)){this.viewport={x:e.width/2,y:e.height/2,zoom:Ec(this.ppm)};return}const r=Pr.calculateBoundingBox(this.project,.6);this.viewport=Tc(r,this.ppm,e,this.is3DMode?0:this.viewRotation,t)}resetView(){this.viewRotation=0,this.fitPlanView(),this.view3dElement?.resetView()}fitView(){const t=this.view3dElement;t?t.fitToView():this.fitPlanView(40)}toggle3DMode(){this.dispatchEvent(new CustomEvent("toggle-3d",{detail:{is3DMode:!this.is3DMode},bubbles:!0,composed:!0}))}getHelpMessage(){return this.isDashboardMode||!this.interactive?null:this.pendingPlacement&&this.canEdit2D?"Touchez le plan à l'endroit voulu pour placer l'élément (Échap pour annuler).":this.webgl3D?this.walkthrough3D?"Visite virtuelle : Touches ZQSD / Flèches pour vous déplacer, glisser pour regarder à 360°, Shift pour courir. Cliquez sur 🚶 pour revenir en vue aérienne.":"Vue 3D : glisser pour pivoter, clic droit ou Maj+glisser pour déplacer, molette pour zoomer. 🚶 : Visite virtuelle, ✂️ : Couper les murs, ☀️/🌙 : Ambiance lumineuse.":this.is3DMode?`${this.view3d==="fallback"?"Vue 3D simplifiée":"Vue 3D Interactive"} : Glisser (clic gauche/droit) pour pivoter 360°, Molette pour zoomer, Shift+glisser pour déplacer. Édition en vue 2D.`:this.readOnly?"Lecture seule : vous pouvez parcourir et sélectionner, mais pas modifier le plan.":this.activeTool==="select"?"Mode Sélection : Cliquez sur un élément pour le sélectionner (Shift pour multi-sélection, Shift+glisser pour cadre). Glissez pour déplacer, flèches pour ajuster au cm. Suppr pour effacer.":this.activeTool==="wall"?this.drawingWallStart?"Cliquez pour terminer le mur (double-clic ou Échap pour arrêter). Alt : sans accrochage.":"Cliquez pour démarrer un mur. Alt : sans accrochage.":this.activeTool==="room"?this.roomDraft.length>=3?"Cliquez l'angle suivant. Double-clic, Entrée ou clic sur le 1er angle pour fermer la pièce.":"Pièce libre : cliquez chaque angle de la pièce. Alt : sans accrochage.":this.activeTool==="rect_room"?this.rectStart?"Cliquez ou relâchez sur l'angle opposé de la pièce.":"Pièce rectangulaire : glissez d'un angle à l'angle opposé (ou cliquez les deux angles).":this.activeTool==="door"?"Survolez un mur. Espace = inverser intérieur/extérieur. F = gauche/droite.":this.activeTool==="window"||this.activeTool==="french_window"?"Survolez un mur pour insérer la fenêtre.":this.activeTool==="calibrate"?this.calibrateStart?"Cliquez sur la 2ème extrémité du mur mesuré.":"Tracez un segment sur un mur pour étalonner l'échelle.":this.activeTool==="rescale"?this.rescaleStart?"Tracez la ligne jusqu'au 2ème point (autre extrémité du mur ou point de référence).":"Mettre à l'échelle : Sélectionnez un mur ou cliquez sur le 1er point de mesure.":null}renderControls(){const t=this.is3DMode;return Q`
      <div
        class="canvas-hud"
        role="toolbar"
        aria-label="Contrôles de la vue"
        style=${this.canvasHudDrag.styleString}
        @pointerdown=${this.canvasHudDrag.handlePointerDown}
        @pointermove=${this.canvasHudDrag.handlePointerMove}
        @pointerup=${this.canvasHudDrag.handlePointerUp}
        @pointercancel=${this.canvasHudDrag.handlePointerUp}
      >
        ${rn(this.canvasHudDrag,"Déplacer les contrôles de la vue")}
        <button
          class="hud-btn ${t?"active":""}"
          @click=${this.toggle3DMode}
          title="Basculer Vue 2D / 3D Isométrique"
          aria-label="Vue 3D"
          aria-pressed=${t?"true":"false"}
        >
          ${t?"🧊":"📐"}
        </button>

        ${this.webgl3D?Q`
          <button
            class="hud-btn ${this.cutWalls?"active":""}"
            @click=${()=>{this.cutWalls=!this.cutWalls}}
            title="Couper les murs à mi-hauteur pour voir l'intérieur"
            aria-label="Couper les murs à mi-hauteur"
            aria-pressed=${this.cutWalls?"true":"false"}
          >
            ✂️
          </button>

          <button
            class="hud-btn ${this.walkthrough3D?"active":""}"
            @click=${()=>{this.walkthrough3D=!this.walkthrough3D}}
            title="Visite virtuelle à la première personne (hauteur d'yeux, ZQSD / flèches)"
            aria-label="Visite virtuelle 3D"
            aria-pressed=${this.walkthrough3D?"true":"false"}
          >
            🚶
          </button>

          <button
            class="hud-btn ${this.lightingMode3D!=="auto"?"active":""}"
            @click=${()=>this.cycleLightingMode3D()}
            title=${this.lightingModeTitle}
            aria-label=${this.lightingModeTitle}
            aria-pressed=${this.lightingMode3D!=="auto"?"true":"false"}
          >
            ${this.lightingModeIcon}
          </button>
        `:$}

        ${t?Q`
          <div class="hud-preset-group" role="group" aria-label="Préréglages de la caméra 3D">
            <span class="hud-angle-badge" aria-hidden="true">${Math.round(this.orbitYaw)}° / ${Math.round(this.orbitPitch)}°</span>
            ${dh.map(e=>Q`
              <button
                class="hud-preset-btn"
                @click=${()=>this.setCameraPreset(e.camera.pitchDeg,e.camera.yawDeg)}
                title=${e.title}
                aria-label=${e.title}
              >${e.label}</button>
            `)}
          </div>
        `:$}

        <!-- Rotation du plan d'un quart de tour à gauche (90°) -->
        <button
          class="hud-btn"
          @click=${this.rotateQuarterTurn}
          title="Pivoter le plan d'un quart de tour à gauche (↺ 90°)"
          aria-label="Pivoter le plan d'un quart de tour à gauche"
        >
          ↺
        </button>

        <!-- Zoom automatique et centrage sur l'écran -->
        <button
          class="hud-btn"
          @click=${this.fitView}
          title="Ajuster automatiquement à la page (zoom auto et centrage)"
          aria-label="Ajuster le plan à l'écran"
        >
          ⛶
        </button>

        <button class="hud-btn" @click=${this.zoomOut} title="Zoom Arrière" aria-label="Zoom arrière">−</button>
        <div class="hud-zoom-label">${Math.round((this.webgl3D?this.view3dZoom:Sc(this.viewport.zoom,this.ppm))*100)}%</div>
        <button class="hud-btn" @click=${this.zoomIn} title="Zoom Avant" aria-label="Zoom avant">+</button>
        <button class="hud-btn" @click=${this.resetView} title="Recentrer" aria-label="Recentrer la vue">⌖</button>
      </div>
    `}renderScene2D(t,e,r){const i=this.screenPpm,o=`translate(${this.viewport.x}, ${this.viewport.y})`,s=this.displayableBindings(this.project.bindings);return w`
      ${e}
      ${r}
      ${this.renderOpeningPreview()}
      ${this.renderPreviewWall()}
      ${this.renderRoomDraft()}
      ${this.renderRectRoomPreview()}
      ${this.renderCalibrationLine()}
      ${this.renderRescaleLine()}
      ${this.renderSmartGuides()}
      ${this.renderSnapIndicator()}
      <g class="plan-layer" transform=${o}>
        ${ct([s,i,t,this.entityRevision,this.selectedElements,this.isDashboardMode,this.canSelect],()=>this.renderPins2D(t))}
      </g>
      ${this.renderFurnitureHandles()}
      ${this.renderSelectionHandles()}
      ${this.renderMarqueeBox()}
    `}renderScene3D(t,e,r,i){const o=this.camera,s=Ot(i),[a,c,h,l,u,d]=Yl(o,s);return w`
      <g class="camera-3d" transform="matrix(${a} ${c} ${h} ${l} ${u} ${d})">
        ${e}
        ${r}
      </g>
      ${this.renderWalls3D(i)}
      ${this.renderRoomBadges3D(o,s)}
      ${this.renderPins3D(t,o,s)}
    `}renderView3D(){return Q`
      <home-architect-3d-view
        .project=${this.project}
        .hass=${this.hass}
        .ghostProject=${this.ghostProject??null}
        .showThermalHeatmap=${this.showThermalHeatmap}
        .interactive=${this.canSelect}
        .readOnly=${this.readOnly}
        .dashboard=${this.isDashboardMode}
        .selectedElements=${this.selectedElements}
        .scheme=${this.colorScheme}
        .animations=${this.animations}
        .shadows=${this.shadows}
        .cutWalls=${this.cutWalls}
        .walkthrough=${this.walkthrough3D}
        .lightingMode=${this.lightingMode3D}
        .nightMode=${this.lightingMode3D==="night"}
        .intro=${this.view3dIntro}
        @view3d-pick=${this.handleView3DPick}
        @view3d-camera=${this.handleView3DCamera}
        @view3d-hover=${this.handleView3DHover}
        @view3d-hint=${this.handleView3DHint}
        @view3d-error=${this.handleView3DError}
      ></home-architect-3d-view>
    `}renderSvgViewport(t){const e=t.width/2,r=t.height/2,i=this.is3DMode,o=this.project,s=this.screenPpm,a=this.selectedElements,c=`translate(${this.viewport.x}, ${this.viewport.y})`,h=this.displayableBindings(o.bindings),l=this.roomLooks(o.rooms,h,this.showThermalHeatmap,this.entityRevision),u=this.pinViews(h,this.entityRevision),d=w`
      <g class="plan-layer" transform=${c}>
        ${ct([o.background,this.backgroundSrc,s,this.viewport.zoom],()=>this.renderBackgroundLayer())}
        ${ct([this.ghostProject,s],()=>this.renderGhostLayer())}
      </g>
      ${this.renderGrid()}
    `,p=w`
      <g class="plan-layer" transform=${c}>
        ${ct([o.rooms,s,l,a],()=>this.renderRooms(l))}
        ${ct([o.furniture,s,a,this.canEdit],()=>this.renderFurniture())}
        ${i?$:ct([o.walls,s,a,this.showDimensions],()=>this.renderWalls2D())}
        ${i?$:ct([o.openings,o.walls,s,a],()=>this.renderOpenings())}
        ${i?$:ct([o.rooms,s,l],()=>this.renderRoomLabels(l))}
      </g>
    `;return Q`
      <div class="viewport-3d-wrapper ${i?"mode-3d":""}">
        <svg class="main-viewport">
          <defs>
            ${ct([s],()=>Ul(s))}
          </defs>
          <!-- Rotation de vue 2D autour du centre du canevas ; transform-box et transition (0,35 s, coupée
               si les animations sont réduites) portés par la classe -->
          <g
            class="viewport-2d-rotator"
            style=${tr(i?{}:{transform:`rotate(${this.viewRotation}deg)`,"transform-origin":`${e}px ${r}px`})}
          >
            ${i?this.renderScene3D(u,d,p,t):this.renderScene2D(u,d,p)}
          </g>
        </svg>
      </div>
    `}handleCompassClick(t){t.stopPropagation(),!this.compassHudDrag.hasMoved&&this.dispatchEvent(new CustomEvent("open-orientation",{bubbles:!0,composed:!0}))}renderCompassWidget(){if(this.project.showCompass===!1)return $;const t=(Math.round(this.project.northAngle??0)%360+360)%360,e=Ic(t);return Q`
      <div
        class="compass-hud"
        style=${this.compassHudDrag.styleString}
        @pointerdown=${this.compassHudDrag.handlePointerDown}
        @pointermove=${this.compassHudDrag.handlePointerMove}
        @pointerup=${this.compassHudDrag.handlePointerUp}
        @pointercancel=${this.compassHudDrag.handlePointerUp}
        @dblclick=${this.compassHudDrag.reset}
        @click=${this.handleCompassClick}
        title="Orientation du Nord : ${t}° (${e}) — Cliquer pour modifier, glisser pour déplacer"
        aria-label="Orientation du Nord géographique (${t}°)"
        role="button"
        tabindex="0"
      >
        <div class="compass-hud-dial">
          <svg viewBox="0 0 44 44" class="compass-hud-svg" aria-hidden="true" style="transform: rotate(${t}deg)">
            <circle cx="22" cy="22" r="19" class="compass-hud-bg" />
            <!-- Repère Nord (Aiguille rouge vif) -->
            <polygon points="22,5 18,22 22,20" fill="#ef4444" />
            <polygon points="22,5 26,22 22,20" fill="#dc2626" />
            <circle cx="22" cy="9" r="2.5" fill="#ef4444" />
            <!-- Repère Sud (Aiguille argentée / gris clair) -->
            <polygon points="22,39 18,22 22,24" fill="#94a3b8" />
            <polygon points="22,39 26,22 22,24" fill="#64748b" />
            <!-- Pivot central -->
            <circle cx="22" cy="22" r="3" fill="#ffffff" />
            <circle cx="22" cy="22" r="1.5" fill="#3b82f6" />
          </svg>
          <span class="compass-hud-n-fixed">N</span>
        </div>
        <span class="compass-hud-badge">${t}°</span>
      </div>
    `}render(){const t=this.getHelpMessage(),e=this.sizeOrFallback(),r=this.interaction,i=this.is3DMode,o=this.selectedElements,s={"canvas-container":!0,"is-panning":r.kind==="pan","is-orbiting":r.kind==="orbit","dashboard-mode":this.isDashboardMode,"mode-3d":i,"read-only":!this.canEdit,placing:!!this.pendingPlacement&&this.canEdit2D};return Q`
      <div
        class=${Qn(s)}
        @wheel=${this.handleWheel}
        @pointerdown=${this.handlePointerDown}
        @pointermove=${this.handlePointerMove}
        @pointerup=${this.handlePointerUp}
        @pointercancel=${this.handlePointerCancel}
        @lostpointercapture=${this.handleLostPointerCapture}
        @pointerleave=${this.handlePointerLeave}
        @dblclick=${this.handleDoubleClick}
        @contextmenu=${a=>{this.is3DMode&&a.preventDefault()}}
        @dragover=${this.handleDragOver}
        @drop=${this.handleDrop}
      >
        ${this.webgl3D?this.renderView3D():this.renderSvgViewport(e)}
      </div>

      <!-- HUD hors du conteneur interactif : un clic sur le HUD n'atteint jamais les outils du plan -->
      ${t&&!this.hasToast?Q`
        <div
          class="help-hud"
          style=${this.helpHudDrag.styleString}
          @pointerdown=${this.helpHudDrag.handlePointerDown}
          @pointermove=${this.helpHudDrag.handlePointerMove}
          @pointerup=${this.helpHudDrag.handlePointerUp}
          @pointercancel=${this.helpHudDrag.handlePointerUp}
        >
          ${rn(this.helpHudDrag,"Déplacer le message d'aide")}
          <span>${t}</span>
        </div>
      `:$}

      <div class="canvas-hint" role="status" ?hidden=${!this.hint}>${this.hint??""}</div>

      ${this.renderCompassWidget()}

      ${!this.isDashboardMode&&!this.webgl3D?Q`
        <div
          class="coords-hud ${tn(o)>0?"selection-active":""}"
          style=${this.coordsHudDrag.styleString}
          @pointerdown=${this.coordsHudDrag.handlePointerDown}
          @pointermove=${this.coordsHudDrag.handlePointerMove}
          @pointerup=${this.coordsHudDrag.handlePointerUp}
          @pointercancel=${this.coordsHudDrag.handlePointerUp}
          aria-hidden="true"
        >
          ${rn(this.coordsHudDrag,"Déplacer les coordonnées")}
          <span class="coords-key">X:</span>
          <span class="coords-x"></span>
          <span class="coords-sep">|</span>
          <span class="coords-key">Y:</span>
          <span class="coords-y"></span>
          <span class="coords-sep">|</span>
          <span class="coords-tool-key">Outil:</span>
          <span class="coords-tool">${this.activeTool.toUpperCase()}</span>
        </div>
      `:$}

      ${this.showControls?this.renderControls():$}
    `}},bt.styles=hs,bt);S([z({type:Object})],E.prototype,"hass");S([z({type:Object})],E.prototype,"project");S([z({type:String})],E.prototype,"activeTool");S([z({type:Number})],E.prototype,"currentWallThickness");S([z({type:Number})],E.prototype,"currentOpeningWidth");S([z({type:Boolean})],E.prototype,"is3DMode");S([z({type:Object})],E.prototype,"selectedElements");S([z({type:Boolean,reflect:!0,attribute:"dashboard"})],E.prototype,"isDashboardMode");S([z({type:Boolean})],E.prototype,"interactive");S([z({type:Boolean})],E.prototype,"readOnly");S([z({type:Boolean})],E.prototype,"modalOpen");S([z({type:Boolean,attribute:"has-toast"})],E.prototype,"hasToast");S([z({attribute:!1})],E.prototype,"backgroundSrc");S([z({attribute:!1})],E.prototype,"pendingPlacement");S([z({type:Object})],E.prototype,"ghostProject");S([z({type:Boolean})],E.prototype,"showDimensions");S([z({type:Boolean})],E.prototype,"showThermalHeatmap");S([z({type:Boolean})],E.prototype,"openingFlipSide");S([z({type:Boolean})],E.prototype,"openingFlipDirection");S([z({type:Number})],E.prototype,"windowSashCount");S([z({type:Boolean})],E.prototype,"showControls");S([z({type:Boolean})],E.prototype,"animations");S([z({type:String})],E.prototype,"theme");S([z({type:Boolean})],E.prototype,"shadows");S([j()],E.prototype,"viewport");S([j()],E.prototype,"interaction");S([j()],E.prototype,"marqueeStart");S([j()],E.prototype,"marqueeCurrent");S([j()],E.prototype,"drawingWallStart");S([j()],E.prototype,"previewPoint");S([j()],E.prototype,"snapInfo");S([j()],E.prototype,"roomDraft");S([j()],E.prototype,"rectStart");S([j()],E.prototype,"rectCurrent");S([j()],E.prototype,"wallSnap");S([j()],E.prototype,"openingFit");S([j()],E.prototype,"calibrateStart");S([j()],E.prototype,"calibrateCurrent");S([j()],E.prototype,"rescaleStart");S([j()],E.prototype,"rescaleCurrent");S([j()],E.prototype,"viewRotation");S([j()],E.prototype,"orbitPitch");S([j()],E.prototype,"orbitYaw");S([j()],E.prototype,"view3d");S([j()],E.prototype,"view3dZoom");S([j()],E.prototype,"cutWalls");S([j()],E.prototype,"walkthrough3D");S([j()],E.prototype,"lightingMode3D");S([j()],E.prototype,"nightMode3D");S([j()],E.prototype,"hint");let _h=E;Ba("home-architect-canvas",_h);class R extends Error{constructor(t,e){super(e),this.name="HaApiError",this.code=t}}class Mh extends R{constructor(t,e){super("conflict",t),this.name="ConflictError",this.serverRevision=e}}class Mo extends R{constructor(t){super("unauthorized",t),this.name="PermissionDeniedError"}}class Bt extends R{constructor(t,e,r){super("payload_too_large",t),this.name="PayloadTooLargeError",this.bytes=e,this.limit=r}}const kh=3,ko="home_architect_",Eh=new Set(["home_architect_toolbar_pos"]);function nt(n){return typeof n=="object"&&n!==null&&!Array.isArray(n)}function dt(n){return typeof n=="string"&&n!==""?n:void 0}function me(n){return typeof n=="number"&&Number.isInteger(n)&&n>=0?n:void 0}function pi(n){const t=ki(n/1048576,{minimumFractionDigits:1,maximumFractionDigits:1});return A("ui.api.size_mib",{value:t})}function Ye(n,t,e){return A(n,{size:pi(t),limit:pi(e)})}function Eo(n,t){if(n instanceof R)return n;const e=nt(n)?nt(n.error)?n.error:n:null,r=e?.code;let i;typeof r=="string"&&r!==""?i=r:r===kh?i="connection_lost":typeof r=="number"?i=`error_${r}`:i="unknown_error";const o=typeof e?.message=="string"&&e.message!==""?e.message:n instanceof Error?n.message:String(n);switch(i){case"conflict":{const s=/conflict:(\d+)/.exec(o),a=s?Number(s[1]):void 0;return new Mh(a===void 0?A("ui.api.conflict"):A("ui.api.conflict_revision",{revision:a}),a)}case"unauthorized":return new Mo(A("ui.api.unauthorized"));case"connection_lost":return new R(i,A("ui.api.connection_lost"));case"payload_too_large":{const s=/payload_too_large:(\d+):(\d+)/.exec(o),a=s?Number(s[1]):t?.bytes??0,c=s?Number(s[2]):t?.limit??0;return new Bt(c>0?Ye("ui.api.payload_too_large_size",a,c):A("ui.api.payload_too_large"),a,c)}case"not_found":return new R(i,A("ui.api.project_not_found"));case"not_ready":return new R(i,A("ui.api.not_ready"));case"save_failed":case"write_failed":return new R(i,A("ui.api.write_failed"));case"unknown_command":return new R(i,A("ui.api.unknown_command"));default:return new R(i,o)}}async function pt(n,t,e){if(!n||typeof n.callWS!="function")throw new R("not_connected",A("ui.api.not_connected"));try{return await n.callWS(t)}catch(r){throw Eo(r,e)}}function _t(n){if(typeof n!="string"||!Xt.test(n))throw new R("invalid_project_id",A("ui.api.invalid_project_id",{id:String(n)}))}function Sh(n){if(typeof n!="string"||!Fe.test(n))throw new R("invalid_asset_id",A("ui.api.invalid_asset_id",{id:String(n)}))}async function So(n,t,e){if(!n||typeof n.fetchWithAuth!="function")throw new R("not_connected",A("ui.api.not_connected"));try{return await n.fetchWithAuth(t,e)}catch(r){throw new R("network_error",r instanceof Error?r.message:String(r))}}function Po(n,t){switch(n){case 401:case 403:return new Mo(A("ui.api.unauthorized"));case 404:return new R("not_found",A("ui.api.not_found"));case 413:return new Bt(A("ui.api.file_too_large"),t?.bytes??0,t?.limit??0);case 415:return new R("unsupported_media_type",A("ui.api.unsupported_media_type"));case 400:return new R("invalid_image",A("ui.api.invalid_image"));case 503:return new R("not_ready",A("ui.api.not_ready"));default:return new R("http_error",A("ui.api.http_error",{status:n}))}}function Ph(n){if(!nt(n)||typeof n.id!="string"||!Xt.test(n.id))return null;const t=nt(n.counts)?n.counts:{},e=r=>me(r)??0;return{id:n.id,name:typeof n.name=="string"&&n.name!==""?n.name:n.id,category:dt(n.category)??Ki(n.id),created_at:dt(n.created_at),updated_at:dt(n.updated_at),revision:me(n.revision)??0,has_background:n.has_background===!0,publish:En(n.publish)??null,counts:{walls:e(t.walls),rooms:e(t.rooms),bindings:e(t.bindings),furniture:e(t.furniture)}}}function Th(n){return{id:n.id,name:n.name,category:n.category,created_at:n.created_at,updated_at:n.updated_at,revision:n.revision??0,has_background:!!(n.background&&(n.background.assetId||n.background.imageUrl)),publish:n.publish??null,counts:{walls:n.walls.length,rooms:n.rooms.length,bindings:n.bindings.length,furniture:(n.furniture??[]).length}}}async function To(n){const t=await pt(n,{type:"home_architect/get_projects"});return(Array.isArray(t?.projects)?t.projects:[]).filter(e=>nt(e)&&typeof e.id=="string"&&Xt.test(e.id)).map(Sn)}function su(n){return n?.user?.is_admin===!0}async function au(n){try{const t=await pt(n,{type:"home_architect/list_projects"});return(Array.isArray(t?.projects)?t.projects:[]).map(Ph).filter(e=>e!==null)}catch(t){if(t instanceof R&&t.code==="unknown_command")return(await To(n)).map(Th);throw t}}async function cu(n,t){_t(t);try{const e=await pt(n,{type:"home_architect/get_project",project_id:t});return nt(e?.project)?Sn(e.project):null}catch(e){if(e instanceof R&&e.code==="not_found")return null;if(e instanceof R&&e.code==="unknown_command")return(await To(n)).find(r=>r.id===t)??null;throw e}}async function lu(n,t,e={}){_t(t.id);const r=Ia(t),i=r.background?.imageUrl;if(typeof i=="string"&&i.startsWith("data:")&&i.length>yr)throw new Bt(A("ui.api.background_not_uploaded"),i.length,yr);const o=Da(r);if(o>be)throw new Bt(Ye("ui.api.project_too_large",o,be),o,be);const s={type:"home_architect/save_project",project:r};e.expectedRevision!==void 0&&(s.expected_revision=e.expectedRevision),e.force&&(s.force=!0);const a=await pt(n,s,{bytes:o,limit:be}),c={id:typeof a?.id=="string"?a.id:t.id,revision:me(a?.revision)??0,updated_at:typeof a?.updated_at=="string"?a.updated_at:new Date().toISOString()};return typeof a?.asset_id=="string"&&Fe.test(a.asset_id)&&(c.assetId=a.asset_id),c}async function hu(n,t){_t(t);try{await pt(n,{type:"home_architect/delete_project",project_id:t})}catch(e){if(e instanceof R&&e.code==="not_found")return;throw e}}async function uu(n,t,e){_t(t);const r={bytes:e.size,limit:we};if(e.size>we)throw new Bt(Ye("ui.api.image_too_large",e.size,we),e.size,we);const i=await So(n,`/api/home_architect/background/${encodeURIComponent(t)}`,{method:"POST",body:e,headers:{"Content-Type":e.type||"application/octet-stream"}});if(!i.ok)throw Po(i.status,r);let o;try{o=await i.json()}catch{o=null}if(!nt(o)||typeof o.asset_id!="string"||!Fe.test(o.asset_id))throw new R("invalid_response",A("ui.api.invalid_upload_response"));return{assetId:o.asset_id,mimeType:typeof o.mime_type=="string"?o.mime_type:e.type,size:me(o.size)??e.size}}function Ih(n){const t=/^([A-Za-z0-9_-]{1,64})-[A-Za-z0-9]{6,64}\.[A-Za-z0-9]{2,5}$/.exec(n);return t&&Xt.test(t[1])?t[1]:null}async function Dh(n,t,e){_t(t),Sh(e);const r=Ih(e)??t,i=await So(n,`/api/home_architect/background/${encodeURIComponent(r)}/${encodeURIComponent(e)}`);if(!i.ok)throw Po(i.status);return i.blob()}const Ft=new Map;function du(n,t,e){const r=Ft.get(e);if(r)return r.refs+=1,r.promise;const i=Dh(n,t,e).then(s=>URL.createObjectURL(s)),o={promise:i,refs:1};return Ft.set(e,o),i.catch(()=>{Ft.get(e)===o&&Ft.delete(e)}),i}function fu(n){const t=Ft.get(n);t&&(t.refs-=1,!(t.refs>0)&&(Ft.delete(n),t.promise.then(e=>URL.revokeObjectURL(e),()=>{})))}async function pu(n,t,e,r){_t(t);const i=new TextEncoder().encode(e).length;if(i>ve)throw new Bt(Ye("ui.api.svg_too_large",i,ve),i,ve);const o=await pt(n,{type:"home_architect/publish_svg",project_id:t,svg_content:e,include_background:r.includeBackground===!0},{bytes:i,limit:ve}),s=En(o);if(!s)throw new R("invalid_response",A("ui.api.invalid_publish_response"));return s}async function mu(n,t){_t(t),await pt(n,{type:"home_architect/unpublish",project_id:t})}async function gu(n,t={}){const e={type:"home_architect/check_updates"};t.force&&(e.force=!0);const r=await pt(n,e),i=nt(r)?r:{},o=dt(i.release_url);return{installed_version:dt(i.installed_version)??"",latest_version:dt(i.latest_version)??null,update_available:i.update_available===!0,skipped_version:dt(i.skipped_version)??null,release_url:o&&/^https?:\/\//i.test(o)?o:null,release_notes:typeof i.release_notes=="string"?i.release_notes:"",update_entity_id:dt(i.update_entity_id)??null}}async function yu(n,t){const e={type:"home_architect/install_update"};t&&(e.version=t);const r=await pt(n,e),i=nt(r)?r:{};return{success:i.success===!0,installed_version:dt(i.installed_version)??"",requires_restart:i.requires_restart!==!1}}async function xu(n,t,e){_t(t);const r=n?.connection?.subscribeMessage;if(typeof r!="function")throw new R("not_connected",A("ui.api.not_connected"));const i=a=>{if(!nt(a)||a.project_id!==void 0&&a.project_id!==t)return;const c={project_id:t,revision:me(a.revision)??0};a.deleted===!0&&(c.deleted=!0),e(c)};let o;try{o=await r.call(n.connection,i,{type:"home_architect/subscribe_project",project_id:t})}catch(a){throw Eo(a)}let s=!0;return()=>{if(s){s=!1;try{const a=typeof o=="function"?o():void 0;a&&typeof a.catch=="function"&&a.catch(()=>{})}catch{}}}}function Io(){try{return typeof localStorage>"u"?null:localStorage}catch{return null}}function Do(n){return n.startsWith(ko)&&!Eh.has(n)}function bu(){const n=Io();if(!n)return[];const t=[];try{const e=[];for(let r=0;r<n.length;r++){const i=n.key(r);i&&Do(i)&&e.push(i)}for(const r of e){let i;try{const a=n.getItem(r);if(!a)continue;i=JSON.parse(a)}catch{continue}if(!nt(i)||!(Array.isArray(i.walls)||Array.isArray(i.rooms)||Array.isArray(i.bindings)))continue;const o=r.slice(ko.length),s=typeof i.id=="string"&&Xt.test(i.id)?i:{...i,id:o};t.push({key:r,project:Sn(s)})}}catch{}return t}function vu(n){if(typeof n!="string"||!Do(n))return;const t=Io();if(t)try{t.removeItem(n)}catch{}}const wu=yn`
  :host {
    --arch-ui-bg-fallback: #0f172a;
    --arch-ui-surface-fallback: #1e293b;
    --arch-ui-surface-2-fallback: #273449;
    --arch-ui-text-fallback: #f8fafc;
    --arch-ui-text-muted-fallback: #94a3b8;
    --arch-ui-border-fallback: rgba(148, 163, 184, 0.25);
    --arch-ui-overlay-fallback: rgba(2, 6, 23, 0.6);

    --arch-ui-bg: var(--ha-arch-ui-bg, var(--primary-background-color, var(--arch-ui-bg-fallback)));
    --arch-ui-surface: var(--ha-arch-ui-surface, var(--card-background-color, var(--ha-card-background, var(--arch-ui-surface-fallback))));
    --arch-ui-surface-2: var(--ha-arch-ui-surface-2, var(--secondary-background-color, var(--arch-ui-surface-2-fallback)));
    --arch-ui-text: var(--ha-arch-ui-text, var(--primary-text-color, var(--arch-ui-text-fallback)));
    --arch-ui-text-muted: var(--ha-arch-ui-text-muted, var(--secondary-text-color, var(--arch-ui-text-muted-fallback)));
    --arch-ui-border: var(--ha-arch-ui-border, var(--divider-color, var(--arch-ui-border-fallback)));
    --arch-ui-accent: var(--ha-arch-ui-accent, var(--primary-color, #38bdf8));
    --arch-ui-accent-text: var(--ha-arch-ui-accent-text, var(--text-primary-color, #ffffff));
    --arch-ui-danger: var(--ha-arch-ui-danger, var(--error-color, #ef4444));
    --arch-ui-warning: var(--ha-arch-ui-warning, var(--warning-color, #f59e0b));
    --arch-ui-success: var(--ha-arch-ui-success, var(--success-color, #22c55e));
    --arch-ui-info: var(--ha-arch-ui-info, var(--info-color, #0ea5e9));
    --arch-ui-overlay: var(--ha-arch-ui-overlay, var(--arch-ui-overlay-fallback));
    --arch-ui-radius: var(--ha-arch-ui-radius, var(--ha-card-border-radius, 12px));
    --arch-ui-font: var(--ha-arch-ui-font, var(--ha-font-family-body, var(--paper-font-body1_-_font-family, Roboto, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)));
    --arch-ui-focus-ring: 0 0 0 2px var(--arch-ui-accent);
  }

  :host([scheme='light']) {
    --arch-ui-bg-fallback: #f8fafc;
    --arch-ui-surface-fallback: #ffffff;
    --arch-ui-surface-2-fallback: #f1f5f9;
    --arch-ui-text-fallback: #0f172a;
    --arch-ui-text-muted-fallback: #475569;
    --arch-ui-border-fallback: rgba(15, 23, 42, 0.14);
    --arch-ui-overlay-fallback: rgba(15, 23, 42, 0.35);
  }

  :focus-visible {
    outline: none;
    box-shadow: var(--arch-ui-focus-ring);
  }

  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
`;function $u(n,t){const e=t?.themes?.darkMode;n.setAttribute("scheme",e===!1?"light":"dark")}const oe="2.0.7",mi="legacy",Ah={card:"home-architect-card",panel:"home-architect-panel"};function Cn(){const n=window.__homeArchitectBundles;return typeof n=="object"&&n!==null?n:window.__homeArchitectBundles={}}function gi(n){return n.trim().replace(/^v/i,"")}function _u(n){const t=Cn(),e=n==="card"?"panel":"card";t[e]===void 0&&customElements.get(Ah[e])&&(t[e]=mi,t[n]??=mi),t[n]??=oe,console.info(`%c 📐 HOME ARCHITECT %c v${oe} · ${n==="card"?"carte":"studio"} `,"background: #0284c7; color: #fff; font-weight: bold; border-radius: 4px 0 0 4px; padding: 2px 6px;","background: #1e293b; color: #38bdf8; font-weight: bold; border-radius: 0 4px 4px 0; padding: 2px 6px;");const r=Object.entries(t).filter(([,i])=>i!==oe);r.length>0&&console.warn(`[home-architect] Versions différentes chargées dans la page (${n} v${oe} évalué, actifs : `+r.map(([i,o])=>`${i} ${o}`).join(", ")+") : rechargez la page pour utiliser la nouvelle version.")}function Mu(){return{...Cn()}}function ku(n){if(typeof n!="string"||n.trim()==="")return!1;const t=gi(n),e=Object.values(Cn()).filter(r=>typeof r=="string");return[oe,...e].some(r=>gi(r)!==t)}export{Ra as $,$ as A,_i as B,Vt as C,Yh as D,ot as E,Di as F,Fh as G,Hh as H,zs as I,Xs as J,Zs as K,Wh as L,Uh as M,Ka as N,G as O,Xt as P,Ss as Q,Ht as R,Jh as S,Kh as T,we as U,Bh as V,Za as W,Vi as X,Sn as Y,Pr as Z,jo as _,yn as a,bo as a$,su as a0,Dh as a1,Zh as a2,R as a3,ve as a4,lc as a5,Bt as a6,Ge as a7,pu as a8,mu as a9,En as aA,bu as aB,vu as aC,Xh as aD,lu as aE,Mh as aF,I as aG,Me as aH,yu as aI,Ja as aJ,qh as aK,Qi as aL,Ws as aM,tc as aN,Vh as aO,Qa as aP,rn as aQ,eu as aR,et as aS,Ae as aT,Zl as aU,$t as aV,wl as aW,Wl as aX,jl as aY,ut as aZ,Nl as a_,Qh as aa,Ia as ab,Ki as ac,Mn as ad,Js as ae,Qs as af,ji as ag,hu as ah,Ne as ai,Ic as aj,tu as ak,yo as al,Jc as am,nu as an,ru as ao,el as ap,ie as aq,iu as ar,ou as as,uu as at,gu as au,Mo as av,ku as aw,Mu as ax,oe as ay,xa as az,ks as b,yt as b0,Il as b1,Pe as b2,Jr as b3,An as b4,Tl as b5,Xl as b6,Qr as b7,$u as c,Gh as d,xu as e,du as f,cu as g,fu as h,ae as i,A as j,Q as k,au as l,ki as m,z as n,j as o,Ba as p,_u as q,Oe as r,jh as s,Eo as t,wu as u,zh as v,w,Lh as x,$n as y,_n as z};
