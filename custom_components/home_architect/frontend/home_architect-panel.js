/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Et = globalThis, qt = Et.ShadowRoot && (Et.ShadyCSS === void 0 || Et.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Vt = Symbol(), Xt = /* @__PURE__ */ new WeakMap();
let ce = class {
  constructor(t, s, i) {
    if (this._$cssResult$ = !0, i !== Vt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = s;
  }
  get styleSheet() {
    let t = this.o;
    const s = this.t;
    if (qt && t === void 0) {
      const i = s !== void 0 && s.length === 1;
      i && (t = Xt.get(s)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && Xt.set(s, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const fe = (e) => new ce(typeof e == "string" ? e : e + "", void 0, Vt), K = (e, ...t) => {
  const s = e.length === 1 ? e[0] : t.reduce((i, o, r) => i + ((n) => {
    if (n._$cssResult$ === !0) return n.cssText;
    if (typeof n == "number") return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + e[r + 1], e[0]);
  return new ce(s, e, Vt);
}, be = (e, t) => {
  if (qt) e.adoptedStyleSheets = t.map((s) => s instanceof CSSStyleSheet ? s : s.styleSheet);
  else for (const s of t) {
    const i = document.createElement("style"), o = Et.litNonce;
    o !== void 0 && i.setAttribute("nonce", o), i.textContent = s.cssText, e.appendChild(i);
  }
}, Kt = qt ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let s = "";
  for (const i of t.cssRules) s += i.cssText;
  return fe(s);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: me, defineProperty: xe, getOwnPropertyDescriptor: ve, getOwnPropertyNames: ye, getOwnPropertySymbols: we, getPrototypeOf: $e } = Object, ot = globalThis, Jt = ot.trustedTypes, ke = Jt ? Jt.emptyScript : "", Nt = ot.reactiveElementPolyfillSupport, wt = (e, t) => e, jt = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? ke : null;
      break;
    case Object:
    case Array:
      e = e == null ? e : JSON.stringify(e);
  }
  return e;
}, fromAttribute(e, t) {
  let s = e;
  switch (t) {
    case Boolean:
      s = e !== null;
      break;
    case Number:
      s = e === null ? null : Number(e);
      break;
    case Object:
    case Array:
      try {
        s = JSON.parse(e);
      } catch {
        s = null;
      }
  }
  return s;
} }, Yt = (e, t) => !me(e, t), Zt = { attribute: !0, type: String, converter: jt, reflect: !1, useDefault: !1, hasChanged: Yt };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), ot.litPropertyMetadata ?? (ot.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let ft = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, s = Zt) {
    if (s.state && (s.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((s = Object.create(s)).wrapped = !0), this.elementProperties.set(t, s), !s.noAccessor) {
      const i = Symbol(), o = this.getPropertyDescriptor(t, i, s);
      o !== void 0 && xe(this.prototype, t, o);
    }
  }
  static getPropertyDescriptor(t, s, i) {
    const { get: o, set: r } = ve(this.prototype, t) ?? { get() {
      return this[s];
    }, set(n) {
      this[s] = n;
    } };
    return { get: o, set(n) {
      const a = o == null ? void 0 : o.call(this);
      r == null || r.call(this, n), this.requestUpdate(t, a, i);
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
      const s = this.properties, i = [...ye(s), ...we(s)];
      for (const o of i) this.createProperty(o, s[o]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const s = litPropertyMetadata.get(t);
      if (s !== void 0) for (const [i, o] of s) this.elementProperties.set(i, o);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [s, i] of this.elementProperties) {
      const o = this._$Eu(s, i);
      o !== void 0 && this._$Eh.set(o, s);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const s = [];
    if (Array.isArray(t)) {
      const i = new Set(t.flat(1 / 0).reverse());
      for (const o of i) s.unshift(Kt(o));
    } else t !== void 0 && s.push(Kt(t));
    return s;
  }
  static _$Eu(t, s) {
    const i = s.attribute;
    return i === !1 ? void 0 : typeof i == "string" ? i : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var t;
    this._$ES = new Promise((s) => this.enableUpdating = s), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (t = this.constructor.l) == null || t.forEach((s) => s(this));
  }
  addController(t) {
    var s;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(t), this.renderRoot !== void 0 && this.isConnected && ((s = t.hostConnected) == null || s.call(t));
  }
  removeController(t) {
    var s;
    (s = this._$EO) == null || s.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), s = this.constructor.elementProperties;
    for (const i of s.keys()) this.hasOwnProperty(i) && (t.set(i, this[i]), delete this[i]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return be(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    var t;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$EO) == null || t.forEach((s) => {
      var i;
      return (i = s.hostConnected) == null ? void 0 : i.call(s);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$EO) == null || t.forEach((s) => {
      var i;
      return (i = s.hostDisconnected) == null ? void 0 : i.call(s);
    });
  }
  attributeChangedCallback(t, s, i) {
    this._$AK(t, i);
  }
  _$ET(t, s) {
    var r;
    const i = this.constructor.elementProperties.get(t), o = this.constructor._$Eu(t, i);
    if (o !== void 0 && i.reflect === !0) {
      const n = (((r = i.converter) == null ? void 0 : r.toAttribute) !== void 0 ? i.converter : jt).toAttribute(s, i.type);
      this._$Em = t, n == null ? this.removeAttribute(o) : this.setAttribute(o, n), this._$Em = null;
    }
  }
  _$AK(t, s) {
    var r, n;
    const i = this.constructor, o = i._$Eh.get(t);
    if (o !== void 0 && this._$Em !== o) {
      const a = i.getPropertyOptions(o), l = typeof a.converter == "function" ? { fromAttribute: a.converter } : ((r = a.converter) == null ? void 0 : r.fromAttribute) !== void 0 ? a.converter : jt;
      this._$Em = o;
      const h = l.fromAttribute(s, a.type);
      this[o] = h ?? ((n = this._$Ej) == null ? void 0 : n.get(o)) ?? h, this._$Em = null;
    }
  }
  requestUpdate(t, s, i, o = !1, r) {
    var n;
    if (t !== void 0) {
      const a = this.constructor;
      if (o === !1 && (r = this[t]), i ?? (i = a.getPropertyOptions(t)), !((i.hasChanged ?? Yt)(r, s) || i.useDefault && i.reflect && r === ((n = this._$Ej) == null ? void 0 : n.get(t)) && !this.hasAttribute(a._$Eu(t, i)))) return;
      this.C(t, s, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, s, { useDefault: i, reflect: o, wrapped: r }, n) {
    i && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, n ?? s ?? this[t]), r !== !0 || n !== void 0) || (this._$AL.has(t) || (this.hasUpdated || i || (s = void 0), this._$AL.set(t, s)), o === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (s) {
      Promise.reject(s);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var i;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [r, n] of this._$Ep) this[r] = n;
        this._$Ep = void 0;
      }
      const o = this.constructor.elementProperties;
      if (o.size > 0) for (const [r, n] of o) {
        const { wrapped: a } = n, l = this[r];
        a !== !0 || this._$AL.has(r) || l === void 0 || this.C(r, void 0, n, l);
      }
    }
    let t = !1;
    const s = this._$AL;
    try {
      t = this.shouldUpdate(s), t ? (this.willUpdate(s), (i = this._$EO) == null || i.forEach((o) => {
        var r;
        return (r = o.hostUpdate) == null ? void 0 : r.call(o);
      }), this.update(s)) : this._$EM();
    } catch (o) {
      throw t = !1, this._$EM(), o;
    }
    t && this._$AE(s);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var s;
    (s = this._$EO) == null || s.forEach((i) => {
      var o;
      return (o = i.hostUpdated) == null ? void 0 : o.call(i);
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
    this._$Eq && (this._$Eq = this._$Eq.forEach((s) => this._$ET(s, this[s]))), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
ft.elementStyles = [], ft.shadowRootOptions = { mode: "open" }, ft[wt("elementProperties")] = /* @__PURE__ */ new Map(), ft[wt("finalized")] = /* @__PURE__ */ new Map(), Nt == null || Nt({ ReactiveElement: ft }), (ot.reactiveElementVersions ?? (ot.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const $t = globalThis, Qt = (e) => e, zt = $t.trustedTypes, te = zt ? zt.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, de = "$lit$", it = `lit$${Math.random().toFixed(9).slice(2)}$`, pe = "?" + it, Se = `<${pe}>`, ct = document, St = () => ct.createComment(""), Mt = (e) => e === null || typeof e != "object" && typeof e != "function", Gt = Array.isArray, Me = (e) => Gt(e) || typeof (e == null ? void 0 : e[Symbol.iterator]) == "function", Ut = `[ 	
\f\r]`, yt = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ee = /-->/g, se = />/g, nt = RegExp(`>|${Ut}(?:([^\\s"'>=/]+)(${Ut}*=${Ut}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), ie = /'/g, oe = /"/g, he = /^(?:script|style|textarea|title)$/i, ue = (e) => (t, ...s) => ({ _$litType$: e, strings: t, values: s }), v = ue(1), O = ue(2), bt = Symbol.for("lit-noChange"), L = Symbol.for("lit-nothing"), re = /* @__PURE__ */ new WeakMap(), at = ct.createTreeWalker(ct, 129);
function ge(e, t) {
  if (!Gt(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return te !== void 0 ? te.createHTML(t) : t;
}
const Ce = (e, t) => {
  const s = e.length - 1, i = [];
  let o, r = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", n = yt;
  for (let a = 0; a < s; a++) {
    const l = e[a];
    let h, c, u = -1, p = 0;
    for (; p < l.length && (n.lastIndex = p, c = n.exec(l), c !== null); ) p = n.lastIndex, n === yt ? c[1] === "!--" ? n = ee : c[1] !== void 0 ? n = se : c[2] !== void 0 ? (he.test(c[2]) && (o = RegExp("</" + c[2], "g")), n = nt) : c[3] !== void 0 && (n = nt) : n === nt ? c[0] === ">" ? (n = o ?? yt, u = -1) : c[1] === void 0 ? u = -2 : (u = n.lastIndex - c[2].length, h = c[1], n = c[3] === void 0 ? nt : c[3] === '"' ? oe : ie) : n === oe || n === ie ? n = nt : n === ee || n === se ? n = yt : (n = nt, o = void 0);
    const g = n === nt && e[a + 1].startsWith("/>") ? " " : "";
    r += n === yt ? l + Se : u >= 0 ? (i.push(h), l.slice(0, u) + de + l.slice(u) + it + g) : l + it + (u === -2 ? a : g);
  }
  return [ge(e, r + (e[s] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class Ct {
  constructor({ strings: t, _$litType$: s }, i) {
    let o;
    this.parts = [];
    let r = 0, n = 0;
    const a = t.length - 1, l = this.parts, [h, c] = Ce(t, s);
    if (this.el = Ct.createElement(h, i), at.currentNode = this.el.content, s === 2 || s === 3) {
      const u = this.el.content.firstChild;
      u.replaceWith(...u.childNodes);
    }
    for (; (o = at.nextNode()) !== null && l.length < a; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const u of o.getAttributeNames()) if (u.endsWith(de)) {
          const p = c[n++], g = o.getAttribute(u).split(it), d = /([.?@])?(.*)/.exec(p);
          l.push({ type: 1, index: r, name: d[2], strings: g, ctor: d[1] === "." ? Pe : d[1] === "?" ? De : d[1] === "@" ? Te : At }), o.removeAttribute(u);
        } else u.startsWith(it) && (l.push({ type: 6, index: r }), o.removeAttribute(u));
        if (he.test(o.tagName)) {
          const u = o.textContent.split(it), p = u.length - 1;
          if (p > 0) {
            o.textContent = zt ? zt.emptyScript : "";
            for (let g = 0; g < p; g++) o.append(u[g], St()), at.nextNode(), l.push({ type: 2, index: ++r });
            o.append(u[p], St());
          }
        }
      } else if (o.nodeType === 8) if (o.data === pe) l.push({ type: 2, index: r });
      else {
        let u = -1;
        for (; (u = o.data.indexOf(it, u + 1)) !== -1; ) l.push({ type: 7, index: r }), u += it.length - 1;
      }
      r++;
    }
  }
  static createElement(t, s) {
    const i = ct.createElement("template");
    return i.innerHTML = t, i;
  }
}
function mt(e, t, s = e, i) {
  var n, a;
  if (t === bt) return t;
  let o = i !== void 0 ? (n = s._$Co) == null ? void 0 : n[i] : s._$Cl;
  const r = Mt(t) ? void 0 : t._$litDirective$;
  return (o == null ? void 0 : o.constructor) !== r && ((a = o == null ? void 0 : o._$AO) == null || a.call(o, !1), r === void 0 ? o = void 0 : (o = new r(e), o._$AT(e, s, i)), i !== void 0 ? (s._$Co ?? (s._$Co = []))[i] = o : s._$Cl = o), o !== void 0 && (t = mt(e, o._$AS(e, t.values), o, i)), t;
}
class _e {
  constructor(t, s) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = s;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: s }, parts: i } = this._$AD, o = ((t == null ? void 0 : t.creationScope) ?? ct).importNode(s, !0);
    at.currentNode = o;
    let r = at.nextNode(), n = 0, a = 0, l = i[0];
    for (; l !== void 0; ) {
      if (n === l.index) {
        let h;
        l.type === 2 ? h = new _t(r, r.nextSibling, this, t) : l.type === 1 ? h = new l.ctor(r, l.name, l.strings, this, t) : l.type === 6 && (h = new Ie(r, this, t)), this._$AV.push(h), l = i[++a];
      }
      n !== (l == null ? void 0 : l.index) && (r = at.nextNode(), n++);
    }
    return at.currentNode = ct, o;
  }
  p(t) {
    let s = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, s), s += i.strings.length - 2) : i._$AI(t[s])), s++;
  }
}
class _t {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, s, i, o) {
    this.type = 2, this._$AH = L, this._$AN = void 0, this._$AA = t, this._$AB = s, this._$AM = i, this.options = o, this._$Cv = (o == null ? void 0 : o.isConnected) ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const s = this._$AM;
    return s !== void 0 && (t == null ? void 0 : t.nodeType) === 11 && (t = s.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, s = this) {
    t = mt(this, t, s), Mt(t) ? t === L || t == null || t === "" ? (this._$AH !== L && this._$AR(), this._$AH = L) : t !== this._$AH && t !== bt && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Me(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== L && Mt(this._$AH) ? this._$AA.nextSibling.data = t : this.T(ct.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var r;
    const { values: s, _$litType$: i } = t, o = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = Ct.createElement(ge(i.h, i.h[0]), this.options)), i);
    if (((r = this._$AH) == null ? void 0 : r._$AD) === o) this._$AH.p(s);
    else {
      const n = new _e(o, this), a = n.u(this.options);
      n.p(s), this.T(a), this._$AH = n;
    }
  }
  _$AC(t) {
    let s = re.get(t.strings);
    return s === void 0 && re.set(t.strings, s = new Ct(t)), s;
  }
  k(t) {
    Gt(this._$AH) || (this._$AH = [], this._$AR());
    const s = this._$AH;
    let i, o = 0;
    for (const r of t) o === s.length ? s.push(i = new _t(this.O(St()), this.O(St()), this, this.options)) : i = s[o], i._$AI(r), o++;
    o < s.length && (this._$AR(i && i._$AB.nextSibling, o), s.length = o);
  }
  _$AR(t = this._$AA.nextSibling, s) {
    var i;
    for ((i = this._$AP) == null ? void 0 : i.call(this, !1, !0, s); t !== this._$AB; ) {
      const o = Qt(t).nextSibling;
      Qt(t).remove(), t = o;
    }
  }
  setConnected(t) {
    var s;
    this._$AM === void 0 && (this._$Cv = t, (s = this._$AP) == null || s.call(this, t));
  }
}
class At {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, s, i, o, r) {
    this.type = 1, this._$AH = L, this._$AN = void 0, this.element = t, this.name = s, this._$AM = o, this.options = r, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = L;
  }
  _$AI(t, s = this, i, o) {
    const r = this.strings;
    let n = !1;
    if (r === void 0) t = mt(this, t, s, 0), n = !Mt(t) || t !== this._$AH && t !== bt, n && (this._$AH = t);
    else {
      const a = t;
      let l, h;
      for (t = r[0], l = 0; l < r.length - 1; l++) h = mt(this, a[i + l], s, l), h === bt && (h = this._$AH[l]), n || (n = !Mt(h) || h !== this._$AH[l]), h === L ? t = L : t !== L && (t += (h ?? "") + r[l + 1]), this._$AH[l] = h;
    }
    n && !o && this.j(t);
  }
  j(t) {
    t === L ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Pe extends At {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === L ? void 0 : t;
  }
}
class De extends At {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== L);
  }
}
class Te extends At {
  constructor(t, s, i, o, r) {
    super(t, s, i, o, r), this.type = 5;
  }
  _$AI(t, s = this) {
    if ((t = mt(this, t, s, 0) ?? L) === bt) return;
    const i = this._$AH, o = t === L && i !== L || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, r = t !== L && (i === L || o);
    o && this.element.removeEventListener(this.name, this, i), r && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var s;
    typeof this._$AH == "function" ? this._$AH.call(((s = this.options) == null ? void 0 : s.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Ie {
  constructor(t, s, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = s, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    mt(this, t);
  }
}
const Bt = $t.litHtmlPolyfillSupport;
Bt == null || Bt(Ct, _t), ($t.litHtmlVersions ?? ($t.litHtmlVersions = [])).push("3.3.3");
const Ee = (e, t, s) => {
  const i = (s == null ? void 0 : s.renderBefore) ?? t;
  let o = i._$litPart$;
  if (o === void 0) {
    const r = (s == null ? void 0 : s.renderBefore) ?? null;
    i._$litPart$ = o = new _t(t.insertBefore(St(), r), r, void 0, s ?? {});
  }
  return o._$AI(e), o;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const lt = globalThis;
class H extends ft {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var s;
    const t = super.createRenderRoot();
    return (s = this.renderOptions).renderBefore ?? (s.renderBefore = t.firstChild), t;
  }
  update(t) {
    const s = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Ee(s, this.renderRoot, this.renderOptions);
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
    return bt;
  }
}
var le;
H._$litElement$ = !0, H.finalized = !0, (le = lt.litElementHydrateSupport) == null || le.call(lt, { LitElement: H });
const Ht = lt.litElementPolyfillSupport;
Ht == null || Ht({ LitElement: H });
(lt.litElementVersions ?? (lt.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const J = (e) => (t, s) => {
  s !== void 0 ? s.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const je = { attribute: !0, type: String, converter: jt, reflect: !1, hasChanged: Yt }, ze = (e = je, t, s) => {
  const { kind: i, metadata: o } = s;
  let r = globalThis.litPropertyMetadata.get(o);
  if (r === void 0 && globalThis.litPropertyMetadata.set(o, r = /* @__PURE__ */ new Map()), i === "setter" && ((e = Object.create(e)).wrapped = !0), r.set(s.name, e), i === "accessor") {
    const { name: n } = s;
    return { set(a) {
      const l = t.get.call(this);
      t.set.call(this, a), this.requestUpdate(n, l, e, !0, a);
    }, init(a) {
      return a !== void 0 && this.C(n, void 0, e, a), a;
    } };
  }
  if (i === "setter") {
    const { name: n } = s;
    return function(a) {
      const l = this[n];
      t.call(this, a), this.requestUpdate(n, l, e, !0, a);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function P(e) {
  return (t, s) => typeof s == "object" ? ze(e, t, s) : ((i, o, r) => {
    const n = o.hasOwnProperty(r);
    return o.constructor.createProperty(r, i), n ? Object.getOwnPropertyDescriptor(o, r) : void 0;
  })(e, t, s);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function b(e) {
  return P({ ...e, state: !0, attribute: !1 });
}
const Ae = K`
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
  static snapPoint(t, s, i = [], o, r = 0.25) {
    let n = { ...t };
    if (s.snapToElements && i.length > 0) {
      let h = r, c = null;
      for (const u of i)
        for (const p of [u.start, u.end]) {
          const g = this.distance(t, p);
          g < h && (h = g, c = p);
        }
      if (c)
        return {
          point: { x: c.x, y: c.y },
          snappedTo: "vertex"
        };
    }
    let a = !1, l;
    if (s.snapToAngles && o) {
      const h = t.x - o.x, c = t.y - o.y, u = Math.sqrt(h * h + c * c);
      if (u > 0.05) {
        let g = Math.atan2(c, h) * 180 / Math.PI;
        g < 0 && (g += 360);
        const d = 45, f = Math.round(g / d) * d;
        if (Math.abs(g - f) <= 6) {
          const x = f * Math.PI / 180;
          n = {
            x: o.x + u * Math.cos(x),
            y: o.y + u * Math.sin(x)
          }, a = !0, l = f;
        }
      }
    }
    if (s.snapToGrid && !a) {
      const h = s.size || 0.5;
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
  static snapPointToWall(t, s, i = 0.6) {
    let o = null, r = i;
    for (const n of s) {
      const a = n.end.x - n.start.x, l = n.end.y - n.start.y, h = Math.sqrt(a * a + l * l);
      if (h === 0) continue;
      const c = Math.max(0, Math.min(
        1,
        ((t.x - n.start.x) * a + (t.y - n.start.y) * l) / (h * h)
      )), u = n.start.x + c * a, p = n.start.y + c * l, g = Math.sqrt((t.x - u) ** 2 + (t.y - p) ** 2);
      g < r && (r = g, o = {
        wall: n,
        projectionPoint: { x: u, y: p },
        offset: c * h,
        distance: g,
        angleRad: Math.atan2(l, a)
      });
    }
    return o;
  }
  static distance(t, s) {
    const i = t.x - s.x, o = t.y - s.y;
    return Math.sqrt(i * i + o * o);
  }
  static roundMeters(t, s = 2) {
    const i = Math.pow(10, s);
    return Math.round(t * i) / i;
  }
}
class Z {
  /**
   * Ray-casting algorithm to test if a 2D point is inside a polygon
   */
  static isPointInPolygon(t, s) {
    if (!s || s.length < 3) return !1;
    let i = !1;
    for (let o = 0, r = s.length - 1; o < s.length; r = o++) {
      const n = s[o].x, a = s[o].y, l = s[r].x, h = s[r].y;
      a > t.y != h > t.y && t.x < (l - n) * (t.y - a) / (h - a) + n && (i = !i);
    }
    return i;
  }
  /**
   * Finds the room containing the specified world point (if any)
   */
  static findRoomContainingPoint(t, s) {
    for (const i of s)
      if (this.isPointInPolygon(t, i.polygon))
        return i;
    return null;
  }
  /**
   * Calculates the centroid of a polygon
   */
  static calculateCentroid(t) {
    if (!t || t.length === 0) return { x: 0, y: 0 };
    let s = 0, i = 0;
    for (const o of t)
      s += o.x, i += o.y;
    return {
      x: s / t.length,
      y: i / t.length
    };
  }
  /**
   * Computes the geometric area (in m²) of a polygon using the Shoelace formula
   */
  static computeArea(t) {
    if (!t || t.length < 3) return 0;
    let s = 0;
    for (let i = 0; i < t.length; i++) {
      const o = (i + 1) % t.length;
      s += t[i].x * t[o].y, s -= t[o].x * t[i].y;
    }
    return Math.round(Math.abs(s / 2) * 100) / 100;
  }
}
var Oe = Object.defineProperty, Fe = Object.getOwnPropertyDescriptor, E = (e, t, s, i) => {
  for (var o = i > 1 ? void 0 : i ? Fe(t, s) : t, r = e.length - 1, n; r >= 0; r--)
    (n = e[r]) && (o = (i ? n(t, s, o) : n(o)) || o);
  return i && o && Oe(t, s, o), o;
};
let T = class extends H {
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
    }, this.isDashboardMode = !1, this.isMarqueeSelecting = !1, this.marqueeStart = null, this.marqueeCurrent = null, this.viewport = { x: 300, y: 300, zoom: 1 }, this.isPanning = !1, this.panStart = { x: 0, y: 0 }, this.drawingWallStart = null, this.previewPoint = null, this.snapInfo = { snappedTo: "none" }, this.cursorCoords = { x: 0, y: 0 }, this.wallSnap = null, this.openingFlipSide = !1, this.openingFlipDirection = !1, this.windowSashCount = 1, this.calibrateStart = null, this.calibrateCurrent = null, this.rescaleStart = null, this.rescaleCurrent = null, this._boundKeyDown = null, this.draggingBindingId = null, this.dragBindingMoved = !1, this.dragBindingStartPos = { x: 0, y: 0 }, this.orbitPitch = 55, this.orbitYaw = -35, this.isOrbiting = !1, this.orbitStart = { x: 0, y: 0 }, this.orbitStartPitch = 55, this.orbitStartYaw = -35;
  }
  setCameraPreset(e, t) {
    this.orbitPitch = e, this.orbitYaw = t, this.requestUpdate();
  }
  // ==========================================
  // CONVERSIONS DE COORDONNÉES
  // ==========================================
  screenToWorld(e, t) {
    const s = this.getBoundingClientRect(), i = e - s.left, o = t - s.top, r = this.project.pixelsPerMeter * this.viewport.zoom;
    return {
      x: (i - this.viewport.x) / r,
      y: (o - this.viewport.y) / r
    };
  }
  worldToScreen(e) {
    const t = this.project.pixelsPerMeter * this.viewport.zoom;
    return {
      x: e.x * t + this.viewport.x,
      y: e.y * t + this.viewport.y
    };
  }
  // ==========================================
  // GESTION DU PAN & ZOOM
  // ==========================================
  handleWheel(e) {
    e.preventDefault();
    const t = this.getBoundingClientRect(), s = e.clientX - t.left, i = e.clientY - t.top, o = e.deltaY < 0 ? 1.12 : 0.89, r = Math.min(Math.max(this.viewport.zoom * o, 0.15), 8), n = s - (s - this.viewport.x) * (r / this.viewport.zoom), a = i - (i - this.viewport.y) * (r / this.viewport.zoom);
    this.viewport = { x: n, y: a, zoom: r };
  }
  handlePointerDown(e) {
    var o, r, n, a, l, h, c, u, p, g, d, f, m, x, k, M, w, S;
    if (this.is3DMode) {
      if (e.button === 1 || e.button === 0 && e.shiftKey) {
        this.isPanning = !0, this.panStart = { x: e.clientX - this.viewport.x, y: e.clientY - this.viewport.y }, (r = (o = e.target).setPointerCapture) == null || r.call(o, e.pointerId);
        return;
      }
      if (e.button === 2 || e.button === 0 && e.altKey) {
        this.isOrbiting = !0, this.orbitStart = { x: e.clientX, y: e.clientY }, this.orbitStartPitch = this.orbitPitch, this.orbitStartYaw = this.orbitYaw, (a = (n = e.target).setPointerCapture) == null || a.call(n, e.pointerId);
        return;
      }
      if (e.button === 0 && !((h = (l = e.target) == null ? void 0 : l.closest) == null ? void 0 : h.call(l, ".wall-element, .wall-element-3d, .room-group, .entity-pin, .opening-element"))) {
        this.selectedElements = { wallIds: [], openingIds: [], roomIds: [], bindingIds: [] }, this.dispatchSelectionChanged(), this.isOrbiting = !0, this.orbitStart = { x: e.clientX, y: e.clientY }, this.orbitStartPitch = this.orbitPitch, this.orbitStartYaw = this.orbitYaw, (u = (c = e.target).setPointerCapture) == null || u.call(c, e.pointerId);
        return;
      }
      return;
    }
    if (e.button === 1) {
      this.isPanning = !0, this.panStart = { x: e.clientX - this.viewport.x, y: e.clientY - this.viewport.y }, (g = (p = e.target).setPointerCapture) == null || g.call(p, e.pointerId);
      return;
    }
    if (e.button !== 0) return;
    const t = e.target, s = !!((d = t == null ? void 0 : t.closest) != null && d.call(
      t,
      ".wall-element, .wall-element-3d, .room-group, .entity-pin, .opening-element, .dimension-badge, .hud-btn"
    ));
    if ((f = t == null ? void 0 : t.closest) != null && f.call(t, ".entity-pin"))
      return;
    if (this.activeTool === "select") {
      if (s)
        return;
      if (e.shiftKey) {
        const C = this.screenToWorld(e.clientX, e.clientY);
        this.isMarqueeSelecting = !0, this.marqueeStart = C, this.marqueeCurrent = C, (x = (m = e.target).setPointerCapture) == null || x.call(m, e.pointerId);
        return;
      }
      this.selectedElements = { wallIds: [], openingIds: [], roomIds: [], bindingIds: [] }, this.dispatchSelectionChanged(), this.isPanning = !0, this.panStart = { x: e.clientX - this.viewport.x, y: e.clientY - this.viewport.y }, (M = (k = e.target).setPointerCapture) == null || M.call(k, e.pointerId);
      return;
    }
    if (e.shiftKey) {
      this.isPanning = !0, this.panStart = { x: e.clientX - this.viewport.x, y: e.clientY - this.viewport.y }, (S = (w = e.target).setPointerCapture) == null || S.call(w, e.pointerId);
      return;
    }
    const i = this.screenToWorld(e.clientX, e.clientY);
    if (this.activeTool === "wall") {
      const C = y.snapPoint(
        i,
        this.project.grid,
        this.project.walls,
        this.drawingWallStart || void 0
      );
      if (!this.drawingWallStart)
        this.drawingWallStart = C.point;
      else {
        const $ = this.drawingWallStart, _ = C.point;
        if (y.distance($, _) >= 0.15) {
          const I = {
            id: `wall_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
            start: { ...$ },
            end: { ..._ },
            thickness: this.currentWallThickness,
            type: "standard"
          };
          this.project = {
            ...this.project,
            walls: [...this.project.walls, I]
          }, this.dispatchProjectChanged(), this.drawingWallStart = _;
        }
      }
    } else if (this.activeTool === "door" || this.activeTool === "window" || this.activeTool === "french_window") {
      if (this.wallSnap) {
        const C = this.activeTool === "window" ? "window" : this.activeTool === "french_window" ? "french_window" : "door", $ = C === "door" ? 0.9 : C === "french_window" ? 2 : this.windowSashCount === 2 ? 1.4 : 0.9, _ = {
          id: `op_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
          wallId: this.wallSnap.wall.id,
          type: C,
          offset: y.roundMeters(this.wallSnap.offset),
          width: this.currentOpeningWidth || $,
          flipSide: this.openingFlipSide,
          flipDirection: this.openingFlipDirection,
          sashCount: C === "window" ? this.windowSashCount || 1 : C === "french_window" ? 2 : 1
        };
        this.project = {
          ...this.project,
          openings: [...this.project.openings, _]
        }, this.dispatchProjectChanged();
      }
    } else if (this.activeTool === "calibrate") {
      const C = this.getBoundingClientRect(), $ = { x: e.clientX - C.left, y: e.clientY - C.top };
      if (!this.calibrateStart)
        this.calibrateStart = $, this.calibrateCurrent = $;
      else {
        const _ = $.x - this.calibrateStart.x, D = $.y - this.calibrateStart.y, I = Math.sqrt(_ * _ + D * D);
        if (I >= 10) {
          const B = I / this.viewport.zoom;
          this.dispatchEvent(new CustomEvent("request-calibration", {
            detail: {
              pixelDistance: B,
              defaultMeters: y.roundMeters(B / this.project.pixelsPerMeter)
            },
            bubbles: !0,
            composed: !0
          })), this.calibrateStart = null, this.calibrateCurrent = null;
        }
      }
    } else if (this.activeTool === "rescale") {
      const C = this.screenToWorld(e.clientX, e.clientY);
      let $ = y.snapPoint(
        C,
        this.project.grid,
        this.project.walls,
        this.rescaleStart || void 0
      );
      if ($.snappedTo === "none" && this.project.walls.length > 0) {
        const _ = y.snapPointToWall(C, this.project.walls, 0.6);
        _ && ($ = { point: _.projectionPoint, snappedTo: "vertex" });
      }
      if (!this.rescaleStart)
        this.rescaleStart = $.point, this.rescaleCurrent = $.point;
      else {
        const _ = this.rescaleStart, D = $.point, I = y.distance(_, D);
        I >= 0.05 && (this.dispatchEvent(new CustomEvent("request-rescale", {
          detail: {
            measuredMeters: y.roundMeters(I)
          },
          bubbles: !0,
          composed: !0
        })), this.rescaleStart = null, this.rescaleCurrent = null, this.previewPoint = null);
      }
    }
  }
  handlePointerMove(e) {
    if (this.isOrbiting) {
      const s = e.clientX - this.orbitStart.x, i = e.clientY - this.orbitStart.y;
      this.orbitYaw = (this.orbitStartYaw + s * 0.55) % 360, this.orbitPitch = Math.max(15, Math.min(85, this.orbitStartPitch - i * 0.38)), this.requestUpdate();
      return;
    }
    if (this.draggingBindingId) {
      if (Math.hypot(e.clientX - this.dragBindingStartPos.x, e.clientY - this.dragBindingStartPos.y) > 3) {
        this.dragBindingMoved = !0;
        const i = this.screenToWorld(e.clientX, e.clientY), o = Z.findRoomContainingPoint(i, this.project.rooms), r = this.project.bindings.map((n) => n.id === this.draggingBindingId ? {
          ...n,
          position: {
            x: y.roundMeters(i.x),
            y: y.roundMeters(i.y)
          },
          roomId: o == null ? void 0 : o.id
        } : n);
        this.project = { ...this.project, bindings: r }, this.requestUpdate();
      }
      return;
    }
    if (this.isMarqueeSelecting && this.marqueeStart) {
      this.marqueeCurrent = this.screenToWorld(e.clientX, e.clientY), this.requestUpdate();
      return;
    }
    if (this.isPanning) {
      this.viewport = {
        ...this.viewport,
        x: e.clientX - this.panStart.x,
        y: e.clientY - this.panStart.y
      };
      return;
    }
    const t = this.screenToWorld(e.clientX, e.clientY);
    if (this.cursorCoords = {
      x: y.roundMeters(t.x),
      y: y.roundMeters(t.y)
    }, this.activeTool === "wall") {
      const s = y.snapPoint(
        t,
        this.project.grid,
        this.project.walls,
        this.drawingWallStart || void 0
      );
      this.previewPoint = s.point, this.snapInfo = { snappedTo: s.snappedTo, guideAngle: s.guideAngle }, this.wallSnap = null;
    } else if (this.activeTool === "door" || this.activeTool === "window" || this.activeTool === "french_window")
      this.wallSnap = y.snapPointToWall(t, this.project.walls, 0.8), this.previewPoint = null;
    else if (this.activeTool === "calibrate" && this.calibrateStart) {
      const s = this.getBoundingClientRect();
      this.calibrateCurrent = { x: e.clientX - s.left, y: e.clientY - s.top };
    } else if (this.activeTool === "rescale") {
      let s = y.snapPoint(
        t,
        this.project.grid,
        this.project.walls,
        this.rescaleStart || void 0
      );
      if (s.snappedTo === "none" && this.project.walls.length > 0) {
        const i = y.snapPointToWall(t, this.project.walls, 0.6);
        i && (s = { point: i.projectionPoint, snappedTo: "vertex" });
      }
      this.previewPoint = s.point, this.snapInfo = { snappedTo: s.snappedTo, guideAngle: s.guideAngle }, this.wallSnap = null, this.rescaleStart && (this.rescaleCurrent = s.point);
    } else
      this.previewPoint = null, this.wallSnap = null;
  }
  handlePointerUp(e) {
    var t, s, i, o, r, n, a, l;
    if (this.draggingBindingId) {
      const h = this.dragBindingMoved;
      this.draggingBindingId = null, this.dragBindingMoved = !1;
      try {
        (s = (t = e.target).releasePointerCapture) == null || s.call(t, e.pointerId);
      } catch {
      }
      if (h) {
        this.dispatchProjectChanged();
        return;
      }
    }
    if (this.isOrbiting) {
      this.isOrbiting = !1, (o = (i = e.target).releasePointerCapture) == null || o.call(i, e.pointerId);
      return;
    }
    if (this.isMarqueeSelecting && this.marqueeStart && this.marqueeCurrent) {
      const h = Math.min(this.marqueeStart.x, this.marqueeCurrent.x), c = Math.max(this.marqueeStart.x, this.marqueeCurrent.x), u = Math.min(this.marqueeStart.y, this.marqueeCurrent.y), p = Math.max(this.marqueeStart.y, this.marqueeCurrent.y);
      if (c - h > 0.05 || p - u > 0.05) {
        const g = this.project.walls.filter((x) => {
          const k = (x.start.x + x.end.x) / 2, M = (x.start.y + x.end.y) / 2;
          return k >= h && k <= c && M >= u && M <= p;
        }).map((x) => x.id), d = this.project.openings.filter((x) => {
          const k = this.project.walls.find((_) => _.id === x.wallId);
          if (!k) return !1;
          const M = k.end.x - k.start.x, w = k.end.y - k.start.y, S = Math.sqrt(M * M + w * w);
          if (S === 0) return !1;
          const C = k.start.x + x.offset / S * M, $ = k.start.y + x.offset / S * w;
          return C >= h && C <= c && $ >= u && $ <= p;
        }).map((x) => x.id), f = this.project.rooms.filter((x) => {
          if (!x.polygon || x.polygon.length < 3) return !1;
          const k = Z.calculateCentroid(x.polygon);
          return k.x >= h && k.x <= c && k.y >= u && k.y <= p;
        }).map((x) => x.id), m = this.project.bindings.filter((x) => x.position.x >= h && x.position.x <= c && x.position.y >= u && x.position.y <= p).map((x) => x.id);
        this.selectedElements = {
          wallIds: Array.from(/* @__PURE__ */ new Set([...this.selectedElements.wallIds, ...g])),
          openingIds: Array.from(/* @__PURE__ */ new Set([...this.selectedElements.openingIds, ...d])),
          roomIds: Array.from(/* @__PURE__ */ new Set([...this.selectedElements.roomIds, ...f])),
          bindingIds: Array.from(/* @__PURE__ */ new Set([...this.selectedElements.bindingIds, ...m]))
        }, this.dispatchSelectionChanged();
      }
      this.isMarqueeSelecting = !1, this.marqueeStart = null, this.marqueeCurrent = null, (n = (r = e.target).releasePointerCapture) == null || n.call(r, e.pointerId);
      return;
    }
    this.isPanning && (this.isPanning = !1, (l = (a = e.target).releasePointerCapture) == null || l.call(a, e.pointerId));
  }
  // ==========================================
  // DRAG & DROP ENTITÉS HOME ASSISTANT
  // ==========================================
  handleDragOver(e) {
    e.preventDefault(), e.dataTransfer && (e.dataTransfer.dropEffect = "copy");
  }
  handleDrop(e) {
    var s, i;
    if (e.preventDefault(), (s = e.dataTransfer) != null && s.files && e.dataTransfer.files.length > 0) {
      const o = e.dataTransfer.files[0];
      if (o.type.startsWith("image/") || o.name.toLowerCase().endsWith(".svg")) {
        const r = new FileReader();
        r.onload = (n) => {
          var l;
          const a = (l = n.target) == null ? void 0 : l.result;
          this.dispatchEvent(new CustomEvent("background-image-loaded", {
            detail: { dataUrl: a },
            bubbles: !0,
            composed: !0
          }));
        }, r.readAsDataURL(o);
        return;
      }
    }
    const t = (i = e.dataTransfer) == null ? void 0 : i.getData("application/json");
    if (t)
      try {
        const { entityId: o, domain: r, name: n, icon: a } = JSON.parse(t), l = this.screenToWorld(e.clientX, e.clientY), h = Z.findRoomContainingPoint(l, this.project.rooms), c = {
          id: `bind_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
          entityId: o,
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
  handleWallClick(e, t) {
    if (this.activeTool !== "select") return;
    e.stopPropagation();
    const s = e.shiftKey || e.ctrlKey || e.metaKey, i = this.selectedElements.wallIds.includes(t.id);
    if (s) {
      const o = i ? this.selectedElements.wallIds.filter((r) => r !== t.id) : [...this.selectedElements.wallIds, t.id];
      this.selectedElements = { ...this.selectedElements, wallIds: o };
    } else
      this.selectedElements = { wallIds: [t.id], openingIds: [], roomIds: [], bindingIds: [] };
    this.dispatchSelectionChanged();
  }
  handleOpeningClick(e, t) {
    if (this.activeTool !== "select") return;
    e.stopPropagation();
    const s = e.shiftKey || e.ctrlKey || e.metaKey, i = this.selectedElements.openingIds.includes(t.id);
    if (s) {
      const o = i ? this.selectedElements.openingIds.filter((r) => r !== t.id) : [...this.selectedElements.openingIds, t.id];
      this.selectedElements = { ...this.selectedElements, openingIds: o };
    } else
      this.selectedElements = { wallIds: [], openingIds: [t.id], roomIds: [], bindingIds: [] };
    this.dispatchSelectionChanged();
  }
  renderMarqueeBox() {
    if (!this.isMarqueeSelecting || !this.marqueeStart || !this.marqueeCurrent) return null;
    const e = this.worldToScreen(this.marqueeStart), t = this.worldToScreen(this.marqueeCurrent), s = Math.min(e.x, t.x), i = Math.min(e.y, t.y), o = Math.abs(e.x - t.x), r = Math.abs(e.y - t.y);
    return O`
      <rect 
        class="marquee-selection-box"
        x="${s}" 
        y="${i}" 
        width="${o}" 
        height="${r}" 
      />
    `;
  }
  handleEntityPointerDown(e, t) {
    var s, i;
    if (!this.isDashboardMode && t.button === 0) {
      if (t.stopPropagation(), this.draggingBindingId = e.id, this.dragBindingMoved = !1, this.dragBindingStartPos = { x: t.clientX, y: t.clientY }, this.activeTool === "select") {
        const o = t, r = o.shiftKey || o.ctrlKey || o.metaKey, n = this.selectedElements.bindingIds.includes(e.id);
        if (r) {
          const a = n ? this.selectedElements.bindingIds.filter((l) => l !== e.id) : [...this.selectedElements.bindingIds, e.id];
          this.selectedElements = { ...this.selectedElements, bindingIds: a };
        } else n || (this.selectedElements = { wallIds: [], openingIds: [], roomIds: [], bindingIds: [e.id] });
        this.dispatchSelectionChanged();
      }
      (i = (s = t.currentTarget) == null ? void 0 : s.setPointerCapture) == null || i.call(s, t.pointerId);
    }
  }
  handleEntityClick(e, t) {
    if (t.stopPropagation(), !this.dragBindingMoved) {
      if (this.isDashboardMode) {
        const s = e.entityId.split(".")[0];
        if (e.tapAction === "more-info" || s !== "light" && s !== "switch") {
          this.dispatchEvent(new CustomEvent("hass-more-info", {
            detail: { entityId: e.entityId },
            bubbles: !0,
            composed: !0
          }));
          return;
        }
        this.hass && this.hass.callService && this.hass.callService(s, "toggle", { entity_id: e.entityId }).catch(() => {
          this.hass.callService("homeassistant", "toggle", { entity_id: e.entityId });
        });
        return;
      }
      if (this.activeTool === "select") {
        const s = t, i = s.shiftKey || s.ctrlKey || s.metaKey, o = this.selectedElements.bindingIds.includes(e.id);
        if (i) {
          const r = o ? this.selectedElements.bindingIds.filter((n) => n !== e.id) : [...this.selectedElements.bindingIds, e.id];
          this.selectedElements = { ...this.selectedElements, bindingIds: r };
        } else
          this.selectedElements = { wallIds: [], openingIds: [], roomIds: [], bindingIds: [e.id] };
        this.dispatchSelectionChanged();
        return;
      }
      if (this.hass && this.hass.callService) {
        const s = e.entityId.split(".")[0];
        this.hass.callService(s, "toggle", { entity_id: e.entityId }).catch(() => {
          this.hass.callService("homeassistant", "toggle", { entity_id: e.entityId });
        });
      } else
        console.log(`[Demo Standalone] Toggle entité: ${e.entityId}`);
    }
  }
  handleEntityDblClick(e, t) {
    t.stopPropagation(), this.dispatchEvent(new CustomEvent("hass-more-info", {
      detail: { entityId: e.entityId },
      bubbles: !0,
      composed: !0
    }));
  }
  handleKeyDown(e) {
    e.key === "Escape" ? (this.drawingWallStart = null, this.previewPoint = null, this.calibrateStart = null, this.calibrateCurrent = null, this.rescaleStart = null, this.rescaleCurrent = null, this.wallSnap = null, this.selectedElements = { wallIds: [], openingIds: [], roomIds: [], bindingIds: [] }, this.dispatchSelectionChanged(), this.requestUpdate()) : e.key === " " || e.key === "Spacebar" ? this.wallSnap && (e.preventDefault(), this.openingFlipSide = !this.openingFlipSide, this.requestUpdate()) : e.key.toLowerCase() === "f" && this.wallSnap && (this.openingFlipDirection = !this.openingFlipDirection, this.requestUpdate());
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
  computeWallPolygon(e, t, s) {
    const i = t.x - e.x, o = t.y - e.y, r = Math.sqrt(i * i + o * o);
    if (r === 0) return [e, e, t, t];
    const n = s / 2, a = -o / r * n, l = i / r * n;
    return [
      { x: e.x + a, y: e.y + l },
      { x: t.x + a, y: t.y + l },
      { x: t.x - a, y: t.y - l },
      { x: e.x - a, y: e.y - l }
    ];
  }
  renderBackgroundLayer() {
    const e = this.project.background;
    if (!e || !e.imageUrl || !e.visible) return null;
    const t = this.worldToScreen(e.offset || { x: 0, y: 0 }), s = e.scale || 1;
    return O`
      <g 
        class="background-image-layer" 
        transform="translate(${t.x}, ${t.y}) scale(${this.viewport.zoom * s})"
        style="opacity: ${e.opacity};"
      >
        <image 
          href="${e.imageUrl}" 
          x="0" 
          y="0" 
          width="${e.widthPx || 1200}" 
          height="${e.heightPx || 900}" 
        />
      </g>
    `;
  }
  pointToSegmentDistance(e, t, s) {
    const i = s.x - t.x, o = s.y - t.y, r = i * i + o * o;
    if (r === 0) return y.distance(e, t);
    let n = ((e.x - t.x) * i + (e.y - t.y) * o) / r;
    n = Math.max(0, Math.min(1, n));
    const a = { x: t.x + n * i, y: t.y + n * o };
    return y.distance(e, a);
  }
  getWallHeight(e) {
    const t = this.project.defaultCeilingHeight || 2.5, s = {
      x: (e.start.x + e.end.x) / 2,
      y: (e.start.y + e.end.y) / 2
    }, i = (this.project.rooms || []).filter((o) => {
      if (!o.polygon || o.polygon.length < 3) return !1;
      if (Z.isPointInPolygon(s, o.polygon)) return !0;
      for (let r = 0; r < o.polygon.length; r++) {
        const n = o.polygon[r], a = o.polygon[(r + 1) % o.polygon.length];
        if (this.pointToSegmentDistance(s, n, a) <= e.thickness / 2 + 0.35)
          return !0;
      }
      return !1;
    });
    if (i.length > 0) {
      const o = i.map((r) => r.height || t);
      return Math.max(...o, e.height || 0);
    }
    return e.height || t;
  }
  handleRoomClick(e, t) {
    if (!(this.drawingWallStart || this.calibrateStart || this.rescaleStart)) {
      if (e.stopPropagation(), this.activeTool === "select") {
        const s = e.shiftKey || e.ctrlKey || e.metaKey, i = this.selectedElements.roomIds.includes(t.id);
        if (s) {
          const o = i ? this.selectedElements.roomIds.filter((r) => r !== t.id) : [...this.selectedElements.roomIds, t.id];
          this.selectedElements = { ...this.selectedElements, roomIds: o };
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
  handleRoomDblClick(e, t) {
    e.stopPropagation(), this.dispatchEvent(new CustomEvent("room-selected", {
      detail: { room: t },
      bubbles: !0,
      composed: !0
    }));
  }
  // Rendu des Pièces avec détection d'illumination si lumière allumée
  renderRooms() {
    return this.project.rooms.map((e) => {
      var l, h;
      if (!e.polygon || e.polygon.length < 3) return null;
      const t = e.polygon.map((c) => this.worldToScreen(c)), s = t.map((c) => `${c.x},${c.y}`).join(" "), i = this.project.bindings.filter((c) => c.roomId === e.id && c.entityId.startsWith("light.")).some((c) => {
        var p, g, d;
        return ((d = (g = (p = this.hass) == null ? void 0 : p.states) == null ? void 0 : g[c.entityId]) == null ? void 0 : d.state) === "on";
      }), o = Z.calculateCentroid(t), r = e.height || this.project.defaultCeilingHeight || 2.5, n = (e.areaM2 * r).toFixed(1), a = (h = (l = this.selectedElements) == null ? void 0 : l.roomIds) == null ? void 0 : h.includes(e.id);
      return O`
        <g 
          class="room-group ${a ? "selected" : ""}" 
          data-room-id="${e.id}" 
          @click=${(c) => this.handleRoomClick(c, e)}
          @dblclick=${(c) => this.handleRoomDblClick(c, e)}
        >
          <polygon 
            points="${s}" 
            class="room-polygon ${i ? "illuminated" : ""}"
            style="fill: ${e.color || "rgba(56, 189, 248, 0.12)"}; cursor: pointer;"
          />
          ${this.is3DMode ? O`
            <g class="room-3d-badge-group" transform="translate(${o.x}, ${o.y})">
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
                ${e.name}
              </text>
              <text class="room-label-area" y="6" style="font-size: 11px; font-weight: 700; fill: #38bdf8; text-anchor: middle; font-family: ui-monospace, SFMono-Regular, monospace;">
                ${e.areaM2.toFixed(1)} m²
              </text>
              <text class="room-label-height" y="21" style="font-size: 9.5px; font-weight: 600; fill: #a5f3fc; text-anchor: middle; font-family: ui-monospace, SFMono-Regular, monospace;">
                H: ${r.toFixed(2)}m · ${n} m³
              </text>
            </g>
          ` : O`
            <g class="room-label-group" transform="translate(${o.x}, ${o.y})">
              <text class="room-label-name" y="-6">${e.name}</text>
              <text class="room-label-area" y="12">${e.areaM2.toFixed(1)} m²</text>
            </g>
          `}
        </g>
      `;
    });
  }
  renderGrid() {
    if (this.is3DMode)
      return O`
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
    const e = this.project.pixelsPerMeter * this.viewport.zoom, s = (this.project.grid.size || 0.5) * e;
    if (s < 12) return null;
    const i = s * 2;
    return O`
      <defs>
        <pattern id="grid-sub" width="${s}" height="${s}" patternUnits="userSpaceOnUse"
          patternTransform="translate(${this.viewport.x % s}, ${this.viewport.y % s})">
          <line x1="0" y1="0" x2="${s}" y2="0" stroke="rgba(255,255,255,0.06)" stroke-width="0.5" />
          <line x1="0" y1="0" x2="0" y2="${s}" stroke="rgba(255,255,255,0.06)" stroke-width="0.5" />
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
    const e = this.project.pixelsPerMeter * this.viewport.zoom;
    return this.project.walls.map((t) => {
      var p, g;
      const s = (g = (p = this.selectedElements) == null ? void 0 : p.wallIds) == null ? void 0 : g.includes(t.id), i = this.getWallHeight(t), o = this.is3DMode ? i * e * 0.55 : 0, n = this.computeWallPolygon(t.start, t.end, t.thickness).map((d) => this.worldToScreen(d)), a = this.worldToScreen(t.start), l = this.worldToScreen(t.end), h = n.map((d) => `${d.x},${d.y}`).join(" "), c = y.distance(t.start, t.end), u = {
        x: (a.x + l.x) / 2,
        y: (a.y + l.y) / 2
      };
      if (this.is3DMode) {
        const d = n.map((M) => ({ x: M.x, y: M.y - o })), f = d.map((M) => `${M.x},${M.y}`).join(" "), m = [0, 1, 2, 3].map((M) => {
          const w = (M + 1) % 4, S = n[M], C = n[w], $ = d[w], _ = d[M], D = C.x - S.x, I = C.y - S.y, B = Math.sqrt(D * D + I * I) || 1, gt = -I / B, It = D / B, R = Math.max(-1, Math.min(1, gt * -0.7 + It * -0.7)), W = Math.round(s ? 42 + R * 14 : 34 + R * 16), j = s ? `hsl(192, 85%, ${W}%)` : `hsl(215, 22%, ${W}%)`, z = s ? "#38bdf8" : `hsl(215, 22%, ${W + 6}%)`;
          return {
            pts: `${S.x},${S.y} ${C.x},${C.y} ${$.x},${$.y} ${_.x},${_.y}`,
            fill: j,
            stroke: z
          };
        }), x = s ? "#06b6d4" : "#f1f5f9", k = s ? "#22d3ee" : "#94a3b8";
        return O`
          <g 
            class="wall-element-3d ${s ? "selected" : ""}" 
            data-wall-id="${t.id}"
            @click=${(M) => this.handleWallClick(M, t)}
            style="cursor: pointer;"
          >
            <!-- 4 parois verticales solides -->
            ${m.map((M) => O`
              <polygon points="${M.pts}" style="fill: ${M.fill}; stroke: ${M.stroke}; stroke-width: 0.8; stroke-linejoin: round;" />
            `)}
            <!-- Chapeau supérieur du mur -->
            <polygon points="${f}" style="fill: ${x}; stroke: ${k}; stroke-width: 1.2; stroke-linejoin: round;" />
          </g>
        `;
      }
      return O`
        <g 
          class="wall-element ${s ? "selected" : ""}" 
          data-wall-id="${t.id}"
          @click=${(d) => this.handleWallClick(d, t)}
        >
          <polygon points="${h}" class="wall-rect" />
          <line x1="${a.x}" y1="${a.y}" x2="${l.x}" y2="${l.y}" class="wall-centerline" />
          
          ${c >= 0.6 ? O`
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
    return this.project.openings.map((e) => {
      var d, f;
      const t = (f = (d = this.selectedElements) == null ? void 0 : d.openingIds) == null ? void 0 : f.includes(e.id), s = this.project.walls.find((m) => m.id === e.wallId);
      if (!s) return null;
      const i = s.end.x - s.start.x, o = s.end.y - s.start.y, r = Math.sqrt(i * i + o * o);
      if (r === 0) return null;
      const a = Math.atan2(o, i) * 180 / Math.PI, l = s.start.x + e.offset / r * i, h = s.start.y + e.offset / r * o, c = this.worldToScreen({ x: l, y: h }), u = this.project.pixelsPerMeter * this.viewport.zoom, p = e.width * u, g = s.thickness * u;
      return O`
        <g 
          class="opening-element ${t ? "selected" : ""}" 
          transform="translate(${c.x}, ${c.y}) rotate(${a})"
          style="cursor: pointer;"
          @click=${(m) => this.handleOpeningClick(m, e)}
        >
          <rect 
            x="${-p / 2}" 
            y="${-g / 2 - 1}" 
            width="${p}" 
            height="${g + 2}" 
            class="wall-cutout"
          />

          ${e.type === "door" ? this.renderDoorSymbol(p, g, e.flipSide, e.flipDirection) : null}
          ${e.type === "window" ? this.renderWindowSymbol(p, g, e.sashCount || (e.width >= 1.25 ? 2 : 1)) : null}
          ${e.type === "french_window" ? this.renderFrenchWindowSymbol(p, g) : null}
        </g>
      `;
    });
  }
  renderDoorSymbol(e, t, s, i) {
    const o = e / 2, r = s ? -1 : 1, n = i ? o : -o, a = i ? -1 : 1;
    return O`
      <g>
        <rect x="${-o}" y="${-t / 2}" width="4" height="${t}" fill="#94a3b8" />
        <rect x="${o - 4}" y="${-t / 2}" width="4" height="${t}" fill="#94a3b8" />
        <line 
          x1="${n}" 
          y1="0" 
          x2="${n}" 
          y2="${r * e}" 
          class="opening-door-leaf" 
        />
        <path 
          d="M ${n + a * e} 0 A ${e} ${e} 0 0 ${r > 0 ? i ? 0 : 1 : i ? 1 : 0} ${n} ${r * e}" 
          class="opening-door-arc" 
        />
      </g>
    `;
  }
  renderWindowSymbol(e, t, s = 1) {
    const i = e / 2;
    return s === 2 ? O`
        <g>
          <rect x="${-i}" y="${-t / 2}" width="${e}" height="${t}" fill="none" class="opening-window-frame" />
          <line x1="${-i}" y1="0" x2="${i}" y2="0" class="opening-window-glass" />
          <line x1="0" y1="${-t / 2}" x2="0" y2="${t / 2}" stroke="#38bdf8" stroke-width="2.5" />
          <line x1="${-i + 4}" y1="${-t / 4}" x2="-3" y2="${-t / 4}" stroke="rgba(56, 189, 248, 0.45)" stroke-width="1.2" />
          <line x1="3" y1="${t / 4}" x2="${i - 4}" y2="${t / 4}" stroke="rgba(56, 189, 248, 0.45)" stroke-width="1.2" />
        </g>
      ` : O`
      <g>
        <rect x="${-i}" y="${-t / 2}" width="${e}" height="${t}" fill="none" class="opening-window-frame" />
        <line x1="${-i}" y1="0" x2="${i}" y2="0" class="opening-window-glass" />
        <line x1="${-i + 4}" y1="${-t / 4}" x2="${i - 4}" y2="${-t / 4}" stroke="rgba(56, 189, 248, 0.4)" stroke-width="1" />
        <line x1="${-i + 4}" y1="${t / 4}" x2="${i - 4}" y2="${t / 4}" stroke="rgba(56, 189, 248, 0.4)" stroke-width="1" />
      </g>
    `;
  }
  renderFrenchWindowSymbol(e, t) {
    const s = e / 2;
    return O`
      <g>
        <rect x="${-s}" y="${-t / 2}" width="${e}" height="${t}" fill="none" class="opening-window-frame" />
        <rect x="${-s}" y="${-t / 4}" width="${s}" height="3" fill="#38bdf8" />
        <rect x="0" y="${t / 4}" width="${s}" height="3" fill="#38bdf8" />
      </g>
    `;
  }
  // ==========================================
  // RENDU DES PINS D'ENTITÉS HOME ASSISTANT
  // ==========================================
  renderEntityBindings() {
    return this.project.bindings.map((e) => {
      var h, c, u, p, g;
      const t = this.worldToScreen(e.position), s = (c = (h = this.hass) == null ? void 0 : h.states) == null ? void 0 : c[e.entityId], i = (s == null ? void 0 : s.state) || "off", o = e.entityId.startsWith("light.") && i === "on", r = e.entityId.startsWith("binary_sensor.") && (i === "on" || i === "detected"), n = e.entityId.startsWith("sensor.") || e.entityId.startsWith("climate."), a = ((u = s == null ? void 0 : s.attributes) == null ? void 0 : u.unit_of_measurement) || (n ? "°" : ""), l = (g = (p = this.selectedElements) == null ? void 0 : p.bindingIds) == null ? void 0 : g.includes(e.id);
      return O`
        <g 
          class="entity-pin ${l ? "selected" : ""} ${o ? "active-light" : ""} ${r ? "active-radar" : ""}"
          transform="translate(${t.x}, ${t.y})"
          @pointerdown=${(d) => this.handleEntityPointerDown(e, d)}
          @click=${(d) => this.handleEntityClick(e, d)}
          @dblclick=${(d) => this.handleEntityDblClick(e, d)}
          title="${e.customName || e.entityId} : ${i} (Clic pour basculer)"
        >
          <!-- Onde radar animée si mouvement détecté -->
          ${r ? O`<circle cx="0" cy="0" r="16" class="radar-pulse-ring" />` : null}

          <!-- Pastille de fond -->
          <circle cx="0" cy="0" r="16" class="entity-pin-bg" />

          <!-- Pictogramme -->
          <text x="0" y="0" class="entity-pin-icon">
            ${e.icon || "⚡"}
          </text>

          <!-- Étiquette Nom -->
          <text x="0" y="27" class="entity-pin-label">
            ${e.customName || e.entityId.split(".")[1]}
          </text>

          <!-- Badge Valeur (Thermostat / Capteur) -->
          ${n && i !== "unknown" ? O`
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
    const e = this.project.pixelsPerMeter * this.viewport.zoom, t = (this.currentOpeningWidth || 0.9) * e, s = this.wallSnap.wall.thickness * e, i = this.worldToScreen(this.wallSnap.projectionPoint), o = this.wallSnap.angleRad * 180 / Math.PI;
    return O`
      <g 
        class="opening-preview" 
        transform="translate(${i.x}, ${i.y}) rotate(${o})"
      >
        <rect x="${-t / 2}" y="${-s / 2}" width="${t}" height="${s}" fill="rgba(56, 189, 248, 0.3)" stroke="#38bdf8" stroke-dasharray="4, 2" />
        ${this.activeTool === "door" ? this.renderDoorSymbol(t, s, this.openingFlipSide, this.openingFlipDirection) : null}
        ${this.activeTool === "window" ? this.renderWindowSymbol(t, s) : null}
        ${this.activeTool === "french_window" ? this.renderFrenchWindowSymbol(t, s) : null}
      </g>
    `;
  }
  renderPreviewWall() {
    if (!this.drawingWallStart || !this.previewPoint) return null;
    const t = this.computeWallPolygon(
      this.drawingWallStart,
      this.previewPoint,
      this.currentWallThickness
    ).map((a) => this.worldToScreen(a)), s = this.worldToScreen(this.drawingWallStart), i = this.worldToScreen(this.previewPoint), o = t.map((a) => `${a.x},${a.y}`).join(" "), r = y.distance(this.drawingWallStart, this.previewPoint), n = {
      x: (s.x + i.x) / 2,
      y: (s.y + i.y) / 2
    };
    return O`
      <g class="preview-wall-group">
        <polygon points="${o}" class="preview-wall-rect" />
        <line x1="${s.x}" y1="${s.y}" x2="${i.x}" y2="${i.y}" class="preview-wall-line" />

        ${this.snapInfo.guideAngle !== void 0 ? O`
          <line x1="${s.x}" y1="${s.y}" x2="${i.x}" y2="${i.y}" class="angle-guide-line" />
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
    const e = this.calibrateStart, t = this.calibrateCurrent, s = t.x - e.x, i = t.y - e.y, o = Math.sqrt(s * s + i * i), r = { x: (e.x + t.x) / 2, y: (e.y + t.y) / 2 };
    return O`
      <g class="calibration-preview-group">
        <line x1="${e.x}" y1="${e.y}" x2="${t.x}" y2="${t.y}" class="calibration-line" />
        <circle cx="${e.x}" cy="${e.y}" r="6" class="calibration-endpoint" />
        <circle cx="${t.x}" cy="${t.y}" r="6" class="calibration-endpoint" />

        <g class="dimension-badge" transform="translate(${r.x}, ${r.y - 18})">
          <rect x="-35" y="-11" width="70" height="22" style="stroke: #f59e0b;" />
          <text style="fill: #f59e0b;">${Math.round(o)} px</text>
        </g>
      </g>
    `;
  }
  renderRescaleLine() {
    if (!this.rescaleStart || !this.rescaleCurrent) return null;
    const e = this.worldToScreen(this.rescaleStart), t = this.worldToScreen(this.rescaleCurrent), s = y.distance(this.rescaleStart, this.rescaleCurrent), i = {
      x: (e.x + t.x) / 2,
      y: (e.y + t.y) / 2
    };
    return O`
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

        <g class="dimension-badge" transform="translate(${i.x}, ${i.y - 18})">
          <rect x="-48" y="-13" width="96" height="26" rx="6" fill="#0f172a" stroke="#38bdf8" stroke-width="1.8" />
          <text fill="#38bdf8" font-size="12px" font-weight="800" text-anchor="middle" dy="5">
            📐 ${y.roundMeters(s).toFixed(2)} m
          </text>
        </g>
      </g>
    `;
  }
  renderSnapIndicator() {
    if (!this.previewPoint || this.snapInfo.snappedTo === "none") return null;
    const e = this.worldToScreen(this.previewPoint), t = this.snapInfo.snappedTo === "vertex";
    return O`
      <g transform="translate(${e.x}, ${e.y})">
        <circle r="${t ? 7 : 5}" class="snap-indicator" />
        ${t ? O`<circle r="2" fill="#38bdf8" />` : null}
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
    const e = this.getHelpMessage();
    return v`
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

        ${!this.isDashboardMode && e ? v`<div class="help-hud">${e}</div>` : null}

        ${this.isDashboardMode ? null : v`
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

          ${this.is3DMode ? v`
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
T.styles = Ae;
E([
  P({ type: Object })
], T.prototype, "hass", 2);
E([
  P({ type: Object })
], T.prototype, "project", 2);
E([
  P({ type: String })
], T.prototype, "activeTool", 2);
E([
  P({ type: Number })
], T.prototype, "currentWallThickness", 2);
E([
  P({ type: Number })
], T.prototype, "currentOpeningWidth", 2);
E([
  P({ type: Boolean })
], T.prototype, "is3DMode", 2);
E([
  P({ type: Object })
], T.prototype, "selectedElements", 2);
E([
  P({ type: Boolean })
], T.prototype, "isDashboardMode", 2);
E([
  b()
], T.prototype, "isMarqueeSelecting", 2);
E([
  b()
], T.prototype, "marqueeStart", 2);
E([
  b()
], T.prototype, "marqueeCurrent", 2);
E([
  b()
], T.prototype, "viewport", 2);
E([
  b()
], T.prototype, "isPanning", 2);
E([
  b()
], T.prototype, "drawingWallStart", 2);
E([
  b()
], T.prototype, "previewPoint", 2);
E([
  b()
], T.prototype, "snapInfo", 2);
E([
  b()
], T.prototype, "cursorCoords", 2);
E([
  b()
], T.prototype, "wallSnap", 2);
E([
  P({ type: Boolean })
], T.prototype, "openingFlipSide", 2);
E([
  P({ type: Boolean })
], T.prototype, "openingFlipDirection", 2);
E([
  P({ type: Number })
], T.prototype, "windowSashCount", 2);
E([
  b()
], T.prototype, "calibrateStart", 2);
E([
  b()
], T.prototype, "calibrateCurrent", 2);
E([
  b()
], T.prototype, "rescaleStart", 2);
E([
  b()
], T.prototype, "rescaleCurrent", 2);
E([
  b()
], T.prototype, "draggingBindingId", 2);
E([
  b()
], T.prototype, "orbitPitch", 2);
E([
  b()
], T.prototype, "orbitYaw", 2);
E([
  b()
], T.prototype, "isOrbiting", 2);
T = E([
  J("home-architect-canvas")
], T);
var Re = Object.defineProperty, We = Object.getOwnPropertyDescriptor, V = (e, t, s, i) => {
  for (var o = i > 1 ? void 0 : i ? We(t, s) : t, r = e.length - 1, n; r >= 0; r--)
    (n = e[r]) && (o = (i ? n(t, s, o) : n(o)) || o);
  return i && o && Re(t, s, o), o;
};
let q = class extends H {
  constructor() {
    super(...arguments), this.activeTool = "wall", this.canUndo = !1, this.canRedo = !1, this.currentThickness = 0.2, this.doorFlipSide = !1, this.doorFlipDirection = !0, this.windowSashCount = 1, this.position = { x: 20, y: 20 }, this.isDragging = !1, this.activeSubmenu = "none", this.submenuTop = 0, this.submenuOnLeft = !1, this.dragStartPointer = { x: 0, y: 0 }, this.dragStartPosition = { x: 20, y: 20 }, this.handleWindowPointerDown = (e) => {
      this.activeSubmenu !== "none" && (e.composedPath().includes(this) || (this.activeSubmenu = "none"));
    };
  }
  connectedCallback() {
    super.connectedCallback();
    try {
      const e = localStorage.getItem("home_architect_toolbar_pos");
      if (e) {
        const t = JSON.parse(e);
        typeof t.x == "number" && typeof t.y == "number" && (this.position = t);
      }
    } catch {
    }
    this.updateHostPosition(), window.addEventListener("pointerdown", this.handleWindowPointerDown);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), window.removeEventListener("pointerdown", this.handleWindowPointerDown);
  }
  updated(e) {
    super.updated(e), e.has("position") && this.updateHostPosition();
  }
  updateHostPosition() {
    this.style.left = `${this.position.x}px`, this.style.top = `${this.position.y}px`;
  }
  handleDragStart(e) {
    if (e.button !== 0) return;
    e.preventDefault(), e.stopPropagation(), this.isDragging = !0, this.dragStartPointer = { x: e.clientX, y: e.clientY }, this.dragStartPosition = { ...this.position }, e.currentTarget.setPointerCapture(e.pointerId);
  }
  handleDragMove(e) {
    if (!this.isDragging) return;
    e.preventDefault(), e.stopPropagation();
    const t = e.clientX - this.dragStartPointer.x, s = e.clientY - this.dragStartPointer.y, o = (this.parentElement || document.body).getBoundingClientRect(), r = this.getBoundingClientRect(), n = 8, a = Math.max(n, o.width - r.width - 8), l = 8, h = Math.max(l, o.height - r.height - 8), c = Math.min(Math.max(this.dragStartPosition.x + t, n), a), u = Math.min(Math.max(this.dragStartPosition.y + s, l), h);
    this.position = { x: Math.round(c), y: Math.round(u) }, this.updateHostPosition();
  }
  handleDragEnd(e) {
    if (this.isDragging) {
      this.isDragging = !1;
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {
      }
      try {
        localStorage.setItem("home_architect_toolbar_pos", JSON.stringify(this.position));
      } catch {
      }
    }
  }
  selectTool(e) {
    this.dispatchEvent(new CustomEvent("tool-selected", {
      detail: { tool: e },
      bubbles: !0,
      composed: !0
    }));
  }
  toggleSubmenu(e, t) {
    if (t.stopPropagation(), this.activeSubmenu === e) {
      this.activeSubmenu = "none";
      return;
    }
    const s = t.currentTarget, i = this.getBoundingClientRect(), o = s.getBoundingClientRect();
    this.submenuTop = Math.max(0, o.top - i.top - 6), this.submenuOnLeft = i.right + 320 > window.innerWidth, this.activeSubmenu = e;
  }
  selectDoorOption(e, t) {
    this.doorFlipSide = e, this.doorFlipDirection = t, this.dispatchEvent(new CustomEvent("door-config-changed", {
      detail: { flipSide: e, flipDirection: t },
      bubbles: !0,
      composed: !0
    })), this.selectTool("door"), this.activeSubmenu = "none";
  }
  selectWindowOption(e, t, s) {
    this.windowSashCount = t, this.dispatchEvent(new CustomEvent("window-config-changed", {
      detail: { type: e, sashCount: t, width: s },
      bubbles: !0,
      composed: !0
    })), this.selectTool(e), this.activeSubmenu = "none";
  }
  selectWallThickness(e) {
    this.currentThickness = e, this.dispatchEvent(new CustomEvent("wall-thickness-changed", {
      detail: { thickness: e },
      bubbles: !0,
      composed: !0
    })), this.selectTool("wall"), this.activeSubmenu = "none";
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
    return v`
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
        @click=${() => {
      this.activeSubmenu = "none", this.selectTool("select");
    }} 
        title="Sélectionner & Déplacer (V)"
      >
        👆
      </button>

      <!-- Outil Mur -->
      <button 
        class="tool-btn ${this.activeTool === "wall" ? "active" : ""} ${this.activeSubmenu === "wall" ? "menu-open" : ""}" 
        @click=${(e) => {
      this.selectTool("wall"), this.toggleSubmenu("wall", e);
    }} 
        title="Tracer un mur (W) - Cliquez pour choisir l'épaisseur (Fin 10cm, Moyen 20cm, Gros 30cm)"
      >
        🧱
        <span class="submenu-indicator">▾</span>
      </button>

      <div class="divider"></div>

      <!-- Outil Porte -->
      <button 
        class="tool-btn ${this.activeTool === "door" ? "active" : ""} ${this.activeSubmenu === "door" ? "menu-open" : ""}" 
        @click=${(e) => {
      this.selectTool("door"), this.toggleSubmenu("door", e);
    }} 
        title="Insérer une porte (D) - Cliquez pour choisir le sens d'ouverture (Droite/Gauche, Intérieur/Extérieur)"
      >
        🚪
        <span class="submenu-indicator">▾</span>
      </button>

      <!-- Outil Fenêtre -->
      <button 
        class="tool-btn ${this.activeTool === "window" ? "active" : ""} ${this.activeSubmenu === "window" ? "menu-open" : ""}" 
        @click=${(e) => {
      this.selectTool("window"), this.toggleSubmenu("window", e);
    }} 
        title="Insérer une fenêtre - Cliquez pour choisir 1 ouvrant ou 2 battants"
      >
        🪟
        <span class="submenu-indicator">▾</span>
      </button>

      <!-- Outil Baie vitrée / Porte-fenêtre -->
      <button 
        class="tool-btn ${this.activeTool === "french_window" ? "active" : ""}" 
        @click=${() => {
      this.activeSubmenu = "none", this.selectTool("french_window");
    }} 
        title="Insérer une baie coulissante"
      >
        🪞
      </button>

      <div class="divider"></div>

      <!-- Import de plan de fond & vectorisation -->
      <button 
        class="tool-btn" 
        @click=${() => {
      this.activeSubmenu = "none", this.openImportModal();
    }} 
        title="Importer un plan (PNG/JPG/SVG/PDF) ou Coller directement (Cmd+V / Ctrl+V)"
      >
        🖼️
      </button>

      <!-- Étalonnage d'échelle (calque image) -->
      <button 
        class="tool-btn ${this.activeTool === "calibrate" ? "active" : ""}" 
        @click=${() => {
      this.activeSubmenu = "none", this.selectTool("calibrate");
    }} 
        title="Étalonnage d'échelle : tracer un mur mesuré sur l'image (M)"
      >
        📏
      </button>

      <!-- Mettre à l'échelle le plan (Recalculer toutes les cotes) -->
      <button 
        class="tool-btn ${this.activeTool === "rescale" ? "active" : ""}" 
        @click=${() => {
      this.activeSubmenu = "none", this.selectTool("rescale");
    }} 
        title="Mettre à l'échelle : mesurer un mur pour recalculer toutes les cotes (S)"
      >
        📐
      </button>

      <!-- ============================================== -->
      <!-- SOUS-MENUS FLYOUT                              -->
      <!-- ============================================== -->

      <!-- Sous-menu Flyout Porte (4 sens d'ouverture) -->
      ${this.activeSubmenu === "door" ? v`
        <div class="flyout-menu ${this.submenuOnLeft ? "on-left" : ""}" style="top: ${this.submenuTop}px;" @pointerdown=${(e) => e.stopPropagation()}>
          <div class="flyout-header">
            <span class="flyout-title">
              <span>🚪</span>
              <span>Sens d'ouverture de porte</span>
            </span>
            <button class="flyout-close-btn" @click=${() => this.activeSubmenu = "none"}>✕</button>
          </div>

          <!-- 1. Droite Intérieure (Poussant Droit) -->
          <div 
            class="flyout-item ${!this.doorFlipSide && this.doorFlipDirection ? "active" : ""}"
            @click=${() => this.selectDoorOption(!1, !0)}
          >
            <div class="flyout-item-icon">
              <svg width="24" height="24" viewBox="-12 -12 24 24">
                <line x1="-10" y1="0" x2="10" y2="0" stroke="#64748b" stroke-width="2.5"/>
                <circle cx="8" cy="0" r="1.5" fill="#f59e0b"/>
                <line x1="8" y1="0" x2="8" y2="10" stroke="#38bdf8" stroke-width="2"/>
                <path d="M -2 0 A 10 10 0 0 0 8 10" fill="none" stroke="#38bdf8" stroke-width="1.2" stroke-dasharray="2,2"/>
              </svg>
            </div>
            <div class="flyout-item-content">
              <div class="flyout-item-label">Ouverture droite intérieure</div>
              <div class="flyout-item-sub">Poussant droit • Gonds à droite, s'ouvre vers l'intérieur</div>
            </div>
            ${!this.doorFlipSide && this.doorFlipDirection ? v`<span class="flyout-item-badge">Actif</span>` : null}
          </div>

          <!-- 2. Gauche Intérieure (Poussant Gauche) -->
          <div 
            class="flyout-item ${!this.doorFlipSide && !this.doorFlipDirection ? "active" : ""}"
            @click=${() => this.selectDoorOption(!1, !1)}
          >
            <div class="flyout-item-icon">
              <svg width="24" height="24" viewBox="-12 -12 24 24">
                <line x1="-10" y1="0" x2="10" y2="0" stroke="#64748b" stroke-width="2.5"/>
                <circle cx="-8" cy="0" r="1.5" fill="#f59e0b"/>
                <line x1="-8" y1="0" x2="-8" y2="10" stroke="#38bdf8" stroke-width="2"/>
                <path d="M 2 0 A 10 10 0 0 1 -8 10" fill="none" stroke="#38bdf8" stroke-width="1.2" stroke-dasharray="2,2"/>
              </svg>
            </div>
            <div class="flyout-item-content">
              <div class="flyout-item-label">Ouverture gauche intérieure</div>
              <div class="flyout-item-sub">Poussant gauche • Gonds à gauche, s'ouvre vers l'intérieur</div>
            </div>
            ${!this.doorFlipSide && !this.doorFlipDirection ? v`<span class="flyout-item-badge">Actif</span>` : null}
          </div>

          <!-- 3. Gauche Extérieure (Tirant Gauche) -->
          <div 
            class="flyout-item ${this.doorFlipSide && !this.doorFlipDirection ? "active" : ""}"
            @click=${() => this.selectDoorOption(!0, !1)}
          >
            <div class="flyout-item-icon">
              <svg width="24" height="24" viewBox="-12 -12 24 24">
                <line x1="-10" y1="0" x2="10" y2="0" stroke="#64748b" stroke-width="2.5"/>
                <circle cx="-8" cy="0" r="1.5" fill="#f59e0b"/>
                <line x1="-8" y1="0" x2="-8" y2="-10" stroke="#38bdf8" stroke-width="2"/>
                <path d="M 2 0 A 10 10 0 0 0 -8 -10" fill="none" stroke="#38bdf8" stroke-width="1.2" stroke-dasharray="2,2"/>
              </svg>
            </div>
            <div class="flyout-item-content">
              <div class="flyout-item-label">Ouverture gauche extérieure</div>
              <div class="flyout-item-sub">Tirant gauche • Gonds à gauche, s'ouvre vers l'extérieur</div>
            </div>
            ${this.doorFlipSide && !this.doorFlipDirection ? v`<span class="flyout-item-badge">Actif</span>` : null}
          </div>

          <!-- 4. Droite Extérieure (Tirant Droit) -->
          <div 
            class="flyout-item ${this.doorFlipSide && this.doorFlipDirection ? "active" : ""}"
            @click=${() => this.selectDoorOption(!0, !0)}
          >
            <div class="flyout-item-icon">
              <svg width="24" height="24" viewBox="-12 -12 24 24">
                <line x1="-10" y1="0" x2="10" y2="0" stroke="#64748b" stroke-width="2.5"/>
                <circle cx="8" cy="0" r="1.5" fill="#f59e0b"/>
                <line x1="8" y1="0" x2="8" y2="-10" stroke="#38bdf8" stroke-width="2"/>
                <path d="M -2 0 A 10 10 0 0 1 8 -10" fill="none" stroke="#38bdf8" stroke-width="1.2" stroke-dasharray="2,2"/>
              </svg>
            </div>
            <div class="flyout-item-content">
              <div class="flyout-item-label">Ouverture droite extérieure</div>
              <div class="flyout-item-sub">Tirant droit • Gonds à droite, s'ouvre vers l'extérieur</div>
            </div>
            ${this.doorFlipSide && this.doorFlipDirection ? v`<span class="flyout-item-badge">Actif</span>` : null}
          </div>
        </div>
      ` : null}

      <!-- Sous-menu Flyout Fenêtre (1 ouvrant, 2 battants, baie vitrée) -->
      ${this.activeSubmenu === "window" ? v`
        <div class="flyout-menu ${this.submenuOnLeft ? "on-left" : ""}" style="top: ${this.submenuTop}px;" @pointerdown=${(e) => e.stopPropagation()}>
          <div class="flyout-header">
            <span class="flyout-title">
              <span>🪟</span>
              <span>Type de fenêtre</span>
            </span>
            <button class="flyout-close-btn" @click=${() => this.activeSubmenu = "none"}>✕</button>
          </div>

          <!-- 1. Fenêtre 1 ouvrant -->
          <div 
            class="flyout-item ${this.activeTool === "window" && this.windowSashCount !== 2 ? "active" : ""}"
            @click=${() => this.selectWindowOption("window", 1, 0.9)}
          >
            <div class="flyout-item-icon">
              <svg width="24" height="24" viewBox="-12 -12 24 24">
                <rect x="-9" y="-6" width="18" height="12" fill="none" stroke="#94a3b8" stroke-width="1.8"/>
                <line x1="-9" y1="0" x2="9" y2="0" stroke="#38bdf8" stroke-width="1.5"/>
              </svg>
            </div>
            <div class="flyout-item-content">
              <div class="flyout-item-label">1 ouvrant (Battant simple)</div>
              <div class="flyout-item-sub">Fenêtre standard 1 vantail (90 cm)</div>
            </div>
            <span class="flyout-item-badge">90 cm</span>
          </div>

          <!-- 2. Fenêtre 2 battants -->
          <div 
            class="flyout-item ${this.activeTool === "window" && this.windowSashCount === 2 ? "active" : ""}"
            @click=${() => this.selectWindowOption("window", 2, 1.4)}
          >
            <div class="flyout-item-icon">
              <svg width="24" height="24" viewBox="-12 -12 24 24">
                <rect x="-10" y="-6" width="20" height="12" fill="none" stroke="#94a3b8" stroke-width="1.8"/>
                <line x1="-10" y1="0" x2="10" y2="0" stroke="#38bdf8" stroke-width="1.5"/>
                <line x1="0" y1="-6" x2="0" y2="6" stroke="#38bdf8" stroke-width="2"/>
              </svg>
            </div>
            <div class="flyout-item-content">
              <div class="flyout-item-label">2 battants (Double vantaux)</div>
              <div class="flyout-item-sub">Fenêtre large avec meneau (1.40 m)</div>
            </div>
            <span class="flyout-item-badge">1.40 m</span>
          </div>

          <!-- 3. Baie vitrée coulissante -->
          <div 
            class="flyout-item ${this.activeTool === "french_window" ? "active" : ""}"
            @click=${() => this.selectWindowOption("french_window", 2, 2)}
          >
            <div class="flyout-item-icon">
              <svg width="24" height="24" viewBox="-12 -12 24 24">
                <rect x="-10" y="-6" width="20" height="12" fill="none" stroke="#94a3b8" stroke-width="1.8"/>
                <rect x="-10" y="-3" width="10" height="2" fill="#38bdf8"/>
                <rect x="0" y="2" width="10" height="2" fill="#38bdf8"/>
              </svg>
            </div>
            <div class="flyout-item-content">
              <div class="flyout-item-label">Baie vitrée coulissante</div>
              <div class="flyout-item-sub">Porte-fenêtre 2 vantaux (2.00 m)</div>
            </div>
            <span class="flyout-item-badge">2.00 m</span>
          </div>
        </div>
      ` : null}

      <!-- Sous-menu Flyout Mur (Fin, Moyen, Gros) -->
      ${this.activeSubmenu === "wall" ? v`
        <div class="flyout-menu ${this.submenuOnLeft ? "on-left" : ""}" style="top: ${this.submenuTop}px;" @pointerdown=${(e) => e.stopPropagation()}>
          <div class="flyout-header">
            <span class="flyout-title">
              <span>🧱</span>
              <span>Épaisseur du mur</span>
            </span>
            <button class="flyout-close-btn" @click=${() => this.activeSubmenu = "none"}>✕</button>
          </div>

          <!-- 1. Mur Fin (10 cm) -->
          <div 
            class="flyout-item ${this.currentThickness === 0.1 ? "active" : ""}"
            @click=${() => this.selectWallThickness(0.1)}
          >
            <div class="flyout-item-icon">
              <svg width="24" height="24" viewBox="-12 -12 24 24">
                <rect x="-10" y="-2" width="20" height="4" fill="#94a3b8" rx="1"/>
              </svg>
            </div>
            <div class="flyout-item-content">
              <div class="flyout-item-label">Fin (Cloison)</div>
              <div class="flyout-item-sub">Cloisons intérieures séparatives (10 cm)</div>
            </div>
            <span class="flyout-item-badge">10 cm</span>
          </div>

          <!-- 2. Mur Moyen (20 cm) -->
          <div 
            class="flyout-item ${this.currentThickness === 0.2 ? "active" : ""}"
            @click=${() => this.selectWallThickness(0.2)}
          >
            <div class="flyout-item-icon">
              <svg width="24" height="24" viewBox="-12 -12 24 24">
                <rect x="-10" y="-4" width="20" height="8" fill="#38bdf8" rx="1"/>
              </svg>
            </div>
            <div class="flyout-item-content">
              <div class="flyout-item-label">Moyen (Standard)</div>
              <div class="flyout-item-sub">Murs intérieurs porteurs ou standards (20 cm)</div>
            </div>
            <span class="flyout-item-badge">20 cm</span>
          </div>

          <!-- 3. Mur Gros (30 cm) -->
          <div 
            class="flyout-item ${this.currentThickness === 0.3 ? "active" : ""}"
            @click=${() => this.selectWallThickness(0.3)}
          >
            <div class="flyout-item-icon">
              <svg width="24" height="24" viewBox="-12 -12 24 24">
                <rect x="-10" y="-6" width="20" height="12" fill="#0284c7" stroke="#38bdf8" stroke-width="1" rx="1"/>
              </svg>
            </div>
            <div class="flyout-item-content">
              <div class="flyout-item-label">Gros (Porteur / Extérieur)</div>
              <div class="flyout-item-sub">Murs de façade et gros porteurs (30 cm)</div>
            </div>
            <span class="flyout-item-badge">30 cm</span>
          </div>
        </div>
      ` : null}
    `;
  }
};
q.styles = K`
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

    .tool-btn.menu-open {
      border-color: #38bdf8;
      box-shadow: 0 0 14px rgba(56, 189, 248, 0.6);
      background: rgba(2, 132, 199, 0.4);
    }

    .submenu-indicator {
      position: absolute;
      bottom: 2px;
      right: 3px;
      font-size: 8px;
      line-height: 1;
      opacity: 0.7;
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

    /* Sous-menu Flyout */
    .flyout-menu {
      position: absolute;
      left: calc(100% + 10px);
      background: rgba(15, 23, 42, 0.96);
      backdrop-filter: blur(20px);
      border: 1.5px solid rgba(56, 189, 248, 0.45);
      border-radius: 14px;
      padding: 10px;
      box-shadow: 0 16px 40px rgba(0, 0, 0, 0.7), 0 0 25px rgba(56, 189, 248, 0.25);
      z-index: 60;
      width: 300px;
      display: flex;
      flex-direction: column;
      gap: 6px;
      animation: flyoutIn 0.18s ease-out;
      user-select: none;
    }

    .flyout-menu.on-left {
      left: auto;
      right: calc(100% + 10px);
    }

    @keyframes flyoutIn {
      from { opacity: 0; transform: translateX(-8px) scale(0.97); }
      to { opacity: 1; transform: translateX(0) scale(1); }
    }

    .flyout-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 2px 4px 6px 4px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      margin-bottom: 2px;
    }

    .flyout-title {
      font-size: 0.8rem;
      font-weight: 700;
      color: #38bdf8;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .flyout-close-btn {
      background: transparent;
      border: none;
      color: #94a3b8;
      cursor: pointer;
      font-size: 14px;
      padding: 2px 5px;
      border-radius: 4px;
      line-height: 1;
    }

    .flyout-close-btn:hover {
      color: #ffffff;
      background: rgba(255, 255, 255, 0.1);
    }

    .flyout-item {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 8px 10px;
      border-radius: 10px;
      border: 1px solid rgba(255, 255, 255, 0.08);
      background: rgba(30, 41, 59, 0.65);
      color: #e2e8f0;
      cursor: pointer;
      transition: all 0.15s ease;
      text-align: left;
    }

    .flyout-item:hover {
      background: rgba(56, 189, 248, 0.18);
      border-color: rgba(56, 189, 248, 0.5);
      color: #ffffff;
      transform: translateX(2px);
    }

    .flyout-item.active {
      background: rgba(2, 132, 199, 0.35);
      border-color: #38bdf8;
      color: #ffffff;
      box-shadow: 0 0 12px rgba(56, 189, 248, 0.35);
    }

    .flyout-item-icon {
      width: 34px;
      height: 34px;
      border-radius: 8px;
      background: rgba(15, 23, 42, 0.85);
      border: 1px solid rgba(255, 255, 255, 0.12);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      font-size: 16px;
    }

    .flyout-item-content {
      display: flex;
      flex-direction: column;
      flex: 1;
      min-width: 0;
    }

    .flyout-item-label {
      font-size: 0.84rem;
      font-weight: 700;
      color: #f1f5f9;
      line-height: 1.25;
    }

    .flyout-item-sub {
      font-size: 0.72rem;
      color: #94a3b8;
      margin-top: 2px;
      line-height: 1.25;
    }

    .flyout-item-badge {
      font-size: 0.72rem;
      font-weight: 700;
      font-family: ui-monospace, SFMono-Regular, monospace;
      padding: 3px 8px;
      border-radius: 6px;
      background: rgba(15, 23, 42, 0.85);
      border: 1px solid rgba(56, 189, 248, 0.35);
      color: #38bdf8;
      flex-shrink: 0;
    }
  `;
V([
  P({ type: String })
], q.prototype, "activeTool", 2);
V([
  P({ type: Boolean })
], q.prototype, "canUndo", 2);
V([
  P({ type: Boolean })
], q.prototype, "canRedo", 2);
V([
  P({ type: Number })
], q.prototype, "currentThickness", 2);
V([
  P({ type: Boolean })
], q.prototype, "doorFlipSide", 2);
V([
  P({ type: Boolean })
], q.prototype, "doorFlipDirection", 2);
V([
  P({ type: Number })
], q.prototype, "windowSashCount", 2);
V([
  b()
], q.prototype, "position", 2);
V([
  b()
], q.prototype, "isDragging", 2);
V([
  b()
], q.prototype, "activeSubmenu", 2);
V([
  b()
], q.prototype, "submenuTop", 2);
V([
  b()
], q.prototype, "submenuOnLeft", 2);
q = V([
  J("home-architect-toolbar")
], q);
var Le = Object.defineProperty, Ne = Object.getOwnPropertyDescriptor, et = (e, t, s, i) => {
  for (var o = i > 1 ? void 0 : i ? Ne(t, s) : t, r = e.length - 1, n; r >= 0; r--)
    (n = e[r]) && (o = (i ? n(t, s, o) : n(o)) || o);
  return i && o && Le(t, s, o), o;
};
const st = [
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
let X = class extends H {
  constructor() {
    super(...arguments), this.selectedTemplate = st[0], this.width = st[0].widthMeters, this.length = st[0].lengthMeters, this.thickness = st[0].wallThickness, this.addDoor = st[0].addDoor, this.addWindow = st[0].addWindow, this.roomName = st[0].name, this.height = 2.5;
  }
  selectTemplate(e) {
    this.selectedTemplate = e, this.width = e.widthMeters, this.length = e.lengthMeters, this.thickness = e.wallThickness, this.height = e.heightMeters || 2.5, this.addDoor = e.addDoor, this.addWindow = e.addWindow, this.roomName = e.name;
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
    const e = (this.width * this.length).toFixed(1);
    return v`
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
          ${st.map((t) => v`
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
            <span class="surface-badge">${e} m²</span>
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
X.styles = K`
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
et([
  b()
], X.prototype, "selectedTemplate", 2);
et([
  b()
], X.prototype, "width", 2);
et([
  b()
], X.prototype, "length", 2);
et([
  b()
], X.prototype, "thickness", 2);
et([
  b()
], X.prototype, "addDoor", 2);
et([
  b()
], X.prototype, "addWindow", 2);
et([
  b()
], X.prototype, "roomName", 2);
et([
  b()
], X.prototype, "height", 2);
X = et([
  J("home-architect-wizard-modal")
], X);
var Ue = Object.defineProperty, Be = Object.getOwnPropertyDescriptor, Ot = (e, t, s, i) => {
  for (var o = i > 1 ? void 0 : i ? Be(t, s) : t, r = e.length - 1, n; r >= 0; r--)
    (n = e[r]) && (o = (i ? n(t, s, o) : n(o)) || o);
  return i && o && Ue(t, s, o), o;
};
let xt = class extends H {
  constructor() {
    super(...arguments), this.pixelDistance = 200, this.defaultMeters = 4, this.realMeters = 4;
  }
  firstUpdated() {
    this.realMeters = this.defaultMeters;
  }
  handleApply() {
    if (this.realMeters <= 0.05) return;
    const e = this.pixelDistance / this.realMeters;
    this.dispatchEvent(new CustomEvent("calibrate-confirmed", {
      detail: {
        realMeters: this.realMeters,
        pixelDistance: this.pixelDistance,
        pixelsPerMeter: e
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
    const e = (this.pixelDistance / (this.realMeters || 1)).toFixed(1);
    return v`
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
            Distance tracée à l'écran : ${Math.round(this.pixelDistance)} px | Échelle résultante : ${e} px/m
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
xt.styles = K`
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
  P({ type: Number })
], xt.prototype, "pixelDistance", 2);
Ot([
  P({ type: Number })
], xt.prototype, "defaultMeters", 2);
Ot([
  b()
], xt.prototype, "realMeters", 2);
xt = Ot([
  J("home-architect-calibrate-modal")
], xt);
var He = Object.defineProperty, qe = Object.getOwnPropertyDescriptor, Pt = (e, t, s, i) => {
  for (var o = i > 1 ? void 0 : i ? qe(t, s) : t, r = e.length - 1, n; r >= 0; r--)
    (n = e[r]) && (o = (i ? n(t, s, o) : n(o)) || o);
  return i && o && He(t, s, o), o;
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
let dt = class extends H {
  constructor() {
    super(...arguments), this.collapsed = !1, this.searchQuery = "", this.activeCategory = "all";
  }
  getEntities() {
    var e;
    return (e = this.hass) != null && e.states ? Object.values(this.hass.states).map((t) => {
      var o, r;
      const s = t.entity_id.split(".")[0], i = ne[s] || ne.default;
      return {
        entity_id: t.entity_id,
        name: ((o = t.attributes) == null ? void 0 : o.friendly_name) || t.entity_id,
        state: t.state,
        domain: s,
        icon: i,
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
  handleDragStart(e, t) {
    e.dataTransfer && (e.dataTransfer.setData("application/json", JSON.stringify({
      entityId: t.entity_id,
      domain: t.domain,
      name: t.name,
      icon: t.icon
    })), e.dataTransfer.effectAllowed = "copy");
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
    if (this.activeCategory !== "all" && (t = t.filter((s) => s.domain === this.activeCategory)), this.searchQuery.trim()) {
      const s = this.searchQuery.toLowerCase();
      t = t.filter((i) => i.name.toLowerCase().includes(s) || i.entity_id.toLowerCase().includes(s));
    }
    return v`
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
            @input=${(s) => this.searchQuery = s.target.value}
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
        ${t.length === 0 ? v`
          <div class="empty-message">Aucune entité trouvée</div>
        ` : t.map((s) => v`
          <div 
            class="entity-card" 
            draggable="true"
            @dragstart=${(i) => this.handleDragStart(i, s)}
            title="Glissez et déposez sur une pièce du plan"
          >
            <div class="entity-info">
              <span class="entity-icon">${s.icon}</span>
              <div class="entity-details">
                <span class="entity-name">${s.name}</span>
                <span class="entity-id">${s.entity_id}</span>
              </div>
            </div>

            <span class="entity-state-badge ${s.state === "on" ? "state-on" : "state-off"}">
              ${s.state}${s.unit ? " " + s.unit : ""}
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
dt.styles = K`
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
  P({ type: Object })
], dt.prototype, "hass", 2);
Pt([
  P({ type: Boolean, reflect: !0 })
], dt.prototype, "collapsed", 2);
Pt([
  b()
], dt.prototype, "searchQuery", 2);
Pt([
  b()
], dt.prototype, "activeCategory", 2);
dt = Pt([
  J("home-architect-entity-drawer")
], dt);
var Ve = Object.defineProperty, Ye = Object.getOwnPropertyDescriptor, Dt = (e, t, s, i) => {
  for (var o = i > 1 ? void 0 : i ? Ye(t, s) : t, r = e.length - 1, n; r >= 0; r--)
    (n = e[r]) && (o = (i ? n(t, s, o) : n(o)) || o);
  return i && o && Ve(t, s, o), o;
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
let pt = class extends H {
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
    const e = (this.room.areaM2 * this.height).toFixed(1);
    return v`
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
              ${Xe.map((t) => v`
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
              <span class="metric-val">${e} m³</span>
            </div>
          </div>

          <!-- Couleur de sol -->
          <div class="form-group">
            <label class="form-label">Couleur d'ambiance du sol :</label>
            <div class="colors-row">
              ${Ge.map((t) => v`
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
pt.styles = K`
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
  P({ type: Object })
], pt.prototype, "room", 2);
Dt([
  b()
], pt.prototype, "name", 2);
Dt([
  b()
], pt.prototype, "height", 2);
Dt([
  b()
], pt.prototype, "color", 2);
pt = Dt([
  J("home-architect-room-modal")
], pt);
class G {
  constructor(t = 1, s = 0, i = 0, o = 1, r = 0, n = 0) {
    this.a = t, this.b = s, this.c = i, this.d = o, this.e = r, this.f = n;
  }
  static identity() {
    return new G(1, 0, 0, 1, 0, 0);
  }
  multiply(t) {
    return new G(
      this.a * t.a + this.c * t.b,
      this.b * t.a + this.d * t.b,
      this.a * t.c + this.c * t.d,
      this.b * t.c + this.d * t.d,
      this.a * t.e + this.c * t.f + this.e,
      this.b * t.e + this.d * t.f + this.f
    );
  }
  translate(t, s) {
    return this.multiply(new G(1, 0, 0, 1, t, s));
  }
  scale(t, s = t) {
    return this.multiply(new G(t, 0, 0, s, 0, 0));
  }
  rotate(t) {
    const s = t * Math.PI / 180, i = Math.cos(s), o = Math.sin(s);
    return this.multiply(new G(i, o, -o, i, 0, 0));
  }
  transformPoint(t) {
    return {
      x: this.a * t.x + this.c * t.y + this.e,
      y: this.b * t.x + this.d * t.y + this.f
    };
  }
  static parseTransform(t) {
    if (!t) return G.identity();
    let s = G.identity();
    const i = /([a-zA-Z]+)\s*\(([^)]+)\)/g;
    let o;
    for (; (o = i.exec(t)) !== null; ) {
      const r = o[1].toLowerCase(), n = o[2].trim().split(/[\s,]+/).map(parseFloat).filter((a) => !isNaN(a));
      r === "matrix" && n.length >= 6 ? s = s.multiply(new G(n[0], n[1], n[2], n[3], n[4], n[5])) : r === "translate" && n.length >= 1 ? s = s.translate(n[0], n[1] || 0) : r === "scale" && n.length >= 1 ? s = s.scale(n[0], n[1] !== void 0 ? n[1] : n[0]) : r === "rotate" && n.length >= 1 && (n.length >= 3 ? s = s.translate(n[1], n[2]).rotate(n[0]).translate(-n[1], -n[2]) : s = s.rotate(n[0]));
    }
    return s;
  }
}
class Ke {
  /**
   * Main entry point to parse and interpret an architectural SVG floor plan
   */
  static parseSvg(t, s = 12, i = 0.2, o = 2.5, r) {
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
      const u = this.extractViewBox(c), p = u.width > 0 ? u.width : 1e3, g = s / p, d = Math.round(p / s * 10) / 10, f = [], m = [], x = [], k = [];
      this.traverseElement(c, G.identity(), {
        segments: f,
        arcs: m,
        textLabels: x,
        polygons: k,
        defaultThickness: i
      });
      const M = f.filter((I) => I.isMeasurementLine).length, w = this.convertSegmentsToWalls(
        f,
        u,
        g,
        i,
        o
      ), S = this.detectOpenings(
        m,
        f,
        w,
        u,
        g
      ), C = this.detectRooms(
        k,
        w,
        x,
        u,
        g,
        o,
        n.importLabels !== !1
      ), $ = n.importWalls !== !1 ? w : [], _ = S.filter((I) => I.type === "door" ? n.importDoors !== !1 : n.importWindows !== !1), D = n.importRooms !== !1 ? C : [];
      return {
        success: !0,
        walls: $,
        openings: _,
        rooms: D,
        viewBox: u,
        pixelsPerMeter: d || 50,
        stats: {
          wallCount: w.length,
          doorCount: S.filter((I) => I.type === "door").length,
          windowCount: S.filter((I) => I.type === "window" || I.type === "french_window").length,
          roomCount: C.length,
          textLabelCount: x.length,
          ignoredMeasurementLinesCount: M
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
    const s = t.getAttribute("viewBox");
    if (s) {
      const n = s.trim().split(/[\s,]+/).map(parseFloat).filter((a) => !isNaN(a));
      if (n.length >= 4 && n[2] > 0 && n[3] > 0)
        return { x: n[0], y: n[1], width: n[2], height: n[3] };
    }
    const i = (n, a) => {
      if (!n) return a;
      const l = parseFloat(n);
      return isNaN(l) ? a : n.includes("mm") ? l * 3.7795 : n.includes("cm") ? l * 37.795 : n.includes("in") ? l * 96 : n.includes("pt") ? l * 1.333 : l;
    }, o = i(t.getAttribute("width"), 1e3), r = i(t.getAttribute("height"), 750);
    return { x: 0, y: 0, width: o, height: r };
  }
  /**
   * Parcours récursif des nœuds de l'arbre SVG
   */
  static traverseElement(t, s, i) {
    var I, B, gt, It;
    const o = t.getAttribute("transform"), r = o ? s.multiply(G.parseTransform(o)) : s, n = t.tagName.toLowerCase(), a = (t.getAttribute("id") || "").toLowerCase(), l = (t.getAttribute("class") || "").toLowerCase(), h = (t.getAttribute("inkscape:label") || "").toLowerCase(), c = (((I = t.closest("g[id]")) == null ? void 0 : I.getAttribute("id")) || "").toLowerCase(), u = (((B = t.parentElement) == null ? void 0 : B.getAttribute("class")) || "").toLowerCase(), p = `${a} ${l} ${h} ${c} ${u}`, g = t.getAttribute("stroke-dasharray") || "", d = (t.getAttribute("style") || "").toLowerCase(), f = ((gt = t.closest("[stroke-dasharray]")) == null ? void 0 : gt.getAttribute("stroke-dasharray")) || "", k = !!g && g !== "none" && g !== "0" || /stroke-dasharray\s*:\s*(?!none|0)[\d\s,.]+/i.test(d) || !!f && f !== "none" && f !== "0" || /dashed|dotted/.test(d) || /pointill|tirete|dashed|dotted/.test(p) || /dimension|cotation|mesure|cote|measure|guideline|guide|axis|axe|fleche|arrow|marker|tick/i.test(p) || t.hasAttribute("marker-start") || t.hasAttribute("marker-end") || t.closest('g[id*="dimension" i], g[id*="cotation" i], g[id*="cote" i], g[id*="measure" i], g[id*="guide" i]') !== null, M = /door|porte|portillon|swing|battant/.test(p), w = /window|fenetre|vitrage|chassis|baie/.test(p), S = !k && (/wall|mur|cloison|facade|envelope|structure|enveloppe/.test(p) || !M && !w), C = /room|piece|espace|zone|area|chambre|salon|cuisine|sdb|sejour/.test(p), $ = t.getAttribute("fill") || "", _ = t.getAttribute("display"), D = t.getAttribute("visibility");
    if (!(_ === "none" || D === "hidden")) {
      switch (n) {
        case "line": {
          const R = parseFloat(t.getAttribute("x1") || "0"), W = parseFloat(t.getAttribute("y1") || "0"), j = parseFloat(t.getAttribute("x2") || "0"), z = parseFloat(t.getAttribute("y2") || "0"), rt = r.transformPoint({ x: R, y: W }), vt = r.transformPoint({ x: j, y: z });
          i.segments.push({
            start: rt,
            end: vt,
            thickness: i.defaultThickness,
            isWallHint: S && !k,
            isWindowHint: w,
            isDoorHint: M,
            isMeasurementLine: k
          });
          break;
        }
        case "polyline":
        case "polygon": {
          const W = (t.getAttribute("points") || "").trim().split(/[\s,]+/).map(parseFloat).filter((z) => !isNaN(z)), j = [];
          for (let z = 0; z < W.length; z += 2)
            z + 1 < W.length && j.push(r.transformPoint({ x: W[z], y: W[z + 1] }));
          if (j.length >= 2) {
            for (let z = 0; z < j.length - 1; z++)
              i.segments.push({
                start: j[z],
                end: j[z + 1],
                thickness: i.defaultThickness,
                isWallHint: S && !k,
                isWindowHint: w,
                isDoorHint: M,
                isMeasurementLine: k
              });
            n === "polygon" && j.length >= 3 && (i.segments.push({
              start: j[j.length - 1],
              end: j[0],
              thickness: i.defaultThickness,
              isWallHint: S && !k,
              isWindowHint: w,
              isDoorHint: M,
              isMeasurementLine: k
            }), k || i.polygons.push({
              points: j,
              isRoomHint: C,
              fill: $
            }));
          }
          break;
        }
        case "rect": {
          const R = parseFloat(t.getAttribute("x") || "0"), W = parseFloat(t.getAttribute("y") || "0"), j = parseFloat(t.getAttribute("width") || "0"), z = parseFloat(t.getAttribute("height") || "0");
          if (j > 0 && z > 0) {
            const rt = r.transformPoint({ x: R, y: W }), vt = r.transformPoint({ x: R + j, y: W }), Ft = r.transformPoint({ x: R + j, y: W + z }), Rt = r.transformPoint({ x: R, y: W + z });
            if (Math.max(j / z, z / j) >= 3 && !k)
              if (j > z) {
                const Wt = r.transformPoint({ x: R, y: W + z / 2 }), Lt = r.transformPoint({ x: R + j, y: W + z / 2 });
                i.segments.push({
                  start: Wt,
                  end: Lt,
                  thickness: i.defaultThickness,
                  isWallHint: !0,
                  isWindowHint: w,
                  isDoorHint: M,
                  isMeasurementLine: !1
                });
              } else {
                const Wt = r.transformPoint({ x: R + j / 2, y: W }), Lt = r.transformPoint({ x: R + j / 2, y: W + z });
                i.segments.push({
                  start: Wt,
                  end: Lt,
                  thickness: i.defaultThickness,
                  isWallHint: !0,
                  isWindowHint: w,
                  isDoorHint: M,
                  isMeasurementLine: !1
                });
              }
            else
              k || (i.polygons.push({
                points: [rt, vt, Ft, Rt],
                isRoomHint: C || $ !== "none" && $ !== "#000000" && $ !== "black",
                fill: $
              }), i.segments.push(
                { start: rt, end: vt, thickness: i.defaultThickness, isWallHint: S, isWindowHint: w, isDoorHint: M, isMeasurementLine: !1 },
                { start: vt, end: Ft, thickness: i.defaultThickness, isWallHint: S, isWindowHint: w, isDoorHint: M, isMeasurementLine: !1 },
                { start: Ft, end: Rt, thickness: i.defaultThickness, isWallHint: S, isWindowHint: w, isDoorHint: M, isMeasurementLine: !1 },
                { start: Rt, end: rt, thickness: i.defaultThickness, isWallHint: S, isWindowHint: w, isDoorHint: M, isMeasurementLine: !1 }
              ));
          }
          break;
        }
        case "path": {
          const R = t.getAttribute("d");
          R && this.parsePathData(
            R,
            r,
            i,
            S && !k,
            w,
            M,
            k,
            $
          );
          break;
        }
        case "text": {
          const R = parseFloat(t.getAttribute("x") || "0"), W = parseFloat(t.getAttribute("y") || "0"), j = ((It = t.textContent) == null ? void 0 : It.trim()) || "", z = /^\d+([.,]\d+)?\s*(m|cm|mm)?$/i.test(j);
          if (j.length > 0 && !z) {
            const rt = r.transformPoint({ x: R, y: W });
            i.textLabels.push({
              text: j,
              position: rt
            });
          }
          break;
        }
      }
      for (let R = 0; R < t.children.length; R++)
        this.traverseElement(t.children[R], r, i);
    }
  }
  /**
   * Parse une chaîne de commandes SVG path ('d')
   */
  static parsePathData(t, s, i, o, r, n, a, l) {
    const h = /([a-df-z])|([-+]?(?:\d*\.\d+|\d+)(?:[eE][-+]?\d+)?)/gi, c = [];
    let u;
    for (; (u = h.exec(t)) !== null; )
      c.push(u[0]);
    let p = { x: 0, y: 0 }, g = { x: 0, y: 0 }, d = [], f = 0, m = "";
    for (; f < c.length; ) {
      const x = c[f];
      /^[a-df-z]$/i.test(x) && (m = x, f++);
      const k = m === m.toLowerCase(), M = m.toUpperCase();
      switch (M) {
        case "M": {
          const w = parseFloat(c[f++]), S = parseFloat(c[f++]);
          !isNaN(w) && !isNaN(S) && (p = k ? { x: p.x + w, y: p.y + S } : { x: w, y: S }, g = { ...p }, d.length >= 3 && !a && i.polygons.push({
            points: d.map((C) => s.transformPoint(C)),
            isRoomHint: o ? !1 : l !== "none" && l !== "",
            fill: l
          }), d = [{ ...p }]);
          break;
        }
        case "L": {
          const w = parseFloat(c[f++]), S = parseFloat(c[f++]);
          if (!isNaN(w) && !isNaN(S)) {
            const C = k ? { x: p.x + w, y: p.y + S } : { x: w, y: S }, $ = s.transformPoint(p), _ = s.transformPoint(C);
            i.segments.push({
              start: $,
              end: _,
              thickness: i.defaultThickness,
              isWallHint: o && !a,
              isWindowHint: r,
              isDoorHint: n,
              isMeasurementLine: a
            }), p = C, d.push({ ...p });
          }
          break;
        }
        case "H": {
          const w = parseFloat(c[f++]);
          if (!isNaN(w)) {
            const S = k ? { x: p.x + w, y: p.y } : { x: w, y: p.y }, C = s.transformPoint(p), $ = s.transformPoint(S);
            i.segments.push({
              start: C,
              end: $,
              thickness: i.defaultThickness,
              isWallHint: o && !a,
              isWindowHint: r,
              isDoorHint: n,
              isMeasurementLine: a
            }), p = S, d.push({ ...p });
          }
          break;
        }
        case "V": {
          const w = parseFloat(c[f++]);
          if (!isNaN(w)) {
            const S = k ? { x: p.x, y: p.y + w } : { x: p.x, y: w }, C = s.transformPoint(p), $ = s.transformPoint(S);
            i.segments.push({
              start: C,
              end: $,
              thickness: i.defaultThickness,
              isWallHint: o && !a,
              isWindowHint: r,
              isDoorHint: n,
              isMeasurementLine: a
            }), p = S, d.push({ ...p });
          }
          break;
        }
        case "A": {
          const w = parseFloat(c[f++]), S = parseFloat(c[f++]);
          parseFloat(c[f++]), parseFloat(c[f++]);
          const C = parseFloat(c[f++]), $ = parseFloat(c[f++]), _ = parseFloat(c[f++]);
          if (!isNaN($) && !isNaN(_) && !isNaN(w) && !isNaN(S)) {
            const D = k ? { x: p.x + $, y: p.y + _ } : { x: $, y: _ }, I = s.transformPoint(p), B = s.transformPoint(D);
            i.arcs.push({
              start: I,
              end: B,
              rx: w,
              ry: S,
              sweepFlag: C === 1,
              isDoorHint: !0
            }), p = D, d.push({ ...p });
          }
          break;
        }
        case "C":
        case "S":
        case "Q":
        case "T": {
          const w = M === "C" ? 6 : M === "S" || M === "Q" ? 4 : 2, S = [];
          for (let _ = 0; _ < w; _++) S.push(parseFloat(c[f++]));
          const C = S[S.length - 2], $ = S[S.length - 1];
          !isNaN(C) && !isNaN($) && (p = k ? { x: p.x + C, y: p.y + $ } : { x: C, y: $ }, d.push({ ...p }));
          break;
        }
        case "Z": {
          if (d.length >= 2) {
            const w = s.transformPoint(p), S = s.transformPoint(g);
            i.segments.push({
              start: w,
              end: S,
              thickness: i.defaultThickness,
              isWallHint: o && !a,
              isWindowHint: r,
              isDoorHint: n,
              isMeasurementLine: a
            });
          }
          d.length >= 3 && !a && i.polygons.push({
            points: d.map((w) => s.transformPoint(w)),
            isRoomHint: o ? !1 : l !== "none" && l !== "",
            fill: l
          }), p = { ...g }, d = [];
          break;
        }
        default:
          f++;
          break;
      }
    }
  }
  /**
   * Transforme et consolide les segments bruts en murs réels en mètres
   */
  static convertSegmentsToWalls(t, s, i, o, r) {
    const n = [];
    for (const a of t) {
      if (a.isMeasurementLine || a.isDoorHint || a.isWindowHint) continue;
      const l = {
        x: (a.start.x - s.x) * i,
        y: (a.start.y - s.y) * i
      }, h = {
        x: (a.end.x - s.x) * i,
        y: (a.end.y - s.y) * i
      };
      y.distance(l, h) < 0.2 || n.push({
        id: `w_svg_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
        start: { x: y.roundMeters(l.x), y: y.roundMeters(l.y) },
        end: { x: y.roundMeters(h.x), y: y.roundMeters(h.y) },
        thickness: o,
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
    let s = [...t];
    for (let r = 0; r < s.length; r++)
      for (let n = r + 1; n < s.length; n++)
        for (const a of [s[r].start, s[r].end])
          for (const l of [s[n].start, s[n].end])
            y.distance(a, l) < 0.12 && (l.x = a.x, l.y = a.y);
    let i = !0, o = 0;
    for (; i && o < 5; ) {
      i = !1, o++;
      for (let r = 0; r < s.length; r++) {
        const n = s[r];
        if (n)
          for (let a = r + 1; a < s.length; a++) {
            const l = s[a];
            if (!l) continue;
            const h = n.end.x - n.start.x, c = n.end.y - n.start.y, u = Math.sqrt(h * h + c * c), p = l.end.x - l.start.x, g = l.end.y - l.start.y, d = Math.sqrt(p * p + g * g);
            if (u === 0 || d === 0) continue;
            const f = (h * p + c * g) / (u * d);
            if (Math.abs(f) > 0.995) {
              if (y.distance(n.end, l.start) < 0.05) {
                n.end = { ...l.end }, s.splice(a, 1), i = !0;
                break;
              } else if (y.distance(n.end, l.end) < 0.05) {
                n.end = { ...l.start }, s.splice(a, 1), i = !0;
                break;
              } else if (y.distance(n.start, l.end) < 0.05) {
                n.start = { ...l.start }, s.splice(a, 1), i = !0;
                break;
              } else if (y.distance(n.start, l.start) < 0.05) {
                n.start = { ...l.end }, s.splice(a, 1), i = !0;
                break;
              }
            }
          }
      }
    }
    return s;
  }
  /**
   * Détecte les portes (depuis les arcs ou segments marqués) et les fenêtres
   */
  static detectOpenings(t, s, i, o, r) {
    const n = [];
    if (i.length === 0) return n;
    for (const a of t) {
      const l = Math.max(a.rx, a.ry) * r;
      if (l < 0.5 || l > 1.4) continue;
      const h = {
        x: (a.start.x - o.x) * r,
        y: (a.start.y - o.y) * r
      }, c = {
        x: (a.end.x - o.x) * r,
        y: (a.end.y - o.y) * r
      }, u = y.snapPointToWall(h, i, 0.75), p = y.snapPointToWall(c, i, 0.75), g = u && (!p || u.distance < p.distance) ? u : p;
      if (g && g.distance < 0.7) {
        const d = y.roundMeters(Math.min(Math.max(l, 0.73), 1.1)), f = y.roundMeters(g.offset);
        n.some(
          (x) => x.wallId === g.wall.id && Math.abs(x.offset - f) < 0.35
        ) || n.push({
          id: `op_door_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
          wallId: g.wall.id,
          type: "door",
          offset: f,
          width: d,
          flipSide: !1,
          flipDirection: !1
        });
      }
    }
    for (const a of s) {
      if (!a.isWindowHint && !a.isDoorHint || a.isMeasurementLine) continue;
      const l = {
        x: (a.start.x - o.x) * r,
        y: (a.start.y - o.y) * r
      }, h = {
        x: (a.end.x - o.x) * r,
        y: (a.end.y - o.y) * r
      }, c = { x: (l.x + h.x) / 2, y: (l.y + h.y) / 2 }, u = y.distance(l, h);
      if (u < 0.4 || u > 3) continue;
      const p = y.snapPointToWall(c, i, 0.6);
      if (p && p.distance < 0.5) {
        const g = a.isDoorHint ? "door" : u > 1.8 ? "french_window" : "window", d = y.roundMeters(p.offset);
        n.some(
          (m) => m.wallId === p.wall.id && Math.abs(m.offset - d) < 0.35
        ) || n.push({
          id: `op_${g}_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
          wallId: p.wall.id,
          type: g,
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
  static detectRooms(t, s, i, o, r, n, a = !0) {
    const l = [], h = i.map((c) => ({
      text: c.text,
      position: {
        x: (c.position.x - o.x) * r,
        y: (c.position.y - o.y) * r
      }
    }));
    for (const c of t) {
      if (c.points.length < 3) continue;
      const u = c.points.map((m) => ({
        x: y.roundMeters((m.x - o.x) * r),
        y: y.roundMeters((m.y - o.y) * r)
      })), p = Z.computeArea(u);
      if (p < 1.5 || p > 300) continue;
      let g = "";
      if (a) {
        for (const m of h)
          if (Z.isPointInPolygon(m.position, u)) {
            g = m.text;
            break;
          }
      }
      if (!g && !c.isRoomHint) continue;
      const d = g || `Pièce ${l.length + 1}`, f = this.getRoomStyle(d);
      l.push({
        id: `room_svg_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
        name: d,
        polygon: u,
        areaM2: p,
        color: f.color,
        icon: f.icon,
        height: n
      });
    }
    if (l.length === 0 && h.length > 0 && s.length >= 4 && a)
      for (const c of h) {
        const u = c.text.toLowerCase();
        if (/salon|sejour|chambre|cuisine|sdb|bain|wc|bureau|entree|garage|couloir/i.test(u)) {
          const p = c.position.x, g = c.position.y, d = 1.8, f = [
            { x: y.roundMeters(p - d), y: y.roundMeters(g - d) },
            { x: y.roundMeters(p + d), y: y.roundMeters(g - d) },
            { x: y.roundMeters(p + d), y: y.roundMeters(g + d) },
            { x: y.roundMeters(p - d), y: y.roundMeters(g + d) }
          ], m = this.getRoomStyle(c.text);
          l.push({
            id: `room_svg_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
            name: c.text,
            polygon: f,
            areaM2: Z.computeArea(f),
            color: m.color,
            icon: m.icon,
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
    const s = t.toLowerCase();
    return /salon|sejour|living|sam|salle à manger/i.test(s) ? { color: "rgba(59, 130, 246, 0.28)", icon: "mdi:sofa" } : /chambre|bed|suite|parentale/i.test(s) ? { color: "rgba(139, 92, 246, 0.28)", icon: "mdi:bed" } : /cuisine|kitchen/i.test(s) ? { color: "rgba(245, 158, 11, 0.28)", icon: "mdi:silverware-fork-knife" } : /sdb|bain|douche|bath|eau/i.test(s) ? { color: "rgba(6, 182, 212, 0.28)", icon: "mdi:shower" } : /wc|toilet/i.test(s) ? { color: "rgba(16, 185, 129, 0.28)", icon: "mdi:toilet" } : /bureau|office|travail/i.test(s) ? { color: "rgba(99, 102, 241, 0.28)", icon: "mdi:desk" } : /entree|entrée|hall|couloir|degagement|dégagement/i.test(s) ? { color: "rgba(100, 116, 139, 0.28)", icon: "mdi:door" } : /garage|atelier/i.test(s) ? { color: "rgba(120, 113, 108, 0.28)", icon: "mdi:garage" } : /terrasse|balcon|patio/i.test(s) ? { color: "rgba(20, 184, 166, 0.28)", icon: "mdi:balcony" } : { color: "rgba(56, 189, 248, 0.25)", icon: "mdi:home-outline" };
  }
}
var Je = Object.defineProperty, Ze = Object.getOwnPropertyDescriptor, U = (e, t, s, i) => {
  for (var o = i > 1 ? void 0 : i ? Ze(t, s) : t, r = e.length - 1, n; r >= 0; r--)
    (n = e[r]) && (o = (i ? n(t, s, o) : n(o)) || o);
  return i && o && Je(t, s, o), o;
};
let N = class extends H {
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
  handleModalPaste(e) {
    var i;
    if (!e.clipboardData) return;
    const t = e.clipboardData.items;
    for (let o = 0; o < t.length; o++)
      if (t[o].type.indexOf("image") !== -1) {
        const r = t[o].getAsFile();
        if (r) {
          e.preventDefault(), this.processFile(r);
          return;
        }
      }
    const s = (i = e.clipboardData.getData("text/plain")) == null ? void 0 : i.trim();
    if (s && (s.startsWith("<svg") || s.startsWith("<?xml") && s.includes("<svg"))) {
      e.preventDefault(), this.processSvgText(s, "Plan SVG collé depuis le presse-papier");
      return;
    }
  }
  triggerFileInput() {
    if (!this.fileInputRef) {
      const e = document.createElement("input");
      e.type = "file", e.accept = "image/*,.svg", e.style.display = "none", e.addEventListener("change", (t) => {
        var i;
        const s = (i = t.target.files) == null ? void 0 : i[0];
        s && this.processFile(s);
      }), this.fileInputRef = e;
    }
    this.fileInputRef.click();
  }
  processFile(e) {
    if (this.imageName = e.name || "Plan importé", e.type === "image/svg+xml" || e.name.toLowerCase().endsWith(".svg")) {
      const s = new FileReader();
      s.onload = (i) => {
        var r;
        const o = (r = i.target) == null ? void 0 : r.result;
        this.processSvgText(o, e.name);
      }, s.readAsText(e);
    } else {
      this.isSvg = !1, this.svgRawText = null, this.svgInterpretResult = null;
      const s = new FileReader();
      s.onload = (i) => {
        var n;
        const o = (n = i.target) == null ? void 0 : n.result, r = new Image();
        r.onload = () => {
          this.imageDataUrl = o, this.imageWidth = r.naturalWidth, this.imageHeight = r.naturalHeight;
        }, r.src = o;
      }, s.readAsDataURL(e);
    }
  }
  processSvgText(e, t = "Plan SVG importé") {
    this.imageName = t, this.isSvg = !0, this.svgRawText = e, this.computeSvgInterpretation();
    const s = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(e);
    this.imageDataUrl = s;
    const i = new Image();
    i.onload = () => {
      var o, r;
      this.imageWidth = i.naturalWidth || ((o = this.svgInterpretResult) == null ? void 0 : o.viewBox.width) || 1e3, this.imageHeight = i.naturalHeight || ((r = this.svgInterpretResult) == null ? void 0 : r.viewBox.height) || 750;
    }, i.src = s;
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
  toggleImportCategory(e, t) {
    this.importOptions = {
      ...this.importOptions,
      [e]: t
    }, this.isSvg && this.computeSvgInterpretation();
  }
  handleDimensionChange(e) {
    this.totalWidthMeters = e > 0 ? e : 10, this.isSvg && this.computeSvgInterpretation();
  }
  handleDrop(e) {
    var t;
    if (e.preventDefault(), this.isDragOver = !1, (t = e.dataTransfer) != null && t.files && e.dataTransfer.files.length > 0) {
      const s = e.dataTransfer.files[0];
      this.processFile(s);
    }
  }
  handleDragOver(e) {
    e.preventDefault(), this.isDragOver = !0;
  }
  handleDragLeave() {
    this.isDragOver = !1;
  }
  async handlePasteButtonClick() {
    try {
      if (navigator.clipboard && navigator.clipboard.readText) {
        const e = await navigator.clipboard.readText();
        if (e && (e.trim().startsWith("<svg") || e.trim().startsWith("<?xml") && e.includes("<svg"))) {
          this.processSvgText(e.trim(), "Plan SVG collé");
          return;
        }
      }
      if (navigator.clipboard && navigator.clipboard.read) {
        const e = await navigator.clipboard.read();
        for (const t of e) {
          const s = t.types.find((i) => i.startsWith("image/"));
          if (s) {
            const i = await t.getType(s), o = new File([i], "clipboard_image.png", { type: s });
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
    var t, s, i;
    if (!this.imageDataUrl) return;
    const e = this.isSvg && this.svgImportMode === "vectorize" && !!((t = this.svgInterpretResult) != null && t.success);
    this.dispatchEvent(new CustomEvent("import-confirmed", {
      detail: {
        dataUrl: this.imageDataUrl,
        widthPx: this.imageWidth || ((s = this.svgInterpretResult) == null ? void 0 : s.viewBox.width) || 1e3,
        heightPx: this.imageHeight || ((i = this.svgInterpretResult) == null ? void 0 : i.viewBox.height) || 750,
        opacity: this.opacity,
        mode: this.calibrateMode,
        totalWidthMeters: this.totalWidthMeters,
        targetLevel: this.currentLevel,
        isSvgVectorized: e,
        svgInterpretation: e ? this.svgInterpretResult : void 0,
        keepSvgBackground: this.keepSvgBackground
      },
      bubbles: !0,
      composed: !0
    }));
  }
  render() {
    var s, i;
    const e = this.isSvg && this.svgImportMode === "vectorize" && !!((s = this.svgInterpretResult) != null && s.success), t = (i = this.svgInterpretResult) == null ? void 0 : i.stats;
    return v`
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
          ${this.imageDataUrl ? v`
            <div class="preview-card">
              <img class="preview-thumb" src="${this.imageDataUrl}" alt="Aperçu du plan" />
              <div class="preview-meta">
                <div class="preview-title">
                  <span>✅</span>
                  <span>${this.imageName || "Plan sélectionné"}</span>
                  ${this.isSvg ? v`<span class="preview-badge-svg">SVG Vectoriel</span>` : null}
                </div>
                <div class="preview-dimensions">
                  Dimensions du plan : ${this.imageWidth} × ${this.imageHeight} px
                </div>
                <button class="btn-change-image" @click=${this.triggerFileInput}>
                  🔄 Remplacer le fichier
                </button>
              </div>
            </div>
          ` : v`
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
          ${this.isSvg ? v`
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

                    ${t ? v`
                      <!-- Sélection granulaire des éléments à importer -->
                      <div class="import-categories-box" @click=${(o) => o.stopPropagation()}>
                        <div class="categories-title">Éléments à importer :</div>
                        <div class="categories-grid">
                          <label class="category-toggle ${this.importOptions.importWalls ? "active" : ""}">
                            <input 
                              type="checkbox" 
                              .checked=${this.importOptions.importWalls} 
                              @change=${(o) => this.toggleImportCategory("importWalls", o.target.checked)}
                            />
                            <span>🧱 Murs</span>
                            <span class="cat-count">(${t.wallCount})</span>
                          </label>

                          <label class="category-toggle ${this.importOptions.importDoors ? "active" : ""}">
                            <input 
                              type="checkbox" 
                              .checked=${this.importOptions.importDoors} 
                              @change=${(o) => this.toggleImportCategory("importDoors", o.target.checked)}
                            />
                            <span>🚪 Portes</span>
                            <span class="cat-count">(${t.doorCount})</span>
                          </label>

                          <label class="category-toggle ${this.importOptions.importWindows ? "active" : ""}">
                            <input 
                              type="checkbox" 
                              .checked=${this.importOptions.importWindows} 
                              @change=${(o) => this.toggleImportCategory("importWindows", o.target.checked)}
                            />
                            <span>🪟 Fenêtres</span>
                            <span class="cat-count">(${t.windowCount})</span>
                          </label>

                          <label class="category-toggle ${this.importOptions.importRooms ? "active" : ""}">
                            <input 
                              type="checkbox" 
                              .checked=${this.importOptions.importRooms} 
                              @change=${(o) => this.toggleImportCategory("importRooms", o.target.checked)}
                            />
                            <span>🏠 Pièces</span>
                            <span class="cat-count">(${t.roomCount})</span>
                          </label>

                          <label class="category-toggle ${this.importOptions.importLabels ? "active" : ""}">
                            <input 
                              type="checkbox" 
                              .checked=${this.importOptions.importLabels} 
                              @change=${(o) => this.toggleImportCategory("importLabels", o.target.checked)}
                            />
                            <span>🏷️ Noms</span>
                            <span class="cat-count">(${t.textLabelCount})</span>
                          </label>
                        </div>

                        ${t.ignoredMeasurementLinesCount > 0 ? v`
                          <div class="ignored-note">
                            ℹ️ ${t.ignoredMeasurementLinesCount} ligne(s) de cotation / pointillés ont été automatiquement ignorées (non transformées en murs).
                          </div>
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

                  ${this.calibrateMode === "auto_dimension" ? v`
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
              ${e ? null : v`
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
          ${!e || this.keepSvgBackground ? v`
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
            class="btn-confirm ${e ? "btn-magic" : ""}" 
            ?disabled=${!this.imageDataUrl} 
            @click=${this.confirmImport}
          >
            ${e ? v`
              <span>✨</span>
              <span>Convertir le plan SVG (${(t == null ? void 0 : t.wallCount) || 0} murs)</span>
            ` : v`
              <span>🚀</span>
              <span>Charger le plan</span>
            `}
          </button>
        </div>
      </div>
    `;
  }
};
N.styles = K`
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
U([
  P({ type: String })
], N.prototype, "currentLevel", 2);
U([
  b()
], N.prototype, "imageDataUrl", 2);
U([
  b()
], N.prototype, "imageWidth", 2);
U([
  b()
], N.prototype, "imageHeight", 2);
U([
  b()
], N.prototype, "imageName", 2);
U([
  b()
], N.prototype, "isSvg", 2);
U([
  b()
], N.prototype, "svgRawText", 2);
U([
  b()
], N.prototype, "svgInterpretResult", 2);
U([
  b()
], N.prototype, "svgImportMode", 2);
U([
  b()
], N.prototype, "keepSvgBackground", 2);
U([
  b()
], N.prototype, "importOptions", 2);
U([
  b()
], N.prototype, "calibrateMode", 2);
U([
  b()
], N.prototype, "totalWidthMeters", 2);
U([
  b()
], N.prototype, "opacity", 2);
U([
  b()
], N.prototype, "isDragOver", 2);
N = U([
  J("home-architect-import-modal")
], N);
var Qe = Object.defineProperty, ts = Object.getOwnPropertyDescriptor, ut = (e, t, s, i) => {
  for (var o = i > 1 ? void 0 : i ? ts(t, s) : t, r = e.length - 1, n; r >= 0; r--)
    (n = e[r]) && (o = (i ? n(t, s, o) : n(o)) || o);
  return i && o && Qe(t, s, o), o;
};
let tt = class extends H {
  constructor() {
    super(...arguments), this.measuredMeters = 0, this.wallCount = 0, this.roomCount = 0, this.openingCount = 0, this.targetMeters = 0, this.adjustBackground = !0;
  }
  connectedCallback() {
    super.connectedCallback(), this.targetMeters = this.measuredMeters;
  }
  handleInputChange(e) {
    const t = parseFloat(e.target.value);
    this.targetMeters = isNaN(t) ? 0 : t;
  }
  close() {
    this.dispatchEvent(new CustomEvent("close", { bubbles: !0, composed: !0 }));
  }
  confirm() {
    if (this.targetMeters <= 0 || this.measuredMeters <= 0) return;
    const e = this.targetMeters / this.measuredMeters;
    this.dispatchEvent(new CustomEvent("rescale-confirmed", {
      detail: {
        currentMeters: this.measuredMeters,
        targetMeters: this.targetMeters,
        scaleFactor: e,
        adjustBackground: this.adjustBackground
      },
      bubbles: !0,
      composed: !0
    }));
  }
  render() {
    const e = this.measuredMeters > 0 && this.targetMeters > 0 ? this.targetMeters / this.measuredMeters : 1, t = (e - 1) * 100, s = this.targetMeters > 0 && Math.abs(e - 1) > 1e-4;
    return v`
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
            <span class="ratio-pill ${e > 1.001 ? "ratio-expand" : e < 0.999 ? "ratio-shrink" : "ratio-neutral"}">
              × ${e.toFixed(3)} (${t >= 0 ? "+" : ""}${t.toFixed(1)}%)
            </span>
          </div>

          <div class="impact-list">
            <div class="impact-item">
              <span class="impact-icon">🧱</span>
              <span><strong>${this.wallCount} murs</strong> : toutes les longueurs et cotes seront recalculées</span>
            </div>
            ${this.openingCount > 0 ? v`
              <div class="impact-item">
                <span class="impact-icon">🚪</span>
                <span><strong>${this.openingCount} ouvertures</strong> : positions ajustées proportionnellement</span>
              </div>
            ` : null}
            ${this.roomCount > 0 ? v`
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
            ?disabled=${!s} 
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
tt.styles = K`
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
ut([
  P({ type: Number })
], tt.prototype, "measuredMeters", 2);
ut([
  P({ type: Number })
], tt.prototype, "wallCount", 2);
ut([
  P({ type: Number })
], tt.prototype, "roomCount", 2);
ut([
  P({ type: Number })
], tt.prototype, "openingCount", 2);
ut([
  b()
], tt.prototype, "targetMeters", 2);
ut([
  b()
], tt.prototype, "adjustBackground", 2);
tt = ut([
  J("home-architect-rescale-modal")
], tt);
class kt {
  /**
   * Calcule la boîte englobante exacte du plan (murs, pièces, entités, image de fond)
   */
  static calculateBoundingBox(t, s) {
    const i = t.pixelsPerMeter || 50, o = [];
    for (const m of t.walls)
      o.push(m.start, m.end);
    for (const m of t.rooms)
      m.polygon && m.polygon.length > 0 && o.push(...m.polygon);
    for (const m of t.bindings)
      m.position && o.push(m.position);
    if (t.background && t.background.imageUrl && t.background.visible) {
      const m = t.background, x = m.offset || { x: 0, y: 0 }, k = m.scale || 1, M = (m.widthPx || 1200) * k / i, w = (m.heightPx || 900) * k / i;
      o.push(
        { x: x.x, y: x.y },
        { x: x.x + M, y: x.y + w }
      );
    }
    if (o.length === 0)
      return {
        minX: -1,
        minY: -1,
        width: 12,
        height: 8,
        ppm: i
      };
    let r = Math.min(...o.map((m) => m.x)), n = Math.max(...o.map((m) => m.x)), a = Math.min(...o.map((m) => m.y)), l = Math.max(...o.map((m) => m.y));
    const h = n - r || 5, c = l - a || 5, u = s !== void 0 ? s : Math.max(0.6, Math.max(h, c) * 0.05), p = r - u, g = a - u, d = n - r + u * 2, f = l - a + u * 2;
    return {
      minX: p,
      minY: g,
      width: d,
      height: f,
      ppm: i
    };
  }
  /**
   * Convertit un point monde en coordonnées de pourcentage (0% à 100%)
   * strictement compatible avec la carte Lovelace picture-elements de Home Assistant
   */
  static worldToPercentage(t, s) {
    const i = (t.x - s.minX) / s.width * 100, o = (t.y - s.minY) / s.height * 100;
    return {
      left: Math.round(i * 10) / 10,
      top: Math.round(o * 10) / 10
    };
  }
  /**
   * Génère un document SVG vectoriel autonome et complet représentant le plan
   */
  static exportToSvg(t, s) {
    var u, p, g;
    const i = {
      includeRooms: !0,
      includeWalls: !0,
      includeOpenings: !0,
      includeRoomLabels: !0,
      includeEntityMarkers: !1,
      includeBackground: !0,
      backgroundColor: "#0f172a",
      ...s
    }, o = this.calculateBoundingBox(t, i.paddingMeters), r = o.ppm, n = (o.minX * r).toFixed(1), a = (o.minY * r).toFixed(1), l = Math.max(100, Math.round(o.width * r)), h = Math.max(100, Math.round(o.height * r));
    let c = "";
    if (i.backgroundColor && i.backgroundColor !== "transparent" && (c += `  <rect x="${n}" y="${a}" width="${l}" height="${h}" fill="${i.backgroundColor}" />
`), i.includeBackground !== !1 && ((u = t.background) != null && u.imageUrl) && t.background.visible) {
      const d = t.background, f = (((p = d.offset) == null ? void 0 : p.x) || 0) * r, m = (((g = d.offset) == null ? void 0 : g.y) || 0) * r, x = d.scale || 1, k = (d.widthPx || 1200) * x, M = (d.heightPx || 900) * x;
      c += `  <!-- Image de fond du plan d'origine -->
`, c += `  <image href="${d.imageUrl}" x="${f.toFixed(1)}" y="${m.toFixed(1)}" width="${k.toFixed(1)}" height="${M.toFixed(1)}" opacity="${d.opacity || 0.6}" />
`;
    }
    if (i.includeRooms && t.rooms.length > 0) {
      c += `  <!-- Pièces -->
  <g id="rooms">
`;
      for (const d of t.rooms) {
        if (!d.polygon || d.polygon.length < 3) continue;
        const f = d.polygon.map((x) => `${(x.x * r).toFixed(1)},${(x.y * r).toFixed(1)}`).join(" "), m = d.color || "rgba(56, 189, 248, 0.12)";
        c += `    <polygon points="${f}" fill="${m}" stroke="rgba(56, 189, 248, 0.4)" stroke-width="1.5" />
`;
      }
      c += `  </g>
`;
    }
    if (i.includeWalls && t.walls.length > 0) {
      c += `  <!-- Murs -->
  <g id="walls">
`;
      for (const d of t.walls) {
        const m = this.computeWallPolygon(d.start, d.end, d.thickness).map((x) => `${(x.x * r).toFixed(1)},${(x.y * r).toFixed(1)}`).join(" ");
        c += `    <polygon points="${m}" fill="#334155" stroke="#64748b" stroke-width="1" />
`;
      }
      c += `  </g>
`;
    }
    if (i.includeOpenings && t.openings.length > 0) {
      c += `  <!-- Portes & Fenêtres -->
  <g id="openings">
`;
      for (const d of t.openings) {
        const f = t.walls.find((D) => D.id === d.wallId);
        if (!f) continue;
        const m = f.end.x - f.start.x, x = f.end.y - f.start.y, k = Math.sqrt(m * m + x * x);
        if (k === 0) continue;
        const w = (Math.atan2(x, m) * 180 / Math.PI).toFixed(1), S = (f.start.x + d.offset / k * m) * r, C = (f.start.y + d.offset / k * x) * r, $ = d.width * r, _ = f.thickness * r;
        if (c += `    <g transform="translate(${S.toFixed(1)}, ${C.toFixed(1)}) rotate(${w})">
`, c += `      <rect x="${(-$ / 2).toFixed(1)}" y="${(-_ / 2 - 1).toFixed(1)}" width="${$.toFixed(1)}" height="${(_ + 2).toFixed(1)}" fill="${i.backgroundColor || "#0f172a"}" />
`, d.type === "door") {
          const D = $ / 2, I = d.flipSide ? -1 : 1, B = d.flipDirection ? D : -D, gt = d.flipDirection ? -1 : 1;
          c += `      <rect x="${-D}" y="${-_ / 2}" width="4" height="${_}" fill="#94a3b8" />
`, c += `      <rect x="${D - 4}" y="${-_ / 2}" width="4" height="${_}" fill="#94a3b8" />
`, c += `      <line x1="${B}" y1="0" x2="${B}" y2="${I * $}" stroke="#38bdf8" stroke-width="2" stroke-linecap="round" />
`, c += `      <path d="M ${B + gt * $} 0 A ${$} ${$} 0 0 ${I > 0 ? d.flipDirection ? 0 : 1 : d.flipDirection ? 1 : 0} ${B} ${I * $}" fill="rgba(56, 189, 248, 0.08)" stroke="#38bdf8" stroke-width="1.2" stroke-dasharray="3, 3" />
`;
        } else if (d.type === "french_window") {
          const D = $ / 2;
          c += `      <rect x="${(-D).toFixed(1)}" y="${(-_ / 2).toFixed(1)}" width="${$.toFixed(1)}" height="${_.toFixed(1)}" fill="none" stroke="#94a3b8" stroke-width="2" />
`, c += `      <rect x="${(-D).toFixed(1)}" y="${(-_ / 4).toFixed(1)}" width="${D.toFixed(1)}" height="3" fill="#38bdf8" />
`, c += `      <rect x="0" y="${(_ / 4).toFixed(1)}" width="${D.toFixed(1)}" height="3" fill="#38bdf8" />
`;
        } else {
          const D = $ / 2, I = d.sashCount === 2 || d.width >= 1.25;
          c += `      <rect x="${(-D).toFixed(1)}" y="${(-_ / 2).toFixed(1)}" width="${$.toFixed(1)}" height="${_.toFixed(1)}" fill="none" stroke="#94a3b8" stroke-width="2" />
`, c += `      <line x1="${(-D).toFixed(1)}" y1="0" x2="${D.toFixed(1)}" y2="0" stroke="#38bdf8" stroke-width="1.5" />
`, I && (c += `      <line x1="0" y1="${(-_ / 2).toFixed(1)}" x2="0" y2="${(_ / 2).toFixed(1)}" stroke="#38bdf8" stroke-width="2" />
`);
        }
        c += `    </g>
`;
      }
      c += `  </g>
`;
    }
    if (i.includeRoomLabels && t.rooms.length > 0) {
      c += `  <!-- Étiquettes de Pièces -->
  <g id="room-labels">
`;
      for (const d of t.rooms) {
        if (!d.polygon || d.polygon.length < 3) continue;
        const f = Z.calculateCentroid(d.polygon), m = (f.x * r).toFixed(1), x = (f.y * r).toFixed(1);
        c += `    <g transform="translate(${m}, ${x})">
`, c += `      <text y="-6" fill="#f8fafc" font-size="13" font-weight="700" text-anchor="middle">${this.escapeXml(d.name)}</text>
`, c += `      <text y="12" fill="#38bdf8" font-size="11" font-weight="600" text-anchor="middle" font-family="monospace">${d.areaM2.toFixed(1)} m²</text>
`, c += `    </g>
`;
      }
      c += `  </g>
`;
    }
    if (i.includeEntityMarkers && t.bindings.length > 0) {
      c += `  <!-- Emplacements des Entités -->
  <g id="entity-markers">
`;
      for (const d of t.bindings) {
        const f = (d.position.x * r).toFixed(1), m = (d.position.y * r).toFixed(1), x = d.icon || "⚡", k = d.customName || d.entityId.split(".")[1];
        c += `    <g transform="translate(${f}, ${m})">
`, c += `      <circle cx="0" cy="0" r="16" fill="rgba(30, 41, 59, 0.85)" stroke="#38bdf8" stroke-width="1.5" />
`, c += `      <text x="0" y="5" font-size="12" text-anchor="middle">${this.escapeXml(x)}</text>
`, c += `      <text x="0" y="26" fill="#f1f5f9" font-size="10" font-weight="600" text-anchor="middle">${this.escapeXml(k)}</text>
`, c += `    </g>
`;
      }
      c += `  </g>
`;
    }
    return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="${n} ${a} ${l} ${h}" width="${l}" height="${h}" style="background-color: ${i.backgroundColor || "#0f172a"}; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 100%; height: auto;">
${c}</svg>`;
  }
  static computeWallPolygon(t, s, i) {
    const o = s.x - t.x, r = s.y - t.y, n = Math.sqrt(o * o + r * r);
    if (n === 0) return [t, t, s, s];
    const a = i / 2, l = -r / n * a, h = o / n * a;
    return [
      { x: t.x + l, y: t.y + h },
      { x: s.x + l, y: s.y + h },
      { x: s.x - l, y: s.y - h },
      { x: t.x - l, y: t.y - h }
    ];
  }
  static escapeXml(t) {
    return t.replace(/[<>&'"]/g, (s) => {
      switch (s) {
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
          return s;
      }
    });
  }
}
class ae {
  /**
   * Génère la configuration YAML complète de la carte native 'picture-elements' de Home Assistant
   */
  static generatePictureElementsYaml(t, s) {
    let i = (s == null ? void 0 : s.imagePath) || `/local/plan_${t.id || "rdc"}.svg`;
    if (s != null && s.embedDataUri && (s != null && s.svgContent))
      try {
        i = `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(s.svgContent)))}`;
      } catch {
        i = s.imagePath || `/local/plan_${t.id || "rdc"}.svg`;
      }
    const o = {
      title: t.name || "Plan Interactif",
      ...s,
      imagePath: i
    }, r = kt.calculateBoundingBox(t), n = t.bindings || [];
    let a = `# ========================================================
`;
    if (a += `# CARTE LOVELACE PICTURE-ELEMENTS (NATIVE HOME ASSISTANT)
`, a += `# Générée automatiquement par DomoLink Plan / Home Architect
`, a += `# ========================================================
`, a += `type: picture-elements
`, a += `title: "${o.title}"
`, a += `image: "${o.imagePath}"
`, a += `elements:
`, n.length === 0)
      return a += `  # Aucune entité liée pour le moment. Glissez-déposez des entités sur le plan !
`, a;
    for (const l of n) {
      const h = l.position || { x: 0, y: 0 }, { left: c, top: u } = kt.worldToPercentage(h, r), p = l.entityId, g = p.split(".")[0], d = l.customName || p.split(".")[1].replace(/_/g, " ");
      if (g === "light")
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
      else if (g === "binary_sensor") {
        const f = p.includes("presence") || p.includes("occupancy") || p.includes("radar") || p.includes("motion") || p.includes("mouvement");
        a += `  # 📡 ${f ? "Radar de Présence" : "Capteur"} : ${d}
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
      } else if (g === "sensor") {
        const f = p.includes("temp") || p.includes("temperature");
        a += `  # ${f ? "🌡️ Température" : "📊 Capteur"} : ${d}
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
      } else g === "climate" ? (a += `  # ❄️ Climatisation / Thermostat : ${d}
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

`) : g === "switch" ? (a += `  # 🔌 Interrupteur / Prise : ${d}
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
  static generateHomeArchitectCardYaml(t, s) {
    const i = {
      viewMode: "2d",
      title: t.name || "Plan de Maison",
      height: "520px",
      ...s
    };
    let o = `# ========================================================
`;
    return o += `# CARTE LOVELACE PERSONNALISÉE (HOME ARCHITECT CARD)
`, o += `# Rendu vectoriel direct 2D / 3D, états et clics en direct
`, o += `# ========================================================
`, o += `type: custom:home-architect-card
`, o += `project_id: "${t.id || "rdc"}"
`, o += `title: "${i.title}"
`, o += `view_mode: ${i.viewMode || "2d"} # '2d' ou '3d'
`, o += `show_header: true
`, o += `height: "${i.height}"
`, o;
  }
}
var es = Object.defineProperty, ss = Object.getOwnPropertyDescriptor, Q = (e, t, s, i) => {
  for (var o = i > 1 ? void 0 : i ? ss(t, s) : t, r = e.length - 1, n; r >= 0; r--)
    (n = e[r]) && (o = (i ? n(t, s, o) : n(o)) || o);
  return i && o && es(t, s, o), o;
};
let Y = class extends H {
  constructor() {
    super(...arguments), this.activeTab = "picture_elements", this.imagePath = "", this.customCardViewMode = "2d", this.copiedToast = !1, this.syncStatus = "idle", this.syncErrorMsg = "", this.embedDataUri = !1;
  }
  connectedCallback() {
    var e;
    super.connectedCallback(), this.imagePath = `/local/plan_${((e = this.project) == null ? void 0 : e.id) || "rdc"}.svg`, this.autoSyncSvg();
  }
  async autoSyncSvg() {
    var e, t;
    if (!((e = this.hass) != null && e.callWS)) {
      this.syncStatus = "idle";
      return;
    }
    this.syncStatus = "syncing";
    try {
      const s = kt.exportToSvg(this.project, {
        includeRooms: !0,
        includeWalls: !0,
        includeOpenings: !0,
        includeRoomLabels: !0,
        includeEntityMarkers: !1,
        includeBackground: !0,
        backgroundColor: "#0f172a"
      }), i = `plan_${((t = this.project) == null ? void 0 : t.id) || "rdc"}.svg`, o = await this.hass.callWS({
        type: "home_architect/save_svg_to_www",
        filename: i,
        svg_content: s
      });
      o && o.success ? this.syncStatus = "success" : (this.syncStatus = "error", this.syncErrorMsg = "Erreur lors de la sauvegarde sur le serveur");
    } catch (s) {
      console.warn("Home Architect auto-sync to www failed:", s), this.syncStatus = "error", this.syncErrorMsg = (s == null ? void 0 : s.message) || String(s);
    }
  }
  handleClose() {
    this.dispatchEvent(new CustomEvent("close", { bubbles: !0, composed: !0 }));
  }
  copyCode(e) {
    const t = () => {
      this.copiedToast = !0, setTimeout(() => {
        this.copiedToast = !1;
      }, 2500);
    };
    navigator.clipboard && typeof navigator.clipboard.writeText == "function" ? navigator.clipboard.writeText(e).then(t).catch((s) => {
      console.warn("navigator.clipboard.writeText rejected, attempting fallback:", s), this.copyFallback(e, t);
    }) : this.copyFallback(e, t);
  }
  copyFallback(e, t) {
    try {
      const s = document.createElement("textarea");
      s.value = e, s.style.position = "fixed", s.style.top = "0", s.style.left = "0", s.style.width = "2em", s.style.height = "2em", s.style.padding = "0", s.style.border = "none", s.style.outline = "none", s.style.boxShadow = "none", s.style.background = "transparent", s.style.opacity = "0", document.body.appendChild(s), s.focus(), s.select();
      const i = document.execCommand("copy");
      document.body.removeChild(s), i ? t() : prompt("Copiez le code YAML ci-dessous :", e);
    } catch (s) {
      console.error("Fallback copy failed:", s), prompt("Copiez le code YAML ci-dessous :", e);
    }
  }
  downloadSvg() {
    const e = kt.exportToSvg(this.project, {
      includeRooms: !0,
      includeWalls: !0,
      includeOpenings: !0,
      includeRoomLabels: !0,
      includeEntityMarkers: !1,
      includeBackground: !0,
      backgroundColor: "#0f172a"
    }), t = new Blob([e], { type: "image/svg+xml;charset=utf-8" }), s = URL.createObjectURL(t), i = document.createElement("a");
    i.href = s, i.download = `plan_${this.project.id || "rdc"}.svg`, document.body.appendChild(i), i.click(), document.body.removeChild(i), URL.revokeObjectURL(s);
  }
  downloadJson() {
    const e = JSON.stringify(this.project, null, 2), t = new Blob([e], { type: "application/json;charset=utf-8" }), s = URL.createObjectURL(t), i = document.createElement("a");
    i.href = s, i.download = `projet_plan_${this.project.id || "rdc"}.json`, document.body.appendChild(i), i.click(), document.body.removeChild(i), URL.revokeObjectURL(s);
  }
  getEntitySummary() {
    var n, a, l;
    const e = ((n = this.project) == null ? void 0 : n.bindings) || [], t = e.filter((h) => h.entityId.startsWith("light.")).length, s = e.filter((h) => h.entityId.startsWith("binary_sensor.")).length, i = e.filter((h) => h.entityId.startsWith("sensor.") || h.entityId.startsWith("climate.")).length, o = e.filter((h) => h.entityId.startsWith("switch.")).length, r = ((l = (a = this.project) == null ? void 0 : a.rooms) == null ? void 0 : l.length) || 0;
    return { lights: t, radars: s, sensors: i, switches: o, rooms: r, total: e.length };
  }
  render() {
    var o, r, n;
    const e = this.getEntitySummary(), t = kt.exportToSvg(this.project, {
      includeRooms: !0,
      includeWalls: !0,
      includeOpenings: !0,
      includeRoomLabels: !0,
      includeEntityMarkers: !1,
      includeBackground: !0,
      backgroundColor: "#0f172a"
    }), s = ae.generatePictureElementsYaml(this.project, {
      imagePath: this.imagePath,
      title: this.project.name || "Plan Interactif",
      embedDataUri: this.embedDataUri,
      svgContent: t
    }), i = ae.generateHomeArchitectCardYaml(this.project, {
      viewMode: this.customCardViewMode,
      title: this.project.name || "Plan de Maison"
    });
    return v`
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
              <span><strong>${e.rooms}</strong> pièces</span>
            </div>
            <div class="stat-badge">
              <span>💡</span>
              <span><strong>${e.lights}</strong> lumière(s)</span>
            </div>
            <div class="stat-badge">
              <span>📡</span>
              <span><strong>${e.radars}</strong> radar(s) / présence</span>
            </div>
            <div class="stat-badge">
              <span>🌡️</span>
              <span><strong>${e.sensors}</strong> capteur(s) / temp.</span>
            </div>
            <div class="stat-badge">
              <span>🔌</span>
              <span><strong>${e.switches}</strong> prise(s) / switch</span>
            </div>
          </div>

          <!-- Onglet 1 : Carte Native picture-elements -->
          ${this.activeTab === "picture_elements" ? v`
            <!-- Bannière de synchronisation avec HA -->
            ${this.syncStatus === "success" ? v`
              <div class="sync-banner success">
                <span class="sync-icon">✅</span>
                <div class="sync-text">
                  <div class="sync-title">Plan synchronisé directement sur votre serveur Home Assistant !</div>
                  <div class="sync-desc">
                    Le fichier vectoriel avec ses dimensions calibrées est écrit dans <code>/config/www/plan_${((o = this.project) == null ? void 0 : o.id) || "rdc"}.svg</code>.<br/>
                    Accessible immédiatement par Lovelace via <code>${this.imagePath}</code>. Aucun transfert de fichier requis !
                  </div>
                </div>
                <button class="btn-refresh-sync" @click=${this.autoSyncSvg} title="Mettre à jour le fichier SVG sur le serveur">
                  🔄 Re-synchroniser
                </button>
              </div>
            ` : this.syncStatus === "syncing" ? v`
              <div class="sync-banner syncing">
                <span class="sync-icon">⏳</span>
                <div class="sync-text">
                  <div class="sync-title">Synchronisation automatique en cours avec Home Assistant...</div>
                  <div class="sync-desc">Enregistrement direct dans <code>/config/www/plan_${((r = this.project) == null ? void 0 : r.id) || "rdc"}.svg</code>.</div>
                </div>
              </div>
            ` : this.syncStatus === "error" ? v`
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
            ` : v`
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

            ${this.embedDataUri ? null : v`
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
            <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 6px;">
              <span style="font-size: 0.9rem; font-weight: 700; color: #38bdf8; display: flex; align-items: center; gap: 6px;">
                <span>📋</span>
                <span>Code Lovelace prêt à coller :</span>
              </span>
              <button 
                class="btn-action ${this.copiedToast ? "emerald" : ""}" 
                style="padding: 8px 18px; font-size: 0.88rem; font-weight: 700;"
                @click=${() => this.copyCode(s)}
              >
                <span>${this.copiedToast ? "✅ Copié !" : "📋 Copier le YAML"}</span>
              </button>
            </div>

            <div class="code-container">
              <div class="code-header">
                <span>Code YAML Picture-Elements</span>
                <button 
                  class="btn-copy ${this.copiedToast ? "copied" : ""}" 
                  @click=${() => this.copyCode(s)}
                >
                  <span>${this.copiedToast ? "✓ Copié !" : "📋 Copier le YAML"}</span>
                </button>
              </div>
              <pre class="code-box"><code>${s}</code></pre>
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
                  ${this.syncStatus === "success" ? v`Le fichier SVG est <strong>déjà présent sur votre serveur Home Assistant</strong> (aucun transfert requis !).` : this.embedDataUri ? v`Le plan est <strong>100% intégré dans le YAML</strong> (aucun fichier externe n'est requis).` : v`Assurez-vous que le fichier <code>plan_${((n = this.project) == null ? void 0 : n.id) || "rdc"}.svg</code> est présent dans <code>/config/www/</code>.`}
                </div>
              </div>
              <div class="guide-step">
                <span class="guide-num">2</span>
                <div>
                  Cliquez sur <strong>Copier le YAML dans le presse-papier</strong>.
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
          ${this.activeTab === "custom_card" ? v`
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

            <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 6px;">
              <span style="font-size: 0.9rem; font-weight: 700; color: #c084fc; display: flex; align-items: center; gap: 6px;">
                <span>📋</span>
                <span>Code Lovelace prêt à coller :</span>
              </span>
              <button 
                class="btn-action ${this.copiedToast ? "emerald" : "purple"}" 
                style="padding: 8px 18px; font-size: 0.88rem; font-weight: 700;"
                @click=${() => this.copyCode(i)}
              >
                <span>${this.copiedToast ? "✅ Copié !" : "📋 Copier le YAML"}</span>
              </button>
            </div>

            <!-- Bloc de code YAML -->
            <div class="code-container">
              <div class="code-header">
                <span>Code Lovelace YAML</span>
                <button 
                  class="btn-copy ${this.copiedToast ? "copied" : ""}" 
                  @click=${() => this.copyCode(i)}
                >
                  <span>${this.copiedToast ? "✓ Copié !" : "📋 Copier le YAML"}</span>
                </button>
              </div>
              <pre class="code-box"><code>${i}</code></pre>
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
          ${this.activeTab === "raw_files" ? v`
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

        <!-- Notification Toast Flottante -->
        ${this.copiedToast ? v`
          <div class="copy-floating-toast">
            <span>✅</span>
            <span>Code YAML copié dans le presse-papier !</span>
          </div>
        ` : null}

        <!-- Pied de page -->
        <div class="modal-footer">
          <button class="btn-secondary" @click=${this.handleClose}>Fermer</button>
          ${this.activeTab !== "raw_files" ? v`
            <button 
              class="btn-action ${this.copiedToast ? "emerald" : this.activeTab === "custom_card" ? "purple" : ""}" 
              style="padding: 10px 22px; font-size: 0.92rem; font-weight: 700; display: inline-flex; align-items: center; gap: 8px; box-shadow: 0 4px 15px rgba(2, 132, 199, 0.4);"
              @click=${() => this.copyCode(this.activeTab === "picture_elements" ? s : i)}
            >
              <span>📋</span>
              <span>${this.copiedToast ? "✅ Copié dans le presse-papier !" : "Copier le YAML dans le presse-papier"}</span>
            </button>
          ` : null}
        </div>
      </div>
    `;
  }
};
Y.styles = K`
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

    /* Notification flottante de copie */
    .copy-floating-toast {
      position: absolute;
      top: 18px;
      left: 50%;
      transform: translateX(-50%);
      background: #059669;
      border: 1px solid #10b981;
      color: #ffffff;
      padding: 10px 22px;
      border-radius: 12px;
      font-size: 0.9rem;
      font-weight: 700;
      display: flex;
      align-items: center;
      gap: 10px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.7), 0 0 20px rgba(16, 185, 129, 0.5);
      z-index: 200;
      animation: popToast 0.25s ease-out;
      pointer-events: none;
    }

    @keyframes popToast {
      from { transform: translate(-50%, -10px); opacity: 0; }
      to { transform: translate(-50%, 0); opacity: 1; }
    }
  `;
Q([
  P({ type: Object })
], Y.prototype, "project", 2);
Q([
  P({ type: Object })
], Y.prototype, "hass", 2);
Q([
  b()
], Y.prototype, "activeTab", 2);
Q([
  b()
], Y.prototype, "imagePath", 2);
Q([
  b()
], Y.prototype, "customCardViewMode", 2);
Q([
  b()
], Y.prototype, "copiedToast", 2);
Q([
  b()
], Y.prototype, "syncStatus", 2);
Q([
  b()
], Y.prototype, "syncErrorMsg", 2);
Q([
  b()
], Y.prototype, "embedDataUri", 2);
Y = Q([
  J("home-architect-export-modal")
], Y);
var is = Object.defineProperty, os = Object.getOwnPropertyDescriptor, F = (e, t, s, i) => {
  for (var o = i > 1 ? void 0 : i ? os(t, s) : t, r = e.length - 1, n; r >= 0; r--)
    (n = e[r]) && (o = (i ? n(t, s, o) : n(o)) || o);
  return i && o && is(t, s, o), o;
};
let A = class extends H {
  constructor() {
    super(...arguments), this.narrow = !1, this.activeTool = "wall", this.currentThickness = 0.2, this.currentOpeningWidth = 0.9, this.doorFlipSide = !1, this.doorFlipDirection = !0, this.windowSashCount = 1, this.activeLevel = "rdc", this.is3DMode = !1, this.isDrawerCollapsed = !1, this.isWizardOpen = !1, this.isImportModalOpen = !1, this.isExportModalOpen = !1, this.isCalibrateModalOpen = !1, this.calibrationData = null, this.isRescaleModalOpen = !1, this.rescaleMeasuredMeters = 0, this.selectedRoomForEdit = null, this.selectedElements = {
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
  handleToolSelected(e) {
    this.activeTool = e.detail.tool, this.activeTool === "door" ? this.currentOpeningWidth = 0.9 : this.activeTool === "window" ? this.currentOpeningWidth = this.windowSashCount === 2 ? 1.4 : 0.9 : this.activeTool === "french_window" && (this.currentOpeningWidth = 2);
  }
  handleDoorConfigChanged(e) {
    if (this.doorFlipSide = e.detail.flipSide, this.doorFlipDirection = e.detail.flipDirection, this.activeTool = "door", this.selectedElements.openingIds.length > 0) {
      this.pushUndoSnapshot();
      let t = 0;
      const s = this.project.openings.map((i) => this.selectedElements.openingIds.includes(i.id) && i.type === "door" ? (t++, { ...i, flipSide: e.detail.flipSide, flipDirection: e.detail.flipDirection }) : i);
      t > 0 && (this.project = { ...this.project, openings: s }, this.showToast(`🚪 ${t} porte(s) mise(s) à jour`));
    }
  }
  handleWindowConfigChanged(e) {
    if (this.activeTool = e.detail.type, this.currentOpeningWidth = e.detail.width, this.windowSashCount = e.detail.sashCount, this.selectedElements.openingIds.length > 0) {
      this.pushUndoSnapshot();
      let t = 0;
      const s = this.project.openings.map((i) => this.selectedElements.openingIds.includes(i.id) && (i.type === "window" || i.type === "french_window") ? (t++, {
        ...i,
        type: e.detail.type,
        width: e.detail.width,
        sashCount: e.detail.sashCount
      }) : i);
      t > 0 && (this.project = { ...this.project, openings: s }, this.showToast(`🪟 ${t} fenêtre(s) mise(s) à jour`));
    }
  }
  handleWallThicknessChanged(e) {
    if (this.currentThickness = e.detail.thickness, this.activeTool = "wall", this.selectedElements.wallIds.length > 0) {
      this.pushUndoSnapshot();
      const t = this.project.walls.map((s) => this.selectedElements.wallIds.includes(s.id) ? { ...s, thickness: e.detail.thickness } : s);
      this.project = { ...this.project, walls: t }, this.showToast(`🧱 Épaisseur de ${this.selectedElements.wallIds.length} mur(s) mise à jour (${Math.round(e.detail.thickness * 100)} cm)`);
    }
  }
  updateSelectedDoorConfig(e, t) {
    this.pushUndoSnapshot(), this.doorFlipSide = e, this.doorFlipDirection = t;
    const s = this.project.openings.map((i) => this.selectedElements.openingIds.includes(i.id) && i.type === "door" ? { ...i, flipSide: e, flipDirection: t } : i);
    this.project = { ...this.project, openings: s }, this.showToast("🚪 Sens d'ouverture de porte mis à jour");
  }
  updateSelectedWindowConfig(e, t, s) {
    this.pushUndoSnapshot(), this.windowSashCount = t, this.currentOpeningWidth = s;
    const i = this.project.openings.map((o) => this.selectedElements.openingIds.includes(o.id) && (o.type === "window" || o.type === "french_window") ? { ...o, type: e, sashCount: t, width: s } : o);
    this.project = { ...this.project, openings: i }, this.showToast("🪟 Format de fenêtre mis à jour");
  }
  updateSelectedWallsThickness(e) {
    this.pushUndoSnapshot(), this.currentThickness = e;
    const t = this.project.walls.map((s) => this.selectedElements.wallIds.includes(s.id) ? { ...s, thickness: e } : s);
    this.project = { ...this.project, walls: t }, this.showToast(`🧱 Épaisseur de mur mise à jour (${Math.round(e * 100)} cm)`);
  }
  handleProjectChanged(e) {
    this.pushUndoSnapshot(), this.project = { ...e.detail.project };
  }
  handleThicknessChange(e) {
    this.currentThickness = parseFloat(e.target.value);
  }
  handleOpeningWidthChange(e) {
    this.currentOpeningWidth = parseFloat(e.target.value);
  }
  handleCreateRoomFromWizard(e) {
    this.pushUndoSnapshot();
    const { name: t, width: s, length: i, thickness: o, height: r, color: n, icon: a, addDoor: l, addWindow: h } = e.detail, c = r || 2.5, u = 2, p = 2, g = { x: u, y: p }, d = { x: u + s, y: p }, f = { x: u + s, y: p + i }, m = { x: u, y: p + i }, x = {
      id: `w_top_${Date.now()}`,
      start: g,
      end: d,
      thickness: o,
      height: c,
      type: "standard"
    }, k = {
      id: `w_right_${Date.now()}`,
      start: d,
      end: f,
      thickness: o,
      height: c,
      type: "standard"
    }, M = {
      id: `w_bottom_${Date.now()}`,
      start: f,
      end: m,
      thickness: o,
      height: c,
      type: "standard"
    }, w = {
      id: `w_left_${Date.now()}`,
      start: m,
      end: g,
      thickness: o,
      height: c,
      type: "standard"
    }, S = [];
    l && S.push({
      id: `op_door_${Date.now()}`,
      wallId: M.id,
      type: "door",
      offset: s / 2,
      width: 0.9,
      flipSide: !1,
      flipDirection: !1
    }), h && S.push({
      id: `op_win_${Date.now()}`,
      wallId: x.id,
      type: "window",
      offset: s / 2,
      width: 1.2,
      flipSide: !1,
      flipDirection: !1
    });
    const C = {
      id: `room_${Date.now()}`,
      name: t,
      polygon: [g, d, f, m],
      areaM2: s * i,
      color: n,
      icon: a,
      height: c
    };
    this.project = {
      ...this.project,
      walls: [...this.project.walls, x, k, M, w],
      openings: [...this.project.openings, ...S],
      rooms: [...this.project.rooms, C]
    }, this.isWizardOpen = !1, this.activeTool = "select";
  }
  connectedCallback() {
    super.connectedCallback(), this._boundPaste = this.handlePaste.bind(this), window.addEventListener("paste", this._boundPaste), this._boundKeyDown = this.handleKeyDown.bind(this), window.addEventListener("keydown", this._boundKeyDown);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._boundPaste && window.removeEventListener("paste", this._boundPaste), this._boundKeyDown && window.removeEventListener("keydown", this._boundKeyDown), this.toastTimeout && clearTimeout(this.toastTimeout);
  }
  showToast(e) {
    this.toastMessage = e, this.toastTimeout && clearTimeout(this.toastTimeout), this.toastTimeout = setTimeout(() => {
      this.toastMessage = null;
    }, 4500);
  }
  loadBackgroundImage(e, t = "Plan chargé !") {
    const s = new Image();
    s.onload = () => {
      this.pushUndoSnapshot(), this.project = {
        ...this.project,
        background: {
          imageUrl: e,
          opacity: 0.4,
          visible: !0,
          offset: { x: 0, y: 0 },
          scale: 1,
          rotation: 0,
          widthPx: s.naturalWidth,
          heightPx: s.naturalHeight
        }
      }, this.activeTool = "calibrate", this.showToast(`${t} Tracez un segment sur un mur mesuré pour étalonner l'échelle (📏).`);
    }, s.onerror = () => {
      this.showToast("❌ Erreur lors du chargement de l'image.");
    }, s.src = e;
  }
  handleImportConfirmed(e) {
    this.pushUndoSnapshot();
    const {
      dataUrl: t,
      widthPx: s,
      heightPx: i,
      opacity: o,
      mode: r,
      totalWidthMeters: n,
      isSvgVectorized: a,
      svgInterpretation: l,
      keepSvgBackground: h
    } = e.detail;
    if (this.isImportModalOpen = !1, a && l && l.success) {
      const { walls: u, openings: p, rooms: g, pixelsPerMeter: d, stats: f } = l, m = h ? {
        imageUrl: t,
        opacity: o !== void 0 ? o : 0.25,
        visible: !0,
        offset: { x: 0, y: 0 },
        scale: 1,
        rotation: 0,
        widthPx: s,
        heightPx: i
      } : void 0;
      this.project = {
        ...this.project,
        pixelsPerMeter: d || this.project.pixelsPerMeter,
        walls: [...this.project.walls, ...u],
        openings: [...this.project.openings, ...p],
        rooms: [...this.project.rooms, ...g],
        background: m
      }, this.activeTool = "select", this.showToast(
        `✨ Plan SVG converti : ${f.wallCount} mur${f.wallCount > 1 ? "s" : ""}, ${f.doorCount} porte${f.doorCount > 1 ? "s" : ""}, ${f.windowCount} fenêtre${f.windowCount > 1 ? "s" : ""} et ${f.roomCount} pièce${f.roomCount > 1 ? "s" : ""} créés !`
      );
      return;
    }
    let c = this.project.pixelsPerMeter;
    r === "auto_dimension" && n && n > 0 && (c = Math.round(s / n * 10) / 10), this.project = {
      ...this.project,
      pixelsPerMeter: c,
      background: {
        imageUrl: t,
        opacity: o !== void 0 ? o : 0.4,
        visible: !0,
        offset: { x: 0, y: 0 },
        scale: 1,
        rotation: 0,
        widthPx: s,
        heightPx: i
      }
    }, r === "auto_dimension" ? (this.activeTool = "wall", this.showToast(`✅ Plan importé et étalonné automatiquement (1 m = ${c} px) ! Vous pouvez tracer vos murs (🧱).`)) : (this.activeTool = "calibrate", this.showToast("📏 Plan importé ! Tracez un segment sur un mur mesuré pour étalonner l'échelle."));
  }
  handlePaste(e) {
    var i;
    if (this.isImportModalOpen || !e.clipboardData) return;
    const t = e.clipboardData.items;
    for (let o = 0; o < t.length; o++)
      if (t[o].type.indexOf("image") !== -1) {
        const r = t[o].getAsFile();
        if (r) {
          e.preventDefault();
          const n = new FileReader();
          n.onload = (a) => {
            var h;
            const l = (h = a.target) == null ? void 0 : h.result;
            this.loadBackgroundImage(l, "📋 Image collée depuis le presse-papier !");
          }, n.readAsDataURL(r);
          return;
        }
      }
    const s = (i = e.clipboardData.getData("text/plain")) == null ? void 0 : i.trim();
    if (s && (s.startsWith("<svg") || s.startsWith("<?xml") && s.includes("<svg"))) {
      e.preventDefault(), this.isImportModalOpen = !0, this.showToast("📥 Code SVG détecté ! Configurez la vectorisation automatique.");
      return;
    }
    s && (s.startsWith("data:image/") || s.match(/\.(png|jpe?g|svg|webp)(\?.*)?$/i)) && (e.preventDefault(), this.loadBackgroundImage(s, "📋 Image chargée depuis l'URL collée !"));
  }
  triggerFileInput() {
    if (!this.fileInputRef) {
      const e = document.createElement("input");
      e.type = "file", e.accept = "image/*", e.style.display = "none", e.addEventListener("change", (t) => this.handleFileSelected(t)), document.body.appendChild(e), this.fileInputRef = e;
    }
    this.fileInputRef.click();
  }
  handleFileSelected(e) {
    var i;
    const t = (i = e.target.files) == null ? void 0 : i[0];
    if (!t) return;
    const s = new FileReader();
    s.onload = (o) => {
      var n;
      const r = (n = o.target) == null ? void 0 : n.result;
      this.loadBackgroundImage(r, "🖼️ Image importée depuis votre ordinateur !");
    }, s.readAsDataURL(t);
  }
  handleRequestCalibration(e) {
    this.calibrationData = e.detail, this.isCalibrateModalOpen = !0;
  }
  handleCalibrateConfirmed(e) {
    this.pushUndoSnapshot();
    const { pixelsPerMeter: t } = e.detail;
    this.project = {
      ...this.project,
      pixelsPerMeter: Math.round(t * 10) / 10
    }, this.isCalibrateModalOpen = !1, this.calibrationData = null, this.activeTool = "wall";
  }
  handleRequestRescale(e) {
    this.rescaleMeasuredMeters = e.detail.measuredMeters, this.isRescaleModalOpen = !0;
  }
  handleRescaleConfirmed(e) {
    this.pushUndoSnapshot();
    const { currentMeters: t, targetMeters: s, scaleFactor: i, adjustBackground: o } = e.detail;
    if (this.isRescaleModalOpen = !1, i <= 0 || isNaN(i)) return;
    const r = this.project.walls.map((u) => ({
      ...u,
      start: {
        x: y.roundMeters(u.start.x * i),
        y: y.roundMeters(u.start.y * i)
      },
      end: {
        x: y.roundMeters(u.end.x * i),
        y: y.roundMeters(u.end.y * i)
      }
    })), n = this.project.openings.map((u) => ({
      ...u,
      offset: y.roundMeters(u.offset * i),
      width: y.roundMeters(u.width * i)
    })), a = this.project.rooms.map((u) => {
      const p = u.polygon.map((d) => ({
        x: y.roundMeters(d.x * i),
        y: y.roundMeters(d.y * i)
      })), g = Z.computeArea(p);
      return {
        ...u,
        polygon: p,
        areaM2: g || y.roundMeters(u.areaM2 * i * i)
      };
    }), l = this.project.bindings.map((u) => ({
      ...u,
      position: {
        x: y.roundMeters(u.position.x * i),
        y: y.roundMeters(u.position.y * i)
      }
    }));
    let h = this.project.pixelsPerMeter, c = this.project.background ? { ...this.project.background } : void 0;
    o && c && (h = Math.round(this.project.pixelsPerMeter / i * 10) / 10, c.offset && (c = {
      ...c,
      offset: {
        x: y.roundMeters(c.offset.x * i),
        y: y.roundMeters(c.offset.y * i)
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
      `✅ Plan mis à l'échelle (×${i.toFixed(3)}) : ${r.length} murs et ${a.length} pièces recalculés !`
    );
  }
  handleOpacityChange(e) {
    const t = parseFloat(e.target.value);
    this.project.background && (this.project = {
      ...this.project,
      background: { ...this.project.background, opacity: t }
    });
  }
  handleDefaultCeilingChange(e) {
    this.project = {
      ...this.project,
      defaultCeilingHeight: e
    }, this.showToast(`📐 Hauteur plafond 3D par défaut : ${e.toFixed(2)} m`);
  }
  handleSaveRoom(e) {
    this.pushUndoSnapshot();
    const { roomId: t, name: s, height: i, color: o } = e.detail, r = this.project.rooms.map((n) => n.id === t ? { ...n, name: s, height: i, color: o } : n);
    this.project = {
      ...this.project,
      rooms: r
    }, this.selectedRoomForEdit = null, this.showToast(`✨ Pièce "${s}" mise à jour (H: ${i.toFixed(2)} m) !`);
  }
  handleDeleteRoom(e) {
    this.pushUndoSnapshot();
    const { roomId: t } = e.detail;
    this.project = {
      ...this.project,
      rooms: this.project.rooms.filter((s) => s.id !== t)
    }, this.selectedRoomForEdit = null, this.showToast("🗑️ Pièce supprimée");
  }
  pushUndoSnapshot(e) {
    const t = JSON.parse(JSON.stringify(e || this.project));
    this.undoStack = [...this.undoStack.slice(-39), t], this.redoStack = [];
  }
  handleUndo() {
    if (this.undoStack.length === 0) return;
    const e = this.undoStack[this.undoStack.length - 1], t = this.undoStack.slice(0, -1), s = JSON.parse(JSON.stringify(this.project));
    this.redoStack = [...this.redoStack.slice(-39), s], this.undoStack = t, this.project = e, this.selectedElements = { wallIds: [], openingIds: [], roomIds: [], bindingIds: [] }, this.showToast("↩️ Action annulée");
  }
  handleRedo() {
    if (this.redoStack.length === 0) return;
    const e = this.redoStack[this.redoStack.length - 1], t = this.redoStack.slice(0, -1), s = JSON.parse(JSON.stringify(this.project));
    this.undoStack = [...this.undoStack.slice(-39), s], this.redoStack = t, this.project = e, this.selectedElements = { wallIds: [], openingIds: [], roomIds: [], bindingIds: [] }, this.showToast("↪️ Action rétablie");
  }
  handleDeleteSelected() {
    const { wallIds: e, openingIds: t, roomIds: s, bindingIds: i } = this.selectedElements, o = e.length + t.length + s.length + i.length;
    if (o === 0) return;
    this.pushUndoSnapshot();
    const r = this.project.walls.filter((h) => !e.includes(h.id)), n = this.project.openings.filter(
      (h) => !t.includes(h.id) && !e.includes(h.wallId)
    ), a = this.project.rooms.filter((h) => !s.includes(h.id)), l = this.project.bindings.filter((h) => !i.includes(h.id));
    this.project = {
      ...this.project,
      walls: r,
      openings: n,
      rooms: a,
      bindings: l
    }, this.selectedElements = { wallIds: [], openingIds: [], roomIds: [], bindingIds: [] }, this.showToast(`🗑️ ${o} élément${o > 1 ? "s" : ""} supprimé${o > 1 ? "s" : ""} !`);
  }
  clearSelection() {
    this.selectedElements = { wallIds: [], openingIds: [], roomIds: [], bindingIds: [] };
  }
  getSelectedSummary() {
    const e = [];
    return this.selectedElements.wallIds.length > 0 && e.push(`${this.selectedElements.wallIds.length} mur${this.selectedElements.wallIds.length > 1 ? "s" : ""}`), this.selectedElements.openingIds.length > 0 && e.push(`${this.selectedElements.openingIds.length} ouvrant${this.selectedElements.openingIds.length > 1 ? "s" : ""}`), this.selectedElements.roomIds.length > 0 && e.push(`${this.selectedElements.roomIds.length} pièce${this.selectedElements.roomIds.length > 1 ? "s" : ""}`), this.selectedElements.bindingIds.length > 0 && e.push(`${this.selectedElements.bindingIds.length} entité${this.selectedElements.bindingIds.length > 1 ? "s" : ""}`), e.join(", ");
  }
  handleKeyDown(e) {
    var s, i, o;
    const t = (i = (s = e.target) == null ? void 0 : s.tagName) == null ? void 0 : i.toLowerCase();
    t === "input" || t === "textarea" || (o = e.target) != null && o.isContentEditable || ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "z" && !e.shiftKey ? (e.preventDefault(), this.handleUndo()) : (e.ctrlKey || e.metaKey) && (e.key.toLowerCase() === "y" || e.key.toLowerCase() === "z" && e.shiftKey) ? (e.preventDefault(), this.handleRedo()) : e.key === "Delete" || e.key === "Backspace" ? this.selectedElements.wallIds.length + this.selectedElements.openingIds.length + this.selectedElements.roomIds.length + this.selectedElements.bindingIds.length > 0 && (e.preventDefault(), this.handleDeleteSelected()) : e.key === "Escape" ? this.clearSelection() : e.key.toLowerCase() === "v" && (this.activeTool = "select"));
  }
  saveProject() {
    this.hass && this.hass.callWS ? this.hass.callWS({
      type: "home_architect/save_project",
      project: this.project
    }).then(() => {
      this.showToast("💾 Plan sauvegardé avec succès dans Home Assistant !");
    }).catch((e) => {
      console.error("Erreur sauvegarde HA:", e), localStorage.setItem(`home_architect_${this.project.id}`, JSON.stringify(this.project)), this.showToast("💾 Sauvegardé localement dans le navigateur (Mode hors-ligne).");
    }) : (localStorage.setItem(`home_architect_${this.project.id}`, JSON.stringify(this.project)), this.showToast("💾 Plan sauvegardé localement !"));
  }
  render() {
    var t, s;
    const e = !!((t = this.project.background) != null && t.imageUrl);
    return v`
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
          ${this.activeTool === "wall" ? v`
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
          ${this.activeTool === "door" || this.activeTool === "window" || this.activeTool === "french_window" ? v`
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
          ${this.is3DMode ? v`
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
          ${e ? v`
            <div class="control-group">
              <label>Fond :</label>
              <input 
                type="range" 
                min="0.05" 
                max="1.0" 
                step="0.05" 
                .value=${((s = this.project.background) == null ? void 0 : s.opacity) || 0.4}
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
            .currentThickness=${this.currentThickness}
            .doorFlipSide=${this.doorFlipSide}
            .doorFlipDirection=${this.doorFlipDirection}
            .windowSashCount=${this.windowSashCount}
            .canUndo=${this.undoStack.length > 0}
            .canRedo=${this.redoStack.length > 0}
            @undo=${this.handleUndo}
            @redo=${this.handleRedo}
            @tool-selected=${this.handleToolSelected}
            @door-config-changed=${this.handleDoorConfigChanged}
            @window-config-changed=${this.handleWindowConfigChanged}
            @wall-thickness-changed=${this.handleWallThicknessChanged}
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
            .openingFlipSide=${this.doorFlipSide}
            .openingFlipDirection=${this.doorFlipDirection}
            .windowSashCount=${this.windowSashCount}
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
          ${this.selectedElements.wallIds.length + this.selectedElements.openingIds.length + this.selectedElements.roomIds.length + this.selectedElements.bindingIds.length > 0 ? v`
            <div class="selection-hud">
              <span class="selection-info">
                <span>🎯</span>
                <span>${this.getSelectedSummary()} sélectionné(s)</span>
              </span>

              ${this.selectedElements.wallIds.length > 0 ? v`
                <div class="hud-options-group">
                  <span class="hud-label">Épaisseur :</span>
                  <button class="hud-opt-btn ${this.currentThickness === 0.1 ? "active" : ""}" @click=${() => this.updateSelectedWallsThickness(0.1)} title="Cloison 10 cm">Fin 10cm</button>
                  <button class="hud-opt-btn ${this.currentThickness === 0.2 ? "active" : ""}" @click=${() => this.updateSelectedWallsThickness(0.2)} title="Standard 20 cm">Moyen 20cm</button>
                  <button class="hud-opt-btn ${this.currentThickness === 0.3 ? "active" : ""}" @click=${() => this.updateSelectedWallsThickness(0.3)} title="Porteur 30 cm">Gros 30cm</button>
                </div>
              ` : null}

              ${this.selectedElements.openingIds.some((i) => {
      var o;
      return ((o = this.project.openings.find((r) => r.id === i)) == null ? void 0 : o.type) === "door";
    }) ? v`
                <div class="hud-options-group">
                  <span class="hud-label">Porte :</span>
                  <button class="hud-opt-btn ${!this.doorFlipSide && this.doorFlipDirection ? "active" : ""}" @click=${() => this.updateSelectedDoorConfig(!1, !0)} title="Ouverture Droite Intérieure (Poussant Droit)">Droite Int.</button>
                  <button class="hud-opt-btn ${!this.doorFlipSide && !this.doorFlipDirection ? "active" : ""}" @click=${() => this.updateSelectedDoorConfig(!1, !1)} title="Ouverture Gauche Intérieure (Poussant Gauche)">Gauche Int.</button>
                  <button class="hud-opt-btn ${this.doorFlipSide && !this.doorFlipDirection ? "active" : ""}" @click=${() => this.updateSelectedDoorConfig(!0, !1)} title="Ouverture Gauche Extérieure (Tirant Gauche)">Gauche Ext.</button>
                  <button class="hud-opt-btn ${this.doorFlipSide && this.doorFlipDirection ? "active" : ""}" @click=${() => this.updateSelectedDoorConfig(!0, !0)} title="Ouverture Droite Extérieure (Tirant Droit)">Droite Ext.</button>
                </div>
              ` : null}

              ${this.selectedElements.openingIds.some((i) => {
      const o = this.project.openings.find((r) => r.id === i);
      return o && (o.type === "window" || o.type === "french_window");
    }) ? v`
                <div class="hud-options-group">
                  <span class="hud-label">Fenêtre :</span>
                  <button class="hud-opt-btn ${this.windowSashCount === 1 ? "active" : ""}" @click=${() => this.updateSelectedWindowConfig("window", 1, 0.9)} title="Fenêtre 1 ouvrant (90 cm)">1 Ouvrant</button>
                  <button class="hud-opt-btn ${this.windowSashCount === 2 ? "active" : ""}" @click=${() => this.updateSelectedWindowConfig("window", 2, 1.4)} title="Fenêtre 2 battants (1.40 m)">2 Battants</button>
                  <button class="hud-opt-btn" @click=${() => this.updateSelectedWindowConfig("french_window", 2, 2)} title="Baie vitrée coulissante (2.00 m)">Baie vitrée</button>
                </div>
              ` : null}

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
          ${this.toastMessage ? v`
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
      ${this.isImportModalOpen ? v`
        <home-architect-import-modal
          .currentLevel=${this.activeLevel}
          @import-confirmed=${this.handleImportConfirmed}
          @close=${() => this.isImportModalOpen = !1}
        ></home-architect-import-modal>
      ` : null}

      <!-- Modal Assistant Pièce Débutant -->
      ${this.isWizardOpen ? v`
        <home-architect-wizard-modal
          @create-room=${this.handleCreateRoomFromWizard}
          @close=${() => this.isWizardOpen = !1}
        ></home-architect-wizard-modal>
      ` : null}

      <!-- Modal Propriétés de la Pièce (Hauteur sous plafond 3D, etc.) -->
      ${this.selectedRoomForEdit ? v`
        <home-architect-room-modal
          .room=${this.selectedRoomForEdit}
          @save-room=${this.handleSaveRoom}
          @delete-room=${this.handleDeleteRoom}
          @close=${() => this.selectedRoomForEdit = null}
        ></home-architect-room-modal>
      ` : null}

      <!-- Modal Étalonnage Mesure de Mur -->
      ${this.isCalibrateModalOpen && this.calibrationData ? v`
        <home-architect-calibrate-modal
          .pixelDistance=${this.calibrationData.pixelDistance}
          .defaultMeters=${this.calibrationData.defaultMeters}
          @calibrate-confirmed=${this.handleCalibrateConfirmed}
          @close=${() => this.isCalibrateModalOpen = !1}
        ></home-architect-calibrate-modal>
      ` : null}

      <!-- Modal Mettre à l'échelle (Recalcul de toutes les cotes) -->
      ${this.isRescaleModalOpen ? v`
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
      ${this.isExportModalOpen ? v`
        <home-architect-export-modal
          .project=${this.project}
          .hass=${this.hass}
          @close=${() => this.isExportModalOpen = !1}
        ></home-architect-export-modal>
      ` : null}
    `;
  }
};
A.styles = K`
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

    .hud-options-group {
      display: flex;
      align-items: center;
      gap: 6px;
      padding-left: 8px;
      border-left: 1px solid rgba(255, 255, 255, 0.15);
    }

    .hud-label {
      font-size: 0.78rem;
      color: #94a3b8;
      font-weight: 600;
    }

    .hud-opt-btn {
      background: rgba(30, 41, 59, 0.8);
      color: #cbd5e1;
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 6px;
      padding: 4px 8px;
      font-size: 0.78rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.15s ease;
      white-space: nowrap;
    }

    .hud-opt-btn:hover {
      background: rgba(56, 189, 248, 0.2);
      border-color: #38bdf8;
      color: #ffffff;
    }

    .hud-opt-btn.active {
      background: #0284c7;
      border-color: #38bdf8;
      color: #ffffff;
      box-shadow: 0 0 10px rgba(56, 189, 248, 0.4);
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
F([
  P({ type: Object })
], A.prototype, "hass", 2);
F([
  P({ type: Boolean })
], A.prototype, "narrow", 2);
F([
  b()
], A.prototype, "activeTool", 2);
F([
  b()
], A.prototype, "currentThickness", 2);
F([
  b()
], A.prototype, "currentOpeningWidth", 2);
F([
  b()
], A.prototype, "doorFlipSide", 2);
F([
  b()
], A.prototype, "doorFlipDirection", 2);
F([
  b()
], A.prototype, "windowSashCount", 2);
F([
  b()
], A.prototype, "activeLevel", 2);
F([
  b()
], A.prototype, "is3DMode", 2);
F([
  b()
], A.prototype, "isDrawerCollapsed", 2);
F([
  b()
], A.prototype, "isWizardOpen", 2);
F([
  b()
], A.prototype, "isImportModalOpen", 2);
F([
  b()
], A.prototype, "isExportModalOpen", 2);
F([
  b()
], A.prototype, "isCalibrateModalOpen", 2);
F([
  b()
], A.prototype, "calibrationData", 2);
F([
  b()
], A.prototype, "isRescaleModalOpen", 2);
F([
  b()
], A.prototype, "rescaleMeasuredMeters", 2);
F([
  b()
], A.prototype, "selectedRoomForEdit", 2);
F([
  b()
], A.prototype, "selectedElements", 2);
F([
  b()
], A.prototype, "undoStack", 2);
F([
  b()
], A.prototype, "redoStack", 2);
F([
  b()
], A.prototype, "project", 2);
F([
  b()
], A.prototype, "toastMessage", 2);
A = F([
  J("home-architect-panel")
], A);
var rs = Object.defineProperty, ns = Object.getOwnPropertyDescriptor, Tt = (e, t, s, i) => {
  for (var o = i > 1 ? void 0 : i ? ns(t, s) : t, r = e.length - 1, n; r >= 0; r--)
    (n = e[r]) && (o = (i ? n(t, s, o) : n(o)) || o);
  return i && o && rs(t, s, o), o;
};
let ht = class extends H {
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
    }, this.is3DMode = !1, this._projectLoaded = !1;
  }
  setConfig(e) {
    if (!e) throw new Error("Configuration invalide");
    this.config = e, this.is3DMode = e.view_mode === "3d", e.height && this.style.setProperty("--card-custom-height", e.height);
  }
  getCardSize() {
    return 6;
  }
  firstUpdated() {
    this.loadProject();
  }
  updated(e) {
    super.updated(e), e.has("hass") && !this._projectLoaded && this.hass && (this._projectLoaded = !0, this.loadProject());
  }
  async loadProject() {
    var s, i;
    const e = ((s = this.config) == null ? void 0 : s.project_id) || "rdc";
    if (this.hass && this.hass.callWS)
      try {
        const o = await this.hass.callWS({ type: "home_architect/get_projects" }), r = (i = o == null ? void 0 : o.projects) == null ? void 0 : i.find((n) => n.id === e);
        if (r) {
          this.project = r;
          return;
        }
      } catch (o) {
        console.warn("WebSocket get_projects échoué, essai localStorage:", o);
      }
    const t = localStorage.getItem(`home_architect_${e}`);
    if (t)
      try {
        this.project = JSON.parse(t);
      } catch {
      }
  }
  handleMoreInfo(e) {
    const t = new CustomEvent("hass-more-info", {
      detail: e.detail,
      bubbles: !0,
      composed: !0
    });
    this.dispatchEvent(t);
  }
  render() {
    var t, s;
    const e = ((t = this.config) == null ? void 0 : t.show_header) !== !1;
    return v`
      ${e ? v`
        <div class="card-header">
          <div class="card-title">${((s = this.config) == null ? void 0 : s.title) || this.project.name || "Home Architect"}</div>
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
ht.styles = K`
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
Tt([
  P({ type: Object })
], ht.prototype, "hass", 2);
Tt([
  b()
], ht.prototype, "config", 2);
Tt([
  b()
], ht.prototype, "project", 2);
Tt([
  b()
], ht.prototype, "is3DMode", 2);
ht = Tt([
  J("home-architect-card")
], ht);
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
