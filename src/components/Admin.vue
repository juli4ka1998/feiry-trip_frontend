<template>
    <div>

        <div class="tools" id="fix">
                <v-text-field
                        v-model="search"
                        class="search"
                        placeholder="Search"
                        solo
                        clearable
                        height=""
                        append-icon="search"
                        @keyup="searchByName()"
                ></v-text-field>
            <v-combobox

                    :items="items"
                    item-text="title"
                    v-model="select"
                    class="search"
                    solo
                    height=""
            ></v-combobox>
            <div class="icons">
                <button @click="add()" class="icon">
                    <v-icon medium color="black">add</v-icon>
                    <div class="show_text" style="right: 153px;">Додати</div>
                </button>
                <button @click="deleteById()" class="icon" >
                    <v-icon medium color="black">remove</v-icon>
                    <div class="show_text" style="right: 78px;">Видалити</div>
                </button>
                <button @click="updateById()" class="icon">
                    <v-icon medium color="black">edit</v-icon>
                    <div class="show_text" style="right: 5px;">Редагувати</div>
                </button>
            </div>
        </div>

        <div class="commodities">
            <div class="commodity"  v-for="(commodity, index) in commodities" :key="commodity.id + commodity.name" :id="index" @click="selectCommodity(index)">
                <div class="commodity_id">
                    <p>ID: </p>
                    <p>{{ commodity.id }}</p>
                </div>
                <div class="commodity_img">
                    <img width="120" height="80" :src="'http://localhost:8080' + commodity.imagePath" />
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
                    {title: 'Усі товари', path: '/commodities'},
                    {title: 'Взуття', path: '/shoes'},
                    {title: 'Одяг', path: '/clothes'},
                    {title: 'Палатки', path: '/tent'},
                    {title: 'Спальні мішки', path: '/sleeping_bag'},
                    {title: 'Посуд', path: '/dishes'},
                    {title: 'Харчування', path: '/food'},
                    {title: 'Рюкзаки', path: '/backpack'},
                    {title: 'Спорядження', path: '/equipment'}
                ],
                right: null,
                commodities: [],
                select: {title: this.select_comm},
                page: 'main',
                url: 'butterfly.jpg',
                id: [],
                commodityPath: '/commodities',
                commIsActive: false,
                selectedIndex: null,
                mas: [],
                search: ''
            }
        },
        props: {
            'select_comm': String
        },
        watch: {
            select_comm(){
                this.select = { title: this.select_comm};
                for(let i = 0; i < this.items.length; i++)
                    if(this.select.title == this.items[i].title)
                        this.commodityPath = this.items[i].path;
                this.sendRequest();
                if(this.selectedIndex != null){
                    let id = document.getElementById(this.selectedIndex);
                    id.classList.remove("commodity_active");
                    this.commIsActive = false;
                    this.selectedIndex = null;
                }

            },
            select() {
                this.$emit('changeItem', this.select.title);
            }


        },
        created () {
            for(let i = 0; i < this.items.length; i++){
                if(this.select_comm == this.items[i].title)
                    this.commodityPath = this.items[i].path;
            }
            this.sendRequest();
        },
        mounted () {

            this.scroll();
            for(let i = 0; i < this.items.length; i++){
                if(this.select_comm == this.items[i].title)
                    this.commodityPath = this.items[i].path;
            }
            this.sendRequest();

        },
        methods: {
            selectCommodity(index) {
                let id = document.getElementById(index);
                if(!this.commIsActive) {
                    if(this.selectedIndex == null) {
                        id.classList.add("commodity_active");
                        this.commIsActive = true;
                        this.selectedIndex = index;
                    }
                }
                else {
                    if(this.selectedIndex == index) {
                        id.classList.remove("commodity_active");
                        this.commIsActive = false;
                        this.selectedIndex = null;
                    }
                    if(this.selectedIndex != index && this.selectedIndex != null) {
                        let prevId = document.getElementById(this.selectedIndex);
                        prevId.classList.remove("commodity_active");
                        id.classList.add("commodity_active");
                        this.commIsActive = true;
                        this.selectedIndex = index;
                        //console.log(this.commodities[index].id, this.mas[index]);
                    }
                }
            },
            sendRequest() {
                const token = localStorage.getItem('token');
               // const expDate = localStorage.getItem('expirationDate');
                //if(expDate <= Date()){
                //     axios({
                //         url: 'http://localhost:8080/fairy-trip/admin/refresh_token',
                //         headers: {'privatekey': token},
                //         method: 'post'
                //     }).then((response) => { if(response.data) {
                //         const token = response.headers.privatekey;
                //         const expirationDate = response.headers.expirationdate;
                //         //const refreshLink = response.headers.refreshlink;
                //         localStorage.setItem('token', token);
                //         localStorage.setItem('expirationDate', expirationDate);
                //         //localStorage.setItem('refreshLink', refreshLink);
                //         console.log(response.data);
                //         this.$router.push('admin_home')
                //     }else {
                //         console.log(false);
                //     }});
                // //}
                // console.log(token);
                // console.log(Date());
               // console.log(expDate);
                if(this.select.title == this.items[0].title)
                    this.commodityPath = this.items[0].path;
                if(this.commodityPath == '/commodities'){
                    axios({
                        url: 'http://localhost:8080/fairy-trip' + this.commodityPath,
                        headers: {'privatekey': token},
                        method: 'get'
                    }).then((response) => ( this.commodities = this.fillCommodity(response.data)))
                      .catch((error) => {
                          console.log(error);
                          localStorage.removeItem('token');
                          this.$router.push('admin');
                      })
                    ;

                }
                else {
                    axios({
                        url: 'http://localhost:8080/fairy-trip' + this.commodityPath,
                        headers: {'privatekey': token},
                        method: 'get'
                    }).then((response) => (this.commodities = response.data));
                }
                //console.log('dfd');
            },
            fillCommodity(commodityData){
                let z = 0;
                let comm = [];
                for(let i = 0; i < commodityData.length; i++){
                    for (let j = 0; j < commodityData[i].length; j++) {
                        comm[z] = commodityData[i][j];
                        this.mas[z] = this.items[i+1].title;
                        //console.log(this.mas[z]);
                        z++;
                    }
                }
                return comm;
            },
            scroll() {
                const self = this;
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
                this.$emit('changeAddPage');
                this.page = 'add';
                this.scroll();
            },
            updateById() {
                if(this.selectedIndex != null) {
                    let id = this.commodities[this.selectedIndex].id;
                    if (this.select.title == this.items[0].title) {
                        for (let i = 0; i < this.items.length; i++) {
                            if (this.items[i].title == this.mas[this.selectedIndex])
                                this.commodityPath = this.items[i].path;
                        }
                    }
                    this.$emit('setCommodity', this.commodities[this.selectedIndex]);
                    this.$emit('setId', id);
                    this.$emit('changeUpdatePage', this.commodityPath);
                    this.page = 'update';
                    this.scroll();
                }
            },
            deleteById() {
                if(this.selectedIndex != null) {
                    if (confirm("Ви точно хочете видалити даний запис?")) {
                        let id = this.commodities[this.selectedIndex].id;
                        if (this.select.title == this.items[0].title) {
                            for (let i = 0; i < this.items.length; i++) {
                                if (this.items[i].title == this.mas[this.selectedIndex])
                                    this.commodityPath = this.items[i].path;
                            }
                        }
                        const token = localStorage.getItem('token');
                        //console.log(id + ' ' + this.commodityPath);
                        axios({
                            url: 'http://localhost:8080/fairy-trip' + this.commodityPath + "/" + id,
                            headers: {'privatekey': token},
                            method: 'delete'
                        }).then((response) => {
                            console.log(response), this.sendRequest();
                        });
                    }
                }

            },
            searchByName(){
                //console.log(this.commodityPath);
                let s = this.search;
                if(s != '') {
                    const token = localStorage.getItem('token');
                    axios.request({
                            method: 'POST',
                            url: "http://localhost:8080/fairy-trip" + this.commodityPath + "/search",
                            headers: {'Content-Type': "multipart/form-data", 'privatekey': token},
                            transformRequest: function () {
                                let formData = new FormData();
                                formData.append("search", s);
                                return formData;
                            }
                        }
                    ).then((response) => (this.commodities = response.data));
                }else this.sendRequest();
            }
        }
    }
</script>
// eslint-disable-next-line

<style scoped>

    .show_text {
        display: none;
        margin-top: 15px;
        padding-left: 7px;
        padding-right: 7px;
        height: 20px;
        background-color: #fafafa;
        position: absolute;
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
    .commodity_active {
        background-color: #55d5fe;
    }
    .commodity:hover {

        box-shadow: 0px 0px 4px rgba(.255,.255,.255,.5) ;
        border: #55d5fe 1px solid;
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