<template>
  <v-row>
    <v-col cols="12" class="leaderboard-card">
      <v-card
        elevation="0"
        outlined active-class=""
        class="rounded-middle header-card"
      >
        <!-- <v-card-text class="py-2"> -->
        <div class="d-flex align-center">
          <div class="logo d-flex align-center justify-center">
            <v-img max-width="60" max-height="60" src="https://metacoweb.s3.amazonaws.com/game/thumbs/bbd09b5ba201824582a27218238276d0.jpg" />
          </div>
          <div class="text-h6 text-center ml-7 font-weight-medium">Valorant</div>
        </div>
        <!-- </v-card-text> -->
      </v-card>
      <table class="header-table">
        <thead>
          <tr>
            <th class="text-uppercase">Rank</th>
            <th class="text-left text-uppercase">Team</th>
            <th class="text-uppercase">Point</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td class="d-flex align-center">
              <v-img max-width="32" src="https://metacoweb.s3.amazonaws.com/team/thumbs/5865df29a2e14588d7badcb12b0e63e5.jpg" alt="logo" />
              <span class="ml-2">Team GENZ </span>
            </td>
            <td>337</td>
          </tr>
          <tr>
            <td>2</td>
            <td class="d-flex align-center">
              <v-img max-width="32" src="https://metacoweb.s3.amazonaws.com/team/thumbs/5865df29a2e14588d7badcb12b0e63e5.jpg" alt="logo" />
              <span class="ml-2">PXE</span>
            </td>
            <td>194</td>
          </tr>
          <tr>
            <td>3</td>
            <td class="d-flex align-center">
              <v-img max-width="32" src="https://metacoweb.s3.amazonaws.com/team/thumbs/f7705544289a76b0a0a31e124be66f2f.jpg" alt="logo" />
              <span class="ml-2">Nongkrong Kilat</span>
            </td>
            <td>183</td>
          </tr>
        </tbody>
      </table>
      <v-card
        elevation="0"
        outlined active-class="active-period"
        class="rounded-middle mt-4"
        @click="gotoDetail(detail)"
      >
        <v-card-text class="py-3">
          <div class="text-subtitle-1 text-center">Explore More</div>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
export default {
  props: {
    detail: {
      type: Object,
      default: () => {
        return { code: 'mobile' }
      }
    }
  },
  methods: {
    gotoDetail(val) {
      this.$router.push({ path: `/leaderboard/${val.code}` })
    }
  }
}
</script>
<style lang="scss">

</style>