<template>
    <div >
        <header>
            <img width="300" src="../images/logo_fairy_trip.png" alt="logo"/>
            <p class="admin">Admin</p>
            <p class="logout">Вийти</p>
        </header>
        <admin-home @changePage="page='add'" v-if="page=='main'" :select_comm=select @changeItem="select = $event"></admin-home>
        <admin-add @changePage="page = $event" :select_comm="select" v-else></admin-add>


            <v-navigation-drawer
                    permanent
                    disable-resize-watcher
                    :width="280"
                    class="menu"
                    height=""
            >
                <div>
                    <v-list class="list">
                        <v-list-tile @click="select = item"
                                     :class="item == select ? 'tile_active' : 'tile'"
                                     v-for="item in items"
                                     :key="item"
                        >
                            <v-list-tile-action>
                                <v-icon class="icon_color" >{{ (item=='Усі товари')? 'category' : 'radio_button_checked' }}</v-icon>
                            </v-list-tile-action>

                            <v-list-tile-content>
                                <v-list-tile-title class="list_tile">{{ item }}</v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                    </v-list>
                </div>
            </v-navigation-drawer>




        <footer>
            <div class="date">&copy;FairyTrip {{ new Date().getFullYear() }}</div>
        </footer>
    </div>
</template>

<script>
    import Admin from './Admin';
    import AdminAdd from './AdminAdd'
    export default {
        data () {
            return {
                items: [
                    'Усі товари',
                    'Взуття',
                    'Одяг',
                    'Палатки',
                    'Спальні мішки',
                    'Посуд',
                    'Харчування',
                    'Рюкзаки',
                    'Спорядження',
                ],

                select: 'Усі товари',
                page: 'main'
            }
        },
        components: {
            'admin-home': Admin,
            'admin-add': AdminAdd
        },

        methods: {

        }
    }
</script>
// eslint-disable-next-line

<style scoped>


    .list_tile {
        color: rgba(0,0,0,0.87);
    }
    .icon_color {
        color: inherit;
    }
    header {
        margin: 10px;
        background-color: #55d5fe;
        box-shadow: 0px 0px 4px rgba(.2,.2,.2,.2);
        height: 101px;
        padding-right: 70px;
        margin-left: 290px;
        /*width: 80.3%;*/
    }
    footer {
        margin: 10px;
        background-color: #55d5fe;
        box-shadow: 0px 0px 4px rgba(.2,.2,.2,.2);
        height: 50px;
        padding-right: 50px;
        margin-left: 290px;
    }
    .admin {
        display: inline;
        float: right;
        margin-top: 25px;
        margin-bottom: 0px;
        color: white;
        font-size: 20px;
        text-shadow: 1px 1px #000000;
        cursor: default;
    }
    .logout {
        display: inline;
        text-decoration: underline;
        clear: right;
        float: right;
        margin-right: 10px;
        cursor: pointer;
    }
    @media only screen and (max-width: 600px) {
        .admin {
            display: block;
            float: none;
            color: black;
            margin-top: 0px;
        }
        .logout {
            display: block;
            float: none;
            margin-left: 8px;
        }
    }
    .menu {
        /*margin-left: 10px;*/
        /*background-color: #55d5fe;*/
        box-shadow: 0px 0px 4px rgba(.2,.2,.2,.2);
        position: fixed;
        top: 10px;
        padding: 5px;
        bottom: 10px;

    }
    .list {
        padding: 0px;
        color: #55d5fe;
        transition: 0ms;
    }
    .tile {
        margin: 5px;
        cursor: pointer;
    }

    .tile:hover {
        background: #55d5fe;
        color: rgba(0,0,0,0.87);
        transition: 0ms;
        /*color: white;*/
    }
    .tile_active {
        background: #55d5fe;
        color: white;
        margin: 5px;
        cursor: pointer;
    }
    .date {
        display: inline;
        float: right;
        margin-top: 15px;
        color: white;
        font-size: 15px;
        text-shadow: 0px 0px #000000;
        cursor: default;
    }

</style>