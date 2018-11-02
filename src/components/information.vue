<template>
    <div class="page__bd">
        <div class="weui-form-preview " v-for="arrItem in resARR">
            <div class="weui-form-preview__hd">
                <div class="weui-form-preview__item">
                    <label class="weui-form-preview__label" style="color:#4A4A4A">{{arrItem.title}}</label>
                    <em class="weui-form-preview__value">&nbsp;</em>
                </div>
            </div>
            <div class="weui-form-preview__bd">
                <div class="weui-form-preview__item" v-for="itemList in arrItem.columnList">
                    <label class="weui-form-preview__label">{{itemList.title}}</label>
                    <span class="weui-form-preview__value">{{itemList.text}}</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: "information",
  data() {
    return {
      title: "",
      resARR: []
    };
  },
  mounted() {
    this.$ajax.post('/service/S_EW_HB_42',
        {
            "msg":"","msgKey":"","detailMsg":"","status":0,"traceId":"","attr":{"processInstanceId":"419fe650-b566-11e8-b440-28f10e21d739"},"blocks":{}
        },
        response => {
            if (response.status >= 200 && response.status < 300) {
                let _data = response.data;
                if (response.data !== undefined) {
                    this.resARR = _data.attr.applyJson.blockList
                }
            }else {
                console.log(response.message);
            }
        });
    }
};
</script>
<style scoped>
</style>