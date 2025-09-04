<template>
    <q-page class="q-pa-md">
        <div class="row items-center">
            <q-btn 
                to="/settings" 
                label=""
                icon="chevron_left"
                flat 
                />
            <div class="text-h6 ">HELP</div>
        </div>

        <div class="q-py-md row q-gutter-md">
            <q-card class="my-card bg-accent text-white q-ma-xl column" >
    
                <q-card-section>
                    <div class="text-h6">Getting Started</div>
                    <div class="text-subtitle2">By Iasmin Flores</div>
                </q-card-section>

                <q-card-section >
                    Take your first steps with our app.
                </q-card-section>

                <q-separator dark />

                <q-card-actions vertical >
                    <q-btn flat style="background-color: #007180;">
                        <q-icon name="article" size="20px" class="q-mr-xs" />
                        Quick guide
                    </q-btn>
                    <q-separator dark />
                    <q-btn flat style="background-color: #007180;">
                        <q-icon name="smart_display" size="20px" class="q-mr-xs" />
                        Tutorial
                    </q-btn>
                </q-card-actions>
            </q-card>

            <q-card 
                class="my-card bg-accent text-white q-ma-xl cursor-pointer column" 
                v-ripple
                @click="onFaqCardClick"
            >
                <q-card-section>
                    <div class="text-h6">FAQs</div>
                    <div class="text-subtitle2">By Iasmin Flores</div>
                </q-card-section>

                <q-card-section> 
                    Find quick answers to the most common questions.
                </q-card-section>
            </q-card>
        </div>
    </q-page>
</template>

<script setup>
const onFaqCardClick = () => {
  console.log('Card de FAQs clicado!');
};
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 250px


</style>