/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const $e = globalThis, ze = $e.ShadowRoot && ($e.ShadyCSS === void 0 || $e.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Re = Symbol(), Fe = /* @__PURE__ */ new WeakMap();
let Ze = class {
  constructor(e, t, i) {
    if (this._$cssResult$ = !0, i !== Re) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (ze && e === void 0) {
      const i = t !== void 0 && t.length === 1;
      i && (e = Fe.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), i && Fe.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const ot = (s) => new Ze(typeof s == "string" ? s : s + "", void 0, Re), L = (s, ...e) => {
  const t = s.length === 1 ? s[0] : e.reduce((i, o, n) => i + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + s[n + 1], s[0]);
  return new Ze(t, s, Re);
}, rt = (s, e) => {
  if (ze) s.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const i = document.createElement("style"), o = $e.litNonce;
    o !== void 0 && i.setAttribute("nonce", o), i.textContent = t.cssText, s.appendChild(i);
  }
}, Ne = ze ? (s) => s : (s) => s instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const i of e.cssRules) t += i.cssText;
  return ot(t);
})(s) : s;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: nt, defineProperty: at, getOwnPropertyDescriptor: lt, getOwnPropertyNames: ct, getOwnPropertySymbols: dt, getPrototypeOf: pt } = Object, X = globalThis, He = X.trustedTypes, ht = He ? He.emptyScript : "", Te = X.reactiveElementPolyfillSupport, ue = (s, e) => s, ke = { toAttribute(s, e) {
  switch (e) {
    case Boolean:
      s = s ? ht : null;
      break;
    case Object:
    case Array:
      s = s == null ? s : JSON.stringify(s);
  }
  return s;
}, fromAttribute(s, e) {
  let t = s;
  switch (e) {
    case Boolean:
      t = s !== null;
      break;
    case Number:
      t = s === null ? null : Number(s);
      break;
    case Object:
    case Array:
      try {
        t = JSON.parse(s);
      } catch {
        t = null;
      }
  }
  return t;
} }, Oe = (s, e) => !nt(s, e), Le = { attribute: !0, type: String, converter: ke, reflect: !1, useDefault: !1, hasChanged: Oe };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), X.litPropertyMetadata ?? (X.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let re = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = Le) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const i = Symbol(), o = this.getPropertyDescriptor(e, i, t);
      o !== void 0 && at(this.prototype, e, o);
    }
  }
  static getPropertyDescriptor(e, t, i) {
    const { get: o, set: n } = lt(this.prototype, e) ?? { get() {
      return this[t];
    }, set(r) {
      this[t] = r;
    } };
    return { get: o, set(r) {
      const a = o == null ? void 0 : o.call(this);
      n == null || n.call(this, r), this.requestUpdate(e, a, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? Le;
  }
  static _$Ei() {
    if (this.hasOwnProperty(ue("elementProperties"))) return;
    const e = pt(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(ue("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(ue("properties"))) {
      const t = this.properties, i = [...ct(t), ...dt(t)];
      for (const o of i) this.createProperty(o, t[o]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const t = litPropertyMetadata.get(e);
      if (t !== void 0) for (const [i, o] of t) this.elementProperties.set(i, o);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t, i] of this.elementProperties) {
      const o = this._$Eu(t, i);
      o !== void 0 && this._$Eh.set(o, t);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const t = [];
    if (Array.isArray(e)) {
      const i = new Set(e.flat(1 / 0).reverse());
      for (const o of i) t.unshift(Ne(o));
    } else e !== void 0 && t.push(Ne(e));
    return t;
  }
  static _$Eu(e, t) {
    const i = t.attribute;
    return i === !1 ? void 0 : typeof i == "string" ? i : typeof e == "string" ? e.toLowerCase() : void 0;
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
    for (const i of t.keys()) this.hasOwnProperty(i) && (e.set(i, this[i]), delete this[i]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return rt(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    var e;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (e = this._$EO) == null || e.forEach((t) => {
      var i;
      return (i = t.hostConnected) == null ? void 0 : i.call(t);
    });
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    var e;
    (e = this._$EO) == null || e.forEach((t) => {
      var i;
      return (i = t.hostDisconnected) == null ? void 0 : i.call(t);
    });
  }
  attributeChangedCallback(e, t, i) {
    this._$AK(e, i);
  }
  _$ET(e, t) {
    var n;
    const i = this.constructor.elementProperties.get(e), o = this.constructor._$Eu(e, i);
    if (o !== void 0 && i.reflect === !0) {
      const r = (((n = i.converter) == null ? void 0 : n.toAttribute) !== void 0 ? i.converter : ke).toAttribute(t, i.type);
      this._$Em = e, r == null ? this.removeAttribute(o) : this.setAttribute(o, r), this._$Em = null;
    }
  }
  _$AK(e, t) {
    var n, r;
    const i = this.constructor, o = i._$Eh.get(e);
    if (o !== void 0 && this._$Em !== o) {
      const a = i.getPropertyOptions(o), l = typeof a.converter == "function" ? { fromAttribute: a.converter } : ((n = a.converter) == null ? void 0 : n.fromAttribute) !== void 0 ? a.converter : ke;
      this._$Em = o;
      const d = l.fromAttribute(t, a.type);
      this[o] = d ?? ((r = this._$Ej) == null ? void 0 : r.get(o)) ?? d, this._$Em = null;
    }
  }
  requestUpdate(e, t, i, o = !1, n) {
    var r;
    if (e !== void 0) {
      const a = this.constructor;
      if (o === !1 && (n = this[e]), i ?? (i = a.getPropertyOptions(e)), !((i.hasChanged ?? Oe)(n, t) || i.useDefault && i.reflect && n === ((r = this._$Ej) == null ? void 0 : r.get(e)) && !this.hasAttribute(a._$Eu(e, i)))) return;
      this.C(e, t, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, t, { useDefault: i, reflect: o, wrapped: n }, r) {
    i && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(e) && (this._$Ej.set(e, r ?? t ?? this[e]), n !== !0 || r !== void 0) || (this._$AL.has(e) || (this.hasUpdated || i || (t = void 0), this._$AL.set(e, t)), o === !0 && this._$Em !== e && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(e));
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
    var i;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [n, r] of this._$Ep) this[n] = r;
        this._$Ep = void 0;
      }
      const o = this.constructor.elementProperties;
      if (o.size > 0) for (const [n, r] of o) {
        const { wrapped: a } = r, l = this[n];
        a !== !0 || this._$AL.has(n) || l === void 0 || this.C(n, void 0, r, l);
      }
    }
    let e = !1;
    const t = this._$AL;
    try {
      e = this.shouldUpdate(t), e ? (this.willUpdate(t), (i = this._$EO) == null || i.forEach((o) => {
        var n;
        return (n = o.hostUpdate) == null ? void 0 : n.call(o);
      }), this.update(t)) : this._$EM();
    } catch (o) {
      throw e = !1, this._$EM(), o;
    }
    e && this._$AE(t);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    var t;
    (t = this._$EO) == null || t.forEach((i) => {
      var o;
      return (o = i.hostUpdated) == null ? void 0 : o.call(i);
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
re.elementStyles = [], re.shadowRootOptions = { mode: "open" }, re[ue("elementProperties")] = /* @__PURE__ */ new Map(), re[ue("finalized")] = /* @__PURE__ */ new Map(), Te == null || Te({ ReactiveElement: re }), (X.reactiveElementVersions ?? (X.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ge = globalThis, Ue = (s) => s, Se = ge.trustedTypes, qe = Se ? Se.createPolicy("lit-html", { createHTML: (s) => s }) : void 0, Qe = "$lit$", G = `lit$${Math.random().toFixed(9).slice(2)}$`, et = "?" + G, ut = `<${et}>`, ee = document, fe = () => ee.createComment(""), me = (s) => s === null || typeof s != "object" && typeof s != "function", We = Array.isArray, gt = (s) => We(s) || typeof (s == null ? void 0 : s[Symbol.iterator]) == "function", Ee = `[ 	
\f\r]`, he = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Be = /-->/g, Ve = />/g, J = RegExp(`>|${Ee}(?:([^\\s"'>=/]+)(${Ee}*=${Ee}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Ge = /'/g, Ye = /"/g, tt = /^(?:script|style|textarea|title)$/i, st = (s) => (e, ...t) => ({ _$litType$: s, strings: e, values: t }), x = st(1), D = st(2), ne = Symbol.for("lit-noChange"), z = Symbol.for("lit-nothing"), Xe = /* @__PURE__ */ new WeakMap(), Z = ee.createTreeWalker(ee, 129);
function it(s, e) {
  if (!We(s) || !s.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return qe !== void 0 ? qe.createHTML(e) : e;
}
const ft = (s, e) => {
  const t = s.length - 1, i = [];
  let o, n = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", r = he;
  for (let a = 0; a < t; a++) {
    const l = s[a];
    let d, h, c = -1, g = 0;
    for (; g < l.length && (r.lastIndex = g, h = r.exec(l), h !== null); ) g = r.lastIndex, r === he ? h[1] === "!--" ? r = Be : h[1] !== void 0 ? r = Ve : h[2] !== void 0 ? (tt.test(h[2]) && (o = RegExp("</" + h[2], "g")), r = J) : h[3] !== void 0 && (r = J) : r === J ? h[0] === ">" ? (r = o ?? he, c = -1) : h[1] === void 0 ? c = -2 : (c = r.lastIndex - h[2].length, d = h[1], r = h[3] === void 0 ? J : h[3] === '"' ? Ye : Ge) : r === Ye || r === Ge ? r = J : r === Be || r === Ve ? r = he : (r = J, o = void 0);
    const p = r === J && s[a + 1].startsWith("/>") ? " " : "";
    n += r === he ? l + ut : c >= 0 ? (i.push(d), l.slice(0, c) + Qe + l.slice(c) + G + p) : l + G + (c === -2 ? a : p);
  }
  return [it(s, n + (s[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), i];
};
class be {
  constructor({ strings: e, _$litType$: t }, i) {
    let o;
    this.parts = [];
    let n = 0, r = 0;
    const a = e.length - 1, l = this.parts, [d, h] = ft(e, t);
    if (this.el = be.createElement(d, i), Z.currentNode = this.el.content, t === 2 || t === 3) {
      const c = this.el.content.firstChild;
      c.replaceWith(...c.childNodes);
    }
    for (; (o = Z.nextNode()) !== null && l.length < a; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const c of o.getAttributeNames()) if (c.endsWith(Qe)) {
          const g = h[r++], p = o.getAttribute(c).split(G), u = /([.?@])?(.*)/.exec(g);
          l.push({ type: 1, index: n, name: u[2], strings: p, ctor: u[1] === "." ? bt : u[1] === "?" ? xt : u[1] === "@" ? vt : Me }), o.removeAttribute(c);
        } else c.startsWith(G) && (l.push({ type: 6, index: n }), o.removeAttribute(c));
        if (tt.test(o.tagName)) {
          const c = o.textContent.split(G), g = c.length - 1;
          if (g > 0) {
            o.textContent = Se ? Se.emptyScript : "";
            for (let p = 0; p < g; p++) o.append(c[p], fe()), Z.nextNode(), l.push({ type: 2, index: ++n });
            o.append(c[g], fe());
          }
        }
      } else if (o.nodeType === 8) if (o.data === et) l.push({ type: 2, index: n });
      else {
        let c = -1;
        for (; (c = o.data.indexOf(G, c + 1)) !== -1; ) l.push({ type: 7, index: n }), c += G.length - 1;
      }
      n++;
    }
  }
  static createElement(e, t) {
    const i = ee.createElement("template");
    return i.innerHTML = e, i;
  }
}
function ae(s, e, t = s, i) {
  var r, a;
  if (e === ne) return e;
  let o = i !== void 0 ? (r = t._$Co) == null ? void 0 : r[i] : t._$Cl;
  const n = me(e) ? void 0 : e._$litDirective$;
  return (o == null ? void 0 : o.constructor) !== n && ((a = o == null ? void 0 : o._$AO) == null || a.call(o, !1), n === void 0 ? o = void 0 : (o = new n(s), o._$AT(s, t, i)), i !== void 0 ? (t._$Co ?? (t._$Co = []))[i] = o : t._$Cl = o), o !== void 0 && (e = ae(s, o._$AS(s, e.values), o, i)), e;
}
class mt {
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
    const { el: { content: t }, parts: i } = this._$AD, o = ((e == null ? void 0 : e.creationScope) ?? ee).importNode(t, !0);
    Z.currentNode = o;
    let n = Z.nextNode(), r = 0, a = 0, l = i[0];
    for (; l !== void 0; ) {
      if (r === l.index) {
        let d;
        l.type === 2 ? d = new xe(n, n.nextSibling, this, e) : l.type === 1 ? d = new l.ctor(n, l.name, l.strings, this, e) : l.type === 6 && (d = new yt(n, this, e)), this._$AV.push(d), l = i[++a];
      }
      r !== (l == null ? void 0 : l.index) && (n = Z.nextNode(), r++);
    }
    return Z.currentNode = ee, o;
  }
  p(e) {
    let t = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(e, i, t), t += i.strings.length - 2) : i._$AI(e[t])), t++;
  }
}
class xe {
  get _$AU() {
    var e;
    return ((e = this._$AM) == null ? void 0 : e._$AU) ?? this._$Cv;
  }
  constructor(e, t, i, o) {
    this.type = 2, this._$AH = z, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = i, this.options = o, this._$Cv = (o == null ? void 0 : o.isConnected) ?? !0;
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
    e = ae(this, e, t), me(e) ? e === z || e == null || e === "" ? (this._$AH !== z && this._$AR(), this._$AH = z) : e !== this._$AH && e !== ne && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : gt(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== z && me(this._$AH) ? this._$AA.nextSibling.data = e : this.T(ee.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var n;
    const { values: t, _$litType$: i } = e, o = typeof i == "number" ? this._$AC(e) : (i.el === void 0 && (i.el = be.createElement(it(i.h, i.h[0]), this.options)), i);
    if (((n = this._$AH) == null ? void 0 : n._$AD) === o) this._$AH.p(t);
    else {
      const r = new mt(o, this), a = r.u(this.options);
      r.p(t), this.T(a), this._$AH = r;
    }
  }
  _$AC(e) {
    let t = Xe.get(e.strings);
    return t === void 0 && Xe.set(e.strings, t = new be(e)), t;
  }
  k(e) {
    We(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let i, o = 0;
    for (const n of e) o === t.length ? t.push(i = new xe(this.O(fe()), this.O(fe()), this, this.options)) : i = t[o], i._$AI(n), o++;
    o < t.length && (this._$AR(i && i._$AB.nextSibling, o), t.length = o);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    var i;
    for ((i = this._$AP) == null ? void 0 : i.call(this, !1, !0, t); e !== this._$AB; ) {
      const o = Ue(e).nextSibling;
      Ue(e).remove(), e = o;
    }
  }
  setConnected(e) {
    var t;
    this._$AM === void 0 && (this._$Cv = e, (t = this._$AP) == null || t.call(this, e));
  }
}
class Me {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, t, i, o, n) {
    this.type = 1, this._$AH = z, this._$AN = void 0, this.element = e, this.name = t, this._$AM = o, this.options = n, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = z;
  }
  _$AI(e, t = this, i, o) {
    const n = this.strings;
    let r = !1;
    if (n === void 0) e = ae(this, e, t, 0), r = !me(e) || e !== this._$AH && e !== ne, r && (this._$AH = e);
    else {
      const a = e;
      let l, d;
      for (e = n[0], l = 0; l < n.length - 1; l++) d = ae(this, a[i + l], t, l), d === ne && (d = this._$AH[l]), r || (r = !me(d) || d !== this._$AH[l]), d === z ? e = z : e !== z && (e += (d ?? "") + n[l + 1]), this._$AH[l] = d;
    }
    r && !o && this.j(e);
  }
  j(e) {
    e === z ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class bt extends Me {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === z ? void 0 : e;
  }
}
class xt extends Me {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== z);
  }
}
class vt extends Me {
  constructor(e, t, i, o, n) {
    super(e, t, i, o, n), this.type = 5;
  }
  _$AI(e, t = this) {
    if ((e = ae(this, e, t, 0) ?? z) === ne) return;
    const i = this._$AH, o = e === z && i !== z || e.capture !== i.capture || e.once !== i.once || e.passive !== i.passive, n = e !== z && (i === z || o);
    o && this.element.removeEventListener(this.name, this, i), n && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var t;
    typeof this._$AH == "function" ? this._$AH.call(((t = this.options) == null ? void 0 : t.host) ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class yt {
  constructor(e, t, i) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    ae(this, e);
  }
}
const je = ge.litHtmlPolyfillSupport;
je == null || je(be, xe), (ge.litHtmlVersions ?? (ge.litHtmlVersions = [])).push("3.3.3");
const wt = (s, e, t) => {
  const i = (t == null ? void 0 : t.renderBefore) ?? e;
  let o = i._$litPart$;
  if (o === void 0) {
    const n = (t == null ? void 0 : t.renderBefore) ?? null;
    i._$litPart$ = o = new xe(e.insertBefore(fe(), n), n, void 0, t ?? {});
  }
  return o._$AI(s), o;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Q = globalThis;
class F extends re {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = wt(t, this.renderRoot, this.renderOptions);
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
    return ne;
  }
}
var Je;
F._$litElement$ = !0, F.finalized = !0, (Je = Q.litElementHydrateSupport) == null || Je.call(Q, { LitElement: F });
const Ae = Q.litElementPolyfillSupport;
Ae == null || Ae({ LitElement: F });
(Q.litElementVersions ?? (Q.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const U = (s) => (e, t) => {
  t !== void 0 ? t.addInitializer(() => {
    customElements.define(s, e);
  }) : customElements.define(s, e);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const $t = { attribute: !0, type: String, converter: ke, reflect: !1, hasChanged: Oe }, kt = (s = $t, e, t) => {
  const { kind: i, metadata: o } = t;
  let n = globalThis.litPropertyMetadata.get(o);
  if (n === void 0 && globalThis.litPropertyMetadata.set(o, n = /* @__PURE__ */ new Map()), i === "setter" && ((s = Object.create(s)).wrapped = !0), n.set(t.name, s), i === "accessor") {
    const { name: r } = t;
    return { set(a) {
      const l = e.get.call(this);
      e.set.call(this, a), this.requestUpdate(r, l, s, !0, a);
    }, init(a) {
      return a !== void 0 && this.C(r, void 0, s, a), a;
    } };
  }
  if (i === "setter") {
    const { name: r } = t;
    return function(a) {
      const l = this[r];
      e.call(this, a), this.requestUpdate(r, l, s, !0, a);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function _(s) {
  return (e, t) => typeof t == "object" ? kt(s, e, t) : ((i, o, n) => {
    const r = o.hasOwnProperty(n);
    return o.constructor.createProperty(n, i), r ? Object.getOwnPropertyDescriptor(o, n) : void 0;
  })(s, e, t);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function f(s) {
  return _({ ...s, state: !0, attribute: !1 });
}
const St = L`
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
class m {
  /**
   * Snaps a world point (in meters) to grid, existing vertices, and angle guides.
   */
  static snapPoint(e, t, i = [], o, n = 0.25) {
    let r = { ...e };
    if (t.snapToElements && i.length > 0) {
      let d = n, h = null;
      for (const c of i)
        for (const g of [c.start, c.end]) {
          const p = this.distance(e, g);
          p < d && (d = p, h = g);
        }
      if (h)
        return {
          point: { x: h.x, y: h.y },
          snappedTo: "vertex"
        };
    }
    let a = !1, l;
    if (t.snapToAngles && o) {
      const d = e.x - o.x, h = e.y - o.y, c = Math.sqrt(d * d + h * h);
      if (c > 0.05) {
        let p = Math.atan2(h, d) * 180 / Math.PI;
        p < 0 && (p += 360);
        const u = 45, b = Math.round(p / u) * u;
        if (Math.abs(p - b) <= 6) {
          const $ = b * Math.PI / 180;
          r = {
            x: o.x + c * Math.cos($),
            y: o.y + c * Math.sin($)
          }, a = !0, l = b;
        }
      }
    }
    if (t.snapToGrid && !a) {
      const d = t.size || 0.5;
      return r = {
        x: Math.round(r.x / d) * d,
        y: Math.round(r.y / d) * d
      }, { point: r, snappedTo: "grid" };
    } else if (a)
      return { point: r, snappedTo: "angle", guideAngle: l };
    return { point: e, snappedTo: "none" };
  }
  /**
   * Snaps a point to the nearest wall centerline for placing doors and windows
   */
  static snapPointToWall(e, t, i = 0.6) {
    let o = null, n = i;
    for (const r of t) {
      const a = r.end.x - r.start.x, l = r.end.y - r.start.y, d = Math.sqrt(a * a + l * l);
      if (d === 0) continue;
      const h = Math.max(0, Math.min(
        1,
        ((e.x - r.start.x) * a + (e.y - r.start.y) * l) / (d * d)
      )), c = r.start.x + h * a, g = r.start.y + h * l, p = Math.sqrt((e.x - c) ** 2 + (e.y - g) ** 2);
      p < n && (n = p, o = {
        wall: r,
        projectionPoint: { x: c, y: g },
        offset: h * d,
        distance: p,
        angleRad: Math.atan2(l, a)
      });
    }
    return o;
  }
  static distance(e, t) {
    const i = e.x - t.x, o = e.y - t.y;
    return Math.sqrt(i * i + o * o);
  }
  static roundMeters(e, t = 2) {
    const i = Math.pow(10, t);
    return Math.round(e * i) / i;
  }
}
class Y {
  /**
   * Ray-casting algorithm to test if a 2D point is inside a polygon
   */
  static isPointInPolygon(e, t) {
    if (!t || t.length < 3) return !1;
    let i = !1;
    for (let o = 0, n = t.length - 1; o < t.length; n = o++) {
      const r = t[o].x, a = t[o].y, l = t[n].x, d = t[n].y;
      a > e.y != d > e.y && e.x < (l - r) * (e.y - a) / (d - a) + r && (i = !i);
    }
    return i;
  }
  /**
   * Finds the room containing the specified world point (if any)
   */
  static findRoomContainingPoint(e, t) {
    for (const i of t)
      if (this.isPointInPolygon(e, i.polygon))
        return i;
    return null;
  }
  /**
   * Calculates the centroid of a polygon
   */
  static calculateCentroid(e) {
    if (!e || e.length === 0) return { x: 0, y: 0 };
    let t = 0, i = 0;
    for (const o of e)
      t += o.x, i += o.y;
    return {
      x: t / e.length,
      y: i / e.length
    };
  }
  /**
   * Computes the geometric area (in m²) of a polygon using the Shoelace formula
   */
  static computeArea(e) {
    if (!e || e.length < 3) return 0;
    let t = 0;
    for (let i = 0; i < e.length; i++) {
      const o = (i + 1) % e.length;
      t += e[i].x * e[o].y, t -= e[o].x * e[i].y;
    }
    return Math.round(Math.abs(t / 2) * 100) / 100;
  }
}
var Mt = Object.defineProperty, Ct = Object.getOwnPropertyDescriptor, P = (s, e, t, i) => {
  for (var o = i > 1 ? void 0 : i ? Ct(e, t) : e, n = s.length - 1, r; n >= 0; n--)
    (r = s[n]) && (o = (i ? r(e, t, o) : r(o)) || o);
  return i && o && Mt(e, t, o), o;
};
let C = class extends F {
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
    }, this.activeTool = "wall", this.currentWallThickness = 0.2, this.currentOpeningWidth = 0.9, this.is3DMode = !1, this.selectedElements = {
      wallIds: [],
      openingIds: [],
      roomIds: [],
      bindingIds: []
    }, this.isMarqueeSelecting = !1, this.marqueeStart = null, this.marqueeCurrent = null, this.viewport = { x: 300, y: 300, zoom: 1 }, this.isPanning = !1, this.panStart = { x: 0, y: 0 }, this.drawingWallStart = null, this.previewPoint = null, this.snapInfo = { snappedTo: "none" }, this.cursorCoords = { x: 0, y: 0 }, this.wallSnap = null, this.openingFlipSide = !1, this.openingFlipDirection = !1, this.calibrateStart = null, this.calibrateCurrent = null, this.rescaleStart = null, this.rescaleCurrent = null, this._boundKeyDown = null;
  }
  // ==========================================
  // CONVERSIONS DE COORDONNÉES
  // ==========================================
  screenToWorld(s, e) {
    const t = this.getBoundingClientRect(), i = s - t.left, o = e - t.top, n = this.project.pixelsPerMeter * this.viewport.zoom;
    return {
      x: (i - this.viewport.x) / n,
      y: (o - this.viewport.y) / n
    };
  }
  worldToScreen(s) {
    const e = this.project.pixelsPerMeter * this.viewport.zoom;
    return {
      x: s.x * e + this.viewport.x,
      y: s.y * e + this.viewport.y
    };
  }
  // ==========================================
  // GESTION DU PAN & ZOOM
  // ==========================================
  handleWheel(s) {
    s.preventDefault();
    const e = this.getBoundingClientRect(), t = s.clientX - e.left, i = s.clientY - e.top, o = s.deltaY < 0 ? 1.12 : 0.89, n = Math.min(Math.max(this.viewport.zoom * o, 0.15), 8), r = t - (t - this.viewport.x) * (n / this.viewport.zoom), a = i - (i - this.viewport.y) * (n / this.viewport.zoom);
    this.viewport = { x: r, y: a, zoom: n };
  }
  handlePointerDown(s) {
    var t, i, o, n, r, a, l, d;
    if (s.button === 1) {
      this.isPanning = !0, this.panStart = { x: s.clientX - this.viewport.x, y: s.clientY - this.viewport.y }, (i = (t = s.target).setPointerCapture) == null || i.call(t, s.pointerId);
      return;
    }
    if (s.button !== 0) return;
    if (this.activeTool === "select") {
      if (s.shiftKey) {
        const h = this.screenToWorld(s.clientX, s.clientY);
        this.isMarqueeSelecting = !0, this.marqueeStart = h, this.marqueeCurrent = h, (n = (o = s.target).setPointerCapture) == null || n.call(o, s.pointerId);
        return;
      }
      this.selectedElements = { wallIds: [], openingIds: [], roomIds: [], bindingIds: [] }, this.dispatchSelectionChanged(), this.isPanning = !0, this.panStart = { x: s.clientX - this.viewport.x, y: s.clientY - this.viewport.y }, (a = (r = s.target).setPointerCapture) == null || a.call(r, s.pointerId);
      return;
    }
    if (s.shiftKey) {
      this.isPanning = !0, this.panStart = { x: s.clientX - this.viewport.x, y: s.clientY - this.viewport.y }, (d = (l = s.target).setPointerCapture) == null || d.call(l, s.pointerId);
      return;
    }
    const e = this.screenToWorld(s.clientX, s.clientY);
    if (this.activeTool === "wall") {
      const h = m.snapPoint(
        e,
        this.project.grid,
        this.project.walls,
        this.drawingWallStart || void 0
      );
      if (!this.drawingWallStart)
        this.drawingWallStart = h.point;
      else {
        const c = this.drawingWallStart, g = h.point;
        if (m.distance(c, g) >= 0.15) {
          const u = {
            id: `wall_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
            start: { ...c },
            end: { ...g },
            thickness: this.currentWallThickness,
            type: "standard"
          };
          this.project = {
            ...this.project,
            walls: [...this.project.walls, u]
          }, this.dispatchProjectChanged(), this.drawingWallStart = g;
        }
      }
    } else if (this.activeTool === "door" || this.activeTool === "window" || this.activeTool === "french_window") {
      if (this.wallSnap) {
        const h = this.activeTool === "window" ? "window" : this.activeTool === "french_window" ? "french_window" : "door", c = {
          id: `op_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
          wallId: this.wallSnap.wall.id,
          type: h,
          offset: m.roundMeters(this.wallSnap.offset),
          width: this.currentOpeningWidth || (h === "door" ? 0.9 : 1.2),
          flipSide: this.openingFlipSide,
          flipDirection: this.openingFlipDirection
        };
        this.project = {
          ...this.project,
          openings: [...this.project.openings, c]
        }, this.dispatchProjectChanged();
      }
    } else if (this.activeTool === "calibrate") {
      const h = this.getBoundingClientRect(), c = { x: s.clientX - h.left, y: s.clientY - h.top };
      if (!this.calibrateStart)
        this.calibrateStart = c, this.calibrateCurrent = c;
      else {
        const g = c.x - this.calibrateStart.x, p = c.y - this.calibrateStart.y, u = Math.sqrt(g * g + p * p);
        if (u >= 10) {
          const b = u / this.viewport.zoom;
          this.dispatchEvent(new CustomEvent("request-calibration", {
            detail: {
              pixelDistance: b,
              defaultMeters: m.roundMeters(b / this.project.pixelsPerMeter)
            },
            bubbles: !0,
            composed: !0
          })), this.calibrateStart = null, this.calibrateCurrent = null;
        }
      }
    } else if (this.activeTool === "rescale") {
      const h = this.screenToWorld(s.clientX, s.clientY);
      let c = m.snapPoint(
        h,
        this.project.grid,
        this.project.walls,
        this.rescaleStart || void 0
      );
      if (c.snappedTo === "none" && this.project.walls.length > 0) {
        const g = m.snapPointToWall(h, this.project.walls, 0.6);
        g && (c = { point: g.projectionPoint, snappedTo: "vertex" });
      }
      if (!this.rescaleStart)
        this.rescaleStart = c.point, this.rescaleCurrent = c.point;
      else {
        const g = this.rescaleStart, p = c.point, u = m.distance(g, p);
        u >= 0.05 && (this.dispatchEvent(new CustomEvent("request-rescale", {
          detail: {
            measuredMeters: m.roundMeters(u)
          },
          bubbles: !0,
          composed: !0
        })), this.rescaleStart = null, this.rescaleCurrent = null, this.previewPoint = null);
      }
    }
  }
  handlePointerMove(s) {
    if (this.isMarqueeSelecting && this.marqueeStart) {
      this.marqueeCurrent = this.screenToWorld(s.clientX, s.clientY), this.requestUpdate();
      return;
    }
    if (this.isPanning) {
      this.viewport = {
        ...this.viewport,
        x: s.clientX - this.panStart.x,
        y: s.clientY - this.panStart.y
      };
      return;
    }
    const e = this.screenToWorld(s.clientX, s.clientY);
    if (this.cursorCoords = {
      x: m.roundMeters(e.x),
      y: m.roundMeters(e.y)
    }, this.activeTool === "wall") {
      const t = m.snapPoint(
        e,
        this.project.grid,
        this.project.walls,
        this.drawingWallStart || void 0
      );
      this.previewPoint = t.point, this.snapInfo = { snappedTo: t.snappedTo, guideAngle: t.guideAngle }, this.wallSnap = null;
    } else if (this.activeTool === "door" || this.activeTool === "window" || this.activeTool === "french_window")
      this.wallSnap = m.snapPointToWall(e, this.project.walls, 0.8), this.previewPoint = null;
    else if (this.activeTool === "calibrate" && this.calibrateStart) {
      const t = this.getBoundingClientRect();
      this.calibrateCurrent = { x: s.clientX - t.left, y: s.clientY - t.top };
    } else if (this.activeTool === "rescale") {
      let t = m.snapPoint(
        e,
        this.project.grid,
        this.project.walls,
        this.rescaleStart || void 0
      );
      if (t.snappedTo === "none" && this.project.walls.length > 0) {
        const i = m.snapPointToWall(e, this.project.walls, 0.6);
        i && (t = { point: i.projectionPoint, snappedTo: "vertex" });
      }
      this.previewPoint = t.point, this.snapInfo = { snappedTo: t.snappedTo, guideAngle: t.guideAngle }, this.wallSnap = null, this.rescaleStart && (this.rescaleCurrent = t.point);
    } else
      this.previewPoint = null, this.wallSnap = null;
  }
  handlePointerUp(s) {
    var e, t, i, o;
    if (this.isMarqueeSelecting && this.marqueeStart && this.marqueeCurrent) {
      const n = Math.min(this.marqueeStart.x, this.marqueeCurrent.x), r = Math.max(this.marqueeStart.x, this.marqueeCurrent.x), a = Math.min(this.marqueeStart.y, this.marqueeCurrent.y), l = Math.max(this.marqueeStart.y, this.marqueeCurrent.y);
      if (r - n > 0.05 || l - a > 0.05) {
        const d = this.project.walls.filter((p) => {
          const u = (p.start.x + p.end.x) / 2, b = (p.start.y + p.end.y) / 2;
          return u >= n && u <= r && b >= a && b <= l;
        }).map((p) => p.id), h = this.project.openings.filter((p) => {
          const u = this.project.walls.find((y) => y.id === p.wallId);
          if (!u) return !1;
          const b = u.end.x - u.start.x, v = u.end.y - u.start.y, $ = Math.sqrt(b * b + v * v);
          if ($ === 0) return !1;
          const O = u.start.x + p.offset / $ * b, w = u.start.y + p.offset / $ * v;
          return O >= n && O <= r && w >= a && w <= l;
        }).map((p) => p.id), c = this.project.rooms.filter((p) => {
          if (!p.polygon || p.polygon.length < 3) return !1;
          const u = Y.calculateCentroid(p.polygon);
          return u.x >= n && u.x <= r && u.y >= a && u.y <= l;
        }).map((p) => p.id), g = this.project.bindings.filter((p) => p.position.x >= n && p.position.x <= r && p.position.y >= a && p.position.y <= l).map((p) => p.id);
        this.selectedElements = {
          wallIds: Array.from(/* @__PURE__ */ new Set([...this.selectedElements.wallIds, ...d])),
          openingIds: Array.from(/* @__PURE__ */ new Set([...this.selectedElements.openingIds, ...h])),
          roomIds: Array.from(/* @__PURE__ */ new Set([...this.selectedElements.roomIds, ...c])),
          bindingIds: Array.from(/* @__PURE__ */ new Set([...this.selectedElements.bindingIds, ...g]))
        }, this.dispatchSelectionChanged();
      }
      this.isMarqueeSelecting = !1, this.marqueeStart = null, this.marqueeCurrent = null, (t = (e = s.target).releasePointerCapture) == null || t.call(e, s.pointerId);
      return;
    }
    this.isPanning && (this.isPanning = !1, (o = (i = s.target).releasePointerCapture) == null || o.call(i, s.pointerId));
  }
  // ==========================================
  // DRAG & DROP ENTITÉS HOME ASSISTANT
  // ==========================================
  handleDragOver(s) {
    s.preventDefault(), s.dataTransfer && (s.dataTransfer.dropEffect = "copy");
  }
  handleDrop(s) {
    var t, i;
    if (s.preventDefault(), (t = s.dataTransfer) != null && t.files && s.dataTransfer.files.length > 0) {
      const o = s.dataTransfer.files[0];
      if (o.type.startsWith("image/") || o.name.toLowerCase().endsWith(".svg")) {
        const n = new FileReader();
        n.onload = (r) => {
          var l;
          const a = (l = r.target) == null ? void 0 : l.result;
          this.dispatchEvent(new CustomEvent("background-image-loaded", {
            detail: { dataUrl: a },
            bubbles: !0,
            composed: !0
          }));
        }, n.readAsDataURL(o);
        return;
      }
    }
    const e = (i = s.dataTransfer) == null ? void 0 : i.getData("application/json");
    if (e)
      try {
        const { entityId: o, domain: n, name: r, icon: a } = JSON.parse(e), l = this.screenToWorld(s.clientX, s.clientY), d = Y.findRoomContainingPoint(l, this.project.rooms), h = {
          id: `bind_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
          entityId: o,
          position: {
            x: m.roundMeters(l.x),
            y: m.roundMeters(l.y)
          },
          roomId: d == null ? void 0 : d.id,
          icon: a,
          customName: r,
          tapAction: "toggle"
        };
        this.project = {
          ...this.project,
          bindings: [...this.project.bindings, h]
        }, this.dispatchProjectChanged();
      } catch (o) {
        console.error("Erreur lors de la liaison entité HA:", o);
      }
  }
  dispatchSelectionChanged() {
    this.dispatchEvent(new CustomEvent("selection-changed", {
      detail: { selectedElements: this.selectedElements },
      bubbles: !0,
      composed: !0
    })), this.requestUpdate();
  }
  handleWallClick(s, e) {
    if (this.activeTool !== "select") return;
    s.stopPropagation();
    const t = s.shiftKey || s.ctrlKey || s.metaKey, i = this.selectedElements.wallIds.includes(e.id);
    if (t) {
      const o = i ? this.selectedElements.wallIds.filter((n) => n !== e.id) : [...this.selectedElements.wallIds, e.id];
      this.selectedElements = { ...this.selectedElements, wallIds: o };
    } else
      this.selectedElements = { wallIds: [e.id], openingIds: [], roomIds: [], bindingIds: [] };
    this.dispatchSelectionChanged();
  }
  handleOpeningClick(s, e) {
    if (this.activeTool !== "select") return;
    s.stopPropagation();
    const t = s.shiftKey || s.ctrlKey || s.metaKey, i = this.selectedElements.openingIds.includes(e.id);
    if (t) {
      const o = i ? this.selectedElements.openingIds.filter((n) => n !== e.id) : [...this.selectedElements.openingIds, e.id];
      this.selectedElements = { ...this.selectedElements, openingIds: o };
    } else
      this.selectedElements = { wallIds: [], openingIds: [e.id], roomIds: [], bindingIds: [] };
    this.dispatchSelectionChanged();
  }
  renderMarqueeBox() {
    if (!this.isMarqueeSelecting || !this.marqueeStart || !this.marqueeCurrent) return null;
    const s = this.worldToScreen(this.marqueeStart), e = this.worldToScreen(this.marqueeCurrent), t = Math.min(s.x, e.x), i = Math.min(s.y, e.y), o = Math.abs(s.x - e.x), n = Math.abs(s.y - e.y);
    return D`
      <rect 
        class="marquee-selection-box"
        x="${t}" 
        y="${i}" 
        width="${o}" 
        height="${n}" 
      />
    `;
  }
  handleEntityClick(s, e) {
    if (e.stopPropagation(), this.activeTool === "select") {
      const t = e, i = t.shiftKey || t.ctrlKey || t.metaKey, o = this.selectedElements.bindingIds.includes(s.id);
      if (i) {
        const n = o ? this.selectedElements.bindingIds.filter((r) => r !== s.id) : [...this.selectedElements.bindingIds, s.id];
        this.selectedElements = { ...this.selectedElements, bindingIds: n };
      } else
        this.selectedElements = { wallIds: [], openingIds: [], roomIds: [], bindingIds: [s.id] };
      this.dispatchSelectionChanged();
      return;
    }
    if (this.hass && this.hass.callService) {
      const t = s.entityId.split(".")[0];
      this.hass.callService(t, "toggle", { entity_id: s.entityId }).catch(() => {
        this.hass.callService("homeassistant", "toggle", { entity_id: s.entityId });
      });
    } else
      console.log(`[Demo Standalone] Toggle entité: ${s.entityId}`);
  }
  handleEntityDblClick(s, e) {
    e.stopPropagation(), this.dispatchEvent(new CustomEvent("hass-more-info", {
      detail: { entityId: s.entityId },
      bubbles: !0,
      composed: !0
    }));
  }
  handleKeyDown(s) {
    s.key === "Escape" ? (this.drawingWallStart = null, this.previewPoint = null, this.calibrateStart = null, this.calibrateCurrent = null, this.rescaleStart = null, this.rescaleCurrent = null, this.wallSnap = null, this.selectedElements = { wallIds: [], openingIds: [], roomIds: [], bindingIds: [] }, this.dispatchSelectionChanged(), this.requestUpdate()) : s.key === "Delete" || s.key === "Backspace" ? this.selectedElements.wallIds.length + this.selectedElements.openingIds.length + this.selectedElements.roomIds.length + this.selectedElements.bindingIds.length > 0 && (s.preventDefault(), this.dispatchEvent(new CustomEvent("request-delete-selected", {
      bubbles: !0,
      composed: !0
    }))) : s.key === " " || s.key === "Spacebar" ? this.wallSnap && (s.preventDefault(), this.openingFlipSide = !this.openingFlipSide, this.requestUpdate()) : s.key.toLowerCase() === "f" && this.wallSnap && (this.openingFlipDirection = !this.openingFlipDirection, this.requestUpdate());
  }
  connectedCallback() {
    super.connectedCallback(), this._boundKeyDown = this.handleKeyDown.bind(this), window.addEventListener("keydown", this._boundKeyDown);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._boundKeyDown && window.removeEventListener("keydown", this._boundKeyDown);
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
  computeWallPolygon(s, e, t) {
    const i = e.x - s.x, o = e.y - s.y, n = Math.sqrt(i * i + o * o);
    if (n === 0) return [s, s, e, e];
    const r = t / 2, a = -o / n * r, l = i / n * r;
    return [
      { x: s.x + a, y: s.y + l },
      { x: e.x + a, y: e.y + l },
      { x: e.x - a, y: e.y - l },
      { x: s.x - a, y: s.y - l }
    ];
  }
  renderBackgroundLayer() {
    const s = this.project.background;
    if (!s || !s.imageUrl || !s.visible) return null;
    const e = this.worldToScreen(s.offset || { x: 0, y: 0 }), t = s.scale || 1;
    return D`
      <g 
        class="background-image-layer" 
        transform="translate(${e.x}, ${e.y}) scale(${this.viewport.zoom * t})"
        style="opacity: ${s.opacity};"
      >
        <image 
          href="${s.imageUrl}" 
          x="0" 
          y="0" 
          width="${s.widthPx || 1200}" 
          height="${s.heightPx || 900}" 
        />
      </g>
    `;
  }
  pointToSegmentDistance(s, e, t) {
    const i = t.x - e.x, o = t.y - e.y, n = i * i + o * o;
    if (n === 0) return m.distance(s, e);
    let r = ((s.x - e.x) * i + (s.y - e.y) * o) / n;
    r = Math.max(0, Math.min(1, r));
    const a = { x: e.x + r * i, y: e.y + r * o };
    return m.distance(s, a);
  }
  getWallHeight(s) {
    const e = this.project.defaultCeilingHeight || 2.5, t = {
      x: (s.start.x + s.end.x) / 2,
      y: (s.start.y + s.end.y) / 2
    }, i = (this.project.rooms || []).filter((o) => {
      if (!o.polygon || o.polygon.length < 3) return !1;
      if (Y.isPointInPolygon(t, o.polygon)) return !0;
      for (let n = 0; n < o.polygon.length; n++) {
        const r = o.polygon[n], a = o.polygon[(n + 1) % o.polygon.length];
        if (this.pointToSegmentDistance(t, r, a) <= s.thickness / 2 + 0.35)
          return !0;
      }
      return !1;
    });
    if (i.length > 0) {
      const o = i.map((n) => n.height || e);
      return Math.max(...o, s.height || 0);
    }
    return s.height || e;
  }
  handleRoomClick(s, e) {
    if (!(this.drawingWallStart || this.calibrateStart || this.rescaleStart)) {
      if (s.stopPropagation(), this.activeTool === "select") {
        const t = s.shiftKey || s.ctrlKey || s.metaKey, i = this.selectedElements.roomIds.includes(e.id);
        if (t) {
          const o = i ? this.selectedElements.roomIds.filter((n) => n !== e.id) : [...this.selectedElements.roomIds, e.id];
          this.selectedElements = { ...this.selectedElements, roomIds: o };
        } else
          this.selectedElements = { wallIds: [], openingIds: [], roomIds: [e.id], bindingIds: [] };
        this.dispatchSelectionChanged();
        return;
      }
      this.dispatchEvent(new CustomEvent("room-selected", {
        detail: { room: e },
        bubbles: !0,
        composed: !0
      }));
    }
  }
  handleRoomDblClick(s, e) {
    s.stopPropagation(), this.dispatchEvent(new CustomEvent("room-selected", {
      detail: { room: e },
      bubbles: !0,
      composed: !0
    }));
  }
  // Rendu des Pièces avec détection d'illumination si lumière allumée
  renderRooms() {
    return this.project.rooms.map((s) => {
      var l, d;
      if (!s.polygon || s.polygon.length < 3) return null;
      const e = s.polygon.map((h) => this.worldToScreen(h)), t = e.map((h) => `${h.x},${h.y}`).join(" "), i = this.project.bindings.filter((h) => h.roomId === s.id && h.entityId.startsWith("light.")).some((h) => {
        var g, p, u;
        return ((u = (p = (g = this.hass) == null ? void 0 : g.states) == null ? void 0 : p[h.entityId]) == null ? void 0 : u.state) === "on";
      }), o = Y.calculateCentroid(e), n = s.height || this.project.defaultCeilingHeight || 2.5, r = (s.areaM2 * n).toFixed(1), a = (d = (l = this.selectedElements) == null ? void 0 : l.roomIds) == null ? void 0 : d.includes(s.id);
      return D`
        <g 
          class="room-group ${a ? "selected" : ""}" 
          data-room-id="${s.id}" 
          @click=${(h) => this.handleRoomClick(h, s)}
          @dblclick=${(h) => this.handleRoomDblClick(h, s)}
        >
          <polygon 
            points="${t}" 
            class="room-polygon ${i ? "illuminated" : ""}"
            style="fill: ${s.color || "rgba(56, 189, 248, 0.12)"}; cursor: pointer;"
          />
          <g class="room-label-group" transform="translate(${o.x}, ${o.y})">
            <text class="room-label-name" y="${this.is3DMode ? -14 : -6}">${s.name}</text>
            <text class="room-label-area" y="${this.is3DMode ? 4 : 12}">${s.areaM2.toFixed(1)} m²</text>
            ${this.is3DMode ? D`
              <text class="room-label-height" y="20">H: ${n.toFixed(2)}m · ${r} m³</text>
            ` : null}
          </g>
        </g>
      `;
    });
  }
  renderGrid() {
    if (this.is3DMode) return null;
    const s = this.project.pixelsPerMeter * this.viewport.zoom, t = (this.project.grid.size || 0.5) * s;
    if (t < 12) return null;
    const i = t * 2;
    return D`
      <defs>
        <pattern id="grid-sub" width="${t}" height="${t}" patternUnits="userSpaceOnUse"
          patternTransform="translate(${this.viewport.x % t}, ${this.viewport.y % t})">
          <line x1="0" y1="0" x2="${t}" y2="0" stroke="rgba(255,255,255,0.06)" stroke-width="0.5" />
          <line x1="0" y1="0" x2="0" y2="${t}" stroke="rgba(255,255,255,0.06)" stroke-width="0.5" />
        </pattern>
        <pattern id="grid-major" width="${i}" height="${i}" patternUnits="userSpaceOnUse"
          patternTransform="translate(${this.viewport.x % i}, ${this.viewport.y % i})">
          <line x1="0" y1="0" x2="${i}" y2="0" stroke="rgba(255,255,255,0.14)" stroke-width="1" />
          <line x1="0" y1="0" x2="0" y2="${i}" stroke="rgba(255,255,255,0.14)" stroke-width="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid-sub)" />
      <rect width="100%" height="100%" fill="url(#grid-major)" />
    `;
  }
  renderWalls() {
    const s = this.project.pixelsPerMeter * this.viewport.zoom;
    return this.project.walls.map((e) => {
      var g, p;
      const t = (p = (g = this.selectedElements) == null ? void 0 : g.wallIds) == null ? void 0 : p.includes(e.id), i = this.getWallHeight(e), o = this.is3DMode ? i * s * 0.55 : 0, r = this.computeWallPolygon(e.start, e.end, e.thickness).map((u) => this.worldToScreen(u)), a = this.worldToScreen(e.start), l = this.worldToScreen(e.end), d = r.map((u) => `${u.x},${u.y}`).join(" "), h = m.distance(e.start, e.end), c = {
        x: (a.x + l.x) / 2,
        y: (a.y + l.y) / 2
      };
      if (this.is3DMode) {
        const u = r.map((v) => ({ x: v.x, y: v.y - o })), b = u.map((v) => `${v.x},${v.y}`).join(" ");
        return D`
          <g 
            class="wall-element-3d ${t ? "selected" : ""}" 
            data-wall-id="${e.id}"
            @click=${(v) => this.handleWallClick(v, e)}
          >
            <!-- Paroi latérale ombrée 1 -->
            <polygon points="${r[0].x},${r[0].y} ${r[1].x},${r[1].y} ${u[1].x},${u[1].y} ${u[0].x},${u[0].y}" class="wall-3d-side-shaded" />
            <!-- Paroi latérale ombrée 2 -->
            <polygon points="${r[1].x},${r[1].y} ${r[2].x},${r[2].y} ${u[2].x},${u[2].y} ${u[1].x},${u[1].y}" class="wall-3d-side-light" />
            <!-- Chapeau supérieur du mur -->
            <polygon points="${b}" class="wall-3d-top" />
          </g>
        `;
      }
      return D`
        <g 
          class="wall-element ${t ? "selected" : ""}" 
          data-wall-id="${e.id}"
          @click=${(u) => this.handleWallClick(u, e)}
        >
          <polygon points="${d}" class="wall-rect" />
          <line x1="${a.x}" y1="${a.y}" x2="${l.x}" y2="${l.y}" class="wall-centerline" />
          
          ${h >= 0.6 ? D`
            <g class="dimension-badge" transform="translate(${c.x}, ${c.y - 14})">
              <rect x="-26" y="-10" width="52" height="20" />
              <text>${m.roundMeters(h).toFixed(2)} m</text>
            </g>
          ` : null}
        </g>
      `;
    });
  }
  renderOpenings() {
    return this.project.openings.map((s) => {
      var u, b;
      const e = (b = (u = this.selectedElements) == null ? void 0 : u.openingIds) == null ? void 0 : b.includes(s.id), t = this.project.walls.find((v) => v.id === s.wallId);
      if (!t) return null;
      const i = t.end.x - t.start.x, o = t.end.y - t.start.y, n = Math.sqrt(i * i + o * o);
      if (n === 0) return null;
      const a = Math.atan2(o, i) * 180 / Math.PI, l = t.start.x + s.offset / n * i, d = t.start.y + s.offset / n * o, h = this.worldToScreen({ x: l, y: d }), c = this.project.pixelsPerMeter * this.viewport.zoom, g = s.width * c, p = t.thickness * c;
      return D`
        <g 
          class="opening-element ${e ? "selected" : ""}" 
          transform="translate(${h.x}, ${h.y}) rotate(${a})"
          style="cursor: pointer;"
          @click=${(v) => this.handleOpeningClick(v, s)}
        >
          <rect 
            x="${-g / 2}" 
            y="${-p / 2 - 1}" 
            width="${g}" 
            height="${p + 2}" 
            class="wall-cutout"
          />

          ${s.type === "door" ? this.renderDoorSymbol(g, p, s.flipSide, s.flipDirection) : null}
          ${s.type === "window" ? this.renderWindowSymbol(g, p) : null}
          ${s.type === "french_window" ? this.renderFrenchWindowSymbol(g, p) : null}
        </g>
      `;
    });
  }
  renderDoorSymbol(s, e, t, i) {
    const o = s / 2, n = t ? -1 : 1, r = i ? o : -o, a = i ? -1 : 1;
    return D`
      <g>
        <rect x="${-o}" y="${-e / 2}" width="4" height="${e}" fill="#94a3b8" />
        <rect x="${o - 4}" y="${-e / 2}" width="4" height="${e}" fill="#94a3b8" />
        <line 
          x1="${r}" 
          y1="0" 
          x2="${r}" 
          y2="${n * s}" 
          class="opening-door-leaf" 
        />
        <path 
          d="M ${r + a * s} 0 A ${s} ${s} 0 0 ${n > 0 ? i ? 0 : 1 : i ? 1 : 0} ${r} ${n * s}" 
          class="opening-door-arc" 
        />
      </g>
    `;
  }
  renderWindowSymbol(s, e) {
    const t = s / 2;
    return D`
      <g>
        <rect x="${-t}" y="${-e / 2}" width="${s}" height="${e}" fill="none" class="opening-window-frame" />
        <line x1="${-t}" y1="0" x2="${t}" y2="0" class="opening-window-glass" />
        <line x1="${-t + 4}" y1="${-e / 4}" x2="${t - 4}" y2="${-e / 4}" stroke="rgba(56, 189, 248, 0.4)" stroke-width="1" />
        <line x1="${-t + 4}" y1="${e / 4}" x2="${t - 4}" y2="${e / 4}" stroke="rgba(56, 189, 248, 0.4)" stroke-width="1" />
      </g>
    `;
  }
  renderFrenchWindowSymbol(s, e) {
    const t = s / 2;
    return D`
      <g>
        <rect x="${-t}" y="${-e / 2}" width="${s}" height="${e}" fill="none" class="opening-window-frame" />
        <rect x="${-t}" y="${-e / 4}" width="${t}" height="3" fill="#38bdf8" />
        <rect x="0" y="${e / 4}" width="${t}" height="3" fill="#38bdf8" />
      </g>
    `;
  }
  // ==========================================
  // RENDU DES PINS D'ENTITÉS HOME ASSISTANT
  // ==========================================
  renderEntityBindings() {
    return this.project.bindings.map((s) => {
      var d, h, c, g, p;
      const e = this.worldToScreen(s.position), t = (h = (d = this.hass) == null ? void 0 : d.states) == null ? void 0 : h[s.entityId], i = (t == null ? void 0 : t.state) || "off", o = s.entityId.startsWith("light.") && i === "on", n = s.entityId.startsWith("binary_sensor.") && (i === "on" || i === "detected"), r = s.entityId.startsWith("sensor.") || s.entityId.startsWith("climate."), a = ((c = t == null ? void 0 : t.attributes) == null ? void 0 : c.unit_of_measurement) || (r ? "°" : ""), l = (p = (g = this.selectedElements) == null ? void 0 : g.bindingIds) == null ? void 0 : p.includes(s.id);
      return D`
        <g 
          class="entity-pin ${l ? "selected" : ""} ${o ? "active-light" : ""} ${n ? "active-radar" : ""}"
          transform="translate(${e.x}, ${e.y})"
          @click=${(u) => this.handleEntityClick(s, u)}
          @dblclick=${(u) => this.handleEntityDblClick(s, u)}
          title="${s.customName || s.entityId} : ${i} (Clic pour basculer)"
        >
          <!-- Onde radar animée si mouvement détecté -->
          ${n ? D`<circle cx="0" cy="0" r="16" class="radar-pulse-ring" />` : null}

          <!-- Pastille de fond -->
          <circle cx="0" cy="0" r="16" class="entity-pin-bg" />

          <!-- Pictogramme -->
          <text x="0" y="0" class="entity-pin-icon">
            ${s.icon || "⚡"}
          </text>

          <!-- Étiquette Nom -->
          <text x="0" y="27" class="entity-pin-label">
            ${s.customName || s.entityId.split(".")[1]}
          </text>

          <!-- Badge Valeur (Thermostat / Capteur) -->
          ${r && i !== "unknown" ? D`
            <g class="entity-pin-value-badge" transform="translate(14, -14)">
              <rect x="-14" y="-8" width="28" height="16" />
              <text>${i}${a}</text>
            </g>
          ` : null}
        </g>
      `;
    });
  }
  renderOpeningPreview() {
    if (!this.wallSnap) return null;
    const s = this.project.pixelsPerMeter * this.viewport.zoom, e = (this.currentOpeningWidth || 0.9) * s, t = this.wallSnap.wall.thickness * s, i = this.worldToScreen(this.wallSnap.projectionPoint), o = this.wallSnap.angleRad * 180 / Math.PI;
    return D`
      <g 
        class="opening-preview" 
        transform="translate(${i.x}, ${i.y}) rotate(${o})"
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
    ).map((a) => this.worldToScreen(a)), t = this.worldToScreen(this.drawingWallStart), i = this.worldToScreen(this.previewPoint), o = e.map((a) => `${a.x},${a.y}`).join(" "), n = m.distance(this.drawingWallStart, this.previewPoint), r = {
      x: (t.x + i.x) / 2,
      y: (t.y + i.y) / 2
    };
    return D`
      <g class="preview-wall-group">
        <polygon points="${o}" class="preview-wall-rect" />
        <line x1="${t.x}" y1="${t.y}" x2="${i.x}" y2="${i.y}" class="preview-wall-line" />

        ${this.snapInfo.guideAngle !== void 0 ? D`
          <line x1="${t.x}" y1="${t.y}" x2="${i.x}" y2="${i.y}" class="angle-guide-line" />
        ` : null}

        <g class="dimension-badge" transform="translate(${r.x}, ${r.y - 16})">
          <rect x="-30" y="-11" width="60" height="22" />
          <text>${m.roundMeters(n).toFixed(2)} m</text>
        </g>
      </g>
    `;
  }
  renderCalibrationLine() {
    if (!this.calibrateStart || !this.calibrateCurrent) return null;
    const s = this.calibrateStart, e = this.calibrateCurrent, t = e.x - s.x, i = e.y - s.y, o = Math.sqrt(t * t + i * i), n = { x: (s.x + e.x) / 2, y: (s.y + e.y) / 2 };
    return D`
      <g class="calibration-preview-group">
        <line x1="${s.x}" y1="${s.y}" x2="${e.x}" y2="${e.y}" class="calibration-line" />
        <circle cx="${s.x}" cy="${s.y}" r="6" class="calibration-endpoint" />
        <circle cx="${e.x}" cy="${e.y}" r="6" class="calibration-endpoint" />

        <g class="dimension-badge" transform="translate(${n.x}, ${n.y - 18})">
          <rect x="-35" y="-11" width="70" height="22" style="stroke: #f59e0b;" />
          <text style="fill: #f59e0b;">${Math.round(o)} px</text>
        </g>
      </g>
    `;
  }
  renderRescaleLine() {
    if (!this.rescaleStart || !this.rescaleCurrent) return null;
    const s = this.worldToScreen(this.rescaleStart), e = this.worldToScreen(this.rescaleCurrent), t = m.distance(this.rescaleStart, this.rescaleCurrent), i = {
      x: (s.x + e.x) / 2,
      y: (s.y + e.y) / 2
    };
    return D`
      <g class="rescale-preview-group">
        <line 
          x1="${s.x}" y1="${s.y}" 
          x2="${e.x}" y2="${e.y}" 
          stroke="#38bdf8" 
          stroke-width="3" 
          stroke-dasharray="6, 4" 
        />
        <circle cx="${s.x}" cy="${s.y}" r="6" fill="#38bdf8" stroke="#ffffff" stroke-width="2" />
        <circle cx="${e.x}" cy="${e.y}" r="6" fill="#0284c7" stroke="#38bdf8" stroke-width="2" />

        <g class="dimension-badge" transform="translate(${i.x}, ${i.y - 18})">
          <rect x="-48" y="-13" width="96" height="26" rx="6" fill="#0f172a" stroke="#38bdf8" stroke-width="1.8" />
          <text fill="#38bdf8" font-size="12px" font-weight="800" text-anchor="middle" dy="5">
            📐 ${m.roundMeters(t).toFixed(2)} m
          </text>
        </g>
      </g>
    `;
  }
  renderSnapIndicator() {
    if (!this.previewPoint || this.snapInfo.snappedTo === "none") return null;
    const s = this.worldToScreen(this.previewPoint), e = this.snapInfo.snappedTo === "vertex";
    return D`
      <g transform="translate(${s.x}, ${s.y})">
        <circle r="${e ? 7 : 5}" class="snap-indicator" />
        ${e ? D`<circle r="2" fill="#38bdf8" />` : null}
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
    return this.is3DMode ? "Vue 3D Isométrique : Murs extrudés avec éclairage dynamique." : this.activeTool === "select" ? "Mode Sélection : Cliquez sur un élément pour le sélectionner (Shift pour multi-sélection, Shift+glisser pour cadre). Suppr pour effacer." : this.activeTool === "wall" ? this.drawingWallStart ? "Cliquez pour terminer le mur. Échap pour annuler." : "Cliquez pour démarrer un mur." : this.activeTool === "door" ? "Survolez un mur. Espace = inverser intérieur/extérieur. F = gauche/droite." : this.activeTool === "window" || this.activeTool === "french_window" ? "Survolez un mur pour insérer la fenêtre." : this.activeTool === "calibrate" ? this.calibrateStart ? "Cliquez sur la 2ème extrémité du mur mesuré." : "Tracez un segment sur un mur pour étalonner l'échelle." : this.activeTool === "rescale" ? this.rescaleStart ? "Tracez la ligne jusqu'au 2ème point (autre extrémité du mur ou point de référence)." : "Mettre à l'échelle : Sélectionnez un mur ou cliquez sur le 1er point de mesure." : null;
  }
  render() {
    const s = this.getHelpMessage();
    return x`
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
            ${this.renderMarqueeBox()}
          </svg>
        </div>

        ${s ? x`<div class="help-hud">${s}</div>` : null}

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
C.styles = St;
P([
  _({ type: Object })
], C.prototype, "hass", 2);
P([
  _({ type: Object })
], C.prototype, "project", 2);
P([
  _({ type: String })
], C.prototype, "activeTool", 2);
P([
  _({ type: Number })
], C.prototype, "currentWallThickness", 2);
P([
  _({ type: Number })
], C.prototype, "currentOpeningWidth", 2);
P([
  _({ type: Boolean })
], C.prototype, "is3DMode", 2);
P([
  _({ type: Object })
], C.prototype, "selectedElements", 2);
P([
  f()
], C.prototype, "isMarqueeSelecting", 2);
P([
  f()
], C.prototype, "marqueeStart", 2);
P([
  f()
], C.prototype, "marqueeCurrent", 2);
P([
  f()
], C.prototype, "viewport", 2);
P([
  f()
], C.prototype, "isPanning", 2);
P([
  f()
], C.prototype, "drawingWallStart", 2);
P([
  f()
], C.prototype, "previewPoint", 2);
P([
  f()
], C.prototype, "snapInfo", 2);
P([
  f()
], C.prototype, "cursorCoords", 2);
P([
  f()
], C.prototype, "wallSnap", 2);
P([
  f()
], C.prototype, "openingFlipSide", 2);
P([
  f()
], C.prototype, "openingFlipDirection", 2);
P([
  f()
], C.prototype, "calibrateStart", 2);
P([
  f()
], C.prototype, "calibrateCurrent", 2);
P([
  f()
], C.prototype, "rescaleStart", 2);
P([
  f()
], C.prototype, "rescaleCurrent", 2);
C = P([
  U("home-architect-canvas")
], C);
var _t = Object.defineProperty, Pt = Object.getOwnPropertyDescriptor, ce = (s, e, t, i) => {
  for (var o = i > 1 ? void 0 : i ? Pt(e, t) : e, n = s.length - 1, r; n >= 0; n--)
    (r = s[n]) && (o = (i ? r(e, t, o) : r(o)) || o);
  return i && o && _t(e, t, o), o;
};
let K = class extends F {
  constructor() {
    super(...arguments), this.activeTool = "wall", this.canUndo = !1, this.canRedo = !1, this.position = { x: 20, y: 20 }, this.isDragging = !1, this.dragStartPointer = { x: 0, y: 0 }, this.dragStartPosition = { x: 20, y: 20 };
  }
  connectedCallback() {
    super.connectedCallback();
    try {
      const s = localStorage.getItem("home_architect_toolbar_pos");
      if (s) {
        const e = JSON.parse(s);
        typeof e.x == "number" && typeof e.y == "number" && (this.position = e);
      }
    } catch {
    }
    this.updateHostPosition();
  }
  updated(s) {
    super.updated(s), s.has("position") && this.updateHostPosition();
  }
  updateHostPosition() {
    this.style.left = `${this.position.x}px`, this.style.top = `${this.position.y}px`;
  }
  handleDragStart(s) {
    if (s.button !== 0) return;
    s.preventDefault(), s.stopPropagation(), this.isDragging = !0, this.dragStartPointer = { x: s.clientX, y: s.clientY }, this.dragStartPosition = { ...this.position }, s.currentTarget.setPointerCapture(s.pointerId);
  }
  handleDragMove(s) {
    if (!this.isDragging) return;
    s.preventDefault(), s.stopPropagation();
    const e = s.clientX - this.dragStartPointer.x, t = s.clientY - this.dragStartPointer.y, o = (this.parentElement || document.body).getBoundingClientRect(), n = this.getBoundingClientRect(), r = 8, a = Math.max(r, o.width - n.width - 8), l = 8, d = Math.max(l, o.height - n.height - 8), h = Math.min(Math.max(this.dragStartPosition.x + e, r), a), c = Math.min(Math.max(this.dragStartPosition.y + t, l), d);
    this.position = { x: Math.round(h), y: Math.round(c) }, this.updateHostPosition();
  }
  handleDragEnd(s) {
    if (this.isDragging) {
      this.isDragging = !1;
      try {
        s.currentTarget.releasePointerCapture(s.pointerId);
      } catch {
      }
      try {
        localStorage.setItem("home_architect_toolbar_pos", JSON.stringify(this.position));
      } catch {
      }
    }
  }
  selectTool(s) {
    this.dispatchEvent(new CustomEvent("tool-selected", {
      detail: { tool: s },
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
    return x`
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

      <!-- Annuler & Rétablir -->
      <button 
        class="tool-btn" 
        ?disabled=${!this.canUndo}
        @click=${() => this.dispatchEvent(new CustomEvent("undo", { bubbles: !0, composed: !0 }))}
        title="Annuler (Ctrl+Z / Cmd+Z)"
      >
        ↩️
      </button>
      <button 
        class="tool-btn" 
        ?disabled=${!this.canRedo}
        @click=${() => this.dispatchEvent(new CustomEvent("redo", { bubbles: !0, composed: !0 }))}
        title="Rétablir (Ctrl+Y / Cmd+Shift+Z)"
      >
        ↪️
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
K.styles = L`
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

    .tool-btn:disabled {
      opacity: 0.3;
      cursor: not-allowed;
      transform: none !important;
    }

    .divider {
      height: 1px;
      background: rgba(255, 255, 255, 0.1);
      margin: 3px 2px;
    }
  `;
ce([
  _({ type: String })
], K.prototype, "activeTool", 2);
ce([
  _({ type: Boolean })
], K.prototype, "canUndo", 2);
ce([
  _({ type: Boolean })
], K.prototype, "canRedo", 2);
ce([
  f()
], K.prototype, "position", 2);
ce([
  f()
], K.prototype, "isDragging", 2);
K = ce([
  U("home-architect-toolbar")
], K);
var It = Object.defineProperty, Dt = Object.getOwnPropertyDescriptor, B = (s, e, t, i) => {
  for (var o = i > 1 ? void 0 : i ? Dt(e, t) : e, n = s.length - 1, r; n >= 0; n--)
    (r = s[n]) && (o = (i ? r(e, t, o) : r(o)) || o);
  return i && o && It(e, t, o), o;
};
const V = [
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
let H = class extends F {
  constructor() {
    super(...arguments), this.selectedTemplate = V[0], this.width = V[0].widthMeters, this.length = V[0].lengthMeters, this.thickness = V[0].wallThickness, this.addDoor = V[0].addDoor, this.addWindow = V[0].addWindow, this.roomName = V[0].name, this.height = 2.5;
  }
  selectTemplate(s) {
    this.selectedTemplate = s, this.width = s.widthMeters, this.length = s.lengthMeters, this.thickness = s.wallThickness, this.height = s.heightMeters || 2.5, this.addDoor = s.addDoor, this.addWindow = s.addWindow, this.roomName = s.name;
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
    const s = (this.width * this.length).toFixed(1);
    return x`
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
          ${V.map((e) => x`
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
            <span class="surface-badge">${s} m²</span>
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
H.styles = L`
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
B([
  f()
], H.prototype, "selectedTemplate", 2);
B([
  f()
], H.prototype, "width", 2);
B([
  f()
], H.prototype, "length", 2);
B([
  f()
], H.prototype, "thickness", 2);
B([
  f()
], H.prototype, "addDoor", 2);
B([
  f()
], H.prototype, "addWindow", 2);
B([
  f()
], H.prototype, "roomName", 2);
B([
  f()
], H.prototype, "height", 2);
H = B([
  U("home-architect-wizard-modal")
], H);
var Tt = Object.defineProperty, Et = Object.getOwnPropertyDescriptor, Ce = (s, e, t, i) => {
  for (var o = i > 1 ? void 0 : i ? Et(e, t) : e, n = s.length - 1, r; n >= 0; n--)
    (r = s[n]) && (o = (i ? r(e, t, o) : r(o)) || o);
  return i && o && Tt(e, t, o), o;
};
let le = class extends F {
  constructor() {
    super(...arguments), this.pixelDistance = 200, this.defaultMeters = 4, this.realMeters = 4;
  }
  firstUpdated() {
    this.realMeters = this.defaultMeters;
  }
  handleApply() {
    if (this.realMeters <= 0.05) return;
    const s = this.pixelDistance / this.realMeters;
    this.dispatchEvent(new CustomEvent("calibrate-confirmed", {
      detail: {
        realMeters: this.realMeters,
        pixelDistance: this.pixelDistance,
        pixelsPerMeter: s
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
    const s = (this.pixelDistance / (this.realMeters || 1)).toFixed(1);
    return x`
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
            Distance tracée à l'écran : ${Math.round(this.pixelDistance)} px | Échelle résultante : ${s} px/m
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
le.styles = L`
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
Ce([
  _({ type: Number })
], le.prototype, "pixelDistance", 2);
Ce([
  _({ type: Number })
], le.prototype, "defaultMeters", 2);
Ce([
  f()
], le.prototype, "realMeters", 2);
le = Ce([
  U("home-architect-calibrate-modal")
], le);
var jt = Object.defineProperty, At = Object.getOwnPropertyDescriptor, ve = (s, e, t, i) => {
  for (var o = i > 1 ? void 0 : i ? At(e, t) : e, n = s.length - 1, r; n >= 0; n--)
    (r = s[n]) && (o = (i ? r(e, t, o) : r(o)) || o);
  return i && o && jt(e, t, o), o;
};
const Ke = {
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
let te = class extends F {
  constructor() {
    super(...arguments), this.collapsed = !1, this.searchQuery = "", this.activeCategory = "all";
  }
  getEntities() {
    var s;
    return (s = this.hass) != null && s.states ? Object.values(this.hass.states).map((e) => {
      var o, n;
      const t = e.entity_id.split(".")[0], i = Ke[t] || Ke.default;
      return {
        entity_id: e.entity_id,
        name: ((o = e.attributes) == null ? void 0 : o.friendly_name) || e.entity_id,
        state: e.state,
        domain: t,
        icon: i,
        unit: (n = e.attributes) == null ? void 0 : n.unit_of_measurement
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
  handleDragStart(s, e) {
    s.dataTransfer && (s.dataTransfer.setData("application/json", JSON.stringify({
      entityId: e.entity_id,
      domain: e.domain,
      name: e.name,
      icon: e.icon
    })), s.dataTransfer.effectAllowed = "copy");
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
    if (this.activeCategory !== "all" && (e = e.filter((t) => t.domain === this.activeCategory)), this.searchQuery.trim()) {
      const t = this.searchQuery.toLowerCase();
      e = e.filter((i) => i.name.toLowerCase().includes(t) || i.entity_id.toLowerCase().includes(t));
    }
    return x`
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
            @input=${(t) => this.searchQuery = t.target.value}
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
        ${e.length === 0 ? x`
          <div class="empty-message">Aucune entité trouvée</div>
        ` : e.map((t) => x`
          <div 
            class="entity-card" 
            draggable="true"
            @dragstart=${(i) => this.handleDragStart(i, t)}
            title="Glissez et déposez sur une pièce du plan"
          >
            <div class="entity-info">
              <span class="entity-icon">${t.icon}</span>
              <div class="entity-details">
                <span class="entity-name">${t.name}</span>
                <span class="entity-id">${t.entity_id}</span>
              </div>
            </div>

            <span class="entity-state-badge ${t.state === "on" ? "state-on" : "state-off"}">
              ${t.state}${t.unit ? " " + t.unit : ""}
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
te.styles = L`
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
ve([
  _({ type: Object })
], te.prototype, "hass", 2);
ve([
  _({ type: Boolean, reflect: !0 })
], te.prototype, "collapsed", 2);
ve([
  f()
], te.prototype, "searchQuery", 2);
ve([
  f()
], te.prototype, "activeCategory", 2);
te = ve([
  U("home-architect-entity-drawer")
], te);
var zt = Object.defineProperty, Rt = Object.getOwnPropertyDescriptor, ye = (s, e, t, i) => {
  for (var o = i > 1 ? void 0 : i ? Rt(e, t) : e, n = s.length - 1, r; n >= 0; n--)
    (r = s[n]) && (o = (i ? r(e, t, o) : r(o)) || o);
  return i && o && zt(e, t, o), o;
};
const Ot = [
  { name: "Bleu ciel", color: "rgba(56, 189, 248, 0.18)" },
  { name: "Violet moderne", color: "rgba(168, 85, 247, 0.18)" },
  { name: "Ambre chaleureux", color: "rgba(245, 158, 11, 0.18)" },
  { name: "Émeraude nature", color: "rgba(16, 185, 129, 0.18)" },
  { name: "Indigo profond", color: "rgba(99, 102, 241, 0.18)" },
  { name: "Rose pastel", color: "rgba(244, 63, 94, 0.18)" },
  { name: "Gris ardoise", color: "rgba(148, 163, 184, 0.18)" }
], Wt = [
  { label: "2.10 m (Sous-sol)", val: 2.1 },
  { label: "2.30 m (Combles)", val: 2.3 },
  { label: "2.50 m (Standard)", val: 2.5 },
  { label: "2.70 m (Élevé)", val: 2.7 },
  { label: "3.00 m (Haussmann)", val: 3 },
  { label: "3.50 m (Cathédrale)", val: 3.5 }
];
let se = class extends F {
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
    const s = (this.room.areaM2 * this.height).toFixed(1);
    return x`
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
              ${Wt.map((e) => x`
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
              <span class="metric-val">${s} m³</span>
            </div>
          </div>

          <!-- Couleur de sol -->
          <div class="form-group">
            <label class="form-label">Couleur d'ambiance du sol :</label>
            <div class="colors-row">
              ${Ot.map((e) => x`
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
se.styles = L`
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
ye([
  _({ type: Object })
], se.prototype, "room", 2);
ye([
  f()
], se.prototype, "name", 2);
ye([
  f()
], se.prototype, "height", 2);
ye([
  f()
], se.prototype, "color", 2);
se = ye([
  U("home-architect-room-modal")
], se);
class N {
  constructor(e = 1, t = 0, i = 0, o = 1, n = 0, r = 0) {
    this.a = e, this.b = t, this.c = i, this.d = o, this.e = n, this.f = r;
  }
  static identity() {
    return new N(1, 0, 0, 1, 0, 0);
  }
  multiply(e) {
    return new N(
      this.a * e.a + this.c * e.b,
      this.b * e.a + this.d * e.b,
      this.a * e.c + this.c * e.d,
      this.b * e.c + this.d * e.d,
      this.a * e.e + this.c * e.f + this.e,
      this.b * e.e + this.d * e.f + this.f
    );
  }
  translate(e, t) {
    return this.multiply(new N(1, 0, 0, 1, e, t));
  }
  scale(e, t = e) {
    return this.multiply(new N(e, 0, 0, t, 0, 0));
  }
  rotate(e) {
    const t = e * Math.PI / 180, i = Math.cos(t), o = Math.sin(t);
    return this.multiply(new N(i, o, -o, i, 0, 0));
  }
  transformPoint(e) {
    return {
      x: this.a * e.x + this.c * e.y + this.e,
      y: this.b * e.x + this.d * e.y + this.f
    };
  }
  static parseTransform(e) {
    if (!e) return N.identity();
    let t = N.identity();
    const i = /([a-zA-Z]+)\s*\(([^)]+)\)/g;
    let o;
    for (; (o = i.exec(e)) !== null; ) {
      const n = o[1].toLowerCase(), r = o[2].trim().split(/[\s,]+/).map(parseFloat).filter((a) => !isNaN(a));
      n === "matrix" && r.length >= 6 ? t = t.multiply(new N(r[0], r[1], r[2], r[3], r[4], r[5])) : n === "translate" && r.length >= 1 ? t = t.translate(r[0], r[1] || 0) : n === "scale" && r.length >= 1 ? t = t.scale(r[0], r[1] !== void 0 ? r[1] : r[0]) : n === "rotate" && r.length >= 1 && (r.length >= 3 ? t = t.translate(r[1], r[2]).rotate(r[0]).translate(-r[1], -r[2]) : t = t.rotate(r[0]));
    }
    return t;
  }
}
class Ft {
  /**
   * Main entry point to parse and interpret an architectural SVG floor plan
   */
  static parseSvg(e, t = 12, i = 0.2, o = 2.5) {
    try {
      const r = new DOMParser().parseFromString(e, "image/svg+xml"), a = r.querySelector("parsererror");
      if (a)
        return {
          success: !1,
          walls: [],
          openings: [],
          rooms: [],
          viewBox: { x: 0, y: 0, width: 0, height: 0 },
          pixelsPerMeter: 50,
          stats: { wallCount: 0, doorCount: 0, windowCount: 0, roomCount: 0, textLabelCount: 0 },
          error: "Le fichier SVG contient des erreurs XML : " + a.textContent
        };
      const l = r.querySelector("svg");
      if (!l)
        return {
          success: !1,
          walls: [],
          openings: [],
          rooms: [],
          viewBox: { x: 0, y: 0, width: 0, height: 0 },
          pixelsPerMeter: 50,
          stats: { wallCount: 0, doorCount: 0, windowCount: 0, roomCount: 0, textLabelCount: 0 },
          error: "Aucune balise <svg> trouvée dans le document."
        };
      const d = this.extractViewBox(l), h = d.width > 0 ? d.width : 1e3, c = t / h, g = Math.round(h / t * 10) / 10, p = [], u = [], b = [], v = [];
      this.traverseElement(l, N.identity(), {
        segments: p,
        arcs: u,
        textLabels: b,
        polygons: v,
        defaultThickness: i
      });
      const $ = this.convertSegmentsToWalls(
        p,
        d,
        c,
        i,
        o
      ), O = this.detectOpenings(
        u,
        p,
        $,
        d,
        c
      ), w = this.detectRooms(
        v,
        $,
        b,
        d,
        c,
        o
      );
      return {
        success: !0,
        walls: $,
        openings: O,
        rooms: w,
        viewBox: d,
        pixelsPerMeter: g || 50,
        stats: {
          wallCount: $.length,
          doorCount: O.filter((y) => y.type === "door").length,
          windowCount: O.filter((y) => y.type === "window" || y.type === "french_window").length,
          roomCount: w.length,
          textLabelCount: b.length
        }
      };
    } catch (n) {
      return console.error("Erreur lors du parsing SVG:", n), {
        success: !1,
        walls: [],
        openings: [],
        rooms: [],
        viewBox: { x: 0, y: 0, width: 0, height: 0 },
        pixelsPerMeter: 50,
        stats: { wallCount: 0, doorCount: 0, windowCount: 0, roomCount: 0, textLabelCount: 0 },
        error: `Erreur d'interprétation : ${n.message || String(n)}`
      };
    }
  }
  /**
   * Extrait la viewBox ou dimensions de l'élément SVG racine
   */
  static extractViewBox(e) {
    const t = e.getAttribute("viewBox");
    if (t) {
      const r = t.trim().split(/[\s,]+/).map(parseFloat).filter((a) => !isNaN(a));
      if (r.length >= 4 && r[2] > 0 && r[3] > 0)
        return { x: r[0], y: r[1], width: r[2], height: r[3] };
    }
    const i = (r, a) => {
      if (!r) return a;
      const l = parseFloat(r);
      return isNaN(l) ? a : r.includes("mm") ? l * 3.7795 : r.includes("cm") ? l * 37.795 : r.includes("in") ? l * 96 : r.includes("pt") ? l * 1.333 : l;
    }, o = i(e.getAttribute("width"), 1e3), n = i(e.getAttribute("height"), 750);
    return { x: 0, y: 0, width: o, height: n };
  }
  /**
   * Parcours récursif des nœuds de l'arbre SVG
   */
  static traverseElement(e, t, i) {
    var y, T, A;
    const o = e.getAttribute("transform"), n = o ? t.multiply(N.parseTransform(o)) : t, r = e.tagName.toLowerCase(), a = (e.getAttribute("id") || "").toLowerCase(), l = (e.getAttribute("class") || "").toLowerCase(), d = (e.getAttribute("inkscape:label") || "").toLowerCase(), h = (((y = e.closest("g[id]")) == null ? void 0 : y.getAttribute("id")) || "").toLowerCase(), c = (((T = e.parentElement) == null ? void 0 : T.getAttribute("class")) || "").toLowerCase(), g = `${a} ${l} ${d} ${h} ${c}`, p = /door|porte|portillon|swing|battant/.test(g), u = /window|fenetre|vitrage|chassis|baie/.test(g), b = /wall|mur|cloison|facade|envelope|structure|enveloppe/.test(g), v = /room|piece|espace|zone|area|chambre|salon|cuisine|sdb|sejour/.test(g);
    e.getAttribute("stroke-width");
    const $ = e.getAttribute("fill") || "", O = e.getAttribute("display"), w = e.getAttribute("visibility");
    if (!(O === "none" || w === "hidden")) {
      switch (r) {
        case "line": {
          const k = parseFloat(e.getAttribute("x1") || "0"), j = parseFloat(e.getAttribute("y1") || "0"), M = parseFloat(e.getAttribute("x2") || "0"), S = parseFloat(e.getAttribute("y2") || "0"), de = n.transformPoint({ x: k, y: j }), pe = n.transformPoint({ x: M, y: S });
          i.segments.push({
            start: de,
            end: pe,
            thickness: i.defaultThickness,
            isWallHint: b || !p && !u,
            isWindowHint: u,
            isDoorHint: p
          });
          break;
        }
        case "polyline":
        case "polygon": {
          const j = (e.getAttribute("points") || "").trim().split(/[\s,]+/).map(parseFloat).filter((S) => !isNaN(S)), M = [];
          for (let S = 0; S < j.length; S += 2)
            S + 1 < j.length && M.push(n.transformPoint({ x: j[S], y: j[S + 1] }));
          if (M.length >= 2) {
            for (let S = 0; S < M.length - 1; S++)
              i.segments.push({
                start: M[S],
                end: M[S + 1],
                thickness: i.defaultThickness,
                isWallHint: b,
                isWindowHint: u,
                isDoorHint: p
              });
            r === "polygon" && M.length >= 3 && (i.segments.push({
              start: M[M.length - 1],
              end: M[0],
              thickness: i.defaultThickness,
              isWallHint: b,
              isWindowHint: u,
              isDoorHint: p
            }), i.polygons.push({
              points: M,
              isRoomHint: v,
              fill: $
            }));
          }
          break;
        }
        case "rect": {
          const k = parseFloat(e.getAttribute("x") || "0"), j = parseFloat(e.getAttribute("y") || "0"), M = parseFloat(e.getAttribute("width") || "0"), S = parseFloat(e.getAttribute("height") || "0");
          if (M > 0 && S > 0) {
            const de = n.transformPoint({ x: k, y: j }), pe = n.transformPoint({ x: k + M, y: j }), _e = n.transformPoint({ x: k + M, y: j + S }), Pe = n.transformPoint({ x: k, y: j + S });
            if (Math.max(M / S, S / M) >= 3)
              if (M > S) {
                const Ie = n.transformPoint({ x: k, y: j + S / 2 }), De = n.transformPoint({ x: k + M, y: j + S / 2 });
                i.segments.push({
                  start: Ie,
                  end: De,
                  thickness: i.defaultThickness,
                  isWallHint: !0,
                  isWindowHint: u,
                  isDoorHint: p
                });
              } else {
                const Ie = n.transformPoint({ x: k + M / 2, y: j }), De = n.transformPoint({ x: k + M / 2, y: j + S });
                i.segments.push({
                  start: Ie,
                  end: De,
                  thickness: i.defaultThickness,
                  isWallHint: !0,
                  isWindowHint: u,
                  isDoorHint: p
                });
              }
            else
              i.polygons.push({
                points: [de, pe, _e, Pe],
                isRoomHint: v || $ !== "none" && $ !== "#000000" && $ !== "black",
                fill: $
              }), i.segments.push(
                { start: de, end: pe, thickness: i.defaultThickness, isWallHint: b, isWindowHint: u, isDoorHint: p },
                { start: pe, end: _e, thickness: i.defaultThickness, isWallHint: b, isWindowHint: u, isDoorHint: p },
                { start: _e, end: Pe, thickness: i.defaultThickness, isWallHint: b, isWindowHint: u, isDoorHint: p },
                { start: Pe, end: de, thickness: i.defaultThickness, isWallHint: b, isWindowHint: u, isDoorHint: p }
              );
          }
          break;
        }
        case "path": {
          const k = e.getAttribute("d");
          k && this.parsePathData(k, n, i, b, u, p, $);
          break;
        }
        case "text": {
          const k = parseFloat(e.getAttribute("x") || "0"), j = parseFloat(e.getAttribute("y") || "0"), M = ((A = e.textContent) == null ? void 0 : A.trim()) || "";
          if (M.length > 0) {
            const S = n.transformPoint({ x: k, y: j });
            i.textLabels.push({
              text: M,
              position: S
            });
          }
          break;
        }
      }
      for (let k = 0; k < e.children.length; k++)
        this.traverseElement(e.children[k], n, i);
    }
  }
  /**
   * Parse une chaîne de commandes SVG path ('d')
   */
  static parsePathData(e, t, i, o, n, r, a) {
    const l = /([a-df-z])|([-+]?(?:\d*\.\d+|\d+)(?:[eE][-+]?\d+)?)/gi, d = [];
    let h;
    for (; (h = l.exec(e)) !== null; )
      d.push(h[0]);
    let c = { x: 0, y: 0 }, g = { x: 0, y: 0 }, p = [], u = 0, b = "";
    for (; u < d.length; ) {
      const v = d[u];
      /^[a-df-z]$/i.test(v) && (b = v, u++);
      const $ = b === b.toLowerCase(), O = b.toUpperCase();
      switch (O) {
        case "M": {
          const w = parseFloat(d[u++]), y = parseFloat(d[u++]);
          !isNaN(w) && !isNaN(y) && (c = $ ? { x: c.x + w, y: c.y + y } : { x: w, y }, g = { ...c }, p.length >= 3 && i.polygons.push({
            points: p.map((T) => t.transformPoint(T)),
            isRoomHint: o ? !1 : a !== "none" && a !== "",
            fill: a
          }), p = [{ ...c }]);
          break;
        }
        case "L": {
          const w = parseFloat(d[u++]), y = parseFloat(d[u++]);
          if (!isNaN(w) && !isNaN(y)) {
            const T = $ ? { x: c.x + w, y: c.y + y } : { x: w, y }, A = t.transformPoint(c), k = t.transformPoint(T);
            i.segments.push({
              start: A,
              end: k,
              thickness: i.defaultThickness,
              isWallHint: o,
              isWindowHint: n,
              isDoorHint: r
            }), c = T, p.push({ ...c });
          }
          break;
        }
        case "H": {
          const w = parseFloat(d[u++]);
          if (!isNaN(w)) {
            const y = $ ? { x: c.x + w, y: c.y } : { x: w, y: c.y }, T = t.transformPoint(c), A = t.transformPoint(y);
            i.segments.push({
              start: T,
              end: A,
              thickness: i.defaultThickness,
              isWallHint: o,
              isWindowHint: n,
              isDoorHint: r
            }), c = y, p.push({ ...c });
          }
          break;
        }
        case "V": {
          const w = parseFloat(d[u++]);
          if (!isNaN(w)) {
            const y = $ ? { x: c.x, y: c.y + w } : { x: c.x, y: w }, T = t.transformPoint(c), A = t.transformPoint(y);
            i.segments.push({
              start: T,
              end: A,
              thickness: i.defaultThickness,
              isWallHint: o,
              isWindowHint: n,
              isDoorHint: r
            }), c = y, p.push({ ...c });
          }
          break;
        }
        case "A": {
          const w = parseFloat(d[u++]), y = parseFloat(d[u++]);
          parseFloat(d[u++]), parseFloat(d[u++]);
          const T = parseFloat(d[u++]), A = parseFloat(d[u++]), k = parseFloat(d[u++]);
          if (!isNaN(A) && !isNaN(k) && !isNaN(w) && !isNaN(y)) {
            const j = $ ? { x: c.x + A, y: c.y + k } : { x: A, y: k }, M = t.transformPoint(c), S = t.transformPoint(j);
            i.arcs.push({
              start: M,
              end: S,
              rx: w,
              ry: y,
              sweepFlag: T === 1,
              isDoorHint: !0
            }), c = j, p.push({ ...c });
          }
          break;
        }
        case "C":
        case "S":
        case "Q":
        case "T": {
          const w = O === "C" ? 6 : O === "S" || O === "Q" ? 4 : 2, y = [];
          for (let k = 0; k < w; k++) y.push(parseFloat(d[u++]));
          const T = y[y.length - 2], A = y[y.length - 1];
          !isNaN(T) && !isNaN(A) && (c = $ ? { x: c.x + T, y: c.y + A } : { x: T, y: A }, p.push({ ...c }));
          break;
        }
        case "Z": {
          if (p.length >= 2) {
            const w = t.transformPoint(c), y = t.transformPoint(g);
            i.segments.push({
              start: w,
              end: y,
              thickness: i.defaultThickness,
              isWallHint: o,
              isWindowHint: n,
              isDoorHint: r
            });
          }
          p.length >= 3 && i.polygons.push({
            points: p.map((w) => t.transformPoint(w)),
            isRoomHint: o ? !1 : a !== "none" && a !== "",
            fill: a
          }), c = { ...g }, p = [];
          break;
        }
        default:
          u++;
          break;
      }
    }
  }
  /**
   * Transforme et consolide les segments bruts en murs réels en mètres
   */
  static convertSegmentsToWalls(e, t, i, o, n) {
    const r = [];
    for (const a of e) {
      if (a.isDoorHint || a.isWindowHint) continue;
      const l = {
        x: (a.start.x - t.x) * i,
        y: (a.start.y - t.y) * i
      }, d = {
        x: (a.end.x - t.x) * i,
        y: (a.end.y - t.y) * i
      };
      m.distance(l, d) < 0.2 || r.push({
        id: `w_svg_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
        start: { x: m.roundMeters(l.x), y: m.roundMeters(l.y) },
        end: { x: m.roundMeters(d.x), y: m.roundMeters(d.y) },
        thickness: o,
        height: n,
        type: "standard"
      });
    }
    return this.consolidateWalls(r);
  }
  /**
   * Fusionne les segments colinéaires consécutifs et magnétise les extrémités proches
   */
  static consolidateWalls(e) {
    if (e.length === 0) return [];
    let t = [...e];
    for (let n = 0; n < t.length; n++)
      for (let r = n + 1; r < t.length; r++)
        for (const a of [t[n].start, t[n].end])
          for (const l of [t[r].start, t[r].end])
            m.distance(a, l) < 0.12 && (l.x = a.x, l.y = a.y);
    let i = !0, o = 0;
    for (; i && o < 5; ) {
      i = !1, o++;
      for (let n = 0; n < t.length; n++) {
        const r = t[n];
        if (r)
          for (let a = n + 1; a < t.length; a++) {
            const l = t[a];
            if (!l) continue;
            const d = r.end.x - r.start.x, h = r.end.y - r.start.y, c = Math.sqrt(d * d + h * h), g = l.end.x - l.start.x, p = l.end.y - l.start.y, u = Math.sqrt(g * g + p * p);
            if (c === 0 || u === 0) continue;
            const b = (d * g + h * p) / (c * u);
            if (Math.abs(b) > 0.995) {
              if (m.distance(r.end, l.start) < 0.05) {
                r.end = { ...l.end }, t.splice(a, 1), i = !0;
                break;
              } else if (m.distance(r.end, l.end) < 0.05) {
                r.end = { ...l.start }, t.splice(a, 1), i = !0;
                break;
              } else if (m.distance(r.start, l.end) < 0.05) {
                r.start = { ...l.start }, t.splice(a, 1), i = !0;
                break;
              } else if (m.distance(r.start, l.start) < 0.05) {
                r.start = { ...l.end }, t.splice(a, 1), i = !0;
                break;
              }
            }
          }
      }
    }
    return t;
  }
  /**
   * Détecte les portes (depuis les arcs ou segments marqués) et les fenêtres
   */
  static detectOpenings(e, t, i, o, n) {
    const r = [];
    if (i.length === 0) return r;
    for (const a of e) {
      const l = Math.max(a.rx, a.ry) * n;
      if (l < 0.5 || l > 1.4) continue;
      const d = {
        x: (a.start.x - o.x) * n,
        y: (a.start.y - o.y) * n
      }, h = {
        x: (a.end.x - o.x) * n,
        y: (a.end.y - o.y) * n
      }, c = m.snapPointToWall(d, i, 0.75), g = m.snapPointToWall(h, i, 0.75), p = c && (!g || c.distance < g.distance) ? c : g;
      if (p && p.distance < 0.7) {
        const u = m.roundMeters(Math.min(Math.max(l, 0.73), 1.1)), b = m.roundMeters(p.offset);
        r.some(
          ($) => $.wallId === p.wall.id && Math.abs($.offset - b) < 0.35
        ) || r.push({
          id: `op_door_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
          wallId: p.wall.id,
          type: "door",
          offset: b,
          width: u,
          flipSide: !1,
          flipDirection: !1
        });
      }
    }
    for (const a of t) {
      if (!a.isWindowHint && !a.isDoorHint) continue;
      const l = {
        x: (a.start.x - o.x) * n,
        y: (a.start.y - o.y) * n
      }, d = {
        x: (a.end.x - o.x) * n,
        y: (a.end.y - o.y) * n
      }, h = { x: (l.x + d.x) / 2, y: (l.y + d.y) / 2 }, c = m.distance(l, d);
      if (c < 0.4 || c > 3) continue;
      const g = m.snapPointToWall(h, i, 0.6);
      if (g && g.distance < 0.5) {
        const p = a.isDoorHint ? "door" : c > 1.8 ? "french_window" : "window", u = m.roundMeters(g.offset);
        r.some(
          (v) => v.wallId === g.wall.id && Math.abs(v.offset - u) < 0.35
        ) || r.push({
          id: `op_${p}_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
          wallId: g.wall.id,
          type: p,
          offset: u,
          width: m.roundMeters(c),
          flipSide: !1,
          flipDirection: !1
        });
      }
    }
    return r;
  }
  /**
   * Détecte les pièces (Rooms) et associe automatiquement les étiquettes de texte
   */
  static detectRooms(e, t, i, o, n, r) {
    const a = [], l = i.map((d) => ({
      text: d.text,
      position: {
        x: (d.position.x - o.x) * n,
        y: (d.position.y - o.y) * n
      }
    }));
    for (const d of e) {
      if (d.points.length < 3) continue;
      const h = d.points.map((b) => ({
        x: m.roundMeters((b.x - o.x) * n),
        y: m.roundMeters((b.y - o.y) * n)
      })), c = Y.computeArea(h);
      if (c < 1.5 || c > 300) continue;
      let g = "";
      for (const b of l)
        if (Y.isPointInPolygon(b.position, h)) {
          g = b.text;
          break;
        }
      if (!g && !d.isRoomHint) continue;
      const p = g || `Pièce ${a.length + 1}`, u = this.getRoomStyle(p);
      a.push({
        id: `room_svg_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
        name: p,
        polygon: h,
        areaM2: c,
        color: u.color,
        icon: u.icon,
        height: r
      });
    }
    if (a.length === 0 && l.length > 0 && t.length >= 4)
      for (const d of l) {
        const h = d.text.toLowerCase();
        if (/salon|sejour|chambre|cuisine|sdb|bain|wc|bureau|entree|garage|couloir/i.test(h)) {
          const c = d.position.x, g = d.position.y, p = 1.8, u = [
            { x: m.roundMeters(c - p), y: m.roundMeters(g - p) },
            { x: m.roundMeters(c + p), y: m.roundMeters(g - p) },
            { x: m.roundMeters(c + p), y: m.roundMeters(g + p) },
            { x: m.roundMeters(c - p), y: m.roundMeters(g + p) }
          ], b = this.getRoomStyle(d.text);
          a.push({
            id: `room_svg_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
            name: d.text,
            polygon: u,
            areaM2: Y.computeArea(u),
            color: b.color,
            icon: b.icon,
            height: r
          });
        }
      }
    return a;
  }
  /**
   * Associe un nom de pièce à une couleur thématique et une icône MDI
   */
  static getRoomStyle(e) {
    const t = e.toLowerCase();
    return /salon|sejour|living|sam|salle à manger/i.test(t) ? { color: "rgba(59, 130, 246, 0.28)", icon: "mdi:sofa" } : /chambre|bed|suite|parentale/i.test(t) ? { color: "rgba(139, 92, 246, 0.28)", icon: "mdi:bed" } : /cuisine|kitchen/i.test(t) ? { color: "rgba(245, 158, 11, 0.28)", icon: "mdi:silverware-fork-knife" } : /sdb|bain|douche|bath|eau/i.test(t) ? { color: "rgba(6, 182, 212, 0.28)", icon: "mdi:shower" } : /wc|toilet/i.test(t) ? { color: "rgba(16, 185, 129, 0.28)", icon: "mdi:toilet" } : /bureau|office|travail/i.test(t) ? { color: "rgba(99, 102, 241, 0.28)", icon: "mdi:desk" } : /entree|entrée|hall|couloir|degagement|dégagement/i.test(t) ? { color: "rgba(100, 116, 139, 0.28)", icon: "mdi:door" } : /garage|atelier/i.test(t) ? { color: "rgba(120, 113, 108, 0.28)", icon: "mdi:garage" } : /terrasse|balcon|patio/i.test(t) ? { color: "rgba(20, 184, 166, 0.28)", icon: "mdi:balcony" } : { color: "rgba(56, 189, 248, 0.25)", icon: "mdi:home-outline" };
  }
}
var Nt = Object.defineProperty, Ht = Object.getOwnPropertyDescriptor, W = (s, e, t, i) => {
  for (var o = i > 1 ? void 0 : i ? Ht(e, t) : e, n = s.length - 1, r; n >= 0; n--)
    (r = s[n]) && (o = (i ? r(e, t, o) : r(o)) || o);
  return i && o && Nt(e, t, o), o;
};
let R = class extends F {
  constructor() {
    super(...arguments), this.currentLevel = "rdc", this.imageDataUrl = null, this.imageWidth = 0, this.imageHeight = 0, this.imageName = "", this.isSvg = !1, this.svgRawText = null, this.svgInterpretResult = null, this.svgImportMode = "vectorize", this.keepSvgBackground = !0, this.calibrateMode = "auto_dimension", this.totalWidthMeters = 12, this.opacity = 0.4, this.isDragOver = !1, this.fileInputRef = null, this._boundPasteListener = null;
  }
  connectedCallback() {
    super.connectedCallback(), this._boundPasteListener = this.handleModalPaste.bind(this), window.addEventListener("paste", this._boundPasteListener);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._boundPasteListener && window.removeEventListener("paste", this._boundPasteListener);
  }
  handleModalPaste(s) {
    var i;
    if (!s.clipboardData) return;
    const e = s.clipboardData.items;
    for (let o = 0; o < e.length; o++)
      if (e[o].type.indexOf("image") !== -1) {
        const n = e[o].getAsFile();
        if (n) {
          s.preventDefault(), this.processFile(n);
          return;
        }
      }
    const t = (i = s.clipboardData.getData("text/plain")) == null ? void 0 : i.trim();
    if (t && (t.startsWith("<svg") || t.startsWith("<?xml") && t.includes("<svg"))) {
      s.preventDefault(), this.processSvgText(t, "Plan SVG collé depuis le presse-papier");
      return;
    }
  }
  triggerFileInput() {
    if (!this.fileInputRef) {
      const s = document.createElement("input");
      s.type = "file", s.accept = "image/*,.svg", s.style.display = "none", s.addEventListener("change", (e) => {
        var i;
        const t = (i = e.target.files) == null ? void 0 : i[0];
        t && this.processFile(t);
      }), this.fileInputRef = s;
    }
    this.fileInputRef.click();
  }
  processFile(s) {
    if (this.imageName = s.name || "Plan importé", s.type === "image/svg+xml" || s.name.toLowerCase().endsWith(".svg")) {
      const t = new FileReader();
      t.onload = (i) => {
        var n;
        const o = (n = i.target) == null ? void 0 : n.result;
        this.processSvgText(o, s.name);
      }, t.readAsText(s);
    } else {
      this.isSvg = !1, this.svgRawText = null, this.svgInterpretResult = null;
      const t = new FileReader();
      t.onload = (i) => {
        var r;
        const o = (r = i.target) == null ? void 0 : r.result, n = new Image();
        n.onload = () => {
          this.imageDataUrl = o, this.imageWidth = n.naturalWidth, this.imageHeight = n.naturalHeight;
        }, n.src = o;
      }, t.readAsDataURL(s);
    }
  }
  processSvgText(s, e = "Plan SVG importé") {
    this.imageName = e, this.isSvg = !0, this.svgRawText = s, this.computeSvgInterpretation();
    const t = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(s);
    this.imageDataUrl = t;
    const i = new Image();
    i.onload = () => {
      var o, n;
      this.imageWidth = i.naturalWidth || ((o = this.svgInterpretResult) == null ? void 0 : o.viewBox.width) || 1e3, this.imageHeight = i.naturalHeight || ((n = this.svgInterpretResult) == null ? void 0 : n.viewBox.height) || 750;
    }, i.src = t;
  }
  computeSvgInterpretation() {
    this.svgRawText && (this.svgInterpretResult = Ft.parseSvg(
      this.svgRawText,
      this.totalWidthMeters,
      0.2,
      2.5
    ));
  }
  handleDimensionChange(s) {
    this.totalWidthMeters = s > 0 ? s : 10, this.isSvg && this.computeSvgInterpretation();
  }
  handleDrop(s) {
    var e;
    if (s.preventDefault(), this.isDragOver = !1, (e = s.dataTransfer) != null && e.files && s.dataTransfer.files.length > 0) {
      const t = s.dataTransfer.files[0];
      this.processFile(t);
    }
  }
  handleDragOver(s) {
    s.preventDefault(), this.isDragOver = !0;
  }
  handleDragLeave() {
    this.isDragOver = !1;
  }
  async handlePasteButtonClick() {
    try {
      if (navigator.clipboard && navigator.clipboard.readText) {
        const s = await navigator.clipboard.readText();
        if (s && (s.trim().startsWith("<svg") || s.trim().startsWith("<?xml") && s.includes("<svg"))) {
          this.processSvgText(s.trim(), "Plan SVG collé");
          return;
        }
      }
      if (navigator.clipboard && navigator.clipboard.read) {
        const s = await navigator.clipboard.read();
        for (const e of s) {
          const t = e.types.find((i) => i.startsWith("image/"));
          if (t) {
            const i = await e.getType(t), o = new File([i], "clipboard_image.png", { type: t });
            this.processFile(o);
            return;
          }
        }
      }
      alert("Appuyez directement sur Cmd+V ou Ctrl+V pour coller l'image ou le code SVG de votre plan !");
    } catch {
      alert("Appuyez directement sur Cmd+V ou Ctrl+V pour coller votre plan !");
    }
  }
  close() {
    this.dispatchEvent(new CustomEvent("close", { bubbles: !0, composed: !0 }));
  }
  confirmImport() {
    var e, t, i;
    if (!this.imageDataUrl) return;
    const s = this.isSvg && this.svgImportMode === "vectorize" && !!((e = this.svgInterpretResult) != null && e.success);
    this.dispatchEvent(new CustomEvent("import-confirmed", {
      detail: {
        dataUrl: this.imageDataUrl,
        widthPx: this.imageWidth || ((t = this.svgInterpretResult) == null ? void 0 : t.viewBox.width) || 1e3,
        heightPx: this.imageHeight || ((i = this.svgInterpretResult) == null ? void 0 : i.viewBox.height) || 750,
        opacity: this.opacity,
        mode: this.calibrateMode,
        totalWidthMeters: this.totalWidthMeters,
        targetLevel: this.currentLevel,
        isSvgVectorized: s,
        svgInterpretation: s ? this.svgInterpretResult : void 0,
        keepSvgBackground: this.keepSvgBackground
      },
      bubbles: !0,
      composed: !0
    }));
  }
  render() {
    var t, i;
    const s = this.isSvg && this.svgImportMode === "vectorize" && !!((t = this.svgInterpretResult) != null && t.success), e = (i = this.svgInterpretResult) == null ? void 0 : i.stats;
    return x`
      <div class="modal-card">
        <div class="modal-header">
          <div class="modal-title-group">
            <span class="modal-icon">📥</span>
            <div>
              <h3 class="modal-title">Importer & Interpréter un plan</h3>
              <p class="modal-subtitle">Prend en charge SVG (vectoriel intelligent), PNG, JPG, JPEG et WebP</p>
            </div>
          </div>
          <button class="btn-close" @click=${this.close}>✕</button>
        </div>

        <div class="modal-body">
          <!-- Zone de Dépôt ou Aperçu -->
          ${this.imageDataUrl ? x`
            <div class="preview-card">
              <img class="preview-thumb" src="${this.imageDataUrl}" alt="Aperçu du plan" />
              <div class="preview-meta">
                <div class="preview-title">
                  <span>✅</span>
                  <span>${this.imageName || "Plan sélectionné"}</span>
                  ${this.isSvg ? x`<span class="preview-badge-svg">SVG Vectoriel</span>` : null}
                </div>
                <div class="preview-dimensions">
                  Dimensions du plan : ${this.imageWidth} × ${this.imageHeight} px
                </div>
                <button class="btn-change-image" @click=${this.triggerFileInput}>
                  🔄 Remplacer le fichier
                </button>
              </div>
            </div>
          ` : x`
            <div 
              class="drop-zone ${this.isDragOver ? "dragover" : ""}"
              @dragover=${this.handleDragOver}
              @dragleave=${this.handleDragLeave}
              @drop=${this.handleDrop}
              @click=${this.triggerFileInput}
            >
              <span class="drop-icon">📐</span>
              <div class="drop-text">Glissez-déposez votre plan ici</div>
              <div class="drop-subtext">SVG (Vectorisation automatique en murs 3D), PNG, JPG, WebP</div>

              <div class="drop-actions" @click=${(o) => o.stopPropagation()}>
                <button class="btn-action-small" @click=${this.triggerFileInput}>
                  📁 Choisir un fichier
                </button>
                <button class="btn-action-small" @click=${this.handlePasteButtonClick}>
                  📋 Coller (Cmd+V)
                </button>
              </div>
            </div>
          `}

          <!-- Encadré Vectorisation Intelligente SVG si un fichier SVG est chargé -->
          ${this.isSvg ? x`
            <div class="svg-interpret-box">
              <div class="svg-box-header">
                <span class="svg-box-icon">✨</span>
                <div>
                  <div class="svg-box-title">Interprétation Vectorielle Intelligente SVG</div>
                  <div class="svg-box-subtitle">
                    Transformez directement les lignes et courbes de votre SVG en éléments réels
                  </div>
                </div>
              </div>

              <div class="svg-mode-selector">
                <!-- Mode 1 : Convertir en murs, portes, fenêtres et pièces -->
                <div 
                  class="svg-choice-card ${this.svgImportMode === "vectorize" ? "selected" : ""}"
                  @click=${() => this.svgImportMode = "vectorize"}
                >
                  <input 
                    type="radio" 
                    name="svg_mode" 
                    class="svg-choice-radio"
                    .checked=${this.svgImportMode === "vectorize"}
                    @change=${() => this.svgImportMode = "vectorize"}
                  />
                  <div class="svg-choice-content">
                    <div class="svg-choice-title">
                      <span>🧱 Convertir en Murs, Portes, Fenêtres & Pièces 3D</span>
                      <span class="badge-magic">Recommandé</span>
                    </div>
                    <div class="svg-choice-desc">
                      Génère instantanément les murs, baies, ouvertures et pièces prêts pour l'affichage 2D et 3D.
                    </div>

                    ${e ? x`
                      <div class="svg-pills-row">
                        <span class="stat-pill wall">🧱 ${e.wallCount} Murs</span>
                        <span class="stat-pill door">🚪 ${e.doorCount} Portes</span>
                        <span class="stat-pill window">🪟 ${e.windowCount} Fenêtres</span>
                        <span class="stat-pill room">🏠 ${e.roomCount} Pièces</span>
                        ${e.textLabelCount > 0 ? x`
                          <span class="stat-pill label">🏷️ ${e.textLabelCount} Noms</span>
                        ` : null}
                      </div>
                    ` : null}

                    <div class="checkbox-wrap" @click=${(o) => o.stopPropagation()}>
                      <input 
                        type="checkbox" 
                        id="chk_keep_bg"
                        .checked=${this.keepSvgBackground} 
                        @change=${(o) => this.keepSvgBackground = o.target.checked}
                      />
                      <label for="chk_keep_bg" style="cursor: pointer;">
                        Conserver également le tracé SVG original en filigrane sous le plan
                      </label>
                    </div>
                  </div>
                </div>

                <!-- Mode 2 : Calque de fond simple -->
                <div 
                  class="svg-choice-card ${this.svgImportMode === "background_only" ? "selected" : ""}"
                  @click=${() => this.svgImportMode = "background_only"}
                >
                  <input 
                    type="radio" 
                    name="svg_mode" 
                    class="svg-choice-radio"
                    .checked=${this.svgImportMode === "background_only"}
                    @change=${() => this.svgImportMode = "background_only"}
                  />
                  <div class="svg-choice-content">
                    <div class="svg-choice-title">
                      <span>🖼️ Calque de fond simple (Décalque manuel)</span>
                    </div>
                    <div class="svg-choice-desc">
                      Affiche le SVG comme une image en arrière-plan pour tracer les murs manuellement.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ` : null}

          <!-- Étalonnage de l'échelle (Mètres réels) -->
          <div>
            <div class="section-title">
              <span>📏</span>
              <span>Échelle du plan (Mètres réels)</span>
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
                    <span>⚡ Étalonnage par largeur de façade / bâtiment</span>
                    <span class="option-badge">Recommandé</span>
                  </div>
                  <div class="option-desc">
                    Indiquez la largeur totale de la maison ou du bâtiment. Toutes les cotes métriques et les murs seront calculés précisément.
                  </div>

                  ${this.calibrateMode === "auto_dimension" ? x`
                    <div class="input-row" @click=${(o) => o.stopPropagation()}>
                      <label style="font-size: 0.82rem; color: #94a3b8;">Largeur totale estimée :</label>
                      <input 
                        type="number" 
                        step="0.5" 
                        min="1" 
                        max="100" 
                        class="dimension-input"
                        .value=${this.totalWidthMeters}
                        @input=${(o) => this.handleDimensionChange(parseFloat(o.target.value))}
                      />
                      <span class="unit-tag">mètres</span>
                    </div>
                  ` : null}
                </div>
              </div>

              <!-- Option B : Tracé manuel assisté sur un mur (si pas vectorisé) -->
              ${s ? null : x`
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
              `}
            </div>
          </div>

          <!-- Réglage d'opacité du calque si conservé -->
          ${!s || this.keepSvgBackground ? x`
            <div class="slider-row">
              <span class="slider-label">Opacité du fond :</span>
              <input 
                type="range" 
                class="slider-input" 
                min="0.05" 
                max="1.0" 
                step="0.05"
                .value=${this.opacity}
                @input=${(o) => this.opacity = parseFloat(o.target.value)}
              />
              <span class="slider-val">${Math.round(this.opacity * 100)}%</span>
            </div>
          ` : null}
        </div>

        <div class="modal-footer">
          <button class="btn-cancel" @click=${this.close}>Annuler</button>
          <button 
            class="btn-confirm ${s ? "btn-magic" : ""}" 
            ?disabled=${!this.imageDataUrl} 
            @click=${this.confirmImport}
          >
            ${s ? x`
              <span>✨</span>
              <span>Convertir le plan SVG (${(e == null ? void 0 : e.wallCount) || 0} murs)</span>
            ` : x`
              <span>🚀</span>
              <span>Charger le plan</span>
            `}
          </button>
        </div>
      </div>
    `;
  }
};
R.styles = L`
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
      width: 620px;
      max-width: 94vw;
      max-height: 92vh;
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

    /* Aperçu du plan chargé */
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
      object-fit: contain;
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
      flex-wrap: wrap;
    }

    .preview-badge-svg {
      font-size: 0.72rem;
      padding: 2px 7px;
      background: rgba(168, 85, 247, 0.25);
      color: #c084fc;
      border: 1px solid rgba(168, 85, 247, 0.5);
      border-radius: 9999px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
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

    /* Section Vectorisation Intelligente SVG */
    .svg-interpret-box {
      background: linear-gradient(135deg, rgba(88, 28, 135, 0.25) 0%, rgba(30, 58, 138, 0.25) 100%);
      border: 1.5px solid rgba(168, 85, 247, 0.5);
      border-radius: 12px;
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      box-shadow: 0 4px 20px rgba(168, 85, 247, 0.15);
    }

    .svg-box-header {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .svg-box-icon {
      font-size: 1.5rem;
    }

    .svg-box-title {
      font-size: 0.95rem;
      font-weight: 700;
      color: #f3e8ff;
    }

    .svg-box-subtitle {
      font-size: 0.8rem;
      color: #cbd5e1;
      margin-top: 2px;
    }

    .svg-mode-selector {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .svg-choice-card {
      background: rgba(15, 23, 42, 0.6);
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 10px;
      padding: 12px 14px;
      cursor: pointer;
      display: flex;
      gap: 12px;
      align-items: flex-start;
      transition: all 0.2s ease;
    }

    .svg-choice-card:hover {
      border-color: #c084fc;
      background: rgba(15, 23, 42, 0.85);
    }

    .svg-choice-card.selected {
      border-color: #a855f7;
      background: rgba(168, 85, 247, 0.15);
      box-shadow: 0 0 16px rgba(168, 85, 247, 0.25);
    }

    .svg-choice-radio {
      margin-top: 3px;
      accent-color: #a855f7;
    }

    .svg-choice-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .svg-choice-title {
      font-size: 0.9rem;
      font-weight: 700;
      color: #f8fafc;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .badge-magic {
      font-size: 0.7rem;
      padding: 2px 7px;
      background: rgba(168, 85, 247, 0.3);
      color: #e9d5ff;
      border: 1px solid rgba(168, 85, 247, 0.6);
      border-radius: 9999px;
      font-weight: 700;
    }

    .svg-choice-desc {
      font-size: 0.78rem;
      color: #cbd5e1;
      line-height: 1.35;
    }

    .svg-pills-row {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-top: 4px;
    }

    .stat-pill {
      font-size: 0.75rem;
      font-weight: 700;
      padding: 3px 8px;
      border-radius: 6px;
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .stat-pill.wall {
      background: rgba(56, 189, 248, 0.2);
      color: #38bdf8;
      border: 1px solid rgba(56, 189, 248, 0.4);
    }

    .stat-pill.door {
      background: rgba(245, 158, 11, 0.2);
      color: #fbbf24;
      border: 1px solid rgba(245, 158, 11, 0.4);
    }

    .stat-pill.window {
      background: rgba(16, 185, 129, 0.2);
      color: #34d399;
      border: 1px solid rgba(16, 185, 129, 0.4);
    }

    .stat-pill.room {
      background: rgba(168, 85, 247, 0.2);
      color: #c084fc;
      border: 1px solid rgba(168, 85, 247, 0.4);
    }

    .stat-pill.label {
      background: rgba(236, 72, 153, 0.2);
      color: #f472b6;
      border: 1px solid rgba(236, 72, 153, 0.4);
    }

    .checkbox-wrap {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-top: 6px;
      font-size: 0.8rem;
      color: #cbd5e1;
    }

    .checkbox-wrap input {
      accent-color: #a855f7;
      cursor: pointer;
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

    .btn-confirm.btn-magic {
      background: linear-gradient(135deg, #7e22ce 0%, #2563eb 100%);
      border-color: #c084fc;
      box-shadow: 0 0 20px rgba(168, 85, 247, 0.4);
    }

    .btn-confirm:hover:not(:disabled) {
      filter: brightness(1.1);
      box-shadow: 0 0 25px rgba(56, 189, 248, 0.5);
    }

    .btn-confirm:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      box-shadow: none;
    }
  `;
W([
  _({ type: String })
], R.prototype, "currentLevel", 2);
W([
  f()
], R.prototype, "imageDataUrl", 2);
W([
  f()
], R.prototype, "imageWidth", 2);
W([
  f()
], R.prototype, "imageHeight", 2);
W([
  f()
], R.prototype, "imageName", 2);
W([
  f()
], R.prototype, "isSvg", 2);
W([
  f()
], R.prototype, "svgRawText", 2);
W([
  f()
], R.prototype, "svgInterpretResult", 2);
W([
  f()
], R.prototype, "svgImportMode", 2);
W([
  f()
], R.prototype, "keepSvgBackground", 2);
W([
  f()
], R.prototype, "calibrateMode", 2);
W([
  f()
], R.prototype, "totalWidthMeters", 2);
W([
  f()
], R.prototype, "opacity", 2);
W([
  f()
], R.prototype, "isDragOver", 2);
R = W([
  U("home-architect-import-modal")
], R);
var Lt = Object.defineProperty, Ut = Object.getOwnPropertyDescriptor, oe = (s, e, t, i) => {
  for (var o = i > 1 ? void 0 : i ? Ut(e, t) : e, n = s.length - 1, r; n >= 0; n--)
    (r = s[n]) && (o = (i ? r(e, t, o) : r(o)) || o);
  return i && o && Lt(e, t, o), o;
};
let q = class extends F {
  constructor() {
    super(...arguments), this.measuredMeters = 0, this.wallCount = 0, this.roomCount = 0, this.openingCount = 0, this.targetMeters = 0, this.adjustBackground = !0;
  }
  connectedCallback() {
    super.connectedCallback(), this.targetMeters = this.measuredMeters;
  }
  handleInputChange(s) {
    const e = parseFloat(s.target.value);
    this.targetMeters = isNaN(e) ? 0 : e;
  }
  close() {
    this.dispatchEvent(new CustomEvent("close", { bubbles: !0, composed: !0 }));
  }
  confirm() {
    if (this.targetMeters <= 0 || this.measuredMeters <= 0) return;
    const s = this.targetMeters / this.measuredMeters;
    this.dispatchEvent(new CustomEvent("rescale-confirmed", {
      detail: {
        currentMeters: this.measuredMeters,
        targetMeters: this.targetMeters,
        scaleFactor: s,
        adjustBackground: this.adjustBackground
      },
      bubbles: !0,
      composed: !0
    }));
  }
  render() {
    const s = this.measuredMeters > 0 && this.targetMeters > 0 ? this.targetMeters / this.measuredMeters : 1, e = (s - 1) * 100, t = this.targetMeters > 0 && Math.abs(s - 1) > 1e-4;
    return x`
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
            <span class="ratio-pill ${s > 1.001 ? "ratio-expand" : s < 0.999 ? "ratio-shrink" : "ratio-neutral"}">
              × ${s.toFixed(3)} (${e >= 0 ? "+" : ""}${e.toFixed(1)}%)
            </span>
          </div>

          <div class="impact-list">
            <div class="impact-item">
              <span class="impact-icon">🧱</span>
              <span><strong>${this.wallCount} murs</strong> : toutes les longueurs et cotes seront recalculées</span>
            </div>
            ${this.openingCount > 0 ? x`
              <div class="impact-item">
                <span class="impact-icon">🚪</span>
                <span><strong>${this.openingCount} ouvertures</strong> : positions ajustées proportionnellement</span>
              </div>
            ` : null}
            ${this.roomCount > 0 ? x`
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
            ?disabled=${!t} 
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
q.styles = L`
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
oe([
  _({ type: Number })
], q.prototype, "measuredMeters", 2);
oe([
  _({ type: Number })
], q.prototype, "wallCount", 2);
oe([
  _({ type: Number })
], q.prototype, "roomCount", 2);
oe([
  _({ type: Number })
], q.prototype, "openingCount", 2);
oe([
  f()
], q.prototype, "targetMeters", 2);
oe([
  f()
], q.prototype, "adjustBackground", 2);
q = oe([
  U("home-architect-rescale-modal")
], q);
var qt = Object.defineProperty, Bt = Object.getOwnPropertyDescriptor, E = (s, e, t, i) => {
  for (var o = i > 1 ? void 0 : i ? Bt(e, t) : e, n = s.length - 1, r; n >= 0; n--)
    (r = s[n]) && (o = (i ? r(e, t, o) : r(o)) || o);
  return i && o && qt(e, t, o), o;
};
let I = class extends F {
  constructor() {
    super(...arguments), this.narrow = !1, this.activeTool = "wall", this.currentThickness = 0.2, this.currentOpeningWidth = 0.9, this.activeLevel = "rdc", this.is3DMode = !1, this.isDrawerCollapsed = !1, this.isWizardOpen = !1, this.isImportModalOpen = !1, this.isCalibrateModalOpen = !1, this.calibrationData = null, this.isRescaleModalOpen = !1, this.rescaleMeasuredMeters = 0, this.selectedRoomForEdit = null, this.selectedElements = {
      wallIds: [],
      openingIds: [],
      roomIds: [],
      bindingIds: []
    }, this.undoStack = [], this.redoStack = [], this.project = {
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
    }, this.fileInputRef = null, this.toastMessage = null, this.toastTimeout = null, this._boundPaste = null, this._boundKeyDown = null;
  }
  handleToolSelected(s) {
    this.activeTool = s.detail.tool, this.activeTool === "door" ? this.currentOpeningWidth = 0.9 : this.activeTool === "window" ? this.currentOpeningWidth = 1.2 : this.activeTool === "french_window" && (this.currentOpeningWidth = 2);
  }
  handleProjectChanged(s) {
    this.pushUndoSnapshot(), this.project = { ...s.detail.project };
  }
  handleThicknessChange(s) {
    this.currentThickness = parseFloat(s.target.value);
  }
  handleOpeningWidthChange(s) {
    this.currentOpeningWidth = parseFloat(s.target.value);
  }
  handleCreateRoomFromWizard(s) {
    this.pushUndoSnapshot();
    const { name: e, width: t, length: i, thickness: o, height: n, color: r, icon: a, addDoor: l, addWindow: d } = s.detail, h = n || 2.5, c = 2, g = 2, p = { x: c, y: g }, u = { x: c + t, y: g }, b = { x: c + t, y: g + i }, v = { x: c, y: g + i }, $ = {
      id: `w_top_${Date.now()}`,
      start: p,
      end: u,
      thickness: o,
      height: h,
      type: "standard"
    }, O = {
      id: `w_right_${Date.now()}`,
      start: u,
      end: b,
      thickness: o,
      height: h,
      type: "standard"
    }, w = {
      id: `w_bottom_${Date.now()}`,
      start: b,
      end: v,
      thickness: o,
      height: h,
      type: "standard"
    }, y = {
      id: `w_left_${Date.now()}`,
      start: v,
      end: p,
      thickness: o,
      height: h,
      type: "standard"
    }, T = [];
    l && T.push({
      id: `op_door_${Date.now()}`,
      wallId: w.id,
      type: "door",
      offset: t / 2,
      width: 0.9,
      flipSide: !1,
      flipDirection: !1
    }), d && T.push({
      id: `op_win_${Date.now()}`,
      wallId: $.id,
      type: "window",
      offset: t / 2,
      width: 1.2,
      flipSide: !1,
      flipDirection: !1
    });
    const A = {
      id: `room_${Date.now()}`,
      name: e,
      polygon: [p, u, b, v],
      areaM2: t * i,
      color: r,
      icon: a,
      height: h
    };
    this.project = {
      ...this.project,
      walls: [...this.project.walls, $, O, w, y],
      openings: [...this.project.openings, ...T],
      rooms: [...this.project.rooms, A]
    }, this.isWizardOpen = !1, this.activeTool = "select";
  }
  connectedCallback() {
    super.connectedCallback(), this._boundPaste = this.handlePaste.bind(this), window.addEventListener("paste", this._boundPaste), this._boundKeyDown = this.handleKeyDown.bind(this), window.addEventListener("keydown", this._boundKeyDown);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._boundPaste && window.removeEventListener("paste", this._boundPaste), this._boundKeyDown && window.removeEventListener("keydown", this._boundKeyDown), this.toastTimeout && clearTimeout(this.toastTimeout);
  }
  showToast(s) {
    this.toastMessage = s, this.toastTimeout && clearTimeout(this.toastTimeout), this.toastTimeout = setTimeout(() => {
      this.toastMessage = null;
    }, 4500);
  }
  loadBackgroundImage(s, e = "Plan chargé !") {
    const t = new Image();
    t.onload = () => {
      this.pushUndoSnapshot(), this.project = {
        ...this.project,
        background: {
          imageUrl: s,
          opacity: 0.4,
          visible: !0,
          offset: { x: 0, y: 0 },
          scale: 1,
          rotation: 0,
          widthPx: t.naturalWidth,
          heightPx: t.naturalHeight
        }
      }, this.activeTool = "calibrate", this.showToast(`${e} Tracez un segment sur un mur mesuré pour étalonner l'échelle (📏).`);
    }, t.onerror = () => {
      this.showToast("❌ Erreur lors du chargement de l'image.");
    }, t.src = s;
  }
  handleImportConfirmed(s) {
    this.pushUndoSnapshot();
    const {
      dataUrl: e,
      widthPx: t,
      heightPx: i,
      opacity: o,
      mode: n,
      totalWidthMeters: r,
      isSvgVectorized: a,
      svgInterpretation: l,
      keepSvgBackground: d
    } = s.detail;
    if (this.isImportModalOpen = !1, a && l && l.success) {
      const { walls: c, openings: g, rooms: p, pixelsPerMeter: u, stats: b } = l, v = d ? {
        imageUrl: e,
        opacity: o !== void 0 ? o : 0.25,
        visible: !0,
        offset: { x: 0, y: 0 },
        scale: 1,
        rotation: 0,
        widthPx: t,
        heightPx: i
      } : void 0;
      this.project = {
        ...this.project,
        pixelsPerMeter: u || this.project.pixelsPerMeter,
        walls: [...this.project.walls, ...c],
        openings: [...this.project.openings, ...g],
        rooms: [...this.project.rooms, ...p],
        background: v
      }, this.activeTool = "select", this.showToast(
        `✨ Plan SVG converti : ${b.wallCount} mur${b.wallCount > 1 ? "s" : ""}, ${b.doorCount} porte${b.doorCount > 1 ? "s" : ""}, ${b.windowCount} fenêtre${b.windowCount > 1 ? "s" : ""} et ${b.roomCount} pièce${b.roomCount > 1 ? "s" : ""} créés !`
      );
      return;
    }
    let h = this.project.pixelsPerMeter;
    n === "auto_dimension" && r && r > 0 && (h = Math.round(t / r * 10) / 10), this.project = {
      ...this.project,
      pixelsPerMeter: h,
      background: {
        imageUrl: e,
        opacity: o !== void 0 ? o : 0.4,
        visible: !0,
        offset: { x: 0, y: 0 },
        scale: 1,
        rotation: 0,
        widthPx: t,
        heightPx: i
      }
    }, n === "auto_dimension" ? (this.activeTool = "wall", this.showToast(`✅ Plan importé et étalonné automatiquement (1 m = ${h} px) ! Vous pouvez tracer vos murs (🧱).`)) : (this.activeTool = "calibrate", this.showToast("📏 Plan importé ! Tracez un segment sur un mur mesuré pour étalonner l'échelle."));
  }
  handlePaste(s) {
    var i;
    if (this.isImportModalOpen || !s.clipboardData) return;
    const e = s.clipboardData.items;
    for (let o = 0; o < e.length; o++)
      if (e[o].type.indexOf("image") !== -1) {
        const n = e[o].getAsFile();
        if (n) {
          s.preventDefault();
          const r = new FileReader();
          r.onload = (a) => {
            var d;
            const l = (d = a.target) == null ? void 0 : d.result;
            this.loadBackgroundImage(l, "📋 Image collée depuis le presse-papier !");
          }, r.readAsDataURL(n);
          return;
        }
      }
    const t = (i = s.clipboardData.getData("text/plain")) == null ? void 0 : i.trim();
    if (t && (t.startsWith("<svg") || t.startsWith("<?xml") && t.includes("<svg"))) {
      s.preventDefault(), this.isImportModalOpen = !0, this.showToast("📥 Code SVG détecté ! Configurez la vectorisation automatique.");
      return;
    }
    t && (t.startsWith("data:image/") || t.match(/\.(png|jpe?g|svg|webp)(\?.*)?$/i)) && (s.preventDefault(), this.loadBackgroundImage(t, "📋 Image chargée depuis l'URL collée !"));
  }
  triggerFileInput() {
    if (!this.fileInputRef) {
      const s = document.createElement("input");
      s.type = "file", s.accept = "image/*", s.style.display = "none", s.addEventListener("change", (e) => this.handleFileSelected(e)), document.body.appendChild(s), this.fileInputRef = s;
    }
    this.fileInputRef.click();
  }
  handleFileSelected(s) {
    var i;
    const e = (i = s.target.files) == null ? void 0 : i[0];
    if (!e) return;
    const t = new FileReader();
    t.onload = (o) => {
      var r;
      const n = (r = o.target) == null ? void 0 : r.result;
      this.loadBackgroundImage(n, "🖼️ Image importée depuis votre ordinateur !");
    }, t.readAsDataURL(e);
  }
  handleRequestCalibration(s) {
    this.calibrationData = s.detail, this.isCalibrateModalOpen = !0;
  }
  handleCalibrateConfirmed(s) {
    this.pushUndoSnapshot();
    const { pixelsPerMeter: e } = s.detail;
    this.project = {
      ...this.project,
      pixelsPerMeter: Math.round(e * 10) / 10
    }, this.isCalibrateModalOpen = !1, this.calibrationData = null, this.activeTool = "wall";
  }
  handleRequestRescale(s) {
    this.rescaleMeasuredMeters = s.detail.measuredMeters, this.isRescaleModalOpen = !0;
  }
  handleRescaleConfirmed(s) {
    this.pushUndoSnapshot();
    const { currentMeters: e, targetMeters: t, scaleFactor: i, adjustBackground: o } = s.detail;
    if (this.isRescaleModalOpen = !1, i <= 0 || isNaN(i)) return;
    const n = this.project.walls.map((c) => ({
      ...c,
      start: {
        x: m.roundMeters(c.start.x * i),
        y: m.roundMeters(c.start.y * i)
      },
      end: {
        x: m.roundMeters(c.end.x * i),
        y: m.roundMeters(c.end.y * i)
      }
    })), r = this.project.openings.map((c) => ({
      ...c,
      offset: m.roundMeters(c.offset * i),
      width: m.roundMeters(c.width * i)
    })), a = this.project.rooms.map((c) => {
      const g = c.polygon.map((u) => ({
        x: m.roundMeters(u.x * i),
        y: m.roundMeters(u.y * i)
      })), p = Y.computeArea(g);
      return {
        ...c,
        polygon: g,
        areaM2: p || m.roundMeters(c.areaM2 * i * i)
      };
    }), l = this.project.bindings.map((c) => ({
      ...c,
      position: {
        x: m.roundMeters(c.position.x * i),
        y: m.roundMeters(c.position.y * i)
      }
    }));
    let d = this.project.pixelsPerMeter, h = this.project.background ? { ...this.project.background } : void 0;
    o && h && (d = Math.round(this.project.pixelsPerMeter / i * 10) / 10, h.offset && (h = {
      ...h,
      offset: {
        x: m.roundMeters(h.offset.x * i),
        y: m.roundMeters(h.offset.y * i)
      }
    })), this.project = {
      ...this.project,
      pixelsPerMeter: d,
      walls: n,
      openings: r,
      rooms: a,
      bindings: l,
      background: h
    }, this.activeTool = "select", this.showToast(
      `✅ Plan mis à l'échelle (×${i.toFixed(3)}) : ${n.length} murs et ${a.length} pièces recalculés !`
    );
  }
  handleOpacityChange(s) {
    const e = parseFloat(s.target.value);
    this.project.background && (this.project = {
      ...this.project,
      background: { ...this.project.background, opacity: e }
    });
  }
  handleDefaultCeilingChange(s) {
    this.project = {
      ...this.project,
      defaultCeilingHeight: s
    }, this.showToast(`📐 Hauteur plafond 3D par défaut : ${s.toFixed(2)} m`);
  }
  handleSaveRoom(s) {
    this.pushUndoSnapshot();
    const { roomId: e, name: t, height: i, color: o } = s.detail, n = this.project.rooms.map((r) => r.id === e ? { ...r, name: t, height: i, color: o } : r);
    this.project = {
      ...this.project,
      rooms: n
    }, this.selectedRoomForEdit = null, this.showToast(`✨ Pièce "${t}" mise à jour (H: ${i.toFixed(2)} m) !`);
  }
  handleDeleteRoom(s) {
    this.pushUndoSnapshot();
    const { roomId: e } = s.detail;
    this.project = {
      ...this.project,
      rooms: this.project.rooms.filter((t) => t.id !== e)
    }, this.selectedRoomForEdit = null, this.showToast("🗑️ Pièce supprimée");
  }
  pushUndoSnapshot(s) {
    const e = JSON.parse(JSON.stringify(s || this.project));
    this.undoStack = [...this.undoStack.slice(-39), e], this.redoStack = [];
  }
  handleUndo() {
    if (this.undoStack.length === 0) return;
    const s = this.undoStack[this.undoStack.length - 1], e = this.undoStack.slice(0, -1), t = JSON.parse(JSON.stringify(this.project));
    this.redoStack = [...this.redoStack.slice(-39), t], this.undoStack = e, this.project = s, this.selectedElements = { wallIds: [], openingIds: [], roomIds: [], bindingIds: [] }, this.showToast("↩️ Action annulée");
  }
  handleRedo() {
    if (this.redoStack.length === 0) return;
    const s = this.redoStack[this.redoStack.length - 1], e = this.redoStack.slice(0, -1), t = JSON.parse(JSON.stringify(this.project));
    this.undoStack = [...this.undoStack.slice(-39), t], this.redoStack = e, this.project = s, this.selectedElements = { wallIds: [], openingIds: [], roomIds: [], bindingIds: [] }, this.showToast("↪️ Action rétablie");
  }
  handleDeleteSelected() {
    const { wallIds: s, openingIds: e, roomIds: t, bindingIds: i } = this.selectedElements, o = s.length + e.length + t.length + i.length;
    if (o === 0) return;
    this.pushUndoSnapshot();
    const n = this.project.walls.filter((d) => !s.includes(d.id)), r = this.project.openings.filter(
      (d) => !e.includes(d.id) && !s.includes(d.wallId)
    ), a = this.project.rooms.filter((d) => !t.includes(d.id)), l = this.project.bindings.filter((d) => !i.includes(d.id));
    this.project = {
      ...this.project,
      walls: n,
      openings: r,
      rooms: a,
      bindings: l
    }, this.selectedElements = { wallIds: [], openingIds: [], roomIds: [], bindingIds: [] }, this.showToast(`🗑️ ${o} élément${o > 1 ? "s" : ""} supprimé${o > 1 ? "s" : ""} !`);
  }
  clearSelection() {
    this.selectedElements = { wallIds: [], openingIds: [], roomIds: [], bindingIds: [] };
  }
  getSelectedSummary() {
    const s = [];
    return this.selectedElements.wallIds.length > 0 && s.push(`${this.selectedElements.wallIds.length} mur${this.selectedElements.wallIds.length > 1 ? "s" : ""}`), this.selectedElements.openingIds.length > 0 && s.push(`${this.selectedElements.openingIds.length} ouvrant${this.selectedElements.openingIds.length > 1 ? "s" : ""}`), this.selectedElements.roomIds.length > 0 && s.push(`${this.selectedElements.roomIds.length} pièce${this.selectedElements.roomIds.length > 1 ? "s" : ""}`), this.selectedElements.bindingIds.length > 0 && s.push(`${this.selectedElements.bindingIds.length} entité${this.selectedElements.bindingIds.length > 1 ? "s" : ""}`), s.join(", ");
  }
  handleKeyDown(s) {
    var t, i, o;
    const e = (i = (t = s.target) == null ? void 0 : t.tagName) == null ? void 0 : i.toLowerCase();
    e === "input" || e === "textarea" || (o = s.target) != null && o.isContentEditable || ((s.ctrlKey || s.metaKey) && s.key.toLowerCase() === "z" && !s.shiftKey ? (s.preventDefault(), this.handleUndo()) : (s.ctrlKey || s.metaKey) && (s.key.toLowerCase() === "y" || s.key.toLowerCase() === "z" && s.shiftKey) ? (s.preventDefault(), this.handleRedo()) : s.key === "Delete" || s.key === "Backspace" ? this.selectedElements.wallIds.length + this.selectedElements.openingIds.length + this.selectedElements.roomIds.length + this.selectedElements.bindingIds.length > 0 && (s.preventDefault(), this.handleDeleteSelected()) : s.key === "Escape" ? this.clearSelection() : s.key.toLowerCase() === "v" && (this.activeTool = "select"));
  }
  saveProject() {
    this.hass && this.hass.callWS ? this.hass.callWS({
      type: "home_architect/save_project",
      project: this.project
    }).then(() => {
      alert("Plan sauvegardé avec succès dans Home Assistant !");
    }).catch((s) => {
      console.error("Erreur sauvegarde HA:", s), localStorage.setItem(`home_architect_${this.project.id}`, JSON.stringify(this.project)), alert("Sauvegardé localement dans le navigateur.");
    }) : (localStorage.setItem(`home_architect_${this.project.id}`, JSON.stringify(this.project)), alert("Plan sauvegardé localement !"));
  }
  render() {
    var e, t;
    const s = !!((e = this.project.background) != null && e.imageUrl);
    return x`
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
          <!-- Historique Annuler / Rétablir -->
          <div class="control-group" style="padding: 2px 4px; gap: 4px;">
            <button 
              class="btn-history" 
              @click=${this.handleUndo} 
              ?disabled=${this.undoStack.length === 0}
              title="Annuler la dernière action (Ctrl+Z / Cmd+Z)"
            >
              ↩️ Annuler
            </button>
            <button 
              class="btn-history" 
              @click=${this.handleRedo} 
              ?disabled=${this.redoStack.length === 0}
              title="Rétablir l'action (Ctrl+Y / Cmd+Shift+Z)"
            >
              ↪️ Rétablir
            </button>
          </div>

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
          ${this.activeTool === "wall" ? x`
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
          ${this.activeTool === "door" || this.activeTool === "window" || this.activeTool === "french_window" ? x`
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
          ${this.is3DMode ? x`
            <div class="control-group" title="Hauteur sous plafond par défaut (3D)">
              <label>Plafond 3D :</label>
              <select @change=${(i) => this.handleDefaultCeilingChange(parseFloat(i.target.value))}>
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
          ${s ? x`
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
            .canUndo=${this.undoStack.length > 0}
            .canRedo=${this.redoStack.length > 0}
            @undo=${this.handleUndo}
            @redo=${this.handleRedo}
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
            .selectedElements=${this.selectedElements}
            @selection-changed=${(i) => this.selectedElements = i.detail.selectedElements}
            @request-delete-selected=${this.handleDeleteSelected}
            @toggle-3d=${(i) => this.is3DMode = i.detail.is3DMode}
            @room-selected=${(i) => this.selectedRoomForEdit = i.detail.room}
            @project-changed=${this.handleProjectChanged}
            @request-calibration=${this.handleRequestCalibration}
            @request-rescale=${this.handleRequestRescale}
            @background-image-loaded=${(i) => this.loadBackgroundImage(i.detail.dataUrl, "🖼️ Image de plan glissée-déposée !")}
          ></home-architect-canvas>

          <!-- Floating HUD de sélection multi-éléments -->
          ${this.selectedElements.wallIds.length + this.selectedElements.openingIds.length + this.selectedElements.roomIds.length + this.selectedElements.bindingIds.length > 0 ? x`
            <div class="selection-hud">
              <span class="selection-info">
                <span>🎯</span>
                <span>${this.getSelectedSummary()} sélectionné(s)</span>
              </span>
              <button class="btn-delete-selection" @click=${this.handleDeleteSelected} title="Supprimer les éléments sélectionnés (Touche Suppr / Retour)">
                <span>🗑️</span>
                <span>Supprimer</span>
              </button>
              <button class="btn-clear-selection" @click=${this.clearSelection} title="Désélectionner tout (Échap)">
                ✕
              </button>
            </div>
          ` : null}

          <!-- Notification Toast -->
          ${this.toastMessage ? x`
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
      ${this.isImportModalOpen ? x`
        <home-architect-import-modal
          .currentLevel=${this.activeLevel}
          @import-confirmed=${this.handleImportConfirmed}
          @close=${() => this.isImportModalOpen = !1}
        ></home-architect-import-modal>
      ` : null}

      <!-- Modal Assistant Pièce Débutant -->
      ${this.isWizardOpen ? x`
        <home-architect-wizard-modal
          @create-room=${this.handleCreateRoomFromWizard}
          @close=${() => this.isWizardOpen = !1}
        ></home-architect-wizard-modal>
      ` : null}

      <!-- Modal Propriétés de la Pièce (Hauteur sous plafond 3D, etc.) -->
      ${this.selectedRoomForEdit ? x`
        <home-architect-room-modal
          .room=${this.selectedRoomForEdit}
          @save-room=${this.handleSaveRoom}
          @delete-room=${this.handleDeleteRoom}
          @close=${() => this.selectedRoomForEdit = null}
        ></home-architect-room-modal>
      ` : null}

      <!-- Modal Étalonnage Mesure de Mur -->
      ${this.isCalibrateModalOpen && this.calibrationData ? x`
        <home-architect-calibrate-modal
          .pixelDistance=${this.calibrationData.pixelDistance}
          .defaultMeters=${this.calibrationData.defaultMeters}
          @calibrate-confirmed=${this.handleCalibrateConfirmed}
          @close=${() => this.isCalibrateModalOpen = !1}
        ></home-architect-calibrate-modal>
      ` : null}

      <!-- Modal Mettre à l'échelle (Recalcul de toutes les cotes) -->
      ${this.isRescaleModalOpen ? x`
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
I.styles = L`
    :host {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      max-width: 100%;
      max-height: 100%;
      overflow: hidden;
      background: #0f172a;
      color: #f8fafc;
      font-family: var(--ha-font-family, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif);
      position: absolute;
      inset: 0;
      box-sizing: border-box;
    }

    header.top-bar {
      min-height: 56px;
      max-width: 100%;
      background: rgba(30, 41, 59, 0.9);
      backdrop-filter: blur(12px);
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 14px;
      z-index: 30;
      flex-shrink: 0;
      overflow-x: auto;
      overflow-y: hidden;
      scrollbar-width: none;
      box-sizing: border-box;
      gap: 10px;
    }

    header.top-bar::-webkit-scrollbar {
      display: none;
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
      height: calc(100% - 56px);
      min-height: 0;
      min-width: 0;
      overflow: hidden;
      position: relative;
      box-sizing: border-box;
    }

    button.btn-history {
      background: rgba(51, 65, 85, 0.6);
      color: #f1f5f9;
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 8px;
      padding: 6px 10px;
      font-size: 0.84rem;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 5px;
      transition: all 0.15s ease;
      white-space: nowrap;
    }

    button.btn-history:hover:not(:disabled) {
      background: #0284c7;
      border-color: #38bdf8;
      color: #ffffff;
      box-shadow: 0 0 10px rgba(56, 189, 248, 0.35);
    }

    button.btn-history:disabled {
      opacity: 0.35;
      cursor: not-allowed;
    }

    .selection-hud {
      position: absolute;
      top: 16px;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(15, 23, 42, 0.95);
      backdrop-filter: blur(14px);
      border: 1.5px solid #06b6d4;
      border-radius: 12px;
      padding: 8px 16px;
      display: flex;
      align-items: center;
      gap: 12px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6), 0 0 20px rgba(6, 182, 212, 0.35);
      z-index: 60;
      animation: popSelection 0.2s ease-out;
      white-space: nowrap;
    }

    @keyframes popSelection {
      from { opacity: 0; transform: translate(-50%, -10px); }
      to { opacity: 1; transform: translate(-50%, 0); }
    }

    .selection-info {
      font-size: 0.88rem;
      font-weight: 700;
      color: #e2e8f0;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .btn-delete-selection {
      background: #ef4444;
      color: #ffffff;
      border: 1px solid #f87171;
      border-radius: 8px;
      padding: 6px 13px;
      font-size: 0.84rem;
      font-weight: 700;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 5px;
      transition: all 0.15s ease;
      box-shadow: 0 0 10px rgba(239, 68, 68, 0.4);
    }

    .btn-delete-selection:hover {
      background: #dc2626;
      transform: scale(1.03);
    }

    .btn-clear-selection {
      background: transparent;
      color: #94a3b8;
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 8px;
      padding: 6px 10px;
      font-size: 0.84rem;
      cursor: pointer;
      transition: all 0.15s ease;
    }

    .btn-clear-selection:hover {
      color: #ffffff;
      background: rgba(255, 255, 255, 0.1);
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
E([
  _({ type: Object })
], I.prototype, "hass", 2);
E([
  _({ type: Boolean })
], I.prototype, "narrow", 2);
E([
  f()
], I.prototype, "activeTool", 2);
E([
  f()
], I.prototype, "currentThickness", 2);
E([
  f()
], I.prototype, "currentOpeningWidth", 2);
E([
  f()
], I.prototype, "activeLevel", 2);
E([
  f()
], I.prototype, "is3DMode", 2);
E([
  f()
], I.prototype, "isDrawerCollapsed", 2);
E([
  f()
], I.prototype, "isWizardOpen", 2);
E([
  f()
], I.prototype, "isImportModalOpen", 2);
E([
  f()
], I.prototype, "isCalibrateModalOpen", 2);
E([
  f()
], I.prototype, "calibrationData", 2);
E([
  f()
], I.prototype, "isRescaleModalOpen", 2);
E([
  f()
], I.prototype, "rescaleMeasuredMeters", 2);
E([
  f()
], I.prototype, "selectedRoomForEdit", 2);
E([
  f()
], I.prototype, "selectedElements", 2);
E([
  f()
], I.prototype, "undoStack", 2);
E([
  f()
], I.prototype, "redoStack", 2);
E([
  f()
], I.prototype, "project", 2);
E([
  f()
], I.prototype, "toastMessage", 2);
I = E([
  U("home-architect-panel")
], I);
var Vt = Object.defineProperty, Gt = Object.getOwnPropertyDescriptor, we = (s, e, t, i) => {
  for (var o = i > 1 ? void 0 : i ? Gt(e, t) : e, n = s.length - 1, r; n >= 0; n--)
    (r = s[n]) && (o = (i ? r(e, t, o) : r(o)) || o);
  return i && o && Vt(e, t, o), o;
};
let ie = class extends F {
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
  setConfig(s) {
    if (!s) throw new Error("Configuration invalide");
    this.config = s, this.is3DMode = s.view_mode === "3d";
  }
  getCardSize() {
    return 6;
  }
  firstUpdated() {
    this.loadProject();
  }
  async loadProject() {
    var t;
    const s = this.config.project_id || "rdc";
    if (this.hass && this.hass.callWS)
      try {
        const i = await this.hass.callWS({ type: "home_architect/get_projects" }), o = (t = i == null ? void 0 : i.projects) == null ? void 0 : t.find((n) => n.id === s);
        if (o) {
          this.project = o;
          return;
        }
      } catch (i) {
        console.warn("WebSocket get_projects échoué, essai localStorage:", i);
      }
    const e = localStorage.getItem(`home_architect_${s}`);
    if (e)
      try {
        this.project = JSON.parse(e);
      } catch {
      }
  }
  render() {
    var s;
    return x`
      <div class="card-header">
        <div class="card-title">${((s = this.config) == null ? void 0 : s.title) || this.project.name || "Home Architect"}</div>
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
ie.styles = L`
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
we([
  _({ type: Object })
], ie.prototype, "hass", 2);
we([
  f()
], ie.prototype, "config", 2);
we([
  f()
], ie.prototype, "project", 2);
we([
  f()
], ie.prototype, "is3DMode", 2);
ie = we([
  U("home-architect-card")
], ie);
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
