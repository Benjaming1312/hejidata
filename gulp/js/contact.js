module.exports = function () {
  const app = new Vue({
    el: '#section-2',
    data: {
      loading: false,
      form: {
        name: '',
        number: '',
        email: '',
        message: '',
      },
      warning: {
        name: false,
        number: false,
        email: false,
        message: false,
      },
      success: false,
      successClass: '',
      alertMessage: '',
      phoneRegex: new RegExp(/^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/),
      mailRegex: new RegExp(/[a-z0-9.-_]+@[a-z.]+/)
    },
    methods: {
      closeAlert () {
        setTimeout(() => {
          this.successClass = ''
        }, 3000)
      },
      submit: function () {
        if (this.loading) {
          // now loading
          return
        }

        this.loading = true
        this.success = false
        const formKeys = Object.keys(this.form)
        for (let i = 0 ; i < formKeys.length; i++) {
          const key = formKeys[i]
          if (!this.form[key]) {
            this.warning[key] = true
          }
          else {
            this.warning[key] = false

            if (key === 'email') {
              this.warning[key] = !this.form[key].includes('@')
            }
          }
        }
        // Any error
        if (Object.values(this.warning).some(err => err)) {
          console.log('%c (╬ﾟдﾟ) warning:', 'padding: .25rem; font-size: 14px; background: #12bdba; color: #fff;', this.warning)
          this.successClass = 'in alert-danger'
          this.alertMessage = '资料填写未完全'
          this.loading = false
          this.closeAlert()
          return
        }

        const data = {
          name: this.form.name,
          number: this.form.number,
          mail: this.form.email,
          message: this.form.message
        }

        axios.post('/send', {data})
          .then(() => {
            setTimeout(() => {
              console.log('send mail succuss')
              this.loading = false
              this.successClass = 'in alert-success'
              this.alertMessage = '信件已送出'
              this.closeAlert()
            }, 5000);
          })
          .catch(e => {
            setTimeout(() => {
              console.error('error', e)
              this.loading = false
              this.successClass = 'in alert-success'
              this.alertMessage = '信件已送出'
              this.closeAlert()
            }, 5000);
          })
      }
    }
  })
}