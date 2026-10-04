/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ft = globalThis, Kt = Ft.ShadowRoot && (Ft.ShadyCSS === void 0 || Ft.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Jt = Symbol(), ee = /* @__PURE__ */ new WeakMap();
let me = class {
  constructor(t, i, s) {
    if (this._$cssResult$ = !0, s !== Jt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = i;
  }
  get styleSheet() {
    let t = this.o;
    const i = this.t;
    if (Kt && t === void 0) {
      const s = i !== void 0 && i.length === 1;
      s && (t = ee.get(i)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && ee.set(i, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const ke = (e) => new me(typeof e == "string" ? e : e + "", void 0, Jt), K = (e, ...t) => {
  const i = e.length === 1 ? e[0] : t.reduce((s, o, r) => s + ((n) => {
    if (n._$cssResult$ === !0) return n.cssText;
    if (typeof n == "number") return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + e[r + 1], e[0]);
  return new me(i, e, Jt);
}, Se = (e, t) => {
  if (Kt) e.adoptedStyleSheets = t.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of t) {
    const s = document.createElement("style"), o = Ft.litNonce;
    o !== void 0 && s.setAttribute("nonce", o), s.textContent = i.cssText, e.appendChild(s);
  }
}, ie = Kt ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let i = "";
  for (const s of t.cssRules) i += s.cssText;
  return ke(i);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Ce, defineProperty: Me, getOwnPropertyDescriptor: Ie, getOwnPropertyNames: Pe, getOwnPropertySymbols: Te, getPrototypeOf: De } = Object, pt = globalThis, se = pt.trustedTypes, _e = se ? se.emptyScript : "", Ut = pt.reactiveElementPolyfillSupport, Pt = (e, t) => e, Rt = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? _e : null;
      break;
    case Object:
    case Array:
      e = e == null ? e : JSON.stringify(e);
  }
  return e;
}, fromAttribute(e, t) {
  let i = e;
  switch (t) {
    case Boolean:
      i = e !== null;
      break;
    case Number:
      i = e === null ? null : Number(e);
      break;
    case Object:
    case Array:
      try {
        i = JSON.parse(e);
      } catch {
        i = null;
      }
  }
  return i;
} }, Qt = (e, t) => !Ce(e, t), oe = { attribute: !0, type: String, converter: Rt, reflect: !1, useDefault: !1, hasChanged: Qt };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), pt.litPropertyMetadata ?? (pt.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let wt = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, i = oe) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(t, i), !i.noAccessor) {
      const s = Symbol(), o = this.getPropertyDescriptor(t, s, i);
      o !== void 0 && Me(this.prototype, t, o);
    }
  }
  static getPropertyDescriptor(t, i, s) {
    const { get: o, set: r } = Ie(this.prototype, t) ?? { get() {
      return this[i];
    }, set(n) {
      this[i] = n;
    } };
    return { get: o, set(n) {
      const a = o == null ? void 0 : o.call(this);
      r == null || r.call(this, n), this.requestUpdate(t, a, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? oe;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Pt("elementProperties"))) return;
    const t = De(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Pt("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Pt("properties"))) {
      const i = this.properties, s = [...Pe(i), ...Te(i)];
      for (const o of s) this.createProperty(o, i[o]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const i = litPropertyMetadata.get(t);
      if (i !== void 0) for (const [s, o] of i) this.elementProperties.set(s, o);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [i, s] of this.elementProperties) {
      const o = this._$Eu(i, s);
      o !== void 0 && this._$Eh.set(o, i);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const i = [];
    if (Array.isArray(t)) {
      const s = new Set(t.flat(1 / 0).reverse());
      for (const o of s) i.unshift(ie(o));
    } else t !== void 0 && i.push(ie(t));
    return i;
  }
  static _$Eu(t, i) {
    const s = i.attribute;
    return s === !1 ? void 0 : typeof s == "string" ? s : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var t;
    this._$ES = new Promise((i) => this.enableUpdating = i), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (t = this.constructor.l) == null || t.forEach((i) => i(this));
  }
  addController(t) {
    var i;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(t), this.renderRoot !== void 0 && this.isConnected && ((i = t.hostConnected) == null || i.call(t));
  }
  removeController(t) {
    var i;
    (i = this._$EO) == null || i.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), i = this.constructor.elementProperties;
    for (const s of i.keys()) this.hasOwnProperty(s) && (t.set(s, this[s]), delete this[s]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Se(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    var t;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$EO) == null || t.forEach((i) => {
      var s;
      return (s = i.hostConnected) == null ? void 0 : s.call(i);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$EO) == null || t.forEach((i) => {
      var s;
      return (s = i.hostDisconnected) == null ? void 0 : s.call(i);
    });
  }
  attributeChangedCallback(t, i, s) {
    this._$AK(t, s);
  }
  _$ET(t, i) {
    var r;
    const s = this.constructor.elementProperties.get(t), o = this.constructor._$Eu(t, s);
    if (o !== void 0 && s.reflect === !0) {
      const n = (((r = s.converter) == null ? void 0 : r.toAttribute) !== void 0 ? s.converter : Rt).toAttribute(i, s.type);
      this._$Em = t, n == null ? this.removeAttribute(o) : this.setAttribute(o, n), this._$Em = null;
    }
  }
  _$AK(t, i) {
    var r, n;
    const s = this.constructor, o = s._$Eh.get(t);
    if (o !== void 0 && this._$Em !== o) {
      const a = s.getPropertyOptions(o), l = typeof a.converter == "function" ? { fromAttribute: a.converter } : ((r = a.converter) == null ? void 0 : r.fromAttribute) !== void 0 ? a.converter : Rt;
      this._$Em = o;
      const h = l.fromAttribute(i, a.type);
      this[o] = h ?? ((n = this._$Ej) == null ? void 0 : n.get(o)) ?? h, this._$Em = null;
    }
  }
  requestUpdate(t, i, s, o = !1, r) {
    var n;
    if (t !== void 0) {
      const a = this.constructor;
      if (o === !1 && (r = this[t]), s ?? (s = a.getPropertyOptions(t)), !((s.hasChanged ?? Qt)(r, i) || s.useDefault && s.reflect && r === ((n = this._$Ej) == null ? void 0 : n.get(t)) && !this.hasAttribute(a._$Eu(t, s)))) return;
      this.C(t, i, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, i, { useDefault: s, reflect: o, wrapped: r }, n) {
    s && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, n ?? i ?? this[t]), r !== !0 || n !== void 0) || (this._$AL.has(t) || (this.hasUpdated || s || (i = void 0), this._$AL.set(t, i)), o === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (i) {
      Promise.reject(i);
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
    const i = this._$AL;
    try {
      t = this.shouldUpdate(i), t ? (this.willUpdate(i), (s = this._$EO) == null || s.forEach((o) => {
        var r;
        return (r = o.hostUpdate) == null ? void 0 : r.call(o);
      }), this.update(i)) : this._$EM();
    } catch (o) {
      throw t = !1, this._$EM(), o;
    }
    t && this._$AE(i);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var i;
    (i = this._$EO) == null || i.forEach((s) => {
      var o;
      return (o = s.hostUpdated) == null ? void 0 : o.call(s);
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
    this._$Eq && (this._$Eq = this._$Eq.forEach((i) => this._$ET(i, this[i]))), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
wt.elementStyles = [], wt.shadowRootOptions = { mode: "open" }, wt[Pt("elementProperties")] = /* @__PURE__ */ new Map(), wt[Pt("finalized")] = /* @__PURE__ */ new Map(), Ut == null || Ut({ ReactiveElement: wt }), (pt.reactiveElementVersions ?? (pt.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Tt = globalThis, re = (e) => e, Lt = Tt.trustedTypes, ne = Lt ? Lt.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, xe = "$lit$", ct = `lit$${Math.random().toFixed(9).slice(2)}$`, ye = "?" + ct, je = `<${ye}>`, bt = document, _t = () => bt.createComment(""), jt = (e) => e === null || typeof e != "object" && typeof e != "function", Zt = Array.isArray, Ee = (e) => Zt(e) || typeof (e == null ? void 0 : e[Symbol.iterator]) == "function", qt = `[ 	
\f\r]`, Mt = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ae = /-->/g, le = />/g, ut = RegExp(`>|${qt}(?:([^\\s"'>=/]+)(${qt}*=${qt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), de = /'/g, ce = /"/g, ve = /^(?:script|style|textarea|title)$/i, we = (e) => (t, ...i) => ({ _$litType$: e, strings: t, values: i }), x = we(1), I = we(2), $t = Symbol.for("lit-noChange"), N = Symbol.for("lit-nothing"), pe = /* @__PURE__ */ new WeakMap(), gt = bt.createTreeWalker(bt, 129);
function $e(e, t) {
  if (!Zt(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return ne !== void 0 ? ne.createHTML(t) : t;
}
const ze = (e, t) => {
  const i = e.length - 1, s = [];
  let o, r = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", n = Mt;
  for (let a = 0; a < i; a++) {
    const l = e[a];
    let h, c, d = -1, p = 0;
    for (; p < l.length && (n.lastIndex = p, c = n.exec(l), c !== null); ) p = n.lastIndex, n === Mt ? c[1] === "!--" ? n = ae : c[1] !== void 0 ? n = le : c[2] !== void 0 ? (ve.test(c[2]) && (o = RegExp("</" + c[2], "g")), n = ut) : c[3] !== void 0 && (n = ut) : n === ut ? c[0] === ">" ? (n = o ?? Mt, d = -1) : c[1] === void 0 ? d = -2 : (d = n.lastIndex - c[2].length, h = c[1], n = c[3] === void 0 ? ut : c[3] === '"' ? ce : de) : n === ce || n === de ? n = ut : n === ae || n === le ? n = Mt : (n = ut, o = void 0);
    const f = n === ut && e[a + 1].startsWith("/>") ? " " : "";
    r += n === Mt ? l + je : d >= 0 ? (s.push(h), l.slice(0, d) + xe + l.slice(d) + ct + f) : l + ct + (d === -2 ? a : f);
  }
  return [$e(e, r + (e[i] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class Et {
  constructor({ strings: t, _$litType$: i }, s) {
    let o;
    this.parts = [];
    let r = 0, n = 0;
    const a = t.length - 1, l = this.parts, [h, c] = ze(t, i);
    if (this.el = Et.createElement(h, s), gt.currentNode = this.el.content, i === 2 || i === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (o = gt.nextNode()) !== null && l.length < a; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const d of o.getAttributeNames()) if (d.endsWith(xe)) {
          const p = c[n++], f = o.getAttribute(d).split(ct), u = /([.?@])?(.*)/.exec(p);
          l.push({ type: 1, index: r, name: u[2], strings: f, ctor: u[1] === "." ? Oe : u[1] === "?" ? Fe : u[1] === "@" ? Re : Wt }), o.removeAttribute(d);
        } else d.startsWith(ct) && (l.push({ type: 6, index: r }), o.removeAttribute(d));
        if (ve.test(o.tagName)) {
          const d = o.textContent.split(ct), p = d.length - 1;
          if (p > 0) {
            o.textContent = Lt ? Lt.emptyScript : "";
            for (let f = 0; f < p; f++) o.append(d[f], _t()), gt.nextNode(), l.push({ type: 2, index: ++r });
            o.append(d[p], _t());
          }
        }
      } else if (o.nodeType === 8) if (o.data === ye) l.push({ type: 2, index: r });
      else {
        let d = -1;
        for (; (d = o.data.indexOf(ct, d + 1)) !== -1; ) l.push({ type: 7, index: r }), d += ct.length - 1;
      }
      r++;
    }
  }
  static createElement(t, i) {
    const s = bt.createElement("template");
    return s.innerHTML = t, s;
  }
}
function kt(e, t, i = e, s) {
  var n, a;
  if (t === $t) return t;
  let o = s !== void 0 ? (n = i._$Co) == null ? void 0 : n[s] : i._$Cl;
  const r = jt(t) ? void 0 : t._$litDirective$;
  return (o == null ? void 0 : o.constructor) !== r && ((a = o == null ? void 0 : o._$AO) == null || a.call(o, !1), r === void 0 ? o = void 0 : (o = new r(e), o._$AT(e, i, s)), s !== void 0 ? (i._$Co ?? (i._$Co = []))[s] = o : i._$Cl = o), o !== void 0 && (t = kt(e, o._$AS(e, t.values), o, s)), t;
}
class Ae {
  constructor(t, i) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = i;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: i }, parts: s } = this._$AD, o = ((t == null ? void 0 : t.creationScope) ?? bt).importNode(i, !0);
    gt.currentNode = o;
    let r = gt.nextNode(), n = 0, a = 0, l = s[0];
    for (; l !== void 0; ) {
      if (n === l.index) {
        let h;
        l.type === 2 ? h = new zt(r, r.nextSibling, this, t) : l.type === 1 ? h = new l.ctor(r, l.name, l.strings, this, t) : l.type === 6 && (h = new Le(r, this, t)), this._$AV.push(h), l = s[++a];
      }
      n !== (l == null ? void 0 : l.index) && (r = gt.nextNode(), n++);
    }
    return gt.currentNode = bt, o;
  }
  p(t) {
    let i = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, i), i += s.strings.length - 2) : s._$AI(t[i])), i++;
  }
}
class zt {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, i, s, o) {
    this.type = 2, this._$AH = N, this._$AN = void 0, this._$AA = t, this._$AB = i, this._$AM = s, this.options = o, this._$Cv = (o == null ? void 0 : o.isConnected) ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const i = this._$AM;
    return i !== void 0 && (t == null ? void 0 : t.nodeType) === 11 && (t = i.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, i = this) {
    t = kt(this, t, i), jt(t) ? t === N || t == null || t === "" ? (this._$AH !== N && this._$AR(), this._$AH = N) : t !== this._$AH && t !== $t && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Ee(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== N && jt(this._$AH) ? this._$AA.nextSibling.data = t : this.T(bt.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var r;
    const { values: i, _$litType$: s } = t, o = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = Et.createElement($e(s.h, s.h[0]), this.options)), s);
    if (((r = this._$AH) == null ? void 0 : r._$AD) === o) this._$AH.p(i);
    else {
      const n = new Ae(o, this), a = n.u(this.options);
      n.p(i), this.T(a), this._$AH = n;
    }
  }
  _$AC(t) {
    let i = pe.get(t.strings);
    return i === void 0 && pe.set(t.strings, i = new Et(t)), i;
  }
  k(t) {
    Zt(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let s, o = 0;
    for (const r of t) o === i.length ? i.push(s = new zt(this.O(_t()), this.O(_t()), this, this.options)) : s = i[o], s._$AI(r), o++;
    o < i.length && (this._$AR(s && s._$AB.nextSibling, o), i.length = o);
  }
  _$AR(t = this._$AA.nextSibling, i) {
    var s;
    for ((s = this._$AP) == null ? void 0 : s.call(this, !1, !0, i); t !== this._$AB; ) {
      const o = re(t).nextSibling;
      re(t).remove(), t = o;
    }
  }
  setConnected(t) {
    var i;
    this._$AM === void 0 && (this._$Cv = t, (i = this._$AP) == null || i.call(this, t));
  }
}
class Wt {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, i, s, o, r) {
    this.type = 1, this._$AH = N, this._$AN = void 0, this.element = t, this.name = i, this._$AM = o, this.options = r, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = N;
  }
  _$AI(t, i = this, s, o) {
    const r = this.strings;
    let n = !1;
    if (r === void 0) t = kt(this, t, i, 0), n = !jt(t) || t !== this._$AH && t !== $t, n && (this._$AH = t);
    else {
      const a = t;
      let l, h;
      for (t = r[0], l = 0; l < r.length - 1; l++) h = kt(this, a[s + l], i, l), h === $t && (h = this._$AH[l]), n || (n = !jt(h) || h !== this._$AH[l]), h === N ? t = N : t !== N && (t += (h ?? "") + r[l + 1]), this._$AH[l] = h;
    }
    n && !o && this.j(t);
  }
  j(t) {
    t === N ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Oe extends Wt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === N ? void 0 : t;
  }
}
class Fe extends Wt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== N);
  }
}
class Re extends Wt {
  constructor(t, i, s, o, r) {
    super(t, i, s, o, r), this.type = 5;
  }
  _$AI(t, i = this) {
    if ((t = kt(this, t, i, 0) ?? N) === $t) return;
    const s = this._$AH, o = t === N && s !== N || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, r = t !== N && (s === N || o);
    o && this.element.removeEventListener(this.name, this, s), r && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var i;
    typeof this._$AH == "function" ? this._$AH.call(((i = this.options) == null ? void 0 : i.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Le {
  constructor(t, i, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    kt(this, t);
  }
}
const Gt = Tt.litHtmlPolyfillSupport;
Gt == null || Gt(Et, zt), (Tt.litHtmlVersions ?? (Tt.litHtmlVersions = [])).push("3.3.3");
const We = (e, t, i) => {
  const s = (i == null ? void 0 : i.renderBefore) ?? t;
  let o = s._$litPart$;
  if (o === void 0) {
    const r = (i == null ? void 0 : i.renderBefore) ?? null;
    s._$litPart$ = o = new zt(t.insertBefore(_t(), r), r, void 0, i ?? {});
  }
  return o._$AI(e), o;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ft = globalThis;
class H extends wt {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var i;
    const t = super.createRenderRoot();
    return (i = this.renderOptions).renderBefore ?? (i.renderBefore = t.firstChild), t;
  }
  update(t) {
    const i = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = We(i, this.renderRoot, this.renderOptions);
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
    return $t;
  }
}
var be;
H._$litElement$ = !0, H.finalized = !0, (be = ft.litElementHydrateSupport) == null || be.call(ft, { LitElement: H });
const Yt = ft.litElementPolyfillSupport;
Yt == null || Yt({ LitElement: H });
(ft.litElementVersions ?? (ft.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const J = (e) => (t, i) => {
  i !== void 0 ? i.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ne = { attribute: !0, type: String, converter: Rt, reflect: !1, hasChanged: Qt }, Be = (e = Ne, t, i) => {
  const { kind: s, metadata: o } = i;
  let r = globalThis.litPropertyMetadata.get(o);
  if (r === void 0 && globalThis.litPropertyMetadata.set(o, r = /* @__PURE__ */ new Map()), s === "setter" && ((e = Object.create(e)).wrapped = !0), r.set(i.name, e), s === "accessor") {
    const { name: n } = i;
    return { set(a) {
      const l = t.get.call(this);
      t.set.call(this, a), this.requestUpdate(n, l, e, !0, a);
    }, init(a) {
      return a !== void 0 && this.C(n, void 0, e, a), a;
    } };
  }
  if (s === "setter") {
    const { name: n } = i;
    return function(a) {
      const l = this[n];
      t.call(this, a), this.requestUpdate(n, l, e, !0, a);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function D(e) {
  return (t, i) => typeof i == "object" ? Be(e, t, i) : ((s, o, r) => {
    const n = o.hasOwnProperty(r);
    return o.constructor.createProperty(r, s), n ? Object.getOwnPropertyDescriptor(o, r) : void 0;
  })(e, t, i);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function m(e) {
  return D({ ...e, state: !0, attribute: !1 });
}
const He = K`
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

  /* Smart Guides orthogonaux */
  .smart-guide-line {
    stroke: #d946ef;
    stroke-width: 1.5;
    stroke-dasharray: 4, 3;
    opacity: 0.85;
    pointer-events: none;
    filter: drop-shadow(0 0 4px rgba(217, 70, 239, 0.6));
  }

  /* Cotation dynamique automatique des murs */
  .wall-dim-badge {
    pointer-events: none;
    user-select: none;
  }

  .wall-dim-badge rect {
    fill: rgba(15, 23, 42, 0.82);
    stroke: rgba(148, 163, 184, 0.35);
    stroke-width: 0.8;
    rx: 3;
  }

  .wall-dim-badge text {
    fill: #cbd5e1;
    font-size: 9.5px;
    font-weight: 700;
    text-anchor: middle;
    dominant-baseline: central;
    font-family: ui-monospace, SFMono-Regular, monospace;
  }

  /* Meubles & Sanitaires architecturaux */
  .furniture-group {
    cursor: grab;
    transition: filter 0.15s ease;
  }

  .furniture-group:active {
    cursor: grabbing;
  }

  .furniture-group:hover .furniture-symbol {
    stroke: #38bdf8;
    filter: drop-shadow(0 0 8px rgba(56, 189, 248, 0.5));
  }

  .furniture-group.selected .furniture-symbol {
    stroke: #06b6d4 !important;
    stroke-width: 2.2 !important;
    filter: drop-shadow(0 0 12px rgba(6, 182, 212, 0.8)) !important;
  }

  /* Calque fantôme niveau inférieur (Onion Skinning) */
  .ghost-wall {
    stroke: rgba(148, 163, 184, 0.42);
    stroke-width: 2;
    stroke-dasharray: 5, 4;
    fill: none;
    pointer-events: none;
  }

  /* Animations Micro-domotique */
  .fan-spin {
    animation: spinFan 1.2s infinite linear;
    transform-origin: center;
    transform-box: fill-box;
  }

  @keyframes spinFan {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  .soundwave-pulse {
    fill: none;
    stroke: #a855f7;
    stroke-width: 1.8;
    animation: soundWave 1.4s infinite ease-out;
  }

  @keyframes soundWave {
    0% { r: 14px; opacity: 0.9; stroke: #38bdf8; }
    100% { r: 34px; opacity: 0; stroke: #a855f7; }
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
    cursor: grab;
  }

  .entity-pin:active {
    cursor: grabbing;
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

  .entity-pin-state {
    font-size: 8.5px;
    font-weight: 600;
    text-anchor: middle;
    filter: drop-shadow(0 1px 3px rgba(0, 0, 0, 0.95));
    pointer-events: none;
    letter-spacing: 0.2px;
  }

  .entity-pin-state.state-on {
    fill: #34d399; /* Émeraude vif */
  }

  .entity-pin-state.state-off {
    fill: #94a3b8; /* Gris discret */
  }

  .entity-pin-state.state-alert {
    fill: #f87171; /* Rouge alerte */
  }

  .entity-pin-state.state-info {
    fill: #38bdf8; /* Bleu cyan */
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
class w {
  /**
   * Snaps a world point (in meters) to grid, existing vertices, and angle guides.
   */
  static snapPoint(t, i, s = [], o, r = 0.25) {
    let n = { ...t };
    if (i.snapToElements && s.length > 0) {
      let d = r, p = null;
      for (const f of s)
        for (const u of [f.start, f.end]) {
          const g = this.distance(t, u);
          g < d && (d = g, p = u);
        }
      if (p)
        return {
          point: { x: p.x, y: p.y },
          snappedTo: "vertex"
        };
    }
    let a, l;
    if (i.snapToElements && s.length > 0)
      for (const p of s)
        for (const f of [p.start, p.end])
          o && Math.abs(f.x - o.x) < 0.01 && Math.abs(f.y - o.y) < 0.01 || (a === void 0 && Math.abs(n.x - f.x) < 0.18 && (n.x = f.x, a = f.x), l === void 0 && Math.abs(n.y - f.y) < 0.18 && (n.y = f.y, l = f.y));
    let h = !1, c;
    if (i.snapToAngles && o && a === void 0 && l === void 0) {
      const d = t.x - o.x, p = t.y - o.y, f = Math.sqrt(d * d + p * p);
      if (f > 0.05) {
        let g = Math.atan2(p, d) * 180 / Math.PI;
        g < 0 && (g += 360);
        const b = 45, k = Math.round(g / b) * b;
        if (Math.abs(g - k) <= 6) {
          const P = k * Math.PI / 180;
          n = {
            x: o.x + f * Math.cos(P),
            y: o.y + f * Math.sin(P)
          }, h = !0, c = k;
        }
      }
    }
    if (i.snapToGrid && !h && a === void 0 && l === void 0) {
      const d = i.size || 0.5;
      return n = {
        x: Math.round(n.x / d) * d,
        y: Math.round(n.y / d) * d
      }, { point: n, snappedTo: "grid" };
    } else {
      if (a !== void 0 || l !== void 0)
        return { point: n, snappedTo: "smart_guide", smartGuideX: a, smartGuideY: l };
      if (h)
        return { point: n, snappedTo: "angle", guideAngle: c };
    }
    return { point: t, snappedTo: "none" };
  }
  /**
   * Snaps a point to the nearest wall centerline for placing doors and windows
   */
  static snapPointToWall(t, i, s = 0.6) {
    let o = null, r = s;
    for (const n of i) {
      const a = n.end.x - n.start.x, l = n.end.y - n.start.y, h = Math.sqrt(a * a + l * l);
      if (h === 0) continue;
      const c = Math.max(0, Math.min(
        1,
        ((t.x - n.start.x) * a + (t.y - n.start.y) * l) / (h * h)
      )), d = n.start.x + c * a, p = n.start.y + c * l, f = Math.sqrt((t.x - d) ** 2 + (t.y - p) ** 2);
      f < r && (r = f, o = {
        wall: n,
        projectionPoint: { x: d, y: p },
        offset: c * h,
        distance: f,
        angleRad: Math.atan2(l, a)
      });
    }
    return o;
  }
  static distance(t, i) {
    const s = t.x - i.x, o = t.y - i.y;
    return Math.sqrt(s * s + o * o);
  }
  static roundMeters(t, i = 2) {
    const s = Math.pow(10, i);
    return Math.round(t * s) / s;
  }
}
class V {
  /**
   * Ray-casting algorithm to test if a 2D point is inside a polygon
   */
  static isPointInPolygon(t, i) {
    if (!i || i.length < 3) return !1;
    let s = !1;
    for (let o = 0, r = i.length - 1; o < i.length; r = o++) {
      const n = i[o].x, a = i[o].y, l = i[r].x, h = i[r].y;
      a > t.y != h > t.y && t.x < (l - n) * (t.y - a) / (h - a) + n && (s = !s);
    }
    return s;
  }
  /**
   * Finds the room containing the specified world point (if any)
   */
  static findRoomContainingPoint(t, i) {
    for (const s of i)
      if (this.isPointInPolygon(t, s.polygon))
        return s;
    return null;
  }
  /**
   * Calculates the centroid of a polygon
   */
  static calculateCentroid(t) {
    if (!t || t.length === 0) return { x: 0, y: 0 };
    let i = 0, s = 0;
    for (const o of t)
      i += o.x, s += o.y;
    return {
      x: i / t.length,
      y: s / t.length
    };
  }
  /**
   * Computes the geometric area (in m²) of a polygon using the Shoelace formula
   */
  static computeArea(t) {
    if (!t || t.length < 3) return 0;
    let i = 0;
    for (let s = 0; s < t.length; s++) {
      const o = (s + 1) % t.length;
      i += t[s].x * t[o].y, i -= t[o].x * t[s].y;
    }
    return Math.round(Math.abs(i / 2) * 100) / 100;
  }
}
const Xt = [
  // ==========================================
  // SALON (SEATING)
  // ==========================================
  {
    type: "sofa_3p",
    name: "Canapé 3 places",
    category: "seating",
    width: 2.2,
    length: 0.95,
    icon: "🛋️",
    renderSvg: (e, t, i) => {
      const s = Math.max(8, e * 0.1), o = Math.max(10, t * 0.26), r = (e - s * 2) / 3;
      return I`
        <g class="furniture-symbol" stroke="${i ? "#38bdf8" : "#94a3b8"}" stroke-width="1.6" fill="${i ? "rgba(56, 189, 248, 0.25)" : "rgba(30, 41, 59, 0.85)"}">
          <!-- Contour principal -->
          <rect x="${-e / 2}" y="${-t / 2}" width="${e}" height="${t}" rx="6" />
          <!-- Dossier arrière -->
          <rect x="${-e / 2 + s}" y="${-t / 2}" width="${e - s * 2}" height="${o}" rx="3" fill="rgba(51, 65, 85, 0.9)" />
          <!-- Accoudoirs gauche & droit -->
          <rect x="${-e / 2}" y="${-t / 2}" width="${s}" height="${t}" rx="4" fill="rgba(51, 65, 85, 0.9)" />
          <rect x="${e / 2 - s}" y="${-t / 2}" width="${s}" height="${t}" rx="4" fill="rgba(51, 65, 85, 0.9)" />
          <!-- 3 Coussins d'assise -->
          <rect x="${-e / 2 + s + 2}" y="${-t / 2 + o + 2}" width="${r - 4}" height="${t - o - 4}" rx="4" />
          <rect x="${-e / 2 + s + r + 2}" y="${-t / 2 + o + 2}" width="${r - 4}" height="${t - o - 4}" rx="4" />
          <rect x="${-e / 2 + s + r * 2 + 2}" y="${-t / 2 + o + 2}" width="${r - 4}" height="${t - o - 4}" rx="4" />
        </g>
      `;
    }
  },
  {
    type: "sofa_2p",
    name: "Canapé 2 places",
    category: "seating",
    width: 1.6,
    length: 0.9,
    icon: "🛋️",
    renderSvg: (e, t, i) => {
      const s = Math.max(8, e * 0.12), o = Math.max(10, t * 0.26), r = (e - s * 2) / 2;
      return I`
        <g class="furniture-symbol" stroke="${i ? "#38bdf8" : "#94a3b8"}" stroke-width="1.6" fill="${i ? "rgba(56, 189, 248, 0.25)" : "rgba(30, 41, 59, 0.85)"}">
          <rect x="${-e / 2}" y="${-t / 2}" width="${e}" height="${t}" rx="6" />
          <rect x="${-e / 2 + s}" y="${-t / 2}" width="${e - s * 2}" height="${o}" rx="3" fill="rgba(51, 65, 85, 0.9)" />
          <rect x="${-e / 2}" y="${-t / 2}" width="${s}" height="${t}" rx="4" fill="rgba(51, 65, 85, 0.9)" />
          <rect x="${e / 2 - s}" y="${-t / 2}" width="${s}" height="${t}" rx="4" fill="rgba(51, 65, 85, 0.9)" />
          <rect x="${-e / 2 + s + 2}" y="${-t / 2 + o + 2}" width="${r - 4}" height="${t - o - 4}" rx="4" />
          <rect x="${-e / 2 + s + r + 2}" y="${-t / 2 + o + 2}" width="${r - 4}" height="${t - o - 4}" rx="4" />
        </g>
      `;
    }
  },
  {
    type: "armchair",
    name: "Fauteuil club",
    category: "seating",
    width: 0.85,
    length: 0.85,
    icon: "🪑",
    renderSvg: (e, t, i) => {
      const s = Math.max(6, e * 0.18), o = Math.max(8, t * 0.28);
      return I`
        <g class="furniture-symbol" stroke="${i ? "#38bdf8" : "#94a3b8"}" stroke-width="1.5" fill="${i ? "rgba(56, 189, 248, 0.25)" : "rgba(30, 41, 59, 0.85)"}">
          <rect x="${-e / 2}" y="${-t / 2}" width="${e}" height="${t}" rx="6" />
          <rect x="${-e / 2 + s}" y="${-t / 2}" width="${e - s * 2}" height="${o}" rx="3" fill="rgba(51, 65, 85, 0.9)" />
          <rect x="${-e / 2}" y="${-t / 2}" width="${s}" height="${t}" rx="4" fill="rgba(51, 65, 85, 0.9)" />
          <rect x="${e / 2 - s}" y="${-t / 2}" width="${s}" height="${t}" rx="4" fill="rgba(51, 65, 85, 0.9)" />
          <rect x="${-e / 2 + s + 2}" y="${-t / 2 + o + 2}" width="${e - s * 2 - 4}" height="${t - o - 4}" rx="4" />
        </g>
      `;
    }
  },
  {
    type: "coffee_table",
    name: "Table basse",
    category: "seating",
    width: 1.1,
    length: 0.6,
    icon: "☕",
    renderSvg: (e, t, i) => I`
        <g class="furniture-symbol" stroke="${i ? "#38bdf8" : "#94a3b8"}" stroke-width="1.5" fill="${i ? "rgba(56, 189, 248, 0.25)" : "rgba(30, 41, 59, 0.85)"}">
          <rect x="${-e / 2}" y="${-t / 2}" width="${e}" height="${t}" rx="8" />
          <line x1="${-e / 2 + 8}" y1="${-t / 2 + 8}" x2="${e / 2 - 8}" y2="${t / 2 - 8}" stroke-dasharray="3,3" opacity="0.4" />
          <line x1="${e / 2 - 8}" y1="${-t / 2 + 8}" x2="${-e / 2 + 8}" y2="${t / 2 - 8}" stroke-dasharray="3,3" opacity="0.4" />
        </g>
      `
  },
  // ==========================================
  // CHAMBRE (BED)
  // ==========================================
  {
    type: "bed_double",
    name: "Lit double (Queen)",
    category: "bed",
    width: 1.6,
    length: 2,
    icon: "🛏️",
    renderSvg: (e, t, i) => {
      const s = (e - 16) / 2, o = t * 0.22, r = -t / 2 + o + 8;
      return I`
        <g class="furniture-symbol" stroke="${i ? "#38bdf8" : "#94a3b8"}" stroke-width="1.6" fill="${i ? "rgba(56, 189, 248, 0.25)" : "rgba(30, 41, 59, 0.85)"}">
          <!-- Cadre du lit -->
          <rect x="${-e / 2}" y="${-t / 2}" width="${e}" height="${t}" rx="6" />
          <!-- Tête de lit -->
          <line x1="${-e / 2}" y1="${-t / 2 + 4}" x2="${e / 2}" y2="${-t / 2 + 4}" stroke-width="3" stroke="${i ? "#38bdf8" : "#cbd5e1"}" />
          <!-- 2 Oreillers -->
          <rect x="${-e / 2 + 6}" y="${-t / 2 + 8}" width="${s}" height="${o}" rx="4" fill="rgba(241, 245, 249, 0.2)" />
          <rect x="${e / 2 - s - 6}" y="${-t / 2 + 8}" width="${s}" height="${o}" rx="4" fill="rgba(241, 245, 249, 0.2)" />
          <!-- Revers de couette -->
          <path d="M ${-e / 2 + 4} ${r} Q 0 ${r + 8} ${e / 2 - 4} ${r}" fill="none" stroke-width="1.8" />
        </g>
      `;
    }
  },
  {
    type: "bed_single",
    name: "Lit simple",
    category: "bed",
    width: 0.9,
    length: 1.9,
    icon: "🛏️",
    renderSvg: (e, t, i) => {
      const s = e - 16, o = t * 0.22, r = -t / 2 + o + 8;
      return I`
        <g class="furniture-symbol" stroke="${i ? "#38bdf8" : "#94a3b8"}" stroke-width="1.5" fill="${i ? "rgba(56, 189, 248, 0.25)" : "rgba(30, 41, 59, 0.85)"}">
          <rect x="${-e / 2}" y="${-t / 2}" width="${e}" height="${t}" rx="6" />
          <line x1="${-e / 2}" y1="${-t / 2 + 3}" x2="${e / 2}" y2="${-t / 2 + 3}" stroke-width="2.5" stroke="${i ? "#38bdf8" : "#cbd5e1"}" />
          <rect x="${-e / 2 + 8}" y="${-t / 2 + 8}" width="${s}" height="${o}" rx="4" fill="rgba(241, 245, 249, 0.2)" />
          <path d="M ${-e / 2 + 4} ${r} Q 0 ${r + 6} ${e / 2 - 4} ${r}" fill="none" stroke-width="1.8" />
        </g>
      `;
    }
  },
  {
    type: "nightstand",
    name: "Table de chevet",
    category: "bed",
    width: 0.45,
    length: 0.4,
    icon: "🕰️",
    renderSvg: (e, t, i) => I`
        <g class="furniture-symbol" stroke="${i ? "#38bdf8" : "#94a3b8"}" stroke-width="1.4" fill="${i ? "rgba(56, 189, 248, 0.25)" : "rgba(30, 41, 59, 0.85)"}">
          <rect x="${-e / 2}" y="${-t / 2}" width="${e}" height="${t}" rx="4" />
          <line x1="${-e / 2 + 4}" y1="${0}" x2="${e / 2 - 4}" y2="${0}" stroke-width="1.2" />
          <circle cx="0" cy="${-t / 4}" r="2" fill="${i ? "#38bdf8" : "#94a3b8"}" />
          <circle cx="0" cy="${t / 4}" r="2" fill="${i ? "#38bdf8" : "#94a3b8"}" />
        </g>
      `
  },
  {
    type: "wardrobe",
    name: "Armoire dressing",
    category: "storage",
    width: 1.8,
    length: 0.6,
    icon: "🚪",
    renderSvg: (e, t, i) => {
      const s = e / 3;
      return I`
        <g class="furniture-symbol" stroke="${i ? "#38bdf8" : "#94a3b8"}" stroke-width="1.5" fill="${i ? "rgba(56, 189, 248, 0.25)" : "rgba(30, 41, 59, 0.85)"}">
          <rect x="${-e / 2}" y="${-t / 2}" width="${e}" height="${t}" rx="3" />
          <line x1="${-e / 2 + s}" y1="${-t / 2}" x2="${-e / 2 + s}" y2="${t / 2}" />
          <line x1="${-e / 2 + s * 2}" y1="${-t / 2}" x2="${-e / 2 + s * 2}" y2="${t / 2}" />
          <!-- Tringle à vêtements symbolique -->
          <line x1="${-e / 2 + 6}" y1="0" x2="${e / 2 - 6}" y2="0" stroke-dasharray="4,3" stroke-width="1.2" opacity="0.6" />
        </g>
      `;
    }
  },
  // ==========================================
  // REPAS & BUREAU (TABLE)
  // ==========================================
  {
    type: "dining_table_6",
    name: "Table repas (6 chaises)",
    category: "table",
    width: 1.6,
    length: 0.9,
    icon: "🍽️",
    renderSvg: (e, t, i) => {
      const s = e * 0.24, o = 7;
      return I`
        <g class="furniture-symbol" stroke="${i ? "#38bdf8" : "#94a3b8"}" stroke-width="1.5" fill="${i ? "rgba(56, 189, 248, 0.25)" : "rgba(30, 41, 59, 0.85)"}">
          <!-- Plateau principal -->
          <rect x="${-e / 2}" y="${-t / 2}" width="${e}" height="${t}" rx="5" />
          <!-- 3 Chaises du haut -->
          <rect x="${-e / 2 + 6}" y="${-t / 2 - o}" width="${s}" height="${o}" rx="2" />
          <rect x="${-s / 2}" y="${-t / 2 - o}" width="${s}" height="${o}" rx="2" />
          <rect x="${e / 2 - s - 6}" y="${-t / 2 - o}" width="${s}" height="${o}" rx="2" />
          <!-- 3 Chaises du bas -->
          <rect x="${-e / 2 + 6}" y="${t / 2}" width="${s}" height="${o}" rx="2" />
          <rect x="${-s / 2}" y="${t / 2}" width="${s}" height="${o}" rx="2" />
          <rect x="${e / 2 - s - 6}" y="${t / 2}" width="${s}" height="${o}" rx="2" />
        </g>
      `;
    }
  },
  {
    type: "desk",
    name: "Bureau avec fauteuil",
    category: "table",
    width: 1.4,
    length: 0.7,
    icon: "💻",
    renderSvg: (e, t, i) => I`
        <g class="furniture-symbol" stroke="${i ? "#38bdf8" : "#94a3b8"}" stroke-width="1.5" fill="${i ? "rgba(56, 189, 248, 0.25)" : "rgba(30, 41, 59, 0.85)"}">
          <!-- Plateau de bureau -->
          <rect x="${-e / 2}" y="${-t / 2}" width="${e}" height="${t}" rx="4" />
          <!-- Écran d'ordinateur symbolique -->
          <rect x="-14" y="${-t / 2 + 6}" width="28" height="4" rx="1" fill="${i ? "#38bdf8" : "#cbd5e1"}" />
          <!-- Évidement chaise -->
          <path d="M -16 ${t / 2} A 16 16 0 0 1 16 ${t / 2}" fill="none" stroke-dasharray="3,3" />
        </g>
      `
  },
  // ==========================================
  // SANITAIRES (BATHROOM)
  // ==========================================
  {
    type: "toilet",
    name: "WC / Toilettes",
    category: "bathroom",
    width: 0.45,
    length: 0.65,
    icon: "🚽",
    renderSvg: (e, t, i) => {
      const s = t * 0.28;
      return I`
        <g class="furniture-symbol" stroke="${i ? "#38bdf8" : "#94a3b8"}" stroke-width="1.5" fill="${i ? "rgba(56, 189, 248, 0.25)" : "rgba(30, 41, 59, 0.85)"}">
          <!-- Réservoir d'eau -->
          <rect x="${-e / 2}" y="${-t / 2}" width="${e}" height="${s}" rx="3" fill="rgba(51, 65, 85, 0.9)" />
          <!-- Cuvette de WC -->
          <path d="M ${-e / 2 + 2} ${-t / 2 + s} 
                   L ${e / 2 - 2} ${-t / 2 + s} 
                   L ${e / 2 - 2} ${t / 2 - e / 2} 
                   A ${e / 2 - 2} ${e / 2 - 2} 0 0 1 ${-e / 2 + 2} ${t / 2 - e / 2} 
                   Z" />
        </g>
      `;
    }
  },
  {
    type: "shower",
    name: "Douche italienne",
    category: "bathroom",
    width: 0.9,
    length: 0.9,
    icon: "🚿",
    renderSvg: (e, t, i) => I`
        <g class="furniture-symbol" stroke="${i ? "#38bdf8" : "#94a3b8"}" stroke-width="1.5" fill="${i ? "rgba(56, 189, 248, 0.25)" : "rgba(30, 41, 59, 0.85)"}">
          <!-- Bac carré -->
          <rect x="${-e / 2}" y="${-t / 2}" width="${e}" height="${t}" rx="2" />
          <!-- Diagonales d'écoulement -->
          <line x1="${-e / 2}" y1="${-t / 2}" x2="0" y2="0" stroke-width="1" stroke-dasharray="2,2" opacity="0.6" />
          <line x1="${e / 2}" y1="${-t / 2}" x2="0" y2="0" stroke-width="1" stroke-dasharray="2,2" opacity="0.6" />
          <line x1="${-e / 2}" y1="${t / 2}" x2="0" y2="0" stroke-width="1" stroke-dasharray="2,2" opacity="0.6" />
          <line x1="${e / 2}" y1="${t / 2}" x2="0" y2="0" stroke-width="1" stroke-dasharray="2,2" opacity="0.6" />
          <!-- Bonde centrale -->
          <circle cx="0" cy="0" r="4" fill="${i ? "#38bdf8" : "#0284c7"}" />
        </g>
      `
  },
  {
    type: "bathtub",
    name: "Baignoire droite",
    category: "bathroom",
    width: 1.7,
    length: 0.75,
    icon: "🛁",
    renderSvg: (e, t, i) => I`
        <g class="furniture-symbol" stroke="${i ? "#38bdf8" : "#94a3b8"}" stroke-width="1.6" fill="${i ? "rgba(56, 189, 248, 0.25)" : "rgba(30, 41, 59, 0.85)"}">
          <!-- Contour extérieur -->
          <rect x="${-e / 2}" y="${-t / 2}" width="${e}" height="${t}" rx="5" />
          <!-- Cuve arrondie intérieure -->
          <rect x="${-e / 2 + 6}" y="${-t / 2 + 6}" width="${e - 12}" height="${t - 12}" rx="${(t - 12) / 2}" fill="rgba(2, 132, 199, 0.2)" />
          <!-- Bonde -->
          <circle cx="${-e / 2 + 18}" cy="0" r="3" fill="${i ? "#38bdf8" : "#94a3b8"}" />
        </g>
      `
  },
  {
    type: "sink_vanity",
    name: "Meuble vasque",
    category: "bathroom",
    width: 0.9,
    length: 0.5,
    icon: "🧼",
    renderSvg: (e, t, i) => {
      const s = e * 0.65, o = t * 0.65;
      return I`
        <g class="furniture-symbol" stroke="${i ? "#38bdf8" : "#94a3b8"}" stroke-width="1.5" fill="${i ? "rgba(56, 189, 248, 0.25)" : "rgba(30, 41, 59, 0.85)"}">
          <rect x="${-e / 2}" y="${-t / 2}" width="${e}" height="${t}" rx="3" />
          <!-- Vasque ovale -->
          <ellipse cx="0" cy="0" rx="${s / 2}" ry="${o / 2}" fill="rgba(2, 132, 199, 0.25)" />
          <!-- Robinet -->
          <circle cx="0" cy="${-o / 2 + 2}" r="2" fill="${i ? "#38bdf8" : "#94a3b8"}" />
        </g>
      `;
    }
  },
  // ==========================================
  // CUISINE (KITCHEN)
  // ==========================================
  {
    type: "kitchen_sink",
    name: "Évier cuisine double",
    category: "kitchen",
    width: 1,
    length: 0.6,
    icon: "🚰",
    renderSvg: (e, t, i) => {
      const s = (e - 18) / 2, o = t - 16;
      return I`
        <g class="furniture-symbol" stroke="${i ? "#38bdf8" : "#94a3b8"}" stroke-width="1.5" fill="${i ? "rgba(56, 189, 248, 0.25)" : "rgba(30, 41, 59, 0.85)"}">
          <rect x="${-e / 2}" y="${-t / 2}" width="${e}" height="${t}" rx="3" />
          <!-- 2 Bacs -->
          <rect x="${-e / 2 + 6}" y="${-t / 2 + 8}" width="${s}" height="${o}" rx="4" fill="rgba(2, 132, 199, 0.25)" />
          <rect x="${6}" y="${-t / 2 + 8}" width="${s}" height="${o}" rx="4" fill="rgba(2, 132, 199, 0.25)" />
          <!-- Mitigeur -->
          <circle cx="0" cy="${-t / 2 + 5}" r="2.5" fill="${i ? "#38bdf8" : "#f59e0b"}" />
        </g>
      `;
    }
  },
  {
    type: "cooktop",
    name: "Plaque de cuisson",
    category: "kitchen",
    width: 0.6,
    length: 0.6,
    icon: "🍳",
    renderSvg: (e, t, i) => {
      const s = Math.min(e, t) * 0.18, o = Math.min(e, t) * 0.13;
      return I`
        <g class="furniture-symbol" stroke="${i ? "#38bdf8" : "#94a3b8"}" stroke-width="1.5" fill="${i ? "rgba(56, 189, 248, 0.25)" : "rgba(30, 41, 59, 0.85)"}">
          <rect x="${-e / 2}" y="${-t / 2}" width="${e}" height="${t}" rx="4" />
          <!-- 4 Feux / Foyers induction -->
          <circle cx="${-e / 4}" cy="${-t / 4}" r="${s}" fill="rgba(239, 68, 68, 0.2)" />
          <circle cx="${e / 4}" cy="${-t / 4}" r="${o}" fill="rgba(239, 68, 68, 0.2)" />
          <circle cx="${-e / 4}" cy="${t / 4}" r="${o}" fill="rgba(239, 68, 68, 0.2)" />
          <circle cx="${e / 4}" cy="${t / 4}" r="${s}" fill="rgba(239, 68, 68, 0.2)" />
        </g>
      `;
    }
  },
  {
    type: "fridge",
    name: "Réfrigérateur",
    category: "kitchen",
    width: 0.65,
    length: 0.65,
    icon: "🧊",
    renderSvg: (e, t, i) => I`
        <g class="furniture-symbol" stroke="${i ? "#38bdf8" : "#94a3b8"}" stroke-width="1.5" fill="${i ? "rgba(56, 189, 248, 0.25)" : "rgba(30, 41, 59, 0.85)"}">
          <rect x="${-e / 2}" y="${-t / 2}" width="${e}" height="${t}" rx="3" />
          <line x1="${-e / 2}" y1="${-t / 2 + 6}" x2="${e / 2}" y2="${-t / 2 + 6}" stroke-width="2" />
          <line x1="${-e / 2 + 8}" y1="${-t / 2 + 3}" x2="${-e / 2 + 20}" y2="${-t / 2 + 3}" stroke-width="2" stroke="${"#38bdf8"}" />
          <!-- Symbole Froid Flocon -->
          <text x="0" y="3" text-anchor="middle" font-size="12" fill="${"#38bdf8"}" stroke="none">❄</text>
        </g>
      `
  }
];
function he(e) {
  return Xt.find((t) => t.type === e);
}
var Ue = Object.defineProperty, qe = Object.getOwnPropertyDescriptor, z = (e, t, i, s) => {
  for (var o = s > 1 ? void 0 : s ? qe(t, i) : t, r = e.length - 1, n; r >= 0; r--)
    (n = e[r]) && (o = (s ? n(t, i, o) : n(o)) || o);
  return s && o && Ue(t, i, o), o;
};
let j = class extends H {
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
      bindingIds: [],
      furnitureIds: []
    }, this.isDashboardMode = !1, this.ghostProject = null, this.showDimensions = !0, this.showThermalHeatmap = !1, this.isMarqueeSelecting = !1, this.marqueeStart = null, this.marqueeCurrent = null, this.viewport = { x: 300, y: 300, zoom: 1 }, this.isPanning = !1, this.panStart = { x: 0, y: 0 }, this.drawingWallStart = null, this.previewPoint = null, this.snapInfo = { snappedTo: "none" }, this.cursorCoords = { x: 0, y: 0 }, this.draggingFurnitureId = null, this.dragFurnitureMoved = !1, this.dragFurnitureStartPos = { x: 0, y: 0 }, this.dragFurnitureItemStartPos = { x: 0, y: 0 }, this.draggingWallId = null, this.dragWallMoved = !1, this.dragWallStartPointer = { x: 0, y: 0 }, this.dragWallInitialStart = { x: 0, y: 0 }, this.dragWallInitialEnd = { x: 0, y: 0 }, this.wallSnap = null, this.openingFlipSide = !1, this.openingFlipDirection = !1, this.windowSashCount = 1, this.calibrateStart = null, this.calibrateCurrent = null, this.rescaleStart = null, this.rescaleCurrent = null, this._boundKeyDown = null, this.draggingBindingId = null, this.dragBindingMoved = !1, this.dragBindingStartPos = { x: 0, y: 0 }, this.orbitPitch = 55, this.orbitYaw = -35, this.isOrbiting = !1, this.orbitStart = { x: 0, y: 0 }, this.orbitStartPitch = 55, this.orbitStartYaw = -35;
  }
  setCameraPreset(e, t) {
    this.orbitPitch = e, this.orbitYaw = t, this.requestUpdate();
  }
  // ==========================================
  // CONVERSIONS DE COORDONNÉES
  // ==========================================
  screenToWorld(e, t) {
    const i = this.getBoundingClientRect(), s = e - i.left, o = t - i.top, r = this.project.pixelsPerMeter * this.viewport.zoom;
    return {
      x: (s - this.viewport.x) / r,
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
    const t = this.getBoundingClientRect(), i = e.clientX - t.left, s = e.clientY - t.top, o = e.deltaY < 0 ? 1.12 : 0.89, r = Math.min(Math.max(this.viewport.zoom * o, 0.15), 8), n = i - (i - this.viewport.x) * (r / this.viewport.zoom), a = s - (s - this.viewport.y) * (r / this.viewport.zoom);
    this.viewport = { x: n, y: a, zoom: r };
  }
  handlePointerDown(e) {
    var o, r, n, a, l, h, c, d, p, f, u, g, b, k, S, P, y, $;
    if (this.is3DMode) {
      if (e.button === 1 || e.button === 0 && e.shiftKey) {
        this.isPanning = !0, this.panStart = { x: e.clientX - this.viewport.x, y: e.clientY - this.viewport.y }, (r = (o = e.target).setPointerCapture) == null || r.call(o, e.pointerId);
        return;
      }
      if (e.button === 2 || e.button === 0 && e.altKey) {
        this.isOrbiting = !0, this.orbitStart = { x: e.clientX, y: e.clientY }, this.orbitStartPitch = this.orbitPitch, this.orbitStartYaw = this.orbitYaw, (a = (n = e.target).setPointerCapture) == null || a.call(n, e.pointerId);
        return;
      }
      if (e.button === 0 && !((h = (l = e.target) == null ? void 0 : l.closest) == null ? void 0 : h.call(l, ".wall-element, .wall-element-3d, .room-group, .entity-pin, .opening-element, .furniture-group"))) {
        this.selectedElements = { wallIds: [], openingIds: [], roomIds: [], bindingIds: [], furnitureIds: [] }, this.dispatchSelectionChanged(), this.isOrbiting = !0, this.orbitStart = { x: e.clientX, y: e.clientY }, this.orbitStartPitch = this.orbitPitch, this.orbitStartYaw = this.orbitYaw, (d = (c = e.target).setPointerCapture) == null || d.call(c, e.pointerId);
        return;
      }
      return;
    }
    if (e.button === 1) {
      this.isPanning = !0, this.panStart = { x: e.clientX - this.viewport.x, y: e.clientY - this.viewport.y }, (f = (p = e.target).setPointerCapture) == null || f.call(p, e.pointerId);
      return;
    }
    if (e.button !== 0) return;
    const t = e.target, i = !!((u = t == null ? void 0 : t.closest) != null && u.call(
      t,
      ".wall-element, .wall-element-3d, .room-group, .entity-pin, .opening-element, .furniture-group, .dimension-badge, .wall-dim-badge, .hud-btn"
    ));
    if ((g = t == null ? void 0 : t.closest) != null && g.call(t, ".entity-pin, .furniture-group"))
      return;
    if (this.activeTool === "select") {
      if (i)
        return;
      if (e.shiftKey) {
        const C = this.screenToWorld(e.clientX, e.clientY);
        this.isMarqueeSelecting = !0, this.marqueeStart = C, this.marqueeCurrent = C, (k = (b = e.target).setPointerCapture) == null || k.call(b, e.pointerId);
        return;
      }
      this.selectedElements = { wallIds: [], openingIds: [], roomIds: [], bindingIds: [], furnitureIds: [] }, this.dispatchSelectionChanged(), this.isPanning = !0, this.panStart = { x: e.clientX - this.viewport.x, y: e.clientY - this.viewport.y }, (P = (S = e.target).setPointerCapture) == null || P.call(S, e.pointerId);
      return;
    }
    if (e.shiftKey) {
      this.isPanning = !0, this.panStart = { x: e.clientX - this.viewport.x, y: e.clientY - this.viewport.y }, ($ = (y = e.target).setPointerCapture) == null || $.call(y, e.pointerId);
      return;
    }
    const s = this.screenToWorld(e.clientX, e.clientY);
    if (this.activeTool === "wall") {
      const C = w.snapPoint(
        s,
        this.project.grid,
        this.project.walls,
        this.drawingWallStart || void 0
      );
      if (!this.drawingWallStart)
        this.drawingWallStart = C.point;
      else {
        const M = this.drawingWallStart, v = C.point;
        if (w.distance(M, v) >= 0.15) {
          const _ = {
            id: `wall_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
            start: { ...M },
            end: { ...v },
            thickness: this.currentWallThickness,
            type: "standard"
          };
          this.project = {
            ...this.project,
            walls: [...this.project.walls, _]
          }, this.dispatchProjectChanged(), this.drawingWallStart = v;
        }
      }
    } else if (this.activeTool === "door" || this.activeTool === "window" || this.activeTool === "french_window") {
      if (this.wallSnap) {
        const C = this.activeTool === "window" ? "window" : this.activeTool === "french_window" ? "french_window" : "door", M = C === "door" ? 0.9 : C === "french_window" ? 2 : this.windowSashCount === 2 ? 1.4 : 0.9, v = {
          id: `op_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
          wallId: this.wallSnap.wall.id,
          type: C,
          offset: w.roundMeters(this.wallSnap.offset),
          width: this.currentOpeningWidth || M,
          flipSide: this.openingFlipSide,
          flipDirection: this.openingFlipDirection,
          sashCount: C === "window" ? this.windowSashCount || 1 : C === "french_window" ? 2 : 1
        };
        this.project = {
          ...this.project,
          openings: [...this.project.openings, v]
        }, this.dispatchProjectChanged();
      }
    } else if (this.activeTool === "calibrate") {
      const C = this.getBoundingClientRect(), M = { x: e.clientX - C.left, y: e.clientY - C.top };
      if (!this.calibrateStart)
        this.calibrateStart = M, this.calibrateCurrent = M;
      else {
        const v = M.x - this.calibrateStart.x, T = M.y - this.calibrateStart.y, _ = Math.sqrt(v * v + T * T);
        if (_ >= 10) {
          const W = _ / this.viewport.zoom;
          this.dispatchEvent(new CustomEvent("request-calibration", {
            detail: {
              pixelDistance: W,
              defaultMeters: w.roundMeters(W / this.project.pixelsPerMeter)
            },
            bubbles: !0,
            composed: !0
          })), this.calibrateStart = null, this.calibrateCurrent = null;
        }
      }
    } else if (this.activeTool === "rescale") {
      const C = this.screenToWorld(e.clientX, e.clientY);
      let M = w.snapPoint(
        C,
        this.project.grid,
        this.project.walls,
        this.rescaleStart || void 0
      );
      if (M.snappedTo === "none" && this.project.walls.length > 0) {
        const v = w.snapPointToWall(C, this.project.walls, 0.6);
        v && (M = { point: v.projectionPoint, snappedTo: "vertex" });
      }
      if (!this.rescaleStart)
        this.rescaleStart = M.point, this.rescaleCurrent = M.point;
      else {
        const v = this.rescaleStart, T = M.point, _ = w.distance(v, T);
        _ >= 0.05 && (this.dispatchEvent(new CustomEvent("request-rescale", {
          detail: {
            measuredMeters: w.roundMeters(_)
          },
          bubbles: !0,
          composed: !0
        })), this.rescaleStart = null, this.rescaleCurrent = null, this.previewPoint = null);
      }
    }
  }
  handlePointerMove(e) {
    if (this.isOrbiting) {
      const i = e.clientX - this.orbitStart.x, s = e.clientY - this.orbitStart.y;
      this.orbitYaw = (this.orbitStartYaw + i * 0.55) % 360, this.orbitPitch = Math.max(15, Math.min(85, this.orbitStartPitch - s * 0.38)), this.requestUpdate();
      return;
    }
    if (this.draggingFurnitureId) {
      if (Math.hypot(e.clientX - this.dragFurnitureStartPos.x, e.clientY - this.dragFurnitureStartPos.y) > 3) {
        this.dragFurnitureMoved = !0;
        const s = this.project.pixelsPerMeter * this.viewport.zoom, o = (e.clientX - this.dragFurnitureStartPos.x) / s, r = (e.clientY - this.dragFurnitureStartPos.y) / s;
        let n = this.dragFurnitureItemStartPos.x + o, a = this.dragFurnitureItemStartPos.y + r;
        if (this.project.grid.snapToGrid) {
          const d = this.project.grid.size || 0.5;
          n = Math.round(n / d) * d, a = Math.round(a / d) * d;
        }
        const l = {
          x: w.roundMeters(n),
          y: w.roundMeters(a)
        }, h = V.findRoomContainingPoint(l, this.project.rooms), c = (this.project.furniture || []).map((d) => d.id === this.draggingFurnitureId ? {
          ...d,
          position: l,
          roomId: h == null ? void 0 : h.id
        } : d);
        this.project = { ...this.project, furniture: c }, this.requestUpdate();
      }
      return;
    }
    if (this.draggingWallId) {
      if (Math.hypot(e.clientX - this.dragWallStartPointer.x, e.clientY - this.dragWallStartPointer.y) > 3) {
        this.dragWallMoved = !0;
        const s = this.project.pixelsPerMeter * this.viewport.zoom;
        let o = (e.clientX - this.dragWallStartPointer.x) / s, r = (e.clientY - this.dragWallStartPointer.y) / s;
        if (this.project.grid.snapToGrid) {
          const a = this.project.grid.size || 0.5;
          o = Math.round(o / a) * a, r = Math.round(r / a) * a;
        }
        const n = this.project.walls.map((a) => a.id === this.draggingWallId ? {
          ...a,
          start: {
            x: w.roundMeters(this.dragWallInitialStart.x + o),
            y: w.roundMeters(this.dragWallInitialStart.y + r)
          },
          end: {
            x: w.roundMeters(this.dragWallInitialEnd.x + o),
            y: w.roundMeters(this.dragWallInitialEnd.y + r)
          }
        } : a);
        this.project = { ...this.project, walls: n }, this.requestUpdate();
      }
      return;
    }
    if (this.draggingBindingId) {
      if (Math.hypot(e.clientX - this.dragBindingStartPos.x, e.clientY - this.dragBindingStartPos.y) > 3) {
        this.dragBindingMoved = !0;
        const s = this.screenToWorld(e.clientX, e.clientY), o = V.findRoomContainingPoint(s, this.project.rooms), r = this.project.bindings.map((n) => n.id === this.draggingBindingId ? {
          ...n,
          position: {
            x: w.roundMeters(s.x),
            y: w.roundMeters(s.y)
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
      x: w.roundMeters(t.x),
      y: w.roundMeters(t.y)
    }, this.activeTool === "wall") {
      const i = w.snapPoint(
        t,
        this.project.grid,
        this.project.walls,
        this.drawingWallStart || void 0
      );
      this.previewPoint = i.point, this.snapInfo = {
        snappedTo: i.snappedTo,
        guideAngle: i.guideAngle,
        smartGuideX: i.smartGuideX,
        smartGuideY: i.smartGuideY
      }, this.wallSnap = null;
    } else if (this.activeTool === "door" || this.activeTool === "window" || this.activeTool === "french_window")
      this.wallSnap = w.snapPointToWall(t, this.project.walls, 0.8), this.previewPoint = null;
    else if (this.activeTool === "calibrate" && this.calibrateStart) {
      const i = this.getBoundingClientRect();
      this.calibrateCurrent = { x: e.clientX - i.left, y: e.clientY - i.top };
    } else if (this.activeTool === "rescale") {
      let i = w.snapPoint(
        t,
        this.project.grid,
        this.project.walls,
        this.rescaleStart || void 0
      );
      if (i.snappedTo === "none" && this.project.walls.length > 0) {
        const s = w.snapPointToWall(t, this.project.walls, 0.6);
        s && (i = { point: s.projectionPoint, snappedTo: "vertex" });
      }
      this.previewPoint = i.point, this.snapInfo = {
        snappedTo: i.snappedTo,
        guideAngle: i.guideAngle,
        smartGuideX: i.smartGuideX,
        smartGuideY: i.smartGuideY
      }, this.wallSnap = null, this.rescaleStart && (this.rescaleCurrent = i.point);
    } else
      this.previewPoint = null, this.wallSnap = null;
  }
  handlePointerUp(e) {
    var t, i, s, o, r, n, a, l, h, c, d, p, f, u;
    if (this.draggingFurnitureId) {
      const g = this.dragFurnitureMoved;
      this.draggingFurnitureId = null, this.dragFurnitureMoved = !1;
      try {
        (i = (t = e.target).releasePointerCapture) == null || i.call(t, e.pointerId);
      } catch {
      }
      if (g) {
        this.dispatchProjectChanged();
        return;
      }
    }
    if (this.draggingWallId) {
      const g = this.dragWallMoved;
      this.draggingWallId = null, this.dragWallMoved = !1;
      try {
        (o = (s = e.target).releasePointerCapture) == null || o.call(s, e.pointerId);
      } catch {
      }
      if (g) {
        this.dispatchProjectChanged();
        return;
      }
    }
    if (this.draggingBindingId) {
      const g = this.dragBindingMoved;
      this.draggingBindingId = null;
      const b = (r = this.shadowRoot) == null ? void 0 : r.querySelector(".canvas-container");
      try {
        (n = b == null ? void 0 : b.releasePointerCapture) == null || n.call(b, e.pointerId);
      } catch {
      }
      try {
        (l = (a = e.target) == null ? void 0 : a.releasePointerCapture) == null || l.call(a, e.pointerId);
      } catch {
      }
      if (g) {
        setTimeout(() => {
          this.dragBindingMoved = !1;
        }, 150), this.dispatchProjectChanged();
        return;
      } else
        this.dragBindingMoved = !1;
    }
    if (this.isOrbiting) {
      this.isOrbiting = !1, (c = (h = e.target).releasePointerCapture) == null || c.call(h, e.pointerId);
      return;
    }
    if (this.isMarqueeSelecting && this.marqueeStart && this.marqueeCurrent) {
      const g = Math.min(this.marqueeStart.x, this.marqueeCurrent.x), b = Math.max(this.marqueeStart.x, this.marqueeCurrent.x), k = Math.min(this.marqueeStart.y, this.marqueeCurrent.y), S = Math.max(this.marqueeStart.y, this.marqueeCurrent.y);
      if (b - g > 0.05 || S - k > 0.05) {
        const P = this.project.walls.filter((v) => {
          const T = (v.start.x + v.end.x) / 2, _ = (v.start.y + v.end.y) / 2;
          return T >= g && T <= b && _ >= k && _ <= S;
        }).map((v) => v.id), y = this.project.openings.filter((v) => {
          const T = this.project.walls.find((L) => L.id === v.wallId);
          if (!T) return !1;
          const _ = T.end.x - T.start.x, W = T.end.y - T.start.y, Q = Math.sqrt(_ * _ + W * W);
          if (Q === 0) return !1;
          const at = T.start.x + v.offset / Q * _, R = T.start.y + v.offset / Q * W;
          return at >= g && at <= b && R >= k && R <= S;
        }).map((v) => v.id), $ = this.project.rooms.filter((v) => {
          if (!v.polygon || v.polygon.length < 3) return !1;
          const T = V.calculateCentroid(v.polygon);
          return T.x >= g && T.x <= b && T.y >= k && T.y <= S;
        }).map((v) => v.id), C = this.project.bindings.filter((v) => v.position.x >= g && v.position.x <= b && v.position.y >= k && v.position.y <= S).map((v) => v.id), M = (this.project.furniture || []).filter((v) => v.position.x >= g && v.position.x <= b && v.position.y >= k && v.position.y <= S).map((v) => v.id);
        this.selectedElements = {
          wallIds: Array.from(/* @__PURE__ */ new Set([...this.selectedElements.wallIds, ...P])),
          openingIds: Array.from(/* @__PURE__ */ new Set([...this.selectedElements.openingIds, ...y])),
          roomIds: Array.from(/* @__PURE__ */ new Set([...this.selectedElements.roomIds, ...$])),
          bindingIds: Array.from(/* @__PURE__ */ new Set([...this.selectedElements.bindingIds, ...C])),
          furnitureIds: Array.from(/* @__PURE__ */ new Set([...this.selectedElements.furnitureIds || [], ...M]))
        }, this.dispatchSelectionChanged();
      }
      this.isMarqueeSelecting = !1, this.marqueeStart = null, this.marqueeCurrent = null, (p = (d = e.target).releasePointerCapture) == null || p.call(d, e.pointerId);
      return;
    }
    this.isPanning && (this.isPanning = !1, (u = (f = e.target).releasePointerCapture) == null || u.call(f, e.pointerId));
  }
  // ==========================================
  // DRAG & DROP ENTITÉS HOME ASSISTANT
  // ==========================================
  handleDragOver(e) {
    e.preventDefault(), e.dataTransfer && (e.dataTransfer.dropEffect = "copy");
  }
  handleDrop(e) {
    var i, s;
    if (e.preventDefault(), (i = e.dataTransfer) != null && i.files && e.dataTransfer.files.length > 0) {
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
    const t = (s = e.dataTransfer) == null ? void 0 : s.getData("application/json");
    if (t)
      try {
        const o = JSON.parse(t);
        if (o.kind === "furniture") {
          const p = he(o.furnitureType);
          if (p) {
            const f = this.screenToWorld(e.clientX, e.clientY), u = V.findRoomContainingPoint(f, this.project.rooms), g = {
              id: `furn_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
              type: p.type,
              name: p.name,
              category: p.category,
              position: {
                x: w.roundMeters(f.x),
                y: w.roundMeters(f.y)
              },
              width: p.width,
              length: p.length,
              rotation: 0,
              color: p.defaultColor,
              icon: p.icon,
              roomId: u == null ? void 0 : u.id
            };
            this.project = {
              ...this.project,
              furniture: [...this.project.furniture || [], g]
            }, this.selectedElements = {
              wallIds: [],
              openingIds: [],
              roomIds: [],
              bindingIds: [],
              furnitureIds: [g.id]
            }, this.dispatchSelectionChanged(), this.dispatchProjectChanged();
            return;
          }
        }
        const { entityId: r, domain: n, name: a, icon: l } = o, h = this.screenToWorld(e.clientX, e.clientY), c = V.findRoomContainingPoint(h, this.project.rooms), d = {
          id: `bind_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
          entityId: r,
          position: {
            x: w.roundMeters(h.x),
            y: w.roundMeters(h.y)
          },
          roomId: c == null ? void 0 : c.id,
          icon: l,
          customName: a,
          tapAction: "toggle"
        };
        this.project = {
          ...this.project,
          bindings: [...this.project.bindings, d]
        }, this.dispatchProjectChanged();
      } catch (o) {
        console.error("Erreur lors de la liaison entité/meuble:", o);
      }
  }
  dispatchSelectionChanged() {
    this.dispatchEvent(new CustomEvent("selection-changed", {
      detail: { selectedElements: this.selectedElements },
      bubbles: !0,
      composed: !0
    })), this.requestUpdate();
  }
  handleWallPointerDown(e, t) {
    var o, r;
    if (this.isDashboardMode || t.button !== 0 || this.activeTool !== "select") return;
    t.stopPropagation(), this.draggingWallId = e.id, this.dragWallMoved = !1, this.dragWallStartPointer = { x: t.clientX, y: t.clientY }, this.dragWallInitialStart = { ...e.start }, this.dragWallInitialEnd = { ...e.end };
    const i = t.shiftKey || t.ctrlKey || t.metaKey, s = this.selectedElements.wallIds.includes(e.id);
    if (i) {
      const n = s ? this.selectedElements.wallIds.filter((a) => a !== e.id) : [...this.selectedElements.wallIds, e.id];
      this.selectedElements = { ...this.selectedElements, wallIds: n };
    } else s || (this.selectedElements = { wallIds: [e.id], openingIds: [], roomIds: [], bindingIds: [], furnitureIds: [] });
    this.dispatchSelectionChanged(), (r = (o = t.currentTarget) == null ? void 0 : o.setPointerCapture) == null || r.call(o, t.pointerId);
  }
  handleWallClick(e, t) {
    if (this.activeTool !== "select" || this.dragWallMoved) return;
    e.stopPropagation();
    const i = e.shiftKey || e.ctrlKey || e.metaKey, s = this.selectedElements.wallIds.includes(t.id);
    if (i) {
      const o = s ? this.selectedElements.wallIds.filter((r) => r !== t.id) : [...this.selectedElements.wallIds, t.id];
      this.selectedElements = { ...this.selectedElements, wallIds: o };
    } else
      this.selectedElements = { wallIds: [t.id], openingIds: [], roomIds: [], bindingIds: [], furnitureIds: [] };
    this.dispatchSelectionChanged();
  }
  handleOpeningClick(e, t) {
    if (this.activeTool !== "select") return;
    e.stopPropagation();
    const i = e.shiftKey || e.ctrlKey || e.metaKey, s = this.selectedElements.openingIds.includes(t.id);
    if (i) {
      const o = s ? this.selectedElements.openingIds.filter((r) => r !== t.id) : [...this.selectedElements.openingIds, t.id];
      this.selectedElements = { ...this.selectedElements, openingIds: o };
    } else
      this.selectedElements = { wallIds: [], openingIds: [t.id], roomIds: [], bindingIds: [], furnitureIds: [] };
    this.dispatchSelectionChanged();
  }
  handleFurniturePointerDown(e, t) {
    var o, r, n;
    if (this.isDashboardMode || t.button !== 0 || this.activeTool !== "select") return;
    t.stopPropagation(), this.draggingFurnitureId = e.id, this.dragFurnitureMoved = !1, this.dragFurnitureStartPos = { x: t.clientX, y: t.clientY }, this.dragFurnitureItemStartPos = { ...e.position };
    const i = t.shiftKey || t.ctrlKey || t.metaKey, s = ((o = this.selectedElements.furnitureIds) == null ? void 0 : o.includes(e.id)) || !1;
    if (i) {
      const a = s ? (this.selectedElements.furnitureIds || []).filter((l) => l !== e.id) : [...this.selectedElements.furnitureIds || [], e.id];
      this.selectedElements = { ...this.selectedElements, furnitureIds: a };
    } else s || (this.selectedElements = { wallIds: [], openingIds: [], roomIds: [], bindingIds: [], furnitureIds: [e.id] });
    this.dispatchSelectionChanged(), (n = (r = t.currentTarget) == null ? void 0 : r.setPointerCapture) == null || n.call(r, t.pointerId);
  }
  handleFurnitureClick(e, t) {
    var o;
    if (this.activeTool !== "select" || this.dragFurnitureMoved) return;
    e.stopPropagation();
    const i = e.shiftKey || e.ctrlKey || e.metaKey, s = ((o = this.selectedElements.furnitureIds) == null ? void 0 : o.includes(t.id)) || !1;
    if (i) {
      const r = s ? (this.selectedElements.furnitureIds || []).filter((n) => n !== t.id) : [...this.selectedElements.furnitureIds || [], t.id];
      this.selectedElements = { ...this.selectedElements, furnitureIds: r };
    } else
      this.selectedElements = { wallIds: [], openingIds: [], roomIds: [], bindingIds: [], furnitureIds: [t.id] };
    this.dispatchSelectionChanged();
  }
  renderMarqueeBox() {
    if (!this.isMarqueeSelecting || !this.marqueeStart || !this.marqueeCurrent) return null;
    const e = this.worldToScreen(this.marqueeStart), t = this.worldToScreen(this.marqueeCurrent), i = Math.min(e.x, t.x), s = Math.min(e.y, t.y), o = Math.abs(e.x - t.x), r = Math.abs(e.y - t.y);
    return I`
      <rect 
        class="marquee-selection-box"
        x="${i}" 
        y="${s}" 
        width="${o}" 
        height="${r}" 
      />
    `;
  }
  handleEntityPointerDown(e, t) {
    var n, a;
    if (this.isDashboardMode || t.button !== 0) return;
    t.stopPropagation(), this.draggingBindingId = e.id, this.dragBindingMoved = !1, this.dragBindingStartPos = { x: t.clientX, y: t.clientY };
    const i = t, s = i.shiftKey || i.ctrlKey || i.metaKey, o = this.selectedElements.bindingIds.includes(e.id);
    if (s) {
      const l = o ? this.selectedElements.bindingIds.filter((h) => h !== e.id) : [...this.selectedElements.bindingIds, e.id];
      this.selectedElements = { ...this.selectedElements, bindingIds: l };
    } else
      this.selectedElements = { wallIds: [], openingIds: [], roomIds: [], bindingIds: [e.id], furnitureIds: [] };
    this.dispatchSelectionChanged();
    const r = (n = this.shadowRoot) == null ? void 0 : n.querySelector(".canvas-container");
    try {
      (a = r == null ? void 0 : r.setPointerCapture) == null || a.call(r, t.pointerId);
    } catch {
    }
  }
  handleEntityClick(e, t) {
    if (t.stopPropagation(), !this.dragBindingMoved) {
      if (this.isDashboardMode) {
        const i = e.entityId.split(".")[0];
        if (e.tapAction === "more-info" || i !== "light" && i !== "switch") {
          this.dispatchEvent(new CustomEvent("hass-more-info", {
            detail: { entityId: e.entityId },
            bubbles: !0,
            composed: !0
          }));
          return;
        }
        this.hass && this.hass.callService && this.hass.callService(i, "toggle", { entity_id: e.entityId }).catch(() => {
          this.hass.callService("homeassistant", "toggle", { entity_id: e.entityId });
        });
        return;
      }
      if (this.activeTool === "select") {
        const i = t, s = i.shiftKey || i.ctrlKey || i.metaKey, o = this.selectedElements.bindingIds.includes(e.id);
        if (s) {
          const r = o ? this.selectedElements.bindingIds.filter((n) => n !== e.id) : [...this.selectedElements.bindingIds, e.id];
          this.selectedElements = { ...this.selectedElements, bindingIds: r };
        } else
          this.selectedElements = { wallIds: [], openingIds: [], roomIds: [], bindingIds: [e.id] };
        this.dispatchSelectionChanged();
        return;
      }
      if (this.hass && this.hass.callService) {
        const i = e.entityId.split(".")[0];
        this.hass.callService(i, "toggle", { entity_id: e.entityId }).catch(() => {
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
  rotateSelectedFurniture() {
    if (!this.selectedElements.furnitureIds || this.selectedElements.furnitureIds.length === 0) return;
    const e = this.selectedElements.furnitureIds, t = (this.project.furniture || []).map((i) => e.includes(i.id) ? {
      ...i,
      rotation: ((i.rotation || 0) + 90) % 360
    } : i);
    this.project = { ...this.project, furniture: t }, this.dispatchProjectChanged(), this.requestUpdate();
  }
  handleKeyDown(e) {
    e.key === "Escape" ? (this.drawingWallStart = null, this.previewPoint = null, this.calibrateStart = null, this.calibrateCurrent = null, this.rescaleStart = null, this.rescaleCurrent = null, this.wallSnap = null, this.selectedElements = { wallIds: [], openingIds: [], roomIds: [], bindingIds: [], furnitureIds: [] }, this.dispatchSelectionChanged(), this.requestUpdate()) : e.key === " " || e.key === "Spacebar" ? this.wallSnap && (e.preventDefault(), this.openingFlipSide = !this.openingFlipSide, this.requestUpdate()) : e.key.toLowerCase() === "f" ? this.wallSnap && (this.openingFlipDirection = !this.openingFlipDirection, this.requestUpdate()) : e.key.toLowerCase() === "r" && this.selectedElements.furnitureIds && this.selectedElements.furnitureIds.length > 0 && (e.preventDefault(), this.rotateSelectedFurniture());
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
  computeWallPolygon(e, t, i) {
    const s = t.x - e.x, o = t.y - e.y, r = Math.sqrt(s * s + o * o);
    if (r === 0) return [e, e, t, t];
    const n = i / 2, a = -o / r * n, l = s / r * n;
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
    const t = this.worldToScreen(e.offset || { x: 0, y: 0 }), i = e.scale || 1;
    return I`
      <g 
        class="background-image-layer" 
        transform="translate(${t.x}, ${t.y}) scale(${this.viewport.zoom * i})"
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
  pointToSegmentDistance(e, t, i) {
    const s = i.x - t.x, o = i.y - t.y, r = s * s + o * o;
    if (r === 0) return w.distance(e, t);
    let n = ((e.x - t.x) * s + (e.y - t.y) * o) / r;
    n = Math.max(0, Math.min(1, n));
    const a = { x: t.x + n * s, y: t.y + n * o };
    return w.distance(e, a);
  }
  getWallHeight(e) {
    const t = this.project.defaultCeilingHeight || 2.5, i = {
      x: (e.start.x + e.end.x) / 2,
      y: (e.start.y + e.end.y) / 2
    }, s = (this.project.rooms || []).filter((o) => {
      if (!o.polygon || o.polygon.length < 3) return !1;
      if (V.isPointInPolygon(i, o.polygon)) return !0;
      for (let r = 0; r < o.polygon.length; r++) {
        const n = o.polygon[r], a = o.polygon[(r + 1) % o.polygon.length];
        if (this.pointToSegmentDistance(i, n, a) <= e.thickness / 2 + 0.35)
          return !0;
      }
      return !1;
    });
    if (s.length > 0) {
      const o = s.map((r) => r.height || t);
      return Math.max(...o, e.height || 0);
    }
    return e.height || t;
  }
  handleRoomClick(e, t) {
    if (!(this.drawingWallStart || this.calibrateStart || this.rescaleStart)) {
      if (e.stopPropagation(), this.activeTool === "select") {
        const i = e.shiftKey || e.ctrlKey || e.metaKey, s = this.selectedElements.roomIds.includes(t.id);
        if (i) {
          const o = s ? this.selectedElements.roomIds.filter((r) => r !== t.id) : [...this.selectedElements.roomIds, t.id];
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
  // Rendu des Pièces avec détection d'illumination (RGB & Brightness) et Carte Thermique
  renderRooms() {
    return this.project.rooms.map((e) => {
      var f, u, g, b, k, S, P;
      if (!e.polygon || e.polygon.length < 3) return null;
      const t = e.polygon.map((y) => this.worldToScreen(y)), i = t.map((y) => `${y.x},${y.y}`).join(" "), s = this.project.bindings.filter((y) => y.roomId === e.id && y.entityId.startsWith("light.")).map((y) => {
        var $, C;
        return (C = ($ = this.hass) == null ? void 0 : $.states) == null ? void 0 : C[y.entityId];
      }).filter((y) => y && y.state === "on"), o = s.length > 0;
      let r = null;
      if (o) {
        const y = s[0], $ = ((f = y.attributes) == null ? void 0 : f.rgb_color) || [255, 240, 180], M = 0.12 + (((u = y.attributes) == null ? void 0 : u.brightness) !== void 0 ? y.attributes.brightness : 255) / 255 * 0.22;
        r = `rgba(${$[0]}, ${$[1]}, ${$[2]}, ${M.toFixed(2)})`;
      }
      let n = null;
      const a = this.project.bindings.find(
        (y) => {
          var $;
          return y.roomId === e.id && (y.entityId.startsWith("climate.") || y.entityId.startsWith("sensor.") && (y.entityId.toLowerCase().includes("temp") || (($ = y.customName) == null ? void 0 : $.toLowerCase().includes("temp"))));
        }
      );
      if (a) {
        const y = (b = (g = this.hass) == null ? void 0 : g.states) == null ? void 0 : b[a.entityId];
        if (y)
          if (a.entityId.startsWith("climate.")) {
            const $ = ((k = y.attributes) == null ? void 0 : k.current_temperature) ?? y.state;
            isNaN(parseFloat($)) || (n = parseFloat($));
          } else
            isNaN(parseFloat(y.state)) || (n = parseFloat(y.state));
      }
      let l = e.color || "rgba(56, 189, 248, 0.12)";
      this.showThermalHeatmap && n !== null ? n < 18 ? l = "rgba(59, 130, 246, 0.38)" : n < 20 ? l = "rgba(14, 165, 233, 0.32)" : n < 22 ? l = "rgba(16, 185, 129, 0.30)" : n < 24 ? l = "rgba(245, 158, 11, 0.34)" : l = "rgba(239, 68, 68, 0.40)" : r && (l = r);
      const h = V.calculateCentroid(t), c = e.height || this.project.defaultCeilingHeight || 2.5, d = (e.areaM2 * c).toFixed(1), p = (P = (S = this.selectedElements) == null ? void 0 : S.roomIds) == null ? void 0 : P.includes(e.id);
      return I`
        <g 
          class="room-group ${p ? "selected" : ""}" 
          data-room-id="${e.id}" 
          @click=${(y) => this.handleRoomClick(y, e)}
          @dblclick=${(y) => this.handleRoomDblClick(y, e)}
        >
          <polygon 
            points="${i}" 
            class="room-polygon ${o ? "illuminated" : ""}"
            style="fill: ${l}; cursor: pointer; transition: fill 0.3s ease;"
          />
          ${this.is3DMode ? I`
            <g class="room-3d-badge-group" transform="translate(${h.x}, ${h.y})">
              <rect 
                x="-62" 
                y="-30" 
                width="124" 
                height="60" 
                rx="10" 
                ry="10" 
                fill="rgba(15, 23, 42, 0.84)" 
                stroke="${p ? "#38bdf8" : "rgba(56, 189, 248, 0.4)"}" 
                stroke-width="${p ? 2 : 1}"
                filter="drop-shadow(0 6px 14px rgba(0, 0, 0, 0.6))"
              />
              <text class="room-label-name" y="-12" style="font-size: 12px; font-weight: 700; fill: #f8fafc; text-anchor: middle;">
                ${e.name}
              </text>
              <text class="room-label-area" y="6" style="font-size: 11px; font-weight: 700; fill: #38bdf8; text-anchor: middle; font-family: ui-monospace, SFMono-Regular, monospace;">
                ${e.areaM2.toFixed(1)} m²
              </text>
              <text class="room-label-height" y="21" style="font-size: 9.5px; font-weight: 600; fill: #a5f3fc; text-anchor: middle; font-family: ui-monospace, SFMono-Regular, monospace;">
                H: ${c.toFixed(2)}m · ${d} m³
              </text>
            </g>
          ` : I`
            <g class="room-label-group" transform="translate(${h.x}, ${h.y})">
              <text class="room-label-name" y="${n !== null ? -10 : -6}">${e.name}</text>
              <text class="room-label-area" y="${n !== null ? 6 : 12}">${e.areaM2.toFixed(1)} m²</text>
              ${n !== null ? I`
                <text class="room-label-temp" y="21" style="font-size: 9.5px; font-weight: 700; fill: #facc15; text-anchor: middle; font-family: ui-monospace, SFMono-Regular, monospace;">
                  🌡️ ${n.toFixed(1)}°C
                </text>
              ` : null}
            </g>
          `}
        </g>
      `;
    });
  }
  renderGrid() {
    if (this.is3DMode)
      return I`
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
    const e = this.project.pixelsPerMeter * this.viewport.zoom, i = (this.project.grid.size || 0.5) * e;
    if (i < 12) return null;
    const s = i * 2;
    return I`
      <defs>
        <pattern id="grid-sub" width="${i}" height="${i}" patternUnits="userSpaceOnUse"
          patternTransform="translate(${this.viewport.x % i}, ${this.viewport.y % i})">
          <line x1="0" y1="0" x2="${i}" y2="0" stroke="rgba(255,255,255,0.06)" stroke-width="0.5" />
          <line x1="0" y1="0" x2="0" y2="${i}" stroke="rgba(255,255,255,0.06)" stroke-width="0.5" />
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
    const e = this.project.pixelsPerMeter * this.viewport.zoom;
    return this.project.walls.map((t) => {
      var k, S;
      const i = (S = (k = this.selectedElements) == null ? void 0 : k.wallIds) == null ? void 0 : S.includes(t.id), s = this.getWallHeight(t), o = this.is3DMode ? s * e * 0.55 : 0, n = this.computeWallPolygon(t.start, t.end, t.thickness).map((P) => this.worldToScreen(P)), a = this.worldToScreen(t.start), l = this.worldToScreen(t.end), h = n.map((P) => `${P.x},${P.y}`).join(" "), c = w.distance(t.start, t.end), d = {
        x: (a.x + l.x) / 2,
        y: (a.y + l.y) / 2
      };
      if (this.is3DMode) {
        const P = n.map((v) => ({ x: v.x, y: v.y - o })), y = P.map((v) => `${v.x},${v.y}`).join(" "), $ = [0, 1, 2, 3].map((v) => {
          const T = (v + 1) % 4, _ = n[v], W = n[T], Q = P[T], at = P[v], R = W.x - _.x, L = W.y - _.y, O = Math.sqrt(R * R + L * L) || 1, F = -L / O, st = R / O, lt = Math.max(-1, Math.min(1, F * -0.7 + st * -0.7)), ht = Math.round(i ? 42 + lt * 14 : 34 + lt * 16), Ct = i ? `hsl(192, 85%, ${ht}%)` : `hsl(215, 22%, ${ht}%)`, te = i ? "#38bdf8" : `hsl(215, 22%, ${ht + 6}%)`;
          return {
            pts: `${_.x},${_.y} ${W.x},${W.y} ${Q.x},${Q.y} ${at.x},${at.y}`,
            fill: Ct,
            stroke: te
          };
        }), C = i ? "#06b6d4" : "#f1f5f9", M = i ? "#22d3ee" : "#94a3b8";
        return I`
          <g 
            class="wall-element-3d ${i ? "selected" : ""}" 
            data-wall-id="${t.id}"
            @click=${(v) => this.handleWallClick(v, t)}
            style="cursor: pointer;"
          >
            <!-- 4 parois verticales solides -->
            ${$.map((v) => I`
              <polygon points="${v.pts}" style="fill: ${v.fill}; stroke: ${v.stroke}; stroke-width: 0.8; stroke-linejoin: round;" />
            `)}
            <!-- Chapeau supérieur du mur -->
            <polygon points="${y}" style="fill: ${C}; stroke: ${M}; stroke-width: 1.2; stroke-linejoin: round;" />
          </g>
        `;
      }
      const p = l.x - a.x, f = l.y - a.y, u = Math.hypot(p, f) || 1, g = -f / u, b = p / u;
      return I`
        <g 
          class="wall-element ${i ? "selected" : ""}" 
          data-wall-id="${t.id}"
          @pointerdown=${(P) => this.handleWallPointerDown(t, P)}
          @click=${(P) => this.handleWallClick(P, t)}
        >
          <polygon points="${h}" class="wall-rect" />
          <line x1="${a.x}" y1="${a.y}" x2="${l.x}" y2="${l.y}" class="wall-centerline" />
          
          ${this.showDimensions && c >= 0.4 ? I`
            <g class="wall-dim-badge" transform="translate(${d.x + g * 14}, ${d.y + b * 14})">
              <rect x="-24" y="-9" width="48" height="18" />
              <text>${w.roundMeters(c).toFixed(2)} m</text>
            </g>
          ` : null}
        </g>
      `;
    });
  }
  renderOpenings() {
    return this.project.openings.map((e) => {
      var u, g;
      const t = (g = (u = this.selectedElements) == null ? void 0 : u.openingIds) == null ? void 0 : g.includes(e.id), i = this.project.walls.find((b) => b.id === e.wallId);
      if (!i) return null;
      const s = i.end.x - i.start.x, o = i.end.y - i.start.y, r = Math.sqrt(s * s + o * o);
      if (r === 0) return null;
      const a = Math.atan2(o, s) * 180 / Math.PI, l = i.start.x + e.offset / r * s, h = i.start.y + e.offset / r * o, c = this.worldToScreen({ x: l, y: h }), d = this.project.pixelsPerMeter * this.viewport.zoom, p = e.width * d, f = i.thickness * d;
      return I`
        <g 
          class="opening-element ${t ? "selected" : ""}" 
          transform="translate(${c.x}, ${c.y}) rotate(${a})"
          style="cursor: pointer;"
          @click=${(b) => this.handleOpeningClick(b, e)}
        >
          <rect 
            x="${-p / 2}" 
            y="${-f / 2 - 1}" 
            width="${p}" 
            height="${f + 2}" 
            class="wall-cutout"
          />

          ${e.type === "door" ? this.renderDoorSymbol(p, f, e.flipSide, e.flipDirection) : null}
          ${e.type === "window" ? this.renderWindowSymbol(p, f, e.sashCount || (e.width >= 1.25 ? 2 : 1)) : null}
          ${e.type === "french_window" ? this.renderFrenchWindowSymbol(p, f) : null}
        </g>
      `;
    });
  }
  renderDoorSymbol(e, t, i, s) {
    const o = e / 2, r = i ? -1 : 1, n = s ? o : -o, a = s ? -1 : 1;
    return I`
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
          d="M ${n + a * e} 0 A ${e} ${e} 0 0 ${r > 0 ? s ? 0 : 1 : s ? 1 : 0} ${n} ${r * e}" 
          class="opening-door-arc" 
        />
      </g>
    `;
  }
  renderWindowSymbol(e, t, i = 1) {
    const s = e / 2;
    return i === 2 ? I`
        <g>
          <rect x="${-s}" y="${-t / 2}" width="${e}" height="${t}" fill="none" class="opening-window-frame" />
          <line x1="${-s}" y1="0" x2="${s}" y2="0" class="opening-window-glass" />
          <line x1="0" y1="${-t / 2}" x2="0" y2="${t / 2}" stroke="#38bdf8" stroke-width="2.5" />
          <line x1="${-s + 4}" y1="${-t / 4}" x2="-3" y2="${-t / 4}" stroke="rgba(56, 189, 248, 0.45)" stroke-width="1.2" />
          <line x1="3" y1="${t / 4}" x2="${s - 4}" y2="${t / 4}" stroke="rgba(56, 189, 248, 0.45)" stroke-width="1.2" />
        </g>
      ` : I`
      <g>
        <rect x="${-s}" y="${-t / 2}" width="${e}" height="${t}" fill="none" class="opening-window-frame" />
        <line x1="${-s}" y1="0" x2="${s}" y2="0" class="opening-window-glass" />
        <line x1="${-s + 4}" y1="${-t / 4}" x2="${s - 4}" y2="${-t / 4}" stroke="rgba(56, 189, 248, 0.4)" stroke-width="1" />
        <line x1="${-s + 4}" y1="${t / 4}" x2="${s - 4}" y2="${t / 4}" stroke="rgba(56, 189, 248, 0.4)" stroke-width="1" />
      </g>
    `;
  }
  renderFrenchWindowSymbol(e, t) {
    const i = e / 2;
    return I`
      <g>
        <rect x="${-i}" y="${-t / 2}" width="${e}" height="${t}" fill="none" class="opening-window-frame" />
        <rect x="${-i}" y="${-t / 4}" width="${i}" height="3" fill="#38bdf8" />
        <rect x="0" y="${t / 4}" width="${i}" height="3" fill="#38bdf8" />
      </g>
    `;
  }
  // ==========================================
  // RENDU DES PINS D'ENTITÉS HOME ASSISTANT
  // ==========================================
  getEntityDisplayState(e) {
    var n, a;
    const t = (a = (n = this.hass) == null ? void 0 : n.states) == null ? void 0 : a[e.entityId];
    if (!t)
      return { text: "Inactif", statusClass: "off" };
    const i = t.state;
    if (i === "unavailable") return { text: "Indisponible", statusClass: "off" };
    if (i === "unknown") return { text: "Inconnu", statusClass: "off" };
    const s = e.entityId.split(".")[0], o = t.attributes || {}, r = o.device_class || "";
    if (s === "light") {
      if (i === "on") {
        const l = o.brightness ? Math.round(o.brightness / 255 * 100) : null;
        return { text: l !== null ? `Allumé (${l}%)` : "Allumé", statusClass: "on" };
      }
      return { text: "Éteint", statusClass: "off" };
    }
    if (s === "switch")
      return i === "on" ? { text: "Actif", statusClass: "on" } : { text: "Éteint", statusClass: "off" };
    if (s === "binary_sensor") {
      const l = r === "motion" || r === "occupancy" || r === "presence" || e.entityId.includes("presence") || e.entityId.includes("occupancy") || e.entityId.includes("radar") || e.entityId.includes("motion"), h = r === "door" || r === "window" || r === "garage_door" || r === "opening", c = r === "moisture", d = r === "smoke";
      return i === "on" || i === "detected" ? l ? { text: "Mouvement", statusClass: "alert" } : h ? { text: "Ouvert", statusClass: "alert" } : c ? { text: "Fuite !", statusClass: "alert" } : d ? { text: "Fumée !", statusClass: "alert" } : { text: "Détecté", statusClass: "alert" } : l ? { text: "Au repos", statusClass: "info" } : h ? { text: "Fermé", statusClass: "info" } : c ? { text: "Sec", statusClass: "info" } : d ? { text: "Normal", statusClass: "info" } : { text: "Inactif", statusClass: "off" };
    }
    if (s === "climate") {
      const l = o.current_temperature, h = o.temperature;
      return l !== void 0 && h !== void 0 ? { text: `${l}°C (${h}°)`, statusClass: "info" } : l !== void 0 ? { text: `${l}°C`, statusClass: "info" } : { text: i, statusClass: "info" };
    }
    if (s === "sensor") {
      const l = o.unit_of_measurement || "";
      return { text: `${i}${l ? " " + l : ""}`, statusClass: "info" };
    }
    if (s === "cover") {
      const l = o.current_position;
      return l !== void 0 ? { text: `${l}%`, statusClass: l > 0 ? "on" : "off" } : i === "open" ? { text: "Ouvert", statusClass: "on" } : { text: "Fermé", statusClass: "off" };
    }
    return s === "media_player" ? i === "playing" ? { text: "Lecture", statusClass: "on" } : i === "paused" ? { text: "Pause", statusClass: "info" } : { text: "Arrêt", statusClass: "off" } : s === "fan" ? i === "on" ? { text: "En marche", statusClass: "on" } : { text: "Arrêté", statusClass: "off" } : s === "lock" ? i === "locked" ? { text: "Verrouillé", statusClass: "info" } : { text: "Déverrouillé", statusClass: "alert" } : { text: i === "on" ? "Actif" : i === "off" ? "Inactif" : i, statusClass: i === "on" ? "on" : "off" };
  }
  renderEntityBindings() {
    return this.project.bindings.map((e) => {
      var b, k, S, P, y, $;
      const t = this.worldToScreen(e.position), i = (k = (b = this.hass) == null ? void 0 : b.states) == null ? void 0 : k[e.entityId], s = (i == null ? void 0 : i.state) || "off", o = e.entityId.startsWith("light.") && s === "on", r = e.entityId.startsWith("binary_sensor.") && (s === "on" || s === "detected"), n = e.entityId.startsWith("sensor.") || e.entityId.startsWith("climate."), a = e.entityId.startsWith("fan."), l = a && s === "on", h = e.entityId.startsWith("media_player."), c = h && s === "playing", d = e.entityId.startsWith("cover."), p = (S = i == null ? void 0 : i.attributes) == null ? void 0 : S.current_position, f = ((P = i == null ? void 0 : i.attributes) == null ? void 0 : P.unit_of_measurement) || (n ? "°" : ""), u = ($ = (y = this.selectedElements) == null ? void 0 : y.bindingIds) == null ? void 0 : $.includes(e.id), g = this.getEntityDisplayState(e);
      return I`
        <g 
          class="entity-pin ${u ? "selected" : ""} ${o ? "active-light" : ""} ${r ? "active-radar" : ""}"
          transform="translate(${t.x}, ${t.y})"
          @pointerdown=${(C) => this.handleEntityPointerDown(e, C)}
          @click=${(C) => this.handleEntityClick(e, C)}
          @dblclick=${(C) => this.handleEntityDblClick(e, C)}
          title="${e.customName || e.entityId} : ${g.text} (Clic pour basculer)"
        >
          <!-- Onde radar animée si mouvement détecté -->
          ${r ? I`<circle cx="0" cy="0" r="16" class="radar-pulse-ring" />` : null}

          <!-- Ondes sonores pour lecteur multimédia actif -->
          ${c ? I`<circle cx="0" cy="0" r="16" class="soundwave-pulse" />` : null}

          <!-- Pastille de fond -->
          <circle cx="0" cy="0" r="16" class="entity-pin-bg" />

          <!-- Pictogramme avec micro-animation (rotation ventilateur) -->
          <text x="0" y="0" class="entity-pin-icon ${l ? "fan-spin" : ""}">
            ${e.icon || (a ? "💨" : d ? "🪟" : h ? "📺" : "⚡")}
          </text>

          <!-- Étiquette Nom -->
          <text x="0" y="27" class="entity-pin-label">
            ${e.customName || e.entityId.split(".")[1]}
          </text>

          <!-- Étiquette État en direct -->
          <text x="0" y="38" class="entity-pin-state state-${g.statusClass}">
            ${g.text}
          </text>

          <!-- Badge Valeur (Thermostat / Capteur de température) -->
          ${n && s !== "unknown" ? I`
            <g class="entity-pin-value-badge" transform="translate(14, -14)">
              <rect x="-14" y="-8" width="28" height="16" />
              <text>${s}${f}</text>
            </g>
          ` : null}

          <!-- Badge Position Volet roulant -->
          ${d && p !== void 0 ? I`
            <g class="entity-pin-value-badge" transform="translate(14, -14)">
              <rect x="-14" y="-8" width="28" height="16" />
              <text>${p}%</text>
            </g>
          ` : null}
        </g>
      `;
    });
  }
  renderOpeningPreview() {
    if (!this.wallSnap) return null;
    const e = this.project.pixelsPerMeter * this.viewport.zoom, t = (this.currentOpeningWidth || 0.9) * e, i = this.wallSnap.wall.thickness * e, s = this.worldToScreen(this.wallSnap.projectionPoint), o = this.wallSnap.angleRad * 180 / Math.PI;
    return I`
      <g 
        class="opening-preview" 
        transform="translate(${s.x}, ${s.y}) rotate(${o})"
      >
        <rect x="${-t / 2}" y="${-i / 2}" width="${t}" height="${i}" fill="rgba(56, 189, 248, 0.3)" stroke="#38bdf8" stroke-dasharray="4, 2" />
        ${this.activeTool === "door" ? this.renderDoorSymbol(t, i, this.openingFlipSide, this.openingFlipDirection) : null}
        ${this.activeTool === "window" ? this.renderWindowSymbol(t, i) : null}
        ${this.activeTool === "french_window" ? this.renderFrenchWindowSymbol(t, i) : null}
      </g>
    `;
  }
  renderPreviewWall() {
    if (!this.drawingWallStart || !this.previewPoint) return null;
    const t = this.computeWallPolygon(
      this.drawingWallStart,
      this.previewPoint,
      this.currentWallThickness
    ).map((a) => this.worldToScreen(a)), i = this.worldToScreen(this.drawingWallStart), s = this.worldToScreen(this.previewPoint), o = t.map((a) => `${a.x},${a.y}`).join(" "), r = w.distance(this.drawingWallStart, this.previewPoint), n = {
      x: (i.x + s.x) / 2,
      y: (i.y + s.y) / 2
    };
    return I`
      <g class="preview-wall-group">
        <polygon points="${o}" class="preview-wall-rect" />
        <line x1="${i.x}" y1="${i.y}" x2="${s.x}" y2="${s.y}" class="preview-wall-line" />

        ${this.snapInfo.guideAngle !== void 0 ? I`
          <line x1="${i.x}" y1="${i.y}" x2="${s.x}" y2="${s.y}" class="angle-guide-line" />
        ` : null}

        <g class="dimension-badge" transform="translate(${n.x}, ${n.y - 16})">
          <rect x="-30" y="-11" width="60" height="22" />
          <text>${w.roundMeters(r).toFixed(2)} m</text>
        </g>
      </g>
    `;
  }
  renderCalibrationLine() {
    if (!this.calibrateStart || !this.calibrateCurrent) return null;
    const e = this.calibrateStart, t = this.calibrateCurrent, i = t.x - e.x, s = t.y - e.y, o = Math.sqrt(i * i + s * s), r = { x: (e.x + t.x) / 2, y: (e.y + t.y) / 2 };
    return I`
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
    const e = this.worldToScreen(this.rescaleStart), t = this.worldToScreen(this.rescaleCurrent), i = w.distance(this.rescaleStart, this.rescaleCurrent), s = {
      x: (e.x + t.x) / 2,
      y: (e.y + t.y) / 2
    };
    return I`
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

        <g class="dimension-badge" transform="translate(${s.x}, ${s.y - 18})">
          <rect x="-48" y="-13" width="96" height="26" rx="6" fill="#0f172a" stroke="#38bdf8" stroke-width="1.8" />
          <text fill="#38bdf8" font-size="12px" font-weight="800" text-anchor="middle" dy="5">
            📐 ${w.roundMeters(i).toFixed(2)} m
          </text>
        </g>
      </g>
    `;
  }
  renderGhostLayer() {
    if (!this.ghostProject || !this.ghostProject.walls || this.ghostProject.walls.length === 0) return null;
    const e = this.project.pixelsPerMeter * this.viewport.zoom;
    return I`
      <g class="ghost-layer" opacity="0.45" pointer-events="none">
        ${this.ghostProject.walls.map((t) => {
      const i = this.worldToScreen(t.start), s = this.worldToScreen(t.end), o = (t.thickness || 0.2) * e;
      return I`
            <line 
              x1="${i.x}" y1="${i.y}" 
              x2="${s.x}" y2="${s.y}" 
              class="ghost-wall" 
              stroke-width="${o}" 
            />
          `;
    })}
      </g>
    `;
  }
  renderSmartGuides() {
    return this.snapInfo.smartGuideX === void 0 && this.snapInfo.smartGuideY === void 0 ? null : I`
      <g class="smart-guides-group" pointer-events="none">
        ${this.snapInfo.smartGuideX !== void 0 ? I`
          <line 
            x1="${this.worldToScreen({ x: this.snapInfo.smartGuideX, y: 0 }).x}" 
            y1="-2000" 
            x2="${this.worldToScreen({ x: this.snapInfo.smartGuideX, y: 0 }).x}" 
            y2="6000" 
            class="smart-guide-line" 
          />
        ` : null}
        ${this.snapInfo.smartGuideY !== void 0 ? I`
          <line 
            x1="-2000" 
            y1="${this.worldToScreen({ x: 0, y: this.snapInfo.smartGuideY }).y}" 
            x2="6000" 
            y2="${this.worldToScreen({ x: 0, y: this.snapInfo.smartGuideY }).y}" 
            class="smart-guide-line" 
          />
        ` : null}
      </g>
    `;
  }
  renderFurniture() {
    const e = this.project.pixelsPerMeter * this.viewport.zoom;
    return (this.project.furniture || []).map((t) => {
      var c;
      const i = he(t.type), s = ((c = this.selectedElements.furnitureIds) == null ? void 0 : c.includes(t.id)) || !1, o = this.worldToScreen(t.position), r = t.width || (i == null ? void 0 : i.width) || 1, n = t.length || (i == null ? void 0 : i.length) || 1, a = r * e, l = n * e, h = t.rotation || 0;
      return I`
        <g
          class="furniture-group ${s ? "selected" : ""}"
          data-furniture-id="${t.id}"
          transform="translate(${o.x}, ${o.y}) rotate(${h})"
          @pointerdown=${(d) => this.handleFurniturePointerDown(t, d)}
          @click=${(d) => this.handleFurnitureClick(d, t)}
          title="${t.name} (${r.toFixed(2)} × ${n.toFixed(2)} m) - Touche R pour pivoter"
        >
          ${i ? i.renderSvg(a, l, s) : I`
            <rect x="${-a / 2}" y="${-l / 2}" width="${a}" height="${l}" fill="rgba(30, 41, 59, 0.85)" stroke="${s ? "#38bdf8" : "#94a3b8"}" stroke-width="1.5" rx="4" />
            <text x="0" y="4" text-anchor="middle" font-size="12" fill="#cbd5e1">${t.icon || "📦"}</text>
          `}
          ${s ? I`
            <circle cx="0" cy="${-l / 2 - 12}" r="5" fill="#38bdf8" stroke="#ffffff" stroke-width="1.5" />
            <line x1="0" y1="${-l / 2}" x2="0" y2="${-l / 2 - 12}" stroke="#38bdf8" stroke-width="1.2" stroke-dasharray="2,2" />
          ` : null}
        </g>
      `;
    });
  }
  renderSnapIndicator() {
    if (!this.previewPoint || this.snapInfo.snappedTo === "none") return null;
    const e = this.worldToScreen(this.previewPoint), t = this.snapInfo.snappedTo === "vertex";
    return I`
      <g transform="translate(${e.x}, ${e.y})">
        <circle r="${t ? 7 : 5}" class="snap-indicator" />
        ${t ? I`<circle r="2" fill="#38bdf8" />` : null}
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
    return x`
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
            ${this.renderGhostLayer()}
            ${this.renderGrid()}
            ${this.renderRooms()}
            ${this.renderFurniture()}
            ${this.renderWalls()}
            ${this.renderOpenings()}
            ${this.renderOpeningPreview()}
            ${this.renderPreviewWall()}
            ${this.renderCalibrationLine()}
            ${this.renderRescaleLine()}
            ${this.renderSmartGuides()}
            ${this.renderSnapIndicator()}
            ${this.renderEntityBindings()}
            ${this.renderMarqueeBox()}
          </svg>
        </div>

        ${!this.isDashboardMode && e ? x`<div class="help-hud">${e}</div>` : null}

        ${this.isDashboardMode ? null : x`
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

          ${this.is3DMode ? x`
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
j.styles = He;
z([
  D({ type: Object })
], j.prototype, "hass", 2);
z([
  D({ type: Object })
], j.prototype, "project", 2);
z([
  D({ type: String })
], j.prototype, "activeTool", 2);
z([
  D({ type: Number })
], j.prototype, "currentWallThickness", 2);
z([
  D({ type: Number })
], j.prototype, "currentOpeningWidth", 2);
z([
  D({ type: Boolean })
], j.prototype, "is3DMode", 2);
z([
  D({ type: Object })
], j.prototype, "selectedElements", 2);
z([
  D({ type: Boolean })
], j.prototype, "isDashboardMode", 2);
z([
  D({ type: Object })
], j.prototype, "ghostProject", 2);
z([
  D({ type: Boolean })
], j.prototype, "showDimensions", 2);
z([
  D({ type: Boolean })
], j.prototype, "showThermalHeatmap", 2);
z([
  m()
], j.prototype, "isMarqueeSelecting", 2);
z([
  m()
], j.prototype, "marqueeStart", 2);
z([
  m()
], j.prototype, "marqueeCurrent", 2);
z([
  m()
], j.prototype, "viewport", 2);
z([
  m()
], j.prototype, "isPanning", 2);
z([
  m()
], j.prototype, "drawingWallStart", 2);
z([
  m()
], j.prototype, "previewPoint", 2);
z([
  m()
], j.prototype, "snapInfo", 2);
z([
  m()
], j.prototype, "cursorCoords", 2);
z([
  m()
], j.prototype, "draggingFurnitureId", 2);
z([
  m()
], j.prototype, "draggingWallId", 2);
z([
  m()
], j.prototype, "wallSnap", 2);
z([
  D({ type: Boolean })
], j.prototype, "openingFlipSide", 2);
z([
  D({ type: Boolean })
], j.prototype, "openingFlipDirection", 2);
z([
  D({ type: Number })
], j.prototype, "windowSashCount", 2);
z([
  m()
], j.prototype, "calibrateStart", 2);
z([
  m()
], j.prototype, "calibrateCurrent", 2);
z([
  m()
], j.prototype, "rescaleStart", 2);
z([
  m()
], j.prototype, "rescaleCurrent", 2);
z([
  m()
], j.prototype, "draggingBindingId", 2);
z([
  m()
], j.prototype, "orbitPitch", 2);
z([
  m()
], j.prototype, "orbitYaw", 2);
z([
  m()
], j.prototype, "isOrbiting", 2);
j = z([
  J("home-architect-canvas")
], j);
var Ge = Object.defineProperty, Ye = Object.getOwnPropertyDescriptor, Y = (e, t, i, s) => {
  for (var o = s > 1 ? void 0 : s ? Ye(t, i) : t, r = e.length - 1, n; r >= 0; r--)
    (n = e[r]) && (o = (s ? n(t, i, o) : n(o)) || o);
  return s && o && Ge(t, i, o), o;
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
    const t = e.clientX - this.dragStartPointer.x, i = e.clientY - this.dragStartPointer.y, o = (this.parentElement || document.body).getBoundingClientRect(), r = this.getBoundingClientRect(), n = 8, a = Math.max(n, o.width - r.width - 8), l = 8, h = Math.max(l, o.height - r.height - 8), c = Math.min(Math.max(this.dragStartPosition.x + t, n), a), d = Math.min(Math.max(this.dragStartPosition.y + i, l), h);
    this.position = { x: Math.round(c), y: Math.round(d) }, this.updateHostPosition();
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
    const i = t.currentTarget, s = this.getBoundingClientRect(), o = i.getBoundingClientRect();
    this.submenuTop = Math.max(0, o.top - s.top - 6), this.submenuOnLeft = s.right + 320 > window.innerWidth, this.activeSubmenu = e;
  }
  selectDoorOption(e, t) {
    this.doorFlipSide = e, this.doorFlipDirection = t, this.dispatchEvent(new CustomEvent("door-config-changed", {
      detail: { flipSide: e, flipDirection: t },
      bubbles: !0,
      composed: !0
    })), this.selectTool("door"), this.activeSubmenu = "none";
  }
  selectWindowOption(e, t, i) {
    this.windowSashCount = t, this.dispatchEvent(new CustomEvent("window-config-changed", {
      detail: { type: e, sashCount: t, width: i },
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
      ${this.activeSubmenu === "door" ? x`
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
            ${!this.doorFlipSide && this.doorFlipDirection ? x`<span class="flyout-item-badge">Actif</span>` : null}
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
            ${!this.doorFlipSide && !this.doorFlipDirection ? x`<span class="flyout-item-badge">Actif</span>` : null}
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
            ${this.doorFlipSide && !this.doorFlipDirection ? x`<span class="flyout-item-badge">Actif</span>` : null}
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
            ${this.doorFlipSide && this.doorFlipDirection ? x`<span class="flyout-item-badge">Actif</span>` : null}
          </div>
        </div>
      ` : null}

      <!-- Sous-menu Flyout Fenêtre (1 ouvrant, 2 battants, baie vitrée) -->
      ${this.activeSubmenu === "window" ? x`
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
      ${this.activeSubmenu === "wall" ? x`
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
Y([
  D({ type: String })
], q.prototype, "activeTool", 2);
Y([
  D({ type: Boolean })
], q.prototype, "canUndo", 2);
Y([
  D({ type: Boolean })
], q.prototype, "canRedo", 2);
Y([
  D({ type: Number })
], q.prototype, "currentThickness", 2);
Y([
  D({ type: Boolean })
], q.prototype, "doorFlipSide", 2);
Y([
  D({ type: Boolean })
], q.prototype, "doorFlipDirection", 2);
Y([
  D({ type: Number })
], q.prototype, "windowSashCount", 2);
Y([
  m()
], q.prototype, "position", 2);
Y([
  m()
], q.prototype, "isDragging", 2);
Y([
  m()
], q.prototype, "activeSubmenu", 2);
Y([
  m()
], q.prototype, "submenuTop", 2);
Y([
  m()
], q.prototype, "submenuOnLeft", 2);
q = Y([
  J("home-architect-toolbar")
], q);
var Ve = Object.defineProperty, Xe = Object.getOwnPropertyDescriptor, nt = (e, t, i, s) => {
  for (var o = s > 1 ? void 0 : s ? Xe(t, i) : t, r = e.length - 1, n; r >= 0; r--)
    (n = e[r]) && (o = (s ? n(t, i, o) : n(o)) || o);
  return s && o && Ve(t, i, o), o;
};
const dt = [
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
let tt = class extends H {
  constructor() {
    super(...arguments), this.selectedTemplate = dt[0], this.width = dt[0].widthMeters, this.length = dt[0].lengthMeters, this.thickness = dt[0].wallThickness, this.addDoor = dt[0].addDoor, this.addWindow = dt[0].addWindow, this.roomName = dt[0].name, this.height = 2.5;
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
          ${dt.map((t) => x`
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
tt.styles = K`
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
nt([
  m()
], tt.prototype, "selectedTemplate", 2);
nt([
  m()
], tt.prototype, "width", 2);
nt([
  m()
], tt.prototype, "length", 2);
nt([
  m()
], tt.prototype, "thickness", 2);
nt([
  m()
], tt.prototype, "addDoor", 2);
nt([
  m()
], tt.prototype, "addWindow", 2);
nt([
  m()
], tt.prototype, "roomName", 2);
nt([
  m()
], tt.prototype, "height", 2);
tt = nt([
  J("home-architect-wizard-modal")
], tt);
var Ke = Object.defineProperty, Je = Object.getOwnPropertyDescriptor, Nt = (e, t, i, s) => {
  for (var o = s > 1 ? void 0 : s ? Je(t, i) : t, r = e.length - 1, n; r >= 0; r--)
    (n = e[r]) && (o = (s ? n(t, i, o) : n(o)) || o);
  return s && o && Ke(t, i, o), o;
};
let St = class extends H {
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
St.styles = K`
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
Nt([
  D({ type: Number })
], St.prototype, "pixelDistance", 2);
Nt([
  D({ type: Number })
], St.prototype, "defaultMeters", 2);
Nt([
  m()
], St.prototype, "realMeters", 2);
St = Nt([
  J("home-architect-calibrate-modal")
], St);
var Qe = Object.defineProperty, Ze = Object.getOwnPropertyDescriptor, yt = (e, t, i, s) => {
  for (var o = s > 1 ? void 0 : s ? Ze(t, i) : t, r = e.length - 1, n; r >= 0; r--)
    (n = e[r]) && (o = (s ? n(t, i, o) : n(o)) || o);
  return s && o && Qe(t, i, o), o;
};
const ue = {
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
let ot = class extends H {
  constructor() {
    super(...arguments), this.collapsed = !1, this.activeTab = "entities", this.furnitureCategory = "all", this.searchQuery = "", this.activeCategory = "all";
  }
  getEntities() {
    var e;
    return (e = this.hass) != null && e.states ? Object.values(this.hass.states).map((t) => {
      var o, r;
      const i = t.entity_id.split(".")[0], s = ue[i] || ue.default;
      return {
        entity_id: t.entity_id,
        name: ((o = t.attributes) == null ? void 0 : o.friendly_name) || t.entity_id,
        state: t.state,
        domain: i,
        icon: s,
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
  handleFurnitureDragStart(e, t) {
    e.dataTransfer && (e.dataTransfer.setData("application/json", JSON.stringify({
      kind: "furniture",
      furnitureType: t.type
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
    if (this.activeCategory !== "all" && (t = t.filter((s) => s.domain === this.activeCategory)), this.searchQuery.trim() && this.activeTab === "entities") {
      const s = this.searchQuery.toLowerCase();
      t = t.filter((o) => o.name.toLowerCase().includes(s) || o.entity_id.toLowerCase().includes(s));
    }
    let i = Xt;
    if (this.furnitureCategory !== "all" && (i = i.filter((s) => s.category === this.furnitureCategory)), this.searchQuery.trim() && this.activeTab === "furniture") {
      const s = this.searchQuery.toLowerCase();
      i = i.filter((o) => o.name.toLowerCase().includes(s));
    }
    return x`
      <div class="drawer-header">
        <div class="drawer-title">
          <span>${this.activeTab === "entities" ? "⚡" : "🛋️"}</span>
          <span>${this.activeTab === "entities" ? "Objets & Domotique" : "Meubles & Déco"}</span>
        </div>
        <button class="btn-toggle" @click=${this.toggleCollapse} title="Masquer / Réduire le volet">
          ⇤
        </button>
      </div>

      <div class="drawer-tabs">
        <button 
          class="tab-btn ${this.activeTab === "entities" ? "active" : ""}" 
          @click=${() => {
      this.activeTab = "entities", this.searchQuery = "";
    }}
        >
          <span>⚡</span>
          <span>Entités HA</span>
          <span class="count-badge">${t.length}</span>
        </button>
        <button 
          class="tab-btn ${this.activeTab === "furniture" ? "active" : ""}" 
          @click=${() => {
      this.activeTab = "furniture", this.searchQuery = "";
    }}
        >
          <span>🛋️</span>
          <span>Meubles</span>
          <span class="count-badge">${Xt.length}</span>
        </button>
      </div>

      ${this.activeTab === "entities" ? x`
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
          ${t.length === 0 ? x`
            <div class="empty-message">Aucune entité trouvée</div>
          ` : t.map((s) => x`
            <div 
              class="entity-card" 
              draggable="true"
              @dragstart=${(o) => this.handleDragStart(o, s)}
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
      ` : x`
        <div class="search-section">
          <div class="search-input-wrapper">
            <input 
              type="text" 
              class="search-input" 
              placeholder="Rechercher un meuble..."
              .value=${this.searchQuery}
              @input=${(s) => this.searchQuery = s.target.value}
            />
          </div>

          <div class="categories-bar">
            <button class="cat-btn ${this.furnitureCategory === "all" ? "active" : ""}" @click=${() => this.furnitureCategory = "all"}>Tous</button>
            <button class="cat-btn ${this.furnitureCategory === "seating" ? "active" : ""}" @click=${() => this.furnitureCategory = "seating"}>Salon</button>
            <button class="cat-btn ${this.furnitureCategory === "bed" ? "active" : ""}" @click=${() => this.furnitureCategory = "bed"}>Chambre</button>
            <button class="cat-btn ${this.furnitureCategory === "table" ? "active" : ""}" @click=${() => this.furnitureCategory = "table"}>Tables</button>
            <button class="cat-btn ${this.furnitureCategory === "bathroom" ? "active" : ""}" @click=${() => this.furnitureCategory = "bathroom"}>Bains</button>
            <button class="cat-btn ${this.furnitureCategory === "kitchen" ? "active" : ""}" @click=${() => this.furnitureCategory = "kitchen"}>Cuisine</button>
          </div>
        </div>

        <div class="furniture-grid">
          ${i.length === 0 ? x`
            <div class="empty-message" style="grid-column: 1 / -1;">Aucun meuble trouvé</div>
          ` : i.map((s) => x`
            <div 
              class="furniture-card" 
              draggable="true"
              @dragstart=${(o) => this.handleFurnitureDragStart(o, s)}
              title="Glissez et déposez sur le plan (${s.width.toFixed(2)} × ${s.length.toFixed(2)} m)"
            >
              <span class="furniture-card-icon">${s.icon}</span>
              <span class="furniture-card-name">${s.name}</span>
              <span class="furniture-card-dim">${s.width.toFixed(2)} × ${s.length.toFixed(2)} m</span>
            </div>
          `)}
        </div>

        <div class="drag-hint">
          <span>👆</span>
          <span>Glissez un meuble sur le plan (R pour pivoter)</span>
        </div>
      `}
    `;
  }
};
ot.styles = K`
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

    .drawer-tabs {
      display: flex;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(15, 23, 42, 0.5);
    }

    .tab-btn {
      flex: 1;
      padding: 10px 8px;
      background: transparent;
      border: none;
      border-bottom: 2px solid transparent;
      color: #94a3b8;
      font-size: 0.80rem;
      font-weight: 700;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      transition: all 0.2s ease;
    }

    .tab-btn:hover {
      color: #f1f5f9;
      background: rgba(255, 255, 255, 0.04);
    }

    .tab-btn.active {
      color: #38bdf8;
      border-bottom-color: #38bdf8;
      background: rgba(56, 189, 248, 0.08);
    }

    .furniture-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 8px;
      padding: 10px 14px;
      overflow-y: auto;
      flex: 1;
    }

    .furniture-card {
      background: rgba(30, 41, 59, 0.65);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 9px;
      padding: 10px 6px;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      cursor: grab;
      transition: all 0.18s ease;
      user-select: none;
      gap: 4px;
    }

    .furniture-card:hover {
      background: rgba(51, 65, 85, 0.9);
      border-color: #38bdf8;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    }

    .furniture-card:active {
      cursor: grabbing;
    }

    .furniture-card-icon {
      font-size: 1.5rem;
    }

    .furniture-card-name {
      font-size: 0.76rem;
      font-weight: 600;
      color: #f1f5f9;
      line-height: 1.2;
    }

    .furniture-card-dim {
      font-size: 0.68rem;
      color: #38bdf8;
      font-family: ui-monospace, SFMono-Regular, monospace;
      font-weight: 600;
    }

    .empty-message {
      padding: 30px 16px;
      text-align: center;
      color: #64748b;
      font-size: 0.83rem;
    }
  `;
yt([
  D({ type: Object })
], ot.prototype, "hass", 2);
yt([
  D({ type: Boolean, reflect: !0 })
], ot.prototype, "collapsed", 2);
yt([
  m()
], ot.prototype, "activeTab", 2);
yt([
  m()
], ot.prototype, "furnitureCategory", 2);
yt([
  m()
], ot.prototype, "searchQuery", 2);
yt([
  m()
], ot.prototype, "activeCategory", 2);
ot = yt([
  J("home-architect-entity-drawer")
], ot);
var ti = Object.defineProperty, ei = Object.getOwnPropertyDescriptor, At = (e, t, i, s) => {
  for (var o = s > 1 ? void 0 : s ? ei(t, i) : t, r = e.length - 1, n; r >= 0; r--)
    (n = e[r]) && (o = (s ? n(t, i, o) : n(o)) || o);
  return s && o && ti(t, i, o), o;
};
const ii = [
  { name: "Bleu ciel", color: "rgba(56, 189, 248, 0.18)" },
  { name: "Violet moderne", color: "rgba(168, 85, 247, 0.18)" },
  { name: "Ambre chaleureux", color: "rgba(245, 158, 11, 0.18)" },
  { name: "Émeraude nature", color: "rgba(16, 185, 129, 0.18)" },
  { name: "Indigo profond", color: "rgba(99, 102, 241, 0.18)" },
  { name: "Rose pastel", color: "rgba(244, 63, 94, 0.18)" },
  { name: "Gris ardoise", color: "rgba(148, 163, 184, 0.18)" }
], si = [
  { label: "2.10 m (Sous-sol)", val: 2.1 },
  { label: "2.30 m (Combles)", val: 2.3 },
  { label: "2.50 m (Standard)", val: 2.5 },
  { label: "2.70 m (Élevé)", val: 2.7 },
  { label: "3.00 m (Haussmann)", val: 3 },
  { label: "3.50 m (Cathédrale)", val: 3.5 }
];
let mt = class extends H {
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
              ${si.map((t) => x`
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
              ${ii.map((t) => x`
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
mt.styles = K`
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
At([
  D({ type: Object })
], mt.prototype, "room", 2);
At([
  m()
], mt.prototype, "name", 2);
At([
  m()
], mt.prototype, "height", 2);
At([
  m()
], mt.prototype, "color", 2);
mt = At([
  J("home-architect-room-modal")
], mt);
class Z {
  constructor(t = 1, i = 0, s = 0, o = 1, r = 0, n = 0) {
    this.a = t, this.b = i, this.c = s, this.d = o, this.e = r, this.f = n;
  }
  static identity() {
    return new Z(1, 0, 0, 1, 0, 0);
  }
  multiply(t) {
    return new Z(
      this.a * t.a + this.c * t.b,
      this.b * t.a + this.d * t.b,
      this.a * t.c + this.c * t.d,
      this.b * t.c + this.d * t.d,
      this.a * t.e + this.c * t.f + this.e,
      this.b * t.e + this.d * t.f + this.f
    );
  }
  translate(t, i) {
    return this.multiply(new Z(1, 0, 0, 1, t, i));
  }
  scale(t, i = t) {
    return this.multiply(new Z(t, 0, 0, i, 0, 0));
  }
  rotate(t) {
    const i = t * Math.PI / 180, s = Math.cos(i), o = Math.sin(i);
    return this.multiply(new Z(s, o, -o, s, 0, 0));
  }
  transformPoint(t) {
    return {
      x: this.a * t.x + this.c * t.y + this.e,
      y: this.b * t.x + this.d * t.y + this.f
    };
  }
  static parseTransform(t) {
    if (!t) return Z.identity();
    let i = Z.identity();
    const s = /([a-zA-Z]+)\s*\(([^)]+)\)/g;
    let o;
    for (; (o = s.exec(t)) !== null; ) {
      const r = o[1].toLowerCase(), n = o[2].trim().split(/[\s,]+/).map(parseFloat).filter((a) => !isNaN(a));
      r === "matrix" && n.length >= 6 ? i = i.multiply(new Z(n[0], n[1], n[2], n[3], n[4], n[5])) : r === "translate" && n.length >= 1 ? i = i.translate(n[0], n[1] || 0) : r === "scale" && n.length >= 1 ? i = i.scale(n[0], n[1] !== void 0 ? n[1] : n[0]) : r === "rotate" && n.length >= 1 && (n.length >= 3 ? i = i.translate(n[1], n[2]).rotate(n[0]).translate(-n[1], -n[2]) : i = i.rotate(n[0]));
    }
    return i;
  }
}
class oi {
  /**
   * Main entry point to parse and interpret an architectural SVG floor plan
   */
  static parseSvg(t, i = 12, s = 0.2, o = 2.5, r) {
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
      const d = this.extractViewBox(c), p = d.width > 0 ? d.width : 1e3, f = i / p, u = Math.round(p / i * 10) / 10, g = [], b = [], k = [], S = [];
      this.traverseElement(c, Z.identity(), {
        segments: g,
        arcs: b,
        textLabels: k,
        polygons: S,
        defaultThickness: s
      });
      const P = g.filter((_) => _.isMeasurementLine).length, y = this.convertSegmentsToWalls(
        g,
        d,
        f,
        s,
        o
      ), $ = this.detectOpenings(
        b,
        g,
        y,
        d,
        f
      ), C = this.detectRooms(
        S,
        y,
        k,
        d,
        f,
        o,
        n.importLabels !== !1
      ), M = n.importWalls !== !1 ? y : [], v = $.filter((_) => _.type === "door" ? n.importDoors !== !1 : n.importWindows !== !1), T = n.importRooms !== !1 ? C : [];
      return {
        success: !0,
        walls: M,
        openings: v,
        rooms: T,
        viewBox: d,
        pixelsPerMeter: u || 50,
        stats: {
          wallCount: y.length,
          doorCount: $.filter((_) => _.type === "door").length,
          windowCount: $.filter((_) => _.type === "window" || _.type === "french_window").length,
          roomCount: C.length,
          textLabelCount: k.length,
          ignoredMeasurementLinesCount: P
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
    const i = t.getAttribute("viewBox");
    if (i) {
      const n = i.trim().split(/[\s,]+/).map(parseFloat).filter((a) => !isNaN(a));
      if (n.length >= 4 && n[2] > 0 && n[3] > 0)
        return { x: n[0], y: n[1], width: n[2], height: n[3] };
    }
    const s = (n, a) => {
      if (!n) return a;
      const l = parseFloat(n);
      return isNaN(l) ? a : n.includes("mm") ? l * 3.7795 : n.includes("cm") ? l * 37.795 : n.includes("in") ? l * 96 : n.includes("pt") ? l * 1.333 : l;
    }, o = s(t.getAttribute("width"), 1e3), r = s(t.getAttribute("height"), 750);
    return { x: 0, y: 0, width: o, height: r };
  }
  /**
   * Parcours récursif des nœuds de l'arbre SVG
   */
  static traverseElement(t, i, s) {
    var _, W, Q, at;
    const o = t.getAttribute("transform"), r = o ? i.multiply(Z.parseTransform(o)) : i, n = t.tagName.toLowerCase(), a = (t.getAttribute("id") || "").toLowerCase(), l = (t.getAttribute("class") || "").toLowerCase(), h = (t.getAttribute("inkscape:label") || "").toLowerCase(), c = (((_ = t.closest("g[id]")) == null ? void 0 : _.getAttribute("id")) || "").toLowerCase(), d = (((W = t.parentElement) == null ? void 0 : W.getAttribute("class")) || "").toLowerCase(), p = `${a} ${l} ${h} ${c} ${d}`, f = t.getAttribute("stroke-dasharray") || "", u = (t.getAttribute("style") || "").toLowerCase(), g = ((Q = t.closest("[stroke-dasharray]")) == null ? void 0 : Q.getAttribute("stroke-dasharray")) || "", S = !!f && f !== "none" && f !== "0" || /stroke-dasharray\s*:\s*(?!none|0)[\d\s,.]+/i.test(u) || !!g && g !== "none" && g !== "0" || /dashed|dotted/.test(u) || /pointill|tirete|dashed|dotted/.test(p) || /dimension|cotation|mesure|cote|measure|guideline|guide|axis|axe|fleche|arrow|marker|tick/i.test(p) || t.hasAttribute("marker-start") || t.hasAttribute("marker-end") || t.closest('g[id*="dimension" i], g[id*="cotation" i], g[id*="cote" i], g[id*="measure" i], g[id*="guide" i]') !== null, P = /door|porte|portillon|swing|battant/.test(p), y = /window|fenetre|vitrage|chassis|baie/.test(p), $ = !S && (/wall|mur|cloison|facade|envelope|structure|enveloppe/.test(p) || !P && !y), C = /room|piece|espace|zone|area|chambre|salon|cuisine|sdb|sejour/.test(p), M = t.getAttribute("fill") || "", v = t.getAttribute("display"), T = t.getAttribute("visibility");
    if (!(v === "none" || T === "hidden")) {
      switch (n) {
        case "line": {
          const R = parseFloat(t.getAttribute("x1") || "0"), L = parseFloat(t.getAttribute("y1") || "0"), O = parseFloat(t.getAttribute("x2") || "0"), F = parseFloat(t.getAttribute("y2") || "0"), st = r.transformPoint({ x: R, y: L }), lt = r.transformPoint({ x: O, y: F });
          s.segments.push({
            start: st,
            end: lt,
            thickness: s.defaultThickness,
            isWallHint: $ && !S,
            isWindowHint: y,
            isDoorHint: P,
            isMeasurementLine: S
          });
          break;
        }
        case "polyline":
        case "polygon": {
          const L = (t.getAttribute("points") || "").trim().split(/[\s,]+/).map(parseFloat).filter((F) => !isNaN(F)), O = [];
          for (let F = 0; F < L.length; F += 2)
            F + 1 < L.length && O.push(r.transformPoint({ x: L[F], y: L[F + 1] }));
          if (O.length >= 2) {
            for (let F = 0; F < O.length - 1; F++)
              s.segments.push({
                start: O[F],
                end: O[F + 1],
                thickness: s.defaultThickness,
                isWallHint: $ && !S,
                isWindowHint: y,
                isDoorHint: P,
                isMeasurementLine: S
              });
            n === "polygon" && O.length >= 3 && (s.segments.push({
              start: O[O.length - 1],
              end: O[0],
              thickness: s.defaultThickness,
              isWallHint: $ && !S,
              isWindowHint: y,
              isDoorHint: P,
              isMeasurementLine: S
            }), S || s.polygons.push({
              points: O,
              isRoomHint: C,
              fill: M
            }));
          }
          break;
        }
        case "rect": {
          const R = parseFloat(t.getAttribute("x") || "0"), L = parseFloat(t.getAttribute("y") || "0"), O = parseFloat(t.getAttribute("width") || "0"), F = parseFloat(t.getAttribute("height") || "0");
          if (O > 0 && F > 0) {
            const st = r.transformPoint({ x: R, y: L }), lt = r.transformPoint({ x: R + O, y: L }), ht = r.transformPoint({ x: R + O, y: L + F }), Ct = r.transformPoint({ x: R, y: L + F });
            if (Math.max(O / F, F / O) >= 3 && !S)
              if (O > F) {
                const Bt = r.transformPoint({ x: R, y: L + F / 2 }), Ht = r.transformPoint({ x: R + O, y: L + F / 2 });
                s.segments.push({
                  start: Bt,
                  end: Ht,
                  thickness: s.defaultThickness,
                  isWallHint: !0,
                  isWindowHint: y,
                  isDoorHint: P,
                  isMeasurementLine: !1
                });
              } else {
                const Bt = r.transformPoint({ x: R + O / 2, y: L }), Ht = r.transformPoint({ x: R + O / 2, y: L + F });
                s.segments.push({
                  start: Bt,
                  end: Ht,
                  thickness: s.defaultThickness,
                  isWallHint: !0,
                  isWindowHint: y,
                  isDoorHint: P,
                  isMeasurementLine: !1
                });
              }
            else
              S || (s.polygons.push({
                points: [st, lt, ht, Ct],
                isRoomHint: C || M !== "none" && M !== "#000000" && M !== "black",
                fill: M
              }), s.segments.push(
                { start: st, end: lt, thickness: s.defaultThickness, isWallHint: $, isWindowHint: y, isDoorHint: P, isMeasurementLine: !1 },
                { start: lt, end: ht, thickness: s.defaultThickness, isWallHint: $, isWindowHint: y, isDoorHint: P, isMeasurementLine: !1 },
                { start: ht, end: Ct, thickness: s.defaultThickness, isWallHint: $, isWindowHint: y, isDoorHint: P, isMeasurementLine: !1 },
                { start: Ct, end: st, thickness: s.defaultThickness, isWallHint: $, isWindowHint: y, isDoorHint: P, isMeasurementLine: !1 }
              ));
          }
          break;
        }
        case "path": {
          const R = t.getAttribute("d");
          R && this.parsePathData(
            R,
            r,
            s,
            $ && !S,
            y,
            P,
            S,
            M
          );
          break;
        }
        case "text": {
          const R = parseFloat(t.getAttribute("x") || "0"), L = parseFloat(t.getAttribute("y") || "0"), O = ((at = t.textContent) == null ? void 0 : at.trim()) || "", F = /^\d+([.,]\d+)?\s*(m|cm|mm)?$/i.test(O);
          if (O.length > 0 && !F) {
            const st = r.transformPoint({ x: R, y: L });
            s.textLabels.push({
              text: O,
              position: st
            });
          }
          break;
        }
      }
      for (let R = 0; R < t.children.length; R++)
        this.traverseElement(t.children[R], r, s);
    }
  }
  /**
   * Parse une chaîne de commandes SVG path ('d')
   */
  static parsePathData(t, i, s, o, r, n, a, l) {
    const h = /([a-df-z])|([-+]?(?:\d*\.\d+|\d+)(?:[eE][-+]?\d+)?)/gi, c = [];
    let d;
    for (; (d = h.exec(t)) !== null; )
      c.push(d[0]);
    let p = { x: 0, y: 0 }, f = { x: 0, y: 0 }, u = [], g = 0, b = "";
    for (; g < c.length; ) {
      const k = c[g];
      /^[a-df-z]$/i.test(k) && (b = k, g++);
      const S = b === b.toLowerCase(), P = b.toUpperCase();
      switch (P) {
        case "M": {
          const y = parseFloat(c[g++]), $ = parseFloat(c[g++]);
          !isNaN(y) && !isNaN($) && (p = S ? { x: p.x + y, y: p.y + $ } : { x: y, y: $ }, f = { ...p }, u.length >= 3 && !a && s.polygons.push({
            points: u.map((C) => i.transformPoint(C)),
            isRoomHint: o ? !1 : l !== "none" && l !== "",
            fill: l
          }), u = [{ ...p }]);
          break;
        }
        case "L": {
          const y = parseFloat(c[g++]), $ = parseFloat(c[g++]);
          if (!isNaN(y) && !isNaN($)) {
            const C = S ? { x: p.x + y, y: p.y + $ } : { x: y, y: $ }, M = i.transformPoint(p), v = i.transformPoint(C);
            s.segments.push({
              start: M,
              end: v,
              thickness: s.defaultThickness,
              isWallHint: o && !a,
              isWindowHint: r,
              isDoorHint: n,
              isMeasurementLine: a
            }), p = C, u.push({ ...p });
          }
          break;
        }
        case "H": {
          const y = parseFloat(c[g++]);
          if (!isNaN(y)) {
            const $ = S ? { x: p.x + y, y: p.y } : { x: y, y: p.y }, C = i.transformPoint(p), M = i.transformPoint($);
            s.segments.push({
              start: C,
              end: M,
              thickness: s.defaultThickness,
              isWallHint: o && !a,
              isWindowHint: r,
              isDoorHint: n,
              isMeasurementLine: a
            }), p = $, u.push({ ...p });
          }
          break;
        }
        case "V": {
          const y = parseFloat(c[g++]);
          if (!isNaN(y)) {
            const $ = S ? { x: p.x, y: p.y + y } : { x: p.x, y }, C = i.transformPoint(p), M = i.transformPoint($);
            s.segments.push({
              start: C,
              end: M,
              thickness: s.defaultThickness,
              isWallHint: o && !a,
              isWindowHint: r,
              isDoorHint: n,
              isMeasurementLine: a
            }), p = $, u.push({ ...p });
          }
          break;
        }
        case "A": {
          const y = parseFloat(c[g++]), $ = parseFloat(c[g++]);
          parseFloat(c[g++]), parseFloat(c[g++]);
          const C = parseFloat(c[g++]), M = parseFloat(c[g++]), v = parseFloat(c[g++]);
          if (!isNaN(M) && !isNaN(v) && !isNaN(y) && !isNaN($)) {
            const T = S ? { x: p.x + M, y: p.y + v } : { x: M, y: v }, _ = i.transformPoint(p), W = i.transformPoint(T);
            s.arcs.push({
              start: _,
              end: W,
              rx: y,
              ry: $,
              sweepFlag: C === 1,
              isDoorHint: !0
            }), p = T, u.push({ ...p });
          }
          break;
        }
        case "C":
        case "S":
        case "Q":
        case "T": {
          const y = P === "C" ? 6 : P === "S" || P === "Q" ? 4 : 2, $ = [];
          for (let v = 0; v < y; v++) $.push(parseFloat(c[g++]));
          const C = $[$.length - 2], M = $[$.length - 1];
          !isNaN(C) && !isNaN(M) && (p = S ? { x: p.x + C, y: p.y + M } : { x: C, y: M }, u.push({ ...p }));
          break;
        }
        case "Z": {
          if (u.length >= 2) {
            const y = i.transformPoint(p), $ = i.transformPoint(f);
            s.segments.push({
              start: y,
              end: $,
              thickness: s.defaultThickness,
              isWallHint: o && !a,
              isWindowHint: r,
              isDoorHint: n,
              isMeasurementLine: a
            });
          }
          u.length >= 3 && !a && s.polygons.push({
            points: u.map((y) => i.transformPoint(y)),
            isRoomHint: o ? !1 : l !== "none" && l !== "",
            fill: l
          }), p = { ...f }, u = [];
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
  static convertSegmentsToWalls(t, i, s, o, r) {
    const n = [];
    for (const a of t) {
      if (a.isMeasurementLine || a.isDoorHint || a.isWindowHint) continue;
      const l = {
        x: (a.start.x - i.x) * s,
        y: (a.start.y - i.y) * s
      }, h = {
        x: (a.end.x - i.x) * s,
        y: (a.end.y - i.y) * s
      };
      w.distance(l, h) < 0.2 || n.push({
        id: `w_svg_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
        start: { x: w.roundMeters(l.x), y: w.roundMeters(l.y) },
        end: { x: w.roundMeters(h.x), y: w.roundMeters(h.y) },
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
    let i = [...t];
    for (let r = 0; r < i.length; r++)
      for (let n = r + 1; n < i.length; n++)
        for (const a of [i[r].start, i[r].end])
          for (const l of [i[n].start, i[n].end])
            w.distance(a, l) < 0.12 && (l.x = a.x, l.y = a.y);
    let s = !0, o = 0;
    for (; s && o < 5; ) {
      s = !1, o++;
      for (let r = 0; r < i.length; r++) {
        const n = i[r];
        if (n)
          for (let a = r + 1; a < i.length; a++) {
            const l = i[a];
            if (!l) continue;
            const h = n.end.x - n.start.x, c = n.end.y - n.start.y, d = Math.sqrt(h * h + c * c), p = l.end.x - l.start.x, f = l.end.y - l.start.y, u = Math.sqrt(p * p + f * f);
            if (d === 0 || u === 0) continue;
            const g = (h * p + c * f) / (d * u);
            if (Math.abs(g) > 0.995) {
              if (w.distance(n.end, l.start) < 0.05) {
                n.end = { ...l.end }, i.splice(a, 1), s = !0;
                break;
              } else if (w.distance(n.end, l.end) < 0.05) {
                n.end = { ...l.start }, i.splice(a, 1), s = !0;
                break;
              } else if (w.distance(n.start, l.end) < 0.05) {
                n.start = { ...l.start }, i.splice(a, 1), s = !0;
                break;
              } else if (w.distance(n.start, l.start) < 0.05) {
                n.start = { ...l.end }, i.splice(a, 1), s = !0;
                break;
              }
            }
          }
      }
    }
    return i;
  }
  /**
   * Détecte les portes (depuis les arcs ou segments marqués) et les fenêtres
   */
  static detectOpenings(t, i, s, o, r) {
    const n = [];
    if (s.length === 0) return n;
    for (const a of t) {
      const l = Math.max(a.rx, a.ry) * r;
      if (l < 0.5 || l > 1.4) continue;
      const h = {
        x: (a.start.x - o.x) * r,
        y: (a.start.y - o.y) * r
      }, c = {
        x: (a.end.x - o.x) * r,
        y: (a.end.y - o.y) * r
      }, d = w.snapPointToWall(h, s, 0.75), p = w.snapPointToWall(c, s, 0.75), f = d && (!p || d.distance < p.distance) ? d : p;
      if (f && f.distance < 0.7) {
        const u = w.roundMeters(Math.min(Math.max(l, 0.73), 1.1)), g = w.roundMeters(f.offset);
        n.some(
          (k) => k.wallId === f.wall.id && Math.abs(k.offset - g) < 0.35
        ) || n.push({
          id: `op_door_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
          wallId: f.wall.id,
          type: "door",
          offset: g,
          width: u,
          flipSide: !1,
          flipDirection: !1
        });
      }
    }
    for (const a of i) {
      if (!a.isWindowHint && !a.isDoorHint || a.isMeasurementLine) continue;
      const l = {
        x: (a.start.x - o.x) * r,
        y: (a.start.y - o.y) * r
      }, h = {
        x: (a.end.x - o.x) * r,
        y: (a.end.y - o.y) * r
      }, c = { x: (l.x + h.x) / 2, y: (l.y + h.y) / 2 }, d = w.distance(l, h);
      if (d < 0.4 || d > 3) continue;
      const p = w.snapPointToWall(c, s, 0.6);
      if (p && p.distance < 0.5) {
        const f = a.isDoorHint ? "door" : d > 1.8 ? "french_window" : "window", u = w.roundMeters(p.offset);
        n.some(
          (b) => b.wallId === p.wall.id && Math.abs(b.offset - u) < 0.35
        ) || n.push({
          id: `op_${f}_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
          wallId: p.wall.id,
          type: f,
          offset: u,
          width: w.roundMeters(d),
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
  static detectRooms(t, i, s, o, r, n, a = !0) {
    const l = [], h = s.map((c) => ({
      text: c.text,
      position: {
        x: (c.position.x - o.x) * r,
        y: (c.position.y - o.y) * r
      }
    }));
    for (const c of t) {
      if (c.points.length < 3) continue;
      const d = c.points.map((b) => ({
        x: w.roundMeters((b.x - o.x) * r),
        y: w.roundMeters((b.y - o.y) * r)
      })), p = V.computeArea(d);
      if (p < 1.5 || p > 300) continue;
      let f = "";
      if (a) {
        for (const b of h)
          if (V.isPointInPolygon(b.position, d)) {
            f = b.text;
            break;
          }
      }
      if (!f && !c.isRoomHint) continue;
      const u = f || `Pièce ${l.length + 1}`, g = this.getRoomStyle(u);
      l.push({
        id: `room_svg_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
        name: u,
        polygon: d,
        areaM2: p,
        color: g.color,
        icon: g.icon,
        height: n
      });
    }
    if (l.length === 0 && h.length > 0 && i.length >= 4 && a)
      for (const c of h) {
        const d = c.text.toLowerCase();
        if (/salon|sejour|chambre|cuisine|sdb|bain|wc|bureau|entree|garage|couloir/i.test(d)) {
          const p = c.position.x, f = c.position.y, u = 1.8, g = [
            { x: w.roundMeters(p - u), y: w.roundMeters(f - u) },
            { x: w.roundMeters(p + u), y: w.roundMeters(f - u) },
            { x: w.roundMeters(p + u), y: w.roundMeters(f + u) },
            { x: w.roundMeters(p - u), y: w.roundMeters(f + u) }
          ], b = this.getRoomStyle(c.text);
          l.push({
            id: `room_svg_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
            name: c.text,
            polygon: g,
            areaM2: V.computeArea(g),
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
    const i = t.toLowerCase();
    return /salon|sejour|living|sam|salle à manger/i.test(i) ? { color: "rgba(59, 130, 246, 0.28)", icon: "mdi:sofa" } : /chambre|bed|suite|parentale/i.test(i) ? { color: "rgba(139, 92, 246, 0.28)", icon: "mdi:bed" } : /cuisine|kitchen/i.test(i) ? { color: "rgba(245, 158, 11, 0.28)", icon: "mdi:silverware-fork-knife" } : /sdb|bain|douche|bath|eau/i.test(i) ? { color: "rgba(6, 182, 212, 0.28)", icon: "mdi:shower" } : /wc|toilet/i.test(i) ? { color: "rgba(16, 185, 129, 0.28)", icon: "mdi:toilet" } : /bureau|office|travail/i.test(i) ? { color: "rgba(99, 102, 241, 0.28)", icon: "mdi:desk" } : /entree|entrée|hall|couloir|degagement|dégagement/i.test(i) ? { color: "rgba(100, 116, 139, 0.28)", icon: "mdi:door" } : /garage|atelier/i.test(i) ? { color: "rgba(120, 113, 108, 0.28)", icon: "mdi:garage" } : /terrasse|balcon|patio/i.test(i) ? { color: "rgba(20, 184, 166, 0.28)", icon: "mdi:balcony" } : { color: "rgba(56, 189, 248, 0.25)", icon: "mdi:home-outline" };
  }
}
var ri = Object.defineProperty, ni = Object.getOwnPropertyDescriptor, U = (e, t, i, s) => {
  for (var o = s > 1 ? void 0 : s ? ni(t, i) : t, r = e.length - 1, n; r >= 0; r--)
    (n = e[r]) && (o = (s ? n(t, i, o) : n(o)) || o);
  return s && o && ri(t, i, o), o;
};
let B = class extends H {
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
    var s;
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
    const i = (s = e.clipboardData.getData("text/plain")) == null ? void 0 : s.trim();
    if (i && (i.startsWith("<svg") || i.startsWith("<?xml") && i.includes("<svg"))) {
      e.preventDefault(), this.processSvgText(i, "Plan SVG collé depuis le presse-papier");
      return;
    }
  }
  triggerFileInput() {
    if (!this.fileInputRef) {
      const e = document.createElement("input");
      e.type = "file", e.accept = "image/*,.svg", e.style.display = "none", e.addEventListener("change", (t) => {
        var s;
        const i = (s = t.target.files) == null ? void 0 : s[0];
        i && this.processFile(i);
      }), this.fileInputRef = e;
    }
    this.fileInputRef.click();
  }
  processFile(e) {
    if (this.imageName = e.name || "Plan importé", e.type === "image/svg+xml" || e.name.toLowerCase().endsWith(".svg")) {
      const i = new FileReader();
      i.onload = (s) => {
        var r;
        const o = (r = s.target) == null ? void 0 : r.result;
        this.processSvgText(o, e.name);
      }, i.readAsText(e);
    } else {
      this.isSvg = !1, this.svgRawText = null, this.svgInterpretResult = null;
      const i = new FileReader();
      i.onload = (s) => {
        var n;
        const o = (n = s.target) == null ? void 0 : n.result, r = new Image();
        r.onload = () => {
          this.imageDataUrl = o, this.imageWidth = r.naturalWidth, this.imageHeight = r.naturalHeight;
        }, r.src = o;
      }, i.readAsDataURL(e);
    }
  }
  processSvgText(e, t = "Plan SVG importé") {
    this.imageName = t, this.isSvg = !0, this.svgRawText = e, this.computeSvgInterpretation();
    const i = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(e);
    this.imageDataUrl = i;
    const s = new Image();
    s.onload = () => {
      var o, r;
      this.imageWidth = s.naturalWidth || ((o = this.svgInterpretResult) == null ? void 0 : o.viewBox.width) || 1e3, this.imageHeight = s.naturalHeight || ((r = this.svgInterpretResult) == null ? void 0 : r.viewBox.height) || 750;
    }, s.src = i;
  }
  computeSvgInterpretation() {
    this.svgRawText && (this.svgInterpretResult = oi.parseSvg(
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
      const i = e.dataTransfer.files[0];
      this.processFile(i);
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
          const i = t.types.find((s) => s.startsWith("image/"));
          if (i) {
            const s = await t.getType(i), o = new File([s], "clipboard_image.png", { type: i });
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
    var t, i, s;
    if (!this.imageDataUrl) return;
    const e = this.isSvg && this.svgImportMode === "vectorize" && !!((t = this.svgInterpretResult) != null && t.success);
    this.dispatchEvent(new CustomEvent("import-confirmed", {
      detail: {
        dataUrl: this.imageDataUrl,
        widthPx: this.imageWidth || ((i = this.svgInterpretResult) == null ? void 0 : i.viewBox.width) || 1e3,
        heightPx: this.imageHeight || ((s = this.svgInterpretResult) == null ? void 0 : s.viewBox.height) || 750,
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
    var i, s;
    const e = this.isSvg && this.svgImportMode === "vectorize" && !!((i = this.svgInterpretResult) != null && i.success), t = (s = this.svgInterpretResult) == null ? void 0 : s.stats;
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

                    ${t ? x`
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

                        ${t.ignoredMeasurementLinesCount > 0 ? x`
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
              ${e ? null : x`
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
          ${!e || this.keepSvgBackground ? x`
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
            ${e ? x`
              <span>✨</span>
              <span>Convertir le plan SVG (${(t == null ? void 0 : t.wallCount) || 0} murs)</span>
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
B.styles = K`
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
  D({ type: String })
], B.prototype, "currentLevel", 2);
U([
  m()
], B.prototype, "imageDataUrl", 2);
U([
  m()
], B.prototype, "imageWidth", 2);
U([
  m()
], B.prototype, "imageHeight", 2);
U([
  m()
], B.prototype, "imageName", 2);
U([
  m()
], B.prototype, "isSvg", 2);
U([
  m()
], B.prototype, "svgRawText", 2);
U([
  m()
], B.prototype, "svgInterpretResult", 2);
U([
  m()
], B.prototype, "svgImportMode", 2);
U([
  m()
], B.prototype, "keepSvgBackground", 2);
U([
  m()
], B.prototype, "importOptions", 2);
U([
  m()
], B.prototype, "calibrateMode", 2);
U([
  m()
], B.prototype, "totalWidthMeters", 2);
U([
  m()
], B.prototype, "opacity", 2);
U([
  m()
], B.prototype, "isDragOver", 2);
B = U([
  J("home-architect-import-modal")
], B);
var ai = Object.defineProperty, li = Object.getOwnPropertyDescriptor, vt = (e, t, i, s) => {
  for (var o = s > 1 ? void 0 : s ? li(t, i) : t, r = e.length - 1, n; r >= 0; r--)
    (n = e[r]) && (o = (s ? n(t, i, o) : n(o)) || o);
  return s && o && ai(t, i, o), o;
};
let rt = class extends H {
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
    const e = this.measuredMeters > 0 && this.targetMeters > 0 ? this.targetMeters / this.measuredMeters : 1, t = (e - 1) * 100, i = this.targetMeters > 0 && Math.abs(e - 1) > 1e-4;
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
            <span class="ratio-pill ${e > 1.001 ? "ratio-expand" : e < 0.999 ? "ratio-shrink" : "ratio-neutral"}">
              × ${e.toFixed(3)} (${t >= 0 ? "+" : ""}${t.toFixed(1)}%)
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
rt.styles = K`
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
vt([
  D({ type: Number })
], rt.prototype, "measuredMeters", 2);
vt([
  D({ type: Number })
], rt.prototype, "wallCount", 2);
vt([
  D({ type: Number })
], rt.prototype, "roomCount", 2);
vt([
  D({ type: Number })
], rt.prototype, "openingCount", 2);
vt([
  m()
], rt.prototype, "targetMeters", 2);
vt([
  m()
], rt.prototype, "adjustBackground", 2);
rt = vt([
  J("home-architect-rescale-modal")
], rt);
class Dt {
  /**
   * Calcule la boîte englobante exacte du plan (murs, pièces, entités, image de fond)
   */
  static calculateBoundingBox(t, i) {
    const s = t.pixelsPerMeter || 50, o = [];
    for (const b of t.walls)
      o.push(b.start, b.end);
    for (const b of t.rooms)
      b.polygon && b.polygon.length > 0 && o.push(...b.polygon);
    for (const b of t.bindings)
      b.position && o.push(b.position);
    if (t.background && t.background.imageUrl && t.background.visible) {
      const b = t.background, k = b.offset || { x: 0, y: 0 }, S = b.scale || 1, P = (b.widthPx || 1200) * S / s, y = (b.heightPx || 900) * S / s;
      o.push(
        { x: k.x, y: k.y },
        { x: k.x + P, y: k.y + y }
      );
    }
    if (o.length === 0)
      return {
        minX: -1,
        minY: -1,
        width: 12,
        height: 8,
        ppm: s
      };
    let r = Math.min(...o.map((b) => b.x)), n = Math.max(...o.map((b) => b.x)), a = Math.min(...o.map((b) => b.y)), l = Math.max(...o.map((b) => b.y));
    const h = n - r || 5, c = l - a || 5, d = i !== void 0 ? i : Math.max(0.6, Math.max(h, c) * 0.05), p = r - d, f = a - d, u = n - r + d * 2, g = l - a + d * 2;
    return {
      minX: p,
      minY: f,
      width: u,
      height: g,
      ppm: s
    };
  }
  /**
   * Convertit un point monde en coordonnées de pourcentage (0% à 100%)
   * strictement compatible avec la carte Lovelace picture-elements de Home Assistant
   */
  static worldToPercentage(t, i) {
    const s = (t.x - i.minX) / i.width * 100, o = (t.y - i.minY) / i.height * 100;
    return {
      left: Math.round(s * 10) / 10,
      top: Math.round(o * 10) / 10
    };
  }
  /**
   * Génère un document SVG vectoriel autonome et complet représentant le plan
   */
  static exportToSvg(t, i) {
    var d, p, f;
    const s = {
      includeRooms: !0,
      includeWalls: !0,
      includeOpenings: !0,
      includeRoomLabels: !0,
      includeEntityMarkers: !1,
      includeBackground: !0,
      backgroundColor: "#0f172a",
      ...i
    }, o = this.calculateBoundingBox(t, s.paddingMeters), r = o.ppm, n = (o.minX * r).toFixed(1), a = (o.minY * r).toFixed(1), l = Math.max(100, Math.round(o.width * r)), h = Math.max(100, Math.round(o.height * r));
    let c = "";
    if (s.backgroundColor && s.backgroundColor !== "transparent" && (c += `  <rect x="${n}" y="${a}" width="${l}" height="${h}" fill="${s.backgroundColor}" />
`), s.includeBackground !== !1 && ((d = t.background) != null && d.imageUrl) && t.background.visible) {
      const u = t.background, g = (((p = u.offset) == null ? void 0 : p.x) || 0) * r, b = (((f = u.offset) == null ? void 0 : f.y) || 0) * r, k = u.scale || 1, S = (u.widthPx || 1200) * k, P = (u.heightPx || 900) * k;
      c += `  <!-- Image de fond du plan d'origine -->
`, c += `  <image href="${u.imageUrl}" x="${g.toFixed(1)}" y="${b.toFixed(1)}" width="${S.toFixed(1)}" height="${P.toFixed(1)}" opacity="${u.opacity || 0.6}" />
`;
    }
    if (s.includeRooms && t.rooms.length > 0) {
      c += `  <!-- Pièces -->
  <g id="rooms">
`;
      for (const u of t.rooms) {
        if (!u.polygon || u.polygon.length < 3) continue;
        const g = u.polygon.map((k) => `${(k.x * r).toFixed(1)},${(k.y * r).toFixed(1)}`).join(" "), b = u.color || "rgba(56, 189, 248, 0.12)";
        c += `    <polygon points="${g}" fill="${b}" stroke="rgba(56, 189, 248, 0.4)" stroke-width="1.5" />
`;
      }
      c += `  </g>
`;
    }
    if (s.includeWalls && t.walls.length > 0) {
      c += `  <!-- Murs -->
  <g id="walls">
`;
      for (const u of t.walls) {
        const b = this.computeWallPolygon(u.start, u.end, u.thickness).map((k) => `${(k.x * r).toFixed(1)},${(k.y * r).toFixed(1)}`).join(" ");
        c += `    <polygon points="${b}" fill="#334155" stroke="#64748b" stroke-width="1" />
`;
      }
      c += `  </g>
`;
    }
    if (s.includeOpenings && t.openings.length > 0) {
      c += `  <!-- Portes & Fenêtres -->
  <g id="openings">
`;
      for (const u of t.openings) {
        const g = t.walls.find((T) => T.id === u.wallId);
        if (!g) continue;
        const b = g.end.x - g.start.x, k = g.end.y - g.start.y, S = Math.sqrt(b * b + k * k);
        if (S === 0) continue;
        const y = (Math.atan2(k, b) * 180 / Math.PI).toFixed(1), $ = (g.start.x + u.offset / S * b) * r, C = (g.start.y + u.offset / S * k) * r, M = u.width * r, v = g.thickness * r;
        if (c += `    <g transform="translate(${$.toFixed(1)}, ${C.toFixed(1)}) rotate(${y})">
`, c += `      <rect x="${(-M / 2).toFixed(1)}" y="${(-v / 2 - 1).toFixed(1)}" width="${M.toFixed(1)}" height="${(v + 2).toFixed(1)}" fill="${s.backgroundColor || "#0f172a"}" />
`, u.type === "door") {
          const T = M / 2, _ = u.flipSide ? -1 : 1, W = u.flipDirection ? T : -T, Q = u.flipDirection ? -1 : 1;
          c += `      <rect x="${-T}" y="${-v / 2}" width="4" height="${v}" fill="#94a3b8" />
`, c += `      <rect x="${T - 4}" y="${-v / 2}" width="4" height="${v}" fill="#94a3b8" />
`, c += `      <line x1="${W}" y1="0" x2="${W}" y2="${_ * M}" stroke="#38bdf8" stroke-width="2" stroke-linecap="round" />
`, c += `      <path d="M ${W + Q * M} 0 A ${M} ${M} 0 0 ${_ > 0 ? u.flipDirection ? 0 : 1 : u.flipDirection ? 1 : 0} ${W} ${_ * M}" fill="rgba(56, 189, 248, 0.08)" stroke="#38bdf8" stroke-width="1.2" stroke-dasharray="3, 3" />
`;
        } else if (u.type === "french_window") {
          const T = M / 2;
          c += `      <rect x="${(-T).toFixed(1)}" y="${(-v / 2).toFixed(1)}" width="${M.toFixed(1)}" height="${v.toFixed(1)}" fill="none" stroke="#94a3b8" stroke-width="2" />
`, c += `      <rect x="${(-T).toFixed(1)}" y="${(-v / 4).toFixed(1)}" width="${T.toFixed(1)}" height="3" fill="#38bdf8" />
`, c += `      <rect x="0" y="${(v / 4).toFixed(1)}" width="${T.toFixed(1)}" height="3" fill="#38bdf8" />
`;
        } else {
          const T = M / 2, _ = u.sashCount === 2 || u.width >= 1.25;
          c += `      <rect x="${(-T).toFixed(1)}" y="${(-v / 2).toFixed(1)}" width="${M.toFixed(1)}" height="${v.toFixed(1)}" fill="none" stroke="#94a3b8" stroke-width="2" />
`, c += `      <line x1="${(-T).toFixed(1)}" y1="0" x2="${T.toFixed(1)}" y2="0" stroke="#38bdf8" stroke-width="1.5" />
`, _ && (c += `      <line x1="0" y1="${(-v / 2).toFixed(1)}" x2="0" y2="${(v / 2).toFixed(1)}" stroke="#38bdf8" stroke-width="2" />
`);
        }
        c += `    </g>
`;
      }
      c += `  </g>
`;
    }
    if (s.includeRoomLabels && t.rooms.length > 0) {
      c += `  <!-- Étiquettes de Pièces -->
  <g id="room-labels">
`;
      for (const u of t.rooms) {
        if (!u.polygon || u.polygon.length < 3) continue;
        const g = V.calculateCentroid(u.polygon), b = (g.x * r).toFixed(1), k = (g.y * r).toFixed(1);
        c += `    <g transform="translate(${b}, ${k})">
`, c += `      <text y="-6" fill="#f8fafc" font-size="13" font-weight="700" text-anchor="middle">${this.escapeXml(u.name)}</text>
`, c += `      <text y="12" fill="#38bdf8" font-size="11" font-weight="600" text-anchor="middle" font-family="monospace">${u.areaM2.toFixed(1)} m²</text>
`, c += `    </g>
`;
      }
      c += `  </g>
`;
    }
    if (s.includeEntityMarkers && t.bindings.length > 0) {
      c += `  <!-- Emplacements des Entités -->
  <g id="entity-markers">
`;
      for (const u of t.bindings) {
        const g = (u.position.x * r).toFixed(1), b = (u.position.y * r).toFixed(1), k = u.icon || "⚡", S = u.customName || u.entityId.split(".")[1];
        c += `    <g transform="translate(${g}, ${b})">
`, c += `      <circle cx="0" cy="0" r="16" fill="rgba(30, 41, 59, 0.85)" stroke="#38bdf8" stroke-width="1.5" />
`, c += `      <text x="0" y="5" font-size="12" text-anchor="middle">${this.escapeXml(k)}</text>
`, c += `      <text x="0" y="26" fill="#f1f5f9" font-size="10" font-weight="600" text-anchor="middle">${this.escapeXml(S)}</text>
`, c += `    </g>
`;
      }
      c += `  </g>
`;
    }
    return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="${n} ${a} ${l} ${h}" width="${l}" height="${h}" style="background-color: ${s.backgroundColor || "#0f172a"}; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 100%; height: auto;">
${c}</svg>`;
  }
  static computeWallPolygon(t, i, s) {
    const o = i.x - t.x, r = i.y - t.y, n = Math.sqrt(o * o + r * r);
    if (n === 0) return [t, t, i, i];
    const a = s / 2, l = -r / n * a, h = o / n * a;
    return [
      { x: t.x + l, y: t.y + h },
      { x: i.x + l, y: i.y + h },
      { x: i.x - l, y: i.y - h },
      { x: t.x - l, y: t.y - h }
    ];
  }
  static escapeXml(t) {
    return t.replace(/[<>&'"]/g, (i) => {
      switch (i) {
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
          return i;
      }
    });
  }
}
const ge = {
  "💡": "mdi:lightbulb",
  "🛋️": "mdi:lamp",
  "🛋": "mdi:wall-sconce-flat",
  "🌟": "mdi:ceiling-light",
  "🔆": "mdi:ceiling-light-outline",
  "🏮": "mdi:outdoor-lamp",
  "🕯️": "mdi:candle",
  "🔦": "mdi:spotlight-beam",
  "🪩": "mdi:led-strip-variant",
  "✨": "mdi:string-lights",
  "🔌": "mdi:power-socket-fr",
  "⚡": "mdi:toggle-switch",
  "📺": "mdi:television",
  "☕": "mdi:coffee-maker",
  "💻": "mdi:laptop",
  "🔊": "mdi:speaker",
  "🖨️": "mdi:printer",
  "🎮": "mdi:gamepad-variant",
  "🔋": "mdi:battery-charging",
  "🪭": "mdi:fan",
  "🚶": "mdi:motion-sensor",
  "🏃": "mdi:walk",
  "👁️": "mdi:radar",
  "🚪": "mdi:door",
  "🪟": "mdi:window-closed",
  "🚗": "mdi:garage",
  "🚨": "mdi:alarm-light",
  "🔔": "mdi:doorbell",
  "🐾": "mdi:paw",
  "💧": "mdi:water-alert",
  "🔥": "mdi:smoke-detector",
  "📬": "mdi:mailbox",
  "🌡️": "mdi:thermometer",
  "☀️": "mdi:weather-sunny",
  "💨": "mdi:air-filter",
  "❄️": "mdi:air-conditioner",
  "♨️": "mdi:water-boiler",
  "⛺": "mdi:awning",
  "↕️": "mdi:arrow-up-down",
  "📻": "mdi:speaker",
  "🎵": "mdi:music",
  "🎬": "mdi:projector",
  "📷": "mdi:camera",
  "📹": "mdi:cctv",
  "🎥": "mdi:video",
  "🌀": "mdi:fan-chevron-up",
  "🌪️": "mdi:ceiling-fan",
  "🤖": "mdi:robot-vacuum",
  "🧹": "mdi:broom",
  "🔒": "mdi:lock",
  "🛡️": "mdi:shield-home",
  "🗝️": "mdi:key"
};
function di(e, t) {
  return e.mdiIcon ? e.mdiIcon : e.icon && ge[e.icon] ? ge[e.icon] : e.icon && e.icon.startsWith("mdi:") ? e.icon : t;
}
class fe {
  /**
   * Génère la configuration YAML complète de la carte native 'picture-elements' de Home Assistant
   */
  static generatePictureElementsYaml(t, i) {
    let s = (i == null ? void 0 : i.imagePath) || `/local/plan_${t.id || "rdc"}.svg`;
    if (i != null && i.embedDataUri && (i != null && i.svgContent))
      try {
        s = `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(i.svgContent)))}`;
      } catch {
        s = i.imagePath || `/local/plan_${t.id || "rdc"}.svg`;
      }
    const o = {
      title: t.name || "Plan Interactif",
      ...i,
      imagePath: s
    }, r = Dt.calculateBoundingBox(t), n = t.bindings || [];
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
      const h = l.position || { x: 0, y: 0 }, { left: c, top: d } = Dt.worldToPercentage(h, r), p = l.entityId, f = p.split(".")[0], u = l.customName || p.split(".")[1].replace(/_/g, " "), g = di(l);
      if (f === "light")
        a += `  # 💡 Lumière : ${u}
`, a += `  - type: state-icon
`, a += `    entity: ${p}
`, g && (a += `    icon: ${g}
`), a += `    title: "${u}"
`, a += `    tap_action:
`, a += `      action: toggle
`, a += `    hold_action:
`, a += `      action: more-info
`, a += `    style:
`, a += `      top: ${d}%
`, a += `      left: ${c}%
`, a += `      transform: translate(-50%, -50%)
`, a += `      --paper-item-icon-active-color: "#facc15"
`, a += `      --paper-item-icon-color: "#94a3b8"

`;
      else if (f === "binary_sensor") {
        const b = p.includes("presence") || p.includes("occupancy") || p.includes("radar") || p.includes("motion") || p.includes("mouvement");
        a += `  # 📡 ${b ? "Radar de Présence" : "Capteur"} : ${u}
`, a += `  - type: state-icon
`, a += `    entity: ${p}
`, g && (a += `    icon: ${g}
`), a += `    title: "${u}"
`, a += `    tap_action:
`, a += `      action: more-info
`, a += `    style:
`, a += `      top: ${d}%
`, a += `      left: ${c}%
`, a += `      transform: translate(-50%, -50%)
`, a += `      --paper-item-icon-active-color: "#ef4444"
`, a += `      --paper-item-icon-color: "#10b981"

`;
      } else if (f === "sensor") {
        const b = p.includes("temp") || p.includes("temperature");
        a += `  # ${b ? "🌡️ Température" : "📊 Capteur"} : ${u}
`, a += `  - type: state-label
`, a += `    entity: ${p}
`, a += `    title: "${u}"
`, a += `    tap_action:
`, a += `      action: more-info
`, a += `    style:
`, a += `      top: ${d}%
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
      } else f === "climate" ? (a += `  # ❄️ Climatisation / Thermostat : ${u}
`, a += `  - type: state-label
`, a += `    entity: ${p}
`, a += `    attribute: current_temperature
`, a += `    suffix: "°C"
`, a += `    title: "${u}"
`, a += `    tap_action:
`, a += `      action: more-info
`, a += `    style:
`, a += `      top: ${d}%
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

`) : f === "switch" ? (a += `  # 🔌 Interrupteur / Prise : ${u}
`, a += `  - type: state-icon
`, a += `    entity: ${p}
`, g && (a += `    icon: ${g}
`), a += `    title: "${u}"
`, a += `    tap_action:
`, a += `      action: toggle
`, a += `    hold_action:
`, a += `      action: more-info
`, a += `    style:
`, a += `      top: ${d}%
`, a += `      left: ${c}%
`, a += `      transform: translate(-50%, -50%)
`, a += `      --paper-item-icon-active-color: "#38bdf8"
`, a += `      --paper-item-icon-color: "#64748b"

`) : (a += `  # ⚡ Entité : ${u}
`, a += `  - type: state-icon
`, a += `    entity: ${p}
`, g && (a += `    icon: ${g}
`), a += `    title: "${u}"
`, a += `    tap_action:
`, a += `      action: more-info
`, a += `    style:
`, a += `      top: ${d}%
`, a += `      left: ${c}%
`, a += `      transform: translate(-50%, -50%)

`);
    }
    return a;
  }
  /**
   * Génère la configuration YAML pour la carte Lovelace personnalisée intégrée 'home-architect-card'
   */
  static generateHomeArchitectCardYaml(t, i) {
    const s = {
      viewMode: "2d",
      title: t.name || "Plan de Maison",
      height: "520px",
      ...i
    };
    let o = `# ========================================================
`;
    return o += `# CARTE LOVELACE PERSONNALISÉE (HOME ARCHITECT CARD)
`, o += `# Rendu vectoriel direct 2D / 3D, états et clics en direct
`, o += `# ========================================================
`, o += `type: custom:home-architect-card
`, o += `project_id: "${t.id || "rdc"}"
`, o += `title: "${s.title}"
`, o += `view_mode: ${s.viewMode || "2d"} # '2d' ou '3d'
`, o += `show_header: true
`, o += `height: "${s.height}"
`, o;
  }
}
var ci = Object.defineProperty, pi = Object.getOwnPropertyDescriptor, it = (e, t, i, s) => {
  for (var o = s > 1 ? void 0 : s ? pi(t, i) : t, r = e.length - 1, n; r >= 0; r--)
    (n = e[r]) && (o = (s ? n(t, i, o) : n(o)) || o);
  return s && o && ci(t, i, o), o;
};
let X = class extends H {
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
      const i = Dt.exportToSvg(this.project, {
        includeRooms: !0,
        includeWalls: !0,
        includeOpenings: !0,
        includeRoomLabels: !0,
        includeEntityMarkers: !1,
        includeBackground: !0,
        backgroundColor: "#0f172a"
      }), s = `plan_${((t = this.project) == null ? void 0 : t.id) || "rdc"}.svg`, o = await this.hass.callWS({
        type: "home_architect/save_svg_to_www",
        filename: s,
        svg_content: i
      });
      o && o.success ? this.syncStatus = "success" : (this.syncStatus = "error", this.syncErrorMsg = "Erreur lors de la sauvegarde sur le serveur");
    } catch (i) {
      console.warn("Home Architect auto-sync to www failed:", i), this.syncStatus = "error", this.syncErrorMsg = (i == null ? void 0 : i.message) || String(i);
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
    navigator.clipboard && typeof navigator.clipboard.writeText == "function" ? navigator.clipboard.writeText(e).then(t).catch((i) => {
      console.warn("navigator.clipboard.writeText rejected, attempting fallback:", i), this.copyFallback(e, t);
    }) : this.copyFallback(e, t);
  }
  copyFallback(e, t) {
    try {
      const i = document.createElement("textarea");
      i.value = e, i.style.position = "fixed", i.style.top = "0", i.style.left = "0", i.style.width = "2em", i.style.height = "2em", i.style.padding = "0", i.style.border = "none", i.style.outline = "none", i.style.boxShadow = "none", i.style.background = "transparent", i.style.opacity = "0", document.body.appendChild(i), i.focus(), i.select();
      const s = document.execCommand("copy");
      document.body.removeChild(i), s ? t() : prompt("Copiez le code YAML ci-dessous :", e);
    } catch (i) {
      console.error("Fallback copy failed:", i), prompt("Copiez le code YAML ci-dessous :", e);
    }
  }
  downloadSvg() {
    const e = Dt.exportToSvg(this.project, {
      includeRooms: !0,
      includeWalls: !0,
      includeOpenings: !0,
      includeRoomLabels: !0,
      includeEntityMarkers: !1,
      includeBackground: !0,
      backgroundColor: "#0f172a"
    }), t = new Blob([e], { type: "image/svg+xml;charset=utf-8" }), i = URL.createObjectURL(t), s = document.createElement("a");
    s.href = i, s.download = `plan_${this.project.id || "rdc"}.svg`, document.body.appendChild(s), s.click(), document.body.removeChild(s), URL.revokeObjectURL(i);
  }
  downloadJson() {
    const e = JSON.stringify(this.project, null, 2), t = new Blob([e], { type: "application/json;charset=utf-8" }), i = URL.createObjectURL(t), s = document.createElement("a");
    s.href = i, s.download = `projet_plan_${this.project.id || "rdc"}.json`, document.body.appendChild(s), s.click(), document.body.removeChild(s), URL.revokeObjectURL(i);
  }
  getEntitySummary() {
    var n, a, l;
    const e = ((n = this.project) == null ? void 0 : n.bindings) || [], t = e.filter((h) => h.entityId.startsWith("light.")).length, i = e.filter((h) => h.entityId.startsWith("binary_sensor.")).length, s = e.filter((h) => h.entityId.startsWith("sensor.") || h.entityId.startsWith("climate.")).length, o = e.filter((h) => h.entityId.startsWith("switch.")).length, r = ((l = (a = this.project) == null ? void 0 : a.rooms) == null ? void 0 : l.length) || 0;
    return { lights: t, radars: i, sensors: s, switches: o, rooms: r, total: e.length };
  }
  render() {
    var o, r, n;
    const e = this.getEntitySummary(), t = Dt.exportToSvg(this.project, {
      includeRooms: !0,
      includeWalls: !0,
      includeOpenings: !0,
      includeRoomLabels: !0,
      includeEntityMarkers: !1,
      includeBackground: !0,
      backgroundColor: "#0f172a"
    }), i = fe.generatePictureElementsYaml(this.project, {
      imagePath: this.imagePath,
      title: this.project.name || "Plan Interactif",
      embedDataUri: this.embedDataUri,
      svgContent: t
    }), s = fe.generateHomeArchitectCardYaml(this.project, {
      viewMode: this.customCardViewMode,
      title: this.project.name || "Plan de Maison"
    });
    return x`
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
          ${this.activeTab === "picture_elements" ? x`
            <!-- Bannière de synchronisation avec HA -->
            ${this.syncStatus === "success" ? x`
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
            ` : this.syncStatus === "syncing" ? x`
              <div class="sync-banner syncing">
                <span class="sync-icon">⏳</span>
                <div class="sync-text">
                  <div class="sync-title">Synchronisation automatique en cours avec Home Assistant...</div>
                  <div class="sync-desc">Enregistrement direct dans <code>/config/www/plan_${((r = this.project) == null ? void 0 : r.id) || "rdc"}.svg</code>.</div>
                </div>
              </div>
            ` : this.syncStatus === "error" ? x`
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
            ` : x`
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

            ${this.embedDataUri ? null : x`
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
                @click=${() => this.copyCode(i)}
              >
                <span>${this.copiedToast ? "✅ Copié !" : "📋 Copier le YAML"}</span>
              </button>
            </div>

            <div class="code-container">
              <div class="code-header">
                <span>Code YAML Picture-Elements</span>
                <button 
                  class="btn-copy ${this.copiedToast ? "copied" : ""}" 
                  @click=${() => this.copyCode(i)}
                >
                  <span>${this.copiedToast ? "✓ Copié !" : "📋 Copier le YAML"}</span>
                </button>
              </div>
              <pre class="code-box"><code>${i}</code></pre>
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
                  ${this.syncStatus === "success" ? x`Le fichier SVG est <strong>déjà présent sur votre serveur Home Assistant</strong> (aucun transfert requis !).` : this.embedDataUri ? x`Le plan est <strong>100% intégré dans le YAML</strong> (aucun fichier externe n'est requis).` : x`Assurez-vous que le fichier <code>plan_${((n = this.project) == null ? void 0 : n.id) || "rdc"}.svg</code> est présent dans <code>/config/www/</code>.`}
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
          ${this.activeTab === "custom_card" ? x`
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
                @click=${() => this.copyCode(s)}
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
                  @click=${() => this.copyCode(s)}
                >
                  <span>${this.copiedToast ? "✓ Copié !" : "📋 Copier le YAML"}</span>
                </button>
              </div>
              <pre class="code-box"><code>${s}</code></pre>
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
          ${this.activeTab === "raw_files" ? x`
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
        ${this.copiedToast ? x`
          <div class="copy-floating-toast">
            <span>✅</span>
            <span>Code YAML copié dans le presse-papier !</span>
          </div>
        ` : null}

        <!-- Pied de page -->
        <div class="modal-footer">
          <button class="btn-secondary" @click=${this.handleClose}>Fermer</button>
          ${this.activeTab !== "raw_files" ? x`
            <button 
              class="btn-action ${this.copiedToast ? "emerald" : this.activeTab === "custom_card" ? "purple" : ""}" 
              style="padding: 10px 22px; font-size: 0.92rem; font-weight: 700; display: inline-flex; align-items: center; gap: 8px; box-shadow: 0 4px 15px rgba(2, 132, 199, 0.4);"
              @click=${() => this.copyCode(this.activeTab === "picture_elements" ? i : s)}
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
X.styles = K`
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
it([
  D({ type: Object })
], X.prototype, "project", 2);
it([
  D({ type: Object })
], X.prototype, "hass", 2);
it([
  m()
], X.prototype, "activeTab", 2);
it([
  m()
], X.prototype, "imagePath", 2);
it([
  m()
], X.prototype, "customCardViewMode", 2);
it([
  m()
], X.prototype, "copiedToast", 2);
it([
  m()
], X.prototype, "syncStatus", 2);
it([
  m()
], X.prototype, "syncErrorMsg", 2);
it([
  m()
], X.prototype, "embedDataUri", 2);
X = it([
  J("home-architect-export-modal")
], X);
var hi = Object.defineProperty, ui = Object.getOwnPropertyDescriptor, et = (e, t, i, s) => {
  for (var o = s > 1 ? void 0 : s ? ui(t, i) : t, r = e.length - 1, n; r >= 0; r--)
    (n = e[r]) && (o = (s ? n(t, i, o) : n(o)) || o);
  return s && o && hi(t, i, o), o;
};
const Vt = [
  { id: "rdc", label: "RDC", icon: "🏠" },
  { id: "jardin", label: "Jardin", icon: "🌳" },
  { id: "sous-sol", label: "Sous-Sol", icon: "🏠" },
  { id: "etage1", label: "1er Étage", icon: "🏠" },
  { id: "etage2", label: "2ème Étage", icon: "🏠" },
  { id: "etage3", label: "3ème Étage", icon: "🏠" },
  { id: "autre", label: "Autre", icon: "📁" }
];
let G = class extends H {
  constructor() {
    super(...arguments), this.initialTab = "save", this.activeTab = "save", this.planName = "", this.planCategory = "rdc", this.customCategoryName = "", this.savedProjects = [], this.isLoadingProjects = !1, this.searchQuery = "";
  }
  connectedCallback() {
    var e, t, i;
    super.connectedCallback(), this.activeTab = this.initialTab, this.planName = ((e = this.project) == null ? void 0 : e.name) || "Plan de Maison", this.planCategory = ((t = this.project) == null ? void 0 : t.category) || ((i = this.project) == null ? void 0 : i.id) || "rdc", Vt.some((s) => s.id === this.planCategory) || (this.customCategoryName = this.planCategory, this.planCategory = "autre"), this.fetchSavedProjects();
  }
  async fetchSavedProjects() {
    this.isLoadingProjects = !0;
    const e = /* @__PURE__ */ new Map();
    if (this.hass && this.hass.callWS)
      try {
        const t = await this.hass.callWS({ type: "home_architect/get_projects" });
        if (t && t.projects && Array.isArray(t.projects))
          for (const i of t.projects)
            i && i.id && e.set(i.id, i);
      } catch (t) {
        console.warn("Erreur lecture projets HA websocket:", t);
      }
    try {
      for (let t = 0; t < localStorage.length; t++) {
        const i = localStorage.key(t);
        if (i && i.startsWith("home_architect_")) {
          const s = localStorage.getItem(i);
          if (s)
            try {
              const o = JSON.parse(s);
              o && o.id && !e.has(o.id) && e.set(o.id, o);
            } catch {
            }
        }
      }
    } catch {
    }
    this.savedProjects = Array.from(e.values()).sort((t, i) => {
      const s = new Date(t.updated_at || 0).getTime();
      return new Date(i.updated_at || 0).getTime() - s;
    }), this.isLoadingProjects = !1;
  }
  handleSave() {
    const e = this.planName.trim() || "Plan Sans Nom", t = this.planCategory === "autre" && this.customCategoryName.trim() ? this.customCategoryName.trim() : this.planCategory;
    this.dispatchEvent(new CustomEvent("save-confirmed", {
      detail: {
        name: e,
        category: t
      },
      bubbles: !0,
      composed: !0
    }));
  }
  handleLoadProject(e) {
    this.dispatchEvent(new CustomEvent("load-project", {
      detail: { project: e },
      bubbles: !0,
      composed: !0
    }));
  }
  async handleDeleteProject(e, t) {
    if (t.stopPropagation(), !!confirm("Êtes-vous sûr de vouloir supprimer ce plan sauvegardé ?")) {
      if (this.hass && this.hass.callWS)
        try {
          await this.hass.callWS({
            type: "home_architect/delete_project",
            project_id: e
          });
        } catch (i) {
          console.warn("Erreur suppression websocket:", i);
        }
      try {
        localStorage.removeItem(`home_architect_${e}`);
      } catch {
      }
      this.savedProjects = this.savedProjects.filter((i) => i.id !== e);
    }
  }
  handleClose() {
    this.dispatchEvent(new CustomEvent("close", { bubbles: !0, composed: !0 }));
  }
  formatDate(e) {
    if (!e) return "Date inconnue";
    try {
      return new Date(e).toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    } catch {
      return e;
    }
  }
  getCategoryItem(e) {
    return Vt.find((t) => t.id === e) || { id: e || "autre", label: e || "Autre", icon: "📁" };
  }
  render() {
    var t, i, s, o, r, n, a, l, h, c;
    const e = this.savedProjects.filter((d) => {
      if (!this.searchQuery) return !0;
      const p = this.searchQuery.toLowerCase();
      return d.name && d.name.toLowerCase().includes(p) || d.category && d.category.toLowerCase().includes(p) || d.id && d.id.toLowerCase().includes(p);
    });
    return x`
      <div class="modal-card" @click=${(d) => d.stopPropagation()}>
        <!-- Header -->
        <div class="modal-header">
          <div class="modal-title-group">
            <span class="modal-icon">${this.activeTab === "save" ? "💾" : "📂"}</span>
            <div>
              <h2 class="modal-title">
                ${this.activeTab === "save" ? "Enregistrer le plan" : "Ouvrir / Recharger un plan"}
              </h2>
              <p class="modal-subtitle">
                ${this.activeTab === "save" ? "Définissez le nom et la catégorie de votre plan pour le retrouver facilement" : "Sélectionnez un plan sauvegardé pour le charger dans l'éditeur"}
              </p>
            </div>
          </div>
          <button class="btn-close" @click=${this.handleClose} title="Fermer">✕</button>
        </div>

        <!-- Onglets Navigation -->
        <div class="tabs-nav">
          <button 
            class="tab-btn ${this.activeTab === "save" ? "active" : ""}"
            @click=${() => this.activeTab = "save"}
          >
            <span>💾</span>
            <span>Enregistrer le plan</span>
          </button>
          <button 
            class="tab-btn ${this.activeTab === "load" ? "active" : ""}"
            @click=${() => {
      this.activeTab = "load", this.fetchSavedProjects();
    }}
          >
            <span>📂</span>
            <span>Ouvrir un plan (${this.savedProjects.length})</span>
          </button>
        </div>

        <!-- Corps du modal -->
        <div class="modal-body">
          ${this.activeTab === "save" ? x`
            <!-- Formulaire Sauvegarde -->
            <div class="form-group">
              <label class="form-label">
                <span>🏷️</span>
                <span>Nom du plan :</span>
              </label>
              <input 
                type="text" 
                class="form-input" 
                .value=${this.planName}
                @input=${(d) => this.planName = d.target.value}
                placeholder="Ex: Plan RDC Maison, Plan Jardin Été..."
                autofocus
              />
            </div>

            <div class="form-group">
              <label class="form-label">
                <span>🏢</span>
                <span>Catégorie du plan (Niveau / Zone) :</span>
              </label>
              <div class="categories-grid">
                ${Vt.map((d) => x`
                  <div 
                    class="category-card ${this.planCategory === d.id ? "selected" : ""}"
                    @click=${() => this.planCategory = d.id}
                  >
                    <span class="cat-icon">${d.icon}</span>
                    <span>${d.label}</span>
                  </div>
                `)}
              </div>

              ${this.planCategory === "autre" ? x`
                <div style="margin-top: 8px;">
                  <input 
                    type="text" 
                    class="form-input" 
                    .value=${this.customCategoryName}
                    @input=${(d) => this.customCategoryName = d.target.value}
                    placeholder="Précisez la catégorie (ex: Combles, Terrasse, Garage...)"
                  />
                </div>
              ` : null}
            </div>

            <!-- Résumé du contenu -->
            <div class="form-group">
              <label class="form-label">
                <span>📊</span>
                <span>Contenu du plan à enregistrer :</span>
              </label>
              <div class="metrics-summary">
                <div class="metric-badge">🧱 <strong>${((i = (t = this.project) == null ? void 0 : t.walls) == null ? void 0 : i.length) || 0}</strong> mur(s)</div>
                <div class="metric-badge">📐 <strong>${((o = (s = this.project) == null ? void 0 : s.rooms) == null ? void 0 : o.length) || 0}</strong> pièce(s)</div>
                <div class="metric-badge">🚪 <strong>${((n = (r = this.project) == null ? void 0 : r.openings) == null ? void 0 : n.length) || 0}</strong> ouvrant(s)</div>
                <div class="metric-badge">⚡ <strong>${((l = (a = this.project) == null ? void 0 : a.bindings) == null ? void 0 : l.length) || 0}</strong> entité(s) HA</div>
                <div class="metric-badge">🛋️ <strong>${((c = (h = this.project) == null ? void 0 : h.furniture) == null ? void 0 : c.length) || 0}</strong> meuble(s)</div>
              </div>
            </div>
          ` : x`
            <!-- Liste Ouvrir / Recharger -->
            <div class="search-bar">
              <input 
                type="text" 
                class="form-input" 
                .value=${this.searchQuery}
                @input=${(d) => this.searchQuery = d.target.value}
                placeholder="🔍 Rechercher un plan par nom ou catégorie..."
              />
            </div>

            ${this.isLoadingProjects ? x`
              <div class="empty-state">
                <span>⏳ Chargement des plans sauvegardés...</span>
              </div>
            ` : e.length === 0 ? x`
              <div class="empty-state">
                <span class="empty-state-icon">📂</span>
                <span>Aucun plan sauvegardé trouvé.</span>
                <button class="btn-primary" style="margin-top: 6px;" @click=${() => this.activeTab = "save"}>
                  💾 Enregistrer le plan actuel
                </button>
              </div>
            ` : x`
              <div class="projects-list">
                ${e.map((d) => {
      var u, g, b, k;
      const p = this.getCategoryItem(d.category || d.id), f = d.id === ((u = this.project) == null ? void 0 : u.id);
      return x`
                    <div class="project-item ${f ? "current" : ""}">
                      <div class="project-info">
                        <div class="project-title-row">
                          <span class="project-cat-badge">
                            <span>${p.icon}</span>
                            <span>${p.label}</span>
                          </span>
                          <span class="project-name" title="${d.name}">${d.name || "Plan Sans Nom"}</span>
                          ${f ? x`<span style="font-size: 0.72rem; color: #38bdf8; font-weight: 700;">(Ouvert)</span>` : null}
                        </div>
                        <div class="project-meta-row">
                          <span>📅 Modifié le ${this.formatDate(d.updated_at)}</span>
                          <span>•</span>
                          <span>🧱 ${((g = d.walls) == null ? void 0 : g.length) || 0} murs</span>
                          <span>•</span>
                          <span>📐 ${((b = d.rooms) == null ? void 0 : b.length) || 0} pièces</span>
                          <span>•</span>
                          <span>⚡ ${((k = d.bindings) == null ? void 0 : k.length) || 0} capteurs</span>
                        </div>
                      </div>

                      <div class="project-actions">
                        <button class="btn-load" @click=${() => this.handleLoadProject(d)} title="Charger ce plan">
                          <span>⚡</span>
                          <span>Charger</span>
                        </button>
                        <button class="btn-delete" @click=${(S) => this.handleDeleteProject(d.id, S)} title="Supprimer ce plan">
                          🗑️
                        </button>
                      </div>
                    </div>
                  `;
    })}
              </div>
            `}
          `}
        </div>

        <!-- Footer -->
        <div class="modal-footer">
          <button class="btn-secondary" @click=${this.handleClose}>
            Annuler
          </button>
          ${this.activeTab === "save" ? x`
            <button class="btn-primary" @click=${this.handleSave}>
              <span>💾</span>
              <span>Enregistrer le plan</span>
            </button>
          ` : null}
        </div>
      </div>
    `;
  }
};
G.styles = K`
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
      border: 1px solid rgba(56, 189, 248, 0.35);
      border-radius: 16px;
      width: 580px;
      max-width: 94vw;
      max-height: 88vh;
      display: flex;
      flex-direction: column;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 30px rgba(56, 189, 248, 0.25);
      overflow: hidden;
    }

    .modal-header {
      padding: 16px 22px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: rgba(15, 23, 42, 0.6);
      flex-shrink: 0;
    }

    .modal-title-group {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .modal-icon {
      font-size: 1.5rem;
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
      padding: 4px 8px;
      border-radius: 6px;
      transition: all 0.15s ease;
    }

    .btn-close:hover {
      color: #ffffff;
      background: rgba(255, 255, 255, 0.1);
    }

    .tabs-nav {
      display: flex;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(15, 23, 42, 0.4);
      padding: 0 20px;
      gap: 10px;
      flex-shrink: 0;
    }

    .tab-btn {
      background: transparent;
      border: none;
      border-bottom: 2px solid transparent;
      color: #94a3b8;
      padding: 12px 14px;
      font-size: 0.88rem;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: all 0.15s ease;
    }

    .tab-btn:hover {
      color: #f1f5f9;
    }

    .tab-btn.active {
      color: #38bdf8;
      border-bottom-color: #38bdf8;
    }

    .modal-body {
      padding: 20px 22px;
      display: flex;
      flex-direction: column;
      gap: 18px;
      overflow-y: auto;
      flex: 1;
      scrollbar-width: thin;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .form-label {
      font-size: 0.86rem;
      font-weight: 600;
      color: #e2e8f0;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .form-input {
      background: rgba(15, 23, 42, 0.8);
      border: 1px solid rgba(255, 255, 255, 0.18);
      border-radius: 10px;
      padding: 10px 14px;
      color: #f8fafc;
      font-size: 0.92rem;
      outline: none;
      transition: all 0.2s ease;
      box-sizing: border-box;
      width: 100%;
    }

    .form-input:focus {
      border-color: #38bdf8;
      box-shadow: 0 0 12px rgba(56, 189, 248, 0.35);
    }

    .categories-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
      gap: 8px;
    }

    .category-card {
      background: rgba(30, 41, 59, 0.7);
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 10px;
      padding: 10px 12px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: all 0.15s ease;
      color: #cbd5e1;
      font-size: 0.84rem;
      font-weight: 600;
      user-select: none;
    }

    .category-card:hover {
      background: rgba(56, 189, 248, 0.15);
      border-color: #38bdf8;
      color: #ffffff;
      transform: translateY(-1px);
    }

    .category-card.selected {
      background: rgba(2, 132, 199, 0.25);
      border-color: #38bdf8;
      color: #38bdf8;
      box-shadow: 0 0 12px rgba(56, 189, 248, 0.35);
      font-weight: 700;
    }

    .category-card .cat-icon {
      font-size: 1.25rem;
    }

    .metrics-summary {
      background: rgba(15, 23, 42, 0.6);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 10px;
      padding: 12px 16px;
      display: flex;
      flex-wrap: wrap;
      gap: 14px;
      font-size: 0.82rem;
      color: #94a3b8;
    }

    .metric-badge {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .metric-badge strong {
      color: #38bdf8;
    }

    .modal-footer {
      padding: 14px 22px;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 12px;
      background: rgba(15, 23, 42, 0.6);
      flex-shrink: 0;
    }

    .btn-secondary {
      background: transparent;
      color: #94a3b8;
      border: 1px solid rgba(255, 255, 255, 0.18);
      border-radius: 8px;
      padding: 8px 16px;
      font-size: 0.86rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.15s ease;
    }

    .btn-secondary:hover {
      color: #ffffff;
      background: rgba(255, 255, 255, 0.08);
    }

    .btn-primary {
      background: #0284c7;
      color: #ffffff;
      border: 1px solid #38bdf8;
      border-radius: 8px;
      padding: 8px 20px;
      font-size: 0.86rem;
      font-weight: 700;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: all 0.15s ease;
      box-shadow: 0 0 14px rgba(56, 189, 248, 0.4);
    }

    .btn-primary:hover {
      background: #0369a1;
      transform: translateY(-1px);
    }

    /* Styles pour la liste des projets sauvegardés */
    .search-bar {
      margin-bottom: 12px;
    }

    .projects-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
      max-height: 380px;
      overflow-y: auto;
      scrollbar-width: thin;
      padding-right: 4px;
    }

    .project-item {
      background: rgba(30, 41, 59, 0.85);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 12px;
      padding: 12px 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 14px;
      transition: all 0.15s ease;
    }

    .project-item:hover {
      border-color: rgba(56, 189, 248, 0.5);
      background: rgba(30, 41, 59, 1);
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.35);
    }

    .project-item.current {
      border-color: #38bdf8;
      background: rgba(2, 132, 199, 0.15);
    }

    .project-info {
      display: flex;
      flex-direction: column;
      gap: 4px;
      min-width: 0;
      flex: 1;
    }

    .project-title-row {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .project-cat-badge {
      background: rgba(56, 189, 248, 0.15);
      color: #38bdf8;
      border: 1px solid rgba(56, 189, 248, 0.3);
      padding: 2px 7px;
      border-radius: 6px;
      font-size: 0.74rem;
      font-weight: 700;
      white-space: nowrap;
    }

    .project-name {
      font-weight: 700;
      font-size: 0.95rem;
      color: #f1f5f9;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .project-meta-row {
      font-size: 0.78rem;
      color: #94a3b8;
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .project-actions {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .btn-load {
      background: rgba(16, 185, 129, 0.2);
      color: #34d399;
      border: 1px solid rgba(16, 185, 129, 0.4);
      border-radius: 8px;
      padding: 6px 14px;
      font-size: 0.82rem;
      font-weight: 700;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
      transition: all 0.15s ease;
      white-space: nowrap;
    }

    .btn-load:hover {
      background: #10b981;
      color: #ffffff;
      box-shadow: 0 0 12px rgba(16, 185, 129, 0.5);
    }

    .btn-delete {
      background: transparent;
      color: #ef4444;
      border: 1px solid rgba(239, 68, 68, 0.3);
      border-radius: 8px;
      padding: 6px 10px;
      font-size: 0.82rem;
      cursor: pointer;
      transition: all 0.15s ease;
    }

    .btn-delete:hover {
      background: #ef4444;
      color: #ffffff;
      box-shadow: 0 0 10px rgba(239, 68, 68, 0.4);
    }

    .empty-state {
      padding: 36px 20px;
      text-align: center;
      color: #94a3b8;
      font-size: 0.9rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
    }

    .empty-state-icon {
      font-size: 2.2rem;
      opacity: 0.6;
    }
  `;
et([
  D({ type: Object })
], G.prototype, "project", 2);
et([
  D({ type: Object })
], G.prototype, "hass", 2);
et([
  D({ type: String })
], G.prototype, "initialTab", 2);
et([
  m()
], G.prototype, "activeTab", 2);
et([
  m()
], G.prototype, "planName", 2);
et([
  m()
], G.prototype, "planCategory", 2);
et([
  m()
], G.prototype, "customCategoryName", 2);
et([
  m()
], G.prototype, "savedProjects", 2);
et([
  m()
], G.prototype, "isLoadingProjects", 2);
et([
  m()
], G.prototype, "searchQuery", 2);
G = et([
  J("home-architect-save-load-modal")
], G);
var gi = Object.defineProperty, fi = Object.getOwnPropertyDescriptor, A = (e, t, i, s) => {
  for (var o = s > 1 ? void 0 : s ? fi(t, i) : t, r = e.length - 1, n; r >= 0; r--)
    (n = e[r]) && (o = (s ? n(t, i, o) : n(o)) || o);
  return s && o && gi(t, i, o), o;
};
const It = {
  light: {
    title: "Éclairage & Luminaires",
    tabLabel: "💡 Éclairage",
    icons: [
      { icon: "💡", label: "Ampoule standard", mdi: "mdi:lightbulb" },
      { icon: "🛋️", label: "Lampe salon", mdi: "mdi:lamp" },
      { icon: "🌟", label: "Spot encastré", mdi: "mdi:ceiling-light" },
      { icon: "🔆", label: "Plafonnier", mdi: "mdi:ceiling-light-outline" },
      { icon: "🏮", label: "Lanterne extérieure", mdi: "mdi:outdoor-lamp" },
      { icon: "🕯️", label: "Bougie / Ambiance", mdi: "mdi:candle" },
      { icon: "🔦", label: "Projecteur", mdi: "mdi:spotlight-beam" },
      { icon: "🪩", label: "Bandeau LED RGB", mdi: "mdi:led-strip-variant" },
      { icon: "✨", label: "Guirlande lumineuse", mdi: "mdi:string-lights" },
      { icon: "🛋", label: "Applique murale", mdi: "mdi:wall-sconce-flat" }
    ]
  },
  switch: {
    title: "Prises & Interrupteurs",
    tabLabel: "🔌 Prises",
    icons: [
      { icon: "🔌", label: "Prise connectée", mdi: "mdi:power-socket-fr" },
      { icon: "⚡", label: "Interrupteur mural", mdi: "mdi:toggle-switch" },
      { icon: "📺", label: "Télévision", mdi: "mdi:television" },
      { icon: "☕", label: "Cafetière / Électroménager", mdi: "mdi:coffee-maker" },
      { icon: "💻", label: "PC / Bureau", mdi: "mdi:laptop" },
      { icon: "🔊", label: "Enceinte / Chaîne Hi-Fi", mdi: "mdi:speaker" },
      { icon: "🖨️", label: "Imprimante", mdi: "mdi:printer" },
      { icon: "🎮", label: "Console de jeu", mdi: "mdi:gamepad-variant" },
      { icon: "🔋", label: "Chargeur batterie", mdi: "mdi:battery-charging" },
      { icon: "🪭", label: "Ventilateur mobile", mdi: "mdi:fan" }
    ]
  },
  binary_sensor: {
    title: "Détecteurs, Sécurité & Ouvrants",
    tabLabel: "📡 Détecteurs",
    icons: [
      { icon: "🚶", label: "Mouvement PIR", mdi: "mdi:motion-sensor" },
      { icon: "🏃", label: "Passage rapide", mdi: "mdi:walk" },
      { icon: "👁️", label: "Radar présence", mdi: "mdi:radar" },
      { icon: "🚪", label: "Capteur porte", mdi: "mdi:door" },
      { icon: "🪟", label: "Capteur fenêtre", mdi: "mdi:window-closed" },
      { icon: "🚗", label: "Porte garage", mdi: "mdi:garage" },
      { icon: "🚨", label: "Sirène / Alarme", mdi: "mdi:alarm-light" },
      { icon: "🔔", label: "Sonnette / Carillon", mdi: "mdi:doorbell" },
      { icon: "🐾", label: "Présence animale", mdi: "mdi:paw" },
      { icon: "💧", label: "Fuite d'eau", mdi: "mdi:water-alert" },
      { icon: "🔥", label: "Détecteur fumée", mdi: "mdi:smoke-detector" },
      { icon: "📬", label: "Boîte aux lettres", mdi: "mdi:mailbox" }
    ]
  },
  climate: {
    title: "Thermostats & Climatisation",
    tabLabel: "🌡️ Climat",
    icons: [
      { icon: "🌡️", label: "Thermostat principal", mdi: "mdi:thermostat" },
      { icon: "❄️", label: "Climatiseur (Froid)", mdi: "mdi:air-conditioner" },
      { icon: "🔥", label: "Radiateur (Chaud)", mdi: "mdi:radiator" },
      { icon: "♨️", label: "Pompe à chaleur / ECS", mdi: "mdi:water-boiler" },
      { icon: "💨", label: "VMC / Aération", mdi: "mdi:fan" }
    ]
  },
  sensor: {
    title: "Capteurs & Sondes",
    tabLabel: "📊 Sondes",
    icons: [
      { icon: "🌡️", label: "Sonde température", mdi: "mdi:thermometer" },
      { icon: "💧", label: "Hygrométrie (Humidité)", mdi: "mdi:water-percent" },
      { icon: "☀️", label: "Luminosité (Lux)", mdi: "mdi:weather-sunny" },
      { icon: "💨", label: "Qualité d'air (CO2/VOC)", mdi: "mdi:air-filter" },
      { icon: "⚡", label: "Consommation électrique", mdi: "mdi:flash" },
      { icon: "🔋", label: "Batterie restante", mdi: "mdi:battery" },
      { icon: "🔊", label: "Bruit / Décibels", mdi: "mdi:volume-high" },
      { icon: "⚖️", label: "Pression barométrique", mdi: "mdi:gauge" }
    ]
  },
  cover: {
    title: "Volets, Stores & Motorisations",
    tabLabel: "🪟 Volets",
    icons: [
      { icon: "🪟", label: "Volet roulant", mdi: "mdi:window-shutter" },
      { icon: "🚪", label: "Store vénitien", mdi: "mdi:blinds" },
      { icon: "🚗", label: "Porte garage motorisée", mdi: "mdi:garage" },
      { icon: "⛺", label: "Store banne terrasse", mdi: "mdi:awning" },
      { icon: "↕️", label: "Motorisation baie", mdi: "mdi:arrow-up-down" }
    ]
  },
  media_player: {
    title: "Multimédia & Enceintes",
    tabLabel: "📺 Média",
    icons: [
      { icon: "📺", label: "Téléviseur", mdi: "mdi:television" },
      { icon: "📻", label: "Enceinte connectée", mdi: "mdi:speaker" },
      { icon: "🎵", label: "Musique multiroom", mdi: "mdi:music" },
      { icon: "🔊", label: "Ampli Home-Cinema", mdi: "mdi:speaker-wireless" },
      { icon: "🎬", label: "Vidéoprojecteur", mdi: "mdi:projector" },
      { icon: "🎮", label: "Console jeux vidéo", mdi: "mdi:gamepad-variant" }
    ]
  },
  camera: {
    title: "Caméras & Vidéosurveillance",
    tabLabel: "📷 Caméras",
    icons: [
      { icon: "📷", label: "Caméra intérieure fixe", mdi: "mdi:camera" },
      { icon: "📹", label: "Caméra dôme PTZ extérieure", mdi: "mdi:cctv" },
      { icon: "👁️", label: "Zone sous surveillance", mdi: "mdi:eye" },
      { icon: "🎥", label: "Portier / Interphone vidéo", mdi: "mdi:video" }
    ]
  },
  fan: {
    title: "Ventilation & Brassage",
    tabLabel: "💨 Ventilateur",
    icons: [
      { icon: "💨", label: "Ventilateur colonne/pied", mdi: "mdi:fan" },
      { icon: "🌀", label: "VMC extraction", mdi: "mdi:fan-chevron-up" },
      { icon: "🌪️", label: "Plafonnier ventilateur", mdi: "mdi:ceiling-fan" }
    ]
  },
  vacuum: {
    title: "Robots Aspirateurs & Nettoyage",
    tabLabel: "🤖 Robots",
    icons: [
      { icon: "🤖", label: "Robot aspirateur", mdi: "mdi:robot-vacuum" },
      { icon: "🧹", label: "Robot laveur de sol", mdi: "mdi:broom" }
    ]
  },
  lock: {
    title: "Serrures & Contrôle d'accès",
    tabLabel: "🔒 Serrures",
    icons: [
      { icon: "🔒", label: "Serrure connectée", mdi: "mdi:lock" },
      { icon: "🛡️", label: "Alarme intrusion", mdi: "mdi:shield-home" },
      { icon: "🗝️", label: "Gâche électrique", mdi: "mdi:key" }
    ]
  }
};
let E = class extends H {
  constructor() {
    super(...arguments), this.narrow = !1, this.activeTool = "wall", this.currentThickness = 0.2, this.currentOpeningWidth = 0.9, this.doorFlipSide = !1, this.doorFlipDirection = !0, this.windowSashCount = 1, this.activeLevel = "rdc", this.showDimensions = !0, this.showThermalHeatmap = !1, this.showGhostLevel = !1, this.levelProjects = {}, this.is3DMode = !1, this.isDrawerCollapsed = !1, this.isWizardOpen = !1, this.isImportModalOpen = !1, this.isExportModalOpen = !1, this.isSaveLoadModalOpen = !1, this.saveLoadModalTab = "save", this.isCalibrateModalOpen = !1, this.calibrationData = null, this.isRescaleModalOpen = !1, this.rescaleMeasuredMeters = 0, this.selectedRoomForEdit = null, this.selectedElements = {
      wallIds: [],
      openingIds: [],
      roomIds: [],
      bindingIds: [],
      furnitureIds: []
    }, this.activeDropdown = null, this.selectedTypologyTab = "", this.isIconPickerOpen = !0, this.undoStack = [], this.redoStack = [], this.project = {
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
    }, this.fileInputRef = null, this.toastMessage = null, this.toastTimeout = null, this._boundPaste = null, this._boundKeyDown = null, this._boundClickOutside = null;
  }
  handleToolSelected(e) {
    this.activeTool = e.detail.tool, this.activeTool === "door" ? this.currentOpeningWidth = 0.9 : this.activeTool === "window" ? this.currentOpeningWidth = this.windowSashCount === 2 ? 1.4 : 0.9 : this.activeTool === "french_window" && (this.currentOpeningWidth = 2);
  }
  handleDoorConfigChanged(e) {
    if (this.doorFlipSide = e.detail.flipSide, this.doorFlipDirection = e.detail.flipDirection, this.activeTool = "door", this.selectedElements.openingIds.length > 0) {
      this.pushUndoSnapshot();
      let t = 0;
      const i = this.project.openings.map((s) => this.selectedElements.openingIds.includes(s.id) && s.type === "door" ? (t++, { ...s, flipSide: e.detail.flipSide, flipDirection: e.detail.flipDirection }) : s);
      t > 0 && (this.project = { ...this.project, openings: i }, this.showToast(`🚪 ${t} porte(s) mise(s) à jour`));
    }
  }
  handleWindowConfigChanged(e) {
    if (this.activeTool = e.detail.type, this.currentOpeningWidth = e.detail.width, this.windowSashCount = e.detail.sashCount, this.selectedElements.openingIds.length > 0) {
      this.pushUndoSnapshot();
      let t = 0;
      const i = this.project.openings.map((s) => this.selectedElements.openingIds.includes(s.id) && (s.type === "window" || s.type === "french_window") ? (t++, {
        ...s,
        type: e.detail.type,
        width: e.detail.width,
        sashCount: e.detail.sashCount
      }) : s);
      t > 0 && (this.project = { ...this.project, openings: i }, this.showToast(`🪟 ${t} fenêtre(s) mise(s) à jour`));
    }
  }
  handleWallThicknessChanged(e) {
    if (this.currentThickness = e.detail.thickness, this.activeTool = "wall", this.selectedElements.wallIds.length > 0) {
      this.pushUndoSnapshot();
      const t = this.project.walls.map((i) => this.selectedElements.wallIds.includes(i.id) ? { ...i, thickness: e.detail.thickness } : i);
      this.project = { ...this.project, walls: t }, this.showToast(`🧱 Épaisseur de ${this.selectedElements.wallIds.length} mur(s) mise à jour (${Math.round(e.detail.thickness * 100)} cm)`);
    }
  }
  updateSelectedDoorConfig(e, t) {
    this.pushUndoSnapshot(), this.doorFlipSide = e, this.doorFlipDirection = t;
    const i = this.project.openings.map((s) => this.selectedElements.openingIds.includes(s.id) && s.type === "door" ? { ...s, flipSide: e, flipDirection: t } : s);
    this.project = { ...this.project, openings: i }, this.showToast("🚪 Sens d'ouverture de porte mis à jour");
  }
  updateSelectedWindowConfig(e, t, i) {
    this.pushUndoSnapshot(), this.windowSashCount = t, this.currentOpeningWidth = i;
    const s = this.project.openings.map((o) => this.selectedElements.openingIds.includes(o.id) && (o.type === "window" || o.type === "french_window") ? { ...o, type: e, sashCount: t, width: i } : o);
    this.project = { ...this.project, openings: s }, this.showToast("🪟 Format de fenêtre mis à jour");
  }
  updateSelectedWallsThickness(e) {
    this.pushUndoSnapshot(), this.currentThickness = e;
    const t = this.project.walls.map((i) => this.selectedElements.wallIds.includes(i.id) ? { ...i, thickness: e } : i);
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
    const { name: t, width: i, length: s, thickness: o, height: r, color: n, icon: a, addDoor: l, addWindow: h } = e.detail, c = r || 2.5, d = 2, p = 2, f = { x: d, y: p }, u = { x: d + i, y: p }, g = { x: d + i, y: p + s }, b = { x: d, y: p + s }, k = {
      id: `w_top_${Date.now()}`,
      start: f,
      end: u,
      thickness: o,
      height: c,
      type: "standard"
    }, S = {
      id: `w_right_${Date.now()}`,
      start: u,
      end: g,
      thickness: o,
      height: c,
      type: "standard"
    }, P = {
      id: `w_bottom_${Date.now()}`,
      start: g,
      end: b,
      thickness: o,
      height: c,
      type: "standard"
    }, y = {
      id: `w_left_${Date.now()}`,
      start: b,
      end: f,
      thickness: o,
      height: c,
      type: "standard"
    }, $ = [];
    l && $.push({
      id: `op_door_${Date.now()}`,
      wallId: P.id,
      type: "door",
      offset: i / 2,
      width: 0.9,
      flipSide: !1,
      flipDirection: !1
    }), h && $.push({
      id: `op_win_${Date.now()}`,
      wallId: k.id,
      type: "window",
      offset: i / 2,
      width: 1.2,
      flipSide: !1,
      flipDirection: !1
    });
    const C = {
      id: `room_${Date.now()}`,
      name: t,
      polygon: [f, u, g, b],
      areaM2: i * s,
      color: n,
      icon: a,
      height: c
    };
    this.project = {
      ...this.project,
      walls: [...this.project.walls, k, S, P, y],
      openings: [...this.project.openings, ...$],
      rooms: [...this.project.rooms, C]
    }, this.isWizardOpen = !1, this.activeTool = "select";
  }
  connectedCallback() {
    super.connectedCallback(), this._boundPaste = this.handlePaste.bind(this), window.addEventListener("paste", this._boundPaste), this._boundKeyDown = this.handleKeyDown.bind(this), window.addEventListener("keydown", this._boundKeyDown), this._boundClickOutside = (e) => {
      this.activeDropdown && (e.composedPath().some((s) => {
        var o;
        return (o = s == null ? void 0 : s.classList) == null ? void 0 : o.contains("dropdown-menu-wrapper");
      }) || (this.activeDropdown = null));
    }, window.addEventListener("click", this._boundClickOutside);
  }
  async firstUpdated() {
    if (this.hass && this.hass.callWS)
      try {
        const e = await this.hass.callWS({ type: "home_architect/get_projects" });
        if (e && e.projects && Array.isArray(e.projects)) {
          for (const t of e.projects)
            t && t.id && (this.levelProjects[t.id] = t);
          this.levelProjects[this.activeLevel] && (this.project = { ...this.levelProjects[this.activeLevel] });
        }
      } catch (e) {
        console.warn("Initial project load from HA websocket failed:", e);
      }
    if (!this.levelProjects[this.activeLevel]) {
      const e = localStorage.getItem(`home_architect_${this.activeLevel}`);
      if (e)
        try {
          const t = JSON.parse(e);
          t && t.id && (this.project = t, this.levelProjects[this.activeLevel] = t);
        } catch {
        }
    }
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._boundPaste && window.removeEventListener("paste", this._boundPaste), this._boundKeyDown && window.removeEventListener("keydown", this._boundKeyDown), this._boundClickOutside && window.removeEventListener("click", this._boundClickOutside), this.toastTimeout && clearTimeout(this.toastTimeout);
  }
  showToast(e) {
    this.toastMessage = e, this.toastTimeout && clearTimeout(this.toastTimeout), this.toastTimeout = setTimeout(() => {
      this.toastMessage = null;
    }, 4500);
  }
  loadBackgroundImage(e, t = "Plan chargé !") {
    const i = new Image();
    i.onload = () => {
      this.pushUndoSnapshot(), this.project = {
        ...this.project,
        background: {
          imageUrl: e,
          opacity: 0.4,
          visible: !0,
          offset: { x: 0, y: 0 },
          scale: 1,
          rotation: 0,
          widthPx: i.naturalWidth,
          heightPx: i.naturalHeight
        }
      }, this.activeTool = "calibrate", this.showToast(`${t} Tracez un segment sur un mur mesuré pour étalonner l'échelle (📏).`);
    }, i.onerror = () => {
      this.showToast("❌ Erreur lors du chargement de l'image.");
    }, i.src = e;
  }
  handleImportConfirmed(e) {
    this.pushUndoSnapshot();
    const {
      dataUrl: t,
      widthPx: i,
      heightPx: s,
      opacity: o,
      mode: r,
      totalWidthMeters: n,
      isSvgVectorized: a,
      svgInterpretation: l,
      keepSvgBackground: h
    } = e.detail;
    if (this.isImportModalOpen = !1, a && l && l.success) {
      const { walls: d, openings: p, rooms: f, pixelsPerMeter: u, stats: g } = l, b = h ? {
        imageUrl: t,
        opacity: o !== void 0 ? o : 0.25,
        visible: !0,
        offset: { x: 0, y: 0 },
        scale: 1,
        rotation: 0,
        widthPx: i,
        heightPx: s
      } : void 0;
      this.project = {
        ...this.project,
        pixelsPerMeter: u || this.project.pixelsPerMeter,
        walls: [...this.project.walls, ...d],
        openings: [...this.project.openings, ...p],
        rooms: [...this.project.rooms, ...f],
        background: b
      }, this.activeTool = "select", this.showToast(
        `✨ Plan SVG converti : ${g.wallCount} mur${g.wallCount > 1 ? "s" : ""}, ${g.doorCount} porte${g.doorCount > 1 ? "s" : ""}, ${g.windowCount} fenêtre${g.windowCount > 1 ? "s" : ""} et ${g.roomCount} pièce${g.roomCount > 1 ? "s" : ""} créés !`
      );
      return;
    }
    let c = this.project.pixelsPerMeter;
    r === "auto_dimension" && n && n > 0 && (c = Math.round(i / n * 10) / 10), this.project = {
      ...this.project,
      pixelsPerMeter: c,
      background: {
        imageUrl: t,
        opacity: o !== void 0 ? o : 0.4,
        visible: !0,
        offset: { x: 0, y: 0 },
        scale: 1,
        rotation: 0,
        widthPx: i,
        heightPx: s
      }
    }, r === "auto_dimension" ? (this.activeTool = "wall", this.showToast(`✅ Plan importé et étalonné automatiquement (1 m = ${c} px) ! Vous pouvez tracer vos murs (🧱).`)) : (this.activeTool = "calibrate", this.showToast("📏 Plan importé ! Tracez un segment sur un mur mesuré pour étalonner l'échelle."));
  }
  handlePaste(e) {
    var s;
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
    const i = (s = e.clipboardData.getData("text/plain")) == null ? void 0 : s.trim();
    if (i && (i.startsWith("<svg") || i.startsWith("<?xml") && i.includes("<svg"))) {
      e.preventDefault(), this.isImportModalOpen = !0, this.showToast("📥 Code SVG détecté ! Configurez la vectorisation automatique.");
      return;
    }
    i && (i.startsWith("data:image/") || i.match(/\.(png|jpe?g|svg|webp)(\?.*)?$/i)) && (e.preventDefault(), this.loadBackgroundImage(i, "📋 Image chargée depuis l'URL collée !"));
  }
  triggerFileInput() {
    if (!this.fileInputRef) {
      const e = document.createElement("input");
      e.type = "file", e.accept = "image/*", e.style.display = "none", e.addEventListener("change", (t) => this.handleFileSelected(t)), document.body.appendChild(e), this.fileInputRef = e;
    }
    this.fileInputRef.click();
  }
  handleFileSelected(e) {
    var s;
    const t = (s = e.target.files) == null ? void 0 : s[0];
    if (!t) return;
    const i = new FileReader();
    i.onload = (o) => {
      var n;
      const r = (n = o.target) == null ? void 0 : n.result;
      this.loadBackgroundImage(r, "🖼️ Image importée depuis votre ordinateur !");
    }, i.readAsDataURL(t);
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
    const { currentMeters: t, targetMeters: i, scaleFactor: s, adjustBackground: o } = e.detail;
    if (this.isRescaleModalOpen = !1, s <= 0 || isNaN(s)) return;
    const r = this.project.walls.map((d) => ({
      ...d,
      start: {
        x: w.roundMeters(d.start.x * s),
        y: w.roundMeters(d.start.y * s)
      },
      end: {
        x: w.roundMeters(d.end.x * s),
        y: w.roundMeters(d.end.y * s)
      }
    })), n = this.project.openings.map((d) => ({
      ...d,
      offset: w.roundMeters(d.offset * s),
      width: w.roundMeters(d.width * s)
    })), a = this.project.rooms.map((d) => {
      const p = d.polygon.map((u) => ({
        x: w.roundMeters(u.x * s),
        y: w.roundMeters(u.y * s)
      })), f = V.computeArea(p);
      return {
        ...d,
        polygon: p,
        areaM2: f || w.roundMeters(d.areaM2 * s * s)
      };
    }), l = this.project.bindings.map((d) => ({
      ...d,
      position: {
        x: w.roundMeters(d.position.x * s),
        y: w.roundMeters(d.position.y * s)
      }
    }));
    let h = this.project.pixelsPerMeter, c = this.project.background ? { ...this.project.background } : void 0;
    o && c && (h = Math.round(this.project.pixelsPerMeter / s * 10) / 10, c.offset && (c = {
      ...c,
      offset: {
        x: w.roundMeters(c.offset.x * s),
        y: w.roundMeters(c.offset.y * s)
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
      `✅ Plan mis à l'échelle (×${s.toFixed(3)}) : ${r.length} murs et ${a.length} pièces recalculés !`
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
    const { roomId: t, name: i, height: s, color: o } = e.detail, r = this.project.rooms.map((n) => n.id === t ? { ...n, name: i, height: s, color: o } : n);
    this.project = {
      ...this.project,
      rooms: r
    }, this.selectedRoomForEdit = null, this.showToast(`✨ Pièce "${i}" mise à jour (H: ${s.toFixed(2)} m) !`);
  }
  handleDeleteRoom(e) {
    this.pushUndoSnapshot();
    const { roomId: t } = e.detail;
    this.project = {
      ...this.project,
      rooms: this.project.rooms.filter((i) => i.id !== t)
    }, this.selectedRoomForEdit = null, this.showToast("🗑️ Pièce supprimée");
  }
  pushUndoSnapshot(e) {
    const t = JSON.parse(JSON.stringify(e || this.project));
    this.undoStack = [...this.undoStack.slice(-39), t], this.redoStack = [];
  }
  handleUndo() {
    if (this.undoStack.length === 0) return;
    const e = this.undoStack[this.undoStack.length - 1], t = this.undoStack.slice(0, -1), i = JSON.parse(JSON.stringify(this.project));
    this.redoStack = [...this.redoStack.slice(-39), i], this.undoStack = t, this.project = e, this.selectedElements = { wallIds: [], openingIds: [], roomIds: [], bindingIds: [] }, this.showToast("↩️ Action annulée");
  }
  handleRedo() {
    if (this.redoStack.length === 0) return;
    const e = this.redoStack[this.redoStack.length - 1], t = this.redoStack.slice(0, -1), i = JSON.parse(JSON.stringify(this.project));
    this.undoStack = [...this.undoStack.slice(-39), i], this.redoStack = t, this.project = e, this.selectedElements = { wallIds: [], openingIds: [], roomIds: [], bindingIds: [] }, this.showToast("↪️ Action rétablie");
  }
  getGhostProject() {
    if (!this.showGhostLevel) return null;
    let e = null;
    return this.activeLevel === "etage3" ? e = "etage2" : this.activeLevel === "etage2" ? e = "etage1" : this.activeLevel === "etage1" ? e = "rdc" : this.activeLevel === "rdc" && (e = "sous-sol"), e && this.levelProjects[e] || null;
  }
  handleLevelSwitch(e) {
    if (this.activeLevel !== e) {
      if (this.levelProjects[this.activeLevel] = { ...this.project }, this.activeLevel = e, this.levelProjects[e])
        this.project = { ...this.levelProjects[e] };
      else {
        const t = {
          "sous-sol": "Sous-Sol",
          rdc: "Rez-de-Chaussée",
          etage1: "1er Étage",
          etage2: "2ème Étage",
          etage3: "3ème Étage",
          jardin: "Jardin"
        };
        this.project = {
          id: e,
          name: t[e] || e,
          category: e,
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
          bindings: [],
          furniture: []
        }, this.levelProjects[e] = { ...this.project };
      }
      this.undoStack = [], this.redoStack = [], this.clearSelection(), this.showToast(`Étage sélectionné : ${this.project.name}`);
    }
  }
  rotateSelectedFurniture() {
    if (!this.selectedElements.furnitureIds || this.selectedElements.furnitureIds.length === 0) return;
    this.pushUndoSnapshot();
    const e = this.selectedElements.furnitureIds, t = (this.project.furniture || []).map((i) => e.includes(i.id) ? {
      ...i,
      rotation: ((i.rotation || 0) + 90) % 360
    } : i);
    this.project = { ...this.project, furniture: t }, this.showToast("🔄 Meuble pivoté de 90°");
  }
  handleDeleteSelected() {
    const { wallIds: e, openingIds: t, roomIds: i, bindingIds: s, furnitureIds: o = [] } = this.selectedElements, r = e.length + t.length + i.length + s.length + o.length;
    if (r === 0) return;
    this.pushUndoSnapshot();
    const n = this.project.walls.filter((d) => !e.includes(d.id)), a = this.project.openings.filter(
      (d) => !t.includes(d.id) && !e.includes(d.wallId)
    ), l = this.project.rooms.filter((d) => !i.includes(d.id)), h = this.project.bindings.filter((d) => !s.includes(d.id)), c = (this.project.furniture || []).filter((d) => !o.includes(d.id));
    this.project = {
      ...this.project,
      walls: n,
      openings: a,
      rooms: l,
      bindings: h,
      furniture: c
    }, this.selectedElements = { wallIds: [], openingIds: [], roomIds: [], bindingIds: [], furnitureIds: [] }, this.showToast(`🗑️ ${r} élément${r > 1 ? "s" : ""} supprimé${r > 1 ? "s" : ""} !`);
  }
  clearSelection() {
    this.selectedElements = { wallIds: [], openingIds: [], roomIds: [], bindingIds: [], furnitureIds: [] };
  }
  getLevelLabel(e) {
    switch (e) {
      case "sous-sol":
        return "Sous-Sol";
      case "rdc":
        return "RDC";
      case "etage1":
        return "1er Étage";
      case "etage2":
        return "2ème Étage";
      case "etage3":
        return "3ème Étage";
      case "jardin":
        return "Jardin";
      default:
        return e.toUpperCase();
    }
  }
  toggleDropdown(e, t) {
    t && t.stopPropagation(), this.activeDropdown = this.activeDropdown === e ? null : e;
  }
  getActiveTypology() {
    if (this.selectedTypologyTab)
      return this.selectedTypologyTab;
    if (this.selectedElements.bindingIds.length > 0) {
      const e = this.project.bindings.find((t) => t.id === this.selectedElements.bindingIds[0]);
      if (e) {
        const t = e.entityId.split(".")[0];
        if (It[t]) return t;
      }
    }
    return "light";
  }
  updateSelectedBindingIcon(e, t) {
    if (!this.selectedElements.bindingIds || this.selectedElements.bindingIds.length === 0) return;
    this.pushUndoSnapshot();
    const i = this.selectedElements.bindingIds[0], s = this.project.bindings.map((o) => o.id === i ? { ...o, icon: e, mdiIcon: t } : o);
    this.project = { ...this.project, bindings: s }, this.showToast(`✨ Icône ${e} appliquée !`);
  }
  getSelectedSummary() {
    const e = [];
    if (this.selectedElements.wallIds.length > 0 && e.push(`${this.selectedElements.wallIds.length} mur${this.selectedElements.wallIds.length > 1 ? "s" : ""}`), this.selectedElements.openingIds.length > 0 && e.push(`${this.selectedElements.openingIds.length} ouvrant${this.selectedElements.openingIds.length > 1 ? "s" : ""}`), this.selectedElements.roomIds.length > 0 && e.push(`${this.selectedElements.roomIds.length} pièce${this.selectedElements.roomIds.length > 1 ? "s" : ""}`), this.selectedElements.bindingIds.length > 0)
      if (this.selectedElements.bindingIds.length === 1) {
        const t = this.project.bindings.find((i) => i.id === this.selectedElements.bindingIds[0]);
        e.push(t ? t.customName || t.entityId.split(".")[1] || t.entityId : "1 entité");
      } else
        e.push(`${this.selectedElements.bindingIds.length} entités`);
    return this.selectedElements.furnitureIds && this.selectedElements.furnitureIds.length > 0 && e.push(`${this.selectedElements.furnitureIds.length} meuble${this.selectedElements.furnitureIds.length > 1 ? "s" : ""}`), e.join(", ");
  }
  handleKeyDown(e) {
    var i, s, o, r;
    const t = (s = (i = e.target) == null ? void 0 : i.tagName) == null ? void 0 : s.toLowerCase();
    t === "input" || t === "textarea" || (o = e.target) != null && o.isContentEditable || ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "z" && !e.shiftKey ? (e.preventDefault(), this.handleUndo()) : (e.ctrlKey || e.metaKey) && (e.key.toLowerCase() === "y" || e.key.toLowerCase() === "z" && e.shiftKey) ? (e.preventDefault(), this.handleRedo()) : e.key === "Delete" || e.key === "Backspace" ? this.selectedElements.wallIds.length + this.selectedElements.openingIds.length + this.selectedElements.roomIds.length + this.selectedElements.bindingIds.length + (((r = this.selectedElements.furnitureIds) == null ? void 0 : r.length) || 0) > 0 && (e.preventDefault(), this.handleDeleteSelected()) : e.key === "Escape" ? (this.activeDropdown && (this.activeDropdown = null), this.clearSelection()) : e.key.toLowerCase() === "r" ? this.selectedElements.furnitureIds && this.selectedElements.furnitureIds.length > 0 && (e.preventDefault(), this.rotateSelectedFurniture()) : e.key.toLowerCase() === "v" && (this.activeTool = "select"));
  }
  openSaveModal() {
    this.saveLoadModalTab = "save", this.isSaveLoadModalOpen = !0, this.activeDropdown = null;
  }
  openLoadModal() {
    this.saveLoadModalTab = "load", this.isSaveLoadModalOpen = !0, this.activeDropdown = null;
  }
  saveProject() {
    this.openSaveModal();
  }
  async handleSaveConfirmed(e) {
    const { name: t, category: i } = e.detail, s = ["sous-sol", "rdc", "etage1", "etage2", "etage3", "jardin"];
    let o = this.project.id;
    if (s.includes(i) && (!o || s.includes(o)) ? o = i : o || (o = "plan_" + Date.now()), this.project = {
      ...this.project,
      id: o,
      name: t,
      category: i,
      updated_at: (/* @__PURE__ */ new Date()).toISOString()
    }, s.includes(i) && (this.activeLevel = i), this.levelProjects[this.activeLevel] = { ...this.project }, this.hass && this.hass.callWS)
      try {
        await this.hass.callWS({
          type: "home_architect/save_project",
          project: this.project
        }), this.showToast(`💾 Plan "${t}" (${i}) sauvegardé avec succès dans Home Assistant !`);
      } catch (r) {
        console.error("Erreur sauvegarde HA:", r), localStorage.setItem(`home_architect_${this.project.id}`, JSON.stringify(this.project)), this.showToast(`💾 Plan "${t}" sauvegardé localement (Mode hors-ligne).`);
      }
    else
      localStorage.setItem(`home_architect_${this.project.id}`, JSON.stringify(this.project)), this.showToast(`💾 Plan "${t}" sauvegardé localement !`);
    this.isSaveLoadModalOpen = !1;
  }
  handleLoadProject(e) {
    const t = e.detail.project;
    if (!t) return;
    this.pushUndoSnapshot(), this.project = { ...t };
    const i = t.category || t.id;
    i && ["sous-sol", "rdc", "etage1", "etage2", "etage3", "jardin"].includes(i) && (this.activeLevel = i), this.levelProjects[this.activeLevel] = { ...this.project }, this.undoStack = [], this.redoStack = [], this.clearSelection(), this.isSaveLoadModalOpen = !1, this.showToast(`📂 Plan "${t.name || t.id}" chargé avec succès !`);
  }
  render() {
    var t, i;
    const e = !!((t = this.project.background) != null && t.imageUrl);
    return x`
      <header class="top-bar">
        <div class="brand">
          <span class="brand-icon">📐</span>
          <span>Home Architect</span>
          <span class="brand-tag">Studio</span>
        </div>

        <!-- 3 Menus Déroulants Principaux : Fichier, Plan, Pièce -->
        <div style="display: flex; align-items: center; gap: 8px;">
          <!-- 1. Menu Fichier (Ouvrir, Sauvegarder, Importer, Exporter) -->
          <div class="dropdown-menu-wrapper">
            <button class="btn-dropdown-trigger ${this.activeDropdown === "file" ? "active" : ""}" @click=${(s) => this.toggleDropdown("file", s)}>
              <span>📁</span>
              <span>Fichier</span>
              <span class="chevron">▾</span>
            </button>
            ${this.activeDropdown === "file" ? x`
              <div class="dropdown-menu-popup">
                <button class="dropdown-item" @click=${() => this.openLoadModal()}>
                  <span>📂</span>
                  <span>Ouvrir / Recharger un plan...</span>
                </button>
                <button class="dropdown-item" @click=${() => this.openSaveModal()}>
                  <span>💾</span>
                  <span>Sauvegarder le plan...</span>
                </button>
                <div class="dropdown-divider"></div>
                <button class="dropdown-item" @click=${() => {
      this.isImportModalOpen = !0, this.activeDropdown = null;
    }}>
                  <span>📥</span>
                  <span>Importer un plan...</span>
                </button>
                <button class="dropdown-item" @click=${() => {
      this.isExportModalOpen = !0, this.activeDropdown = null;
    }}>
                  <span>📤</span>
                  <span>Exporter Lovelace...</span>
                </button>
              </div>
            ` : null}
          </div>

          <!-- 2. Menu Plan (Demande 4: Mettre à l'échelle, Vue 2D/3D, Assistant Pièce, Cotes, etc.) -->
          <div class="dropdown-menu-wrapper">
            <button class="btn-dropdown-trigger ${this.activeDropdown === "plan" ? "active" : ""}" @click=${(s) => this.toggleDropdown("plan", s)}>
              <span>📐</span>
              <span>Plan</span>
              <span class="chevron">▾</span>
            </button>
            ${this.activeDropdown === "plan" ? x`
              <div class="dropdown-menu-popup" style="min-width: 250px;">
                <button class="dropdown-item ${this.activeTool === "rescale" ? "active" : ""}" @click=${() => {
      this.activeTool = "rescale", this.activeDropdown = null;
    }}>
                  <span>📐</span>
                  <span>Mettre à l'échelle (S)</span>
                  ${this.activeTool === "rescale" ? x`<span class="dropdown-item-check">✓</span>` : null}
                </button>
                <button class="dropdown-item ${this.is3DMode ? "active" : ""}" @click=${() => {
      this.is3DMode = !this.is3DMode, this.activeDropdown = null;
    }}>
                  <span>${this.is3DMode ? "🧊" : "📐"}</span>
                  <span>${this.is3DMode ? "Vue 3D (Active)" : "Vue 2D / 3D"}</span>
                  ${this.is3DMode ? x`<span class="dropdown-item-check">✓</span>` : null}
                </button>
                <button class="dropdown-item" @click=${() => {
      this.isWizardOpen = !0, this.activeDropdown = null;
    }}>
                  <span>🪄</span>
                  <span>Assistant Pièce</span>
                </button>
                <div class="dropdown-divider"></div>
                <button class="dropdown-item ${this.showDimensions ? "active" : ""}" @click=${() => {
      this.showDimensions = !this.showDimensions;
    }}>
                  <span>📏</span>
                  <span>Cotes dynamiques</span>
                  ${this.showDimensions ? x`<span class="dropdown-item-check">✓</span>` : null}
                </button>
                <button class="dropdown-item ${this.showThermalHeatmap ? "active" : ""}" @click=${() => {
      this.showThermalHeatmap = !this.showThermalHeatmap;
    }}>
                  <span>🌡️</span>
                  <span>Carte thermique</span>
                  ${this.showThermalHeatmap ? x`<span class="dropdown-item-check">✓</span>` : null}
                </button>
                <button class="dropdown-item ${this.showGhostLevel ? "active" : ""}" @click=${() => {
      this.showGhostLevel = !this.showGhostLevel;
    }}>
                  <span>👁️</span>
                  <span>Filigrane niveau inf.</span>
                  ${this.showGhostLevel ? x`<span class="dropdown-item-check">✓</span>` : null}
                </button>
              </div>
            ` : null}
          </div>

          <!-- 3. Menu Pièce (Sous-Sol, RDC, 1er Étage, 2ème Étage, 3ème Étage, Jardin) -->
          <div class="dropdown-menu-wrapper">
            <button class="btn-dropdown-trigger ${this.activeDropdown === "level" ? "active" : ""}" @click=${(s) => this.toggleDropdown("level", s)}>
              <span>🏢</span>
              <span>Pièce : <strong>${this.getLevelLabel(this.activeLevel)}</strong></span>
              <span class="chevron">▾</span>
            </button>
            ${this.activeDropdown === "level" ? x`
              <div class="dropdown-menu-popup">
                <button class="dropdown-item ${this.activeLevel === "sous-sol" ? "active" : ""}" @click=${() => {
      this.handleLevelSwitch("sous-sol"), this.activeDropdown = null;
    }}>
                  <span>🏠</span>
                  <span>Sous-Sol</span>
                  ${this.activeLevel === "sous-sol" ? x`<span class="dropdown-item-check">✓</span>` : null}
                </button>
                <button class="dropdown-item ${this.activeLevel === "rdc" ? "active" : ""}" @click=${() => {
      this.handleLevelSwitch("rdc"), this.activeDropdown = null;
    }}>
                  <span>🏠</span>
                  <span>RDC (Rez-de-Chaussée)</span>
                  ${this.activeLevel === "rdc" ? x`<span class="dropdown-item-check">✓</span>` : null}
                </button>
                <button class="dropdown-item ${this.activeLevel === "etage1" ? "active" : ""}" @click=${() => {
      this.handleLevelSwitch("etage1"), this.activeDropdown = null;
    }}>
                  <span>🏠</span>
                  <span>1er Étage</span>
                  ${this.activeLevel === "etage1" ? x`<span class="dropdown-item-check">✓</span>` : null}
                </button>
                <button class="dropdown-item ${this.activeLevel === "etage2" ? "active" : ""}" @click=${() => {
      this.handleLevelSwitch("etage2"), this.activeDropdown = null;
    }}>
                  <span>🏠</span>
                  <span>2ème Étage</span>
                  ${this.activeLevel === "etage2" ? x`<span class="dropdown-item-check">✓</span>` : null}
                </button>
                <button class="dropdown-item ${this.activeLevel === "etage3" ? "active" : ""}" @click=${() => {
      this.handleLevelSwitch("etage3"), this.activeDropdown = null;
    }}>
                  <span>🏠</span>
                  <span>3ème Étage</span>
                  ${this.activeLevel === "etage3" ? x`<span class="dropdown-item-check">✓</span>` : null}
                </button>
                <button class="dropdown-item ${this.activeLevel === "jardin" ? "active" : ""}" @click=${() => {
      this.handleLevelSwitch("jardin"), this.activeDropdown = null;
    }}>
                  <span>🌳</span>
                  <span>Jardin</span>
                  ${this.activeLevel === "jardin" ? x`<span class="dropdown-item-check">✓</span>` : null}
                </button>
              </div>
            ` : null}
          </div>
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

          <!-- Épaisseur mur contextuelle -->
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

          <!-- Largeur ouvrant contextuelle -->
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
              <select @change=${(s) => this.handleDefaultCeilingChange(parseFloat(s.target.value))}>
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
          ${e ? x`
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

          <!-- Volet Entités HA -->
          <button 
            class="btn-drawer ${this.isDrawerCollapsed ? "" : "active"}" 
            @click=${() => this.isDrawerCollapsed = !this.isDrawerCollapsed}
            title="Afficher / Masquer le volet des entités"
          >
            ⚡ Entités HA (${this.project.bindings.length})
          </button>

          <div class="scale-indicator" title="Échelle : pixels par mètre">
            1 m = ${this.project.pixelsPerMeter} px
          </div>

          <!-- Sauvegarde Directe -->
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
            .showDimensions=${this.showDimensions}
            .showThermalHeatmap=${this.showThermalHeatmap}
            .ghostProject=${this.getGhostProject()}
            @selection-changed=${(s) => {
      if (this.selectedElements = s.detail.selectedElements, this.selectedElements.bindingIds.length > 0) {
        const o = this.project.bindings.find((r) => r.id === this.selectedElements.bindingIds[0]);
        if (o) {
          const r = o.entityId.split(".")[0];
          It[r] && (this.selectedTypologyTab = r);
        }
        this.isIconPickerOpen = !0;
      }
    }}
            @request-delete-selected=${this.handleDeleteSelected}
            @toggle-3d=${(s) => this.is3DMode = s.detail.is3DMode}
            @room-selected=${(s) => this.selectedRoomForEdit = s.detail.room}
            @project-changed=${this.handleProjectChanged}
            @request-calibration=${this.handleRequestCalibration}
            @request-rescale=${this.handleRequestRescale}
            @background-image-loaded=${(s) => this.loadBackgroundImage(s.detail.dataUrl, "🖼️ Image de plan glissée-déposée !")}
          ></home-architect-canvas>

          <!-- Floating HUD de sélection multi-éléments repositionné en bas -->
          ${(() => {
      var r, n;
      if (!(this.selectedElements.wallIds.length + this.selectedElements.openingIds.length + this.selectedElements.roomIds.length + this.selectedElements.bindingIds.length + (((r = this.selectedElements.furnitureIds) == null ? void 0 : r.length) || 0) > 0)) return null;
      const o = this.selectedElements.bindingIds.length > 0 ? this.project.bindings.find((a) => a.id === this.selectedElements.bindingIds[0]) : null;
      return x`
              <div class="selection-hud">
                <div class="selection-hud-main">
                  <span class="selection-info">
                    <span>🎯</span>
                    <span>${this.getSelectedSummary()}</span>
                  </span>

                  ${this.selectedElements.wallIds.length > 0 ? x`
                    <div class="hud-options-group">
                      <span class="hud-label">Épaisseur :</span>
                      <button class="hud-opt-btn ${this.currentThickness === 0.1 ? "active" : ""}" @click=${() => this.updateSelectedWallsThickness(0.1)} title="Cloison 10 cm">Fin 10cm</button>
                      <button class="hud-opt-btn ${this.currentThickness === 0.2 ? "active" : ""}" @click=${() => this.updateSelectedWallsThickness(0.2)} title="Standard 20 cm">Moyen 20cm</button>
                      <button class="hud-opt-btn ${this.currentThickness === 0.3 ? "active" : ""}" @click=${() => this.updateSelectedWallsThickness(0.3)} title="Porteur 30 cm">Gros 30cm</button>
                    </div>
                  ` : null}

                  ${this.selectedElements.openingIds.some((a) => {
        var l;
        return ((l = this.project.openings.find((h) => h.id === a)) == null ? void 0 : l.type) === "door";
      }) ? x`
                    <div class="hud-options-group">
                      <span class="hud-label">Porte :</span>
                      <button class="hud-opt-btn ${!this.doorFlipSide && this.doorFlipDirection ? "active" : ""}" @click=${() => this.updateSelectedDoorConfig(!1, !0)} title="Ouverture Droite Intérieure (Poussant Droit)">Droite Int.</button>
                      <button class="hud-opt-btn ${!this.doorFlipSide && !this.doorFlipDirection ? "active" : ""}" @click=${() => this.updateSelectedDoorConfig(!1, !1)} title="Ouverture Gauche Intérieure (Poussant Gauche)">Gauche Int.</button>
                      <button class="hud-opt-btn ${this.doorFlipSide && !this.doorFlipDirection ? "active" : ""}" @click=${() => this.updateSelectedDoorConfig(!0, !1)} title="Ouverture Gauche Extérieure (Tirant Gauche)">Gauche Ext.</button>
                      <button class="hud-opt-btn ${this.doorFlipSide && this.doorFlipDirection ? "active" : ""}" @click=${() => this.updateSelectedDoorConfig(!0, !0)} title="Ouverture Droite Extérieure (Tirant Droit)">Droite Ext.</button>
                    </div>
                  ` : null}

                  ${this.selectedElements.openingIds.some((a) => {
        const l = this.project.openings.find((h) => h.id === a);
        return l && (l.type === "window" || l.type === "french_window");
      }) ? x`
                    <div class="hud-options-group">
                      <span class="hud-label">Fenêtre :</span>
                      <button class="hud-opt-btn ${this.windowSashCount === 1 ? "active" : ""}" @click=${() => this.updateSelectedWindowConfig("window", 1, 0.9)} title="Fenêtre 1 ouvrant (90 cm)">1 Ouvrant</button>
                      <button class="hud-opt-btn ${this.windowSashCount === 2 ? "active" : ""}" @click=${() => this.updateSelectedWindowConfig("window", 2, 1.4)} title="Fenêtre 2 battants (1.40 m)">2 Battants</button>
                      <button class="hud-opt-btn" @click=${() => this.updateSelectedWindowConfig("french_window", 2, 2)} title="Baie vitrée coulissante (2.00 m)">Baie vitrée</button>
                    </div>
                  ` : null}

                  ${(((n = this.selectedElements.furnitureIds) == null ? void 0 : n.length) || 0) > 0 ? x`
                    <div class="hud-options-group">
                      <span class="hud-label">Meuble :</span>
                      <button class="hud-opt-btn active" @click=${this.rotateSelectedFurniture} title="Pivoter les meubles de 90° (Touche R)">🔄 Pivoter 90° (R)</button>
                    </div>
                  ` : null}

                  ${o ? x`
                    <div class="hud-options-group">
                      <button 
                        class="hud-opt-btn ${this.isIconPickerOpen ? "active" : ""}" 
                        @click=${() => this.isIconPickerOpen = !this.isIconPickerOpen}
                        title="Choisir l'icône pour le plan et la card Lovelace"
                      >
                        <span style="font-size: 1.05rem;">${o.icon || "🎨"}</span>
                        <span>Choisir l'icône ${this.isIconPickerOpen ? "▴" : "▾"}</span>
                      </button>
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

                <!-- Onglet / Palette Choisir l'icône pour l'entité sélectionnée -->
                ${o && this.isIconPickerOpen ? x`
                  <div class="hud-icon-picker-panel">
                    <div class="icon-category-tabs">
                      ${Object.entries(It).map(([a, l]) => x`
                        <button 
                          class="icon-category-tab ${this.getActiveTypology() === a ? "active" : ""}"
                          @click=${() => this.selectedTypologyTab = a}
                        >
                          ${l.tabLabel}
                        </button>
                      `)}
                    </div>

                    <div class="icon-grid">
                      ${(It[this.getActiveTypology()] || It.light).icons.map((a) => x`
                        <button 
                          class="icon-item-btn ${o.icon === a.icon ? "active" : ""}"
                          @click=${() => this.updateSelectedBindingIcon(a.icon, a.mdi)}
                          title="${a.label} (${a.mdi})"
                        >
                          <span class="icon-item-emoji">${a.icon}</span>
                          <span>${a.label}</span>
                        </button>
                      `)}
                    </div>

                    <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px; font-size: 0.78rem; color: #94a3b8; border-top: 1px solid rgba(255, 255, 255, 0.08); padding-top: 4px;">
                      <span>Icône active : <strong style="color: #38bdf8;">${o.icon || "Défaut"}</strong> (${o.mdiIcon || "Automatique"})</span>
                      <div style="display: flex; align-items: center; gap: 4px;">
                        <span>Saisie libre :</span>
                        <input 
                          type="text" 
                          style="width: 55px; background: rgba(30, 41, 59, 0.9); border: 1px solid rgba(255, 255, 255, 0.2); border-radius: 6px; color: #fff; padding: 2px 4px; font-size: 0.85rem; text-align: center;" 
                          placeholder="Emoji"
                          maxlength="4"
                          @keydown=${(a) => {
        if (a.key === "Enter") {
          const l = a.target.value.trim();
          l && this.updateSelectedBindingIcon(l);
        }
      }}
                          @change=${(a) => {
        const l = a.target.value.trim();
        l && this.updateSelectedBindingIcon(l);
      }}
                        />
                      </div>
                    </div>
                  </div>
                ` : null}
              </div>
            `;
    })()}

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

      <!-- Modal Exporter vers Lovelace -->
      ${this.isExportModalOpen ? x`
        <home-architect-export-modal
          .project=${this.project}
          .hass=${this.hass}
          @close=${() => this.isExportModalOpen = !1}
        ></home-architect-export-modal>
      ` : null}

      <!-- Modal Sauvegarder & Recharger un Plan -->
      ${this.isSaveLoadModalOpen ? x`
        <home-architect-save-load-modal
          .hass=${this.hass}
          .project=${this.project}
          .initialTab=${this.saveLoadModalTab}
          @save-confirmed=${this.handleSaveConfirmed}
          @load-project=${this.handleLoadProject}
          @close=${() => this.isSaveLoadModalOpen = !1}
        ></home-architect-save-load-modal>
      ` : null}
    `;
  }
};
E.styles = K`
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
      position: relative;
      z-index: 85;
      flex-shrink: 0;
      overflow: visible;
      box-sizing: border-box;
      gap: 10px;
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

    button.btn-toggle-option {
      background: rgba(15, 23, 42, 0.6);
      color: #94a3b8;
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 8px;
      padding: 6px 11px;
      font-size: 0.83rem;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 5px;
      transition: all 0.2s ease;
    }

    button.btn-toggle-option:hover {
      background: rgba(51, 65, 85, 0.8);
      color: #f1f5f9;
      border-color: #38bdf8;
    }

    button.btn-toggle-option.active {
      background: rgba(56, 189, 248, 0.18);
      color: #38bdf8;
      border-color: #38bdf8;
      box-shadow: 0 0 10px rgba(56, 189, 248, 0.3);
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
      z-index: 1;
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
      bottom: 24px;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(15, 23, 42, 0.96);
      backdrop-filter: blur(16px);
      border: 1.5px solid #06b6d4;
      border-radius: 14px;
      padding: 8px 14px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
      box-shadow: 0 12px 36px rgba(0, 0, 0, 0.65), 0 0 20px rgba(6, 182, 212, 0.35);
      z-index: 60;
      animation: popSelectionBottom 0.2s ease-out;
      max-width: 92vw;
      box-sizing: border-box;
    }

    @keyframes popSelectionBottom {
      from { opacity: 0; transform: translate(-50%, 15px); }
      to { opacity: 1; transform: translate(-50%, 0); }
    }

    .selection-hud-main {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
      justify-content: center;
      white-space: nowrap;
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
      display: flex;
      align-items: center;
      gap: 5px;
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

    /* Panneau Choisir l'icône dans le HUD */
    .hud-icon-picker-panel {
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding-top: 8px;
      border-top: 1px solid rgba(255, 255, 255, 0.12);
      width: 100%;
      max-width: 650px;
      box-sizing: border-box;
    }

    .icon-category-tabs {
      display: flex;
      align-items: center;
      gap: 6px;
      overflow-x: auto;
      scrollbar-width: none;
      padding-bottom: 2px;
      max-width: 100%;
    }

    .icon-category-tabs::-webkit-scrollbar {
      display: none;
    }

    .icon-category-tab {
      background: rgba(30, 41, 59, 0.7);
      border: 1px solid rgba(255, 255, 255, 0.1);
      color: #94a3b8;
      border-radius: 6px;
      padding: 3px 8px;
      font-size: 0.75rem;
      font-weight: 600;
      cursor: pointer;
      white-space: nowrap;
      transition: all 0.15s ease;
    }

    .icon-category-tab:hover {
      background: rgba(56, 189, 248, 0.15);
      color: #f1f5f9;
      border-color: #38bdf8;
    }

    .icon-category-tab.active {
      background: #0284c7;
      color: #ffffff;
      border-color: #38bdf8;
    }

    .icon-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      max-height: 140px;
      overflow-y: auto;
      padding: 2px;
      scrollbar-width: thin;
    }

    .icon-item-btn {
      display: flex;
      align-items: center;
      gap: 6px;
      background: rgba(30, 41, 59, 0.85);
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 8px;
      padding: 4px 8px;
      color: #e2e8f0;
      font-size: 0.78rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.15s ease;
      white-space: nowrap;
    }

    .icon-item-btn:hover {
      background: rgba(56, 189, 248, 0.2);
      border-color: #38bdf8;
      color: #ffffff;
      transform: translateY(-1px);
    }

    .icon-item-btn.active {
      background: rgba(6, 182, 212, 0.3);
      border-color: #06b6d4;
      color: #ffffff;
      box-shadow: 0 0 10px rgba(6, 182, 212, 0.4);
      font-weight: 700;
    }

    .icon-item-emoji {
      font-size: 1.15rem;
      line-height: 1;
    }

    /* Menus déroulants barre supérieure */
    .dropdown-menu-wrapper {
      position: relative;
      display: inline-block;
      z-index: 100;
    }

    .btn-dropdown-trigger {
      background: rgba(15, 23, 42, 0.7);
      color: #f1f5f9;
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 8px;
      padding: 6px 12px;
      font-size: 0.85rem;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
      transition: all 0.2s ease;
      user-select: none;
      white-space: nowrap;
    }

    .btn-dropdown-trigger:hover, .btn-dropdown-trigger.active {
      background: rgba(56, 189, 248, 0.2);
      border-color: #38bdf8;
      color: #ffffff;
      box-shadow: 0 0 12px rgba(56, 189, 248, 0.35);
    }

    .btn-dropdown-trigger .chevron {
      font-size: 0.75rem;
      transition: transform 0.2s ease;
      color: #94a3b8;
    }

    .btn-dropdown-trigger.active .chevron {
      transform: rotate(180deg);
      color: #38bdf8;
    }

    .dropdown-menu-popup {
      position: absolute;
      top: calc(100% + 8px);
      left: 0;
      background: rgba(15, 23, 42, 0.98);
      backdrop-filter: blur(16px);
      border: 1.5px solid rgba(56, 189, 248, 0.35);
      border-radius: 12px;
      padding: 6px;
      min-width: 220px;
      box-shadow: 0 12px 36px rgba(0, 0, 0, 0.65), 0 0 18px rgba(56, 189, 248, 0.25);
      z-index: 1000;
      display: flex;
      flex-direction: column;
      gap: 3px;
      animation: popDropdown 0.15s ease-out;
    }

    @keyframes popDropdown {
      from { opacity: 0; transform: translateY(-6px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .dropdown-item {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 8px 12px;
      border-radius: 8px;
      background: transparent;
      border: none;
      color: #e2e8f0;
      font-size: 0.85rem;
      font-weight: 500;
      cursor: pointer;
      text-align: left;
      width: 100%;
      box-sizing: border-box;
      transition: all 0.15s ease;
      white-space: nowrap;
    }

    .dropdown-item:hover {
      background: rgba(56, 189, 248, 0.15);
      color: #38bdf8;
    }

    .dropdown-item.active {
      background: rgba(56, 189, 248, 0.25);
      color: #38bdf8;
      font-weight: 700;
    }

    .dropdown-divider {
      height: 1px;
      background: rgba(255, 255, 255, 0.1);
      margin: 4px 6px;
    }

    .dropdown-item-check {
      margin-left: auto;
      font-size: 0.85rem;
      color: #38bdf8;
      font-weight: 700;
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
A([
  D({ type: Object })
], E.prototype, "hass", 2);
A([
  D({ type: Boolean })
], E.prototype, "narrow", 2);
A([
  m()
], E.prototype, "activeTool", 2);
A([
  m()
], E.prototype, "currentThickness", 2);
A([
  m()
], E.prototype, "currentOpeningWidth", 2);
A([
  m()
], E.prototype, "doorFlipSide", 2);
A([
  m()
], E.prototype, "doorFlipDirection", 2);
A([
  m()
], E.prototype, "windowSashCount", 2);
A([
  m()
], E.prototype, "activeLevel", 2);
A([
  m()
], E.prototype, "showDimensions", 2);
A([
  m()
], E.prototype, "showThermalHeatmap", 2);
A([
  m()
], E.prototype, "showGhostLevel", 2);
A([
  m()
], E.prototype, "levelProjects", 2);
A([
  m()
], E.prototype, "is3DMode", 2);
A([
  m()
], E.prototype, "isDrawerCollapsed", 2);
A([
  m()
], E.prototype, "isWizardOpen", 2);
A([
  m()
], E.prototype, "isImportModalOpen", 2);
A([
  m()
], E.prototype, "isExportModalOpen", 2);
A([
  m()
], E.prototype, "isSaveLoadModalOpen", 2);
A([
  m()
], E.prototype, "saveLoadModalTab", 2);
A([
  m()
], E.prototype, "isCalibrateModalOpen", 2);
A([
  m()
], E.prototype, "calibrationData", 2);
A([
  m()
], E.prototype, "isRescaleModalOpen", 2);
A([
  m()
], E.prototype, "rescaleMeasuredMeters", 2);
A([
  m()
], E.prototype, "selectedRoomForEdit", 2);
A([
  m()
], E.prototype, "selectedElements", 2);
A([
  m()
], E.prototype, "activeDropdown", 2);
A([
  m()
], E.prototype, "selectedTypologyTab", 2);
A([
  m()
], E.prototype, "isIconPickerOpen", 2);
A([
  m()
], E.prototype, "undoStack", 2);
A([
  m()
], E.prototype, "redoStack", 2);
A([
  m()
], E.prototype, "project", 2);
A([
  m()
], E.prototype, "toastMessage", 2);
E = A([
  J("home-architect-panel")
], E);
var bi = Object.defineProperty, mi = Object.getOwnPropertyDescriptor, Ot = (e, t, i, s) => {
  for (var o = s > 1 ? void 0 : s ? mi(t, i) : t, r = e.length - 1, n; r >= 0; r--)
    (n = e[r]) && (o = (s ? n(t, i, o) : n(o)) || o);
  return s && o && bi(t, i, o), o;
};
let xt = class extends H {
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
    var i, s;
    const e = ((i = this.config) == null ? void 0 : i.project_id) || "rdc";
    if (this.hass && this.hass.callWS)
      try {
        const o = await this.hass.callWS({ type: "home_architect/get_projects" }), r = (s = o == null ? void 0 : o.projects) == null ? void 0 : s.find((n) => n.id === e);
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
    var t, i;
    const e = ((t = this.config) == null ? void 0 : t.show_header) !== !1;
    return x`
      ${e ? x`
        <div class="card-header">
          <div class="card-title">${((i = this.config) == null ? void 0 : i.title) || this.project.name || "Home Architect"}</div>
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
xt.styles = K`
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
Ot([
  D({ type: Object })
], xt.prototype, "hass", 2);
Ot([
  m()
], xt.prototype, "config", 2);
Ot([
  m()
], xt.prototype, "project", 2);
Ot([
  m()
], xt.prototype, "is3DMode", 2);
xt = Ot([
  J("home-architect-card")
], xt);
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
