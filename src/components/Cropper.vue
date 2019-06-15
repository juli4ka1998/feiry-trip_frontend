<template>
    <div>
        <header-template></header-template>
        <!-- Note that 'ref' is important here (value can be anything). read the description about `ref` below. -->
        <div class="form">
            <vue-croppie
                    ref="croppieRef"
                    style="height: 400px; width: 30%; margin: 0 auto; margin-top: 10px"
                    :enableOrientation="true"
                    @result="result"
                    @update="update">
            </vue-croppie>

            <!-- the result -->

            <div class="btn">
                <div style="display: inline" @click="$refs.inputUpload.click()">
                    <input v-show="false" ref="inputUpload" type="file" accept=".jpg, .jpeg, .png" @change="onFileChange" />
                    <v-btn dark style="background-color: #08c708;">Завантажити зображення</v-btn>
                </div>

                <!-- Rotate angle is Number -->
                <v-btn dark style="background-color: #08c708" @click="rotate(-90)">Поворот вліво</v-btn>
                <v-btn dark style="background-color: #08c708" @click="rotate(90)">Поворот вправо</v-btn>
                <v-btn dark style="background-color: #08c708" @click="crop()">ОК</v-btn>

            </div>
            <div style="width: 100%; margin: 0 auto; ">
                <img v-bind:src="cropped">
            </div>


        </div>

        <footer-template></footer-template>
    </div>
</template>

<script>
    import Header from "./Header"
    import Footer from "./Footer"
	export default {
		mounted() {
			// Upon mounting of the component, we accessed the .bind({...})
			// function to put an initial image on the canvas.
			this.$refs.croppieRef.bind({
				url: this.$store.getters.photo,
			})
		},
		data() {
			return {
				file: null,
				cropped: null,
				images: [
					'http://i.imgur.com/fHNtPXX.jpg',
					'http://i.imgur.com/ecMUngU.jpg',
					'http://i.imgur.com/7oO6zrh.jpg',
					'http://i.imgur.com/miVkBH2.jpg'
				]
			}
		},
			components: {
				'header-template': Header,
				'footer-template': Footer,
			},
		methods: {
          onFileChange(e) {
            try {
              this.file = e.target.files[0];
              this.bind();
              //this.url = URL.createObjectURL(this.file);
            }catch (e) {
							//console.log("no")
            }
          },
			bind() {
				// Randomize cat photos, nothing special here.
				let url = URL.createObjectURL(this.file);
				//this.$store.dispatch('changePhoto',url);
				// Just like what we did with .bind({...}) on
				// the mounted() function above.
				this.$refs.croppieRef.bind({
					url: url,
				});
			},
			// CALBACK USAGE
			crop() {
				// Here we are getting the result via callback function
				// and set the result to this.cropped which is being
				// used to display the result above.
				let options = {
					format: 'jpeg',
					circle: false
				}
                 this.$refs.croppieRef.result(options, (output) => {
					this.cropped = output;
                    this.$store.dispatch('changePhoto',this.cropped);
                    this.$router.replace('/fairytrip/registration');
                    //localStorage.setItem('q', this.cropped);
					//console.log(this.cropped);
				});
			},
			result(output) {
				this.cropped = output;
							this.$store.dispatch('changePhoto',this.cropped);
			},
			update(val) {
				//console.log(val);
			},
			rotate(rotationAngle) {
				// Rotates the image
				this.$refs.croppieRef.rotate(rotationAngle);
			}
		}
	}
</script>
<style>
    .form {
        box-shadow: 0px 0px 4px rgba(.2,.2,.2,.2);
        /*height: 1000px;*/
        /*padding-right: 70px;*/
        margin-top: 10px;
        padding: 15px;
        padding-top: 5px;
        background-color: white;
        margin: 10px;
    }
    .btn {
        width: 48%;
        margin: 0 auto;
        margin-top: 60px;
        /*border: black 2px solid;*/
        padding: 10px;
    }
</style>