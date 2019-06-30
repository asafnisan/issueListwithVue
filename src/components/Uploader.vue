<template>
  <div v-if='token'>
    <button class='button logout is-link' @click='logout'>Logout</button>
    <div class='uploader'>
      <div class='issuesTitle'>
        <h1 class='title'>Upload an XML file to see a list of issues</h1>
      </div>
      <form action='#' onsubmit="return false;">
        <input 
          type='file' 
          id='fileinput'
          class='button is-text'
        >
        <input 
          type='button' 
          id='btnLoad' 
          value='Upload' 
          @click='loadFile'
          class='button is-primary loaderButton'
        >
      </form>
    </div>
    <div 
      v-if='error !== ""'
      class="box notification is-warning errorMessage"
    >
      {{error}}
    </div>
    <IssueList 
      v-if="issueList.length > 0"
      :issueList='issueList'/>
  </div>
</template>

<script>
import 'bulma/css/bulma.css';
import IssueList from './IssueList.vue'

export default {
  name: 'Uploader',
  props: {
    msg: String
  },
  data () {
    return {
      issueList: [],
      error: '',
      token: '',
      filterValues: [],
    }
  },
  methods: {
    loadFile() {
      var file = document.getElementById('fileinput').files[0];
      var fr = new FileReader();
      var token = this.token;
      fr.onload = function (e) { 
          var content = e.target.result;
          fetch(
              'http://localhost:8086/restricted',
              {
                  method: 'POST',
                  headers: {
                      'Authorization': 'Bearer ' + token,
                      'Content-Type': 'text/xml',
                  },
                  body: content
              }
          ).then((response) => {
            if(response.status === 400) {
              this.issueList = [];
              response.json().then((data) => {
                this.error = 'Server error: ' + data.message
              })
              return;
            }
            response.json()
            .then((data) => {
              this.issueList = data.issue;
              this.error = '';
              this.filterValues = Object.keys(data.issue[0])
            })
          })
      }.bind(this);
      try {
        fr.readAsText(file)
      } catch(err) {
        this.error = 'Please select a valid XML file'
      }
    },
    logout() {
      localStorage.setItem('auth', '');
      this.token = '';
      console.log('logged out!');
      console.log('auth:', localStorage.getItem('auth'));
      console.log('this.token:', this.token);
      this.$router.push('login');

    }
  },
  components: {
    IssueList,
  },
  created() {
    this.token = localStorage.getItem('auth');
    var token = this.token;
    console.log('here is the token:', this.token);
    fetch(
      'http://localhost:8086/restricted',
      {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'text/xml',
        }
      }
    ).then((response) => {
      if(response.status !== 200) {
        this.$router.push('login');
      }
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.uploader {
  margin-bottom: 50px;
  clear: right;
}
.loaderButton {
  margin-left: 30px
}
.errorMessage {
  width: 50%;
  display: inline;
}
.issuesTitle {
  margin-bottom: 100px;
}
.logout {
  float: right;
  margin-top: -40px;
  margin-right: 20px;
}
</style>
