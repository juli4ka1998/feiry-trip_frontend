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
                            @click="homePage"
                    >
                        Головна
                    </v-btn>
                </template>

                <v-list style="margin-top: 3px">
                    <v-list-tile
                            v-for="(item, index) in items"
                            :key="index"
                            @click="commoditiesPage(item)"
                    >
                        <v-list-tile-title style="font-size: 16px; ">{{ item.title }}</v-list-tile-title>
                    </v-list-tile>
                </v-list>

            </v-menu>
        </header>
        <home v-if="this.$store.state.activePage=='home'"></home>
        <commodities v-if="this.$store.state.activePage=='commodities'"></commodities>
        <footer>
            <div class="date">&copy;FairyTrip {{ new Date().getFullYear() }}</div>
        </footer>

    </div>

</template>

<script>
    import Home from './Home'
    import Commodities from './Commodities'
    import { mapActions } from 'vuex'
	export default {
		data: () => ({
			items: [
				{ title: 'Взуття'},
				{ title: 'Одяг'},
				{ title: 'Палатки'},
				{ title: 'Спальні мішки'},
				{ title: 'Посуд'},
				{ title: 'Харчування'},
				{ title: 'Рюкзаки'},
				{ title: 'Спорядження'},
			]
        }),
        components: {
			'home': Home,
            'commodities': Commodities
        },
        methods: {
            ...mapActions([
                'homePage',
                'commoditiesPage'
            ])
        }
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

</style>