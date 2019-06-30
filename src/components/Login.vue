<template>
    <div>
        <div class='login'>
            <h1 class='title'>Login</h1>
        </div>
        <div class='formContainer'>
            <span v-if='rejection !== ""' class='error'>Wrong username and/or password</span>
            <span v-else-if='rejection === ""' class='validOrEmpty'>...</span>
            <div class='form box'>
                <label class='username'>Username</label>
                <input 
                    class='input userInput' 
                    placeholder="Enter username" 
                    type='text'
                    v-model="username"
                > 
                <label class='password  '>Password</label>
                <input 
                    class='input pass' 
                    placeholder="Enter password" 
                    type='password'
                    v-model='password'
                > 
                <button class='button is-link loginButton' @click='sendCredentials'>Login</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Login',
    data() {
        return {
            username: '',
            password: '',
            rejection: '',
        }
    },
    methods: {
        sendCredentials() {
            var credentials = JSON.stringify({
                username: this.username,
                password: this.password,
            });
            fetch(
                'http://localhost:8086/login',
                {
                    method: 'POST',
                    headers: {
                        // 'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: credentials
                }
            ).then((response) => {
                if(response.status === 401) {
                    response.json().then((data) => {
                        this.rejection = data.message;
                        return
                    })
                } else {
                    response.json().then((data) => {
                        this.rejection = '';
                        // I am fully aware that jwt should not be stored here. 
                        // It should be stored inside the httpCookie
                        localStorage.setItem('auth', data.token);
                        this.password = '';
                        this.username = '';
                        this.$router.push('issues');
                    })
                }
            })
        }
    },
    created() {
        window.addEventListener('keyup', (e) => {
            if(e.keyCode === 13) {
                this.sendCredentials();
            }
        })
        localStorage.setItem('auth', '');

    }
}
</script>

<style scoped>
.login {
  margin-bottom: 100px;
}
.formContainer {
  display: inline;
}
.form {
    width: 300px;
    height: 280px;
    margin: auto;
}
.userInput {
    margin-bottom: 25px
}
.username {
    display: block;
    margin-bottom: 10px;
    margin-left: -180px;
}
.password {
    display: block;
    margin-bottom: 10px;
    margin-left: -180px;
}
.loginButton {
    margin-top: 40px;
    float: right
}
.error {
    color: salmon;
}
.validOrEmpty {
    color: white;
}
</style>