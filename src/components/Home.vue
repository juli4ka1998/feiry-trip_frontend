<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div>
        <header>
            <img width="300" src="../images/fairy_trip_logo.png" alt="logo" style="float: left; "/>
            <v-menu offset-y>
                <template v-slot:activator="{ on }">
                    <div style="float: right; margin-left: 50px; margin-top: 25px; text-align: center; font-size: 12px; margin-right: 20px">
                        <p style="margin-bottom: 8px; cursor: pointer; font-weight: bold">Увійти в кабінет</p>
                        <p style="margin-bottom: 0px; cursor: pointer">Реєстрація</p>
                    </div>

                    <v-btn
                            class="menu_item"
                            dark
                            style="background-color: #08c708"
                    >
                        Корзина
                    </v-btn>
                    <v-btn
                            class="menu_item"
                            dark
                            style="background-color: #08c708"
                    >
                        Контакти
                    </v-btn>
                    <v-btn

                            dark
                            class="menu_item"
                            v-on="on"
                            style="background-color: #08c708;width: 160px"
                    >
                        Каталог товарів
                    </v-btn>
                    <v-btn
                            class="menu_item"
                            dark
                            style="background-color: #08c708; "
                    >
                        Головна
                    </v-btn>
                </template>

                <v-list style="margin-top: 3px">
                    <v-list-tile
                            v-for="(item, index) in items"
                            :key="index"
                            @click=""
                    >
                        <v-list-tile-title style="font-size: 16px; ">{{ item.title }}</v-list-tile-title>
                    </v-list-tile>
                </v-list>

            </v-menu>
        </header>
        <div class="content">
            <div class="main_content">
                <v-text-field
                        v-model="search"
                        class="search"
                        placeholder="Search"
                        solo
                        clearable
                        height=""
                        append-icon="search"
                        style="margin: 0px; margin-top: 10px"
                ></v-text-field>
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
            <div class="right_section">
                <v-flex xs12>
                    <v-card color="white" class="black--text" height="150px">
                        <v-layout row>
                            <v-flex xs7>
                                <v-card-title primary-title>
                                    <div>
                                        <div class="headline">{{ name }}</div>
                                        <div>{{ orders }}</div>
                                    </div>
                                </v-card-title>
                            </v-flex>
                            <v-flex xs5 >
                                <v-img style="margin-right: 10px"
                                       :src="require('../images/nobody.jpg')"
                                       height="125px"
                                       contain
                                ></v-img>
                            </v-flex>
                        </v-layout>
                        <!--<v-divider light></v-divider>-->
                        <!--<v-card-actions class="pa-3">-->

                        <!--</v-card-actions>-->
                    </v-card>
                </v-flex>
                <v-flex xs12>
                    <v-card color="white" class="black--text" height="415px" style="margin-top: 10px; ">
                        <v-layout column>
                            <v-flex xs6>
                                <v-card-title primary-title>
                                    <div style="text-align: center; width: 100%; font-size: 16px">Останні переглянуті товари:</div>
                                </v-card-title>
                            </v-flex>
                            <v-flex xs7>
                                <v-img style="margin-right: 10px"
                                       src="https://cdn.vuetifyjs.com/images/cards/halcyon.png"
                                       height="125px"
                                       contain
                                ></v-img>
                            </v-flex>
                            <v-flex xs7>
                                <v-img style="margin-right: 10px; margin-top: 10px; "
                                       src="https://cdn.vuetifyjs.com/images/cards/halcyon.png"
                                       height="125px"
                                       contain
                                ></v-img>
                            </v-flex>
                        </v-layout>
                    </v-card>
                </v-flex>
            </div>
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
        <footer>
            <div class="date">&copy;FairyTrip {{ new Date().getFullYear() }}</div>
        </footer>

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
            search: '',
            name: 'Власний кабінет',
            orders: 'Увійдіть, щоб зробити замовлення.'

        })
    }
</script>

<style scoped>
    header {
        margin: 10px;
        /*background-color: #55d5fe;*/
        background:-webkit-gradient(radial, 5 0, 100, 450 171, 590, from(#55D6FE), to(#FFFFFF));
        box-shadow: 0px 0px 4px rgba(.2,.2,.2,.2);
        height: 101px;
        padding-right: 20px;
        margin-left: 10px;
        /*width: 80.3%;*/
    }
    .menu_item {
        width: 110px;
        display: inline;
        float: right;
        background-color: #55d5fe;
        margin-top: 30px;
        box-shadow: none;
        font-size: 15px;
        text-transform: capitalize;
        letter-spacing: 1px;
        font-weight: normal;
        padding: 0px;
    }
    .content {
        margin: 10px;
        box-shadow: 0px 0px 4px rgba(.2,.2,.2,.2);
        padding: 15px;
        padding-top: 5px;
        height: 900px;
        /*clear: both;*/
    }.search {
         margin-right: 15px;
         margin-top: 10px;
         display: block;
         /*float: left;*/
         cursor: pointer;
     }
    .slides {
        /*margin: 0 auto;*/
        margin-bottom: 30px;
    }
    .main_content {
        float: left;
        width: 80%;
    }
    .right_section{
        width: 18.9%;
        margin-top: 10px;
        float: right;
    }
    footer {
        margin: 10px;
        background:-webkit-gradient(radial, 5 0, 100, 450 171, 590, from(#55D6FE), to(#FFFFFF));
        box-shadow: 0px 0px 4px rgba(.2,.2,.2,.2);
        height: 50px;
        padding-right: 50px;
        clear: both;
    }
    .date {
        display: inline;
        float: right;
        margin-top: 15px;
        color: #08c708;
        font-size: 15px;
        text-shadow: 0px 0px #000000;
        cursor: default;
    }
    .last_updates{
        clear: both;
    }

</style>