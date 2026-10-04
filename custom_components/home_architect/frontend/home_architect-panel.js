/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Dt = globalThis, Ht = Dt.ShadowRoot && (Dt.ShadyCSS === void 0 || Dt.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Ut = Symbol(), Vt = /* @__PURE__ */ new WeakMap();
let re = class {
  constructor(t, s, i) {
    if (this._$cssResult$ = !0, i !== Ut) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = s;
  }
  get styleSheet() {
    let t = this.o;
    const s = this.t;
    if (Ht && t === void 0) {
      const i = s !== void 0 && s.length === 1;
      i && (t = Vt.get(s)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && Vt.set(s, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const pe = (e) => new re(typeof e == "string" ? e : e + "", void 0, Ut), V = (e, ...t) => {
  const s = e.length === 1 ? e[0] : t.reduce((i, o, n) => i + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + e[n + 1], e[0]);
  return new re(s, e, Ut);
}, he = (e, t) => {
  if (Ht) e.adoptedStyleSheets = t.map((s) => s instanceof CSSStyleSheet ? s : s.styleSheet);
  else for (const s of t) {
    const i = document.createElement("style"), o = Dt.litNonce;
    o !== void 0 && i.setAttribute("nonce", o), i.textContent = s.cssText, e.appendChild(i);
  }
}, Yt = Ht ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let s = "";
  for (const i of t.cssRules) s += i.cssText;
  return pe(s);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: ue, defineProperty: ge, getOwnPropertyDescriptor: fe, getOwnPropertyNames: me, getOwnPropertySymbols: be, getPrototypeOf: xe } = Object, Q = globalThis, Gt = Q.trustedTypes, ye = Gt ? Gt.emptyScript : "", Wt = Q.reactiveElementPolyfillSupport, xt = (e, t) => e, It = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? ye : null;
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
} }, qt = (e, t) => !ue(e, t), Xt = { attribute: !0, type: String, converter: It, reflect: !1, useDefault: !1, hasChanged: qt };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), Q.litPropertyMetadata ?? (Q.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let pt = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, s = Xt) {
    if (s.state && (s.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((s = Object.create(s)).wrapped = !0), this.elementProperties.set(t, s), !s.noAccessor) {
      const i = Symbol(), o = this.getPropertyDescriptor(t, i, s);
      o !== void 0 && ge(this.prototype, t, o);
    }
  }
  static getPropertyDescriptor(t, s, i) {
    const { get: o, set: n } = fe(this.prototype, t) ?? { get() {
      return this[s];
    }, set(r) {
      this[s] = r;
    } };
    return { get: o, set(r) {
      const a = o == null ? void 0 : o.call(this);
      n == null || n.call(this, r), this.requestUpdate(t, a, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Xt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(xt("elementProperties"))) return;
    const t = xe(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(xt("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(xt("properties"))) {
      const s = this.properties, i = [...me(s), ...be(s)];
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
      for (const o of i) s.unshift(Yt(o));
    } else t !== void 0 && s.push(Yt(t));
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
    return he(t, this.constructor.elementStyles), t;
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
    var n;
    const i = this.constructor.elementProperties.get(t), o = this.constructor._$Eu(t, i);
    if (o !== void 0 && i.reflect === !0) {
      const r = (((n = i.converter) == null ? void 0 : n.toAttribute) !== void 0 ? i.converter : It).toAttribute(s, i.type);
      this._$Em = t, r == null ? this.removeAttribute(o) : this.setAttribute(o, r), this._$Em = null;
    }
  }
  _$AK(t, s) {
    var n, r;
    const i = this.constructor, o = i._$Eh.get(t);
    if (o !== void 0 && this._$Em !== o) {
      const a = i.getPropertyOptions(o), l = typeof a.converter == "function" ? { fromAttribute: a.converter } : ((n = a.converter) == null ? void 0 : n.fromAttribute) !== void 0 ? a.converter : It;
      this._$Em = o;
      const p = l.fromAttribute(s, a.type);
      this[o] = p ?? ((r = this._$Ej) == null ? void 0 : r.get(o)) ?? p, this._$Em = null;
    }
  }
  requestUpdate(t, s, i, o = !1, n) {
    var r;
    if (t !== void 0) {
      const a = this.constructor;
      if (o === !1 && (n = this[t]), i ?? (i = a.getPropertyOptions(t)), !((i.hasChanged ?? qt)(n, s) || i.useDefault && i.reflect && n === ((r = this._$Ej) == null ? void 0 : r.get(t)) && !this.hasAttribute(a._$Eu(t, i)))) return;
      this.C(t, s, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, s, { useDefault: i, reflect: o, wrapped: n }, r) {
    i && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, r ?? s ?? this[t]), n !== !0 || r !== void 0) || (this._$AL.has(t) || (this.hasUpdated || i || (s = void 0), this._$AL.set(t, s)), o === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
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
        for (const [n, r] of this._$Ep) this[n] = r;
        this._$Ep = void 0;
      }
      const o = this.constructor.elementProperties;
      if (o.size > 0) for (const [n, r] of o) {
        const { wrapped: a } = r, l = this[n];
        a !== !0 || this._$AL.has(n) || l === void 0 || this.C(n, void 0, r, l);
      }
    }
    let t = !1;
    const s = this._$AL;
    try {
      t = this.shouldUpdate(s), t ? (this.willUpdate(s), (i = this._$EO) == null || i.forEach((o) => {
        var n;
        return (n = o.hostUpdate) == null ? void 0 : n.call(o);
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
pt.elementStyles = [], pt.shadowRootOptions = { mode: "open" }, pt[xt("elementProperties")] = /* @__PURE__ */ new Map(), pt[xt("finalized")] = /* @__PURE__ */ new Map(), Wt == null || Wt({ ReactiveElement: pt }), (Q.reactiveElementVersions ?? (Q.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const yt = globalThis, Kt = (e) => e, Et = yt.trustedTypes, Jt = Et ? Et.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, ne = "$lit$", J = `lit$${Math.random().toFixed(9).slice(2)}$`, ae = "?" + J, ve = `<${ae}>`, nt = document, vt = () => nt.createComment(""), wt = (e) => e === null || typeof e != "object" && typeof e != "function", Bt = Array.isArray, we = (e) => Bt(e) || typeof (e == null ? void 0 : e[Symbol.iterator]) == "function", Ft = `[ 	
\f\r]`, bt = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Zt = /-->/g, Qt = />/g, it = RegExp(`>|${Ft}(?:([^\\s"'>=/]+)(${Ft}*=${Ft}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), te = /'/g, ee = /"/g, le = /^(?:script|style|textarea|title)$/i, ce = (e) => (t, ...s) => ({ _$litType$: e, strings: t, values: s }), k = ce(1), E = ce(2), ht = Symbol.for("lit-noChange"), R = Symbol.for("lit-nothing"), se = /* @__PURE__ */ new WeakMap(), ot = nt.createTreeWalker(nt, 129);
function de(e, t) {
  if (!Bt(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Jt !== void 0 ? Jt.createHTML(t) : t;
}
const $e = (e, t) => {
  const s = e.length - 1, i = [];
  let o, n = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", r = bt;
  for (let a = 0; a < s; a++) {
    const l = e[a];
    let p, c, h = -1, d = 0;
    for (; d < l.length && (r.lastIndex = d, c = r.exec(l), c !== null); ) d = r.lastIndex, r === bt ? c[1] === "!--" ? r = Zt : c[1] !== void 0 ? r = Qt : c[2] !== void 0 ? (le.test(c[2]) && (o = RegExp("</" + c[2], "g")), r = it) : c[3] !== void 0 && (r = it) : r === it ? c[0] === ">" ? (r = o ?? bt, h = -1) : c[1] === void 0 ? h = -2 : (h = r.lastIndex - c[2].length, p = c[1], r = c[3] === void 0 ? it : c[3] === '"' ? ee : te) : r === ee || r === te ? r = it : r === Zt || r === Qt ? r = bt : (r = it, o = void 0);
    const g = r === it && e[a + 1].startsWith("/>") ? " " : "";
    n += r === bt ? l + ve : h >= 0 ? (i.push(p), l.slice(0, h) + ne + l.slice(h) + J + g) : l + J + (h === -2 ? a : g);
  }
  return [de(e, n + (e[s] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class $t {
  constructor({ strings: t, _$litType$: s }, i) {
    let o;
    this.parts = [];
    let n = 0, r = 0;
    const a = t.length - 1, l = this.parts, [p, c] = $e(t, s);
    if (this.el = $t.createElement(p, i), ot.currentNode = this.el.content, s === 2 || s === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (o = ot.nextNode()) !== null && l.length < a; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const h of o.getAttributeNames()) if (h.endsWith(ne)) {
          const d = c[r++], g = o.getAttribute(h).split(J), f = /([.?@])?(.*)/.exec(d);
          l.push({ type: 1, index: n, name: f[2], strings: g, ctor: f[1] === "." ? Se : f[1] === "?" ? Me : f[1] === "@" ? Ce : Tt }), o.removeAttribute(h);
        } else h.startsWith(J) && (l.push({ type: 6, index: n }), o.removeAttribute(h));
        if (le.test(o.tagName)) {
          const h = o.textContent.split(J), d = h.length - 1;
          if (d > 0) {
            o.textContent = Et ? Et.emptyScript : "";
            for (let g = 0; g < d; g++) o.append(h[g], vt()), ot.nextNode(), l.push({ type: 2, index: ++n });
            o.append(h[d], vt());
          }
        }
      } else if (o.nodeType === 8) if (o.data === ae) l.push({ type: 2, index: n });
      else {
        let h = -1;
        for (; (h = o.data.indexOf(J, h + 1)) !== -1; ) l.push({ type: 7, index: n }), h += J.length - 1;
      }
      n++;
    }
  }
  static createElement(t, s) {
    const i = nt.createElement("template");
    return i.innerHTML = t, i;
  }
}
function ut(e, t, s = e, i) {
  var r, a;
  if (t === ht) return t;
  let o = i !== void 0 ? (r = s._$Co) == null ? void 0 : r[i] : s._$Cl;
  const n = wt(t) ? void 0 : t._$litDirective$;
  return (o == null ? void 0 : o.constructor) !== n && ((a = o == null ? void 0 : o._$AO) == null || a.call(o, !1), n === void 0 ? o = void 0 : (o = new n(e), o._$AT(e, s, i)), i !== void 0 ? (s._$Co ?? (s._$Co = []))[i] = o : s._$Cl = o), o !== void 0 && (t = ut(e, o._$AS(e, t.values), o, i)), t;
}
class ke {
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
    const { el: { content: s }, parts: i } = this._$AD, o = ((t == null ? void 0 : t.creationScope) ?? nt).importNode(s, !0);
    ot.currentNode = o;
    let n = ot.nextNode(), r = 0, a = 0, l = i[0];
    for (; l !== void 0; ) {
      if (r === l.index) {
        let p;
        l.type === 2 ? p = new kt(n, n.nextSibling, this, t) : l.type === 1 ? p = new l.ctor(n, l.name, l.strings, this, t) : l.type === 6 && (p = new _e(n, this, t)), this._$AV.push(p), l = i[++a];
      }
      r !== (l == null ? void 0 : l.index) && (n = ot.nextNode(), r++);
    }
    return ot.currentNode = nt, o;
  }
  p(t) {
    let s = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, s), s += i.strings.length - 2) : i._$AI(t[s])), s++;
  }
}
class kt {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, s, i, o) {
    this.type = 2, this._$AH = R, this._$AN = void 0, this._$AA = t, this._$AB = s, this._$AM = i, this.options = o, this._$Cv = (o == null ? void 0 : o.isConnected) ?? !0;
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
    t = ut(this, t, s), wt(t) ? t === R || t == null || t === "" ? (this._$AH !== R && this._$AR(), this._$AH = R) : t !== this._$AH && t !== ht && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : we(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== R && wt(this._$AH) ? this._$AA.nextSibling.data = t : this.T(nt.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var n;
    const { values: s, _$litType$: i } = t, o = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = $t.createElement(de(i.h, i.h[0]), this.options)), i);
    if (((n = this._$AH) == null ? void 0 : n._$AD) === o) this._$AH.p(s);
    else {
      const r = new ke(o, this), a = r.u(this.options);
      r.p(s), this.T(a), this._$AH = r;
    }
  }
  _$AC(t) {
    let s = se.get(t.strings);
    return s === void 0 && se.set(t.strings, s = new $t(t)), s;
  }
  k(t) {
    Bt(this._$AH) || (this._$AH = [], this._$AR());
    const s = this._$AH;
    let i, o = 0;
    for (const n of t) o === s.length ? s.push(i = new kt(this.O(vt()), this.O(vt()), this, this.options)) : i = s[o], i._$AI(n), o++;
    o < s.length && (this._$AR(i && i._$AB.nextSibling, o), s.length = o);
  }
  _$AR(t = this._$AA.nextSibling, s) {
    var i;
    for ((i = this._$AP) == null ? void 0 : i.call(this, !1, !0, s); t !== this._$AB; ) {
      const o = Kt(t).nextSibling;
      Kt(t).remove(), t = o;
    }
  }
  setConnected(t) {
    var s;
    this._$AM === void 0 && (this._$Cv = t, (s = this._$AP) == null || s.call(this, t));
  }
}
class Tt {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, s, i, o, n) {
    this.type = 1, this._$AH = R, this._$AN = void 0, this.element = t, this.name = s, this._$AM = o, this.options = n, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = R;
  }
  _$AI(t, s = this, i, o) {
    const n = this.strings;
    let r = !1;
    if (n === void 0) t = ut(this, t, s, 0), r = !wt(t) || t !== this._$AH && t !== ht, r && (this._$AH = t);
    else {
      const a = t;
      let l, p;
      for (t = n[0], l = 0; l < n.length - 1; l++) p = ut(this, a[i + l], s, l), p === ht && (p = this._$AH[l]), r || (r = !wt(p) || p !== this._$AH[l]), p === R ? t = R : t !== R && (t += (p ?? "") + n[l + 1]), this._$AH[l] = p;
    }
    r && !o && this.j(t);
  }
  j(t) {
    t === R ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Se extends Tt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === R ? void 0 : t;
  }
}
class Me extends Tt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== R);
  }
}
class Ce extends Tt {
  constructor(t, s, i, o, n) {
    super(t, s, i, o, n), this.type = 5;
  }
  _$AI(t, s = this) {
    if ((t = ut(this, t, s, 0) ?? R) === ht) return;
    const i = this._$AH, o = t === R && i !== R || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, n = t !== R && (i === R || o);
    o && this.element.removeEventListener(this.name, this, i), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var s;
    typeof this._$AH == "function" ? this._$AH.call(((s = this.options) == null ? void 0 : s.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class _e {
  constructor(t, s, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = s, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    ut(this, t);
  }
}
const Nt = yt.litHtmlPolyfillSupport;
Nt == null || Nt($t, kt), (yt.litHtmlVersions ?? (yt.litHtmlVersions = [])).push("3.3.3");
const Pe = (e, t, s) => {
  const i = (s == null ? void 0 : s.renderBefore) ?? t;
  let o = i._$litPart$;
  if (o === void 0) {
    const n = (s == null ? void 0 : s.renderBefore) ?? null;
    i._$litPart$ = o = new kt(t.insertBefore(vt(), n), n, void 0, s ?? {});
  }
  return o._$AI(e), o;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const rt = globalThis;
class H extends pt {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Pe(s, this.renderRoot, this.renderOptions);
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
    return ht;
  }
}
var oe;
H._$litElement$ = !0, H.finalized = !0, (oe = rt.litElementHydrateSupport) == null || oe.call(rt, { LitElement: H });
const Lt = rt.litElementPolyfillSupport;
Lt == null || Lt({ LitElement: H });
(rt.litElementVersions ?? (rt.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Y = (e) => (t, s) => {
  s !== void 0 ? s.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const De = { attribute: !0, type: String, converter: It, reflect: !1, hasChanged: qt }, Ie = (e = De, t, s) => {
  const { kind: i, metadata: o } = s;
  let n = globalThis.litPropertyMetadata.get(o);
  if (n === void 0 && globalThis.litPropertyMetadata.set(o, n = /* @__PURE__ */ new Map()), i === "setter" && ((e = Object.create(e)).wrapped = !0), n.set(s.name, e), i === "accessor") {
    const { name: r } = s;
    return { set(a) {
      const l = t.get.call(this);
      t.set.call(this, a), this.requestUpdate(r, l, e, !0, a);
    }, init(a) {
      return a !== void 0 && this.C(r, void 0, e, a), a;
    } };
  }
  if (i === "setter") {
    const { name: r } = s;
    return function(a) {
      const l = this[r];
      t.call(this, a), this.requestUpdate(r, l, e, !0, a);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function T(e) {
  return (t, s) => typeof s == "object" ? Ie(e, t, s) : ((i, o, n) => {
    const r = o.hasOwnProperty(n);
    return o.constructor.createProperty(n, i), r ? Object.getOwnPropertyDescriptor(o, n) : void 0;
  })(e, t, s);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function m(e) {
  return T({ ...e, state: !0, attribute: !1 });
}
const Ee = V`
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
class b {
  /**
   * Snaps a world point (in meters) to grid, existing vertices, and angle guides.
   */
  static snapPoint(t, s, i = [], o, n = 0.25) {
    let r = { ...t };
    if (s.snapToElements && i.length > 0) {
      let p = n, c = null;
      for (const h of i)
        for (const d of [h.start, h.end]) {
          const g = this.distance(t, d);
          g < p && (p = g, c = d);
        }
      if (c)
        return {
          point: { x: c.x, y: c.y },
          snappedTo: "vertex"
        };
    }
    let a = !1, l;
    if (s.snapToAngles && o) {
      const p = t.x - o.x, c = t.y - o.y, h = Math.sqrt(p * p + c * c);
      if (h > 0.05) {
        let g = Math.atan2(c, p) * 180 / Math.PI;
        g < 0 && (g += 360);
        const f = 45, u = Math.round(g / f) * f;
        if (Math.abs(g - u) <= 6) {
          const C = u * Math.PI / 180;
          r = {
            x: o.x + h * Math.cos(C),
            y: o.y + h * Math.sin(C)
          }, a = !0, l = u;
        }
      }
    }
    if (s.snapToGrid && !a) {
      const p = s.size || 0.5;
      return r = {
        x: Math.round(r.x / p) * p,
        y: Math.round(r.y / p) * p
      }, { point: r, snappedTo: "grid" };
    } else if (a)
      return { point: r, snappedTo: "angle", guideAngle: l };
    return { point: t, snappedTo: "none" };
  }
  /**
   * Snaps a point to the nearest wall centerline for placing doors and windows
   */
  static snapPointToWall(t, s, i = 0.6) {
    let o = null, n = i;
    for (const r of s) {
      const a = r.end.x - r.start.x, l = r.end.y - r.start.y, p = Math.sqrt(a * a + l * l);
      if (p === 0) continue;
      const c = Math.max(0, Math.min(
        1,
        ((t.x - r.start.x) * a + (t.y - r.start.y) * l) / (p * p)
      )), h = r.start.x + c * a, d = r.start.y + c * l, g = Math.sqrt((t.x - h) ** 2 + (t.y - d) ** 2);
      g < n && (n = g, o = {
        wall: r,
        projectionPoint: { x: h, y: d },
        offset: c * p,
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
    for (let o = 0, n = s.length - 1; o < s.length; n = o++) {
      const r = s[o].x, a = s[o].y, l = s[n].x, p = s[n].y;
      a > t.y != p > t.y && t.x < (l - r) * (t.y - a) / (p - a) + r && (i = !i);
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
var Te = Object.defineProperty, je = Object.getOwnPropertyDescriptor, I = (e, t, s, i) => {
  for (var o = i > 1 ? void 0 : i ? je(t, s) : t, n = e.length - 1, r; n >= 0; n--)
    (r = e[n]) && (o = (i ? r(t, s, o) : r(o)) || o);
  return i && o && Te(t, s, o), o;
};
let M = class extends H {
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
    }, this.isMarqueeSelecting = !1, this.marqueeStart = null, this.marqueeCurrent = null, this.viewport = { x: 300, y: 300, zoom: 1 }, this.isPanning = !1, this.panStart = { x: 0, y: 0 }, this.drawingWallStart = null, this.previewPoint = null, this.snapInfo = { snappedTo: "none" }, this.cursorCoords = { x: 0, y: 0 }, this.wallSnap = null, this.openingFlipSide = !1, this.openingFlipDirection = !1, this.calibrateStart = null, this.calibrateCurrent = null, this.rescaleStart = null, this.rescaleCurrent = null, this._boundKeyDown = null, this.orbitPitch = 55, this.orbitYaw = -35, this.isOrbiting = !1, this.orbitStart = { x: 0, y: 0 }, this.orbitStartPitch = 55, this.orbitStartYaw = -35;
  }
  setCameraPreset(e, t) {
    this.orbitPitch = e, this.orbitYaw = t, this.requestUpdate();
  }
  // ==========================================
  // CONVERSIONS DE COORDONNÉES
  // ==========================================
  screenToWorld(e, t) {
    const s = this.getBoundingClientRect(), i = e - s.left, o = t - s.top, n = this.project.pixelsPerMeter * this.viewport.zoom;
    return {
      x: (i - this.viewport.x) / n,
      y: (o - this.viewport.y) / n
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
    const t = this.getBoundingClientRect(), s = e.clientX - t.left, i = e.clientY - t.top, o = e.deltaY < 0 ? 1.12 : 0.89, n = Math.min(Math.max(this.viewport.zoom * o, 0.15), 8), r = s - (s - this.viewport.x) * (n / this.viewport.zoom), a = i - (i - this.viewport.y) * (n / this.viewport.zoom);
    this.viewport = { x: r, y: a, zoom: n };
  }
  handlePointerDown(e) {
    var s, i, o, n, r, a, l, p, c, h, d, g, f, u, w, C;
    if (this.is3DMode) {
      if (e.button === 1 || e.button === 0 && e.shiftKey) {
        this.isPanning = !0, this.panStart = { x: e.clientX - this.viewport.x, y: e.clientY - this.viewport.y }, (i = (s = e.target).setPointerCapture) == null || i.call(s, e.pointerId);
        return;
      }
      if (e.button === 2 || e.button === 0 && e.altKey) {
        this.isOrbiting = !0, this.orbitStart = { x: e.clientX, y: e.clientY }, this.orbitStartPitch = this.orbitPitch, this.orbitStartYaw = this.orbitYaw, (n = (o = e.target).setPointerCapture) == null || n.call(o, e.pointerId);
        return;
      }
      if (e.button === 0 && !((a = (r = e.target) == null ? void 0 : r.closest) == null ? void 0 : a.call(r, ".wall-element, .wall-element-3d, .room-group, .entity-pin, .opening-element"))) {
        this.selectedElements = { wallIds: [], openingIds: [], roomIds: [], bindingIds: [] }, this.dispatchSelectionChanged(), this.isOrbiting = !0, this.orbitStart = { x: e.clientX, y: e.clientY }, this.orbitStartPitch = this.orbitPitch, this.orbitStartYaw = this.orbitYaw, (p = (l = e.target).setPointerCapture) == null || p.call(l, e.pointerId);
        return;
      }
      return;
    }
    if (e.button === 1) {
      this.isPanning = !0, this.panStart = { x: e.clientX - this.viewport.x, y: e.clientY - this.viewport.y }, (h = (c = e.target).setPointerCapture) == null || h.call(c, e.pointerId);
      return;
    }
    if (e.button !== 0) return;
    if (this.activeTool === "select") {
      if (e.shiftKey) {
        const $ = this.screenToWorld(e.clientX, e.clientY);
        this.isMarqueeSelecting = !0, this.marqueeStart = $, this.marqueeCurrent = $, (g = (d = e.target).setPointerCapture) == null || g.call(d, e.pointerId);
        return;
      }
      this.selectedElements = { wallIds: [], openingIds: [], roomIds: [], bindingIds: [] }, this.dispatchSelectionChanged(), this.isPanning = !0, this.panStart = { x: e.clientX - this.viewport.x, y: e.clientY - this.viewport.y }, (u = (f = e.target).setPointerCapture) == null || u.call(f, e.pointerId);
      return;
    }
    if (e.shiftKey) {
      this.isPanning = !0, this.panStart = { x: e.clientX - this.viewport.x, y: e.clientY - this.viewport.y }, (C = (w = e.target).setPointerCapture) == null || C.call(w, e.pointerId);
      return;
    }
    const t = this.screenToWorld(e.clientX, e.clientY);
    if (this.activeTool === "wall") {
      const $ = b.snapPoint(
        t,
        this.project.grid,
        this.project.walls,
        this.drawingWallStart || void 0
      );
      if (!this.drawingWallStart)
        this.drawingWallStart = $.point;
      else {
        const y = this.drawingWallStart, x = $.point;
        if (b.distance(y, x) >= 0.15) {
          const S = {
            id: `wall_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
            start: { ...y },
            end: { ...x },
            thickness: this.currentWallThickness,
            type: "standard"
          };
          this.project = {
            ...this.project,
            walls: [...this.project.walls, S]
          }, this.dispatchProjectChanged(), this.drawingWallStart = x;
        }
      }
    } else if (this.activeTool === "door" || this.activeTool === "window" || this.activeTool === "french_window") {
      if (this.wallSnap) {
        const $ = this.activeTool === "window" ? "window" : this.activeTool === "french_window" ? "french_window" : "door", y = {
          id: `op_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
          wallId: this.wallSnap.wall.id,
          type: $,
          offset: b.roundMeters(this.wallSnap.offset),
          width: this.currentOpeningWidth || ($ === "door" ? 0.9 : 1.2),
          flipSide: this.openingFlipSide,
          flipDirection: this.openingFlipDirection
        };
        this.project = {
          ...this.project,
          openings: [...this.project.openings, y]
        }, this.dispatchProjectChanged();
      }
    } else if (this.activeTool === "calibrate") {
      const $ = this.getBoundingClientRect(), y = { x: e.clientX - $.left, y: e.clientY - $.top };
      if (!this.calibrateStart)
        this.calibrateStart = y, this.calibrateCurrent = y;
      else {
        const x = y.x - this.calibrateStart.x, v = y.y - this.calibrateStart.y, S = Math.sqrt(x * x + v * v);
        if (S >= 10) {
          const _ = S / this.viewport.zoom;
          this.dispatchEvent(new CustomEvent("request-calibration", {
            detail: {
              pixelDistance: _,
              defaultMeters: b.roundMeters(_ / this.project.pixelsPerMeter)
            },
            bubbles: !0,
            composed: !0
          })), this.calibrateStart = null, this.calibrateCurrent = null;
        }
      }
    } else if (this.activeTool === "rescale") {
      const $ = this.screenToWorld(e.clientX, e.clientY);
      let y = b.snapPoint(
        $,
        this.project.grid,
        this.project.walls,
        this.rescaleStart || void 0
      );
      if (y.snappedTo === "none" && this.project.walls.length > 0) {
        const x = b.snapPointToWall($, this.project.walls, 0.6);
        x && (y = { point: x.projectionPoint, snappedTo: "vertex" });
      }
      if (!this.rescaleStart)
        this.rescaleStart = y.point, this.rescaleCurrent = y.point;
      else {
        const x = this.rescaleStart, v = y.point, S = b.distance(x, v);
        S >= 0.05 && (this.dispatchEvent(new CustomEvent("request-rescale", {
          detail: {
            measuredMeters: b.roundMeters(S)
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
      x: b.roundMeters(t.x),
      y: b.roundMeters(t.y)
    }, this.activeTool === "wall") {
      const s = b.snapPoint(
        t,
        this.project.grid,
        this.project.walls,
        this.drawingWallStart || void 0
      );
      this.previewPoint = s.point, this.snapInfo = { snappedTo: s.snappedTo, guideAngle: s.guideAngle }, this.wallSnap = null;
    } else if (this.activeTool === "door" || this.activeTool === "window" || this.activeTool === "french_window")
      this.wallSnap = b.snapPointToWall(t, this.project.walls, 0.8), this.previewPoint = null;
    else if (this.activeTool === "calibrate" && this.calibrateStart) {
      const s = this.getBoundingClientRect();
      this.calibrateCurrent = { x: e.clientX - s.left, y: e.clientY - s.top };
    } else if (this.activeTool === "rescale") {
      let s = b.snapPoint(
        t,
        this.project.grid,
        this.project.walls,
        this.rescaleStart || void 0
      );
      if (s.snappedTo === "none" && this.project.walls.length > 0) {
        const i = b.snapPointToWall(t, this.project.walls, 0.6);
        i && (s = { point: i.projectionPoint, snappedTo: "vertex" });
      }
      this.previewPoint = s.point, this.snapInfo = { snappedTo: s.snappedTo, guideAngle: s.guideAngle }, this.wallSnap = null, this.rescaleStart && (this.rescaleCurrent = s.point);
    } else
      this.previewPoint = null, this.wallSnap = null;
  }
  handlePointerUp(e) {
    var t, s, i, o, n, r;
    if (this.isOrbiting) {
      this.isOrbiting = !1, (s = (t = e.target).releasePointerCapture) == null || s.call(t, e.pointerId);
      return;
    }
    if (this.isMarqueeSelecting && this.marqueeStart && this.marqueeCurrent) {
      const a = Math.min(this.marqueeStart.x, this.marqueeCurrent.x), l = Math.max(this.marqueeStart.x, this.marqueeCurrent.x), p = Math.min(this.marqueeStart.y, this.marqueeCurrent.y), c = Math.max(this.marqueeStart.y, this.marqueeCurrent.y);
      if (l - a > 0.05 || c - p > 0.05) {
        const h = this.project.walls.filter((u) => {
          const w = (u.start.x + u.end.x) / 2, C = (u.start.y + u.end.y) / 2;
          return w >= a && w <= l && C >= p && C <= c;
        }).map((u) => u.id), d = this.project.openings.filter((u) => {
          const w = this.project.walls.find((S) => S.id === u.wallId);
          if (!w) return !1;
          const C = w.end.x - w.start.x, $ = w.end.y - w.start.y, y = Math.sqrt(C * C + $ * $);
          if (y === 0) return !1;
          const x = w.start.x + u.offset / y * C, v = w.start.y + u.offset / y * $;
          return x >= a && x <= l && v >= p && v <= c;
        }).map((u) => u.id), g = this.project.rooms.filter((u) => {
          if (!u.polygon || u.polygon.length < 3) return !1;
          const w = Z.calculateCentroid(u.polygon);
          return w.x >= a && w.x <= l && w.y >= p && w.y <= c;
        }).map((u) => u.id), f = this.project.bindings.filter((u) => u.position.x >= a && u.position.x <= l && u.position.y >= p && u.position.y <= c).map((u) => u.id);
        this.selectedElements = {
          wallIds: Array.from(/* @__PURE__ */ new Set([...this.selectedElements.wallIds, ...h])),
          openingIds: Array.from(/* @__PURE__ */ new Set([...this.selectedElements.openingIds, ...d])),
          roomIds: Array.from(/* @__PURE__ */ new Set([...this.selectedElements.roomIds, ...g])),
          bindingIds: Array.from(/* @__PURE__ */ new Set([...this.selectedElements.bindingIds, ...f]))
        }, this.dispatchSelectionChanged();
      }
      this.isMarqueeSelecting = !1, this.marqueeStart = null, this.marqueeCurrent = null, (o = (i = e.target).releasePointerCapture) == null || o.call(i, e.pointerId);
      return;
    }
    this.isPanning && (this.isPanning = !1, (r = (n = e.target).releasePointerCapture) == null || r.call(n, e.pointerId));
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
    const t = (i = e.dataTransfer) == null ? void 0 : i.getData("application/json");
    if (t)
      try {
        const { entityId: o, domain: n, name: r, icon: a } = JSON.parse(t), l = this.screenToWorld(e.clientX, e.clientY), p = Z.findRoomContainingPoint(l, this.project.rooms), c = {
          id: `bind_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
          entityId: o,
          position: {
            x: b.roundMeters(l.x),
            y: b.roundMeters(l.y)
          },
          roomId: p == null ? void 0 : p.id,
          icon: a,
          customName: r,
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
      const o = i ? this.selectedElements.wallIds.filter((n) => n !== t.id) : [...this.selectedElements.wallIds, t.id];
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
      const o = i ? this.selectedElements.openingIds.filter((n) => n !== t.id) : [...this.selectedElements.openingIds, t.id];
      this.selectedElements = { ...this.selectedElements, openingIds: o };
    } else
      this.selectedElements = { wallIds: [], openingIds: [t.id], roomIds: [], bindingIds: [] };
    this.dispatchSelectionChanged();
  }
  renderMarqueeBox() {
    if (!this.isMarqueeSelecting || !this.marqueeStart || !this.marqueeCurrent) return null;
    const e = this.worldToScreen(this.marqueeStart), t = this.worldToScreen(this.marqueeCurrent), s = Math.min(e.x, t.x), i = Math.min(e.y, t.y), o = Math.abs(e.x - t.x), n = Math.abs(e.y - t.y);
    return E`
      <rect 
        class="marquee-selection-box"
        x="${s}" 
        y="${i}" 
        width="${o}" 
        height="${n}" 
      />
    `;
  }
  handleEntityClick(e, t) {
    if (t.stopPropagation(), this.activeTool === "select") {
      const s = t, i = s.shiftKey || s.ctrlKey || s.metaKey, o = this.selectedElements.bindingIds.includes(e.id);
      if (i) {
        const n = o ? this.selectedElements.bindingIds.filter((r) => r !== e.id) : [...this.selectedElements.bindingIds, e.id];
        this.selectedElements = { ...this.selectedElements, bindingIds: n };
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
  handleEntityDblClick(e, t) {
    t.stopPropagation(), this.dispatchEvent(new CustomEvent("hass-more-info", {
      detail: { entityId: e.entityId },
      bubbles: !0,
      composed: !0
    }));
  }
  handleKeyDown(e) {
    e.key === "Escape" ? (this.drawingWallStart = null, this.previewPoint = null, this.calibrateStart = null, this.calibrateCurrent = null, this.rescaleStart = null, this.rescaleCurrent = null, this.wallSnap = null, this.selectedElements = { wallIds: [], openingIds: [], roomIds: [], bindingIds: [] }, this.dispatchSelectionChanged(), this.requestUpdate()) : e.key === "Delete" || e.key === "Backspace" ? this.selectedElements.wallIds.length + this.selectedElements.openingIds.length + this.selectedElements.roomIds.length + this.selectedElements.bindingIds.length > 0 && (e.preventDefault(), this.dispatchEvent(new CustomEvent("request-delete-selected", {
      bubbles: !0,
      composed: !0
    }))) : e.key === " " || e.key === "Spacebar" ? this.wallSnap && (e.preventDefault(), this.openingFlipSide = !this.openingFlipSide, this.requestUpdate()) : e.key.toLowerCase() === "f" && this.wallSnap && (this.openingFlipDirection = !this.openingFlipDirection, this.requestUpdate());
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
    const i = t.x - e.x, o = t.y - e.y, n = Math.sqrt(i * i + o * o);
    if (n === 0) return [e, e, t, t];
    const r = s / 2, a = -o / n * r, l = i / n * r;
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
    return E`
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
    const i = s.x - t.x, o = s.y - t.y, n = i * i + o * o;
    if (n === 0) return b.distance(e, t);
    let r = ((e.x - t.x) * i + (e.y - t.y) * o) / n;
    r = Math.max(0, Math.min(1, r));
    const a = { x: t.x + r * i, y: t.y + r * o };
    return b.distance(e, a);
  }
  getWallHeight(e) {
    const t = this.project.defaultCeilingHeight || 2.5, s = {
      x: (e.start.x + e.end.x) / 2,
      y: (e.start.y + e.end.y) / 2
    }, i = (this.project.rooms || []).filter((o) => {
      if (!o.polygon || o.polygon.length < 3) return !1;
      if (Z.isPointInPolygon(s, o.polygon)) return !0;
      for (let n = 0; n < o.polygon.length; n++) {
        const r = o.polygon[n], a = o.polygon[(n + 1) % o.polygon.length];
        if (this.pointToSegmentDistance(s, r, a) <= e.thickness / 2 + 0.35)
          return !0;
      }
      return !1;
    });
    if (i.length > 0) {
      const o = i.map((n) => n.height || t);
      return Math.max(...o, e.height || 0);
    }
    return e.height || t;
  }
  handleRoomClick(e, t) {
    if (!(this.drawingWallStart || this.calibrateStart || this.rescaleStart)) {
      if (e.stopPropagation(), this.activeTool === "select") {
        const s = e.shiftKey || e.ctrlKey || e.metaKey, i = this.selectedElements.roomIds.includes(t.id);
        if (s) {
          const o = i ? this.selectedElements.roomIds.filter((n) => n !== t.id) : [...this.selectedElements.roomIds, t.id];
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
      var l, p;
      if (!e.polygon || e.polygon.length < 3) return null;
      const t = e.polygon.map((c) => this.worldToScreen(c)), s = t.map((c) => `${c.x},${c.y}`).join(" "), i = this.project.bindings.filter((c) => c.roomId === e.id && c.entityId.startsWith("light.")).some((c) => {
        var d, g, f;
        return ((f = (g = (d = this.hass) == null ? void 0 : d.states) == null ? void 0 : g[c.entityId]) == null ? void 0 : f.state) === "on";
      }), o = Z.calculateCentroid(t), n = e.height || this.project.defaultCeilingHeight || 2.5, r = (e.areaM2 * n).toFixed(1), a = (p = (l = this.selectedElements) == null ? void 0 : l.roomIds) == null ? void 0 : p.includes(e.id);
      return E`
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
          ${this.is3DMode ? E`
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
                H: ${n.toFixed(2)}m · ${r} m³
              </text>
            </g>
          ` : E`
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
      return E`
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
    return E`
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
      var d, g;
      const s = (g = (d = this.selectedElements) == null ? void 0 : d.wallIds) == null ? void 0 : g.includes(t.id), i = this.getWallHeight(t), o = this.is3DMode ? i * e * 0.55 : 0, r = this.computeWallPolygon(t.start, t.end, t.thickness).map((f) => this.worldToScreen(f)), a = this.worldToScreen(t.start), l = this.worldToScreen(t.end), p = r.map((f) => `${f.x},${f.y}`).join(" "), c = b.distance(t.start, t.end), h = {
        x: (a.x + l.x) / 2,
        y: (a.y + l.y) / 2
      };
      if (this.is3DMode) {
        const f = r.map((y) => ({ x: y.x, y: y.y - o })), u = f.map((y) => `${y.x},${y.y}`).join(" "), w = [0, 1, 2, 3].map((y) => {
          const x = (y + 1) % 4, v = r[y], S = r[x], _ = f[x], L = f[y], B = S.x - v.x, F = S.y - v.y, et = Math.sqrt(B * B + F * F) || 1, _t = -F / et, Pt = B / et, j = Math.max(-1, Math.min(1, _t * -0.7 + Pt * -0.7)), z = Math.round(s ? 42 + j * 14 : 34 + j * 16), P = s ? `hsl(192, 85%, ${z}%)` : `hsl(215, 22%, ${z}%)`, D = s ? "#38bdf8" : `hsl(215, 22%, ${z + 6}%)`;
          return {
            pts: `${v.x},${v.y} ${S.x},${S.y} ${_.x},${_.y} ${L.x},${L.y}`,
            fill: P,
            stroke: D
          };
        }), C = s ? "#06b6d4" : "#f1f5f9", $ = s ? "#22d3ee" : "#94a3b8";
        return E`
          <g 
            class="wall-element-3d ${s ? "selected" : ""}" 
            data-wall-id="${t.id}"
            @click=${(y) => this.handleWallClick(y, t)}
            style="cursor: pointer;"
          >
            <!-- 4 parois verticales solides -->
            ${w.map((y) => E`
              <polygon points="${y.pts}" style="fill: ${y.fill}; stroke: ${y.stroke}; stroke-width: 0.8; stroke-linejoin: round;" />
            `)}
            <!-- Chapeau supérieur du mur -->
            <polygon points="${u}" style="fill: ${C}; stroke: ${$}; stroke-width: 1.2; stroke-linejoin: round;" />
          </g>
        `;
      }
      return E`
        <g 
          class="wall-element ${s ? "selected" : ""}" 
          data-wall-id="${t.id}"
          @click=${(f) => this.handleWallClick(f, t)}
        >
          <polygon points="${p}" class="wall-rect" />
          <line x1="${a.x}" y1="${a.y}" x2="${l.x}" y2="${l.y}" class="wall-centerline" />
          
          ${c >= 0.6 ? E`
            <g class="dimension-badge" transform="translate(${h.x}, ${h.y - 14})">
              <rect x="-26" y="-10" width="52" height="20" />
              <text>${b.roundMeters(c).toFixed(2)} m</text>
            </g>
          ` : null}
        </g>
      `;
    });
  }
  renderOpenings() {
    return this.project.openings.map((e) => {
      var f, u;
      const t = (u = (f = this.selectedElements) == null ? void 0 : f.openingIds) == null ? void 0 : u.includes(e.id), s = this.project.walls.find((w) => w.id === e.wallId);
      if (!s) return null;
      const i = s.end.x - s.start.x, o = s.end.y - s.start.y, n = Math.sqrt(i * i + o * o);
      if (n === 0) return null;
      const a = Math.atan2(o, i) * 180 / Math.PI, l = s.start.x + e.offset / n * i, p = s.start.y + e.offset / n * o, c = this.worldToScreen({ x: l, y: p }), h = this.project.pixelsPerMeter * this.viewport.zoom, d = e.width * h, g = s.thickness * h;
      return E`
        <g 
          class="opening-element ${t ? "selected" : ""}" 
          transform="translate(${c.x}, ${c.y}) rotate(${a})"
          style="cursor: pointer;"
          @click=${(w) => this.handleOpeningClick(w, e)}
        >
          <rect 
            x="${-d / 2}" 
            y="${-g / 2 - 1}" 
            width="${d}" 
            height="${g + 2}" 
            class="wall-cutout"
          />

          ${e.type === "door" ? this.renderDoorSymbol(d, g, e.flipSide, e.flipDirection) : null}
          ${e.type === "window" ? this.renderWindowSymbol(d, g) : null}
          ${e.type === "french_window" ? this.renderFrenchWindowSymbol(d, g) : null}
        </g>
      `;
    });
  }
  renderDoorSymbol(e, t, s, i) {
    const o = e / 2, n = s ? -1 : 1, r = i ? o : -o, a = i ? -1 : 1;
    return E`
      <g>
        <rect x="${-o}" y="${-t / 2}" width="4" height="${t}" fill="#94a3b8" />
        <rect x="${o - 4}" y="${-t / 2}" width="4" height="${t}" fill="#94a3b8" />
        <line 
          x1="${r}" 
          y1="0" 
          x2="${r}" 
          y2="${n * e}" 
          class="opening-door-leaf" 
        />
        <path 
          d="M ${r + a * e} 0 A ${e} ${e} 0 0 ${n > 0 ? i ? 0 : 1 : i ? 1 : 0} ${r} ${n * e}" 
          class="opening-door-arc" 
        />
      </g>
    `;
  }
  renderWindowSymbol(e, t) {
    const s = e / 2;
    return E`
      <g>
        <rect x="${-s}" y="${-t / 2}" width="${e}" height="${t}" fill="none" class="opening-window-frame" />
        <line x1="${-s}" y1="0" x2="${s}" y2="0" class="opening-window-glass" />
        <line x1="${-s + 4}" y1="${-t / 4}" x2="${s - 4}" y2="${-t / 4}" stroke="rgba(56, 189, 248, 0.4)" stroke-width="1" />
        <line x1="${-s + 4}" y1="${t / 4}" x2="${s - 4}" y2="${t / 4}" stroke="rgba(56, 189, 248, 0.4)" stroke-width="1" />
      </g>
    `;
  }
  renderFrenchWindowSymbol(e, t) {
    const s = e / 2;
    return E`
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
      var p, c, h, d, g;
      const t = this.worldToScreen(e.position), s = (c = (p = this.hass) == null ? void 0 : p.states) == null ? void 0 : c[e.entityId], i = (s == null ? void 0 : s.state) || "off", o = e.entityId.startsWith("light.") && i === "on", n = e.entityId.startsWith("binary_sensor.") && (i === "on" || i === "detected"), r = e.entityId.startsWith("sensor.") || e.entityId.startsWith("climate."), a = ((h = s == null ? void 0 : s.attributes) == null ? void 0 : h.unit_of_measurement) || (r ? "°" : ""), l = (g = (d = this.selectedElements) == null ? void 0 : d.bindingIds) == null ? void 0 : g.includes(e.id);
      return E`
        <g 
          class="entity-pin ${l ? "selected" : ""} ${o ? "active-light" : ""} ${n ? "active-radar" : ""}"
          transform="translate(${t.x}, ${t.y})"
          @click=${(f) => this.handleEntityClick(e, f)}
          @dblclick=${(f) => this.handleEntityDblClick(e, f)}
          title="${e.customName || e.entityId} : ${i} (Clic pour basculer)"
        >
          <!-- Onde radar animée si mouvement détecté -->
          ${n ? E`<circle cx="0" cy="0" r="16" class="radar-pulse-ring" />` : null}

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
          ${r && i !== "unknown" ? E`
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
    return E`
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
    ).map((a) => this.worldToScreen(a)), s = this.worldToScreen(this.drawingWallStart), i = this.worldToScreen(this.previewPoint), o = t.map((a) => `${a.x},${a.y}`).join(" "), n = b.distance(this.drawingWallStart, this.previewPoint), r = {
      x: (s.x + i.x) / 2,
      y: (s.y + i.y) / 2
    };
    return E`
      <g class="preview-wall-group">
        <polygon points="${o}" class="preview-wall-rect" />
        <line x1="${s.x}" y1="${s.y}" x2="${i.x}" y2="${i.y}" class="preview-wall-line" />

        ${this.snapInfo.guideAngle !== void 0 ? E`
          <line x1="${s.x}" y1="${s.y}" x2="${i.x}" y2="${i.y}" class="angle-guide-line" />
        ` : null}

        <g class="dimension-badge" transform="translate(${r.x}, ${r.y - 16})">
          <rect x="-30" y="-11" width="60" height="22" />
          <text>${b.roundMeters(n).toFixed(2)} m</text>
        </g>
      </g>
    `;
  }
  renderCalibrationLine() {
    if (!this.calibrateStart || !this.calibrateCurrent) return null;
    const e = this.calibrateStart, t = this.calibrateCurrent, s = t.x - e.x, i = t.y - e.y, o = Math.sqrt(s * s + i * i), n = { x: (e.x + t.x) / 2, y: (e.y + t.y) / 2 };
    return E`
      <g class="calibration-preview-group">
        <line x1="${e.x}" y1="${e.y}" x2="${t.x}" y2="${t.y}" class="calibration-line" />
        <circle cx="${e.x}" cy="${e.y}" r="6" class="calibration-endpoint" />
        <circle cx="${t.x}" cy="${t.y}" r="6" class="calibration-endpoint" />

        <g class="dimension-badge" transform="translate(${n.x}, ${n.y - 18})">
          <rect x="-35" y="-11" width="70" height="22" style="stroke: #f59e0b;" />
          <text style="fill: #f59e0b;">${Math.round(o)} px</text>
        </g>
      </g>
    `;
  }
  renderRescaleLine() {
    if (!this.rescaleStart || !this.rescaleCurrent) return null;
    const e = this.worldToScreen(this.rescaleStart), t = this.worldToScreen(this.rescaleCurrent), s = b.distance(this.rescaleStart, this.rescaleCurrent), i = {
      x: (e.x + t.x) / 2,
      y: (e.y + t.y) / 2
    };
    return E`
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
            📐 ${b.roundMeters(s).toFixed(2)} m
          </text>
        </g>
      </g>
    `;
  }
  renderSnapIndicator() {
    if (!this.previewPoint || this.snapInfo.snappedTo === "none") return null;
    const e = this.worldToScreen(this.previewPoint), t = this.snapInfo.snappedTo === "vertex";
    return E`
      <g transform="translate(${e.x}, ${e.y})">
        <circle r="${t ? 7 : 5}" class="snap-indicator" />
        ${t ? E`<circle r="2" fill="#38bdf8" />` : null}
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
    return this.is3DMode ? "Vue 3D Interactive : Glisser (clic gauche/droit) pour pivoter 360°, Molette pour zoomer, Shift+glisser pour déplacer." : this.activeTool === "select" ? "Mode Sélection : Cliquez sur un élément pour le sélectionner (Shift pour multi-sélection, Shift+glisser pour cadre). Suppr pour effacer." : this.activeTool === "wall" ? this.drawingWallStart ? "Cliquez pour terminer le mur. Échap pour annuler." : "Cliquez pour démarrer un mur." : this.activeTool === "door" ? "Survolez un mur. Espace = inverser intérieur/extérieur. F = gauche/droite." : this.activeTool === "window" || this.activeTool === "french_window" ? "Survolez un mur pour insérer la fenêtre." : this.activeTool === "calibrate" ? this.calibrateStart ? "Cliquez sur la 2ème extrémité du mur mesuré." : "Tracez un segment sur un mur pour étalonner l'échelle." : this.activeTool === "rescale" ? this.rescaleStart ? "Tracez la ligne jusqu'au 2ème point (autre extrémité du mur ou point de référence)." : "Mettre à l'échelle : Sélectionnez un mur ou cliquez sur le 1er point de mesure." : null;
  }
  render() {
    const e = this.getHelpMessage();
    return k`
      <div 
        class="canvas-container ${this.isPanning ? "is-panning" : ""} ${this.isOrbiting ? "is-orbiting" : ""}"
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

        ${e ? k`<div class="help-hud">${e}</div>` : null}

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
M.styles = Ee;
I([
  T({ type: Object })
], M.prototype, "hass", 2);
I([
  T({ type: Object })
], M.prototype, "project", 2);
I([
  T({ type: String })
], M.prototype, "activeTool", 2);
I([
  T({ type: Number })
], M.prototype, "currentWallThickness", 2);
I([
  T({ type: Number })
], M.prototype, "currentOpeningWidth", 2);
I([
  T({ type: Boolean })
], M.prototype, "is3DMode", 2);
I([
  T({ type: Object })
], M.prototype, "selectedElements", 2);
I([
  m()
], M.prototype, "isMarqueeSelecting", 2);
I([
  m()
], M.prototype, "marqueeStart", 2);
I([
  m()
], M.prototype, "marqueeCurrent", 2);
I([
  m()
], M.prototype, "viewport", 2);
I([
  m()
], M.prototype, "isPanning", 2);
I([
  m()
], M.prototype, "drawingWallStart", 2);
I([
  m()
], M.prototype, "previewPoint", 2);
I([
  m()
], M.prototype, "snapInfo", 2);
I([
  m()
], M.prototype, "cursorCoords", 2);
I([
  m()
], M.prototype, "wallSnap", 2);
I([
  m()
], M.prototype, "openingFlipSide", 2);
I([
  m()
], M.prototype, "openingFlipDirection", 2);
I([
  m()
], M.prototype, "calibrateStart", 2);
I([
  m()
], M.prototype, "calibrateCurrent", 2);
I([
  m()
], M.prototype, "rescaleStart", 2);
I([
  m()
], M.prototype, "rescaleCurrent", 2);
I([
  m()
], M.prototype, "orbitPitch", 2);
I([
  m()
], M.prototype, "orbitYaw", 2);
I([
  m()
], M.prototype, "isOrbiting", 2);
M = I([
  Y("home-architect-canvas")
], M);
var Ae = Object.defineProperty, ze = Object.getOwnPropertyDescriptor, ft = (e, t, s, i) => {
  for (var o = i > 1 ? void 0 : i ? ze(t, s) : t, n = e.length - 1, r; n >= 0; n--)
    (r = e[n]) && (o = (i ? r(t, s, o) : r(o)) || o);
  return i && o && Ae(t, s, o), o;
};
let tt = class extends H {
  constructor() {
    super(...arguments), this.activeTool = "wall", this.canUndo = !1, this.canRedo = !1, this.position = { x: 20, y: 20 }, this.isDragging = !1, this.dragStartPointer = { x: 0, y: 0 }, this.dragStartPosition = { x: 20, y: 20 };
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
    this.updateHostPosition();
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
    const t = e.clientX - this.dragStartPointer.x, s = e.clientY - this.dragStartPointer.y, o = (this.parentElement || document.body).getBoundingClientRect(), n = this.getBoundingClientRect(), r = 8, a = Math.max(r, o.width - n.width - 8), l = 8, p = Math.max(l, o.height - n.height - 8), c = Math.min(Math.max(this.dragStartPosition.x + t, r), a), h = Math.min(Math.max(this.dragStartPosition.y + s, l), p);
    this.position = { x: Math.round(c), y: Math.round(h) }, this.updateHostPosition();
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
tt.styles = V`
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
ft([
  T({ type: String })
], tt.prototype, "activeTool", 2);
ft([
  T({ type: Boolean })
], tt.prototype, "canUndo", 2);
ft([
  T({ type: Boolean })
], tt.prototype, "canRedo", 2);
ft([
  m()
], tt.prototype, "position", 2);
ft([
  m()
], tt.prototype, "isDragging", 2);
tt = ft([
  Y("home-architect-toolbar")
], tt);
var Oe = Object.defineProperty, Re = Object.getOwnPropertyDescriptor, X = (e, t, s, i) => {
  for (var o = i > 1 ? void 0 : i ? Re(t, s) : t, n = e.length - 1, r; n >= 0; n--)
    (r = e[n]) && (o = (i ? r(t, s, o) : r(o)) || o);
  return i && o && Oe(t, s, o), o;
};
const K = [
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
let q = class extends H {
  constructor() {
    super(...arguments), this.selectedTemplate = K[0], this.width = K[0].widthMeters, this.length = K[0].lengthMeters, this.thickness = K[0].wallThickness, this.addDoor = K[0].addDoor, this.addWindow = K[0].addWindow, this.roomName = K[0].name, this.height = 2.5;
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
          ${K.map((t) => k`
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
q.styles = V`
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
X([
  m()
], q.prototype, "selectedTemplate", 2);
X([
  m()
], q.prototype, "width", 2);
X([
  m()
], q.prototype, "length", 2);
X([
  m()
], q.prototype, "thickness", 2);
X([
  m()
], q.prototype, "addDoor", 2);
X([
  m()
], q.prototype, "addWindow", 2);
X([
  m()
], q.prototype, "roomName", 2);
X([
  m()
], q.prototype, "height", 2);
q = X([
  Y("home-architect-wizard-modal")
], q);
var We = Object.defineProperty, Fe = Object.getOwnPropertyDescriptor, jt = (e, t, s, i) => {
  for (var o = i > 1 ? void 0 : i ? Fe(t, s) : t, n = e.length - 1, r; n >= 0; n--)
    (r = e[n]) && (o = (i ? r(t, s, o) : r(o)) || o);
  return i && o && We(t, s, o), o;
};
let gt = class extends H {
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
gt.styles = V`
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
jt([
  T({ type: Number })
], gt.prototype, "pixelDistance", 2);
jt([
  T({ type: Number })
], gt.prototype, "defaultMeters", 2);
jt([
  m()
], gt.prototype, "realMeters", 2);
gt = jt([
  Y("home-architect-calibrate-modal")
], gt);
var Ne = Object.defineProperty, Le = Object.getOwnPropertyDescriptor, St = (e, t, s, i) => {
  for (var o = i > 1 ? void 0 : i ? Le(t, s) : t, n = e.length - 1, r; n >= 0; n--)
    (r = e[n]) && (o = (i ? r(t, s, o) : r(o)) || o);
  return i && o && Ne(t, s, o), o;
};
const ie = {
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
let at = class extends H {
  constructor() {
    super(...arguments), this.collapsed = !1, this.searchQuery = "", this.activeCategory = "all";
  }
  getEntities() {
    var e;
    return (e = this.hass) != null && e.states ? Object.values(this.hass.states).map((t) => {
      var o, n;
      const s = t.entity_id.split(".")[0], i = ie[s] || ie.default;
      return {
        entity_id: t.entity_id,
        name: ((o = t.attributes) == null ? void 0 : o.friendly_name) || t.entity_id,
        state: t.state,
        domain: s,
        icon: i,
        unit: (n = t.attributes) == null ? void 0 : n.unit_of_measurement
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
        ${t.length === 0 ? k`
          <div class="empty-message">Aucune entité trouvée</div>
        ` : t.map((s) => k`
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
at.styles = V`
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
St([
  T({ type: Object })
], at.prototype, "hass", 2);
St([
  T({ type: Boolean, reflect: !0 })
], at.prototype, "collapsed", 2);
St([
  m()
], at.prototype, "searchQuery", 2);
St([
  m()
], at.prototype, "activeCategory", 2);
at = St([
  Y("home-architect-entity-drawer")
], at);
var He = Object.defineProperty, Ue = Object.getOwnPropertyDescriptor, Mt = (e, t, s, i) => {
  for (var o = i > 1 ? void 0 : i ? Ue(t, s) : t, n = e.length - 1, r; n >= 0; n--)
    (r = e[n]) && (o = (i ? r(t, s, o) : r(o)) || o);
  return i && o && He(t, s, o), o;
};
const qe = [
  { name: "Bleu ciel", color: "rgba(56, 189, 248, 0.18)" },
  { name: "Violet moderne", color: "rgba(168, 85, 247, 0.18)" },
  { name: "Ambre chaleureux", color: "rgba(245, 158, 11, 0.18)" },
  { name: "Émeraude nature", color: "rgba(16, 185, 129, 0.18)" },
  { name: "Indigo profond", color: "rgba(99, 102, 241, 0.18)" },
  { name: "Rose pastel", color: "rgba(244, 63, 94, 0.18)" },
  { name: "Gris ardoise", color: "rgba(148, 163, 184, 0.18)" }
], Be = [
  { label: "2.10 m (Sous-sol)", val: 2.1 },
  { label: "2.30 m (Combles)", val: 2.3 },
  { label: "2.50 m (Standard)", val: 2.5 },
  { label: "2.70 m (Élevé)", val: 2.7 },
  { label: "3.00 m (Haussmann)", val: 3 },
  { label: "3.50 m (Cathédrale)", val: 3.5 }
];
let lt = class extends H {
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
              ${Be.map((t) => k`
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
              ${qe.map((t) => k`
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
lt.styles = V`
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
Mt([
  T({ type: Object })
], lt.prototype, "room", 2);
Mt([
  m()
], lt.prototype, "name", 2);
Mt([
  m()
], lt.prototype, "height", 2);
Mt([
  m()
], lt.prototype, "color", 2);
lt = Mt([
  Y("home-architect-room-modal")
], lt);
class U {
  constructor(t = 1, s = 0, i = 0, o = 1, n = 0, r = 0) {
    this.a = t, this.b = s, this.c = i, this.d = o, this.e = n, this.f = r;
  }
  static identity() {
    return new U(1, 0, 0, 1, 0, 0);
  }
  multiply(t) {
    return new U(
      this.a * t.a + this.c * t.b,
      this.b * t.a + this.d * t.b,
      this.a * t.c + this.c * t.d,
      this.b * t.c + this.d * t.d,
      this.a * t.e + this.c * t.f + this.e,
      this.b * t.e + this.d * t.f + this.f
    );
  }
  translate(t, s) {
    return this.multiply(new U(1, 0, 0, 1, t, s));
  }
  scale(t, s = t) {
    return this.multiply(new U(t, 0, 0, s, 0, 0));
  }
  rotate(t) {
    const s = t * Math.PI / 180, i = Math.cos(s), o = Math.sin(s);
    return this.multiply(new U(i, o, -o, i, 0, 0));
  }
  transformPoint(t) {
    return {
      x: this.a * t.x + this.c * t.y + this.e,
      y: this.b * t.x + this.d * t.y + this.f
    };
  }
  static parseTransform(t) {
    if (!t) return U.identity();
    let s = U.identity();
    const i = /([a-zA-Z]+)\s*\(([^)]+)\)/g;
    let o;
    for (; (o = i.exec(t)) !== null; ) {
      const n = o[1].toLowerCase(), r = o[2].trim().split(/[\s,]+/).map(parseFloat).filter((a) => !isNaN(a));
      n === "matrix" && r.length >= 6 ? s = s.multiply(new U(r[0], r[1], r[2], r[3], r[4], r[5])) : n === "translate" && r.length >= 1 ? s = s.translate(r[0], r[1] || 0) : n === "scale" && r.length >= 1 ? s = s.scale(r[0], r[1] !== void 0 ? r[1] : r[0]) : n === "rotate" && r.length >= 1 && (r.length >= 3 ? s = s.translate(r[1], r[2]).rotate(r[0]).translate(-r[1], -r[2]) : s = s.rotate(r[0]));
    }
    return s;
  }
}
class Ve {
  /**
   * Main entry point to parse and interpret an architectural SVG floor plan
   */
  static parseSvg(t, s = 12, i = 0.2, o = 2.5, n) {
    try {
      const r = {
        importWalls: !0,
        importDoors: !0,
        importWindows: !0,
        importRooms: !0,
        importLabels: !0,
        ...n
      }, l = new DOMParser().parseFromString(t, "image/svg+xml"), p = l.querySelector("parsererror");
      if (p)
        return {
          success: !1,
          walls: [],
          openings: [],
          rooms: [],
          viewBox: { x: 0, y: 0, width: 0, height: 0 },
          pixelsPerMeter: 50,
          stats: { wallCount: 0, doorCount: 0, windowCount: 0, roomCount: 0, textLabelCount: 0, ignoredMeasurementLinesCount: 0 },
          error: "Le fichier SVG contient des erreurs XML : " + p.textContent
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
      const h = this.extractViewBox(c), d = h.width > 0 ? h.width : 1e3, g = s / d, f = Math.round(d / s * 10) / 10, u = [], w = [], C = [], $ = [];
      this.traverseElement(c, U.identity(), {
        segments: u,
        arcs: w,
        textLabels: C,
        polygons: $,
        defaultThickness: i
      });
      const y = u.filter((F) => F.isMeasurementLine).length, x = this.convertSegmentsToWalls(
        u,
        h,
        g,
        i,
        o
      ), v = this.detectOpenings(
        w,
        u,
        x,
        h,
        g
      ), S = this.detectRooms(
        $,
        x,
        C,
        h,
        g,
        o,
        r.importLabels !== !1
      ), _ = r.importWalls !== !1 ? x : [], L = v.filter((F) => F.type === "door" ? r.importDoors !== !1 : r.importWindows !== !1), B = r.importRooms !== !1 ? S : [];
      return {
        success: !0,
        walls: _,
        openings: L,
        rooms: B,
        viewBox: h,
        pixelsPerMeter: f || 50,
        stats: {
          wallCount: x.length,
          doorCount: v.filter((F) => F.type === "door").length,
          windowCount: v.filter((F) => F.type === "window" || F.type === "french_window").length,
          roomCount: S.length,
          textLabelCount: C.length,
          ignoredMeasurementLinesCount: y
        }
      };
    } catch (r) {
      return console.error("Erreur lors du parsing SVG:", r), {
        success: !1,
        walls: [],
        openings: [],
        rooms: [],
        viewBox: { x: 0, y: 0, width: 0, height: 0 },
        pixelsPerMeter: 50,
        stats: { wallCount: 0, doorCount: 0, windowCount: 0, roomCount: 0, textLabelCount: 0, ignoredMeasurementLinesCount: 0 },
        error: `Erreur d'interprétation : ${r.message || String(r)}`
      };
    }
  }
  /**
   * Extrait la viewBox ou dimensions de l'élément SVG racine
   */
  static extractViewBox(t) {
    const s = t.getAttribute("viewBox");
    if (s) {
      const r = s.trim().split(/[\s,]+/).map(parseFloat).filter((a) => !isNaN(a));
      if (r.length >= 4 && r[2] > 0 && r[3] > 0)
        return { x: r[0], y: r[1], width: r[2], height: r[3] };
    }
    const i = (r, a) => {
      if (!r) return a;
      const l = parseFloat(r);
      return isNaN(l) ? a : r.includes("mm") ? l * 3.7795 : r.includes("cm") ? l * 37.795 : r.includes("in") ? l * 96 : r.includes("pt") ? l * 1.333 : l;
    }, o = i(t.getAttribute("width"), 1e3), n = i(t.getAttribute("height"), 750);
    return { x: 0, y: 0, width: o, height: n };
  }
  /**
   * Parcours récursif des nœuds de l'arbre SVG
   */
  static traverseElement(t, s, i) {
    var F, et, _t, Pt;
    const o = t.getAttribute("transform"), n = o ? s.multiply(U.parseTransform(o)) : s, r = t.tagName.toLowerCase(), a = (t.getAttribute("id") || "").toLowerCase(), l = (t.getAttribute("class") || "").toLowerCase(), p = (t.getAttribute("inkscape:label") || "").toLowerCase(), c = (((F = t.closest("g[id]")) == null ? void 0 : F.getAttribute("id")) || "").toLowerCase(), h = (((et = t.parentElement) == null ? void 0 : et.getAttribute("class")) || "").toLowerCase(), d = `${a} ${l} ${p} ${c} ${h}`, g = t.getAttribute("stroke-dasharray") || "", f = (t.getAttribute("style") || "").toLowerCase(), u = ((_t = t.closest("[stroke-dasharray]")) == null ? void 0 : _t.getAttribute("stroke-dasharray")) || "", $ = !!g && g !== "none" && g !== "0" || /stroke-dasharray\s*:\s*(?!none|0)[\d\s,.]+/i.test(f) || !!u && u !== "none" && u !== "0" || /dashed|dotted/.test(f) || /pointill|tirete|dashed|dotted/.test(d) || /dimension|cotation|mesure|cote|measure|guideline|guide|axis|axe|fleche|arrow|marker|tick/i.test(d) || t.hasAttribute("marker-start") || t.hasAttribute("marker-end") || t.closest('g[id*="dimension" i], g[id*="cotation" i], g[id*="cote" i], g[id*="measure" i], g[id*="guide" i]') !== null, y = /door|porte|portillon|swing|battant/.test(d), x = /window|fenetre|vitrage|chassis|baie/.test(d), v = !$ && (/wall|mur|cloison|facade|envelope|structure|enveloppe/.test(d) || !y && !x), S = /room|piece|espace|zone|area|chambre|salon|cuisine|sdb|sejour/.test(d), _ = t.getAttribute("fill") || "", L = t.getAttribute("display"), B = t.getAttribute("visibility");
    if (!(L === "none" || B === "hidden")) {
      switch (r) {
        case "line": {
          const j = parseFloat(t.getAttribute("x1") || "0"), z = parseFloat(t.getAttribute("y1") || "0"), P = parseFloat(t.getAttribute("x2") || "0"), D = parseFloat(t.getAttribute("y2") || "0"), st = n.transformPoint({ x: j, y: z }), mt = n.transformPoint({ x: P, y: D });
          i.segments.push({
            start: st,
            end: mt,
            thickness: i.defaultThickness,
            isWallHint: v && !$,
            isWindowHint: x,
            isDoorHint: y,
            isMeasurementLine: $
          });
          break;
        }
        case "polyline":
        case "polygon": {
          const z = (t.getAttribute("points") || "").trim().split(/[\s,]+/).map(parseFloat).filter((D) => !isNaN(D)), P = [];
          for (let D = 0; D < z.length; D += 2)
            D + 1 < z.length && P.push(n.transformPoint({ x: z[D], y: z[D + 1] }));
          if (P.length >= 2) {
            for (let D = 0; D < P.length - 1; D++)
              i.segments.push({
                start: P[D],
                end: P[D + 1],
                thickness: i.defaultThickness,
                isWallHint: v && !$,
                isWindowHint: x,
                isDoorHint: y,
                isMeasurementLine: $
              });
            r === "polygon" && P.length >= 3 && (i.segments.push({
              start: P[P.length - 1],
              end: P[0],
              thickness: i.defaultThickness,
              isWallHint: v && !$,
              isWindowHint: x,
              isDoorHint: y,
              isMeasurementLine: $
            }), $ || i.polygons.push({
              points: P,
              isRoomHint: S,
              fill: _
            }));
          }
          break;
        }
        case "rect": {
          const j = parseFloat(t.getAttribute("x") || "0"), z = parseFloat(t.getAttribute("y") || "0"), P = parseFloat(t.getAttribute("width") || "0"), D = parseFloat(t.getAttribute("height") || "0");
          if (P > 0 && D > 0) {
            const st = n.transformPoint({ x: j, y: z }), mt = n.transformPoint({ x: j + P, y: z }), At = n.transformPoint({ x: j + P, y: z + D }), zt = n.transformPoint({ x: j, y: z + D });
            if (Math.max(P / D, D / P) >= 3 && !$)
              if (P > D) {
                const Ot = n.transformPoint({ x: j, y: z + D / 2 }), Rt = n.transformPoint({ x: j + P, y: z + D / 2 });
                i.segments.push({
                  start: Ot,
                  end: Rt,
                  thickness: i.defaultThickness,
                  isWallHint: !0,
                  isWindowHint: x,
                  isDoorHint: y,
                  isMeasurementLine: !1
                });
              } else {
                const Ot = n.transformPoint({ x: j + P / 2, y: z }), Rt = n.transformPoint({ x: j + P / 2, y: z + D });
                i.segments.push({
                  start: Ot,
                  end: Rt,
                  thickness: i.defaultThickness,
                  isWallHint: !0,
                  isWindowHint: x,
                  isDoorHint: y,
                  isMeasurementLine: !1
                });
              }
            else
              $ || (i.polygons.push({
                points: [st, mt, At, zt],
                isRoomHint: S || _ !== "none" && _ !== "#000000" && _ !== "black",
                fill: _
              }), i.segments.push(
                { start: st, end: mt, thickness: i.defaultThickness, isWallHint: v, isWindowHint: x, isDoorHint: y, isMeasurementLine: !1 },
                { start: mt, end: At, thickness: i.defaultThickness, isWallHint: v, isWindowHint: x, isDoorHint: y, isMeasurementLine: !1 },
                { start: At, end: zt, thickness: i.defaultThickness, isWallHint: v, isWindowHint: x, isDoorHint: y, isMeasurementLine: !1 },
                { start: zt, end: st, thickness: i.defaultThickness, isWallHint: v, isWindowHint: x, isDoorHint: y, isMeasurementLine: !1 }
              ));
          }
          break;
        }
        case "path": {
          const j = t.getAttribute("d");
          j && this.parsePathData(
            j,
            n,
            i,
            v && !$,
            x,
            y,
            $,
            _
          );
          break;
        }
        case "text": {
          const j = parseFloat(t.getAttribute("x") || "0"), z = parseFloat(t.getAttribute("y") || "0"), P = ((Pt = t.textContent) == null ? void 0 : Pt.trim()) || "", D = /^\d+([.,]\d+)?\s*(m|cm|mm)?$/i.test(P);
          if (P.length > 0 && !D) {
            const st = n.transformPoint({ x: j, y: z });
            i.textLabels.push({
              text: P,
              position: st
            });
          }
          break;
        }
      }
      for (let j = 0; j < t.children.length; j++)
        this.traverseElement(t.children[j], n, i);
    }
  }
  /**
   * Parse une chaîne de commandes SVG path ('d')
   */
  static parsePathData(t, s, i, o, n, r, a, l) {
    const p = /([a-df-z])|([-+]?(?:\d*\.\d+|\d+)(?:[eE][-+]?\d+)?)/gi, c = [];
    let h;
    for (; (h = p.exec(t)) !== null; )
      c.push(h[0]);
    let d = { x: 0, y: 0 }, g = { x: 0, y: 0 }, f = [], u = 0, w = "";
    for (; u < c.length; ) {
      const C = c[u];
      /^[a-df-z]$/i.test(C) && (w = C, u++);
      const $ = w === w.toLowerCase(), y = w.toUpperCase();
      switch (y) {
        case "M": {
          const x = parseFloat(c[u++]), v = parseFloat(c[u++]);
          !isNaN(x) && !isNaN(v) && (d = $ ? { x: d.x + x, y: d.y + v } : { x, y: v }, g = { ...d }, f.length >= 3 && !a && i.polygons.push({
            points: f.map((S) => s.transformPoint(S)),
            isRoomHint: o ? !1 : l !== "none" && l !== "",
            fill: l
          }), f = [{ ...d }]);
          break;
        }
        case "L": {
          const x = parseFloat(c[u++]), v = parseFloat(c[u++]);
          if (!isNaN(x) && !isNaN(v)) {
            const S = $ ? { x: d.x + x, y: d.y + v } : { x, y: v }, _ = s.transformPoint(d), L = s.transformPoint(S);
            i.segments.push({
              start: _,
              end: L,
              thickness: i.defaultThickness,
              isWallHint: o && !a,
              isWindowHint: n,
              isDoorHint: r,
              isMeasurementLine: a
            }), d = S, f.push({ ...d });
          }
          break;
        }
        case "H": {
          const x = parseFloat(c[u++]);
          if (!isNaN(x)) {
            const v = $ ? { x: d.x + x, y: d.y } : { x, y: d.y }, S = s.transformPoint(d), _ = s.transformPoint(v);
            i.segments.push({
              start: S,
              end: _,
              thickness: i.defaultThickness,
              isWallHint: o && !a,
              isWindowHint: n,
              isDoorHint: r,
              isMeasurementLine: a
            }), d = v, f.push({ ...d });
          }
          break;
        }
        case "V": {
          const x = parseFloat(c[u++]);
          if (!isNaN(x)) {
            const v = $ ? { x: d.x, y: d.y + x } : { x: d.x, y: x }, S = s.transformPoint(d), _ = s.transformPoint(v);
            i.segments.push({
              start: S,
              end: _,
              thickness: i.defaultThickness,
              isWallHint: o && !a,
              isWindowHint: n,
              isDoorHint: r,
              isMeasurementLine: a
            }), d = v, f.push({ ...d });
          }
          break;
        }
        case "A": {
          const x = parseFloat(c[u++]), v = parseFloat(c[u++]);
          parseFloat(c[u++]), parseFloat(c[u++]);
          const S = parseFloat(c[u++]), _ = parseFloat(c[u++]), L = parseFloat(c[u++]);
          if (!isNaN(_) && !isNaN(L) && !isNaN(x) && !isNaN(v)) {
            const B = $ ? { x: d.x + _, y: d.y + L } : { x: _, y: L }, F = s.transformPoint(d), et = s.transformPoint(B);
            i.arcs.push({
              start: F,
              end: et,
              rx: x,
              ry: v,
              sweepFlag: S === 1,
              isDoorHint: !0
            }), d = B, f.push({ ...d });
          }
          break;
        }
        case "C":
        case "S":
        case "Q":
        case "T": {
          const x = y === "C" ? 6 : y === "S" || y === "Q" ? 4 : 2, v = [];
          for (let L = 0; L < x; L++) v.push(parseFloat(c[u++]));
          const S = v[v.length - 2], _ = v[v.length - 1];
          !isNaN(S) && !isNaN(_) && (d = $ ? { x: d.x + S, y: d.y + _ } : { x: S, y: _ }, f.push({ ...d }));
          break;
        }
        case "Z": {
          if (f.length >= 2) {
            const x = s.transformPoint(d), v = s.transformPoint(g);
            i.segments.push({
              start: x,
              end: v,
              thickness: i.defaultThickness,
              isWallHint: o && !a,
              isWindowHint: n,
              isDoorHint: r,
              isMeasurementLine: a
            });
          }
          f.length >= 3 && !a && i.polygons.push({
            points: f.map((x) => s.transformPoint(x)),
            isRoomHint: o ? !1 : l !== "none" && l !== "",
            fill: l
          }), d = { ...g }, f = [];
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
  static convertSegmentsToWalls(t, s, i, o, n) {
    const r = [];
    for (const a of t) {
      if (a.isMeasurementLine || a.isDoorHint || a.isWindowHint) continue;
      const l = {
        x: (a.start.x - s.x) * i,
        y: (a.start.y - s.y) * i
      }, p = {
        x: (a.end.x - s.x) * i,
        y: (a.end.y - s.y) * i
      };
      b.distance(l, p) < 0.2 || r.push({
        id: `w_svg_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
        start: { x: b.roundMeters(l.x), y: b.roundMeters(l.y) },
        end: { x: b.roundMeters(p.x), y: b.roundMeters(p.y) },
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
  static consolidateWalls(t) {
    if (t.length === 0) return [];
    let s = [...t];
    for (let n = 0; n < s.length; n++)
      for (let r = n + 1; r < s.length; r++)
        for (const a of [s[n].start, s[n].end])
          for (const l of [s[r].start, s[r].end])
            b.distance(a, l) < 0.12 && (l.x = a.x, l.y = a.y);
    let i = !0, o = 0;
    for (; i && o < 5; ) {
      i = !1, o++;
      for (let n = 0; n < s.length; n++) {
        const r = s[n];
        if (r)
          for (let a = n + 1; a < s.length; a++) {
            const l = s[a];
            if (!l) continue;
            const p = r.end.x - r.start.x, c = r.end.y - r.start.y, h = Math.sqrt(p * p + c * c), d = l.end.x - l.start.x, g = l.end.y - l.start.y, f = Math.sqrt(d * d + g * g);
            if (h === 0 || f === 0) continue;
            const u = (p * d + c * g) / (h * f);
            if (Math.abs(u) > 0.995) {
              if (b.distance(r.end, l.start) < 0.05) {
                r.end = { ...l.end }, s.splice(a, 1), i = !0;
                break;
              } else if (b.distance(r.end, l.end) < 0.05) {
                r.end = { ...l.start }, s.splice(a, 1), i = !0;
                break;
              } else if (b.distance(r.start, l.end) < 0.05) {
                r.start = { ...l.start }, s.splice(a, 1), i = !0;
                break;
              } else if (b.distance(r.start, l.start) < 0.05) {
                r.start = { ...l.end }, s.splice(a, 1), i = !0;
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
  static detectOpenings(t, s, i, o, n) {
    const r = [];
    if (i.length === 0) return r;
    for (const a of t) {
      const l = Math.max(a.rx, a.ry) * n;
      if (l < 0.5 || l > 1.4) continue;
      const p = {
        x: (a.start.x - o.x) * n,
        y: (a.start.y - o.y) * n
      }, c = {
        x: (a.end.x - o.x) * n,
        y: (a.end.y - o.y) * n
      }, h = b.snapPointToWall(p, i, 0.75), d = b.snapPointToWall(c, i, 0.75), g = h && (!d || h.distance < d.distance) ? h : d;
      if (g && g.distance < 0.7) {
        const f = b.roundMeters(Math.min(Math.max(l, 0.73), 1.1)), u = b.roundMeters(g.offset);
        r.some(
          (C) => C.wallId === g.wall.id && Math.abs(C.offset - u) < 0.35
        ) || r.push({
          id: `op_door_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
          wallId: g.wall.id,
          type: "door",
          offset: u,
          width: f,
          flipSide: !1,
          flipDirection: !1
        });
      }
    }
    for (const a of s) {
      if (!a.isWindowHint && !a.isDoorHint || a.isMeasurementLine) continue;
      const l = {
        x: (a.start.x - o.x) * n,
        y: (a.start.y - o.y) * n
      }, p = {
        x: (a.end.x - o.x) * n,
        y: (a.end.y - o.y) * n
      }, c = { x: (l.x + p.x) / 2, y: (l.y + p.y) / 2 }, h = b.distance(l, p);
      if (h < 0.4 || h > 3) continue;
      const d = b.snapPointToWall(c, i, 0.6);
      if (d && d.distance < 0.5) {
        const g = a.isDoorHint ? "door" : h > 1.8 ? "french_window" : "window", f = b.roundMeters(d.offset);
        r.some(
          (w) => w.wallId === d.wall.id && Math.abs(w.offset - f) < 0.35
        ) || r.push({
          id: `op_${g}_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
          wallId: d.wall.id,
          type: g,
          offset: f,
          width: b.roundMeters(h),
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
  static detectRooms(t, s, i, o, n, r, a = !0) {
    const l = [], p = i.map((c) => ({
      text: c.text,
      position: {
        x: (c.position.x - o.x) * n,
        y: (c.position.y - o.y) * n
      }
    }));
    for (const c of t) {
      if (c.points.length < 3) continue;
      const h = c.points.map((w) => ({
        x: b.roundMeters((w.x - o.x) * n),
        y: b.roundMeters((w.y - o.y) * n)
      })), d = Z.computeArea(h);
      if (d < 1.5 || d > 300) continue;
      let g = "";
      if (a) {
        for (const w of p)
          if (Z.isPointInPolygon(w.position, h)) {
            g = w.text;
            break;
          }
      }
      if (!g && !c.isRoomHint) continue;
      const f = g || `Pièce ${l.length + 1}`, u = this.getRoomStyle(f);
      l.push({
        id: `room_svg_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
        name: f,
        polygon: h,
        areaM2: d,
        color: u.color,
        icon: u.icon,
        height: r
      });
    }
    if (l.length === 0 && p.length > 0 && s.length >= 4 && a)
      for (const c of p) {
        const h = c.text.toLowerCase();
        if (/salon|sejour|chambre|cuisine|sdb|bain|wc|bureau|entree|garage|couloir/i.test(h)) {
          const d = c.position.x, g = c.position.y, f = 1.8, u = [
            { x: b.roundMeters(d - f), y: b.roundMeters(g - f) },
            { x: b.roundMeters(d + f), y: b.roundMeters(g - f) },
            { x: b.roundMeters(d + f), y: b.roundMeters(g + f) },
            { x: b.roundMeters(d - f), y: b.roundMeters(g + f) }
          ], w = this.getRoomStyle(c.text);
          l.push({
            id: `room_svg_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
            name: c.text,
            polygon: u,
            areaM2: Z.computeArea(u),
            color: w.color,
            icon: w.icon,
            height: r
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
var Ye = Object.defineProperty, Ge = Object.getOwnPropertyDescriptor, N = (e, t, s, i) => {
  for (var o = i > 1 ? void 0 : i ? Ge(t, s) : t, n = e.length - 1, r; n >= 0; n--)
    (r = e[n]) && (o = (i ? r(t, s, o) : r(o)) || o);
  return i && o && Ye(t, s, o), o;
};
let W = class extends H {
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
        const n = t[o].getAsFile();
        if (n) {
          e.preventDefault(), this.processFile(n);
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
        var n;
        const o = (n = i.target) == null ? void 0 : n.result;
        this.processSvgText(o, e.name);
      }, s.readAsText(e);
    } else {
      this.isSvg = !1, this.svgRawText = null, this.svgInterpretResult = null;
      const s = new FileReader();
      s.onload = (i) => {
        var r;
        const o = (r = i.target) == null ? void 0 : r.result, n = new Image();
        n.onload = () => {
          this.imageDataUrl = o, this.imageWidth = n.naturalWidth, this.imageHeight = n.naturalHeight;
        }, n.src = o;
      }, s.readAsDataURL(e);
    }
  }
  processSvgText(e, t = "Plan SVG importé") {
    this.imageName = t, this.isSvg = !0, this.svgRawText = e, this.computeSvgInterpretation();
    const s = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(e);
    this.imageDataUrl = s;
    const i = new Image();
    i.onload = () => {
      var o, n;
      this.imageWidth = i.naturalWidth || ((o = this.svgInterpretResult) == null ? void 0 : o.viewBox.width) || 1e3, this.imageHeight = i.naturalHeight || ((n = this.svgInterpretResult) == null ? void 0 : n.viewBox.height) || 750;
    }, i.src = s;
  }
  computeSvgInterpretation() {
    this.svgRawText && (this.svgInterpretResult = Ve.parseSvg(
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

                        ${t.ignoredMeasurementLinesCount > 0 ? k`
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

                  ${this.calibrateMode === "auto_dimension" ? k`
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
              ${e ? null : k`
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
          ${!e || this.keepSvgBackground ? k`
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
            ${e ? k`
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
W.styles = V`
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
N([
  T({ type: String })
], W.prototype, "currentLevel", 2);
N([
  m()
], W.prototype, "imageDataUrl", 2);
N([
  m()
], W.prototype, "imageWidth", 2);
N([
  m()
], W.prototype, "imageHeight", 2);
N([
  m()
], W.prototype, "imageName", 2);
N([
  m()
], W.prototype, "isSvg", 2);
N([
  m()
], W.prototype, "svgRawText", 2);
N([
  m()
], W.prototype, "svgInterpretResult", 2);
N([
  m()
], W.prototype, "svgImportMode", 2);
N([
  m()
], W.prototype, "keepSvgBackground", 2);
N([
  m()
], W.prototype, "importOptions", 2);
N([
  m()
], W.prototype, "calibrateMode", 2);
N([
  m()
], W.prototype, "totalWidthMeters", 2);
N([
  m()
], W.prototype, "opacity", 2);
N([
  m()
], W.prototype, "isDragOver", 2);
W = N([
  Y("home-architect-import-modal")
], W);
var Xe = Object.defineProperty, Ke = Object.getOwnPropertyDescriptor, dt = (e, t, s, i) => {
  for (var o = i > 1 ? void 0 : i ? Ke(t, s) : t, n = e.length - 1, r; n >= 0; n--)
    (r = e[n]) && (o = (i ? r(t, s, o) : r(o)) || o);
  return i && o && Xe(t, s, o), o;
};
let G = class extends H {
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
            <span class="ratio-pill ${e > 1.001 ? "ratio-expand" : e < 0.999 ? "ratio-shrink" : "ratio-neutral"}">
              × ${e.toFixed(3)} (${t >= 0 ? "+" : ""}${t.toFixed(1)}%)
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
G.styles = V`
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
dt([
  T({ type: Number })
], G.prototype, "measuredMeters", 2);
dt([
  T({ type: Number })
], G.prototype, "wallCount", 2);
dt([
  T({ type: Number })
], G.prototype, "roomCount", 2);
dt([
  T({ type: Number })
], G.prototype, "openingCount", 2);
dt([
  m()
], G.prototype, "targetMeters", 2);
dt([
  m()
], G.prototype, "adjustBackground", 2);
G = dt([
  Y("home-architect-rescale-modal")
], G);
var Je = Object.defineProperty, Ze = Object.getOwnPropertyDescriptor, O = (e, t, s, i) => {
  for (var o = i > 1 ? void 0 : i ? Ze(t, s) : t, n = e.length - 1, r; n >= 0; n--)
    (r = e[n]) && (o = (i ? r(t, s, o) : r(o)) || o);
  return i && o && Je(t, s, o), o;
};
let A = class extends H {
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
  handleToolSelected(e) {
    this.activeTool = e.detail.tool, this.activeTool === "door" ? this.currentOpeningWidth = 0.9 : this.activeTool === "window" ? this.currentOpeningWidth = 1.2 : this.activeTool === "french_window" && (this.currentOpeningWidth = 2);
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
    const { name: t, width: s, length: i, thickness: o, height: n, color: r, icon: a, addDoor: l, addWindow: p } = e.detail, c = n || 2.5, h = 2, d = 2, g = { x: h, y: d }, f = { x: h + s, y: d }, u = { x: h + s, y: d + i }, w = { x: h, y: d + i }, C = {
      id: `w_top_${Date.now()}`,
      start: g,
      end: f,
      thickness: o,
      height: c,
      type: "standard"
    }, $ = {
      id: `w_right_${Date.now()}`,
      start: f,
      end: u,
      thickness: o,
      height: c,
      type: "standard"
    }, y = {
      id: `w_bottom_${Date.now()}`,
      start: u,
      end: w,
      thickness: o,
      height: c,
      type: "standard"
    }, x = {
      id: `w_left_${Date.now()}`,
      start: w,
      end: g,
      thickness: o,
      height: c,
      type: "standard"
    }, v = [];
    l && v.push({
      id: `op_door_${Date.now()}`,
      wallId: y.id,
      type: "door",
      offset: s / 2,
      width: 0.9,
      flipSide: !1,
      flipDirection: !1
    }), p && v.push({
      id: `op_win_${Date.now()}`,
      wallId: C.id,
      type: "window",
      offset: s / 2,
      width: 1.2,
      flipSide: !1,
      flipDirection: !1
    });
    const S = {
      id: `room_${Date.now()}`,
      name: t,
      polygon: [g, f, u, w],
      areaM2: s * i,
      color: r,
      icon: a,
      height: c
    };
    this.project = {
      ...this.project,
      walls: [...this.project.walls, C, $, y, x],
      openings: [...this.project.openings, ...v],
      rooms: [...this.project.rooms, S]
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
      mode: n,
      totalWidthMeters: r,
      isSvgVectorized: a,
      svgInterpretation: l,
      keepSvgBackground: p
    } = e.detail;
    if (this.isImportModalOpen = !1, a && l && l.success) {
      const { walls: h, openings: d, rooms: g, pixelsPerMeter: f, stats: u } = l, w = p ? {
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
        pixelsPerMeter: f || this.project.pixelsPerMeter,
        walls: [...this.project.walls, ...h],
        openings: [...this.project.openings, ...d],
        rooms: [...this.project.rooms, ...g],
        background: w
      }, this.activeTool = "select", this.showToast(
        `✨ Plan SVG converti : ${u.wallCount} mur${u.wallCount > 1 ? "s" : ""}, ${u.doorCount} porte${u.doorCount > 1 ? "s" : ""}, ${u.windowCount} fenêtre${u.windowCount > 1 ? "s" : ""} et ${u.roomCount} pièce${u.roomCount > 1 ? "s" : ""} créés !`
      );
      return;
    }
    let c = this.project.pixelsPerMeter;
    n === "auto_dimension" && r && r > 0 && (c = Math.round(s / r * 10) / 10), this.project = {
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
    }, n === "auto_dimension" ? (this.activeTool = "wall", this.showToast(`✅ Plan importé et étalonné automatiquement (1 m = ${c} px) ! Vous pouvez tracer vos murs (🧱).`)) : (this.activeTool = "calibrate", this.showToast("📏 Plan importé ! Tracez un segment sur un mur mesuré pour étalonner l'échelle."));
  }
  handlePaste(e) {
    var i;
    if (this.isImportModalOpen || !e.clipboardData) return;
    const t = e.clipboardData.items;
    for (let o = 0; o < t.length; o++)
      if (t[o].type.indexOf("image") !== -1) {
        const n = t[o].getAsFile();
        if (n) {
          e.preventDefault();
          const r = new FileReader();
          r.onload = (a) => {
            var p;
            const l = (p = a.target) == null ? void 0 : p.result;
            this.loadBackgroundImage(l, "📋 Image collée depuis le presse-papier !");
          }, r.readAsDataURL(n);
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
      var r;
      const n = (r = o.target) == null ? void 0 : r.result;
      this.loadBackgroundImage(n, "🖼️ Image importée depuis votre ordinateur !");
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
    const n = this.project.walls.map((h) => ({
      ...h,
      start: {
        x: b.roundMeters(h.start.x * i),
        y: b.roundMeters(h.start.y * i)
      },
      end: {
        x: b.roundMeters(h.end.x * i),
        y: b.roundMeters(h.end.y * i)
      }
    })), r = this.project.openings.map((h) => ({
      ...h,
      offset: b.roundMeters(h.offset * i),
      width: b.roundMeters(h.width * i)
    })), a = this.project.rooms.map((h) => {
      const d = h.polygon.map((f) => ({
        x: b.roundMeters(f.x * i),
        y: b.roundMeters(f.y * i)
      })), g = Z.computeArea(d);
      return {
        ...h,
        polygon: d,
        areaM2: g || b.roundMeters(h.areaM2 * i * i)
      };
    }), l = this.project.bindings.map((h) => ({
      ...h,
      position: {
        x: b.roundMeters(h.position.x * i),
        y: b.roundMeters(h.position.y * i)
      }
    }));
    let p = this.project.pixelsPerMeter, c = this.project.background ? { ...this.project.background } : void 0;
    o && c && (p = Math.round(this.project.pixelsPerMeter / i * 10) / 10, c.offset && (c = {
      ...c,
      offset: {
        x: b.roundMeters(c.offset.x * i),
        y: b.roundMeters(c.offset.y * i)
      }
    })), this.project = {
      ...this.project,
      pixelsPerMeter: p,
      walls: n,
      openings: r,
      rooms: a,
      bindings: l,
      background: c
    }, this.activeTool = "select", this.showToast(
      `✅ Plan mis à l'échelle (×${i.toFixed(3)}) : ${n.length} murs et ${a.length} pièces recalculés !`
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
    const { roomId: t, name: s, height: i, color: o } = e.detail, n = this.project.rooms.map((r) => r.id === t ? { ...r, name: s, height: i, color: o } : r);
    this.project = {
      ...this.project,
      rooms: n
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
    const n = this.project.walls.filter((p) => !e.includes(p.id)), r = this.project.openings.filter(
      (p) => !t.includes(p.id) && !e.includes(p.wallId)
    ), a = this.project.rooms.filter((p) => !s.includes(p.id)), l = this.project.bindings.filter((p) => !i.includes(p.id));
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
      alert("Plan sauvegardé avec succès dans Home Assistant !");
    }).catch((e) => {
      console.error("Erreur sauvegarde HA:", e), localStorage.setItem(`home_architect_${this.project.id}`, JSON.stringify(this.project)), alert("Sauvegardé localement dans le navigateur.");
    }) : (localStorage.setItem(`home_architect_${this.project.id}`, JSON.stringify(this.project)), alert("Plan sauvegardé localement !"));
  }
  render() {
    var t, s;
    const e = !!((t = this.project.background) != null && t.imageUrl);
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
          ${e ? k`
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
    `;
  }
};
A.styles = V`
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
O([
  T({ type: Object })
], A.prototype, "hass", 2);
O([
  T({ type: Boolean })
], A.prototype, "narrow", 2);
O([
  m()
], A.prototype, "activeTool", 2);
O([
  m()
], A.prototype, "currentThickness", 2);
O([
  m()
], A.prototype, "currentOpeningWidth", 2);
O([
  m()
], A.prototype, "activeLevel", 2);
O([
  m()
], A.prototype, "is3DMode", 2);
O([
  m()
], A.prototype, "isDrawerCollapsed", 2);
O([
  m()
], A.prototype, "isWizardOpen", 2);
O([
  m()
], A.prototype, "isImportModalOpen", 2);
O([
  m()
], A.prototype, "isCalibrateModalOpen", 2);
O([
  m()
], A.prototype, "calibrationData", 2);
O([
  m()
], A.prototype, "isRescaleModalOpen", 2);
O([
  m()
], A.prototype, "rescaleMeasuredMeters", 2);
O([
  m()
], A.prototype, "selectedRoomForEdit", 2);
O([
  m()
], A.prototype, "selectedElements", 2);
O([
  m()
], A.prototype, "undoStack", 2);
O([
  m()
], A.prototype, "redoStack", 2);
O([
  m()
], A.prototype, "project", 2);
O([
  m()
], A.prototype, "toastMessage", 2);
A = O([
  Y("home-architect-panel")
], A);
var Qe = Object.defineProperty, ts = Object.getOwnPropertyDescriptor, Ct = (e, t, s, i) => {
  for (var o = i > 1 ? void 0 : i ? ts(t, s) : t, n = e.length - 1, r; n >= 0; n--)
    (r = e[n]) && (o = (i ? r(t, s, o) : r(o)) || o);
  return i && o && Qe(t, s, o), o;
};
let ct = class extends H {
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
  setConfig(e) {
    if (!e) throw new Error("Configuration invalide");
    this.config = e, this.is3DMode = e.view_mode === "3d";
  }
  getCardSize() {
    return 6;
  }
  firstUpdated() {
    this.loadProject();
  }
  async loadProject() {
    var s;
    const e = this.config.project_id || "rdc";
    if (this.hass && this.hass.callWS)
      try {
        const i = await this.hass.callWS({ type: "home_architect/get_projects" }), o = (s = i == null ? void 0 : i.projects) == null ? void 0 : s.find((n) => n.id === e);
        if (o) {
          this.project = o;
          return;
        }
      } catch (i) {
        console.warn("WebSocket get_projects échoué, essai localStorage:", i);
      }
    const t = localStorage.getItem(`home_architect_${e}`);
    if (t)
      try {
        this.project = JSON.parse(t);
      } catch {
      }
  }
  render() {
    var e;
    return k`
      <div class="card-header">
        <div class="card-title">${((e = this.config) == null ? void 0 : e.title) || this.project.name || "Home Architect"}</div>
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
ct.styles = V`
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
Ct([
  T({ type: Object })
], ct.prototype, "hass", 2);
Ct([
  m()
], ct.prototype, "config", 2);
Ct([
  m()
], ct.prototype, "project", 2);
Ct([
  m()
], ct.prototype, "is3DMode", 2);
ct = Ct([
  Y("home-architect-card")
], ct);
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
