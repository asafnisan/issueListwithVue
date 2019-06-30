<template>
    <div>
        <div class='login'>
            <h1 class='title'>Login</h1>
        </div>
        <div class='heyo'>
            <div class='form box'>
                <label class='username'>Username</label>
                <input class='input userInput' placeholder="Enter username" type='text'> 
                <label>Password</label>
                <input class='input pass' placeholder="Enter password" type='password'> 
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Login',
}
</script>

<style scoped>
.login {
  margin-bottom: 100px;
}
.heyo {
  display: inline;
}
.form {
    width: 300px;
    height: 400px;
    margin: auto;
}
.userInput {
    margin-bottom: 50px
}
.username {
    text-align: initial;
}
</style>