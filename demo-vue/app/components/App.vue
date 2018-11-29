<template>
    <Page>
        <ActionBar title="NativeScript-Vue Brightness demo"/>
        <StackLayout>
            <Label class="t-20 text-center c-black" textWrap="true">
                <span>Your screen brightness is {{ currentValue }}</span>
            </Label>
            <GridLayout class="m-15" rows="auto" columns="50 * 50">
                <Label class="h3" text="0" textWrap="true" row="0" col="0"></Label>
                <Slider minValue="0" maxValue="100" v-model="sliderValue" @valueChange="onValueChanged" row="0" col="1"></Slider>
                <Label class="h3" text="100" textWrap="true" row="0" col="2"></Label>
            </GridLayout>
        </StackLayout>
    </Page>
</template>

<script>
  import { Brightness } from 'nativescript-brightness';
  let brightness = new Brightness();
  export default {
    data() {
      return {
        brightness: null,
        currentValue: 100,
        sliderValue: 100,
      }
    },

    created: function() {
        this.brightness = new Brightness();
        this.currentValue = this.brightness.get();
        this.sliderValue = this.currentValue;
    },

    methods: {
        onValueChanged: function(e) {
            let value = Math.round(e.value);
            if (this.brightness && value !== this.currentValue) {
                this.brightness.set({ intensity: value });
                this.currentValue = value;
            }
        }
    }
  }
</script>

<style scoped>
    ActionBar {
        background-color: #53ba82;
        color: #ffffff;
    }

    .message {
        vertical-align: center;
        text-align: center;
        font-size: 20;
        color: #333333;
    }
</style>
