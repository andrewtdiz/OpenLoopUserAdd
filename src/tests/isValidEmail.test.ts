import isValidEmail from '../utils/isValidEmail';

const sum = (a:number,b:number) => a+b;

const validEmails =
[
	"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@letters-in-local.org",
	"01234567890@numbers-in-local.net",
	"a@single-character-in-local.org",
	"one-character-third-level@a.example.com",
	"single-character-in-sld@x.org",
	"local@dash-in-sld.com",
	"letters-in-sld@123.com",
	"one-letter-sld@x.org",
	"test@test--1.com",
];

const invalidEmails =
[
	".local-starts-with-dot@sld.com",
	"local-ends-with-dot.@sld.com",
	"two..consecutive-dots@sld.com",
	"missing-dot-before-tld@com",
	"missing-tld@sld.",
	"invalid",
	"invalid-ip@127.0.0.1.26",
	"another-invalid-ip@127.0.0.256",
	"IP-and-port@127.0.0.1:25",
	"trailing-dots@test.de.",
	"dot-on-dot-in-domainname@te..st.de",
	"dot-first-in-domain@.test.de",
	"mg@ns.i",
	".dot-start-and-end.@sil.com",
	"double@a@com",

];

describe('Test emails against isValidEmail checker', () => {
	it('Should Be Valid', () => {
         validEmails.forEach(email => {
            expect(isValidEmail(email)).toBe(true);
        });
	});

	invalidEmails.forEach(email => {
        test('determines if email is invalid', () => {
            expect(isValidEmail(email)).toBe(false);
        })
    })

});
