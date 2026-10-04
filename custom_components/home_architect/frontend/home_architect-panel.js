/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Re = globalThis, Je = Re.ShadowRoot && (Re.ShadyCSS === void 0 || Re.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Qe = Symbol(), it = /* @__PURE__ */ new WeakMap();
let xt = class {
  constructor(e, i, s) {
    if (this._$cssResult$ = !0, s !== Qe) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = i;
  }
  get styleSheet() {
    let e = this.o;
    const i = this.t;
    if (Je && e === void 0) {
      const s = i !== void 0 && i.length === 1;
      s && (e = it.get(i)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), s && it.set(i, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const St = (t) => new xt(typeof t == "string" ? t : t + "", void 0, Qe), J = (t, ...e) => {
  const i = t.length === 1 ? t[0] : e.reduce((s, o, r) => s + ((n) => {
    if (n._$cssResult$ === !0) return n.cssText;
    if (typeof n == "number") return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + t[r + 1], t[0]);
  return new xt(i, t, Qe);
}, Ct = (t, e) => {
  if (Je) t.adoptedStyleSheets = e.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of e) {
    const s = document.createElement("style"), o = Re.litNonce;
    o !== void 0 && s.setAttribute("nonce", o), s.textContent = i.cssText, t.appendChild(s);
  }
}, st = Je ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let i = "";
  for (const s of e.cssRules) i += s.cssText;
  return St(i);
})(t) : t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Mt, defineProperty: Pt, getOwnPropertyDescriptor: It, getOwnPropertyNames: Tt, getOwnPropertySymbols: _t, getPrototypeOf: jt } = Object, he = globalThis, ot = he.trustedTypes, Dt = ot ? ot.emptyScript : "", Ge = he.reactiveElementPolyfillSupport, _e = (t, e) => t, We = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? Dt : null;
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
} }, Ze = (t, e) => !Mt(t, e), rt = { attribute: !0, type: String, converter: We, reflect: !1, useDefault: !1, hasChanged: Ze };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), he.litPropertyMetadata ?? (he.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let $e = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, i = rt) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(e, i), !i.noAccessor) {
      const s = Symbol(), o = this.getPropertyDescriptor(e, s, i);
      o !== void 0 && Pt(this.prototype, e, o);
    }
  }
  static getPropertyDescriptor(e, i, s) {
    const { get: o, set: r } = It(this.prototype, e) ?? { get() {
      return this[i];
    }, set(n) {
      this[i] = n;
    } };
    return { get: o, set(n) {
      const a = o == null ? void 0 : o.call(this);
      r == null || r.call(this, n), this.requestUpdate(e, a, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? rt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(_e("elementProperties"))) return;
    const e = jt(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(_e("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(_e("properties"))) {
      const i = this.properties, s = [...Tt(i), ..._t(i)];
      for (const o of s) this.createProperty(o, i[o]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const i = litPropertyMetadata.get(e);
      if (i !== void 0) for (const [s, o] of i) this.elementProperties.set(s, o);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [i, s] of this.elementProperties) {
      const o = this._$Eu(i, s);
      o !== void 0 && this._$Eh.set(o, i);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const i = [];
    if (Array.isArray(e)) {
      const s = new Set(e.flat(1 / 0).reverse());
      for (const o of s) i.unshift(st(o));
    } else e !== void 0 && i.push(st(e));
    return i;
  }
  static _$Eu(e, i) {
    const s = i.attribute;
    return s === !1 ? void 0 : typeof s == "string" ? s : typeof e == "string" ? e.toLowerCase() : void 0;
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
    for (const s of i.keys()) this.hasOwnProperty(s) && (e.set(s, this[s]), delete this[s]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Ct(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    var e;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (e = this._$EO) == null || e.forEach((i) => {
      var s;
      return (s = i.hostConnected) == null ? void 0 : s.call(i);
    });
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    var e;
    (e = this._$EO) == null || e.forEach((i) => {
      var s;
      return (s = i.hostDisconnected) == null ? void 0 : s.call(i);
    });
  }
  attributeChangedCallback(e, i, s) {
    this._$AK(e, s);
  }
  _$ET(e, i) {
    var r;
    const s = this.constructor.elementProperties.get(e), o = this.constructor._$Eu(e, s);
    if (o !== void 0 && s.reflect === !0) {
      const n = (((r = s.converter) == null ? void 0 : r.toAttribute) !== void 0 ? s.converter : We).toAttribute(i, s.type);
      this._$Em = e, n == null ? this.removeAttribute(o) : this.setAttribute(o, n), this._$Em = null;
    }
  }
  _$AK(e, i) {
    var r, n;
    const s = this.constructor, o = s._$Eh.get(e);
    if (o !== void 0 && this._$Em !== o) {
      const a = s.getPropertyOptions(o), l = typeof a.converter == "function" ? { fromAttribute: a.converter } : ((r = a.converter) == null ? void 0 : r.fromAttribute) !== void 0 ? a.converter : We;
      this._$Em = o;
      const u = l.fromAttribute(i, a.type);
      this[o] = u ?? ((n = this._$Ej) == null ? void 0 : n.get(o)) ?? u, this._$Em = null;
    }
  }
  requestUpdate(e, i, s, o = !1, r) {
    var n;
    if (e !== void 0) {
      const a = this.constructor;
      if (o === !1 && (r = this[e]), s ?? (s = a.getPropertyOptions(e)), !((s.hasChanged ?? Ze)(r, i) || s.useDefault && s.reflect && r === ((n = this._$Ej) == null ? void 0 : n.get(e)) && !this.hasAttribute(a._$Eu(e, s)))) return;
      this.C(e, i, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, i, { useDefault: s, reflect: o, wrapped: r }, n) {
    s && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(e) && (this._$Ej.set(e, n ?? i ?? this[e]), r !== !0 || n !== void 0) || (this._$AL.has(e) || (this.hasUpdated || s || (i = void 0), this._$AL.set(e, i)), o === !0 && this._$Em !== e && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(e));
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
    let e = !1;
    const i = this._$AL;
    try {
      e = this.shouldUpdate(i), e ? (this.willUpdate(i), (s = this._$EO) == null || s.forEach((o) => {
        var r;
        return (r = o.hostUpdate) == null ? void 0 : r.call(o);
      }), this.update(i)) : this._$EM();
    } catch (o) {
      throw e = !1, this._$EM(), o;
    }
    e && this._$AE(i);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    var i;
    (i = this._$EO) == null || i.forEach((s) => {
      var o;
      return (o = s.hostUpdated) == null ? void 0 : o.call(s);
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
$e.elementStyles = [], $e.shadowRootOptions = { mode: "open" }, $e[_e("elementProperties")] = /* @__PURE__ */ new Map(), $e[_e("finalized")] = /* @__PURE__ */ new Map(), Ge == null || Ge({ ReactiveElement: $e }), (he.reactiveElementVersions ?? (he.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const je = globalThis, nt = (t) => t, Ne = je.trustedTypes, at = Ne ? Ne.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, vt = "$lit$", pe = `lit$${Math.random().toFixed(9).slice(2)}$`, yt = "?" + pe, Et = `<${yt}>`, me = document, De = () => me.createComment(""), Ee = (t) => t === null || typeof t != "object" && typeof t != "function", et = Array.isArray, zt = (t) => et(t) || typeof (t == null ? void 0 : t[Symbol.iterator]) == "function", Ye = `[ 	
\f\r]`, Ie = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, lt = /-->/g, dt = />/g, ge = RegExp(`>|${Ye}(?:([^\\s"'>=/]+)(${Ye}*=${Ye}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), ct = /'/g, pt = /"/g, wt = /^(?:script|style|textarea|title)$/i, $t = (t) => (e, ...i) => ({ _$litType$: t, strings: e, values: i }), m = $t(1), P = $t(2), Se = Symbol.for("lit-noChange"), N = Symbol.for("lit-nothing"), ht = /* @__PURE__ */ new WeakMap(), fe = me.createTreeWalker(me, 129);
function kt(t, e) {
  if (!et(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return at !== void 0 ? at.createHTML(e) : e;
}
const Ft = (t, e) => {
  const i = t.length - 1, s = [];
  let o, r = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", n = Ie;
  for (let a = 0; a < i; a++) {
    const l = t[a];
    let u, d, p = -1, c = 0;
    for (; c < l.length && (n.lastIndex = c, d = n.exec(l), d !== null); ) c = n.lastIndex, n === Ie ? d[1] === "!--" ? n = lt : d[1] !== void 0 ? n = dt : d[2] !== void 0 ? (wt.test(d[2]) && (o = RegExp("</" + d[2], "g")), n = ge) : d[3] !== void 0 && (n = ge) : n === ge ? d[0] === ">" ? (n = o ?? Ie, p = -1) : d[1] === void 0 ? p = -2 : (p = n.lastIndex - d[2].length, u = d[1], n = d[3] === void 0 ? ge : d[3] === '"' ? pt : ct) : n === pt || n === ct ? n = ge : n === lt || n === dt ? n = Ie : (n = ge, o = void 0);
    const f = n === ge && t[a + 1].startsWith("/>") ? " " : "";
    r += n === Ie ? l + Et : p >= 0 ? (s.push(u), l.slice(0, p) + vt + l.slice(p) + pe + f) : l + pe + (p === -2 ? a : f);
  }
  return [kt(t, r + (t[i] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), s];
};
class ze {
  constructor({ strings: e, _$litType$: i }, s) {
    let o;
    this.parts = [];
    let r = 0, n = 0;
    const a = e.length - 1, l = this.parts, [u, d] = Ft(e, i);
    if (this.el = ze.createElement(u, s), fe.currentNode = this.el.content, i === 2 || i === 3) {
      const p = this.el.content.firstChild;
      p.replaceWith(...p.childNodes);
    }
    for (; (o = fe.nextNode()) !== null && l.length < a; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const p of o.getAttributeNames()) if (p.endsWith(vt)) {
          const c = d[n++], f = o.getAttribute(p).split(pe), v = /([.?@])?(.*)/.exec(c);
          l.push({ type: 1, index: r, name: v[2], strings: f, ctor: v[1] === "." ? At : v[1] === "?" ? Rt : v[1] === "@" ? Lt : Be }), o.removeAttribute(p);
        } else p.startsWith(pe) && (l.push({ type: 6, index: r }), o.removeAttribute(p));
        if (wt.test(o.tagName)) {
          const p = o.textContent.split(pe), c = p.length - 1;
          if (c > 0) {
            o.textContent = Ne ? Ne.emptyScript : "";
            for (let f = 0; f < c; f++) o.append(p[f], De()), fe.nextNode(), l.push({ type: 2, index: ++r });
            o.append(p[c], De());
          }
        }
      } else if (o.nodeType === 8) if (o.data === yt) l.push({ type: 2, index: r });
      else {
        let p = -1;
        for (; (p = o.data.indexOf(pe, p + 1)) !== -1; ) l.push({ type: 7, index: r }), p += pe.length - 1;
      }
      r++;
    }
  }
  static createElement(e, i) {
    const s = me.createElement("template");
    return s.innerHTML = e, s;
  }
}
function Ce(t, e, i = t, s) {
  var n, a;
  if (e === Se) return e;
  let o = s !== void 0 ? (n = i._$Co) == null ? void 0 : n[s] : i._$Cl;
  const r = Ee(e) ? void 0 : e._$litDirective$;
  return (o == null ? void 0 : o.constructor) !== r && ((a = o == null ? void 0 : o._$AO) == null || a.call(o, !1), r === void 0 ? o = void 0 : (o = new r(t), o._$AT(t, i, s)), s !== void 0 ? (i._$Co ?? (i._$Co = []))[s] = o : i._$Cl = o), o !== void 0 && (e = Ce(t, o._$AS(t, e.values), o, s)), e;
}
class Ot {
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
    const { el: { content: i }, parts: s } = this._$AD, o = ((e == null ? void 0 : e.creationScope) ?? me).importNode(i, !0);
    fe.currentNode = o;
    let r = fe.nextNode(), n = 0, a = 0, l = s[0];
    for (; l !== void 0; ) {
      if (n === l.index) {
        let u;
        l.type === 2 ? u = new Fe(r, r.nextSibling, this, e) : l.type === 1 ? u = new l.ctor(r, l.name, l.strings, this, e) : l.type === 6 && (u = new Wt(r, this, e)), this._$AV.push(u), l = s[++a];
      }
      n !== (l == null ? void 0 : l.index) && (r = fe.nextNode(), n++);
    }
    return fe.currentNode = me, o;
  }
  p(e) {
    let i = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(e, s, i), i += s.strings.length - 2) : s._$AI(e[i])), i++;
  }
}
class Fe {
  get _$AU() {
    var e;
    return ((e = this._$AM) == null ? void 0 : e._$AU) ?? this._$Cv;
  }
  constructor(e, i, s, o) {
    this.type = 2, this._$AH = N, this._$AN = void 0, this._$AA = e, this._$AB = i, this._$AM = s, this.options = o, this._$Cv = (o == null ? void 0 : o.isConnected) ?? !0;
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
    e = Ce(this, e, i), Ee(e) ? e === N || e == null || e === "" ? (this._$AH !== N && this._$AR(), this._$AH = N) : e !== this._$AH && e !== Se && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : zt(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== N && Ee(this._$AH) ? this._$AA.nextSibling.data = e : this.T(me.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var r;
    const { values: i, _$litType$: s } = e, o = typeof s == "number" ? this._$AC(e) : (s.el === void 0 && (s.el = ze.createElement(kt(s.h, s.h[0]), this.options)), s);
    if (((r = this._$AH) == null ? void 0 : r._$AD) === o) this._$AH.p(i);
    else {
      const n = new Ot(o, this), a = n.u(this.options);
      n.p(i), this.T(a), this._$AH = n;
    }
  }
  _$AC(e) {
    let i = ht.get(e.strings);
    return i === void 0 && ht.set(e.strings, i = new ze(e)), i;
  }
  k(e) {
    et(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let s, o = 0;
    for (const r of e) o === i.length ? i.push(s = new Fe(this.O(De()), this.O(De()), this, this.options)) : s = i[o], s._$AI(r), o++;
    o < i.length && (this._$AR(s && s._$AB.nextSibling, o), i.length = o);
  }
  _$AR(e = this._$AA.nextSibling, i) {
    var s;
    for ((s = this._$AP) == null ? void 0 : s.call(this, !1, !0, i); e !== this._$AB; ) {
      const o = nt(e).nextSibling;
      nt(e).remove(), e = o;
    }
  }
  setConnected(e) {
    var i;
    this._$AM === void 0 && (this._$Cv = e, (i = this._$AP) == null || i.call(this, e));
  }
}
class Be {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, i, s, o, r) {
    this.type = 1, this._$AH = N, this._$AN = void 0, this.element = e, this.name = i, this._$AM = o, this.options = r, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = N;
  }
  _$AI(e, i = this, s, o) {
    const r = this.strings;
    let n = !1;
    if (r === void 0) e = Ce(this, e, i, 0), n = !Ee(e) || e !== this._$AH && e !== Se, n && (this._$AH = e);
    else {
      const a = e;
      let l, u;
      for (e = r[0], l = 0; l < r.length - 1; l++) u = Ce(this, a[s + l], i, l), u === Se && (u = this._$AH[l]), n || (n = !Ee(u) || u !== this._$AH[l]), u === N ? e = N : e !== N && (e += (u ?? "") + r[l + 1]), this._$AH[l] = u;
    }
    n && !o && this.j(e);
  }
  j(e) {
    e === N ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class At extends Be {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === N ? void 0 : e;
  }
}
class Rt extends Be {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== N);
  }
}
class Lt extends Be {
  constructor(e, i, s, o, r) {
    super(e, i, s, o, r), this.type = 5;
  }
  _$AI(e, i = this) {
    if ((e = Ce(this, e, i, 0) ?? N) === Se) return;
    const s = this._$AH, o = e === N && s !== N || e.capture !== s.capture || e.once !== s.once || e.passive !== s.passive, r = e !== N && (s === N || o);
    o && this.element.removeEventListener(this.name, this, s), r && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var i;
    typeof this._$AH == "function" ? this._$AH.call(((i = this.options) == null ? void 0 : i.host) ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class Wt {
  constructor(e, i, s) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    Ce(this, e);
  }
}
const Ve = je.litHtmlPolyfillSupport;
Ve == null || Ve(ze, Fe), (je.litHtmlVersions ?? (je.litHtmlVersions = [])).push("3.3.3");
const Nt = (t, e, i) => {
  const s = (i == null ? void 0 : i.renderBefore) ?? e;
  let o = s._$litPart$;
  if (o === void 0) {
    const r = (i == null ? void 0 : i.renderBefore) ?? null;
    s._$litPart$ = o = new Fe(e.insertBefore(De(), r), r, void 0, i ?? {});
  }
  return o._$AI(t), o;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const be = globalThis;
class q extends $e {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Nt(i, this.renderRoot, this.renderOptions);
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
    return Se;
  }
}
var mt;
q._$litElement$ = !0, q.finalized = !0, (mt = be.litElementHydrateSupport) == null || mt.call(be, { LitElement: q });
const Xe = be.litElementPolyfillSupport;
Xe == null || Xe({ LitElement: q });
(be.litElementVersions ?? (be.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Q = (t) => (e, i) => {
  i !== void 0 ? i.addInitializer(() => {
    customElements.define(t, e);
  }) : customElements.define(t, e);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Bt = { attribute: !0, type: String, converter: We, reflect: !1, hasChanged: Ze }, qt = (t = Bt, e, i) => {
  const { kind: s, metadata: o } = i;
  let r = globalThis.litPropertyMetadata.get(o);
  if (r === void 0 && globalThis.litPropertyMetadata.set(o, r = /* @__PURE__ */ new Map()), s === "setter" && ((t = Object.create(t)).wrapped = !0), r.set(i.name, t), s === "accessor") {
    const { name: n } = i;
    return { set(a) {
      const l = e.get.call(this);
      e.set.call(this, a), this.requestUpdate(n, l, t, !0, a);
    }, init(a) {
      return a !== void 0 && this.C(n, void 0, t, a), a;
    } };
  }
  if (s === "setter") {
    const { name: n } = i;
    return function(a) {
      const l = this[n];
      e.call(this, a), this.requestUpdate(n, l, t, !0, a);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function D(t) {
  return (e, i) => typeof i == "object" ? qt(t, e, i) : ((s, o, r) => {
    const n = o.hasOwnProperty(r);
    return o.constructor.createProperty(r, s), n ? Object.getOwnPropertyDescriptor(o, r) : void 0;
  })(t, e, i);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function b(t) {
  return D({ ...t, state: !0, attribute: !1 });
}
const Ht = J`
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
    left: 50%;
    transform: translateX(-50%);
    background: rgba(15, 23, 42, 0.92);
    backdrop-filter: blur(14px);
    border: 1px solid rgba(56, 189, 248, 0.35);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5), 0 0 12px rgba(56, 189, 248, 0.2);
    border-radius: 10px;
    padding: 6px 16px;
    font-size: 11.5px;
    font-weight: 600;
    color: #cbd5e1;
    font-family: ui-monospace, SFMono-Regular, monospace;
    z-index: 50;
    pointer-events: none;
    white-space: nowrap;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: bottom 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .coords-hud.selection-active {
    bottom: 90px;
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
class $ {
  /**
   * Snaps a world point (in meters) to grid, existing vertices, and angle guides.
   */
  static snapPoint(e, i, s = [], o, r = 0.25) {
    let n = { ...e };
    if (i.snapToElements && s.length > 0) {
      let p = r, c = null;
      for (const f of s)
        for (const v of [f.start, f.end]) {
          const h = this.distance(e, v);
          h < p && (p = h, c = v);
        }
      if (c)
        return {
          point: { x: c.x, y: c.y },
          snappedTo: "vertex"
        };
    }
    let a, l;
    if (i.snapToElements && s.length > 0)
      for (const c of s)
        for (const f of [c.start, c.end])
          o && Math.abs(f.x - o.x) < 0.01 && Math.abs(f.y - o.y) < 0.01 || (a === void 0 && Math.abs(n.x - f.x) < 0.18 && (n.x = f.x, a = f.x), l === void 0 && Math.abs(n.y - f.y) < 0.18 && (n.y = f.y, l = f.y));
    let u = !1, d;
    if (i.snapToAngles && o && a === void 0 && l === void 0) {
      const p = e.x - o.x, c = e.y - o.y, f = Math.sqrt(p * p + c * c);
      if (f > 0.05) {
        let h = Math.atan2(c, p) * 180 / Math.PI;
        h < 0 && (h += 360);
        const g = 45, k = Math.round(h / g) * g;
        if (Math.abs(h - k) <= 6) {
          const C = k * Math.PI / 180;
          n = {
            x: o.x + f * Math.cos(C),
            y: o.y + f * Math.sin(C)
          }, u = !0, d = k;
        }
      }
    }
    if (i.snapToGrid && !u && a === void 0 && l === void 0) {
      const p = i.size || 0.5;
      return n = {
        x: Math.round(n.x / p) * p,
        y: Math.round(n.y / p) * p
      }, { point: n, snappedTo: "grid" };
    } else {
      if (a !== void 0 || l !== void 0)
        return { point: n, snappedTo: "smart_guide", smartGuideX: a, smartGuideY: l };
      if (u)
        return { point: n, snappedTo: "angle", guideAngle: d };
    }
    return { point: e, snappedTo: "none" };
  }
  /**
   * Snaps a point to the nearest wall centerline for placing doors and windows
   */
  static snapPointToWall(e, i, s = 0.6) {
    let o = null, r = s;
    for (const n of i) {
      const a = n.end.x - n.start.x, l = n.end.y - n.start.y, u = Math.sqrt(a * a + l * l);
      if (u === 0) continue;
      const d = Math.max(0, Math.min(
        1,
        ((e.x - n.start.x) * a + (e.y - n.start.y) * l) / (u * u)
      )), p = n.start.x + d * a, c = n.start.y + d * l, f = Math.sqrt((e.x - p) ** 2 + (e.y - c) ** 2);
      f < r && (r = f, o = {
        wall: n,
        projectionPoint: { x: p, y: c },
        offset: d * u,
        distance: f,
        angleRad: Math.atan2(l, a)
      });
    }
    return o;
  }
  static distance(e, i) {
    const s = e.x - i.x, o = e.y - i.y;
    return Math.sqrt(s * s + o * o);
  }
  static roundMeters(e, i = 2) {
    const s = Math.pow(10, i);
    return Math.round(e * s) / s;
  }
}
class X {
  /**
   * Ray-casting algorithm to test if a 2D point is inside a polygon
   */
  static isPointInPolygon(e, i) {
    if (!i || i.length < 3) return !1;
    let s = !1;
    for (let o = 0, r = i.length - 1; o < i.length; r = o++) {
      const n = i[o].x, a = i[o].y, l = i[r].x, u = i[r].y;
      a > e.y != u > e.y && e.x < (l - n) * (e.y - a) / (u - a) + n && (s = !s);
    }
    return s;
  }
  /**
   * Finds the room containing the specified world point (if any)
   */
  static findRoomContainingPoint(e, i) {
    for (const s of i)
      if (this.isPointInPolygon(e, s.polygon))
        return s;
    return null;
  }
  /**
   * Calculates the centroid of a polygon
   */
  static calculateCentroid(e) {
    if (!e || e.length === 0) return { x: 0, y: 0 };
    let i = 0, s = 0;
    for (const o of e)
      i += o.x, s += o.y;
    return {
      x: i / e.length,
      y: s / e.length
    };
  }
  /**
   * Computes the geometric area (in m²) of a polygon using the Shoelace formula
   */
  static computeArea(e) {
    if (!e || e.length < 3) return 0;
    let i = 0;
    for (let s = 0; s < e.length; s++) {
      const o = (s + 1) % e.length;
      i += e[s].x * e[o].y, i -= e[o].x * e[s].y;
    }
    return Math.round(Math.abs(i / 2) * 100) / 100;
  }
}
const Ke = [
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
    renderSvg: (t, e, i) => {
      const s = Math.max(8, t * 0.1), o = Math.max(10, e * 0.26), r = (t - s * 2) / 3;
      return P`
        <g class="furniture-symbol" stroke="${i ? "#38bdf8" : "#94a3b8"}" stroke-width="1.6" fill="${i ? "rgba(56, 189, 248, 0.25)" : "rgba(30, 41, 59, 0.85)"}">
          <!-- Contour principal -->
          <rect x="${-t / 2}" y="${-e / 2}" width="${t}" height="${e}" rx="6" />
          <!-- Dossier arrière -->
          <rect x="${-t / 2 + s}" y="${-e / 2}" width="${t - s * 2}" height="${o}" rx="3" fill="rgba(51, 65, 85, 0.9)" />
          <!-- Accoudoirs gauche & droit -->
          <rect x="${-t / 2}" y="${-e / 2}" width="${s}" height="${e}" rx="4" fill="rgba(51, 65, 85, 0.9)" />
          <rect x="${t / 2 - s}" y="${-e / 2}" width="${s}" height="${e}" rx="4" fill="rgba(51, 65, 85, 0.9)" />
          <!-- 3 Coussins d'assise -->
          <rect x="${-t / 2 + s + 2}" y="${-e / 2 + o + 2}" width="${r - 4}" height="${e - o - 4}" rx="4" />
          <rect x="${-t / 2 + s + r + 2}" y="${-e / 2 + o + 2}" width="${r - 4}" height="${e - o - 4}" rx="4" />
          <rect x="${-t / 2 + s + r * 2 + 2}" y="${-e / 2 + o + 2}" width="${r - 4}" height="${e - o - 4}" rx="4" />
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
    renderSvg: (t, e, i) => {
      const s = Math.max(8, t * 0.12), o = Math.max(10, e * 0.26), r = (t - s * 2) / 2;
      return P`
        <g class="furniture-symbol" stroke="${i ? "#38bdf8" : "#94a3b8"}" stroke-width="1.6" fill="${i ? "rgba(56, 189, 248, 0.25)" : "rgba(30, 41, 59, 0.85)"}">
          <rect x="${-t / 2}" y="${-e / 2}" width="${t}" height="${e}" rx="6" />
          <rect x="${-t / 2 + s}" y="${-e / 2}" width="${t - s * 2}" height="${o}" rx="3" fill="rgba(51, 65, 85, 0.9)" />
          <rect x="${-t / 2}" y="${-e / 2}" width="${s}" height="${e}" rx="4" fill="rgba(51, 65, 85, 0.9)" />
          <rect x="${t / 2 - s}" y="${-e / 2}" width="${s}" height="${e}" rx="4" fill="rgba(51, 65, 85, 0.9)" />
          <rect x="${-t / 2 + s + 2}" y="${-e / 2 + o + 2}" width="${r - 4}" height="${e - o - 4}" rx="4" />
          <rect x="${-t / 2 + s + r + 2}" y="${-e / 2 + o + 2}" width="${r - 4}" height="${e - o - 4}" rx="4" />
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
    renderSvg: (t, e, i) => {
      const s = Math.max(6, t * 0.18), o = Math.max(8, e * 0.28);
      return P`
        <g class="furniture-symbol" stroke="${i ? "#38bdf8" : "#94a3b8"}" stroke-width="1.5" fill="${i ? "rgba(56, 189, 248, 0.25)" : "rgba(30, 41, 59, 0.85)"}">
          <rect x="${-t / 2}" y="${-e / 2}" width="${t}" height="${e}" rx="6" />
          <rect x="${-t / 2 + s}" y="${-e / 2}" width="${t - s * 2}" height="${o}" rx="3" fill="rgba(51, 65, 85, 0.9)" />
          <rect x="${-t / 2}" y="${-e / 2}" width="${s}" height="${e}" rx="4" fill="rgba(51, 65, 85, 0.9)" />
          <rect x="${t / 2 - s}" y="${-e / 2}" width="${s}" height="${e}" rx="4" fill="rgba(51, 65, 85, 0.9)" />
          <rect x="${-t / 2 + s + 2}" y="${-e / 2 + o + 2}" width="${t - s * 2 - 4}" height="${e - o - 4}" rx="4" />
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
    renderSvg: (t, e, i) => P`
        <g class="furniture-symbol" stroke="${i ? "#38bdf8" : "#94a3b8"}" stroke-width="1.5" fill="${i ? "rgba(56, 189, 248, 0.25)" : "rgba(30, 41, 59, 0.85)"}">
          <rect x="${-t / 2}" y="${-e / 2}" width="${t}" height="${e}" rx="8" />
          <line x1="${-t / 2 + 8}" y1="${-e / 2 + 8}" x2="${t / 2 - 8}" y2="${e / 2 - 8}" stroke-dasharray="3,3" opacity="0.4" />
          <line x1="${t / 2 - 8}" y1="${-e / 2 + 8}" x2="${-t / 2 + 8}" y2="${e / 2 - 8}" stroke-dasharray="3,3" opacity="0.4" />
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
    renderSvg: (t, e, i) => {
      const s = (t - 16) / 2, o = e * 0.22, r = -e / 2 + o + 8;
      return P`
        <g class="furniture-symbol" stroke="${i ? "#38bdf8" : "#94a3b8"}" stroke-width="1.6" fill="${i ? "rgba(56, 189, 248, 0.25)" : "rgba(30, 41, 59, 0.85)"}">
          <!-- Cadre du lit -->
          <rect x="${-t / 2}" y="${-e / 2}" width="${t}" height="${e}" rx="6" />
          <!-- Tête de lit -->
          <line x1="${-t / 2}" y1="${-e / 2 + 4}" x2="${t / 2}" y2="${-e / 2 + 4}" stroke-width="3" stroke="${i ? "#38bdf8" : "#cbd5e1"}" />
          <!-- 2 Oreillers -->
          <rect x="${-t / 2 + 6}" y="${-e / 2 + 8}" width="${s}" height="${o}" rx="4" fill="rgba(241, 245, 249, 0.2)" />
          <rect x="${t / 2 - s - 6}" y="${-e / 2 + 8}" width="${s}" height="${o}" rx="4" fill="rgba(241, 245, 249, 0.2)" />
          <!-- Revers de couette -->
          <path d="M ${-t / 2 + 4} ${r} Q 0 ${r + 8} ${t / 2 - 4} ${r}" fill="none" stroke-width="1.8" />
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
    renderSvg: (t, e, i) => {
      const s = t - 16, o = e * 0.22, r = -e / 2 + o + 8;
      return P`
        <g class="furniture-symbol" stroke="${i ? "#38bdf8" : "#94a3b8"}" stroke-width="1.5" fill="${i ? "rgba(56, 189, 248, 0.25)" : "rgba(30, 41, 59, 0.85)"}">
          <rect x="${-t / 2}" y="${-e / 2}" width="${t}" height="${e}" rx="6" />
          <line x1="${-t / 2}" y1="${-e / 2 + 3}" x2="${t / 2}" y2="${-e / 2 + 3}" stroke-width="2.5" stroke="${i ? "#38bdf8" : "#cbd5e1"}" />
          <rect x="${-t / 2 + 8}" y="${-e / 2 + 8}" width="${s}" height="${o}" rx="4" fill="rgba(241, 245, 249, 0.2)" />
          <path d="M ${-t / 2 + 4} ${r} Q 0 ${r + 6} ${t / 2 - 4} ${r}" fill="none" stroke-width="1.8" />
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
    renderSvg: (t, e, i) => P`
        <g class="furniture-symbol" stroke="${i ? "#38bdf8" : "#94a3b8"}" stroke-width="1.4" fill="${i ? "rgba(56, 189, 248, 0.25)" : "rgba(30, 41, 59, 0.85)"}">
          <rect x="${-t / 2}" y="${-e / 2}" width="${t}" height="${e}" rx="4" />
          <line x1="${-t / 2 + 4}" y1="${0}" x2="${t / 2 - 4}" y2="${0}" stroke-width="1.2" />
          <circle cx="0" cy="${-e / 4}" r="2" fill="${i ? "#38bdf8" : "#94a3b8"}" />
          <circle cx="0" cy="${e / 4}" r="2" fill="${i ? "#38bdf8" : "#94a3b8"}" />
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
    renderSvg: (t, e, i) => {
      const s = t / 3;
      return P`
        <g class="furniture-symbol" stroke="${i ? "#38bdf8" : "#94a3b8"}" stroke-width="1.5" fill="${i ? "rgba(56, 189, 248, 0.25)" : "rgba(30, 41, 59, 0.85)"}">
          <rect x="${-t / 2}" y="${-e / 2}" width="${t}" height="${e}" rx="3" />
          <line x1="${-t / 2 + s}" y1="${-e / 2}" x2="${-t / 2 + s}" y2="${e / 2}" />
          <line x1="${-t / 2 + s * 2}" y1="${-e / 2}" x2="${-t / 2 + s * 2}" y2="${e / 2}" />
          <!-- Tringle à vêtements symbolique -->
          <line x1="${-t / 2 + 6}" y1="0" x2="${t / 2 - 6}" y2="0" stroke-dasharray="4,3" stroke-width="1.2" opacity="0.6" />
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
    renderSvg: (t, e, i) => {
      const s = t * 0.24, o = 7;
      return P`
        <g class="furniture-symbol" stroke="${i ? "#38bdf8" : "#94a3b8"}" stroke-width="1.5" fill="${i ? "rgba(56, 189, 248, 0.25)" : "rgba(30, 41, 59, 0.85)"}">
          <!-- Plateau principal -->
          <rect x="${-t / 2}" y="${-e / 2}" width="${t}" height="${e}" rx="5" />
          <!-- 3 Chaises du haut -->
          <rect x="${-t / 2 + 6}" y="${-e / 2 - o}" width="${s}" height="${o}" rx="2" />
          <rect x="${-s / 2}" y="${-e / 2 - o}" width="${s}" height="${o}" rx="2" />
          <rect x="${t / 2 - s - 6}" y="${-e / 2 - o}" width="${s}" height="${o}" rx="2" />
          <!-- 3 Chaises du bas -->
          <rect x="${-t / 2 + 6}" y="${e / 2}" width="${s}" height="${o}" rx="2" />
          <rect x="${-s / 2}" y="${e / 2}" width="${s}" height="${o}" rx="2" />
          <rect x="${t / 2 - s - 6}" y="${e / 2}" width="${s}" height="${o}" rx="2" />
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
    renderSvg: (t, e, i) => P`
        <g class="furniture-symbol" stroke="${i ? "#38bdf8" : "#94a3b8"}" stroke-width="1.5" fill="${i ? "rgba(56, 189, 248, 0.25)" : "rgba(30, 41, 59, 0.85)"}">
          <!-- Plateau de bureau -->
          <rect x="${-t / 2}" y="${-e / 2}" width="${t}" height="${e}" rx="4" />
          <!-- Écran d'ordinateur symbolique -->
          <rect x="-14" y="${-e / 2 + 6}" width="28" height="4" rx="1" fill="${i ? "#38bdf8" : "#cbd5e1"}" />
          <!-- Évidement chaise -->
          <path d="M -16 ${e / 2} A 16 16 0 0 1 16 ${e / 2}" fill="none" stroke-dasharray="3,3" />
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
    renderSvg: (t, e, i) => {
      const s = e * 0.28;
      return P`
        <g class="furniture-symbol" stroke="${i ? "#38bdf8" : "#94a3b8"}" stroke-width="1.5" fill="${i ? "rgba(56, 189, 248, 0.25)" : "rgba(30, 41, 59, 0.85)"}">
          <!-- Réservoir d'eau -->
          <rect x="${-t / 2}" y="${-e / 2}" width="${t}" height="${s}" rx="3" fill="rgba(51, 65, 85, 0.9)" />
          <!-- Cuvette de WC -->
          <path d="M ${-t / 2 + 2} ${-e / 2 + s} 
                   L ${t / 2 - 2} ${-e / 2 + s} 
                   L ${t / 2 - 2} ${e / 2 - t / 2} 
                   A ${t / 2 - 2} ${t / 2 - 2} 0 0 1 ${-t / 2 + 2} ${e / 2 - t / 2} 
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
    renderSvg: (t, e, i) => P`
        <g class="furniture-symbol" stroke="${i ? "#38bdf8" : "#94a3b8"}" stroke-width="1.5" fill="${i ? "rgba(56, 189, 248, 0.25)" : "rgba(30, 41, 59, 0.85)"}">
          <!-- Bac carré -->
          <rect x="${-t / 2}" y="${-e / 2}" width="${t}" height="${e}" rx="2" />
          <!-- Diagonales d'écoulement -->
          <line x1="${-t / 2}" y1="${-e / 2}" x2="0" y2="0" stroke-width="1" stroke-dasharray="2,2" opacity="0.6" />
          <line x1="${t / 2}" y1="${-e / 2}" x2="0" y2="0" stroke-width="1" stroke-dasharray="2,2" opacity="0.6" />
          <line x1="${-t / 2}" y1="${e / 2}" x2="0" y2="0" stroke-width="1" stroke-dasharray="2,2" opacity="0.6" />
          <line x1="${t / 2}" y1="${e / 2}" x2="0" y2="0" stroke-width="1" stroke-dasharray="2,2" opacity="0.6" />
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
    renderSvg: (t, e, i) => P`
        <g class="furniture-symbol" stroke="${i ? "#38bdf8" : "#94a3b8"}" stroke-width="1.6" fill="${i ? "rgba(56, 189, 248, 0.25)" : "rgba(30, 41, 59, 0.85)"}">
          <!-- Contour extérieur -->
          <rect x="${-t / 2}" y="${-e / 2}" width="${t}" height="${e}" rx="5" />
          <!-- Cuve arrondie intérieure -->
          <rect x="${-t / 2 + 6}" y="${-e / 2 + 6}" width="${t - 12}" height="${e - 12}" rx="${(e - 12) / 2}" fill="rgba(2, 132, 199, 0.2)" />
          <!-- Bonde -->
          <circle cx="${-t / 2 + 18}" cy="0" r="3" fill="${i ? "#38bdf8" : "#94a3b8"}" />
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
    renderSvg: (t, e, i) => {
      const s = t * 0.65, o = e * 0.65;
      return P`
        <g class="furniture-symbol" stroke="${i ? "#38bdf8" : "#94a3b8"}" stroke-width="1.5" fill="${i ? "rgba(56, 189, 248, 0.25)" : "rgba(30, 41, 59, 0.85)"}">
          <rect x="${-t / 2}" y="${-e / 2}" width="${t}" height="${e}" rx="3" />
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
    renderSvg: (t, e, i) => {
      const s = (t - 18) / 2, o = e - 16;
      return P`
        <g class="furniture-symbol" stroke="${i ? "#38bdf8" : "#94a3b8"}" stroke-width="1.5" fill="${i ? "rgba(56, 189, 248, 0.25)" : "rgba(30, 41, 59, 0.85)"}">
          <rect x="${-t / 2}" y="${-e / 2}" width="${t}" height="${e}" rx="3" />
          <!-- 2 Bacs -->
          <rect x="${-t / 2 + 6}" y="${-e / 2 + 8}" width="${s}" height="${o}" rx="4" fill="rgba(2, 132, 199, 0.25)" />
          <rect x="${6}" y="${-e / 2 + 8}" width="${s}" height="${o}" rx="4" fill="rgba(2, 132, 199, 0.25)" />
          <!-- Mitigeur -->
          <circle cx="0" cy="${-e / 2 + 5}" r="2.5" fill="${i ? "#38bdf8" : "#f59e0b"}" />
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
    renderSvg: (t, e, i) => {
      const s = Math.min(t, e) * 0.18, o = Math.min(t, e) * 0.13;
      return P`
        <g class="furniture-symbol" stroke="${i ? "#38bdf8" : "#94a3b8"}" stroke-width="1.5" fill="${i ? "rgba(56, 189, 248, 0.25)" : "rgba(30, 41, 59, 0.85)"}">
          <rect x="${-t / 2}" y="${-e / 2}" width="${t}" height="${e}" rx="4" />
          <!-- 4 Feux / Foyers induction -->
          <circle cx="${-t / 4}" cy="${-e / 4}" r="${s}" fill="rgba(239, 68, 68, 0.2)" />
          <circle cx="${t / 4}" cy="${-e / 4}" r="${o}" fill="rgba(239, 68, 68, 0.2)" />
          <circle cx="${-t / 4}" cy="${e / 4}" r="${o}" fill="rgba(239, 68, 68, 0.2)" />
          <circle cx="${t / 4}" cy="${e / 4}" r="${s}" fill="rgba(239, 68, 68, 0.2)" />
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
    renderSvg: (t, e, i) => P`
        <g class="furniture-symbol" stroke="${i ? "#38bdf8" : "#94a3b8"}" stroke-width="1.5" fill="${i ? "rgba(56, 189, 248, 0.25)" : "rgba(30, 41, 59, 0.85)"}">
          <rect x="${-t / 2}" y="${-e / 2}" width="${t}" height="${e}" rx="3" />
          <line x1="${-t / 2}" y1="${-e / 2 + 6}" x2="${t / 2}" y2="${-e / 2 + 6}" stroke-width="2" />
          <line x1="${-t / 2 + 8}" y1="${-e / 2 + 3}" x2="${-t / 2 + 20}" y2="${-e / 2 + 3}" stroke-width="2" stroke="${"#38bdf8"}" />
          <!-- Symbole Froid Flocon -->
          <text x="0" y="3" text-anchor="middle" font-size="12" fill="${"#38bdf8"}" stroke="none">❄</text>
        </g>
      `
  }
];
function ut(t) {
  return Ke.find((e) => e.type === t);
}
class ke {
  /**
   * Calcule la boîte englobante exacte du plan (murs, pièces, entités, image de fond)
   */
  static calculateBoundingBox(e, i) {
    const s = e.pixelsPerMeter || 50, o = [];
    for (const g of e.walls)
      o.push(g.start, g.end);
    for (const g of e.rooms)
      g.polygon && g.polygon.length > 0 && o.push(...g.polygon);
    for (const g of e.bindings)
      g.position && o.push(g.position);
    if (e.furniture) {
      for (const g of e.furniture)
        if (g.position) {
          const k = (g.width || 1) / 2, w = (g.length || 1) / 2;
          o.push(
            { x: g.position.x - k, y: g.position.y - w },
            { x: g.position.x + k, y: g.position.y + w }
          );
        }
    }
    if (e.background && e.background.imageUrl && e.background.visible) {
      const g = e.background, k = g.offset || { x: 0, y: 0 }, w = g.scale || 1, C = (g.widthPx || 1200) * w / s, x = (g.heightPx || 900) * w / s;
      o.push(
        { x: k.x, y: k.y },
        { x: k.x + C, y: k.y + x }
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
    let r = Math.min(...o.map((g) => g.x)), n = Math.max(...o.map((g) => g.x)), a = Math.min(...o.map((g) => g.y)), l = Math.max(...o.map((g) => g.y));
    const u = n - r || 5, d = l - a || 5, p = i !== void 0 ? i : Math.max(0.6, Math.max(u, d) * 0.05), c = r - p, f = a - p, v = n - r + p * 2, h = l - a + p * 2;
    return {
      minX: c,
      minY: f,
      width: v,
      height: h,
      ppm: s
    };
  }
  /**
   * Convertit un point monde en coordonnées de pourcentage (0% à 100%)
   * strictement compatible avec la carte Lovelace picture-elements de Home Assistant
   */
  static worldToPercentage(e, i) {
    const s = (e.x - i.minX) / i.width * 100, o = (e.y - i.minY) / i.height * 100;
    return {
      left: Math.round(s * 10) / 10,
      top: Math.round(o * 10) / 10
    };
  }
  /**
   * Génère un document SVG vectoriel autonome et complet représentant le plan
   */
  static exportToSvg(e, i) {
    var c, f, v;
    const s = {
      includeRooms: !0,
      includeWalls: !0,
      includeOpenings: !0,
      includeFurniture: !0,
      includeRoomLabels: !0,
      includeEntityMarkers: !1,
      includeBackground: !0,
      backgroundColor: "#0f172a",
      ...i
    }, o = this.calculateBoundingBox(e, s.paddingMeters), r = o.ppm, n = (o.minX * r).toFixed(1), a = (o.minY * r).toFixed(1), l = Math.max(100, Math.round(o.width * r)), u = Math.max(100, Math.round(o.height * r));
    let d = "";
    if (s.backgroundColor && s.backgroundColor !== "transparent" && (d += `  <rect x="${n}" y="${a}" width="${l}" height="${u}" fill="${s.backgroundColor}" />
`), s.includeBackground !== !1 && ((c = e.background) != null && c.imageUrl) && e.background.visible) {
      const h = e.background, g = (((f = h.offset) == null ? void 0 : f.x) || 0) * r, k = (((v = h.offset) == null ? void 0 : v.y) || 0) * r, w = h.scale || 1, C = (h.widthPx || 1200) * w, x = (h.heightPx || 900) * w;
      d += `  <!-- Image de fond du plan d'origine -->
`, d += `  <image href="${h.imageUrl}" x="${g.toFixed(1)}" y="${k.toFixed(1)}" width="${C.toFixed(1)}" height="${x.toFixed(1)}" opacity="${h.opacity || 0.6}" />
`;
    }
    if (s.includeRooms && e.rooms.length > 0) {
      d += `  <!-- Pièces -->
  <g id="rooms">
`;
      for (const h of e.rooms) {
        if (!h.polygon || h.polygon.length < 3) continue;
        const g = h.polygon.map((w) => `${(w.x * r).toFixed(1)},${(w.y * r).toFixed(1)}`).join(" "), k = h.color || "rgba(56, 189, 248, 0.12)";
        d += `    <polygon points="${g}" fill="${k}" stroke="rgba(56, 189, 248, 0.4)" stroke-width="1.5" />
`;
      }
      d += `  </g>
`;
    }
    if (s.includeWalls && e.walls.length > 0) {
      d += `  <!-- Murs -->
  <g id="walls">
`;
      for (const h of e.walls) {
        const k = this.computeWallPolygon(h.start, h.end, h.thickness).map((w) => `${(w.x * r).toFixed(1)},${(w.y * r).toFixed(1)}`).join(" ");
        d += `    <polygon points="${k}" fill="#334155" stroke="#64748b" stroke-width="1" />
`;
      }
      d += `  </g>
`;
    }
    if (s.includeOpenings && e.openings.length > 0) {
      d += `  <!-- Portes & Fenêtres -->
  <g id="openings">
`;
      for (const h of e.openings) {
        const g = e.walls.find((T) => T.id === h.wallId);
        if (!g) continue;
        const k = g.end.x - g.start.x, w = g.end.y - g.start.y, C = Math.sqrt(k * k + w * w);
        if (C === 0) continue;
        const S = (Math.atan2(w, k) * 180 / Math.PI).toFixed(1), M = (g.start.x + h.offset / C * k) * r, I = (g.start.y + h.offset / C * w) * r, y = h.width * r, _ = g.thickness * r;
        if (d += `    <g transform="translate(${M.toFixed(1)}, ${I.toFixed(1)}) rotate(${S})">
`, d += `      <rect x="${(-y / 2).toFixed(1)}" y="${(-_ / 2 - 1).toFixed(1)}" width="${y.toFixed(1)}" height="${(_ + 2).toFixed(1)}" fill="${s.backgroundColor || "#0f172a"}" />
`, h.type === "door") {
          const T = y / 2, W = h.flipSide ? -1 : 1, G = h.flipDirection ? T : -T, se = h.flipDirection ? -1 : 1;
          d += `      <rect x="${-T}" y="${-_ / 2}" width="4" height="${_}" fill="#94a3b8" />
`, d += `      <rect x="${T - 4}" y="${-_ / 2}" width="4" height="${_}" fill="#94a3b8" />
`, d += `      <line x1="${G}" y1="0" x2="${G}" y2="${W * y}" stroke="#38bdf8" stroke-width="2" stroke-linecap="round" />
`, d += `      <path d="M ${G + se * y} 0 A ${y} ${y} 0 0 ${W > 0 ? h.flipDirection ? 0 : 1 : h.flipDirection ? 1 : 0} ${G} ${W * y}" fill="rgba(56, 189, 248, 0.08)" stroke="#38bdf8" stroke-width="1.2" stroke-dasharray="3, 3" />
`;
        } else if (h.type === "french_window") {
          const T = y / 2;
          d += `      <rect x="${(-T).toFixed(1)}" y="${(-_ / 2).toFixed(1)}" width="${y.toFixed(1)}" height="${_.toFixed(1)}" fill="none" stroke="#94a3b8" stroke-width="2" />
`, d += `      <rect x="${(-T).toFixed(1)}" y="${(-_ / 4).toFixed(1)}" width="${T.toFixed(1)}" height="3" fill="#38bdf8" />
`, d += `      <rect x="0" y="${(_ / 4).toFixed(1)}" width="${T.toFixed(1)}" height="3" fill="#38bdf8" />
`;
        } else {
          const T = y / 2, W = h.sashCount === 2 || h.width >= 1.25;
          d += `      <rect x="${(-T).toFixed(1)}" y="${(-_ / 2).toFixed(1)}" width="${y.toFixed(1)}" height="${_.toFixed(1)}" fill="none" stroke="#94a3b8" stroke-width="2" />
`, d += `      <line x1="${(-T).toFixed(1)}" y1="0" x2="${T.toFixed(1)}" y2="0" stroke="#38bdf8" stroke-width="1.5" />
`, W && (d += `      <line x1="0" y1="${(-_ / 2).toFixed(1)}" x2="0" y2="${(_ / 2).toFixed(1)}" stroke="#38bdf8" stroke-width="2" />
`);
        }
        d += `    </g>
`;
      }
      d += `  </g>
`;
    }
    if (s.includeRoomLabels && e.rooms.length > 0) {
      d += `  <!-- Étiquettes de Pièces -->
  <g id="room-labels">
`;
      for (const h of e.rooms) {
        if (!h.polygon || h.polygon.length < 3) continue;
        const g = X.calculateCentroid(h.polygon), k = (g.x * r).toFixed(1), w = (g.y * r).toFixed(1);
        d += `    <g transform="translate(${k}, ${w})">
`, d += `      <text y="-6" fill="#f8fafc" font-size="13" font-weight="700" text-anchor="middle">${this.escapeXml(h.name)}</text>
`, d += `      <text y="12" fill="#38bdf8" font-size="11" font-weight="600" text-anchor="middle" font-family="monospace">${h.areaM2.toFixed(1)} m²</text>
`, d += `    </g>
`;
      }
      d += `  </g>
`;
    }
    if (s.includeFurniture !== !1 && e.furniture && e.furniture.length > 0) {
      d += `  <!-- Meubles et Équipements -->
  <g id="furniture-layer">
`;
      for (const h of e.furniture) {
        const g = (h.position.x * r).toFixed(1), k = (h.position.y * r).toFixed(1), w = ((h.width || 1) * r).toFixed(1), C = ((h.length || 1) * r).toFixed(1), x = h.rotation || 0, S = h.color || "#38bdf8", M = ((h.width || 1) * r / 2).toFixed(1), I = ((h.length || 1) * r / 2).toFixed(1);
        d += `    <g transform="translate(${g}, ${k}) rotate(${x})">
`, d += `      <rect x="-${M}" y="-${I}" width="${w}" height="${C}" rx="4" fill="rgba(30, 41, 59, 0.75)" stroke="${S}" stroke-width="1.5" />
`, h.icon && (d += `      <text x="0" y="4" font-size="12" text-anchor="middle" fill="#f8fafc">${this.escapeXml(h.icon)}</text>
`), d += `      <text x="0" y="${(parseFloat(I) + 12).toFixed(1)}" font-size="9" text-anchor="middle" fill="#94a3b8">${this.escapeXml(h.name)}</text>
`, d += `    </g>
`;
      }
      d += `  </g>
`;
    }
    if (s.includeEntityMarkers && e.bindings.length > 0) {
      d += `  <!-- Emplacements des Entités -->
  <g id="entity-markers">
`;
      for (const h of e.bindings) {
        const g = (h.position.x * r).toFixed(1), k = (h.position.y * r).toFixed(1), w = h.icon || "⚡", C = h.customName || h.entityId.split(".")[1];
        d += `    <g transform="translate(${g}, ${k})">
`, d += `      <circle cx="0" cy="0" r="16" fill="rgba(30, 41, 59, 0.85)" stroke="#38bdf8" stroke-width="1.5" />
`, d += `      <text x="0" y="5" font-size="12" text-anchor="middle">${this.escapeXml(w)}</text>
`, d += `      <text x="0" y="26" fill="#f1f5f9" font-size="10" font-weight="600" text-anchor="middle">${this.escapeXml(C)}</text>
`, d += `    </g>
`;
      }
      d += `  </g>
`;
    }
    return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="${n} ${a} ${l} ${u}" width="${l}" height="${u}" style="background-color: ${s.backgroundColor || "#0f172a"}; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 100%; height: auto;">
${d}</svg>`;
  }
  static computeWallPolygon(e, i, s) {
    const o = i.x - e.x, r = i.y - e.y, n = Math.sqrt(o * o + r * r);
    if (n === 0) return [e, e, i, i];
    const a = s / 2, l = -r / n * a, u = o / n * a;
    return [
      { x: e.x + l, y: e.y + u },
      { x: i.x + l, y: i.y + u },
      { x: i.x - l, y: i.y - u },
      { x: e.x - l, y: e.y - u }
    ];
  }
  static escapeXml(e) {
    return e.replace(/[<>&'"]/g, (i) => {
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
var Ut = Object.defineProperty, Gt = Object.getOwnPropertyDescriptor, F = (t, e, i, s) => {
  for (var o = s > 1 ? void 0 : s ? Gt(e, i) : e, r = t.length - 1, n; r >= 0; r--)
    (n = t[r]) && (o = (s ? n(e, i, o) : n(o)) || o);
  return s && o && Ut(e, i, o), o;
};
let z = class extends q {
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
    }, this.isDashboardMode = !1, this.ghostProject = null, this.showDimensions = !0, this.showThermalHeatmap = !1, this.isMarqueeSelecting = !1, this.marqueeStart = null, this.marqueeCurrent = null, this.viewport = { x: 300, y: 300, zoom: 1 }, this.isPanning = !1, this.panStart = { x: 0, y: 0 }, this.drawingWallStart = null, this.previewPoint = null, this.snapInfo = { snappedTo: "none" }, this.cursorCoords = { x: 0, y: 0 }, this.draggingFurnitureId = null, this.dragFurnitureMoved = !1, this.dragFurnitureStartPos = { x: 0, y: 0 }, this.dragFurnitureItemStartPos = { x: 0, y: 0 }, this.draggingWallId = null, this.dragWallMoved = !1, this.dragWallStartPointer = { x: 0, y: 0 }, this.dragWallInitialStart = { x: 0, y: 0 }, this.dragWallInitialEnd = { x: 0, y: 0 }, this.wallSnap = null, this.openingFlipSide = !1, this.openingFlipDirection = !1, this.windowSashCount = 1, this.calibrateStart = null, this.calibrateCurrent = null, this.rescaleStart = null, this.rescaleCurrent = null, this._boundKeyDown = null, this.draggingBindingId = null, this.dragBindingMoved = !1, this.dragBindingStartPos = { x: 0, y: 0 }, this.orbitPitch = 55, this.orbitYaw = -35, this.isOrbiting = !1, this.orbitStart = { x: 0, y: 0 }, this.orbitStartPitch = 55, this.orbitStartYaw = -35, this._canvasResizeObserver = null;
  }
  setCameraPreset(t, e) {
    this.orbitPitch = t, this.orbitYaw = e, this.requestUpdate();
  }
  // ==========================================
  // CONVERSIONS DE COORDONNÉES
  // ==========================================
  screenToWorld(t, e) {
    const i = this.getBoundingClientRect(), s = t - i.left, o = e - i.top, r = this.project.pixelsPerMeter * this.viewport.zoom;
    return {
      x: (s - this.viewport.x) / r,
      y: (o - this.viewport.y) / r
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
    const e = this.getBoundingClientRect(), i = t.clientX - e.left, s = t.clientY - e.top, o = t.deltaY < 0 ? 1.12 : 0.89, r = Math.min(Math.max(this.viewport.zoom * o, 0.15), 8), n = i - (i - this.viewport.x) * (r / this.viewport.zoom), a = s - (s - this.viewport.y) * (r / this.viewport.zoom);
    this.viewport = { x: n, y: a, zoom: r };
  }
  handlePointerDown(t) {
    var o, r, n, a, l, u, d, p, c, f, v, h, g, k, w, C, x, S;
    if (this.is3DMode) {
      if (t.button === 1 || t.button === 0 && t.shiftKey) {
        this.isPanning = !0, this.panStart = { x: t.clientX - this.viewport.x, y: t.clientY - this.viewport.y }, (r = (o = t.target).setPointerCapture) == null || r.call(o, t.pointerId);
        return;
      }
      if (t.button === 2 || t.button === 0 && t.altKey) {
        this.isOrbiting = !0, this.orbitStart = { x: t.clientX, y: t.clientY }, this.orbitStartPitch = this.orbitPitch, this.orbitStartYaw = this.orbitYaw, (a = (n = t.target).setPointerCapture) == null || a.call(n, t.pointerId);
        return;
      }
      if (t.button === 0 && !((u = (l = t.target) == null ? void 0 : l.closest) == null ? void 0 : u.call(l, ".wall-element, .wall-element-3d, .room-group, .entity-pin, .opening-element, .furniture-group"))) {
        this.selectedElements = { wallIds: [], openingIds: [], roomIds: [], bindingIds: [], furnitureIds: [] }, this.dispatchSelectionChanged(), this.isOrbiting = !0, this.orbitStart = { x: t.clientX, y: t.clientY }, this.orbitStartPitch = this.orbitPitch, this.orbitStartYaw = this.orbitYaw, (p = (d = t.target).setPointerCapture) == null || p.call(d, t.pointerId);
        return;
      }
      return;
    }
    if (t.button === 1) {
      this.isPanning = !0, this.panStart = { x: t.clientX - this.viewport.x, y: t.clientY - this.viewport.y }, (f = (c = t.target).setPointerCapture) == null || f.call(c, t.pointerId);
      return;
    }
    if (t.button !== 0) return;
    const e = t.target, i = !!((v = e == null ? void 0 : e.closest) != null && v.call(
      e,
      ".wall-element, .wall-element-3d, .room-group, .entity-pin, .opening-element, .furniture-group, .dimension-badge, .wall-dim-badge, .hud-btn"
    ));
    if ((h = e == null ? void 0 : e.closest) != null && h.call(e, ".entity-pin, .furniture-group"))
      return;
    if (this.activeTool === "select") {
      if (i)
        return;
      if (t.shiftKey) {
        const M = this.screenToWorld(t.clientX, t.clientY);
        this.isMarqueeSelecting = !0, this.marqueeStart = M, this.marqueeCurrent = M, (k = (g = t.target).setPointerCapture) == null || k.call(g, t.pointerId);
        return;
      }
      this.selectedElements = { wallIds: [], openingIds: [], roomIds: [], bindingIds: [], furnitureIds: [] }, this.dispatchSelectionChanged(), this.isPanning = !0, this.panStart = { x: t.clientX - this.viewport.x, y: t.clientY - this.viewport.y }, (C = (w = t.target).setPointerCapture) == null || C.call(w, t.pointerId);
      return;
    }
    if (t.shiftKey) {
      this.isPanning = !0, this.panStart = { x: t.clientX - this.viewport.x, y: t.clientY - this.viewport.y }, (S = (x = t.target).setPointerCapture) == null || S.call(x, t.pointerId);
      return;
    }
    const s = this.screenToWorld(t.clientX, t.clientY);
    if (this.activeTool === "wall") {
      const M = $.snapPoint(
        s,
        this.project.grid,
        this.project.walls,
        this.drawingWallStart || void 0
      );
      if (!this.drawingWallStart)
        this.drawingWallStart = M.point;
      else {
        const I = this.drawingWallStart, y = M.point;
        if ($.distance(I, y) >= 0.15) {
          const T = {
            id: `wall_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
            start: { ...I },
            end: { ...y },
            thickness: this.currentWallThickness,
            type: "standard"
          };
          this.project = {
            ...this.project,
            walls: [...this.project.walls, T]
          }, this.dispatchProjectChanged(), this.drawingWallStart = y;
        }
      }
    } else if (this.activeTool === "door" || this.activeTool === "window" || this.activeTool === "french_window") {
      if (this.wallSnap) {
        const M = this.activeTool === "window" ? "window" : this.activeTool === "french_window" ? "french_window" : "door", I = M === "door" ? 0.9 : M === "french_window" ? 2 : this.windowSashCount === 2 ? 1.4 : 0.9, y = {
          id: `op_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
          wallId: this.wallSnap.wall.id,
          type: M,
          offset: $.roundMeters(this.wallSnap.offset),
          width: this.currentOpeningWidth || I,
          flipSide: this.openingFlipSide,
          flipDirection: this.openingFlipDirection,
          sashCount: M === "window" ? this.windowSashCount || 1 : M === "french_window" ? 2 : 1
        };
        this.project = {
          ...this.project,
          openings: [...this.project.openings, y]
        }, this.dispatchProjectChanged();
      }
    } else if (this.activeTool === "calibrate") {
      const M = this.getBoundingClientRect(), I = { x: t.clientX - M.left, y: t.clientY - M.top };
      if (!this.calibrateStart)
        this.calibrateStart = I, this.calibrateCurrent = I;
      else {
        const y = I.x - this.calibrateStart.x, _ = I.y - this.calibrateStart.y, T = Math.sqrt(y * y + _ * _);
        if (T >= 10) {
          const W = T / this.viewport.zoom;
          this.dispatchEvent(new CustomEvent("request-calibration", {
            detail: {
              pixelDistance: W,
              defaultMeters: $.roundMeters(W / this.project.pixelsPerMeter)
            },
            bubbles: !0,
            composed: !0
          })), this.calibrateStart = null, this.calibrateCurrent = null;
        }
      }
    } else if (this.activeTool === "rescale") {
      const M = this.screenToWorld(t.clientX, t.clientY);
      let I = $.snapPoint(
        M,
        this.project.grid,
        this.project.walls,
        this.rescaleStart || void 0
      );
      if (I.snappedTo === "none" && this.project.walls.length > 0) {
        const y = $.snapPointToWall(M, this.project.walls, 0.6);
        y && (I = { point: y.projectionPoint, snappedTo: "vertex" });
      }
      if (!this.rescaleStart)
        this.rescaleStart = I.point, this.rescaleCurrent = I.point;
      else {
        const y = this.rescaleStart, _ = I.point, T = $.distance(y, _);
        T >= 0.05 && (this.dispatchEvent(new CustomEvent("request-rescale", {
          detail: {
            measuredMeters: $.roundMeters(T)
          },
          bubbles: !0,
          composed: !0
        })), this.rescaleStart = null, this.rescaleCurrent = null, this.previewPoint = null);
      }
    }
  }
  handlePointerMove(t) {
    if (this.isOrbiting) {
      const i = t.clientX - this.orbitStart.x, s = t.clientY - this.orbitStart.y;
      this.orbitYaw = (this.orbitStartYaw + i * 0.55) % 360, this.orbitPitch = Math.max(15, Math.min(85, this.orbitStartPitch - s * 0.38)), this.requestUpdate();
      return;
    }
    if (this.draggingFurnitureId) {
      if (Math.hypot(t.clientX - this.dragFurnitureStartPos.x, t.clientY - this.dragFurnitureStartPos.y) > 3) {
        this.dragFurnitureMoved = !0;
        const s = this.project.pixelsPerMeter * this.viewport.zoom, o = (t.clientX - this.dragFurnitureStartPos.x) / s, r = (t.clientY - this.dragFurnitureStartPos.y) / s;
        let n = this.dragFurnitureItemStartPos.x + o, a = this.dragFurnitureItemStartPos.y + r;
        if (this.project.grid.snapToGrid) {
          const p = this.project.grid.size || 0.5;
          n = Math.round(n / p) * p, a = Math.round(a / p) * p;
        }
        const l = {
          x: $.roundMeters(n),
          y: $.roundMeters(a)
        }, u = X.findRoomContainingPoint(l, this.project.rooms), d = (this.project.furniture || []).map((p) => p.id === this.draggingFurnitureId ? {
          ...p,
          position: l,
          roomId: u == null ? void 0 : u.id
        } : p);
        this.project = { ...this.project, furniture: d }, this.requestUpdate();
      }
      return;
    }
    if (this.draggingWallId) {
      if (Math.hypot(t.clientX - this.dragWallStartPointer.x, t.clientY - this.dragWallStartPointer.y) > 3) {
        this.dragWallMoved = !0;
        const s = this.project.pixelsPerMeter * this.viewport.zoom;
        let o = (t.clientX - this.dragWallStartPointer.x) / s, r = (t.clientY - this.dragWallStartPointer.y) / s;
        if (this.project.grid.snapToGrid) {
          const a = this.project.grid.size || 0.5;
          o = Math.round(o / a) * a, r = Math.round(r / a) * a;
        }
        const n = this.project.walls.map((a) => a.id === this.draggingWallId ? {
          ...a,
          start: {
            x: $.roundMeters(this.dragWallInitialStart.x + o),
            y: $.roundMeters(this.dragWallInitialStart.y + r)
          },
          end: {
            x: $.roundMeters(this.dragWallInitialEnd.x + o),
            y: $.roundMeters(this.dragWallInitialEnd.y + r)
          }
        } : a);
        this.project = { ...this.project, walls: n }, this.requestUpdate();
      }
      return;
    }
    if (this.draggingBindingId) {
      if (Math.hypot(t.clientX - this.dragBindingStartPos.x, t.clientY - this.dragBindingStartPos.y) > 3) {
        this.dragBindingMoved = !0;
        const s = this.screenToWorld(t.clientX, t.clientY), o = X.findRoomContainingPoint(s, this.project.rooms), r = this.project.bindings.map((n) => n.id === this.draggingBindingId ? {
          ...n,
          position: {
            x: $.roundMeters(s.x),
            y: $.roundMeters(s.y)
          },
          roomId: o == null ? void 0 : o.id
        } : n);
        this.project = { ...this.project, bindings: r }, this.requestUpdate();
      }
      return;
    }
    if (this.isMarqueeSelecting && this.marqueeStart) {
      this.marqueeCurrent = this.screenToWorld(t.clientX, t.clientY), this.requestUpdate();
      return;
    }
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
      x: $.roundMeters(e.x),
      y: $.roundMeters(e.y)
    }, this.activeTool === "wall") {
      const i = $.snapPoint(
        e,
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
      this.wallSnap = $.snapPointToWall(e, this.project.walls, 0.8), this.previewPoint = null;
    else if (this.activeTool === "calibrate" && this.calibrateStart) {
      const i = this.getBoundingClientRect();
      this.calibrateCurrent = { x: t.clientX - i.left, y: t.clientY - i.top };
    } else if (this.activeTool === "rescale") {
      let i = $.snapPoint(
        e,
        this.project.grid,
        this.project.walls,
        this.rescaleStart || void 0
      );
      if (i.snappedTo === "none" && this.project.walls.length > 0) {
        const s = $.snapPointToWall(e, this.project.walls, 0.6);
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
  handlePointerUp(t) {
    var e, i, s, o, r, n, a, l, u, d, p, c, f, v;
    if (this.draggingFurnitureId) {
      const h = this.dragFurnitureMoved;
      this.draggingFurnitureId = null, this.dragFurnitureMoved = !1;
      try {
        (i = (e = t.target).releasePointerCapture) == null || i.call(e, t.pointerId);
      } catch {
      }
      if (h) {
        this.dispatchProjectChanged();
        return;
      }
    }
    if (this.draggingWallId) {
      const h = this.dragWallMoved;
      this.draggingWallId = null, this.dragWallMoved = !1;
      try {
        (o = (s = t.target).releasePointerCapture) == null || o.call(s, t.pointerId);
      } catch {
      }
      if (h) {
        this.dispatchProjectChanged();
        return;
      }
    }
    if (this.draggingBindingId) {
      const h = this.dragBindingMoved;
      this.draggingBindingId = null;
      const g = (r = this.shadowRoot) == null ? void 0 : r.querySelector(".canvas-container");
      try {
        (n = g == null ? void 0 : g.releasePointerCapture) == null || n.call(g, t.pointerId);
      } catch {
      }
      try {
        (l = (a = t.target) == null ? void 0 : a.releasePointerCapture) == null || l.call(a, t.pointerId);
      } catch {
      }
      if (h) {
        setTimeout(() => {
          this.dragBindingMoved = !1;
        }, 150), this.dispatchProjectChanged();
        return;
      } else
        this.dragBindingMoved = !1;
    }
    if (this.isOrbiting) {
      this.isOrbiting = !1, (d = (u = t.target).releasePointerCapture) == null || d.call(u, t.pointerId);
      return;
    }
    if (this.isMarqueeSelecting && this.marqueeStart && this.marqueeCurrent) {
      const h = Math.min(this.marqueeStart.x, this.marqueeCurrent.x), g = Math.max(this.marqueeStart.x, this.marqueeCurrent.x), k = Math.min(this.marqueeStart.y, this.marqueeCurrent.y), w = Math.max(this.marqueeStart.y, this.marqueeCurrent.y);
      if (g - h > 0.05 || w - k > 0.05) {
        const C = this.project.walls.filter((y) => {
          const _ = (y.start.x + y.end.x) / 2, T = (y.start.y + y.end.y) / 2;
          return _ >= h && _ <= g && T >= k && T <= w;
        }).map((y) => y.id), x = this.project.openings.filter((y) => {
          const _ = this.project.walls.find((L) => L.id === y.wallId);
          if (!_) return !1;
          const T = _.end.x - _.start.x, W = _.end.y - _.start.y, G = Math.sqrt(T * T + W * W);
          if (G === 0) return !1;
          const se = _.start.x + y.offset / G * T, R = _.start.y + y.offset / G * W;
          return se >= h && se <= g && R >= k && R <= w;
        }).map((y) => y.id), S = this.project.rooms.filter((y) => {
          if (!y.polygon || y.polygon.length < 3) return !1;
          const _ = X.calculateCentroid(y.polygon);
          return _.x >= h && _.x <= g && _.y >= k && _.y <= w;
        }).map((y) => y.id), M = this.project.bindings.filter((y) => y.position.x >= h && y.position.x <= g && y.position.y >= k && y.position.y <= w).map((y) => y.id), I = (this.project.furniture || []).filter((y) => y.position.x >= h && y.position.x <= g && y.position.y >= k && y.position.y <= w).map((y) => y.id);
        this.selectedElements = {
          wallIds: Array.from(/* @__PURE__ */ new Set([...this.selectedElements.wallIds, ...C])),
          openingIds: Array.from(/* @__PURE__ */ new Set([...this.selectedElements.openingIds, ...x])),
          roomIds: Array.from(/* @__PURE__ */ new Set([...this.selectedElements.roomIds, ...S])),
          bindingIds: Array.from(/* @__PURE__ */ new Set([...this.selectedElements.bindingIds, ...M])),
          furnitureIds: Array.from(/* @__PURE__ */ new Set([...this.selectedElements.furnitureIds || [], ...I]))
        }, this.dispatchSelectionChanged();
      }
      this.isMarqueeSelecting = !1, this.marqueeStart = null, this.marqueeCurrent = null, (c = (p = t.target).releasePointerCapture) == null || c.call(p, t.pointerId);
      return;
    }
    this.isPanning && (this.isPanning = !1, (v = (f = t.target).releasePointerCapture) == null || v.call(f, t.pointerId));
  }
  // ==========================================
  // DRAG & DROP ENTITÉS HOME ASSISTANT
  // ==========================================
  handleDragOver(t) {
    t.preventDefault(), t.dataTransfer && (t.dataTransfer.dropEffect = "copy");
  }
  handleDrop(t) {
    var i, s;
    if (t.preventDefault(), (i = t.dataTransfer) != null && i.files && t.dataTransfer.files.length > 0) {
      const o = t.dataTransfer.files[0];
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
    const e = (s = t.dataTransfer) == null ? void 0 : s.getData("application/json");
    if (e)
      try {
        const o = JSON.parse(e);
        if (o.kind === "furniture") {
          const c = ut(o.furnitureType);
          if (c) {
            const f = this.screenToWorld(t.clientX, t.clientY), v = X.findRoomContainingPoint(f, this.project.rooms), h = {
              id: `furn_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
              type: c.type,
              name: c.name,
              category: c.category,
              position: {
                x: $.roundMeters(f.x),
                y: $.roundMeters(f.y)
              },
              width: c.width,
              length: c.length,
              rotation: 0,
              color: c.defaultColor,
              icon: c.icon,
              roomId: v == null ? void 0 : v.id
            };
            this.project = {
              ...this.project,
              furniture: [...this.project.furniture || [], h]
            }, this.selectedElements = {
              wallIds: [],
              openingIds: [],
              roomIds: [],
              bindingIds: [],
              furnitureIds: [h.id]
            }, this.dispatchSelectionChanged(), this.dispatchProjectChanged();
            return;
          }
        }
        const { entityId: r, domain: n, name: a, icon: l } = o, u = this.screenToWorld(t.clientX, t.clientY), d = X.findRoomContainingPoint(u, this.project.rooms), p = {
          id: `bind_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
          entityId: r,
          position: {
            x: $.roundMeters(u.x),
            y: $.roundMeters(u.y)
          },
          roomId: d == null ? void 0 : d.id,
          icon: l,
          customName: a,
          tapAction: "toggle"
        };
        this.project = {
          ...this.project,
          bindings: [...this.project.bindings, p]
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
  handleWallPointerDown(t, e) {
    var o, r;
    if (this.isDashboardMode || e.button !== 0 || this.activeTool !== "select") return;
    e.stopPropagation(), this.draggingWallId = t.id, this.dragWallMoved = !1, this.dragWallStartPointer = { x: e.clientX, y: e.clientY }, this.dragWallInitialStart = { ...t.start }, this.dragWallInitialEnd = { ...t.end };
    const i = e.shiftKey || e.ctrlKey || e.metaKey, s = this.selectedElements.wallIds.includes(t.id);
    if (i) {
      const n = s ? this.selectedElements.wallIds.filter((a) => a !== t.id) : [...this.selectedElements.wallIds, t.id];
      this.selectedElements = { ...this.selectedElements, wallIds: n };
    } else s || (this.selectedElements = { wallIds: [t.id], openingIds: [], roomIds: [], bindingIds: [], furnitureIds: [] });
    this.dispatchSelectionChanged(), (r = (o = e.currentTarget) == null ? void 0 : o.setPointerCapture) == null || r.call(o, e.pointerId);
  }
  handleWallClick(t, e) {
    if (this.activeTool !== "select" || this.dragWallMoved) return;
    t.stopPropagation();
    const i = t.shiftKey || t.ctrlKey || t.metaKey, s = this.selectedElements.wallIds.includes(e.id);
    if (i) {
      const o = s ? this.selectedElements.wallIds.filter((r) => r !== e.id) : [...this.selectedElements.wallIds, e.id];
      this.selectedElements = { ...this.selectedElements, wallIds: o };
    } else
      this.selectedElements = { wallIds: [e.id], openingIds: [], roomIds: [], bindingIds: [], furnitureIds: [] };
    this.dispatchSelectionChanged();
  }
  handleOpeningClick(t, e) {
    if (this.activeTool !== "select") return;
    t.stopPropagation();
    const i = t.shiftKey || t.ctrlKey || t.metaKey, s = this.selectedElements.openingIds.includes(e.id);
    if (i) {
      const o = s ? this.selectedElements.openingIds.filter((r) => r !== e.id) : [...this.selectedElements.openingIds, e.id];
      this.selectedElements = { ...this.selectedElements, openingIds: o };
    } else
      this.selectedElements = { wallIds: [], openingIds: [e.id], roomIds: [], bindingIds: [], furnitureIds: [] };
    this.dispatchSelectionChanged();
  }
  handleFurniturePointerDown(t, e) {
    var o, r, n;
    if (this.isDashboardMode || e.button !== 0 || this.activeTool !== "select") return;
    e.stopPropagation(), this.draggingFurnitureId = t.id, this.dragFurnitureMoved = !1, this.dragFurnitureStartPos = { x: e.clientX, y: e.clientY }, this.dragFurnitureItemStartPos = { ...t.position };
    const i = e.shiftKey || e.ctrlKey || e.metaKey, s = ((o = this.selectedElements.furnitureIds) == null ? void 0 : o.includes(t.id)) || !1;
    if (i) {
      const a = s ? (this.selectedElements.furnitureIds || []).filter((l) => l !== t.id) : [...this.selectedElements.furnitureIds || [], t.id];
      this.selectedElements = { ...this.selectedElements, furnitureIds: a };
    } else s || (this.selectedElements = { wallIds: [], openingIds: [], roomIds: [], bindingIds: [], furnitureIds: [t.id] });
    this.dispatchSelectionChanged(), (n = (r = e.currentTarget) == null ? void 0 : r.setPointerCapture) == null || n.call(r, e.pointerId);
  }
  handleFurnitureClick(t, e) {
    var o;
    if (this.activeTool !== "select" || this.dragFurnitureMoved) return;
    t.stopPropagation();
    const i = t.shiftKey || t.ctrlKey || t.metaKey, s = ((o = this.selectedElements.furnitureIds) == null ? void 0 : o.includes(e.id)) || !1;
    if (i) {
      const r = s ? (this.selectedElements.furnitureIds || []).filter((n) => n !== e.id) : [...this.selectedElements.furnitureIds || [], e.id];
      this.selectedElements = { ...this.selectedElements, furnitureIds: r };
    } else
      this.selectedElements = { wallIds: [], openingIds: [], roomIds: [], bindingIds: [], furnitureIds: [e.id] };
    this.dispatchSelectionChanged();
  }
  renderMarqueeBox() {
    if (!this.isMarqueeSelecting || !this.marqueeStart || !this.marqueeCurrent) return null;
    const t = this.worldToScreen(this.marqueeStart), e = this.worldToScreen(this.marqueeCurrent), i = Math.min(t.x, e.x), s = Math.min(t.y, e.y), o = Math.abs(t.x - e.x), r = Math.abs(t.y - e.y);
    return P`
      <rect 
        class="marquee-selection-box"
        x="${i}" 
        y="${s}" 
        width="${o}" 
        height="${r}" 
      />
    `;
  }
  handleEntityPointerDown(t, e) {
    var n, a;
    if (this.isDashboardMode || e.button !== 0) return;
    e.stopPropagation(), this.draggingBindingId = t.id, this.dragBindingMoved = !1, this.dragBindingStartPos = { x: e.clientX, y: e.clientY };
    const i = e, s = i.shiftKey || i.ctrlKey || i.metaKey, o = this.selectedElements.bindingIds.includes(t.id);
    if (s) {
      const l = o ? this.selectedElements.bindingIds.filter((u) => u !== t.id) : [...this.selectedElements.bindingIds, t.id];
      this.selectedElements = { ...this.selectedElements, bindingIds: l };
    } else
      this.selectedElements = { wallIds: [], openingIds: [], roomIds: [], bindingIds: [t.id], furnitureIds: [] };
    this.dispatchSelectionChanged();
    const r = (n = this.shadowRoot) == null ? void 0 : n.querySelector(".canvas-container");
    try {
      (a = r == null ? void 0 : r.setPointerCapture) == null || a.call(r, e.pointerId);
    } catch {
    }
  }
  executeEntityTapAction(t) {
    const e = (t.entityId || "").split(".")[0], i = ["light", "switch", "input_boolean", "fan"], s = ["lock", "alarm_control_panel", "camera", "climate", "media_player", "sensor", "binary_sensor", "device_tracker"];
    if (t.tapAction === "more-info" || s.includes(e)) {
      this.dispatchEvent(new CustomEvent("hass-more-info", {
        detail: { entityId: t.entityId },
        bubbles: !0,
        composed: !0
      }));
      return;
    }
    this.hass && this.hass.callService && (i.includes(e) ? this.hass.callService(e, "toggle", { entity_id: t.entityId }).catch(() => {
      this.hass.callService("homeassistant", "toggle", { entity_id: t.entityId });
    }) : e === "cover" ? this.hass.callService("cover", "toggle", { entity_id: t.entityId }).catch(() => {
      this.hass.callService("homeassistant", "toggle", { entity_id: t.entityId });
    }) : e === "scene" ? this.hass.callService("scene", "turn_on", { entity_id: t.entityId }) : e === "script" ? this.hass.callService("script", "turn_on", { entity_id: t.entityId }) : e === "button" || e === "input_button" ? this.hass.callService("button", "press", { entity_id: t.entityId }) : this.dispatchEvent(new CustomEvent("hass-more-info", {
      detail: { entityId: t.entityId },
      bubbles: !0,
      composed: !0
    })));
  }
  handleEntityClick(t, e) {
    if (e.stopPropagation(), !this.dragBindingMoved) {
      if (this.isDashboardMode) {
        this.executeEntityTapAction(t);
        return;
      }
      if (this.activeTool === "select") {
        const i = e, s = i.shiftKey || i.ctrlKey || i.metaKey, o = this.selectedElements.bindingIds.includes(t.id);
        if (s) {
          const r = o ? this.selectedElements.bindingIds.filter((n) => n !== t.id) : [...this.selectedElements.bindingIds, t.id];
          this.selectedElements = { ...this.selectedElements, bindingIds: r };
        } else
          this.selectedElements = { wallIds: [], openingIds: [], roomIds: [], bindingIds: [t.id] };
        this.dispatchSelectionChanged();
        return;
      }
      this.executeEntityTapAction(t);
    }
  }
  handleEntityDblClick(t, e) {
    e.stopPropagation(), this.dispatchEvent(new CustomEvent("hass-more-info", {
      detail: { entityId: t.entityId },
      bubbles: !0,
      composed: !0
    }));
  }
  rotateSelectedFurniture() {
    if (!this.selectedElements.furnitureIds || this.selectedElements.furnitureIds.length === 0) return;
    const t = this.selectedElements.furnitureIds, e = (this.project.furniture || []).map((i) => t.includes(i.id) ? {
      ...i,
      rotation: ((i.rotation || 0) + 90) % 360
    } : i);
    this.project = { ...this.project, furniture: e }, this.dispatchProjectChanged(), this.requestUpdate();
  }
  handleKeyDown(t) {
    t.key === "Escape" ? (this.drawingWallStart = null, this.previewPoint = null, this.calibrateStart = null, this.calibrateCurrent = null, this.rescaleStart = null, this.rescaleCurrent = null, this.wallSnap = null, this.selectedElements = { wallIds: [], openingIds: [], roomIds: [], bindingIds: [], furnitureIds: [] }, this.dispatchSelectionChanged(), this.requestUpdate()) : t.key === " " || t.key === "Spacebar" ? this.wallSnap && (t.preventDefault(), this.openingFlipSide = !this.openingFlipSide, this.requestUpdate()) : t.key.toLowerCase() === "f" ? this.wallSnap && (this.openingFlipDirection = !this.openingFlipDirection, this.requestUpdate()) : t.key.toLowerCase() === "r" && this.selectedElements.furnitureIds && this.selectedElements.furnitureIds.length > 0 && (t.preventDefault(), this.rotateSelectedFurniture());
  }
  connectedCallback() {
    super.connectedCallback(), this._boundKeyDown = this.handleKeyDown.bind(this), window.addEventListener("keydown", this._boundKeyDown), typeof ResizeObserver < "u" && (this._canvasResizeObserver = new ResizeObserver(() => {
      this.requestUpdate();
    }), this._canvasResizeObserver.observe(this));
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._boundKeyDown && window.removeEventListener("keydown", this._boundKeyDown), this._canvasResizeObserver && (this._canvasResizeObserver.disconnect(), this._canvasResizeObserver = null);
  }
  firstUpdated() {
    setTimeout(() => {
      var t, e;
      this.project && (((t = this.project.walls) == null ? void 0 : t.length) > 0 || ((e = this.project.rooms) == null ? void 0 : e.length) > 0) && this.fitToScreen();
    }, 150);
  }
  updated(t) {
    if (super.updated(t), t.has("project")) {
      const e = t.get("project");
      e && this.project && e.id !== this.project.id && setTimeout(() => this.fitToScreen(), 80);
    }
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
    const s = e.x - t.x, o = e.y - t.y, r = Math.sqrt(s * s + o * o);
    if (r === 0) return [t, t, e, e];
    const n = i / 2, a = -o / r * n, l = s / r * n;
    return [
      { x: t.x + a, y: t.y + l },
      { x: e.x + a, y: e.y + l },
      { x: e.x - a, y: e.y - l },
      { x: t.x - a, y: t.y - l }
    ];
  }
  renderBackgroundLayer() {
    const t = this.project.background;
    if (!t || !t.imageUrl || !t.visible) return null;
    const e = this.worldToScreen(t.offset || { x: 0, y: 0 }), i = t.scale || 1;
    return P`
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
    const s = i.x - e.x, o = i.y - e.y, r = s * s + o * o;
    if (r === 0) return $.distance(t, e);
    let n = ((t.x - e.x) * s + (t.y - e.y) * o) / r;
    n = Math.max(0, Math.min(1, n));
    const a = { x: e.x + n * s, y: e.y + n * o };
    return $.distance(t, a);
  }
  getWallHeight(t) {
    const e = this.project.defaultCeilingHeight || 2.5, i = {
      x: (t.start.x + t.end.x) / 2,
      y: (t.start.y + t.end.y) / 2
    }, s = (this.project.rooms || []).filter((o) => {
      if (!o.polygon || o.polygon.length < 3) return !1;
      if (X.isPointInPolygon(i, o.polygon)) return !0;
      for (let r = 0; r < o.polygon.length; r++) {
        const n = o.polygon[r], a = o.polygon[(r + 1) % o.polygon.length];
        if (this.pointToSegmentDistance(i, n, a) <= t.thickness / 2 + 0.35)
          return !0;
      }
      return !1;
    });
    if (s.length > 0) {
      const o = s.map((r) => r.height || e);
      return Math.max(...o, t.height || 0);
    }
    return t.height || e;
  }
  handleRoomClick(t, e) {
    if (!(this.drawingWallStart || this.calibrateStart || this.rescaleStart)) {
      if (t.stopPropagation(), this.activeTool === "select") {
        const i = t.shiftKey || t.ctrlKey || t.metaKey, s = this.selectedElements.roomIds.includes(e.id);
        if (i) {
          const o = s ? this.selectedElements.roomIds.filter((r) => r !== e.id) : [...this.selectedElements.roomIds, e.id];
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
  handleRoomDblClick(t, e) {
    t.stopPropagation(), this.dispatchEvent(new CustomEvent("room-selected", {
      detail: { room: e },
      bubbles: !0,
      composed: !0
    }));
  }
  // Rendu des Pièces avec détection d'illumination (RGB & Brightness) et Carte Thermique
  renderRooms() {
    return this.project.rooms.map((t) => {
      var f, v, h, g, k, w, C;
      if (!t.polygon || t.polygon.length < 3) return null;
      const e = t.polygon.map((x) => this.worldToScreen(x)), i = e.map((x) => `${x.x},${x.y}`).join(" "), s = this.project.bindings.filter((x) => x.roomId === t.id && x.entityId.startsWith("light.")).map((x) => {
        var S, M;
        return (M = (S = this.hass) == null ? void 0 : S.states) == null ? void 0 : M[x.entityId];
      }).filter((x) => x && x.state === "on"), o = s.length > 0;
      let r = null;
      if (o) {
        const x = s[0], S = ((f = x.attributes) == null ? void 0 : f.rgb_color) || [255, 240, 180], I = 0.12 + (((v = x.attributes) == null ? void 0 : v.brightness) !== void 0 ? x.attributes.brightness : 255) / 255 * 0.22;
        r = `rgba(${S[0]}, ${S[1]}, ${S[2]}, ${I.toFixed(2)})`;
      }
      let n = null;
      const a = this.project.bindings.find(
        (x) => {
          var S;
          return x.roomId === t.id && (x.entityId.startsWith("climate.") || x.entityId.startsWith("sensor.") && (x.entityId.toLowerCase().includes("temp") || ((S = x.customName) == null ? void 0 : S.toLowerCase().includes("temp"))));
        }
      );
      if (a) {
        const x = (g = (h = this.hass) == null ? void 0 : h.states) == null ? void 0 : g[a.entityId];
        if (x)
          if (a.entityId.startsWith("climate.")) {
            const S = ((k = x.attributes) == null ? void 0 : k.current_temperature) ?? x.state;
            isNaN(parseFloat(S)) || (n = parseFloat(S));
          } else
            isNaN(parseFloat(x.state)) || (n = parseFloat(x.state));
      }
      let l = t.color || "rgba(56, 189, 248, 0.12)";
      this.showThermalHeatmap && n !== null ? n < 18 ? l = "rgba(59, 130, 246, 0.38)" : n < 20 ? l = "rgba(14, 165, 233, 0.32)" : n < 22 ? l = "rgba(16, 185, 129, 0.30)" : n < 24 ? l = "rgba(245, 158, 11, 0.34)" : l = "rgba(239, 68, 68, 0.40)" : r && (l = r);
      const u = X.calculateCentroid(e), d = t.height || this.project.defaultCeilingHeight || 2.5, p = (t.areaM2 * d).toFixed(1), c = (C = (w = this.selectedElements) == null ? void 0 : w.roomIds) == null ? void 0 : C.includes(t.id);
      return P`
        <g 
          class="room-group ${c ? "selected" : ""}" 
          data-room-id="${t.id}" 
          @click=${(x) => this.handleRoomClick(x, t)}
          @dblclick=${(x) => this.handleRoomDblClick(x, t)}
        >
          <polygon 
            points="${i}" 
            class="room-polygon ${o ? "illuminated" : ""}"
            style="fill: ${l}; cursor: pointer; transition: fill 0.3s ease;"
          />
          ${this.is3DMode ? P`
            <g class="room-3d-badge-group" transform="translate(${u.x}, ${u.y})">
              <rect 
                x="-62" 
                y="-30" 
                width="124" 
                height="60" 
                rx="10" 
                ry="10" 
                fill="rgba(15, 23, 42, 0.84)" 
                stroke="${c ? "#38bdf8" : "rgba(56, 189, 248, 0.4)"}" 
                stroke-width="${c ? 2 : 1}"
                filter="drop-shadow(0 6px 14px rgba(0, 0, 0, 0.6))"
              />
              <text class="room-label-name" y="-12" style="font-size: 12px; font-weight: 700; fill: #f8fafc; text-anchor: middle;">
                ${t.name}
              </text>
              <text class="room-label-area" y="6" style="font-size: 11px; font-weight: 700; fill: #38bdf8; text-anchor: middle; font-family: ui-monospace, SFMono-Regular, monospace;">
                ${t.areaM2.toFixed(1)} m²
              </text>
              <text class="room-label-height" y="21" style="font-size: 9.5px; font-weight: 600; fill: #a5f3fc; text-anchor: middle; font-family: ui-monospace, SFMono-Regular, monospace;">
                H: ${d.toFixed(2)}m · ${p} m³
              </text>
            </g>
          ` : P`
            <g class="room-label-group" transform="translate(${u.x}, ${u.y})">
              <text class="room-label-name" y="${n !== null ? -10 : -6}">${t.name}</text>
              <text class="room-label-area" y="${n !== null ? 6 : 12}">${t.areaM2.toFixed(1)} m²</text>
              ${n !== null ? P`
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
      return P`
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
    const t = this.project.pixelsPerMeter * this.viewport.zoom, i = (this.project.grid.size || 0.5) * t;
    if (i < 12) return null;
    const s = i * 2;
    return P`
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
    const t = this.project.pixelsPerMeter * this.viewport.zoom;
    return this.project.walls.map((e) => {
      var k, w;
      const i = (w = (k = this.selectedElements) == null ? void 0 : k.wallIds) == null ? void 0 : w.includes(e.id), s = this.getWallHeight(e), o = this.is3DMode ? s * t * 0.55 : 0, n = this.computeWallPolygon(e.start, e.end, e.thickness).map((C) => this.worldToScreen(C)), a = this.worldToScreen(e.start), l = this.worldToScreen(e.end), u = n.map((C) => `${C.x},${C.y}`).join(" "), d = $.distance(e.start, e.end), p = {
        x: (a.x + l.x) / 2,
        y: (a.y + l.y) / 2
      };
      if (this.is3DMode) {
        const C = n.map((y) => ({ x: y.x, y: y.y - o })), x = C.map((y) => `${y.x},${y.y}`).join(" "), S = [0, 1, 2, 3].map((y) => {
          const _ = (y + 1) % 4, T = n[y], W = n[_], G = C[_], se = C[y], R = W.x - T.x, L = W.y - T.y, O = Math.sqrt(R * R + L * L) || 1, A = -L / O, re = R / O, de = Math.max(-1, Math.min(1, A * -0.7 + re * -0.7)), ue = Math.round(i ? 42 + de * 14 : 34 + de * 16), Pe = i ? `hsl(192, 85%, ${ue}%)` : `hsl(215, 22%, ${ue}%)`, tt = i ? "#38bdf8" : `hsl(215, 22%, ${ue + 6}%)`;
          return {
            pts: `${T.x},${T.y} ${W.x},${W.y} ${G.x},${G.y} ${se.x},${se.y}`,
            fill: Pe,
            stroke: tt
          };
        }), M = i ? "#06b6d4" : "#f1f5f9", I = i ? "#22d3ee" : "#94a3b8";
        return P`
          <g 
            class="wall-element-3d ${i ? "selected" : ""}" 
            data-wall-id="${e.id}"
            @click=${(y) => this.handleWallClick(y, e)}
            style="cursor: pointer;"
          >
            <!-- 4 parois verticales solides -->
            ${S.map((y) => P`
              <polygon points="${y.pts}" style="fill: ${y.fill}; stroke: ${y.stroke}; stroke-width: 0.8; stroke-linejoin: round;" />
            `)}
            <!-- Chapeau supérieur du mur -->
            <polygon points="${x}" style="fill: ${M}; stroke: ${I}; stroke-width: 1.2; stroke-linejoin: round;" />
          </g>
        `;
      }
      const c = l.x - a.x, f = l.y - a.y, v = Math.hypot(c, f) || 1, h = -f / v, g = c / v;
      return P`
        <g 
          class="wall-element ${i ? "selected" : ""}" 
          data-wall-id="${e.id}"
          @pointerdown=${(C) => this.handleWallPointerDown(e, C)}
          @click=${(C) => this.handleWallClick(C, e)}
        >
          <polygon points="${u}" class="wall-rect" />
          <line x1="${a.x}" y1="${a.y}" x2="${l.x}" y2="${l.y}" class="wall-centerline" />
          
          ${this.showDimensions && d >= 0.4 ? P`
            <g class="wall-dim-badge" transform="translate(${p.x + h * 14}, ${p.y + g * 14})">
              <rect x="-24" y="-9" width="48" height="18" />
              <text>${$.roundMeters(d).toFixed(2)} m</text>
            </g>
          ` : null}
        </g>
      `;
    });
  }
  renderOpenings() {
    return this.project.openings.map((t) => {
      var v, h;
      const e = (h = (v = this.selectedElements) == null ? void 0 : v.openingIds) == null ? void 0 : h.includes(t.id), i = this.project.walls.find((g) => g.id === t.wallId);
      if (!i) return null;
      const s = i.end.x - i.start.x, o = i.end.y - i.start.y, r = Math.sqrt(s * s + o * o);
      if (r === 0) return null;
      const a = Math.atan2(o, s) * 180 / Math.PI, l = i.start.x + t.offset / r * s, u = i.start.y + t.offset / r * o, d = this.worldToScreen({ x: l, y: u }), p = this.project.pixelsPerMeter * this.viewport.zoom, c = t.width * p, f = i.thickness * p;
      return P`
        <g 
          class="opening-element ${e ? "selected" : ""}" 
          transform="translate(${d.x}, ${d.y}) rotate(${a})"
          style="cursor: pointer;"
          @click=${(g) => this.handleOpeningClick(g, t)}
        >
          <rect 
            x="${-c / 2}" 
            y="${-f / 2 - 1}" 
            width="${c}" 
            height="${f + 2}" 
            class="wall-cutout"
          />

          ${t.type === "door" ? this.renderDoorSymbol(c, f, t.flipSide, t.flipDirection) : null}
          ${t.type === "window" ? this.renderWindowSymbol(c, f, t.sashCount || (t.width >= 1.25 ? 2 : 1)) : null}
          ${t.type === "french_window" ? this.renderFrenchWindowSymbol(c, f) : null}
        </g>
      `;
    });
  }
  renderDoorSymbol(t, e, i, s) {
    const o = t / 2, r = i ? -1 : 1, n = s ? o : -o, a = s ? -1 : 1;
    return P`
      <g>
        <rect x="${-o}" y="${-e / 2}" width="4" height="${e}" fill="#94a3b8" />
        <rect x="${o - 4}" y="${-e / 2}" width="4" height="${e}" fill="#94a3b8" />
        <line 
          x1="${n}" 
          y1="0" 
          x2="${n}" 
          y2="${r * t}" 
          class="opening-door-leaf" 
        />
        <path 
          d="M ${n + a * t} 0 A ${t} ${t} 0 0 ${r > 0 ? s ? 0 : 1 : s ? 1 : 0} ${n} ${r * t}" 
          class="opening-door-arc" 
        />
      </g>
    `;
  }
  renderWindowSymbol(t, e, i = 1) {
    const s = t / 2;
    return i === 2 ? P`
        <g>
          <rect x="${-s}" y="${-e / 2}" width="${t}" height="${e}" fill="none" class="opening-window-frame" />
          <line x1="${-s}" y1="0" x2="${s}" y2="0" class="opening-window-glass" />
          <line x1="0" y1="${-e / 2}" x2="0" y2="${e / 2}" stroke="#38bdf8" stroke-width="2.5" />
          <line x1="${-s + 4}" y1="${-e / 4}" x2="-3" y2="${-e / 4}" stroke="rgba(56, 189, 248, 0.45)" stroke-width="1.2" />
          <line x1="3" y1="${e / 4}" x2="${s - 4}" y2="${e / 4}" stroke="rgba(56, 189, 248, 0.45)" stroke-width="1.2" />
        </g>
      ` : P`
      <g>
        <rect x="${-s}" y="${-e / 2}" width="${t}" height="${e}" fill="none" class="opening-window-frame" />
        <line x1="${-s}" y1="0" x2="${s}" y2="0" class="opening-window-glass" />
        <line x1="${-s + 4}" y1="${-e / 4}" x2="${s - 4}" y2="${-e / 4}" stroke="rgba(56, 189, 248, 0.4)" stroke-width="1" />
        <line x1="${-s + 4}" y1="${e / 4}" x2="${s - 4}" y2="${e / 4}" stroke="rgba(56, 189, 248, 0.4)" stroke-width="1" />
      </g>
    `;
  }
  renderFrenchWindowSymbol(t, e) {
    const i = t / 2;
    return P`
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
  getEntityDisplayState(t) {
    var n, a;
    const e = (a = (n = this.hass) == null ? void 0 : n.states) == null ? void 0 : a[t.entityId];
    if (!e)
      return { text: "Inactif", statusClass: "off" };
    const i = e.state;
    if (i === "unavailable") return { text: "Indisponible", statusClass: "off" };
    if (i === "unknown") return { text: "Inconnu", statusClass: "off" };
    const s = t.entityId.split(".")[0], o = e.attributes || {}, r = o.device_class || "";
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
      const l = r === "motion" || r === "occupancy" || r === "presence" || t.entityId.includes("presence") || t.entityId.includes("occupancy") || t.entityId.includes("radar") || t.entityId.includes("motion"), u = r === "door" || r === "window" || r === "garage_door" || r === "opening", d = r === "moisture", p = r === "smoke";
      return i === "on" || i === "detected" ? l ? { text: "Mouvement", statusClass: "alert" } : u ? { text: "Ouvert", statusClass: "alert" } : d ? { text: "Fuite !", statusClass: "alert" } : p ? { text: "Fumée !", statusClass: "alert" } : { text: "Détecté", statusClass: "alert" } : l ? { text: "Au repos", statusClass: "info" } : u ? { text: "Fermé", statusClass: "info" } : d ? { text: "Sec", statusClass: "info" } : p ? { text: "Normal", statusClass: "info" } : { text: "Inactif", statusClass: "off" };
    }
    if (s === "climate") {
      const l = o.current_temperature, u = o.temperature;
      return l !== void 0 && u !== void 0 ? { text: `${l}°C (${u}°)`, statusClass: "info" } : l !== void 0 ? { text: `${l}°C`, statusClass: "info" } : { text: i, statusClass: "info" };
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
    return this.project.bindings.map((t) => {
      var g, k, w, C, x, S;
      const e = this.worldToScreen(t.position), i = (k = (g = this.hass) == null ? void 0 : g.states) == null ? void 0 : k[t.entityId], s = (i == null ? void 0 : i.state) || "off", o = t.entityId.startsWith("light.") && s === "on", r = t.entityId.startsWith("binary_sensor.") && (s === "on" || s === "detected"), n = t.entityId.startsWith("sensor.") || t.entityId.startsWith("climate."), a = t.entityId.startsWith("fan."), l = a && s === "on", u = t.entityId.startsWith("media_player."), d = u && s === "playing", p = t.entityId.startsWith("cover."), c = (w = i == null ? void 0 : i.attributes) == null ? void 0 : w.current_position, f = ((C = i == null ? void 0 : i.attributes) == null ? void 0 : C.unit_of_measurement) || (n ? "°" : ""), v = (S = (x = this.selectedElements) == null ? void 0 : x.bindingIds) == null ? void 0 : S.includes(t.id), h = this.getEntityDisplayState(t);
      return P`
        <g 
          class="entity-pin ${v ? "selected" : ""} ${o ? "active-light" : ""} ${r ? "active-radar" : ""}"
          transform="translate(${e.x}, ${e.y})"
          @pointerdown=${(M) => this.handleEntityPointerDown(t, M)}
          @click=${(M) => this.handleEntityClick(t, M)}
          @dblclick=${(M) => this.handleEntityDblClick(t, M)}
          title="${t.customName || t.entityId} : ${h.text} (Clic pour basculer)"
        >
          <!-- Onde radar animée si mouvement détecté -->
          ${r ? P`<circle cx="0" cy="0" r="16" class="radar-pulse-ring" />` : null}

          <!-- Ondes sonores pour lecteur multimédia actif -->
          ${d ? P`<circle cx="0" cy="0" r="16" class="soundwave-pulse" />` : null}

          <!-- Pastille de fond -->
          <circle cx="0" cy="0" r="16" class="entity-pin-bg" />

          <!-- Pictogramme avec micro-animation (rotation ventilateur) -->
          <text x="0" y="0" class="entity-pin-icon ${l ? "fan-spin" : ""}">
            ${t.icon || (a ? "💨" : p ? "🪟" : u ? "📺" : "⚡")}
          </text>

          <!-- Étiquette Nom -->
          <text x="0" y="27" class="entity-pin-label">
            ${t.customName || t.entityId.split(".")[1]}
          </text>

          <!-- Étiquette État en direct -->
          <text x="0" y="38" class="entity-pin-state state-${h.statusClass}">
            ${h.text}
          </text>

          <!-- Badge Valeur (Thermostat / Capteur de température) -->
          ${n && s !== "unknown" ? P`
            <g class="entity-pin-value-badge" transform="translate(14, -14)">
              <rect x="-14" y="-8" width="28" height="16" />
              <text>${s}${f}</text>
            </g>
          ` : null}

          <!-- Badge Position Volet roulant -->
          ${p && c !== void 0 ? P`
            <g class="entity-pin-value-badge" transform="translate(14, -14)">
              <rect x="-14" y="-8" width="28" height="16" />
              <text>${c}%</text>
            </g>
          ` : null}
        </g>
      `;
    });
  }
  renderOpeningPreview() {
    if (!this.wallSnap) return null;
    const t = this.project.pixelsPerMeter * this.viewport.zoom, e = (this.currentOpeningWidth || 0.9) * t, i = this.wallSnap.wall.thickness * t, s = this.worldToScreen(this.wallSnap.projectionPoint), o = this.wallSnap.angleRad * 180 / Math.PI;
    return P`
      <g 
        class="opening-preview" 
        transform="translate(${s.x}, ${s.y}) rotate(${o})"
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
    ).map((a) => this.worldToScreen(a)), i = this.worldToScreen(this.drawingWallStart), s = this.worldToScreen(this.previewPoint), o = e.map((a) => `${a.x},${a.y}`).join(" "), r = $.distance(this.drawingWallStart, this.previewPoint), n = {
      x: (i.x + s.x) / 2,
      y: (i.y + s.y) / 2
    };
    return P`
      <g class="preview-wall-group">
        <polygon points="${o}" class="preview-wall-rect" />
        <line x1="${i.x}" y1="${i.y}" x2="${s.x}" y2="${s.y}" class="preview-wall-line" />

        ${this.snapInfo.guideAngle !== void 0 ? P`
          <line x1="${i.x}" y1="${i.y}" x2="${s.x}" y2="${s.y}" class="angle-guide-line" />
        ` : null}

        <g class="dimension-badge" transform="translate(${n.x}, ${n.y - 16})">
          <rect x="-30" y="-11" width="60" height="22" />
          <text>${$.roundMeters(r).toFixed(2)} m</text>
        </g>
      </g>
    `;
  }
  renderCalibrationLine() {
    if (!this.calibrateStart || !this.calibrateCurrent) return null;
    const t = this.calibrateStart, e = this.calibrateCurrent, i = e.x - t.x, s = e.y - t.y, o = Math.sqrt(i * i + s * s), r = { x: (t.x + e.x) / 2, y: (t.y + e.y) / 2 };
    return P`
      <g class="calibration-preview-group">
        <line x1="${t.x}" y1="${t.y}" x2="${e.x}" y2="${e.y}" class="calibration-line" />
        <circle cx="${t.x}" cy="${t.y}" r="6" class="calibration-endpoint" />
        <circle cx="${e.x}" cy="${e.y}" r="6" class="calibration-endpoint" />

        <g class="dimension-badge" transform="translate(${r.x}, ${r.y - 18})">
          <rect x="-35" y="-11" width="70" height="22" style="stroke: #f59e0b;" />
          <text style="fill: #f59e0b;">${Math.round(o)} px</text>
        </g>
      </g>
    `;
  }
  renderRescaleLine() {
    if (!this.rescaleStart || !this.rescaleCurrent) return null;
    const t = this.worldToScreen(this.rescaleStart), e = this.worldToScreen(this.rescaleCurrent), i = $.distance(this.rescaleStart, this.rescaleCurrent), s = {
      x: (t.x + e.x) / 2,
      y: (t.y + e.y) / 2
    };
    return P`
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

        <g class="dimension-badge" transform="translate(${s.x}, ${s.y - 18})">
          <rect x="-48" y="-13" width="96" height="26" rx="6" fill="#0f172a" stroke="#38bdf8" stroke-width="1.8" />
          <text fill="#38bdf8" font-size="12px" font-weight="800" text-anchor="middle" dy="5">
            📐 ${$.roundMeters(i).toFixed(2)} m
          </text>
        </g>
      </g>
    `;
  }
  renderGhostLayer() {
    if (!this.ghostProject || !this.ghostProject.walls || this.ghostProject.walls.length === 0) return null;
    const t = this.project.pixelsPerMeter * this.viewport.zoom;
    return P`
      <g class="ghost-layer" opacity="0.45" pointer-events="none">
        ${this.ghostProject.walls.map((e) => {
      const i = this.worldToScreen(e.start), s = this.worldToScreen(e.end), o = (e.thickness || 0.2) * t;
      return P`
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
    return this.snapInfo.smartGuideX === void 0 && this.snapInfo.smartGuideY === void 0 ? null : P`
      <g class="smart-guides-group" pointer-events="none">
        ${this.snapInfo.smartGuideX !== void 0 ? P`
          <line 
            x1="${this.worldToScreen({ x: this.snapInfo.smartGuideX, y: 0 }).x}" 
            y1="-2000" 
            x2="${this.worldToScreen({ x: this.snapInfo.smartGuideX, y: 0 }).x}" 
            y2="6000" 
            class="smart-guide-line" 
          />
        ` : null}
        ${this.snapInfo.smartGuideY !== void 0 ? P`
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
    const t = this.project.pixelsPerMeter * this.viewport.zoom;
    return (this.project.furniture || []).map((e) => {
      var d;
      const i = ut(e.type), s = ((d = this.selectedElements.furnitureIds) == null ? void 0 : d.includes(e.id)) || !1, o = this.worldToScreen(e.position), r = e.width || (i == null ? void 0 : i.width) || 1, n = e.length || (i == null ? void 0 : i.length) || 1, a = r * t, l = n * t, u = e.rotation || 0;
      return P`
        <g
          class="furniture-group ${s ? "selected" : ""}"
          data-furniture-id="${e.id}"
          transform="translate(${o.x}, ${o.y}) rotate(${u})"
          @pointerdown=${(p) => this.handleFurniturePointerDown(e, p)}
          @click=${(p) => this.handleFurnitureClick(p, e)}
          title="${e.name} (${r.toFixed(2)} × ${n.toFixed(2)} m) - Touche R pour pivoter"
        >
          ${i ? i.renderSvg(a, l, s) : P`
            <rect x="${-a / 2}" y="${-l / 2}" width="${a}" height="${l}" fill="rgba(30, 41, 59, 0.85)" stroke="${s ? "#38bdf8" : "#94a3b8"}" stroke-width="1.5" rx="4" />
            <text x="0" y="4" text-anchor="middle" font-size="12" fill="#cbd5e1">${e.icon || "📦"}</text>
          `}
          ${s ? P`
            <circle cx="0" cy="${-l / 2 - 12}" r="5" fill="#38bdf8" stroke="#ffffff" stroke-width="1.5" />
            <line x1="0" y1="${-l / 2}" x2="0" y2="${-l / 2 - 12}" stroke="#38bdf8" stroke-width="1.2" stroke-dasharray="2,2" />
          ` : null}
        </g>
      `;
    });
  }
  renderSnapIndicator() {
    if (!this.previewPoint || this.snapInfo.snappedTo === "none") return null;
    const t = this.worldToScreen(this.previewPoint), e = this.snapInfo.snappedTo === "vertex";
    return P`
      <g transform="translate(${t.x}, ${t.y})">
        <circle r="${e ? 7 : 5}" class="snap-indicator" />
        ${e ? P`<circle r="2" fill="#38bdf8" />` : null}
      </g>
    `;
  }
  zoomIn() {
    this.viewport = { ...this.viewport, zoom: Math.min(this.viewport.zoom * 1.25, 8) };
  }
  zoomOut() {
    this.viewport = { ...this.viewport, zoom: Math.max(this.viewport.zoom / 1.25, 0.15) };
  }
  fitToScreen(t = 60) {
    var v;
    const e = this.getBoundingClientRect(), i = e.width || this.clientWidth || 800, s = e.height || this.clientHeight || 600;
    if (!(this.project.walls && this.project.walls.length > 0 || this.project.rooms && this.project.rooms.length > 0 || this.project.furniture && this.project.furniture.length > 0 || ((v = this.project.background) == null ? void 0 : v.imageUrl) && this.project.background.visible)) {
      this.viewport = { x: i / 2, y: s / 2, zoom: 1 }, this.requestUpdate();
      return;
    }
    const r = ke.calculateBoundingBox(this.project, 0.6), n = r.ppm, a = r.width * n, l = r.height * n, u = (r.minX + r.width / 2) * n, d = (r.minY + r.height / 2) * n, p = Math.max(100, i - t * 2), c = Math.max(100, s - t * 2);
    let f = Math.min(p / Math.max(a, 100), c / Math.max(l, 100));
    f = Math.min(Math.max(f, 0.2), 2.5), this.viewport = {
      x: i / 2 - u * f,
      y: s / 2 - d * f,
      zoom: f
    }, this.requestUpdate();
  }
  resetView() {
    this.fitToScreen();
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
    var e;
    const t = this.getHelpMessage();
    return m`
      <div 
        class="canvas-container ${this.isPanning ? "is-panning" : ""} ${this.isOrbiting ? "is-orbiting" : ""} ${this.isDashboardMode ? "dashboard-mode" : ""}"
        @wheel=${this.handleWheel}
        @pointerdown=${this.handlePointerDown}
        @pointermove=${this.handlePointerMove}
        @pointerup=${this.handlePointerUp}
        @contextmenu=${(i) => {
      this.is3DMode && i.preventDefault();
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

        ${!this.isDashboardMode && t ? m`<div class="help-hud">${t}</div>` : null}

        ${this.isDashboardMode ? null : m`
          <div class="coords-hud ${this.selectedElements.wallIds.length + this.selectedElements.openingIds.length + this.selectedElements.roomIds.length + this.selectedElements.bindingIds.length + (((e = this.selectedElements.furnitureIds) == null ? void 0 : e.length) || 0) > 0 ? "selection-active" : ""}">
            <span style="color: #38bdf8;">X:</span>
            <span>${this.cursorCoords.x.toFixed(2)} m</span>
            <span style="opacity: 0.35;">|</span>
            <span style="color: #38bdf8;">Y:</span>
            <span>${this.cursorCoords.y.toFixed(2)} m</span>
            <span style="opacity: 0.35;">|</span>
            <span style="color: #94a3b8;">Outil:</span>
            <span style="color: #f1f5f9; font-weight: 700;">${this.activeTool.toUpperCase()}</span>
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

          ${this.is3DMode ? m`
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
z.styles = Ht;
F([
  D({ type: Object })
], z.prototype, "hass", 2);
F([
  D({ type: Object })
], z.prototype, "project", 2);
F([
  D({ type: String })
], z.prototype, "activeTool", 2);
F([
  D({ type: Number })
], z.prototype, "currentWallThickness", 2);
F([
  D({ type: Number })
], z.prototype, "currentOpeningWidth", 2);
F([
  D({ type: Boolean })
], z.prototype, "is3DMode", 2);
F([
  D({ type: Object })
], z.prototype, "selectedElements", 2);
F([
  D({ type: Boolean })
], z.prototype, "isDashboardMode", 2);
F([
  D({ type: Object })
], z.prototype, "ghostProject", 2);
F([
  D({ type: Boolean })
], z.prototype, "showDimensions", 2);
F([
  D({ type: Boolean })
], z.prototype, "showThermalHeatmap", 2);
F([
  b()
], z.prototype, "isMarqueeSelecting", 2);
F([
  b()
], z.prototype, "marqueeStart", 2);
F([
  b()
], z.prototype, "marqueeCurrent", 2);
F([
  b()
], z.prototype, "viewport", 2);
F([
  b()
], z.prototype, "isPanning", 2);
F([
  b()
], z.prototype, "drawingWallStart", 2);
F([
  b()
], z.prototype, "previewPoint", 2);
F([
  b()
], z.prototype, "snapInfo", 2);
F([
  b()
], z.prototype, "cursorCoords", 2);
F([
  b()
], z.prototype, "draggingFurnitureId", 2);
F([
  b()
], z.prototype, "draggingWallId", 2);
F([
  b()
], z.prototype, "wallSnap", 2);
F([
  D({ type: Boolean })
], z.prototype, "openingFlipSide", 2);
F([
  D({ type: Boolean })
], z.prototype, "openingFlipDirection", 2);
F([
  D({ type: Number })
], z.prototype, "windowSashCount", 2);
F([
  b()
], z.prototype, "calibrateStart", 2);
F([
  b()
], z.prototype, "calibrateCurrent", 2);
F([
  b()
], z.prototype, "rescaleStart", 2);
F([
  b()
], z.prototype, "rescaleCurrent", 2);
F([
  b()
], z.prototype, "draggingBindingId", 2);
F([
  b()
], z.prototype, "orbitPitch", 2);
F([
  b()
], z.prototype, "orbitYaw", 2);
F([
  b()
], z.prototype, "isOrbiting", 2);
z = F([
  Q("home-architect-canvas")
], z);
var Yt = Object.defineProperty, Vt = Object.getOwnPropertyDescriptor, V = (t, e, i, s) => {
  for (var o = s > 1 ? void 0 : s ? Vt(e, i) : e, r = t.length - 1, n; r >= 0; r--)
    (n = t[r]) && (o = (s ? n(e, i, o) : n(o)) || o);
  return s && o && Yt(e, i, o), o;
};
let U = class extends q {
  constructor() {
    super(...arguments), this.activeTool = "wall", this.canUndo = !1, this.canRedo = !1, this.currentThickness = 0.2, this.doorFlipSide = !1, this.doorFlipDirection = !0, this.windowSashCount = 1, this.position = { x: 20, y: 20 }, this.isDragging = !1, this.activeSubmenu = "none", this.submenuTop = 0, this.submenuOnLeft = !1, this.dragStartPointer = { x: 0, y: 0 }, this.dragStartPosition = { x: 20, y: 20 }, this.handleWindowPointerDown = (t) => {
      this.activeSubmenu !== "none" && (t.composedPath().includes(this) || (this.activeSubmenu = "none"));
    };
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
    this.updateHostPosition(), window.addEventListener("pointerdown", this.handleWindowPointerDown);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), window.removeEventListener("pointerdown", this.handleWindowPointerDown);
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
    const e = t.clientX - this.dragStartPointer.x, i = t.clientY - this.dragStartPointer.y, o = (this.parentElement || document.body).getBoundingClientRect(), r = this.getBoundingClientRect(), n = 8, a = Math.max(n, o.width - r.width - 8), l = 8, u = Math.max(l, o.height - r.height - 8), d = Math.min(Math.max(this.dragStartPosition.x + e, n), a), p = Math.min(Math.max(this.dragStartPosition.y + i, l), u);
    this.position = { x: Math.round(d), y: Math.round(p) }, this.updateHostPosition();
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
  toggleSubmenu(t, e) {
    if (e.stopPropagation(), this.activeSubmenu === t) {
      this.activeSubmenu = "none";
      return;
    }
    const i = e.currentTarget, s = this.getBoundingClientRect(), o = i.getBoundingClientRect();
    this.submenuTop = Math.max(0, o.top - s.top - 6), this.submenuOnLeft = s.right + 320 > window.innerWidth, this.activeSubmenu = t;
  }
  selectDoorOption(t, e) {
    this.doorFlipSide = t, this.doorFlipDirection = e, this.dispatchEvent(new CustomEvent("door-config-changed", {
      detail: { flipSide: t, flipDirection: e },
      bubbles: !0,
      composed: !0
    })), this.selectTool("door"), this.activeSubmenu = "none";
  }
  selectWindowOption(t, e, i) {
    this.windowSashCount = e, this.dispatchEvent(new CustomEvent("window-config-changed", {
      detail: { type: t, sashCount: e, width: i },
      bubbles: !0,
      composed: !0
    })), this.selectTool(t), this.activeSubmenu = "none";
  }
  selectWallThickness(t) {
    this.currentThickness = t, this.dispatchEvent(new CustomEvent("wall-thickness-changed", {
      detail: { thickness: t },
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
    return m`
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
        @click=${(t) => {
      this.selectTool("wall"), this.toggleSubmenu("wall", t);
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
        @click=${(t) => {
      this.selectTool("door"), this.toggleSubmenu("door", t);
    }} 
        title="Insérer une porte (D) - Cliquez pour choisir le sens d'ouverture (Droite/Gauche, Intérieur/Extérieur)"
      >
        🚪
        <span class="submenu-indicator">▾</span>
      </button>

      <!-- Outil Fenêtre -->
      <button 
        class="tool-btn ${this.activeTool === "window" ? "active" : ""} ${this.activeSubmenu === "window" ? "menu-open" : ""}" 
        @click=${(t) => {
      this.selectTool("window"), this.toggleSubmenu("window", t);
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
      ${this.activeSubmenu === "door" ? m`
        <div class="flyout-menu ${this.submenuOnLeft ? "on-left" : ""}" style="top: ${this.submenuTop}px;" @pointerdown=${(t) => t.stopPropagation()}>
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
            ${!this.doorFlipSide && this.doorFlipDirection ? m`<span class="flyout-item-badge">Actif</span>` : null}
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
            ${!this.doorFlipSide && !this.doorFlipDirection ? m`<span class="flyout-item-badge">Actif</span>` : null}
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
            ${this.doorFlipSide && !this.doorFlipDirection ? m`<span class="flyout-item-badge">Actif</span>` : null}
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
            ${this.doorFlipSide && this.doorFlipDirection ? m`<span class="flyout-item-badge">Actif</span>` : null}
          </div>
        </div>
      ` : null}

      <!-- Sous-menu Flyout Fenêtre (1 ouvrant, 2 battants, baie vitrée) -->
      ${this.activeSubmenu === "window" ? m`
        <div class="flyout-menu ${this.submenuOnLeft ? "on-left" : ""}" style="top: ${this.submenuTop}px;" @pointerdown=${(t) => t.stopPropagation()}>
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
      ${this.activeSubmenu === "wall" ? m`
        <div class="flyout-menu ${this.submenuOnLeft ? "on-left" : ""}" style="top: ${this.submenuTop}px;" @pointerdown=${(t) => t.stopPropagation()}>
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
U.styles = J`
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
  D({ type: String })
], U.prototype, "activeTool", 2);
V([
  D({ type: Boolean })
], U.prototype, "canUndo", 2);
V([
  D({ type: Boolean })
], U.prototype, "canRedo", 2);
V([
  D({ type: Number })
], U.prototype, "currentThickness", 2);
V([
  D({ type: Boolean })
], U.prototype, "doorFlipSide", 2);
V([
  D({ type: Boolean })
], U.prototype, "doorFlipDirection", 2);
V([
  D({ type: Number })
], U.prototype, "windowSashCount", 2);
V([
  b()
], U.prototype, "position", 2);
V([
  b()
], U.prototype, "isDragging", 2);
V([
  b()
], U.prototype, "activeSubmenu", 2);
V([
  b()
], U.prototype, "submenuTop", 2);
V([
  b()
], U.prototype, "submenuOnLeft", 2);
U = V([
  Q("home-architect-toolbar")
], U);
var Xt = Object.defineProperty, Kt = Object.getOwnPropertyDescriptor, le = (t, e, i, s) => {
  for (var o = s > 1 ? void 0 : s ? Kt(e, i) : e, r = t.length - 1, n; r >= 0; r--)
    (n = t[r]) && (o = (s ? n(e, i, o) : n(o)) || o);
  return s && o && Xt(e, i, o), o;
};
const ce = [
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
let te = class extends q {
  constructor() {
    super(...arguments), this.selectedTemplate = ce[0], this.width = ce[0].widthMeters, this.length = ce[0].lengthMeters, this.thickness = ce[0].wallThickness, this.addDoor = ce[0].addDoor, this.addWindow = ce[0].addWindow, this.roomName = ce[0].name, this.height = 2.5;
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
    return m`
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
          ${ce.map((e) => m`
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
te.styles = J`
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
le([
  b()
], te.prototype, "selectedTemplate", 2);
le([
  b()
], te.prototype, "width", 2);
le([
  b()
], te.prototype, "length", 2);
le([
  b()
], te.prototype, "thickness", 2);
le([
  b()
], te.prototype, "addDoor", 2);
le([
  b()
], te.prototype, "addWindow", 2);
le([
  b()
], te.prototype, "roomName", 2);
le([
  b()
], te.prototype, "height", 2);
te = le([
  Q("home-architect-wizard-modal")
], te);
var Jt = Object.defineProperty, Qt = Object.getOwnPropertyDescriptor, qe = (t, e, i, s) => {
  for (var o = s > 1 ? void 0 : s ? Qt(e, i) : e, r = t.length - 1, n; r >= 0; r--)
    (n = t[r]) && (o = (s ? n(e, i, o) : n(o)) || o);
  return s && o && Jt(e, i, o), o;
};
let Me = class extends q {
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
    return m`
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
Me.styles = J`
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
qe([
  D({ type: Number })
], Me.prototype, "pixelDistance", 2);
qe([
  D({ type: Number })
], Me.prototype, "defaultMeters", 2);
qe([
  b()
], Me.prototype, "realMeters", 2);
Me = qe([
  Q("home-architect-calibrate-modal")
], Me);
var Zt = Object.defineProperty, ei = Object.getOwnPropertyDescriptor, ye = (t, e, i, s) => {
  for (var o = s > 1 ? void 0 : s ? ei(e, i) : e, r = t.length - 1, n; r >= 0; r--)
    (n = t[r]) && (o = (s ? n(e, i, o) : n(o)) || o);
  return s && o && Zt(e, i, o), o;
};
const gt = {
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
let ne = class extends q {
  constructor() {
    super(...arguments), this.collapsed = !1, this.activeTab = "entities", this.furnitureCategory = "all", this.searchQuery = "", this.activeCategory = "all";
  }
  getEntities() {
    var t;
    return (t = this.hass) != null && t.states ? Object.values(this.hass.states).map((e) => {
      var o, r;
      const i = e.entity_id.split(".")[0], s = gt[i] || gt.default;
      return {
        entity_id: e.entity_id,
        name: ((o = e.attributes) == null ? void 0 : o.friendly_name) || e.entity_id,
        state: e.state,
        domain: i,
        icon: s,
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
  handleFurnitureDragStart(t, e) {
    t.dataTransfer && (t.dataTransfer.setData("application/json", JSON.stringify({
      kind: "furniture",
      furnitureType: e.type
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
    if (this.activeCategory !== "all" && (e = e.filter((s) => s.domain === this.activeCategory)), this.searchQuery.trim() && this.activeTab === "entities") {
      const s = this.searchQuery.toLowerCase();
      e = e.filter((o) => o.name.toLowerCase().includes(s) || o.entity_id.toLowerCase().includes(s));
    }
    let i = Ke;
    if (this.furnitureCategory !== "all" && (i = i.filter((s) => s.category === this.furnitureCategory)), this.searchQuery.trim() && this.activeTab === "furniture") {
      const s = this.searchQuery.toLowerCase();
      i = i.filter((o) => o.name.toLowerCase().includes(s));
    }
    return m`
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
          <span class="count-badge">${e.length}</span>
        </button>
        <button 
          class="tab-btn ${this.activeTab === "furniture" ? "active" : ""}" 
          @click=${() => {
      this.activeTab = "furniture", this.searchQuery = "";
    }}
        >
          <span>🛋️</span>
          <span>Meubles</span>
          <span class="count-badge">${Ke.length}</span>
        </button>
      </div>

      ${this.activeTab === "entities" ? m`
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
          ${e.length === 0 ? m`
            <div class="empty-message">Aucune entité trouvée</div>
          ` : e.map((s) => m`
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
      ` : m`
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
          ${i.length === 0 ? m`
            <div class="empty-message" style="grid-column: 1 / -1;">Aucun meuble trouvé</div>
          ` : i.map((s) => m`
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
ne.styles = J`
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
ye([
  D({ type: Object })
], ne.prototype, "hass", 2);
ye([
  D({ type: Boolean, reflect: !0 })
], ne.prototype, "collapsed", 2);
ye([
  b()
], ne.prototype, "activeTab", 2);
ye([
  b()
], ne.prototype, "furnitureCategory", 2);
ye([
  b()
], ne.prototype, "searchQuery", 2);
ye([
  b()
], ne.prototype, "activeCategory", 2);
ne = ye([
  Q("home-architect-entity-drawer")
], ne);
var ti = Object.defineProperty, ii = Object.getOwnPropertyDescriptor, Oe = (t, e, i, s) => {
  for (var o = s > 1 ? void 0 : s ? ii(e, i) : e, r = t.length - 1, n; r >= 0; r--)
    (n = t[r]) && (o = (s ? n(e, i, o) : n(o)) || o);
  return s && o && ti(e, i, o), o;
};
const si = [
  { name: "Bleu ciel", color: "rgba(56, 189, 248, 0.18)" },
  { name: "Violet moderne", color: "rgba(168, 85, 247, 0.18)" },
  { name: "Ambre chaleureux", color: "rgba(245, 158, 11, 0.18)" },
  { name: "Émeraude nature", color: "rgba(16, 185, 129, 0.18)" },
  { name: "Indigo profond", color: "rgba(99, 102, 241, 0.18)" },
  { name: "Rose pastel", color: "rgba(244, 63, 94, 0.18)" },
  { name: "Gris ardoise", color: "rgba(148, 163, 184, 0.18)" }
], oi = [
  { label: "2.10 m (Sous-sol)", val: 2.1 },
  { label: "2.30 m (Combles)", val: 2.3 },
  { label: "2.50 m (Standard)", val: 2.5 },
  { label: "2.70 m (Élevé)", val: 2.7 },
  { label: "3.00 m (Haussmann)", val: 3 },
  { label: "3.50 m (Cathédrale)", val: 3.5 }
];
let xe = class extends q {
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
    return m`
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
              ${oi.map((e) => m`
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
              ${si.map((e) => m`
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
xe.styles = J`
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
Oe([
  D({ type: Object })
], xe.prototype, "room", 2);
Oe([
  b()
], xe.prototype, "name", 2);
Oe([
  b()
], xe.prototype, "height", 2);
Oe([
  b()
], xe.prototype, "color", 2);
xe = Oe([
  Q("home-architect-room-modal")
], xe);
class ee {
  constructor(e = 1, i = 0, s = 0, o = 1, r = 0, n = 0) {
    this.a = e, this.b = i, this.c = s, this.d = o, this.e = r, this.f = n;
  }
  static identity() {
    return new ee(1, 0, 0, 1, 0, 0);
  }
  multiply(e) {
    return new ee(
      this.a * e.a + this.c * e.b,
      this.b * e.a + this.d * e.b,
      this.a * e.c + this.c * e.d,
      this.b * e.c + this.d * e.d,
      this.a * e.e + this.c * e.f + this.e,
      this.b * e.e + this.d * e.f + this.f
    );
  }
  translate(e, i) {
    return this.multiply(new ee(1, 0, 0, 1, e, i));
  }
  scale(e, i = e) {
    return this.multiply(new ee(e, 0, 0, i, 0, 0));
  }
  rotate(e) {
    const i = e * Math.PI / 180, s = Math.cos(i), o = Math.sin(i);
    return this.multiply(new ee(s, o, -o, s, 0, 0));
  }
  transformPoint(e) {
    return {
      x: this.a * e.x + this.c * e.y + this.e,
      y: this.b * e.x + this.d * e.y + this.f
    };
  }
  static parseTransform(e) {
    if (!e) return ee.identity();
    let i = ee.identity();
    const s = /([a-zA-Z]+)\s*\(([^)]+)\)/g;
    let o;
    for (; (o = s.exec(e)) !== null; ) {
      const r = o[1].toLowerCase(), n = o[2].trim().split(/[\s,]+/).map(parseFloat).filter((a) => !isNaN(a));
      r === "matrix" && n.length >= 6 ? i = i.multiply(new ee(n[0], n[1], n[2], n[3], n[4], n[5])) : r === "translate" && n.length >= 1 ? i = i.translate(n[0], n[1] || 0) : r === "scale" && n.length >= 1 ? i = i.scale(n[0], n[1] !== void 0 ? n[1] : n[0]) : r === "rotate" && n.length >= 1 && (n.length >= 3 ? i = i.translate(n[1], n[2]).rotate(n[0]).translate(-n[1], -n[2]) : i = i.rotate(n[0]));
    }
    return i;
  }
}
class ri {
  /**
   * Main entry point to parse and interpret an architectural SVG floor plan
   */
  static parseSvg(e, i = 12, s = 0.2, o = 2.5, r) {
    try {
      const n = {
        importWalls: !0,
        importDoors: !0,
        importWindows: !0,
        importRooms: !0,
        importLabels: !0,
        ...r
      }, l = new DOMParser().parseFromString(e, "image/svg+xml"), u = l.querySelector("parsererror");
      if (u)
        return {
          success: !1,
          walls: [],
          openings: [],
          rooms: [],
          viewBox: { x: 0, y: 0, width: 0, height: 0 },
          pixelsPerMeter: 50,
          stats: { wallCount: 0, doorCount: 0, windowCount: 0, roomCount: 0, textLabelCount: 0, ignoredMeasurementLinesCount: 0 },
          error: "Le fichier SVG contient des erreurs XML : " + u.textContent
        };
      const d = l.querySelector("svg");
      if (!d)
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
      const p = this.extractViewBox(d), c = p.width > 0 ? p.width : 1e3, f = i / c, v = Math.round(c / i * 10) / 10, h = [], g = [], k = [], w = [];
      this.traverseElement(d, ee.identity(), {
        segments: h,
        arcs: g,
        textLabels: k,
        polygons: w,
        defaultThickness: s
      });
      const C = h.filter((T) => T.isMeasurementLine).length, x = this.convertSegmentsToWalls(
        h,
        p,
        f,
        s,
        o
      ), S = this.detectOpenings(
        g,
        h,
        x,
        p,
        f
      ), M = this.detectRooms(
        w,
        x,
        k,
        p,
        f,
        o,
        n.importLabels !== !1
      ), I = n.importWalls !== !1 ? x : [], y = S.filter((T) => T.type === "door" ? n.importDoors !== !1 : n.importWindows !== !1), _ = n.importRooms !== !1 ? M : [];
      return {
        success: !0,
        walls: I,
        openings: y,
        rooms: _,
        viewBox: p,
        pixelsPerMeter: v || 50,
        stats: {
          wallCount: x.length,
          doorCount: S.filter((T) => T.type === "door").length,
          windowCount: S.filter((T) => T.type === "window" || T.type === "french_window").length,
          roomCount: M.length,
          textLabelCount: k.length,
          ignoredMeasurementLinesCount: C
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
  static extractViewBox(e) {
    const i = e.getAttribute("viewBox");
    if (i) {
      const n = i.trim().split(/[\s,]+/).map(parseFloat).filter((a) => !isNaN(a));
      if (n.length >= 4 && n[2] > 0 && n[3] > 0)
        return { x: n[0], y: n[1], width: n[2], height: n[3] };
    }
    const s = (n, a) => {
      if (!n) return a;
      const l = parseFloat(n);
      return isNaN(l) ? a : n.includes("mm") ? l * 3.7795 : n.includes("cm") ? l * 37.795 : n.includes("in") ? l * 96 : n.includes("pt") ? l * 1.333 : l;
    }, o = s(e.getAttribute("width"), 1e3), r = s(e.getAttribute("height"), 750);
    return { x: 0, y: 0, width: o, height: r };
  }
  /**
   * Parcours récursif des nœuds de l'arbre SVG
   */
  static traverseElement(e, i, s) {
    var T, W, G, se;
    const o = e.getAttribute("transform"), r = o ? i.multiply(ee.parseTransform(o)) : i, n = e.tagName.toLowerCase(), a = (e.getAttribute("id") || "").toLowerCase(), l = (e.getAttribute("class") || "").toLowerCase(), u = (e.getAttribute("inkscape:label") || "").toLowerCase(), d = (((T = e.closest("g[id]")) == null ? void 0 : T.getAttribute("id")) || "").toLowerCase(), p = (((W = e.parentElement) == null ? void 0 : W.getAttribute("class")) || "").toLowerCase(), c = `${a} ${l} ${u} ${d} ${p}`, f = e.getAttribute("stroke-dasharray") || "", v = (e.getAttribute("style") || "").toLowerCase(), h = ((G = e.closest("[stroke-dasharray]")) == null ? void 0 : G.getAttribute("stroke-dasharray")) || "", w = !!f && f !== "none" && f !== "0" || /stroke-dasharray\s*:\s*(?!none|0)[\d\s,.]+/i.test(v) || !!h && h !== "none" && h !== "0" || /dashed|dotted/.test(v) || /pointill|tirete|dashed|dotted/.test(c) || /dimension|cotation|mesure|cote|measure|guideline|guide|axis|axe|fleche|arrow|marker|tick/i.test(c) || e.hasAttribute("marker-start") || e.hasAttribute("marker-end") || e.closest('g[id*="dimension" i], g[id*="cotation" i], g[id*="cote" i], g[id*="measure" i], g[id*="guide" i]') !== null, C = /door|porte|portillon|swing|battant/.test(c), x = /window|fenetre|vitrage|chassis|baie/.test(c), S = !w && (/wall|mur|cloison|facade|envelope|structure|enveloppe/.test(c) || !C && !x), M = /room|piece|espace|zone|area|chambre|salon|cuisine|sdb|sejour/.test(c), I = e.getAttribute("fill") || "", y = e.getAttribute("display"), _ = e.getAttribute("visibility");
    if (!(y === "none" || _ === "hidden")) {
      switch (n) {
        case "line": {
          const R = parseFloat(e.getAttribute("x1") || "0"), L = parseFloat(e.getAttribute("y1") || "0"), O = parseFloat(e.getAttribute("x2") || "0"), A = parseFloat(e.getAttribute("y2") || "0"), re = r.transformPoint({ x: R, y: L }), de = r.transformPoint({ x: O, y: A });
          s.segments.push({
            start: re,
            end: de,
            thickness: s.defaultThickness,
            isWallHint: S && !w,
            isWindowHint: x,
            isDoorHint: C,
            isMeasurementLine: w
          });
          break;
        }
        case "polyline":
        case "polygon": {
          const L = (e.getAttribute("points") || "").trim().split(/[\s,]+/).map(parseFloat).filter((A) => !isNaN(A)), O = [];
          for (let A = 0; A < L.length; A += 2)
            A + 1 < L.length && O.push(r.transformPoint({ x: L[A], y: L[A + 1] }));
          if (O.length >= 2) {
            for (let A = 0; A < O.length - 1; A++)
              s.segments.push({
                start: O[A],
                end: O[A + 1],
                thickness: s.defaultThickness,
                isWallHint: S && !w,
                isWindowHint: x,
                isDoorHint: C,
                isMeasurementLine: w
              });
            n === "polygon" && O.length >= 3 && (s.segments.push({
              start: O[O.length - 1],
              end: O[0],
              thickness: s.defaultThickness,
              isWallHint: S && !w,
              isWindowHint: x,
              isDoorHint: C,
              isMeasurementLine: w
            }), w || s.polygons.push({
              points: O,
              isRoomHint: M,
              fill: I
            }));
          }
          break;
        }
        case "rect": {
          const R = parseFloat(e.getAttribute("x") || "0"), L = parseFloat(e.getAttribute("y") || "0"), O = parseFloat(e.getAttribute("width") || "0"), A = parseFloat(e.getAttribute("height") || "0");
          if (O > 0 && A > 0) {
            const re = r.transformPoint({ x: R, y: L }), de = r.transformPoint({ x: R + O, y: L }), ue = r.transformPoint({ x: R + O, y: L + A }), Pe = r.transformPoint({ x: R, y: L + A });
            if (Math.max(O / A, A / O) >= 3 && !w)
              if (O > A) {
                const He = r.transformPoint({ x: R, y: L + A / 2 }), Ue = r.transformPoint({ x: R + O, y: L + A / 2 });
                s.segments.push({
                  start: He,
                  end: Ue,
                  thickness: s.defaultThickness,
                  isWallHint: !0,
                  isWindowHint: x,
                  isDoorHint: C,
                  isMeasurementLine: !1
                });
              } else {
                const He = r.transformPoint({ x: R + O / 2, y: L }), Ue = r.transformPoint({ x: R + O / 2, y: L + A });
                s.segments.push({
                  start: He,
                  end: Ue,
                  thickness: s.defaultThickness,
                  isWallHint: !0,
                  isWindowHint: x,
                  isDoorHint: C,
                  isMeasurementLine: !1
                });
              }
            else
              w || (s.polygons.push({
                points: [re, de, ue, Pe],
                isRoomHint: M || I !== "none" && I !== "#000000" && I !== "black",
                fill: I
              }), s.segments.push(
                { start: re, end: de, thickness: s.defaultThickness, isWallHint: S, isWindowHint: x, isDoorHint: C, isMeasurementLine: !1 },
                { start: de, end: ue, thickness: s.defaultThickness, isWallHint: S, isWindowHint: x, isDoorHint: C, isMeasurementLine: !1 },
                { start: ue, end: Pe, thickness: s.defaultThickness, isWallHint: S, isWindowHint: x, isDoorHint: C, isMeasurementLine: !1 },
                { start: Pe, end: re, thickness: s.defaultThickness, isWallHint: S, isWindowHint: x, isDoorHint: C, isMeasurementLine: !1 }
              ));
          }
          break;
        }
        case "path": {
          const R = e.getAttribute("d");
          R && this.parsePathData(
            R,
            r,
            s,
            S && !w,
            x,
            C,
            w,
            I
          );
          break;
        }
        case "text": {
          const R = parseFloat(e.getAttribute("x") || "0"), L = parseFloat(e.getAttribute("y") || "0"), O = ((se = e.textContent) == null ? void 0 : se.trim()) || "", A = /^\d+([.,]\d+)?\s*(m|cm|mm)?$/i.test(O);
          if (O.length > 0 && !A) {
            const re = r.transformPoint({ x: R, y: L });
            s.textLabels.push({
              text: O,
              position: re
            });
          }
          break;
        }
      }
      for (let R = 0; R < e.children.length; R++)
        this.traverseElement(e.children[R], r, s);
    }
  }
  /**
   * Parse une chaîne de commandes SVG path ('d')
   */
  static parsePathData(e, i, s, o, r, n, a, l) {
    const u = /([a-df-z])|([-+]?(?:\d*\.\d+|\d+)(?:[eE][-+]?\d+)?)/gi, d = [];
    let p;
    for (; (p = u.exec(e)) !== null; )
      d.push(p[0]);
    let c = { x: 0, y: 0 }, f = { x: 0, y: 0 }, v = [], h = 0, g = "";
    for (; h < d.length; ) {
      const k = d[h];
      /^[a-df-z]$/i.test(k) && (g = k, h++);
      const w = g === g.toLowerCase(), C = g.toUpperCase();
      switch (C) {
        case "M": {
          const x = parseFloat(d[h++]), S = parseFloat(d[h++]);
          !isNaN(x) && !isNaN(S) && (c = w ? { x: c.x + x, y: c.y + S } : { x, y: S }, f = { ...c }, v.length >= 3 && !a && s.polygons.push({
            points: v.map((M) => i.transformPoint(M)),
            isRoomHint: o ? !1 : l !== "none" && l !== "",
            fill: l
          }), v = [{ ...c }]);
          break;
        }
        case "L": {
          const x = parseFloat(d[h++]), S = parseFloat(d[h++]);
          if (!isNaN(x) && !isNaN(S)) {
            const M = w ? { x: c.x + x, y: c.y + S } : { x, y: S }, I = i.transformPoint(c), y = i.transformPoint(M);
            s.segments.push({
              start: I,
              end: y,
              thickness: s.defaultThickness,
              isWallHint: o && !a,
              isWindowHint: r,
              isDoorHint: n,
              isMeasurementLine: a
            }), c = M, v.push({ ...c });
          }
          break;
        }
        case "H": {
          const x = parseFloat(d[h++]);
          if (!isNaN(x)) {
            const S = w ? { x: c.x + x, y: c.y } : { x, y: c.y }, M = i.transformPoint(c), I = i.transformPoint(S);
            s.segments.push({
              start: M,
              end: I,
              thickness: s.defaultThickness,
              isWallHint: o && !a,
              isWindowHint: r,
              isDoorHint: n,
              isMeasurementLine: a
            }), c = S, v.push({ ...c });
          }
          break;
        }
        case "V": {
          const x = parseFloat(d[h++]);
          if (!isNaN(x)) {
            const S = w ? { x: c.x, y: c.y + x } : { x: c.x, y: x }, M = i.transformPoint(c), I = i.transformPoint(S);
            s.segments.push({
              start: M,
              end: I,
              thickness: s.defaultThickness,
              isWallHint: o && !a,
              isWindowHint: r,
              isDoorHint: n,
              isMeasurementLine: a
            }), c = S, v.push({ ...c });
          }
          break;
        }
        case "A": {
          const x = parseFloat(d[h++]), S = parseFloat(d[h++]);
          parseFloat(d[h++]), parseFloat(d[h++]);
          const M = parseFloat(d[h++]), I = parseFloat(d[h++]), y = parseFloat(d[h++]);
          if (!isNaN(I) && !isNaN(y) && !isNaN(x) && !isNaN(S)) {
            const _ = w ? { x: c.x + I, y: c.y + y } : { x: I, y }, T = i.transformPoint(c), W = i.transformPoint(_);
            s.arcs.push({
              start: T,
              end: W,
              rx: x,
              ry: S,
              sweepFlag: M === 1,
              isDoorHint: !0
            }), c = _, v.push({ ...c });
          }
          break;
        }
        case "C":
        case "S":
        case "Q":
        case "T": {
          const x = C === "C" ? 6 : C === "S" || C === "Q" ? 4 : 2, S = [];
          for (let y = 0; y < x; y++) S.push(parseFloat(d[h++]));
          const M = S[S.length - 2], I = S[S.length - 1];
          !isNaN(M) && !isNaN(I) && (c = w ? { x: c.x + M, y: c.y + I } : { x: M, y: I }, v.push({ ...c }));
          break;
        }
        case "Z": {
          if (v.length >= 2) {
            const x = i.transformPoint(c), S = i.transformPoint(f);
            s.segments.push({
              start: x,
              end: S,
              thickness: s.defaultThickness,
              isWallHint: o && !a,
              isWindowHint: r,
              isDoorHint: n,
              isMeasurementLine: a
            });
          }
          v.length >= 3 && !a && s.polygons.push({
            points: v.map((x) => i.transformPoint(x)),
            isRoomHint: o ? !1 : l !== "none" && l !== "",
            fill: l
          }), c = { ...f }, v = [];
          break;
        }
        default:
          h++;
          break;
      }
    }
  }
  /**
   * Transforme et consolide les segments bruts en murs réels en mètres
   */
  static convertSegmentsToWalls(e, i, s, o, r) {
    const n = [];
    for (const a of e) {
      if (a.isMeasurementLine || a.isDoorHint || a.isWindowHint) continue;
      const l = {
        x: (a.start.x - i.x) * s,
        y: (a.start.y - i.y) * s
      }, u = {
        x: (a.end.x - i.x) * s,
        y: (a.end.y - i.y) * s
      };
      $.distance(l, u) < 0.2 || n.push({
        id: `w_svg_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
        start: { x: $.roundMeters(l.x), y: $.roundMeters(l.y) },
        end: { x: $.roundMeters(u.x), y: $.roundMeters(u.y) },
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
  static consolidateWalls(e) {
    if (e.length === 0) return [];
    let i = [...e];
    for (let r = 0; r < i.length; r++)
      for (let n = r + 1; n < i.length; n++)
        for (const a of [i[r].start, i[r].end])
          for (const l of [i[n].start, i[n].end])
            $.distance(a, l) < 0.12 && (l.x = a.x, l.y = a.y);
    let s = !0, o = 0;
    for (; s && o < 5; ) {
      s = !1, o++;
      for (let r = 0; r < i.length; r++) {
        const n = i[r];
        if (n)
          for (let a = r + 1; a < i.length; a++) {
            const l = i[a];
            if (!l) continue;
            const u = n.end.x - n.start.x, d = n.end.y - n.start.y, p = Math.sqrt(u * u + d * d), c = l.end.x - l.start.x, f = l.end.y - l.start.y, v = Math.sqrt(c * c + f * f);
            if (p === 0 || v === 0) continue;
            const h = (u * c + d * f) / (p * v);
            if (Math.abs(h) > 0.995) {
              if ($.distance(n.end, l.start) < 0.05) {
                n.end = { ...l.end }, i.splice(a, 1), s = !0;
                break;
              } else if ($.distance(n.end, l.end) < 0.05) {
                n.end = { ...l.start }, i.splice(a, 1), s = !0;
                break;
              } else if ($.distance(n.start, l.end) < 0.05) {
                n.start = { ...l.start }, i.splice(a, 1), s = !0;
                break;
              } else if ($.distance(n.start, l.start) < 0.05) {
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
  static detectOpenings(e, i, s, o, r) {
    const n = [];
    if (s.length === 0) return n;
    for (const a of e) {
      const l = Math.max(a.rx, a.ry) * r;
      if (l < 0.5 || l > 1.4) continue;
      const u = {
        x: (a.start.x - o.x) * r,
        y: (a.start.y - o.y) * r
      }, d = {
        x: (a.end.x - o.x) * r,
        y: (a.end.y - o.y) * r
      }, p = $.snapPointToWall(u, s, 0.75), c = $.snapPointToWall(d, s, 0.75), f = p && (!c || p.distance < c.distance) ? p : c;
      if (f && f.distance < 0.7) {
        const v = $.roundMeters(Math.min(Math.max(l, 0.73), 1.1)), h = $.roundMeters(f.offset);
        n.some(
          (k) => k.wallId === f.wall.id && Math.abs(k.offset - h) < 0.35
        ) || n.push({
          id: `op_door_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
          wallId: f.wall.id,
          type: "door",
          offset: h,
          width: v,
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
      }, u = {
        x: (a.end.x - o.x) * r,
        y: (a.end.y - o.y) * r
      }, d = { x: (l.x + u.x) / 2, y: (l.y + u.y) / 2 }, p = $.distance(l, u);
      if (p < 0.4 || p > 3) continue;
      const c = $.snapPointToWall(d, s, 0.6);
      if (c && c.distance < 0.5) {
        const f = a.isDoorHint ? "door" : p > 1.8 ? "french_window" : "window", v = $.roundMeters(c.offset);
        n.some(
          (g) => g.wallId === c.wall.id && Math.abs(g.offset - v) < 0.35
        ) || n.push({
          id: `op_${f}_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
          wallId: c.wall.id,
          type: f,
          offset: v,
          width: $.roundMeters(p),
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
  static detectRooms(e, i, s, o, r, n, a = !0) {
    const l = [], u = s.map((d) => ({
      text: d.text,
      position: {
        x: (d.position.x - o.x) * r,
        y: (d.position.y - o.y) * r
      }
    }));
    for (const d of e) {
      if (d.points.length < 3) continue;
      const p = d.points.map((g) => ({
        x: $.roundMeters((g.x - o.x) * r),
        y: $.roundMeters((g.y - o.y) * r)
      })), c = X.computeArea(p);
      if (c < 1.5 || c > 300) continue;
      let f = "";
      if (a) {
        for (const g of u)
          if (X.isPointInPolygon(g.position, p)) {
            f = g.text;
            break;
          }
      }
      if (!f && !d.isRoomHint) continue;
      const v = f || `Pièce ${l.length + 1}`, h = this.getRoomStyle(v);
      l.push({
        id: `room_svg_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
        name: v,
        polygon: p,
        areaM2: c,
        color: h.color,
        icon: h.icon,
        height: n
      });
    }
    if (l.length === 0 && u.length > 0 && i.length >= 4 && a)
      for (const d of u) {
        const p = d.text.toLowerCase();
        if (/salon|sejour|chambre|cuisine|sdb|bain|wc|bureau|entree|garage|couloir/i.test(p)) {
          const c = d.position.x, f = d.position.y, v = 1.8, h = [
            { x: $.roundMeters(c - v), y: $.roundMeters(f - v) },
            { x: $.roundMeters(c + v), y: $.roundMeters(f - v) },
            { x: $.roundMeters(c + v), y: $.roundMeters(f + v) },
            { x: $.roundMeters(c - v), y: $.roundMeters(f + v) }
          ], g = this.getRoomStyle(d.text);
          l.push({
            id: `room_svg_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
            name: d.text,
            polygon: h,
            areaM2: X.computeArea(h),
            color: g.color,
            icon: g.icon,
            height: n
          });
        }
      }
    return l;
  }
  /**
   * Associe un nom de pièce à une couleur thématique et une icône MDI
   */
  static getRoomStyle(e) {
    const i = e.toLowerCase();
    return /salon|sejour|living|sam|salle à manger/i.test(i) ? { color: "rgba(59, 130, 246, 0.28)", icon: "mdi:sofa" } : /chambre|bed|suite|parentale/i.test(i) ? { color: "rgba(139, 92, 246, 0.28)", icon: "mdi:bed" } : /cuisine|kitchen/i.test(i) ? { color: "rgba(245, 158, 11, 0.28)", icon: "mdi:silverware-fork-knife" } : /sdb|bain|douche|bath|eau/i.test(i) ? { color: "rgba(6, 182, 212, 0.28)", icon: "mdi:shower" } : /wc|toilet/i.test(i) ? { color: "rgba(16, 185, 129, 0.28)", icon: "mdi:toilet" } : /bureau|office|travail/i.test(i) ? { color: "rgba(99, 102, 241, 0.28)", icon: "mdi:desk" } : /entree|entrée|hall|couloir|degagement|dégagement/i.test(i) ? { color: "rgba(100, 116, 139, 0.28)", icon: "mdi:door" } : /garage|atelier/i.test(i) ? { color: "rgba(120, 113, 108, 0.28)", icon: "mdi:garage" } : /terrasse|balcon|patio/i.test(i) ? { color: "rgba(20, 184, 166, 0.28)", icon: "mdi:balcony" } : { color: "rgba(56, 189, 248, 0.25)", icon: "mdi:home-outline" };
  }
}
var ni = Object.defineProperty, ai = Object.getOwnPropertyDescriptor, H = (t, e, i, s) => {
  for (var o = s > 1 ? void 0 : s ? ai(e, i) : e, r = t.length - 1, n; r >= 0; r--)
    (n = t[r]) && (o = (s ? n(e, i, o) : n(o)) || o);
  return s && o && ni(e, i, o), o;
};
let B = class extends q {
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
  handleModalPaste(t) {
    var s;
    if (!t.clipboardData) return;
    const e = t.clipboardData.items;
    for (let o = 0; o < e.length; o++)
      if (e[o].type.indexOf("image") !== -1) {
        const r = e[o].getAsFile();
        if (r) {
          t.preventDefault(), this.processFile(r);
          return;
        }
      }
    const i = (s = t.clipboardData.getData("text/plain")) == null ? void 0 : s.trim();
    if (i && (i.startsWith("<svg") || i.startsWith("<?xml") && i.includes("<svg"))) {
      t.preventDefault(), this.processSvgText(i, "Plan SVG collé depuis le presse-papier");
      return;
    }
  }
  triggerFileInput() {
    if (!this.fileInputRef) {
      const t = document.createElement("input");
      t.type = "file", t.accept = "image/*,.svg", t.style.display = "none", t.addEventListener("change", (e) => {
        var s;
        const i = (s = e.target.files) == null ? void 0 : s[0];
        i && this.processFile(i);
      }), this.fileInputRef = t;
    }
    this.fileInputRef.click();
  }
  processFile(t) {
    if (this.imageName = t.name || "Plan importé", t.type === "image/svg+xml" || t.name.toLowerCase().endsWith(".svg")) {
      const i = new FileReader();
      i.onload = (s) => {
        var r;
        const o = (r = s.target) == null ? void 0 : r.result;
        this.processSvgText(o, t.name);
      }, i.readAsText(t);
    } else {
      this.isSvg = !1, this.svgRawText = null, this.svgInterpretResult = null;
      const i = new FileReader();
      i.onload = (s) => {
        var n;
        const o = (n = s.target) == null ? void 0 : n.result, r = new Image();
        r.onload = () => {
          this.imageDataUrl = o, this.imageWidth = r.naturalWidth, this.imageHeight = r.naturalHeight;
        }, r.src = o;
      }, i.readAsDataURL(t);
    }
  }
  processSvgText(t, e = "Plan SVG importé") {
    this.imageName = e, this.isSvg = !0, this.svgRawText = t, this.computeSvgInterpretation();
    const i = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(t);
    this.imageDataUrl = i;
    const s = new Image();
    s.onload = () => {
      var o, r;
      this.imageWidth = s.naturalWidth || ((o = this.svgInterpretResult) == null ? void 0 : o.viewBox.width) || 1e3, this.imageHeight = s.naturalHeight || ((r = this.svgInterpretResult) == null ? void 0 : r.viewBox.height) || 750;
    }, s.src = i;
  }
  computeSvgInterpretation() {
    this.svgRawText && (this.svgInterpretResult = ri.parseSvg(
      this.svgRawText,
      this.totalWidthMeters,
      0.2,
      2.5,
      this.importOptions
    ));
  }
  toggleImportCategory(t, e) {
    this.importOptions = {
      ...this.importOptions,
      [t]: e
    }, this.isSvg && this.computeSvgInterpretation();
  }
  handleDimensionChange(t) {
    this.totalWidthMeters = t > 0 ? t : 10, this.isSvg && this.computeSvgInterpretation();
  }
  handleDrop(t) {
    var e;
    if (t.preventDefault(), this.isDragOver = !1, (e = t.dataTransfer) != null && e.files && t.dataTransfer.files.length > 0) {
      const i = t.dataTransfer.files[0];
      this.processFile(i);
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
      if (navigator.clipboard && navigator.clipboard.readText) {
        const t = await navigator.clipboard.readText();
        if (t && (t.trim().startsWith("<svg") || t.trim().startsWith("<?xml") && t.includes("<svg"))) {
          this.processSvgText(t.trim(), "Plan SVG collé");
          return;
        }
      }
      if (navigator.clipboard && navigator.clipboard.read) {
        const t = await navigator.clipboard.read();
        for (const e of t) {
          const i = e.types.find((s) => s.startsWith("image/"));
          if (i) {
            const s = await e.getType(i), o = new File([s], "clipboard_image.png", { type: i });
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
    var e, i, s;
    if (!this.imageDataUrl) return;
    const t = this.isSvg && this.svgImportMode === "vectorize" && !!((e = this.svgInterpretResult) != null && e.success);
    this.dispatchEvent(new CustomEvent("import-confirmed", {
      detail: {
        dataUrl: this.imageDataUrl,
        widthPx: this.imageWidth || ((i = this.svgInterpretResult) == null ? void 0 : i.viewBox.width) || 1e3,
        heightPx: this.imageHeight || ((s = this.svgInterpretResult) == null ? void 0 : s.viewBox.height) || 750,
        opacity: this.opacity,
        mode: this.calibrateMode,
        totalWidthMeters: this.totalWidthMeters,
        targetLevel: this.currentLevel,
        isSvgVectorized: t,
        svgInterpretation: t ? this.svgInterpretResult : void 0,
        keepSvgBackground: this.keepSvgBackground
      },
      bubbles: !0,
      composed: !0
    }));
  }
  render() {
    var i, s;
    const t = this.isSvg && this.svgImportMode === "vectorize" && !!((i = this.svgInterpretResult) != null && i.success), e = (s = this.svgInterpretResult) == null ? void 0 : s.stats;
    return m`
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
          ${this.imageDataUrl ? m`
            <div class="preview-card">
              <img class="preview-thumb" src="${this.imageDataUrl}" alt="Aperçu du plan" />
              <div class="preview-meta">
                <div class="preview-title">
                  <span>✅</span>
                  <span>${this.imageName || "Plan sélectionné"}</span>
                  ${this.isSvg ? m`<span class="preview-badge-svg">SVG Vectoriel</span>` : null}
                </div>
                <div class="preview-dimensions">
                  Dimensions du plan : ${this.imageWidth} × ${this.imageHeight} px
                </div>
                <button class="btn-change-image" @click=${this.triggerFileInput}>
                  🔄 Remplacer le fichier
                </button>
              </div>
            </div>
          ` : m`
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
          ${this.isSvg ? m`
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

                    ${e ? m`
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
                            <span class="cat-count">(${e.wallCount})</span>
                          </label>

                          <label class="category-toggle ${this.importOptions.importDoors ? "active" : ""}">
                            <input 
                              type="checkbox" 
                              .checked=${this.importOptions.importDoors} 
                              @change=${(o) => this.toggleImportCategory("importDoors", o.target.checked)}
                            />
                            <span>🚪 Portes</span>
                            <span class="cat-count">(${e.doorCount})</span>
                          </label>

                          <label class="category-toggle ${this.importOptions.importWindows ? "active" : ""}">
                            <input 
                              type="checkbox" 
                              .checked=${this.importOptions.importWindows} 
                              @change=${(o) => this.toggleImportCategory("importWindows", o.target.checked)}
                            />
                            <span>🪟 Fenêtres</span>
                            <span class="cat-count">(${e.windowCount})</span>
                          </label>

                          <label class="category-toggle ${this.importOptions.importRooms ? "active" : ""}">
                            <input 
                              type="checkbox" 
                              .checked=${this.importOptions.importRooms} 
                              @change=${(o) => this.toggleImportCategory("importRooms", o.target.checked)}
                            />
                            <span>🏠 Pièces</span>
                            <span class="cat-count">(${e.roomCount})</span>
                          </label>

                          <label class="category-toggle ${this.importOptions.importLabels ? "active" : ""}">
                            <input 
                              type="checkbox" 
                              .checked=${this.importOptions.importLabels} 
                              @change=${(o) => this.toggleImportCategory("importLabels", o.target.checked)}
                            />
                            <span>🏷️ Noms</span>
                            <span class="cat-count">(${e.textLabelCount})</span>
                          </label>
                        </div>

                        ${e.ignoredMeasurementLinesCount > 0 ? m`
                          <div class="ignored-note">
                            ℹ️ ${e.ignoredMeasurementLinesCount} ligne(s) de cotation / pointillés ont été automatiquement ignorées (non transformées en murs).
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

                  ${this.calibrateMode === "auto_dimension" ? m`
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
              ${t ? null : m`
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
          ${!t || this.keepSvgBackground ? m`
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
            class="btn-confirm ${t ? "btn-magic" : ""}" 
            ?disabled=${!this.imageDataUrl} 
            @click=${this.confirmImport}
          >
            ${t ? m`
              <span>✨</span>
              <span>Convertir le plan SVG (${(e == null ? void 0 : e.wallCount) || 0} murs)</span>
            ` : m`
              <span>🚀</span>
              <span>Charger le plan</span>
            `}
          </button>
        </div>
      </div>
    `;
  }
};
B.styles = J`
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
  D({ type: String })
], B.prototype, "currentLevel", 2);
H([
  b()
], B.prototype, "imageDataUrl", 2);
H([
  b()
], B.prototype, "imageWidth", 2);
H([
  b()
], B.prototype, "imageHeight", 2);
H([
  b()
], B.prototype, "imageName", 2);
H([
  b()
], B.prototype, "isSvg", 2);
H([
  b()
], B.prototype, "svgRawText", 2);
H([
  b()
], B.prototype, "svgInterpretResult", 2);
H([
  b()
], B.prototype, "svgImportMode", 2);
H([
  b()
], B.prototype, "keepSvgBackground", 2);
H([
  b()
], B.prototype, "importOptions", 2);
H([
  b()
], B.prototype, "calibrateMode", 2);
H([
  b()
], B.prototype, "totalWidthMeters", 2);
H([
  b()
], B.prototype, "opacity", 2);
H([
  b()
], B.prototype, "isDragOver", 2);
B = H([
  Q("home-architect-import-modal")
], B);
var li = Object.defineProperty, di = Object.getOwnPropertyDescriptor, we = (t, e, i, s) => {
  for (var o = s > 1 ? void 0 : s ? di(e, i) : e, r = t.length - 1, n; r >= 0; r--)
    (n = t[r]) && (o = (s ? n(e, i, o) : n(o)) || o);
  return s && o && li(e, i, o), o;
};
let ae = class extends q {
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
    return m`
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
            ${this.openingCount > 0 ? m`
              <div class="impact-item">
                <span class="impact-icon">🚪</span>
                <span><strong>${this.openingCount} ouvertures</strong> : positions ajustées proportionnellement</span>
              </div>
            ` : null}
            ${this.roomCount > 0 ? m`
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
ae.styles = J`
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
we([
  D({ type: Number })
], ae.prototype, "measuredMeters", 2);
we([
  D({ type: Number })
], ae.prototype, "wallCount", 2);
we([
  D({ type: Number })
], ae.prototype, "roomCount", 2);
we([
  D({ type: Number })
], ae.prototype, "openingCount", 2);
we([
  b()
], ae.prototype, "targetMeters", 2);
we([
  b()
], ae.prototype, "adjustBackground", 2);
ae = we([
  Q("home-architect-rescale-modal")
], ae);
const ft = {
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
function ci(t, e) {
  return t.mdiIcon ? t.mdiIcon : t.icon && ft[t.icon] ? ft[t.icon] : t.icon && t.icon.startsWith("mdi:") ? t.icon : e;
}
function Z(t) {
  return JSON.stringify(t ?? "");
}
function pi(t) {
  return (t ?? "").replace(/[\r\n]+/g, " ").replace(/[#]/g, "");
}
class bt {
  /**
   * Génère la configuration YAML complète de la carte native 'picture-elements' de Home Assistant
   */
  static generatePictureElementsYaml(e, i) {
    let s = (i == null ? void 0 : i.imagePath) || `/local/plan_${e.id || "rdc"}.svg`;
    if (i != null && i.embedDataUri && (i != null && i.svgContent))
      try {
        const l = new TextEncoder().encode(i.svgContent);
        let u = "";
        for (let d = 0; d < l.length; d++)
          u += String.fromCharCode(l[d]);
        s = `data:image/svg+xml;base64,${btoa(u)}`;
      } catch {
        s = i.imagePath || `/local/plan_${e.id || "rdc"}.svg`;
      }
    const o = {
      title: e.name || "Plan Interactif",
      ...i,
      imagePath: s
    }, r = ke.calculateBoundingBox(e), n = e.bindings || [];
    let a = `# ========================================================
`;
    if (a += `# CARTE LOVELACE PICTURE-ELEMENTS (NATIVE HOME ASSISTANT)
`, a += `# Générée automatiquement par DomoLink Plan / Home Architect
`, a += `# ========================================================
`, a += `type: picture-elements
`, a += `title: ${Z(o.title)}
`, a += `image: ${Z(o.imagePath)}
`, a += `elements:
`, n.length === 0)
      return a += `  # Aucune entité liée pour le moment. Glissez-déposez des entités sur le plan !
`, a;
    for (const l of n) {
      const u = l.position || { x: 0, y: 0 }, { left: d, top: p } = ke.worldToPercentage(u, r), c = l.entityId || "sensor.unknown", f = c.split("."), v = f[0] || "sensor", h = (f[1] || "entity").replace(/_/g, " "), g = l.customName || h, k = pi(g), w = ci(l);
      if (v === "light")
        a += `  # 💡 Lumière : ${k}
`, a += `  - type: state-icon
`, a += `    entity: ${c}
`, w && (a += `    icon: ${w}
`), a += `    title: ${Z(g)}
`, a += `    tap_action:
`, a += `      action: toggle
`, a += `    hold_action:
`, a += `      action: more-info
`, a += `    style:
`, a += `      top: ${p}%
`, a += `      left: ${d}%
`, a += `      transform: translate(-50%, -50%)
`, a += `      --paper-item-icon-active-color: "#facc15"
`, a += `      --paper-item-icon-color: "#94a3b8"

`;
      else if (v === "binary_sensor") {
        const C = c.includes("presence") || c.includes("occupancy") || c.includes("radar") || c.includes("motion") || c.includes("mouvement");
        a += `  # 📡 ${C ? "Radar de Présence" : "Capteur"} : ${k}
`, a += `  - type: state-icon
`, a += `    entity: ${c}
`, w && (a += `    icon: ${w}
`), a += `    title: ${Z(g)}
`, a += `    tap_action:
`, a += `      action: more-info
`, a += `    style:
`, a += `      top: ${p}%
`, a += `      left: ${d}%
`, a += `      transform: translate(-50%, -50%)
`, a += `      --paper-item-icon-active-color: "#ef4444"
`, a += `      --paper-item-icon-color: "#10b981"

`;
      } else if (v === "sensor") {
        const C = c.includes("temp") || c.includes("temperature");
        a += `  # ${C ? "🌡️ Température" : "📊 Capteur"} : ${k}
`, a += `  - type: state-label
`, a += `    entity: ${c}
`, a += `    title: ${Z(g)}
`, a += `    tap_action:
`, a += `      action: more-info
`, a += `    style:
`, a += `      top: ${p}%
`, a += `      left: ${d}%
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
      } else v === "climate" ? (a += `  # ❄️ Climatisation / Thermostat : ${k}
`, a += `  - type: state-label
`, a += `    entity: ${c}
`, a += `    attribute: current_temperature
`, a += `    suffix: "°C"
`, a += `    title: ${Z(g)}
`, a += `    tap_action:
`, a += `      action: more-info
`, a += `    style:
`, a += `      top: ${p}%
`, a += `      left: ${d}%
`, a += `      transform: translate(-50%, -50%)
`, a += `      background: "rgba(15, 23, 42, 0.85)"
`, a += `      border: "1px solid rgba(245, 158, 11, 0.5)"
`, a += `      border-radius: "8px"
`, a += `      padding: "2px 8px"
`, a += `      font-size: "11px"
`, a += `      font-weight: "700"
`, a += `      color: "#f59e0b"
`, a += `      backdrop-filter: "blur(6px)"

`) : v === "switch" ? (a += `  # 🔌 Interrupteur / Prise : ${k}
`, a += `  - type: state-icon
`, a += `    entity: ${c}
`, w && (a += `    icon: ${w}
`), a += `    title: ${Z(g)}
`, a += `    tap_action:
`, a += `      action: toggle
`, a += `    hold_action:
`, a += `      action: more-info
`, a += `    style:
`, a += `      top: ${p}%
`, a += `      left: ${d}%
`, a += `      transform: translate(-50%, -50%)
`, a += `      --paper-item-icon-active-color: "#38bdf8"
`, a += `      --paper-item-icon-color: "#64748b"

`) : (a += `  # ⚡ Entité : ${k}
`, a += `  - type: state-icon
`, a += `    entity: ${c}
`, w && (a += `    icon: ${w}
`), a += `    title: ${Z(g)}
`, a += `    tap_action:
`, a += `      action: more-info
`, a += `    style:
`, a += `      top: ${p}%
`, a += `      left: ${d}%
`, a += `      transform: translate(-50%, -50%)

`);
    }
    return a;
  }
  /**
   * Génère la configuration YAML pour la carte Lovelace personnalisée intégrée 'home-architect-card'
   */
  static generateHomeArchitectCardYaml(e, i) {
    const s = {
      viewMode: "2d",
      title: e.name || "Plan de Maison",
      height: "520px",
      ...i
    };
    let o = `# ========================================================
`;
    return o += `# CARTE LOVELACE PERSONNALISÉE (HOME ARCHITECT CARD)
`, o += `# Rendu vectoriel direct 2D / 3D, états et clics en direct
`, o += `# ========================================================
`, o += `type: custom:home-architect-card
`, o += `project_id: ${Z(e.id || "rdc")}
`, o += `title: ${Z(s.title)}
`, o += `view_mode: ${s.viewMode || "2d"} # '2d' ou '3d'
`, o += `show_header: true
`, o += `height: ${Z(s.height)}
`, o;
  }
}
var hi = Object.defineProperty, ui = Object.getOwnPropertyDescriptor, oe = (t, e, i, s) => {
  for (var o = s > 1 ? void 0 : s ? ui(e, i) : e, r = t.length - 1, n; r >= 0; r--)
    (n = t[r]) && (o = (s ? n(e, i, o) : n(o)) || o);
  return s && o && hi(e, i, o), o;
};
let K = class extends q {
  constructor() {
    super(...arguments), this.activeTab = "picture_elements", this.imagePath = "", this.customCardViewMode = "2d", this.copiedToast = !1, this.syncStatus = "idle", this.syncErrorMsg = "", this.embedDataUri = !1;
  }
  connectedCallback() {
    var t;
    super.connectedCallback(), this.imagePath = `/local/plan_${((t = this.project) == null ? void 0 : t.id) || "rdc"}.svg`, this.autoSyncSvg();
  }
  async autoSyncSvg() {
    var t, e;
    if (!((t = this.hass) != null && t.callWS)) {
      this.syncStatus = "idle";
      return;
    }
    this.syncStatus = "syncing";
    try {
      const i = ke.exportToSvg(this.project, {
        includeRooms: !0,
        includeWalls: !0,
        includeOpenings: !0,
        includeFurniture: !0,
        includeRoomLabels: !0,
        includeEntityMarkers: !1,
        includeBackground: !0,
        backgroundColor: "#0f172a"
      }), s = `plan_${((e = this.project) == null ? void 0 : e.id) || "rdc"}.svg`, o = await this.hass.callWS({
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
  copyCode(t) {
    const e = () => {
      this.copiedToast = !0, setTimeout(() => {
        this.copiedToast = !1;
      }, 2500);
    };
    navigator.clipboard && typeof navigator.clipboard.writeText == "function" ? navigator.clipboard.writeText(t).then(e).catch((i) => {
      console.warn("navigator.clipboard.writeText rejected, attempting fallback:", i), this.copyFallback(t, e);
    }) : this.copyFallback(t, e);
  }
  copyFallback(t, e) {
    try {
      const i = document.createElement("textarea");
      i.value = t, i.style.position = "fixed", i.style.top = "0", i.style.left = "0", i.style.width = "2em", i.style.height = "2em", i.style.padding = "0", i.style.border = "none", i.style.outline = "none", i.style.boxShadow = "none", i.style.background = "transparent", i.style.opacity = "0", document.body.appendChild(i), i.focus(), i.select();
      const s = document.execCommand("copy");
      document.body.removeChild(i), s ? e() : prompt("Copiez le code YAML ci-dessous :", t);
    } catch (i) {
      console.error("Fallback copy failed:", i), prompt("Copiez le code YAML ci-dessous :", t);
    }
  }
  downloadSvg() {
    const t = ke.exportToSvg(this.project, {
      includeRooms: !0,
      includeWalls: !0,
      includeOpenings: !0,
      includeFurniture: !0,
      includeRoomLabels: !0,
      includeEntityMarkers: !1,
      includeBackground: !0,
      backgroundColor: "#0f172a"
    }), e = new Blob([t], { type: "image/svg+xml;charset=utf-8" }), i = URL.createObjectURL(e), s = document.createElement("a");
    s.href = i, s.download = `plan_${this.project.id || "rdc"}.svg`, document.body.appendChild(s), s.click(), document.body.removeChild(s), URL.revokeObjectURL(i);
  }
  downloadJson() {
    const t = JSON.stringify(this.project, null, 2), e = new Blob([t], { type: "application/json;charset=utf-8" }), i = URL.createObjectURL(e), s = document.createElement("a");
    s.href = i, s.download = `projet_plan_${this.project.id || "rdc"}.json`, document.body.appendChild(s), s.click(), document.body.removeChild(s), URL.revokeObjectURL(i);
  }
  getEntitySummary() {
    var a, l, u, d, p;
    const t = ((a = this.project) == null ? void 0 : a.bindings) || [], e = t.filter((c) => c.entityId.startsWith("light.")).length, i = t.filter((c) => c.entityId.startsWith("binary_sensor.")).length, s = t.filter((c) => c.entityId.startsWith("sensor.") || c.entityId.startsWith("climate.")).length, o = t.filter((c) => c.entityId.startsWith("switch.")).length, r = ((u = (l = this.project) == null ? void 0 : l.rooms) == null ? void 0 : u.length) || 0, n = ((p = (d = this.project) == null ? void 0 : d.furniture) == null ? void 0 : p.length) || 0;
    return { lights: e, radars: i, sensors: s, switches: o, rooms: r, furniture: n, total: t.length };
  }
  render() {
    var o, r, n;
    const t = this.getEntitySummary(), e = ke.exportToSvg(this.project, {
      includeRooms: !0,
      includeWalls: !0,
      includeOpenings: !0,
      includeFurniture: !0,
      includeRoomLabels: !0,
      includeEntityMarkers: !1,
      includeBackground: !0,
      backgroundColor: "#0f172a"
    }), i = bt.generatePictureElementsYaml(this.project, {
      imagePath: this.imagePath,
      title: this.project.name || "Plan Interactif",
      embedDataUri: this.embedDataUri,
      svgContent: e
    }), s = bt.generateHomeArchitectCardYaml(this.project, {
      viewMode: this.customCardViewMode,
      title: this.project.name || "Plan de Maison"
    });
    return m`
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
              <span><strong>${t.rooms}</strong> pièces</span>
            </div>
            <div class="stat-badge">
              <span>💡</span>
              <span><strong>${t.lights}</strong> lumière(s)</span>
            </div>
            <div class="stat-badge">
              <span>📡</span>
              <span><strong>${t.radars}</strong> radar(s) / présence</span>
            </div>
            <div class="stat-badge">
              <span>🌡️</span>
              <span><strong>${t.sensors}</strong> capteur(s) / temp.</span>
            </div>
            <div class="stat-badge">
              <span>🔌</span>
              <span><strong>${t.switches}</strong> prise(s) / switch</span>
            </div>
            ${t.furniture > 0 ? m`
              <div class="stat-badge">
                <span>🛋️</span>
                <span><strong>${t.furniture}</strong> meuble(s)</span>
              </div>
            ` : ""}
          </div>

          <!-- Onglet 1 : Carte Native picture-elements -->
          ${this.activeTab === "picture_elements" ? m`
            <!-- Bannière de synchronisation avec HA -->
            ${this.syncStatus === "success" ? m`
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
            ` : this.syncStatus === "syncing" ? m`
              <div class="sync-banner syncing">
                <span class="sync-icon">⏳</span>
                <div class="sync-text">
                  <div class="sync-title">Synchronisation automatique en cours avec Home Assistant...</div>
                  <div class="sync-desc">Enregistrement direct dans <code>/config/www/plan_${((r = this.project) == null ? void 0 : r.id) || "rdc"}.svg</code>.</div>
                </div>
              </div>
            ` : this.syncStatus === "error" ? m`
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
            ` : m`
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

            ${this.embedDataUri ? null : m`
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
                  ${this.syncStatus === "success" ? m`Le fichier SVG est <strong>déjà présent sur votre serveur Home Assistant</strong> (aucun transfert requis !).` : this.embedDataUri ? m`Le plan est <strong>100% intégré dans le YAML</strong> (aucun fichier externe n'est requis).` : m`Assurez-vous que le fichier <code>plan_${((n = this.project) == null ? void 0 : n.id) || "rdc"}.svg</code> est présent dans <code>/config/www/</code>.`}
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
          ${this.activeTab === "custom_card" ? m`
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
          ${this.activeTab === "raw_files" ? m`
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
        ${this.copiedToast ? m`
          <div class="copy-floating-toast">
            <span>✅</span>
            <span>Code YAML copié dans le presse-papier !</span>
          </div>
        ` : null}

        <!-- Pied de page -->
        <div class="modal-footer">
          <button class="btn-secondary" @click=${this.handleClose}>Fermer</button>
          ${this.activeTab !== "raw_files" ? m`
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
K.styles = J`
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
oe([
  D({ type: Object })
], K.prototype, "project", 2);
oe([
  D({ type: Object })
], K.prototype, "hass", 2);
oe([
  b()
], K.prototype, "activeTab", 2);
oe([
  b()
], K.prototype, "imagePath", 2);
oe([
  b()
], K.prototype, "customCardViewMode", 2);
oe([
  b()
], K.prototype, "copiedToast", 2);
oe([
  b()
], K.prototype, "syncStatus", 2);
oe([
  b()
], K.prototype, "syncErrorMsg", 2);
oe([
  b()
], K.prototype, "embedDataUri", 2);
K = oe([
  Q("home-architect-export-modal")
], K);
var gi = Object.defineProperty, fi = Object.getOwnPropertyDescriptor, ie = (t, e, i, s) => {
  for (var o = s > 1 ? void 0 : s ? fi(e, i) : e, r = t.length - 1, n; r >= 0; r--)
    (n = t[r]) && (o = (s ? n(e, i, o) : n(o)) || o);
  return s && o && gi(e, i, o), o;
};
const Le = [
  { id: "rdc", label: "RDC", icon: "🏠" },
  { id: "jardin", label: "Jardin", icon: "🌳" },
  { id: "sous-sol", label: "Sous-Sol", icon: "🏠" },
  { id: "etage1", label: "1er Étage", icon: "🏠" },
  { id: "etage2", label: "2ème Étage", icon: "🏠" },
  { id: "etage3", label: "3ème Étage", icon: "🏠" },
  { id: "autre", label: "Autre", icon: "📁" }
];
let Y = class extends q {
  constructor() {
    super(...arguments), this.initialTab = "save", this.activeTab = "save", this.planName = "", this.planCategory = "rdc", this.customCategoryName = "", this.savedProjects = [], this.isLoadingProjects = !1, this.searchQuery = "";
  }
  connectedCallback() {
    var t, e, i;
    super.connectedCallback(), this.activeTab = this.initialTab, this.planName = ((t = this.project) == null ? void 0 : t.name) || "Plan de Maison", this.planCategory = ((e = this.project) == null ? void 0 : e.category) || ((i = this.project) == null ? void 0 : i.id) || "rdc", Le.some((s) => s.id === this.planCategory) || (this.customCategoryName = this.planCategory, this.planCategory = "autre"), this.fetchSavedProjects();
  }
  async fetchSavedProjects() {
    this.isLoadingProjects = !0;
    const t = /* @__PURE__ */ new Map();
    if (this.hass && this.hass.callWS)
      try {
        const e = await this.hass.callWS({ type: "home_architect/get_projects" });
        if (e && e.projects && Array.isArray(e.projects))
          for (const i of e.projects)
            i && i.id && t.set(i.id, i);
      } catch (e) {
        console.warn("Erreur lecture projets HA websocket:", e);
      }
    try {
      for (let e = 0; e < localStorage.length; e++) {
        const i = localStorage.key(e);
        if (i && i.startsWith("home_architect_")) {
          const s = localStorage.getItem(i);
          if (s)
            try {
              const o = JSON.parse(s);
              o && o.id && !t.has(o.id) && t.set(o.id, o);
            } catch {
            }
        }
      }
    } catch {
    }
    this.savedProjects = Array.from(t.values()).sort((e, i) => {
      const s = new Date(e.updated_at || 0).getTime();
      return new Date(i.updated_at || 0).getTime() - s;
    }), this.isLoadingProjects = !1;
  }
  handleSave() {
    const t = this.planName.trim() || "Plan Sans Nom", e = this.planCategory === "autre" && this.customCategoryName.trim() ? this.customCategoryName.trim() : this.planCategory;
    this.dispatchEvent(new CustomEvent("save-confirmed", {
      detail: {
        name: t,
        category: e
      },
      bubbles: !0,
      composed: !0
    }));
  }
  handleLoadProject(t) {
    this.dispatchEvent(new CustomEvent("load-project", {
      detail: { project: t },
      bubbles: !0,
      composed: !0
    }));
  }
  async handleDeleteProject(t, e) {
    if (e.stopPropagation(), !!confirm("Êtes-vous sûr de vouloir supprimer ce plan sauvegardé ?")) {
      if (this.hass && this.hass.callWS)
        try {
          await this.hass.callWS({
            type: "home_architect/delete_project",
            project_id: t
          });
        } catch (i) {
          console.warn("Erreur suppression websocket:", i);
        }
      try {
        localStorage.removeItem(`home_architect_${t}`);
      } catch {
      }
      this.savedProjects = this.savedProjects.filter((i) => i.id !== t);
    }
  }
  handleClose() {
    this.dispatchEvent(new CustomEvent("close", { bubbles: !0, composed: !0 }));
  }
  formatDate(t) {
    if (!t) return "Date inconnue";
    try {
      return new Date(t).toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    } catch {
      return t;
    }
  }
  getCategoryItem(t) {
    return Le.find((e) => e.id === t) || { id: t || "autre", label: t || "Autre", icon: "📁" };
  }
  render() {
    var e, i, s, o, r, n, a, l, u, d;
    const t = this.savedProjects.filter((p) => {
      if (!this.searchQuery) return !0;
      const c = this.searchQuery.toLowerCase();
      return p.name && p.name.toLowerCase().includes(c) || p.category && p.category.toLowerCase().includes(c) || p.id && p.id.toLowerCase().includes(c);
    });
    return m`
      <div class="modal-card" @click=${(p) => p.stopPropagation()}>
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
          ${this.activeTab === "save" ? m`
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
                @input=${(p) => this.planName = p.target.value}
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
                ${Le.map((p) => m`
                  <div 
                    class="category-card ${this.planCategory === p.id ? "selected" : ""}"
                    @click=${() => this.planCategory = p.id}
                  >
                    <span class="cat-icon">${p.icon}</span>
                    <span>${p.label}</span>
                  </div>
                `)}
              </div>

              ${this.planCategory === "autre" ? m`
                <div style="margin-top: 8px;">
                  <input 
                    type="text" 
                    class="form-input" 
                    .value=${this.customCategoryName}
                    @input=${(p) => this.customCategoryName = p.target.value}
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
                <div class="metric-badge">🧱 <strong>${((i = (e = this.project) == null ? void 0 : e.walls) == null ? void 0 : i.length) || 0}</strong> mur(s)</div>
                <div class="metric-badge">📐 <strong>${((o = (s = this.project) == null ? void 0 : s.rooms) == null ? void 0 : o.length) || 0}</strong> pièce(s)</div>
                <div class="metric-badge">🚪 <strong>${((n = (r = this.project) == null ? void 0 : r.openings) == null ? void 0 : n.length) || 0}</strong> ouvrant(s)</div>
                <div class="metric-badge">⚡ <strong>${((l = (a = this.project) == null ? void 0 : a.bindings) == null ? void 0 : l.length) || 0}</strong> entité(s) HA</div>
                <div class="metric-badge">🛋️ <strong>${((d = (u = this.project) == null ? void 0 : u.furniture) == null ? void 0 : d.length) || 0}</strong> meuble(s)</div>
              </div>
            </div>
          ` : m`
            <!-- Liste Ouvrir / Recharger -->
            <div class="search-bar">
              <input 
                type="text" 
                class="form-input" 
                .value=${this.searchQuery}
                @input=${(p) => this.searchQuery = p.target.value}
                placeholder="🔍 Rechercher un plan par nom ou catégorie..."
              />
            </div>

            ${this.isLoadingProjects ? m`
              <div class="empty-state">
                <span>⏳ Chargement des plans sauvegardés...</span>
              </div>
            ` : t.length === 0 ? m`
              <div class="empty-state">
                <span class="empty-state-icon">📂</span>
                <span>Aucun plan sauvegardé trouvé.</span>
                <button class="btn-primary" style="margin-top: 6px;" @click=${() => this.activeTab = "save"}>
                  💾 Enregistrer le plan actuel
                </button>
              </div>
            ` : m`
              <div class="projects-list">
                ${t.map((p) => {
      var v, h, g, k, w, C;
      const c = this.getCategoryItem(p.category || p.id), f = p.id === ((v = this.project) == null ? void 0 : v.id);
      return m`
                    <div class="project-item ${f ? "current" : ""}">
                      <div class="project-info">
                        <div class="project-title-row">
                          <span class="project-cat-badge">
                            <span>${c.icon}</span>
                            <span>${c.label}</span>
                          </span>
                          <span class="project-name" title="${p.name}">${p.name || "Plan Sans Nom"}</span>
                          ${f ? m`<span style="font-size: 0.72rem; color: #38bdf8; font-weight: 700;">(Ouvert)</span>` : null}
                        </div>
                        <div class="project-meta-row">
                          <span>📅 Modifié le ${this.formatDate(p.updated_at)}</span>
                          <span>•</span>
                          <span>🧱 ${((h = p.walls) == null ? void 0 : h.length) || 0} murs</span>
                          <span>•</span>
                          <span>📐 ${((g = p.rooms) == null ? void 0 : g.length) || 0} pièces</span>
                          <span>•</span>
                          <span>🛋️ ${((k = p.furniture) == null ? void 0 : k.length) || 0} meuble${(((w = p.furniture) == null ? void 0 : w.length) || 0) > 1 ? "s" : ""}</span>
                          <span>•</span>
                          <span>⚡ ${((C = p.bindings) == null ? void 0 : C.length) || 0} capteurs</span>
                        </div>
                      </div>

                      <div class="project-actions">
                        <button class="btn-load" @click=${() => this.handleLoadProject(p)} title="Charger ce plan">
                          <span>⚡</span>
                          <span>Charger</span>
                        </button>
                        <button class="btn-delete" @click=${(x) => this.handleDeleteProject(p.id, x)} title="Supprimer ce plan">
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
          ${this.activeTab === "save" ? m`
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
Y.styles = J`
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
ie([
  D({ type: Object })
], Y.prototype, "project", 2);
ie([
  D({ type: Object })
], Y.prototype, "hass", 2);
ie([
  D({ type: String })
], Y.prototype, "initialTab", 2);
ie([
  b()
], Y.prototype, "activeTab", 2);
ie([
  b()
], Y.prototype, "planName", 2);
ie([
  b()
], Y.prototype, "planCategory", 2);
ie([
  b()
], Y.prototype, "customCategoryName", 2);
ie([
  b()
], Y.prototype, "savedProjects", 2);
ie([
  b()
], Y.prototype, "isLoadingProjects", 2);
ie([
  b()
], Y.prototype, "searchQuery", 2);
Y = ie([
  Q("home-architect-save-load-modal")
], Y);
var bi = Object.defineProperty, mi = Object.getOwnPropertyDescriptor, E = (t, e, i, s) => {
  for (var o = s > 1 ? void 0 : s ? mi(e, i) : e, r = t.length - 1, n; r >= 0; r--)
    (n = t[r]) && (o = (s ? n(e, i, o) : n(o)) || o);
  return s && o && bi(e, i, o), o;
};
const Te = {
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
let j = class extends q {
  constructor() {
    super(...arguments), this.narrow = !1, this.activeTool = "wall", this.currentThickness = 0.2, this.currentOpeningWidth = 0.9, this.doorFlipSide = !1, this.doorFlipDirection = !0, this.windowSashCount = 1, this.activeLevel = "rdc", this.showDimensions = !0, this.showThermalHeatmap = !1, this.showGhostLevel = !1, this.levelProjects = {}, this.is3DMode = !1, this.isFullscreen = !1, this.isDrawerCollapsed = !1, this.isWizardOpen = !1, this.isImportModalOpen = !1, this.isExportModalOpen = !1, this.isSaveLoadModalOpen = !1, this.isNewPlanModalOpen = !1, this.newPlanName = "Nouveau Plan", this.newPlanCategory = "rdc", this.isResetModalOpen = !1, this.saveLoadModalTab = "save", this.isCalibrateModalOpen = !1, this.calibrationData = null, this.isRescaleModalOpen = !1, this.rescaleMeasuredMeters = 0, this.selectedRoomForEdit = null, this.selectedElements = {
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
      bindings: [],
      furniture: [],
      category: "rdc"
    }, this.fileInputRef = null, this.toastMessage = null, this.toastTimeout = null, this._boundPaste = null, this._boundKeyDown = null, this._boundClickOutside = null, this._boundFullscreenChange = null, this._boundResize = null, this._boundDocumentClick = null, this._sidebarResizeObserver = null;
  }
  handleToolSelected(t) {
    this.activeTool = t.detail.tool, this.activeTool === "door" ? this.currentOpeningWidth = 0.9 : this.activeTool === "window" ? this.currentOpeningWidth = this.windowSashCount === 2 ? 1.4 : 0.9 : this.activeTool === "french_window" && (this.currentOpeningWidth = 2);
  }
  handleDoorConfigChanged(t) {
    if (this.doorFlipSide = t.detail.flipSide, this.doorFlipDirection = t.detail.flipDirection, this.activeTool = "door", this.selectedElements.openingIds.length > 0) {
      this.pushUndoSnapshot();
      let e = 0;
      const i = this.project.openings.map((s) => this.selectedElements.openingIds.includes(s.id) && s.type === "door" ? (e++, { ...s, flipSide: t.detail.flipSide, flipDirection: t.detail.flipDirection }) : s);
      e > 0 && (this.project = { ...this.project, openings: i }, this.showToast(`🚪 ${e} porte(s) mise(s) à jour`));
    }
  }
  handleWindowConfigChanged(t) {
    if (this.activeTool = t.detail.type, this.currentOpeningWidth = t.detail.width, this.windowSashCount = t.detail.sashCount, this.selectedElements.openingIds.length > 0) {
      this.pushUndoSnapshot();
      let e = 0;
      const i = this.project.openings.map((s) => this.selectedElements.openingIds.includes(s.id) && (s.type === "window" || s.type === "french_window") ? (e++, {
        ...s,
        type: t.detail.type,
        width: t.detail.width,
        sashCount: t.detail.sashCount
      }) : s);
      e > 0 && (this.project = { ...this.project, openings: i }, this.showToast(`🪟 ${e} fenêtre(s) mise(s) à jour`));
    }
  }
  handleWallThicknessChanged(t) {
    if (this.currentThickness = t.detail.thickness, this.activeTool = "wall", this.selectedElements.wallIds.length > 0) {
      this.pushUndoSnapshot();
      const e = this.project.walls.map((i) => this.selectedElements.wallIds.includes(i.id) ? { ...i, thickness: t.detail.thickness } : i);
      this.project = { ...this.project, walls: e }, this.showToast(`🧱 Épaisseur de ${this.selectedElements.wallIds.length} mur(s) mise à jour (${Math.round(t.detail.thickness * 100)} cm)`);
    }
  }
  updateSelectedDoorConfig(t, e) {
    this.pushUndoSnapshot(), this.doorFlipSide = t, this.doorFlipDirection = e;
    const i = this.project.openings.map((s) => this.selectedElements.openingIds.includes(s.id) && s.type === "door" ? { ...s, flipSide: t, flipDirection: e } : s);
    this.project = { ...this.project, openings: i }, this.showToast("🚪 Sens d'ouverture de porte mis à jour");
  }
  updateSelectedWindowConfig(t, e, i) {
    this.pushUndoSnapshot(), this.windowSashCount = e, this.currentOpeningWidth = i;
    const s = this.project.openings.map((o) => this.selectedElements.openingIds.includes(o.id) && (o.type === "window" || o.type === "french_window") ? { ...o, type: t, sashCount: e, width: i } : o);
    this.project = { ...this.project, openings: s }, this.showToast("🪟 Format de fenêtre mis à jour");
  }
  updateSelectedWallsThickness(t) {
    this.pushUndoSnapshot(), this.currentThickness = t;
    const e = this.project.walls.map((i) => this.selectedElements.wallIds.includes(i.id) ? { ...i, thickness: t } : i);
    this.project = { ...this.project, walls: e }, this.showToast(`🧱 Épaisseur de mur mise à jour (${Math.round(t * 100)} cm)`);
  }
  handleProjectChanged(t) {
    this.pushUndoSnapshot(), this.project = {
      ...t.detail.project,
      furniture: t.detail.project.furniture || []
    }, this.levelProjects[this.activeLevel] = { ...this.project };
  }
  handleThicknessChange(t) {
    this.currentThickness = parseFloat(t.target.value);
  }
  handleOpeningWidthChange(t) {
    this.currentOpeningWidth = parseFloat(t.target.value);
  }
  handleCreateRoomFromWizard(t) {
    this.pushUndoSnapshot();
    const { name: e, width: i, length: s, thickness: o, height: r, color: n, icon: a, addDoor: l, addWindow: u } = t.detail, d = r || 2.5, p = 2, c = 2, f = { x: p, y: c }, v = { x: p + i, y: c }, h = { x: p + i, y: c + s }, g = { x: p, y: c + s }, k = {
      id: `w_top_${Date.now()}`,
      start: f,
      end: v,
      thickness: o,
      height: d,
      type: "standard"
    }, w = {
      id: `w_right_${Date.now()}`,
      start: v,
      end: h,
      thickness: o,
      height: d,
      type: "standard"
    }, C = {
      id: `w_bottom_${Date.now()}`,
      start: h,
      end: g,
      thickness: o,
      height: d,
      type: "standard"
    }, x = {
      id: `w_left_${Date.now()}`,
      start: g,
      end: f,
      thickness: o,
      height: d,
      type: "standard"
    }, S = [];
    l && S.push({
      id: `op_door_${Date.now()}`,
      wallId: C.id,
      type: "door",
      offset: i / 2,
      width: 0.9,
      flipSide: !1,
      flipDirection: !1
    }), u && S.push({
      id: `op_win_${Date.now()}`,
      wallId: k.id,
      type: "window",
      offset: i / 2,
      width: 1.2,
      flipSide: !1,
      flipDirection: !1
    });
    const M = {
      id: `room_${Date.now()}`,
      name: e,
      polygon: [f, v, h, g],
      areaM2: i * s,
      color: n,
      icon: a,
      height: d
    };
    this.project = {
      ...this.project,
      walls: [...this.project.walls, k, w, C, x],
      openings: [...this.project.openings, ...S],
      rooms: [...this.project.rooms, M]
    }, this.isWizardOpen = !1, this.activeTool = "select";
  }
  updateSidebarOffset() {
    var i, s;
    if (this.isFullscreen) {
      this.style.setProperty("--ha-sidebar-width", "0px");
      return;
    }
    let t = 0;
    try {
      const o = document.querySelector("home-assistant"), r = (i = o == null ? void 0 : o.shadowRoot) == null ? void 0 : i.querySelector("home-assistant-main"), n = (s = r == null ? void 0 : r.shadowRoot) == null ? void 0 : s.querySelector("ha-sidebar");
      if (n) {
        const a = n.getBoundingClientRect();
        a.width > 0 && a.right > 0 && window.getComputedStyle(n).display !== "none" && (t = Math.round(a.width)), !this._sidebarResizeObserver && typeof ResizeObserver < "u" && (this._sidebarResizeObserver = new ResizeObserver(() => {
          this.updateSidebarOffset();
        }), this._sidebarResizeObserver.observe(n));
      }
    } catch {
    }
    if (t === 0)
      try {
        const o = document.querySelector("ha-sidebar");
        if (o) {
          const r = o.getBoundingClientRect();
          r.width > 0 && r.right > 0 && window.getComputedStyle(o).display !== "none" && (t = Math.round(r.width));
        }
      } catch {
      }
    if (t === 0)
      try {
        const o = getComputedStyle(document.documentElement), r = o.getPropertyValue("--app-drawer-width") || o.getPropertyValue("--mdc-drawer-width");
        if (r && r.trim().endsWith("px")) {
          const n = parseFloat(r);
          !isNaN(n) && n > 0 && (t = n);
        }
      } catch {
      }
    let e = 0;
    if (t > 0) {
      const o = this.getBoundingClientRect(), r = parseFloat(this.style.getPropertyValue("--ha-sidebar-width") || "0") || 0, n = o.left - r;
      n < t && (e = Math.max(0, t - Math.max(0, n)));
    }
    this.style.setProperty("--ha-sidebar-width", `${e}px`);
  }
  connectedCallback() {
    super.connectedCallback(), this._boundPaste = this.handlePaste.bind(this), window.addEventListener("paste", this._boundPaste), this._boundKeyDown = this.handleKeyDown.bind(this), window.addEventListener("keydown", this._boundKeyDown), this._boundClickOutside = (t) => {
      this.activeDropdown && (t.composedPath().some((s) => {
        var o;
        return (o = s == null ? void 0 : s.classList) == null ? void 0 : o.contains("dropdown-menu-wrapper");
      }) || (this.activeDropdown = null));
    }, window.addEventListener("click", this._boundClickOutside), this._boundFullscreenChange = () => {
      const t = !!(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement);
      this.isFullscreen = t, t ? this.classList.add("is-fullscreen") : this.classList.remove("is-fullscreen"), this.updateSidebarOffset();
    }, document.addEventListener("fullscreenchange", this._boundFullscreenChange), document.addEventListener("webkitfullscreenchange", this._boundFullscreenChange), document.addEventListener("mozfullscreenchange", this._boundFullscreenChange), document.addEventListener("MSFullscreenChange", this._boundFullscreenChange), this._boundResize = () => this.updateSidebarOffset(), window.addEventListener("resize", this._boundResize), this._boundDocumentClick = () => {
      setTimeout(() => this.updateSidebarOffset(), 50), setTimeout(() => this.updateSidebarOffset(), 320);
    }, document.addEventListener("click", this._boundDocumentClick, { passive: !0 }), this.updateSidebarOffset(), setTimeout(() => this.updateSidebarOffset(), 100);
  }
  async firstUpdated() {
    if (this.updateSidebarOffset(), this.hass && this.hass.callWS)
      try {
        const t = await this.hass.callWS({ type: "home_architect/get_projects" });
        if (t && t.projects && Array.isArray(t.projects)) {
          for (const e of t.projects)
            e && e.id && (this.levelProjects[e.id] = e);
          this.levelProjects[this.activeLevel] && (this.project = { ...this.levelProjects[this.activeLevel] });
        }
      } catch (t) {
        console.warn("Initial project load from HA websocket failed:", t);
      }
    if (!this.levelProjects[this.activeLevel]) {
      const t = localStorage.getItem(`home_architect_${this.activeLevel}`);
      if (t)
        try {
          const e = JSON.parse(t);
          e && e.id && (this.project = e, this.levelProjects[this.activeLevel] = e);
        } catch {
        }
    }
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._boundPaste && window.removeEventListener("paste", this._boundPaste), this._boundKeyDown && window.removeEventListener("keydown", this._boundKeyDown), this._boundClickOutside && window.removeEventListener("click", this._boundClickOutside), this._boundFullscreenChange && (document.removeEventListener("fullscreenchange", this._boundFullscreenChange), document.removeEventListener("webkitfullscreenchange", this._boundFullscreenChange), document.removeEventListener("mozfullscreenchange", this._boundFullscreenChange), document.removeEventListener("MSFullscreenChange", this._boundFullscreenChange)), this._boundResize && window.removeEventListener("resize", this._boundResize), this._boundDocumentClick && document.removeEventListener("click", this._boundDocumentClick), this._sidebarResizeObserver && (this._sidebarResizeObserver.disconnect(), this._sidebarResizeObserver = null), this.toastTimeout && clearTimeout(this.toastTimeout);
  }
  showToast(t) {
    this.toastMessage = t, this.toastTimeout && clearTimeout(this.toastTimeout), this.toastTimeout = setTimeout(() => {
      this.toastMessage = null;
    }, 4500);
  }
  loadBackgroundImage(t, e = "Plan chargé !") {
    const i = new Image();
    i.onload = () => {
      this.pushUndoSnapshot(), this.project = {
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
    this.pushUndoSnapshot();
    const {
      dataUrl: e,
      widthPx: i,
      heightPx: s,
      opacity: o,
      mode: r,
      totalWidthMeters: n,
      isSvgVectorized: a,
      svgInterpretation: l,
      keepSvgBackground: u
    } = t.detail;
    if (this.isImportModalOpen = !1, a && l && l.success) {
      const { walls: p, openings: c, rooms: f, pixelsPerMeter: v, stats: h } = l, g = u ? {
        imageUrl: e,
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
        pixelsPerMeter: v || this.project.pixelsPerMeter,
        walls: [...this.project.walls, ...p],
        openings: [...this.project.openings, ...c],
        rooms: [...this.project.rooms, ...f],
        background: g
      }, this.activeTool = "select", this.showToast(
        `✨ Plan SVG converti : ${h.wallCount} mur${h.wallCount > 1 ? "s" : ""}, ${h.doorCount} porte${h.doorCount > 1 ? "s" : ""}, ${h.windowCount} fenêtre${h.windowCount > 1 ? "s" : ""} et ${h.roomCount} pièce${h.roomCount > 1 ? "s" : ""} créés !`
      );
      return;
    }
    let d = this.project.pixelsPerMeter;
    r === "auto_dimension" && n && n > 0 && (d = Math.round(i / n * 10) / 10), this.project = {
      ...this.project,
      pixelsPerMeter: d,
      background: {
        imageUrl: e,
        opacity: o !== void 0 ? o : 0.4,
        visible: !0,
        offset: { x: 0, y: 0 },
        scale: 1,
        rotation: 0,
        widthPx: i,
        heightPx: s
      }
    }, r === "auto_dimension" ? (this.activeTool = "wall", this.showToast(`✅ Plan importé et étalonné automatiquement (1 m = ${d} px) ! Vous pouvez tracer vos murs (🧱).`)) : (this.activeTool = "calibrate", this.showToast("📏 Plan importé ! Tracez un segment sur un mur mesuré pour étalonner l'échelle."));
  }
  handlePaste(t) {
    var s;
    if (this.isImportModalOpen || !t.clipboardData) return;
    const e = t.clipboardData.items;
    for (let o = 0; o < e.length; o++)
      if (e[o].type.indexOf("image") !== -1) {
        const r = e[o].getAsFile();
        if (r) {
          t.preventDefault();
          const n = new FileReader();
          n.onload = (a) => {
            var u;
            const l = (u = a.target) == null ? void 0 : u.result;
            this.loadBackgroundImage(l, "📋 Image collée depuis le presse-papier !");
          }, n.readAsDataURL(r);
          return;
        }
      }
    const i = (s = t.clipboardData.getData("text/plain")) == null ? void 0 : s.trim();
    if (i && (i.startsWith("<svg") || i.startsWith("<?xml") && i.includes("<svg"))) {
      t.preventDefault(), this.isImportModalOpen = !0, this.showToast("📥 Code SVG détecté ! Configurez la vectorisation automatique.");
      return;
    }
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
    var s;
    const e = (s = t.target.files) == null ? void 0 : s[0];
    if (!e) return;
    const i = new FileReader();
    i.onload = (o) => {
      var n;
      const r = (n = o.target) == null ? void 0 : n.result;
      this.loadBackgroundImage(r, "🖼️ Image importée depuis votre ordinateur !");
    }, i.readAsDataURL(e);
  }
  handleRequestCalibration(t) {
    this.calibrationData = t.detail, this.isCalibrateModalOpen = !0;
  }
  handleCalibrateConfirmed(t) {
    this.pushUndoSnapshot();
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
    this.pushUndoSnapshot();
    const { currentMeters: e, targetMeters: i, scaleFactor: s, adjustBackground: o } = t.detail;
    if (this.isRescaleModalOpen = !1, s <= 0 || isNaN(s)) return;
    const r = this.project.walls.map((c) => ({
      ...c,
      start: {
        x: $.roundMeters(c.start.x * s),
        y: $.roundMeters(c.start.y * s)
      },
      end: {
        x: $.roundMeters(c.end.x * s),
        y: $.roundMeters(c.end.y * s)
      }
    })), n = this.project.openings.map((c) => ({
      ...c,
      offset: $.roundMeters(c.offset * s),
      width: $.roundMeters(c.width * s)
    })), a = this.project.rooms.map((c) => {
      const f = c.polygon.map((h) => ({
        x: $.roundMeters(h.x * s),
        y: $.roundMeters(h.y * s)
      })), v = X.computeArea(f);
      return {
        ...c,
        polygon: f,
        areaM2: v || $.roundMeters(c.areaM2 * s * s)
      };
    }), l = this.project.bindings.map((c) => ({
      ...c,
      position: {
        x: $.roundMeters(c.position.x * s),
        y: $.roundMeters(c.position.y * s)
      }
    })), u = (this.project.furniture || []).map((c) => ({
      ...c,
      position: {
        x: $.roundMeters(c.position.x * s),
        y: $.roundMeters(c.position.y * s)
      },
      width: $.roundMeters(c.width * s),
      length: $.roundMeters(c.length * s)
    }));
    let d = this.project.pixelsPerMeter, p = this.project.background ? { ...this.project.background } : void 0;
    o && p && (d = Math.round(this.project.pixelsPerMeter / s * 10) / 10, p.offset && (p = {
      ...p,
      offset: {
        x: $.roundMeters(p.offset.x * s),
        y: $.roundMeters(p.offset.y * s)
      }
    })), this.project = {
      ...this.project,
      pixelsPerMeter: d,
      walls: r,
      openings: n,
      rooms: a,
      bindings: l,
      furniture: u,
      background: p
    }, this.levelProjects[this.activeLevel] = { ...this.project }, this.activeTool = "select", this.showToast(
      `✅ Plan mis à l'échelle (×${s.toFixed(3)}) : ${r.length} murs et ${a.length} pièces recalculés !`
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
    this.pushUndoSnapshot();
    const { roomId: e, name: i, height: s, color: o } = t.detail, r = this.project.rooms.map((n) => n.id === e ? { ...n, name: i, height: s, color: o } : n);
    this.project = {
      ...this.project,
      rooms: r
    }, this.selectedRoomForEdit = null, this.showToast(`✨ Pièce "${i}" mise à jour (H: ${s.toFixed(2)} m) !`);
  }
  handleDeleteRoom(t) {
    this.pushUndoSnapshot();
    const { roomId: e } = t.detail;
    this.project = {
      ...this.project,
      rooms: this.project.rooms.filter((i) => i.id !== e)
    }, this.selectedRoomForEdit = null, this.showToast("🗑️ Pièce supprimée");
  }
  pushUndoSnapshot(t) {
    const e = JSON.parse(JSON.stringify(t || this.project));
    this.undoStack = [...this.undoStack.slice(-39), e], this.redoStack = [];
  }
  handleUndo() {
    if (this.undoStack.length === 0) return;
    const t = this.undoStack[this.undoStack.length - 1], e = this.undoStack.slice(0, -1), i = JSON.parse(JSON.stringify(this.project));
    this.redoStack = [...this.redoStack.slice(-39), i], this.undoStack = e, this.project = t, this.selectedElements = { wallIds: [], openingIds: [], roomIds: [], bindingIds: [] }, this.showToast("↩️ Action annulée");
  }
  handleRedo() {
    if (this.redoStack.length === 0) return;
    const t = this.redoStack[this.redoStack.length - 1], e = this.redoStack.slice(0, -1), i = JSON.parse(JSON.stringify(this.project));
    this.undoStack = [...this.undoStack.slice(-39), i], this.redoStack = e, this.project = t, this.selectedElements = { wallIds: [], openingIds: [], roomIds: [], bindingIds: [] }, this.showToast("↪️ Action rétablie");
  }
  getGhostProject() {
    if (!this.showGhostLevel) return null;
    let t = null;
    return this.activeLevel === "etage3" ? t = "etage2" : this.activeLevel === "etage2" ? t = "etage1" : this.activeLevel === "etage1" ? t = "rdc" : this.activeLevel === "rdc" && (t = "sous-sol"), t && this.levelProjects[t] || null;
  }
  handleLevelSwitch(t) {
    if (this.activeLevel !== t) {
      if (this.levelProjects[this.activeLevel] = { ...this.project }, this.activeLevel = t, this.levelProjects[t])
        this.project = { ...this.levelProjects[t] };
      else {
        const e = {
          "sous-sol": "Sous-Sol",
          rdc: "Rez-de-Chaussée",
          etage1: "1er Étage",
          etage2: "2ème Étage",
          etage3: "3ème Étage",
          jardin: "Jardin"
        };
        this.project = {
          id: t,
          name: e[t] || t,
          category: t,
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
        }, this.levelProjects[t] = { ...this.project };
      }
      this.undoStack = [], this.redoStack = [], this.clearSelection(), this.showToast(`Étage sélectionné : ${this.project.name}`);
    }
  }
  rotateSelectedFurniture() {
    if (!this.selectedElements.furnitureIds || this.selectedElements.furnitureIds.length === 0) return;
    this.pushUndoSnapshot();
    const t = this.selectedElements.furnitureIds, e = (this.project.furniture || []).map((i) => t.includes(i.id) ? {
      ...i,
      rotation: ((i.rotation || 0) + 90) % 360
    } : i);
    this.project = { ...this.project, furniture: e }, this.showToast("🔄 Meuble pivoté de 90°");
  }
  handleDeleteSelected() {
    const { wallIds: t, openingIds: e, roomIds: i, bindingIds: s, furnitureIds: o = [] } = this.selectedElements, r = t.length + e.length + i.length + s.length + o.length;
    if (r === 0) return;
    this.pushUndoSnapshot();
    const n = this.project.walls.filter((p) => !t.includes(p.id)), a = this.project.openings.filter(
      (p) => !e.includes(p.id) && !t.includes(p.wallId)
    ), l = this.project.rooms.filter((p) => !i.includes(p.id)), u = this.project.bindings.filter((p) => !s.includes(p.id)), d = (this.project.furniture || []).filter((p) => !o.includes(p.id));
    this.project = {
      ...this.project,
      walls: n,
      openings: a,
      rooms: l,
      bindings: u,
      furniture: d
    }, this.selectedElements = { wallIds: [], openingIds: [], roomIds: [], bindingIds: [], furnitureIds: [] }, this.showToast(`🗑️ ${r} élément${r > 1 ? "s" : ""} supprimé${r > 1 ? "s" : ""} !`);
  }
  clearSelection() {
    this.selectedElements = { wallIds: [], openingIds: [], roomIds: [], bindingIds: [], furnitureIds: [] };
  }
  getLevelLabel(t) {
    switch (t) {
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
        return t.toUpperCase();
    }
  }
  toggleDropdown(t, e) {
    e && e.stopPropagation(), this.activeDropdown = this.activeDropdown === t ? null : t;
  }
  getActiveTypology() {
    if (this.selectedTypologyTab)
      return this.selectedTypologyTab;
    if (this.selectedElements.bindingIds.length > 0) {
      const t = this.project.bindings.find((e) => e.id === this.selectedElements.bindingIds[0]);
      if (t) {
        const e = t.entityId.split(".")[0];
        if (Te[e]) return e;
      }
    }
    return "light";
  }
  updateSelectedBindingIcon(t, e) {
    if (!this.selectedElements.bindingIds || this.selectedElements.bindingIds.length === 0) return;
    this.pushUndoSnapshot();
    const i = this.selectedElements.bindingIds[0], s = this.project.bindings.map((o) => o.id === i ? { ...o, icon: t, mdiIcon: e } : o);
    this.project = { ...this.project, bindings: s }, this.showToast(`✨ Icône ${t} appliquée !`);
  }
  getSelectedSummary() {
    const t = [];
    if (this.selectedElements.wallIds.length > 0 && t.push(`${this.selectedElements.wallIds.length} mur${this.selectedElements.wallIds.length > 1 ? "s" : ""}`), this.selectedElements.openingIds.length > 0 && t.push(`${this.selectedElements.openingIds.length} ouvrant${this.selectedElements.openingIds.length > 1 ? "s" : ""}`), this.selectedElements.roomIds.length > 0 && t.push(`${this.selectedElements.roomIds.length} pièce${this.selectedElements.roomIds.length > 1 ? "s" : ""}`), this.selectedElements.bindingIds.length > 0)
      if (this.selectedElements.bindingIds.length === 1) {
        const e = this.project.bindings.find((i) => i.id === this.selectedElements.bindingIds[0]);
        t.push(e ? e.customName || e.entityId.split(".")[1] || e.entityId : "1 entité");
      } else
        t.push(`${this.selectedElements.bindingIds.length} entités`);
    return this.selectedElements.furnitureIds && this.selectedElements.furnitureIds.length > 0 && t.push(`${this.selectedElements.furnitureIds.length} meuble${this.selectedElements.furnitureIds.length > 1 ? "s" : ""}`), t.join(", ");
  }
  handleKeyDown(t) {
    var i, s, o, r;
    if (t.key === "Escape") {
      if (this.isNewPlanModalOpen) {
        this.isNewPlanModalOpen = !1;
        return;
      }
      if (this.isResetModalOpen) {
        this.isResetModalOpen = !1;
        return;
      }
      this.isFullscreen && this.toggleFullscreen(), this.activeDropdown && (this.activeDropdown = null), this.clearSelection();
      return;
    }
    const e = (s = (i = t.target) == null ? void 0 : i.tagName) == null ? void 0 : s.toLowerCase();
    e === "input" || e === "textarea" || (o = t.target) != null && o.isContentEditable || ((t.ctrlKey || t.metaKey) && t.key.toLowerCase() === "n" ? (t.preventDefault(), this.openNewPlanModal()) : (t.ctrlKey || t.metaKey) && t.key.toLowerCase() === "z" && !t.shiftKey ? (t.preventDefault(), this.handleUndo()) : (t.ctrlKey || t.metaKey) && (t.key.toLowerCase() === "y" || t.key.toLowerCase() === "z" && t.shiftKey) ? (t.preventDefault(), this.handleRedo()) : t.key === "Delete" || t.key === "Backspace" ? this.selectedElements.wallIds.length + this.selectedElements.openingIds.length + this.selectedElements.roomIds.length + this.selectedElements.bindingIds.length + (((r = this.selectedElements.furnitureIds) == null ? void 0 : r.length) || 0) > 0 && (t.preventDefault(), this.handleDeleteSelected()) : t.key.toLowerCase() === "r" ? this.selectedElements.furnitureIds && this.selectedElements.furnitureIds.length > 0 && (t.preventDefault(), this.rotateSelectedFurniture()) : t.key.toLowerCase() === "v" && (this.activeTool = "select"));
  }
  async toggleFullscreen() {
    const t = !!(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement);
    if (!this.isFullscreen && !t) {
      try {
        const e = this || document.documentElement;
        e.requestFullscreen ? await e.requestFullscreen() : e.webkitRequestFullscreen ? await e.webkitRequestFullscreen() : e.mozRequestFullScreen ? await e.mozRequestFullScreen() : e.msRequestFullscreen && await e.msRequestFullscreen();
      } catch (e) {
        console.warn("Mode plein écran natif indisponible, utilisation du mode étendu:", e);
      }
      this.isFullscreen = !0, this.classList.add("is-fullscreen"), this.updateSidebarOffset(), this.showToast("⛶ Mode plein écran activé (Échap pour sortir)");
    } else {
      try {
        const e = document;
        (e.fullscreenElement || e.webkitFullscreenElement || e.mozFullScreenElement || e.msFullscreenElement) && (e.exitFullscreen ? await e.exitFullscreen() : e.webkitExitFullscreen ? await e.webkitExitFullscreen() : e.mozCancelFullScreen ? await e.mozCancelFullScreen() : e.msExitFullscreen && await e.msExitFullscreen());
      } catch (e) {
        console.warn("Erreur lors de la sortie du mode plein écran:", e);
      }
      this.isFullscreen = !1, this.classList.remove("is-fullscreen"), this.updateSidebarOffset(), this.showToast("🗗 Sortie du plein écran");
    }
  }
  openNewPlanModal() {
    this.newPlanName = `Plan ${this.getLevelLabel(this.activeLevel)}`, this.newPlanCategory = this.activeLevel, this.isNewPlanModalOpen = !0, this.activeDropdown = null;
  }
  handleConfirmNewPlan() {
    this.pushUndoSnapshot();
    const t = this.newPlanName.trim() || "Nouveau Plan", e = this.newPlanCategory || "rdc", i = ["sous-sol", "rdc", "etage1", "etage2", "etage3", "jardin"], s = i.includes(e) ? e : `plan_${Date.now()}`;
    this.project = {
      id: s,
      name: t,
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
    }, i.includes(e) && (this.activeLevel = e), this.levelProjects[this.activeLevel] = { ...this.project }, this.clearSelection(), this.isNewPlanModalOpen = !1, this.showToast(`📄 Nouveau plan "${t}" créé avec succès !`), setTimeout(() => {
      var o, r;
      (r = (o = this.shadowRoot) == null ? void 0 : o.querySelector("home-architect-canvas")) == null || r.fitToScreen();
    }, 80);
  }
  openResetModal() {
    this.isResetModalOpen = !0, this.activeDropdown = null;
  }
  handleConfirmResetPlan() {
    this.pushUndoSnapshot(), this.project = {
      ...this.project,
      walls: [],
      openings: [],
      rooms: [],
      bindings: [],
      furniture: [],
      background: void 0,
      updated_at: (/* @__PURE__ */ new Date()).toISOString()
    }, this.levelProjects[this.activeLevel] = { ...this.project }, this.clearSelection(), this.isResetModalOpen = !1, this.showToast("🗑️ Plan effacé (Réinitialisé). Annulez avec Ctrl+Z si besoin."), setTimeout(() => {
      var t, e;
      (e = (t = this.shadowRoot) == null ? void 0 : t.querySelector("home-architect-canvas")) == null || e.fitToScreen();
    }, 80);
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
  async handleSaveConfirmed(t) {
    const { name: e, category: i } = t.detail, s = ["sous-sol", "rdc", "etage1", "etage2", "etage3", "jardin"];
    let o = this.project.id;
    if (s.includes(i) && (!o || s.includes(o)) ? o = i : o || (o = "plan_" + Date.now()), this.project = {
      ...this.project,
      id: o,
      name: e,
      category: i,
      furniture: this.project.furniture || [],
      updated_at: (/* @__PURE__ */ new Date()).toISOString()
    }, s.includes(i) && (this.activeLevel = i), this.levelProjects[this.activeLevel] = { ...this.project }, this.hass && this.hass.callWS)
      try {
        await this.hass.callWS({
          type: "home_architect/save_project",
          project: this.project
        }), this.showToast(`💾 Plan "${e}" (${i}) sauvegardé avec succès dans Home Assistant !`);
      } catch (r) {
        console.error("Erreur sauvegarde HA:", r);
        try {
          localStorage.setItem(`home_architect_${this.project.id}`, JSON.stringify(this.project)), this.showToast(`💾 Plan "${e}" sauvegardé localement (Mode hors-ligne).`);
        } catch (n) {
          console.error("Quota localStorage dépassé:", n), this.showToast("⚠️ Échec de la sauvegarde locale (quota dépassé). Réduisez la taille de l'image de fond.");
        }
      }
    else
      try {
        localStorage.setItem(`home_architect_${this.project.id}`, JSON.stringify(this.project)), this.showToast(`💾 Plan "${e}" sauvegardé localement !`);
      } catch (r) {
        console.error("Quota localStorage dépassé:", r), this.showToast("⚠️ Échec de la sauvegarde locale (quota dépassé). Réduisez la taille de l'image de fond.");
      }
    this.isSaveLoadModalOpen = !1;
  }
  handleLoadProject(t) {
    const e = t.detail.project;
    if (!e) return;
    this.pushUndoSnapshot(), this.project = {
      ...e,
      furniture: e.furniture || []
    };
    const i = e.category || e.id;
    i && ["sous-sol", "rdc", "etage1", "etage2", "etage3", "jardin"].includes(i) && (this.activeLevel = i), this.levelProjects[this.activeLevel] = { ...this.project }, this.undoStack = [], this.redoStack = [], this.clearSelection(), this.isSaveLoadModalOpen = !1, this.showToast(`📂 Plan "${e.name || e.id}" chargé avec succès !`);
  }
  render() {
    var e, i, s, o;
    const t = !!((e = this.project.background) != null && e.imageUrl);
    return m`
      <header class="top-bar">
        <div class="brand">
          <span class="brand-icon">
            <svg viewBox="0 0 512 512" width="28" height="28" style="vertical-align: middle; border-radius: 7px; overflow: hidden; box-shadow: 0 2px 8px rgba(56, 189, 248, 0.25);">
              <rect width="512" height="512" rx="108" fill="#0f172a" stroke="#38bdf8" stroke-width="14" />
              <g stroke="rgba(56, 189, 248, 0.15)" stroke-width="6">
                <line x1="0" y1="170" x2="512" y2="170" />
                <line x1="0" y1="340" x2="512" y2="340" />
                <line x1="170" y1="0" x2="170" y2="512" />
                <line x1="340" y1="0" x2="340" y2="512" />
              </g>
              <polygon points="120,310 256,230 392,310 256,390" fill="rgba(56, 189, 248, 0.15)" stroke="#38bdf8" stroke-width="8" stroke-dasharray="8,8" />
              <polygon points="120,310 120,250 256,170 256,230" fill="rgba(15, 23, 42, 0.9)" stroke="#38bdf8" stroke-width="10" stroke-linejoin="round" />
              <polygon points="256,230 256,170 392,250 392,310" fill="rgba(30, 41, 59, 0.9)" stroke="#0284c7" stroke-width="10" stroke-linejoin="round" />
              <polygon points="120,310 120,250 200,298 200,358" fill="rgba(30, 41, 59, 0.9)" stroke="#38bdf8" stroke-width="8" />
              <polygon points="200,358 200,298 256,330 256,390" fill="rgba(15, 23, 42, 0.9)" stroke="#38bdf8" stroke-width="8" />
              <line x1="195" y1="255" x2="235" y2="280" stroke="#f59e0b" stroke-width="5" stroke-dasharray="6,6" />
              <circle cx="195" cy="255" r="14" fill="#f59e0b" stroke="#ffffff" stroke-width="5" />
              <line x1="235" y1="280" x2="295" y2="245" stroke="#38bdf8" stroke-width="5" stroke-dasharray="6,6" />
              <circle cx="235" cy="280" r="18" fill="#06b6d4" stroke="#ffffff" stroke-width="6" />
              <circle cx="295" cy="245" r="14" fill="#38bdf8" stroke="#ffffff" stroke-width="5" />
            </svg>
          </span>
          <span>Home Architect</span>
          <span class="brand-tag">Studio</span>
        </div>

        <!-- 3 Menus Déroulants Principaux : Fichier, Plan, Pièce -->
        <div style="display: flex; align-items: center; gap: 8px;">
          <!-- 1. Menu Fichier (Ouvrir, Sauvegarder, Importer, Exporter) -->
          <div class="dropdown-menu-wrapper">
            <button class="btn-dropdown-trigger ${this.activeDropdown === "file" ? "active" : ""}" @click=${(r) => this.toggleDropdown("file", r)}>
              <span>📁</span>
              <span>Fichier</span>
              <span class="chevron">▾</span>
            </button>
            ${this.activeDropdown === "file" ? m`
              <div class="dropdown-menu-popup">
                <button class="dropdown-item" @click=${() => this.openNewPlanModal()}>
                  <span>📄</span>
                  <span>Nouveau plan...</span>
                </button>
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
                <div class="dropdown-divider"></div>
                <button class="dropdown-item danger" @click=${() => this.openResetModal()}>
                  <span>🗑️</span>
                  <span>Effacer le plan (Reset)...</span>
                </button>
              </div>
            ` : null}
          </div>

          <!-- 2. Menu Plan (Demande 4: Mettre à l'échelle, Vue 2D/3D, Assistant Pièce, Cotes, etc.) -->
          <div class="dropdown-menu-wrapper">
            <button class="btn-dropdown-trigger ${this.activeDropdown === "plan" ? "active" : ""}" @click=${(r) => this.toggleDropdown("plan", r)}>
              <span>📐</span>
              <span>Plan</span>
              <span class="chevron">▾</span>
            </button>
            ${this.activeDropdown === "plan" ? m`
              <div class="dropdown-menu-popup" style="min-width: 250px;">
                <button class="dropdown-item ${this.activeTool === "rescale" ? "active" : ""}" @click=${() => {
      this.activeTool = "rescale", this.activeDropdown = null;
    }}>
                  <span>📐</span>
                  <span>Mettre à l'échelle (S)</span>
                  ${this.activeTool === "rescale" ? m`<span class="dropdown-item-check">✓</span>` : null}
                </button>
                <button class="dropdown-item ${this.is3DMode ? "active" : ""}" @click=${() => {
      this.is3DMode = !this.is3DMode, this.activeDropdown = null;
    }}>
                  <span>${this.is3DMode ? "🧊" : "📐"}</span>
                  <span>${this.is3DMode ? "Vue 3D (Active)" : "Vue 2D / 3D"}</span>
                  ${this.is3DMode ? m`<span class="dropdown-item-check">✓</span>` : null}
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
                  ${this.showDimensions ? m`<span class="dropdown-item-check">✓</span>` : null}
                </button>
                <button class="dropdown-item ${this.showThermalHeatmap ? "active" : ""}" @click=${() => {
      this.showThermalHeatmap = !this.showThermalHeatmap;
    }}>
                  <span>🌡️</span>
                  <span>Carte thermique</span>
                  ${this.showThermalHeatmap ? m`<span class="dropdown-item-check">✓</span>` : null}
                </button>
                <button class="dropdown-item ${this.showGhostLevel ? "active" : ""}" @click=${() => {
      this.showGhostLevel = !this.showGhostLevel;
    }}>
                  <span>👁️</span>
                  <span>Filigrane niveau inf.</span>
                  ${this.showGhostLevel ? m`<span class="dropdown-item-check">✓</span>` : null}
                </button>
                <div class="dropdown-divider"></div>
                <button class="dropdown-item ${this.isFullscreen ? "active" : ""}" @click=${() => {
      this.toggleFullscreen(), this.activeDropdown = null;
    }}>
                  <span>${this.isFullscreen ? "🗗" : "⛶"}</span>
                  <span>${this.isFullscreen ? "Sortir du plein écran" : "Plein écran"}</span>
                  ${this.isFullscreen ? m`<span class="dropdown-item-check">✓</span>` : null}
                </button>
                <div class="dropdown-divider"></div>
                <button class="dropdown-item danger" @click=${() => this.openResetModal()}>
                  <span>🗑️</span>
                  <span>Effacer le plan (Reset)...</span>
                </button>
              </div>
            ` : null}
          </div>

          <!-- 3. Menu Pièce (Sous-Sol, RDC, 1er Étage, 2ème Étage, 3ème Étage, Jardin) -->
          <div class="dropdown-menu-wrapper">
            <button class="btn-dropdown-trigger ${this.activeDropdown === "level" ? "active" : ""}" @click=${(r) => this.toggleDropdown("level", r)}>
              <span>🏢</span>
              <span>Pièce : <strong>${this.getLevelLabel(this.activeLevel)}</strong></span>
              <span class="chevron">▾</span>
            </button>
            ${this.activeDropdown === "level" ? m`
              <div class="dropdown-menu-popup">
                <button class="dropdown-item ${this.activeLevel === "sous-sol" ? "active" : ""}" @click=${() => {
      this.handleLevelSwitch("sous-sol"), this.activeDropdown = null;
    }}>
                  <span>🏠</span>
                  <span>Sous-Sol</span>
                  ${this.activeLevel === "sous-sol" ? m`<span class="dropdown-item-check">✓</span>` : null}
                </button>
                <button class="dropdown-item ${this.activeLevel === "rdc" ? "active" : ""}" @click=${() => {
      this.handleLevelSwitch("rdc"), this.activeDropdown = null;
    }}>
                  <span>🏠</span>
                  <span>RDC (Rez-de-Chaussée)</span>
                  ${this.activeLevel === "rdc" ? m`<span class="dropdown-item-check">✓</span>` : null}
                </button>
                <button class="dropdown-item ${this.activeLevel === "etage1" ? "active" : ""}" @click=${() => {
      this.handleLevelSwitch("etage1"), this.activeDropdown = null;
    }}>
                  <span>🏠</span>
                  <span>1er Étage</span>
                  ${this.activeLevel === "etage1" ? m`<span class="dropdown-item-check">✓</span>` : null}
                </button>
                <button class="dropdown-item ${this.activeLevel === "etage2" ? "active" : ""}" @click=${() => {
      this.handleLevelSwitch("etage2"), this.activeDropdown = null;
    }}>
                  <span>🏠</span>
                  <span>2ème Étage</span>
                  ${this.activeLevel === "etage2" ? m`<span class="dropdown-item-check">✓</span>` : null}
                </button>
                <button class="dropdown-item ${this.activeLevel === "etage3" ? "active" : ""}" @click=${() => {
      this.handleLevelSwitch("etage3"), this.activeDropdown = null;
    }}>
                  <span>🏠</span>
                  <span>3ème Étage</span>
                  ${this.activeLevel === "etage3" ? m`<span class="dropdown-item-check">✓</span>` : null}
                </button>
                <button class="dropdown-item ${this.activeLevel === "jardin" ? "active" : ""}" @click=${() => {
      this.handleLevelSwitch("jardin"), this.activeDropdown = null;
    }}>
                  <span>🌳</span>
                  <span>Jardin</span>
                  ${this.activeLevel === "jardin" ? m`<span class="dropdown-item-check">✓</span>` : null}
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
          ${this.activeTool === "wall" ? m`
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
          ${this.activeTool === "door" || this.activeTool === "window" || this.activeTool === "french_window" ? m`
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
          ${this.is3DMode ? m`
            <div class="control-group" title="Hauteur sous plafond par défaut (3D)">
              <label>Plafond 3D :</label>
              <select @change=${(r) => this.handleDefaultCeilingChange(parseFloat(r.target.value))}>
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
          ${t ? m`
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

          <!-- Bouton Plein Écran -->
          <button 
            class="btn-fullscreen ${this.isFullscreen ? "active" : ""}" 
            @click=${() => this.toggleFullscreen()}
            title="${this.isFullscreen ? "Sortir du plein écran (Échap)" : "Passer en plein écran"}"
          >
            <span style="font-size: 1.05rem; line-height: 1;">${this.isFullscreen ? "🗗" : "⛶"}</span>
            <span>${this.isFullscreen ? "Sortir du plein écran" : "Plein écran"}</span>
          </button>

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
            @selection-changed=${(r) => {
      if (this.selectedElements = r.detail.selectedElements, this.selectedElements.bindingIds.length > 0) {
        const n = this.project.bindings.find((a) => a.id === this.selectedElements.bindingIds[0]);
        if (n) {
          const a = n.entityId.split(".")[0];
          Te[a] && (this.selectedTypologyTab = a);
        }
        this.isIconPickerOpen = !0;
      }
    }}
            @request-delete-selected=${this.handleDeleteSelected}
            @toggle-3d=${(r) => this.is3DMode = r.detail.is3DMode}
            @room-selected=${(r) => this.selectedRoomForEdit = r.detail.room}
            @project-changed=${this.handleProjectChanged}
            @request-calibration=${this.handleRequestCalibration}
            @request-rescale=${this.handleRequestRescale}
            @background-image-loaded=${(r) => this.loadBackgroundImage(r.detail.dataUrl, "🖼️ Image de plan glissée-déposée !")}
          ></home-architect-canvas>

          <!-- Floating HUD de sélection multi-éléments repositionné en bas -->
          ${(() => {
      var a, l;
      if (!(this.selectedElements.wallIds.length + this.selectedElements.openingIds.length + this.selectedElements.roomIds.length + this.selectedElements.bindingIds.length + (((a = this.selectedElements.furnitureIds) == null ? void 0 : a.length) || 0) > 0)) return null;
      const n = this.selectedElements.bindingIds.length > 0 ? this.project.bindings.find((u) => u.id === this.selectedElements.bindingIds[0]) : null;
      return m`
              <div class="selection-hud">
                <div class="selection-hud-main">
                  <span class="selection-info">
                    <span>🎯</span>
                    <span>${this.getSelectedSummary()}</span>
                  </span>

                  ${this.selectedElements.wallIds.length > 0 ? m`
                    <div class="hud-options-group">
                      <span class="hud-label">Épaisseur :</span>
                      <button class="hud-opt-btn ${this.currentThickness === 0.1 ? "active" : ""}" @click=${() => this.updateSelectedWallsThickness(0.1)} title="Cloison 10 cm">Fin 10cm</button>
                      <button class="hud-opt-btn ${this.currentThickness === 0.2 ? "active" : ""}" @click=${() => this.updateSelectedWallsThickness(0.2)} title="Standard 20 cm">Moyen 20cm</button>
                      <button class="hud-opt-btn ${this.currentThickness === 0.3 ? "active" : ""}" @click=${() => this.updateSelectedWallsThickness(0.3)} title="Porteur 30 cm">Gros 30cm</button>
                    </div>
                  ` : null}

                  ${this.selectedElements.openingIds.some((u) => {
        var d;
        return ((d = this.project.openings.find((p) => p.id === u)) == null ? void 0 : d.type) === "door";
      }) ? m`
                    <div class="hud-options-group">
                      <span class="hud-label">Porte :</span>
                      <button class="hud-opt-btn ${!this.doorFlipSide && this.doorFlipDirection ? "active" : ""}" @click=${() => this.updateSelectedDoorConfig(!1, !0)} title="Ouverture Droite Intérieure (Poussant Droit)">Droite Int.</button>
                      <button class="hud-opt-btn ${!this.doorFlipSide && !this.doorFlipDirection ? "active" : ""}" @click=${() => this.updateSelectedDoorConfig(!1, !1)} title="Ouverture Gauche Intérieure (Poussant Gauche)">Gauche Int.</button>
                      <button class="hud-opt-btn ${this.doorFlipSide && !this.doorFlipDirection ? "active" : ""}" @click=${() => this.updateSelectedDoorConfig(!0, !1)} title="Ouverture Gauche Extérieure (Tirant Gauche)">Gauche Ext.</button>
                      <button class="hud-opt-btn ${this.doorFlipSide && this.doorFlipDirection ? "active" : ""}" @click=${() => this.updateSelectedDoorConfig(!0, !0)} title="Ouverture Droite Extérieure (Tirant Droit)">Droite Ext.</button>
                    </div>
                  ` : null}

                  ${this.selectedElements.openingIds.some((u) => {
        const d = this.project.openings.find((p) => p.id === u);
        return d && (d.type === "window" || d.type === "french_window");
      }) ? m`
                    <div class="hud-options-group">
                      <span class="hud-label">Fenêtre :</span>
                      <button class="hud-opt-btn ${this.windowSashCount === 1 ? "active" : ""}" @click=${() => this.updateSelectedWindowConfig("window", 1, 0.9)} title="Fenêtre 1 ouvrant (90 cm)">1 Ouvrant</button>
                      <button class="hud-opt-btn ${this.windowSashCount === 2 ? "active" : ""}" @click=${() => this.updateSelectedWindowConfig("window", 2, 1.4)} title="Fenêtre 2 battants (1.40 m)">2 Battants</button>
                      <button class="hud-opt-btn" @click=${() => this.updateSelectedWindowConfig("french_window", 2, 2)} title="Baie vitrée coulissante (2.00 m)">Baie vitrée</button>
                    </div>
                  ` : null}

                  ${(((l = this.selectedElements.furnitureIds) == null ? void 0 : l.length) || 0) > 0 ? m`
                    <div class="hud-options-group">
                      <span class="hud-label">Meuble :</span>
                      <button class="hud-opt-btn active" @click=${this.rotateSelectedFurniture} title="Pivoter les meubles de 90° (Touche R)">🔄 Pivoter 90° (R)</button>
                    </div>
                  ` : null}

                  ${n ? m`
                    <div class="hud-options-group">
                      <button 
                        class="hud-opt-btn ${this.isIconPickerOpen ? "active" : ""}" 
                        @click=${() => this.isIconPickerOpen = !this.isIconPickerOpen}
                        title="Choisir l'icône pour le plan et la card Lovelace"
                      >
                        <span style="font-size: 1.05rem;">${n.icon || "🎨"}</span>
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
                ${n && this.isIconPickerOpen ? m`
                  <div class="hud-icon-picker-panel">
                    <div class="icon-category-tabs">
                      ${Object.entries(Te).map(([u, d]) => m`
                        <button 
                          class="icon-category-tab ${this.getActiveTypology() === u ? "active" : ""}"
                          @click=${() => this.selectedTypologyTab = u}
                        >
                          ${d.tabLabel}
                        </button>
                      `)}
                    </div>

                    <div class="icon-grid">
                      ${(Te[this.getActiveTypology()] || Te.light).icons.map((u) => m`
                        <button 
                          class="icon-item-btn ${n.icon === u.icon ? "active" : ""}"
                          @click=${() => this.updateSelectedBindingIcon(u.icon, u.mdi)}
                          title="${u.label} (${u.mdi})"
                        >
                          <span class="icon-item-emoji">${u.icon}</span>
                          <span>${u.label}</span>
                        </button>
                      `)}
                    </div>

                    <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px; font-size: 0.78rem; color: #94a3b8; border-top: 1px solid rgba(255, 255, 255, 0.08); padding-top: 4px;">
                      <span>Icône active : <strong style="color: #38bdf8;">${n.icon || "Défaut"}</strong> (${n.mdiIcon || "Automatique"})</span>
                      <div style="display: flex; align-items: center; gap: 4px;">
                        <span>Saisie libre :</span>
                        <input 
                          type="text" 
                          style="width: 55px; background: rgba(30, 41, 59, 0.9); border: 1px solid rgba(255, 255, 255, 0.2); border-radius: 6px; color: #fff; padding: 2px 4px; font-size: 0.85rem; text-align: center;" 
                          placeholder="Emoji"
                          maxlength="4"
                          @keydown=${(u) => {
        if (u.key === "Enter") {
          const d = u.target.value.trim();
          d && this.updateSelectedBindingIcon(d);
        }
      }}
                          @change=${(u) => {
        const d = u.target.value.trim();
        d && this.updateSelectedBindingIcon(d);
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
          ${this.toastMessage ? m`
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
      ${this.isImportModalOpen ? m`
        <home-architect-import-modal
          .currentLevel=${this.activeLevel}
          @import-confirmed=${this.handleImportConfirmed}
          @close=${() => this.isImportModalOpen = !1}
        ></home-architect-import-modal>
      ` : null}

      <!-- Modal Assistant Pièce Débutant -->
      ${this.isWizardOpen ? m`
        <home-architect-wizard-modal
          @create-room=${this.handleCreateRoomFromWizard}
          @close=${() => this.isWizardOpen = !1}
        ></home-architect-wizard-modal>
      ` : null}

      <!-- Modal Propriétés de la Pièce (Hauteur sous plafond 3D, etc.) -->
      ${this.selectedRoomForEdit ? m`
        <home-architect-room-modal
          .room=${this.selectedRoomForEdit}
          @save-room=${this.handleSaveRoom}
          @delete-room=${this.handleDeleteRoom}
          @close=${() => this.selectedRoomForEdit = null}
        ></home-architect-room-modal>
      ` : null}

      <!-- Modal Étalonnage Mesure de Mur -->
      ${this.isCalibrateModalOpen && this.calibrationData ? m`
        <home-architect-calibrate-modal
          .pixelDistance=${this.calibrationData.pixelDistance}
          .defaultMeters=${this.calibrationData.defaultMeters}
          @calibrate-confirmed=${this.handleCalibrateConfirmed}
          @close=${() => this.isCalibrateModalOpen = !1}
        ></home-architect-calibrate-modal>
      ` : null}

      <!-- Modal Mettre à l'échelle (Recalcul de toutes les cotes) -->
      ${this.isRescaleModalOpen ? m`
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
      ${this.isExportModalOpen ? m`
        <home-architect-export-modal
          .project=${this.project}
          .hass=${this.hass}
          @close=${() => this.isExportModalOpen = !1}
        ></home-architect-export-modal>
      ` : null}

      <!-- Modal Sauvegarder & Recharger un Plan -->
      ${this.isSaveLoadModalOpen ? m`
        <home-architect-save-load-modal
          .hass=${this.hass}
          .project=${this.project}
          .initialTab=${this.saveLoadModalTab}
          @save-confirmed=${this.handleSaveConfirmed}
          @load-project=${this.handleLoadProject}
          @close=${() => this.isSaveLoadModalOpen = !1}
        ></home-architect-save-load-modal>
      ` : null}

      <!-- Modal Nouveau Plan -->
      ${this.isNewPlanModalOpen ? m`
        <div class="modal-backdrop" @click=${(r) => {
      r.target === r.currentTarget && (this.isNewPlanModalOpen = !1);
    }}>
          <div class="modal-dialog">
            <div class="modal-dialog-header">
              <div class="modal-dialog-title-group">
                <span class="modal-dialog-icon">📄</span>
                <div>
                  <h3 class="modal-dialog-title">Nouveau Plan</h3>
                  <p class="modal-dialog-subtitle">Créer une feuille de dessin vierge</p>
                </div>
              </div>
              <button class="btn-dialog-close" @click=${() => this.isNewPlanModalOpen = !1}>✕</button>
            </div>
            <div class="modal-dialog-body">
              <div class="dialog-form-group">
                <label class="dialog-label">Nom du plan :</label>
                <input
                  type="text"
                  class="dialog-input"
                  .value=${this.newPlanName}
                  @input=${(r) => this.newPlanName = r.target.value}
                  placeholder="Ex: Mon Appartement, RDC..."
                  autofocus
                />
              </div>

              <div class="dialog-form-group">
                <label class="dialog-label">Catégorie / Niveau :</label>
                <div class="category-grid">
                  ${Le.map((r) => m`
                    <button
                      type="button"
                      class="category-btn ${this.newPlanCategory === r.id ? "active" : ""}"
                      @click=${() => this.newPlanCategory = r.id}
                    >
                      <span>${r.icon}</span>
                      <span>${r.label}</span>
                    </button>
                  `)}
                </div>
              </div>
            </div>
            <div class="modal-dialog-footer">
              <button class="btn-dialog-cancel" @click=${() => this.isNewPlanModalOpen = !1}>Annuler</button>
              <button class="btn-dialog-confirm primary" @click=${() => this.handleConfirmNewPlan()}>
                <span>✨</span>
                <span>Créer le plan</span>
              </button>
            </div>
          </div>
        </div>
      ` : null}

      <!-- Modal Effacer le Plan (Reset) -->
      ${this.isResetModalOpen ? m`
        <div class="modal-backdrop" @click=${(r) => {
      r.target === r.currentTarget && (this.isResetModalOpen = !1);
    }}>
          <div class="modal-dialog danger">
            <div class="modal-dialog-header danger">
              <div class="modal-dialog-title-group">
                <span class="modal-dialog-icon">🗑️</span>
                <div>
                  <h3 class="modal-dialog-title" style="color: #f87171;">Effacer le Plan</h3>
                  <p class="modal-dialog-subtitle">Réinitialisation de l'espace de travail</p>
                </div>
              </div>
              <button class="btn-dialog-close" @click=${() => this.isResetModalOpen = !1}>✕</button>
            </div>
            <div class="modal-dialog-body">
              <p style="color: #f1f5f9; margin: 0; line-height: 1.5; font-size: 0.92rem;">
                Êtes-vous sûr de vouloir <strong>effacer tout le contenu</strong> du plan actuel
                (<strong>${this.project.name || this.getLevelLabel(this.activeLevel)}</strong>) ?
              </p>

              <div class="reset-summary-box">
                <div>🧱 <strong>Murs :</strong> ${this.project.walls.length}</div>
                <div>🚪 <strong>Ouvrants :</strong> ${this.project.openings.length}</div>
                <div>🏷️ <strong>Pièces :</strong> ${this.project.rooms.length}</div>
                <div>⚡ <strong>Entités HA :</strong> ${this.project.bindings.length}</div>
                <div>🛋️ <strong>Meubles :</strong> ${((s = this.project.furniture) == null ? void 0 : s.length) || 0}</div>
                <div>🖼️ <strong>Image de fond :</strong> ${(o = this.project.background) != null && o.imageUrl ? "Oui" : "Non"}</div>
              </div>

              <p style="color: #94a3b8; font-size: 0.8rem; margin: 0;">
                ℹ️ Cette action est réversible avec le bouton Annuler (Ctrl+Z).
              </p>
            </div>
            <div class="modal-dialog-footer">
              <button class="btn-dialog-cancel" @click=${() => this.isResetModalOpen = !1}>Annuler</button>
              <button class="btn-dialog-confirm danger" @click=${() => this.handleConfirmResetPlan()}>
                <span>🗑️</span>
                <span>Effacer tout</span>
              </button>
            </div>
          </div>
        </div>
      ` : null}
    `;
  }
};
j.styles = J`
    :host {
      display: flex;
      flex-direction: column;
      position: absolute;
      top: 0;
      bottom: 0;
      left: var(--ha-sidebar-width, 0px);
      right: 0;
      height: 100%;
      max-height: 100%;
      overflow: hidden;
      background: #0f172a;
      color: #f8fafc;
      font-family: var(--ha-font-family, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif);
      box-sizing: border-box;
      transition: left 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    }

    :host(.is-fullscreen) {
      position: fixed !important;
      inset: 0 !important;
      top: 0 !important;
      left: 0 !important;
      right: 0 !important;
      bottom: 0 !important;
      width: 100vw !important;
      height: 100vh !important;
      max-width: 100vw !important;
      max-height: 100vh !important;
      z-index: 99999 !important;
      transition: none !important;
    }

    :host:fullscreen, :host:-webkit-full-screen {
      width: 100vw !important;
      height: 100vh !important;
      background: #0f172a !important;
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

    button.btn-fullscreen {
      background: rgba(14, 165, 233, 0.15);
      color: #38bdf8;
      border: 1px solid rgba(56, 189, 248, 0.35);
      border-radius: 8px;
      padding: 6px 12px;
      font-size: 0.85rem;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
      transition: all 0.2s ease;
      white-space: nowrap;
    }

    button.btn-fullscreen:hover {
      background: #0284c7;
      color: #ffffff;
      border-color: #38bdf8;
      box-shadow: 0 0 12px rgba(56, 189, 248, 0.45);
    }

    button.btn-fullscreen.active {
      background: rgba(16, 185, 129, 0.2);
      color: #34d399;
      border-color: #10b981;
      box-shadow: 0 0 12px rgba(16, 185, 129, 0.35);
    }

    button.btn-fullscreen.active:hover {
      background: #059669;
      color: #ffffff;
      border-color: #34d399;
      box-shadow: 0 0 14px rgba(16, 185, 129, 0.5);
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

    /* Modales Nouveau Plan & Reset */
    .modal-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(15, 23, 42, 0.85);
      backdrop-filter: blur(12px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 120;
      animation: modalFadeIn 0.2s ease-out;
    }

    @keyframes modalFadeIn {
      from { opacity: 0; transform: scale(0.98); }
      to { opacity: 1; transform: scale(1); }
    }

    .modal-dialog {
      background: #1e293b;
      border: 1px solid rgba(56, 189, 248, 0.35);
      border-radius: 16px;
      width: 520px;
      max-width: 92vw;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.75), 0 0 30px rgba(56, 189, 248, 0.2);
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }

    .modal-dialog.danger {
      border-color: rgba(239, 68, 68, 0.4);
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.75), 0 0 30px rgba(239, 68, 68, 0.2);
    }

    .modal-dialog-header {
      padding: 16px 20px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: rgba(15, 23, 42, 0.6);
    }

    .modal-dialog-header.danger {
      background: rgba(239, 68, 68, 0.08);
      border-bottom-color: rgba(239, 68, 68, 0.2);
    }

    .modal-dialog-title-group {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .modal-dialog-icon {
      font-size: 1.5rem;
    }

    .modal-dialog-title {
      font-size: 1.15rem;
      font-weight: 700;
      color: #f1f5f9;
      margin: 0;
    }

    .modal-dialog-subtitle {
      font-size: 0.8rem;
      color: #94a3b8;
      margin: 2px 0 0 0;
    }

    .btn-dialog-close {
      background: transparent;
      border: none;
      color: #94a3b8;
      font-size: 1.2rem;
      cursor: pointer;
      padding: 4px;
      border-radius: 6px;
      transition: all 0.15s ease;
    }

    .btn-dialog-close:hover {
      color: #ffffff;
      background: rgba(255, 255, 255, 0.1);
    }

    .modal-dialog-body {
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .dialog-form-group {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .dialog-label {
      font-size: 0.84rem;
      font-weight: 600;
      color: #cbd5e1;
    }

    .dialog-input {
      background: rgba(15, 23, 42, 0.8);
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 8px;
      padding: 10px 14px;
      font-size: 0.92rem;
      color: #f8fafc;
      outline: none;
      transition: border-color 0.2s ease;
    }

    .dialog-input:focus {
      border-color: #38bdf8;
      box-shadow: 0 0 0 2px rgba(56, 189, 248, 0.2);
    }

    .category-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
      gap: 8px;
    }

    .category-btn {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      padding: 8px 6px;
      background: rgba(15, 23, 42, 0.6);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 8px;
      color: #94a3b8;
      cursor: pointer;
      transition: all 0.15s ease;
      font-size: 0.8rem;
    }

    .category-btn:hover {
      background: rgba(51, 65, 85, 0.5);
      color: #f1f5f9;
    }

    .category-btn.active {
      background: rgba(56, 189, 248, 0.2);
      border-color: #38bdf8;
      color: #38bdf8;
      font-weight: 600;
    }

    .reset-summary-box {
      background: rgba(15, 23, 42, 0.7);
      border: 1px solid rgba(239, 68, 68, 0.2);
      border-radius: 10px;
      padding: 12px 16px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
      font-size: 0.85rem;
      color: #e2e8f0;
    }

    .modal-dialog-footer {
      padding: 14px 20px;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 10px;
      background: rgba(15, 23, 42, 0.4);
    }

    .btn-dialog-cancel {
      padding: 8px 16px;
      background: transparent;
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 8px;
      color: #cbd5e1;
      font-size: 0.88rem;
      cursor: pointer;
      transition: all 0.15s ease;
    }

    .btn-dialog-cancel:hover {
      background: rgba(255, 255, 255, 0.08);
      color: #ffffff;
    }

    .btn-dialog-confirm {
      padding: 8px 18px;
      border: none;
      border-radius: 8px;
      font-size: 0.88rem;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
      transition: all 0.15s ease;
    }

    .btn-dialog-confirm.primary {
      background: #0284c7;
      color: #ffffff;
      box-shadow: 0 4px 12px rgba(2, 132, 199, 0.35);
    }

    .btn-dialog-confirm.primary:hover {
      background: #0369a1;
    }

    .btn-dialog-confirm.danger {
      background: #ef4444;
      color: #ffffff;
      box-shadow: 0 4px 12px rgba(239, 68, 68, 0.35);
    }

    .btn-dialog-confirm.danger:hover {
      background: #dc2626;
    }

    .dropdown-item.danger:hover {
      background: rgba(239, 68, 68, 0.15);
      color: #f87171;
    }
  `;
E([
  D({ type: Object })
], j.prototype, "hass", 2);
E([
  D({ type: Boolean })
], j.prototype, "narrow", 2);
E([
  b()
], j.prototype, "activeTool", 2);
E([
  b()
], j.prototype, "currentThickness", 2);
E([
  b()
], j.prototype, "currentOpeningWidth", 2);
E([
  b()
], j.prototype, "doorFlipSide", 2);
E([
  b()
], j.prototype, "doorFlipDirection", 2);
E([
  b()
], j.prototype, "windowSashCount", 2);
E([
  b()
], j.prototype, "activeLevel", 2);
E([
  b()
], j.prototype, "showDimensions", 2);
E([
  b()
], j.prototype, "showThermalHeatmap", 2);
E([
  b()
], j.prototype, "showGhostLevel", 2);
E([
  b()
], j.prototype, "levelProjects", 2);
E([
  b()
], j.prototype, "is3DMode", 2);
E([
  b()
], j.prototype, "isFullscreen", 2);
E([
  b()
], j.prototype, "isDrawerCollapsed", 2);
E([
  b()
], j.prototype, "isWizardOpen", 2);
E([
  b()
], j.prototype, "isImportModalOpen", 2);
E([
  b()
], j.prototype, "isExportModalOpen", 2);
E([
  b()
], j.prototype, "isSaveLoadModalOpen", 2);
E([
  b()
], j.prototype, "isNewPlanModalOpen", 2);
E([
  b()
], j.prototype, "newPlanName", 2);
E([
  b()
], j.prototype, "newPlanCategory", 2);
E([
  b()
], j.prototype, "isResetModalOpen", 2);
E([
  b()
], j.prototype, "saveLoadModalTab", 2);
E([
  b()
], j.prototype, "isCalibrateModalOpen", 2);
E([
  b()
], j.prototype, "calibrationData", 2);
E([
  b()
], j.prototype, "isRescaleModalOpen", 2);
E([
  b()
], j.prototype, "rescaleMeasuredMeters", 2);
E([
  b()
], j.prototype, "selectedRoomForEdit", 2);
E([
  b()
], j.prototype, "selectedElements", 2);
E([
  b()
], j.prototype, "activeDropdown", 2);
E([
  b()
], j.prototype, "selectedTypologyTab", 2);
E([
  b()
], j.prototype, "isIconPickerOpen", 2);
E([
  b()
], j.prototype, "undoStack", 2);
E([
  b()
], j.prototype, "redoStack", 2);
E([
  b()
], j.prototype, "project", 2);
E([
  b()
], j.prototype, "toastMessage", 2);
j = E([
  Q("home-architect-panel")
], j);
var xi = Object.defineProperty, vi = Object.getOwnPropertyDescriptor, Ae = (t, e, i, s) => {
  for (var o = s > 1 ? void 0 : s ? vi(e, i) : e, r = t.length - 1, n; r >= 0; r--)
    (n = t[r]) && (o = (s ? n(e, i, o) : n(o)) || o);
  return s && o && xi(e, i, o), o;
};
let ve = class extends q {
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
  setConfig(t) {
    if (!t) throw new Error("Configuration invalide");
    this.config = t, this.is3DMode = t.view_mode === "3d", t.height && this.style.setProperty("--card-custom-height", t.height);
  }
  getCardSize() {
    return 6;
  }
  firstUpdated() {
    this.loadProject();
  }
  updated(t) {
    super.updated(t), t.has("hass") && !this._projectLoaded && this.hass && (this._projectLoaded = !0, this.loadProject());
  }
  async loadProject() {
    var i, s;
    const t = ((i = this.config) == null ? void 0 : i.project_id) || "rdc";
    if (this.hass && this.hass.callWS)
      try {
        const o = await this.hass.callWS({ type: "home_architect/get_projects" }), r = (s = o == null ? void 0 : o.projects) == null ? void 0 : s.find((n) => n.id === t);
        if (r) {
          this.project = r;
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
  handleMoreInfo(t) {
    const e = new CustomEvent("hass-more-info", {
      detail: t.detail,
      bubbles: !0,
      composed: !0
    });
    this.dispatchEvent(e);
  }
  render() {
    var e, i;
    const t = ((e = this.config) == null ? void 0 : e.show_header) !== !1;
    return m`
      ${t ? m`
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
ve.styles = J`
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
Ae([
  D({ type: Object })
], ve.prototype, "hass", 2);
Ae([
  b()
], ve.prototype, "config", 2);
Ae([
  b()
], ve.prototype, "project", 2);
Ae([
  b()
], ve.prototype, "is3DMode", 2);
ve = Ae([
  Q("home-architect-card")
], ve);
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
