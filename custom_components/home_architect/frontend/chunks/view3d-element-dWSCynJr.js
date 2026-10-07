import{aI as bh,aJ as _c,aK as xc,O as Eh,aL as ei,C as vc,aM as Th,aN as Ah,aO as wh,i as Rh,aP as zo,ay as Ch,aQ as Ph,aR as Dh,aS as Ho,aT as Lh,aU as Ih,a as Uh,aV as Nh,A as Fh,aH as Oh,k as Go,aW as Bh,aX as kh,aY as zh,aZ as Vo,n as Oe,p as Hh}from"./version-C1mT_xZ1.js";const ro="186",wi={ROTATE:0,DOLLY:1,PAN:2},Ti={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Gh=0,Wo=1,Vh=2,Vs=1,Mc=2,qi=3,ni=0,We=1,pn=2,Rn=0,$i=1,Xo=2,Yo=3,qo=4,Wh=5,Ei=100,Xh=101,Yh=102,qh=103,Zh=104,Kh=200,$h=201,Jh=202,Qh=203,Sc=204,yc=205,jh=206,tu=207,eu=208,nu=209,iu=210,su=211,ru=212,au=213,ou=214,ha=0,ua=1,da=2,Ji=3,fa=4,pa=5,ma=6,ga=7,ao=0,lu=1,cu=2,xn=0,bc=1,Ec=2,Tc=3,Ac=4,wc=5,Rc=6,Cc=7,Pc=300,ii=301,Di=302,xr=303,vr=304,cr=306,Qi=1e3,wn=1001,_a=1002,Ee=1003,hu=1004,fs=1005,De=1006,Mr=1007,Qn=1008,Ze=1009,Dc=1010,Lc=1011,ji=1012,oo=1013,vn=1014,mn=1015,Mn=1016,lo=1017,co=1018,ts=1020,Ic=35902,Uc=35899,Nc=1021,Fc=1022,an=1023,Dn=1026,jn=1027,Oc=1028,ho=1029,si=1030,uo=1031,fo=1033,Ws=33776,Xs=33777,Ys=33778,qs=33779,xa=35840,va=35841,Ma=35842,Sa=35843,ya=36196,ba=37492,Ea=37496,Ta=37488,Aa=37489,Js=37490,wa=37491,Ra=37808,Ca=37809,Pa=37810,Da=37811,La=37812,Ia=37813,Ua=37814,Na=37815,Fa=37816,Oa=37817,Ba=37818,ka=37819,za=37820,Ha=37821,Ga=36492,Va=36494,Wa=36495,Xa=36283,Ya=36284,Qs=36285,qa=36286,uu=3200,Za=0,du=1,Hn="",Ge="srgb",js="srgb-linear",tr="linear",Qt="srgb",Sr=7680,fu=519,pu=512,mu=513,gu=514,po=515,_u=516,xu=517,mo=518,vu=519,Mu=35044,Zo="300 es",gn=2e3,es=2001;function Su(n){for(let t=n.length-1;t>=0;--t)if(n[t]>=65535)return!0;return!1}function er(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function yu(){const n=er("canvas");return n.style.display="block",n}const Ko={};function $o(...n){const t="THREE."+n.shift();console.log(t,...n)}function Bc(n){const t=n[0];if(typeof t=="string"&&t.startsWith("TSL:")){const e=n[1];e&&e.isStackTrace?n[0]+=" "+e.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function Pt(...n){n=Bc(n);const t="THREE."+n.shift();{const e=n[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...n)}}function Yt(...n){n=Bc(n);const t="THREE."+n.shift();{const e=n[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...n)}}function Ri(...n){const t=n.join(" ");t in Ko||(Ko[t]=!0,Pt(...n))}function bu(n,t,e){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(t,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:i()}}setTimeout(r,e)})}const Eu={[ha]:ua,[da]:ma,[fa]:ga,[Ji]:pa,[ua]:ha,[ma]:da,[ga]:fa,[pa]:Ji};class Wn{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){const i=this._listeners;return i===void 0?!1:i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){const i=this._listeners;if(i===void 0)return;const s=i[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const i=e[t.type];if(i!==void 0){t.target=this;const s=i.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,t);t.target=null}}}const Ce=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Zs=Math.PI/180,Ka=180/Math.PI;function os(){const n=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Ce[n&255]+Ce[n>>8&255]+Ce[n>>16&255]+Ce[n>>24&255]+"-"+Ce[t&255]+Ce[t>>8&255]+"-"+Ce[t>>16&15|64]+Ce[t>>24&255]+"-"+Ce[e&63|128]+Ce[e>>8&255]+"-"+Ce[e>>16&255]+Ce[e>>24&255]+Ce[i&255]+Ce[i>>8&255]+Ce[i>>16&255]+Ce[i>>24&255]).toLowerCase()}function Ht(n,t,e){return Math.max(t,Math.min(e,n))}function Tu(n,t){return(n%t+t)%t}function yr(n,t,e){return(1-e)*n+e*t}function Oi(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:case Uint8ClampedArray:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function ze(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const Au={DEG2RAD:Zs},Eo=class Eo{constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,i=this.y,s=t.elements;return this.x=s[0]*e+s[3]*i+s[6],this.y=s[1]*e+s[4]*i+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Ht(this.x,t.x,e.x),this.y=Ht(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=Ht(this.x,t,e),this.y=Ht(this.y,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ht(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(Ht(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const i=Math.cos(e),s=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*i-a*s+t.x,this.y=r*s+a*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Eo.prototype.isVector2=!0;let Ct=Eo;class Gn{constructor(t=0,e=0,i=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=s}static slerpFlat(t,e,i,s,r,a,o){let l=i[s+0],c=i[s+1],u=i[s+2],d=i[s+3],h=r[a+0],m=r[a+1],g=r[a+2],v=r[a+3];if(d!==v||l!==h||c!==m||u!==g){let p=l*h+c*m+u*g+d*v;p<0&&(h=-h,m=-m,g=-g,v=-v,p=-p);let f=1-o;if(p<.9995){const E=Math.acos(p),A=Math.sin(E);f=Math.sin(f*E)/A,o=Math.sin(o*E)/A,l=l*f+h*o,c=c*f+m*o,u=u*f+g*o,d=d*f+v*o}else{l=l*f+h*o,c=c*f+m*o,u=u*f+g*o,d=d*f+v*o;const E=1/Math.sqrt(l*l+c*c+u*u+d*d);l*=E,c*=E,u*=E,d*=E}}t[e]=l,t[e+1]=c,t[e+2]=u,t[e+3]=d}static multiplyQuaternionsFlat(t,e,i,s,r,a){const o=i[s],l=i[s+1],c=i[s+2],u=i[s+3],d=r[a],h=r[a+1],m=r[a+2],g=r[a+3];return t[e]=o*g+u*d+l*m-c*h,t[e+1]=l*g+u*h+c*d-o*m,t[e+2]=c*g+u*m+o*h-l*d,t[e+3]=u*g-o*d-l*h-c*m,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,s){return this._x=t,this._y=e,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const i=t._x,s=t._y,r=t._z,a=t._order,o=Math.cos,l=Math.sin,c=o(i/2),u=o(s/2),d=o(r/2),h=l(i/2),m=l(s/2),g=l(r/2);switch(a){case"XYZ":this._x=h*u*d+c*m*g,this._y=c*m*d-h*u*g,this._z=c*u*g+h*m*d,this._w=c*u*d-h*m*g;break;case"YXZ":this._x=h*u*d+c*m*g,this._y=c*m*d-h*u*g,this._z=c*u*g-h*m*d,this._w=c*u*d+h*m*g;break;case"ZXY":this._x=h*u*d-c*m*g,this._y=c*m*d+h*u*g,this._z=c*u*g+h*m*d,this._w=c*u*d-h*m*g;break;case"ZYX":this._x=h*u*d-c*m*g,this._y=c*m*d+h*u*g,this._z=c*u*g-h*m*d,this._w=c*u*d+h*m*g;break;case"YZX":this._x=h*u*d+c*m*g,this._y=c*m*d+h*u*g,this._z=c*u*g-h*m*d,this._w=c*u*d-h*m*g;break;case"XZY":this._x=h*u*d-c*m*g,this._y=c*m*d-h*u*g,this._z=c*u*g+h*m*d,this._w=c*u*d+h*m*g;break;default:Pt("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const i=e/2,s=Math.sin(i);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,i=e[0],s=e[4],r=e[8],a=e[1],o=e[5],l=e[9],c=e[2],u=e[6],d=e[10],h=i+o+d;if(h>0){const m=.5/Math.sqrt(h+1);this._w=.25/m,this._x=(u-l)*m,this._y=(r-c)*m,this._z=(a-s)*m}else if(i>o&&i>d){const m=2*Math.sqrt(1+i-o-d);this._w=(u-l)/m,this._x=.25*m,this._y=(s+a)/m,this._z=(r+c)/m}else if(o>d){const m=2*Math.sqrt(1+o-i-d);this._w=(r-c)/m,this._x=(s+a)/m,this._y=.25*m,this._z=(l+u)/m}else{const m=2*Math.sqrt(1+d-i-o);this._w=(a-s)/m,this._x=(r+c)/m,this._y=(l+u)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<1e-8?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Ht(this.dot(t),-1,1)))}rotateTowards(t,e){const i=this.angleTo(t);if(i===0)return this;const s=Math.min(1,e/i);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const i=t._x,s=t._y,r=t._z,a=t._w,o=e._x,l=e._y,c=e._z,u=e._w;return this._x=i*u+a*o+s*c-r*l,this._y=s*u+a*l+r*o-i*c,this._z=r*u+a*c+i*l-s*o,this._w=a*u-i*o-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){let i=t._x,s=t._y,r=t._z,a=t._w,o=this.dot(t);o<0&&(i=-i,s=-s,r=-r,a=-a,o=-o);let l=1-e;if(o<.9995){const c=Math.acos(o),u=Math.sin(c);l=Math.sin(l*c)/u,e=Math.sin(e*c)/u,this._x=this._x*l+i*e,this._y=this._y*l+s*e,this._z=this._z*l+r*e,this._w=this._w*l+a*e,this._onChangeCallback()}else this._x=this._x*l+i*e,this._y=this._y*l+s*e,this._z=this._z*l+r*e,this._w=this._w*l+a*e,this.normalize();return this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const To=class To{constructor(t=0,e=0,i=0){this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Jo.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Jo.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*i+r[6]*s,this.y=r[1]*e+r[4]*i+r[7]*s,this.z=r[2]*e+r[5]*i+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,i=this.y,s=this.z,r=t.elements,a=1/(r[3]*e+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*i+r[8]*s+r[12])*a,this.y=(r[1]*e+r[5]*i+r[9]*s+r[13])*a,this.z=(r[2]*e+r[6]*i+r[10]*s+r[14])*a,this}applyQuaternion(t){const e=this.x,i=this.y,s=this.z,r=t.x,a=t.y,o=t.z,l=t.w,c=2*(a*s-o*i),u=2*(o*e-r*s),d=2*(r*i-a*e);return this.x=e+l*c+a*d-o*u,this.y=i+l*u+o*c-r*d,this.z=s+l*d+r*u-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*i+r[8]*s,this.y=r[1]*e+r[5]*i+r[9]*s,this.z=r[2]*e+r[6]*i+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Ht(this.x,t.x,e.x),this.y=Ht(this.y,t.y,e.y),this.z=Ht(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=Ht(this.x,t,e),this.y=Ht(this.y,t,e),this.z=Ht(this.z,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ht(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const i=t.x,s=t.y,r=t.z,a=e.x,o=e.y,l=e.z;return this.x=s*l-r*o,this.y=r*a-i*l,this.z=i*o-s*a,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return br.copy(this).projectOnVector(t),this.sub(br)}reflect(t){return this.sub(br.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(Ht(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y,s=this.z-t.z;return e*e+i*i+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){const s=Math.sin(e)*t;return this.x=s*Math.sin(i),this.y=Math.cos(e)*t,this.z=s*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};To.prototype.isVector3=!0;let D=To;const br=new D,Jo=new Gn,Ao=class Ao{constructor(t,e,i,s,r,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,a,o,l,c)}set(t,e,i,s,r,a,o,l,c){const u=this.elements;return u[0]=t,u[1]=s,u[2]=o,u[3]=e,u[4]=r,u[5]=l,u[6]=i,u[7]=a,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,s=e.elements,r=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],u=i[4],d=i[7],h=i[2],m=i[5],g=i[8],v=s[0],p=s[3],f=s[6],E=s[1],A=s[4],S=s[7],y=s[2],T=s[5],R=s[8];return r[0]=a*v+o*E+l*y,r[3]=a*p+o*A+l*T,r[6]=a*f+o*S+l*R,r[1]=c*v+u*E+d*y,r[4]=c*p+u*A+d*T,r[7]=c*f+u*S+d*R,r[2]=h*v+m*E+g*y,r[5]=h*p+m*A+g*T,r[8]=h*f+m*S+g*R,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],u=t[8];return e*a*u-e*o*c-i*r*u+i*o*l+s*r*c-s*a*l}invert(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],u=t[8],d=u*a-o*c,h=o*l-u*r,m=c*r-a*l,g=e*d+i*h+s*m;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/g;return t[0]=d*v,t[1]=(s*c-u*i)*v,t[2]=(o*i-s*a)*v,t[3]=h*v,t[4]=(u*e-s*l)*v,t[5]=(s*r-o*e)*v,t[6]=m*v,t[7]=(i*l-c*e)*v,t[8]=(a*e-i*r)*v,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,s,r,a,o){const l=Math.cos(r),c=Math.sin(r);return this.set(i*l,i*c,-i*(l*a+c*o)+a+t,-s*c,s*l,-s*(-c*a+l*o)+o+e,0,0,1),this}scale(t,e){return Ri("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Er.makeScale(t,e)),this}rotate(t){return Ri("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Er.makeRotation(-t)),this}translate(t,e){return Ri("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Er.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,i=t.elements;for(let s=0;s<9;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}};Ao.prototype.isMatrix3=!0;let Lt=Ao;const Er=new Lt,Qo=new Lt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),jo=new Lt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function wu(){const n={enabled:!0,workingColorSpace:js,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===Qt&&(s.r=Cn(s.r),s.g=Cn(s.g),s.b=Cn(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===Qt&&(s.r=Ci(s.r),s.g=Ci(s.g),s.b=Ci(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Hn?tr:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return Ri("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return Ri("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(s,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[js]:{primaries:t,whitePoint:i,transfer:tr,toXYZ:Qo,fromXYZ:jo,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Ge},outputColorSpaceConfig:{drawingBufferColorSpace:Ge}},[Ge]:{primaries:t,whitePoint:i,transfer:Qt,toXYZ:Qo,fromXYZ:jo,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Ge}}}),n}const Vt=wu();function Cn(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Ci(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let li;class Ru{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let i;if(t instanceof HTMLCanvasElement)i=t;else{li===void 0&&(li=er("canvas")),li.width=t.width,li.height=t.height;const s=li.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),i=li}return i.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=er("canvas");e.width=t.width,e.height=t.height;const i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);const s=i.getImageData(0,0,t.width,t.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Cn(r[a]/255)*255;return i.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(Cn(e[i]/255)*255):e[i]=Cn(e[i]);return{data:e,width:t.width,height:t.height}}else return Pt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Cu=0;class go{constructor(t=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Cu++}),this.uuid=os(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Tr(s[a].image)):r.push(Tr(s[a]))}else r=Tr(s);i.url=r}return e||(t.images[this.uuid]=i),i}}function Tr(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Ru.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(Pt("Texture: Unable to serialize Texture."),{})}let Pu=0;const Ar=new D;class Ae extends Wn{constructor(t=Ae.DEFAULT_IMAGE,e=Ae.DEFAULT_MAPPING,i=wn,s=wn,r=De,a=Qn,o=an,l=Ze,c=Ae.DEFAULT_ANISOTROPY,u=Hn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Pu++}),this.uuid=os(),this.name="",this.source=new go(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Ct(0,0),this.repeat=new Ct(1,1),this.center=new Ct(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Lt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Ar).x}get height(){return this.source.getSize(Ar).y}get depth(){return this.source.getSize(Ar).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const e in t){const i=t[e];if(i===void 0){Pt(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){Pt(`Texture.setValues(): property '${e}' does not exist.`);continue}s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Pc)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Qi:t.x=t.x-Math.floor(t.x);break;case wn:t.x=t.x<0?0:1;break;case _a:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Qi:t.y=t.y-Math.floor(t.y);break;case wn:t.y=t.y<0?0:1;break;case _a:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Ae.DEFAULT_IMAGE=null;Ae.DEFAULT_MAPPING=Pc;Ae.DEFAULT_ANISOTROPY=1;const wo=class wo{constructor(t=0,e=0,i=0,s=1){this.x=t,this.y=e,this.z=i,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,s){return this.x=t,this.y=e,this.z=i,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,i=this.y,s=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*i+a[8]*s+a[12]*r,this.y=a[1]*e+a[5]*i+a[9]*s+a[13]*r,this.z=a[2]*e+a[6]*i+a[10]*s+a[14]*r,this.w=a[3]*e+a[7]*i+a[11]*s+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,s,r;const l=t.elements,c=l[0],u=l[4],d=l[8],h=l[1],m=l[5],g=l[9],v=l[2],p=l[6],f=l[10];if(Math.abs(u-h)<.01&&Math.abs(d-v)<.01&&Math.abs(g-p)<.01){if(Math.abs(u+h)<.1&&Math.abs(d+v)<.1&&Math.abs(g+p)<.1&&Math.abs(c+m+f-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const A=(c+1)/2,S=(m+1)/2,y=(f+1)/2,T=(u+h)/4,R=(d+v)/4,x=(g+p)/4;return A>S&&A>y?A<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(A),s=T/i,r=R/i):S>y?S<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(S),i=T/s,r=x/s):y<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(y),i=R/r,s=x/r),this.set(i,s,r,e),this}let E=Math.sqrt((p-g)*(p-g)+(d-v)*(d-v)+(h-u)*(h-u));return Math.abs(E)<.001&&(E=1),this.x=(p-g)/E,this.y=(d-v)/E,this.z=(h-u)/E,this.w=Math.acos((c+m+f-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Ht(this.x,t.x,e.x),this.y=Ht(this.y,t.y,e.y),this.z=Ht(this.z,t.z,e.z),this.w=Ht(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=Ht(this.x,t,e),this.y=Ht(this.y,t,e),this.z=Ht(this.z,t,e),this.w=Ht(this.w,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ht(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};wo.prototype.isVector4=!0;let he=wo;class Du extends Wn{constructor(t=1,e=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:De,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=i.depth,this.scissor=new he(0,0,t,e),this.scissorTest=!1,this.viewport=new he(0,0,t,e),this.textures=[];const s={width:t,height:e,depth:i.depth},r=new Ae(s),a=i.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveColorBuffer=i.resolveColorBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.storeMultisampledColorBuffer=i.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=i.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=i.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(t={}){const e={minFilter:De,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),t!==null&&t.renderTarget===null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=i,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,i=t.textures.length;e<i;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const s=Object.assign({},t.textures[e].image);this.textures[e].source=new go(s)}if(this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveColorBuffer=t.resolveColorBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,this.storeMultisampledColorBuffer=t.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=t.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=t.storeMultisampledStencilBuffer,t.depthTexture!==null)if(t.depthTexture.renderTarget===t){const e=t.depthTexture.clone();e.renderTarget=null,this.depthTexture=e}else this.depthTexture=t.depthTexture;return this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class on extends Du{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}}class kc extends Ae{constructor(t=null,e=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=Ee,this.minFilter=Ee,this.wrapR=wn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Lu extends Ae{constructor(t=null,e=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=Ee,this.minFilter=Ee,this.wrapR=wn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}}const lr=class lr{constructor(t,e,i,s,r,a,o,l,c,u,d,h,m,g,v,p){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,a,o,l,c,u,d,h,m,g,v,p)}set(t,e,i,s,r,a,o,l,c,u,d,h,m,g,v,p){const f=this.elements;return f[0]=t,f[4]=e,f[8]=i,f[12]=s,f[1]=r,f[5]=a,f[9]=o,f[13]=l,f[2]=c,f[6]=u,f[10]=d,f[14]=h,f[3]=m,f[7]=g,f[11]=v,f[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new lr().fromArray(this.elements)}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){const e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return this.determinantAffine()===0?(t.set(1,0,0),e.set(0,1,0),i.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();const e=this.elements,i=t.elements,s=1/ci.setFromMatrixColumn(t,0).length(),r=1/ci.setFromMatrixColumn(t,1).length(),a=1/ci.setFromMatrixColumn(t,2).length();return e[0]=i[0]*s,e[1]=i[1]*s,e[2]=i[2]*s,e[3]=0,e[4]=i[4]*r,e[5]=i[5]*r,e[6]=i[6]*r,e[7]=0,e[8]=i[8]*a,e[9]=i[9]*a,e[10]=i[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,i=t.x,s=t.y,r=t.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(s),c=Math.sin(s),u=Math.cos(r),d=Math.sin(r);if(t.order==="XYZ"){const h=a*u,m=a*d,g=o*u,v=o*d;e[0]=l*u,e[4]=-l*d,e[8]=c,e[1]=m+g*c,e[5]=h-v*c,e[9]=-o*l,e[2]=v-h*c,e[6]=g+m*c,e[10]=a*l}else if(t.order==="YXZ"){const h=l*u,m=l*d,g=c*u,v=c*d;e[0]=h+v*o,e[4]=g*o-m,e[8]=a*c,e[1]=a*d,e[5]=a*u,e[9]=-o,e[2]=m*o-g,e[6]=v+h*o,e[10]=a*l}else if(t.order==="ZXY"){const h=l*u,m=l*d,g=c*u,v=c*d;e[0]=h-v*o,e[4]=-a*d,e[8]=g+m*o,e[1]=m+g*o,e[5]=a*u,e[9]=v-h*o,e[2]=-a*c,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){const h=a*u,m=a*d,g=o*u,v=o*d;e[0]=l*u,e[4]=g*c-m,e[8]=h*c+v,e[1]=l*d,e[5]=v*c+h,e[9]=m*c-g,e[2]=-c,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){const h=a*l,m=a*c,g=o*l,v=o*c;e[0]=l*u,e[4]=v-h*d,e[8]=g*d+m,e[1]=d,e[5]=a*u,e[9]=-o*u,e[2]=-c*u,e[6]=m*d+g,e[10]=h-v*d}else if(t.order==="XZY"){const h=a*l,m=a*c,g=o*l,v=o*c;e[0]=l*u,e[4]=-d,e[8]=c*u,e[1]=h*d+v,e[5]=a*u,e[9]=m*d-g,e[2]=g*d-m,e[6]=o*u,e[10]=v*d+h}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Iu,t,Uu)}lookAt(t,e,i){const s=this.elements;return Xe.subVectors(t,e),Xe.lengthSq()===0&&(Xe.z=1),Xe.normalize(),Nn.crossVectors(i,Xe),Nn.lengthSq()===0&&(Math.abs(i.z)===1?Xe.x+=1e-4:Xe.z+=1e-4,Xe.normalize(),Nn.crossVectors(i,Xe)),Nn.normalize(),ps.crossVectors(Xe,Nn),s[0]=Nn.x,s[4]=ps.x,s[8]=Xe.x,s[1]=Nn.y,s[5]=ps.y,s[9]=Xe.y,s[2]=Nn.z,s[6]=ps.z,s[10]=Xe.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,s=e.elements,r=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],u=i[1],d=i[5],h=i[9],m=i[13],g=i[2],v=i[6],p=i[10],f=i[14],E=i[3],A=i[7],S=i[11],y=i[15],T=s[0],R=s[4],x=s[8],w=s[12],I=s[1],F=s[5],z=s[9],V=s[13],U=s[2],H=s[6],K=s[10],Z=s[14],nt=s[3],X=s[7],j=s[11],et=s[15];return r[0]=a*T+o*I+l*U+c*nt,r[4]=a*R+o*F+l*H+c*X,r[8]=a*x+o*z+l*K+c*j,r[12]=a*w+o*V+l*Z+c*et,r[1]=u*T+d*I+h*U+m*nt,r[5]=u*R+d*F+h*H+m*X,r[9]=u*x+d*z+h*K+m*j,r[13]=u*w+d*V+h*Z+m*et,r[2]=g*T+v*I+p*U+f*nt,r[6]=g*R+v*F+p*H+f*X,r[10]=g*x+v*z+p*K+f*j,r[14]=g*w+v*V+p*Z+f*et,r[3]=E*T+A*I+S*U+y*nt,r[7]=E*R+A*F+S*H+y*X,r[11]=E*x+A*z+S*K+y*j,r[15]=E*w+A*V+S*Z+y*et,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[4],s=t[8],r=t[12],a=t[1],o=t[5],l=t[9],c=t[13],u=t[2],d=t[6],h=t[10],m=t[14],g=t[3],v=t[7],p=t[11],f=t[15],E=l*m-c*h,A=o*m-c*d,S=o*h-l*d,y=a*m-c*u,T=a*h-l*u,R=a*d-o*u;return e*(v*E-p*A+f*S)-i*(g*E-p*y+f*T)+s*(g*A-v*y+f*R)-r*(g*S-v*T+p*R)}determinantAffine(){const t=this.elements,e=t[0],i=t[4],s=t[8],r=t[1],a=t[5],o=t[9],l=t[2],c=t[6],u=t[10];return e*(a*u-o*c)-i*(r*u-o*l)+s*(r*c-a*l)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=i),this}invert(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],u=t[8],d=t[9],h=t[10],m=t[11],g=t[12],v=t[13],p=t[14],f=t[15],E=e*o-i*a,A=e*l-s*a,S=e*c-r*a,y=i*l-s*o,T=i*c-r*o,R=s*c-r*l,x=u*v-d*g,w=u*p-h*g,I=u*f-m*g,F=d*p-h*v,z=d*f-m*v,V=h*f-m*p,U=E*V-A*z+S*F+y*I-T*w+R*x;if(U===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const H=1/U;return t[0]=(o*V-l*z+c*F)*H,t[1]=(s*z-i*V-r*F)*H,t[2]=(v*R-p*T+f*y)*H,t[3]=(h*T-d*R-m*y)*H,t[4]=(l*I-a*V-c*w)*H,t[5]=(e*V-s*I+r*w)*H,t[6]=(p*S-g*R-f*A)*H,t[7]=(u*R-h*S+m*A)*H,t[8]=(a*z-o*I+c*x)*H,t[9]=(i*I-e*z-r*x)*H,t[10]=(g*T-v*S+f*E)*H,t[11]=(d*S-u*T-m*E)*H,t[12]=(o*w-a*F-l*x)*H,t[13]=(e*F-i*w+s*x)*H,t[14]=(v*A-g*y-p*E)*H,t[15]=(u*y-d*A+h*E)*H,this}scale(t){const e=this.elements,i=t.x,s=t.y,r=t.z;return e[0]*=i,e[4]*=s,e[8]*=r,e[1]*=i,e[5]*=s,e[9]*=r,e[2]*=i,e[6]*=s,e[10]*=r,e[3]*=i,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,s))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const i=Math.cos(e),s=Math.sin(e),r=1-i,a=t.x,o=t.y,l=t.z,c=r*a,u=r*o;return this.set(c*a+i,c*o-s*l,c*l+s*o,0,c*o+s*l,u*o+i,u*l-s*a,0,c*l-s*o,u*l+s*a,r*l*l+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,s,r,a){return this.set(1,i,r,0,t,1,a,0,e,s,1,0,0,0,0,1),this}compose(t,e,i){const s=this.elements,r=e._x,a=e._y,o=e._z,l=e._w,c=r+r,u=a+a,d=o+o,h=r*c,m=r*u,g=r*d,v=a*u,p=a*d,f=o*d,E=l*c,A=l*u,S=l*d,y=i.x,T=i.y,R=i.z;return s[0]=(1-(v+f))*y,s[1]=(m+S)*y,s[2]=(g-A)*y,s[3]=0,s[4]=(m-S)*T,s[5]=(1-(h+f))*T,s[6]=(p+E)*T,s[7]=0,s[8]=(g+A)*R,s[9]=(p-E)*R,s[10]=(1-(h+v))*R,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,i){const s=this.elements;t.x=s[12],t.y=s[13],t.z=s[14];const r=this.determinantAffine();if(r===0)return i.set(1,1,1),e.identity(),this;let a=ci.set(s[0],s[1],s[2]).length();const o=ci.set(s[4],s[5],s[6]).length(),l=ci.set(s[8],s[9],s[10]).length();r<0&&(a=-a),tn.copy(this);const c=1/a,u=1/o,d=1/l;return tn.elements[0]*=c,tn.elements[1]*=c,tn.elements[2]*=c,tn.elements[4]*=u,tn.elements[5]*=u,tn.elements[6]*=u,tn.elements[8]*=d,tn.elements[9]*=d,tn.elements[10]*=d,e.setFromRotationMatrix(tn),i.x=a,i.y=o,i.z=l,this}makePerspective(t,e,i,s,r,a,o=gn,l=!1){const c=this.elements,u=2*r/(e-t),d=2*r/(i-s),h=(e+t)/(e-t),m=(i+s)/(i-s);let g,v;if(l)g=r/(a-r),v=a*r/(a-r);else if(o===gn)g=-(a+r)/(a-r),v=-2*a*r/(a-r);else if(o===es)g=-a/(a-r),v=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=d,c[9]=m,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=v,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,i,s,r,a,o=gn,l=!1){const c=this.elements,u=2/(e-t),d=2/(i-s),h=-(e+t)/(e-t),m=-(i+s)/(i-s);let g,v;if(l)g=1/(a-r),v=a/(a-r);else if(o===gn)g=-2/(a-r),v=-(a+r)/(a-r);else if(o===es)g=-1/(a-r),v=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=0,c[12]=h,c[1]=0,c[5]=d,c[9]=0,c[13]=m,c[2]=0,c[6]=0,c[10]=g,c[14]=v,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){const e=this.elements,i=t.elements;for(let s=0;s<16;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}};lr.prototype.isMatrix4=!0;let ae=lr;const ci=new D,tn=new ae,Iu=new D(0,0,0),Uu=new D(1,1,1),Nn=new D,ps=new D,Xe=new D,tl=new ae,el=new Gn;class Vn{constructor(t=0,e=0,i=0,s=Vn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,s=this._order){return this._x=t,this._y=e,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){const s=t.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],u=s[9],d=s[2],h=s[6],m=s[10];switch(e){case"XYZ":this._y=Math.asin(Ht(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,m),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ht(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,m),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ht(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-d,m),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Ht(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(h,m),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Ht(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(o,m));break;case"XZY":this._z=Math.asin(-Ht(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-u,m),this._y=0);break;default:Pt("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return tl.makeRotationFromQuaternion(t),this.setFromRotationMatrix(tl,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return el.setFromEuler(this),this.setFromQuaternion(el,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Vn.DEFAULT_ORDER="XYZ";class _o{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Nu=0;const nl=new D,hi=new Gn,yn=new ae,ms=new D,Bi=new D,Fu=new D,Ou=new Gn,il=new D(1,0,0),sl=new D(0,1,0),rl=new D(0,0,1),al={type:"added"},Bu={type:"removed"},ui={type:"childadded",child:null},wr={type:"childremoved",child:null};class xe extends Wn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Nu++}),this.uuid=os(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=xe.DEFAULT_UP.clone();const t=new D,e=new Vn,i=new Gn,s=new D(1,1,1);function r(){i.setFromEuler(e,!1)}function a(){e.setFromQuaternion(i,void 0,!1)}e._onChange(r),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ae},normalMatrix:{value:new Lt}}),this.matrix=new ae,this.matrixWorld=new ae,this.matrixAutoUpdate=xe.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=xe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new _o,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return hi.setFromAxisAngle(t,e),this.quaternion.multiply(hi),this}rotateOnWorldAxis(t,e){return hi.setFromAxisAngle(t,e),this.quaternion.premultiply(hi),this}rotateX(t){return this.rotateOnAxis(il,t)}rotateY(t){return this.rotateOnAxis(sl,t)}rotateZ(t){return this.rotateOnAxis(rl,t)}translateOnAxis(t,e){return nl.copy(t).applyQuaternion(this.quaternion),this.position.add(nl.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(il,t)}translateY(t){return this.translateOnAxis(sl,t)}translateZ(t){return this.translateOnAxis(rl,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(yn.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?ms.copy(t):ms.set(t,e,i);const s=this.parent;this.updateWorldMatrix(!0,!1),Bi.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?yn.lookAt(Bi,ms,this.up):yn.lookAt(ms,Bi,this.up),this.quaternion.setFromRotationMatrix(yn),s&&(yn.extractRotation(s.matrixWorld),hi.setFromRotationMatrix(yn),this.quaternion.premultiply(hi.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(Yt("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(al),ui.child=t,this.dispatchEvent(ui),ui.child=null):Yt("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Bu),wr.child=t,this.dispatchEvent(wr),wr.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),yn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),yn.multiply(t.parent.matrixWorld)),t.applyMatrix4(yn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(al),ui.child=t,this.dispatchEvent(ui),ui.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,s=this.children.length;i<s;i++){const a=this.children[i].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Bi,t,Fu),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Bi,Ou,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(t){t(this);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const t=this.pivot;if(t!==null){const e=t.x,i=t.y,s=t.z,r=this.matrix.elements;r[12]+=e-r[0]*e-r[4]*i-r[8]*s,r[13]+=i-r[1]*e-r[5]*i-r[9]*s,r[14]+=s-r[2]*e-r[6]*i-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].updateMatrixWorld(t)}updateWorldMatrix(t,e,i=!1){const s=this.parent;if(t===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),e===!0){const r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,i)}}toJSON(t){const e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const d=l[c];r(t.shapes,d)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(t.materials,this.material[l]));s.material=o}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];s.animations.push(r(t.animations,l))}}if(e){const o=a(t.geometries),l=a(t.materials),c=a(t.textures),u=a(t.images),d=a(t.shapes),h=a(t.skeletons),m=a(t.animations),g=a(t.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),d.length>0&&(i.shapes=d),h.length>0&&(i.skeletons=h),m.length>0&&(i.animations=m),g.length>0&&(i.nodes=g)}return i.object=s,i;function a(o){const l=[];for(const c in o){const u=o[c];delete u.metadata,l.push(u)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){const s=t.children[i];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}xe.DEFAULT_UP=new D(0,1,0);xe.DEFAULT_MATRIX_AUTO_UPDATE=!0;xe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class _n extends xe{constructor(){super(),this.isGroup=!0,this.type="Group"}}const ku={type:"move"};class Rr{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new _n,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new _n,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new D,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new D),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new _n,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new D,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new D,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let s=null,r=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(const v of t.hand.values()){const p=e.getJointPose(v,i),f=this._getHandJoint(c,v);p!==null&&(f.matrix.fromArray(p.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=p.radius),f.visible=p!==null}const u=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],h=u.position.distanceTo(d.position),m=.02,g=.005;c.inputState.pinching&&h>m+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&h<=m-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:t,target:this})));o!==null&&(s=e.getPose(t.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(ku)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const i=new _n;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}}const zc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Fn={h:0,s:0,l:0},gs={h:0,s:0,l:0};function Cr(n,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*6*(2/3-e):n}class Ft{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Ge){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Vt.colorSpaceToWorking(this,e),this}setRGB(t,e,i,s=Vt.workingColorSpace){return this.r=t,this.g=e,this.b=i,Vt.colorSpaceToWorking(this,s),this}setHSL(t,e,i,s=Vt.workingColorSpace){if(t=Tu(t,1),e=Ht(e,0,1),i=Ht(i,0,1),e===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+e):i+e-i*e,a=2*i-r;this.r=Cr(a,r,t+1/3),this.g=Cr(a,r,t),this.b=Cr(a,r,t-1/3)}return Vt.colorSpaceToWorking(this,s),this}setStyle(t,e=Ge){function i(r){r!==void 0&&parseFloat(r)<1&&Pt("Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:Pt("Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);Pt("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Ge){const i=zc[t.toLowerCase()];return i!==void 0?this.setHex(i,e):Pt("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Cn(t.r),this.g=Cn(t.g),this.b=Cn(t.b),this}copyLinearToSRGB(t){return this.r=Ci(t.r),this.g=Ci(t.g),this.b=Ci(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Ge){return Vt.workingToColorSpace(Pe.copy(this),t),Math.round(Ht(Pe.r*255,0,255))*65536+Math.round(Ht(Pe.g*255,0,255))*256+Math.round(Ht(Pe.b*255,0,255))}getHexString(t=Ge){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Vt.workingColorSpace){Vt.workingToColorSpace(Pe.copy(this),e);const i=Pe.r,s=Pe.g,r=Pe.b,a=Math.max(i,s,r),o=Math.min(i,s,r);let l,c;const u=(o+a)/2;if(o===a)l=0,c=0;else{const d=a-o;switch(c=u<=.5?d/(a+o):d/(2-a-o),a){case i:l=(s-r)/d+(s<r?6:0);break;case s:l=(r-i)/d+2;break;case r:l=(i-s)/d+4;break}l/=6}return t.h=l,t.s=c,t.l=u,t}getRGB(t,e=Vt.workingColorSpace){return Vt.workingToColorSpace(Pe.copy(this),e),t.r=Pe.r,t.g=Pe.g,t.b=Pe.b,t}getStyle(t=Ge){Vt.workingToColorSpace(Pe.copy(this),t);const e=Pe.r,i=Pe.g,s=Pe.b;return t!==Ge?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(t,e,i){return this.getHSL(Fn),this.setHSL(Fn.h+t,Fn.s+e,Fn.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(Fn),t.getHSL(gs);const i=yr(Fn.h,gs.h,e),s=yr(Fn.s,gs.s,e),r=yr(Fn.l,gs.l,e);return this.setHSL(i,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,i=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*i+r[6]*s,this.g=r[1]*e+r[4]*i+r[7]*s,this.b=r[2]*e+r[5]*i+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Pe=new Ft;Ft.NAMES=zc;class zu extends xe{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Vn,this.environmentIntensity=1,this.environmentRotation=new Vn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),e.object.backgroundBlurriness=this.backgroundBlurriness,e.object.backgroundIntensity=this.backgroundIntensity,e.object.backgroundRotation=this.backgroundRotation.toArray(),e.object.environmentIntensity=this.environmentIntensity,e.object.environmentRotation=this.environmentRotation.toArray(),e}}const en=new D,bn=new D,Pr=new D,En=new D,di=new D,fi=new D,ol=new D,Dr=new D,Lr=new D,Ir=new D,Ur=new he,Nr=new he,Fr=new he;class sn{constructor(t=new D,e=new D,i=new D){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,s){s.subVectors(i,e),en.subVectors(t,e),s.cross(en);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,i,s,r){en.subVectors(s,e),bn.subVectors(i,e),Pr.subVectors(t,e);const a=en.dot(en),o=en.dot(bn),l=en.dot(Pr),c=bn.dot(bn),u=bn.dot(Pr),d=a*c-o*o;if(d===0)return r.set(0,0,0),null;const h=1/d,m=(c*l-o*u)*h,g=(a*u-o*l)*h;return r.set(1-m-g,g,m)}static containsPoint(t,e,i,s){return this.getBarycoord(t,e,i,s,En)===null?!1:En.x>=0&&En.y>=0&&En.x+En.y<=1}static getInterpolation(t,e,i,s,r,a,o,l){return this.getBarycoord(t,e,i,s,En)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,En.x),l.addScaledVector(a,En.y),l.addScaledVector(o,En.z),l)}static getInterpolatedAttribute(t,e,i,s,r,a){return Ur.setScalar(0),Nr.setScalar(0),Fr.setScalar(0),Ur.fromBufferAttribute(t,e),Nr.fromBufferAttribute(t,i),Fr.fromBufferAttribute(t,s),a.setScalar(0),a.addScaledVector(Ur,r.x),a.addScaledVector(Nr,r.y),a.addScaledVector(Fr,r.z),a}static isFrontFacing(t,e,i,s){return en.subVectors(i,e),bn.subVectors(t,e),en.cross(bn).dot(s)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,s){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,i,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return en.subVectors(this.c,this.b),bn.subVectors(this.a,this.b),en.cross(bn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return sn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return sn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,s,r){return sn.getInterpolation(t,this.a,this.b,this.c,e,i,s,r)}containsPoint(t){return sn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return sn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const i=this.a,s=this.b,r=this.c;let a,o;di.subVectors(s,i),fi.subVectors(r,i),Dr.subVectors(t,i);const l=di.dot(Dr),c=fi.dot(Dr);if(l<=0&&c<=0)return e.copy(i);Lr.subVectors(t,s);const u=di.dot(Lr),d=fi.dot(Lr);if(u>=0&&d<=u)return e.copy(s);const h=l*d-u*c;if(h<=0&&l>=0&&u<=0)return a=l/(l-u),e.copy(i).addScaledVector(di,a);Ir.subVectors(t,r);const m=di.dot(Ir),g=fi.dot(Ir);if(g>=0&&m<=g)return e.copy(r);const v=m*c-l*g;if(v<=0&&c>=0&&g<=0)return o=c/(c-g),e.copy(i).addScaledVector(fi,o);const p=u*g-m*d;if(p<=0&&d-u>=0&&m-g>=0)return ol.subVectors(r,s),o=(d-u)/(d-u+(m-g)),e.copy(s).addScaledVector(ol,o);const f=1/(p+v+h);return a=v*f,o=h*f,e.copy(i).addScaledVector(di,a).addScaledVector(fi,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}class Ui{constructor(t=new D(1/0,1/0,1/0),e=new D(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(nn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(nn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const i=nn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const i=t.geometry;if(i!==void 0){const r=i.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,nn):nn.fromBufferAttribute(r,a),nn.applyMatrix4(t.matrixWorld),this.expandByPoint(nn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),_s.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),_s.copy(i.boundingBox)),_s.applyMatrix4(t.matrixWorld),this.union(_s)}const s=t.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,nn),nn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(ki),xs.subVectors(this.max,ki),pi.subVectors(t.a,ki),mi.subVectors(t.b,ki),gi.subVectors(t.c,ki),On.subVectors(mi,pi),Bn.subVectors(gi,mi),Yn.subVectors(pi,gi);let e=[0,-On.z,On.y,0,-Bn.z,Bn.y,0,-Yn.z,Yn.y,On.z,0,-On.x,Bn.z,0,-Bn.x,Yn.z,0,-Yn.x,-On.y,On.x,0,-Bn.y,Bn.x,0,-Yn.y,Yn.x,0];return!Or(e,pi,mi,gi,xs)||(e=[1,0,0,0,1,0,0,0,1],!Or(e,pi,mi,gi,xs))?!1:(vs.crossVectors(On,Bn),e=[vs.x,vs.y,vs.z],Or(e,pi,mi,gi,xs))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,nn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(nn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Tn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Tn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Tn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Tn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Tn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Tn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Tn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Tn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Tn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const Tn=[new D,new D,new D,new D,new D,new D,new D,new D],nn=new D,_s=new Ui,pi=new D,mi=new D,gi=new D,On=new D,Bn=new D,Yn=new D,ki=new D,xs=new D,vs=new D,qn=new D;function Or(n,t,e,i,s){for(let r=0,a=n.length-3;r<=a;r+=3){qn.fromArray(n,r);const o=s.x*Math.abs(qn.x)+s.y*Math.abs(qn.y)+s.z*Math.abs(qn.z),l=t.dot(qn),c=e.dot(qn),u=i.dot(qn);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}const me=new D,Ms=new Ct;let Hu=0;class Pn extends Wn{constructor(t,e,i=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Hu++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=Mu,this.updateRanges=[],this.gpuType=mn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[i+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)Ms.fromBufferAttribute(this,e),Ms.applyMatrix3(t),this.setXY(e,Ms.x,Ms.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)me.fromBufferAttribute(this,e),me.applyMatrix3(t),this.setXYZ(e,me.x,me.y,me.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)me.fromBufferAttribute(this,e),me.applyMatrix4(t),this.setXYZ(e,me.x,me.y,me.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)me.fromBufferAttribute(this,e),me.applyNormalMatrix(t),this.setXYZ(e,me.x,me.y,me.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)me.fromBufferAttribute(this,e),me.transformDirection(t),this.setXYZ(e,me.x,me.y,me.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=Oi(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=ze(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Oi(e,this.array)),e}setX(t,e){return this.normalized&&(e=ze(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Oi(e,this.array)),e}setY(t,e){return this.normalized&&(e=ze(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Oi(e,this.array)),e}setZ(t,e){return this.normalized&&(e=ze(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Oi(e,this.array)),e}setW(t,e){return this.normalized&&(e=ze(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=ze(e,this.array),i=ze(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,s){return t*=this.itemSize,this.normalized&&(e=ze(e,this.array),i=ze(i,this.array),s=ze(s,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this}setXYZW(t,e,i,s,r){return t*=this.itemSize,this.normalized&&(e=ze(e,this.array),i=ze(i,this.array),s=ze(s,this.array),r=ze(r,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return t.name=this.name,t.usage=this.usage,t.gpuType=this.gpuType,t}dispose(){this.dispatchEvent({type:"dispose"})}}class Hc extends Pn{constructor(t,e,i){super(new Uint16Array(t),e,i)}}class Gc extends Pn{constructor(t,e,i){super(new Uint32Array(t),e,i)}}class Te extends Pn{constructor(t,e,i){super(new Float32Array(t),e,i)}}const Gu=new Ui,zi=new D,Br=new D;class hr{constructor(t=new D,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const i=this.center;e!==void 0?i.copy(e):Gu.setFromPoints(t).getCenter(i);let s=0;for(let r=0,a=t.length;r<a;r++)s=Math.max(s,i.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;zi.subVectors(t,this.center);const e=zi.lengthSq();if(e>this.radius*this.radius){const i=Math.sqrt(e),s=(i-this.radius)*.5;this.center.addScaledVector(zi,s/i),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Br.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(zi.copy(t.center).add(Br)),this.expandByPoint(zi.copy(t.center).sub(Br))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}let Vu=0;const $e=new ae,kr=new xe,_i=new D,Ye=new Ui,Hi=new Ui,ye=new D;class Qe extends Wn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Vu++}),this.uuid=os(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Su(t)?Gc:Hc)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new Lt().getNormalMatrix(t);i.applyNormalMatrix(r),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return $e.makeRotationFromQuaternion(t),this.applyMatrix4($e),this}rotateX(t){return $e.makeRotationX(t),this.applyMatrix4($e),this}rotateY(t){return $e.makeRotationY(t),this.applyMatrix4($e),this}rotateZ(t){return $e.makeRotationZ(t),this.applyMatrix4($e),this}translate(t,e,i){return $e.makeTranslation(t,e,i),this.applyMatrix4($e),this}scale(t,e,i){return $e.makeScale(t,e,i),this.applyMatrix4($e),this}lookAt(t){return kr.lookAt(t),kr.updateMatrix(),this.applyMatrix4(kr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(_i).negate(),this.translate(_i.x,_i.y,_i.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const i=[];for(let s=0,r=t.length;s<r;s++){const a=t[s];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Te(i,3))}else{const i=Math.min(t.length,e.count);for(let s=0;s<i;s++){const r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&Pt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ui);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Yt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new D(-1/0,-1/0,-1/0),new D(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,s=e.length;i<s;i++){const r=e[i];Ye.setFromBufferAttribute(r),this.morphTargetsRelative?(ye.addVectors(this.boundingBox.min,Ye.min),this.boundingBox.expandByPoint(ye),ye.addVectors(this.boundingBox.max,Ye.max),this.boundingBox.expandByPoint(ye)):(this.boundingBox.expandByPoint(Ye.min),this.boundingBox.expandByPoint(Ye.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Yt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new hr);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Yt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new D,1/0);return}if(t){const i=this.boundingSphere.center;if(Ye.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){const o=e[r];Hi.setFromBufferAttribute(o),this.morphTargetsRelative?(ye.addVectors(Ye.min,Hi.min),Ye.expandByPoint(ye),ye.addVectors(Ye.max,Hi.max),Ye.expandByPoint(ye)):(Ye.expandByPoint(Hi.min),Ye.expandByPoint(Hi.max))}Ye.getCenter(i);let s=0;for(let r=0,a=t.count;r<a;r++)ye.fromBufferAttribute(t,r),s=Math.max(s,i.distanceToSquared(ye));if(e)for(let r=0,a=e.length;r<a;r++){const o=e[r],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)ye.fromBufferAttribute(o,c),l&&(_i.fromBufferAttribute(t,c),ye.add(_i)),s=Math.max(s,i.distanceToSquared(ye))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Yt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){Yt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.position,s=e.normal,r=e.uv;let a=this.getAttribute("tangent");(a===void 0||a.count!==i.count)&&(a=new Pn(new Float32Array(4*i.count),4),this.setAttribute("tangent",a));const o=[],l=[];for(let x=0;x<i.count;x++)o[x]=new D,l[x]=new D;const c=new D,u=new D,d=new D,h=new Ct,m=new Ct,g=new Ct,v=new D,p=new D;function f(x,w,I){c.fromBufferAttribute(i,x),u.fromBufferAttribute(i,w),d.fromBufferAttribute(i,I),h.fromBufferAttribute(r,x),m.fromBufferAttribute(r,w),g.fromBufferAttribute(r,I),u.sub(c),d.sub(c),m.sub(h),g.sub(h);const F=1/(m.x*g.y-g.x*m.y);isFinite(F)&&(v.copy(u).multiplyScalar(g.y).addScaledVector(d,-m.y).multiplyScalar(F),p.copy(d).multiplyScalar(m.x).addScaledVector(u,-g.x).multiplyScalar(F),o[x].add(v),o[w].add(v),o[I].add(v),l[x].add(p),l[w].add(p),l[I].add(p))}let E=this.groups;E.length===0&&(E=[{start:0,count:t.count}]);for(let x=0,w=E.length;x<w;++x){const I=E[x],F=I.start,z=I.count;for(let V=F,U=F+z;V<U;V+=3)f(t.getX(V+0),t.getX(V+1),t.getX(V+2))}const A=new D,S=new D,y=new D,T=new D;function R(x){y.fromBufferAttribute(s,x),T.copy(y);const w=o[x];A.copy(w),A.sub(y.multiplyScalar(y.dot(w))).normalize(),S.crossVectors(T,w);const F=S.dot(l[x])<0?-1:1;a.setXYZW(x,A.x,A.y,A.z,F)}for(let x=0,w=E.length;x<w;++x){const I=E[x],F=I.start,z=I.count;for(let V=F,U=F+z;V<U;V+=3)R(t.getX(V+0)),R(t.getX(V+1)),R(t.getX(V+2))}this._transformed=!0}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==e.count)i=new Pn(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let h=0,m=i.count;h<m;h++)i.setXYZ(h,0,0,0);const s=new D,r=new D,a=new D,o=new D,l=new D,c=new D,u=new D,d=new D;if(t)for(let h=0,m=t.count;h<m;h+=3){const g=t.getX(h+0),v=t.getX(h+1),p=t.getX(h+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,v),a.fromBufferAttribute(e,p),u.subVectors(a,r),d.subVectors(s,r),u.cross(d),o.fromBufferAttribute(i,g),l.fromBufferAttribute(i,v),c.fromBufferAttribute(i,p),o.add(u),l.add(u),c.add(u),i.setXYZ(g,o.x,o.y,o.z),i.setXYZ(v,l.x,l.y,l.z),i.setXYZ(p,c.x,c.y,c.z)}else for(let h=0,m=e.count;h<m;h+=3)s.fromBufferAttribute(e,h+0),r.fromBufferAttribute(e,h+1),a.fromBufferAttribute(e,h+2),u.subVectors(a,r),d.subVectors(s,r),u.cross(d),i.setXYZ(h+0,u.x,u.y,u.z),i.setXYZ(h+1,u.x,u.y,u.z),i.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)ye.fromBufferAttribute(t,e),ye.normalize(),t.setXYZ(e,ye.x,ye.y,ye.z)}toNonIndexed(){function t(o,l){const c=o.array,u=o.itemSize,d=o.normalized,h=new c.constructor(l.length*u);let m=0,g=0;for(let v=0,p=l.length;v<p;v++){o.isInterleavedBufferAttribute?m=l[v]*o.data.stride+o.offset:m=l[v]*u;for(let f=0;f<u;f++)h[g++]=c[m++]}return new Pn(h,u,d)}if(this.index===null)return Pt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Qe,i=this.index.array,s=this.attributes;for(const o in s){const l=s[o],c=t(l,i);e.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let u=0,d=c.length;u<d;u++){const h=c[u],m=t(h,i);l.push(m)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const i=this.attributes;for(const l in i){const c=i[l];t.data.attributes[l]=c.toJSON(t.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let d=0,h=c.length;d<h;d++){const m=c[d];u.push(m.toJSON(t.data))}u.length>0&&(s[l]=u,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const i=t.index;i!==null&&this.setIndex(i.clone());const s=t.attributes;for(const c in s){const u=s[c];this.setAttribute(c,u.clone(e))}const r=t.morphAttributes;for(const c in r){const u=[],d=r[c];for(let h=0,m=d.length;h<m;h++)u.push(d[h].clone(e));this.morphAttributes[c]=u}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let c=0,u=a.length;c<u;c++){const d=a[c];this.addGroup(d.start,d.count,d.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}const zr=new D,Wu=new D,Xu=new Lt;class dn{constructor(t=new D(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,s){return this.normal.set(t,e,i),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){const s=zr.subVectors(i,e).cross(Wu.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,i=!0){const s=t.delta(zr),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const a=-(t.start.dot(this.normal)+this.constant)/r;return i===!0&&(a<0||a>1)?null:e.copy(t.start).addScaledVector(s,a)}intersectsLine(t){const e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const i=e||Xu.getNormalMatrix(t),s=this.coplanarPoint(zr).applyMatrix4(t),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(t){return this.normal.fromArray(t.normal),this.constant=t.constant,this}}let Yu=0;class Ni extends Wn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Yu++}),this.uuid=os(),this.name="",this.type="Material",this.blending=$i,this.side=ni,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Sc,this.blendDst=yc,this.blendEquation=Ei,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ft(0,0,0),this.blendAlpha=0,this.depthFunc=Ji,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=fu,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Sr,this.stencilZFail=Sr,this.stencilZPass=Sr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const i=t[e];if(i===void 0){Pt(`Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){Pt(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector2&&i&&i.isVector2||s&&s.isEuler&&i&&i.isEuler||s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,i.blending=this.blending,i.side=this.side,i.shadowSide=this.shadowSide,i.vertexColors=this.vertexColors,i.opacity=this.opacity,i.transparent=this.transparent,i.blendSrc=this.blendSrc,i.blendDst=this.blendDst,i.blendEquation=this.blendEquation,i.blendSrcAlpha=this.blendSrcAlpha,i.blendDstAlpha=this.blendDstAlpha,i.blendEquationAlpha=this.blendEquationAlpha,i.blendColor=this.blendColor.getHex(),i.blendAlpha=this.blendAlpha,i.depthFunc=this.depthFunc,i.depthTest=this.depthTest,i.depthWrite=this.depthWrite,i.colorWrite=this.colorWrite,i.clipIntersection=this.clipIntersection,i.clipShadows=this.clipShadows,i.stencilWriteMask=this.stencilWriteMask,i.stencilFunc=this.stencilFunc,i.stencilRef=this.stencilRef,i.stencilFuncMask=this.stencilFuncMask,i.stencilFail=this.stencilFail,i.stencilZFail=this.stencilZFail,i.stencilZPass=this.stencilZPass,i.stencilWrite=this.stencilWrite,i.polygonOffset=this.polygonOffset,i.polygonOffsetFactor=this.polygonOffsetFactor,i.polygonOffsetUnits=this.polygonOffsetUnits,i.dithering=this.dithering,i.alphaTest=this.alphaTest,i.alphaHash=this.alphaHash,i.alphaToCoverage=this.alphaToCoverage,i.premultipliedAlpha=this.premultipliedAlpha,i.forceSinglePass=this.forceSinglePass,i.allowOverride=this.allowOverride,i.visible=this.visible,i.toneMapped=this.toneMapped,i.name=this.name,this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(i.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(i.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(i.rotation=this.rotation),this.depthPacking!==void 0&&(i.depthPacking=this.depthPacking),this.linewidth!==void 0&&(i.linewidth=this.linewidth),this.linecap!==void 0&&(i.linecap=this.linecap),this.linejoin!==void 0&&(i.linejoin=this.linejoin),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.wireframe!==void 0&&(i.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(i.flatShading=this.flatShading),this.fog!==void 0&&(i.fog=this.fog),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(e){const r=s(t.textures),a=s(t.images);r.length>0&&(i.textures=r),a.length>0&&(i.images=a)}return i}fromJSON(t,e){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new Ft().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.retroreflectivity!==void 0&&(this.retroreflectivity=t.retroreflectivity),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=t.iridescenceThicknessRange),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.clippingPlanes!==void 0&&(this.clippingPlanes=t.clippingPlanes.map(i=>new dn().fromJSON(i))),t.clipIntersection!==void 0&&(this.clipIntersection=t.clipIntersection),t.clipShadows!==void 0&&(this.clipShadows=t.clipShadows),t.depthPacking!==void 0&&(this.depthPacking=t.depthPacking),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.linecap!==void 0&&(this.linecap=t.linecap),t.linejoin!==void 0&&(this.linejoin=t.linejoin),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=e[t.map]||null),t.matcap!==void 0&&(this.matcap=e[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=e[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=e[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=e[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let i=t.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new Ct().fromArray(i)}return t.displacementMap!==void 0&&(this.displacementMap=e[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=e[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=e[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=e[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=e[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=e[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=e[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=e[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=e[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=e[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=e[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=e[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=e[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=e[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Ct().fromArray(t.clearcoatNormalScale)),t.iridescenceMap!==void 0&&(this.iridescenceMap=e[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=e[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=e[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=e[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=e[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=e[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=e[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let i=null;if(e!==null){const s=e.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=e[r].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}const An=new D,Hr=new D,Ss=new D,ys=new D;class ur{constructor(t=new D,e=new D(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,An)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=An.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(An.copy(this.origin).addScaledVector(this.direction,e),An.distanceToSquared(t))}distanceSqToSegment(t,e,i,s){Hr.copy(t).add(e).multiplyScalar(.5),Ss.copy(e).sub(t).normalize(),ys.copy(this.origin).sub(Hr);const r=t.distanceTo(e)*.5,a=-this.direction.dot(Ss),o=ys.dot(this.direction),l=-ys.dot(Ss),c=ys.lengthSq(),u=Math.abs(1-a*a);let d,h,m,g;if(u>0)if(d=a*l-o,h=a*o-l,g=r*u,d>=0)if(h>=-g)if(h<=g){const v=1/u;d*=v,h*=v,m=d*(d+a*h+2*o)+h*(a*d+h+2*l)+c}else h=r,d=Math.max(0,-(a*h+o)),m=-d*d+h*(h+2*l)+c;else h=-r,d=Math.max(0,-(a*h+o)),m=-d*d+h*(h+2*l)+c;else h<=-g?(d=Math.max(0,-(-a*r+o)),h=d>0?-r:Math.min(Math.max(-r,-l),r),m=-d*d+h*(h+2*l)+c):h<=g?(d=0,h=Math.min(Math.max(-r,-l),r),m=h*(h+2*l)+c):(d=Math.max(0,-(a*r+o)),h=d>0?r:Math.min(Math.max(-r,-l),r),m=-d*d+h*(h+2*l)+c);else h=a>0?-r:r,d=Math.max(0,-(a*h+o)),m=-d*d+h*(h+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(Hr).addScaledVector(Ss,h),m}intersectSphere(t,e){if(t.radius<0)return null;An.subVectors(t.center,this.origin);const i=An.dot(this.direction),s=An.dot(An)-i*i,r=t.radius*t.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){const i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,s,r,a,o,l;const c=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,h=this.origin;return c>=0?(i=(t.min.x-h.x)*c,s=(t.max.x-h.x)*c):(i=(t.max.x-h.x)*c,s=(t.min.x-h.x)*c),u>=0?(r=(t.min.y-h.y)*u,a=(t.max.y-h.y)*u):(r=(t.max.y-h.y)*u,a=(t.min.y-h.y)*u),i>a||r>s||((r>i||isNaN(i))&&(i=r),(a<s||isNaN(s))&&(s=a),d>=0?(o=(t.min.z-h.z)*d,l=(t.max.z-h.z)*d):(o=(t.max.z-h.z)*d,l=(t.min.z-h.z)*d),i>l||o>s)||((o>i||i!==i)&&(i=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,e)}intersectsBox(t){return this.intersectBox(t,An)!==null}intersectTriangle(t,e,i,s,r){const a=this.origin,o=this.direction,l=o.x,c=o.y,u=o.z,d=t.x-a.x,h=t.y-a.y,m=t.z-a.z,g=e.x-a.x,v=e.y-a.y,p=e.z-a.z,f=i.x-a.x,E=i.y-a.y,A=i.z-a.z,S=Math.abs(l),y=Math.abs(c),T=Math.abs(u);let R,x,w,I,F,z,V,U,H,K,Z,nt;if(S>=y&&S>=T?(w=l,z=d,H=g,nt=f,l>=0?(R=c,x=u,I=h,F=m,V=v,U=p,K=E,Z=A):(R=u,x=c,I=m,F=h,V=p,U=v,K=A,Z=E)):y>=T?(w=c,z=h,H=v,nt=E,c>=0?(R=u,x=l,I=m,F=d,V=p,U=g,K=A,Z=f):(R=l,x=u,I=d,F=m,V=g,U=p,K=f,Z=A)):(w=u,z=m,H=p,nt=A,u>=0?(R=l,x=c,I=d,F=h,V=g,U=v,K=f,Z=E):(R=c,x=l,I=h,F=d,V=v,U=g,K=E,Z=f)),w===0)return null;const X=R/w,j=x/w,et=1/w,wt=I-X*z,Tt=F-j*z,ne=V-X*H,Wt=U-j*H,Zt=K-X*nt,Y=Z-j*nt,Q=Zt*Wt-Y*ne,xt=wt*Y-Tt*Zt,Dt=ne*Tt-Wt*wt;if(s){if(Q<0||xt<0||Dt<0)return null}else if((Q<0||xt<0||Dt<0)&&(Q>0||xt>0||Dt>0))return null;const gt=Q+xt+Dt;if(gt===0)return null;const Ot=et*(Q*z+xt*H+Dt*nt);return(gt>0?Ot<0:Ot>0)?null:this.at(Ot/gt,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Vc extends Ni{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ft(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Vn,this.combine=ao,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const ll=new ae,Zn=new ur,bs=new hr,cl=new D,Es=new D,Ts=new D,As=new D,Gr=new D,ws=new D,hl=new D,Rs=new D;class Fe extends xe{constructor(t=new Qe,e=new Vc){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){const i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,a=i.morphTargetsRelative;e.fromBufferAttribute(s,t);const o=this.morphTargetInfluences;if(r&&o){ws.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const u=o[l],d=r[l];u!==0&&(Gr.fromBufferAttribute(d,t),a?ws.addScaledVector(Gr,u):ws.addScaledVector(Gr.sub(e),u))}e.add(ws)}return e}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){const i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),bs.copy(i.boundingSphere),bs.applyMatrix4(r),Zn.copy(t.ray).recast(t.near),!(bs.containsPoint(Zn.origin)===!1&&(Zn.intersectSphere(bs,cl)===null||Zn.origin.distanceToSquared(cl)>(t.far-t.near)**2))&&(ll.copy(r).invert(),Zn.copy(t.ray).applyMatrix4(ll),!(i.boundingBox!==null&&Zn.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,Zn)))}_computeIntersections(t,e,i){let s;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,u=r.attributes.uv1,d=r.attributes.normal,h=r.groups,m=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,v=h.length;g<v;g++){const p=h[g],f=a[p.materialIndex],E=Math.max(p.start,m.start),A=Math.min(o.count,Math.min(p.start+p.count,m.start+m.count));for(let S=E,y=A;S<y;S+=3){const T=o.getX(S),R=o.getX(S+1),x=o.getX(S+2);s=Cs(this,f,t,i,c,u,d,T,R,x),s&&(s.faceIndex=Math.floor(S/3),s.face.materialIndex=p.materialIndex,e.push(s))}}else{const g=Math.max(0,m.start),v=Math.min(o.count,m.start+m.count);for(let p=g,f=v;p<f;p+=3){const E=o.getX(p),A=o.getX(p+1),S=o.getX(p+2);s=Cs(this,a,t,i,c,u,d,E,A,S),s&&(s.faceIndex=Math.floor(p/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,v=h.length;g<v;g++){const p=h[g],f=a[p.materialIndex],E=Math.max(p.start,m.start),A=Math.min(l.count,Math.min(p.start+p.count,m.start+m.count));for(let S=E,y=A;S<y;S+=3){const T=S,R=S+1,x=S+2;s=Cs(this,f,t,i,c,u,d,T,R,x),s&&(s.faceIndex=Math.floor(S/3),s.face.materialIndex=p.materialIndex,e.push(s))}}else{const g=Math.max(0,m.start),v=Math.min(l.count,m.start+m.count);for(let p=g,f=v;p<f;p+=3){const E=p,A=p+1,S=p+2;s=Cs(this,a,t,i,c,u,d,E,A,S),s&&(s.faceIndex=Math.floor(p/3),e.push(s))}}}}function qu(n,t,e,i,s,r,a,o){let l;if(t.side===We?l=i.intersectTriangle(a,r,s,!0,o):l=i.intersectTriangle(s,r,a,t.side===ni,o),l===null)return null;Rs.copy(o),Rs.applyMatrix4(n.matrixWorld);const c=e.ray.origin.distanceTo(Rs);return c<e.near||c>e.far?null:{distance:c,point:Rs.clone(),object:n}}function Cs(n,t,e,i,s,r,a,o,l,c){n.getVertexPosition(o,Es),n.getVertexPosition(l,Ts),n.getVertexPosition(c,As);const u=qu(n,t,e,i,Es,Ts,As,hl);if(u){const d=new D;sn.getBarycoord(hl,Es,Ts,As,d),s&&(u.uv=sn.getInterpolatedAttribute(s,o,l,c,d,new Ct)),r&&(u.uv1=sn.getInterpolatedAttribute(r,o,l,c,d,new Ct)),a&&(u.normal=sn.getInterpolatedAttribute(a,o,l,c,d,new D),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const h={a:o,b:l,c,normal:new D,materialIndex:0};sn.getNormal(Es,Ts,As,h.normal),u.face=h,u.barycoord=d}return u}class Zu extends Ae{constructor(t=null,e=1,i=1,s,r,a,o,l,c=Ee,u=Ee,d,h){super(null,a,o,l,c,u,s,r,d,h),this.isDataTexture=!0,this.image={data:t,width:e,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Kn=new hr,Ku=new Ct(.5,.5),Ps=new D;class xo{constructor(t=new dn,e=new dn,i=new dn,s=new dn,r=new dn,a=new dn){this.planes=[t,e,i,s,r,a]}set(t,e,i,s,r,a){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(i),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(t){const e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=gn,i=!1){const s=this.planes,r=t.elements,a=r[0],o=r[1],l=r[2],c=r[3],u=r[4],d=r[5],h=r[6],m=r[7],g=r[8],v=r[9],p=r[10],f=r[11],E=r[12],A=r[13],S=r[14],y=r[15];if(s[0].setComponents(c-a,m-u,f-g,y-E).normalize(),s[1].setComponents(c+a,m+u,f+g,y+E).normalize(),s[2].setComponents(c+o,m+d,f+v,y+A).normalize(),s[3].setComponents(c-o,m-d,f-v,y-A).normalize(),i)s[4].setComponents(l,h,p,S).normalize(),s[5].setComponents(c-l,m-h,f-p,y-S).normalize();else if(s[4].setComponents(c-l,m-h,f-p,y-S).normalize(),e===gn)s[5].setComponents(c+l,m+h,f+p,y+S).normalize();else if(e===es)s[5].setComponents(l,h,p,S).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Kn.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Kn.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Kn)}intersectsSprite(t){Kn.center.set(0,0,0);const e=Ku.distanceTo(t.center);return Kn.radius=.7071067811865476+e,Kn.applyMatrix4(t.matrixWorld),this.intersectsSphere(Kn)}intersectsSphere(t){const e=this.planes,i=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let i=0;i<6;i++){const s=e[i];if(Ps.x=s.normal.x>0?t.max.x:t.min.x,Ps.y=s.normal.y>0?t.max.y:t.min.y,Ps.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Ps)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Wc extends Ni{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ft(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const nr=new D,ir=new D,ul=new ae,Gi=new ur,Ds=new hr,Vr=new D,dl=new D;class $u extends xe{constructor(t=new Qe,e=new Wc){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,i=[0];for(let s=1,r=e.count;s<r;s++)nr.fromBufferAttribute(e,s-1),ir.fromBufferAttribute(e,s),i[s]=i[s-1],i[s]+=nr.distanceTo(ir);t.setAttribute("lineDistance",new Te(i,1))}else Pt("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){const i=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Ds.copy(i.boundingSphere),Ds.applyMatrix4(s),Ds.radius+=r,t.ray.intersectsSphere(Ds)===!1)return;ul.copy(s).invert(),Gi.copy(t.ray).applyMatrix4(ul);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,u=i.index,h=i.attributes.position;if(u!==null){const m=Math.max(0,a.start),g=Math.min(u.count,a.start+a.count);for(let v=m,p=g-1;v<p;v+=c){const f=u.getX(v),E=u.getX(v+1),A=Ls(this,t,Gi,l,f,E,v);A&&e.push(A)}if(this.isLineLoop){const v=u.getX(g-1),p=u.getX(m),f=Ls(this,t,Gi,l,v,p,g-1);f&&e.push(f)}}else{const m=Math.max(0,a.start),g=Math.min(h.count,a.start+a.count);for(let v=m,p=g-1;v<p;v+=c){const f=Ls(this,t,Gi,l,v,v+1,v);f&&e.push(f)}if(this.isLineLoop){const v=Ls(this,t,Gi,l,g-1,m,g-1);v&&e.push(v)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function Ls(n,t,e,i,s,r,a){const o=n.geometry.attributes.position;if(nr.fromBufferAttribute(o,s),ir.fromBufferAttribute(o,r),e.distanceSqToSegment(nr,ir,Vr,dl)>i)return;Vr.applyMatrix4(n.matrixWorld);const c=t.ray.origin.distanceTo(Vr);if(!(c<t.near||c>t.far))return{distance:c,point:dl.clone().applyMatrix4(n.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:n}}const fl=new D,pl=new D;class Ju extends $u{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,i=[];for(let s=0,r=e.count;s<r;s+=2)fl.fromBufferAttribute(e,s),pl.fromBufferAttribute(e,s+1),i[s]=s===0?0:i[s-1],i[s+1]=i[s]+fl.distanceTo(pl);t.setAttribute("lineDistance",new Te(i,1))}else Pt("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Xc extends Ae{constructor(t=[],e=ii,i,s,r,a,o,l,c,u){super(t,e,i,s,r,a,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Qu extends Ae{constructor(t,e,i,s,r,a,o,l,c){super(t,e,i,s,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class ns extends Ae{constructor(t,e,i=vn,s,r,a,o=Ee,l=Ee,c,u=Dn,d=1){if(u!==Dn&&u!==jn)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const h={width:t,height:e,depth:d};super(h,s,r,a,o,l,u,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new go(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return e.compareFunction=this.compareFunction,e}}class ju extends ns{constructor(t,e=vn,i=ii,s,r,a=Ee,o=Ee,l,c=Dn){const u={width:t,height:t,depth:1},d=[u,u,u,u,u,u];super(t,t,e,i,s,r,a,o,l,c),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}}class Yc extends Ae{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class ls extends Qe{constructor(t=1,e=1,i=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const l=[],c=[],u=[],d=[];let h=0,m=0;g("z","y","x",-1,-1,i,e,t,a,r,0),g("z","y","x",1,-1,i,e,-t,a,r,1),g("x","z","y",1,1,t,i,e,s,a,2),g("x","z","y",1,-1,t,i,-e,s,a,3),g("x","y","z",1,-1,t,e,i,s,r,4),g("x","y","z",-1,-1,t,e,-i,s,r,5),this.setIndex(l),this.setAttribute("position",new Te(c,3)),this.setAttribute("normal",new Te(u,3)),this.setAttribute("uv",new Te(d,2));function g(v,p,f,E,A,S,y,T,R,x,w){const I=S/R,F=y/x,z=S/2,V=y/2,U=T/2,H=R+1,K=x+1;let Z=0,nt=0;const X=new D;for(let j=0;j<K;j++){const et=j*F-V;for(let wt=0;wt<H;wt++){const Tt=wt*I-z;X[v]=Tt*E,X[p]=et*A,X[f]=U,c.push(X.x,X.y,X.z),X[v]=0,X[p]=0,X[f]=T>0?1:-1,u.push(X.x,X.y,X.z),d.push(wt/R),d.push(1-j/x),Z+=1}}for(let j=0;j<x;j++)for(let et=0;et<R;et++){const wt=h+et+H*j,Tt=h+et+H*(j+1),ne=h+(et+1)+H*(j+1),Wt=h+(et+1)+H*j;l.push(wt,Tt,Wt),l.push(Tt,ne,Wt),nt+=6}o.addGroup(m,nt,w),m+=nt,h+=Z}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ls(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function td(n,t,e=2){const i=t&&t.length,s=i?t[0]*e:n.length;let r=qc(n,0,s,e,!0);const a=[];if(!r||r.next===r.prev)return a;let o,l,c;if(i&&(r=rd(n,t,r,e)),n.length>80*e){o=n[0],l=n[1];let u=o,d=l;for(let h=e;h<s;h+=e){const m=n[h],g=n[h+1];m<o&&(o=m),g<l&&(l=g),m>u&&(u=m),g>d&&(d=g)}c=Math.max(u-o,d-l),c=c!==0?32767/c:0}return is(r,a,e,o,l,c,0),a}function qc(n,t,e,i,s){let r;if(s===gd(n,t,e,i)>0)for(let a=t;a<e;a+=i)r=ml(a/i|0,n[a],n[a+1],r);else for(let a=e-i;a>=t;a-=i)r=ml(a/i|0,n[a],n[a+1],r);return r&&Li(r,r.next)&&(rs(r),r=r.next),r}function ri(n,t){if(!n)return n;t||(t=n);let e=n,i;do if(i=!1,!e.steiner&&(Li(e,e.next)||ue(e.prev,e,e.next)===0)){if(rs(e),e=t=e.prev,e===e.next)break;i=!0}else e=e.next;while(i||e!==t);return t}function is(n,t,e,i,s,r,a){if(!n)return;!a&&r&&hd(n,i,s,r);let o=n;for(;n.prev!==n.next;){const l=n.prev,c=n.next;if(r?nd(n,i,s,r):ed(n)){t.push(l.i,n.i,c.i),rs(n),n=c.next,o=c.next;continue}if(n=c,n===o){a?a===1?(n=id(ri(n),t),is(n,t,e,i,s,r,2)):a===2&&sd(n,t,e,i,s,r):is(ri(n),t,e,i,s,r,1);break}}}function ed(n){const t=n.prev,e=n,i=n.next;if(ue(t,e,i)>=0)return!1;const s=t.x,r=e.x,a=i.x,o=t.y,l=e.y,c=i.y,u=Math.min(s,r,a),d=Math.min(o,l,c),h=Math.max(s,r,a),m=Math.max(o,l,c);let g=i.next;for(;g!==t;){if(g.x>=u&&g.x<=h&&g.y>=d&&g.y<=m&&Zi(s,o,r,l,a,c,g.x,g.y)&&ue(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function nd(n,t,e,i){const s=n.prev,r=n,a=n.next;if(ue(s,r,a)>=0)return!1;const o=s.x,l=r.x,c=a.x,u=s.y,d=r.y,h=a.y,m=Math.min(o,l,c),g=Math.min(u,d,h),v=Math.max(o,l,c),p=Math.max(u,d,h),f=$a(m,g,t,e,i),E=$a(v,p,t,e,i);let A=n.prevZ,S=n.nextZ;for(;A&&A.z>=f&&S&&S.z<=E;){if(A.x>=m&&A.x<=v&&A.y>=g&&A.y<=p&&A!==s&&A!==a&&Zi(o,u,l,d,c,h,A.x,A.y)&&ue(A.prev,A,A.next)>=0||(A=A.prevZ,S.x>=m&&S.x<=v&&S.y>=g&&S.y<=p&&S!==s&&S!==a&&Zi(o,u,l,d,c,h,S.x,S.y)&&ue(S.prev,S,S.next)>=0))return!1;S=S.nextZ}for(;A&&A.z>=f;){if(A.x>=m&&A.x<=v&&A.y>=g&&A.y<=p&&A!==s&&A!==a&&Zi(o,u,l,d,c,h,A.x,A.y)&&ue(A.prev,A,A.next)>=0)return!1;A=A.prevZ}for(;S&&S.z<=E;){if(S.x>=m&&S.x<=v&&S.y>=g&&S.y<=p&&S!==s&&S!==a&&Zi(o,u,l,d,c,h,S.x,S.y)&&ue(S.prev,S,S.next)>=0)return!1;S=S.nextZ}return!0}function id(n,t){let e=n;do{const i=e.prev,s=e.next.next;!Li(i,s)&&Kc(i,e,e.next,s)&&ss(i,s)&&ss(s,i)&&(t.push(i.i,e.i,s.i),rs(e),rs(e.next),e=n=s),e=e.next}while(e!==n);return ri(e)}function sd(n,t,e,i,s,r){let a=n;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&fd(a,o)){let l=$c(a,o);a=ri(a,a.next),l=ri(l,l.next),is(a,t,e,i,s,r,0),is(l,t,e,i,s,r,0);return}o=o.next}a=a.next}while(a!==n)}function rd(n,t,e,i){const s=[];for(let r=0,a=t.length;r<a;r++){const o=t[r]*i,l=r<a-1?t[r+1]*i:n.length,c=qc(n,o,l,i,!1);c===c.next&&(c.steiner=!0),s.push(dd(c))}s.sort(ad);for(let r=0;r<s.length;r++)e=od(s[r],e);return e}function ad(n,t){let e=n.x-t.x;if(e===0&&(e=n.y-t.y,e===0)){const i=(n.next.y-n.y)/(n.next.x-n.x),s=(t.next.y-t.y)/(t.next.x-t.x);e=i-s}return e}function od(n,t){const e=ld(n,t);if(!e)return t;const i=$c(e,n);return ri(i,i.next),ri(e,e.next)}function ld(n,t){let e=t;const i=n.x,s=n.y;let r=-1/0,a;if(Li(n,e))return e;do{if(Li(n,e.next))return e.next;if(s<=e.y&&s>=e.next.y&&e.next.y!==e.y){const d=e.x+(s-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(d<=i&&d>r&&(r=d,a=e.x<e.next.x?e:e.next,d===i))return a}e=e.next}while(e!==t);if(!a)return null;const o=a,l=a.x,c=a.y;let u=1/0;e=a;do{if(i>=e.x&&e.x>=l&&i!==e.x&&Zc(s<c?i:r,s,l,c,s<c?r:i,s,e.x,e.y)){const d=Math.abs(s-e.y)/(i-e.x);ss(e,n)&&(d<u||d===u&&(e.x>a.x||e.x===a.x&&cd(a,e)))&&(a=e,u=d)}e=e.next}while(e!==o);return a}function cd(n,t){return ue(n.prev,n,t.prev)<0&&ue(t.next,n,n.next)<0}function hd(n,t,e,i){let s=n;do s.z===0&&(s.z=$a(s.x,s.y,t,e,i)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==n);s.prevZ.nextZ=null,s.prevZ=null,ud(s)}function ud(n){let t,e=1;do{let i=n,s;n=null;let r=null;for(t=0;i;){t++;let a=i,o=0;for(let c=0;c<e&&(o++,a=a.nextZ,!!a);c++);let l=e;for(;o>0||l>0&&a;)o!==0&&(l===0||!a||i.z<=a.z)?(s=i,i=i.nextZ,o--):(s=a,a=a.nextZ,l--),r?r.nextZ=s:n=s,s.prevZ=r,r=s;i=a}r.nextZ=null,e*=2}while(t>1);return n}function $a(n,t,e,i,s){return n=(n-e)*s|0,t=(t-i)*s|0,n=(n|n<<8)&16711935,n=(n|n<<4)&252645135,n=(n|n<<2)&858993459,n=(n|n<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,n|t<<1}function dd(n){let t=n,e=n;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==n);return e}function Zc(n,t,e,i,s,r,a,o){return(s-a)*(t-o)>=(n-a)*(r-o)&&(n-a)*(i-o)>=(e-a)*(t-o)&&(e-a)*(r-o)>=(s-a)*(i-o)}function Zi(n,t,e,i,s,r,a,o){return!(n===a&&t===o)&&Zc(n,t,e,i,s,r,a,o)}function fd(n,t){return n.next.i!==t.i&&n.prev.i!==t.i&&!pd(n,t)&&(ss(n,t)&&ss(t,n)&&md(n,t)&&(ue(n.prev,n,t.prev)||ue(n,t.prev,t))||Li(n,t)&&ue(n.prev,n,n.next)>0&&ue(t.prev,t,t.next)>0)}function ue(n,t,e){return(t.y-n.y)*(e.x-t.x)-(t.x-n.x)*(e.y-t.y)}function Li(n,t){return n.x===t.x&&n.y===t.y}function Kc(n,t,e,i){const s=Us(ue(n,t,e)),r=Us(ue(n,t,i)),a=Us(ue(e,i,n)),o=Us(ue(e,i,t));return!!(s!==r&&a!==o||s===0&&Is(n,e,t)||r===0&&Is(n,i,t)||a===0&&Is(e,n,i)||o===0&&Is(e,t,i))}function Is(n,t,e){return t.x<=Math.max(n.x,e.x)&&t.x>=Math.min(n.x,e.x)&&t.y<=Math.max(n.y,e.y)&&t.y>=Math.min(n.y,e.y)}function Us(n){return n>0?1:n<0?-1:0}function pd(n,t){let e=n;do{if(e.i!==n.i&&e.next.i!==n.i&&e.i!==t.i&&e.next.i!==t.i&&Kc(e,e.next,n,t))return!0;e=e.next}while(e!==n);return!1}function ss(n,t){return ue(n.prev,n,n.next)<0?ue(n,t,n.next)>=0&&ue(n,n.prev,t)>=0:ue(n,t,n.prev)<0||ue(n,n.next,t)<0}function md(n,t){let e=n,i=!1;const s=(n.x+t.x)/2,r=(n.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&s<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(i=!i),e=e.next;while(e!==n);return i}function $c(n,t){const e=Ja(n.i,n.x,n.y),i=Ja(t.i,t.x,t.y),s=n.next,r=t.prev;return n.next=t,t.prev=n,e.next=s,s.prev=e,i.next=e,e.prev=i,r.next=i,i.prev=r,i}function ml(n,t,e,i){const s=Ja(n,t,e);return i?(s.next=i.next,s.prev=i,i.next.prev=s,i.next=s):(s.prev=s,s.next=s),s}function rs(n){n.next.prev=n.prev,n.prev.next=n.next,n.prevZ&&(n.prevZ.nextZ=n.nextZ),n.nextZ&&(n.nextZ.prevZ=n.prevZ)}function Ja(n,t,e){return{i:n,x:t,y:e,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function gd(n,t,e,i){let s=0;for(let r=t,a=e-i;r<e;r+=i)s+=(n[a]-n[r])*(n[r+1]+n[a+1]),a=r;return s}class _d{static triangulate(t,e,i=2){return td(t,e,i)}}class vo{static area(t){const e=t.length;let i=0;for(let s=e-1,r=0;r<e;s=r++)i+=t[s].x*t[r].y-t[r].x*t[s].y;return i*.5}static isClockWise(t){return vo.area(t)<0}static triangulateShape(t,e){const i=[],s=[],r=[];gl(t),_l(i,t);let a=t.length;e.forEach(gl);for(let l=0;l<e.length;l++)s.push(a),a+=e[l].length,_l(i,e[l]);const o=_d.triangulate(i,s);for(let l=0;l<o.length;l+=3)r.push(o.slice(l,l+3));return r}}function gl(n){const t=n.length;t>2&&n[t-1].equals(n[0])&&n.pop()}function _l(n,t){for(let e=0;e<t.length;e++)n.push(t[e].x),n.push(t[e].y)}class cs extends Qe{constructor(t=1,e=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:s};const r=t/2,a=e/2,o=Math.floor(i),l=Math.floor(s),c=o+1,u=l+1,d=t/o,h=e/l,m=[],g=[],v=[],p=[];for(let f=0;f<u;f++){const E=f*h-a;for(let A=0;A<c;A++){const S=A*d-r;g.push(S,-E,0),v.push(0,0,1),p.push(A/o),p.push(1-f/l)}}for(let f=0;f<l;f++)for(let E=0;E<o;E++){const A=E+c*f,S=E+c*(f+1),y=E+1+c*(f+1),T=E+1+c*f;m.push(A,S,T),m.push(S,y,T)}this.setIndex(m),this.setAttribute("position",new Te(g,3)),this.setAttribute("normal",new Te(v,3)),this.setAttribute("uv",new Te(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new cs(t.width,t.height,t.widthSegments,t.heightSegments)}}function Ii(n){const t={};for(const e in n){t[e]={};for(const i in n[e]){const s=n[e][i];if(xl(s))s.isRenderTargetTexture?(Pt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=s.clone();else if(Array.isArray(s))if(xl(s[0])){const r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();t[e][i]=r}else t[e][i]=s.slice();else t[e][i]=s}}return t}function Ue(n){const t={};for(let e=0;e<n.length;e++){const i=Ii(n[e]);for(const s in i)t[s]=i[s]}return t}function xl(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function xd(n){const t=[];for(let e=0;e<n.length;e++)t.push(n[e].clone());return t}function Jc(n){const t=n.getRenderTarget();return t===null?n.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Vt.workingColorSpace}const vd={clone:Ii,merge:Ue};var Md=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Sd=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Sn extends Ni{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Md,this.fragmentShader=Sd,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Ii(t.uniforms),this.uniformsGroups=xd(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?e.uniforms[s]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[s]={type:"m4",value:a.toArray()}:e.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}fromJSON(t,e){if(super.fromJSON(t,e),t.uniforms!==void 0)for(const i in t.uniforms){const s=t.uniforms[i];switch(this.uniforms[i]={},s.type){case"t":this.uniforms[i].value=e[s.value]||null;break;case"c":this.uniforms[i].value=new Ft().setHex(s.value);break;case"v2":this.uniforms[i].value=new Ct().fromArray(s.value);break;case"v3":this.uniforms[i].value=new D().fromArray(s.value);break;case"v4":this.uniforms[i].value=new he().fromArray(s.value);break;case"m3":this.uniforms[i].value=new Lt().fromArray(s.value);break;case"m4":this.uniforms[i].value=new ae().fromArray(s.value);break;default:this.uniforms[i].value=s.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(const i in t.extensions)this.extensions[i]=t.extensions[i];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}}class yd extends Sn{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Jn extends Ni{constructor(t){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Ft(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ft(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Za,this.normalScale=new Ct(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Vn,this.combine=ao,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.envMapIntensity=t.envMapIntensity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class bd extends Ni{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=uu,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Ed extends Ni{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class Mo extends xe{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Ft(t),this.intensity=e}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}}class Td extends Mo{constructor(t,e,i){super(t,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(xe.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ft(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}toJSON(t){const e=super.toJSON(t);return e.object.groundColor=this.groundColor.getHex(),e}}const Wr=new ae,vl=new D,Ml=new D;class Qc{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ct(512,512),this.mapType=Ze,this.map=null,this.mapPass=null,this.matrix=new ae,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new xo,this._frameExtents=new Ct(1,1),this._viewportCount=1,this._viewports=[new he(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera;vl.setFromMatrixPosition(t.matrixWorld),e.position.copy(vl),Ml.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Ml),e.updateMatrixWorld(),this._updateMatrix(e,this.matrix,this._frustum)}_updateMatrix(t,e,i,s){Wr.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),i.setFromProjectionMatrix(Wr,t.coordinateSystem,t.reversedDepth);const r=this._frameExtents,a=s?s.z/r.x:1,o=s?s.w/r.y:1,l=s?s.x/r.x:0,c=s?s.y/r.y:0;t.coordinateSystem===es||t.reversedDepth?e.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):e.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),e.multiply(Wr)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return t.intensity=this.intensity,t.bias=this.bias,t.normalBias=this.normalBias,t.radius=this.radius,t.blurSamples=this.blurSamples,t.mapSize=this.mapSize.toArray(),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const Ns=new D,Fs=new Gn,hn=new D;class jc extends xe{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ae,this.projectionMatrix=new ae,this.projectionMatrixInverse=new ae,this.coordinateSystem=gn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(Ns,Fs,hn),hn.x===1&&hn.y===1&&hn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ns,Fs,hn.set(1,1,1)).invert()}updateWorldMatrix(t,e,i=!1){super.updateWorldMatrix(t,e,i),this.matrixWorld.decompose(Ns,Fs,hn),hn.x===1&&hn.y===1&&hn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ns,Fs,hn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const kn=new D,Sl=new Ct,yl=new Ct;class qe extends jc{constructor(t=50,e=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Ka*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Zs*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Ka*2*Math.atan(Math.tan(Zs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){kn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(kn.x,kn.y).multiplyScalar(-t/kn.z),kn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(kn.x,kn.y).multiplyScalar(-t/kn.z)}getViewSize(t,e){return this.getViewBounds(t,Sl,yl),e.subVectors(yl,Sl)}setViewOffset(t,e,i,s,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Zs*.5*this.fov)/this.zoom,i=2*e,s=this.aspect*i,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,e-=a.offsetY*i/c,s*=a.width/l,i*=a.height/c}const o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-i,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}class Ad extends Qc{constructor(){super(new qe(90,1,.5,500)),this.isPointLightShadow=!0}}class wd extends Mo{constructor(t,e,i=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=s,this.shadow=new Ad}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}toJSON(t){const e=super.toJSON(t);return e.object.distance=this.distance,e.object.decay=this.decay,e.object.shadow=this.shadow.toJSON(),e}}class So extends jc{constructor(t=-1,e=1,i=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=i-t,a=i+t,o=s+e,l=s-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class Rd extends Qc{constructor(){super(new So(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Cd extends Mo{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(xe.DEFAULT_UP),this.updateMatrix(),this.target=new xe,this.shadow=new Rd}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){const e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}}const xi=-90,vi=1;class Pd extends xe{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new qe(xi,vi,t,e);s.layers=this.layers,this.add(s);const r=new qe(xi,vi,t,e);r.layers=this.layers,this.add(r);const a=new qe(xi,vi,t,e);a.layers=this.layers,this.add(a);const o=new qe(xi,vi,t,e);o.layers=this.layers,this.add(o);const l=new qe(xi,vi,t,e);l.layers=this.layers,this.add(l);const c=new qe(xi,vi,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[i,s,r,a,o,l]=e;for(const c of e)this.remove(c);if(t===gn)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===es)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,c,u]=this.children,d=t.getRenderTarget(),h=t.getActiveCubeFace(),m=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const v=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let p=!1;t.isWebGLRenderer===!0?p=t.state.buffers.depth.getReversed():p=t.reversedDepthBuffer,t.setRenderTarget(i,0,s),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,r),t.setRenderTarget(i,1,s),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(i,2,s),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(i,3,s),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),t.setRenderTarget(i,4,s),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),i.texture.generateMipmaps=v,t.setRenderTarget(i,5,s),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,u),t.setRenderTarget(d,h,m),t.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class Dd extends qe{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}const bl=new ae;class Ld{constructor(t,e,i=0,s=1/0){this.ray=new ur(t,e),this.near=i,this.far=s,this.camera=null,this.layers=new _o,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,e.projectionMatrix.elements[14]).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):Yt("Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return bl.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(bl),this}intersectObject(t,e=!0,i=[]){return Qa(t,this,i,e),i.sort(El),i}intersectObjects(t,e=!0,i=[]){for(let s=0,r=t.length;s<r;s++)Qa(t[s],this,i,e);return i.sort(El),i}}function El(n,t){return n.distance-t.distance}function Qa(n,t,e,i){let s=!0;if(n.layers.test(t.layers)&&n.raycast(t,e)===!1&&(s=!1),s===!0&&i===!0){const r=n.children;for(let a=0,o=r.length;a<o;a++)Qa(r[a],t,e,!0)}}class Tl{constructor(t=1,e=0,i=0){this.radius=t,this.phi=e,this.theta=i}set(t,e,i){return this.radius=t,this.phi=e,this.theta=i,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Ht(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,i){return this.radius=Math.sqrt(t*t+e*e+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,i),this.phi=Math.acos(Ht(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}const Ro=class Ro{constructor(t,e,i,s){this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,i,s)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let i=0;i<4;i++)this.elements[i]=t[i+e];return this}set(t,e,i,s){const r=this.elements;return r[0]=t,r[2]=e,r[1]=i,r[3]=s,this}};Ro.prototype.isMatrix2=!0;let Al=Ro;class Id extends Ju{constructor(t=10,e=10,i=4473924,s=8947848){i=new Ft(i),s=new Ft(s);const r=e/2,a=t/e,o=t/2,l=[],c=[];for(let h=0,m=0,g=-o;h<=e;h++,g+=a){l.push(-o,0,g,o,0,g),l.push(g,0,-o,g,0,o);const v=h===r?i:s;v.toArray(c,m),m+=3,v.toArray(c,m),m+=3,v.toArray(c,m),m+=3,v.toArray(c,m),m+=3}const u=new Qe;u.setAttribute("position",new Te(l,3)),u.setAttribute("color",new Te(c,3));const d=new Wc({vertexColors:!0,toneMapped:!1});super(u,d),this.type="GridHelper"}dispose(){super.dispose(),this.geometry.dispose(),this.material.dispose()}}class Ud extends Wn{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(t){this.domElement!==null&&this.disconnect(),this.domElement=t}disconnect(){}dispose(){}update(){}}function wl(n,t,e,i){const s=Nd(i);switch(e){case Nc:return n*t;case Oc:return n*t/s.components*s.byteLength;case ho:return n*t/s.components*s.byteLength;case si:return n*t*2/s.components*s.byteLength;case uo:return n*t*2/s.components*s.byteLength;case Fc:return n*t*3/s.components*s.byteLength;case an:return n*t*4/s.components*s.byteLength;case fo:return n*t*4/s.components*s.byteLength;case Ws:case Xs:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case Ys:case qs:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case va:case Sa:return Math.max(n,16)*Math.max(t,8)/4;case xa:case Ma:return Math.max(n,8)*Math.max(t,8)/2;case ya:case ba:case Ta:case Aa:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case Ea:case Js:case wa:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Ra:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Ca:return Math.floor((n+4)/5)*Math.floor((t+3)/4)*16;case Pa:return Math.floor((n+4)/5)*Math.floor((t+4)/5)*16;case Da:return Math.floor((n+5)/6)*Math.floor((t+4)/5)*16;case La:return Math.floor((n+5)/6)*Math.floor((t+5)/6)*16;case Ia:return Math.floor((n+7)/8)*Math.floor((t+4)/5)*16;case Ua:return Math.floor((n+7)/8)*Math.floor((t+5)/6)*16;case Na:return Math.floor((n+7)/8)*Math.floor((t+7)/8)*16;case Fa:return Math.floor((n+9)/10)*Math.floor((t+4)/5)*16;case Oa:return Math.floor((n+9)/10)*Math.floor((t+5)/6)*16;case Ba:return Math.floor((n+9)/10)*Math.floor((t+7)/8)*16;case ka:return Math.floor((n+9)/10)*Math.floor((t+9)/10)*16;case za:return Math.floor((n+11)/12)*Math.floor((t+9)/10)*16;case Ha:return Math.floor((n+11)/12)*Math.floor((t+11)/12)*16;case Ga:case Va:case Wa:return Math.ceil(n/4)*Math.ceil(t/4)*16;case Xa:case Ya:return Math.ceil(n/4)*Math.ceil(t/4)*8;case Qs:case qa:return Math.ceil(n/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Nd(n){switch(n){case Ze:case Dc:return{byteLength:1,components:1};case ji:case Lc:case Mn:return{byteLength:2,components:1};case lo:case co:return{byteLength:2,components:4};case vn:case oo:case mn:return{byteLength:4,components:1};case Ic:case Uc:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:ro}}));typeof window<"u"&&(window.__THREE__?Pt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=ro);function th(){let n=null,t=!1,e=null,i=null;function s(r,a){i=n.requestAnimationFrame(s),e(r,a)}return{start:function(){t!==!0&&e!==null&&n!==null&&(i=n.requestAnimationFrame(s),t=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){n=r}}}function Fd(n){const t=new WeakMap;function e(o,l){const c=o.array,u=o.usage,d=c.byteLength,h=n.createBuffer();n.bindBuffer(l,h),n.bufferData(l,c,u),o.onUploadCallback();let m;if(c instanceof Float32Array)m=n.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)m=n.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?m=n.HALF_FLOAT:m=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)m=n.SHORT;else if(c instanceof Uint32Array)m=n.UNSIGNED_INT;else if(c instanceof Int32Array)m=n.INT;else if(c instanceof Int8Array)m=n.BYTE;else if(c instanceof Uint8Array)m=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)m=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:h,type:m,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:d}}function i(o,l,c){const u=l.array,d=l.updateRanges;if(n.bindBuffer(c,o),d.length===0)n.bufferSubData(c,0,u);else{d.sort((m,g)=>m.start-g.start);let h=0;for(let m=1;m<d.length;m++){const g=d[h],v=d[m];v.start<=g.start+g.count+1?g.count=Math.max(g.count,v.start+v.count-g.start):(++h,d[h]=v)}d.length=h+1;for(let m=0,g=d.length;m<g;m++){const v=d[m];n.bufferSubData(c,v.start*u.BYTES_PER_ELEMENT,u,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=t.get(o);l&&(n.deleteBuffer(l.buffer),t.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=t.get(o);(!u||u.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=t.get(o);if(c===void 0)t.set(o,e(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}var Od=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Bd=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,kd=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,zd=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Hd=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Gd=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Vd=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Wd=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Xd=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,Yd=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,qd=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Zd=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Kd=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,$d=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Jd=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Qd=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,jd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,tf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,ef=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,nf=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,sf=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,rf=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,af=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,of=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,lf=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,cf=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,hf=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,uf=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,df=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,ff=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,pf="gl_FragColor = linearToOutputTexel( gl_FragColor );",mf=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,gf=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,_f=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,xf=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,vf=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Mf=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Sf=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,yf=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,bf=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Ef=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Tf=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Af=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,wf=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Rf=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Cf=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,Pf=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,Df=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Lf=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,If=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Uf=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Nf=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Ff=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Of=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Bf=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,kf=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,zf=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,Hf=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Gf=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Vf=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Wf=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Xf=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Yf=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,qf=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Zf=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Kf=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,$f=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Jf=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Qf=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,jf=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,tp=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,ep=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,np=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,ip=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,sp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,rp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ap=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,op=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,lp=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,cp=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,hp=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,up=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,dp=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,fp=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,pp=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,mp=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,gp=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,_p=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,xp=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,vp=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Mp=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,Sp=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,yp=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,bp=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Ep=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Tp=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Ap=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,wp=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Rp=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Cp=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Pp=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Dp=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Lp=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Ip=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Up=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Np=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Fp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Op=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Bp=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,kp=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,zp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Hp=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Gp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Vp=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Wp=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Xp=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Yp=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,qp=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,Zp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Kp=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,$p=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Jp=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Qp=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,jp=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,tm=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,em=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,nm=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,im=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,sm=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,rm=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,am=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,om=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,lm=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,cm=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,hm=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,um=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,dm=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,fm=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,pm=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,mm=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,gm=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,_m=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Nt={alphahash_fragment:Od,alphahash_pars_fragment:Bd,alphamap_fragment:kd,alphamap_pars_fragment:zd,alphatest_fragment:Hd,alphatest_pars_fragment:Gd,aomap_fragment:Vd,aomap_pars_fragment:Wd,batching_pars_vertex:Xd,batching_vertex:Yd,begin_vertex:qd,beginnormal_vertex:Zd,bsdfs:Kd,iridescence_fragment:$d,bumpmap_pars_fragment:Jd,clipping_planes_fragment:Qd,clipping_planes_pars_fragment:jd,clipping_planes_pars_vertex:tf,clipping_planes_vertex:ef,color_fragment:nf,color_pars_fragment:sf,color_pars_vertex:rf,color_vertex:af,common:of,cube_uv_reflection_fragment:lf,defaultnormal_vertex:cf,displacementmap_pars_vertex:hf,displacementmap_vertex:uf,emissivemap_fragment:df,emissivemap_pars_fragment:ff,colorspace_fragment:pf,colorspace_pars_fragment:mf,envmap_fragment:gf,envmap_common_pars_fragment:_f,envmap_pars_fragment:xf,envmap_pars_vertex:vf,envmap_physical_pars_fragment:Pf,envmap_vertex:Mf,fog_vertex:Sf,fog_pars_vertex:yf,fog_fragment:bf,fog_pars_fragment:Ef,gradientmap_pars_fragment:Tf,lightmap_pars_fragment:Af,lights_lambert_fragment:wf,lights_lambert_pars_fragment:Rf,lights_pars_begin:Cf,lights_toon_fragment:Df,lights_toon_pars_fragment:Lf,lights_phong_fragment:If,lights_phong_pars_fragment:Uf,lights_physical_fragment:Nf,lights_physical_pars_fragment:Ff,lights_fragment_begin:Of,lights_fragment_maps:Bf,lights_fragment_end:kf,lightprobes_pars_fragment:zf,logdepthbuf_fragment:Hf,logdepthbuf_pars_fragment:Gf,logdepthbuf_pars_vertex:Vf,logdepthbuf_vertex:Wf,map_fragment:Xf,map_pars_fragment:Yf,map_particle_fragment:qf,map_particle_pars_fragment:Zf,metalnessmap_fragment:Kf,metalnessmap_pars_fragment:$f,morphinstance_vertex:Jf,morphcolor_vertex:Qf,morphnormal_vertex:jf,morphtarget_pars_vertex:tp,morphtarget_vertex:ep,normal_fragment_begin:np,normal_fragment_maps:ip,normal_pars_fragment:sp,normal_pars_vertex:rp,normal_vertex:ap,normalmap_pars_fragment:op,clearcoat_normal_fragment_begin:lp,clearcoat_normal_fragment_maps:cp,clearcoat_pars_fragment:hp,iridescence_pars_fragment:up,opaque_fragment:dp,packing:fp,premultiplied_alpha_fragment:pp,project_vertex:mp,dithering_fragment:gp,dithering_pars_fragment:_p,roughnessmap_fragment:xp,roughnessmap_pars_fragment:vp,shadowmap_pars_fragment:Mp,shadowmap_pars_vertex:Sp,shadowmap_vertex:yp,shadowmask_pars_fragment:bp,skinbase_vertex:Ep,skinning_pars_vertex:Tp,skinning_vertex:Ap,skinnormal_vertex:wp,specularmap_fragment:Rp,specularmap_pars_fragment:Cp,tonemapping_fragment:Pp,tonemapping_pars_fragment:Dp,transmission_fragment:Lp,transmission_pars_fragment:Ip,uv_pars_fragment:Up,uv_pars_vertex:Np,uv_vertex:Fp,worldpos_vertex:Op,background_vert:Bp,background_frag:kp,backgroundCube_vert:zp,backgroundCube_frag:Hp,cube_vert:Gp,cube_frag:Vp,depth_vert:Wp,depth_frag:Xp,distance_vert:Yp,distance_frag:qp,equirect_vert:Zp,equirect_frag:Kp,linedashed_vert:$p,linedashed_frag:Jp,meshbasic_vert:Qp,meshbasic_frag:jp,meshlambert_vert:tm,meshlambert_frag:em,meshmatcap_vert:nm,meshmatcap_frag:im,meshnormal_vert:sm,meshnormal_frag:rm,meshphong_vert:am,meshphong_frag:om,meshphysical_vert:lm,meshphysical_frag:cm,meshtoon_vert:hm,meshtoon_frag:um,points_vert:dm,points_frag:fm,shadow_vert:pm,shadow_frag:mm,sprite_vert:gm,sprite_frag:_m},ut={common:{diffuse:{value:new Ft(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Lt},alphaMap:{value:null},alphaMapTransform:{value:new Lt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Lt}},envmap:{envMap:{value:null},envMapRotation:{value:new Lt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Lt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Lt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Lt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Lt},normalScale:{value:new Ct(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Lt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Lt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Lt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Lt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ft(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new D},probesMax:{value:new D},probesResolution:{value:new D}},points:{diffuse:{value:new Ft(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Lt},alphaTest:{value:0},uvTransform:{value:new Lt}},sprite:{diffuse:{value:new Ft(16777215)},opacity:{value:1},center:{value:new Ct(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Lt},alphaMap:{value:null},alphaMapTransform:{value:new Lt},alphaTest:{value:0}}},fn={basic:{uniforms:Ue([ut.common,ut.specularmap,ut.envmap,ut.aomap,ut.lightmap,ut.fog]),vertexShader:Nt.meshbasic_vert,fragmentShader:Nt.meshbasic_frag},lambert:{uniforms:Ue([ut.common,ut.specularmap,ut.envmap,ut.aomap,ut.lightmap,ut.emissivemap,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.fog,ut.lights,{emissive:{value:new Ft(0)},envMapIntensity:{value:1}}]),vertexShader:Nt.meshlambert_vert,fragmentShader:Nt.meshlambert_frag},phong:{uniforms:Ue([ut.common,ut.specularmap,ut.envmap,ut.aomap,ut.lightmap,ut.emissivemap,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.fog,ut.lights,{emissive:{value:new Ft(0)},specular:{value:new Ft(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Nt.meshphong_vert,fragmentShader:Nt.meshphong_frag},standard:{uniforms:Ue([ut.common,ut.envmap,ut.aomap,ut.lightmap,ut.emissivemap,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.roughnessmap,ut.metalnessmap,ut.fog,ut.lights,{emissive:{value:new Ft(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Nt.meshphysical_vert,fragmentShader:Nt.meshphysical_frag},toon:{uniforms:Ue([ut.common,ut.aomap,ut.lightmap,ut.emissivemap,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.gradientmap,ut.fog,ut.lights,{emissive:{value:new Ft(0)}}]),vertexShader:Nt.meshtoon_vert,fragmentShader:Nt.meshtoon_frag},matcap:{uniforms:Ue([ut.common,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.fog,{matcap:{value:null}}]),vertexShader:Nt.meshmatcap_vert,fragmentShader:Nt.meshmatcap_frag},points:{uniforms:Ue([ut.points,ut.fog]),vertexShader:Nt.points_vert,fragmentShader:Nt.points_frag},dashed:{uniforms:Ue([ut.common,ut.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Nt.linedashed_vert,fragmentShader:Nt.linedashed_frag},depth:{uniforms:Ue([ut.common,ut.displacementmap]),vertexShader:Nt.depth_vert,fragmentShader:Nt.depth_frag},normal:{uniforms:Ue([ut.common,ut.bumpmap,ut.normalmap,ut.displacementmap,{opacity:{value:1}}]),vertexShader:Nt.meshnormal_vert,fragmentShader:Nt.meshnormal_frag},sprite:{uniforms:Ue([ut.sprite,ut.fog]),vertexShader:Nt.sprite_vert,fragmentShader:Nt.sprite_frag},background:{uniforms:{uvTransform:{value:new Lt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Nt.background_vert,fragmentShader:Nt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Lt}},vertexShader:Nt.backgroundCube_vert,fragmentShader:Nt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Nt.cube_vert,fragmentShader:Nt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Nt.equirect_vert,fragmentShader:Nt.equirect_frag},distance:{uniforms:Ue([ut.common,ut.displacementmap,{referencePosition:{value:new D},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Nt.distance_vert,fragmentShader:Nt.distance_frag},shadow:{uniforms:Ue([ut.lights,ut.fog,{color:{value:new Ft(0)},opacity:{value:1}}]),vertexShader:Nt.shadow_vert,fragmentShader:Nt.shadow_frag}};fn.physical={uniforms:Ue([fn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Lt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Lt},clearcoatNormalScale:{value:new Ct(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Lt},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Lt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Lt},sheen:{value:0},sheenColor:{value:new Ft(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Lt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Lt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Lt},transmissionSamplerSize:{value:new Ct},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Lt},attenuationDistance:{value:0},attenuationColor:{value:new Ft(0)},specularColor:{value:new Ft(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Lt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Lt},anisotropyVector:{value:new Ct},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Lt}}]),vertexShader:Nt.meshphysical_vert,fragmentShader:Nt.meshphysical_frag};const Os={r:0,b:0,g:0},xm=new ae,eh=new Lt;eh.set(-1,0,0,0,1,0,0,0,1);function vm(n,t,e,i,s,r){const a=new Ft(0);let o=s===!0?0:1,l,c,u=null,d=0,h=null;function m(E){let A=E.isScene===!0?E.background:null;if(A&&A.isTexture){const S=E.backgroundBlurriness>0;A=t.get(A,S)}return A}function g(E){let A=!1;const S=m(E);S===null?p(a,o):S&&S.isColor&&(p(S,1),A=!0);const y=n.xr.getEnvironmentBlendMode();y==="additive"?e.buffers.color.setClear(0,0,0,1,r):y==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,r),(n.autoClear||A)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function v(E,A){const S=m(A);S&&(S.isCubeTexture||S.mapping===cr)?(c===void 0&&(c=new Fe(new ls(1,1,1),new Sn({name:"BackgroundCubeMaterial",uniforms:Ii(fn.backgroundCube.uniforms),vertexShader:fn.backgroundCube.vertexShader,fragmentShader:fn.backgroundCube.fragmentShader,side:We,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(y,T,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),c.material.uniforms.envMap.value=S,c.material.uniforms.backgroundBlurriness.value=A.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=A.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(xm.makeRotationFromEuler(A.backgroundRotation)).transpose(),S.isCubeTexture&&S.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(eh),c.material.toneMapped=Vt.getTransfer(S.colorSpace)!==Qt,(u!==S||d!==S.version||h!==n.toneMapping)&&(c.material.needsUpdate=!0,u=S,d=S.version,h=n.toneMapping),c.layers.enableAll(),E.unshift(c,c.geometry,c.material,0,0,null)):S&&S.isTexture&&(l===void 0&&(l=new Fe(new cs(2,2),new Sn({name:"BackgroundMaterial",uniforms:Ii(fn.background.uniforms),vertexShader:fn.background.vertexShader,fragmentShader:fn.background.fragmentShader,side:ni,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=S,l.material.uniforms.backgroundIntensity.value=A.backgroundIntensity,l.material.toneMapped=Vt.getTransfer(S.colorSpace)!==Qt,S.matrixAutoUpdate===!0&&S.updateMatrix(),l.material.uniforms.uvTransform.value.copy(S.matrix),(u!==S||d!==S.version||h!==n.toneMapping)&&(l.material.needsUpdate=!0,u=S,d=S.version,h=n.toneMapping),l.layers.enableAll(),E.unshift(l,l.geometry,l.material,0,0,null))}function p(E,A){E.getRGB(Os,Jc(n)),e.buffers.color.setClear(Os.r,Os.g,Os.b,A,r)}function f(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(E,A=1){a.set(E),o=A,p(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(E){o=E,p(a,o)},render:g,addToRenderList:v,dispose:f}}function Mm(n,t){const e=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=h(null);let r=s,a=!1;function o(F,z,V,U,H){let K=!1;const Z=d(F,U,V,z);r!==Z&&(r=Z,c(r.object)),K=m(F,U,V,H),K&&g(F,U,V,H),H!==null&&t.update(H,n.ELEMENT_ARRAY_BUFFER),(K||a)&&(a=!1,S(F,z,V,U),H!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(H).buffer))}function l(){return n.createVertexArray()}function c(F){return n.bindVertexArray(F)}function u(F){return n.deleteVertexArray(F)}function d(F,z,V,U){const H=U.wireframe===!0;let K=i[z.id];K===void 0&&(K={},i[z.id]=K);const Z=F.isInstancedMesh===!0?F.id:0;let nt=K[Z];nt===void 0&&(nt={},K[Z]=nt);let X=nt[V.id];X===void 0&&(X={},nt[V.id]=X);let j=X[H];return j===void 0&&(j=h(l()),X[H]=j),j}function h(F){const z=[],V=[],U=[];for(let H=0;H<e;H++)z[H]=0,V[H]=0,U[H]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:z,enabledAttributes:V,attributeDivisors:U,object:F,attributes:{},index:null}}function m(F,z,V,U){const H=r.attributes,K=z.attributes;let Z=0;const nt=V.getAttributes();for(const X in nt)if(nt[X].location>=0){const et=H[X];let wt=K[X];if(wt===void 0&&(X==="instanceMatrix"&&F.instanceMatrix&&(wt=F.instanceMatrix),X==="instanceColor"&&F.instanceColor&&(wt=F.instanceColor)),et===void 0||et.attribute!==wt||wt&&et.data!==wt.data)return!0;Z++}return r.attributesNum!==Z||r.index!==U}function g(F,z,V,U){const H={},K=z.attributes;let Z=0;const nt=V.getAttributes();for(const X in nt)if(nt[X].location>=0){let et=K[X];et===void 0&&(X==="instanceMatrix"&&F.instanceMatrix&&(et=F.instanceMatrix),X==="instanceColor"&&F.instanceColor&&(et=F.instanceColor));const wt={};wt.attribute=et,et&&et.data&&(wt.data=et.data),H[X]=wt,Z++}r.attributes=H,r.attributesNum=Z,r.index=U}function v(){const F=r.newAttributes;for(let z=0,V=F.length;z<V;z++)F[z]=0}function p(F){f(F,0)}function f(F,z){const V=r.newAttributes,U=r.enabledAttributes,H=r.attributeDivisors;V[F]=1,U[F]===0&&(n.enableVertexAttribArray(F),U[F]=1),H[F]!==z&&(n.vertexAttribDivisor(F,z),H[F]=z)}function E(){const F=r.newAttributes,z=r.enabledAttributes;for(let V=0,U=z.length;V<U;V++)z[V]!==F[V]&&(n.disableVertexAttribArray(V),z[V]=0)}function A(F,z,V,U,H,K,Z){Z===!0?n.vertexAttribIPointer(F,z,V,H,K):n.vertexAttribPointer(F,z,V,U,H,K)}function S(F,z,V,U){v();const H=U.attributes,K=V.getAttributes(),Z=z.defaultAttributeValues;for(const nt in K){const X=K[nt];if(X.location>=0){let j=H[nt];if(j===void 0&&(nt==="instanceMatrix"&&F.instanceMatrix&&(j=F.instanceMatrix),nt==="instanceColor"&&F.instanceColor&&(j=F.instanceColor)),j!==void 0){const et=j.normalized,wt=j.itemSize,Tt=t.get(j);if(Tt===void 0)continue;const ne=Tt.buffer,Wt=Tt.type,Zt=Tt.bytesPerElement,Y=Wt===n.INT||Wt===n.UNSIGNED_INT||j.gpuType===oo;if(j.isInterleavedBufferAttribute){const Q=j.data,xt=Q.stride,Dt=j.offset;if(Q.isInstancedInterleavedBuffer){for(let gt=0;gt<X.locationSize;gt++)f(X.location+gt,Q.meshPerAttribute);F.isInstancedMesh!==!0&&U._maxInstanceCount===void 0&&(U._maxInstanceCount=Q.meshPerAttribute*Q.count)}else for(let gt=0;gt<X.locationSize;gt++)p(X.location+gt);n.bindBuffer(n.ARRAY_BUFFER,ne);for(let gt=0;gt<X.locationSize;gt++)A(X.location+gt,wt/X.locationSize,Wt,et,xt*Zt,(Dt+wt/X.locationSize*gt)*Zt,Y)}else{if(j.isInstancedBufferAttribute){for(let Q=0;Q<X.locationSize;Q++)f(X.location+Q,j.meshPerAttribute);F.isInstancedMesh!==!0&&U._maxInstanceCount===void 0&&(U._maxInstanceCount=j.meshPerAttribute*j.count)}else for(let Q=0;Q<X.locationSize;Q++)p(X.location+Q);n.bindBuffer(n.ARRAY_BUFFER,ne);for(let Q=0;Q<X.locationSize;Q++)A(X.location+Q,wt/X.locationSize,Wt,et,wt*Zt,wt/X.locationSize*Q*Zt,Y)}}else if(Z!==void 0){const et=Z[nt];if(et!==void 0)switch(et.length){case 2:n.vertexAttrib2fv(X.location,et);break;case 3:n.vertexAttrib3fv(X.location,et);break;case 4:n.vertexAttrib4fv(X.location,et);break;default:n.vertexAttrib1fv(X.location,et)}}}}E()}function y(){w();for(const F in i){const z=i[F];for(const V in z){const U=z[V];for(const H in U){const K=U[H];for(const Z in K)u(K[Z].object),delete K[Z];delete U[H]}}delete i[F]}}function T(F){if(i[F.id]===void 0)return;const z=i[F.id];for(const V in z){const U=z[V];for(const H in U){const K=U[H];for(const Z in K)u(K[Z].object),delete K[Z];delete U[H]}}delete i[F.id]}function R(F){for(const z in i){const V=i[z];for(const U in V){const H=V[U];if(H[F.id]===void 0)continue;const K=H[F.id];for(const Z in K)u(K[Z].object),delete K[Z];delete H[F.id]}}}function x(F){for(const z in i){const V=i[z],U=F.isInstancedMesh===!0?F.id:0,H=V[U];if(H!==void 0){for(const K in H){const Z=H[K];for(const nt in Z)u(Z[nt].object),delete Z[nt];delete H[K]}delete V[U],Object.keys(V).length===0&&delete i[z]}}}function w(){I(),a=!0,r!==s&&(r=s,c(r.object))}function I(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:w,resetDefaultState:I,dispose:y,releaseStatesOfGeometry:T,releaseStatesOfObject:x,releaseStatesOfProgram:R,initAttributes:v,enableAttribute:p,disableUnusedAttributes:E}}function Sm(n,t,e){let i;function s(l){i=l}function r(l,c){n.drawArrays(i,l,c),e.update(c,i,1)}function a(l,c,u){u!==0&&(n.drawArraysInstanced(i,l,c,u),e.update(c,i,u))}function o(l,c,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,c,0,u);let h=0;for(let m=0;m<u;m++)h+=c[m];e.update(h,i,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function ym(n,t,e,i){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const R=t.get("EXT_texture_filter_anisotropic");s=n.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(R){return!(R!==an&&i.convert(R)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(R){const x=R===Mn&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(R!==Ze&&R!==mn&&!x&&i.convert(R)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE))}function l(R){if(R==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const u=l(c);u!==c&&(Pt("WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const d=e.logarithmicDepthBuffer===!0,h=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control");e.reversedDepthBuffer===!0&&h===!1&&Pt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const m=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=n.getParameter(n.MAX_TEXTURE_SIZE),p=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),f=n.getParameter(n.MAX_VERTEX_ATTRIBS),E=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),A=n.getParameter(n.MAX_VARYING_VECTORS),S=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),y=n.getParameter(n.MAX_SAMPLES),T=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:h,maxTextures:m,maxVertexTextures:g,maxTextureSize:v,maxCubemapSize:p,maxAttributes:f,maxVertexUniforms:E,maxVaryings:A,maxFragmentUniforms:S,maxSamples:y,samples:T}}function bm(n){const t=this;let e=null,i=0,s=!1,r=!1;const a=new dn,o=new Lt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,h){const m=d.length!==0||h||i!==0||s;return s=h,i=d.length,m},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,h){e=u(d,h,0)},this.setState=function(d,h,m){const g=d.clippingPlanes,v=d.clipIntersection,p=d.clipShadows,f=n.get(d);if(!s||g===null||g.length===0||r&&!p)r?u(null):c();else{const E=r?0:i,A=E*4;let S=f.clippingState||null;l.value=S,S=u(g,h,A,m);for(let y=0;y!==A;++y)S[y]=e[y];f.clippingState=S,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=E}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function u(d,h,m,g){const v=d!==null?d.length:0;let p=null;if(v!==0){if(p=l.value,g!==!0||p===null){const f=m+v*4,E=h.matrixWorldInverse;o.getNormalMatrix(E),(p===null||p.length<f)&&(p=new Float32Array(f));for(let A=0,S=m;A!==v;++A,S+=4)a.copy(d[A]).applyMatrix4(E,o),a.normal.toArray(p,S),p[S+3]=a.constant}l.value=p,l.needsUpdate=!0}return t.numPlanes=v,t.numIntersection=0,p}}const Ai=4,Em=6,Tm=20,Am=256,Vi=new So,Rl=new Ft;let Xr=null,Yr=0,qr=0,Zr=!1;const wm=new D,$n=new D;class Cl{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,e=0,i=.1,s=100,r={}){const{size:a=256,position:o=wm}=r;Xr=this._renderer.getRenderTarget(),Yr=this._renderer.getActiveCubeFace(),qr=this._renderer.getActiveMipmapLevel(),Zr=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(t,i,s,l,o),e>0&&this._blur(l,0,0,e),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ll(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Dl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(Xr,Yr,qr),this._renderer.xr.enabled=Zr,t.scissorTest=!1,Mi(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===ii||t.mapping===Di?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Xr=this._renderer.getRenderTarget(),Yr=this._renderer.getActiveCubeFace(),qr=this._renderer.getActiveMipmapLevel(),Zr=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:De,minFilter:De,generateMipmaps:!1,type:Mn,format:an,colorSpace:js,depthBuffer:!1},s=Pl(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Pl(t,e,i);const{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=Rm(r)),this._blurMaterial=Pm(r,t,e),this._ggxMaterial=Cm(r,t,e)}return s}_compileMaterial(t){const e=new Fe(new Qe,t);this._renderer.compile(e,Vi)}_sceneToCubeUV(t,e,i,s,r){const l=new qe(90,1,e,i),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],d=this._renderer,h=d.autoClear,m=d.toneMapping;d.getClearColor(Rl),d.toneMapping=xn,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(s),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Fe(new ls,new Vc({name:"PMREM.Background",side:We,depthWrite:!1,depthTest:!1})));const v=this._backgroundBox,p=v.material;let f=!1;const E=t.background;E?E.isColor&&(p.color.copy(E),t.background=null,f=!0):(p.color.copy(Rl),f=!0);for(let A=0;A<6;A++){const S=A%3;S===0?(l.up.set(0,c[A],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+u[A],r.y,r.z)):S===1?(l.up.set(0,0,c[A]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+u[A],r.z)):(l.up.set(0,c[A],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+u[A]));const y=this._cubeSize;Mi(s,S*y,A>2?y:0,y,y),d.setRenderTarget(s),f&&d.render(v,l),d.render(t,l)}d.toneMapping=m,d.autoClear=h,t.background=E}_textureToCubeUV(t,e){const i=this._renderer,s=t.mapping===ii||t.mapping===Di;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ll()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Dl());const r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;const o=r.uniforms;o.envMap.value=t;const l=this._cubeSize;Mi(e,0,0,3*l,2*l),i.setRenderTarget(e),i.render(a,Vi)}_applyPMREM(t){const e=this._renderer,i=e.autoClear;e.autoClear=!1;const s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(t,r-1,r);e.autoClear=i}_applyGGXFilter(t,e,i){const s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[i];o.material=a;const l=a.uniforms,c=i/(this._lodMeshes.length-1),u=e/(this._lodMeshes.length-1),d=Math.sqrt(c*c-u*u),h=c*1.25,m=d*h,{_lodMax:g}=this,v=this._sizeLods[i],p=3*v*(i>g-Ai?i-g+Ai:0),f=4*(this._cubeSize-v);l.envMap.value=t.texture,l.roughness.value=m,l.mipInt.value=g-e,Mi(r,p,f,3*v,2*v),s.setRenderTarget(r),s.render(o,Vi),l.envMap.value=r.texture,l.roughness.value=0,l.mipInt.value=g-i,Mi(t,p,f,3*v,2*v),s.setRenderTarget(t),s.render(o,Vi)}_blur(t,e,i,s){const r=this._pingPongRenderTarget,a=Math.min(s,Math.PI)/Math.SQRT2;this._blurPass(t,r,e,i,a),this._blurPass(r,t,i,i,a)}_blurPass(t,e,i,s,r){const a=this._renderer,o=this._blurMaterial,l=this._lodMeshes[s];l.material=o;const c=o.uniforms;c.envMap.value=t.texture,c.sigma.value=r,c.mipInt.value=this._lodMax-i;const u=this._sizeLods[s],d=3*u*(s>this._lodMax-Ai?s-this._lodMax+Ai:0),h=4*(this._cubeSize-u);Mi(e,d,h,3*u,2*u),a.setRenderTarget(e),a.render(l,Vi)}}function Rm(n){const t=[],e=[];let i=n;const s=n-Ai+1+Em;for(let r=0;r<s;r++){const a=Math.pow(2,i);t.push(a);const o=1/(a-2),l=-o,c=1+o,u=[l,l,c,l,c,c,l,l,c,c,l,c],d=6,h=6,m=3,g=new Float32Array(m*h*d),v=new Float32Array(m*h*d);for(let f=0;f<d;f++){const E=f%3*2/3-1,A=f>2?0:-1,S=[E,A,0,E+2/3,A,0,E+2/3,A+1,0,E,A,0,E+2/3,A+1,0,E,A+1,0];g.set(S,m*h*f);for(let y=0;y<h;y++){const T=u[y*2]*2-1,R=u[y*2+1]*2-1;f===0?$n.set(1,R,T):f===1?$n.set(-T,1,-R):f===2?$n.set(-T,R,1):f===3?$n.set(-1,R,-T):f===4?$n.set(-T,-1,R):$n.set(T,R,-1),$n.toArray(v,(f*h+y)*m)}}const p=new Qe;p.setAttribute("position",new Pn(g,m)),p.setAttribute("outputDirection",new Pn(v,m)),e.push(new Fe(p,null)),i>Ai&&i--}return{lodMeshes:e,sizeLods:t}}function Pl(n,t,e){const i=new on(n,t,e);return i.texture.mapping=cr,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Mi(n,t,e,i,s){n.viewport.set(t,e,i,s),n.scissor.set(t,e,i,s)}function Cm(n,t,e){return new Sn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Am,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:dr(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:Rn,depthTest:!1,depthWrite:!1})}function Pm(n,t,e){return new Sn({name:"SphericalGaussianBlur",defines:{SAMPLES:Tm,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:dr(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:Rn,depthTest:!1,depthWrite:!1})}function Dl(){return new Sn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:dr(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Rn,depthTest:!1,depthWrite:!1})}function Ll(){return new Sn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:dr(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Rn,depthTest:!1,depthWrite:!1})}function dr(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}class nh extends on{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const i={width:t,height:t,depth:1},s=[i,i,i,i,i,i];this.texture=new Xc(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new ls(5,5,5),r=new Sn({name:"CubemapFromEquirect",uniforms:Ii(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:We,blending:Rn});r.uniforms.tEquirect.value=e;const a=new Fe(s,r),o=e.minFilter;return e.minFilter===Qn&&(e.minFilter=De),new Pd(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e=!0,i=!0,s=!0){const r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,i,s);t.setRenderTarget(r)}}function Dm(n){let t=new WeakMap,e=new WeakMap,i=null;function s(h,m=!1){return h==null?null:m?a(h):r(h)}function r(h){if(h&&h.isTexture){const m=h.mapping;if(m===xr||m===vr)if(t.has(h)){const g=t.get(h).texture;return o(g,h.mapping)}else{const g=h.image;if(g&&g.height>0){const v=new nh(g.height);return v.fromEquirectangularTexture(n,h),t.set(h,v),h.addEventListener("dispose",c),o(v.texture,h.mapping)}else return null}}return h}function a(h){if(h&&h.isTexture){const m=h.mapping,g=m===xr||m===vr,v=m===ii||m===Di;if(g||v){let p=e.get(h);const f=p!==void 0?p.texture.pmremVersion:0;if(h.isRenderTargetTexture&&h.pmremVersion!==f)return i===null&&(i=new Cl(n)),p=g?i.fromEquirectangular(h,p):i.fromCubemap(h,p),p.texture.pmremVersion=h.pmremVersion,e.set(h,p),p.texture;if(p!==void 0)return p.texture;{const E=h.image;return g&&E&&E.height>0||v&&E&&l(E)?(i===null&&(i=new Cl(n)),p=g?i.fromEquirectangular(h):i.fromCubemap(h),p.texture.pmremVersion=h.pmremVersion,e.set(h,p),h.addEventListener("dispose",u),p.texture):null}}}return h}function o(h,m){return m===xr?h.mapping=ii:m===vr&&(h.mapping=Di),h}function l(h){let m=0;const g=6;for(let v=0;v<g;v++)h[v]!==void 0&&m++;return m===g}function c(h){const m=h.target;m.removeEventListener("dispose",c);const g=t.get(m);g!==void 0&&(t.delete(m),g.dispose())}function u(h){const m=h.target;m.removeEventListener("dispose",u);const g=e.get(m);g!==void 0&&(e.delete(m),g.dispose())}function d(){t=new WeakMap,e=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:s,dispose:d}}function Lm(n){const t={};function e(i){if(t[i]!==void 0)return t[i];const s=n.getExtension(i);return t[i]=s,s}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){const s=e(i);return s===null&&Ri("WebGLRenderer: "+i+" extension not supported."),s}}}function Im(n,t,e,i){const s={},r=new WeakMap;function a(d){const h=d.target;h.index!==null&&t.remove(h.index);for(const g in h.attributes)t.remove(h.attributes[g]);h.removeEventListener("dispose",a),delete s[h.id];const m=r.get(h);m&&(t.remove(m),r.delete(h)),i.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,e.memory.geometries--}function o(d,h){return s[h.id]===!0||(h.addEventListener("dispose",a),s[h.id]=!0,e.memory.geometries++),h}function l(d){const h=d.attributes;for(const m in h)t.update(h[m],n.ARRAY_BUFFER)}function c(d){const h=[],m=d.index,g=d.attributes.position;let v=0;if(g===void 0)return;if(m!==null){const E=m.array;v=m.version;for(let A=0,S=E.length;A<S;A+=3){const y=E[A+0],T=E[A+1],R=E[A+2];h.push(y,T,T,R,R,y)}}else{const E=g.array;v=g.version;for(let A=0,S=E.length/3-1;A<S;A+=3){const y=A+0,T=A+1,R=A+2;h.push(y,T,T,R,R,y)}}const p=new(g.count>=65535?Gc:Hc)(h,1);p.version=v;const f=r.get(d);f&&t.remove(f),r.set(d,p)}function u(d){const h=r.get(d);if(h){const m=d.index;m!==null&&h.version<m.version&&c(d)}else c(d);return r.get(d)}return{get:o,update:l,getWireframeAttribute:u}}function Um(n,t,e){let i;function s(d){i=d}let r,a;function o(d){r=d.type,a=d.bytesPerElement}function l(d,h){n.drawElements(i,h,r,d*a),e.update(h,i,1)}function c(d,h,m){m!==0&&(n.drawElementsInstanced(i,h,r,d*a,m),e.update(h,i,m))}function u(d,h,m){if(m===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,h,0,r,d,0,m);let v=0;for(let p=0;p<m;p++)v+=h[p];e.update(v,i,1)}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=u}function Nm(n){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,a,o){switch(e.calls++,a){case n.TRIANGLES:e.triangles+=o*(r/3);break;case n.LINES:e.lines+=o*(r/2);break;case n.LINE_STRIP:e.lines+=o*(r-1);break;case n.LINE_LOOP:e.lines+=o*r;break;case n.POINTS:e.points+=o*r;break;default:Yt("WebGLInfo: Unknown draw mode:",a);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:i}}function Fm(n,t,e){const i=new WeakMap,s=new he;function r(a,o,l){const c=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=u!==void 0?u.length:0;let h=i.get(o);if(h===void 0||h.count!==d){let w=function(){R.dispose(),i.delete(o),o.removeEventListener("dispose",w)};h!==void 0&&h.texture.dispose();const m=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,v=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],f=o.morphAttributes.normal||[],E=o.morphAttributes.color||[];let A=0;m===!0&&(A=1),g===!0&&(A=2),v===!0&&(A=3);let S=o.attributes.position.count*A,y=1;S>t.maxTextureSize&&(y=Math.ceil(S/t.maxTextureSize),S=t.maxTextureSize);const T=new Float32Array(S*y*4*d),R=new kc(T,S,y,d);R.type=mn,R.needsUpdate=!0;const x=A*4;for(let I=0;I<d;I++){const F=p[I],z=f[I],V=E[I],U=S*y*4*I;for(let H=0;H<F.count;H++){const K=H*x;m===!0&&(s.fromBufferAttribute(F,H),T[U+K+0]=s.x,T[U+K+1]=s.y,T[U+K+2]=s.z,T[U+K+3]=0),g===!0&&(s.fromBufferAttribute(z,H),T[U+K+4]=s.x,T[U+K+5]=s.y,T[U+K+6]=s.z,T[U+K+7]=0),v===!0&&(s.fromBufferAttribute(V,H),T[U+K+8]=s.x,T[U+K+9]=s.y,T[U+K+10]=s.z,T[U+K+11]=V.itemSize===4?s.w:1)}}h={count:d,texture:R,size:new Ct(S,y)},i.set(o,h),o.addEventListener("dispose",w)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",a.morphTexture,e);else{let m=0;for(let v=0;v<c.length;v++)m+=c[v];const g=o.morphTargetsRelative?1:1-m;l.getUniforms().setValue(n,"morphTargetBaseInfluence",g),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",h.texture,e),l.getUniforms().setValue(n,"morphTargetsTextureSize",h.size)}return{update:r}}function Om(n,t,e,i,s){let r=new WeakMap;function a(c){const u=s.render.frame,d=c.geometry,h=t.get(c,d);if(r.get(h)!==u&&(t.update(h),r.set(h,u)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==u&&(e.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,n.ARRAY_BUFFER),r.set(c,u))),c.isSkinnedMesh){const m=c.skeleton;r.get(m)!==u&&(m.update(),r.set(m,u))}return h}function o(){r=new WeakMap}function l(c){const u=c.target;u.removeEventListener("dispose",l),i.releaseStatesOfObject(u),e.remove(u.instanceMatrix),u.instanceColor!==null&&e.remove(u.instanceColor)}return{update:a,dispose:o}}const Bm={[bc]:"LINEAR_TONE_MAPPING",[Ec]:"REINHARD_TONE_MAPPING",[Tc]:"CINEON_TONE_MAPPING",[Ac]:"ACES_FILMIC_TONE_MAPPING",[Rc]:"AGX_TONE_MAPPING",[Cc]:"NEUTRAL_TONE_MAPPING",[wc]:"CUSTOM_TONE_MAPPING"};function km(n,t,e,i,s,r){const a=new on(t,e,{type:n,depthBuffer:s,stencilBuffer:r,samples:i?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1});let o=null,l=null;const c=new Qe;c.setAttribute("position",new Te([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new Te([0,2,0,0,2,0],2));const u=new yd({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),d=new Fe(c,u),h=new So(-1,1,1,-1,0,1);let m=null,g=null,v=!1,p,f=null,E=[],A=!1;this.setSize=function(S,y){a.setSize(S,y),o!==null&&o.setSize(S,y),l!==null&&l.setSize(S,y);for(let T=0;T<E.length;T++){const R=E[T];R.setSize&&R.setSize(S,y)}},this.setEffects=function(S){E=S,A=E.length>0&&E[0].isRenderPass===!0;const y=a.width,T=a.height;E.length>0&&o===null&&(o=new on(y,T,{type:Mn,depthBuffer:!1,stencilBuffer:!1}),l=new on(y,T,{type:Mn,depthBuffer:!1,stencilBuffer:!1}));for(let R=0;R<E.length;R++){const x=E[R];x.setSize&&x.setSize(y,T)}},this.begin=function(S,y){if(v||S.toneMapping===xn&&E.length===0)return!1;if(f=y,y!==null){const T=y.width,R=y.height;(a.width!==T||a.height!==R)&&this.setSize(T,R)}return A===!1&&S.setRenderTarget(a),p=S.toneMapping,S.toneMapping=xn,!0},this.hasRenderPass=function(){return A},this.end=function(S,y){S.toneMapping=p,v=!0;let T=a,R=o;for(let x=0;x<E.length;x++){const w=E[x];w.enabled!==!1&&(w.render(S,R,T,y),w.needsSwap!==!1&&(T=R,R=R===o?l:o))}if(m!==S.outputColorSpace||g!==S.toneMapping){m=S.outputColorSpace,g=S.toneMapping,u.defines={},Vt.getTransfer(m)===Qt&&(u.defines.SRGB_TRANSFER="");const x=Bm[g];x&&(u.defines[x]=""),u.needsUpdate=!0}u.uniforms.tDiffuse.value=T.texture,S.setRenderTarget(f),S.render(d,h),f=null,v=!1},this.isCompositing=function(){return v},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),l!==null&&l.dispose(),c.dispose(),u.dispose()}}const ih=new Ae,ja=new ns(1,1),sh=new kc,rh=new Lu,ah=new Xc,Il=[],Ul=[],Nl=new Float32Array(16),Fl=new Float32Array(9),Ol=new Float32Array(4);function Fi(n,t,e){const i=n[0];if(i<=0||i>0)return n;const s=t*e;let r=Il[s];if(r===void 0&&(r=new Float32Array(s),Il[s]=r),t!==0){i.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,n[a].toArray(r,o)}return r}function ve(n,t){if(n.length!==t.length)return!1;for(let e=0,i=n.length;e<i;e++)if(n[e]!==t[e])return!1;return!0}function Me(n,t){for(let e=0,i=t.length;e<i;e++)n[e]=t[e]}function fr(n,t){let e=Ul[t];e===void 0&&(e=new Int32Array(t),Ul[t]=e);for(let i=0;i!==t;++i)e[i]=n.allocateTextureUnit();return e}function zm(n,t){const e=this.cache;e[0]!==t&&(n.uniform1f(this.addr,t),e[0]=t)}function Hm(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ve(e,t))return;n.uniform2fv(this.addr,t),Me(e,t)}}function Gm(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(n.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(ve(e,t))return;n.uniform3fv(this.addr,t),Me(e,t)}}function Vm(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ve(e,t))return;n.uniform4fv(this.addr,t),Me(e,t)}}function Wm(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(ve(e,t))return;n.uniformMatrix2fv(this.addr,!1,t),Me(e,t)}else{if(ve(e,i))return;Ol.set(i),n.uniformMatrix2fv(this.addr,!1,Ol),Me(e,i)}}function Xm(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(ve(e,t))return;n.uniformMatrix3fv(this.addr,!1,t),Me(e,t)}else{if(ve(e,i))return;Fl.set(i),n.uniformMatrix3fv(this.addr,!1,Fl),Me(e,i)}}function Ym(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(ve(e,t))return;n.uniformMatrix4fv(this.addr,!1,t),Me(e,t)}else{if(ve(e,i))return;Nl.set(i),n.uniformMatrix4fv(this.addr,!1,Nl),Me(e,i)}}function qm(n,t){const e=this.cache;e[0]!==t&&(n.uniform1i(this.addr,t),e[0]=t)}function Zm(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ve(e,t))return;n.uniform2iv(this.addr,t),Me(e,t)}}function Km(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ve(e,t))return;n.uniform3iv(this.addr,t),Me(e,t)}}function $m(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ve(e,t))return;n.uniform4iv(this.addr,t),Me(e,t)}}function Jm(n,t){const e=this.cache;e[0]!==t&&(n.uniform1ui(this.addr,t),e[0]=t)}function Qm(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ve(e,t))return;n.uniform2uiv(this.addr,t),Me(e,t)}}function jm(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ve(e,t))return;n.uniform3uiv(this.addr,t),Me(e,t)}}function tg(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ve(e,t))return;n.uniform4uiv(this.addr,t),Me(e,t)}}function eg(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(ja.compareFunction=e.isReversedDepthBuffer()?mo:po,r=ja):r=ih,e.setTexture2D(t||r,s)}function ng(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture3D(t||rh,s)}function ig(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTextureCube(t||ah,s)}function sg(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture2DArray(t||sh,s)}function rg(n){switch(n){case 5126:return zm;case 35664:return Hm;case 35665:return Gm;case 35666:return Vm;case 35674:return Wm;case 35675:return Xm;case 35676:return Ym;case 5124:case 35670:return qm;case 35667:case 35671:return Zm;case 35668:case 35672:return Km;case 35669:case 35673:return $m;case 5125:return Jm;case 36294:return Qm;case 36295:return jm;case 36296:return tg;case 35678:case 36198:case 36298:case 36306:case 35682:return eg;case 35679:case 36299:case 36307:return ng;case 35680:case 36300:case 36308:case 36293:return ig;case 36289:case 36303:case 36311:case 36292:return sg}}function ag(n,t){n.uniform1fv(this.addr,t)}function og(n,t){const e=Fi(t,this.size,2);n.uniform2fv(this.addr,e)}function lg(n,t){const e=Fi(t,this.size,3);n.uniform3fv(this.addr,e)}function cg(n,t){const e=Fi(t,this.size,4);n.uniform4fv(this.addr,e)}function hg(n,t){const e=Fi(t,this.size,4);n.uniformMatrix2fv(this.addr,!1,e)}function ug(n,t){const e=Fi(t,this.size,9);n.uniformMatrix3fv(this.addr,!1,e)}function dg(n,t){const e=Fi(t,this.size,16);n.uniformMatrix4fv(this.addr,!1,e)}function fg(n,t){n.uniform1iv(this.addr,t)}function pg(n,t){n.uniform2iv(this.addr,t)}function mg(n,t){n.uniform3iv(this.addr,t)}function gg(n,t){n.uniform4iv(this.addr,t)}function _g(n,t){n.uniform1uiv(this.addr,t)}function xg(n,t){n.uniform2uiv(this.addr,t)}function vg(n,t){n.uniform3uiv(this.addr,t)}function Mg(n,t){n.uniform4uiv(this.addr,t)}function Sg(n,t,e){const i=this.cache,s=t.length,r=fr(e,s);ve(i,r)||(n.uniform1iv(this.addr,r),Me(i,r));let a;this.type===n.SAMPLER_2D_SHADOW?a=ja:a=ih;for(let o=0;o!==s;++o)e.setTexture2D(t[o]||a,r[o])}function yg(n,t,e){const i=this.cache,s=t.length,r=fr(e,s);ve(i,r)||(n.uniform1iv(this.addr,r),Me(i,r));for(let a=0;a!==s;++a)e.setTexture3D(t[a]||rh,r[a])}function bg(n,t,e){const i=this.cache,s=t.length,r=fr(e,s);ve(i,r)||(n.uniform1iv(this.addr,r),Me(i,r));for(let a=0;a!==s;++a)e.setTextureCube(t[a]||ah,r[a])}function Eg(n,t,e){const i=this.cache,s=t.length,r=fr(e,s);ve(i,r)||(n.uniform1iv(this.addr,r),Me(i,r));for(let a=0;a!==s;++a)e.setTexture2DArray(t[a]||sh,r[a])}function Tg(n){switch(n){case 5126:return ag;case 35664:return og;case 35665:return lg;case 35666:return cg;case 35674:return hg;case 35675:return ug;case 35676:return dg;case 5124:case 35670:return fg;case 35667:case 35671:return pg;case 35668:case 35672:return mg;case 35669:case 35673:return gg;case 5125:return _g;case 36294:return xg;case 36295:return vg;case 36296:return Mg;case 35678:case 36198:case 36298:case 36306:case 35682:return Sg;case 35679:case 36299:case 36307:return yg;case 35680:case 36300:case 36308:case 36293:return bg;case 36289:case 36303:case 36311:case 36292:return Eg}}class Ag{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=rg(e.type)}}class wg{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Tg(e.type)}}class Rg{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(t,e[o.id],i)}}}const Kr=/(\w+)(\])?(\[|\.)?/g;function Bl(n,t){n.seq.push(t),n.map[t.id]=t}function Cg(n,t,e){const i=n.name,s=i.length;for(Kr.lastIndex=0;;){const r=Kr.exec(i),a=Kr.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){Bl(e,c===void 0?new Ag(o,n,t):new wg(o,n,t));break}else{let d=e.map[o];d===void 0&&(d=new Rg(o),Bl(e,d)),e=d}}}class Ks{constructor(t,e){this.seq=[],this.map={};const i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){const o=t.getActiveUniform(e,a),l=t.getUniformLocation(e,o.name);Cg(o,l,this)}const s=[],r=[];for(const a of this.seq)a.type===t.SAMPLER_2D_SHADOW||a.type===t.SAMPLER_CUBE_SHADOW||a.type===t.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(t,e,i,s){const r=this.map[e];r!==void 0&&r.setValue(t,i,s)}setOptional(t,e,i){const s=e[i];s!==void 0&&this.setValue(t,i,s)}static upload(t,e,i,s){for(let r=0,a=e.length;r!==a;++r){const o=e[r],l=i[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,s)}}static seqWithValue(t,e){const i=[];for(let s=0,r=t.length;s!==r;++s){const a=t[s];a.id in e&&i.push(a)}return i}}function kl(n,t,e){const i=n.createShader(t);return n.shaderSource(i,e),n.compileShader(i),i}const Pg=37297;let Dg=0;function Lg(n,t){const e=n.split(`
`),i=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=s;a<r;a++){const o=a+1;i.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return i.join(`
`)}const zl=new Lt;function Ig(n){Vt._getMatrix(zl,Vt.workingColorSpace,n);const t=`mat3( ${zl.elements.map(e=>e.toFixed(4))} )`;switch(Vt.getTransfer(n)){case tr:return[t,"LinearTransferOETF"];case Qt:return[t,"sRGBTransferOETF"];default:return Pt("WebGLProgram: Unsupported color space: ",n),[t,"LinearTransferOETF"]}}function Hl(n,t,e){const i=n.getShaderParameter(t,n.COMPILE_STATUS),r=(n.getShaderInfoLog(t)||"").trim();if(i&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return e.toUpperCase()+`

`+r+`

`+Lg(n.getShaderSource(t),o)}else return r}function Ug(n,t){const e=Ig(t);return[`vec4 ${n}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}const Ng={[bc]:"Linear",[Ec]:"Reinhard",[Tc]:"Cineon",[Ac]:"ACESFilmic",[Rc]:"AgX",[Cc]:"Neutral",[wc]:"Custom"};function Fg(n,t){const e=Ng[t];return e===void 0?(Pt("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const Bs=new D;function Og(){Vt.getLuminanceCoefficients(Bs);const n=Bs.x.toFixed(4),t=Bs.y.toFixed(4),e=Bs.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Bg(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ki).join(`
`)}function kg(n){const t=[];for(const e in n){const i=n[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function zg(n,t){const e={},i=n.getProgramParameter(t,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const r=n.getActiveAttrib(t,s),a=r.name;let o=1;r.type===n.FLOAT_MAT2&&(o=2),r.type===n.FLOAT_MAT3&&(o=3),r.type===n.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:n.getAttribLocation(t,a),locationSize:o}}return e}function Ki(n){return n!==""}function Gl(n,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return n.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Vl(n,t){return n.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const Hg=/^[ \t]*#include +<([\w\d./]+)>/gm;function to(n){return n.replace(Hg,Vg)}const Gg=new Map;function Vg(n,t){let e=Nt[t];if(e===void 0){const i=Gg.get(t);if(i!==void 0)e=Nt[i],Pt('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">")}return to(e)}const Wg=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Wl(n){return n.replace(Wg,Xg)}function Xg(n,t,e,i){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Xl(n){let t=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?t+=`
#define HIGH_PRECISION`:n.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}const Yg={[Vs]:"SHADOWMAP_TYPE_PCF",[qi]:"SHADOWMAP_TYPE_VSM"};function qg(n){return Yg[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const Zg={[ii]:"ENVMAP_TYPE_CUBE",[Di]:"ENVMAP_TYPE_CUBE",[cr]:"ENVMAP_TYPE_CUBE_UV"};function Kg(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":Zg[n.envMapMode]||"ENVMAP_TYPE_CUBE"}const $g={[Di]:"ENVMAP_MODE_REFRACTION"};function Jg(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":$g[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}const Qg={[ao]:"ENVMAP_BLENDING_MULTIPLY",[lu]:"ENVMAP_BLENDING_MIX",[cu]:"ENVMAP_BLENDING_ADD"};function jg(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":Qg[n.combine]||"ENVMAP_BLENDING_NONE"}function t0(n){const t=n.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:i,maxMip:e}}function e0(n,t,e,i){const s=n.getContext(),r=e.defines;let a=e.vertexShader,o=e.fragmentShader;const l=qg(e),c=Kg(e),u=Jg(e),d=jg(e),h=t0(e),m=Bg(e),g=kg(r),v=s.createProgram();let p,f,E=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Ki).join(`
`),p.length>0&&(p+=`
`),f=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Ki).join(`
`),f.length>0&&(f+=`
`)):(p=[Xl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ki).join(`
`),f=[Xl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+u:"",e.envMap?"#define "+d:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.retroreflection?"#define USE_RETROREFLECTION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==xn?"#define TONE_MAPPING":"",e.toneMapping!==xn?Nt.tonemapping_pars_fragment:"",e.toneMapping!==xn?Fg("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Nt.colorspace_pars_fragment,Ug("linearToOutputTexel",e.outputColorSpace),Og(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Ki).join(`
`)),a=to(a),a=Gl(a,e),a=Vl(a,e),o=to(o),o=Gl(o,e),o=Vl(o,e),a=Wl(a),o=Wl(o),e.isRawShaderMaterial!==!0&&(E=`#version 300 es
`,p=[m,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,f=["#define varying in",e.glslVersion===Zo?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Zo?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);const A=E+p+a,S=E+f+o,y=kl(s,s.VERTEX_SHADER,A),T=kl(s,s.FRAGMENT_SHADER,S);s.attachShader(v,y),s.attachShader(v,T),e.index0AttributeName!==void 0?s.bindAttribLocation(v,0,e.index0AttributeName):e.hasPositionAttribute===!0&&s.bindAttribLocation(v,0,"position"),s.linkProgram(v);function R(F){if(n.debug.checkShaderErrors){const z=s.getProgramInfoLog(v)||"",V=s.getShaderInfoLog(y)||"",U=s.getShaderInfoLog(T)||"",H=z.trim(),K=V.trim(),Z=U.trim();let nt=!0,X=!0;if(s.getProgramParameter(v,s.LINK_STATUS)===!1)if(nt=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,v,y,T);else{const j=Hl(s,y,"vertex"),et=Hl(s,T,"fragment");Yt("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(v,s.VALIDATE_STATUS)+`

Material Name: `+F.name+`
Material Type: `+F.type+`

Program Info Log: `+H+`
`+j+`
`+et)}else H!==""?Pt("WebGLProgram: Program Info Log:",H):(K===""||Z==="")&&(X=!1);X&&(F.diagnostics={runnable:nt,programLog:H,vertexShader:{log:K,prefix:p},fragmentShader:{log:Z,prefix:f}})}s.deleteShader(y),s.deleteShader(T),x=new Ks(s,v),w=zg(s,v)}let x;this.getUniforms=function(){return x===void 0&&R(this),x};let w;this.getAttributes=function(){return w===void 0&&R(this),w};let I=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return I===!1&&(I=s.getProgramParameter(v,Pg)),I},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(v),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Dg++,this.cacheKey=t,this.usedTimes=1,this.program=v,this.vertexShader=y,this.fragmentShader=T,this}let n0=0;class i0{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,e,i){const s=this._getShaderCacheForMaterial(t);return s.has(e)===!1&&(s.add(e),e.usedTimes++),s.has(i)===!1&&(s.add(i),i.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){const e=this.shaderCache;let i=e.get(t);return i===void 0&&(i=new s0(t),e.set(t,i)),i}}class s0{constructor(t){this.id=n0++,this.code=t,this.usedTimes=0}}function r0(n){return n===si||n===Js||n===Qs}function a0(n,t,e,i,s,r){const a=new _o,o=new i0,l=new Set,c=[],u=new Map,d=i.logarithmicDepthBuffer;let h=i.precision;const m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(x){return l.add(x),x===0?"uv":`uv${x}`}function v(x,w,I,F,z,V){const U=F.fog,H=z.geometry,K=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?F.environment:null,Z=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap,nt=t.get(x.envMap||K,Z),X=nt&&nt.mapping===cr?nt.image.height:null,j=m[x.type];x.precision!==null&&(h=i.getMaxPrecision(x.precision),h!==x.precision&&Pt("WebGLProgram.getParameters:",x.precision,"not supported, using",h,"instead."));const et=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,wt=et!==void 0?et.length:0;let Tt=0;H.morphAttributes.position!==void 0&&(Tt=1),H.morphAttributes.normal!==void 0&&(Tt=2),H.morphAttributes.color!==void 0&&(Tt=3);let ne,Wt,Zt,Y;if(j){const se=fn[j];ne=se.vertexShader,Wt=se.fragmentShader}else{ne=x.vertexShader,Wt=x.fragmentShader;const se=o.getVertexShaderStage(x),Kt=o.getFragmentShaderStage(x);o.update(x,se,Kt),Zt=se.id,Y=Kt.id}const Q=n.getRenderTarget(),xt=n.state.buffers.depth.getReversed(),Dt=z.isInstancedMesh===!0,gt=z.isBatchedMesh===!0,Ot=!!x.map,ge=!!x.matcap,Bt=!!nt,qt=!!x.aoMap,ie=!!x.lightMap,Gt=!!x.bumpMap&&x.wireframe===!1,le=!!x.normalMap,Se=!!x.displacementMap,ke=!!x.emissiveMap,ce=!!x.metalnessMap,fe=!!x.roughnessMap,L=x.anisotropy>0,we=x.clearcoat>0,Jt=x.dispersion>0,b=x.retroreflectivity>0,_=x.iridescence>0,N=x.sheen>0,k=x.transmission>0,W=L&&!!x.anisotropyMap,st=we&&!!x.clearcoatMap,rt=we&&!!x.clearcoatNormalMap,q=we&&!!x.clearcoatRoughnessMap,J=_&&!!x.iridescenceMap,at=_&&!!x.iridescenceThicknessMap,bt=N&&!!x.sheenColorMap,ht=N&&!!x.sheenRoughnessMap,ot=!!x.specularMap,Et=!!x.specularColorMap,Rt=!!x.specularIntensityMap,It=k&&!!x.transmissionMap,P=k&&!!x.thicknessMap,lt=!!x.gradientMap,$=!!x.alphaMap,ct=x.alphaTest>0,pt=!!x.alphaHash,tt=!!x.extensions;let At=xn;x.toneMapped&&(Q===null||Q.isXRRenderTarget===!0)&&(At=n.toneMapping);const St={shaderID:j,shaderType:x.type,shaderName:x.name,vertexShader:ne,fragmentShader:Wt,defines:x.defines,customVertexShaderID:Zt,customFragmentShaderID:Y,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:h,batching:gt,batchingColor:gt&&z._colorsTexture!==null,instancing:Dt,instancingColor:Dt&&z.instanceColor!==null,instancingMorph:Dt&&z.morphTexture!==null,outputColorSpace:Q===null?n.outputColorSpace:Q.isXRRenderTarget===!0?Q.texture.colorSpace:Vt.workingColorSpace,alphaToCoverage:!!x.alphaToCoverage,map:Ot,matcap:ge,envMap:Bt,envMapMode:Bt&&nt.mapping,envMapCubeUVHeight:X,aoMap:qt,lightMap:ie,bumpMap:Gt,normalMap:le,displacementMap:Se,emissiveMap:ke,normalMapObjectSpace:le&&x.normalMapType===du,normalMapTangentSpace:le&&x.normalMapType===Za,packedNormalMap:le&&x.normalMapType===Za&&r0(x.normalMap.format),metalnessMap:ce,roughnessMap:fe,anisotropy:L,anisotropyMap:W,clearcoat:we,clearcoatMap:st,clearcoatNormalMap:rt,clearcoatRoughnessMap:q,dispersion:Jt,retroreflection:b,iridescence:_,iridescenceMap:J,iridescenceThicknessMap:at,sheen:N,sheenColorMap:bt,sheenRoughnessMap:ht,specularMap:ot,specularColorMap:Et,specularIntensityMap:Rt,transmission:k,transmissionMap:It,thicknessMap:P,gradientMap:lt,opaque:x.transparent===!1&&x.blending===$i&&x.alphaToCoverage===!1,alphaMap:$,alphaTest:ct,alphaHash:pt,combine:x.combine,mapUv:Ot&&g(x.map.channel),aoMapUv:qt&&g(x.aoMap.channel),lightMapUv:ie&&g(x.lightMap.channel),bumpMapUv:Gt&&g(x.bumpMap.channel),normalMapUv:le&&g(x.normalMap.channel),displacementMapUv:Se&&g(x.displacementMap.channel),emissiveMapUv:ke&&g(x.emissiveMap.channel),metalnessMapUv:ce&&g(x.metalnessMap.channel),roughnessMapUv:fe&&g(x.roughnessMap.channel),anisotropyMapUv:W&&g(x.anisotropyMap.channel),clearcoatMapUv:st&&g(x.clearcoatMap.channel),clearcoatNormalMapUv:rt&&g(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:q&&g(x.clearcoatRoughnessMap.channel),iridescenceMapUv:J&&g(x.iridescenceMap.channel),iridescenceThicknessMapUv:at&&g(x.iridescenceThicknessMap.channel),sheenColorMapUv:bt&&g(x.sheenColorMap.channel),sheenRoughnessMapUv:ht&&g(x.sheenRoughnessMap.channel),specularMapUv:ot&&g(x.specularMap.channel),specularColorMapUv:Et&&g(x.specularColorMap.channel),specularIntensityMapUv:Rt&&g(x.specularIntensityMap.channel),transmissionMapUv:It&&g(x.transmissionMap.channel),thicknessMapUv:P&&g(x.thicknessMap.channel),alphaMapUv:$&&g(x.alphaMap.channel),vertexTangents:!!H.attributes.tangent&&(le||L),vertexNormals:!!H.attributes.normal,vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,pointsUvs:z.isPoints===!0&&!!H.attributes.uv&&(Ot||$),fog:!!U,useFog:x.fog===!0,fogExp2:!!U&&U.isFogExp2,flatShading:x.wireframe===!1&&(x.flatShading===!0||H.attributes.normal===void 0&&le===!1&&(x.isMeshLambertMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isMeshPhysicalMaterial)),sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:xt,skinning:z.isSkinnedMesh===!0,hasPositionAttribute:H.attributes.position!==void 0,morphTargets:H.morphAttributes.position!==void 0,morphNormals:H.morphAttributes.normal!==void 0,morphColors:H.morphAttributes.color!==void 0,morphTargetsCount:wt,morphTextureStride:Tt,numSunLights:w.sun.length,numDirLights:w.directional.length,numPointLights:w.point.length,numSpotLights:w.spot.length,numSpotLightMaps:w.spotLightMap.length,numRectAreaLights:w.rectArea.length,numHemiLights:w.hemi.length,numSunLightShadows:w.sunShadowMap.length,numDirLightShadows:w.directionalShadowMap.length,numPointLightShadows:w.pointShadowMap.length,numSpotLightShadows:w.spotShadowMap.length,numSpotLightShadowsWithMaps:w.numSpotLightShadowsWithMaps,numLightProbes:w.numLightProbes,numLightProbeGrids:V.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:x.dithering,shadowMapEnabled:n.shadowMap.enabled&&I.length>0,shadowMapType:n.shadowMap.type,toneMapping:At,decodeVideoTexture:Ot&&x.map.isVideoTexture===!0&&Vt.getTransfer(x.map.colorSpace)===Qt,decodeVideoTextureEmissive:ke&&x.emissiveMap.isVideoTexture===!0&&Vt.getTransfer(x.emissiveMap.colorSpace)===Qt,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===pn,flipSided:x.side===We,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:tt&&x.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(tt&&x.extensions.multiDraw===!0||gt)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return St.vertexUv1s=l.has(1),St.vertexUv2s=l.has(2),St.vertexUv3s=l.has(3),l.clear(),St}function p(x){const w=[];if(x.shaderID?w.push(x.shaderID):(w.push(x.customVertexShaderID),w.push(x.customFragmentShaderID)),x.defines!==void 0)for(const I in x.defines)w.push(I),w.push(x.defines[I]);return x.isRawShaderMaterial===!1&&(f(w,x),E(w,x),w.push(n.outputColorSpace)),w.push(x.customProgramCacheKey),w.join()}function f(x,w){x.push(w.precision),x.push(w.outputColorSpace),x.push(w.envMapMode),x.push(w.envMapCubeUVHeight),x.push(w.mapUv),x.push(w.alphaMapUv),x.push(w.lightMapUv),x.push(w.aoMapUv),x.push(w.bumpMapUv),x.push(w.normalMapUv),x.push(w.displacementMapUv),x.push(w.emissiveMapUv),x.push(w.metalnessMapUv),x.push(w.roughnessMapUv),x.push(w.anisotropyMapUv),x.push(w.clearcoatMapUv),x.push(w.clearcoatNormalMapUv),x.push(w.clearcoatRoughnessMapUv),x.push(w.iridescenceMapUv),x.push(w.iridescenceThicknessMapUv),x.push(w.sheenColorMapUv),x.push(w.sheenRoughnessMapUv),x.push(w.specularMapUv),x.push(w.specularColorMapUv),x.push(w.specularIntensityMapUv),x.push(w.transmissionMapUv),x.push(w.thicknessMapUv),x.push(w.combine),x.push(w.fogExp2),x.push(w.sizeAttenuation),x.push(w.morphTargetsCount),x.push(w.morphAttributeCount),x.push(w.numSunLights),x.push(w.numDirLights),x.push(w.numPointLights),x.push(w.numSpotLights),x.push(w.numSpotLightMaps),x.push(w.numHemiLights),x.push(w.numRectAreaLights),x.push(w.numSunLightShadows),x.push(w.numDirLightShadows),x.push(w.numPointLightShadows),x.push(w.numSpotLightShadows),x.push(w.numSpotLightShadowsWithMaps),x.push(w.numLightProbes),x.push(w.shadowMapType),x.push(w.toneMapping),x.push(w.numClippingPlanes),x.push(w.numClipIntersection),x.push(w.depthPacking)}function E(x,w){a.disableAll(),w.instancing&&a.enable(0),w.instancingColor&&a.enable(1),w.instancingMorph&&a.enable(2),w.matcap&&a.enable(3),w.envMap&&a.enable(4),w.normalMapObjectSpace&&a.enable(5),w.normalMapTangentSpace&&a.enable(6),w.clearcoat&&a.enable(7),w.iridescence&&a.enable(8),w.alphaTest&&a.enable(9),w.vertexColors&&a.enable(10),w.vertexAlphas&&a.enable(11),w.vertexUv1s&&a.enable(12),w.vertexUv2s&&a.enable(13),w.vertexUv3s&&a.enable(14),w.vertexTangents&&a.enable(15),w.anisotropy&&a.enable(16),w.alphaHash&&a.enable(17),w.batching&&a.enable(18),w.dispersion&&a.enable(19),w.retroreflection&&a.enable(24),w.batchingColor&&a.enable(20),w.gradientMap&&a.enable(21),w.packedNormalMap&&a.enable(22),w.vertexNormals&&a.enable(23),x.push(a.mask),a.disableAll(),w.fog&&a.enable(0),w.useFog&&a.enable(1),w.flatShading&&a.enable(2),w.logarithmicDepthBuffer&&a.enable(3),w.reversedDepthBuffer&&a.enable(4),w.skinning&&a.enable(5),w.morphTargets&&a.enable(6),w.morphNormals&&a.enable(7),w.morphColors&&a.enable(8),w.premultipliedAlpha&&a.enable(9),w.shadowMapEnabled&&a.enable(10),w.doubleSided&&a.enable(11),w.flipSided&&a.enable(12),w.useDepthPacking&&a.enable(13),w.dithering&&a.enable(14),w.transmission&&a.enable(15),w.sheen&&a.enable(16),w.opaque&&a.enable(17),w.pointsUvs&&a.enable(18),w.decodeVideoTexture&&a.enable(19),w.decodeVideoTextureEmissive&&a.enable(20),w.alphaToCoverage&&a.enable(21),w.numLightProbeGrids>0&&a.enable(22),w.hasPositionAttribute&&a.enable(23),x.push(a.mask)}function A(x){const w=m[x.type];let I;if(w){const F=fn[w];I=vd.clone(F.uniforms)}else I=x.uniforms;return I}function S(x,w){let I=u.get(w);return I!==void 0?++I.usedTimes:(I=new e0(n,w,x,s),c.push(I),u.set(w,I)),I}function y(x){if(--x.usedTimes===0){const w=c.indexOf(x);c[w]=c[c.length-1],c.pop(),u.delete(x.cacheKey),x.destroy()}}function T(x){o.remove(x)}function R(){o.dispose()}return{getParameters:v,getProgramCacheKey:p,getUniforms:A,acquireProgram:S,releaseProgram:y,releaseShaderCache:T,programs:c,dispose:R}}function o0(){let n=new WeakMap;function t(a){return n.has(a)}function e(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function s(a,o,l){n.get(a)[o]=l}function r(){n=new WeakMap}return{has:t,get:e,remove:i,update:s,dispose:r}}function l0(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.material.id!==t.material.id?n.material.id-t.material.id:n.materialVariant!==t.materialVariant?n.materialVariant-t.materialVariant:n.z!==t.z?n.z-t.z:n.id-t.id}function Yl(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.z!==t.z?t.z-n.z:n.id-t.id}function ql(){const n=[];let t=0;const e=[],i=[],s=[];function r(){t=0,e.length=0,i.length=0,s.length=0}function a(h){let m=0;return h.isInstancedMesh&&(m+=2),h.isSkinnedMesh&&(m+=1),m}function o(h,m,g,v,p,f){let E=n[t];return E===void 0?(E={id:h.id,object:h,geometry:m,material:g,materialVariant:a(h),groupOrder:v,renderOrder:h.renderOrder,z:p,group:f},n[t]=E):(E.id=h.id,E.object=h,E.geometry=m,E.material=g,E.materialVariant=a(h),E.groupOrder=v,E.renderOrder=h.renderOrder,E.z=p,E.group=f),t++,E}function l(h,m,g,v,p,f,E){E.reversedDepth===!0&&(p=-p);const A=o(h,m,g,v,p,f);g.transmission>0?i.push(A):g.transparent===!0?s.push(A):e.push(A)}function c(h,m,g,v,p,f){const E=o(h,m,g,v,p,f);g.transmission>0?i.unshift(E):g.transparent===!0?s.unshift(E):e.unshift(E)}function u(h,m){e.length>1&&e.sort(h||l0),i.length>1&&i.sort(m||Yl),s.length>1&&s.sort(m||Yl)}function d(){for(let h=t,m=n.length;h<m;h++){const g=n[h];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:e,transmissive:i,transparent:s,init:r,push:l,unshift:c,finish:d,sort:u}}function c0(){let n=new WeakMap;function t(i,s){const r=n.get(i);let a;return r===void 0?(a=new ql,n.set(i,[a])):s>=r.length?(a=new ql,r.push(a)):a=r[s],a}function e(){n=new WeakMap}return{get:t,dispose:e}}function h0(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={direction:new D,color:new Ft};break;case"SpotLight":e={position:new D,direction:new D,color:new Ft,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new D,color:new Ft,distance:0,decay:0};break;case"HemisphereLight":e={direction:new D,skyColor:new Ft,groundColor:new Ft};break;case"RectAreaLight":e={color:new Ft,position:new D,halfWidth:new D,halfHeight:new D};break}return n[t.id]=e,e}}}function u0(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ct};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ct};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ct,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[t.id]=e,e}}}let d0=0;function f0(n,t){return(t.castShadow?2:0)-(n.castShadow?2:0)+(t.map?1:0)-(n.map?1:0)}function p0(n){const t=new h0,e=u0(),i={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new D);const s=new D,r=new ae,a=new ae;function o(c){let u=0,d=0,h=0;for(let z=0;z<9;z++)i.probe[z].set(0,0,0);let m=0,g=0,v=0,p=0,f=0,E=0,A=0,S=0,y=0,T=0,R=0,x=0,w=0,I=0;c.sort(f0);for(let z=0,V=c.length;z<V;z++){const U=c[z],H=U.color,K=U.intensity,Z=U.distance;let nt=null;if(U.shadow&&U.shadow.map&&(U.shadow.map.texture.format===si?nt=U.shadow.map.texture:nt=U.shadow.map.depthTexture||U.shadow.map.texture),U.isAmbientLight)u+=H.r*K,d+=H.g*K,h+=H.b*K;else if(U.isLightProbe){for(let X=0;X<9;X++)i.probe[X].addScaledVector(U.sh.coefficients[X],K);I++}else if(U.isSunLight){const X=t.get(U);if(X.color.copy(U.color).multiplyScalar(U.intensity),U.castShadow){const j=U.shadow,et=e.get(U);et.shadowIntensity=j.intensity,et.shadowBias=j.bias,et.shadowNormalBias=j.normalBias,et.shadowRadius=j.radius,et.shadowMapSize.copy(j.mapSize).multiply(j.getFrameExtents()),i.sunShadow[g]=et,i.sunShadowMap[g]=nt;const wt=j.getViewportCount();for(let Tt=0;Tt<wt;Tt++)i.sunShadowMatrix[v+Tt]=j.getMatrix(Tt),i.sunShadowCascade[v+Tt]=j._cascadeData[Tt];v+=wt,g++}i.sun[m]=X,m++}else if(U.isDirectionalLight){const X=t.get(U);if(X.color.copy(U.color).multiplyScalar(U.intensity),U.castShadow){const j=U.shadow,et=e.get(U);et.shadowIntensity=j.intensity,et.shadowBias=j.bias,et.shadowNormalBias=j.normalBias,et.shadowRadius=j.radius,et.shadowMapSize=j.mapSize,i.directionalShadow[p]=et,i.directionalShadowMap[p]=nt,i.directionalShadowMatrix[p]=U.shadow.matrix,y++}i.directional[p]=X,p++}else if(U.isSpotLight){const X=t.get(U);X.position.setFromMatrixPosition(U.matrixWorld),X.color.copy(H).multiplyScalar(K),X.distance=Z,X.coneCos=Math.cos(U.angle),X.penumbraCos=Math.cos(U.angle*(1-U.penumbra)),X.decay=U.decay,i.spot[E]=X;const j=U.shadow;if(U.map&&(i.spotLightMap[x]=U.map,x++,j.updateMatrices(U),U.castShadow&&w++),i.spotLightMatrix[E]=j.matrix,U.castShadow){const et=e.get(U);et.shadowIntensity=j.intensity,et.shadowBias=j.bias,et.shadowNormalBias=j.normalBias,et.shadowRadius=j.radius,et.shadowMapSize=j.mapSize,i.spotShadow[E]=et,i.spotShadowMap[E]=nt,R++}E++}else if(U.isRectAreaLight){const X=t.get(U);X.color.copy(H).multiplyScalar(K),X.halfWidth.set(U.width*.5,0,0),X.halfHeight.set(0,U.height*.5,0),i.rectArea[A]=X,A++}else if(U.isPointLight){const X=t.get(U);if(X.color.copy(U.color).multiplyScalar(U.intensity),X.distance=U.distance,X.decay=U.decay,U.castShadow){const j=U.shadow,et=e.get(U);et.shadowIntensity=j.intensity,et.shadowBias=j.bias,et.shadowNormalBias=j.normalBias,et.shadowRadius=j.radius,et.shadowMapSize=j.mapSize,et.shadowCameraNear=j.camera.near,et.shadowCameraFar=j.camera.far,i.pointShadow[f]=et,i.pointShadowMap[f]=nt,i.pointShadowMatrix[f]=U.shadow.matrix,T++}i.point[f]=X,f++}else if(U.isHemisphereLight){const X=t.get(U);X.skyColor.copy(U.color).multiplyScalar(K),X.groundColor.copy(U.groundColor).multiplyScalar(K),i.hemi[S]=X,S++}}A>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ut.LTC_FLOAT_1,i.rectAreaLTC2=ut.LTC_FLOAT_2):(i.rectAreaLTC1=ut.LTC_HALF_1,i.rectAreaLTC2=ut.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=d,i.ambient[2]=h;const F=i.hash;(F.sunLength!==m||F.directionalLength!==p||F.pointLength!==f||F.spotLength!==E||F.rectAreaLength!==A||F.hemiLength!==S||F.numSunShadows!==g||F.numDirectionalShadows!==y||F.numPointShadows!==T||F.numSpotShadows!==R||F.numSpotMaps!==x||F.numLightProbes!==I)&&(i.sun.length=m,i.directional.length=p,i.spot.length=E,i.rectArea.length=A,i.point.length=f,i.hemi.length=S,i.sunShadow.length=g,i.sunShadowMap.length=g,i.sunShadowMatrix.length=v,i.sunShadowCascade.length=v,i.directionalShadow.length=y,i.directionalShadowMap.length=y,i.directionalShadowMatrix.length=y,i.pointShadow.length=T,i.pointShadowMap.length=T,i.pointShadowMatrix.length=T,i.spotShadow.length=R,i.spotShadowMap.length=R,i.spotLightMatrix.length=R+x-w,i.spotLightMap.length=x,i.numSpotLightShadowsWithMaps=w,i.numLightProbes=I,F.sunLength=m,F.directionalLength=p,F.pointLength=f,F.spotLength=E,F.rectAreaLength=A,F.hemiLength=S,F.numSunShadows=g,F.numDirectionalShadows=y,F.numPointShadows=T,F.numSpotShadows=R,F.numSpotMaps=x,F.numLightProbes=I,i.version=d0++)}function l(c,u){let d=0,h=0,m=0,g=0,v=0,p=0;const f=u.matrixWorldInverse;for(let E=0,A=c.length;E<A;E++){const S=c[E];if(S.isSunLight){const y=i.sun[d];y.direction.setFromMatrixPosition(S.matrixWorld),y.direction.transformDirection(f),d++}else if(S.isDirectionalLight){const y=i.directional[h];y.direction.setFromMatrixPosition(S.matrixWorld),s.setFromMatrixPosition(S.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(f),h++}else if(S.isSpotLight){const y=i.spot[g];y.position.setFromMatrixPosition(S.matrixWorld),y.position.applyMatrix4(f),y.direction.setFromMatrixPosition(S.matrixWorld),s.setFromMatrixPosition(S.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(f),g++}else if(S.isRectAreaLight){const y=i.rectArea[v];y.position.setFromMatrixPosition(S.matrixWorld),y.position.applyMatrix4(f),a.identity(),r.copy(S.matrixWorld),r.premultiply(f),a.extractRotation(r),y.halfWidth.set(S.width*.5,0,0),y.halfHeight.set(0,S.height*.5,0),y.halfWidth.applyMatrix4(a),y.halfHeight.applyMatrix4(a),v++}else if(S.isPointLight){const y=i.point[m];y.position.setFromMatrixPosition(S.matrixWorld),y.position.applyMatrix4(f),m++}else if(S.isHemisphereLight){const y=i.hemi[p];y.direction.setFromMatrixPosition(S.matrixWorld),y.direction.transformDirection(f),p++}}}return{setup:o,setupView:l,state:i}}function Zl(n){const t=new p0(n),e=[],i=[],s=[];function r(h){d.camera=h,e.length=0,i.length=0,s.length=0}function a(h){e.push(h)}function o(h){i.push(h)}function l(h){s.push(h)}function c(){t.setup(e)}function u(h){t.setupView(e,h)}const d={lightsArray:e,shadowsArray:i,lightProbeGridArray:s,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:d,setupLights:c,setupLightsView:u,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function m0(n){let t=new WeakMap;function e(s,r=0){const a=t.get(s);let o;return a===void 0?(o=new Zl(n),t.set(s,[o])):r>=a.length?(o=new Zl(n),a.push(o)):o=a[r],o}function i(){t=new WeakMap}return{get:e,dispose:i}}const g0=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,_0=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,x0=[new D(1,0,0),new D(-1,0,0),new D(0,1,0),new D(0,-1,0),new D(0,0,1),new D(0,0,-1)],v0=[new D(0,-1,0),new D(0,-1,0),new D(0,0,1),new D(0,0,-1),new D(0,-1,0),new D(0,-1,0)],Kl=new ae,Wi=new D,$r=new D;function M0(n,t,e){let i=new xo;const s=new Ct,r=new Ct,a=new he,o=new bd,l=new Ed,c={},u=e.maxTextureSize,d={[ni]:We,[We]:ni,[pn]:pn},h=new Sn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ct},radius:{value:4}},vertexShader:g0,fragmentShader:_0}),m=h.clone();m.defines.HORIZONTAL_PASS=1;const g=new Qe;g.setAttribute("position",new Pn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new Fe(g,h),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Vs;let f=this.type;this.render=function(T,R,x){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||T.length===0)return;this.type===Mc&&(Pt("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Vs);const w=n.getRenderTarget(),I=n.getActiveCubeFace(),F=n.getActiveMipmapLevel(),z=n.state;z.setBlending(Rn),z.buffers.depth.getReversed()===!0?z.buffers.color.setClear(0,0,0,0):z.buffers.color.setClear(1,1,1,1),z.buffers.depth.setTest(!0),z.setScissorTest(!1);const V=f!==this.type;V&&R.traverse(function(U){U.material&&(Array.isArray(U.material)?U.material.forEach(H=>H.needsUpdate=!0):U.material.needsUpdate=!0)});for(let U=0,H=T.length;U<H;U++){const K=T[U],Z=K.shadow;if(Z===void 0){Pt("WebGLShadowMap:",K,"has no shadow.");continue}if(Z.autoUpdate===!1&&Z.needsUpdate===!1)continue;s.copy(Z.mapSize);const nt=Z.getFrameExtents();s.multiply(nt),r.copy(Z.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/nt.x),s.x=r.x*nt.x,Z.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/nt.y),s.y=r.y*nt.y,Z.mapSize.y=r.y));const X=n.state.buffers.depth.getReversed();if(Z.camera._reversedDepth=X,Z.map===null||V===!0){if(Z.map!==null&&(Z.map.depthTexture!==null&&(Z.map.depthTexture.dispose(),Z.map.depthTexture=null),Z.map.dispose()),this.type===qi){if(K.isPointLight){Pt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}Z.map=new on(s.x,s.y,{format:si,type:Mn,minFilter:De,magFilter:De,generateMipmaps:!1}),Z.map.texture.name=K.name+".shadowMap",Z.map.depthTexture=new ns(s.x,s.y,mn),Z.map.depthTexture.name=K.name+".shadowMapDepth",Z.map.depthTexture.format=Dn,Z.map.depthTexture.compareFunction=null,Z.map.depthTexture.minFilter=Ee,Z.map.depthTexture.magFilter=Ee}else K.isPointLight?(Z.map=new nh(s.x),Z.map.depthTexture=new ju(s.x,vn)):(Z.map=new on(s.x,s.y),Z.map.depthTexture=new ns(s.x,s.y,vn)),Z.map.depthTexture.name=K.name+".shadowMap",Z.map.depthTexture.format=Dn,this.type===Vs?(Z.map.depthTexture.compareFunction=X?mo:po,Z.map.depthTexture.minFilter=De,Z.map.depthTexture.magFilter=De):(Z.map.depthTexture.compareFunction=null,Z.map.depthTexture.minFilter=Ee,Z.map.depthTexture.magFilter=Ee);Z.camera.updateProjectionMatrix()}Z.map.isWebGLCubeRenderTarget!==!0&&(Z.map.width!==s.x||Z.map.height!==s.y)&&Z.map.setSize(s.x,s.y);const j=Z.map.isWebGLCubeRenderTarget?6:Z.getViewportCount();K.isPointLight!==!0&&Z.updateMatrices(K,x);for(let et=0;et<j;et++){const wt=Z.getCamera(et);if(K.isPointLight){const Tt=Z.camera,ne=Z.matrix,Wt=K.distance||Tt.far;Wt!==Tt.far&&(Tt.far=Wt,Tt.updateProjectionMatrix()),Wi.setFromMatrixPosition(K.matrixWorld),Tt.position.copy(Wi),$r.copy(Tt.position),$r.add(x0[et]),Tt.up.copy(v0[et]),Tt.lookAt($r),Tt.updateMatrixWorld(),ne.makeTranslation(-Wi.x,-Wi.y,-Wi.z),Kl.multiplyMatrices(Tt.projectionMatrix,Tt.matrixWorldInverse),Z._frustum.setFromProjectionMatrix(Kl,Tt.coordinateSystem,Tt.reversedDepth)}if(Z.map.isWebGLCubeRenderTarget)n.setRenderTarget(Z.map,et),n.clear();else{et===0&&(n.setRenderTarget(Z.map),n.clear());const Tt=Z.getViewport(et);a.set(r.x*Tt.x,r.y*Tt.y,r.x*Tt.z,r.y*Tt.w),z.viewport(a)}i=Z.getFrustum(et),S(R,x,wt,K,this.type)}Z.isPointLightShadow!==!0&&this.type===qi&&E(Z,x),Z.needsUpdate=!1}f=this.type,p.needsUpdate=!1,n.setRenderTarget(w,I,F)};function E(T,R){const x=t.update(v);h.defines.VSM_SAMPLES!==T.blurSamples&&(h.defines.VSM_SAMPLES=T.blurSamples,m.defines.VSM_SAMPLES=T.blurSamples,h.needsUpdate=!0,m.needsUpdate=!0),T.mapPass===null?T.mapPass=new on(s.x,s.y,{format:si,type:Mn}):(T.mapPass.width!==T.map.width||T.mapPass.height!==T.map.height)&&T.mapPass.setSize(T.map.width,T.map.height),h.uniforms.shadow_pass.value=T.map.depthTexture,h.uniforms.resolution.value.set(T.map.width,T.map.height),h.uniforms.radius.value=T.radius,n.setRenderTarget(T.mapPass),n.clear(),n.renderBufferDirect(R,null,x,h,v,null),m.uniforms.shadow_pass.value=T.mapPass.texture,m.uniforms.resolution.value.set(T.map.width,T.map.height),m.uniforms.radius.value=T.radius,n.setRenderTarget(T.map),n.clear(),n.renderBufferDirect(R,null,x,m,v,null)}function A(T,R,x,w){let I=null;const F=x.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(F!==void 0)I=F;else if(I=x.isPointLight===!0?l:o,n.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0||R.alphaToCoverage===!0){const z=I.uuid,V=R.uuid;let U=c[z];U===void 0&&(U={},c[z]=U);let H=U[V];H===void 0&&(H=I.clone(),U[V]=H,R.addEventListener("dispose",y)),I=H}if(I.visible=R.visible,I.wireframe=R.wireframe,w===qi?I.side=R.shadowSide!==null?R.shadowSide:R.side:I.side=R.shadowSide!==null?R.shadowSide:d[R.side],I.alphaMap=R.alphaMap,I.alphaTest=R.alphaToCoverage===!0?.5:R.alphaTest,I.map=R.map,I.clipShadows=R.clipShadows,I.clippingPlanes=R.clippingPlanes,I.clipIntersection=R.clipIntersection,I.displacementMap=R.displacementMap,I.displacementScale=R.displacementScale,I.displacementBias=R.displacementBias,I.wireframeLinewidth=R.wireframeLinewidth,I.linewidth=R.linewidth,x.isPointLight===!0&&I.isMeshDistanceMaterial===!0){const z=n.properties.get(I);z.light=x}return I}function S(T,R,x,w,I){if(T.visible===!1)return;if(T.layers.test(R.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&I===qi)&&(!T.frustumCulled||T.intersectsFrustum(i))){T.modelViewMatrix.multiplyMatrices(x.matrixWorldInverse,T.matrixWorld);const V=t.update(T),U=T.material;if(Array.isArray(U)){const H=V.groups;for(let K=0,Z=H.length;K<Z;K++){const nt=H[K],X=U[nt.materialIndex];if(X&&X.visible){const j=A(T,X,w,I);T.onBeforeShadow(n,T,R,x,V,j,nt),n.renderBufferDirect(x,null,V,j,T,nt),T.onAfterShadow(n,T,R,x,V,j,nt)}}}else if(U.visible){const H=A(T,U,w,I);T.onBeforeShadow(n,T,R,x,V,H,null),n.renderBufferDirect(x,null,V,H,T,null),T.onAfterShadow(n,T,R,x,V,H,null)}}const z=T.children;for(let V=0,U=z.length;V<U;V++)S(z[V],R,x,w,I)}function y(T){T.target.removeEventListener("dispose",y);for(const x in c){const w=c[x],I=T.target.uuid;I in w&&(w[I].dispose(),delete w[I])}}}function S0(n,t){function e(){let P=!1;const lt=new he;let $=null;const ct=new he(0,0,0,0);return{setMask:function(pt){$!==pt&&!P&&(n.colorMask(pt,pt,pt,pt),$=pt)},setLocked:function(pt){P=pt},setClear:function(pt,tt,At,St,se){se===!0&&(pt*=St,tt*=St,At*=St),lt.set(pt,tt,At,St),ct.equals(lt)===!1&&(n.clearColor(pt,tt,At,St),ct.copy(lt))},reset:function(){P=!1,$=null,ct.set(-1,0,0,0)}}}function i(){let P=!1,lt=!1,$=null,ct=null,pt=null;return{setReversed:function(tt){if(lt!==tt){const At=t.get("EXT_clip_control");tt?At.clipControlEXT(At.LOWER_LEFT_EXT,At.ZERO_TO_ONE_EXT):At.clipControlEXT(At.LOWER_LEFT_EXT,At.NEGATIVE_ONE_TO_ONE_EXT),lt=tt;const St=pt;pt=null,this.setClear(St)}},getReversed:function(){return lt},setTest:function(tt){tt?Q(n.DEPTH_TEST):xt(n.DEPTH_TEST)},setMask:function(tt){$!==tt&&!P&&(n.depthMask(tt),$=tt)},setFunc:function(tt){if(lt&&(tt=Eu[tt]),ct!==tt){switch(tt){case ha:n.depthFunc(n.NEVER);break;case ua:n.depthFunc(n.ALWAYS);break;case da:n.depthFunc(n.LESS);break;case Ji:n.depthFunc(n.LEQUAL);break;case fa:n.depthFunc(n.EQUAL);break;case pa:n.depthFunc(n.GEQUAL);break;case ma:n.depthFunc(n.GREATER);break;case ga:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}ct=tt}},setLocked:function(tt){P=tt},setClear:function(tt){pt!==tt&&(pt=tt,lt&&(tt=1-tt),n.clearDepth(tt))},reset:function(){P=!1,$=null,ct=null,pt=null,lt=!1}}}function s(){let P=!1,lt=null,$=null,ct=null,pt=null,tt=null,At=null,St=null,se=null;return{setTest:function(Kt){P||(Kt?Q(n.STENCIL_TEST):xt(n.STENCIL_TEST))},setMask:function(Kt){lt!==Kt&&!P&&(n.stencilMask(Kt),lt=Kt)},setFunc:function(Kt,je,ln){($!==Kt||ct!==je||pt!==ln)&&(n.stencilFunc(Kt,je,ln),$=Kt,ct=je,pt=ln)},setOp:function(Kt,je,ln){(tt!==Kt||At!==je||St!==ln)&&(n.stencilOp(Kt,je,ln),tt=Kt,At=je,St=ln)},setLocked:function(Kt){P=Kt},setClear:function(Kt){se!==Kt&&(n.clearStencil(Kt),se=Kt)},reset:function(){P=!1,lt=null,$=null,ct=null,pt=null,tt=null,At=null,St=null,se=null}}}const r=new e,a=new i,o=new s,l=new WeakMap,c=new WeakMap;let u={},d={},h={},m=new WeakMap,g=[],v=null,p=!1,f=null,E=null,A=null,S=null,y=null,T=null,R=null,x=new Ft(0,0,0),w=0,I=!1,F=null,z=null,V=null,U=null,H=null;const K=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let Z=!1,nt=0;const X=n.getParameter(n.VERSION);X.indexOf("WebGL")!==-1?(nt=parseFloat(/^WebGL (\d)/.exec(X)[1]),Z=nt>=1):X.indexOf("OpenGL ES")!==-1&&(nt=parseFloat(/^OpenGL ES (\d)/.exec(X)[1]),Z=nt>=2);let j=null,et={};const wt=n.getParameter(n.SCISSOR_BOX),Tt=n.getParameter(n.VIEWPORT),ne=new he().fromArray(wt),Wt=new he().fromArray(Tt);function Zt(P,lt,$,ct){const pt=new Uint8Array(4),tt=n.createTexture();n.bindTexture(P,tt),n.texParameteri(P,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(P,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let At=0;At<$;At++)P===n.TEXTURE_3D||P===n.TEXTURE_2D_ARRAY?n.texImage3D(lt,0,n.RGBA,1,1,ct,0,n.RGBA,n.UNSIGNED_BYTE,pt):n.texImage2D(lt+At,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,pt);return tt}const Y={};Y[n.TEXTURE_2D]=Zt(n.TEXTURE_2D,n.TEXTURE_2D,1),Y[n.TEXTURE_CUBE_MAP]=Zt(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),Y[n.TEXTURE_2D_ARRAY]=Zt(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),Y[n.TEXTURE_3D]=Zt(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),Q(n.DEPTH_TEST),a.setFunc(Ji),Gt(!1),le(Wo),Q(n.CULL_FACE),qt(Rn);function Q(P){u[P]!==!0&&(n.enable(P),u[P]=!0)}function xt(P){u[P]!==!1&&(n.disable(P),u[P]=!1)}function Dt(P,lt){return h[P]!==lt?(n.bindFramebuffer(P,lt),h[P]=lt,P===n.DRAW_FRAMEBUFFER&&(h[n.FRAMEBUFFER]=lt),P===n.FRAMEBUFFER&&(h[n.DRAW_FRAMEBUFFER]=lt),!0):!1}function gt(P,lt){let $=g,ct=!1;if(P){$=m.get(lt),$===void 0&&($=[],m.set(lt,$));const pt=P.textures;if($.length!==pt.length||$[0]!==n.COLOR_ATTACHMENT0){for(let tt=0,At=pt.length;tt<At;tt++)$[tt]=n.COLOR_ATTACHMENT0+tt;$.length=pt.length,ct=!0}}else $[0]!==n.BACK&&($[0]=n.BACK,ct=!0);ct&&n.drawBuffers($)}function Ot(P){return v!==P?(n.useProgram(P),v=P,!0):!1}const ge={[Ei]:n.FUNC_ADD,[Xh]:n.FUNC_SUBTRACT,[Yh]:n.FUNC_REVERSE_SUBTRACT};ge[qh]=n.MIN,ge[Zh]=n.MAX;const Bt={[Kh]:n.ZERO,[$h]:n.ONE,[Jh]:n.SRC_COLOR,[Sc]:n.SRC_ALPHA,[iu]:n.SRC_ALPHA_SATURATE,[eu]:n.DST_COLOR,[jh]:n.DST_ALPHA,[Qh]:n.ONE_MINUS_SRC_COLOR,[yc]:n.ONE_MINUS_SRC_ALPHA,[nu]:n.ONE_MINUS_DST_COLOR,[tu]:n.ONE_MINUS_DST_ALPHA,[su]:n.CONSTANT_COLOR,[ru]:n.ONE_MINUS_CONSTANT_COLOR,[au]:n.CONSTANT_ALPHA,[ou]:n.ONE_MINUS_CONSTANT_ALPHA};function qt(P,lt,$,ct,pt,tt,At,St,se,Kt){if(P===Rn){p===!0&&(xt(n.BLEND),p=!1);return}if(p===!1&&(Q(n.BLEND),p=!0),P!==Wh){if(P!==f||Kt!==I){if((E!==Ei||y!==Ei)&&(n.blendEquation(n.FUNC_ADD),E=Ei,y=Ei),Kt)switch(P){case $i:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Xo:n.blendFunc(n.ONE,n.ONE);break;case Yo:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case qo:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:Yt("WebGLState: Invalid blending: ",P);break}else switch(P){case $i:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Xo:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case Yo:Yt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case qo:Yt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Yt("WebGLState: Invalid blending: ",P);break}A=null,S=null,T=null,R=null,x.set(0,0,0),w=0,f=P,I=Kt}return}pt=pt||lt,tt=tt||$,At=At||ct,(lt!==E||pt!==y)&&(n.blendEquationSeparate(ge[lt],ge[pt]),E=lt,y=pt),($!==A||ct!==S||tt!==T||At!==R)&&(n.blendFuncSeparate(Bt[$],Bt[ct],Bt[tt],Bt[At]),A=$,S=ct,T=tt,R=At),(St.equals(x)===!1||se!==w)&&(n.blendColor(St.r,St.g,St.b,se),x.copy(St),w=se),f=P,I=!1}function ie(P,lt){P.side===pn?xt(n.CULL_FACE):Q(n.CULL_FACE);let $=P.side===We;lt&&($=!$),Gt($),P.blending===$i&&P.transparent===!1?qt(Rn):qt(P.blending,P.blendEquation,P.blendSrc,P.blendDst,P.blendEquationAlpha,P.blendSrcAlpha,P.blendDstAlpha,P.blendColor,P.blendAlpha,P.premultipliedAlpha),a.setFunc(P.depthFunc),a.setTest(P.depthTest),a.setMask(P.depthWrite),r.setMask(P.colorWrite);const ct=P.stencilWrite;o.setTest(ct),ct&&(o.setMask(P.stencilWriteMask),o.setFunc(P.stencilFunc,P.stencilRef,P.stencilFuncMask),o.setOp(P.stencilFail,P.stencilZFail,P.stencilZPass)),ke(P.polygonOffset,P.polygonOffsetFactor,P.polygonOffsetUnits),P.alphaToCoverage===!0?Q(n.SAMPLE_ALPHA_TO_COVERAGE):xt(n.SAMPLE_ALPHA_TO_COVERAGE)}function Gt(P){F!==P&&(P?n.frontFace(n.CW):n.frontFace(n.CCW),F=P)}function le(P){P!==Gh?(Q(n.CULL_FACE),P!==z&&(P===Wo?n.cullFace(n.BACK):P===Vh?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):xt(n.CULL_FACE),z=P}function Se(P){P!==V&&(Z&&n.lineWidth(P),V=P)}function ke(P,lt,$){P?(Q(n.POLYGON_OFFSET_FILL),(U!==lt||H!==$)&&(U=lt,H=$,a.getReversed()&&(lt=-lt),n.polygonOffset(lt,$))):xt(n.POLYGON_OFFSET_FILL)}function ce(P){P?Q(n.SCISSOR_TEST):xt(n.SCISSOR_TEST)}function fe(P){P===void 0&&(P=n.TEXTURE0+K-1),j!==P&&(n.activeTexture(P),j=P)}function L(P,lt,$){$===void 0&&(j===null?$=n.TEXTURE0+K-1:$=j);let ct=et[$];ct===void 0&&(ct={type:void 0,texture:void 0},et[$]=ct),(ct.type!==P||ct.texture!==lt)&&(j!==$&&(n.activeTexture($),j=$),n.bindTexture(P,lt||Y[P]),ct.type=P,ct.texture=lt)}function we(){const P=et[j];P!==void 0&&P.type!==void 0&&(n.bindTexture(P.type,null),P.type=void 0,P.texture=void 0)}function Jt(){try{n.compressedTexImage2D(...arguments)}catch(P){Yt("WebGLState:",P)}}function b(){try{n.compressedTexImage3D(...arguments)}catch(P){Yt("WebGLState:",P)}}function _(){try{n.texSubImage2D(...arguments)}catch(P){Yt("WebGLState:",P)}}function N(){try{n.texSubImage3D(...arguments)}catch(P){Yt("WebGLState:",P)}}function k(){try{n.compressedTexSubImage2D(...arguments)}catch(P){Yt("WebGLState:",P)}}function W(){try{n.compressedTexSubImage3D(...arguments)}catch(P){Yt("WebGLState:",P)}}function st(){try{n.texStorage2D(...arguments)}catch(P){Yt("WebGLState:",P)}}function rt(){try{n.texStorage3D(...arguments)}catch(P){Yt("WebGLState:",P)}}function q(){try{n.texImage2D(...arguments)}catch(P){Yt("WebGLState:",P)}}function J(){try{n.texImage3D(...arguments)}catch(P){Yt("WebGLState:",P)}}function at(P){return d[P]!==void 0?d[P]:n.getParameter(P)}function bt(P,lt){d[P]!==lt&&(n.pixelStorei(P,lt),d[P]=lt)}function ht(P){ne.equals(P)===!1&&(n.scissor(P.x,P.y,P.z,P.w),ne.copy(P))}function ot(P){Wt.equals(P)===!1&&(n.viewport(P.x,P.y,P.z,P.w),Wt.copy(P))}function Et(P,lt){let $=c.get(lt);$===void 0&&($=new WeakMap,c.set(lt,$));let ct=$.get(P);ct===void 0&&(ct=n.getUniformBlockIndex(lt,P.name),$.set(P,ct))}function Rt(P,lt){const ct=c.get(lt).get(P);l.get(lt)!==ct&&(n.uniformBlockBinding(lt,ct,P.__bindingPointIndex),l.set(lt,ct))}function It(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),a.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),u={},d={},j=null,et={},h={},m=new WeakMap,g=[],v=null,p=!1,f=null,E=null,A=null,S=null,y=null,T=null,R=null,x=new Ft(0,0,0),w=0,I=!1,F=null,z=null,V=null,U=null,H=null,ne.set(0,0,n.canvas.width,n.canvas.height),Wt.set(0,0,n.canvas.width,n.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:Q,disable:xt,bindFramebuffer:Dt,drawBuffers:gt,useProgram:Ot,setBlending:qt,setMaterial:ie,setFlipSided:Gt,setCullFace:le,setLineWidth:Se,setPolygonOffset:ke,setScissorTest:ce,activeTexture:fe,bindTexture:L,unbindTexture:we,compressedTexImage2D:Jt,compressedTexImage3D:b,texImage2D:q,texImage3D:J,pixelStorei:bt,getParameter:at,updateUBOMapping:Et,uniformBlockBinding:Rt,texStorage2D:st,texStorage3D:rt,texSubImage2D:_,texSubImage3D:N,compressedTexSubImage2D:k,compressedTexSubImage3D:W,scissor:ht,viewport:ot,reset:It}}function y0(n,t,e,i,s,r,a){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Ct,u=new WeakMap,d=new Set;let h;const m=new WeakMap;let g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function v(b,_){return g?new OffscreenCanvas(b,_):er("canvas")}function p(b,_,N){let k=1;const W=Jt(b);if((W.width>N||W.height>N)&&(k=N/Math.max(W.width,W.height)),k<1)if(typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&b instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&b instanceof ImageBitmap||typeof VideoFrame<"u"&&b instanceof VideoFrame){const st=Math.floor(k*W.width),rt=Math.floor(k*W.height);h===void 0&&(h=v(st,rt));const q=_?v(st,rt):h;return q.width=st,q.height=rt,q.getContext("2d").drawImage(b,0,0,st,rt),Pt("WebGLRenderer: Texture has been resized from ("+W.width+"x"+W.height+") to ("+st+"x"+rt+")."),q}else return"data"in b&&Pt("WebGLRenderer: Image in DataTexture is too big ("+W.width+"x"+W.height+")."),b;return b}function f(b){return b.generateMipmaps}function E(b){n.generateMipmap(b)}function A(b){return b.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:b.isWebGL3DRenderTarget?n.TEXTURE_3D:b.isWebGLArrayRenderTarget||b.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function S(b,_,N,k,W,st=!1){if(b!==null){if(n[b]!==void 0)return n[b];Pt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+b+"'")}let rt;k&&(rt=t.get("EXT_texture_norm16"),rt||Pt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let q=_;if(_===n.RED&&(N===n.FLOAT&&(q=n.R32F),N===n.HALF_FLOAT&&(q=n.R16F),N===n.UNSIGNED_BYTE&&(q=n.R8),N===n.UNSIGNED_SHORT&&rt&&(q=rt.R16_EXT),N===n.SHORT&&rt&&(q=rt.R16_SNORM_EXT)),_===n.RED_INTEGER&&(N===n.UNSIGNED_BYTE&&(q=n.R8UI),N===n.UNSIGNED_SHORT&&(q=n.R16UI),N===n.UNSIGNED_INT&&(q=n.R32UI),N===n.BYTE&&(q=n.R8I),N===n.SHORT&&(q=n.R16I),N===n.INT&&(q=n.R32I)),_===n.RG&&(N===n.FLOAT&&(q=n.RG32F),N===n.HALF_FLOAT&&(q=n.RG16F),N===n.UNSIGNED_BYTE&&(q=n.RG8),N===n.UNSIGNED_SHORT&&rt&&(q=rt.RG16_EXT),N===n.SHORT&&rt&&(q=rt.RG16_SNORM_EXT)),_===n.RG_INTEGER&&(N===n.UNSIGNED_BYTE&&(q=n.RG8UI),N===n.UNSIGNED_SHORT&&(q=n.RG16UI),N===n.UNSIGNED_INT&&(q=n.RG32UI),N===n.BYTE&&(q=n.RG8I),N===n.SHORT&&(q=n.RG16I),N===n.INT&&(q=n.RG32I)),_===n.RGB_INTEGER&&(N===n.UNSIGNED_BYTE&&(q=n.RGB8UI),N===n.UNSIGNED_SHORT&&(q=n.RGB16UI),N===n.UNSIGNED_INT&&(q=n.RGB32UI),N===n.BYTE&&(q=n.RGB8I),N===n.SHORT&&(q=n.RGB16I),N===n.INT&&(q=n.RGB32I)),_===n.RGBA_INTEGER&&(N===n.UNSIGNED_BYTE&&(q=n.RGBA8UI),N===n.UNSIGNED_SHORT&&(q=n.RGBA16UI),N===n.UNSIGNED_INT&&(q=n.RGBA32UI),N===n.BYTE&&(q=n.RGBA8I),N===n.SHORT&&(q=n.RGBA16I),N===n.INT&&(q=n.RGBA32I)),_===n.RGB&&(N===n.UNSIGNED_SHORT&&rt&&(q=rt.RGB16_EXT),N===n.SHORT&&rt&&(q=rt.RGB16_SNORM_EXT),N===n.UNSIGNED_INT_5_9_9_9_REV&&(q=n.RGB9_E5),N===n.UNSIGNED_INT_10F_11F_11F_REV&&(q=n.R11F_G11F_B10F)),_===n.RGBA){const J=st?tr:Vt.getTransfer(W);N===n.FLOAT&&(q=n.RGBA32F),N===n.HALF_FLOAT&&(q=n.RGBA16F),N===n.UNSIGNED_BYTE&&(q=J===Qt?n.SRGB8_ALPHA8:n.RGBA8),N===n.UNSIGNED_SHORT&&rt&&(q=rt.RGBA16_EXT),N===n.SHORT&&rt&&(q=rt.RGBA16_SNORM_EXT),N===n.UNSIGNED_SHORT_4_4_4_4&&(q=n.RGBA4),N===n.UNSIGNED_SHORT_5_5_5_1&&(q=n.RGB5_A1)}return(q===n.R16F||q===n.R32F||q===n.RG16F||q===n.RG32F||q===n.RGBA16F||q===n.RGBA32F)&&t.get("EXT_color_buffer_float"),q}function y(b,_){let N;return b?_===null||_===vn||_===ts?N=n.DEPTH24_STENCIL8:_===mn?N=n.DEPTH32F_STENCIL8:_===ji&&(N=n.DEPTH24_STENCIL8,Pt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===vn||_===ts?N=n.DEPTH_COMPONENT24:_===mn?N=n.DEPTH_COMPONENT32F:_===ji&&(N=n.DEPTH_COMPONENT16),N}function T(b,_){return f(b)===!0||b.isFramebufferTexture&&b.minFilter!==Ee&&b.minFilter!==De?Math.log2(Math.max(_.width,_.height))+1:b.mipmaps!==void 0&&b.mipmaps.length>0?b.mipmaps.length:b.isCompressedTexture&&Array.isArray(b.image)?_.mipmaps.length:1}function R(b){const _=b.target;_.removeEventListener("dispose",R),w(_),_.isVideoTexture&&u.delete(_),_.isHTMLTexture&&d.delete(_)}function x(b){const _=b.target;_.removeEventListener("dispose",x),F(_)}function w(b){const _=i.get(b);if(_.__webglInit===void 0)return;const N=b.source,k=m.get(N);if(k){const W=k[_.__cacheKey];W.usedTimes--,W.usedTimes===0&&I(b),Object.keys(k).length===0&&m.delete(N)}i.remove(b)}function I(b){const _=i.get(b);n.deleteTexture(_.__webglTexture);const N=b.source,k=m.get(N);delete k[_.__cacheKey],a.memory.textures--}function F(b){const _=i.get(b);if(b.depthTexture&&(b.depthTexture.dispose(),i.remove(b.depthTexture)),b.isWebGLCubeRenderTarget)for(let k=0;k<6;k++){if(Array.isArray(_.__webglFramebuffer[k]))for(let W=0;W<_.__webglFramebuffer[k].length;W++)n.deleteFramebuffer(_.__webglFramebuffer[k][W]);else n.deleteFramebuffer(_.__webglFramebuffer[k]);_.__webglDepthbuffer&&n.deleteRenderbuffer(_.__webglDepthbuffer[k])}else{if(Array.isArray(_.__webglFramebuffer))for(let k=0;k<_.__webglFramebuffer.length;k++)n.deleteFramebuffer(_.__webglFramebuffer[k]);else n.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&n.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&n.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let k=0;k<_.__webglColorRenderbuffer.length;k++)_.__webglColorRenderbuffer[k]&&n.deleteRenderbuffer(_.__webglColorRenderbuffer[k]);_.__webglDepthRenderbuffer&&n.deleteRenderbuffer(_.__webglDepthRenderbuffer)}const N=b.textures;for(let k=0,W=N.length;k<W;k++){const st=i.get(N[k]);st.__webglTexture&&(n.deleteTexture(st.__webglTexture),a.memory.textures--),i.remove(N[k])}i.remove(b)}let z=0;function V(){z=0}function U(){return z}function H(b){z=b}function K(){const b=z;return b>=s.maxTextures&&Pt("WebGLTextures: Trying to use "+(b+1)+" texture units while this GPU supports only "+s.maxTextures),z+=1,b}function Z(b){const _=[];return _.push(b.wrapS),_.push(b.wrapT),_.push(b.wrapR||0),_.push(b.magFilter),_.push(b.minFilter),_.push(b.anisotropy),_.push(b.internalFormat),_.push(b.format),_.push(b.type),_.push(b.generateMipmaps),_.push(b.premultiplyAlpha),_.push(b.flipY),_.push(b.unpackAlignment),_.push(b.colorSpace),_.join()}function nt(b,_){const N=i.get(b);if(b.isVideoTexture&&L(b),b.isRenderTargetTexture===!1&&b.isExternalTexture!==!0&&b.version>0&&N.__version!==b.version){const k=b.image;if(k===null)Pt("WebGLRenderer: Texture marked for update but no image data found.");else if(k.complete===!1)Pt("WebGLRenderer: Texture marked for update but image is incomplete");else{xt(N,b,_);return}}else b.isExternalTexture&&(N.__webglTexture=b.sourceTexture?b.sourceTexture:null);e.bindTexture(n.TEXTURE_2D,N.__webglTexture,n.TEXTURE0+_)}function X(b,_){const N=i.get(b);if(b.isRenderTargetTexture===!1&&b.version>0&&N.__version!==b.version){xt(N,b,_);return}else b.isExternalTexture&&(N.__webglTexture=b.sourceTexture?b.sourceTexture:null);e.bindTexture(n.TEXTURE_2D_ARRAY,N.__webglTexture,n.TEXTURE0+_)}function j(b,_){const N=i.get(b);if(b.isRenderTargetTexture===!1&&b.version>0&&N.__version!==b.version){xt(N,b,_);return}e.bindTexture(n.TEXTURE_3D,N.__webglTexture,n.TEXTURE0+_)}function et(b,_){const N=i.get(b);if(b.isCubeDepthTexture!==!0&&b.version>0&&N.__version!==b.version){Dt(N,b,_);return}e.bindTexture(n.TEXTURE_CUBE_MAP,N.__webglTexture,n.TEXTURE0+_)}const wt={[Qi]:n.REPEAT,[wn]:n.CLAMP_TO_EDGE,[_a]:n.MIRRORED_REPEAT},Tt={[Ee]:n.NEAREST,[hu]:n.NEAREST_MIPMAP_NEAREST,[fs]:n.NEAREST_MIPMAP_LINEAR,[De]:n.LINEAR,[Mr]:n.LINEAR_MIPMAP_NEAREST,[Qn]:n.LINEAR_MIPMAP_LINEAR},ne={[pu]:n.NEVER,[vu]:n.ALWAYS,[mu]:n.LESS,[po]:n.LEQUAL,[gu]:n.EQUAL,[mo]:n.GEQUAL,[_u]:n.GREATER,[xu]:n.NOTEQUAL};function Wt(b,_){if(_.type===mn&&t.has("OES_texture_float_linear")===!1&&(_.magFilter===De||_.magFilter===Mr||_.magFilter===fs||_.magFilter===Qn||_.minFilter===De||_.minFilter===Mr||_.minFilter===fs||_.minFilter===Qn)&&Pt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(b,n.TEXTURE_WRAP_S,wt[_.wrapS]),n.texParameteri(b,n.TEXTURE_WRAP_T,wt[_.wrapT]),(b===n.TEXTURE_3D||b===n.TEXTURE_2D_ARRAY)&&n.texParameteri(b,n.TEXTURE_WRAP_R,wt[_.wrapR]),n.texParameteri(b,n.TEXTURE_MAG_FILTER,Tt[_.magFilter]),n.texParameteri(b,n.TEXTURE_MIN_FILTER,Tt[_.minFilter]),_.compareFunction&&(n.texParameteri(b,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(b,n.TEXTURE_COMPARE_FUNC,ne[_.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===Ee||_.minFilter!==fs&&_.minFilter!==Qn||_.type===mn&&t.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||i.get(_).__currentAnisotropy){const N=t.get("EXT_texture_filter_anisotropic");n.texParameterf(b,N.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,s.getMaxAnisotropy())),i.get(_).__currentAnisotropy=_.anisotropy}}}function Zt(b,_){let N=!1;b.__webglInit===void 0&&(b.__webglInit=!0,_.addEventListener("dispose",R));const k=_.source;let W=m.get(k);W===void 0&&(W={},m.set(k,W));const st=Z(_);if(st!==b.__cacheKey){W[st]===void 0&&(W[st]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,N=!0),W[st].usedTimes++;const rt=W[b.__cacheKey];rt!==void 0&&(W[b.__cacheKey].usedTimes--,rt.usedTimes===0&&I(_)),b.__cacheKey=st,b.__webglTexture=W[st].texture}return N}function Y(b,_,N){return Math.floor(Math.floor(b/N)/_)}function Q(b,_,N,k){const st=b.updateRanges;if(st.length===0)e.texSubImage2D(n.TEXTURE_2D,0,0,0,_.width,_.height,N,k,_.data);else{st.sort((bt,ht)=>bt.start-ht.start);let rt=0;for(let bt=1;bt<st.length;bt++){const ht=st[rt],ot=st[bt],Et=ht.start+ht.count,Rt=Y(ot.start,_.width,4),It=Y(ht.start,_.width,4);ot.start<=Et+1&&Rt===It&&Y(ot.start+ot.count-1,_.width,4)===Rt?ht.count=Math.max(ht.count,ot.start+ot.count-ht.start):(++rt,st[rt]=ot)}st.length=rt+1;const q=e.getParameter(n.UNPACK_ROW_LENGTH),J=e.getParameter(n.UNPACK_SKIP_PIXELS),at=e.getParameter(n.UNPACK_SKIP_ROWS);e.pixelStorei(n.UNPACK_ROW_LENGTH,_.width);for(let bt=0,ht=st.length;bt<ht;bt++){const ot=st[bt],Et=Math.floor(ot.start/4),Rt=Math.ceil(ot.count/4),It=Et%_.width,P=Math.floor(Et/_.width),lt=Rt,$=1;e.pixelStorei(n.UNPACK_SKIP_PIXELS,It),e.pixelStorei(n.UNPACK_SKIP_ROWS,P),e.texSubImage2D(n.TEXTURE_2D,0,It,P,lt,$,N,k,_.data)}b.clearUpdateRanges(),e.pixelStorei(n.UNPACK_ROW_LENGTH,q),e.pixelStorei(n.UNPACK_SKIP_PIXELS,J),e.pixelStorei(n.UNPACK_SKIP_ROWS,at)}}function xt(b,_,N){let k=n.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(k=n.TEXTURE_2D_ARRAY),_.isData3DTexture&&(k=n.TEXTURE_3D);const W=Zt(b,_),st=_.source;e.bindTexture(k,b.__webglTexture,n.TEXTURE0+N);const rt=i.get(st);if(st.version!==rt.__version||W===!0){if(e.activeTexture(n.TEXTURE0+N),(typeof ImageBitmap<"u"&&_.image instanceof ImageBitmap)===!1){const $=Vt.getPrimaries(Vt.workingColorSpace),ct=_.colorSpace===Hn?null:Vt.getPrimaries(_.colorSpace),pt=_.colorSpace===Hn||$===ct?n.NONE:n.BROWSER_DEFAULT_WEBGL;e.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,_.flipY),e.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),e.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,pt)}e.pixelStorei(n.UNPACK_ALIGNMENT,_.unpackAlignment);let J=p(_.image,!1,s.maxTextureSize);J=we(_,J);const at=r.convert(_.format,_.colorSpace),bt=r.convert(_.type);let ht=S(_.internalFormat,at,bt,_.normalized,_.colorSpace,_.isVideoTexture);Wt(k,_);let ot;const Et=_.mipmaps,Rt=_.isVideoTexture!==!0,It=rt.__version===void 0||W===!0,P=st.dataReady,lt=T(_,J);if(_.isDepthTexture)ht=y(_.format===jn,_.type),It&&(Rt?e.texStorage2D(n.TEXTURE_2D,1,ht,J.width,J.height):e.texImage2D(n.TEXTURE_2D,0,ht,J.width,J.height,0,at,bt,null));else if(_.isDataTexture)if(Et.length>0){Rt&&It&&e.texStorage2D(n.TEXTURE_2D,lt,ht,Et[0].width,Et[0].height);for(let $=0,ct=Et.length;$<ct;$++)ot=Et[$],Rt?P&&e.texSubImage2D(n.TEXTURE_2D,$,0,0,ot.width,ot.height,at,bt,ot.data):e.texImage2D(n.TEXTURE_2D,$,ht,ot.width,ot.height,0,at,bt,ot.data);_.generateMipmaps=!1}else Rt?(It&&e.texStorage2D(n.TEXTURE_2D,lt,ht,J.width,J.height),P&&Q(_,J,at,bt)):e.texImage2D(n.TEXTURE_2D,0,ht,J.width,J.height,0,at,bt,J.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){Rt&&It&&e.texStorage3D(n.TEXTURE_2D_ARRAY,lt,ht,Et[0].width,Et[0].height,J.depth);for(let $=0,ct=Et.length;$<ct;$++)if(ot=Et[$],_.format!==an)if(at!==null)if(Rt){if(P)if(_.layerUpdates.size>0){const pt=wl(ot.width,ot.height,_.format,_.type);for(const tt of _.layerUpdates){const At=ot.data.subarray(tt*pt/ot.data.BYTES_PER_ELEMENT,(tt+1)*pt/ot.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,$,0,0,tt,ot.width,ot.height,1,at,At)}}else e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,$,0,0,0,ot.width,ot.height,J.depth,at,ot.data)}else e.compressedTexImage3D(n.TEXTURE_2D_ARRAY,$,ht,ot.width,ot.height,J.depth,0,ot.data,0,0);else Pt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Rt?P&&e.texSubImage3D(n.TEXTURE_2D_ARRAY,$,0,0,0,ot.width,ot.height,J.depth,at,bt,ot.data):e.texImage3D(n.TEXTURE_2D_ARRAY,$,ht,ot.width,ot.height,J.depth,0,at,bt,ot.data);_.layerUpdates.size>0&&_.clearLayerUpdates()}else{Rt&&It&&e.texStorage2D(n.TEXTURE_2D,lt,ht,Et[0].width,Et[0].height);for(let $=0,ct=Et.length;$<ct;$++)ot=Et[$],_.format!==an?at!==null?Rt?P&&e.compressedTexSubImage2D(n.TEXTURE_2D,$,0,0,ot.width,ot.height,at,ot.data):e.compressedTexImage2D(n.TEXTURE_2D,$,ht,ot.width,ot.height,0,ot.data):Pt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Rt?P&&e.texSubImage2D(n.TEXTURE_2D,$,0,0,ot.width,ot.height,at,bt,ot.data):e.texImage2D(n.TEXTURE_2D,$,ht,ot.width,ot.height,0,at,bt,ot.data)}else if(_.isDataArrayTexture)if(Rt){if(It&&e.texStorage3D(n.TEXTURE_2D_ARRAY,lt,ht,J.width,J.height,J.depth),P)if(_.layerUpdates.size>0){const $=wl(J.width,J.height,_.format,_.type);for(const ct of _.layerUpdates){const pt=J.data.subarray(ct*$/J.data.BYTES_PER_ELEMENT,(ct+1)*$/J.data.BYTES_PER_ELEMENT);e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,ct,J.width,J.height,1,at,bt,pt)}_.clearLayerUpdates()}else e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,J.width,J.height,J.depth,at,bt,J.data)}else e.texImage3D(n.TEXTURE_2D_ARRAY,0,ht,J.width,J.height,J.depth,0,at,bt,J.data);else if(_.isData3DTexture)Rt?(It&&e.texStorage3D(n.TEXTURE_3D,lt,ht,J.width,J.height,J.depth),P&&e.texSubImage3D(n.TEXTURE_3D,0,0,0,0,J.width,J.height,J.depth,at,bt,J.data)):e.texImage3D(n.TEXTURE_3D,0,ht,J.width,J.height,J.depth,0,at,bt,J.data);else if(_.isFramebufferTexture){if(It)if(Rt)e.texStorage2D(n.TEXTURE_2D,lt,ht,J.width,J.height);else{let $=J.width,ct=J.height;for(let pt=0;pt<lt;pt++)e.texImage2D(n.TEXTURE_2D,pt,ht,$,ct,0,at,bt,null),$>>=1,ct>>=1}}else if(_.isHTMLTexture){if("texElementImage2D"in n){const $=n.canvas;if($.hasAttribute("layoutsubtree")||$.setAttribute("layoutsubtree","true"),J.parentNode!==$){$.appendChild(J),d.add(_),$.onpaint=ct=>{const pt=ct.changedElements;for(const tt of d)pt.includes(tt.image)&&(tt.needsUpdate=!0)},$.requestPaint();return}if(n.texElementImage2D.length===3)n.texElementImage2D(n.TEXTURE_2D,n.RGBA8,J);else{const pt=n.RGBA,tt=n.RGBA,At=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,0,pt,tt,At,J)}n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(Et.length>0){if(Rt&&It){const $=Jt(Et[0]);e.texStorage2D(n.TEXTURE_2D,lt,ht,$.width,$.height)}for(let $=0,ct=Et.length;$<ct;$++)ot=Et[$],Rt?P&&e.texSubImage2D(n.TEXTURE_2D,$,0,0,at,bt,ot):e.texImage2D(n.TEXTURE_2D,$,ht,at,bt,ot);_.generateMipmaps=!1}else if(Rt){if(It){const $=Jt(J);e.texStorage2D(n.TEXTURE_2D,lt,ht,$.width,$.height)}P&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,at,bt,J)}else e.texImage2D(n.TEXTURE_2D,0,ht,at,bt,J);f(_)&&E(k),rt.__version=st.version,_.onUpdate&&_.onUpdate(_)}b.__version=_.version}function Dt(b,_,N){if(_.image.length!==6)return;const k=Zt(b,_),W=_.source;e.bindTexture(n.TEXTURE_CUBE_MAP,b.__webglTexture,n.TEXTURE0+N);const st=i.get(W);if(W.version!==st.__version||k===!0){e.activeTexture(n.TEXTURE0+N);const rt=Vt.getPrimaries(Vt.workingColorSpace),q=_.colorSpace===Hn?null:Vt.getPrimaries(_.colorSpace),J=_.colorSpace===Hn||rt===q?n.NONE:n.BROWSER_DEFAULT_WEBGL;e.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,_.flipY),e.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),e.pixelStorei(n.UNPACK_ALIGNMENT,_.unpackAlignment),e.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,J);const at=_.isCompressedTexture||_.image[0].isCompressedTexture,bt=_.image[0]&&_.image[0].isDataTexture,ht=[];for(let tt=0;tt<6;tt++)!at&&!bt?ht[tt]=p(_.image[tt],!0,s.maxCubemapSize):ht[tt]=bt?_.image[tt].image:_.image[tt],ht[tt]=we(_,ht[tt]);const ot=ht[0],Et=r.convert(_.format,_.colorSpace),Rt=r.convert(_.type),It=S(_.internalFormat,Et,Rt,_.normalized,_.colorSpace),P=_.isVideoTexture!==!0,lt=st.__version===void 0||k===!0,$=W.dataReady;let ct=T(_,ot);Wt(n.TEXTURE_CUBE_MAP,_);let pt;if(at){P&&lt&&e.texStorage2D(n.TEXTURE_CUBE_MAP,ct,It,ot.width,ot.height);for(let tt=0;tt<6;tt++){pt=ht[tt].mipmaps;for(let At=0;At<pt.length;At++){const St=pt[At];_.format!==an?Et!==null?P?$&&e.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+tt,At,0,0,St.width,St.height,Et,St.data):e.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+tt,At,It,St.width,St.height,0,St.data):Pt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):P?$&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+tt,At,0,0,St.width,St.height,Et,Rt,St.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+tt,At,It,St.width,St.height,0,Et,Rt,St.data)}}}else{if(pt=_.mipmaps,P&&lt){pt.length>0&&ct++;const tt=Jt(ht[0]);e.texStorage2D(n.TEXTURE_CUBE_MAP,ct,It,tt.width,tt.height)}for(let tt=0;tt<6;tt++)if(bt){P?$&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+tt,0,0,0,ht[tt].width,ht[tt].height,Et,Rt,ht[tt].data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+tt,0,It,ht[tt].width,ht[tt].height,0,Et,Rt,ht[tt].data);for(let At=0;At<pt.length;At++){const se=pt[At].image[tt].image;P?$&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+tt,At+1,0,0,se.width,se.height,Et,Rt,se.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+tt,At+1,It,se.width,se.height,0,Et,Rt,se.data)}}else{P?$&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+tt,0,0,0,Et,Rt,ht[tt]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+tt,0,It,Et,Rt,ht[tt]);for(let At=0;At<pt.length;At++){const St=pt[At];P?$&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+tt,At+1,0,0,Et,Rt,St.image[tt]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+tt,At+1,It,Et,Rt,St.image[tt])}}}f(_)&&E(n.TEXTURE_CUBE_MAP),st.__version=W.version,_.onUpdate&&_.onUpdate(_)}b.__version=_.version}function gt(b,_,N,k,W,st){const rt=r.convert(N.format,N.colorSpace),q=r.convert(N.type),J=S(N.internalFormat,rt,q,N.normalized,N.colorSpace),at=i.get(_),bt=i.get(N);if(bt.__renderTarget=_,!at.__hasExternalTextures){const ht=Math.max(1,_.width>>st),ot=Math.max(1,_.height>>st);W===n.TEXTURE_3D||W===n.TEXTURE_2D_ARRAY?e.texImage3D(W,st,J,ht,ot,_.depth,0,rt,q,null):e.texImage2D(W,st,J,ht,ot,0,rt,q,null)}e.bindFramebuffer(n.FRAMEBUFFER,b),fe(_)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,k,W,bt.__webglTexture,0,ce(_)):(W===n.TEXTURE_2D||W>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&W<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,k,W,bt.__webglTexture,st),e.bindFramebuffer(n.FRAMEBUFFER,null)}function Ot(b,_,N){if(n.bindRenderbuffer(n.RENDERBUFFER,b),_.depthBuffer){const k=_.depthTexture,W=k&&k.isDepthTexture?k.type:null,st=y(_.stencilBuffer,W),rt=_.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;fe(_)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ce(_),st,_.width,_.height):N?n.renderbufferStorageMultisample(n.RENDERBUFFER,ce(_),st,_.width,_.height):n.renderbufferStorage(n.RENDERBUFFER,st,_.width,_.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,rt,n.RENDERBUFFER,b)}else{const k=_.textures;for(let W=0;W<k.length;W++){const st=k[W],rt=r.convert(st.format,st.colorSpace),q=r.convert(st.type),J=S(st.internalFormat,rt,q,st.normalized,st.colorSpace);fe(_)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ce(_),J,_.width,_.height):N?n.renderbufferStorageMultisample(n.RENDERBUFFER,ce(_),J,_.width,_.height):n.renderbufferStorage(n.RENDERBUFFER,J,_.width,_.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function ge(b,_,N){const k=_.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(n.FRAMEBUFFER,b),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const W=i.get(_.depthTexture);if(W.__renderTarget=_,(!W.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),k){if(W.__webglInit===void 0&&(W.__webglInit=!0,_.depthTexture.addEventListener("dispose",R)),W.__webglTexture===void 0){W.__webglTexture=n.createTexture(),e.bindTexture(n.TEXTURE_CUBE_MAP,W.__webglTexture),Wt(n.TEXTURE_CUBE_MAP,_.depthTexture);const at=r.convert(_.depthTexture.format),bt=r.convert(_.depthTexture.type);let ht;_.depthTexture.format===Dn?ht=n.DEPTH_COMPONENT24:_.depthTexture.format===jn&&(ht=n.DEPTH24_STENCIL8);for(let ot=0;ot<6;ot++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ot,0,ht,_.width,_.height,0,at,bt,null)}}else nt(_.depthTexture,0);const st=W.__webglTexture,rt=ce(_),q=k?n.TEXTURE_CUBE_MAP_POSITIVE_X+N:n.TEXTURE_2D,J=_.depthTexture.format===jn?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(_.depthTexture.format===Dn)fe(_)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,J,q,st,0,rt):n.framebufferTexture2D(n.FRAMEBUFFER,J,q,st,0);else if(_.depthTexture.format===jn)fe(_)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,J,q,st,0,rt):n.framebufferTexture2D(n.FRAMEBUFFER,J,q,st,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Bt(b){const _=i.get(b),N=b.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==b.depthTexture){const k=b.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),k){const W=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,k.removeEventListener("dispose",W)};k.addEventListener("dispose",W),_.__depthDisposeCallback=W}_.__boundDepthTexture=k}if(b.depthTexture&&!_.__autoAllocateDepthBuffer)if(N)for(let k=0;k<6;k++)ge(_.__webglFramebuffer[k],b,k);else{const k=b.texture.mipmaps;k&&k.length>0?ge(_.__webglFramebuffer[0],b,0):ge(_.__webglFramebuffer,b,0)}else if(N){_.__webglDepthbuffer=[];for(let k=0;k<6;k++)if(e.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer[k]),_.__webglDepthbuffer[k]===void 0)_.__webglDepthbuffer[k]=n.createRenderbuffer(),Ot(_.__webglDepthbuffer[k],b,!1);else{const W=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,st=_.__webglDepthbuffer[k];n.bindRenderbuffer(n.RENDERBUFFER,st),n.framebufferRenderbuffer(n.FRAMEBUFFER,W,n.RENDERBUFFER,st)}}else{const k=b.texture.mipmaps;if(k&&k.length>0?e.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer[0]):e.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=n.createRenderbuffer(),Ot(_.__webglDepthbuffer,b,!1);else{const W=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,st=_.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,st),n.framebufferRenderbuffer(n.FRAMEBUFFER,W,n.RENDERBUFFER,st)}}e.bindFramebuffer(n.FRAMEBUFFER,null)}function qt(b,_,N){const k=i.get(b);_!==void 0&&gt(k.__webglFramebuffer,b,b.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),N!==void 0&&Bt(b)}function ie(b){const _=b.texture,N=i.get(b),k=i.get(_);b.addEventListener("dispose",x);const W=b.textures,st=b.isWebGLCubeRenderTarget===!0,rt=W.length>1;if(rt||(k.__webglTexture===void 0&&(k.__webglTexture=n.createTexture()),k.__version=_.version,a.memory.textures++),st){N.__webglFramebuffer=[];for(let q=0;q<6;q++)if(_.mipmaps&&_.mipmaps.length>0){N.__webglFramebuffer[q]=[];for(let J=0;J<_.mipmaps.length;J++)N.__webglFramebuffer[q][J]=n.createFramebuffer()}else N.__webglFramebuffer[q]=n.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){N.__webglFramebuffer=[];for(let q=0;q<_.mipmaps.length;q++)N.__webglFramebuffer[q]=n.createFramebuffer()}else N.__webglFramebuffer=n.createFramebuffer();if(rt)for(let q=0,J=W.length;q<J;q++){const at=i.get(W[q]);at.__webglTexture===void 0&&(at.__webglTexture=n.createTexture(),a.memory.textures++)}if(b.samples>0&&fe(b)===!1){N.__webglMultisampledFramebuffer=n.createFramebuffer(),N.__webglColorRenderbuffer=[],e.bindFramebuffer(n.FRAMEBUFFER,N.__webglMultisampledFramebuffer);for(let q=0;q<W.length;q++){const J=W[q];N.__webglColorRenderbuffer[q]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,N.__webglColorRenderbuffer[q]);const at=r.convert(J.format,J.colorSpace),bt=r.convert(J.type),ht=S(J.internalFormat,at,bt,J.normalized,J.colorSpace,b.isXRRenderTarget===!0),ot=ce(b);n.renderbufferStorageMultisample(n.RENDERBUFFER,ot,ht,b.width,b.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+q,n.RENDERBUFFER,N.__webglColorRenderbuffer[q])}n.bindRenderbuffer(n.RENDERBUFFER,null),b.depthBuffer&&(N.__webglDepthRenderbuffer=n.createRenderbuffer(),Ot(N.__webglDepthRenderbuffer,b,!0)),e.bindFramebuffer(n.FRAMEBUFFER,null)}}if(st){e.bindTexture(n.TEXTURE_CUBE_MAP,k.__webglTexture),Wt(n.TEXTURE_CUBE_MAP,_);for(let q=0;q<6;q++)if(_.mipmaps&&_.mipmaps.length>0)for(let J=0;J<_.mipmaps.length;J++)gt(N.__webglFramebuffer[q][J],b,_,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+q,J);else gt(N.__webglFramebuffer[q],b,_,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+q,0);f(_)&&E(n.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(rt){for(let q=0,J=W.length;q<J;q++){const at=W[q],bt=i.get(at);let ht=n.TEXTURE_2D;(b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(ht=b.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(ht,bt.__webglTexture),Wt(ht,at),gt(N.__webglFramebuffer,b,at,n.COLOR_ATTACHMENT0+q,ht,0),f(at)&&E(ht)}e.unbindTexture()}else{let q=n.TEXTURE_2D;if((b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(q=b.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(q,k.__webglTexture),Wt(q,_),_.mipmaps&&_.mipmaps.length>0)for(let J=0;J<_.mipmaps.length;J++)gt(N.__webglFramebuffer[J],b,_,n.COLOR_ATTACHMENT0,q,J);else gt(N.__webglFramebuffer,b,_,n.COLOR_ATTACHMENT0,q,0);f(_)&&E(q),e.unbindTexture()}b.depthBuffer&&Bt(b)}function Gt(b){const _=b.textures;for(let N=0,k=_.length;N<k;N++){const W=_[N];if(f(W)){const st=A(b),rt=i.get(W).__webglTexture;e.bindTexture(st,rt),E(st),e.unbindTexture()}}}const le=[],Se=[];function ke(b){if(b.samples>0){if(fe(b)===!1){const _=b.textures,N=b.width,k=b.height;let W=n.COLOR_BUFFER_BIT;const st=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,rt=i.get(b),q=_.length>1;if(q)for(let at=0;at<_.length;at++)e.bindFramebuffer(n.FRAMEBUFFER,rt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+at,n.RENDERBUFFER,null),e.bindFramebuffer(n.FRAMEBUFFER,rt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+at,n.TEXTURE_2D,null,0);e.bindFramebuffer(n.READ_FRAMEBUFFER,rt.__webglMultisampledFramebuffer);const J=b.texture.mipmaps;J&&J.length>0?e.bindFramebuffer(n.DRAW_FRAMEBUFFER,rt.__webglFramebuffer[0]):e.bindFramebuffer(n.DRAW_FRAMEBUFFER,rt.__webglFramebuffer);for(let at=0;at<_.length;at++){if(b.resolveDepthBuffer&&(b.depthBuffer&&(W|=n.DEPTH_BUFFER_BIT),b.stencilBuffer&&b.resolveStencilBuffer&&(W|=n.STENCIL_BUFFER_BIT)),q){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,rt.__webglColorRenderbuffer[at]);const bt=i.get(_[at]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,bt,0)}n.blitFramebuffer(0,0,N,k,0,0,N,k,W,n.NEAREST),l===!0&&(le.length=0,Se.length=0,le.push(n.COLOR_ATTACHMENT0+at),b.depthBuffer&&b.storeMultisampledDepthBuffer===!1&&(le.push(st),Se.push(st),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,Se)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,le))}if(e.bindFramebuffer(n.READ_FRAMEBUFFER,null),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),q)for(let at=0;at<_.length;at++){e.bindFramebuffer(n.FRAMEBUFFER,rt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+at,n.RENDERBUFFER,rt.__webglColorRenderbuffer[at]);const bt=i.get(_[at]).__webglTexture;e.bindFramebuffer(n.FRAMEBUFFER,rt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+at,n.TEXTURE_2D,bt,0)}e.bindFramebuffer(n.DRAW_FRAMEBUFFER,rt.__webglMultisampledFramebuffer)}else if(b.depthBuffer&&b.storeMultisampledDepthBuffer===!1&&l){const _=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[_])}}}function ce(b){return Math.min(s.maxSamples,b.samples)}function fe(b){const _=i.get(b);return b.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function L(b){const _=a.render.frame;u.get(b)!==_&&(u.set(b,_),b.update())}function we(b,_){const N=b.colorSpace,k=b.format,W=b.type;return b.isCompressedTexture===!0||b.isVideoTexture===!0||N!==js&&N!==Hn&&(Vt.getTransfer(N)===Qt?(k!==an||W!==Ze)&&Pt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Yt("WebGLTextures: Unsupported texture color space:",N)),_}function Jt(b){return typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement?(c.width=b.naturalWidth||b.width,c.height=b.naturalHeight||b.height):typeof VideoFrame<"u"&&b instanceof VideoFrame?(c.width=b.displayWidth,c.height=b.displayHeight):(c.width=b.width,c.height=b.height),c}this.allocateTextureUnit=K,this.resetTextureUnits=V,this.getTextureUnits=U,this.setTextureUnits=H,this.setTexture2D=nt,this.setTexture2DArray=X,this.setTexture3D=j,this.setTextureCube=et,this.rebindTextures=qt,this.setupRenderTarget=ie,this.updateRenderTargetMipmap=Gt,this.updateMultisampleRenderTarget=ke,this.setupDepthRenderbuffer=Bt,this.setupFrameBufferTexture=gt,this.useMultisampledRTT=fe,this.isReversedDepthBuffer=function(){return e.buffers.depth.getReversed()}}function b0(n,t){function e(i,s=Hn){let r;const a=Vt.getTransfer(s);if(i===Ze)return n.UNSIGNED_BYTE;if(i===lo)return n.UNSIGNED_SHORT_4_4_4_4;if(i===co)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Ic)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Uc)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===Dc)return n.BYTE;if(i===Lc)return n.SHORT;if(i===ji)return n.UNSIGNED_SHORT;if(i===oo)return n.INT;if(i===vn)return n.UNSIGNED_INT;if(i===mn)return n.FLOAT;if(i===Mn)return n.HALF_FLOAT;if(i===Nc)return n.ALPHA;if(i===Fc)return n.RGB;if(i===an)return n.RGBA;if(i===Dn)return n.DEPTH_COMPONENT;if(i===jn)return n.DEPTH_STENCIL;if(i===Oc)return n.RED;if(i===ho)return n.RED_INTEGER;if(i===si)return n.RG;if(i===uo)return n.RG_INTEGER;if(i===fo)return n.RGBA_INTEGER;if(i===Ws||i===Xs||i===Ys||i===qs)if(a===Qt)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===Ws)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Xs)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Ys)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===qs)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===Ws)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Xs)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Ys)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===qs)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===xa||i===va||i===Ma||i===Sa)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===xa)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===va)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Ma)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Sa)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===ya||i===ba||i===Ea||i===Ta||i===Aa||i===Js||i===wa)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(i===ya||i===ba)return a===Qt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===Ea)return a===Qt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(i===Ta)return r.COMPRESSED_R11_EAC;if(i===Aa)return r.COMPRESSED_SIGNED_R11_EAC;if(i===Js)return r.COMPRESSED_RG11_EAC;if(i===wa)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===Ra||i===Ca||i===Pa||i===Da||i===La||i===Ia||i===Ua||i===Na||i===Fa||i===Oa||i===Ba||i===ka||i===za||i===Ha)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(i===Ra)return a===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Ca)return a===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Pa)return a===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Da)return a===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===La)return a===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Ia)return a===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Ua)return a===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Na)return a===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Fa)return a===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Oa)return a===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Ba)return a===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===ka)return a===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===za)return a===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Ha)return a===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Ga||i===Va||i===Wa)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(i===Ga)return a===Qt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Va)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Wa)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Xa||i===Ya||i===Qs||i===qa)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(i===Xa)return r.COMPRESSED_RED_RGTC1_EXT;if(i===Ya)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Qs)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===qa)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===ts?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:e}}const E0=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,T0=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class A0{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){const i=new Yc(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,i=new Sn({vertexShader:E0,fragmentShader:T0,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Fe(new cs(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class w0 extends Wn{constructor(t,e){super();const i=this;let s=null,r=1,a=null,o="local-floor",l=1,c=null,u=null,d=null,h=null,m=null,g=null;const v=typeof XRWebGLBinding<"u",p=new A0,f={},E=e.getContextAttributes();let A=null,S=null;const y=[],T=[],R=new Ct;let x=null,w=null;const I=new qe;I.viewport=new he;const F=new qe;F.viewport=new he;const z=[I,F],V=new Dd;let U=null,H=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Y){let Q=y[Y];return Q===void 0&&(Q=new Rr,y[Y]=Q),Q.getTargetRaySpace()},this.getControllerGrip=function(Y){let Q=y[Y];return Q===void 0&&(Q=new Rr,y[Y]=Q),Q.getGripSpace()},this.getHand=function(Y){let Q=y[Y];return Q===void 0&&(Q=new Rr,y[Y]=Q),Q.getHandSpace()};function K(Y){const Q=T.indexOf(Y.inputSource);if(Q===-1)return;const xt=y[Q];xt!==void 0&&(xt.update(Y.inputSource,Y.frame,c||a),xt.dispatchEvent({type:Y.type,data:Y.inputSource}))}function Z(){s.removeEventListener("select",K),s.removeEventListener("selectstart",K),s.removeEventListener("selectend",K),s.removeEventListener("squeeze",K),s.removeEventListener("squeezestart",K),s.removeEventListener("squeezeend",K),s.removeEventListener("end",Z),s.removeEventListener("inputsourceschange",nt);for(let Y=0;Y<y.length;Y++){const Q=T[Y];Q!==null&&(T[Y]=null,y[Y].disconnect(Q))}U=null,H=null,p.reset();for(const Y in f)delete f[Y];if(t.setRenderTarget(A),m=null,h=null,d=null,s=null,S=null,Zt.stop(),i.isPresenting=!1,t.setPixelRatio(x),t.setSize(R.width,R.height,!1),w!==null){const Y=w.camera;Y.fov=w.fov,Y.zoom=w.zoom,Y.updateProjectionMatrix(),w=null}i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Y){r=Y,i.isPresenting===!0&&Pt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Y){o=Y,i.isPresenting===!0&&Pt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(Y){c=Y},this.getBaseLayer=function(){return h!==null?h:m},this.getBinding=function(){return d===null&&v&&(d=new XRWebGLBinding(s,e)),d},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(Y){if(s=Y,s!==null){if(A=t.getRenderTarget(),s.addEventListener("select",K),s.addEventListener("selectstart",K),s.addEventListener("selectend",K),s.addEventListener("squeeze",K),s.addEventListener("squeezestart",K),s.addEventListener("squeezeend",K),s.addEventListener("end",Z),s.addEventListener("inputsourceschange",nt),E.xrCompatible!==!0&&await e.makeXRCompatible(),x=t.getPixelRatio(),t.getSize(R),v&&"createProjectionLayer"in XRWebGLBinding.prototype){let xt=null,Dt=null,gt=null;E.depth&&(gt=E.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,xt=E.stencil?jn:Dn,Dt=E.stencil?ts:vn);const Ot={colorFormat:e.RGBA8,depthFormat:gt,scaleFactor:r};d=this.getBinding(),h=d.createProjectionLayer(Ot),s.updateRenderState({layers:[h]}),t.setPixelRatio(1),t.setSize(h.textureWidth,h.textureHeight,!1),S=new on(h.textureWidth,h.textureHeight,{format:an,type:Ze,depthTexture:new ns(h.textureWidth,h.textureHeight,Dt,void 0,void 0,void 0,void 0,void 0,void 0,xt),stencilBuffer:E.stencil,colorSpace:t.outputColorSpace,samples:E.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1,storeMultisampledDepthBuffer:h.ignoreDepthValues===!1,storeMultisampledStencilBuffer:h.ignoreDepthValues===!1})}else{const xt={antialias:E.antialias,alpha:!0,depth:E.depth,stencil:E.stencil,framebufferScaleFactor:r};m=new XRWebGLLayer(s,e,xt),s.updateRenderState({baseLayer:m}),t.setPixelRatio(1),t.setSize(m.framebufferWidth,m.framebufferHeight,!1),S=new on(m.framebufferWidth,m.framebufferHeight,{format:an,type:Ze,colorSpace:t.outputColorSpace,stencilBuffer:E.stencil,resolveDepthBuffer:m.ignoreDepthValues===!1,resolveStencilBuffer:m.ignoreDepthValues===!1,storeMultisampledDepthBuffer:m.ignoreDepthValues===!1,storeMultisampledStencilBuffer:m.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),Zt.setContext(s),Zt.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return p.getDepthTexture()};function nt(Y){for(let Q=0;Q<Y.removed.length;Q++){const xt=Y.removed[Q],Dt=T.indexOf(xt);Dt>=0&&(T[Dt]=null,y[Dt].disconnect(xt))}for(let Q=0;Q<Y.added.length;Q++){const xt=Y.added[Q];let Dt=T.indexOf(xt);if(Dt===-1){for(let Ot=0;Ot<y.length;Ot++)if(Ot>=T.length){T.push(xt),Dt=Ot;break}else if(T[Ot]===null){T[Ot]=xt,Dt=Ot;break}if(Dt===-1)break}const gt=y[Dt];gt&&gt.connect(xt)}}const X=new D,j=new D;function et(Y,Q,xt){X.setFromMatrixPosition(Q.matrixWorld),j.setFromMatrixPosition(xt.matrixWorld);const Dt=X.distanceTo(j),gt=Q.projectionMatrix.elements,Ot=xt.projectionMatrix.elements,ge=gt[14]/(gt[10]-1),Bt=gt[14]/(gt[10]+1),qt=(gt[9]+1)/gt[5],ie=(gt[9]-1)/gt[5],Gt=(gt[8]-1)/gt[0],le=(Ot[8]+1)/Ot[0],Se=ge*Gt,ke=ge*le,ce=Dt/(-Gt+le),fe=ce*-Gt;if(Q.matrixWorld.decompose(Y.position,Y.quaternion,Y.scale),Y.translateX(fe),Y.translateZ(ce),Y.matrixWorld.compose(Y.position,Y.quaternion,Y.scale),Y.matrixWorldInverse.copy(Y.matrixWorld).invert(),gt[10]===-1)Y.projectionMatrix.copy(Q.projectionMatrix),Y.projectionMatrixInverse.copy(Q.projectionMatrixInverse);else{const L=ge+ce,we=Bt+ce,Jt=Se-fe,b=ke+(Dt-fe),_=qt*Bt/we*L,N=ie*Bt/we*L;Y.projectionMatrix.makePerspective(Jt,b,_,N,L,we),Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert()}}function wt(Y,Q){Q===null?Y.matrixWorld.copy(Y.matrix):Y.matrixWorld.multiplyMatrices(Q.matrixWorld,Y.matrix),Y.matrixWorldInverse.copy(Y.matrixWorld).invert()}this.updateCamera=function(Y){if(s===null)return;let Q=Y.near,xt=Y.far;p.texture!==null&&(p.depthNear>0&&(Q=p.depthNear),p.depthFar>0&&(xt=p.depthFar)),V.near=F.near=I.near=Q,V.far=F.far=I.far=xt,(U!==V.near||H!==V.far)&&(s.updateRenderState({depthNear:V.near,depthFar:V.far}),U=V.near,H=V.far),V.layers.mask=Y.layers.mask|6,I.layers.mask=V.layers.mask&-5,F.layers.mask=V.layers.mask&-3;const Dt=Y.parent,gt=V.cameras;wt(V,Dt);for(let Ot=0;Ot<gt.length;Ot++)wt(gt[Ot],Dt);gt.length===2?et(V,I,F):V.projectionMatrix.copy(I.projectionMatrix),w===null&&Y.isPerspectiveCamera&&(w={camera:Y,fov:Y.fov,zoom:Y.zoom}),Tt(Y,V,Dt)};function Tt(Y,Q,xt){xt===null?Y.matrix.copy(Q.matrixWorld):(Y.matrix.copy(xt.matrixWorld),Y.matrix.invert(),Y.matrix.multiply(Q.matrixWorld)),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.updateMatrixWorld(!0),Y.projectionMatrix.copy(Q.projectionMatrix),Y.projectionMatrixInverse.copy(Q.projectionMatrixInverse),Y.isPerspectiveCamera&&(Y.fov=Ka*2*Math.atan(1/Y.projectionMatrix.elements[5]),Y.zoom=1)}this.getCamera=function(){return V},this.getFoveation=function(){if(!(h===null&&m===null))return l},this.setFoveation=function(Y){l=Y,h!==null&&(h.fixedFoveation=Y),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=Y)},this.hasDepthSensing=function(){return p.texture!==null},this.getDepthSensingMesh=function(){return p.getMesh(V)},this.getCameraTexture=function(Y){return f[Y]};let ne=null;function Wt(Y,Q){if(u=Q.getViewerPose(c||a),g=Q,u!==null){const xt=u.views;m!==null&&(t.setRenderTargetFramebuffer(S,m.framebuffer),t.setRenderTarget(S));let Dt=!1;xt.length!==V.cameras.length&&(V.cameras.length=0,Dt=!0);for(let Bt=0;Bt<xt.length;Bt++){const qt=xt[Bt];let ie=null;if(m!==null)ie=m.getViewport(qt);else{const le=d.getViewSubImage(h,qt);ie=le.viewport,Bt===0&&(t.setRenderTargetTextures(S,le.colorTexture,le.depthStencilTexture),t.setRenderTarget(S))}let Gt=z[Bt];Gt===void 0&&(Gt=new qe,Gt.layers.enable(Bt),Gt.viewport=new he,z[Bt]=Gt),Gt.matrix.fromArray(qt.transform.matrix),Gt.matrix.decompose(Gt.position,Gt.quaternion,Gt.scale),Gt.projectionMatrix.fromArray(qt.projectionMatrix),Gt.projectionMatrixInverse.copy(Gt.projectionMatrix).invert(),Gt.viewport.set(ie.x,ie.y,ie.width,ie.height),Bt===0&&(V.matrix.copy(Gt.matrix),V.matrix.decompose(V.position,V.quaternion,V.scale)),Dt===!0&&V.cameras.push(Gt)}const gt=s.enabledFeatures;if(gt&&gt.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&v){d=i.getBinding();const Bt=d.getDepthInformation(xt[0]);Bt&&Bt.isValid&&Bt.texture&&p.init(Bt,s.renderState)}if(gt&&gt.includes("camera-access")&&v){t.state.unbindTexture(),d=i.getBinding();for(let Bt=0;Bt<xt.length;Bt++){const qt=xt[Bt].camera;if(qt){let ie=f[qt];ie||(ie=new Yc,f[qt]=ie);const Gt=d.getCameraImage(qt);ie.sourceTexture=Gt}}}}for(let xt=0;xt<y.length;xt++){const Dt=T[xt],gt=y[xt];Dt!==null&&gt!==void 0&&gt.update(Dt,Q,c||a)}ne&&ne(Y,Q),Q.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:Q}),g=null}const Zt=new th;Zt.setAnimationLoop(Wt),this.setAnimationLoop=function(Y){ne=Y},this.dispose=function(){}}}const R0=new ae,oh=new Lt;oh.set(-1,0,0,0,1,0,0,0,1);function C0(n,t){function e(p,f){p.matrixAutoUpdate===!0&&p.updateMatrix(),f.value.copy(p.matrix)}function i(p,f){f.color.getRGB(p.fogColor.value,Jc(n)),f.isFog?(p.fogNear.value=f.near,p.fogFar.value=f.far):f.isFogExp2&&(p.fogDensity.value=f.density)}function s(p,f,E,A,S){f.isNodeMaterial?f.uniformsNeedUpdate=!1:f.isMeshBasicMaterial?r(p,f):f.isMeshLambertMaterial?(r(p,f),f.envMap&&(p.envMapIntensity.value=f.envMapIntensity)):f.isMeshToonMaterial?(r(p,f),d(p,f)):f.isMeshPhongMaterial?(r(p,f),u(p,f),f.envMap&&(p.envMapIntensity.value=f.envMapIntensity)):f.isMeshStandardMaterial?(r(p,f),h(p,f),f.isMeshPhysicalMaterial&&m(p,f,S)):f.isMeshMatcapMaterial?(r(p,f),g(p,f)):f.isMeshDepthMaterial?r(p,f):f.isMeshDistanceMaterial?(r(p,f),v(p,f)):f.isMeshNormalMaterial?r(p,f):f.isLineBasicMaterial?(a(p,f),f.isLineDashedMaterial&&o(p,f)):f.isPointsMaterial?l(p,f,E,A):f.isSpriteMaterial?c(p,f):f.isShadowMaterial?(p.color.value.copy(f.color),p.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function r(p,f){p.opacity.value=f.opacity,f.color&&p.diffuse.value.copy(f.color),f.emissive&&p.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(p.map.value=f.map,e(f.map,p.mapTransform)),f.alphaMap&&(p.alphaMap.value=f.alphaMap,e(f.alphaMap,p.alphaMapTransform)),f.bumpMap&&(p.bumpMap.value=f.bumpMap,e(f.bumpMap,p.bumpMapTransform),p.bumpScale.value=f.bumpScale,f.side===We&&(p.bumpScale.value*=-1)),f.normalMap&&(p.normalMap.value=f.normalMap,e(f.normalMap,p.normalMapTransform),p.normalScale.value.copy(f.normalScale),f.side===We&&p.normalScale.value.negate()),f.displacementMap&&(p.displacementMap.value=f.displacementMap,e(f.displacementMap,p.displacementMapTransform),p.displacementScale.value=f.displacementScale,p.displacementBias.value=f.displacementBias),f.emissiveMap&&(p.emissiveMap.value=f.emissiveMap,e(f.emissiveMap,p.emissiveMapTransform)),f.specularMap&&(p.specularMap.value=f.specularMap,e(f.specularMap,p.specularMapTransform)),f.alphaTest>0&&(p.alphaTest.value=f.alphaTest);const E=t.get(f),A=E.envMap,S=E.envMapRotation;A&&(p.envMap.value=A,p.envMapRotation.value.setFromMatrix4(R0.makeRotationFromEuler(S)).transpose(),A.isCubeTexture&&A.isRenderTargetTexture===!1&&p.envMapRotation.value.premultiply(oh),p.reflectivity.value=f.reflectivity,p.ior.value=f.ior,p.refractionRatio.value=f.refractionRatio),f.lightMap&&(p.lightMap.value=f.lightMap,p.lightMapIntensity.value=f.lightMapIntensity,e(f.lightMap,p.lightMapTransform)),f.aoMap&&(p.aoMap.value=f.aoMap,p.aoMapIntensity.value=f.aoMapIntensity,e(f.aoMap,p.aoMapTransform))}function a(p,f){p.diffuse.value.copy(f.color),p.opacity.value=f.opacity,f.map&&(p.map.value=f.map,e(f.map,p.mapTransform))}function o(p,f){p.dashSize.value=f.dashSize,p.totalSize.value=f.dashSize+f.gapSize,p.scale.value=f.scale}function l(p,f,E,A){p.diffuse.value.copy(f.color),p.opacity.value=f.opacity,p.size.value=f.size*E,p.scale.value=A*.5,f.map&&(p.map.value=f.map,e(f.map,p.uvTransform)),f.alphaMap&&(p.alphaMap.value=f.alphaMap,e(f.alphaMap,p.alphaMapTransform)),f.alphaTest>0&&(p.alphaTest.value=f.alphaTest)}function c(p,f){p.diffuse.value.copy(f.color),p.opacity.value=f.opacity,p.rotation.value=f.rotation,f.map&&(p.map.value=f.map,e(f.map,p.mapTransform)),f.alphaMap&&(p.alphaMap.value=f.alphaMap,e(f.alphaMap,p.alphaMapTransform)),f.alphaTest>0&&(p.alphaTest.value=f.alphaTest)}function u(p,f){p.specular.value.copy(f.specular),p.shininess.value=Math.max(f.shininess,1e-4)}function d(p,f){f.gradientMap&&(p.gradientMap.value=f.gradientMap)}function h(p,f){p.metalness.value=f.metalness,f.metalnessMap&&(p.metalnessMap.value=f.metalnessMap,e(f.metalnessMap,p.metalnessMapTransform)),p.roughness.value=f.roughness,f.roughnessMap&&(p.roughnessMap.value=f.roughnessMap,e(f.roughnessMap,p.roughnessMapTransform)),f.envMap&&(p.envMapIntensity.value=f.envMapIntensity)}function m(p,f,E){p.ior.value=f.ior,f.sheen>0&&(p.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),p.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(p.sheenColorMap.value=f.sheenColorMap,e(f.sheenColorMap,p.sheenColorMapTransform)),f.sheenRoughnessMap&&(p.sheenRoughnessMap.value=f.sheenRoughnessMap,e(f.sheenRoughnessMap,p.sheenRoughnessMapTransform))),f.clearcoat>0&&(p.clearcoat.value=f.clearcoat,p.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(p.clearcoatMap.value=f.clearcoatMap,e(f.clearcoatMap,p.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,e(f.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(p.clearcoatNormalMap.value=f.clearcoatNormalMap,e(f.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===We&&p.clearcoatNormalScale.value.negate())),f.dispersion>0&&(p.dispersion.value=f.dispersion),f.retroreflectivity>0&&(p.retroreflectivity.value=f.retroreflectivity),f.iridescence>0&&(p.iridescence.value=f.iridescence,p.iridescenceIOR.value=f.iridescenceIOR,p.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(p.iridescenceMap.value=f.iridescenceMap,e(f.iridescenceMap,p.iridescenceMapTransform)),f.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=f.iridescenceThicknessMap,e(f.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),f.transmission>0&&(p.transmission.value=f.transmission,p.transmissionSamplerMap.value=E.texture,p.transmissionSamplerSize.value.set(E.width,E.height),f.transmissionMap&&(p.transmissionMap.value=f.transmissionMap,e(f.transmissionMap,p.transmissionMapTransform)),p.thickness.value=f.thickness,f.thicknessMap&&(p.thicknessMap.value=f.thicknessMap,e(f.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=f.attenuationDistance,p.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(p.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(p.anisotropyMap.value=f.anisotropyMap,e(f.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=f.specularIntensity,p.specularColor.value.copy(f.specularColor),f.specularColorMap&&(p.specularColorMap.value=f.specularColorMap,e(f.specularColorMap,p.specularColorMapTransform)),f.specularIntensityMap&&(p.specularIntensityMap.value=f.specularIntensityMap,e(f.specularIntensityMap,p.specularIntensityMapTransform))}function g(p,f){f.matcap&&(p.matcap.value=f.matcap)}function v(p,f){const E=t.get(f).light;p.referencePosition.value.setFromMatrixPosition(E.matrixWorld),p.nearDistance.value=E.shadow.camera.near,p.farDistance.value=E.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function P0(n,t,e,i){let s={},r={},a=[];const o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(S,y){const T=y.program;i.uniformBlockBinding(S,T)}function c(S,y){let T=s[S.id];T===void 0&&(p(S),T=u(S),s[S.id]=T,S.addEventListener("dispose",E));const R=y.program;i.updateUBOMapping(S,R);const x=t.render.frame;r[S.id]!==x&&(h(S),r[S.id]=x)}function u(S){const y=d();S.__bindingPointIndex=y;const T=n.createBuffer(),R=S.__size,x=S.usage;return n.bindBuffer(n.UNIFORM_BUFFER,T),n.bufferData(n.UNIFORM_BUFFER,R,x),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,y,T),T}function d(){for(let S=0;S<o;S++)if(a.indexOf(S)===-1)return a.push(S),S;return Yt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(S){const y=s[S.id],T=S.uniforms,R=S.__cache;n.bindBuffer(n.UNIFORM_BUFFER,y);for(let x=0,w=T.length;x<w;x++){const I=T[x];if(Array.isArray(I))for(let F=0,z=I.length;F<z;F++)m(I[F],x,F,R);else m(I,x,0,R)}n.bindBuffer(n.UNIFORM_BUFFER,null)}function m(S,y,T,R){if(v(S,y,T,R)===!0){const x=S.__offset,w=S.value;if(Array.isArray(w)){let I=0;for(let F=0;F<w.length;F++){const z=w[F],V=f(z);g(z,S.__data,I),typeof z!="number"&&typeof z!="boolean"&&!z.isMatrix3&&!ArrayBuffer.isView(z)&&(I+=V.storage/Float32Array.BYTES_PER_ELEMENT)}}else g(w,S.__data,0);n.bufferSubData(n.UNIFORM_BUFFER,x,S.__data)}}function g(S,y,T){typeof S=="number"||typeof S=="boolean"?y[0]=S:S.isMatrix3?(y[0]=S.elements[0],y[1]=S.elements[1],y[2]=S.elements[2],y[3]=0,y[4]=S.elements[3],y[5]=S.elements[4],y[6]=S.elements[5],y[7]=0,y[8]=S.elements[6],y[9]=S.elements[7],y[10]=S.elements[8],y[11]=0):ArrayBuffer.isView(S)?y.set(new S.constructor(S.buffer,S.byteOffset,y.length)):S.toArray(y,T)}function v(S,y,T,R){const x=S.value,w=y+"_"+T;if(R[w]===void 0)return typeof x=="number"||typeof x=="boolean"?R[w]=x:ArrayBuffer.isView(x)?R[w]=x.slice():R[w]=x.clone(),!0;{const I=R[w];if(typeof x=="number"||typeof x=="boolean"){if(I!==x)return R[w]=x,!0}else{if(ArrayBuffer.isView(x))return!0;if(I.equals(x)===!1)return I.copy(x),!0}}return!1}function p(S){const y=S.uniforms;let T=0;const R=16;for(let w=0,I=y.length;w<I;w++){const F=Array.isArray(y[w])?y[w]:[y[w]];for(let z=0,V=F.length;z<V;z++){const U=F[z],H=Array.isArray(U.value)?U.value:[U.value];for(let K=0,Z=H.length;K<Z;K++){const nt=H[K],X=f(nt),j=T%R,et=j%X.boundary,wt=j+et;T+=et,wt!==0&&R-wt<X.storage&&(T+=R-wt),U.__data=new Float32Array(X.storage/Float32Array.BYTES_PER_ELEMENT),U.__offset=T,T+=X.storage}}}const x=T%R;return x>0&&(T+=R-x),S.__size=T,S.__cache={},this}function f(S){const y={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(y.boundary=4,y.storage=4):S.isVector2?(y.boundary=8,y.storage=8):S.isVector3||S.isColor?(y.boundary=16,y.storage=12):S.isVector4?(y.boundary=16,y.storage=16):S.isMatrix3?(y.boundary=48,y.storage=48):S.isMatrix4?(y.boundary=64,y.storage=64):S.isTexture?Pt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(S)?(y.boundary=16,y.storage=S.byteLength):Pt("WebGLRenderer: Unsupported uniform value type.",S),y}function E(S){const y=S.target;y.removeEventListener("dispose",E);const T=a.indexOf(y.__bindingPointIndex);a.splice(T,1),n.deleteBuffer(s[y.id]),delete s[y.id],delete r[y.id]}function A(){for(const S in s)n.deleteBuffer(s[S]);a=[],s={},r={}}return{bind:l,update:c,dispose:A}}const D0=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let un=null;function L0(){return un===null&&(un=new Zu(D0,16,16,si,Mn),un.name="DFG_LUT",un.minFilter=De,un.magFilter=De,un.wrapS=wn,un.wrapT=wn,un.generateMipmaps=!1,un.needsUpdate=!0),un}class I0{constructor(t={}){const{canvas:e=yu(),context:i=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:h=!1,outputBufferType:m=Ze}=t;this.isWebGLRenderer=!0;let g;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=i.getContextAttributes().alpha}else g=a;const v=m,p=new Set([fo,uo,ho]),f=new Set([Ze,vn,ji,ts,lo,co]),E=new Uint32Array(4),A=new Int32Array(4),S=new D;let y=null,T=null;const R=[],x=[];let w=null;this.domElement=e,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=xn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const I=this;let F=!1,z=null,V=null,U=null,H=null;this._outputColorSpace=Ge;let K=0,Z=0,nt=null,X=-1,j=null;const et=new he,wt=new he;let Tt=null;const ne=new Ft(0);let Wt=0,Zt=e.width,Y=e.height,Q=1,xt=null,Dt=null;const gt=new he(0,0,Zt,Y),Ot=new he(0,0,Zt,Y);let ge=!1;const Bt=new xo;let qt=!1,ie=!1;const Gt=new ae,le=new D,Se=new he,ke={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let ce=!1;function fe(){return nt===null?Q:1}let L=i;function we(M,C){return e.getContext(M,C)}let Jt,b,_,N,k,W,st,rt,q,J,at,bt,ht,ot,Et,Rt,It,P,lt,$,ct,pt,tt;try{const M={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${ro}`),e.addEventListener("webglcontextlost",se,!1),e.addEventListener("webglcontextrestored",Kt,!1),e.addEventListener("webglcontextcreationerror",je,!1),L===null){const C="webgl2";if(L=we(C,M),L===null)throw we(C)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}At()}catch(M){throw e.removeEventListener("webglcontextlost",se,!1),e.removeEventListener("webglcontextrestored",Kt,!1),e.removeEventListener("webglcontextcreationerror",je,!1),Yt("WebGLRenderer: "+M.message),M}function At(){Jt=new Lm(L),Jt.init(),ct=new b0(L,Jt),b=new ym(L,Jt,t,ct),_=new S0(L,Jt),b.reversedDepthBuffer&&h&&_.buffers.depth.setReversed(!0),V=L.createFramebuffer(),U=L.createFramebuffer(),H=L.createFramebuffer(),N=new Nm(L),k=new o0,W=new y0(L,Jt,_,k,b,ct,N),st=new Dm(I),rt=new Fd(L),pt=new Mm(L,rt),q=new Im(L,rt,N,pt),J=new Om(L,q,rt,pt,N),P=new Fm(L,b,W),Et=new bm(k),at=new a0(I,st,Jt,b,pt,Et),bt=new C0(I,k),ht=new c0,ot=new m0(Jt),It=new vm(I,st,_,J,g,l),Rt=new M0(I,J,b),tt=new P0(L,N,b,_),lt=new Sm(L,Jt,N),$=new Um(L,Jt,N),N.programs=at.programs,I.capabilities=b,I.extensions=Jt,I.properties=k,I.renderLists=ht,I.shadowMap=Rt,I.state=_,I.info=N}v!==Ze&&(w=new km(v,e.width,e.height,o,s,r));const St=new w0(I,L);this.xr=St,this.getContext=function(){return L},this.getContextAttributes=function(){return L.getContextAttributes()},this.forceContextLoss=function(){const M=Jt.get("WEBGL_lose_context");M&&M.loseContext()},this.forceContextRestore=function(){const M=Jt.get("WEBGL_lose_context");M&&M.restoreContext()},this.getPixelRatio=function(){return Q},this.setPixelRatio=function(M){M!==void 0&&(Q=M,this.setSize(Zt,Y,!1))},this.getSize=function(M){return M.set(Zt,Y)},this.setSize=function(M,C,G=!0){if(St.isPresenting){Pt("WebGLRenderer: Can't change size while VR device is presenting.");return}Zt=M,Y=C,e.width=Math.floor(M*Q),e.height=Math.floor(C*Q),G===!0&&(e.style.width=M+"px",e.style.height=C+"px"),w!==null&&w.setSize(e.width,e.height),this.setViewport(0,0,M,C)},this.getDrawingBufferSize=function(M){return M.set(Zt*Q,Y*Q).floor()},this.setDrawingBufferSize=function(M,C,G){Zt=M,Y=C,Q=G,e.width=Math.floor(M*G),e.height=Math.floor(C*G),this.setViewport(0,0,M,C)},this.setEffects=function(M){if(v===Ze){Yt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(M){for(let C=0;C<M.length;C++)if(M[C].isOutputPass===!0){Pt("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}w.setEffects(M||[])},this.getCurrentViewport=function(M){return M.copy(et)},this.getViewport=function(M){return M.copy(gt)},this.setViewport=function(M,C,G,O){M.isVector4?gt.set(M.x,M.y,M.z,M.w):gt.set(M,C,G,O),_.viewport(et.copy(gt).multiplyScalar(Q).round())},this.getScissor=function(M){return M.copy(Ot)},this.setScissor=function(M,C,G,O){M.isVector4?Ot.set(M.x,M.y,M.z,M.w):Ot.set(M,C,G,O),_.scissor(wt.copy(Ot).multiplyScalar(Q).round())},this.getScissorTest=function(){return ge},this.setScissorTest=function(M){_.setScissorTest(ge=M)},this.setOpaqueSort=function(M){xt=M},this.setTransparentSort=function(M){Dt=M},this.getClearColor=function(M){return M.copy(It.getClearColor())},this.setClearColor=function(){It.setClearColor(...arguments)},this.getClearAlpha=function(){return It.getClearAlpha()},this.setClearAlpha=function(){It.setClearAlpha(...arguments)},this.clear=function(M=!0,C=!0,G=!0){let O=0;if(M){let B=!1;if(nt!==null){const ft=nt.texture.format;B=p.has(ft)}if(B){const ft=nt.texture.type,_t=f.has(ft),dt=It.getClearColor(),vt=It.getClearAlpha(),yt=dt.r,Ut=dt.g,kt=dt.b;_t?(E[0]=yt,E[1]=Ut,E[2]=kt,E[3]=vt,L.clearBufferuiv(L.COLOR,0,E)):(A[0]=yt,A[1]=Ut,A[2]=kt,A[3]=vt,L.clearBufferiv(L.COLOR,0,A))}else O|=L.COLOR_BUFFER_BIT}C&&(O|=L.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),G&&(O|=L.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),O!==0&&L.clear(O)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(M){M.setRenderer(this),z=M},this.dispose=function(){e.removeEventListener("webglcontextlost",se,!1),e.removeEventListener("webglcontextrestored",Kt,!1),e.removeEventListener("webglcontextcreationerror",je,!1),It.dispose(),ht.dispose(),ot.dispose(),k.dispose(),st.dispose(),J.dispose(),pt.dispose(),tt.dispose(),at.dispose(),St.dispose(),St.removeEventListener("sessionstart",Do),St.removeEventListener("sessionend",Lo),Xn.stop()};function se(M){M.preventDefault(),$o("WebGLRenderer: Context Lost."),F=!0}function Kt(){$o("WebGLRenderer: Context Restored."),F=!1;const M=N.autoReset,C=Rt.enabled,G=Rt.autoUpdate,O=Rt.needsUpdate,B=Rt.type;At(),N.autoReset=M,Rt.enabled=C,Rt.autoUpdate=G,Rt.needsUpdate=O,Rt.type=B}function je(M){Yt("WebGLRenderer: A WebGL context could not be created. Reason: ",M.statusMessage)}function ln(M){const C=M.target;C.removeEventListener("dispose",ln),gh(C)}function gh(M){_h(M),k.remove(M)}function _h(M){const C=k.get(M).programs;C!==void 0&&(C.forEach(function(G){at.releaseProgram(G)}),M.isShaderMaterial&&at.releaseShaderCache(M))}this.renderBufferDirect=function(M,C,G,O,B,ft){C===null&&(C=ke);const _t=B.isMesh&&B.matrixWorld.determinantAffine()<0,dt=Mh(M,C,G,O,B);_.setMaterial(O,_t);let vt=G.index,yt=1;if(O.wireframe===!0){if(vt=q.getWireframeAttribute(G),vt===void 0)return;yt=2}const Ut=G.drawRange,kt=G.attributes.position;let Mt=Ut.start*yt,$t=(Ut.start+Ut.count)*yt;ft!==null&&(Mt=Math.max(Mt,ft.start*yt),$t=Math.min($t,(ft.start+ft.count)*yt)),vt!==null?(Mt=Math.max(Mt,0),$t=Math.min($t,vt.count)):kt!=null&&(Mt=Math.max(Mt,0),$t=Math.min($t,kt.count));const pe=$t-Mt;if(pe<0||pe===1/0)return;pt.setup(B,O,dt,G,vt);let oe,ee=lt;if(vt!==null&&(oe=rt.get(vt),ee=$,ee.setIndex(oe)),B.isMesh)O.wireframe===!0?(_.setLineWidth(O.wireframeLinewidth*fe()),ee.setMode(L.LINES)):ee.setMode(L.TRIANGLES);else if(B.isLine){let Re=O.linewidth;Re===void 0&&(Re=1),_.setLineWidth(Re*fe()),B.isLineSegments?ee.setMode(L.LINES):B.isLineLoop?ee.setMode(L.LINE_LOOP):ee.setMode(L.LINE_STRIP)}else B.isPoints?ee.setMode(L.POINTS):B.isSprite&&ee.setMode(L.TRIANGLES);if(B.isBatchedMesh)if(Jt.get("WEBGL_multi_draw"))ee.renderMultiDraw(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount);else{const Re=B._multiDrawStarts,mt=B._multiDrawCounts,Le=B._multiDrawCount,Xt=vt?rt.get(vt).bytesPerElement:1,Ke=k.get(O).currentProgram.getUniforms();for(let cn=0;cn<Le;cn++)Ke.setValue(L,"_gl_DrawID",cn),ee.render(Re[cn]/Xt,mt[cn])}else if(B.isInstancedMesh)ee.renderInstances(Mt,pe,B.count);else if(G.isInstancedBufferGeometry){const Re=G._maxInstanceCount!==void 0?G._maxInstanceCount:1/0,mt=Math.min(G.instanceCount,Re);ee.renderInstances(Mt,pe,mt)}else ee.render(Mt,pe)};function Po(M,C,G,O){z!==null&&M.isNodeMaterial&&z.setObject(O,M),qt===!0&&Et.setState(M,G,!1),M.transparent===!0&&M.side===pn&&M.forceSinglePass===!1?(M.side=We,M.needsUpdate=!0,ds(M,C,O),M.side=ni,M.needsUpdate=!0,ds(M,C,O),M.side=pn):ds(M,C,O)}this.compile=function(M,C,G=null){G===null&&(G=M),z!==null&&z.renderStart(M,C,G),T=ot.get(G),T.init(C),x.push(T),G.traverseVisible(function(B){B.isLight&&B.layers.test(C.layers)&&(T.pushLight(B),B.castShadow&&T.pushShadow(B))}),M!==G&&M.traverseVisible(function(B){B.isLight&&B.layers.test(C.layers)&&(T.pushLight(B),B.castShadow&&T.pushShadow(B))}),T.setupLights(),z!==null&&z.updateLights(T.state.lightsArray),ie=this.localClippingEnabled,qt=Et.init(this.clippingPlanes,ie),qt===!0&&Et.setGlobalState(this.clippingPlanes,C),z!==null&&Rt.render(T.state.shadowsArray,G,C);const O=new Set;return M.traverse(function(B){if(!(B.isMesh||B.isPoints||B.isLine||B.isSprite))return;const ft=B.material;if(ft)if(Array.isArray(ft))for(let _t=0;_t<ft.length;_t++){const dt=ft[_t];Po(dt,G,C,B),O.add(dt)}else Po(ft,G,C,B),O.add(ft)}),T=x.pop(),z!==null&&z.renderEnd(),O},this.compileAsync=function(M,C,G=null){const O=this.compile(M,C,G);return new Promise(B=>{function ft(){if(O.forEach(function(_t){const vt=k.get(_t).currentProgram;(vt===void 0||vt.isReady())&&O.delete(_t)}),O.size===0){B(M);return}setTimeout(ft,10)}Jt.get("KHR_parallel_shader_compile")!==null?ft():setTimeout(ft,10)})};let gr=null;function xh(M){gr&&gr(M)}function Do(){Xn.stop()}function Lo(){Xn.start()}const Xn=new th;Xn.setAnimationLoop(xh),typeof self<"u"&&Xn.setContext(self),this.setAnimationLoop=function(M){gr=M,St.setAnimationLoop(M),M===null?Xn.stop():Xn.start()},St.addEventListener("sessionstart",Do),St.addEventListener("sessionend",Lo),this.render=function(M,C){if(C!==void 0&&C.isCamera!==!0){Yt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(F===!0)return;z!==null&&z.renderStart(M,C);const G=St.enabled===!0&&St.isPresenting===!0,O=w!==null&&(nt===null||G)&&w.begin(I,nt);if(M.matrixWorldAutoUpdate===!0&&M.updateMatrixWorld(),C.parent===null&&C.matrixWorldAutoUpdate===!0&&C.updateMatrixWorld(),St.enabled===!0&&St.isPresenting===!0&&(w===null||w.isCompositing()===!1)&&(St.cameraAutoUpdate===!0&&St.updateCamera(C),C=St.getCamera()),M.isScene===!0&&M.onBeforeRender(I,M,C,nt),T=ot.get(M,x.length),T.init(C),T.state.textureUnits=W.getTextureUnits(),x.push(T),Gt.multiplyMatrices(C.projectionMatrix,C.matrixWorldInverse),Bt.setFromProjectionMatrix(Gt,gn,C.reversedDepth),ie=this.localClippingEnabled,qt=Et.init(this.clippingPlanes,ie),y=ht.get(M,R.length),y.init(),R.push(y),St.enabled===!0&&St.isPresenting===!0){const _t=I.xr.getDepthSensingMesh();_t!==null&&_r(_t,C,-1/0,I.sortObjects)}_r(M,C,0,I.sortObjects),y.finish(),z!==null&&z.updateLights(T.state.lightsArray),I.sortObjects===!0&&y.sort(xt,Dt),ce=St.enabled===!1||St.isPresenting===!1||St.hasDepthSensing()===!1,ce&&It.addToRenderList(y,M),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),qt===!0&&Et.beginShadows();const B=T.state.shadowsArray;if(Rt.render(B,M,C),qt===!0&&Et.endShadows(),(O&&w.hasRenderPass())===!1){const _t=y.opaque,dt=y.transmissive;if(T.setupLights(),C.isArrayCamera){const vt=C.cameras;if(dt.length>0)for(let yt=0,Ut=vt.length;yt<Ut;yt++){const kt=vt[yt];Uo(_t,dt,M,kt)}ce&&It.render(M);for(let yt=0,Ut=vt.length;yt<Ut;yt++){const kt=vt[yt];Io(y,M,kt,kt.viewport)}}else dt.length>0&&Uo(_t,dt,M,C),ce&&It.render(M),Io(y,M,C)}nt!==null&&Z===0&&(W.updateMultisampleRenderTarget(nt),W.updateRenderTargetMipmap(nt)),O&&w.end(I),M.isScene===!0&&M.onAfterRender(I,M,C),pt.resetDefaultState(),X=-1,j=null,x.pop(),x.length>0?(T=x[x.length-1],W.setTextureUnits(T.state.textureUnits),qt===!0&&Et.setGlobalState(I.clippingPlanes,T.state.camera)):T=null,R.pop(),R.length>0?y=R[R.length-1]:y=null,z!==null&&z.renderEnd()};function _r(M,C,G,O){if(M.visible===!1)return;if(M.layers.test(C.layers)){if(M.isGroup)G=M.renderOrder;else if(M.isLOD)M.autoUpdate===!0&&M.update(C);else if(M.isLightProbeGrid)T.pushLightProbeGrid(M);else if(M.isLight)T.pushLight(M),M.castShadow&&T.pushShadow(M);else if(M.isSprite){if(!M.frustumCulled||M.intersectsFrustum(Bt)){O&&Se.setFromMatrixPosition(M.matrixWorld).applyMatrix4(Gt);const _t=J.update(M),dt=M.material;dt.visible&&y.push(M,_t,dt,G,Se.z,null,C)}}else if((M.isMesh||M.isLine||M.isPoints)&&(!M.frustumCulled||M.intersectsFrustum(Bt))){const _t=J.update(M),dt=M.material;if(O&&(M.boundingSphere!==void 0?(M.boundingSphere===null&&M.computeBoundingSphere(),Se.copy(M.boundingSphere.center)):(_t.boundingSphere===null&&_t.computeBoundingSphere(),Se.copy(_t.boundingSphere.center)),Se.applyMatrix4(M.matrixWorld).applyMatrix4(Gt)),Array.isArray(dt)){const vt=_t.groups;for(let yt=0,Ut=vt.length;yt<Ut;yt++){const kt=vt[yt],Mt=dt[kt.materialIndex];Mt&&Mt.visible&&y.push(M,_t,Mt,G,Se.z,kt,C)}}else dt.visible&&y.push(M,_t,dt,G,Se.z,null,C)}}const ft=M.children;for(let _t=0,dt=ft.length;_t<dt;_t++)_r(ft[_t],C,G,O)}function Io(M,C,G,O){const{opaque:B,transmissive:ft,transparent:_t}=M;T.setupLightsView(G),qt===!0&&Et.setGlobalState(I.clippingPlanes,G),O&&_.viewport(et.copy(O)),B.length>0&&us(B,C,G),ft.length>0&&us(ft,C,G),_t.length>0&&us(_t,C,G),_.buffers.depth.setTest(!0),_.buffers.depth.setMask(!0),_.buffers.color.setMask(!0),_.setPolygonOffset(!1)}function Uo(M,C,G,O){if((G.isScene===!0?G.overrideMaterial:null)!==null)return;if(T.state.transmissionRenderTarget[O.id]===void 0){const Mt=Jt.has("EXT_color_buffer_half_float")||Jt.has("EXT_color_buffer_float");T.state.transmissionRenderTarget[O.id]=new on(1,1,{generateMipmaps:!0,type:Mt?Mn:Ze,minFilter:Qn,samples:Math.max(4,b.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:Vt.workingColorSpace})}const ft=T.state.transmissionRenderTarget[O.id],_t=O.viewport||et;ft.setSize(_t.z*I.transmissionResolutionScale,_t.w*I.transmissionResolutionScale);const dt=I.getRenderTarget(),vt=I.getActiveCubeFace(),yt=I.getActiveMipmapLevel();I.setRenderTarget(ft),I.getClearColor(ne),Wt=I.getClearAlpha(),Wt<1&&I.setClearColor(16777215,.5),I.clear(),ce&&It.render(G);const Ut=I.toneMapping;I.toneMapping=xn;const kt=O.viewport;if(O.viewport!==void 0&&(O.viewport=void 0),T.setupLightsView(O),qt===!0&&Et.setGlobalState(I.clippingPlanes,O),us(M,G,O),W.updateMultisampleRenderTarget(ft),W.updateRenderTargetMipmap(ft),Jt.has("WEBGL_multisampled_render_to_texture")===!1){let Mt=!1;for(let $t=0,pe=C.length;$t<pe;$t++){const oe=C[$t],{object:ee,geometry:Re,material:mt,group:Le}=oe;if(mt.side===pn&&ee.layers.test(O.layers)){const Xt=mt.side;mt.side=We,mt.needsUpdate=!0,No(ee,G,O,Re,mt,Le),mt.side=Xt,mt.needsUpdate=!0,Mt=!0}}Mt===!0&&(W.updateMultisampleRenderTarget(ft),W.updateRenderTargetMipmap(ft))}I.setRenderTarget(dt,vt,yt),I.setClearColor(ne,Wt),kt!==void 0&&(O.viewport=kt),I.toneMapping=Ut}function us(M,C,G){const O=C.isScene===!0?C.overrideMaterial:null;for(let B=0,ft=M.length;B<ft;B++){const _t=M[B],{object:dt,geometry:vt,group:yt}=_t;let Ut=_t.material;Ut.allowOverride===!0&&O!==null&&(Ut=O),dt.layers.test(G.layers)&&No(dt,C,G,vt,Ut,yt)}}function No(M,C,G,O,B,ft){z!==null&&B.isNodeMaterial&&z.setObject(M,B),M.onBeforeRender(I,C,G,O,B,ft),M.modelViewMatrix.multiplyMatrices(G.matrixWorldInverse,M.matrixWorld),M.normalMatrix.getNormalMatrix(M.modelViewMatrix),B.onBeforeRender(I,C,G,O,M,ft),B.transparent===!0&&B.side===pn&&B.forceSinglePass===!1?(B.side=We,B.needsUpdate=!0,I.renderBufferDirect(G,C,O,B,M,ft),B.side=ni,B.needsUpdate=!0,I.renderBufferDirect(G,C,O,B,M,ft),B.side=pn):I.renderBufferDirect(G,C,O,B,M,ft),M.onAfterRender(I,C,G,O,B,ft)}function ds(M,C,G){C.isScene!==!0&&(C=ke);const O=k.get(M),B=T.state.lights,ft=T.state.shadowsArray,_t=B.state.version,dt=at.getParameters(M,B.state,ft,C,G,T.state.lightProbeGridArray),vt=at.getProgramCacheKey(dt);let yt=O.programs;O.environment=M.isMeshStandardMaterial||M.isMeshLambertMaterial||M.isMeshPhongMaterial?C.environment:null,O.fog=C.fog;const Ut=M.isMeshStandardMaterial||M.isMeshLambertMaterial&&!M.envMap||M.isMeshPhongMaterial&&!M.envMap;O.envMap=st.get(M.envMap||O.environment,Ut),O.envMapRotation=O.environment!==null&&M.envMap===null?C.environmentRotation:M.envMapRotation,yt===void 0&&(M.addEventListener("dispose",ln),yt=new Map,O.programs=yt);let kt=yt.get(vt);if(kt!==void 0){if(O.currentProgram===kt&&O.lightsStateVersion===_t)return Oo(M,dt),kt}else dt.uniforms=at.getUniforms(M),z!==null&&M.isNodeMaterial&&z.build(M,G,dt),M.onBeforeCompile(dt,I),kt=at.acquireProgram(dt,vt),yt.set(vt,kt),O.uniforms=dt.uniforms;const Mt=O.uniforms;return(!M.isShaderMaterial&&!M.isRawShaderMaterial||M.clipping===!0)&&(Mt.clippingPlanes=Et.uniform),Oo(M,dt),O.needsLights=yh(M),O.lightsStateVersion=_t,O.needsLights&&(Mt.ambientLightColor.value=B.state.ambient,Mt.lightProbe.value=B.state.probe,Mt.sunLights.value=B.state.sun,Mt.sunLightShadows.value=B.state.sunShadow,Mt.directionalLights.value=B.state.directional,Mt.directionalLightShadows.value=B.state.directionalShadow,Mt.spotLights.value=B.state.spot,Mt.spotLightShadows.value=B.state.spotShadow,Mt.rectAreaLights.value=B.state.rectArea,Mt.ltc_1.value=B.state.rectAreaLTC1,Mt.ltc_2.value=B.state.rectAreaLTC2,Mt.pointLights.value=B.state.point,Mt.pointLightShadows.value=B.state.pointShadow,Mt.hemisphereLights.value=B.state.hemi,Mt.sunShadowMatrix.value=B.state.sunShadowMatrix,Mt.sunShadowCascade.value=B.state.sunShadowCascade,Mt.directionalShadowMatrix.value=B.state.directionalShadowMatrix,Mt.spotLightMatrix.value=B.state.spotLightMatrix,Mt.spotLightMap.value=B.state.spotLightMap,Mt.pointShadowMatrix.value=B.state.pointShadowMatrix),O.lightProbeGrid=T.state.lightProbeGridArray.length>0,O.currentProgram=kt,O.uniformsList=null,kt}function Fo(M){if(M.uniformsList===null){const C=M.currentProgram.getUniforms();M.uniformsList=Ks.seqWithValue(C.seq,M.uniforms)}return M.uniformsList}function Oo(M,C){const G=k.get(M);G.outputColorSpace=C.outputColorSpace,G.batching=C.batching,G.batchingColor=C.batchingColor,G.instancing=C.instancing,G.instancingColor=C.instancingColor,G.instancingMorph=C.instancingMorph,G.skinning=C.skinning,G.morphTargets=C.morphTargets,G.morphNormals=C.morphNormals,G.morphColors=C.morphColors,G.morphTargetsCount=C.morphTargetsCount,G.numClippingPlanes=C.numClippingPlanes,G.numIntersection=C.numClipIntersection,G.vertexAlphas=C.vertexAlphas,G.vertexTangents=C.vertexTangents,G.toneMapping=C.toneMapping}function vh(M,C){if(M.length===0)return null;if(M.length===1)return M[0].texture!==null?M[0]:null;S.setFromMatrixPosition(C.matrixWorld);for(let G=0,O=M.length;G<O;G++){const B=M[G];if(B.texture!==null&&B.boundingBox.containsPoint(S))return B}return null}function Mh(M,C,G,O,B){C.isScene!==!0&&(C=ke),W.resetTextureUnits();const ft=C.fog,_t=O.isMeshStandardMaterial||O.isMeshLambertMaterial||O.isMeshPhongMaterial?C.environment:null,dt=nt===null?I.outputColorSpace:nt.isXRRenderTarget===!0?nt.texture.colorSpace:Vt.workingColorSpace,vt=O.isMeshStandardMaterial||O.isMeshLambertMaterial&&!O.envMap||O.isMeshPhongMaterial&&!O.envMap,yt=st.get(O.envMap||_t,vt),Ut=O.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,kt=!!G.attributes.tangent&&(!!O.normalMap||O.anisotropy>0),Mt=!!G.morphAttributes.position,$t=!!G.morphAttributes.normal,pe=!!G.morphAttributes.color;let oe=xn;O.toneMapped&&(nt===null||nt.isXRRenderTarget===!0)&&(oe=I.toneMapping);const ee=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,Re=ee!==void 0?ee.length:0,mt=k.get(O),Le=T.state.lights;if(qt===!0&&(ie===!0||M!==j)){const re=M===j&&O.id===X;Et.setState(O,M,re)}let Xt=!1;O.version===mt.__version?(mt.needsLights&&mt.lightsStateVersion!==Le.state.version||mt.outputColorSpace!==dt||B.isBatchedMesh&&mt.batching===!1||!B.isBatchedMesh&&mt.batching===!0||B.isBatchedMesh&&mt.batchingColor===!0&&B._colorsTexture===null||B.isBatchedMesh&&mt.batchingColor===!1&&B._colorsTexture!==null||B.isInstancedMesh&&mt.instancing===!1||!B.isInstancedMesh&&mt.instancing===!0||B.isSkinnedMesh&&mt.skinning===!1||!B.isSkinnedMesh&&mt.skinning===!0||B.isInstancedMesh&&mt.instancingColor===!0&&B.instanceColor===null||B.isInstancedMesh&&mt.instancingColor===!1&&B.instanceColor!==null||B.isInstancedMesh&&mt.instancingMorph===!0&&B.morphTexture===null||B.isInstancedMesh&&mt.instancingMorph===!1&&B.morphTexture!==null||mt.envMap!==yt||O.fog===!0&&mt.fog!==ft||mt.numClippingPlanes!==void 0&&(mt.numClippingPlanes!==Et.numPlanes||mt.numIntersection!==Et.numIntersection)||mt.vertexAlphas!==Ut||mt.vertexTangents!==kt||mt.morphTargets!==Mt||mt.morphNormals!==$t||mt.morphColors!==pe||mt.toneMapping!==oe||mt.morphTargetsCount!==Re||!!mt.lightProbeGrid!=T.state.lightProbeGridArray.length>0)&&(Xt=!0):(Xt=!0,mt.__version=O.version);let Ke=mt.currentProgram;Xt===!0&&(Ke=ds(O,C,B),z&&O.isNodeMaterial&&z.onUpdateProgram(O,Ke,mt));let cn=!1,Ln=!1,ai=!1;const te=Ke.getUniforms(),de=mt.uniforms;if(_.useProgram(Ke.program)&&(cn=!0,Ln=!0,ai=!0),O.id!==X&&(X=O.id,Ln=!0),mt.needsLights){const re=vh(T.state.lightProbeGridArray,B);mt.lightProbeGrid!==re&&(mt.lightProbeGrid=re,Ln=!0)}if(cn||j!==M){_.buffers.depth.getReversed()&&M.reversedDepth!==!0&&(M._reversedDepth=!0,M.updateProjectionMatrix()),te.setValue(L,"projectionMatrix",M.projectionMatrix),te.setValue(L,"viewMatrix",M.matrixWorldInverse);const Un=te.map.cameraPosition;Un!==void 0&&Un.setValue(L,le.setFromMatrixPosition(M.matrixWorld)),b.logarithmicDepthBuffer&&te.setValue(L,"logDepthBufFC",2/(Math.log(M.far+1)/Math.LN2)),(O.isMeshPhongMaterial||O.isMeshToonMaterial||O.isMeshLambertMaterial||O.isMeshBasicMaterial||O.isMeshStandardMaterial||O.isShaderMaterial)&&te.setValue(L,"isOrthographic",M.isOrthographicCamera===!0),j!==M&&(j=M,Ln=!0,ai=!0)}if(mt.needsLights&&(Le.state.sunShadowMap.length>0&&te.setValue(L,"sunShadowMap",Le.state.sunShadowMap,W),Le.state.directionalShadowMap.length>0&&te.setValue(L,"directionalShadowMap",Le.state.directionalShadowMap,W),Le.state.spotShadowMap.length>0&&te.setValue(L,"spotShadowMap",Le.state.spotShadowMap,W),Le.state.pointShadowMap.length>0&&te.setValue(L,"pointShadowMap",Le.state.pointShadowMap,W)),B.isSkinnedMesh){te.setOptional(L,B,"bindMatrix"),te.setOptional(L,B,"bindMatrixInverse");const re=B.skeleton;re&&(re.boneTexture===null&&re.computeBoneTexture(),te.setValue(L,"boneTexture",re.boneTexture,W))}B.isBatchedMesh&&(te.setOptional(L,B,"batchingTexture"),te.setValue(L,"batchingTexture",B._matricesTexture,W),te.setOptional(L,B,"batchingIdTexture"),te.setValue(L,"batchingIdTexture",B._indirectTexture,W),te.setOptional(L,B,"batchingColorTexture"),B._colorsTexture!==null&&te.setValue(L,"batchingColorTexture",B._colorsTexture,W));const In=G.morphAttributes;if((In.position!==void 0||In.normal!==void 0||In.color!==void 0)&&P.update(B,G,Ke),(Ln||mt.receiveShadow!==B.receiveShadow)&&(mt.receiveShadow=B.receiveShadow,te.setValue(L,"receiveShadow",B.receiveShadow)),(O.isMeshStandardMaterial||O.isMeshLambertMaterial||O.isMeshPhongMaterial)&&O.envMap===null&&C.environment!==null&&(de.envMapIntensity.value=C.environmentIntensity),de.dfgLUT!==void 0&&(de.dfgLUT.value=L0()),Ln){if(te.setValue(L,"toneMappingExposure",I.toneMappingExposure),mt.needsLights&&Sh(de,ai),ft&&O.fog===!0&&bt.refreshFogUniforms(de,ft),bt.refreshMaterialUniforms(de,O,Q,Y,T.state.transmissionRenderTarget[M.id]),mt.needsLights&&mt.lightProbeGrid){const re=mt.lightProbeGrid;de.probesSH.value=re.texture,de.probesMin.value.copy(re.boundingBox.min),de.probesMax.value.copy(re.boundingBox.max),de.probesResolution.value.copy(re.resolution)}Ks.upload(L,Fo(mt),de,W)}if(O.isShaderMaterial&&O.uniformsNeedUpdate===!0&&(Ks.upload(L,Fo(mt),de,W),O.uniformsNeedUpdate=!1),O.isSpriteMaterial&&te.setValue(L,"center",B.center),te.setValue(L,"modelViewMatrix",B.modelViewMatrix),te.setValue(L,"normalMatrix",B.normalMatrix),te.setValue(L,"modelMatrix",B.matrixWorld),O.uniformsGroups!==void 0){const re=O.uniformsGroups;for(let Un=0,oi=re.length;Un<oi;Un++){const ko=re[Un];tt.update(ko,Ke),tt.bind(ko,Ke)}}return Ke}function Sh(M,C){M.ambientLightColor.needsUpdate=C,M.lightProbe.needsUpdate=C,M.sunLights.needsUpdate=C,M.sunLightShadows.needsUpdate=C,M.directionalLights.needsUpdate=C,M.directionalLightShadows.needsUpdate=C,M.pointLights.needsUpdate=C,M.pointLightShadows.needsUpdate=C,M.spotLights.needsUpdate=C,M.spotLightShadows.needsUpdate=C,M.rectAreaLights.needsUpdate=C,M.hemisphereLights.needsUpdate=C}function yh(M){return M.isMeshLambertMaterial||M.isMeshToonMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isShadowMaterial||M.isShaderMaterial&&M.lights===!0}this.getActiveCubeFace=function(){return K},this.getActiveMipmapLevel=function(){return Z},this.getRenderTarget=function(){return nt},this.setRenderTargetTextures=function(M,C,G){const O=k.get(M);O.__autoAllocateDepthBuffer=M.resolveDepthBuffer===!1,O.__autoAllocateDepthBuffer===!1&&(O.__useRenderToTexture=!1),k.get(M.texture).__webglTexture=C,k.get(M.depthTexture).__webglTexture=O.__autoAllocateDepthBuffer?void 0:G,O.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(M,C){const G=k.get(M);G.__webglFramebuffer=C,G.__useDefaultFramebuffer=C===void 0},this.setRenderTarget=function(M,C=0,G=0){nt=M,K=C,Z=G;let O=null,B=!1,ft=!1;if(M){const dt=k.get(M);if(dt.__useDefaultFramebuffer!==void 0){_.bindFramebuffer(L.FRAMEBUFFER,dt.__webglFramebuffer),et.copy(M.viewport),wt.copy(M.scissor),Tt=M.scissorTest,_.viewport(et),_.scissor(wt),_.setScissorTest(Tt),X=-1;return}else if(dt.__webglFramebuffer===void 0)W.setupRenderTarget(M);else if(dt.__hasExternalTextures)W.rebindTextures(M,k.get(M.texture).__webglTexture,k.get(M.depthTexture).__webglTexture);else if(M.depthBuffer){const Ut=M.depthTexture;if(dt.__boundDepthTexture!==Ut){if(Ut!==null&&k.has(Ut)&&(M.width!==Ut.image.width||M.height!==Ut.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");W.setupDepthRenderbuffer(M)}}const vt=M.texture;(vt.isData3DTexture||vt.isDataArrayTexture||vt.isCompressedArrayTexture)&&(ft=!0);const yt=k.get(M).__webglFramebuffer;M.isWebGLCubeRenderTarget?(Array.isArray(yt[C])?O=yt[C][G]:O=yt[C],B=!0):M.samples>0&&W.useMultisampledRTT(M)===!1?O=k.get(M).__webglMultisampledFramebuffer:Array.isArray(yt)?O=yt[G]:O=yt,et.copy(M.viewport),wt.copy(M.scissor),Tt=M.scissorTest}else et.copy(gt).multiplyScalar(Q).floor(),wt.copy(Ot).multiplyScalar(Q).floor(),Tt=ge;if(G!==0&&(O=V),_.bindFramebuffer(L.FRAMEBUFFER,O)&&_.drawBuffers(M,O),_.viewport(et),_.scissor(wt),_.setScissorTest(Tt),B){const dt=k.get(M.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_CUBE_MAP_POSITIVE_X+C,dt.__webglTexture,G)}else if(ft){const dt=C;for(let vt=0;vt<M.textures.length;vt++){const yt=k.get(M.textures[vt]);L.framebufferTextureLayer(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0+vt,yt.__webglTexture,G,dt)}}else if(M!==null&&G!==0){const dt=k.get(M.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,dt.__webglTexture,G)}X=-1};function Bo(M){const C=k.get(M);return(C.__readFormat!==M.format||C.__readType!==M.type)&&(C.__readFormat=M.format,C.__readType=M.type,C.__formatReadable=b.textureFormatReadable(M.format),C.__typeReadable=b.textureTypeReadable(M.type)),C}this.readRenderTargetPixels=function(M,C,G,O,B,ft,_t,dt=0){if(!(M&&M.isWebGLRenderTarget)){Yt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let vt=k.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&_t!==void 0&&(vt=vt[_t]),vt){_.bindFramebuffer(L.FRAMEBUFFER,vt);try{const yt=M.textures[dt],Ut=yt.format,kt=yt.type;M.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+dt);const Mt=Bo(yt);if(Mt.__formatReadable===!1){Yt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Mt.__typeReadable===!1){Yt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}C>=0&&C<=M.width-O&&G>=0&&G<=M.height-B&&L.readPixels(C,G,O,B,ct.convert(Ut),ct.convert(kt),ft)}finally{const yt=nt!==null?k.get(nt).__webglFramebuffer:null;_.bindFramebuffer(L.FRAMEBUFFER,yt)}}},this.readRenderTargetPixelsAsync=async function(M,C,G,O,B,ft,_t,dt=0){if(!(M&&M.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let vt=k.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&_t!==void 0&&(vt=vt[_t]),vt)if(C>=0&&C<=M.width-O&&G>=0&&G<=M.height-B){_.bindFramebuffer(L.FRAMEBUFFER,vt);const yt=M.textures[dt],Ut=yt.format,kt=yt.type;M.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+dt);const Mt=Bo(yt);if(Mt.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Mt.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const $t=L.createBuffer();L.bindBuffer(L.PIXEL_PACK_BUFFER,$t),L.bufferData(L.PIXEL_PACK_BUFFER,ft.byteLength,L.STREAM_READ),L.readPixels(C,G,O,B,ct.convert(Ut),ct.convert(kt),0),L.bindBuffer(L.PIXEL_PACK_BUFFER,null);const pe=nt!==null?k.get(nt).__webglFramebuffer:null;_.bindFramebuffer(L.FRAMEBUFFER,pe);const oe=L.fenceSync(L.SYNC_GPU_COMMANDS_COMPLETE,0);return L.flush(),await bu(L,oe,4),L.bindBuffer(L.PIXEL_PACK_BUFFER,$t),L.getBufferSubData(L.PIXEL_PACK_BUFFER,0,ft),L.bindBuffer(L.PIXEL_PACK_BUFFER,null),L.deleteBuffer($t),L.deleteSync(oe),ft}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(M,C=null,G=0){const O=Math.pow(2,-G),B=Math.floor(M.image.width*O),ft=Math.floor(M.image.height*O),_t=C!==null?C.x:0,dt=C!==null?C.y:0;W.setTexture2D(M,0),L.copyTexSubImage2D(L.TEXTURE_2D,G,0,0,_t,dt,B,ft),_.unbindTexture()},this.copyTextureToTexture=function(M,C,G=null,O=null,B=0,ft=0){let _t,dt,vt,yt,Ut,kt,Mt,$t,pe;const oe=M.isCompressedTexture?M.mipmaps[ft]:M.image;if(G!==null)_t=G.max.x-G.min.x,dt=G.max.y-G.min.y,vt=G.isBox3?G.max.z-G.min.z:1,yt=G.min.x,Ut=G.min.y,kt=G.isBox3?G.min.z:0;else{const de=Math.pow(2,-B);_t=Math.floor(oe.width*de),dt=Math.floor(oe.height*de),M.isDataArrayTexture?vt=oe.depth:M.isData3DTexture?vt=Math.floor(oe.depth*de):vt=1,yt=0,Ut=0,kt=0}O!==null?(Mt=O.x,$t=O.y,pe=O.z):(Mt=0,$t=0,pe=0);const ee=ct.convert(C.format),Re=ct.convert(C.type);let mt;C.isData3DTexture?(W.setTexture3D(C,0),mt=L.TEXTURE_3D):C.isDataArrayTexture||C.isCompressedArrayTexture?(W.setTexture2DArray(C,0),mt=L.TEXTURE_2D_ARRAY):(W.setTexture2D(C,0),mt=L.TEXTURE_2D),_.activeTexture(L.TEXTURE0),_.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,C.flipY),_.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,C.premultiplyAlpha),_.pixelStorei(L.UNPACK_ALIGNMENT,C.unpackAlignment);const Le=_.getParameter(L.UNPACK_ROW_LENGTH),Xt=_.getParameter(L.UNPACK_IMAGE_HEIGHT),Ke=_.getParameter(L.UNPACK_SKIP_PIXELS),cn=_.getParameter(L.UNPACK_SKIP_ROWS),Ln=_.getParameter(L.UNPACK_SKIP_IMAGES);_.pixelStorei(L.UNPACK_ROW_LENGTH,oe.width),_.pixelStorei(L.UNPACK_IMAGE_HEIGHT,oe.height),_.pixelStorei(L.UNPACK_SKIP_PIXELS,yt),_.pixelStorei(L.UNPACK_SKIP_ROWS,Ut),_.pixelStorei(L.UNPACK_SKIP_IMAGES,kt);const ai=M.isDataArrayTexture||M.isData3DTexture,te=C.isDataArrayTexture||C.isData3DTexture;if(M.isDepthTexture){const de=k.get(M),In=k.get(C),re=k.get(de.__renderTarget),Un=k.get(In.__renderTarget);_.bindFramebuffer(L.READ_FRAMEBUFFER,re.__webglFramebuffer),_.bindFramebuffer(L.DRAW_FRAMEBUFFER,Un.__webglFramebuffer);for(let oi=0;oi<vt;oi++)ai&&(L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,k.get(M).__webglTexture,B,kt+oi),L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,k.get(C).__webglTexture,ft,pe+oi)),L.blitFramebuffer(yt,Ut,_t,dt,Mt,$t,_t,dt,L.DEPTH_BUFFER_BIT,L.NEAREST);_.bindFramebuffer(L.READ_FRAMEBUFFER,null),_.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else if(B!==0||M.isRenderTargetTexture||k.has(M)){const de=k.get(M),In=k.get(C);_.bindFramebuffer(L.READ_FRAMEBUFFER,U),_.bindFramebuffer(L.DRAW_FRAMEBUFFER,H);for(let re=0;re<vt;re++)ai?L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,de.__webglTexture,B,kt+re):L.framebufferTexture2D(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,de.__webglTexture,B),te?L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,In.__webglTexture,ft,pe+re):L.framebufferTexture2D(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,In.__webglTexture,ft),B!==0?L.blitFramebuffer(yt,Ut,_t,dt,Mt,$t,_t,dt,L.COLOR_BUFFER_BIT,L.NEAREST):te?L.copyTexSubImage3D(mt,ft,Mt,$t,pe+re,yt,Ut,_t,dt):L.copyTexSubImage2D(mt,ft,Mt,$t,yt,Ut,_t,dt);_.bindFramebuffer(L.READ_FRAMEBUFFER,null),_.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else te?M.isDataTexture||M.isData3DTexture?L.texSubImage3D(mt,ft,Mt,$t,pe,_t,dt,vt,ee,Re,oe.data):C.isCompressedArrayTexture?L.compressedTexSubImage3D(mt,ft,Mt,$t,pe,_t,dt,vt,ee,oe.data):L.texSubImage3D(mt,ft,Mt,$t,pe,_t,dt,vt,ee,Re,oe):M.isDataTexture?L.texSubImage2D(L.TEXTURE_2D,ft,Mt,$t,_t,dt,ee,Re,oe.data):M.isCompressedTexture?L.compressedTexSubImage2D(L.TEXTURE_2D,ft,Mt,$t,oe.width,oe.height,ee,oe.data):L.texSubImage2D(L.TEXTURE_2D,ft,Mt,$t,_t,dt,ee,Re,oe);_.pixelStorei(L.UNPACK_ROW_LENGTH,Le),_.pixelStorei(L.UNPACK_IMAGE_HEIGHT,Xt),_.pixelStorei(L.UNPACK_SKIP_PIXELS,Ke),_.pixelStorei(L.UNPACK_SKIP_ROWS,cn),_.pixelStorei(L.UNPACK_SKIP_IMAGES,Ln),ft===0&&C.generateMipmaps&&L.generateMipmap(mt),_.unbindTexture()},this.initRenderTarget=function(M){k.get(M).__webglFramebuffer===void 0&&W.setupRenderTarget(M)},this.initTexture=function(M){M.isCubeTexture?W.setTextureCube(M,0):M.isData3DTexture?W.setTexture3D(M,0):M.isDataArrayTexture||M.isCompressedArrayTexture?W.setTexture2DArray(M,0):W.setTexture2D(M,0),_.unbindTexture()},this.resetState=function(){K=0,Z=0,nt=null,_.reset(),pt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return gn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=Vt._getDrawingBufferColorSpace(t),e.unpackColorSpace=Vt._getUnpackColorSpace()}}const $l={type:"change"},yo={type:"start"},lh={type:"end"},ks=new ur,Jl=new dn,U0=Math.cos(70*Au.DEG2RAD),_e=new D,He=2*Math.PI,jt={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Jr=1e-6;class N0 extends Ud{constructor(t,e=null){super(t,e),this.state=jt.NONE,this.target=new D,this.cursor=new D,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:wi.ROTATE,MIDDLE:wi.DOLLY,RIGHT:wi.PAN},this.touches={ONE:Ti.ROTATE,TWO:Ti.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new D,this._lastQuaternion=new Gn,this._lastTargetPosition=new D,this._quat=new Gn().setFromUnitVectors(t.up,new D(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Tl,this._sphericalDelta=new Tl,this._scale=1,this._panOffset=new D,this._rotateStart=new Ct,this._rotateEnd=new Ct,this._rotateDelta=new Ct,this._panStart=new Ct,this._panEnd=new Ct,this._panDelta=new Ct,this._dollyStart=new Ct,this._dollyEnd=new Ct,this._dollyDelta=new Ct,this._dollyDirection=new D,this._mouse=new Ct,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=O0.bind(this),this._onPointerDown=F0.bind(this),this._onPointerUp=B0.bind(this),this._onContextMenu=X0.bind(this),this._onMouseWheel=H0.bind(this),this._onKeyDown=G0.bind(this),this._onTouchStart=V0.bind(this),this._onTouchMove=W0.bind(this),this._onMouseDown=k0.bind(this),this._onMouseMove=z0.bind(this),this._interceptControlDown=Y0.bind(this),this._interceptControlUp=q0.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(t){this._cursorStyle=t,t==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(t){super.connect(t),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.state=jt.NONE,this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents();const t=this.domElement.getRootNode();t.removeEventListener("keydown",this._interceptControlDown,{capture:!0}),t.removeEventListener("keyup",this._interceptControlUp,{capture:!0}),this._controlActive=!1,this._pointers.length=0,this._pointerPositions={},this.domElement.style.touchAction="",this.domElement.style.cursor="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent($l),this.update(),this.state=jt.NONE}pan(t,e){this._pan(t,e),this.update()}dollyIn(t){this._dollyIn(t),this.update()}dollyOut(t){this._dollyOut(t),this.update()}rotateLeft(t){this._rotateLeft(t),this.update()}rotateUp(t){this._rotateUp(t),this.update()}update(t=null){const e=this.object.position;_e.copy(e).sub(this.target),_e.applyQuaternion(this._quat),this._spherical.setFromVector3(_e),this.autoRotate&&this.state===jt.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(i)&&isFinite(s)&&(i<-Math.PI?i+=He:i>Math.PI&&(i-=He),s<-Math.PI?s+=He:s>Math.PI&&(s-=He),i<=s?this._spherical.theta=Math.max(i,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+s)/2?Math.max(i,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=a!=this._spherical.radius}if(_e.setFromSpherical(this._spherical),_e.applyQuaternion(this._quatInverse),e.copy(this.target).add(_e),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){const o=_e.length();a=this._clampDistance(o*this._scale);const l=o-a;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),r=!!l}else if(this.object.isOrthographicCamera){const o=new D(this._mouse.x,this._mouse.y,0);o.unproject(this.object);const l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=l!==this.object.zoom;const c=new D(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(o),this.object.updateMatrixWorld(),a=_e.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(ks.origin.copy(this.object.position),ks.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(ks.direction))<U0?this.object.lookAt(this.target):(Jl.setFromNormalAndCoplanarPoint(this.object.up,this.target),ks.intersectPlane(Jl,this.target))))}else if(this.object.isOrthographicCamera){const a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>Jr||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Jr||this._lastTargetPosition.distanceToSquared(this.target)>Jr?(this.dispatchEvent($l),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?He/60*this.autoRotateSpeed*t:He/60/60*this.autoRotateSpeed}_getZoomScale(t){const e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){_e.setFromMatrixColumn(e,0),_e.multiplyScalar(-t),this._panOffset.add(_e)}_panUp(t,e){this.screenSpacePanning===!0?_e.setFromMatrixColumn(e,1):(_e.setFromMatrixColumn(e,0),_e.crossVectors(this.object.up,_e)),_e.multiplyScalar(t),this._panOffset.add(_e)}_pan(t,e){const i=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;_e.copy(s).sub(this.target);let r=_e.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*r/i.clientHeight,this.object.matrix),this._panUp(2*e*r/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const i=this.domElement.getBoundingClientRect(),s=t-i.left,r=e-i.top,a=i.width,o=i.height;this._mouse.x=s/a*2-1,this._mouse.y=-(r/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(He*this._rotateDelta.x/e.clientHeight),this._rotateUp(He*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(He*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(-He*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(He*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(-He*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._rotateStart.set(i,s)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panStart.set(i,s)}}_handleTouchStartDolly(t){const e=this._getSecondPointerPosition(t),i=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(i*i+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{const i=this._getSecondPointerPosition(t),s=.5*(t.pageX+i.x),r=.5*(t.pageY+i.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(He*this._rotateDelta.x/e.clientHeight),this._rotateUp(He*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panEnd.set(i,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){const e=this._getSecondPointerPosition(t),i=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(i*i+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const a=(t.pageX+e.x)*.5,o=(t.pageY+e.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new Ct,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){const e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){const e=t.deltaMode,i={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function F0(n){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(n.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(n)&&(this._addPointer(n),n.pointerType==="touch"?this._onTouchStart(n):this._onMouseDown(n),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function O0(n){this.enabled!==!1&&(n.pointerType==="touch"?this._onTouchMove(n):this._onMouseMove(n))}function B0(n){switch(this._removePointer(n),this._pointers.length){case 0:this.domElement.releasePointerCapture(n.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(lh),this.state=jt.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:const t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function k0(n){let t;switch(n.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case wi.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(n),this.state=jt.DOLLY;break;case wi.ROTATE:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=jt.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=jt.ROTATE}break;case wi.PAN:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=jt.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=jt.PAN}break;default:this.state=jt.NONE}this.state!==jt.NONE&&this.dispatchEvent(yo)}function z0(n){switch(this.state){case jt.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(n);break;case jt.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(n);break;case jt.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(n);break}}function H0(n){this.enabled===!1||this.enableZoom===!1||this.state!==jt.NONE||(n.preventDefault(),this.dispatchEvent(yo),this._handleMouseWheel(this._customWheelEvent(n)),this.dispatchEvent(lh))}function G0(n){this.enabled!==!1&&this._handleKeyDown(n)}function V0(n){switch(this._trackPointer(n),this._pointers.length){case 1:switch(this.touches.ONE){case Ti.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(n),this.state=jt.TOUCH_ROTATE;break;case Ti.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(n),this.state=jt.TOUCH_PAN;break;default:this.state=jt.NONE}break;case 2:switch(this.touches.TWO){case Ti.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(n),this.state=jt.TOUCH_DOLLY_PAN;break;case Ti.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(n),this.state=jt.TOUCH_DOLLY_ROTATE;break;default:this.state=jt.NONE}break;default:this.state=jt.NONE}this.state!==jt.NONE&&this.dispatchEvent(yo)}function W0(n){switch(this._trackPointer(n),this.state){case jt.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(n),this.update();break;case jt.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(n),this.update();break;case jt.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(n),this.update();break;case jt.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(n),this.update();break;default:this.state=jt.NONE}}function X0(n){this.enabled!==!1&&n.preventDefault()}function Y0(n){n.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function q0(n){n.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}class ch extends xe{constructor(t=document.createElement("div")){super(),this.isCSS2DObject=!0,this.element=t,this.element.style.position="absolute",this.element.style.userSelect="none",this.element.setAttribute("draggable",!1),this.center=new Ct(.5,.5),this.rotation2D=0,this.addEventListener("removed",function(){this.traverse(function(e){e.element&&e.element instanceof e.element.ownerDocument.defaultView.Element&&e.element.parentNode!==null&&e.element.remove()})})}copy(t,e){return super.copy(t,e),this.element=t.element.cloneNode(!0),this.center=t.center,this.rotation2D=t.rotation2D,this}}const Si=new D,Ql=new ae,jl=new ae,tc=new D,ec=new D;class Z0{constructor(t={}){const e=this;let i,s,r,a;const o={objects:new WeakMap},l=t.element!==void 0?t.element:document.createElement("div");l.style.overflow="hidden",this.domElement=l,this.sortObjects=!0,this.getSize=function(){return{width:i,height:s}},this.render=function(g,v){g.matrixWorldAutoUpdate===!0&&g.updateMatrixWorld(),v.parent===null&&v.matrixWorldAutoUpdate===!0&&v.updateMatrixWorld(),Ql.copy(v.matrixWorldInverse),jl.multiplyMatrices(v.projectionMatrix,Ql),u(g,g,v),this.sortObjects&&m(g)},this.setSize=function(g,v){i=g,s=v,r=i/2,a=s/2,l.style.width=g+"px",l.style.height=v+"px"};function c(g){g.isCSS2DObject&&(g.element.style.display="none");for(let v=0,p=g.children.length;v<p;v++)c(g.children[v])}function u(g,v,p){if(g.visible===!1){c(g);return}if(g.isCSS2DObject){Si.setFromMatrixPosition(g.matrixWorld),Si.applyMatrix4(jl);const f=Si.z>=-1&&Si.z<=1&&g.layers.test(p.layers)===!0,E=g.element;if(E.style.display=f===!0?"":"none",f===!0){g.onBeforeRender(e,v,p);const S=100*g.center.x,y=100*g.center.y;E.style.transformOrigin=`${S}% ${y}%`;const T=-g.rotation2D,R=Si.x*r+r,x=-Si.y*a+a;E.style.transform=`translate(${-S}%, ${-y}%) translate(${R}px, ${x}px) rotate(${T}rad)`,E.parentNode!==l&&l.appendChild(E),g.onAfterRender(e,v,p)}const A={distanceToCameraSquared:d(p,g)};o.objects.set(g,A)}for(let f=0,E=g.children.length;f<E;f++)u(g.children[f],v,p)}function d(g,v){return tc.setFromMatrixPosition(g.matrixWorld),ec.setFromMatrixPosition(v.matrixWorld),tc.distanceToSquared(ec)}function h(g){const v=[];return g.traverseVisible(function(p){p.isCSS2DObject&&v.push(p)}),v}function m(g){const v=h(g).sort(function(f,E){if(f.renderOrder!==E.renderOrder)return E.renderOrder-f.renderOrder;const A=o.objects.get(f).distanceToCameraSquared,S=o.objects.get(E).distanceToCameraSquared;return A-S}),p=v.length;for(let f=0,E=v.length;f<E;f++)v[f].element.style.zIndex=p-f}}}function Ve(n){return Math.min(255,Math.max(0,Math.round(n)))}function as(n){return Math.min(1,Math.max(0,n))}function K0(n){const t=n.endsWith("%"),e=Number(t?n.slice(0,-1):n);return Number.isFinite(e)?Ve(t?e/100*255:e):null}function $0(n){if(n===void 0)return 1;const t=n.endsWith("%"),e=Number(t?n.slice(0,-1):n);return Number.isFinite(e)?as(t?e/100:e):null}function Qr(n,t,e){let i=e;return i<0&&(i+=1),i>1&&(i-=1),i<1/6?n+(t-n)*6*i:i<1/2?t:i<2/3?n+(t-n)*(2/3-i)*6:n}function J0(n){return n.replace(/\s*\/\s*/," / ").split(/[\s,]+/).filter(Boolean).filter(t=>t!=="/")}function pr(n){if(typeof n!="string")return null;const t=n.trim().toLowerCase();if(t==="")return null;const e=/^#([0-9a-f]{3,8})$/.exec(t);if(e){const g=e[1];if(g.length===3||g.length===4){const[v,p,f,E]=[...g].map(A=>parseInt(A+A,16));return{r:v,g:p,b:f,a:g.length===4?E/255:1}}if(g.length===6||g.length===8){const v=p=>parseInt(g.slice(p,p+2),16);return{r:v(0),g:v(2),b:v(4),a:g.length===8?v(6)/255:1}}return null}const i=/^(rgba?|hsla?)\(([^()]*)\)$/.exec(t);if(!i)return null;const s=J0(i[2]);if(s.length!==3&&s.length!==4)return null;const r=$0(s[3]);if(r===null)return null;if(i[1].startsWith("rgb")){const[g,v,p]=s.slice(0,3).map(K0);return g===null||v===null||p===null?null:{r:g,g:v,b:p,a:r}}const a=Number(s[0].replace(/deg$/,"")),o=Number(s[1].replace(/%$/,""))/100,l=Number(s[2].replace(/%$/,""))/100;if(![a,o,l].every(Number.isFinite))return null;const c=(a%360+360)%360/360,u=as(o),d=as(l);if(u===0){const g=Ve(d*255);return{r:g,g,b:g,a:r}}const h=d<.5?d*(1+u):d+u-d*u,m=2*d-h;return{r:Ve(Qr(m,h,c+1/3)*255),g:Ve(Qr(m,h,c)*255),b:Ve(Qr(m,h,c-1/3)*255),a:r}}function zt(n,t,e,i=1){return{r:Ve(n),g:Ve(t),b:Ve(e),a:as(i)}}function sr(n,t,e){const i=as(e);return{r:Ve(n.r+(t.r-n.r)*i),g:Ve(n.g+(t.g-n.g)*i),b:Ve(n.b+(t.b-n.b)*i),a:n.a}}function hh(n,t){return{r:Ve(n.r*t),g:Ve(n.g*t),b:Ve(n.b*t),a:n.a}}function nc(n){const t=Math.min(4e4,Math.max(1e3,n))/100,e=t<=66?255:329.698727446*Math.pow(t-60,-.1332047592),i=t<=66?99.4708025861*Math.log(t)-161.1195681661:288.1221695283*Math.pow(t-60,-.0755148492),s=t>=66?255:t<=19?0:138.5177312231*Math.log(t-10)-305.0447927307;return zt(e,i,s)}const Q0={body:zt(139,155,180),accent:zt(92,107,132),soft:zt(241,245,249),wood:zt(176,137,104),metal:zt(156,163,175),ceramic:zt(248,250,252),water:zt(56,189,248),heat:zt(239,68,68),dark:zt(31,41,55),screen:zt(15,23,42),glass:zt(186,230,253,.35)},j0={dark:{background:zt(15,23,42),floor:zt(71,85,105),accent:zt(56,189,248),warning:zt(251,191,36),wall:zt(241,245,249),wallTop:zt(51,65,85),frame:zt(148,163,184),door:zt(120,83,51),glass:zt(125,211,252,.45)},light:{background:zt(248,250,252),floor:zt(226,232,240),accent:zt(2,132,199),warning:zt(180,83,9),wall:zt(241,245,249),wallTop:zt(100,116,139),frame:zt(71,85,105),door:zt(146,101,63),glass:zt(56,189,248,.4)}};function ic(n,t){const e=getComputedStyle(n),i=j0[t],s=(u,d)=>pr(e.getPropertyValue(u))??d,r=u=>({...u,a:1}),a=r(s("--arch-bg",i.background)),o=t==="dark"?zt(255,255,255):zt(15,23,42),l=s("--arch-grid-major",{...o,a:.14}),c=s("--arch-door-3d",i.door);return{background:a,ground:sr(a,o,.05),grid:sr(a,l,Math.max(.12,l.a)),floor:i.floor,accent:r(s("--arch-accent",i.accent)),warning:r(s("--arch-warning",i.warning)),roles:{...Q0,wall:r(s("--arch-wall-cap",i.wall)),"wall-top":r(s("--arch-wall-fill",i.wallTop)),frame:r(s("--arch-frame",i.frame)),door:r(c),glass:s("--arch-glass-3d",i.glass)}}}function Ne(n,t=new Ft){return t.setRGB(n.r/255,n.g/255,n.b/255,Ge)}class sc{constructor(t){this.palette=t,this.surface=new Jn({vertexColors:!0}),this.selected=new Jn({vertexColors:!0,emissive:Ne(t.accent),emissiveIntensity:.45}),this.warning=new Jn({vertexColors:!0,emissive:Ne(t.warning),emissiveIntensity:.5});const e=t.roles.glass;this.glass=new Jn({color:Ne(e),transparent:!0,opacity:Math.min(.6,Math.max(.2,e.a)),depthWrite:!1,side:pn}),this.ghost=new Jn({color:Ne(t.roles.wall),transparent:!0,opacity:.16,depthWrite:!1}),this.ground=new Jn({color:Ne(t.ground)})}get shared(){return new Set([this.surface,this.selected,this.warning,this.glass,this.ghost,this.ground])}dispose(){for(const t of this.shared)t.dispose()}}const rc={seating:.45,bed:.5,table:.75,kitchen:.9,bathroom:.85,storage:2,other:.8};function rr(n,t,e){return Math.min(Math.max(n,t),e)}function it(n,t,e,i,s,r,a,o=!1){const l={x0:Math.min(n,e),y0:Math.min(t,i),x1:Math.max(n,e),y1:Math.max(t,i),z0:Math.min(s,r),z1:Math.max(s,r),role:a};return l.x1-l.x0<1e-4||l.y1-l.y0<1e-4||l.z1-l.z0<1e-4?null:(o&&(l.round=!0),l)}function hs(n,t,e,i,s,r,a=!1){const o=Math.min(i,n/4,t/4),l=[-n/2+e,n/2-e-o],c=[-t/2+e,t/2-e-o];return l.flatMap(u=>c.map(d=>it(u,d,u+o,d+o,0,s,r,a)))}function t_(n){return n.map(t=>t?{...t,x0:-t.x1,x1:-t.x0}:null)}function jr(n,t,e,i,s,r){const a=rr(n*e,i,n*.25),o=rr(t*s,r,t*.45);return[...hs(n,t,.04,.05,.08,"dark"),it(-n/2,-t/2,n/2,t/2,.08,.4,"accent"),it(-n/2+a,-t/2+o,n/2-a,t/2,.4,.5,"body"),it(-n/2+a,-t/2,n/2-a,-t/2+o,.4,.85,"accent"),it(-n/2,-t/2,-n/2+a,t/2,.4,.64,"accent"),it(n/2-a,-t/2,n/2,t/2,.4,.64,"accent")]}function ac(n,t){const e=rr(n*.22,.15,n*.4),i=rr(t*.24,.1,t*.45);return[...hs(n,t,.04,.05,.08,"dark"),it(-n/2,-t/2,n/2,t/2,.08,.38,"accent"),it(-n/2+e,-t/2+i,n/2,t/2,.38,.48,"body"),it(-n/2+e,-t/2,-n/2+n*.65,-t/2+i,.38,.8,"accent"),it(-n/2,-t/2,-n/2+e,t/2,.38,.75,"accent")]}function oc(n,t,e){const i=Math.min(.06,t*.05),s=Math.min(.06,n*.05),r=Math.min(.4,t*.2),a=(n-s*(e+1))/e,o=-t/2+i+s,l=[...hs(n,t,.03,.06,.1,"dark"),it(-n/2,-t/2,n/2,t/2,.1,.3,"wood"),it(-n/2+.02,-t/2+i,n/2-.02,t/2-.02,.3,.5,"soft"),it(-n/2,-t/2,n/2,-t/2+i,.1,.95,"wood"),it(-n/2+.01,o+r+.04,n/2-.01,t/2-.01,.5,.56,"body")];for(let c=0;c<e;c++){const u=-n/2+s+c*(a+s);l.push(it(u,o,u+a,o+r,.5,.62,"soft"))}return l}function zs(n,t,e,i){return[it(-n/2,-t/2,n/2,t/2,e-.04,e,"body"),...hs(n,t,.05,.05,e-.04,i)]}function lc(n,t,e,i){const r=e+i*.42,a=e+i*.04,o=[e+i*.02,r-i*.05];return[...[n+.02,n+t-.05].flatMap(l=>o.map(c=>it(l,c,l+.03,c+i*.03,0,.43,"dark"))),it(n,e,n+t,r,.43,.47,"accent"),it(n,e,n+t,a,.47,.92,"accent")]}function Xi(n,t,e,i){return[it(-n/2+.02,-t/2+.02,n/2-.02,t/2-.06,0,.08,"dark"),it(-n/2,-t/2,n/2,t/2-.01,.08,e-.04,"body"),it(-n/2,-t/2,n/2,t/2,e-.04,e,i)]}function ta(n,t,e){return[it(-.015,n,.015,n+.03,t,t+.22,"metal"),it(-.015,n,.015,n+e,t+.19,t+.22,"metal")]}const e_={sofa_3p:(n,t)=>({parts:jr(n,t,.1,.1,.26,.12)}),sofa_2p:(n,t)=>({parts:jr(n,t,.12,.1,.26,.12)}),armchair:(n,t)=>({parts:jr(n,t,.18,.08,.28,.1)}),divan:(n,t)=>({parts:ac(n,t)}),divan_right:(n,t)=>({parts:t_(ac(n,t))}),coffee_table:(n,t)=>({parts:zs(n,t,.4,"wood"),bodyRole:"wood"}),bed_double:(n,t)=>({parts:oc(n,t,2)}),bed_single:(n,t)=>({parts:oc(n,t,1)}),nightstand:(n,t)=>({bodyRole:"wood",parts:[it(-n/2,-t/2,n/2,t/2,0,.55,"body"),it(-n/2+.03,t/2,n/2-.03,t/2+.01,.3,.5,"accent"),it(-.02,t/2+.01,.02,t/2+.03,.38,.42,"metal")]}),wardrobe:(n,t)=>{const e=[-n/2+n/3,-n/2+n*2/3];return{bodyRole:"wood",parts:[it(-n/2+.02,-t/2,n/2-.02,t/2-.04,0,.06,"dark"),it(-n/2,-t/2,n/2,t/2,.06,2,"body"),...e.flatMap(i=>[it(i-.005,t/2,i+.005,t/2+.005,.1,1.96,"dark"),it(i-.04,t/2,i-.025,t/2+.03,.9,1.3,"metal"),it(i+.025,t/2,i+.04,t/2+.03,.9,1.3,"metal")])]}},dining_table_6:(n,t)=>{const e=n*.24,i=Math.min(.18,t*.25),s=n*.04,r=[-n/2+s,-e/2,n/2-e-s];return{bodyRole:"wood",parts:[...zs(n,t,.76,"wood"),...r.flatMap(a=>[...lc(a,e,-t/2-i,1),...lc(a,e,t/2+i,-1)])]}},desk:(n,t)=>{const e=Math.min(n*.4,.6),i=Math.min(.45,n*.3);return{bodyRole:"wood",parts:[...zs(n,t,.75,"metal"),it(n/2-i-.06,-t/2+.06,n/2-.06,t/2-.06,.12,.71,"accent"),it(-.04,-t/2+.1,.04,-t/2+.14,.75,.84,"dark"),it(-e/2,-t/2+.08,e/2,-t/2+.1,.82,1.16,"screen")]}},chair_starck:(n,t)=>({bodyRole:"glass",parts:[...hs(n,t,.03,.035,.42,"glass"),it(-n/2+.03,-t/2+.06,n/2-.03,t/2-.04,.42,.46,"body"),it(-n/2+.07,-t/2+.03,n/2-.07,-t/2+.07,.46,.92,"body")]}),console:(n,t)=>({bodyRole:"wood",parts:[...zs(n,t,.8,"wood"),it(-n/2+.04,-t/2+.03,n/2-.04,t/2-.02,.62,.76,"accent"),it(-n/4-.02,t/2-.02,-n/4+.02,t/2+.01,.67,.71,"metal"),it(n/4-.02,t/2-.02,n/4+.02,t/2+.01,.67,.71,"metal")]}),toilet:(n,t)=>{const e=t*.28,i=n*.04;return{bodyRole:"ceramic",parts:[it(-n*.28,-t/2+e*.6,n*.28,t/2-.1,0,.32,"ceramic",!0),it(-n/2+i,-t/2+e,n/2-i,t/2,.3,.4,"ceramic",!0),it(-n/2+i,-t/2+e,n/2-i,t/2,.4,.43,"soft",!0),it(-n/2,-t/2,n/2,-t/2+e,.32,.8,"body")]}},shower:(n,t)=>({bodyRole:"ceramic",parts:[it(-n/2,-t/2,n/2,t/2,0,.05,"body"),it(-.03,-.03,.03,.03,.05,.052,"dark",!0),it(n/2-n*.7,t/2-.01,n/2,t/2,.05,2,"glass"),it(-.015,-t/2,.015,-t/2+.03,1,2,"metal"),it(-.1,-t/2+.03,.1,-t/2+.25,1.96,2,"metal")]}),bathtub:(n,t)=>{const e=Math.min(n,t)*.08;return{bodyRole:"ceramic",parts:[it(-n/2,-t/2,n/2,t/2,0,.42,"body"),it(-n/2,-t/2,n/2,-t/2+e,.42,.56,"body"),it(-n/2,t/2-e,n/2,t/2,.42,.56,"body"),it(-n/2,-t/2+e,-n/2+e,t/2-e,.42,.56,"body"),it(n/2-e,-t/2+e,n/2,t/2-e,.42,.56,"body"),it(-n/2+e,-t/2+e,n/2-e,t/2-e,.42,.5,"water"),it(-n/2+.01,-.03,-n/2+e,.03,.56,.62,"metal")]}},sink_vanity:(n,t)=>{const e=n*.65/2,i=t*.65/2;return{bodyRole:"wood",parts:[...Xi(n,t,.85,"ceramic"),it(-e,-i,e,i,.85,.855,"water",!0),...ta(-t/2+.03,.85,.12)]}},kitchen_sink:(n,t)=>{const e=Math.min(n,t)*.08,i=(n-e*3)/2,s=t-e*2.6,r=-t/2+e*1.6;return{bodyRole:"ceramic",parts:[...Xi(n,t,.9,"dark"),it(-n/2+e,r,-n/2+e+i,r+s,.9,.905,"water"),it(e/2,r,e/2+i,r+s,.9,.905,"water"),...ta(-t/2+.02,.9,.16)]}},cooktop:(n,t)=>{const e=Math.min(n,t)*.18,i=Math.min(n,t)*.13,s=(r,a,o)=>it(r-o,a-o,r+o,a+o,.905,.908,"heat",!0);return{bodyRole:"ceramic",parts:[...Xi(n,t,.9,"dark"),it(-n/2+.03,-t/2+.03,n/2-.03,t/2-.03,.9,.905,"screen"),s(-n/4,-t/4,e),s(n/4,-t/4,i),s(-n/4,t/4,i),s(n/4,t/4,e)]}},fridge:(n,t)=>{const e=n/2-.1;return{bodyRole:"ceramic",parts:[it(-n/2,-t/2,n/2,t/2,0,1.85,"body"),it(-n/2,-t/2-.005,n/2,-t/2,1.2,1.215,"dark"),it(e,-t/2-.035,e+.02,-t/2,1.3,1.6,"metal"),it(e,-t/2-.035,e+.02,-t/2,.75,1.1,"metal")]}},fridge_us:(n,t)=>({bodyRole:"metal",parts:[it(-n/2,-t/2,n/2,t/2,0,1.85,"body"),it(-.005,-t/2-.01,.005,-t/2,.05,1.82,"dark"),it(-.04,-t/2-.035,-.02,-t/2,.7,1.5,"metal"),it(.02,-t/2-.035,.04,-t/2,.7,1.5,"metal"),it(-n/4-.08,-t/2-.005,-n/4+.08,-t/2,1.1,1.4,"screen")]}),double_vanity:(n,t)=>{const e=n*.35/2,i=t*.65/2;return{bodyRole:"wood",parts:[...Xi(n,t,.85,"ceramic"),it(-n/4-e,-i,-n/4+e,i,.85,.855,"water",!0),it(n/4-e,-i,n/4+e,i,.85,.855,"water",!0),...ta(-t/2+.03,.85,.12)]}},towel_dryer:(n,t)=>{const i=[it(-n/2+.02,-t/2,-n/2+.05,t/2,.6,1.6,"metal"),it(n/2-.05,-t/2,n/2-.02,t/2,.6,1.6,"metal")];for(let s=0;s<5;s++){const r=.75+s*.18;i.push(it(-n/2+.04,-t/2+.01,n/2-.04,t/2-.01,r,r+.025,"heat"))}return{bodyRole:"metal",parts:i}},dishwasher:(n,t)=>({bodyRole:"metal",parts:[...Xi(n,t,.85,"dark"),it(-n/2+.03,-t/2-.01,n/2-.03,-t/2,.72,.82,"screen"),it(-n/3,-t/2-.025,n/3,-t/2,.65,.68,"metal")]}),washing_machine:(n,t)=>{const e=Math.min(n,t)*.28;return{bodyRole:"ceramic",parts:[it(-n/2,-t/2,n/2,t/2,0,.85,"body"),it(-n/2+.04,-t/2-.005,n/2-.04,-t/2,.72,.82,"screen"),it(-e,-t/2-.015,e,-t/2,.22,.22+e*2,"glass",!0),it(-e*.6,-t/2-.008,e*.6,-t/2,.22+e*.4,.22+e*1.6,"water",!0)]}},mirror:(n,t)=>({bodyRole:"glass",parts:[it(-n/2,-t/2,n/2,t/2,1,1.8,"metal"),it(-n/2+.02,-t/2+.005,n/2-.02,t/2,1.02,1.78,"glass")]}),wall_art:(n,t)=>({bodyRole:"wood",parts:[it(-n/2,-t/2,n/2,t/2,1.1,1.7,"wood"),it(-n/2+.03,-t/2+.01,n/2-.03,t/2,1.13,1.67,"body")]})};function cc(n){return typeof n=="number"&&Number.isFinite(n)&&n>0?n:void 0}function n_(n){const t=bh(n.type);return{w:cc(n.width)??t?.width??1,l:cc(n.length)??t?.length??1}}function i_(n){const{w:t,l:e}=n_(n),i=e_[n.type];if(i){const a=i(t,e);return{parts:a.parts.filter(o=>o!==null),bodyRole:a.bodyRole??"body"}}const s=n.category&&n.category in rc?n.category:"other",r=it(-t/2,-e/2,t/2,e/2,0,rc[s],"body");return{parts:r?[r]:[],bodyRole:"body"}}const zn=new Map;function s_(n){const t=`${n.name??""} ${n.icon??""}`.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"");return/bain|sdb|douche|shower|wc|toilet|eau|lavabo/.test(t)?"mosaic":/cuis|kitchen|buanderie|cellier/.test(t)?"tile":/terrasse|balcon|deck|patio/.test(t)?"deck":/jardin|garden|pelouse|exterieur|cour/.test(t)?"grass":/garage|atelier|cave|sous-sol|parking/.test(t)?"concrete":(/chambre|bed|dressing/.test(t)||/salon|sejour|living|manger|dining|bureau|office|entree|couloir|hall/.test(t),"parquet")}function r_(){if(typeof document>"u")return null;const n=document.createElement("canvas");return n.width=512,n.height=512,n}function a_(n){const s=85.33333333333333,r=["#d8b88d","#d0ad80","#e0c29a","#c8a474","#dab689","#cfab7d"];n.fillStyle="#b88d58",n.fillRect(0,0,512,512);for(let a=0;a<6;a++){const o=a*s;n.fillStyle=r[a%r.length],n.fillRect(0,o,512,s),n.fillStyle="rgba(120, 80, 40, 0.08)";for(let c=0;c<6;c++){const u=o+c/6*s+(a*3+c)%7;n.fillRect(0,u,512,1.5)}n.fillStyle="rgba(70, 40, 20, 0.6)";const l=(a*179+80)%392+60;n.fillRect(l,o,2.5,s),n.fillStyle="rgba(70, 40, 20, 0.55)",n.fillRect(0,o+s-2,512,2),n.fillStyle="rgba(255, 255, 255, 0.2)",n.fillRect(0,o,512,1)}}function o_(n){n.fillStyle="#bbb6ad",n.fillRect(0,0,512,512);const s=[{x:2,y:2,tone:"#e6e3dd"},{x:258,y:2,tone:"#dfdcd6"},{x:2,y:258,tone:"#e2dfd9"},{x:258,y:258,tone:"#e5e1db"}],r=252;for(const a of s){n.fillStyle=a.tone,n.fillRect(a.x,a.y,r,r),n.fillStyle="rgba(0, 0, 0, 0.025)";for(let o=0;o<8;o++){const l=a.x+o*37%r,c=a.y+o*43%r;n.beginPath(),n.arc(l,c,16+o%10,0,Math.PI*2),n.fill()}}}function l_(n){n.fillStyle="#d4d8de",n.fillRect(0,0,512,512);for(let r=0;r<8;r++)for(let a=0;a<8;a++){const o=240+(r*13+a*7)%12;n.fillStyle=`rgb(${o}, ${o+2}, ${o+5})`,n.fillRect(r*64+2,a*64+2,60,60),n.fillStyle="rgba(255, 255, 255, 0.4)",n.fillRect(r*64+3,a*64+3,58,2)}}function c_(n){n.fillStyle="#cfd3d8",n.fillRect(0,0,512,512);for(let i=0;i<16;i++){const s=i*97%512,r=i*71%512,a=40+i%5*25,o=n.createRadialGradient(s,r,5,s,r,a),l=i%2===0?.06:.04,c=i%2===0?"0, 0, 0":"255, 255, 255";o.addColorStop(0,`rgba(${c}, ${l})`),o.addColorStop(1,"rgba(0, 0, 0, 0)"),n.fillStyle=o,n.beginPath(),n.arc(s,r,a,0,Math.PI*2),n.fill()}}function h_(n){n.fillStyle="#2d1c0e",n.fillRect(0,0,512,512);const r=["#a27043","#966439","#aa794c","#8e5e34"];for(let a=0;a<8;a++){const o=a*64;n.fillStyle=r[a%r.length],n.fillRect(0,o,512,60),n.fillStyle="rgba(50, 25, 5, 0.1)",n.fillRect(0,o+64*.3,512,2),n.fillRect(0,o+64*.65,512,1.5)}}function u_(n){n.fillStyle="#548f38",n.fillRect(0,0,512,512);const i=["#62a443","#497e2f","#70b54e","#3e6c27"];for(let s=0;s<240;s++){const r=s*61%512,a=s*47%512;n.fillStyle=i[s%i.length],n.fillRect(r,a,3,5)}}function d_(n){n.fillStyle="#d5d2cc",n.fillRect(0,0,512,512),n.fillStyle="rgba(0, 0, 0, 0.04)";for(let i=0;i<512;i+=4)n.fillRect(i,0,2,512);for(let i=0;i<512;i+=4)n.fillRect(0,i,512,2)}function f_(n){if(n==="none")return null;if(zn.has(n))return zn.get(n)??null;const t=r_();if(!t)return zn.set(n,null),null;const e=t.getContext("2d");if(!e)return zn.set(n,null),null;let i,s;switch(n){case"parquet":a_(e),i=1,s=1;break;case"tile":o_(e),i=1/1.2,s=1/1.2;break;case"mosaic":l_(e),i=1/.8,s=1/.8;break;case"concrete":c_(e),i=.5,s=.5;break;case"deck":h_(e),i=1,s=1;break;case"grass":u_(e),i=1,s=1;break;case"carpet":d_(e),i=1,s=1;break;default:return zn.set(n,null),null}const r=new Qu(t);return r.wrapS=Qi,r.wrapT=Qi,r.repeat.set(i,s),r.colorSpace=Ge,zn.set(n,r),r}function p_(){for(const n of zn.values())n&&n.dispose();zn.clear()}const m_=2.5,g_=1.2,__=.35,x_=.1,v_=.05,ea=.01,hc=.03,eo=.04,M_=.045,uh=.05,uc=.008,na=1,ia=.9,sa=.6,dc=.005;function Pi(n){const t=n.defaultCeilingHeight;return typeof t=="number"&&Number.isFinite(t)&&t>0?t:m_}function fc(n,t,e,i,s){const r=o=>{const l=(o.x-t.x)*e.x+(o.y-t.y)*e.y-i;return s?-l:l},a=[];for(let o=0;o<n.length;o++){const l=n[o],c=n[(o+1)%n.length],u=r(l),d=r(c);if(u>=0&&a.push(l),u>=0!=d>=0){const h=u/(u-d);a.push({x:l.x+(c.x-l.x)*h,y:l.y+(c.y-l.y)*h})}}return a}function S_(n,t,e,i,s){return fc(fc(n,t,e,i,!1),t,e,s,!0)}function y_(n,t,e,i){const s=(m,g,v)=>({polygon:m,bottom:g,top:v,role:"wall",topRole:v>=e-1e-6?"wall-top":void 0}),r=Math.hypot(n.end.x-n.start.x,n.end.y-n.start.y);if(i.length===0||!(r>0))return[s([...t],0,e)];const a={x:(n.end.x-n.start.x)/r,y:(n.end.y-n.start.y)/r},o=t.map(m=>(m.x-n.start.x)*a.x+(m.y-n.start.y)*a.y),l=Math.min(...o),c=Math.max(...o),u=[],d=(m,g,v,p)=>{if(g-m<dc||p-v<1e-4)return;const f=S_(t,n.start,a,m,g);f.length>=3&&u.push(s(f,v,p))};let h=l;for(const m of[...i].sort((g,v)=>g.lo-v.lo)){const g=Math.max(m.lo,h),v=Math.min(m.hi,c);v-g<dc||(d(h,g,0,e),d(g,v,0,m.bottom),d(g,v,m.top,e),h=v)}return d(h,c,0,e),u}function ar(n,t,e){return{x:n.origin.x+n.u.x*t+n.n.x*e,y:n.origin.y+n.u.y*t+n.n.y*e}}function Je(n,t,e,i,s){return[[t,e],[i,e],[i,s],[t,s]].map(([a,o])=>n?ar(n,a,o):{x:a,y:o})}function rn(n,t,e,i){return e-t>1e-4?{polygon:n,bottom:t,top:e,role:i}:null}function bo(n){return n.filter(t=>t!==null)}function ra(n,t,e){const i=Math.min(M_,n/4,(e-t)/4),s=uh/2;return bo([rn(Je(null,0,-s,n,s),t,t+i,"frame"),rn(Je(null,0,-s,n,s),e-i,e,"frame"),rn(Je(null,0,-s,i,s),t+i,e-i,"frame"),rn(Je(null,n-i,-s,n,s),t+i,e-i,"frame"),rn(Je(null,i,-uc/2,n-i,uc/2),t+i,e-i,"glass")])}function pc(n,t,e){const i=eo/2,s=na<e-.1&&n>.3?[-1,1].map(r=>rn(Je(null,n-.16,r*i,n-.06,r*(i+.05)),na-.015,na+.015,"metal")):[];return bo([rn(Je(null,.004,-i,n-.004,i),t+.004,e,"door"),...s])}function b_(n){return Math.atan2(n.y,n.x)}function yi(n,t,e,i,s,r,a){const o=i>0?n.angle:n.angle+Math.PI,l=(i>0?1:-1)*s;return{pivot:ar(n,t,e),angle:o,swing:l*(Math.PI/2)*r,slide:0,parts:a}}function E_(n,t,e,i){const s=Math.hypot(t.end.x-t.start.x,t.end.y-t.start.y),r=Math.max(0,n.width);if(!(s>0)||r<.1)return null;const a={x:(t.end.x-t.start.x)/s,y:(t.end.y-t.start.y)/s},o={origin:{x:t.start.x+a.x*n.offset,y:t.start.y+a.y*n.offset},u:a,n:{x:-a.y,y:a.x},angle:b_(a)},[l,c]=Ah(n,e);if(l>=i-.02)return null;const u=Math.min(c,i),d=c<=i,h=r/2,m=Math.min(v_,r/4),g=Math.max(0,t.thickness)/2+ea,v=n.type==="window",p=v?l+m:l,f=d?u-m:u,E=r-m*2,A=n.flipSide?-1:1,S=bo([rn(Je(o,-h,-g,-h+m,g),l,u,"frame"),rn(Je(o,h-m,-g,h,g),l,u,"frame"),d?rn(Je(o,-h+m,-g,h-m,g),u-m,u,"frame"):null,v?rn(Je(o,-h,A>0?-g-hc:-g,h,A>0?g:g+hc),l,l+m,"frame"):null]),y=[];if(f-p>.05&&E>.05)switch(n.type){case"door":{const R=n.flipDirection?-1:1,x=A*Math.max(0,g-ea-eo/2-.005);y.push(yi(o,-R*(h-m),x,R,A,ia,pc(E,p,f)));break}case"double_door":{const R=A*Math.max(0,g-ea-eo/2-.005),x=pc(E/2,p,f);y.push(yi(o,-(h-m),R,1,A,ia,x),yi(o,h-m,R,-1,A,ia,x));break}case"sliding_door":{const R=E*.55,x=Math.min(uh,g),w=ra(R,p,f);y.push({pivot:ar(o,-h+m,-x/2),angle:o.angle,swing:0,slide:E-R,parts:w},{pivot:ar(o,h-m-R,x/2),angle:o.angle,swing:0,slide:0,parts:w});break}default:{if((v?wh(n):n.sashCount===1?1:2)===2){const x=ra(E/2,p,f);y.push(yi(o,-(h-m),0,1,A,sa,x),yi(o,h-m,0,-1,A,sa,x))}else{const x=n.flipDirection?-1:1;y.push(yi(o,-x*(h-m),0,x,A,sa,ra(E,p,f)))}break}}const T={openingId:n.id,wallId:t.id,type:n.type,bottom:l,top:u,frame:S,leaves:y};return n.entityId&&(T.entityId=n.entityId),T}function T_(n,t,e,i,s){if(!s)return Je(null,n,t,e,i);const r=(n+e)/2,a=(t+i)/2,o=(e-n)/2,l=(i-t)/2;return Array.from({length:8},(c,u)=>{const d=(u+.5)*Math.PI/4;return{x:r+o*Math.cos(d),y:a+l*Math.sin(d)}})}function A_(n){const t=i_(n),e=(n.rotation||0)%360*Math.PI/180,i=Math.cos(e),s=Math.sin(e),r=o=>({x:n.position.x+o.x*i-o.y*s,y:n.position.y+o.x*s+o.y*i}),a=pr(n.color);return{itemId:n.id,prisms:t.parts.map(o=>{const l=o.role==="body",c={polygon:T_(o.x0,o.y0,o.x1,o.y1,o.round===!0).map(r),bottom:o.z0,top:o.z1,role:l?t.bodyRole:o.role};return l&&a&&(c.color={...a,a:1}),c})}}function w_(n){let t=1/0,e=1/0,i=-1/0,s=-1/0;for(const r of n)!Number.isFinite(r.x)||!Number.isFinite(r.y)||(t=Math.min(t,r.x),e=Math.min(e,r.y),i=Math.max(i,r.x),s=Math.max(s,r.y));return t<=i?{minX:t,minY:e,maxX:i,maxY:s}:null}function mr(n){return n.filter(t=>Array.isArray(t.polygon)&&t.polygon.length>=3)}function R_(n){const t=_c(n.walls),e=xc(n.walls,n.rooms,n.defaultCeilingHeight),i=[];let s=0;for(const r of n.walls){const a=t.get(r.id);if(!a)continue;const o=e.get(r.id)??Pi(n);s=Math.max(s,o),i.push({polygon:a,bottom:0,top:o,role:"wall"})}for(const r of mr(n.rooms))r.polygon&&r.polygon.length>=3&&i.push({polygon:r.polygon,bottom:0,top:.05,role:"wall",topRole:"wall-top"});return{prisms:i,height:s||Pi(n)}}function C_(n,t,e){const i=_c(n.walls),s=xc(n.walls,n.rooms,n.defaultCeilingHeight),r=new Map(n.walls.map(p=>[p.id,p])),a=new Map;for(const p of n.openings){if(!r.has(p.wallId))continue;const f=a.get(p.wallId);f?f.push(p):a.set(p.wallId,[p])}const o=[],l=[];let c=0;for(const p of n.walls){const f=i.get(p.id);if(!f)continue;const E=s.get(p.id)??Pi(n),A=e.cutWalls?E/2:E;c=Math.max(c,A);const S=[];for(const y of a.get(p.id)??[]){const T=E_(y,p,E,A);T&&(l.push(T),S.push({lo:y.offset-y.width/2,hi:y.offset+y.width/2,bottom:T.bottom,top:T.top}))}o.push({wallId:p.id,height:A,prisms:y_(p,f,A,S)})}const u=mr(n.rooms),d=u.map(p=>({roomId:p.id,polygon:p.polygon,color:pr(p.color),textureType:s_(p)})),h=u.map(p=>{const f=typeof p.height=="number"&&p.height>0?p.height:Pi(n);return{roomId:p.id,position:Eh.labelPoint(p.polygon),height:(e.cutWalls?f/2:f)+x_,name:p.name,areaM2:p.areaM2}}),m=(n.furniture??[]).map(A_);for(const p of m)for(const f of p.prisms)c=Math.max(c,f.top);const g=[...o.flatMap(p=>p.prisms.flatMap(f=>f.polygon)),...u.flatMap(p=>p.polygon),...m.flatMap(p=>p.prisms.flatMap(f=>f.polygon)),...n.bindings.map(p=>p.position).filter(p=>!!p)],v=!!t&&t.walls.length>0;return{walls:o,openings:l,floors:d,labels:h,furniture:m,ghost:v?R_(t):null,bounds:w_(g),maxHeight:c||Pi(n)}}function P_(n,t,e){return JSON.stringify([n.walls,n.openings,n.rooms,n.furniture??[],n.defaultCeilingHeight??null,t?[t.walls,t.rooms,t.defaultCeilingHeight??null]:null,e.cutWalls])}function D_(n){return n.filter(t=>typeof t.entityId=="string"&&t.position&&Number.isFinite(t.position.x)&&Number.isFinite(t.position.y)).map(t=>({bindingId:t.id,entityId:t.entityId,position:t.position}))}function Yi(n,t,e){return`${n} ${n>1?e:t}`}function aa(n,t){const e=[Yi(mr(n.rooms).length,"pièce","pièces"),Yi(n.walls.length,"mur","murs"),Yi(n.openings.length,"ouverture","ouvertures"),Yi((n.furniture??[]).length,"meuble","meubles"),Yi(n.bindings.length,"équipement","équipements")];return`Vue 3D${t?" (lecture seule)":""} du plan « ${n.name} » : ${e.join(", ")}`}const L_=zt(255,214,170);function I_(n){const t=n.attributes?.rgb_color;if(Array.isArray(t)&&t.length>=3){const[s,r,a]=t.slice(0,3).map(ei);if(s!==null&&r!==null&&a!==null)return zt(s,r,a)}const e=ei(n.attributes?.color_temp_kelvin);if(e!==null&&e>0)return nc(e);const i=ei(n.attributes?.color_temp);return i!==null&&i>0?nc(1e6/i):L_}function U_(n,t="auto",e=0){const i=typeof t=="boolean"?t?"night":"auto":t,s=n?.states?.["sun.sun"];let r=ei(s?.attributes?.elevation),a=ei(s?.attributes?.azimuth);i==="night"?(r=-15,a=0):i==="day"?(r=50,a=210):(r===null||a===null)&&(r=45,a=225);const o=r*Math.PI/180,c=((a-(e||0))%360+360)%360*Math.PI/180,u=Math.sin(c)*Math.cos(Math.max(.08,o)),d=Math.sin(Math.max(.08,o)),h=Math.cos(c)*Math.cos(Math.max(.08,o));if(r<=-.8)return{azimuthDeg:a,elevationDeg:r,dirX:u,dirY:Math.max(.35,d),dirZ:h,intensity:.22,color:zt(59,130,246),ambientIntensity:.35,isNight:!0};if(r<8){const g=Math.max(0,r)/8;return{azimuthDeg:a,elevationDeg:r,dirX:u,dirY:d,dirZ:h,intensity:.6+g*.8,color:zt(255,Math.round(160+g*90),Math.round(100+g*155)),ambientIntensity:.5+g*.7,isNight:!1}}return{azimuthDeg:a,elevationDeg:r,dirX:u,dirY:d,dirZ:h,intensity:Math.min(1.8,1.2+Math.sin(o)*.6),color:zt(255,255,255),ambientIntensity:1.5,isNight:!1}}function N_(n,t){const e=new Map(n.rooms.map(r=>[r.id,r])),i=Pi(n),s=[];for(const r of n.bindings){if(typeof r.entityId!="string"||vc(r.entityId)!=="light"||!r.position)continue;const a=t?.states?.[r.entityId];if(!a||a.state!=="on")continue;const o=ei(a.attributes?.brightness),l=r.roomId?e.get(r.roomId)?.height:void 0,c=(typeof l=="number"&&l>0?l:i)-__;s.push({bindingId:r.id,position:r.position,height:Math.max(.5,c),color:I_(a),level:o===null?1:Math.min(1,Math.max(0,o/255))})}return s.sort((r,a)=>a.level-r.level)}function F_(n,t,e){const i=n.bindings.filter(r=>typeof r.entityId=="string"),s=new Map;for(const r of mr(n.rooms)){const a=Th(r,i,t,e),o=pr(a.fill);o?a.illuminated?s.set(r.id,{tint:o,strength:Math.min(.6,o.a*1.6),glow:hh(o,o.a*.9),temperature:null}):s.set(r.id,{tint:o,strength:.7,glow:null,temperature:a.temperature}):s.set(r.id,{tint:null,strength:0,glow:null,temperature:a.temperature})}return s}const O_=new Set(["on","open","opening","closing"]);function B_(n,t){if(!n)return{open:!1,status:"unbound"};const e=t?.states?.[n];if(!t?.states)return{open:!1,status:"ok"};if(!e)return{open:!1,status:"missing"};if(e.state==="unavailable"||e.state==="unknown")return{open:!1,status:"unavailable"};const i=ei(e.attributes?.current_position);return{open:O_.has(e.state)||vc(n)==="cover"&&i!==null&&i>0,status:"ok"}}function dh(n,t,e){const i=t?sr(n,t,t.a>=.99?.75:.4):n;return e?.tint?sr(i,e.tint,e.strength):i}function ti(n,t){const e=document.createElement("span");return e.className=n,t.append(e),e}class k_{constructor(t){this.handlers=t,this.group=new _n,this.entries=new Map,this.group.name="home-architect-markers"}sync(t){const e=new Set(t.map(i=>i.bindingId));for(const[i,s]of this.entries)e.has(i)||(s.object.removeFromParent(),this.entries.delete(i));for(const i of t)(this.entries.get(i.bindingId)??this.create(i.bindingId)).object.position.set(i.position.x,g_,i.position.y)}create(t){const e=document.createElement("div");e.className="marker";const i=ti("marker-icon",e);i.setAttribute("aria-hidden","true");const s=ti("marker-tip",e);s.setAttribute("aria-hidden","true");const r=ti("marker-name",s),a=ti("marker-state",s),o=this.handlers;e.addEventListener("pointerdown",u=>o.pointerDown(t,u)),e.addEventListener("pointermove",u=>o.pointerMove(u)),e.addEventListener("pointerup",u=>o.pointerUp(u)),e.addEventListener("pointercancel",u=>o.pointerCancel(u)),e.addEventListener("click",u=>o.click(t,u)),e.addEventListener("dblclick",u=>o.dblClick(t,u)),e.addEventListener("keydown",u=>o.keyDown(t,u)),e.addEventListener("contextmenu",u=>o.contextMenu(u));const l=new ch(e);l.renderOrder=1,this.group.add(l);const c={object:l,element:e,icon:i,name:r,state:a,key:""};return this.entries.set(t,c),c}update(t){for(const[e,i]of this.entries){const s=t.get(e);if(!s)continue;const{view:r}=s,a=s.glow?`rgb(${s.glow.r}, ${s.glow.g}, ${s.glow.b})`:"",o=`${r.name} : ${r.stateText}`,l=[r.icon,o,r.status,r.unavailable,r.orphan,r.radar,r.playing,s.selected,s.focusable,a].join("|");if(l===i.key)continue;i.key=l;const c=i.element;c.className="marker",c.classList.add(`status-${r.status}`),c.classList.toggle("selected",s.selected),c.classList.toggle("unavailable",r.unavailable),c.classList.toggle("orphan",r.orphan),c.classList.toggle("radar",r.radar),c.classList.toggle("playing",r.playing),c.classList.toggle("lit",a!==""),a?c.style.setProperty("--marker-glow",a):c.style.removeProperty("--marker-glow"),s.focusable?(c.setAttribute("role","button"),c.tabIndex=0):(c.removeAttribute("role"),c.removeAttribute("tabindex")),c.setAttribute("aria-label",o),i.icon.textContent=r.icon,i.name.textContent=r.name,i.state.textContent=r.stateText}}dispose(){for(const t of this.entries.values())t.object.removeFromParent();this.entries.clear(),this.group.removeFromParent()}}class z_{constructor(){this.group=new _n,this.entries=new Map,this.group.name="home-architect-room-labels"}sync(t){this.clear();for(const e of t){const i=document.createElement("div");i.className="room-label",ti("room-label-name",i).textContent=e.name,ti("room-label-area",i).textContent=`${e.areaM2.toFixed(1)} m²`;const s=ti("room-label-temp",i);s.hidden=!0;const r=new ch(i);r.position.set(e.position.x,e.height,e.position.y),this.group.add(r),this.entries.set(e.roomId,{object:r,temperature:s})}}updateTemperatures(t){for(const[e,i]of this.entries){const s=t.get(e)??"";i.temperature.textContent===s&&i.temperature.hidden===(s==="")||(i.temperature.textContent=s,i.temperature.hidden=s==="")}}clear(){for(const t of this.entries.values())t.object.removeFromParent();this.entries.clear()}dispose(){this.clear(),this.group.removeFromParent()}}const H_=.004,G_=6;class fh{constructor(){this.positions=[],this.normals=[],this.colors=[],this.uvs=[]}triangle(t,e,i,s,r,a,o,l){const c=new D().subVectors(e,t),u=new D().subVectors(i,t),d=c.cross(u).dot(s)<0,h=d?[t,i,e]:[t,e,i],m=d?[a,l,o]:[a,o,l];for(let g=0;g<3;g++){const v=h[g];this.positions.push(v.x,v.y,v.z),this.normals.push(s.x,s.y,s.z),this.colors.push(r.r,r.g,r.b);const p=m[g];this.uvs.push(p?p.x:0,p?p.y:0)}}toGeometry(){if(this.positions.length===0)return null;const t=new Qe;return t.setAttribute("position",new Te(this.positions,3)),t.setAttribute("normal",new Te(this.normals,3)),t.setAttribute("color",new Te(this.colors,3)),t.setAttribute("uv",new Te(this.uvs,2)),t.computeBoundingSphere(),t}}function V_(n){let t=0;for(let e=0;e<n.length;e++){const i=n[e],s=n[(e+1)%n.length];t+=i.x*s.y-s.x*i.y}return t/2}const ph=new D(0,1,0),W_=new D(0,-1,0);function no(n,t,e,i,s){const r=t.map(a=>new Ct(a.x,a.y));for(const[a,o,l]of vo.triangulateShape(r,[])){const c=d=>new D(t[d].x,e,t[d].y),u=d=>new Ct(t[d].x,t[d].y);n.triangle(c(a),c(o),c(l),i,s,u(a),u(o),u(l))}}function X_(n,t,e){const i=t.polygon,s=V_(i);if(i.length<3||Math.abs(s)<1e-8||t.top-t.bottom<1e-5)return;const r=e(t.role,t.color),a=s>0?1:-1;for(let o=0;o<i.length;o++){const l=i[o],c=i[(o+1)%i.length],u=Math.hypot(c.x-l.x,c.y-l.y);if(u<1e-7)continue;const d=new D(a*(c.y-l.y)/u,0,-a*(c.x-l.x)/u),h=new D(l.x,t.bottom,l.y),m=new D(c.x,t.bottom,c.y),g=new D(c.x,t.top,c.y),v=new D(l.x,t.top,l.y);n.triangle(h,m,g,d,r),n.triangle(h,g,v,d,r)}no(n,i,t.top,ph,t.topRole?e(t.topRole):r),t.bottom>1e-4&&no(n,i,t.bottom,W_,r)}function or(n,t){const e=new Map,i=(r,a)=>{const o=a??t.roles[r],l=`${o.r},${o.g},${o.b}`;let c=e.get(l);return c||(c=Ne(o),e.set(l,c)),c},s=new fh;for(const r of n)X_(s,r,i);return s.toGeometry()}function $s(n,t){n.userData.pick=t}function Y_(n){for(let t=n;t;t=t.parent){const e=t.userData.pick;if(e)return e}return null}function io(n,t,e,i){const s=or(t.filter(o=>o.role!=="glass"),e.palette),r=or(t.filter(o=>o.role==="glass"),e.palette);let a=null;if(s&&(a=new Fe(s,e.surface),a.castShadow=i.cast,a.receiveShadow=i.receive,n.add(a)),r){const o=new Fe(r,e.glass);o.receiveShadow=i.receive,o.renderOrder=1,n.add(o)}return a}function so(n,t){const{model:e,pivot:i}=n;i.position.set(e.pivot.x+Math.cos(e.angle)*e.slide*t,0,e.pivot.y+Math.sin(e.angle)*e.slide*t),i.rotation.y=-(e.angle+e.swing*t)}function q_(n,t){const e=new _n;$s(e,{kind:"opening",id:n.openingId});const i=[],s=io(e,n.frame,t,{cast:!0,receive:!0});s&&i.push(s);const r=n.leaves.map(a=>{const o=new _n,l=io(o,a.parts,t,{cast:!0,receive:!0});l&&i.push(l);const c={pivot:o,model:a};return so(c,0),e.add(o),c});return{group:e,built:{model:n,meshes:i,leaves:r}}}function Z_(n,t,e,i){const s=new fh;no(s,n,H_,ph,new Ft(1,1,1));const r=s.toGeometry();if(!r)return null;r.deleteAttribute("color");const a=i?f_(i):null,o={color:Ne(dh(e.floor,t,void 0))};a&&(o.map=a);const l=new Jn(o),c=new Fe(r,l);return c.receiveShadow=!0,{mesh:c,material:l}}function K_(n,t){const e=t.palette,i=new _n;i.name="home-architect-plan";const s=[],r=new Map;for(const A of n.walls){const S=or(A.prisms,e);if(!S)continue;const y=new Fe(S,t.surface);y.castShadow=!0,y.receiveShadow=!0,$s(y,{kind:"wall",id:A.wallId}),i.add(y),r.set(A.wallId,y),s.push(y)}const a=new Map;for(const A of n.openings){const{group:S,built:y}=q_(A,t);i.add(S),a.set(A.openingId,y),s.push(S)}const o=new Map;for(const A of n.floors){const S=Z_(A.polygon,A.color,e,A.textureType);S&&($s(S.mesh,{kind:"room",id:A.roomId}),i.add(S.mesh),o.set(A.roomId,{...S,color:A.color}),s.push(S.mesh))}const l=new Map;for(const A of n.furniture){const S=new _n;$s(S,{kind:"furniture",id:A.itemId});const y=io(S,A.prisms,t,{cast:!0,receive:!0});S.children.length!==0&&(i.add(S),y&&l.set(A.itemId,y),s.push(S))}let c=0;if(n.ghost){const A=or(n.ghost.prisms,e);if(A){const S=new Fe(A,t.ghost);S.position.y=-n.ghost.height,S.renderOrder=2,i.add(S),c=-n.ghost.height}}const u=n.bounds??{minX:-5,minY:-5,maxX:5,maxY:5},d=new D((u.minX+u.maxX)/2,0,(u.minY+u.maxY)/2),h=Math.max(u.maxX-u.minX,u.maxY-u.minY,1),m=Math.hypot(u.maxX-u.minX,u.maxY-u.minY,n.maxHeight)/2||1,g=Math.ceil(h+G_*2),v=new Fe(new cs(g,g),t.ground);v.rotation.x=-Math.PI/2,v.position.set(d.x,c-.002,d.z),v.receiveShadow=!0,i.add(v);const p=Ne(e.grid),f=new Id(g,g,p,p);f.position.set(d.x,c,d.z),i.add(f);const E=new Ui(new D(u.minX,c,u.minY),new D(u.maxX,n.maxHeight,u.maxY));return{root:i,walls:r,openings:a,furniture:l,floors:o,pickables:s,center:d,radius:m,box:E}}function oa(n,t=new Set){n.traverse(e=>{const i=e;i.geometry?.dispose();const s=i.material;for(const r of Array.isArray(s)?s:s?[s]:[])if(!t.has(r)){for(const a of Object.values(r))a instanceof Ae&&a.dispose();r.dispose()}}),n.removeFromParent()}var $_=Object.defineProperty,Be=(n,t,e,i)=>{for(var s=void 0,r=n.length-1,a;r>=0;r--)(a=n[r])&&(s=a(t,e,s)||s);return s&&$_(t,e,s),s};const la={pitchDeg:45,yawDeg:-35},J_=40,Q_=.01,mh=82*Math.PI/180,Hs=.8,j_=1.1,tx=.12,Gs=450,ex=200,nx=600,ix=4,sx=14,rx=2,mc=2048,ax="Ctrl (⌘ sur Mac) + molette pour zoomer",ox="Vue 3D indisponible sur cet appareil (WebGL).";function lx(){return typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion: reduce)").matches}function Ie(n){return n*Math.PI/180}function bi(n){return n*180/Math.PI}function ca(n){return Math.min(mh,Math.max(Q_,n))}function gc(n){return 1-Math.pow(1-n,3)}const Co=class Co extends Rh{constructor(){super(...arguments),this.ghostProject=null,this.showThermalHeatmap=!1,this.interactive=!1,this.readOnly=!1,this.dashboard=!1,this.selectedElements=zo(),this.scheme="dark",this.animations=!0,this.shadows=!0,this.cutWalls=!1,this.walkthrough=!1,this.lightingMode="auto",this.nightMode=!1,this.intro=null,this.walkthroughHudDrag=new Ch(()=>this.renderRoot.querySelector(".walkthrough-hud"),()=>this,{storageKey:"home_architect_walkthrough_hud_pos",onPositionChanged:()=>this.requestUpdate()}),this.three=null,this.frame=null,this.hoverFrame=null,this.hoverPoint=null,this.dirty=!1,this.onScreen=!0,this.size={width:0,height:0},this.fitted=!1,this.signature="",this.geometryRefs=[],this.projectId=null,this.cameraTween=null,this.lastCamera="",this.zoomReference=1,this.openness=new Map,this.openingStatus=new Map,this.floorState=new Map,this.resizeObserver=null,this.intersectionObserver=null,this.press=null,this.activePointers=new Set,this.ndc=new Ct,this.groundPlane=new dn(new D(0,1,0),0),this.keysDown=new Set,this.walkthroughLastTime=0,this.isPointerLooking=!1,this.pointerLookStart={x:0,y:0},this.walkthroughEuler={yaw:0,pitch:0},this.markerGestures=new Ph({onTap:t=>this.runMarkerAction(t,"tap"),onDoubleTap:t=>this.runMarkerAction(t,"double_tap"),onHold:t=>this.runMarkerAction(t,"hold"),waitsForDoubleTap:t=>{const e=this.binding(t);return!!e&&Dh(e,"tap").kind!=="more-info"}}),this.watchedEntityIds=Ho((t,e)=>[...Lh(t,e),"sun.sun"]),this.markerModelsOf=Ho(t=>D_(t)),this.markerGlow=new Map,this.onControlsStart=()=>{this.cameraTween=null},this.requestRender=()=>{if(this.three){if(!this.renderable()){this.dirty=!0;return}this.frame===null&&(this.frame=requestAnimationFrame(this.renderFrame))}},this.onKeyDown=t=>{if(!this.walkthrough)return;const e=t.target?.tagName?.toLowerCase();if(e==="input"||e==="textarea"||e==="select")return;const i=t.code.toLowerCase();["keyw","keya","keys","keyd","keyz","keyq","arrowup","arrowdown","arrowleft","arrowright","shiftleft","shiftright"].includes(i)&&(this.keysDown.add(i),this.requestRender())},this.onKeyUp=t=>{const e=t.code.toLowerCase();this.keysDown.delete(e)},this.renderFrame=t=>{this.frame=null;const e=this.three;if(!e)return;if(!this.renderable()){this.dirty=!0;return}this.dirty=!1,this.walkthrough||e.controls.update();let i=this.walkthrough?this.stepWalkthrough(t):this.stepCameraTween(t);i=this.stepOpenings()||i,e.renderer.render(e.scene,e.camera),e.labelRenderer.render(e.scene,e.camera),this.walkthrough||this.emitCamera(),i&&this.requestRender()},this.lastOpeningStep=0,this.onVisibilityChange=()=>{!document.hidden&&this.dirty&&this.requestRender()},this.onWheelCapture=t=>{!this.dashboard||t.ctrlKey||t.metaKey||(t.stopPropagation(),this.emitHint(ax))},this.onCanvasPointerDown=t=>{if(this.activePointers.add(t.pointerId),this.walkthrough&&t.button===0&&(this.isPointerLooking=!0,this.pointerLookStart={x:t.clientX,y:t.clientY}),this.activePointers.size>1||t.button!==0||!t.isPrimary){this.press=null;return}this.press={id:t.pointerId,x:t.clientX,y:t.clientY,type:t.pointerType,modifier:t.shiftKey||t.ctrlKey||t.metaKey}},this.onCanvasPointerUp=t=>{this.activePointers.delete(t.pointerId),this.walkthrough&&(this.isPointerLooking=!1);const e=this.press;!e||e.id!==t.pointerId||(this.press=null,!Ih({x:e.x,y:e.y},{x:t.clientX,y:t.clientY},e.type)&&this.pick(t.clientX,t.clientY,e.modifier,!1))},this.onCanvasPointerCancel=t=>{this.activePointers.delete(t.pointerId),this.walkthrough&&(this.isPointerLooking=!1),this.press=null},this.onCanvasDblClick=t=>{this.dashboard||this.pick(t.clientX,t.clientY,!1,!0)},this.onCanvasPointerMove=t=>{if(this.walkthrough&&this.isPointerLooking&&this.three){const e=t.clientX-this.pointerLookStart.x,i=t.clientY-this.pointerLookStart.y;this.pointerLookStart={x:t.clientX,y:t.clientY};const s=.0035;this.walkthroughEuler.yaw-=e*s,this.walkthroughEuler.pitch-=i*s,this.walkthroughEuler.pitch=Math.max(-Math.PI/2.2,Math.min(Math.PI/2.2,this.walkthroughEuler.pitch)),this.three.camera.rotation.set(0,0,0),this.three.camera.rotation.order="YXZ",this.three.camera.rotation.y=this.walkthroughEuler.yaw,this.three.camera.rotation.x=this.walkthroughEuler.pitch,this.requestRender();return}this.dashboard||t.buttons!==0||(this.hoverPoint={x:t.clientX,y:t.clientY},this.hoverFrame===null&&(this.hoverFrame=requestAnimationFrame(this.emitHover)))},this.emitHover=()=>{this.hoverFrame=null;const t=this.three,e=this.hoverPoint;if(!t||!e||!this.setRay(e.x,e.y))return;const i=t.raycaster.ray.intersectPlane(this.groundPlane,new D);i&&this.dispatchEvent(new CustomEvent("view3d-hover",{detail:{point:{x:i.x,y:i.z}}}))}}setCamera(t){this.tweenTo({polar:Ie(t.pitchDeg),azimuth:Ie(t.yawDeg)},Gs)}rotateQuarterTurn(){const t=this.cameraTween?.to.azimuth??this.pose()?.azimuth;t!==void 0&&this.tweenTo({azimuth:t-Math.PI/2},Gs)}fitToView(){this.updateComplete.then(()=>{const t=this.cameraTween?.to??this.pose(),e=t&&this.fitPose(t.polar,t.azimuth);e&&this.tweenTo(e,Gs)})}zoomBy(t){const e=this.three,i=this.pose();if(!e||!i||!(t>0))return;const s=Math.min(e.controls.maxDistance,Math.max(e.controls.minDistance,(this.cameraTween?.to.distance??i.distance)/t));this.tweenTo({distance:s},ex)}resetView(){const t={polar:Ie(la.pitchDeg),azimuth:Ie(la.yawDeg)},e=this.fitPose(t.polar,t.azimuth);e&&this.tweenTo({...e,...t},Gs)}connectedCallback(){super.connectedCallback(),this.hasUpdated&&!this.three&&this.initialize()}disconnectedCallback(){super.disconnectedCallback(),this.teardown()}firstUpdated(){this.initialize()}updated(t){super.updated(t);const e=this.three;if(!e||!this.project)return;t.has("scheme")&&this.applyPalette();const i=this.rebuildIfNeeded(),s=t.has("hass")&&Nh(t.get("hass"),this.hass,this.watchedEntityIds(this.project.bindings,this.project.openings));i||t.has("project")?(e.markers.sync(this.markerModelsOf(this.project.bindings)),e.renderer.domElement.setAttribute("aria-label",aa(this.project,this.readOnly))):t.has("readOnly")&&e.renderer.domElement.setAttribute("aria-label",aa(this.project,this.readOnly)),i||s||t.has("project")||t.has("showThermalHeatmap")?this.applyEntityState(i):(t.has("selectedElements")||t.has("interactive")||t.has("dashboard"))&&(this.applyMaterials(),this.updateMarkers()),t.has("shadows")&&this.applyShadows(),t.has("dashboard")&&this.applyTouchPolicy(),t.has("animations")&&(e.controls.enableDamping=this.motionAllowed()),(t.has("lightingMode")||t.has("nightMode"))&&this.applyEntityState(!1),t.has("walkthrough")&&this.applyWalkthroughMode(),this.walkthroughHudDrag.applyStoredPosition(),this.requestRender()}render(){return Go`
      <div class="stage"></div>
      ${this.walkthrough?Go`
        <div
          class="walkthrough-hud"
          role="status"
          aria-live="polite"
          style=${this.walkthroughHudDrag.styleString}
          @pointerdown=${this.walkthroughHudDrag.handlePointerDown}
          @pointermove=${this.walkthroughHudDrag.handlePointerMove}
          @pointerup=${this.walkthroughHudDrag.handlePointerUp}
          @pointercancel=${this.walkthroughHudDrag.handlePointerUp}
        >
          ${Oh(this.walkthroughHudDrag,"Déplacer la barre de navigation")}
          <span class="walkthrough-hud-badge">🚶 Visite virtuelle</span>
          <span><kbd>Z</kbd><kbd>Q</kbd><kbd>S</kbd><kbd>D</kbd> / Flèches pour marcher</span>
          <span>• Glisser pour pivoter à 360°</span>
        </div>
      `:Fh}
    `}initialize(){const t=this.renderRoot.querySelector(".stage");if(!t||this.three)return;let e;try{e=new I0({antialias:!0,powerPreference:"default"})}catch(g){console.warn("[home-architect] Vue 3D WebGL indisponible :",g),this.dispatchEvent(new CustomEvent("view3d-error",{detail:{message:ox}}));return}e.setPixelRatio(Math.min(window.devicePixelRatio||1,rx)),e.shadowMap.type=Mc;const i=e.domElement;i.setAttribute("role","img"),t.append(i);const s=new Z0;s.domElement.className="labels",t.append(s.domElement);const r=new zu,a=new qe(J_,1,.1,500),o=new N0(a,i);o.enableDamping=this.motionAllowed(),o.dampingFactor=tx,o.minPolarAngle=0,o.maxPolarAngle=mh,o.minDistance=Hs,o.screenSpacePanning=!1,o.addEventListener("change",this.requestRender),o.addEventListener("start",this.onControlsStart);const l=new Td(16777215,8947848,1.6),c=new Cd(16777215,1.5);c.shadow.mapSize.set(mc,mc),c.shadow.bias=-4e-4,c.shadow.normalBias=.02,c.shadow.radius=3;const u=Array.from({length:ix},()=>new wd(16777215,0,0,2));r.add(l,c,c.target,...u);const d=new sc(ic(this,this.scheme)),h=new k_({pointerDown:(g,v)=>this.onMarkerPointerDown(g,v),pointerMove:g=>this.markerGestures.move(g.clientX,g.clientY),pointerUp:()=>this.markerGestures.up(),pointerCancel:()=>this.markerGestures.cancel(),click:(g,v)=>this.onMarkerClick(g,v),dblClick:(g,v)=>this.onMarkerDblClick(g,v),keyDown:(g,v)=>this.onMarkerKeyDown(g,v),contextMenu:g=>{this.dashboard&&g.preventDefault()}}),m=new z_;r.add(h.group,m.group),this.three={renderer:e,labelRenderer:s,scene:r,camera:a,controls:o,sun:c,sky:l,lamps:u,materials:d,markers:h,labels:m,raycaster:new Ld,built:null},this.signature="",this.geometryRefs=[],this.projectId=null,this.fitted=!1,this.lastCamera="",this.size={width:0,height:0},this.applyPalette(),this.applyShadows(),this.applyTouchPolicy(),i.addEventListener("pointerdown",this.onCanvasPointerDown),i.addEventListener("pointerup",this.onCanvasPointerUp),i.addEventListener("pointercancel",this.onCanvasPointerCancel),i.addEventListener("pointermove",this.onCanvasPointerMove),i.addEventListener("dblclick",this.onCanvasDblClick),i.addEventListener("webglcontextrestored",this.requestRender),t.addEventListener("wheel",this.onWheelCapture,{capture:!0,passive:!0}),document.addEventListener("visibilitychange",this.onVisibilityChange),window.addEventListener("keydown",this.onKeyDown),window.addEventListener("keyup",this.onKeyUp),typeof ResizeObserver<"u"&&(this.resizeObserver=new ResizeObserver(g=>{const v=g[g.length-1]?.contentRect;v&&this.resize(v.width,v.height)}),this.resizeObserver.observe(t)),typeof IntersectionObserver<"u"&&(this.intersectionObserver=new IntersectionObserver(g=>{const v=g[g.length-1];v&&(this.onScreen=v.isIntersecting,this.onScreen&&this.dirty&&this.requestRender())}),this.intersectionObserver.observe(this)),this.rebuildIfNeeded(),this.three.markers.sync(this.markerModelsOf(this.project.bindings)),i.setAttribute("aria-label",aa(this.project,this.readOnly)),this.applyEntityState(!0),this.resize(t.clientWidth,t.clientHeight)}teardown(){const t=this.three,e=this.fitted?this.cameraTween?.to??this.pose():null;if(e&&(this.intro={from:null,to:{pitchDeg:bi(e.polar),yawDeg:bi(e.azimuth)}}),this.frame!==null&&cancelAnimationFrame(this.frame),this.hoverFrame!==null&&cancelAnimationFrame(this.hoverFrame),this.frame=null,this.hoverFrame=null,this.resizeObserver?.disconnect(),this.resizeObserver=null,this.intersectionObserver?.disconnect(),this.intersectionObserver=null,document.removeEventListener("visibilitychange",this.onVisibilityChange),window.removeEventListener("keydown",this.onKeyDown),window.removeEventListener("keyup",this.onKeyUp),this.markerGestures.dispose(),this.cameraTween=null,this.press=null,this.activePointers.clear(),this.openness.clear(),this.openingStatus.clear(),!t)return;this.three=null;const i=t.renderer.domElement;i.removeEventListener("pointerdown",this.onCanvasPointerDown),i.removeEventListener("pointerup",this.onCanvasPointerUp),i.removeEventListener("pointercancel",this.onCanvasPointerCancel),i.removeEventListener("pointermove",this.onCanvasPointerMove),i.removeEventListener("dblclick",this.onCanvasDblClick),i.removeEventListener("webglcontextrestored",this.requestRender),i.parentElement?.removeEventListener("wheel",this.onWheelCapture,{capture:!0}),t.controls.removeEventListener("change",this.requestRender),t.controls.removeEventListener("start",this.onControlsStart),t.controls.dispose(),t.built&&oa(t.built.root,t.materials.shared),t.markers.dispose(),t.labels.dispose(),t.materials.dispose(),t.sun.shadow.dispose();for(const s of t.lamps)s.dispose();t.sun.dispose(),t.sky.dispose(),t.renderer.renderLists.dispose(),t.renderer.dispose(),p_(),t.renderer.forceContextLoss(),i.remove(),t.labelRenderer.domElement.remove()}rebuildIfNeeded(){const t=this.three,e=this.project;if(!t||!e)return!1;const i=this.ghostProject,s=[e.id,e.walls,e.openings,e.rooms,e.furniture,e.defaultCeilingHeight,i?.walls,i?.rooms,i?.defaultCeilingHeight,this.cutWalls];if(t.built&&s.length===this.geometryRefs.length&&s.every((l,c)=>Object.is(l,this.geometryRefs[c])))return!1;this.geometryRefs=s;const r={cutWalls:this.cutWalls},a=P_(e,i,r);if(a===this.signature&&t.built&&this.projectId===e.id)return!1;this.signature=a;const o=C_(e,i,r);if(t.built&&oa(t.built.root,t.materials.shared),t.built=K_(o,t.materials),t.scene.add(t.built.root),t.labels.sync(o.labels),this.openness.clear(),this.configureBounds(o,t.built),this.projectId!==e.id){this.projectId=e.id;const l=this.pose(),c=l&&this.fitPose(l.polar,l.azimuth);this.fitted&&l&&c&&(this.cameraTween=null,this.placeAt({...l,...c}))}return!0}configureBounds(t,e){const i=this.three,s=this.fitDistance(e);i.controls.maxDistance=Math.max(s*4,Hs*2),i.controls.cursor.copy(e.center),i.controls.maxTargetRadius=e.radius+2,i.camera.far=Math.max(100,s*8+e.radius*4),i.camera.updateProjectionMatrix();const r=e.radius+1,a=new D(-.55,1,.7).normalize();i.sun.position.copy(e.center).addScaledVector(a,r*3),i.sun.target.position.copy(e.center);const o=i.sun.shadow.camera;o.left=-r,o.right=r,o.top=r,o.bottom=-r,o.near=.1,o.far=r*6+t.maxHeight,o.updateProjectionMatrix()}applyPalette(){const t=this.three;if(!t)return;const e=ic(this,this.scheme);t.renderer.setClearColor(Ne(e.background)),t.sky.groundColor.copy(Ne(e.ground)),JSON.stringify(e)!==JSON.stringify(t.materials.palette)&&(t.built&&oa(t.built.root,t.materials.shared),t.built=null,t.materials.dispose(),t.materials=new sc(e),this.signature="")}applyShadows(){const t=this.three;t&&(t.renderer.shadowMap.enabled=this.shadows,t.sun.castShadow=this.shadows)}applyTouchPolicy(){const t=this.three;t&&(t.renderer.domElement.style.touchAction=this.dashboard?"pan-y":"none")}binding(t){return this.project.bindings.find(e=>e.id===t)}applyEntityState(t){const e=this.three;if(!e?.built)return;const i=this.hass,s=this.lightingMode!=="auto"?this.lightingMode:this.nightMode?"night":"auto",r=U_(i,s,this.project?.northAngle??0),a=N_(this.project,i);e.lamps.forEach((d,h)=>{const m=a[h];if(!m){d.intensity=0,d.castShadow=!1;return}d.position.set(m.position.x,m.height,m.position.y),Ne(m.color,d.color);const g=r.isNight?1.6:1;d.intensity=sx*Math.max(.15,m.level)*g,this.shadows&&h<2?(d.castShadow=!0,d.shadow.mapSize.set(512,512),d.shadow.bias=-.002):d.castShadow=!1}),Ne(r.color,e.sun.color),e.sun.intensity=r.intensity,e.sky.intensity=r.ambientIntensity,r.isNight?e.sky.color.setHex(1976635):Ne(r.color,e.sky.color);const o=e.built.radius+1,l=new D(r.dirX,r.dirY,r.dirZ).normalize();e.sun.position.copy(e.built.center).addScaledVector(l,o*3),e.sun.target.position.copy(e.built.center),this.floorState=F_(this.project,i,this.showThermalHeatmap);const c=!t&&this.motionAllowed();for(const[d,h]of e.built.openings){const m=B_(h.model.entityId,i);this.openingStatus.set(d,m.status);const g=m.open?1:0,v=this.openness.get(d);if(!v||!c){this.openness.set(d,{current:g,target:g});for(const p of h.leaves)so(p,g)}else v.target=g}const u=new Map;for(const[d,h]of this.floorState)h.temperature&&u.set(d,`🌡️ ${Bh(h.temperature,i)}`);e.labels.updateTemperatures(u),this.applyMaterials(),this.updateMarkers(a.map(d=>[d.bindingId,d.color]))}applyMaterials(){const t=this.three,e=t?.built;if(!t||!e)return;const{materials:i}=t,s=this.selectedElements??zo(),r=new Set(s.wallIds),a=new Set(s.openingIds),o=new Set(s.roomIds),l=new Set(s.furnitureIds??[]);for(const[u,d]of e.walls)d.material=r.has(u)?i.selected:i.surface;for(const[u,d]of e.furniture)d.material=l.has(u)?i.selected:i.surface;for(const[u,d]of e.openings){const h=this.openingStatus.get(u),m=a.has(u)?i.selected:h==="missing"||h==="unavailable"?i.warning:i.surface;for(const g of d.meshes)g.material=m}const c=i.palette;for(const[u,d]of e.floors){const h=this.floorState.get(u);Ne(dh(c.floor,d.color,h),d.material.color);const m=o.has(u)?hh(c.accent,.35):h?.glow??null;m?Ne(m,d.material.emissive):d.material.emissive.setRGB(0,0,0)}}updateMarkers(t){const e=this.three;if(!e)return;t&&(this.markerGlow=new Map(t));const i=new Set(this.selectedElements?.bindingIds??[]),s=this.dashboard||this.interactive,r=new Map;for(const a of this.project.bindings){if(typeof a.entityId!="string")continue;const o=kh(a,this.hass);r.set(a.id,{view:o,selected:i.has(a.id),focusable:s,glow:o.lightOn?this.markerGlow.get(a.id)??null:null})}e.markers.update(r)}motionAllowed(){return this.animations&&!lx()}pose(){const t=this.three;return t?{polar:t.controls.getPolarAngle(),azimuth:t.controls.getAzimuthalAngle(),distance:t.controls.getDistance(),target:t.controls.target.clone()}:null}fitDistance(t){const e=this.three.camera,i=Ie(e.fov),s=2*Math.atan(Math.tan(i/2)*Math.max(e.aspect,.1));return t.radius/Math.sin(Math.min(i,s)/2)*1.05}fitPose(t,e){const i=this.three,s=i?.built;if(!i||!s)return null;const r=Math.tan(Ie(i.camera.fov)/2),a=r*Math.max(i.camera.aspect,.1),o=s.box.getCenter(new D),l=new D().setFromSphericalCoords(1,ca(t),e),c=new D(Math.cos(e),0,-Math.sin(e)),u=new D().crossVectors(l,c),{min:d,max:h}=s.box;let m=Hs;for(const g of[d.x,h.x])for(const v of[d.y,h.y])for(const p of[d.z,h.z]){const f=new D(g,v,p).sub(o),E=f.dot(l);m=Math.max(m,E+Math.abs(f.dot(c))/a,E+Math.abs(f.dot(u))/r)}return m*=j_,this.zoomReference=m,{distance:m,target:o}}placeAt(t){const e=this.three,i=new D().setFromSphericalCoords(t.distance,ca(t.polar),t.azimuth);e.camera.position.copy(t.target).add(i),e.controls.target.copy(t.target),e.camera.lookAt(t.target),e.controls.update()}tweenTo(t,e){const i=this.pose();if(!i||!this.fitted)return;const s={...i,...t,target:(t.target??i.target).clone()};if(s.polar=ca(s.polar),!this.motionAllowed()){this.cameraTween=null,this.placeAt(s),this.requestRender();return}const r=Ie(zh(bi(i.azimuth),bi(s.azimuth)));this.cameraTween={start:performance.now(),duration:e,from:i,to:s,deltaAzimuth:r},this.requestRender()}stepCameraTween(t){const e=this.cameraTween;if(!e)return!1;const i=Math.min(1,(t-e.start)/e.duration),s=gc(i),{from:r,to:a}=e;return this.placeAt({polar:r.polar+(a.polar-r.polar)*s,azimuth:r.azimuth+e.deltaAzimuth*s,distance:r.distance+(a.distance-r.distance)*s,target:r.target.clone().lerp(a.target,s)}),i>=1&&(this.cameraTween=null),i<1}applyIntro(){const t=this.intro?.to??la,e=this.fitPose(Ie(t.pitchDeg),Ie(t.yawDeg));if(!e)return;const i=this.intro?.from;this.fitted=!0;const s=i&&this.motionAllowed()?i:t;this.placeAt({polar:Ie(s.pitchDeg),azimuth:Ie(s.yawDeg),...e}),s!==t&&this.setCamera(t)}emitCamera(){const t=this.three,e=t?.built;if(!t||!e)return;const i={pitchDeg:Math.round(bi(t.controls.getPolarAngle())),yawDeg:Math.round(bi(t.controls.getAzimuthalAngle())),zoom:Math.round(this.zoomReference/t.controls.getDistance()*100)/100},s=`${i.pitchDeg}|${i.yawDeg}|${i.zoom}`;s!==this.lastCamera&&(this.lastCamera=s,this.dispatchEvent(new CustomEvent("view3d-camera",{detail:i})))}resize(t,e){const i=this.three;!i||t<=0||e<=0||t===this.size.width&&e===this.size.height||(this.size={width:t,height:e},i.renderer.setSize(t,e,!1),i.labelRenderer.setSize(t,e),i.camera.aspect=t/e,i.camera.updateProjectionMatrix(),i.built&&(i.controls.maxDistance=Math.max(this.fitDistance(i.built)*4,Hs*2),this.fitted||this.applyIntro()),this.requestRender())}renderable(){return this.onScreen&&!document.hidden&&this.size.width>0}applyWalkthroughMode(){const t=this.three;if(t){if(this.walkthrough){t.controls.enabled=!1,this.keysDown.clear(),this.walkthroughLastTime=performance.now();const e=t.built,i=1.65;if(e){const s=e.center;t.camera.position.set(s.x,i,s.z+1),t.camera.rotation.set(0,0,0),this.walkthroughEuler.yaw=0,this.walkthroughEuler.pitch=0}}else if(t.controls.enabled=!0,this.keysDown.clear(),this.isPointerLooking=!1,t.built){const e=this.fitPose(Ie(45),Ie(-35));e&&this.placeAt({polar:Ie(45),azimuth:Ie(-35),...e})}this.requestRender()}}stepWalkthrough(t){const e=this.three;if(!e||!this.walkthrough)return!1;const i=this.walkthroughLastTime?Math.min(.1,(t-this.walkthroughLastTime)/1e3):.016;this.walkthroughLastTime=t;const r=(this.keysDown.has("shiftleft")||this.keysDown.has("shiftright")?5:2.5)*i;let a=0,o=0;(this.keysDown.has("keyw")||this.keysDown.has("keyz")||this.keysDown.has("arrowup"))&&(a+=1),(this.keysDown.has("keys")||this.keysDown.has("arrowdown"))&&(a-=1),(this.keysDown.has("keya")||this.keysDown.has("keyq")||this.keysDown.has("arrowleft"))&&(o-=1),(this.keysDown.has("keyd")||this.keysDown.has("arrowright"))&&(o+=1);let l=!1;if(a!==0||o!==0){l=!0;const c=this.walkthroughEuler.yaw,u=Math.sin(c),d=Math.cos(c),h=-u*a+d*o,m=-d*a-u*o,g=Math.hypot(h,m)||1;e.camera.position.x+=h/g*r,e.camera.position.z+=m/g*r,e.camera.position.y=1.65}return l||this.keysDown.size>0}stepOpenings(){const t=this.three?.built,e=performance.now(),i=this.lastOpeningStep?Math.min(100,e-this.lastOpeningStep):16;if(this.lastOpeningStep=e,!t)return!1;let s=!1;for(const[r,a]of this.openness){if(a.current===a.target)continue;const o=i/nx;a.current=a.target>a.current?Math.min(a.target,a.current+o):Math.max(a.target,a.current-o);for(const l of t.openings.get(r)?.leaves??[])so(l,gc(a.current));s=s||a.current!==a.target}return s||(this.lastOpeningStep=0),s}setRay(t,e){const i=this.three;if(!i)return!1;const s=i.renderer.domElement.getBoundingClientRect();return s.width<=0||s.height<=0?!1:(this.ndc.set((t-s.left)/s.width*2-1,-((e-s.top)/s.height)*2+1),i.raycaster.setFromCamera(this.ndc,i.camera),!0)}raycast(t,e){const i=this.three;if(!i?.built||!this.setRay(t,e))return null;for(const s of i.raycaster.intersectObjects(i.built.pickables,!0)){const r=Y_(s.object);if(r)return r}return null}pick(t,e,i,s){const r=this.raycast(t,e);if(this.dashboard){const a=r?.kind==="opening"?this.project.openings.find(o=>o.id===r.id):void 0;a?.entityId&&Vo({entityId:a.entityId,tapAction:"more-info"},"tap",this.actionContext());return}this.interactive&&this.dispatchEvent(new CustomEvent("view3d-pick",{detail:{ref:r,modifier:i,double:s}}))}actionContext(){return{host:this,hass:this.hass,onError:t=>this.emitHint(t)}}runMarkerAction(t,e){const i=this.binding(t);i&&this.dashboard&&Vo(i,e,this.actionContext())}emitPick(t,e,i){if(!this.interactive)return;const s={kind:"binding",id:t};this.dispatchEvent(new CustomEvent("view3d-pick",{detail:{ref:s,modifier:e,double:i}}))}onMarkerPointerDown(t,e){if(!(!this.dashboard||e.button!==0||!e.isPrimary)){try{e.currentTarget.setPointerCapture(e.pointerId)}catch{}this.markerGestures.down(t,e.clientX,e.clientY,e.pointerType)}}onMarkerClick(t,e){e.stopPropagation(),this.dashboard?this.markerGestures.click(t):this.emitPick(t,e.shiftKey||e.ctrlKey||e.metaKey,!1)}onMarkerDblClick(t,e){e.stopPropagation(),this.dashboard||this.emitPick(t,!1,!0)}onMarkerKeyDown(t,e){const i=e.key==="ContextMenu"||e.key==="Enter"&&e.shiftKey||e.key==="F10"&&e.shiftKey;!(!i&&(e.key==="Enter"||e.key===" "||e.key==="Spacebar"))&&!i||(e.preventDefault(),e.stopPropagation(),!e.repeat&&(this.dashboard?this.runMarkerAction(t,i?"hold":"tap"):this.emitPick(t,!1,i)))}emitHint(t){this.dispatchEvent(new CustomEvent("view3d-hint",{detail:{message:t}}))}};Co.styles=Uh`
    /* Contexte d'empilement propre : les marqueurs (z-index par distance) restent sous le HUD du canevas */
    :host {
      display: block;
      position: absolute;
      inset: 0;
      overflow: hidden;
      isolation: isolate;
    }

    .stage {
      position: absolute;
      inset: 0;
    }

    .stage > canvas {
      display: block;
      width: 100%;
      height: 100%;
      outline: none;
      cursor: grab;
    }

    .stage > canvas:active {
      cursor: grabbing;
    }

    .labels {
      position: absolute;
      top: 0;
      left: 0;
      pointer-events: none;
    }

    /* Marqueurs d'entités : couleur de l'anneau selon l'état (mêmes jetons que les épingles 2D) */
    .marker {
      --marker-ring: var(--arch-pin-border);
      pointer-events: auto;
      width: 34px;
      height: 34px;
      border-radius: 50%;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--arch-pin-bg);
      border: 2px solid var(--marker-ring);
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.35);
      cursor: pointer;
      outline: none;
      transition: width 0.15s ease, height 0.15s ease, box-shadow 0.15s ease;
    }

    .marker.status-on { --marker-ring: var(--arch-on); }
    .marker.status-off { --marker-ring: var(--arch-off); }
    .marker.status-alert { --marker-ring: var(--arch-alert); }
    .marker.status-info { --marker-ring: var(--arch-info); }
    .marker.status-missing { --marker-ring: var(--arch-warning); }

    .marker.lit {
      background: var(--arch-pin-light-bg);
      box-shadow: 0 0 0 4px color-mix(in srgb, var(--marker-glow) 45%, transparent), 0 0 22px var(--marker-glow);
    }

    .marker.radar {
      --marker-ring: var(--arch-alert-ring);
    }

    .marker.playing {
      box-shadow: 0 0 0 4px color-mix(in srgb, var(--arch-media) 40%, transparent), 0 2px 10px rgba(0, 0, 0, 0.35);
    }

    .marker.unavailable {
      opacity: 0.6;
      border-style: dashed;
    }

    .marker.orphan {
      border-style: dashed;
    }

    .marker.selected {
      border-color: var(--arch-accent-strong);
      box-shadow: 0 0 0 3px var(--arch-selection-glow), 0 2px 10px rgba(0, 0, 0, 0.35);
    }

    .marker:hover,
    .marker:focus-visible {
      width: 38px;
      height: 38px;
      z-index: 100000 !important;
    }

    .marker:focus-visible {
      border-color: var(--arch-accent);
      box-shadow: 0 0 0 3px var(--arch-accent-soft);
    }

    .marker-icon {
      font-size: 17px;
      line-height: 1;
      user-select: none;
    }

    /* Infobulle : nom courant et état, au survol ou au focus clavier */
    .marker-tip {
      display: none;
      position: absolute;
      bottom: calc(100% + 6px);
      left: 50%;
      transform: translateX(-50%);
      flex-direction: column;
      align-items: center;
      gap: 1px;
      padding: 4px 9px;
      border-radius: 8px;
      background: var(--arch-surface);
      border: 1px solid var(--arch-surface-border);
      color: var(--arch-surface-text);
      font-size: 11px;
      white-space: nowrap;
      pointer-events: none;
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.3);
    }

    .marker:hover .marker-tip,
    .marker:focus-visible .marker-tip {
      display: flex;
    }

    .marker-name {
      font-weight: 700;
    }

    .marker-state {
      color: var(--marker-ring);
      font-weight: 600;
    }

    /* Étiquettes des pièces : compactes et translucides (le mobilier reste visible dessous) */
    .room-label {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 2px 7px;
      border-radius: 7px;
      background: color-mix(in srgb, var(--arch-surface) 68%, transparent);
      border: 1px solid var(--arch-accent-soft);
      color: var(--arch-surface-text);
      font-size: 10px;
      line-height: 1.25;
      white-space: nowrap;
      pointer-events: none;
    }

    .room-label-name {
      font-weight: 700;
      font-size: 11px;
    }

    .room-label-area {
      color: var(--arch-accent);
      font-family: ui-monospace, SFMono-Regular, monospace;
      font-weight: 600;
    }

    .room-label-temp {
      color: var(--arch-temperature);
      font-family: ui-monospace, SFMono-Regular, monospace;
      font-weight: 700;
    }

    .room-label-temp[hidden] {
      display: none;
    }

    @media (prefers-reduced-motion: reduce) {
      .marker {
        transition: none;
      }
    }

    .walkthrough-hud {
      position: absolute;
      bottom: 80px;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(15, 23, 42, 0.88);
      border: 1px solid rgba(255, 255, 255, 0.18);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      padding: 8px 16px;
      border-radius: 9999px;
      display: flex;
      align-items: center;
      gap: 12px;
      color: #f8fafc;
      font-size: 13px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.45);
      pointer-events: auto;
      z-index: 50;
      touch-action: none;
    }

    .walkthrough-hud .hud-drag-handle {
      background: transparent;
      border: none;
      color: rgba(255, 255, 255, 0.7);
      cursor: grab;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 0 4px;
      height: 24px;
      border-radius: 4px;
      user-select: none;
      touch-action: none;
      font-size: 13px;
      line-height: 1;
      opacity: 0.7;
      transition: opacity 0.15s ease, background-color 0.15s ease, color 0.15s ease;
    }

    .walkthrough-hud .hud-drag-handle:hover,
    .walkthrough-hud .hud-drag-handle.dragging {
      opacity: 1;
      color: #38bdf8;
      background: rgba(255, 255, 255, 0.12);
    }

    .walkthrough-hud .hud-drag-handle.dragging {
      cursor: grabbing;
    }

    .walkthrough-hud .grip-dots {
      letter-spacing: -1.5px;
      font-weight: bold;
      user-select: none;
    }

    .walkthrough-hud kbd {
      background: rgba(255, 255, 255, 0.16);
      border: 1px solid rgba(255, 255, 255, 0.3);
      padding: 2px 6px;
      border-radius: 4px;
      font-family: ui-monospace, monospace;
      font-size: 11px;
      font-weight: 600;
    }

    .walkthrough-hud-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-weight: 600;
      color: #38bdf8;
    }
  `;let be=Co;Be([Oe({attribute:!1})],be.prototype,"project");Be([Oe({attribute:!1})],be.prototype,"hass");Be([Oe({attribute:!1})],be.prototype,"ghostProject");Be([Oe({type:Boolean})],be.prototype,"showThermalHeatmap");Be([Oe({type:Boolean})],be.prototype,"interactive");Be([Oe({type:Boolean})],be.prototype,"readOnly");Be([Oe({type:Boolean,reflect:!0})],be.prototype,"dashboard");Be([Oe({attribute:!1})],be.prototype,"selectedElements");Be([Oe({type:String})],be.prototype,"scheme");Be([Oe({type:Boolean})],be.prototype,"animations");Be([Oe({type:Boolean})],be.prototype,"shadows");Be([Oe({type:Boolean})],be.prototype,"cutWalls");Be([Oe({type:Boolean})],be.prototype,"walkthrough");Be([Oe({type:String})],be.prototype,"lightingMode");Be([Oe({type:Boolean})],be.prototype,"nightMode");Hh("home-architect-3d-view",be);export{be as HomeArchitect3DView};
