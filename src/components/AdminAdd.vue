<template>
    <div>
        <div  :class="{add_form: true, form_height: isActive}">
            <div class="category" v-if="select_comm=='Усі товари'">
                <label>Категорія: </label>
                <v-combobox
                        v-model="select"
                        class="text-field"

                        :items="items"
                        solo
                        height=""
                ></v-combobox>
            </div>
            <div class="image" @click="$refs.inputUpload.click()">
                <input v-show="false" ref="inputUpload" type="file" accept=".jpg, .jpeg, .png" @change="onFileChange" />
                <img width="300" height="200" v-if="url" :src="url" />
                <p style="text-align: center; margin-top: 80px; font-size: 16px" v-else>Оберіть зображення</p>
            </div>
            <div class="important">
                <label>Назва товару: </label>
                <div class="text-field">
                    <v-text-field
                            v-model="commodity_data.name"
                            :rules="[rules.required]"
                            solo
                            type="text"
                    ></v-text-field>
                </div>
                <label>Бренд: </label>
                <div class="text-field">
                    <v-text-field
                            v-model="commodity_data.brand"
                            :rules="[rules.required]"
                            solo
                            type="text"
                    ></v-text-field>
                </div>
            </div>
            <div v-if=" select!='Харчування'" class="important">
                <label>Матеріал: </label>
                <div class="text-field">
                    <v-text-field
                            v-model="commodity_material"
                            :rules="[rules.required]"
                            solo
                            type="text"
                    ></v-text-field>
                </div>
                <label>Розміри: </label>
                <div class="text-field">
                    <v-text-field v-if="select!='Одяг' && select!='Взуття'"
                            v-model="commodity_size"
                            :rules="[rules.required]"
                            solo
                            type="text"
                    ></v-text-field>
                    <v-combobox
                            v-model="commodity_sizes"
                            v-else
                            :items="sizes"
                            multiple
                            solo
                            height=""
                    ></v-combobox>
                </div>
            </div>
            <div v-else class="important">
                <label>Вага: </label>
                <div class="text-field">
                    <v-text-field
                            v-model="commodity_weight"
                            :rules="[rules.required]"
                            solo
                            type="text"
                    ></v-text-field>

                </div>
            </div>
            <div class="important price_div">
                <label>Ціна: </label>
                <div class="price">
                    <v-text-field
                            v-model.number="commodity_data.price"
                            :rules="[rules.required]"
                            solo
                            type="number"
                            min="1"
                    ></v-text-field>

                </div>
            </div>
            <div class="uan">
                <label>грн. </label>

            </div>
            <div class="important sex_div" v-if="select=='Одяг' || select=='Взуття' || select=='Рюкзаки'">
                <label>Стать: </label>
                <div>
                    <v-radio-group v-model="radioGroup" class="sex" row>
                        <v-radio

                                v-for="n in 3"
                                :key="n"
                                :label="sex[n-1]"
                                :value="n"
                        ></v-radio>
                    </v-radio-group>

                </div>
            </div>
            <div class="important text_div">
                <label>Опис товару: </label>
                <div>
                    <v-textarea height="250" rows="13" class="text"
                            v-model="commodity_data.characteristic"
                            :rules="[rules.required]"
                            solo
                            type="text"
                    ></v-textarea>

                </div>
            </div>
            <v-btn class="success button add_btn" @click="add_commodity()">Додати товар</v-btn>
            <v-btn class="error button cancel" @click="cancel()">Відмінити</v-btn>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        data () {
            return {
                file: null,
                url: null,
                sizes: [],
                radioGroup: null,
                sex: ["Чоловіча", "Жіноча", "Унісекс"],
                rules: {
                    required: value => !!value || 'Заповніть поле.',
                },
                select: 'Взуття',
                items: [
                    'Взуття',
                    'Одяг',
                    'Палатки',
                    'Спальні мішки',
                    'Посуд',
                    'Харчування',
                    'Рюкзаки',
                    'Спорядження',
                ],
                isActive: true,
                commodity_data: {
                    name: null,
                    brand: null,
                    price: null,
                    characteristic: null
                },
                commodity_size: null,
                commodity_sizes: [],
                commodity_weight: null,
                commodity_material: null,
            }
        },
        props: {
            select_comm: String
        },
        methods: {
            onFileChange(e) {
                try {
                    this.file = e.target.files[0];
                    this.url = URL.createObjectURL(this.file);
                }catch (e) {
                    //console.log("no")
                }

            },
            cancel() {
                this.$emit('changePage', 'main');
            },
            add_commodity() {
                let data = this.commodity_data;
                let path = '';
                let isCorrect = true;

                if(data.characteristic == null || data.price == null || data.name == null || data.brand == null)
                    isCorrect = false;
                if (this.select == 'Харчування') {
                    data.weight = this.commodity_weight;
                    if(data.weight == null)
                        isCorrect = false;
                }
                else {
                    data.material = this.commodity_material;
                    if(data.material == null)
                        isCorrect = false;
                    if(this.select == 'Одяг' || this.select == 'Взуття'){
                        data.sex = this.sex[this.radioGroup-1];
                        data.sizes = this.commodity_sizes;
                        if(data.sex == undefined || data.sizes.length == 0)
                            isCorrect = false;
                    }
                    else {
                        data.size = this.commodity_size;
                        if(data.size == null)
                            isCorrect = false;
                        if (this.select == 'Рюкзаки') {
                            data.sex = this.sex[this.radioGroup - 1];
                            if (data.sex == undefined)
                                isCorrect = false;
                        }
                    }
                }
                if(isCorrect) {
                    switch (this.select) {
                        case this.items[0]:
                            path = '/shoes/new_shoes';
                            break;
                        case this.items[1]:
                            path = '/clothes/new_clothes';
                            break;
                        case this.items[2]:
                            path = '/tent/new_tent';
                            break;
                        case this.items[3]:
                            path = '/sleeping_bag/new_sleeping_bag';
                            break;
                        case this.items[4]:
                            path = '/dishes/new_dishes';
                            break;
                        case this.items[5]:
                            path = '/food/new_food';
                            break;
                        case this.items[6]:
                            path = '/backpack/new_backpack';
                            break;
                        case this.items[7]:
                            path = '/equipment/new_equipment';
                            break;
                    }

                    // eslint-disable-next-line
                    //console.log(data);

                        let file = this.file;
                        axios.request({

                            method: 'POST',
                            url: "http://localhost:8080/commodity" + path,
                            headers: {'Content-Type': "multipart/form-data"},
                            transformRequest: function () {
                                let formData = new FormData();
                                formData.append("json", JSON.stringify(data));
                                formData.append("file", file);
                                return formData;
                            }
                        }
                    );
                        this.$emit('changePage', 'main');
                }else alert("Заповніть усі поля!");
            }
        },
        mounted() {
            if(this.select_comm!='Усі товари') {
                this.select = this.select_comm;
                this.isActive = false
            }
        },
        watch: {
            select_comm() {
                if(this.select_comm!='Усі товари') {
                    this.select = this.select_comm;
                    this.isActive = false
                }

                else this.isActive = true
                if(this.select_comm=='Одяг'){
                    this.sizes.splice(0, this.sizes.length);
                    this.sizes.push('XS');
                    this.sizes.push('S');
                    this.sizes.push('M');
                    this.sizes.push('L');
                    this.sizes.push('XL');
                    this.sizes.push('XXL');
                }
                else {
                    this.sizes.splice(0, this.sizes.length);
                    for (let i = 35; i < 48; i++)
                        this.sizes.push(i);
                }
            }
        }
    }
</script>

<style scoped>

    .add_form {
        margin: 10px;
        box-shadow: 0px 0px 4px rgba(.2,.2,.2,.2);

        height: 780px;
        padding-right: 70px;
        margin-left: 290px;
        /*padding: 15px;*/
    }
    .form_height {
        height: 915px;
    }
    .image {
        width: 303px;
        height: 203px;
        border: 1.5px #55d5fe solid;
        box-shadow: 0px 0px 4px rgba(.2,.2,.2,.2);
        background-color: whitesmoke;
        margin-top: 30px;
        float: left;
        margin-left: 30px;
    }
    .image:hover {
        box-shadow: 0px 0px 10px rgba(.8,.8,.8,.8);
    }
    .important {
        display: inline;
        float: left;
        margin-left: 40px;
        margin-top: 35px;
        font-size: 16px;
        margin-right: 60px;
    }
    .text-field {
        width: 300px;
        margin-top: 5px;
    }
    .price {
        margin-top: 5px;
        width: 200px;
    }
    .price_div {
        margin-top: 25px;
        clear: both;
        margin-left: 30px;
        margin-right: 0px;
    }
    .uan {
        float: left;
        margin-top: 65px;
        font-size: 16px;
        margin-left: 10px;
    }
    .sex_div {
        margin-top: 25px;
        margin-left: 110px;
    }
    .sex {
        margin-top: 10px;
    }
    .text_div {
        clear: left;
        margin-left: 30px;
        margin-top: 15px;
    }
    .text {
        width: 650px;
        margin-top: 10px;

    }
    .category {
        font-size: 16px;
        margin-left: 30px;
        padding-top: 30px;
        width: 300px;
    }
    .add_btn {
        clear: both;
        float: left;
        /*display: block;*/
        margin-left: 30px;
        margin-top: 10px;
    }
    .button {

    }
    .cancel {
        float: left;
        margin-top: 10px;
        margin-left: 20px;
    }
</style>