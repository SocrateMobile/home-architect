/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const le = globalThis, ye = le.ShadowRoot && (le.ShadyCSS === void 0 || le.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, we = Symbol(), _e = /* @__PURE__ */ new WeakMap();
let We = class {
  constructor(e, i, o) {
    if (this._$cssResult$ = !0, o !== we) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = i;
  }
  get styleSheet() {
    let e = this.o;
    const i = this.t;
    if (ye && e === void 0) {
      const o = i !== void 0 && i.length === 1;
      o && (e = _e.get(i)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), o && _e.set(i, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const Ge = (t) => new We(typeof t == "string" ? t : t + "", void 0, we), P = (t, ...e) => {
  const i = t.length === 1 ? t[0] : e.reduce((o, s, r) => o + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + t[r + 1], t[0]);
  return new We(i, t, we);
}, Ye = (t, e) => {
  if (ye) t.adoptedStyleSheets = e.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of e) {
    const o = document.createElement("style"), s = le.litNonce;
    s !== void 0 && o.setAttribute("nonce", s), o.textContent = i.cssText, t.appendChild(o);
  }
}, Se = ye ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let i = "";
  for (const o of e.cssRules) i += o.cssText;
  return Ge(i);
})(t) : t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Xe, defineProperty: Je, getOwnPropertyDescriptor: Ze, getOwnPropertyNames: Qe, getOwnPropertySymbols: Ke, getPrototypeOf: et } = Object, O = globalThis, Ce = O.trustedTypes, tt = Ce ? Ce.emptyScript : "", be = O.reactiveElementPolyfillSupport, Q = (t, e) => t, de = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? tt : null;
      break;
    case Object:
    case Array:
      t = t == null ? t : JSON.stringify(t);
  }
  return t;
}, fromAttribute(t, e) {
  let i = t;
  switch (e) {
    case Boolean:
      i = t !== null;
      break;
    case Number:
      i = t === null ? null : Number(t);
      break;
    case Object:
    case Array:
      try {
        i = JSON.parse(t);
      } catch {
        i = null;
      }
  }
  return i;
} }, $e = (t, e) => !Xe(t, e), Pe = { attribute: !0, type: String, converter: de, reflect: !1, useDefault: !1, hasChanged: $e };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), O.litPropertyMetadata ?? (O.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let q = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, i = Pe) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(e, i), !i.noAccessor) {
      const o = Symbol(), s = this.getPropertyDescriptor(e, o, i);
      s !== void 0 && Je(this.prototype, e, s);
    }
  }
  static getPropertyDescriptor(e, i, o) {
    const { get: s, set: r } = Ze(this.prototype, e) ?? { get() {
      return this[i];
    }, set(a) {
      this[i] = a;
    } };
    return { get: s, set(a) {
      const n = s == null ? void 0 : s.call(this);
      r == null || r.call(this, a), this.requestUpdate(e, n, o);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? Pe;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Q("elementProperties"))) return;
    const e = et(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Q("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Q("properties"))) {
      const i = this.properties, o = [...Qe(i), ...Ke(i)];
      for (const s of o) this.createProperty(s, i[s]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const i = litPropertyMetadata.get(e);
      if (i !== void 0) for (const [o, s] of i) this.elementProperties.set(o, s);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [i, o] of this.elementProperties) {
      const s = this._$Eu(i, o);
      s !== void 0 && this._$Eh.set(s, i);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const i = [];
    if (Array.isArray(e)) {
      const o = new Set(e.flat(1 / 0).reverse());
      for (const s of o) i.unshift(Se(s));
    } else e !== void 0 && i.push(Se(e));
    return i;
  }
  static _$Eu(e, i) {
    const o = i.attribute;
    return o === !1 ? void 0 : typeof o == "string" ? o : typeof e == "string" ? e.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var e;
    this._$ES = new Promise((i) => this.enableUpdating = i), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (e = this.constructor.l) == null || e.forEach((i) => i(this));
  }
  addController(e) {
    var i;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(e), this.renderRoot !== void 0 && this.isConnected && ((i = e.hostConnected) == null || i.call(e));
  }
  removeController(e) {
    var i;
    (i = this._$EO) == null || i.delete(e);
  }
  _$E_() {
    const e = /* @__PURE__ */ new Map(), i = this.constructor.elementProperties;
    for (const o of i.keys()) this.hasOwnProperty(o) && (e.set(o, this[o]), delete this[o]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Ye(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    var e;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (e = this._$EO) == null || e.forEach((i) => {
      var o;
      return (o = i.hostConnected) == null ? void 0 : o.call(i);
    });
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    var e;
    (e = this._$EO) == null || e.forEach((i) => {
      var o;
      return (o = i.hostDisconnected) == null ? void 0 : o.call(i);
    });
  }
  attributeChangedCallback(e, i, o) {
    this._$AK(e, o);
  }
  _$ET(e, i) {
    var r;
    const o = this.constructor.elementProperties.get(e), s = this.constructor._$Eu(e, o);
    if (s !== void 0 && o.reflect === !0) {
      const a = (((r = o.converter) == null ? void 0 : r.toAttribute) !== void 0 ? o.converter : de).toAttribute(i, o.type);
      this._$Em = e, a == null ? this.removeAttribute(s) : this.setAttribute(s, a), this._$Em = null;
    }
  }
  _$AK(e, i) {
    var r, a;
    const o = this.constructor, s = o._$Eh.get(e);
    if (s !== void 0 && this._$Em !== s) {
      const n = o.getPropertyOptions(s), l = typeof n.converter == "function" ? { fromAttribute: n.converter } : ((r = n.converter) == null ? void 0 : r.fromAttribute) !== void 0 ? n.converter : de;
      this._$Em = s;
      const d = l.fromAttribute(i, n.type);
      this[s] = d ?? ((a = this._$Ej) == null ? void 0 : a.get(s)) ?? d, this._$Em = null;
    }
  }
  requestUpdate(e, i, o, s = !1, r) {
    var a;
    if (e !== void 0) {
      const n = this.constructor;
      if (s === !1 && (r = this[e]), o ?? (o = n.getPropertyOptions(e)), !((o.hasChanged ?? $e)(r, i) || o.useDefault && o.reflect && r === ((a = this._$Ej) == null ? void 0 : a.get(e)) && !this.hasAttribute(n._$Eu(e, o)))) return;
      this.C(e, i, o);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, i, { useDefault: o, reflect: s, wrapped: r }, a) {
    o && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(e) && (this._$Ej.set(e, a ?? i ?? this[e]), r !== !0 || a !== void 0) || (this._$AL.has(e) || (this.hasUpdated || o || (i = void 0), this._$AL.set(e, i)), s === !0 && this._$Em !== e && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(e));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (i) {
      Promise.reject(i);
    }
    const e = this.scheduleUpdate();
    return e != null && await e, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var o;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [r, a] of this._$Ep) this[r] = a;
        this._$Ep = void 0;
      }
      const s = this.constructor.elementProperties;
      if (s.size > 0) for (const [r, a] of s) {
        const { wrapped: n } = a, l = this[r];
        n !== !0 || this._$AL.has(r) || l === void 0 || this.C(r, void 0, a, l);
      }
    }
    let e = !1;
    const i = this._$AL;
    try {
      e = this.shouldUpdate(i), e ? (this.willUpdate(i), (o = this._$EO) == null || o.forEach((s) => {
        var r;
        return (r = s.hostUpdate) == null ? void 0 : r.call(s);
      }), this.update(i)) : this._$EM();
    } catch (s) {
      throw e = !1, this._$EM(), s;
    }
    e && this._$AE(i);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    var i;
    (i = this._$EO) == null || i.forEach((o) => {
      var s;
      return (s = o.hostUpdated) == null ? void 0 : s.call(o);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(e) {
    return !0;
  }
  update(e) {
    this._$Eq && (this._$Eq = this._$Eq.forEach((i) => this._$ET(i, this[i]))), this._$EM();
  }
  updated(e) {
  }
  firstUpdated(e) {
  }
};
q.elementStyles = [], q.shadowRootOptions = { mode: "open" }, q[Q("elementProperties")] = /* @__PURE__ */ new Map(), q[Q("finalized")] = /* @__PURE__ */ new Map(), be == null || be({ ReactiveElement: q }), (O.reactiveElementVersions ?? (O.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const K = globalThis, De = (t) => t, pe = K.trustedTypes, Te = pe ? pe.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, Fe = "$lit$", E = `lit$${Math.random().toFixed(9).slice(2)}$`, He = "?" + E, it = `<${He}>`, H = document, ee = () => H.createComment(""), te = (t) => t === null || typeof t != "object" && typeof t != "function", ke = Array.isArray, ot = (t) => ke(t) || typeof (t == null ? void 0 : t[Symbol.iterator]) == "function", me = `[ 	
\f\r]`, Z = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, je = /-->/g, ze = />/g, R = RegExp(`>|${me}(?:([^\\s"'>=/]+)(${me}*=${me}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Ae = /'/g, Ee = /"/g, Ue = /^(?:script|style|textarea|title)$/i, Ne = (t) => (e, ...i) => ({ _$litType$: t, strings: e, values: i }), b = Ne(1), x = Ne(2), V = Symbol.for("lit-noChange"), $ = Symbol.for("lit-nothing"), Oe = /* @__PURE__ */ new WeakMap(), W = H.createTreeWalker(H, 129);
function Le(t, e) {
  if (!ke(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Te !== void 0 ? Te.createHTML(e) : e;
}
const st = (t, e) => {
  const i = t.length - 1, o = [];
  let s, r = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", a = Z;
  for (let n = 0; n < i; n++) {
    const l = t[n];
    let d, p, c = -1, f = 0;
    for (; f < l.length && (a.lastIndex = f, p = a.exec(l), p !== null); ) f = a.lastIndex, a === Z ? p[1] === "!--" ? a = je : p[1] !== void 0 ? a = ze : p[2] !== void 0 ? (Ue.test(p[2]) && (s = RegExp("</" + p[2], "g")), a = R) : p[3] !== void 0 && (a = R) : a === R ? p[0] === ">" ? (a = s ?? Z, c = -1) : p[1] === void 0 ? c = -2 : (c = a.lastIndex - p[2].length, d = p[1], a = p[3] === void 0 ? R : p[3] === '"' ? Ee : Ae) : a === Ee || a === Ae ? a = R : a === je || a === ze ? a = Z : (a = R, s = void 0);
    const g = a === R && t[n + 1].startsWith("/>") ? " " : "";
    r += a === Z ? l + it : c >= 0 ? (o.push(d), l.slice(0, c) + Fe + l.slice(c) + E + g) : l + E + (c === -2 ? n : g);
  }
  return [Le(t, r + (t[i] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), o];
};
class ie {
  constructor({ strings: e, _$litType$: i }, o) {
    let s;
    this.parts = [];
    let r = 0, a = 0;
    const n = e.length - 1, l = this.parts, [d, p] = st(e, i);
    if (this.el = ie.createElement(d, o), W.currentNode = this.el.content, i === 2 || i === 3) {
      const c = this.el.content.firstChild;
      c.replaceWith(...c.childNodes);
    }
    for (; (s = W.nextNode()) !== null && l.length < n; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const c of s.getAttributeNames()) if (c.endsWith(Fe)) {
          const f = p[a++], g = s.getAttribute(c).split(E), M = /([.?@])?(.*)/.exec(f);
          l.push({ type: 1, index: r, name: M[2], strings: g, ctor: M[1] === "." ? at : M[1] === "?" ? nt : M[1] === "@" ? lt : he }), s.removeAttribute(c);
        } else c.startsWith(E) && (l.push({ type: 6, index: r }), s.removeAttribute(c));
        if (Ue.test(s.tagName)) {
          const c = s.textContent.split(E), f = c.length - 1;
          if (f > 0) {
            s.textContent = pe ? pe.emptyScript : "";
            for (let g = 0; g < f; g++) s.append(c[g], ee()), W.nextNode(), l.push({ type: 2, index: ++r });
            s.append(c[f], ee());
          }
        }
      } else if (s.nodeType === 8) if (s.data === He) l.push({ type: 2, index: r });
      else {
        let c = -1;
        for (; (c = s.data.indexOf(E, c + 1)) !== -1; ) l.push({ type: 7, index: r }), c += E.length - 1;
      }
      r++;
    }
  }
  static createElement(e, i) {
    const o = H.createElement("template");
    return o.innerHTML = e, o;
  }
}
function G(t, e, i = t, o) {
  var a, n;
  if (e === V) return e;
  let s = o !== void 0 ? (a = i._$Co) == null ? void 0 : a[o] : i._$Cl;
  const r = te(e) ? void 0 : e._$litDirective$;
  return (s == null ? void 0 : s.constructor) !== r && ((n = s == null ? void 0 : s._$AO) == null || n.call(s, !1), r === void 0 ? s = void 0 : (s = new r(t), s._$AT(t, i, o)), o !== void 0 ? (i._$Co ?? (i._$Co = []))[o] = s : i._$Cl = s), s !== void 0 && (e = G(t, s._$AS(t, e.values), s, o)), e;
}
class rt {
  constructor(e, i) {
    this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = i;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(e) {
    const { el: { content: i }, parts: o } = this._$AD, s = ((e == null ? void 0 : e.creationScope) ?? H).importNode(i, !0);
    W.currentNode = s;
    let r = W.nextNode(), a = 0, n = 0, l = o[0];
    for (; l !== void 0; ) {
      if (a === l.index) {
        let d;
        l.type === 2 ? d = new oe(r, r.nextSibling, this, e) : l.type === 1 ? d = new l.ctor(r, l.name, l.strings, this, e) : l.type === 6 && (d = new ct(r, this, e)), this._$AV.push(d), l = o[++n];
      }
      a !== (l == null ? void 0 : l.index) && (r = W.nextNode(), a++);
    }
    return W.currentNode = H, s;
  }
  p(e) {
    let i = 0;
    for (const o of this._$AV) o !== void 0 && (o.strings !== void 0 ? (o._$AI(e, o, i), i += o.strings.length - 2) : o._$AI(e[i])), i++;
  }
}
class oe {
  get _$AU() {
    var e;
    return ((e = this._$AM) == null ? void 0 : e._$AU) ?? this._$Cv;
  }
  constructor(e, i, o, s) {
    this.type = 2, this._$AH = $, this._$AN = void 0, this._$AA = e, this._$AB = i, this._$AM = o, this.options = s, this._$Cv = (s == null ? void 0 : s.isConnected) ?? !0;
  }
  get parentNode() {
    let e = this._$AA.parentNode;
    const i = this._$AM;
    return i !== void 0 && (e == null ? void 0 : e.nodeType) === 11 && (e = i.parentNode), e;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(e, i = this) {
    e = G(this, e, i), te(e) ? e === $ || e == null || e === "" ? (this._$AH !== $ && this._$AR(), this._$AH = $) : e !== this._$AH && e !== V && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : ot(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== $ && te(this._$AH) ? this._$AA.nextSibling.data = e : this.T(H.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var r;
    const { values: i, _$litType$: o } = e, s = typeof o == "number" ? this._$AC(e) : (o.el === void 0 && (o.el = ie.createElement(Le(o.h, o.h[0]), this.options)), o);
    if (((r = this._$AH) == null ? void 0 : r._$AD) === s) this._$AH.p(i);
    else {
      const a = new rt(s, this), n = a.u(this.options);
      a.p(i), this.T(n), this._$AH = a;
    }
  }
  _$AC(e) {
    let i = Oe.get(e.strings);
    return i === void 0 && Oe.set(e.strings, i = new ie(e)), i;
  }
  k(e) {
    ke(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let o, s = 0;
    for (const r of e) s === i.length ? i.push(o = new oe(this.O(ee()), this.O(ee()), this, this.options)) : o = i[s], o._$AI(r), s++;
    s < i.length && (this._$AR(o && o._$AB.nextSibling, s), i.length = s);
  }
  _$AR(e = this._$AA.nextSibling, i) {
    var o;
    for ((o = this._$AP) == null ? void 0 : o.call(this, !1, !0, i); e !== this._$AB; ) {
      const s = De(e).nextSibling;
      De(e).remove(), e = s;
    }
  }
  setConnected(e) {
    var i;
    this._$AM === void 0 && (this._$Cv = e, (i = this._$AP) == null || i.call(this, e));
  }
}
class he {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, i, o, s, r) {
    this.type = 1, this._$AH = $, this._$AN = void 0, this.element = e, this.name = i, this._$AM = s, this.options = r, o.length > 2 || o[0] !== "" || o[1] !== "" ? (this._$AH = Array(o.length - 1).fill(new String()), this.strings = o) : this._$AH = $;
  }
  _$AI(e, i = this, o, s) {
    const r = this.strings;
    let a = !1;
    if (r === void 0) e = G(this, e, i, 0), a = !te(e) || e !== this._$AH && e !== V, a && (this._$AH = e);
    else {
      const n = e;
      let l, d;
      for (e = r[0], l = 0; l < r.length - 1; l++) d = G(this, n[o + l], i, l), d === V && (d = this._$AH[l]), a || (a = !te(d) || d !== this._$AH[l]), d === $ ? e = $ : e !== $ && (e += (d ?? "") + r[l + 1]), this._$AH[l] = d;
    }
    a && !s && this.j(e);
  }
  j(e) {
    e === $ ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class at extends he {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === $ ? void 0 : e;
  }
}
class nt extends he {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== $);
  }
}
class lt extends he {
  constructor(e, i, o, s, r) {
    super(e, i, o, s, r), this.type = 5;
  }
  _$AI(e, i = this) {
    if ((e = G(this, e, i, 0) ?? $) === V) return;
    const o = this._$AH, s = e === $ && o !== $ || e.capture !== o.capture || e.once !== o.once || e.passive !== o.passive, r = e !== $ && (o === $ || s);
    s && this.element.removeEventListener(this.name, this, o), r && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var i;
    typeof this._$AH == "function" ? this._$AH.call(((i = this.options) == null ? void 0 : i.host) ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class ct {
  constructor(e, i, o) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = o;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    G(this, e);
  }
}
const xe = K.litHtmlPolyfillSupport;
xe == null || xe(ie, oe), (K.litHtmlVersions ?? (K.litHtmlVersions = [])).push("3.3.3");
const dt = (t, e, i) => {
  const o = (i == null ? void 0 : i.renderBefore) ?? e;
  let s = o._$litPart$;
  if (s === void 0) {
    const r = (i == null ? void 0 : i.renderBefore) ?? null;
    o._$litPart$ = s = new oe(e.insertBefore(ee(), r), r, void 0, i ?? {});
  }
  return s._$AI(t), s;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const F = globalThis;
class _ extends q {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var i;
    const e = super.createRenderRoot();
    return (i = this.renderOptions).renderBefore ?? (i.renderBefore = e.firstChild), e;
  }
  update(e) {
    const i = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = dt(i, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var e;
    super.connectedCallback(), (e = this._$Do) == null || e.setConnected(!0);
  }
  disconnectedCallback() {
    var e;
    super.disconnectedCallback(), (e = this._$Do) == null || e.setConnected(!1);
  }
  render() {
    return V;
  }
}
var Re;
_._$litElement$ = !0, _.finalized = !0, (Re = F.litElementHydrateSupport) == null || Re.call(F, { LitElement: _ });
const ve = F.litElementPolyfillSupport;
ve == null || ve({ LitElement: _ });
(F.litElementVersions ?? (F.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const D = (t) => (e, i) => {
  i !== void 0 ? i.addInitializer(() => {
    customElements.define(t, e);
  }) : customElements.define(t, e);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const pt = { attribute: !0, type: String, converter: de, reflect: !1, hasChanged: $e }, ht = (t = pt, e, i) => {
  const { kind: o, metadata: s } = i;
  let r = globalThis.litPropertyMetadata.get(s);
  if (r === void 0 && globalThis.litPropertyMetadata.set(s, r = /* @__PURE__ */ new Map()), o === "setter" && ((t = Object.create(t)).wrapped = !0), r.set(i.name, t), o === "accessor") {
    const { name: a } = i;
    return { set(n) {
      const l = e.get.call(this);
      e.set.call(this, n), this.requestUpdate(a, l, t, !0, n);
    }, init(n) {
      return n !== void 0 && this.C(a, void 0, t, n), n;
    } };
  }
  if (o === "setter") {
    const { name: a } = i;
    return function(n) {
      const l = this[a];
      e.call(this, n), this.requestUpdate(a, l, t, !0, n);
    };
  }
  throw Error("Unsupported decorator location: " + o);
};
function v(t) {
  return (e, i) => typeof i == "object" ? ht(t, e, i) : ((o, s, r) => {
    const a = s.hasOwnProperty(r);
    return s.constructor.createProperty(r, o), a ? Object.getOwnPropertyDescriptor(s, r) : void 0;
  })(t, e, i);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function h(t) {
  return v({ ...t, state: !0, attribute: !1 });
}
const ut = P`
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
  /* ENTITY PINS & LIVE HOME ASSISTANT STATES */
  /* ======================================= */

  .entity-pin {
    cursor: pointer;
    transition: transform 0.15s ease;
  }

  .entity-pin:hover {
    transform: scale(1.15);
  }

  .entity-pin-bg {
    fill: rgba(30, 41, 59, 0.9);
    stroke: rgba(255, 255, 255, 0.2);
    stroke-width: 2;
    filter: drop-shadow(0 4px 8px rgba(0,0,0,0.5));
    transition: all 0.2s ease;
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

  .coords-hud {
    position: absolute;
    bottom: 20px;
    left: 20px;
    background: rgba(30, 41, 59, 0.85);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 8px;
    padding: 6px 12px;
    font-size: 11px;
    color: #94a3b8;
    font-family: ui-monospace, SFMono-Regular, monospace;
    z-index: 50;
    pointer-events: none;
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
`;
class u {
  /**
   * Snaps a world point (in meters) to grid, existing vertices, and angle guides.
   */
  static snapPoint(e, i, o = [], s, r = 0.25) {
    let a = { ...e };
    if (i.snapToElements && o.length > 0) {
      let d = r, p = null;
      for (const c of o)
        for (const f of [c.start, c.end]) {
          const g = this.distance(e, f);
          g < d && (d = g, p = f);
        }
      if (p)
        return {
          point: { x: p.x, y: p.y },
          snappedTo: "vertex"
        };
    }
    let n = !1, l;
    if (i.snapToAngles && s) {
      const d = e.x - s.x, p = e.y - s.y, c = Math.sqrt(d * d + p * p);
      if (c > 0.05) {
        let g = Math.atan2(p, d) * 180 / Math.PI;
        g < 0 && (g += 360);
        const M = 45, I = Math.round(g / M) * M;
        if (Math.abs(g - I) <= 6) {
          const J = I * Math.PI / 180;
          a = {
            x: s.x + c * Math.cos(J),
            y: s.y + c * Math.sin(J)
          }, n = !0, l = I;
        }
      }
    }
    if (i.snapToGrid && !n) {
      const d = i.size || 0.5;
      return a = {
        x: Math.round(a.x / d) * d,
        y: Math.round(a.y / d) * d
      }, { point: a, snappedTo: "grid" };
    } else if (n)
      return { point: a, snappedTo: "angle", guideAngle: l };
    return { point: e, snappedTo: "none" };
  }
  /**
   * Snaps a point to the nearest wall centerline for placing doors and windows
   */
  static snapPointToWall(e, i, o = 0.6) {
    let s = null, r = o;
    for (const a of i) {
      const n = a.end.x - a.start.x, l = a.end.y - a.start.y, d = Math.sqrt(n * n + l * l);
      if (d === 0) continue;
      const p = Math.max(0, Math.min(
        1,
        ((e.x - a.start.x) * n + (e.y - a.start.y) * l) / (d * d)
      )), c = a.start.x + p * n, f = a.start.y + p * l, g = Math.sqrt((e.x - c) ** 2 + (e.y - f) ** 2);
      g < r && (r = g, s = {
        wall: a,
        projectionPoint: { x: c, y: f },
        offset: p * d,
        distance: g,
        angleRad: Math.atan2(l, n)
      });
    }
    return s;
  }
  static distance(e, i) {
    const o = e.x - i.x, s = e.y - i.y;
    return Math.sqrt(o * o + s * s);
  }
  static roundMeters(e, i = 2) {
    const o = Math.pow(10, i);
    return Math.round(e * o) / o;
  }
}
class ce {
  /**
   * Ray-casting algorithm to test if a 2D point is inside a polygon
   */
  static isPointInPolygon(e, i) {
    if (!i || i.length < 3) return !1;
    let o = !1;
    for (let s = 0, r = i.length - 1; s < i.length; r = s++) {
      const a = i[s].x, n = i[s].y, l = i[r].x, d = i[r].y;
      n > e.y != d > e.y && e.x < (l - a) * (e.y - n) / (d - n) + a && (o = !o);
    }
    return o;
  }
  /**
   * Finds the room containing the specified world point (if any)
   */
  static findRoomContainingPoint(e, i) {
    for (const o of i)
      if (this.isPointInPolygon(e, o.polygon))
        return o;
    return null;
  }
  /**
   * Calculates the centroid of a polygon
   */
  static calculateCentroid(e) {
    if (!e || e.length === 0) return { x: 0, y: 0 };
    let i = 0, o = 0;
    for (const s of e)
      i += s.x, o += s.y;
    return {
      x: i / e.length,
      y: o / e.length
    };
  }
  /**
   * Computes the geometric area (in m²) of a polygon using the Shoelace formula
   */
  static computeArea(e) {
    if (!e || e.length < 3) return 0;
    let i = 0;
    for (let o = 0; o < e.length; o++) {
      const s = (o + 1) % e.length;
      i += e[o].x * e[s].y, i -= e[s].x * e[o].y;
    }
    return Math.round(Math.abs(i / 2) * 100) / 100;
  }
}
var gt = Object.defineProperty, ft = Object.getOwnPropertyDescriptor, w = (t, e, i, o) => {
  for (var s = o > 1 ? void 0 : o ? ft(e, i) : e, r = t.length - 1, a; r >= 0; r--)
    (a = t[r]) && (s = (o ? a(e, i, s) : a(s)) || s);
  return o && s && gt(e, i, s), s;
};
let m = class extends _ {
  constructor() {
    super(...arguments), this.project = {
      id: "default",
      name: "Plan sans titre",
      created_at: (/* @__PURE__ */ new Date()).toISOString(),
      updated_at: (/* @__PURE__ */ new Date()).toISOString(),
      pixelsPerMeter: 50,
      grid: {
        size: 0.5,
        subdivisions: 2,
        snapToGrid: !0,
        snapToAngles: !0,
        snapToElements: !0
      },
      walls: [],
      openings: [],
      rooms: [],
      bindings: []
    }, this.activeTool = "wall", this.currentWallThickness = 0.2, this.currentOpeningWidth = 0.9, this.is3DMode = !1, this.viewport = { x: 300, y: 300, zoom: 1 }, this.isPanning = !1, this.panStart = { x: 0, y: 0 }, this.drawingWallStart = null, this.previewPoint = null, this.snapInfo = { snappedTo: "none" }, this.cursorCoords = { x: 0, y: 0 }, this.wallSnap = null, this.openingFlipSide = !1, this.openingFlipDirection = !1, this.calibrateStart = null, this.calibrateCurrent = null, this.rescaleStart = null, this.rescaleCurrent = null;
  }
  // ==========================================
  // CONVERSIONS DE COORDONNÉES
  // ==========================================
  screenToWorld(t, e) {
    const i = this.getBoundingClientRect(), o = t - i.left, s = e - i.top, r = this.project.pixelsPerMeter * this.viewport.zoom;
    return {
      x: (o - this.viewport.x) / r,
      y: (s - this.viewport.y) / r
    };
  }
  worldToScreen(t) {
    const e = this.project.pixelsPerMeter * this.viewport.zoom;
    return {
      x: t.x * e + this.viewport.x,
      y: t.y * e + this.viewport.y
    };
  }
  // ==========================================
  // GESTION DU PAN & ZOOM
  // ==========================================
  handleWheel(t) {
    t.preventDefault();
    const e = this.getBoundingClientRect(), i = t.clientX - e.left, o = t.clientY - e.top, s = t.deltaY < 0 ? 1.12 : 0.89, r = Math.min(Math.max(this.viewport.zoom * s, 0.15), 8), a = i - (i - this.viewport.x) * (r / this.viewport.zoom), n = o - (o - this.viewport.y) * (r / this.viewport.zoom);
    this.viewport = { x: a, y: n, zoom: r };
  }
  handlePointerDown(t) {
    var i, o;
    if (t.button === 1 || this.activeTool === "select" || t.shiftKey) {
      this.isPanning = !0, this.panStart = { x: t.clientX - this.viewport.x, y: t.clientY - this.viewport.y }, (o = (i = t.target).setPointerCapture) == null || o.call(i, t.pointerId);
      return;
    }
    if (t.button !== 0) return;
    const e = this.screenToWorld(t.clientX, t.clientY);
    if (this.activeTool === "wall") {
      const s = u.snapPoint(
        e,
        this.project.grid,
        this.project.walls,
        this.drawingWallStart || void 0
      );
      if (!this.drawingWallStart)
        this.drawingWallStart = s.point;
      else {
        const r = this.drawingWallStart, a = s.point;
        if (u.distance(r, a) >= 0.15) {
          const l = {
            id: `wall_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
            start: { ...r },
            end: { ...a },
            thickness: this.currentWallThickness,
            type: "standard"
          };
          this.project = {
            ...this.project,
            walls: [...this.project.walls, l]
          }, this.dispatchProjectChanged(), this.drawingWallStart = a;
        }
      }
    } else if (this.activeTool === "door" || this.activeTool === "window" || this.activeTool === "french_window") {
      if (this.wallSnap) {
        const s = this.activeTool === "window" ? "window" : this.activeTool === "french_window" ? "french_window" : "door", r = {
          id: `op_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
          wallId: this.wallSnap.wall.id,
          type: s,
          offset: u.roundMeters(this.wallSnap.offset),
          width: this.currentOpeningWidth || (s === "door" ? 0.9 : 1.2),
          flipSide: this.openingFlipSide,
          flipDirection: this.openingFlipDirection
        };
        this.project = {
          ...this.project,
          openings: [...this.project.openings, r]
        }, this.dispatchProjectChanged();
      }
    } else if (this.activeTool === "calibrate") {
      const s = this.getBoundingClientRect(), r = { x: t.clientX - s.left, y: t.clientY - s.top };
      if (!this.calibrateStart)
        this.calibrateStart = r, this.calibrateCurrent = r;
      else {
        const a = r.x - this.calibrateStart.x, n = r.y - this.calibrateStart.y, l = Math.sqrt(a * a + n * n);
        if (l >= 10) {
          const d = l / this.viewport.zoom;
          this.dispatchEvent(new CustomEvent("request-calibration", {
            detail: {
              pixelDistance: d,
              defaultMeters: u.roundMeters(d / this.project.pixelsPerMeter)
            },
            bubbles: !0,
            composed: !0
          })), this.calibrateStart = null, this.calibrateCurrent = null;
        }
      }
    } else if (this.activeTool === "rescale") {
      const s = this.screenToWorld(t.clientX, t.clientY);
      let r = u.snapPoint(
        s,
        this.project.grid,
        this.project.walls,
        this.rescaleStart || void 0
      );
      if (r.snappedTo === "none" && this.project.walls.length > 0) {
        const a = u.snapPointToWall(s, this.project.walls, 0.6);
        a && (r = { point: a.projectionPoint, snappedTo: "vertex" });
      }
      if (!this.rescaleStart)
        this.rescaleStart = r.point, this.rescaleCurrent = r.point;
      else {
        const a = this.rescaleStart, n = r.point, l = u.distance(a, n);
        l >= 0.05 && (this.dispatchEvent(new CustomEvent("request-rescale", {
          detail: {
            measuredMeters: u.roundMeters(l)
          },
          bubbles: !0,
          composed: !0
        })), this.rescaleStart = null, this.rescaleCurrent = null, this.previewPoint = null);
      }
    }
  }
  handlePointerMove(t) {
    if (this.isPanning) {
      this.viewport = {
        ...this.viewport,
        x: t.clientX - this.panStart.x,
        y: t.clientY - this.panStart.y
      };
      return;
    }
    const e = this.screenToWorld(t.clientX, t.clientY);
    if (this.cursorCoords = {
      x: u.roundMeters(e.x),
      y: u.roundMeters(e.y)
    }, this.activeTool === "wall") {
      const i = u.snapPoint(
        e,
        this.project.grid,
        this.project.walls,
        this.drawingWallStart || void 0
      );
      this.previewPoint = i.point, this.snapInfo = { snappedTo: i.snappedTo, guideAngle: i.guideAngle }, this.wallSnap = null;
    } else if (this.activeTool === "door" || this.activeTool === "window" || this.activeTool === "french_window")
      this.wallSnap = u.snapPointToWall(e, this.project.walls, 0.8), this.previewPoint = null;
    else if (this.activeTool === "calibrate" && this.calibrateStart) {
      const i = this.getBoundingClientRect();
      this.calibrateCurrent = { x: t.clientX - i.left, y: t.clientY - i.top };
    } else if (this.activeTool === "rescale") {
      let i = u.snapPoint(
        e,
        this.project.grid,
        this.project.walls,
        this.rescaleStart || void 0
      );
      if (i.snappedTo === "none" && this.project.walls.length > 0) {
        const o = u.snapPointToWall(e, this.project.walls, 0.6);
        o && (i = { point: o.projectionPoint, snappedTo: "vertex" });
      }
      this.previewPoint = i.point, this.snapInfo = { snappedTo: i.snappedTo, guideAngle: i.guideAngle }, this.wallSnap = null, this.rescaleStart && (this.rescaleCurrent = i.point);
    } else
      this.previewPoint = null, this.wallSnap = null;
  }
  handlePointerUp(t) {
    var e, i;
    this.isPanning && (this.isPanning = !1, (i = (e = t.target).releasePointerCapture) == null || i.call(e, t.pointerId));
  }
  // ==========================================
  // DRAG & DROP ENTITÉS HOME ASSISTANT
  // ==========================================
  handleDragOver(t) {
    t.preventDefault(), t.dataTransfer && (t.dataTransfer.dropEffect = "copy");
  }
  handleDrop(t) {
    var i, o;
    if (t.preventDefault(), (i = t.dataTransfer) != null && i.files && t.dataTransfer.files.length > 0) {
      const s = t.dataTransfer.files[0];
      if (s.type.startsWith("image/")) {
        const r = new FileReader();
        r.onload = (a) => {
          var l;
          const n = (l = a.target) == null ? void 0 : l.result;
          this.dispatchEvent(new CustomEvent("background-image-loaded", {
            detail: { dataUrl: n },
            bubbles: !0,
            composed: !0
          }));
        }, r.readAsDataURL(s);
        return;
      }
    }
    const e = (o = t.dataTransfer) == null ? void 0 : o.getData("application/json");
    if (e)
      try {
        const { entityId: s, domain: r, name: a, icon: n } = JSON.parse(e), l = this.screenToWorld(t.clientX, t.clientY), d = ce.findRoomContainingPoint(l, this.project.rooms), p = {
          id: `bind_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
          entityId: s,
          position: {
            x: u.roundMeters(l.x),
            y: u.roundMeters(l.y)
          },
          roomId: d == null ? void 0 : d.id,
          icon: n,
          customName: a,
          tapAction: "toggle"
        };
        this.project = {
          ...this.project,
          bindings: [...this.project.bindings, p]
        }, this.dispatchProjectChanged();
      } catch (s) {
        console.error("Erreur lors de la liaison entité HA:", s);
      }
  }
  handleEntityClick(t, e) {
    if (e.stopPropagation(), this.hass && this.hass.callService) {
      const i = t.entityId.split(".")[0];
      this.hass.callService(i, "toggle", { entity_id: t.entityId }).catch(() => {
        this.hass.callService("homeassistant", "toggle", { entity_id: t.entityId });
      });
    } else
      console.log(`[Demo Standalone] Toggle entité: ${t.entityId}`);
  }
  handleEntityDblClick(t, e) {
    e.stopPropagation(), this.dispatchEvent(new CustomEvent("hass-more-info", {
      detail: { entityId: t.entityId },
      bubbles: !0,
      composed: !0
    }));
  }
  handleKeyDown(t) {
    t.key === "Escape" ? (this.drawingWallStart = null, this.previewPoint = null, this.calibrateStart = null, this.calibrateCurrent = null, this.rescaleStart = null, this.rescaleCurrent = null, this.wallSnap = null, this.requestUpdate()) : t.key === " " || t.key === "Spacebar" ? this.wallSnap && (t.preventDefault(), this.openingFlipSide = !this.openingFlipSide, this.requestUpdate()) : t.key.toLowerCase() === "f" && this.wallSnap && (this.openingFlipDirection = !this.openingFlipDirection, this.requestUpdate());
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("keydown", this.handleKeyDown.bind(this));
  }
  disconnectedCallback() {
    super.disconnectedCallback(), window.removeEventListener("keydown", this.handleKeyDown.bind(this));
  }
  dispatchProjectChanged() {
    this.dispatchEvent(new CustomEvent("project-changed", {
      detail: { project: this.project },
      bubbles: !0,
      composed: !0
    }));
  }
  // ==========================================
  // RENDU GÉOMÉTRIQUE & 3D
  // ==========================================
  computeWallPolygon(t, e, i) {
    const o = e.x - t.x, s = e.y - t.y, r = Math.sqrt(o * o + s * s);
    if (r === 0) return [t, t, e, e];
    const a = i / 2, n = -s / r * a, l = o / r * a;
    return [
      { x: t.x + n, y: t.y + l },
      { x: e.x + n, y: e.y + l },
      { x: e.x - n, y: e.y - l },
      { x: t.x - n, y: t.y - l }
    ];
  }
  renderBackgroundLayer() {
    const t = this.project.background;
    if (!t || !t.imageUrl || !t.visible) return null;
    const e = this.worldToScreen(t.offset || { x: 0, y: 0 }), i = t.scale || 1;
    return x`
      <g 
        class="background-image-layer" 
        transform="translate(${e.x}, ${e.y}) scale(${this.viewport.zoom * i})"
        style="opacity: ${t.opacity};"
      >
        <image 
          href="${t.imageUrl}" 
          x="0" 
          y="0" 
          width="${t.widthPx || 1200}" 
          height="${t.heightPx || 900}" 
        />
      </g>
    `;
  }
  pointToSegmentDistance(t, e, i) {
    const o = i.x - e.x, s = i.y - e.y, r = o * o + s * s;
    if (r === 0) return u.distance(t, e);
    let a = ((t.x - e.x) * o + (t.y - e.y) * s) / r;
    a = Math.max(0, Math.min(1, a));
    const n = { x: e.x + a * o, y: e.y + a * s };
    return u.distance(t, n);
  }
  getWallHeight(t) {
    const e = this.project.defaultCeilingHeight || 2.5, i = {
      x: (t.start.x + t.end.x) / 2,
      y: (t.start.y + t.end.y) / 2
    }, o = (this.project.rooms || []).filter((s) => {
      if (!s.polygon || s.polygon.length < 3) return !1;
      if (ce.isPointInPolygon(i, s.polygon)) return !0;
      for (let r = 0; r < s.polygon.length; r++) {
        const a = s.polygon[r], n = s.polygon[(r + 1) % s.polygon.length];
        if (this.pointToSegmentDistance(i, a, n) <= t.thickness / 2 + 0.35)
          return !0;
      }
      return !1;
    });
    if (o.length > 0) {
      const s = o.map((r) => r.height || e);
      return Math.max(...s, t.height || 0);
    }
    return t.height || e;
  }
  handleRoomClick(t, e) {
    this.drawingWallStart || this.calibrateStart || this.rescaleStart || (t.stopPropagation(), this.dispatchEvent(new CustomEvent("room-selected", {
      detail: { room: e },
      bubbles: !0,
      composed: !0
    })));
  }
  // Rendu des Pièces avec détection d'illumination si lumière allumée
  renderRooms() {
    return this.project.rooms.map((t) => {
      if (!t.polygon || t.polygon.length < 3) return null;
      const e = t.polygon.map((n) => this.worldToScreen(n)), i = e.map((n) => `${n.x},${n.y}`).join(" "), o = this.project.bindings.filter((n) => n.roomId === t.id && n.entityId.startsWith("light.")).some((n) => {
        var d, p, c;
        return ((c = (p = (d = this.hass) == null ? void 0 : d.states) == null ? void 0 : p[n.entityId]) == null ? void 0 : c.state) === "on";
      }), s = ce.calculateCentroid(e), r = t.height || this.project.defaultCeilingHeight || 2.5, a = (t.areaM2 * r).toFixed(1);
      return x`
        <g class="room-group" data-room-id="${t.id}" @click=${(n) => this.handleRoomClick(n, t)}>
          <polygon 
            points="${i}" 
            class="room-polygon ${o ? "illuminated" : ""}"
            style="fill: ${t.color || "rgba(56, 189, 248, 0.12)"}; cursor: pointer;"
          />
          <g class="room-label-group" transform="translate(${s.x}, ${s.y})">
            <text class="room-label-name" y="${this.is3DMode ? -14 : -6}">${t.name}</text>
            <text class="room-label-area" y="${this.is3DMode ? 4 : 12}">${t.areaM2.toFixed(1)} m²</text>
            ${this.is3DMode ? x`
              <text class="room-label-height" y="20">H: ${r.toFixed(2)}m · ${a} m³</text>
            ` : null}
          </g>
        </g>
      `;
    });
  }
  renderGrid() {
    if (this.is3DMode) return null;
    const t = this.project.pixelsPerMeter * this.viewport.zoom, i = (this.project.grid.size || 0.5) * t;
    if (i < 12) return null;
    const o = i * 2;
    return x`
      <defs>
        <pattern id="grid-sub" width="${i}" height="${i}" patternUnits="userSpaceOnUse"
          patternTransform="translate(${this.viewport.x % i}, ${this.viewport.y % i})">
          <line x1="0" y1="0" x2="${i}" y2="0" stroke="rgba(255,255,255,0.06)" stroke-width="0.5" />
          <line x1="0" y1="0" x2="0" y2="${i}" stroke="rgba(255,255,255,0.06)" stroke-width="0.5" />
        </pattern>
        <pattern id="grid-major" width="${o}" height="${o}" patternUnits="userSpaceOnUse"
          patternTransform="translate(${this.viewport.x % o}, ${this.viewport.y % o})">
          <line x1="0" y1="0" x2="${o}" y2="0" stroke="rgba(255,255,255,0.14)" stroke-width="1" />
          <line x1="0" y1="0" x2="0" y2="${o}" stroke="rgba(255,255,255,0.14)" stroke-width="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid-sub)" />
      <rect width="100%" height="100%" fill="url(#grid-major)" />
    `;
  }
  renderWalls() {
    const t = this.project.pixelsPerMeter * this.viewport.zoom;
    return this.project.walls.map((e) => {
      const i = this.getWallHeight(e), o = this.is3DMode ? i * t * 0.55 : 0, r = this.computeWallPolygon(e.start, e.end, e.thickness).map((c) => this.worldToScreen(c)), a = this.worldToScreen(e.start), n = this.worldToScreen(e.end), l = r.map((c) => `${c.x},${c.y}`).join(" "), d = u.distance(e.start, e.end), p = {
        x: (a.x + n.x) / 2,
        y: (a.y + n.y) / 2
      };
      if (this.is3DMode) {
        const c = r.map((g) => ({ x: g.x, y: g.y - o })), f = c.map((g) => `${g.x},${g.y}`).join(" ");
        return x`
          <g class="wall-element-3d" data-wall-id="${e.id}">
            <!-- Paroi latérale ombrée 1 -->
            <polygon points="${r[0].x},${r[0].y} ${r[1].x},${r[1].y} ${c[1].x},${c[1].y} ${c[0].x},${c[0].y}" class="wall-3d-side-shaded" />
            <!-- Paroi latérale ombrée 2 -->
            <polygon points="${r[1].x},${r[1].y} ${r[2].x},${r[2].y} ${c[2].x},${c[2].y} ${c[1].x},${c[1].y}" class="wall-3d-side-light" />
            <!-- Chapeau supérieur du mur -->
            <polygon points="${f}" class="wall-3d-top" />
          </g>
        `;
      }
      return x`
        <g class="wall-element" data-wall-id="${e.id}">
          <polygon points="${l}" class="wall-rect" />
          <line x1="${a.x}" y1="${a.y}" x2="${n.x}" y2="${n.y}" class="wall-centerline" />
          
          ${d >= 0.6 ? x`
            <g class="dimension-badge" transform="translate(${p.x}, ${p.y - 14})">
              <rect x="-26" y="-10" width="52" height="20" />
              <text>${u.roundMeters(d).toFixed(2)} m</text>
            </g>
          ` : null}
        </g>
      `;
    });
  }
  renderOpenings() {
    return this.project.openings.map((t) => {
      const e = this.project.walls.find((g) => g.id === t.wallId);
      if (!e) return null;
      const i = e.end.x - e.start.x, o = e.end.y - e.start.y, s = Math.sqrt(i * i + o * o);
      if (s === 0) return null;
      const a = Math.atan2(o, i) * 180 / Math.PI, n = e.start.x + t.offset / s * i, l = e.start.y + t.offset / s * o, d = this.worldToScreen({ x: n, y: l }), p = this.project.pixelsPerMeter * this.viewport.zoom, c = t.width * p, f = e.thickness * p;
      return x`
        <g 
          class="opening-element" 
          transform="translate(${d.x}, ${d.y}) rotate(${a})"
        >
          <rect 
            x="${-c / 2}" 
            y="${-f / 2 - 1}" 
            width="${c}" 
            height="${f + 2}" 
            class="wall-cutout"
          />

          ${t.type === "door" ? this.renderDoorSymbol(c, f, t.flipSide, t.flipDirection) : null}
          ${t.type === "window" ? this.renderWindowSymbol(c, f) : null}
          ${t.type === "french_window" ? this.renderFrenchWindowSymbol(c, f) : null}
        </g>
      `;
    });
  }
  renderDoorSymbol(t, e, i, o) {
    const s = t / 2, r = i ? -1 : 1, a = o ? s : -s, n = o ? -1 : 1;
    return x`
      <g>
        <rect x="${-s}" y="${-e / 2}" width="4" height="${e}" fill="#94a3b8" />
        <rect x="${s - 4}" y="${-e / 2}" width="4" height="${e}" fill="#94a3b8" />
        <line 
          x1="${a}" 
          y1="0" 
          x2="${a}" 
          y2="${r * t}" 
          class="opening-door-leaf" 
        />
        <path 
          d="M ${a + n * t} 0 A ${t} ${t} 0 0 ${r > 0 ? o ? 0 : 1 : o ? 1 : 0} ${a} ${r * t}" 
          class="opening-door-arc" 
        />
      </g>
    `;
  }
  renderWindowSymbol(t, e) {
    const i = t / 2;
    return x`
      <g>
        <rect x="${-i}" y="${-e / 2}" width="${t}" height="${e}" fill="none" class="opening-window-frame" />
        <line x1="${-i}" y1="0" x2="${i}" y2="0" class="opening-window-glass" />
        <line x1="${-i + 4}" y1="${-e / 4}" x2="${i - 4}" y2="${-e / 4}" stroke="rgba(56, 189, 248, 0.4)" stroke-width="1" />
        <line x1="${-i + 4}" y1="${e / 4}" x2="${i - 4}" y2="${e / 4}" stroke="rgba(56, 189, 248, 0.4)" stroke-width="1" />
      </g>
    `;
  }
  renderFrenchWindowSymbol(t, e) {
    const i = t / 2;
    return x`
      <g>
        <rect x="${-i}" y="${-e / 2}" width="${t}" height="${e}" fill="none" class="opening-window-frame" />
        <rect x="${-i}" y="${-e / 4}" width="${i}" height="3" fill="#38bdf8" />
        <rect x="0" y="${e / 4}" width="${i}" height="3" fill="#38bdf8" />
      </g>
    `;
  }
  // ==========================================
  // RENDU DES PINS D'ENTITÉS HOME ASSISTANT
  // ==========================================
  renderEntityBindings() {
    return this.project.bindings.map((t) => {
      var l, d, p;
      const e = this.worldToScreen(t.position), i = (d = (l = this.hass) == null ? void 0 : l.states) == null ? void 0 : d[t.entityId], o = (i == null ? void 0 : i.state) || "off", s = t.entityId.startsWith("light.") && o === "on", r = t.entityId.startsWith("binary_sensor.") && (o === "on" || o === "detected"), a = t.entityId.startsWith("sensor.") || t.entityId.startsWith("climate."), n = ((p = i == null ? void 0 : i.attributes) == null ? void 0 : p.unit_of_measurement) || (a ? "°" : "");
      return x`
        <g 
          class="entity-pin ${s ? "active-light" : ""} ${r ? "active-radar" : ""}"
          transform="translate(${e.x}, ${e.y})"
          @click=${(c) => this.handleEntityClick(t, c)}
          @dblclick=${(c) => this.handleEntityDblClick(t, c)}
          title="${t.customName || t.entityId} : ${o} (Clic pour basculer)"
        >
          <!-- Onde radar animée si mouvement détecté -->
          ${r ? x`<circle cx="0" cy="0" r="16" class="radar-pulse-ring" />` : null}

          <!-- Pastille de fond -->
          <circle cx="0" cy="0" r="16" class="entity-pin-bg" />

          <!-- Pictogramme -->
          <text x="0" y="0" class="entity-pin-icon">
            ${t.icon || "⚡"}
          </text>

          <!-- Étiquette Nom -->
          <text x="0" y="27" class="entity-pin-label">
            ${t.customName || t.entityId.split(".")[1]}
          </text>

          <!-- Badge Valeur (Thermostat / Capteur) -->
          ${a && o !== "unknown" ? x`
            <g class="entity-pin-value-badge" transform="translate(14, -14)">
              <rect x="-14" y="-8" width="28" height="16" />
              <text>${o}${n}</text>
            </g>
          ` : null}
        </g>
      `;
    });
  }
  renderOpeningPreview() {
    if (!this.wallSnap) return null;
    const t = this.project.pixelsPerMeter * this.viewport.zoom, e = (this.currentOpeningWidth || 0.9) * t, i = this.wallSnap.wall.thickness * t, o = this.worldToScreen(this.wallSnap.projectionPoint), s = this.wallSnap.angleRad * 180 / Math.PI;
    return x`
      <g 
        class="opening-preview" 
        transform="translate(${o.x}, ${o.y}) rotate(${s})"
      >
        <rect x="${-e / 2}" y="${-i / 2}" width="${e}" height="${i}" fill="rgba(56, 189, 248, 0.3)" stroke="#38bdf8" stroke-dasharray="4, 2" />
        ${this.activeTool === "door" ? this.renderDoorSymbol(e, i, this.openingFlipSide, this.openingFlipDirection) : null}
        ${this.activeTool === "window" ? this.renderWindowSymbol(e, i) : null}
        ${this.activeTool === "french_window" ? this.renderFrenchWindowSymbol(e, i) : null}
      </g>
    `;
  }
  renderPreviewWall() {
    if (!this.drawingWallStart || !this.previewPoint) return null;
    const e = this.computeWallPolygon(
      this.drawingWallStart,
      this.previewPoint,
      this.currentWallThickness
    ).map((n) => this.worldToScreen(n)), i = this.worldToScreen(this.drawingWallStart), o = this.worldToScreen(this.previewPoint), s = e.map((n) => `${n.x},${n.y}`).join(" "), r = u.distance(this.drawingWallStart, this.previewPoint), a = {
      x: (i.x + o.x) / 2,
      y: (i.y + o.y) / 2
    };
    return x`
      <g class="preview-wall-group">
        <polygon points="${s}" class="preview-wall-rect" />
        <line x1="${i.x}" y1="${i.y}" x2="${o.x}" y2="${o.y}" class="preview-wall-line" />

        ${this.snapInfo.guideAngle !== void 0 ? x`
          <line x1="${i.x}" y1="${i.y}" x2="${o.x}" y2="${o.y}" class="angle-guide-line" />
        ` : null}

        <g class="dimension-badge" transform="translate(${a.x}, ${a.y - 16})">
          <rect x="-30" y="-11" width="60" height="22" />
          <text>${u.roundMeters(r).toFixed(2)} m</text>
        </g>
      </g>
    `;
  }
  renderCalibrationLine() {
    if (!this.calibrateStart || !this.calibrateCurrent) return null;
    const t = this.calibrateStart, e = this.calibrateCurrent, i = e.x - t.x, o = e.y - t.y, s = Math.sqrt(i * i + o * o), r = { x: (t.x + e.x) / 2, y: (t.y + e.y) / 2 };
    return x`
      <g class="calibration-preview-group">
        <line x1="${t.x}" y1="${t.y}" x2="${e.x}" y2="${e.y}" class="calibration-line" />
        <circle cx="${t.x}" cy="${t.y}" r="6" class="calibration-endpoint" />
        <circle cx="${e.x}" cy="${e.y}" r="6" class="calibration-endpoint" />

        <g class="dimension-badge" transform="translate(${r.x}, ${r.y - 18})">
          <rect x="-35" y="-11" width="70" height="22" style="stroke: #f59e0b;" />
          <text style="fill: #f59e0b;">${Math.round(s)} px</text>
        </g>
      </g>
    `;
  }
  renderRescaleLine() {
    if (!this.rescaleStart || !this.rescaleCurrent) return null;
    const t = this.worldToScreen(this.rescaleStart), e = this.worldToScreen(this.rescaleCurrent), i = u.distance(this.rescaleStart, this.rescaleCurrent), o = {
      x: (t.x + e.x) / 2,
      y: (t.y + e.y) / 2
    };
    return x`
      <g class="rescale-preview-group">
        <line 
          x1="${t.x}" y1="${t.y}" 
          x2="${e.x}" y2="${e.y}" 
          stroke="#38bdf8" 
          stroke-width="3" 
          stroke-dasharray="6, 4" 
        />
        <circle cx="${t.x}" cy="${t.y}" r="6" fill="#38bdf8" stroke="#ffffff" stroke-width="2" />
        <circle cx="${e.x}" cy="${e.y}" r="6" fill="#0284c7" stroke="#38bdf8" stroke-width="2" />

        <g class="dimension-badge" transform="translate(${o.x}, ${o.y - 18})">
          <rect x="-48" y="-13" width="96" height="26" rx="6" fill="#0f172a" stroke="#38bdf8" stroke-width="1.8" />
          <text fill="#38bdf8" font-size="12px" font-weight="800" text-anchor="middle" dy="5">
            📐 ${u.roundMeters(i).toFixed(2)} m
          </text>
        </g>
      </g>
    `;
  }
  renderSnapIndicator() {
    if (!this.previewPoint || this.snapInfo.snappedTo === "none") return null;
    const t = this.worldToScreen(this.previewPoint), e = this.snapInfo.snappedTo === "vertex";
    return x`
      <g transform="translate(${t.x}, ${t.y})">
        <circle r="${e ? 7 : 5}" class="snap-indicator" />
        ${e ? x`<circle r="2" fill="#38bdf8" />` : null}
      </g>
    `;
  }
  zoomIn() {
    this.viewport = { ...this.viewport, zoom: Math.min(this.viewport.zoom * 1.25, 8) };
  }
  zoomOut() {
    this.viewport = { ...this.viewport, zoom: Math.max(this.viewport.zoom / 1.25, 0.15) };
  }
  resetView() {
    this.viewport = { x: 300, y: 300, zoom: 1 };
  }
  toggle3DMode() {
    this.is3DMode = !this.is3DMode, this.dispatchEvent(new CustomEvent("toggle-3d", {
      detail: { is3DMode: this.is3DMode },
      bubbles: !0,
      composed: !0
    }));
  }
  getHelpMessage() {
    return this.is3DMode ? "Vue 3D Isométrique : Murs extrudés avec éclairage dynamique." : this.activeTool === "wall" ? this.drawingWallStart ? "Cliquez pour terminer le mur. Échap pour annuler." : "Cliquez pour démarrer un mur." : this.activeTool === "door" ? "Survolez un mur. Espace = inverser intérieur/extérieur. F = gauche/droite." : this.activeTool === "window" || this.activeTool === "french_window" ? "Survolez un mur pour insérer la fenêtre." : this.activeTool === "calibrate" ? this.calibrateStart ? "Cliquez sur la 2ème extrémité du mur mesuré." : "Tracez un segment sur un mur pour étalonner l'échelle." : this.activeTool === "rescale" ? this.rescaleStart ? "Tracez la ligne jusqu'au 2ème point (autre extrémité du mur ou point de référence)." : "Mettre à l'échelle : Sélectionnez un mur ou cliquez sur le 1er point de mesure." : null;
  }
  render() {
    const t = this.getHelpMessage();
    return b`
      <div 
        class="canvas-container ${this.isPanning ? "is-panning" : ""}"
        @wheel=${this.handleWheel}
        @pointerdown=${this.handlePointerDown}
        @pointermove=${this.handlePointerMove}
        @pointerup=${this.handlePointerUp}
        @dragover=${this.handleDragOver}
        @drop=${this.handleDrop}
      >
        <div class="viewport-3d-wrapper ${this.is3DMode ? "mode-3d" : ""}">
          <svg class="main-viewport">
            ${this.renderBackgroundLayer()}
            ${this.renderGrid()}
            ${this.renderRooms()}
            ${this.renderWalls()}
            ${this.renderOpenings()}
            ${this.renderOpeningPreview()}
            ${this.renderPreviewWall()}
            ${this.renderCalibrationLine()}
            ${this.renderRescaleLine()}
            ${this.renderSnapIndicator()}
            ${this.renderEntityBindings()}
          </svg>
        </div>

        ${t ? b`<div class="help-hud">${t}</div>` : null}

        <div class="coords-hud">
          X: ${this.cursorCoords.x.toFixed(2)} m | Y: ${this.cursorCoords.y.toFixed(2)} m | Outil: ${this.activeTool.toUpperCase()}
        </div>

        <!-- HUD Contrôles Zoom & 3D -->
        <div class="canvas-hud">
          <button 
            class="hud-btn ${this.is3DMode ? "active" : ""}" 
            @click=${this.toggle3DMode} 
            title="Basculer Vue 2D / 3D Isométrique"
          >
            ${this.is3DMode ? "🧊" : "📐"}
          </button>
          <button class="hud-btn" @click=${this.zoomOut} title="Zoom Arrière">−</button>
          <div class="hud-zoom-label">${Math.round(this.viewport.zoom * 100)}%</div>
          <button class="hud-btn" @click=${this.zoomIn} title="Zoom Avant">+</button>
          <button class="hud-btn" @click=${this.resetView} title="Recentrer">⌖</button>
        </div>
      </div>
    `;
  }
};
m.styles = ut;
w([
  v({ type: Object })
], m.prototype, "hass", 2);
w([
  v({ type: Object })
], m.prototype, "project", 2);
w([
  v({ type: String })
], m.prototype, "activeTool", 2);
w([
  v({ type: Number })
], m.prototype, "currentWallThickness", 2);
w([
  v({ type: Number })
], m.prototype, "currentOpeningWidth", 2);
w([
  v({ type: Boolean })
], m.prototype, "is3DMode", 2);
w([
  h()
], m.prototype, "viewport", 2);
w([
  h()
], m.prototype, "isPanning", 2);
w([
  h()
], m.prototype, "drawingWallStart", 2);
w([
  h()
], m.prototype, "previewPoint", 2);
w([
  h()
], m.prototype, "snapInfo", 2);
w([
  h()
], m.prototype, "cursorCoords", 2);
w([
  h()
], m.prototype, "wallSnap", 2);
w([
  h()
], m.prototype, "openingFlipSide", 2);
w([
  h()
], m.prototype, "openingFlipDirection", 2);
w([
  h()
], m.prototype, "calibrateStart", 2);
w([
  h()
], m.prototype, "calibrateCurrent", 2);
w([
  h()
], m.prototype, "rescaleStart", 2);
w([
  h()
], m.prototype, "rescaleCurrent", 2);
m = w([
  D("home-architect-canvas")
], m);
var bt = Object.defineProperty, mt = Object.getOwnPropertyDescriptor, ue = (t, e, i, o) => {
  for (var s = o > 1 ? void 0 : o ? mt(e, i) : e, r = t.length - 1, a; r >= 0; r--)
    (a = t[r]) && (s = (o ? a(e, i, s) : a(s)) || s);
  return o && s && bt(e, i, s), s;
};
let Y = class extends _ {
  constructor() {
    super(...arguments), this.activeTool = "wall", this.position = { x: 20, y: 20 }, this.isDragging = !1, this.dragStartPointer = { x: 0, y: 0 }, this.dragStartPosition = { x: 20, y: 20 };
  }
  connectedCallback() {
    super.connectedCallback();
    try {
      const t = localStorage.getItem("home_architect_toolbar_pos");
      if (t) {
        const e = JSON.parse(t);
        typeof e.x == "number" && typeof e.y == "number" && (this.position = e);
      }
    } catch {
    }
    this.updateHostPosition();
  }
  updated(t) {
    super.updated(t), t.has("position") && this.updateHostPosition();
  }
  updateHostPosition() {
    this.style.left = `${this.position.x}px`, this.style.top = `${this.position.y}px`;
  }
  handleDragStart(t) {
    if (t.button !== 0) return;
    t.preventDefault(), t.stopPropagation(), this.isDragging = !0, this.dragStartPointer = { x: t.clientX, y: t.clientY }, this.dragStartPosition = { ...this.position }, t.currentTarget.setPointerCapture(t.pointerId);
  }
  handleDragMove(t) {
    if (!this.isDragging) return;
    t.preventDefault(), t.stopPropagation();
    const e = t.clientX - this.dragStartPointer.x, i = t.clientY - this.dragStartPointer.y, s = (this.parentElement || document.body).getBoundingClientRect(), r = this.getBoundingClientRect(), a = 8, n = Math.max(a, s.width - r.width - 8), l = 8, d = Math.max(l, s.height - r.height - 8), p = Math.min(Math.max(this.dragStartPosition.x + e, a), n), c = Math.min(Math.max(this.dragStartPosition.y + i, l), d);
    this.position = { x: Math.round(p), y: Math.round(c) }, this.updateHostPosition();
  }
  handleDragEnd(t) {
    if (this.isDragging) {
      this.isDragging = !1;
      try {
        t.currentTarget.releasePointerCapture(t.pointerId);
      } catch {
      }
      try {
        localStorage.setItem("home_architect_toolbar_pos", JSON.stringify(this.position));
      } catch {
      }
    }
  }
  selectTool(t) {
    this.dispatchEvent(new CustomEvent("tool-selected", {
      detail: { tool: t },
      bubbles: !0,
      composed: !0
    }));
  }
  openWizard() {
    this.dispatchEvent(new CustomEvent("open-wizard", {
      bubbles: !0,
      composed: !0
    }));
  }
  openImportModal() {
    this.dispatchEvent(new CustomEvent("open-import-modal", {
      bubbles: !0,
      composed: !0
    }));
  }
  render() {
    return b`
      <!-- Poignée de déplacement de la boîte à outils -->
      <div 
        class="drag-handle ${this.isDragging ? "dragging" : ""}"
        @pointerdown=${this.handleDragStart}
        @pointermove=${this.handleDragMove}
        @pointerup=${this.handleDragEnd}
        @pointercancel=${this.handleDragEnd}
        title="Glisser pour déplacer la boîte à outils"
      >
        <div class="grip-dots">•••</div>
      </div>

      <!-- Assistant Débutant -->
      <button 
        class="tool-btn highlight" 
        @click=${this.openWizard} 
        title="Assistant Débutant : Créer une pièce guidée (🪄)"
      >
        🪄
      </button>

      <div class="divider"></div>

      <!-- Outil Sélection / Pan -->
      <button 
        class="tool-btn ${this.activeTool === "select" ? "active" : ""}" 
        @click=${() => this.selectTool("select")} 
        title="Sélectionner & Déplacer (V)"
      >
        👆
      </button>

      <!-- Outil Mur -->
      <button 
        class="tool-btn ${this.activeTool === "wall" ? "active" : ""}" 
        @click=${() => this.selectTool("wall")} 
        title="Tracer un mur (W)"
      >
        🧱
      </button>

      <div class="divider"></div>

      <!-- Outil Porte -->
      <button 
        class="tool-btn ${this.activeTool === "door" ? "active" : ""}" 
        @click=${() => this.selectTool("door")} 
        title="Insérer une porte (D)"
      >
        🚪
      </button>

      <!-- Outil Fenêtre -->
      <button 
        class="tool-btn ${this.activeTool === "window" ? "active" : ""}" 
        @click=${() => this.selectTool("window")} 
        title="Insérer une fenêtre"
      >
        🪟
      </button>

      <!-- Outil Baie vitrée / Porte-fenêtre -->
      <button 
        class="tool-btn ${this.activeTool === "french_window" ? "active" : ""}" 
        @click=${() => this.selectTool("french_window")} 
        title="Insérer une baie coulissante"
      >
        🪞
      </button>

      <div class="divider"></div>

      <!-- Import de plan de fond & vectorisation -->
      <button 
        class="tool-btn" 
        @click=${this.openImportModal} 
        title="Importer un plan (PNG/JPG/SVG/PDF) ou Coller directement (Cmd+V / Ctrl+V)"
      >
        🖼️
      </button>

      <!-- Étalonnage d'échelle (calque image) -->
      <button 
        class="tool-btn ${this.activeTool === "calibrate" ? "active" : ""}" 
        @click=${() => this.selectTool("calibrate")} 
        title="Étalonnage d'échelle : tracer un mur mesuré sur l'image (M)"
      >
        📏
      </button>

      <!-- Mettre à l'échelle le plan (Recalculer toutes les cotes) -->
      <button 
        class="tool-btn ${this.activeTool === "rescale" ? "active" : ""}" 
        @click=${() => this.selectTool("rescale")} 
        title="Mettre à l'échelle : mesurer un mur pour recalculer toutes les cotes (S)"
      >
        📐
      </button>
    `;
  }
};
Y.styles = P`
    :host {
      position: absolute;
      left: 20px;
      top: 20px;
      display: flex;
      flex-direction: column;
      gap: 5px;
      background: rgba(30, 41, 59, 0.95);
      backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.14);
      border-radius: 14px;
      padding: 6px 6px 8px 6px;
      box-shadow: 0 12px 36px rgba(0, 0, 0, 0.5), 0 0 15px rgba(2, 132, 199, 0.2);
      z-index: 40;
      user-select: none;
      touch-action: none;
    }

    .drag-handle {
      height: 18px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: grab;
      color: #64748b;
      border-radius: 6px;
      transition: all 0.2s ease;
      margin-bottom: 2px;
    }

    .drag-handle:hover, .drag-handle.dragging {
      color: #38bdf8;
      background: rgba(56, 189, 248, 0.15);
    }

    .drag-handle.dragging {
      cursor: grabbing;
    }

    .grip-dots {
      font-size: 11px;
      letter-spacing: 3px;
      font-weight: 900;
      line-height: 1;
    }

    .tool-btn {
      background: transparent;
      color: #94a3b8;
      border: 1px solid transparent;
      border-radius: 10px;
      width: 42px;
      height: 42px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-size: 19px;
      transition: all 0.2s ease;
      position: relative;
    }

    .tool-btn:hover {
      background: rgba(51, 65, 85, 0.8);
      color: #f8fafc;
      transform: scale(1.05);
    }

    .tool-btn.active {
      background: #0284c7;
      color: #ffffff;
      border-color: #38bdf8;
      box-shadow: 0 0 12px rgba(56, 189, 248, 0.4);
    }

    .tool-btn.highlight {
      background: rgba(245, 158, 11, 0.15);
      border-color: rgba(245, 158, 11, 0.4);
      color: #f59e0b;
    }

    .tool-btn.highlight:hover {
      background: #f59e0b;
      color: #ffffff;
    }

    .divider {
      height: 1px;
      background: rgba(255, 255, 255, 0.1);
      margin: 3px 2px;
    }
  `;
ue([
  v({ type: String })
], Y.prototype, "activeTool", 2);
ue([
  h()
], Y.prototype, "position", 2);
ue([
  h()
], Y.prototype, "isDragging", 2);
Y = ue([
  D("home-architect-toolbar")
], Y);
var xt = Object.defineProperty, vt = Object.getOwnPropertyDescriptor, z = (t, e, i, o) => {
  for (var s = o > 1 ? void 0 : o ? vt(e, i) : e, r = t.length - 1, a; r >= 0; r--)
    (a = t[r]) && (s = (o ? a(e, i, s) : a(s)) || s);
  return o && s && xt(e, i, s), s;
};
const A = [
  {
    id: "living",
    name: "Salon / Séjour",
    icon: "🛋️",
    widthMeters: 6,
    lengthMeters: 4.5,
    wallThickness: 0.2,
    color: "rgba(56, 189, 248, 0.15)",
    addDoor: !0,
    addWindow: !0
  },
  {
    id: "bedroom",
    name: "Chambre",
    icon: "🛏️",
    widthMeters: 4,
    lengthMeters: 3.5,
    wallThickness: 0.15,
    color: "rgba(168, 85, 247, 0.15)",
    addDoor: !0,
    addWindow: !0
  },
  {
    id: "kitchen",
    name: "Cuisine",
    icon: "🍳",
    widthMeters: 4,
    lengthMeters: 3,
    wallThickness: 0.15,
    color: "rgba(234, 179, 8, 0.15)",
    addDoor: !0,
    addWindow: !0
  },
  {
    id: "bathroom",
    name: "Salle de Bains",
    icon: "🚿",
    widthMeters: 2.5,
    lengthMeters: 2.2,
    wallThickness: 0.1,
    color: "rgba(20, 184, 166, 0.15)",
    addDoor: !0,
    addWindow: !1
  },
  {
    id: "office",
    name: "Bureau",
    icon: "💼",
    widthMeters: 3.2,
    lengthMeters: 3,
    wallThickness: 0.15,
    color: "rgba(99, 102, 241, 0.15)",
    addDoor: !0,
    addWindow: !0
  },
  {
    id: "custom",
    name: "Sur Mesure",
    icon: "📐",
    widthMeters: 5,
    lengthMeters: 4,
    wallThickness: 0.2,
    color: "rgba(148, 163, 184, 0.15)",
    addDoor: !0,
    addWindow: !0
  }
];
let C = class extends _ {
  constructor() {
    super(...arguments), this.selectedTemplate = A[0], this.width = A[0].widthMeters, this.length = A[0].lengthMeters, this.thickness = A[0].wallThickness, this.addDoor = A[0].addDoor, this.addWindow = A[0].addWindow, this.roomName = A[0].name, this.height = 2.5;
  }
  selectTemplate(t) {
    this.selectedTemplate = t, this.width = t.widthMeters, this.length = t.lengthMeters, this.thickness = t.wallThickness, this.height = t.heightMeters || 2.5, this.addDoor = t.addDoor, this.addWindow = t.addWindow, this.roomName = t.name;
  }
  handleCreate() {
    this.dispatchEvent(new CustomEvent("create-room", {
      detail: {
        name: this.roomName,
        width: this.width,
        length: this.length,
        thickness: this.thickness,
        height: this.height,
        color: this.selectedTemplate.color,
        icon: this.selectedTemplate.icon,
        addDoor: this.addDoor,
        addWindow: this.addWindow
      },
      bubbles: !0,
      composed: !0
    }));
  }
  handleClose() {
    this.dispatchEvent(new CustomEvent("close", {
      bubbles: !0,
      composed: !0
    }));
  }
  render() {
    const t = (this.width * this.length).toFixed(1);
    return b`
      <div class="modal-card">
        <div class="modal-header">
          <div class="modal-title">
            <span>🪄</span>
            <span>Assistant Création de Pièce</span>
          </div>
          <button class="btn-close" @click=${this.handleClose}>✕</button>
        </div>

        <!-- Gabarits prédéfinis -->
        <div class="templates-grid">
          ${A.map((e) => b`
            <div 
              class="template-card ${this.selectedTemplate.id === e.id ? "selected" : ""}"
              @click=${() => this.selectTemplate(e)}
            >
              <div class="template-icon">${e.icon}</div>
              <div class="template-name">${e.name}</div>
              <div class="template-dims">${e.widthMeters}m × ${e.lengthMeters}m</div>
            </div>
          `)}
        </div>

        <!-- Paramétrage précis des dimensions -->
        <div class="config-section">
          <div class="field-row">
            <span class="field-label">Nom de la pièce :</span>
            <input 
              type="text" 
              style="width: 160px; text-align: left; padding-left: 8px;"
              .value=${this.roomName}
              @input=${(e) => this.roomName = e.target.value}
            />
          </div>

          <div class="field-row">
            <span class="field-label">Dimensions (Largeur × Longueur) :</span>
            <div class="field-inputs">
              <input 
                type="number" 
                step="0.1" 
                min="1" 
                max="30"
                .value=${this.width}
                @input=${(e) => this.width = parseFloat(e.target.value) || 1}
              />
              <span>m ×</span>
              <input 
                type="number" 
                step="0.1" 
                min="1" 
                max="30"
                .value=${this.length}
                @input=${(e) => this.length = parseFloat(e.target.value) || 1}
              />
              <span>m</span>
            </div>
          </div>

          <div class="field-row">
            <span class="field-label">Superficie calculée :</span>
            <span class="surface-badge">${t} m²</span>
          </div>

          <div class="field-row">
            <span class="field-label">Hauteur sous plafond (3D) :</span>
            <div class="field-inputs">
              <input 
                type="number" 
                step="0.1" 
                min="1.5" 
                max="10"
                .value=${this.height}
                @input=${(e) => this.height = parseFloat(e.target.value) || 2.5}
              />
              <span>m</span>
            </div>
          </div>

          <div class="field-row">
            <span class="field-label">Épaisseur des murs :</span>
            <select 
              .value=${this.thickness.toString()}
              @change=${(e) => this.thickness = parseFloat(e.target.value)}
            >
              <option value="0.10">Cloison 10 cm</option>
              <option value="0.15">Mur 15 cm</option>
              <option value="0.20">Porteur 20 cm</option>
              <option value="0.30">Extérieur 30 cm</option>
            </select>
          </div>

          <div class="checkboxes-row">
            <label>
              <input 
                type="checkbox" 
                ?checked=${this.addDoor} 
                @change=${(e) => this.addDoor = e.target.checked}
              />
              <span>Porte standard (0.90 m)</span>
            </label>

            <label>
              <input 
                type="checkbox" 
                ?checked=${this.addWindow} 
                @change=${(e) => this.addWindow = e.target.checked}
              />
              <span>Fenêtre (1.20 m)</span>
            </label>
          </div>
        </div>

        <div class="modal-actions">
          <button class="btn btn-cancel" @click=${this.handleClose}>Annuler</button>
          <button class="btn btn-create" @click=${this.handleCreate}>
            Générer la pièce sur le plan
          </button>
        </div>
      </div>
    `;
  }
};
C.styles = P`
    :host {
      position: fixed;
      inset: 0;
      background: rgba(15, 23, 42, 0.75);
      backdrop-filter: blur(8px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 100;
      font-family: var(--ha-font-family, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif);
      color: #f8fafc;
    }

    .modal-card {
      width: 90%;
      max-width: 540px;
      background: #1e293b;
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 18px;
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6);
      padding: 24px;
      display: flex;
      flex-direction: column;
      gap: 18px;
      animation: popIn 0.2s ease-out;
    }

    @keyframes popIn {
      from { transform: scale(0.95); opacity: 0; }
      to { transform: scale(1); opacity: 1; }
    }

    .modal-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      padding-bottom: 12px;
    }

    .modal-title {
      font-size: 1.2rem;
      font-weight: 700;
      display: flex;
      align-items: center;
      gap: 10px;
      color: #38bdf8;
    }

    .btn-close {
      background: transparent;
      border: none;
      color: #94a3b8;
      font-size: 20px;
      cursor: pointer;
      line-height: 1;
    }

    .btn-close:hover {
      color: #ffffff;
    }

    .templates-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
    }

    .template-card {
      background: rgba(15, 23, 42, 0.6);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 12px;
      padding: 12px 8px;
      text-align: center;
      cursor: pointer;
      transition: all 0.2s ease;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
    }

    .template-card:hover {
      background: rgba(51, 65, 85, 0.8);
      border-color: #38bdf8;
      transform: translateY(-2px);
    }

    .template-card.selected {
      background: rgba(2, 132, 199, 0.25);
      border-color: #38bdf8;
      box-shadow: 0 0 12px rgba(56, 189, 248, 0.3);
    }

    .template-icon {
      font-size: 24px;
    }

    .template-name {
      font-size: 0.85rem;
      font-weight: 600;
    }

    .template-dims {
      font-size: 0.72rem;
      color: #94a3b8;
    }

    .config-section {
      background: rgba(15, 23, 42, 0.5);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 12px;
      padding: 14px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .field-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }

    .field-label {
      font-size: 0.85rem;
      color: #cbd5e1;
    }

    .field-inputs {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    input[type="number"], select {
      background: #0f172a;
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: #f8fafc;
      padding: 6px 10px;
      border-radius: 6px;
      font-size: 0.85rem;
      width: 75px;
      outline: none;
      text-align: center;
    }

    input[type="number"]:focus, select:focus {
      border-color: #38bdf8;
      box-shadow: 0 0 0 2px rgba(56, 189, 248, 0.25);
    }

    .surface-badge {
      font-weight: 700;
      color: #38bdf8;
      font-family: ui-monospace, SFMono-Regular, monospace;
    }

    .checkboxes-row {
      display: flex;
      gap: 18px;
      font-size: 0.85rem;
      color: #cbd5e1;
    }

    .checkboxes-row label {
      display: flex;
      align-items: center;
      gap: 6px;
      cursor: pointer;
    }

    .modal-actions {
      display: flex;
      justify-content: flex-end;
      gap: 10px;
      margin-top: 4px;
    }

    .btn {
      padding: 9px 18px;
      border-radius: 8px;
      font-size: 0.85rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
      border: none;
    }

    .btn-cancel {
      background: rgba(51, 65, 85, 0.7);
      color: #cbd5e1;
    }

    .btn-cancel:hover {
      background: rgba(71, 85, 105, 0.9);
      color: #ffffff;
    }

    .btn-create {
      background: #0284c7;
      color: #ffffff;
      border: 1px solid #38bdf8;
      box-shadow: 0 0 12px rgba(56, 189, 248, 0.35);
    }

    .btn-create:hover {
      background: #0369a1;
      transform: translateY(-1px);
    }
  `;
z([
  h()
], C.prototype, "selectedTemplate", 2);
z([
  h()
], C.prototype, "width", 2);
z([
  h()
], C.prototype, "length", 2);
z([
  h()
], C.prototype, "thickness", 2);
z([
  h()
], C.prototype, "addDoor", 2);
z([
  h()
], C.prototype, "addWindow", 2);
z([
  h()
], C.prototype, "roomName", 2);
z([
  h()
], C.prototype, "height", 2);
C = z([
  D("home-architect-wizard-modal")
], C);
var yt = Object.defineProperty, wt = Object.getOwnPropertyDescriptor, ge = (t, e, i, o) => {
  for (var s = o > 1 ? void 0 : o ? wt(e, i) : e, r = t.length - 1, a; r >= 0; r--)
    (a = t[r]) && (s = (o ? a(e, i, s) : a(s)) || s);
  return o && s && yt(e, i, s), s;
};
let X = class extends _ {
  constructor() {
    super(...arguments), this.pixelDistance = 200, this.defaultMeters = 4, this.realMeters = 4;
  }
  firstUpdated() {
    this.realMeters = this.defaultMeters;
  }
  handleApply() {
    if (this.realMeters <= 0.05) return;
    const t = this.pixelDistance / this.realMeters;
    this.dispatchEvent(new CustomEvent("calibrate-confirmed", {
      detail: {
        realMeters: this.realMeters,
        pixelDistance: this.pixelDistance,
        pixelsPerMeter: t
      },
      bubbles: !0,
      composed: !0
    }));
  }
  handleClose() {
    this.dispatchEvent(new CustomEvent("close", {
      bubbles: !0,
      composed: !0
    }));
  }
  render() {
    const t = (this.pixelDistance / (this.realMeters || 1)).toFixed(1);
    return b`
      <div class="modal-card">
        <div class="modal-header">
          <div class="modal-title">
            <span>📏</span>
            <span>Étalonnage de l'Échelle</span>
          </div>
          <button class="btn-cancel" style="border:none; background:transparent; font-size:18px; cursor:pointer;" @click=${this.handleClose}>✕</button>
        </div>

        <div class="modal-desc">
          Indiquez la dimension réelle exacte du segment que vous venez de tracer sur votre plan pour calibrer automatiquement l'ensemble du projet.
        </div>

        <div class="input-box">
          <div class="input-row">
            <span class="input-label">Longueur réelle mesurée :</span>
            <div class="input-field-wrapper">
              <input 
                type="number" 
                step="0.05" 
                min="0.1" 
                max="50"
                .value=${this.realMeters}
                @input=${(e) => this.realMeters = parseFloat(e.target.value) || 0}
                @keydown=${(e) => e.key === "Enter" && this.handleApply()}
              />
              <span style="font-weight:600; color:#38bdf8;">mètres</span>
            </div>
          </div>

          <div class="measured-info">
            Distance tracée à l'écran : ${Math.round(this.pixelDistance)} px | Échelle résultante : ${t} px/m
          </div>
        </div>

        <div class="modal-actions">
          <button class="btn btn-cancel" @click=${this.handleClose}>Annuler</button>
          <button class="btn btn-apply" @click=${this.handleApply}>
            Appliquer l'échelle
          </button>
        </div>
      </div>
    `;
  }
};
X.styles = P`
    :host {
      position: fixed;
      inset: 0;
      background: rgba(15, 23, 42, 0.75);
      backdrop-filter: blur(8px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 100;
      font-family: var(--ha-font-family, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif);
      color: #f8fafc;
    }

    .modal-card {
      width: 90%;
      max-width: 440px;
      background: #1e293b;
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 18px;
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6);
      padding: 24px;
      display: flex;
      flex-direction: column;
      gap: 16px;
      animation: popIn 0.2s ease-out;
    }

    @keyframes popIn {
      from { transform: scale(0.95); opacity: 0; }
      to { transform: scale(1); opacity: 1; }
    }

    .modal-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      padding-bottom: 12px;
    }

    .modal-title {
      font-size: 1.15rem;
      font-weight: 700;
      display: flex;
      align-items: center;
      gap: 10px;
      color: #38bdf8;
    }

    .modal-desc {
      font-size: 0.85rem;
      color: #94a3b8;
      line-height: 1.4;
    }

    .input-box {
      background: rgba(15, 23, 42, 0.6);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 12px;
      padding: 14px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .input-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .input-label {
      font-size: 0.85rem;
      font-weight: 600;
      color: #cbd5e1;
    }

    .input-field-wrapper {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    input[type="number"] {
      background: #0f172a;
      border: 1px solid #38bdf8;
      color: #f8fafc;
      padding: 8px 12px;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 700;
      width: 100px;
      text-align: center;
      outline: none;
      box-shadow: 0 0 10px rgba(56, 189, 248, 0.25);
    }

    .measured-info {
      font-size: 0.75rem;
      color: #64748b;
      font-family: ui-monospace, SFMono-Regular, monospace;
    }

    .modal-actions {
      display: flex;
      justify-content: flex-end;
      gap: 10px;
    }

    .btn {
      padding: 8px 16px;
      border-radius: 8px;
      font-size: 0.85rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
      border: none;
    }

    .btn-cancel {
      background: rgba(51, 65, 85, 0.7);
      color: #cbd5e1;
    }

    .btn-cancel:hover {
      background: rgba(71, 85, 105, 0.9);
      color: #ffffff;
    }

    .btn-apply {
      background: #0284c7;
      color: #ffffff;
      border: 1px solid #38bdf8;
      box-shadow: 0 0 12px rgba(56, 189, 248, 0.35);
    }

    .btn-apply:hover {
      background: #0369a1;
      transform: translateY(-1px);
    }
  `;
ge([
  v({ type: Number })
], X.prototype, "pixelDistance", 2);
ge([
  v({ type: Number })
], X.prototype, "defaultMeters", 2);
ge([
  h()
], X.prototype, "realMeters", 2);
X = ge([
  D("home-architect-calibrate-modal")
], X);
var $t = Object.defineProperty, kt = Object.getOwnPropertyDescriptor, se = (t, e, i, o) => {
  for (var s = o > 1 ? void 0 : o ? kt(e, i) : e, r = t.length - 1, a; r >= 0; r--)
    (a = t[r]) && (s = (o ? a(e, i, s) : a(s)) || s);
  return o && s && $t(e, i, s), s;
};
const Ie = {
  light: "💡",
  switch: "🔌",
  binary_sensor: "🚨",
  climate: "🌡️",
  sensor: "📊",
  camera: "📷",
  media_player: "📺",
  cover: "🪟",
  fan: "💨",
  default: "⚡"
};
let U = class extends _ {
  constructor() {
    super(...arguments), this.collapsed = !1, this.searchQuery = "", this.activeCategory = "all";
  }
  getEntities() {
    var t;
    return (t = this.hass) != null && t.states ? Object.values(this.hass.states).map((e) => {
      var s, r;
      const i = e.entity_id.split(".")[0], o = Ie[i] || Ie.default;
      return {
        entity_id: e.entity_id,
        name: ((s = e.attributes) == null ? void 0 : s.friendly_name) || e.entity_id,
        state: e.state,
        domain: i,
        icon: o,
        unit: (r = e.attributes) == null ? void 0 : r.unit_of_measurement
      };
    }) : [
      { entity_id: "light.salon_plafonnier", name: "Plafonnier Salon", state: "on", domain: "light", icon: "💡" },
      { entity_id: "light.applique_cuisine", name: "Applique Cuisine", state: "off", domain: "light", icon: "💡" },
      { entity_id: "switch.prise_tv", name: "Prise Smart TV", state: "on", domain: "switch", icon: "🔌" },
      { entity_id: "binary_sensor.porte_entree", name: "Capteur Porte Entrée", state: "off", domain: "binary_sensor", icon: "🚪" },
      { entity_id: "binary_sensor.presence_salon", name: "Radar Présence Salon", state: "on", domain: "binary_sensor", icon: "🚨" },
      { entity_id: "climate.thermostat_sejour", name: "Thermostat Séjour", state: "21.5", domain: "climate", icon: "🌡️", unit: "°C" },
      { entity_id: "sensor.temperature_chambre", name: "Température Chambre", state: "19.8", domain: "sensor", icon: "🌡️", unit: "°C" },
      { entity_id: "camera.jardin", name: "Caméra Jardin Extérieur", state: "idle", domain: "camera", icon: "📷" }
    ];
  }
  handleDragStart(t, e) {
    t.dataTransfer && (t.dataTransfer.setData("application/json", JSON.stringify({
      entityId: e.entity_id,
      domain: e.domain,
      name: e.name,
      icon: e.icon
    })), t.dataTransfer.effectAllowed = "copy");
  }
  toggleCollapse() {
    this.dispatchEvent(new CustomEvent("toggle-collapse", {
      bubbles: !0,
      composed: !0
    }));
  }
  render() {
    if (this.collapsed) return null;
    let e = this.getEntities();
    if (this.activeCategory !== "all" && (e = e.filter((i) => i.domain === this.activeCategory)), this.searchQuery.trim()) {
      const i = this.searchQuery.toLowerCase();
      e = e.filter((o) => o.name.toLowerCase().includes(i) || o.entity_id.toLowerCase().includes(i));
    }
    return b`
      <div class="drawer-header">
        <div class="drawer-title">
          <span>⚡</span>
          <span>Entités HA</span>
          <span class="count-badge">${e.length}</span>
        </div>
        <button class="btn-toggle" @click=${this.toggleCollapse} title="Masquer / Réduire le volet">
          ⇤
        </button>
      </div>

      <div class="search-section">
        <div class="search-input-wrapper">
          <input 
            type="text" 
            class="search-input" 
            placeholder="Rechercher une entité..."
            .value=${this.searchQuery}
            @input=${(i) => this.searchQuery = i.target.value}
          />
        </div>

        <div class="categories-bar">
          <button class="cat-btn ${this.activeCategory === "all" ? "active" : ""}" @click=${() => this.activeCategory = "all"}>Tous</button>
          <button class="cat-btn ${this.activeCategory === "light" ? "active" : ""}" @click=${() => this.activeCategory = "light"}>Lumières</button>
          <button class="cat-btn ${this.activeCategory === "binary_sensor" ? "active" : ""}" @click=${() => this.activeCategory = "binary_sensor"}>Capteurs</button>
          <button class="cat-btn ${this.activeCategory === "climate" ? "active" : ""}" @click=${() => this.activeCategory = "climate"}>Climat</button>
          <button class="cat-btn ${this.activeCategory === "switch" ? "active" : ""}" @click=${() => this.activeCategory = "switch"}>Prises</button>
          <button class="cat-btn ${this.activeCategory === "camera" ? "active" : ""}" @click=${() => this.activeCategory = "camera"}>Caméras</button>
        </div>
      </div>

      <div class="entities-list">
        ${e.length === 0 ? b`
          <div class="empty-message">Aucune entité trouvée</div>
        ` : e.map((i) => b`
          <div 
            class="entity-card" 
            draggable="true"
            @dragstart=${(o) => this.handleDragStart(o, i)}
            title="Glissez et déposez sur une pièce du plan"
          >
            <div class="entity-info">
              <span class="entity-icon">${i.icon}</span>
              <div class="entity-details">
                <span class="entity-name">${i.name}</span>
                <span class="entity-id">${i.entity_id}</span>
              </div>
            </div>

            <span class="entity-state-badge ${i.state === "on" ? "state-on" : "state-off"}">
              ${i.state}${i.unit ? " " + i.unit : ""}
            </span>
          </div>
        `)}
      </div>

      <div class="drag-hint">
        <span>👆</span>
        <span>Glissez une entité sur une pièce du plan</span>
      </div>
    `;
  }
};
U.styles = P`
    :host {
      width: 320px;
      height: 100%;
      flex-shrink: 0;
      background: rgba(15, 23, 42, 0.96);
      border-left: 1px solid rgba(255, 255, 255, 0.12);
      box-shadow: -6px 0 24px rgba(0, 0, 0, 0.35);
      display: flex;
      flex-direction: column;
      z-index: 25;
      font-family: var(--ha-font-family, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif);
      color: #f8fafc;
      position: relative;
      transition: width 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    }

    :host([collapsed]) {
      width: 0 !important;
      overflow: hidden;
      border-left: none;
    }

    .drawer-header {
      padding: 14px 16px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: rgba(30, 41, 59, 0.4);
    }

    .drawer-title {
      font-size: 0.95rem;
      font-weight: 700;
      display: flex;
      align-items: center;
      gap: 8px;
      color: #38bdf8;
    }

    .count-badge {
      font-size: 0.72rem;
      padding: 2px 7px;
      background: rgba(56, 189, 248, 0.15);
      color: #38bdf8;
      border-radius: 9999px;
      border: 1px solid rgba(56, 189, 248, 0.3);
      font-weight: 700;
      font-family: ui-monospace, SFMono-Regular, monospace;
    }

    .btn-toggle {
      background: transparent;
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 6px;
      color: #94a3b8;
      font-size: 14px;
      cursor: pointer;
      padding: 4px 8px;
      transition: all 0.2s ease;
    }

    .btn-toggle:hover {
      color: #ffffff;
      background: rgba(255, 255, 255, 0.1);
      border-color: #38bdf8;
    }

    .search-section {
      padding: 12px 14px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      background: rgba(15, 23, 42, 0.3);
    }

    .search-input-wrapper {
      position: relative;
      display: flex;
      align-items: center;
    }

    .search-input {
      background: rgba(30, 41, 59, 0.85);
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 8px;
      color: #f8fafc;
      padding: 7px 12px;
      font-size: 0.83rem;
      outline: none;
      width: 100%;
      box-sizing: border-box;
      transition: border-color 0.2s;
    }

    .search-input:focus {
      border-color: #38bdf8;
      box-shadow: 0 0 0 2px rgba(56, 189, 248, 0.25);
    }

    .categories-bar {
      display: flex;
      gap: 5px;
      overflow-x: auto;
      padding-bottom: 4px;
      scrollbar-width: none;
    }

    .categories-bar::-webkit-scrollbar {
      display: none;
    }

    .cat-btn {
      background: rgba(51, 65, 85, 0.5);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 6px;
      color: #94a3b8;
      padding: 4px 8px;
      font-size: 0.73rem;
      font-weight: 600;
      cursor: pointer;
      white-space: nowrap;
      transition: all 0.15s ease;
    }

    .cat-btn:hover {
      background: rgba(71, 85, 105, 0.8);
      color: #f1f5f9;
    }

    .cat-btn.active {
      background: #0284c7;
      color: #ffffff;
      border-color: #38bdf8;
      box-shadow: 0 0 8px rgba(56, 189, 248, 0.3);
    }

    .entities-list {
      flex: 1;
      overflow-y: auto;
      padding: 10px 14px;
      display: flex;
      flex-direction: column;
      gap: 7px;
    }

    .entity-card {
      background: rgba(30, 41, 59, 0.65);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 9px;
      padding: 9px 11px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: grab;
      transition: all 0.18s ease;
      user-select: none;
    }

    .entity-card:hover {
      background: rgba(51, 65, 85, 0.9);
      border-color: #38bdf8;
      transform: translateX(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    }

    .entity-card:active {
      cursor: grabbing;
    }

    .entity-info {
      display: flex;
      align-items: center;
      gap: 10px;
      overflow: hidden;
    }

    .entity-icon {
      font-size: 1.25rem;
      min-width: 26px;
      text-align: center;
    }

    .entity-details {
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }

    .entity-name {
      font-size: 0.82rem;
      font-weight: 600;
      color: #f1f5f9;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .entity-id {
      font-size: 0.70rem;
      color: #64748b;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-family: ui-monospace, SFMono-Regular, monospace;
    }

    .entity-state-badge {
      font-size: 0.72rem;
      font-weight: 700;
      padding: 2px 7px;
      border-radius: 9999px;
      text-transform: uppercase;
      font-family: ui-monospace, SFMono-Regular, monospace;
      white-space: nowrap;
    }

    .state-on {
      background: rgba(234, 179, 8, 0.2);
      color: #facc15;
      border: 1px solid rgba(234, 179, 8, 0.4);
    }

    .state-off {
      background: rgba(100, 116, 139, 0.2);
      color: #94a3b8;
    }

    .drag-hint {
      padding: 10px 14px;
      background: rgba(2, 132, 199, 0.12);
      border-top: 1px solid rgba(56, 189, 248, 0.2);
      font-size: 0.74rem;
      color: #38bdf8;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
    }

    .empty-message {
      padding: 30px 16px;
      text-align: center;
      color: #64748b;
      font-size: 0.83rem;
    }
  `;
se([
  v({ type: Object })
], U.prototype, "hass", 2);
se([
  v({ type: Boolean, reflect: !0 })
], U.prototype, "collapsed", 2);
se([
  h()
], U.prototype, "searchQuery", 2);
se([
  h()
], U.prototype, "activeCategory", 2);
U = se([
  D("home-architect-entity-drawer")
], U);
var Mt = Object.defineProperty, _t = Object.getOwnPropertyDescriptor, re = (t, e, i, o) => {
  for (var s = o > 1 ? void 0 : o ? _t(e, i) : e, r = t.length - 1, a; r >= 0; r--)
    (a = t[r]) && (s = (o ? a(e, i, s) : a(s)) || s);
  return o && s && Mt(e, i, s), s;
};
const St = [
  { name: "Bleu ciel", color: "rgba(56, 189, 248, 0.18)" },
  { name: "Violet moderne", color: "rgba(168, 85, 247, 0.18)" },
  { name: "Ambre chaleureux", color: "rgba(245, 158, 11, 0.18)" },
  { name: "Émeraude nature", color: "rgba(16, 185, 129, 0.18)" },
  { name: "Indigo profond", color: "rgba(99, 102, 241, 0.18)" },
  { name: "Rose pastel", color: "rgba(244, 63, 94, 0.18)" },
  { name: "Gris ardoise", color: "rgba(148, 163, 184, 0.18)" }
], Ct = [
  { label: "2.10 m (Sous-sol)", val: 2.1 },
  { label: "2.30 m (Combles)", val: 2.3 },
  { label: "2.50 m (Standard)", val: 2.5 },
  { label: "2.70 m (Élevé)", val: 2.7 },
  { label: "3.00 m (Haussmann)", val: 3 },
  { label: "3.50 m (Cathédrale)", val: 3.5 }
];
let N = class extends _ {
  constructor() {
    super(...arguments), this.name = "", this.height = 2.5, this.color = "rgba(56, 189, 248, 0.18)";
  }
  connectedCallback() {
    super.connectedCallback(), this.room && (this.name = this.room.name || "Pièce", this.height = this.room.height || 2.5, this.color = this.room.color || "rgba(56, 189, 248, 0.18)");
  }
  close() {
    this.dispatchEvent(new CustomEvent("close", { bubbles: !0, composed: !0 }));
  }
  save() {
    this.dispatchEvent(new CustomEvent("save-room", {
      detail: {
        roomId: this.room.id,
        name: this.name.trim() || "Pièce",
        height: Math.max(1, this.height),
        color: this.color
      },
      bubbles: !0,
      composed: !0
    }));
  }
  deleteRoom() {
    confirm(`Voulez-vous supprimer la pièce "${this.room.name}" ?`) && this.dispatchEvent(new CustomEvent("delete-room", {
      detail: { roomId: this.room.id },
      bubbles: !0,
      composed: !0
    }));
  }
  render() {
    if (!this.room) return null;
    const t = (this.room.areaM2 * this.height).toFixed(1);
    return b`
      <div class="modal-card">
        <div class="modal-header">
          <div class="modal-title-group">
            <span class="modal-icon">${this.room.icon || "🏡"}</span>
            <div>
              <h3 class="modal-title">Propriétés de la pièce</h3>
            </div>
          </div>
          <button class="btn-close" @click=${this.close}>✕</button>
        </div>

        <div class="modal-body">
          <div class="form-group">
            <label class="form-label">Nom de la pièce :</label>
            <input 
              type="text" 
              class="form-input" 
              .value=${this.name} 
              @input=${(e) => this.name = e.target.value}
            />
          </div>

          <!-- Hauteur sous plafond 3D -->
          <div class="form-group">
            <label class="form-label">Hauteur sous plafond (Rendu 3D) :</label>
            <div class="height-input-row">
              <input 
                type="number" 
                step="0.05" 
                min="1.0" 
                max="12.0" 
                class="height-input" 
                .value=${this.height}
                @input=${(e) => this.height = parseFloat(e.target.value) || 2.5}
              />
              <span class="unit-tag">mètres</span>
            </div>

            <!-- Préréglages rapides -->
            <div class="presets-row">
              ${Ct.map((e) => b`
                <button 
                  class="preset-pill ${Math.abs(this.height - e.val) < 0.02 ? "active" : ""}"
                  @click=${() => this.height = e.val}
                >
                  ${e.label}
                </button>
              `)}
            </div>
          </div>

          <!-- Résumé Surface & Volume -->
          <div class="metrics-summary">
            <div class="metric-item">
              <span class="metric-label">Superficie au sol</span>
              <span class="metric-val">${this.room.areaM2.toFixed(1)} m²</span>
            </div>
            <div class="metric-item">
              <span class="metric-label">Volume 3D calculé</span>
              <span class="metric-val">${t} m³</span>
            </div>
          </div>

          <!-- Couleur de sol -->
          <div class="form-group">
            <label class="form-label">Couleur d'ambiance du sol :</label>
            <div class="colors-row">
              ${St.map((e) => b`
                <div 
                  class="color-swatch ${this.color === e.color ? "active" : ""}" 
                  style="background: ${e.color};"
                  title="${e.name}"
                  @click=${() => this.color = e.color}
                ></div>
              `)}
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button class="btn-delete" @click=${this.deleteRoom}>
            🗑️ Supprimer
          </button>
          <div class="footer-actions">
            <button class="btn-cancel" @click=${this.close}>Annuler</button>
            <button class="btn-save" @click=${this.save}>
              💾 Enregistrer
            </button>
          </div>
        </div>
      </div>
    `;
  }
};
N.styles = P`
    :host {
      position: fixed;
      inset: 0;
      background: rgba(15, 23, 42, 0.85);
      backdrop-filter: blur(12px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 100;
      font-family: var(--ha-font-family, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif);
      color: #f8fafc;
      animation: fadeIn 0.2s ease-out;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: scale(0.98); }
      to { opacity: 1; transform: scale(1); }
    }

    .modal-card {
      background: #1e293b;
      border: 1px solid rgba(56, 189, 248, 0.3);
      border-radius: 16px;
      width: 460px;
      max-width: 92vw;
      display: flex;
      flex-direction: column;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.6), 0 0 25px rgba(56, 189, 248, 0.25);
      overflow: hidden;
    }

    .modal-header {
      padding: 16px 20px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: rgba(15, 23, 42, 0.6);
    }

    .modal-title-group {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .modal-icon {
      font-size: 1.5rem;
    }

    .modal-title {
      font-size: 1.1rem;
      font-weight: 700;
      color: #f1f5f9;
      margin: 0;
    }

    .btn-close {
      background: transparent;
      border: none;
      color: #94a3b8;
      font-size: 20px;
      cursor: pointer;
      padding: 4px;
      border-radius: 6px;
      transition: all 0.15s ease;
    }

    .btn-close:hover {
      color: #ffffff;
      background: rgba(255, 255, 255, 0.1);
    }

    .modal-body {
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .form-label {
      font-size: 0.85rem;
      font-weight: 600;
      color: #cbd5e1;
    }

    .form-input {
      background: #0f172a;
      border: 1px solid rgba(255, 255, 255, 0.18);
      border-radius: 8px;
      color: #ffffff;
      padding: 8px 12px;
      font-size: 0.95rem;
      outline: none;
      transition: all 0.2s ease;
    }

    .form-input:focus {
      border-color: #38bdf8;
      box-shadow: 0 0 0 2px rgba(56, 189, 248, 0.25);
    }

    .height-input-row {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .height-input {
      flex: 1;
      background: #0f172a;
      border: 2px solid #0284c7;
      border-radius: 8px;
      color: #ffffff;
      padding: 8px 12px;
      font-size: 1.15rem;
      font-weight: 800;
      font-family: ui-monospace, SFMono-Regular, monospace;
      outline: none;
    }

    .height-input:focus {
      border-color: #38bdf8;
      box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.3);
    }

    .unit-tag {
      font-size: 0.95rem;
      font-weight: 700;
      color: #38bdf8;
    }

    .presets-row {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-top: 4px;
    }

    .preset-pill {
      background: rgba(30, 41, 59, 0.8);
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 6px;
      color: #94a3b8;
      font-size: 0.75rem;
      font-weight: 600;
      padding: 4px 8px;
      cursor: pointer;
      transition: all 0.15s ease;
    }

    .preset-pill:hover, .preset-pill.active {
      background: #0284c7;
      color: #ffffff;
      border-color: #38bdf8;
    }

    .metrics-summary {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      background: rgba(15, 23, 42, 0.5);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 10px;
      padding: 10px 14px;
    }

    .metric-item {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .metric-label {
      font-size: 0.74rem;
      color: #94a3b8;
      font-weight: 600;
      text-transform: uppercase;
    }

    .metric-val {
      font-size: 1.1rem;
      font-weight: 800;
      color: #38bdf8;
      font-family: ui-monospace, SFMono-Regular, monospace;
    }

    .colors-row {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }

    .color-swatch {
      width: 32px;
      height: 32px;
      border-radius: 8px;
      cursor: pointer;
      border: 2px solid transparent;
      transition: all 0.15s ease;
    }

    .color-swatch:hover, .color-swatch.active {
      transform: scale(1.1);
      border-color: #ffffff;
      box-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
    }

    .modal-footer {
      padding: 14px 20px;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(15, 23, 42, 0.6);
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .btn-delete {
      background: rgba(239, 68, 68, 0.15);
      color: #ef4444;
      border: 1px solid rgba(239, 68, 68, 0.3);
      border-radius: 8px;
      padding: 7px 12px;
      font-size: 0.82rem;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .btn-delete:hover {
      background: #ef4444;
      color: #ffffff;
    }

    .footer-actions {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .btn-cancel {
      background: transparent;
      color: #94a3b8;
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 8px;
      padding: 7px 14px;
      font-size: 0.85rem;
      cursor: pointer;
    }

    .btn-cancel:hover {
      color: #ffffff;
    }

    .btn-save {
      background: #0284c7;
      color: #ffffff;
      border: 1px solid #38bdf8;
      border-radius: 8px;
      padding: 7px 18px;
      font-size: 0.85rem;
      font-weight: 600;
      cursor: pointer;
      box-shadow: 0 0 12px rgba(56, 189, 248, 0.3);
    }

    .btn-save:hover {
      background: #0369a1;
    }
  `;
re([
  v({ type: Object })
], N.prototype, "room", 2);
re([
  h()
], N.prototype, "name", 2);
re([
  h()
], N.prototype, "height", 2);
re([
  h()
], N.prototype, "color", 2);
N = re([
  D("home-architect-room-modal")
], N);
var Pt = Object.defineProperty, Dt = Object.getOwnPropertyDescriptor, T = (t, e, i, o) => {
  for (var s = o > 1 ? void 0 : o ? Dt(e, i) : e, r = t.length - 1, a; r >= 0; r--)
    (a = t[r]) && (s = (o ? a(e, i, s) : a(s)) || s);
  return o && s && Pt(e, i, s), s;
};
let S = class extends _ {
  constructor() {
    super(...arguments), this.currentLevel = "rdc", this.imageDataUrl = null, this.imageWidth = 0, this.imageHeight = 0, this.imageName = "", this.calibrateMode = "auto_dimension", this.totalWidthMeters = 12, this.opacity = 0.4, this.isDragOver = !1, this.fileInputRef = null, this._boundPasteListener = null;
  }
  connectedCallback() {
    super.connectedCallback(), this._boundPasteListener = this.handleModalPaste.bind(this), window.addEventListener("paste", this._boundPasteListener);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._boundPasteListener && window.removeEventListener("paste", this._boundPasteListener);
  }
  handleModalPaste(t) {
    if (!t.clipboardData) return;
    const e = t.clipboardData.items;
    for (let i = 0; i < e.length; i++)
      if (e[i].type.indexOf("image") !== -1) {
        const o = e[i].getAsFile();
        if (o) {
          t.preventDefault(), this.processFile(o);
          return;
        }
      }
  }
  triggerFileInput() {
    if (!this.fileInputRef) {
      const t = document.createElement("input");
      t.type = "file", t.accept = "image/*", t.style.display = "none", t.addEventListener("change", (e) => {
        var o;
        const i = (o = e.target.files) == null ? void 0 : o[0];
        i && this.processFile(i);
      }), this.fileInputRef = t;
    }
    this.fileInputRef.click();
  }
  processFile(t) {
    this.imageName = t.name || "Plan importé";
    const e = new FileReader();
    e.onload = (i) => {
      var r;
      const o = (r = i.target) == null ? void 0 : r.result, s = new Image();
      s.onload = () => {
        this.imageDataUrl = o, this.imageWidth = s.naturalWidth, this.imageHeight = s.naturalHeight;
      }, s.src = o;
    }, e.readAsDataURL(t);
  }
  handleDrop(t) {
    var e;
    if (t.preventDefault(), this.isDragOver = !1, (e = t.dataTransfer) != null && e.files && t.dataTransfer.files.length > 0) {
      const i = t.dataTransfer.files[0];
      i.type.startsWith("image/") && this.processFile(i);
    }
  }
  handleDragOver(t) {
    t.preventDefault(), this.isDragOver = !0;
  }
  handleDragLeave() {
    this.isDragOver = !1;
  }
  async handlePasteButtonClick() {
    try {
      if (navigator.clipboard && navigator.clipboard.read) {
        const t = await navigator.clipboard.read();
        for (const e of t) {
          const i = e.types.find((o) => o.startsWith("image/"));
          if (i) {
            const o = await e.getType(i), s = new File([o], "clipboard_image.png", { type: i });
            this.processFile(s);
            return;
          }
        }
      }
      alert("Appuyez simplement sur Cmd+V ou Ctrl+V pour coller l'image directement !");
    } catch {
      alert("Appuyez directement sur Cmd+V ou Ctrl+V pour coller l'image de votre plan !");
    }
  }
  close() {
    this.dispatchEvent(new CustomEvent("close", { bubbles: !0, composed: !0 }));
  }
  confirmImport() {
    this.imageDataUrl && this.dispatchEvent(new CustomEvent("import-confirmed", {
      detail: {
        dataUrl: this.imageDataUrl,
        widthPx: this.imageWidth,
        heightPx: this.imageHeight,
        opacity: this.opacity,
        mode: this.calibrateMode,
        totalWidthMeters: this.totalWidthMeters,
        targetLevel: this.currentLevel
      },
      bubbles: !0,
      composed: !0
    }));
  }
  render() {
    return b`
      <div class="modal-card">
        <div class="modal-header">
          <div class="modal-title-group">
            <span class="modal-icon">📥</span>
            <div>
              <h3 class="modal-title">Importer & Vectoriser un plan</h3>
              <p class="modal-subtitle">Chargez votre plan en image (PNG, JPG, SVG) et calibrez-le automatiquement</p>
            </div>
          </div>
          <button class="btn-close" @click=${this.close}>✕</button>
        </div>

        <div class="modal-body">
          <!-- Zone de Dépôt ou Aperçu -->
          ${this.imageDataUrl ? b`
            <div class="preview-card">
              <img class="preview-thumb" src="${this.imageDataUrl}" alt="Aperçu du plan" />
              <div class="preview-meta">
                <div class="preview-title">
                  <span>✅</span>
                  <span>${this.imageName || "Plan sélectionné"}</span>
                </div>
                <div class="preview-dimensions">
                  Résolution : ${this.imageWidth} × ${this.imageHeight} px
                </div>
                <button class="btn-change-image" @click=${this.triggerFileInput}>
                  🔄 Remplacer l'image
                </button>
              </div>
            </div>
          ` : b`
            <div 
              class="drop-zone ${this.isDragOver ? "dragover" : ""}"
              @dragover=${this.handleDragOver}
              @dragleave=${this.handleDragLeave}
              @drop=${this.handleDrop}
              @click=${this.triggerFileInput}
            >
              <span class="drop-icon">🖼️</span>
              <div class="drop-text">Glissez-déposez l'image de votre plan ici</div>
              <div class="drop-subtext">Prend en charge PNG, JPG, JPEG, SVG et WebP</div>

              <div class="drop-actions" @click=${(t) => t.stopPropagation()}>
                <button class="btn-action-small" @click=${this.triggerFileInput}>
                  📁 Choisir un fichier
                </button>
                <button class="btn-action-small" @click=${this.handlePasteButtonClick}>
                  📋 Coller (Cmd+V)
                </button>
              </div>
            </div>
          `}

          <!-- Méthode d'Étalonnage Automatisée -->
          <div>
            <div class="section-title">
              <span>📏</span>
              <span>Étalonnage de l'échelle (Mètres réels)</span>
            </div>

            <div class="calibrate-options">
              <!-- Option A : Automatisé par dimension globale -->
              <div 
                class="option-card ${this.calibrateMode === "auto_dimension" ? "selected" : ""}"
                @click=${() => this.calibrateMode = "auto_dimension"}
              >
                <input 
                  type="radio" 
                  class="option-radio" 
                  name="calib" 
                  .checked=${this.calibrateMode === "auto_dimension"}
                  @change=${() => this.calibrateMode = "auto_dimension"}
                />
                <div class="option-content">
                  <div class="option-title">
                    <span>⚡ Étalonnage automatique instantané</span>
                    <span class="option-badge">Recommandé</span>
                  </div>
                  <div class="option-desc">
                    Indiquez la largeur totale estimée de la façade ou du bâtiment. L'échelle sera calculée automatiquement.
                  </div>

                  ${this.calibrateMode === "auto_dimension" ? b`
                    <div class="input-row" @click=${(t) => t.stopPropagation()}>
                      <label style="font-size: 0.82rem; color: #94a3b8;">Largeur totale :</label>
                      <input 
                        type="number" 
                        step="0.5" 
                        min="1" 
                        max="100" 
                        class="dimension-input"
                        .value=${this.totalWidthMeters}
                        @input=${(t) => this.totalWidthMeters = parseFloat(t.target.value) || 10}
                      />
                      <span class="unit-tag">mètres</span>
                    </div>
                  ` : null}
                </div>
              </div>

              <!-- Option B : Tracé manuel assisté sur un mur -->
              <div 
                class="option-card ${this.calibrateMode === "interactive_calibrate" ? "selected" : ""}"
                @click=${() => this.calibrateMode = "interactive_calibrate"}
              >
                <input 
                  type="radio" 
                  class="option-radio" 
                  name="calib" 
                  .checked=${this.calibrateMode === "interactive_calibrate"}
                  @change=${() => this.calibrateMode = "interactive_calibrate"}
                />
                <div class="option-content">
                  <div class="option-title">
                    <span>📐 Étalonnage assisté par mesure de mur</span>
                  </div>
                  <div class="option-desc">
                    Vous tracerez un segment directement sur un mur mesuré du plan (ex: 3,50 m) pour étalonner avec précision.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Réglage d'opacité du calque -->
          <div class="slider-row">
            <span class="slider-label">Opacité en filigrane :</span>
            <input 
              type="range" 
              class="slider-input" 
              min="0.10" 
              max="1.0" 
              step="0.05"
              .value=${this.opacity}
              @input=${(t) => this.opacity = parseFloat(t.target.value)}
            />
            <span class="slider-val">${Math.round(this.opacity * 100)}%</span>
          </div>
        </div>

        <div class="modal-footer">
          <button class="btn-cancel" @click=${this.close}>Annuler</button>
          <button 
            class="btn-confirm" 
            ?disabled=${!this.imageDataUrl} 
            @click=${this.confirmImport}
          >
            <span>🚀</span>
            <span>Charger le plan</span>
          </button>
        </div>
      </div>
    `;
  }
};
S.styles = P`
    :host {
      position: fixed;
      inset: 0;
      background: rgba(15, 23, 42, 0.85);
      backdrop-filter: blur(12px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 100;
      font-family: var(--ha-font-family, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif);
      color: #f8fafc;
      animation: fadeIn 0.2s ease-out;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: scale(0.98); }
      to { opacity: 1; transform: scale(1); }
    }

    .modal-card {
      background: #1e293b;
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 16px;
      width: 580px;
      max-width: 92vw;
      max-height: 90vh;
      display: flex;
      flex-direction: column;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.6), 0 0 20px rgba(56, 189, 248, 0.2);
      overflow: hidden;
    }

    .modal-header {
      padding: 18px 24px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: rgba(15, 23, 42, 0.5);
    }

    .modal-title-group {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .modal-icon {
      font-size: 1.6rem;
    }

    .modal-title {
      font-size: 1.15rem;
      font-weight: 700;
      color: #f1f5f9;
      margin: 0;
    }

    .modal-subtitle {
      font-size: 0.8rem;
      color: #94a3b8;
      margin: 2px 0 0 0;
    }

    .btn-close {
      background: transparent;
      border: none;
      color: #94a3b8;
      font-size: 20px;
      cursor: pointer;
      padding: 4px;
      border-radius: 6px;
      transition: all 0.15s ease;
    }

    .btn-close:hover {
      color: #ffffff;
      background: rgba(255, 255, 255, 0.1);
    }

    .modal-body {
      padding: 22px 24px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 18px;
    }

    /* Zone de Dépôt / Drag & Drop */
    .drop-zone {
      border: 2px dashed rgba(56, 189, 248, 0.4);
      background: rgba(15, 23, 42, 0.6);
      border-radius: 14px;
      padding: 24px 20px;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 12px;
      cursor: pointer;
      transition: all 0.2s ease;
      position: relative;
    }

    .drop-zone:hover, .drop-zone.dragover {
      border-color: #38bdf8;
      background: rgba(56, 189, 248, 0.08);
      box-shadow: 0 0 20px rgba(56, 189, 248, 0.15);
    }

    .drop-icon {
      font-size: 2.4rem;
    }

    .drop-text {
      font-size: 0.95rem;
      font-weight: 600;
      color: #e2e8f0;
    }

    .drop-subtext {
      font-size: 0.8rem;
      color: #64748b;
    }

    .drop-actions {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-top: 4px;
      flex-wrap: wrap;
      justify-content: center;
    }

    .btn-action-small {
      background: rgba(51, 65, 85, 0.8);
      color: #f1f5f9;
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 8px;
      padding: 6px 12px;
      font-size: 0.82rem;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
      transition: all 0.2s ease;
    }

    .btn-action-small:hover {
      background: #0284c7;
      border-color: #38bdf8;
    }

    /* Aperçu de l'image chargée */
    .preview-card {
      background: rgba(15, 23, 42, 0.7);
      border: 1px solid rgba(56, 189, 248, 0.3);
      border-radius: 12px;
      padding: 12px;
      display: flex;
      gap: 16px;
      align-items: center;
    }

    .preview-thumb {
      width: 100px;
      height: 75px;
      border-radius: 8px;
      object-fit: cover;
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: #090d16;
    }

    .preview-meta {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .preview-title {
      font-size: 0.92rem;
      font-weight: 700;
      color: #38bdf8;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .preview-dimensions {
      font-size: 0.8rem;
      color: #94a3b8;
      font-family: ui-monospace, SFMono-Regular, monospace;
    }

    .btn-change-image {
      background: transparent;
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: #94a3b8;
      border-radius: 6px;
      padding: 4px 8px;
      font-size: 0.75rem;
      cursor: pointer;
      width: fit-content;
      margin-top: 4px;
    }

    .btn-change-image:hover {
      color: #ffffff;
      border-color: #ffffff;
    }

    /* Section Méthode d'Étalonnage */
    .section-title {
      font-size: 0.88rem;
      font-weight: 700;
      color: #cbd5e1;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 8px;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .calibrate-options {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .option-card {
      background: rgba(15, 23, 42, 0.5);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 10px;
      padding: 12px 14px;
      cursor: pointer;
      display: flex;
      gap: 12px;
      align-items: flex-start;
      transition: all 0.2s ease;
    }

    .option-card:hover {
      border-color: rgba(56, 189, 248, 0.4);
      background: rgba(15, 23, 42, 0.8);
    }

    .option-card.selected {
      border-color: #38bdf8;
      background: rgba(2, 132, 199, 0.15);
      box-shadow: 0 0 15px rgba(56, 189, 248, 0.15);
    }

    .option-radio {
      margin-top: 3px;
      cursor: pointer;
      accent-color: #38bdf8;
    }

    .option-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .option-title {
      font-size: 0.9rem;
      font-weight: 700;
      color: #f1f5f9;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .option-badge {
      font-size: 0.7rem;
      padding: 2px 6px;
      background: rgba(16, 185, 129, 0.2);
      color: #34d399;
      border-radius: 9999px;
      border: 1px solid rgba(16, 185, 129, 0.4);
      font-weight: 600;
    }

    .option-desc {
      font-size: 0.78rem;
      color: #94a3b8;
      line-height: 1.35;
    }

    .input-row {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-top: 8px;
    }

    .dimension-input {
      background: #0f172a;
      border: 1px solid rgba(56, 189, 248, 0.4);
      border-radius: 6px;
      color: #f8fafc;
      padding: 6px 10px;
      font-size: 0.95rem;
      font-weight: 700;
      width: 100px;
      text-align: center;
      outline: none;
    }

    .dimension-input:focus {
      border-color: #38bdf8;
      box-shadow: 0 0 0 2px rgba(56, 189, 248, 0.25);
    }

    .unit-tag {
      font-size: 0.85rem;
      color: #94a3b8;
      font-weight: 600;
    }

    /* Calque & Opacité */
    .slider-row {
      display: flex;
      align-items: center;
      gap: 14px;
      background: rgba(15, 23, 42, 0.5);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 10px;
      padding: 10px 14px;
    }

    .slider-label {
      font-size: 0.82rem;
      color: #cbd5e1;
      min-width: 130px;
    }

    .slider-input {
      flex: 1;
      cursor: pointer;
      accent-color: #38bdf8;
    }

    .slider-val {
      font-size: 0.82rem;
      color: #38bdf8;
      font-weight: 700;
      min-width: 40px;
      text-align: right;
    }

    .modal-footer {
      padding: 16px 24px;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(15, 23, 42, 0.5);
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 12px;
    }

    .btn-cancel {
      background: transparent;
      color: #94a3b8;
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 8px;
      padding: 8px 16px;
      font-size: 0.88rem;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .btn-cancel:hover {
      background: rgba(255, 255, 255, 0.08);
      color: #ffffff;
    }

    .btn-confirm {
      background: #0284c7;
      color: #ffffff;
      border: 1px solid #38bdf8;
      border-radius: 8px;
      padding: 8px 20px;
      font-size: 0.88rem;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: all 0.2s ease;
      box-shadow: 0 0 15px rgba(56, 189, 248, 0.3);
    }

    .btn-confirm:hover:not(:disabled) {
      background: #0369a1;
      box-shadow: 0 0 20px rgba(56, 189, 248, 0.5);
    }

    .btn-confirm:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      box-shadow: none;
    }
  `;
T([
  v({ type: String })
], S.prototype, "currentLevel", 2);
T([
  h()
], S.prototype, "imageDataUrl", 2);
T([
  h()
], S.prototype, "imageWidth", 2);
T([
  h()
], S.prototype, "imageHeight", 2);
T([
  h()
], S.prototype, "imageName", 2);
T([
  h()
], S.prototype, "calibrateMode", 2);
T([
  h()
], S.prototype, "totalWidthMeters", 2);
T([
  h()
], S.prototype, "opacity", 2);
T([
  h()
], S.prototype, "isDragOver", 2);
S = T([
  D("home-architect-import-modal")
], S);
var Tt = Object.defineProperty, jt = Object.getOwnPropertyDescriptor, B = (t, e, i, o) => {
  for (var s = o > 1 ? void 0 : o ? jt(e, i) : e, r = t.length - 1, a; r >= 0; r--)
    (a = t[r]) && (s = (o ? a(e, i, s) : a(s)) || s);
  return o && s && Tt(e, i, s), s;
};
let j = class extends _ {
  constructor() {
    super(...arguments), this.measuredMeters = 0, this.wallCount = 0, this.roomCount = 0, this.openingCount = 0, this.targetMeters = 0, this.adjustBackground = !0;
  }
  connectedCallback() {
    super.connectedCallback(), this.targetMeters = this.measuredMeters;
  }
  handleInputChange(t) {
    const e = parseFloat(t.target.value);
    this.targetMeters = isNaN(e) ? 0 : e;
  }
  close() {
    this.dispatchEvent(new CustomEvent("close", { bubbles: !0, composed: !0 }));
  }
  confirm() {
    if (this.targetMeters <= 0 || this.measuredMeters <= 0) return;
    const t = this.targetMeters / this.measuredMeters;
    this.dispatchEvent(new CustomEvent("rescale-confirmed", {
      detail: {
        currentMeters: this.measuredMeters,
        targetMeters: this.targetMeters,
        scaleFactor: t,
        adjustBackground: this.adjustBackground
      },
      bubbles: !0,
      composed: !0
    }));
  }
  render() {
    const t = this.measuredMeters > 0 && this.targetMeters > 0 ? this.targetMeters / this.measuredMeters : 1, e = (t - 1) * 100, i = this.targetMeters > 0 && Math.abs(t - 1) > 1e-4;
    return b`
      <div class="modal-card">
        <div class="modal-header">
          <div class="modal-title-group">
            <span class="modal-icon">📐</span>
            <div>
              <h3 class="modal-title">Mettre à l'échelle le plan</h3>
              <p class="modal-subtitle">Recalcule automatiquement toutes les dimensions et cotes</p>
            </div>
          </div>
          <button class="btn-close" @click=${this.close}>✕</button>
        </div>

        <div class="modal-body">
          <div class="metric-compare">
            <div class="metric-box">
              <span class="metric-label">Cote mesurée actuelle</span>
              <span class="metric-val">${this.measuredMeters.toFixed(2)} m</span>
            </div>
            <div class="metric-box active">
              <span class="metric-label">Nouvelle cote cible</span>
              <span class="metric-val" style="color: #38bdf8;">${this.targetMeters > 0 ? this.targetMeters.toFixed(2) : "--"} m</span>
            </div>
          </div>

          <div class="input-group">
            <label class="input-label">Quelle est la taille réelle de ce segment en mètres ?</label>
            <div class="input-row">
              <input 
                type="number" 
                step="0.05" 
                min="0.10" 
                max="500" 
                class="target-input" 
                .value=${this.targetMeters}
                @input=${this.handleInputChange}
                autofocus
              />
              <span class="unit-badge">mètres</span>
            </div>
          </div>

          <div class="ratio-indicator">
            <span style="color: #94a3b8;">Facteur d'ajustement global :</span>
            <span class="ratio-pill ${t > 1.001 ? "ratio-expand" : t < 0.999 ? "ratio-shrink" : "ratio-neutral"}">
              × ${t.toFixed(3)} (${e >= 0 ? "+" : ""}${e.toFixed(1)}%)
            </span>
          </div>

          <div class="impact-list">
            <div class="impact-item">
              <span class="impact-icon">🧱</span>
              <span><strong>${this.wallCount} murs</strong> : toutes les longueurs et cotes seront recalculées</span>
            </div>
            ${this.openingCount > 0 ? b`
              <div class="impact-item">
                <span class="impact-icon">🚪</span>
                <span><strong>${this.openingCount} ouvertures</strong> : positions ajustées proportionnellement</span>
              </div>
            ` : null}
            ${this.roomCount > 0 ? b`
              <div class="impact-item">
                <span class="impact-icon">🏡</span>
                <span><strong>${this.roomCount} pièces</strong> : toutes les surfaces en m² seront actualisées</span>
              </div>
            ` : null}
            <div class="impact-item">
              <span class="impact-icon">🖼️</span>
              <span><strong>Calque de fond</strong> : échelle synchronisée pour conserver la superposition</span>
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button class="btn-cancel" @click=${this.close}>Annuler</button>
          <button 
            class="btn-confirm" 
            ?disabled=${!i} 
            @click=${this.confirm}
          >
            <span>📐</span>
            <span>Recalculer toutes les cotes</span>
          </button>
        </div>
      </div>
    `;
  }
};
j.styles = P`
    :host {
      position: fixed;
      inset: 0;
      background: rgba(15, 23, 42, 0.85);
      backdrop-filter: blur(12px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 100;
      font-family: var(--ha-font-family, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif);
      color: #f8fafc;
      animation: fadeIn 0.2s ease-out;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: scale(0.98); }
      to { opacity: 1; transform: scale(1); }
    }

    .modal-card {
      background: #1e293b;
      border: 1px solid rgba(56, 189, 248, 0.3);
      border-radius: 16px;
      width: 480px;
      max-width: 92vw;
      display: flex;
      flex-direction: column;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.6), 0 0 25px rgba(56, 189, 248, 0.25);
      overflow: hidden;
    }

    .modal-header {
      padding: 18px 24px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: rgba(15, 23, 42, 0.6);
    }

    .modal-title-group {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .modal-icon {
      font-size: 1.6rem;
    }

    .modal-title {
      font-size: 1.15rem;
      font-weight: 700;
      color: #f1f5f9;
      margin: 0;
    }

    .modal-subtitle {
      font-size: 0.8rem;
      color: #94a3b8;
      margin: 2px 0 0 0;
    }

    .btn-close {
      background: transparent;
      border: none;
      color: #94a3b8;
      font-size: 20px;
      cursor: pointer;
      padding: 4px;
      border-radius: 6px;
      transition: all 0.15s ease;
    }

    .btn-close:hover {
      color: #ffffff;
      background: rgba(255, 255, 255, 0.1);
    }

    .modal-body {
      padding: 22px 24px;
      display: flex;
      flex-direction: column;
      gap: 18px;
    }

    .metric-compare {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }

    .metric-box {
      background: rgba(15, 23, 42, 0.6);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 12px;
      padding: 12px 14px;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .metric-box.active {
      border-color: #38bdf8;
      background: rgba(2, 132, 199, 0.15);
      box-shadow: 0 0 15px rgba(56, 189, 248, 0.15);
    }

    .metric-label {
      font-size: 0.78rem;
      color: #94a3b8;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .metric-val {
      font-size: 1.3rem;
      font-weight: 800;
      color: #cbd5e1;
      font-family: ui-monospace, SFMono-Regular, monospace;
    }

    .input-group {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .input-label {
      font-size: 0.88rem;
      font-weight: 600;
      color: #f1f5f9;
    }

    .input-row {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .target-input {
      flex: 1;
      background: #0f172a;
      border: 2px solid #0284c7;
      border-radius: 10px;
      color: #ffffff;
      padding: 10px 14px;
      font-size: 1.25rem;
      font-weight: 800;
      font-family: ui-monospace, SFMono-Regular, monospace;
      outline: none;
      transition: all 0.2s ease;
    }

    .target-input:focus {
      border-color: #38bdf8;
      box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.3);
    }

    .unit-badge {
      font-size: 1rem;
      font-weight: 700;
      color: #38bdf8;
      padding: 0 4px;
    }

    .ratio-indicator {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: rgba(15, 23, 42, 0.5);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 10px;
      padding: 10px 14px;
      font-size: 0.85rem;
    }

    .ratio-pill {
      font-size: 0.82rem;
      font-weight: 700;
      padding: 3px 8px;
      border-radius: 9999px;
      font-family: ui-monospace, SFMono-Regular, monospace;
    }

    .ratio-expand {
      background: rgba(16, 185, 129, 0.2);
      color: #34d399;
      border: 1px solid rgba(16, 185, 129, 0.4);
    }

    .ratio-shrink {
      background: rgba(245, 158, 11, 0.2);
      color: #f59e0b;
      border: 1px solid rgba(245, 158, 11, 0.4);
    }

    .ratio-neutral {
      background: rgba(100, 116, 139, 0.2);
      color: #94a3b8;
    }

    .impact-list {
      display: flex;
      flex-direction: column;
      gap: 6px;
      background: rgba(15, 23, 42, 0.4);
      border-radius: 10px;
      padding: 12px 14px;
      font-size: 0.8rem;
      color: #94a3b8;
    }

    .impact-item {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .impact-icon {
      font-size: 1rem;
    }

    .modal-footer {
      padding: 16px 24px;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(15, 23, 42, 0.6);
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 12px;
    }

    .btn-cancel {
      background: transparent;
      color: #94a3b8;
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 8px;
      padding: 8px 16px;
      font-size: 0.88rem;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .btn-cancel:hover {
      background: rgba(255, 255, 255, 0.08);
      color: #ffffff;
    }

    .btn-confirm {
      background: #0284c7;
      color: #ffffff;
      border: 1px solid #38bdf8;
      border-radius: 8px;
      padding: 8px 20px;
      font-size: 0.88rem;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: all 0.2s ease;
      box-shadow: 0 0 15px rgba(56, 189, 248, 0.35);
    }

    .btn-confirm:hover:not(:disabled) {
      background: #0369a1;
      box-shadow: 0 0 20px rgba(56, 189, 248, 0.55);
    }

    .btn-confirm:disabled {
      opacity: 0.4;
      cursor: not-allowed;
      box-shadow: none;
    }
  `;
B([
  v({ type: Number })
], j.prototype, "measuredMeters", 2);
B([
  v({ type: Number })
], j.prototype, "wallCount", 2);
B([
  v({ type: Number })
], j.prototype, "roomCount", 2);
B([
  v({ type: Number })
], j.prototype, "openingCount", 2);
B([
  h()
], j.prototype, "targetMeters", 2);
B([
  h()
], j.prototype, "adjustBackground", 2);
j = B([
  D("home-architect-rescale-modal")
], j);
var zt = Object.defineProperty, At = Object.getOwnPropertyDescriptor, k = (t, e, i, o) => {
  for (var s = o > 1 ? void 0 : o ? At(e, i) : e, r = t.length - 1, a; r >= 0; r--)
    (a = t[r]) && (s = (o ? a(e, i, s) : a(s)) || s);
  return o && s && zt(e, i, s), s;
};
let y = class extends _ {
  constructor() {
    super(...arguments), this.narrow = !1, this.activeTool = "wall", this.currentThickness = 0.2, this.currentOpeningWidth = 0.9, this.activeLevel = "rdc", this.is3DMode = !1, this.isDrawerCollapsed = !1, this.isWizardOpen = !1, this.isImportModalOpen = !1, this.isCalibrateModalOpen = !1, this.calibrationData = null, this.isRescaleModalOpen = !1, this.rescaleMeasuredMeters = 0, this.selectedRoomForEdit = null, this.project = {
      id: "rdc",
      name: "Rez-de-Chaussée",
      created_at: (/* @__PURE__ */ new Date()).toISOString(),
      updated_at: (/* @__PURE__ */ new Date()).toISOString(),
      pixelsPerMeter: 50,
      grid: {
        size: 0.5,
        subdivisions: 2,
        snapToGrid: !0,
        snapToAngles: !0,
        snapToElements: !0
      },
      walls: [],
      openings: [],
      rooms: [],
      bindings: []
    }, this.fileInputRef = null, this.toastMessage = null, this.toastTimeout = null, this._boundPaste = null;
  }
  handleToolSelected(t) {
    this.activeTool = t.detail.tool, this.activeTool === "door" ? this.currentOpeningWidth = 0.9 : this.activeTool === "window" ? this.currentOpeningWidth = 1.2 : this.activeTool === "french_window" && (this.currentOpeningWidth = 2);
  }
  handleProjectChanged(t) {
    this.project = { ...t.detail.project };
  }
  handleThicknessChange(t) {
    this.currentThickness = parseFloat(t.target.value);
  }
  handleOpeningWidthChange(t) {
    this.currentOpeningWidth = parseFloat(t.target.value);
  }
  handleCreateRoomFromWizard(t) {
    const { name: e, width: i, length: o, thickness: s, height: r, color: a, icon: n, addDoor: l, addWindow: d } = t.detail, p = r || 2.5, c = 2, f = 2, g = { x: c, y: f }, M = { x: c + i, y: f }, I = { x: c + i, y: f + o }, ne = { x: c, y: f + o }, J = {
      id: `w_top_${Date.now()}`,
      start: g,
      end: M,
      thickness: s,
      height: p,
      type: "standard"
    }, Be = {
      id: `w_right_${Date.now()}`,
      start: M,
      end: I,
      thickness: s,
      height: p,
      type: "standard"
    }, Me = {
      id: `w_bottom_${Date.now()}`,
      start: I,
      end: ne,
      thickness: s,
      height: p,
      type: "standard"
    }, qe = {
      id: `w_left_${Date.now()}`,
      start: ne,
      end: g,
      thickness: s,
      height: p,
      type: "standard"
    }, fe = [];
    l && fe.push({
      id: `op_door_${Date.now()}`,
      wallId: Me.id,
      type: "door",
      offset: i / 2,
      width: 0.9,
      flipSide: !1,
      flipDirection: !1
    }), d && fe.push({
      id: `op_win_${Date.now()}`,
      wallId: J.id,
      type: "window",
      offset: i / 2,
      width: 1.2,
      flipSide: !1,
      flipDirection: !1
    });
    const Ve = {
      id: `room_${Date.now()}`,
      name: e,
      polygon: [g, M, I, ne],
      areaM2: i * o,
      color: a,
      icon: n,
      height: p
    };
    this.project = {
      ...this.project,
      walls: [...this.project.walls, J, Be, Me, qe],
      openings: [...this.project.openings, ...fe],
      rooms: [...this.project.rooms, Ve]
    }, this.isWizardOpen = !1, this.activeTool = "select";
  }
  connectedCallback() {
    super.connectedCallback(), this._boundPaste = this.handlePaste.bind(this), window.addEventListener("paste", this._boundPaste);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._boundPaste && window.removeEventListener("paste", this._boundPaste), this.toastTimeout && clearTimeout(this.toastTimeout);
  }
  showToast(t) {
    this.toastMessage = t, this.toastTimeout && clearTimeout(this.toastTimeout), this.toastTimeout = setTimeout(() => {
      this.toastMessage = null;
    }, 4500);
  }
  loadBackgroundImage(t, e = "Plan chargé !") {
    const i = new Image();
    i.onload = () => {
      this.project = {
        ...this.project,
        background: {
          imageUrl: t,
          opacity: 0.4,
          visible: !0,
          offset: { x: 0, y: 0 },
          scale: 1,
          rotation: 0,
          widthPx: i.naturalWidth,
          heightPx: i.naturalHeight
        }
      }, this.activeTool = "calibrate", this.showToast(`${e} Tracez un segment sur un mur mesuré pour étalonner l'échelle (📏).`);
    }, i.onerror = () => {
      this.showToast("❌ Erreur lors du chargement de l'image.");
    }, i.src = t;
  }
  handleImportConfirmed(t) {
    const { dataUrl: e, widthPx: i, heightPx: o, opacity: s, mode: r, totalWidthMeters: a } = t.detail;
    this.isImportModalOpen = !1;
    let n = this.project.pixelsPerMeter;
    r === "auto_dimension" && a && a > 0 && (n = Math.round(i / a * 10) / 10), this.project = {
      ...this.project,
      pixelsPerMeter: n,
      background: {
        imageUrl: e,
        opacity: s !== void 0 ? s : 0.4,
        visible: !0,
        offset: { x: 0, y: 0 },
        scale: 1,
        rotation: 0,
        widthPx: i,
        heightPx: o
      }
    }, r === "auto_dimension" ? (this.activeTool = "wall", this.showToast(`✅ Plan importé et étalonné automatiquement (1 m = ${n} px) ! Vous pouvez tracer vos murs (🧱).`)) : (this.activeTool = "calibrate", this.showToast("📏 Plan importé ! Tracez un segment sur un mur mesuré pour étalonner l'échelle."));
  }
  handlePaste(t) {
    var o;
    if (this.isImportModalOpen || !t.clipboardData) return;
    const e = t.clipboardData.items;
    for (let s = 0; s < e.length; s++)
      if (e[s].type.indexOf("image") !== -1) {
        const r = e[s].getAsFile();
        if (r) {
          t.preventDefault();
          const a = new FileReader();
          a.onload = (n) => {
            var d;
            const l = (d = n.target) == null ? void 0 : d.result;
            this.loadBackgroundImage(l, "📋 Image collée depuis le presse-papier !");
          }, a.readAsDataURL(r);
          return;
        }
      }
    const i = (o = t.clipboardData.getData("text/plain")) == null ? void 0 : o.trim();
    i && (i.startsWith("data:image/") || i.match(/\.(png|jpe?g|svg|webp)(\?.*)?$/i)) && (t.preventDefault(), this.loadBackgroundImage(i, "📋 Image chargée depuis l'URL collée !"));
  }
  triggerFileInput() {
    if (!this.fileInputRef) {
      const t = document.createElement("input");
      t.type = "file", t.accept = "image/*", t.style.display = "none", t.addEventListener("change", (e) => this.handleFileSelected(e)), document.body.appendChild(t), this.fileInputRef = t;
    }
    this.fileInputRef.click();
  }
  handleFileSelected(t) {
    var o;
    const e = (o = t.target.files) == null ? void 0 : o[0];
    if (!e) return;
    const i = new FileReader();
    i.onload = (s) => {
      var a;
      const r = (a = s.target) == null ? void 0 : a.result;
      this.loadBackgroundImage(r, "🖼️ Image importée depuis votre ordinateur !");
    }, i.readAsDataURL(e);
  }
  handleRequestCalibration(t) {
    this.calibrationData = t.detail, this.isCalibrateModalOpen = !0;
  }
  handleCalibrateConfirmed(t) {
    const { pixelsPerMeter: e } = t.detail;
    this.project = {
      ...this.project,
      pixelsPerMeter: Math.round(e * 10) / 10
    }, this.isCalibrateModalOpen = !1, this.calibrationData = null, this.activeTool = "wall";
  }
  handleRequestRescale(t) {
    this.rescaleMeasuredMeters = t.detail.measuredMeters, this.isRescaleModalOpen = !0;
  }
  handleRescaleConfirmed(t) {
    const { currentMeters: e, targetMeters: i, scaleFactor: o, adjustBackground: s } = t.detail;
    if (this.isRescaleModalOpen = !1, o <= 0 || isNaN(o)) return;
    const r = this.project.walls.map((c) => ({
      ...c,
      start: {
        x: u.roundMeters(c.start.x * o),
        y: u.roundMeters(c.start.y * o)
      },
      end: {
        x: u.roundMeters(c.end.x * o),
        y: u.roundMeters(c.end.y * o)
      }
    })), a = this.project.openings.map((c) => ({
      ...c,
      offset: u.roundMeters(c.offset * o),
      width: u.roundMeters(c.width * o)
    })), n = this.project.rooms.map((c) => {
      const f = c.polygon.map((M) => ({
        x: u.roundMeters(M.x * o),
        y: u.roundMeters(M.y * o)
      })), g = ce.computeArea(f);
      return {
        ...c,
        polygon: f,
        areaM2: g || u.roundMeters(c.areaM2 * o * o)
      };
    }), l = this.project.bindings.map((c) => ({
      ...c,
      position: {
        x: u.roundMeters(c.position.x * o),
        y: u.roundMeters(c.position.y * o)
      }
    }));
    let d = this.project.pixelsPerMeter, p = this.project.background ? { ...this.project.background } : void 0;
    s && p && (d = Math.round(this.project.pixelsPerMeter / o * 10) / 10, p.offset && (p = {
      ...p,
      offset: {
        x: u.roundMeters(p.offset.x * o),
        y: u.roundMeters(p.offset.y * o)
      }
    })), this.project = {
      ...this.project,
      pixelsPerMeter: d,
      walls: r,
      openings: a,
      rooms: n,
      bindings: l,
      background: p
    }, this.activeTool = "select", this.showToast(
      `✅ Plan mis à l'échelle (×${o.toFixed(3)}) : ${r.length} murs et ${n.length} pièces recalculés !`
    );
  }
  handleOpacityChange(t) {
    const e = parseFloat(t.target.value);
    this.project.background && (this.project = {
      ...this.project,
      background: { ...this.project.background, opacity: e }
    });
  }
  handleDefaultCeilingChange(t) {
    this.project = {
      ...this.project,
      defaultCeilingHeight: t
    }, this.showToast(`📐 Hauteur plafond 3D par défaut : ${t.toFixed(2)} m`);
  }
  handleSaveRoom(t) {
    const { roomId: e, name: i, height: o, color: s } = t.detail, r = this.project.rooms.map((a) => a.id === e ? { ...a, name: i, height: o, color: s } : a);
    this.project = {
      ...this.project,
      rooms: r
    }, this.selectedRoomForEdit = null, this.showToast(`✨ Pièce "${i}" mise à jour (H: ${o.toFixed(2)} m) !`);
  }
  handleDeleteRoom(t) {
    const { roomId: e } = t.detail;
    this.project = {
      ...this.project,
      rooms: this.project.rooms.filter((i) => i.id !== e)
    }, this.selectedRoomForEdit = null, this.showToast("🗑️ Pièce supprimée");
  }
  saveProject() {
    this.hass && this.hass.callWS ? this.hass.callWS({
      type: "home_architect/save_project",
      project: this.project
    }).then(() => {
      alert("Plan sauvegardé avec succès dans Home Assistant !");
    }).catch((t) => {
      console.error("Erreur sauvegarde HA:", t), localStorage.setItem(`home_architect_${this.project.id}`, JSON.stringify(this.project)), alert("Sauvegardé localement dans le navigateur.");
    }) : (localStorage.setItem(`home_architect_${this.project.id}`, JSON.stringify(this.project)), alert("Plan sauvegardé localement !"));
  }
  render() {
    var e, i;
    const t = !!((e = this.project.background) != null && e.imageUrl);
    return b`
      <header class="top-bar">
        <div class="brand">
          <span class="brand-icon">📐</span>
          <span>Home Architect</span>
          <span class="brand-tag">Studio & Décalque</span>
        </div>

        <div class="level-selector">
          <button class="level-btn ${this.activeLevel === "sous-sol" ? "active" : ""}" @click=${() => this.activeLevel = "sous-sol"}>Sous-Sol</button>
          <button class="level-btn ${this.activeLevel === "rdc" ? "active" : ""}" @click=${() => this.activeLevel = "rdc"}>RDC</button>
          <button class="level-btn ${this.activeLevel === "etage1" ? "active" : ""}" @click=${() => this.activeLevel = "etage1"}>1er Étage</button>
          <button class="level-btn ${this.activeLevel === "jardin" ? "active" : ""}" @click=${() => this.activeLevel = "jardin"}>Jardin</button>
        </div>

        <div class="top-controls">
          <!-- Bouton Importer un plan (Automatisé) -->
          <button class="btn-import" @click=${() => this.isImportModalOpen = !0} title="Importer et calibrer un plan image (PNG, JPG, SVG)">
            <span>📥</span>
            <span>Importer un plan</span>
          </button>

          <!-- Bouton Mettre à l'échelle (Recalculer toutes les cotes) -->
          <button 
            class="btn-rescale ${this.activeTool === "rescale" ? "active" : ""}" 
            @click=${() => this.activeTool = "rescale"} 
            title="Mettre à l'échelle : mesurer un mur ou deux points pour recalculer toutes les cotes (S)"
          >
            <span>📐</span>
            <span>Mettre à l'échelle</span>
          </button>

          <!-- Bascule 2D / 3D -->
          <button 
            class="btn-3d ${this.is3DMode ? "active" : ""}" 
            @click=${() => this.is3DMode = !this.is3DMode}
          >
            ${this.is3DMode ? "🧊 Vue 3D" : "📐 Vue 2D"}
          </button>

          <!-- Assistant Débutant -->
          <button class="btn-wizard" @click=${() => this.isWizardOpen = !0}>
            🪄 Assistant Pièce
          </button>

          <!-- Volet Entités HA -->
          <button 
            class="btn-drawer ${this.isDrawerCollapsed ? "" : "active"}" 
            @click=${() => this.isDrawerCollapsed = !this.isDrawerCollapsed}
            title="Afficher / Masquer le volet des entités"
          >
            ⚡ Entités HA (${this.project.bindings.length})
          </button>

          <!-- Épaisseur mur -->
          ${this.activeTool === "wall" ? b`
            <div class="control-group">
              <label>Épaisseur :</label>
              <select @change=${this.handleThicknessChange}>
                <option value="0.10">Cloison 10 cm</option>
                <option value="0.15">Mur 15 cm</option>
                <option value="0.20" selected>Porteur 20 cm</option>
                <option value="0.30">Extérieur 30 cm</option>
              </select>
            </div>
          ` : null}

          <!-- Largeur ouvrant -->
          ${this.activeTool === "door" || this.activeTool === "window" || this.activeTool === "french_window" ? b`
            <div class="control-group">
              <label>Largeur :</label>
              <select @change=${this.handleOpeningWidthChange}>
                <option value="0.73">73 cm (Étroite)</option>
                <option value="0.83">83 cm (Chambre)</option>
                <option value="0.90" selected>90 cm (Standard)</option>
                <option value="1.20">1.20 m (Fenêtre)</option>
                <option value="1.40">1.40 m (Double)</option>
                <option value="2.00">2.00 m (Baie)</option>
                <option value="2.40">2.40 m (Grande baie)</option>
              </select>
            </div>
          ` : null}

          <!-- Hauteur sous plafond globale en mode 3D -->
          ${this.is3DMode ? b`
            <div class="control-group" title="Hauteur sous plafond par défaut (3D)">
              <label>Plafond 3D :</label>
              <select @change=${(o) => this.handleDefaultCeilingChange(parseFloat(o.target.value))}>
                <option value="2.10" ?selected=${(this.project.defaultCeilingHeight || 2.5) === 2.1}>2.10 m (Sous-sol)</option>
                <option value="2.30" ?selected=${(this.project.defaultCeilingHeight || 2.5) === 2.3}>2.30 m (Combles)</option>
                <option value="2.50" ?selected=${!this.project.defaultCeilingHeight || this.project.defaultCeilingHeight === 2.5}>2.50 m (Standard)</option>
                <option value="2.70" ?selected=${(this.project.defaultCeilingHeight || 2.5) === 2.7}>2.70 m (Élevé)</option>
                <option value="3.00" ?selected=${(this.project.defaultCeilingHeight || 2.5) === 3}>3.00 m (Haussmann)</option>
                <option value="3.50" ?selected=${(this.project.defaultCeilingHeight || 2.5) === 3.5}>3.50 m (Cathédrale)</option>
              </select>
            </div>
          ` : null}

          <!-- Opacité du fond -->
          ${t ? b`
            <div class="control-group">
              <label>Fond :</label>
              <input 
                type="range" 
                min="0.05" 
                max="1.0" 
                step="0.05" 
                .value=${((i = this.project.background) == null ? void 0 : i.opacity) || 0.4}
                @input=${this.handleOpacityChange}
                style="width: 70px;"
                title="Opacité du plan de fond"
              />
            </div>
          ` : null}

          <div class="scale-indicator" title="Échelle : pixels par mètre">
            1 m = ${this.project.pixelsPerMeter} px
          </div>

          <!-- Sauvegarde -->
          <button class="btn-primary" @click=${this.saveProject}>
            💾 Sauvegarder
          </button>
        </div>
      </header>

      <div class="workspace">
        <div class="canvas-area">
          <home-architect-toolbar 
            .activeTool=${this.activeTool}
            @tool-selected=${this.handleToolSelected}
            @open-wizard=${() => this.isWizardOpen = !0}
            @open-import-modal=${() => this.isImportModalOpen = !0}
            @trigger-upload-background=${() => this.isImportModalOpen = !0}
          ></home-architect-toolbar>

          <home-architect-canvas
            .hass=${this.hass}
            .project=${this.project}
            .activeTool=${this.activeTool}
            .currentWallThickness=${this.currentThickness}
            .currentOpeningWidth=${this.currentOpeningWidth}
            .is3DMode=${this.is3DMode}
            @toggle-3d=${(o) => this.is3DMode = o.detail.is3DMode}
            @room-selected=${(o) => this.selectedRoomForEdit = o.detail.room}
            @project-changed=${this.handleProjectChanged}
            @request-calibration=${this.handleRequestCalibration}
            @request-rescale=${this.handleRequestRescale}
            @background-image-loaded=${(o) => this.loadBackgroundImage(o.detail.dataUrl, "🖼️ Image de plan glissée-déposée !")}
          ></home-architect-canvas>

          <!-- Notification Toast -->
          ${this.toastMessage ? b`
            <div class="toast-notification">
              ${this.toastMessage}
            </div>
          ` : null}
        </div>

        <!-- Volet latéral des entités HA : Toujours visible et docké -->
        <home-architect-entity-drawer
          .hass=${this.hass}
          ?collapsed=${this.isDrawerCollapsed}
          @toggle-collapse=${() => this.isDrawerCollapsed = !this.isDrawerCollapsed}
        ></home-architect-entity-drawer>
      </div>

      <!-- Modal d'Import Automatisé -->
      ${this.isImportModalOpen ? b`
        <home-architect-import-modal
          .currentLevel=${this.activeLevel}
          @import-confirmed=${this.handleImportConfirmed}
          @close=${() => this.isImportModalOpen = !1}
        ></home-architect-import-modal>
      ` : null}

      <!-- Modal Assistant Pièce Débutant -->
      ${this.isWizardOpen ? b`
        <home-architect-wizard-modal
          @create-room=${this.handleCreateRoomFromWizard}
          @close=${() => this.isWizardOpen = !1}
        ></home-architect-wizard-modal>
      ` : null}

      <!-- Modal Propriétés de la Pièce (Hauteur sous plafond 3D, etc.) -->
      ${this.selectedRoomForEdit ? b`
        <home-architect-room-modal
          .room=${this.selectedRoomForEdit}
          @save-room=${this.handleSaveRoom}
          @delete-room=${this.handleDeleteRoom}
          @close=${() => this.selectedRoomForEdit = null}
        ></home-architect-room-modal>
      ` : null}

      <!-- Modal Étalonnage Mesure de Mur -->
      ${this.isCalibrateModalOpen && this.calibrationData ? b`
        <home-architect-calibrate-modal
          .pixelDistance=${this.calibrationData.pixelDistance}
          .defaultMeters=${this.calibrationData.defaultMeters}
          @calibrate-confirmed=${this.handleCalibrateConfirmed}
          @close=${() => this.isCalibrateModalOpen = !1}
        ></home-architect-calibrate-modal>
      ` : null}

      <!-- Modal Mettre à l'échelle (Recalcul de toutes les cotes) -->
      ${this.isRescaleModalOpen ? b`
        <home-architect-rescale-modal
          .measuredMeters=${this.rescaleMeasuredMeters}
          .wallCount=${this.project.walls.length}
          .roomCount=${this.project.rooms.length}
          .openingCount=${this.project.openings.length}
          @rescale-confirmed=${this.handleRescaleConfirmed}
          @close=${() => this.isRescaleModalOpen = !1}
        ></home-architect-rescale-modal>
      ` : null}
    `;
  }
};
y.styles = P`
    :host {
      display: flex;
      flex-direction: column;
      width: 100vw;
      height: 100vh;
      overflow: hidden;
      background: #0f172a;
      color: #f8fafc;
      font-family: var(--ha-font-family, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif);
      position: relative;
    }

    header.top-bar {
      height: 56px;
      background: rgba(30, 41, 59, 0.9);
      backdrop-filter: blur(12px);
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 18px;
      z-index: 30;
      flex-shrink: 0;
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 1.15rem;
      font-weight: 700;
      color: #f1f5f9;
    }

    .brand-icon {
      font-size: 1.4rem;
    }

    .brand-tag {
      font-size: 0.75rem;
      padding: 2px 8px;
      background: rgba(56, 189, 248, 0.15);
      color: #38bdf8;
      border-radius: 9999px;
      border: 1px solid rgba(56, 189, 248, 0.3);
      font-weight: 600;
    }

    .top-controls {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .control-group {
      display: flex;
      align-items: center;
      background: rgba(15, 23, 42, 0.6);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 8px;
      padding: 2px 8px;
      gap: 6px;
      font-size: 0.85rem;
    }

    .control-group label {
      color: #94a3b8;
      font-size: 0.8rem;
    }

    select, input[type="range"] {
      background: transparent;
      color: #f8fafc;
      border: none;
      outline: none;
      font-size: 0.85rem;
      cursor: pointer;
    }

    select option {
      background: #1e293b;
      color: #f8fafc;
    }

    button.btn-primary {
      background: #0284c7;
      color: #ffffff;
      border: 1px solid #38bdf8;
      border-radius: 8px;
      padding: 6px 14px;
      font-size: 0.85rem;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
      transition: all 0.2s ease;
    }

    button.btn-primary:hover {
      background: #0369a1;
      box-shadow: 0 0 12px rgba(56, 189, 248, 0.4);
    }

    button.btn-import {
      background: rgba(16, 185, 129, 0.2);
      color: #34d399;
      border: 1px solid rgba(16, 185, 129, 0.4);
      border-radius: 8px;
      padding: 6px 13px;
      font-size: 0.85rem;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
      transition: all 0.2s ease;
    }

    button.btn-import:hover {
      background: #10b981;
      color: #ffffff;
      box-shadow: 0 0 14px rgba(16, 185, 129, 0.45);
    }

    button.btn-rescale {
      background: rgba(56, 189, 248, 0.15);
      color: #38bdf8;
      border: 1px solid rgba(56, 189, 248, 0.35);
      border-radius: 8px;
      padding: 6px 13px;
      font-size: 0.85rem;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
      transition: all 0.2s ease;
    }

    button.btn-rescale:hover, button.btn-rescale.active {
      background: #0284c7;
      color: #ffffff;
      border-color: #38bdf8;
      box-shadow: 0 0 14px rgba(56, 189, 248, 0.45);
    }

    button.btn-drawer {
      background: rgba(56, 189, 248, 0.15);
      color: #38bdf8;
      border: 1px solid rgba(56, 189, 248, 0.3);
      border-radius: 8px;
      padding: 6px 12px;
      font-size: 0.85rem;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
      transition: all 0.2s ease;
    }

    button.btn-drawer:hover, button.btn-drawer.active {
      background: #0284c7;
      color: #ffffff;
      box-shadow: 0 0 12px rgba(56, 189, 248, 0.4);
    }

    button.btn-3d {
      background: rgba(147, 51, 234, 0.15);
      color: #c084fc;
      border: 1px solid rgba(147, 51, 234, 0.3);
      border-radius: 8px;
      padding: 6px 12px;
      font-size: 0.85rem;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
      transition: all 0.2s ease;
    }

    button.btn-3d.active {
      background: #9333ea;
      color: #ffffff;
      box-shadow: 0 0 12px rgba(192, 132, 252, 0.5);
    }

    button.btn-wizard {
      background: rgba(245, 158, 11, 0.2);
      color: #f59e0b;
      border: 1px solid rgba(245, 158, 11, 0.4);
      border-radius: 8px;
      padding: 6px 12px;
      font-size: 0.85rem;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
      transition: all 0.2s ease;
    }

    button.btn-wizard:hover {
      background: #f59e0b;
      color: #ffffff;
    }

    .workspace {
      flex: 1;
      display: flex;
      flex-direction: row;
      width: 100%;
      height: calc(100vh - 56px);
      overflow: hidden;
      position: relative;
    }

    .canvas-area {
      flex: 1;
      min-width: 0;
      height: 100%;
      position: relative;
      overflow: hidden;
    }

    .level-selector {
      display: flex;
      background: rgba(15, 23, 42, 0.7);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 8px;
      overflow: hidden;
    }

    .level-btn {
      padding: 5px 12px;
      font-size: 0.8rem;
      background: transparent;
      color: #94a3b8;
      border: none;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .level-btn.active {
      background: rgba(56, 189, 248, 0.2);
      color: #38bdf8;
      font-weight: 600;
    }

    .scale-indicator {
      font-size: 0.8rem;
      color: #38bdf8;
      font-family: ui-monospace, SFMono-Regular, monospace;
      padding: 2px 6px;
    }

    .toast-notification {
      position: absolute;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(15, 23, 42, 0.95);
      backdrop-filter: blur(12px);
      border: 1px solid #38bdf8;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5), 0 0 15px rgba(56, 189, 248, 0.35);
      border-radius: 12px;
      padding: 10px 22px;
      font-size: 0.88rem;
      font-weight: 600;
      color: #f8fafc;
      z-index: 80;
      animation: popToast 0.25s ease-out;
      display: flex;
      align-items: center;
      gap: 10px;
      pointer-events: none;
    }

    @keyframes popToast {
      from { transform: translate(-50%, -12px); opacity: 0; }
      to { transform: translate(-50%, 0); opacity: 1; }
    }
  `;
k([
  v({ type: Object })
], y.prototype, "hass", 2);
k([
  v({ type: Boolean })
], y.prototype, "narrow", 2);
k([
  h()
], y.prototype, "activeTool", 2);
k([
  h()
], y.prototype, "currentThickness", 2);
k([
  h()
], y.prototype, "currentOpeningWidth", 2);
k([
  h()
], y.prototype, "activeLevel", 2);
k([
  h()
], y.prototype, "is3DMode", 2);
k([
  h()
], y.prototype, "isDrawerCollapsed", 2);
k([
  h()
], y.prototype, "isWizardOpen", 2);
k([
  h()
], y.prototype, "isImportModalOpen", 2);
k([
  h()
], y.prototype, "isCalibrateModalOpen", 2);
k([
  h()
], y.prototype, "calibrationData", 2);
k([
  h()
], y.prototype, "isRescaleModalOpen", 2);
k([
  h()
], y.prototype, "rescaleMeasuredMeters", 2);
k([
  h()
], y.prototype, "selectedRoomForEdit", 2);
k([
  h()
], y.prototype, "project", 2);
k([
  h()
], y.prototype, "toastMessage", 2);
y = k([
  D("home-architect-panel")
], y);
var Et = Object.defineProperty, Ot = Object.getOwnPropertyDescriptor, ae = (t, e, i, o) => {
  for (var s = o > 1 ? void 0 : o ? Ot(e, i) : e, r = t.length - 1, a; r >= 0; r--)
    (a = t[r]) && (s = (o ? a(e, i, s) : a(s)) || s);
  return o && s && Et(e, i, s), s;
};
let L = class extends _ {
  constructor() {
    super(...arguments), this.project = {
      id: "rdc",
      name: "Plan",
      created_at: (/* @__PURE__ */ new Date()).toISOString(),
      updated_at: (/* @__PURE__ */ new Date()).toISOString(),
      pixelsPerMeter: 50,
      grid: { size: 0.5, subdivisions: 2, snapToGrid: !1, snapToAngles: !1, snapToElements: !1 },
      walls: [],
      openings: [],
      rooms: [],
      bindings: []
    }, this.is3DMode = !1;
  }
  setConfig(t) {
    if (!t) throw new Error("Configuration invalide");
    this.config = t, this.is3DMode = t.view_mode === "3d";
  }
  getCardSize() {
    return 6;
  }
  firstUpdated() {
    this.loadProject();
  }
  async loadProject() {
    var i;
    const t = this.config.project_id || "rdc";
    if (this.hass && this.hass.callWS)
      try {
        const o = await this.hass.callWS({ type: "home_architect/get_projects" }), s = (i = o == null ? void 0 : o.projects) == null ? void 0 : i.find((r) => r.id === t);
        if (s) {
          this.project = s;
          return;
        }
      } catch (o) {
        console.warn("WebSocket get_projects échoué, essai localStorage:", o);
      }
    const e = localStorage.getItem(`home_architect_${t}`);
    if (e)
      try {
        this.project = JSON.parse(e);
      } catch {
      }
  }
  render() {
    var t;
    return b`
      <div class="card-header">
        <div class="card-title">${((t = this.config) == null ? void 0 : t.title) || this.project.name || "Home Architect"}</div>
        <button class="view-toggle" @click=${() => this.is3DMode = !this.is3DMode}>
          ${this.is3DMode ? "🧊 3D" : "📐 2D"}
        </button>
      </div>

      <div class="canvas-wrapper">
        <home-architect-canvas
          .hass=${this.hass}
          .project=${this.project}
          .activeTool=${"select"}
          .is3DMode=${this.is3DMode}
        ></home-architect-canvas>
      </div>
    `;
  }
};
L.styles = P`
    :host {
      display: block;
      height: 480px;
      position: relative;
      background: #0f172a;
      border-radius: 16px;
      overflow: hidden;
      border: 1px solid rgba(255, 255, 255, 0.1);
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.4);
      font-family: var(--ha-font-family, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif);
      color: #f8fafc;
    }

    .card-header {
      position: absolute;
      top: 12px;
      left: 16px;
      right: 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      z-index: 10;
      pointer-events: none;
    }

    .card-title {
      font-size: 1rem;
      font-weight: 700;
      color: #f8fafc;
      background: rgba(30, 41, 59, 0.85);
      backdrop-filter: blur(8px);
      padding: 6px 14px;
      border-radius: 8px;
      border: 1px solid rgba(255, 255, 255, 0.1);
      pointer-events: auto;
    }

    .view-toggle {
      background: rgba(30, 41, 59, 0.85);
      backdrop-filter: blur(8px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 8px;
      padding: 4px 10px;
      font-size: 0.8rem;
      font-weight: 600;
      color: #38bdf8;
      cursor: pointer;
      pointer-events: auto;
      transition: all 0.2s ease;
    }

    .view-toggle:hover {
      background: #0284c7;
      color: #ffffff;
    }

    .canvas-wrapper {
      width: 100%;
      height: 100%;
    }
  `;
ae([
  v({ type: Object })
], L.prototype, "hass", 2);
ae([
  h()
], L.prototype, "config", 2);
ae([
  h()
], L.prototype, "project", 2);
ae([
  h()
], L.prototype, "is3DMode", 2);
L = ae([
  D("home-architect-card")
], L);
window.customCards = window.customCards || [];
window.customCards.push({
  type: "home-architect-card",
  name: "Home Architect Card",
  description: "Affichez votre plan de maison interactif 2D/3D avec états des entités en temps réel.",
  preview: !0
});
console.info(
  "%c 📐 HOME ARCHITECT %c v1.0.0 Loaded (Studio & Card) ",
  "background: #0284c7; color: #fff; font-weight: bold; border-radius: 4px 0 0 4px; padding: 2px 6px;",
  "background: #1e293b; color: #38bdf8; font-weight: bold; border-radius: 0 4px 4px 0; padding: 2px 6px;"
);
