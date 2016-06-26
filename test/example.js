require('mocha-generators').install();

var Nightmare = require('nightmare');
var config = require('./config');
var should = require('chai').should();
var nightmare = Nightmare({ show: true });

describe ('login and logout at rakuten.co.jp', function() {
    describe ('login', function () {
        it ('login', function*() {
            var location = yield nightmare
                .viewport(1024,768)
                .goto(config.app.login.url)
                .wait()
                .type('input#login_id', config.app.login.username)
                .type('input#password', config.app.login.password)
                .click('html body div#w div#main-my.page-login.d-rst div.wrap div.area-login div.sect div.box-account dl.box dd form.validator.login div#loginbutton_script_on.box-btn-login span.btn-login.btn input')
                .wait('#l-side')
                .screenshot('./logs/screenshots/login.png')
                .wait(10)
                .evaluate(function () {
                    return location.origin + location.pathname;
                });
            location.should.eql('http://www.dmm.com/');
        });
        it ('logout', function*() {
            var location = yield nightmare
                .goto('http://book.dmm.com/detail/b510ckaka00871/')
                .wait()
                .screenshot('./logs/screenshots/logout.png')
                .wait(10)
                .evaluate(function() {
                    return document.getElementsByClassName('m-boxSubDetailPurchase__price__value')[0].innerText;
                });
		location.should.eql('626円');
        });
    });
});
