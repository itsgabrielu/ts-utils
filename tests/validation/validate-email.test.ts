import { expect } from "chai";
import validateEmail from "../../src/validation/validate-email";

describe("Validate Email", () => {
  // Reference: https://datatracker.ietf.org/doc/html/rfc3696#section-3
  describe("should return true for validly formatted emails", () => {
    (
      [
        ["simple example", ["me@example.com"]],
        [
          "local-parts may consist of any combination of alphabetic characters, digits, or any of the special characters, i.e. ! # $ % & ' * + - / = ?  ^ _ ` . { | } ~",
          [
            "user+mailbox@example.com",
            "firstname.surname@example.com",
            "someuser-12345@example.com",
            "$A12345@example.com",
            "!def!xyz%abc@example.com",
            "_somename@example.com",
            "!#$%&'*+-/=?^_`.{|}~@example.com",
          ],
        ],
        [
          // See https://data.iana.org/TLD/tlds-alpha-by-domain.txt for TLDs
          "domain-parts have optional subdomains",
          [
            "user+mailbox@example.com",
            "user+mailbox@example.com",
            "user+mailbox@example.XN--VERMGENSBERATER-CTB",
            "user+mailbox@example.example.XN--ZFR164B",
          ],
        ],
      ] as [string, string[]][]
    ).forEach(([description, examples]) => {
      describe(description, () => {
        examples.forEach((example) => {
          it(example, () => {
            const actual = validateEmail(example);
            expect(actual).to.equal(true);
          });
        });
      });
    });
  });
  // References:
  // - https://en.wikibooks.org/wiki/JavaScript/Best_practices#Examples_invalid_according_to_RFC2822s
  // - https://datatracker.ietf.org/doc/html/rfc3696#section-3
  describe("should return false for invalid emails", () => {
    (
      [
        ["missing domain", ["me@"]],
        ["missing local part", ["@example.com"]],
        [
          "missing at-sign separating local part and domain part",
          ["Abc.example.com"],
        ],
        [
          "only one at-sign is allowed outside quotation marks",
          ["A@b@c@example.com"],
        ],
        [
          "none of the special characters in this local part are allowed outside quotation marks",
          ['a"b(c)d,e:f;g<h>i[j\\k]l@example.com'],
        ],
        [
          'period (".") may also appear, but may not be used to start or end the local part...',
          [
            ".notallowed@example.com",
            "notallowed.@example.com",
            ".notallowed.@example.com",
          ],
        ],
        [
          "..., nor may two or more consecutive periods appear.",
          [
            "notallowed..@example.com",
            "..notallowed@example.com",
            "nota..llowed@example.com",
            "notallo..wed@example.com",
          ],
        ],
        [
          "Despite being valid according to RFC2822, any ASCII character, including control characters, may not appear quoted, or in a quoted string.  When quoting is needed, the backslash character can not be used to quote the following character.",
          [
            "Abc\\@def@example.com",
            "Fred\\ Bloggs@example.com",
            "Joe.\\\\Blow@example.com",
          ],
        ],
        [
          "Despite being valid according to RFC2822, conventional double-quote characters may not be used to surround strings",
          ['"Abc@def"@example.com', '"Fred Bloggs"@example.com'],
        ],
        [
          'In addition to restrictions on syntax, there is a length limit on email addresses. That limit is a maximum of 64 characters (octets) in the "local part" (before the "@").',
          [
            "1234567890123456789012345678901234567890123456789012345678901234+x@example.com",
          ],
        ],
        // domain-part restriction of 255 chars not tested as extremely unlikely
        ["no icon characters", ["ha🤣ha😦oh@test.com"]],
      ] as [string, string[]][]
    ).forEach(([description, examples]) => {
      describe(description, () => {
        examples.forEach((example) => {
          it(example, () => {
            const actual = validateEmail(example);
            expect(actual).to.equal(false);
          });
        });
      });
    });
  });
});
