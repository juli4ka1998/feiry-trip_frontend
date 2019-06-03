<template>
    <div>
        <header-template></header-template>
        <div style="padding-right: 10px">
            <div class="main_content">
                <div class="tools" id="fix">

                    <v-combobox
                            :items="items"
                            item-text="title"
                            v-model="select"
                            class="panel select"
                            solo
                            height=""
                    ></v-combobox>
                    <v-text-field
                            v-model="search"
                            class="panel search"
                            placeholder="Search"
                            solo
                            clearable
                            height=""
                            append-icon="search"
                            @keyup="searchByName()"
                    ></v-text-field>

                </div>

                <div class="commodities">
                    <div class="commodity"  v-for="(commodity, index) in commodities" :key="commodity.id + commodity.name" :id="index" @click="chooseCommodity(commodity.id)">
                        <!--<div class="commodity_id">-->
                            <!--<p>ID: </p>-->
                            <!--<p>{{ commodity.id }}</p>-->
                        <!--</div>-->
                        <div class="commodity_img">
                            <img width="120" height="80" :src="'http://localhost:8080' + commodity.imagePath" />
                        </div>
                        <div class="commodity_title">
                            <p> {{ commodity.name }}</p>
                            <div class="commodity_brand">
                                <p>{{ commodity.brand }}</p>
                            </div>
                        </div>

                        <div class="commodity_price">
                            <p>Ціна: {{ commodity.price }} грн.</p>
                        </div>
                        <div class="commodity_characteristic">
                            <p>{{ (commodity.characteristic.length > 160)? commodity.characteristic.substr(0, 160) + '...' : commodity.characteristic  }}</p>
                        </div>
                    </div>
                </div>
            </div>
            <right-section></right-section>

        </div>
        <footer-template></footer-template>
    </div>
</template>

<script>
	import axios from 'axios'
    import RightSection from "./RightSection"
    import Header from "./Header"
    import Footer from "./Footer"
	export default {
      data () {
        return {
          items: [
            {title: 'Взуття', path: '/shoes'},
            {title: 'Одяг', path: '/clothes'},
            {title: 'Палатки', path: '/tent'},
            {title: 'Спальні мішки', path: '/sleeping_bag'},
            {title: 'Посуд', path: '/dishes'},
            {title: 'Харчування', path: '/food'},
            {title: 'Рюкзаки', path: '/backpack'},
            {title: 'Спорядження', path: '/equipment'}
          ],
          commodities: [],
          commodityPath: '/shoes',
          mas: []
        }
		},
      computed: {
        select: {
          get() {
            return this.$store.getters.selectedItem;
          },
          set(value) {
            this.$store.dispatch('changeItem', value);
          }

        },
        search: {
          get() {
            return this.$store.getters.search;
          },
          set(value) {
            this.$store.dispatch('changeSearch', value);
          }
        }
      },
      watch: {
        select() {
          this.changeItem();
        }
      },
      destroyed(){
        this.$store.dispatch('changeSearch', '');
      },
      components: {
        'right-section': RightSection,
        'header-template': Header,
        'footer-template': Footer
      },
      created () {

      },
      mounted () {
        //console.log(this.$store.state.selectedItem);
        this.scroll();
        if(this.$store.state.search === '')
            this.changeItem();
        else
            this.searchByName();
        //this.sendRequest();
      },
      methods: {
        sendRequest() {
          axios({
            url: 'http://localhost:8080/fairy-trip' + this.commodityPath,
            headers: {'user': true},
            method: 'get'
          }).then((response) => (this.commodities = response.data));
        },
        chooseCommodity(id){
          //console.log(id);
          for (let i = 0; i < this.commodities.length; i++) {
            if(this.commodities[i].id === id) {
              this.$store.dispatch('changeData', this.commodities[i]);
              //console.log(this.$store.state.commodityData.imagePath);
              break;
            }
          }
          this.$router.push(this.$route.path+'/'+id);
        },
        scroll() {
          const self = this;
          window.onscroll = function() {
            self.fix_tools()
          };
        },
        fix_tools() {
          let tools = document.getElementById("fix");
          let tools_section = document.getElementById("fix_section");
          let sticky = tools.offsetTop;
          if (window.pageYOffset > sticky) {
            tools.classList.add("fixing");
            tools_section.classList.add("fixing_section");
          } else {
            tools.classList.remove("fixing");
            tools_section.classList.remove("fixing_section");
          }
        },
        searchByName(){
          let s = this.$store.state.search;
          if(s !== '') {
            axios.request({
                method: 'POST',
                url: "http://localhost:8080/fairy-trip" + this.commodityPath + "/search",
                headers: {'Content-Type': "multipart/form-data", 'user': true},
                transformRequest: function () {
                  let formData = new FormData();
                  formData.append("search", s);
                  return formData;
						}
            }).then((response) => (this.commodities = response.data));
          }else this.sendRequest();
        },
        changeItem() {
          for(let i = 0; i < this.items.length; i++){
            if(this.select.title === this.items[i].title) {
              this.commodityPath = this.items[i].path;
            }
          }
          this.sendRequest();
        }
      },
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
        width: 100%;
    }
    .fixing .select {
        width: 16%;
    }
    .fixing .search {
        width: 16%;
    }
    .fixing_section {
        position: fixed;
        top: 0;
        float: none;
        right: 0;
        margin-right: 10px;
    }
    .main_content {
        float: left;
        width: 81%;
    }
    .commodities {
        margin: 10px;
        box-shadow: 0px 0px 4px rgba(.2,.2,.2,.2);
        /*height: 700px;*/
        padding-right: 70px;
        margin-left: 10px;
        padding: 15px;
        padding-top: 5px;
        background-color: white;
        /*clear: both;*/
    }

    .commodity {
        margin-top: 10px;
        box-shadow: 0px 0px 4px rgba(.2,.2,.2,.2);
        height: 100px;
        cursor: pointer;
        text-align: justify;
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
        margin-left: 10px;
    }
    .panel {
        /*width: 30%;*/

        margin-top: 0px;
        display: inline-block;
        /*float: left;*/
        cursor: pointer;
    }
    .search {
        width: 79%;
    }
    .select {
        width: 20%;
        margin-right: 1%;
    }

    .commodity_img {
        border: 0.5px gray solid;
        margin-top: 10px;
        margin-left: 10px;
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