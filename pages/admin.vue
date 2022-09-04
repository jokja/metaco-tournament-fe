<template>
  <v-row justify="center" class="mt-5">
    <v-col cols="12" md="10" xl="12">
      <v-btn class="mb-3" outlined color="primary" dark @click="dialog.add = true">
        Add Result
      </v-btn>
      <v-data-table
        :headers="headers"
        :items="items"
        class="elevation-1"
        :loading="loading"
        loading-text="Please wait..."
      >
        <template #item.actions="{ item }">
          <v-icon
            small
            class="mr-2"
            @click="editItem(item)"
          >
            mdi-pencil
          </v-icon>
          <v-icon
            small
            @click="deleteItem(item)"
          >
            mdi-delete
          </v-icon>
        </template>
        <template #no-data>
          <v-btn
            color="primary"
            @click="initialize"
          >
            Reset
          </v-btn>
        </template>
      </v-data-table>
      <v-dialog
        v-model="dialog.add"
        :overlay="false"
        max-width="500px"
        transition="dialog-transition"
        persistent
      >
        <v-card>
          <v-card-title primary-title>
            <span class="text-h5">{{ isEdit ? 'Edit' : 'Add' }} Result</span>
          </v-card-title>
          <v-card-text>
            <v-form
              ref="form"
              v-model="valid"
              lazy-validation
            >
              <v-autocomplete
                v-model="form.teamId"
                :items="teamSelectList"
                item-text="name"
                item-value="id"
                :rules="[v => !!v || 'Team is required']"
                label="Team"
                required
              ></v-autocomplete>
              <v-autocomplete
                v-model="form.tournamentId"
                :items="tournamentSelectList"
                item-text="title"
                item-value="id"
                :rules="[v => !!v || 'Tournament is required']"
                label="Tournament"
                required
              ></v-autocomplete>
              <v-text-field
                v-model="form.position"
                :rules="[v => !!v || 'Position is required']"
                label="Position"
                type="number"
                required
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions class="pb-4">
            <v-spacer></v-spacer>
            <v-btn
              color="blue darken-1"
              outlined
              @click="closeDialog()"
            >
              Close
            </v-btn>
            <v-btn
              :disabled="!valid"
              color="blue darken-1"
              :dark="valid"
              @click="doSubmit()"
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialog.delete" max-width="500px" persistent>
        <v-card>
          <v-card-title class="text-h6 justify-center">Are you sure you want to delete this item?</v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="cancelDelete">Cancel</v-btn>
            <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-col>
  </v-row>
</template>
<script>

export default {
  name: 'AdminPanel',
  async asyncData({$axios}){
    let teamSelectList = []
    let tournamentSelectList = []
    await $axios.get('/team').then(res => {
      teamSelectList = res.data.data
    })
    await $axios.get('/tournament').then(res => {
      tournamentSelectList = res.data.data
    })
    return {
      teamSelectList,
      tournamentSelectList
    }
  },
  data() {
    return {
      dialog: {
        add: false,
        delete: false
      },
      loading: false,
      headers: [
        {
          text: 'Team',
          align: 'start',
          sortable: false,
          value: 'team.name'
        },
        { text: 'Position', value: 'position' },
        { text: 'Point', value: 'point' },
        { text: 'Tournament', value: 'tournament.title' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      items: [],
      valid: true,
      form : {
        teamId: null,
        position: null,
        tournamentId: null
      },
      detailItem: null,
      isEdit: false
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      this.loading = true
      const { data } = await this.$axios.get('tournament-result')
      if (data.success) {
        this.items = data.data
      }
      this.loading = false
      console.log('get tournament result - ', data)
    },
    doSubmit() {
      if (this.$refs.form.validate()) {
        const payload = {
          team_id: this.form.teamId,
          tournament_id: this.form.tournamentId,
          position: this.form.position,
        }
        const config = {
          method: 'post',
          url: 'tournament-result',
          data: payload
        }
        if (this.isEdit) {
          config.method = 'put'
          config.url = `tournament-result/${this.detailItem.id}`
        }
        this.$axios(config).then(({ data }) => {
          console.log('post tournament result - ', data)
          this.$toast.success(data.message)
          this.fetchData()
          this.closeDialog()
          if(this.isEdit) {
            this.isEdit = false
            this.detailItem = null
          }
        }).catch(({ response: { data } }) => {
          console.log('err', data)
          this.$toast.error(data.message)
        })
      }
    },
    closeDialog() {
      this.dialog.add = false
      this.$refs.form.reset()
      this.$refs.form.resetValidation()
    },
    deleteItem(item) {
      this.detailItem = item
      this.dialog.delete = true
    },
    deleteItemConfirm() {
      this.$axios.delete(`tournament-result/${this.detailItem.id}`).then(({ data }) => {
        this.$toast.success(data.message)
        this.fetchData()
        this.cancelDelete()
      }).catch(({ response: { data } }) => {
        this.$toast.error(data.message)
      })
    },
    cancelDelete() {
      this.dialog.delete = false
      this.detailItem = null
    },
    async editItem(item) {
      this.isEdit = true
      this.detailItem = await item
      this.form.teamId = item.team_id
      this.form.position = item.position
      this.form.tournamentId = item.tournament_id
      this.dialog.add = true
    }
  }
}
</script>
