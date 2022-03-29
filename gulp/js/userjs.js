// $(function () {
//     // owlcarouselfn('.banner .row .col-xs-12', false, true)
// })
// $('test').click((e) => {
//     return e ? true : false
// })
// import owl from 'owlCarousel.js'
// const owlFn = require('./owlCarousel')
const aosInit = require('./aos')
const gotop = require('./scrollTo')
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
const contact = require('./contact.js')

// const swiperJS = require('./swiper/index.js')
// const scollFn = require('./scrollTrigger/index.js')

$(function () {
  $('body').hide()

  const img = new Image()
  img.src = './dist/images/banner.png'
  img.onload = function () {
    $('body').fadeIn(700)
    // particles
    particlesJS.load('particles-js', './dist/static/particles.json', function() {
    })

    // baiduInit()
    contact()
    aosInit()    
  }

  // setTimeout(() => {
  //   $('body').fadeIn(700)
  //   // particles
  //   particlesJS.load('particles-js', './dist/static/particles.json', function() {
  //   })

  //   baiduInit()
  //   contact()
  //   aosInit()
  // }, 2000)
  gotop()

  $(window).scroll(function () {
    setTimeout(() => {
      const top = $(window).scrollTop()
      const sectionTop = $('#section-1').offset().top
      const section1Bottom = $('#section-1').offset().top + $('#section-1').height()

      if ($(window).width() > 768) {
        if (top > (section1Bottom - 300)) {
          $('.nav a').css('color', '#fca313')
        }
        else {
          $('.nav a').css('color', 'white')
        }
      }

      if (top > sectionTop) {
        return
      }
      
      const top_sectionTop = top - sectionTop
      if (Math.abs(top_sectionTop) > 600) {
        $('.linear-gradient').attr('style', `opacity: 0;`)
        return
      }

      const calc_top_sectionTop_reverse = (1000 - Math.abs(top_sectionTop)) / 1000
      $('.linear-gradient').attr('style', `opacity: ${calc_top_sectionTop_reverse};`)
    })
  })

  // Nav scroll
  $('#myNavbar li a').click(function () {
    const target = $(this).data('scroll')
    scrollTo(target)

    if ($(window).width() < 768) {
      $('.navbar-toggle').click()
    }
  })
  const window_height = $(window).innerHeight()

  // banner scroll
  $('.banner .scroll').click(function () {
    scrollTo('section-1')
  })

  // read more
  $('.section-1 .readmore a').click(function () {
    if ($('.section-1 .en-content').is('.active')) {
      $('.section-1 .en-content').removeClass('active')
      $('.section-1').css('height', window_height)
      scrollTo('section-1')
    }
    else {
      $('.section-1 .en-content').addClass('active')
      const en_content_height = $('.section-1 .en-content').height()
      $('.section-1').css('height', window_height + en_content_height)
      setTimeout(() => {
        scrollTo('en-content')
      });
    }
  })

  // view height
  $('.section-1').css('height', window_height)

  // scroll
  $('.section-1 .scroll').click(function () {
    scrollTo('section-2')
  })
  // scroll
  $('.section-2 .scroll').click(function () {
    scrollTo('foot')
  })
})

function scrollTo (target) {
  const top = $(`#${target}`).offset().top
  const navH = $('.navbar').innerHeight()
  const section1H = target === 'section-1' ? $(window).width() < 768 ? 30 : 30 : 0

  $('html, body').stop().animate({
    scrollTop: top
  }, 1000)
}


// owlFn()

// $(function () {
//   es6()
// })
