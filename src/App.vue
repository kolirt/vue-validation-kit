<script setup lang="ts">
// import Test from '@/Test.vue'
import Test2 from '@/Test2.vue'
</script>

<template>
  <div class="container py-5">
    <div class="bg-body-secondary rounded p-5">
      <div class="d-grid d-sm-flex mb-3 gap-2">
        <img
          src="https://img.shields.io/static/v1?label=Made%20with&message=VueJS&color=limegreen&style=for-the-badge&logo=vue.js"
          alt="vuejs"
        />
      </div>

      <iframe
        src="https://ghbtns.com/github-btn.html?user=kolirt&repo=vue-validation-kit&type=star&count=true&size=large"
        frameborder="0"
        scrolling="0"
        width="170"
        height="30"
        title="GitHub"
        class="mb-3"
      >
      </iframe>

      <div class="d-grid d-sm-flex mb-3 gap-2">
        <a href="https://github.com/kolirt/vue-validation-kit" target="_blank">Github</a>
        <a href="https://www.npmjs.com/package/vue-validation-kit" target="_blank">Npmjs</a>
        <a href="https://github.com/kolirt/vue-validation-kit/blob/master/README.md" target="_blank">Docs</a>
        <a href="https://github.com/kolirt/vue-validation-kit/tree/master/examples" target="_blank">Example</a>
      </div>

      <h1>Vue3 validation kit</h1>
      <p class="lead">Easy to use and highly customizable Vue3 validation kit</p>

      <Test2 />

      <!--      <pre>{{ loginForm.toArray() }}</pre>-->

      <!--      <br />-->
      <!--      <hr>-->
      <!--      <br />-->

      <!--<Form :form="loginForm">
        <Field name="email" v-slot="{ field }">
          <div>Email</div>
          <input :name="field.name" v-model="field.value" />
        </Field>

        <br />
        <hr>
        <br />

        <Field name="password" v-slot="{ field }">
          <div>
            <div>Password</div>
            <input :name="field.name" v-model="field.value" />
          </div>
        </Field>
      </Form>-->
    </div>
  </div>

  <notifications class="notifications" />
</template>

<style scoped>
.notifications {
  position: fixed;
  right: unset !important;
  left: 100vw;
  transform: translateX(-100%);
  margin-left: -15px;
}
</style>
