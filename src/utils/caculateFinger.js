const Fingerprint2 = require('fingerprintjs2');


var calcFinger =  (callback) => {
    Fingerprint2.get( function (components) {
        var murmur = Fingerprint2.x64hash128(components.map(function (pair){
            return pair.value
        }).join(),31)
        callback(murmur)
        return murmur;
    })
}

export default calcFinger;