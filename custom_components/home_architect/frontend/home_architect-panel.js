/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ot = globalThis, gt = ot.ShadowRoot && (ot.ShadyCSS === void 0 || ot.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, ft = Symbol(), vt = /* @__PURE__ */ new WeakMap();
let Et = class {
  constructor(t, e, o) {
    if (this._$cssResult$ = !0, o !== ft) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (gt && t === void 0) {
      const o = e !== void 0 && e.length === 1;
      o && (t = vt.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), o && vt.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Lt = (i) => new Et(typeof i == "string" ? i : i + "", void 0, ft), z = (i, ...t) => {
  const e = i.length === 1 ? i[0] : t.reduce((o, s, r) => o + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + i[r + 1], i[0]);
  return new Et(e, i, ft);
}, Ht = (i, t) => {
  if (gt) i.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const o = document.createElement("style"), s = ot.litNonce;
    s !== void 0 && o.setAttribute("nonce", s), o.textContent = e.cssText, i.appendChild(o);
  }
}, yt = gt ? (i) => i : (i) => i instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const o of t.cssRules) e += o.cssText;
  return Lt(e);
})(i) : i;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Nt, defineProperty: Bt, getOwnPropertyDescriptor: qt, getOwnPropertyNames: Vt, getOwnPropertySymbols: Gt, getPrototypeOf: Yt } = Object, A = globalThis, wt = A.trustedTypes, Xt = wt ? wt.emptyScript : "", ct = A.reactiveElementPolyfillSupport, X = (i, t) => i, st = { toAttribute(i, t) {
  switch (t) {
    case Boolean:
      i = i ? Xt : null;
      break;
    case Object:
    case Array:
      i = i == null ? i : JSON.stringify(i);
  }
  return i;
}, fromAttribute(i, t) {
  let e = i;
  switch (t) {
    case Boolean:
      e = i !== null;
      break;
    case Number:
      e = i === null ? null : Number(i);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(i);
      } catch {
        e = null;
      }
  }
  return e;
} }, bt = (i, t) => !Nt(i, t), $t = { attribute: !0, type: String, converter: st, reflect: !1, useDefault: !1, hasChanged: bt };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), A.litPropertyMetadata ?? (A.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let H = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = $t) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const o = Symbol(), s = this.getPropertyDescriptor(t, o, e);
      s !== void 0 && Bt(this.prototype, t, s);
    }
  }
  static getPropertyDescriptor(t, e, o) {
    const { get: s, set: r } = qt(this.prototype, t) ?? { get() {
      return this[e];
    }, set(a) {
      this[e] = a;
    } };
    return { get: s, set(a) {
      const n = s == null ? void 0 : s.call(this);
      r == null || r.call(this, a), this.requestUpdate(t, n, o);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? $t;
  }
  static _$Ei() {
    if (this.hasOwnProperty(X("elementProperties"))) return;
    const t = Yt(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(X("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(X("properties"))) {
      const e = this.properties, o = [...Vt(e), ...Gt(e)];
      for (const s of o) this.createProperty(s, e[s]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [o, s] of e) this.elementProperties.set(o, s);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, o] of this.elementProperties) {
      const s = this._$Eu(e, o);
      s !== void 0 && this._$Eh.set(s, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const o = new Set(t.flat(1 / 0).reverse());
      for (const s of o) e.unshift(yt(s));
    } else t !== void 0 && e.push(yt(t));
    return e;
  }
  static _$Eu(t, e) {
    const o = e.attribute;
    return o === !1 ? void 0 : typeof o == "string" ? o : typeof t == "string" ? t.toLowerCase() : void 0;
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
    for (const o of e.keys()) this.hasOwnProperty(o) && (t.set(o, this[o]), delete this[o]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Ht(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    var t;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$EO) == null || t.forEach((e) => {
      var o;
      return (o = e.hostConnected) == null ? void 0 : o.call(e);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$EO) == null || t.forEach((e) => {
      var o;
      return (o = e.hostDisconnected) == null ? void 0 : o.call(e);
    });
  }
  attributeChangedCallback(t, e, o) {
    this._$AK(t, o);
  }
  _$ET(t, e) {
    var r;
    const o = this.constructor.elementProperties.get(t), s = this.constructor._$Eu(t, o);
    if (s !== void 0 && o.reflect === !0) {
      const a = (((r = o.converter) == null ? void 0 : r.toAttribute) !== void 0 ? o.converter : st).toAttribute(e, o.type);
      this._$Em = t, a == null ? this.removeAttribute(s) : this.setAttribute(s, a), this._$Em = null;
    }
  }
  _$AK(t, e) {
    var r, a;
    const o = this.constructor, s = o._$Eh.get(t);
    if (s !== void 0 && this._$Em !== s) {
      const n = o.getPropertyOptions(s), l = typeof n.converter == "function" ? { fromAttribute: n.converter } : ((r = n.converter) == null ? void 0 : r.fromAttribute) !== void 0 ? n.converter : st;
      this._$Em = s;
      const d = l.fromAttribute(e, n.type);
      this[s] = d ?? ((a = this._$Ej) == null ? void 0 : a.get(s)) ?? d, this._$Em = null;
    }
  }
  requestUpdate(t, e, o, s = !1, r) {
    var a;
    if (t !== void 0) {
      const n = this.constructor;
      if (s === !1 && (r = this[t]), o ?? (o = n.getPropertyOptions(t)), !((o.hasChanged ?? bt)(r, e) || o.useDefault && o.reflect && r === ((a = this._$Ej) == null ? void 0 : a.get(t)) && !this.hasAttribute(n._$Eu(t, o)))) return;
      this.C(t, e, o);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: o, reflect: s, wrapped: r }, a) {
    o && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, a ?? e ?? this[t]), r !== !0 || a !== void 0) || (this._$AL.has(t) || (this.hasUpdated || o || (e = void 0), this._$AL.set(t, e)), s === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
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
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), (o = this._$EO) == null || o.forEach((s) => {
        var r;
        return (r = s.hostUpdate) == null ? void 0 : r.call(s);
      }), this.update(e)) : this._$EM();
    } catch (s) {
      throw t = !1, this._$EM(), s;
    }
    t && this._$AE(e);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var e;
    (e = this._$EO) == null || e.forEach((o) => {
      var s;
      return (s = o.hostUpdated) == null ? void 0 : s.call(o);
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
H.elementStyles = [], H.shadowRootOptions = { mode: "open" }, H[X("elementProperties")] = /* @__PURE__ */ new Map(), H[X("finalized")] = /* @__PURE__ */ new Map(), ct == null || ct({ ReactiveElement: H }), (A.reactiveElementVersions ?? (A.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const J = globalThis, _t = (i) => i, rt = J.trustedTypes, kt = rt ? rt.createPolicy("lit-html", { createHTML: (i) => i }) : void 0, jt = "$lit$", T = `lit$${Math.random().toFixed(9).slice(2)}$`, Ot = "?" + T, Jt = `<${Ot}>`, R = document, Z = () => R.createComment(""), K = (i) => i === null || typeof i != "object" && typeof i != "function", mt = Array.isArray, Zt = (i) => mt(i) || typeof (i == null ? void 0 : i[Symbol.iterator]) == "function", pt = `[ 	
\f\r]`, Y = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, St = /-->/g, Mt = />/g, O = RegExp(`>|${pt}(?:([^\\s"'>=/]+)(${pt}*=${pt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Dt = /'/g, Pt = /"/g, It = /^(?:script|style|textarea|title)$/i, Wt = (i) => (t, ...e) => ({ _$litType$: i, strings: t, values: e }), f = Wt(1), m = Wt(2), N = Symbol.for("lit-noChange"), x = Symbol.for("lit-nothing"), Ct = /* @__PURE__ */ new WeakMap(), I = R.createTreeWalker(R, 129);
function Rt(i, t) {
  if (!mt(i) || !i.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return kt !== void 0 ? kt.createHTML(t) : t;
}
const Kt = (i, t) => {
  const e = i.length - 1, o = [];
  let s, r = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", a = Y;
  for (let n = 0; n < e; n++) {
    const l = i[n];
    let d, p, c = -1, u = 0;
    for (; u < l.length && (a.lastIndex = u, p = a.exec(l), p !== null); ) u = a.lastIndex, a === Y ? p[1] === "!--" ? a = St : p[1] !== void 0 ? a = Mt : p[2] !== void 0 ? (It.test(p[2]) && (s = RegExp("</" + p[2], "g")), a = O) : p[3] !== void 0 && (a = O) : a === O ? p[0] === ">" ? (a = s ?? Y, c = -1) : p[1] === void 0 ? c = -2 : (c = a.lastIndex - p[2].length, d = p[1], a = p[3] === void 0 ? O : p[3] === '"' ? Pt : Dt) : a === Pt || a === Dt ? a = O : a === St || a === Mt ? a = Y : (a = O, s = void 0);
    const g = a === O && i[n + 1].startsWith("/>") ? " " : "";
    r += a === Y ? l + Jt : c >= 0 ? (o.push(d), l.slice(0, c) + jt + l.slice(c) + T + g) : l + T + (c === -2 ? n : g);
  }
  return [Rt(i, r + (i[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), o];
};
class Q {
  constructor({ strings: t, _$litType$: e }, o) {
    let s;
    this.parts = [];
    let r = 0, a = 0;
    const n = t.length - 1, l = this.parts, [d, p] = Kt(t, e);
    if (this.el = Q.createElement(d, o), I.currentNode = this.el.content, e === 2 || e === 3) {
      const c = this.el.content.firstChild;
      c.replaceWith(...c.childNodes);
    }
    for (; (s = I.nextNode()) !== null && l.length < n; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const c of s.getAttributeNames()) if (c.endsWith(jt)) {
          const u = p[a++], g = s.getAttribute(c).split(T), M = /([.?@])?(.*)/.exec(u);
          l.push({ type: 1, index: r, name: M[2], strings: g, ctor: M[1] === "." ? te : M[1] === "?" ? ee : M[1] === "@" ? ie : at }), s.removeAttribute(c);
        } else c.startsWith(T) && (l.push({ type: 6, index: r }), s.removeAttribute(c));
        if (It.test(s.tagName)) {
          const c = s.textContent.split(T), u = c.length - 1;
          if (u > 0) {
            s.textContent = rt ? rt.emptyScript : "";
            for (let g = 0; g < u; g++) s.append(c[g], Z()), I.nextNode(), l.push({ type: 2, index: ++r });
            s.append(c[u], Z());
          }
        }
      } else if (s.nodeType === 8) if (s.data === Ot) l.push({ type: 2, index: r });
      else {
        let c = -1;
        for (; (c = s.data.indexOf(T, c + 1)) !== -1; ) l.push({ type: 7, index: r }), c += T.length - 1;
      }
      r++;
    }
  }
  static createElement(t, e) {
    const o = R.createElement("template");
    return o.innerHTML = t, o;
  }
}
function B(i, t, e = i, o) {
  var a, n;
  if (t === N) return t;
  let s = o !== void 0 ? (a = e._$Co) == null ? void 0 : a[o] : e._$Cl;
  const r = K(t) ? void 0 : t._$litDirective$;
  return (s == null ? void 0 : s.constructor) !== r && ((n = s == null ? void 0 : s._$AO) == null || n.call(s, !1), r === void 0 ? s = void 0 : (s = new r(i), s._$AT(i, e, o)), o !== void 0 ? (e._$Co ?? (e._$Co = []))[o] = s : e._$Cl = s), s !== void 0 && (t = B(i, s._$AS(i, t.values), s, o)), t;
}
class Qt {
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
    const { el: { content: e }, parts: o } = this._$AD, s = ((t == null ? void 0 : t.creationScope) ?? R).importNode(e, !0);
    I.currentNode = s;
    let r = I.nextNode(), a = 0, n = 0, l = o[0];
    for (; l !== void 0; ) {
      if (a === l.index) {
        let d;
        l.type === 2 ? d = new tt(r, r.nextSibling, this, t) : l.type === 1 ? d = new l.ctor(r, l.name, l.strings, this, t) : l.type === 6 && (d = new oe(r, this, t)), this._$AV.push(d), l = o[++n];
      }
      a !== (l == null ? void 0 : l.index) && (r = I.nextNode(), a++);
    }
    return I.currentNode = R, s;
  }
  p(t) {
    let e = 0;
    for (const o of this._$AV) o !== void 0 && (o.strings !== void 0 ? (o._$AI(t, o, e), e += o.strings.length - 2) : o._$AI(t[e])), e++;
  }
}
class tt {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, e, o, s) {
    this.type = 2, this._$AH = x, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = o, this.options = s, this._$Cv = (s == null ? void 0 : s.isConnected) ?? !0;
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
    t = B(this, t, e), K(t) ? t === x || t == null || t === "" ? (this._$AH !== x && this._$AR(), this._$AH = x) : t !== this._$AH && t !== N && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Zt(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== x && K(this._$AH) ? this._$AA.nextSibling.data = t : this.T(R.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var r;
    const { values: e, _$litType$: o } = t, s = typeof o == "number" ? this._$AC(t) : (o.el === void 0 && (o.el = Q.createElement(Rt(o.h, o.h[0]), this.options)), o);
    if (((r = this._$AH) == null ? void 0 : r._$AD) === s) this._$AH.p(e);
    else {
      const a = new Qt(s, this), n = a.u(this.options);
      a.p(e), this.T(n), this._$AH = a;
    }
  }
  _$AC(t) {
    let e = Ct.get(t.strings);
    return e === void 0 && Ct.set(t.strings, e = new Q(t)), e;
  }
  k(t) {
    mt(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let o, s = 0;
    for (const r of t) s === e.length ? e.push(o = new tt(this.O(Z()), this.O(Z()), this, this.options)) : o = e[s], o._$AI(r), s++;
    s < e.length && (this._$AR(o && o._$AB.nextSibling, s), e.length = s);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var o;
    for ((o = this._$AP) == null ? void 0 : o.call(this, !1, !0, e); t !== this._$AB; ) {
      const s = _t(t).nextSibling;
      _t(t).remove(), t = s;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$Cv = t, (e = this._$AP) == null || e.call(this, t));
  }
}
class at {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, o, s, r) {
    this.type = 1, this._$AH = x, this._$AN = void 0, this.element = t, this.name = e, this._$AM = s, this.options = r, o.length > 2 || o[0] !== "" || o[1] !== "" ? (this._$AH = Array(o.length - 1).fill(new String()), this.strings = o) : this._$AH = x;
  }
  _$AI(t, e = this, o, s) {
    const r = this.strings;
    let a = !1;
    if (r === void 0) t = B(this, t, e, 0), a = !K(t) || t !== this._$AH && t !== N, a && (this._$AH = t);
    else {
      const n = t;
      let l, d;
      for (t = r[0], l = 0; l < r.length - 1; l++) d = B(this, n[o + l], e, l), d === N && (d = this._$AH[l]), a || (a = !K(d) || d !== this._$AH[l]), d === x ? t = x : t !== x && (t += (d ?? "") + r[l + 1]), this._$AH[l] = d;
    }
    a && !s && this.j(t);
  }
  j(t) {
    t === x ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class te extends at {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === x ? void 0 : t;
  }
}
class ee extends at {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== x);
  }
}
class ie extends at {
  constructor(t, e, o, s, r) {
    super(t, e, o, s, r), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = B(this, t, e, 0) ?? x) === N) return;
    const o = this._$AH, s = t === x && o !== x || t.capture !== o.capture || t.once !== o.once || t.passive !== o.passive, r = t !== x && (o === x || s);
    s && this.element.removeEventListener(this.name, this, o), r && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e;
    typeof this._$AH == "function" ? this._$AH.call(((e = this.options) == null ? void 0 : e.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class oe {
  constructor(t, e, o) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = o;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    B(this, t);
  }
}
const ht = J.litHtmlPolyfillSupport;
ht == null || ht(Q, tt), (J.litHtmlVersions ?? (J.litHtmlVersions = [])).push("3.3.3");
const se = (i, t, e) => {
  const o = (e == null ? void 0 : e.renderBefore) ?? t;
  let s = o._$litPart$;
  if (s === void 0) {
    const r = (e == null ? void 0 : e.renderBefore) ?? null;
    o._$litPart$ = s = new tt(t.insertBefore(Z(), r), r, void 0, e ?? {});
  }
  return s._$AI(i), s;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const W = globalThis;
class k extends H {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = se(e, this.renderRoot, this.renderOptions);
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
    return N;
  }
}
var zt;
k._$litElement$ = !0, k.finalized = !0, (zt = W.litElementHydrateSupport) == null || zt.call(W, { LitElement: k });
const ut = W.litElementPolyfillSupport;
ut == null || ut({ LitElement: k });
(W.litElementVersions ?? (W.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const E = (i) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(i, t);
  }) : customElements.define(i, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const re = { attribute: !0, type: String, converter: st, reflect: !1, hasChanged: bt }, ae = (i = re, t, e) => {
  const { kind: o, metadata: s } = e;
  let r = globalThis.litPropertyMetadata.get(s);
  if (r === void 0 && globalThis.litPropertyMetadata.set(s, r = /* @__PURE__ */ new Map()), o === "setter" && ((i = Object.create(i)).wrapped = !0), r.set(e.name, i), o === "accessor") {
    const { name: a } = e;
    return { set(n) {
      const l = t.get.call(this);
      t.set.call(this, n), this.requestUpdate(a, l, i, !0, n);
    }, init(n) {
      return n !== void 0 && this.C(a, void 0, i, n), n;
    } };
  }
  if (o === "setter") {
    const { name: a } = e;
    return function(n) {
      const l = this[a];
      t.call(this, n), this.requestUpdate(a, l, i, !0, n);
    };
  }
  throw Error("Unsupported decorator location: " + o);
};
function w(i) {
  return (t, e) => typeof e == "object" ? ae(i, t, e) : ((o, s, r) => {
    const a = s.hasOwnProperty(r);
    return s.constructor.createProperty(r, o), a ? Object.getOwnPropertyDescriptor(s, r) : void 0;
  })(i, t, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function h(i) {
  return w({ ...i, state: !0, attribute: !1 });
}
const ne = z`
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
class _ {
  /**
   * Snaps a world point (in meters) to grid, existing vertices, and angle guides.
   */
  static snapPoint(t, e, o = [], s, r = 0.25) {
    let a = { ...t };
    if (e.snapToElements && o.length > 0) {
      let d = r, p = null;
      for (const c of o)
        for (const u of [c.start, c.end]) {
          const g = this.distance(t, u);
          g < d && (d = g, p = u);
        }
      if (p)
        return {
          point: { x: p.x, y: p.y },
          snappedTo: "vertex"
        };
    }
    let n = !1, l;
    if (e.snapToAngles && s) {
      const d = t.x - s.x, p = t.y - s.y, c = Math.sqrt(d * d + p * p);
      if (c > 0.05) {
        let g = Math.atan2(p, d) * 180 / Math.PI;
        g < 0 && (g += 360);
        const M = 45, L = Math.round(g / M) * M;
        if (Math.abs(g - L) <= 6) {
          const G = L * Math.PI / 180;
          a = {
            x: s.x + c * Math.cos(G),
            y: s.y + c * Math.sin(G)
          }, n = !0, l = L;
        }
      }
    }
    if (e.snapToGrid && !n) {
      const d = e.size || 0.5;
      return a = {
        x: Math.round(a.x / d) * d,
        y: Math.round(a.y / d) * d
      }, { point: a, snappedTo: "grid" };
    } else if (n)
      return { point: a, snappedTo: "angle", guideAngle: l };
    return { point: t, snappedTo: "none" };
  }
  /**
   * Snaps a point to the nearest wall centerline for placing doors and windows
   */
  static snapPointToWall(t, e, o = 0.6) {
    let s = null, r = o;
    for (const a of e) {
      const n = a.end.x - a.start.x, l = a.end.y - a.start.y, d = Math.sqrt(n * n + l * l);
      if (d === 0) continue;
      const p = Math.max(0, Math.min(
        1,
        ((t.x - a.start.x) * n + (t.y - a.start.y) * l) / (d * d)
      )), c = a.start.x + p * n, u = a.start.y + p * l, g = Math.sqrt((t.x - c) ** 2 + (t.y - u) ** 2);
      g < r && (r = g, s = {
        wall: a,
        projectionPoint: { x: c, y: u },
        offset: p * d,
        distance: g,
        angleRad: Math.atan2(l, n)
      });
    }
    return s;
  }
  static distance(t, e) {
    const o = t.x - e.x, s = t.y - e.y;
    return Math.sqrt(o * o + s * s);
  }
  static roundMeters(t, e = 2) {
    const o = Math.pow(10, e);
    return Math.round(t * o) / o;
  }
}
class Tt {
  /**
   * Ray-casting algorithm to test if a 2D point is inside a polygon
   */
  static isPointInPolygon(t, e) {
    if (!e || e.length < 3) return !1;
    let o = !1;
    for (let s = 0, r = e.length - 1; s < e.length; r = s++) {
      const a = e[s].x, n = e[s].y, l = e[r].x, d = e[r].y;
      n > t.y != d > t.y && t.x < (l - a) * (t.y - n) / (d - n) + a && (o = !o);
    }
    return o;
  }
  /**
   * Finds the room containing the specified world point (if any)
   */
  static findRoomContainingPoint(t, e) {
    for (const o of e)
      if (this.isPointInPolygon(t, o.polygon))
        return o;
    return null;
  }
  /**
   * Calculates the centroid of a polygon
   */
  static calculateCentroid(t) {
    if (!t || t.length === 0) return { x: 0, y: 0 };
    let e = 0, o = 0;
    for (const s of t)
      e += s.x, o += s.y;
    return {
      x: e / t.length,
      y: o / t.length
    };
  }
}
var le = Object.defineProperty, de = Object.getOwnPropertyDescriptor, v = (i, t, e, o) => {
  for (var s = o > 1 ? void 0 : o ? de(t, e) : t, r = i.length - 1, a; r >= 0; r--)
    (a = i[r]) && (s = (o ? a(t, e, s) : a(s)) || s);
  return o && s && le(t, e, s), s;
};
let b = class extends k {
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
    }, this.activeTool = "wall", this.currentWallThickness = 0.2, this.currentOpeningWidth = 0.9, this.is3DMode = !1, this.viewport = { x: 300, y: 300, zoom: 1 }, this.isPanning = !1, this.panStart = { x: 0, y: 0 }, this.drawingWallStart = null, this.previewPoint = null, this.snapInfo = { snappedTo: "none" }, this.cursorCoords = { x: 0, y: 0 }, this.wallSnap = null, this.openingFlipSide = !1, this.openingFlipDirection = !1, this.calibrateStart = null, this.calibrateCurrent = null;
  }
  // ==========================================
  // CONVERSIONS DE COORDONNÉES
  // ==========================================
  screenToWorld(i, t) {
    const e = this.getBoundingClientRect(), o = i - e.left, s = t - e.top, r = this.project.pixelsPerMeter * this.viewport.zoom;
    return {
      x: (o - this.viewport.x) / r,
      y: (s - this.viewport.y) / r
    };
  }
  worldToScreen(i) {
    const t = this.project.pixelsPerMeter * this.viewport.zoom;
    return {
      x: i.x * t + this.viewport.x,
      y: i.y * t + this.viewport.y
    };
  }
  // ==========================================
  // GESTION DU PAN & ZOOM
  // ==========================================
  handleWheel(i) {
    i.preventDefault();
    const t = this.getBoundingClientRect(), e = i.clientX - t.left, o = i.clientY - t.top, s = i.deltaY < 0 ? 1.12 : 0.89, r = Math.min(Math.max(this.viewport.zoom * s, 0.15), 8), a = e - (e - this.viewport.x) * (r / this.viewport.zoom), n = o - (o - this.viewport.y) * (r / this.viewport.zoom);
    this.viewport = { x: a, y: n, zoom: r };
  }
  handlePointerDown(i) {
    var e, o;
    if (i.button === 1 || this.activeTool === "select" || i.shiftKey) {
      this.isPanning = !0, this.panStart = { x: i.clientX - this.viewport.x, y: i.clientY - this.viewport.y }, (o = (e = i.target).setPointerCapture) == null || o.call(e, i.pointerId);
      return;
    }
    if (i.button !== 0) return;
    const t = this.screenToWorld(i.clientX, i.clientY);
    if (this.activeTool === "wall") {
      const s = _.snapPoint(
        t,
        this.project.grid,
        this.project.walls,
        this.drawingWallStart || void 0
      );
      if (!this.drawingWallStart)
        this.drawingWallStart = s.point;
      else {
        const r = this.drawingWallStart, a = s.point;
        if (_.distance(r, a) >= 0.15) {
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
          offset: _.roundMeters(this.wallSnap.offset),
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
        const a = r.x - this.calibrateStart.x, n = r.y - this.calibrateStart.y, l = Math.sqrt(a * a + n * n);
        if (l >= 10) {
          const d = l / this.viewport.zoom;
          this.dispatchEvent(new CustomEvent("request-calibration", {
            detail: {
              pixelDistance: d,
              defaultMeters: _.roundMeters(d / this.project.pixelsPerMeter)
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
    const t = this.screenToWorld(i.clientX, i.clientY);
    if (this.cursorCoords = {
      x: _.roundMeters(t.x),
      y: _.roundMeters(t.y)
    }, this.activeTool === "wall") {
      const e = _.snapPoint(
        t,
        this.project.grid,
        this.project.walls,
        this.drawingWallStart || void 0
      );
      this.previewPoint = e.point, this.snapInfo = { snappedTo: e.snappedTo, guideAngle: e.guideAngle }, this.wallSnap = null;
    } else if (this.activeTool === "door" || this.activeTool === "window" || this.activeTool === "french_window")
      this.wallSnap = _.snapPointToWall(t, this.project.walls, 0.8), this.previewPoint = null;
    else if (this.activeTool === "calibrate" && this.calibrateStart) {
      const e = this.getBoundingClientRect();
      this.calibrateCurrent = { x: i.clientX - e.left, y: i.clientY - e.top };
    } else
      this.previewPoint = null, this.wallSnap = null;
  }
  handlePointerUp(i) {
    var t, e;
    this.isPanning && (this.isPanning = !1, (e = (t = i.target).releasePointerCapture) == null || e.call(t, i.pointerId));
  }
  // ==========================================
  // DRAG & DROP ENTITÉS HOME ASSISTANT
  // ==========================================
  handleDragOver(i) {
    i.preventDefault(), i.dataTransfer && (i.dataTransfer.dropEffect = "copy");
  }
  handleDrop(i) {
    var e, o;
    if (i.preventDefault(), (e = i.dataTransfer) != null && e.files && i.dataTransfer.files.length > 0) {
      const s = i.dataTransfer.files[0];
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
    const t = (o = i.dataTransfer) == null ? void 0 : o.getData("application/json");
    if (t)
      try {
        const { entityId: s, domain: r, name: a, icon: n } = JSON.parse(t), l = this.screenToWorld(i.clientX, i.clientY), d = Tt.findRoomContainingPoint(l, this.project.rooms), p = {
          id: `bind_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
          entityId: s,
          position: {
            x: _.roundMeters(l.x),
            y: _.roundMeters(l.y)
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
  handleEntityClick(i, t) {
    if (t.stopPropagation(), this.hass && this.hass.callService) {
      const e = i.entityId.split(".")[0];
      this.hass.callService(e, "toggle", { entity_id: i.entityId }).catch(() => {
        this.hass.callService("homeassistant", "toggle", { entity_id: i.entityId });
      });
    } else
      console.log(`[Demo Standalone] Toggle entité: ${i.entityId}`);
  }
  handleEntityDblClick(i, t) {
    t.stopPropagation(), this.dispatchEvent(new CustomEvent("hass-more-info", {
      detail: { entityId: i.entityId },
      bubbles: !0,
      composed: !0
    }));
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
  // RENDU GÉOMÉTRIQUE & 3D
  // ==========================================
  computeWallPolygon(i, t, e) {
    const o = t.x - i.x, s = t.y - i.y, r = Math.sqrt(o * o + s * s);
    if (r === 0) return [i, i, t, t];
    const a = e / 2, n = -s / r * a, l = o / r * a;
    return [
      { x: i.x + n, y: i.y + l },
      { x: t.x + n, y: t.y + l },
      { x: t.x - n, y: t.y - l },
      { x: i.x - n, y: i.y - l }
    ];
  }
  renderBackgroundLayer() {
    const i = this.project.background;
    if (!i || !i.imageUrl || !i.visible) return null;
    const t = this.worldToScreen(i.offset || { x: 0, y: 0 }), e = i.scale || 1;
    return m`
      <g 
        class="background-image-layer" 
        transform="translate(${t.x}, ${t.y}) scale(${this.viewport.zoom * e})"
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
  // Rendu des Pièces avec détection d'illumination si lumière allumée
  renderRooms() {
    return this.project.rooms.map((i) => {
      if (!i.polygon || i.polygon.length < 3) return null;
      const t = i.polygon.map((r) => this.worldToScreen(r)), e = t.map((r) => `${r.x},${r.y}`).join(" "), o = this.project.bindings.filter((r) => r.roomId === i.id && r.entityId.startsWith("light.")).some((r) => {
        var n, l, d;
        return ((d = (l = (n = this.hass) == null ? void 0 : n.states) == null ? void 0 : l[r.entityId]) == null ? void 0 : d.state) === "on";
      }), s = Tt.calculateCentroid(t);
      return m`
        <g class="room-group" data-room-id="${i.id}">
          <polygon 
            points="${e}" 
            class="room-polygon ${o ? "illuminated" : ""}"
            style="fill: ${i.color || "rgba(56, 189, 248, 0.12)"};"
          />
          <g class="room-label-group" transform="translate(${s.x}, ${s.y})">
            <text class="room-label-name" y="-6">${i.name}</text>
            <text class="room-label-area" y="12">${i.areaM2.toFixed(1)} m²</text>
          </g>
        </g>
      `;
    });
  }
  renderGrid() {
    if (this.is3DMode) return null;
    const i = this.project.pixelsPerMeter * this.viewport.zoom, e = (this.project.grid.size || 0.5) * i;
    if (e < 12) return null;
    const o = e * 2;
    return m`
      <defs>
        <pattern id="grid-sub" width="${e}" height="${e}" patternUnits="userSpaceOnUse"
          patternTransform="translate(${this.viewport.x % e}, ${this.viewport.y % e})">
          <line x1="0" y1="0" x2="${e}" y2="0" stroke="rgba(255,255,255,0.06)" stroke-width="0.5" />
          <line x1="0" y1="0" x2="0" y2="${e}" stroke="rgba(255,255,255,0.06)" stroke-width="0.5" />
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
    this.project.pixelsPerMeter * this.viewport.zoom;
    const i = this.is3DMode ? 40 * this.viewport.zoom : 0;
    return this.project.walls.map((t) => {
      const o = this.computeWallPolygon(t.start, t.end, t.thickness).map((d) => this.worldToScreen(d)), s = this.worldToScreen(t.start), r = this.worldToScreen(t.end), a = o.map((d) => `${d.x},${d.y}`).join(" "), n = _.distance(t.start, t.end), l = {
        x: (s.x + r.x) / 2,
        y: (s.y + r.y) / 2
      };
      if (this.is3DMode) {
        const d = o.map((c) => ({ x: c.x, y: c.y - i })), p = d.map((c) => `${c.x},${c.y}`).join(" ");
        return m`
          <g class="wall-element-3d" data-wall-id="${t.id}">
            <!-- Paroi latérale ombrée 1 -->
            <polygon points="${o[0].x},${o[0].y} ${o[1].x},${o[1].y} ${d[1].x},${d[1].y} ${d[0].x},${d[0].y}" class="wall-3d-side-shaded" />
            <!-- Paroi latérale ombrée 2 -->
            <polygon points="${o[1].x},${o[1].y} ${o[2].x},${o[2].y} ${d[2].x},${d[2].y} ${d[1].x},${d[1].y}" class="wall-3d-side-light" />
            <!-- Chapeau supérieur du mur -->
            <polygon points="${p}" class="wall-3d-top" />
          </g>
        `;
      }
      return m`
        <g class="wall-element" data-wall-id="${t.id}">
          <polygon points="${a}" class="wall-rect" />
          <line x1="${s.x}" y1="${s.y}" x2="${r.x}" y2="${r.y}" class="wall-centerline" />
          
          ${n >= 0.6 ? m`
            <g class="dimension-badge" transform="translate(${l.x}, ${l.y - 14})">
              <rect x="-26" y="-10" width="52" height="20" />
              <text>${_.roundMeters(n).toFixed(2)} m</text>
            </g>
          ` : null}
        </g>
      `;
    });
  }
  renderOpenings() {
    return this.project.openings.map((i) => {
      const t = this.project.walls.find((g) => g.id === i.wallId);
      if (!t) return null;
      const e = t.end.x - t.start.x, o = t.end.y - t.start.y, s = Math.sqrt(e * e + o * o);
      if (s === 0) return null;
      const a = Math.atan2(o, e) * 180 / Math.PI, n = t.start.x + i.offset / s * e, l = t.start.y + i.offset / s * o, d = this.worldToScreen({ x: n, y: l }), p = this.project.pixelsPerMeter * this.viewport.zoom, c = i.width * p, u = t.thickness * p;
      return m`
        <g 
          class="opening-element" 
          transform="translate(${d.x}, ${d.y}) rotate(${a})"
        >
          <rect 
            x="${-c / 2}" 
            y="${-u / 2 - 1}" 
            width="${c}" 
            height="${u + 2}" 
            class="wall-cutout"
          />

          ${i.type === "door" ? this.renderDoorSymbol(c, u, i.flipSide, i.flipDirection) : null}
          ${i.type === "window" ? this.renderWindowSymbol(c, u) : null}
          ${i.type === "french_window" ? this.renderFrenchWindowSymbol(c, u) : null}
        </g>
      `;
    });
  }
  renderDoorSymbol(i, t, e, o) {
    const s = i / 2, r = e ? -1 : 1, a = o ? s : -s, n = o ? -1 : 1;
    return m`
      <g>
        <rect x="${-s}" y="${-t / 2}" width="4" height="${t}" fill="#94a3b8" />
        <rect x="${s - 4}" y="${-t / 2}" width="4" height="${t}" fill="#94a3b8" />
        <line 
          x1="${a}" 
          y1="0" 
          x2="${a}" 
          y2="${r * i}" 
          class="opening-door-leaf" 
        />
        <path 
          d="M ${a + n * i} 0 A ${i} ${i} 0 0 ${r > 0 ? o ? 0 : 1 : o ? 1 : 0} ${a} ${r * i}" 
          class="opening-door-arc" 
        />
      </g>
    `;
  }
  renderWindowSymbol(i, t) {
    const e = i / 2;
    return m`
      <g>
        <rect x="${-e}" y="${-t / 2}" width="${i}" height="${t}" fill="none" class="opening-window-frame" />
        <line x1="${-e}" y1="0" x2="${e}" y2="0" class="opening-window-glass" />
        <line x1="${-e + 4}" y1="${-t / 4}" x2="${e - 4}" y2="${-t / 4}" stroke="rgba(56, 189, 248, 0.4)" stroke-width="1" />
        <line x1="${-e + 4}" y1="${t / 4}" x2="${e - 4}" y2="${t / 4}" stroke="rgba(56, 189, 248, 0.4)" stroke-width="1" />
      </g>
    `;
  }
  renderFrenchWindowSymbol(i, t) {
    const e = i / 2;
    return m`
      <g>
        <rect x="${-e}" y="${-t / 2}" width="${i}" height="${t}" fill="none" class="opening-window-frame" />
        <rect x="${-e}" y="${-t / 4}" width="${e}" height="3" fill="#38bdf8" />
        <rect x="0" y="${t / 4}" width="${e}" height="3" fill="#38bdf8" />
      </g>
    `;
  }
  // ==========================================
  // RENDU DES PINS D'ENTITÉS HOME ASSISTANT
  // ==========================================
  renderEntityBindings() {
    return this.project.bindings.map((i) => {
      var l, d, p;
      const t = this.worldToScreen(i.position), e = (d = (l = this.hass) == null ? void 0 : l.states) == null ? void 0 : d[i.entityId], o = (e == null ? void 0 : e.state) || "off", s = i.entityId.startsWith("light.") && o === "on", r = i.entityId.startsWith("binary_sensor.") && (o === "on" || o === "detected"), a = i.entityId.startsWith("sensor.") || i.entityId.startsWith("climate."), n = ((p = e == null ? void 0 : e.attributes) == null ? void 0 : p.unit_of_measurement) || (a ? "°" : "");
      return m`
        <g 
          class="entity-pin ${s ? "active-light" : ""} ${r ? "active-radar" : ""}"
          transform="translate(${t.x}, ${t.y})"
          @click=${(c) => this.handleEntityClick(i, c)}
          @dblclick=${(c) => this.handleEntityDblClick(i, c)}
          title="${i.customName || i.entityId} : ${o} (Clic pour basculer)"
        >
          <!-- Onde radar animée si mouvement détecté -->
          ${r ? m`<circle cx="0" cy="0" r="16" class="radar-pulse-ring" />` : null}

          <!-- Pastille de fond -->
          <circle cx="0" cy="0" r="16" class="entity-pin-bg" />

          <!-- Pictogramme -->
          <text x="0" y="0" class="entity-pin-icon">
            ${i.icon || "⚡"}
          </text>

          <!-- Étiquette Nom -->
          <text x="0" y="27" class="entity-pin-label">
            ${i.customName || i.entityId.split(".")[1]}
          </text>

          <!-- Badge Valeur (Thermostat / Capteur) -->
          ${a && o !== "unknown" ? m`
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
    const i = this.project.pixelsPerMeter * this.viewport.zoom, t = (this.currentOpeningWidth || 0.9) * i, e = this.wallSnap.wall.thickness * i, o = this.worldToScreen(this.wallSnap.projectionPoint), s = this.wallSnap.angleRad * 180 / Math.PI;
    return m`
      <g 
        class="opening-preview" 
        transform="translate(${o.x}, ${o.y}) rotate(${s})"
      >
        <rect x="${-t / 2}" y="${-e / 2}" width="${t}" height="${e}" fill="rgba(56, 189, 248, 0.3)" stroke="#38bdf8" stroke-dasharray="4, 2" />
        ${this.activeTool === "door" ? this.renderDoorSymbol(t, e, this.openingFlipSide, this.openingFlipDirection) : null}
        ${this.activeTool === "window" ? this.renderWindowSymbol(t, e) : null}
        ${this.activeTool === "french_window" ? this.renderFrenchWindowSymbol(t, e) : null}
      </g>
    `;
  }
  renderPreviewWall() {
    if (!this.drawingWallStart || !this.previewPoint) return null;
    const t = this.computeWallPolygon(
      this.drawingWallStart,
      this.previewPoint,
      this.currentWallThickness
    ).map((n) => this.worldToScreen(n)), e = this.worldToScreen(this.drawingWallStart), o = this.worldToScreen(this.previewPoint), s = t.map((n) => `${n.x},${n.y}`).join(" "), r = _.distance(this.drawingWallStart, this.previewPoint), a = {
      x: (e.x + o.x) / 2,
      y: (e.y + o.y) / 2
    };
    return m`
      <g class="preview-wall-group">
        <polygon points="${s}" class="preview-wall-rect" />
        <line x1="${e.x}" y1="${e.y}" x2="${o.x}" y2="${o.y}" class="preview-wall-line" />

        ${this.snapInfo.guideAngle !== void 0 ? m`
          <line x1="${e.x}" y1="${e.y}" x2="${o.x}" y2="${o.y}" class="angle-guide-line" />
        ` : null}

        <g class="dimension-badge" transform="translate(${a.x}, ${a.y - 16})">
          <rect x="-30" y="-11" width="60" height="22" />
          <text>${_.roundMeters(r).toFixed(2)} m</text>
        </g>
      </g>
    `;
  }
  renderCalibrationLine() {
    if (!this.calibrateStart || !this.calibrateCurrent) return null;
    const i = this.calibrateStart, t = this.calibrateCurrent, e = t.x - i.x, o = t.y - i.y, s = Math.sqrt(e * e + o * o), r = { x: (i.x + t.x) / 2, y: (i.y + t.y) / 2 };
    return m`
      <g class="calibration-preview-group">
        <line x1="${i.x}" y1="${i.y}" x2="${t.x}" y2="${t.y}" class="calibration-line" />
        <circle cx="${i.x}" cy="${i.y}" r="6" class="calibration-endpoint" />
        <circle cx="${t.x}" cy="${t.y}" r="6" class="calibration-endpoint" />

        <g class="dimension-badge" transform="translate(${r.x}, ${r.y - 18})">
          <rect x="-35" y="-11" width="70" height="22" style="stroke: #f59e0b;" />
          <text style="fill: #f59e0b;">${Math.round(s)} px</text>
        </g>
      </g>
    `;
  }
  renderSnapIndicator() {
    if (!this.previewPoint || this.snapInfo.snappedTo === "none") return null;
    const i = this.worldToScreen(this.previewPoint), t = this.snapInfo.snappedTo === "vertex";
    return m`
      <g transform="translate(${i.x}, ${i.y})">
        <circle r="${t ? 7 : 5}" class="snap-indicator" />
        ${t ? m`<circle r="2" fill="#38bdf8" />` : null}
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
    return this.is3DMode ? "Vue 3D Isométrique : Murs extrudés avec éclairage dynamique." : this.activeTool === "wall" ? this.drawingWallStart ? "Cliquez pour terminer le mur. Échap pour annuler." : "Cliquez pour démarrer un mur." : this.activeTool === "door" ? "Survolez un mur. Espace = inverser intérieur/extérieur. F = gauche/droite." : this.activeTool === "window" || this.activeTool === "french_window" ? "Survolez un mur pour insérer la fenêtre." : this.activeTool === "calibrate" ? this.calibrateStart ? "Cliquez sur la 2ème extrémité du mur mesuré." : "Tracez un segment sur un mur pour étalonner l'échelle." : null;
  }
  render() {
    const i = this.getHelpMessage();
    return f`
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
            ${this.renderSnapIndicator()}
            ${this.renderEntityBindings()}
          </svg>
        </div>

        ${i ? f`<div class="help-hud">${i}</div>` : null}

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
b.styles = ne;
v([
  w({ type: Object })
], b.prototype, "hass", 2);
v([
  w({ type: Object })
], b.prototype, "project", 2);
v([
  w({ type: String })
], b.prototype, "activeTool", 2);
v([
  w({ type: Number })
], b.prototype, "currentWallThickness", 2);
v([
  w({ type: Number })
], b.prototype, "currentOpeningWidth", 2);
v([
  w({ type: Boolean })
], b.prototype, "is3DMode", 2);
v([
  h()
], b.prototype, "viewport", 2);
v([
  h()
], b.prototype, "isPanning", 2);
v([
  h()
], b.prototype, "drawingWallStart", 2);
v([
  h()
], b.prototype, "previewPoint", 2);
v([
  h()
], b.prototype, "snapInfo", 2);
v([
  h()
], b.prototype, "cursorCoords", 2);
v([
  h()
], b.prototype, "wallSnap", 2);
v([
  h()
], b.prototype, "openingFlipSide", 2);
v([
  h()
], b.prototype, "openingFlipDirection", 2);
v([
  h()
], b.prototype, "calibrateStart", 2);
v([
  h()
], b.prototype, "calibrateCurrent", 2);
b = v([
  E("home-architect-canvas")
], b);
var ce = Object.defineProperty, pe = Object.getOwnPropertyDescriptor, nt = (i, t, e, o) => {
  for (var s = o > 1 ? void 0 : o ? pe(t, e) : t, r = i.length - 1, a; r >= 0; r--)
    (a = i[r]) && (s = (o ? a(t, e, s) : a(s)) || s);
  return o && s && ce(t, e, s), s;
};
let q = class extends k {
  constructor() {
    super(...arguments), this.activeTool = "wall", this.position = { x: 20, y: 20 }, this.isDragging = !1, this.dragStartPointer = { x: 0, y: 0 }, this.dragStartPosition = { x: 20, y: 20 };
  }
  connectedCallback() {
    super.connectedCallback();
    try {
      const i = localStorage.getItem("home_architect_toolbar_pos");
      if (i) {
        const t = JSON.parse(i);
        typeof t.x == "number" && typeof t.y == "number" && (this.position = t);
      }
    } catch {
    }
    this.updateHostPosition();
  }
  updated(i) {
    super.updated(i), i.has("position") && this.updateHostPosition();
  }
  updateHostPosition() {
    this.style.left = `${this.position.x}px`, this.style.top = `${this.position.y}px`;
  }
  handleDragStart(i) {
    if (i.button !== 0) return;
    i.preventDefault(), i.stopPropagation(), this.isDragging = !0, this.dragStartPointer = { x: i.clientX, y: i.clientY }, this.dragStartPosition = { ...this.position }, i.currentTarget.setPointerCapture(i.pointerId);
  }
  handleDragMove(i) {
    if (!this.isDragging) return;
    i.preventDefault(), i.stopPropagation();
    const t = i.clientX - this.dragStartPointer.x, e = i.clientY - this.dragStartPointer.y, s = (this.parentElement || document.body).getBoundingClientRect(), r = this.getBoundingClientRect(), a = 8, n = Math.max(a, s.width - r.width - 8), l = 8, d = Math.max(l, s.height - r.height - 8), p = Math.min(Math.max(this.dragStartPosition.x + t, a), n), c = Math.min(Math.max(this.dragStartPosition.y + e, l), d);
    this.position = { x: Math.round(p), y: Math.round(c) }, this.updateHostPosition();
  }
  handleDragEnd(i) {
    if (this.isDragging) {
      this.isDragging = !1;
      try {
        i.currentTarget.releasePointerCapture(i.pointerId);
      } catch {
      }
      try {
        localStorage.setItem("home_architect_toolbar_pos", JSON.stringify(this.position));
      } catch {
      }
    }
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
  openImportModal() {
    this.dispatchEvent(new CustomEvent("open-import-modal", {
      bubbles: !0,
      composed: !0
    }));
  }
  render() {
    return f`
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
q.styles = z`
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
nt([
  w({ type: String })
], q.prototype, "activeTool", 2);
nt([
  h()
], q.prototype, "position", 2);
nt([
  h()
], q.prototype, "isDragging", 2);
q = nt([
  E("home-architect-toolbar")
], q);
var he = Object.defineProperty, ue = Object.getOwnPropertyDescriptor, j = (i, t, e, o) => {
  for (var s = o > 1 ? void 0 : o ? ue(t, e) : t, r = i.length - 1, a; r >= 0; r--)
    (a = i[r]) && (s = (o ? a(t, e, s) : a(s)) || s);
  return o && s && he(t, e, s), s;
};
const C = [
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
let D = class extends k {
  constructor() {
    super(...arguments), this.selectedTemplate = C[0], this.width = C[0].widthMeters, this.length = C[0].lengthMeters, this.thickness = C[0].wallThickness, this.addDoor = C[0].addDoor, this.addWindow = C[0].addWindow, this.roomName = C[0].name;
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
    return f`
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
          ${C.map((t) => f`
            <div 
              class="template-card ${this.selectedTemplate.id === t.id ? "selected" : ""}"
              @click=${() => this.selectTemplate(t)}
            >
              <div class="template-icon">${t.icon}</div>
              <div class="template-name">${t.name}</div>
              <div class="template-dims">${t.widthMeters}m × ${t.lengthMeters}m</div>
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
              @input=${(t) => this.roomName = t.target.value}
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
                @input=${(t) => this.width = parseFloat(t.target.value) || 1}
              />
              <span>m ×</span>
              <input 
                type="number" 
                step="0.1" 
                min="1" 
                max="30"
                .value=${this.length}
                @input=${(t) => this.length = parseFloat(t.target.value) || 1}
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
              @change=${(t) => this.thickness = parseFloat(t.target.value)}
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
                @change=${(t) => this.addDoor = t.target.checked}
              />
              <span>Porte standard (0.90 m)</span>
            </label>

            <label>
              <input 
                type="checkbox" 
                ?checked=${this.addWindow} 
                @change=${(t) => this.addWindow = t.target.checked}
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
D.styles = z`
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
j([
  h()
], D.prototype, "selectedTemplate", 2);
j([
  h()
], D.prototype, "width", 2);
j([
  h()
], D.prototype, "length", 2);
j([
  h()
], D.prototype, "thickness", 2);
j([
  h()
], D.prototype, "addDoor", 2);
j([
  h()
], D.prototype, "addWindow", 2);
j([
  h()
], D.prototype, "roomName", 2);
D = j([
  E("home-architect-wizard-modal")
], D);
var ge = Object.defineProperty, fe = Object.getOwnPropertyDescriptor, lt = (i, t, e, o) => {
  for (var s = o > 1 ? void 0 : o ? fe(t, e) : t, r = i.length - 1, a; r >= 0; r--)
    (a = i[r]) && (s = (o ? a(t, e, s) : a(s)) || s);
  return o && s && ge(t, e, s), s;
};
let V = class extends k {
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
    return f`
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
                @input=${(t) => this.realMeters = parseFloat(t.target.value) || 0}
                @keydown=${(t) => t.key === "Enter" && this.handleApply()}
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
V.styles = z`
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
lt([
  w({ type: Number })
], V.prototype, "pixelDistance", 2);
lt([
  w({ type: Number })
], V.prototype, "defaultMeters", 2);
lt([
  h()
], V.prototype, "realMeters", 2);
V = lt([
  E("home-architect-calibrate-modal")
], V);
var be = Object.defineProperty, me = Object.getOwnPropertyDescriptor, et = (i, t, e, o) => {
  for (var s = o > 1 ? void 0 : o ? me(t, e) : t, r = i.length - 1, a; r >= 0; r--)
    (a = i[r]) && (s = (o ? a(t, e, s) : a(s)) || s);
  return o && s && be(t, e, s), s;
};
const At = {
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
let U = class extends k {
  constructor() {
    super(...arguments), this.collapsed = !1, this.searchQuery = "", this.activeCategory = "all";
  }
  getEntities() {
    var i;
    return (i = this.hass) != null && i.states ? Object.values(this.hass.states).map((t) => {
      var s, r;
      const e = t.entity_id.split(".")[0], o = At[e] || At.default;
      return {
        entity_id: t.entity_id,
        name: ((s = t.attributes) == null ? void 0 : s.friendly_name) || t.entity_id,
        state: t.state,
        domain: e,
        icon: o,
        unit: (r = t.attributes) == null ? void 0 : r.unit_of_measurement
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
  handleDragStart(i, t) {
    i.dataTransfer && (i.dataTransfer.setData("application/json", JSON.stringify({
      entityId: t.entity_id,
      domain: t.domain,
      name: t.name,
      icon: t.icon
    })), i.dataTransfer.effectAllowed = "copy");
  }
  toggleCollapse() {
    this.dispatchEvent(new CustomEvent("toggle-collapse", {
      bubbles: !0,
      composed: !0
    }));
  }
  render() {
    if (this.collapsed) return null;
    let t = this.getEntities();
    if (this.activeCategory !== "all" && (t = t.filter((e) => e.domain === this.activeCategory)), this.searchQuery.trim()) {
      const e = this.searchQuery.toLowerCase();
      t = t.filter((o) => o.name.toLowerCase().includes(e) || o.entity_id.toLowerCase().includes(e));
    }
    return f`
      <div class="drawer-header">
        <div class="drawer-title">
          <span>⚡</span>
          <span>Entités HA</span>
          <span class="count-badge">${t.length}</span>
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
            @input=${(e) => this.searchQuery = e.target.value}
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
        ${t.length === 0 ? f`
          <div class="empty-message">Aucune entité trouvée</div>
        ` : t.map((e) => f`
          <div 
            class="entity-card" 
            draggable="true"
            @dragstart=${(o) => this.handleDragStart(o, e)}
            title="Glissez et déposez sur une pièce du plan"
          >
            <div class="entity-info">
              <span class="entity-icon">${e.icon}</span>
              <div class="entity-details">
                <span class="entity-name">${e.name}</span>
                <span class="entity-id">${e.entity_id}</span>
              </div>
            </div>

            <span class="entity-state-badge ${e.state === "on" ? "state-on" : "state-off"}">
              ${e.state}${e.unit ? " " + e.unit : ""}
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
U.styles = z`
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
et([
  w({ type: Object })
], U.prototype, "hass", 2);
et([
  w({ type: Boolean, reflect: !0 })
], U.prototype, "collapsed", 2);
et([
  h()
], U.prototype, "searchQuery", 2);
et([
  h()
], U.prototype, "activeCategory", 2);
U = et([
  E("home-architect-entity-drawer")
], U);
var xe = Object.defineProperty, ve = Object.getOwnPropertyDescriptor, P = (i, t, e, o) => {
  for (var s = o > 1 ? void 0 : o ? ve(t, e) : t, r = i.length - 1, a; r >= 0; r--)
    (a = i[r]) && (s = (o ? a(t, e, s) : a(s)) || s);
  return o && s && xe(t, e, s), s;
};
let S = class extends k {
  constructor() {
    super(...arguments), this.currentLevel = "rdc", this.imageDataUrl = null, this.imageWidth = 0, this.imageHeight = 0, this.imageName = "", this.calibrateMode = "auto_dimension", this.totalWidthMeters = 12, this.opacity = 0.4, this.isDragOver = !1, this.fileInputRef = null, this._boundPasteListener = null;
  }
  connectedCallback() {
    super.connectedCallback(), this._boundPasteListener = this.handleModalPaste.bind(this), window.addEventListener("paste", this._boundPasteListener);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._boundPasteListener && window.removeEventListener("paste", this._boundPasteListener);
  }
  handleModalPaste(i) {
    if (!i.clipboardData) return;
    const t = i.clipboardData.items;
    for (let e = 0; e < t.length; e++)
      if (t[e].type.indexOf("image") !== -1) {
        const o = t[e].getAsFile();
        if (o) {
          i.preventDefault(), this.processFile(o);
          return;
        }
      }
  }
  triggerFileInput() {
    if (!this.fileInputRef) {
      const i = document.createElement("input");
      i.type = "file", i.accept = "image/*", i.style.display = "none", i.addEventListener("change", (t) => {
        var o;
        const e = (o = t.target.files) == null ? void 0 : o[0];
        e && this.processFile(e);
      }), this.fileInputRef = i;
    }
    this.fileInputRef.click();
  }
  processFile(i) {
    this.imageName = i.name || "Plan importé";
    const t = new FileReader();
    t.onload = (e) => {
      var r;
      const o = (r = e.target) == null ? void 0 : r.result, s = new Image();
      s.onload = () => {
        this.imageDataUrl = o, this.imageWidth = s.naturalWidth, this.imageHeight = s.naturalHeight;
      }, s.src = o;
    }, t.readAsDataURL(i);
  }
  handleDrop(i) {
    var t;
    if (i.preventDefault(), this.isDragOver = !1, (t = i.dataTransfer) != null && t.files && i.dataTransfer.files.length > 0) {
      const e = i.dataTransfer.files[0];
      e.type.startsWith("image/") && this.processFile(e);
    }
  }
  handleDragOver(i) {
    i.preventDefault(), this.isDragOver = !0;
  }
  handleDragLeave() {
    this.isDragOver = !1;
  }
  async handlePasteButtonClick() {
    try {
      if (navigator.clipboard && navigator.clipboard.read) {
        const i = await navigator.clipboard.read();
        for (const t of i) {
          const e = t.types.find((o) => o.startsWith("image/"));
          if (e) {
            const o = await t.getType(e), s = new File([o], "clipboard_image.png", { type: e });
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
    return f`
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
          ${this.imageDataUrl ? f`
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
          ` : f`
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

              <div class="drop-actions" @click=${(i) => i.stopPropagation()}>
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

                  ${this.calibrateMode === "auto_dimension" ? f`
                    <div class="input-row" @click=${(i) => i.stopPropagation()}>
                      <label style="font-size: 0.82rem; color: #94a3b8;">Largeur totale :</label>
                      <input 
                        type="number" 
                        step="0.5" 
                        min="1" 
                        max="100" 
                        class="dimension-input"
                        .value=${this.totalWidthMeters}
                        @input=${(i) => this.totalWidthMeters = parseFloat(i.target.value) || 10}
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
              @input=${(i) => this.opacity = parseFloat(i.target.value)}
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
S.styles = z`
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
P([
  w({ type: String })
], S.prototype, "currentLevel", 2);
P([
  h()
], S.prototype, "imageDataUrl", 2);
P([
  h()
], S.prototype, "imageWidth", 2);
P([
  h()
], S.prototype, "imageHeight", 2);
P([
  h()
], S.prototype, "imageName", 2);
P([
  h()
], S.prototype, "calibrateMode", 2);
P([
  h()
], S.prototype, "totalWidthMeters", 2);
P([
  h()
], S.prototype, "opacity", 2);
P([
  h()
], S.prototype, "isDragOver", 2);
S = P([
  E("home-architect-import-modal")
], S);
var ye = Object.defineProperty, we = Object.getOwnPropertyDescriptor, $ = (i, t, e, o) => {
  for (var s = o > 1 ? void 0 : o ? we(t, e) : t, r = i.length - 1, a; r >= 0; r--)
    (a = i[r]) && (s = (o ? a(t, e, s) : a(s)) || s);
  return o && s && ye(t, e, s), s;
};
let y = class extends k {
  constructor() {
    super(...arguments), this.narrow = !1, this.activeTool = "wall", this.currentThickness = 0.2, this.currentOpeningWidth = 0.9, this.activeLevel = "rdc", this.is3DMode = !1, this.isDrawerCollapsed = !1, this.isWizardOpen = !1, this.isImportModalOpen = !1, this.isCalibrateModalOpen = !1, this.calibrationData = null, this.project = {
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
  handleCreateRoomFromWizard(i) {
    const { name: t, width: e, length: o, thickness: s, color: r, icon: a, addDoor: n, addWindow: l } = i.detail, d = 2, p = 2, c = { x: d, y: p }, u = { x: d + e, y: p }, g = { x: d + e, y: p + o }, M = { x: d, y: p + o }, L = {
      id: `w_top_${Date.now()}`,
      start: c,
      end: u,
      thickness: s,
      type: "standard"
    }, xt = {
      id: `w_right_${Date.now()}`,
      start: u,
      end: g,
      thickness: s,
      type: "standard"
    }, G = {
      id: `w_bottom_${Date.now()}`,
      start: g,
      end: M,
      thickness: s,
      type: "standard"
    }, Ut = {
      id: `w_left_${Date.now()}`,
      start: M,
      end: c,
      thickness: s,
      type: "standard"
    }, dt = [];
    n && dt.push({
      id: `op_door_${Date.now()}`,
      wallId: G.id,
      type: "door",
      offset: e / 2,
      width: 0.9,
      flipSide: !1,
      flipDirection: !1
    }), l && dt.push({
      id: `op_win_${Date.now()}`,
      wallId: L.id,
      type: "window",
      offset: e / 2,
      width: 1.2,
      flipSide: !1,
      flipDirection: !1
    });
    const Ft = {
      id: `room_${Date.now()}`,
      name: t,
      polygon: [c, u, g, M],
      areaM2: e * o,
      color: r,
      icon: a
    };
    this.project = {
      ...this.project,
      walls: [...this.project.walls, L, xt, G, Ut],
      openings: [...this.project.openings, ...dt],
      rooms: [...this.project.rooms, Ft]
    }, this.isWizardOpen = !1, this.activeTool = "select";
  }
  connectedCallback() {
    super.connectedCallback(), this._boundPaste = this.handlePaste.bind(this), window.addEventListener("paste", this._boundPaste);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._boundPaste && window.removeEventListener("paste", this._boundPaste), this.toastTimeout && clearTimeout(this.toastTimeout);
  }
  showToast(i) {
    this.toastMessage = i, this.toastTimeout && clearTimeout(this.toastTimeout), this.toastTimeout = setTimeout(() => {
      this.toastMessage = null;
    }, 4500);
  }
  loadBackgroundImage(i, t = "Plan chargé !") {
    const e = new Image();
    e.onload = () => {
      this.project = {
        ...this.project,
        background: {
          imageUrl: i,
          opacity: 0.4,
          visible: !0,
          offset: { x: 0, y: 0 },
          scale: 1,
          rotation: 0,
          widthPx: e.naturalWidth,
          heightPx: e.naturalHeight
        }
      }, this.activeTool = "calibrate", this.showToast(`${t} Tracez un segment sur un mur mesuré pour étalonner l'échelle (📏).`);
    }, e.onerror = () => {
      this.showToast("❌ Erreur lors du chargement de l'image.");
    }, e.src = i;
  }
  handleImportConfirmed(i) {
    const { dataUrl: t, widthPx: e, heightPx: o, opacity: s, mode: r, totalWidthMeters: a } = i.detail;
    this.isImportModalOpen = !1;
    let n = this.project.pixelsPerMeter;
    r === "auto_dimension" && a && a > 0 && (n = Math.round(e / a * 10) / 10), this.project = {
      ...this.project,
      pixelsPerMeter: n,
      background: {
        imageUrl: t,
        opacity: s !== void 0 ? s : 0.4,
        visible: !0,
        offset: { x: 0, y: 0 },
        scale: 1,
        rotation: 0,
        widthPx: e,
        heightPx: o
      }
    }, r === "auto_dimension" ? (this.activeTool = "wall", this.showToast(`✅ Plan importé et étalonné automatiquement (1 m = ${n} px) ! Vous pouvez tracer vos murs (🧱).`)) : (this.activeTool = "calibrate", this.showToast("📏 Plan importé ! Tracez un segment sur un mur mesuré pour étalonner l'échelle."));
  }
  handlePaste(i) {
    var o;
    if (this.isImportModalOpen || !i.clipboardData) return;
    const t = i.clipboardData.items;
    for (let s = 0; s < t.length; s++)
      if (t[s].type.indexOf("image") !== -1) {
        const r = t[s].getAsFile();
        if (r) {
          i.preventDefault();
          const a = new FileReader();
          a.onload = (n) => {
            var d;
            const l = (d = n.target) == null ? void 0 : d.result;
            this.loadBackgroundImage(l, "📋 Image collée depuis le presse-papier !");
          }, a.readAsDataURL(r);
          return;
        }
      }
    const e = (o = i.clipboardData.getData("text/plain")) == null ? void 0 : o.trim();
    e && (e.startsWith("data:image/") || e.match(/\.(png|jpe?g|svg|webp)(\?.*)?$/i)) && (i.preventDefault(), this.loadBackgroundImage(e, "📋 Image chargée depuis l'URL collée !"));
  }
  triggerFileInput() {
    if (!this.fileInputRef) {
      const i = document.createElement("input");
      i.type = "file", i.accept = "image/*", i.style.display = "none", i.addEventListener("change", (t) => this.handleFileSelected(t)), document.body.appendChild(i), this.fileInputRef = i;
    }
    this.fileInputRef.click();
  }
  handleFileSelected(i) {
    var o;
    const t = (o = i.target.files) == null ? void 0 : o[0];
    if (!t) return;
    const e = new FileReader();
    e.onload = (s) => {
      var a;
      const r = (a = s.target) == null ? void 0 : a.result;
      this.loadBackgroundImage(r, "🖼️ Image importée depuis votre ordinateur !");
    }, e.readAsDataURL(t);
  }
  handleRequestCalibration(i) {
    this.calibrationData = i.detail, this.isCalibrateModalOpen = !0;
  }
  handleCalibrateConfirmed(i) {
    const { pixelsPerMeter: t } = i.detail;
    this.project = {
      ...this.project,
      pixelsPerMeter: Math.round(t * 10) / 10
    }, this.isCalibrateModalOpen = !1, this.calibrationData = null, this.activeTool = "wall";
  }
  handleOpacityChange(i) {
    const t = parseFloat(i.target.value);
    this.project.background && (this.project = {
      ...this.project,
      background: { ...this.project.background, opacity: t }
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
    var t, e;
    const i = !!((t = this.project.background) != null && t.imageUrl);
    return f`
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
          ${this.activeTool === "wall" ? f`
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
          ${this.activeTool === "door" || this.activeTool === "window" || this.activeTool === "french_window" ? f`
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

          <!-- Opacité du fond -->
          ${i ? f`
            <div class="control-group">
              <label>Fond :</label>
              <input 
                type="range" 
                min="0.05" 
                max="1.0" 
                step="0.05" 
                .value=${((e = this.project.background) == null ? void 0 : e.opacity) || 0.4}
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
            @project-changed=${this.handleProjectChanged}
            @request-calibration=${this.handleRequestCalibration}
            @background-image-loaded=${(o) => this.loadBackgroundImage(o.detail.dataUrl, "🖼️ Image de plan glissée-déposée !")}
          ></home-architect-canvas>

          <!-- Notification Toast -->
          ${this.toastMessage ? f`
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
      ${this.isImportModalOpen ? f`
        <home-architect-import-modal
          .currentLevel=${this.activeLevel}
          @import-confirmed=${this.handleImportConfirmed}
          @close=${() => this.isImportModalOpen = !1}
        ></home-architect-import-modal>
      ` : null}

      <!-- Modal Assistant Pièce Débutant -->
      ${this.isWizardOpen ? f`
        <home-architect-wizard-modal
          @create-room=${this.handleCreateRoomFromWizard}
          @close=${() => this.isWizardOpen = !1}
        ></home-architect-wizard-modal>
      ` : null}

      <!-- Modal Étalonnage Mesure de Mur -->
      ${this.isCalibrateModalOpen && this.calibrationData ? f`
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
y.styles = z`
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
$([
  w({ type: Object })
], y.prototype, "hass", 2);
$([
  w({ type: Boolean })
], y.prototype, "narrow", 2);
$([
  h()
], y.prototype, "activeTool", 2);
$([
  h()
], y.prototype, "currentThickness", 2);
$([
  h()
], y.prototype, "currentOpeningWidth", 2);
$([
  h()
], y.prototype, "activeLevel", 2);
$([
  h()
], y.prototype, "is3DMode", 2);
$([
  h()
], y.prototype, "isDrawerCollapsed", 2);
$([
  h()
], y.prototype, "isWizardOpen", 2);
$([
  h()
], y.prototype, "isImportModalOpen", 2);
$([
  h()
], y.prototype, "isCalibrateModalOpen", 2);
$([
  h()
], y.prototype, "calibrationData", 2);
$([
  h()
], y.prototype, "project", 2);
$([
  h()
], y.prototype, "toastMessage", 2);
y = $([
  E("home-architect-panel")
], y);
var $e = Object.defineProperty, _e = Object.getOwnPropertyDescriptor, it = (i, t, e, o) => {
  for (var s = o > 1 ? void 0 : o ? _e(t, e) : t, r = i.length - 1, a; r >= 0; r--)
    (a = i[r]) && (s = (o ? a(t, e, s) : a(s)) || s);
  return o && s && $e(t, e, s), s;
};
let F = class extends k {
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
  setConfig(i) {
    if (!i) throw new Error("Configuration invalide");
    this.config = i, this.is3DMode = i.view_mode === "3d";
  }
  getCardSize() {
    return 6;
  }
  firstUpdated() {
    this.loadProject();
  }
  async loadProject() {
    var e;
    const i = this.config.project_id || "rdc";
    if (this.hass && this.hass.callWS)
      try {
        const o = await this.hass.callWS({ type: "home_architect/get_projects" }), s = (e = o == null ? void 0 : o.projects) == null ? void 0 : e.find((r) => r.id === i);
        if (s) {
          this.project = s;
          return;
        }
      } catch (o) {
        console.warn("WebSocket get_projects échoué, essai localStorage:", o);
      }
    const t = localStorage.getItem(`home_architect_${i}`);
    if (t)
      try {
        this.project = JSON.parse(t);
      } catch {
      }
  }
  render() {
    var i;
    return f`
      <div class="card-header">
        <div class="card-title">${((i = this.config) == null ? void 0 : i.title) || this.project.name || "Home Architect"}</div>
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
F.styles = z`
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
it([
  w({ type: Object })
], F.prototype, "hass", 2);
it([
  h()
], F.prototype, "config", 2);
it([
  h()
], F.prototype, "project", 2);
it([
  h()
], F.prototype, "is3DMode", 2);
F = it([
  E("home-architect-card")
], F);
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
