<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div>
        <header-template></header-template>
        <div class="content">
            <div class="main_content">
                <search></search>
                 <v-carousel class="slides" light height="500px">
                    <v-carousel-item
                            v-for="(picture,i) in items"
                            :key="i"
                            :src="picture.src"
                            reverse-transition="fade"
                            transition="fade"

                    >
                        <div style="color: white; text-align: center; font-size: 30px;text-shadow: 2px 2px 2px black;">{{ items[i].title}}</div>
                    </v-carousel-item>
                </v-carousel>
            </div>
            <right-section></right-section>
            <div class="last_updates">
                <div style="text-align: center; font-size: 20px">Останні додані товари:</div>
                <div style="margin-top: 20px">
                    <v-carousel height="200px" hide-delimiters>
                        <v-carousel-item :key="i" v-for="i in 2">
                            <v-layout row style="width: 100%; margin-top: 20px">
                                <v-flex xs1 :key="j" v-for="j in 6" style="margin: 0 auto; ">
                                    <img width="150px" src="https://cdn.vuetifyjs.com/images/cards/halcyon.png" alt="">
                                </v-flex>
                            </v-layout>
                        </v-carousel-item>
                    </v-carousel>
                </div>
            </div>
        </div>
        <footer-template></footer-template>
    </div>

</template>

<script>
    import shoes_picture from "../images/shoes.jpg"
    import clothes_picture from "../images/clothes.jpg"
    import tent_picture from "../images/tent.jpg"
    import sleeping_bag_picture from "../images/sleeping_bag.jpg"
    import dishes_picture from "../images/dishes.jpg"
    import food_picture from "../images/food.jpg"
    import backpack_picture from "../images/backpack.jpg"
    import equipment_picture from "../images/equipment.jpg"
    import RightSection from "./RightSection"
    import Header from "./Header"
    import Footer from "./Footer"
    import Search from "./Search"
    //import axios from 'axios'
    export default {
      data: () => ({
        items: [
          { title: 'Взуття', src:  shoes_picture},
          { title: 'Одяг', src:  clothes_picture},
          { title: 'Палатки', src:  tent_picture},
          { title: 'Спальні мішки', src:  sleeping_bag_picture},
          { title: 'Посуд', src:  dishes_picture},
          { title: 'Харчування', src:  food_picture},
          { title: 'Рюкзаки', src:  backpack_picture},
          { title: 'Спорядження', src:  equipment_picture},
        ],
      }),
        components: {
          'right-section': RightSection,
          'header-template': Header,
          'footer-template': Footer,
          'search': Search
        },
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
      mounted() {

      }
    }
</script>

<style scoped>
    .content {
        margin: 10px;
        box-shadow: 0px 0px 4px rgba(.2,.2,.2,.2);
        padding: 15px;
        padding-top: 5px;
        height: 900px;
       /*/ margin-right: 0px;*/
        /*clear: both;*/
    }
    .slides {
        /*margin: 0 auto;*/
        margin-bottom: 30px;
    }
    .main_content {
        float: left;
        width: 80%;
    }

    .last_updates{
        clear: both;
    }

</style>