<template>
    <div>

        <div class="tools" id="fix">
                <v-text-field
                        class="search"
                        placeholder="Search"
                        solo
                        clearable
                        height=""
                        append-icon="search"
                ></v-text-field>
            <v-combobox
                    v-model="select"

                    :items="items"
                    class="search"
                    solo
                    height=""
            ></v-combobox>
            <div class="icons">
                <button @click="add()" class="icon">
                    <v-icon medium color="black">add</v-icon>
                    <div class="show_text">Додати</div>
                </button>
                <button  class="icon" >
                    <v-icon medium color="black">remove</v-icon>
                    <div class="show_text">Видалити</div>
                </button>
                <button  class="icon">
                    <v-icon medium color="black">edit</v-icon>
                    <div class="show_text">Редагувати</div>
                </button>
            </div>
        </div>

        <div class="commodities">
            <div class="commodity"  v-for="commodity in commodities" :key="commodity.shoesId">
                <div class="commodity_id">
                    <p>ID: </p>
                    <p>{{ commodity.shoesId }}</p>
                </div>
                <div class="commodity_img">
                    <img width="120" height="80" :src="getImgUrl()" />
                </div>
                <div class="commodity_title">
                    <p>Назва товару: {{ commodity.name }}</p>
                    <div class="commodity_brand">
                        <p>Бренд: {{ commodity.brand }}</p>
                    </div>
                </div>

                <div class="commodity_price">
                    <p>Ціна: {{ commodity.price }} грн.</p>
                </div>
                <div class="commodity_characteristic">
                    <p>Опис: {{ commodity.characteristic }}</p>
                </div>
            </div>
        </div>


    </div>
</template>

<script>
    import axios from 'axios'
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
                right: null,
                commodities: [],
                select: this.select_comm,
                page: 'main',
                url: 'butterfly.jpg'
            }
        },
        props: {
            'select_comm': String
        },
        watch: {
            select_comm(){
                this.select = this.select_comm;
            },
            select(val) {
                this.$emit('changeItem', val);
            }
        },
        mounted () {
            this.scroll();
            axios({
                url: 'http://localhost:8080/commodity/shoes',
                method: 'get'
            }).then((response)=> (this.commodities = response.data));
            //this.commodities.id = this.info[0].shoesId;
        },
        methods: {

            scroll() {
                const self = this;
                //console.log(this.page);
                if (this.page == 'main') {
                    window.onscroll = function() {
                        self.fix_tools()
                    };
                }
                else {
                    window.onscroll = function () {}
                }
            },
            fix_tools() {
                var tools = document.getElementById("fix");
                var sticky = tools.offsetTop;
                if (window.pageYOffset > sticky) {
                    tools.classList.add("fixing");
                } else {
                    tools.classList.remove("fixing");
                }
            },
            getImgUrl() {
                return require('../images/'+this.url)
            },
            add() {
                this.$emit('changePage');
                this.page = 'add';
                this.scroll();
            }
        }
    }
</script>
// eslint-disable-next-line

<style scoped>

    .show_text {
        display: none;
        margin-top: 15px;
        width: 70px;
        margin-left: 20px;
        height: 30px;
        box-shadow: 0px 0px 4px rgba(.2,.2,.2,.2);
    }

    .fixing {
        position: fixed;
        top: 0;
    }

    .commodities {
        margin: 10px;
        box-shadow: 0px 0px 4px rgba(.2,.2,.2,.2);
        /*height: 700px;*/
        padding-right: 70px;
        margin-left: 290px;
        padding: 15px;
        padding-top: 5px;
        /*clear: both;*/
    }

    .commodity {
        margin-top: 10px;
        box-shadow: 0px 0px 4px rgba(.2,.2,.2,.2);
        height: 100px;
    }
    .tools {
        margin: 10px;
        /*box-shadow: 0px 0px 4px rgba(.2,.2,.2,.2);*/
        height: 48px;
        margin-left: 290px;
    }
    .search {
        width: 250px;
        margin-right: 15px;
        margin-top: 0px;
        display: inline-block;
        /*float: left;*/
        cursor: pointer;
    }
    .icon {
        display: inline-block;
        background: white;
        margin: 15px;
        margin-right: 5px;
        margin-top: 0px;
        box-shadow: 0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12);
        height: 48px;
        width: 48px;
        padding: 7px;
        border-radius: 2px;
    }
    button {
        border-width: 2px;
        border-color: red;
    }
    .icon:hover .show_text {
        display: block;
    }
    .icons {
        display: inline-block;
        float: right;
        margin-right: 10px;
    }
    .commodity_id {
        /*display: inline;*/
        width: 60px;
        height: 100px;
        text-align: center;
        padding-top: 20px;
        float: left;
    }
    .commodity_img {
        border: 0.5px gray solid;
        margin-top: 10px;
        float: left;
        height: 80px;
    }
    .commodity_title {
        font-size: 15px;
        margin-top: 20px;
        margin-left: 20px;
        float: left;
        color: black;
        width: 250px;
    }
    .commodity_brand {
        /*display: inline-block;*/
        /*margin-top: 50px;*/
        margin-top: 10px;
    }
    .commodity_price {
        font-size: 15px;
        margin-top: 40px;
        margin-left: 50px;
        float: left;
        color: black;
        width: 150px;
    }
    .commodity_characteristic {
        font-size: 15px;
        margin-top: 20px;
        margin-left: 50px;
        float: left;
        color: black;
        height: 60px;
        width: 450px;
        /*border: 1px black solid;*/

    }
</style>