var hexcase=0,b64pad="",chrsz=8;function hex_sha1(a){return binb2hex(core_sha1(str2binb(a),a.length*chrsz))}function b64_sha1(a){return binb2b64(core_sha1(str2binb(a),a.length*chrsz))}function str_sha1(a){return binb2str(core_sha1(str2binb(a),a.length*chrsz))}function hex_hmac_sha1(a,b){return binb2hex(core_hmac_sha1(a,b))}function b64_hmac_sha1(a,b){return binb2b64(core_hmac_sha1(a,b))}function str_hmac_sha1(a,b){return binb2str(core_hmac_sha1(a,b))}function sha1_vm_test(){return"a9993e364706816aba3e25717850c26c9cd0d89d"==hex_sha1("abc")}function core_sha1(f,g){f[g>>5]|=128<<24-g%32;f[(g+64>>9<<4)+15]=g;for(var h=Array(80),k=1732584193,l=-271733879,m=-1732584194,n=271733878,o=-1009589776,p=0;p<f.length;p+=16){for(var q=k,r=l,s=m,u=n,v=o,w=0;80>w;w++){if(16>w)h[w]=f[p+w];else h[w]=rol(h[w-3]^h[w-8]^h[w-14]^h[w-16],1);var x=safe_add(safe_add(rol(k,5),sha1_ft(w,l,m,n)),safe_add(safe_add(o,h[w]),sha1_kt(w)));o=n;n=m;m=rol(l,30);l=k;k=x}k=safe_add(k,q);l=safe_add(l,r);m=safe_add(m,s);n=safe_add(n,u);o=safe_add(o,v)}return[k,l,m,n,o]}function sha1_ft(a,e,b,c){if(20>a)return e&b|~e&c;if(40>a)return e^b^c;if(60>a)return e&b|e&c|b&c;return e^b^c}function sha1_kt(a){return 20>a?1518500249:40>a?1859775393:60>a?-1894007588:-899497514}function core_hmac_sha1(a,b){var c=str2binb(a);if(16<c.length)c=core_sha1(c,a.length*chrsz);for(var d=Array(16),e=Array(16),f=0;16>f;f++){d[f]=909522486^c[f];e[f]=1549556828^c[f]}var g=core_sha1(d.concat(str2binb(b)),512+b.length*chrsz);return core_sha1(e.concat(g),672)}function safe_add(a,b){var c=(65535&a)+(65535&b);return(a>>16)+(b>>16)+(c>>16)<<16|65535&c}function rol(a,b){return a<<b|a>>>32-b}function str2binb(a){for(var b=[],c=0;c<a.length*chrsz;c+=chrsz){b[c>>5]|=(a.charCodeAt(c/chrsz)&(1<<chrsz)-1)<<32-chrsz-c%32}return b}function binb2str(a){for(var b="",c=0;c<32*a.length;c+=chrsz){b+=String.fromCharCode(a[c>>5]>>>32-chrsz-c%32&(1<<chrsz)-1)}return b}function binb2hex(a){for(var b=hexcase?"0123456789ABCDEF":"0123456789abcdef",c="",d=0;d<4*a.length;d++){c+=b.charAt(15&a[d>>2]>>8*(3-d%4)+4)+b.charAt(15&a[d>>2]>>8*(3-d%4))}return c}function binb2b64(a){for(var b="",c=0,d;c<4*a.length;c+=3){d=(255&a[c>>2]>>8*(3-c%4))<<16|(255&a[c+1>>2]>>8*(3-(c+1)%4))<<8|255&a[c+2>>2]>>8*(3-(c+2)%4);for(var e=0;4>e;e++){if(8*c+6*e>32*a.length)b+=b64pad;else b+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(63&d>>6*(3-e))}}return b}