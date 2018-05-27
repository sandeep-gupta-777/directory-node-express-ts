const _ = require('lodash');

export function getValue(obj: object, key:string ) {
    let value =   _.has(obj, key)?_.get(obj, key):undefined;
    return value;
}