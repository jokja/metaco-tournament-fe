<template>
  <v-card
    elevation="0"
    outlined
    class="rounded-middle"
    :class="{ 'active-period': isActive(code) }"
    @click="setPeriod(code)"
  >
    <v-card-text class="py-3">
      <div class="text-subtitle-1 text-center">{{ title }}</div>
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
    code: {
      type: String,
      default: 'all'
    }
  },
  computed: {
    ...mapState(['selectedPeriod'])
  },
  methods: {
    setPeriod(val) {
      this.$store.dispatch('setPeriod', val)
    },
    isActive(code) {
      if (code === this.selectedPeriod) {
        return true
      }
      return false
    }
  }
}
</script>