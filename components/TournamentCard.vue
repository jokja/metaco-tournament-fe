<template>
  <v-card
    elevation="0"
    outlined
    class="rounded-middle"
    :class="{ 'active-tournament': isActive(code) }"
    width="300"
    @click="setTournament(code)"
  >
    <v-card-text class="py-2">
      <div class="d-flex d-flex-wrap align-center">
        <div>
          <v-img max-width="50" max-height="50" :src="icon" />
        </div>
        <div class="text-subtitle-1 text-center ml-2">{{ title }}</div>
      </div>
    </v-card-text>
  </v-card>
</template>
<script>
import { mapState } from 'vuex'
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: 'https://metacoweb.s3.amazonaws.com/game/thumbs/a60a418d7c650cfefccecb6a16ed5d7e.jpg'
    },
    code: {
      type: String,
      default: 'champions'
    }
  },
  computed: {
    ...mapState(['selectedTournament'])
  },
  methods: {
    setTournament(val) {
      this.$store.dispatch('setTournament', val)
      this.$store.dispatch('getDetailTournament', val)
      // if (this.selectedTournament === 'champions') {
      //   this.$router.push({ path: '/leaderboard' })
      // } else {
      //   this.$router.push({ path: `/leaderboard/${this.selectedTournament}` })
      // }
    },
    isActive(code) {
      if (code === this.selectedTournament) {
        return true
      }
      return false
    }
  }
}
</script>