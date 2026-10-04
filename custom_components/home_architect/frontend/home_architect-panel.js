/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Tt = globalThis, Bt = Tt.ShadowRoot && (Tt.ShadyCSS === void 0 || Tt.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Vt = Symbol(), Xt = /* @__PURE__ */ new WeakMap();
let ce = class {
  constructor(t, e, o) {
    if (this._$cssResult$ = !0, o !== Vt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (Bt && t === void 0) {
      const o = e !== void 0 && e.length === 1;
      o && (t = Xt.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), o && Xt.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const fe = (s) => new ce(typeof s == "string" ? s : s + "", void 0, Vt), G = (s, ...t) => {
  const e = s.length === 1 ? s[0] : t.reduce((o, i, r) => o + ((n) => {
    if (n._$cssResult$ === !0) return n.cssText;
    if (typeof n == "number") return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + s[r + 1], s[0]);
  return new ce(e, s, Vt);
}, be = (s, t) => {
  if (Bt) s.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const o = document.createElement("style"), i = Tt.litNonce;
    i !== void 0 && o.setAttribute("nonce", i), o.textContent = e.cssText, s.appendChild(o);
  }
}, Kt = Bt ? (s) => s : (s) => s instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const o of t.cssRules) e += o.cssText;
  return fe(e);
})(s) : s;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: me, defineProperty: xe, getOwnPropertyDescriptor: ye, getOwnPropertyNames: ve, getOwnPropertySymbols: we, getPrototypeOf: $e } = Object, st = globalThis, Jt = st.trustedTypes, ke = Jt ? Jt.emptyScript : "", Nt = st.reactiveElementPolyfillSupport, wt = (s, t) => s, At = { toAttribute(s, t) {
  switch (t) {
    case Boolean:
      s = s ? ke : null;
      break;
    case Object:
    case Array:
      s = s == null ? s : JSON.stringify(s);
  }
  return s;
}, fromAttribute(s, t) {
  let e = s;
  switch (t) {
    case Boolean:
      e = s !== null;
      break;
    case Number:
      e = s === null ? null : Number(s);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(s);
      } catch {
        e = null;
      }
  }
  return e;
} }, Yt = (s, t) => !me(s, t), Zt = { attribute: !0, type: String, converter: At, reflect: !1, useDefault: !1, hasChanged: Yt };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), st.litPropertyMetadata ?? (st.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let gt = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = Zt) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const o = Symbol(), i = this.getPropertyDescriptor(t, o, e);
      i !== void 0 && xe(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, e, o) {
    const { get: i, set: r } = ye(this.prototype, t) ?? { get() {
      return this[e];
    }, set(n) {
      this[e] = n;
    } };
    return { get: i, set(n) {
      const a = i == null ? void 0 : i.call(this);
      r == null || r.call(this, n), this.requestUpdate(t, a, o);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Zt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(wt("elementProperties"))) return;
    const t = $e(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(wt("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(wt("properties"))) {
      const e = this.properties, o = [...ve(e), ...we(e)];
      for (const i of o) this.createProperty(i, e[i]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [o, i] of e) this.elementProperties.set(o, i);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, o] of this.elementProperties) {
      const i = this._$Eu(e, o);
      i !== void 0 && this._$Eh.set(i, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const o = new Set(t.flat(1 / 0).reverse());
      for (const i of o) e.unshift(Kt(i));
    } else t !== void 0 && e.push(Kt(t));
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
    return be(t, this.constructor.elementStyles), t;
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
    const o = this.constructor.elementProperties.get(t), i = this.constructor._$Eu(t, o);
    if (i !== void 0 && o.reflect === !0) {
      const n = (((r = o.converter) == null ? void 0 : r.toAttribute) !== void 0 ? o.converter : At).toAttribute(e, o.type);
      this._$Em = t, n == null ? this.removeAttribute(i) : this.setAttribute(i, n), this._$Em = null;
    }
  }
  _$AK(t, e) {
    var r, n;
    const o = this.constructor, i = o._$Eh.get(t);
    if (i !== void 0 && this._$Em !== i) {
      const a = o.getPropertyOptions(i), l = typeof a.converter == "function" ? { fromAttribute: a.converter } : ((r = a.converter) == null ? void 0 : r.fromAttribute) !== void 0 ? a.converter : At;
      this._$Em = i;
      const h = l.fromAttribute(e, a.type);
      this[i] = h ?? ((n = this._$Ej) == null ? void 0 : n.get(i)) ?? h, this._$Em = null;
    }
  }
  requestUpdate(t, e, o, i = !1, r) {
    var n;
    if (t !== void 0) {
      const a = this.constructor;
      if (i === !1 && (r = this[t]), o ?? (o = a.getPropertyOptions(t)), !((o.hasChanged ?? Yt)(r, e) || o.useDefault && o.reflect && r === ((n = this._$Ej) == null ? void 0 : n.get(t)) && !this.hasAttribute(a._$Eu(t, o)))) return;
      this.C(t, e, o);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: o, reflect: i, wrapped: r }, n) {
    o && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, n ?? e ?? this[t]), r !== !0 || n !== void 0) || (this._$AL.has(t) || (this.hasUpdated || o || (e = void 0), this._$AL.set(t, e)), i === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
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
        for (const [r, n] of this._$Ep) this[r] = n;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [r, n] of i) {
        const { wrapped: a } = n, l = this[r];
        a !== !0 || this._$AL.has(r) || l === void 0 || this.C(r, void 0, n, l);
      }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), (o = this._$EO) == null || o.forEach((i) => {
        var r;
        return (r = i.hostUpdate) == null ? void 0 : r.call(i);
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
    (e = this._$EO) == null || e.forEach((o) => {
      var i;
      return (i = o.hostUpdated) == null ? void 0 : i.call(o);
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
gt.elementStyles = [], gt.shadowRootOptions = { mode: "open" }, gt[wt("elementProperties")] = /* @__PURE__ */ new Map(), gt[wt("finalized")] = /* @__PURE__ */ new Map(), Nt == null || Nt({ ReactiveElement: gt }), (st.reactiveElementVersions ?? (st.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const $t = globalThis, Qt = (s) => s, zt = $t.trustedTypes, te = zt ? zt.createPolicy("lit-html", { createHTML: (s) => s }) : void 0, de = "$lit$", et = `lit$${Math.random().toFixed(9).slice(2)}$`, pe = "?" + et, Se = `<${pe}>`, lt = document, St = () => lt.createComment(""), Mt = (s) => s === null || typeof s != "object" && typeof s != "function", Gt = Array.isArray, Me = (s) => Gt(s) || typeof (s == null ? void 0 : s[Symbol.iterator]) == "function", Ht = `[ 	
\f\r]`, vt = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ee = /-->/g, se = />/g, rt = RegExp(`>|${Ht}(?:([^\\s"'>=/]+)(${Ht}*=${Ht}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), oe = /'/g, ie = /"/g, he = /^(?:script|style|textarea|title)$/i, ue = (s) => (t, ...e) => ({ _$litType$: s, strings: t, values: e }), k = ue(1), T = ue(2), ft = Symbol.for("lit-noChange"), L = Symbol.for("lit-nothing"), re = /* @__PURE__ */ new WeakMap(), nt = lt.createTreeWalker(lt, 129);
function ge(s, t) {
  if (!Gt(s) || !s.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return te !== void 0 ? te.createHTML(t) : t;
}
const Ce = (s, t) => {
  const e = s.length - 1, o = [];
  let i, r = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", n = vt;
  for (let a = 0; a < e; a++) {
    const l = s[a];
    let h, c, u = -1, p = 0;
    for (; p < l.length && (n.lastIndex = p, c = n.exec(l), c !== null); ) p = n.lastIndex, n === vt ? c[1] === "!--" ? n = ee : c[1] !== void 0 ? n = se : c[2] !== void 0 ? (he.test(c[2]) && (i = RegExp("</" + c[2], "g")), n = rt) : c[3] !== void 0 && (n = rt) : n === rt ? c[0] === ">" ? (n = i ?? vt, u = -1) : c[1] === void 0 ? u = -2 : (u = n.lastIndex - c[2].length, h = c[1], n = c[3] === void 0 ? rt : c[3] === '"' ? ie : oe) : n === ie || n === oe ? n = rt : n === ee || n === se ? n = vt : (n = rt, i = void 0);
    const f = n === rt && s[a + 1].startsWith("/>") ? " " : "";
    r += n === vt ? l + Se : u >= 0 ? (o.push(h), l.slice(0, u) + de + l.slice(u) + et + f) : l + et + (u === -2 ? a : f);
  }
  return [ge(s, r + (s[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), o];
};
class Ct {
  constructor({ strings: t, _$litType$: e }, o) {
    let i;
    this.parts = [];
    let r = 0, n = 0;
    const a = t.length - 1, l = this.parts, [h, c] = Ce(t, e);
    if (this.el = Ct.createElement(h, o), nt.currentNode = this.el.content, e === 2 || e === 3) {
      const u = this.el.content.firstChild;
      u.replaceWith(...u.childNodes);
    }
    for (; (i = nt.nextNode()) !== null && l.length < a; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const u of i.getAttributeNames()) if (u.endsWith(de)) {
          const p = c[n++], f = i.getAttribute(u).split(et), d = /([.?@])?(.*)/.exec(p);
          l.push({ type: 1, index: r, name: d[2], strings: f, ctor: d[1] === "." ? Pe : d[1] === "?" ? De : d[1] === "@" ? Ee : jt }), i.removeAttribute(u);
        } else u.startsWith(et) && (l.push({ type: 6, index: r }), i.removeAttribute(u));
        if (he.test(i.tagName)) {
          const u = i.textContent.split(et), p = u.length - 1;
          if (p > 0) {
            i.textContent = zt ? zt.emptyScript : "";
            for (let f = 0; f < p; f++) i.append(u[f], St()), nt.nextNode(), l.push({ type: 2, index: ++r });
            i.append(u[p], St());
          }
        }
      } else if (i.nodeType === 8) if (i.data === pe) l.push({ type: 2, index: r });
      else {
        let u = -1;
        for (; (u = i.data.indexOf(et, u + 1)) !== -1; ) l.push({ type: 7, index: r }), u += et.length - 1;
      }
      r++;
    }
  }
  static createElement(t, e) {
    const o = lt.createElement("template");
    return o.innerHTML = t, o;
  }
}
function bt(s, t, e = s, o) {
  var n, a;
  if (t === ft) return t;
  let i = o !== void 0 ? (n = e._$Co) == null ? void 0 : n[o] : e._$Cl;
  const r = Mt(t) ? void 0 : t._$litDirective$;
  return (i == null ? void 0 : i.constructor) !== r && ((a = i == null ? void 0 : i._$AO) == null || a.call(i, !1), r === void 0 ? i = void 0 : (i = new r(s), i._$AT(s, e, o)), o !== void 0 ? (e._$Co ?? (e._$Co = []))[o] = i : e._$Cl = i), i !== void 0 && (t = bt(s, i._$AS(s, t.values), i, o)), t;
}
class _e {
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
    const { el: { content: e }, parts: o } = this._$AD, i = ((t == null ? void 0 : t.creationScope) ?? lt).importNode(e, !0);
    nt.currentNode = i;
    let r = nt.nextNode(), n = 0, a = 0, l = o[0];
    for (; l !== void 0; ) {
      if (n === l.index) {
        let h;
        l.type === 2 ? h = new _t(r, r.nextSibling, this, t) : l.type === 1 ? h = new l.ctor(r, l.name, l.strings, this, t) : l.type === 6 && (h = new Ie(r, this, t)), this._$AV.push(h), l = o[++a];
      }
      n !== (l == null ? void 0 : l.index) && (r = nt.nextNode(), n++);
    }
    return nt.currentNode = lt, i;
  }
  p(t) {
    let e = 0;
    for (const o of this._$AV) o !== void 0 && (o.strings !== void 0 ? (o._$AI(t, o, e), e += o.strings.length - 2) : o._$AI(t[e])), e++;
  }
}
class _t {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, e, o, i) {
    this.type = 2, this._$AH = L, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = o, this.options = i, this._$Cv = (i == null ? void 0 : i.isConnected) ?? !0;
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
    t = bt(this, t, e), Mt(t) ? t === L || t == null || t === "" ? (this._$AH !== L && this._$AR(), this._$AH = L) : t !== this._$AH && t !== ft && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Me(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== L && Mt(this._$AH) ? this._$AA.nextSibling.data = t : this.T(lt.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var r;
    const { values: e, _$litType$: o } = t, i = typeof o == "number" ? this._$AC(t) : (o.el === void 0 && (o.el = Ct.createElement(ge(o.h, o.h[0]), this.options)), o);
    if (((r = this._$AH) == null ? void 0 : r._$AD) === i) this._$AH.p(e);
    else {
      const n = new _e(i, this), a = n.u(this.options);
      n.p(e), this.T(a), this._$AH = n;
    }
  }
  _$AC(t) {
    let e = re.get(t.strings);
    return e === void 0 && re.set(t.strings, e = new Ct(t)), e;
  }
  k(t) {
    Gt(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let o, i = 0;
    for (const r of t) i === e.length ? e.push(o = new _t(this.O(St()), this.O(St()), this, this.options)) : o = e[i], o._$AI(r), i++;
    i < e.length && (this._$AR(o && o._$AB.nextSibling, i), e.length = i);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var o;
    for ((o = this._$AP) == null ? void 0 : o.call(this, !1, !0, e); t !== this._$AB; ) {
      const i = Qt(t).nextSibling;
      Qt(t).remove(), t = i;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$Cv = t, (e = this._$AP) == null || e.call(this, t));
  }
}
class jt {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, o, i, r) {
    this.type = 1, this._$AH = L, this._$AN = void 0, this.element = t, this.name = e, this._$AM = i, this.options = r, o.length > 2 || o[0] !== "" || o[1] !== "" ? (this._$AH = Array(o.length - 1).fill(new String()), this.strings = o) : this._$AH = L;
  }
  _$AI(t, e = this, o, i) {
    const r = this.strings;
    let n = !1;
    if (r === void 0) t = bt(this, t, e, 0), n = !Mt(t) || t !== this._$AH && t !== ft, n && (this._$AH = t);
    else {
      const a = t;
      let l, h;
      for (t = r[0], l = 0; l < r.length - 1; l++) h = bt(this, a[o + l], e, l), h === ft && (h = this._$AH[l]), n || (n = !Mt(h) || h !== this._$AH[l]), h === L ? t = L : t !== L && (t += (h ?? "") + r[l + 1]), this._$AH[l] = h;
    }
    n && !i && this.j(t);
  }
  j(t) {
    t === L ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Pe extends jt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === L ? void 0 : t;
  }
}
class De extends jt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== L);
  }
}
class Ee extends jt {
  constructor(t, e, o, i, r) {
    super(t, e, o, i, r), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = bt(this, t, e, 0) ?? L) === ft) return;
    const o = this._$AH, i = t === L && o !== L || t.capture !== o.capture || t.once !== o.once || t.passive !== o.passive, r = t !== L && (o === L || i);
    i && this.element.removeEventListener(this.name, this, o), r && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e;
    typeof this._$AH == "function" ? this._$AH.call(((e = this.options) == null ? void 0 : e.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Ie {
  constructor(t, e, o) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = o;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    bt(this, t);
  }
}
const Ut = $t.litHtmlPolyfillSupport;
Ut == null || Ut(Ct, _t), ($t.litHtmlVersions ?? ($t.litHtmlVersions = [])).push("3.3.3");
const Te = (s, t, e) => {
  const o = (e == null ? void 0 : e.renderBefore) ?? t;
  let i = o._$litPart$;
  if (i === void 0) {
    const r = (e == null ? void 0 : e.renderBefore) ?? null;
    o._$litPart$ = i = new _t(t.insertBefore(St(), r), r, void 0, e ?? {});
  }
  return i._$AI(s), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const at = globalThis;
class U extends gt {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Te(e, this.renderRoot, this.renderOptions);
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
    return ft;
  }
}
var le;
U._$litElement$ = !0, U.finalized = !0, (le = at.litElementHydrateSupport) == null || le.call(at, { LitElement: U });
const qt = at.litElementPolyfillSupport;
qt == null || qt({ LitElement: U });
(at.litElementVersions ?? (at.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const X = (s) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(s, t);
  }) : customElements.define(s, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ae = { attribute: !0, type: String, converter: At, reflect: !1, hasChanged: Yt }, ze = (s = Ae, t, e) => {
  const { kind: o, metadata: i } = e;
  let r = globalThis.litPropertyMetadata.get(i);
  if (r === void 0 && globalThis.litPropertyMetadata.set(i, r = /* @__PURE__ */ new Map()), o === "setter" && ((s = Object.create(s)).wrapped = !0), r.set(e.name, s), o === "accessor") {
    const { name: n } = e;
    return { set(a) {
      const l = t.get.call(this);
      t.set.call(this, a), this.requestUpdate(n, l, s, !0, a);
    }, init(a) {
      return a !== void 0 && this.C(n, void 0, s, a), a;
    } };
  }
  if (o === "setter") {
    const { name: n } = e;
    return function(a) {
      const l = this[n];
      t.call(this, a), this.requestUpdate(n, l, s, !0, a);
    };
  }
  throw Error("Unsupported decorator location: " + o);
};
function I(s) {
  return (t, e) => typeof e == "object" ? ze(s, t, e) : ((o, i, r) => {
    const n = i.hasOwnProperty(r);
    return i.constructor.createProperty(r, o), n ? Object.getOwnPropertyDescriptor(i, r) : void 0;
  })(s, t, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function m(s) {
  return I({ ...s, state: !0, attribute: !1 });
}
const je = G`
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
class y {
  /**
   * Snaps a world point (in meters) to grid, existing vertices, and angle guides.
   */
  static snapPoint(t, e, o = [], i, r = 0.25) {
    let n = { ...t };
    if (e.snapToElements && o.length > 0) {
      let h = r, c = null;
      for (const u of o)
        for (const p of [u.start, u.end]) {
          const f = this.distance(t, p);
          f < h && (h = f, c = p);
        }
      if (c)
        return {
          point: { x: c.x, y: c.y },
          snappedTo: "vertex"
        };
    }
    let a = !1, l;
    if (e.snapToAngles && i) {
      const h = t.x - i.x, c = t.y - i.y, u = Math.sqrt(h * h + c * c);
      if (u > 0.05) {
        let f = Math.atan2(c, h) * 180 / Math.PI;
        f < 0 && (f += 360);
        const d = 45, g = Math.round(f / d) * d;
        if (Math.abs(f - g) <= 6) {
          const S = g * Math.PI / 180;
          n = {
            x: i.x + u * Math.cos(S),
            y: i.y + u * Math.sin(S)
          }, a = !0, l = g;
        }
      }
    }
    if (e.snapToGrid && !a) {
      const h = e.size || 0.5;
      return n = {
        x: Math.round(n.x / h) * h,
        y: Math.round(n.y / h) * h
      }, { point: n, snappedTo: "grid" };
    } else if (a)
      return { point: n, snappedTo: "angle", guideAngle: l };
    return { point: t, snappedTo: "none" };
  }
  /**
   * Snaps a point to the nearest wall centerline for placing doors and windows
   */
  static snapPointToWall(t, e, o = 0.6) {
    let i = null, r = o;
    for (const n of e) {
      const a = n.end.x - n.start.x, l = n.end.y - n.start.y, h = Math.sqrt(a * a + l * l);
      if (h === 0) continue;
      const c = Math.max(0, Math.min(
        1,
        ((t.x - n.start.x) * a + (t.y - n.start.y) * l) / (h * h)
      )), u = n.start.x + c * a, p = n.start.y + c * l, f = Math.sqrt((t.x - u) ** 2 + (t.y - p) ** 2);
      f < r && (r = f, i = {
        wall: n,
        projectionPoint: { x: u, y: p },
        offset: c * h,
        distance: f,
        angleRad: Math.atan2(l, a)
      });
    }
    return i;
  }
  static distance(t, e) {
    const o = t.x - e.x, i = t.y - e.y;
    return Math.sqrt(o * o + i * i);
  }
  static roundMeters(t, e = 2) {
    const o = Math.pow(10, e);
    return Math.round(t * o) / o;
  }
}
class J {
  /**
   * Ray-casting algorithm to test if a 2D point is inside a polygon
   */
  static isPointInPolygon(t, e) {
    if (!e || e.length < 3) return !1;
    let o = !1;
    for (let i = 0, r = e.length - 1; i < e.length; r = i++) {
      const n = e[i].x, a = e[i].y, l = e[r].x, h = e[r].y;
      a > t.y != h > t.y && t.x < (l - n) * (t.y - a) / (h - a) + n && (o = !o);
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
    for (const i of t)
      e += i.x, o += i.y;
    return {
      x: e / t.length,
      y: o / t.length
    };
  }
  /**
   * Computes the geometric area (in m²) of a polygon using the Shoelace formula
   */
  static computeArea(t) {
    if (!t || t.length < 3) return 0;
    let e = 0;
    for (let o = 0; o < t.length; o++) {
      const i = (o + 1) % t.length;
      e += t[o].x * t[i].y, e -= t[i].x * t[o].y;
    }
    return Math.round(Math.abs(e / 2) * 100) / 100;
  }
}
var Oe = Object.defineProperty, Re = Object.getOwnPropertyDescriptor, E = (s, t, e, o) => {
  for (var i = o > 1 ? void 0 : o ? Re(t, e) : t, r = s.length - 1, n; r >= 0; r--)
    (n = s[r]) && (i = (o ? n(t, e, i) : n(i)) || i);
  return o && i && Oe(t, e, i), i;
};
let _ = class extends U {
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
    }, this.isDashboardMode = !1, this.isMarqueeSelecting = !1, this.marqueeStart = null, this.marqueeCurrent = null, this.viewport = { x: 300, y: 300, zoom: 1 }, this.isPanning = !1, this.panStart = { x: 0, y: 0 }, this.drawingWallStart = null, this.previewPoint = null, this.snapInfo = { snappedTo: "none" }, this.cursorCoords = { x: 0, y: 0 }, this.wallSnap = null, this.openingFlipSide = !1, this.openingFlipDirection = !1, this.calibrateStart = null, this.calibrateCurrent = null, this.rescaleStart = null, this.rescaleCurrent = null, this._boundKeyDown = null, this.orbitPitch = 55, this.orbitYaw = -35, this.isOrbiting = !1, this.orbitStart = { x: 0, y: 0 }, this.orbitStartPitch = 55, this.orbitStartYaw = -35;
  }
  setCameraPreset(s, t) {
    this.orbitPitch = s, this.orbitYaw = t, this.requestUpdate();
  }
  // ==========================================
  // CONVERSIONS DE COORDONNÉES
  // ==========================================
  screenToWorld(s, t) {
    const e = this.getBoundingClientRect(), o = s - e.left, i = t - e.top, r = this.project.pixelsPerMeter * this.viewport.zoom;
    return {
      x: (o - this.viewport.x) / r,
      y: (i - this.viewport.y) / r
    };
  }
  worldToScreen(s) {
    const t = this.project.pixelsPerMeter * this.viewport.zoom;
    return {
      x: s.x * t + this.viewport.x,
      y: s.y * t + this.viewport.y
    };
  }
  // ==========================================
  // GESTION DU PAN & ZOOM
  // ==========================================
  handleWheel(s) {
    s.preventDefault();
    const t = this.getBoundingClientRect(), e = s.clientX - t.left, o = s.clientY - t.top, i = s.deltaY < 0 ? 1.12 : 0.89, r = Math.min(Math.max(this.viewport.zoom * i, 0.15), 8), n = e - (e - this.viewport.x) * (r / this.viewport.zoom), a = o - (o - this.viewport.y) * (r / this.viewport.zoom);
    this.viewport = { x: n, y: a, zoom: r };
  }
  handlePointerDown(s) {
    var e, o, i, r, n, a, l, h, c, u, p, f, d, g, b, S;
    if (this.is3DMode) {
      if (s.button === 1 || s.button === 0 && s.shiftKey) {
        this.isPanning = !0, this.panStart = { x: s.clientX - this.viewport.x, y: s.clientY - this.viewport.y }, (o = (e = s.target).setPointerCapture) == null || o.call(e, s.pointerId);
        return;
      }
      if (s.button === 2 || s.button === 0 && s.altKey) {
        this.isOrbiting = !0, this.orbitStart = { x: s.clientX, y: s.clientY }, this.orbitStartPitch = this.orbitPitch, this.orbitStartYaw = this.orbitYaw, (r = (i = s.target).setPointerCapture) == null || r.call(i, s.pointerId);
        return;
      }
      if (s.button === 0 && !((a = (n = s.target) == null ? void 0 : n.closest) == null ? void 0 : a.call(n, ".wall-element, .wall-element-3d, .room-group, .entity-pin, .opening-element"))) {
        this.selectedElements = { wallIds: [], openingIds: [], roomIds: [], bindingIds: [] }, this.dispatchSelectionChanged(), this.isOrbiting = !0, this.orbitStart = { x: s.clientX, y: s.clientY }, this.orbitStartPitch = this.orbitPitch, this.orbitStartYaw = this.orbitYaw, (h = (l = s.target).setPointerCapture) == null || h.call(l, s.pointerId);
        return;
      }
      return;
    }
    if (s.button === 1) {
      this.isPanning = !0, this.panStart = { x: s.clientX - this.viewport.x, y: s.clientY - this.viewport.y }, (u = (c = s.target).setPointerCapture) == null || u.call(c, s.pointerId);
      return;
    }
    if (s.button !== 0) return;
    if (this.activeTool === "select") {
      if (s.shiftKey) {
        const w = this.screenToWorld(s.clientX, s.clientY);
        this.isMarqueeSelecting = !0, this.marqueeStart = w, this.marqueeCurrent = w, (f = (p = s.target).setPointerCapture) == null || f.call(p, s.pointerId);
        return;
      }
      this.selectedElements = { wallIds: [], openingIds: [], roomIds: [], bindingIds: [] }, this.dispatchSelectionChanged(), this.isPanning = !0, this.panStart = { x: s.clientX - this.viewport.x, y: s.clientY - this.viewport.y }, (g = (d = s.target).setPointerCapture) == null || g.call(d, s.pointerId);
      return;
    }
    if (s.shiftKey) {
      this.isPanning = !0, this.panStart = { x: s.clientX - this.viewport.x, y: s.clientY - this.viewport.y }, (S = (b = s.target).setPointerCapture) == null || S.call(b, s.pointerId);
      return;
    }
    const t = this.screenToWorld(s.clientX, s.clientY);
    if (this.activeTool === "wall") {
      const w = y.snapPoint(
        t,
        this.project.grid,
        this.project.walls,
        this.drawingWallStart || void 0
      );
      if (!this.drawingWallStart)
        this.drawingWallStart = w.point;
      else {
        const v = this.drawingWallStart, x = w.point;
        if (y.distance(v, x) >= 0.15) {
          const M = {
            id: `wall_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
            start: { ...v },
            end: { ...x },
            thickness: this.currentWallThickness,
            type: "standard"
          };
          this.project = {
            ...this.project,
            walls: [...this.project.walls, M]
          }, this.dispatchProjectChanged(), this.drawingWallStart = x;
        }
      }
    } else if (this.activeTool === "door" || this.activeTool === "window" || this.activeTool === "french_window") {
      if (this.wallSnap) {
        const w = this.activeTool === "window" ? "window" : this.activeTool === "french_window" ? "french_window" : "door", v = {
          id: `op_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
          wallId: this.wallSnap.wall.id,
          type: w,
          offset: y.roundMeters(this.wallSnap.offset),
          width: this.currentOpeningWidth || (w === "door" ? 0.9 : 1.2),
          flipSide: this.openingFlipSide,
          flipDirection: this.openingFlipDirection
        };
        this.project = {
          ...this.project,
          openings: [...this.project.openings, v]
        }, this.dispatchProjectChanged();
      }
    } else if (this.activeTool === "calibrate") {
      const w = this.getBoundingClientRect(), v = { x: s.clientX - w.left, y: s.clientY - w.top };
      if (!this.calibrateStart)
        this.calibrateStart = v, this.calibrateCurrent = v;
      else {
        const x = v.x - this.calibrateStart.x, $ = v.y - this.calibrateStart.y, M = Math.sqrt(x * x + $ * $);
        if (M >= 10) {
          const C = M / this.viewport.zoom;
          this.dispatchEvent(new CustomEvent("request-calibration", {
            detail: {
              pixelDistance: C,
              defaultMeters: y.roundMeters(C / this.project.pixelsPerMeter)
            },
            bubbles: !0,
            composed: !0
          })), this.calibrateStart = null, this.calibrateCurrent = null;
        }
      }
    } else if (this.activeTool === "rescale") {
      const w = this.screenToWorld(s.clientX, s.clientY);
      let v = y.snapPoint(
        w,
        this.project.grid,
        this.project.walls,
        this.rescaleStart || void 0
      );
      if (v.snappedTo === "none" && this.project.walls.length > 0) {
        const x = y.snapPointToWall(w, this.project.walls, 0.6);
        x && (v = { point: x.projectionPoint, snappedTo: "vertex" });
      }
      if (!this.rescaleStart)
        this.rescaleStart = v.point, this.rescaleCurrent = v.point;
      else {
        const x = this.rescaleStart, $ = v.point, M = y.distance(x, $);
        M >= 0.05 && (this.dispatchEvent(new CustomEvent("request-rescale", {
          detail: {
            measuredMeters: y.roundMeters(M)
          },
          bubbles: !0,
          composed: !0
        })), this.rescaleStart = null, this.rescaleCurrent = null, this.previewPoint = null);
      }
    }
  }
  handlePointerMove(s) {
    if (this.isOrbiting) {
      const e = s.clientX - this.orbitStart.x, o = s.clientY - this.orbitStart.y;
      this.orbitYaw = (this.orbitStartYaw + e * 0.55) % 360, this.orbitPitch = Math.max(15, Math.min(85, this.orbitStartPitch - o * 0.38)), this.requestUpdate();
      return;
    }
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
    const t = this.screenToWorld(s.clientX, s.clientY);
    if (this.cursorCoords = {
      x: y.roundMeters(t.x),
      y: y.roundMeters(t.y)
    }, this.activeTool === "wall") {
      const e = y.snapPoint(
        t,
        this.project.grid,
        this.project.walls,
        this.drawingWallStart || void 0
      );
      this.previewPoint = e.point, this.snapInfo = { snappedTo: e.snappedTo, guideAngle: e.guideAngle }, this.wallSnap = null;
    } else if (this.activeTool === "door" || this.activeTool === "window" || this.activeTool === "french_window")
      this.wallSnap = y.snapPointToWall(t, this.project.walls, 0.8), this.previewPoint = null;
    else if (this.activeTool === "calibrate" && this.calibrateStart) {
      const e = this.getBoundingClientRect();
      this.calibrateCurrent = { x: s.clientX - e.left, y: s.clientY - e.top };
    } else if (this.activeTool === "rescale") {
      let e = y.snapPoint(
        t,
        this.project.grid,
        this.project.walls,
        this.rescaleStart || void 0
      );
      if (e.snappedTo === "none" && this.project.walls.length > 0) {
        const o = y.snapPointToWall(t, this.project.walls, 0.6);
        o && (e = { point: o.projectionPoint, snappedTo: "vertex" });
      }
      this.previewPoint = e.point, this.snapInfo = { snappedTo: e.snappedTo, guideAngle: e.guideAngle }, this.wallSnap = null, this.rescaleStart && (this.rescaleCurrent = e.point);
    } else
      this.previewPoint = null, this.wallSnap = null;
  }
  handlePointerUp(s) {
    var t, e, o, i, r, n;
    if (this.isOrbiting) {
      this.isOrbiting = !1, (e = (t = s.target).releasePointerCapture) == null || e.call(t, s.pointerId);
      return;
    }
    if (this.isMarqueeSelecting && this.marqueeStart && this.marqueeCurrent) {
      const a = Math.min(this.marqueeStart.x, this.marqueeCurrent.x), l = Math.max(this.marqueeStart.x, this.marqueeCurrent.x), h = Math.min(this.marqueeStart.y, this.marqueeCurrent.y), c = Math.max(this.marqueeStart.y, this.marqueeCurrent.y);
      if (l - a > 0.05 || c - h > 0.05) {
        const u = this.project.walls.filter((g) => {
          const b = (g.start.x + g.end.x) / 2, S = (g.start.y + g.end.y) / 2;
          return b >= a && b <= l && S >= h && S <= c;
        }).map((g) => g.id), p = this.project.openings.filter((g) => {
          const b = this.project.walls.find((M) => M.id === g.wallId);
          if (!b) return !1;
          const S = b.end.x - b.start.x, w = b.end.y - b.start.y, v = Math.sqrt(S * S + w * w);
          if (v === 0) return !1;
          const x = b.start.x + g.offset / v * S, $ = b.start.y + g.offset / v * w;
          return x >= a && x <= l && $ >= h && $ <= c;
        }).map((g) => g.id), f = this.project.rooms.filter((g) => {
          if (!g.polygon || g.polygon.length < 3) return !1;
          const b = J.calculateCentroid(g.polygon);
          return b.x >= a && b.x <= l && b.y >= h && b.y <= c;
        }).map((g) => g.id), d = this.project.bindings.filter((g) => g.position.x >= a && g.position.x <= l && g.position.y >= h && g.position.y <= c).map((g) => g.id);
        this.selectedElements = {
          wallIds: Array.from(/* @__PURE__ */ new Set([...this.selectedElements.wallIds, ...u])),
          openingIds: Array.from(/* @__PURE__ */ new Set([...this.selectedElements.openingIds, ...p])),
          roomIds: Array.from(/* @__PURE__ */ new Set([...this.selectedElements.roomIds, ...f])),
          bindingIds: Array.from(/* @__PURE__ */ new Set([...this.selectedElements.bindingIds, ...d]))
        }, this.dispatchSelectionChanged();
      }
      this.isMarqueeSelecting = !1, this.marqueeStart = null, this.marqueeCurrent = null, (i = (o = s.target).releasePointerCapture) == null || i.call(o, s.pointerId);
      return;
    }
    this.isPanning && (this.isPanning = !1, (n = (r = s.target).releasePointerCapture) == null || n.call(r, s.pointerId));
  }
  // ==========================================
  // DRAG & DROP ENTITÉS HOME ASSISTANT
  // ==========================================
  handleDragOver(s) {
    s.preventDefault(), s.dataTransfer && (s.dataTransfer.dropEffect = "copy");
  }
  handleDrop(s) {
    var e, o;
    if (s.preventDefault(), (e = s.dataTransfer) != null && e.files && s.dataTransfer.files.length > 0) {
      const i = s.dataTransfer.files[0];
      if (i.type.startsWith("image/") || i.name.toLowerCase().endsWith(".svg")) {
        const r = new FileReader();
        r.onload = (n) => {
          var l;
          const a = (l = n.target) == null ? void 0 : l.result;
          this.dispatchEvent(new CustomEvent("background-image-loaded", {
            detail: { dataUrl: a },
            bubbles: !0,
            composed: !0
          }));
        }, r.readAsDataURL(i);
        return;
      }
    }
    const t = (o = s.dataTransfer) == null ? void 0 : o.getData("application/json");
    if (t)
      try {
        const { entityId: i, domain: r, name: n, icon: a } = JSON.parse(t), l = this.screenToWorld(s.clientX, s.clientY), h = J.findRoomContainingPoint(l, this.project.rooms), c = {
          id: `bind_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
          entityId: i,
          position: {
            x: y.roundMeters(l.x),
            y: y.roundMeters(l.y)
          },
          roomId: h == null ? void 0 : h.id,
          icon: a,
          customName: n,
          tapAction: "toggle"
        };
        this.project = {
          ...this.project,
          bindings: [...this.project.bindings, c]
        }, this.dispatchProjectChanged();
      } catch (i) {
        console.error("Erreur lors de la liaison entité HA:", i);
      }
  }
  dispatchSelectionChanged() {
    this.dispatchEvent(new CustomEvent("selection-changed", {
      detail: { selectedElements: this.selectedElements },
      bubbles: !0,
      composed: !0
    })), this.requestUpdate();
  }
  handleWallClick(s, t) {
    if (this.activeTool !== "select") return;
    s.stopPropagation();
    const e = s.shiftKey || s.ctrlKey || s.metaKey, o = this.selectedElements.wallIds.includes(t.id);
    if (e) {
      const i = o ? this.selectedElements.wallIds.filter((r) => r !== t.id) : [...this.selectedElements.wallIds, t.id];
      this.selectedElements = { ...this.selectedElements, wallIds: i };
    } else
      this.selectedElements = { wallIds: [t.id], openingIds: [], roomIds: [], bindingIds: [] };
    this.dispatchSelectionChanged();
  }
  handleOpeningClick(s, t) {
    if (this.activeTool !== "select") return;
    s.stopPropagation();
    const e = s.shiftKey || s.ctrlKey || s.metaKey, o = this.selectedElements.openingIds.includes(t.id);
    if (e) {
      const i = o ? this.selectedElements.openingIds.filter((r) => r !== t.id) : [...this.selectedElements.openingIds, t.id];
      this.selectedElements = { ...this.selectedElements, openingIds: i };
    } else
      this.selectedElements = { wallIds: [], openingIds: [t.id], roomIds: [], bindingIds: [] };
    this.dispatchSelectionChanged();
  }
  renderMarqueeBox() {
    if (!this.isMarqueeSelecting || !this.marqueeStart || !this.marqueeCurrent) return null;
    const s = this.worldToScreen(this.marqueeStart), t = this.worldToScreen(this.marqueeCurrent), e = Math.min(s.x, t.x), o = Math.min(s.y, t.y), i = Math.abs(s.x - t.x), r = Math.abs(s.y - t.y);
    return T`
      <rect 
        class="marquee-selection-box"
        x="${e}" 
        y="${o}" 
        width="${i}" 
        height="${r}" 
      />
    `;
  }
  handleEntityClick(s, t) {
    if (t.stopPropagation(), this.isDashboardMode) {
      const e = s.entityId.split(".")[0];
      if (s.tapAction === "more-info" || e !== "light" && e !== "switch") {
        this.dispatchEvent(new CustomEvent("hass-more-info", {
          detail: { entityId: s.entityId },
          bubbles: !0,
          composed: !0
        }));
        return;
      }
      this.hass && this.hass.callService && this.hass.callService(e, "toggle", { entity_id: s.entityId }).catch(() => {
        this.hass.callService("homeassistant", "toggle", { entity_id: s.entityId });
      });
      return;
    }
    if (this.activeTool === "select") {
      const e = t, o = e.shiftKey || e.ctrlKey || e.metaKey, i = this.selectedElements.bindingIds.includes(s.id);
      if (o) {
        const r = i ? this.selectedElements.bindingIds.filter((n) => n !== s.id) : [...this.selectedElements.bindingIds, s.id];
        this.selectedElements = { ...this.selectedElements, bindingIds: r };
      } else
        this.selectedElements = { wallIds: [], openingIds: [], roomIds: [], bindingIds: [s.id] };
      this.dispatchSelectionChanged();
      return;
    }
    if (this.hass && this.hass.callService) {
      const e = s.entityId.split(".")[0];
      this.hass.callService(e, "toggle", { entity_id: s.entityId }).catch(() => {
        this.hass.callService("homeassistant", "toggle", { entity_id: s.entityId });
      });
    } else
      console.log(`[Demo Standalone] Toggle entité: ${s.entityId}`);
  }
  handleEntityDblClick(s, t) {
    t.stopPropagation(), this.dispatchEvent(new CustomEvent("hass-more-info", {
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
  computeWallPolygon(s, t, e) {
    const o = t.x - s.x, i = t.y - s.y, r = Math.sqrt(o * o + i * i);
    if (r === 0) return [s, s, t, t];
    const n = e / 2, a = -i / r * n, l = o / r * n;
    return [
      { x: s.x + a, y: s.y + l },
      { x: t.x + a, y: t.y + l },
      { x: t.x - a, y: t.y - l },
      { x: s.x - a, y: s.y - l }
    ];
  }
  renderBackgroundLayer() {
    const s = this.project.background;
    if (!s || !s.imageUrl || !s.visible) return null;
    const t = this.worldToScreen(s.offset || { x: 0, y: 0 }), e = s.scale || 1;
    return T`
      <g 
        class="background-image-layer" 
        transform="translate(${t.x}, ${t.y}) scale(${this.viewport.zoom * e})"
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
  pointToSegmentDistance(s, t, e) {
    const o = e.x - t.x, i = e.y - t.y, r = o * o + i * i;
    if (r === 0) return y.distance(s, t);
    let n = ((s.x - t.x) * o + (s.y - t.y) * i) / r;
    n = Math.max(0, Math.min(1, n));
    const a = { x: t.x + n * o, y: t.y + n * i };
    return y.distance(s, a);
  }
  getWallHeight(s) {
    const t = this.project.defaultCeilingHeight || 2.5, e = {
      x: (s.start.x + s.end.x) / 2,
      y: (s.start.y + s.end.y) / 2
    }, o = (this.project.rooms || []).filter((i) => {
      if (!i.polygon || i.polygon.length < 3) return !1;
      if (J.isPointInPolygon(e, i.polygon)) return !0;
      for (let r = 0; r < i.polygon.length; r++) {
        const n = i.polygon[r], a = i.polygon[(r + 1) % i.polygon.length];
        if (this.pointToSegmentDistance(e, n, a) <= s.thickness / 2 + 0.35)
          return !0;
      }
      return !1;
    });
    if (o.length > 0) {
      const i = o.map((r) => r.height || t);
      return Math.max(...i, s.height || 0);
    }
    return s.height || t;
  }
  handleRoomClick(s, t) {
    if (!(this.drawingWallStart || this.calibrateStart || this.rescaleStart)) {
      if (s.stopPropagation(), this.activeTool === "select") {
        const e = s.shiftKey || s.ctrlKey || s.metaKey, o = this.selectedElements.roomIds.includes(t.id);
        if (e) {
          const i = o ? this.selectedElements.roomIds.filter((r) => r !== t.id) : [...this.selectedElements.roomIds, t.id];
          this.selectedElements = { ...this.selectedElements, roomIds: i };
        } else
          this.selectedElements = { wallIds: [], openingIds: [], roomIds: [t.id], bindingIds: [] };
        this.dispatchSelectionChanged();
        return;
      }
      this.dispatchEvent(new CustomEvent("room-selected", {
        detail: { room: t },
        bubbles: !0,
        composed: !0
      }));
    }
  }
  handleRoomDblClick(s, t) {
    s.stopPropagation(), this.dispatchEvent(new CustomEvent("room-selected", {
      detail: { room: t },
      bubbles: !0,
      composed: !0
    }));
  }
  // Rendu des Pièces avec détection d'illumination si lumière allumée
  renderRooms() {
    return this.project.rooms.map((s) => {
      var l, h;
      if (!s.polygon || s.polygon.length < 3) return null;
      const t = s.polygon.map((c) => this.worldToScreen(c)), e = t.map((c) => `${c.x},${c.y}`).join(" "), o = this.project.bindings.filter((c) => c.roomId === s.id && c.entityId.startsWith("light.")).some((c) => {
        var p, f, d;
        return ((d = (f = (p = this.hass) == null ? void 0 : p.states) == null ? void 0 : f[c.entityId]) == null ? void 0 : d.state) === "on";
      }), i = J.calculateCentroid(t), r = s.height || this.project.defaultCeilingHeight || 2.5, n = (s.areaM2 * r).toFixed(1), a = (h = (l = this.selectedElements) == null ? void 0 : l.roomIds) == null ? void 0 : h.includes(s.id);
      return T`
        <g 
          class="room-group ${a ? "selected" : ""}" 
          data-room-id="${s.id}" 
          @click=${(c) => this.handleRoomClick(c, s)}
          @dblclick=${(c) => this.handleRoomDblClick(c, s)}
        >
          <polygon 
            points="${e}" 
            class="room-polygon ${o ? "illuminated" : ""}"
            style="fill: ${s.color || "rgba(56, 189, 248, 0.12)"}; cursor: pointer;"
          />
          ${this.is3DMode ? T`
            <g class="room-3d-badge-group" transform="translate(${i.x}, ${i.y})">
              <rect 
                x="-62" 
                y="-30" 
                width="124" 
                height="60" 
                rx="10" 
                ry="10" 
                fill="rgba(15, 23, 42, 0.84)" 
                stroke="${a ? "#38bdf8" : "rgba(56, 189, 248, 0.4)"}" 
                stroke-width="${a ? 2 : 1}"
                filter="drop-shadow(0 6px 14px rgba(0, 0, 0, 0.6))"
              />
              <text class="room-label-name" y="-12" style="font-size: 12px; font-weight: 700; fill: #f8fafc; text-anchor: middle;">
                ${s.name}
              </text>
              <text class="room-label-area" y="6" style="font-size: 11px; font-weight: 700; fill: #38bdf8; text-anchor: middle; font-family: ui-monospace, SFMono-Regular, monospace;">
                ${s.areaM2.toFixed(1)} m²
              </text>
              <text class="room-label-height" y="21" style="font-size: 9.5px; font-weight: 600; fill: #a5f3fc; text-anchor: middle; font-family: ui-monospace, SFMono-Regular, monospace;">
                H: ${r.toFixed(2)}m · ${n} m³
              </text>
            </g>
          ` : T`
            <g class="room-label-group" transform="translate(${i.x}, ${i.y})">
              <text class="room-label-name" y="-6">${s.name}</text>
              <text class="room-label-area" y="12">${s.areaM2.toFixed(1)} m²</text>
            </g>
          `}
        </g>
      `;
    });
  }
  renderGrid() {
    if (this.is3DMode)
      return T`
        <defs>
          <radialGradient id="ground-shadow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="rgba(0, 0, 0, 0.45)" />
            <stop offset="65%" stop-color="rgba(0, 0, 0, 0.15)" />
            <stop offset="100%" stop-color="rgba(0, 0, 0, 0)" />
          </radialGradient>
          <pattern id="grid-dots-3d" width="40" height="40" patternUnits="userSpaceOnUse"
            patternTransform="translate(${this.viewport.x % 40}, ${this.viewport.y % 40})">
            <circle cx="20" cy="20" r="1.2" fill="rgba(255, 255, 255, 0.08)" />
          </pattern>
        </defs>
        <!-- Grille de repère architectural au sol -->
        <rect x="-4000" y="-4000" width="8000" height="8000" fill="url(#grid-dots-3d)" />
        <!-- Ombre portée architecturale sous le bâtiment -->
        <ellipse cx="${this.viewport.x + 300}" cy="${this.viewport.y + 200}" rx="900" ry="550" fill="url(#ground-shadow)" />
      `;
    const s = this.project.pixelsPerMeter * this.viewport.zoom, e = (this.project.grid.size || 0.5) * s;
    if (e < 12) return null;
    const o = e * 2;
    return T`
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
    const s = this.project.pixelsPerMeter * this.viewport.zoom;
    return this.project.walls.map((t) => {
      var p, f;
      const e = (f = (p = this.selectedElements) == null ? void 0 : p.wallIds) == null ? void 0 : f.includes(t.id), o = this.getWallHeight(t), i = this.is3DMode ? o * s * 0.55 : 0, n = this.computeWallPolygon(t.start, t.end, t.thickness).map((d) => this.worldToScreen(d)), a = this.worldToScreen(t.start), l = this.worldToScreen(t.end), h = n.map((d) => `${d.x},${d.y}`).join(" "), c = y.distance(t.start, t.end), u = {
        x: (a.x + l.x) / 2,
        y: (a.y + l.y) / 2
      };
      if (this.is3DMode) {
        const d = n.map((v) => ({ x: v.x, y: v.y - i })), g = d.map((v) => `${v.x},${v.y}`).join(" "), b = [0, 1, 2, 3].map((v) => {
          const x = (v + 1) % 4, $ = n[v], M = n[x], C = d[x], A = d[v], R = M.x - $.x, W = M.y - $.y, q = Math.sqrt(R * R + W * W) || 1, ut = -W / q, It = R / q, j = Math.max(-1, Math.min(1, ut * -0.7 + It * -0.7)), F = Math.round(e ? 42 + j * 14 : 34 + j * 16), P = e ? `hsl(192, 85%, ${F}%)` : `hsl(215, 22%, ${F}%)`, D = e ? "#38bdf8" : `hsl(215, 22%, ${F + 6}%)`;
          return {
            pts: `${$.x},${$.y} ${M.x},${M.y} ${C.x},${C.y} ${A.x},${A.y}`,
            fill: P,
            stroke: D
          };
        }), S = e ? "#06b6d4" : "#f1f5f9", w = e ? "#22d3ee" : "#94a3b8";
        return T`
          <g 
            class="wall-element-3d ${e ? "selected" : ""}" 
            data-wall-id="${t.id}"
            @click=${(v) => this.handleWallClick(v, t)}
            style="cursor: pointer;"
          >
            <!-- 4 parois verticales solides -->
            ${b.map((v) => T`
              <polygon points="${v.pts}" style="fill: ${v.fill}; stroke: ${v.stroke}; stroke-width: 0.8; stroke-linejoin: round;" />
            `)}
            <!-- Chapeau supérieur du mur -->
            <polygon points="${g}" style="fill: ${S}; stroke: ${w}; stroke-width: 1.2; stroke-linejoin: round;" />
          </g>
        `;
      }
      return T`
        <g 
          class="wall-element ${e ? "selected" : ""}" 
          data-wall-id="${t.id}"
          @click=${(d) => this.handleWallClick(d, t)}
        >
          <polygon points="${h}" class="wall-rect" />
          <line x1="${a.x}" y1="${a.y}" x2="${l.x}" y2="${l.y}" class="wall-centerline" />
          
          ${c >= 0.6 ? T`
            <g class="dimension-badge" transform="translate(${u.x}, ${u.y - 14})">
              <rect x="-26" y="-10" width="52" height="20" />
              <text>${y.roundMeters(c).toFixed(2)} m</text>
            </g>
          ` : null}
        </g>
      `;
    });
  }
  renderOpenings() {
    return this.project.openings.map((s) => {
      var d, g;
      const t = (g = (d = this.selectedElements) == null ? void 0 : d.openingIds) == null ? void 0 : g.includes(s.id), e = this.project.walls.find((b) => b.id === s.wallId);
      if (!e) return null;
      const o = e.end.x - e.start.x, i = e.end.y - e.start.y, r = Math.sqrt(o * o + i * i);
      if (r === 0) return null;
      const a = Math.atan2(i, o) * 180 / Math.PI, l = e.start.x + s.offset / r * o, h = e.start.y + s.offset / r * i, c = this.worldToScreen({ x: l, y: h }), u = this.project.pixelsPerMeter * this.viewport.zoom, p = s.width * u, f = e.thickness * u;
      return T`
        <g 
          class="opening-element ${t ? "selected" : ""}" 
          transform="translate(${c.x}, ${c.y}) rotate(${a})"
          style="cursor: pointer;"
          @click=${(b) => this.handleOpeningClick(b, s)}
        >
          <rect 
            x="${-p / 2}" 
            y="${-f / 2 - 1}" 
            width="${p}" 
            height="${f + 2}" 
            class="wall-cutout"
          />

          ${s.type === "door" ? this.renderDoorSymbol(p, f, s.flipSide, s.flipDirection) : null}
          ${s.type === "window" ? this.renderWindowSymbol(p, f) : null}
          ${s.type === "french_window" ? this.renderFrenchWindowSymbol(p, f) : null}
        </g>
      `;
    });
  }
  renderDoorSymbol(s, t, e, o) {
    const i = s / 2, r = e ? -1 : 1, n = o ? i : -i, a = o ? -1 : 1;
    return T`
      <g>
        <rect x="${-i}" y="${-t / 2}" width="4" height="${t}" fill="#94a3b8" />
        <rect x="${i - 4}" y="${-t / 2}" width="4" height="${t}" fill="#94a3b8" />
        <line 
          x1="${n}" 
          y1="0" 
          x2="${n}" 
          y2="${r * s}" 
          class="opening-door-leaf" 
        />
        <path 
          d="M ${n + a * s} 0 A ${s} ${s} 0 0 ${r > 0 ? o ? 0 : 1 : o ? 1 : 0} ${n} ${r * s}" 
          class="opening-door-arc" 
        />
      </g>
    `;
  }
  renderWindowSymbol(s, t) {
    const e = s / 2;
    return T`
      <g>
        <rect x="${-e}" y="${-t / 2}" width="${s}" height="${t}" fill="none" class="opening-window-frame" />
        <line x1="${-e}" y1="0" x2="${e}" y2="0" class="opening-window-glass" />
        <line x1="${-e + 4}" y1="${-t / 4}" x2="${e - 4}" y2="${-t / 4}" stroke="rgba(56, 189, 248, 0.4)" stroke-width="1" />
        <line x1="${-e + 4}" y1="${t / 4}" x2="${e - 4}" y2="${t / 4}" stroke="rgba(56, 189, 248, 0.4)" stroke-width="1" />
      </g>
    `;
  }
  renderFrenchWindowSymbol(s, t) {
    const e = s / 2;
    return T`
      <g>
        <rect x="${-e}" y="${-t / 2}" width="${s}" height="${t}" fill="none" class="opening-window-frame" />
        <rect x="${-e}" y="${-t / 4}" width="${e}" height="3" fill="#38bdf8" />
        <rect x="0" y="${t / 4}" width="${e}" height="3" fill="#38bdf8" />
      </g>
    `;
  }
  // ==========================================
  // RENDU DES PINS D'ENTITÉS HOME ASSISTANT
  // ==========================================
  renderEntityBindings() {
    return this.project.bindings.map((s) => {
      var h, c, u, p, f;
      const t = this.worldToScreen(s.position), e = (c = (h = this.hass) == null ? void 0 : h.states) == null ? void 0 : c[s.entityId], o = (e == null ? void 0 : e.state) || "off", i = s.entityId.startsWith("light.") && o === "on", r = s.entityId.startsWith("binary_sensor.") && (o === "on" || o === "detected"), n = s.entityId.startsWith("sensor.") || s.entityId.startsWith("climate."), a = ((u = e == null ? void 0 : e.attributes) == null ? void 0 : u.unit_of_measurement) || (n ? "°" : ""), l = (f = (p = this.selectedElements) == null ? void 0 : p.bindingIds) == null ? void 0 : f.includes(s.id);
      return T`
        <g 
          class="entity-pin ${l ? "selected" : ""} ${i ? "active-light" : ""} ${r ? "active-radar" : ""}"
          transform="translate(${t.x}, ${t.y})"
          @click=${(d) => this.handleEntityClick(s, d)}
          @dblclick=${(d) => this.handleEntityDblClick(s, d)}
          title="${s.customName || s.entityId} : ${o} (Clic pour basculer)"
        >
          <!-- Onde radar animée si mouvement détecté -->
          ${r ? T`<circle cx="0" cy="0" r="16" class="radar-pulse-ring" />` : null}

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
          ${n && o !== "unknown" ? T`
            <g class="entity-pin-value-badge" transform="translate(14, -14)">
              <rect x="-14" y="-8" width="28" height="16" />
              <text>${o}${a}</text>
            </g>
          ` : null}
        </g>
      `;
    });
  }
  renderOpeningPreview() {
    if (!this.wallSnap) return null;
    const s = this.project.pixelsPerMeter * this.viewport.zoom, t = (this.currentOpeningWidth || 0.9) * s, e = this.wallSnap.wall.thickness * s, o = this.worldToScreen(this.wallSnap.projectionPoint), i = this.wallSnap.angleRad * 180 / Math.PI;
    return T`
      <g 
        class="opening-preview" 
        transform="translate(${o.x}, ${o.y}) rotate(${i})"
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
    ).map((a) => this.worldToScreen(a)), e = this.worldToScreen(this.drawingWallStart), o = this.worldToScreen(this.previewPoint), i = t.map((a) => `${a.x},${a.y}`).join(" "), r = y.distance(this.drawingWallStart, this.previewPoint), n = {
      x: (e.x + o.x) / 2,
      y: (e.y + o.y) / 2
    };
    return T`
      <g class="preview-wall-group">
        <polygon points="${i}" class="preview-wall-rect" />
        <line x1="${e.x}" y1="${e.y}" x2="${o.x}" y2="${o.y}" class="preview-wall-line" />

        ${this.snapInfo.guideAngle !== void 0 ? T`
          <line x1="${e.x}" y1="${e.y}" x2="${o.x}" y2="${o.y}" class="angle-guide-line" />
        ` : null}

        <g class="dimension-badge" transform="translate(${n.x}, ${n.y - 16})">
          <rect x="-30" y="-11" width="60" height="22" />
          <text>${y.roundMeters(r).toFixed(2)} m</text>
        </g>
      </g>
    `;
  }
  renderCalibrationLine() {
    if (!this.calibrateStart || !this.calibrateCurrent) return null;
    const s = this.calibrateStart, t = this.calibrateCurrent, e = t.x - s.x, o = t.y - s.y, i = Math.sqrt(e * e + o * o), r = { x: (s.x + t.x) / 2, y: (s.y + t.y) / 2 };
    return T`
      <g class="calibration-preview-group">
        <line x1="${s.x}" y1="${s.y}" x2="${t.x}" y2="${t.y}" class="calibration-line" />
        <circle cx="${s.x}" cy="${s.y}" r="6" class="calibration-endpoint" />
        <circle cx="${t.x}" cy="${t.y}" r="6" class="calibration-endpoint" />

        <g class="dimension-badge" transform="translate(${r.x}, ${r.y - 18})">
          <rect x="-35" y="-11" width="70" height="22" style="stroke: #f59e0b;" />
          <text style="fill: #f59e0b;">${Math.round(i)} px</text>
        </g>
      </g>
    `;
  }
  renderRescaleLine() {
    if (!this.rescaleStart || !this.rescaleCurrent) return null;
    const s = this.worldToScreen(this.rescaleStart), t = this.worldToScreen(this.rescaleCurrent), e = y.distance(this.rescaleStart, this.rescaleCurrent), o = {
      x: (s.x + t.x) / 2,
      y: (s.y + t.y) / 2
    };
    return T`
      <g class="rescale-preview-group">
        <line 
          x1="${s.x}" y1="${s.y}" 
          x2="${t.x}" y2="${t.y}" 
          stroke="#38bdf8" 
          stroke-width="3" 
          stroke-dasharray="6, 4" 
        />
        <circle cx="${s.x}" cy="${s.y}" r="6" fill="#38bdf8" stroke="#ffffff" stroke-width="2" />
        <circle cx="${t.x}" cy="${t.y}" r="6" fill="#0284c7" stroke="#38bdf8" stroke-width="2" />

        <g class="dimension-badge" transform="translate(${o.x}, ${o.y - 18})">
          <rect x="-48" y="-13" width="96" height="26" rx="6" fill="#0f172a" stroke="#38bdf8" stroke-width="1.8" />
          <text fill="#38bdf8" font-size="12px" font-weight="800" text-anchor="middle" dy="5">
            📐 ${y.roundMeters(e).toFixed(2)} m
          </text>
        </g>
      </g>
    `;
  }
  renderSnapIndicator() {
    if (!this.previewPoint || this.snapInfo.snappedTo === "none") return null;
    const s = this.worldToScreen(this.previewPoint), t = this.snapInfo.snappedTo === "vertex";
    return T`
      <g transform="translate(${s.x}, ${s.y})">
        <circle r="${t ? 7 : 5}" class="snap-indicator" />
        ${t ? T`<circle r="2" fill="#38bdf8" />` : null}
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
    return this.isDashboardMode ? null : this.is3DMode ? "Vue 3D Interactive : Glisser (clic gauche/droit) pour pivoter 360°, Molette pour zoomer, Shift+glisser pour déplacer." : this.activeTool === "select" ? "Mode Sélection : Cliquez sur un élément pour le sélectionner (Shift pour multi-sélection, Shift+glisser pour cadre). Suppr pour effacer." : this.activeTool === "wall" ? this.drawingWallStart ? "Cliquez pour terminer le mur. Échap pour annuler." : "Cliquez pour démarrer un mur." : this.activeTool === "door" ? "Survolez un mur. Espace = inverser intérieur/extérieur. F = gauche/droite." : this.activeTool === "window" || this.activeTool === "french_window" ? "Survolez un mur pour insérer la fenêtre." : this.activeTool === "calibrate" ? this.calibrateStart ? "Cliquez sur la 2ème extrémité du mur mesuré." : "Tracez un segment sur un mur pour étalonner l'échelle." : this.activeTool === "rescale" ? this.rescaleStart ? "Tracez la ligne jusqu'au 2ème point (autre extrémité du mur ou point de référence)." : "Mettre à l'échelle : Sélectionnez un mur ou cliquez sur le 1er point de mesure." : null;
  }
  render() {
    const s = this.getHelpMessage();
    return k`
      <div 
        class="canvas-container ${this.isPanning ? "is-panning" : ""} ${this.isOrbiting ? "is-orbiting" : ""} ${this.isDashboardMode ? "dashboard-mode" : ""}"
        @wheel=${this.handleWheel}
        @pointerdown=${this.handlePointerDown}
        @pointermove=${this.handlePointerMove}
        @pointerup=${this.handlePointerUp}
        @contextmenu=${(t) => {
      this.is3DMode && t.preventDefault();
    }}
        @dragover=${this.handleDragOver}
        @drop=${this.handleDrop}
      >
        <div 
          class="viewport-3d-wrapper ${this.is3DMode ? "mode-3d" : ""}"
          style="${this.is3DMode ? `transform: rotateX(${this.orbitPitch}deg) rotateZ(${this.orbitYaw}deg); transition: ${this.isOrbiting ? "none" : "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)"};` : ""}"
        >
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

        ${!this.isDashboardMode && s ? k`<div class="help-hud">${s}</div>` : null}

        ${this.isDashboardMode ? null : k`
          <div class="coords-hud">
            X: ${this.cursorCoords.x.toFixed(2)} m | Y: ${this.cursorCoords.y.toFixed(2)} m | Outil: ${this.activeTool.toUpperCase()}
          </div>
        `}

        <!-- HUD Contrôles Zoom & 3D -->
        <div class="canvas-hud">
          <button 
            class="hud-btn ${this.is3DMode ? "active" : ""}" 
            @click=${this.toggle3DMode} 
            title="Basculer Vue 2D / 3D Isométrique"
          >
            ${this.is3DMode ? "🧊" : "📐"}
          </button>

          ${this.is3DMode ? k`
            <div class="hud-preset-group">
              <span class="hud-angle-badge">${Math.round(this.orbitYaw)}° / ${Math.round(this.orbitPitch)}°</span>
              <button class="hud-preset-btn" @click=${() => this.setCameraPreset(55, -35)} title="Vue Sud-Ouest (Défaut)">SO</button>
              <button class="hud-preset-btn" @click=${() => this.setCameraPreset(55, 35)} title="Vue Sud-Est">SE</button>
              <button class="hud-preset-btn" @click=${() => this.setCameraPreset(55, 125)} title="Vue Nord-Est">NE</button>
              <button class="hud-preset-btn" @click=${() => this.setCameraPreset(55, -125)} title="Vue Nord-Ouest">NO</button>
              <button class="hud-preset-btn" @click=${() => this.setCameraPreset(75, 0)} title="Vue Plongeante">Top</button>
            </div>
          ` : null}

          <button class="hud-btn" @click=${this.zoomOut} title="Zoom Arrière">−</button>
          <div class="hud-zoom-label">${Math.round(this.viewport.zoom * 100)}%</div>
          <button class="hud-btn" @click=${this.zoomIn} title="Zoom Avant">+</button>
          <button class="hud-btn" @click=${this.resetView} title="Recentrer">⌖</button>
        </div>
      </div>
    `;
  }
};
_.styles = je;
E([
  I({ type: Object })
], _.prototype, "hass", 2);
E([
  I({ type: Object })
], _.prototype, "project", 2);
E([
  I({ type: String })
], _.prototype, "activeTool", 2);
E([
  I({ type: Number })
], _.prototype, "currentWallThickness", 2);
E([
  I({ type: Number })
], _.prototype, "currentOpeningWidth", 2);
E([
  I({ type: Boolean })
], _.prototype, "is3DMode", 2);
E([
  I({ type: Object })
], _.prototype, "selectedElements", 2);
E([
  I({ type: Boolean })
], _.prototype, "isDashboardMode", 2);
E([
  m()
], _.prototype, "isMarqueeSelecting", 2);
E([
  m()
], _.prototype, "marqueeStart", 2);
E([
  m()
], _.prototype, "marqueeCurrent", 2);
E([
  m()
], _.prototype, "viewport", 2);
E([
  m()
], _.prototype, "isPanning", 2);
E([
  m()
], _.prototype, "drawingWallStart", 2);
E([
  m()
], _.prototype, "previewPoint", 2);
E([
  m()
], _.prototype, "snapInfo", 2);
E([
  m()
], _.prototype, "cursorCoords", 2);
E([
  m()
], _.prototype, "wallSnap", 2);
E([
  m()
], _.prototype, "openingFlipSide", 2);
E([
  m()
], _.prototype, "openingFlipDirection", 2);
E([
  m()
], _.prototype, "calibrateStart", 2);
E([
  m()
], _.prototype, "calibrateCurrent", 2);
E([
  m()
], _.prototype, "rescaleStart", 2);
E([
  m()
], _.prototype, "rescaleCurrent", 2);
E([
  m()
], _.prototype, "orbitPitch", 2);
E([
  m()
], _.prototype, "orbitYaw", 2);
E([
  m()
], _.prototype, "isOrbiting", 2);
_ = E([
  X("home-architect-canvas")
], _);
var We = Object.defineProperty, Fe = Object.getOwnPropertyDescriptor, xt = (s, t, e, o) => {
  for (var i = o > 1 ? void 0 : o ? Fe(t, e) : t, r = s.length - 1, n; r >= 0; r--)
    (n = s[r]) && (i = (o ? n(t, e, i) : n(i)) || i);
  return o && i && We(t, e, i), i;
};
let ot = class extends U {
  constructor() {
    super(...arguments), this.activeTool = "wall", this.canUndo = !1, this.canRedo = !1, this.position = { x: 20, y: 20 }, this.isDragging = !1, this.dragStartPointer = { x: 0, y: 0 }, this.dragStartPosition = { x: 20, y: 20 };
  }
  connectedCallback() {
    super.connectedCallback();
    try {
      const s = localStorage.getItem("home_architect_toolbar_pos");
      if (s) {
        const t = JSON.parse(s);
        typeof t.x == "number" && typeof t.y == "number" && (this.position = t);
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
    const t = s.clientX - this.dragStartPointer.x, e = s.clientY - this.dragStartPointer.y, i = (this.parentElement || document.body).getBoundingClientRect(), r = this.getBoundingClientRect(), n = 8, a = Math.max(n, i.width - r.width - 8), l = 8, h = Math.max(l, i.height - r.height - 8), c = Math.min(Math.max(this.dragStartPosition.x + t, n), a), u = Math.min(Math.max(this.dragStartPosition.y + e, l), h);
    this.position = { x: Math.round(c), y: Math.round(u) }, this.updateHostPosition();
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
    return k`
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
ot.styles = G`
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
xt([
  I({ type: String })
], ot.prototype, "activeTool", 2);
xt([
  I({ type: Boolean })
], ot.prototype, "canUndo", 2);
xt([
  I({ type: Boolean })
], ot.prototype, "canRedo", 2);
xt([
  m()
], ot.prototype, "position", 2);
xt([
  m()
], ot.prototype, "isDragging", 2);
ot = xt([
  X("home-architect-toolbar")
], ot);
var Le = Object.defineProperty, Ne = Object.getOwnPropertyDescriptor, Q = (s, t, e, o) => {
  for (var i = o > 1 ? void 0 : o ? Ne(t, e) : t, r = s.length - 1, n; r >= 0; r--)
    (n = s[r]) && (i = (o ? n(t, e, i) : n(i)) || i);
  return o && i && Le(t, e, i), i;
};
const tt = [
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
let Y = class extends U {
  constructor() {
    super(...arguments), this.selectedTemplate = tt[0], this.width = tt[0].widthMeters, this.length = tt[0].lengthMeters, this.thickness = tt[0].wallThickness, this.addDoor = tt[0].addDoor, this.addWindow = tt[0].addWindow, this.roomName = tt[0].name, this.height = 2.5;
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
    return k`
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
          ${tt.map((t) => k`
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
                @input=${(t) => this.height = parseFloat(t.target.value) || 2.5}
              />
              <span>m</span>
            </div>
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
Y.styles = G`
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
Q([
  m()
], Y.prototype, "selectedTemplate", 2);
Q([
  m()
], Y.prototype, "width", 2);
Q([
  m()
], Y.prototype, "length", 2);
Q([
  m()
], Y.prototype, "thickness", 2);
Q([
  m()
], Y.prototype, "addDoor", 2);
Q([
  m()
], Y.prototype, "addWindow", 2);
Q([
  m()
], Y.prototype, "roomName", 2);
Q([
  m()
], Y.prototype, "height", 2);
Y = Q([
  X("home-architect-wizard-modal")
], Y);
var He = Object.defineProperty, Ue = Object.getOwnPropertyDescriptor, Ot = (s, t, e, o) => {
  for (var i = o > 1 ? void 0 : o ? Ue(t, e) : t, r = s.length - 1, n; r >= 0; r--)
    (n = s[r]) && (i = (o ? n(t, e, i) : n(i)) || i);
  return o && i && He(t, e, i), i;
};
let mt = class extends U {
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
    return k`
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
mt.styles = G`
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
Ot([
  I({ type: Number })
], mt.prototype, "pixelDistance", 2);
Ot([
  I({ type: Number })
], mt.prototype, "defaultMeters", 2);
Ot([
  m()
], mt.prototype, "realMeters", 2);
mt = Ot([
  X("home-architect-calibrate-modal")
], mt);
var qe = Object.defineProperty, Be = Object.getOwnPropertyDescriptor, Pt = (s, t, e, o) => {
  for (var i = o > 1 ? void 0 : o ? Be(t, e) : t, r = s.length - 1, n; r >= 0; r--)
    (n = s[r]) && (i = (o ? n(t, e, i) : n(i)) || i);
  return o && i && qe(t, e, i), i;
};
const ne = {
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
let ct = class extends U {
  constructor() {
    super(...arguments), this.collapsed = !1, this.searchQuery = "", this.activeCategory = "all";
  }
  getEntities() {
    var s;
    return (s = this.hass) != null && s.states ? Object.values(this.hass.states).map((t) => {
      var i, r;
      const e = t.entity_id.split(".")[0], o = ne[e] || ne.default;
      return {
        entity_id: t.entity_id,
        name: ((i = t.attributes) == null ? void 0 : i.friendly_name) || t.entity_id,
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
  handleDragStart(s, t) {
    s.dataTransfer && (s.dataTransfer.setData("application/json", JSON.stringify({
      entityId: t.entity_id,
      domain: t.domain,
      name: t.name,
      icon: t.icon
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
    let t = this.getEntities();
    if (this.activeCategory !== "all" && (t = t.filter((e) => e.domain === this.activeCategory)), this.searchQuery.trim()) {
      const e = this.searchQuery.toLowerCase();
      t = t.filter((o) => o.name.toLowerCase().includes(e) || o.entity_id.toLowerCase().includes(e));
    }
    return k`
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
        ${t.length === 0 ? k`
          <div class="empty-message">Aucune entité trouvée</div>
        ` : t.map((e) => k`
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
ct.styles = G`
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
Pt([
  I({ type: Object })
], ct.prototype, "hass", 2);
Pt([
  I({ type: Boolean, reflect: !0 })
], ct.prototype, "collapsed", 2);
Pt([
  m()
], ct.prototype, "searchQuery", 2);
Pt([
  m()
], ct.prototype, "activeCategory", 2);
ct = Pt([
  X("home-architect-entity-drawer")
], ct);
var Ve = Object.defineProperty, Ye = Object.getOwnPropertyDescriptor, Dt = (s, t, e, o) => {
  for (var i = o > 1 ? void 0 : o ? Ye(t, e) : t, r = s.length - 1, n; r >= 0; r--)
    (n = s[r]) && (i = (o ? n(t, e, i) : n(i)) || i);
  return o && i && Ve(t, e, i), i;
};
const Ge = [
  { name: "Bleu ciel", color: "rgba(56, 189, 248, 0.18)" },
  { name: "Violet moderne", color: "rgba(168, 85, 247, 0.18)" },
  { name: "Ambre chaleureux", color: "rgba(245, 158, 11, 0.18)" },
  { name: "Émeraude nature", color: "rgba(16, 185, 129, 0.18)" },
  { name: "Indigo profond", color: "rgba(99, 102, 241, 0.18)" },
  { name: "Rose pastel", color: "rgba(244, 63, 94, 0.18)" },
  { name: "Gris ardoise", color: "rgba(148, 163, 184, 0.18)" }
], Xe = [
  { label: "2.10 m (Sous-sol)", val: 2.1 },
  { label: "2.30 m (Combles)", val: 2.3 },
  { label: "2.50 m (Standard)", val: 2.5 },
  { label: "2.70 m (Élevé)", val: 2.7 },
  { label: "3.00 m (Haussmann)", val: 3 },
  { label: "3.50 m (Cathédrale)", val: 3.5 }
];
let dt = class extends U {
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
    return k`
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
              @input=${(t) => this.name = t.target.value}
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
                @input=${(t) => this.height = parseFloat(t.target.value) || 2.5}
              />
              <span class="unit-tag">mètres</span>
            </div>

            <!-- Préréglages rapides -->
            <div class="presets-row">
              ${Xe.map((t) => k`
                <button 
                  class="preset-pill ${Math.abs(this.height - t.val) < 0.02 ? "active" : ""}"
                  @click=${() => this.height = t.val}
                >
                  ${t.label}
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
              ${Ge.map((t) => k`
                <div 
                  class="color-swatch ${this.color === t.color ? "active" : ""}" 
                  style="background: ${t.color};"
                  title="${t.name}"
                  @click=${() => this.color = t.color}
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
dt.styles = G`
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
Dt([
  I({ type: Object })
], dt.prototype, "room", 2);
Dt([
  m()
], dt.prototype, "name", 2);
Dt([
  m()
], dt.prototype, "height", 2);
Dt([
  m()
], dt.prototype, "color", 2);
dt = Dt([
  X("home-architect-room-modal")
], dt);
class V {
  constructor(t = 1, e = 0, o = 0, i = 1, r = 0, n = 0) {
    this.a = t, this.b = e, this.c = o, this.d = i, this.e = r, this.f = n;
  }
  static identity() {
    return new V(1, 0, 0, 1, 0, 0);
  }
  multiply(t) {
    return new V(
      this.a * t.a + this.c * t.b,
      this.b * t.a + this.d * t.b,
      this.a * t.c + this.c * t.d,
      this.b * t.c + this.d * t.d,
      this.a * t.e + this.c * t.f + this.e,
      this.b * t.e + this.d * t.f + this.f
    );
  }
  translate(t, e) {
    return this.multiply(new V(1, 0, 0, 1, t, e));
  }
  scale(t, e = t) {
    return this.multiply(new V(t, 0, 0, e, 0, 0));
  }
  rotate(t) {
    const e = t * Math.PI / 180, o = Math.cos(e), i = Math.sin(e);
    return this.multiply(new V(o, i, -i, o, 0, 0));
  }
  transformPoint(t) {
    return {
      x: this.a * t.x + this.c * t.y + this.e,
      y: this.b * t.x + this.d * t.y + this.f
    };
  }
  static parseTransform(t) {
    if (!t) return V.identity();
    let e = V.identity();
    const o = /([a-zA-Z]+)\s*\(([^)]+)\)/g;
    let i;
    for (; (i = o.exec(t)) !== null; ) {
      const r = i[1].toLowerCase(), n = i[2].trim().split(/[\s,]+/).map(parseFloat).filter((a) => !isNaN(a));
      r === "matrix" && n.length >= 6 ? e = e.multiply(new V(n[0], n[1], n[2], n[3], n[4], n[5])) : r === "translate" && n.length >= 1 ? e = e.translate(n[0], n[1] || 0) : r === "scale" && n.length >= 1 ? e = e.scale(n[0], n[1] !== void 0 ? n[1] : n[0]) : r === "rotate" && n.length >= 1 && (n.length >= 3 ? e = e.translate(n[1], n[2]).rotate(n[0]).translate(-n[1], -n[2]) : e = e.rotate(n[0]));
    }
    return e;
  }
}
class Ke {
  /**
   * Main entry point to parse and interpret an architectural SVG floor plan
   */
  static parseSvg(t, e = 12, o = 0.2, i = 2.5, r) {
    try {
      const n = {
        importWalls: !0,
        importDoors: !0,
        importWindows: !0,
        importRooms: !0,
        importLabels: !0,
        ...r
      }, l = new DOMParser().parseFromString(t, "image/svg+xml"), h = l.querySelector("parsererror");
      if (h)
        return {
          success: !1,
          walls: [],
          openings: [],
          rooms: [],
          viewBox: { x: 0, y: 0, width: 0, height: 0 },
          pixelsPerMeter: 50,
          stats: { wallCount: 0, doorCount: 0, windowCount: 0, roomCount: 0, textLabelCount: 0, ignoredMeasurementLinesCount: 0 },
          error: "Le fichier SVG contient des erreurs XML : " + h.textContent
        };
      const c = l.querySelector("svg");
      if (!c)
        return {
          success: !1,
          walls: [],
          openings: [],
          rooms: [],
          viewBox: { x: 0, y: 0, width: 0, height: 0 },
          pixelsPerMeter: 50,
          stats: { wallCount: 0, doorCount: 0, windowCount: 0, roomCount: 0, textLabelCount: 0, ignoredMeasurementLinesCount: 0 },
          error: "Aucune balise <svg> trouvée dans le document."
        };
      const u = this.extractViewBox(c), p = u.width > 0 ? u.width : 1e3, f = e / p, d = Math.round(p / e * 10) / 10, g = [], b = [], S = [], w = [];
      this.traverseElement(c, V.identity(), {
        segments: g,
        arcs: b,
        textLabels: S,
        polygons: w,
        defaultThickness: o
      });
      const v = g.filter((W) => W.isMeasurementLine).length, x = this.convertSegmentsToWalls(
        g,
        u,
        f,
        o,
        i
      ), $ = this.detectOpenings(
        b,
        g,
        x,
        u,
        f
      ), M = this.detectRooms(
        w,
        x,
        S,
        u,
        f,
        i,
        n.importLabels !== !1
      ), C = n.importWalls !== !1 ? x : [], A = $.filter((W) => W.type === "door" ? n.importDoors !== !1 : n.importWindows !== !1), R = n.importRooms !== !1 ? M : [];
      return {
        success: !0,
        walls: C,
        openings: A,
        rooms: R,
        viewBox: u,
        pixelsPerMeter: d || 50,
        stats: {
          wallCount: x.length,
          doorCount: $.filter((W) => W.type === "door").length,
          windowCount: $.filter((W) => W.type === "window" || W.type === "french_window").length,
          roomCount: M.length,
          textLabelCount: S.length,
          ignoredMeasurementLinesCount: v
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
        stats: { wallCount: 0, doorCount: 0, windowCount: 0, roomCount: 0, textLabelCount: 0, ignoredMeasurementLinesCount: 0 },
        error: `Erreur d'interprétation : ${n.message || String(n)}`
      };
    }
  }
  /**
   * Extrait la viewBox ou dimensions de l'élément SVG racine
   */
  static extractViewBox(t) {
    const e = t.getAttribute("viewBox");
    if (e) {
      const n = e.trim().split(/[\s,]+/).map(parseFloat).filter((a) => !isNaN(a));
      if (n.length >= 4 && n[2] > 0 && n[3] > 0)
        return { x: n[0], y: n[1], width: n[2], height: n[3] };
    }
    const o = (n, a) => {
      if (!n) return a;
      const l = parseFloat(n);
      return isNaN(l) ? a : n.includes("mm") ? l * 3.7795 : n.includes("cm") ? l * 37.795 : n.includes("in") ? l * 96 : n.includes("pt") ? l * 1.333 : l;
    }, i = o(t.getAttribute("width"), 1e3), r = o(t.getAttribute("height"), 750);
    return { x: 0, y: 0, width: i, height: r };
  }
  /**
   * Parcours récursif des nœuds de l'arbre SVG
   */
  static traverseElement(t, e, o) {
    var W, q, ut, It;
    const i = t.getAttribute("transform"), r = i ? e.multiply(V.parseTransform(i)) : e, n = t.tagName.toLowerCase(), a = (t.getAttribute("id") || "").toLowerCase(), l = (t.getAttribute("class") || "").toLowerCase(), h = (t.getAttribute("inkscape:label") || "").toLowerCase(), c = (((W = t.closest("g[id]")) == null ? void 0 : W.getAttribute("id")) || "").toLowerCase(), u = (((q = t.parentElement) == null ? void 0 : q.getAttribute("class")) || "").toLowerCase(), p = `${a} ${l} ${h} ${c} ${u}`, f = t.getAttribute("stroke-dasharray") || "", d = (t.getAttribute("style") || "").toLowerCase(), g = ((ut = t.closest("[stroke-dasharray]")) == null ? void 0 : ut.getAttribute("stroke-dasharray")) || "", w = !!f && f !== "none" && f !== "0" || /stroke-dasharray\s*:\s*(?!none|0)[\d\s,.]+/i.test(d) || !!g && g !== "none" && g !== "0" || /dashed|dotted/.test(d) || /pointill|tirete|dashed|dotted/.test(p) || /dimension|cotation|mesure|cote|measure|guideline|guide|axis|axe|fleche|arrow|marker|tick/i.test(p) || t.hasAttribute("marker-start") || t.hasAttribute("marker-end") || t.closest('g[id*="dimension" i], g[id*="cotation" i], g[id*="cote" i], g[id*="measure" i], g[id*="guide" i]') !== null, v = /door|porte|portillon|swing|battant/.test(p), x = /window|fenetre|vitrage|chassis|baie/.test(p), $ = !w && (/wall|mur|cloison|facade|envelope|structure|enveloppe/.test(p) || !v && !x), M = /room|piece|espace|zone|area|chambre|salon|cuisine|sdb|sejour/.test(p), C = t.getAttribute("fill") || "", A = t.getAttribute("display"), R = t.getAttribute("visibility");
    if (!(A === "none" || R === "hidden")) {
      switch (n) {
        case "line": {
          const j = parseFloat(t.getAttribute("x1") || "0"), F = parseFloat(t.getAttribute("y1") || "0"), P = parseFloat(t.getAttribute("x2") || "0"), D = parseFloat(t.getAttribute("y2") || "0"), it = r.transformPoint({ x: j, y: F }), yt = r.transformPoint({ x: P, y: D });
          o.segments.push({
            start: it,
            end: yt,
            thickness: o.defaultThickness,
            isWallHint: $ && !w,
            isWindowHint: x,
            isDoorHint: v,
            isMeasurementLine: w
          });
          break;
        }
        case "polyline":
        case "polygon": {
          const F = (t.getAttribute("points") || "").trim().split(/[\s,]+/).map(parseFloat).filter((D) => !isNaN(D)), P = [];
          for (let D = 0; D < F.length; D += 2)
            D + 1 < F.length && P.push(r.transformPoint({ x: F[D], y: F[D + 1] }));
          if (P.length >= 2) {
            for (let D = 0; D < P.length - 1; D++)
              o.segments.push({
                start: P[D],
                end: P[D + 1],
                thickness: o.defaultThickness,
                isWallHint: $ && !w,
                isWindowHint: x,
                isDoorHint: v,
                isMeasurementLine: w
              });
            n === "polygon" && P.length >= 3 && (o.segments.push({
              start: P[P.length - 1],
              end: P[0],
              thickness: o.defaultThickness,
              isWallHint: $ && !w,
              isWindowHint: x,
              isDoorHint: v,
              isMeasurementLine: w
            }), w || o.polygons.push({
              points: P,
              isRoomHint: M,
              fill: C
            }));
          }
          break;
        }
        case "rect": {
          const j = parseFloat(t.getAttribute("x") || "0"), F = parseFloat(t.getAttribute("y") || "0"), P = parseFloat(t.getAttribute("width") || "0"), D = parseFloat(t.getAttribute("height") || "0");
          if (P > 0 && D > 0) {
            const it = r.transformPoint({ x: j, y: F }), yt = r.transformPoint({ x: j + P, y: F }), Rt = r.transformPoint({ x: j + P, y: F + D }), Wt = r.transformPoint({ x: j, y: F + D });
            if (Math.max(P / D, D / P) >= 3 && !w)
              if (P > D) {
                const Ft = r.transformPoint({ x: j, y: F + D / 2 }), Lt = r.transformPoint({ x: j + P, y: F + D / 2 });
                o.segments.push({
                  start: Ft,
                  end: Lt,
                  thickness: o.defaultThickness,
                  isWallHint: !0,
                  isWindowHint: x,
                  isDoorHint: v,
                  isMeasurementLine: !1
                });
              } else {
                const Ft = r.transformPoint({ x: j + P / 2, y: F }), Lt = r.transformPoint({ x: j + P / 2, y: F + D });
                o.segments.push({
                  start: Ft,
                  end: Lt,
                  thickness: o.defaultThickness,
                  isWallHint: !0,
                  isWindowHint: x,
                  isDoorHint: v,
                  isMeasurementLine: !1
                });
              }
            else
              w || (o.polygons.push({
                points: [it, yt, Rt, Wt],
                isRoomHint: M || C !== "none" && C !== "#000000" && C !== "black",
                fill: C
              }), o.segments.push(
                { start: it, end: yt, thickness: o.defaultThickness, isWallHint: $, isWindowHint: x, isDoorHint: v, isMeasurementLine: !1 },
                { start: yt, end: Rt, thickness: o.defaultThickness, isWallHint: $, isWindowHint: x, isDoorHint: v, isMeasurementLine: !1 },
                { start: Rt, end: Wt, thickness: o.defaultThickness, isWallHint: $, isWindowHint: x, isDoorHint: v, isMeasurementLine: !1 },
                { start: Wt, end: it, thickness: o.defaultThickness, isWallHint: $, isWindowHint: x, isDoorHint: v, isMeasurementLine: !1 }
              ));
          }
          break;
        }
        case "path": {
          const j = t.getAttribute("d");
          j && this.parsePathData(
            j,
            r,
            o,
            $ && !w,
            x,
            v,
            w,
            C
          );
          break;
        }
        case "text": {
          const j = parseFloat(t.getAttribute("x") || "0"), F = parseFloat(t.getAttribute("y") || "0"), P = ((It = t.textContent) == null ? void 0 : It.trim()) || "", D = /^\d+([.,]\d+)?\s*(m|cm|mm)?$/i.test(P);
          if (P.length > 0 && !D) {
            const it = r.transformPoint({ x: j, y: F });
            o.textLabels.push({
              text: P,
              position: it
            });
          }
          break;
        }
      }
      for (let j = 0; j < t.children.length; j++)
        this.traverseElement(t.children[j], r, o);
    }
  }
  /**
   * Parse une chaîne de commandes SVG path ('d')
   */
  static parsePathData(t, e, o, i, r, n, a, l) {
    const h = /([a-df-z])|([-+]?(?:\d*\.\d+|\d+)(?:[eE][-+]?\d+)?)/gi, c = [];
    let u;
    for (; (u = h.exec(t)) !== null; )
      c.push(u[0]);
    let p = { x: 0, y: 0 }, f = { x: 0, y: 0 }, d = [], g = 0, b = "";
    for (; g < c.length; ) {
      const S = c[g];
      /^[a-df-z]$/i.test(S) && (b = S, g++);
      const w = b === b.toLowerCase(), v = b.toUpperCase();
      switch (v) {
        case "M": {
          const x = parseFloat(c[g++]), $ = parseFloat(c[g++]);
          !isNaN(x) && !isNaN($) && (p = w ? { x: p.x + x, y: p.y + $ } : { x, y: $ }, f = { ...p }, d.length >= 3 && !a && o.polygons.push({
            points: d.map((M) => e.transformPoint(M)),
            isRoomHint: i ? !1 : l !== "none" && l !== "",
            fill: l
          }), d = [{ ...p }]);
          break;
        }
        case "L": {
          const x = parseFloat(c[g++]), $ = parseFloat(c[g++]);
          if (!isNaN(x) && !isNaN($)) {
            const M = w ? { x: p.x + x, y: p.y + $ } : { x, y: $ }, C = e.transformPoint(p), A = e.transformPoint(M);
            o.segments.push({
              start: C,
              end: A,
              thickness: o.defaultThickness,
              isWallHint: i && !a,
              isWindowHint: r,
              isDoorHint: n,
              isMeasurementLine: a
            }), p = M, d.push({ ...p });
          }
          break;
        }
        case "H": {
          const x = parseFloat(c[g++]);
          if (!isNaN(x)) {
            const $ = w ? { x: p.x + x, y: p.y } : { x, y: p.y }, M = e.transformPoint(p), C = e.transformPoint($);
            o.segments.push({
              start: M,
              end: C,
              thickness: o.defaultThickness,
              isWallHint: i && !a,
              isWindowHint: r,
              isDoorHint: n,
              isMeasurementLine: a
            }), p = $, d.push({ ...p });
          }
          break;
        }
        case "V": {
          const x = parseFloat(c[g++]);
          if (!isNaN(x)) {
            const $ = w ? { x: p.x, y: p.y + x } : { x: p.x, y: x }, M = e.transformPoint(p), C = e.transformPoint($);
            o.segments.push({
              start: M,
              end: C,
              thickness: o.defaultThickness,
              isWallHint: i && !a,
              isWindowHint: r,
              isDoorHint: n,
              isMeasurementLine: a
            }), p = $, d.push({ ...p });
          }
          break;
        }
        case "A": {
          const x = parseFloat(c[g++]), $ = parseFloat(c[g++]);
          parseFloat(c[g++]), parseFloat(c[g++]);
          const M = parseFloat(c[g++]), C = parseFloat(c[g++]), A = parseFloat(c[g++]);
          if (!isNaN(C) && !isNaN(A) && !isNaN(x) && !isNaN($)) {
            const R = w ? { x: p.x + C, y: p.y + A } : { x: C, y: A }, W = e.transformPoint(p), q = e.transformPoint(R);
            o.arcs.push({
              start: W,
              end: q,
              rx: x,
              ry: $,
              sweepFlag: M === 1,
              isDoorHint: !0
            }), p = R, d.push({ ...p });
          }
          break;
        }
        case "C":
        case "S":
        case "Q":
        case "T": {
          const x = v === "C" ? 6 : v === "S" || v === "Q" ? 4 : 2, $ = [];
          for (let A = 0; A < x; A++) $.push(parseFloat(c[g++]));
          const M = $[$.length - 2], C = $[$.length - 1];
          !isNaN(M) && !isNaN(C) && (p = w ? { x: p.x + M, y: p.y + C } : { x: M, y: C }, d.push({ ...p }));
          break;
        }
        case "Z": {
          if (d.length >= 2) {
            const x = e.transformPoint(p), $ = e.transformPoint(f);
            o.segments.push({
              start: x,
              end: $,
              thickness: o.defaultThickness,
              isWallHint: i && !a,
              isWindowHint: r,
              isDoorHint: n,
              isMeasurementLine: a
            });
          }
          d.length >= 3 && !a && o.polygons.push({
            points: d.map((x) => e.transformPoint(x)),
            isRoomHint: i ? !1 : l !== "none" && l !== "",
            fill: l
          }), p = { ...f }, d = [];
          break;
        }
        default:
          g++;
          break;
      }
    }
  }
  /**
   * Transforme et consolide les segments bruts en murs réels en mètres
   */
  static convertSegmentsToWalls(t, e, o, i, r) {
    const n = [];
    for (const a of t) {
      if (a.isMeasurementLine || a.isDoorHint || a.isWindowHint) continue;
      const l = {
        x: (a.start.x - e.x) * o,
        y: (a.start.y - e.y) * o
      }, h = {
        x: (a.end.x - e.x) * o,
        y: (a.end.y - e.y) * o
      };
      y.distance(l, h) < 0.2 || n.push({
        id: `w_svg_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
        start: { x: y.roundMeters(l.x), y: y.roundMeters(l.y) },
        end: { x: y.roundMeters(h.x), y: y.roundMeters(h.y) },
        thickness: i,
        height: r,
        type: "standard"
      });
    }
    return this.consolidateWalls(n);
  }
  /**
   * Fusionne les segments colinéaires consécutifs et magnétise les extrémités proches
   */
  static consolidateWalls(t) {
    if (t.length === 0) return [];
    let e = [...t];
    for (let r = 0; r < e.length; r++)
      for (let n = r + 1; n < e.length; n++)
        for (const a of [e[r].start, e[r].end])
          for (const l of [e[n].start, e[n].end])
            y.distance(a, l) < 0.12 && (l.x = a.x, l.y = a.y);
    let o = !0, i = 0;
    for (; o && i < 5; ) {
      o = !1, i++;
      for (let r = 0; r < e.length; r++) {
        const n = e[r];
        if (n)
          for (let a = r + 1; a < e.length; a++) {
            const l = e[a];
            if (!l) continue;
            const h = n.end.x - n.start.x, c = n.end.y - n.start.y, u = Math.sqrt(h * h + c * c), p = l.end.x - l.start.x, f = l.end.y - l.start.y, d = Math.sqrt(p * p + f * f);
            if (u === 0 || d === 0) continue;
            const g = (h * p + c * f) / (u * d);
            if (Math.abs(g) > 0.995) {
              if (y.distance(n.end, l.start) < 0.05) {
                n.end = { ...l.end }, e.splice(a, 1), o = !0;
                break;
              } else if (y.distance(n.end, l.end) < 0.05) {
                n.end = { ...l.start }, e.splice(a, 1), o = !0;
                break;
              } else if (y.distance(n.start, l.end) < 0.05) {
                n.start = { ...l.start }, e.splice(a, 1), o = !0;
                break;
              } else if (y.distance(n.start, l.start) < 0.05) {
                n.start = { ...l.end }, e.splice(a, 1), o = !0;
                break;
              }
            }
          }
      }
    }
    return e;
  }
  /**
   * Détecte les portes (depuis les arcs ou segments marqués) et les fenêtres
   */
  static detectOpenings(t, e, o, i, r) {
    const n = [];
    if (o.length === 0) return n;
    for (const a of t) {
      const l = Math.max(a.rx, a.ry) * r;
      if (l < 0.5 || l > 1.4) continue;
      const h = {
        x: (a.start.x - i.x) * r,
        y: (a.start.y - i.y) * r
      }, c = {
        x: (a.end.x - i.x) * r,
        y: (a.end.y - i.y) * r
      }, u = y.snapPointToWall(h, o, 0.75), p = y.snapPointToWall(c, o, 0.75), f = u && (!p || u.distance < p.distance) ? u : p;
      if (f && f.distance < 0.7) {
        const d = y.roundMeters(Math.min(Math.max(l, 0.73), 1.1)), g = y.roundMeters(f.offset);
        n.some(
          (S) => S.wallId === f.wall.id && Math.abs(S.offset - g) < 0.35
        ) || n.push({
          id: `op_door_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
          wallId: f.wall.id,
          type: "door",
          offset: g,
          width: d,
          flipSide: !1,
          flipDirection: !1
        });
      }
    }
    for (const a of e) {
      if (!a.isWindowHint && !a.isDoorHint || a.isMeasurementLine) continue;
      const l = {
        x: (a.start.x - i.x) * r,
        y: (a.start.y - i.y) * r
      }, h = {
        x: (a.end.x - i.x) * r,
        y: (a.end.y - i.y) * r
      }, c = { x: (l.x + h.x) / 2, y: (l.y + h.y) / 2 }, u = y.distance(l, h);
      if (u < 0.4 || u > 3) continue;
      const p = y.snapPointToWall(c, o, 0.6);
      if (p && p.distance < 0.5) {
        const f = a.isDoorHint ? "door" : u > 1.8 ? "french_window" : "window", d = y.roundMeters(p.offset);
        n.some(
          (b) => b.wallId === p.wall.id && Math.abs(b.offset - d) < 0.35
        ) || n.push({
          id: `op_${f}_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
          wallId: p.wall.id,
          type: f,
          offset: d,
          width: y.roundMeters(u),
          flipSide: !1,
          flipDirection: !1
        });
      }
    }
    return n;
  }
  /**
   * Détecte les pièces (Rooms) et associe automatiquement les étiquettes de texte
   */
  static detectRooms(t, e, o, i, r, n, a = !0) {
    const l = [], h = o.map((c) => ({
      text: c.text,
      position: {
        x: (c.position.x - i.x) * r,
        y: (c.position.y - i.y) * r
      }
    }));
    for (const c of t) {
      if (c.points.length < 3) continue;
      const u = c.points.map((b) => ({
        x: y.roundMeters((b.x - i.x) * r),
        y: y.roundMeters((b.y - i.y) * r)
      })), p = J.computeArea(u);
      if (p < 1.5 || p > 300) continue;
      let f = "";
      if (a) {
        for (const b of h)
          if (J.isPointInPolygon(b.position, u)) {
            f = b.text;
            break;
          }
      }
      if (!f && !c.isRoomHint) continue;
      const d = f || `Pièce ${l.length + 1}`, g = this.getRoomStyle(d);
      l.push({
        id: `room_svg_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
        name: d,
        polygon: u,
        areaM2: p,
        color: g.color,
        icon: g.icon,
        height: n
      });
    }
    if (l.length === 0 && h.length > 0 && e.length >= 4 && a)
      for (const c of h) {
        const u = c.text.toLowerCase();
        if (/salon|sejour|chambre|cuisine|sdb|bain|wc|bureau|entree|garage|couloir/i.test(u)) {
          const p = c.position.x, f = c.position.y, d = 1.8, g = [
            { x: y.roundMeters(p - d), y: y.roundMeters(f - d) },
            { x: y.roundMeters(p + d), y: y.roundMeters(f - d) },
            { x: y.roundMeters(p + d), y: y.roundMeters(f + d) },
            { x: y.roundMeters(p - d), y: y.roundMeters(f + d) }
          ], b = this.getRoomStyle(c.text);
          l.push({
            id: `room_svg_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
            name: c.text,
            polygon: g,
            areaM2: J.computeArea(g),
            color: b.color,
            icon: b.icon,
            height: n
          });
        }
      }
    return l;
  }
  /**
   * Associe un nom de pièce à une couleur thématique et une icône MDI
   */
  static getRoomStyle(t) {
    const e = t.toLowerCase();
    return /salon|sejour|living|sam|salle à manger/i.test(e) ? { color: "rgba(59, 130, 246, 0.28)", icon: "mdi:sofa" } : /chambre|bed|suite|parentale/i.test(e) ? { color: "rgba(139, 92, 246, 0.28)", icon: "mdi:bed" } : /cuisine|kitchen/i.test(e) ? { color: "rgba(245, 158, 11, 0.28)", icon: "mdi:silverware-fork-knife" } : /sdb|bain|douche|bath|eau/i.test(e) ? { color: "rgba(6, 182, 212, 0.28)", icon: "mdi:shower" } : /wc|toilet/i.test(e) ? { color: "rgba(16, 185, 129, 0.28)", icon: "mdi:toilet" } : /bureau|office|travail/i.test(e) ? { color: "rgba(99, 102, 241, 0.28)", icon: "mdi:desk" } : /entree|entrée|hall|couloir|degagement|dégagement/i.test(e) ? { color: "rgba(100, 116, 139, 0.28)", icon: "mdi:door" } : /garage|atelier/i.test(e) ? { color: "rgba(120, 113, 108, 0.28)", icon: "mdi:garage" } : /terrasse|balcon|patio/i.test(e) ? { color: "rgba(20, 184, 166, 0.28)", icon: "mdi:balcony" } : { color: "rgba(56, 189, 248, 0.25)", icon: "mdi:home-outline" };
  }
}
var Je = Object.defineProperty, Ze = Object.getOwnPropertyDescriptor, H = (s, t, e, o) => {
  for (var i = o > 1 ? void 0 : o ? Ze(t, e) : t, r = s.length - 1, n; r >= 0; r--)
    (n = s[r]) && (i = (o ? n(t, e, i) : n(i)) || i);
  return o && i && Je(t, e, i), i;
};
let N = class extends U {
  constructor() {
    super(...arguments), this.currentLevel = "rdc", this.imageDataUrl = null, this.imageWidth = 0, this.imageHeight = 0, this.imageName = "", this.isSvg = !1, this.svgRawText = null, this.svgInterpretResult = null, this.svgImportMode = "vectorize", this.keepSvgBackground = !0, this.importOptions = {
      importWalls: !0,
      importDoors: !0,
      importWindows: !0,
      importRooms: !0,
      importLabels: !0
    }, this.calibrateMode = "auto_dimension", this.totalWidthMeters = 12, this.opacity = 0.4, this.isDragOver = !1, this.fileInputRef = null, this._boundPasteListener = null;
  }
  connectedCallback() {
    super.connectedCallback(), this._boundPasteListener = this.handleModalPaste.bind(this), window.addEventListener("paste", this._boundPasteListener);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._boundPasteListener && window.removeEventListener("paste", this._boundPasteListener);
  }
  handleModalPaste(s) {
    var o;
    if (!s.clipboardData) return;
    const t = s.clipboardData.items;
    for (let i = 0; i < t.length; i++)
      if (t[i].type.indexOf("image") !== -1) {
        const r = t[i].getAsFile();
        if (r) {
          s.preventDefault(), this.processFile(r);
          return;
        }
      }
    const e = (o = s.clipboardData.getData("text/plain")) == null ? void 0 : o.trim();
    if (e && (e.startsWith("<svg") || e.startsWith("<?xml") && e.includes("<svg"))) {
      s.preventDefault(), this.processSvgText(e, "Plan SVG collé depuis le presse-papier");
      return;
    }
  }
  triggerFileInput() {
    if (!this.fileInputRef) {
      const s = document.createElement("input");
      s.type = "file", s.accept = "image/*,.svg", s.style.display = "none", s.addEventListener("change", (t) => {
        var o;
        const e = (o = t.target.files) == null ? void 0 : o[0];
        e && this.processFile(e);
      }), this.fileInputRef = s;
    }
    this.fileInputRef.click();
  }
  processFile(s) {
    if (this.imageName = s.name || "Plan importé", s.type === "image/svg+xml" || s.name.toLowerCase().endsWith(".svg")) {
      const e = new FileReader();
      e.onload = (o) => {
        var r;
        const i = (r = o.target) == null ? void 0 : r.result;
        this.processSvgText(i, s.name);
      }, e.readAsText(s);
    } else {
      this.isSvg = !1, this.svgRawText = null, this.svgInterpretResult = null;
      const e = new FileReader();
      e.onload = (o) => {
        var n;
        const i = (n = o.target) == null ? void 0 : n.result, r = new Image();
        r.onload = () => {
          this.imageDataUrl = i, this.imageWidth = r.naturalWidth, this.imageHeight = r.naturalHeight;
        }, r.src = i;
      }, e.readAsDataURL(s);
    }
  }
  processSvgText(s, t = "Plan SVG importé") {
    this.imageName = t, this.isSvg = !0, this.svgRawText = s, this.computeSvgInterpretation();
    const e = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(s);
    this.imageDataUrl = e;
    const o = new Image();
    o.onload = () => {
      var i, r;
      this.imageWidth = o.naturalWidth || ((i = this.svgInterpretResult) == null ? void 0 : i.viewBox.width) || 1e3, this.imageHeight = o.naturalHeight || ((r = this.svgInterpretResult) == null ? void 0 : r.viewBox.height) || 750;
    }, o.src = e;
  }
  computeSvgInterpretation() {
    this.svgRawText && (this.svgInterpretResult = Ke.parseSvg(
      this.svgRawText,
      this.totalWidthMeters,
      0.2,
      2.5,
      this.importOptions
    ));
  }
  toggleImportCategory(s, t) {
    this.importOptions = {
      ...this.importOptions,
      [s]: t
    }, this.isSvg && this.computeSvgInterpretation();
  }
  handleDimensionChange(s) {
    this.totalWidthMeters = s > 0 ? s : 10, this.isSvg && this.computeSvgInterpretation();
  }
  handleDrop(s) {
    var t;
    if (s.preventDefault(), this.isDragOver = !1, (t = s.dataTransfer) != null && t.files && s.dataTransfer.files.length > 0) {
      const e = s.dataTransfer.files[0];
      this.processFile(e);
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
        for (const t of s) {
          const e = t.types.find((o) => o.startsWith("image/"));
          if (e) {
            const o = await t.getType(e), i = new File([o], "clipboard_image.png", { type: e });
            this.processFile(i);
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
    var t, e, o;
    if (!this.imageDataUrl) return;
    const s = this.isSvg && this.svgImportMode === "vectorize" && !!((t = this.svgInterpretResult) != null && t.success);
    this.dispatchEvent(new CustomEvent("import-confirmed", {
      detail: {
        dataUrl: this.imageDataUrl,
        widthPx: this.imageWidth || ((e = this.svgInterpretResult) == null ? void 0 : e.viewBox.width) || 1e3,
        heightPx: this.imageHeight || ((o = this.svgInterpretResult) == null ? void 0 : o.viewBox.height) || 750,
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
    var e, o;
    const s = this.isSvg && this.svgImportMode === "vectorize" && !!((e = this.svgInterpretResult) != null && e.success), t = (o = this.svgInterpretResult) == null ? void 0 : o.stats;
    return k`
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
          ${this.imageDataUrl ? k`
            <div class="preview-card">
              <img class="preview-thumb" src="${this.imageDataUrl}" alt="Aperçu du plan" />
              <div class="preview-meta">
                <div class="preview-title">
                  <span>✅</span>
                  <span>${this.imageName || "Plan sélectionné"}</span>
                  ${this.isSvg ? k`<span class="preview-badge-svg">SVG Vectoriel</span>` : null}
                </div>
                <div class="preview-dimensions">
                  Dimensions du plan : ${this.imageWidth} × ${this.imageHeight} px
                </div>
                <button class="btn-change-image" @click=${this.triggerFileInput}>
                  🔄 Remplacer le fichier
                </button>
              </div>
            </div>
          ` : k`
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

          <!-- Encadré Vectorisation Intelligente SVG si un fichier SVG est chargé -->
          ${this.isSvg ? k`
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

                    ${t ? k`
                      <!-- Sélection granulaire des éléments à importer -->
                      <div class="import-categories-box" @click=${(i) => i.stopPropagation()}>
                        <div class="categories-title">Éléments à importer :</div>
                        <div class="categories-grid">
                          <label class="category-toggle ${this.importOptions.importWalls ? "active" : ""}">
                            <input 
                              type="checkbox" 
                              .checked=${this.importOptions.importWalls} 
                              @change=${(i) => this.toggleImportCategory("importWalls", i.target.checked)}
                            />
                            <span>🧱 Murs</span>
                            <span class="cat-count">(${t.wallCount})</span>
                          </label>

                          <label class="category-toggle ${this.importOptions.importDoors ? "active" : ""}">
                            <input 
                              type="checkbox" 
                              .checked=${this.importOptions.importDoors} 
                              @change=${(i) => this.toggleImportCategory("importDoors", i.target.checked)}
                            />
                            <span>🚪 Portes</span>
                            <span class="cat-count">(${t.doorCount})</span>
                          </label>

                          <label class="category-toggle ${this.importOptions.importWindows ? "active" : ""}">
                            <input 
                              type="checkbox" 
                              .checked=${this.importOptions.importWindows} 
                              @change=${(i) => this.toggleImportCategory("importWindows", i.target.checked)}
                            />
                            <span>🪟 Fenêtres</span>
                            <span class="cat-count">(${t.windowCount})</span>
                          </label>

                          <label class="category-toggle ${this.importOptions.importRooms ? "active" : ""}">
                            <input 
                              type="checkbox" 
                              .checked=${this.importOptions.importRooms} 
                              @change=${(i) => this.toggleImportCategory("importRooms", i.target.checked)}
                            />
                            <span>🏠 Pièces</span>
                            <span class="cat-count">(${t.roomCount})</span>
                          </label>

                          <label class="category-toggle ${this.importOptions.importLabels ? "active" : ""}">
                            <input 
                              type="checkbox" 
                              .checked=${this.importOptions.importLabels} 
                              @change=${(i) => this.toggleImportCategory("importLabels", i.target.checked)}
                            />
                            <span>🏷️ Noms</span>
                            <span class="cat-count">(${t.textLabelCount})</span>
                          </label>
                        </div>

                        ${t.ignoredMeasurementLinesCount > 0 ? k`
                          <div class="ignored-note">
                            ℹ️ ${t.ignoredMeasurementLinesCount} ligne(s) de cotation / pointillés ont été automatiquement ignorées (non transformées en murs).
                          </div>
                        ` : null}
                      </div>
                    ` : null}

                    <div class="checkbox-wrap" @click=${(i) => i.stopPropagation()}>
                      <input 
                        type="checkbox" 
                        id="chk_keep_bg"
                        .checked=${this.keepSvgBackground} 
                        @change=${(i) => this.keepSvgBackground = i.target.checked}
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

                  ${this.calibrateMode === "auto_dimension" ? k`
                    <div class="input-row" @click=${(i) => i.stopPropagation()}>
                      <label style="font-size: 0.82rem; color: #94a3b8;">Largeur totale estimée :</label>
                      <input 
                        type="number" 
                        step="0.5" 
                        min="1" 
                        max="100" 
                        class="dimension-input"
                        .value=${this.totalWidthMeters}
                        @input=${(i) => this.handleDimensionChange(parseFloat(i.target.value))}
                      />
                      <span class="unit-tag">mètres</span>
                    </div>
                  ` : null}
                </div>
              </div>

              <!-- Option B : Tracé manuel assisté sur un mur (si pas vectorisé) -->
              ${s ? null : k`
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
          ${!s || this.keepSvgBackground ? k`
            <div class="slider-row">
              <span class="slider-label">Opacité du fond :</span>
              <input 
                type="range" 
                class="slider-input" 
                min="0.05" 
                max="1.0" 
                step="0.05"
                .value=${this.opacity}
                @input=${(i) => this.opacity = parseFloat(i.target.value)}
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
            ${s ? k`
              <span>✨</span>
              <span>Convertir le plan SVG (${(t == null ? void 0 : t.wallCount) || 0} murs)</span>
            ` : k`
              <span>🚀</span>
              <span>Charger le plan</span>
            `}
          </button>
        </div>
      </div>
    `;
  }
};
N.styles = G`
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

    /* Boîte de sélection personnalisée des catégories à importer */
    .import-categories-box {
      background: rgba(15, 23, 42, 0.65);
      border: 1px solid rgba(168, 85, 247, 0.35);
      border-radius: 10px;
      padding: 10px 12px;
      margin-top: 8px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .categories-title {
      font-size: 0.8rem;
      font-weight: 700;
      color: #e9d5ff;
      text-transform: uppercase;
      letter-spacing: 0.4px;
    }

    .categories-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .category-toggle {
      background: rgba(30, 41, 59, 0.7);
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 8px;
      padding: 5px 10px;
      font-size: 0.82rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
      color: #94a3b8;
      transition: all 0.15s ease;
      user-select: none;
    }

    .category-toggle:hover {
      border-color: #a855f7;
      color: #ffffff;
    }

    .category-toggle.active {
      background: rgba(168, 85, 247, 0.2);
      border-color: #a855f7;
      color: #f1f5f9;
      font-weight: 600;
    }

    .category-toggle input[type="checkbox"] {
      accent-color: #a855f7;
      cursor: pointer;
      margin: 0;
    }

    .cat-count {
      font-size: 0.75rem;
      color: #38bdf8;
      font-family: ui-monospace, SFMono-Regular, monospace;
    }

    .ignored-note {
      font-size: 0.76rem;
      color: #38bdf8;
      background: rgba(56, 189, 248, 0.1);
      border: 1px solid rgba(56, 189, 248, 0.25);
      border-radius: 6px;
      padding: 5px 8px;
      line-height: 1.35;
      margin-top: 4px;
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
H([
  I({ type: String })
], N.prototype, "currentLevel", 2);
H([
  m()
], N.prototype, "imageDataUrl", 2);
H([
  m()
], N.prototype, "imageWidth", 2);
H([
  m()
], N.prototype, "imageHeight", 2);
H([
  m()
], N.prototype, "imageName", 2);
H([
  m()
], N.prototype, "isSvg", 2);
H([
  m()
], N.prototype, "svgRawText", 2);
H([
  m()
], N.prototype, "svgInterpretResult", 2);
H([
  m()
], N.prototype, "svgImportMode", 2);
H([
  m()
], N.prototype, "keepSvgBackground", 2);
H([
  m()
], N.prototype, "importOptions", 2);
H([
  m()
], N.prototype, "calibrateMode", 2);
H([
  m()
], N.prototype, "totalWidthMeters", 2);
H([
  m()
], N.prototype, "opacity", 2);
H([
  m()
], N.prototype, "isDragOver", 2);
N = H([
  X("home-architect-import-modal")
], N);
var Qe = Object.defineProperty, ts = Object.getOwnPropertyDescriptor, ht = (s, t, e, o) => {
  for (var i = o > 1 ? void 0 : o ? ts(t, e) : t, r = s.length - 1, n; r >= 0; r--)
    (n = s[r]) && (i = (o ? n(t, e, i) : n(i)) || i);
  return o && i && Qe(t, e, i), i;
};
let Z = class extends U {
  constructor() {
    super(...arguments), this.measuredMeters = 0, this.wallCount = 0, this.roomCount = 0, this.openingCount = 0, this.targetMeters = 0, this.adjustBackground = !0;
  }
  connectedCallback() {
    super.connectedCallback(), this.targetMeters = this.measuredMeters;
  }
  handleInputChange(s) {
    const t = parseFloat(s.target.value);
    this.targetMeters = isNaN(t) ? 0 : t;
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
    const s = this.measuredMeters > 0 && this.targetMeters > 0 ? this.targetMeters / this.measuredMeters : 1, t = (s - 1) * 100, e = this.targetMeters > 0 && Math.abs(s - 1) > 1e-4;
    return k`
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
              × ${s.toFixed(3)} (${t >= 0 ? "+" : ""}${t.toFixed(1)}%)
            </span>
          </div>

          <div class="impact-list">
            <div class="impact-item">
              <span class="impact-icon">🧱</span>
              <span><strong>${this.wallCount} murs</strong> : toutes les longueurs et cotes seront recalculées</span>
            </div>
            ${this.openingCount > 0 ? k`
              <div class="impact-item">
                <span class="impact-icon">🚪</span>
                <span><strong>${this.openingCount} ouvertures</strong> : positions ajustées proportionnellement</span>
              </div>
            ` : null}
            ${this.roomCount > 0 ? k`
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
            ?disabled=${!e} 
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
Z.styles = G`
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
ht([
  I({ type: Number })
], Z.prototype, "measuredMeters", 2);
ht([
  I({ type: Number })
], Z.prototype, "wallCount", 2);
ht([
  I({ type: Number })
], Z.prototype, "roomCount", 2);
ht([
  I({ type: Number })
], Z.prototype, "openingCount", 2);
ht([
  m()
], Z.prototype, "targetMeters", 2);
ht([
  m()
], Z.prototype, "adjustBackground", 2);
Z = ht([
  X("home-architect-rescale-modal")
], Z);
class kt {
  /**
   * Calcule la boîte englobante exacte du plan (murs, pièces, entités, image de fond)
   */
  static calculateBoundingBox(t, e) {
    const o = t.pixelsPerMeter || 50, i = [];
    for (const b of t.walls)
      i.push(b.start, b.end);
    for (const b of t.rooms)
      b.polygon && b.polygon.length > 0 && i.push(...b.polygon);
    for (const b of t.bindings)
      b.position && i.push(b.position);
    if (t.background && t.background.imageUrl && t.background.visible) {
      const b = t.background, S = b.offset || { x: 0, y: 0 }, w = b.scale || 1, v = (b.widthPx || 1200) * w / o, x = (b.heightPx || 900) * w / o;
      i.push(
        { x: S.x, y: S.y },
        { x: S.x + v, y: S.y + x }
      );
    }
    if (i.length === 0)
      return {
        minX: -1,
        minY: -1,
        width: 12,
        height: 8,
        ppm: o
      };
    let r = Math.min(...i.map((b) => b.x)), n = Math.max(...i.map((b) => b.x)), a = Math.min(...i.map((b) => b.y)), l = Math.max(...i.map((b) => b.y));
    const h = n - r || 5, c = l - a || 5, u = e !== void 0 ? e : Math.max(0.6, Math.max(h, c) * 0.05), p = r - u, f = a - u, d = n - r + u * 2, g = l - a + u * 2;
    return {
      minX: p,
      minY: f,
      width: d,
      height: g,
      ppm: o
    };
  }
  /**
   * Convertit un point monde en coordonnées de pourcentage (0% à 100%)
   * strictement compatible avec la carte Lovelace picture-elements de Home Assistant
   */
  static worldToPercentage(t, e) {
    const o = (t.x - e.minX) / e.width * 100, i = (t.y - e.minY) / e.height * 100;
    return {
      left: Math.round(o * 10) / 10,
      top: Math.round(i * 10) / 10
    };
  }
  /**
   * Génère un document SVG vectoriel autonome et complet représentant le plan
   */
  static exportToSvg(t, e) {
    var u, p, f;
    const o = {
      includeRooms: !0,
      includeWalls: !0,
      includeOpenings: !0,
      includeRoomLabels: !0,
      includeEntityMarkers: !1,
      includeBackground: !0,
      backgroundColor: "#0f172a",
      ...e
    }, i = this.calculateBoundingBox(t, o.paddingMeters), r = i.ppm, n = (i.minX * r).toFixed(1), a = (i.minY * r).toFixed(1), l = Math.max(100, Math.round(i.width * r)), h = Math.max(100, Math.round(i.height * r));
    let c = "";
    if (o.backgroundColor && o.backgroundColor !== "transparent" && (c += `  <rect x="${n}" y="${a}" width="${l}" height="${h}" fill="${o.backgroundColor}" />
`), o.includeBackground !== !1 && ((u = t.background) != null && u.imageUrl) && t.background.visible) {
      const d = t.background, g = (((p = d.offset) == null ? void 0 : p.x) || 0) * r, b = (((f = d.offset) == null ? void 0 : f.y) || 0) * r, S = d.scale || 1, w = (d.widthPx || 1200) * S, v = (d.heightPx || 900) * S;
      c += `  <!-- Image de fond du plan d'origine -->
`, c += `  <image href="${d.imageUrl}" x="${g.toFixed(1)}" y="${b.toFixed(1)}" width="${w.toFixed(1)}" height="${v.toFixed(1)}" opacity="${d.opacity || 0.6}" />
`;
    }
    if (o.includeRooms && t.rooms.length > 0) {
      c += `  <!-- Pièces -->
  <g id="rooms">
`;
      for (const d of t.rooms) {
        if (!d.polygon || d.polygon.length < 3) continue;
        const g = d.polygon.map((S) => `${(S.x * r).toFixed(1)},${(S.y * r).toFixed(1)}`).join(" "), b = d.color || "rgba(56, 189, 248, 0.12)";
        c += `    <polygon points="${g}" fill="${b}" stroke="rgba(56, 189, 248, 0.4)" stroke-width="1.5" />
`;
      }
      c += `  </g>
`;
    }
    if (o.includeWalls && t.walls.length > 0) {
      c += `  <!-- Murs -->
  <g id="walls">
`;
      for (const d of t.walls) {
        const b = this.computeWallPolygon(d.start, d.end, d.thickness).map((S) => `${(S.x * r).toFixed(1)},${(S.y * r).toFixed(1)}`).join(" ");
        c += `    <polygon points="${b}" fill="#334155" stroke="#64748b" stroke-width="1" />
`;
      }
      c += `  </g>
`;
    }
    if (o.includeOpenings && t.openings.length > 0) {
      c += `  <!-- Portes & Fenêtres -->
  <g id="openings">
`;
      for (const d of t.openings) {
        const g = t.walls.find((R) => R.id === d.wallId);
        if (!g) continue;
        const b = g.end.x - g.start.x, S = g.end.y - g.start.y, w = Math.sqrt(b * b + S * S);
        if (w === 0) continue;
        const x = (Math.atan2(S, b) * 180 / Math.PI).toFixed(1), $ = (g.start.x + d.offset / w * b) * r, M = (g.start.y + d.offset / w * S) * r, C = d.width * r, A = g.thickness * r;
        if (c += `    <g transform="translate(${$.toFixed(1)}, ${M.toFixed(1)}) rotate(${x})">
`, c += `      <rect x="${(-C / 2).toFixed(1)}" y="${(-A / 2 - 1).toFixed(1)}" width="${C.toFixed(1)}" height="${(A + 2).toFixed(1)}" fill="${o.backgroundColor || "#0f172a"}" />
`, d.type === "door") {
          const R = C / 2, W = d.flipSide ? -1 : 1, q = d.flipDirection ? R : -R, ut = d.flipDirection ? -1 : 1;
          c += `      <rect x="${-R}" y="${-A / 2}" width="4" height="${A}" fill="#94a3b8" />
`, c += `      <rect x="${R - 4}" y="${-A / 2}" width="4" height="${A}" fill="#94a3b8" />
`, c += `      <line x1="${q}" y1="0" x2="${q}" y2="${W * C}" stroke="#38bdf8" stroke-width="2" stroke-linecap="round" />
`, c += `      <path d="M ${q + ut * C} 0 A ${C} ${C} 0 0 ${W > 0 ? d.flipDirection ? 0 : 1 : d.flipDirection ? 1 : 0} ${q} ${W * C}" fill="rgba(56, 189, 248, 0.08)" stroke="#38bdf8" stroke-width="1.2" stroke-dasharray="3, 3" />
`;
        } else {
          const R = C / 2;
          c += `      <rect x="${-R}" y="${-A / 2}" width="${C}" height="${A}" fill="none" stroke="#94a3b8" stroke-width="2" />
`, c += `      <line x1="${-R}" y1="0" x2="${R}" y2="0" stroke="#38bdf8" stroke-width="1.5" />
`;
        }
        c += `    </g>
`;
      }
      c += `  </g>
`;
    }
    if (o.includeRoomLabels && t.rooms.length > 0) {
      c += `  <!-- Étiquettes de Pièces -->
  <g id="room-labels">
`;
      for (const d of t.rooms) {
        if (!d.polygon || d.polygon.length < 3) continue;
        const g = J.calculateCentroid(d.polygon), b = (g.x * r).toFixed(1), S = (g.y * r).toFixed(1);
        c += `    <g transform="translate(${b}, ${S})">
`, c += `      <text y="-6" fill="#f8fafc" font-size="13" font-weight="700" text-anchor="middle">${this.escapeXml(d.name)}</text>
`, c += `      <text y="12" fill="#38bdf8" font-size="11" font-weight="600" text-anchor="middle" font-family="monospace">${d.areaM2.toFixed(1)} m²</text>
`, c += `    </g>
`;
      }
      c += `  </g>
`;
    }
    if (o.includeEntityMarkers && t.bindings.length > 0) {
      c += `  <!-- Emplacements des Entités -->
  <g id="entity-markers">
`;
      for (const d of t.bindings) {
        const g = (d.position.x * r).toFixed(1), b = (d.position.y * r).toFixed(1), S = d.icon || "⚡", w = d.customName || d.entityId.split(".")[1];
        c += `    <g transform="translate(${g}, ${b})">
`, c += `      <circle cx="0" cy="0" r="16" fill="rgba(30, 41, 59, 0.85)" stroke="#38bdf8" stroke-width="1.5" />
`, c += `      <text x="0" y="5" font-size="12" text-anchor="middle">${this.escapeXml(S)}</text>
`, c += `      <text x="0" y="26" fill="#f1f5f9" font-size="10" font-weight="600" text-anchor="middle">${this.escapeXml(w)}</text>
`, c += `    </g>
`;
      }
      c += `  </g>
`;
    }
    return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="${n} ${a} ${l} ${h}" width="${l}" height="${h}" style="background-color: ${o.backgroundColor || "#0f172a"}; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 100%; height: auto;">
${c}</svg>`;
  }
  static computeWallPolygon(t, e, o) {
    const i = e.x - t.x, r = e.y - t.y, n = Math.sqrt(i * i + r * r);
    if (n === 0) return [t, t, e, e];
    const a = o / 2, l = -r / n * a, h = i / n * a;
    return [
      { x: t.x + l, y: t.y + h },
      { x: e.x + l, y: e.y + h },
      { x: e.x - l, y: e.y - h },
      { x: t.x - l, y: t.y - h }
    ];
  }
  static escapeXml(t) {
    return t.replace(/[<>&'"]/g, (e) => {
      switch (e) {
        case "<":
          return "&lt;";
        case ">":
          return "&gt;";
        case "&":
          return "&amp;";
        case "'":
          return "&apos;";
        case '"':
          return "&quot;";
        default:
          return e;
      }
    });
  }
}
class ae {
  /**
   * Génère la configuration YAML complète de la carte native 'picture-elements' de Home Assistant
   */
  static generatePictureElementsYaml(t, e) {
    let o = (e == null ? void 0 : e.imagePath) || `/local/plan_${t.id || "rdc"}.svg`;
    if (e != null && e.embedDataUri && (e != null && e.svgContent))
      try {
        o = `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(e.svgContent)))}`;
      } catch {
        o = e.imagePath || `/local/plan_${t.id || "rdc"}.svg`;
      }
    const i = {
      title: t.name || "Plan Interactif",
      ...e,
      imagePath: o
    }, r = kt.calculateBoundingBox(t), n = t.bindings || [];
    let a = `# ========================================================
`;
    if (a += `# CARTE LOVELACE PICTURE-ELEMENTS (NATIVE HOME ASSISTANT)
`, a += `# Générée automatiquement par DomoLink Plan / Home Architect
`, a += `# ========================================================
`, a += `type: picture-elements
`, a += `title: "${i.title}"
`, a += `image: "${i.imagePath}"
`, a += `elements:
`, n.length === 0)
      return a += `  # Aucune entité liée pour le moment. Glissez-déposez des entités sur le plan !
`, a;
    for (const l of n) {
      const h = l.position || { x: 0, y: 0 }, { left: c, top: u } = kt.worldToPercentage(h, r), p = l.entityId, f = p.split(".")[0], d = l.customName || p.split(".")[1].replace(/_/g, " ");
      if (f === "light")
        a += `  # 💡 Lumière : ${d}
`, a += `  - type: state-icon
`, a += `    entity: ${p}
`, a += `    title: "${d}"
`, a += `    tap_action:
`, a += `      action: toggle
`, a += `    hold_action:
`, a += `      action: more-info
`, a += `    style:
`, a += `      top: ${u}%
`, a += `      left: ${c}%
`, a += `      transform: translate(-50%, -50%)
`, a += `      --paper-item-icon-active-color: "#facc15"
`, a += `      --paper-item-icon-color: "#94a3b8"

`;
      else if (f === "binary_sensor") {
        const g = p.includes("presence") || p.includes("occupancy") || p.includes("radar") || p.includes("motion") || p.includes("mouvement");
        a += `  # 📡 ${g ? "Radar de Présence" : "Capteur"} : ${d}
`, a += `  - type: state-icon
`, a += `    entity: ${p}
`, a += `    title: "${d}"
`, a += `    tap_action:
`, a += `      action: more-info
`, a += `    style:
`, a += `      top: ${u}%
`, a += `      left: ${c}%
`, a += `      transform: translate(-50%, -50%)
`, a += `      --paper-item-icon-active-color: "#ef4444"
`, a += `      --paper-item-icon-color: "#10b981"

`;
      } else if (f === "sensor") {
        const g = p.includes("temp") || p.includes("temperature");
        a += `  # ${g ? "🌡️ Température" : "📊 Capteur"} : ${d}
`, a += `  - type: state-label
`, a += `    entity: ${p}
`, a += `    title: "${d}"
`, a += `    tap_action:
`, a += `      action: more-info
`, a += `    style:
`, a += `      top: ${u}%
`, a += `      left: ${c}%
`, a += `      transform: translate(-50%, -50%)
`, a += `      background: "rgba(15, 23, 42, 0.85)"
`, a += `      border: "1px solid rgba(56, 189, 248, 0.5)"
`, a += `      border-radius: "8px"
`, a += `      padding: "2px 8px"
`, a += `      font-size: "11px"
`, a += `      font-weight: "700"
`, a += `      color: "#38bdf8"
`, a += `      backdrop-filter: "blur(6px)"

`;
      } else f === "climate" ? (a += `  # ❄️ Climatisation / Thermostat : ${d}
`, a += `  - type: state-label
`, a += `    entity: ${p}
`, a += `    attribute: current_temperature
`, a += `    suffix: "°C"
`, a += `    title: "${d}"
`, a += `    tap_action:
`, a += `      action: more-info
`, a += `    style:
`, a += `      top: ${u}%
`, a += `      left: ${c}%
`, a += `      transform: translate(-50%, -50%)
`, a += `      background: "rgba(15, 23, 42, 0.85)"
`, a += `      border: "1px solid rgba(245, 158, 11, 0.5)"
`, a += `      border-radius: "8px"
`, a += `      padding: "2px 8px"
`, a += `      font-size: "11px"
`, a += `      font-weight: "700"
`, a += `      color: "#f59e0b"
`, a += `      backdrop-filter: "blur(6px)"

`) : f === "switch" ? (a += `  # 🔌 Interrupteur / Prise : ${d}
`, a += `  - type: state-icon
`, a += `    entity: ${p}
`, a += `    title: "${d}"
`, a += `    tap_action:
`, a += `      action: toggle
`, a += `    hold_action:
`, a += `      action: more-info
`, a += `    style:
`, a += `      top: ${u}%
`, a += `      left: ${c}%
`, a += `      transform: translate(-50%, -50%)
`, a += `      --paper-item-icon-active-color: "#38bdf8"
`, a += `      --paper-item-icon-color: "#64748b"

`) : (a += `  # ⚡ Entité : ${d}
`, a += `  - type: state-icon
`, a += `    entity: ${p}
`, a += `    title: "${d}"
`, a += `    tap_action:
`, a += `      action: more-info
`, a += `    style:
`, a += `      top: ${u}%
`, a += `      left: ${c}%
`, a += `      transform: translate(-50%, -50%)

`);
    }
    return a;
  }
  /**
   * Génère la configuration YAML pour la carte Lovelace personnalisée intégrée 'home-architect-card'
   */
  static generateHomeArchitectCardYaml(t, e) {
    const o = {
      viewMode: "2d",
      title: t.name || "Plan de Maison",
      height: "520px",
      ...e
    };
    let i = `# ========================================================
`;
    return i += `# CARTE LOVELACE PERSONNALISÉE (HOME ARCHITECT CARD)
`, i += `# Rendu vectoriel direct 2D / 3D, états et clics en direct
`, i += `# ========================================================
`, i += `type: custom:home-architect-card
`, i += `project_id: "${t.id || "rdc"}"
`, i += `title: "${o.title}"
`, i += `view_mode: ${o.viewMode || "2d"} # '2d' ou '3d'
`, i += `show_header: true
`, i += `height: "${o.height}"
`, i;
  }
}
var es = Object.defineProperty, ss = Object.getOwnPropertyDescriptor, K = (s, t, e, o) => {
  for (var i = o > 1 ? void 0 : o ? ss(t, e) : t, r = s.length - 1, n; r >= 0; r--)
    (n = s[r]) && (i = (o ? n(t, e, i) : n(i)) || i);
  return o && i && es(t, e, i), i;
};
let B = class extends U {
  constructor() {
    super(...arguments), this.activeTab = "picture_elements", this.imagePath = "", this.customCardViewMode = "2d", this.copiedToast = !1, this.syncStatus = "idle", this.syncErrorMsg = "", this.embedDataUri = !1;
  }
  connectedCallback() {
    var s;
    super.connectedCallback(), this.imagePath = `/local/plan_${((s = this.project) == null ? void 0 : s.id) || "rdc"}.svg`, this.autoSyncSvg();
  }
  async autoSyncSvg() {
    var s, t;
    if (!((s = this.hass) != null && s.callWS)) {
      this.syncStatus = "idle";
      return;
    }
    this.syncStatus = "syncing";
    try {
      const e = kt.exportToSvg(this.project, {
        includeRooms: !0,
        includeWalls: !0,
        includeOpenings: !0,
        includeRoomLabels: !0,
        includeEntityMarkers: !1,
        includeBackground: !0,
        backgroundColor: "#0f172a"
      }), o = `plan_${((t = this.project) == null ? void 0 : t.id) || "rdc"}.svg`, i = await this.hass.callWS({
        type: "home_architect/save_svg_to_www",
        filename: o,
        svg_content: e
      });
      i && i.success ? this.syncStatus = "success" : (this.syncStatus = "error", this.syncErrorMsg = "Erreur lors de la sauvegarde sur le serveur");
    } catch (e) {
      console.warn("Home Architect auto-sync to www failed:", e), this.syncStatus = "error", this.syncErrorMsg = (e == null ? void 0 : e.message) || String(e);
    }
  }
  handleClose() {
    this.dispatchEvent(new CustomEvent("close", { bubbles: !0, composed: !0 }));
  }
  copyCode(s) {
    navigator.clipboard.writeText(s).then(() => {
      this.copiedToast = !0, setTimeout(() => {
        this.copiedToast = !1;
      }, 2500);
    });
  }
  downloadSvg() {
    const s = kt.exportToSvg(this.project, {
      includeRooms: !0,
      includeWalls: !0,
      includeOpenings: !0,
      includeRoomLabels: !0,
      includeEntityMarkers: !1,
      includeBackground: !0,
      backgroundColor: "#0f172a"
    }), t = new Blob([s], { type: "image/svg+xml;charset=utf-8" }), e = URL.createObjectURL(t), o = document.createElement("a");
    o.href = e, o.download = `plan_${this.project.id || "rdc"}.svg`, document.body.appendChild(o), o.click(), document.body.removeChild(o), URL.revokeObjectURL(e);
  }
  downloadJson() {
    const s = JSON.stringify(this.project, null, 2), t = new Blob([s], { type: "application/json;charset=utf-8" }), e = URL.createObjectURL(t), o = document.createElement("a");
    o.href = e, o.download = `projet_plan_${this.project.id || "rdc"}.json`, document.body.appendChild(o), o.click(), document.body.removeChild(o), URL.revokeObjectURL(e);
  }
  getEntitySummary() {
    var n, a, l;
    const s = ((n = this.project) == null ? void 0 : n.bindings) || [], t = s.filter((h) => h.entityId.startsWith("light.")).length, e = s.filter((h) => h.entityId.startsWith("binary_sensor.")).length, o = s.filter((h) => h.entityId.startsWith("sensor.") || h.entityId.startsWith("climate.")).length, i = s.filter((h) => h.entityId.startsWith("switch.")).length, r = ((l = (a = this.project) == null ? void 0 : a.rooms) == null ? void 0 : l.length) || 0;
    return { lights: t, radars: e, sensors: o, switches: i, rooms: r, total: s.length };
  }
  render() {
    var i, r, n;
    const s = this.getEntitySummary(), t = kt.exportToSvg(this.project, {
      includeRooms: !0,
      includeWalls: !0,
      includeOpenings: !0,
      includeRoomLabels: !0,
      includeEntityMarkers: !1,
      includeBackground: !0,
      backgroundColor: "#0f172a"
    }), e = ae.generatePictureElementsYaml(this.project, {
      imagePath: this.imagePath,
      title: this.project.name || "Plan Interactif",
      embedDataUri: this.embedDataUri,
      svgContent: t
    }), o = ae.generateHomeArchitectCardYaml(this.project, {
      viewMode: this.customCardViewMode,
      title: this.project.name || "Plan de Maison"
    });
    return k`
      <div class="modal-card" @click=${(a) => a.stopPropagation()}>
        <!-- En-tête -->
        <div class="modal-header">
          <div class="modal-title-group">
            <span class="modal-icon">📤</span>
            <div>
              <h2 class="modal-title">Exporter le plan vers Lovelace</h2>
              <p class="modal-subtitle">Générez une carte interactive pour votre tableau de bord Home Assistant</p>
            </div>
          </div>
          <button class="btn-close" @click=${this.handleClose} title="Fermer">✕</button>
        </div>

        <!-- Onglets -->
        <div class="tabs-nav">
          <button 
            class="tab-btn ${this.activeTab === "picture_elements" ? "active" : ""}"
            @click=${() => this.activeTab = "picture_elements"}
          >
            <span>🖼️</span>
            <span>Carte Picture-Elements (Native)</span>
          </button>

          <button 
            class="tab-btn ${this.activeTab === "custom_card" ? "active" : ""}"
            @click=${() => this.activeTab = "custom_card"}
          >
            <span>🧊</span>
            <span>Carte 2D/3D (Intégrée)</span>
          </button>

          <button 
            class="tab-btn ${this.activeTab === "raw_files" ? "active" : ""}"
            @click=${() => this.activeTab = "raw_files"}
          >
            <span>💾</span>
            <span>Fichiers & Sauvegarde</span>
          </button>
        </div>

        <!-- Corps de la modale -->
        <div class="modal-body">
          <!-- Résumé des entités liées -->
          <div class="stats-row">
            <div class="stat-badge highlight">
              <span>🏠</span>
              <span><strong>${s.rooms}</strong> pièces</span>
            </div>
            <div class="stat-badge">
              <span>💡</span>
              <span><strong>${s.lights}</strong> lumière(s)</span>
            </div>
            <div class="stat-badge">
              <span>📡</span>
              <span><strong>${s.radars}</strong> radar(s) / présence</span>
            </div>
            <div class="stat-badge">
              <span>🌡️</span>
              <span><strong>${s.sensors}</strong> capteur(s) / temp.</span>
            </div>
            <div class="stat-badge">
              <span>🔌</span>
              <span><strong>${s.switches}</strong> prise(s) / switch</span>
            </div>
          </div>

          <!-- Onglet 1 : Carte Native picture-elements -->
          ${this.activeTab === "picture_elements" ? k`
            <!-- Bannière de synchronisation avec HA -->
            ${this.syncStatus === "success" ? k`
              <div class="sync-banner success">
                <span class="sync-icon">✅</span>
                <div class="sync-text">
                  <div class="sync-title">Plan synchronisé directement sur votre serveur Home Assistant !</div>
                  <div class="sync-desc">
                    Le fichier vectoriel avec ses dimensions calibrées est écrit dans <code>/config/www/plan_${((i = this.project) == null ? void 0 : i.id) || "rdc"}.svg</code>.<br/>
                    Accessible immédiatement par Lovelace via <code>${this.imagePath}</code>. Aucun transfert de fichier requis !
                  </div>
                </div>
                <button class="btn-refresh-sync" @click=${this.autoSyncSvg} title="Mettre à jour le fichier SVG sur le serveur">
                  🔄 Re-synchroniser
                </button>
              </div>
            ` : this.syncStatus === "syncing" ? k`
              <div class="sync-banner syncing">
                <span class="sync-icon">⏳</span>
                <div class="sync-text">
                  <div class="sync-title">Synchronisation automatique en cours avec Home Assistant...</div>
                  <div class="sync-desc">Enregistrement direct dans <code>/config/www/plan_${((r = this.project) == null ? void 0 : r.id) || "rdc"}.svg</code>.</div>
                </div>
              </div>
            ` : this.syncStatus === "error" ? k`
              <div class="sync-banner error">
                <span class="sync-icon">⚠️</span>
                <div class="sync-text">
                  <div class="sync-title">Synchronisation automatique impossible (${this.syncErrorMsg || "erreur"})</div>
                  <div class="sync-desc">
                    Vous pouvez cocher l'option <strong>"Embarquer en Data-URI"</strong> ci-dessous, ou télécharger le fichier SVG et le déposer dans <code>/config/www/</code>.
                  </div>
                </div>
                <button class="btn-refresh-sync" @click=${this.autoSyncSvg}>
                  🔄 Réessayer
                </button>
              </div>
            ` : k`
              <div class="sync-banner syncing" style="background: rgba(30, 41, 59, 0.6); border-color: rgba(255, 255, 255, 0.1);">
                <span class="sync-icon">💡</span>
                <div class="sync-text">
                  <div class="sync-title">Synchroniser le plan avec Home Assistant</div>
                  <div class="sync-desc">Enregistre directement le fichier dans <code>/config/www/</code> sans intervention manuelle.</div>
                </div>
                <button class="btn-refresh-sync" @click=${this.autoSyncSvg}>
                  ⚡ Synchroniser
                </button>
              </div>
            `}

            <!-- Option Data-URI 100% autonome -->
            <div class="config-row">
              <label style="display: flex; align-items: center; gap: 10px; cursor: pointer; user-select: none;">
                <input 
                  type="checkbox" 
                  .checked=${this.embedDataUri} 
                  @change=${(a) => this.embedDataUri = a.target.checked}
                  style="accent-color: #38bdf8; width: 16px; height: 16px; cursor: pointer;"
                />
                <div>
                  <div class="config-label">Embarquer le plan en Data-URI (100% autonome sans aucun fichier requis)</div>
                  <div style="font-size: 0.78rem; color: #94a3b8;">
                    Le code SVG est directement injecté dans le YAML Lovelace : fonctionne immédiatement même sans dossier /config/www/ !
                  </div>
                </div>
              </label>
            </div>

            ${this.embedDataUri ? null : k`
              <div class="config-row">
                <label class="config-label">Chemin d'image dans Lovelace :</label>
                <input 
                  type="text" 
                  class="config-input" 
                  .value=${this.imagePath} 
                  @input=${(a) => this.imagePath = a.target.value}
                  placeholder="/local/mon_plan.svg"
                />
                <button class="btn-action emerald" @click=${this.downloadSvg} title="Télécharger une copie locale du SVG">
                  <span>📥</span>
                  <span>Télécharger SVG</span>
                </button>
              </div>
            `}

            <!-- Bloc de code YAML -->
            <div class="code-container">
              <div class="code-header">
                <span>Code YAML prêt à copier</span>
                <button 
                  class="btn-copy ${this.copiedToast ? "copied" : ""}" 
                  @click=${() => this.copyCode(e)}
                >
                  <span>${this.copiedToast ? "✓ Copié !" : "📋 Copier le YAML"}</span>
                </button>
              </div>
              <pre class="code-box"><code>${e}</code></pre>
            </div>

            <!-- Guide Pas-à-Pas -->
            <div class="guide-box">
              <div class="guide-title">
                <span>💡</span>
                <span>Comment installer cette carte dans Home Assistant :</span>
              </div>
              <div class="guide-step">
                <span class="guide-num">1</span>
                <div>
                  ${this.syncStatus === "success" ? k`Le fichier SVG est <strong>déjà présent sur votre serveur Home Assistant</strong> (aucun transfert requis !).` : this.embedDataUri ? k`Le plan est <strong>100% intégré dans le YAML</strong> (aucun fichier externe n'est requis).` : k`Assurez-vous que le fichier <code>plan_${((n = this.project) == null ? void 0 : n.id) || "rdc"}.svg</code> est présent dans <code>/config/www/</code>.`}
                </div>
              </div>
              <div class="guide-step">
                <span class="guide-num">2</span>
                <div>
                  Cliquez sur <strong>Copier le YAML</strong> ci-dessus.
                </div>
              </div>
              <div class="guide-step">
                <span class="guide-num">3</span>
                <div>
                  Dans votre tableau de bord Home Assistant, cliquez sur <strong>Modifier le tableau de bord</strong> > <strong>Ajouter une carte</strong> > Descendez tout en bas et choisissez <strong>Manuel</strong>.
                </div>
              </div>
              <div class="guide-step">
                <span class="guide-num">4</span>
                <div>
                  Collez le code YAML et cliquez sur <strong>Enregistrer</strong>. Vos lumières, radars et températures s'affichent directement à l'échelle sur votre plan !
                </div>
              </div>
            </div>
          ` : null}

          <!-- Onglet 2 : Carte Custom Card (home-architect-card) -->
          ${this.activeTab === "custom_card" ? k`
            <div class="guide-box" style="background: rgba(168, 85, 247, 0.08); border-color: rgba(168, 85, 247, 0.3);">
              <div class="guide-title" style="color: #c084fc;">
                <span>✨</span>
                <span>Carte 2D & 3D Temps Réel intégrée sans fichier externe</span>
              </div>
              <div style="font-size: 0.82rem; color: #cbd5e1; line-height: 1.45;">
                Cette carte utilise directement le moteur de rendu Home Architect. Elle affiche votre plan en 2D ou en <strong>3D isométrique avec rotation libre</strong>, anime les radars en temps réel, illumine les pièces quand les lumières s'allument, et permet de contrôler vos appareils en un clic.
              </div>
            </div>

            <div class="config-row">
              <label class="config-label">Mode de vue par défaut :</label>
              <div style="display: flex; gap: 8px;">
                <button 
                  class="btn-action ${this.customCardViewMode === "2d" ? "" : "purple"}" 
                  style="${this.customCardViewMode === "2d" ? "background: #0284c7;" : "background: rgba(30, 41, 59, 0.8);"}"
                  @click=${() => this.customCardViewMode = "2d"}
                >
                  📐 Vue 2D
                </button>
                <button 
                  class="btn-action ${this.customCardViewMode === "3d" ? "" : "purple"}" 
                  style="${this.customCardViewMode === "3d" ? "background: #7c3aed;" : "background: rgba(30, 41, 59, 0.8);"}"
                  @click=${() => this.customCardViewMode = "3d"}
                >
                  🧊 Vue 3D Isométrique
                </button>
              </div>
            </div>

            <!-- Bloc de code YAML -->
            <div class="code-container">
              <div class="code-header">
                <span>Code Lovelace YAML</span>
                <button 
                  class="btn-copy ${this.copiedToast ? "copied" : ""}" 
                  @click=${() => this.copyCode(o)}
                >
                  <span>${this.copiedToast ? "✓ Copié !" : "📋 Copier le YAML"}</span>
                </button>
              </div>
              <pre class="code-box"><code>${o}</code></pre>
            </div>

            <div class="guide-box">
              <div class="guide-title">
                <span>🚀</span>
                <span>Installation rapide en 1 étape :</span>
              </div>
              <div class="guide-step">
                <span class="guide-num">1</span>
                <div>
                  Dans Lovelace, cliquez sur <strong>Modifier le tableau de bord</strong> > <strong>Ajouter une carte</strong> > <strong>Manuel</strong>, collez ce code YAML et enregistrez !
                </div>
              </div>
            </div>
          ` : null}

          <!-- Onglet 3 : Téléchargement Fichiers Bruts -->
          ${this.activeTab === "raw_files" ? k`
            <div class="config-row">
              <div>
                <div class="config-label">Fichier Vectoriel SVG (Haute Définition)</div>
                <div style="font-size: 0.78rem; color: #94a3b8; margin-top: 2px;">
                  Idéal pour ouvrir dans Inkscape, Illustrator ou imprimer
                </div>
              </div>
              <button class="btn-action emerald" @click=${this.downloadSvg}>
                <span>📐</span>
                <span>Télécharger le SVG</span>
              </button>
            </div>

            <div class="config-row">
              <div>
                <div class="config-label">Sauvegarde complète du projet (JSON)</div>
                <div style="font-size: 0.78rem; color: #94a3b8; margin-top: 2px;">
                  Contient les murs, pièces, hauteurs sous plafond, ouvertures et entités
                </div>
              </div>
              <button class="btn-action purple" @click=${this.downloadJson}>
                <span>💾</span>
                <span>Télécharger la Sauvegarde JSON</span>
              </button>
            </div>
          ` : null}
        </div>

        <!-- Pied de page -->
        <div class="modal-footer">
          <button class="btn-secondary" @click=${this.handleClose}>Fermer</button>
        </div>
      </div>
    `;
  }
};
B.styles = G`
    :host {
      position: fixed;
      inset: 0;
      background: rgba(15, 23, 42, 0.85);
      backdrop-filter: blur(14px);
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
      border: 1px solid rgba(56, 189, 248, 0.35);
      border-radius: 16px;
      width: 720px;
      max-width: 94vw;
      max-height: 90vh;
      display: flex;
      flex-direction: column;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 35px rgba(56, 189, 248, 0.25);
      overflow: hidden;
    }

    .modal-header {
      padding: 16px 22px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: rgba(15, 23, 42, 0.7);
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

    /* Onglets de navigation */
    .tabs-nav {
      display: flex;
      background: rgba(15, 23, 42, 0.5);
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      padding: 0 16px;
      gap: 6px;
    }

    .tab-btn {
      padding: 12px 16px;
      font-size: 0.88rem;
      font-weight: 600;
      color: #94a3b8;
      background: transparent;
      border: none;
      border-bottom: 2px solid transparent;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: all 0.2s ease;
    }

    .tab-btn:hover {
      color: #e2e8f0;
    }

    .tab-btn.active {
      color: #38bdf8;
      border-bottom-color: #38bdf8;
      background: rgba(56, 189, 248, 0.06);
    }

    .modal-body {
      padding: 20px 24px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 16px;
      flex: 1;
    }

    /* Entités stats banner */
    .stats-row {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      background: rgba(15, 23, 42, 0.6);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 10px;
      padding: 10px 14px;
    }

    .stat-badge {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 0.82rem;
      padding: 4px 10px;
      border-radius: 6px;
      background: rgba(30, 41, 59, 0.8);
      border: 1px solid rgba(255, 255, 255, 0.1);
      color: #cbd5e1;
    }

    .stat-badge.highlight {
      border-color: #38bdf8;
      color: #38bdf8;
      background: rgba(56, 189, 248, 0.1);
    }

    /* Section Actions / Configuration */
    .config-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      background: rgba(15, 23, 42, 0.5);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 10px;
      padding: 10px 14px;
    }

    .config-label {
      font-size: 0.85rem;
      font-weight: 600;
      color: #e2e8f0;
    }

    .config-input {
      background: rgba(30, 41, 59, 0.8);
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 6px;
      padding: 6px 10px;
      color: #f8fafc;
      font-size: 0.85rem;
      font-family: ui-monospace, SFMono-Regular, monospace;
      outline: none;
      flex: 1;
      max-width: 320px;
    }

    .config-input:focus {
      border-color: #38bdf8;
    }

    /* Bouton action primaire */
    .btn-action {
      background: #0284c7;
      color: #ffffff;
      border: 1px solid #38bdf8;
      border-radius: 8px;
      padding: 8px 16px;
      font-size: 0.85rem;
      font-weight: 600;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      transition: all 0.2s ease;
      text-decoration: none;
    }

    .btn-action:hover {
      background: #0369a1;
      box-shadow: 0 0 14px rgba(56, 189, 248, 0.45);
    }

    .btn-action.emerald {
      background: #059669;
      border-color: #10b981;
    }

    .btn-action.emerald:hover {
      background: #047857;
      box-shadow: 0 0 14px rgba(16, 185, 129, 0.45);
    }

    .btn-action.purple {
      background: #7c3aed;
      border-color: #a855f7;
    }

    .btn-action.purple:hover {
      background: #6d28d9;
      box-shadow: 0 0 14px rgba(168, 85, 247, 0.45);
    }

    /* Zone de code YAML */
    .code-container {
      position: relative;
      display: flex;
      flex-direction: column;
      border-radius: 10px;
      overflow: hidden;
      border: 1px solid rgba(56, 189, 248, 0.3);
      background: #090d16;
    }

    .code-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 8px 14px;
      background: rgba(15, 23, 42, 0.8);
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      font-size: 0.8rem;
      font-weight: 700;
      color: #94a3b8;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .btn-copy {
      background: rgba(56, 189, 248, 0.15);
      border: 1px solid rgba(56, 189, 248, 0.35);
      color: #38bdf8;
      border-radius: 6px;
      padding: 4px 10px;
      font-size: 0.8rem;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
      transition: all 0.15s ease;
    }

    .btn-copy:hover {
      background: #0284c7;
      color: #ffffff;
      border-color: #38bdf8;
    }

    .btn-copy.copied {
      background: #059669;
      border-color: #10b981;
      color: #ffffff;
    }

    pre.code-box {
      margin: 0;
      padding: 14px 16px;
      max-height: 280px;
      overflow-y: auto;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      font-size: 0.82rem;
      line-height: 1.5;
      color: #e2e8f0;
      white-space: pre;
    }

    /* Guide pas-à-pas */
    .guide-box {
      background: rgba(56, 189, 248, 0.06);
      border: 1px solid rgba(56, 189, 248, 0.2);
      border-radius: 10px;
      padding: 12px 16px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .guide-title {
      font-size: 0.86rem;
      font-weight: 700;
      color: #38bdf8;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .guide-step {
      font-size: 0.8rem;
      color: #cbd5e1;
      line-height: 1.45;
      display: flex;
      gap: 8px;
    }

    .guide-num {
      background: #0284c7;
      color: #ffffff;
      border-radius: 50%;
      width: 18px;
      height: 18px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.72rem;
      font-weight: bold;
      flex-shrink: 0;
      margin-top: 2px;
    }

    .modal-footer {
      padding: 14px 24px;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      display: flex;
      justify-content: flex-end;
      gap: 10px;
      background: rgba(15, 23, 42, 0.6);
    }

    .btn-secondary {
      background: rgba(51, 65, 85, 0.7);
      color: #cbd5e1;
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 8px;
      padding: 8px 16px;
      font-size: 0.85rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .btn-secondary:hover {
      background: #475569;
      color: #ffffff;
    }

    /* Bannière de synchronisation automatique */
    .sync-banner {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 16px;
      border-radius: 10px;
      font-size: 0.84rem;
      line-height: 1.4;
      animation: fadeIn 0.2s ease-out;
    }

    .sync-banner.success {
      background: rgba(16, 185, 129, 0.12);
      border: 1px solid rgba(16, 185, 129, 0.4);
      color: #6ee7b7;
    }

    .sync-banner.syncing {
      background: rgba(56, 189, 248, 0.1);
      border: 1px solid rgba(56, 189, 248, 0.35);
      color: #7dd3fc;
    }

    .sync-banner.error {
      background: rgba(239, 68, 68, 0.12);
      border: 1px solid rgba(239, 68, 68, 0.4);
      color: #fca5a5;
    }

    .sync-icon {
      font-size: 1.4rem;
      flex-shrink: 0;
    }

    .sync-text {
      flex: 1;
    }

    .sync-title {
      font-weight: 700;
      font-size: 0.88rem;
      margin-bottom: 2px;
    }

    .sync-desc {
      font-size: 0.8rem;
      opacity: 0.9;
    }

    .sync-desc code {
      background: rgba(0, 0, 0, 0.35);
      padding: 2px 6px;
      border-radius: 4px;
      font-family: ui-monospace, SFMono-Regular, monospace;
      font-size: 0.78rem;
    }

    .btn-refresh-sync {
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: #ffffff;
      border-radius: 6px;
      padding: 6px 12px;
      font-size: 0.8rem;
      font-weight: 600;
      cursor: pointer;
      white-space: nowrap;
      transition: all 0.15s ease;
    }

    .btn-refresh-sync:hover {
      background: rgba(255, 255, 255, 0.2);
    }
  `;
K([
  I({ type: Object })
], B.prototype, "project", 2);
K([
  I({ type: Object })
], B.prototype, "hass", 2);
K([
  m()
], B.prototype, "activeTab", 2);
K([
  m()
], B.prototype, "imagePath", 2);
K([
  m()
], B.prototype, "customCardViewMode", 2);
K([
  m()
], B.prototype, "copiedToast", 2);
K([
  m()
], B.prototype, "syncStatus", 2);
K([
  m()
], B.prototype, "syncErrorMsg", 2);
K([
  m()
], B.prototype, "embedDataUri", 2);
B = K([
  X("home-architect-export-modal")
], B);
var os = Object.defineProperty, is = Object.getOwnPropertyDescriptor, O = (s, t, e, o) => {
  for (var i = o > 1 ? void 0 : o ? is(t, e) : t, r = s.length - 1, n; r >= 0; r--)
    (n = s[r]) && (i = (o ? n(t, e, i) : n(i)) || i);
  return o && i && os(t, e, i), i;
};
let z = class extends U {
  constructor() {
    super(...arguments), this.narrow = !1, this.activeTool = "wall", this.currentThickness = 0.2, this.currentOpeningWidth = 0.9, this.activeLevel = "rdc", this.is3DMode = !1, this.isDrawerCollapsed = !1, this.isWizardOpen = !1, this.isImportModalOpen = !1, this.isExportModalOpen = !1, this.isCalibrateModalOpen = !1, this.calibrationData = null, this.isRescaleModalOpen = !1, this.rescaleMeasuredMeters = 0, this.selectedRoomForEdit = null, this.selectedElements = {
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
    const { name: t, width: e, length: o, thickness: i, height: r, color: n, icon: a, addDoor: l, addWindow: h } = s.detail, c = r || 2.5, u = 2, p = 2, f = { x: u, y: p }, d = { x: u + e, y: p }, g = { x: u + e, y: p + o }, b = { x: u, y: p + o }, S = {
      id: `w_top_${Date.now()}`,
      start: f,
      end: d,
      thickness: i,
      height: c,
      type: "standard"
    }, w = {
      id: `w_right_${Date.now()}`,
      start: d,
      end: g,
      thickness: i,
      height: c,
      type: "standard"
    }, v = {
      id: `w_bottom_${Date.now()}`,
      start: g,
      end: b,
      thickness: i,
      height: c,
      type: "standard"
    }, x = {
      id: `w_left_${Date.now()}`,
      start: b,
      end: f,
      thickness: i,
      height: c,
      type: "standard"
    }, $ = [];
    l && $.push({
      id: `op_door_${Date.now()}`,
      wallId: v.id,
      type: "door",
      offset: e / 2,
      width: 0.9,
      flipSide: !1,
      flipDirection: !1
    }), h && $.push({
      id: `op_win_${Date.now()}`,
      wallId: S.id,
      type: "window",
      offset: e / 2,
      width: 1.2,
      flipSide: !1,
      flipDirection: !1
    });
    const M = {
      id: `room_${Date.now()}`,
      name: t,
      polygon: [f, d, g, b],
      areaM2: e * o,
      color: n,
      icon: a,
      height: c
    };
    this.project = {
      ...this.project,
      walls: [...this.project.walls, S, w, v, x],
      openings: [...this.project.openings, ...$],
      rooms: [...this.project.rooms, M]
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
  loadBackgroundImage(s, t = "Plan chargé !") {
    const e = new Image();
    e.onload = () => {
      this.pushUndoSnapshot(), this.project = {
        ...this.project,
        background: {
          imageUrl: s,
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
    }, e.src = s;
  }
  handleImportConfirmed(s) {
    this.pushUndoSnapshot();
    const {
      dataUrl: t,
      widthPx: e,
      heightPx: o,
      opacity: i,
      mode: r,
      totalWidthMeters: n,
      isSvgVectorized: a,
      svgInterpretation: l,
      keepSvgBackground: h
    } = s.detail;
    if (this.isImportModalOpen = !1, a && l && l.success) {
      const { walls: u, openings: p, rooms: f, pixelsPerMeter: d, stats: g } = l, b = h ? {
        imageUrl: t,
        opacity: i !== void 0 ? i : 0.25,
        visible: !0,
        offset: { x: 0, y: 0 },
        scale: 1,
        rotation: 0,
        widthPx: e,
        heightPx: o
      } : void 0;
      this.project = {
        ...this.project,
        pixelsPerMeter: d || this.project.pixelsPerMeter,
        walls: [...this.project.walls, ...u],
        openings: [...this.project.openings, ...p],
        rooms: [...this.project.rooms, ...f],
        background: b
      }, this.activeTool = "select", this.showToast(
        `✨ Plan SVG converti : ${g.wallCount} mur${g.wallCount > 1 ? "s" : ""}, ${g.doorCount} porte${g.doorCount > 1 ? "s" : ""}, ${g.windowCount} fenêtre${g.windowCount > 1 ? "s" : ""} et ${g.roomCount} pièce${g.roomCount > 1 ? "s" : ""} créés !`
      );
      return;
    }
    let c = this.project.pixelsPerMeter;
    r === "auto_dimension" && n && n > 0 && (c = Math.round(e / n * 10) / 10), this.project = {
      ...this.project,
      pixelsPerMeter: c,
      background: {
        imageUrl: t,
        opacity: i !== void 0 ? i : 0.4,
        visible: !0,
        offset: { x: 0, y: 0 },
        scale: 1,
        rotation: 0,
        widthPx: e,
        heightPx: o
      }
    }, r === "auto_dimension" ? (this.activeTool = "wall", this.showToast(`✅ Plan importé et étalonné automatiquement (1 m = ${c} px) ! Vous pouvez tracer vos murs (🧱).`)) : (this.activeTool = "calibrate", this.showToast("📏 Plan importé ! Tracez un segment sur un mur mesuré pour étalonner l'échelle."));
  }
  handlePaste(s) {
    var o;
    if (this.isImportModalOpen || !s.clipboardData) return;
    const t = s.clipboardData.items;
    for (let i = 0; i < t.length; i++)
      if (t[i].type.indexOf("image") !== -1) {
        const r = t[i].getAsFile();
        if (r) {
          s.preventDefault();
          const n = new FileReader();
          n.onload = (a) => {
            var h;
            const l = (h = a.target) == null ? void 0 : h.result;
            this.loadBackgroundImage(l, "📋 Image collée depuis le presse-papier !");
          }, n.readAsDataURL(r);
          return;
        }
      }
    const e = (o = s.clipboardData.getData("text/plain")) == null ? void 0 : o.trim();
    if (e && (e.startsWith("<svg") || e.startsWith("<?xml") && e.includes("<svg"))) {
      s.preventDefault(), this.isImportModalOpen = !0, this.showToast("📥 Code SVG détecté ! Configurez la vectorisation automatique.");
      return;
    }
    e && (e.startsWith("data:image/") || e.match(/\.(png|jpe?g|svg|webp)(\?.*)?$/i)) && (s.preventDefault(), this.loadBackgroundImage(e, "📋 Image chargée depuis l'URL collée !"));
  }
  triggerFileInput() {
    if (!this.fileInputRef) {
      const s = document.createElement("input");
      s.type = "file", s.accept = "image/*", s.style.display = "none", s.addEventListener("change", (t) => this.handleFileSelected(t)), document.body.appendChild(s), this.fileInputRef = s;
    }
    this.fileInputRef.click();
  }
  handleFileSelected(s) {
    var o;
    const t = (o = s.target.files) == null ? void 0 : o[0];
    if (!t) return;
    const e = new FileReader();
    e.onload = (i) => {
      var n;
      const r = (n = i.target) == null ? void 0 : n.result;
      this.loadBackgroundImage(r, "🖼️ Image importée depuis votre ordinateur !");
    }, e.readAsDataURL(t);
  }
  handleRequestCalibration(s) {
    this.calibrationData = s.detail, this.isCalibrateModalOpen = !0;
  }
  handleCalibrateConfirmed(s) {
    this.pushUndoSnapshot();
    const { pixelsPerMeter: t } = s.detail;
    this.project = {
      ...this.project,
      pixelsPerMeter: Math.round(t * 10) / 10
    }, this.isCalibrateModalOpen = !1, this.calibrationData = null, this.activeTool = "wall";
  }
  handleRequestRescale(s) {
    this.rescaleMeasuredMeters = s.detail.measuredMeters, this.isRescaleModalOpen = !0;
  }
  handleRescaleConfirmed(s) {
    this.pushUndoSnapshot();
    const { currentMeters: t, targetMeters: e, scaleFactor: o, adjustBackground: i } = s.detail;
    if (this.isRescaleModalOpen = !1, o <= 0 || isNaN(o)) return;
    const r = this.project.walls.map((u) => ({
      ...u,
      start: {
        x: y.roundMeters(u.start.x * o),
        y: y.roundMeters(u.start.y * o)
      },
      end: {
        x: y.roundMeters(u.end.x * o),
        y: y.roundMeters(u.end.y * o)
      }
    })), n = this.project.openings.map((u) => ({
      ...u,
      offset: y.roundMeters(u.offset * o),
      width: y.roundMeters(u.width * o)
    })), a = this.project.rooms.map((u) => {
      const p = u.polygon.map((d) => ({
        x: y.roundMeters(d.x * o),
        y: y.roundMeters(d.y * o)
      })), f = J.computeArea(p);
      return {
        ...u,
        polygon: p,
        areaM2: f || y.roundMeters(u.areaM2 * o * o)
      };
    }), l = this.project.bindings.map((u) => ({
      ...u,
      position: {
        x: y.roundMeters(u.position.x * o),
        y: y.roundMeters(u.position.y * o)
      }
    }));
    let h = this.project.pixelsPerMeter, c = this.project.background ? { ...this.project.background } : void 0;
    i && c && (h = Math.round(this.project.pixelsPerMeter / o * 10) / 10, c.offset && (c = {
      ...c,
      offset: {
        x: y.roundMeters(c.offset.x * o),
        y: y.roundMeters(c.offset.y * o)
      }
    })), this.project = {
      ...this.project,
      pixelsPerMeter: h,
      walls: r,
      openings: n,
      rooms: a,
      bindings: l,
      background: c
    }, this.activeTool = "select", this.showToast(
      `✅ Plan mis à l'échelle (×${o.toFixed(3)}) : ${r.length} murs et ${a.length} pièces recalculés !`
    );
  }
  handleOpacityChange(s) {
    const t = parseFloat(s.target.value);
    this.project.background && (this.project = {
      ...this.project,
      background: { ...this.project.background, opacity: t }
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
    const { roomId: t, name: e, height: o, color: i } = s.detail, r = this.project.rooms.map((n) => n.id === t ? { ...n, name: e, height: o, color: i } : n);
    this.project = {
      ...this.project,
      rooms: r
    }, this.selectedRoomForEdit = null, this.showToast(`✨ Pièce "${e}" mise à jour (H: ${o.toFixed(2)} m) !`);
  }
  handleDeleteRoom(s) {
    this.pushUndoSnapshot();
    const { roomId: t } = s.detail;
    this.project = {
      ...this.project,
      rooms: this.project.rooms.filter((e) => e.id !== t)
    }, this.selectedRoomForEdit = null, this.showToast("🗑️ Pièce supprimée");
  }
  pushUndoSnapshot(s) {
    const t = JSON.parse(JSON.stringify(s || this.project));
    this.undoStack = [...this.undoStack.slice(-39), t], this.redoStack = [];
  }
  handleUndo() {
    if (this.undoStack.length === 0) return;
    const s = this.undoStack[this.undoStack.length - 1], t = this.undoStack.slice(0, -1), e = JSON.parse(JSON.stringify(this.project));
    this.redoStack = [...this.redoStack.slice(-39), e], this.undoStack = t, this.project = s, this.selectedElements = { wallIds: [], openingIds: [], roomIds: [], bindingIds: [] }, this.showToast("↩️ Action annulée");
  }
  handleRedo() {
    if (this.redoStack.length === 0) return;
    const s = this.redoStack[this.redoStack.length - 1], t = this.redoStack.slice(0, -1), e = JSON.parse(JSON.stringify(this.project));
    this.undoStack = [...this.undoStack.slice(-39), e], this.redoStack = t, this.project = s, this.selectedElements = { wallIds: [], openingIds: [], roomIds: [], bindingIds: [] }, this.showToast("↪️ Action rétablie");
  }
  handleDeleteSelected() {
    const { wallIds: s, openingIds: t, roomIds: e, bindingIds: o } = this.selectedElements, i = s.length + t.length + e.length + o.length;
    if (i === 0) return;
    this.pushUndoSnapshot();
    const r = this.project.walls.filter((h) => !s.includes(h.id)), n = this.project.openings.filter(
      (h) => !t.includes(h.id) && !s.includes(h.wallId)
    ), a = this.project.rooms.filter((h) => !e.includes(h.id)), l = this.project.bindings.filter((h) => !o.includes(h.id));
    this.project = {
      ...this.project,
      walls: r,
      openings: n,
      rooms: a,
      bindings: l
    }, this.selectedElements = { wallIds: [], openingIds: [], roomIds: [], bindingIds: [] }, this.showToast(`🗑️ ${i} élément${i > 1 ? "s" : ""} supprimé${i > 1 ? "s" : ""} !`);
  }
  clearSelection() {
    this.selectedElements = { wallIds: [], openingIds: [], roomIds: [], bindingIds: [] };
  }
  getSelectedSummary() {
    const s = [];
    return this.selectedElements.wallIds.length > 0 && s.push(`${this.selectedElements.wallIds.length} mur${this.selectedElements.wallIds.length > 1 ? "s" : ""}`), this.selectedElements.openingIds.length > 0 && s.push(`${this.selectedElements.openingIds.length} ouvrant${this.selectedElements.openingIds.length > 1 ? "s" : ""}`), this.selectedElements.roomIds.length > 0 && s.push(`${this.selectedElements.roomIds.length} pièce${this.selectedElements.roomIds.length > 1 ? "s" : ""}`), this.selectedElements.bindingIds.length > 0 && s.push(`${this.selectedElements.bindingIds.length} entité${this.selectedElements.bindingIds.length > 1 ? "s" : ""}`), s.join(", ");
  }
  handleKeyDown(s) {
    var e, o, i;
    const t = (o = (e = s.target) == null ? void 0 : e.tagName) == null ? void 0 : o.toLowerCase();
    t === "input" || t === "textarea" || (i = s.target) != null && i.isContentEditable || ((s.ctrlKey || s.metaKey) && s.key.toLowerCase() === "z" && !s.shiftKey ? (s.preventDefault(), this.handleUndo()) : (s.ctrlKey || s.metaKey) && (s.key.toLowerCase() === "y" || s.key.toLowerCase() === "z" && s.shiftKey) ? (s.preventDefault(), this.handleRedo()) : s.key === "Delete" || s.key === "Backspace" ? this.selectedElements.wallIds.length + this.selectedElements.openingIds.length + this.selectedElements.roomIds.length + this.selectedElements.bindingIds.length > 0 && (s.preventDefault(), this.handleDeleteSelected()) : s.key === "Escape" ? this.clearSelection() : s.key.toLowerCase() === "v" && (this.activeTool = "select"));
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
    var t, e;
    const s = !!((t = this.project.background) != null && t.imageUrl);
    return k`
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

          <!-- Bouton Exporter vers Lovelace -->
          <button 
            class="btn-export" 
            @click=${() => this.isExportModalOpen = !0} 
            title="Exporter le plan vers Lovelace (Carte Picture-Elements ou Carte 2D/3D)"
          >
            <span>📤</span>
            <span>Exporter Lovelace</span>
          </button>

          <!-- Épaisseur mur -->
          ${this.activeTool === "wall" ? k`
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
          ${this.activeTool === "door" || this.activeTool === "window" || this.activeTool === "french_window" ? k`
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
          ${this.is3DMode ? k`
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
          ${s ? k`
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
            @selection-changed=${(o) => this.selectedElements = o.detail.selectedElements}
            @request-delete-selected=${this.handleDeleteSelected}
            @toggle-3d=${(o) => this.is3DMode = o.detail.is3DMode}
            @room-selected=${(o) => this.selectedRoomForEdit = o.detail.room}
            @project-changed=${this.handleProjectChanged}
            @request-calibration=${this.handleRequestCalibration}
            @request-rescale=${this.handleRequestRescale}
            @background-image-loaded=${(o) => this.loadBackgroundImage(o.detail.dataUrl, "🖼️ Image de plan glissée-déposée !")}
          ></home-architect-canvas>

          <!-- Floating HUD de sélection multi-éléments -->
          ${this.selectedElements.wallIds.length + this.selectedElements.openingIds.length + this.selectedElements.roomIds.length + this.selectedElements.bindingIds.length > 0 ? k`
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
          ${this.toastMessage ? k`
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
      ${this.isImportModalOpen ? k`
        <home-architect-import-modal
          .currentLevel=${this.activeLevel}
          @import-confirmed=${this.handleImportConfirmed}
          @close=${() => this.isImportModalOpen = !1}
        ></home-architect-import-modal>
      ` : null}

      <!-- Modal Assistant Pièce Débutant -->
      ${this.isWizardOpen ? k`
        <home-architect-wizard-modal
          @create-room=${this.handleCreateRoomFromWizard}
          @close=${() => this.isWizardOpen = !1}
        ></home-architect-wizard-modal>
      ` : null}

      <!-- Modal Propriétés de la Pièce (Hauteur sous plafond 3D, etc.) -->
      ${this.selectedRoomForEdit ? k`
        <home-architect-room-modal
          .room=${this.selectedRoomForEdit}
          @save-room=${this.handleSaveRoom}
          @delete-room=${this.handleDeleteRoom}
          @close=${() => this.selectedRoomForEdit = null}
        ></home-architect-room-modal>
      ` : null}

      <!-- Modal Étalonnage Mesure de Mur -->
      ${this.isCalibrateModalOpen && this.calibrationData ? k`
        <home-architect-calibrate-modal
          .pixelDistance=${this.calibrationData.pixelDistance}
          .defaultMeters=${this.calibrationData.defaultMeters}
          @calibrate-confirmed=${this.handleCalibrateConfirmed}
          @close=${() => this.isCalibrateModalOpen = !1}
        ></home-architect-calibrate-modal>
      ` : null}

      <!-- Modal Mettre à l'échelle (Recalcul de toutes les cotes) -->
      ${this.isRescaleModalOpen ? k`
        <home-architect-rescale-modal
          .measuredMeters=${this.rescaleMeasuredMeters}
          .wallCount=${this.project.walls.length}
          .roomCount=${this.project.rooms.length}
          .openingCount=${this.project.openings.length}
          @rescale-confirmed=${this.handleRescaleConfirmed}
          @close=${() => this.isRescaleModalOpen = !1}
        ></home-architect-rescale-modal>
      ` : null}

      <!-- Modal Exporter vers Lovelace -->
      ${this.isExportModalOpen ? k`
        <home-architect-export-modal
          .project=${this.project}
          .hass=${this.hass}
          @close=${() => this.isExportModalOpen = !1}
        ></home-architect-export-modal>
      ` : null}
    `;
  }
};
z.styles = G`
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

    button.btn-export {
      background: rgba(168, 85, 247, 0.2);
      color: #c084fc;
      border: 1px solid rgba(168, 85, 247, 0.45);
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

    button.btn-export:hover {
      background: #9333ea;
      color: #ffffff;
      box-shadow: 0 0 14px rgba(168, 85, 247, 0.5);
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
O([
  I({ type: Object })
], z.prototype, "hass", 2);
O([
  I({ type: Boolean })
], z.prototype, "narrow", 2);
O([
  m()
], z.prototype, "activeTool", 2);
O([
  m()
], z.prototype, "currentThickness", 2);
O([
  m()
], z.prototype, "currentOpeningWidth", 2);
O([
  m()
], z.prototype, "activeLevel", 2);
O([
  m()
], z.prototype, "is3DMode", 2);
O([
  m()
], z.prototype, "isDrawerCollapsed", 2);
O([
  m()
], z.prototype, "isWizardOpen", 2);
O([
  m()
], z.prototype, "isImportModalOpen", 2);
O([
  m()
], z.prototype, "isExportModalOpen", 2);
O([
  m()
], z.prototype, "isCalibrateModalOpen", 2);
O([
  m()
], z.prototype, "calibrationData", 2);
O([
  m()
], z.prototype, "isRescaleModalOpen", 2);
O([
  m()
], z.prototype, "rescaleMeasuredMeters", 2);
O([
  m()
], z.prototype, "selectedRoomForEdit", 2);
O([
  m()
], z.prototype, "selectedElements", 2);
O([
  m()
], z.prototype, "undoStack", 2);
O([
  m()
], z.prototype, "redoStack", 2);
O([
  m()
], z.prototype, "project", 2);
O([
  m()
], z.prototype, "toastMessage", 2);
z = O([
  X("home-architect-panel")
], z);
var rs = Object.defineProperty, ns = Object.getOwnPropertyDescriptor, Et = (s, t, e, o) => {
  for (var i = o > 1 ? void 0 : o ? ns(t, e) : t, r = s.length - 1, n; r >= 0; r--)
    (n = s[r]) && (i = (o ? n(t, e, i) : n(i)) || i);
  return o && i && rs(t, e, i), i;
};
let pt = class extends U {
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
    this.config = s, this.is3DMode = s.view_mode === "3d", s.height && this.style.setProperty("--card-custom-height", s.height);
  }
  getCardSize() {
    return 6;
  }
  firstUpdated() {
    this.loadProject();
  }
  async loadProject() {
    var e, o;
    const s = ((e = this.config) == null ? void 0 : e.project_id) || "rdc";
    if (this.hass && this.hass.callWS)
      try {
        const i = await this.hass.callWS({ type: "home_architect/get_projects" }), r = (o = i == null ? void 0 : i.projects) == null ? void 0 : o.find((n) => n.id === s);
        if (r) {
          this.project = r;
          return;
        }
      } catch (i) {
        console.warn("WebSocket get_projects échoué, essai localStorage:", i);
      }
    const t = localStorage.getItem(`home_architect_${s}`);
    if (t)
      try {
        this.project = JSON.parse(t);
      } catch {
      }
  }
  handleMoreInfo(s) {
    const t = new CustomEvent("hass-more-info", {
      detail: s.detail,
      bubbles: !0,
      composed: !0
    });
    this.dispatchEvent(t);
  }
  render() {
    var t, e;
    const s = ((t = this.config) == null ? void 0 : t.show_header) !== !1;
    return k`
      ${s ? k`
        <div class="card-header">
          <div class="card-title">${((e = this.config) == null ? void 0 : e.title) || this.project.name || "Home Architect"}</div>
          <button class="view-toggle" @click=${() => this.is3DMode = !this.is3DMode}>
            ${this.is3DMode ? "🧊 3D" : "📐 2D"}
          </button>
        </div>
      ` : null}

      <div class="canvas-wrapper">
        <home-architect-canvas
          .hass=${this.hass}
          .project=${this.project}
          .activeTool=${"select"}
          .is3DMode=${this.is3DMode}
          .isDashboardMode=${!0}
          @hass-more-info=${this.handleMoreInfo}
        ></home-architect-canvas>
      </div>
    `;
  }
};
pt.styles = G`
    :host {
      display: block;
      height: var(--card-custom-height, 480px);
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
Et([
  I({ type: Object })
], pt.prototype, "hass", 2);
Et([
  m()
], pt.prototype, "config", 2);
Et([
  m()
], pt.prototype, "project", 2);
Et([
  m()
], pt.prototype, "is3DMode", 2);
pt = Et([
  X("home-architect-card")
], pt);
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
