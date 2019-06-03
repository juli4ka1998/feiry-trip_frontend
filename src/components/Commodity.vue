<template>
    <div>
        <header-template></header-template>
        <div style="padding-right: 10px; padding-left: 10px">
            <div class="main_content">
                <search></search>
                <div class="commodity">
                    <div>
                        <img class="image" width="100%"  :src="url" />
                    </div>
                    <div class="data">
                        <p>{{ $store.state.commodityData.name }}</p>
                        <p style="margin-top: 5%">Бренд: {{ $store.state.commodityData.brand }}</p>
                        <p style="margin-top: 5%">Ціна: {{ $store.state.commodityData.price }} грн.</p>
                        <p style="margin-top: 5%">Опис: {{ $store.state.commodityData.characteristic }}</p>
                    </div>
                    <div class="other">
                        <p v-if="$store.state.commodityData.sex">Стать: {{ $store.state.commodityData.sex }}</p>
                        <p v-if="$store.state.commodityData.size">Розміри: {{ $store.state.commodityData.size }}</p>
                        <p v-if="$store.state.commodityData.weight">Вага: {{ $store.state.commodityData.weight }}</p>
                        <p v-if="$store.state.commodityData.sizes">Доступні розміри: {{ $store.state.commodityData.sizes }}</p>
                        <p v-if="$store.state.commodityData.material">Матеріал: {{ $store.state.commodityData.material }}</p>

                    </div>
                    <div class="buy_btn">
                        <v-btn class="success btn" >Додати до кошика</v-btn>
                        <v-btn class="success" >Купити</v-btn>
                    </div>

                </div>

            </div>

            <right-section></right-section>

        </div>
        <footer-template></footer-template>
    </div>
</template>

<script>
	// import axios from 'axios'
	import RightSection from "./RightSection"
	import Header from "./Header"
	import Footer from "./Footer"
    import Search from "./Search"
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
				mas: [],
                url: "http://localhost:8080" + this.$store.state.commodityData.imagePath,
			}
		},
		computed: {

		},

		components: {
			'right-section': RightSection,
			'header-template': Header,
			'footer-template': Footer,
            'search': Search
		},
		created () {
		},
		mounted () {
			this.scroll();
            localStorage.setItem('comm-2', JSON.stringify(JSON.parse(localStorage.getItem('comm-1'))));
			localStorage.setItem('comm-1', JSON.stringify(this.$store.state.commodityData));
		},
		methods: {
			scroll() {
				const self = this;
				window.onscroll = function() {
					self.fix_tools()
				};
			},
			fix_tools() {
				let tools_section = document.getElementById("fix_section");
				let sticky = tools_section.offsetTop;
				if (window.pageYOffset > sticky) {
					tools_section.classList.add("fixing_section");
				} else {
					tools_section.classList.remove("fixing_section");
				}
			},

			changeItem() {
				for(let i = 0; i < this.items.length; i++){
					if(this.select.title === this.items[i].title) {
						this.commodityPath = this.items[i].path;
						//console.log(this.select);
					}
				}
				this.sendRequest();
			}
		},
	}
</script>
// eslint-disable-next-line

<style scoped>

   .fixing {
        position: fixed;
        top: 0;
        width: 100%;
    }

    .fixing_section {
        position: fixed;
        top: 0;
        float: none;
        right: 0;
        margin-right: 10px;
    }
    .search {
        /*width: 80%;*/
        /*margin: 10px;*/
        /*float: left;*/
    }
   .commodity {
       box-shadow: 0px 0px 4px rgba(.2,.2,.2,.2);
       height: 650px;
       /*padding-right: 70px;*/
       margin-top: 10px;
       padding: 15px;
       padding-top: 5px;
       background-color: white;
       margin-bottom: 10px;
   }
   .main_content {
       float: left;
       width: 80%;
   }
   .image {
       width: 40%;
       /*height: 203px;*/
       /*border: 1.5px #55d5fe solid;*/
       box-shadow: 2px 2px 4px rgba(.2,.2,.2,.2);
       border-radius: 5px;
       margin-top: 10px;
       float: left;
   }
    .data {
        width: 60%;
        font-size: 20px;
        text-align: justify;
        font-weight: bold;
        margin-top: 10px;
        padding-left: 30px;
        padding-right: 20px;
        float: left;
    }
    .other {
        clear: both;
        font-size: 20px;
        text-align: left;
        font-weight: bold;
        margin-top: 30px;
        float: left;
    }
   .buy_btn {
       clear: both;
       float: left;
       display: inline-block;
       /*margin-left: 10px;*/
       margin-top: 10px;
       width: 100%;
   }
    .btn{
        margin: 0px;
        margin-right: 1%;
    }


</style>