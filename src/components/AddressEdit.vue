<template>
    <div class="main">

        <as-header headtitle="地址编辑"></as-header>
        <!--<div class="navbar fixed-top1">
            <div class="navbar-left hide-weixin">
                <img class="button-icon" src="image/nav-left.png">
                <div class="button-text">返回</div>
            </div>
            <div class="navbar-title">收货地址</div>
            <div class="navbar-right"></div>
        </div>-->


        <div class="address-form">
            <div class="form-item">
                <div class="item-title">联系姓名:</div>
                <div class="item-input">
                    <input v-model="name" type="text" placeholder="填写姓名">
                </div>
            </div>
            <div class="form-item">
                <div class="item-title">联系电话:</div>
                <div class="item-input">
                    <input v-model="mobile" type="text" placeholder="填写手机号">
                </div>
            </div>
            <div class="form-item">
                <div class="item-title">所在地区</div>
                <div class="item-select" @click="showAttrSelect">{{addressProvince === '' ? '省、市、区' : addressProvince + ' ' + addressCity + ' ' + addressDistrict}} </div>
                <img class="item-arrow" src="image/nav-right.png">
            </div>
            <div class="form-item">
                <div class="item-title">详细地址:</div>
                <div class="item-textarea">
                    <textarea  v-model="address" type="text" placeholder="填写详细地址" aria-multiline="true" aria-invalid="false"></textarea>
                </div>
            </div>
            <!-- <div class="form-item">
              <div class="item-title">
                设置默认
              </div>
              <div class="item-checkbox"></div>
            </div> -->
        </div>


        <div class="address-mask" style="display: none"></div>
        <div class="address-picker" style="display: none">
            <div class="picker-header">请选择地区</div>
            <div class="picker-list"></div>
            <div class="picker-cancel">取消</div>
        </div>
        <mt-popup class="address-picker" v-model="show_attr_select" position="bottom">
            <div class="picker-header">请选择地区</div>
            <mt-picker class="picker-list" :slots="addressSlots" @change="onAddressChange" :visible-item-count="5" ref="address_picker"></mt-picker>
            <div class="picker-cancel" @click="showAttrSelect">确定</div>
        </mt-popup>

        <div class="address-action">
            <div class="bar-cancel" @click="goBack">取消</div>
            <div class="bar-save" @click="addressAdd">保存</div>
        </div>
    </div>
</template>

<script>
import Tools from "../lib/Tools";

export default {
    name: 'HelloWorld',
    data() {
        return {

            name     : '',
            mobile   : '',
            province : '',
            city     : '',
            district : '',
            post_code: '',
            address  : '',

            area_list  : {},
            show_attr_select: false,
            addressSlots: [
                {
                    flex: 1,
                    values: ['北京'],
                    //values: Object.keys(address),
                    className: 'slot1',
                    textAlign: 'center'
                }, {
                    divider: true,
                    content: '-',
                    className: 'slot2'
                }, {
                    flex: 1,
                    values: ['北京'],
                    className: 'slot3',
                    textAlign: 'center'
                }, {
                    divider: true,
                    content: '-',
                    className: 'slot4'
                }, {
                    flex: 1,
                    values: ['北京'],
                    className: 'slot5',
                    textAlign: 'center'
                }
            ],
            addressProvince: '',
            addressCity: '',
            addressDistrict: '',
        }
    },
    created: function () {
        let that = this;
        that.address_id = !! that.$route.params.address_id ? that.$route.params.address_id : 0;

        if(that.address_id > 0){
            Tools.requestPost(
                '/address/detail',
                {
                    id : that.address_id
                },
                function (data) {
                    if(data.err_code === 0){
                        that.name     = data.address_info.name;
                        that.mobile   = data.address_info.mobile;
                        that.province = data.address_info.province;
                        that.city     = data.address_info.city;
                        that.district = data.address_info.district;
                        that.post_code= data.address_info.post_code;
                        that.address  = data.address_info.address;

                        /*that.initAddressPicker(function () {
                            that.addressProvince = that.province;
                            that.addressCity     = that.city;
                            that.addressDistrict = that.district;
                        });*/

                        that.addressProvince = that.province;
                        that.addressCity     = that.city;
                        that.addressDistrict = that.district;

                        //that.onAddressChange(that.$refs.address_picker,[that.addressProvince, that.addressCity, that.addressDistrict]);
                    } else {
                        Tools.toast(data.err_msg);
                    }
                }
            );
        } else {
            that.initAddressPicker();
        }
    },
    methods: {
        initAddressPicker: function (callback) {
            let that = this;
            Tools.requestPost(
                '/address/area_list',
                {

                },
                function (data) {
                    if(data.err_code === 0){
                        that.area_list = data.area_list;

                        that.$refs.address_picker.setSlotValues(0, Object.keys(that.area_list));
                        that.onAddressChange(that.$refs.address_picker,[that.addressProvince, that.addressCity, that.addressDistrict]);
                        if(callback === 'function'){
                            callback();
                        }
                    } else {
                        //Tools.toast(data.err_msg);
                    }
                }
            );
        },
        goBack: function () {
            this.$router.go(-1);
        },
        showAttrSelect: function () {
            let that = this;
            that.show_attr_select = !that.show_attr_select;

            that.initAddressPicker();
        },
        onAddressChange: function(picker, values) {
            let that = this;
            //picker.setSlotValues(1, address[values[0]]);

            if(!! that.area_list && !! that.area_list[values[0]]){
                picker.setSlotValues(1, Object.keys(that.area_list[values[0]] || ['']));
                if(!! that.area_list[values[0]][values[1]]){
                    picker.setSlotValues(2, that.area_list[values[0]][values[1]] || ['']);
                }
            }

            that.addressProvince = values[0];
            that.addressCity = values[1]  || '';
            that.addressDistrict = values[2] || '';
        },
        orderAdd: function () {
            let that = this;
            console.log(that.$route.params);
            //that.$router.push({ name: 'OrderAdd', params: { goods_id: that.goods_id }})
        },
        addressAdd: function () {
            let that = this;
            Tools.requestPost(
                '/address/add',
                {
                    name     : that.name,
                    mobile   : that.mobile,
                    province : that.addressProvince,
                    city     : that.addressCity,
                    district : that.addressDistrict,
                    post_code: that.post_code,
                    address  : that.address,
                },
                function (data) {
                    if(data.err_code === 0){
                        Tools.toast(data.err_msg);
                        that.$router.replace({ name: 'AddressList', params: {}});
                    } else {
                        Tools.toast(data.err_msg);
                    }
                }
            );
        }
    }
}
</script>

<style>
</style>
