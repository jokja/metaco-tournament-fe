<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <div class="text-h6 font-weight-bold mt-10">Leaderboard</div>
        <div class="text-h3 font-weight-bold mt-2">The Champions</div>
      </v-col>
    </v-row>
    <v-row class="mt-10">
      <v-col cols="2">
        <PeriodCard title="All Time" code="all" />
      </v-col>
      <v-col cols="2">
        <PeriodCard title="Bulan ini" code="this-month" />
      </v-col>
      <v-col cols="2">
        <PeriodCard title="Minggu ini" code="this-week" />
      </v-col>
    </v-row>
    <v-row class="mt-12">
      <swiper
        class="swiper p-1"
        :options="swiperOptions"
        dir="ltr"
      >
        <template v-if="loading.tournament">
          <swiper-slide
            v-for="data in swiperData"
            :key="data.text"
            class="rounded swiper-no-border-active swiper-text-left p-0"
          >
            <b-card class="no-shadow" style="width: 250px; height: 80px">
              <b-skeleton animation="wave" type="button" />
              <b-skeleton class="mes-mt-3" animation="wave" />
            </b-card>
          </swiper-slide>
        </template>
        <template v-else-if="!loading.tournament && tournamentList.length > 0">
          <swiper-slide class="rounded swiper-no-border-active swiper-text-center p-0">
            <TournamentCard
              class="mb-0"
              title="The Champions"
              icon="https://metaco.gg/icon/all-games.png"
              code="champions"
            />
          </swiper-slide>
          <swiper-slide
            v-for="(val, key) in tournamentList"
            :key="key"
            class="rounded swiper-no-border-active swiper-text-left p-0"
          >
            <TournamentCard class="mb-0" :title="val.title" :code="val.id.toString()" />
          </swiper-slide>
        </template>
      </swiper>
    </v-row>
    <v-row v-if="selectedTournament === 'champions'" class="mt-14">
      <v-col cols="4">
        <LeaderboardCard />
      </v-col>
    </v-row>
    <v-row v-else justify="center">
      <v-col cols="10">
        <DetailTournament />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import { mapState } from 'vuex'
export default {
  name: "Leaderboard",
  components: {
    Swiper,
    SwiperSlide
},
  async asyncData({$axios}){
    let tournamentList = []
    await $axios.get('/tournament').then(res => {
      tournamentList = res.data.data
    })
    return {
      tournamentList
    }
  },
  data() {
    return {
      swiperData: [
        { icon: "GithubIcon", text: "Getting Started" },
        { icon: "FacebookIcon", text: "Pricing & Plans" },
        { icon: "TwitterIcon", text: "Sales Question" },
        { icon: "InstagramIcon", text: "Usage Guides" },
        { icon: "GitlabIcon", text: "General Guide" }
      ],
      swiperOptions: {
        slidesPerView: 5,
        centeredSlides: false,
        spaceBetween: 20,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      },
      loading: {
        tournament: false
      },
      // tournamentList: [1,2,3,4,5,6,7,8,9,10],
      period: 'all'
    };
  },
  computed: {
    ...mapState(['selectedTournament'])
  }
}
</script>
<style lang="scss">
.active-date{
  border-color: rgb(73 121 188);
}
</style>
