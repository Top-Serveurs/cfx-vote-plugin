import NodeRSA from 'node-rsa';

const privKey = "-----BEGIN RSA PRIVATE KEY-----\n" +
    "MIIEowIBAAKCAQEAn3lQ4t0MB1Q78GMJeRg5xht2OkQpDodjH6snzNXDQgqPyXR8\n" +
    "34Z7lNvqQpNUHEybXZTcRWK3vrif6Zw2zk59YeK6IPS8tQU7DPmjfGc3f1DuZ31+\n" +
    "y4jKzbza9TEKGxdNLcbayPUWP3XOOHLlO36EEnvOh3070QZzohHz1Zig3IwmsuwS\n" +
    "qe3njWHNBUxDJ60o+XaqMPozU1LqhTDAz0pP99hnEN+9FbaxyF5sOUbL4bBX7Xf1\n" +
    "x49H9YZ7HcpiXj4GDr/cBNY2ObAJS9oEIhRlo3/zEpDZewDH5a3ZEM8jpxarqXTN\n" +
    "AOEUPpmwynvMkYlxVajHmCcmtOuSesr3LYXB+wIDAQABAoIBAANXSk+GbAMXS64s\n" +
    "lP05ebRhzOdJmEaapYP7VPkgnVeb2wlQbHFOYvZqaQz+AywYmsSqIrc9azYOriL5\n" +
    "x9goos3TLy0Tk4SDWIpcDIXFr872Bhia83YWJpGK3Fd4sIqCwXYtDVZadB3ePPTH\n" +
    "y2+kpeWxPFFwWTl21iNWFvKpoO0d5frVnn+yqgadPLrqUbWERugPTXADEXdV9wM8\n" +
    "XgnafvTqBho9BV2un54QCx5aR6DvIf2vc+FeaDb56rTzFr0jQEXW6vD4quQoCw0j\n" +
    "pn7/XBOUqllniQQdjzyEWRMOIy1e7CjSbxj25XL80dnrGz1JnnR+14P2HA4ZwlTg\n" +
    "eesb/xECgYEA7OXkK6sgAxnN828RiZ77j3vAvpCn/8l+e5J1YFjDyplCQELVPqcV\n" +
    "p4gLToazzKXxHchHL4/iIW1mhTZyN5rJQI28wf/0EZ/9qrPrbQ24LxP37Am9YLhq\n" +
    "MN7Yh9CqQkXPis2B0Rd8OiaMUf56tWeEGZeTnsVTpvUL59+JyYpZJIMCgYEArFU3\n" +
    "Yr2zp23vVYy2Ckx41sV0wW3ibUN054u9MLCZY1vLGeQE+VwsFAFd5YBYFNJyDK9E\n" +
    "/gAPTW3PeNGRR58ZhPls3IKgKgpTnNW0HKVC13sR1E5lA1weQxvLI36Q+tRM/vjs\n" +
    "2JkIqsGsoZiNFlhJoe3yGrCWtldO5fdl8pvrIykCgYEAyJd81fEnwRhniHqCyhpB\n" +
    "fmRWd8Y7St6N6ArCsttWpkWRkKJGuK94KYyLrmlm86GLgiFlDYPzAUUGa0QIAMdj\n" +
    "I/MgYtDdFNN5UsLYVVYpoEtzQX2Zyr08xbbceFwa3tUIAMs04hzVxtN/O6qUsug9\n" +
    "NgJgMC98PsH929AvduVbyAsCgYAUKSgAmjbRSJAuTvbg/49HePQuyN8rby/XAscQ\n" +
    "UiivsgZxsfZPAdR6RqqodbpYPUJwb3S/zlv77/PMq5+2ZEuE/fUZWwLHyEt91pZq\n" +
    "n37RXKl6T+2LVhSIP1ElhuIJJhsX3SFAOa8E4wGCKimfSpbapc6kBrKrBE3Lo4S+\n" +
    "vDTm+QKBgDDI8/VUt5vULgQIm2+96zLHHGePTLss/4VTF+uQIQUjxEACxxurwZfK\n" +
    "FAErqNefzK+IRj5NDxvTB+8CGVZYipfkHvjyAWtlcxj4d0U8AhGA0KwFM8Us+21W\n" +
    "wDvd7HsIogJ3Kl3HxvF1xuzderc+6+X6ejohnIsznd80Nknw0a+L\n" +
    "-----END RSA PRIVATE KEY-----";

class Decrypter {
    constructor() {
        this.key = new NodeRSA(privKey);
    }

    decrypt(content) {
        try {
            return this.key.decrypt(content, "utf8");
        } catch (e) {
            console.log("ERROR: Unable to decrypt the Vote")
        }
    }
}

export default Decrypter;