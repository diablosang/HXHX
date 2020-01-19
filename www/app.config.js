var appVer = "3.6.6";
var nullDeviceType = "PC";
var asUserList = [];
var pushChn = "";
var deviceid = "";
var serviceURL = "http://localhost:61862";
var debugMode = true;

//var serviceURL = "http://180.166.252.90:20191/WebAPITest";
//var serviceURL = "http://58.221.237.66:8005/NBIWebAPI";

window.Mobile = $.extend(true, window.Mobile, {
    "config": {
        "layoutSet": "navbar",
        "navigation": [
            {
                "title": "待办",
                "onExecute": "#Dash",
                "icon": "event"
            },
            {
                "title": "收藏",
                "onExecute": "#Fav",
                "icon": "favorites"
            },
            {
                "title": "功能",
                "onExecute": "#Func",
                "icon": "menu"
            },
            {
                "title": "我的",
                "onExecute": "#UserCenter",
                "icon": "preferences"
            }
        ],
        "navigationEN": [
            {
                "title": "To Do",
                "onExecute": "#Dash",
                "icon": "event"
            },
            {
                "title": "Favorites",
                "onExecute": "#Fav",
                "icon": "favorites"
            },
            {
                "title": "Menu",
                "onExecute": "#Func",
                "icon": "menu"
            },
            {
                "title": "My",
                "onExecute": "#UserCenter",
                "icon": "preferences"
            }
        ],
        "commandMapping": {
            "generic-header-toolbar": {
                "commands": [
                    {
                        "id": "btnBKFNew",
                        "location": "after"
                    },
                    {
                        "id": "btnLogoff",
                        "location": "before"
                    },
                    {
                        "id": "btnScan",
                        "location": "after"
                    },
                    {
                        "id": "btnHide",
                        "location": "before"
                    }
                ]
            }
        }
    }
});