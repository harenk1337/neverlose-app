import { zwsCrypt } from "@/uni_modules/zws-encrypt"
const sort_obj = function(obj) {
  return Object.keys(obj).sort().reduce(function (result, key) {
    result[key] = obj[key];
    return result;
  }, {});
}

const obj_to_string = function (obj) {
  obj = sort_obj(obj);
  let str = '';
  for (let p in obj) {
      if (obj.hasOwnProperty(p)) {
          str += p + obj[p];
      }
  }
  return str;
}

const sign = function(j, secret){
    const str_to_hash = obj_to_string(j) + secret
    const hashed = zwsCrypt.SHA256(str_to_hash)
    return hashed
}

export default {
	sign
}