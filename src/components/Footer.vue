<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <footer>
        <div class="date">&copy;FairyTrip {{ new Date().getFullYear() }}</div>
    </footer>
</template>

<script>

</script>

<style scoped>
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