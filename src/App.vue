<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <a
          href="https://topdesk.com/"
          target="_blank"
        >
          <v-img
            
            alt="TOPdesk Logo"
            src="https://www.topdesk.com/nl/wp-content/themes/macgyver/img/TOPdesk_White_Logo.svg"
            transition="scale-transition"
          />
        </a>
        <small class="font-weight-thin mb-10 overline">Bulk edit</small>
      </div>


      <v-spacer></v-spacer>
      <v-btn
        href="https://my.topdesk.com/"
        target="_blank"
        text
      >
        <span class="mr-2">Report a bug</span>
        <v-icon>mdi-bug-outline</v-icon>
      </v-btn>

      <v-btn
        href="https://tip.topdesk.com/"
        target="_blank"
        text
      >
        <span class="mr-2">Request a feature</span>
        <v-icon>mdi-lightbulb-on-outline</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <user-inputs/>
    </v-main>
  </v-app>
</template>

<script>
import UserInputs from './components/UserInputs.vue';

export default {
  name: 'App',

  components: {
    UserInputs,
  },

  data: () => ({
    //
  }),
};
</script>
