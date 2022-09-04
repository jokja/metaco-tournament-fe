<template>
  <v-row>
    <v-col cols="12" class="leaderboard-card">
      <table v-if="detailTournament.length > 0" class="header-table mt-3">
        <thead>
          <tr>
            <th class="text-uppercase">Rank</th>
            <th class="text-left pl-5 text-uppercase">Team</th>
            <th class="text-left text-uppercase">Nama Kapten</th>
            <th class="text-uppercase">Point</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(val, key) in detailTournament" :key="key">
            <td>1</td>
            <td class="d-flex align-center">
              <v-img max-width="32" :src="val.team.logo" alt="logo" />
              <span class="ml-2">{{ val.team.name }}</span>
            </td>
            <td>{{ val.team.captain.name }}</td>
            <td>{{ val.total_point }}</td>
          </tr>
        </tbody>
      </table>
      <div v-else class="text-h3 text-center mt-5 red--text">
          Data not found
      </div>
    </v-col>
  </v-row>
</template>
<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['detailTournament'])
  }
}
</script>