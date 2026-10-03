/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Z = globalThis, ae = Z.ShadowRoot && (Z.ShadyCSS === void 0 || Z.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, le = Symbol(), he = /* @__PURE__ */ new WeakMap();
let Se = class {
  constructor(e, t, o) {
    if (this._$cssResult$ = !0, o !== le) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (ae && e === void 0) {
      const o = t !== void 0 && t.length === 1;
      o && (e = he.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), o && he.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const je = (i) => new Se(typeof i == "string" ? i : i + "", void 0, le), X = (i, ...e) => {
  const t = i.length === 1 ? i[0] : e.reduce((o, s, r) => o + ((n) => {
    if (n._$cssResult$ === !0) return n.cssText;
    if (typeof n == "number") return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + i[r + 1], i[0]);
  return new Se(t, i, le);
}, Oe = (i, e) => {
  if (ae) i.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const o = document.createElement("style"), s = Z.litNonce;
    s !== void 0 && o.setAttribute("nonce", s), o.textContent = t.cssText, i.appendChild(o);
  }
}, ue = ae ? (i) => i : (i) => i instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const o of e.cssRules) t += o.cssText;
  return je(t);
})(i) : i;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: ze, defineProperty: We, getOwnPropertyDescriptor: Re, getOwnPropertyNames: Ue, getOwnPropertySymbols: Ie, getPrototypeOf: Fe } = Object, P = globalThis, fe = P.trustedTypes, He = fe ? fe.emptyScript : "", oe = P.reactiveElementPolyfillSupport, N = (i, e) => i, J = { toAttribute(i, e) {
  switch (e) {
    case Boolean:
      i = i ? He : null;
      break;
    case Object:
    case Array:
      i = i == null ? i : JSON.stringify(i);
  }
  return i;
}, fromAttribute(i, e) {
  let t = i;
  switch (e) {
    case Boolean:
      t = i !== null;
      break;
    case Number:
      t = i === null ? null : Number(i);
      break;
    case Object:
    case Array:
      try {
        t = JSON.parse(i);
      } catch {
        t = null;
      }
  }
  return t;
} }, ce = (i, e) => !ze(i, e), ge = { attribute: !0, type: String, converter: J, reflect: !1, useDefault: !1, hasChanged: ce };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), P.litPropertyMetadata ?? (P.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let W = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = ge) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const o = Symbol(), s = this.getPropertyDescriptor(e, o, t);
      s !== void 0 && We(this.prototype, e, s);
    }
  }
  static getPropertyDescriptor(e, t, o) {
    const { get: s, set: r } = Re(this.prototype, e) ?? { get() {
      return this[t];
    }, set(n) {
      this[t] = n;
    } };
    return { get: s, set(n) {
      const a = s == null ? void 0 : s.call(this);
      r == null || r.call(this, n), this.requestUpdate(e, a, o);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? ge;
  }
  static _$Ei() {
    if (this.hasOwnProperty(N("elementProperties"))) return;
    const e = Fe(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(N("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(N("properties"))) {
      const t = this.properties, o = [...Ue(t), ...Ie(t)];
      for (const s of o) this.createProperty(s, t[s]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const t = litPropertyMetadata.get(e);
      if (t !== void 0) for (const [o, s] of t) this.elementProperties.set(o, s);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t, o] of this.elementProperties) {
      const s = this._$Eu(t, o);
      s !== void 0 && this._$Eh.set(s, t);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const t = [];
    if (Array.isArray(e)) {
      const o = new Set(e.flat(1 / 0).reverse());
      for (const s of o) t.unshift(ue(s));
    } else e !== void 0 && t.push(ue(e));
    return t;
  }
  static _$Eu(e, t) {
    const o = t.attribute;
    return o === !1 ? void 0 : typeof o == "string" ? o : typeof e == "string" ? e.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var e;
    this._$ES = new Promise((t) => this.enableUpdating = t), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (e = this.constructor.l) == null || e.forEach((t) => t(this));
  }
  addController(e) {
    var t;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(e), this.renderRoot !== void 0 && this.isConnected && ((t = e.hostConnected) == null || t.call(e));
  }
  removeController(e) {
    var t;
    (t = this._$EO) == null || t.delete(e);
  }
  _$E_() {
    const e = /* @__PURE__ */ new Map(), t = this.constructor.elementProperties;
    for (const o of t.keys()) this.hasOwnProperty(o) && (e.set(o, this[o]), delete this[o]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Oe(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    var e;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (e = this._$EO) == null || e.forEach((t) => {
      var o;
      return (o = t.hostConnected) == null ? void 0 : o.call(t);
    });
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    var e;
    (e = this._$EO) == null || e.forEach((t) => {
      var o;
      return (o = t.hostDisconnected) == null ? void 0 : o.call(t);
    });
  }
  attributeChangedCallback(e, t, o) {
    this._$AK(e, o);
  }
  _$ET(e, t) {
    var r;
    const o = this.constructor.elementProperties.get(e), s = this.constructor._$Eu(e, o);
    if (s !== void 0 && o.reflect === !0) {
      const n = (((r = o.converter) == null ? void 0 : r.toAttribute) !== void 0 ? o.converter : J).toAttribute(t, o.type);
      this._$Em = e, n == null ? this.removeAttribute(s) : this.setAttribute(s, n), this._$Em = null;
    }
  }
  _$AK(e, t) {
    var r, n;
    const o = this.constructor, s = o._$Eh.get(e);
    if (s !== void 0 && this._$Em !== s) {
      const a = o.getPropertyOptions(s), l = typeof a.converter == "function" ? { fromAttribute: a.converter } : ((r = a.converter) == null ? void 0 : r.fromAttribute) !== void 0 ? a.converter : J;
      this._$Em = s;
      const c = l.fromAttribute(t, a.type);
      this[s] = c ?? ((n = this._$Ej) == null ? void 0 : n.get(s)) ?? c, this._$Em = null;
    }
  }
  requestUpdate(e, t, o, s = !1, r) {
    var n;
    if (e !== void 0) {
      const a = this.constructor;
      if (s === !1 && (r = this[e]), o ?? (o = a.getPropertyOptions(e)), !((o.hasChanged ?? ce)(r, t) || o.useDefault && o.reflect && r === ((n = this._$Ej) == null ? void 0 : n.get(e)) && !this.hasAttribute(a._$Eu(e, o)))) return;
      this.C(e, t, o);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, t, { useDefault: o, reflect: s, wrapped: r }, n) {
    o && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(e) && (this._$Ej.set(e, n ?? t ?? this[e]), r !== !0 || n !== void 0) || (this._$AL.has(e) || (this.hasUpdated || o || (t = void 0), this._$AL.set(e, t)), s === !0 && this._$Em !== e && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(e));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (t) {
      Promise.reject(t);
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
        for (const [r, n] of this._$Ep) this[r] = n;
        this._$Ep = void 0;
      }
      const s = this.constructor.elementProperties;
      if (s.size > 0) for (const [r, n] of s) {
        const { wrapped: a } = n, l = this[r];
        a !== !0 || this._$AL.has(r) || l === void 0 || this.C(r, void 0, n, l);
      }
    }
    let e = !1;
    const t = this._$AL;
    try {
      e = this.shouldUpdate(t), e ? (this.willUpdate(t), (o = this._$EO) == null || o.forEach((s) => {
        var r;
        return (r = s.hostUpdate) == null ? void 0 : r.call(s);
      }), this.update(t)) : this._$EM();
    } catch (s) {
      throw e = !1, this._$EM(), s;
    }
    e && this._$AE(t);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    var t;
    (t = this._$EO) == null || t.forEach((o) => {
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
    this._$Eq && (this._$Eq = this._$Eq.forEach((t) => this._$ET(t, this[t]))), this._$EM();
  }
  updated(e) {
  }
  firstUpdated(e) {
  }
};
W.elementStyles = [], W.shadowRootOptions = { mode: "open" }, W[N("elementProperties")] = /* @__PURE__ */ new Map(), W[N("finalized")] = /* @__PURE__ */ new Map(), oe == null || oe({ ReactiveElement: W }), (P.reactiveElementVersions ?? (P.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const L = globalThis, be = (i) => i, K = L.trustedTypes, me = K ? K.createPolicy("lit-html", { createHTML: (i) => i }) : void 0, ke = "$lit$", T = `lit$${Math.random().toFixed(9).slice(2)}$`, Ae = "?" + T, Ne = `<${Ae}>`, O = document, q = () => O.createComment(""), B = (i) => i === null || typeof i != "object" && typeof i != "function", de = Array.isArray, Le = (i) => de(i) || typeof (i == null ? void 0 : i[Symbol.iterator]) == "function", se = `[ 	
\f\r]`, H = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ve = /-->/g, xe = />/g, E = RegExp(`>|${se}(?:([^\\s"'>=/]+)(${se}*=${se}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), we = /'/g, ye = /"/g, Me = /^(?:script|style|textarea|title)$/i, Te = (i) => (e, ...t) => ({ _$litType$: i, strings: e, values: t }), y = Te(1), v = Te(2), R = Symbol.for("lit-noChange"), g = Symbol.for("lit-nothing"), $e = /* @__PURE__ */ new WeakMap(), D = O.createTreeWalker(O, 129);
function Pe(i, e) {
  if (!de(i) || !i.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return me !== void 0 ? me.createHTML(e) : e;
}
const qe = (i, e) => {
  const t = i.length - 1, o = [];
  let s, r = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", n = H;
  for (let a = 0; a < t; a++) {
    const l = i[a];
    let c, p, d = -1, u = 0;
    for (; u < l.length && (n.lastIndex = u, p = n.exec(l), p !== null); ) u = n.lastIndex, n === H ? p[1] === "!--" ? n = ve : p[1] !== void 0 ? n = xe : p[2] !== void 0 ? (Me.test(p[2]) && (s = RegExp("</" + p[2], "g")), n = E) : p[3] !== void 0 && (n = E) : n === E ? p[0] === ">" ? (n = s ?? H, d = -1) : p[1] === void 0 ? d = -2 : (d = n.lastIndex - p[2].length, c = p[1], n = p[3] === void 0 ? E : p[3] === '"' ? ye : we) : n === ye || n === we ? n = E : n === ve || n === xe ? n = H : (n = E, s = void 0);
    const f = n === E && i[a + 1].startsWith("/>") ? " " : "";
    r += n === H ? l + Ne : d >= 0 ? (o.push(c), l.slice(0, d) + ke + l.slice(d) + T + f) : l + T + (d === -2 ? a : f);
  }
  return [Pe(i, r + (i[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), o];
};
class Y {
  constructor({ strings: e, _$litType$: t }, o) {
    let s;
    this.parts = [];
    let r = 0, n = 0;
    const a = e.length - 1, l = this.parts, [c, p] = qe(e, t);
    if (this.el = Y.createElement(c, o), D.currentNode = this.el.content, t === 2 || t === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (s = D.nextNode()) !== null && l.length < a; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const d of s.getAttributeNames()) if (d.endsWith(ke)) {
          const u = p[n++], f = s.getAttribute(d).split(T), $ = /([.?@])?(.*)/.exec(u);
          l.push({ type: 1, index: r, name: $[2], strings: f, ctor: $[1] === "." ? Ye : $[1] === "?" ? Xe : $[1] === "@" ? Ve : ee }), s.removeAttribute(d);
        } else d.startsWith(T) && (l.push({ type: 6, index: r }), s.removeAttribute(d));
        if (Me.test(s.tagName)) {
          const d = s.textContent.split(T), u = d.length - 1;
          if (u > 0) {
            s.textContent = K ? K.emptyScript : "";
            for (let f = 0; f < u; f++) s.append(d[f], q()), D.nextNode(), l.push({ type: 2, index: ++r });
            s.append(d[u], q());
          }
        }
      } else if (s.nodeType === 8) if (s.data === Ae) l.push({ type: 2, index: r });
      else {
        let d = -1;
        for (; (d = s.data.indexOf(T, d + 1)) !== -1; ) l.push({ type: 7, index: r }), d += T.length - 1;
      }
      r++;
    }
  }
  static createElement(e, t) {
    const o = O.createElement("template");
    return o.innerHTML = e, o;
  }
}
function U(i, e, t = i, o) {
  var n, a;
  if (e === R) return e;
  let s = o !== void 0 ? (n = t._$Co) == null ? void 0 : n[o] : t._$Cl;
  const r = B(e) ? void 0 : e._$litDirective$;
  return (s == null ? void 0 : s.constructor) !== r && ((a = s == null ? void 0 : s._$AO) == null || a.call(s, !1), r === void 0 ? s = void 0 : (s = new r(i), s._$AT(i, t, o)), o !== void 0 ? (t._$Co ?? (t._$Co = []))[o] = s : t._$Cl = s), s !== void 0 && (e = U(i, s._$AS(i, e.values), s, o)), e;
}
class Be {
  constructor(e, t) {
    this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = t;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(e) {
    const { el: { content: t }, parts: o } = this._$AD, s = ((e == null ? void 0 : e.creationScope) ?? O).importNode(t, !0);
    D.currentNode = s;
    let r = D.nextNode(), n = 0, a = 0, l = o[0];
    for (; l !== void 0; ) {
      if (n === l.index) {
        let c;
        l.type === 2 ? c = new V(r, r.nextSibling, this, e) : l.type === 1 ? c = new l.ctor(r, l.name, l.strings, this, e) : l.type === 6 && (c = new Ge(r, this, e)), this._$AV.push(c), l = o[++a];
      }
      n !== (l == null ? void 0 : l.index) && (r = D.nextNode(), n++);
    }
    return D.currentNode = O, s;
  }
  p(e) {
    let t = 0;
    for (const o of this._$AV) o !== void 0 && (o.strings !== void 0 ? (o._$AI(e, o, t), t += o.strings.length - 2) : o._$AI(e[t])), t++;
  }
}
class V {
  get _$AU() {
    var e;
    return ((e = this._$AM) == null ? void 0 : e._$AU) ?? this._$Cv;
  }
  constructor(e, t, o, s) {
    this.type = 2, this._$AH = g, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = o, this.options = s, this._$Cv = (s == null ? void 0 : s.isConnected) ?? !0;
  }
  get parentNode() {
    let e = this._$AA.parentNode;
    const t = this._$AM;
    return t !== void 0 && (e == null ? void 0 : e.nodeType) === 11 && (e = t.parentNode), e;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(e, t = this) {
    e = U(this, e, t), B(e) ? e === g || e == null || e === "" ? (this._$AH !== g && this._$AR(), this._$AH = g) : e !== this._$AH && e !== R && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : Le(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== g && B(this._$AH) ? this._$AA.nextSibling.data = e : this.T(O.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var r;
    const { values: t, _$litType$: o } = e, s = typeof o == "number" ? this._$AC(e) : (o.el === void 0 && (o.el = Y.createElement(Pe(o.h, o.h[0]), this.options)), o);
    if (((r = this._$AH) == null ? void 0 : r._$AD) === s) this._$AH.p(t);
    else {
      const n = new Be(s, this), a = n.u(this.options);
      n.p(t), this.T(a), this._$AH = n;
    }
  }
  _$AC(e) {
    let t = $e.get(e.strings);
    return t === void 0 && $e.set(e.strings, t = new Y(e)), t;
  }
  k(e) {
    de(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let o, s = 0;
    for (const r of e) s === t.length ? t.push(o = new V(this.O(q()), this.O(q()), this, this.options)) : o = t[s], o._$AI(r), s++;
    s < t.length && (this._$AR(o && o._$AB.nextSibling, s), t.length = s);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    var o;
    for ((o = this._$AP) == null ? void 0 : o.call(this, !1, !0, t); e !== this._$AB; ) {
      const s = be(e).nextSibling;
      be(e).remove(), e = s;
    }
  }
  setConnected(e) {
    var t;
    this._$AM === void 0 && (this._$Cv = e, (t = this._$AP) == null || t.call(this, e));
  }
}
class ee {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, t, o, s, r) {
    this.type = 1, this._$AH = g, this._$AN = void 0, this.element = e, this.name = t, this._$AM = s, this.options = r, o.length > 2 || o[0] !== "" || o[1] !== "" ? (this._$AH = Array(o.length - 1).fill(new String()), this.strings = o) : this._$AH = g;
  }
  _$AI(e, t = this, o, s) {
    const r = this.strings;
    let n = !1;
    if (r === void 0) e = U(this, e, t, 0), n = !B(e) || e !== this._$AH && e !== R, n && (this._$AH = e);
    else {
      const a = e;
      let l, c;
      for (e = r[0], l = 0; l < r.length - 1; l++) c = U(this, a[o + l], t, l), c === R && (c = this._$AH[l]), n || (n = !B(c) || c !== this._$AH[l]), c === g ? e = g : e !== g && (e += (c ?? "") + r[l + 1]), this._$AH[l] = c;
    }
    n && !s && this.j(e);
  }
  j(e) {
    e === g ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class Ye extends ee {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === g ? void 0 : e;
  }
}
class Xe extends ee {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== g);
  }
}
class Ve extends ee {
  constructor(e, t, o, s, r) {
    super(e, t, o, s, r), this.type = 5;
  }
  _$AI(e, t = this) {
    if ((e = U(this, e, t, 0) ?? g) === R) return;
    const o = this._$AH, s = e === g && o !== g || e.capture !== o.capture || e.once !== o.once || e.passive !== o.passive, r = e !== g && (o === g || s);
    s && this.element.removeEventListener(this.name, this, o), r && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var t;
    typeof this._$AH == "function" ? this._$AH.call(((t = this.options) == null ? void 0 : t.host) ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class Ge {
  constructor(e, t, o) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = o;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    U(this, e);
  }
}
const re = L.litHtmlPolyfillSupport;
re == null || re(Y, V), (L.litHtmlVersions ?? (L.litHtmlVersions = [])).push("3.3.3");
const Ze = (i, e, t) => {
  const o = (t == null ? void 0 : t.renderBefore) ?? e;
  let s = o._$litPart$;
  if (s === void 0) {
    const r = (t == null ? void 0 : t.renderBefore) ?? null;
    o._$litPart$ = s = new V(e.insertBefore(q(), r), r, void 0, t ?? {});
  }
  return s._$AI(i), s;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const j = globalThis;
class A extends W {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var t;
    const e = super.createRenderRoot();
    return (t = this.renderOptions).renderBefore ?? (t.renderBefore = e.firstChild), e;
  }
  update(e) {
    const t = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Ze(t, this.renderRoot, this.renderOptions);
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
    return R;
  }
}
var _e;
A._$litElement$ = !0, A.finalized = !0, (_e = j.litElementHydrateSupport) == null || _e.call(j, { LitElement: A });
const ne = j.litElementPolyfillSupport;
ne == null || ne({ LitElement: A });
(j.litElementVersions ?? (j.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const G = (i) => (e, t) => {
  t !== void 0 ? t.addInitializer(() => {
    customElements.define(i, e);
  }) : customElements.define(i, e);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Je = { attribute: !0, type: String, converter: J, reflect: !1, hasChanged: ce }, Ke = (i = Je, e, t) => {
  const { kind: o, metadata: s } = t;
  let r = globalThis.litPropertyMetadata.get(s);
  if (r === void 0 && globalThis.litPropertyMetadata.set(s, r = /* @__PURE__ */ new Map()), o === "setter" && ((i = Object.create(i)).wrapped = !0), r.set(t.name, i), o === "accessor") {
    const { name: n } = t;
    return { set(a) {
      const l = e.get.call(this);
      e.set.call(this, a), this.requestUpdate(n, l, i, !0, a);
    }, init(a) {
      return a !== void 0 && this.C(n, void 0, i, a), a;
    } };
  }
  if (o === "setter") {
    const { name: n } = t;
    return function(a) {
      const l = this[n];
      e.call(this, a), this.requestUpdate(n, l, i, !0, a);
    };
  }
  throw Error("Unsupported decorator location: " + o);
};
function k(i) {
  return (e, t) => typeof t == "object" ? Ke(i, e, t) : ((o, s, r) => {
    const n = s.hasOwnProperty(r);
    return s.constructor.createProperty(r, o), n ? Object.getOwnPropertyDescriptor(s, r) : void 0;
  })(i, e, t);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function h(i) {
  return k({ ...i, state: !0, attribute: !1 });
}
const Qe = X`
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
  }

  .canvas-container.panning {
    cursor: grab;
  }

  .canvas-container.is-panning {
    cursor: grabbing;
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
    transition: fill 0.2s ease, stroke 0.2s ease;
    cursor: pointer;
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

  /* Walls */
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

  /* Wall cut-out mask for openings */
  .wall-cutout {
    fill: #0f172a;
    stroke: none;
  }

  /* Doors & Windows */
  .opening-door-frame {
    stroke: #cbd5e1;
    stroke-width: 2.5;
  }

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

  /* Help Tooltip HUD */
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
class w {
  /**
   * Snaps a world point (in meters) to grid, existing vertices, and angle guides.
   */
  static snapPoint(e, t, o = [], s, r = 0.25) {
    let n = { ...e };
    if (t.snapToElements && o.length > 0) {
      let c = r, p = null;
      for (const d of o)
        for (const u of [d.start, d.end]) {
          const f = this.distance(e, u);
          f < c && (c = f, p = u);
        }
      if (p)
        return {
          point: { x: p.x, y: p.y },
          snappedTo: "vertex"
        };
    }
    let a = !1, l;
    if (t.snapToAngles && s) {
      const c = e.x - s.x, p = e.y - s.y, d = Math.sqrt(c * c + p * p);
      if (d > 0.05) {
        let f = Math.atan2(p, c) * 180 / Math.PI;
        f < 0 && (f += 360);
        const $ = 45, z = Math.round(f / $) * $;
        if (Math.abs(f - z) <= 6) {
          const F = z * Math.PI / 180;
          n = {
            x: s.x + d * Math.cos(F),
            y: s.y + d * Math.sin(F)
          }, a = !0, l = z;
        }
      }
    }
    if (t.snapToGrid && !a) {
      const c = t.size || 0.5;
      return n = {
        x: Math.round(n.x / c) * c,
        y: Math.round(n.y / c) * c
      }, { point: n, snappedTo: "grid" };
    } else if (a)
      return { point: n, snappedTo: "angle", guideAngle: l };
    return { point: e, snappedTo: "none" };
  }
  /**
   * Snaps a point to the nearest wall centerline for placing doors and windows
   */
  static snapPointToWall(e, t, o = 0.6) {
    let s = null, r = o;
    for (const n of t) {
      const a = n.end.x - n.start.x, l = n.end.y - n.start.y, c = Math.sqrt(a * a + l * l);
      if (c === 0) continue;
      const p = Math.max(0, Math.min(
        1,
        ((e.x - n.start.x) * a + (e.y - n.start.y) * l) / (c * c)
      )), d = n.start.x + p * a, u = n.start.y + p * l, f = Math.sqrt((e.x - d) ** 2 + (e.y - u) ** 2);
      f < r && (r = f, s = {
        wall: n,
        projectionPoint: { x: d, y: u },
        offset: p * c,
        distance: f,
        angleRad: Math.atan2(l, a)
      });
    }
    return s;
  }
  static distance(e, t) {
    const o = e.x - t.x, s = e.y - t.y;
    return Math.sqrt(o * o + s * s);
  }
  static roundMeters(e, t = 2) {
    const o = Math.pow(10, t);
    return Math.round(e * o) / o;
  }
}
var et = Object.defineProperty, tt = Object.getOwnPropertyDescriptor, m = (i, e, t, o) => {
  for (var s = o > 1 ? void 0 : o ? tt(e, t) : e, r = i.length - 1, n; r >= 0; r--)
    (n = i[r]) && (s = (o ? n(e, t, s) : n(s)) || s);
  return o && s && et(e, t, s), s;
};
let b = class extends A {
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
    }, this.activeTool = "wall", this.currentWallThickness = 0.2, this.currentOpeningWidth = 0.9, this.viewport = { x: 300, y: 300, zoom: 1 }, this.isPanning = !1, this.panStart = { x: 0, y: 0 }, this.drawingWallStart = null, this.previewPoint = null, this.snapInfo = { snappedTo: "none" }, this.cursorCoords = { x: 0, y: 0 }, this.wallSnap = null, this.openingFlipSide = !1, this.openingFlipDirection = !1, this.calibrateStart = null, this.calibrateCurrent = null;
  }
  // En pixels écran
  // ==========================================
  // CONVERSIONS DE COORDONNÉES MONDE <-> ÉCRAN
  // ==========================================
  screenToWorld(i, e) {
    const t = this.getBoundingClientRect(), o = i - t.left, s = e - t.top, r = this.project.pixelsPerMeter * this.viewport.zoom;
    return {
      x: (o - this.viewport.x) / r,
      y: (s - this.viewport.y) / r
    };
  }
  worldToScreen(i) {
    const e = this.project.pixelsPerMeter * this.viewport.zoom;
    return {
      x: i.x * e + this.viewport.x,
      y: i.y * e + this.viewport.y
    };
  }
  // ==========================================
  // GESTION DU PAN & ZOOM (SOURIS & TACTILE)
  // ==========================================
  handleWheel(i) {
    i.preventDefault();
    const e = this.getBoundingClientRect(), t = i.clientX - e.left, o = i.clientY - e.top, s = i.deltaY < 0 ? 1.12 : 0.89, r = Math.min(Math.max(this.viewport.zoom * s, 0.15), 8), n = t - (t - this.viewport.x) * (r / this.viewport.zoom), a = o - (o - this.viewport.y) * (r / this.viewport.zoom);
    this.viewport = { x: n, y: a, zoom: r };
  }
  handlePointerDown(i) {
    var t, o;
    if (i.button === 1 || this.activeTool === "select" || i.shiftKey) {
      this.isPanning = !0, this.panStart = { x: i.clientX - this.viewport.x, y: i.clientY - this.viewport.y }, (o = (t = i.target).setPointerCapture) == null || o.call(t, i.pointerId);
      return;
    }
    if (i.button !== 0) return;
    const e = this.screenToWorld(i.clientX, i.clientY);
    if (this.activeTool === "wall") {
      const s = w.snapPoint(
        e,
        this.project.grid,
        this.project.walls,
        this.drawingWallStart || void 0
      );
      if (!this.drawingWallStart)
        this.drawingWallStart = s.point;
      else {
        const r = this.drawingWallStart, n = s.point;
        if (w.distance(r, n) >= 0.15) {
          const l = {
            id: `wall_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
            start: { ...r },
            end: { ...n },
            thickness: this.currentWallThickness,
            type: "standard"
          };
          this.project = {
            ...this.project,
            walls: [...this.project.walls, l]
          }, this.dispatchProjectChanged(), this.drawingWallStart = n;
        }
      }
    } else if (this.activeTool === "door" || this.activeTool === "window" || this.activeTool === "french_window") {
      if (this.wallSnap) {
        const s = this.activeTool === "window" ? "window" : this.activeTool === "french_window" ? "french_window" : "door", r = {
          id: `op_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
          wallId: this.wallSnap.wall.id,
          type: s,
          offset: w.roundMeters(this.wallSnap.offset),
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
      const s = this.getBoundingClientRect(), r = { x: i.clientX - s.left, y: i.clientY - s.top };
      if (!this.calibrateStart)
        this.calibrateStart = r, this.calibrateCurrent = r;
      else {
        const n = r.x - this.calibrateStart.x, a = r.y - this.calibrateStart.y, l = Math.sqrt(n * n + a * a);
        if (l >= 10) {
          const c = l / this.viewport.zoom;
          this.dispatchEvent(new CustomEvent("request-calibration", {
            detail: {
              pixelDistance: c,
              defaultMeters: w.roundMeters(c / this.project.pixelsPerMeter)
            },
            bubbles: !0,
            composed: !0
          })), this.calibrateStart = null, this.calibrateCurrent = null;
        }
      }
    }
  }
  handlePointerMove(i) {
    if (this.isPanning) {
      this.viewport = {
        ...this.viewport,
        x: i.clientX - this.panStart.x,
        y: i.clientY - this.panStart.y
      };
      return;
    }
    const e = this.screenToWorld(i.clientX, i.clientY);
    if (this.cursorCoords = {
      x: w.roundMeters(e.x),
      y: w.roundMeters(e.y)
    }, this.activeTool === "wall") {
      const t = w.snapPoint(
        e,
        this.project.grid,
        this.project.walls,
        this.drawingWallStart || void 0
      );
      this.previewPoint = t.point, this.snapInfo = { snappedTo: t.snappedTo, guideAngle: t.guideAngle }, this.wallSnap = null;
    } else if (this.activeTool === "door" || this.activeTool === "window" || this.activeTool === "french_window")
      this.wallSnap = w.snapPointToWall(e, this.project.walls, 0.8), this.previewPoint = null;
    else if (this.activeTool === "calibrate" && this.calibrateStart) {
      const t = this.getBoundingClientRect();
      this.calibrateCurrent = { x: i.clientX - t.left, y: i.clientY - t.top };
    } else
      this.previewPoint = null, this.wallSnap = null;
  }
  handlePointerUp(i) {
    var e, t;
    this.isPanning && (this.isPanning = !1, (t = (e = i.target).releasePointerCapture) == null || t.call(e, i.pointerId));
  }
  handleKeyDown(i) {
    i.key === "Escape" ? (this.drawingWallStart = null, this.previewPoint = null, this.calibrateStart = null, this.calibrateCurrent = null, this.wallSnap = null, this.requestUpdate()) : i.key === " " || i.key === "Spacebar" ? this.wallSnap && (i.preventDefault(), this.openingFlipSide = !this.openingFlipSide, this.requestUpdate()) : i.key.toLowerCase() === "f" && this.wallSnap && (this.openingFlipDirection = !this.openingFlipDirection, this.requestUpdate());
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
  // RENDU GÉOMÉTRIQUE
  // ==========================================
  computeWallPolygon(i, e, t) {
    const o = e.x - i.x, s = e.y - i.y, r = Math.sqrt(o * o + s * s);
    if (r === 0) return [i, i, e, e];
    const n = t / 2, a = -s / r * n, l = o / r * n;
    return [
      { x: i.x + a, y: i.y + l },
      { x: e.x + a, y: e.y + l },
      { x: e.x - a, y: e.y - l },
      { x: i.x - a, y: i.y - l }
    ];
  }
  // Calque de fond d'image importé
  renderBackgroundLayer() {
    const i = this.project.background;
    if (!i || !i.imageUrl || !i.visible) return null;
    this.project.pixelsPerMeter * this.viewport.zoom;
    const e = this.worldToScreen(i.offset || { x: 0, y: 0 }), t = i.scale || 1;
    return v`
      <g 
        class="background-image-layer" 
        transform="translate(${e.x}, ${e.y}) scale(${this.viewport.zoom * t})"
        style="opacity: ${i.opacity};"
      >
        <image 
          href="${i.imageUrl}" 
          x="0" 
          y="0" 
          width="${i.widthPx || 1200}" 
          height="${i.heightPx || 900}" 
        />
      </g>
    `;
  }
  // Calque des Pièces (Surfaces colorées et étiquettes m²)
  renderRooms() {
    return this.project.rooms.map((i) => {
      if (!i.polygon || i.polygon.length < 3) return null;
      const e = i.polygon.map((r) => this.worldToScreen(r)), t = e.map((r) => `${r.x},${r.y}`).join(" ");
      let o = 0, s = 0;
      return e.forEach((r) => {
        o += r.x, s += r.y;
      }), o /= e.length, s /= e.length, v`
        <g class="room-group" data-room-id="${i.id}">
          <polygon 
            points="${t}" 
            class="room-polygon"
            style="fill: ${i.color || "rgba(56, 189, 248, 0.12)"};"
          />
          <g class="room-label-group" transform="translate(${o}, ${s})">
            <text class="room-label-name" y="-6">${i.name}</text>
            <text class="room-label-area" y="12">${i.areaM2.toFixed(1)} m²</text>
          </g>
        </g>
      `;
    });
  }
  renderGrid() {
    const i = this.project.pixelsPerMeter * this.viewport.zoom, t = (this.project.grid.size || 0.5) * i;
    if (t < 12) return null;
    const o = t * 2;
    return v`
      <defs>
        <pattern id="grid-sub" width="${t}" height="${t}" patternUnits="userSpaceOnUse"
          patternTransform="translate(${this.viewport.x % t}, ${this.viewport.y % t})">
          <line x1="0" y1="0" x2="${t}" y2="0" stroke="rgba(255,255,255,0.06)" stroke-width="0.5" />
          <line x1="0" y1="0" x2="0" y2="${t}" stroke="rgba(255,255,255,0.06)" stroke-width="0.5" />
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
    return this.project.walls.map((i) => {
      const t = this.computeWallPolygon(i.start, i.end, i.thickness).map((l) => this.worldToScreen(l)), o = this.worldToScreen(i.start), s = this.worldToScreen(i.end), r = t.map((l) => `${l.x},${l.y}`).join(" "), n = w.distance(i.start, i.end), a = {
        x: (o.x + s.x) / 2,
        y: (o.y + s.y) / 2
      };
      return v`
        <g class="wall-element" data-wall-id="${i.id}">
          <polygon points="${r}" class="wall-rect" />
          <line x1="${o.x}" y1="${o.y}" x2="${s.x}" y2="${s.y}" class="wall-centerline" />
          
          ${n >= 0.6 ? v`
            <g class="dimension-badge" transform="translate(${a.x}, ${a.y - 14})">
              <rect x="-26" y="-10" width="52" height="20" />
              <text>${w.roundMeters(n).toFixed(2)} m</text>
            </g>
          ` : null}
        </g>
      `;
    });
  }
  // Rendu des Portes et Fenêtres dans les cloisons
  renderOpenings() {
    return this.project.openings.map((i) => {
      const e = this.project.walls.find((f) => f.id === i.wallId);
      if (!e) return null;
      const t = e.end.x - e.start.x, o = e.end.y - e.start.y, s = Math.sqrt(t * t + o * o);
      if (s === 0) return null;
      const n = Math.atan2(o, t) * 180 / Math.PI, a = e.start.x + i.offset / s * t, l = e.start.y + i.offset / s * o, c = this.worldToScreen({ x: a, y: l }), p = this.project.pixelsPerMeter * this.viewport.zoom, d = i.width * p, u = e.thickness * p;
      return v`
        <g 
          class="opening-element" 
          transform="translate(${c.x}, ${c.y}) rotate(${n})"
        >
          <!-- Découpe du mur -->
          <rect 
            x="${-d / 2}" 
            y="${-u / 2 - 1}" 
            width="${d}" 
            height="${u + 2}" 
            class="wall-cutout"
          />

          <!-- Rendu Porte ou Fenêtre -->
          ${i.type === "door" ? this.renderDoorSymbol(d, u, i.flipSide, i.flipDirection) : null}
          ${i.type === "window" ? this.renderWindowSymbol(d, u) : null}
          ${i.type === "french_window" ? this.renderFrenchWindowSymbol(d, u) : null}
        </g>
      `;
    });
  }
  // Symboles architecturaux
  renderDoorSymbol(i, e, t, o) {
    const s = i / 2, r = t ? -1 : 1, n = o ? s : -s, a = o ? -1 : 1;
    return v`
      <g>
        <!-- Bâti de porte -->
        <rect x="${-s}" y="${-e / 2}" width="4" height="${e}" fill="#94a3b8" />
        <rect x="${s - 4}" y="${-e / 2}" width="4" height="${e}" fill="#94a3b8" />

        <!-- Vantail ouvert à 90 degrés -->
        <line 
          x1="${n}" 
          y1="0" 
          x2="${n}" 
          y2="${r * i}" 
          class="opening-door-leaf" 
        />

        <!-- Arc d'ouverture quart-de-cercle -->
        <path 
          d="M ${n + a * i} 0 A ${i} ${i} 0 0 ${r > 0 ? o ? 0 : 1 : o ? 1 : 0} ${n} ${r * i}" 
          class="opening-door-arc" 
        />
      </g>
    `;
  }
  renderWindowSymbol(i, e) {
    const t = i / 2;
    return v`
      <g>
        <!-- Cadre extérieur -->
        <rect x="${-t}" y="${-e / 2}" width="${i}" height="${e}" fill="none" class="opening-window-frame" />
        <!-- Vitrage central -->
        <line x1="${-t}" y1="0" x2="${t}" y2="0" class="opening-window-glass" />
        <line x1="${-t + 4}" y1="${-e / 4}" x2="${t - 4}" y2="${-e / 4}" stroke="rgba(56, 189, 248, 0.4)" stroke-width="1" />
        <line x1="${-t + 4}" y1="${e / 4}" x2="${t - 4}" y2="${e / 4}" stroke="rgba(56, 189, 248, 0.4)" stroke-width="1" />
      </g>
    `;
  }
  renderFrenchWindowSymbol(i, e) {
    const t = i / 2;
    return v`
      <g>
        <rect x="${-t}" y="${-e / 2}" width="${i}" height="${e}" fill="none" class="opening-window-frame" />
        <!-- Double vantail coulissant -->
        <rect x="${-t}" y="${-e / 4}" width="${t}" height="3" fill="#38bdf8" />
        <rect x="0" y="${e / 4}" width="${t}" height="3" fill="#38bdf8" />
      </g>
    `;
  }
  // Prévisualisation de placement d'ouvrant lors du survol de mur
  renderOpeningPreview() {
    if (!this.wallSnap) return null;
    const i = this.project.pixelsPerMeter * this.viewport.zoom, e = (this.currentOpeningWidth || 0.9) * i, t = this.wallSnap.wall.thickness * i, o = this.worldToScreen(this.wallSnap.projectionPoint), s = this.wallSnap.angleRad * 180 / Math.PI;
    return v`
      <g 
        class="opening-preview" 
        transform="translate(${o.x}, ${o.y}) rotate(${s})"
      >
        <rect x="${-e / 2}" y="${-t / 2}" width="${e}" height="${t}" fill="rgba(56, 189, 248, 0.3)" stroke="#38bdf8" stroke-dasharray="4, 2" />
        ${this.activeTool === "door" ? this.renderDoorSymbol(e, t, this.openingFlipSide, this.openingFlipDirection) : null}
        ${this.activeTool === "window" ? this.renderWindowSymbol(e, t) : null}
        ${this.activeTool === "french_window" ? this.renderFrenchWindowSymbol(e, t) : null}
      </g>
    `;
  }
  renderPreviewWall() {
    if (!this.drawingWallStart || !this.previewPoint) return null;
    const e = this.computeWallPolygon(
      this.drawingWallStart,
      this.previewPoint,
      this.currentWallThickness
    ).map((a) => this.worldToScreen(a)), t = this.worldToScreen(this.drawingWallStart), o = this.worldToScreen(this.previewPoint), s = e.map((a) => `${a.x},${a.y}`).join(" "), r = w.distance(this.drawingWallStart, this.previewPoint), n = {
      x: (t.x + o.x) / 2,
      y: (t.y + o.y) / 2
    };
    return v`
      <g class="preview-wall-group">
        <polygon points="${s}" class="preview-wall-rect" />
        <line x1="${t.x}" y1="${t.y}" x2="${o.x}" y2="${o.y}" class="preview-wall-line" />

        ${this.snapInfo.guideAngle !== void 0 ? v`
          <line x1="${t.x}" y1="${t.y}" x2="${o.x}" y2="${o.y}" class="angle-guide-line" />
        ` : null}

        <g class="dimension-badge" transform="translate(${n.x}, ${n.y - 16})">
          <rect x="-30" y="-11" width="60" height="22" />
          <text>${w.roundMeters(r).toFixed(2)} m</text>
        </g>
      </g>
    `;
  }
  // Prévisualisation du tracé d'étalonnage
  renderCalibrationLine() {
    if (!this.calibrateStart || !this.calibrateCurrent) return null;
    const i = this.calibrateStart, e = this.calibrateCurrent, t = e.x - i.x, o = e.y - i.y, s = Math.sqrt(t * t + o * o), r = { x: (i.x + e.x) / 2, y: (i.y + e.y) / 2 };
    return v`
      <g class="calibration-preview-group">
        <line x1="${i.x}" y1="${i.y}" x2="${e.x}" y2="${e.y}" class="calibration-line" />
        <circle cx="${i.x}" cy="${i.y}" r="6" class="calibration-endpoint" />
        <circle cx="${e.x}" cy="${e.y}" r="6" class="calibration-endpoint" />

        <g class="dimension-badge" transform="translate(${r.x}, ${r.y - 18})">
          <rect x="-35" y="-11" width="70" height="22" style="stroke: #f59e0b;" />
          <text style="fill: #f59e0b;">${Math.round(s)} px</text>
        </g>
      </g>
    `;
  }
  renderSnapIndicator() {
    if (!this.previewPoint || this.snapInfo.snappedTo === "none") return null;
    const i = this.worldToScreen(this.previewPoint), e = this.snapInfo.snappedTo === "vertex";
    return v`
      <g transform="translate(${i.x}, ${i.y})">
        <circle r="${e ? 7 : 5}" class="snap-indicator" />
        ${e ? v`<circle r="2" fill="#38bdf8" />` : null}
      </g>
    `;
  }
  // ==========================================
  // COMMANDES HUD ZOOM & CENTRAGE
  // ==========================================
  zoomIn() {
    this.viewport = { ...this.viewport, zoom: Math.min(this.viewport.zoom * 1.25, 8) };
  }
  zoomOut() {
    this.viewport = { ...this.viewport, zoom: Math.max(this.viewport.zoom / 1.25, 0.15) };
  }
  resetView() {
    this.viewport = { x: 300, y: 300, zoom: 1 };
  }
  getHelpMessage() {
    return this.activeTool === "wall" ? this.drawingWallStart ? "Cliquez pour terminer le mur. Échap pour annuler." : "Cliquez pour démarrer un mur." : this.activeTool === "door" ? "Survolez un mur. Espace = inverser intérieur/extérieur. F = gauche/droite." : this.activeTool === "window" || this.activeTool === "french_window" ? "Survolez un mur pour insérer la fenêtre." : this.activeTool === "calibrate" ? this.calibrateStart ? "Cliquez sur la 2ème extrémité du mur mesuré." : "Tracez un segment sur un mur pour étalonner l'échelle." : null;
  }
  render() {
    const i = this.getHelpMessage();
    return y`
      <div 
        class="canvas-container ${this.isPanning ? "is-panning" : ""}"
        @wheel=${this.handleWheel}
        @pointerdown=${this.handlePointerDown}
        @pointermove=${this.handlePointerMove}
        @pointerup=${this.handlePointerUp}
      >
        <svg class="main-viewport">
          <!-- 1. Calque Image de Fond -->
          ${this.renderBackgroundLayer()}

          <!-- 2. Grille métrique -->
          ${this.renderGrid()}

          <!-- 3. Pièces / Sols -->
          ${this.renderRooms()}

          <!-- 4. Murs -->
          ${this.renderWalls()}

          <!-- 5. Ouvertures (Portes & Fenêtres) -->
          ${this.renderOpenings()}

          <!-- 6. Prévisualisation Ouvertures -->
          ${this.renderOpeningPreview()}

          <!-- 7. Prévisualisation Mur en tracé -->
          ${this.renderPreviewWall()}

          <!-- 8. Ligne d'étalonnage -->
          ${this.renderCalibrationLine()}

          <!-- 9. Indicateur d'accroche magnétique -->
          ${this.renderSnapIndicator()}
        </svg>

        <!-- Message d'aide contextuel en haut -->
        ${i ? y`<div class="help-hud">${i}</div>` : null}

        <!-- Coordonnées curseur -->
        <div class="coords-hud">
          X: ${this.cursorCoords.x.toFixed(2)} m | Y: ${this.cursorCoords.y.toFixed(2)} m | Outil: ${this.activeTool.toUpperCase()}
        </div>

        <!-- HUD Contrôles Zoom -->
        <div class="canvas-hud">
          <button class="hud-btn" @click=${this.zoomOut} title="Zoom Arrière">−</button>
          <div class="hud-zoom-label">${Math.round(this.viewport.zoom * 100)}%</div>
          <button class="hud-btn" @click=${this.zoomIn} title="Zoom Avant">+</button>
          <button class="hud-btn" @click=${this.resetView} title="Recentrer">⌖</button>
        </div>
      </div>
    `;
  }
};
b.styles = Qe;
m([
  k({ type: Object })
], b.prototype, "project", 2);
m([
  k({ type: String })
], b.prototype, "activeTool", 2);
m([
  k({ type: Number })
], b.prototype, "currentWallThickness", 2);
m([
  k({ type: Number })
], b.prototype, "currentOpeningWidth", 2);
m([
  h()
], b.prototype, "viewport", 2);
m([
  h()
], b.prototype, "isPanning", 2);
m([
  h()
], b.prototype, "drawingWallStart", 2);
m([
  h()
], b.prototype, "previewPoint", 2);
m([
  h()
], b.prototype, "snapInfo", 2);
m([
  h()
], b.prototype, "cursorCoords", 2);
m([
  h()
], b.prototype, "wallSnap", 2);
m([
  h()
], b.prototype, "openingFlipSide", 2);
m([
  h()
], b.prototype, "openingFlipDirection", 2);
m([
  h()
], b.prototype, "calibrateStart", 2);
m([
  h()
], b.prototype, "calibrateCurrent", 2);
b = m([
  G("home-architect-canvas")
], b);
var it = Object.defineProperty, ot = Object.getOwnPropertyDescriptor, Ce = (i, e, t, o) => {
  for (var s = o > 1 ? void 0 : o ? ot(e, t) : e, r = i.length - 1, n; r >= 0; r--)
    (n = i[r]) && (s = (o ? n(e, t, s) : n(s)) || s);
  return o && s && it(e, t, s), s;
};
let Q = class extends A {
  constructor() {
    super(...arguments), this.activeTool = "wall";
  }
  selectTool(i) {
    this.dispatchEvent(new CustomEvent("tool-selected", {
      detail: { tool: i },
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
  triggerImageUpload() {
    this.dispatchEvent(new CustomEvent("trigger-upload-background", {
      bubbles: !0,
      composed: !0
    }));
  }
  render() {
    return y`
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

      <!-- Import de plan de fond -->
      <button 
        class="tool-btn" 
        @click=${this.triggerImageUpload} 
        title="Importer un plan en fond (PNG/JPG/PDF)"
      >
        🖼️
      </button>

      <!-- Étalonnage d'échelle -->
      <button 
        class="tool-btn ${this.activeTool === "calibrate" ? "active" : ""}" 
        @click=${() => this.selectTool("calibrate")} 
        title="Étalonnage d'échelle : tracer un mur mesuré (M)"
      >
        📏
      </button>
    `;
  }
};
Q.styles = X`
    :host {
      display: flex;
      flex-direction: column;
      gap: 6px;
      background: rgba(30, 41, 59, 0.9);
      backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 14px;
      padding: 8px 6px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
      z-index: 40;
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
      margin: 4px 2px;
    }
  `;
Ce([
  k({ type: String })
], Q.prototype, "activeTool", 2);
Q = Ce([
  G("home-architect-toolbar")
], Q);
var st = Object.defineProperty, rt = Object.getOwnPropertyDescriptor, C = (i, e, t, o) => {
  for (var s = o > 1 ? void 0 : o ? rt(e, t) : e, r = i.length - 1, n; r >= 0; r--)
    (n = i[r]) && (s = (o ? n(e, t, s) : n(s)) || s);
  return o && s && st(e, t, s), s;
};
const M = [
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
let S = class extends A {
  constructor() {
    super(...arguments), this.selectedTemplate = M[0], this.width = M[0].widthMeters, this.length = M[0].lengthMeters, this.thickness = M[0].wallThickness, this.addDoor = M[0].addDoor, this.addWindow = M[0].addWindow, this.roomName = M[0].name;
  }
  selectTemplate(i) {
    this.selectedTemplate = i, this.width = i.widthMeters, this.length = i.lengthMeters, this.thickness = i.wallThickness, this.addDoor = i.addDoor, this.addWindow = i.addWindow, this.roomName = i.name;
  }
  handleCreate() {
    this.dispatchEvent(new CustomEvent("create-room", {
      detail: {
        name: this.roomName,
        width: this.width,
        length: this.length,
        thickness: this.thickness,
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
    const i = (this.width * this.length).toFixed(1);
    return y`
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
          ${M.map((e) => y`
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
            <span class="surface-badge">${i} m²</span>
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
S.styles = X`
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
C([
  h()
], S.prototype, "selectedTemplate", 2);
C([
  h()
], S.prototype, "width", 2);
C([
  h()
], S.prototype, "length", 2);
C([
  h()
], S.prototype, "thickness", 2);
C([
  h()
], S.prototype, "addDoor", 2);
C([
  h()
], S.prototype, "addWindow", 2);
C([
  h()
], S.prototype, "roomName", 2);
S = C([
  G("home-architect-wizard-modal")
], S);
var nt = Object.defineProperty, at = Object.getOwnPropertyDescriptor, te = (i, e, t, o) => {
  for (var s = o > 1 ? void 0 : o ? at(e, t) : e, r = i.length - 1, n; r >= 0; r--)
    (n = i[r]) && (s = (o ? n(e, t, s) : n(s)) || s);
  return o && s && nt(e, t, s), s;
};
let I = class extends A {
  constructor() {
    super(...arguments), this.pixelDistance = 200, this.defaultMeters = 4, this.realMeters = 4;
  }
  firstUpdated() {
    this.realMeters = this.defaultMeters;
  }
  handleApply() {
    if (this.realMeters <= 0.05) return;
    const i = this.pixelDistance / this.realMeters;
    this.dispatchEvent(new CustomEvent("calibrate-confirmed", {
      detail: {
        realMeters: this.realMeters,
        pixelDistance: this.pixelDistance,
        pixelsPerMeter: i
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
    const i = (this.pixelDistance / (this.realMeters || 1)).toFixed(1);
    return y`
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
            Distance tracée à l'écran : ${Math.round(this.pixelDistance)} px | Échelle résultante : ${i} px/m
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
I.styles = X`
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
te([
  k({ type: Number })
], I.prototype, "pixelDistance", 2);
te([
  k({ type: Number })
], I.prototype, "defaultMeters", 2);
te([
  h()
], I.prototype, "realMeters", 2);
I = te([
  G("home-architect-calibrate-modal")
], I);
var lt = Object.defineProperty, ct = Object.getOwnPropertyDescriptor, _ = (i, e, t, o) => {
  for (var s = o > 1 ? void 0 : o ? ct(e, t) : e, r = i.length - 1, n; r >= 0; r--)
    (n = i[r]) && (s = (o ? n(e, t, s) : n(s)) || s);
  return o && s && lt(e, t, s), s;
};
let x = class extends A {
  constructor() {
    super(...arguments), this.narrow = !1, this.activeTool = "wall", this.currentThickness = 0.2, this.currentOpeningWidth = 0.9, this.activeLevel = "rdc", this.isWizardOpen = !1, this.isCalibrateModalOpen = !1, this.calibrationData = null, this.project = {
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
    }, this.fileInputRef = null;
  }
  handleToolSelected(i) {
    this.activeTool = i.detail.tool, this.activeTool === "door" ? this.currentOpeningWidth = 0.9 : this.activeTool === "window" ? this.currentOpeningWidth = 1.2 : this.activeTool === "french_window" && (this.currentOpeningWidth = 2);
  }
  handleProjectChanged(i) {
    this.project = { ...i.detail.project };
  }
  handleThicknessChange(i) {
    this.currentThickness = parseFloat(i.target.value);
  }
  handleOpeningWidthChange(i) {
    this.currentOpeningWidth = parseFloat(i.target.value);
  }
  // ==========================================
  // ASSISTANT DÉBUTANT (CRÉATION DE PIÈCE)
  // ==========================================
  handleCreateRoomFromWizard(i) {
    const { name: e, width: t, length: o, thickness: s, color: r, icon: n, addDoor: a, addWindow: l } = i.detail, c = 2, p = 2, d = { x: c, y: p }, u = { x: c + t, y: p }, f = { x: c + t, y: p + o }, $ = { x: c, y: p + o }, z = {
      id: `w_top_${Date.now()}`,
      start: d,
      end: u,
      thickness: s,
      type: "standard"
    }, pe = {
      id: `w_right_${Date.now()}`,
      start: u,
      end: f,
      thickness: s,
      type: "standard"
    }, F = {
      id: `w_bottom_${Date.now()}`,
      start: f,
      end: $,
      thickness: s,
      type: "standard"
    }, Ee = {
      id: `w_left_${Date.now()}`,
      start: $,
      end: d,
      thickness: s,
      type: "standard"
    }, ie = [];
    a && ie.push({
      id: `op_door_${Date.now()}`,
      wallId: F.id,
      type: "door",
      offset: t / 2,
      width: 0.9,
      flipSide: !1,
      flipDirection: !1
    }), l && ie.push({
      id: `op_win_${Date.now()}`,
      wallId: z.id,
      type: "window",
      offset: t / 2,
      width: 1.2,
      flipSide: !1,
      flipDirection: !1
    });
    const De = {
      id: `room_${Date.now()}`,
      name: e,
      polygon: [d, u, f, $],
      areaM2: t * o,
      color: r,
      icon: n
    };
    this.project = {
      ...this.project,
      walls: [...this.project.walls, z, pe, F, Ee],
      openings: [...this.project.openings, ...ie],
      rooms: [...this.project.rooms, De]
    }, this.isWizardOpen = !1, this.activeTool = "select";
  }
  // ==========================================
  // IMPORT D'IMAGE DE FOND & ÉTALONNAGE
  // ==========================================
  triggerFileInput() {
    if (!this.fileInputRef) {
      const i = document.createElement("input");
      i.type = "file", i.accept = "image/*", i.style.display = "none", i.addEventListener("change", (e) => this.handleFileSelected(e)), document.body.appendChild(i), this.fileInputRef = i;
    }
    this.fileInputRef.click();
  }
  handleFileSelected(i) {
    var o;
    const e = (o = i.target.files) == null ? void 0 : o[0];
    if (!e) return;
    const t = new FileReader();
    t.onload = (s) => {
      var a;
      const r = (a = s.target) == null ? void 0 : a.result, n = new Image();
      n.onload = () => {
        this.project = {
          ...this.project,
          background: {
            imageUrl: r,
            opacity: 0.4,
            visible: !0,
            offset: { x: 0, y: 0 },
            scale: 1,
            rotation: 0,
            widthPx: n.naturalWidth,
            heightPx: n.naturalHeight
          }
        }, this.activeTool = "calibrate";
      }, n.src = r;
    }, t.readAsDataURL(e);
  }
  handleRequestCalibration(i) {
    this.calibrationData = i.detail, this.isCalibrateModalOpen = !0;
  }
  handleCalibrateConfirmed(i) {
    const { pixelsPerMeter: e } = i.detail;
    this.project = {
      ...this.project,
      pixelsPerMeter: Math.round(e * 10) / 10
    }, this.isCalibrateModalOpen = !1, this.calibrationData = null, this.activeTool = "wall";
  }
  handleOpacityChange(i) {
    const e = parseFloat(i.target.value);
    this.project.background && (this.project = {
      ...this.project,
      background: { ...this.project.background, opacity: e }
    });
  }
  saveProject() {
    this.hass && this.hass.callWS ? this.hass.callWS({
      type: "home_architect/save_project",
      project: this.project
    }).then(() => {
      alert("Plan sauvegardé avec succès dans Home Assistant !");
    }).catch((i) => {
      console.error("Erreur sauvegarde HA:", i), localStorage.setItem(`home_architect_${this.project.id}`, JSON.stringify(this.project)), alert("Sauvegardé localement dans le navigateur.");
    }) : (localStorage.setItem(`home_architect_${this.project.id}`, JSON.stringify(this.project)), alert("Plan sauvegardé localement !"));
  }
  render() {
    var e, t;
    const i = !!((e = this.project.background) != null && e.imageUrl);
    return y`
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
          <!-- Assistant Débutant -->
          <button class="btn-wizard" @click=${() => this.isWizardOpen = !0}>
            🪄 Assistant Pièce
          </button>

          <!-- Épaisseur mur -->
          ${this.activeTool === "wall" ? y`
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
          ${this.activeTool === "door" || this.activeTool === "window" || this.activeTool === "french_window" ? y`
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

          <!-- Opacité de l'image de fond si présente -->
          ${i ? y`
            <div class="control-group">
              <label>Fond :</label>
              <input 
                type="range" 
                min="0.05" 
                max="1.0" 
                step="0.05" 
                .value=${((t = this.project.background) == null ? void 0 : t.opacity) || 0.4}
                @input=${this.handleOpacityChange}
                style="width: 70px;"
                title="Opacité du plan de fond"
              />
            </div>
          ` : null}

          <!-- Indicateur d'échelle -->
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
        <home-architect-toolbar 
          class="floating-toolbar"
          .activeTool=${this.activeTool}
          @tool-selected=${this.handleToolSelected}
          @open-wizard=${() => this.isWizardOpen = !0}
          @trigger-upload-background=${this.triggerFileInput}
        ></home-architect-toolbar>

        <home-architect-canvas
          .project=${this.project}
          .activeTool=${this.activeTool}
          .currentWallThickness=${this.currentThickness}
          .currentOpeningWidth=${this.currentOpeningWidth}
          @project-changed=${this.handleProjectChanged}
          @request-calibration=${this.handleRequestCalibration}
        ></home-architect-canvas>
      </div>

      <!-- Modale Assistant Débutant -->
      ${this.isWizardOpen ? y`
        <home-architect-wizard-modal
          @create-room=${this.handleCreateRoomFromWizard}
          @close=${() => this.isWizardOpen = !1}
        ></home-architect-wizard-modal>
      ` : null}

      <!-- Modale Étalonnage Échelle -->
      ${this.isCalibrateModalOpen && this.calibrationData ? y`
        <home-architect-calibrate-modal
          .pixelDistance=${this.calibrationData.pixelDistance}
          .defaultMeters=${this.calibrationData.defaultMeters}
          @calibrate-confirmed=${this.handleCalibrateConfirmed}
          @close=${() => this.isCalibrateModalOpen = !1}
        ></home-architect-calibrate-modal>
      ` : null}
    `;
  }
};
x.styles = X`
    :host {
      display: flex;
      flex-direction: column;
      width: 100vw;
      height: 100vh;
      overflow: hidden;
      background: #0f172a;
      color: #f8fafc;
      font-family: var(--ha-font-family, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif);
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
      gap: 12px;
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

    select, input[type="range"], button.btn-action {
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
      position: relative;
      width: 100%;
      height: calc(100vh - 56px);
    }

    .floating-toolbar {
      position: absolute;
      top: 20px;
      left: 20px;
      z-index: 20;
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
  `;
_([
  k({ type: Object })
], x.prototype, "hass", 2);
_([
  k({ type: Boolean })
], x.prototype, "narrow", 2);
_([
  h()
], x.prototype, "activeTool", 2);
_([
  h()
], x.prototype, "currentThickness", 2);
_([
  h()
], x.prototype, "currentOpeningWidth", 2);
_([
  h()
], x.prototype, "activeLevel", 2);
_([
  h()
], x.prototype, "isWizardOpen", 2);
_([
  h()
], x.prototype, "isCalibrateModalOpen", 2);
_([
  h()
], x.prototype, "calibrationData", 2);
_([
  h()
], x.prototype, "project", 2);
x = _([
  G("home-architect-panel")
], x);
console.info(
  "%c 📐 HOME ARCHITECT %c v1.0.0 Loaded ",
  "background: #0284c7; color: #fff; font-weight: bold; border-radius: 4px 0 0 4px; padding: 2px 6px;",
  "background: #1e293b; color: #38bdf8; font-weight: bold; border-radius: 0 4px 4px 0; padding: 2px 6px;"
);
