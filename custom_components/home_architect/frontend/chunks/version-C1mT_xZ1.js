const ko=(function(){const t=typeof document<"u"&&document.createElement("link").relList;return t&&t.supports&&t.supports("modulepreload")?"modulepreload":"preload"})(),Mo=function(n,t){return new URL(n,t).href},Rn={},So=function(t,e,r){let i=Promise.resolve();if(e&&e.length>0){let l=function(h){return Promise.all(h.map(u=>Promise.resolve(u).then(p=>({status:"fulfilled",value:p}),p=>({status:"rejected",reason:p}))))};const s=document.getElementsByTagName("link"),a=document.querySelector("meta[property=csp-nonce]"),c=a?.nonce||a?.getAttribute("nonce");i=l(e.map(h=>{if(h=Mo(h,r),h in Rn)return;Rn[h]=!0;const u=h.endsWith(".css"),p=u?'[rel="stylesheet"]':"";if(r)for(let d=s.length-1;d>=0;d--){const m=s[d];if(m.href===h&&(!u||m.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${h}"]${p}`))return;const f=document.createElement("link");if(f.rel=u?"stylesheet":ko,u||(f.as="script"),f.crossOrigin="",f.href=h,c&&f.setAttribute("nonce",c),document.head.appendChild(f),u)return new Promise((d,m)=>{f.addEventListener("load",d),f.addEventListener("error",()=>m(new Error(`Unable to preload CSS for ${h}`)))})}))}function o(s){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=s,window.dispatchEvent(a),!a.defaultPrevented)throw s}return i.then(s=>{for(const a of s||[])a.status==="rejected"&&o(a.reason);return t().catch(o)})};const xe=globalThis,cn=xe.ShadowRoot&&(xe.ShadyCSS===void 0||xe.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ln=Symbol(),On=new WeakMap;let ai=class{constructor(t,e,r){if(this._$cssResult$=!0,r!==ln)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(cn&&t===void 0){const r=e!==void 0&&e.length===1;r&&(t=On.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),r&&On.set(e,t))}return t}toString(){return this.cssText}};const Je=n=>new ai(typeof n=="string"?n:n+"",void 0,ln),hn=(n,...t)=>{const e=n.length===1?n[0]:t.reduce((r,i,o)=>r+(s=>{if(s._$cssResult$===!0)return s.cssText;if(typeof s=="number")return s;throw Error("Value passed to 'css' function must be a 'css' function result: "+s+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+n[o+1],n[0]);return new ai(e,n,ln)},Po=(n,t)=>{if(cn)n.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const e of t){const r=document.createElement("style"),i=xe.litNonce;i!==void 0&&r.setAttribute("nonce",i),r.textContent=e.cssText,n.appendChild(r)}},Ln=cn?n=>n:n=>n instanceof CSSStyleSheet?(t=>{let e="";for(const r of t.cssRules)e+=r.cssText;return Je(e)})(n):n;const{is:Eo,defineProperty:To,getOwnPropertyDescriptor:Ao,getOwnPropertyNames:Do,getOwnPropertySymbols:Io,getPrototypeOf:Co}=Object,Pe=globalThis,Nn=Pe.trustedTypes,Ro=Nn?Nn.emptyScript:"",Oo=Pe.reactiveElementPolyfillSupport,Qt=(n,t)=>n,$e={toAttribute(n,t){switch(t){case Boolean:n=n?Ro:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,t){let e=n;switch(t){case Boolean:e=n!==null;break;case Number:e=n===null?null:Number(n);break;case Object:case Array:try{e=JSON.parse(n)}catch{e=null}}return e}},un=(n,t)=>!Eo(n,t),jn={attribute:!0,type:String,converter:$e,reflect:!1,useDefault:!1,hasChanged:un};Symbol.metadata??=Symbol("metadata"),Pe.litPropertyMetadata??=new WeakMap;let Tt=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=jn){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const r=Symbol(),i=this.getPropertyDescriptor(t,r,e);i!==void 0&&To(this.prototype,t,i)}}static getPropertyDescriptor(t,e,r){const{get:i,set:o}=Ao(this.prototype,t)??{get(){return this[e]},set(s){this[e]=s}};return{get:i,set(s){const a=i?.call(this);o?.call(this,s),this.requestUpdate(t,a,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??jn}static _$Ei(){if(this.hasOwnProperty(Qt("elementProperties")))return;const t=Co(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(Qt("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(Qt("properties"))){const e=this.properties,r=[...Do(e),...Io(e)];for(const i of r)this.createProperty(i,e[i])}const t=this[Symbol.metadata];if(t!==null){const e=litPropertyMetadata.get(t);if(e!==void 0)for(const[r,i]of e)this.elementProperties.set(r,i)}this._$Eh=new Map;for(const[e,r]of this.elementProperties){const i=this._$Eu(e,r);i!==void 0&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const r=new Set(t.flat(1/0).reverse());for(const i of r)e.unshift(Ln(i))}else t!==void 0&&e.push(Ln(t));return e}static _$Eu(t,e){const r=e.attribute;return r===!1?void 0:typeof r=="string"?r:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const r of e.keys())this.hasOwnProperty(r)&&(t.set(r,this[r]),delete this[r]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Po(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,r){this._$AK(t,r)}_$ET(t,e){const r=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,r);if(i!==void 0&&r.reflect===!0){const o=(r.converter?.toAttribute!==void 0?r.converter:$e).toAttribute(e,r.type);this._$Em=t,o==null?this.removeAttribute(i):this.setAttribute(i,o),this._$Em=null}}_$AK(t,e){const r=this.constructor,i=r._$Eh.get(t);if(i!==void 0&&this._$Em!==i){const o=r.getPropertyOptions(i),s=typeof o.converter=="function"?{fromAttribute:o.converter}:o.converter?.fromAttribute!==void 0?o.converter:$e;this._$Em=i;const a=s.fromAttribute(e,o.type);this[i]=a??this._$Ej?.get(i)??a,this._$Em=null}}requestUpdate(t,e,r,i=!1,o){if(t!==void 0){const s=this.constructor;if(i===!1&&(o=this[t]),r??=s.getPropertyOptions(t),!((r.hasChanged??un)(o,e)||r.useDefault&&r.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(s._$Eu(t,r))))return;this.C(t,e,r)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:r,reflect:i,wrapped:o},s){r&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,s??e??this[t]),o!==!0||s!==void 0)||(this._$AL.has(t)||(this.hasUpdated||r||(e=void 0),this._$AL.set(t,e)),i===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[i,o]of this._$Ep)this[i]=o;this._$Ep=void 0}const r=this.constructor.elementProperties;if(r.size>0)for(const[i,o]of r){const{wrapped:s}=o,a=this[i];s!==!0||this._$AL.has(i)||a===void 0||this.C(i,void 0,o,a)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(r=>r.hostUpdate?.()),this.update(e)):this._$EM()}catch(r){throw t=!1,this._$EM(),r}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};Tt.elementStyles=[],Tt.shadowRootOptions={mode:"open"},Tt[Qt("elementProperties")]=new Map,Tt[Qt("finalized")]=new Map,Oo?.({ReactiveElement:Tt}),(Pe.reactiveElementVersions??=[]).push("2.1.2");const dn=globalThis,Fn=n=>n,_e=dn.trustedTypes,zn=_e?_e.createPolicy("lit-html",{createHTML:n=>n}):void 0,ci="$lit$",ft=`lit$${Math.random().toFixed(9).slice(2)}$`,li="?"+ft,Lo=`<${li}>`,Mt=document,re=()=>Mt.createComment(""),ie=n=>n===null||typeof n!="object"&&typeof n!="function",pn=Array.isArray,No=n=>pn(n)||typeof n?.[Symbol.iterator]=="function",Fe=`[ 	
\f\r]`,qt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Wn=/-->/g,Hn=/>/g,wt=RegExp(`>|${Fe}(?:([^\\s"'>=/]+)(${Fe}*=${Fe}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Un=/'/g,Yn=/"/g,hi=/^(?:script|style|textarea|title)$/i,ui=n=>(t,...e)=>({_$litType$:n,strings:t,values:e}),K=ui(1),$=ui(2),et=Symbol.for("lit-noChange"),v=Symbol.for("lit-nothing"),Bn=new WeakMap,kt=Mt.createTreeWalker(Mt,129);function di(n,t){if(!pn(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return zn!==void 0?zn.createHTML(t):t}const jo=(n,t)=>{const e=n.length-1,r=[];let i,o=t===2?"<svg>":t===3?"<math>":"",s=qt;for(let a=0;a<e;a++){const c=n[a];let l,h,u=-1,p=0;for(;p<c.length&&(s.lastIndex=p,h=s.exec(c),h!==null);)p=s.lastIndex,s===qt?h[1]==="!--"?s=Wn:h[1]!==void 0?s=Hn:h[2]!==void 0?(hi.test(h[2])&&(i=RegExp("</"+h[2],"g")),s=wt):h[3]!==void 0&&(s=wt):s===wt?h[0]===">"?(s=i??qt,u=-1):h[1]===void 0?u=-2:(u=s.lastIndex-h[2].length,l=h[1],s=h[3]===void 0?wt:h[3]==='"'?Yn:Un):s===Yn||s===Un?s=wt:s===Wn||s===Hn?s=qt:(s=wt,i=void 0);const f=s===wt&&n[a+1].startsWith("/>")?" ":"";o+=s===qt?c+Lo:u>=0?(r.push(l),c.slice(0,u)+ci+c.slice(u)+ft+f):c+ft+(u===-2?a:f)}return[di(n,o+(n[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),r]};class oe{constructor({strings:t,_$litType$:e},r){let i;this.parts=[];let o=0,s=0;const a=t.length-1,c=this.parts,[l,h]=jo(t,e);if(this.el=oe.createElement(l,r),kt.currentNode=this.el.content,e===2||e===3){const u=this.el.content.firstChild;u.replaceWith(...u.childNodes)}for(;(i=kt.nextNode())!==null&&c.length<a;){if(i.nodeType===1){if(i.hasAttributes())for(const u of i.getAttributeNames())if(u.endsWith(ci)){const p=h[s++],f=i.getAttribute(u).split(ft),d=/([.?@])?(.*)/.exec(p);c.push({type:1,index:o,name:d[2],strings:f,ctor:d[1]==="."?zo:d[1]==="?"?Wo:d[1]==="@"?Ho:Ee}),i.removeAttribute(u)}else u.startsWith(ft)&&(c.push({type:6,index:o}),i.removeAttribute(u));if(hi.test(i.tagName)){const u=i.textContent.split(ft),p=u.length-1;if(p>0){i.textContent=_e?_e.emptyScript:"";for(let f=0;f<p;f++)i.append(u[f],re()),kt.nextNode(),c.push({type:2,index:++o});i.append(u[p],re())}}}else if(i.nodeType===8)if(i.data===li)c.push({type:2,index:o});else{let u=-1;for(;(u=i.data.indexOf(ft,u+1))!==-1;)c.push({type:7,index:o}),u+=ft.length-1}o++}}static createElement(t,e){const r=Mt.createElement("template");return r.innerHTML=t,r}}function Rt(n,t,e=n,r){if(t===et)return t;let i=r!==void 0?e._$Co?.[r]:e._$Cl;const o=ie(t)?void 0:t._$litDirective$;return i?.constructor!==o&&(i?._$AO?.(!1),o===void 0?i=void 0:(i=new o(n),i._$AT(n,e,r)),r!==void 0?(e._$Co??=[])[r]=i:e._$Cl=i),i!==void 0&&(t=Rt(n,i._$AS(n,t.values),i,r)),t}class Fo{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:r}=this._$AD,i=(t?.creationScope??Mt).importNode(e,!0);kt.currentNode=i;let o=kt.nextNode(),s=0,a=0,c=r[0];for(;c!==void 0;){if(s===c.index){let l;c.type===2?l=new Ht(o,o.nextSibling,this,t):c.type===1?l=new c.ctor(o,c.name,c.strings,this,t):c.type===6&&(l=new Uo(o,this,t)),this._$AV.push(l),c=r[++a]}s!==c?.index&&(o=kt.nextNode(),s++)}return kt.currentNode=Mt,i}p(t){let e=0;for(const r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(t,r,e),e+=r.strings.length-2):r._$AI(t[e])),e++}}class Ht{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,r,i){this.type=2,this._$AH=v,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=r,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Rt(this,t,e),ie(t)?t===v||t==null||t===""?(this._$AH!==v&&this._$AR(),this._$AH=v):t!==this._$AH&&t!==et&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):No(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==v&&ie(this._$AH)?this._$AA.nextSibling.data=t:this.T(Mt.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:r}=t,i=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=oe.createElement(di(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===i)this._$AH.p(e);else{const o=new Fo(i,this),s=o.u(this.options);o.p(e),this.T(s),this._$AH=o}}_$AC(t){let e=Bn.get(t.strings);return e===void 0&&Bn.set(t.strings,e=new oe(t)),e}k(t){pn(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let r,i=0;for(const o of t)i===e.length?e.push(r=new Ht(this.O(re()),this.O(re()),this,this.options)):r=e[i],r._$AI(o),i++;i<e.length&&(this._$AR(r&&r._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const r=Fn(t).nextSibling;Fn(t).remove(),t=r}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}}class Ee{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,r,i,o){this.type=1,this._$AH=v,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=o,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=v}_$AI(t,e=this,r,i){const o=this.strings;let s=!1;if(o===void 0)t=Rt(this,t,e,0),s=!ie(t)||t!==this._$AH&&t!==et,s&&(this._$AH=t);else{const a=t;let c,l;for(t=o[0],c=0;c<o.length-1;c++)l=Rt(this,a[r+c],e,c),l===et&&(l=this._$AH[c]),s||=!ie(l)||l!==this._$AH[c],l===v?t=v:t!==v&&(t+=(l??"")+o[c+1]),this._$AH[c]=l}s&&!i&&this.j(t)}j(t){t===v?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class zo extends Ee{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===v?void 0:t}}class Wo extends Ee{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==v)}}class Ho extends Ee{constructor(t,e,r,i,o){super(t,e,r,i,o),this.type=5}_$AI(t,e=this){if((t=Rt(this,t,e,0)??v)===et)return;const r=this._$AH,i=t===v&&r!==v||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,o=t!==v&&(r===v||i);i&&this.element.removeEventListener(this.name,this,r),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class Uo{constructor(t,e,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){Rt(this,t)}}const lh={I:Ht},Yo=dn.litHtmlPolyfillSupport;Yo?.(oe,Ht),(dn.litHtmlVersions??=[]).push("3.3.3");const Bo=(n,t,e)=>{const r=e?.renderBefore??t;let i=r._$litPart$;if(i===void 0){const o=e?.renderBefore??null;r._$litPart$=i=new Ht(t.insertBefore(re(),o),o,void 0,e??{})}return i._$AI(n),i};const fn=globalThis;let te=class extends Tt{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Bo(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return et}};te._$litElement$=!0,te.finalized=!0,fn.litElementHydrateSupport?.({LitElement:te});const qo=fn.litElementPolyfillSupport;qo?.({LitElement:te});(fn.litElementVersions??=[]).push("4.2.2");const Xo={attribute:!0,type:String,converter:$e,reflect:!1,hasChanged:un},Vo=(n=Xo,t,e)=>{const{kind:r,metadata:i}=e;let o=globalThis.litPropertyMetadata.get(i);if(o===void 0&&globalThis.litPropertyMetadata.set(i,o=new Map),r==="setter"&&((n=Object.create(n)).wrapped=!0),o.set(e.name,n),r==="accessor"){const{name:s}=e;return{set(a){const c=t.get.call(this);t.set.call(this,a),this.requestUpdate(s,c,n,!0,a)},init(a){return a!==void 0&&this.C(s,void 0,n,a),a}}}if(r==="setter"){const{name:s}=e;return function(a){const c=this[s];t.call(this,a),this.requestUpdate(s,c,n,!0,a)}}throw Error("Unsupported decorator location: "+r)};function F(n){return(t,e)=>typeof e=="object"?Vo(n,t,e):((r,i,o)=>{const s=i.hasOwnProperty(o);return i.constructor.createProperty(o,r),s?Object.getOwnPropertyDescriptor(i,o):void 0})(n,t,e)}function j(n){return F({...n,state:!0,attribute:!1})}const pi={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4},mn=n=>(...t)=>({_$litDirective$:n,values:t});let gn=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,r){this._$Ct=t,this._$AM=e,this._$Ci=r}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};const qn=mn(class extends gn{constructor(n){if(super(n),n.type!==pi.ATTRIBUTE||n.name!=="class"||n.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(n){return" "+Object.keys(n).filter(t=>n[t]).join(" ")+" "}update(n,[t]){if(this.st===void 0){this.st=new Set,n.strings!==void 0&&(this.nt=new Set(n.strings.join(" ").split(/\s/).filter(r=>r!=="")));for(const r in t)t[r]&&!this.nt?.has(r)&&this.st.add(r);return this.render(t)}const e=n.element.classList;for(const r of this.st)r in t||(e.remove(r),this.st.delete(r));for(const r in t){const i=!!t[r];i===this.st.has(r)||this.nt?.has(r)||(i?(e.add(r),this.st.add(r)):(e.remove(r),this.st.delete(r)))}return et}});const Go={},ht=mn(class extends gn{constructor(){super(...arguments),this.ot=Go}render(n,t){return t()}update(n,[t,e]){if(Array.isArray(t)){if(Array.isArray(this.ot)&&this.ot.length===t.length&&t.every((r,i)=>r===this.ot[i]))return et}else if(this.ot===t)return et;return this.ot=Array.isArray(t)?Array.from(t):t,this.render(t,e)}});const fi="important",Ko=" !"+fi,Xn=mn(class extends gn{constructor(n){if(super(n),n.type!==pi.ATTRIBUTE||n.name!=="style"||n.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(n){return Object.keys(n).reduce((t,e)=>{const r=n[e];return r==null?t:t+`${e=e.includes("-")?e:e.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${r};`},"")}update(n,[t]){const{style:e}=n.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(t)),this.render(t);for(const r of this.ft)t[r]==null&&(this.ft.delete(r),r.includes("-")?e.removeProperty(r):e[r]=null);for(const r in t){const i=t[r];if(i!=null){this.ft.add(r);const o=typeof i=="string"&&i.endsWith(Ko);r.includes("-")||o?e.setProperty(r,o?i.slice(0,-11):i,o?fi:""):e[r]=i}}return et}}),Zo=hn`
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
`,dh=[.05,.1,.25,.5,1],ee={vertex:12,guide:8,wall:10},Vn={vertex:.25,guide:.18,wall:.25},Jo=45,Qo=6,ve=3,Gn=.3,ts=.05,es=.02,ns=.26;function ne(n,t){const e=Math.pow(10,t),r=Math.round(n*e)/e;return r===0?0:r}function Xt(n,t=ve){return{x:ne(n.x,t),y:ne(n.y,t)}}function Kn(n,t){return Math.abs(n.x-t.x)<.001&&Math.abs(n.y-t.y)<.001}function Zn(n,t){const e=(n.x-t.origin.x)*t.dir.x+(n.y-t.origin.y)*t.dir.y;return{x:t.origin.x+e*t.dir.x,y:t.origin.y+e*t.dir.y}}function Jn(n,t){if(t.kind!=="wall"||!t.wall)return!0;const e=t.wall,r=(n.x-e.start.x)*t.dir.x+(n.y-e.start.y)*t.dir.y;return r>=-1e-9&&r<=Math.hypot(e.end.x-e.start.x,e.end.y-e.start.y)+1e-9}function rs(n,t){const e=n.dir.x*t.dir.y-n.dir.y*t.dir.x;if(Math.abs(e)<1e-9)return null;const r=t.origin.x-n.origin.x,i=t.origin.y-n.origin.y,o=(r*t.dir.y-i*t.dir.x)/e,s={x:n.origin.x+o*n.dir.x,y:n.origin.y+o*n.dir.y};for(const a of[n,t])if(a.kind==="angle"&&(s.x-a.origin.x)*a.dir.x+(s.y-a.origin.y)*a.dir.y<0)return null;return s}class A{static snapPoint(t,e,r=[],i,o={}){const s=typeof o=="number"?{}:o,a=this.resolveTolerances(o),c=new Set(s.excludeWallIds??[]),l=r.filter(x=>!c.has(x.id)),h=[...i?[i]:[],...s.excludePoints??[]],u=x=>h.some(E=>Kn(E,x)),p=e.size>0?e.size:.5,f=[];if(e.snapToElements&&l.length>0){let x=null,E=a.vertex;for(const Y of l)for(const O of[Y.start,Y.end]){if(u(O))continue;const G=this.distance(t,O);G<E&&(E=G,x=O)}if(x)return{point:{x:x.x,y:x.y},snappedTo:"vertex",constraints:["vertex"]};const _=this.findWallLine(t,l,a,i);if(_){const Y=_.wall,O={x:(Y.start.x+Y.end.x)/2,y:(Y.start.y+Y.end.y)/2};if(this.distance(Zn(t,_),O)<=a.vertex&&!u(O))return{point:Xt(O),snappedTo:"midpoint",constraints:["midpoint"],wallId:Y.id};f.push(_)}let b,k,P=a.guide,z=a.guide;for(const Y of l)for(const O of[Y.start,Y.end]){if(u(O))continue;const G=Math.abs(t.x-O.x),ue=Math.abs(t.y-O.y);G<P&&!(i&&Math.abs(O.x-i.x)<.001)&&(P=G,b=O.x),ue<z&&!(i&&Math.abs(O.y-i.y)<.001)&&(z=ue,k=O.y)}const B=[];b!==void 0&&B.push({kind:"smart_guide",axis:"x",value:b,origin:{x:b,y:0},dir:{x:0,y:1},offset:P}),k!==void 0&&B.push({kind:"smart_guide",axis:"y",value:k,origin:{x:0,y:k},dir:{x:1,y:0},offset:z}),B.sort((Y,O)=>Y.offset-O.offset),f.push(...B)}if(e.snapToAngles&&i){const x=this.findAngleLine(t,i,s);if(x){for(let E=f.length-1;E>=0;E--){const _=f[E];_.kind==="smart_guide"&&Math.abs(_.dir.x*x.dir.y-_.dir.y*x.dir.x)<1e-9&&f.splice(E,1)}f.push(x)}}if(f.length===0)return e.snapToGrid?{point:Xt({x:this.quantize(t.x,p),y:this.quantize(t.y,p)}),snappedTo:"grid",constraints:["grid"]}:{point:Xt(t),snappedTo:"none",constraints:[]};const d=f[0];let m,g=null;for(const x of f.slice(1)){const E=rs(d,x);if(!(!E||i&&Kn(E,i))&&!(!Jn(E,d)||!Jn(E,x))&&this.distance(E,t)<=2*(d.offset+x.offset)+1e-9){m=x,g=E;break}}const w=[d.kind];m?w.push(m.kind):(g=Zn(t,d),e.snapToGrid&&(g=this.quantizeAlongLine(g,d,p),w.push("grid")));const y={point:Xt(g),snappedTo:d.kind,constraints:w};for(const x of m?[d,m]:[d])x.kind==="angle"&&(y.guideAngle=x.angle),x.kind==="wall"&&(y.wallId=x.wall?.id),x.kind==="smart_guide"&&(x.axis==="x"?y.smartGuideX=x.value:y.smartGuideY=x.value);return y}static snapPointToWall(t,e,r=.6,i={}){let o=null,s=1/0;for(const a of e){const c=a.end.x-a.start.x,l=a.end.y-a.start.y,h=Math.sqrt(c*c+l*l);if(h===0)continue;const u=Math.max(0,Math.min(1,((t.x-a.start.x)*c+(t.y-a.start.y)*l)/(h*h))),p=a.start.x+u*c,f=a.start.y+u*l,d=Math.sqrt((t.x-p)**2+(t.y-f)**2),m=i.measureFromFace?r+(a.thickness||0)/2:r;d<=m&&d<s&&(s=d,o={wall:a,projectionPoint:{x:p,y:f},offset:u*h,distance:d,angleRad:Math.atan2(l,c)})}return o}static fitOpening(t,e,r,i={}){const o=this.wallLength(t),s=i.endMargin??ts,a=o>0?(t.end.x-t.start.x)/o:0,c=o>0?(t.end.y-t.start.y)/o:0,l=P=>{const z=this.wallLength(P);return z>0&&Math.abs(a*(P.end.y-P.start.y)-c*(P.end.x-P.start.x))/z>=ns},h=(i.walls??[]).filter(P=>P.id!==t.id&&l(P)),u=P=>h.reduce((z,B)=>this.distanceToSegment(P,B.start,B.end)<=es?Math.max(z,(B.thickness||0)/2):z,0),p=Math.min(o,u(t.start)+s),f=Math.max(p,o-u(t.end)-s),d=f-p,m=Number.isFinite(r)&&r>0?r:Gn,g=Number.isFinite(e)?e:o/2,w=d+1e-9>=Gn,y=Math.min(m,Math.max(0,d)),x=y/2,E=w?Math.min(f-x,Math.max(p+x,g)):(p+f)/2,_=(i.openings??[]).filter(P=>P.wallId===t.id&&P.id!==i.ignoreOpeningId).filter(P=>Math.abs(P.offset-E)<(P.width+y)/2-.001).map(P=>P.id),b=ne(E,ve),k=ne(y,ve);return{offset:b,width:k,fits:w,adjusted:Math.abs(b-g)>.001||Math.abs(k-m)>.001,overlaps:_,usableStart:p,usableEnd:f}}static metersFromPixels(t,e){return t/Math.max(e,1e-6)}static quantize(t,e){return e>0?ne(Math.round(t/e)*e,6):t}static roundPoint(t,e=ve){return Xt(t,e)}static wallLength(t){return this.distance(t.start,t.end)}static distance(t,e){const r=t.x-e.x,i=t.y-e.y;return Math.sqrt(r*r+i*i)}static roundMeters(t,e=2){const r=Math.pow(10,e);return Math.round(t*r)/r}static resolveTolerances(t){if(typeof t=="number")return{...Vn,vertex:t};const e=t.screenPixelsPerMeter;return e!==void 0&&Number.isFinite(e)&&e>0?{vertex:this.metersFromPixels(t.vertexTolerancePx??ee.vertex,e),guide:this.metersFromPixels(t.guideTolerancePx??ee.guide,e),wall:this.metersFromPixels(t.wallTolerancePx??ee.wall,e)}:{...Vn}}static findWallLine(t,e,r,i){let o=null,s=1/0;for(const a of e){const c=a.end.x-a.start.x,l=a.end.y-a.start.y,h=Math.hypot(c,l);if(h<1e-9||i&&this.distanceToSegment(i,a.start,a.end)<.001)continue;const u=c/h,p=l/h,f=(t.x-a.start.x)*u+(t.y-a.start.y)*p;if(f<=0||f>=h)continue;const d=Math.abs((t.x-a.start.x)*p-(t.y-a.start.y)*u),m=Math.max(0,d-(a.thickness||0)/2);m>r.wall||(m<s||m===s&&o&&d<o.offset)&&(s=m,o={kind:"wall",origin:a.start,dir:{x:u,y:p},offset:d,wall:a})}return o}static findAngleLine(t,e,r){const i=t.x-e.x,o=t.y-e.y;if(Math.hypot(i,o)<1e-6)return null;const a=r.angleStepDeg&&r.angleStepDeg>0?r.angleStepDeg:Jo,c=r.angleToleranceDeg??Qo;let l=Math.atan2(o,i)*180/Math.PI;l<0&&(l+=360);const h=Math.round(l/a)*a;if(Math.abs(l-h)>c)return null;const u=h*Math.PI/180,p={x:Math.cos(u),y:Math.sin(u)};Math.abs(p.x)<1e-12&&(p.x=0),Math.abs(p.y)<1e-12&&(p.y=0);const f=Math.abs(i*p.y-o*p.x);return{kind:"angle",angle:(h%360+360)%360,origin:e,dir:p,offset:f}}static quantizeAlongLine(t,e,r){if(e.kind==="smart_guide")return e.axis==="x"?{x:t.x,y:this.quantize(t.y,r)}:{x:this.quantize(t.x,r),y:t.y};if(e.kind==="angle"){const s=(t.x-e.origin.x)*e.dir.x+(t.y-e.origin.y)*e.dir.y,a=this.quantize(s,r),c=a>0?a:s;return{x:e.origin.x+c*e.dir.x,y:e.origin.y+c*e.dir.y}}const i=e.wall;let o;return Math.abs(e.dir.y)<1e-9?o=(this.quantize(t.x,r)-i.start.x)/e.dir.x:Math.abs(e.dir.x)<1e-9?o=(this.quantize(t.y,r)-i.start.y)/e.dir.y:o=this.quantize((t.x-i.start.x)*e.dir.x+(t.y-i.start.y)*e.dir.y,r),o=Math.max(0,Math.min(this.wallLength(i),o)),{x:i.start.x+o*e.dir.x,y:i.start.y+o*e.dir.y}}static distanceToSegment(t,e,r){const i=r.x-e.x,o=r.y-e.y,s=i*i+o*o;if(s===0)return this.distance(t,e);const a=Math.max(0,Math.min(1,((t.x-e.x)*i+(t.y-e.y)*o)/s));return this.distance(t,{x:e.x+a*i,y:e.y+a*o})}}const Qn=1e-4,ze=.02,tr=.01,is=.5,os=5e3,ss=256,de=new Map,as=512;class cs{constructor(){this.items=[]}get length(){return this.items.length}push(t){const e=this.items;e.push(t);let r=e.length-1;for(;r>0;){const i=r-1>>1;if(e[i].max>=e[r].max)break;[e[i],e[r]]=[e[r],e[i]],r=i}}pop(){const t=this.items,e=t[0],r=t.pop();if(t.length>0&&r){t[0]=r;let i=0;for(;;){const o=2*i+1,s=o+1;let a=i;if(o<t.length&&t[o].max>t[a].max&&(a=o),s<t.length&&t[s].max>t[a].max&&(a=s),a===i)break;[t[a],t[i]]=[t[i],t[a]],i=a}}return e}}function ot(n,t,e,r){return n*r-t*e}function er(n,t,e){const r=e.x-t.x,i=e.y-t.y,o=r*r+i*i;if(o===0)return Math.hypot(n.x-t.x,n.y-t.y);const s=Math.max(0,Math.min(1,((n.x-t.x)*r+(n.y-t.y)*i)/o));return Math.hypot(n.x-(t.x+s*r),n.y-(t.y+s*i))}function nr(n){const t=[];for(const e of n){const r=t[t.length-1];(!r||Math.hypot(e.x-r.x,e.y-r.y)>1e-9)&&t.push(e)}for(;t.length>1&&Math.hypot(t[0].x-t[t.length-1].x,t[0].y-t[t.length-1].y)<=1e-9;)t.pop();return t}function ls(n,t,e,r){const i=t.x-n.x,o=t.y-n.y,s=r.x-e.x,a=r.y-e.y,c=ot(i,o,s,a),l=e.x-n.x,h=e.y-n.y;if(Math.abs(c)<1e-12){if(Math.abs(ot(l,h,i,o))>1e-9)return null;const d=i*i+o*o;if(d===0)return null;const m=(l*i+h*o)/d,g=m+(s*i+a*o)/d,w=Math.max(0,Math.min(m,g)),y=Math.min(1,Math.max(m,g));return w>y+1e-9?null:{x:n.x+w*i,y:n.y+w*o}}const p=ot(l,h,s,a)/c,f=ot(l,h,i,o)/c;return p<-1e-9||p>1+1e-9||f<-1e-9||f>1+1e-9?null:{x:n.x+p*i,y:n.y+p*o}}function hs(n){return Math.round(n*100)/100}class q{static isPointInPolygon(t,e){if(!e||e.length<3)return!1;let r=!1;for(let i=0,o=e.length-1;i<e.length;o=i++){const s=e[i].x,a=e[i].y,c=e[o].x,l=e[o].y;a>t.y!=l>t.y&&t.x<(c-s)*(t.y-a)/(l-a)+s&&(r=!r)}return r}static isPointOnBoundary(t,e,r=Qn){if(!e||e.length<2)return!1;for(let i=0;i<e.length;i++)if(er(t,e[i],e[(i+1)%e.length])<=r)return!0;return!1}static containsPoint(t,e,r=Qn){return!e||e.length<3?!1:this.isPointOnBoundary(t,e,r)||this.isPointInPolygon(t,e)}static findRoomContainingPoint(t,e){let r=null,i=1/0;for(const o of e){if(!this.containsPoint(t,o.polygon))continue;const s=Math.abs(this.signedArea(o.polygon));s<i-1e-9&&(r=o,i=s)}return r}static signedArea(t){if(!t||t.length<3)return 0;let e=0;for(let r=0;r<t.length;r++){const i=t[r],o=t[(r+1)%t.length];e+=i.x*o.y-o.x*i.y}return e/2}static calculateCentroid(t){if(!t||t.length===0)return{x:0,y:0};let e=0,r=0;for(const h of t)e+=h.x,r+=h.y;const i={x:e/t.length,y:r/t.length};if(t.length<3)return i;const o=t[0].x,s=t[0].y;let a=0,c=0,l=0;for(let h=0;h<t.length;h++){const u=t[h].x-o,p=t[h].y-s,f=t[(h+1)%t.length],d=f.x-o,m=f.y-s,g=u*m-d*p;a+=g,c+=(u+d)*g,l+=(p+m)*g}return Math.abs(a)<1e-12?i:{x:o+c/(3*a),y:s+l/(3*a)}}static distanceToBoundary(t,e){if(!e||e.length===0)return 1/0;if(e.length===1)return Math.hypot(t.x-e[0].x,t.y-e[0].y);let r=1/0;for(let i=0;i<e.length;i++)r=Math.min(r,er(t,e[i],e[(i+1)%e.length]));return r}static poleOfInaccessibility(t,e=tr){return this.searchInteriorPoint(t,e,0)}static searchInteriorPoint(t,e,r){const i=nr(t||[]);if(i.length<3)return{point:this.calculateCentroid(i),distance:0};let o=1/0,s=1/0,a=-1/0,c=-1/0;for(const b of i)o=Math.min(o,b.x),s=Math.min(s,b.y),a=Math.max(a,b.x),c=Math.max(c,b.y);const l=a-o,h=c-s;if(!(l>0&&h>0)||Math.abs(this.signedArea(i))<1e-12)return{point:this.calculateCentroid(i),distance:0};const u=Math.max(Math.min(l,h),e,Math.max(l,h)/ss),p=Math.max(e,u*1e-6),f=this.calculateCentroid(i),d=(b,k,P)=>{const z={x:b,y:k},B=this.distanceToBoundary(z,i),Y=this.isPointInPolygon(z,i)?B:-B,O=Y-r*Math.hypot(b-f.x,k-f.y);return{x:b,y:k,h:P,d:Y,score:O,max:O+P*Math.SQRT2*(1+r)}},m=new cs,g=u/2,w=Math.ceil(l/u),y=Math.ceil(h/u);for(let b=0;b<w;b++)for(let k=0;k<y;k++)m.push(d(o+b*u+g,s+k*u+g,g));let x=d(f.x,f.y,0);const E=d(o+l/2,s+h/2,0);E.score>x.score&&(x=E);let _=0;for(;m.length>0&&_<os;){const b=m.pop();if(_++,b.score>x.score&&(x=b),b.max-x.score<=p)continue;const k=b.h/2;m.push(d(b.x-k,b.y-k,k)),m.push(d(b.x+k,b.y-k,k)),m.push(d(b.x-k,b.y+k,k)),m.push(d(b.x+k,b.y+k,k))}return{point:{x:x.x,y:x.y},distance:Math.max(0,x.d)}}static labelPoint(t){if(!t||t.length<3)return this.calculateCentroid(t);const e=t.map(c=>`${c.x},${c.y}`).join(";"),r=de.get(e);if(r)return{...r};const i=this.calculateCentroid(t),o=this.poleOfInaccessibility(t);let a=(this.isPointInPolygon(i,t)?this.distanceToBoundary(i,t):-1)>=o.distance*.5?i:this.searchInteriorPoint(t,tr,is).point;return!this.isPointInPolygon(a,t)&&this.isPointInPolygon(o.point,t)&&(a=o.point),de.size>=as&&de.clear(),de.set(e,a),{...a}}static computeArea(t){return hs(Math.abs(this.signedArea(t)))}static findSelfIntersections(t){const e=nr(t||[]),r=e.length,i=[];if(r<3)return i;for(let o=0;o<r;o++){const s=e[o],a=e[(o+1)%r];for(let c=o+1;c<r;c++){const l=e[c],h=e[(c+1)%r];if(c===o+1||o===0&&c===r-1){const f=c===o+1?a:s,d=c===o+1?{x:s.x-f.x,y:s.y-f.y}:{x:a.x-f.x,y:a.y-f.y},m=c===o+1?{x:h.x-f.x,y:h.y-f.y}:{x:l.x-f.x,y:l.y-f.y},g=Math.hypot(d.x,d.y),w=Math.hypot(m.x,m.y);g>0&&w>0&&Math.abs(ot(d.x,d.y,m.x,m.y))/(g*w)<1e-9&&d.x*m.x+d.y*m.y>0&&i.push({edgeA:o,edgeB:c,point:{...f}});continue}const p=ls(s,a,l,h);p&&i.push({edgeA:o,edgeB:c,point:p})}}return i}static isSelfIntersecting(t){return this.findSelfIntersections(t).length>0}static offsetPolygon(t,e){if(!t||t.length<3)return null;const r=[],i=[],o=t.length;for(let d=0;d<o;d++){const m=t[d],g=t[(d+1)%o];if(Math.hypot(g.x-m.x,g.y-m.y)<=1e-9)continue;const w=Array.isArray(e)?e[d]:e;if(!Number.isFinite(w))return null;r.push(m),i.push(w)}const s=r.length;if(s<3)return null;const a=this.signedArea(r);if(Math.abs(a)<1e-12)return null;const c=a>0?1:-1,l=r.map((d,m)=>{const g=r[(m+1)%s],w=Math.hypot(g.x-d.x,g.y-d.y),y=(g.x-d.x)/w,x=(g.y-d.y)/w,E=-x*c,_=y*c;return{px:d.x+E*i[m],py:d.y+_*i[m],ux:y,uy:x,nx:E,ny:_}}),h=[];for(let d=0;d<s;d++){const m=l[(d-1+s)%s],g=l[d],w=ot(m.ux,m.uy,g.ux,g.uy);if(Math.abs(w)<1e-9){const x=r[d],E=i[(d-1+s)%s],_=[{x:x.x+m.nx*E,y:x.y+m.ny*E}];Math.abs(E-i[d])>1e-9&&_.push({x:x.x+g.nx*i[d],y:x.y+g.ny*i[d]}),h.push(_);continue}const y=ot(g.px-m.px,g.py-m.py,g.ux,g.uy)/w;h.push([{x:m.px+y*m.ux,y:m.py+y*m.uy}])}for(let d=0;d<s;d++){const m=h[d][h[d].length-1],g=h[(d+1)%s][0];if((g.x-m.x)*l[d].ux+(g.y-m.y)*l[d].uy<-1e-9)return null}const u=h.flat(),p=this.signedArea(u),f=i.every(d=>d>=0);return Math.sign(p)!==c||Math.abs(p)<1e-9||f&&Math.abs(p)>Math.abs(a)+1e-9||this.isSelfIntersecting(u)?null:u}static computeInteriorArea(t,e){const r=this.computeArea(t),i={areaM2:r,axisAreaM2:r,matchedEdges:0};if(!t||t.length<3||!e||e.length===0)return i;const o=t.length,s=[];let a=0;for(let l=0;l<o;l++){const h=t[l],u=t[(l+1)%o],p=Math.hypot(u.x-h.x,u.y-h.y);let f=0,d=0;if(p>1e-9)for(const g of e){const w=g.end.x-g.start.x,y=g.end.y-g.start.y,x=Math.hypot(w,y);if(x<1e-9)continue;const E=w/x,_=y/x,b=Math.abs(ot(E,_,h.x-g.start.x,h.y-g.start.y)),k=Math.abs(ot(E,_,u.x-g.start.x,u.y-g.start.y));if(b>ze||k>ze)continue;const P=E*(h.x-g.start.x)+_*(h.y-g.start.y),z=E*(u.x-g.start.x)+_*(u.y-g.start.y),B=Math.min(Math.max(P,z),x)-Math.max(Math.min(P,z),0);B<=ze||(f+=B,d=Math.max(d,(g.thickness||0)/2))}const m=f>=p*.5&&d>0;m&&a++,s.push(m?d:0)}if(a===0)return i;const c=this.offsetPolygon(t,s);return c?{areaM2:this.computeArea(c),axisAreaM2:r,matchedEdges:a}:i}}const Qe={fr:{},en:{}};let Ot="fr";const tn=new Set;function ph(n){const t=typeof n=="string"&&n.toLowerCase().startsWith("fr")?"fr":"en";if(t!==Ot){Ot=t;for(const e of[...tn])try{e(t)}catch(r){console.error("[home-architect] i18n listener failed",r)}}}function fh(){return Ot}function I(n,t){const e=Ot==="fr"?"en":"fr",r=Qe[Ot][n]??Qe[e][n]??n;return t?r.replace(/\{(\w+)\}/g,(i,o)=>Object.prototype.hasOwnProperty.call(t,o)?String(t[o]):i):r}function Te(n,t){Object.assign(Qe[n],t)}function us(n){return tn.add(n),()=>tn.delete(n)}function mi(n,t){if(!Number.isFinite(n))return"—";try{return new Intl.NumberFormat(Ot==="fr"?"fr-FR":"en-US",t).format(n)}catch{return String(n)}}const ds="__i18nLanguage";class mh{constructor(t){this.host=t,this.unsubscribe=null,t.addController(this)}hostConnected(){this.unsubscribe=us(t=>{const e=t==="fr"?"en":"fr";this.host.requestUpdate(ds,e)})}hostDisconnected(){this.unsubscribe?.(),this.unsubscribe=null}}const gi={"geometry.close":"Fermer","geometry.cancel":"Annuler","geometry.meters":"mètres","geometry.value_m":"{value} m","geometry.value_m2":"{value} m²","geometry.value_m3":"{value} m³","geometry.room.title":"Propriétés de la pièce","geometry.room.default_name":"Pièce","geometry.room.name_label":"Nom de la pièce :","geometry.room.area_label":"Zone Home Assistant :","geometry.room.area_none":"Aucune zone liée","geometry.room.area_missing":"Zone introuvable ({id})","geometry.room.area_hint":"Associe la pièce du plan à une zone de Home Assistant.","geometry.room.height_label":"Hauteur sous plafond (Rendu 3D) :","geometry.room.height_inherit":"Hauteur par défaut du projet ({height} m)","geometry.room.height_invalid":"Hauteur invalide : saisissez une valeur entre {min} et {max} m.","geometry.room.height_presets":"Hauteurs courantes","geometry.room.height_preset":"{height} m ({name})","geometry.room.preset.basement":"Sous-sol","geometry.room.preset.attic":"Combles","geometry.room.preset.standard":"Standard","geometry.room.preset.high":"Élevé","geometry.room.preset.haussmann":"Haussmann","geometry.room.preset.cathedral":"Cathédrale","geometry.room.surface_interior":"Surface intérieure","geometry.room.surface_axis":"Surface à l'axe des murs","geometry.room.surface_axis_detail":"À l'axe des murs : {area} m²","geometry.room.surface_not_deducted":"Épaisseur des murs non déduite","geometry.room.volume":"Volume 3D calculé","geometry.room.color_label":"Couleur d'ambiance du sol :","geometry.room.color.sky":"Bleu ciel","geometry.room.color.violet":"Violet moderne","geometry.room.color.amber":"Ambre chaleureux","geometry.room.color.emerald":"Émeraude nature","geometry.room.color.indigo":"Indigo profond","geometry.room.color.rose":"Rose pastel","geometry.room.color.slate":"Gris ardoise","geometry.room.delete":"Supprimer","geometry.room.delete_confirm":'Voulez-vous supprimer la pièce "{name}" ?',"geometry.room.save":"Enregistrer","geometry.rescale.title":"Mettre à l'échelle le plan","geometry.rescale.subtitle":"Recalcule automatiquement toutes les dimensions et cotes","geometry.rescale.measured":"Cote mesurée actuelle","geometry.rescale.target":"Nouvelle cote cible","geometry.rescale.input_label":"Quelle est la taille réelle de ce segment en mètres ?","geometry.rescale.factor_label":"Facteur d'ajustement global :","geometry.rescale.factor_value":"× {ratio} ({percent})","geometry.rescale.error_measured":"La cote mesurée est invalide : refaites la mesure sur le plan.","geometry.rescale.error_number":"Saisissez un nombre (ex. {example}).","geometry.rescale.error_positive":"La longueur doit être strictement positive.","geometry.rescale.error_range":"Facteur ×{factor} hors limites (×{min} à ×{max}) : la longueur est-elle bien en mètres ?","geometry.rescale.unusual":"Facteur inhabituel (×{ratio}) : toutes les dimensions seront multipliées par ce facteur. Vérifiez l'unité saisie.","geometry.rescale.confirm_unusual":"Je confirme ce facteur","geometry.rescale.adjust_background":"Ajuster aussi le calque de fond (conserve la superposition avec le plan)","geometry.rescale.scale_elements":"Mettre aussi à l'échelle les épaisseurs de murs, ouvertures et meubles","geometry.rescale.background_layer":"Calque de fond","geometry.rescale.impact.walls":"{subject} : toutes les longueurs et cotes seront recalculées","geometry.rescale.impact.openings":"{subject} : positions et largeurs ajustées proportionnellement","geometry.rescale.impact.rooms":"{subject} : toutes les surfaces en m² seront actualisées","geometry.rescale.impact.furniture":"{subject} : positions et dimensions ajustées","geometry.rescale.impact.bindings.one":"{subject} : position ajustée","geometry.rescale.impact.bindings.other":"{subject} : positions ajustées","geometry.rescale.impact.background_synced":"{subject} : échelle synchronisée pour conserver la superposition","geometry.rescale.impact.background_unchanged":"{subject} : inchangé (il ne sera plus superposé au plan)","geometry.rescale.submit":"Recalculer toutes les cotes","geometry.count.walls.one":"{count} mur","geometry.count.walls.other":"{count} murs","geometry.count.openings.one":"{count} ouverture","geometry.count.openings.other":"{count} ouvertures","geometry.count.rooms.one":"{count} pièce","geometry.count.rooms.other":"{count} pièces","geometry.count.furniture.one":"{count} meuble","geometry.count.furniture.other":"{count} meubles","geometry.count.bindings.one":"{count} entité","geometry.count.bindings.other":"{count} entités","geometry.furniture_category.seating":"Salon","geometry.furniture_category.bed":"Chambre","geometry.furniture_category.table":"Tables","geometry.furniture_category.storage":"Rangements","geometry.furniture_category.bathroom":"Bains","geometry.furniture_category.kitchen":"Cuisine","geometry.furniture_category.other":"Autres","geometry.furniture.sofa_3p":"Canapé 3 places","geometry.furniture.sofa_2p":"Canapé 2 places","geometry.furniture.divan":"Divan / Méridienne (Tête Gauche)","geometry.furniture.divan_right":"Divan / Méridienne (Tête Droite)","geometry.furniture.armchair":"Fauteuil club","geometry.furniture.coffee_table":"Table basse","geometry.furniture.bed_double":"Lit double (Queen)","geometry.furniture.bed_single":"Lit simple","geometry.furniture.nightstand":"Table de chevet","geometry.furniture.wardrobe":"Armoire dressing","geometry.furniture.dining_table_6":"Table repas (6 chaises)","geometry.furniture.desk":"Bureau avec fauteuil","geometry.furniture.chair_starck":"Chaise médaillon transparente","geometry.furniture.console":"Console murale","geometry.furniture.toilet":"WC / Toilettes","geometry.furniture.shower":"Douche italienne","geometry.furniture.bathtub":"Baignoire droite","geometry.furniture.sink_vanity":"Meuble vasque","geometry.furniture.kitchen_sink":"Évier cuisine double","geometry.furniture.cooktop":"Plaque de cuisson","geometry.furniture.fridge":"Réfrigérateur","geometry.furniture.fridge_us":"Réfrigérateur américain","geometry.furniture.dishwasher":"Lave-vaisselle","geometry.furniture.washing_machine":"Lave-linge","geometry.furniture.double_vanity":"Meuble double vasque","geometry.furniture.towel_dryer":"Sèche-serviettes","geometry.furniture.mirror":"Miroir mural","geometry.furniture.wall_art":"Tableau / Poster"},yi={"geometry.close":"Close","geometry.cancel":"Cancel","geometry.meters":"meters","geometry.value_m":"{value} m","geometry.value_m2":"{value} m²","geometry.value_m3":"{value} m³","geometry.room.title":"Room properties","geometry.room.default_name":"Room","geometry.room.name_label":"Room name","geometry.room.area_label":"Home Assistant area","geometry.room.area_none":"No linked area","geometry.room.area_missing":"Area not found ({id})","geometry.room.area_hint":"Links this room of the plan to a Home Assistant area.","geometry.room.height_label":"Ceiling height (3D view)","geometry.room.height_inherit":"Project default height ({height} m)","geometry.room.height_invalid":"Invalid height: enter a value between {min} and {max} m.","geometry.room.height_presets":"Common heights","geometry.room.height_preset":"{height} m ({name})","geometry.room.preset.basement":"Basement","geometry.room.preset.attic":"Attic","geometry.room.preset.standard":"Standard","geometry.room.preset.high":"High","geometry.room.preset.haussmann":"Haussmann-style","geometry.room.preset.cathedral":"Cathedral","geometry.room.surface_interior":"Interior area","geometry.room.surface_axis":"Area to wall centerlines","geometry.room.surface_axis_detail":"To wall centerlines: {area} m²","geometry.room.surface_not_deducted":"Wall thickness not deducted","geometry.room.volume":"Calculated 3D volume","geometry.room.color_label":"Room fill color","geometry.room.color.sky":"Sky blue","geometry.room.color.violet":"Modern violet","geometry.room.color.amber":"Warm amber","geometry.room.color.emerald":"Natural emerald","geometry.room.color.indigo":"Deep indigo","geometry.room.color.rose":"Pastel pink","geometry.room.color.slate":"Slate gray","geometry.room.delete":"Delete","geometry.room.delete_confirm":'Delete the room "{name}"?',"geometry.room.save":"Save","geometry.rescale.title":"Rescale the plan","geometry.rescale.subtitle":"Automatically recalculates every dimension and measurement","geometry.rescale.measured":"Current measured length","geometry.rescale.target":"New target length","geometry.rescale.input_label":"What is the real length of this segment, in meters?","geometry.rescale.factor_label":"Overall scale factor","geometry.rescale.factor_value":"× {ratio} ({percent})","geometry.rescale.error_measured":"The measured length is invalid: measure it again on the plan.","geometry.rescale.error_number":"Enter a number (e.g. {example}).","geometry.rescale.error_positive":"The length must be greater than zero.","geometry.rescale.error_range":"Factor ×{factor} is out of range (×{min} to ×{max}): is the length really in meters?","geometry.rescale.unusual":"Unusual factor (×{ratio}): every dimension will be multiplied by this factor. Check the unit you entered.","geometry.rescale.confirm_unusual":"I confirm this factor","geometry.rescale.adjust_background":"Also adjust the background layer (keeps it lined up with the plan)","geometry.rescale.scale_elements":"Also scale wall thicknesses, opening widths and furniture dimensions","geometry.rescale.background_layer":"Background layer","geometry.rescale.impact.walls":"{subject}: every length and dimension will be recalculated","geometry.rescale.impact.openings":"{subject}: positions and widths adjusted proportionally","geometry.rescale.impact.rooms":"{subject}: every area in m² will be updated","geometry.rescale.impact.furniture":"{subject}: positions and sizes adjusted","geometry.rescale.impact.bindings.one":"{subject}: position adjusted","geometry.rescale.impact.bindings.other":"{subject}: positions adjusted","geometry.rescale.impact.background_synced":"{subject}: scale synchronized so it stays lined up","geometry.rescale.impact.background_unchanged":"{subject}: unchanged (it will no longer line up with the plan)","geometry.rescale.submit":"Recalculate all dimensions","geometry.count.walls.one":"{count} wall","geometry.count.walls.other":"{count} walls","geometry.count.openings.one":"{count} opening","geometry.count.openings.other":"{count} openings","geometry.count.rooms.one":"{count} room","geometry.count.rooms.other":"{count} rooms","geometry.count.furniture.one":"{count} furniture item","geometry.count.furniture.other":"{count} furniture items","geometry.count.bindings.one":"{count} entity","geometry.count.bindings.other":"{count} entities","geometry.furniture_category.seating":"Living room","geometry.furniture_category.bed":"Bedroom","geometry.furniture_category.table":"Tables","geometry.furniture_category.storage":"Storage","geometry.furniture_category.bathroom":"Bathroom","geometry.furniture_category.kitchen":"Kitchen","geometry.furniture_category.other":"Other","geometry.furniture.sofa_3p":"3-seat sofa","geometry.furniture.sofa_2p":"2-seat sofa","geometry.furniture.divan":"Daybed / chaise longue (head left)","geometry.furniture.divan_right":"Daybed / chaise longue (head right)","geometry.furniture.armchair":"Club armchair","geometry.furniture.coffee_table":"Coffee table","geometry.furniture.bed_double":"Double bed (queen)","geometry.furniture.bed_single":"Single bed","geometry.furniture.nightstand":"Nightstand","geometry.furniture.wardrobe":"Wardrobe","geometry.furniture.dining_table_6":"Dining table (6 chairs)","geometry.furniture.desk":"Desk with chair","geometry.furniture.chair_starck":"Clear medallion chair","geometry.furniture.console":"Wall console table","geometry.furniture.toilet":"Toilet","geometry.furniture.shower":"Walk-in shower","geometry.furniture.bathtub":"Rectangular bathtub","geometry.furniture.sink_vanity":"Bathroom vanity","geometry.furniture.kitchen_sink":"Double kitchen sink","geometry.furniture.cooktop":"Cooktop","geometry.furniture.fridge":"Refrigerator","geometry.furniture.fridge_us":"American refrigerator","geometry.furniture.dishwasher":"Dishwasher","geometry.furniture.washing_machine":"Washing machine","geometry.furniture.double_vanity":"Double vanity","geometry.furniture.towel_dryer":"Towel dryer","geometry.furniture.mirror":"Wall mirror","geometry.furniture.wall_art":"Wall poster / Artwork"},ps={fr:gi,en:yi};Te("fr",gi);Te("en",yi);function fs(n){return Object.values(ps).map(t=>t[n]).filter(t=>typeof t=="string")}const en=2,ms=["standard","partition","loadbearing","exterior"],gs=["door","double_door","sliding_door","window","french_window"],ys=["toggle","more-info","navigate","none"],bi=["seating","bed","table","kitchen","bathroom","storage","other"],rr=12,xi=["seating","bed","table","storage","bathroom","kitchen","other"],gh=Object.freeze(Object.defineProperties({},Object.fromEntries([...new Set([...xi,...bi])].map(n=>[n,{enumerable:!0,get:()=>I(`geometry.furniture_category.${n}`)}])))),bs=1.5,xs="📦",vi=[["stroke","#94a3b8","#475569"],["selected","#38bdf8","#0284c7"],["fill","rgba(30, 41, 59, 0.85)","rgba(226, 232, 240, 0.9)"],["selected-fill","rgba(56, 189, 248, 0.25)","rgba(2, 132, 199, 0.16)"],["accent","rgba(51, 65, 85, 0.9)","rgba(203, 213, 225, 0.95)"],["soft","rgba(241, 245, 249, 0.2)","rgba(255, 255, 255, 0.85)"],["water","rgba(2, 132, 199, 0.25)","rgba(2, 132, 199, 0.18)"],["heat","rgba(239, 68, 68, 0.2)","rgba(220, 38, 38, 0.16)"],["glass","rgba(56, 189, 248, 0.15)","rgba(2, 132, 199, 0.12)"],["highlight","#cbd5e1","#334155"],["frost","#38bdf8","#0284c7"],["brass","#f59e0b","#b45309"],["drain","#0284c7","#0369a1"]],se=Object.fromEntries(vi.map(([n,t])=>[n,{token:n,value:t}]));function ir(n){return vi.map(([t,e,r])=>`--arch-furniture-${t}: var(--ha-arch-furniture-${t}, ${n==="dark"?e:r});`).join(`
`)}hn`
  :host {
    ${Je(ir("dark"))}
  }

  :host([scheme='light']) {
    ${Je(ir("light"))}
  }
`;const vs=/^[#a-zA-Z0-9(),.%\s+-]{1,64}$/,ws=/url\s*\(|expression|image-set/i;function gt(n,t,e){return Math.min(Math.max(n,t),e)}function N(n,t,e,r,i,o=0,s={}){const a=Math.max(0,e),c=Math.max(0,r);return{kind:"rect",x:n,y:t,w:a,h:c,r:gt(o,0,Math.min(a,c)/2),paint:i,...s}}function W(n,t,e,r,i,o={}){return{kind:"ellipse",cx:n,cy:t,rx:Math.max(0,e),ry:Math.max(0,r),paint:i,...o}}function L(n,t,e,r,i,o={}){return{kind:"line",x1:n,y1:t,x2:e,y2:r,paint:i,...o}}function Zt(n,t,e={}){return{kind:"path",d:n,paint:t,...e}}function H(n,t,e=.08){return N(-n/2,-t/2,n,t,"body",Math.min(n,t)*e)}function $s(n){return n.map(t=>{switch(t.kind){case"rect":return{...t,x:-(t.x+t.w)};case"ellipse":return{...t,cx:-t.cx};case"line":return{...t,x1:-t.x1,x2:-t.x2};case"path":return{...t,d:t.d.map(e=>{switch(e[0]){case"M":case"L":return[e[0],-e[1],e[2]];case"Q":return["Q",-e[1],e[2],-e[3],e[4]];case"A":return["A",e[1],e[2],e[3],e[4]===1?0:1,-e[5],e[6]];default:return e}})}}})}function or(n,t,e,r){const i=gt(n*r,.1,n*.25),o=gt(t*.26,.12,t*.45),s=Math.min(.04,n*.02,t*.04),a=n-i*2,c=a/e,l=[H(n,t),N(-n/2+i,-t/2,a,o,"accent",o*.2),N(-n/2,-t/2,i,t,"accent",i*.3),N(n/2-i,-t/2,i,t,"accent",i*.3)];for(let h=0;h<e;h++){const u=c-s;l.push(N(-n/2+i+h*c+s/2,-t/2+o+s/2,u,t-o-s,"body",Math.min(u,t)*.1))}return l}function sr(n,t){const e=gt(n*.22,.15,n*.4),r=gt(t*.24,.1,t*.45),i=Math.min(.05,n*.03,t*.05),o=n-e,s=-t/2+r+i,a=Math.max(s,t/2-i);return[H(n,t,.1),N(-n/2,-t/2,n*.65,r,"accent",r*.25),N(-n/2,-t/2,e,t,"accent",e*.2),N(-n/2+e+i,-t/2+r+i,o-i*2,t-r-i*2,"body",Math.min(o,t)*.08),L(-n/2+e+o/3,s,-n/2+e+o/3,a,"outline",{dash:"3,3",opacity:.5}),L(-n/2+e+o*2/3,s,-n/2+e+o*2/3,a,"outline",{dash:"3,3",opacity:.5})]}function ar(n,t,e){const r=Math.min(n*.05,t*.04,.08),i=Math.min(t*.03,.05),o=t*.18,s=(n-r*(e+1))/e,a=-t/2+i+r,c=Math.min(t/2,a+o+r),l=[H(n,t,.06),L(-n/2,-t/2+i,n/2,-t/2+i,"highlight",{strokeWidth:2.5})];for(let h=0;h<e;h++)l.push(N(-n/2+r+h*(s+r),a,s,o,"soft",Math.min(s,o)*.2));return l.push(Zt([["M",-n/2+r/2,c],["Q",0,c+t*.04,n/2-r/2,c]],"outline",{strokeWidth:1.8})),l}const _s=[{type:"sofa_3p",name:"Canapé 3 places",category:"seating",width:2.2,length:.95,icon:"🛋️",strokeWidth:1.6,shapes:(n,t)=>or(n,t,3,.1)},{type:"sofa_2p",name:"Canapé 2 places",category:"seating",width:1.6,length:.9,icon:"🛋️",strokeWidth:1.6,shapes:(n,t)=>or(n,t,2,.12)},{type:"divan",name:"Divan / Méridienne (Tête Gauche)",category:"seating",width:1.8,length:.85,icon:"🛋️",strokeWidth:1.6,shapes:(n,t)=>sr(n,t)},{type:"divan_right",name:"Divan / Méridienne (Tête Droite)",category:"seating",width:1.8,length:.85,icon:"🛋️",strokeWidth:1.6,shapes:(n,t)=>$s(sr(n,t))},{type:"armchair",name:"Fauteuil club",category:"seating",width:.85,length:.85,icon:"🪑",shapes:(n,t)=>{const e=gt(n*.18,.08,n*.3),r=gt(t*.28,.1,t*.45),i=Math.min(.04,n*.04,t*.04);return[H(n,t),N(-n/2+e,-t/2,n-e*2,r,"accent",r*.2),N(-n/2,-t/2,e,t,"accent",e*.3),N(n/2-e,-t/2,e,t,"accent",e*.3),N(-n/2+e+i/2,-t/2+r+i/2,n-e*2-i,t-r-i,"body",Math.min(n,t)*.06)]}},{type:"coffee_table",name:"Table basse",category:"seating",width:1.1,length:.6,icon:"☕",shapes:(n,t)=>{const e=Math.min(n,t)*.12;return[H(n,t,.12),L(-n/2+e,-t/2+e,n/2-e,t/2-e,"outline",{dash:"3,3",opacity:.4}),L(n/2-e,-t/2+e,-n/2+e,t/2-e,"outline",{dash:"3,3",opacity:.4})]}},{type:"bed_double",name:"Lit double (Queen)",category:"bed",width:1.6,length:2,icon:"🛏️",strokeWidth:1.6,shapes:(n,t)=>ar(n,t,2)},{type:"bed_single",name:"Lit simple",category:"bed",width:.9,length:1.9,icon:"🛏️",shapes:(n,t)=>ar(n,t,1)},{type:"nightstand",name:"Table de chevet",category:"bed",width:.45,length:.4,icon:"🕰️",strokeWidth:1.4,shapes:(n,t)=>{const e=Math.min(n,t)*.1,r=Math.min(n,t)*.05;return[H(n,t),L(-n/2+e,0,n/2-e,0,"outline",{strokeWidth:1.2}),W(0,-t/4,r,r,"knob"),W(0,t/4,r,r,"knob")]}},{type:"wardrobe",name:"Armoire dressing",category:"storage",width:1.8,length:.6,icon:"🚪",shapes:(n,t)=>{const e=Math.min(n,t)*.1;return[H(n,t,.05),L(-n/2+n/3,-t/2,-n/2+n/3,t/2,"outline"),L(-n/2+n*2/3,-t/2,-n/2+n*2/3,t/2,"outline"),L(-n/2+e,0,n/2-e,0,"outline",{dash:"4,3",strokeWidth:1.2,opacity:.6})]}},{type:"dining_table_6",name:"Table repas (6 chaises)",category:"table",width:1.6,length:.9,icon:"🍽️",shapes:(n,t)=>{const e=n*.24,r=Math.min(.18,t*.25),i=n*.04,o=[-n/2+i,-e/2,n/2-e-i],s=Math.min(e,r)*.2;return[H(n,t,.06),...o.map(a=>N(a,-t/2-r,e,r,"body",s)),...o.map(a=>N(a,t/2,e,r,"body",s))]}},{type:"desk",name:"Bureau avec fauteuil",category:"table",width:1.4,length:.7,icon:"💻",shapes:(n,t)=>{const e=Math.min(n*.4,.6),r=Math.min(t*.06,.05),i=Math.min(n*.2,t*.45);return[H(n,t,.05),N(-e/2,-t/2+t*.08,e,r,"highlight",r*.25),Zt([["M",-i,t/2],["A",i,i,0,1,i,t/2]],"outline",{dash:"3,3"})]}},{type:"chair_starck",name:"Chaise médaillon transparente",legacyNames:["Chaise Starck (Ghost)"],category:"table",width:.54,length:.55,icon:"🪑",shapes:(n,t)=>{const e=Math.min(n,t),r=n*.04,i=-t/2+t*.11;return[N(-n/2+r,i,n-r*2,t-t*.18,"body",e*.11),W(0,i,e*.32,t*.16,"glass",{strokeWidth:1.6}),Zt([["M",-n/2+r*2,-t/2+t*.18],["Q",-n/2+r*.5,0,-n/2+r*3,t/2-t*.11]],"outline",{strokeWidth:1.4,opacity:.8}),Zt([["M",n/2-r*2,-t/2+t*.18],["Q",n/2-r*.5,0,n/2-r*3,t/2-t*.11]],"outline",{strokeWidth:1.4,opacity:.8}),W(0,t*.08,e*.21,e*.21,"outline",{dash:"2,2",opacity:.4})]}},{type:"console",name:"Console murale",category:"table",width:1.2,length:.35,icon:"🗄️",shapes:(n,t)=>{const e=Math.min(n,t)*.08,r=(n-e*3)/2,i=Math.min(n,t)*.05;return[H(n,t,.08),N(-n/2+e,-t/2+e,r,t-e*2,"accent",e*.6),N(e/2,-t/2+e,r,t-e*2,"accent",e*.6),W(-n/4,0,i,i,"brass"),W(n/4,0,i,i,"brass")]}},{type:"toilet",name:"WC / Toilettes",category:"bathroom",width:.45,length:.65,icon:"🚽",shapes:(n,t)=>{const e=t*.28,r=n*.04,i=Math.max(0,n/2-r),o=-t/2+e,s=Math.max(o,t/2-i);return[N(-n/2,-t/2,n,e,"accent",Math.min(n,e)*.15),Zt([["M",-n/2+r,o],["L",n/2-r,o],["L",n/2-r,s],["A",i,i,0,1,-n/2+r,s],["Z"]],"body")]}},{type:"shower",name:"Douche italienne",category:"bathroom",width:.9,length:.9,icon:"🚿",shapes:(n,t)=>{const e=Math.min(n,t)*.045,r={strokeWidth:1,dash:"2,2",opacity:.6};return[H(n,t,.03),L(-n/2,-t/2,0,0,"outline",r),L(n/2,-t/2,0,0,"outline",r),L(-n/2,t/2,0,0,"outline",r),L(n/2,t/2,0,0,"outline",r),W(0,0,e,e,"drain")]}},{type:"bathtub",name:"Baignoire droite",category:"bathroom",width:1.7,length:.75,icon:"🛁",strokeWidth:1.6,shapes:(n,t)=>{const e=Math.min(n,t)*.08,r=Math.min(n,t)*.035;return[H(n,t,.07),N(-n/2+e,-t/2+e,n-e*2,t-e*2,"water",(t-e*2)/2),W(-n/2+e+Math.min(n,t)*.15,0,r,r,"knob")]}},{type:"sink_vanity",name:"Meuble vasque",category:"bathroom",width:.9,length:.5,icon:"🧼",shapes:(n,t)=>{const e=t*.65/2,r=Math.min(n,t)*.04;return[H(n,t,.06),W(0,0,n*.65/2,e,"water"),W(0,-e+r*1.2,r,r,"knob")]}},{type:"double_vanity",name:"Meuble double vasque",category:"bathroom",width:1.4,length:.5,icon:"🫧",shapes:(n,t)=>{const e=n*.35,r=t*.65/2,i=Math.min(n,t)*.04,o=-n/4,s=n/4;return[H(n,t,.06),W(o,0,e/2,r,"water"),W(o,-r+i*1.2,i,i,"knob"),W(s,0,e/2,r,"water"),W(s,-r+i*1.2,i,i,"knob")]}},{type:"towel_dryer",name:"Sèche-serviettes",category:"bathroom",width:.55,length:.15,icon:"♨️",shapes:(n,t)=>{const r=t/5;return[H(n,t,.04),...Array.from({length:4},(i,o)=>{const s=-t/2+(o+1)*r;return L(-n/2+.04,s,n/2-.04,s,"heat",{strokeWidth:1.5})})]}},{type:"kitchen_sink",name:"Évier cuisine double",category:"kitchen",width:1,length:.6,icon:"🚰",shapes:(n,t)=>{const e=Math.min(n,t)*.08,r=(n-e*3)/2,i=t-e*2.6;return[H(n,t,.05),N(-n/2+e,-t/2+e*1.6,r,i,"water",Math.min(r,i)*.12),N(e/2,-t/2+e*1.6,r,i,"water",Math.min(r,i)*.12),W(0,-t/2+e*.8,e*.4,e*.4,"brass")]}},{type:"cooktop",name:"Plaque de cuisson",category:"kitchen",width:.6,length:.6,icon:"🍳",shapes:(n,t)=>{const e=Math.min(n,t)*.18,r=Math.min(n,t)*.13;return[H(n,t,.07),W(-n/4,-t/4,e,e,"heat"),W(n/4,-t/4,r,r,"heat"),W(-n/4,t/4,r,r,"heat"),W(n/4,t/4,e,e,"heat")]}},{type:"fridge",name:"Réfrigérateur",category:"kitchen",width:.65,length:.65,icon:"🧊",shapes:(n,t)=>{const e=Math.min(n,t)*.18,r=[90,30,150].map(i=>{const o=e*Math.cos(i*Math.PI/180),s=e*Math.sin(i*Math.PI/180);return L(-o,t*.06-s,o,t*.06+s,"frost",{strokeWidth:1.4})});return[H(n,t,.05),L(-n/2,-t/2+t*.09,n/2,-t/2+t*.09,"outline",{strokeWidth:2}),L(-n/2+n*.12,-t/2+t*.045,-n/2+n*.3,-t/2+t*.045,"frost",{strokeWidth:2}),...r]}},{type:"fridge_us",name:"Réfrigérateur américain",category:"kitchen",width:.95,length:.75,icon:"🧊",shapes:(n,t)=>[H(n,t,.05),L(0,-t/2,0,t/2,"outline",{strokeWidth:1.8}),L(-n/2,-t/2+t*.1,n/2,-t/2+t*.1,"outline",{strokeWidth:1.4}),L(-.04,-t/2+.02,-.04,-t/2+.08,"brass",{strokeWidth:2.2}),L(.04,-t/2+.02,.04,-t/2+.08,"brass",{strokeWidth:2.2})]},{type:"dishwasher",name:"Lave-vaisselle",category:"kitchen",width:.6,length:.6,icon:"🍽️",shapes:(n,t)=>{const e=Math.min(n,t)*.04;return[H(n,t,.05),L(-n/2,-t/2+t*.15,n/2,-t/2+t*.15,"outline",{strokeWidth:1.5}),W(-n/4,-t/2+t*.075,e,e,"knob"),L(-n*.1,-t/2+t*.075,n*.3,-t/2+t*.075,"outline",{strokeWidth:1.5}),N(-n/2+.06,-t/2+t*.22,n-.12,t*.65,"outline",.03,{strokeWidth:1,dash:"3,3",opacity:.6})]}},{type:"washing_machine",name:"Lave-linge",category:"kitchen",width:.6,length:.6,icon:"🧺",shapes:(n,t)=>{const e=Math.min(n,t)*.32,r=Math.min(n,t)*.035;return[H(n,t,.05),L(-n/2,-t/2+t*.15,n/2,-t/2+t*.15,"outline",{strokeWidth:1.5}),W(-n/4,-t/2+t*.075,r,r,"knob"),W(n/4,-t/2+t*.075,r*1.5,r*1.5,"knob"),W(0,t*.08,e,e,"glass",{strokeWidth:2}),W(0,t*.08,e*.5,e*.5,"water",{strokeWidth:1.2})]}},{type:"mirror",name:"Miroir mural",category:"other",width:.8,length:.12,icon:"🪞",shapes:(n,t)=>[H(n,t,.04),N(-n/2+.02,-t/2+.02,n-.04,t-.04,"glass",.02),L(-n/3,-t/4,-n/6,t/4,"highlight",{strokeWidth:1.2,opacity:.8})]},{type:"wall_art",name:"Tableau / Poster",category:"other",width:.9,length:.1,icon:"🖼️",shapes:(n,t)=>[H(n,t,.04),N(-n/2+.02,-t/2+.02,n-.04,t-.04,"accent",.01),L(-n/2+.04,0,n/2-.04,0,"highlight",{strokeWidth:1.2})]}],wi=_s.map(n=>({...n,renderSvg:(t,e,r)=>Is(n,t,e,r)})),yh=xi.filter(n=>wi.some(t=>t.category===n));function Z(n){return wi.find(t=>t.type===n)}function ks(n){return Z(n)?I(`geometry.furniture.${n}`):n}function $i(n,t){return t===n.name||(n.legacyNames?.includes(t)??!1)||fs(`geometry.furniture.${n.type}`).includes(t)}function Ms(n){const t=Z(n.type);return t?!n.name||$i(t,n.name)?ks(t.type):n.name:n.name||n.type}function Ss(n){const t=Z(n.type);return t?!n.name||$i(t,n.name)?t.name:n.name:n.name||n.type}function _i(n,t,e){const r=se,i=t?r.selected:r.stroke;switch(n){case"body":return{fill:e,stroke:i};case"accent":return{fill:r.accent,stroke:i};case"soft":return{fill:r.soft,stroke:i};case"water":return{fill:r.water,stroke:i};case"heat":return{fill:r.heat,stroke:i};case"glass":return{fill:r.glass,stroke:i};case"outline":return{fill:null,stroke:i};case"highlight":return t?{fill:r.selected,stroke:r.selected}:{fill:r.highlight,stroke:r.highlight};case"frost":return{fill:null,stroke:r.frost};case"knob":return{fill:i,stroke:null};case"brass":return{fill:t?r.selected:r.brass,stroke:null};case"drain":return{fill:t?r.selected:r.drain,stroke:null}}}function nn(n){return n?n.value:"none"}function rn(n){return n?n.token?`var(--arch-furniture-${n.token}, ${n.value})`:n.value:"none"}function cr(n){return n&&vs.test(n)&&!ws.test(n)?n:void 0}function Ps(n,t,e){if(n)return se["selected-fill"];const r=cr(t)??cr(e);return r?{value:r}:se.fill}function on(n){return typeof n=="number"&&Number.isFinite(n)&&n>0?n:void 0}function ki(n,t){return{w:on(n.width)??t?.width??1,l:on(n.length)??t?.length??1}}function Mi(n,t,e,r,i,o,s){const a=Ps(i,o,n?.defaultColor),l={shapes:n!==void 0&&Math.min(t,e)*r>=rr?n.shapes(t,e):[H(t,e,.06)],strokeWidth:n?.strokeWidth??bs,bodyFill:a,selected:i};return!n&&Math.min(t,e)*r>=rr&&(l.icon={text:s||xs,size:gt(Math.min(t,e)*r*.5,8,16)}),l}function Si(n,t){const e=Z(n.type),{w:r,l:i}=ki(n,e),o=on(t.pixelsPerMeter)??1;return{sym:Mi(e,r,i,o,t.selected===!0,n.color,n.icon),k:o}}function T(n){const t=Math.round(n*100)/100;return t===0?0:t}function Pi(n,t){return n.map(e=>{switch(e[0]){case"M":case"L":return`${e[0]} ${T(e[1]*t)} ${T(e[2]*t)}`;case"Q":return`Q ${T(e[1]*t)} ${T(e[2]*t)} ${T(e[3]*t)} ${T(e[4]*t)}`;case"A":return`A ${T(e[1]*t)} ${T(e[2]*t)} 0 ${e[3]} ${e[4]} ${T(e[5]*t)} ${T(e[6]*t)}`;default:return"Z"}}).join(" ")}function Es(n,t){switch(n.kind){case"rect":return[["x",T(n.x*t)],["y",T(n.y*t)],["width",T(n.w*t)],["height",T(n.h*t)],["rx",T((n.r??0)*t)]];case"ellipse":return[["cx",T(n.cx*t)],["cy",T(n.cy*t)],["rx",T(n.rx*t)],["ry",T(n.ry*t)]];case"line":return[["x1",T(n.x1*t)],["y1",T(n.y1*t)],["x2",T(n.x2*t)],["y2",T(n.y2*t)]];case"path":return[["d",Pi(n.d,t)]]}}function Ts(n,t){const e=_i(n.paint,t.selected,t.bodyFill),r=[["fill",nn(e.fill)],["stroke",nn(e.stroke)]];return e.stroke&&r.push(["stroke-width",n.strokeWidth??t.strokeWidth]),e.stroke&&n.dash&&r.push(["stroke-dasharray",n.dash]),n.opacity!==void 0&&r.push(["opacity",n.opacity]),r}function As(n,t,e){const r=_i(n.paint,e.selected,e.bodyFill),i=`fill: ${rn(r.fill)}; stroke: ${rn(r.stroke)}`,o=r.stroke?n.strokeWidth??e.strokeWidth:v,s=r.stroke&&n.dash?n.dash:v,a=n.opacity??v;switch(n.kind){case"rect":return $`<rect x=${T(n.x*t)} y=${T(n.y*t)} width=${T(n.w*t)} height=${T(n.h*t)} rx=${T((n.r??0)*t)}
        style=${i} stroke-width=${o} stroke-dasharray=${s} opacity=${a} />`;case"ellipse":return $`<ellipse cx=${T(n.cx*t)} cy=${T(n.cy*t)} rx=${T(n.rx*t)} ry=${T(n.ry*t)}
        style=${i} stroke-width=${o} stroke-dasharray=${s} opacity=${a} />`;case"line":return $`<line x1=${T(n.x1*t)} y1=${T(n.y1*t)} x2=${T(n.x2*t)} y2=${T(n.y2*t)}
        style=${i} stroke-width=${o} stroke-dasharray=${s} opacity=${a} />`;case"path":return $`<path d=${Pi(n.d,t)}
        style=${i} stroke-width=${o} stroke-dasharray=${s} opacity=${a} />`}}function Ds(n,t){const{sym:e,k:r}=Si(n,t);return Ei(e,r)}function Ei(n,t){return $`
    <g class="furniture-symbol">
      ${n.shapes.map(e=>As(e,t,n))}
      ${n.icon?$`<text x="0" y=${T(n.icon.size*.35)} text-anchor="middle" font-size=${T(n.icon.size)}
        style=${`fill: ${rn(se.highlight)}; stroke: none`}>${n.icon.text}</text>`:v}
    </g>
  `}function Is(n,t,e,r){const i=t>0?t/n.width:1;return Ei(Mi(n,Math.max(0,t)/i,Math.max(0,e)/i,i,r),i)}function lr(n){return n.replace(/[<>&'"]/g,t=>({"<":"&lt;",">":"&gt;","&":"&amp;","'":"&apos;",'"':"&quot;"})[t])}function Cs(n,t){const{sym:e,k:r}=Si(n,t),i=s=>s.map(([a,c])=>`${a}="${lr(String(c))}"`).join(" "),o=e.shapes.map(s=>`<${s.kind} ${i([...Es(s,r),...Ts(s,e)])} />`);return e.icon&&o.push(`<text x="0" y="${T(e.icon.size*.35)}" text-anchor="middle" font-size="${T(e.icon.size)}" fill="${nn(se.highlight)}" stroke="none">${lr(e.icon.text)}</text>`),`<g class="furniture-symbol">${o.join("")}</g>`}function Rs(n,t,e){let r=-t/2,i=-e/2,o=t/2,s=e/2;const a=(c,l)=>{r=Math.min(r,c),i=Math.min(i,l),o=Math.max(o,c),s=Math.max(s,l)};for(const c of n)switch(c.kind){case"rect":a(c.x,c.y),a(c.x+c.w,c.y+c.h);break;case"ellipse":a(c.cx-c.rx,c.cy-c.ry),a(c.cx+c.rx,c.cy+c.ry);break;case"line":a(c.x1,c.y1),a(c.x2,c.y2);break;case"path":for(const l of c.d)l[0]==="M"||l[0]==="L"?a(l[1],l[2]):l[0]==="Q"?(a(l[1],l[2]),a(l[3],l[4])):l[0]==="A"&&a(l[5],l[6]);break}return{minX:r,minY:i,maxX:o,maxY:s}}function Os(n){const t=Z(n.type),{w:e,l:r}=ki(n,t),i=Rs(t?t.shapes(e,r):[],e,r),o=(n.rotation??0)%360*Math.PI/180,s=Math.cos(o),a=Math.sin(o);let c=1/0,l=1/0,h=-1/0,u=-1/0;for(const[p,f]of[[i.minX,i.minY],[i.maxX,i.minY],[i.maxX,i.maxY],[i.minX,i.maxY]]){const d=n.position.x+p*s-f*a,m=n.position.y+p*a+f*s;c=Math.min(c,d),l=Math.min(l,m),h=Math.max(h,d),u=Math.max(u,m)}return{minX:c,minY:l,maxX:h,maxY:u}}Te("fr",{"ui.level.sous-sol":"Sous-Sol","ui.level.sous-sol.full":"Sous-Sol","ui.level.rdc":"RDC","ui.level.rdc.full":"Rez-de-Chaussée","ui.level.etage1":"1er Étage","ui.level.etage1.full":"1er Étage","ui.level.etage2":"2ème Étage","ui.level.etage2.full":"2ème Étage","ui.level.etage3":"3ème Étage","ui.level.etage3.full":"3ème Étage","ui.level.jardin":"Jardin","ui.level.jardin.full":"Jardin","ui.level.autre":"Autre","ui.level.autre.full":"Autre","ui.project.default_name":"Nouveau plan","ui.project.default_room_name":"Pièce","ui.api.size_mib":"{value} Mo","ui.api.conflict":"Le plan a été modifié ailleurs depuis son ouverture.","ui.api.conflict_revision":"Le plan a été modifié ailleurs depuis son ouverture (révision serveur {revision}).","ui.api.unauthorized":"Action réservée aux administrateurs Home Assistant.","ui.api.payload_too_large":"Données trop volumineuses pour le serveur.","ui.api.payload_too_large_size":"Données trop volumineuses pour le serveur ({size}, maximum {limit}).","ui.api.not_connected":"Connexion à Home Assistant indisponible.","ui.api.connection_lost":"La connexion à Home Assistant a été perdue.","ui.api.invalid_project_id":"Identifiant de projet invalide : {id}","ui.api.invalid_asset_id":"Identifiant d'image invalide : {id}","ui.api.not_found":"Ressource introuvable sur le serveur.","ui.api.project_not_found":"Plan introuvable sur le serveur (il a peut-être été supprimé).","ui.api.write_failed":"Le serveur n'a pas pu enregistrer les données.","ui.api.unknown_command":"Commande inconnue du serveur : redémarrez Home Assistant après la mise à jour de Home Architect.","ui.api.file_too_large":"Fichier trop volumineux pour le serveur.","ui.api.unsupported_media_type":"Format d'image non pris en charge.","ui.api.invalid_image":"Image invalide ou corrompue.","ui.api.not_ready":"Home Architect n'est pas encore chargé sur le serveur.","ui.api.http_error":"Erreur HTTP {status}.","ui.api.background_not_uploaded":"L'image de fond doit être téléversée sur le serveur avant la sauvegarde.","ui.api.project_too_large":"Plan trop volumineux ({size}, maximum {limit}).","ui.api.image_too_large":"Image trop volumineuse ({size}, maximum {limit}).","ui.api.svg_too_large":"SVG trop volumineux ({size}, maximum {limit}).","ui.api.invalid_upload_response":"Réponse inattendue du serveur après le téléversement.","ui.api.invalid_publish_response":"Réponse inattendue du serveur après la publication."});Te("en",{"ui.level.sous-sol":"Basement","ui.level.sous-sol.full":"Basement","ui.level.rdc":"Ground floor","ui.level.rdc.full":"Ground floor","ui.level.etage1":"First floor","ui.level.etage1.full":"First floor","ui.level.etage2":"Second floor","ui.level.etage2.full":"Second floor","ui.level.etage3":"Third floor","ui.level.etage3.full":"Third floor","ui.level.jardin":"Garden","ui.level.jardin.full":"Garden","ui.level.autre":"Other","ui.level.autre.full":"Other","ui.project.default_name":"New plan","ui.project.default_room_name":"Room","ui.api.size_mib":"{value} MB","ui.api.conflict":"The plan has been changed elsewhere since it was opened.","ui.api.conflict_revision":"The plan has been changed elsewhere since it was opened (server revision {revision}).","ui.api.unauthorized":"Only Home Assistant administrators can do this.","ui.api.payload_too_large":"The data is too large for the server.","ui.api.payload_too_large_size":"The data is too large for the server ({size}, maximum {limit}).","ui.api.not_connected":"The connection to Home Assistant is unavailable.","ui.api.connection_lost":"The connection to Home Assistant was lost.","ui.api.invalid_project_id":"Invalid project identifier: {id}","ui.api.invalid_asset_id":"Invalid image identifier: {id}","ui.api.not_found":"Resource not found on the server.","ui.api.project_not_found":"Plan not found on the server (it may have been deleted).","ui.api.write_failed":"The server could not save the data.","ui.api.unknown_command":"Unknown server command: restart Home Assistant after updating Home Architect.","ui.api.file_too_large":"The file is too large for the server.","ui.api.unsupported_media_type":"Unsupported image format.","ui.api.invalid_image":"The image is invalid or corrupted.","ui.api.not_ready":"Home Architect is not loaded on the server yet.","ui.api.http_error":"HTTP error {status}.","ui.api.background_not_uploaded":"The background image must be uploaded to the server before saving.","ui.api.project_too_large":"The plan is too large ({size}, maximum {limit}).","ui.api.image_too_large":"The image is too large ({size}, maximum {limit}).","ui.api.svg_too_large":"The SVG is too large ({size}, maximum {limit}).","ui.api.invalid_upload_response":"Unexpected server response after the upload.","ui.api.invalid_publish_response":"Unexpected server response after publishing."});function $t(n,t,e,r){return Object.freeze({id:n,order:t,icon:e,floor:r,get label(){return I(`ui.level.${n}`)},get fullLabel(){return I(`ui.level.${n}.full`)}})}const yn=Object.freeze([$t("sous-sol",0,"🏠",-1),$t("rdc",1,"🏠",0),$t("etage1",2,"🏠",1),$t("etage2",3,"🏠",2),$t("etage3",4,"🏠",3),$t("jardin",5,"🌳",null)]),bh="rdc",Ti="autre",Ls=$t(Ti,yn.length,"📁",null);function Ae(n){return n?yn.find(t=>t.id===n):void 0}function Ns(n){return Ae(n)!==void 0}function xh(n){const t=Ae(n);return t?t.label:!n||n===Ti?Ls.label:n}function vh(n){const t=Ae(n);if(!t||t.floor===null)return null;const e=yn.find(r=>r.floor===t.floor-1);return e?e.id:null}const pe=2*1024*1024,fe=3.5*1024*1024,hr=256*1024,Ut=/^[a-zA-Z0-9_-]{1,64}$/,De=/^[A-Za-z0-9_-]{1,64}-[A-Za-z0-9]{6,64}\.[A-Za-z0-9]{2,5}$/,ur="abcdefghijklmnopqrstuvwxyz0123456789",Ai=/^[a-z0-9_]+\.[a-z0-9_]+$/i,js=/^(?:https?:\/\/|\/)[^\s\x00-\x1f\x7f]*$/i,Fs=2048,zs=/^data:image\//i,Ws=/^image\/[a-z0-9.+-]+$/i,Hs=/^(?:\/(?!\/)|#)[^\s\x00-\x1f\x7f\\]*$/,Us=/^[#a-zA-Z0-9(),.%\s+-]{1,64}$/,Ys=/url\s*\(|expression|image-set/i,Bs=/^[a-z0-9_-]{1,32}:[a-z0-9_-]{1,64}$/i,qs=64,Di=200,Ii=64,Ci=50,Ri=5,Oi=2e3,Xs=.2,Vs=.02,Gs=1.5,Li=.5,Ks=.05,Zs=2,Js=.9,Qs=.4,Ie=50,sn=100;function Q(n){return typeof n=="object"&&n!==null&&!Array.isArray(n)}function Lt(n){return Array.isArray(n)?n:[]}function V(n){if(typeof n=="number")return Number.isFinite(n)?n:void 0;if(typeof n=="string"&&n.trim()!==""){const t=Number(n);return Number.isFinite(t)?t:void 0}}function yt(n,t,e){return Math.min(e,Math.max(t,n))}function ct(n,t){const e=V(n);return e===void 0?t:e}function Nt(n,t){const e=V(n);return e!==void 0&&e>0?Math.min(e,t):void 0}function ta(n){return typeof n=="number"&&Number.isInteger(n)&&n>=0?n:void 0}function X(n){if(typeof n!="string")return;const t=n.trim();return t===""?void 0:t}function ke(n,t){const e=X(n);return e===void 0?void 0:e.length>t?e.slice(0,t).trim():e}function Ni(n){const t=X(n);return t&&Us.test(t)&&!Ys.test(t)?t:void 0}function bn(n){const t=X(n);return t&&t.length<=qs?t:void 0}function ji(n){return typeof n=="string"?n.trim()===""?"":n:typeof n=="number"&&Number.isFinite(n)?String(n):""}function jt(n){if(!Q(n))return null;const t=V(n.x),e=V(n.y);return t===void 0||e===void 0?null:{x:t,y:e}}function Ce(n,t){return typeof n=="string"&&t.includes(n)?n:void 0}function ea(n){const t=(n%360+360)%360;return t===0?0:t}function le(n,t,e){let r=ji(n);for(;r===""||e.has(r);)r=Ft(t);return e.add(r),r}function Fi(n){const t=typeof crypto<"u"&&typeof crypto.getRandomValues=="function";let e="";for(;e.length<n;){const r=new Uint8Array(n*2);if(t)crypto.getRandomValues(r);else for(let i=0;i<r.length;i++)r[i]=Math.floor(Math.random()*256);for(const i of r)if(!(i>=252)&&(e+=ur[i%ur.length],e.length===n))break}return e}function zi(){return`plan_${Fi(8)}`}function Ft(n){return`${n}_${Fi(10)}`}function na(){return{size:Li,subdivisions:2,snapToGrid:!0,snapToAngles:!0,snapToElements:!0}}function Wi(n){return n&&Ns(n)?n:void 0}function Hi(n){return Ae(n)?.fullLabel??I("ui.project.default_name")}function ra(n={}){const t=new Date().toISOString(),e=ke(n.category,Ii);return{id:zi(),name:ke(n.name,Di)??Hi(e),category:e,schema_version:en,created_at:t,updated_at:t,pixelsPerMeter:yt(ct(n.pixelsPerMeter,Ci),Ri,Oi),grid:na(),walls:[],openings:[],rooms:[],bindings:[],furniture:[]}}function ia(n){const t=Q(n)?n:{},e=V(t.subdivisions);return{size:yt(ct(t.size,Li),Ks,Zs),subdivisions:e===void 0?2:yt(Math.round(e),1,20),snapToGrid:typeof t.snapToGrid=="boolean"?t.snapToGrid:!0,snapToAngles:typeof t.snapToAngles=="boolean"?t.snapToAngles:!0,snapToElements:typeof t.snapToElements=="boolean"?t.snapToElements:!0}}function oa(n){return typeof n!="string"?"":zs.test(n)||n.length<=Fs&&js.test(n)?n:""}function sa(n){if(!Q(n))return;const t=oa(n.imageUrl),e=typeof n.assetId=="string"&&De.test(n.assetId)?n.assetId:void 0;if(!t&&!e)return;const r=V(n.scale),i={imageUrl:t,opacity:yt(ct(n.opacity,Qs),0,1),visible:n.visible!==!1,offset:jt(n.offset)??{x:0,y:0},scale:r!==void 0&&r>0?r:1,rotation:ct(n.rotation,0)};e&&(i.assetId=e),typeof n.mimeType=="string"&&Ws.test(n.mimeType)&&(i.mimeType=n.mimeType);const o=Nt(n.widthPx,Number.MAX_SAFE_INTEGER),s=Nt(n.heightPx,Number.MAX_SAFE_INTEGER);return o!==void 0&&(i.widthPx=o),s!==void 0&&(i.heightPx=s),i}function aa(n){const t=new Set,e=[];for(const r of Lt(n)){if(!Q(r))continue;const i=jt(r.start),o=jt(r.end);if(!i||!o||Math.hypot(o.x-i.x,o.y-i.y)<1e-6)continue;const s={id:le(r.id,"wall",t),start:i,end:o,thickness:yt(ct(r.thickness,Xs),Vs,Gs),type:Ce(r.type,ms)??"standard"},a=Nt(r.height,Ie);a!==void 0&&(s.height=a),e.push(s)}return e}function ca(n,t){const e=new Map(t.map(o=>[o.id,Math.hypot(o.end.x-o.start.x,o.end.y-o.start.y)])),r=new Set,i=[];for(const o of Lt(n)){if(!Q(o))continue;const s=ji(o.wallId),a=e.get(s);if(a===void 0)continue;const c={id:le(o.id,"op",r),wallId:s,type:Ce(o.type,gs)??"door",offset:yt(ct(o.offset,a/2),0,a),width:yt(ct(o.width,Js),.05,sn),flipSide:o.flipSide===!0,flipDirection:o.flipDirection===!0},l=Nt(o.height,Ie);l!==void 0&&(c.height=l),(o.sashCount===1||o.sashCount===2)&&(c.sashCount=o.sashCount);const h=X(o.entityId);h&&Ai.test(h)&&(c.entityId=h),i.push(c)}return i}function la(n){const t=new Set,e=[];for(const r of Lt(n)){if(!Q(r))continue;const i=Lt(r.polygon).map(jt).filter(u=>u!==null);if(i.length<3)continue;const o=V(r.areaM2),s={id:le(r.id,"room",t),name:typeof r.name=="string"?r.name:I("ui.project.default_room_name"),polygon:i,areaM2:o!==void 0&&o>=0?o:q.computeArea(i)},a=X(r.area_id),c=Ni(r.color),l=bn(r.icon),h=Nt(r.height,Ie);a&&(s.area_id=a),c&&(s.color=c),l&&(s.icon=l),h!==void 0&&(s.height=h),e.push(s)}return e}function ha(n,t){const e=new Set,r=[];for(const i of Lt(n)){if(!Q(i))continue;const o=X(i.entityId);if(!o||!Ai.test(o))continue;const s=jt(i.position);if(!s)continue;const a={id:le(i.id,"bind",e),entityId:o,position:s},c=X(i.roomId),l=bn(i.icon),h=X(i.mdiIcon),u=h&&Bs.test(h)?h:void 0,p=X(i.customName),f=X(i.navigationPath),d=f&&Hs.test(f)?f:void 0,m=y=>{const x=Ce(y,ys);return x==="navigate"&&!d?void 0:x},g=m(i.tapAction),w=m(i.holdAction);c&&(a.roomId=c),l&&(a.icon=l),u&&(a.mdiIcon=u),p&&(a.customName=p),g&&!(t&&g==="toggle")&&(a.tapAction=g),w&&(a.holdAction=w),d&&(a.navigationPath=d),r.push(a)}return r}function ua(n){const t=new Set,e=[];for(const r of Lt(n)){if(!Q(r))continue;const i=X(r.type),o=jt(r.position);if(!i||!o)continue;const s=Z(i),a=V(r.width),c=V(r.length),l={id:le(r.id,"furn",t),type:i,name:typeof r.name=="string"?Ss({type:i,name:r.name}):s?.name??i,category:Ce(r.category,bi)??s?.category??"other",position:o,width:a!==void 0&&a>0?Math.min(a,sn):s?.width??1,length:c!==void 0&&c>0?Math.min(c,sn):s?.length??1,rotation:ea(ct(r.rotation,0))},h=X(r.roomId),u=Ni(r.color),p=bn(r.icon);h&&(l.roomId=h),u&&(l.color=u),p&&(l.icon=p),e.push(l)}return e}function da(n){if(!Q(n))return;const t=V(n.minX),e=V(n.minY),r=V(n.maxX),i=V(n.maxY);if(!(t===void 0||e===void 0||r===void 0||i===void 0)&&!(r<=t||i<=e))return{minX:t,minY:e,maxX:r,maxY:i}}function xn(n){if(!Q(n))return;const{url:t,path:e,hash:r,published_at:i}=n;if(typeof t!="string"||typeof e!="string"||typeof r!="string"||typeof i!="string"||!t.startsWith("/")||t.startsWith("//")||!e.startsWith("/")||e.startsWith("//"))return;const o={url:t,path:e,hash:r,published_at:i,include_background:n.include_background===!0};return typeof n.legacy_path=="string"&&n.legacy_path.startsWith("/local/")&&(o.legacy_path=n.legacy_path),o}function pa(n){const t=Q(n)?n:{},e=new Date().toISOString(),r=typeof t.id=="string"&&Ut.test(t.id)?t.id:zi(),i=ke(t.category,Ii)??Wi(r),o=V(t.schema_version),s=o===void 0||o<en,a=aa(t.walls),c={id:r,name:ke(t.name,Di)??Hi(i),category:i,schema_version:en,created_at:X(t.created_at)??e,updated_at:X(t.updated_at)??X(t.created_at)??e,pixelsPerMeter:yt(ct(t.pixelsPerMeter,Ci),Ri,Oi),grid:ia(t.grid),walls:a,openings:ca(t.openings,a),rooms:la(t.rooms),bindings:ha(t.bindings,s),furniture:ua(t.furniture)};i===void 0&&delete c.category;const l=ta(t.revision);l!==void 0&&(c.revision=l);const h=Nt(t.defaultCeilingHeight,Ie);h!==void 0&&(c.defaultCeilingHeight=h);const u=sa(t.background);u&&(c.background=u),typeof t.showDimensions=="boolean"&&(c.showDimensions=t.showDimensions),typeof t.showThermalHeatmap=="boolean"&&(c.showThermalHeatmap=t.showThermalHeatmap),typeof t.showGhostLevel=="boolean"&&(c.showGhostLevel=t.showGhostLevel);const p=X(t.ghostLevelId);p&&(c.ghostLevelId=p);const f=V(t.northAngle);f!==void 0&&(c.northAngle=(f%360+360)%360),typeof t.showCompass=="boolean"&&(c.showCompass=t.showCompass);const d=da(t.exportFrame);d&&(c.exportFrame=d);const m=xn(t.publish);return m&&(c.publish=m),c}function vn(n){try{return pa(n)}catch(t){return console.warn("[home-architect] Projet illisible, remplacé par un plan vide :",t),ra()}}function fa(n){const t={};for(const[e,r]of Object.entries(n))e==="publish"||e.startsWith("_")||(t[e]=r);return t}function ma(n){const t=JSON.stringify(n);return t===void 0?0:new TextEncoder().encode(t).length}function wh(n){if(typeof structuredClone=="function")try{return structuredClone(n)}catch{}return JSON.parse(JSON.stringify(n))}function Yt(n){const t=typeof n=="string"?n.indexOf("."):-1;return t>0?n.slice(0,t):""}const ga=new Set(["light","switch","fan","input_boolean","automation","scene","script","button","input_button"]),ya={light:{domain:"light",service:"toggle"},switch:{domain:"switch",service:"toggle"},fan:{domain:"fan",service:"toggle"},input_boolean:{domain:"input_boolean",service:"toggle"},automation:{domain:"automation",service:"toggle"},siren:{domain:"siren",service:"toggle"},cover:{domain:"cover",service:"toggle"},valve:{domain:"valve",service:"toggle"},humidifier:{domain:"humidifier",service:"toggle"},media_player:{domain:"media_player",service:"toggle"},climate:{domain:"climate",service:"toggle"},remote:{domain:"remote",service:"toggle"},group:{domain:"homeassistant",service:"toggle"},scene:{domain:"scene",service:"turn_on"},script:{domain:"script",service:"turn_on"},button:{domain:"button",service:"press"},input_button:{domain:"input_button",service:"press"}};function ba(n){return ga.has(Yt(n))?"toggle":"more-info"}function xa(n){const t=ya[Yt(n)];return t?{...t}:null}function Ui(n,t){const e=n?.[t]?.attributes?.friendly_name;return typeof e=="string"&&e.trim()!==""?e:void 0}function Yi(n,t){return X(n.customName)??Ui(t,n.entityId)??n.entityId}function $h(n,t){if(!Array.isArray(n?.bindings))return n;let e=!1;const r=n.bindings.map(i=>{if(i.customName===void 0||!(i.customName===i.entityId||t!==void 0&&i.customName===Ui(t,i.entityId)))return i;e=!0;const{customName:s,...a}=i;return a});return e?{...n,bindings:r}:n}const We="#0f172a",va=50,dr=2,wa={minX:-1,minY:-1,maxX:11,maxY:7},pr=50,fr=.001,$a=4,D={roomStroke:.03,wallOutline:.02,cutoutOverlap:.03,jamb:.08,doorLeaf:.04,doorArc:.024,doorDash:.06,windowFrame:.05,windowGlass:.03,windowSash:.02,windowMullion:.05,slidingPanel:.06,labelName:.26,labelArea:.22,labelGap:.12,labelHalo:.05,markerRadius:.32,markerStroke:.03,markerIcon:.26,markerLabel:.2},C={roomFill:"rgba(56, 189, 248, 0.12)",roomStroke:"rgba(56, 189, 248, 0.4)",wallFill:"#334155",wallStroke:"#64748b",jamb:"#94a3b8",frame:"#94a3b8",accent:"#38bdf8",accentFaint:"rgba(56, 189, 248, 0.45)",doorSwing:"rgba(56, 189, 248, 0.08)",labelName:"#f8fafc",markerFill:"rgba(30, 41, 59, 0.85)",markerLabel:"#f1f5f9"},mr="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",_a="ui-monospace, SFMono-Regular, Menlo, monospace",ka=/^(?:#[0-9a-f]{3,8}|(?:rgb|rgba|hsl|hsla)\([0-9\s.,%+-]{1,60}\)|[a-z]{3,24})$/i,Ma=/^data:image\/(?:png|jpe?g|webp|gif|svg\+xml)(?:;[a-z0-9=._+-]+)*;base64,[a-z0-9+/=\s]+$/i,Sa=/[\uD800-\uDBFF][\uDC00-\uDFFF]|[\x00-\x08\x0B\x0C\x0E-\x1F\uD800-\uDFFF\uFFFE\uFFFF]/g;function Bi(n){return n.replace(Sa,t=>t.length===2?t:"")}function ut(n){return Bi(String(n)).replace(/[<>&'"]/g,t=>{switch(t){case"<":return"&lt;";case">":return"&gt;";case"&":return"&amp;";case"'":return"&apos;";default:return"&quot;"}})}function U(n){if(!Number.isFinite(n))return"0";const t=Math.round(n*100)/100;return String(t===0?0:t)}function gr(n,t){const e=typeof n=="string"?n.trim():"";return e&&ka.test(e)?e:t}function He(n,t){return n.x*t.y-n.y*t.x}function Me(n,t,e){return{x:n.x+t.x*e,y:n.y+t.y*e}}function yr(n,t,e){const r={x:-t.dir.y,y:t.dir.x},i={x:e.dir.y,y:-e.dir.x},o=He(t.dir,e.dir);if(Math.abs(o)<1e-6)return null;const s=Me(n,r,t.half),a=Me(n,i,e.half),c={x:a.x-s.x,y:a.y-s.y},l=He(c,e.dir)/o,h=He(c,t.dir)/o;if(l>=t.length||h>=e.length)return null;const u={x:s.x+t.dir.x*l,y:s.y+t.dir.y*l};return Math.hypot(u.x-n.x,u.y-n.y)<=$a*Math.max(t.half,e.half)?u:null}function Vt(n,t,e){return Me(n,{x:-t.dir.y*e,y:t.dir.x*e},t.half)}function Se(n){const t=[],e=s=>{let a=t.find(c=>Math.hypot(c.point.x-s.x,c.point.y-s.y)<=fr);return a||(a={point:s,ends:[]},t.push(a)),a},r=new Map;for(const s of n){const a=s.end.x-s.start.x,c=s.end.y-s.start.y,l=Math.hypot(a,c);if(!(l>fr)||!Number.isFinite(l))continue;const h=Math.max(0,Number.isFinite(s.thickness)?s.thickness:0)/2,u={x:a/l,y:c/l},p={x:-u.x,y:-u.y},f={dir:u,half:h,length:l,angle:Math.atan2(u.y,u.x)},d={dir:p,half:h,length:l,angle:Math.atan2(p.y,p.x)},m=e(s.start),g=e(s.end);m.ends.push(f),g.ends.push(d),r.set(s.id,{start:f,end:d,startJoint:m.point,endJoint:g.point})}const i=new Map;for(const s of t){const a=[...s.ends].sort((l,h)=>l.angle-h.angle),c=a.length;a.forEach((l,h)=>{if(c<2){i.set(l,{left:Vt(s.point,l,1),right:Vt(s.point,l,-1),joined:!1});return}const u=a[(h+1)%c],p=a[(h-1+c)%c],f=yr(s.point,l,u),d={left:f??Vt(s.point,l,1),right:yr(s.point,p,l)??Vt(s.point,l,-1),joined:!0};f||(d.bevel=Vt(s.point,u,-1)),i.set(l,d)})}const o=new Map;for(const[s,a]of r){const c=i.get(a.start),l=i.get(a.end),h=[c.left,l.right];l.joined&&h.push(a.endJoint),l.bevel&&h.push(l.bevel),h.push(l.left,c.right),c.joined&&h.push(a.startJoint),c.bevel&&h.push(c.bevel),Pa(h)<0&&h.reverse(),o.set(s,h)}return o}function Pa(n){let t=0;for(let e=0;e<n.length;e++){const r=n[e],i=n[(e+1)%n.length];t+=r.x*i.y-i.x*r.y}return t/2}function br(n){return!!n&&[n.minX,n.minY,n.maxX,n.maxY].every(Number.isFinite)&&n.maxX>n.minX&&n.maxY>n.minY}function xr(n,t,e){if(t-n>=e)return[n,t];const i=(n+t)/2;return[i-e/2,i+e/2]}function vr(n,t){const e=t.end.x-t.start.x,r=t.end.y-t.start.y,i=Math.hypot(e,r);if(!(i>0))return null;const o={x:e/i,y:r/i};return{center:{x:t.start.x+o.x*n.offset,y:t.start.y+o.y*n.offset},dir:o,normal:{x:-o.y,y:o.x},angleDeg:Math.atan2(r,e)*180/Math.PI}}function Ea(n){return n==="door"||n==="double_door"}class wr{static computeContentFrame(t,e){const r=this.contentBounds(t);if(!r)return{...wa};const i=Math.max(r.maxX-r.minX,r.maxY-r.minY),o=e!==void 0&&Number.isFinite(e)&&e>=0?e:Math.max(.6,i*.05),[s,a]=xr(r.minX-o,r.maxX+o,dr),[c,l]=xr(r.minY-o,r.maxY+o,dr);return{minX:s,minY:c,maxX:a,maxY:l}}static contentBounds(t){const e=this.collectContentPoints(t);if(e.length===0)return null;let r=1/0,i=1/0,o=-1/0,s=-1/0;for(const a of e)a.x<r&&(r=a.x),a.x>o&&(o=a.x),a.y<i&&(i=a.y),a.y>s&&(s=a.y);return{minX:r,minY:i,maxX:o,maxY:s}}static resolveExportFrame(t,e,r){return br(e)?{...e}:br(t.exportFrame)?{...t.exportFrame}:this.computeContentFrame(t,r)}static frameContains(t,e){return e.minX>=t.minX-.001&&e.minY>=t.minY-.001&&e.maxX<=t.maxX+.001&&e.maxY<=t.maxY+.001}static calculateBoundingBox(t,e){const r=this.computeContentFrame(t,e);return{minX:r.minX,minY:r.minY,width:r.maxX-r.minX,height:r.maxY-r.minY,ppm:this.unitsPerMeter(t)}}static worldToPercentage(t,e){const r=(t.x-e.minX)/(e.maxX-e.minX)*100,i=(t.y-e.minY)/(e.maxY-e.minY)*100;return{left:Number.isFinite(r)?Math.round(r*100)/100:0,top:Number.isFinite(i)?Math.round(i*100)/100:0}}static unitsPerMeter(t){const e=t.pixelsPerMeter;return Number.isFinite(e)&&e>0?e:va}static embeddableDataUrl(t){return typeof t=="string"&&Ma.test(t)?t:null}static exportToSvg(t,e){const r={includeRooms:!0,includeWalls:!0,includeOpenings:!0,includeFurniture:!0,includeRoomLabels:!0,includeEntityMarkers:!1,includeBackground:!0,backgroundColor:We,...e},i=this.unitsPerMeter(t),o=_=>U(_*i),s=this.resolveExportFrame(t,r.frame,r.paddingMeters),a=o(s.minX),c=o(s.minY),l=o(s.maxX-s.minX),h=o(s.maxY-s.minY),u=gr(r.backgroundColor,We),p=u==="transparent"?We:u,f=t.walls||[],d=t.rooms||[],m=t.openings||[],g=t.furniture||[],w=t.bindings||[];let y="";u!=="transparent"&&(y+=`  <rect id="background" x="${a}" y="${c}" width="${l}" height="${h}" fill="${u}" />
`);const x=t.background,E=r.includeBackground!==!1&&x?.visible?this.embeddableDataUrl(r.backgroundDataUrl)??this.embeddableDataUrl(x.imageUrl):null;if(x&&E){const _=Number.isFinite(x.scale)&&x.scale>0?x.scale:1,b=x.offset||{x:0,y:0},k=Number.isFinite(x.opacity)?Math.min(1,Math.max(0,x.opacity)):.6;y+=`  <image id="background-image" href="${ut(E)}" x="${o(b.x)}" y="${o(b.y)}" width="${U((x.widthPx||1200)*_)}" height="${U((x.heightPx||900)*_)}" opacity="${U(k)}" />
`}if(r.includeRooms&&d.length>0){y+=`  <g id="rooms" stroke="${C.roomStroke}" stroke-width="${o(D.roomStroke)}">
`;for(const _ of d){if(!_.polygon||_.polygon.length<3)continue;const b=_.polygon.map(k=>`${o(k.x)},${o(k.y)}`).join(" ");y+=`    <polygon points="${b}" fill="${gr(_.color,C.roomFill)}" />
`}y+=`  </g>
`}if(r.includeFurniture!==!1&&g.length>0){const _=String(Math.round(i/pr*1e4)/1e4);y+=`  <g id="furniture">
`;for(const b of g){if(!b.position)continue;const k=Number.isFinite(b.rotation)?b.rotation:0,P=Bi(Cs(b,{pixelsPerMeter:pr}));y+=`    <g transform="translate(${o(b.position.x)}, ${o(b.position.y)}) rotate(${U(k)}) scale(${_})">${P}</g>
`}y+=`  </g>
`}if(r.includeWalls&&f.length>0){const b=[...Se(f).values()].map(k=>`M${k.map(P=>`${o(P.x)} ${o(P.y)}`).join(" L")} Z`).join(" ");b&&(y+=`  <g id="walls">
`,y+=`    <path d="${b}" fill="${C.wallStroke}" stroke="${C.wallStroke}" stroke-width="${o(D.wallOutline*2)}" stroke-linejoin="round" />
`,y+=`    <path d="${b}" fill="${C.wallFill}" />
`,y+=`  </g>
`)}if(r.includeOpenings&&m.length>0){y+=`  <g id="openings">
`;for(const _ of m){const b=f.find(P=>P.id===_.wallId);if(!b)continue;const k=vr(_,b);k&&(y+=`    <g transform="translate(${o(k.center.x)}, ${o(k.center.y)}) rotate(${U(k.angleDeg)})">
`,y+=this.renderOpening(_,b,i,p),y+=`    </g>
`)}y+=`  </g>
`}if(r.includeRoomLabels&&d.length>0){y+=`  <g id="room-labels" text-anchor="middle" stroke="${p}" stroke-width="${o(D.labelHalo)}" stroke-linejoin="round" paint-order="stroke">
`;for(const _ of d){if(!_.polygon||_.polygon.length<3)continue;const b=q.labelPoint(_.polygon),k=Number.isFinite(_.areaM2)?_.areaM2:q.computeArea(_.polygon),P=`${mi(k,{minimumFractionDigits:1,maximumFractionDigits:1})} m²`;y+=`    <g transform="translate(${o(b.x)}, ${o(b.y)})">
`,y+=`      <text y="${o(-.12/2)}" fill="${C.labelName}" font-size="${o(D.labelName)}" font-weight="700">${ut(_.name||"")}</text>
`,y+=`      <text y="${o(D.labelGap/2+D.labelArea)}" fill="${C.accent}" font-size="${o(D.labelArea)}" font-weight="600" font-family="${_a}">${ut(P)}</text>
`,y+=`    </g>
`}y+=`  </g>
`}if(r.includeEntityMarkers&&w.length>0){y+=`  <g id="entity-markers" text-anchor="middle">
`;for(const _ of w){if(!_.position)continue;const b=Yi(_,r.states);y+=`    <g transform="translate(${o(_.position.x)}, ${o(_.position.y)})">
`,y+=`      <circle r="${o(D.markerRadius)}" fill="${C.markerFill}" stroke="${C.accent}" stroke-width="${o(D.markerStroke)}" />
`,y+=`      <text y="${o(D.markerIcon*.35)}" font-size="${o(D.markerIcon)}">${ut(_.icon||"⚡")}</text>
`,y+=`      <text y="${o(D.markerRadius+D.markerLabel*1.1)}" fill="${C.markerLabel}" font-size="${o(D.markerLabel)}" font-weight="600">${ut(b)}</text>
`,y+=`    </g>
`}y+=`  </g>
`}if(t.showCompass!==!1&&typeof t.northAngle=="number"){const _=(t.northAngle%360+360)%360,b=Math.max(16,(s.maxX-s.minX)*i*.035),k=b*1.4,P=s.maxX*i-k,z=s.minY*i+k;y+=`  <g id="compass-rose" transform="translate(${U(P)}, ${U(z)})" pointer-events="none">
`,y+=`    <circle r="${U(b)}" fill="${p}" stroke="${C.accent}" stroke-width="1.5" stroke-dasharray="3,3" opacity="0.85" />
`,y+=`    <circle r="${U(b*.88)}" fill="none" stroke="${C.frame}" stroke-width="0.75" opacity="0.5" />
`,y+=`    <g transform="rotate(${U(_)})">
`,y+=`      <polygon points="0,${U(-b*.82)} ${U(b*.22)},0 0,0" fill="#ef4444" />
`,y+=`      <polygon points="0,${U(-b*.82)} ${U(-b*.22)},0 0,0" fill="#b91c1c" />
`,y+=`      <polygon points="0,${U(b*.82)} ${U(b*.22)},0 0,0" fill="#94a3b8" />
`,y+=`      <polygon points="0,${U(b*.82)} ${U(-b*.22)},0 0,0" fill="#64748b" />
`,y+=`      <circle r="${U(b*.12)}" fill="#ffffff" stroke="${C.wallStroke}" stroke-width="1" />
`,y+=`      <text y="${U(-b*.88)}" text-anchor="middle" fill="#ef4444" font-size="${U(b*.42)}" font-weight="800" font-family="${ut(mr)}">N</text>
`,y+=`    </g>
`,y+=`  </g>
`}return`<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="${a} ${c} ${l} ${h}" width="${l}" height="${h}" font-family="${ut(mr)}">
  <title>${ut(t.name||"Home Architect")}</title>
${y}</svg>`}static renderOpening(t,e,r,i){const o=g=>U(g*r),s=t.width,a=s/2,c=e.thickness,l=c/2,h="      ";let u=`${h}<rect x="${o(-a)}" y="${o(-l-D.cutoutOverlap)}" width="${o(s)}" height="${o(c+D.cutoutOverlap*2)}" fill="${i}" />
`;const p=`${h}<rect x="${o(-a)}" y="${o(-l)}" width="${o(s)}" height="${o(c)}" fill="none" stroke="${C.frame}" stroke-width="${o(D.windowFrame)}" />
`,f=()=>{const g=Math.min(D.jamb,s/4);return`${h}<rect x="${o(-a)}" y="${o(-l)}" width="${o(g)}" height="${o(c)}" fill="${C.jamb}" />
${h}<rect x="${o(a-g)}" y="${o(-l)}" width="${o(g)}" height="${o(c)}" fill="${C.jamb}" />
`},d=t.flipSide?-1:1,m=(g,w,y)=>{const x=w*d>0?1:0;return`${h}<line x1="${o(g)}" y1="0" x2="${o(g)}" y2="${o(d*y)}" stroke="${C.accent}" stroke-width="${o(D.doorLeaf)}" stroke-linecap="round" />
${h}<path d="M ${o(g+w*y)} 0 A ${o(y)} ${o(y)} 0 0 ${x} ${o(g)} ${o(d*y)}" fill="${C.doorSwing}" stroke="${C.accent}" stroke-width="${o(D.doorArc)}" stroke-dasharray="${o(D.doorDash)} ${o(D.doorDash)}" />
`};switch(t.type){case"door":{const g=t.flipDirection?a:-a;u+=f()+m(g,t.flipDirection?-1:1,s);break}case"double_door":u+=f()+m(-a,1,a)+m(a,-1,a);break;case"sliding_door":{const g=s*.55;u+=p+`${h}<rect x="${o(-a)}" y="${o(-c/4-D.slidingPanel/2)}" width="${o(g)}" height="${o(D.slidingPanel)}" fill="${C.accent}" />
${h}<rect x="${o(a-g)}" y="${o(c/4-D.slidingPanel/2)}" width="${o(g)}" height="${o(D.slidingPanel)}" fill="${C.accent}" />
`;break}case"french_window":u+=p+`${h}<rect x="${o(-a)}" y="${o(-c/4)}" width="${o(a)}" height="${o(D.slidingPanel)}" fill="${C.accent}" />
${h}<rect x="0" y="${o(c/4)}" width="${o(a)}" height="${o(D.slidingPanel)}" fill="${C.accent}" />
`;break;default:{const g=t.sashCount||(s>=1.25?2:1),w=Math.min(D.jamb,s/4);u+=p+`${h}<line x1="${o(-a)}" y1="0" x2="${o(a)}" y2="0" stroke="${C.accent}" stroke-width="${o(D.windowGlass)}" />
`,g===2?u+=`${h}<line x1="0" y1="${o(-l)}" x2="0" y2="${o(l)}" stroke="${C.accent}" stroke-width="${o(D.windowMullion)}" />
${h}<line x1="${o(-a+w)}" y1="${o(-c/4)}" x2="${o(-w/2)}" y2="${o(-c/4)}" stroke="${C.accentFaint}" stroke-width="${o(D.windowSash)}" />
${h}<line x1="${o(w/2)}" y1="${o(c/4)}" x2="${o(a-w)}" y2="${o(c/4)}" stroke="${C.accentFaint}" stroke-width="${o(D.windowSash)}" />
`:u+=`${h}<line x1="${o(-a+w)}" y1="${o(-c/4)}" x2="${o(a-w)}" y2="${o(-c/4)}" stroke="${C.accentFaint}" stroke-width="${o(D.windowSash)}" />
${h}<line x1="${o(-a+w)}" y1="${o(c/4)}" x2="${o(a-w)}" y2="${o(c/4)}" stroke="${C.accentFaint}" stroke-width="${o(D.windowSash)}" />
`;break}}return u}static collectContentPoints(t){const e=[],r=t.walls||[];for(const o of Se(r).values())e.push(...o);for(const o of t.rooms||[])o.polygon&&o.polygon.length>0&&e.push(...o.polygon);for(const o of t.bindings||[])o.position&&e.push(o.position);for(const o of t.furniture||[]){if(!o.position)continue;const s=Os(o);e.push({x:s.minX,y:s.minY},{x:s.maxX,y:s.maxY})}for(const o of t.openings||[]){if(!Ea(o.type))continue;const s=r.find(h=>h.id===o.wallId),a=s?vr(o,s):null;if(!a)continue;const c=o.flipSide?-1:1,l=o.width/2;for(const h of[-l,l]){const u={x:a.center.x+a.dir.x*h,y:a.center.y+a.dir.y*h},p=o.type==="door"?o.width:l;e.push(u,Me(u,a.normal,c*p))}}const i=t.background;if(i&&i.visible&&(i.imageUrl||i.assetId)){const o=this.unitsPerMeter(t),s=i.offset||{x:0,y:0},a=Number.isFinite(i.scale)&&i.scale>0?i.scale:1;e.push({x:s.x,y:s.y},{x:s.x+(i.widthPx||1200)*a/o,y:s.y+(i.heightPx||900)*a/o})}return e.filter(o=>Number.isFinite(o.x)&&Number.isFinite(o.y))}}function Ta(n,t){if(typeof customElements>"u")return;const e=customElements.get(n);if(e){e!==t&&console.warn(`[home-architect] ${n} déjà défini (ancienne version en cache ?)`);return}try{customElements.define(n,t)}catch(r){console.error(`[home-architect] Impossible de définir <${n}> :`,r)}}const Aa=new Set(["INPUT","TEXTAREA","SELECT"]),Da=new Set(["ha-textfield","ha-textarea","ha-code-editor","ha-combo-box","ha-select","ha-search-input","ha-entity-picker","ha-icon-picker","mwc-textfield","mwc-textarea","mwc-select","md-filled-text-field","md-outlined-text-field","vaadin-combo-box-light"]),Ia=new Set(["textbox","searchbox","combobox","spinbutton"]);function wn(n){return typeof n.composedPath=="function"?n.composedPath():[]}function $r(n){const t=n;if(typeof t.tagName!="string")return!1;if(Aa.has(t.tagName.toUpperCase())||Da.has(t.tagName.toLowerCase())||t.isContentEditable)return!0;const e=typeof t.getAttribute=="function"?t.getAttribute("role"):null;return e!==null&&Ia.has(e.toLowerCase())}function Ca(n){if(!n.isConnected)return!1;const t=n;return typeof t.checkVisibility=="function"?t.checkVisibility():n.getClientRects().length>0}function Ra(n){const t=wn(n);return t.length>0?t[0]:n.target}function Oa(n){const t=wn(n);return t.length===0?n.target!==null&&$r(n.target):t.some($r)}function La(n,t){return wn(n).includes(t)}function Na(n){return n.ctrlKey||n.metaKey||n.altKey}function _h(n){return(n.ctrlKey||n.metaKey)&&!n.altKey}function ja(n,t){if(Oa(n)||t.modalOpen&&!t.allowWhenModalOpen)return!1;if(La(n,t.host))return!0;const e=Ra(n),r=t.host.ownerDocument;return e!==null&&(e===r.body||e===r.documentElement)&&Ca(t.host)}const Fa=2500,me=12*1024*1024,za=new Set(["image/png","image/jpeg","image/webp","image/gif"]),Wa=2*1024*1024,Ha=.85,Ua=6e4;function Ya(n){return new Promise((t,e)=>{const r=URL.createObjectURL(n),i=new Image;i.onload=()=>{t({source:i,width:i.naturalWidth,height:i.naturalHeight,release:()=>URL.revokeObjectURL(r)})},i.onerror=()=>{URL.revokeObjectURL(r),e(new Error("Image illisible ou format non pris en charge."))},i.src=r})}async function Ba(n){if(typeof createImageBitmap=="function"&&n.type!=="image/svg+xml")try{const t=await createImageBitmap(n);return{source:t,width:t.width,height:t.height,release:()=>t.close()}}catch{}return Ya(n)}function Ue(n,t,e){return new Promise(r=>{try{n.toBlob(i=>r(i),t,e)}catch{r(null)}})}function qa(n,t,e){const r=n.getImageData(0,0,t,e).data;for(let i=3;i<r.length;i+=4)if(r[i]<255)return!0;return!1}async function kh(n,t={}){if(n.type==="image/svg+xml")throw new Error("Les images SVG ne sont pas compressées : elles sont téléversées telles quelles.");const e=t.maxSide&&t.maxSide>0?t.maxSide:Fa,r=t.quality&&t.quality>0&&t.quality<=1?t.quality:Ha,i=await Ba(n),o=document.createElement("canvas");try{if(!i.width||!i.height)throw new Error("Image vide ou dimensions inconnues.");const s=Math.min(1,e/Math.max(i.width,i.height)),a=Math.max(1,Math.round(i.width*s)),c=Math.max(1,Math.round(i.height*s)),l=s<1;o.width=a,o.height=c;const h=o.getContext("2d");if(!h)throw new Error("Canvas 2D indisponible dans ce navigateur.");h.imageSmoothingEnabled=!0,h.imageSmoothingQuality="high",h.drawImage(i.source,0,0,a,c);const u=n.type!=="image/jpeg"&&qa(h,a,c);let p=null;if(u){const f=await Ue(o,"image/png");f&&f.size<Wa&&(p=f)}if(!p){const f=await Ue(o,"image/webp",r);f&&f.type==="image/webp"&&(p=f)}if(p||(u&&(h.globalCompositeOperation="destination-over",h.fillStyle="#ffffff",h.fillRect(0,0,a,c),h.globalCompositeOperation="source-over"),p=await Ue(o,"image/jpeg",r)),!p)throw new Error("Impossible d'encoder l'image.");return!l&&p.size>=n.size&&za.has(n.type)?{blob:n,width:i.width,height:i.height,mimeType:n.type}:{blob:p,width:a,height:c,mimeType:p.type}}finally{i.release(),o.width=0,o.height=0}}function Xa(n){return new Promise((t,e)=>{const r=new FileReader;r.onload=()=>{typeof r.result=="string"?t(r.result):e(new Error("Lecture du fichier impossible."))},r.onerror=()=>e(r.error??new Error("Lecture du fichier impossible.")),r.readAsDataURL(n)})}function Mh(n){const t=/^data:([^,]*),/i.exec(n);if(!t)throw new Error("Data-URL invalide.");const e=t[1],r=n.slice(t[0].length),i=/;base64$/i.test(e),o=(e.split(";")[0]||"application/octet-stream").toLowerCase();if(!i)return new Blob([decodeURIComponent(r)],{type:o});const s=atob(r.replace(/\s+/g,"")),a=new Uint8Array(s.length);for(let c=0;c<s.length;c++)a[c]=s.charCodeAt(c);return new Blob([a],{type:o})}function Sh(n){return new Promise((t,e)=>{const r=new FileReader;r.onload=()=>{typeof r.result=="string"?t(r.result):e(new Error("Lecture du fichier impossible."))},r.onerror=()=>e(r.error??new Error("Lecture du fichier impossible.")),r.readAsText(n)})}function Ph(n,t){const e=URL.createObjectURL(n),r=document.createElement("a");r.href=e,r.download=t,r.rel="noopener",r.style.display="none",document.body.appendChild(r),r.click(),r.remove(),setTimeout(()=>URL.revokeObjectURL(e),Ua)}const qi=50,Va=.15,Ga=8,Ka=.2,Za=2.5,Ja=100,Qa=16,tc=240,ec=25,nc=.0015,rc=.01;function Re(n){const t=(n%360+360)%360;return t===0?0:t}function ic(n){const t=Re(n);if(t===0)return[1,0];if(t===90)return[0,1];if(t===180)return[-1,0];if(t===270)return[0,-1];const e=t*Math.PI/180;return[Math.cos(e),Math.sin(e)]}function Oe(n,t){const[e,r]=ic(t);return{x:n.x*e-n.y*r,y:n.x*r+n.y*e}}function At(n){return{x:n.width/2,y:n.height/2}}function Xi(n){return n.pixelsPerMeter*n.viewport.zoom}function _t(n,t,e){return{x:n-e.left,y:t-e.top}}function Vi(n,t){return{x:n.x+t.left,y:n.y+t.top}}function Gi(n,t){if(Re(t.rotationDeg)===0)return{x:n.x,y:n.y};const e=At(t.size),r=Oe({x:n.x-e.x,y:n.y-e.y},-t.rotationDeg);return{x:e.x+r.x,y:e.y+r.y}}function oc(n,t){if(Re(t.rotationDeg)===0)return{x:n.x,y:n.y};const e=At(t.size),r=Oe({x:n.x-e.x,y:n.y-e.y},t.rotationDeg);return{x:e.x+r.x,y:e.y+r.y}}function Ki(n,t){const e=Xi(t);return{x:(n.x-t.viewport.x)/e,y:(n.y-t.viewport.y)/e}}function Zi(n,t){const e=Xi(t);return{x:n.x*e+t.viewport.x,y:n.y*e+t.viewport.y}}function sc(n,t,e,r){return Ki(Gi(_t(n,t,e),r),r)}function ac(n,t,e){return Vi(oc(Zi(n,e),e),t)}function cc(n,t,e){const r=Oe(t,-e);return{x:n.x+r.x,y:n.y+r.y}}function _r(n,t,e){const r=e/n.zoom;return{x:t.x-(t.x-n.x)*r,y:t.y-(t.y-n.y)*r,zoom:e}}function he(n){return n>0&&Number.isFinite(n)?qi/n:1}function lc(n){const t=he(n);return{min:Va*t,max:Ga*t}}function an(n,t){const{min:e,max:r}=lc(t),i=Number.isFinite(n)?n:he(t);return Math.min(Math.max(i,e),r)}function hc(n){return he(n)}function uc(n,t){return n/he(t)}function kr(n,t,e){return Number.isFinite(n)?t===1?n*Qa:t===2?n*(e>0?e:800):n:0}function dc(n,t){const e=t?ec:tc,r=Math.max(-e,Math.min(e,n));return Math.exp(-r*(t?rc:nc))}function pc(n,t,e,r,i){const o=he(t),s=Re(r),a=s===90||s===270,c=n.width*t,l=n.height*t,h=a?l:c,u=a?c:l,p=(n.minX+n.width/2)*t,f=(n.minY+n.height/2)*t,d=Math.max(100,e.width-i*2),m=Math.max(100,e.height-i*2),g=Ja/o;let w=Math.min(d/Math.max(h,g),m/Math.max(u,g));return w=Math.min(Math.max(w,Ka*o),Za*o),{x:e.width/2-p*w,y:e.height/2-f*w,zoom:w}}function fc(n){const t=(Math.round(n)%360+360)%360;return t>=338||t<23?"Nord":t<68?"Nord-Est":t<113?"Est":t<158?"Sud-Est":t<203?"Sud":t<248?"Sud-Ouest":t<293?"Ouest":"Nord-Ouest"}const Mr={mouse:3,pen:6,touch:10};function mc(n){return Mr[n]??Mr.touch}function we(n,t,e){return Math.hypot(t.x-n.x,t.y-n.y)>mc(e)}class gc{constructor(){this.pointers=new Map}get size(){return this.pointers.size}set(t,e,r,i){this.pointers.set(t,{x:e,y:r,type:i})}move(t,e,r){const i=this.pointers.get(t);return i?(i.x=e,i.y=r,!0):!1}delete(t){this.pointers.delete(t)}clear(){this.pointers.clear()}pair(){if(this.pointers.size<2)return null;const[t,e]=[...this.pointers.entries()];return{ids:[t[0],e[0]],points:[{x:t[1].x,y:t[1].y},{x:e[1].x,y:e[1].y}],types:[t[1].type,e[1].type]}}get(t){const e=this.pointers.get(t);return e?{x:e.x,y:e.y}:null}}function Sr(n,t){return{x:(n.x+t.x)/2,y:(n.y+t.y)/2}}function Gt(n,t){return Math.hypot(n.x-t.x,n.y-t.y)}function yc(n,t,e,r,i){const o=i*n.zoom,s={x:(t.x-n.x)/o,y:(t.y-n.y)/o},a=an(n.zoom*(Number.isFinite(r)&&r>0?r:1),i),c=i*a;return{x:e.x-s.x*c,y:e.y-s.y*c,zoom:a}}const Le={wall:"wallIds",opening:"openingIds",room:"roomIds",binding:"bindingIds",furniture:"furnitureIds"},$n=["wallIds","openingIds","roomIds","bindingIds","furnitureIds"];function st(){return{wallIds:[],openingIds:[],roomIds:[],bindingIds:[],furnitureIds:[]}}function nt(n,t){return n[t]??[]}function Ye(n,t){return nt(n,Le[t.kind]).includes(t.id)}function dt(n){const t=st();return t[Le[n.kind]]=[n.id],t}function Be(n,t){const e=Le[t.kind];return nt(n,e).includes(t.id)?n:{...st(),...n,[e]:[...nt(n,e),t.id]}}function qe(n,t){const e=Le[t.kind];return nt(n,e).includes(t.id)?{...st(),...n,[e]:nt(n,e).filter(r=>r!==t.id)}:n}function Xe(n){return $n.reduce((t,e)=>t+nt(n,e).length,0)}function bc(n,t){return $n.every(e=>{const r=nt(n,e),i=nt(t,e);return r.length===i.length&&r.every((o,s)=>o===i[s])})}function xc(n,t){const e={wallIds:new Set(t.walls.map(o=>o.id)),openingIds:new Set(t.openings.map(o=>o.id)),roomIds:new Set(t.rooms.map(o=>o.id)),bindingIds:new Set(t.bindings.map(o=>o.id)),furnitureIds:new Set((t.furniture??[]).map(o=>o.id))};let r=!1;const i=st();for(const o of $n){const s=nt(n,o).filter(a=>e[o].has(a));s.length!==nt(n,o).length&&(r=!0),i[o]=s}return r?i:n}const vc=.01,wc=.02,Ji=.05,$c=.1,Pr=.001,_c=/^[a-z0-9_]+\.[a-z0-9_]+$/;function Pt(n){return A.roundPoint(n)}function Ct(n,t,e=1e-9){return Math.abs(n.x-t.x)<=e&&Math.abs(n.y-t.y)<=e}function ae(n){const t=n.rooms,e=o=>{let s=!1;const a=o.map(c=>{const l=q.findRoomContainingPoint(c.position,t)?.id;if(l===c.roomId)return c;s=!0;const h={...c};return l?h.roomId=l:delete h.roomId,h});return s?a:o},r=e(n.bindings),i=n.furniture?e(n.furniture):n.furniture;return r===n.bindings&&i===n.furniture?n:{...n,bindings:r,furniture:i}}function Er(n){return n.wallIds.length+n.roomIds.length+n.furnitureIds.length+n.bindingIds.length===0}function kc(n,t){return!n.polygon||n.polygon.length<3?[]:t.filter(e=>{const r={x:(e.start.x+e.end.x)/2,y:(e.start.y+e.end.y)/2};return[e.start,e.end,r].every(i=>q.distanceToBoundary(i,n.polygon)<=wc)}).map(e=>e.id)}function Tr(n,t){const e=n.rooms.filter(c=>t.roomIds.includes(c.id)),r=new Set(e.map(c=>c.id)),i=new Set(t.wallIds.filter(c=>n.walls.some(l=>l.id===c)));for(const c of e)for(const l of kc(c,n.walls))i.add(l);const o=c=>c!==void 0&&r.has(c),s=new Set(t.furnitureIds??[]),a=new Set(t.bindingIds);return{wallIds:[...i],roomIds:[...r],furnitureIds:(n.furniture??[]).filter(c=>s.has(c.id)||o(c.roomId)).map(c=>c.id),bindingIds:n.bindings.filter(c=>a.has(c.id)||o(c.roomId)).map(c=>c.id)}}function Qi(n,t){return t.find(e=>Math.hypot(n.x-e.from.x,n.y-e.from.y)<=vc)}function Ve(n,t){const e=Qi(n,t);if(!e)return null;const r=Pt({x:n.x+(e.to.x-e.from.x),y:n.y+(e.to.y-e.from.y)});return Ct(r,n)?null:r}function Mc(n,t,e,r){let i=!1;const o=n.map(s=>{const a=t.get(s.wallId),c=e.get(s.wallId);if(!a||!c)return s;const l={x:c.start.x-a.start.x,y:c.start.y-a.start.y},h={x:c.end.x-a.end.x,y:c.end.y-a.end.y};if(Ct(l,h))return s;const u=A.wallLength(a),p=A.wallLength(c),f=!Ct(l,{x:0,y:0}),d=!Ct(h,{x:0,y:0});let m=s.offset;f&&!d?m=p-(u-s.offset):f&&d&&(m=u>0?s.offset*p/u:p/2);const g=A.fitOpening(c,m,s.width,{walls:r}),w=g.fits?g.offset:Math.min(Math.max(m,0),p),y=g.fits?g.width:s.width;return Math.abs(w-s.offset)<1e-9&&Math.abs(y-s.width)<1e-9?s:(i=!0,{...s,offset:w,width:y})});return i?o:n}function to(n,t,e){const r=new Map,i=new Map,o=n.walls.map(c=>{const l=Ve(c.start,t),h=Ve(c.end,t);if(!l&&!h)return c;const u={...c,start:l??c.start,end:h??c.end};return r.set(c.id,c),i.set(c.id,u),u});for(const c of i.values())if(A.wallLength(c)<Ji)return null;let s=!1;const a=n.rooms.map(c=>{if(e&&e.roomIds.has(c.id))return e.delta.x===0&&e.delta.y===0?c:(s=!0,{...c,polygon:c.polygon.map(u=>Pt({x:u.x+e.delta.x,y:u.y+e.delta.y}))});let l=!1;const h=c.polygon.map(u=>{const p=Ve(u,t);return p?(l=!0,p):u});return l?(s=!0,{...c,polygon:h,areaM2:q.computeArea(h)}):c});return i.size===0&&!s?n:{...n,walls:i.size>0?o:n.walls,rooms:s?a:n.rooms,openings:i.size>0?Mc(n.openings,r,i,o):n.openings}}function Ar(n,t,e){if(e.x===0&&e.y===0)return n;const r=new Set(t.wallIds),i=[];for(const u of n.walls)if(r.has(u.id))for(const p of[u.start,u.end])Qi(p,i)||i.push({from:p,to:{x:p.x+e.x,y:p.y+e.y}});const o=to(n,i,{roomIds:new Set(t.roomIds),delta:e});if(!o)return null;const s=u=>Pt({x:u.x+e.x,y:u.y+e.y}),a=new Set(t.furnitureIds),c=new Set(t.bindingIds),l=o.furniture&&a.size>0?o.furniture.map(u=>a.has(u.id)?{...u,position:s(u.position)}:u):o.furniture,h=c.size>0?o.bindings.map(u=>c.has(u.id)?{...u,position:s(u.position)}:u):o.bindings;return l===o.furniture&&h===o.bindings?ae(o):ae({...o,furniture:l,bindings:h})}function Sc(n,t,e,r){const i=n.walls.find(s=>s.id===t);if(!i)return null;const o=to(n,[{from:i[e],to:r}]);return o?ae(o):null}function Pc(n,t,e,r){const i=n.rooms.find(a=>a.id===t);if(!i||e<0||e>=i.polygon.length)return null;const o=i.polygon.map((a,c)=>c===e?Pt(r):a);if(no(o)!==null)return null;const s=n.rooms.map(a=>a.id===t?{...a,polygon:o,areaM2:q.computeArea(o)}:a);return ae({...n,rooms:s})}function Dr(n,t){const e=n.end.x-n.start.x,r=n.end.y-n.start.y,i=Math.hypot(e,r);return i===0?0:((t.x-n.start.x)*e+(t.y-n.start.y)*r)/i}function Ec(n,t,e){const r=n.openings.find(s=>s.id===t),i=r?n.walls.find(s=>s.id===r.wallId):void 0;if(!r||!i)return null;const o=A.fitOpening(i,e,r.width,{walls:n.walls,openings:n.openings,ignoreOpeningId:r.id});return!o.fits||o.overlaps.length>0?null:o.offset===r.offset&&o.width===r.width?n:{...n,openings:n.openings.map(s=>s.id===r.id?{...s,offset:o.offset,width:o.width}:s)}}function eo(n){const t=[];for(const e of n){const r=t[t.length-1];(!r||!Ct(r,e,Pr))&&t.push({x:e.x,y:e.y})}for(;t.length>1&&Ct(t[0],t[t.length-1],Pr);)t.pop();return t}function no(n){const t=eo(n);return t.length<3?"too-few":q.isSelfIntersecting(t)?"self-intersecting":q.computeArea(t)<$c?"too-small":null}function Tc(n){const t=new Set(n.map(r=>r.name));let e=n.length+1;for(;t.has(`Pièce ${e}`);)e++;return`Pièce ${e}`}function Ir(n,t){const e=eo(n).map(Pt);return{id:Ft("room"),name:Tc(t),polygon:e,areaM2:q.computeArea(e)}}function Cr(n,t){const e=Math.min(n.x,t.x),r=Math.max(n.x,t.x),i=Math.min(n.y,t.y),o=Math.max(n.y,t.y);return[{x:e,y:i},{x:r,y:i},{x:r,y:o},{x:e,y:o}]}function Ac(n){return typeof n=="string"&&_c.test(n)}function Dc(n){if(!n||typeof n!="object"||Array.isArray(n))return null;const t=n;return t.kind==="furniture"?typeof t.furnitureType=="string"&&Z(t.furnitureType)?{kind:"furniture",furnitureType:t.furnitureType}:null:t.kind==="entity"&&Ac(t.entityId)?{kind:"entity",entityId:t.entityId,domain:Yt(t.entityId)}:null}function Ic(n,t,e){const r=Pt(t),i={id:Ft("bind"),entityId:n,position:r},o=q.findRoomContainingPoint(r,e);return o&&(i.roomId=o.id),i}function Cc(n,t,e){const r=Z(n);if(!r)return null;const i=Pt(t),o={id:Ft("furn"),type:r.type,name:r.name,category:r.category,position:i,width:r.width,length:r.length,rotation:0,icon:r.icon};r.defaultColor&&(o.color=r.defaultColor);const s=q.findRoomContainingPoint(i,e);return s&&(o.roomId=s.id),o}function Rc(n){return{point:A.roundPoint(n),snappedTo:"none",constraints:[]}}function ge(n,t,e,r,i,o,s={}){return o?Rc(n):A.snapPoint(n,t,e,r,{...s,screenPixelsPerMeter:i})}function Rr(n,t,e,r){if(r)return{point:{...n},snappedTo:"none",constraints:[]};const i=A.metersFromPixels(ee.vertex,e);let o=null,s=i;for(const c of t)for(const l of[c.start,c.end]){const h=A.distance(n,l);h<=s&&(s=h,o=l)}if(o)return{point:{x:o.x,y:o.y},snappedTo:"vertex",constraints:["vertex"]};const a=ro(n,t,e);return a?{point:a.projectionPoint,snappedTo:"wall",constraints:["wall"],wallId:a.wall.id}:{point:{...n},snappedTo:"none",constraints:[]}}function ro(n,t,e){return A.snapPointToWall(n,t,A.metersFromPixels(ee.wall,e),{measureFromFace:!0})}function pt(n){let t=null,e;return(...r)=>(t!==null&&t.length===r.length&&t.every((i,o)=>Object.is(i,r[o]))||(e=n(...r),t=r),e)}const Oc="Entité introuvable",Lc="…",Nc="⚠️",Or="⚡",Lr={light:"💡",switch:"🔌",input_boolean:"🔘",binary_sensor:"🚨",sensor:"📊",climate:"🌡️",water_heater:"♨️",humidifier:"💧",camera:"📷",media_player:"📺",remote:"🎛️",cover:"🪟",valve:"🚰",fan:"💨",lock:"🔒",alarm_control_panel:"🛡️",siren:"📢",scene:"🎬",script:"📜",automation:"🤖",button:"🔘",input_button:"🔘",person:"👤",device_tracker:"📍",vacuum:"🧹"},jc={"binary_sensor.motion":"🏃","binary_sensor.occupancy":"🏃","binary_sensor.presence":"🏃","binary_sensor.door":"🚪","binary_sensor.garage_door":"🚪","binary_sensor.window":"🪟","binary_sensor.smoke":"🔥","binary_sensor.gas":"🔥","binary_sensor.carbon_monoxide":"🔥","binary_sensor.moisture":"💧","sensor.temperature":"🌡️","sensor.humidity":"💧","sensor.power":"⚡","sensor.energy":"⚡","cover.garage":"🚪","cover.gate":"🚧","cover.door":"🚪"},Fc={motion:{on:"Mouvement",off:"Au repos",alertWhen:"on"},occupancy:{on:"Occupé",off:"Libre",alertWhen:"on"},presence:{on:"Présent",off:"Absent",alertWhen:"on"},door:{on:"Ouvert",off:"Fermé",alertWhen:"on"},window:{on:"Ouvert",off:"Fermé",alertWhen:"on"},garage_door:{on:"Ouvert",off:"Fermé",alertWhen:"on"},opening:{on:"Ouvert",off:"Fermé",alertWhen:"on"},lock:{on:"Déverrouillé",off:"Verrouillé",alertWhen:"on"},smoke:{on:"Fumée !",off:"Normal",alertWhen:"on"},gas:{on:"Gaz !",off:"Normal",alertWhen:"on"},carbon_monoxide:{on:"CO !",off:"Normal",alertWhen:"on"},moisture:{on:"Fuite !",off:"Sec",alertWhen:"on"},safety:{on:"Danger",off:"Sûr",alertWhen:"on"},problem:{on:"Problème",off:"OK",alertWhen:"on"},tamper:{on:"Sabotage",off:"OK",alertWhen:"on"},heat:{on:"Chaud",off:"Normal",alertWhen:"on"},cold:{on:"Froid",off:"Normal",alertWhen:"on"},battery:{on:"Batterie faible",off:"Normale",alertWhen:"on"},sound:{on:"Son détecté",off:"Calme",alertWhen:"on"},vibration:{on:"Vibration",off:"Calme",alertWhen:"on"},connectivity:{on:"Connecté",off:"Déconnecté",alertWhen:"off",calm:"on"},power:{on:"Alimenté",off:"Coupé"},plug:{on:"Branché",off:"Débranché"},running:{on:"En marche",off:"Arrêté"},light:{on:"Lumière",off:"Sombre"},battery_charging:{on:"En charge",off:"Pas en charge"},moving:{on:"En mouvement",off:"Immobile"},update:{on:"Mise à jour",off:"À jour"}},zc={on:"Actif",off:"Inactif"},Wc=new Set(["motion","occupancy","presence"]),Hc={off:"Arrêt",heat:"Chauffage",cool:"Climatisation",heat_cool:"Auto",auto:"Auto",dry:"Déshumidification",fan_only:"Ventilation"},Uc=new Set(["heating","cooling","drying","fan","preheating","defrosting"]),Nr=new Set(["scene","button","input_button"]),Yc=new Set(["°C","°F"]);function St(n,t){return n.attributes?.[t]}function zt(n,t){const e=St(n,t);return typeof e=="string"?e:""}function bt(n){if(typeof n=="number")return Number.isFinite(n)?n:null;if(typeof n=="string"&&n.trim()!==""){const t=Number(n);return Number.isFinite(t)?t:null}return null}const jr=new Map;function Bc(n){switch(n?.locale?.number_format){case"comma_decimal":return"en-US";case"decimal_comma":return"de";case"space_comma":return"fr";case"system":return;default:return n?.locale?.language||n?.language||void 0}}function _n(n,t,e=1){const r=Bc(t),i=t?.locale?.number_format!=="none",o=`${r??""}|${e}|${i}`;let s=jr.get(o);if(!s){const a={maximumFractionDigits:e,useGrouping:i};try{s=new Intl.NumberFormat(r,a)}catch{s=new Intl.NumberFormat(void 0,a)}jr.set(o,s)}return s.format(n)}function Fr(n,t){if(typeof t.formatEntityState!="function")return null;try{const e=t.formatEntityState(n);return typeof e=="string"&&e!==""?e:null}catch{return null}}function qc(n,t,e){return n.icon?n.icon:e?t==="lock"&&e.state!=="locked"?"🔓":jc[`${t}.${zt(e,"device_class")}`]??Lr[t]??Or:Lr[t]??Or}function zr(n){const t=n?.config?.unit_system?.temperature;return typeof t=="string"&&t!==""?t:"°C"}function Wr(n,t){return t==="°F"?(n-32)*5/9:t==="K"?n-273.15:n}function kn(n,t){const e=t?.states?.[n];if(!e)return null;const r=Yt(n);if(r==="climate"){const a=bt(St(e,"current_temperature"));if(a===null)return null;const c=zr(t);return{entityId:n,value:a,unit:c,celsius:Wr(a,c)}}if(r!=="sensor")return null;const i=zt(e,"unit_of_measurement");if(zt(e,"device_class")!=="temperature"&&!Yc.has(i))return null;const o=bt(e.state);if(o===null)return null;const s=i||zr(t);return{entityId:n,value:o,unit:s,celsius:Wr(o,s)}}function Mn(n,t){return`${_n(n.value,t)} ${n.unit}`}function Xc(n,t,e){for(const r of t){if(r.roomId!==n)continue;const i=kn(r.entityId,e);if(i)return i}return null}function Vc(n){return n<18?"rgba(59, 130, 246, 0.38)":n<20?"rgba(14, 165, 233, 0.32)":n<22?"rgba(16, 185, 129, 0.30)":n<24?"rgba(245, 158, 11, 0.34)":"rgba(239, 68, 68, 0.40)"}function Gc(n,t,e){for(const r of t){if(r.roomId!==n||Yt(r.entityId)!=="light")continue;const i=e?.states?.[r.entityId];if(!i||i.state!=="on")continue;const o=St(i,"rgb_color"),[s,a,c]=Array.isArray(o)&&o.length>=3&&o.slice(0,3).every(u=>bt(u)!==null)?o.slice(0,3).map(u=>Math.min(255,Math.max(0,Math.round(Number(u))))):[255,240,180],l=bt(St(i,"brightness"))??255,h=.12+Math.min(255,Math.max(0,l))/255*.22;return`rgba(${s}, ${a}, ${c}, ${h.toFixed(2)})`}return null}function Kc(n,t,e,r){const i=r?Xc(n.id,t,e):null;if(i)return{fill:Vc(i.celsius),illuminated:!1,temperature:i};const o=Gc(n.id,t,e);return{fill:o,illuminated:o!==null,temperature:null}}function io(n){const t=zt(n,"device_class"),e=Fc[t]??zc,r=n.state==="on",i=r?e.on:e.off;let o;return e.alertWhen?o=(r?"on":"off")===e.alertWhen?"alert":e.calm??"info":o=r?"on":"off",{text:i,status:o,radar:r&&Wc.has(t)}}function Zc(n,t){const e=bt(St(n,"current_position")),r=e!==null?`${_n(e,t,0)} %`:null;switch(n.state){case"open":return{text:"Ouvert",status:"on",badge:r};case"closed":return{text:"Fermé",status:"off",badge:r};case"opening":return{text:"Ouverture…",status:"info",badge:r};case"closing":return{text:"Fermeture…",status:"info",badge:r};default:return{text:n.state,status:"info",badge:r}}}function Jc(n){switch(n){case"locked":return{text:"Verrouillé",status:"info"};case"unlocked":return{text:"Déverrouillé",status:"alert"};case"jammed":return{text:"Bloqué",status:"alert"};case"open":return{text:"Ouvert",status:"alert"};case"opening":return{text:"Ouverture…",status:"info"};case"locking":return{text:"Verrouillage…",status:"info"};case"unlocking":return{text:"Déverrouillage…",status:"info"};default:return{text:n,status:"info"}}}function Qc(n){return n==="disarmed"?{text:"Désarmée",status:"off"}:n==="triggered"?{text:"Déclenchée !",status:"alert"}:n.startsWith("armed")?{text:"Armée",status:"info"}:n==="arming"?{text:"Activation…",status:"info"}:n==="pending"?{text:"En attente",status:"info"}:n==="disarming"?{text:"Désactivation…",status:"info"}:{text:n,status:"info"}}function tl(n){switch(n){case"playing":return{text:"Lecture",status:"on"};case"paused":return{text:"Pause",status:"info"};case"buffering":return{text:"Chargement…",status:"info"};case"on":return{text:"Allumé",status:"info"};case"idle":return{text:"Inactif",status:"info"};case"standby":return{text:"Veille",status:"off"};case"off":return{text:"Éteint",status:"off"};default:return{text:n,status:"info"}}}function el(n,t,e){const r=zt(n,"hvac_action"),i=n.state==="off"?"off":Uc.has(r)?"on":"info",o=kn(t,e),s=Hc[n.state]??n.state,a=o?Mn(o,e):null;return{text:a?`${s} · ${a}`:s,status:i,badge:a}}function nl(n,t,e){const r=zt(n,"unit_of_measurement"),i=bt(n.state),o=i!==null?`${_n(i,e)}${r?` ${r}`:""}`:n.state,s=kn(t,e);return{text:o,status:"info",badge:s?Mn(s,e):null}}function rl(n,t,e,r){const i=t.state==="on";switch(n){case"light":{if(!i)return{text:"Éteint",status:"off"};const o=bt(St(t,"brightness"));return{text:o!==null?`Allumé (${Math.round(o/255*100)} %)`:"Allumé",status:"on"}}case"switch":case"input_boolean":case"automation":case"siren":case"humidifier":case"remote":return i?{text:"Allumé",status:"on"}:{text:"Éteint",status:"off"};case"fan":return i?{text:"En marche",status:"on"}:{text:"Arrêté",status:"off"};case"cover":case"valve":return Zc(t,r);case"lock":return Jc(t.state);case"alarm_control_panel":return Qc(t.state);case"media_player":return tl(t.state);case"climate":return el(t,e,r);case"sensor":return nl(t,e,r);case"binary_sensor":return io(t);case"person":case"device_tracker":return t.state==="home"?{text:"Présent",status:"on"}:t.state==="not_home"?{text:"Absent",status:"off"}:{text:t.state,status:"info"};case"script":return i?{text:"En cours",status:"on"}:{text:"Prêt",status:"info"};case"scene":case"button":case"input_button":return{text:"Prêt",status:"info"};case"vacuum":return t.state==="cleaning"?{text:"Nettoyage",status:"on"}:t.state==="docked"?{text:"À la base",status:"off"}:t.state==="error"?{text:"Erreur",status:"alert"}:{text:t.state,status:"info"};default:return i?{text:"Actif",status:"on"}:t.state==="off"?{text:"Inactif",status:"off"}:{text:t.state,status:"info"}}}function il(n,t){const e=Yt(n.entityId),r=t?.states?.[n.entityId],i={name:Yi(n,t?.states),stateText:Lc,status:"off",icon:qc(n,e,r),orphan:!1,unavailable:!1,radar:!1,lightOn:!1,fanOn:!1,playing:!1,badge:null};if(!t?.states)return i;if(!r)return{...i,stateText:Oc,status:"missing",orphan:!0,icon:n.icon||Nc};if(r.state==="unavailable"||r.state==="unknown"&&!Nr.has(e))return{...i,stateText:Fr(r,t)??(r.state==="unavailable"?"Indisponible":"Inconnu"),status:"off",unavailable:!0};const o=rl(e,r,n.entityId,t);let s=(Nr.has(e)?null:Fr(r,t))??o.text;if(e==="light"&&r.state==="on"&&s!==o.text){const a=bt(St(r,"brightness"));a!==null&&(s=`${s} (${Math.round(a/255*100)} %)`)}else e==="climate"&&o.badge&&s!==o.text&&(s=`${s} · ${o.badge}`);return{...i,stateText:s,status:o.status,radar:e==="binary_sensor"&&io(r).radar,lightOn:e==="light"&&r.state==="on",fanOn:e==="fan"&&r.state==="on",playing:e==="media_player"&&r.state==="playing",badge:o.badge??null}}function ol(n,t=[]){const e=[...n.map(r=>r.entityId),...t.map(r=>r.entityId)];return[...new Set(e.filter(r=>typeof r=="string"))]}function Hr(n,t,e){if(!n||!t)return n!==t;if(n.language!==t.language||n.locale?.language!==t.locale?.language||n.locale?.number_format!==t.locale?.number_format||n.config?.unit_system?.temperature!==t.config?.unit_system?.temperature||n.themes?.darkMode!==t.themes?.darkMode||n.entities!==t.entities||n.formatEntityState!==t.formatEntityState)return!0;const r=n.states,i=t.states;return r===i?!1:!r||!i?!0:e.some(o=>r[o]!==i[o])}const sl=500,al=250,cl=/^(?:\/(?!\/)|#)[^\s\x00-\x1f\x7f\\]*$/;function ll(n){return typeof n=="string"&&cl.test(n)}function hl(n,t){return t==="double_tap"?"more-info":t==="hold"?n.holdAction??"more-info":n.tapAction??ba(n.entityId)}function oo(n,t){const e=hl(n,t),r={kind:"more-info",entityId:n.entityId};switch(e){case"none":return{kind:"none"};case"navigate":return ll(n.navigationPath)?{kind:"navigate",path:n.navigationPath}:r;case"toggle":{const i=xa(n.entityId);return i?{kind:"service",domain:i.domain,service:i.service,entityId:n.entityId}:r}default:return r}}function ul(n){return n&&typeof n=="object"&&"message"in n&&typeof n.message=="string"?n.message:typeof n=="string"?n:""}function Ur(n,t,e){const r=oo(n,t);switch(r.kind){case"more-info":e.host.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:r.entityId},bubbles:!0,composed:!0}));break;case"service":{const i=e.hass?.callService;if(typeof i!="function"){e.onError("Home Assistant est indisponible.");break}const o=s=>{console.error(`[home-architect] ${r.domain}.${r.service} (${r.entityId}) a échoué :`,s);const a=ul(s);e.onError(`Action impossible sur ${r.entityId}${a?` : ${a}`:"."}`)};try{Promise.resolve(i.call(e.hass,r.domain,r.service,{entity_id:r.entityId})).catch(o)}catch(s){o(s)}break}case"navigate":history.pushState(null,"",r.path),window.dispatchEvent(new CustomEvent("location-changed",{detail:{replace:!1}}));break}return r}class dl{constructor(t,e=sl,r=al){this.handlers=t,this.holdMs=e,this.doubleTapMs=r,this.press=null,this.swallowClick=!1,this.pendingTap=null,this.lastImmediate=null}down(t,e,r,i){this.clearPress(),this.swallowClick=!1;const o={id:t,start:{x:e,y:r},pointerType:i,timer:null};o.timer=setTimeout(()=>{o.timer=null,this.swallowClick=!0,this.handlers.onHold(t)},this.holdMs),this.press=o}move(t,e){const r=this.press;!r||!we(r.start,{x:t,y:e},r.pointerType)||(this.clearPress(),this.swallowClick=!0)}up(){this.clearPress()}cancel(){this.clearPress(),this.clearPendingTap(),this.swallowClick=!1}click(t){if(this.swallowClick){this.swallowClick=!1;return}const e=this.pendingTap;if(e&&e.id===t){this.clearPendingTap(),this.handlers.onDoubleTap(t);return}e&&(this.clearPendingTap(),this.handlers.onTap(e.id));const r=Date.now();if(this.lastImmediate&&this.lastImmediate.id===t&&r-this.lastImmediate.at<=this.doubleTapMs){this.lastImmediate=null;return}if(this.handlers.waitsForDoubleTap(t)){const i=setTimeout(()=>{this.pendingTap=null,this.handlers.onTap(t)},this.doubleTapMs);this.pendingTap={id:t,timer:i},this.lastImmediate=null}else this.lastImmediate={id:t,at:r},this.handlers.onTap(t)}dispose(){this.clearPress(),this.clearPendingTap(),this.swallowClick=!1,this.lastImmediate=null}clearPress(){this.press?.timer&&clearTimeout(this.press.timer),this.press=null}clearPendingTap(){this.pendingTap&&clearTimeout(this.pendingTap.timer),this.pendingTap=null}}const Yr=.08,Et=.06,pl=1.25;function fl(n){return n.sashCount?n.sashCount===2?2:1:n.width>=pl?2:1}function ml(n,t,e){const r=Math.max(0,n.width),i=r/2,o=Math.max(0,t),s=o/2,a=[{kind:"rect",role:"cutout",x:-i,y:-s-e,w:r,h:o+e*2}],c={kind:"rect",role:"frame",x:-i,y:-s,w:r,h:o},l=()=>{const p=Math.min(Yr,r/4);return[{kind:"rect",role:"jamb",x:-i,y:-s,w:p,h:o},{kind:"rect",role:"jamb",x:i-p,y:-s,w:p,h:o}]},h=n.flipSide?-1:1,u=(p,f,d)=>[{kind:"line",role:"leaf",x1:p,y1:0,x2:p,y2:h*d},{kind:"arc",role:"swing",x1:p+f*d,y1:0,x2:p,y2:h*d,r:d,sweep:f*h>0?1:0}];switch(n.type){case"door":{const p=n.flipDirection?i:-i;a.push(...l(),...u(p,n.flipDirection?-1:1,r));break}case"double_door":a.push(...l(),...u(-i,1,i),...u(i,-1,i));break;case"sliding_door":{const p=r*.55;a.push(c,{kind:"rect",role:"panel",x:-i,y:-o/4-Et/2,w:p,h:Et},{kind:"rect",role:"panel",x:i-p,y:o/4-Et/2,w:p,h:Et});break}case"french_window":a.push(c,{kind:"rect",role:"panel",x:-i,y:-o/4,w:i,h:Et},{kind:"rect",role:"panel",x:0,y:o/4,w:i,h:Et});break;default:{const p=Math.min(Yr,r/4);a.push(c,{kind:"line",role:"glass",x1:-i,y1:0,x2:i,y2:0}),fl(n)===2?a.push({kind:"line",role:"mullion",x1:0,y1:-s,x2:0,y2:s},{kind:"line",role:"sash",x1:-i+p,y1:-o/4,x2:-p/2,y2:-o/4},{kind:"line",role:"sash",x1:p/2,y1:o/4,x2:i-p,y2:o/4}):a.push({kind:"line",role:"sash",x1:-i+p,y1:-o/4,x2:i-p,y2:-o/4},{kind:"line",role:"sash",x1:-i+p,y1:o/4,x2:i-p,y2:o/4});break}}return a}function gl(n,t){const e=i=>Math.min(i,Math.max(0,t-.05)),r=typeof n.height=="number"&&n.height>0?n.height:void 0;switch(n.type){case"window":{const i=Math.min(.9,t*.4);return[i,e(i+(r??1.25))]}case"french_window":return[0,e(r??2.15)];default:return[0,e(r??2.04)]}}const yl=.001;function Br(n){const t=n.yawDeg*Math.PI/180,e=n.pitchDeg*Math.PI/180;return{cosYaw:Math.cos(t),sinYaw:Math.sin(t),cosPitch:Math.max(yl,Math.cos(e)),sinPitch:Math.sin(e)}}function so(n,t,e){const r=n.x-e.x,i=n.y-e.y;return{x:r*t.cosYaw-i*t.sinYaw,y:r*t.sinYaw+i*t.cosYaw}}function it(n,t,e,r){const i=so(n,e,r);return{x:r.x+i.x,y:r.y+i.y*e.cosPitch-t*e.sinPitch}}function qr(n,t,e,r){return so(n,e,r).y*e.sinPitch+t*e.cosPitch}function bl(n,t){const e=n.cosYaw,r=n.sinYaw*n.cosPitch,i=-n.sinYaw,o=n.cosYaw*n.cosPitch;return[e,r,i,o,t.x-(e*t.x+i*t.y),t.y-(r*t.x+o*t.y)]}function ao(n,t){const e=n.x,r=n.y/t.cosPitch;return{x:e*t.cosYaw+r*t.sinYaw,y:-e*t.sinYaw+r*t.cosYaw}}function xl(n,t,e){const r=ao({x:n.x-e.x,y:n.y-e.y},t);return{x:e.x+r.x,y:e.y+r.y}}function vl(n){return{x:n.sinYaw,y:n.cosYaw}}function wl(n,t){let e=(t-n)%360;return e>180&&(e-=360),e<=-180&&(e+=360),e}const co=2.5,$l=.35,Xr=.002,_l=.02,kl=.01,Vr={x:-.55,y:.835};function Ml(n,t,e){const r=e&&e>0?e:co,i=t.filter(s=>s.polygon&&s.polygon.length>=3),o=new Map;for(const s of n){const a={x:(s.start.x+s.end.x)/2,y:(s.start.y+s.end.y)/2},c=s.thickness/2+$l,l=i.filter(h=>q.isPointInPolygon(a,h.polygon)||q.distanceToBoundary(a,h.polygon)<=c);o.set(s.id,l.length>0?Math.max(...l.map(h=>h.height||r),s.height||0):s.height||r)}return o}function Gr(n,t,e){return Math.abs(n.x-t.x)<=e&&Math.abs(n.y-t.y)<=e}function Sl(n){let t=0;for(let e=0;e<n.length;e++){const r=n[e],i=n[(e+1)%n.length];t+=r.x*i.y-i.x*r.y}return t/2}function Kr(n,t,e){return(e.x-n.start.x)*t.x+(e.y-n.start.y)*t.y}function Pl(n){const{basis:t,center:e,toView:r,scale:i,heightScale:o}=n,s=vl(t),a=new Map;for(const h of n.openings){const u=a.get(h.wallId);u?u.push(h):a.set(h.wallId,[h])}const c=[],l=[];for(const h of n.walls){const u=n.polygons.get(h.id);if(!u||u.length<3)continue;const p=Math.hypot(h.end.x-h.start.x,h.end.y-h.start.y);if(!(p>0))continue;const f={x:(h.end.x-h.start.x)/p,y:(h.end.y-h.start.y)/p},d=n.heights.get(h.id)??co,m=d*o*i,g=Sl(u)<0?[...u].reverse():u,w=g.map(r),y=w.map(b=>it(b,0,t,e)),x=w.map(b=>it(b,m,t,e)),E=a.get(h.id)??[];for(let b=0;b<g.length;b++){const k=(b+1)%g.length,P=g[b],z=g[k];if([P,z].some(vt=>Gr(vt,h.start,Xr)||Gr(vt,h.end,Xr)))continue;const B=z.x-P.x,Y=z.y-P.y,O=Math.hypot(B,Y);if(O<1e-6)continue;const G={x:Y/O,y:-B/O};if(G.x*s.x+G.y*s.y<=0)continue;const ue=G.x*t.cosYaw-G.y*t.sinYaw,xo=G.x*t.sinYaw+G.y*t.cosYaw,vo=Math.max(-1,Math.min(1,ue*Vr.x+xo*Vr.y)),wo=r({x:(P.x+z.x)/2,y:(P.y+z.y)/2}),Pn=[];if(E.length>0&&Math.abs(B/O*f.y-Y/O*f.x)<_l){const vt=Kr(h,f,P),je=Kr(h,f,z),En=rt=>{const Bt=(rt-vt)/(je-vt);return r({x:P.x+B*Bt,y:P.y+Y*Bt})};for(const rt of E){const Bt=Math.max(rt.offset-rt.width/2,Math.min(vt,je)),Tn=Math.min(rt.offset+rt.width/2,Math.max(vt,je));if(Tn-Bt<kl)continue;const[$o,_o]=gl(rt,d),An=En(Bt),Dn=En(Tn),In=$o*o*i,Cn=_o*o*i;Pn.push({openingId:rt.id,type:rt.type,points:[it(An,In,t,e),it(Dn,In,t,e),it(Dn,Cn,t,e),it(An,Cn,t,e)]})}}c.push({kind:"face",wallId:h.id,points:[y[b],y[k],x[k],x[b]],depth:qr(wo,m/2,t,e),shade:vo,panels:Pn})}const _=g.reduce((b,k)=>({x:b.x+k.x/g.length,y:b.y+k.y/g.length}),{x:0,y:0});l.push({kind:"cap",wallId:h.id,points:x,depth:qr(r(_),m,t,e)})}return c.sort((h,u)=>h.depth-u.depth),l.sort((h,u)=>h.depth-u.depth),[...c,...l]}const El="Vue 3D simplifiée : WebGL est indisponible sur cet appareil.",Tl="Vue 3D simplifiée : le moteur 3D n'a pas pu être chargé.";let Kt=null,lo=!1,Dt=null;function Al(){try{const n=document.createElement("canvas"),t=n.getContext("webgl2")??n.getContext("webgl");return t?(t.getExtension("WEBGL_lose_context")?.loseContext(),!0):!1}catch{return!1}}function Dl(){return lo&&Dt===null}function Il(n){Dt=n}function Cl(){return Dt!==null?Promise.reject(new Error(Dt)):Kt||(Al()?(Kt=So(()=>import("./view3d-element-dWSCynJr.js"),[],import.meta.url).then(()=>{lo=!0},n=>{throw console.warn("[home-architect] Chargement de la vue 3D impossible :",n),Kt=null,new Error(Tl)}),Kt):(Dt=El,Promise.reject(new Error(Dt))))}function Rl(n){try{const t=localStorage.getItem(n);if(!t)return null;const e=JSON.parse(t);if(typeof e=="object"&&e!==null&&"x"in e&&"y"in e&&typeof e.x=="number"&&typeof e.y=="number"&&Number.isFinite(e.x)&&Number.isFinite(e.y))return{x:e.x,y:e.y}}catch{}return null}function Ge(n,t){try{t?localStorage.setItem(n,JSON.stringify(t)):localStorage.removeItem(n)}catch{}}class ye{constructor(t,e,r){this.isDragging=!1,this.hasMoved=!1,this.position=null,this.startPointer={x:0,y:0},this.startPos={x:0,y:0},this.capturedTarget=null,this.handlePointerDown=i=>{if(i.button!==0)return;const o=i.target;if(o){const u=o.closest("button, input, select, textarea, a, .hud-btn, .hud-opt-btn, .hud-preset-btn, .icon-picker-btn");if(u&&!u.classList.contains("hud-drag-handle"))return}const s=this.getTarget(),a=this.getContainer();if(!s||!a)return;i.preventDefault(),i.stopPropagation();const c=s.getBoundingClientRect(),l=a.getBoundingClientRect();this.startPos={x:c.left-l.left,y:c.top-l.top},this.startPointer={x:i.clientX,y:i.clientY},this.isDragging=!0,this.hasMoved=!1;const h=i.currentTarget||s;this.capturedTarget=h;try{h.setPointerCapture(i.pointerId)}catch{}},this.handlePointerMove=i=>{if(!this.isDragging)return;i.preventDefault(),i.stopPropagation();const o=this.getTarget(),s=this.getContainer();if(!o||!s)return;const a=i.clientX-this.startPointer.x,c=i.clientY-this.startPointer.y;Math.hypot(a,c)>4&&(this.hasMoved=!0);const l=s.getBoundingClientRect(),h=o.getBoundingClientRect(),u=this.startPos.x+a,p=this.startPos.y+c,f=this.margin,d=Math.max(f,l.width-h.width-this.margin),m=this.margin,g=Math.max(m,l.height-h.height-this.margin),w=Math.round(Math.min(d,Math.max(f,u))),y=Math.round(Math.min(g,Math.max(m,p)));this.position={x:w,y},o.style.setProperty("left",`${w}px`,"important"),o.style.setProperty("top",`${y}px`,"important"),o.style.setProperty("right","auto","important"),o.style.setProperty("bottom","auto","important"),o.style.setProperty("transform","none","important")},this.handlePointerUp=i=>{if(this.isDragging){if(this.isDragging=!1,this.capturedTarget){try{this.capturedTarget.releasePointerCapture(i.pointerId)}catch{}this.capturedTarget=null}this.position&&this.storageKey&&Ge(this.storageKey,this.position),this.onPositionChanged&&this.onPositionChanged(this.position)}},this.reset=()=>{this.isDragging=!1,this.hasMoved=!1,this.position=null,this.storageKey&&Ge(this.storageKey,null);const i=this.getTarget();i&&(i.style.removeProperty("left"),i.style.removeProperty("top"),i.style.removeProperty("right"),i.style.removeProperty("bottom"),i.style.removeProperty("transform")),this.onPositionChanged&&this.onPositionChanged(null)},this.handleKeyDown=i=>{if(i.key==="Home"){i.preventDefault(),i.stopPropagation(),this.reset();return}const o=i.shiftKey?40:10,a={ArrowLeft:{x:-o,y:0},ArrowRight:{x:o,y:0},ArrowUp:{x:0,y:-o},ArrowDown:{x:0,y:o}}[i.key];if(!a)return;i.preventDefault(),i.stopPropagation();const c=this.getTarget(),l=this.getContainer();if(!c||!l)return;const h=c.getBoundingClientRect(),u=l.getBoundingClientRect(),p=this.position?this.position.x:h.left-u.left,f=this.position?this.position.y:h.top-u.top,d=this.margin,m=Math.max(d,u.width-h.width-this.margin),g=this.margin,w=Math.max(g,u.height-h.height-this.margin),y=Math.round(Math.min(m,Math.max(d,p+a.x))),x=Math.round(Math.min(w,Math.max(g,f+a.y)));this.position={x:y,y:x},c.style.setProperty("left",`${y}px`,"important"),c.style.setProperty("top",`${x}px`,"important"),c.style.setProperty("right","auto","important"),c.style.setProperty("bottom","auto","important"),c.style.setProperty("transform","none","important"),this.storageKey&&Ge(this.storageKey,this.position),this.onPositionChanged&&this.onPositionChanged(this.position)},this.applyStoredPosition=()=>{if(!this.position)return;const i=this.getTarget(),o=this.getContainer();if(!i||!o)return;const s=o.getBoundingClientRect();if(s.width===0||s.height===0)return;const a=i.getBoundingClientRect(),c=this.margin,l=Math.max(c,s.width-(a.width||120)-this.margin),h=this.margin,u=Math.max(h,s.height-(a.height||40)-this.margin),p=Math.round(Math.min(l,Math.max(c,this.position.x))),f=Math.round(Math.min(u,Math.max(h,this.position.y)));this.position={x:p,y:f},i.style.setProperty("left",`${p}px`,"important"),i.style.setProperty("top",`${f}px`,"important"),i.style.setProperty("right","auto","important"),i.style.setProperty("bottom","auto","important"),i.style.setProperty("transform","none","important")},this.getTarget=t,this.getContainer=e,this.storageKey=r?.storageKey??null,this.margin=r?.margin??8,this.onPositionChanged=r?.onPositionChanged,this.storageKey&&(this.position=Rl(this.storageKey))}get currentPosition(){return this.position}get styleString(){return this.position?`left: ${this.position.x}px !important; top: ${this.position.y}px !important; right: auto !important; bottom: auto !important; transform: none !important;`:""}}function Ke(n,t="Déplacer la barre"){return K`
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
  `}var Ol=Object.defineProperty,S=(n,t,e,r)=>{for(var i=void 0,o=n.length-1,s;o>=0;o--)(s=n[o])&&(i=s(t,e,i)||i);return i&&Ol(t,e,i),i};const Zr=".canvas-hud, .coords-hud, .help-hud, .compass-hud, .hud-drag-handle, button",Ll=".wall-element, .wall-face-3d, .wall-cap-3d, .opening-3d, .room-group, .room-3d-badge-group, .entity-pin, .opening-element, .furniture-group, .dimension-badge, .wall-dim-badge",Nl=.55,jl=400,Fl=600,zl=[{label:"SO",title:"Vue Sud-Ouest (défaut)",camera:{pitchDeg:45,yawDeg:-35}},{label:"SE",title:"Vue Sud-Est",camera:{pitchDeg:45,yawDeg:35}},{label:"NE",title:"Vue Nord-Est",camera:{pitchDeg:45,yawDeg:125}},{label:"NO",title:"Vue Nord-Ouest",camera:{pitchDeg:45,yawDeg:-125}},{label:"Top",title:"Vue de dessus",camera:{pitchDeg:0,yawDeg:0}},{label:"Face",title:"Vue de face (depuis le sud)",camera:{pitchDeg:75,yawDeg:0}}];function Wl(){return typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion: reduce)").matches}function tt(n){return n.map(t=>`${t.x},${t.y}`).join(" ")}const Hl=.15,Jr=.2,Ul=10,Yl=.05,Qr=12,Bl=6,ql=.01,be=.2,Xl=.01,Vl=1800,Gl="Ctrl (⌘ sur Mac) + molette pour zoomer",ti={"too-few":"Une pièce a besoin d'au moins 3 angles.","self-intersecting":"Contour invalide : deux côtés de la pièce se croisent.","too-small":"Pièce trop petite."},ei={snappedTo:"none"},ni={kind:"none"},Kl=[];function Ze(n,t,e){for(const r of n.composedPath()){if(r===t)return!1;if(r instanceof Element&&r.matches(e))return!0}return!1}function ri(n){const t=n.background;return n.walls.length>0||n.rooms.length>0||n.bindings.length>0||(n.furniture?.length??0)>0||!!(t&&t.visible&&(t.imageUrl||t.assetId))}var mt;const M=(mt=class extends te{constructor(){super(),this.project={id:"default",name:"Plan sans titre",created_at:new Date().toISOString(),updated_at:new Date().toISOString(),pixelsPerMeter:50,grid:{size:.5,subdivisions:2,snapToGrid:!0,snapToAngles:!0,snapToElements:!0},walls:[],openings:[],rooms:[],bindings:[]},this.activeTool="wall",this.currentWallThickness=.2,this.currentOpeningWidth=.9,this.is3DMode=!1,this.selectedElements=st(),this.isDashboardMode=!1,this.interactive=!0,this.readOnly=!1,this.modalOpen=!1,this.hasToast=!1,this.ghostProject=null,this.showDimensions=!0,this.showThermalHeatmap=!1,this.openingFlipSide=!1,this.openingFlipDirection=!1,this.windowSashCount=1,this.showControls=!0,this.animations=!0,this.theme="auto",this.shadows=!0,this.viewport={x:300,y:300,zoom:1},this.interaction=ni,this.marqueeStart=null,this.marqueeCurrent=null,this.drawingWallStart=null,this.previewPoint=null,this.snapInfo=ei,this.cursorCoords={x:0,y:0},this.roomDraft=[],this.rectStart=null,this.rectCurrent=null,this.wallSnap=null,this.openingFit=null,this.calibrateStart=null,this.calibrateCurrent=null,this.rescaleStart=null,this.rescaleCurrent=null,this.viewRotation=0,this.orbitPitch=45,this.orbitYaw=-35,this.view3d="idle",this.view3dZoom=1,this.cutWalls=!1,this.walkthrough3D=!1,this.lightingMode3D="auto",this.nightMode3D=!1,this.canvasHudDrag=new ye(()=>this.renderRoot.querySelector(".canvas-hud"),()=>this.renderRoot.querySelector(".canvas-container")||this,{storageKey:"home_architect_canvas_hud_pos",onPositionChanged:()=>this.requestUpdate()}),this.coordsHudDrag=new ye(()=>this.renderRoot.querySelector(".coords-hud"),()=>this.renderRoot.querySelector(".canvas-container")||this,{storageKey:"home_architect_coords_hud_pos",onPositionChanged:()=>this.requestUpdate()}),this.helpHudDrag=new ye(()=>this.renderRoot.querySelector(".help-hud"),()=>this.renderRoot.querySelector(".canvas-container")||this,{storageKey:"home_architect_help_hud_pos",onPositionChanged:()=>this.requestUpdate()}),this.compassHudDrag=new ye(()=>this.renderRoot.querySelector(".compass-hud"),()=>this.renderRoot.querySelector(".canvas-container")||this,{storageKey:"home_architect_compass_hud_pos",onPositionChanged:()=>this.requestUpdate()}),this.view3dIntro=null,this.hint=null,this.hintTimer=null,this.pointers=new gc,this.gestureOccurred=!1,this.canvasSize={width:0,height:0},this.resizeObserver=null,this.viewTouched=!1,this.pendingFitPadding=null,this.lastEmittedProject=null,this.localProject=null,this.selectionPruned=!1,this.keyboardBound=!1,this.entityRevision=0,this.colorScheme="dark",this.intersectionObserver=null,this.cameraAnimation=null,this.cameraTarget=null,this.onKeyDown=t=>this.handleKeyDown(t),this.pinGestures=new dl({onTap:t=>this.runPinAction(t,"tap"),onDoubleTap:t=>this.runPinAction(t,"double_tap"),onHold:t=>this.runPinAction(t,"hold"),waitsForDoubleTap:t=>{const e=this.project.bindings.find(r=>r.id===t);return!!e&&oo(e,"tap").kind!=="more-info"}}),this.watchedEntityIds=pt((t,e)=>ol(t,e)),this.displayableBindings=pt(t=>t.filter(e=>typeof e.entityId=="string")),this.wallPolygons=pt(t=>Se(t)),this.wallHeights=pt((t,e,r)=>Ml(t,e,r)),this.roomLooks=pt((t,e,r,i)=>new Map(t.map(o=>[o.id,Kc(o,e,this.hass,r)]))),this.pinViews=pt((t,e)=>new Map(t.map(r=>[r.id,il(r,this.hass)]))),this.planBounds=pt(t=>wr.contentBounds(t)),this.wallScene=pt((t,e,r,i,o,s,a,c,l,h)=>{const u=s*o.zoom;return Pl({walls:t,openings:e,polygons:this.wallPolygons(t),heights:this.wallHeights(t,r,i),toView:p=>({x:p.x*u+o.x,y:p.y*u+o.y}),scale:u,heightScale:Nl,basis:Br({pitchDeg:a,yawDeg:c}),center:{x:l/2,y:h/2}})}),this.addEventListener("pointerdown",t=>this.handlePointerDownCapture(t),{capture:!0}),this.addEventListener("pointermove",t=>{this.pointers.move(t.pointerId,t.clientX,t.clientY),this.pinGestures.move(t.clientX,t.clientY)},{capture:!0}),this.addEventListener("pointerup",t=>{this.pointers.delete(t.pointerId),this.pinGestures.up()},{capture:!0}),this.addEventListener("pointercancel",t=>{this.pointers.delete(t.pointerId),this.pinGestures.cancel()},{capture:!0})}cycleLightingMode3D(){this.lightingMode3D==="auto"?(this.lightingMode3D="day",this.nightMode3D=!1,this.flashHint("Éclairage : Jour forcé ☀️")):this.lightingMode3D==="day"?(this.lightingMode3D="night",this.nightMode3D=!0,this.flashHint("Éclairage : Nuit forcée 🌙")):(this.lightingMode3D="auto",this.nightMode3D=!1,this.flashHint("Éclairage : Auto ⛅ (synchro sun.sun)"))}get lightingModeIcon(){switch(this.lightingMode3D){case"day":return"☀️";case"night":return"🌙";default:return"⛅"}}get lightingModeTitle(){switch(this.lightingMode3D){case"day":return"Éclairage : Jour forcé (soleil de midi) — Cliquer pour forcer la Nuit (🌙)";case"night":return"Éclairage : Nuit forcée (lampes allumées) — Cliquer pour mode Auto (⛅)";default:return"Éclairage : Automatique (synchro soleil sun.sun) — Cliquer pour forcer le Jour (☀️)"}}setCameraPreset(t,e){const r=this.view3dElement;r?r.setCamera({pitchDeg:t,yawDeg:e}):this.animateCamera({pitchDeg:t,yawDeg:e})}get webgl3D(){return this.is3DMode&&this.view3d==="ready"}get view3dElement(){return this.webgl3D?this.renderRoot.querySelector("home-architect-3d-view"):null}get canSelect(){return this.interactive&&!this.isDashboardMode}get canEdit(){return this.canSelect&&!this.readOnly}get canEdit2D(){return this.canEdit&&!this.is3DMode}get selectsElements(){return this.canSelect&&(this.activeTool==="select"||!this.canEdit)}get ppm(){const t=this.project.pixelsPerMeter;return Number.isFinite(t)&&t>0?t:qi}get screenPpm(){return this.ppm*this.viewport.zoom}measuredSize(){if(this.canvasSize.width>0&&this.canvasSize.height>0)return this.canvasSize;const t=this.getBoundingClientRect();return t.width>0&&t.height>0?{width:t.width,height:t.height}:null}sizeOrFallback(){return this.measuredSize()??{width:this.clientWidth||800,height:this.clientHeight||600}}get geometry(){return{viewport:this.viewport,pixelsPerMeter:this.ppm,rotationDeg:this.is3DMode?0:this.viewRotation,size:this.sizeOrFallback()}}get camera(){return Br({pitchDeg:this.orbitPitch,yawDeg:this.orbitYaw})}localToPlanView(t,e=this.geometry){return this.is3DMode?xl(t,this.camera,At(e.size)):Gi(t,e)}clientToWorld(t,e){const r=this.getBoundingClientRect();if(!this.is3DMode)return sc(t,e,r,this.geometry);const i=this.geometry;return Ki(this.localToPlanView(_t(t,e,r),i),i)}screenToWorld(t,e){return this.clientToWorld(t,e)}worldToClient(t){const e=this.getBoundingClientRect();if(!this.is3DMode)return ac(t,e,this.geometry);const r=this.geometry;return Vi(it(Zi(t,r),0,this.camera,At(r.size)),e)}worldToScreen(t){const e=this.screenPpm;return{x:t.x*e+this.viewport.x,y:t.y*e+this.viewport.y}}clientToView(t,e){return this.localToPlanView(_t(t,e,this.getBoundingClientRect()))}pannedViewport(t,e){if(!this.is3DMode)return cc(t,e,this.viewRotation);const r=ao(e,this.camera);return{x:t.x+r.x,y:t.y+r.y}}handleWheel(t){if(this.webgl3D)return;const e=t.ctrlKey||t.metaKey;if(this.isDashboardMode&&!e){this.flashHint(Gl);return}t.preventDefault();const r=this.sizeOrFallback(),i=kr(t.deltaY,t.deltaMode,r.height),o=kr(t.deltaX,t.deltaMode,r.width);if(this.viewTouched=!0,!e&&o!==0){const a=this.pannedViewport(this.viewport,{x:-o,y:-i});this.viewport={...this.viewport,x:a.x,y:a.y};return}const s=an(this.viewport.zoom*dc(i,e),this.ppm);s!==this.viewport.zoom&&(this.viewport=_r(this.viewport,this.clientToView(t.clientX,t.clientY),s))}zoomBy(t){const e=this.view3dElement;if(e){e.zoomBy(t);return}const r=an(this.viewport.zoom*t,this.ppm);this.viewport=_r(this.viewport,At(this.sizeOrFallback()),r),this.viewTouched=!0}zoomIn(){this.zoomBy(1.25)}zoomOut(){this.zoomBy(1/1.25)}beginInteraction(t){this.interaction=t;try{t.captureEl?.setPointerCapture(t.pointerId)}catch{}}endInteraction(){const t=this.interaction;if(this.interaction=ni,!(t.kind==="none"||t.kind==="gesture"||!t.captureEl))try{t.captureEl.hasPointerCapture(t.pointerId)&&t.captureEl.releasePointerCapture(t.pointerId)}catch{}}cancelInteraction(){const t=this.interaction;t.kind!=="none"&&("base"in t&&this.project!==t.base&&this.setLocalProject(t.base),t.kind==="marquee"?(this.marqueeStart=null,this.marqueeCurrent=null):t.kind==="rect-room"&&(this.rectStart=null,this.rectCurrent=null),"base"in t&&this.clearPreview(),this.endInteraction())}handlePointerDownCapture(t){if(!(this.webgl3D||Ze(t,this,Zr))){if(t.isPrimary&&(this.pointers.clear(),this.gestureOccurred=!1),this.pointers.set(t.pointerId,t.clientX,t.clientY,t.pointerType),this.pointers.size>=2){(this.interaction.kind==="gesture"||this.startGesture())&&t.stopPropagation();return}this.pendingPlacement&&this.canEdit2D&&t.isPrimary&&t.button===0&&this.interaction.kind==="none"&&(t.stopPropagation(),this.beginInteraction({kind:"placement",pointerId:t.pointerId,captureEl:this.renderRoot.querySelector(".canvas-container"),startClient:{x:t.clientX,y:t.clientY},startViewport:{x:this.viewport.x,y:this.viewport.y},pointerType:t.pointerType}))}}startGesture(){const t=this.pointers.pair();if(!t||t.types.includes("mouse"))return!1;this.cancelInteraction(),this.pinGestures.cancel(),this.stopCameraAnimation();const e=this.getBoundingClientRect(),r=_t(t.points[0].x,t.points[0].y,e),i=_t(t.points[1].x,t.points[1].y,e);return this.interaction={kind:"gesture",ids:t.ids,startDistance:Math.max(Gt(r,i),1),startMidLocal:Sr(r,i),startViewport:{...this.viewport}},this.gestureOccurred=!0,!0}updateGesture(t){const e=this.pointers.get(t.ids[0]),r=this.pointers.get(t.ids[1]);if(!e||!r)return;const i=this.getBoundingClientRect(),o=_t(e.x,e.y,i),s=_t(r.x,r.y,i),a=Sr(o,s),c=Gt(o,s)/t.startDistance,l=this.geometry;this.viewport=yc(t.startViewport,this.localToPlanView(t.startMidLocal,l),this.localToPlanView(a,l),c,this.ppm),this.viewTouched=!0}beginPan(t,e){this.beginInteraction({kind:"pan",pointerId:t.pointerId,captureEl:e,startClient:{x:t.clientX,y:t.clientY},startViewport:{x:this.viewport.x,y:this.viewport.y}})}beginOrbit(t,e){this.stopCameraAnimation(),this.beginInteraction({kind:"orbit",pointerId:t.pointerId,captureEl:e,startClient:{x:t.clientX,y:t.clientY},startPitch:this.orbitPitch,startYaw:this.orbitYaw})}updatePan(t,e){const r=this.pannedViewport(t.startViewport,{x:e.clientX-t.startClient.x,y:e.clientY-t.startClient.y});this.viewport={...this.viewport,x:r.x,y:r.y},this.viewTouched=!0}convertToPan(t,e){this.interaction={kind:"pan",pointerId:t.pointerId,captureEl:t.captureEl,startClient:t.startClient,startViewport:t.startViewport},this.updatePan(t,e)}convertToMarquee(t,e){this.interaction={kind:"marquee",pointerId:t.pointerId,captureEl:t.captureEl},this.marqueeStart=t.startWorld,this.marqueeCurrent=this.clientToWorld(e.clientX,e.clientY)}convertToOrbit(t,e){this.stopCameraAnimation(),this.interaction={kind:"orbit",pointerId:t.pointerId,captureEl:t.captureEl,startClient:t.startClient,startPitch:this.orbitPitch,startYaw:this.orbitYaw},this.updateOrbit(this.interaction,e)}updateOrbit(t,e){this.orbitYaw=(t.startYaw+(e.clientX-t.startClient.x)*.55)%360,this.orbitPitch=Math.max(15,Math.min(85,t.startPitch-(e.clientY-t.startClient.y)*.38))}handlePointerDown(t){if(this.webgl3D||Ze(t,this,Zr)||this.interaction.kind!=="none"||!t.isPrimary)return;const e=t.currentTarget;if(this.is3DMode){t.button===1||t.button===0&&t.shiftKey?this.beginPan(t,e):t.button===2||t.button===0&&t.altKey?this.beginOrbit(t,e):t.button===0&&!Ze(t,this,Ll)&&(this.canSelect&&this.setSelection(st()),this.beginOrbit(t,e));return}if(t.button===1){this.beginPan(t,e);return}if(t.button===0){if(!this.canSelect){t.pointerType==="mouse"&&this.beginPan(t,e);return}if(this.activeTool==="select"||!this.canEdit){if(t.shiftKey){const r=this.clientToWorld(t.clientX,t.clientY);this.marqueeStart=r,this.marqueeCurrent=r,this.beginInteraction({kind:"marquee",pointerId:t.pointerId,captureEl:e});return}this.setSelection(st()),this.beginPan(t,e);return}if(t.shiftKey){this.beginPan(t,e);return}if(this.activeTool==="rect_room"){this.beginRectRoom(t,e);return}this.beginInteraction({kind:"tool-tap",pointerId:t.pointerId,captureEl:e,startClient:{x:t.clientX,y:t.clientY},startViewport:{x:this.viewport.x,y:this.viewport.y},pointerType:t.pointerType}),this.updateHover(t)}}handlePointerMove(t){if(this.webgl3D)return;const e=this.interaction;if(e.kind==="gesture"){e.ids.includes(t.pointerId)&&this.updateGesture(e);return}if(e.kind==="none"){this.updateHover(t);return}if(e.pointerId===t.pointerId)switch(e.kind){case"pan":this.updatePan(e,t);return;case"orbit":this.updateOrbit(e,t);return;case"marquee":this.marqueeCurrent=this.clientToWorld(t.clientX,t.clientY);return;case"tool-tap":case"placement":we(e.startClient,{x:t.clientX,y:t.clientY},e.pointerType)?this.convertToPan(e,t):e.kind==="tool-tap"&&this.updateHover(t);return;case"rect-room":this.updateRectRoom(t);return;case"press":this.updatePress(e,t);return;case"furniture-rotate":this.updateFurnitureRotation(e,t);return;case"furniture-resize":this.updateFurnitureResize(e,t);return;case"wall-endpoint":this.updateWallEndpoint(e,t);return;case"room-vertex":this.updateRoomVertex(e,t);return}}handlePointerUp(t){const e=this.interaction;if(e.kind==="gesture"){e.ids.includes(t.pointerId)&&this.endInteraction();return}if(!(e.kind==="none"||e.pointerId!==t.pointerId)){switch(e.kind){case"marquee":this.finishMarquee();break;case"tool-tap":this.applyToolTap(t);break;case"placement":this.placePending(t);break;case"rect-room":this.finishRectRoom(e,t);break;case"press":this.finishPress(e);break;case"furniture-rotate":this.furnitureChanged(e.base,e.itemId,["rotation"])&&this.dispatchProjectChanged();break;case"furniture-resize":this.furnitureChanged(e.base,e.itemId,["width","length"])&&this.dispatchProjectChanged();break;case"wall-endpoint":case"room-vertex":this.clearPreview(),this.project!==e.base&&this.dispatchProjectChanged();break}this.endInteraction()}}handlePointerCancel(t){const e=this.interaction;e.kind!=="none"&&(e.kind==="gesture"?e.ids.includes(t.pointerId):e.pointerId===t.pointerId)&&this.cancelInteraction()}handleLostPointerCapture(t){const e=this.interaction;e.kind==="none"||e.kind==="gesture"||e.pointerId===t.pointerId&&e.captureEl===t.target&&this.cancelInteraction()}handlePointerLeave(){this.interaction.kind==="none"&&(this.clearPreview(),this.wallSnap=null,this.openingFit=null)}handleDoubleClick(t){this.canEdit2D&&(this.activeTool==="room"&&this.roomDraft.length>=3?(t.preventDefault(),this.closeRoomDraft()):this.activeTool==="wall"&&this.drawingWallStart&&(this.drawingWallStart=null,this.clearPreview()))}setPreview(t){this.previewPoint=t.point,this.snapInfo={snappedTo:t.snappedTo,guideAngle:t.guideAngle,smartGuideX:t.smartGuideX,smartGuideY:t.smartGuideY,wallId:t.wallId}}clearPreview(){this.previewPoint=null,this.snapInfo=ei}snapDraw(t,e,r){return ge(t,this.project.grid,this.project.walls,e,this.screenPpm,r)}snapRoomVertex(t,e){const r=this.roomDraft;return r.length>=3&&Gt(t,r[0])*this.screenPpm<=Qr?{point:{...r[0]},snappedTo:"vertex",constraints:["vertex"]}:this.snapDraw(t,r[r.length-1],e)}updateHover(t){if(this.isDashboardMode)return;const e=this.clientToWorld(t.clientX,t.clientY);if(this.cursorCoords={x:A.roundMeters(e.x),y:A.roundMeters(e.y)},this.paintCoords(),!this.canEdit2D){this.clearPreview();return}const r=t.altKey;switch(this.activeTool){case"wall":this.setPreview(this.snapDraw(e,this.drawingWallStart??void 0,r));break;case"room":this.setPreview(this.snapRoomVertex(e,r));break;case"rect_room":{const i=this.snapDraw(e,void 0,r);this.setPreview(i),this.rectStart&&(this.rectCurrent=i.point);break}case"door":case"window":case"french_window":this.clearPreview(),this.updateOpeningPreview(e);break;case"calibrate":this.clearPreview(),this.calibrateStart&&(this.calibrateCurrent=e);break;case"rescale":{const i=Rr(e,this.project.walls,this.screenPpm,r);this.setPreview(i),this.rescaleStart&&(this.rescaleCurrent=i.point);break}default:this.clearPreview();break}}currentOpeningType(){switch(this.activeTool){case"door":return"door";case"window":return"window";case"french_window":return"french_window";default:return null}}requestedOpeningWidth(t){const e=t==="door"?.9:t==="french_window"?2:this.windowSashCount===2?1.4:.9;return this.currentOpeningWidth||e}computeOpeningPlacement(t){const e=this.currentOpeningType();if(!e)return null;const r=ro(t,this.project.walls,this.screenPpm);if(!r)return null;const i=A.fitOpening(r.wall,r.offset,this.requestedOpeningWidth(e),{walls:this.project.walls,openings:this.project.openings});return{snap:r,fit:i}}updateOpeningPreview(t){const e=this.computeOpeningPlacement(t);this.wallSnap=e?.snap??null,this.openingFit=e?.fit??null}applyToolTap(t){if(!this.canEdit2D)return;const e=this.clientToWorld(t.clientX,t.clientY),r=t.altKey;switch(this.activeTool){case"wall":this.tapWall(e,r);break;case"room":this.tapRoomVertex(e,r);break;case"door":case"window":case"french_window":this.tapOpening(e);break;case"calibrate":this.tapCalibrate(e);break;case"rescale":this.tapRescale(e,r);break}}tapWall(t,e){const r=this.snapDraw(t,this.drawingWallStart??void 0,e).point;if(!this.drawingWallStart){this.drawingWallStart=r;return}const i=this.drawingWallStart;if(A.distance(i,r)<Hl)return;const o={id:Ft("wall"),start:{...i},end:{...r},thickness:this.currentWallThickness,type:"standard"};this.commitProject({...this.project,walls:[...this.project.walls,o]}),this.drawingWallStart=r}tapRoomVertex(t,e){const r=this.roomDraft;if(r.length>=3&&Gt(t,r[0])*this.screenPpm<=Qr){this.closeRoomDraft();return}const i=this.snapRoomVertex(t,e).point,o=r[r.length-1];o&&Gt(i,o)*this.screenPpm<=Bl||(this.roomDraft=[...r,i])}closeRoomDraft(){const t=no(this.roomDraft);if(t){this.flashHint(ti[t]);return}const e=Ir(this.roomDraft,this.project.rooms);this.roomDraft=[],this.clearPreview(),this.addRoom(e)}addRoom(t){this.commitProject(ae({...this.project,rooms:[...this.project.rooms,t]})),this.setSelection(dt({kind:"room",id:t.id})),this.emitRoomSelected(t)}emitRoomSelected(t){this.dispatchEvent(new CustomEvent("room-selected",{detail:{room:t},bubbles:!0,composed:!0}))}beginRectRoom(t,e){const r=this.snapDraw(this.clientToWorld(t.clientX,t.clientY),void 0,t.altKey).point;this.rectStart||(this.rectStart=r),this.rectCurrent=r,this.beginInteraction({kind:"rect-room",pointerId:t.pointerId,captureEl:e,startClient:{x:t.clientX,y:t.clientY},pointerType:t.pointerType})}updateRectRoom(t){const e=this.snapDraw(this.clientToWorld(t.clientX,t.clientY),void 0,t.altKey);this.setPreview(e),this.rectCurrent=e.point}finishRectRoom(t,e){const r=this.rectStart,i=this.rectCurrent;if(!r||!i)return;const o=we(t.startClient,{x:e.clientX,y:e.clientY},t.pointerType);if(Math.abs(i.x-r.x)>=Jr&&Math.abs(i.y-r.y)>=Jr){this.rectStart=null,this.rectCurrent=null,this.clearPreview(),this.addRoom(Ir(Cr(r,i),this.project.rooms));return}!o&&A.distance(r,i)<1e-9||(this.rectStart=null,this.rectCurrent=null,this.flashHint(ti["too-small"]))}tapOpening(t){const e=this.currentOpeningType(),r=this.computeOpeningPlacement(t);if(this.wallSnap=r?.snap??null,this.openingFit=r?.fit??null,!e||!r)return;const{snap:i,fit:o}=r;if(!o.fits){this.flashHint("Mur trop court pour cette ouverture.");return}if(o.overlaps.length>0){this.flashHint("Une ouverture occupe déjà cet emplacement.");return}const s={id:Ft("op"),wallId:i.wall.id,type:e,offset:o.offset,width:o.width,flipSide:this.openingFlipSide,flipDirection:this.openingFlipDirection,sashCount:this.sashCountFor(e)};this.commitProject({...this.project,openings:[...this.project.openings,s]}),this.updateOpeningPreview(t)}tapCalibrate(t){if(!this.calibrateStart){this.calibrateStart=t,this.calibrateCurrent=t;return}const e=A.distance(this.calibrateStart,t);e*this.screenPpm<Ul||(this.dispatchEvent(new CustomEvent("request-calibration",{detail:{worldDistance:e,defaultMeters:A.roundMeters(e)},bubbles:!0,composed:!0})),this.calibrateStart=null,this.calibrateCurrent=null)}tapRescale(t,e){const r=Rr(t,this.project.walls,this.screenPpm,e).point;if(!this.rescaleStart){this.rescaleStart=r,this.rescaleCurrent=r;return}const i=A.distance(this.rescaleStart,r);i<Yl||(this.dispatchEvent(new CustomEvent("request-rescale",{detail:{measuredMeters:i},bubbles:!0,composed:!0})),this.rescaleStart=null,this.rescaleCurrent=null,this.clearPreview())}resetToolState(){this.drawingWallStart=null,this.roomDraft=[],this.rectStart=null,this.rectCurrent=null,this.calibrateStart=null,this.calibrateCurrent=null,this.rescaleStart=null,this.rescaleCurrent=null,this.wallSnap=null,this.openingFit=null,this.clearPreview()}setSelection(t){bc(t,this.selectedElements)||(this.selectedElements=t,this.dispatchSelectionChanged())}dispatchSelectionChanged(){this.dispatchEvent(new CustomEvent("selection-changed",{detail:{selectedElements:this.selectedElements},bubbles:!0,composed:!0}))}handleElementPointerDown(t,e){if(e.button!==0||!e.isPrimary||!this.selectsElements||this.interaction.kind!=="none")return;e.stopPropagation();const r=e.shiftKey||e.ctrlKey||e.metaKey,i=Ye(this.selectedElements,t);t.kind!=="room"&&!i&&this.setSelection(r?Be(this.selectedElements,t):dt(t));const o=this.clientToWorld(e.clientX,e.clientY);this.beginInteraction({kind:"press",ref:t,pointerId:e.pointerId,captureEl:e.currentTarget,startClient:{x:e.clientX,y:e.clientY},startWorld:o,startViewport:{x:this.viewport.x,y:this.viewport.y},pointerType:e.pointerType,modifier:r,wasSelected:i,mode:"pending",base:this.project,moveSet:null,anchor:o,snap:"free"})}updatePress(t,e){if(t.mode==="pending"){if(!we(t.startClient,{x:e.clientX,y:e.clientY},t.pointerType))return;if(this.is3DMode){this.convertToOrbit(t,e);return}if(t.ref.kind==="room"&&t.modifier){this.convertToMarquee(t,e);return}if(t.ref.kind==="room"&&!t.wasSelected||!this.canEdit2D){this.convertToPan(t,e);return}if(t.ref.kind==="opening")t.mode="slide";else{const r=Tr(t.base,this.selectedElements);if(Er(r)){t.mode="idle";return}t.moveSet=r,Object.assign(t,this.dragAnchor(t.ref,t.startWorld,t.base)),t.mode="move"}}t.mode==="move"?this.dragSelection(t,e):t.mode==="slide"&&this.dragOpening(t,e)}dragAnchor(t,e,r){const i=o=>o.reduce((s,a)=>A.distance(a,e)<A.distance(s,e)?a:s);switch(t.kind){case"wall":{const o=r.walls.find(s=>s.id===t.id);if(o)return{anchor:i([o.start,o.end]),snap:"structure"};break}case"room":{const o=r.rooms.find(s=>s.id===t.id);if(o&&o.polygon.length>0)return{anchor:i(o.polygon),snap:"structure"};break}case"furniture":{const o=(r.furniture||[]).find(s=>s.id===t.id);if(o)return{anchor:o.position,snap:"furniture"};break}case"binding":{const o=r.bindings.find(s=>s.id===t.id);if(o)return{anchor:o.position,snap:"free"};break}}return{anchor:e,snap:"free"}}dragSelection(t,e){const r=t.moveSet;if(!r)return;const i=this.clientToWorld(e.clientX,e.clientY),o={x:t.anchor.x+i.x-t.startWorld.x,y:t.anchor.y+i.y-t.startWorld.y};let s;if(t.snap==="structure"){const c=new Set(r.wallIds),l=ge(o,this.project.grid,t.base.walls,void 0,this.screenPpm,e.altKey,{excludeWallIds:r.wallIds,excludePoints:t.base.walls.filter(h=>c.has(h.id)).flatMap(h=>[h.start,h.end])});this.setPreview(l),s=l.point}else if(t.snap==="furniture"&&this.project.grid.snapToGrid&&e.altKey){const c=this.project.grid.size||.5;s={x:A.quantize(o.x,c),y:A.quantize(o.y,c)}}else s=A.roundPoint(o);const a=Ar(t.base,r,{x:s.x-t.anchor.x,y:s.y-t.anchor.y});a&&this.setLocalProject(a)}dragOpening(t,e){const r=t.base.openings.find(l=>l.id===t.ref.id),i=r?t.base.walls.find(l=>l.id===r.wallId):void 0;if(!r||!i)return;const o=this.clientToWorld(e.clientX,e.clientY),s=r.offset+Dr(i,o)-Dr(i,t.startWorld),a=e.altKey?s:A.quantize(s,Xl),c=Ec(t.base,r.id,a);c&&this.setLocalProject(c)}finishPress(t){if(t.mode!=="pending"){this.clearPreview(),this.project!==t.base&&this.dispatchProjectChanged();return}const e=this.selectedElements,r=t.ref;let i=e;r.kind==="room"?i=t.modifier?t.wasSelected?qe(e,r):Be(e,r):dt(r):t.modifier?t.wasSelected&&(i=qe(e,r)):(Xe(e)>1||!Ye(e,r))&&(i=dt(r)),this.setSelection(i)}finishMarquee(){const t=this.marqueeStart,e=this.marqueeCurrent;if(this.marqueeStart=null,this.marqueeCurrent=null,!t||!e)return;const r=Math.min(t.x,e.x),i=Math.max(t.x,e.x),o=Math.min(t.y,e.y),s=Math.max(t.y,e.y);if(i-r<=.05&&s-o<=.05)return;const a=d=>d.x>=r&&d.x<=i&&d.y>=o&&d.y<=s,c=this.project.walls.filter(d=>a({x:(d.start.x+d.end.x)/2,y:(d.start.y+d.end.y)/2})).map(d=>d.id),l=this.project.openings.filter(d=>{const m=this.project.walls.find(x=>x.id===d.wallId);if(!m)return!1;const g=m.end.x-m.start.x,w=m.end.y-m.start.y,y=Math.sqrt(g*g+w*w);return y===0?!1:a({x:m.start.x+d.offset/y*g,y:m.start.y+d.offset/y*w})}).map(d=>d.id),h=this.project.rooms.filter(d=>d.polygon&&d.polygon.length>=3&&a(q.labelPoint(d.polygon))).map(d=>d.id),u=this.project.bindings.filter(d=>a(d.position)).map(d=>d.id),p=(this.project.furniture||[]).filter(d=>a(d.position)).map(d=>d.id),f=this.selectedElements;this.setSelection({wallIds:Array.from(new Set([...f.wallIds,...c])),openingIds:Array.from(new Set([...f.openingIds,...l])),roomIds:Array.from(new Set([...f.roomIds,...h])),bindingIds:Array.from(new Set([...f.bindingIds,...u])),furnitureIds:Array.from(new Set([...f.furnitureIds||[],...p]))})}selectFurniture(t){this.selectedElements.furnitureIds?.includes(t)||this.setSelection(dt({kind:"furniture",id:t}))}furnitureChanged(t,e,r){const i=(t.furniture||[]).find(s=>s.id===e),o=(this.project.furniture||[]).find(s=>s.id===e);return!!i&&!!o&&r.some(s=>i[s]!==o[s])}replaceFurniture(t,e,r){this.setLocalProject({...t,furniture:(t.furniture||[]).map(i=>i.id===e?{...i,...r}:i)})}handleFurnitureRotatePointerDown(t,e){if(!this.canEdit2D||e.button!==0||this.interaction.kind!=="none")return;e.stopPropagation();const r=this.clientToWorld(e.clientX,e.clientY),i=Math.atan2(r.y-t.position.y,r.x-t.position.x)*(180/Math.PI);this.selectFurniture(t.id),this.beginInteraction({kind:"furniture-rotate",pointerId:e.pointerId,captureEl:e.currentTarget,itemId:t.id,startAngle:i,initialAngle:t.rotation||0,base:this.project})}updateFurnitureRotation(t,e){const r=(t.base.furniture||[]).find(a=>a.id===t.itemId);if(!r)return;const i=this.clientToWorld(e.clientX,e.clientY),o=Math.atan2(i.y-r.position.y,i.x-r.position.x)*(180/Math.PI);let s=Math.round(t.initialAngle+o-t.startAngle);s=(s%360+360)%360,this.replaceFurniture(t.base,t.itemId,{rotation:s})}handleFurnitureResizePointerDown(t,e){if(!this.canEdit2D||e.button!==0||this.interaction.kind!=="none")return;e.stopPropagation();const r=Z(t.type);this.selectFurniture(t.id),this.beginInteraction({kind:"furniture-resize",pointerId:e.pointerId,captureEl:e.currentTarget,itemId:t.id,startClient:{x:e.clientX,y:e.clientY},initialWidth:t.width||r?.width||1,initialLength:t.length||r?.length||1,base:this.project})}updateFurnitureResize(t,e){const r=(t.base.furniture||[]).find(m=>m.id===t.itemId);if(!r)return;const i=this.clientToWorld(e.clientX,e.clientY),o=this.clientToWorld(t.startClient.x,t.startClient.y),s=i.x-o.x,a=i.y-o.y,c=(r.rotation||0)*Math.PI/180,l=Math.cos(c),h=Math.sin(c),u=s*l+a*h,p=-s*h+a*l;let f=Math.max(be,t.initialWidth+u),d=Math.max(be,t.initialLength+p);if(e.shiftKey&&t.initialWidth>0&&t.initialLength>0){const m=t.initialLength/t.initialWidth,g=Math.max(f/t.initialWidth,d/t.initialLength);f=Math.max(be,t.initialWidth*g),d=Math.max(be,f*m)}this.replaceFurniture(t.base,t.itemId,{width:Math.round(f*1e3)/1e3,length:Math.round(d*1e3)/1e3})}handleWallEndpointPointerDown(t,e,r){!this.canEdit2D||r.button!==0||this.interaction.kind!=="none"||(r.stopPropagation(),this.beginInteraction({kind:"wall-endpoint",pointerId:r.pointerId,captureEl:r.currentTarget,wallId:t.id,which:e,base:this.project}))}updateWallEndpoint(t,e){const r=t.base.walls.find(a=>a.id===t.wallId);if(!r)return;const i=t.which==="start"?r.end:r.start,o=ge(this.clientToWorld(e.clientX,e.clientY),this.project.grid,t.base.walls,i,this.screenPpm,e.altKey,{excludeWallIds:[r.id],excludePoints:[r[t.which]]});if(this.setPreview(o),A.distance(o.point,i)<Ji)return;const s=Sc(t.base,r.id,t.which,o.point);s&&this.setLocalProject(s)}handleRoomVertexPointerDown(t,e,r){!this.canEdit2D||r.button!==0||this.interaction.kind!=="none"||(r.stopPropagation(),this.beginInteraction({kind:"room-vertex",pointerId:r.pointerId,captureEl:r.currentTarget,roomId:t.id,index:e,base:this.project}))}updateRoomVertex(t,e){const r=ge(this.clientToWorld(e.clientX,e.clientY),this.project.grid,t.base.walls,void 0,this.screenPpm,e.altKey);this.setPreview(r);const i=Pc(t.base,t.roomId,t.index,r.point);i&&this.setLocalProject(i)}static carriesFiles(t){return Array.from(t.dataTransfer?.types??[]).includes("Files")}handleDragOver(t){if(!this.canEdit2D){if(!mt.carriesFiles(t))return;t.preventDefault(),t.dataTransfer&&(t.dataTransfer.dropEffect="none");return}t.preventDefault(),t.dataTransfer&&(t.dataTransfer.dropEffect="copy")}handleDrop(t){if(!this.canEdit2D){mt.carriesFiles(t)&&t.preventDefault();return}t.preventDefault();const e=t.dataTransfer?.files?.[0];if(e&&(e.type.startsWith("image/")||e.name.toLowerCase().endsWith(".svg"))){Xa(e).then(o=>this.dispatchEvent(new CustomEvent("background-image-loaded",{detail:{dataUrl:o},bubbles:!0,composed:!0})),o=>{console.error("[home-architect] Lecture de l'image déposée impossible :",o),this.flashHint("Image illisible.")});return}const r=t.dataTransfer?.getData("application/json");if(!r)return;let i;try{i=Dc(JSON.parse(r))}catch{i=null}i&&this.placeDrawerItem(i,this.clientToWorld(t.clientX,t.clientY))&&this.focus({preventScroll:!0})}placePending(t){const e=this.pendingPlacement;!e||!this.canEdit2D||this.placeDrawerItem(e,this.clientToWorld(t.clientX,t.clientY))&&this.dispatchPlacementDone(!0)}dispatchPlacementDone(t){this.dispatchEvent(new CustomEvent("placement-done",{detail:{placed:t},bubbles:!0,composed:!0}))}placeDrawerItem(t,e){if(t.kind==="furniture"){const i=Cc(t.furnitureType,e,this.project.rooms);return i?(this.commitProject({...this.project,furniture:[...this.project.furniture||[],i]}),this.setSelection(dt({kind:"furniture",id:i.id})),!0):(this.flashHint("Meuble inconnu du catalogue."),!1)}if(this.hass?.states&&!this.hass.states[t.entityId])return this.flashHint(`Entité introuvable : ${t.entityId}`),!1;const r=Ic(t.entityId,e,this.project.rooms);return this.commitProject({...this.project,bindings:[...this.project.bindings,r]}),!0}runPinAction(t,e){const r=this.project.bindings.find(i=>i.id===t);!r||!this.isDashboardMode||Ur(r,e,{host:this,hass:this.hass,onError:i=>this.flashHint(i)})}openMoreInfo(t){this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:t},bubbles:!0,composed:!0}))}handlePinPointerDown(t,e){if(!this.isDashboardMode){this.handleElementPointerDown({kind:"binding",id:t.id},e);return}if(e.stopPropagation(),!(e.button!==0||!e.isPrimary||this.pointers.size>1)){try{e.currentTarget.setPointerCapture(e.pointerId)}catch{}this.pinGestures.down(t.id,e.clientX,e.clientY,e.pointerType)}}handlePinClick(t,e){this.isDashboardMode&&(e.stopPropagation(),!this.gestureOccurred&&this.pinGestures.click(t.id))}handlePinDblClick(t,e){this.isDashboardMode||!this.selectsElements||(e.stopPropagation(),this.openMoreInfo(t.entityId))}handlePinKeyDown(t,e){const r=e.key==="ContextMenu"||e.key==="Enter"&&e.shiftKey||e.key==="F10"&&e.shiftKey;!(!r&&(e.key==="Enter"||e.key===" "||e.key==="Spacebar"))&&!r||!this.isDashboardMode&&!this.canSelect||(e.preventDefault(),e.stopPropagation(),!e.repeat&&(this.isDashboardMode?Ur(t,r?"hold":"tap",{host:this,hass:this.hass,onError:o=>this.flashHint(o)}):r?this.openMoreInfo(t.entityId):this.setSelection(dt({kind:"binding",id:t.id}))))}handlePinContextMenu(t){this.isDashboardMode&&t.preventDefault()}handleRoomDblClick(t,e){this.canSelect&&(t.stopPropagation(),this.emitRoomSelected(e))}rotateSelectedFurniture(){const t=this.selectedElements.furnitureIds;if(!this.canEdit||!t||t.length===0)return;const e=(this.project.furniture||[]).map(r=>t.includes(r.id)?{...r,rotation:((r.rotation||0)+90)%360}:r);this.commitProject({...this.project,furniture:e})}nudgeSelection(t,e){const i={ArrowLeft:{x:-1,y:0},ArrowRight:{x:1,y:0},ArrowUp:{x:0,y:-1},ArrowDown:{x:0,y:1}}[t];if(!i)return!1;const o=Tr(this.project,this.selectedElements);if(Er(o))return!1;const s=e?this.project.grid.size>0?this.project.grid.size:.5:ql,a=Oe(i,-this.viewRotation),c=Ar(this.project,o,{x:a.x*s,y:a.y*s});return c&&c!==this.project&&this.commitProject(c),!0}handleKeyDown(t){if(this.isDashboardMode||!this.canSelect||t.defaultPrevented||!ja(t,{host:this,modalOpen:this.modalOpen}))return;const e=t.key;if(e==="Escape"){this.pendingPlacement&&this.dispatchPlacementDone(!1),this.cancelInteraction(),this.resetToolState(),this.setSelection(st());return}if(!Na(t))if(e==="Enter"&&this.activeTool==="room"&&this.roomDraft.length>=3&&this.canEdit2D)t.preventDefault(),this.closeRoomDraft();else if((e===" "||e==="Spacebar"||e.toLowerCase()==="f")&&this.wallSnap&&this.currentOpeningType()){if(t.preventDefault(),t.repeat)return;const r=e.toLowerCase()==="f"?this.openingFlipSide:!this.openingFlipSide,i=e.toLowerCase()==="f"?!this.openingFlipDirection:this.openingFlipDirection;this.dispatchEvent(new CustomEvent("opening-config-changed",{detail:{flipSide:r,flipDirection:i},bubbles:!0,composed:!0}))}else e.toLowerCase()==="r"?this.selectedElements.furnitureIds&&this.selectedElements.furnitureIds.length>0&&this.canEdit&&(t.preventDefault(),t.repeat||this.rotateSelectedFurniture()):e.startsWith("Arrow")&&this.canEdit2D&&this.interaction.kind==="none"&&this.nudgeSelection(e,t.shiftKey)&&t.preventDefault()}syncKeyboardSupport(){const t=this.isConnected&&!this.isDashboardMode;t&&!this.keyboardBound?(window.addEventListener("keydown",this.onKeyDown),this.keyboardBound=!0):!t&&this.keyboardBound&&(window.removeEventListener("keydown",this.onKeyDown),this.keyboardBound=!1),this.isDashboardMode?this.removeAttribute("tabindex"):this.hasAttribute("tabindex")||this.setAttribute("tabindex","-1")}flashHint(t){this.hint=t,this.hintTimer&&clearTimeout(this.hintTimer),this.hintTimer=setTimeout(()=>{this.hint=null,this.hintTimer=null},Vl)}connectedCallback(){super.connectedCallback(),this.syncKeyboardSupport(),typeof ResizeObserver<"u"&&(this.resizeObserver=new ResizeObserver(t=>this.handleResize(t[t.length-1]?.contentRect)),this.resizeObserver.observe(this)),typeof IntersectionObserver<"u"&&(this.intersectionObserver=new IntersectionObserver(t=>{const e=t[t.length-1];e&&this.toggleAttribute("offscreen",!e.isIntersecting)}),this.intersectionObserver.observe(this))}disconnectedCallback(){super.disconnectedCallback(),this.syncKeyboardSupport(),this.resizeObserver?.disconnect(),this.resizeObserver=null,this.intersectionObserver?.disconnect(),this.intersectionObserver=null,this.hintTimer&&clearTimeout(this.hintTimer),this.hintTimer=null,this.hint=null,this.cancelInteraction(),this.pointers.clear(),this.pinGestures.dispose(),this.finishCameraAnimation()}shouldUpdate(t){return t.size===1&&t.has("hass")?Hr(t.get("hass"),this.hass,this.watchedEntities()):!0}handleResize(t){if(!t)return;const e=this.canvasSize,r=t.width!==e.width||t.height!==e.height;this.canvasSize={width:t.width,height:t.height},this.toggleAttribute("compact",t.width>0&&t.width<Fl),r&&(t.width>0&&t.height>0&&(this.pendingFitPadding!==null||!this.viewTouched)?this.fitPlanView(this.pendingFitPadding??void 0):this.requestUpdate("canvasSize",e))}willUpdate(t){if(super.willUpdate(t),t.has("project")&&(this.project!==this.localProject&&this.handleExternalProjectDuringGesture(t.get("project")),this.handleProjectReplaced(t.get("project"))),t.has("hass")&&Hr(t.get("hass"),this.hass,this.watchedEntities())&&this.entityRevision++,(t.has("hass")||t.has("theme"))&&this.applyColorScheme(),t.has("animations")&&this.toggleAttribute("no-animations",!this.animations),t.has("is3DMode")&&t.get("is3DMode")!==void 0)if(this.is3DMode){const e={pitchDeg:this.orbitPitch,yawDeg:this.orbitYaw};this.orbitPitch=0,this.orbitYaw=this.viewRotation,this.animateCamera(e)}else this.finishCameraAnimation();if(t.has("is3DMode")&&this.is3DMode&&this.enterView3D(),t.has("activeTool")&&this.resetToolState(),(t.has("is3DMode")||t.has("interactive")||t.has("readOnly")||t.has("isDashboardMode"))&&!this.canEdit2D&&(this.interaction.kind!=="gesture"&&this.interaction.kind!=="pan"&&this.interaction.kind!=="orbit"&&this.cancelInteraction(),this.resetToolState()),t.has("project")||t.has("selectedElements")){const e=xc(this.selectedElements,this.project);e!==this.selectedElements&&(this.selectedElements=e,this.selectionPruned=!0)}}updated(t){super.updated(t),this.selectionPruned&&(this.selectionPruned=!1,this.dispatchSelectionChanged()),t.has("isDashboardMode")&&this.syncKeyboardSupport(),this.paintCoords(),this.canvasHudDrag.applyStoredPosition(),this.coordsHudDrag.applyStoredPosition(),this.helpHudDrag.applyStoredPosition(),this.compassHudDrag.applyStoredPosition()}applyColorScheme(){const t=this.hass?.themes?.darkMode,e=this.theme!=="light"&&this.theme!=="dark"&&typeof t=="boolean";this.colorScheme=this.theme==="light"||e&&t===!1?"light":"dark",this.setAttribute("scheme",this.colorScheme),this.toggleAttribute("follow-theme",e)}paintCoords(){const t=this.renderRoot;if(!t?.querySelector)return;const e=t.querySelector(".coords-x"),r=t.querySelector(".coords-y");e&&(e.textContent=`${this.cursorCoords.x.toFixed(2)} m`),r&&(r.textContent=`${this.cursorCoords.y.toFixed(2)} m`)}animateCamera(t){if(this.stopCameraAnimation(),!this.animations||Wl()||typeof requestAnimationFrame!="function"){this.orbitPitch=t.pitchDeg,this.orbitYaw=t.yawDeg;return}const e=this.orbitPitch,r=this.orbitYaw,i=wl(r,t.yawDeg),o=performance.now(),s=a=>{const c=Math.min(1,(a-o)/jl),l=1-Math.pow(1-c,3);this.orbitPitch=e+(t.pitchDeg-e)*l,this.orbitYaw=c<1?r+i*l:t.yawDeg,c<1?this.cameraAnimation=requestAnimationFrame(s):(this.cameraAnimation=null,this.cameraTarget=null)};this.cameraTarget=t,this.cameraAnimation=requestAnimationFrame(s)}stopCameraAnimation(){this.cameraAnimation!==null&&cancelAnimationFrame(this.cameraAnimation),this.cameraAnimation=null,this.cameraTarget=null}finishCameraAnimation(){const t=this.cameraTarget;this.stopCameraAnimation(),t&&(this.orbitPitch=t.pitchDeg,this.orbitYaw=t.yawDeg)}enterView3D(){if(Dl()){this.activateView3D();return}this.view3d!=="loading"&&(this.view3d="loading",Cl().then(()=>{this.view3d==="loading"&&(this.is3DMode?this.activateView3D():this.view3d="idle")},t=>{this.view3d="fallback",t instanceof Error&&this.is3DMode&&this.flashHint(t.message)}))}activateView3D(){const t=this.cameraTarget??{pitchDeg:this.orbitPitch,yawDeg:this.orbitYaw},e=this.cameraAnimation!==null?{pitchDeg:this.orbitPitch,yawDeg:this.orbitYaw}:null;this.stopCameraAnimation(),this.orbitPitch=t.pitchDeg,this.orbitYaw=t.yawDeg,this.view3dIntro={from:e,to:t},this.view3d="ready"}handleView3DError(t){Il(t.detail.message),this.view3d="fallback",this.flashHint(t.detail.message)}handleView3DCamera(t){this.orbitPitch=t.detail.pitchDeg,this.orbitYaw=t.detail.yawDeg,this.view3dZoom=t.detail.zoom}handleView3DHover(t){this.cursorCoords={x:A.roundMeters(t.detail.point.x),y:A.roundMeters(t.detail.point.y)},this.paintCoords()}handleView3DHint(t){this.flashHint(t.detail.message)}handleView3DPick(t){const{ref:e,modifier:r,double:i}=t.detail;if(!e){this.canSelect&&!r&&this.setSelection(st());return}if(!this.selectsElements)return;if(i){if(e.kind==="binding"){const s=this.project.bindings.find(a=>a.id===e.id);s&&this.openMoreInfo(s.entityId)}else if(e.kind==="room"&&this.activeTool==="select"){const s=this.project.rooms.find(a=>a.id===e.id);s&&this.emitRoomSelected(s)}return}const o=this.selectedElements;this.setSelection(r?Ye(o,e)?qe(o,e):Be(o,e):dt(e))}handleProjectReplaced(t){const e=this.project;if(!t||t.id!==e.id){this.endInteraction(),this.resetToolState(),this.viewTouched=!1,this.fitPlanView();return}if(this.viewTouched||this.isOwnEdit(e))return;(e.walls!==t.walls||e.rooms!==t.rooms||e.bindings!==t.bindings||e.furniture!==t.furniture||e.background!==t.background)&&(e.revision!==t.revision||!ri(t))&&this.fitPlanView()}handleExternalProjectDuringGesture(t){const e=this.interaction;if("base"in e){if(t===e.base){e.base=this.project;return}this.clearPreview(),this.endInteraction()}}isOwnEdit(t){const e=this.lastEmittedProject;if(!e)return!1;const r=t.furniture===e.furniture||(t.furniture?.length??0)===0&&(e.furniture?.length??0)===0;return t.walls===e.walls&&t.rooms===e.rooms&&t.bindings===e.bindings&&t.openings===e.openings&&r}dispatchProjectChanged(){this.lastEmittedProject=this.project,this.dispatchEvent(new CustomEvent("project-changed",{detail:{project:this.project},bubbles:!0,composed:!0}))}commitProject(t){this.setLocalProject(t),this.dispatchProjectChanged()}setLocalProject(t){this.localProject=t,this.project=t}watchedEntities(){const t=this.watchedEntityIds(this.project.bindings,this.is3DMode?this.project.openings:Kl);return this.is3DMode?[...t,"sun.sun"]:t}renderBackgroundLayer(){const t=this.project.background,e=this.backgroundSrc||t?.imageUrl;if(!t||!e||!t.visible)return v;const r=this.screenPpm,i=t.offset||{x:0,y:0},o=t.scale||1;return $`
      <g
        class="background-image-layer"
        transform="translate(${i.x*r}, ${i.y*r}) scale(${this.viewport.zoom*o})"
        opacity=${t.opacity}
      >
        <image href=${e} x="0" y="0" width=${t.widthPx||1200} height=${t.heightPx||900} />
      </g>
    `}renderGhostLayer(){const t=this.ghostProject;if(!t?.walls?.length)return v;const e=this.screenPpm;return $`
      <g class="ghost-layer" opacity="0.45" pointer-events="none">
        ${t.walls.map(r=>$`
          <line class="ghost-wall" x1=${r.start.x*e} y1=${r.start.y*e} x2=${r.end.x*e} y2=${r.end.y*e} />
        `)}
      </g>
    `}renderGrid(){if(this.is3DMode)return this.renderGround3D();const e=(this.project.grid.size>0?this.project.grid.size:.5)*this.screenPpm;if(e<12)return v;const r=e*2;return $`
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
    `}renderGround3D(){const{x:t,y:e}=this.viewport,r=this.screenPpm,i=this.planBounds(this.project),o=i?{cx:(i.minX+i.maxX)/2*r+t,cy:(i.minY+i.maxY)/2*r+e,rx:((i.maxX-i.minX)/2+1.5)*r,ry:((i.maxY-i.minY)/2+1.5)*r}:{cx:t+300,cy:e+200,rx:900,ry:550};return $`
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
    `}renderRooms(t){const e=this.screenPpm,r=new Set(this.selectedElements.roomIds);return this.project.rooms.map(i=>{if(!i.polygon||i.polygon.length<3)return v;const o=tt(i.polygon.map(l=>({x:l.x*e,y:l.y*e}))),s=t.get(i.id),a=s?.fill??i.color,c=r.has(i.id);return $`
        <g
          class="room-group ${c?"selected":""}"
          data-room-id=${i.id}
          @pointerdown=${l=>this.handleElementPointerDown({kind:"room",id:i.id},l)}
          @dblclick=${l=>this.handleRoomDblClick(l,i)}
        >
          ${s?.illuminated?$`<polygon class="room-glow" points=${o} />`:v}
          <polygon
            class="room-polygon ${s?.illuminated?"illuminated":""}"
            points=${o}
            style=${Xn(a?{"--room-fill":a}:{})}
          />
        </g>
      `})}renderRoomLabels(t){const e=this.screenPpm;return this.project.rooms.map(r=>{if(!r.polygon||r.polygon.length<3)return v;const i=q.labelPoint(r.polygon),o=t.get(r.id)?.temperature??null;return $`
        <g class="room-label-group" transform="translate(${i.x*e}, ${i.y*e})">
          <text class="room-label-name" y=${o?-10:-6}>${r.name}</text>
          <text class="room-label-area" y=${o?6:12}>${r.areaM2.toFixed(1)} m²</text>
          ${o?$`<text class="room-label-temp" y="21">🌡️ ${Mn(o,this.hass)}</text>`:v}
        </g>
      `})}renderRoomBadges3D(t,e){const r=new Set(this.selectedElements.roomIds),i=this.project.defaultCeilingHeight||2.5;return this.project.rooms.map(o=>{if(!o.polygon||o.polygon.length<3)return v;const s=it(this.worldToScreen(q.labelPoint(o.polygon)),0,t,e),a=o.height||i;return $`
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
      `})}renderFurniture(){const t=this.screenPpm,e=new Set(this.selectedElements.furnitureIds??[]),r=this.canEdit?" – Touche R pour pivoter":"";return(this.project.furniture||[]).map(i=>{const o=Z(i.type),s=i.width||o?.width||1,a=i.length||o?.length||1,c=e.has(i.id);return $`
        <g
          class="furniture-group ${c?"selected":""}"
          data-furniture-id=${i.id}
          transform="translate(${i.position.x*t}, ${i.position.y*t}) rotate(${i.rotation||0})"
          @pointerdown=${l=>this.handleElementPointerDown({kind:"furniture",id:i.id},l)}
        >
          <title>${Ms(i)} (${s.toFixed(2)} × ${a.toFixed(2)} m)${r}</title>
          ${Ds(i,{pixelsPerMeter:t,selected:c})}
        </g>
      `})}renderWalls2D(){const t=this.screenPpm,e=this.wallPolygons(this.project.walls),r=new Set(this.selectedElements.wallIds),i=o=>tt(o.map(s=>({x:s.x*t,y:s.y*t})));return $`
      <g class="walls-outline">
        ${this.project.walls.map(o=>{const s=e.get(o.id);return s?$`<polygon class="wall-outline" points=${i(s)} />`:v})}
      </g>
      ${this.project.walls.map(o=>{const s=e.get(o.id),a={x:o.start.x*t,y:o.start.y*t},c={x:o.end.x*t,y:o.end.y*t},l=A.distance(o.start,o.end),h=Math.hypot(c.x-a.x,c.y-a.y)||1,u=-(c.y-a.y)/h,p=(c.x-a.x)/h,f={x:(a.x+c.x)/2,y:(a.y+c.y)/2};return $`
          <g
            class="wall-element ${r.has(o.id)?"selected":""}"
            data-wall-id=${o.id}
            @pointerdown=${d=>this.handleElementPointerDown({kind:"wall",id:o.id},d)}
          >
            ${s?$`<polygon class="wall-rect" points=${i(s)} />`:v}
            <line class="wall-centerline" x1=${a.x} y1=${a.y} x2=${c.x} y2=${c.y} />
            ${this.showDimensions&&l>=.4?$`
              <g class="wall-dim-badge" transform="translate(${f.x+u*14}, ${f.y+p*14})">
                <rect x="-24" y="-9" width="48" height="18" />
                <text>${A.roundMeters(l).toFixed(2)} m</text>
              </g>
            `:v}
          </g>
        `})}
    `}faceColors(t,e){const r=this.colorScheme==="light";if(e)return{fill:`hsl(192, 85%, ${Math.round((r?52:42)+t*14)}%)`,stroke:r?"#0891b2":"#38bdf8"};const i=r?16:22,o=Math.round(r?70+t*12:34+t*16);return{fill:`hsl(215, ${i}%, ${o}%)`,stroke:`hsl(215, ${i}%, ${o+(r?-12:6)}%)`}}renderWalls3D(t){const e=this.project,r=this.wallScene(e.walls,e.openings,e.rooms,e.defaultCeilingHeight,this.viewport,this.ppm,this.orbitPitch,this.orbitYaw,t.width,t.height),i=new Set(this.selectedElements.wallIds),o=new Set(this.selectedElements.openingIds);return $`
      <g class="walls-3d">
        ${r.map(s=>{const a=i.has(s.wallId),c=h=>this.handleElementPointerDown({kind:"wall",id:s.wallId},h);if(s.kind==="cap")return $`<polygon class="wall-cap-3d ${a?"selected":""}" points=${tt(s.points)} @pointerdown=${c} />`;const l=this.faceColors(s.shade,a);return $`
            <polygon
              class="wall-face-3d ${a?"selected":""}"
              points=${tt(s.points)}
              fill=${l.fill}
              stroke=${l.stroke}
              @pointerdown=${c}
            />
            ${s.panels.map(h=>$`
              <polygon
                class="opening-3d ${h.type} ${o.has(h.openingId)?"selected":""}"
                points=${tt(h.points)}
                @pointerdown=${u=>this.handleElementPointerDown({kind:"opening",id:h.openingId},u)}
              />
            `)}
          `})}
      </g>
    `}sashCountFor(t){return t==="window"?this.windowSashCount||1:t==="french_window"?2:1}renderOpenings(){const t=this.screenPpm,e=new Map(this.project.walls.map(i=>[i.id,i])),r=new Set(this.selectedElements.openingIds);return this.project.openings.map(i=>{const o=e.get(i.wallId);if(!o)return v;const s=o.end.x-o.start.x,a=o.end.y-o.start.y,c=Math.hypot(s,a);if(c===0)return v;const l=(o.start.x+i.offset/c*s)*t,h=(o.start.y+i.offset/c*a)*t,u=Math.atan2(a,s)*180/Math.PI;return $`
        <g
          class="opening-element ${r.has(i.id)?"selected":""}"
          transform="translate(${l}, ${h}) rotate(${u})"
          @pointerdown=${p=>this.handleElementPointerDown({kind:"opening",id:i.id},p)}
        >
          ${this.renderOpeningSymbol(i,o.thickness,t,!0)}
        </g>
      `})}renderOpeningSymbol(t,e,r,i){return ml(t,e,1/r).filter(o=>i||o.role!=="cutout").map(o=>{switch(o.kind){case"rect":return $`<rect class="opening-${o.role}" x=${o.x*r} y=${o.y*r} width=${o.w*r} height=${o.h*r} />`;case"line":return $`<line class="opening-${o.role}" x1=${o.x1*r} y1=${o.y1*r} x2=${o.x2*r} y2=${o.y2*r} />`;case"arc":return $`<path class="opening-${o.role}" d="M ${o.x1*r} ${o.y1*r} A ${o.r*r} ${o.r*r} 0 0 ${o.sweep} ${o.x2*r} ${o.y2*r}" />`}})}renderPins2D(t){const e=this.screenPpm;return this.displayableBindings(this.project.bindings).map(r=>{const i=t.get(r.id);return i?this.renderPin(r,i,r.position.x*e,r.position.y*e):v})}renderPins3D(t,e,r){return this.displayableBindings(this.project.bindings).map(i=>({binding:i,at:it(this.worldToScreen(i.position),0,e,r)})).sort((i,o)=>i.at.y-o.at.y).map(({binding:i,at:o})=>{const s=t.get(i.id);return s?this.renderPin(i,s,o.x,o.y):v})}renderPin(t,e,r,i){const o=this.isDashboardMode||this.canSelect,s=`${e.name} : ${e.stateText}`,a={"entity-pin":!0,selected:this.selectedElements.bindingIds.includes(t.id),"active-light":e.lightOn,"active-radar":e.radar,orphan:e.orphan},c=e.badge?Math.max(28,e.badge.length*5.6+8):0;return $`
      <g
        class=${qn(a)}
        transform="translate(${r}, ${i})"
        role=${o?"button":v}
        tabindex=${o?0:v}
        aria-label=${s}
        @pointerdown=${l=>this.handlePinPointerDown(t,l)}
        @click=${l=>this.handlePinClick(t,l)}
        @dblclick=${l=>this.handlePinDblClick(t,l)}
        @keydown=${l=>this.handlePinKeyDown(t,l)}
        @contextmenu=${l=>this.handlePinContextMenu(l)}
      >
        <title>${s}</title>
        ${e.lightOn?$`<circle class="pin-glow" cx="0" cy="0" r="22" />`:v}
        <!-- Anneau animé si mouvement ou présence détectés ; ondes pour un lecteur multimédia actif -->
        ${e.radar?$`<circle class="radar-pulse-ring" cx="0" cy="0" r="16" />`:v}
        ${e.playing?$`<circle class="soundwave-pulse" cx="0" cy="0" r="16" />`:v}
        <circle class="entity-pin-bg" cx="0" cy="0" r="16" />
        <text class="entity-pin-icon ${e.fanOn?"fan-spin":""}" x="0" y="0">${e.icon}</text>
        <text class="entity-pin-label" x="0" y="27">${e.name}</text>
        <text class="entity-pin-state state-${e.status}" x="0" y="38">${e.stateText}</text>
        ${e.badge&&!e.unavailable?$`
          <g class="entity-pin-value-badge" transform="translate(${14+(c-28)/2}, -14)">
            <rect x=${-c/2} y="-8" width=${c} height="16" />
            <text>${e.badge}</text>
          </g>
        `:v}
      </g>
    `}renderOpeningPreview(){const t=this.wallSnap,e=this.openingFit,r=this.currentOpeningType();if(!t||!e||!r||!this.canEdit2D)return v;const i=this.screenPpm,o=t.wall,s=A.wallLength(o)||1,a={x:o.start.x+(o.end.x-o.start.x)*e.offset/s,y:o.start.y+(o.end.y-o.start.y)*e.offset/s},c=this.worldToScreen(a),l=t.angleRad*180/Math.PI,h=!e.fits||e.overlaps.length>0,u=e.width*i,p=o.thickness*i,f={type:r,width:e.width,flipSide:this.openingFlipSide,flipDirection:this.openingFlipDirection,sashCount:this.sashCountFor(r)};return $`
      <g
        class="opening-preview ${h?"invalid":""}"
        transform="translate(${c.x}, ${c.y}) rotate(${l})"
      >
        <rect class="opening-preview-body" x=${-u/2} y=${-p/2} width=${u} height=${p} stroke-dasharray="4, 2" />
        ${this.renderOpeningSymbol(f,o.thickness,i,!1)}
      </g>
    `}renderPreviewWall(){if(!this.drawingWallStart||!this.previewPoint||this.activeTool!=="wall")return v;const t=this.drawingWallStart,e=this.previewPoint,r=Se([{id:"preview",start:t,end:e,thickness:this.currentWallThickness,type:"standard"}]).get("preview"),i=this.worldToScreen(t),o=this.worldToScreen(e),s=A.distance(t,e),a={x:(i.x+o.x)/2,y:(i.y+o.y)/2};return $`
      <g class="preview-wall-group">
        ${r?$`<polygon points=${tt(r.map(c=>this.worldToScreen(c)))} class="preview-wall-rect" />`:v}
        <line x1=${i.x} y1=${i.y} x2=${o.x} y2=${o.y} class="preview-wall-line" />

        ${this.snapInfo.guideAngle!==void 0?$`
          <line x1=${i.x} y1=${i.y} x2=${o.x} y2=${o.y} class="angle-guide-line" />
        `:v}

        <g class="dimension-badge" transform="translate(${a.x}, ${a.y-16})">
          <rect x="-30" y="-11" width="60" height="22" />
          <text>${A.roundMeters(s).toFixed(2)} m</text>
        </g>
      </g>
    `}renderRoomDraft(){const t=this.roomDraft;if(this.activeTool!=="room"||t.length===0)return v;const e=t.map(c=>this.worldToScreen(c)),r=this.previewPoint?this.worldToScreen(this.previewPoint):null,i=[...e,...r?[r]:[]],o=e[0],s=t.length>=3,a=s?q.computeArea(this.previewPoint?[...t,this.previewPoint]:t):0;return $`
      <g class="room-draft-group" pointer-events="none">
        ${s?$`<polygon class="room-draft-fill" points=${tt(i)} />`:v}
        <polyline class="room-draft-line" points=${tt(i)} />
        ${r&&s?$`
          <line class="room-draft-closing" x1=${r.x} y1=${r.y} x2=${o.x} y2=${o.y} />
        `:v}
        ${e.map((c,l)=>$`<circle class="room-draft-vertex ${l===0?"first":""}" cx=${c.x} cy=${c.y} r=${l===0&&s?7:4.5} />`)}
        ${s?$`
          <g class="dimension-badge" transform="translate(${o.x}, ${o.y-20})">
            <rect x="-34" y="-11" width="68" height="22" />
            <text>${a.toFixed(2)} m²</text>
          </g>
        `:v}
      </g>
    `}renderRectRoomPreview(){if(this.activeTool!=="rect_room"||!this.rectStart||!this.rectCurrent)return v;const t=Cr(this.rectStart,this.rectCurrent).map(o=>this.worldToScreen(o)),e=Math.abs(this.rectCurrent.x-this.rectStart.x),r=Math.abs(this.rectCurrent.y-this.rectStart.y),i={x:(t[0].x+t[2].x)/2,y:(t[0].y+t[2].y)/2};return $`
      <g class="room-draft-group" pointer-events="none">
        <polygon class="room-draft-fill" points=${tt(t)} />
        <polygon class="room-draft-line" points=${tt(t)} />
        ${e>0||r>0?$`
          <g class="dimension-badge" transform="translate(${i.x}, ${i.y})">
            <rect x="-48" y="-11" width="96" height="22" />
            <text>${e.toFixed(2)} × ${r.toFixed(2)} m</text>
          </g>
        `:v}
      </g>
    `}renderCalibrationLine(){if(!this.calibrateStart||!this.calibrateCurrent)return v;const t=this.worldToScreen(this.calibrateStart),e=this.worldToScreen(this.calibrateCurrent),r=A.distance(this.calibrateStart,this.calibrateCurrent),i={x:(t.x+e.x)/2,y:(t.y+e.y)/2};return $`
      <g class="calibration-preview-group">
        <line x1=${t.x} y1=${t.y} x2=${e.x} y2=${e.y} class="calibration-line" />
        <circle cx=${t.x} cy=${t.y} r="6" class="calibration-endpoint" />
        <circle cx=${e.x} cy=${e.y} r="6" class="calibration-endpoint" />

        <g class="dimension-badge calibration" transform="translate(${i.x}, ${i.y-18})">
          <rect x="-35" y="-11" width="70" height="22" />
          <text>${r.toFixed(2)} m</text>
        </g>
      </g>
    `}renderRescaleLine(){if(!this.rescaleStart||!this.rescaleCurrent)return v;const t=this.worldToScreen(this.rescaleStart),e=this.worldToScreen(this.rescaleCurrent),r=A.distance(this.rescaleStart,this.rescaleCurrent),i={x:(t.x+e.x)/2,y:(t.y+e.y)/2};return $`
      <g class="rescale-preview-group">
        <line class="rescale-line" x1=${t.x} y1=${t.y} x2=${e.x} y2=${e.y} />
        <circle class="rescale-start" cx=${t.x} cy=${t.y} r="6" />
        <circle class="rescale-end" cx=${e.x} cy=${e.y} r="6" />

        <g class="dimension-badge rescale" transform="translate(${i.x}, ${i.y-18})">
          <rect x="-48" y="-13" width="96" height="26" />
          <text>📐 ${r.toFixed(3)} m</text>
        </g>
      </g>
    `}renderSmartGuides(){const{smartGuideX:t,smartGuideY:e}=this.snapInfo;if(t===void 0&&e===void 0)return v;const r=t!==void 0?this.worldToScreen({x:t,y:0}).x:0,i=e!==void 0?this.worldToScreen({x:0,y:e}).y:0;return $`
      <g class="smart-guides-group" pointer-events="none">
        ${t!==void 0?$`<line x1=${r} y1="-10000" x2=${r} y2="10000" class="smart-guide-line" />`:v}
        ${e!==void 0?$`<line x1="-10000" y1=${i} x2="10000" y2=${i} class="smart-guide-line" />`:v}
      </g>
    `}renderFurnitureHandles(){if(!this.canEdit2D)return null;const t=this.screenPpm,e=new Set(this.selectedElements.furnitureIds??[]);return(this.project.furniture||[]).filter(r=>e.has(r.id)).map(r=>{const i=Z(r.type),o=this.worldToScreen(r.position),s=r.width||i?.width||1,a=r.length||i?.length||1,c=s*t,l=a*t,h=r.rotation||0,u=`${s.toFixed(2)}×${a.toFixed(2)}m`;return $`
        <g class="furniture-handles" transform="translate(${o.x}, ${o.y}) rotate(${h})">
          <!-- Ligne de rappel vers la poignée de rotation -->
          <line class="handle-guide" x1="0" y1="${-l/2}" x2="0" y2="${-l/2-18}" />
          <!-- Poignée interactive de rotation degré par degré -->
          <g
            class="furniture-rotate-handle"
            @pointerdown=${p=>this.handleFurnitureRotatePointerDown(r,p)}
          >
            <!-- Zone cliquable invisible élargie -->
            <circle class="handle-hit" cx="0" cy="${-l/2-18}" r="12" />
            <!-- Petit rond bleu clair visible avec contour blanc -->
            <circle class="handle-knob" cx="0" cy="${-l/2-18}" r="6.5" stroke-width="2" />
            <!-- Indicateur d'angle en direct quand le meuble est sélectionné -->
            <text class="handle-angle" x="0" y="${-l/2-28}">${Math.round(h)}°</text>
          </g>

          <!-- Poignée interactive d'étirement / redimensionnement en bas à droite -->
          <g
            class="furniture-resize-handle"
            @pointerdown=${p=>this.handleFurnitureResizePointerDown(r,p)}
          >
            <!-- Zone cliquable invisible élargie -->
            <rect class="handle-hit" x="${c/2-6}" y="${l/2-6}" width="20" height="20" />
            <!-- Poignée carrée aux coins légèrement arrondis avec bordure blanche -->
            <rect class="handle-knob" x="${c/2-2}" y="${l/2-2}" width="11" height="11" rx="2.5" stroke-width="1.8" />
            <!-- 2 stries diagonales symbolisant le grip de redimensionnement -->
            <line class="handle-grip" x1="${c/2+2}" y1="${l/2+7}" x2="${c/2+7}" y2="${l/2+2}" />
            <line class="handle-grip" x1="${c/2+5}" y1="${l/2+7}" x2="${c/2+7}" y2="${l/2+5}" />

            <!-- Badge des dimensions actuelles en bas à droite -->
            <g class="handle-size-badge" transform="translate(${c/2+14}, ${l/2+16})">
              <rect x="-2" y="-9" width="${u.length*6.5+8}" height="14" rx="3" />
              <text class="handle-size-text" x="2" y="1.5">${u}</text>
            </g>
          </g>
        </g>
      `})}renderSelectionHandles(){if(!this.canEdit2D||this.activeTool!=="select")return null;const t=this.selectedElements;if(Xe(t)!==1)return null;if(t.wallIds.length===1){const r=this.project.walls.find(i=>i.id===t.wallIds[0]);return r?$`
        <g class="selection-handles">
          ${["start","end"].map(i=>{const o=this.worldToScreen(r[i]);return $`
              <g class="wall-endpoint-handle" @pointerdown=${s=>this.handleWallEndpointPointerDown(r,i,s)}>
                <circle cx="${o.x}" cy="${o.y}" r="12" fill="transparent" />
                <circle class="handle-dot" cx="${o.x}" cy="${o.y}" r="6" />
              </g>
            `})}
        </g>
      `:null}if(t.roomIds.length===1){const r=this.project.rooms.find(i=>i.id===t.roomIds[0]);return r?$`
        <g class="selection-handles">
          ${r.polygon.map((i,o)=>{const s=this.worldToScreen(i);return $`
              <g class="room-vertex-handle" @pointerdown=${a=>this.handleRoomVertexPointerDown(r,o,a)}>
                <circle cx="${s.x}" cy="${s.y}" r="11" fill="transparent" />
                <rect class="handle-dot" x="${s.x-5}" y="${s.y-5}" width="10" height="10" rx="2" />
              </g>
            `})}
        </g>
      `:null}return null}renderSnapIndicator(){if(!this.previewPoint||this.snapInfo.snappedTo==="none")return null;const t=this.worldToScreen(this.previewPoint),e=this.snapInfo.snappedTo;if(e==="midpoint")return $`
        <g transform="translate(${t.x}, ${t.y})" pointer-events="none">
          <polygon points="0,-7 7,5 -7,5" class="snap-indicator" />
        </g>
      `;if(e==="wall")return $`
        <g transform="translate(${t.x}, ${t.y})" pointer-events="none">
          <rect x="-5.5" y="-5.5" width="11" height="11" class="snap-indicator" />
        </g>
      `;const r=e==="vertex";return $`
      <g transform="translate(${t.x}, ${t.y})" pointer-events="none">
        <circle r="${r?7:5}" class="snap-indicator" />
        ${r?$`<circle r="2" class="snap-indicator-dot" />`:null}
      </g>
    `}renderMarqueeBox(){if(!this.marqueeStart||!this.marqueeCurrent)return null;const t=this.worldToScreen(this.marqueeStart),e=this.worldToScreen(this.marqueeCurrent),r=Math.min(t.x,e.x),i=Math.min(t.y,e.y),o=Math.abs(t.x-e.x),s=Math.abs(t.y-e.y);return $`
      <rect
        class="marquee-selection-box"
        x="${r}"
        y="${i}"
        width="${o}"
        height="${s}"
      />
    `}rotateQuarterTurn(){const t=this.view3dElement;if(t)t.rotateQuarterTurn();else if(this.is3DMode){const e=this.cameraTarget??{pitchDeg:this.orbitPitch,yawDeg:this.orbitYaw};this.animateCamera({pitchDeg:e.pitchDeg,yawDeg:(e.yawDeg-90)%360})}else this.viewRotation-=90,this.fitPlanView()}fitToScreen(t=60){this.fitPlanView(t),this.view3dElement?.fitToView()}fitPlanView(t=60){const e=this.measuredSize();if(!e){this.pendingFitPadding=t;return}if(this.pendingFitPadding=null,this.viewTouched=!1,!ri(this.project)){this.viewport={x:e.width/2,y:e.height/2,zoom:hc(this.ppm)};return}const r=wr.calculateBoundingBox(this.project,.6);this.viewport=pc(r,this.ppm,e,this.is3DMode?0:this.viewRotation,t)}resetView(){this.viewRotation=0,this.fitPlanView(),this.view3dElement?.resetView()}fitView(){const t=this.view3dElement;t?t.fitToView():this.fitPlanView(40)}toggle3DMode(){this.dispatchEvent(new CustomEvent("toggle-3d",{detail:{is3DMode:!this.is3DMode},bubbles:!0,composed:!0}))}getHelpMessage(){return this.isDashboardMode||!this.interactive?null:this.pendingPlacement&&this.canEdit2D?"Touchez le plan à l'endroit voulu pour placer l'élément (Échap pour annuler).":this.webgl3D?this.walkthrough3D?"Visite virtuelle : Touches ZQSD / Flèches pour vous déplacer, glisser pour regarder à 360°, Shift pour courir. Cliquez sur 🚶 pour revenir en vue aérienne.":"Vue 3D : glisser pour pivoter, clic droit ou Maj+glisser pour déplacer, molette pour zoomer. 🚶 : Visite virtuelle, ✂️ : Couper les murs, ☀️/🌙 : Ambiance lumineuse.":this.is3DMode?`${this.view3d==="fallback"?"Vue 3D simplifiée":"Vue 3D Interactive"} : Glisser (clic gauche/droit) pour pivoter 360°, Molette pour zoomer, Shift+glisser pour déplacer. Édition en vue 2D.`:this.readOnly?"Lecture seule : vous pouvez parcourir et sélectionner, mais pas modifier le plan.":this.activeTool==="select"?"Mode Sélection : Cliquez sur un élément pour le sélectionner (Shift pour multi-sélection, Shift+glisser pour cadre). Glissez pour déplacer, flèches pour ajuster au cm. Suppr pour effacer.":this.activeTool==="wall"?this.drawingWallStart?"Cliquez pour terminer le mur (double-clic ou Échap pour arrêter). Alt : sans accrochage.":"Cliquez pour démarrer un mur. Alt : sans accrochage.":this.activeTool==="room"?this.roomDraft.length>=3?"Cliquez l'angle suivant. Double-clic, Entrée ou clic sur le 1er angle pour fermer la pièce.":"Pièce libre : cliquez chaque angle de la pièce. Alt : sans accrochage.":this.activeTool==="rect_room"?this.rectStart?"Cliquez ou relâchez sur l'angle opposé de la pièce.":"Pièce rectangulaire : glissez d'un angle à l'angle opposé (ou cliquez les deux angles).":this.activeTool==="door"?"Survolez un mur. Espace = inverser intérieur/extérieur. F = gauche/droite.":this.activeTool==="window"||this.activeTool==="french_window"?"Survolez un mur pour insérer la fenêtre.":this.activeTool==="calibrate"?this.calibrateStart?"Cliquez sur la 2ème extrémité du mur mesuré.":"Tracez un segment sur un mur pour étalonner l'échelle.":this.activeTool==="rescale"?this.rescaleStart?"Tracez la ligne jusqu'au 2ème point (autre extrémité du mur ou point de référence).":"Mettre à l'échelle : Sélectionnez un mur ou cliquez sur le 1er point de mesure.":null}renderControls(){const t=this.is3DMode;return K`
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
        ${Ke(this.canvasHudDrag,"Déplacer les contrôles de la vue")}
        <button
          class="hud-btn ${t?"active":""}"
          @click=${this.toggle3DMode}
          title="Basculer Vue 2D / 3D Isométrique"
          aria-label="Vue 3D"
          aria-pressed=${t?"true":"false"}
        >
          ${t?"🧊":"📐"}
        </button>

        ${this.webgl3D?K`
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
        `:v}

        ${t?K`
          <div class="hud-preset-group" role="group" aria-label="Préréglages de la caméra 3D">
            <span class="hud-angle-badge" aria-hidden="true">${Math.round(this.orbitYaw)}° / ${Math.round(this.orbitPitch)}°</span>
            ${zl.map(e=>K`
              <button
                class="hud-preset-btn"
                @click=${()=>this.setCameraPreset(e.camera.pitchDeg,e.camera.yawDeg)}
                title=${e.title}
                aria-label=${e.title}
              >${e.label}</button>
            `)}
          </div>
        `:v}

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
        <div class="hud-zoom-label">${Math.round((this.webgl3D?this.view3dZoom:uc(this.viewport.zoom,this.ppm))*100)}%</div>
        <button class="hud-btn" @click=${this.zoomIn} title="Zoom Avant" aria-label="Zoom avant">+</button>
        <button class="hud-btn" @click=${this.resetView} title="Recentrer" aria-label="Recentrer la vue">⌖</button>
      </div>
    `}renderScene2D(t,e,r){const i=this.screenPpm,o=`translate(${this.viewport.x}, ${this.viewport.y})`,s=this.displayableBindings(this.project.bindings);return $`
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
        ${ht([s,i,t,this.selectedElements,this.isDashboardMode,this.canSelect],()=>this.renderPins2D(t))}
      </g>
      ${this.renderFurnitureHandles()}
      ${this.renderSelectionHandles()}
      ${this.renderMarqueeBox()}
    `}renderScene3D(t,e,r,i){const o=this.camera,s=At(i),[a,c,l,h,u,p]=bl(o,s);return $`
      <g class="camera-3d" transform="matrix(${a} ${c} ${l} ${h} ${u} ${p})">
        ${e}
        ${r}
      </g>
      ${this.renderWalls3D(i)}
      ${this.renderRoomBadges3D(o,s)}
      ${this.renderPins3D(t,o,s)}
    `}renderView3D(){return K`
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
    `}renderSvgViewport(t){const e=t.width/2,r=t.height/2,i=this.is3DMode,o=this.project,s=this.screenPpm,a=this.selectedElements,c=`translate(${this.viewport.x}, ${this.viewport.y})`,l=this.displayableBindings(o.bindings),h=this.roomLooks(o.rooms,l,this.showThermalHeatmap,this.entityRevision),u=this.pinViews(l,this.entityRevision),p=$`
      <g class="plan-layer" transform=${c}>
        ${ht([o.background,this.backgroundSrc,s,this.viewport.zoom],()=>this.renderBackgroundLayer())}
        ${ht([this.ghostProject,s],()=>this.renderGhostLayer())}
      </g>
      ${this.renderGrid()}
    `,f=$`
      <g class="plan-layer" transform=${c}>
        ${ht([o.rooms,s,h,a],()=>this.renderRooms(h))}
        ${ht([o.furniture,s,a,this.canEdit],()=>this.renderFurniture())}
        ${i?v:ht([o.walls,s,a,this.showDimensions],()=>this.renderWalls2D())}
        ${i?v:ht([o.openings,o.walls,s,a],()=>this.renderOpenings())}
        ${i?v:ht([o.rooms,s,h],()=>this.renderRoomLabels(h))}
      </g>
    `;return K`
      <div class="viewport-3d-wrapper ${i?"mode-3d":""}">
        <svg class="main-viewport">
          <!-- Rotation de vue 2D autour du centre du canevas ; transform-box et transition (0,35 s, coupée
               si les animations sont réduites) portés par la classe -->
          <g
            class="viewport-2d-rotator"
            style=${Xn(i?{}:{transform:`rotate(${this.viewRotation}deg)`,"transform-origin":`${e}px ${r}px`})}
          >
            ${i?this.renderScene3D(u,p,f,t):this.renderScene2D(u,p,f)}
          </g>
        </svg>
      </div>
    `}handleCompassClick(t){t.stopPropagation(),!this.compassHudDrag.hasMoved&&this.dispatchEvent(new CustomEvent("open-orientation",{bubbles:!0,composed:!0}))}renderCompassWidget(){if(this.project.showCompass===!1)return v;const t=(Math.round(this.project.northAngle??0)%360+360)%360,e=fc(t);return K`
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
    `}render(){const t=this.getHelpMessage(),e=this.sizeOrFallback(),r=this.interaction,i=this.is3DMode,o=this.selectedElements,s={"canvas-container":!0,"is-panning":r.kind==="pan","is-orbiting":r.kind==="orbit","dashboard-mode":this.isDashboardMode,"mode-3d":i,"read-only":!this.canEdit,placing:!!this.pendingPlacement&&this.canEdit2D};return K`
      <div
        class=${qn(s)}
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
      ${t&&!this.hasToast?K`
        <div
          class="help-hud"
          style=${this.helpHudDrag.styleString}
          @pointerdown=${this.helpHudDrag.handlePointerDown}
          @pointermove=${this.helpHudDrag.handlePointerMove}
          @pointerup=${this.helpHudDrag.handlePointerUp}
          @pointercancel=${this.helpHudDrag.handlePointerUp}
        >
          ${Ke(this.helpHudDrag,"Déplacer le message d'aide")}
          <span>${t}</span>
        </div>
      `:v}

      <div class="canvas-hint" role="status" ?hidden=${!this.hint}>${this.hint??""}</div>

      ${this.renderCompassWidget()}

      ${!this.isDashboardMode&&!this.webgl3D?K`
        <div
          class="coords-hud ${Xe(o)>0?"selection-active":""}"
          style=${this.coordsHudDrag.styleString}
          @pointerdown=${this.coordsHudDrag.handlePointerDown}
          @pointermove=${this.coordsHudDrag.handlePointerMove}
          @pointerup=${this.coordsHudDrag.handlePointerUp}
          @pointercancel=${this.coordsHudDrag.handlePointerUp}
          aria-hidden="true"
        >
          ${Ke(this.coordsHudDrag,"Déplacer les coordonnées")}
          <span class="coords-key">X:</span>
          <span class="coords-x"></span>
          <span class="coords-sep">|</span>
          <span class="coords-key">Y:</span>
          <span class="coords-y"></span>
          <span class="coords-sep">|</span>
          <span class="coords-tool-key">Outil:</span>
          <span class="coords-tool">${this.activeTool.toUpperCase()}</span>
        </div>
      `:v}

      ${this.showControls?this.renderControls():v}
    `}},mt.styles=Zo,mt);S([F({type:Object})],M.prototype,"hass");S([F({type:Object})],M.prototype,"project");S([F({type:String})],M.prototype,"activeTool");S([F({type:Number})],M.prototype,"currentWallThickness");S([F({type:Number})],M.prototype,"currentOpeningWidth");S([F({type:Boolean})],M.prototype,"is3DMode");S([F({type:Object})],M.prototype,"selectedElements");S([F({type:Boolean,reflect:!0,attribute:"dashboard"})],M.prototype,"isDashboardMode");S([F({type:Boolean})],M.prototype,"interactive");S([F({type:Boolean})],M.prototype,"readOnly");S([F({type:Boolean})],M.prototype,"modalOpen");S([F({type:Boolean,attribute:"has-toast"})],M.prototype,"hasToast");S([F({attribute:!1})],M.prototype,"backgroundSrc");S([F({attribute:!1})],M.prototype,"pendingPlacement");S([F({type:Object})],M.prototype,"ghostProject");S([F({type:Boolean})],M.prototype,"showDimensions");S([F({type:Boolean})],M.prototype,"showThermalHeatmap");S([F({type:Boolean})],M.prototype,"openingFlipSide");S([F({type:Boolean})],M.prototype,"openingFlipDirection");S([F({type:Number})],M.prototype,"windowSashCount");S([F({type:Boolean})],M.prototype,"showControls");S([F({type:Boolean})],M.prototype,"animations");S([F({type:String})],M.prototype,"theme");S([F({type:Boolean})],M.prototype,"shadows");S([j()],M.prototype,"viewport");S([j()],M.prototype,"interaction");S([j()],M.prototype,"marqueeStart");S([j()],M.prototype,"marqueeCurrent");S([j()],M.prototype,"drawingWallStart");S([j()],M.prototype,"previewPoint");S([j()],M.prototype,"snapInfo");S([j()],M.prototype,"roomDraft");S([j()],M.prototype,"rectStart");S([j()],M.prototype,"rectCurrent");S([j()],M.prototype,"wallSnap");S([j()],M.prototype,"openingFit");S([j()],M.prototype,"calibrateStart");S([j()],M.prototype,"calibrateCurrent");S([j()],M.prototype,"rescaleStart");S([j()],M.prototype,"rescaleCurrent");S([j()],M.prototype,"viewRotation");S([j()],M.prototype,"orbitPitch");S([j()],M.prototype,"orbitYaw");S([j()],M.prototype,"view3d");S([j()],M.prototype,"view3dZoom");S([j()],M.prototype,"cutWalls");S([j()],M.prototype,"walkthrough3D");S([j()],M.prototype,"lightingMode3D");S([j()],M.prototype,"nightMode3D");S([j()],M.prototype,"hint");let Zl=M;Ta("home-architect-canvas",Zl);class R extends Error{constructor(t,e){super(e),this.name="HaApiError",this.code=t}}class Jl extends R{constructor(t,e){super("conflict",t),this.name="ConflictError",this.serverRevision=e}}class ho extends R{constructor(t){super("unauthorized",t),this.name="PermissionDeniedError"}}class Wt extends R{constructor(t,e,r){super("payload_too_large",t),this.name="PayloadTooLargeError",this.bytes=e,this.limit=r}}const Ql=3,uo="home_architect_",th=new Set(["home_architect_toolbar_pos"]);function J(n){return typeof n=="object"&&n!==null&&!Array.isArray(n)}function at(n){return typeof n=="string"&&n!==""?n:void 0}function ce(n){return typeof n=="number"&&Number.isInteger(n)&&n>=0?n:void 0}function ii(n){const t=mi(n/1048576,{minimumFractionDigits:1,maximumFractionDigits:1});return I("ui.api.size_mib",{value:t})}function Ne(n,t,e){return I(n,{size:ii(t),limit:ii(e)})}function po(n,t){if(n instanceof R)return n;const e=J(n)?J(n.error)?n.error:n:null,r=e?.code;let i;typeof r=="string"&&r!==""?i=r:r===Ql?i="connection_lost":typeof r=="number"?i=`error_${r}`:i="unknown_error";const o=typeof e?.message=="string"&&e.message!==""?e.message:n instanceof Error?n.message:String(n);switch(i){case"conflict":{const s=/conflict:(\d+)/.exec(o),a=s?Number(s[1]):void 0;return new Jl(a===void 0?I("ui.api.conflict"):I("ui.api.conflict_revision",{revision:a}),a)}case"unauthorized":return new ho(I("ui.api.unauthorized"));case"connection_lost":return new R(i,I("ui.api.connection_lost"));case"payload_too_large":{const s=/payload_too_large:(\d+):(\d+)/.exec(o),a=s?Number(s[1]):t?.bytes??0,c=s?Number(s[2]):t?.limit??0;return new Wt(c>0?Ne("ui.api.payload_too_large_size",a,c):I("ui.api.payload_too_large"),a,c)}case"not_found":return new R(i,I("ui.api.project_not_found"));case"not_ready":return new R(i,I("ui.api.not_ready"));case"save_failed":case"write_failed":return new R(i,I("ui.api.write_failed"));case"unknown_command":return new R(i,I("ui.api.unknown_command"));default:return new R(i,o)}}async function lt(n,t,e){if(!n||typeof n.callWS!="function")throw new R("not_connected",I("ui.api.not_connected"));try{return await n.callWS(t)}catch(r){throw po(r,e)}}function xt(n){if(typeof n!="string"||!Ut.test(n))throw new R("invalid_project_id",I("ui.api.invalid_project_id",{id:String(n)}))}function eh(n){if(typeof n!="string"||!De.test(n))throw new R("invalid_asset_id",I("ui.api.invalid_asset_id",{id:String(n)}))}async function fo(n,t,e){if(!n||typeof n.fetchWithAuth!="function")throw new R("not_connected",I("ui.api.not_connected"));try{return await n.fetchWithAuth(t,e)}catch(r){throw new R("network_error",r instanceof Error?r.message:String(r))}}function mo(n,t){switch(n){case 401:case 403:return new ho(I("ui.api.unauthorized"));case 404:return new R("not_found",I("ui.api.not_found"));case 413:return new Wt(I("ui.api.file_too_large"),t?.bytes??0,t?.limit??0);case 415:return new R("unsupported_media_type",I("ui.api.unsupported_media_type"));case 400:return new R("invalid_image",I("ui.api.invalid_image"));case 503:return new R("not_ready",I("ui.api.not_ready"));default:return new R("http_error",I("ui.api.http_error",{status:n}))}}function nh(n){if(!J(n)||typeof n.id!="string"||!Ut.test(n.id))return null;const t=J(n.counts)?n.counts:{},e=r=>ce(r)??0;return{id:n.id,name:typeof n.name=="string"&&n.name!==""?n.name:n.id,category:at(n.category)??Wi(n.id),created_at:at(n.created_at),updated_at:at(n.updated_at),revision:ce(n.revision)??0,has_background:n.has_background===!0,publish:xn(n.publish)??null,counts:{walls:e(t.walls),rooms:e(t.rooms),bindings:e(t.bindings),furniture:e(t.furniture)}}}function rh(n){return{id:n.id,name:n.name,category:n.category,created_at:n.created_at,updated_at:n.updated_at,revision:n.revision??0,has_background:!!(n.background&&(n.background.assetId||n.background.imageUrl)),publish:n.publish??null,counts:{walls:n.walls.length,rooms:n.rooms.length,bindings:n.bindings.length,furniture:(n.furniture??[]).length}}}async function go(n){const t=await lt(n,{type:"home_architect/get_projects"});return(Array.isArray(t?.projects)?t.projects:[]).filter(e=>J(e)&&typeof e.id=="string"&&Ut.test(e.id)).map(vn)}function Eh(n){return n?.user?.is_admin===!0}async function Th(n){try{const t=await lt(n,{type:"home_architect/list_projects"});return(Array.isArray(t?.projects)?t.projects:[]).map(nh).filter(e=>e!==null)}catch(t){if(t instanceof R&&t.code==="unknown_command")return(await go(n)).map(rh);throw t}}async function Ah(n,t){xt(t);try{const e=await lt(n,{type:"home_architect/get_project",project_id:t});return J(e?.project)?vn(e.project):null}catch(e){if(e instanceof R&&e.code==="not_found")return null;if(e instanceof R&&e.code==="unknown_command")return(await go(n)).find(r=>r.id===t)??null;throw e}}async function Dh(n,t,e={}){xt(t.id);const r=fa(t),i=r.background?.imageUrl;if(typeof i=="string"&&i.startsWith("data:")&&i.length>hr)throw new Wt(I("ui.api.background_not_uploaded"),i.length,hr);const o=ma(r);if(o>pe)throw new Wt(Ne("ui.api.project_too_large",o,pe),o,pe);const s={type:"home_architect/save_project",project:r};e.expectedRevision!==void 0&&(s.expected_revision=e.expectedRevision),e.force&&(s.force=!0);const a=await lt(n,s,{bytes:o,limit:pe}),c={id:typeof a?.id=="string"?a.id:t.id,revision:ce(a?.revision)??0,updated_at:typeof a?.updated_at=="string"?a.updated_at:new Date().toISOString()};return typeof a?.asset_id=="string"&&De.test(a.asset_id)&&(c.assetId=a.asset_id),c}async function Ih(n,t){xt(t);try{await lt(n,{type:"home_architect/delete_project",project_id:t})}catch(e){if(e instanceof R&&e.code==="not_found")return;throw e}}async function Ch(n,t,e){xt(t);const r={bytes:e.size,limit:me};if(e.size>me)throw new Wt(Ne("ui.api.image_too_large",e.size,me),e.size,me);const i=await fo(n,`/api/home_architect/background/${encodeURIComponent(t)}`,{method:"POST",body:e,headers:{"Content-Type":e.type||"application/octet-stream"}});if(!i.ok)throw mo(i.status,r);let o;try{o=await i.json()}catch{o=null}if(!J(o)||typeof o.asset_id!="string"||!De.test(o.asset_id))throw new R("invalid_response",I("ui.api.invalid_upload_response"));return{assetId:o.asset_id,mimeType:typeof o.mime_type=="string"?o.mime_type:e.type,size:ce(o.size)??e.size}}function ih(n){const t=/^([A-Za-z0-9_-]{1,64})-[A-Za-z0-9]{6,64}\.[A-Za-z0-9]{2,5}$/.exec(n);return t&&Ut.test(t[1])?t[1]:null}async function oh(n,t,e){xt(t),eh(e);const r=ih(e)??t,i=await fo(n,`/api/home_architect/background/${encodeURIComponent(r)}/${encodeURIComponent(e)}`);if(!i.ok)throw mo(i.status);return i.blob()}const It=new Map;function Rh(n,t,e){const r=It.get(e);if(r)return r.refs+=1,r.promise;const i=oh(n,t,e).then(s=>URL.createObjectURL(s)),o={promise:i,refs:1};return It.set(e,o),i.catch(()=>{It.get(e)===o&&It.delete(e)}),i}function Oh(n){const t=It.get(n);t&&(t.refs-=1,!(t.refs>0)&&(It.delete(n),t.promise.then(e=>URL.revokeObjectURL(e),()=>{})))}async function Lh(n,t,e,r){xt(t);const i=new TextEncoder().encode(e).length;if(i>fe)throw new Wt(Ne("ui.api.svg_too_large",i,fe),i,fe);const o=await lt(n,{type:"home_architect/publish_svg",project_id:t,svg_content:e,include_background:r.includeBackground===!0},{bytes:i,limit:fe}),s=xn(o);if(!s)throw new R("invalid_response",I("ui.api.invalid_publish_response"));return s}async function Nh(n,t){xt(t),await lt(n,{type:"home_architect/unpublish",project_id:t})}async function jh(n,t={}){const e={type:"home_architect/check_updates"};t.force&&(e.force=!0);const r=await lt(n,e),i=J(r)?r:{},o=at(i.release_url);return{installed_version:at(i.installed_version)??"",latest_version:at(i.latest_version)??null,update_available:i.update_available===!0,skipped_version:at(i.skipped_version)??null,release_url:o&&/^https?:\/\//i.test(o)?o:null,release_notes:typeof i.release_notes=="string"?i.release_notes:"",update_entity_id:at(i.update_entity_id)??null}}async function Fh(n,t){const e={type:"home_architect/install_update"};t&&(e.version=t);const r=await lt(n,e),i=J(r)?r:{};return{success:i.success===!0,installed_version:at(i.installed_version)??"",requires_restart:i.requires_restart!==!1}}async function zh(n,t,e){xt(t);const r=n?.connection?.subscribeMessage;if(typeof r!="function")throw new R("not_connected",I("ui.api.not_connected"));const i=a=>{if(!J(a)||a.project_id!==void 0&&a.project_id!==t)return;const c={project_id:t,revision:ce(a.revision)??0};a.deleted===!0&&(c.deleted=!0),e(c)};let o;try{o=await r.call(n.connection,i,{type:"home_architect/subscribe_project",project_id:t})}catch(a){throw po(a)}let s=!0;return()=>{if(s){s=!1;try{const a=typeof o=="function"?o():void 0;a&&typeof a.catch=="function"&&a.catch(()=>{})}catch{}}}}function yo(){try{return typeof localStorage>"u"?null:localStorage}catch{return null}}function bo(n){return n.startsWith(uo)&&!th.has(n)}function Wh(){const n=yo();if(!n)return[];const t=[];try{const e=[];for(let r=0;r<n.length;r++){const i=n.key(r);i&&bo(i)&&e.push(i)}for(const r of e){let i;try{const a=n.getItem(r);if(!a)continue;i=JSON.parse(a)}catch{continue}if(!J(i)||!(Array.isArray(i.walls)||Array.isArray(i.rooms)||Array.isArray(i.bindings)))continue;const o=r.slice(uo.length),s=typeof i.id=="string"&&Ut.test(i.id)?i:{...i,id:o};t.push({key:r,project:vn(s)})}}catch{}return t}function Hh(n){if(typeof n!="string"||!bo(n))return;const t=yo();if(t)try{t.removeItem(n)}catch{}}const Uh=hn`
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
`;function Yh(n,t){const e=t?.themes?.darkMode;n.setAttribute("scheme",e===!1?"light":"dark")}const Jt="2.0.4",oi="legacy",sh={card:"home-architect-card",panel:"home-architect-panel"};function Sn(){const n=window.__homeArchitectBundles;return typeof n=="object"&&n!==null?n:window.__homeArchitectBundles={}}function si(n){return n.trim().replace(/^v/i,"")}function Bh(n){const t=Sn(),e=n==="card"?"panel":"card";t[e]===void 0&&customElements.get(sh[e])&&(t[e]=oi,t[n]??=oi),t[n]??=Jt,console.info(`%c 📐 HOME ARCHITECT %c v${Jt} · ${n==="card"?"carte":"studio"} `,"background: #0284c7; color: #fff; font-weight: bold; border-radius: 4px 0 0 4px; padding: 2px 6px;","background: #1e293b; color: #38bdf8; font-weight: bold; border-radius: 0 4px 4px 0; padding: 2px 6px;");const r=Object.entries(t).filter(([,i])=>i!==Jt);r.length>0&&console.warn(`[home-architect] Versions différentes chargées dans la page (${n} v${Jt} évalué, actifs : `+r.map(([i,o])=>`${i} ${o}`).join(", ")+") : rechargez la page pour utiliser la nouvelle version.")}function qh(){return{...Sn()}}function Xh(n){if(typeof n!="string"||n.trim()==="")return!1;const t=si(n),e=Object.values(Sn()).filter(r=>typeof r=="string");return[Jt,...e].some(r=>si(r)!==t)}export{ba as $,v as A,pi as B,Yt as C,bh as D,et as E,wi as F,dh as G,yh as H,ks as I,Ds as J,Os as K,mh as L,gh as M,Ra as N,q as O,Ut as P,fs as Q,Ft as R,Sh as S,kh as T,me as U,xh as V,Oa as W,zi as X,vn as Y,wr as Z,So as _,hn as a,Eh as a0,oh as a1,Mh as a2,R as a3,fe as a4,Xa as a5,Wt as a6,We as a7,Lh as a8,Nh as a9,La as aA,vh as aB,Yi as aC,Ms as aD,ja as aE,_h as aF,Na as aG,Ke as aH,Z as aI,Se as aJ,Ml as aK,bt as aL,Kc as aM,gl as aN,fl as aO,st as aP,dl as aQ,oo as aR,pt as aS,ol as aT,we as aU,Hr as aV,Mn as aW,il as aX,wl as aY,Ur as aZ,Ph as aa,fa as ab,Wi as ac,yn as ad,Ls as ae,Ns as af,Ti as ag,Ih as ah,Ae as ai,fc as aj,Ch as ak,jh as al,ho as am,Xh as an,qh as ao,Jt as ap,ra as aq,xn as ar,Wh as as,Hh as at,wh as au,Dh as av,Jl as aw,A as ax,ye as ay,Fh as az,ds as b,Yh as c,$h as d,zh as e,Rh as f,Ah as g,Oh as h,te as i,I as j,K as k,Th as l,mi as m,F as n,j as o,Ta as p,Bh as q,Te as r,ph as s,po as t,Uh as u,fh as v,$ as w,lh as x,mn as y,gn as z};
