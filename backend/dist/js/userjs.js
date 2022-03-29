"use strict";

(function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var a = typeof require == "function" && require;if (!u && a) return a(o, !0);if (i) return i(o, !0);throw new Error("Cannot find module '" + o + "'");
      }var f = n[o] = { exports: {} };t[o][0].call(f.exports, function (e) {
        var n = t[o][1][e];return s(n ? n : e);
      }, f, f.exports, e, t, n, r);
    }return n[o].exports;
  }var i = typeof require == "function" && require;for (var o = 0; o < r.length; o++) {
    s(r[o]);
  }return s;
})({ 1: [function (require, module, exports) {
    module.exports = function () {
      setTimeout(function () {
        $('body').fadeIn();

        setTimeout(function () {
          AOS.init({
            once: true,
            duration: 700
          });
        });
      }, 1000);
    };
  }, {}], 2: [function (require, module, exports) {
    module.exports = function () {
      var app = new Vue({
        el: '#section-2',
        data: {
          loading: false,
          form: {
            name: '',
            number: '',
            email: '',
            message: ''
          },
          warning: {
            name: false,
            number: false,
            email: false,
            message: false
          },
          success: false,
          successClass: '',
          alertMessage: ''
        },
        methods: {
          scrollTo: function scrollTo() {
            var top = $("#foot").offset().top;
            $('html, body').stop().animate({
              scrollTop: top
            }, 1000);
          },
          closeAlert: function closeAlert() {
            var _this = this;

            setTimeout(function () {
              _this.successClass = '';
            }, 3000);
          },

          submit: function submit() {
            var _this2 = this;

            if (this.loading) {
              // now loading
              return;
            }

            this.loading = true;
            this.success = false;
            var formKeys = Object.keys(this.form);
            for (var i = 0; i < formKeys.length; i++) {
              var key = formKeys[i];
              if (!this.form[key]) {
                this.warning[key] = true;
              } else {
                this.warning[key] = false;

                if (key === 'email') {
                  this.warning[key] = !this.form[key].includes('@');
                }
              }
            }
            // Any error
            if (Object.values(this.warning).some(function (err) {
              return err;
            })) {
              console.log('%c (╬ﾟдﾟ) warning:', 'padding: .25rem; font-size: 14px; background: #12bdba; color: #fff;', this.warning);
              this.successClass = 'in alert-danger';
              this.alertMessage = '资料填写未完全';
              this.loading = false;
              this.closeAlert();
              return;
            }

            var data = {
              name: this.form.name,
              number: this.form.number,
              mail: this.form.email,
              message: this.form.message
            };

            axios.post('/send', { data: data }).then(function () {
              setTimeout(function () {
                console.log('send mail succuss');
                _this2.loading = false;
                _this2.successClass = 'in alert-success';
                _this2.alertMessage = '信件已送出';
                _this2.closeAlert();
              }, 5000);
            }).catch(function (e) {
              setTimeout(function () {
                console.error('error', e);
                _this2.loading = false;
                _this2.successClass = 'in alert-success';
                _this2.alertMessage = '信件已送出';
                _this2.closeAlert();
              }, 5000);
            });
          }
        }
      });
    };
  }, {}], 3: [function (require, module, exports) {
    // $(function () {
    //     // owlcarouselfn('.banner .row .col-xs-12', false, true)
    // })
    // $('test').click((e) => {
    //     return e ? true : false
    // })
    // import owl from 'owlCarousel.js'
    // const owlFn = require('./owlCarousel')
    var aosInit = require('./aos');
    var gotop = require('./scrollTo');
    // const {banner} = require('./banner/index.js')
    // const navbar = require('./navbar/index.js')
    // const idxOwl = require('./indexOwl/index.js')
    // const qa = require('./qa')
    // const neewsDetail = require('./newsDetail.js')
    // const prodDetail = require('./productDetail/index.js')
    // const about = require('./aboutus.js')
    // const online_contents = require('./online-content.js')
    // const mshop = require('./mshop.js')
    // const prod_modal = require('./prod_modal.js')
    // const shop = require('./shop.js')
    // const search = require('./search.js')
    // const footer = require('./footer.js')

    // const baiduInit = require('./baidu.js')
    var contact = require('./contact.js');

    // const swiperJS = require('./swiper/index.js')
    // const scollFn = require('./scrollTrigger/index.js')

    $(function () {
      $('body').hide();

      var img = new Image();
      img.src = './dist/images/banner.png';
      img.onload = function () {
        $('body').fadeIn(700);
        // particles
        particlesJS.load('particles-js', './dist/static/particles.json', function () {});

        // baiduInit()
        contact();
        aosInit();
      };

      // setTimeout(() => {
      //   $('body').fadeIn(700)
      //   // particles
      //   particlesJS.load('particles-js', './dist/static/particles.json', function() {
      //   })

      //   baiduInit()
      //   contact()
      //   aosInit()
      // }, 2000)
      gotop();

      $(window).scroll(function () {
        setTimeout(function () {
          var top = $(window).scrollTop();
          var sectionTop = $('#section-1').offset().top;
          var section1Bottom = $('#section-1').offset().top + $('#section-1').height();

          if ($(window).width() > 768) {
            if (top > section1Bottom - 300) {
              $('.nav a').css('color', '#fca313');
            } else {
              $('.nav a').css('color', 'white');
            }
          }

          if (top > sectionTop) {
            return;
          }

          var top_sectionTop = top - sectionTop;
          if (Math.abs(top_sectionTop) > 600) {
            $('.linear-gradient').attr('style', "opacity: 0;");
            return;
          }

          var calc_top_sectionTop_reverse = (1000 - Math.abs(top_sectionTop)) / 1000;
          $('.linear-gradient').attr('style', "opacity: " + calc_top_sectionTop_reverse + ";");
        });
      });

      // Nav scroll
      $('#myNavbar li a').click(function () {
        var target = $(this).data('scroll');
        scrollTo(target);

        if ($(window).width() < 768) {
          $('.navbar-toggle').click();
        }
      });
      var window_height = $(window).innerHeight();

      // banner scroll
      $('.banner .scroll').click(function () {
        scrollTo('section-1');
      });

      // read more
      $('.section-1 .readmore a').click(function () {
        if ($('.section-1 .en-content').is('.active')) {
          $('.section-1 .en-content').removeClass('active');
          $('.section-1').css('height', window_height);
          scrollTo('section-1');
        } else {
          $('.section-1 .en-content').addClass('active');
          var en_content_height = $('.section-1 .en-content').height();
          $('.section-1').css('height', window_height + en_content_height);
          setTimeout(function () {
            scrollTo('en-content');
          });
        }
      });

      // view height
      $('.section-1').css('height', window_height);

      // scroll
      $('.section-1 .scroll').click(function () {
        scrollTo('section-2');
      });
      // scroll
      $('.section-2 .scroll').click(function () {
        scrollTo('foot');
      });
    });

    function scrollTo(target) {
      var top = $("#" + target).offset().top;
      var navH = $('.navbar').innerHeight();
      var section1H = target === 'section-1' ? $(window).width() < 768 ? 30 : 30 : 0;

      $('html, body').stop().animate({
        scrollTop: top
      }, 1000);
    }

    // owlFn()

    // $(function () {
    //   es6()
    // })
  }, { "./aos": 1, "./contact.js": 2, "./scrollTo": 4 }], 4: [function (require, module, exports) {
    // $(function () {
    //     $('.gotop a').on('click', function () {
    //         $('html, body').animate({
    //             scrollTop: 0
    //         }, 1000)
    //     })
    //     $('.scroll').on('click', function () {
    //         var section1_top = $('.section_1').offset().top
    //         $('html, body').animate({
    //             scrollTop: section1_top
    //         }, 1000)
    //     })
    // })

    // function scrollFn (target) {
    //   console.warn('target', target)
    //   var top = $('#' + target).offset().top
    //   $('html, body').stop().animate({
    //     scrollTop: top - 100
    //   }, 1000)
    // }

    module.exports = function () {
      $('.gotop').on('click', function () {
        $('html, body').animate({
          scrollTop: 0
        }, 1000);
      });
    };
  }, {}] }, {}, [3]);
//# sourceMappingURL=userjs.js.map
