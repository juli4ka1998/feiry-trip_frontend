<template>
    <v-text-field
            v-model="search"
            class="search"
            placeholder="Search"
            solo
            clearable
            height=""
            append-icon="search"
            style="margin: 0px; margin-top: 10px"
            @keypress="searchByName($event)"
    ></v-text-field>


</template>

<script>
  export default {
    computed: {
      search: {
        get() {
          return this.$store.getters.search;
        },
        set(value) {
          this.$store.dispatch('changeSearch', value);
        }
      }
    },
    methods: {
      searchByName(e){
        if (e.key === "Enter") {
          this.$router.replace('/fairytrip/shoes');
        }
      },
    }
  }
</script>

<style scoped>
    .search {
         margin-right: 15px;
         margin-top: 10px;
         margin-bottom: 0px;
         height: 68px;
         display: block;
     }


</style>