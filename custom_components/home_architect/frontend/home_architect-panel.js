/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const N = globalThis, K = N.ShadowRoot && (N.ShadyCSS === void 0 || N.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, J = Symbol(), rt = /* @__PURE__ */ new WeakMap();
let bt = class {
  constructor(t, e, s) {
    if (this._$cssResult$ = !0, s !== J) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (K && t === void 0) {
      const s = e !== void 0 && e.length === 1;
      s && (t = rt.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && rt.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const At = (o) => new bt(typeof o == "string" ? o : o + "", void 0, J), Q = (o, ...t) => {
  const e = o.length === 1 ? o[0] : t.reduce((s, i, n) => s + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + o[n + 1], o[0]);
  return new bt(e, o, J);
}, St = (o, t) => {
  if (K) o.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const s = document.createElement("style"), i = N.litNonce;
    i !== void 0 && s.setAttribute("nonce", i), s.textContent = e.cssText, o.appendChild(s);
  }
}, nt = K ? (o) => o : (o) => o instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const s of t.cssRules) e += s.cssText;
  return At(e);
})(o) : o;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Pt, defineProperty: Tt, getOwnPropertyDescriptor: kt, getOwnPropertyNames: Et, getOwnPropertySymbols: Ct, getPrototypeOf: Mt } = Object, x = globalThis, at = x.trustedTypes, jt = at ? at.emptyScript : "", G = x.reactiveElementPolyfillSupport, U = (o, t) => o, L = { toAttribute(o, t) {
  switch (t) {
    case Boolean:
      o = o ? jt : null;
      break;
    case Object:
    case Array:
      o = o == null ? o : JSON.stringify(o);
  }
  return o;
}, fromAttribute(o, t) {
  let e = o;
  switch (t) {
    case Boolean:
      e = o !== null;
      break;
    case Number:
      e = o === null ? null : Number(o);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(o);
      } catch {
        e = null;
      }
  }
  return e;
} }, tt = (o, t) => !Pt(o, t), lt = { attribute: !0, type: String, converter: L, reflect: !1, useDefault: !1, hasChanged: tt };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), x.litPropertyMetadata ?? (x.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let M = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = lt) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const s = Symbol(), i = this.getPropertyDescriptor(t, s, e);
      i !== void 0 && Tt(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, e, s) {
    const { get: i, set: n } = kt(this.prototype, t) ?? { get() {
      return this[e];
    }, set(r) {
      this[e] = r;
    } };
    return { get: i, set(r) {
      const l = i == null ? void 0 : i.call(this);
      n == null || n.call(this, r), this.requestUpdate(t, l, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? lt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(U("elementProperties"))) return;
    const t = Mt(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(U("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(U("properties"))) {
      const e = this.properties, s = [...Et(e), ...Ct(e)];
      for (const i of s) this.createProperty(i, e[i]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [s, i] of e) this.elementProperties.set(s, i);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, s] of this.elementProperties) {
      const i = this._$Eu(e, s);
      i !== void 0 && this._$Eh.set(i, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const s = new Set(t.flat(1 / 0).reverse());
      for (const i of s) e.unshift(nt(i));
    } else t !== void 0 && e.push(nt(t));
    return e;
  }
  static _$Eu(t, e) {
    const s = e.attribute;
    return s === !1 ? void 0 : typeof s == "string" ? s : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var t;
    this._$ES = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (t = this.constructor.l) == null || t.forEach((e) => e(this));
  }
  addController(t) {
    var e;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(t), this.renderRoot !== void 0 && this.isConnected && ((e = t.hostConnected) == null || e.call(t));
  }
  removeController(t) {
    var e;
    (e = this._$EO) == null || e.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), e = this.constructor.elementProperties;
    for (const s of e.keys()) this.hasOwnProperty(s) && (t.set(s, this[s]), delete this[s]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return St(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    var t;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$EO) == null || t.forEach((e) => {
      var s;
      return (s = e.hostConnected) == null ? void 0 : s.call(e);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$EO) == null || t.forEach((e) => {
      var s;
      return (s = e.hostDisconnected) == null ? void 0 : s.call(e);
    });
  }
  attributeChangedCallback(t, e, s) {
    this._$AK(t, s);
  }
  _$ET(t, e) {
    var n;
    const s = this.constructor.elementProperties.get(t), i = this.constructor._$Eu(t, s);
    if (i !== void 0 && s.reflect === !0) {
      const r = (((n = s.converter) == null ? void 0 : n.toAttribute) !== void 0 ? s.converter : L).toAttribute(e, s.type);
      this._$Em = t, r == null ? this.removeAttribute(i) : this.setAttribute(i, r), this._$Em = null;
    }
  }
  _$AK(t, e) {
    var n, r;
    const s = this.constructor, i = s._$Eh.get(t);
    if (i !== void 0 && this._$Em !== i) {
      const l = s.getPropertyOptions(i), a = typeof l.converter == "function" ? { fromAttribute: l.converter } : ((n = l.converter) == null ? void 0 : n.fromAttribute) !== void 0 ? l.converter : L;
      this._$Em = i;
      const c = a.fromAttribute(e, l.type);
      this[i] = c ?? ((r = this._$Ej) == null ? void 0 : r.get(i)) ?? c, this._$Em = null;
    }
  }
  requestUpdate(t, e, s, i = !1, n) {
    var r;
    if (t !== void 0) {
      const l = this.constructor;
      if (i === !1 && (n = this[t]), s ?? (s = l.getPropertyOptions(t)), !((s.hasChanged ?? tt)(n, e) || s.useDefault && s.reflect && n === ((r = this._$Ej) == null ? void 0 : r.get(t)) && !this.hasAttribute(l._$Eu(t, s)))) return;
      this.C(t, e, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: s, reflect: i, wrapped: n }, r) {
    s && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, r ?? e ?? this[t]), n !== !0 || r !== void 0) || (this._$AL.has(t) || (this.hasUpdated || s || (e = void 0), this._$AL.set(t, e)), i === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (e) {
      Promise.reject(e);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var s;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [n, r] of this._$Ep) this[n] = r;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [n, r] of i) {
        const { wrapped: l } = r, a = this[n];
        l !== !0 || this._$AL.has(n) || a === void 0 || this.C(n, void 0, r, a);
      }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), (s = this._$EO) == null || s.forEach((i) => {
        var n;
        return (n = i.hostUpdate) == null ? void 0 : n.call(i);
      }), this.update(e)) : this._$EM();
    } catch (i) {
      throw t = !1, this._$EM(), i;
    }
    t && this._$AE(e);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var e;
    (e = this._$EO) == null || e.forEach((s) => {
      var i;
      return (i = s.hostUpdated) == null ? void 0 : i.call(s);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
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
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Eq && (this._$Eq = this._$Eq.forEach((e) => this._$ET(e, this[e]))), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
M.elementStyles = [], M.shadowRootOptions = { mode: "open" }, M[U("elementProperties")] = /* @__PURE__ */ new Map(), M[U("finalized")] = /* @__PURE__ */ new Map(), G == null || G({ ReactiveElement: M }), (x.reactiveElementVersions ?? (x.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const D = globalThis, ct = (o) => o, B = D.trustedTypes, ht = B ? B.createPolicy("lit-html", { createHTML: (o) => o }) : void 0, $t = "$lit$", y = `lit$${Math.random().toFixed(9).slice(2)}$`, mt = "?" + y, Ot = `<${mt}>`, k = document, H = () => k.createComment(""), R = (o) => o === null || typeof o != "object" && typeof o != "function", et = Array.isArray, zt = (o) => et(o) || typeof (o == null ? void 0 : o[Symbol.iterator]) == "function", Y = `[ 	
\f\r]`, z = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, dt = /-->/g, pt = />/g, _ = RegExp(`>|${Y}(?:([^\\s"'>=/]+)(${Y}*=${Y}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), ut = /'/g, gt = /"/g, yt = /^(?:script|style|textarea|title)$/i, xt = (o) => (t, ...e) => ({ _$litType$: o, strings: t, values: e }), st = xt(1), A = xt(2), j = Symbol.for("lit-noChange"), p = Symbol.for("lit-nothing"), ft = /* @__PURE__ */ new WeakMap(), S = k.createTreeWalker(k, 129);
function wt(o, t) {
  if (!et(o) || !o.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return ht !== void 0 ? ht.createHTML(t) : t;
}
const Ut = (o, t) => {
  const e = o.length - 1, s = [];
  let i, n = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", r = z;
  for (let l = 0; l < e; l++) {
    const a = o[l];
    let c, d, h = -1, g = 0;
    for (; g < a.length && (r.lastIndex = g, d = r.exec(a), d !== null); ) g = r.lastIndex, r === z ? d[1] === "!--" ? r = dt : d[1] !== void 0 ? r = pt : d[2] !== void 0 ? (yt.test(d[2]) && (i = RegExp("</" + d[2], "g")), r = _) : d[3] !== void 0 && (r = _) : r === _ ? d[0] === ">" ? (r = i ?? z, h = -1) : d[1] === void 0 ? h = -2 : (h = r.lastIndex - d[2].length, c = d[1], r = d[3] === void 0 ? _ : d[3] === '"' ? gt : ut) : r === gt || r === ut ? r = _ : r === dt || r === pt ? r = z : (r = _, i = void 0);
    const u = r === _ && o[l + 1].startsWith("/>") ? " " : "";
    n += r === z ? a + Ot : h >= 0 ? (s.push(c), a.slice(0, h) + $t + a.slice(h) + y + u) : a + y + (h === -2 ? l : u);
  }
  return [wt(o, n + (o[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class W {
  constructor({ strings: t, _$litType$: e }, s) {
    let i;
    this.parts = [];
    let n = 0, r = 0;
    const l = t.length - 1, a = this.parts, [c, d] = Ut(t, e);
    if (this.el = W.createElement(c, s), S.currentNode = this.el.content, e === 2 || e === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (i = S.nextNode()) !== null && a.length < l; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const h of i.getAttributeNames()) if (h.endsWith($t)) {
          const g = d[r++], u = i.getAttribute(h).split(y), w = /([.?@])?(.*)/.exec(g);
          a.push({ type: 1, index: n, name: w[2], strings: u, ctor: w[1] === "." ? Ht : w[1] === "?" ? Rt : w[1] === "@" ? Wt : V }), i.removeAttribute(h);
        } else h.startsWith(y) && (a.push({ type: 6, index: n }), i.removeAttribute(h));
        if (yt.test(i.tagName)) {
          const h = i.textContent.split(y), g = h.length - 1;
          if (g > 0) {
            i.textContent = B ? B.emptyScript : "";
            for (let u = 0; u < g; u++) i.append(h[u], H()), S.nextNode(), a.push({ type: 2, index: ++n });
            i.append(h[g], H());
          }
        }
      } else if (i.nodeType === 8) if (i.data === mt) a.push({ type: 2, index: n });
      else {
        let h = -1;
        for (; (h = i.data.indexOf(y, h + 1)) !== -1; ) a.push({ type: 7, index: n }), h += y.length - 1;
      }
      n++;
    }
  }
  static createElement(t, e) {
    const s = k.createElement("template");
    return s.innerHTML = t, s;
  }
}
function O(o, t, e = o, s) {
  var r, l;
  if (t === j) return t;
  let i = s !== void 0 ? (r = e._$Co) == null ? void 0 : r[s] : e._$Cl;
  const n = R(t) ? void 0 : t._$litDirective$;
  return (i == null ? void 0 : i.constructor) !== n && ((l = i == null ? void 0 : i._$AO) == null || l.call(i, !1), n === void 0 ? i = void 0 : (i = new n(o), i._$AT(o, e, s)), s !== void 0 ? (e._$Co ?? (e._$Co = []))[s] = i : e._$Cl = i), i !== void 0 && (t = O(o, i._$AS(o, t.values), i, s)), t;
}
class Dt {
  constructor(t, e) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = e;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: e }, parts: s } = this._$AD, i = ((t == null ? void 0 : t.creationScope) ?? k).importNode(e, !0);
    S.currentNode = i;
    let n = S.nextNode(), r = 0, l = 0, a = s[0];
    for (; a !== void 0; ) {
      if (r === a.index) {
        let c;
        a.type === 2 ? c = new I(n, n.nextSibling, this, t) : a.type === 1 ? c = new a.ctor(n, a.name, a.strings, this, t) : a.type === 6 && (c = new It(n, this, t)), this._$AV.push(c), a = s[++l];
      }
      r !== (a == null ? void 0 : a.index) && (n = S.nextNode(), r++);
    }
    return S.currentNode = k, i;
  }
  p(t) {
    let e = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, e), e += s.strings.length - 2) : s._$AI(t[e])), e++;
  }
}
class I {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, e, s, i) {
    this.type = 2, this._$AH = p, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = s, this.options = i, this._$Cv = (i == null ? void 0 : i.isConnected) ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return e !== void 0 && (t == null ? void 0 : t.nodeType) === 11 && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    t = O(this, t, e), R(t) ? t === p || t == null || t === "" ? (this._$AH !== p && this._$AR(), this._$AH = p) : t !== this._$AH && t !== j && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : zt(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== p && R(this._$AH) ? this._$AA.nextSibling.data = t : this.T(k.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var n;
    const { values: e, _$litType$: s } = t, i = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = W.createElement(wt(s.h, s.h[0]), this.options)), s);
    if (((n = this._$AH) == null ? void 0 : n._$AD) === i) this._$AH.p(e);
    else {
      const r = new Dt(i, this), l = r.u(this.options);
      r.p(e), this.T(l), this._$AH = r;
    }
  }
  _$AC(t) {
    let e = ft.get(t.strings);
    return e === void 0 && ft.set(t.strings, e = new W(t)), e;
  }
  k(t) {
    et(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let s, i = 0;
    for (const n of t) i === e.length ? e.push(s = new I(this.O(H()), this.O(H()), this, this.options)) : s = e[i], s._$AI(n), i++;
    i < e.length && (this._$AR(s && s._$AB.nextSibling, i), e.length = i);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var s;
    for ((s = this._$AP) == null ? void 0 : s.call(this, !1, !0, e); t !== this._$AB; ) {
      const i = ct(t).nextSibling;
      ct(t).remove(), t = i;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$Cv = t, (e = this._$AP) == null || e.call(this, t));
  }
}
class V {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, s, i, n) {
    this.type = 1, this._$AH = p, this._$AN = void 0, this.element = t, this.name = e, this._$AM = i, this.options = n, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = p;
  }
  _$AI(t, e = this, s, i) {
    const n = this.strings;
    let r = !1;
    if (n === void 0) t = O(this, t, e, 0), r = !R(t) || t !== this._$AH && t !== j, r && (this._$AH = t);
    else {
      const l = t;
      let a, c;
      for (t = n[0], a = 0; a < n.length - 1; a++) c = O(this, l[s + a], e, a), c === j && (c = this._$AH[a]), r || (r = !R(c) || c !== this._$AH[a]), c === p ? t = p : t !== p && (t += (c ?? "") + n[a + 1]), this._$AH[a] = c;
    }
    r && !i && this.j(t);
  }
  j(t) {
    t === p ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Ht extends V {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === p ? void 0 : t;
  }
}
class Rt extends V {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== p);
  }
}
class Wt extends V {
  constructor(t, e, s, i, n) {
    super(t, e, s, i, n), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = O(this, t, e, 0) ?? p) === j) return;
    const s = this._$AH, i = t === p && s !== p || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, n = t !== p && (s === p || i);
    i && this.element.removeEventListener(this.name, this, s), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e;
    typeof this._$AH == "function" ? this._$AH.call(((e = this.options) == null ? void 0 : e.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class It {
  constructor(t, e, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    O(this, t);
  }
}
const X = D.litHtmlPolyfillSupport;
X == null || X(W, I), (D.litHtmlVersions ?? (D.litHtmlVersions = [])).push("3.3.3");
const Nt = (o, t, e) => {
  const s = (e == null ? void 0 : e.renderBefore) ?? t;
  let i = s._$litPart$;
  if (i === void 0) {
    const n = (e == null ? void 0 : e.renderBefore) ?? null;
    s._$litPart$ = i = new I(t.insertBefore(H(), n), n, void 0, e ?? {});
  }
  return i._$AI(o), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const P = globalThis;
class T extends M {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var e;
    const t = super.createRenderRoot();
    return (e = this.renderOptions).renderBefore ?? (e.renderBefore = t.firstChild), t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Nt(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t;
    super.connectedCallback(), (t = this._$Do) == null || t.setConnected(!0);
  }
  disconnectedCallback() {
    var t;
    super.disconnectedCallback(), (t = this._$Do) == null || t.setConnected(!1);
  }
  render() {
    return j;
  }
}
var vt;
T._$litElement$ = !0, T.finalized = !0, (vt = P.litElementHydrateSupport) == null || vt.call(P, { LitElement: T });
const Z = P.litElementPolyfillSupport;
Z == null || Z({ LitElement: T });
(P.litElementVersions ?? (P.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const it = (o) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(o, t);
  }) : customElements.define(o, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Lt = { attribute: !0, type: String, converter: L, reflect: !1, hasChanged: tt }, Bt = (o = Lt, t, e) => {
  const { kind: s, metadata: i } = e;
  let n = globalThis.litPropertyMetadata.get(i);
  if (n === void 0 && globalThis.litPropertyMetadata.set(i, n = /* @__PURE__ */ new Map()), s === "setter" && ((o = Object.create(o)).wrapped = !0), n.set(e.name, o), s === "accessor") {
    const { name: r } = e;
    return { set(l) {
      const a = t.get.call(this);
      t.set.call(this, l), this.requestUpdate(r, a, o, !0, l);
    }, init(l) {
      return l !== void 0 && this.C(r, void 0, o, l), l;
    } };
  }
  if (s === "setter") {
    const { name: r } = e;
    return function(l) {
      const a = this[r];
      t.call(this, l), this.requestUpdate(r, a, o, !0, l);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function E(o) {
  return (t, e) => typeof e == "object" ? Bt(o, t, e) : ((s, i, n) => {
    const r = i.hasOwnProperty(n);
    return i.constructor.createProperty(n, s), r ? Object.getOwnPropertyDescriptor(i, n) : void 0;
  })(o, t, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function v(o) {
  return E({ ...o, state: !0, attribute: !1 });
}
const qt = Q`
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
`;
class $ {
  /**
   * Snaps a world point (in meters) to grid, existing vertices, and angle guides.
   */
  static snapPoint(t, e, s = [], i, n = 0.25) {
    let r = { ...t };
    if (e.snapToElements && s.length > 0) {
      let c = n, d = null;
      for (const h of s)
        for (const g of [h.start, h.end]) {
          const u = this.distance(t, g);
          u < c && (c = u, d = g);
        }
      if (d)
        return {
          point: { x: d.x, y: d.y },
          snappedTo: "vertex"
        };
    }
    let l = !1, a;
    if (e.snapToAngles && i) {
      const c = t.x - i.x, d = t.y - i.y, h = Math.sqrt(c * c + d * d);
      if (h > 0.05) {
        let u = Math.atan2(d, c) * 180 / Math.PI;
        u < 0 && (u += 360);
        const w = 45, F = Math.round(u / w) * w;
        if (Math.abs(u - F) <= 6) {
          const ot = F * Math.PI / 180;
          r = {
            x: i.x + h * Math.cos(ot),
            y: i.y + h * Math.sin(ot)
          }, l = !0, a = F;
        }
      }
    }
    if (e.snapToGrid && !l) {
      const c = e.size || 0.5;
      return r = {
        x: Math.round(r.x / c) * c,
        y: Math.round(r.y / c) * c
      }, { point: r, snappedTo: "grid" };
    } else if (l)
      return { point: r, snappedTo: "angle", guideAngle: a };
    return { point: t, snappedTo: "none" };
  }
  static distance(t, e) {
    const s = t.x - e.x, i = t.y - e.y;
    return Math.sqrt(s * s + i * i);
  }
  static roundMeters(t, e = 2) {
    const s = Math.pow(10, e);
    return Math.round(t * s) / s;
  }
}
var Vt = Object.defineProperty, Ft = Object.getOwnPropertyDescriptor, b = (o, t, e, s) => {
  for (var i = s > 1 ? void 0 : s ? Ft(t, e) : t, n = o.length - 1, r; n >= 0; n--)
    (r = o[n]) && (i = (s ? r(t, e, i) : r(i)) || i);
  return s && i && Vt(t, e, i), i;
};
let f = class extends T {
  constructor() {
    super(...arguments), this.project = {
      id: "default",
      name: "Plan sans titre",
      created_at: (/* @__PURE__ */ new Date()).toISOString(),
      updated_at: (/* @__PURE__ */ new Date()).toISOString(),
      pixelsPerMeter: 50,
      // 50 px = 1 mètre
      grid: {
        size: 0.5,
        // Pas de 0.5m (50 cm)
        subdivisions: 2,
        snapToGrid: !0,
        snapToAngles: !0,
        snapToElements: !0
      },
      walls: [],
      openings: [],
      rooms: [],
      bindings: []
    }, this.activeTool = "wall", this.currentWallThickness = 0.2, this.viewport = { x: 300, y: 300, zoom: 1 }, this.isPanning = !1, this.panStart = { x: 0, y: 0 }, this.initialPinchDistance = null, this.initialPinchZoom = 1, this.drawingWallStart = null, this.previewPoint = null, this.snapInfo = { snappedTo: "none" }, this.cursorCoords = { x: 0, y: 0 };
  }
  // En mètres
  // ==========================================
  // CONVERSIONS DE COORDONNÉES MONDE <-> ÉCRAN
  // ==========================================
  screenToWorld(o, t) {
    const e = this.getBoundingClientRect(), s = o - e.left, i = t - e.top, n = this.project.pixelsPerMeter * this.viewport.zoom;
    return {
      x: (s - this.viewport.x) / n,
      y: (i - this.viewport.y) / n
    };
  }
  worldToScreen(o) {
    const t = this.project.pixelsPerMeter * this.viewport.zoom;
    return {
      x: o.x * t + this.viewport.x,
      y: o.y * t + this.viewport.y
    };
  }
  // ==========================================
  // GESTION DU PAN & ZOOM (SOURIS & TACTILE)
  // ==========================================
  handleWheel(o) {
    o.preventDefault();
    const t = this.getBoundingClientRect(), e = o.clientX - t.left, s = o.clientY - t.top, i = o.deltaY < 0 ? 1.12 : 0.89, n = Math.min(Math.max(this.viewport.zoom * i, 0.15), 8), r = e - (e - this.viewport.x) * (n / this.viewport.zoom), l = s - (s - this.viewport.y) * (n / this.viewport.zoom);
    this.viewport = { x: r, y: l, zoom: n };
  }
  handlePointerDown(o) {
    var s, i;
    if (o.button === 1 || this.activeTool === "select" || o.shiftKey) {
      this.isPanning = !0, this.panStart = { x: o.clientX - this.viewport.x, y: o.clientY - this.viewport.y }, (i = (s = o.target).setPointerCapture) == null || i.call(s, o.pointerId);
      return;
    }
    if (o.button !== 0) return;
    const t = this.screenToWorld(o.clientX, o.clientY), e = $.snapPoint(
      t,
      this.project.grid,
      this.project.walls,
      this.drawingWallStart || void 0
    );
    if (this.activeTool === "wall")
      if (!this.drawingWallStart)
        this.drawingWallStart = e.point;
      else {
        const n = this.drawingWallStart, r = e.point;
        if ($.distance(n, r) >= 0.15) {
          const a = {
            id: `wall_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
            start: { ...n },
            end: { ...r },
            thickness: this.currentWallThickness,
            type: "standard"
          };
          this.project = {
            ...this.project,
            walls: [...this.project.walls, a]
          }, this.dispatchEvent(new CustomEvent("project-changed", {
            detail: { project: this.project },
            bubbles: !0,
            composed: !0
          })), this.drawingWallStart = r;
        }
      }
  }
  handlePointerMove(o) {
    if (this.isPanning) {
      this.viewport = {
        ...this.viewport,
        x: o.clientX - this.panStart.x,
        y: o.clientY - this.panStart.y
      };
      return;
    }
    const t = this.screenToWorld(o.clientX, o.clientY);
    if (this.cursorCoords = {
      x: $.roundMeters(t.x),
      y: $.roundMeters(t.y)
    }, this.activeTool === "wall") {
      const e = $.snapPoint(
        t,
        this.project.grid,
        this.project.walls,
        this.drawingWallStart || void 0
      );
      this.previewPoint = e.point, this.snapInfo = { snappedTo: e.snappedTo, guideAngle: e.guideAngle };
    } else
      this.previewPoint = null;
  }
  handlePointerUp(o) {
    var t, e;
    this.isPanning && (this.isPanning = !1, (e = (t = o.target).releasePointerCapture) == null || e.call(t, o.pointerId));
  }
  handleKeyDown(o) {
    o.key === "Escape" && (this.drawingWallStart = null, this.previewPoint = null, this.requestUpdate());
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("keydown", this.handleKeyDown.bind(this));
  }
  disconnectedCallback() {
    super.disconnectedCallback(), window.removeEventListener("keydown", this.handleKeyDown.bind(this));
  }
  // ==========================================
  // RENDU GÉOMÉTRIQUE DES MURS & GRILLE
  // ==========================================
  /**
   * Calcule le polygone rectangulaire épais d'un mur à partir de sa ligne centrale
   */
  computeWallPolygon(o, t, e) {
    const s = t.x - o.x, i = t.y - o.y, n = Math.sqrt(s * s + i * i);
    if (n === 0) return [o, o, t, t];
    const r = e / 2, l = -i / n * r, a = s / n * r;
    return [
      { x: o.x + l, y: o.y + a },
      { x: t.x + l, y: t.y + a },
      { x: t.x - l, y: t.y - a },
      { x: o.x - l, y: o.y - a }
    ];
  }
  renderGrid() {
    const o = this.project.pixelsPerMeter * this.viewport.zoom, e = (this.project.grid.size || 0.5) * o;
    if (e < 12) return null;
    const s = e * 2;
    return A`
      <defs>
        <pattern id="grid-sub" width="${e}" height="${e}" patternUnits="userSpaceOnUse"
          patternTransform="translate(${this.viewport.x % e}, ${this.viewport.y % e})">
          <line x1="0" y1="0" x2="${e}" y2="0" stroke="rgba(255,255,255,0.06)" stroke-width="0.5" />
          <line x1="0" y1="0" x2="0" y2="${e}" stroke="rgba(255,255,255,0.06)" stroke-width="0.5" />
        </pattern>
        <pattern id="grid-major" width="${s}" height="${s}" patternUnits="userSpaceOnUse"
          patternTransform="translate(${this.viewport.x % s}, ${this.viewport.y % s})">
          <line x1="0" y1="0" x2="${s}" y2="0" stroke="rgba(255,255,255,0.14)" stroke-width="1" />
          <line x1="0" y1="0" x2="0" y2="${s}" stroke="rgba(255,255,255,0.14)" stroke-width="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid-sub)" />
      <rect width="100%" height="100%" fill="url(#grid-major)" />
    `;
  }
  renderWalls() {
    return this.project.walls.map((o) => {
      const e = this.computeWallPolygon(o.start, o.end, o.thickness).map((a) => this.worldToScreen(a)), s = this.worldToScreen(o.start), i = this.worldToScreen(o.end), n = e.map((a) => `${a.x},${a.y}`).join(" "), r = $.distance(o.start, o.end), l = {
        x: (s.x + i.x) / 2,
        y: (s.y + i.y) / 2
      };
      return A`
        <g class="wall-element" data-wall-id="${o.id}">
          <!-- Corps épais du mur -->
          <polygon points="${n}" class="wall-rect" />
          
          <!-- Ligne médiane discrète -->
          <line x1="${s.x}" y1="${s.y}" x2="${i.x}" y2="${i.y}" class="wall-centerline" />
          
          <!-- Étiquette de dimension en mètres -->
          ${r >= 0.6 ? A`
            <g class="dimension-badge" transform="translate(${l.x}, ${l.y - 14})">
              <rect x="-26" y="-10" width="52" height="20" />
              <text>${$.roundMeters(r).toFixed(2)} m</text>
            </g>
          ` : null}
        </g>
      `;
    });
  }
  renderPreviewWall() {
    if (!this.drawingWallStart || !this.previewPoint) return null;
    const t = this.computeWallPolygon(
      this.drawingWallStart,
      this.previewPoint,
      this.currentWallThickness
    ).map((l) => this.worldToScreen(l)), e = this.worldToScreen(this.drawingWallStart), s = this.worldToScreen(this.previewPoint), i = t.map((l) => `${l.x},${l.y}`).join(" "), n = $.distance(this.drawingWallStart, this.previewPoint), r = {
      x: (e.x + s.x) / 2,
      y: (e.y + s.y) / 2
    };
    return A`
      <g class="preview-wall-group">
        <!-- Prévisualisation polygonale épaisse -->
        <polygon points="${i}" class="preview-wall-rect" />
        <line x1="${e.x}" y1="${e.y}" x2="${s.x}" y2="${s.y}" class="preview-wall-line" />

        <!-- Ligne guide angulaire si magnétisme 45°/90° actif -->
        ${this.snapInfo.guideAngle !== void 0 ? A`
          <line x1="${e.x}" y1="${e.y}" x2="${s.x}" y2="${s.y}" class="angle-guide-line" />
        ` : null}

        <!-- Badge de cote dynamique en temps réel -->
        <g class="dimension-badge" transform="translate(${r.x}, ${r.y - 16})">
          <rect x="-30" y="-11" width="60" height="22" />
          <text>${$.roundMeters(n).toFixed(2)} m</text>
        </g>
      </g>
    `;
  }
  renderSnapIndicator() {
    if (!this.previewPoint || this.snapInfo.snappedTo === "none") return null;
    const o = this.worldToScreen(this.previewPoint), t = this.snapInfo.snappedTo === "vertex";
    return A`
      <g transform="translate(${o.x}, ${o.y})">
        <circle r="${t ? 7 : 5}" class="snap-indicator" />
        ${t ? A`<circle r="2" fill="#38bdf8" />` : null}
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
  render() {
    return st`
      <div 
        class="canvas-container ${this.isPanning ? "is-panning" : ""}"
        @wheel=${this.handleWheel}
        @pointerdown=${this.handlePointerDown}
        @pointermove=${this.handlePointerMove}
        @pointerup=${this.handlePointerUp}
      >
        <svg class="main-viewport">
          <!-- Grille vectorielle dynamique en mètres -->
          ${this.renderGrid()}

          <!-- Calque des murs commités -->
          ${this.renderWalls()}

          <!-- Calque de prévisualisation du mur en tracé -->
          ${this.renderPreviewWall()}

          <!-- Indicateur magnétique visuel -->
          ${this.renderSnapIndicator()}
        </svg>

        <!-- Affichage des coordonnées curseur -->
        <div class="coords-hud">
          X: ${this.cursorCoords.x.toFixed(2)} m | Y: ${this.cursorCoords.y.toFixed(2)} m | Outil: ${this.activeTool.toUpperCase()}
        </div>

        <!-- HUD Contrôles Zoom & Réinitialisation -->
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
f.styles = qt;
b([
  E({ type: Object })
], f.prototype, "project", 2);
b([
  E({ type: String })
], f.prototype, "activeTool", 2);
b([
  E({ type: Number })
], f.prototype, "currentWallThickness", 2);
b([
  v()
], f.prototype, "viewport", 2);
b([
  v()
], f.prototype, "isPanning", 2);
b([
  v()
], f.prototype, "drawingWallStart", 2);
b([
  v()
], f.prototype, "previewPoint", 2);
b([
  v()
], f.prototype, "snapInfo", 2);
b([
  v()
], f.prototype, "cursorCoords", 2);
f = b([
  it("home-architect-canvas")
], f);
var Gt = Object.defineProperty, Yt = Object.getOwnPropertyDescriptor, _t = (o, t, e, s) => {
  for (var i = s > 1 ? void 0 : s ? Yt(t, e) : t, n = o.length - 1, r; n >= 0; n--)
    (r = o[n]) && (i = (s ? r(t, e, i) : r(i)) || i);
  return s && i && Gt(t, e, i), i;
};
let q = class extends T {
  constructor() {
    super(...arguments), this.activeTool = "wall";
  }
  selectTool(o) {
    this.dispatchEvent(new CustomEvent("tool-selected", {
      detail: { tool: o },
      bubbles: !0,
      composed: !0
    }));
  }
  render() {
    return st`
      <button 
        class="tool-btn ${this.activeTool === "select" ? "active" : ""}" 
        @click=${() => this.selectTool("select")} 
        title="Sélectionner & Déplacer (V)"
      >
        👆
      </button>

      <button 
        class="tool-btn ${this.activeTool === "wall" ? "active" : ""}" 
        @click=${() => this.selectTool("wall")} 
        title="Tracer un mur (W)"
      >
        🧱
      </button>

      <button 
        class="tool-btn ${this.activeTool === "rect_room" ? "active" : ""}" 
        @click=${() => this.selectTool("rect_room")} 
        title="Pièce rectangulaire rapide (R)"
      >
        📐
      </button>

      <div class="divider"></div>

      <button 
        class="tool-btn ${this.activeTool === "door" ? "active" : ""}" 
        @click=${() => this.selectTool("door")} 
        title="Placer une porte (D)"
      >
        🚪
      </button>

      <button 
        class="tool-btn ${this.activeTool === "window" ? "active" : ""}" 
        @click=${() => this.selectTool("window")} 
        title="Placer une fenêtre"
      >
        🪟
      </button>

      <div class="divider"></div>

      <button 
        class="tool-btn ${this.activeTool === "calibrate" ? "active" : ""}" 
        @click=${() => this.selectTool("calibrate")} 
        title="Étalonnage d'échelle (M)"
      >
        📏
      </button>
    `;
  }
};
q.styles = Q`
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
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-size: 18px;
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

    .divider {
      height: 1px;
      background: rgba(255, 255, 255, 0.1);
      margin: 4px 2px;
    }
  `;
_t([
  E({ type: String })
], q.prototype, "activeTool", 2);
q = _t([
  it("home-architect-toolbar")
], q);
var Xt = Object.defineProperty, Zt = Object.getOwnPropertyDescriptor, C = (o, t, e, s) => {
  for (var i = s > 1 ? void 0 : s ? Zt(t, e) : t, n = o.length - 1, r; n >= 0; n--)
    (r = o[n]) && (i = (s ? r(t, e, i) : r(i)) || i);
  return s && i && Xt(t, e, i), i;
};
let m = class extends T {
  constructor() {
    super(...arguments), this.narrow = !1, this.activeTool = "wall", this.currentThickness = 0.2, this.activeLevel = "rdc", this.project = {
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
    };
  }
  handleToolSelected(o) {
    this.activeTool = o.detail.tool;
  }
  handleProjectChanged(o) {
    this.project = o.detail.project;
  }
  handleThicknessChange(o) {
    const t = parseFloat(o.target.value);
    this.currentThickness = t;
  }
  saveProject() {
    this.hass && this.hass.callWS ? this.hass.callWS({
      type: "home_architect/save_project",
      project: this.project
    }).then(() => {
      alert("Plan sauvegardé avec succès dans Home Assistant !");
    }).catch((o) => {
      console.error("Erreur de sauvegarde HA:", o), localStorage.setItem(`home_architect_${this.project.id}`, JSON.stringify(this.project)), alert("Sauvegardé localement dans le navigateur (Mode autonome).");
    }) : (localStorage.setItem(`home_architect_${this.project.id}`, JSON.stringify(this.project)), alert("Plan sauvegardé localement !"));
  }
  render() {
    return st`
      <header class="top-bar">
        <div class="brand">
          <span class="brand-icon">📐</span>
          <span>Home Architect</span>
          <span class="brand-tag">Studio 2D/3D</span>
        </div>

        <div class="level-selector">
          <button class="level-btn ${this.activeLevel === "sous-sol" ? "active" : ""}" @click=${() => this.activeLevel = "sous-sol"}>Sous-Sol</button>
          <button class="level-btn ${this.activeLevel === "rdc" ? "active" : ""}" @click=${() => this.activeLevel = "rdc"}>RDC</button>
          <button class="level-btn ${this.activeLevel === "etage1" ? "active" : ""}" @click=${() => this.activeLevel = "etage1"}>1er Étage</button>
          <button class="level-btn ${this.activeLevel === "jardin" ? "active" : ""}" @click=${() => this.activeLevel = "jardin"}>Jardin</button>
        </div>

        <div class="top-controls">
          <!-- Épaisseur de mur -->
          <div class="control-group">
            <label>Épaisseur :</label>
            <select @change=${this.handleThicknessChange}>
              <option value="0.10">Cloison 10 cm</option>
              <option value="0.15">Mur 15 cm</option>
              <option value="0.20" selected>Porteur 20 cm</option>
              <option value="0.30">Extérieur 30 cm</option>
            </select>
          </div>

          <!-- Aimantation -->
          <div class="control-group">
            <label>Grille :</label>
            <input 
              type="checkbox" 
              ?checked=${this.project.grid.snapToGrid}
              @change=${(o) => {
      this.project = {
        ...this.project,
        grid: { ...this.project.grid, snapToGrid: o.target.checked }
      };
    }}
            />
          </div>

          <!-- Bouton de Sauvegarde -->
          <button class="btn-primary" @click=${this.saveProject}>
            💾 Sauvegarder
          </button>
        </div>
      </header>

      <div class="workspace">
        <!-- Barre d'outils flottante -->
        <home-architect-toolbar 
          class="floating-toolbar"
          .activeTool=${this.activeTool}
          @tool-selected=${this.handleToolSelected}
        ></home-architect-toolbar>

        <!-- Canevas interactif SVG -->
        <home-architect-canvas
          .project=${this.project}
          .activeTool=${this.activeTool}
          .currentWallThickness=${this.currentThickness}
          @project-changed=${this.handleProjectChanged}
        ></home-architect-canvas>
      </div>
    `;
  }
};
m.styles = Q`
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
      padding: 2px 6px;
      gap: 6px;
      font-size: 0.85rem;
    }

    .control-group label {
      color: #94a3b8;
      font-size: 0.8rem;
    }

    select, button.btn-action {
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
  `;
C([
  E({ type: Object })
], m.prototype, "hass", 2);
C([
  E({ type: Boolean })
], m.prototype, "narrow", 2);
C([
  v()
], m.prototype, "activeTool", 2);
C([
  v()
], m.prototype, "currentThickness", 2);
C([
  v()
], m.prototype, "activeLevel", 2);
C([
  v()
], m.prototype, "project", 2);
m = C([
  it("home-architect-panel")
], m);
console.info(
  "%c 📐 HOME ARCHITECT %c v1.0.0 Loaded ",
  "background: #0284c7; color: #fff; font-weight: bold; border-radius: 4px 0 0 4px; padding: 2px 6px;",
  "background: #1e293b; color: #38bdf8; font-weight: bold; border-radius: 0 4px 4px 0; padding: 2px 6px;"
);
