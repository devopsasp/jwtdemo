function b64(str) {
    return new Buffer(str).toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
    }
    function encode(h, p) {
    const headerEnc = b64(JSON.stringify(h));
    const payloadEnc = b64(JSON.stringify(p));
    return `${headerEnc}.${payloadEnc}`;
    }

    function decode(jwt) {
        const [headerB64, payloadB64] = jwt.split('.');
        // These supports parsing the URL safe variant of Base64 as well.
        const headerStr = new Buffer(headerB64, 'base64').toString();
        const payloadStr = new Buffer(payloadB64, 'base64').toString();
        return {
        header: JSON.parse(headerStr),
        payload: JSON.parse(payloadStr)
        };
        }

       const header= {
            "alg": "HS256",
            "typ": "JWT"
            }
        const payload=    {
            "sub": "1234567890",
            "name": "John Doe",
            "admin": true
            }
        const encodeddata=encode(header,payload)
        const decodeddata=decode(encodeddata)
        console.log(encodeddata)
        console.log(decodeddata)



        