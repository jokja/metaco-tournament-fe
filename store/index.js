export const state = () => ({
  selectedPeriod: 'all',
  selectedTournament: 'champions',
  detailTournament: []
})

export const mutations = {
  storePeriod (state, value) {
    state.selectedPeriod = value
  },
  storeTournament (state, value) {
    state.selectedTournament = value
  },
  storeDetailTournament (state, value) {
    state.detailTournament = value
  }
}

export const actions = {
  setPeriod (context, payload) {
    context.commit('storePeriod', payload)
  },
  setTournament (context, payload) {
    context.commit('storeTournament', payload)
  },
  getDetailTournament(context, payload) {
    this.$axios.get(`tournament-result-sum?tournament_id=${parseInt(payload)}`).then(res => {
      context.commit('storeDetailTournament', res.data.data)
    })
  }
}
