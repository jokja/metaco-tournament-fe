<template>
  <div></div>
</template>

<script>
export default {
  name: "IndexPage",
  middleware:  [
    function({ redirect }) {
      redirect('/admin')
    },
  ],
}
</script>
