new Vue({
  el: '#app',
  data: {
    items: null,
    form: {
      firstname: '',
      lastname: ''
    },
    show: true
  },
  mounted: function() {
    baseInstance.get('/SampleData')
      .then(function(response){
        console.log(response.data);
        this.items = response.data;
      }.bind(this));
  },
  methods: {
    onSubmit: function(evt) {
      evt.preventDefault();
      baseInstance.post('/PersonData', this.form)
        .then(
          function(response){
            console.log(response);
            console.log(this.items);
            this.items.push(response.data)
            this.reset();
          }.bind(this)
        )
        .catch(function (error) {
          console.log(error);
        });
    },
    onReset: function(evt) {
      evt.preventDefault();
      // Reset our form values
      this.reset();
    },
    reset: function() {
      this.form.firstname = '';
      this.form.lastname = '';
      this.show = false;
      this.$nextTick(function() {
        this.show = true;
      }.bind(this))
    }
  }
})