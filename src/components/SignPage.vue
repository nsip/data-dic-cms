<template>
    <div class="login-page">

        <div v-if="!registerActive">
            <h1>Sign In</h1>
            <form>
                <input class="textbox" v-model="emailLogin" type="email" placeholder="Email" required>
                <input class="textbox" v-model="passwordLogin" type="password" placeholder="Password" required>
                <input class="btn1" type="submit" @click="doLogin" value="submit">
                <p>Don't have an account? <a href="#" @click="doShift()">Sign up here</a> </p>
            </form>
        </div>

        <div v-if="registerActive">
            <h1>Sign Up</h1>
            <form>
                <input class="textbox" v-model="emailReg" type="email" placeholder="Email" required>
                <input class="textbox" v-model="passwordReg" type="password" placeholder="Password" required>
                <input class="textbox" v-model="confirmReg" type="password" placeholder="Confirm Password" required>
                <input class="btn2" type="submit" @click="doRegister" value="submit">
                <p>Already have an account? <a href="#" @click="doShift()">Sign in here</a> </p>
            </form>
        </div>

    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { loginOK, loginUser, postLogin, postRegister } from './share/share'

export default defineComponent({
    name: 'SignPage',
    setup() {

        let registerActive = ref(false)

        let emailLogin = ref("")
        let passwordLogin = ref("")

        let emailReg = ref("")
        let passwordReg = ref("")
        let confirmReg = ref("")

        const doLogin = async () => {

            const ok = await postLogin(emailLogin.value, passwordLogin.value)
            if (ok) {
                loginOK.value = true
                loginUser.value = emailLogin.value
            }
        }

        const doRegister = async () => {

            if (passwordReg.value != confirmReg.value) {
                alert('password confirmation error')
                return
            }

            const ok = await postRegister(emailReg.value, passwordReg.value)
            if (ok) {
                alert('register successful')
                doShift()
            }
        }

        const doShift = () => {
            registerActive.value = !registerActive.value
        }

        return {
            registerActive,

            emailLogin,
            passwordLogin,

            emailReg,
            passwordReg,
            confirmReg,

            loginOK,

            doLogin,
            doRegister,
            doShift,
        }
    }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
    margin-bottom: 3%;
}

.login-page {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.textbox {
    margin-bottom: 2%;
    width: 100%;
}

.btn1 {
    float: right;
    margin-right: -2%;
}

.btn2 {
    float: right;
    margin-right: -1%;
}
</style>
