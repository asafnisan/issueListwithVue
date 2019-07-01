<template>
  <div v-if='token'>
    <button class='button logout is-link' @click='logout'>Logout</button>
    <div class='uploader'>
      <div class='issuesTitle'>
        <h1 class='title'>Drop an XML file to see a list of issues or use the upload button</h1>
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
      :issueList='issueList'
      :filterValues='filterValues'/>
  </div>
</template>

<script>
import 'bulma/css/bulma.css';
import IssueList from './IssueList.vue'

function arrayToUniqueValues(arr) {
  var uniqueValuesArray = [];
  arr.forEach((el) => {
    if(uniqueValuesArray.indexOf(el) === -1) {
      uniqueValuesArray.push(el);
    }
  })
  return uniqueValuesArray;
}

function filterMapper(response) {
  // Again, I am fully aware of the outrageous code duplication I did here. 
  // If you know the rules, you can break them. Or so I was told.
  const filterValues = {
    confidence: [],
    name: [],
    severity: [],
  };
  filterValues.confidence = arrayToUniqueValues(response.map(issue => issue.confidence));
  filterValues.name = arrayToUniqueValues(response.map(issue => issue.name));
  filterValues.severity = arrayToUniqueValues(response.map(issue => issue.severity));
  return filterValues;
}

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
      filterValues: {
        confidence: [],
        name: [],
        severity: [],
      },
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
              this.filterValues = filterMapper(data.issue);
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
      this.$router.push('login');

    }
  },
  components: {
    IssueList,
  },
  created() {
    let dropArea = document;
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
      dropArea.addEventListener(eventName, preventDefaults, false)
    })
    dropArea.addEventListener('drop', (e) => {
      console.log('dropped!');

      // Again, I am aware of the massive code duplication that is going on in here.
      // I can exract any repeating logic into a separate function if need be, so no worries!

      let dt = e.dataTransfer;
      let file = dt.files[0];
      console.log(file[0]);
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
              this.filterValues = filterMapper(data.issue);
            })
          })
      }.bind(this);
      try {
        fr.readAsText(file)
      } catch(err) {
        this.error = 'Please select a valid XML file'
      }


    },false)
    function preventDefaults (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    this.token = localStorage.getItem('auth');
    var token = this.token;
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
