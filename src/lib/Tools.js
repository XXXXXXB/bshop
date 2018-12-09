import $ from 'jquery'
import {
    Toast
} from 'mint-ui';

//const api_server = "http://api.agent_shop.cc";
 const api_server = "https://api2.gifishop.cn";

export default {
    requestGet : function (url, request_data, callback) {
        $.ajax({
            url     : api_server + url,
            type    : 'get',
            dataType: 'json',
            data    : request_data,
            success : function(data2){
                if(typeof callback === 'function'){
                    callback(data2);
                }
            }
        })
    },
    requestPost : function (url, request_data, callback) {
        request_data.token = this.getLocalData('token');
        $.ajax({
            url     : api_server + url,
            type    : 'POST',
            dataType: 'json',
            crossDomain: true,
            data    : request_data,
            success : function(data2){
                if(typeof callback === 'function'){
                    callback(data2);
                }
            }
        })
    },
    toast : function (msg) {
        //let option = {};
        //option.msg = msg;
        Toast({
            message: msg,
            position: 'top',
            duration: 5000
        });
    },
    setLocalData : function (key, data) {
        if(typeof data === 'string'){
            //sessionStorage.setItem(key, data);
            localStorage.setItem(key, data);
        } else {
            localStorage.setItem(key, JSON.stringify(data));
        }
    },
    getLocalData : function (key) {
        return localStorage.getItem(key);
    },
    removeLocalData : function (key) {
        return localStorage.removeItem(key);
    }
}
