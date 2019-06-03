<template>
    <div class="right_section" id="fix_section">
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
                               :src="url_1"
                               height="125px"
                               contain
                        ></v-img>
                    </v-flex>
                    <v-flex xs7>
                        <v-img style="margin-right: 10px; margin-top: 10px; "
                               :src="url_2"
                               height="125px"
                               contain
                        ></v-img>
                    </v-flex>
                </v-layout>
            </v-card>
        </v-flex>
    </div>
</template>

<script>
	export default {
        data: () => ({
            name: 'Власний кабінет',
            orders: 'Увійдіть, щоб зробити замовлення.',
            url_1: "http://localhost:8080" + JSON.parse(localStorage.getItem('comm-1')).imagePath,
            url_2: "http://localhost:8080" + JSON.parse(localStorage.getItem('comm-2')).imagePath,

        }),
        mounted() {
        },
        methods: {
        }
    }
</script>

<style scoped>
    .right_section{
        width: 18.9%;
        margin-top: 10px;
        float: right;
    }
</style>