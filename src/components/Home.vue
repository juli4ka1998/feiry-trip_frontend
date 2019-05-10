<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div>
        <header>
            <img width="300" src="../images/fairy_trip_logo.png" alt="logo" style="float: left; "/>
            <v-menu offset-y>
                <template v-slot:activator="{ on }">
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
            <v-carousel class="slides">
                <v-carousel-item
                        v-for="(picture,i) in pictures"
                        :key="i"
                        :src="picture.src"
                        reverse-transition="fade"
                        transition="fade"
                >
                    <div>Взуття</div>
                </v-carousel-item>
            </v-carousel>
        </div>
        <footer>
            <div class="date">&copy;FairyTrip {{ new Date().getFullYear() }}</div>
        </footer>

    </div>

</template>

<script>
    export default {
        data: () => ({
            items: [
                { title: 'Взуття' },
                { title: 'Одяг' },
                { title: 'Палатки' },
                { title: 'Спальні мішки' },
                { title: 'Посуд' },
                { title: 'Харчування' },
                { title: 'Рюкзаки' },
                { title: 'Спорядження' }
            ],
            pictures: [
                {
                    src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg'
                },
                {
                    src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg'
                },
                {
                    src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg'
                },
                {
                    src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg'
                }
            ],
            search: ''
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
        padding-right: 70px;
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
        /*height: 700px;*/
        padding-right: 70px;
        padding: 15px;
        padding-top: 5px;
        /*clear: both;*/
    }.search {
         width: 80%;
         margin-right: 15px;
         margin-top: 10px;
         display: block;
         /*float: left;*/
         cursor: pointer;
     }
    .slides {
        width: 80%;
        /*margin: 0 auto;*/
    }
    footer {
        margin: 10px;
        background:-webkit-gradient(radial, 5 0, 100, 450 171, 590, from(#55D6FE), to(#FFFFFF));
        box-shadow: 0px 0px 4px rgba(.2,.2,.2,.2);
        height: 50px;
        padding-right: 50px;
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

</style>